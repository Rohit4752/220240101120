// Lightweight localStorage wrapper for storing shortened URLs

const STORAGE_KEY = 'shortUrls_v1';

export function getStoredUrls() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (e) {
    return [];
  }
}

export function saveUrl(obj) {
  const arr = getStoredUrls();
  arr.unshift(obj); // newest first
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
}

export function deleteUrl(id) {
  const arr = getStoredUrls().filter(x => x.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
}

export function incrementClicks(id) {
  const arr = getStoredUrls();
  const idx = arr.findIndex(x => x.id === id);
  if (idx !== -1) {
    arr[idx].clicks = (arr[idx].clicks || 0) + 1;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    return arr[idx];
  }
  return null;
}

