import '../App.css'
import React from 'react'
const Footer = ()=>{
    return (
        <React.Fragment>
            <footer id ="contacts" className=" aroundFlex column footer smallpadding maxWidth bigPadding">
                <h2>Contacts</h2>
                <div className='betweenFlex column maxWidth'>
                    <div className='betweenFlex column horizontalFooter maxWidth'>
                        <a href="mailto:communityvideobox@gmail.com" className='smallpadding '>communityvideobox@gmail.com</a>
                        <p>Retrouve-nous sur les réseaux</p>
                        <a href="https://www.facebook.com/CommunityVideoBox" >
                            <svg xmlns="http://www.w3.org/2000/svg" className="svg smallMargin" viewBox="0 0 16 16"> <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/> </svg>
                        </a>
                        <a href="https://www.instagram.com/communityvideobox/">
                            <svg xmlns="http://www.w3.org/2000/svg" className="svg smallMargin " viewBox="0 0 512 512"><title>ionicons-v5_logos</title><path d="M349.33,69.33a93.62,93.62,0,0,1,93.34,93.34V349.33a93.62,93.62,0,0,1-93.34,93.34H162.67a93.62,93.62,0,0,1-93.34-93.34V162.67a93.62,93.62,0,0,1,93.34-93.34H349.33m0-37.33H162.67C90.8,32,32,90.8,32,162.67V349.33C32,421.2,90.8,480,162.67,480H349.33C421.2,480,480,421.2,480,349.33V162.67C480,90.8,421.2,32,349.33,32Z"/><path d="M377.33,162.67a28,28,0,1,1,28-28A27.94,27.94,0,0,1,377.33,162.67Z"/><path d="M256,181.33A74.67,74.67,0,1,1,181.33,256,74.75,74.75,0,0,1,256,181.33M256,144A112,112,0,1,0,368,256,112,112,0,0,0,256,144Z"/></svg>
                        </a>
                    </div>
                    <div className="aroundFlex column secondaryView">
                        <p className='smallpadding'>Copyright Community VideoBox</p>
                        <p>tous droits réservés</p>
                    </div>
                </div>
            </footer>
        </React.Fragment>
    )
}

export default Footer