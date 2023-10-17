import React, { useEffect, useState } from 'react';
import {Container,Typography, createTheme, ThemeProvider, TextField, TableContainer, LinearProgress, Table, TableHead, TableRow, TableCell, TableBody, Pagination} from '@mui/material'
import axios from 'axios';
import { CoinList } from '../Config/Api';
import { CryptoState } from '../CryptoContext';
import { useNavigate } from 'react-router-dom';
import { numberWithCommas } from './Carousel';

const CoinsTable = () => {

    const darkTheme = createTheme({
      palette: {
        mode: 'dark',
      },
    }); 

    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const navigate = useNavigate();
    
    const {currency, symbol} = CryptoState()
    

    useEffect(() => {
        const fetchCoinList = async ()=>{
         setLoading(true)
        const { data } = await axios.get(CoinList(currency))
        setCoins(data)
        setLoading(false)
     }
      fetchCoinList()
    }, [currency])

     const handleSearch =()=>{
      return coins.filter((item)=>(
        item.name.toLowerCase().includes(search) || 
        item.symbol.toLowerCase().includes(search)
      ))
     }
     

     

    return (
      <ThemeProvider theme={darkTheme}> 
        <Container sx={{textAlign:"center"}}>
            <Typography variant='h4' sx={{margin:4, fontFamily:"Montserrat"}}>Crypto Currency Prices By market Cap</Typography>
            <TextField label="Search for a crypto currency.." variant='outlined' sx={{marginBottom:2, width:"100%"}} onChange={(e)=>setSearch(e.target.value)}></TextField>
            <TableContainer>
              {loading? (
                    <LinearProgress style={{backgroundColor:"gold"}} />
                ): (
                <Table>
                    <TableHead sx={{ backgroundColor:"#EEBC1D"}}>
                     <TableRow>
                        {["coin", "price", "24h Change", "Market Cap"].map((head)=>(
                            <TableCell key={head} align={head === "coin"? "" : "right"} sx={{color:"black", fontWeight:"700", fontFamily:"Montserrat"}}>{head}</TableCell>
                        ))}
                     </TableRow>
                    </TableHead>
                    <TableBody>
                      {handleSearch().slice((page -1) * 10, (page -1) * 10 + 10).map((item)=>{
                        let profit = item.market_cap_change_percentage_24h >= 0

                        return <TableRow onClick={()=> navigate(`/coins/${item.id}`)} key={item.name} sx={{backgroundColor:"#16171a", cursor:"pointer", fontFamily:"Montserrat", "&:hover":{backgroundColor:"#131111"}}}>
                          <TableCell component="th" scope='row' sx={{display:"flex", gap:"15px"}}> 
                          <img src={item.image} alt={item.name} height="50px" style={{marginBottom: "10px"}} />
                          <div style={{display:"flex", flexDirection:"column"}}>
                              <span style={{fontSize:"22px", textTransform:"uppercase"}}>{item.symbol}</span>
                              <span style={{color:"darkgrey"}}>{item.name}</span>
                          </div>
                          </TableCell>
                          <TableCell align='right'>
                            {symbol}{" "} {numberWithCommas(item.current_price.toFixed(2))}
                          </TableCell>
                          <TableCell align='right' sx={{color: profit ? "green" : "red", fontWeight:"500"}}>
                            {profit && "+"}
                            {item.price_change_percentage_24h.toFixed(2)}
                          </TableCell>
                          <TableCell align='right'>{symbol}{numberWithCommas(item.market_cap.toString().slice(0, -6))} M</TableCell>
                        </TableRow>
                      })}
                    </TableBody>
                </Table>
                )}
            </TableContainer>
            <Pagination count={(handleSearch().length/10).toFixed(0)} sx={{padding:"20px", display:"flex", justifyContent:"center", width:"100%", ul:{"& .MuiPaginationItem-root": {color: "gold"}}}} onChange={(_, value)=> { setPage(value); window.scroll(0, 450)}}/>
        </Container>
        </ThemeProvider>
    )
}



export default CoinsTable;