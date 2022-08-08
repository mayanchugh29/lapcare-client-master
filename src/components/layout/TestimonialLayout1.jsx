import React from "react";
import Image from 'next/image'
import {
    Box,
    Typography,
} from "@material-ui/core";

import styles from "../../../styles/componentStyles/TestimonialLayout1.module.css";


export default function TestimonialLayout1(props) {
    return (
        <Box className={styles.testimonials_container}>
            <Box className={styles.testimonials_inn}>
                <Box className={styles.testimonials_pic_outer}>
                    <Image
                        src={props.src}
                        alt="product image"
                        height={140} 
                        width={140}
                    
                    />
                </Box>

                <Box>
                    <Typography variant="body1" align="center" gutterBottom>
                        {props.description}
                    </Typography>

                    <Typography variant="h5" align="center">
                        {props.name}
                    </Typography>
                </Box>
            </Box >
        </Box >
    );
}