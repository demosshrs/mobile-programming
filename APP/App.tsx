// DashboardScreen.tsx — BhojanSathi Home Screen
// React Native + TypeScript — single file, ready to drop in

import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  Image, FlatList, StyleSheet, Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

// ─── Types ───────────────────────────────────────────────
type Restaurant = {
  id: string; name: string; cuisine: string; rating: number;
  price: string; dist: string; open: boolean; img: string; tags: string[];
};

type Mood = {
  id: string; label: string; emoji: string; color: string;
};

type Cuisine = {
  label: string; emoji: string;
};

// ─── Colors ──────────────────────────────────────────────
const C = {
  primary: '#1D9E75', bg: '#FAFAF7', card: '#FFF', muted: '#F5F4F0',
  text: '#1A1A18', sub: '#6B6A65', hint: '#9E9D98', border: 'rgba(0,0,0,0.08)',
  amber: '#BA7517', red: '#E24B4A', primaryLight: '#E1F5EE',
};

// ─── Mock Data ───────────────────────────────────────────
const restaurants: Restaurant[] = [
  { id: '1', name: 'Bhojan Griha', cuisine: 'Newari · Traditional', rating: 4.7, price: '₨₨₨', dist: '0.8 km', open: true, img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500', tags: ['Khaja Set', 'Chatamari'] },
  { id: '2', name: 'Thakali Kitchen', cuisine: 'Thakali · Daal Bhat', rating: 4.6, price: '₨', dist: '0.5 km', open: true, img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500', tags: ['Thali', 'Gundruk'] },
  { id: '3', name: 'Fire & Ice', cuisine: 'Italian · Pizza', rating: 4.4, price: '₨₨', dist: '1.1 km', open: true, img: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=500', tags: ['Pizza', 'Pasta'] },
  { id: '4', name: 'Yangling Tibetan', cuisine: 'Tibetan · Momos', rating: 4.8, price: '₨', dist: '0.3 km', open: true, img: 'https://images.unsplash.com/photo-1625398407796-82650a8c135f?w=500', tags: ['Jhol Momo', 'Thukpa'] },
  { id: '5', name: 'Krishnarpan', cuisine: 'Nepali · Fine Dining', rating: 4.9, price: '₨₨₨', dist: '2.3 km', open: false, img: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=500', tags: ['Royal Cuisine'] },
];

const moods: Mood[] = [
  { id: 'date', label: 'Date night', emoji: '🕯️', color: '#ED93B1' },
  { id: 'quick', label: 'Quick bite', emoji: '⚡', color: '#FAC775' },
  { id: 'family', label: 'Family feast', emoji: '👨‍👩‍👧‍👦', color: '#5DCAA5' },
  { id: 'new', label: 'Something new', emoji: '✨', color: '#AFA9EC' },
  { id: 'comfort', label: 'Comfort food', emoji: '🍲', color: '#F0997B' },
];

const cuisines: Cuisine[] = [
  { label: 'Newari', emoji: '🍛' }, { label: 'Thakali', emoji: '🥘' },
  { label: 'Momos', emoji: '🥟' },  { label: 'Indian', emoji: '🍲' },
  { label: 'Chinese', emoji: '🥡' }, { label: 'Italian', emoji: '🍕' },
  { label: 'Korean', emoji: '🍜' },  { label: 'Japanese', emoji: '🍣' },
];

// ─── Screen ──────────────────────────────────────────────
export default function DashboardScreen() {
  const [mood, setMood] = useState<string | null>(null);

  return (
    <View style={s.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

        {/* Header */}
        <View style={s.header}>
          <View>
            <Text style={{ fontSize: 13, color: C.hint }}>Good evening 👋</Text>
            <Text style={{ fontSize: 17, fontWeight: '600', marginTop: 2 }}>📍 Thamel, Kathmandu ▾</Text>
          </View>
          <TouchableOpacity style={s.bellBtn}>
            <Text style={{ fontSize: 20 }}>🔔</Text>
            <View style={s.dot} />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <TouchableOpacity style={s.search}>
          <Text>🔍  </Text>
          <Text style={{ fontSize: 15, color: C.hint }}>Search restaurants, cuisines...</Text>
        </TouchableOpacity>

        {/* Mood selector */}
        <Text style={s.title}>What's the mood today?</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, gap: 8, marginBottom: 24 }}>
          {moods.map((m: Mood) => (
            <TouchableOpacity key={m.id} onPress={() => setMood(mood === m.id ? null : m.id)}
              style={[s.chip, { backgroundColor: mood === m.id ? m.color : C.muted }]}>
              <Text>{m.emoji} </Text>
              <Text style={{ fontSize: 13, fontWeight: '500', color: mood === m.id ? '#fff' : C.sub }}>{m.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Trending restaurants */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 16 }}>
          <Text style={s.title}>Trending near you</Text>
          <Text style={{ fontSize: 13, color: C.primary, fontWeight: '500' }}>See all</Text>
        </View>
        <FlatList<Restaurant> data={restaurants.slice(0, 4)} horizontal showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }} ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
          keyExtractor={(i: Restaurant) => i.id} renderItem={({ item: r }: { item: Restaurant }) => (
            <TouchableOpacity style={s.card}>
              <Image source={{ uri: r.img }} style={{ width: '100%', height: 130 }} />
              <View style={[s.badge, { backgroundColor: r.open ? 'rgba(29,158,117,0.9)' : 'rgba(226,75,74,0.9)' }]}>
                <Text style={{ fontSize: 11, color: '#fff', fontWeight: '600' }}>{r.open ? 'Open' : 'Closed'}</Text>
              </View>
              <View style={{ padding: 12 }}>
                <Text style={{ fontSize: 15, fontWeight: '600' }} numberOfLines={1}>{r.name}</Text>
                <Text style={{ fontSize: 13, color: C.sub, marginTop: 1 }}>{r.cuisine}</Text>
                <View style={{ flexDirection: 'row', gap: 10, marginTop: 6 }}>
                  <Text style={{ color: C.amber, fontWeight: '600', fontSize: 13 }}>⭐ {r.rating}</Text>
                  <Text style={{ fontSize: 13, color: C.hint }}>{r.price}</Text>
                  <Text style={{ fontSize: 13, color: C.hint }}>{r.dist}</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 6, marginTop: 8 }}>
                  {r.tags.map((t: string) => (
                    <View key={t} style={s.tag}><Text style={{ fontSize: 11, color: '#0F6E56', fontWeight: '500' }}>{t}</Text></View>
                  ))}
                </View>
              </View>
            </TouchableOpacity>
          )}
        />

        {/* Cuisine grid */}
        <Text style={[s.title, { marginTop: 24 }]}>Explore cuisines</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 8 }}>
          {cuisines.map((c: Cuisine) => (
            <TouchableOpacity key={c.label} style={s.gridItem}>
              <Text style={{ fontSize: 24 }}>{c.emoji}</Text>
              <Text style={{ fontSize: 11, fontWeight: '500', color: C.sub, marginTop: 4 }}>{c.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* New in town */}
        <Text style={[s.title, { marginTop: 24 }]}>New in town ✨</Text>
        {restaurants.slice(3).map((r: Restaurant) => (
          <TouchableOpacity key={r.id} style={s.listCard}>
            <Image source={{ uri: r.img }} style={{ width: 85, height: 85 }} />
            <View style={{ flex: 1, paddingHorizontal: 12, justifyContent: 'center' }}>
              <Text style={{ fontSize: 15, fontWeight: '600' }}>{r.name}</Text>
              <Text style={{ fontSize: 13, color: C.sub, marginTop: 1 }}>{r.cuisine}</Text>
              <Text style={{ color: C.amber, fontSize: 12, marginTop: 4 }}>⭐ {r.rating}  {r.price}  {r.dist}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Floating AI chat button */}
      <TouchableOpacity style={s.fab}>
        <Text style={{ fontSize: 22 }}>✨</Text>
        <Text style={{ fontSize: 10, fontWeight: '700', color: '#fff', marginTop: -2 }}>AI</Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────
const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, paddingTop: 20 },
  bellBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: C.muted, alignItems: 'center', justifyContent: 'center' },
  dot: { position: 'absolute', top: 10, right: 12, width: 8, height: 8, borderRadius: 4, backgroundColor: C.red },
  search: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginBottom: 20, padding: 12, borderRadius: 12, backgroundColor: C.muted, borderWidth: 0.5, borderColor: C.border },
  title: { fontSize: 17, fontWeight: '600', color: C.text, paddingHorizontal: 16, marginBottom: 12 },
  chip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999 },
  card: { width: width * 0.7, borderRadius: 14, backgroundColor: C.card, overflow: 'hidden', borderWidth: 0.5, borderColor: C.border },
  badge: { position: 'absolute', top: 8, left: 8, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  tag: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, backgroundColor: C.primaryLight },
  gridItem: { width: (width - 56) / 4, alignItems: 'center', paddingVertical: 12, borderRadius: 12, backgroundColor: C.muted },
  listCard: { flexDirection: 'row', marginHorizontal: 16, marginBottom: 10, borderRadius: 12, backgroundColor: C.card, overflow: 'hidden', borderWidth: 0.5, borderColor: C.border },
  fab: { position: 'absolute', bottom: 28, right: 20, width: 60, height: 60, borderRadius: 30, backgroundColor: C.primary, alignItems: 'center', justifyContent: 'center', elevation: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8 },
});
