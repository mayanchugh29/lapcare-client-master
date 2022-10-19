import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import { useSelector } from 'react-redux'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
    root: {
        position: "fixed",
        zIndex: 1000,
        width: 100,
        top: 60,
        right: 20,
        cursor: "pointer",
        transition: "all .4s",
        "&:hover": {
            transform: "scale(1.2)"
        },
        "&:active": {
            transform: "scale(1.1)"
        }
    }
}));

export default function DownloadButton() {
    const router = useRouter()
    const classes = useStyles()

    const token = useSelector((state) => state.authReducer.token);

    const handleDownload = () => {
        if(!token)
            router.push("/login")
        else
            window.open("https://lapcareaws-static.s3.ap-south-1.amazonaws.com/downloads/LSDeskCleaningTool.exe")
    }

    return (
        <img src="/pccleaner.png" className={classes.root} onClick={handleDownload}/>
    )
}