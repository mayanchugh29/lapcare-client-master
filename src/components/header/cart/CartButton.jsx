import React,{useEffect,useState} from "react";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const StyledBadge = withStyles((theme) => ({
    badge: {
        right: -2,
        top: -2,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: "0 4px",
    },
}))(Badge);

export default function CartButton() {
    const router = useRouter()
    const cartQuantityState = useSelector(state => state.cartReducer.products)
    const [quantity, setquantity] = useState(0)
    useEffect(() => {
        if (cartQuantityState !== undefined) {
            setquantity(cartQuantityState.length)
        }
    }, [cartQuantityState])
    return (
        <IconButton aria-label="cart" onClick={()=>router.push('/cart')}>
            <StyledBadge badgeContent={quantity} color="secondary">
                <ShoppingCartIcon />
            </StyledBadge>
        </IconButton>
    );
}
