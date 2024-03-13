function FillButton({ IconBtn, textBtn }) {
    return (
        <>
            <button className='flex items-center border-2 border-transparent py-2 px-4 bg-prim-jade-500 rounded-lg text-white font-semibold hover:bg-sec-pomegranate-500 hover:border-sec-pomegranate-500'>
                <img src={IconBtn} alt={IconBtn} />
                {textBtn}
            </button>
        </>
    )
}

export default FillButton
