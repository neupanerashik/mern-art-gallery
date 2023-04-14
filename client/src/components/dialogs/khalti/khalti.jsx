import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { getUserProfile } from "../../../redux/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import KhaltiCheckout from "khalti-checkout-web";

const Khalti = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { userData, isLoading } = useSelector(state => state.profile);

    useEffect(() => {
        dispatch(getUserProfile(id))
    }, [dispatch, id])

    let checkout = new KhaltiCheckout({
        "publicKey": userData?.donation?.khalti?.public_key,
        "productIdentity": userData?._id,
        "productName": userData?.name,
        "productUrl": "http://localhost:3000",
        "eventHandler": {
            onSuccess (payload) {
                const handleSuccess =  async () => {
                    try{
                        const {data, status} = await axios.post('/api/v1/verify-payment', {
                            "token": payload.token, 
                            "amount": payload.amount, 
                            "user_id": userData?._id
                        })
    
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
    });


    return (
        <button onClick={() => checkout.show({amount: 10000})} disabled={isLoading}>{isLoading ? "Loading" : "Donate"}</button>
    )
}

export default Khalti