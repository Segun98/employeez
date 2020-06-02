import React, { useEffect, useState } from "react";

interface String {
  src: string;
  sizes: string;
  type: string;
}
export default function Index() {
  const [manifest, setmanifest] = useState<Array<String>>([]);
  useEffect(() => {
    fetchdata();
  }, []);

  async function fetchdata() {
    const res = await fetch("manifest.json");
    const data = await res.json();
    setmanifest(data);
  }
console.log(manifest);


  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Hello World!!!</h3>
      <div style={{textAlign:"center", marginTop:"100px"}}>
        {/* {manifest.map((data, index) => (
          <div key={index}>
            <li>{data.src}</li>
            <li>{data.type}</li>
            <li>{data.type}</li>
          </div>
        ))} */}
      </div>
    </div>
  );
}
