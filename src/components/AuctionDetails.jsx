import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Flex, Text, Image, Button } from '@chakra-ui/react'

export const AuctionDetails = () => {
    const { id } = useParams()
    const [data, setData] = useState({})
    const storage = window.sessionStorage;
    const navigate = useNavigate


    useEffect(() => {
        axios.get(`https://hyperwork.herokuapp.com/auction/${id}`).then((data) => {
            setData(data.data)

        })
    }, [])

    const [user, setUser] = useState("")
    const handleClick = () => {
        var nameget = storage.getItem("name")
        setUser(nameget)
    }

    const [bid, setBid] = useState(0)

    const handleClickCreate = () => {


        var newBid = window.prompt("Enter New Bid")
        setBid(newBid)
        data.Bids = newBid
        fetch(`https://hyperwork.herokuapp.com/auction/${id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        console.log(data)
    }







    return (
        <>

            <Box margin={"auto"} width="60%" height="600px">
                <Button onClick={handleClick} style={{
                    backgroundColor: "red",
                    color: "white",
                    padding: "1%",
                    fontSize: "17px",
                    margin: "1%"
                }}>Get User</Button>

                <Button onClick={() => {
                    handleClickCreate()
                }} style={{
                    backgroundColor: "red",
                    color: "white",
                    padding: "1%",
                    fontSize: "17px",
                    margin: "1%"
                }}>Create New Bid</Button>


                {user ? <Text fontSize={'4xl'}>User_name:-  {user} </Text> : ""}


                <Box margin={"auto"} width="80px" height="80px" boxSize='sm'>
                    <Image borderRadius={"10px"} width="100%" height="100%" src={data.Img_url} alt='Dan Abramov' />
                </Box>
                <Box >

                    <Box >
                        <Text fontSize="3xl" >Name:-{data.Name}</Text>
                    </Box>
                    <Box>
                        <Text fontSize="3xl" >Quantity:-{data.Quantity}</Text>
                    </Box>
                    <Box>
                        <Text fontSize="3xl" >Bids:-{data.Bids}</Text>
                    </Box>
                    <Box>
                        <Text fontSize="2xl">Description:-{data.Desc}</Text>
                    </Box>





                </Box>

            </Box>

        </>
    )
}
