import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Button,
} from '@chakra-ui/react'
import axios from 'axios';
import { useNavigate } from 'react-router'

const AdminTable = ({ containers }: any) => {
    const navigate = useNavigate()
    const stopHandler = (id: string) => {
        axios
            .post("http://localhost:3000/api/docker/stop", { id: id })
            .then(function () {
                alert(`Stopped : ${id}`)
                navigate(0)
            });
    }
    const startHandler = (id: string) => {
        axios
            .post("http://localhost:3000/api/docker/start", { id: id })
            .then(function () {
                alert(`Started : ${id} `)
                navigate(0)
            });
    }
    console.log(containers);
    console.log("adfsadf")
    return (
        <>
            <TableContainer>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Name</Th>
                            <Th>State</Th>
                            <Th>Status</Th>
                            <Th>Port</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {containers.map((e: any) =>
                            <Tr>
                                <Td>{e.id.slice(0, 10)}</Td>
                                <Td>{e.name}</Td>
                                <Td>{e.state}</Td>
                                <Td>{e.status}</Td>
                                <Td>{e.ports.PrivatePort ? e.ports.PublicPort : e.ports}</Td>
                                <Td>{e.state == "running" ? <Button onClick={() => { stopHandler(e.name) }}>Stop</Button> : <Button onClick={() => { startHandler(e.id.slice(0, 10)) }}>Start</Button>}</Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}

export default AdminTable;