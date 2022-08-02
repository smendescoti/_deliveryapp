export const nomeValidator = (value) => {

    if (value.trim().length == 0)
        return 'Por favor, informe o seu nome.';

    else if (value.trim().length < 8)
        return 'Por favor, informe no mínimo 6 caracteres.';

    return true;
}

export const emailValidator = (value) => {

    if (value.trim().length == 0)
        return 'Por favor, informe o seu email.';

    else if (!/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/.test(value))
        return 'Por favor, informe um endereço de email válido';

    return true;
}

export const senhaValidator = (value) => {

    if (value.trim().length == 0)
        return 'Por favor, informe a sua email.';

    else if (value.trim().length < 8)
        return 'Por favor, informe no mínimo 8 caracteres.';

    return true;
}