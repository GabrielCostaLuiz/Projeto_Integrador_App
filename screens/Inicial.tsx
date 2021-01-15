import { template } from "@babel/core";
import { Foundation } from "@expo/vector-icons";
import * as React from "react";
import { Text, View } from "../components/Themed";
import {
  ImageBackground,
  ActivityIndicator,
  Image,
  StyleSheet,
  Button,
} from "react-native";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import NumberFormat from "react-number-format";
import { createStackNavigator } from "@react-navigation/stack";
import DetalheProduto from "./DetalheProduto";

const Stack = createStackNavigator();

export default function Inicial() {
  return (
    <Stack.Navigator initialRouteName="Produtos">
      <Stack.Screen name="Produtos" component={Produtos} />
      <Stack.Screen name="DetalheProduto" component={DetalheProduto} />
    </Stack.Navigator>
  );
}

function Produtos({ navigation }) {
  const [dados, setDados] = React.useState([]);
  const [carregado, setCarregado] = React.useState(true);

  React.useEffect(() => {
    fetch(
      "http://192.168.0.13/projetoApi/services/produto/listartelainicial.php"
    )
      .then((response) => response.json())
      .then((nome) => setDados(nome.saida)) /* muda o nome dps*/
      .catch((error) => console.log(`Erro ao tentar carregar a api ${error}`))
      .finally(() => setCarregado(false));
  }, []);

  return (
    <ImageBackground
      source={require("../assets/images/papel.png")}
      style={tela.fundo}
    >
      <ScrollView>
        <Text style={tela.letra}>
          🔥Confira nossos destaques🔥
          <Text style={{ color: "red" }}>OS MAIS VENDIDOS</Text>
        </Text>
        {carregado ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={dados}
            renderItem={({ item }) => (
              <View style={tela.container}>
                <Text style={tela.letraproduto}>🔥{item.nomeproduto}🔥</Text>
                <Image
                  source={{
                    uri: `http://192.168.0.13/projetoApi/img/${item.foto}`,
                  }}
                  style={tela.img}
                />

                <NumberFormat
                  value={item.preco}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"R$"}
                  renderText={(valor) => <Text style={tela.valor}>{valor}</Text>}
                />

                <TouchableOpacity
                style={tela.btninfo}
                  onPress={() => {
                    navigation.navigate("DetalheProduto", {
                      idproduto: `${item.idproduto}`,
                    });
                  }}
                >
                  <Text style={tela.link}> Descrição do Lanche </Text>
                </TouchableOpacity>
              </View>
            )} /* FIM do renderItem*/
            keyExtractor={({ idproduto }, index) => idproduto}
          />
        )}
      </ScrollView>
    </ImageBackground>
  );
}

const tela = StyleSheet.create({
  img: {
    width: 300,
    height: 300,
    flex: 1 /* se tiver mais de uma imagem fica um embaixo do outro, se não tiver deixa no centro */,
    marginBottom: 10,
    borderRadius: 20,
  },

  letraproduto: {
    color: "white",
    textAlign: "center",
    marginBottom: 19,
    fontSize: 35.3,
    marginTop: 20,
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

  container: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 9,
    borderTopColor: "orange",
    borderRightColor: "orange",
    borderBottomColor: "orange",
    borderLeftColor: "orange",
    borderRadius: 55,
    borderWidth: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
  },

  fundo: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  link: {
    padding: 10,
    color: "white",
  },

  valor: {
    color: "white",
    fontSize: 25,
  },

  btninfo: {
    backgroundColor: "green",
    marginBottom: 10,
    marginTop: 5,
    borderTopColor: "orange",
    borderRightColor: "orange",
    borderBottomColor: "orange",
    borderLeftColor: "orange",
    borderRadius: 55,
    borderWidth: 1,
  },
});
