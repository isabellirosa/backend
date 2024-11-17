import express from 'express';
import cors from 'cors';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const app = express();
app.use(cors());
app.use(express.json());

// Configure Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: 'APP_USR-8079640270535236-082419-cdffa99af5d8ba5a7f3675a1c0cb8e75-1955402575'
});

// Criando a rota para criar a preferência
app.post('/create_preference', async (req, res) => {
    try{
        const body = {
            items: [
              {
                title: req.body.title,
                quantity: Number(req.body.quantity),
                unit_price: Number(req.body.price),
                currency_id : "ARS"
              }
            ],
        

    back_urls: {
      success: 'http://localhost:5174/pagamento/success',
      failure: 'http://localhost:5174/pagamento/failure',
      pending: 'http://localhost:5174/pagamento/pending',
    },
    auto_return: 'approved',
  };

  // Criação da preferência de pagamento
  const preference = new Preference(client);

const result = await preference.create({ body });
res.json({
    id:result.id
});
} catch  (error) {
    console.log(error)
    res.status(500).json({ error: 'Erro ao criar preferência', details: error });
}

//   // Criar a preferência de pagamento
//   preference.create({ body: preferenceData })
//     .then(response => {
//       res.json({ id: response.body.id });
//     })
//     .catch(error => {
//       res.status(500).json({ error: 'Erro ao criar preferência', details: error });
//     });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});




// import express from "express";
// import mercadopago from "mercadopago";
// import cors from "cors";

// // Criação do app Express
// const app = express();
// app.use(cors());
// app.use(express.json());

// // Configuração do Mercado Pago
// mercadopago.configurations.setAccessToken('TEST-8b5469c2-0110-426d-9d4a-bb32f6af398b');

// // Rota para criar a preferência de pagamento
// app.get("/create_preference", (req, res) => {
//   const preference = {
//     items: [
//       {
//         title: "Produto Exemplo",
//         quantity: 1,
//         unit_price: 100, // Exemplo de preço
//       }
//     ],
//     payer: {
//       name: "John Doe",
//       email: "john.doe@example.com",
//     },
//     back_urls: {
//       success: "http://localhost:3000/success",
//       failure: "http://localhost:3000/failure",
//       pending: "http://localhost:3000/pending",
//     },
//     auto_return: "approved", // retorna automaticamente após pagamento aprovado
//   };

//   // Criação da preferência no Mercado Pago
//   mercadopago.preferences.create(preference)
//     .then((response) => {
//       const preferenceData = response.body;
//       // Envia o ID da preferência ao frontend
//       res.json({ id: preferenceData.id });
//     })
//     .catch((error) => {
//       console.error(error);
//       res.status(500).json({ error: error.message });
//     });
// });

// // Rota para processar o pagamento
// app.post("/pagamento", (req, res) => {
//   const paymentData = req.body;  // Dados do pagamento enviado pelo frontend

//   mercadopago.payment.save(paymentData)
//     .then((response) => {
//       const { status, status_detail, id } = response.body;
//       res.status(response.status).json({ status, status_detail, id });
//     })
//     .catch((error) => {
//       console.error(error);
//       res.status(500).json(error);
//     });
// });

// // Rotas para sucesso, falha ou pendência
// app.get("/success", (req, res) => {
//   res.send("Pagamento realizado com sucesso!");
// });

// app.get("/failure", (req, res) => {
//   res.send("Pagamento não realizado. Tente novamente.");
// });

// app.get("/pending", (req, res) => {
//   res.send("O pagamento está pendente. Aguardando confirmação.");
// });

// // Iniciar o servidor
// const port = 3000;
// app.listen(port, () => {
//   console.log(`Servidor rodando na porta ${port}`);
// });






// import express from "express";
// import cors from "cors";
// import { MercadoPagoConfig, Payment } from 'mercadopago';
// const app = express();
// app.use(cors());
// app.use(express.json());


// const client = new MercadoPagoConfig({ accessToken: 'TEST-2398005259804203-110922-c1d2be2f0dafd532a92ed041e83a78f6-137446085' });

// app.get("/create_preference", async (req, res) => {
//     const preference = {
//       items: [
//         {
//           title: "Produto de Exemplo",
//           quantity: 1,
//           unit_price: 100,
//         },
//       ],
//       payer: {
//         email: "john.doe@example.com",
//       },
//       back_urls: {
//         success: "http://www.sucesso.com",
//         failure: "http://www.falha.com",
//         pending: "http://www.pendente.com",
//       },
//       auto_return: "approved",
//     };
  
//     try {
//       const preferenceResponse = await client.preference.create(preference);
//       const preferenceId = preferenceResponse.body.id;
//       res.json({ id: preferenceId }); // Retorna o preferenceId para o frontend
//     } catch (error) {
//       console.error(error);
//       res.status(500).json(error);
//     }
//   });

// app.post("/pagamento", (req, res) => {
//     const payment = new Payment(client);
//     payment.create({ body: req.body.formData })
//     .then(function (response) {
//         const { status, status_detail, id } = response.body;
//         res.status(response.status).json({ status, status_detail, id });
//       })
//       .catch(function (error) {
//         console.error(error);
//         res.status(500).json(error);
//       });
  
//   });
  

// const port = 3000;
// app.listen(port, () => {
//   console.log(`Servidor rodando na porta ${port}`);
// });





// const payment = new Payment(client);
// const body = {
//     initialization: {
//       /*
//         "amount" é a quantia total a pagar por todos os meios de pagamento com exceção da Conta Mercado Pago e Parcelas sem cartão de crédito, que têm seus valores de processamento determinados no backend através do "preferenceId"
//       */
//       amount: 1000,
//       preferenceId: "",
//       payer: {
//         firstName: "isa",
//         lastName: "rosa",
//         email: "isa@gmail.com",
//       },
//     },
//     customization: {
//       visual: {
//         style: {
//           theme: "default",
//         },
//       },
//       paymentMethods: {
//         creditCard: "all",
//                                     debitCard: "all",
//                                     atm: "all",
//                                     onboarding_credits: "all",
//                                     wallet_purchase: "all",
//                                     ticket: "all",
//                                     bankTransfer: "all",
//         maxInstallments: 1
//       },
//     },
// }
// payment.create({ body })
// .then(console.log)
// .catch(console.log);

// import express from "express";
// import cors from 'cors';
// const app = express()
// app.use(cors())
// app.use(express.json())
// app.get('/teste', (req, res) => {
// res.send('Hello')
//  })
