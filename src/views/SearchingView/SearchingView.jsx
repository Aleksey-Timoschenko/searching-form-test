import { useState } from 'react';

import { isArrayEmpty } from '../../helpers/arrayHelper/arrayHelper';

import SearchForm from './components/SearchForm/SearchForm';
import SearchingResults from './components/SearchingResults/SearchingResults';

import './SearchingView.css';

const DEFAULT_RESULTS_LIST = [];

const SearchingView = () => {
    const [ searchingResult, setSearchingResult ] = useState(DEFAULT_RESULTS_LIST)

    const onSearch = searchingResults => {
        const isResultEmpty = isArrayEmpty(searchingResults);
        const isPrevResultEmpty = isArrayEmpty(searchingResult);

        if (!isResultEmpty || (isResultEmpty && !isPrevResultEmpty)) {
            setSearchingResult(searchingResults);
        }
    }

    return (
        <div className={'searching-view'}>
            <div className={'searching-form-wrapper'}>
                <SearchForm
                    onSearch={onSearch}
                />
            </div>
            <div className={'searching-result-wrapper'}>
                <SearchingResults
                    searchingResult={searchingResult}
                />
            </div>
        </div>
    )
};

export default SearchingView;