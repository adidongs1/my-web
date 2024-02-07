import Justlogo from '/favicon.svg'
import EmailLogo from '../assets/icons/email.svg'
import AddressLogo from '../assets/icons/address.svg'
import GithubLogo from '../assets/icons/skill-icons_github-dark.svg'
import InstagramLogo from '../assets/icons/skill-icons_instagram.svg'
import LinkedinLogo from '../assets/icons/skill-icons_linkedin.svg'

function Footer() {
    return (
        <footer className="footer p-10 bg-white text-black shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1)] justify-between">
            <aside className='flex flex-col gap-4'>
                <div className='flex items-center'>
                    <img src={Justlogo} alt="adidongs" className='max-h-16' />
                    <h2 className='text-prim-jade-500 text-2xl font-bold gap-0'>Get Connect</h2>
                </div>
                <p className='text-base text-slate-400'>For business questions and collaboration with me, please contact below</p>

                <div className="flex flex-col gap-2">
                    <a href="mailto: adidongs15@gmail.com" className='flex gap-4 text-base text-slate-400 font-semibold items-center'>
                        <img src={EmailLogo} alt="Email" />
                        adidongs15@gmail.com
                    </a>
                    <a href="https://goo.gl/maps/4yY2Yw5L7Y8fWgVb6" className='flex gap-4 text-base text-slate-400 font-semibold items-center'>
                        <img src={AddressLogo} alt="Address" />
                        Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta
                    </a>

                </div>
            </aside>
            <nav className='flex flex-col gap-4 xl:items-end'>

                <h2 className='text-prim-jade-500 text-2xl font-bold gap-0'>Find Me</h2>
                <div className="grid grid-flow-col gap-4">
                    <a href="https://github.com/adidongs1">
                        <img src={GithubLogo} alt="Github" />
                    </a>
                    <a href="https://www.instagram.com/adiiarifin/">
                        <img src={InstagramLogo} alt="Instagram" />
                    </a>
                    <a href="https://www.linkedin.com/in/adidongs15/">
                        <img src={LinkedinLogo} alt="Linkedin" />
                    </a>
                </div>
            </nav>
        </footer>
    )
}

export default Footer