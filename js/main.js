  

                    // Initialize all features when DOM is loaded
                    document.addEventListener('DOMContentLoaded', function () {
                        // Create floating icons
                        createFloatingIcons();

                        // Initialize background slideshow
                        initSlideshow();

                        // Initialize audio player
                        initAudioPlayer();

                        // Initialize guest carousel
                        initGuestCarousel();

                        // Initialize world map (but don't show it yet)
                        initMap();

                        // Initialize stats counter
                        initStatsCounter();

                        // Initialize 3D logo animation
                        initLogoAnimation();

                        // Initialize particle background
                        initParticles();

                        // Initialize dark mode
                        initDarkMode();

                        // Initialize smooth scrolling
                        initSmoothScrolling();

                        // Initialize back to top button
                        initBackToTop();

                        // Initialize contact form
                        initContactForm();

                        // Initialize testimonial slider
                        initTestimonialSlider();
                    });

                    // Create floating icons
                    function createFloatingIcons() {
                        const iconsContainer = document.getElementById('floating-icons');
                        const icons = [
                            'fas fa-globe',
                            'fas fa-microphone',
                            'fas fa-headphones',
                            'fas fa-comments',
                            'fas fa-book',
                            'fas fa-newspaper',
                            'fas fa-podcast',
                            'fas fa-volume-up',
                            'fas fa-users',
                            'fas fa-handshake',
                            'fas fa-flag',
                            'fas fa-map',
                        ];

                        for (let i = 0; i < 20; i++) {
                            const icon = document.createElement('i');
                            icon.className =
                                icons[Math.floor(Math.random() * icons.length)] + ' floating-icon';

                            // Random position
                            const left = Math.random() * 100;
                            const delay = Math.random() * 15;
                            const duration = 15 + Math.random() * 10;

                            icon.style.left = `${left}%`;
                            icon.style.top = `${Math.random() * 100}%`;
                            icon.style.animationDelay = `${delay}s`;
                            icon.style.animationDuration = `${duration}s`;

                            iconsContainer.appendChild(icon);
                        }
                    }

                    // Background slideshow
                    function initSlideshow() {
                        let currentSlide = 0;
                        const slides = document.querySelectorAll('.slide');

                        function showSlide(n) {
                            slides.forEach((slide) => slide.classList.remove('active'));
                            currentSlide = (n + slides.length) % slides.length;
                            slides[currentSlide].classList.add('active');
                        }

                        function nextSlide() {
                            showSlide(currentSlide + 1);
                        }

                        // Change slide every 5 seconds
                        setInterval(nextSlide, 5000);
                    }

                    // Audio player functionality
                    function initAudioPlayer() {
                        const audio = document.getElementById('podcast-audio');
                        const playBtn = document.getElementById('play-icon');
                        const progressBar = document.getElementById('progress-bar');
                        const currentTimeEl = document.getElementById('current-time');
                        const durationEl = document.getElementById('duration');
                        const volumeSlider = document.getElementById('volume-slider');
                        const volumeIcon = document.getElementById('volume-icon');

                        function togglePlay() {
                            if (audio.paused) {
                                audio.play();
                                playBtn.classList.replace('fa-play', 'fa-pause');
                            } else {
                                audio.pause();
                                playBtn.classList.replace('fa-pause', 'fa-play');
                            }
                        }

                        function skipBackward() {
                            audio.currentTime -= 15;
                        }

                        function skipForward() {
                            audio.currentTime += 15;
                        }

                        function seek(e) {
                            const percent = e.offsetX / e.target.offsetWidth;
                            audio.currentTime = percent * audio.duration;
                        }

                        function toggleMute() {
                            audio.muted = !audio.muted;
                            volumeIcon.className = audio.muted
                                ? 'fas fa-volume-mute'
                                : 'fas fa-volume-up';
                            volumeSlider.value = audio.muted ? 0 : audio.volume;
                        }

                        function setVolume(value) {
                            audio.volume = value;
                            audio.muted = value === 0;
                            volumeIcon.className =
                                value === 0 ? 'fas fa-volume-mute' : 'fas fa-volume-up';
                        }

                        function formatTime(seconds) {
                            const minutes = Math.floor(seconds / 60);
                            const secs = Math.floor(seconds % 60);
                            return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
                        }

                        audio.addEventListener('timeupdate', () => {
                            const currentTime = audio.currentTime;
                            const duration = audio.duration;
                            progressBar.style.width = (currentTime / duration) * 100 + '%';
                            currentTimeEl.textContent = formatTime(currentTime);

                            if (!durationEl.textContent.includes('NaN')) {
                                durationEl.textContent = formatTime(duration);
                            }
                        });

                        audio.addEventListener('ended', () => {
                            playBtn.classList.replace('fa-pause', 'fa-play');
                            progressBar.style.width = '0%';
                            currentTimeEl.textContent = '0:00';
                        });

                        // Expose functions to global scope for HTML onclick
                        window.togglePlay = togglePlay;
                        window.skipBackward = skipBackward;
                        window.skipForward = skipForward;
                        window.seek = seek;
                        window.toggleMute = toggleMute;
                        window.setVolume = setVolume;
                    }

                    // Guest carousel
                    function initGuestCarousel() {
                        let currentGuestIndex = 0;
                        const guestTrack = document.getElementById('guest-track');
                        const guestCards = document.querySelectorAll('.guest-card');
                        const guestDots = document.querySelectorAll('.carousel-dot');
                        const cardWidth = 300; // Should match your CSS min-width for guest-card
                        const margin = 20; // Should match your CSS margin for guest-card

                        function updateGuestCarousel() {
                            const offset = -currentGuestIndex * (cardWidth + margin * 2);
                            guestTrack.style.transform = `translateX(${offset}px)`;

                            guestDots.forEach((dot, index) => {
                                dot.classList.toggle('active', index === currentGuestIndex);
                            });
                        }

                        function nextGuest() {
                            currentGuestIndex = (currentGuestIndex + 1) % guestCards.length;
                            updateGuestCarousel();
                        }

                        function prevGuest() {
                            currentGuestIndex =
                                (currentGuestIndex - 1 + guestCards.length) % guestCards.length;
                            updateGuestCarousel();
                        }

                        function goToGuest(index) {
                            currentGuestIndex = index;
                            updateGuestCarousel();
                        }

                        // Expose functions to global scope for HTML onclick
                        window.nextGuest = nextGuest;
                        window.prevGuest = prevGuest;
                        window.goToGuest = goToGuest;

                        // Initialize carousel
                        updateGuestCarousel();
                    }

                    // Initialize map
                    function initMap() {
                        const map = L.map('map-container').setView([0.0236, 37.9062], 6);

                        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                            attribution:
                                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                        }).addTo(map);

                        // Sample listener data (replace with your actual data)
                        const listenerData = [
                            { lat: 40.7128, lng: -74.006, count: 1200, country: 'USA' },
                            { lat: 51.5074, lng: -0.1278, count: 850, country: 'UK' },
                            { lat: 48.8566, lng: 2.3522, count: 750, country: 'France' },
                            { lat: 35.6762, lng: 139.6503, count: 600, country: 'Japan' },
                            { lat: -33.8688, lng: 151.2093, count: 450, country: 'Australia' },
                            { lat: 28.6139, lng: 77.209, count: 300, country: 'India' },
                            { lat: -22.9068, lng: -43.1729, count: 250, country: 'Brazil' },
                            { lat: 55.7558, lng: 37.6173, count: 200, country: 'Russia' },
                            { lat: -26.2041, lng: 28.0473, count: 150, country: 'South Africa' },
                            { lat: 30.0444, lng: 31.2357, count: 100, country: 'Egypt' },
                        ];

                        // Add markers for each country
                        listenerData.forEach((data) => {
                            let color;
                            if (data.count >= 1000) color = '#ff9e00';
                            else if (data.count >= 500) color = '#1a73e8';
                            else if (data.count >= 100) color = '#6f9dff';
                            else color = '#a0c1ff';

                            const marker = L.circleMarker([data.lat, data.lng], {
                                radius: Math.log(data.count) * 2,
                                fillColor: color,
                                color: '#fff',
                                weight: 1,
                                opacity: 1,
                                fillOpacity: 0.8,
                            }).addTo(map);

                            marker.bindPopup(
                                `<b>${data.country}</b><br>Listeners: ${data.count}`
                            );
                        });
                    }

                    // Toggle map visibility

                    function toggleMap() {
                        const map = document.querySelector('.listener-map');
                        if (map.style.display === 'block') {
                            map.style.display = 'none';
                        } else {
                            map.style.display = 'block';
                            // Animate stats when map is shown
                            animateStats();
                        }
                    }

                    // Animated stats counter
                    function initStatsCounter() {
                        // This is now handled by the animateStats function when map is shown
                    }

                    function animateStats() {
                        const statNumbers = document.querySelectorAll('.stat-number');

                        statNumbers.forEach((stat) => {
                            const target = parseInt(stat.getAttribute('data-count'));
                            const suffix = stat.textContent.match(/\D+$/)
                                ? stat.textContent.match(/\D+$/)[0]
                                : '';
                            const duration = 2000; // Animation duration in ms
                            const step = target / (duration / 16); // 60fps
                            let current = 0;

                            const updateStat = () => {
                                current += step;
                                if (current < target) {
                                    stat.textContent = Math.floor(current) + suffix;
                                    requestAnimationFrame(updateStat);
                                } else {
                                    stat.textContent = target + suffix;
                                }
                            };

                            updateStat();
                        });
                    }

                    // 3D Logo Animation
                    function initLogoAnimation() {
                        VANTA.NET({
                            el: '#logo-canvas',
                            mouseControls: true,
                            touchControls: true,
                            gyroControls: false,
                            minHeight: 200.0,
                            minWidth: 200.0,
                            scale: 1.0,
                            scaleMobile: 1.0,
                            color: 0x1a73e8,
                            backgroundColor: 0x0,
                            points: 12.0,
                            maxDistance: 22.0,
                            spacing: 18.0,
                        });
                    }

                    // Particle background
                    function initParticles() {
                        particlesJS('particles-js', {
                            particles: {
                                number: {
                                    value: 80,
                                    density: {
                                        enable: true,
                                        value_area: 800,
                                    },
                                },
                                color: {
                                    value: '#1a73e8',
                                },
                                shape: {
                                    type: 'circle',
                                    stroke: {
                                        width: 0,
                                        color: '#000000',
                                    },
                                    polygon: {
                                        nb_sides: 5,
                                    },
                                },
                                opacity: {
                                    value: 0.5,
                                    random: false,
                                    anim: {
                                        enable: false,
                                        speed: 1,
                                        opacity_min: 0.1,
                                        sync: false,
                                    },
                                },
                                size: {
                                    value: 3,
                                    random: true,
                                    anim: {
                                        enable: false,
                                        speed: 40,
                                        size_min: 0.1,
                                        sync: false,
                                    },
                                },
                                line_linked: {
                                    enable: true,
                                    distance: 150,
                                    color: '#1a73e8',
                                    opacity: 0.4,
                                    width: 1,
                                },
                                move: {
                                    enable: true,
                                    speed: 2,
                                    direction: 'none',
                                    random: false,
                                    straight: false,
                                    out_mode: 'out',
                                    bounce: false,
                                    attract: {
                                        enable: false,
                                        rotateX: 600,
                                        rotateY: 1200,
                                    },
                                },
                            },
                            interactivity: {
                                detect_on: 'canvas',
                                events: {
                                    onhover: {
                                        enable: true,
                                        mode: 'grab',
                                    },
                                    onclick: {
                                        enable: true,
                                        mode: 'push',
                                    },
                                    resize: true,
                                },
                                modes: {
                                    grab: {
                                        distance: 140,
                                        line_linked: {
                                            opacity: 1,
                                        },
                                    },
                                    bubble: {
                                        distance: 400,
                                        size: 40,
                                        duration: 2,
                                        opacity: 8,
                                        speed: 3,
                                    },
                                    repulse: {
                                        distance: 200,
                                        duration: 0.4,
                                    },
                                    push: {
                                        particles_nb: 4,
                                    },
                                    remove: {
                                        particles_nb: 2,
                                    },
                                },
                            },
                            retina_detect: true,
                        });
                    }

                    // Dark mode toggle
                    function initDarkMode() {
                        function toggleDarkMode() {
                            document.body.classList.toggle('dark-mode');
                            localStorage.setItem(
                                'darkMode',
                                document.body.classList.contains('dark-mode')
                            );
                        }

                        // Check for saved dark mode preference
                        if (localStorage.getItem('darkMode') === 'true') {
                            document.body.classList.add('dark-mode');
                        }

                        // Expose function to global scope for HTML onclick
                        window.toggleDarkMode = toggleDarkMode;
                    }

                    // Smooth scrolling for anchor links
                    function initSmoothScrolling() {
                        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
                            if (anchor.getAttribute('href') !== '#merchandise') {
                                anchor.addEventListener('click', function (e) {
                                    e.preventDefault();
                                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                                        behavior: 'smooth',
                                    });
                                    closeMenu(); // Close mobile menu if open

                                    // Show all sections (in case merchandise was shown)
                                    document.querySelectorAll('section').forEach((section) => {
                                        section.style.display = '';
                                    });
                                });
                            }
                        });
                    }

                    // Back to top button
                    function initBackToTop() {
                        const backToTopButton = document.getElementById('back-to-top');

                        window.addEventListener('scroll', function () {
                            if (window.pageYOffset > 300) {
                                backToTopButton.classList.add('visible');
                            } else {
                                backToTopButton.classList.remove('visible');
                            }
                        });

                        backToTopButton.addEventListener('click', function () {
                            window.scrollTo({
                                top: 0,
                                behavior: 'smooth',
                            });
                        });
                    }

                    // Contact form
                    function initContactForm() {
                        const contactForm = document.getElementById('contactForm');
                        const formStatus = document.querySelector('.form-status');

                        contactForm.addEventListener('submit', function (e) {
                            e.preventDefault();

                            // Show loading state
                            formStatus.textContent = 'Sending your message...';
                            formStatus.className = 'form-status';

                            // Simulate form submission (replace with actual AJAX call)
                            setTimeout(() => {
                                formStatus.textContent =
                                    "Thank you! Your message has been sent. We'll get back to you soon.";
                                formStatus.className = 'form-status success';
                                contactForm.reset();

                                // Clear success message after 5 seconds
                                setTimeout(() => {
                                    formStatus.textContent = '';
                                    formStatus.className = 'form-status';
                                }, 5000);
                            }, 1500);
                        });
                    }

                    // Testimonial slider
                    function initTestimonialSlider() {
                        let currentTestimonialIndex = 0;
                        const testimonials = document.querySelectorAll('.testimonial');
                        const testimonialSlider = document.querySelector('.testimonial-slider');
                        const testimonialDots = document.querySelectorAll('.testimonial-dot');
                        const testimonialCount = testimonials.length;
                        let testimonialInterval;

                        function updateTestimonialPosition() {
                            testimonialSlider.style.transform = `translateX(-${currentTestimonialIndex * 100
                                }%)`;

                            // Update dots
                            testimonialDots.forEach((dot, index) => {
                                dot.classList.toggle('active', index === currentTestimonialIndex);
                            });
                        }

                        function nextTestimonial() {
                            currentTestimonialIndex =
                                (currentTestimonialIndex + 1) % testimonialCount;
                            updateTestimonialPosition();
                        }

                        function goToTestimonial(index) {
                            currentTestimonialIndex = index;
                            updateTestimonialPosition();
                            resetTestimonialInterval();
                        }

                        function resetTestimonialInterval() {
                            clearInterval(testimonialInterval);
                            testimonialInterval = setInterval(nextTestimonial, 7000);
                        }

                        // Initialize testimonial slider
                        updateTestimonialPosition();
                        testimonialInterval = setInterval(nextTestimonial, 7000);

                        // Pause on hover
                        testimonialSlider.addEventListener('mouseenter', () => {
                            clearInterval(testimonialInterval);
                        });

                        testimonialSlider.addEventListener('mouseleave', () => {
                            resetTestimonialInterval();
                        });

                        // Expose function to global scope for HTML onclick
                        window.goToTestimonial = goToTestimonial;
                    }

                    // Modal functions
                    function openModal(id) {
                        document.getElementById(id).style.display = 'block';
                        document.body.style.overflow = 'hidden';
                        closeMenu(); // Close mobile menu if open
                    }

                    function closeModal(id) {
                        document.getElementById(id).style.display = 'none';
                        document.body.style.overflow = 'auto';
                    }

                    // Close modal when clicking outside
                    window.onclick = function (event) {
                        if (event.target.className === 'modal') {
                            event.target.style.display = 'none';
                            document.body.style.overflow = 'auto';
                        }
                    };

                    // Mobile menu toggle
                    function toggleMenu() {
                        const navLinks = document.querySelector('.nav-links');
                        const menuIcon = document.getElementById('menu-icon');
                        navLinks.classList.toggle('active');
                        if (navLinks.classList.contains('active')) {
                            menuIcon.classList.replace('fa-bars', 'fa-times');
                        } else {
                            menuIcon.classList.replace('fa-times', 'fa-bars');
                        }
                    }

                    function closeMenu() {
                        const navLinks = document.querySelector('.nav-links');
                        const menuIcon = document.getElementById('menu-icon');
                        navLinks.classList.remove('active');
                        menuIcon.classList.replace('fa-times', 'fa-bars')
                    }
                    // Slideshow functionality
                    let slideIndex = 1;
                    let slideInterval;

                    function showSlides(n) {
                        let i;
                        let slides = document.getElementsByClassName("slideshow-slide");
                        let dots = document.getElementsByClassName("slideshow-dot");

                        if (n > slides.length) { slideIndex = 1 }
                        if (n < 1) { slideIndex = slides.length }

                        for (i = 0; i < slides.length; i++) {
                            slides[i].style.display = "none";
                        }

                        for (i = 0; i < dots.length; i++) {
                            dots[i].className = dots[i].className.replace(" active", "");
                        }

                        slides[slideIndex - 1].style.display = "block";
                        dots[slideIndex - 1].className += " active";

                        // Reset the timer when manually changing slides
                        clearInterval(slideInterval);
                        slideInterval = setInterval(() => plusSlides(1), 5000); // Change slide every 5 seconds
                    }

                    function plusSlides(n) {
                        showSlides(slideIndex += n);
                    }

                    function currentSlide(n) {
                        showSlides(slideIndex = n);
                    }

                    // Initialize the slideshow
                    document.addEventListener('DOMContentLoaded', function () {
                        showSlides(slideIndex);
                        slideInterval = setInterval(() => plusSlides(1), 5000); // Change slide every 5 seconds

                        // Pause on hover
                        const slideshow = document.querySelector('.slideshow-container');
                        slideshow.addEventListener('mouseenter', () => {
                            clearInterval(slideInterval);
                        });

                        slideshow.addEventListener('mouseleave', () => {
                            slideInterval = setInterval(() => plusSlides(1), 5000);
                        });
                    });
                    // Show host modal
                    function showHostModal() {
                        document.getElementById('hostModal').style.display = 'block';
                        document.body.style.overflow = 'hidden';
                    }

                    // Close modal
                    function closeModal(id) {
                        document.getElementById(id).style.display = 'none';
                        document.body.style.overflow = 'auto';
                    }

                    // Close when clicking outside modal
                    window.addEventListener('click', function (event) {
                        if (event.target.className === 'modal') {
                            closeModal('hostModal');
                        }
                    });
                