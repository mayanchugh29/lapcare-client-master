import { Typography, TextField, MenuItem, makeStyles } from '@material-ui/core';
import { getIn } from 'formik';
import React from 'react';
import styles from '../../../styles/Checkout.module.css';
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

const ShippingAddress = ({ formik }) => {
    const classes = useStyles()
    return (
        <div className={styles.address_form_container}>
            <Typography variant="h6" gutterBottom style={{ fontWeight: "500" }}>Shipping Address</Typography>
            <TextField
                name="shippingAddress.fullName"
                spellCheck="false"
                label="Full Name"
                variant="outlined"
                fullWidth
                className={classes.textfield}
                onChange={formik.handleChange}
                size="small"
                value={formik.values.shippingAddress.fullName}
                error={Boolean(getIn(formik.touched, 'shippingAddress.fullName') && getIn(formik.errors, 'shippingAddress.fullName'))}
                helperText={getIn(formik.touched, 'shippingAddress.fullName') && getIn(formik.errors, 'shippingAddress.fullName')}
            />
            <TextField
                name="shippingAddress.addressLine1"
                spellCheck="false"
                label="Address Line 1"
                variant="outlined"
                fullWidth
                className={classes.textfield}
                onChange={formik.handleChange}
                size="small"
                value={formik.values.shippingAddress.addressLine1}
                error={Boolean(getIn(formik.touched, 'shippingAddress.addressLine1') && getIn(formik.errors, 'shippingAddress.addressLine1'))}
                helperText={getIn(formik.touched, 'shippingAddress.addressLine1') && getIn(formik.errors, 'shippingAddress.addressLine1')}
            />
            <TextField
                name="shippingAddress.addressLine2"
                spellCheck="false"
                label="Address Line 2"
                variant="outlined"
                fullWidth
                className={classes.textfield}
                onChange={formik.handleChange}
                size="small"
                value={formik.values.shippingAddress.addressLine2}
                error={Boolean(getIn(formik.touched, 'shippingAddress.addressLine2') && getIn(formik.errors, 'shippingAddress.addressLine2'))}
                helperText={getIn(formik.touched, 'shippingAddress.addressLine2') && getIn(formik.errors, 'shippingAddress.addressLine2')}
            />
            <TextField
                name="shippingAddress.landmark"
                spellCheck="false"
                label="Landmark"
                variant="outlined"
                fullWidth
                className={classes.textfield}
                onChange={formik.handleChange}
                size="small"
                value={formik.values.shippingAddress.landmark}
                error={Boolean(getIn(formik.touched, 'shippingAddress.landmark') && getIn(formik.errors, 'shippingAddress.landmark'))}
                helperText={getIn(formik.touched, 'shippingAddress.landmark') && getIn(formik.errors, 'shippingAddress.landmark')}
            />
            <TextField
                name="shippingAddress.city"
                spellCheck="false"
                label="City"
                variant="outlined"
                className={classes.inlineTextField}
                onChange={formik.handleChange}
                size="small"
                value={formik.values.shippingAddress.city}
                error={Boolean(getIn(formik.touched, 'shippingAddress.city') && getIn(formik.errors, 'shippingAddress.city'))}
                helperText={getIn(formik.touched, 'shippingAddress.city') && getIn(formik.errors, 'shippingAddress.city')}
            />
            <TextField
                name="shippingAddress.state"
                select
                label="State"
                variant="outlined"
                className={classes.inlineTextField}
                style={{ marginLeft: "1rem" }}
                onChange={formik.handleChange}
                size="small"
                value={formik.values.shippingAddress.state}
                error={Boolean(getIn(formik.touched, 'shippingAddress.state') && getIn(formik.errors, 'shippingAddress.state'))}
                helperText={getIn(formik.touched, 'shippingAddress.state') && getIn(formik.errors, 'shippingAddress.state')}
            >
                {states.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                name="shippingAddress.pinCode"
                spellCheck="false"
                label="Pin Code"
                variant="outlined"
                className={classes.inlineTextField}
                onChange={formik.handleChange}
                size="small"
                value={formik.values.shippingAddress.pinCode}
                error={Boolean(getIn(formik.touched, 'shippingAddress.pinCode') && getIn(formik.errors, 'shippingAddress.pinCode'))}
                helperText={getIn(formik.touched, 'shippingAddress.pinCode') && getIn(formik.errors, 'shippingAddress.pinCode')}

            />
            <TextField
                name="shippingAddress.phoneNumber"
                spellCheck="false"
                label="Phone Number"
                variant="outlined"
                className={classes.inlineTextField}
                onChange={formik.handleChange}
                size="small"
                style={{ marginLeft: "1rem" }}
                value={formik.values.shippingAddress.phoneNumber}
                error={Boolean(getIn(formik.touched, 'shippingAddress.phoneNumber') && getIn(formik.errors, 'shippingAddress.phoneNumber'))}
                helperText={getIn(formik.touched, 'shippingAddress.phoneNumber') && getIn(formik.errors, 'shippingAddress.phoneNumber')}
            />

        </div>
    )
}

export default ShippingAddress
