import { useState, useEffect } from 'react';

const useTNVED = (clothesType, materials, sex) => {
  const [hsCode, setHsCode] = useState(null);

  useEffect(() => {
    const fetchHsCode = async () => {
      if (clothesType && materials && sex) {
        const url = `https://honessi-production.up.railway.app/api/TelegramHonessy/GetTnved?input=${clothesType},${materials},${sex}`

        try {
          const response = await fetch(url, {
            method: "GET",
            headers: {
              "Accept": "*/*",
            },
            mode: "cors",
          });

          if (!response.ok) {
            const errorText = await response.text();
            setHsCode(
              `Error: ${errorText || "No error message"} (Status: ${response.status}, URL: ${url})`
            );
            throw new Error(`HTTP error! Status: ${response.status}, Response: ${errorText}`);
          }

          const data = await response.text();
          if (!data) {
            setHsCode(`Error: Empty response (Status: ${response.status})`);
            throw new Error("Empty response from server");
          }

          const strippedData = data.replace(/"/g, '');
          setHsCode(strippedData);
        } catch (error) {
          setHsCode(`${error}, URL: ${url}`);
        }
      }
    };

    fetchHsCode();
  }
  , [clothesType, materials, sex]);

  return hsCode;
};

export default useTNVED;

// import {
//     useState
// } from 'react';

// const useFetchTNVEDData = () => {

//     const [error, setError] = useState(null);
//     const {
//         REACT_APP_API_KEY
//     } = process.env;


//     const getData = async (type, material, sex) => {

//         const url = "";

//         try {
//             const response = await fetch(url, {
//                 method: "POST",
//                 mode: "cors",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Accept": "application/json",
//                     "Authorization": `Bearer ${"Token " + REACT_APP_API_KEY}`
//                 },
//                 body: JSON.stringify({
//                     query: type + material + sex
//                 })
//             });

//             const data = await response.json();

//             return {
//                 tnved: data.tnved
//             }
//         } catch (error) {
//             setError(error);
//             return {
//                 tnved: '321'
//             }
//         }
//     }

//     const handleTHVEDInfo = async (type, material, sex) => {
//         return getData(type, material, sex)
//     };

//     return {
//         handleTHVEDInfo,
//         error
//     };
// };

// export default useFetchTNVEDData;
