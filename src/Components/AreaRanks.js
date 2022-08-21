import React, { useEffect, useState } from "react";
import db from "../Firebase";
import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

function AreaRanks(props) {
    const [Logs, setCallLogs] = useState([]);
    useEffect(() => {

        async function fetchInfo() {
        const ref = collection(db, "Call-Logs");
        const info = [];
        const data = await query(getDocs(ref));
        data.forEach((doc) => {
            info.push(doc.data());
        });
        setCallLogs(info);
        }
        fetchInfo();
    }, []);

    let citylist = []
    Logs.map((val) => {
        if(val.City && val.Service==props.emergency)
        citylist.push(val.City);
    })
    console.log(citylist);
    const cityranks = citylist.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
    console.log(cityranks);

  return (
    <div>
        <b>{props.emergency} Cases Recorded</b>
        <div className="RankedCity">
            <div className="Cityname">CityName</div> 
            <div className="Cases">Cases</div>
        </div>
        
        {cityranks.forEach((count, cityname) => {
            console.log(cityname);
            return(
            <div className="RankedCity">
                <div className="Cityname">{cityname}</div> 
                <div className="Cases">{count}</div>
            </div>
        )}
        )}
    </div>
  )
}

export default AreaRanks