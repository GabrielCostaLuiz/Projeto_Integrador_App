import * as React from "react";
import { Text, View } from "../components/Themed";

import * as SQLite from "expo-sqlite";
import { Image, StyleSheet, ImageBackground, RefreshControl } from "react-native";
import { TextInput } from "react-native";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import Pagamento from "./Pagamento";

const db = SQLite.openDatabase("appvendadb.banco");
const Stack = createStackNavigator();

export default function Carrinhoo(){
return (
  <Stack.Navigator initialRouteName="Carrinho">
    <Stack.Screen name="Carrinho" component={Carrinho} />
    <Stack.Screen name="Pagamento" component={Pagamento} />
  </Stack.Navigator>
);
}

//-- constante para nos ajudar a pausar a tela enquanto o indicator relizar a animação
//de girar enquanto o refreshcontrol atualiza a tela
const wait = (timeout) => {
  return new Promise((resolver) => {
    setTimeout(resolver, timeout);
  });
};

 function Carrinho({ navigation }) {
  const [dados, setDados] = React.useState([]);
  //const [quantidade, setQuantidade] = React.useState(1);

  //-- vamos criar uma constante para realizar o refresh (atualização da tela)
  const [refreshing,setRefreshing] = React.useState(false);

  //codificação de atualização dos controles 
  const onRefresh = React.useCallback(()=>{
    setRefreshing(true);
    db.transaction((tx)=>{
      tx.executeSql("select * from itens",[],(_,{rows:{_array}})=>{
        setDados(_array);
      })
    })
    wait(2000).then(()=> setRefreshing(false));
  },[]);

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("select * from itens", [], (_, { rows: { _array } }) => {
        setDados(_array);
      });
    });
  }, []);

  return (
    <View style={{ flex: 1, }}>
       <ImageBackground
      source={require("../assets/images/papel.png")}
      style={tela.fundo}
    >

      <ScrollView /**contentContainerStyle={{flex:1}} **/
      refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
      }>

      {dados.map(({ id, idproduto, nomeproduto, preco, foto }) => (
        <View style={tela.container} key={idproduto}> 
          <Image
            source={{ uri: `http://192.168.0.13/projetoApi/img/${foto}` }}
            style={tela.img}
          />
          <Text style={tela.letra2}>Produto: {nomeproduto}</Text>
          <Text style={tela.letra2}>Preço: R${preco}</Text>
          {/* <Text style={tela.letra2}>Quantidade:</Text> */}
          {/* <TextInput
            placeholder="1"
            value={quantidade}
            onChangeText={(value) => setQuantidade(value)}
            style={{backgroundColor:"white",color:"blue",width:30}}
          /> */}
          <TouchableOpacity
          style={tela.btntira}
            onPress={() => {
              db.transaction((tx) => {
                tx.executeSql("delete from itens where id=?", [id]);
              });
              alert("Arraste para baixo para atualizar o carrinho")
            }}
          >
            <Text style={tela.link}>Tirar do Carrinho</Text>
          </TouchableOpacity>
          </View>
      ))}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Pagamento");
        }}
      >
        <Text style={tela.pagamento}>Ir para pagamento</Text>
      </TouchableOpacity>
      </ScrollView>
      </ImageBackground>
    </View>
  );
}
const tela = StyleSheet.create({
  img: {
    width: 300,
    height: 300,
    flex: 1,
    marginBottom: 10,
    borderRadius: 20,
    marginTop:10

  },
  link: {
    padding: 10,
  
  },

  container: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 30,
    borderTopColor: "orange",
    borderRightColor: "orange",
    borderBottomColor: "orange",
    borderLeftColor: "orange",
    borderRadius: 55,
    borderWidth: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    flex: 1,

  },

  btntira: {
    backgroundColor: "red",
    marginBottom: 10,
    marginTop: 5,
    borderTopColor: "orange",
    borderRightColor: "orange",
    borderBottomColor: "orange",
    borderLeftColor: "orange",
    borderRadius: 55,
    borderWidth: 1,
  },

  pagamento:{
    backgroundColor: "green",
    marginBottom: 10,
    marginTop: 5,
    borderTopColor: "orange",
    borderRightColor: "orange",
    borderBottomColor: "orange",
    borderLeftColor: "orange",
    borderRadius: 55,
    borderWidth: 1,
    padding:10,
    width:"100%",
    textAlign:"center"
  },

  fundo: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },

  letra: {
    color: "white",
    textAlign: "center",
    padding: 20,
    fontSize: 22,
    borderTopColor: "orange",
    borderRightColor: "orange",
    borderBottomColor: "orange",
    borderLeftColor: "orange",
    borderRadius: 20,
    borderWidth: 1,
  },

  letra2:{
    fontSize:18

  },
});
