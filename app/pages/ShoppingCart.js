import React, { useState, useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { Card, Button } from 'react-native-paper';
import Header from "../components/Header";
import * as helper from '../helpers/shopping-cart-helper';
import { useIsFocused } from "@react-navigation/native";

export default function ShoppingCart({ navigation }) {

    const [produtos, setProdutos] = useState([]);
    const [valorTotal, setValorTotal] = useState('');
    const [qtdItens, setQtdItens] = useState('');

    const isFocused = useIsFocused();

    useEffect(
        () => {

            setProdutos(null);
            setQtdItens(0);
            setValorTotal(0);

            setTimeout(() => { obterItens() }, 500);

            const sub = navigation.addListener('focus', () => {
                setTimeout(() => { obterItens() }, 500);
            })

        }, [navigation]
    );

    const obterItens = () => {

        helper.obterItens()
            .then(
                produtos => {

                    setProdutos(produtos);

                    helper.obterValorTotal().then(r => setValorTotal(r));
                    helper.obterQuantidadeItens().then(r => setQtdItens(r));
                }
            );
    }

    const adicionar = (produto) => {

        helper.adicionar(produto);
        setTimeout(() => { obterItens() }, 500);
    }

    const remover = (produto) => {

        helper.remover(produto);
        setTimeout(() => { obterItens() }, 500);
    }

    const removerTodos = () => {

        helper.removerTodos();
        setTimeout(() => { obterItens() }, 500);
    }

    return (
        <ScrollView style={{ backgroundColor: '#fff' }}>

            <Header navigation={navigation} />

            {
                produtos != null && qtdItens > 0 && <Card>
                    <Card.Title
                        title="Carrinho de compras"
                        subtitle="Gerencie os itens do seu pedido."
                        titleStyle={{ fontSize: 15 }}
                    />
                    <Card.Content>
                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                                Total do carrinho: R$ {valorTotal}
                            </Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 14 }}>
                                Quantidade de itens: {qtdItens}
                            </Text>
                        </View>
                    </Card.Content>
                </Card>
            }

            {
                produtos != null && qtdItens > 0 && produtos.map(function (item, i) {
                    return (
                        <Card key={i}>
                            <Card.Content>
                                <View>
                                    <Text style={{ fontWeight: 'bold' }}>
                                        {item.nome}
                                    </Text>
                                </View>
                                <View>
                                    <Text>
                                        Preço: R$ {item.preco}
                                    </Text>
                                </View>
                                <View>
                                    <Text>
                                        Quantidade: {item.quantidade}
                                    </Text>
                                </View>
                            </Card.Content>
                            <Card.Actions>
                                <Button icon="plus" mode="text"
                                    onPress={() => adicionar(item)}>
                                    Adicionar
                                </Button>
                                <Button icon="minus" mode="text"
                                    onPress={() => remover(item)}>
                                    Remover
                                </Button>
                            </Card.Actions>
                        </Card>
                    )
                })
            }

            {
                produtos != null && qtdItens > 0 && <Card>
                    <Card.Content>
                        <View style={{ marginTop: 10 }}>
                            <Button
                                style={{ fontWeight: 'bold' }}
                                mode="contained"
                                icon="cart-outline"
                                onPress={() => navigation.navigate('checkout')}>
                                Finalizar Pedido
                            </Button>
                        </View>

                        <View style={{ marginTop: 10 }}>
                            <Button
                                style={{ fontWeight: 'bold' }}
                                mode="outlined"
                                icon="minus"
                                onPress={() => removerTodos()}>
                                Limpar Carrinho de Compras
                            </Button>
                        </View>
                    </Card.Content>
                </Card>
            }

            {
                qtdItens == 0 && <Card>
                    <Card.Title
                        title="Carrinho de compras"
                        subtitle="Gerencie os itens do seu pedido."
                        titleStyle={{ fontSize: 15 }}
                    />
                    <Card.Content>
                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                                Não há produtos no seu carrinho de compras.
                            </Text>
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <Button
                                style={{ fontWeight: 'bold' }}
                                mode="outlined"
                                onPress={() => navigation.navigate('all-products')}>
                                Voltar
                            </Button>
                        </View>
                    </Card.Content>
                </Card>
            }

        </ScrollView>
    )
}