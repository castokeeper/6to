import React, { useState, useMemo } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors, Typography, BorderRadius, Spacing, Shadows } from '@/constants/theme';
import { CAREERS, CATEGORIES, Career } from '@/data/careers';
import CareerCard from '@/components/CareerCard';
import SearchBar from '@/components/SearchBar';

export default function HomeScreen(): React.JSX.Element {
    const [search, setSearch] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const filteredCareers = useMemo((): Career[] => {
        return CAREERS.filter((career: Career) => {
            const matchesSearch = career.name.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || career.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [search, selectedCategory]);

    const handleCareerPress = (career: Career): void => {
        router.push({ pathname: '/detail', params: { id: career.id } });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Bienvenido</Text>
                        <Text style={styles.headerTitle}>Oferta Académica</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.profileButton}
                        onPress={() => router.push('/profile')}
                    >
                        <Ionicons name="person-circle-outline" size={36} color={Colors.primary} />
                    </TouchableOpacity>
                </View>

                {/* Barra de búsqueda */}
                <SearchBar value={search} onChangeText={setSearch} />

                {/* Categorías */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.categoriesScroll}
                    contentContainerStyle={styles.categoriesContent}
                >
                    {CATEGORIES.map((cat) => {
                        const isActive = selectedCategory === cat.id;
                        return (
                            <TouchableOpacity
                                key={cat.id}
                                style={[
                                    styles.categoryChip,
                                    isActive && styles.categoryChipActive,
                                ]}
                                onPress={() => setSelectedCategory(cat.id)}
                                activeOpacity={0.8}
                            >
                                <Ionicons
                                    name={cat.icon as keyof typeof Ionicons.glyphMap}
                                    size={18}
                                    color={isActive ? Colors.textOnPrimary : Colors.textSecondary}
                                />
                                <Text
                                    style={[
                                        styles.categoryLabel,
                                        isActive && styles.categoryLabelActive,
                                    ]}
                                >
                                    {cat.label}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

                {/* Listado de carreras */}
                <FlatList
                    data={filteredCareers}
                    keyExtractor={(item: Career) => item.id}
                    renderItem={({ item }: { item: Career }) => (
                        <CareerCard career={item} onPress={handleCareerPress} />
                    )}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Ionicons name="search" size={48} color={Colors.textMuted} />
                            <Text style={styles.emptyText}>No se encontraron carreras</Text>
                        </View>
                    }
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    container: {
        flex: 1,
        paddingHorizontal: Spacing.xl,
        paddingTop: Spacing.md,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.xl,
    },
    greeting: {
        ...Typography.bodySmall,
        color: Colors.textMuted,
    },
    headerTitle: {
        ...Typography.h1,
    },
    profileButton: {
        padding: Spacing.xs,
    },
    categoriesScroll: {
        flexShrink: 0,
        marginBottom: Spacing.lg,
    },
    categoriesContent: {
        gap: Spacing.sm,
    },
    categoryChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
        paddingHorizontal: Spacing.xl,
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.full,
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    categoryChipActive: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    categoryLabel: {
        ...Typography.buttonSmall,
        color: Colors.textSecondary,
    },
    categoryLabelActive: {
        color: Colors.textOnPrimary,
    },
    listContent: {
        paddingBottom: Spacing.xxxl,
    },
    emptyContainer: {
        alignItems: 'center',
        paddingTop: Spacing.xxxl,
        gap: Spacing.md,
    },
    emptyText: {
        ...Typography.body,
        color: Colors.textMuted,
    },
});
