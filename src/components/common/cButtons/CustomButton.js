//Button.js

import React, { useState } from "react";
// import styles from './button.module.css';
import styles from "../../../../styles/Product.module.css";

const CustomButton = ({
	children,
	onClick,
	btnColor = "#fcc101",
	btnColorH = "#dcaa07",
	labelColor,
	disabled,
	type,
	style,
	...props
}) => {
	const [hover, setHover] = useState(false);
	const toggleHover = () => {
		setHover(!hover);
	};
	const commonStyles = {
		backgroundColor: btnColor,
		color: labelColor || "white",
	};
	const commonStylesHover = {
		backgroundColor: btnColorH,
		color: labelColor || "white",
	};
	const outlineStyles = {
		border: `1px solid ${btnColor}`,
		color: btnColor,
		backgroundColor: "transparent",
	};
	const outlineHoverStyle = {
		border: `1px solid ${btnColor}`,
		color: labelColor || "white",
		backgroundColor: btnColor,
	};

	const roundedStyle = {
		backgroundColor: btnColor,
		color: labelColor || "white",
		borderRadius: "25px",
	};

	const outlineRoundedStyle = {
		borderRadius: "25px",
		border: `1px solid ${btnColor}`,
		color: btnColor,
		backgroundColor: "transparent",
	};
	const outlineRoundedStyleHover = {
		borderRadius: "25px",
		border: `1px solid ${btnColor}`,
		color: labelColor || "white",
		backgroundColor: btnColor,
	};
	const disabledStyle = {
		cursor: "no-drop",
		backgroundColor: btnColor,
		color: labelColor || "white",
		opacity: 0.4,
	};
	const blockStyles = {
		width: "95%",
		margin: "0 auto",
	};
	let btnStyle;
	switch (type) {
		case "outline_rounded":
			if (hover) {
				btnStyle = outlineRoundedStyleHover;
			} else {
				btnStyle = outlineRoundedStyle;
			}
			break;
		case "rounded":
			btnStyle = roundedStyle;
			break;
		case "block":
			btnStyle = blockStyles;
			break;
		case "outline":
			if (hover) {
				btnStyle = outlineHoverStyle;
			} else {
				btnStyle = outlineStyles;
			}
			break;
		default:
			if (hover) {
				btnStyle = commonStylesHover;
			} else {
				btnStyle = commonStyles;
			}
			break;
	}
	return (
		<button
			style={
				disabled
					? {
							...commonStyles,
							...btnStyle,
							...disabledStyle,
							...style,
					  }
					: { ...commonStyles, ...btnStyle, ...style }
			}
			onMouseEnter={toggleHover}
			onMouseLeave={toggleHover}
			{...props}
			type="button"
			onClick={!disabled ? onClick : () => {}}
			className={`${styles.shopButton} c_btn`}
		>
			{children || "button"}
		</button>
	);
};

export default CustomButton;
