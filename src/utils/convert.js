// src/utils/convert.js

/** @returns {number} amount * rate, avrundat till 2 decimaler */
export function convert(amount, rate) {
    return Math.round(amount * rate * 100) / 100;
}