import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart } from '../Config/Api';
import { Line} from "react-chartjs-2";
import {
  CircularProgress,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import './coinInfo.css'
import { chartDays } from "../Config/Data";
import { CryptoState } from "../CryptoContext";
import { CategoryScale, Chart,LinearScale, Tooltip, Legend, PointElement, LineElement,  } from "chart.js";
import SelectButton from "./SelectButton";
Chart.register(CategoryScale,LinearScale,PointElement, LineElement ,Tooltip, Legend);


const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  const [flag,setflag] = useState(false);


  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setflag(true);
    setHistoricData(data.prices);
  };

  console.log(coin);

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="container">
        {!historicData | flag===false ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
           <div
              style={{
                display: "flex",
                marginTop: "25px",
                justifyContent: "space-around",
                width: '1050px',
                 height:"540px",
                padding:"30px"
              }}
            >
            <Line 
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
                
              }}
            />
            </div>
            <div style={{display:"flex", width:"100%", justifyContent:"space-around", marginTop:"0px"}}>
              {chartDays.map((item)=> (
                <SelectButton key={item.value} onClick={()=> setDays(item.value)} selected={item.value === days}>{item.label}</SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};
export default CoinInfo;