import { Typography, TextField, MenuItem, makeStyles } from '@material-ui/core';
import { getIn } from 'formik';
import React from 'react';
import { states } from '../../data/states';



const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '90%',
        },
    },
    textfield: {
        margin: "0.5rem 0"
    },
    inlineTextField: {
        margin: "0.5rem 0",
        display: "inline-block",
        width: "40%"
    }
}))

const BillingAddress = ({ formik }) => {
    const classes = useStyles()
    return (
        <div>
            <Typography variant="h6" gutterBottom style={{ fontWeight: "500" }}>Billing Address</Typography>
            <TextField
                name="billingAddress.fullName"
                id="outlined-basic"
                label="Full Name"
                variant="outlined"
                fullWidth
                className={classes.textfield}
                onChange={formik.handleChange}
                size="small"
                value={formik.values.billingAddress.fullName}
                error={Boolean(getIn(formik.touched, 'billingAddress.fullName') && getIn(formik.errors, 'billingAddress.fullName'))}
                helperText={getIn(formik.touched, 'billingAddress.fullName') && getIn(formik.errors, 'billingAddress.fullName')}
            />
            <TextField
                name="billingAddress.addressLine1"
                spellCheck="false"
                label="Address Line 1"
                variant="outlined"
                fullWidth
                className={classes.textfield}
                onChange={formik.handleChange}
                size="small"
                value={formik.values.billingAddress.addressLine1}
                error={Boolean(getIn(formik.touched, 'billingAddress.addressLine1') && getIn(formik.errors, 'billingAddress.addressLine1'))}
                helperText={getIn(formik.touched, 'billingAddress.addressLine1') && getIn(formik.errors, 'billingAddress.addressLine1')}
            />
            <TextField
                name="billingAddress.addressLine2"
                spellCheck="false"
                label="Address Line 2"
                variant="outlined"
                fullWidth
                className={classes.textfield}
                onChange={formik.handleChange}
                size="small"
                value={formik.values.billingAddress.addressLine2}
                error={Boolean(getIn(formik.touched, 'billingAddress.addressLine2') && getIn(formik.errors, 'billingAddress.addressLine2'))}
                helperText={getIn(formik.touched, 'billingAddress.addressLine2') && getIn(formik.errors, 'billingAddress.addressLine2')}
            />
            <TextField
                name="billingAddress.landmark"
                spellCheck="false"
                label="Landmark"
                variant="outlined"
                fullWidth
                className={classes.textfield}
                onChange={formik.handleChange}
                size="small"
                value={formik.values.billingAddress.landmark}
                error={Boolean(getIn(formik.touched, 'billingAddress.landmark') && getIn(formik.errors, 'billingAddress.landmark'))}
                helperText={getIn(formik.touched, 'billingAddress.landmark') && getIn(formik.errors, 'billingAddress.landmark')}
            />
            <TextField
                name="billingAddress.city"
                spellCheck="false"
                label="City"
                variant="outlined"
                className={classes.inlineTextField}
                onChange={formik.handleChange}
                size="small"
                value={formik.values.billingAddress.city}
                error={Boolean(getIn(formik.touched, 'billingAddress.city') && getIn(formik.errors, 'billingAddress.city'))}
                helperText={getIn(formik.touched, 'billingAddress.city') && getIn(formik.errors, 'billingAddress.city')}
            />
            <TextField
                id="outlined-select-currency"
                name="billingAddress.state"
                select
                label="State"
                variant="outlined"
                className={classes.inlineTextField}
                value="Delhi"
                style={{ marginLeft: "1rem" }}
                onChange={formik.handleChange} size="small"
                value={formik.values.billingAddress.state}
                error={Boolean(getIn(formik.touched, 'billingAddress.state') && getIn(formik.errors, 'billingAddress.state'))}
                helperText={getIn(formik.touched, 'billingAddress.state') && getIn(formik.errors, 'billingAddress.state')}
            >
                {states.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                name="billingAddress.pinCode"
                label="Pin Code"
                variant="outlined"
                spellCheck="false"
                className={classes.inlineTextField}
                onChange={formik.handleChange}
                size="small"
                value={formik.values.billingAddress.pinCode}
                error={Boolean(getIn(formik.touched, 'billingAddress.pinCode') && getIn(formik.errors, 'billingAddress.pinCode'))}
                helperText={getIn(formik.touched, 'billingAddress.pinCode') && getIn(formik.errors, 'billingAddress.pinCode')}
            />
            <TextField
                name="billingAddress.phoneNumber"
                id="outlined-basic"
                label="Phone Number"
                variant="outlined"
                spellCheck="false"
                className={classes.inlineTextField}
                style={{ marginLeft: "1rem" }}
                onChange={formik.handleChange} size="small"
                value={formik.values.billingAddress.phoneNumber}
                error={Boolean(getIn(formik.touched, 'billingAddress.phoneNumber') && getIn(formik.errors, 'billingAddress.phoneNumber'))}
                helperText={getIn(formik.touched, 'billingAddress.phoneNumber') && getIn(formik.errors, 'billingAddress.phoneNumber')}
            />
        </div>
    )
}

export default BillingAddress
