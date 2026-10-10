// src/screens/RatesScreen.js

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  RefreshControl,
} from "react-native";
import ErrorView from "../components/ErrorView";
import LoadingView from "../components/LoadingView";
import { getLatestRates, getCurrencies } from "../api/frankfurter";
import { colors, spacing, radius, fonts } from "../theme/theme";
import { Ionicons } from "@expo/vector-icons";

// Mappar valutakod till landskod
const currencyToCountry = {
  AED: "AE", AFN: "AF", ALL: "AL", AMD: "AM", ANG: "AN",
  AOA: "AO", ARS: "AR", AUD: "AU", AWG: "AW", AZN: "AZ",
  BAM: "BA", BBD: "BB", BDT: "BD", BGN: "BG", BHD: "BH",
  BIF: "BI", BMD: "BM", BND: "BN", BOB: "BO", BRL: "BR",
  BSD: "BS", BTN: "BT", BWP: "BW", BYN: "BY", BZD: "BZ",
  CAD: "CA", CDF: "CD", CHF: "CH", CLP: "CL", CNY: "CN",
  COP: "CO", CRC: "CR", CUP: "CU", CVE: "CV", CZK: "CZ",
  DJF: "DJ", DKK: "DK", DOP: "DO", DZD: "DZ", EGP: "EG",
  ERN: "ER", ETB: "ET", EUR: "EU", FJD: "FJ", FKP: "FK",
  GBP: "GB", GEL: "GE", GHS: "GH", GIP: "GI", GMD: "GM",
  GNF: "GN", GTQ: "GT", GYD: "GY", HKD: "HK", HNL: "HN",
  HRK: "HR", HTG: "HT", HUF: "HU", IDR: "ID", ILS: "IL",
  INR: "IN", IQD: "IQ", IRR: "IR", ISK: "IS", JMD: "JM",
  JOD: "JO", JPY: "JP", KES: "KE", KGS: "KG", KHR: "KH",
  KMF: "KM", KRW: "KR", KWD: "KW", KYD: "KY", KZT: "KZ",
  LAK: "LA", LBP: "LB", LKR: "LK", LRD: "LR", LSL: "LS",
  LYD: "LY", MAD: "MA", MDL: "MD", MGA: "MG", MKD: "MK",
  MMK: "MM", MNT: "MN", MOP: "MO", MRU: "MR", MUR: "MU",
  MVR: "MV", MWK: "MW", MXN: "MX", MYR: "MY", MZN: "MZ",
  NAD: "NA", NGN: "NG", NIO: "NI", NOK: "NO", NPR: "NP",
  NZD: "NZ", OMR: "OM", PAB: "PA", PEN: "PE", PGK: "PG",
  PHP: "PH", PKR: "PK", PLN: "PL", PYG: "PY", QAR: "QA",
  RON: "RO", RSD: "RS", RUB: "RU", RWF: "RW", SAR: "SA",
  SBD: "SB", SCR: "SC", SDG: "SD", SEK: "SE", SGD: "SG",
  SHP: "SH", SLE: "SL", SOS: "SO", SRD: "SR", STN: "ST",
  SVC: "SV", SYP: "SY", SZL: "SZ", THB: "TH", TJS: "TJ",
  TMT: "TM", TND: "TN", TOP: "TO", TRY: "TR", TTD: "TT",
  TWD: "TW", TZS: "TZ", UAH: "UA", UGX: "UG", USD: "US",
  UYU: "UY", UZS: "UZ", VES: "VE", VND: "VN", VUV: "VU",
  WST: "WS", XAF: "CM", XCD: "AG", XOF: "SN", XPF: "PF",
  YER: "YE", ZAR: "ZA", ZMW: "ZM", ZWL: "ZW",
};

// Gör om landskod till flaggemoji med Unicode regional indicator symbols.
// Varje bokstav i landskoder, som "S", "E" - blir en regional indicator-symbol
// som tillsammans bildar flaggemojin för Sverige.
function getFlag(code) {
  const country = currencyToCountry[code];
  if (!country) return "";
  return String.fromCodePoint(
    ...[...country].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65)
  );
}

