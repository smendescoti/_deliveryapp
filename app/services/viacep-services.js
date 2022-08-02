import axios from 'axios';

export const getEndereco = (cep) => {
    return axios.get(`https://viacep.com.br/ws/${cep}/json`)
        .then(
            response => {
                return response.data;
            }
        )
}