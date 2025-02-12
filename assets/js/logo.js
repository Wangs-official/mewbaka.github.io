function updateLogo() {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const logo = document.getElementById('logo');
    logo.src = isDarkMode ? 'assets/img/logo-light.png' : 'assets/img/logo-dark.png';
}

// 初始加载时检测
updateLogo();

// 监听系统色彩模式变化
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateLogo);