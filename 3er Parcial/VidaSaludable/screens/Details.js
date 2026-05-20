import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, Modal, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import { COLORS, globalStyles } from '../styles/globalStyles';

const Details = ({ route, navigation }) => {
  const { item, type } = route.params;
  const [completed, setCompleted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const insets = useSafeAreaInsets();

  const handleComplete = () => {
    setCompleted(true);
    setModalVisible(true);
  };

  const isRecipe = type === 'recipe';

  return (
    <View className="flex-1 bg-bg">
      <StatusBar style="light" />
      <Header title={isRecipe ? 'Receta' : 'Ejercicio'} showBack navigation={navigation} />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 16 }}
      >
        <View className="h-[180px] bg-primary/15 items-center justify-center">
          <Text className="text-[70px]">{item.icon}</Text>
          <View className="absolute bottom-4 right-4 bg-primary rounded-full px-4 py-1">
            <Text className="text-white text-xs font-semibold">
              {isRecipe ? item.difficulty : item.category}
            </Text>
          </View>
        </View>

        <View className="p-4">
          <Text className="text-[26px] font-extrabold text-txt mb-2">{item.name}</Text>

          <View className="flex-row flex-wrap mb-4">
            <View className="flex-row items-center mr-6 mb-1">
              <Text className="text-base mr-1">⏱</Text>
              <Text className="text-sm text-txt-secondary font-medium">{isRecipe ? item.time : item.duration}</Text>
            </View>
            {isRecipe && (
              <View className="flex-row items-center mr-6 mb-1">
                <Text className="text-base mr-1">🔥</Text>
                <Text className="text-sm text-txt-secondary font-medium">{item.calories} cal</Text>
              </View>
            )}
            <View className="flex-row items-center mr-6 mb-1">
              <Text className="text-base mr-1">📂</Text>
              <Text className="text-sm text-txt-secondary font-medium">{item.category}</Text>
            </View>
          </View>

          <Text className="text-[15px] text-txt-secondary leading-relaxed mb-6">
            {item.description}
          </Text>

          <Text className="text-lg font-bold text-txt mb-4 mt-2">
            {isRecipe ? 'Ingredientes' : 'Ejercicios'}
          </Text>
          {isRecipe
            ? item.ingredients.map((ing, i) => (
                <View key={i} className="flex-row items-center mb-2">
                  <Text className="text-lg text-primary mr-2">•</Text>
                  <Text className="text-[15px] text-txt flex-1">{ing}</Text>
                </View>
              ))
            : item.exercises?.map((ex) => (
                <View key={ex.id} className="flex-row items-center bg-surface rounded-xl p-4 mb-2" style={globalStyles.shadowSm}>
                  <View className="w-2.5 h-2.5 rounded-full bg-primary mr-4" />
                  <View className="flex-1">
                    <Text className="text-[15px] font-semibold text-txt">{ex.name}</Text>
                    <Text className="text-[13px] text-txt-secondary mt-0.5">
                      {ex.duration} · {ex.sets} series · {ex.reps} reps
                    </Text>
                  </View>
                </View>
              ))}

          {isRecipe && (
            <>
              <Text className="text-lg font-bold text-txt mb-4 mt-2">Preparación</Text>
              {item.steps.map((step, i) => (
                <View key={i} className="flex-row items-start mb-4">
                  <View className="w-7 h-7 rounded-full bg-primary items-center justify-center mr-4">
                    <Text className="text-white font-bold text-sm">{i + 1}</Text>
                  </View>
                  <Text className="flex-1 text-[15px] text-txt leading-relaxed pt-[3px]">{step}</Text>
                </View>
              ))}
            </>
          )}

          <CustomButton
            title={completed ? '✓ Completado' : 'Marcar como completado'}
            onPress={handleComplete}
            color={completed ? COLORS.success : COLORS.primary}
            style={{ marginTop: 24, marginBottom: 16 }}
          />
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center p-6">
          <View className="bg-surface rounded-[24px] p-8 items-center w-full max-w-[320px]">
            <Text className="text-[60px] mb-4">🎉</Text>
            <Text className="text-2xl font-extrabold text-txt mb-2">¡Buen trabajo!</Text>
            <Text className="text-[15px] text-txt-secondary text-center mb-6 leading-relaxed">
              Has completado "{item.name}" exitosamente.
            </Text>
            <CustomButton
              title="Continuar"
              onPress={() => setModalVisible(false)}
              style={{ width: '100%' }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Details;
