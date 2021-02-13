import * as React from "react";
import {host} from '../config/settings';
import { Text, View } from "../components/Themed";
import {
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native-gesture-handler";
import {
  SectionList,
  Picker,
  StyleSheet,
  Image,
  ImageBackground,
  Alert,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "../navigation/BottomTabNavigator";

let nome = "";
let cpf = "";
let sx = "";
let us = "";
let sh = "";
let cf = "";
let tel = "";
let tp = "";
let lg = "";
let nu = "";
let cp = "";
let ba = "";
let cep = "";
let pf = "";

const Stack = createStackNavigator();

export default function Cadastrar() {
  return(
    <Stack.Navigator initialRouteName="TelaCadastro">
      <Stack.Screen name="Tela Cadastro" component={TelaCadastro}/>
      {/* <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} options={{headerTitle:"AppBurguer"}}/> */}
    </Stack.Navigator>
  );
  }
  
  function TelaCadastro({navigation}){

  const [sexo, setSexo] = React.useState("");
  const [tipo, setTipo] = React.useState("");
  const [nomecli, setNomecli] = React.useState("");
  const [cpfcli, setCPFcli] = React.useState("");
  const [usuario, setUsuario] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [perfil, setPerfil] = React.useState("");
  const [confirmar, setConfirmar] = React.useState("");
  const [telefone, setTelefone] = React.useState("");
  const [logradouro, setLogradouro] = React.useState("");
  const [numero, setNumero] = React.useState("");
  const [complemento, setComplemento] = React.useState("");
  const [bairro, setBairro] = React.useState("");
  const [cepcli, setCEPcli] = React.useState("");

  return (
    <View style={estilo.area}>
      <ImageBackground
        source={require("../assets/images/papel.png")}
        style={estilo.fundo}
      >
        <ScrollView>

          <View style={estilo.dados}>
            <Text style={estilo.titulo}>Dados Pessoais</Text>

            <TextInput
              placeholder="Nome Completo"
              style={estilo.input}
              onChangeText={(value) => setNomecli(value)}
              value={nomecli}
            />
            <TextInput
              placeholder="CPF"
              style={estilo.input}
              onChangeText={(value) => setCPFcli(value)}
              value={cpfcli}
            />

            <TextInput
              placeholder="Telefone"
              keyboardType="phone-pad"
              style={estilo.input}
              onChangeText={(value) => setTelefone(value)}
              value={telefone}
            />

            <Picker
              selectedValue={sexo}
              mode="dropdown"
              onValueChange={setSexo}
              style={estilo.input2}
            >
              <Picker.Item label="Masculino" value="Masculino" />
              <Picker.Item label="Feminino" value="Feminino" />
            </Picker>
          </View>

          <View style={estilo.dados}>
            <Text style={estilo.titulo}>Usuário</Text>
            <TextInput
              placeholder="Usuário"
              style={estilo.input}
              onChangeText={(value) => setUsuario(value)}
              value={usuario}
            />
            <TextInput
              secureTextEntry
              placeholder="Senha"
              style={estilo.input}
              onChangeText={(value) => setSenha(value)}
              value={senha}
            />
            <TextInput
              secureTextEntry
              placeholder="Confirme"
              style={estilo.input}
              onChangeText={(value) => setConfirmar(value)}
              value={confirmar}
            />

              <Picker
              selectedValue={perfil}
              mode="dropdown"
              onValueChange={setPerfil}
              style={estilo.input2}
            >
              <Picker.Item label="Cliente" value="cliente" />
            </Picker>
          </View>

          <View style={estilo.dados}>
            <Text style={estilo.titulo}>Endereço</Text>
            <Picker
              mode="dropdown"
              selectedValue={tipo}
              onValueChange={setTipo}
              style={estilo.input2}
            >
              <Picker.Item label="Tipo" value="Tipo" />
              <Picker.Item label="Av" value="Av" />
              <Picker.Item label="Rua" value="Rua" />
              <Picker.Item label="Al" value="Al" />
              <Picker.Item label="Praça" value="Praça" />
            </Picker>
            <TextInput
              placeholder="Logradouro"
              style={estilo.input}
              onChangeText={(value) => setLogradouro(value)}
              value={logradouro}
            />
            <TextInput
              placeholder="Número"
              style={estilo.input}
              onChangeText={(value) => setNumero(value)}
              value={numero}
            />
            <TextInput
              placeholder="Complemento"
              style={estilo.input}
              onChangeText={(value) => setComplemento(value)}
              value={complemento}
            />
            <TextInput
              placeholder="Bairro"
              style={estilo.input}
              onChangeText={(value) => setBairro(value)}
              value={bairro}
            />
            <TextInput
              placeholder="CEP"
              keyboardType="numeric"
              style={estilo.input}
              onChangeText={(value) => setCEPcli(value)}
              value={cepcli}
            />
          </View>
          <TouchableOpacity
            style={estilo.cadastrar}
            onPress={() => {
              us = usuario;
              sh = senha;
              pf = perfil;
              nome = nomecli;
              cpf = cpfcli;
              sx = sexo;
              tel = telefone;
              tp = tipo;
              lg = logradouro;
              nu = numero;
              cp = complemento;
              ba = bairro;
              cep = cepcli;

              efetuarCadastro();
              navigation.navigate("BottomTabNavigator")
            }}
          >
            <Text style={estilo.txtCadastrar}> Cadastrar </Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const estilo = StyleSheet.create({
  area: {
    backgroundColor: "#2ba97a",
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },

  fundo: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },



  titulo: {
    textAlign: "center",
    borderBottomColor: "silver",
    borderBottomWidth: 1,
    fontSize: 15,
    color: "black",
  },

  input: {
    width: "90%",
    padding: 10,
    marginLeft: "auto",
    marginRight: "auto",
    borderBottomColor: "silver",
    borderBottomWidth: 1,
    color: "black",
  },

  input2: {
    width: "90%",
    padding: 10,
    marginLeft: "auto",
    marginRight: "auto",
    borderBottomColor: "silver",
    borderBottomWidth: 1,
    color: "silver",
  },
  cadastrar: {
    width: "60%",
    backgroundColor: "#2ba97a",
    paddingVertical: 10,
    marginTop: 20,
    marginBottom: 50,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 5,
    borderColor: "white",
    borderWidth: 1,
  },
  txtCadastrar: {
    color: "white",
    textAlign: "center",
  },
  dados: {
    borderColor: "silver",
    borderWidth: 1,
    marginVertical: 5,
    width: "95%",
    padding: 20,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 5,
    backgroundColor: "white",
    marginBottom: 10,
    paddingTop: 20,
  },
  icon: {
    width: 100,
    height: 100,
    marginLeft: "auto",
    marginRight: "auto",
    marginVertical: 20,
  },
});

function efetuarCadastro() {
  fetch(`${host}/ProjetoApi/services/cliente/cadastro.php`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nomecliente: nome,
      cpf: cpf,
      sexo: sx,
      telefone: tel,
      tipo: tp,
      logradouro: lg,
      numero: nu,
      complemento: cp,
      bairro: ba,
      cep: cep,
      nomeusuario: us,
      senha: sh,
      perfil: pf,
    }),
  })
    .then((response) => response.json())
    .then((resposta) => {
      console.log(resposta);
      Alert.alert("Caso não apareça seus dados na aba de perfil, saia do aplicativo e faça login novamente por favor!! Desculpe o transtorno ");
    })
    .catch((error) => console.error(error));
}
