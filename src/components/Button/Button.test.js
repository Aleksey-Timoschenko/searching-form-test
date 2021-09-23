import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import Button from './Button';

describe('tests for Button', () => {
    let onClickCallback = null;
    const label = 'Click me';
    const type = 'button';

    beforeEach(() => {
        onClickCallback = jest.fn();

        render(
            <Button
                type={type}
                onClick={onClickCallback}
                label={label}
            />
        );
    })

    test('button is rendered', () => {
        const button = screen.getByText(label);

        expect(button).toBeInTheDocument();
    });

    test('button is clickable', () => {
        const button = screen.getByText(label);

        userEvent.click(button);

        expect(onClickCallback).toHaveBeenCalled();
    });
});