import * as React from "react";
import {host} from '../config/settings';
import { Text, View } from "../components/Themed";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

import * as SQLite from "expo-sqlite";

export default function DetalheProduto({ route }) {
  const { idproduto } = route.params;
  const [carregado, setCarregado] = React.useState(true);
  const [dados, setDados] = React.useState([]);

  React.useEffect(() => {
    fetch(
      `${host}/ProjetoApi/services/produto/detalheproduto.php?idproduto=${idproduto}`
    )
      .then((response) => response.json())
      .then((produto) => setDados(produto.saida))
      .catch((error) =>
        console.error(`Erro ao tentar carregar o produto ${error}`)
      )
      .finally(() => setCarregado(false));
  }, []);

  return (
    <View>
      <ImageBackground
        source={require("../assets/images/papel.png")}
        style={tela.fundo}
      >
        {carregado ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={dados}
            renderItem={({ item }) => (
              <View style={tela.view}>
                <Text style={tela.letraproduto}>🍔{item.nomeproduto}🍔</Text>
                <Image
                  source={{
                    uri: `${host}/ProjetoApi/img/${item.foto}`,
                  }}
                  style={tela.img}
                />
                <Text style={tela.letradescri}>{item.descricao}</Text>
                <Text style={tela.valor}>R${item.preco}</Text>

                <TouchableOpacity
                  style={tela.btnadd}
                  onPress={() => {
                    adicionarAoCarrinho(
                      `${idproduto}`,
                      `${item.nomeproduto}`,
                      `${item.preco}`,
                      `${item.foto}`
                    );
                  }}
                >
                  <Text style={tela.link}> Adicionar ao Carrinho </Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={({ idproduto }, index) => idproduto}
          />
        )}
      </ImageBackground>
    </View>
  );
}

const tela = StyleSheet.create({
  img: {
    width: 300,
    height: 300,
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 20,
  },

  letraproduto: {
    color: "white",
    textAlign: "center",
    marginBottom: 19,
    fontSize: 35.3,
    marginTop: 20,
  },

  letradescri: {
    color: "black",
    margin: 10,
    marginTop: 10,
    marginBottom: 5,
    padding: 5,
    fontSize: 15,
    backgroundColor: "white",
    borderRadius: 10,
  },

  link: {
    padding: 10,
  },

  fundo: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  view: {
    backgroundColor: "rgba(0,0,0,0.9)",
    alignItems: "center",
    borderTopColor: "orange",
    borderRightColor: "orange",
    borderBottomColor: "orange",
    borderLeftColor: "orange",
    borderRadius: 50,
    borderWidth: 1,
  },

  valor: {
    color: "white",
    fontSize: 25,
  },

  btnadd: {
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
//Fazer a constante do banco de dados. Vamos chamar de db

const db = SQLite.openDatabase("appvendadb.banco");

function adicionarAoCarrinho(id, nome, preco, foto) {
  db.transaction((tx) => {
    tx.executeSql(
      "create table if not exists itens(id integer primary key,idproduto int,nomeproduto text, preco text, quantidade int, foto text);"
      );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "insert into itens(idproduto,nomeproduto,preco,quantidade,foto)values(?,?,?,?,?)",
      [id, nome, preco, 1, foto]
    );
    tx.executeSql("select * from itens", [], (_, { rows }) => {
      console.log(JSON.stringify(rows));
    });
    alert("Adicionado ao carrinho, atualize a página do carrinho arrastando para baixo");
  });
}
