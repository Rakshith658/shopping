import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductsOVSCreen from '../screens/shop/ProductsOVSCreen';

const Stack = createStackNavigator();

function ShopNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={ProductsOVSCreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default ShopNavigation;
