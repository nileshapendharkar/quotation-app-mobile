import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Building2, User, Phone, Mail, MapPin, Save, ArrowLeft } from 'lucide-react-native';
import { AuthContext } from '../context/AuthContext';

export default function CompanyProfileScreen({ onNavigateBack }) {
  const { user, updateProfile } = useContext(AuthContext);

  const [name, setName] = useState(user ? user.name : 'John Customer');
  const [email] = useState(user ? user.email : 'john@example.com');
  const [mobile, setMobile] = useState(user ? user.mobile : '+1987654321');
  const [companyName, setCompanyName] = useState(user ? user.companyName : 'Apex Logistics Ltd');
  const [companyAddress, setCompanyAddress] = useState(user ? user.companyAddress : '45 Industrial Zone, Sector 4');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    const res = await updateProfile({
      name,
      mobile,
      companyName,
      companyAddress
    });
    setLoading(false);
    if (res.success) {
      Alert.alert('Success', 'Profile updated successfully');
    } else {
      Alert.alert('Error', res.message || 'Update failed');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity onPress={onNavigateBack} style={styles.backBtn}>
        <ArrowLeft size={20} color="#0ea5e9" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Building2 size={32} color="#0ea5e9" style={{ marginBottom: 8 }} />
        <Text style={styles.title}>Company & Profile Details</Text>
        <Text style={styles.subtitle}>This information appears on generated PDF quotations.</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Contact Name</Text>
          <View style={styles.inputBox}>
            <User size={18} color="#64748b" style={styles.icon} />
            <TextInput style={styles.input} value={name} onChangeText={setName} />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email Address (Read-only)</Text>
          <View style={[styles.inputBox, { opacity: 0.6 }]}>
            <Mail size={18} color="#64748b" style={styles.icon} />
            <TextInput style={styles.input} value={email} editable={false} />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mobile Phone Number</Text>
          <View style={styles.inputBox}>
            <Phone size={18} color="#64748b" style={styles.icon} />
            <TextInput style={styles.input} value={mobile} onChangeText={setMobile} keyboardType="phone-pad" />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Company / Business Name</Text>
          <View style={styles.inputBox}>
            <Building2 size={18} color="#64748b" style={styles.icon} />
            <TextInput style={styles.input} value={companyName} onChangeText={setCompanyName} />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Company Physical Address</Text>
          <View style={[styles.inputBox, { height: 80, alignItems: 'flex-start', paddingTop: 12 }]}>
            <MapPin size={18} color="#64748b" style={styles.icon} />
            <TextInput 
              style={[styles.input, { textAlignVertical: 'top' }]} 
              value={companyAddress} 
              onChangeText={setCompanyAddress}
              multiline
            />
          </View>
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <React.Fragment>
              <Save size={18} color="#fff" />
              <Text style={styles.saveText}>Save Profile Changes</Text>
            </React.Fragment>
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
    paddingHorizontal: 20,
    paddingTop: 45,
    paddingBottom: 40,
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
    color: '#0f172a',
    fontSize: 22,
    fontWeight: '800',
  },
  subtitle: {
    color: '#64748b',
    fontSize: 13,
    marginTop: 4,
  },
  form: {
    gap: 16,
  },
  inputGroup: {},
  label: {
    color: '#475569',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  inputBox: {
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
  saveBtn: {
    backgroundColor: '#0ea5e9',
    height: 50,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },
  saveText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
});
