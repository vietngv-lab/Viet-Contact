// Cấu hình thông tin cá nhân (Người dùng sẽ thay đổi ở đây)
const MY_TELEGRAM_USERNAME = "vietngv_demo"; // Thay bằng username Telegram của bạn (không có @)

document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    // Tạo nội dung tin nhắn
    const fullMessage = `Chào bạn, tôi là ${name}. ${message}`;

    // Mã hóa nội dung để đưa vào URL
    const encodedMessage = encodeURIComponent(fullMessage);

    // Tạo Deep Link Telegram
    // https://t.me/username?text=message
    const telegramUrl = `https://t.me/${MY_TELEGRAM_USERNAME}?text=${encodedMessage}`;

    // Mở tab mới
    window.open(telegramUrl, '_blank');
});

// --- Logic Chuyển Đổi Ngôn Ngữ & Giao Diện ---

const translations = {
    vi: {
        bio: "- Dreamer -",
        mission: "\"Sống ngang tàng, yêu trong sáng. Hay xúi người ta hãy sống tử tế ...\"",
        donateTitle: "Ủng hộ tôi",
        donateDesc: "Quét mã để donate hoặc thanh toán",
        contactTitle: "Gửi tin nhắn nhanh",
        namePlaceholder: "Tên của bạn",
        msgPlaceholder: "Nội dung tin nhắn...",
        sendBtn: "Gửi qua Telegram",
        tooltips: {
            gmail: "Gửi Email",
            zalo: "Nhắn tin Zalo",
            telegram: "Nhắn tin Telegram",
            facebook: "Facebook",
            instagram: "Instagram",
            tiktok: "TikTok"
        }
    },
    en: {
        bio: "- Dreamer -",
        mission: "\"Living recklessly, loving purely. Always encouraging people to live with kindness ...\"",
        donateTitle: "Support Me",
        donateDesc: "Scan QR code to donate or pay",
        contactTitle: "Quick Message",
        namePlaceholder: "Your Name",
        msgPlaceholder: "Message content...",
        sendBtn: "Send via Telegram",
        tooltips: {
            gmail: "Send Email",
            zalo: "Chat Zalo",
            telegram: "Chat Telegram",
            facebook: "Facebook",
            instagram: "Instagram",
            tiktok: "TikTok"
        }
    }
};

let currentLang = 'vi';
let isDarkMode = true;

// --- Settings Toggle Logic ---
const langToggle = document.getElementById('lang-toggle');
const themeToggle = document.getElementById('theme-toggle');

// Language Toggle
langToggle.addEventListener('click', () => {
    const currentLang = localStorage.getItem('language') || 'vi';
    const newLang = currentLang === 'vi' ? 'en' : 'vi';
    setLanguage(newLang);
});

// Theme Toggle
themeToggle.addEventListener('click', () => {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
});

function setLanguage(lang) {
    localStorage.setItem('language', lang);

    // Update Button Text (Show TARGET state)
    // If current is VI, button shows "ENG" (to switch to EN)
    // If current is EN, button shows "VIE" (to switch to VI)
    if (lang === 'vi') {
        langToggle.innerText = 'ENG';
    } else {
        langToggle.innerText = 'VIE';
    }

    // Update Content
    const content = translations[lang];
    document.querySelector('.bio').textContent = content.bio;
    document.querySelector('.mission').textContent = content.mission;
    document.querySelector('.payment-section h2').innerHTML = `<i class="fas fa-qrcode"></i> ${content.donateTitle}`;
    document.querySelector('.qr-description').textContent = content.donateDesc;
    document.querySelector('.contact-section h2').innerHTML = `<i class="fas fa-paper-plane"></i> ${content.contactTitle}`;
    document.querySelector('#name').placeholder = content.namePlaceholder;
    document.querySelector('#message').placeholder = content.msgPlaceholder;
    document.querySelector('.send-btn').innerHTML = `<i class="fab fa-telegram-plane"></i> ${content.sendBtn}`;

    // Update Social Media Tooltips
    document.querySelectorAll('[data-tooltip-key]').forEach(element => {
        const key = element.getAttribute('data-tooltip-key');
        if (content.tooltips[key]) {
            element.setAttribute('title', content.tooltips[key]);
        }
    });
}

function setTheme(theme) {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);

    if (theme === 'light') {
        document.body.classList.add('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Show moon when in light mode (click to go dark)
    } else {
        document.body.classList.remove('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Show sun when in dark mode (click to go light)
    }
}

// Initialize
const savedLang = localStorage.getItem('language') || 'vi';
const savedTheme = localStorage.getItem('theme') || 'dark';

setLanguage(savedLang);
setTheme(savedTheme);

// Initialize VanillaTilt
VanillaTilt.init(document.querySelectorAll(".glass-card"), {
    max: 10,              // Độ nghiêng tối đa
    speed: 400,           // Tốc độ hiệu ứng
    glare: true,          // Bật hiệu ứng lóe sáng
    "max-glare": 0.3,     // Độ sáng tối đa
    gyroscope: true,      // Bật cảm biến con quay hồi chuyển (Mobile)
    scale: 1.02           // Phóng to nhẹ khi hover
});
