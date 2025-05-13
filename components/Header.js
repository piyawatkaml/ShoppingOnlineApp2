import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Badge } from 'react-native-paper';
import { useSelector } from 'react-redux';

export default function Header() {
  const router = useRouter();
  const cartItems = useSelector((state) => state.cart.items);
  const favoriteItems = useSelector((state) => state.favorite.items);

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalFavorite = favoriteItems.length;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push('/favorite')}>
        <MaterialCommunityIcons name="heart-outline" size={24} color="black" />
        {totalFavorite > 0 && (
          <Badge style={styles.badge}>{totalFavorite}</Badge>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/cart')} style={styles.iconContainer}>
        <MaterialCommunityIcons name="cart-outline" size={24} color="black" />
        {totalQuantity > 0 && (
          <Badge style={styles.badge}>{totalQuantity}</Badge>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 16,
    marginRight: 12,
  },
  iconContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -10,
  },
});