import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
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
import { FaRegTrashAlt } from "react-icons/fa";
import { deleteData } from '@/helpers/handleDelete'
import { showToast } from '@/helpers/showToast'
import usericon from '@/assets/images/user.png'
import moment from 'moment'

const User = () => {
    const [refreshData, setRefreshData] = useState(false)
    const { data, loading, error } = useFetch(`${getEvn('VITE_API_BASE_URL')}/user/get-all-user`, {
        method: 'get',
        credentials: 'include'
    }, [refreshData])

    const handleDelete = async (id) => {
        const response = await deleteData(`${getEvn('VITE_API_BASE_URL')}/user/delete/${id}`)
        if (response) {
            setRefreshData(!refreshData)
            showToast('success', 'Data deleted.')
        } else {
            showToast('error', 'Data not deleted.')
        }
    }

    if (loading) return <Loading />
    if (error) return <div className="text-red-500">Failed to load users.</div>

    return (
        <div className="min-h-screen bg-black p-6 text-green-400">
            <Card className="bg-gray-900 border border-green-600 shadow-lg">
                <CardContent>
                    <Table className="text-green-300">
                        <TableHeader>
                            <TableRow className="border-b border-green-600">
                                <TableHead className="text-green-500">Role</TableHead>
                                <TableHead className="text-green-500">Name</TableHead>
                                <TableHead className="text-green-500">Email</TableHead>
                                <TableHead className="text-green-500">Avatar</TableHead>
                                <TableHead className="text-green-500">Dated</TableHead>
                                <TableHead className="text-green-500">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data && data.user.length > 0 ? (
                                data.user.map(user =>
                                    <TableRow key={user._id} className="hover:bg-green-900/30 transition-colors">
                                        <TableCell>{user.role}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <img
                                                src={user.avatar || usericon}
                                                alt={user.name}
                                                className='w-10 rounded-full border border-green-600'
                                            />
                                        </TableCell>
                                        <TableCell>{moment(user.createdAt).format('DD-MM-YYYY')}</TableCell>
                                        <TableCell className="flex gap-3">
                                            <Button
                                                onClick={() => handleDelete(user._id)}
                                                variant="outline"
                                                className="hover:bg-green-600 hover:text-black border-green-500 text-green-400"
                                            >
                                                <FaRegTrashAlt />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            ) : (
                                <TableRow>
                                    <TableCell colSpan="6" className="text-center text-green-500 py-4">
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

export default User
