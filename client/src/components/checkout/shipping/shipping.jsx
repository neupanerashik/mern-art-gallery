import { useState } from 'react'
import { toast } from 'react-toastify';
import Divider from '@mui/material/Divider';

// import css
import './shipping.css'

const Shipping = ({activeStep, handleStepChange, orderData}) => {
    const [shippingDetail, setShippingDetail] = useState({name: '', phone: '', email: '', province: '', city: '', address: ''});

    const handleChange = (e) => setShippingDetail({...shippingDetail, [e.target.name]: e.target.value});

    const handleShippingSubmit = (e) => {
        e.preventDefault();

		const {name, email, address, phone, city, province} = shippingDetail;
        
        if(name === '' || email === '' || address === '' || phone === '' || city === '' || province === ''){
            toast.warn('Please fill in all the necessary fields of shipping detail.');
            return;
        }

		if(phone.length !== 10){
			toast.warn('Phone number should be of 10 digits.')
			return;
		}

        localStorage.setItem("shippingDetail", JSON.stringify(shippingDetail));
		localStorage.setItem("orderDetail", JSON.stringify(orderData));
        handleStepChange(activeStep + 1);
    }

    return (
        <div className="shippingContainer">
            <h2>Shipping Details</h2>
            
            <form>
                <div>
                    <label>Your Name</label> <br />
                    <input type="text" placeholder="e.g. John Doe" name='name' autoComplete='off' value={shippingDetail.name} onChange={handleChange} />
                </div>

                <div>
                    <label>Phone Number</label> <br />
                    <input type="tel" maxLength="10" placeholder="e.g. 9812345678" name='phone' autoComplete='off' value={shippingDetail.phone} onChange={handleChange} />
                </div>

                <div>
                    <label>Your Email</label> <br />
                    <input type="text" placeholder="e.g. example@gmail.com" name='email' autoComplete='off' value={shippingDetail.email} onChange={handleChange} />
                </div>

                <div>
                    <label>Select Province</label>
                    <select name='province' value={shippingDetail.province} onChange={handleChange} autoComplete='off' required>
                        <option value='' disabled>Province</option>
                        <option value='Province 1'>Province 1</option>
                        <option value='Province 2'>Province 2</option>
                        <option value='Province 3'>Province 3</option>
                        <option value='Province 4'>Province 4</option>
                        <option value='Province 5'>Province 5</option>
                        <option value='Province 6'>Province 6</option>
                        <option value='Province 7'>Province 7</option>
                    </select>
                </div>

                <div>
                    <label>City</label> <br />
                    <input type="text" placeholder="e.g. Pokhara" name='city' autoComplete='off' value={shippingDetail.city} onChange={handleChange} />
                </div>

                <div>
                    <label>Address</label> <br />
                    <input type="text" placeholder="e.g. 8th Street, Baidam 6, Pokhara" name='address' autoComplete='off' value={shippingDetail.address} onChange={handleChange} />
                </div>

            </form>

            <Divider className='divider'>
                <button onClick={() => handleStepChange(activeStep === 0 ? 0 : activeStep - 1 )}>Back</button>
                <button type='submit' onClick={handleShippingSubmit}>Next</button>
            </Divider>
        </div>
    )
}

export default Shipping
