import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import TextField from '../TextField/TextField';

describe('tests for TextField component', () => {
    test('user can type data into text field', () => {
        // given
        const fieldName = 'name';
        const fieldLabel = 'Name:';
        const fieldValue = 'Alex';

        // when
        render(
            <TextField
                name={fieldName}
                label={fieldLabel}
                onChange={() => {}}
            />
        );

        const field = screen.getByLabelText(fieldLabel);

        userEvent.type(field, fieldValue);

        // then
        expect(field).toHaveValue(fieldValue);
    });
});