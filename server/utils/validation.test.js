const expect = require('expect');
var {isRealString} = require('./validation.js');

describe('isRealString', () => {
  it('Should reject a non-string value.', () => {
    var res = isRealString(123);
    //console.log('1:', res);
    expect(res).toBe(false);
  });

  it('Should reject a value with only spaces.', () => {
    var res = isRealString('  ');
    //console.log('2:', res);
    expect(res).toBe(false);
  });

  it('Should accept a value with non space characters.', () => {
    var res = isRealString('  a1!p0)  ');
    //console.log('3:', res);
    expect(res).toBe(true);
  });

});
