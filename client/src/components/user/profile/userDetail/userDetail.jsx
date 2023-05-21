import moment from 'moment';
import { Tooltip } from '@mui/material';
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearError, clearMessage, updateProfile } from '../../../../redux/profileSlice';
import { deleteAccount } from '../../../../redux/userSlice';

// import css and components
import './userDetail.css'
import Bubbles from '../../../utility/bubbles/bubbles';

const UserDetail = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { myData } = useSelector(state => state.user);
    const { isLoading, error, message } = useSelector(state => state.profile);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [facebook, setFacebook] = useState('');
    const [instagram, setInstagram] = useState('');
    const [twitter, setTwitter] = useState('');
    const [khaltiPublicKey, setKhaltiPublicKey] = useState('');
    const [khaltiSecretKey, setKhaltiSecretKey] = useState('');

    const handleUpdate = async (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.append('name', name);
        myForm.append('email', email);
        myForm.append('facebook', facebook);
        myForm.append('instagram', instagram);
        myForm.append('twitter', twitter);
        myForm.append('khaltiPublicKey', khaltiPublicKey);
        myForm.append('khaltiSecretKey', khaltiSecretKey);
        dispatch(updateProfile(myForm));
    }

    const handleDeleteAccount = (e) => {
        e.preventDefault();
        const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
        if (confirmDelete) {
            dispatch(deleteAccount(myData._id));
            toast.success("Account deleted successfully!");
            navigate('/');
        } else {
            return;
        }
    }

    useEffect(() => {
        if (myData) {
            setName(myData.name);
            setEmail(myData.email);
            setFacebook(myData?.socials?.facebook ?? '');
            setInstagram(myData?.socials?.instagram ?? '');
            setTwitter(myData?.socials?.twitter ?? '');
            setKhaltiPublicKey(myData?.donation?.khalti?.public_key ?? '');
            setKhaltiSecretKey(myData?.donation?.khalti?.secret_key ?? '');
        }
    }, [myData]);

    useEffect(() => {
        if (message) {
            toast.success(message);
            dispatch(clearMessage());
        }

        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
    }, [dispatch, message, error])

    return (
        <div className='profileDetailContainer'>
            <header>
                <div>
                    <h2>Personal Info</h2>
                    <p>Update your photo and personal details here.</p>
                </div>
                <button onClick={handleUpdate}>{isLoading ? <Bubbles /> : "Save"}</button>
            </header>

            <div className="information">
                {/* general info */}
                <h1>General Information</h1>
                <div>
                    <span>Name</span>
                    <label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </label>
                </div>

                <div>
                    <span>Email Address</span>
                    <label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                </div>

                <div>
                    <span>Your Role</span>
                    <label>
                        <input type="text" defaultValue={myData?.role || ''} disabled />
                    </label>
                </div>

                <div>
                    <span>Joined At</span>
                    <label>
                        <input type="text" defaultValue={moment(myData?.joinedAt).format('YYYY-MM-DD') || ''} disabled />
                    </label>
                </div>

                <h1>Password Information</h1>
                <div>
                    <span>Password</span>
                    <label>
                        <Link to='/password/change'>Change Password</Link>
                    </label>
                </div>

                {/* social links */}
                <h1>Social Information</h1>
                <div>
                    <span>Facebook Id</span>
                    <label>
                        <input type="text" value={facebook} onChange={(e) => setFacebook(e.target.value)} />
                    </label>
                </div>

                <div>
                    <span>Instagram Id</span>
                    <label>
                        <input type="text" value={instagram} onChange={(e) => setInstagram(e.target.value)} />
                    </label>
                </div>

                <div>
                    <span>Twitter Id:</span>
                    <label>
                        <input type="text" value={twitter} onChange={(e) => setTwitter(e.target.value)} />
                    </label>
                </div>

                {/* donation */}
                <h1>Donation Setup - Khalti
                    <Tooltip title={<span style={{ fontSize: '1rem' }}>Please create khalti merchant account and save the correct secret and public keys.</span>} placement="top-start">
                        <i className="fa-solid fa-circle-info" style={{ marginLeft: '1rem' }}></i>
                    </Tooltip>
                </h1>
                <div>
                    <span>Khalti Merchant Public Key</span>
                    <label>
                        <input type="text" value={khaltiPublicKey} onChange={(e) => setKhaltiPublicKey(e.target.value)} />
                    </label>
                </div>
                <div>
                    <span>Khalti Merchant Secret Key</span>
                    <label>
                        <input type="text" value={khaltiSecretKey} onChange={(e) => setKhaltiSecretKey(e.target.value)} />
                    </label>
                </div>

                {/* account */}
                <h1>Account</h1>
                <div>
                    <span>Delete Account</span>
                    <label>
                        <input type="button" value="Delete Account" onClick={handleDeleteAccount} />
                    </label>
                </div>
            </div>
        </div>
    )
}

export default UserDetail;