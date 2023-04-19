const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError")
const authConfig = require("../configs/auth");

// o Middleware sempre recebe o next para chamar a próxima função que é destino da requisição
function ensureAuthenticated(request, response, next){
  // a  const authHeader é criada para obter o cabeçalho e o token de autorização
  const authHeader = request.headers.authorization;

  if(!authHeader){
    throw new AppError("JWT Token não informado", 401);
  }

  // acessa através do vetor o que está dentro do header
  // split(" ") pega a string e separa passando ela para o vetor. 
  // o carácter usado como referência para o split(" ") é o espaço quebra o texto('Bare xxx')
  // quebrando o texto em array e pegando só a segunda posição (token)
  const [, token] = authHeader.split(" ");

  // sub é o conteúdo que está armazenado, que será convertido para user_id
  // sub é uma propriedade que pode ser desestruturada da função - authConfig.jwt.secret
  // verifica se o token é válido, se for ele devolve o sub
  try {
    const { sub: user_id} = verify(token, authConfig.jwt.secret)

    request.user = {
      id: Number(user_id),
    };

    // return em next para chamar a função destino
    return next();
  } catch{
    throw new AppError("JWT Token inválido", 401);
  }
}

module.exports = ensureAuthenticated;