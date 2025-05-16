import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import React, { useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useFetch } from '@/hooks/useFetch'
import { getEvn } from '@/helpers/getEnv'
import Loading from '@/components/Loading'
import { FaRegTrashAlt } from "react-icons/fa"
import { deleteData } from '@/helpers/handleDelete'
import { showToast } from '@/helpers/showToast'

const Comments = () => {
    const [refreshData, setRefreshData] = useState(false)
    const { data, loading, error } = useFetch(`${getEvn('VITE_API_BASE_URL')}/comment/get-all-comment`, {
        method: 'get',
        credentials: 'include'
    }, [refreshData])

    const handleDelete = async (id) => {
        const response = await deleteData(`${getEvn('VITE_API_BASE_URL')}/comment/delete/${id}`)
        if (response) {
            setRefreshData(!refreshData)
            showToast('success', 'Data deleted.')
        } else {
            showToast('error', 'Data not deleted.')
        }
    }

    if (loading) return <Loading />

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <Card className="bg-[#111] border border-green-600 shadow-lg max-w-full mx-auto">
                <CardContent className="p-4">
                    <Table className="border border-green-600">
                        <TableHeader>
                            <TableRow className="bg-green-900">
                                <TableHead className="text-green-400">Blog</TableHead>
                                <TableHead className="text-green-400">Commented By</TableHead>
                                <TableHead className="text-green-400">Comment</TableHead>
                                <TableHead className="text-green-400">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data && data.comments.length > 0 ?
                                data.comments.map(comment =>
                                    <TableRow key={comment._id} className="even:bg-[#222] odd:bg-[#111]">
                                        <TableCell>{comment?.blogid?.title}</TableCell>
                                        <TableCell>{comment?.user?.name}</TableCell>
                                        <TableCell>{comment?.comment}</TableCell>
                                        <TableCell className="flex gap-3">
                                            <Button
                                                onClick={() => handleDelete(comment._id)}
                                                variant="outline"
                                                className="border-green-600 text-green-400 hover:bg-green-600 hover:text-black transition"
                                            >
                                                <FaRegTrashAlt />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                                :
                                <TableRow>
                                    <TableCell colSpan="4" className="text-center text-green-400">
                                        Data not found.
                                    </TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

export default Comments
