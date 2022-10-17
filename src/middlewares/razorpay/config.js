

 function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}


const razorpayWindow = async (order_data,token,setToastify,router)=>{


    const razorpay_sdk_load = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!razorpay_sdk_load) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
    }

    const options = {
        key: "rzp_live_CuuiODOZhNV0yY", // Enter the Key ID generated from the Dashboard
        amount: order_data.amount.toString(),
        currency: order_data.currency.toString(),
        name: "Lapcare",
        order_id: order_data.id, 
        description: `Payment for ${order_data.orderId}`,
        image: 'https://lapcare-static.s3.ap-south-1.amazonaws.com/home/lapcare_logo.png',
        handler: async function (res) {
            setToastify('Payment Processing!','info')
            router.push(`/order-details/${order_data.orderId}`)
        },
        "modal": {
            "ondismiss": function(){
                setToastify('Payment Failed!','error')
                router.replace(`/order-details/${order_data.orderId}`)
            }
        },
        prefill: {
            name: `${order_data.customer_name}`,
            email: `${order_data.email}`,
            contact: `${order_data.contact}`,
        },
        notes: {
            address: "Lapcare Private Ltd.",
        },
        theme: {
            color: "#fccd43",
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

}


export default razorpayWindow
