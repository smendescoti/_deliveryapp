import React, { useState } from "react";
import { useForm, Controller } from 'react-hook-form';
import { Card, TextInput, Button } from 'react-native-paper';
import { ScrollView, Text, View, Alert } from "react-native";
import Header from "../components/Header";
import * as validators from '../validators/registration-validator';
import * as services from '../services/delivery-services';

export default function Registration({ navigation }) {

    const {
        control,
        handleSubmit,
        formState: {
            errors
        },
        reset
    } = useForm();

    const onSubmit = (data) => {

        services.postCliente(data)
            .then(
                result => {
                    Alert.alert('Parabéns!', result.message);
                    reset({
                        nome : '', email : '', telefone : '', senha : '', senhaConfirmacao : ''
                    })
                }
            )
            .catch(
                e => {
                    console.log(e.response.data);
                    Alert.alert('Falha', e.response.data.message);
                }
            )
    }

    return (
        <ScrollView style={{ backgroundColor: '#fff' }}>
            <Header navigation={navigation} />
            <Card>
                <Card.Title
                    title="Crie sua conta de cliente"
                    subtitle="Informe seus dados para criar a conta."
                    titleStyle={{ fontSize: 15 }}
                />
            </Card>
            <Card>
                <Card.Content>
                    <View style={{ marginBottom: 20 }}>
                        <Text>Nome do cliente:</Text>
                        <Controller
                            control={control}
                            name="nome"
                            defaultValue=""
                            rules={{
                                validate: validators.nomeValidator
                            }}
                            render={
                                ({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={{ height: 40, marginTop: 6 }}
                                        label="Informe seu nome"
                                        keyboardType="default"
                                        autoComplete="name"
                                        mode="outlined"
                                        placeholder="Digite aqui"
                                        onBlur={onBlur}
                                        onChangeText={value => onChange(value)}
                                        value={value}
                                    />
                                )
                            }
                        />

                        {
                            errors.email && <Text style={{
                                fontSize: 15,
                                color: '#BB2124'
                            }}>
                                {errors.email.message}
                            </Text>
                        }

                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Text>Email de acesso:</Text>
                        <Controller
                            control={control}
                            name="email"
                            defaultValue=""
                            rules={{
                                validate: validators.emailValidator
                            }}
                            render={
                                ({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={{ height: 40, marginTop: 6 }}
                                        label="Informe seu email"
                                        keyboardType="email-address"
                                        autoComplete="email"
                                        mode="outlined"
                                        placeholder="Digite aqui"
                                        onBlur={onBlur}
                                        onChangeText={value => onChange(value)}
                                        value={value}
                                    />
                                )
                            }
                        />

                        {
                            errors.email && <Text style={{
                                fontSize: 15,
                                color: '#BB2124'
                            }}>
                                {errors.email.message}
                            </Text>
                        }

                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Text>Telefone:</Text>
                        <Controller
                            control={control}
                            name="telefone"
                            defaultValue=""
                            render={
                                ({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={{ height: 40, marginTop: 6 }}
                                        label="Informe seu telefone"
                                        keyboardType="phone-pad"
                                        autoComplete="tel"
                                        mode="outlined"
                                        placeholder="Digite aqui"
                                        onBlur={onBlur}
                                        onChangeText={value => onChange(value)}
                                        value={value}
                                    />
                                )
                            }
                        />

                        {
                            errors.telefone && <Text style={{
                                fontSize: 15,
                                color: '#BB2124'
                            }}>
                                {errors.telefone.message}
                            </Text>
                        }

                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Text>Senha de acesso:</Text>
                        <Controller
                            control={control}
                            name="senha"
                            defaultValue=""
                            rules={{
                                validate: validators.senhaValidator
                            }}
                            render={
                                ({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={{ height: 40, marginTop: 6 }}
                                        label="Informe sua senha"
                                        keyboardType="default"
                                        secureTextEntry={true}
                                        mode="outlined"
                                        placeholder="Digite aqui"
                                        onBlur={onBlur}
                                        onChangeText={value => onChange(value)}
                                        value={value}
                                    />
                                )
                            }
                        />

                        {
                            errors.senha && <Text style={{
                                fontSize: 15,
                                color: '#BB2124'
                            }}>
                                {errors.senha.message}
                            </Text>
                        }

                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Text>Confirme sua Senha:</Text>
                        <Controller
                            control={control}
                            name="senhaConfirmacao"
                            defaultValue=""
                            rules={{
                                validate: validators.senhaValidator
                            }}
                            render={
                                ({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={{ height: 40, marginTop: 6 }}
                                        label="Confirme sua senha"
                                        keyboardType="default"
                                        secureTextEntry={true}
                                        mode="outlined"
                                        placeholder="Digite aqui"
                                        onBlur={onBlur}
                                        onChangeText={value => onChange(value)}
                                        value={value}
                                    />
                                )
                            }
                        />

                        {
                            errors.senha && <Text style={{
                                fontSize: 15,
                                color: '#BB2124'
                            }}>
                                {errors.senha.message}
                            </Text>
                        }

                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Button
                            style={{ fontWeight: 'bold' }}
                            mode="contained"
                            icon="check-circle"
                            onPress={handleSubmit(onSubmit)}>
                            Realizar Cadastro
                        </Button>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Button
                            style={{ fontWeight: 'bold' }}
                            mode="outlined"
                            icon="account-circle"
                            onPress={() => navigation.navigate('login')}>
                            Acessar Conta de Cliente
                        </Button>
                    </View>
                </Card.Content>
            </Card>
        </ScrollView>
    )
}