/**
 * Converts a VAPID public key string to a Uint8Array.
 * This is necessary for the Push API subscription.
 * @param base64String The VAPID public key.
 * @returns The Uint8Array representation.
 */
export const urlBase64ToUint8Array = (base64String: string): Uint8Array => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

// Helper functions for time conversion

/**
 * Parses a duration string (e.g., "HH:MM:SS" or "MM:SS") into total seconds.
 * @param duration The duration string.
 * @returns The total number of seconds.
 */
export const parseDuration = (duration: string): number => {
  const parts = duration.split(':').map(Number);
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }
  return parts[0] || 0;
};

/**
 * Formats a total number of seconds into a "MM:SS" string.
 * @param seconds The total number of seconds.
 * @returns A formatted string.
 */
export const formatDuration = (seconds: number): string => {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};