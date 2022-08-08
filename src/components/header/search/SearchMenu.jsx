import React from "react";

import styles from "../../../../styles/componentStyles/SearchMenu.module.css"

import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";

import SearchIcon from "@material-ui/icons/Search";

import IconButton from '@material-ui/core/IconButton';

import SearchApp from "./SearchApp";

export default function SearchMenu() {
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
            <IconButton className={styles.search_btn} color="secondary" component="span" ref={anchorRef}
                aria-controls={open ? "menu-list-grow" : undefined}
                onClick={handleToggle}>
                <SearchIcon />
            </IconButton>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                className={styles.search_menu_outer}
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === "bottom" ? "center top" : "center bottom",
                        }}
                        className={styles.search_menu_grow}
                    >
                        <Paper className={styles.search_menu_inn}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <SearchApp />
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
}
