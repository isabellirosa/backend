import express from 'express';
import cors from 'cors';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const app = express();
app.use(cors());
app.use(express.json());

// Configuração do Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: 'APP_USR-8079640270535236-082419-cdffa99af5d8ba5a7f3675a1c0cb8e75-1955402575',
});

// Rota para criar a preferência
app.post('/create_preference', async (req, res) => {
  try {
    const body = {
      items: [
        {
          title: req.body.title,
          quantity: Number(req.body.quantity),
          unit_price: Number(req.body.price),
          currency_id: 'BRL', // ✅ moeda correta
        },
      ],
      back_urls: {
        success: 'https://santa-dallah-front-end-gpwv.vercel.app/', // ✅ URL do seu front
        failure: 'https://santa-dallah-front-end-gpwv.vercel.app/pagamento/failure',
        pending: 'https://santa-dallah-front-end-gpwv.vercel.app/pagamento/pending',
      },
      auto_return: 'approved', // ✅ agora válido, pois há back_urls
    };

    // Criação da preferência
    const preference = new Preference(client);
    const result = await preference.create({ body });

    // SDK nova: o id vem dentro de result.id (ou result.body.id em versões antigas)
    res.json({ id: result.id || result.body?.id });
  } catch (error) {
    console.error('❌ Erro ao criar preferência:', error);
    res.status(500).json({ error: 'Erro ao criar preferência', details: error });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
});
