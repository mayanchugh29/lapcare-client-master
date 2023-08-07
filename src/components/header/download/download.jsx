import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import axios from "axios";

import { useSelector } from 'react-redux'
import {
	Container,
	Typography,
	TextField,
	Button,
} from "@material-ui/core";

import { Dialog, DialogContent, Slide, IconButton, useMediaQuery, FormControl } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close'



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const useStyles = makeStyles((theme) => ({
    root: {
        position: "fixed",
        zIndex: 999,
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
    },    


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


    const handleDownload = () => {
        
            setOpen(true)
    }

    const handleCancel = () => {
        clearInterval(iref);
        setIref(null)
    }

    // 
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState('');

    const handleChange = (event) => {
        const { value } = event.target;
        if (event.target.id === "name") {
          setName(value);
          if (!/^[a-zA-Z]+$/.test(value)) {
            setNameError('Please enter only alphabets.');
          } else {
            setNameError('');
          }
        } else if (event.target.id === "email") {
          setEmail(value);
          if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value)) {
            setEmailError('Please enter a valid email address.');
          } else {
            setEmailError('');
          }
        } else if (event.target.id === "phone") {
          setPhone(value);
          if (!/^\d{10}$/g.test(value)) {
            setPhoneError('Please enter a valid 10-digit phone number.');
          } else {
            setPhoneError('');
          }
        }
      }

    const handleSubmit=(e)=>{
        e.preventDefault();
        //console.log(name,email,phone)
        const data={
            Name: name,
            Email: email,
            Phone: phone
        }
        axios.post('https://sheet.best/api/sheets/ee062024-f359-413d-aa76-29a826074b05',data).then((response)=>{
            
            setName('');
            setEmail('');
            setPhone('');
            router.push('https://lapcareaws-static.s3.ap-south-1.amazonaws.com/downloads/LSDeskCleaningTool.exe');
        })
    }

    return (
        <>
             < img src="/pccleaner.png" className={classes.root}
      data-bm-widget-agent-id="8fe6fc3c-ba08-4667-9899-ada50e61f024"
      data-bm-widget-context="VGhpcyBpcyBhIGJ1dHRvbiB0ZXN0Lgo="></img>
    {/* <img src="/pccleaner.png" className={classes.root} onClick={handleDownload} />*/}
            <Dialog
                open={open}
                TransitionComponent={Transition}
                scroll="body"
            >
                <button>
                <IconButton size="small" className={classes.closeBtn} onClick={() => setOpen(false)}>
                    <CloseIcon fontSize="inherit" />
                </IconButton></button>
                <DialogContent className={classes.dialog}>
                    <img
                        src="https://lapcareaws-static.s3.ap-south-1.amazonaws.com/lapscan/Lapscan+PC+Cleaner+popup+500+x+500.png"
                        className={h500 ? 'h500' : (h600 ? 'h600' : '')}
                    />
                    
                    <div>
                        
                   
                    <form autoComplete="off" onSubmit={handleSubmit}>
                                        <br />
                                        <div class="form-group">
                                        <TextField id="name" label="Enter Your Name" variant="outlined" style={{width: "100%"}} required onChange={(e)=>setName(e.target.value)} value={name}/>
                                        </div><br />
                                        <div class="form-group">
                                        <TextField id="email" label="Enter Your email" variant="outlined" style={{width: "100%"}} required onChange={(e)=>setEmail(e.target.value)} value={email}/>
                                        </div><br />
                                        
                                        <div class="form-group">
                                        <TextField id="phone" label="Enter Your Phone Number" variant="outlined" style={{width: "100%"}} required onChange={(e)=>setPhone(e.target.value)} value={phone}/>
                                        </div><br />
                                        <div class="form-group">
                                            <input type="submit" name="submit" class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-disableElevation MuiButton-fullWidth" value="Submit to Download" />
                                        </div><br />
                                    </form>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
