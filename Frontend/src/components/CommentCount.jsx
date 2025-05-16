import { getEvn } from '@/helpers/getEnv'
import { useFetch } from '@/hooks/useFetch'
import React from 'react'
import { FaRegComment } from "react-icons/fa";

const CommentCount = ({ props }) => {
    const { data, loading, error } = useFetch(`${getEvn('VITE_API_BASE_URL')}/comment/get-count/${props.blogid}`, {
        method: 'get',
        credentials: 'include',
    })

    return (
        <button
            type='button'
            className='flex justify-between items-center gap-1 bg-black text-green-500 px-2 py-1 rounded hover:bg-gray-800 hover:text-green-400 transition-colors'
            disabled={loading}
            title="Comment Count"
        >
            <FaRegComment />
            {loading ? '...' : data ? data.commentCount : '0'}
        </button>
    )
}

export default CommentCount
