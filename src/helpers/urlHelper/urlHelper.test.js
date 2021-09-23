import { getUrlParams } from './urlHelper';

describe('tests for url helper', () => {
    describe('tests for getUrlParams method', () => {
        test('getting data from url', () => {
            global.window = Object.create(window);

            Object.defineProperty(window, 'location', {
                value: {
                    search: 'name=Alex&age=100'
                }
            });

            expect(getUrlParams()).toEqual({
                name: 'Alex',
                age: '100'
            });
        });
    });
});