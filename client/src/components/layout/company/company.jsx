// import css and components
import './company.css'
import {Accordion} from '@mui/material';
import {AccordionSummary} from '@mui/material';
import {AccordionDetails} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Company = () => {

    return (
        <div className='companyContainer'>
            <div className="termsOfUse">
                <h2>Terms of Use</h2>
                <ol className='terms'>
                    <li>
                        <p>Intellectual Property</p>
                        <p>All content and materials on the Platform, including but not limited to images, text, graphics, logos, and software, are owned by or licensed to us and are protected by intellectual property laws. You may not copy, reproduce, modify, distribute, or display any of the content or materials on the Platform without our prior written consent.</p>
                    </li>
                    <li>
                        <p>User Accounts</p>
                        <p>To use certain features of the Platform, you may be required to create a user account. You agree to provide accurate and complete information when creating your account and to keep your login credentials confidential. You are responsible for all activity that occurs under your account.</p>
                    </li>
                    <li>
                        <p>Listing Artworks</p>
                        <p>If you choose to list artwork for sale or auction on the Platform, you agree to provide accurate and complete information about the artwork, including its provenance, condition, and any applicable fees or taxes. You also agree to comply with all applicable laws and regulations regarding the sale and shipment of artwork.</p>
                    </li>
                    <li>
                        <p>Purchasing Artworks</p>
                        <p>If you choose to purchase artwork on the Platform, you agree to pay the listed price or the winning bid amount, as applicable. You also agree to provide accurate and complete information regarding your payment method and shipping address. We reserve the right to cancel any order or auction at any time and for any reason.</p>
                    </li>
                    <li>
                        <p>Termination</p>
                        <p>We reserve the right to terminate your use of the Platform at any time and for any reason. Upon termination, you agree to cease all use of the Platform and to destroy any content or materials obtained from the Platform.</p>
                    </li>
                </ol>
            </div>

            <div className="privacyPolicy">
                <h2>Privacy Policy</h2>
                <ol>
                    <li>
                        <p>Collectionof personal information</p>
                        <p>We may collect the contact inormation, payment information, shipping information, artwork information, user genderated information like coment, review and user data like IP address, browser type etc from you when you use the the platform</p>
                    </li>

                    <li>
                        <p>Use of Personal Information</p>
                        <p>We use your personal information to process your transactions and payments, to personalize your experience , to improve the platform and its features, to comply with the legal obligations.</p>
                    </li>

                    <li>
                        <p>Security of Personal Information</p>
                        <p>We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, we cannot guarantee that your personal information will be completely secure.</p>
                    </li>

                    <li>
                        <p>Your Rights</p>
                        <p>You have the right to access, modify, or delete your personal information that we have collected. You may also have the right to object to or restrict certain uses of your personal information. To exercise these rights, please contact us at [Your Contact Email].</p>
                    </li>

                    <li>
                        <p>Changes to this Privacy Policy</p>
                        <p>We may modify this privacy policy at any time and without prior notice. Your continued use of the Platform after any such modifications shall constitute your acceptance of the modified privacy policy.</p>
                    </li>
                </ol>
            </div>

            <div className="copyrightPolicy">
                <h2>Copyright Policy</h2>
                <p>All content provided on our website, including but not limited to text, graphics, images, logos, button icons, data compilations, software, and the compilation thereof, is the property of our company or its content suppliers and protected by international copyright laws. The content on our website may be used for personal, non-commercial use only. Any other use, including but not limited to reproduction, modification, distribution, transmission, republication, display, or performance, of the content on this site is strictly prohibited without our express written consent.</p>
            </div>

            <div className='faq'>
                <h2>Frequently Asked Qusetions</h2>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <p>How much does it cost to use your platform?</p>
                    </AccordionSummary>

                    <AccordionDetails>
                        <p> It's free to create an account and browse our collection of artwork. However, we do charge a small commission on each sale or auction, which helps us maintain and improve our platform.</p>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <p>How do I list my artwork for sale on your platform?</p>
                    </AccordionSummary>

                    <AccordionDetails>
                        <p>To list your artwork for sale, simply create an account and navigate to the "Sell Artwork" section of your profile. From there, you can upload photos and descriptions of your artwork, set a price, and select whether you want to sell it outright or offer it up for auction.</p>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <p>How do I purchase artwork on your platform?</p>
                    </AccordionSummary>

                    <AccordionDetails>
                        <p>To purchase artwork, simply browse our collection of available pieces and select the one you want to buy. From there, you can add it to your cart and proceed to checkout. We currently support payment method using credit cards.</p>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <p>What happens if my artwork doesn't sell?</p>
                    </AccordionSummary>

                    <AccordionDetails>
                        <p>If your artwork doesn't sell after a certain amount of time, you have the option to relist it or reduce the price. You can also choose to take it down from our platform at any time.</p>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <p>How do I contact customer service representative if I have questions?</p>
                    </AccordionSummary>

                    <AccordionDetails>
                        <p>You can directly call us I the provided telephone number or you can also send a message directly to the us through our platform. Additionally you can also navigate to contact page and write us email.</p>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    )
}

export default Company