import { expect } from 'chai';
import chai, { describe } from 'mocha';
import { objectToConstantsStringFactory } from '.';

describe('ng-environment', () => {
  it(objectToConstantsStringFactory.name, () => {
    const obj = { foo: 1, bar: 2 };

    const expectedResult =
      `const foo = '1';\nconst bar = '2`;
    const result = objectToConstantsStringFactory(obj);

    expect(result).eq(expectedResult);
  });
});
