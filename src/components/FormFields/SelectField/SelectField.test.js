import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import SelectField from '../SelectField/SelectField';

describe('tests for SelectField component', () => {
    test('user can choose option from select field', () => {
        // given
        const fieldName = 'name';
        const fieldLabel = 'Name:';
        const fieldValue = 'Alex';
        const optionsList = [
            { id: 1, value: 'Bob', label: 'Speaker 1' },
            { id: 2, value: 'Tom', label: 'Speaker 2' },
            { id: 3, value: 'Alex', label: 'Speaker 3' },
        ]

        // when
        render(
            <SelectField
                name={fieldName}
                label={fieldLabel}
                optionsList={optionsList}
                onChange={() => {}}
            />
        );

        const field = screen.getByLabelText(fieldLabel);

        userEvent.selectOptions(field, [ fieldValue ]);

        // then
        expect(field).toHaveValue(fieldValue);
    });
});