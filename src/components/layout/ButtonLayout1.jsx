import React from "react";


import {
    Button
} from "@material-ui/core";

import styles from "../../../styles/componentStyles/ButtonLayout1.module.css";
import { useRouter } from "next/router";

export default function Button1(props) {
    const router = useRouter()
    if (props.btn_class == "c_btn_outline") {
        return (
            <Button variant="outlined" className={styles.c_btn_outline} style={props.style} link={props.route}>
                {props.btn_text}
            </Button>
        );
    }
    else if (props.btn_class == "c_btn_outline_light") {
        return (
            <Button variant="outlined" className={styles.c_btn_outline_light} link={props.route}>
                {props.btn_text}
            </Button>
        );
    }
    else if (props.btn_class == "c_btn_fill_dark") {
        return (
            <Button variant="outlined" className={styles.c_btn_fill_dark} onClick={()=>router.push(props.route)}>
                {props.btn_text}
            </Button>
        );
    }
    else if (props.btn_class == "c_btn_fill_round") {
        return (
            <Button variant="outlined" className={styles.c_btn_fill_round} onClick={()=>router.push(props.route)}>
                {props.btn_text}
            </Button>
        );
    }
    else if (props.btn_class == "c_btn_outline_round") {
        return (
            <Button variant="outlined" className={styles.c_btn_outline_round} onClick={()=>router.push(props.route)}>
                {props.btn_text}
            </Button>
        );
    }
    else {
        return (
            <Button variant="outlined" color="secondary">
                {props.btn_text}
            </Button>
        );
    }
}