import axios from "axios";
import * as config from '../config/api-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getCategorias = () => {
    return axios.get(`${config.getBaseUri()}/api/categorias`)
        .then(
            response => {
                return response.data;
            }
        )
}

export const getProducts = (idCategoria = 0) => {

    var resource = "/api/cardapio";

    if (idCategoria > 0)
        resource = resource + "/" + idCategoria;

    return axios.get(`${config.getBaseUri()}${resource}`)
        .then(
            response => {
                return response.data;
            }
        )
}

export const postCliente = (data) => {

    return axios.post(`${config.getBaseUri()}/api/cliente`, data)
        .then(
            response => {
                return response.data;
            }
        )
}

export const postLogin = (data) => {

    return axios.post(`${config.getBaseUri()}/api/login`, data)
        .then(
            response => {
                return response.data;
            }
        )
}

export const postPedido = (data) => {

    return axios.post(`${config.getBaseUri()}/api/pedido`, data)
        .then(
            response => {
                return response.data;
            }
        )

}

axios.interceptors.request.use(
    async config => {

        //verificar se a requisição é para o ENDPOINT /api/pedido
        if(config.url.includes('api/pedido')) {

            var accessToken = await AsyncStorage.getItem('access_token');
            config.headers['Authorization'] = 'Bearer ' + accessToken;
        }

        return config;
    },
    error => {
        Promise.reject(error);
    }
)