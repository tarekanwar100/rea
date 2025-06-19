import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Play, Clock, Users, BookOpen, Star, Filter } from 'lucide-react-native';

export default function StudentCourses() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const courses = [
    {
      id: 1,
      title: 'Advanced Mathematics',
      instructor: 'Dr. Sarah Johnson',
      progress: 75,
      rating: 4.8,
      students: 248,
      lessons: 24,
      duration: '16h 30m',
      level: 'Advanced',
      enrolled: true,
      image: 'https://images.pexels.com/photos/6256065/pexels-photo-6256065.jpeg?auto=compress&cs=tinysrgb&w=400',
      color: '#2563EB',
    },
    {
      id: 2,
      title: 'Modern Physics',
      instructor: 'Prof. Michael Chen',
      progress: 60,
      rating: 4.9,
      students: 189,
      lessons: 18,
      duration: '12h 45m',
      level: 'Intermediate',
      enrolled: true,
      image: 'https://images.pexels.com/photos/8471904/pexels-photo-8471904.jpeg?auto=compress&cs=tinysrgb&w=400',
      color: '#059669',
    },
    {
      id: 3,
      title: 'Organic Chemistry',
      instructor: 'Dr. Emily Davis',
      progress: 45,
      rating: 4.7,
      students: 156,
      lessons: 20,
      duration: '14h 20m',
      level: 'Advanced',
      enrolled: true,
      image: 'https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=400',
      color: '#EA580C',
    },
    {
      id: 4,
      title: 'Cell Biology',
      instructor: 'Dr. Rachel Adams',
      progress: 80,
      rating: 4.6,
      students: 203,
      lessons: 22,
      duration: '15h 10m',
      level: 'Intermediate',
      enrolled: true,
      image: 'https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=400',
      color: '#7C3AED',
    },
    {
      id: 5,
      title: 'Statistics & Probability',
      instructor: 'Prof. David Wilson',
      progress: 0,
      rating: 4.5,
      students: 167,
      lessons: 16,
      duration: '11h 30m',
      level: 'Beginner',
      enrolled: false,
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400',
      color: '#DC2626',
    },
  ];

  const filters = [
    { id: 'all', label: 'All Courses' },
    { id: 'enrolled', label: 'Enrolled' },
    { id: 'available', label: 'Available' },
    { id: 'completed', label: 'Completed' },
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesFilter = true;
    if (activeFilter === 'enrolled') matchesFilter = course.enrolled;
    if (activeFilter === 'available') matchesFilter = !course.enrolled;
    if (activeFilter === 'completed') matchesFilter = course.progress === 100;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Courses</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter color="#64748B" size={20} />
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

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
        <View style={styles.filters}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[styles.filterChip, activeFilter === filter.id && styles.activeFilterChip]}
              onPress={() => setActiveFilter(filter.id)}
            >
              <Text style={[styles.filterText, activeFilter === filter.id && styles.activeFilterText]}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.coursesContainer}>
          {filteredCourses.map((course) => (
            <TouchableOpacity key={course.id} style={styles.courseCard}>
              <Image source={{ uri: course.image }} style={styles.courseImage} />
              
              <View style={styles.courseContent}>
                <View style={styles.courseHeader}>
                  <Text style={styles.courseTitle}>{course.title}</Text>
                  <View style={styles.ratingContainer}>
                    <Star color="#F59E0B" size={14} fill="#F59E0B" />
                    <Text style={styles.rating}>{course.rating}</Text>
                  </View>
                </View>

                <Text style={styles.instructor}>{course.instructor}</Text>

                <View style={styles.courseStats}>
                  <View style={styles.stat}>
                    <BookOpen color="#64748B" size={14} />
                    <Text style={styles.statText}>{course.lessons} lessons</Text>
                  </View>
                  <View style={styles.stat}>
                    <Clock color="#64748B" size={14} />
                    <Text style={styles.statText}>{course.duration}</Text>
                  </View>
                  <View style={styles.stat}>
                    <Users color="#64748B" size={14} />
                    <Text style={styles.statText}>{course.students} students</Text>
                  </View>
                </View>

                <View style={styles.levelContainer}>
                  <View style={[
                    styles.levelBadge,
                    {
                      backgroundColor:
                        course.level === 'Beginner' ? '#DCFCE7' :
                        course.level === 'Intermediate' ? '#FEF3C7' : '#FEE2E2'
                    }
                  ]}>
                    <Text style={[
                      styles.levelText,
                      {
                        color:
                          course.level === 'Beginner' ? '#059669' :
                          course.level === 'Intermediate' ? '#D97706' : '#DC2626'
                      }
                    ]}>
                      {course.level}
                    </Text>
                  </View>
                </View>

                {course.enrolled && (
                  <View style={styles.progressContainer}>
                    <View style={styles.progressHeader}>
                      <Text style={styles.progressLabel}>Progress</Text>
                      <Text style={styles.progressPercentage}>{course.progress}%</Text>
                    </View>
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
                  </View>
                )}

                <View style={styles.courseActions}>
                  {course.enrolled ? (
                    <>
                      <TouchableOpacity
                        style={[styles.primaryAction, { backgroundColor: course.color }]}
                      >
                        <Play color="#FFFFFF" size={16} />
                        <Text style={styles.primaryActionText}>Continue</Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <TouchableOpacity style={styles.secondaryAction}>
                        <Text style={styles.secondaryActionText}>Preview</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.primaryAction}>
                        <Text style={styles.primaryActionText}>Enroll</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.exploreContainer}>
          <Text style={styles.exploreTitle}>Explore More Courses</Text>
          <Text style={styles.exploreDescription}>
            Discover new subjects and expand your knowledge
          </Text>
          <TouchableOpacity style={styles.exploreButton}>
            <Text style={styles.exploreButtonText}>Browse All Courses</Text>
          </TouchableOpacity>
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
  filterButton: {
    padding: 8,
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
  filtersContainer: {
    marginBottom: 16,
  },
  filters: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  activeFilterChip: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  filterText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#64748B',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  coursesContainer: {
    paddingHorizontal: 24,
    gap: 16,
  },
  courseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
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
  courseImage: {
    width: '100%',
    height: 160,
  },
  courseContent: {
    padding: 20,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  courseTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#1E293B',
    flex: 1,
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#64748B',
  },
  instructor: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
    marginBottom: 12,
  },
  courseStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748B',
  },
  levelContainer: {
    marginBottom: 16,
  },
  levelBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  levelText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#64748B',
  },
  progressPercentage: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#1E293B',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#F1F5F9',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  courseActions: {
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#059669',
    gap: 6,
  },
  primaryActionText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  exploreContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    marginHorizontal: 24,
    marginVertical: 24,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
  },
  exploreTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 8,
  },
  exploreDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  exploreButton: {
    backgroundColor: '#059669',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  exploreButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
});