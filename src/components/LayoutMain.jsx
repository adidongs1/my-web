import Navbar from "./Navbar"
import Footer from "./Footer"

function LayoutMain({ children }) {
    return (
        <>
            <div className="min-h-screen">
                <Navbar />

                {children}


                <Footer />
            </div>
        </>
    )
}

export default LayoutMain