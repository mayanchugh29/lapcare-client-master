import React from "react";
import Link from 'next/link';
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

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
import router from "next/router";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    paper: {
        marginRight: theme.spacing(2),
    },
}));

export default function AccountsDropdown() {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const token = useSelector(state => state.authReducer.token)

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };



    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };
    const handleLogout = (event)=>{
        localStorage.clear();
        window.location.reload();
    }

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

                className={styles.dropdown_toggle_btn}
                disableRipple
            >
                <AccountCircleIcon />
            </Button>

            <Popper style={{zIndex:1000}} 
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
                        style={{zIndex:1000,
                            transformOrigin:
                                placement === "bottom" ? "center bottom" : "left bottom",
                        }}
                    >
                        <Paper className={styles.menu_paper}  style={{zIndex:1000}} >
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    id="menu-list-grow"
                                    onKeyDown={handleListKeyDown}
                                    className={styles.drop_menu_list}
                                >
                                    <MenuItem onClick={handleClose}>
                                    <Link href="/dashboard">
                                            <a >
                                                <span>Dashboard</span>
                                            </a>
                                        </Link>
                                    </MenuItem>
                                    {!token?<MenuItem onClick={handleClose}>
                                    <Link href="/login">
                                            <a >
                                                <span>SignIn/SignUp</span>
                                            </a>
                                        </Link>
                                        
                                    </MenuItem>:null}
                                    <MenuItem onClick={handleClose}>
                                    <Link href="/account/orders">
                                            <a >
                                                <span>Orders</span>
                                            </a>
                                        </Link>
                                        
                                    </MenuItem>
                                    {token?<MenuItem onClick={handleLogout}>Logout</MenuItem>:null}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>

        </>
    );
}
