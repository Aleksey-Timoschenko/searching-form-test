import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FormField from './FormField';

describe('tests for FormField component', () => {
    const fieldName = 'name';
    const fieldLabel = 'Name:';

    let onChange = jest.fn();

    beforeEach(() => {
        render(
            <FormField
                name={fieldName}
                label={fieldLabel}
                onChange={onChange}
            >
                {
                    (value, onChangeValue) => (
                        <input
                            id={fieldName}
                            type='text'
                            name={fieldName}
                            value={value}
                            onChange={onChangeValue}
                        />
                    )
                }
            </FormField>
        );
    });

    test('field is rendered', () => {
        const field = screen.getByLabelText(fieldLabel);

        expect(field).toBeInTheDocument();
    });

    test('field value changing works correct', () => {
        const field = screen.getByLabelText(fieldLabel);
        const fieldValue = 'Text';

        userEvent.type(field, fieldValue);

        expect(onChange).toHaveBeenCalled();
        expect(field).toHaveValue(fieldValue);
    });
});