import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  Alert, ActivityIndicator, Linking,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { ref, push } from 'firebase/database';
import { auth, db } from '../firebase/config';
import { mockPurohits } from '../data/mockData';
import { colors, spacing, radius } from '../constants/theme';
import { RootStackParamList } from '../navigation/Navigator';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'PurohitDetail'>;
  route: RouteProp<RootStackParamList, 'PurohitDetail'>;
};

const DATES = ['Today', 'Tomorrow', 'Wed', 'Thu', 'Fri'];
const TIMES = ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '4:00 PM', '6:00 PM'];

const REVIEWS = [
  { name: 'Sita B.', text: 'Very knowledgeable and performed the ceremony beautifully.', stars: 5, date: 'Dec 10' },
  { name: 'Anil T.', text: 'Punctual and thorough. Our Bratabandha was perfect.', stars: 5, date: 'Nov 25' },
  { name: 'Priya M.', text: 'Explained every step clearly. Highly recommended.', stars: 4, date: 'Nov 15' },
];

function Chip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={[S.chip, active && S.chipOn]}>
      <Text style={[S.chipTxt, active && S.chipTxtOn]}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function PurohitDetailScreen({ navigation, route }: Props) {
  const p = mockPurohits.find(x => x.id === route.params.purohitId) ?? mockPurohits[0];

  const [ceremonyIdx, setCeremonyIdx] = useState(0);
  const [dateIdx, setDateIdx] = useState(0);
  const [timeIdx, setTimeIdx] = useState(0);
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const ceremony = p.ceremonies[ceremonyIdx];
  const platformFee = 100;
  const total = ceremony.priceNum + platformFee;

  async function handleBook() {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      Alert.alert('Not Logged In', 'Please sign in to book a Purohita.');
      return;
    }
    setLoading(true);
    try {
      await push(ref(db, 'bookings'), {
        userId,
        purohitId: p.id,
        purohitName: p.name,
        ceremony: ceremony.name,
        date: DATES[dateIdx],
        time: TIMES[timeIdx],
        total,
        status: 'upcoming',
        createdAt: Date.now(),
      });
      setConfirmed(true);
    } catch {
      Alert.alert('Error', 'Could not confirm booking. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (confirmed) {
    return (
      <View style={S.success}>
        <View style={S.successIcon}>
          <Text style={{ fontSize: 36 }}>🙏</Text>
        </View>
        <Text style={S.successTitle}>Booking Confirmed!</Text>
        <Text style={S.successSub}>Your Purohita will arrive at</Text>
        <Text style={S.successTime}>{TIMES[timeIdx]}, {DATES[dateIdx]}</Text>
        <View style={[S.card, { width: '100%', marginBottom: spacing.xl }]}>
          {[['Purohita', p.name], ['Ceremony', ceremony.name], ['Date & Time', `${DATES[dateIdx]} · ${TIMES[timeIdx]}`]].map(
            ([l, v], i) => (
              <View key={i}>
                <Text style={S.confLabel}>{l}</Text>
                <Text style={S.confVal}>{v}</Text>
                <View style={S.divider} />
              </View>
            )
          )}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: colors.subtext, fontSize: 14 }}>Total (cash)</Text>
            <Text style={{ fontWeight: '700', color: colors.brand, fontSize: 16 }}>Rs. {total}</Text>
          </View>
        </View>
        <TouchableOpacity style={S.btn} onPress={() => navigation.replace('Main')}>
          <Text style={S.btnTxt}>Back to Home →</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={S.container}>
      {/* Cover */}
      <View style={S.cover}>
        <TouchableOpacity style={S.backBtn} onPress={() => navigation.goBack()}>
          <Text style={S.backIcon}>‹</Text>
        </TouchableOpacity>
        {p.available && (
          <View style={S.verifiedBadge}>
            <Text style={S.verifiedTxt}>✓ Available</Text>
          </View>
        )}
        <View style={S.avatarOnCover}>
          <Text style={{ fontSize: 24, fontWeight: '700', color: colors.brand }}>
            {p.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
          </Text>
        </View>
      </View>

      <ScrollView style={S.body} showsVerticalScrollIndicator={false}>
        {/* Name & meta */}
        <View style={S.nameRow}>
          <View style={{ flex: 1 }}>
            <Text style={S.name}>{p.name}</Text>
            <Text style={S.meta}>
              {p.qualification} · {p.experience} · 📍 {p.location}
            </Text>
          </View>
        </View>

        {/* Stats */}
        <View style={S.statsRow}>
          {[
            { v: `${p.rating}⭐`, l: 'Rating' },
            { v: `${p.reviews}`, l: 'Reviews' },
            { v: p.experience, l: 'Exp.' },
            { v: p.priceFrom, l: 'From' },
          ].map((st, i) => (
            <View key={i} style={S.statBox}>
              <Text style={S.statVal}>{st.v}</Text>
              <Text style={S.statLabel}>{st.l}</Text>
            </View>
          ))}
        </View>

        {/* Action row */}
        <View style={S.actionRow}>
          <TouchableOpacity
            style={S.callBtn}
            onPress={() => Linking.openURL(`tel:${p.phone}`)}
          >
            <Text style={{ fontWeight: '600', color: colors.brand }}>📞 Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={S.chatBtn}>
            <Text style={{ fontWeight: '600', color: colors.subtext }}>💬 WhatsApp</Text>
          </TouchableOpacity>
        </View>

        {/* About */}
        <Text style={S.secLabel}>ABOUT</Text>
        <View style={S.card}>
          <Text style={{ fontSize: 13, color: colors.subtext, lineHeight: 20 }}>{p.about}</Text>
        </View>

        {/* Select ceremony */}
        <Text style={S.secLabel}>SELECT CEREMONY</Text>
        {p.ceremonies.map((cer, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => setCeremonyIdx(i)}
            style={[S.radioRow, i === ceremonyIdx && S.radioRowOn]}
          >
            <View style={[S.radio, i === ceremonyIdx && S.radioOn]}>
              {i === ceremonyIdx && <View style={S.radioDot} />}
            </View>
            <Text style={[S.radioLabel, i === ceremonyIdx && S.radioLabelOn]}>
              🪔 {cer.name}
            </Text>
            <Text style={S.radioPrice}>{cer.priceStr}</Text>
          </TouchableOpacity>
        ))}

        {/* Select date */}
        <Text style={S.secLabel}>SELECT DATE</Text>
        <View style={S.chipRow}>
          {DATES.map((d, i) => (
            <Chip key={i} label={d} active={i === dateIdx} onPress={() => setDateIdx(i)} />
          ))}
        </View>

        {/* Select time */}
        <Text style={S.secLabel}>SELECT TIME</Text>
        <View style={S.chipRow}>
          {TIMES.map((t, i) => (
            <Chip key={i} label={t} active={i === timeIdx} onPress={() => setTimeIdx(i)} />
          ))}
        </View>

        {/* Bill summary */}
        <Text style={S.secLabel}>BILL SUMMARY</Text>
        <View style={[S.card, { marginBottom: 100 }]}>
          {[
            [ceremony.name, ceremony.priceNum],
            ['Travel & setup', 70],
            ['Platform fee', platformFee - 70],
          ].map(([l, v], i) => (
            <View
              key={i}
              style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.sm, borderBottomWidth: 0.5, borderBottomColor: colors.background }}
            >
              <Text style={{ fontSize: 13, color: colors.subtext }}>{l}</Text>
              <Text style={{ fontSize: 13, color: colors.text }}>Rs. {v}</Text>
            </View>
          ))}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: spacing.sm }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: colors.text }}>Total (pay cash)</Text>
            <Text style={{ fontSize: 16, fontWeight: '700', color: colors.brand }}>Rs. {total}</Text>
          </View>
        </View>

        {/* Reviews */}
        <Text style={S.secLabel}>REVIEWS</Text>
        {REVIEWS.map((r, i) => (
          <View key={i} style={[S.card, { marginBottom: spacing.sm }]}>
            <View style={S.reviewHeader}>
              <View style={S.reviewAvatar}>
                <Text style={S.reviewInitial}>{r.name[0]}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 13, fontWeight: '600', color: colors.text }}>{r.name}</Text>
                <Text style={{ fontSize: 11 }}>{'⭐'.repeat(r.stars)}</Text>
              </View>
              <Text style={{ fontSize: 11, color: colors.muted }}>{r.date}</Text>
            </View>
            <Text style={{ fontSize: 13, color: colors.subtext, fontStyle: 'italic' }}>"{r.text}"</Text>
          </View>
        ))}

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* CTA */}
      <View style={S.cta}>
        {loading ? (
          <ActivityIndicator color={colors.brand} />
        ) : (
          <TouchableOpacity style={S.btn} onPress={handleBook}>
            <Text style={S.btnTxt}>🙏 Book Purohita — Rs. {total}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  cover: { height: 110, backgroundColor: colors.brand },
  backBtn: {
    position: 'absolute',
    top: 48,
    left: spacing.lg,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: radius.tag,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: { color: '#fff', fontSize: 28, lineHeight: 34 },
  verifiedBadge: {
    position: 'absolute',
    top: 12,
    right: spacing.lg,
    backgroundColor: colors.successBg,
    borderRadius: radius.tag,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  verifiedTxt: { fontSize: 11, color: colors.success, fontWeight: '700' },
  avatarOnCover: {
    position: 'absolute',
    bottom: -28,
    left: spacing.lg,
    width: 56,
    height: 56,
    backgroundColor: colors.brandLight,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
    elevation: 3,
  },
  body: { flex: 1, paddingHorizontal: spacing.lg, paddingTop: 40 },
  nameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.sm },
  name: { fontSize: 20, fontWeight: '800', color: colors.text },
  meta: { fontSize: 12, color: colors.subtext, marginTop: 3, lineHeight: 18 },
  statsRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.md },
  statBox: {
    flex: 1,
    backgroundColor: colors.brandLight,
    borderRadius: radius.btn,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  statVal: { fontSize: 12, fontWeight: '700', color: colors.brand },
  statLabel: { fontSize: 10, color: colors.subtext, marginTop: 2 },
  actionRow: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.md },
  callBtn: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1.5,
    borderColor: colors.brand,
    borderRadius: radius.btn,
    alignItems: 'center',
  },
  chatBtn: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.btn,
    alignItems: 'center',
  },
  secLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.subtext,
    letterSpacing: 1,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.card,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.btn,
    backgroundColor: colors.card,
    marginBottom: spacing.sm,
  },
  radioRowOn: { borderWidth: 1.5, borderColor: colors.brand, backgroundColor: colors.brandLight },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOn: { borderColor: colors.brand },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.brand },
  radioLabel: { flex: 1, fontSize: 13, color: colors.text },
  radioLabelOn: { fontWeight: '600', color: colors.brandDark },
  radioPrice: { fontSize: 12, fontWeight: '700', color: colors.brand },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.sm },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.btn,
    backgroundColor: colors.card,
  },
  chipOn: { borderWidth: 1.5, borderColor: colors.brand, backgroundColor: colors.brandLight },
  chipTxt: { fontSize: 12, color: colors.subtext },
  chipTxtOn: { fontWeight: '700', color: colors.brandDark },
  reviewHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm },
  reviewAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.brandLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewInitial: { fontSize: 12, fontWeight: '700', color: colors.brand },
  divider: { height: 0.5, backgroundColor: colors.background, marginVertical: spacing.sm },
  cta: {
    padding: spacing.md,
    backgroundColor: colors.card,
    borderTopWidth: 0.5,
    borderTopColor: colors.border,
  },
  btn: { backgroundColor: colors.brand, borderRadius: radius.btn, paddingVertical: 14, alignItems: 'center' },
  btnTxt: { color: '#fff', fontWeight: '700', fontSize: 15 },
  success: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.brandLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
    borderWidth: 2,
    borderColor: colors.brandMid,
  },
  successTitle: { fontSize: 24, fontWeight: '800', color: colors.text, marginBottom: spacing.sm },
  successSub: { fontSize: 14, color: colors.subtext },
  successTime: { fontSize: 16, fontWeight: '700', color: colors.brand, marginTop: 4, marginBottom: spacing.xl },
  confLabel: { fontSize: 12, color: colors.muted, marginBottom: 2 },
  confVal: { fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: spacing.sm },
});
