class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem('theme') || 'light';
    this.applyTheme();
  }

  toggle() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.theme);
    this.applyTheme();
    return this.theme;
  }

  applyTheme() {
    document.documentElement.setAttribute('data-theme', this.theme);
  }

  getTheme() {
    return this.theme;
  }

  isDark() {
    return this.theme === 'dark';
  }
}

const themeManager = new ThemeManager();
export default themeManager;
