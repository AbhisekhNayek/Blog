import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { RouteBlogAdd, RouteBlogEdit } from '@/helpers/RouteName'
import { useFetch } from '@/hooks/useFetch'
import { getEvn } from '@/helpers/getEnv'
import { deleteData } from '@/helpers/handleDelete'
import { showToast } from '@/helpers/showToast'
import Loading from '@/components/Loading'
import { useState } from 'react'
import { FiEdit } from "react-icons/fi"
import { FaRegTrashAlt } from "react-icons/fa"
import moment from 'moment'

const BlogDetails = () => {
    const [refreshData, setRefreshData] = useState(false)
    const { data: blogData, loading, error } = useFetch(
        `${getEvn('VITE_API_BASE_URL')}/blog/get-all`,
        {
            method: 'get',
            credentials: 'include',
        },
        [refreshData]
    )

    const handleDelete = (id) => {
        const response = deleteData(`${getEvn('VITE_API_BASE_URL')}/blog/delete/${id}`)
        if (response) {
            setRefreshData(!refreshData)
            showToast('success', 'Data deleted.')
        } else {
            showToast('error', 'Data not deleted.')
        }
    }

    if (loading) return <Loading />

    return (
        <div className="text-white">
            <Card className="bg-zinc-900 border border-zinc-700">
                <CardHeader>
                    <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
                        <Link to={RouteBlogAdd}>Add Blog</Link>
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="border-b border-zinc-700">
                                <TableHead className="text-green-400">Author</TableHead>
                                <TableHead className="text-green-400">Category</TableHead>
                                <TableHead className="text-green-400">Title</TableHead>
                                <TableHead className="text-green-400">Slug</TableHead>
                                <TableHead className="text-green-400">Dated</TableHead>
                                <TableHead className="text-green-400">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {blogData && blogData.blog.length > 0 ? (
                                blogData.blog.map((blog) => (
                                    <TableRow
                                        key={blog._id}
                                        className="border-b border-zinc-700"
                                    >
                                        <TableCell>{blog?.author?.name}</TableCell>
                                        <TableCell>{blog?.category?.name}</TableCell>
                                        <TableCell>{blog?.title}</TableCell>
                                        <TableCell>{blog?.slug}</TableCell>
                                        <TableCell>
                                            {moment(blog?.createdAt).format('DD-MM-YYYY')}
                                        </TableCell>
                                        <TableCell className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                className="border-green-600 text-green-400 hover:bg-green-600 hover:text-white"
                                                asChild
                                            >
                                                <Link to={RouteBlogEdit(blog._id)}>
                                                    <FiEdit />
                                                </Link>
                                            </Button>
                                            <Button
                                                onClick={() => handleDelete(blog._id)}
                                                variant="outline"
                                                className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                                            >
                                                <FaRegTrashAlt />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-gray-400">
                                        Data not found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

export default BlogDetails
