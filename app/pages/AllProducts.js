import React, { useState, useEffect } from "react";
import { ScrollView, Text, View, Alert } from "react-native";
import { Button, Card, TextInput } from "react-native-paper";
import * as services from '../services/delivery-services';
import * as config from '../config/api-config';
import * as helper from '../helpers/shopping-cart-helper';
import Header from "../components/Header";
import { Picker } from "@react-native-picker/picker";

export default function AllProducts({ navigation }) {

    const [produtos, setProdutos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [idCategoria, setIdCategoria] = useState('');

    useEffect(
        () => {
            obterProdutos();
            obterCategorias();
        }, []
    )

    obterProdutos = () => {
        services.getProducts()
            .then(
                data => {
                    setProdutos(data);
                }
            )
            .catch(
                e => {
                    console.log(e);
                }
            )
    }

    obterCategorias = () => {
        services.getCategorias()
            .then(
                data => {
                    setCategorias(data);
                }
            )
            .catch(
                e => {
                    console.log(e);
                }
            )
    }

    filtrarProdutos = (idCategoria) => {

        setIdCategoria(idCategoria);

        services.getProducts(idCategoria)
            .then(
                data => {
                    setProdutos(data);
                }
            )
            .catch(
                e => {
                    console.log(e);
                }
            )
    }

    const adicionarProduto = (item) => {

        let produto = {
            id: item.id,
            nome: item.nome,
            preco: item.precoDecimal
        };

        //adicionar o item no carrinho de compras
        helper.adicionar(produto);

        navigation.navigate('shopping-cart');
    }

    return (
        <ScrollView style={{ backgroundColor: '#fff' }}>

            <Header navigation={navigation} />

            <View style={{ backgroundColor: '#fff' }}>
                <Picker
                    selectedValue={idCategoria}
                    onValueChange={
                        (itemValue, itemIndex) => filtrarProdutos(itemValue)
                    }
                >
                    <Picker.Item label="Todas as categorias" value="0" />

                    {
                        categorias.map(function (item, i) {
                            return (
                                <Picker.Item
                                    key={i}
                                    label={item.nome}
                                    value={item.id}
                                />
                            )
                        })
                    }

                </Picker>
            </View>

            {
                produtos.map(function (item, i) {
                    return (
                        <Card key={i} style={{ backgroundColor: '#fff' }}>
                            <Card.Title
                                title={item.nome}
                                subtitle={item.preco}
                                titleStyle={{ fontSize: 18 }}
                                subtitleStyle={{ fontSize: 16, fontWeight: 'bold' }}
                            />
                            <Card.Content>
                                <Text style={{ fontWeight: 'bold' }}>
                                    {item.categoria.nome}
                                </Text>
                                <Text style={{ marginBottom: 20 }}>
                                    {item.descricao}
                                </Text>
                            </Card.Content>
                            <Card.Cover
                                source={{ uri: `${config.getBaseUri()}${item.foto}` }}
                            />
                            <Card.Actions>
                                <Button
                                    style={{ fontWeight: 'bold' }}
                                    mode="contained"
                                    icon="cart-outline"
                                    onPress={() => adicionarProduto(item)}
                                >
                                    Adicionar ao pedido
                                </Button>
                            </Card.Actions>
                        </Card>
                    )
                })
            }
        </ScrollView>
    )
}