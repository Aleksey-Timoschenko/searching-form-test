import { fetchData, fetchDataInParallel } from './fetchHelper';

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

    describe('tests for fetchDataInParallel method', () => {
        test('all data returns successfully', async () => {
            const fetchList = [ Promise.resolve(1), Promise.resolve(2) ]

            const result = await fetchDataInParallel(fetchList);

            expect(result).toEqual([ 1, 2 ]);
        });

        test('one request is resolved with error', async () => {
            const fetchList = [ Promise.resolve(1), Promise.reject('API error') ]

            const result = await fetchDataInParallel(fetchList);

            expect(result).toEqual([ 1, null ]);
        });
    });
});