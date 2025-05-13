import { useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Snackbar, Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from './../../redux/slices/cartSlice';
import { toggleFavorite } from './../../redux/slices/favoriteSlice';
import products from './../../src/data/mockData.json';

export default function ProductDetailScreen() {
    const dispatch = useDispatch();
    const router = useRouter();
    const route = useRoute();
    const { id } = route.params || {};
    const product = products.find((item) => item.id === parseInt(id));
  
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    
    const isFavorite = useSelector((state) =>
        state.favorite.items.some((item) => item.id === (product && product.id || -1) )
      );
    const [_isFavorite, setIsFavorite] = useState(isFavorite);

    const handleAddToCart = () => {
        dispatch(addToCart(product));
        setSnackbarMessage(`เพิ่ม ${product.name} ลงรถเข็นแล้ว`);
        setSnackbarVisible(true);
    };

    const handleToggleFavorite = () => {
        dispatch(toggleFavorite(product));
        setIsFavorite(prev => !prev);
        setSnackbarMessage(
            !_isFavorite
            ? `เพิ่ม ${product.name} เข้ารายการโปรดแล้ว`
            : `นำ ${product.name} ออกจากรายการโปรดแล้ว`
        );
        setSnackbarVisible(true);
    };
  
    if (!product) {
      return (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>ไม่พบข้อมูลสินค้า</Text>
            <TouchableOpacity onPress={() => router.push('/HomeScreen')}>
                <Text style={styles.browseLink}>เลือกสินค้าต่อ</Text>
            </TouchableOpacity>
        </View>
      );
    }
  
    return (
      <>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => handleToggleFavorite()}>
            <MaterialCommunityIcons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={28}
              color={isFavorite ? 'red' : '#000'}
            />
          </TouchableOpacity>
        </View>
  
        <ScrollView contentContainerStyle={styles.container}>
          <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
  
          <Text variant="titleLarge" style={styles.title}>{product.name}</Text>
          <Text variant="bodyMedium" style={styles.description}>{product.desc}</Text>
          <Text variant="bodyMedium" style={styles.price}>฿{product.price.toLocaleString()}</Text>
  
          <View style={styles.rating}>
            <MaterialCommunityIcons name="star" size={20} color="#FFD700" />
            <Text> {product.rating.rate} ({product.rating.count})</Text>
          </View>
  
        </ScrollView>
  
        <View style={styles.footer}>
          <Button
            mode="contained"
            onPress={() => handleAddToCart()}
            style={styles.button}
            labelStyle={{ fontSize: 16 }}
          >
            เพิ่มลงรถเข็น
          </Button>
        </View>
  
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={2000}
          action={{
            label: 'ปิด',
            onPress: () => setSnackbarVisible(false),
          }}
        >
          {snackbarMessage}
        </Snackbar>
      </>
    );
  }
  
  const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingHorizontal: 16,
      paddingTop: 48,
      paddingBottom: 8,
      backgroundColor: '#fff',
      elevation: 2,
    },
    container: {
      height: '100%',
      padding: 16,
      alignItems: 'center',
      backgroundColor: '#fff',
      paddingBottom: 80,
    },
    image: {
      width: '100%',
      height: 250,
      borderRadius: 12,
      marginBottom: 16,
    },
    title: {
      fontSize: 20,
      textAlign: 'center',
      marginBottom: 8,
    },
    price: {
      fontSize: 18,
      color: '#6200ee',
      marginBottom: 8,
    },
    rating: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    description: {
      fontSize: 16,
      marginBottom: 8,
      textAlign: 'center',
      paddingHorizontal: 8,
    },
    footer: {
      position: 'absolute',
      bottom: 16,
      left: 16,
      right: 16,
      backgroundColor: 'transparent',
    },
    button: {
      borderRadius: 24,
      paddingVertical: 8,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    emptyText: {
        marginTop: 12,
        fontSize: 16,
        color: '#888',
    },
    browseLink: {
      marginTop: 10,
      fontSize: 14,
      color: '#007bff',
      textDecorationLine: 'underline',
    },
  });