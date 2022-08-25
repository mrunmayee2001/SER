// Build the chart
import React from 'react'
import { render } from 'react-dom'
import Highcharts, { color } from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import PieChart from "highcharts-react-official";


function Emotionpie(props) {
  
  const options = {
    chart: {
      backgroundColor:"#1C1B60" ,
      width: 405,
      height: 285,
      borderRadius: 15,
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
        fontFamily:"Roboto"
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
            y: props.DrunkVal,
            sliced: false
          },
          {
            name:"Abusive",
            color:"#a41623",
            y: props.AbusiveVal,
            sliced: false
          },
          {
            name:"Stressful",
            color:"#f85e00",
            y: props.StressfulVal,
            sliced: false
          },
          {
            name:"Painful",
            color:"#ffb563",
            y: props.PainfulVal,
            sliced: false
          }
        ]
      }
    ]
  };
  
    return(
    <div>
      {this.props ?  <PieChart highcharts={Highcharts} options={options} /> : null}
    {/* <PieChart highcharts={Highcharts} options={options} /> */}
  </div>
    );
    
}

export default Emotionpie