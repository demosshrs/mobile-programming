import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors, spacing, radius } from '../constants/theme';
import { mockPurohits } from '../data/mockData';
import PurohitCard from '../components/PurohitCard';
import { TabParamList, RootStackParamList } from '../navigation/Navigator';

type Props = {
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<TabParamList, 'Purohit'>,
    StackNavigationProp<RootStackParamList>
  >;
};

const FILTERS = ['All', 'Available', 'Top Rated', 'Nearest'];

export default function PurohitListScreen({ navigation }: Props) {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = mockPurohits.filter(p => {
    const q = query.toLowerCase();
    const matchesQuery =
      p.name.toLowerCase().includes(q) ||
      p.qualification.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.speciality.toLowerCase().includes(q);
    const matchesFilter =
      activeFilter === 'All' ||
      (activeFilter === 'Available' && p.available) ||
      (activeFilter === 'Top Rated' && p.rating >= 4.5) ||
      activeFilter === 'Nearest';
    return matchesQuery && matchesFilter;
  });

  return (
    <View style={S.container}>
      {/* Header */}
      <View style={S.header}>
        <Text style={S.title}>Available Purohita</Text>
        <Text style={S.subtitle}>Choose a Purohita for your ceremony</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search */}
        <View style={S.searchRow}>
          <Text style={{ fontSize: 16, marginRight: spacing.sm }}>🔍</Text>
          <TextInput
            style={S.searchInput}
            placeholder="Search by name, qualification, location..."
            placeholderTextColor={colors.muted}
            value={query}
            onChangeText={setQuery}
            autoCapitalize="none"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Text style={{ fontSize: 16, color: colors.muted }}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Filter chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={S.filterRow}
        >
          {FILTERS.map(f => (
            <TouchableOpacity
              key={f}
              style={[S.chip, f === activeFilter && S.chipOn]}
              onPress={() => setActiveFilter(f)}
            >
              <Text style={[S.chipTxt, f === activeFilter && S.chipTxtOn]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Count */}
        <Text style={S.count}>{filtered.length} purohita found</Text>

        {/* List */}
        <View style={S.list}>
          {filtered.length === 0 ? (
            <View style={S.empty}>
              <Text style={{ fontSize: 36 }}>🙏</Text>
              <Text style={S.emptyTitle}>No Purohita Found</Text>
              <Text style={S.emptySub}>Try adjusting your search or filters.</Text>
            </View>
          ) : (
            filtered.map(p => (
              <PurohitCard
                key={p.id}
                purohit={p}
                onPress={() => navigation.navigate('PurohitDetail', { purohitId: p.id })}
              />
            ))
          )}
        </View>
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
  },
  title: { fontSize: 22, fontWeight: '800', color: '#fff', marginBottom: 2 },
  subtitle: { fontSize: 13, color: 'rgba(255,255,255,0.8)' },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radius.btn,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    margin: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: { flex: 1, fontSize: 14, color: colors.text },
  filterRow: { paddingHorizontal: spacing.lg, gap: spacing.sm, paddingBottom: spacing.sm },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: radius.tag,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  chipOn: { backgroundColor: colors.brand, borderColor: colors.brand },
  chipTxt: { fontSize: 12, color: colors.subtext, fontWeight: '500' },
  chipTxtOn: { color: '#fff', fontWeight: '700' },
  count: {
    fontSize: 12,
    color: colors.muted,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  list: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },
  empty: { alignItems: 'center', paddingVertical: 48, gap: spacing.sm },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: colors.text },
  emptySub: { fontSize: 13, color: colors.subtext },
});
