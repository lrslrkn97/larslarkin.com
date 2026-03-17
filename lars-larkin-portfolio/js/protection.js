// Disabilita click destro
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
});

// Disabilita tasti di scelta rapida
document.addEventListener('keydown', function(e) {
    // Disabilita F12, Ctrl+Shift+I, Ctrl+Shift+C, Ctrl+U
    if (e.keyCode == 123 || // F12
        (e.ctrlKey && e.shiftKey && e.keyCode == 73) || // Ctrl+Shift+I
        (e.ctrlKey && e.shiftKey && e.keyCode == 67) || // Ctrl+Shift+C
        (e.ctrlKey && e.keyCode == 85)) { // Ctrl+U
        e.preventDefault();
        return false;
    }
});

// Disabilita drag delle immagini
document.addEventListener('dragstart', function(e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
        return false;
    }
});