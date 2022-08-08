import React from 'react'
import {Dialog,makeStyles} from "@material-ui/core";



const useStyles = makeStyles({
    root:{
        height:"100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        width:"100vw"
    },
    modal: {
        top:"50%",
        left:"50%",
      padding: "0",
      outline: "none",
      border:"none",
      "&:focus": {
        outline: "none"
      },
      backgroundColor:"transparent",
      margin:"0"
    }
  })


const PromotionalPopup = (props) => {
    const styles = useStyles()
    const handleClose = ()=>{
        props.setopen(false)
    }
    return (
        <Dialog onClose={handleClose} open={props.open} onClick={handleClose} className={styles.modal}
        PaperProps={{
    style: {backgroundColor:"transparent" }   }}
        >
            <img
      style={{ maxWidth: "100%"}}
      src="https://lapcare.sgp1.digitaloceanspaces.com/popup-prepiad%20discount.png"
      alt="image"
    />
        </Dialog>
    )
}

export default PromotionalPopup
