import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Redirect, Stack, usePathname } from 'expo-router';
import 'react-native-reanimated';
import { Provider } from 'react-redux';
import Header from '../components/Header';
import { store } from './../redux/store';

export default function RootLayout() {
  const pathname = usePathname();

  if (pathname === '/') {
    return <Redirect href="/HomeScreen" />;
  }
  
  return (
    <Provider store={store}>
      <ThemeProvider value={DefaultTheme}>
        <Stack screenOptions={{ headerRight: () => <Header /> }}>
          <Stack.Screen name="HomeScreen" options={{
            title: 'หน้าแรก',
            headerBackVisible: false,
            headerLeft: () => null
          }}/>
          <Stack.Screen name="product/[id]" options={{
            title: 'หน้ารายละเอียดสินค้า'
          }}/>
          <Stack.Screen name="cart/index" options={{
            title: 'หน้ารถเข็น'
          }}/>
          <Stack.Screen name="favorite/index" options={{
            title: 'หน้ารายการที่ชอบ'
          }}/>
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </Provider>
  );
}
