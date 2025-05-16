import Comment from '@/components/Comment'
import CommentCount from '@/components/CommentCount'
import CommentList from '@/components/CommentList'
import LikeCount from '@/components/LikeCount'
import Loading from '@/components/Loading'
import RelatedBlog from '@/components/RelatedBlog'
import { Avatar } from '@/components/ui/avatar'
import { getEvn } from '@/helpers/getEnv'
import { useFetch } from '@/hooks/useFetch'
import { AvatarImage } from '@radix-ui/react-avatar'
import { decode } from 'entities'
import moment from 'moment'
import React from 'react'
import { useParams } from 'react-router-dom'

const SingleBlogDetails = () => {
    const { blog, category } = useParams()

    const { data, loading, error } = useFetch(`${getEvn('VITE_API_BASE_URL')}/blog/get-blog/${blog}`, {
        method: 'get',
        credentials: 'include',
    }, [blog, category])

    if (loading) return <Loading />
    if (error) return <div className="text-red-500">Error loading blog details.</div>

    return (
        <div className='md:flex-nowrap flex-wrap flex justify-between gap-20 bg-black text-green-400 min-h-screen p-5'>
            {data && data.blog &&
                <>
                    <div className='border border-green-600 rounded md:w-[70%] w-full p-5 bg-gray-900 shadow-lg'>
                        <h1 className='text-3xl font-extrabold mb-5 text-green-500'>{data.blog.title}</h1>
                        <div className='flex justify-between items-center'>
                            <div className='flex justify-between items-center gap-5'>
                                <Avatar className="ring-2 ring-green-500">
                                    <AvatarImage src={data.blog.author.avatar} />
                                </Avatar>
                                <div>
                                    <p className='font-bold text-green-300'>{data.blog.author.name}</p>
                                    <p className='text-green-500'>Date: {moment(data.blog.createdAt).format('DD-MM-YYYY')}</p>
                                </div>
                            </div>
                            <div className='flex justify-between items-center gap-5 text-green-400'>
                                <LikeCount props={{ blogid: data.blog._id }} />
                                <CommentCount props={{ blogid: data.blog._id }} />
                            </div>
                        </div>
                        <div className='my-5'>
                            <img src={data.blog.featuredImage} className='rounded shadow-lg border border-green-600' alt="Blog Featured" />
                        </div>
                        <div 
                            className='prose prose-invert max-w-none text-green-300'
                            dangerouslySetInnerHTML={{ __html: decode(data.blog.blogContent) || '' }}
                        />

                        <div className='border-t border-green-600 mt-5 pt-5'>
                            <Comment props={{ blogid: data.blog._id }} />
                        </div>
                    </div>
                </>
            }
            <div className='border border-green-600 rounded md:w-[30%] w-full p-5 bg-gray-900 shadow-lg'>
                <RelatedBlog props={{ category: category, currentBlog: blog }} />
            </div>
        </div>
    )
}

export default SingleBlogDetails
