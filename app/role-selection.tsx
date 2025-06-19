import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GraduationCap, User, ChevronRight } from 'lucide-react-native';

export default function RoleSelection() {
  const handleTeacherSelect = () => {
    router.push('/(teacher)/dashboard');
  };

  const handleStudentSelect = () => {
    router.push('/(student)/dashboard');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Choose Your Role</Text>
          <Text style={styles.subtitle}>
            Select how you'll be using EduPlatform
          </Text>
        </View>

        <View style={styles.rolesContainer}>
          <TouchableOpacity style={styles.roleCard} onPress={handleTeacherSelect}>
            <View style={styles.roleIconContainer}>
              <GraduationCap color="#2563EB" size={48} />
            </View>
            <Text style={styles.roleTitle}>Teacher</Text>
            <Text style={styles.roleDescription}>
              Create courses, manage exams, conduct live streams, and assess students
            </Text>
            <View style={styles.roleFeatures}>
              <Text style={styles.featureItem}>• Create and manage courses</Text>
              <Text style={styles.featureItem}>• Design custom exams</Text>
              <Text style={styles.featureItem}>• Host live streaming sessions</Text>
              <Text style={styles.featureItem}>• Track student progress</Text>
            </View>
            <View style={styles.continueButton}>
              <Text style={styles.continueText}>Continue as Teacher</Text>
              <ChevronRight color="#2563EB" size={20} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.roleCard} onPress={handleStudentSelect}>
            <View style={styles.roleIconContainer}>
              <User color="#059669" size={48} />
            </View>
            <Text style={styles.roleTitle}>Student</Text>
            <Text style={styles.roleDescription}>
              Access courses, take exams, join live classes, and track your progress
            </Text>
            <View style={styles.roleFeatures}>
              <Text style={styles.featureItem}>• Access course materials</Text>
              <Text style={styles.featureItem}>• Take assessments</Text>
              <Text style={styles.featureItem}>• Join live classes</Text>
              <Text style={styles.featureItem}>• View grades and progress</Text>
            </View>
            <View style={styles.continueButton}>
              <Text style={styles.continueText}>Continue as Student</Text>
              <ChevronRight color="#059669" size={20} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#1E293B',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
  },
  rolesContainer: {
    flex: 1,
    gap: 24,
  },
  roleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  roleIconContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  roleTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 8,
  },
  roleDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 16,
  },
  roleFeatures: {
    marginBottom: 24,
  },
  featureItem: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#475569',
    marginBottom: 8,
    lineHeight: 20,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
  },
  continueText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#334155',
    marginRight: 8,
  },
});