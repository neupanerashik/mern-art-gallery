import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateOrder } from '../../../redux/adminSlice';
import Dialog from '@mui/material/Dialog';

// import css
import './updateOrder.css'

export default function UpdateOrder({currentOrder}) {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [orderStatus, setOrderStatus] = useState('');
    const {isLoading} = useSelector(state => state.admin);

    // dialog controllers
    const handleClickOpen = () => {setOpen(true)};
    const handleClose = () => {setOpen(false)};

    const updateOrderHandler = (e) => {
        e.preventDefault();
        dispatch(updateOrder({orderId: currentOrder?._id, orderStatus}))
        handleClose();   
    };

    return (
        <>
            <i className="fa-solid fa-pen" onClick={handleClickOpen}></i>
            
            <Dialog open={open} onClose={handleClose} className="updateOrderContainer">
                <form onSubmit={updateOrderHandler}>
                    <header>
                        <h2>Update Order</h2>
                        <i className="fa-solid fa-xmark" onClick={handleClose}></i>
                    </header>

                    <select value={orderStatus} onChange={e => setOrderStatus(e.target.value)}>
                        <option disabled value=''>Order Status</option>
                        <option disabled={currentOrder.orderStatus !== 'processing'} value='shipped'>Shipped</option>
                        <option disabled={currentOrder.orderStatus !== 'shipped'} value='delivered'>Delivered</option>
                    </select>
                    <button type='submit' disabled={isLoading ? true : false || orderStatus === ''}>Update</button>      
                </form>
            </Dialog>
        </>
    );
}
