import { fetchData } from './fetchHelper';

describe('tests for fetch helper', () => {
    describe('tests for fetchData method', () => {
        const data = [
            { id: 1, name: 'Tom' },
            { id: 2, name: 'Bob' },
        ];

        const unmockedFetch = global.fetch;

        beforeAll(() => {
            global.fetch = () =>
                Promise.resolve({
                    json: () => Promise.resolve(data),
                })
        });

        afterAll(() => {
            global.fetch = unmockedFetch
        });

        test('getting data', async () => {
            const url = '#';

            const result = await fetchData({
                url
            });

            expect(result).toEqual(data);
        });

        test('error appears during fetching data', async () => {
            const url = '#';

            global.fetch = () => Promise.reject('API error')

            const result = await fetchData({
                url
            });

            expect(result).toEqual(null);
        });
    });
});