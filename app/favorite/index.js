import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Card, Snackbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from './../../redux/slices/favoriteSlice';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 40) / 2;

export default function FavoriteScreen() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorite.items);
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  const [snackbarMsg, setSnackbarMsg] = React.useState('');
  const router = useRouter();

  const handleRemoveFavorite = (product) => {
    dispatch(toggleFavorite(product));
    setSnackbarMsg(`ลบ ${product.name} ออกจากรายการที่ชอบแล้ว`);
    setSnackbarVisible(true);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => router.push(`/product/${item.id}`)}
    >
        <Card style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name} numberOfLines={2}>
                {item.name}
            </Text>
            <Text style={styles.price}>{item.price.toLocaleString()} ฿</Text>
            <TouchableOpacity
                style={styles.favoriteBtn}
                onPress={() => handleRemoveFavorite(item)}
            >
                <MaterialCommunityIcons name="heart" size={24} color="red" />
            </TouchableOpacity>
        </Card>
    </TouchableOpacity>
  );

  if(favorites.length === 0) {
    return (
        <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="heart-off" size={64} color="#ccc" />
            <Text style={styles.emptyText}>ยังไม่มีรายการที่ชอบ</Text>
            <TouchableOpacity onPress={() => router.push('/HomeScreen')}>
            <Text style={styles.browseLink}>ไปเลือกสินค้าที่คุณชอบ</Text>
            </TouchableOpacity>
        </View>
    );
  }

  return (
    <>
       <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={{ padding: 8 }}
        />
        <Snackbar
            visible={snackbarVisible}
            onDismiss={() => setSnackbarVisible(false)}
            duration={2000}
        >
            {snackbarMsg}
        </Snackbar>
    </>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: CARD_WIDTH,
    // flex: 1,
    margin: 4,
  },
  card: {
    marginBottom: 8,
    padding: '10px', 
    minHeight: '-webkit-fill-available'
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  price: {
    fontSize: 13,
    color: '#444',
  },
  favoriteBtn: {
    position: 'absolute',
    top: 1,
    right: 1,
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
