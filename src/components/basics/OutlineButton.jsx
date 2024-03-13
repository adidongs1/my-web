function OutlineButton({ IconBtn, textBtn }) {
    return (
        <>
            <button className='border-2 border-prim-jade-500 py-2 px-4 bg-transparent rounded-lg text-prim-jade-500 font-semibold hover:bg-prim-jade-500 hover:border-2 hover:border-transparent hover:text-white'>
                <img src={IconBtn} alt={IconBtn} />
                {textBtn}
            </button>
        </>
    )
}

export default OutlineButton