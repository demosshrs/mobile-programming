import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors, spacing, radius } from '../constants/theme';
import { mockPurohits, mockBajaBands, HOME_SERVICES } from '../data/mockData';
import PurohitCard from '../components/PurohitCard';
import { TabParamList, RootStackParamList } from '../navigation/Navigator';
import { auth } from '../firebase/config';

type Props = {
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<TabParamList, 'Home'>,
    StackNavigationProp<RootStackParamList>
  >;
};

export default function HomeScreen({ navigation }: Props) {
  const user = auth.currentUser;
  const firstName = user?.displayName?.split(' ')[0] ?? 'Namaste';

  const featured = mockPurohits.filter(p => p.available).slice(0, 2);

  return (
    <View style={S.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={S.header}>
          <View style={{ flex: 1 }}>
            <Text style={S.location}>📍 Kathmandu, Nepal</Text>
            <Text style={S.greeting}>नमस्ते, {firstName} 🙏</Text>
            <Text style={S.sub}>Book Purohita, Baja & Mantras</Text>
          </View>
          <View style={S.avatar}>
            <Text style={S.avatarTxt}>{firstName[0].toUpperCase()}</Text>
          </View>
        </View>

        {/* Search bar */}
        <TouchableOpacity style={S.searchBar} onPress={() => navigation.navigate('Purohit')}>
          <Text style={{ fontSize: 16, marginRight: spacing.sm }}>🔍</Text>
          <Text style={S.searchTxt}>Search purohita, baja, mantras...</Text>
        </TouchableOpacity>

        {/* Quick services grid */}
        <Text style={S.sectionLabel}>QUICK ACCESS</Text>
        <View style={S.servicesGrid}>
          {HOME_SERVICES.map((sv, i) => (
            <TouchableOpacity
              key={i}
              style={S.serviceItem}
              onPress={() => {
                if (i === 0) navigation.navigate('Purohit');
                else if (i === 1) navigation.navigate('Baja');
                else if (i === 2) navigation.navigate('Mantra');
                else if (i === 5) navigation.navigate('Contact');
              }}
            >
              <View style={S.serviceIcon}>
                <Text style={{ fontSize: 22 }}>{sv.icon}</Text>
              </View>
              <Text style={S.serviceLabel}>{sv.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Featured Purohita */}
        <View style={S.sectionRow}>
          <Text style={S.sectionLabel}>FEATURED PUROHITA</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Purohit')}>
            <Text style={S.seeAll}>See all →</Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingHorizontal: spacing.lg }}>
          {featured.map(p => (
            <PurohitCard
              key={p.id}
              purohit={p}
              onPress={() => navigation.navigate('PurohitDetail', { purohitId: p.id })}
            />
          ))}
        </View>

        {/* Baja bands teaser */}
        <View style={S.sectionRow}>
          <Text style={S.sectionLabel}>BAJA BANDS</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Baja')}>
            <Text style={S.seeAll}>See all →</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: spacing.lg, gap: spacing.sm, paddingBottom: spacing.sm }}
        >
          {mockBajaBands.map(b => (
            <TouchableOpacity
              key={b.id}
              style={S.bajaChip}
              onPress={() => navigation.navigate('Baja')}
            >
              <Text style={{ fontSize: 20 }}>{b.icon}</Text>
              <Text style={S.bajaChipName}>{b.name}</Text>
              <Text style={S.bajaChipPrice}>{b.price}/{b.priceUnit.replace('per ', '')}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Mantra teaser */}
        <TouchableOpacity style={S.mantraBanner} onPress={() => navigation.navigate('Mantra')}>
          <View>
            <Text style={S.mantraBannerTitle}>📖 Mantra Library</Text>
            <Text style={S.mantraBannerSub}>Gayatri · Geeta Shloka · Mahabharat</Text>
          </View>
          <Text style={{ fontSize: 22 }}>→</Text>
        </TouchableOpacity>

        <View style={{ height: spacing.xxl }} />
      </ScrollView>
    </View>
  );
}

const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: colors.brand,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: spacing.lg,
    paddingTop: 52,
    paddingBottom: spacing.lg,
  },
  location: { fontSize: 11, color: 'rgba(255,255,255,0.7)', marginBottom: 2 },
  greeting: { fontSize: 20, fontWeight: '800', color: '#fff', marginBottom: 2 },
  sub: { fontSize: 12, color: 'rgba(255,255,255,0.75)' },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarTxt: { fontSize: 18, color: '#fff', fontWeight: '700' },
  searchBar: {
    backgroundColor: colors.card,
    borderRadius: radius.btn,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.lg,
    marginVertical: spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchTxt: { fontSize: 14, color: colors.muted },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.subtext,
    letterSpacing: 1,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  seeAll: { fontSize: 12, color: colors.brand, fontWeight: '600' },
  servicesGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: spacing.md },
  serviceItem: { width: '33.33%', alignItems: 'center', marginBottom: spacing.lg },
  serviceIcon: {
    width: 54,
    height: 54,
    backgroundColor: colors.brandLight,
    borderRadius: radius.icon,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  serviceLabel: { fontSize: 11, color: colors.text, textAlign: 'center', fontWeight: '500' },
  bajaChip: {
    backgroundColor: colors.card,
    borderRadius: radius.card,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    minWidth: 120,
    gap: 4,
  },
  bajaChipName: { fontSize: 13, fontWeight: '600', color: colors.text },
  bajaChipPrice: { fontSize: 11, color: colors.brand, fontWeight: '600' },
  mantraBanner: {
    backgroundColor: colors.brand,
    borderRadius: radius.card,
    padding: spacing.lg,
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mantraBannerTitle: { fontSize: 15, fontWeight: '700', color: '#fff', marginBottom: 4 },
  mantraBannerSub: { fontSize: 12, color: 'rgba(255,255,255,0.8)' },
});
