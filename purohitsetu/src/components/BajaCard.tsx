import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../constants/theme';
import { BajaBand } from '../types';

interface Props {
  band: BajaBand;
  onBook: () => void;
}

export default function BajaCard({ band, onBook }: Props) {
  return (
    <View style={S.card}>
      <View style={[S.iconBox, { backgroundColor: band.iconBg }]}>
        <Text style={{ fontSize: 24 }}>{band.icon}</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={S.name}>{band.name}</Text>
        <Text style={S.type}>{band.type} · {band.members} members</Text>
        <View style={S.ratingRow}>
          <Text style={S.star}>★</Text>
          <Text style={S.ratingNum}>{band.rating}</Text>
          <Text style={S.dot}>·</Text>
          <Text style={S.price}>{band.price} <Text style={S.unit}>/ {band.priceUnit}</Text></Text>
        </View>
      </View>

      <TouchableOpacity style={[S.bookBtn, !band.available && S.bookBtnOff]} onPress={onBook} disabled={!band.available}>
        <Text style={S.bookTxt}>{band.available ? 'Book' : 'Busy'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const S = StyleSheet.create({
  card: {
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
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: radius.icon,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  name: { fontSize: 14, fontWeight: '700', color: colors.text, marginBottom: 2 },
  type: { fontSize: 11, color: colors.subtext, marginBottom: 4 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  star: { fontSize: 12, color: colors.warning },
  ratingNum: { fontSize: 12, fontWeight: '700', color: colors.warning },
  dot: { fontSize: 12, color: colors.muted },
  price: { fontSize: 12, fontWeight: '700', color: colors.brand },
  unit: { fontSize: 11, fontWeight: '400', color: colors.subtext },
  bookBtn: {
    backgroundColor: colors.brand,
    borderRadius: radius.btn,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    alignSelf: 'center',
  },
  bookBtnOff: { backgroundColor: colors.muted },
  bookTxt: { color: '#fff', fontSize: 12, fontWeight: '700' },
});
