import { isObjectEmpty } from './objectHelper.js';

describe('tests for object helper', () => {
    describe('tests for isObjectEmpty method', () => {
        test('values is negative', () => {
            expect(isObjectEmpty(null)).toBeTruthy();
        });

        test('object is empty', () => {
            const object = {};

            expect(isObjectEmpty(object)).toBeTruthy();
        })

        test('object is not empty', () => {
            const object = { id: 1, name: 'Tom' };

            expect(isObjectEmpty(object)).toBeFalsy();
        });
    })
});