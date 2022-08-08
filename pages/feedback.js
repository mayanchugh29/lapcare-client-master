import React from "react";

//Material Ui Imports
import {Container } from "@material-ui/core";

//Page Components
import FeedbackForm from "../src/components/feedback/FeedbackForm";
import AccBreadcrumbs from '../src/components/common/breadcrumbs/AccBreadcrumbs';

const FeedBack = (props) => {
    return (
        <div>
            <AccBreadcrumbs breadcrumbs={[{ routeName: 'Home', route: '/' }, { routeName: 'feedback', route: '/feedback' }]}/>
            <Container maxWidth="lg" >
                <FeedbackForm />
            </Container>

        </div>
    );
};

export default FeedBack;