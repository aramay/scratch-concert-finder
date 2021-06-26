import React, {useState} from 'react'
import { chakra, Box, Button, Image, Input, Center, useDisclosure, Drawer, DrawerOverlay, DrawerBody, DrawerHeader, DrawerContent, useBoolean, list } from '@chakra-ui/react'
import { InfoOutlineIcon, CalendarIcon } from '@chakra-ui/icons'
import SpotifyPlayer from 'react-spotify-web-playback';



const Search = () => {
    const [ search, setSearch ] = useState('')
    const { onClose, isOpen, onOpen} = useDisclosure()
    const [flag, setFlag] = useState(false)
    const [clicked, setClick] = useState(false)
    const handleKeyDown = (e) => {
        if(e.key === 'Enter'){

            setSearch(e.target.value)
            console.log({search})
        }
    }
    const getHashParams = () => {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ( e = r.exec(q)) {
           hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
      }
      const params = getHashParams();
      const token = params.access_token;
    return(
        <Box
        w="100%"
        h="100%"
        bgGradient={[
          "linear(to-tr, teal.300,yellow.400)",
          "linear(to-t, blue.200, teal.500)",
          "linear(to-b, orange.100, purple.300)",
        ]}>
        
        <Center>
            <InfoOutlineIcon
            mt={10}
            ml={'10%'}
            mr={5}
            onClick={onOpen}
            cursor={'pointer'}
            />
            {!clicked &&
            <Center         
            mt={2}
        // color={'lightgray'}
        fontWeight={"semibold"}
        fontSize={"18px"}
        mt={10}
        mr={5}
        cursor={'pointer'}
        onClick={e => setClick(true)}
        _hover={{
            background: "white",
            color: "teal.500",
          }}
        >
        Find upcoming concerts and events near you!
        </Center>}
        {clicked &&
            <Input
            w={'50%'} 
            mt={10} 
            bg='white' 
            mr={5} 
            placeholder="Search by City, State, or Zip Code"
            onChange={
                e => setSearch(e.target.value)
            }
            onKeyDown={
                (e) => {
                    if(e.key === 'Enter'){
                        setSearch(e.target.value)
                        setFlag(true)
                        console.log({search})
                    }
                }
            }
            >
            </Input>}
        <CalendarIcon 
        onClick={onOpen}
        mr={"10%"}
        mt={10}
        cursor={'pointer'}
        />
    <Drawer 
    placement="right" 
    onClose={onClose} 
    isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">Your Events</DrawerHeader>
        <DrawerBody>
            <p>This concert...</p>
            <p>That concert...</p>
            <p>Those concerts....</p>
        </DrawerBody>
        </DrawerContent>
    </Drawer>
    <Drawer 
    placement="left" 
    onClose={onClose} 
    isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
        <DrawerHeader 
        borderBottomWidth="1px">
            Your Profile
            </DrawerHeader>
        <DrawerBody>
            <p>Some elements</p>
            <p>Some more elements......</p>
            <p>Sign Out</p>
        </DrawerBody>
        </DrawerContent>
    </Drawer>
        </Center>
        {/* <Center
        mt={2}
        // color={'lightgray'}
        fontWeight={"semibold"}
        fontSize={"18px"}
        >
        Find upcoming concerts and events near you!
        </Center> */}
        {!flag &&
                <Image 
                src="client/images/Universal Recycling Symbol (U+2672).svg"
                ml={'auto'}
                mr={'auto'}
                // mt={25}
                // mb={25}
                h={500}
                _filter={'blur(1.5rem)'}
                />
        }
        {flag &&
        <SpotifyPlayer 
        token={token}
        uris={[]}
        styles={{
            activeColor: '#fff',
            bgColor: '#333',
            color: '#fff',
            loaderColor: '#fff',
            sliderColor: '#1cb954',
            trackArtistColor: '#ccc',
            trackNameColor: '#fff',
            width: '500px',
            'margin-left': '25%',
            'margin-right': '25%'
          }}
        />
        }        
      </Box>
    )
}

export default Search