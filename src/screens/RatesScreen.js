// src/screens/RatesScreen.js

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TextInput,
} from "react-native";
import { getLatestRates } from "../api/frankfurter";
import { colors, spacing, radius, fonts } from "../theme/theme";

// Kurslista — visar vad varje valuta kostar i kronor 
export default function RatesScreen() {
  const [rates, setRates] = useState([]);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  // Hämtar senaste kurser från API:et och uppdaterar state 
  async function fetchRates() {
    setLoading(true);
    setError(null);
    try {
      const data = await getLatestRates("SEK");
      setRates(data.rates);
      setDate(data.date);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <Text style={styles.retry} onPress={fetchRates}>
          Försök igen
        </Text>
      </View>
    );
  }

const filteredRates = rates.filter(
    (item) => item.code.toLowerCase().includes(search.toLowerCase())
);

  return (
    <View style={styles.container}>
        <TextInput
        style={styles.searchInput}
        placeholder="Sök valuta..."
        placeholderTextColor={colors.textSecondary}
        value={search}
        onChangeText={setSearch}
        />
      <FlatList
        data={filteredRates}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.code}>{item.code}</Text>
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
    paddingTop: spacing.md,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
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
  errorText: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  retry: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.accent,
  },
  searchInput: {
  backgroundColor: colors.surface,
  marginHorizontal: spacing.md,
  marginBottom: spacing.sm,
  padding: spacing.md,
  borderRadius: radius.button,
  fontFamily: fonts.medium,
  fontSize: 16,
  color: colors.text,
},
});