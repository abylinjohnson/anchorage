import { Card, CardHeader, CardBody, CardFooter,Stack,HStack,SimpleGrid, StackDivider, Box, Heading, Text, Flex, Button, Container } from '@chakra-ui/react'
import { TbBrandVscode } from 'react-icons/tb'
import { FiExternalLink } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Dashboard = () => {
    const navigate = useNavigate()
    const [vsc, setVsc] = useState<any>({});
    useEffect(() => {
        axios.post("http://localhost:3000/api/docker/container", {}, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
            withCredentials: true
        })
            .then(function (response) {
                console.log(response.data.HostConfig.PortBindings['8080/tcp'][0].HostPort)
                setVsc(
                    {
                        isRunning: response.data.State.Running,
                        url: `http://localhost:${response.data.HostConfig.PortBindings['8080/tcp'][0].HostPort}`
                    }
                );
            });
    }, [])
    const handleContainer = (isRunning: any) => {
        const url = isRunning ? "http://localhost:3000/api/docker/stop" : "http://localhost:3000/api/docker/start"
        axios.post(url, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
            withCredentials: true
        })
        navigate(0)

    }
    const handleRedirect = (url: any) => {
        console.log(url)
        window.open(url, '_blank', 'noreferrer');
    }
    if (vsc) {
        console.log(vsc)
        return (<>
            <Box p={3}>
            <Heading padding={10}>My Containers</Heading>
            <SimpleGrid p={5} spacing={5} columns={{sm:1,md:3}}>
                <Box w={"100%"}>
                    <Card >
                        <CardBody>
                            <Stack divider={<StackDivider />} spacing='4'>
                                <Flex justifyContent={'space-between'}>
                                    <TbBrandVscode p={5} />
                                    <Heading size='xs' textTransform='uppercase'>
                                        Visual Studio Code
                                    </Heading>
                                </Flex>
                                <Flex justifyContent={'space-between'}>
                                    <Button onClick={() => handleContainer(vsc.isRunning)} backgroundColor={vsc.isRunning ? "red.100" : "blue.100"} _hover={{bg: 'blue:100'}}>{vsc.isRunning ? "Stop" : "Start"}</Button>
                                    <Button isDisabled={!vsc.isRunning} onClick={() => { handleRedirect(vsc.url) }}><FiExternalLink /></Button>
                                </Flex>
                            </Stack>
                        </CardBody>
                    </Card>
                </Box>
            </SimpleGrid>
            </Box>
        </>)
    }

}

export default Dashboard