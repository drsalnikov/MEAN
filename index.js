const dbRequest = require('./functions');
const testData = require('./testdata');


let actions = '';
let message = `
1. Добавить имёна в коллекцию users -  'addName Имя1 Имя2 ...'
2. Вывести список всех имен в коллекции users 'showNames'. Чтобы найти определенное имя 'showNames Имя1 Имя2 ...'
3. Изменить несколько имён на другие 'chageNames ИмяДоИзменение ИмяПослеИзменения'. Если найдено несколько имен изменяет все. 
4. Отобразить список измененных имен 'showChangedNames'. Поиск по истории измененных имен showChangedNames Имя
5. Чтобы удалить измененные имена после changeNames 'resetNames'
Для выхода exit.
`;


console.log(`Добро пожаловать! 
${message}`);

const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (line) => {
  actions = line.split(' ');

  switch (actions[0]) {
    case 'addName':
      if (actions[1]) {
        dbRequest.addName(actions);
        break;
      }
    case 'showNames':
      dbRequest.showNames(actions);
      break;
    case 'changeNames':
      if (actions[1] && actions[2]) {
        dbRequest.changeNames(actions);
        break;
      }
      break;
    case 'showChangedNames':
      dbRequest.showChangedNames(actions);
      break;
    case 'resetNames':
      dbRequest.resetNames(actions);
      break;
    case 'exit':
      rl.close();  
      break;
    default:
      console.log(message)
  }
});
