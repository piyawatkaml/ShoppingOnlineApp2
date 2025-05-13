import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Dimensions, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Card, Snackbar, Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { addToCart } from './../redux/slices/cartSlice';
import products from './../src/data/mockData.json';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 40) / 2;

export default function HomeScreen() {
    const dispatch = useDispatch();

    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const router = useRouter();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        setSnackbarMessage(`เพิ่ม ${product.name} ลงรถเข็นแล้ว`);
        setSnackbarVisible(true);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.cardContainer}
            onPress={() => router.push(`/product/${item.id}`)}
        >
            <Card>
                <Card.Cover source={{ uri: item.image }} style={{ height: 140 }} />
                <Card.Content>
                    <Text variant="titleLarge" numberOfLines={2}>{item.name}</Text>
                    <Text variant="bodyMedium">฿{item.price.toLocaleString()}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name="star" size={18} color="rgb(231 200 29);" />
                        <Text> {item.rating.rate} ({item.rating.count})</Text>
                    </View>
                </Card.Content>
                <Card.Actions>
                    <Button onPress={() => handleAddToCart(item)}>เพิ่มลงรถเข็น</Button>
                </Card.Actions>
            </Card>
        </TouchableOpacity>
    );

    return (
        <>
            <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                contentContainerStyle={{ padding: 8 }}
            />
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
    cardContainer: {
        width: CARD_WIDTH,
        flex: 1,
        margin: 8,
    },
});
