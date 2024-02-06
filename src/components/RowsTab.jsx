
import IconEdit from '../assets/icons/tabler_edit.svg'

function RowsTab({ date, title, content, category, isChecked, onCheck }) {
    return (
        <>
            < tbody >
                <tr>
                    {/* checkbox */}
                    <th>
                        <label>
                            <input type="checkbox" className='checkbox' checked={isChecked} onChange={onCheck} />
                        </label>
                        {isChecked ? 'checked' : 'unchecked'}
                    </th>
                    {/* modify */}
                    <td>
                        <button className='btn btn-ghost'>
                            <img src={IconEdit} alt="Edit" />
                        </button>
                    </td>

                    {/* dibawah ini pake data */}
                    {/* date */}
                    <td>
                        <span className='text-black font-semibold text-base'>{date} </span>
                    </td>
                    {/* title */}
                    <td className='w-40'>
                        <span className='text-black font-semibold text-base'>
                            {title}
                        </span>
                    </td>
                    {/* category */}
                    <td className='w-40'>
                        <span className='text-black font-semibold text-base'>
                            {category}
                        </span>
                    </td>
                    {/* content */}
                    <td className='w-48'>
                        <div className="overflow-x-auto relative">
                            <div className='flex flex-col scroll-my-1 h-40'>
                                <p>
                                    {content}
                                </p>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody >
        </>
    )
}

export default RowsTab