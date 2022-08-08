import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Container,
  Box,
} from "@material-ui/core";

import styles from "../../../styles/componentStyles/Header.module.css";

import MenuIcon from "@material-ui/icons/Menu";

import MobileMenu from "./dropdown/MobileMenu";

import Product from "./dropdown/Product";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";

import AccountsDropdown from "./dropdown/AccountsDropdown";
import SupportDropdown from "./dropdown/SupportDropdown";

import SearchMenu from "./search/SearchMenu";
import Cart from "./cart/CartButton";
import request from "../../middlewares/axios/get";
import { useDispatch } from "react-redux";
import { ADD_CATEGORIES } from "../../store/actionTypes/category";

export default function Header() {
  const dispatch = useDispatch();
  const trigger = useScrollTrigger();
  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = state;
  const [categories, setcategories] = useState([]);

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 1240
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    const getCategories = async () => {
      const response = await request("/categories");
      if (response.status === 200) {
        dispatch({
          type: ADD_CATEGORIES,
          payload: response.data.categories,
        });
        setcategories(response.data.categories);
      }
    };

    getCategories();

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  const displayDesktop = () => {
    return (
      <Container
        maxWidth="lg"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0",
          textAlign: "center",
        }}
      >
        <Box width={2 / 12}>
          <div style={{ width: "175px", padding: "8px" }}>
            {femmecubatorLogo}
          </div>
        </Box>

        <Box width={8 / 12}>
          {categories.map((category, i) => (
            <Product category={category} key={i} />
          ))}
          <SupportDropdown style={{ zIndex: 1000 }} />
        </Box>

        <Box width={2 / 12} style={{ textAlign: "center" }}>
          <SearchMenu />
          <Cart />
          <AccountsDropdown style={{ zIndex: 1000 }} />
        </Box>
      </Container>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar className={styles.toolbar}>
        <div>{femmecubatorLogo}</div>
        <div>
          <AccountsDropdown />
          <Cart />
          <IconButton
            {...{
              edge: "end",
              color: "secondary",
              "aria-label": "menu",
              "aria-haspopup": "true",
              onClick: handleDrawerOpen,
            }}
            className={styles.mobile_menu_btn}
          >
            <MenuIcon />
          </IconButton>
        </div>

        <Drawer
          {...{
            anchor: "left",
            open: drawerOpen,
            onClose: handleDrawerClose,
            onClickCapture: getDrawerChoices,
          }}
          className={styles.mobile_drawer}
        >
          <div className={styles.drawerContainer}>{getDrawerChoices()}</div>
        </Drawer>
      </Toolbar>
    );
  };

  const getDrawerChoices = () => {
    return (
      <div className={styles.mobile_menu}>
        <MobileMenu categories={categories} setState={setState} />
      </div>
    );
  };

  const femmecubatorLogo = (
    <Link href="/" passHref>
      <a>
        <Image
          src="/lapcare-logo.png"
          alt="lapcare_logo"
          className={styles.logo}
          height={35}
          width={175}
          loading="eager"
          priority={true}
        />
      </a>
    </Link>
  );

  return (
    <AppBar
      className={styles.header_outer}
      position={!trigger ? "relative" : "fixed"}
      style={{ zIndex: 1000 }}
    >
      {mobileView ? displayMobile() : displayDesktop()}
    </AppBar>
  );
}
