import { toast } from 'react-toastify'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import css and components
import './upload.css'
import Bubbles from '../../../utility/bubbles/bubbles'

// import actions
import { clearError, clearMessage, uploadArt } from '../../../../redux/artSlice';

const Upload = () => {
    const {error, message, isLoading} = useSelector(state => state.art);

    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [isAuctionItem, setIsAuctionItem] = useState(false);
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [estimatedValueFrom, setEstimatedValueFrom] = useState('');
    const [estimatedValueTo, setEstimatedValueTo] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');


    const handleImageChange = (e) => {
        e.preventDefault();
        setImages(old => [...old, ...e.target.files]);
        setImagePreviews(prev => [...prev, ...Array.from(e.target.files).map(img => URL.createObjectURL(img))]);
    };

    const handleClear = () => {
        setName('')
        setPrice('')
        setDiscount('')
        setCategory('')
        setDescription('')
        setIsAuctionItem(false)
        setImages([]);
        setImagePreviews([]);
        setEstimatedValueFrom('')
        setEstimatedValueTo('')
        setSelectedDate('')
        setSelectedTime('')
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if(images.length < 1) {return toast.warn("You must include image of you artwork as well.")};
        const myForm = new FormData();
        myForm.append('name', name);
        myForm.append('price', price);
        myForm.append('discount', discount);
        myForm.append('category', category);
        myForm.append('description', description);
        myForm.append('isAuctionItem', isAuctionItem);
    
        for (const image of images) {
            myForm.append('artImages', image);
        }
    
        if (isAuctionItem) {
          myForm.append('estimatedValueFrom', estimatedValueFrom);
          myForm.append('estimatedValueTo', estimatedValueTo);
          myForm.append('endDate', selectedDate + ' ' + selectedTime);
        }
    
        dispatch(uploadArt(myForm));
    };
    

    useEffect(() => {
        if(message){
          toast.success(message);
          dispatch(clearMessage());
          handleClear();
        }
    
        if(error){
          toast.error(error);
          dispatch(clearError());
        }
      }, [dispatch, message, error])

    return(
        <>
            <div className="uploadContainer">
                <form>
                    <div className='row1'>
                        <div>
                            <span>Name</span>
                            <input type="text" placeholder='required*' value={name} autoComplete='off' onChange={(e) => setName(e.target.value)} required/>
                        </div>

                        <div>
                            <span>Price</span>
                            <input type="number" placeholder='required*' value={price} min='0' autoComplete='off' onChange={(e) => setPrice(e.target.value)} required />
                        </div>

                        <div>
                            <span>Discount</span>
                            <input type="number" placeholder='optional' value={discount} min='0' onChange={(e) => setDiscount(e.target.value)} />
                        </div>

                        <div>
                            <span>Choose Category</span>
                            <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                                <option value='' disabled>Category</option>
                                <option value='painting'>Painting</option>
                                <option value='photography'>Photography</option>
                                <option value='drawing'>Drawing</option>
                                <option value='sculpture'>Sculpture</option>
                            </select>   
                        </div>
                    </div>

                    <div className="row2">
                        <div>
                            <textarea value={description} 
                            placeholder="Please add the detailed description of your art here..." 
                            onChange={(e) => setDescription(e.target.value)} 
                            required
                            ></textarea>
                        </div>
                    </div>

                    <div className="row3">
                        <input id='artImages' type='file' accept='images/*' onChange={handleImageChange} multiple required />
                        
                        <label htmlFor='artImages'>
                            <i className="fa-solid fa-arrow-up-from-bracket"></i>
                            <p>Upload images of your art.</p>
                        </label>
                        
                        {imagePreviews[0] && 
                            <div className="imagePreview" style={{display: imagePreviews[0] ? "flex" : "none"}}>
                                {imagePreviews.map((img, index) => {return <img key={index} src={img} alt="artImage" />})}
                            </div>
                        }
                    </div>

                    <div className={isAuctionItem ? "auctionFields active" : "auctionFields"}>
                        <div>
                            <span>Estimated Value (From)</span>
                            <input type="number" placeholder="required" min="0" onChange={e => setEstimatedValueFrom(e.target.value)} />
                        </div>

                        <div>
                            <span>Estimated Value (To)</span>
                            <input type="number" placeholder="required" min="0"  onChange={e => setEstimatedValueTo(e.target.value)} />
                        </div>

                        <div>
                            <span>End Date</span>
                            <input type="date" onChange={(e) => setSelectedDate(e.target.value)} required />
                        </div>

                        <div>
                            <span>End Time</span>
                            <input type="time" onChange={(e) => setSelectedTime(e.target.value)} required />
                        </div>
                    </div>

                    <div className="buttons">
                        <input type="checkbox" checked={isAuctionItem} onChange={(e) => setIsAuctionItem(!isAuctionItem)} /><span>Upload as auction artwork?</span>
                        <button type='button' onClick={handleClear}>Clear</button>
                        <button type='submit' onClick={handleSubmit} disabled={isLoading}>{isLoading ? <Bubbles /> : "Submit"}</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Upload;