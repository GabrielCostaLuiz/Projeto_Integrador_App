import {
  Ionicons,
  MaterialIcons,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

import Cadastrar from "../screens/Cadastrar";
import Inicial from "../screens/Inicial";
import Login from "../screens/Login";
import Perfil from "../screens/Perfil";
import Carrinho from "../screens/Carrinho";
import Hamburguers from "../screens/Hamburguers";
//import Pagamento from "../screens/Pagamento";
// import PedidosRealizados from "../screens/PedidosRealizados";

import { BottomTabParamList, TabOneParamList, TabTwoParamList } from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Inicial"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Inicial"
        component={InicialNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIconF name="home" color={color} />,
        }}
      />

      <BottomTab.Screen
        name="Hamburguers"
        component={HamburguersNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIconF name="hamburger" color={color} />
          ),
        }}
      />

      <BottomTab.Screen
        name="Carrinho"
        component={CarrinhoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIconF name="shopping-cart" color={color} />
          ),
        }}
      />

      {/* <BottomTab.Screen
        name="PedidosRealizados"
        component={PedidosRealizadosNavigador}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIconI name="ios-list" color={color} />
          ),
        }}
      /> */}

      <BottomTab.Screen
        name="Perfil"
        component={PerfilNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIconF name="user-circle" color={color} />
          ),
        }}
      />

     
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <MaterialIcons size={30} style={{ marginBottom: -3 }} {...props} />;
}

function TabBarIconF(props: { name: string; color: string }) {
  return <FontAwesome5 size={30} style={{ marginBottom: -3 }} {...props} />;
}

function TabBarIconM(props: { name: string; color: string }) {
  return (
    <MaterialCommunityIcons size={30} style={{ marginBottom: -3 }} {...props} />
  );
}

function TabBarIconI(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab

const CadastrarStack = createStackNavigator();
const LoginStack = createStackNavigator();
const InicialStack = createStackNavigator();
const PerfilStack = createStackNavigator();
const CarrinhoStack = createStackNavigator();
const HamburguersStack = createStackNavigator();
// const PedidosRealizadosStack = createStackNavigator();
//const PagamentoStack = createStackNavigator();

function CadastrarNavigator() {
  return (
    <CadastrarStack.Navigator>
      <CadastrarStack.Screen
        name="Cadastrar"
        component={Cadastrar}
        options={{ headerTitle: "🍔 Cadastro 🍔", headerTitleAlign: "center", headerShown:false}}
      />
    </CadastrarStack.Navigator>
  );
}

function LoginNavigator() {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen
        name="Login"
        component={Login}
        options={{ headerTitle: "🍔 Login 🍔", headerTitleAlign: "center", headerShown:false }}
      />
    </LoginStack.Navigator>
  );
}

function InicialNavigator() {
  return (
    <InicialStack.Navigator>
      <InicialStack.Screen
        name="Inicial"
        component={Inicial}
        options={{ headerTitle: "🍔 Inicial 🍔", headerTitleAlign: "center", headerShown:false }}
      />
    </InicialStack.Navigator>
  );
}

function PerfilNavigator() {
  return (
    <PerfilStack.Navigator>
      <PerfilStack.Screen
        name="Perfil"
        component={Perfil}
        options={{ headerTitle: "🍔 Perfil 🍔", headerTitleAlign: "center", headerShown:false }}
      />
    </PerfilStack.Navigator>
  );
}

function CarrinhoNavigator() {
  return (
    <CarrinhoStack.Navigator>
      <CarrinhoStack.Screen
        name="Carrinho"
        component={Carrinho}
        options={{ headerTitle: "🍔 Carrinho 🍔", headerTitleAlign: "center", headerShown:false }}
      />
    </CarrinhoStack.Navigator>
  );
}

// function PedidosRealizadosNavigador() {
//   return (
//     <PedidosRealizadosStack.Navigator>
//       <PedidosRealizadosStack.Screen
//         name="PedidosRealizados"
//         component={PedidosRealizados}
//         options={{ headerTitle: "🍔 Pedidos Realizados 🍔", headerTitleAlign: "center", headerShown:false }}
//       />
//     </PedidosRealizadosStack.Navigator>
//   );
// }

function HamburguersNavigator() {
  return (
    <HamburguersStack.Navigator>
      <HamburguersStack.Screen
        name="Hamburguers"
        component={Hamburguers}
        options={{
          headerTitle: "🍔 Hamburguers 🍔",
          headerTitleAlign: "center", headerShown:false
        }}
      />
    </HamburguersStack.Navigator>
  );
}

// function PagamentoNavigador() {
//   return (
//     <PagamentoStack.Navigator>
//       <PagamentoStack.Screen
//         name="Pagamento"
//         component={Pagamento}
//         options={{ headerTitle: "🍔 Pagamento 🍔", headerTitleAlign: "center" }}
//       />
//     </PagamentoStack.Navigator>
//   );
// }
