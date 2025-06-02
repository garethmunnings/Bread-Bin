import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const [breads, setBreads] = useState([]);
  const [breadType, setBreadType] = useState('');
  const [breadExpiryDate, setExpiry] = useState('');

  const addBread = () => {
    if (breadType.trim() === '') return;
    const dateArr = breadExpiryDate.split("/")
    const num = parseInt(str, dateArr[0]);
    if (isNaN(num) || !Number.isInteger(num))
    {
        return
    }

    const newBread = {
        type: breadType,
        expiryDate: breadExpiryDate,
    };
    
    setBreads([...breads, newBread]);
    setBreadType('');
    setExpiry('');
  }

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Bread Bin</Text>

        {breads.map((bread, index) => (
            <Text key={index} style={styles.breadItem}>
                {bread.type} - Expires: {bread.expiryDate}
            </Text>
        ))}
        <View style={styles.inputContainer}>
            <View style={styles.row}>
                <TextInput placeholder='bread type' value={breadType} onChangeText={setBreadType} style={styles.input}/>
                <TextInput placeholder='yyyy/mm/dd' value={breadExpiryDate} onChangeText={setExpiry} style={styles.input}/>
            </View>
            
        </View>

        <Button title = "Add loaf" onPress={addBread}></Button>
        
        
    </View>
  );
}

const styles = StyleSheet.create({
    inputContainer: {
        padding: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
  },
    container: {
        paddingTop: 60,
        paddingHorizontal: 20,
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        alignSelf: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        flex: 1,                   
        marginHorizontal: 5, 
    },
    breadItem: {
        padding: 12,
        backgroundColor: '#f0f0f0',
        marginVertical: 5,
        borderRadius: 8,
    },
    breadText: {
        fontSize: 16,
    },
    expired: {
        backgroundColor: '#ffd6d6',
    },
    expiredLabel: {
        color: 'red',
        fontWeight: 'bold',
    },
});