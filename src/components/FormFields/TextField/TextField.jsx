import PropTypes from 'prop-types'

import FormField from '../FormField/FormField';

const TEXT_FIELD_TYPE = 'text';

const TextField = props => {
    const {
        name,
        label,
        isRequired,
        initialValue,
        onChange,
    } = props;

    return (
        <FormField
            name={name}
            label={label}
            initialValue={initialValue}
            onChange={onChange}
        >
            {
                (value, onChangeValue) => (
                    <input
                        id={name}
                        name={name}
                        type={TEXT_FIELD_TYPE}
                        required={isRequired}
                        onChange={onChangeValue}
                        value={value}
                    />
                )
            }
        </FormField>
    )
};

TextField.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    isRequired: PropTypes.bool,
    initialValue: PropTypes.string,
}

TextField.defaultProps = {
    label: null,
    isRequired: false,
    initialValue: '',
}

export default TextField;