const nodemailer = require('nodemailer')

const mailConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'margot.altenwerth95@ethereal.email',
        pass: 'hKB6SUb873azfVgN9u'
    }
}

module.exports = nodemailer.createTransport(mailConfig)
