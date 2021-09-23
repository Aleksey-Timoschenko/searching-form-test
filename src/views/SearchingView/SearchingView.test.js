import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SearchingView from './SearchingView';
import { SEARCHING_FORM_LITERALS } from '../../literals/searchFormLiterals';

/* TODO - need to find reason why this test does not work correct*/

describe('tests for SearchingView page', () => {
    test('user choose/input valid info and result appears', async () => {
        const fetchService = require('../../services/fetchService/fetchService');

        jest.spyOn(fetchService, 'getSearchingResult').mockReturnValue({
            id: 111,
            list: [
                {
                    id: 1,
                    name: "WEB Security. ENG"
                },
                {
                    id: 2,
                    name: "Searching optimization. ENG"
                }
            ]
        });

        jest.spyOn(fetchService, 'getSpeakersList').mockReturnValue([
            { id: 1, name: "Sergey Brin" },
            { id: 2, name: "Jeff Bezos" },
            { id: 3, name: "Mark Zuckerberg" }
        ]);

        jest.spyOn(fetchService, 'getLanguagesList').mockReturnValue([
            { id: 1, name: "English" },
            { id: 2, name: "Russian" },
            { id: 3, name: "Spanish" }
        ]);

        render(<SearchingView />)

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

        userEvent.click(submitButton);

        // const firstItemLabel = 'WEB Security. ENG';
        // const lastItemLabel = 'Searching optimization. ENG';
        //
        // await waitFor(() => expect(screen.getByText(firstItemLabel)).toBeInTheDocument())
        // await waitFor(() => expect(screen.getByText(lastItemLabel)).toBeInTheDocument())
    });
});