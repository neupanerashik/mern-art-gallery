import axios from 'axios';
import { Dialog } from '@mui/material'
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

// import css
import './hireDialog.css'

export default function HireDialog() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const {userData} = useSelector(state => state.profile);


    const handleClickOpen = () => {setOpen(true)};
    const handleClose = () => {setOpen(false)};


    const handleHireSubmit = async (e) => {
        e.preventDefault();
        if(!date || !time) {return toast.warn("Please choose date and time!")}
        if(!name || !email || !message) {return toast.warn("Fill all the required fields!")}
        const subject = `Hiring ${userData?.role} for an event at ${date}, ${time}` ;

        try {   
            const { data, status } = await axios.post('/api/v1/hire/email', {name, email, receiver: userData?.email, subject, message}, {headers: {'Content-Type': 'application/json'}});
            if (status >= 300) {throw new Error(data);};
            if (data.success) {
                toast.success(data.message);
                setName('');
                setEmail('');
                setMessage('');
                setDate('');
                setTime('');
            } else {
                toast.error(data.message);
            } 
        } catch (err) {
            return toast.error(err.response.data.message);
        }

        handleClose();
    }

    return (
        <>
            <button onClick={handleClickOpen}>Hire</button>

            <Dialog open={open} onClose={handleClose} className='hireDialog'>
                <form>
                    <h2>Fill in the form</h2>
                    
                    <div>
                        <label>Receiver</label>
                        <input type='text' value={userData?.email} disabled />
                    </div>

                    <div>
                        <label>Sender Name</label>
                        <input value={name} onChange={e=>setName(e.target.value)} type='text' label="Sender Name" />
                    </div>

                    <div>
                        <label>Sender Email</label>
                        <input value={email} onChange={e=>setEmail(e.target.value)} type='email' label="Sender Email" />
                    </div>
                    
                    <div>
                        <label>Message</label>
                        <textarea value={message} onChange={e=>setMessage(e.target.value)} type='text' label="Explain your proposal here" rows='5' />
                    </div>

                    <div className='dateTime'>
                        <div>
                            <label>Choose Date:</label>
                            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                        </div>
                        <div>
                            <label>Choose Time:</label>
                            <input type="time" value={time} onChange={e => setTime(e.target.value)} />
                        </div>
                    </div>

                    <button onClick={handleHireSubmit}>Send</button>
                </form>   
            </Dialog>
        </>
    );
}