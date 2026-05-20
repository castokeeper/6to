import React, { useState } from 'react';
import { View, Text, FlatList, Alert, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import { COLORS, globalStyles } from '../styles/globalStyles';

const Routine = ({ route, navigation }) => {
  const { routine } = route.params;
  const [completedExercises, setCompletedExercises] = useState({});
  const insets = useSafeAreaInsets();

  const toggleExercise = (id) => {
    setCompletedExercises((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(completedExercises).filter(Boolean).length;
  const totalCount = routine.exercises.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const handleFinish = () => {
    if (completedCount < totalCount) {
      Alert.alert(
        'Rutina incompleta',
        `Te faltan ${totalCount - completedCount} ejercicios. ¿Deseas finalizar de todos modos?`,
        [
          { text: 'Continuar', style: 'cancel' },
          { text: 'Finalizar', onPress: () => navigation.goBack() },
        ]
      );
    } else {
      Alert.alert('¡Felicidades! 🎉', 'Has completado toda la rutina.', [
        { text: 'Aceptar', onPress: () => navigation.goBack() },
      ]);
    }
  };

  const renderExercise = ({ item }) => {
    const isDone = !!completedExercises[item.id];
    return (
      <TouchableOpacity
        className={`flex-row items-center rounded-xl p-4 mb-2 ${
          isDone ? 'bg-success/10 border border-success/30' : 'bg-surface'
        }`}
        style={!isDone ? globalStyles.shadowSm : {}}
        onPress={() => toggleExercise(item.id)}
        activeOpacity={0.7}
      >
        <View
          className={`w-7 h-7 rounded-full border-2 items-center justify-center mr-4 ${
            isDone ? 'bg-success border-success' : 'border-gray-200'
          }`}
        >
          {isDone && <Text className="text-white text-sm font-bold">✓</Text>}
        </View>
        <View className="flex-1">
          <Text
            className={`text-[15px] font-semibold ${
              isDone ? 'line-through text-txt-secondary' : 'text-txt'
            }`}
          >
            {item.name}
          </Text>
          <Text className="text-[13px] text-txt-secondary mt-0.5">
            {item.duration} · {item.sets} series · {item.reps} reps
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-bg">
      <StatusBar style="light" />
      <Header title="Rutina" showBack navigation={navigation} />

      <View className="flex-row items-center bg-surface m-4 rounded-2xl p-4" style={globalStyles.shadow}>
        <Text className="text-[44px] mr-4">{routine.icon}</Text>
        <View className="flex-1">
          <Text className="text-[22px] font-bold text-txt" numberOfLines={2}>{routine.name}</Text>
          <Text className="text-sm text-txt-secondary mt-1">
            {routine.duration} · {routine.category}
          </Text>
        </View>
      </View>

      <View className="mx-4 mb-4">
        <View className="flex-row justify-between mb-1">
          <Text className="text-sm font-semibold text-txt">Progreso</Text>
          <Text className="text-sm font-bold text-primary">
            {completedCount}/{totalCount}
          </Text>
        </View>
        <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <View
            className="h-full bg-primary rounded-full"
            style={{ width: `${progress}%` }}
          />
        </View>
      </View>

      <Text className="text-sm text-txt-secondary leading-relaxed mx-4 mb-4">
        {routine.description}
      </Text>

      <FlatList
        data={routine.exercises}
        keyExtractor={(item) => item.id}
        renderItem={renderExercise}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
      />

      <View className="p-4 bg-bg" style={{ paddingBottom: Math.max(insets.bottom, 8) + 8 }}>
        <CustomButton
          title={completedCount === totalCount ? '✓ Rutina completada' : 'Finalizar rutina'}
          onPress={handleFinish}
          color={completedCount === totalCount ? COLORS.success : COLORS.primary}
        />
      </View>
    </View>
  );
};

export default Routine;
