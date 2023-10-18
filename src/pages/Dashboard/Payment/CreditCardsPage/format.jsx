function formatCardNumber(value) {
    // Remove tudo o que não for dígito
    value = value.replace(/\D/g, '');

    value = value.slice(0, 16);
    // Insere hífen a cada grupo de quatro dígitos

    return value;
}

function formatCardExpiry(value) {
    // Remove tudo o que não for dígito
    value = value.replace(/\D/g, '');

    value = value.slice(0, 4);
    // Insere barra entre o mês e o ano
    value = value.replace(/(\d{2})(\d{2})/, '$1/$2');

    return value;
}

function formatCardCvc(value) {
    // Remove tudo o que não for dígito
    value = value.replace(/\D/g, '');

    // Limita o campo a 4 dígitos
    value = value.slice(0, 4);

    return value;
}

function formatCardName(value) {
    value = value.replace(/[^a-zA-Z\s]/g, '');

    return value;
}

function formatCardAll(form) {
    const name = form.name.length >= 3;
    const cvc = /^[0-9]{3,4}$/.test(form.cvc);
    const expiry = /^\d{2}\/\d{2}$/.test(form.expiry);
    const number = form.number.length === 16;
    if (name && cvc && expiry && number) {
        return true;
    }
    return false;
}

const cardFormat = {
    formatCardCvc,
    formatCardExpiry,
    formatCardNumber,
    formatCardName,
    formatCardAll,
};

export default cardFormat;