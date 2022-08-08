import React from "react";
import { Container, Typography } from "@material-ui/core";
import AccBreadcrumbs from "../src/components/common/breadcrumbs/AccBreadcrumbs";
import styles from "../styles/PrivacyPolicy.module.css";

const PrivacyPolicy = (props) => {
	return (
		<React.Fragment>
			<AccBreadcrumbs
				breadcrumbs={[
					{ routeName: "Home", route: "/" },
					{ routeName: "Privacy Policy", route: "/privacy-policy" },
				]}
			/>
			<Container className={styles.mainContainer}>
				<Typography variant="h3">Privacy Policy</Typography>
				<br />
				<div className={styles.content}>
				<Typography variant="body2">
					<ol style={{ marginLeft: "25px" }}>
						<li>We appreciate your faith in us and understand the importance of secure transactions and data privacy. This Privacy Policy explains how RX INFOTECH PRIVATE LIMITED and its affiliates (collectively "Lapcare, we, our, us") gather, utilize, disclose, and otherwise treat your personal information via the Lapcare website, mobile application, and m-site (hereinafter referred to as the "Platform")</li>
						<li>While you may be able to browse certain sections of the Platform without registering with us, however, please note we do not offer any product or service under this Platform outside India. Your personal information will primarily be stored and processed in India and may have data protection laws that are different from those that apply in the country in which you are located.</li>
						<li>By visiting this Platform, providing your information or availing out product/service, you expressly agree to be bound by the terms and conditions of this Privacy Policy, the Terms of Use and the applicable service/product terms and conditions, and agree to be governed by the laws of India including but not limited to the laws applicable to data protection and privacy. If you do not agree please do not use or access our Platform.</li>
						<li>We are committed to treating data privacy seriously. It is important that you know exactly what we do with your Personal Data.</li>
						<li>Our privacy policy is subject to change at any time without notice. To make sure you are aware of any changes, please review this policy periodically.</li>
						<li>
						<Typography variant="subtitle1">WHAT DO WE DO WITH YOUR INFORMATION?</Typography>
							<ol style={{ marginLeft: "40px" }} type="a">
								<li>When you purchase something from our website/ portal, as part of the buying and selling process, we collect the personal information, such as your name, address and email address or any other information which is provided by you from time to time. Further, we automatically receive your computer’s internet protocol (IP) address in order to provide us with information that helps us learn about your browser and operating system.</li>
								<li>When you create an account, transact with us, or participate in an event or contest, we may gather personal information from you (such as your email address, delivery address, name, phone number, credit card/debit card and other payment instrument details). While you can view various areas of our Platform without registering, some activities (including placing a purchase or using our online content or services) do require registration. We use your contact information to send you offers based on your previous orders and your interests.</li>
								<li>If you choose to post messages on our message boards, chat rooms or other message areas or leave feedback on the Platform or the social media handles maintained by us or if you use voice commands or virtual try and buy or similar feature to shop on the Platform, we will collect that information you provide to us. We retain this information as necessary to resolve disputes, provide customer support, troubleshoot problems or for internal research and analysis as permitted by law.</li>
								<li>We may share personal information with our other corporate entities and affiliates. These entities and affiliates may market to you as a result of such sharing unless you explicitly opt-out.</li>
								<li>We may disclose personal information to third parties. This disclosure may be required for us to provide you access to our Services, to comply with our legal obligations, to enforce our User Agreement, to facilitate our marketing and advertising activities, or to prevent, detect, mitigate, and investigate fraudulent or illegal activities related to our Services. We do not disclose your personal information to third parties for their marketing and advertising purposes without your explicit consent.</li>
								<li>We may disclose personal information if required to do so by law or in the good faith belief that such disclosure is reasonably necessary to respond to subpoenas, court orders, or other legal process. We may disclose personal information to law enforcement offices, third party rights owners, or others in the good faith belief that such disclosure is reasonably necessary to: enforce our Terms or Privacy Policy; respond to claims that an advertisement, posting or other content violates the rights of a third party; or protect the rights, property or personal safety of our users or the general public.</li>
								<li>We and our affiliates may share some or all of your personal information with another business entity should we (or our assets) plan to merge with, or be acquired by that business entity, or re- organization, amalgamation, restructuring of business. Should such a transaction occur that other business entity (or the new combined entity) will be required to follow this privacy policy with respect to your personal information.</li>
								<li>f you send us personal correspondence, such as emails or letters, or if other users or third parties send us correspondence about your activities or postings on the Platform, we may collect such information into a file specific to you.</li>


							</ol>
						</li>
						<li>
						<Typography variant="subtitle1">USE OF DEMOGRAPHIC / PROFILE DATA / YOUR INFORMATION</Typography>
							<ol style={{ marginLeft: "40px" }} type="a">
								<li>Your personal information is used to provide you with the products and services you have requested. If we use your personal information to market to you, we will give you the option to opt out of that marketing. We use your personal information to fulfil orders; improve customer experience; resolve disputes; troubleshoot problems; help promote a safe service; collect money; measure consumer interest in our products and services; inform you about online and offline offers, products, services, and updates; customize and enhance your experience; detect and protect us against error, fraud, and other criminal activity; measure consumer interest in our products and services; inform you about online and offline offers, products, services, and updates; detect and protect us against error; enforce our terms and conditions; and as otherwise described to you at the time of collection of information.</li>
								<li>With your consent, we may have access to your SMS, instant messages, contacts in your directory, location, camera, photo gallery and device information. </li>
							</ol>
						</li>
						<li>
						<Typography variant="subtitle1">CATEGORIES OF PERSONAL DATA COLLECTED AND PROCESSED BY US</Typography>
							
							<ol style={{ marginLeft: "40px" }} type="a">
								<li>Demographic & Identity data
									<ol style={{ marginLeft: "40px" }} type="i">
										<li>Contact details such as Name, email address, contact number, shipping address, country, date of birth, profile picture</li>
										<li>Open data and public records such as information about YOU that is openly available on the internet</li>
										<li>Details such as Transaction amount, Bank Name, Card Type, Card number.</li>
									</ol>
								</li>
								<li>
									Online Identifiers and other Technical Data
									<ol style={{ marginLeft: "40px" }} type="i">
										<li>Location details such as data we get about your location, IP address, logs, or from where you connect a computer to the internet</li>
										<li>Technical details such as device information, location and network carrier when you use our mobile applications</li>
										<li>Communications details such as the Metadata and other Personal Data we get from communications done through e-mails, SMS, instant messages and calls</li>
										<li>Usage data details such as data about how you use our website or web-based properties, pages viewed, etc.</li>
									</ol>

								</li>
							</ol>
						</li>
						<li>
							<Typography variant="subtitle1">COOKIES</Typography>
							
							We use data collection devices such as "cookies" on certain pages of the Platform to help analyse our web page flow, measure promotional effectiveness, and promote trust and safety. "Cookies" are small files placed on your hard drive that assist us in providing our services. Cookies do not contain any of your personal information. We offer certain features that are only available through the use of a "cookie". We also use cookies to allow you to enter your password less frequently during a session. Cookies can also help us provide information that is targeted to your interests. Most cookies are "session cookies," meaning that they are automatically deleted from your hard drive at the end of a session. You are always free to decline/delete our cookies if your browser permits, although in that case you may not be able to use certain features on the Platform and you may be required to re-enter your password more frequently during a session. Additionally, you may encounter "cookies" or other similar devices on certain pages of the Platform that are placed by third parties. We do not control the use of cookies by third parties. We use cookies from third-party partners such as Google Analytics for marketing and analytical purposes. Google Analytics help us understand how our customers use the site. You can read more about how Google uses your personal information here: https://www.google.com/intl/en/policies/privacy/. You can opt-out of Google Analytics here: https://tools.google.com/dlpage/gaoptout. You can also control the use of cookies at the individual browser level, but if you choose to disable cookies, it may limit your use of certain features or functions on the services.

						</li>
						<li>
							<Typography variant="subtitle1">LINKS TO OTHER SITES</Typography>
							
							Our Platform links to other websites that may collect personal information about you. RX INFOTECH PRIVATE LIMITED is not responsible for the privacy practices or the content of those linked websites. We recommend that you review the privacy policies of any other websites you visit
						</li>
						<li>
							<Typography variant="subtitle1">USE OF MINORS’ INFORMATION</Typography>
							
							Only those who are legally capable of forming a legally binding contract under the Indian Contract Act, 1872, are permitted to use our Platform. We do not knowingly seek or collect personal data from minors under the age of eighteen. If you have shared any personal information on children under the age of 18, you signify that you have the authority to do so and that you agree to allow us to use it in line with this Privacy Policy.

						</li>
						<li>
							<Typography variant="subtitle1">RETENTION AND DISPOSAL OF DATA</Typography>
							
							We keep your personal information for no longer than is necessary for the purpose for which it was collected or as required by any applicable legislation, in line with applicable laws. However, we may save data about you if we feel it is necessary to prevent fraud or future misuse, to allow RX INFOTECH PRIVATE LIMITED to exercise its legal rights and/or defend against legal claims, or for other legitimate reasons. We may keep your data in an anonymised form for analytical and research reasons in the future.
						</li>
						<li>
							<Typography variant="subtitle1">YOUR RIGHTS</Typography>
							We acknowledge that you have control over your Personal Data when you engage with RX INFOTECH PRIVATE LIMITED. These rights include, among other things, allowing you to view your personal data and correcting any inaccuracies. You may delete certain non-mandatory information by logging into our website and visiting Profile and Settings sections. You can also write to us at the contact information provided below to assist you with these requests. You have the option to withdraw your consent that you have previously given us by writing to us at the contact information provided below. In the subject line of your email, please write "for withdrawal of consent." We will double-check such requests before acting on them. Please note, however, that consent withdrawal will not be retroactive and will be done in accordance with the rules of this Privacy Policy, related Terms of Use, and applicable laws. If you withdraw your consent given to us under this Privacy Policy, your access to the Platform may be hampered, and we may be unable to provide you with services for which we believe such information is required.


						</li>
						<li>
							<Typography variant="subtitle1">CHANGES TO THIS PRIVACY POLICY</Typography>
							We reserve the right to modify this privacy policy at any time, so please review it frequently. Changes and clarifications will take effect immediately upon their posting on the website. If we make material changes to this policy, we will notify you here that it has been updated, so that you are aware of what information we collect, how we use it, and under what circumstances, if any, we use and/or disclose it. If our business is acquired or merged with another company, your information may be transferred to the new owners so that we may continue to sell products to you.

						</li>
						<li>
							<Typography variant="subtitle1">GRIEVANCE OFFICER/CONTACT INFORMATION</Typography>
							If you would like to: access, correct, amend, or delete any personal information we have about you, register a complaint, or simply want more information then contact us at customercare@lapcare.com

						</li>
					</ol>
					</Typography>
				</div>
			</Container>
		</React.Fragment>
	);
};

export default PrivacyPolicy;
