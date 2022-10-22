import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import { useSelector } from 'react-redux'
import { Dialog, DialogContent, Slide, IconButton, useMediaQuery } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

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
    },
    dialog: {
        textAlign: "center",
        padding: "3px 20px",
        "& img": {
            width: "100%"
        },
        "& .h600": {
            width: "80%"
        },
        "& .h500": {
            width: "60%"
        },
        "& strong": {
            fontSize: 28,
            color: "#FED303",
            textShadow: "0.2px 0.5px black"
        },
        "& .seconds": {
            fontSize: 20,
            fontWeight: "bold",
            letterSpacing: "-0.5px"
        },
        "& .cancel": {
            fontSize: 20,
            fontWeight: 400,
            letterSpacing: "-0.5px",
            "& strong": {
                cursor: "pointer",
                "&:hover": {
                    textDecoration: "underline"
                },
                "&:active": {
                    color: "#ebce45"
                }
            }
        }
    },
    closeBtn: {
        position: "absolute",
        top: 0,
        right: 0
    }
}));

export default function DownloadButton() {

    const [open, setOpen] = React.useState(false)
    const [time, setTime] = React.useState(10)
    const [iref, setIref] = React.useState(null)

    const router = useRouter()
    const classes = useStyles()

    const token = useSelector((state) => state.authReducer.token);
    const h600 = useMediaQuery('(max-height: 600px)')
    const h500 = useMediaQuery('(max-height: 500px)')

    React.useEffect(() => {
        let interval = null
        if (open === true) {
            setTime(10)
            interval = setInterval(() => setTime((prev) => prev - 1), 1000)
            setIref(interval)
        }
        return () => {
            clearInterval(interval);
            setIref(null)
        }
    }, [open])

    React.useEffect(() => {
        if (time === 0) {
            window.location.href = "https://lapcareaws-static.s3.ap-south-1.amazonaws.com/downloads/LSDeskCleaningTool.exe"
            setOpen(false)
        }
    }, [time])

    const handleDownload = () => {
        if (!token)
            router.push("/login")
        else
            setOpen(true)
    }

    const handleCancel = () => {
        clearInterval(iref);
        setIref(null)
    }

    return (
        <>
            <img src="/pccleaner.png" className={classes.root} onClick={handleDownload} />
            <Dialog
                open={open}
                TransitionComponent={Transition}
                scroll="body"
            >
                <IconButton size="small" className={classes.closeBtn} onClick={() => setOpen(false)}>
                    <CloseIcon fontSize="inherit" />
                </IconButton>
                <DialogContent className={classes.dialog}>
                    <img
                        src="https://lapcareaws-static.s3.ap-south-1.amazonaws.com/lapscan/Lapscan+PC+Cleaner+popup+500+x+500.png"
                        className={h500 ? 'h500' : (h600 ? 'h600' : '')}
                    />
                    <div>
                        <p className="seconds">Download will begin automatically in <strong>{time}</strong> seconds</p>
                        <p className="cancel"><strong onClick={handleCancel}>Click Here</strong> to cancel</p>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}