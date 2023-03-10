import React from 'react';
import PropTypes from "prop-types"

import { isEmpty } from 'lodash';
import { FastField as FormikFastField, getIn } from 'formik';
import { Collapse, FormControl, FormHelperText, FormLabel, InputLabel, TextField } from '@mui/material';

const FastField = (props: any) => {
    const { Input, ...params } = props;
    return (
        <FormikFastField {...params}>
            {({ field, form: { errors, touched }, }: any) => {
                console.log(field, errors, touched)
                return (
                    <FormControl error={Boolean(touched[field.name]) && !isEmpty(errors[field.name])}>
                        <FormLabel htmlFor={params.name}>
                            {params.label}
                        </FormLabel>
                        <Input {...field} />
                        <Collapse in={Boolean(touched[field.name])}>
                            <FormHelperText error={Boolean(touched[field.name])}>
                                {errors[field.name]}
                            </FormHelperText>
                        </Collapse>
                    </FormControl>
                )
            }}
        </FormikFastField >
    )
}

FastField.propTypes = {
    id: PropTypes.string,
    value: PropTypes.any,
    name: PropTypes.string,
    label: PropTypes.string,
    required: PropTypes.bool,
    type: PropTypes.string,
};


FastField.defaultProps = {
    Input: TextField,
};



export default FastField