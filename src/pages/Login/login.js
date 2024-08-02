import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  Button,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Platform,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getStatusBarHeight } from "react-native-status-bar-height";

import api from "../../services/api/api";

export default function Login() {
  const navigation = useNavigation();
  const route = useRoute();
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [tipo, setTipo] = useState("");

  const [id, setId] = useState("");
  const [token, setToken] = useState("");

  const verifyUser = async () => {
    if (cpf.length === 11 && senha !== "") {
      try {
        const response = await api.post("/login", {
          login: cpf,
          senha: senha,
        });

        if (response.data && response.data.moreInfos) {
          setTipo(response.data.moreInfos.tipo);
          setId(response.data.moreInfos.pessId);
          setToken(response.data.token);
        } else {
          Alert.alert("Erro", "Dados de resposta inválidos.");
        }
      } catch (error) {
        console.log("Error during login request:", error);
      }
    } else {
      console.log("Invalid CPF or senha");
    }
  };

  useEffect(() => {
    if (tipo) {
      if (tipo === "medico") {
        consultaMedico();
      } else if (tipo === "paciente") {
        consultaPaciente();
      }
    }
  }, [tipo, id, token]);

  const consultaMedico = () => {
    if (id && token) {
      navigation.navigate("ConsultaMedico", { id, token });
    }
  };

  const consultaPaciente = () => {
    if (id && token) {
      navigation.navigate("ConsultaPaciente", {id: id, token: token});
    }
  };

  return (
    <SafeAreaView style={styles.androidSafeArea}>
      <View style={styles.container}>
        <Image
          source={require("../../../assets/imgLogo1-removebg-preview.png")}
          style={styles.img}
        />
        <View>
          <Text style={styles.titles}>Seja Bem Vindo a Breaking Med!</Text>
          <Text style={styles.title}>
            Faça Login Para Visualizar suas consultas
          </Text>
        </View>
        <TextInput
          value={cpf}
          onChangeText={setCpf}
          style={styles.inputs}
          keyboardType="numeric"
          placeholder="Digite seu CPF"
          maxLength={11}
        ></TextInput>
        <TextInput
          value={senha}
          onChangeText={setSenha}
          style={styles.inputs}
          secureTextEntry
          placeholder="Digite sua Senha"
        ></TextInput>

        <TouchableOpacity onPress={verifyUser} style={styles.btnAcessar}>
          <Text style={styles.textBtn}>Acessar</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? getStatusBarHeight() : 0,
    marginTop: 28,
    backgroundColor: "#90B7CF",
    height: "100%",
    width: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "#90B7CF",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  img: {
    width: 250,
    height: 250,
  },
  titles: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
    color: "#cb3256",
  },
  title: {
    textAlign: "center",
    color: "#022135",
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10
  },
  inputs: {
    width: "90%",
    height: 50,
    backgroundColor: "#fff",
    padding: 10,
    fontSize: 16,
    borderRadius: 10,
    margin: 10
  },
  btnAcessar: {
    width: "90%",
    height: 50,
    backgroundColor: "#2188C7",
    justifyContent: "center",
    marginBottom: 30,
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10
  },
  textBtn: {
    fontSize: 20,
    color: "#022135",
    fontWeight: "bold",
  },
});

/* 
#876842
#2a4b62
#022135
#D3D3D3
*/