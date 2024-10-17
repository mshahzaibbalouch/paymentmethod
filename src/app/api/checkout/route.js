import paypal from '@paypal/checkout-server-sdk';
import { NextResponse } from 'next/server';

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;


const envirenment = new paypal.core.SandboxEnvironment(clientId, clientSecret);

const client = new paypal.core.PayPalHttpClient(envirenment);

export const POST = async () => {
    const request = new paypal.orders.OrdersCreateRequest();

    request.requestBody({
        "intent": "CAPTURE",
        "purchase_units": [
            {
                "amount": {
                    "currency_code": "USD",
                    "value": "10.00"
                },
                description: 'Next Js Application Testing'
            }
        ]
    });

    const response = await client.execute(request);
    console.log(response);


    return NextResponse.json({
        id: response.result.id
    })
}