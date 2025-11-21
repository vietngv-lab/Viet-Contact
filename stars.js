import * as THREE from 'three';

const canvas = document.getElementById('stars-canvas');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 1;

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// --- 1. TẠO TEXTURE HÌNH TRÒN (Để sao không bị vuông) ---
// Chúng ta sẽ vẽ một hình tròn mờ dần ra viền trên một canvas nhỏ và dùng nó làm texture
function createCircleTexture() {
    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext('2d');

    // Vẽ hình tròn tỏa sáng
    const center = size / 2;
    const gradient = context.createRadialGradient(center, center, 0, center, center, center);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');   // Tâm trắng
    gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.5)'); // Giữa mờ
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');   // Viền trong suốt

    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
}

// --- 2. TẠO SAO ---
const starCount = 6000; // Tăng số lượng sao lên chút cho đẹp
const starsGeometry = new THREE.BufferGeometry();
const positions = new Float32Array(starCount * 3);
const velocities = new Float32Array(starCount); // Tốc độ riêng cho từng sao (tạo chiều sâu)

for (let i = 0; i < starCount; i++) {
    // X, Y: Phân bố ngẫu nhiên rộng ra xung quanh
    // Chúng ta dùng range rộng hơn màn hình để khi bay tới không bị hụt ở góc
    positions[i * 3] = (Math.random() - 0.5) * 400;     // x
    positions[i * 3 + 1] = (Math.random() - 0.5) * 400; // y

    // Z: Phân bố từ xa đến gần (từ -200 đến 200)
    positions[i * 3 + 2] = (Math.random() - 0.5) * 400; // z

    // Tốc độ ngẫu nhiên một chút để tự nhiên hơn
    velocities[i] = 0.2 + Math.random() * 0.3;
}

starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const starsMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.8,                // Kích thước cơ bản
    map: createCircleTexture(), // Dùng texture hình tròn
    transparent: true,
    opacity: 0.9,
    sizeAttenuation: true,     // Sao ở gần sẽ to hơn sao ở xa
    depthWrite: false,
    blending: THREE.AdditiveBlending // Cộng màu để lung linh hơn
});

const stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);

// --- 3. ANIMATION (HIỆU ỨNG WARP SPEED) ---
function animate() {
    requestAnimationFrame(animate);

    const positions = starsGeometry.attributes.position.array;

    for (let i = 0; i < starCount; i++) {
        // Di chuyển sao về phía camera (tăng Z)
        // Chúng ta muốn cảm giác bay tới, tức là sao đi từ âm vô cực về dương vô cực (hoặc ngược lại tùy camera)
        // Ở đây camera z=1, ta cho sao tăng Z để bay về phía camera

        positions[i * 3 + 2] += velocities[i];

        // Nếu sao bay qua mặt camera (Z > 200), reset nó về phía xa (Z = -200)
        if (positions[i * 3 + 2] > 200) {
            positions[i * 3 + 2] = -200;

            // Reset cả X, Y ngẫu nhiên lại để không bị lặp lại pattern cũ
            positions[i * 3] = (Math.random() - 0.5) * 400;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 400;
        }
    }

    // Đánh dấu cần cập nhật lại vị trí cho GPU
    starsGeometry.attributes.position.needsUpdate = true;

    // Xoay nhẹ toàn bộ hệ sao để tạo cảm giác lượn lờ tự nhiên hơn (optional)
    stars.rotation.z += 0.0005;

    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
