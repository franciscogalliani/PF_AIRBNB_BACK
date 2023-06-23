import mercadopago from "mercadopago";
import dotenv from 'dotenv';

dotenv.config();
const { ACCESS_TOKEN } = process.env;

mercadopago.configure({
    access_token: ACCESS_TOKEN as any,
});

//en teoria esta funcion deberia retornar un Id de mercado pago

const mercadoPagoPreference = async (title: string, unit_price: number) => {
    let preference = {
        items: [
            {
                title,
                unit_price,
                quantity: 1
            },
        ],
        back_urls: {
            success: "",
            failure: "",
            pending: ""
        },

        auto_return: "approved"
    };

    const responses = await mercadopago.preferences
        .create(preference as any);

    return responses.body.id

}


export default mercadoPagoPreference;