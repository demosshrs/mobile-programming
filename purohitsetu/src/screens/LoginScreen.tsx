import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  Alert, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { auth, db } from '../firebase/config';
import { colors, spacing, radius } from '../constants/theme';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/Navigator';

type Props = { navigation: StackNavigationProp<RootStackParamList, 'Login'> };

export default function LoginScreen({ navigation }: Props) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignUp() {
    if (!name || !email || !password) {
      Alert.alert('Missing Fields', 'Please fill in all required fields.');
      return;
    }
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      try {
        await set(ref(db, `users/${cred.user.uid}`), { name, phone, email });
      } catch (dbErr: unknown) {
        Alert.alert('Error', dbErr instanceof Error ? dbErr.message : 'Failed to save user.');
        setLoading(false);
        return;
      }
      navigation.replace('Main');
    } catch (e: unknown) {
      Alert.alert('Sign Up Failed', e instanceof Error ? e.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert('Missing Fields', 'Please enter your email and password.');
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.replace('Main');
    } catch (e: unknown) {
      Alert.alert('Login Failed', e instanceof Error ? e.message : 'Incorrect email or password.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={S.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Brand header */}
      <View style={S.header}>
        <View style={S.logoBox}>
          <Text style={{ fontSize: 32 }}>🛕</Text>
        </View>
        <Text style={S.appName}>PurohitSetu</Text>
        <Text style={S.tagline}>धर्म की ओर एक सेतु</Text>
      </View>

      {/* Form card */}
      <ScrollView
        style={S.form}
        contentContainerStyle={S.formContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={S.title}>{isSignUp ? 'Create Account' : 'Welcome Back'}</Text>
        <Text style={S.subtitle}>
          {isSignUp ? 'Join PurohitSetu today' : 'नमस्ते, स्वागत छ । Sign in to continue'}
        </Text>

        {isSignUp && (
          <>
            <Text style={S.label}>FULL NAME</Text>
            <TextInput
              style={S.input}
              placeholder="Ramesh Thapa"
              placeholderTextColor={colors.muted}
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
            <Text style={S.label}>PHONE NUMBER</Text>
            <TextInput
              style={S.input}
              placeholder="+977 98XXXXXXXX"
              placeholderTextColor={colors.muted}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </>
        )}

        <Text style={S.label}>EMAIL ADDRESS</Text>
        <TextInput
          style={S.input}
          placeholder="you@email.com"
          placeholderTextColor={colors.muted}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={S.label}>PASSWORD</Text>
        <TextInput
          style={S.input}
          placeholder="Min. 8 characters"
          placeholderTextColor={colors.muted}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {loading ? (
          <ActivityIndicator color={colors.brand} style={{ marginTop: spacing.lg }} />
        ) : (
          <TouchableOpacity style={S.btn} onPress={isSignUp ? handleSignUp : handleLogin}>
            <Text style={S.btnTxt}>{isSignUp ? 'Create Account →' : 'Sign In →'}</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)} style={S.toggle}>
          <Text style={S.toggleTxt}>
            {isSignUp ? 'Already have an account?  ' : "Don't have an account?  "}
            <Text style={S.toggleLink}>{isSignUp ? 'Sign In' : 'Sign Up'}</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.brand },
  header: {
    paddingTop: 60,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    alignItems: 'center',
  },
  logoBox: {
    width: 68,
    height: 68,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: radius.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  appName: { fontSize: 28, fontWeight: '800', color: '#fff', letterSpacing: 0.5 },
  tagline: { fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 4 },
  form: { backgroundColor: colors.card, borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  formContent: { padding: spacing.xl, paddingTop: spacing.xxl, paddingBottom: 40 },
  title: { fontSize: 22, fontWeight: '700', color: colors.text, marginBottom: 4 },
  subtitle: { fontSize: 13, color: colors.subtext, marginBottom: spacing.xl, lineHeight: 20 },
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
    backgroundColor: colors.background,
    marginBottom: spacing.lg,
  },
  btn: {
    backgroundColor: colors.brand,
    borderRadius: radius.btn,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  btnTxt: { color: '#fff', fontWeight: '700', fontSize: 15 },
  toggle: { marginTop: spacing.lg, alignItems: 'center' },
  toggleTxt: { fontSize: 14, color: colors.subtext },
  toggleLink: { color: colors.brand, fontWeight: '700' },
});
