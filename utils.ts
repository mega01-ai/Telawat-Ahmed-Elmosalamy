
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

/**
 * Formats an ISO date string into a Hijri and Gregorian date string.
 * e.g., "٢-ربيع الأول-١٤٤٥هـ ١٧-٩-٢٠٢٣م"
 * @param isoDate The date string.
 * @returns The formatted string.
 */
export const formatFullDate = (isoDate: string): string => {
  try {
    const date = new Date(isoDate);
    if (isNaN(date.getTime())) return '';

    // Hijri Date - using umalqura calendar for accuracy in Saudi Arabia
    // and 'arab' numbering system for Eastern Arabic numerals.
    const hijriFormatter = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      numberingSystem: 'arab',
    });
    const hijriParts = hijriFormatter.formatToParts(date);
    const hijriDay = hijriParts.find(p => p.type === 'day')?.value;
    const hijriMonth = hijriParts.find(p => p.type === 'month')?.value;
    const hijriYear = hijriParts.find(p => p.type === 'year')?.value;
    
    if (!hijriDay || !hijriMonth || !hijriYear) {
        throw new Error('Could not parse Hijri date parts');
    }
    const hijriDate = `${hijriDay}-${hijriMonth}-${hijriYear}هـ`;

    // Gregorian Date
    const gregorianFormatter = new Intl.DateTimeFormat('ar-SA', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      calendar: 'gregory', // Explicitly set Gregorian calendar
      numberingSystem: 'arab', // Ensure Eastern Arabic numerals
    });
    // Replace slashes or Arabic commas with dashes for a consistent format.
    const gregorianDate = `${gregorianFormatter.format(date).replace(/[\/٬]/g, '-')}م`;
    
    return `${hijriDate} ${gregorianDate}`;
  } catch (error) {
    console.error(`Error formatting date "${isoDate}":`, error);
    return ''; // Return empty string on error to not break the UI
  }
};
