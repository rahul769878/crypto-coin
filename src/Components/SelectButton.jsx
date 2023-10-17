import { Box } from '@mui/system';
import React from 'react';
import './selectButton.css'


const SelectButton = ({children, selected, onClick}) => {
    return <Box onClick={onClick} sx={{border:"1px solid gold", padding:"10px", paddingLeft:"20px", paddingRight:"20px", fontFamily:"Montserrat", cursor:"pointer", backgroundColor:selected ? "gold" : '', fontWeight: selected ? "700" : "500", "&:hover": {backgroundColor:"gold", color:"black"}, width:"18%", borderRadius:"5px"}} >{children}</Box>
}


export default SelectButton;