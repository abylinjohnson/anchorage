import Navbar from "../components/Navbar";
import AdminTable from "../components/AdminTable";
import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Stack } from "@chakra-ui/react";
interface Container {
    id: String,
    name: String,
    state: String,
    status: String,
    port: Array<any>
}
interface ContainerProps {
    containers: Container[];
}
const Admin = () => {
    const [containers, setContainers] = useState<ContainerProps>();
    useEffect(() => {
        axios
            .get("http://localhost:3000/api/docker/containers")
            .then(function (response) {
                setContainers(response.data);
                console.log(response.data)
            });
    }, [])
    if (containers) {
        return <>
            <Navbar />
            <Stack p={10}>
                <AdminTable containers={containers} />
            </Stack>

        </>
    }
    return <h1>Loading</h1>
}

export default Admin;