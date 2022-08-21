// Build the chart
import React from 'react'
import { render } from 'react-dom'
import Highcharts, { color } from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import PieChart from "highcharts-react-official";

const options = {
    chart: {
      backgroundColor:"#1E2D7D" ,
      width: 400,
      height: 270,
      borderRadius: 15,
      padding: 20,
      type: "pie"
      
    },
    legend: {
   layout: 'vertical',
   align: 'left',
   verticalAlign: 'middle',
   color:"#000000",
   itemMarginTop: 5,
   itemMarginBottom: 5
 },
    title: {
      text: "Caller Emotion",
      style: {
        color:"white",
        fontWeight:"bold",
      },
    },
    credits: {
      enabled: false
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        size: 150,
        alignSelf: 'right',
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          color:"#FFFFFF"
        },
        showInLegend: false
      }
    },
    series: [
      {
        name: "Value",
        color: "#1E2D7D",
        lineWidth: 1,
        marker: {
          enabled: true,
          symbol: "circle",

          radius: 1,
          states: {
            hover: {
              enabled: true,
            
            }
          }
        },
        data: [
          {
            name:"Drunk",
            color:"#ffd29d",
            y: 10,
            sliced: false
          },
          {
            name:"Abusive",
            color:"#a41623",
            y: 50,
            sliced: false
          },
          {
            name:"Stressful",
            color:"#f85e00",
            y: 20,
            sliced: false
          },
          {
            name:"Painful",
            color:"#ffb563",
            y: 20,
            sliced: false
          }
        ]
      }
    ]
  };
  
function Emotionpie() {
    return(
    <div>
    <PieChart highcharts={Highcharts} options={options} />
  </div>
    );
    
}

export default Emotionpie