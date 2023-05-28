import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Img,
    Input,
    Stack,
    useColorModeValue,
  } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import axios from 'axios';
  export default function Login(): JSX.Element {
    const navigate = useNavigate();
    const [username, setUsername] = useState<String>();
    const [password, setPassword] = useState<String>();
    let axiosConfig = {
      withCredentials: true,
    }

    const handleSubmit = async () =>{
      const response = await axios.post('http://localhost:3000/api/auth/login',{username: username, password: password},{
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
        withCredentials: true
      })      
      console.log(response)
      navigate(0)
    } 
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          alignItems={'center'}
          p={6}
          my={12}>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }} >
          <Img src={Logo} h={'200px'} w={'200px'}></Img>
          </Heading>
          <FormControl id="email" isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              _placeholder={{ color: 'gray.500' }}
              type="text"
              onChange={(e)=>setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password"  onChange={(e)=>setPassword(e.target.value)}/>
          </FormControl>
          <Stack spacing={6}>
            <Button
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
              onClick={()=>{handleSubmit()}}>
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    );
  }