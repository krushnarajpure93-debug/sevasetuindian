const darkModeToggle = document.getElementById('dark-mode-toggle');

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    
    const icon = darkModeToggle.querySelector('i');
    if (document.body.classList.contains('dark-theme')) {
        icon.classList.replace('fa-regular', 'fa-solid');
        icon.style.color = '#ffc107'; // पिवळा रंग (Active Sun effect)
    } else {
        icon.classList.replace('fa-solid', 'fa-regular');
        icon.style.color = '';
    }
});
// १. आधी तुमचा डार्क मोडचा जुना कोड असेल
const toggleButton = document.getElementById('dark-mode-toggle');
// ... तुमचा जुना कोड इथे असेल ...

// २. आणि आता हा नवीन कोड एकदम शेवटी पेस्ट करा:
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});


const hiddenElements = document.querySelectorAll('.category-card, .appointment-card, .feature-item');
hiddenElements.forEach((el) => observer.observe(el));

