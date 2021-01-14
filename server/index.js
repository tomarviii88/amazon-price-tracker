import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import Nightmare from 'nightmare';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ extended: false }));

async function executeFunc(urls) {
  let res_data = [];
  for (let i = 0; i < urls.length; i++) {
    console.log('Before await for ', i);
    const nightmare = Nightmare({ show: true, waitTimeout: 6000 });
    let price = await nightmare
      .goto(urls[i])
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
        if (int_price < 1000) {
          sendMail();
        }
        //done();
      });
  }
  return res_data;
}

async function sendMail() {
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
      to: 'tomarviii88@gmail.com',
      subject: 'Price went down',
      text: 'Hiiiiii price went down'
    });
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (err) {
    throw err;
  }
}

app.post('/getToken', async (req, res) => {
  const urls = req.body;
  console.log(urls);
  let res_data = [];
  try {
    res_data = await executeFunc(urls);

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

app.listen(process.env.PORT, () =>
  console.log(`Server listening on port ${process.env.PORT}!`)
);
