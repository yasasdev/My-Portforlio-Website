document.addEventListener("DOMContentLoaded", function () {
    // Initialize AOS for scroll animations
    AOS.init();
 
    // Initialize Typed.js for text typing effect
    var options = {
        strings: ["Developer", "Mobile App Developer", "API Developer", "POS System Developer"],
        typeSpeed: 50,
        backSpeed: 70,
        backDelay: 1000,
        startDelay: 2000,
        loop: true
    };
    var typed = new Typed(".typed", options);

    // Select all links inside the navmenu
    const navLinks = document.querySelectorAll('#navmenu ul li a');

    // Add click event listener to each link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Remove the 'active' class from any previously active link
            navLinks.forEach(link => link.classList.remove('active'));

            // Add the 'active' class to the clicked link
            this.classList.add('active');
        });
    });

 
    // Initialize GLightbox
    const lightbox = GLightbox();

    new PureCounter();

    // Ensure AOS is initialized
    // Initialize AOS
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true
    });

    // Function to animate the progress bars
    function animateProgressBar(bar) {
        const value = bar.getAttribute('aria-valuenow');
        bar.style.width = `${value}%`;
    }

    // Observer to watch when progress bars enter the viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBar(entry.target);
                observer.unobserve(entry.target); // Unobserve to avoid re-triggering
            }
        });
    }, { threshold: 0.5 });

    // Attach the observer to each progress bar
    document.querySelectorAll('.progress-bar').forEach(bar => {
        bar.style.width = '0%'; // Start from 0% width for animation
        observer.observe(bar);
    });

    // Initialize Isotope
    const isotopeContainer = document.querySelector('.isotope-container');
    const iso = new Isotope(isotopeContainer, {
        itemSelector: '.isotope-item',
        layoutMode: 'masonry'
    });

    // Filter items on button click
    const filters = document.querySelectorAll('.portfolio-filters li');
    filters.forEach(filter => {
        filter.addEventListener('click', function () {
            // Remove active class from all filters
            filters.forEach(el => el.classList.remove('filter-active'));
            // Add active class to the clicked filter
            this.classList.add('filter-active');
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            // Use Isotope to filter items
            iso.arrange({ filter: filterValue });
        });
    });

    const preloader = document.querySelector('#preloader');
    if (preloader) {
        window.addEventListener('load', () => {
        preloader.remove();
        });
    }

    let scrollTop = document.querySelector('.scroll-top');

    function toggleScrollTop() {
        if (scrollTop) {
        window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
        }
    }
    scrollTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
        top: 0,
        behavior: 'smooth'
        });
    });

    window.addEventListener('load', toggleScrollTop);
    document.addEventListener('scroll', toggleScrollTop);

 });