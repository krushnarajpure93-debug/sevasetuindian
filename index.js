// १. एकापेक्षा जास्त कंटेनर हाताळण्यासाठी सामान्यीकृत स्क्रोल फंक्शन
function scrollContainer(containerId, scrollOffset) {
    const container = document.getElementById(containerId);
    if (container) {
        container.scrollBy({
            left: scrollOffset,
            behavior: 'smooth'
        });
    }
}

// २. पेज लोड झाल्यावर चालणारा महत्त्वाचा कोड (UI अपडेट आणि डार्क मोड)
document.addEventListener('DOMContentLoaded', () => {
    
    // --- डार्क मोड लॉजिक (Dark Mode Logic) ---
    const darkModeBtn = document.getElementById('dark-mode-toggle');
    if(darkModeBtn) {
        // आधी सेव्ह केलेली थीम चेक करा
        if(localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
            darkModeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        }

        darkModeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            if(document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                darkModeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
            } else {
                localStorage.setItem('theme', 'light');
                darkModeBtn.innerHTML = '<i class="fa-regular fa-moon"></i>';
            }
        });
    }

    // --- लॉगिन/लॉगआउट UI अपडेट लॉजिक ---
    // Header मधील '.btn-login' क्लास असलेले बटण शोधणे
    const loginBtn = document.querySelector('.btn-login'); 
    let userLoggedIn = localStorage.getItem('isLoggedIn');

    if (userLoggedIn === 'true' && loginBtn) {
        // जर युजर लॉगिन असेल, तर 'Login / Signup' बटणाला 'Logout' बटण बनवा
        loginBtn.innerHTML = '<i class="fa-solid fa-right-from-bracket"></i> Logout';
        loginBtn.href = '#'; // जुनी लिंक काढून टाका
        loginBtn.style.backgroundColor = '#dc3545'; // लॉगआउटसाठी लाल रंग द्या (ऐच्छिक)
        
        // लॉगआउट बटणावर क्लिक केल्यावर काय व्हायला पाहिजे?
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            logoutUser();
        });
    }
});

// ३. लॉगआउट फंक्शन (Logout Function)
function logoutUser() {
    // LocalStorage मधील लॉगिनची माहिती (isLoggedIn) पुसून टाका
    localStorage.removeItem('isLoggedIn');
    
    // युजरला परत लॉगिन पेजवर पाठवा
    window.location.replace('html/login.html'); 
}