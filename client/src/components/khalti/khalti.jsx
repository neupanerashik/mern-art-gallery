import axios from "axios";
import { toast } from "react-toastify";
import KhaltiCheckout from "khalti-checkout-web";

let config = {
    "publicKey": process.env.REACT_APP_KHALTI_PUBLIC_KEY,
    "productIdentity": "123",
    "productName": "Abc",
    "productUrl": "http://localhost:3000",
    "eventHandler": {
        onSuccess (payload) {
            const handleSuccess =  async () => {
                try{
                    const {data, status} = await axios.post('/api/v1/verify-payment', {"token": payload.token, "amount": payload.amount})
                    console.log(data.verified_payment)

                    if(status >= 300) return toast.warn('Something went wront!')
                    else {
                        const donator = data.verified_payment.user.name;
                        const index = donator.lastIndexOf(' ');
                        const donatorName = donator.slice(0, index)
                        return toast.success(`Thank you ${donatorName} for the donation.`)
                    }
                }catch(err){
                    return toast.error(err.message)
                }
            }

            handleSuccess();
        },
        onError (error) {
            console.log(error);
            toast.error(error.detail);
        }
    },
    // the array below can contain any of: "KHALTI", "MOBILE_BANKING", "EBANKING", "CONNECT_IPS", "SCT"
    paymentPreference: ["KHALTI"]
};

const Khalti = () => {
    let checkout = new KhaltiCheckout(config);

    return (
        <button onClick={() => checkout.show({amount: 10000})}>Donate</button>
    )
}

export default Khalti