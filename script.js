/**
 * SURYAKANT CHATURVEDI - MERN STACK DEVELOPER PORTFOLIO ENGINE
 * High-performance, vanilla JavaScript powering UI animations and interactions.
 */

// ======= Interactive Particle Canvas =======
function initCanvas() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let animationFrameId;

    const mouse = {
        x: null,
        y: null,
        radius: 120
    };

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2 + 0.8;
            this.baseX = this.x;
            this.baseY = this.y;
            this.density = (Math.random() * 20) + 1;
            this.speedX = (Math.random() - 0.5) * 0.6;
            this.speedY = (Math.random() - 0.5) * 0.6;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > width) this.speedX *= -1;
            if (this.y < 0 || this.y > height) this.speedY *= -1;

            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.hypot(dx, dy);
                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    const directionX = (dx / distance) * force * this.density;
                    const directionY = (dy / distance) * force * this.density;
                    this.x -= directionX * 0.6;
                    this.y -= directionY * 0.6;
                }
            }
        }

        draw() {
            const isLight = document.body.classList.contains('light-theme');
            ctx.fillStyle = isLight ? 'rgba(0, 168, 107, 0.45)' : 'rgba(0, 242, 150, 0.35)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        const count = Math.min(Math.floor((width * height) / 14000), 75);
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    function connectParticles() {
        const isLight = document.body.classList.contains('light-theme');
        const maxDist = 110;
        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const dist = Math.hypot(dx, dy);

                if (dist < maxDist) {
                    const opacity = (1 - (dist / maxDist)) * (isLight ? 0.12 : 0.15);
                    ctx.strokeStyle = isLight ? `rgba(0, 168, 107, ${opacity})` : `rgba(0, 242, 150, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        connectParticles();
        animationFrameId = requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        resize();
        initParticles();
    });

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    resize();
    initParticles();
    animate();
}

// ======= Splash Screen Loader =======
function initSplashScreen() {
    const splash = document.getElementById('splash-screen');
    const progressBar = document.querySelector('.loader-progress');
    const loaderStatus = document.querySelector('.loader-status');

    if (!splash) return;

    setTimeout(() => {
        if (progressBar) progressBar.style.width = '100%';
        if (loaderStatus) loaderStatus.textContent = 'Welcome!';
    }, 200);

    setTimeout(() => {
        splash.classList.add('fade-out');
        document.body.style.overflow = '';
    }, 1100);
}

// ======= Typing Text Effect =======
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const phrases = [
        'MERN Stack Developer',
        'Frontend Developer',
        'Node.js & Express.js',
        'FastAPI & Python'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 45;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 85;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 1800;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 400;
        }

        setTimeout(type, typingSpeed);
    }

    setTimeout(type, 800);
}

// ======= Header Scroll, Progress Bar & ScrollSpy =======
function initScrollBehaviors() {
    const header = document.getElementById('main-header');
    const scrollProgress = document.getElementById('scroll-progress');
    const backToTop = document.getElementById('back-to-top');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function onScroll() {
        const scrollY = window.scrollY;

        if (header) {
            if (scrollY > 40) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        if (scrollProgress) {
            const winScroll = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            scrollProgress.style.width = scrolled + '%';
        }

        if (backToTop) {
            if (scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }

        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// ======= Stats Number Counter =======
function initStatsCounter() {
    const statCards = document.querySelectorAll('.stat-card');
    let hasCounted = false;

    function countUp() {
        statCards.forEach(card => {
            const numberEl = card.querySelector('.stat-number');
            if (!numberEl) return;
            const target = parseInt(numberEl.getAttribute('data-target'), 10) || 0;
            const duration = 1800;
            const stepTime = 25;
            const steps = duration / stepTime;
            const increment = target / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    numberEl.textContent = target;
                    clearInterval(timer);
                } else {
                    numberEl.textContent = Math.floor(current);
                }
            }, stepTime);
        });
    }

    const statsSection = document.getElementById('stats');
    if (!statsSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasCounted) {
                hasCounted = true;
                countUp();
            }
        });
    }, { threshold: 0.3 });

    observer.observe(statsSection);
}

// ======= Skills Progress Bar Animation =======
function initSkillsAnimation() {
    const skillsSection = document.getElementById('skills');
    const skillBars = document.querySelectorAll('.skill-progress');
    let animated = false;

    if (!skillsSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width') || '0%';
                    bar.style.width = width;
                });
            }
        });
    }, { threshold: 0.2 });

    observer.observe(skillsSection);
}

// ======= Project Filtering =======
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 20);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });
}

// ======= Theme Switcher (Dark / Light) =======
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        if (icon) icon.className = 'fas fa-sun';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        const isLight = body.classList.contains('light-theme');

        if (isLight) {
            if (icon) icon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'light');
            showToast('Light theme enabled', 'success');
        } else {
            if (icon) icon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'dark');
            showToast('Dark theme enabled', 'success');
        }
    });
}

// ======= Toast Notifications =======
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const iconClass = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';
    toast.innerHTML = `<i class="fas ${iconClass}"></i><span>${message}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// ======= Copy to Clipboard Action =======
function initCopyableElements() {
    const copyableItems = document.querySelectorAll('.copyable');

    copyableItems.forEach(item => {
        item.addEventListener('click', async () => {
            const textToCopy = item.getAttribute('data-copy');
            if (!textToCopy) return;

            try {
                await navigator.clipboard.writeText(textToCopy);
                showToast(`Copied "${textToCopy}" to clipboard!`, 'success');
            } catch (err) {
                showToast('Unable to copy to clipboard', 'error');
            }
        });
    });
}

// ======= Mobile Menu Toggle =======
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');

    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars-staggered');
            icon.classList.toggle('fa-xmark');
        }
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.className = 'fa-solid fa-bars-staggered';
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if (icon) icon.className = 'fa-solid fa-bars-staggered';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if (icon) icon.className = 'fa-solid fa-bars-staggered';
        }
    });
}

// ======= Contact Form Handling =======
function initContactForm() {
    const form = document.getElementById('main-contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('.btn-submit');
        const originalBtnHTML = submitBtn ? submitBtn.innerHTML : 'Send Message';

        const nameInput = form.querySelector('#form-name');
        const emailInput = form.querySelector('#form-email');
        const messageInput = form.querySelector('#form-message');

        const name = nameInput ? nameInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const message = messageInput ? messageInput.value.trim() : '';

        if (!name || !email || !message) {
            showToast('Please fill in all required fields.', 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showToast('Please enter a valid email address.', 'error');
            return;
        }

        if (submitBtn) {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending Message...</span>';
            submitBtn.disabled = true;
        }

        setTimeout(() => {
            showToast(`Thank you, ${name}! Your message has been sent successfully.`, 'success');
            form.reset();
            if (submitBtn) {
                submitBtn.innerHTML = originalBtnHTML;
                submitBtn.disabled = false;
            }
        }, 1200);
    });
}

// ======= Initialization on DOM Ready =======
document.addEventListener('DOMContentLoaded', () => {
    initSplashScreen();
    initCanvas();
    initTheme();
    initTypingEffect();
    initScrollBehaviors();
    initStatsCounter();
    initSkillsAnimation();
    initProjectFilters();
    initCopyableElements();
    initMobileMenu();
    initContactForm();
});