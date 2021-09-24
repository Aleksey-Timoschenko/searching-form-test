const DEFAULT_FETCH_METHOD = 'GET';

export const fetchData = async ({
    url,
    method = DEFAULT_FETCH_METHOD,
    headers,
    body,
}) => {
    try {
        const response = await fetch(url, {
            method,
            headers,
            body: JSON.stringify(body),
        });

        return response.json();
    } catch (error) {
        return null;
    }
};

export const fetchDataInParallel = async (fetchList) => {
    try {
        const response = await Promise.allSettled(fetchList);

        return response.map((promise) => promise.value || null);
    } catch (error) {
        return [];
    }
};