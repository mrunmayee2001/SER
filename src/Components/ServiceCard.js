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
import {Row, Col} from 'react-bootstrap';

// const Logs =[
//     {
//         DateTime: "2022-06-27 02:06",
//         Name: "Mrunmayee",
//         Status: "ended",
//         Emotion: "Happy",
//         City: "Indore",
//         Report: "Here's my report"
//     },
//     {
//         DateTime: "2022-06-27 02:06",
//         Name: "Mrunmayee",
//         Status: "ended",
//         Emotion: "Happy",
//         City: "Indore",
//         Report: "Here's my report"
//     },
//     {
//         DateTime: "2022-06-27 02:06",
//         Name: "Mrunmayee",
//         Status: "ended",
//         Emotion: "Happy",
//         City: "Indore",
//         Report: "Here's my report"
//     },
//     {
//         DateTime: "2022-06-27 02:06",
//         Name: "Mrunmayee",
//         Status: "ended",
//         Emotion: "Happy",
//         City: "Indore",
//         Report: "Here's my report"
//     },
//     {
//         DateTime: "2022-06-27 02:06",
//         Name: "Mrunmayee",
//         Status: "ended",
//         Emotion: "Happy",
//         City: "Indore",
//         Report: "Here's my report"
//     },

// ]

function ServiceCard() {
  const [service, setService] = useState([]);
  //const ref = db.collection("Call-Logs");

  useEffect(() => {
    // const ref = collection(db, "Call-Logs");
    // const info = [];
    // function getLogs() {
    //   query(getDocs(ref)).then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       info.push(doc.data());
    //       console.log("hello");
    //     });
    //   });

    //   setCallLogs(info);
    // }
    // getLogs();
    async function fetchInfo() {
      const ref = collection(db, "Call-Logs");
      const info = [];
      const data = await query(getDocs(ref));
      data.forEach((doc) => {
        info.push(doc.data());
      });
      setService(info);
    }
    fetchInfo();
    console.log("hi");
  }, []);

  return (
    <div className="Call-Logs">
      <ul className="Logs-List">
        {console.log(service)}
        {service.map((val) => {
          return (
            <div>
            <Row>
            <Col md={2}>
              
            </Col>
            <Col md={6}>

            </Col>
            <h1>{val.Service}</h1>
            </Row>
            </div>
            
          );
        })}
      </ul>
    </div>
  );
}

export default ServiceCard;