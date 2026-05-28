import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Modal,
  TouchableOpacity, Alert,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import { COLORS, globalStyles } from '../styles/globalStyles';
import { useHealth } from '../context/HealthContext';

const DetailsScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const { completedToday, completeItem } = useHealth();

  const completed = completedToday.includes(item.title);

  const handleComplete = () => {
    setModalVisible(true);
  };

  const confirmComplete = () => {
    setModalVisible(false);
    completeItem(item.title);
    Alert.alert(
      '¡Excelente! 🎉',
      `Has completado "${item.title}". ¡Sigue así!`,
      [{ text: 'Continuar', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <ScrollView style={globalStyles.container} contentContainerStyle={styles.content}>
      {/* Hero */}
      <View style={[styles.hero, { backgroundColor: item.color }]}>
        <Text style={styles.heroEmoji}>{item.emoji}</Text>
        <Text style={styles.heroTitle}>{item.title}</Text>
        <View style={styles.heroBadges}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>⏱ {item.duration}</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>📊 {item.level}</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>🔥 {item.calories} kcal</Text>
          </View>
        </View>
      </View>

      {/* Description */}
      <View style={globalStyles.card}>
        <Text style={styles.sectionTitle}>Descripción</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>

      {/* Ingredients / Equipment */}
      <View style={globalStyles.card}>
        <Text style={styles.sectionTitle}>
          {item.type === 'recipe' ? '🛒 Ingredientes' : '🎒 Necesitas'}
        </Text>
        {item.ingredients.map((ing, index) => (
          <View key={index} style={styles.ingredientRow}>
            <View style={[styles.dot, { backgroundColor: item.color }]} />
            <Text style={styles.ingredientText}>{ing}</Text>
          </View>
        ))}
      </View>

      {/* Complete Button */}
      <CustomButton
        title={completed ? '✅ Completado' : `Marcar como completado`}
        onPress={handleComplete}
        color={completed ? COLORS.secondary : item.color}
        disabled={completed}
        style={styles.completeBtn}
      />

      {/* Confirmation Modal */}
      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalEmoji}>{item.emoji}</Text>
            <Text style={styles.modalTitle}>¿Confirmas?</Text>
            <Text style={styles.modalBody}>
              ¿Completaste "{item.title}"? Se registrará en tu progreso.
            </Text>
            <CustomButton
              title="Sí, lo completé 💪"
              onPress={confirmComplete}
              color={item.color}
            />
            <CustomButton
              title="Cancelar"
              onPress={() => setModalVisible(false)}
              color="transparent"
              textColor={COLORS.textLight}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingBottom: 40,
  },
  hero: {
    padding: 32,
    alignItems: 'center',
    paddingTop: 60,
  },
  heroEmoji: {
    fontSize: 64,
    marginBottom: 12,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
  heroBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    color: COLORS.textLight,
    lineHeight: 22,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  ingredientText: {
    fontSize: 15,
    color: COLORS.text,
  },
  completeBtn: {
    marginHorizontal: 16,
    marginTop: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 28,
    width: '100%',
    alignItems: 'center',
  },
  modalEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 8,
  },
  modalBody: {
    fontSize: 15,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
});

export default DetailsScreen;
