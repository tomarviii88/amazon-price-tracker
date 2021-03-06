import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import Nightmare from 'nightmare';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ extended: false }));

app.post('/getToken', async (req, res) => {
  const { amazon_urls, email } = req.body;
  const items = amazon_urls;
  console.log(req.body);
  let res_data = [];
  try {
    res_data = await executeFunc(items, email);

    return res.send({
      status: 200,
      message: 'Success',
      data: res_data
    });
    //process.exit(1);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
});

async function executeFunc(items, email) {
  let res_data = [];
  for (let i = 0; i < items.length; i++) {
    console.log('Before await for ', i);
    const nightmare = Nightmare({ show: true });
    let price = await nightmare
      .goto(items[i].url)
      .wait('#priceblock_ourprice')
      .evaluate(() => document.getElementById('priceblock_ourprice').innerText)
      .end()
      .then(async text => {
        let int_price = parseFloat(
          text
            .replace('\u20B9', '')
            .replace(/ /g, '')
            .replace(',', '')
        );
        console.log(int_price);
        if (int_price <= items[i].budget) {
          sendMail(email, items[i], int_price);
        }
        //done();
      });
  }
  return res_data;
}

async function sendMail(email, item, price_now) {
  try {
    //let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASSWORD
      }
    });

    let info = await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: `Notif: ${item.item_name} price update`,
      html: `<p>${item.item_name} price has dropped below your budget of ${item.budget}. Now you can buy it at ${price_now}. Hurry!!!!!!<br /><strong>Checkout: <a href=${item.url}>Click Here</a></strong></p>`
    });
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (err) {
    throw err;
  }
}

app.listen(process.env.PORT, () =>
  console.log(`Server listening on port ${process.env.PORT}!`)
);
