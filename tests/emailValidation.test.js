const { isValidEmail } = require('../script.js');

describe('isValidEmail', () => {
  test('valid emails', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
    expect(isValidEmail('test.user+tag@sub.domain.co')).toBe(true);
  });

  test('invalid emails', () => {
    expect(isValidEmail('user@')).toBe(false);
    expect(isValidEmail('plainaddress')).toBe(false);
  });
});
