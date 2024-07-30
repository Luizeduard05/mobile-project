import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View, TouchableOpacity, TextInput, Image, Platform, Alert } from 'react-native';
import { useNavigation, StackActions, useRoute } from '@react-navigation/native'
import { SafeAreaView } from "react-native-safe-area-context";
import { getStatusBarHeight } from 'react-native-status-bar-height';

import api from '../../services/api/api';

export default function ConsultaMedico(){

    const route = useRoute()
    const id = route.params?.id
    const token = route.params?.token
    const [infoGeral, setInfoGeral ]= useState() //State provisorio so para ver se os dados estão chegando

    console.log(id)
    console.log(token)

    const selectConsulta = async () => {
        try {
            await api.get(`/ConsultasMedico`,{
                Headers: {
                    "idpessoa": id,
                    "authorization": token
                }
            })
                .then(response => {
                    console.log(response.data)
                    setInfoGeral(response.data)
                    // setDadosConsulta(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        selectConsulta();
    }, [infoGeral]);




    return(
        <SafeAreaView style={styles.androidSafeArea}>
            <View style={styles.container}>
                <Text style={styles.title}>Seja Bem Vindo as suas Consultas do dia!</Text>

                <View style={styles.consultaItem}>
                    <Text style={styles.textConsulta}>Nome do Paciente: </Text>
                    <Text style={styles.textConsulta}>Horário da Consulta: 14:45</Text>
                    <Text style={styles.textConsulta}>Data: Quinta-Feira - 10/06/2025</Text>
                    <Text style={styles.textConsulta}>Local: Rua Alameda das Árvores, N° 225 Nova Veneza Sumaré</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    androidSafeArea:{
        flex: 1,
        paddingTop: Platform.OS === 'android' ? getStatusBarHeight() : 0,
        backgroundColor: '#d3d3d3',
        height: '100%',
        width: '100%'
    },
    container:{
        flex: 1,
        justifyContent: 'space-betwen',
        alignItems: 'center'
    },
    title:{
        textAlign: 'center', 
        color: '#876842', 
        fontSize: 20, 
        textTransform: 'uppercase',
        fontWeight: 'bold',
        padding: 10,
        marginBottom: 25
    },
    consultaItem:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderWidth: 4,
        borderColor: '#876842',
        borderRadius: 20,
        padding: 15,
        marginBottom: 15,
    },
    textConsulta:{
        color: 'black', 
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
})