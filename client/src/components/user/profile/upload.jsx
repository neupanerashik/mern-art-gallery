import { useState } from 'react';
import './upload.css'

const Upload = () => {
    const [images, setImages] = useState([]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {setImages(old => [...old, reader.result])}
            };

            reader.readAsDataURL(file);
        });
    };

    return(
        <>
            <div className="uploadContainer">
                <form>
                    <div className='row1'>
                        <div>
                            <span>Name</span>
                            <input type="text" placeholder='required*' autoComplete='off' required />
                        </div>

                        <div>
                            <span>Price</span>
                            <input type="number" placeholder='required*' autoComplete='off' required />
                        </div>

                        <div>
                            <span>Discount</span>
                            <input type="number" placeholder='optional' />
                        </div>
                        <div>
                            <span>Category</span>
                            <select required>
                                <option value='painting'>Painting</option>
                                <option value='photography'>Photography</option>
                                <option value='drawing'>Drawing</option>
                                <option value='sculpture'>Sculpture</option>
                            </select>   

                        </div>
                    </div>

                    <div className="row2">
                        <div>
                            <textarea placeholder="Please add the detailed description of your art here..." required></textarea>
                        </div>
                    </div>

                    <div className="row3">
                        <input id='artImage' type='file' accept='images/*' onChange={handleImageChange} multiple required />
                        
                        <label htmlFor='artImage'>
                            <i className="fa-solid fa-arrow-up-from-bracket"></i>
                            <p>Upload images of your art.</p>
                        </label>
                        
                        {images[0] && 
                            <div className="imagePreview" style={{display: images[0] ? "flex" : "none"}}>
                                {images.map((img, index) => {return <img key={index} src={img} alt="artImage" />})}
                            </div>
                        }
                    </div>

                    <div className="row4">
                        <input type="checkbox" /><span>Upload in auction?</span>
                        <button type='submit'>Submit</button>
                    </div>

                        
                </form>
            </div>
        </>
    )
}

export default Upload;