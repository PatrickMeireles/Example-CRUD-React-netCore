import { useState } from 'react';

const useForm = (initialValues, validate, setCurrentId = 0) => {

    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        const { name, value } = e.target;
        const fieldValue = { [name]: value };

        setValues({
            ...values,
            ...fieldValue
        });

        validate(fieldValue);
    }

    const handleInputChangeSelect = (fieldValue, fieldName) => {

        const field = { [fieldName]: fieldValue ?? ''};

        setValues({
            ...values,
            ...field
        })
        
        validate(field);
    }

    const resetForm = () => {
        setValues({
            ...initialValues
        });

        setCurrentId(0);
    }

    return {
        values,
        setValues,
        handleInputChange,
        handleInputChangeSelect,
        resetForm,
        errors, 
        setErrors
    }
}

export default useForm;