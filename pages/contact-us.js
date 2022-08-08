import React from "react";
import axios from "axios";


import { Container } from "@material-ui/core";

//Page Components
import LocationSearchWorldWise from "../src/components/contact/LocationSearchWorldWise";
import LocationSearchOverIndia from "../src/components/contact/LocationSearchOverIndia";
import ContactUsFrm from "../src/components/contact/form";
import AccBreadcrumbs from "../src/components/common/breadcrumbs/AccBreadcrumbs";
import { base_url } from "../src/middlewares/axios/baseUri";



const Contact = (props) => {

	return (
		<div>
			<AccBreadcrumbs
				breadcrumbs={[
					{ routeName: "Home", route: "/" },
					{ routeName: "Contact Us", route: "/contact_us" },
				]}
			/>
			<Container>
				<ContactUsFrm />
				<LocationSearchWorldWise />
				<LocationSearchOverIndia branches={props.data} />
			</Container>
		</div>
	);
};

export async function getServerSideProps(context) {
	const res = await axios.get(`${base_url}/warehouse`);
	let data = res.data.data;
	return {
		props: { data },
	};
}

export default Contact;
