// src/utils/convert.js

/**
 * Denna fil skapar hjälpfunktioner för valutaomvandling och formatering.
 * 
 * convert() - Räknar ut beloppet i målvalutan.
 * formatAmount() - Lägger till tusentalsavskiljare (sv-SE) för NumPad-visning.
 */

/** @returns {number} amount * rate, avrundat till 2 decimaler */
export function convert(amount, rate) {
    return Math.round(amount * rate * 100) / 100;
}

/**
 * Formaterar ett belopp med tusentalsavskiljare (sv-SE)
 * @param {number|string} amount - exempelvis 1000000
 * @returns {string} exempelvis. "100 000"
 */
export function formatAmount(amount) {
    const str = String(amount);
    const [integer, decimal] = str.replace(",", ".").split(".");
    const num = parseInt(integer, 10);
    if (isNaN(num)) return "0";
    const formatted = new Intl.NumberFormat("sv-SE").format(num);
    if (str.includes(",") || str.includes(".")) {
        return `${formatted},${decimal ?? ""}`;
    }
    return formatted;
}