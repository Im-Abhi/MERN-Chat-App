import React, { useEffect } from "react";
import { Box, Container, Text } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import Login from "../components/authentication/Login";
import SignUp from "../components/authentication/SignUp";
import { useHistory } from "react-router-dom";

const HomePage = () => {
    const history = useHistory();  
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        if(user)
            history.push("/chats");
    },[ history ]);
    return (
        <Container maxW='lg' centerContent>
            <Box
                d='flex'
                justifyContent='center'
                p={3}
                bg="white"
                w="100%"
                m="20px 0 15px 0"
                borderRadius="lg"
                borderWidth="1px"
            >
                <Text fontSize="3xl" fontFamily="Work sans">
                    Chat-App
                </Text>
            </Box>
            <Box bg="white" w="100%" p={3} borderRadius="lg" borderWidth="1px">
            <Tabs variant='soft-rounded'>
                <TabList mb="1em">
                    <Tab width="50%">Login</Tab>
                    <Tab width="50%">Sign Up</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Login />
                    </TabPanel>
                    <TabPanel>
                        <SignUp />
                    </TabPanel>
                </TabPanels>
                </Tabs>
            </Box>
        </Container>
    );
};

export default HomePage;