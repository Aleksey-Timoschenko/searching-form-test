import { useMemo } from 'react';
import PropTypes from 'prop-types';

import FormField from '../FormField/FormField';

const SelectField = props => {
    const {
        name,
        label,
        optionsList,
        isRequired,
        initialValue,
        onChange,
    } = props;

    const memoizedOptionsList = useMemo(() => (
        optionsList.map(({ id, value, label }) => (
            <option
                key={id}
                value={value}
            >
                { label }
            </option>
        ))
    ), [ optionsList ]);

    return (
        <FormField
            name={name}
            label={label}
            initialValue={initialValue}
            onChange={onChange}
        >
            {
                (value, onChangeValue) => (
                    <select
                        id={name}
                        name={name}
                        required={isRequired}
                        onChange={onChangeValue}
                        value={value}
                    >
                        { memoizedOptionsList }
                    </select>
                )
            }
        </FormField>
    )
};

SelectField.propTypes = {
    name: PropTypes.string.isRequired,
    optionsList: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
    })).isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    isRequired: PropTypes.bool,
    initialValue: PropTypes.string,
};

SelectField.defaultProps = {
    label: null,
    isRequired: false,
    initialValue: '',
};

export default SelectField;