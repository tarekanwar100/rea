import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookOpen, Clock, TrendingUp, Award, Play, Calendar, Bell, Target } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function StudentDashboard() {
  const stats = [
    { title: 'Courses Enrolled', value: '8', icon: BookOpen, color: '#059669' },
    { title: 'Hours Studied', value: '124', icon: Clock, color: '#2563EB' },
    { title: 'Average Score', value: '87%', icon: TrendingUp, color: '#EA580C' },
    { title: 'Certificates', value: '3', icon: Award, color: '#7C3AED' },
  ];

  const recentCourses = [
    {
      title: 'Advanced Mathematics',
      progress: 75,
      nextLesson: 'Integration Techniques',
      instructor: 'Dr. Sarah Johnson',
      color: '#2563EB',
    },
    {
      title: 'Modern Physics',
      progress: 60,
      nextLesson: 'Quantum Mechanics',
      instructor: 'Prof. Michael Chen',
      color: '#059669',
    },
    {
      title: 'Organic Chemistry',
      progress: 45,
      nextLesson: 'Chemical Reactions',
      instructor: 'Dr. Emily Davis',
      color: '#EA580C',
    },
  ];

  const upcomingEvents = [
    { title: 'Physics Live Class', time: '2:00 PM Today', type: 'live', color: '#059669' },
    { title: 'Mathematics Exam', time: '10:00 AM Tomorrow', type: 'exam', color: '#EF4444' },
    { title: 'Chemistry Assignment Due', time: '11:59 PM Friday', type: 'assignment', color: '#EA580C' },
  ];

  const assignments = [
    { title: 'Calculus Problem Set 5', subject: 'Mathematics', dueDate: 'Due in 2 days', status: 'pending' },
    { title: 'Lab Report: Pendulum Motion', subject: 'Physics', dueDate: 'Due in 5 days', status: 'in-progress' },
    { title: 'Chemical Bonding Essay', subject: 'Chemistry', dueDate: 'Submitted', status: 'completed' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back!</Text>
            <Text style={styles.studentName}>Alex Thompson</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell color="#64748B" size={24} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <TouchableOpacity key={index} style={styles.statCard}>
              <View style={[styles.statIconContainer, { backgroundColor: `${stat.color}15` }]}>
                <stat.icon color={stat.color} size={24} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statTitle}>{stat.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Continue Learning</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.coursesScroll}>
            <View style={styles.coursesContainer}>
              {recentCourses.map((course, index) => (
                <TouchableOpacity key={index} style={[styles.courseCard, { borderLeftColor: course.color }]}>
                  <Text style={styles.courseTitle}>{course.title}</Text>
                  <Text style={styles.instructor}>{course.instructor}</Text>
                  
                  <View style={styles.progressContainer}>
                    <Text style={styles.progressLabel}>Progress</Text>
                    <View style={styles.progressBar}>
                      <View
                        style={[
                          styles.progressFill,
                          {
                            width: `${course.progress}%`,
                            backgroundColor: course.color,
                          },
                        ]}
                      />
                    </View>
                    <Text style={styles.progressPercentage}>{course.progress}%</Text>
                  </View>

                  <View style={styles.nextLessonContainer}>
                    <Text style={styles.nextLessonLabel}>Next:</Text>
                    <Text style={styles.nextLessonTitle}>{course.nextLesson}</Text>
                  </View>

                  <TouchableOpacity style={[styles.continueButton, { backgroundColor: course.color }]}>
                    <Play color="#FFFFFF" size={16} />
                    <Text style={styles.continueButtonText}>Continue</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <View style={styles.eventsContainer}>
            {upcomingEvents.map((event, index) => (
              <View key={index} style={styles.eventCard}>
                <View style={[styles.eventIndicator, { backgroundColor: event.color }]} />
                <View style={styles.eventContent}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventTime}>{event.time}</Text>
                </View>
                <View style={[styles.eventTypeTag, { backgroundColor: `${event.color}15` }]}>
                  <Text style={[styles.eventTypeText, { color: event.color }]}>
                    {event.type.toUpperCase()}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Assignments</Text>
          <View style={styles.assignmentsContainer}>
            {assignments.map((assignment, index) => (
              <View key={index} style={styles.assignmentCard}>
                <View style={styles.assignmentHeader}>
                  <Text style={styles.assignmentTitle}>{assignment.title}</Text>
                  <View style={[
                    styles.statusBadge,
                    {
                      backgroundColor:
                        assignment.status === 'completed' ? '#DCFCE7' :
                        assignment.status === 'in-progress' ? '#FEF3C7' : '#FEE2E2'
                    }
                  ]}>
                    <Text style={[
                      styles.statusText,
                      {
                        color:
                          assignment.status === 'completed' ? '#059669' :
                          assignment.status === 'in-progress' ? '#D97706' : '#DC2626'
                      }
                    ]}>
                      {assignment.status === 'completed' ? 'Completed' :
                       assignment.status === 'in-progress' ? 'In Progress' : 'Pending'}
                    </Text>
                  </View>
                </View>
                <Text style={styles.assignmentSubject}>{assignment.subject}</Text>
                <Text style={styles.assignmentDueDate}>{assignment.dueDate}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity style={styles.quickActionCard}>
              <Target color="#059669" size={32} />
              <Text style={styles.quickActionText}>Study Goals</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <Calendar color="#2563EB" size={32} />
              <Text style={styles.quickActionText}>Schedule</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <Award color="#EA580C" size={32} />
              <Text style={styles.quickActionText}>Achievements</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  greeting: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#64748B',
  },
  studentName: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1E293B',
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    backgroundColor: '#EF4444',
    borderRadius: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    width: (width - 56) / 2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statIconContainer: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1E293B',
    marginBottom: 4,
  },
  statTitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  coursesScroll: {
    paddingLeft: 24,
  },
  coursesContainer: {
    flexDirection: 'row',
    gap: 16,
    paddingRight: 24,
  },
  courseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: 280,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  courseTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 4,
  },
  instructor: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
    marginBottom: 16,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#64748B',
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#F1F5F9',
    borderRadius: 2,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressPercentage: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#1E293B',
    textAlign: 'right',
  },
  nextLessonContainer: {
    marginBottom: 16,
  },
  nextLessonLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#64748B',
    marginBottom: 4,
  },
  nextLessonTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#1E293B',
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 6,
  },
  continueButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  eventsContainer: {
    paddingHorizontal: 24,
    gap: 12,
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  eventIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
    marginRight: 16,
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#1E293B',
    marginBottom: 2,
  },
  eventTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748B',
  },
  eventTypeTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  eventTypeText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
  },
  assignmentsContainer: {
    paddingHorizontal: 24,
    gap: 12,
  },
  assignmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  assignmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  assignmentTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#1E293B',
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
  },
  assignmentSubject: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748B',
    marginBottom: 4,
  },
  assignmentDueDate: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#64748B',
  },
  quickActionsContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#334155',
    marginTop: 8,
    textAlign: 'center',
  },
});