import BlogCard from '@/components/BlogCard'
import { getEvn } from '@/helpers/getEnv'
import { useFetch } from '@/hooks/useFetch'
import React from 'react'
import { useSearchParams } from 'react-router-dom'
import Loading from '@/components/Loading'

const SearchResult = () => {
  const [searchParams] = useSearchParams()
  const q = searchParams.get('q') || ''

  const { data: blogData, loading, error } = useFetch(
    `${getEvn('VITE_API_BASE_URL')}/blog/search?q=${encodeURIComponent(q)}`,
    {
      method: 'get',
      credentials: 'include',
    }
  )

  if (loading) return <Loading />
  if (error) return <div className="text-red-500">Error: {error.message || 'Something went wrong'}</div>

  return (
    <>
      <div className="flex items-center gap-3 text-2xl font-bold text-violet-500 border-b pb-3 mb-5">
        <h4>Search Result For: {q}</h4>
      </div>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {blogData && blogData.blog.length > 0 ? (
          blogData.blog.map((blog) => <BlogCard key={blog._id} props={blog} />)
        ) : (
          <div>No Data Found.</div>
        )}
      </div>
    </>
  )
}

export default SearchResult
