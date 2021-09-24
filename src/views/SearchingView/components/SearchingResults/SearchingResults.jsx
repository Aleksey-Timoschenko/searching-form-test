import React from 'react';
import PropTypes from 'prop-types';

import List from '../../../../components/List/List';

import { isArrayEmpty } from '../../../../helpers/arrayHelper/arrayHelper';
import { SEARCHING_RESULTS_LITERALS } from '../../../../literals/searchingResultsLiterals';

const SearchingResults = props => {
    const { searchingResult } = props;

    const isResultEmpty = isArrayEmpty(searchingResult);

    return (
        <div className={'searching-result'}>
            {
                isResultEmpty
                    ? (
                        <span>{ SEARCHING_RESULTS_LITERALS.NOTHING_TO_SHOW_LABEL }</span>
                    )
                    : (
                        <List
                            list={searchingResult}
                            type={'ordered'}
                        />
                    )
            }
        </div>
    )
};

SearchingResults.propTypes = {
    searchingResult: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
        value: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
    })),
}

SearchingResults.propTypes = {
    searchingResult: [],
}

export default React.memo(SearchingResults);