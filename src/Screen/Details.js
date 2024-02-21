import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const DetailsScreen = ({ route }) => {
  const { movie } = route.params;

  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` }}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <View style={styles.posterContainer}>
          <Image
            style={styles.poster}
            source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
            resizeMode="cover"
          />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{movie.original_title}</Text>
          <Text style={styles.overview}>{movie.overview}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '35%',
    opacity: 0.5,
  },
  content: {
    flex: 1,
    alignItems:'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  posterContainer: {
    marginBottom: 20,
  },
  poster: {
    width: 120,
    height: 160,
    borderRadius: 10,
  },
  detailsContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  overview: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});

export default DetailsScreen;
