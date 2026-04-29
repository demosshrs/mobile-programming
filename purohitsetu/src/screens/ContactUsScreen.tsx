import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  Alert, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { ref, push } from 'firebase/database';
import { db } from '../firebase/config';
import { colors, spacing, radius } from '../constants/theme';

export default function ContactUsScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit() {
    if (!name.trim() || !email.trim() || !message.trim()) {
      Alert.alert('Missing Fields', 'Please fill in all fields before submitting.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    setLoading(true);
    try {
      await push(ref(db, 'contacts'), {
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        status: 'unread',
        createdAt: Date.now(),
      });
      setSent(true);
    } catch (err: unknown) {
      Alert.alert('Error', err instanceof Error ? err.message : 'Failed to send message.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={S.container}>
      {/* Header */}
      <View style={S.header}>
        <Text style={S.headerTitle}>Contact Us</Text>
        <Text style={S.headerSub}>We'll get back to you within 24 hours</Text>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={S.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {sent ? (
            <View style={S.successBox}>
              <View style={S.successIcon}>
                <Text style={{ fontSize: 36 }}>✅</Text>
              </View>
              <Text style={S.successTitle}>Message Sent!</Text>
              <Text style={S.successSub}>
                Thank you, {name}.{'\n'}We will reply to {email} shortly.
              </Text>
              <TouchableOpacity
                style={[S.btn, { marginTop: spacing.xl }]}
                onPress={() => { setSent(false); setName(''); setEmail(''); setMessage(''); }}
              >
                <Text style={S.btnTxt}>Send Another Message</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <Text style={S.label}>FULL NAME</Text>
              <TextInput
                style={S.input}
                placeholder="Your full name"
                placeholderTextColor={colors.muted}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />

              <Text style={S.label}>EMAIL ADDRESS</Text>
              <TextInput
                style={S.input}
                placeholder="your@email.com"
                placeholderTextColor={colors.muted}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Text style={S.label}>MESSAGE</Text>
              <TextInput
                style={[S.input, S.textarea]}
                placeholder="How can we help you?"
                placeholderTextColor={colors.muted}
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
              />

              {loading ? (
                <ActivityIndicator color={colors.purple} style={{ marginTop: spacing.lg }} />
              ) : (
                <TouchableOpacity style={S.btn} onPress={handleSubmit}>
                  <Text style={S.btnTxt}>Send Message →</Text>
                </TouchableOpacity>
              )}

              {/* Contact info card */}
              <View style={S.infoCard}>
                <Text style={S.infoCardTitle}>📬  Get in Touch</Text>
                <View style={S.infoRow}>
                  <Text style={S.infoIcon}>📍</Text>
                  <Text style={S.infoTxt}>Kathmandu, Nepal</Text>
                </View>
                <View style={S.infoRow}>
                  <Text style={S.infoIcon}>📱</Text>
                  <Text style={S.infoTxt}>WhatsApp: Mon–Sun  8:00 am – 8:00 pm</Text>
                </View>
                <View style={S.infoRow}>
                  <Text style={S.infoIcon}>✉️</Text>
                  <Text style={S.infoTxt}>support@purohitsetu.com</Text>
                </View>
              </View>

              {/* FAQ */}
              <Text style={S.sectionLabel}>FREQUENTLY ASKED</Text>
              {[
                { q: 'How do I book a Purohita?', a: 'Go to the Purohit tab, browse available pandits, and tap "Book Purohita" on their profile.' },
                { q: 'How far in advance should I book?', a: 'We recommend booking at least 3–7 days in advance for important ceremonies.' },
                { q: 'Is payment made through the app?', a: 'Payment is made directly in cash to the service provider on the day of the ceremony.' },
              ].map((faq, i) => (
                <View key={i} style={S.faqCard}>
                  <Text style={S.faqQ}>Q: {faq.q}</Text>
                  <Text style={S.faqA}>A: {faq.a}</Text>
                </View>
              ))}
            </>
          )}
          <View style={{ height: spacing.xxl }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: colors.purple,
    paddingTop: 52,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#fff', marginBottom: 2 },
  headerSub: { fontSize: 13, color: 'rgba(255,255,255,0.8)' },
  content: { padding: spacing.lg },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.subtext,
    letterSpacing: 1,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.btn,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: colors.text,
    backgroundColor: colors.card,
    marginBottom: spacing.lg,
  },
  textarea: { height: 130, textAlignVertical: 'top', paddingTop: 12 },
  btn: {
    backgroundColor: colors.purple,
    borderRadius: radius.btn,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  btnTxt: { color: '#fff', fontWeight: '700', fontSize: 15 },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: radius.card,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  infoCardTitle: { fontSize: 13, fontWeight: '700', color: colors.purple, marginBottom: 4 },
  infoRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm },
  infoIcon: { fontSize: 14, marginTop: 1 },
  infoTxt: { fontSize: 13, color: colors.subtext, flex: 1, lineHeight: 20 },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.subtext,
    letterSpacing: 1,
    marginBottom: spacing.sm,
    marginTop: spacing.sm,
  },
  faqCard: {
    backgroundColor: colors.card,
    borderRadius: radius.card,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
    borderLeftWidth: 3,
    borderLeftColor: colors.purple,
  },
  faqQ: { fontSize: 13, fontWeight: '700', color: colors.text, marginBottom: 4 },
  faqA: { fontSize: 12, color: colors.subtext, lineHeight: 18 },
  successBox: { alignItems: 'center', paddingTop: 40, paddingBottom: 20 },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.successBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
    borderWidth: 2,
    borderColor: colors.success,
  },
  successTitle: { fontSize: 22, fontWeight: '800', color: colors.success, marginBottom: spacing.sm },
  successSub: {
    fontSize: 14,
    color: colors.subtext,
    textAlign: 'center',
    lineHeight: 22,
  },
});
