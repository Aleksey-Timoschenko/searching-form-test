export const prepareFormErrors = (formValues, validation) => {
    const formErrors = [];

    Object.entries(formValues).forEach(([ fieldName, fieldValue ]) => {
        const fieldValidation = validation[fieldName];
        const needToSetFieldError = fieldValidation && !fieldValidation.validationFunction(fieldValue);

        if (needToSetFieldError) {
            formErrors.push({ key: fieldName, value: `${fieldName}:${fieldValidation.validationText}` })
        }
    });

    return formErrors;
}