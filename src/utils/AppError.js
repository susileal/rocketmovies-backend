class AppError{
  // o fato de criar variáveis no topo da classe faz com que toda a classe tenha conhecimento delas, dentro de qualquer outra funcionalidade
  message;
  statusCode;


  // toda a classe tem um método construtor
  // constructor - é carregado automaticamente quando a classe é instanciada. 
  // caso o statusCode não seja informado o padrão será 400(erro do cliente)
  // this.message = message; - está passando as informações para o message que faz parte do contexto global

  constructor(message, statusCode = 400 ){
    this.message = message;
    this.statusCode = statusCode;
  }
}

module.exports = AppError;
