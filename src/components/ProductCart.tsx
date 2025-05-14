import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useSelector , useDispatch } from 'react-redux';
import { RootState } from '../redux/Store';
import { removeFromCart } from '../redux/Slices/CartSlice';
const ProductCart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
  
    const handleRemoveFromCart = (itemId: number) => {
      dispatch(removeFromCart(itemId));
    };


  const renderItem = ({ item }:any) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>${item.price}</Text>
      <TouchableOpacity style={styles.button} onPress={() => handleRemoveFromCart(item.id)}>
        <Text style={styles.text}>Remove</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyCartText}>Your cart is empty</Text>
      ) : (
      <SafeAreaView>
        <View style={styles.summary}>
            <Text style={styles.cartsummary}>
                Card Summary
            </Text>
            <Text style={styles.cartCount}>Cart Items: {cartItems.length}</Text>
            <Text style={styles.totalPrice}>Total Price: ${totalPrice.toFixed(2)}</Text>
        </View>
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
        />
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
};

export default ProductCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 16,
    paddingTop: 30,
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
    textAlign: 'center',
  },
  price: {
    fontSize: 14,
    color: 'green',
    marginTop: 4,
  },
  button: {
    backgroundColor: '#EF4444', 
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  text: {
    color: "white"
  },
  emptyCartText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
    color: '#6B7280',
  },
  summary: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  
  cartsummary: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827', 
    marginBottom: 8,
  },
  
  cartCount: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151', 
    marginBottom: 4,
  },
  
  totalPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10B981', 
  },
  
});
