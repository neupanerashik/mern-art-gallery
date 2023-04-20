import { Dialog } from '@mui/material'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

// import css
import './hireDialog.css'

export default function HireDialog() {
    const {userData} = useSelector(state => state.profile);

    const [open, setOpen] = useState(false);

    const [senderEmail, setSenderEmail] = useState('');
    const [receiverEmail, setReceiverEmail] = useState('');
    const [message, setMessage] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const handleClickOpen = () => {setOpen(true)};
    const handleClose = () => {setOpen(false)};

    const handleHireSubmit = async (e) => {
        e.preventDefault();
        if(!date || !time) {return toast.warn("Please choose date and time!")};
        if(!senderEmail || !message) {return toast.warn("Fill all the required fields!")};
        if(!receiverEmail) {return toast.warn("The artist has not provide the email!")};

        const subject = `About hiring ${userData?.role}`;
        const body = message + `\n\nDate: ${date}\nTime: ${time} `;

        // open gmail in browser
        const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(receiverEmail)}&cc=&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(gmailUrl, '_blank');
        handleClose();
    }

    useEffect(() => {
        if (userData?.email) {
            setReceiverEmail(userData.email);
        }
    }, [userData]);

    return (
        <>
            <button onClick={handleClickOpen}>Hire</button>

            <Dialog open={open} onClose={handleClose} className='hireDialog'>
                <form>
                    <h2>Fill in the form</h2>
                    
                    <div>
                        <label>Receiver</label>
                        <input type='text' value={receiverEmail} disabled />
                    </div>

                    <div>
                        <label>Sender</label>
                        <input value={senderEmail} onChange={e=>setSenderEmail(e.target.value)} type='email' label="Sender Email" />
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