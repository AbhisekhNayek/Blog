import BlogCard from '@/components/BlogCard'
import Loading from '@/components/Loading'
import { getEvn } from '@/helpers/getEnv'
import { useFetch } from '@/hooks/useFetch'
import React from 'react'

const Index = () => {
    const { data: blogData, loading, error } = useFetch(`${getEvn('VITE_API_BASE_URL')}/blog/blogs`, {
        method: 'get',
        credentials: 'include'
    })

    if (loading) return <Loading />

    return (
        <div className="min-h-screen bg-black p-6">
            {blogData && blogData.blog.length > 0 ? (
                <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
                    {blogData.blog.map(blog => (
                        <BlogCard key={blog._id} props={blog} />
                    ))}
                </div>
            ) : (
                <div className="text-green-400 text-center mt-20 text-xl">
                    Data Not Found.
                </div>
            )}
        </div>
    )
}

export default Index
