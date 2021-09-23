import { isArrayEmpty } from './arrayHelper';

describe('tests for array helper', () => {
    describe('tests for isArrayEmpty method', () => {
         test('value is not an array', () => {
             const value = {};

             expect(isArrayEmpty(value)).toBeTruthy();
         });

         test('array is empty', () => {
             const value = [];

             expect(isArrayEmpty(value)).toBeTruthy();
         });

         test('array is not empty', () => {
             const value = [ 1, 2, 3 ];

             expect(isArrayEmpty(value)).toBeFalsy();
         });
    });
});