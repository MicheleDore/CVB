import '../App.css'
import { useState} from 'react';
import React from 'react'
const ContactUs = ()=>{
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    return (
        <React.Fragment>
            <section >
                <form>
                    <label>Mail:
                        <input name='email' value={email} onChange={(e) => setEmail(e.target.value)} type='mail' required/>
                    </label>
                    <label>Message:
                        <textarea name='message' maxLength='500' value={message} onChange={(e) => setMessage(e.target.value)} required/>
                    </label>
                    <input type='submit' value='Envoier'/>
                </form>
            </section>
        </React.Fragment>
    )
}

export default ContactUs