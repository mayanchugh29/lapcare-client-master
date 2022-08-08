import { Button, Dialog, DialogActions, DialogContent, Typography } from '@material-ui/core';
import React from 'react';

const TrackingStatus = (props) => {
    const handleClose = () => {
        props.setopen(false)
    }
    return (
        <Dialog open={props.open} maxWidth="lg" onClose={handleClose}>
            <Typography variant='h3' gutterBottom align='center'>Shipment</Typography>
            <DialogContent style={{ display: "flex", justifyContent: "center", fontSize: "1rem", fontWeight: "500", flexDirection: 'column' }}>
                <p>Courier : {props.shipment.courier_name}</p>
                <p>Awb Code : {props.shipment.awb_code}</p>
            </DialogContent>
            <DialogActions style={{display:"flex",justifyContent:'center'}} onClick={handleClose}>
                <Button variant="contained" color="primary">Close</Button>
            </DialogActions>
        </Dialog>
    )
}

export default TrackingStatus
