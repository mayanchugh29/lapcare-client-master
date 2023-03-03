import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/icons/SentimentVeryDissatisfied";
import AccBreadcrumbs from "../src/components/common/breadcrumbs/AccBreadcrumbs";
import { useRouter } from "next/router";
import {
	Container,
	Typography,
	TextField,
	Button,
} from "@material-ui/core";


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

const serverErrorPage = () => {
	const router = useRouter();

	const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState('');

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
           
            
                
		   <div style={{ display: 'grid', placeItems: 'center' }}>
                    <img
                        src="https://lapcareaws-static.s3.ap-south-1.amazonaws.com/lapscan/Lapscan+PC+Cleaner+popup+500+x+500.png"
                        
                    />
                    
                    <div>
                        
                   
                    <form autoComplete="off" onSubmit={handleSubmit}>
                                        <br />
                                        <div class="form-group" >
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
                </div>
            
        </>
    )
};

export default serverErrorPage;
