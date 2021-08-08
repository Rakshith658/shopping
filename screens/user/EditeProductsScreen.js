import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../../constant/Colors';

const Stack = createStackNavigator();

const EditeProductsStackScreen = () =>{

    const EditeProductsScreen = () => {
        return (
            <View style={styles.container}>
                <Text>Rakshit</Text>
            </View>
        )
    }

    return(
        <Stack.Navigator>
            <Stack.Screen name="EditeProductsScreen" component={EditeProductsScreen} options={{
                headerTitle:"All Products",
                headerStyle:{
                    backgroundColor:Colors.primary
                },
                headerTintColor:'white'
            }}/>
        </Stack.Navigator>
    )
}

export default EditeProductsStackScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:"center"
    }
})
