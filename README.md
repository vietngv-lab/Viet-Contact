# Viet Contact - Liquid Glass Web

A stunning personal portfolio website with liquid glass morphism design, featuring animated starfield background and multilingual support.

## ✨ Features

- **Liquid Glass Design**: Modern glassmorphism UI with blur effects and transparency
- **Animated Starfield**: Beautiful 3D parallax star animation background
- **Multilingual Support**: Vietnamese and English language toggle
- **Dark/Light Mode**: Theme switcher with smooth transitions
- **Responsive Design**: Optimized for desktop and mobile devices
- **Social Media Integration**: Quick links to Gmail, Zalo, Telegram, Facebook, Instagram, TikTok
- **QR Payment**: VietQR code for easy donations/payments
- **Contact Form**: Quick message form with Telegram integration
- **3D Tilt Effects**: Interactive card tilt animations using VanillaTilt.js
- **SEO Optimized**: Complete meta tags, Open Graph, Twitter Card, and structured data

## 🚀 Quick Start

1. Extract the zip file
2. Open `index.html` in your web browser
3. Or run a local server:
   ```bash
   python3 -m http.server 8000
   ```
   Then visit `http://localhost:8000`

## 📁 Project Structure

```
Viet-Contact-Liquid-Glass-Web/
├── index.html          # Main HTML file
├── style.css           # Main stylesheet with glassmorphism effects
├── stars.css           # Animated starfield background styles
├── script.js           # JavaScript for language/theme switching
├── vanilla-tilt.js     # 3D tilt effect library
├── favicon.ico         # Website favicon
├── assets/             # Images and resources
│   ├── avatar-new.jpg  # Profile avatar
│   ├── qr-code-new.png # VietQR payment code
│   ├── gmail-icon.png  # Gmail icon
│   └── zalo-icon.png   # Zalo icon
└── README.md           # This file
```

## 🎨 Customization

### Update Personal Information

Edit `index.html`:
- Line 47: Change name "Việt Nguyễn"
- Line 48: Update bio text
- Line 49: Modify slogan
- Lines 125-141: Update social media links

### Update Images

Replace files in `assets/` folder:
- `avatar-new.jpg`: Your profile photo
- `qr-code-new.png`: Your payment QR code
- `gmail-icon.png`: Custom Gmail icon (optional)
- `zalo-icon.png`: Custom Zalo icon (optional)

### Update Telegram Integration

Edit `script.js` line 2:
```javascript
const MY_TELEGRAM_USERNAME = "your_username"; // Replace with your Telegram username
```

### Customize Colors

Edit `style.css`:
- Lines 1-10: CSS variables for colors
- Modify gradient backgrounds, glass effects, etc.

## 🌐 Language Support

The website supports Vietnamese (default) and English. Users can toggle between languages using the ENG/VIE button in the bottom-right corner.

To add more translations, edit the `translations` object in `script.js`.

## 🎭 Theme Support

Toggle between dark mode (default) and light mode using the sun/moon icon in the bottom-right corner.

## 📱 Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🛠️ Technologies Used

- HTML5
- CSS3 (Glassmorphism, Animations, Flexbox)
- JavaScript (ES6+)
- Font Awesome 6.0 (Icons)
- VanillaTilt.js (3D effects)

## 📄 License

Free to use for personal and commercial projects.

## 👨‍💻 Credits

Created by Việt Nguyễn
Built with assistance from Gemini 3

---

© Việt Nguyễn 2025 - and thanks Gemini 3
