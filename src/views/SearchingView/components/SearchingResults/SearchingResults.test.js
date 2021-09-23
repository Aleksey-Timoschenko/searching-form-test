import { render, screen } from '@testing-library/react';

import SearchingResults from './SearchingResults';
import { SEARCHING_RESULTS_LITERALS } from '../../../../literals/searchingResultsLiterals';

describe('tests for SearchingResults component', () => {
    test('searchingResult is empty', () => {
        const searchingResult = [];

        render(
            <SearchingResults searchingResult={searchingResult} />
        )

        const emptyBlock = screen.getByText(SEARCHING_RESULTS_LITERALS.NOTHING_TO_SHOW_LABEL);

        expect(emptyBlock).toBeInTheDocument();
    });

    test('searchingResult is empty', () => {
        const firstItemLabel = 'Tom';
        const lastItemLabel = 'Bob';

        const searchingResult = [
            { key: 1, value: 'Tom' },
            { key: 2, value: 'Bob' },
        ];

        render(
            <SearchingResults searchingResult={searchingResult} />
        )

        const firstItem = screen.getByText(firstItemLabel);
        const lastItem = screen.getByText(lastItemLabel);

        expect(firstItem).toBeInTheDocument();
        expect(lastItem).toBeInTheDocument();
    });
})