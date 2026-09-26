// src/api/frankfurter.js

const BASE_URL = "https://api.frankfurter.dev/v2";

/**
 * @returns {Promise<{code: string, name: string}[]>} Alla valutor sorterade efter kod
 */
export async function getCurrencies() {
  const response = await fetch(`${BASE_URL}/currencies`, {
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    throw new Error("Kunde inte hämta valutor");
  }

  const data = await response.json();
  return data
    .map((currency) => ({
      code: currency.iso_code.toUpperCase(),
      name: currency.name,
    }))
    .sort((a, b) => a.code.localeCompare(b.code));
}

/**
 * @param {string} base - t.ex. "SEK"
 * @returns {Promise<{base: string, date: string, rates: {code: string, rate: number}[]}>}
 */
export async function getLatestRates(base) {
  const response = await fetch(`${BASE_URL}/rates?base=${base.toLowerCase()}`, {
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    throw new Error("Kunde inte hämta kurser");
  }

  const data = await response.json();
  return {
    base: base.toUpperCase(),
    date: data[0]?.date ?? "",
    rates: data
      .map((entry) => ({
        code: entry.quote.toUpperCase(),
        rate: entry.rate,
      }))
      .sort((a, b) => a.code.localeCompare(b.code)),
  };
}

/**
 * @param {string} from - t.ex. "SEK"
 * @param {string} to - t.ex. "EUR"
 * @returns {Promise<{from: string, to: string, date: string, rate: number}>}
 */
export async function getRate(from, to) {
  const response = await fetch(
    `${BASE_URL}/rate/${from.toLowerCase()}/${to.toLowerCase()}`,
    { signal: AbortSignal.timeout(10000) }
  );

  if (!response.ok) {
    throw new Error(`Kunde inte hämta kurs för ${from}/${to}`);
  }

  const data = await response.json();
  return {
    from: from.toUpperCase(),
    to: to.toUpperCase(),
    date: data.date,
    rate: data.rate,
  };
}