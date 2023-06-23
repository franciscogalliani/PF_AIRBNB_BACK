const mercadopago = require("mercadopago");

mercadopago.configure({
    access_token: "Aqui  deberia estar un token de acceso! Atte: Willaims",
});

//en teoria esta funcion deberia retornar un Id de mercado pago

const createPreference = async (title: string, unit_price: string, quantity: string) => {
    let preference = {
        items: [
            {
                title,
                unit_price,
                quantity,
            },
        ],
    };

    const responses = await mercadopago.preferences
        .create(preference);

    return responses.body.id

}