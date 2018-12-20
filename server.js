
let user = require('./user');

let vasya = new user.User('Vasya');
let petya = new user.User('petya');

vasya.hello(petya);