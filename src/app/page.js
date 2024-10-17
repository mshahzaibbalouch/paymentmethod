'use client';

import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import React from 'react'

const HomePage = () => {
  return (
    <div className='h-screen bg-black text-white flex justify-center items-center'>
      <PayPalScriptProvider
        options={{
          clientId: process.env.CLIENT_ID
        }}
      >
        <PayPalButtons
          style={{
            color: 'blue',
            layout: 'horizontal',
            label: 'paypal'
          }}
          createOrder={async () => {
            const res = await fetch('/api/checkout', {
              method: 'POST'
            });
            const data = await res.json();
            console.log(data);
            return data.id;
          }}
        onCancel={(data)=>{
          console.log(data);
          
        }}
        onApprove={(data, actions)=>{
          console.log(data);
          actions.order.capture();
        }}
        />
      </PayPalScriptProvider>
    </div>
  )
}

export default HomePage