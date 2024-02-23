import chevronLeft from '../assets/icons/chevron-left.svg'
import chevronRight from '../assets/icons/chevron-right.svg'

function Paginations({ page, setPage, totalPages }) {

    const handlePage = (number) => {
        setPage(number)
        window.scrollTo(0, 0)
    }

    const pageNumbers = []
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
    }

    const renderPageNumbers = pageNumbers.reduce((result, number) => {
        if (number === 1 || number === totalPages || (number >= page - 1 && number <= page + 1)) {
            result.push(
                <button key={number} className="join-item btn" disabled={page === number} onClick={() => handlePage(number)}>{number}</button>

            )
        } else if (number === page - 2 || number === page + 2) {
            result.push(
                <button key={number} className="join-item btn" disabled={page === number} onClick={() => handlePage(number)}>...</button>
            )
        }

        return result
    }, [])
    return (
        <div className="join">

            <div className="join">
                <button className="join-item btn" onClick={() => handlePage(page - 1)} disabled={page === 1}>
                    <img src={chevronLeft} />
                </button>
                {renderPageNumbers}
                <button className="join-item btn" onClick={() => handlePage(page + 1)} disabled={page === totalPages}>
                    <img src={chevronRight} />
                </button>
            </div>

        </div>
    )
}

export default Paginations