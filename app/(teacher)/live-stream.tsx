import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Play, Plus, Users, Clock, Calendar, Video, Mic, MicOff, VideoOff } from 'lucide-react-native';

export default function TeacherLiveStream() {
  const [isLive, setIsLive] = useState(false);
  const [micEnabled, setMicEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);

  const upcomingStreams = [
    {
      id: 1,
      title: 'Advanced Calculus - Integration Techniques',
      subject: 'Mathematics',
      date: '2024-01-15',
      time: '14:00',
      duration: 60,
      expectedStudents: 45,
      status: 'scheduled',
    },
    {
      id: 2,
      title: 'Quantum Mechanics Fundamentals',
      subject: 'Physics',
      date: '2024-01-16',
      time: '10:30',
      duration: 90,
      expectedStudents: 38,
      status: 'scheduled',
    },
    {
      id: 3,
      title: 'Organic Chemistry Lab Session',
      subject: 'Chemistry',
      date: '2024-01-17',
      time: '15:00',
      duration: 120,
      expectedStudents: 42,
      status: 'scheduled',
    },
  ];

  const recentStreams = [
    {
      id: 1,
      title: 'Cell Division and Mitosis',
      subject: 'Biology',
      date: '2024-01-10',
      duration: 75,
      viewers: 49,
      recording: true,
    },
    {
      id: 2,
      title: 'Linear Algebra Review',
      subject: 'Mathematics',
      date: '2024-01-08',
      duration: 85,
      viewers: 43,
      recording: true,
    },
  ];

  const handleStartStream = () => {
    setIsLive(true);
  };

  const handleEndStream = () => {
    setIsLive(false);
  };

  if (isLive) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.liveStreamContainer}>
          <View style={styles.liveHeader}>
            <View style={styles.liveIndicator}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVE</Text>
            </View>
            <Text style={styles.viewerCount}>45 viewers</Text>
          </View>

          <View style={styles.videoContainer}>
            <Text style={styles.videoPlaceholder}>Live Video Stream</Text>
            <Text style={styles.streamTitle}>Advanced Calculus - Integration Techniques</Text>
          </View>

          <View style={styles.streamControls}>
            <TouchableOpacity
              style={[styles.controlButton, !micEnabled && styles.controlButtonDisabled]}
              onPress={() => setMicEnabled(!micEnabled)}
            >
              {micEnabled ? (
                <Mic color="#FFFFFF" size={24} />
              ) : (
                <MicOff color="#FFFFFF" size={24} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.controlButton, !videoEnabled && styles.controlButtonDisabled]}
              onPress={() => setVideoEnabled(!videoEnabled)}
            >
              {videoEnabled ? (
                <Video color="#FFFFFF" size={24} />
              ) : (
                <VideoOff color="#FFFFFF" size={24} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.controlButton, styles.endButton]}
              onPress={handleEndStream}
            >
              <Text style={styles.endButtonText}>End Stream</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.chatContainer}>
            <Text style={styles.chatTitle}>Live Chat</Text>
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
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Live Streaming</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus color="#FFFFFF" size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.quickStartContainer}>
          <Text style={styles.sectionTitle}>Quick Start</Text>
          <TouchableOpacity style={styles.quickStartCard} onPress={handleStartStream}>
            <Play color="#FFFFFF" size={32} />
            <Text style={styles.quickStartTitle}>Start Instant Stream</Text>
            <Text style={styles.quickStartDescription}>
              Begin streaming immediately for unscheduled sessions
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Streams</Text>
          <View style={styles.streamsContainer}>
            {upcomingStreams.map((stream) => (
              <View key={stream.id} style={styles.streamCard}>
                <View style={styles.streamHeader}>
                  <Text style={styles.streamTitle}>{stream.title}</Text>
                  <Text style={styles.streamSubject}>{stream.subject}</Text>
                </View>

                <View style={styles.streamMeta}>
                  <View style={styles.metaItem}>
                    <Calendar color="#64748B" size={16} />
                    <Text style={styles.metaText}>{stream.date}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Clock color="#64748B" size={16} />
                    <Text style={styles.metaText}>{stream.time} ({stream.duration}min)</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Users color="#64748B" size={16} />
                    <Text style={styles.metaText}>{stream.expectedStudents} expected</Text>
                  </View>
                </View>

                <View style={styles.streamActions}>
                  <TouchableOpacity style={styles.secondaryAction}>
                    <Text style={styles.secondaryActionText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.primaryAction} onPress={handleStartStream}>
                    <Play color="#FFFFFF" size={16} />
                    <Text style={styles.primaryActionText}>Start Stream</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Streams</Text>
          <View style={styles.streamsContainer}>
            {recentStreams.map((stream) => (
              <View key={stream.id} style={styles.streamCard}>
                <View style={styles.streamHeader}>
                  <Text style={styles.streamTitle}>{stream.title}</Text>
                  <Text style={styles.streamSubject}>{stream.subject}</Text>
                </View>

                <View style={styles.streamStats}>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Date</Text>
                    <Text style={styles.statValue}>{stream.date}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Duration</Text>
                    <Text style={styles.statValue}>{stream.duration}min</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Viewers</Text>
                    <Text style={styles.statValue}>{stream.viewers}</Text>
                  </View>
                </View>

                <View style={styles.streamActions}>
                  <TouchableOpacity style={styles.secondaryAction}>
                    <Text style={styles.secondaryActionText}>Analytics</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.primaryAction}>
                    <Text style={styles.primaryActionText}>View Recording</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
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
  scrollView: {
    flex: 1,
  },
  quickStartContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 16,
  },
  quickStartCard: {
    backgroundColor: '#2563EB',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
  },
  quickStartTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 8,
  },
  quickStartDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#E0E7FF',
    textAlign: 'center',
    lineHeight: 20,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  streamsContainer: {
    gap: 16,
  },
  streamCard: {
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
  streamHeader: {
    marginBottom: 16,
  },
  streamTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 4,
  },
  streamSubject: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  streamMeta: {
    gap: 12,
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  streamStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748B',
    marginBottom: 4,
  },
  statValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#1E293B',
  },
  streamActions: {
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
    backgroundColor: '#2563EB',
    gap: 6,
  },
  primaryActionText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  // Live Stream Styles
  liveStreamContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  liveHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1E293B',
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  liveText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#FFFFFF',
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
    marginBottom: 16,
  },
  streamControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1E293B',
    gap: 16,
  },
  controlButton: {
    backgroundColor: '#059669',
    borderRadius: 24,
    padding: 12,
  },
  controlButtonDisabled: {
    backgroundColor: '#EF4444',
  },
  endButton: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 20,
  },
  endButtonText: {
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
    padding: 16,
  },
  chatMessage: {
    marginBottom: 12,
  },
  chatUser: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#2563EB',
    marginBottom: 2,
  },
  chatText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#1E293B',
    lineHeight: 18,
  },
});