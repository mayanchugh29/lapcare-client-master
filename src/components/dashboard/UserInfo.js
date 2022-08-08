import React, { useEffect } from "react";
import * as yup from "yup";

import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { SET_TOASTIFY } from "../../store/actionTypes/toastify";

import request from "../../middlewares/axios/put";

import styles from "../../../styles/Dashboard.module.css";

import { Button, TextField, Typography } from "@material-ui/core";
import { UPDATE_PERSONAL_INFO } from "../../store/actionTypes/user";

const useRedux = () => {
  const dispatch = useDispatch();
  const fname = useSelector((state) => state.userReducer.fname);
  const lname = useSelector((state) => state.userReducer.lname);
  const gender = useSelector((state) => state.userReducer.gender);
  const contact = useSelector((state) => state.userReducer.contact);
  const token = useSelector((state) => state.authReducer.token);
  const setToastify = (msg, type) => {
    dispatch({
      type: SET_TOASTIFY,
      payload: {
        msg: msg,
        type: type,
        open: true,
      },
    });
  };
  const setUserInfo = (data) => {
    dispatch({
      type: UPDATE_PERSONAL_INFO,
      payload: {
        fname: data.fname,
        lname: data.lname,
        contact: data.contact,
        gender: data.gender,
      },
    });
  };
  return { setToastify, setUserInfo, token, fname, lname, gender, contact };
};

const validationSchema = yup.object({
  fname: yup.string("Enter your First name").required("First name is required"),
  lname: yup.string("Enter your Last name").required("Last name is required"),
  contact: yup
    .number("Enter your Phone Number")
    .min(10, "Contact should be of 10 digits")
    .required("Contact is required"),
});

const UserInfo = () => {
  const { setToastify, setUserInfo, token, fname, lname, contact, gender } =
    useRedux();

  const formik = useFormik({
    initialValues: {
      fname: fname,
      lname: lname,
      gender: gender,
      contact: contact,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const response = await request("/edit", values, token);
      if (response.status === 200) {
        setToastify("Account details updated!", "success");
        setUserInfo(values);
      } else {
        setToastify(response.data, "error");
      }
    },
  });

  const handleCancel = () => {
    formik.values.fname = fname;
    formik.values.lname = lname;
    formik.values.gender = gender;
    formik.values.contact = contact;
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={styles.personal_info_container}>
        <Typography variant="h6" gutterBottom>
          Personal Information
        </Typography>
        <TextField
          name="fname"
          value={formik.values.fname === undefined ? "" : formik.values.fname}
          onChange={formik.handleChange}
          size="small"
          type="string"
          label="First name"
          autoComplete="off"
          variant="outlined"
          spellCheck="false"
          className={styles.textField}
          style={{ margin: "0.5rem 0" }}
          error={formik.touched.fname && Boolean(formik.errors.fname)}
          helperText={formik.touched.fname && formik.errors.fname}
        />
        <TextField
          name="lname"
          value={formik.values.lname === undefined ? "" : formik.values.lname}
          onChange={formik.handleChange}
          size="small"
          type="string"
          label="Last name"
          autoComplete="off"
          variant="outlined"
          spellCheck="false"
          className={styles.textField}
          style={{ margin: "0.5rem 0" }}
          error={formik.touched.lname && Boolean(formik.errors.lname)}
          helperText={formik.touched.lname && formik.errors.lname}
        />
        <TextField
          name="gender"
          value={formik.values.gender === undefined ? "" : formik.values.gender}
          onChange={formik.handleChange}
          size="small"
          type="string"
          label="Gender"
          autoComplete="off"
          variant="outlined"
          spellCheck="false"
          className={styles.textField}
          style={{ margin: "0.5rem 0" }}
        />
        <TextField
          name="contact"
          value={
            formik.values.contact === undefined ? "" : formik.values.contact
          }
          onChange={formik.handleChange}
          size="small"
          type="string"
          label="contact"
          autoComplete="off"
          variant="outlined"
          spellCheck="false"
          className={styles.textField}
          style={{ margin: "0.5rem 0" }}
          error={formik.touched.contact && Boolean(formik.errors.contact)}
          helperText={formik.touched.contact && formik.errors.contact}
        />
        <div className={styles.action_buttons_container}>
          <Button
            variant="contained"
            type="submit"
            className={styles.action_button}
            style={{ marginRight: "12px" }}
            color="primary"
          >
            Save
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleCancel}
            className={styles.action_button}
            style={{ marginLeft: "12px" }}
            color="primary"
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
};

export default UserInfo;
