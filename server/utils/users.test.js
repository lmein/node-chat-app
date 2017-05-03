const expect = require('expect');
const {Users} = require('./users.js');

describe('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'GOA'
    }, {
      id: '2',
      name: 'Dave',
      room: 'FIS'
    }, {
      id: '3',
      name: 'Chris',
      room: 'GOA'
    }]
  });

  it('Should add new user.', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Bill',
      room: 'GOA'
    };
    var resUser = users.addUser(user.id, user.name, user.room);
    //first users is users var above and second is users arra in users.js
    expect(users.users).toEqual([user]);
  });

  it('Should remove a user.', () => {
    var userId = '1';
    var user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('Should not remove a user.', () => {
    var userId = '4';
    var user = users.removeUser(userId);

    expect(user).toNotExist;
    expect(users.users.length).toBe(3);
  });

  it('Should find a user.', () => {
    var userList = users.getUser('1');

    expect(userList.name).toEqual(['Mike']);
  });

  it('Should not find a user.', () => {
    var userList = users.getUser('4');

    expect(userList).toNotExist;
  });

  it('Should return names for GOA.', () => {
    var userList = users.getUserList('GOA');

    expect(userList).toEqual(['Mike', 'Chris']);
  });

  it('Should return names for FIS.', () => {
    var userList = users.getUserList('FIS');

    expect(userList).toEqual(['Dave']);
  });

});
