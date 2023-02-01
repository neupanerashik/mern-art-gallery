import {React} from 'react'

//importing css
import './spinner.css'

const Spinner = ({style}) => {
	return (
		<div className="spinner-container" style={style}>
			<div className="spinner"></div>
		</div>
	)
}

export default Spinner