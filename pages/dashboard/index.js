import React, { useState } from 'react';
import styles from '../../styles/Dashboard.module.css';
import { useRouter } from 'next/router';


//Middlewares
import withAuth from '../../src/middlewares/Auth/protect_page';

//Material-Ui Imports
import {Typography,Container } from '@material-ui/core';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import PowerSettingsNewRoundedIcon from '@material-ui/icons/PowerSettingsNewRounded';
import LocalShippingRoundedIcon from '@material-ui/icons/LocalShippingRounded';
import { LocalMallRounded, ExpandMoreRounded} from '@material-ui/icons';

//Page Components
import UserInfo from '../../src/components/dashboard/UserInfo';
import Address from '../../src/components/dashboard/Address';
import Password from '../../src/components/dashboard/Password';
import EditEmail from '../../src/components/dashboard/Email'
import Breadcrumb from "../../src/components/common/breadcrumbs/AccBreadcrumbs";




const Dashboard = () => {
    const router = useRouter()
    
    const [showContainer, setshowContainer] = useState(1);
    const [expandMenuItem, setexpandMenuItem] = useState(false)
    return (
        <div>
            <Breadcrumb breadcrumbs={[
					{ routeName: "Home", route: "/" },
					{ routeName: "Dashboard", route: "/dashboard" },
				]} 
            />
       
        <Container maxWidth="lg">
            <div className={styles.dashboard_parent_container} >
                <div className={styles.menu_items_container} >
                    <div className={styles.expandable_container} onClick={() => setexpandMenuItem(!expandMenuItem)}>
                        <p>Dashboard</p>
                        <ExpandMoreRounded />
                    </div>
                    {expandMenuItem ?
                        <div className={styles.dashboard_items}>
                            <div className={styles.list_items} onClick={() => setshowContainer(1)} >
                                <PersonRoundedIcon color="primary" style={{ marginRight: "5px" }} />
                                <p>Personal Information</p>
                            </div>
                            <div className={styles.list_items} onClick={() => router.push('/account/orders')}>
                                <LocalMallRounded color="primary" style={{ marginRight: "5px" }} />
                                <p>Orders</p>
                            </div>
                            <div className={styles.list_items}>
                                <FavoriteRoundedIcon color="primary" style={{ marginRight: "5px" }} />
                                <p>Wishlist</p>
                            </div>
                            <div className={styles.list_items} onClick={() => setshowContainer(2)}>
                                <LocalShippingRoundedIcon color="primary" style={{ marginRight: "5px" }} />
                                <p>Manage Addresses</p>
                            </div>
                            <div className={styles.list_items} onClick={() => setshowContainer(3)}>
                                <EmailRoundedIcon color="primary" style={{ marginRight: "5px" }} />
                                <p>Change Email</p>
                            </div>
                            <div className={styles.list_items} onClick={() => setshowContainer(4)}>
                                <LockRoundedIcon color="primary" style={{ marginRight: "5px" }} />
                                <p>Change Password</p>
                            </div>
                            <div className={styles.list_items}>
                                <PowerSettingsNewRoundedIcon color="primary" style={{ marginRight: "5px" }} />
                                <p>Logout</p>
                            </div>
                        </div>
                        : null}
                </div>
                <div className={styles.left_container}>
                    <div className={styles.child_container} onClick={() => setshowContainer(1)}>
                        <PersonRoundedIcon color="primary" style={{ marginRight: "0.3rem" }} />
                        <Typography variant="h6">Personal Information</Typography>
                    </div>
                    <div className={styles.child_container} onClick={() => router.push('/account/orders')}>
                        <LocalMallRounded color="primary" style={{ marginRight: "0.3rem" }} />
                        <Typography variant="h6">Orders</Typography>
                    </div>
                    <div className={styles.child_container} >
                        <FavoriteRoundedIcon color="primary" style={{ marginRight: "0.3rem" }} />
                        <Typography variant="h6">Wishlist</Typography>
                    </div>
                    <div className={styles.child_container} onClick={() => setshowContainer(2)}>
                        <LocalShippingRoundedIcon color="primary" style={{ marginRight: "0.3rem" }} />
                        <Typography variant="h6">Manage Addresses</Typography>
                    </div>
                    <div className={styles.child_container} onClick={() => setshowContainer(3)}>
                        <EmailRoundedIcon color="primary" style={{ marginRight: "0.3rem" }} />
                        <Typography variant="h6">Change Email</Typography>
                    </div>
                    <div className={styles.child_container} onClick={() => setshowContainer(4)}>
                        <LockRoundedIcon color="primary" style={{ marginRight: "0.3rem" }} />
                        <Typography variant="h6">Change Password</Typography>
                    </div>
                    <div className={styles.child_container}>
                        <PowerSettingsNewRoundedIcon color="primary" style={{ marginRight: "0.3rem" }} />
                        <Typography variant="h6">Logout</Typography>
                    </div>
                </div>
                <div className={styles.right_container}>
                    <div className={styles.right_container__child_container}>
                        {showContainer === 1 ?
                            <UserInfo />
                            : null
                        }
                        {showContainer === 2 ? 
                            <Address />
                            : null
                        }
                        {showContainer === 3 ? 
                            <EditEmail />
                            : null
                        }
                        {showContainer === 4 ?  
                            <Password />
                            : null
                        }

                        {setshowContainer === 5 ?
                            <div className={styles.wishlist_container}>
                                
                            </div> : null
                        }




                    </div>
                </div>

            </div>
        </Container>
        </div>
    )
}

export default withAuth(Dashboard);