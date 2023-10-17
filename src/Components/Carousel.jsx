import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import axios from 'axios';
import {TrendingCoins} from "../Config/Api"
import { CryptoState } from '../CryptoContext';
import AliceCarousel from 'react-alice-carousel';
import {Link} from "react-router-dom"


export function numberWithCommas (x){
 return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}

const Carousel = () => {

    const [trending, setTrending] = useState([])

    const { currency, symbol } = CryptoState()

    useEffect(() => {
        const fetchtrendingCoin = async ()=>{
            const { data } = await axios.get(TrendingCoins(currency));
            setTrending(data)
        }
        fetchtrendingCoin()
    }, [currency])

    const items = trending.map((coin)=>{
        let profit = coin.market_cap_change_percentage_24h >= 0

        return <Link to={`/coins/${coin.id}`}>
        <img src={coin.image} alt={coin.name} height="80" style={{marginBottom:10}} />
            <Box sx={{display:"flex", flexDirection:"column", textTransform:"uppercase", color:"white", justifyContent:"center"}}> 
        <span> 
            {coin.symbol  }
            <span style={{color: profit > 0? "rgb(14, 203, 129)": "red"}}>
              { profit && " +"}{ coin.market_cap_change_percentage_24h.toFixed(2)}
            </span>
        </span>
        </Box>
        <Box sx={{display:"flex", flexDirection:"column", textTransform:"uppercase", color:"white",justifyContent:"center"}}>  
        <span style={{fontSize:"20px", fontWeight:"bold"}}>
            {symbol} {numberWithCommas(coin.current_price.toFixed(2))}
        </span>
        </Box>
        </Link>
    })

    const responsive = {
        0: {
            items:2
        },
        512: {
            items:4,
        }
    }
    
    
    return <Box sx={{height:"50%", display:"flex", alignItems:"center"}}>
        <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
        />
    </Box>;
}


export default Carousel;