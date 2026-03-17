document.addEventListener('DOMContentLoaded', function() {
    const centralImage = document.querySelector('.central-image');
    const textOverlay = document.querySelector('.text-overlay');
    const imageLinks = document.querySelectorAll('.text-links a');
    
    // Crea overlay fullscreen
    const fullscreenOverlay = document.createElement('div');
    fullscreenOverlay.className = 'fullscreen-overlay';
    const fullscreenGallery = document.createElement('div');
    fullscreenGallery.className = 'fullscreen-gallery';
    fullscreenOverlay.appendChild(fullscreenGallery);
    document.body.appendChild(fullscreenOverlay);
    
    // Animazione hover sull'immagine
    if (centralImage && textOverlay) {
        centralImage.addEventListener('mouseenter', () => {
            centralImage.style.opacity = '1';
            textOverlay.style.opacity = '0';
        });
        
        centralImage.addEventListener('mouseleave', () => {
            centralImage.style.opacity = '0.3';
            textOverlay.style.opacity = '1';
        });
        
        // Click per fullscreen
        centralImage.addEventListener('click', () => {
            // Trova il link attivo per ottenere data-count
            const currentSrc = centralImage.src;
            let imageCount = 1;
            let basePath = currentSrc;
            
            imageLinks.forEach(link => {
                const linkImage = link.getAttribute('data-image');
                if (currentSrc.includes(linkImage.replace('images/', ''))) {
                    imageCount = parseInt(link.getAttribute('data-count')) || 1;
                    basePath = linkImage;
                }
            });
            
            // Crea gallery con tutte le immagini
            fullscreenGallery.innerHTML = '';
            
            // Prima immagine (senza numero)
            const img1 = document.createElement('img');
            img1.src = basePath;
            fullscreenGallery.appendChild(img1);
            
            // Immagini successive (con numero)
            for (let i = 1; i < imageCount; i++) {
                const img = document.createElement('img');
                const pathWithoutExt = basePath.replace('.jpg', '').replace('.png', '');
                const ext = basePath.split('.').pop();
                img.src = `${pathWithoutExt}${i}.${ext}`;
                fullscreenGallery.appendChild(img);
            }
            
            fullscreenOverlay.classList.add('active');
        });
    }
    
    // Click per chiudere fullscreen
    fullscreenOverlay.addEventListener('click', () => {
        fullscreenOverlay.classList.remove('active');
    });
    
    // Cambio immagine al click sui link blu con fade
    imageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const newImageSrc = this.getAttribute('data-image');
            
            if (newImageSrc) {
                // Fade out
                centralImage.style.opacity = '0';
                
                // Precarica la nuova immagine
                const preloadImage = new Image();
                preloadImage.src = newImageSrc;
                
                preloadImage.onload = function() {
                    // Cambio immagine dopo il fade out
                    setTimeout(() => {
                        centralImage.src = newImageSrc;
                        // Fade in
                        centralImage.style.opacity = '0.3';
                    }, 400);
                };
            }
        });
    });
});
