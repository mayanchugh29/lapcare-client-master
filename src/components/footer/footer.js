import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import YouTubeIcon from "@material-ui/icons/YouTube";
import DeliveryIcon from "@material-ui/icons/LocalShipping";
import ReplacementIcon from "@material-ui/icons/History";
import { Container, Typography } from "@material-ui/core";

import styles from "../../../styles/componentStyles/Footer.module.css";
import { KeyboardArrowDownRounded } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { SET_TOASTIFY } from "../../store/actionTypes/toastify";

const Footer = () => {
  const dispatch = useDispatch();
  const [email, setemail] = useState("");
  const handleSubmit = () => {
    if (email.length === 0) {
      dispatch({
        type: SET_TOASTIFY,
        payload: {
          type: "error",
          open: true,
          msg: "Email is invalid",
        },
      });
    } else {
      dispatch({
        type: SET_TOASTIFY,
        payload: {
          type: "success",
          open: true,
          msg: "Your email is subscribed",
        },
      });
      setemail("");
    }
  };
  return (
    <div className={styles.footer_parent_container}>
      <Container maxWidth="lg">
        <div className={styles.logo_container}>
          <Link href="/">
            <a>
              <Image
                src="https://lapcare-static.s3.ap-south-1.amazonaws.com/home/lapcare-logo-white.png"
                alt="lapcare_logo"
                layout="intrinsic"
                height={50}
                width={200}
                priority={true}
                loading="eager"
              />
            </a>
          </Link>
        </div>
        <div className={styles.footer}>
          <div className={styles.column}>
            <div className={styles.section_header}>
              <Typography variant="h6">CUSTOMER SERVICE</Typography>
              <KeyboardArrowDownRounded
                style={{ color: "#f5f5f5", display: "none" }}
              />
            </div>
            <Link href="/">
              <a>
                <Typography variant="body2" gutterBottom>
                  Home
                </Typography>
              </a>
            </Link>
            <Link href="/">
              <a>
                <Typography variant="body2" gutterBottom>
                  Products
                </Typography>
              </a>
            </Link>
            <Link href="/register">
              <a>
                <Typography variant="body2" gutterBottom>
                  Product Register
                </Typography>
              </a>
            </Link>
            <Link href="/contact-us">
              <a>
                <Typography variant="body2" gutterBottom>
                  Contact Us
                </Typography>
              </a>
            </Link>
            <Link href="/account/orders">
              <a>
                <Typography variant="body2" gutterBottom>
                  Track Orders
                </Typography>
              </a>
            </Link>
            <Link href="/dashboard">
              <a>
                <Typography variant="body2" gutterBottom>
                  Dashboard
                </Typography>
              </a>
            </Link>
            <Link href="/feedback">
              <a>
                <Typography variant="body2" gutterBottom>
                  Feedback
                </Typography>
              </a>
            </Link>
            <Link href="/lapcare-protection-plan">
              <a>
                <Typography variant="body2" gutterBottom>
                  LPP
                </Typography>
              </a>
            </Link>
          </div>
          <div className={styles.column}>
            <div className={styles.section_header}>
              <Typography variant="h6">COMPANY</Typography>
              <KeyboardArrowDownRounded
                className={styles.expandale_icon}
                style={{ color: "#f5f5f5", display: "none" }}
              />
            </div>
            <Link href="/about-us">
              <a>
                <Typography variant="body2" gutterBottom>
                  About Us
                </Typography>
              </a>
            </Link>
            <Link href="/download">
              <a>
                <Typography variant="body2" gutterBottom>
                  Download
                </Typography>
              </a>
            </Link>
            <Link href="/career">
              <a>
                <Typography variant="body2" gutterBottom>
                  Career
                </Typography>
              </a>
            </Link>
            <Link href="/terms-conditions">
              <a>
                <Typography variant="body2" gutterBottom>
                  Terms & Conditions
                </Typography>
              </a>
            </Link>
            <Link href="/service-centers">
              <a>
                <Typography variant="body2" gutterBottom>
                  Service Centers
                </Typography>
              </a>
            </Link>
            <Link href="/privacy-policy">
              <a>
                <Typography variant="body2" gutterBottom>
                  Privacy Policy
                </Typography>
              </a>
            </Link>
            <Link href="/shipping-policy">
              <a>
                <Typography variant="body2" gutterBottom>
                  Shipping Policy
                </Typography>
              </a>
            </Link>
            <Link href="/return-refund-cancellation-policy">
              <a>
                <Typography variant="body2" gutterBottom>
                  Return & Refund Policy
                </Typography>
              </a>
            </Link>
            <Link href="https://stores.lapcare.com/">
              <a>
                <Typography variant="body2" gutterBottom>
                  Locate Us
                </Typography>
              </a>
            </Link>
          </div>
          <div className={styles.column}>
            <Typography variant="h6" gutterBottom>
              CONNECT WITH US
            </Typography>
            <div className={styles.socialAccounts}>
              <a href="https://www.facebook.com/lapcareworld">
                <FacebookIcon style={{ color: "#f5f5f5" }} />
              </a>

              <a href="https://www.instagram.com/lapcareworld/">
                <InstagramIcon style={{ color: "#f5f5f5" }} />
              </a>

              <a href="https://twitter.com/Lapcare_World">
                <TwitterIcon style={{ color: "#f5f5f5" }} />
              </a>

              <a href="https://www.linkedin.com/company/lapcare">
                <LinkedInIcon style={{ color: "#f5f5f5" }} />
              </a>

              <a href="https://www.youtube.com/channel/UCx_xjI8CLoM-8sw9In7trng">
                <YouTubeIcon style={{ color: "#f5f5f5" }} />
              </a>
            </div>
            <div style={{ marginTop: "24px" }}>
              <Typography variant="body2" gutterBottom>
                Customer Care: 8587812000
              </Typography>
              <br />
              <Typography variant="body2" gutterBottom>
                Email: customercare@lapcare.com
              </Typography>
            </div>
          </div>
          <div className={styles.column}>
            <Typography variant="h6">KEEP UP TO DATE</Typography>
            <div className={styles.subscription}>
              <input
                type="text"
                onChange={(e) => setemail(e.target.value)}
                placeholder="Enter Email Id"
                value={email}
              />
              <button onClick={handleSubmit}>Subscribe</button>
            </div>
          </div>
        </div>
        <div className={styles.footer_second_row}>
          <div className={styles.column}>
            <div className={styles.innerColumn_container}>
              <ReplacementIcon style={{ color: "#f5f5f5" }} />

              <Typography variant="body2">7 Days Return Policy</Typography>
            </div>

            
          </div>
          <div className={styles.column}>
            <div className={styles.paymentColumn}>
              <Typography variant="body2">100% Secure Payments</Typography>
              <Image
                src="https://lapcare-static.s3.ap-south-1.amazonaws.com/home/footer_icon.png"
                alt="payment methods"
                layout="responsive"
                height={50}
                width={350}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
