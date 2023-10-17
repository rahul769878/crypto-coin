import { LinearProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CoinInfo from '../Components/CoinInfo';
import { SingleCoin } from '../Config/Api';
import { CryptoState } from '../CryptoContext';
import './coinPage.css'
import { numberWithCommas } from '../Components/Carousel';

const CoinPage = () => {
    const {id} = useParams()
    const [coin, setCoin] = useState()

    const {currency, symbol} = CryptoState()


    const fetchCoin =  async ()=>{
        const { data } = await axios.get(SingleCoin(id));

        setCoin(data)
    }

    useEffect(() => {
        fetchCoin()
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    console.log(coin)
     
    if (!coin) return <LinearProgress style={{backgroundColor:"gold"}}/>

    return (
       <div className='coin_container'>
         <div className="coin_sidebar">
            <img src={coin?.image.large} alt={coin?.name} height="200" style={{marginBottom:20}}/>
            <Typography variant='h3' sx={{fontWeight:"bold", fontFamily:"Montserrat", marginBottom:2}}>{coin?.name}</Typography>
            <Typography variant='subtitle1' sx={{width:"100%", fontFamily:"Montserrat", textAlign:"justify", paddingY:3, paddingX:5}}>{(coin?.description.en.split(". ")[0])}</Typography>
            <div className="market_data">
               <span style={{display:"flex"}}>
                <Typography variant="h5" sx={{fontFamily:"Montserrat",fontWeight:"bold"}} >Rank:</Typography>
                &nbsp; &nbsp;
                <Typography variant="h5" sx={{fontFamily:"Montserrat",}}>{coin?.market_cap_rank}</Typography>
               </span>

               <span style={{display:"flex"}}>
                <Typography variant="h5" sx={{fontFamily:"Montserrat",fontWeight:"bold"}} >Current Price:</Typography>
                &nbsp; &nbsp;
                <Typography variant="h5" sx={{fontFamily:"Montserrat",}}>{symbol}{" "}{numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}</Typography>
               </span>

               <span style={{display:"flex"}}>
                <Typography variant="h5" sx={{fontFamily:"Montserrat",fontWeight:"bold"}} >Market Cap:</Typography>
                &nbsp; &nbsp;
                <Typography variant="h5" sx={{fontFamily:"Montserrat",}}>{symbol}{" "}{numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -5))}M</Typography>
               </span>
            </div>
         </div>
         <CoinInfo coin={coin}/>
       </div>
    )
}


export default CoinPage;