// Kurslista — visar vad varje valuta kostar i kronor 
export default function RatesScreen() {
  const [rates, setRates] = useState([]);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currencyNames, setCurrencyNames] = useState({});
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Hämtar senaste kurser från API:et och uppdaterar state 
  async function fetchRates() {
    setLoading(true);
    setError(null);
    try {
      const [ratesData, currencies] = await Promise.all([
        getLatestRates("SEK"),
        getCurrencies(),
      ]);
      setRates(ratesData.rates);
      setDate(ratesData.date);
      const names = {};
      currencies.forEach((c) => {
        names[c.code] = c.name;
      });
      setCurrencyNames(names);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  
  // Pull-to-refresh hämtar ny data utan att visa laddningsskärmen.
  // Samma logik som fetchRates men sätter refreshing istället för loading.
  async function onRefresh() {
    setRefreshing(true);
    try {
        const [ratesData, currencies] = await Promise.all([
            getLatestRates("SEK"),
            getCurrencies(),
        ]);
        setRates(ratesData.rates);
        setDate(ratesData.date);
        const names = {};
        currencies.forEach((c) => {
            names[c.code] = c.name;
        });
        setCurrencyNames(names);
    } catch (err) {
        setError(err.message);
    } finally {
        setRefreshing(false);
    }
  }

  useEffect(() => {
    fetchRates();
  }, []);

  /**
   * Formaterar kursen som "X kr per 1 KOD" (JPY visas per 100)
   * @param {string} code - valutakod, t.ex. "EUR"
   * @param {number} rate - kurs från API:et (SEK → valuta)
   * @returns {string}
   */
  function formatRate(code, rate) {
    const inverted = 1 / rate;
    const formatted = new Intl.NumberFormat("sv-SE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(inverted);

    if (code === "JPY") {
      const per100 = 100 / rate;
      const formatted100 = new Intl.NumberFormat("sv-SE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(per100);
      return `${formatted100} kr per 100 ${code}`;
    }

    return `${formatted} kr per 1 ${code}`;
  }

  if (loading) {
    return (<LoadingView/>);
  }

  if (error) {
    return <ErrorView message={error} onRetry={fetchRates} />;
  }

// Filtrerar listan baserat på sökfältet, vilket matchar både valutakod och namn.
const filteredRates = rates.filter(
    (item) =>
      item.code.toLowerCase().includes(search.toLowerCase()) ||
      (currencyNames[item.code] || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
        <View style={styles.searchRow}>
            <Ionicons name="search" size={20} color={colors.textSecondary} />
            <TextInput
                style={styles.searchInput}
                placeholder="Sök efter valuta..."
                placeholderTextColor={colors.textSecondary}
                value={search}
                onChangeText={setSearch}
            />
        </View>
        <FlatList
            data={filteredRates}
            keyExtractor={(item) => item.code}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.accent} />
            }
            ListEmptyComponent={
                <View style={styles.empty}>
                    <Text style={styles.emptyText}>Ingen valuta hittades</Text>
                    </View>
            }
            renderItem={({ item }) => (
                <View style={styles.row}>
                    <View style={styles.left}>
                        <Text style={styles.flag}>{getFlag(item.code)}</Text>
                        <View>
                            <Text style={styles.code}>{item.code}</Text>
                            <Text style={styles.name}>{currencyNames[item.code] || ""}</Text>
                        </View>
                    </View>
                    <Text style={styles.rate}>{formatRate(item.code, item.rate)}</Text>
                </View>
            )}
        />
        <Text style={styles.updated}>Senast uppdaterad: {date}</Text>
    </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: spacing.searchRates,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.surface,
    marginHorizontal: spacing.md,
    marginVertical: spacing.xs,
    padding: spacing.md,
    borderRadius: radius.card,
  },
  code: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.text,
  },
  rate: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.textSecondary,
    fontVariant: ["tabular-nums"],
  },
  updated: {
    textAlign: "center",
    padding: spacing.md,
    fontFamily: fonts.medium,
    color: colors.textSecondary,
    fontSize: 12,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.button,
    gap: spacing.sm,
},
searchInput: {
    flex: 1,
    paddingVertical: spacing.md,
    fontFamily: fonts.medium,
    fontSize: 16,
    color: colors.text,
},
left: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
},
flag: {
    fontSize: 28,
},
name: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: colors.textSecondary,
},
empty: {
    alignItems: "center",
    paddingTop: spacing.xl,
},
emptyText: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: colors.textSecondary,
},
});