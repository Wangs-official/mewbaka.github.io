document.addEventListener('DOMContentLoaded', function() {
    const sentences = [
        "欢迎来到 MewBaka 笨猫！",
        "Welcome to MewBaka official website!",
        "笨蛋也可以改变世界！(●• ̀ω•́ )✧"
    ];

    const typingElement = document.getElementById('typing-title');
    let sentenceIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentSentence = sentences[sentenceIndex];

        if (isDeleting) {
            // 删除字符
            typingElement.textContent = currentSentence.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            // 输入字符
            typingElement.textContent = currentSentence.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = charIndex === currentSentence.length ? 1000 : 150;
        }

        // 判断当前动作状态
        if (!isDeleting && charIndex === currentSentence.length) {
            // 完成输入后暂停一下
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // 完成删除后切换到下一句
            isDeleting = false;
            sentenceIndex = (sentenceIndex + 1) % sentences.length;
            typingSpeed = 500;
        }

        // 添加光标
        typingElement.innerHTML = typingElement.textContent + '<span class="cursor"></span>';

        setTimeout(type, typingSpeed);
    }

    // 平滑滚动
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

    // 导航栏滚动效果
    const nav = document.getElementById('mainNav');
    const navLogo = document.getElementById('navLogo');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
            // 切换到深色logo
            navLogo.src = "assets/images/logo/dark.png";
        } else {
            nav.classList.remove('scrolled');
            // 切换到浅色logo
            navLogo.src = "assets/images/logo/light.png";
        }
    });

    // 移动端菜单切换
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

    // 开始打字效果
    setTimeout(type, 1000);

    // 确保页面加载时导航栏透明
    if (window.scrollY <= 100) {
        nav.classList.remove('scrolled');
    }
});

// 复制到剪贴板功能
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // 创建并显示复制成功提示
        const notification = document.createElement('div');
        notification.textContent = '已复制到剪贴板: ' + text;
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.left = '50%';
        notification.style.transform = 'translateX(-50%)';
        notification.style.backgroundColor = '#333';
        notification.style.color = '#fff';
        notification.style.padding = '10px 20px';
        notification.style.borderRadius = '5px';
        notification.style.zIndex = '10000';
        notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        notification.style.fontSize = '14px';
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s';

        document.body.appendChild(notification);

        // 显示通知
        setTimeout(() => {
            notification.style.opacity = '1';
        }, 10);

        // 2秒后移除通知
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 2000);
    }).catch(err => {
        console.error('复制失败:', err);
        alert('复制失败，请手动复制');
    });
}