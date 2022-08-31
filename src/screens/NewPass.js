import React from "react";
import { View, Text, StyleSheet, Button,TouchableOpacity } from "react-native";
import InputText from "../components/Input";
import { Link } from '@react-navigation/native';

export default function NewPass() {
    return (
        <View style={styles.container}>
            <Text style={styles.head}>New Password</Text>
            <Text style={styles.secondHead}>Please enter your email to receive a link to create a new Password via Email</Text>
            <InputText placeholder="New Password" style={styles.input} />
            <InputText placeholder="Confirm Password" style={styles.input} />            
            <TouchableOpacity  style={styles.button}><Link to={{screen:'Login'}} style={styles.text} >Next</Link></TouchableOpacity>
         
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width:"100%",
height:"auto",
paddingHorizontal: 10    },

    input: {
        color: 'black',
        backgroundColor: 'rgba(0, 0, 0, 0.07)',
        paddingHorizontal: 25,
        paddingVertical: 15,
        borderRadius:20,
        marginBottom:28
        
        

    },
    head: {
        fontSize: 25,
        textAlign:'center' ,
        marginVertical:10

    },
    secondHead:{
        color:'gray',
        textAlign:'center' ,
        marginVertical:10


    },
    button: {
        textAlign:'center' ,
        backgroundColor: '#45fa81',
        color: 'white',
        paddingHorizontal: 25,
        paddingVertical: 15,
        marginVertical:10,
        borderRadius:20


    },  
    text:{
        color:'white',
        textAlign:'center' ,

    } 
 
}
)