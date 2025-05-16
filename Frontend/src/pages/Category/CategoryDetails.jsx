import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { RouteAddCategory, RouteEditCategory } from '@/helpers/RouteName'
import React, { useState } from 'react'
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
import { useFetch } from '@/hooks/useFetch'
import { getEvn } from '@/helpers/getEnv'
import Loading from '@/components/Loading'
import { FiEdit } from "react-icons/fi"
import { FaRegTrashAlt } from "react-icons/fa"
import { deleteData } from '@/helpers/handleDelete'
import { showToast } from '@/helpers/showToast'

const CategoryDetails = () => {
    const [refreshData, setRefreshData] = useState(false)
    const { data: categoryData, loading } = useFetch(`${getEvn('VITE_API_BASE_URL')}/category/all-category`, {
        method: 'get',
        credentials: 'include'
    }, [refreshData])

    const handleDelete = (id) => {
        const response = deleteData(`${getEvn('VITE_API_BASE_URL')}/category/delete/${id}`)
        if (response) {
            setRefreshData(!refreshData)
            showToast('success', 'Data deleted.')
        } else {
            showToast('error', 'Data not deleted.')
        }
    }

    if (loading) return <Loading />

    return (
        <div className="min-h-screen bg-black text-white px-4 py-6">
            <Card className="bg-[#111] border border-green-700 shadow-md">
                <CardHeader className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-green-500">Category List</h2>
                    <Button asChild className="bg-green-600 hover:bg-green-500 text-black">
                        <Link to={RouteAddCategory}>
                            Add Category
                        </Link>
                    </Button>
                </CardHeader>

                <CardContent>
                    <Table className="text-white">
                        <TableHeader>
                            <TableRow className="border-green-600">
                                <TableHead className="text-green-400">Category</TableHead>
                                <TableHead className="text-green-400">Slug</TableHead>
                                <TableHead className="text-green-400">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categoryData && categoryData.category.length > 0 ? (
                                categoryData.category.map(category => (
                                    <TableRow key={category._id} className="border-green-700">
                                        <TableCell>{category.name}</TableCell>
                                        <TableCell>{category.slug}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-3">
                                                <Button
                                                    variant="outline"
                                                    className="border-green-500 text-green-400 hover:bg-green-500 hover:text-black"
                                                    asChild
                                                >
                                                    <Link to={RouteEditCategory(category._id)}>
                                                        <FiEdit />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    onClick={() => handleDelete(category._id)}
                                                    variant="outline"
                                                    className="border-red-500 text-red-400 hover:bg-red-500 hover:text-black"
                                                >
                                                    <FaRegTrashAlt />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center text-gray-400">
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

export default CategoryDetails
