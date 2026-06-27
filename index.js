// एकापेक्षा जास्त कंटेनर हाताळण्यासाठी सामान्यीकृत स्क्रोल फंक्शन
function scrollContainer(containerId, scrollOffset) {
    const container = document.getElementById(containerId);
    if (container) {
        container.scrollBy({
            left: scrollOffset,
            behavior: 'smooth'
        });
    }
}