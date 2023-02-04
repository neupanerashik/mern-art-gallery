import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

// import css and components
import './forgetPassword.css';
import Seo from "../../seo/seo";
import Bubbles from "../../utility/bubbles/bubbles.jsx"

const ForgetPassword = () => { 
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading]  = useState(false);

    const handleForgetPassword = async (body) => {
        try{
            setIsLoading(true);
            const {data} = await axios.post('/api/v1/password/forget', body);
            setIsLoading(false);
            if(data.success) return toast.success(data.message);
        }catch(err){
            setIsLoading(false);
            return toast.error(err.response.data.message);
        }
    } 

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) return toast.warn("Please, provide email!");
        handleForgetPassword({email})
    } 

    return (
        <>
            <Seo title="Forget Password" />
           
            <div className="forgetPasswordContainer">
                <form>
                    <label>
                        <h2>Forgot Password ?</h2>
                    </label>

                    <label>
                        <input type='text' name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email..." autoComplete="off" required/>
                    </label>

                    <div>
                        <button type="submit" onClick={handleSubmit}>{isLoading ? <Bubbles /> : "Submit"}</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default ForgetPassword;