import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkMode: boolean = false;

  constructor() {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      this.darkMode = JSON.parse(savedDarkMode);
    } else {
      // this.darkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.darkMode = false; // Default do light mode
    }
    console.log('Constructor - Dark Mode:', this.darkMode);
    this.loadTheme(this.darkMode);
  }

  getVariableColors(darkMode: boolean = true) {}

  getTheme(darkMode: boolean) {
    const variableColors = this.getVariableColors(darkMode);

    return {
      variableColors,
    };
  }

  loadTheme(darkMode: boolean = true): void {
    this.darkMode = darkMode;
    let theme = this.getTheme(darkMode);
    const root = document.documentElement;
  }

  isDarkMode(): boolean {
    return this.darkMode;
  }

  toggleDarkMode(): void {
    this.loadTheme(!this.darkMode);
  }
}
