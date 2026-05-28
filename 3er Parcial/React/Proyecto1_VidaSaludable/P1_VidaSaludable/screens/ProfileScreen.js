import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import { COLORS, globalStyles } from '../styles/globalStyles';
import { useHealth } from '../context/HealthContext';

const GOAL_WATER = 8;

const ProfileScreen = ({ navigation }) => {
  const { waterCount, completedToday, addWater, removeWater, resetDay } = useHealth();

  const handleAddWater = () => {
    if (waterCount < GOAL_WATER) {
      addWater(GOAL_WATER);
    } else {
      Alert.alert('🎉 ¡Meta alcanzada!', 'Ya bebiste tus 8 vasos de agua hoy. ¡Excelente hábito!');
    }
  };

  const handleResetDay = () => {
    Alert.alert('Reiniciar día', '¿Deseas reiniciar el progreso del día?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Reiniciar', style: 'destructive', onPress: () => { resetDay(); } },
    ]);
  };

  const waterProgress = waterCount / GOAL_WATER;

  return (
    <ScrollView style={globalStyles.container} contentContainerStyle={styles.content}>
      {/* Avatar */}
      <View style={styles.avatarSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarEmoji}>🧑</Text>
        </View>
        <Text style={styles.name}>Usuario VidaSana</Text>
        <Text style={styles.email}>usuario@vidasana.com</Text>
      </View>

      {/* Water Tracker */}
      <View style={[globalStyles.card, styles.section]}>
        <Text style={styles.sectionTitle}>💧 Hidratación diaria</Text>
        <Text style={styles.sectionSub}>Meta: {GOAL_WATER} vasos por día</Text>

        {/* Progress bar */}
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${waterProgress * 100}%` }]} />
        </View>
        <Text style={styles.progressLabel}>{waterCount} / {GOAL_WATER} vasos</Text>

        {/* Water glasses visual */}
        <View style={styles.glasses}>
          {Array.from({ length: GOAL_WATER }).map((_, i) => (
            <Text key={i} style={[styles.glass, i < waterCount && styles.glassFilled]}>
              🥤
            </Text>
          ))}
        </View>

        <View style={globalStyles.row}>
          <TouchableOpacity style={styles.counterBtn} onPress={removeWater}>
            <Text style={styles.counterBtnText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.counterNum}>{waterCount}</Text>
          <TouchableOpacity style={[styles.counterBtn, styles.counterBtnAdd]} onPress={handleAddWater}>
            <Text style={[styles.counterBtnText, { color: '#fff' }]}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats */}
      <View style={[globalStyles.card, styles.section]}>
        <Text style={styles.sectionTitle}>📊 Estadísticas de hoy</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>{completedToday.length}</Text>
            <Text style={styles.statLabel}>Completados</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: COLORS.food + '20' }]}>
            <Text style={styles.statNum}>🔥</Text>
            <Text style={styles.statLabel}>Activo</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: COLORS.water + '20' }]}>
            <Text style={styles.statNum}>{waterCount}</Text>
            <Text style={styles.statLabel}>Vasos agua</Text>
          </View>
        </View>
      </View>

      {/* Completed Today */}
      <View style={[globalStyles.card, styles.section]}>
        <Text style={styles.sectionTitle}>✅ Completados hoy</Text>
        {completedToday.length === 0 ? (
          <Text style={styles.emptyText}>Nada completado aún. ¡Ánimo!</Text>
        ) : (
          completedToday.map((item, i) => (
            <View key={i} style={styles.completedItem}>
              <Text style={styles.checkmark}>✅</Text>
              <Text style={styles.completedText}>{item}</Text>
            </View>
          ))
        )}
      </View>

      <CustomButton
        title="🔄 Reiniciar día"
        onPress={handleResetDay}
        color={COLORS.danger}
        style={styles.resetBtn}
      />

      <CustomButton
        title="← Cerrar sesión"
        onPress={() => navigation.replace('Login')}
        color="transparent"
        textColor={COLORS.textLight}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingBottom: 40,
  },
  avatarSection: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingTop: 60,
    paddingBottom: 32,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarEmoji: {
    fontSize: 48,
  },
  name: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
  },
  email: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  section: {
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 4,
  },
  sectionSub: {
    fontSize: 13,
    color: COLORS.textLight,
    marginBottom: 14,
  },
  progressBar: {
    height: 10,
    backgroundColor: COLORS.border,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.water,
    borderRadius: 5,
  },
  progressLabel: {
    fontSize: 13,
    color: COLORS.textLight,
    textAlign: 'right',
    marginBottom: 14,
  },
  glasses: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    gap: 4,
  },
  glass: {
    fontSize: 26,
    opacity: 0.3,
  },
  glassFilled: {
    opacity: 1,
  },
  counterBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterBtnAdd: {
    backgroundColor: COLORS.water,
  },
  counterBtnText: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
  },
  counterNum: {
    flex: 1,
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.water,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    gap: 8,
  },
  statBox: {
    flex: 1,
    backgroundColor: COLORS.primary + '20',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  statNum: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.text,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 4,
    textAlign: 'center',
  },
  completedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  checkmark: {
    fontSize: 18,
    marginRight: 10,
  },
  completedText: {
    fontSize: 14,
    color: COLORS.text,
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.textLight,
    fontStyle: 'italic',
  },
  resetBtn: {
    marginHorizontal: 16,
  },
});

export default ProfileScreen;
