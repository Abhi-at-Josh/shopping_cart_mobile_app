import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/Slices/CartSlice';


const fetchProducts = async ()=>{
    const{ data }= await axios.get('https://fakestoreapi.com/products');
    return data;
}

interface Product {
  id: string;
  title: string;
  price: string;
}

const ProductLists = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();

    const{data , isLoading,error} = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
    })

    useEffect(() => {
        if (data) {
          setFilteredProducts(data);
          setProducts(data);
        }
      }, [data]);

  const handleSearch = (text:string) => {
    setSearchText(text);
    const filter = products.filter((item) =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProducts(filter);
  };


 const handleAddToCart = (item:any) => {
    dispatch(addToCart(item));
 }

  const renderItem = ({ item }:any) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>${item.price}</Text>
      <TouchableOpacity style={styles.button} onPress={() => handleAddToCart(item)}>
        <Text style={styles.text}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Search"
        placeholderTextColor="#9CA3AF"
        style={styles.searchInput}
        value={searchText}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
      />
    </SafeAreaView>
  );
};

export default ProductLists;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 16,
    paddingTop: 30,
  },
  searchInput: {
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#1F2937",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
  },
  price: {
    fontSize: 14,
    color: 'green',
    marginTop: 4,
  },
  button: {
    backgroundColor: '#3B82F4',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  text: {
    color: 'white',
  },
});

