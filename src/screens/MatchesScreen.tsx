import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';

interface MatchItem {
  id: string;
  name: string;
  age: number;
  lastMessage: string;
  timeAgo: string;
  avatar: string;
  unread: boolean;
}

const mockMatches: MatchItem[] = [
  {
    id: '1',
    name: 'Sarah',
    age: 25,
    lastMessage: 'Loved your voice intro 💜',
    timeAgo: '2m',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200',
    unread: true,
  },
  {
    id: '2',
    name: 'Mike',
    age: 28,
    lastMessage: "So when's coffee? ☕",
    timeAgo: '1h',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    unread: false,
  },
];

const MatchesScreen: React.FC = () => {
  const renderItem = ({ item }: { item: MatchItem }) => (
    <TouchableOpacity style={styles.row}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.rowContent}>
        <View style={styles.rowHeader}>
          <Text style={styles.name}>
            {item.name}, {item.age}
          </Text>
          <Text style={styles.time}>{item.timeAgo}</Text>
        </View>
        <View style={styles.messageRow}>
          <Text
            style={[styles.lastMessage, item.unread && styles.lastMessageUnread]}
            numberOfLines={1}
          >
            {item.lastMessage}
          </Text>
          {item.unread && <View style={styles.unreadDot} />}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Matches</Text>
      <FlatList
        data={mockMatches}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 12,
    marginBottom: 8,
  },
  listContent: {
    paddingVertical: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 12,
  },
  rowContent: {
    flex: 1,
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  time: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: colors.textSecondary,
    flex: 1,
  },
  lastMessageUnread: {
    color: colors.textPrimary,
    fontWeight: '500',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent,
    marginLeft: 6,
  },
});

export default MatchesScreen;
