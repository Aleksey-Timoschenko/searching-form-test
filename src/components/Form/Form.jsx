import PropTypes from 'prop-types'
import { useState, useCallback } from 'react';

import { prepareFormErrors } from '../../services/formService/formService';
import { isArrayEmpty } from '../../helpers/arrayHelper/arrayHelper';

import List from '../List/List';

import './Form.css';

const DEFAULT_FORM_ERRORS_VALUE = [];

const Form = props => {
    const {
        initialValues,
        validation,
        onSubmit,
        children,
    } = props;

    const [ formValues, setFormValues ] = useState(initialValues);
    const [ formErrors, setFormErrors ] = useState(DEFAULT_FORM_ERRORS_VALUE);

    const saveFieldValue = useCallback(event => {
        setFormValues(prevValue => ({
            ...prevValue,
            [event.target.id]: event.target.value,
        }))
    }, [ setFormValues ]);

    const onSubmitCallback = event => {
        if (validation) {
            const preparedFormErrors = prepareFormErrors(formValues, validation);

            if (isArrayEmpty(preparedFormErrors)) {
                if (!isArrayEmpty(formErrors)) {
                    setFormErrors(DEFAULT_FORM_ERRORS_VALUE)
                }

                onSubmit(formValues);
            } else {
                setFormErrors(preparedFormErrors);
            }
        } else {
            onSubmit(formValues);
        }

        event.preventDefault();
    }

    return (
        <form
            onSubmit={onSubmitCallback}
            noValidate
        >
            { children(saveFieldValue) }
            {
                !isArrayEmpty(formErrors) && (
                    <div className={'error-field'}>
                        <List
                            list={formErrors}
                        />
                    </div>
                )
            }
        </form>
    )
};

Form.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired,
    initialValues: PropTypes.object.isRequired,
    validation: PropTypes.shape({
        [PropTypes.string]: PropTypes.shape({
            validationFunction: PropTypes.func,
            validationText: PropTypes.string,
        }),
    }),
}

Form.defaultProps = {
    validation: null,
}

export default Form;