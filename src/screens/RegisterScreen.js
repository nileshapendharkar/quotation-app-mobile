import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { User, Mail, Phone, Lock, Building, MapPin, ArrowLeft } from 'lucide-react-native';
import { AuthContext } from '../context/AuthContext';

export default function RegisterScreen({ onNavigateLogin }) {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    setError('');
    if (!name || !email || !mobile || !password) {
      setError('Please fill in Name, Email, Mobile and Password');
      return;
    }
    setLoading(true);
    const res = await register({
      name,
      email,
      mobile,
      password,
      companyName,
      companyAddress
    });
    setLoading(false);
    if (!res.success) {
      setError(res.message);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity onPress={onNavigateLogin} style={styles.backBtn}>
        <ArrowLeft size={20} color="#0ea5e9" />
        <Text style={styles.backText}>Back to Login</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>Create Customer Account</Text>
        <Text style={styles.subtitle}>Register to generate product quotations</Text>
      </View>

      {error ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <User size={18} color="#64748b" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Full Name *"
            placeholderTextColor="#64748b"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Mail size={18} color="#64748b" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email Address *"
            placeholderTextColor="#64748b"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Phone size={18} color="#64748b" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Mobile Number *"
            placeholderTextColor="#64748b"
            value={mobile}
            onChangeText={setMobile}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputContainer}>
          <Lock size={18} color="#64748b" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password *"
            placeholderTextColor="#64748b"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.inputContainer}>
          <Building size={18} color="#64748b" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Company / Business Name (Optional)"
            placeholderTextColor="#64748b"
            value={companyName}
            onChangeText={setCompanyName}
          />
        </View>

        <View style={styles.inputContainer}>
          <MapPin size={18} color="#64748b" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Company Address (Optional)"
            placeholderTextColor="#64748b"
            value={companyAddress}
            onChangeText={setCompanyAddress}
          />
        </View>

        <TouchableOpacity style={styles.submitBtn} onPress={handleRegister} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.submitText}>Complete Registration</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 20,
  },
  backText: {
    color: '#0ea5e9',
    fontSize: 14,
    fontWeight: '600',
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 4,
  },
  errorBox: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
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
  submitBtn: {
    backgroundColor: '#0ea5e9',
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  submitText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
});
