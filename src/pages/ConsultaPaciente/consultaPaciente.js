import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View, TouchableOpacity, TextInput, Image, Platform, Alert } from 'react-native';
import { useNavigation, StackActions, useRoute } from '@react-navigation/native'
import { SafeAreaView } from "react-native-safe-area-context";
import { getStatusBarHeight } from 'react-native-status-bar-height';

import api from '../../services/api/api';


export default function ConsultaPaciente() {
    const route = useRoute();
    const id = route.params?.id;
    const token = route.params?.token;
    const [consultas, setConsultas] = useState([]);

    const selectConsulta = async () => {
        try {
            const response = await api.get(`/ConsultasPaciente`, {
                headers: {
                    idpessoa: id,
                    authorization: token,
                },
            });
            if (response.data && response.data.moreInfos) {
                setConsultas(response.data.moreInfos);
            } else {
                Alert.alert("Erro", "Dados de resposta inválidos.");
            }
        } catch (error) {
            console.log("Error during consulta request:", error);
        }
    };

    useEffect(() => {
        if (id && token) {
            selectConsulta();
        }
    }, [id, token]);

    return (
        <SafeAreaView style={styles.androidSafeArea}>
            <View style={styles.container}>
                <Image
                    source={require("../../../assets/imgLogo1-removebg-preview.png")}
                    style={styles.img}
                />
                <Text style={styles.title}>Seja Bem Vindo às suas Consultas!</Text>
                {consultas.length > 0 ? (
                    consultas.map((consulta) => (
                        <View style={styles.consultaItem} key={consulta.idConsulta}>
                            <Text style={styles.textConsulta}>Médico: {consulta.dadosMedico.nomeDoMedico}</Text>
                            <Text style={styles.textConsulta}>Especialidade: {consulta.dadosMedico.consultaEspecialidade}</Text>
                            <Text style={styles.textConsulta}>Horário: {consulta.horaConsulta}</Text>
                            <Text style={styles.textConsulta}>Data: {new Date(consulta.dataConsulta).toLocaleDateString()}</Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.textConsulta}>Nenhuma consulta encontrada.</Text>
                )}
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    androidSafeArea:{
        flex: 1,
        paddingTop: Platform.OS === 'android' ? getStatusBarHeight() : 0,
        backgroundColor: '#90B7CF',
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
        color: '#022135', 
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
        borderColor: '#022135',
        borderRadius: 20,
        padding: 15,
        marginBottom: 15,
    },
    textConsulta:{
        color: 'black', 
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    img: {
        width: 100,
        height: 100,
    }
})

/* 
#876842
#2a4b62
#022135
#D3D3D3
*/