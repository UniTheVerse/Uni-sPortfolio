/**
 * Roblox Animator Portfolio - script.js
 * Handles starfield animation, scroll reveals, and video interactions.
 */

// --- Starfield Animation ---
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

let stars = [];
const starCount = 150;

function initStars() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = [];
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2,
            speed: Math.random() * 0.5 + 0.1,
            opacity: Math.random()
        });
    }
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const scrollY = window.scrollY;
    
    // Draw subtle nebula glow
    const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width
    );
    gradient.addColorStop(0, '#1a0b2e');
    gradient.addColorStop(1, '#050508');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        
        // Parallax effect: Offset Y based on scroll and star size (depth)
        // Larger stars (closer) move more than smaller stars (further)
        const parallaxOffset = scrollY * (star.size * 0.2);
        let drawY = (star.y - parallaxOffset) % canvas.height;
        if (drawY < 0) drawY += canvas.height;

        ctx.arc(star.x, drawY, star.size, 0, Math.PI * 2);
        ctx.fill();

        star.y -= star.speed;
        if (star.y < 0) {
            star.y = canvas.height;
            star.x = Math.random() * canvas.width;
        }
    });
    requestAnimationFrame(animateStars);
}

window.addEventListener('resize', initStars);
initStars();
animateStars();

// --- Dynamic Portfolio Generation ---
const portfolioGrid = document.getElementById('portfolio-grid');
const videoCount = 29;

/**
 * EDIT THIS ARRAY TO CHANGE VIDEO TITLES AND DESCRIPTIONS
 * You can add as many as you want. If a video isn't listed here, 
 * it will use a generic title and category.
 */
const videoData = [
    { id: 1, title: "BellySlide", desc: "R6 Moon Animation" },
    { id: 2, title: "Jumping", desc: "R6 Moon Animation" },
    { id: 3, title: "Landing ", desc: "R6 Moon Animation" },
    { id: 4, title: "Sprint Cycle", desc: "Fluid R6 Motion" },
    { id: 5, title: "Idle Cycle", desc: "Fluid R6 Motion" },
    { id: 6, title: "Walk Cycle", desc: "Fluid R6 Motion" },
    { id: 7, title: "DriftWood Duck Idle", desc: "Custom Rig" },
    { id: 8, title: "DriftWood Duck Walk", desc: "Custom Rig" },
    { id: 9, title: "Gloop Idle", desc: "Custom Rig" },
    { id: 10, title: "Gloop Walk", desc: "Custom Rig" },
    { id: 11, title: "Doug NPC Happy", desc: "Custom Rig" },
    { id: 12, title: "Doug NPC Talk", desc: "Custom Rig" },
    { id: 13, title: "Doug NPC Idle", desc: "Custom Rig" },
    { id: 14, title: "Rock Beetle Walk", desc: "Custom Rig" },
    { id: 15, title: "Rock Beetle Idle", desc: "Custom Rig" },
    { id: 16, title: "DarkScribe Death", desc: "Custom Rig" },
    { id: 17, title: "DarkScribe Attack 1", desc: "Custom Rig" },
    { id: 18, title: "DarkScribe Attack 2", desc: "Custom Rig" },
    { id: 19, title: "DarkScribe Idle", desc: "Custom Rig" },
    { id: 20, title: "DarkScribe Hit 1", desc: "Custom Rig" },
    { id: 21, title: "DarkScribe Hit 2", desc: "Custom Rig" },
    { id: 22, title: "DarkScribe Movement", desc: "Custom Rig" },
    { id: 23, title: "R6 Clapping", desc: "R6 Moon Animation" },
    { id: 24, title: "R6 Backflip", desc: "R6 Moon Animation" },
    { id: 25, title: "R6 Talking", desc: "R6 Moon Animation" },
    { id: 26, title: "R6 Idle", desc: "R6 Moon Animation" },
    { id: 27, title: "R6 Idle V2", desc: "R6 Moon Animation" },
    { id: 28, title: "R6 Teleport", desc: "R6 Moon Animation" },
    { id: 29, title: "Sizzle Idle", desc: "Custom Rig" },
    // Add more here...
];

/**
 * EDIT THIS ARRAY TO CHANGE RIG TITLES AND DESCRIPTIONS
 */
const rigData = [
    { id: 1, title: "DriftWood Duck", desc: "Custom Rigging & Modeling" },
    { id: 2, title: "Rock Beetle", desc: "Mechanical Rig Design" },
    { id: 3, title: "DarkScribe", desc: "Humanoid Rig" },
    { id: 4, title: "Sizzle", desc: "Complex Humanoid Rig" },
    { id: 5, title: "Tharolos", desc: "Very Complex Humanoid Rig" },
    { id: 6, title: "Fairy Mole", desc: "Complex Humanoid Rig" },
    { id: 7, title: "Beach Cat", desc: "Cat Rig" },
    { id: 8, title: "frog", desc: "Complex frog Rig" },
    { id: 9, title: "CrystallineTurtle", desc: "Complex Turtle Rig" },
    { id: 10, title: "Doug", desc: "Complex Humanoid Rig" },
    // Add more here...
];

