let chatOnMessage = (title, message) => {
  console.log(title + message);
};


let prepareForAnswer = (title) => {
  console.log(`${title} : Готовлюсь к ответу`);
};

let afterClose = (message) => {
  console.log(message);
};


module.exports = {
  chatOnMessage,
  prepareForAnswer,
  afterClose
};
