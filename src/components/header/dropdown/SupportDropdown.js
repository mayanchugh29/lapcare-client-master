import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Link from 'next/link';


import {
    Button,
    MenuItem,
    Popper,
    Paper,
    Grow,
    ClickAwayListener,
    MenuList,
} from "@material-ui/core";


import styles from "../../../../styles/componentStyles/AccountsDropdown.module.css"


const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    paper: {
        marginRight: theme.spacing(2),
    },
}));

export default function SupportDropdown() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === "Tab") {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <>
            
            <Button
                component="li"
                ref={anchorRef}
                aria-controls={open ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                disableRipple
                className={styles.dropdown_toggle_btn}
            >
                Support <ExpandMoreIcon />
            </Button>

            <Popper 
                style={{zIndex:1000}}
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
                        style={{
                            transformOrigin:
                                placement === "bottom" ? "center bottom" : "left bottom",
                        }}
                    >
                        <Paper className={styles.menu_paper}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    id="menu-list-grow"
                                    onKeyDown={handleListKeyDown}
                                    className={styles.drop_menu_list}
                                >
                                    <MenuItem
                                        onClick={handleClose}
                                        className={styles.menu_item}
                                    >
                                        <Link href="/career">
                                            <a >
                                                <span>Career</span>
                                            </a>
                                        </Link>
                                    </MenuItem>

                                    <MenuItem
                                        onClick={handleClose}
                                        className={styles.menu_item}
                                    >
                                        <Link href="/register">
                                            <a >
                                                <span>Product Registration</span>
                                            </a>
                                        </Link>
                                    </MenuItem>

                                    <MenuItem
                                        onClick={handleClose}
                                        className={styles.menu_item}
                                    >
                                        <Link href="/feedback">
                                            <a >
                                                <span>Feedback</span>
                                            </a>
                                        </Link>
                                    </MenuItem>
                                    <MenuItem
                                        onClick={handleClose}
                                        className={styles.menu_item}
                                    >
                                        <Link href="/lapcare-protection-plan">
                                            <a >
                                                <span>LPP</span>
                                            </a>
                                        </Link>
                                    </MenuItem>
                                    <MenuItem
                                        onClick={handleClose}
                                        className={styles.menu_item}
                                    >
                                        <Link href="/contact-us">
                                            <a >
                                                <span>Contact Us</span>
                                            </a>
                                        </Link>
                                    </MenuItem>
                                    <MenuItem
                                        onClick={handleClose}
                                        className={styles.menu_item}
                                    >
                                        <Link href="/service-centers">
                                            <a >
                                                <span>Service Centers</span>
                                            </a>
                                        </Link>
                                    </MenuItem>
                                    {/*
                                    <MenuItem
                                        onClick={handleClose}
                                        className={styles.menu_item}
                                    >
                                        <Link href="/e-waste-management">
                                            <a >
                                                <span>E-waste Management</span>
                                            </a>
                                        </Link>
                                    </MenuItem>*/}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
}
