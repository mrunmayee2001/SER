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
import { render } from "react-dom";

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
    const cityranksmap = citylist.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
    var cityranks = [];
    cityranksmap.forEach((count, cityname) => {
        cityranks.push([cityname,count]);
    }
    )

  return (
    <div>
        <b>{props.emergency} Cases Recorded</b>
        {cityranks.map((item) => {
            return(
            <div className="RankedCity">
                <div className="Cityname">{item[0]}</div> 
                <div className="Cases">{item[1]}</div>
            </div>
        )}
        )}
    </div>
  )
}

export default AreaRanks