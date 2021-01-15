import * as React from "react";
import { Text, View } from "../components/Themed";
import { Picker, StyleSheet, ImageBackground } from "react-native";
import {
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";

import * as SQLite from "expo-sqlite";
import Carrinhoo from "./Carrinho";

const db = SQLite.openDatabase("appvendadb.banco");

const Stack = createStackNavigator();

let idc = 0;
let tp = "";
let ds = "";
let vl = "";
let qp = 0;
let vp = "";
let total = "";

export default function Pagamento() {
  return (
    <Stack.Navigator initialRouteName="TelaPagamento">
      <Stack.Screen name="TelaPagamento" component={TelaPagamento} />
      <Stack.Screen name="Carrinho" component={Carrinhoo} />
    </Stack.Navigator>
  );
}

function TelaPagamento({navigation}) {
  const [tipo, setTipo] = React.useState("");
  const [parcelas, setParcelas] = React.useState(1);
  const [idcliente, setIdCliente] = React.useState(0);
  const [produtos, setProdutos] = React.useState([])

  // constantes de passagem de dados

  const [descricao, setDescricao] = React.useState("");
  const [valor, setValor] = React.useState("");
  const [vParcela, setVParcelas] = React.useState("");

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "select idcliente from perfil",
        [],
        (_, { rows: { _array } }) => {
          setIdCliente(_array[0].idcliente.toString());
          console.log(_array);
        }
      );

      //db.transaction((tl)=> {
      tx.executeSql("select * from itens", [], (_, { rows: { _array } }) => {
        setProdutos(_array);
        console.log(_array);
      });


      
    //Vamos fazer uma nova consulta para calcular o valor total dos produtos no carrinho
    //db.transaction((tn)=> {
    tx.executeSql(
        "select sum(preco) as total from itens",
        [],
        (_, { rows: { _array } }) => {
          setValor(_array[0].total.toString());
          console.log(_array[0].total.toString());
        }
      );
    });
  }, []);

  return (
    <View style={estilo.area}>
      <ImageBackground
        source={require("../assets/images/papel.png")}
        style={estilo.fundo}
      >
        <View style={estilo.dados}>
          <ScrollView>

          <Text style={estilo.titulo}>Informações do pagamento</Text>

            <Text style={estilo.letra}>Valor a pagar</Text>

            <TextInput
              style={estilo.input}
              keyboardType="decimal-pad"
              placeholder="R$ 00"
              value={valor}
              onChangeText={(value) => setValor(value)}
            />

            <Text style={estilo.letra}>Tipo de pagamento</Text>

            <Picker
              style={estilo.input2}
              selectedValue={tipo}
              mode="dropdown"
              onValueChange={setTipo}
            >
              <Picker.Item label="Boleto" value="Boleto" />
              <Picker.Item label="Crédito" value="Crédito" />
              <Picker.Item label="Débito" value="Débito" />
            </Picker>

            <Text style={estilo.letra}>Detalhe</Text>
            <TextInput
              style={estilo.input}
              placeholder="Detalhes do pagamento"
              value={descricao}
              onChangeText={(value) => setDescricao(value)}
            />

            <Text style={estilo.letra}>Parcelar em</Text>
            <Picker
              style={estilo.input3}
              selectedValue={parcelas}
              mode="dropdown"
              onValueChange={(parcelas) => {
                setParcelas(parcelas);
                setVParcelas((parseFloat(valor) / parcelas).toString());
              }}
            >
              {/* <Picker.Item label="Escolha em quantas vezes irá parcelar" /> */}
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
            </Picker>

            <Text style={estilo.letra}>Valor da parcela</Text>
            <TextInput
              style={estilo.input}
              keyboardType="number-pad"
              placeholder="R$ 00"
              value={vParcela}
              onChangeText={(value) => setVParcelas(value)}
            />

            <TouchableOpacity
              onPress={() => {
                // passagens de dados do formulário para as variáveis e depois cadastro do pgamento
                idc = idcliente;
                tp = tipo;
                ds = descricao;
                vl = valor;
                qp = parcelas;
                vp = vParcela;
                efetuarPagamento();

                navigation.navigate("Carrinho");
              }}
              
              style={estilo.btnpagar}
            >
              <Text style={estilo.link}>Pagar</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
}

const estilo = StyleSheet.create({
  fundo: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },

  letra: {
    color: "black",
    marginTop: 10,
  },


  area: {
    backgroundColor: "#2ba97a",
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
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

  titulo: {
    textAlign: "center",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    fontSize: 15,
    color: "black",
    marginBottom:2
  },

  input: {
    width: "90%",
    borderBottomColor: "silver",
    borderBottomWidth: 1,
    color: "black",
  },

  input2: {
    width: "90%",
    borderBottomColor: "silver",
    borderBottomWidth: 1,
    color: "silver",

  },

  input3: {
    width: "90%",
    borderBottomColor: "silver",
    borderBottomWidth: 1,
    color: "red",

  },
  link: {
    padding: 10,
    color: "white",
  },

  btnpagar: {
    backgroundColor: "green",
    marginTop: 20,
    width:"60%",
    borderTopColor: "orange",
    borderRightColor: "orange",
    borderBottomColor: "orange",
    borderLeftColor: "orange",
    borderRadius: 55,
    borderWidth: 1,
    alignItems:"center",
    marginLeft:55
  },

  label:{
    color:"red"
  }
  
});

function efetuarPagamento() {

  console.log(idc+" - "+tp+" - "+ds+" - "+vl+" - "+qp+" - "+vp)

  fetch("http://192.168.0.13/projetoApi/services/pagamento/cadastro.php", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idcliente: idc,
      tipo: tp,
      descricao: ds,
      valor: vl,
      parcelas: qp,
      valorparcela: vp,
    }),
  })
    .then((response) => response.json())
    .then((resposta) => {
      console.log(resposta);
      alert("Seu pagamento foi efetuado");
    })
    .catch((error) => console.error(error));

  limparCarrinho();
}

function limparCarrinho() {
  db.transaction((tx) => {
    tx.executeSql("delete from itens");
  });
}
