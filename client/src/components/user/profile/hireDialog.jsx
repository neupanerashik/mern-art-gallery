import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/system';
import { InputLabel } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useSelector } from 'react-redux';

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


    const handleHireSubmit = async () => {
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

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{fontSize: '2rem', textAlign: 'center'}}>Fill in the form</DialogTitle>

                <DialogContent>
                    <TextField value={userData?.email} type='text' label="Receiver" variant='outlined' fullWidth margin='dense' />
                    <TextField value={name} onChange={e=>setName(e.target.value)} type='text' label="Sender Name" variant='outlined' fullWidth margin='dense' />
                    <TextField value={email} onChange={e=>setEmail(e.target.value)} type='email' label="Sender Email" variant='outlined' fullWidth margin='dense' />
                    <TextField value={message} onChange={e=>setMessage(e.target.value)} type='text' label="Explain your proposal here" rows={5} multiline variant='outlined' fullWidth margin='dense' />
                    
                    <Box display="flex" justifyContent="space-between" mt={2}>
                        <Box>
                            <InputLabel sx={{fontSize: '1.5rem', marginBottom: '0.5rem'}}>Choose Date:</InputLabel>
                            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                        </Box>
                        <Box>
                            <InputLabel sx={{fontSize: '1.5rem', marginBottom: '0.5rem'}}>Choose Time:</InputLabel>
                            <input type="time" value={time} onChange={e => setTime(e.target.value)} />
                        </Box>
                    </Box>
                    

                </DialogContent>

                <DialogActions>
                    {/* <Button onClick={handleClose} variant='outlined' sx={{fontSize: '1.25rem'}}>Cancel</Button> */}
                    <Button onClick={handleHireSubmit} variant='contained' sx={{
                        height: '4rem',
                        width: '9rem', 
                        fontSize: '1.25rem', 
                        bgcolor: "#24252a", 
                        borderRadius: '5rem'
                    }}>Send</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}