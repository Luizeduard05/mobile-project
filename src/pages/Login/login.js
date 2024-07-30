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

  const [id, setId] = useState()
  const [token, setToken] = useState("")

  const verifyUser = async () => {
    try {
      console.log(cpf, senha);
      if (cpf.length === 11 && senha !== "") {
        await api
          .post('/login', {
            login: cpf,
            senha: senha,
          })
          .then((response) => {
            console.log(response.data);
            setTipo("");
            const buscaTipo = response.data.moreInfos.tipo
            // console.log(buscaTipo)
            setId(response.data.moreInfos.pessId);
            setToken(response.data.token)
            setTipo(buscaTipo);
          })
          .catch((error) => {
            console.log(error);
          });
        // console.log(tipo)
        // console.log(id)
      } else {
        console.log("Invalid CPF or senha");
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    if (tipo === "medico") {
      // console.log("É MEDICO")
      // console.log(id)
      consultaMedico()
    }
    else if (tipo === "paciente") {
      // console.log("É paciente")
      consultaPaciente()
    }
  }, [tipo])



  const consultaMedico = () => {
    navigation.navigate("ConsultaMedico", {id: id, token: token});
  };

  const consultaPaciente = () => {
    navigation.navigate("ConsultaPaciente");
  };

  return (
    <SafeAreaView style={styles.androidSafeArea}>
      <View style={styles.container}>
        <Image
          source={require("../../../assets/imgLogo1.jpg")}
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
          placeholder="Digite seu CPF"
        ></TextInput>
        <TextInput
          value={senha}
          onChangeText={setSenha}
          style={styles.inputs}
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
    marginTop: 10,
    backgroundColor: "#d3d3d3",
    height: "100%",
    width: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "#d3d3d3",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  img: {
    width: 180,
    height: 180,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#876842",
  },
  titles: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
    color: "#022135",
  },
  title: {
    textAlign: "center",
    color: "#876842",
    fontSize: 16,
    textTransform: "uppercase",
  },
  inputs: {
    width: "90%",
    height: 50,
    backgroundColor: "#fff",
    padding: 10,
    fontSize: 16,
    borderRadius: 10,
  },
  btnAcessar: {
    width: "90%",
    height: 50,
    backgroundColor: "#876842",
    justifyContent: "center",
    marginBottom: 50,
    alignItems: "center",
    borderRadius: 10,
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