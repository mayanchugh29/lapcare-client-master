import React from "react";
import styles from '../styles/Career.module.css';
import request from "../src/middlewares/axios/post";

//Formik Imports
import { useFormik } from "formik";
import { validationSchemaforCareer } from "../src/helpers/yup/career";

//Redux Imports
import { SET_TOASTIFY } from "../src/store/actionTypes/toastify";
import { useDispatch } from "react-redux";

//Material Ui Imports
import {
    Container,
    Grid,
    Typography,
    TextField,
    Button,
    FormControl,
    FormControlLabel,
    Checkbox,
} from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNextRounded";

//Page Components
import AccBreadcrumbs from '../src/components/common/breadcrumbs/AccBreadcrumbs';





const Career = () => {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            contact: '',
            position: '',
            file: [],
            userAcceptance: false
        },
        validationSchema: validationSchemaforCareer,
        onSubmit: async (values) => {
            if (values.file.length === 0) {
                dispatch({
                    type: SET_TOASTIFY,
                    payload: {
                        open: true,
                        type: "info",
                        msg: 'Please upload your resume!',
                    },
                });
            } else {
                const newForm = new FormData();
                newForm.append("name", values.name);
                newForm.append("email", values.email);
                newForm.append("contact", values.contact);
                newForm.append("position", values.position);
                newForm.append("file", values.file);
                const response = await request("/forms/career", newForm);
                if (response.status === 200) {
                    dispatch({
                        type: SET_TOASTIFY,
                        payload: {
                            open: true,
                            type: "success",
                            msg: "Form Submitted!",
                        },
                    });
                } else {
                    dispatch({
                        type: SET_TOASTIFY,
                        payload: {
                            open: true,
                            type: "error",
                            msg: response.data,
                        },
                    });
                }
                formik.resetForm()

            }

        }
    })

    return (
        <div>
            <AccBreadcrumbs breadcrumbs={[{ routeName: 'Home', route: '/' }, { routeName: 'Career', route: '/career' }]} />
            <Container maxWidth="lg" className={styles.parent_container}>
                <div align="center" className={styles.title_container}>
                    <Typography variant="h2">
                        Career
                    </Typography>
                    <Typography variant="body1">
                        Come Join Us, Be part of this dynamic Environment
                    </Typography>
                </div>
                <div className={styles.frm_outer}>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={3} >
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField
                                    onChange={formik.handleChange}
                                    variant="outlined"
                                    color="primary"
                                    name="name"
                                    label="Name"
                                    fullWidth
                                    autoComplete="off"
                                    value={formik.values.name}
                                    error={Boolean(formik.touched.name && formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}

                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField
                                    type="email"
                                    onChange={formik.handleChange}
                                    variant="outlined"
                                    color="primary"
                                    name="email"
                                    label="Email"
                                    fullWidth
                                    autoComplete="email"
                                    value={formik.values.email}
                                    error={Boolean(formik.touched.email && formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField
                                    variant="outlined"
                                    color="primary"
                                    type="tel"
                                    name="contact"
                                    onChange={formik.handleChange}
                                    label="Phone"
                                    fullWidth
                                    autoComplete="phone"
                                    value={formik.values.contact}
                                    error={Boolean(formik.touched.contact && formik.errors.contact)}
                                    helperText={formik.touched.contact && formik.errors.contact}
                                />
                            </Grid>


                            <Grid item xs={12} sm={6} md={4}>
                                <TextField
                                    variant="outlined"
                                    onChange={formik.handleChange}
                                    color="primary"
                                    name="position"
                                    label="Position Applied"
                                    fullWidth
                                    autoComplete="position"
                                    value={formik.values.position}
                                    error={Boolean(formik.touched.position && formik.errors.position)}
                                    helperText={formik.touched.position && formik.errors.position}
                                />
                            </Grid>


                            <Grid item xs={12} sm={6} md={4}>
                                <FormControl variant="outlined">
                                    <TextField
                                        inputProps={{ accept: "application/pdf" }}
                                        type="file"
                                        variant="outlined"
                                        name="file"
                                        onChange={(event) =>
                                            formik.setFieldValue(
                                                "file",
                                                event.target.files[0]
                                            )
                                        }
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox color="secondary" onChange={formik.handleChange} name="userAcceptance" value={formik.values.userAcceptance} />}
                                    label="I hereby agree that the above data filled in by me can be used by Lapcare for promotion, support or warranty related communication with me."
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary">
                                    Submit <NavigateNextIcon />
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </div>
    )
};

export default Career;


