import { useState, useEffect } from "react";


function DashboardMedia() {
    const [mediaItems, setMediaItems] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/media?author=2`)
            .then(res => res.json())
            .then(data => {
                setMediaItems(data)
            })
    }, []);


    return (
        <>
            <div>
                <h1>Media Dashboard</h1>
                {mediaItems.map(item => (
                    <div key={item.id}>
                        <h2>{item.title.rendered}</h2>
                        <img src={item.guid.rendered} alt={item.title.rendered} />
                    </div>
                ))}
            </div>
        </>
    )
}

export default DashboardMedia