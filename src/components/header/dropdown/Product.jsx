import React from "react";
import Link from 'next/link';
import {
    Container,
    Grid,
    Button,
    Box
} from "@material-ui/core";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Image from 'next/image'
import styles from "./../../../../styles/componentStyles/MenuDropdown.module.css";
import encodeUrl from "../../../helpers/url";

const Product1 = (props) => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);

    };

    const getAntivirusSku = (name)=>{
        if(name==='Ultimate Security'){
            return 'LOSFUS7148'
        }else if(name==='Lapcare AV Pro'){
            return 'LPSCAN2202'
        }else{
            return 'LPSCAN2201'
        }
    }

    const getUri = (category, name) => {
        if (category === "Antivirus") {
            return `/antivirus/${encodeUrl(name.toLowerCase())}/${getAntivirusSku(name)}`
        } else {
            return `/category/${encodeUrl(name)}`
        }
    }
    return (
        <>
            <Button
                activeclassname={styles.menu_actv}
                component="li"
                ref={anchorRef}
                aria-controls={open ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                className={styles.dropdown_toggle_btn}
                disableRipple
            >
                {props.category.name} <ExpandMoreIcon />
            </Button>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                className={styles.menu_popper_outer}
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}

                        in={open}

                        className={styles.mega_menu_grow}
                    >
                        <Paper className={styles.mega_menu_paper}   >
                            <ClickAwayListener onClickAway={handleClose} >
                                <Box className={styles.dropdown_box_outer} >
                                    <Container maxWidth="xl" className={styles.dropdown_container}>
                                        <Grid container >

                                            {props.category.child_categories.map((child_category, i) => (
                                                <Grid item xs={12} lg={3} key={i} onClick={handleClose}>
                                                    <Box className={styles.nav_item_box}  >
                                                        <Link href={getUri(props.category.name, child_category.name)}>
                                                            <a className={styles.nav_item} >
                                                                <span>{child_category.name}</span>
                                                                <div style={{ display: "block" }}>
                                                                    <Image src={child_category.images.sm} className="menu_item_image" width={55} height={30} layout="responsive" loading="eager" priority={true} />
                                                                </div>
                                                            </a>
                                                        </Link>
                                                    </Box>
                                                </Grid>
                                            ))}

                                        </Grid>
                                    </Container>
                                </Box>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
};

export default Product1;
