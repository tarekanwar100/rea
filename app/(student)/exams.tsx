import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Clock, Calendar, FileText, CheckCircle, AlertCircle, XCircle, TrendingUp } from 'lucide-react-native';

export default function StudentExams() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('upcoming');

  const exams = [
    {
      id: 1,
      title: 'Calculus Midterm Exam',
      subject: 'Mathematics',
      instructor: 'Dr. Sarah Johnson',
      date: '2024-01-20',
      time: '10:00 AM',
      duration: 120,
      status: 'upcoming',
      score: null,
      maxScore: 100,
      questions: 25,
      attempts: 1,
    },
    {
      id: 2,
      title: 'Quantum Physics Quiz',
      subject: 'Physics',
      instructor: 'Prof. Michael Chen',
      date: '2024-01-18',
      time: '2:00 PM',
      duration: 60,
      status: 'available',
      score: null,
      maxScore: 50,
      questions: 15,
      attempts: 2,
    },
    {
      id: 3,
      title: 'Organic Chemistry Test',
      subject: 'Chemistry',
      instructor: 'Dr. Emily Davis',
      date: '2024-01-10',
      time: '11:00 AM',
      duration: 90,
      status: 'completed',
      score: 78,
      maxScore: 100,
      questions: 20,
      attempts: 1,
    },
    {
      id: 4,
      title: 'Cell Biology Assessment',
      subject: 'Biology',
      instructor: 'Dr. Rachel Adams',
      date: '2024-01-08',
      time: '9:00 AM',
      duration: 75,
      status: 'completed',
      score: 92,
      maxScore: 100,
      questions: 18,
      attempts: 1,
    },
    {
      id: 5,
      title: 'Statistics Quiz',
      subject: 'Mathematics',
      instructor: 'Prof. David Wilson',
      date: '2024-01-05',
      time: '3:30 PM',
      duration: 45,
      status: 'missed',
      score: null,
      maxScore: 30,
      questions: 10,
      attempts: 0,
    },
  ];

  const tabs = [
    { id: 'upcoming', title: 'Upcoming', count: exams.filter(e => e.status === 'upcoming').length },
    { id: 'available', title: 'Available', count: exams.filter(e => e.status === 'available').length },
    { id: 'completed', title: 'Completed', count: exams.filter(e => e.status === 'completed').length },
    { id: 'missed', title: 'Missed', count: exams.filter(e => e.status === 'missed').length },
  ];

  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exam.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = exam.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming': return <Calendar color="#2563EB" size={20} />;
      case 'available': return <AlertCircle color="#F59E0B" size={20} />;
      case 'completed': return <CheckCircle color="#059669" size={20} />;
      case 'missed': return <XCircle color="#EF4444" size={20} />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return '#2563EB';
      case 'available': return '#F59E0B';
      case 'completed': return '#059669';
      case 'missed': return '#EF4444';
      default: return '#64748B';
    }
  };

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90) return '#059669';
    if (percentage >= 80) return '#F59E0B';
    if (percentage >= 70) return '#EA580C';
    return '#EF4444';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Exams & Assessments</Text>
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
                  <Text style={styles.examInstructor}>{exam.instructor}</Text>
                </View>
                <View style={styles.statusContainer}>
                  {getStatusIcon(exam.status)}
                </View>
              </View>

              <View style={styles.examMeta}>
                <View style={styles.metaItem}>
                  <Calendar color="#64748B" size={16} />
                  <Text style={styles.metaText}>{exam.date}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Clock color="#64748B" size={16} />
                  <Text style={styles.metaText}>{exam.time} • {exam.duration} min</Text>
                </View>
                <View style={styles.metaItem}>
                  <FileText color="#64748B" size={16} />
                  <Text style={styles.metaText}>{exam.questions} questions</Text>
                </View>
              </View>

              {exam.status === 'completed' && exam.score !== null && (
                <View style={styles.scoreContainer}>
                  <View style={styles.scoreHeader}>
                    <TrendingUp color={getScoreColor(exam.score, exam.maxScore)} size={16} />
                    <Text style={styles.scoreLabel}>Your Score</Text>
                  </View>
                  <Text style={[styles.scoreValue, { color: getScoreColor(exam.score, exam.maxScore) }]}>
                    {exam.score}/{exam.maxScore} ({Math.round((exam.score / exam.maxScore) * 100)}%)
                  </Text>
                </View>
              )}

              <View style={styles.examActions}>
                {exam.status === 'upcoming' && (
                  <TouchableOpacity style={styles.secondaryAction}>
                    <Text style={styles.secondaryActionText}>View Details</Text>
                  </TouchableOpacity>
                )}
                {exam.status === 'available' && (
                  <>
                    <TouchableOpacity style={styles.secondaryAction}>
                      <Text style={styles.secondaryActionText}>Preview</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.primaryAction, { backgroundColor: getStatusColor(exam.status) }]}>
                      <Text style={styles.primaryActionText}>Start Exam</Text>
                    </TouchableOpacity>
                  </>
                )}
                {exam.status === 'completed' && (
                  <>
                    <TouchableOpacity style={styles.secondaryAction}>
                      <Text style={styles.secondaryActionText}>Review Answers</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.primaryAction, { backgroundColor: getStatusColor(exam.status) }]}>
                      <Text style={styles.primaryActionText}>View Results</Text>
                    </TouchableOpacity>
                  </>
                )}
                {exam.status === 'missed' && (
                  <TouchableOpacity style={styles.secondaryAction}>
                    <Text style={styles.secondaryActionText}>Contact Instructor</Text>
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {filteredExams.length === 0 && (
          <View style={styles.emptyState}>
            <FileText color="#94A3B8" size={48} />
            <Text style={styles.emptyTitle}>No exams found</Text>
            <Text style={styles.emptyDescription}>
              {activeTab === 'upcoming' && 'You have no upcoming exams scheduled.'}
              {activeTab === 'available' && 'No exams are currently available to take.'}
              {activeTab === 'completed' && 'You haven\'t completed any exams yet.'}
              {activeTab === 'missed' && 'You haven\'t missed any exams.'}
            </Text>
          </View>
        )}
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
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1E293B',
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
    backgroundColor: '#059669',
    borderColor: '#059669',
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
    color: '#059669',
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
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#059669',
    marginBottom: 2,
  },
  examInstructor: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748B',
  },
  statusContainer: {
    padding: 8,
  },
  examMeta: {
    gap: 8,
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748B',
  },
  scoreContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  scoreHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  scoreLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#64748B',
  },
  scoreValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
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
    backgroundColor: '#059669',
    alignItems: 'center',
  },
  primaryActionText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1E293B',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
  },
});