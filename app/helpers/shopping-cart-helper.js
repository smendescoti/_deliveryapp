import AsyncStorage from "@react-native-async-storage/async-storage";

const CARRINHO_DE_COMPRAS = "carrinho_de_compras";
const VALOR_TOTAL_CARRINHO = "valor_total_carrinho";
const QTDITENS_CARRINHO = "qtditens_carrinho";

//função para adicionar produto no carrinho de compras
export const adicionar = async (produto) => {

    try {

        //ler todos os itens contidos na AsyncStorage
        let json = await AsyncStorage.getItem(CARRINHO_DE_COMPRAS);
        let itens = JSON.parse(json);

        //verificar se o carrinho de compras ja estava vazio
        if (itens == null) {
            itens = [];
        }

        //verificando se o produto já existe no carrinho de compras
        var itemJaExiste = false;
        for (var i = 0; i < itens.length; i++) {
            var item = itens[i];

            //se o produto já existir, aumentamos a quantidade do produto
            if (item.id == produto.id) {
                item.quantidade = item.quantidade + 1;
                itemJaExiste = true;
                break;
            }
        }

        //se o produto não existir, adicionamos o produto no carrinho
        if (!itemJaExiste) {
            produto.quantidade = 1;
            itens.push(produto);
        }

        //calcular o valor total e a quantidade de itens do carrinho
        let valorTotal = 0;
        let quantidadeItens = 0;

        for (var i = 0; i < itens.length; i++) {
            var item = itens[i];

            valorTotal += item.preco * item.quantidade;
            quantidadeItens += item.quantidade;
        }

        //gravar todas as informações na AsyncStorage
        await AsyncStorage.setItem(CARRINHO_DE_COMPRAS, JSON.stringify(itens));
        await AsyncStorage.setItem(VALOR_TOTAL_CARRINHO, String(valorTotal));
        await AsyncStorage.setItem(QTDITENS_CARRINHO, String(quantidadeItens));

        console.log('Produto adicionado com sucesso: ' + JSON.stringify(produto));
    }
    catch (e) {
        console.log(e);
    }
}

//função para remover 1 item do carrinho de compras
export const remover = async (produto) => {

    try {

        //ler todos os itens contidos no carrinho de compras
        let json = await AsyncStorage.getItem(CARRINHO_DE_COMPRAS);
        let itens = JSON.parse(json);

        //percorrer os itens
        for (var i = 0; i < itens.length; i++) {
            var item = itens[i];

            if (item.id == produto.id) {
                item.quantidade = item.quantidade - 1;
                break;
            }
        }

        //remover todos os itens com quantidade = 0
        const carrinho = itens.filter((i) => i.quantidade > 0);

        //calcular o valor total e a quantidade de itens do carrinho
        let valorTotal = 0;
        let quantidadeItens = 0;

        for (var i = 0; i < carrinho.length; i++) {
            var item = carrinho[i];

            valorTotal += item.preco * item.quantidade;
            quantidadeItens += item.quantidade;
        }

        //gravar todas as informações na AsyncStorage
        await AsyncStorage.setItem(CARRINHO_DE_COMPRAS, JSON.stringify(carrinho));
        await AsyncStorage.setItem(VALOR_TOTAL_CARRINHO, String(valorTotal));
        await AsyncStorage.setItem(QTDITENS_CARRINHO, String(quantidadeItens));

        console.log('Produto adicionado com sucesso: ' + JSON.stringify(produto));
    }
    catch (e) {
        console.log(e);
    }
}

//função para limpar todos os itens do carrinho de compras
export const removerTodos = async () => {

    await AsyncStorage.removeItem(CARRINHO_DE_COMPRAS);
    await AsyncStorage.setItem(VALOR_TOTAL_CARRINHO, String(0));
    await AsyncStorage.setItem(QTDITENS_CARRINHO, String(0));
}


//função para retornar todos os itens adicionados no carrinho de compras
export const obterItens = async () => {

    try {
        let json = await AsyncStorage.getItem(CARRINHO_DE_COMPRAS);
        return JSON.parse(json);
    }
    catch (e) {
        console.log(e);
    }
}

//função para retornar o valor total do carrinho de compras
export const obterValorTotal = async () => {

    try {
        let valor = await AsyncStorage.getItem(VALOR_TOTAL_CARRINHO);
        return String(valor);
    }
    catch (e) {
        console.log(e);
    }
}

//função para retornar a quantidade de itens do carrinho de compras
export const obterQuantidadeItens = async () => {

    try {
        let quantidade = await AsyncStorage.getItem(QTDITENS_CARRINHO);
        return String(quantidade);
    }
    catch (e) {
        console.log(e);
    }
}