export function loadFromStorage<T>(key: string, fallback: T | null = null): T | null {
    const stored = localStorage.getItem(key);
    if (stored === null) return fallback;

    try {
        return JSON.parse(stored) as T;
    } catch {
        return fallback;
    }
}

export function saveToStorage<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
}

export function removeFromStorage(key: string): void {
    localStorage.removeItem(key);
}
