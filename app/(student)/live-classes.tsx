import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Play, Users, Clock, Calendar, Video, Mic, MicOff } from 'lucide-react-native';

export default function StudentLiveClasses() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('live');
  const [isInClass, setIsInClass] = useState(false);
  const [micEnabled, setMicEnabled] = useState(false);

  const liveClasses = [
    {
      id: 1,
      title: 'Advanced Calculus - Integration Techniques',
      instructor: 'Dr. Sarah Johnson',
      subject: 'Mathematics',
      startTime: '14:00',
      duration: 60,
      viewers: 45,
      status: 'live',
      canJoin: true,
    },
    {
      id: 2,
      title: 'Quantum Mechanics Fundamentals',
      instructor: 'Prof. Michael Chen',
      subject: 'Physics',
      startTime: '15:30',
      duration: 90,
      viewers: 38,
      status: 'starting-soon',
      canJoin: false,
    },
  ];

  const upcomingClasses = [
    {
      id: 3,
      title: 'Organic Chemistry Lab Session',
      instructor: 'Dr. Emily Davis',
      subject: 'Chemistry',
      date: '2024-01-16',
      time: '10:00',
      duration: 120,
      enrolled: 42,
    },
    {
      id: 4,
      title: 'Cell Division and Mitosis',
      instructor: 'Dr. Rachel Adams',
      subject: 'Biology',
      date: '2024-01-17',
      time: '11:30',
      duration: 75,
      enrolled: 51,
    },
    {
      id: 5,
      title: 'Statistics and Probability',
      instructor: 'Prof. David Wilson',
      subject: 'Mathematics',
      date: '2024-01-18',
      time: '14:00',
      duration: 60,
      enrolled: 35,
    },
  ];

  const recordedClasses = [
    {
      id: 5,
      title: 'Linear Algebra Review',
      instructor: 'Dr. Sarah Johnson',
      subject: 'Mathematics',
      date: '2024-01-10',
      duration: 85,
      views: 156,
    },
    {
      id: 6,
      title: 'Thermodynamics Principles',
      instructor: 'Prof. Michael Chen',
      subject: 'Physics',
      date: '2024-01-08',
      duration: 95,
      views: 134,
    },
  ];

  const tabs = [
    { id: 'live', title: 'Live Now', count: liveClasses.length },
    { id: 'upcoming', title: 'Upcoming', count: upcomingClasses.length },
    { id: 'recorded', title: 'Recorded', count: recordedClasses.length },
  ];

  const handleJoinClass = () => {
    setIsInClass(true);
  };

  const handleLeaveClass = () => {
    setIsInClass(false);
    setMicEnabled(false);
  };

  if (isInClass) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.liveClassContainer}>
          <View style={styles.liveHeader}>
            <View style={styles.liveInfo}>
              <View style={styles.liveIndicator}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>LIVE</Text>
              </View>
              <Text style={styles.classTitle}>Advanced Calculus - Integration Techniques</Text>
              <Text style={styles.instructor}>Dr. Sarah Johnson</Text>
            </View>
            <Text style={styles.viewerCount}>45 viewers</Text>
          </View>

          <View style={styles.videoContainer}>
            <Text style={styles.videoPlaceholder}>Live Video Stream</Text>
          </View>

          <View style={styles.studentControls}>
            <TouchableOpacity
              style={[styles.controlButton, micEnabled && styles.controlButtonActive]}
              onPress={() => setMicEnabled(!micEnabled)}
            >
              {micEnabled ? (
                <Mic color="#FFFFFF" size={20} />
              ) : (
                <MicOff color="#64748B" size={20} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.controlButton, styles.leaveButton]}
              onPress={handleLeaveClass}
            >
              <Text style={styles.leaveButtonText}>Leave Class</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.chatContainer}>
            <Text style={styles.chatTitle}>Class Chat</Text>
            <ScrollView style={styles.chatMessages}>
              <View style={styles.chatMessage}>
                <Text style={styles.chatUser}>Sarah M.</Text>
                <Text style={styles.chatText}>Can you explain the u-substitution method again?</Text>
              </View>
              <View style={styles.chatMessage}>
                <Text style={styles.chatUser}>Mike L.</Text>
                <Text style={styles.chatText}>Great explanation! This is very helpful.</Text>
              </View>
              <View style={styles.chatMessage}>
                <Text style={styles.chatUser}>Emma K.</Text>
                <Text style={styles.chatText}>What about integration by parts?</Text>
              </View>
            </ScrollView>
            <View style={styles.chatInput}>
              <TextInput
                style={styles.chatTextInput}
                placeholder="Type a message..."
                placeholderTextColor="#94A3B8"
              />
              <TouchableOpacity style={styles.sendButton}>
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Live Classes</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search color="#64748B" size={20} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search classes..."
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
        {activeTab === 'live' && (
          <View style={styles.classesContainer}>
            {liveClasses.map((liveClass) => (
              <View key={liveClass.id} style={styles.liveClassCard}>
                <View style={styles.liveClassHeader}>
                  <View style={styles.liveClassInfo}>
                    <Text style={styles.liveClassTitle}>{liveClass.title}</Text>
                    <Text style={styles.liveClassInstructor}>{liveClass.instructor}</Text>
                    <Text style={styles.liveClassSubject}>{liveClass.subject}</Text>
                  </View>
                  <View style={styles.liveStatusContainer}>
                    <View style={styles.liveIndicator}>
                      <View style={styles.liveDot} />
                      <Text style={styles.liveText}>LIVE</Text>
                    </View>
                    <View style={styles.viewersContainer}>
                      <Users color="#64748B" size={14} />
                      <Text style={styles.viewersText}>{liveClass.viewers}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.classMeta}>
                  <View style={styles.metaItem}>
                    <Clock color="#64748B" size={16} />
                    <Text style={styles.metaText}>Started at {liveClass.startTime}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Video color="#64748B" size={16} />
                    <Text style={styles.metaText}>{liveClass.duration} minutes</Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={[
                    styles.joinButton,
                    !liveClass.canJoin && styles.joinButtonDisabled
                  ]}
                  onPress={liveClass.canJoin ? handleJoinClass : undefined}
                  disabled={!liveClass.canJoin}
                >
                  <Play color="#FFFFFF" size={16} />
                  <Text style={styles.joinButtonText}>
                    {liveClass.canJoin ? 'Join Class' : 'Starting Soon'}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'upcoming' && (
          <View style={styles.classesContainer}>
            {upcomingClasses.map((upcomingClass) => (
              <View key={upcomingClass.id} style={styles.classCard}>
                <View style={styles.classHeader}>
                  <Text style={styles.classTitle}>{upcomingClass.title}</Text>
                  <Text style={styles.classInstructor}>{upcomingClass.instructor}</Text>
                  <Text style={styles.classSubject}>{upcomingClass.subject}</Text>
                </View>

                <View style={styles.classMeta}>
                  <View style={styles.metaItem}>
                    <Calendar color="#64748B" size={16} />
                    <Text style={styles.metaText}>{upcomingClass.date}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Clock color="#64748B" size={16} />
                    <Text style={styles.metaText}>{upcomingClass.time} • {upcomingClass.duration}min</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Users color="#64748B" size={16} />
                    <Text style={styles.metaText}>{upcomingClass.enrolled} enrolled</Text>
                  </View>
                </View>

                <View style={styles.classActions}>
                  <TouchableOpacity style={styles.secondaryAction}>
                    <Text style={styles.secondaryActionText}>Set Reminder</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.primaryAction}>
                    <Text style={styles.primaryActionText}>View Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'recorded' && (
          <View style={styles.classesContainer}>
            {recordedClasses.map((recordedClass) => (
              <View key={recordedClass.id} style={styles.classCard}>
                <View style={styles.classHeader}>
                  <Text style={styles.classTitle}>{recordedClass.title}</Text>
                  <Text style={styles.classInstructor}>{recordedClass.instructor}</Text>
                  <Text style={styles.classSubject}>{recordedClass.subject}</Text>
                </View>

                <View style={styles.classMeta}>
                  <View style={styles.metaItem}>
                    <Calendar color="#64748B" size={16} />
                    <Text style={styles.metaText}>Recorded on {recordedClass.date}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Clock color="#64748B" size={16} />
                    <Text style={styles.metaText}>{recordedClass.duration} minutes</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Play color="#64748B" size={16} />
                    <Text style={styles.metaText}>{recordedClass.views} views</Text>
                  </View>
                </View>

                <TouchableOpacity style={styles.playButton}>
                  <Play color="#FFFFFF" size={16} />
                  <Text style={styles.playButtonText}>Watch Recording</Text>
                </TouchableOpacity>
              </View>
            ))}
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
  classesContainer: {
    paddingHorizontal: 24,
    gap: 16,
  },
  liveClassCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  liveClassHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  liveClassInfo: {
    flex: 1,
  },
  liveClassTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 4,
  },
  liveClassInstructor: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#059669',
    marginBottom: 2,
  },
  liveClassSubject: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748B',
  },
  liveStatusContainer: {
    alignItems: 'flex-end',
    gap: 8,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#EF4444',
  },
  liveText: {
    fontFamily: 'Inter-Bold',
    fontSize: 10,
    color: '#EF4444',
  },
  viewersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewersText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748B',
  },
  classCard: {
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
  classHeader: {
    marginBottom: 16,
  },
  classTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 4,
  },
  classInstructor: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#059669',
    marginBottom: 2,
  },
  classSubject: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748B',
  },
  classMeta: {
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
  joinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EF4444',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 6,
  },
  joinButtonDisabled: {
    backgroundColor: '#94A3B8',
  },
  joinButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  classActions: {
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
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#059669',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 6,
  },
  playButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  // Live Class View Styles
  liveClassContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  liveHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
    backgroundColor: '#1E293B',
  },
  liveInfo: {
    flex: 1,
  },
  instructor: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#94A3B8',
  },
  viewerCount: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E293B',
  },
  videoPlaceholder: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#64748B',
  },
  studentControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1E293B',
    gap: 16,
  },
  controlButton: {
    backgroundColor: '#374151',
    borderRadius: 24,
    padding: 12,
  },
  controlButtonActive: {
    backgroundColor: '#059669',
  },
  leaveButton: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 20,
  },
  leaveButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  chatContainer: {
    height: 200,
    backgroundColor: '#F8FAFC',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  chatTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1E293B',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  chatMessages: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  chatMessage: {
    marginBottom: 12,
  },
  chatUser: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#059669',
    marginBottom: 2,
  },
  chatText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#1E293B',
    lineHeight: 18,
  },
  chatInput: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    gap: 12,
  },
  chatTextInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#1E293B',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sendButton: {
    backgroundColor: '#059669',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sendButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#FFFFFF',
  },
});