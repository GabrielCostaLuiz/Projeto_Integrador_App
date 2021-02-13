import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import {host} from '../config/settings';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Alert,
  Button,
} from "react-native";
import Cadastrar from "../screens/Cadastrar";
import { createStackNavigator } from "@react-navigation/stack";
import { TextInput, TouchableOpacity, SafeAreaView } from "react-native";

import * as SQLite from "expo-sqlite";
import BottomTabNavigator from "../navigation/BottomTabNavigator";

const db = SQLite.openDatabase("appvendadb.banco");

const Stack = createStackNavigator();

let us = "";
let sh = "";

export default function Login() {
return(
  <Stack.Navigator initialRouteName="TelaLogin">
    <Stack.Screen name="Tela login" component={TelaLogin}/>
    <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} options={{headerTitle:"AppBurguer"}}/>
    <Stack.Screen name="Cadastrar" component={Cadastrar} options={{headerShown:false}}/>
  </Stack.Navigator>
);
}

function TelaLogin({navigation}){

  React.useEffect(() => {

    db.transaction((hp)=>{
      hp.executeSql("select * from perfil", [], (_, { rows:{_array} }) => {
        if(_array[0].nomecliente.equals!=null || _array[0].nomecliente.equals!=""){
         navigation.replace("BottomTabNavigator");
        }
      }); 
    })
  })

  const [usuario, setUsuario] = React.useState("");
  const [senha, setSenha] = React.useState("");

  return (
    <View>
      <ImageBackground
        source={require("../assets/images/papel.png")}
        style={estilo.fundo}
      >
        <Text style={estilo.titulo}>Tela de Login</Text>

        <TextInput
          style={estilo.input}
          placeholder="Usuário"
          onChangeText={(value) => setUsuario(value)}
          value={usuario}
        />
        <TextInput
          style={estilo.input}
          placeholder="Senha"
          onChangeText={(value) => setSenha(value)}
          value={senha}
          secureTextEntry
        />
        <TouchableOpacity
          style={estilo.btnlogin}
          onPress={() => {
            us = usuario;
            sh = senha;
            logar();
            navigation.navigate("BottomTabNavigator")
          }}
        >
          <Text style={estilo.txtlogin}>Logar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={estilo.btncad}
          onPress={() => navigation.navigate("Cadastrar")}
        >
          <Text style={estilo.txtcad}> Cadastrar </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );

  }

function logar() {
  fetch(`${host}/ProjetoApi/services/usuario/login.php`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nomeusuario: us,
      senha: sh,
    }),
  })
    .then((response) => response.json())
    .then((resposta) => {
      gravarPerfil(resposta.saida[0]);
      Alert.alert("Bem Vindo");
    })
    .catch((error) => console.error(error));
}

function gravarPerfil(dados) {
  console.log({rs:dados})
  db.transaction((tx) => {
    tx.executeSql(
      "create table perfil(id integer primary key, idusuario int , nomeusuario text, idcliente text, nomecliente text, cpf text,sexo text, telefone text, tipo text, logradouro text, numero text, complemento text, bairro text, cep text, logado int);"
    );
  });
  db.transaction((tx) => {
    tx.executeSql(
      "insert into perfil(idusuario, nomeusuario, idcliente, nomecliente, cpf,sexo, telefone, tipo, logradouro, numero, complemento, bairro, cep, logado)values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        dados.idusuario,
        dados.nomeusuario,
        dados.idcliente,
        dados.nomecliente,
        dados.cpf,
        dados.sexo,
        dados.telefone,
        dados.tipo,
        dados.logradouro,
        dados.numero,
        dados.complemento,
        dados.bairro,
        dados.cep,
        1,
      ]
    );

    tx.executeSql("select * from perfil", [], (_, { rows:{_array} }) => {
      console.log("Dados do perfil")
      console.log(_array);
    });
  });
}



const estilo = StyleSheet.create({
  btnlogin: {
    width: "30%",
    padding: 10,
  },

  txtlogin: {
    fontSize: 20,
    color: "white",
    backgroundColor: "brown",
    textAlign: "center",
  },

  btncad: {
    width: "40%",
    padding: 10,
  },

  txtcad: {
    fontSize: 20,
    color: "white",
    backgroundColor: "brown",
    textAlign: "center",
  },

  fundo: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    borderColor: "brown",
    padding: 10,
    width: "50%",
    height: 40,
    borderWidth: 2,
    backgroundColor: "white",
    marginBottom: 5,
  },

  titulo: {
    color: "red",
    fontSize: 30,
    marginBottom: 20,
  },

  cadastrar: {
    width: "60%",
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 60,
    borderColor: "#2ba97a",
    borderWidth: 1,
    borderRadius: 10,
  },

});
