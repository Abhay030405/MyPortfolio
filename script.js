// Global variables
let cursor = document.querySelector('.cursor');
let cursorDot = document.querySelector('.cursor-dot');
let interactiveElements;

// Menu elements
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

// Loading Screen Animation
document.addEventListener('DOMContentLoaded', function() {
    const loader = document.querySelector('.loader-wrapper');
    const content = document.querySelector('.content-wrapper');
    
    // Add loading class to body to prevent scrolling
    document.body.classList.add('loading');
    
    // Force scroll to top
    window.scrollTo(0, 0);
    
    // Simulate loading time (minimum 2 seconds)
    setTimeout(() => {
        // Add exit animation class to loader
        loader.classList.add('exit');
        
        setTimeout(() => {
            // Hide loader
            loader.classList.add('loaded');
            
            // Show content with staggered animation
            setTimeout(() => {
                content.classList.add('revealed');
                
                // Remove loading class from body
                setTimeout(() => {
                    document.body.classList.remove('loading');
                }, 100);
            }, 600);
        }, 400);
    }, 2000);
});

// Create floating particles
function createParticles() {
    const particles = document.querySelector('.loader-particles');
    for(let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.setProperty('--tx', `${Math.random() * 300 - 150}px`);
        particle.style.setProperty('--ty', `${Math.random() * 300 - 150}px`);
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particles.appendChild(particle);
    }
}

// Initialize particles
createParticles();

document.addEventListener('DOMContentLoaded', () => {
    // Initialize interactive elements
    interactiveElements = document.querySelectorAll('a, button, .tech-icon');
    
    // Add hover effects
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursorDot.classList.add('dot-hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursorDot.classList.remove('dot-hover');
        });
    });
});

// Update cursor position
function updateCursor(e) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
}

document.addEventListener('mousemove', updateCursor);

// Smooth scroll with progress indicator
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = `${progress}%`;
});

// Initialize project cards when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'none';
    });
});

// Journey & Achievements Toggle
const toggleButtons = document.querySelectorAll('.toggle-btn');
const contentSections = document.querySelectorAll('.content-section');

toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetSection = button.dataset.section;
        
        // Update button states
        toggleButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
        
        // Update content sections
        contentSections.forEach(section => {
            if (section.classList.contains(targetSection + '-content')) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    });
});

// Navigation buttons functionality
const projectsGrid = document.querySelector('.projects-grid');
const nextButton = document.querySelector('.next-button');
const prevButton = document.querySelector('.prev-button');

if (nextButton && prevButton && projectsGrid) {
    nextButton.addEventListener('click', () => {
        projectsGrid.scrollBy({
            left: 400 + 32, // card width + gap
            behavior: 'smooth'
        });
    });

    prevButton.addEventListener('click', () => {
        projectsGrid.scrollBy({
            left: -(400 + 32), // card width + gap
            behavior: 'smooth'
        });
    });

    // Update button states
    function updateNavigationButtons() {
        const isAtStart = projectsGrid.scrollLeft <= 0;
        const isAtEnd = projectsGrid.scrollLeft >= projectsGrid.scrollWidth - projectsGrid.clientWidth;
        
        prevButton.disabled = isAtStart;
        nextButton.disabled = isAtEnd;
        
        prevButton.style.opacity = isAtStart ? '0.5' : '1';
        nextButton.style.opacity = isAtEnd ? '0.5' : '1';
    }

    projectsGrid.addEventListener('scroll', updateNavigationButtons);
    window.addEventListener('resize', updateNavigationButtons);
    
    // Initial button state
    updateNavigationButtons();
}

// Project card hover effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
        card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'none';
        card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

// Create observer for fade-in animations
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            fadeObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for fade-in
document.querySelectorAll('.project-card, .hero h1, .hero h2, .hero-buttons').forEach(el => {
    fadeObserver.observe(el);
});

// Enhanced mobile menu functionality
let isMenuOpen = false;

menuBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    menuBtn.classList.toggle('open', isMenuOpen);
    navLinks.classList.toggle('open', isMenuOpen);
    
    if (isMenuOpen) {
        navLinks.style.display = 'flex';
        setTimeout(() => {
            navLinks.style.transform = 'translateY(0)';
            navLinks.style.opacity = '1';
        }, 10);
    } else {
        navLinks.style.transform = 'translateY(-20px)';
        navLinks.style.opacity = '0';
        setTimeout(() => {
            navLinks.style.display = 'none';
        }, 300);
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        // Remove active state from all nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.style.background = 'none';
            link.querySelector('.nav-text').style.color = 'var(--text-dark)';
        });
        
        // Add active state to clicked link
        this.style.background = 'none';
        this.querySelector('.nav-text').style.color = 'var(--text-dark)';
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (isMenuOpen) {
                menuBtn.click();
            }
        }
    });
});

// Text scramble effect for hero heading
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="scramble">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Initialize text scramble effect with AI/ML phrases
const phrases = [
    'Machine Learning Models',
    'Algorithmic Trading Systems',
    'Predictive Market Models',
    'Quantitative Research',
    'Time Series Modeling',
    'High-Frequency Signals'
];

// Update hero title animation
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title .animated-text');
    if (heroTitle) {
        const textScramble = new TextScramble(heroTitle);
        let counter = 0;
        
        const next = () => {
            textScramble.setText(phrases[counter]).then(() => {
                setTimeout(next, 2000);
            });
            counter = (counter + 1) % phrases.length;
        };
        
        next();
    }
});

// About section interactions
function initAboutSection() {
    const profilePhoto = document.querySelector('.profile-photo-container');
    const expertiseItems = document.querySelectorAll('.expertise-item');
    const profileLinks = document.querySelectorAll('.profile-link');

    // Profile photo hover effect
    if (profilePhoto) {
        profilePhoto.addEventListener('mouseenter', () => {
            const photo = profilePhoto.querySelector('.profile-photo');
            photo.style.transform = 'scale(1.1)';
        });

        profilePhoto.addEventListener('mouseleave', () => {
            const photo = profilePhoto.querySelector('.profile-photo');
            photo.style.transform = 'scale(1)';
        });
    }

    // Expertise items hover effect
    expertiseItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('.expertise-icon');
            icon.style.transform = 'scale(1.2) rotate(10deg)';
            icon.style.background = 'rgba(52, 152, 219, 0.3)';
        });

        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('.expertise-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
            icon.style.background = 'rgba(52, 152, 219, 0.2)';
        });
    });

    // Profile links hover effect
    profileLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-5px) scale(1.1)';
        });

        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize about section when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initAboutSection();
});

// Timeline Animation
document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineProgress = document.querySelector('.timeline-progress');

    const options = {
        threshold: 0.2,
        rootMargin: '-50px'
    };

    let maxScroll = 0;

    const updateProgress = () => {
        const scrolled = window.scrollY;
        const timelineTop = document.querySelector('.timeline').offsetTop;
        const timelineHeight = document.querySelector('.timeline').offsetHeight;
        const progressHeight = ((scrolled - timelineTop + window.innerHeight/2) / timelineHeight) * 100;
        
        timelineProgress.style.height = Math.min(Math.max(progressHeight, 0), 100) + '%';
        maxScroll = Math.max(maxScroll, progressHeight);
    };

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                updateProgress();
                timelineObserver.unobserve(entry.target);
            }
        });
    }, options);

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });

    // Update progress bar on scroll
    window.addEventListener('scroll', updateProgress);
});

// Chart.js Configuration
Chart.defaults.color = '#2C3E50';
Chart.defaults.font.family = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

