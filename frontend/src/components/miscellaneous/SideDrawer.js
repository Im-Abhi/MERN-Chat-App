import { Box, Button, Tooltip, Text, Menu, MenuButton, Avatar, MenuList, MenuItem, MenuDivider, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Input, toast, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ChatState } from '../../context/ChatProvider';
import ProfileModal from './ProfileModal';
import axios from 'axios';
import ChatLoading from '../ChatLoading';
import UserListItem from '../UserAvatar.js/UserListItem';

const SideDrawer = () => {
    const [ search, setSearch ] = useState("");
    const [ searchResult, setSearchResult ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ loadingChat, setLoadingChat ] = useState();  
    const { user } = ChatState();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const history = useHistory();
    const toast = useToast();

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        history.push("/");
    }
    const handleSearch = async () => {
        if(!search) {
            toast({
                title: "Please enter something in search",
                status: "warning",
                duration: "3000",
                isClosable: true,
                position: "top-left"
            });
            return;
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            const { data } = await axios.get(`/api/user?search=${search}`, config);
            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to load search results",
                status: "error",
                duration: "3000",
                isClosable: true,
                position: "bottom-left"
            });
            return;
        }
    };

    const accessChat = (userId) => {

    };

    return (
        <>
            <Box
                d="flex"
                justifyContent="space-between"
                alignItems="center"
                bg="white"
                w="100%"
                p="5px 10x"
                borderWidth="5px"
            >
                <Tooltip
                    label="Search users to chat"
                    hasArrow
                    placement='bottom-end'
                >
                    <Button variant="ghost" onClick={onOpen}>
                        <i className="fas fa-search"></i>
                        <Text d={{  base: "none", md: "flex"}} px="4">
                            Search User
                        </Text>
                    </Button>
                </Tooltip>
                <Text fontSize="2xl" fontFamily="Work sans">
                    Chat-App
                </Text>
                <div>
                    <Menu>
                        <MenuButton p={1}>
                            <i className="fas fa-bell" style={{paddingRight:"10px"}}></i>
                        </MenuButton>
                    </Menu>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<i className="fas fa-chevron-down"></i>}>
                            <Avatar 
                                size='sm' 
                                cursor="pointer" 
                                name={user.name}
                                src={user.pic}
                            />
                        </MenuButton>
                        <MenuList>
                            <ProfileModal user={user}>
                                <MenuItem>My Profile</MenuItem>
                            </ProfileModal>
                            <MenuDivider />
                            <MenuItem onClick={logoutHandler}>LogOut</MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </Box>
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth={"1px"}>Search User</DrawerHeader>
                    <DrawerBody>
                        <Box d="flex" pb={"2"}>
                        <Input 
                            placeholder='Search by name or email'
                            mr="2"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                        <Button onClick={handleSearch}>Go</Button>
                        </Box>
                        {
                            loading?
                            ( <ChatLoading/> ):
                            (
                                searchResult?.map((user) => (
                                    <UserListItem
                                      key={user._id}
                                      user={user}
                                      handleFunction={() => accessChat(user._id)}
                                    />
                                ))
                            )
                        }
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default SideDrawer;