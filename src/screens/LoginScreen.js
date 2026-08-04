import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { ShieldCheck, Mail, Lock, ArrowRight } from 'lucide-react-native';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen({ onNavigateRegister, onNavigateForgot }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('john@example.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);
    if (!res.success) {
      setError(res.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.brandBox}>
        <View style={styles.logo}>
          <ShieldCheck size={32} color="#000" />
        </View>
        <Text style={styles.brandTitle}>Gouri Aqua Plast</Text>
        <Text style={styles.brandSubtitle}>Ganesh Gouri Industries • Tanks, Pipes & Fittings</Text>
      </View>

      {error ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Mail size={18} color="#64748b" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Customer Email"
            placeholderTextColor="#64748b"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Lock size={18} color="#64748b" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#64748b"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity onPress={onNavigateForgot} style={styles.forgotBtn}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitBtn} onPress={handleLogin} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <>
              <Text style={styles.submitText}>Sign In to App</Text>
              <ArrowRight size={18} color="#000" />
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={onNavigateRegister} style={styles.registerLink}>
          <Text style={styles.registerText}>Don't have an account? <Text style={{ color: '#0ea5e9', fontWeight: '800' }}>Register Now</Text></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  brandBox: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: '#0ea5e9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
  },
  brandSubtitle: {
    fontSize: 12,
    color: '#0ea5e9',
    marginTop: 4,
    fontWeight: '600',
  },
  errorBox: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  errorText: {
    color: '#ef4444',
    textAlign: 'center',
    fontSize: 13,
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 50,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#0f172a',
    fontSize: 14,
  },
  forgotBtn: {
    alignSelf: 'flex-end',
  },
  forgotText: {
    color: '#0ea5e9',
    fontSize: 13,
    fontWeight: '600',
  },
  submitBtn: {
    backgroundColor: '#0ea5e9',
    height: 50,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  submitText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
  registerLink: {
    alignItems: 'center',
    marginTop: 16,
  },
  registerText: {
    color: '#64748b',
    fontSize: 13,
  },
});
