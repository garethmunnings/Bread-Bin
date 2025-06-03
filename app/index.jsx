import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const [breads, setBreads] = useState([]);
  const [breadType, setBreadType] = useState('');
  const [breadExpiryYear, setExpiryYear] = useState('');
  const [breadExpiryMonth, setExpiryMonth] = useState('')
  const [breadExpiryDay, setExpiryDay] = useState('')
  const [n, setOpacity] = useState(0);


  const addBread = () => {
    if(!inputIsValid()) {
        setOpacity(1);
        return;
    }

    const expiryDate = new Date(`${breadExpiryYear}-${breadExpiryMonth}-${breadExpiryDay}`);

    const newBread = {
        type: breadType,
        expiryDate: expiryDate,
    };
    
    setBreads([...breads, newBread]);
    setBreadType('');
    setExpiryYear('');
    setExpiryMonth('');
    setExpiryDay('');
    setOpacity(0);
  }

  const removeBread = (indexToRemove) => {
    const updatedBreads = breads.filter((_, index) => index !== indexToRemove);
    setBreads(updatedBreads);
    };


  function inputIsValid() {
    //Type
    if (breadType.trim() === '') return false;
    
    //Year
    if(!Number.isInteger(Number(breadExpiryYear)) || breadExpiryYear.trim() === '') return false;

    //Month
    if(!Number.isInteger(Number(breadExpiryMonth)) || breadExpiryMonth.trim() === '') return false;

    //Day
    if(!Number.isInteger(Number(breadExpiryDay)) || breadExpiryDay.trim() === '') return false;

    //Date
    const date = new Date(breadExpiryYear + "-" + breadExpiryMonth + "-" + breadExpiryDay);
    if(isNaN(date.getTime())) return false;

    return true;
  }

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Bread Bin</Text>

        {breads.map((bread, index) => {
            const isExpired = new Date(bread.expiryDate) < new Date();
            return (
                <View
                    key={index}
                    style={[styles.breadItem, 
                    isExpired && 
                    styles.expired, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                    <View>
                        <Text>
                            {`${bread.type} - Expires on ${
                            new Date(bread.expiryDate).toLocaleDateString('en-US', { weekday: 'long' })} (${
                            new Date(bread.expiryDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })})`}
                            {isExpired && <Text style={styles.expiredLabel}> (Expired)</Text>}
                        </Text>
                </View>
                <TouchableOpacity
                    onPress={() => removeBread(index)}
                    style={[styles.removeButton,
                            isExpired ? styles.removeButtonExpired : styles.removeButtonNormal,]}>
                    <Text style={{ color: 'white' }}>-</Text>
                </TouchableOpacity>
                </View>
            );
        })}
        <View style={styles.inputContainer}>
            <View style={styles.row}>
                <TextInput placeholder='bread type' placeholderTextColor="#888" value={breadType} onChangeText={setBreadType} style={styles.input}/>
                <TextInput placeholder='yyyy' placeholderTextColor="#888" value={breadExpiryYear} onChangeText={setExpiryYear} style={styles.inputDate}/>
                <Text style = {styles.inputDateSlash}>/</Text>
                <TextInput placeholder='mm' placeholderTextColor="#888" value={breadExpiryMonth} onChangeText={setExpiryMonth} style={styles.inputDate}/>
                <Text style = {styles.inputDateSlash}>/</Text>
                <TextInput placeholder='dd' placeholderTextColor="#888" value={breadExpiryDay} onChangeText={setExpiryDay} style={styles.inputDate}/>
            </View>
        </View>
        <View style={{alignSelf: 'center', alignItems: 'center', padding: 10}}>
                <Text style = {{opacity: n, color: 'red'}}>Invalid input</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={addBread}>
            <Text style={styles.buttonText}>Add loaf</Text>
        </TouchableOpacity>
        
        
    </View>
  );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#c29367',
        padding: 12,
        borderRadius: 8,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
    },
    removeButton: {
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 4,
        marginLeft: 10,
    },

    removeButtonExpired: {
        backgroundColor: 'red',
    },

    removeButtonNormal: {
        backgroundColor: 'gray',
    },
    inputContainer: {
        paddingTop: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
  },
    container: {
        alignSelf: 'center',
        width: 400,
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
    inputDate: {
        borderRadius: 0,
        marginHorizontal: 0, 
        textAlign: 'center',
        backgroundColor: '#f0f0f0', 
        padding: 0,
        width: 50,                   
    },
    inputDateSlash: {
        backgroundColor: '#f0f0f0',
        textAlign: 'center',
        paddingTop: 9,
        flex: 0,                   
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