import { Platform } from 'react-native';

/**
 * Platform detection utilities for web/mobile compatibility
 */

// Check if running on web
export const isWeb = Platform.OS === 'web';

// Check if running on mobile (iOS or Android)
export const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';

// Check if running on iOS
export const isIOS = Platform.OS === 'ios';

// Check if running on Android
export const isAndroid = Platform.OS === 'android';

/**
 * Feature availability checks
 */

// Check if geolocation is available
export const hasGeolocation = () => {
    if (isWeb) {
        return 'geolocation' in navigator;
    }
    return true; // Always available on mobile
};

// Check if push notifications are available
export const hasPushNotifications = () => {
    if (isWeb) {
        return 'Notification' in window && 'serviceWorker' in navigator;
    }
    return true; // Always available on mobile (with expo-notifications)
};

// Check if camera/image picker is available
export const hasCamera = () => {
    if (isWeb) {
        return 'mediaDevices' in navigator;
    }
    return true; // Always available on mobile
};

// Check if file system access is available
export const hasFileSystem = () => {
    return !isWeb; // Only on mobile
};

/**
 * Get current position (web-compatible)
 */
export const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
        if (isWeb) {
            if (hasGeolocation()) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        resolve({
                            coords: {
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                                accuracy: position.coords.accuracy,
                                altitude: position.coords.altitude,
                                altitudeAccuracy: position.coords.altitudeAccuracy,
                                heading: position.coords.heading,
                                speed: position.coords.speed,
                            },
                            timestamp: position.timestamp,
                        });
                    },
                    (error) => reject(error),
                    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
                );
            } else {
                reject(new Error('Geolocation not available'));
            }
        } else {
            // On mobile, use expo-location
            reject(new Error('Use expo-location on mobile'));
        }
    });
};

/**
 * Storage helpers (AsyncStorage wrapper)
 */
export const storage = {
    getItem: async (key) => {
        if (isWeb) {
            return localStorage.getItem(key);
        }
        // On mobile, AsyncStorage is imported separately
        return null;
    },

    setItem: async (key, value) => {
        if (isWeb) {
            localStorage.setItem(key, value);
            return;
        }
        // On mobile, AsyncStorage is imported separately
    },

    removeItem: async (key) => {
        if (isWeb) {
            localStorage.removeItem(key);
            return;
        }
        // On mobile, AsyncStorage is imported separately
    },
};

/**
 * Get platform-specific text for UI
 */
export const getPlatformText = (webText, mobileText) => {
    return isWeb ? webText : mobileText;
};

/**
 * Check if app is installed as PWA
 */
export const isInstalledPWA = () => {
    if (!isWeb) return true; // Mobile apps are always "installed"

    // Check if app is running in standalone mode (installed as PWA)
    return window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone || // iOS Safari
        document.referrer.includes('android-app://'); // Android
};

/**
 * Prompt user to install PWA (web only)
 */
let deferredPrompt = null;

if (isWeb) {
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
    });
}

export const promptInstallPWA = async () => {
    if (!isWeb || !deferredPrompt) {
        return { success: false, error: 'Install prompt not available' };
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    deferredPrompt = null;

    return {
        success: outcome === 'accepted',
        outcome
    };
};

export const canInstallPWA = () => {
    return isWeb && deferredPrompt !== null;
};

/**
 * Share functionality (uses Web Share API on web, native share on mobile)
 */
export const canShare = () => {
    if (isWeb) {
        return navigator.share !== undefined;
    }
    return true; // Always available on mobile
};

export const shareContent = async (content) => {
    if (isWeb && navigator.share) {
        try {
            await navigator.share(content);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
    return { success: false, error: 'Share not available' };
};
