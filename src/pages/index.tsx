import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";


interface String {
  src: string;
  sizes: string;
  type: string;
}
interface DefaultRootState {
  count: Number;
}

export default function Index(){
  const [manifest, setmanifest] = useState<Array<String>>([]);
  const number = useSelector<DefaultRootState, any>((state) => state.count);
  useEffect(() => {
    fetchdata();
  }, []);

  async function fetchdata() {
    const res = await fetch("manifest.json");
    const data = await res.json();
    setmanifest(data.icons);
  }
 

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Hello World!!!</h3>
      <p>{number}</p>
      <div style={{textAlign:"center", marginTop:"100px"}}>
        {manifest.map((data, index) => (
          <div key={index}>
            <li>{data.src}</li>
            <li>{data.type}</li>
            <li>{data.type}</li>
          </div>
        ))}
      </div>
    </div>
  );
}
