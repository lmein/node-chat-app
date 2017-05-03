var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('Should generate correct message object.', () => {
    var from = 'Mark';
    var text = 'A message.';
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, text});

  });
});

describe('generateLocationMessage', () => {
  it('Should generate correct location object.', () => {
    var from = 'Mark';
    var latitude = 1;
    var longitude = 1;
    var url = 'https://www.google.com/maps?q=1,1';
    var message = generateLocationMessage(from, latitude, longitude);

    expect(message.createdAt).toBeA('number');
    //console.log(message);
    expect(message).toInclude({from, url});

  });
});
