import PropTypes from 'prop-types'
import { useState } from 'react';

const FormField = props => {
    const {
        name,
        label,
        children,
        initialValue,
        onChange,
    } = props;

    const [ value, setValue ] = useState(initialValue);

    const onChangeValue = event => {
        setValue(event.target.value);
        onChange(event);
    }

    return (
        <div className={'form-field'}>
            <label htmlFor={name}>
                { label }
            </label>
            { children(value, onChangeValue) }
        </div>
    )
};

FormField.propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired,
    label: PropTypes.string,
    initialValue: PropTypes.string,
};

FormField.defaultProps = {
    label: null,
    initialValue: '',
}

export default FormField;