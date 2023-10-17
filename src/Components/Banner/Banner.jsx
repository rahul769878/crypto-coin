import React from 'react';
import { Container, styled } from '@mui/system';
import { Box, Typography } from '@mui/material';
import Carousel from '../Carousel';

const Banner = () => {

   

    return <> 
        <Box sx={{backgroundImage: "url(./banner2.jpg)"}}> 
        <Container sx={{height:400, display:"flex", flexDirection:"column", paddingTop:5, justifyContent:"center"}}> 
        <Box sx={{display:"flex", height:"40%", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            <Typography variant='h2' sx={{fontWeight:"bold", fontFamily:"Montserrat",  }}>CRYPTO HUNTER</Typography>
            <Typography variant='subtitle2' sx={{color:"darkgray", textTransform:"capitalize", fontFamily:"Montserrat"}}>Get all the info regarding your favourite crypto app</Typography>
        </Box>
        <Carousel/>
        </Container>
        </Box>
    </>


}



export default Banner;