import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, globalStyles } from '../styles/globalStyles';

const HealthCard = ({ title, subtitle, emoji, color, completed, onPress }) => {
  return (
    <TouchableOpacity
      style={[globalStyles.card, styles.card, { borderLeftColor: color || COLORS.primary, borderLeftWidth: 4 }]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={globalStyles.row}>
        <Text style={styles.emoji}>{emoji}</Text>
        <View style={styles.textContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
            {completed ? <Text style={styles.checkmark}> ✅</Text> : null}
          </View>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        <Text style={styles.arrow}>›</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
  },
  emoji: {
    fontSize: 32,
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  checkmark: {
    fontSize: 14,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textLight,
    marginTop: 2,
  },
  arrow: {
    fontSize: 22,
    color: COLORS.textLight,
  },
});

export default HealthCard;
