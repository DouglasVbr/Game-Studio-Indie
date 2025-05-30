// Menu Mobile
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');
    
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });
    
    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Ajuste para o header fixo
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form Validation
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação simples
            const name = this.querySelector('input[type="text"]').value.trim();
            const email = this.querySelector('input[type="email"]').value.trim();
            const message = this.querySelector('textarea').value.trim();
            
            if (!name || !email || !message) {
                alert('Por favor, preencha todos os campos.');
                return;
            }
            
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Por favor, insira um e-mail válido.');
                return;
            }
            
            // Simulação de envio
            alert(`Obrigado, ${name}! Sua mensagem foi enviada com sucesso.`);
            this.reset();
        });
    }
    
    // Game Card Animation
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 15px 30px rgba(0, 245, 255, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });
    
    // Efeito de digitação no título
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typingEffect = setInterval(() => {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
            } else {
                clearInterval(typingEffect);
            }
        }, 100);
    }
    
    // Popup de sugestão
    const openBtn = document.getElementById('open-popup');
    const closeBtn = document.getElementById('close-popup');
    const popup = document.getElementById('suggestion-popup');
    const typingBubble = document.getElementById('typing-bubble');
    const suggestionForm = document.getElementById('suggestion-form');
    const suggestionText = document.getElementById('suggestion-text');
    const suggestionList = document.getElementById('suggestion-list');
    const communitySuggestion = document.getElementById('community-suggestion');
    const communitySuggestion1 = document.getElementById('community-suggestion-1');
    const communitySuggestion2 = document.getElementById('community-suggestion-2');
    const testimonials = document.getElementById('testimonials');
    const clearBtn = document.getElementById('clear-suggestions');
    
    if (openBtn && closeBtn && popup) {
        openBtn.onclick = () => {
            popup.classList.add('active');
            typingBubble.style.display = 'inline-block';
            suggestionText.value = '';
            suggestionText.focus();
        };
        closeBtn.onclick = () => popup.classList.remove('active');
        popup.onclick = (e) => {
            if (e.target === popup) popup.classList.remove('active');
        };
        suggestionText.oninput = () => {
            typingBubble.textContent = suggestionText.value ? 'Digitando...' : 'Digitando...';
            typingBubble.style.display = suggestionText.value ? 'inline-block' : 'inline-block';
        };
        suggestionForm.onsubmit = (e) => {
            e.preventDefault();
            const suggestion = suggestionText.value.trim();
            if (suggestion) {
                // Cria um card anônimo
                const card = document.createElement('div');
                card.className = 'testimonial-card';
                card.innerHTML = `
                    <img src="https://randomuser.me/api/portraits/lego/1.jpg" alt="Anônimo">
                    <p>"${suggestion}"</p>
                    <span>- Anônimo</span>
                `;
                // Adiciona o novo card antes do botão
                testimonials.insertBefore(card, openBtn);

                // (Opcional) Adiciona à lista de sugestões do popup
                const div = document.createElement('div');
                div.className = 'suggestion-item';
                div.textContent = suggestion;
                suggestionList.prepend(div);

                suggestionText.value = '';
                typingBubble.textContent = 'Digitando...';
                popup.classList.remove('active');
            }
        };
    }
    
    function limparSugestoes() {
        // Remove todos os cards anônimos
        document.querySelectorAll('.testimonial-card').forEach(card => {
            const span = card.querySelector('span');
            if (span && span.textContent.trim() === '- Anônimo') {
                card.remove();
            }
        });
        // Limpa a lista de sugestões do popup
        suggestionList.innerHTML = '';
    }

    if (clearBtn) {
        clearBtn.onclick = limparSugestoes;
    }
});