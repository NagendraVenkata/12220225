// src/utils/validation.js

// ✅ Validate if the URL is in proper format
export function validateURL(url) {
  const pattern = /^(http|https):\/\/[^ "]+$/;
  return pattern.test(url);
}

// ✅ Validate shortcode (3–10 alphanumeric characters)
export function validateShortcode(code) {
  return /^[a-zA-Z0-9]{3,10}$/.test(code);
}

// ✅ Validate that validity is a positive integer
export function validateMinutes(min) {
  return /^\d+$/.test(min) && Number(min) > 0;
}
