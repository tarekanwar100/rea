import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Search, Clock, Users, FileText, TrendingUp, Calendar } from 'lucide-react-native';

export default function TeacherExams() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const exams = [
    {
      id: 1,
      title: 'Calculus Midterm Exam',
      subject: 'Mathematics',
      date: '2024-01-15',
      duration: 120,
      students: 45,
      status: 'active',
      submissions: 42,
      averageScore: 78,
    },
    {
      id: 2,
      title: 'Quantum Physics Quiz',
      subject: 'Physics',
      date: '2024-01-12',
      duration: 60,
      students: 38,
      status: 'completed',
      submissions: 38,
      averageScore: 85,
    },
    {
      id: 3,
      title: 'Organic Chemistry Test',
      subject: 'Chemistry',
      date: '2024-01-20',
      duration: 90,
      students: 42,
      status: 'scheduled',
      submissions: 0,
      averageScore: 0,
    },
    {
      id: 4,
      title: 'Cell Biology Assessment',
      subject: 'Biology',
      date: '2024-01-08',
      duration: 75,
      students: 51,
      status: 'completed',
      submissions: 49,
      averageScore: 92,
    },
  ];

  const tabs = [
    { id: 'all', title: 'All Exams', count: exams.length },
    { id: 'active', title: 'Active', count: exams.filter(e => e.status === 'active').length },
    { id: 'scheduled', title: 'Scheduled', count: exams.filter(e => e.status === 'scheduled').length },
    { id: 'completed', title: 'Completed', count: exams.filter(e => e.status === 'completed').length },
  ];

  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exam.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || exam.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#059669';
      case 'scheduled': return '#EA580C';
      case 'completed': return '#64748B';
      default: return '#64748B';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'scheduled': return 'Scheduled';
      case 'completed': return 'Completed';
      default: return status;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Exams & Assessments</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus color="#FFFFFF" size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search color="#64748B" size={20} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search exams..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#94A3B8"
          />
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
        <View style={styles.tabs}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tab, activeTab === tab.id && styles.activeTab]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Text style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}>
                {tab.title}
              </Text>
              <View style={[styles.tabBadge, activeTab === tab.id && styles.activeTabBadge]}>
                <Text style={[styles.tabBadgeText, activeTab === tab.id && styles.activeTabBadgeText]}>
                  {tab.count}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.examsContainer}>
          {filteredExams.map((exam) => (
            <TouchableOpacity key={exam.id} style={styles.examCard}>
              <View style={styles.examHeader}>
                <View style={styles.examInfo}>
                  <Text style={styles.examTitle}>{exam.title}</Text>
                  <Text style={styles.examSubject}>{exam.subject}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(exam.status)}15` }]}>
                  <Text style={[styles.statusText, { color: getStatusColor(exam.status) }]}>
                    {getStatusLabel(exam.status)}
                  </Text>
                </View>
              </View>

              <View style={styles.examMeta}>
                <View style={styles.metaItem}>
                  <Calendar color="#64748B" size={16} />
                  <Text style={styles.metaText}>{exam.date}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Clock color="#64748B" size={16} />
                  <Text style={styles.metaText}>{exam.duration} min</Text>
                </View>
                <View style={styles.metaItem}>
                  <Users color="#64748B" size={16} />
                  <Text style={styles.metaText}>{exam.students} students</Text>
                </View>
              </View>

              {exam.status === 'completed' && (
                <View style={styles.examStats}>
                  <View style={styles.statItem}>
                    <FileText color="#2563EB" size={16} />
                    <Text style={styles.statLabel}>Submissions</Text>
                    <Text style={styles.statValue}>{exam.submissions}/{exam.students}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <TrendingUp color="#059669" size={16} />
                    <Text style={styles.statLabel}>Average Score</Text>
                    <Text style={styles.statValue}>{exam.averageScore}%</Text>
                  </View>
                </View>
              )}

              <View style={styles.examActions}>
                {exam.status === 'scheduled' && (
                  <>
                    <TouchableOpacity style={styles.secondaryAction}>
                      <Text style={styles.secondaryActionText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.primaryAction}>
                      <Text style={styles.primaryActionText}>Start Exam</Text>
                    </TouchableOpacity>
                  </>
                )}
                {exam.status === 'active' && (
                  <>
                    <TouchableOpacity style={styles.secondaryAction}>
                      <Text style={styles.secondaryActionText}>Monitor</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.primaryAction, { backgroundColor: '#EF4444' }]}>
                      <Text style={styles.primaryActionText}>End Exam</Text>
                    </TouchableOpacity>
                  </>
                )}
                {exam.status === 'completed' && (
                  <>
                    <TouchableOpacity style={styles.secondaryAction}>
                      <Text style={styles.secondaryActionText}>View Results</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.primaryAction}>
                      <Text style={styles.primaryActionText}>Grade</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.createExamCard}>
          <Plus color="#64748B" size={32} />
          <Text style={styles.createExamTitle}>Create New Exam</Text>
          <Text style={styles.createExamDescription}>
            Design custom assessments with multiple question types
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1E293B',
  },
  addButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    padding: 12,
  },
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1E293B',
    marginLeft: 12,
  },
  tabsContainer: {
    marginBottom: 16,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 8,
  },
  activeTab: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#64748B',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  tabBadge: {
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  activeTabBadge: {
    backgroundColor: '#FFFFFF',
  },
  tabBadgeText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#64748B',
  },
  activeTabBadgeText: {
    color: '#2563EB',
  },
  scrollView: {
    flex: 1,
  },
  examsContainer: {
    paddingHorizontal: 24,
    gap: 16,
  },
  examCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  examHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  examInfo: {
    flex: 1,
  },
  examTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 4,
  },
  examSubject: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
  },
  examMeta: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748B',
  },
  examStats: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748B',
  },
  statValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#1E293B',
  },
  examActions: {
    flexDirection: 'row',
    gap: 12,
  },
  secondaryAction: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
  },
  secondaryActionText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#64748B',
  },
  primaryAction: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#2563EB',
    alignItems: 'center',
  },
  primaryActionText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  createExamCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    marginHorizontal: 24,
    marginVertical: 16,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
  },
  createExamTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1E293B',
    marginTop: 12,
    marginBottom: 6,
  },
  createExamDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
  },
});