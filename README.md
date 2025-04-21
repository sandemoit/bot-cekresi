# 📦 Bot WhatsApp Cek Resi (Node.js)

Bot WhatsApp sederhana untuk mengecek status pengiriman paket dari berbagai ekspedisi (JNT, JNE, Sicepat, dll) menggunakan `whatsapp-web.js` dan API tracking dari Komerce.

## 🚀 Fitur

- Kirim perintah `/kurir NOMOR_RESI` di WhatsApp untuk mengecek status pengiriman.
  - Contoh: `/jnt JP1234567890`
- Mendukung banyak kurir (selama didukung oleh API Komerce).
- Tidak perlu database.
- Gratis & open source.

## 🛠️ Teknologi

- [Node.js](https://nodejs.org/)
- [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js)
- [API Tracking Komerce](https://rajaongkir.komerce.id/api/v1/track/waybill)

## ⚙️ Cara Pakai

### 1. Clone repo

```bash
git clone https://github.com/username/bot-wa-cek-resi.git
cd bot-wa-cek-resi
```

### 2. Install dependency

```bash
npm install
```

### 3. Jalankan Bot
```bash
node index.js
```

### 4. Scan QR di terminal
Gunakan WhatsApp untuk scan QR code yang muncul di terminal saat pertama kali.

## 🔐 API Key
Ganti API key Komerce di bagian ini dalam file index.js:

```bash
const API_KEY = 'YOUR_API_KEY';
```
Daftar & dapatkan key di: https://rajaongkir.komerce.id

## 🧪 Contoh Perintah di WhatsApp

```bash
/jnt JP1234567890
/jne 1234567890
/sicepat 003445554123
```

## 🧠 Format Error Handling

- Jika salah format:
❌ Format salah. Contoh: /JNT JP1234567890
- Jika kurir/resi tidak ditemukan:
❌ Resi tidak ditemukan atau kurir salah.

## 📄 Lisensi
MIT — bebas digunakan dan dimodifikasi sesuai kebutuhan.

Made with ❤️ by Sandi
