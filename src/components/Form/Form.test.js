import { Fragment } from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import Form from './Form';
import TextField from '../FormFields/TextField/TextField';
import SelectField from '../FormFields/SelectField/SelectField';
import Button from '../Button/Button';

describe('tests for Form component', () => {
    const speakersList = [
        { id: 1, value: 'Bob', label: 'Speaker 1' },
        { id: 2, value: 'Tom', label: 'Speaker 2' },
        { id: 3, value: 'Alex', label: 'Speaker 3' },
    ];
    const languagesList = [
        { id: 1, value: 'EN', label: 'English' },
        { id: 2, value: 'RUS', label: 'Russian' },
        { id: 3, value: 'SP', label: 'Spanish' },
    ];
    const errorText = 'Required';
    const validationRules = {
        speaker: {
            validationFunction: value => value,
            validationText: errorText,
        },
    }
    const buttonLabel = 'Submit';
    const nameFieldLabel = 'Name:';
    const speakersSelectFieldLabel = 'Speakers:';
    const languagesSelectFieldLabel = 'Languages:';
    const initialValues = {
        name: '',
        speaker: '',
        language: '',
    };
    let onSubmitCallback = null;

    beforeEach(() => {
        onSubmitCallback = jest.fn();

        render(
            <div data-testid={'form'}>
                <Form
                    initialValues={initialValues}
                    onSubmit={onSubmitCallback}
                    validation={validationRules}
                >
                    {
                        onChangeCallback => (
                            <Fragment>
                                <TextField
                                    onChange={onChangeCallback}
                                    name={'name'}
                                    label={nameFieldLabel}
                                />
                                <SelectField
                                    optionsList={speakersList}
                                    onChange={onChangeCallback}
                                    name={'speaker'}
                                    label={speakersSelectFieldLabel}
                                />
                                <SelectField
                                    optionsList={languagesList}
                                    onChange={onChangeCallback}
                                    name={'language'}
                                    label={languagesSelectFieldLabel}
                                />
                                <Button
                                    label={buttonLabel}
                                    type={'submit'}
                                />
                            </Fragment>
                        )
                    }
                </Form>
            </div>
        )
    });

   test('form is rendered', () => {
        const form = screen.getByTestId('form');

        expect(form).toBeInTheDocument();
   });

   test('form data is sent', async () => {
        const speakerSelectFieldValue = 'Alex';
        const languageSelectFieldValue = 'EN';

        const speakersSelectField = screen.getByLabelText(speakersSelectFieldLabel);
        const languagesFieldField = screen.getByLabelText(languagesSelectFieldLabel);
        const submitButton = screen.getByText(buttonLabel);

        userEvent.selectOptions(speakersSelectField, [ speakerSelectFieldValue ]);
        userEvent.selectOptions(languagesFieldField, [ languageSelectFieldValue ]);
        userEvent.click(submitButton);

        expect(onSubmitCallback).toHaveBeenCalled();
        expect(onSubmitCallback).toHaveBeenCalledWith({
            name: '',
            speaker: speakerSelectFieldValue,
            language: languageSelectFieldValue,
        })
   });

   test('errors list appears if validation is added', () => {
       const submitButton = screen.getByText(buttonLabel);

       userEvent.click(submitButton);

       const errorBlock = screen.getByText(`speaker:${errorText}`);

       expect(errorBlock).toBeInTheDocument();
   })
});