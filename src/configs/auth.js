// secret - pode ser qualquer palavra que é utilizada para gerar um token
// tempo de expiração - 1 dia (nesse caso)

module.exports = {
  jwt: {
    secret: process.env.AUTH_SECRET || "default",
    expiresIn: "1d"
  }
}

