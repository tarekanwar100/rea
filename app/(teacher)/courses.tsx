import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Search, Users, BookOpen, Play, MoreVertical } from 'lucide-react-native';

export default function TeacherCourses() {
  const [searchQuery, setSearchQuery] = useState('');

  const courses = [
    {
      id: 1,
      title: 'Advanced Mathematics',
      subject: 'Mathematics',
      students: 45,
      lessons: 24,
      progress: 75,
      color: '#2563EB',
      image: 'https://images.pexels.com/photos/6256065/pexels-photo-6256065.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 2,
      title: 'Modern Physics',
      subject: 'Physics',
      students: 38,
      lessons: 18,
      progress: 60,
      color: '#059669',
      image: 'https://images.pexels.com/photos/8471904/pexels-photo-8471904.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 3,
      title: 'Organic Chemistry',
      subject: 'Chemistry',
      students: 42,
      lessons: 20,
      progress: 45,
      color: '#EA580C',
      image: 'https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 4,
      title: 'Cell Biology',
      subject: 'Biology',
      students: 51,
      lessons: 22,
      progress: 80,
      color: '#7C3AED',
      image: 'https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Courses</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus color="#FFFFFF" size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search color="#64748B" size={20} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search courses..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#94A3B8"
          />
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.coursesGrid}>
          {filteredCourses.map((course) => (
            <TouchableOpacity key={course.id} style={styles.courseCard}>
              <View style={styles.courseHeader}>
                <Text style={styles.courseSubject}>{course.subject}</Text>
                <TouchableOpacity style={styles.moreButton}>
                  <MoreVertical color="#64748B" size={16} />
                </TouchableOpacity>
              </View>

              <Text style={styles.courseTitle}>{course.title}</Text>

              <View style={styles.courseStats}>
                <View style={styles.stat}>
                  <Users color="#64748B" size={16} />
                  <Text style={styles.statText}>{course.students} students</Text>
                </View>
                <View style={styles.stat}>
                  <BookOpen color="#64748B" size={16} />
                  <Text style={styles.statText}>{course.lessons} lessons</Text>
                </View>
              </View>

              <View style={styles.progressContainer}>
                <Text style={styles.progressLabel}>Course Progress</Text>
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

              <View style={styles.courseActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Play color={course.color} size={16} />
                  <Text style={[styles.actionText, { color: course.color }]}>Continue</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.primaryAction, { backgroundColor: course.color }]}>
                  <Text style={styles.primaryActionText}>Manage</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.createCourseCard}>
          <Plus color="#64748B" size={32} />
          <Text style={styles.createCourseTitle}>Create New Course</Text>
          <Text style={styles.createCourseDescription}>
            Start building your next course with our easy-to-use tools
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
  scrollView: {
    flex: 1,
  },
  coursesGrid: {
    paddingHorizontal: 24,
    gap: 16,
  },
  courseCard: {
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
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  courseSubject: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  moreButton: {
    padding: 4,
  },
  courseTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 16,
  },
  courseStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  progressContainer: {
    marginBottom: 20,
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
  courseActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 6,
  },
  actionText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
  primaryAction: {
    backgroundColor: '#2563EB',
  },
  primaryActionText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  createCourseCard: {
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
  createCourseTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1E293B',
    marginTop: 12,
    marginBottom: 6,
  },
  createCourseDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
  },
});