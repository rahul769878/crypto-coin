import React from 'react';
import {AppBar, Container, Toolbar,Typography, Select, MenuItem,  createTheme, ThemeProvider, Box} from '@mui/material'
import { CryptoState } from '../CryptoContext';

const Header = () => {
   
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

   const {currency, setCurrency} = CryptoState()
    
    return (
      <ThemeProvider theme={darkTheme}> 
        <AppBar color='transparent' position='static'>
          <Container>
            <Toolbar>
              <Box sx={{display:"flex", gap:"800px"}}> 
               <a href="/">
              <Typography variant='h5' sx={{color:"gold", flex:1, fontFamily:"Montserrat", fontWeight:"bold", cursor:"pointer",}}>
                Crypto Hunter
              </Typography>
               </a>


              <Select variant='outlined' sx={{width:"80px", height:"50px", }} value={currency} onChange={(e)=>setCurrency(e.target.value)}>
                <MenuItem value="INR">INR</MenuItem>
                <MenuItem value="USD">USD</MenuItem>
              </Select>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        </ThemeProvider>
    )
}



export default Header;