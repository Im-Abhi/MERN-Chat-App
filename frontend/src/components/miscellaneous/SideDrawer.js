import { Box, Button, Tooltip, Text, Menu, MenuButton, Avatar, MenuList, MenuItem, MenuDivider } from '@chakra-ui/react';
import React, { useState } from 'react';
import { ChatState } from '../../context/ChatProvider';

const SideDrawer = () => {
    const [ search, setSearch ] = useState("");
    const [ searchResult, setSearchResult ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ loadingChat, setLoadingChat ] = useState();  
    const { user } = ChatState();
    return (
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
                <Button variant="ghost">
                    <i class="fas fa-search"></i>
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
                        <i class="fas fa-bell" style={{"padding-right":"10px"}}></i>
                    </MenuButton>
                </Menu>
                <Menu>
                    <MenuButton as={Button} rightIcon={<i class="fas fa-chevron-down"></i>}>
                        <Avatar 
                            size='sm' 
                            cursor="pointer" 
                            name={user.name}
                            src={user.pic}
                        />
                    </MenuButton>
                    <MenuList>
                        <MenuItem>My Profile</MenuItem>
                        <MenuDivider />
                        <MenuItem>LogOut</MenuItem>
                    </MenuList>
                </Menu>
            </div>
        </Box>
    )
}

export default SideDrawer;