// Initialize all charts when the document is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Customer Churn Model Comparison Chart
    const modelCtx = document.getElementById('modelComparisonChart');
    if (modelCtx) {
        const modelChart = new Chart(modelCtx, {
            type: 'bar',
            data: {
                labels: ['Random Forest', 'XGBoost', 'LGBM', 'Neural Network'],
                datasets: [{
                    label: 'Accuracy',
                    data: [0.89, 0.92, 0.94, 0.91],
                    backgroundColor: 'rgba(52, 152, 219, 0.5)',
                    borderColor: 'rgba(52, 152, 219, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                }
            }
        });

        // Chart control buttons
        document.querySelectorAll('[data-chart="modelComparison"]').forEach(button => {
            button.addEventListener('click', function() {
                const metric = this.dataset.metric;
                const buttons = document.querySelectorAll('[data-chart="modelComparison"]');
                buttons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                if (metric === 'accuracy') {
                    modelChart.data.datasets[0].label = 'Accuracy';
                    modelChart.data.datasets[0].data = [0.89, 0.92, 0.94, 0.91];
                } else {
                    modelChart.data.datasets[0].label = 'F1 Score';
                    modelChart.data.datasets[0].data = [0.87, 0.91, 0.92, 0.89];
                }
                modelChart.update();
            });
        });
    }

    // Image Classification Chart
    const imageClassCtx = document.getElementById('imageClassificationChart');
    if (imageClassCtx) {
        const imageClassChart = new Chart(imageClassCtx, {
            type: 'line',
            data: {
                labels: ['Epoch 1', 'Epoch 2', 'Epoch 3', 'Epoch 4', 'Epoch 5', 'Epoch 6', 'Epoch 7', 'Epoch 8'],
                datasets: [{
                    label: 'Training Accuracy',
                    data: [0.82, 0.86, 0.89, 0.91, 0.93, 0.94, 0.95, 0.962],
                    borderColor: '#3498DB',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                }
            }
        });

        // Chart control buttons
        document.querySelectorAll('[data-chart="imageClassification"]').forEach(button => {
            button.addEventListener('click', function() {
                const metric = this.dataset.metric;
                const buttons = document.querySelectorAll('[data-chart="imageClassification"]');
                buttons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                if (metric === 'accuracy') {
                    imageClassChart.data.datasets[0].label = 'Training Accuracy';
                    imageClassChart.data.datasets[0].data = [0.82, 0.86, 0.89, 0.91, 0.93, 0.94, 0.95, 0.962];
                } else {
                    imageClassChart.data.datasets[0].label = 'Training Loss';
                    imageClassChart.data.datasets[0].data = [0.42, 0.35, 0.28, 0.22, 0.18, 0.15, 0.12, 0.10];
                }
                imageClassChart.update();
            });
        });
    }

    // Stock Predictor Chart
    const stockPredictorCtx = document.getElementById('stockPredictorChart');
    if (stockPredictorCtx) {
        const stockPredictorChart = new Chart(stockPredictorCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                datasets: [{
                    label: 'Actual Price',
                    data: [150, 152, 148, 155, 159],
                    borderColor: '#2C3E50',
                    backgroundColor: 'rgba(44, 62, 80, 0.1)',
                    fill: false,
                    tension: 0.4
                }, {
                    label: 'Predicted Price',
                    data: [151, 153, 147, 156, 158],
                    borderColor: '#3498DB',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    fill: false,
                    tension: 0.4,
                    borderDash: [5, 5]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                }
            }
        });

        // Chart control buttons
        document.querySelectorAll('[data-chart="stockPredictor"]').forEach(button => {
            button.addEventListener('click', function() {
                const metric = this.dataset.metric;
                const buttons = document.querySelectorAll('[data-chart="stockPredictor"]');
                buttons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                if (metric === '1week') {
                    stockPredictorChart.data.labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
                    stockPredictorChart.data.datasets[0].data = [150, 152, 148, 155, 159];
                    stockPredictorChart.data.datasets[1].data = [151, 153, 147, 156, 158];
                } else {
                    stockPredictorChart.data.labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
                    stockPredictorChart.data.datasets[0].data = [155, 162, 158, 165];
                    stockPredictorChart.data.datasets[1].data = [156, 160, 159, 164];
                }
                stockPredictorChart.update();
            });
        });
    }

    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });

    // Animate metrics on scroll
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const metricsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const metrics = entry.target.querySelectorAll('.metric-score');
                metrics.forEach(metric => {
                    metric.style.animation = 'countUp 1s ease-out forwards';
                });
                metricsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.model-metrics').forEach(metrics => {
        metricsObserver.observe(metrics);
    });

    // Journey & Achievements Toggle
    const journeyToggleButtons = document.querySelectorAll('.toggle-btn');
    const journeyContentSections = document.querySelectorAll('.journey-content, .achievements-content');

    journeyToggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetSection = button.dataset.section;
            
            // Update button states
            journeyToggleButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update content sections
            journeyContentSections.forEach(section => {
                if (section.classList.contains(targetSection + '-content')) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });
        });
    });

    // Expertise Section Toggle
    const expertiseToggleButtons = document.querySelectorAll('.expertise-toggle-btn');
    const expertiseContentSections = document.querySelectorAll('.expertise-section .content-section');

    expertiseToggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetSection = button.getAttribute('data-section');
            
            // Update button states
            expertiseToggleButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update content sections
            expertiseContentSections.forEach(section => {
                if (section.id === targetSection) {
                    // First set display to block and wait for next frame
                    section.style.display = 'block';
                    section.style.opacity = '0';
                    section.style.transform = 'translateY(20px)';
                    section.classList.add('active');
                    
                    // Then animate in
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            section.style.opacity = '1';
                            section.style.transform = 'translateY(0)';
                        });
                    });
                } else {
                    section.classList.remove('active');
                    section.style.opacity = '0';
                    section.style.transform = 'translateY(20px)';
                    
                    // Wait for fade out before hiding
                    setTimeout(() => {
                        section.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
});

// Initialize skills section animations
function initializeSkills() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate progress bars
                entry.target.querySelectorAll('.progress').forEach(progress => {
                    const width = progress.style.width;
                    progress.style.width = '0';
                    setTimeout(() => {
                        progress.style.width = width;
                    }, 100);
                });

                // Animate metric numbers
                entry.target.querySelectorAll('.metric-number').forEach(number => {
                    const value = number.textContent;
                    number.textContent = '0';
                    animateNumber(number, value);
                });

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    // Observe expertise cards
    document.querySelectorAll('.expertise-card').forEach(card => {
        observer.observe(card);
    });

    // Observe metrics section
    const metricsSection = document.querySelector('.achievement-metrics');
    if (metricsSection) {
        observer.observe(metricsSection);
    }
}

// Animate number counting
function animateNumber(element, target) {
    const targetNum = parseInt(target);
    let currentNum = 0;
    const duration = 2000; // 2 seconds
    const stepTime = 50; // Update every 50ms
    const steps = duration / stepTime;
    const increment = targetNum / steps;

    const timer = setInterval(() => {
        currentNum += increment;
        if (currentNum >= targetNum) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(currentNum) + '+';
        }
    }, stepTime);
}

// Add hover effects for expertise cards
function initializeHoverEffects() {
    document.querySelectorAll('.expertise-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 10px 30px rgba(0, 255, 255, 0.1)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'none';
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeSkills();
    initializeHoverEffects();
});

// Prevent text selection on navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('mousedown', (e) => {
        e.preventDefault();
    });
    
    link.addEventListener('selectstart', (e) => {
        e.preventDefault();
    });
});

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSectionId = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 100) {
            currentSectionId = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        // Remove any unwanted text decorations
        link.style.textDecoration = 'none';
        link.querySelector('.nav-text').style.textDecoration = 'none';
        
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
        }
    });
}

// Add scroll event listener
window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink); 