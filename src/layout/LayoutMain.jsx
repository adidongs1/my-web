import Navbar from "../components/sections/Navbar"
import Footer from "../components/sections/Footer"

function LayoutMain({ children }) {
    return (
        <>
            <div className="min-h-screen">
                <Navbar />

                <main className="mt-28">
                    {children}
                </main>


                <Footer />
            </div>
        </>
    )
}

export default LayoutMain