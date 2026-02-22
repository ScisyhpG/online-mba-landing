import { faqs } from '../data/faqs.js';
import { subjects } from '../data/curriculum.js';
import { whyKoiData } from '../data/why-koi.js';

document.addEventListener('DOMContentLoaded', () => {
    const aboutImages = [
    "/assets/images/campus-1.jpg",
    "/assets/images/campus-2.avif",
    "/assets/images/campus-3.avif",
    "/assets/images/campus-4.avif"
    ];

    let currentSlide = 0;
    let slideInterval;

    function initCarousel() {
        const track = document.getElementById('about-carousel');
        const dotsContainer = document.getElementById('carousel-dots');
        if (!track || !dotsContainer) return;
        track.innerHTML = ''; dotsContainer.innerHTML = '';
        aboutImages.forEach((img, index) => {
            const slide = document.createElement('img');
            slide.src = img; slide.className = `carousel-slide ${index === 0 ? 'active' : ''}`; slide.alt = "KOI Campus Life"; slide.style.borderRadius = "0";
            track.appendChild(slide);
            const dot = document.createElement('button');
            dot.className = `w-12 h-1 rounded-none transition-all duration-300 ${index === 0 ? 'bg-brand-orange' : 'bg-white/40 hover:bg-white/80'}`;
            dot.onclick = () => window.goToSlide(index);
            dotsContainer.appendChild(dot);
        });
        startSlideTimer();
    }

    function updateCarousel() {
        document.querySelectorAll('.carousel-slide').forEach((slide, index) => slide.classList.toggle('active', index === currentSlide));
        document.querySelectorAll('#carousel-dots button').forEach((dot, index) => dot.className = index === currentSlide ? 'w-12 h-1 rounded-none transition-all duration-300 bg-brand-orange' : 'w-12 h-1 rounded-none transition-all duration-300 bg-white/40 hover:bg-white/80');
    }

    window.nextSlide = () => { currentSlide = (currentSlide + 1) % aboutImages.length; updateCarousel(); resetSlideTimer(); };
    window.prevSlide = () => { currentSlide = (currentSlide - 1 + aboutImages.length) % aboutImages.length; updateCarousel(); resetSlideTimer(); };
    window.goToSlide = (index) => { currentSlide = index; updateCarousel(); resetSlideTimer(); };
    function startSlideTimer() { slideInterval = setInterval(window.nextSlide, 5000); }
    function resetSlideTimer() { clearInterval(slideInterval); startSlideTimer(); }

    window.openVideo = function(videoUrl) {
        const modal = document.getElementById('video-modal'); const iframe = document.getElementById('video-frame');
        if(modal && iframe) { iframe.src = videoUrl; modal.classList.remove('hidden'); setTimeout(() => modal.classList.replace('opacity-0', 'opacity-100'), 10); }
    };
    window.closeVideo = function() {
        const modal = document.getElementById('video-modal'); const iframe = document.getElementById('video-frame');
        if(modal && iframe) { modal.classList.replace('opacity-100', 'opacity-0'); setTimeout(() => { modal.classList.add('hidden'); iframe.src = ''; }, 500); }
    };

    let currentMode = 'core'; let isCurriculumExpanded = false; const INITIAL_ITEMS = 5;

    function renderCurriculum() {
        const container = document.getElementById('curriculum-content'); const actionsContainer = document.getElementById('curriculum-actions');
        if(!container) return; container.innerHTML = '';
        const header = document.getElementById('curriculum-heading'); const desc = document.getElementById('curriculum-desc');
        if(header && desc) {
            if(currentMode === 'core') {
                header.textContent = "Career-Focused Core Units"; desc.textContent = "Build the capabilities employers expect at the next stage of your career. From strategic decision-making and financial data analysis to technology leadership, human-centred design and global workforce leadership, the KOI MBA core units are designed for practical application.";
            } else {
                header.textContent = "Why Choose KOI?"; desc.textContent = "Discover what makes KOI MBA the right choice for ambitious professionals. We combine academic rigor with practical application to deliver a qualification that truly transforms careers.";
            }
        }
        const dataToRender = currentMode === 'core' ? subjects : whyKoiData;
        const visibleData = isCurriculumExpanded ? dataToRender : dataToRender.slice(0, INITIAL_ITEMS);

        visibleData.forEach((item) => {
            const el = document.createElement('div');
            el.className = 'accordion-item group border-b border-gray-200 transition-all duration-300 hover:bg-gray-50';
            el.setAttribute('aria-expanded', 'false'); el.setAttribute('role', 'button'); el.tabIndex = 0;
            el.onclick = (e) => { if (e.target.closest('.accordion-body')) return; window.toggleAccordion(el); };
            el.onkeydown = (e) => { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.toggleAccordion(el); } };

            const focusItems = item.focus.map(f => `<li class="flex items-start gap-3 text-sm md:text-base text-gray-700 font-sans group/list"><span class="text-brand-orange font-bold mt-0.5">&gt;</span><span class="leading-relaxed">${f}</span></li>`).join('');
            const codeDisplay = item.code ? `<div class="hidden md:flex items-center shrink-0 w-48"><span class="text-[10px] font-bold text-gray-400 group-hover:text-brand-orange transition-colors tracking-widest uppercase">UNIT CODE - ${item.code}</span></div>` : `<div class="hidden md:block w-48"></div>`;

            el.innerHTML = `
                <div class="accordion-header w-full py-3 px-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div class="flex items-start md:items-center gap-6 md:gap-4 w-full">
                        ${codeDisplay}
                        <div class="flex-grow">
                            <h3 class="text-lg md:text-xl font-serif font-bold text-brand-900 group-hover:text-brand-orange transition-colors duration-300 leading-tight">${item.title}</h3>
                            <p class="text-sm text-gray-500 font-light mt-2 md:hidden line-clamp-2 group-[.active]:hidden">${item.teaser}</p>
                        </div>
                    </div>
                    <div class="w-10 h-10 border border-gray-200 flex items-center justify-center text-gray-400 group-hover:border-brand-orange group-hover:text-brand-orange transition-all duration-300 transform group-[.active]:rotate-180 group-[.active]:bg-brand-orange group-[.active]:text-white group-[.active]:border-brand-orange shrink-0 ml-4"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></div>
                </div>
                <div class="accordion-body"><div class="px-0 md:px-8 bg-gray-50/50 border-t border-gray-100/50"><div class="pb-10 pt-2 pl-0 md:pl-[12.5rem]"> 
                    <p class="text-gray-600 leading-relaxed mb-10 text-lg font-light max-w-none">${item.teaser}</p>
                    <div class="grid md:grid-cols-2 gap-10"><div><h4 class="text-xs font-bold text-brand-900 uppercase tracking-widest mb-6 flex items-center gap-3"><span class="w-8 h-[1px] bg-brand-orange"></span> Key Learning Areas</h4><ul class="space-y-4">${focusItems}</ul></div><div class="bg-white p-6 border border-brand-orange shadow-sm relative overflow-hidden group/card hover:shadow-md transition-shadow"><h4 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Learning Outcome</h4><p class="text-gray-700 font-sans text-base leading-relaxed relative z-10">${item.outcome}</p></div></div>
                </div></div></div>
            `;
            container.appendChild(el);
        });

        if (actionsContainer) {
            if (dataToRender.length > INITIAL_ITEMS) {
                actionsContainer.innerHTML = `<button onclick="window.toggleCurriculumView()" class="w-full group flex flex-col items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-brand-900 transition-colors py-6 focus:outline-none font-sans hover:bg-gray-50"><span>${isCurriculumExpanded ? 'Show Less' : `View All ${dataToRender.length} Units`}</span><div class="w-8 h-8 bg-white border border-gray-200 shadow-sm flex items-center justify-center group-hover:border-brand-900 group-hover:bg-brand-900 group-hover:text-white transition-all duration-300"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-300 ${isCurriculumExpanded ? 'rotate-180' : ''}"><path d="m6 9 6 6 6-6"/></svg></div></button>`;
                actionsContainer.classList.remove('hidden');
            } else {
                actionsContainer.classList.add('hidden');
            }
        }
    }

    window.toggleCurriculumView = () => { isCurriculumExpanded = !isCurriculumExpanded; renderCurriculum(); };
    window.toggleAccordion = item => {
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.accordion-item').forEach(i => { i.classList.remove('active', 'shadow-lg', 'border-brand-sky/30'); i.setAttribute('aria-expanded', 'false'); });
        if (!isActive) { item.classList.add('active', 'shadow-lg', 'border-brand-sky/30'); item.setAttribute('aria-expanded', 'true'); }
    };
    window.switchProgram = type => {
        currentMode = type; isCurriculumExpanded = false;
        const coreBtn = document.getElementById('switch-core'), whyBtn = document.getElementById('switch-why');
        if(coreBtn && whyBtn) {
            if(type === 'core') { coreBtn.classList.add('active'); coreBtn.classList.remove('text-gray-500'); whyBtn.classList.remove('active'); whyBtn.classList.add('text-gray-500'); } 
            else { whyBtn.classList.add('active'); whyBtn.classList.remove('text-gray-500'); coreBtn.classList.remove('active'); coreBtn.classList.add('text-gray-500'); }
        }
        renderCurriculum();
    };

    window.toggleFaq = el => {
        const item = el.closest('.faq-item'), wasActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        if(!wasActive) item.classList.add('active');
    };

    const faqTarget = document.getElementById('faq-list');
    if (faqTarget) {
        faqs.forEach((faq, index) => {
            const div = document.createElement('div');
            div.className = "faq-item reveal-on-scroll border-b border-gray-200 group"; div.style.transitionDelay = `${index * 50}ms`;
            div.innerHTML = `<button class="w-full flex items-start justify-between py-6 text-left focus:outline-none group bg-transparent relative z-10" onclick="window.toggleFaq(this)"><span class="font-sans font-bold text-lg text-brand-900 group-hover:text-brand-orange transition-colors pr-8 leading-snug">${faq.q}</span><div class="faq-icon relative flex items-center justify-center w-6 h-6 text-brand-orange transition-transform duration-300 transform shrink-0 mt-1"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></div></button><div class="faq-answer overflow-hidden bg-transparent relative z-0"><div class="pb-8 pt-0 text-gray-600 font-light leading-relaxed font-sans text-base">${faq.a}</div></div>`;
            faqTarget.appendChild(div);
        });
    }

    window.switchEntryTab = (tabId) => {
        document.querySelectorAll('.entry-tab').forEach(tab => { tab.classList.remove('active', 'border-brand-orange', 'bg-brand-skyLight/20', 'text-brand-900'); tab.classList.add('border-transparent', 'hover:border-brand-orange/30', 'hover:bg-gray-50', 'text-gray-500', 'hover:text-brand-900'); });
        const activeTab = document.getElementById('tab-' + tabId);
        if(activeTab) { activeTab.classList.add('active', 'border-brand-orange', 'bg-brand-skyLight/20', 'text-brand-900'); activeTab.classList.remove('border-transparent', 'hover:border-brand-orange/30', 'hover:bg-gray-50', 'text-gray-500', 'hover:text-brand-900'); }
        document.querySelectorAll('.entry-content').forEach(content => { content.classList.add('hidden', 'opacity-0', 'translate-x-4'); content.classList.remove('opacity-100', 'translate-x-0'); });
        const activeContent = document.getElementById('content-' + tabId);
        if(activeContent) { activeContent.classList.remove('hidden'); setTimeout(() => { activeContent.classList.remove('opacity-0', 'translate-x-4'); activeContent.classList.add('opacity-100', 'translate-x-0'); }, 10); }
    };

    const nav = document.getElementById('navbar');
    if(nav) {
        window.onscroll = () => {
            const isScrolled = window.scrollY > 50;
            nav.classList.toggle('shadow-lg', isScrolled); nav.classList.toggle('shadow-sm', !isScrolled);
            nav.classList.toggle('py-4', isScrolled); nav.classList.toggle('py-6', !isScrolled);
            const sections = ['about', 'curriculum', 'accreditation', 'outcomes', 'entry-criteria', 'faq'];
            const scrollPos = window.scrollY + 200;
            sections.forEach(id => {
                const el = document.getElementById(id);
                if (el && scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) {
                    document.querySelectorAll('.section-nav-link').forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
                }
            });
        };
    }

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if(mobileMenuBtn) { mobileMenuBtn.onclick = () => { const menu = document.getElementById('mobile-menu'); if(menu) menu.classList.toggle('hidden'); }; }

    const leadModal = document.getElementById('lead-form-modal');
    window.openLeadForm = () => { if(leadModal) { leadModal.classList.remove('hidden'); setTimeout(() => { leadModal.classList.replace('opacity-0', 'opacity-100'); }, 10); } };
    window.resetLeadForm = () => {
        const form = document.querySelector('#lead-form-modal form');
        if(form) { form.reset(); form.classList.remove('hidden'); }
        const successMsg = document.getElementById('form-success'); if(successMsg) successMsg.classList.add('hidden');
        window.captchaVerified = false;
        const checkbox = document.getElementById('captcha-checkbox'); if(checkbox) { checkbox.innerHTML = ''; checkbox.className = 'w-6 h-6 border-2 border-gray-300 rounded-none bg-white flex items-center justify-center transition-all duration-200'; }
        const container = document.getElementById('captcha-container'); if(container) { container.classList.remove('border-red-500', 'bg-red-50'); container.classList.add('bg-gray-50', 'border-gray-200'); }
        const error = document.getElementById('captcha-error'); if(error) error.classList.add('hidden');
        
        // Reset the submit button back to normal
        const btn = document.getElementById('submit-btn');
        const btnText = document.getElementById('btn-text');
        const spinner = document.getElementById('btn-spinner');
        if(btn) btn.disabled = false;
        if(btnText) btnText.innerText = "Download Guide";
        if(spinner) spinner.classList.add('hidden');
    };
    window.closeLeadForm = () => { if(leadModal) { leadModal.classList.replace('opacity-100', 'opacity-0'); setTimeout(() => { leadModal.classList.add('hidden'); window.resetLeadForm(); }, 300); } };
    
    // --- UPDATED LEAD SUBMIT LOGIC ---
    window.captchaVerified = false;
    window.handleLeadSubmit = function(e) {
        e.preventDefault();
        
        // 1. Verify Captcha
        if (!window.captchaVerified) {
            const container = document.getElementById('captcha-container'); const errorMsg = document.getElementById('captcha-error');
            if(container) { container.classList.remove('border-gray-200', 'bg-gray-50'); container.classList.add('border-red-500', 'bg-red-50'); }
            if(errorMsg) errorMsg.classList.remove('hidden');
            return;
        }

        const btn = document.getElementById('submit-btn');
        const btnText = document.getElementById('btn-text');
        const spinner = document.getElementById('btn-spinner');

        // 2. Show Loading State
        if (btn) btn.disabled = true;
        if (btnText) btnText.innerText = "Verifying Details...";
        if (spinner) spinner.classList.remove('hidden');

        // 3. Simulate Verification Delay
        setTimeout(() => {
            const form = document.getElementById('lead-form');
            if(form) form.classList.add('hidden');
            const success = document.getElementById('form-success');
            if(success) success.classList.remove('hidden');
            console.log("Lead captured and verified.");
        }, 1500);
    };

    window.toggleCaptcha = function() {
        if(window.captchaVerified) return;
        const container = document.getElementById('captcha-container'); const errorMsg = document.getElementById('captcha-error');
        if(container) { container.classList.remove('border-red-500', 'bg-red-50'); container.classList.add('border-gray-200', 'bg-gray-50'); }
        if(errorMsg) errorMsg.classList.add('hidden');
        const checkbox = document.getElementById('captcha-checkbox');
        if(checkbox) {
            checkbox.innerHTML = `<div class="w-4 h-4 border-2 border-brand-900 border-t-transparent rounded-none animate-spin"></div>`;
            setTimeout(() => {
                window.captchaVerified = true;
                checkbox.classList.remove('bg-white', 'border-gray-300'); checkbox.classList.add('bg-green-500', 'border-green-500');
                checkbox.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" class="text-white"><polyline points="20 6 9 17 4 12"/></svg>`;
            }, 800);
        }
    }

    const chatWindow = document.getElementById('chat-window'), chatToggle = document.getElementById('chat-toggle'), chatMessages = document.getElementById('chat-messages'), chatInput = document.getElementById('chat-input');
    window.toggleChat = () => { if(chatWindow && chatToggle) { chatWindow.classList.toggle('open'); chatToggle.classList.toggle('hidden'); } };
    window.sendChatMessage = () => {
        const text = chatInput.value.trim(); if(!text) return;
        const userDiv = document.createElement('div'); userDiv.className = "flex justify-end";
        userDiv.innerHTML = `<div class="bg-brand-orange text-white p-3 rounded-none text-sm shadow-sm font-sans">${text}</div>`;
        if(chatMessages) {
            chatMessages.appendChild(userDiv); chatInput.value = ''; chatMessages.scrollTop = chatMessages.scrollHeight;
            setTimeout(() => {
                const botDiv = document.createElement('div'); botDiv.className = "flex justify-start";
                botDiv.innerHTML = `<div class="bg-white border border-gray-100 p-3 rounded-none text-sm text-gray-700 shadow-sm font-sans">I'll check on that for you. For faster enrollment help, please call +61 2 9283 3583.</div>`;
                chatMessages.appendChild(botDiv); chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 800);
        }
    };

    window.cookieManager = {
        init: function() { const consent = localStorage.getItem('koi_cookie_consent'); const trigger = document.getElementById('cookie-trigger'); if (!consent) { this.showBanner(); } else { this.applySettings(JSON.parse(consent)); if(trigger) trigger.classList.remove('hidden'); } },
        showBanner: function() { const banner = document.getElementById('cookie-banner'); if(banner) { banner.classList.remove('hidden'); setTimeout(() => banner.classList.remove('translate-y-full'), 100); } },
        hideBanner: function() { const banner = document.getElementById('cookie-banner'); const trigger = document.getElementById('cookie-trigger'); if(banner) { banner.classList.add('translate-y-full'); setTimeout(() => { banner.classList.add('hidden'); if(trigger) trigger.classList.remove('hidden'); }, 500); } },
        openPreferences: function() { const modal = document.getElementById('cookie-modal'); if(modal) { const consent = JSON.parse(localStorage.getItem('koi_cookie_consent') || '{"analytics": false, "marketing": false}'); const analyticsCheck = document.getElementById('cookie-analytics'); const marketingCheck = document.getElementById('cookie-marketing'); if(analyticsCheck) analyticsCheck.checked = consent.analytics; if(marketingCheck) marketingCheck.checked = consent.marketing; modal.classList.remove('hidden'); setTimeout(() => { modal.classList.remove('opacity-0'); modal.querySelector('div').classList.remove('scale-95'); }, 10); } },
        closePreferences: function() { const modal = document.getElementById('cookie-modal'); if(modal) { modal.classList.add('opacity-0'); modal.querySelector('div').classList.add('scale-95'); setTimeout(() => modal.classList.add('hidden'), 300); } },
        acceptAll: function() { this.save({ necessary: true, analytics: true, marketing: true }); },
        rejectAll: function() { this.save({ necessary: true, analytics: false, marketing: false }); },
        savePreferences: function() { const analyticsCheck = document.getElementById('cookie-analytics'); const marketingCheck = document.getElementById('cookie-marketing'); this.save({ necessary: true, analytics: analyticsCheck ? analyticsCheck.checked : false, marketing: marketingCheck ? marketingCheck.checked : false }); this.closePreferences(); },
        save: function(settings) { localStorage.setItem('koi_cookie_consent', JSON.stringify(settings)); this.applySettings(settings); this.hideBanner(); },
        applySettings: function(settings) { console.log('Applied Cookie Settings:', settings); }
    };

    const revealObserver = new IntersectionObserver((entries) => { entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('revealed'); }); }, { threshold: 0.1 });
    document.querySelectorAll('.reveal-on-scroll').forEach(el => revealObserver.observe(el));

    initCarousel(); renderCurriculum(); window.cookieManager.init();
});