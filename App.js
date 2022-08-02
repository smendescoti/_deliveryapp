import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AllProducts from "./app/pages/AllProducts";
import ShoppingCart from "./app/pages/ShoppingCart";
import Registration from "./app/pages/Registration";
import Login from "./app/pages/Login";
import Checkout from "./app/pages/Checkout";
import CheckoutSuccess from "./app/pages/CheckoutSuccess";

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="all-products" component={AllProducts} />
        <Stack.Screen name="shopping-cart" component={ShoppingCart} />
        <Stack.Screen name="registration" component={Registration} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="checkout" component={Checkout} />
        <Stack.Screen name="checkout-success" component={CheckoutSuccess} />
      </Stack.Navigator>
    </NavigationContainer>
  )

}