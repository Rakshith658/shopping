import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import {useSelector} from 'react-redux'

const ProductsOVSCreen = () => {
    const Product = useSelector(state => state.Product.availableProducts)
    return (
        <FlatList 
            data={Product} 
            keyExtractor={item => item.id} 
            renderItem={itemData => <Text>{itemData.item.title}</Text>}
        />
    )
}

export default ProductsOVSCreen

const styles = StyleSheet.create({})
