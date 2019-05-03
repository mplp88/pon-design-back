const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'martinp88@gmail.com',
    pass: 'isjbsyeqqlcarbfb'
  }
});

router.get('/', (req, res) => {
  res.send('Mailer service is up and running');
});

router.post('/SendMail', (req, res) => {
  try {
    /*
     * Ejemplo de json:
     *  {
     *    "from": "Martín Ponce",
     *    "to": "martinp_88@hotmail.com",
     *    "subject": "Mail de prueba",
     *    "isHtml": true,
     *    "message": "<h1 style='color:red;'>Mail de prueba</h1><p style='color:green;'>usando Node.js con NodeMailer, Express y Body Parser y algo de HTML</p>"
     *  }
     */
    var from = req.body.from;
    var to = req.body.to;
    var subject = req.body.subject;
    var isHtml = req.body.isHtml;
    var message = req.body.message;

    var mailOptions = new Object();
    mailOptions.from = from; //'Martín';
    mailOptions.to = to; //'martinp_88@hotmail.com';
    mailOptions.subject = subject; //'Sending Email using Node.js';

    if (isHtml) {
      mailOptions.html = `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>PonDesign Contact</title>
      </head>
      <body>
        `+ message + `
      </body>
      </html>`;
    } else {
      mailOptions.text = message;
    }

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.send({
          success: false,
          error: error
        });
      } else {
        res.send({ 
          success: true,
          message: 'Email sent: ' + info.response
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;