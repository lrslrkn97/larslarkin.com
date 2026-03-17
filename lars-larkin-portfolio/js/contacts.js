document.addEventListener('DOMContentLoaded', function() {
    const phoneElement = document.getElementById('phoneNumber');
    const originalPhone = '+39 52845172';
    const numbers = '0123456789';
    
    // Estrai solo i numeri (senza +39 e spazio)
    const phoneDigits = originalPhone.replace(/[^\d]/g, '').split('');
    const prefix = '+39 ';
    
    // Crea array di intervalli casuali per ogni cifra
    const intervals = [];
    
    function getRandomNumber() {
        return numbers[Math.floor(Math.random() * numbers.length)];
    }
    
    function getRandomInterval() {
        return Math.floor(Math.random() * 250) + 70;
    }
    
    // Inizializza l'animazione per ogni cifra
    phoneDigits.forEach((digit, index) => {
        const interval = setInterval(() => {
            phoneDigits[index] = getRandomNumber();
            updatePhone();
        }, getRandomInterval());
        
        intervals.push(interval);
        
        // Cambia velocità casualmente ogni tanto
        setInterval(() => {
            clearInterval(intervals[index]);
            intervals[index] = setInterval(() => {
                phoneDigits[index] = getRandomNumber();
                updatePhone();
            }, getRandomInterval());
        }, Math.random() * 3000 + 2000);
    });
    
    function updatePhone() {
        const formatted = prefix + phoneDigits.join('');
        phoneElement.textContent = formatted;
    }
    
    updatePhone();
    
    // Animazione typing per la bio
    const bioText = "Milan-based freelance photographer working across fashion and portrait photography. Collaborating closely with talents and creative teams, leading art direction to craft bold and visually cohesive narratives.";
    const bioElement = document.querySelector('.bio-text sup');

    if (bioElement) {
        bioElement.textContent = '';
        bioElement.classList.add('typing');
        let charIndex = 0;
        const errorStart = bioText.indexOf("creative teams");
        let inErrorMode = false;
        let errorStep = 0;
        let errorCharIndex = 0;
        
        function typeCharacter() {
            if (charIndex === errorStart && !inErrorMode) {
                inErrorMode = true;
                errorStep = 0;
                errorCharIndex = 0;
            }
            
            if (inErrorMode) {
                const baseText = bioText.substring(0, errorStart);
                const typoText = "creatuve teas";
                const correctText = "creative teams";
                
                if (errorStep === 0) {
                    if (errorCharIndex < typoText.length) {
                        bioElement.textContent = baseText + typoText.substring(0, errorCharIndex + 1);
                        errorCharIndex++;
                        setTimeout(typeCharacter, Math.floor(Math.random() * 50) + 30);
                        return;
                    } else {
                        errorStep = 1;
                        setTimeout(typeCharacter, 500);
                        return;
                    }
                } else if (errorStep === 1) {
                    if (errorCharIndex > 0) {
                        errorCharIndex--;
                        bioElement.textContent = baseText + typoText.substring(0, errorCharIndex);
                        setTimeout(typeCharacter, 50);
                        return;
                    } else {
                        errorStep = 2;
                        errorCharIndex = 0;
                        setTimeout(typeCharacter, 100);
                        return;
                    }
                } else if (errorStep === 2) {
                    if (errorCharIndex < correctText.length) {
                        bioElement.textContent = baseText + correctText.substring(0, errorCharIndex + 1);
                        errorCharIndex++;
                        setTimeout(typeCharacter, Math.floor(Math.random() * 50) + 30);
                        return;
                    } else {
                        inErrorMode = false;
                        charIndex = errorStart + correctText.length;
                        setTimeout(typeCharacter, Math.floor(Math.random() * 50) + 30);
                        return;
                    }
                }
            }
            
            if (charIndex < bioText.length && !inErrorMode) {
                bioElement.textContent = bioText.substring(0, charIndex + 1);
                charIndex++;
                
                let delay = Math.floor(Math.random() * 50) + 30;
                if (bioText[charIndex - 1] === '.' && charIndex < 100) {
                    delay = 400;
                }
                
                setTimeout(typeCharacter, delay);
            }
        }
        
        setTimeout(typeCharacter, 500);
    }
    
// Effetto reveal sulla foto al passaggio del mouse
    const imageContainer = document.querySelector('.profile-image-container');
    const originalImage = document.querySelector('.profile-image');
    
    if (imageContainer && originalImage) {
        // Crea immagine reveal
        const revealImage = document.createElement('img');
        revealImage.src = originalImage.src;
        revealImage.className = 'profile-image-reveal';
        imageContainer.appendChild(revealImage);
        
        imageContainer.addEventListener('mousemove', function(e) {
            const rect = imageContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const gradient = `radial-gradient(circle 80px at ${x}px ${y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 10%, rgba(0,0,0,0) 100%)`;
            revealImage.style.webkitMaskImage = gradient;
            revealImage.style.maskImage = gradient;
            revealImage.style.opacity = '1';
        });
        
        imageContainer.addEventListener('mouseleave', function() {
            revealImage.style.opacity = '0';
        });
    }
});