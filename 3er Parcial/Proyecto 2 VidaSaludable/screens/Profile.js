import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Header from '../components/Header';
import StatsRow from '../components/StatsRow';
import CustomButton from '../components/CustomButton';
import { COLORS, globalStyles } from '../styles/globalStyles';
import { USER_DATA } from '../data/mockData';

const Profile = ({ navigation }) => {
  const [waterCount, setWaterCount] = useState(USER_DATA.stats.water);

  const addWater = () => {
    if (waterCount >= USER_DATA.stats.waterGoal) {
      Alert.alert('¡Meta alcanzada!', 'Ya completaste tu meta de agua del día. 💧');
      return;
    }
    setWaterCount((prev) => prev + 1);
  };

  const removeWater = () => {
    if (waterCount <= 0) return;
    setWaterCount((prev) => prev - 1);
  };

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que deseas salir?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Salir', style: 'destructive', onPress: () => navigation.replace('Login') },
      ]
    );
  };

  return (
    <View className="flex-1 bg-bg">
      <StatusBar style="light" />
      <Header title="Mi Perfil" showBack navigation={navigation} />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="items-center bg-surface mx-4 mt-4 rounded-2xl p-6" style={globalStyles.shadow}>
          <View className="w-20 h-20 rounded-full bg-primary/20 items-center justify-center mb-4">
            <Text className="text-4xl">{USER_DATA.avatar}</Text>
          </View>
          <Text className="text-[22px] font-bold text-txt">{USER_DATA.name}</Text>
          <Text className="text-sm text-txt-secondary mt-1">{USER_DATA.email}</Text>
        </View>

        <View className="mt-6 px-4">
          <Text className="text-xl font-bold text-txt mb-4">Progreso del Día</Text>
          <StatsRow
            label="Calorías"
            value={USER_DATA.stats.calories}
            goal={USER_DATA.stats.caloriesGoal}
            unit="cal"
            icon="🔥"
            color="#EF4444"
          />
          <StatsRow
            label="Ejercicio"
            value={USER_DATA.stats.exercise}
            goal={USER_DATA.stats.exerciseGoal}
            unit="min"
            icon="🏋️"
            color="#3B82F6"
          />
          <StatsRow
            label="Sueño"
            value={USER_DATA.stats.sleep}
            goal={USER_DATA.stats.sleepGoal}
            unit="hrs"
            icon="😴"
            color="#8B5CF6"
          />
        </View>

        <View className="mt-6 px-4">
          <Text className="text-xl font-bold text-txt mb-4">Contador de Agua 💧</Text>
          <View className="bg-surface rounded-2xl p-6 items-center" style={globalStyles.shadow}>
            <View className="flex-row items-baseline mb-4">
              <Text className="text-5xl font-extrabold text-primary">{waterCount}</Text>
              <Text className="text-lg text-txt-secondary ml-1">/ {USER_DATA.stats.waterGoal} vasos</Text>
            </View>

            <View className="flex-row flex-wrap justify-center mb-4">
              {Array.from({ length: USER_DATA.stats.waterGoal }).map((_, i) => (
                <Text
                  key={i}
                  className={`text-2xl m-1 ${i < waterCount ? 'opacity-100' : 'opacity-25'}`}
                >
                  💧
                </Text>
              ))}
            </View>

            <View className="flex-row justify-center">
              <TouchableOpacity
                className="w-12 h-12 rounded-full bg-gray-200 items-center justify-center mx-4"
                onPress={removeWater}
              >
                <Text className="text-[28px] font-bold text-txt-secondary">−</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="w-12 h-12 rounded-full bg-primary items-center justify-center mx-4"
                onPress={addWater}
              >
                <Text className="text-[28px] font-bold text-white">+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <CustomButton
          title="Cerrar Sesión"
          onPress={handleLogout}
          color={COLORS.error}
          style={{ marginHorizontal: 16, marginTop: 24 }}
        />

        <View className="h-10" />
      </ScrollView>
    </View>
  );
};

export default Profile;
