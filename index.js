const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Inisialisasi client WA
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { headless: true },
});

// QR Code saat pertama kali login
client.on('qr', (qr) => {
  console.log('Scan QR ini untuk login WhatsApp');
  qrcode.generate(qr, { small: true });
});

// Info saat login berhasil
client.on('ready', () => {
  console.log('✅ Bot WhatsApp siap digunakan!');
});

// Listen pesan masuk
client.on('message', async (msg) => {
  if (msg.body.startsWith('/')) {
    const [command, resi] = msg.body.trim().split(' ');
    const kurir = command.replace('/', '').toLowerCase();

    if (!resi) {
      msg.reply('❌ Format salah. Contoh: /JNT JP1234567890');
      return;
    }

    const hasil = await cekResi(kurir, resi);
    msg.reply(hasil);
  }
});

client.initialize();
const API_KEY = 'bde210968c8928e5d85b7aa4ba758f0c';

// Fungsi cek resi via API Komerce
async function cekResi(kurir, resi) {
  try {
    const url = `https://rajaongkir.komerce.id/api/v1/track/waybill?awb=${resi}&courier=${kurir}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'key': API_KEY,
      },
    });

    const json = await response.json();

    if (!json.data) {
      return `❌ Resi tidak ditemukan atau kurir salah.\n${json.meta?.message || ''}`;
    }
    
    return formatResiMessage(json.data);
  } catch (err) {
    console.error('Error detail:', err);
    return `❌ Error saat cek resi: ${err.message}`;
  }
}

function formatResiMessage(data) {
  const info = data.summary;
  const delivery = data.delivery_status;

  const history = data.manifest.map(item => {
    return `- ${item.manifest_date}, ${item.manifest_time}\n  ${item.manifest_description}`;
  }).join('\n');

  return `
    📦 Status: ${info.status}
    🚚 Kurir: ${info.courier_name}
    🔢 Resi: ${info.waybill_number}
    🕒 Dikirim: ${info.waybill_date}
    📍 Tujuan: ${info.destination}
    📬 Penerima: ${delivery?.pod_receiver || '-'}

    📜 HISTORY:
${history}
  `.trim();
}

