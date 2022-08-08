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
					{ routeName: "Return, Refund & Cancellation Policy", route: "/return-refund-cancellation-policy" },
				]}
			/>
			<Container className={styles.mainContainer}>
				<Typography variant="h3" gutterBottom>Cancellation Policy</Typography>
				<div className={styles.content}>
					<Typography variant="body2">
						<ol style={{ marginLeft: "40px" }} type="a">
							<li>
								A cancellation fee may be levied on a customer on account of cancellation of orders by customer on the Platform (“Cancellation Fee”). Such Cancellation Fee shall be charged based on the time during which the customer opts to cancel the order upon placing/confirming the said order on the Platform. It is clarified that there will be free cancellation of orders only for the initial few hours of placing an order, as specifically provided on the product page. After such time frame, Cancellation Fee will be levied on applicable products.
							</li>
							<li>
								Cancellation Fee is charged to compensate for the slot, time and effort incurred in processing an order by LAPCARE and to compensate the logistics service providers for incurring a cost when they ship the order.
							</li>
							<li>The Cancellation fee charged by LAPCARE shall be either equivalent to or less than the charges borne by LAPCARE on account of cancellation of an order by customers.</li>
							<li>The Cancellation Fee shall be deducted from the amount paid by the customer for the said cancelled order.</li>
							<li>LAPCARE reserves the right to modify/waive off the Cancellation fee from time to time. The Cancellation fee shall be quoted in Indian Rupees. You shall be solely responsible for compliance of all applicable laws for making payments to LAPCARE on account of any cancellation of orders from Your end.</li>
						</ol>
					</Typography>
				</div>
				<br /><br />
				<Typography variant="h3" gutterBottom>Return</Typography>
				<div className={styles.content}>
					<Typography variant="body2">
						There could be certain circumstances beyond our control where you could receive a damaged / defective product or a product that is not the same as per your original order. We will take back the product to your satisfaction at no extra cost. In such circumstances, before using the product, please get in touch with our Customer Service Team who will guide you on the process for the same at our Costumer Service number 8587812000 ) or Email support.orders@lapcare.com. The return process of the product can be restricted depending on the nature and category of the product.
						<br />
						<br />
						<Typography variant="subtitle1">CONDITIONS FOR RETURN</Typography>
						<br />
						<ol style={{ marginLeft: "40px" }} type="a">
							<li>
								Return shall only be applicable in case of any technical issue in the device or the device is damaged/dead on arrival (DOA) or if the product delivered is different from what was ordered or not as per the order specification. Return will not be entertained in any other situation.
							</li>
							<li>
								Please notify us of receipt of a Damaged/Defective product within 24 hours of delivery.
							</li>
							<li>
								The return must be initiated within 7 days of the receipt of the shipment.
							</li>
							
							<li>Products/Items should be UNUSED.</li>
							<li>Products should be returned in their original packaging along with the accessories, IMEI stickers (if any) , in the same condition in which you received it. Product must also be in its original package.</li>
							<li>It is advised that the return packets should be strongly and adequately packaged so that there is no further damage of goods in transit.</li>
							<li>To complete your return process, we will need a receipt or proof of purchase or invoice copy.</li>
							<li>A product will not be eligible for return if the customer is not happy with the look/sound quality of a defect free product, a physical damage not notified within 24 hours of receiving the product, an electrical surge or any damage caused by the customer/user.</li>
							<li>The cost of return shipping will be borne by the customer. The amount may be deducted from the payment made by the customer. </li>
						</ol>
					</Typography>
				</div>
				<br /><br />
				<Typography variant="h3">Refunds</Typography>
				<div className={styles.content}>
					<Typography variant="body2">
						<ol style={{ marginLeft: "40px" }}  type="a">
							<li>
								Refund shall only be applicable in case of any technical issue in the device or the device is dead on arrival (DOA). Refund will not be entertained in any other situation.
							</li>
							<li>
								We will process the refund after receipt of the product by RX INFOTECH PRIVATE LIMITED. or its business partner. All refunds will be routed through original payment gateway be it PAYTM/ UPI/GOOGLE PAY, or any other bank debit or credit cards accounts after adjusting the cancellation charges. Refund will be processed based on the mode of payment of the order.
							</li>
							<li>
								Orders paid by credit/ debit card will be refunded by credit back to the credit/ debit card within 7 working days and the refund will reflect in the next statement.
							</li>
							<li>
								Orders paid by net banking accounts will be credited back to bank account

							</li>
							<li>For all other modes of payment, we will send a refund cheque. The cheque will be made in favor of the name as in the "billing name" provided at the time of placing the order</li>
							<li>Once your return is received and inspected, you will receive an email about the status of your return.</li>
							<li>In case, your return has been accepted, the refund amount will be processed immediately. A credit will be automatically applied to your credit card or original payment method within 3-7 working days.</li>
							<li>If you haven't received your refund even after 7 days of processing your return, please check your bank account again. Otherwise, contact your credit card company; it may take some time before your refund is shown in your balance. You can always contact your bank branch. Usually, there is some difference in time before a refund is displayed in your account.</li>
							<li>If you have done all of the above and you still haven't received your refund amount, please write an email at support.orders@lapcare.com</li>
							<li>Only items that are regularly priced are eligible for a refund. Products that are bought on sale and other special offers cannot be refunded.</li>
						</ol>
					</Typography>
				</div>
			</Container>
		</React.Fragment>
	);
};

export default PrivacyPolicy;
