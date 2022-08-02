import React, { useState, useEffect } from "react";
import { useForm, Controller } from 'react-hook-form';
import { Alert, ScrollView, Text, View } from "react-native";
import { Card, Button, TextInput } from 'react-native-paper';
import Header from "../components/Header";
import * as helper from '../helpers/shopping-cart-helper';
import * as viacepServices from '../services/viacep-services';
import * as deliveryServices from '../services/delivery-services';

export default function Checkout({ navigation }) {

    const [produtos, setProdutos] = useState([]);
    const [valorTotal, setValorTotal] = useState('');
    const [qtdItens, setQtdItens] = useState('');
    const [endereco, setEndereco] = useState(null);

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

    const obterEndereco = (data) => {
        if (data.cep.length >= 8) {
            viacepServices.getEndereco(data.cep)
                .then(
                    (result) => {
                        setEndereco(result);
                    }
                )
                .catch(
                    (e) => {
                        console.log(e);
                    }
                )
        }
    }

    const onSubmit = (data) => {

        var itensPedido = [];
        for (var i = 0; i < produtos.length; i++) {
            itensPedido.push({
                idItem: produtos[i].id,
                quantidade: produtos[i].quantidade
            });
        }

        var pedido = {
            itensPedido: itensPedido,
            logradouro: endereco.logradouro,
            numero: data.numero,
            complemento: data.complemento,
            bairro: endereco.bairro,
            cidade: endereco.localidade,
            estado: endereco.uf,
            cep: endereco.cep
        }

        deliveryServices.postPedido(pedido)
            .then(
                result => {
                    console.log(result);
                    navigation.navigate('checkout-success');
                }
            )
            .catch(
                e => {
                    console.log(e);
                    Alert.alert('Falha', 'Ocorreu um erro, tente novamente.');
                }
            )
    }

    const {
        control,
        handleSubmit,
        formState: {
            errors
        },
        reset
    } = useForm();

    return (
        <ScrollView style={{ backgroundColor: '#fff' }}>

            <Header navigation={navigation} />

            <Card>
                <Card.Title
                    title="Finalizar Pedido"
                    subtitle="Confirme os dados para realizar seu pedido."
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

            {
                produtos != null && produtos.map(function (item, i) {
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
                                        Preço: R$ {item.preco},
                                        Qtd: {item.quantidade},
                                        Total: {item.preco * item.quantidade}
                                    </Text>
                                </View>
                            </Card.Content>
                        </Card>
                    )
                })
            }

            <Card>
                <Card.Content>
                    <View style={{ marginTop: -10 }}>
                        <Text>Informe o CEP de entrega:</Text>
                        <Controller
                            control={control}
                            name="cep"
                            defaultValue=''
                            render={
                                ({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={{ height: 40 }}
                                        label="Informe seu CEP aqui"
                                        keyboardType="number-pad"
                                        autoComplete="cc-number"
                                        mode="outlined"
                                        placeholder="Digite aqui"
                                        onBlur={onBlur}
                                        onChangeText={value => onChange(value)}
                                        value={value}
                                    />
                                )
                            }
                        />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Button
                            style={{ fontWeight: 'bold' }}
                            mode="outlined"
                            onPress={handleSubmit(obterEndereco)} >
                            Obter Endereço para entrega
                        </Button>
                    </View>

                    {
                        endereco != null && <View style={{ marginTop: 10, fontSize: 15 }}>
                            <Text>
                                {endereco.logradouro},
                            </Text>
                            <Text>
                                Bairro: {endereco.bairro}, Cidade: {endereco.localidade}, UF: {endereco.uf}
                            </Text>
                            <Text>
                                CEP: {endereco.cep}
                            </Text>
                        </View>
                    }

                    {
                        endereco != null && <View>
                            <View style={{ marginTop: 10 }}>
                                <Text>Número do endereço:</Text>
                                <Controller
                                    control={control}
                                    name="numero"
                                    defaultValue=''
                                    render={
                                        ({ field: { onChange, onBlur, value } }) => (
                                            <TextInput
                                                style={{ height: 40 }}
                                                label="Informe o número aqui"
                                                keyboardType="number-pad"
                                                autoComplete="cc-number"
                                                mode="outlined"
                                                placeholder="Digite aqui"
                                                onBlur={onBlur}
                                                onChangeText={value => onChange(value)}
                                                value={value}
                                            />
                                        )
                                    }
                                />
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <Text>Complemento ou ponto de referência:</Text>
                                <Controller
                                    control={control}
                                    name="complemento"
                                    defaultValue=''
                                    render={
                                        ({ field: { onChange, onBlur, value } }) => (
                                            <TextInput
                                                style={{ height: 40 }}
                                                label="Informe o complemento aqui"
                                                keyboardType="default"
                                                mode="outlined"
                                                placeholder="Digite aqui"
                                                onBlur={onBlur}
                                                onChangeText={value => onChange(value)}
                                                value={value}
                                            />
                                        )
                                    }
                                />
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <Button
                                    style={{ fontWeight: 'bold' }}
                                    mode="contained"
                                    icon="cart-outline"
                                    onPress={handleSubmit(onSubmit)}
                                >
                                    Confirmar e Realizar Pedido
                                </Button>
                            </View>
                        </View>
                    }

                </Card.Content>
            </Card>

        </ScrollView>
    )
}