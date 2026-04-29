import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../constants/theme';
import { Purohit } from '../types';

interface Props {
  purohit: Purohit;
  onPress: () => void;
}

function Stars({ n }: { n: number }) {
  return (
    <View style={{ flexDirection: 'row', gap: 2 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <Text key={i} style={{ color: i <= Math.round(n) ? colors.warning : '#ddd', fontSize: 11 }}>
          ★
        </Text>
      ))}
    </View>
  );
}

export default function PurohitCard({ purohit, onPress }: Props) {
  const initials = purohit.name
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 2);

  return (
    <TouchableOpacity style={S.card} onPress={onPress} activeOpacity={0.85}>
      <View style={S.avatar}>
        <Text style={S.initials}>{initials}</Text>
      </View>

      <View style={{ flex: 1 }}>
        <View style={S.nameRow}>
          <Text style={S.name}>{purohit.name}</Text>
          <View style={[S.badge, purohit.available ? S.open : S.closed]}>
            <Text style={[S.badgeTxt, { color: purohit.available ? colors.success : colors.danger }]}>
              {purohit.available ? '✓ Available' : '✕ Busy'}
            </Text>
          </View>
        </View>

        <Text style={S.qual}>
          {purohit.qualification} · {purohit.experience}
        </Text>

        <View style={S.ratingRow}>
          <Stars n={purohit.rating} />
          <Text style={S.ratingNum}>{purohit.rating.toFixed(1)}</Text>
          <Text style={S.reviews}>({purohit.reviews} reviews)</Text>
        </View>

        <View style={S.footer}>
          <Text style={S.speciality}>📍 {purohit.location}</Text>
          <Text style={S.price}>{purohit.priceFrom}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const S = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.card,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: radius.avatar,
    backgroundColor: colors.brandLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.brandMid,
    flexShrink: 0,
  },
  initials: { fontSize: 16, fontWeight: '700', color: colors.brand },
  nameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 },
  name: { fontSize: 14, fontWeight: '700', color: colors.text, flex: 1 },
  badge: { paddingHorizontal: 7, paddingVertical: 3, borderRadius: radius.tag },
  open: { backgroundColor: colors.successBg },
  closed: { backgroundColor: colors.dangerBg },
  badgeTxt: { fontSize: 10, fontWeight: '600' },
  qual: { fontSize: 11, color: colors.subtext, marginBottom: 4 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 6 },
  ratingNum: { fontSize: 12, fontWeight: '700', color: colors.warning },
  reviews: { fontSize: 11, color: colors.muted },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  speciality: { fontSize: 11, color: colors.subtext },
  price: { fontSize: 13, fontWeight: '700', color: colors.brand },
});
