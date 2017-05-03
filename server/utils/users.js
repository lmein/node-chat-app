[{
  id: 'asdf',
  name: 'adsfs',
  room: 'asdfd'
}]

//addUser (id, name, room)
//removeUser (id)
//getUser (id)
//getUserList (room)

class Users {
  constructor () {
    this.users = [];
  }
  addUser (id, name, room) {
    var user = {id, name, room};
    //add user onto users array.
    this.users.push(user);
    return user;
  }
  removeUser (id) {
    var user = this.users.filter((user) => user.id === id)[0];

    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
    }

    return user;
  }
  getUser (id) {
    return this.users.filter((user) => user.id === id)[0];
  }
  getUserList (room) {
    var users = this.users.filter((user) => user.room === room);
    var namesArray = users.map((user) => user.name);

    return namesArray;
  }
}

module.exports = {Users};

//ES6 classes
// class Person {
//   constructor (name, age) {
//     //console.log(name, age);
//     //this refers to an instance
//     this.name = name;
//     this.age = age;
//   }
//   getUserDescription () {
//     return `${this.name} is ${this.age} year(s) old.`;
//   }
// }
// //new instance of above class.
// var me = new Person('John', 25);
//
// // console.log(me.name, me.age);
// var description = me.getUserDescription();
//
// console.log(description);
