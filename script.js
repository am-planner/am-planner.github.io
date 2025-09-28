// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initScrollAnimations();
    initScrollToTop();
    initParallaxEffects();
    initImageLazyLoading();
    
    // Add loading animation to buttons
    addButtonLoadingEffects();
    
    // Initialize citation copy functionality
    initCitationCopy();
    
    // Add hover effects to images
    initImageHoverEffects();
    
    // Initialize responsive video
    initResponsiveVideo();
});

// Scroll animations - simplified to prevent image hiding
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Ensure images are always visible
                if (entry.target.tagName === 'IMG') {
                    entry.target.style.opacity = '1';
                    entry.target.style.visibility = 'visible';
                }
            }
        });
    }, observerOptions);

    // Add animation classes to text elements only, not images
    const animatedElements = document.querySelectorAll('.section-title, .abstract-content p, .citation-box');
    
    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // Ensure all images are visible immediately
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
        img.style.opacity = '1';
        img.style.visibility = 'visible';
        img.style.display = 'block';
    });
}

// Scroll to top functionality
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Parallax effects - disabled to prevent image movement
function initParallaxEffects() {
    // Parallax effects removed to prevent cover image from jumping around
    // The cover image will now stay stable during scrolling
}

// Image lazy loading - disabled to ensure immediate visibility
function initImageLazyLoading() {
    const images = document.querySelectorAll('img');
    
    // Ensure all images are immediately visible
    images.forEach(img => {
        img.style.opacity = '1';
        img.style.visibility = 'visible';
        img.style.display = 'block';
        img.classList.remove('fade-in');
        
        // Add load event listener to handle any loading issues
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.visibility = 'visible';
        });
    });
}

// Button loading effects
function addButtonLoadingEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Don't add loading effect to anchor links
            if (this.getAttribute('href').startsWith('#')) {
                return;
            }
            
            // Add loading animation
            const originalText = this.innerHTML;
            this.innerHTML = '<span class="loading"></span> Loading...';
            this.style.pointerEvents = 'none';
            
            // Reset after 2 seconds (for demo purposes)
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.pointerEvents = 'auto';
            }, 2000);
        });
    });
}

// Citation copy functionality
function initCitationCopy() {
    // This function is called by the copy button onclick
}

function copyToClipboard() {
    const citationText = document.getElementById('citation-text').textContent;
    const copyBtn = document.querySelector('.copy-btn');
    
    navigator.clipboard.writeText(citationText).then(() => {
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        copyBtn.style.background = '#27ae60';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.style.background = '#3498db';
        }, 2000);
    }).catch(err => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = citationText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        copyBtn.style.background = '#27ae60';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.style.background = '#3498db';
        }, 2000);
    });
}

// Image hover effects
function initImageHoverEffects() {
    const images = document.querySelectorAll('.result-image, .responsive-image, .cover-image');
    
    images.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.1) contrast(1.1)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1) contrast(1)';
        });
    });
}

// Responsive video functionality
function initResponsiveVideo() {
    const video = document.querySelector('.demo-video');
    
    if (video) {
        // Add loading state
        video.addEventListener('loadstart', function() {
            this.style.opacity = '0.7';
        });
        
        video.addEventListener('loadeddata', function() {
            this.style.opacity = '1';
        });
        
        // Add smooth fade in when video comes into view
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.classList.add('fade-in', 'visible');
                    videoObserver.unobserve(video);
                }
            });
        }, { threshold: 0.3 });
        
        videoObserver.observe(video);
    }
}


// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add typing animation to title
function initTypingAnimation() {
    const title = document.querySelector('.hero-title');
    if (title) {
        const text = title.textContent;
        title.textContent = '';
        title.style.borderRight = '2px solid #3498db';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 35);
            } else {
                setTimeout(() => {
                    title.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        setTimeout(typeWriter, 500);
    }
}

// Initialize on page load
window.addEventListener('load', function() {
    // Remove any loading states
    document.body.classList.add('loaded');
    
    // Initialize typing animation after a delay
    setTimeout(initTypingAnimation, 1000);
});

// Mouse movement parallax effect removed to prevent image instability

// Add intersection observer for counter animations
function initCounterAnimations() {
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                let current = 0;
                const increment = target / 100;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current);
                        setTimeout(updateCounter, 20);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Add progress bar animation
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const progress = progressBar.getAttribute('data-progress');
                progressBar.style.width = progress + '%';
                progressObserver.unobserve(progressBar);
            }
        });
    });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// Error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        console.warn(`Failed to load image: ${this.src}`);
        // Try to reload the image once
        if (!this.hasAttribute('data-retry')) {
            this.setAttribute('data-retry', 'true');
            setTimeout(() => {
                this.src = this.src + '?' + Date.now(); // Add cache buster
            }, 1000);
        } else {
            this.style.display = 'none';
            console.error(`Image failed to load after retry: ${this.src}`);
        }
    });
    
    img.addEventListener('load', function() {
        this.style.opacity = '1';
        console.log(`Successfully loaded image: ${this.src}`);
    });
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    // Press 'T' to scroll to top
    if (e.key === 't' || e.key === 'T') {
        scrollToTop();
    }
    
    // Press 'C' to copy citation
    if (e.key === 'c' || e.key === 'C') {
        if (e.ctrlKey || e.metaKey) {
            return; // Don't interfere with normal copy
        }
        copyToClipboard();
    }
});

// Performance optimization: throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
const throttledScroll = throttle(function() {
    // Any scroll-based animations go here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScroll);

// Add service worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful');
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}
