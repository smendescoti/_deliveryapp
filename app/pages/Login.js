import React, { useState } from "react";
import { useForm, Controller } from 'react-hook-form';
import { Card, TextInput, Button } from 'react-native-paper';
import { Alert, ScrollView, Text, View } from "react-native";
import Header from "../components/Header";
import * as validators from '../validators/login-validator';
import * as services from '../services/delivery-services';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {

    const {
        control,
        handleSubmit,
        formState: {
            errors
        },
        reset
    } = useForm();

    const onSubmit = (data) => {

        services.postLogin(data)
            .then(
                result => {

                    //gravando o token do usuário na AsyncStorage
                    AsyncStorage.setItem("access_token", result.accessToken);

                    //limpar os campos do formulário
                    reset({ email: '', senha: '' });

                    //redirecionar o usuário para a página de checkout
                    navigation.navigate('checkout');
                }
            )
            .catch(
                e => {
                    console.log(e.response.data);
                    Alert.alert('Falha!', e.response.data.message);
                }
            )
    }

    return (
        <ScrollView style={{ backgroundColor: '#fff' }}>
            <Header navigation={navigation} />
            <Card>
                <Card.Title
                    title="Acesse sua conta"
                    subtitle="Informe suas credenciais de acesso."
                    titleStyle={{ fontSize: 15 }}
                />
            </Card>
            <Card>
                <Card.Content>
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
                        <Button
                            style={{ fontWeight: 'bold' }}
                            mode="contained"
                            icon="check-circle"
                            onPress={handleSubmit(onSubmit)}>
                            Acessar Conta
                        </Button>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Button
                            style={{ fontWeight: 'bold' }}
                            mode="outlined"
                            icon="account-circle"
                            onPress={() => navigation.navigate('registration')}>
                            Criar Conta de Cliente
                        </Button>
                    </View>
                </Card.Content>
            </Card>
        </ScrollView>
    )
}