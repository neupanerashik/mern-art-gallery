import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

// import css and components
import './changePassword.css'
import Seo from "../../seo/seo";
import Bubbles from "../../utility/bubbles/bubbles.jsx"

const ChangePassword = () => {
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading]  = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleChangePassword = async (body) => {
        try{
            setIsLoading(true);
            const {data} = await axios.put('/api/v1/password/update', body);
            setIsLoading(false);
            if(data.success) return toast.success(data.message);
        }catch(err){
            setIsLoading(false);
            return toast.error(err.response.data.message);
        }
    } 

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!oldPassword || !newPassword) return toast.warn("Please, provide email!");
        handleChangePassword({oldPassword, newPassword})
    } 

    return (
        <>
            <Seo title="Change Password" />
           
            <div className="changePasswordContainer">
                <form>
                    <label>
                        <h2>Change Password</h2>
                    </label>

                    <label>
                        <input type={show ? "text" : "password"} value={oldPassword} onChange={e => setOldPassword(e.target.value)} placeholder="Old Password" autoComplete="off" required/>
                    </label>

                    <label>
                        <input type={show ? "text" : "password"} value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="New Password" autoComplete="off" required/>
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

export default ChangePassword;