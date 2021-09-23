import { render, screen } from '@testing-library/react';

import SearchForm from './SearchForm';

describe('tests for SearchForm component', () => {
    test('all required fields exist', () => {
        const nameFieldLabel = 'Organisation:';
        const speakersSelectFieldLabel = 'Speaker:';
        const languagesSelectFieldLabel = 'Language:';
        const buttonLabel = 'Submit';
        const onSubmitCallback = jest.fn();

        render(
            <SearchForm
                onSearch={onSubmitCallback}
            />
        )

        const nameField = screen.getByLabelText(nameFieldLabel);
        const speakerSelectField = screen.getByLabelText(speakersSelectFieldLabel);
        const languageSelectField = screen.getByLabelText(languagesSelectFieldLabel);
        const submitButton = screen.getByText(buttonLabel);

        expect(nameField).toBeInTheDocument();
        expect(speakerSelectField).toBeInTheDocument();
        expect(languageSelectField).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });
});