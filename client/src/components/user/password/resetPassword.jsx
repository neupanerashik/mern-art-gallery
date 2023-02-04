import { useState } from 'react';
import {useParams} from "react-router-dom"
import { toast } from 'react-toastify';
import axios from 'axios';

// import css and components
import './resetPassword.css'
import Seo from "../../seo/seo";
import Bubbles from "../../utility/bubbles/bubbles.jsx"

const ResetPassword = () => {
    const {token} = useParams();
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading]  = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleResetPassword = async (body) => {
        try{
            setIsLoading(true);
            const {data} = await axios.put(`/api/v1/password/reset/${token}`, body);
            setIsLoading(false);
            if(data.success) return toast.success(data.message);
        }catch(err){
            setIsLoading(false);
            return toast.error(err.response.data.message);
        }
    } 

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!password || !confirmPassword) return toast.warn("Please, provide email!");
        handleResetPassword({password, confirmPassword, token})
    } 

    return (
        <>
            <Seo title="Reset Password" />
           
            <div className="resetPasswordContainer">
                <form>
                    <label>
                        <h2>Reset Password</h2>
                    </label>

                    <label>
                        <input type={show ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Create Password" autoComplete="off" required/>
                    </label>

                    <label>
                        <input type={show ? "text" : "password"} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm Password" autoComplete="off" required/>
                    </label>

                    <div className='showPassword'>
                        <input type="checkbox" checked={show} onChange={e=>setShow(!show)} />
                        <span>Show Password</span>
                    </div>

                    <div className='submitButton'>
                        <button type="submit" onClick={handleSubmit}>{isLoading ? <Bubbles /> : "Submit"}</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default ResetPassword;