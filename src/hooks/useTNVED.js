import { useState, useEffect } from 'react';

const useTNVED = (clothesType, materials, sex) => {
  const [hsCode, setHsCode] = useState(null);
  const baseUrl = "https://honessi-production.up.railway.app/api/TelegramHonessy/GetTnved";


   const url = `${baseUrl}?input=${clothesType}${materials}${sex}`

  useEffect(() => {
    const fetchHsCode = async () => {
      if (clothesType && materials && sex) {
        // Simulate a delay to mimic an API call
        const response = await fetch(url, {
            method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                }
        });
        setHsCode(response); // Static value for debugging
      }
    };

    fetchHsCode();
  }, [clothesType, materials, sex]);

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
