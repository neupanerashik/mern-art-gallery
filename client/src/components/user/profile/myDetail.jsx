import { useState } from 'react'

// import css
import './myDetail.css'

const MyDetail = () => {
  const [name, setName] = useState("Yogendra Rana");
  const [email, setEmail] = useState("yogendrarana9595@gmail.com");
  const [profilePic, setProfilePic] = useState()

  const handleProfilePicChage = (e) => {
    // console.log(e.target.value)
    console.log(e.target.files)
    const reader = new FileReader();
    reader.onload = () => {if(reader.DONE) {setProfilePic(reader.result)}}
    reader.readAsDataURL(e.target.files[0])
    console.log(e.target.files[0])

  }
 

  return (
    <div className='profileDetailContainer'>
      <header>
        <div>
          <h2>Personal Info</h2>
          <p>Update your photo and personal details here.</p>
        </div>
        <div>
          <button>Cancel</button>
          <button>Save</button>
        </div>
      </header>

      <div className="information">
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
          <span>Profile Picture</span>
          <label>
            {profilePic && <img src={profilePic} alt="profilePic" />}
            <input type="file" name='profilePicture' accept='image/*' onChange={handleProfilePicChage}/>
          </label>
        </div>
        <div>
          <span>Your Role</span>
          <label>
            <input type="text" value="Painter" disabled/>
          </label>
        </div>
        <div>
          <span>Joined At</span>
          <label>
            <input type="text" value="2022, June 12" disabled />
          </label>
        </div>
      </div>
    </div>
  )
}

export default MyDetail;