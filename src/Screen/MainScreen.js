import { View, Text, Image, TouchableOpacity, FlatList, Dimensions, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Carousel, { Pagination } from 'react-native-new-snap-carousel';


const { width: screenWidth } = Dimensions.get('window');


const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = React.useState(0);

  const entries = [
    {
      url: 'https://img.englishcinemakyiv.com/WhIfYw3j_x7-c3QXQjrKqMwHcNhnkfwzOjqwYycyzEw/resize:fill:800:450:1:0/gravity:sm/aHR0cHM6Ly9leHBhdGNpbmVtYXByb2QuYmxvYi5jb3JlLndpbmRvd3MubmV0L2ltYWdlcy9jNjk0ZmQ3ZC1mNjhkLTQxMTctOTNkMy0xZjc0MjQ0YTFiM2EuanBn.jpg',
    },
    {
      url: 'https://lumiere-a.akamaihd.net/v1/images/pp_disney_blackpanther_wakandaforever_1289_d3419b8f.jpeg?region=0%2C0%2C540%2C810',
    },
    {
      url: 'https://c4.wallpaperflare.com/wallpaper/872/110/328/twilight-wallpaper-preview.jpg',
    },
    {
      url: 'https://w0.peakpx.com/wallpaper/66/228/HD-wallpaper-tv-show-lucifer-lucifer-tv-show-lucifer-morningstar.jpg',
    },
    {
      url: 'https://www.milesweb.in/blog/wp-content/uploads/2021/09/10-insightful-Business-Growth-Learnings-From-Money-Heist.jpg',
    },
  ];

  const fetchPopularMovies = async () => {
    const url = 'https://api.themoviedb.org/3/movie/popular?api_key=372c25045b459ce50329e3c2d348af0b';
    const response = await fetch(url);
    const data = await response.json();
    setPopularMovies(data.results);
  };

  const fetchTopRatedMovies = async () => {
    const url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=372c25045b459ce50329e3c2d348af0b';
    const response = await fetch(url);
    const data = await response.json();
    setTopRatedMovies(data.results);
  };

  useEffect(() => {
    fetchPopularMovies();
    fetchTopRatedMovies();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        <Image source={{ uri: item.url }} style={styles.image} />
      </View>
    );
  };

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Details', { movie: item })}>
      <View style={{ padding: 15 }}>
        <Image
          style={{ width: 125, height: 170,  marginVertical:5, borderRadius:10 }}
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
          resizeMode="cover"
        />
      <Text>{item.original_title.length > 12 ? `${item.original_title.slice(0, 12)}...` : item.original_title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={{ backgroundColor: '#000',}}>
      <View style={{ backgroundColor: '#000'}}>
        <Carousel
          data={entries}
          renderItem={renderItem}
          sliderWidth={screenWidth}
          itemWidth={screenWidth}
          swipeEnabled={false}
          onSnapToItem={(index) => setActiveIndex(index)}
          autoplay={true} 
          autoplayInterval={2000} 
          loop={true} 
        />

        <Pagination
          dotsLength={entries.length}
          activeDotIndex={activeIndex}
          containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)', paddingVertical: 10 }}
          dotStyle={{
            width: 8,
            height: 8,
            borderRadius: 5,
            backgroundColor: '#f2c94c',
          }}
          inactiveDotStyle={{
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
        <Text style={{ color: '#fff', fontSize: 20, marginVertical: 10, marginHorizontal:15 }}>Featured Movies</Text>
        <FlatList
          data={popularMovies}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMovieItem}
        />

        <Text style={{ color: '#fff', fontSize: 20, marginVertical: 10, marginHorizontal:15 }}>Top Rated Movies</Text>
        <FlatList
          data={topRatedMovies}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMovieItem}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 10,
  },
});
export default App