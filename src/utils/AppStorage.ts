import { StorageKey } from "enumeration/storageKey";
import { ThemeMode } from "enumeration/themeMode";

export class AppStorage {
  static getThemeMode(): ThemeMode | null {
    const value: string | null = localStorage.getItem(StorageKey.THEME_MODE);
    const isValidTheme: boolean = Object.values(ThemeMode).includes(value as ThemeMode);
    if (!isValidTheme) {
        return null;
    }
    return value as ThemeMode;
  }

  static setThemeMode(mode: ThemeMode): void {
    localStorage.setItem(StorageKey.THEME_MODE, mode);
  }

  static removeThemeMode(): void {
    localStorage.removeItem(StorageKey.THEME_MODE);
  }
}