if (portfolioGrid) {
    for (let i = 1; i <= videoCount; i++) {
        const item = document.createElement('div');
        item.className = 'portfolio-item fade-in';
        
        // Find custom data or use defaults
        const customData = videoData.find(v => v.id === i);
        const categories = ['Combat Animation', 'Movement Set', 'Custom Rig', 'Cinematic', 'Rigging Showcase'];
        
        const title = customData ? customData.title : `Animation #${i}`;
        const category = customData ? customData.desc : categories[i % categories.length];
        
        item.innerHTML = `
            <div class="video-container" onclick="openModal('video', 'assets/video${i}.mp4')">
                <video loop muted playsinline>
                    <source src="assets/video${i}.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <div class="video-overlay">
                    <h3>${title}</h3>
                    <p>${category}</p>
                </div>
            </div>
        `;
        portfolioGrid.appendChild(item);
    }
}

// --- Dynamic Rigs Gallery Generation ---
const rigsGrid = document.getElementById('rigs-grid');
const rigCount = 10; // Adjust this number based on how many photos you have

if (rigsGrid) {
    for (let i = 1; i <= rigCount; i++) {
        const item = document.createElement('div');
        item.className = 'portfolio-item fade-in';
        
        const customData = rigData.find(r => r.id === i);
        const title = customData ? customData.title : `Rig #${i}`;
        const desc = customData ? customData.desc : "Custom Rig Showcase";
        
        item.innerHTML = `
            <div class="video-container" onclick="openModal('image', 'assets/rig${i}.png')">
                <img src="assets/rig${i}.png" alt="${title}" style="width: 100%; height: 100%; object-fit: cover; display: block;">
                <div class="video-overlay">
                    <h3>${title}</h3>
                    <p>${desc}</p>
                </div>
            </div>
        `;
        rigsGrid.appendChild(item);
    }
}

// --- Scroll Reveal Animation ---
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

function initObservers() {
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// --- Smooth Scrolling for Navigation ---
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// --- Video Hover Play/Pause ---
function initVideoListeners() {
    document.querySelectorAll('.video-container video').forEach(video => {
        let isHovered = false;

        video.addEventListener('mouseenter', () => {
            isHovered = true;
            const playPromise = video.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    if (!isHovered) {
                        video.pause();
                        video.currentTime = 0;
                    }
                }).catch(error => {
                    if (error.name !== 'AbortError') {
                        console.log("Video play error:", error);
                    }
                });
            }
        });

        video.addEventListener('mouseleave', () => {
            isHovered = false;
            if (video.readyState >= 2) {
                 video.pause();
                 video.currentTime = 0;
            }
        });
    });
}

// --- Sound Effects Logic ---
let isMuted = false;
const soundToggle = document.getElementById('sound-toggle');
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
    if (isMuted) return;
    
    // Resume audio context if it was suspended (browser policy)
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    if (type === 'hover') {
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.1);
    } else if (type === 'click') {
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(400, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.2);
    } else if (type === 'open') {
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(600, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1000, audioCtx.currentTime + 0.3);
        gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.3);
    }
}

if (soundToggle) {
    soundToggle.addEventListener('click', () => {
        isMuted = !isMuted;
        soundToggle.classList.toggle('muted', isMuted);
        const icon = soundToggle.querySelector('i');
        if (icon) {
            icon.setAttribute('data-lucide', isMuted ? 'volume-x' : 'volume-2');
            if (window.lucide) window.lucide.createIcons();
        }
    });
}

// Add sound listeners to buttons and interactive elements
function initSoundListeners() {
    const interactiveElements = document.querySelectorAll('a, .btn, .portfolio-item, .skill-card, .modal-close, .modal-fullscreen, .sound-toggle');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => playSound('hover'));
        el.addEventListener('click', () => playSound('click'));
    });
}

// --- Modal Logic ---
const modal = document.getElementById('media-modal');
const modalWrapper = document.getElementById('modal-wrapper');
const modalContainer = document.getElementById('modal-media-container');
const modalClose = document.querySelector('.modal-close');
const modalFullscreenBtn = document.getElementById('modal-fullscreen-btn');

function openModal(type, src) {
    if (!modal || !modalContainer) return;
    
    modalContainer.innerHTML = '';
    
    if (type === 'video') {
        const video = document.createElement('video');
        video.src = src;
        video.controls = true;
        video.autoplay = true;
        video.loop = true;
        // Disable native fullscreen button via attribute where supported
        video.setAttribute('controlslist', 'nofullscreen');
        modalContainer.appendChild(video);
    } else {
        const img = document.createElement('img');
        img.src = src;
        modalContainer.appendChild(img);
    }
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    
    playSound('open');
    
    // Re-initialize icons if needed
    if (window.lucide) window.lucide.createIcons();
}

function toggleFullscreen() {
    if (!modalWrapper) return;
    
    if (!document.fullscreenElement) {
        modalWrapper.requestFullscreen().catch(err => {
            console.error(`Error attempting to enable full-screen mode: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

if (modalFullscreenBtn) {
    modalFullscreenBtn.onclick = toggleFullscreen;
}

if (modalClose) {
    modalClose.onclick = closeModal;
}

if (modal) {
    modal.onclick = (e) => {
        if (e.target === modal) closeModal();
    };
}

function closeModal() {
    if (!modal) return;
    modal.style.display = 'none';
    modalContainer.innerHTML = '';
    document.body.style.overflow = 'auto';
}

// Close modal on Escape key
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// Initialize everything
initVideoListeners();
initObservers();
initSoundListeners();

// --- Console Welcome Message ---
console.log('%c Roblox Animator Portfolio Loaded ', 'background: #8a2be2; color: #fff; font-weight: bold; padding: 4px;');

