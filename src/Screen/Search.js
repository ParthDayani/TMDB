import { View, Text, Image, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Search = () => {
  const [apidata, setApidata] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigation = useNavigation(); 

  // const fetchMovies = async () => {
  //   const url = `https://api.themoviedb.org/3/movie/popular?api_key=3a56f98ea64a29ae77e0a215ea34b553`;
  //   const response = await axios.get(url);
  //   setApidata(response.data);
  // };
  const fetchMovies = async () => {
    try {
      const url = 'https://api.themoviedb.org/3/movie/popular?api_key=372c25045b459ce50329e3c2d348af0b';
      const response = await axios.get(url);
      setApidata(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
      // Handle the error, e.g., show an error message to the user
    }
  };
  
  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSearch = (text) => {
    setSearchTerm(text);
  };

  const navigateToDetails = (movie) => {
    navigation.navigate('Details', { movie }); 
  };

  let filteredMovies = [];
  if (apidata.results) {
    filteredMovies = apidata.results.filter((movie) => {
      return movie.original_title.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

  return (
    <ScrollView style={{ backgroundColor: '#000',}}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          placeholderTextColor={'#fff'}
          onChangeText={handleSearch}
          value={searchTerm}
        />
        <View style={styles.imageContainer}>
          {filteredMovies.map((movie, index) => (
            <TouchableOpacity key={movie.id} style={styles.imageWrapper} onPress={() => navigateToDetails(movie)}>
              <Image
                style={styles.image}
                source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                resizeMode="cover"
              />
              <Text style={styles.title}>{movie.original_title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#000',
  },
  input: {
    height: 50,
    width: '90%',
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 10,
    backgroundColor: '#141414',
    borderRadius: 15,
    paddingLeft: 30
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '90%',
  },
  imageWrapper: {
    width: '48%', 
    padding: 5,
    marginVertical: 5,
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 5,
    borderRadius: 10,
  },
  title: {
    marginTop:5,
    color: '#fff',
    textAlign:'left',
  },
});

export default Search;
