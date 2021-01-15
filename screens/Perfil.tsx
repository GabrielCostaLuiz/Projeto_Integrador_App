import * as React from "react";
import { Text, View } from "../components/Themed";
import { RefreshControl, StyleSheet } from "react-native";
import * as SQLite from "expo-sqlite";
import { Image, ImageBackground } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Login";
import {BackHandler} from 'react-native';


const db = SQLite.openDatabase("appvendadb.banco");
const Stack = createStackNavigator();

export default function Perfil(){
  return (
    <Stack.Navigator initialRouteName="Perfil">
      <Stack.Screen name="TelaPerfil" component={TelaPerfil} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
  }



//-- constante para nos ajudar a pausar a tela enquanto o indicator relizar a animação
//de girar enquanto o refreshcontrol atualiza a tela
// const wait = (timeout) => {
//   return new Promise((resolver) => {
//     setTimeout(resolver, timeout);
//   });
// };

 function TelaPerfil({navigation}) {
  const [perfil, setPerfil] = React.useState([]);
  // const [dados, setDados] = React.useState([]);
  // vamos criar uma constante para realizar o refresh (atualização da tela)
  // const [refreshing,setRefreshing] = React.useState(false);

  //codificação de atualização dos controles 
  // const onRefresh = React.useCallback(()=>{
  //   setRefreshing(true);
  //   db.transaction((tx)=>{
  //     tx.executeSql("select * from itens",[],(_,{rows:{_array}})=>{
  //       setDados(_array);
  //     })
  //   })
  //   wait(2000).then(()=> setRefreshing(false));
  // },[]);

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("select * from perfil", [], (_, { rows: { _array } }) => {
        setPerfil(_array);
      });
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/images/papel.png")}
        style={tela.fundo}
      >
        <ScrollView>
        {perfil.map(
          ({
            id,
            idusuario,
            nomeusuario,
            nomecliente,
            cpf,
            sexo,
            telefone,
            tipo,
            logradouro,
            numero,
            complemento,
            bairro,
            cep,
            logado,
          }) => (
            <View style={tela.dados}>
              <Image source={require("../assets/images/perfil.png")} style={tela.img}></Image>
              <Text style={tela.letra}>              Usuário: {nomeusuario}              </Text>
              <Text style={tela.letra}>              Nome: {nomecliente}                 </Text>
              <Text style={tela.letra}>              CPF: {cpf}               </Text>
              <Text style={tela.letra}>              Sexo: {sexo}           </Text>
              <Text style={tela.letra}>              Telefone: {telefone}         </Text>
              <Text style={tela.letra}>                    Tipo: {tipo}                      </Text>
              <Text style={tela.letra}>              Logradouro: {logradouro}            </Text>
              <Text style={tela.letra}>                   Número: {numero}                    </Text>
              <Text style={tela.letra}>     Complemento: {complemento}    </Text>
              <Text style={tela.letra}>          Bairro: {bairro}               </Text>
              <Text style={tela.letra}>             CEP: {cep}                    </Text>

  
            </View>
          )
        )}

        {/* <TouchableOpacity style={tela.btnatt} onPress={()=>{

          alert("Tela de execucao")

           db.transaction((lm) => {
            lm.executeSql("select * from perfil", [], (_, { rows: { _array } }) => {
              console.log(_array);
            });
          });
        }}>
                <Text style={tela.link}>Atualizar Perfil</Text>
              </TouchableOpacity> */}

        <TouchableOpacity 
        style={tela.btndel}
         onPress={() => {
        
           db.transaction((tx) => {
             tx.executeSql("drop table perfil");
           });
          //  navigation.navigate("Login");

          BackHandler.exitApp()


}}
        >
          <Text style={tela.link} >Sair do aplicativo</Text>
        </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
const tela = StyleSheet.create({
  img: {
    width: 200,
    height: 180,
    flex: 1,
    resizeMode: "contain",
    marginBottom:10
  },
  link: {
    padding: 10,
  },

  letra: {
    color: "black",
    marginBottom:15,
    borderBottomColor: "silver",
    borderBottomWidth: 1,
    

  },

  dados: {
    borderColor: "orange",
    borderWidth: 1,
    marginVertical: 5,
    width: "95%",
    padding: 20,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 60,
    backgroundColor: "white",
    marginBottom: 10,
    paddingTop: 20,
    alignItems:"center"
  },

  fundo: {
    width: "100%",
    height: "100%",
  },

  btnatt: {
    backgroundColor: "green",
    marginBottom: 10,
    marginTop: 5,
    borderTopColor: "orange",
    borderRightColor: "orange",
    borderBottomColor: "orange",
    borderLeftColor: "orange",
    borderRadius: 55,
    borderWidth: 1,
    alignItems:"center",
    marginLeft:30,
    marginRight:30
  },

  btndel: {
    backgroundColor: "red",
    marginBottom: 10,
    marginTop: 5,
    borderTopColor: "orange",
    borderRightColor: "orange",
    borderBottomColor: "orange",
    borderLeftColor: "orange",
    borderRadius: 55,
    borderWidth: 1,
    alignItems:"center",
    marginLeft:30,
    marginRight:30
  },
});


