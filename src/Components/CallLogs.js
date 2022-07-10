import React from 'react';
//import db from '../Firebase';
//import { doc, onSnapshot } from "firebase/firestore";

const logs =[
    {
        DateTime: "2022-06-27 02:06",
        Name: "Mrunmayee",
        Status: "ended",
        Emotion: "Happy",
        Report: "Here's my report"
    },
    {
        DateTime: "2022-06-27 02:06",
        Name: "Mrunmayee",
        Status: "ended",
        Emotion: "Happy",
        Report: "Here's my report"
    },
    {
        DateTime: "2022-06-27 02:06",
        Name: "Mrunmayee",
        Status: "ended",
        Emotion: "Happy",
        Report: "Here's my report"
    },
    {
        DateTime: "2022-06-27 02:06",
        Name: "Mrunmayee",
        Status: "ended",
        Emotion: "Happy",
        Report: "Here's my report"
    },
    {
        DateTime: "2022-06-27 02:06",
        Name: "Mrunmayee",
        Status: "ended",
        Emotion: "Happy",
        Report: "Here's my report"
    },
    {
        DateTime: "2022-06-27 02:06",
        Name: "Mrunmayee",
        Status: "ended",
        Emotion: "Happy",
        Report: "Here's my report"
    },
    {
        DateTime: "2022-06-27 02:06",
        Name: "Mrunmayee",
        Status: "ended",
        Emotion: "Happy",
        Report: "Here's my report"
    },
    {
        DateTime: "2022-06-27 02:06",
        Name: "Mrunmayee",
        Status: "ended",
        Emotion: "Happy",
        Report: "Here's my report"
    },
    {
        DateTime: "2022-06-27 02:06",
        Name: "Mrunmayee",
        Status: "ended",
        Emotion: "Happy",
        Report: "Here's my report"
    },
    {
        DateTime: "2022-06-27 02:06",
        Name: "Mrunmayee",
        Status: "ended",
        Emotion: "Happy",
        Report: "Here's my report"
    },
    {
        DateTime: "2022-06-27 02:06",
        Name: "Mrunmayee",
        Status: "ended",
        Emotion: "Happy",
        Report: "Here's my report"
    },
    {
        DateTime: "2022-06-27 02:06",
        Name: "Mrunmayee",
        Status: "ended",
        Emotion: "Happy",
        Report: "Here's my report"
    },
    {
        DateTime: "2022-06-27 02:06",
        Name: "Mrunmayee",
        Status: "ended",
        Emotion: "Happy",
        Report: "Here's my report"
    },
    {
        DateTime: "2022-06-27 02:06",
        Name: "Mrunmayee",
        Status: "ended",
        Emotion: "Happy",
        Report: "Here's my report"
    },
    {
        DateTime: "2022-06-27 02:06",
        Name: "Mrunmayee",
        Status: "ended",
        Emotion: "Happy",
        Report: "Here's my report"
    },
    {
        DateTime: "2022-06-27 02:06",
        Name: "Mrunmayee",
        Status: "ended",
        Emotion: "Happy",
        Report: "Here's my report"
    },
    {
        DateTime: "2022-06-27 02:06",
        Name: "Mrunmayee",
        Status: "ended",
        Emotion: "Happy",
        Report: "Here's my report"
    },
    {
        DateTime: "2022-06-27 02:06",
        Name: "Mrunmayee",
        Status: "ended",
        Emotion: "Happy",
        Report: "Here's my report"
    },
]

function CallLogs() {
  return (
    <div className='Call-Logs'>
        <div className='Nav-Bar'>
            <div className='Searchbar'>Search</div>
            <div className='Emotion-Filter'>Emotion Filter</div>
            <div className='City-Filter'>City Filter</div>
        </div>
        <ul className='Logs-List'>
            {logs.map((val, key)=> {
                return(
                    <li key={key} className='Log' >
                        <div className='DateTime' >
                            {val.DateTime}
                        </div>
                        <div className='Person-Name' >
                            {val.Name}
                        </div>
                        <div className='Call-Status' >
                            {val.Status}
                        </div>
                        <div className='Emotion' >
                            {val.Emotion}
                        </div>
                        <div className='Report' >
                            {val.Report}
                        </div>
                    </li>
                )
            })}
        </ul>
    </div>
  )
}

export default CallLogs