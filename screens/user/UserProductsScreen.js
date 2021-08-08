import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../../constant/Colors';

const Stack = createStackNavigator();

const UserProductsStackScreen = () =>{

    const UserProductsScreen = () => {
        return (
            <View style={styles.container}>
                <Text>Rakshit</Text>
            </View>
        )
    }

    return(
        <Stack.Navigator>
            <Stack.Screen name="UserProductsScreen" component={UserProductsScreen} options={{
                headerTitle:"All Products",
                headerStyle:{
                    backgroundColor:Colors.primary
                },
                headerTintColor:'white'
            }}/>
        </Stack.Navigator>
    )
}

export default UserProductsStackScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:"center"
    }
})
