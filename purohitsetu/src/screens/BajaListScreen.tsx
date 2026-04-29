import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  Alert, ActivityIndicator, Modal,
} from 'react-native';
import { ref, push } from 'firebase/database';
import { auth, db } from '../firebase/config';
import { mockBajaBands } from '../data/mockData';
import BajaCard from '../components/BajaCard';
import { colors, spacing, radius } from '../constants/theme';
import { BajaBand } from '../types';

const DATES = ['Today', 'Tomorrow', 'Wed', 'Thu', 'Fri', 'Sat'];
const DURATIONS = ['Half day (4 hrs)', 'Full day (8 hrs)', '2 days', 'Custom'];

function Chip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={[S.chip, active && S.chipOn]}>
      <Text style={[S.chipTxt, active && S.chipTxtOn]}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function BajaListScreen() {
  const [selected, setSelected] = useState<BajaBand | null>(null);
  const [dateIdx, setDateIdx] = useState(0);
  const [durIdx, setDurIdx] = useState(1);
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  async function handleBook() {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      Alert.alert('Not Logged In', 'Please sign in to book a Baja band.');
      return;
    }
    if (!selected) return;
    setLoading(true);
    try {
      await push(ref(db, 'baja_bookings'), {
        userId,
        bandId: selected.id,
        bandName: selected.name,
        date: DATES[dateIdx],
        duration: DURATIONS[durIdx],
        total: selected.priceNum,
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

  return (
    <View style={S.container}>
      {/* Header */}
      <View style={S.header}>
        <Text style={S.title}>Available Baja Bands</Text>
        <Text style={S.subtitle}>Choose a band for your celebration</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Info banner */}
        <View style={S.infoBanner}>
          <Text style={{ fontSize: 18 }}>🥁</Text>
          <Text style={S.infoTxt}>
            Traditional Nepali music for Bratabandha, weddings, and festivals.
          </Text>
        </View>

        {/* Cards */}
        <Text style={S.sectionLabel}>BROWSE BANDS</Text>
        <View style={S.list}>
          {mockBajaBands.map(b => (
            <BajaCard key={b.id} band={b} onBook={() => setSelected(b)} />
          ))}
        </View>

        {/* About section */}
        <Text style={S.sectionLabel}>WHAT IS PANCHE BAJA?</Text>
        <View style={S.infoCard}>
          <Text style={S.infoCardTxt}>
            Panche Baja is a traditional Nepali ensemble of five instruments: Dholak (drum),
            Damaha (kettle drum), Tyamko (small drum), Bheri (horn), and Karnal (trumpet).
            It is considered sacred and is an essential part of Hindu ceremonies in Nepal.
          </Text>
        </View>
        <View style={{ height: spacing.xxl }} />
      </ScrollView>

      {/* Booking modal */}
      <Modal visible={!!selected} animationType="slide" transparent>
        <View style={S.overlay}>
          <View style={S.sheet}>
            <View style={S.sheetHandle} />

            {confirmed ? (
              <View style={{ alignItems: 'center', paddingVertical: spacing.xl }}>
                <Text style={{ fontSize: 40 }}>🎉</Text>
                <Text style={S.confirmTitle}>Band Booked!</Text>
                <Text style={S.confirmSub}>{selected?.name} on {DATES[dateIdx]}</Text>
                <TouchableOpacity
                  style={[S.btn, { marginTop: spacing.xl }]}
                  onPress={() => { setConfirmed(false); setSelected(null); }}
                >
                  <Text style={S.btnTxt}>Done</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <Text style={S.sheetTitle}>Book {selected?.name}</Text>
                <Text style={S.sheetSub}>
                  {selected?.price} / {selected?.priceUnit}  ·  {selected?.members} members
                </Text>

                <Text style={S.secLabel}>SELECT DATE</Text>
                <View style={S.chipRow}>
                  {DATES.map((d, i) => (
                    <Chip key={i} label={d} active={i === dateIdx} onPress={() => setDateIdx(i)} />
                  ))}
                </View>

                <Text style={S.secLabel}>DURATION</Text>
                <View style={S.chipRow}>
                  {DURATIONS.map((d, i) => (
                    <Chip key={i} label={d} active={i === durIdx} onPress={() => setDurIdx(i)} />
                  ))}
                </View>

                <View style={S.summaryRow}>
                  <Text style={{ fontSize: 14, color: colors.subtext }}>Total estimate</Text>
                  <Text style={{ fontSize: 18, fontWeight: '800', color: colors.brand }}>
                    Rs. {selected?.priceNum}
                  </Text>
                </View>

                <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm }}>
                  <TouchableOpacity
                    style={S.cancelBtn}
                    onPress={() => setSelected(null)}
                  >
                    <Text style={{ color: colors.subtext, fontWeight: '600' }}>Cancel</Text>
                  </TouchableOpacity>
                  {loading ? (
                    <ActivityIndicator color={colors.brand} style={{ flex: 1 }} />
                  ) : (
                    <TouchableOpacity style={[S.btn, { flex: 1 }]} onPress={handleBook}>
                      <Text style={S.btnTxt}>🥁 Confirm Booking</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
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
  },
  title: { fontSize: 22, fontWeight: '800', color: '#fff', marginBottom: 2 },
  subtitle: { fontSize: 13, color: 'rgba(255,255,255,0.8)' },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.brandLight,
    margin: spacing.lg,
    padding: spacing.md,
    borderRadius: radius.btn,
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  infoTxt: { flex: 1, fontSize: 12, color: colors.brandDark, lineHeight: 18 },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.subtext,
    letterSpacing: 1,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    marginTop: spacing.sm,
  },
  list: { paddingHorizontal: spacing.lg },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: radius.card,
    padding: spacing.lg,
    marginHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoCardTxt: { fontSize: 13, color: colors.subtext, lineHeight: 20 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: colors.card,
    borderTopLeftRadius: radius.modal,
    borderTopRightRadius: radius.modal,
    padding: spacing.xl,
    paddingBottom: 40,
  },
  sheetHandle: {
    width: 36,
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: spacing.lg,
  },
  sheetTitle: { fontSize: 18, fontWeight: '800', color: colors.text, marginBottom: 4 },
  sheetSub: { fontSize: 12, color: colors.subtext, marginBottom: spacing.lg },
  secLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.subtext,
    letterSpacing: 1,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.sm },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.btn,
    backgroundColor: colors.background,
  },
  chipOn: { borderWidth: 1.5, borderColor: colors.brand, backgroundColor: colors.brandLight },
  chipTxt: { fontSize: 12, color: colors.subtext },
  chipTxtOn: { fontWeight: '700', color: colors.brandDark },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 0.5,
    borderTopColor: colors.border,
  },
  btn: { backgroundColor: colors.brand, borderRadius: radius.btn, paddingVertical: 13, alignItems: 'center' },
  btnTxt: { color: '#fff', fontWeight: '700', fontSize: 14 },
  cancelBtn: {
    flex: 0.4,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.btn,
    paddingVertical: 13,
    alignItems: 'center',
  },
  confirmTitle: { fontSize: 20, fontWeight: '800', color: colors.text, marginTop: spacing.md },
  confirmSub: { fontSize: 13, color: colors.subtext, marginTop: 4 },
});
