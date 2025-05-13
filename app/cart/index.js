import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity } from './../../redux/slices/cartSlice';

const CartScreen = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const cartItems = useSelector((state) => state.cart.items);

    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart(productId));
    };

    const handleIncreaseQuantity = (productId) => {
        const product = cartItems.find(item => item.id === productId);
        dispatch(updateQuantity({ productId, quantity: product.quantity + 1 }));
    };

    const handleDecreaseQuantity = (productId) => {
        const product = cartItems.find(item => item.id === productId);
        if (product.quantity > 1) {
        dispatch(updateQuantity({ productId, quantity: product.quantity - 1 }));
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString();
    };

    if(cartItems.length === 0) {
        return (
            <View style={styles.emptyContainer}>
              <MaterialCommunityIcons name="cart-off" size={64} color="#ccc" />
              <Text style={styles.emptyText}>รถเข็นของคุณยังว่างอยู่</Text>
              <TouchableOpacity onPress={() => router.push('/HomeScreen')}>
                <Text style={styles.browseLink}>เลือกสินค้าต่อ</Text>
              </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>
        <SwipeListView
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            disableRightSwipe
            rightOpenValue={-80}
            contentContainerStyle={{ paddingBottom: 100 }}
            renderItem={({ item }) => (
            <Card style={styles.card}>
                <View style={styles.cardContent}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.info}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.price}>฿{item.price.toLocaleString()}</Text>
                    <View style={styles.quantityRow}>
                    <IconButton icon="minus" size={20} onPress={() => handleDecreaseQuantity(item.id)} />
                    <Text>{item.quantity}</Text>
                    <IconButton icon="plus" size={20} onPress={() => handleIncreaseQuantity(item.id)} />
                    </View>
                </View>
                </View>
            </Card>
            )}
            renderHiddenItem={({ item }) => (
                <View style={styles.rowBack}>
                    <View style={styles.deleteContainer}>
                        <IconButton
                            icon="delete"
                            iconColor="white"
                            containerColor="red"
                            size={24}
                            onPress={() => handleRemoveFromCart(item.id)}
                            style={styles.deleteIcon}
                        />
                    </View>
                </View>
            )}
        />

        <View style={styles.footer}>
            <Text style={styles.totalText}>รวม: ฿{calculateTotal()}</Text>
        </View>
        </View>
    );
};

export default CartScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f6f6f6',
    },
    card: {
      marginHorizontal: 12,
      marginVertical: 6,
      borderRadius: 12,
    },
    cardContent: {
      flexDirection: 'row',
      padding: 12,
    },
    image: {
      width: 80,
      height: 80,
      borderRadius: 8,
    },
    info: {
      flex: 1,
      marginLeft: 12,
      justifyContent: 'space-between',
    },
    name: {
      fontSize: 16,
      fontWeight: '600',
    },
    price: {
      color: '#444',
    },
    quantityRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    rowBack: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginHorizontal: 12,
        marginVertical: 6,
        borderRadius: 12,
        overflow: 'hidden',
    },
    deleteButton: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      backgroundColor: '#fff',
      padding: 16,
      width: '100%',
      borderTopWidth: 1,
      borderColor: '#ddd',
    },
    totalText: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'right',
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
  