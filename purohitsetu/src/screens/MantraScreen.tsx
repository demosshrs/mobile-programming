import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import { mantraCategories } from '../data/mockData';
import { colors, spacing, radius } from '../constants/theme';
import { Mantra, MantraCategory } from '../types';

export default function MantraScreen() {
  const [activeCategory, setActiveCategory] = useState<MantraCategory | null>(null);
  const [activeMantra, setActiveMantra] = useState<Mantra | null>(null);
  const [fontSize, setFontSize] = useState(16);

  if (activeMantra && activeCategory) {
    return (
      <View style={S.container}>
        {/* Header */}
        <View style={S.header}>
          <TouchableOpacity style={S.backBtn} onPress={() => setActiveMantra(null)}>
            <Text style={S.backTxt}>‹</Text>
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={S.headerTitle}>{activeMantra.title}</Text>
            <Text style={S.headerSub}>{activeCategory.label}</Text>
          </View>
          <View style={S.fontBtns}>
            <TouchableOpacity
              style={S.fontBtn}
              onPress={() => setFontSize(f => Math.max(12, f - 2))}
            >
              <Text style={S.fontBtnTxt}>A-</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={S.fontBtn}
              onPress={() => setFontSize(f => Math.min(28, f + 2))}
            >
              <Text style={S.fontBtnTxt}>A+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView contentContainerStyle={{ padding: spacing.xl }} showsVerticalScrollIndicator={false}>
          {/* Devanagari */}
          <View style={S.mantraCard}>
            <Text style={S.mantraLabel}>DEVANAGARI</Text>
            <Text style={[S.devanagari, { fontSize }]}>{activeMantra.devanagari}</Text>
          </View>

          {/* Transliteration */}
          <View style={S.mantraCard}>
            <Text style={S.mantraLabel}>TRANSLITERATION</Text>
            <Text style={[S.transliteration, { fontSize: fontSize - 2 }]}>
              {activeMantra.transliteration}
            </Text>
          </View>

          {/* Meaning */}
          <View style={S.mantraCard}>
            <Text style={S.mantraLabel}>MEANING</Text>
            <Text style={S.meaning}>{activeMantra.meaning}</Text>
          </View>

          <View style={{ height: spacing.xxl }} />
        </ScrollView>
      </View>
    );
  }

  if (activeCategory) {
    return (
      <View style={S.container}>
        <View style={S.header}>
          <TouchableOpacity style={S.backBtn} onPress={() => setActiveCategory(null)}>
            <Text style={S.backTxt}>‹</Text>
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={S.headerTitle}>{activeCategory.label}</Text>
            <Text style={S.headerSub}>{activeCategory.count} texts available</Text>
          </View>
          <Text style={{ fontSize: 24 }}>{activeCategory.icon}</Text>
        </View>

        <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
          {activeCategory.mantras.map(m => (
            <TouchableOpacity
              key={m.id}
              style={S.mantraListCard}
              onPress={() => setActiveMantra(m)}
              activeOpacity={0.85}
            >
              <View style={{ flex: 1 }}>
                <Text style={S.mantraListTitle}>{m.title}</Text>
                <Text style={S.mantraListPreview} numberOfLines={2}>
                  {m.devanagari.split('\n')[0]}
                </Text>
              </View>
              <Text style={{ color: colors.brand, fontSize: 20 }}>›</Text>
            </TouchableOpacity>
          ))}
          <View style={{ height: spacing.xxl }} />
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={S.container}>
      {/* Header */}
      <View style={S.header}>
        <View style={{ flex: 1 }}>
          <Text style={S.headerTitle}>Mantras & Shlokas</Text>
          <Text style={S.headerSub}>Sacred texts for daily prayer and ceremonies</Text>
        </View>
        <Text style={{ fontSize: 26 }}>🕉️</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Quote */}
        <View style={S.quoteCard}>
          <Text style={S.quoteDevanagari}>धर्मो रक्षति रक्षितः</Text>
          <Text style={S.quoteMeaning}>Dharma protects those who protect it.</Text>
        </View>

        {/* Categories */}
        <Text style={S.sectionLabel}>CATEGORIES</Text>
        <View style={{ paddingHorizontal: spacing.lg }}>
          {mantraCategories.map(cat => (
            <TouchableOpacity
              key={cat.id}
              style={S.categoryCard}
              onPress={() => setActiveCategory(cat)}
              activeOpacity={0.85}
            >
              <View style={S.categoryIcon}>
                <Text style={{ fontSize: 24 }}>{cat.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={S.categoryTitle}>{cat.label}</Text>
                <Text style={S.categorySub}>{cat.count} texts</Text>
              </View>
              <View style={S.categoryBadge}>
                <Text style={S.categoryBadgeTxt}>FREE</Text>
              </View>
              <Text style={{ color: colors.brand, fontSize: 20, marginLeft: spacing.sm }}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tips */}
        <Text style={S.sectionLabel}>HOW TO USE</Text>
        <View style={S.tipCard}>
          {[
            { icon: '🕉️', tip: 'Read the Devanagari text aloud for full benefit.' },
            { icon: '📖', tip: 'Use transliteration if you are learning Sanskrit.' },
            { icon: '💡', tip: 'Tap A+ / A− to adjust text size for easier reading.' },
          ].map((t, i) => (
            <View key={i} style={S.tipRow}>
              <Text style={{ fontSize: 18 }}>{t.icon}</Text>
              <Text style={S.tipTxt}>{t.tip}</Text>
            </View>
          ))}
        </View>
        <View style={{ height: spacing.xxl }} />
      </ScrollView>
    </View>
  );
}

const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: colors.brand,
    paddingTop: 52,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.md,
  },
  backBtn: {
    width: 36,
    height: 36,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: radius.tag,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  backTxt: { color: '#fff', fontSize: 28, lineHeight: 34 },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#fff' },
  headerSub: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  fontBtns: { flexDirection: 'row', gap: spacing.sm, marginBottom: 2 },
  fontBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: radius.btn,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  fontBtnTxt: { color: '#fff', fontWeight: '700', fontSize: 12 },
  quoteCard: {
    backgroundColor: colors.brandLight,
    borderRadius: radius.card,
    margin: spacing.lg,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  quoteDevanagari: { fontSize: 18, fontWeight: '700', color: colors.brandDark, marginBottom: 6 },
  quoteMeaning: { fontSize: 12, color: colors.subtext, fontStyle: 'italic' },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.subtext,
    letterSpacing: 1,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  categoryCard: {
    backgroundColor: colors.card,
    borderRadius: radius.card,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    backgroundColor: colors.brandLight,
    borderRadius: radius.icon,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryTitle: { fontSize: 15, fontWeight: '700', color: colors.text },
  categorySub: { fontSize: 11, color: colors.subtext, marginTop: 2 },
  categoryBadge: {
    backgroundColor: colors.successBg,
    borderRadius: radius.tag,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  categoryBadgeTxt: { fontSize: 9, fontWeight: '700', color: colors.success },
  tipCard: {
    backgroundColor: colors.card,
    borderRadius: radius.card,
    padding: spacing.lg,
    marginHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  tipRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md },
  tipTxt: { flex: 1, fontSize: 13, color: colors.subtext, lineHeight: 18 },
  mantraListCard: {
    backgroundColor: colors.card,
    borderRadius: radius.card,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  mantraListTitle: { fontSize: 14, fontWeight: '700', color: colors.text, marginBottom: 4 },
  mantraListPreview: { fontSize: 12, color: colors.subtext, lineHeight: 18 },
  mantraCard: {
    backgroundColor: colors.card,
    borderRadius: radius.card,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  mantraLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.brand,
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  devanagari: { color: colors.text, lineHeight: 36, fontWeight: '500' },
  transliteration: { color: colors.subtext, lineHeight: 28, fontStyle: 'italic' },
  meaning: { fontSize: 13, color: colors.subtext, lineHeight: 22 },
});
