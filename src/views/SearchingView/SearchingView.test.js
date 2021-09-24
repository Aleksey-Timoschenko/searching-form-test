import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SEARCHING_FORM_LITERALS } from '../../literals/searchFormLiterals';
import { prepareFormErrors } from '../../services/formService/formService';

import SearchingView from './SearchingView';

describe('tests for SearchingView page', () => {
    beforeEach(() => {
        const fetchService = require('../../services/fetchService/fetchService');
        const searchFormService = require('../../services/searchFormService/searchFormService');

        jest.spyOn(fetchService, 'getOrganisations').mockReturnValue([
            { id: 1, name: 'Google' },
            { id: 2, name: 'Amazon' },
            { id: 3, name: 'Facebook' },
        ])

        jest.spyOn(fetchService, 'getSpeakersList').mockReturnValue([
            { id: 1, name: 'Sergey Brin' },
            { id: 2, name: 'Jeff Bezos' },
            { id: 3, name: 'Mark Zuckerberg' }
        ]);

        jest.spyOn(fetchService, 'getLanguagesList').mockReturnValue([
            { id: 1, name: 'English' },
            { id: 2, name: 'Russian' },
            { id: 3, name: 'Spanish' }
        ]);

        jest.spyOn(fetchService, 'getSearchingResult').mockReturnValue({
            id: 111,
            list: [
                {
                    id: 1,
                    name: 'WEB Security. ENG'
                },
                {
                    id: 2,
                    name: 'Searching optimization. ENG'
                }
            ]
        });

        jest.spyOn(searchFormService, 'getSearchingResultsForViewing').mockReturnValue([
            { key: 1, value: 'WEB Security. ENG' },
            { key: 2, value: 'Searching optimization. ENG' },
        ]);

        render(<SearchingView />);
    });


    test('user opens page and clicks submit button -> form validation error text shows', async () => {
        const validationErrorTextForSpeakerField = /speaker:Field is required/i;
        const validationErrorTextForLanguageField = /language:Field is required/i;

        const submitButton = screen.getByText(SEARCHING_FORM_LITERALS.SUBMIT_BUTTON_LABEL);

        await waitFor(() => expect(screen.getByText('Sergey Brin')).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText('English')).toBeInTheDocument());

        userEvent.click(submitButton);

        expect(screen.getByText(validationErrorTextForSpeakerField)).toBeInTheDocument();
        expect(screen.getByText(validationErrorTextForLanguageField)).toBeInTheDocument();
    });

    test('user choose/input valid info and result appears', async () => {
        const formService = require('../../services/formService/formService');

        jest.spyOn(formService, 'prepareFormErrors').mockReturnValue([]);

        const organisationField = screen.getByLabelText(SEARCHING_FORM_LITERALS.ORGANISATION_FIELD_LABEL);
        const speakerSelectField = screen.getByLabelText(SEARCHING_FORM_LITERALS.SPEAKER_SELECT_FIELD_LABEL);
        const languageSelectField = screen.getByLabelText(SEARCHING_FORM_LITERALS.LANGUAGE_SELECT_FIELD_LABEL);
        const submitButton = screen.getByText(SEARCHING_FORM_LITERALS.SUBMIT_BUTTON_LABEL);

        await waitFor(() => expect(screen.getByText('Sergey Brin')).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText('English')).toBeInTheDocument());

        userEvent.type(organisationField, 'Google');
        userEvent.selectOptions(speakerSelectField, [ "1" ]);
        userEvent.selectOptions(languageSelectField, [ "1" ]);

        await waitFor(() => expect(speakerSelectField).toHaveValue('1'));
        await waitFor(() => expect(languageSelectField).toHaveValue('1'));

        await userEvent.click(submitButton);

        const firstItemLabel = 'WEB Security. ENG';
        const lastItemLabel = 'Searching optimization. ENG';

        await waitFor(() => expect(screen.getByText(firstItemLabel)).toBeInTheDocument())
        await waitFor(() => expect(screen.getByText(lastItemLabel)).toBeInTheDocument())
    });
});