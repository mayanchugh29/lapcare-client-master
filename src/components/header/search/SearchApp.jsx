import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { Box } from "@material-ui/core";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as gtag from '../../../helpers/gtag'

const useStyles = makeStyles((theme) => ({
    root: {
        padding: "2px 4px",
        display: "flex",
        alignItems: "center",
        boxShadow: "none",
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 0,
    },
    divider: {
        height: 20,
        margin: 2,
    },
}));

export default function SearchApp() {
    const router = useRouter()
    const classes = useStyles();

    const formik = useFormik({
        initialValues: {
            query: ''
        },
        onSubmit: values => {
            gtag.event({
                action:"search",
                category:'ecommerce',
                label:'Product Search',
                value:1
            })
            router.push(`/search/${values.query}`)
        }
    })



    return (
        <Box mt={2}>
            <form onSubmit={formik.handleSubmit}>
                <Paper className={classes.root} component="div" mt={2} >
                    <InputBase
                        name="query"
                        className={classes.input}
                        placeholder="Search..."
                        inputProps={{ "aria-label": "Search for Products" }}
                        onChange={formik.handleChange}
                    />
                    <IconButton
                        className={classes.iconButton}
                        aria-label="search"
                        type="submit"
                    >
                        {/* <SearchIcon /> */}
                    </IconButton>
                    <Divider className={classes.divider} orientation="vertical" />
                    <IconButton
                        color="secondary"
                        className={classes.iconButton}
                        aria-label="search"
                        type="submit"
                    >
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </form>
        </Box>
    );
}
