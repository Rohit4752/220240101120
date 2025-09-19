// Utility: generate short code + URL validation

const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function generateCode(len = 6) {
  let s = '';
  for (let i = 0; i < len; i++) {
    s += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return s;
}

export function isValidUrl(url) {
  try {
    // URL constructor will throw if invalid
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}
