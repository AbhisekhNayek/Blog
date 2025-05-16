import { getEvn } from '@/helpers/getEnv'
import { useFetch } from '@/hooks/useFetch'

import React from 'react'
import { Avatar } from './ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import usericon from '@/assets/images/user.png'
import moment from 'moment'
import { useSelector } from 'react-redux'

const CommentList = ({ props }) => {
  const user = useSelector(state => state.user)
  const { data, loading, error } = useFetch(
    `${getEvn('VITE_API_BASE_URL')}/comment/get/${props.blogid}`,
    {
      method: 'get',
      credentials: 'include',
    }
  )

  if (loading) return <div className="text-green-500">Loading...</div>
  if (error) return <div className="text-red-500">Failed to load comments</div>

  return (
    <div>
      <h4 className="text-2xl font-bold text-green-500 mb-4">
        {props.newComment
          ? <span className="mr-2">{data?.comments.length + 1}</span>
          : <span className="mr-2">{data?.comments.length}</span>
        }
        Comments
      </h4>

      <div className="space-y-4">
        {props.newComment && (
          <div className="flex gap-3 mb-3 bg-gray-900 p-3 rounded-md text-green-400">
            <Avatar>
              <AvatarImage src={user?.user?.avatar || usericon} />
            </Avatar>
            <div>
              <p className="font-bold text-green-300">{user?.user.name}</p>
              <p className="text-sm text-green-500">{moment(props.newComment?.createdAt).format('DD-MM-YYYY')}</p>
              <div className="pt-2">{props.newComment?.comment}</div>
            </div>
          </div>
        )}

        {data && data.comments.length > 0 && data.comments.map(comment => (
          <div
            key={comment._id}
            className="flex gap-3 mb-3 bg-gray-900 p-3 rounded-md text-green-400"
          >
            <Avatar>
              <AvatarImage src={comment?.user.avatar || usericon} />
            </Avatar>
            <div>
              <p className="font-bold text-green-300">{comment?.user.name}</p>
              <p className="text-sm text-green-500">{moment(comment?.createdAt).format('DD-MM-YYYY')}</p>
              <div className="pt-2">{comment?.comment}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommentList
