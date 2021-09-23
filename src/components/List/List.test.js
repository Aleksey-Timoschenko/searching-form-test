import { render, screen } from '@testing-library/react';

import List from './List';

describe('tests for List component', () => {
    test('component is rendered', () => {
        const firstItemLabel = 'English';
        const lastItemLabel = 'Russian';
        const list = [
            { key: 'en', value: firstItemLabel },
            { key: 'ru', value: lastItemLabel },
        ]

        render(
            <List
                list={list}
            />
        );

        const firstItem = screen.getByText(firstItemLabel);
        const lastItem = screen.getByText(lastItemLabel);

        expect(firstItem).toBeInTheDocument();
        expect(lastItem).toBeInTheDocument();
    });
});