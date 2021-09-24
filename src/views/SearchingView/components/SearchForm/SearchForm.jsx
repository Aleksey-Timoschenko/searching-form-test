import {
    Fragment,
    useEffect,
    useState,
} from 'react';
import PropTypes from 'prop-types';

import Form from '../../../../components/Form/Form';
import TextField from '../../../../components/FormFields/TextField/TextField';
import SelectField from '../../../../components/FormFields/SelectField/SelectField';
import Button from '../../../../components/Button/Button';
import List from '../../../../components/List/List';

import { FIELDS_NAMES } from '../../../../constants/searchFormConstants';
import {
    FIELD_VALIDATION_TEXT,
    SEARCHING_FORM_LITERALS,
} from '../../../../literals/searchFormLiterals';
import {
    getLanguagesListForViewing,
    getOrganisationsForViewing,
    getSearchingResultsForViewing,
    getSpeakersListForViewing
} from '../../../../services/searchFormService/searchFormService';
import { getUrlParams } from '../../../../helpers/urlHelper/urlHelper';
import { fetchDataInParallel } from '../../../../helpers/fetchHelper/fetchHelper';

import './SearchForm.css';

const DEFAULT_FORM_INITIAL_VALUES = {
    organisation: '',
    speaker: '',
    language: '',
    ...getUrlParams(),
}

const DEFAULT_ORGANISATIONS_VALUES = {
    organisationIdByNameMap: {},
    organisationsList: [],
};

const DEFAULT_LIST_VALUE = [];

const formValidationRules = {
    speaker: {
        validationFunction: value => value,
        validationText: FIELD_VALIDATION_TEXT.REQUIRED,
    },
    language: {
        validationFunction: value => value,
        validationText: FIELD_VALIDATION_TEXT.REQUIRED,
    },
}

const SearchForm = props => {
    const {
        onSearch,
    } = props;

    const [ speakersList, setSpeakersList ] = useState(DEFAULT_LIST_VALUE);
    const [ languagesList, setLanguagesList ] = useState(DEFAULT_LIST_VALUE);
    const [ organisations, setOrganisations ] = useState(DEFAULT_ORGANISATIONS_VALUES);

    useEffect(async () => {
        const [
            speakersList,
            languagesList,
            organisationsForViewing,
        ] = await fetchDataInParallel([
            getSpeakersListForViewing(),
            getLanguagesListForViewing(),
            getOrganisationsForViewing(),
        ]);

        setSpeakersList(speakersList || DEFAULT_LIST_VALUE);
        setLanguagesList(languagesList || DEFAULT_LIST_VALUE);
        setOrganisations(organisationsForViewing || DEFAULT_LIST_VALUE);
    }, []);

    const onSubmitCallback = async formValues => {
        const {
            organisation,
            speaker: speakerId,
            language: languageId,
        } = formValues;

        const { organisationIdByNameMap } = organisations;
        const organisationId = organisationIdByNameMap[organisation];

        const searchingResult = await getSearchingResultsForViewing({
            organisationId,
            speakerId,
            languageId,
        } )

        if (onSearch) {
            onSearch(searchingResult);
        }
    };

    const { organisationsList } = organisations;

    return (
        <Form
            initialValues={DEFAULT_FORM_INITIAL_VALUES}
            onSubmit={onSubmitCallback}
            validation={formValidationRules}
        >
            {
                onChangeCallback => (
                    <Fragment>
                        <div className={'field-wrapper'}>
                            <TextField
                                onChange={onChangeCallback}
                                name={FIELDS_NAMES.ORGANISATION}
                                label={SEARCHING_FORM_LITERALS.ORGANISATION_FIELD_LABEL}
                                initialValue={DEFAULT_FORM_INITIAL_VALUES.organisation}
                            />
                            <List list={organisationsList} />
                        </div>
                        <div className={'field-wrapper'}>
                            <SelectField
                                optionsList={speakersList}
                                onChange={onChangeCallback}
                                name={FIELDS_NAMES.SPEAKER}
                                label={SEARCHING_FORM_LITERALS.SPEAKER_SELECT_FIELD_LABEL}
                                initialValue={DEFAULT_FORM_INITIAL_VALUES.speaker}
                                isRequired
                            />
                        </div>
                        <div className={'field-wrapper'}>
                            <SelectField
                                optionsList={languagesList}
                                onChange={onChangeCallback}
                                name={FIELDS_NAMES.LANGUAGE}
                                label={SEARCHING_FORM_LITERALS.LANGUAGE_SELECT_FIELD_LABEL}
                                initialValue={DEFAULT_FORM_INITIAL_VALUES.language}
                                isRequired
                            />
                        </div>
                        <Button
                            label={SEARCHING_FORM_LITERALS.SUBMIT_BUTTON_LABEL}
                            type={'submit'}
                        />
                    </Fragment>
                )
            }
        </Form>
    )
};

SearchForm.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default SearchForm;