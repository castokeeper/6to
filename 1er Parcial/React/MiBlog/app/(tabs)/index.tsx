import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function BlogScreen() {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(42);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <View style={styles.rootContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#0f0c29" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ═══════════════ HEADER ═══════════════ */}
        <View style={styles.headerWrapper}>
          <LinearGradient
            colors={['#0f0c29', '#302b63', '#24243e']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerGradient}
          >
            <Text style={styles.headerName}>Edgar Venegas - Mi Blog|</Text>
            <View style={styles.headerDivider} />
            <Text style={styles.headerSubtitle}>
              Programación — CETIS 120
            </Text>
          </LinearGradient>
        </View>

        {/* ═══════════════ HERO IMAGE ═══════════════ */}
        <View style={styles.imageCard}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1593152167544-085d3b9c4938?w=900&q=80',
            }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.imageOverlay}>
            <Text style={styles.imageCaption}>PC Gaming & Hardware</Text>
          </View>
        </View>

        {/* ═══════════════ BLOG BODY ═══════════════ */}
        <View style={styles.bodyContainer}>
          {/* Post meta */}
          <View style={styles.postMeta}>
            <View style={styles.authorRow}>
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>🎮</Text>
              </View>
              <View>
                <Text style={styles.authorName}>Tech Enthusiast</Text>
                <Text style={styles.postDate}>18 de febrero, 2026</Text>
              </View>
            </View>
          </View>

          <Text style={styles.articleTitle}>
            La Pasión por el Hardware y el Gaming de Alto Rendimiento
          </Text>

          {/* Paragraph 1 */}
          <Text style={styles.paragraph}>
            El mundo del hardware de PC y el gaming de alto rendimiento es mucho
            más que un simple pasatiempo: es una pasión que combina el
            conocimiento técnico con la creatividad y la búsqueda constante de
            la excelencia. Desde la cuidadosa selección de un procesador capaz
            de manejar cargas de trabajo intensivas, hasta la elección de una
            tarjeta gráfica que pueda renderizar millones de polígonos por
            segundo, cada componente en una PC gaming cuenta una historia de
            ingeniería y precisión. La experiencia de ensamblar una
            computadora desde cero, conectar cada cable, aplicar la pasta
            térmica con la cantidad exacta y escuchar por primera vez el
            arranque exitoso del sistema, es una sensación que no se compara
            con ninguna otra. Es en ese momento donde la teoría se transforma
            en realidad, y donde el rendimiento gráfico en títulos como Final
            Fantasy XIII cobra vida con sus paisajes de Cocoon y sus efectos
            de iluminación que empujan los límites del hardware moderno.
          </Text>

          {/* Paragraph 2 */}
          <Text style={styles.paragraph}>
            Por otro lado, el desarrollo de software complementa esta pasión
            de una manera extraordinaria. Comprender cómo funcionan los drivers
            de GPU, cómo un motor gráfico optimiza el uso de la memoria VRAM,
            o cómo los shaders transforman coordenadas matemáticas en escenas
            fotorrealistas, añade una capa de apreciación que va más allá de
            simplemente jugar. Las consolas como la PlayStation 5 también
            representan un hito en la evolución tecnológica, con su SSD
            personalizado que elimina prácticamente los tiempos de carga y su
            arquitectura de audio 3D Tempest Engine que crea experiencias
            inmersivas sin precedentes. Ya sea overclockeando un Ryzen 9 para
            exprimir cada MHz adicional, configurando perfiles de ventilación
            personalizados, o explorando las profundidades del ray tracing en
            tiempo real, la intersección entre el hardware, el gaming y la
            programación es un territorio infinito de descubrimiento,
            aprendizaje y, sobre todo, diversión pura. Esta combinación de
            disciplinas es lo que impulsa a seguir aprendiendo, construyendo
            y superando los límites de lo posible.
          </Text>
        </View>

        {/* ═══════════════ INTERACTION FOOTER ═══════════════ */}
        <View style={styles.footerContainer}>
          <View style={styles.statsRow}>
            <Text style={styles.statsText}>❤️ {likeCount} likes</Text>
            <Text style={styles.statsText}>💬 12 comentarios</Text>
          </View>
          <View style={styles.dividerLine} />
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[
                styles.actionButton,
                liked && styles.actionButtonLiked,
              ]}
              onPress={handleLike}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.actionButtonText,
                  liked && styles.actionButtonTextLiked,
                ]}
              >
                {liked ? '❤️ Liked' : '🤍 Like'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              activeOpacity={0.7}
            >
              <Text style={styles.actionButtonText}>💬 Comentar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              activeOpacity={0.7}
            >
              <Text style={styles.actionButtonText}>🔗 Compartir</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom spacer */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

/* ═══════════════════════════════════════════════
   STYLES — Premium Dark Theme
   ═══════════════════════════════════════════════ */
const styles = StyleSheet.create({
  /* ── Root ── */
  rootContainer: {
    flex: 1,
    backgroundColor: '#0d0d1a',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },

  /* ── Header ── */
  headerWrapper: {
    overflow: 'hidden',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    elevation: 10,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
  },
  headerGradient: {
    paddingTop: 60,
    paddingBottom: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  headerName: {
    fontSize: 26,
    fontWeight: '800',
    color: '#e0d4ff',
    letterSpacing: 1,
    textAlign: 'center',
  },
  headerDivider: {
    width: 60,
    height: 3,
    backgroundColor: '#7c3aed',
    borderRadius: 4,
    marginVertical: 12,
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#a89ec9',
    letterSpacing: 2,
    textTransform: 'uppercase',
    textAlign: 'center',
  },

  /* ── Hero Image ── */
  imageCard: {
    marginHorizontal: 16,
    marginTop: 24,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    backgroundColor: '#1a1a2e',
  },
  heroImage: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(15, 12, 41, 0.75)',
  },
  imageCaption: {
    color: '#c4b5fd',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },

  /* ── Body ── */
  bodyContainer: {
    marginHorizontal: 16,
    marginTop: 24,
    backgroundColor: '#13132b',
    borderRadius: 20,
    padding: 22,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  postMeta: {
    marginBottom: 16,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1e1e3f',
    borderWidth: 2,
    borderColor: '#7c3aed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
  },
  authorName: {
    color: '#e0d4ff',
    fontSize: 15,
    fontWeight: '700',
  },
  postDate: {
    color: '#6b6b8d',
    fontSize: 12,
    marginTop: 2,
  },
  articleTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#f0eaff',
    lineHeight: 28,
    marginBottom: 18,
  },
  paragraph: {
    fontSize: 15,
    color: '#b3b0c9',
    lineHeight: 26,
    marginBottom: 18,
    textAlign: 'justify',
  },

  /* ── Footer / Interaction ── */
  footerContainer: {
    marginHorizontal: 16,
    marginTop: 20,
    backgroundColor: '#13132b',
    borderRadius: 20,
    padding: 18,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statsText: {
    color: '#7a78a0',
    fontSize: 13,
    fontWeight: '500',
  },
  dividerLine: {
    height: 1,
    backgroundColor: '#2a2a4a',
    marginBottom: 14,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#1e1e3f',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2d2d52',
  },
  actionButtonLiked: {
    backgroundColor: '#3b1a5e',
    borderColor: '#7c3aed',
  },
  actionButtonText: {
    color: '#a89ec9',
    fontSize: 13,
    fontWeight: '700',
  },
  actionButtonTextLiked: {
    color: '#c4b5fd',
  },
});
