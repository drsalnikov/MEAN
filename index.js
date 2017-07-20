"use strict";

const c = require('./chat');
const f = require('./functions');

let webinarChat =  new c.ChatApp('webinar');
let facebookChat = new c.ChatApp('=========facebook');
let vkChat =       new c.ChatApp('---------vk');


webinarChat.on('message', f.chatOnMessage);
facebookChat.on('message', f.chatOnMessage);
vkChat.on('message', f.chatOnMessage);


// Закрыть вконтакте
setTimeout( ()=> {
  console.log('Закрываю вконтакте...');
  vkChat.removeListener('message', f.chatOnMessage);
  vkChat.close('Чат вконтакте закрылся :(');
}, 10000 );

// Закрыть фейсбук
setTimeout( ()=> {
  console.log('Закрываю фейсбук, все внимание — вебинару!');
  facebookChat.removeListener('message', f.chatOnMessage);
  facebookChat.close();
}, 15000 );


// Закрыть webinar
setTimeout( ()=> {
  console.log('Закрываю вебинар!');
  webinarChat.removeListener('message', f.chatOnMessage);
  webinarChat.close();
}, 30000 );


// 1.1
webinarChat.on('message', f.prepareForAnswer);

// 1.2
vkChat.setMaxListeners(2);
vkChat.on('message', f.prepareForAnswer);

// 2
webinarChat.on('close', f.afterClose);
facebookChat.on('close', f.afterClose);
vkChat.on('close', f.afterClose);
