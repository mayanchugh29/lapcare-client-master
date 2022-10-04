import { Typography } from '@material-ui/core';
import React from 'react';
import styles from "../../../styles/Antivirus.module.css";

const Description = () => {
    return (
        <div className={styles.descriptionSection}>
            <div className={styles.comparisonChart}>
                <img
                    src="https://lapcare-static.s3.ap-south-1.amazonaws.com/lapscan/Antivirus+Inside+Sleeve+2.png"
                    alt="Comparison Chart"
                />
            </div>
            <div className={styles.descriptionContainer}>
                <div className={styles.productBanner}>
                    <img
                        src=""
                        className={styles.bannerImage}
                    />
                </div>
                <div className={styles.description}>
                    <Typography className={styles.descriptionSubTitle}>
                        Detects & Removes Malicious Threats
                    </Typography>
                    <Typography className={styles.descriptionContent}>
                        Blocks Viruses, Spyware, Adware, Trojans, Worms, Ransomware, Hijackers, Parasites,
                        Rootkits, KeyLoggers, and many more.
                    </Typography>
                </div>
                <div className={styles.description}>
                    <Typography className={styles.descriptionSubTitle}>
                        Stops Ransomware In Its Tracks
                    </Typography>
                    <Typography className={styles.descriptionContent}>
                        Protects your files and prevents hackers from holding them hostage.
                    </Typography>
                </div>
                <div className={styles.description}>
                    <Typography className={styles.descriptionSubTitle}>
                        Proprietary Definitions Database & Daily Updates
                    </Typography>
                    <Typography className={styles.descriptionContent}>
                        A dedicated threat research team scours the web and analyzes thousands of possible
                        threats, focusing on the hard-to-find ones. The database is updated 8-14 times a day.
                    </Typography>
                </div>
                <div className={styles.description}>
                    <Typography className={styles.descriptionSubTitle}>Multi-Dimensional Scanning</Typography>
                    <Typography className={styles.descriptionContent}>
                        A next-generation scanning system that goes beyond the typical rules-based methods. It
                        detects existing threats and analyzes general characteristics and code patterns to
                        identify future threats.
                    </Typography>
                </div>
                <div className={styles.description}>
                    <Typography className={styles.descriptionSubTitle}>
                        Analyzes Your System In-Depth
                    </Typography>
                    <Typography className={styles.descriptionContent}>
                        System Investigator identifies spoofed and malicious files.
                    </Typography>
                </div>
                <div className={styles.description}>
                    <Typography className={styles.descriptionSubTitle}>Easy to Use</Typography>
                    <Typography className={styles.descriptionContent}>
                        Receive notifications when product and database updates are available.
                    </Typography>
                </div>
                <div className={styles.description}>
                    <Typography className={styles.descriptionSubTitle}>Stay informed</Typography>
                    <Typography className={styles.descriptionContent}>
                        Review detailed scan logs about detected and removed threats and their locations.
                    </Typography>
                </div>
                <div className={styles.description}>
                    <Typography className={styles.descriptionSubTitle}>USB Data Loss Prevention</Typography>
                    <Typography className={styles.descriptionContent}>
                        Data Loss Prevention – Mass Storage toward your data theft, denying access to
                        unauthorized devices. Speedo scanner repair Infected USB’s in minutes and recovers the
                        files which got hidden by virus attacks
                    </Typography>
                </div>
                <div className={styles.description}>
                    <Typography className={styles.descriptionSubTitle}>Parental Control</Typography>
                    <Typography className={styles.descriptionContent}>
                        Safe guard your kids from access to inappropriate Internet websites content &
                        cyberbullying based on content categories, such as Porn/Adult & time restriction.
                    </Typography>
                </div>
                <div className={styles.description}>
                    <Typography className={styles.descriptionSubTitle}>Firewall. Keep out hackers</Typography>
                    <Typography className={styles.descriptionContent}>
                        Keeping away hackers from your home network. firewall technology provides a new layer of
                        proactive defense mechanics against unwanted hackers and identity thieves with this
                        first line of defense.
                    </Typography>
                </div>
                <div className={styles.description}>
                    <Typography className={styles.descriptionSubTitle}>Benefits vs other AV brands</Typography>
                    <Typography className={styles.descriptionContent}>
                        Signature-based malware detection together with advanced logistic heuristics ensures
                        comprehensive antivirus protection
                        <br />
                        <br /> Advanced detection of malicious programs
                        <br />
                        <br /> Unrivalled heuristic detection capabilities ensure protection against new and
                        ever evolving virus threats
                        <br />
                        <br /> Completely automatic file system protection that scans and disinfects all file
                        types, including those downloaded by web browsers.
                        <br />
                        <br /> Exclude files from automatic and manual scan
                        <br />
                        <br /> Schedule tasks to scan for viruses at a specified time and date
                        <br />
                        <br /> Password protection to prevent unauthorized modification of your Lapscan settings
                        <br />
                        <br /> Whitelist USB Scan USB Advance cleaning for Shotcut(lnk) Virus
                        <br />
                        <br /> USB Vaccination mode to prevent injection and hiding of user data Web Filtering (
                        50 Categories) Parental Control(Categories included from above 50) Time Restriction
                        Firewall Key/URL/IP rules
                        <br />
                        <br /> Data Encryption
                        <br />
                        <br /> Data Decryption
                        <br />
                        <br /> Light Weight solution
                        <br />
                        <br /> High speed with excellent detection
                        <br />
                        <br /> Fully automated and streamlined virus signature file updates and all software
                        upgrades included in one-year subscription
                        <br />
                        <br /> Automated updates ensure low maintenance
                        <br />
                        <br /> Low resource consumption and small memory footprint
                        <br />
                        <br /> 12 month subscription to all essential updates and virus signature files included
                        in license
                        <br />
                        <br /> Personal and quick support service, online and via e-mail
                    </Typography>
                </div>
                <div className={styles.description}>
                    <Typography className={styles.descriptionSubTitle}>
                        System requirements for Windows
                    </Typography>
                    <Typography className={styles.descriptionContent}>
                        Intel or AMD x32 / x64 <br />
                        <br />
                        Minimum RAM – : 1 GB
                        <br />
                        <br />
                        Free Disk Space – : 800 MB
                        <br />
                        <br />
                        “Windows Xp SP3, Windows Vista, Windows 7, Windows 8, Windows 10 Internet Connection is
                        must for License activation
                    </Typography>
                </div>
            </div>
        </div>
    )
}

export default Description
