function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert(`已复制: ${text}`);
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

const nav = document.getElementById('mainNav');
const navLogo = document.getElementById('navLogo');

window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
        navLogo.src = "assets/images/logo/dark.png";
    } else {
        nav.classList.remove('scrolled');
        navLogo.src = "assets/images/logo/light.png";
    }
});

const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', function() {
    navLinks.classList.toggle('active');

    // 切换菜单按钮动画
    const bars = document.querySelectorAll('.mobile-menu-btn .bar');
    if (navLinks.classList.contains('active')) {
        bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        bars.forEach(bar => {
            bar.style.transform = '';
            bar.style.opacity = '';
        });
    }
});