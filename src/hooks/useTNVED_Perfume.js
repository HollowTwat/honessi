import { useState, useEffect } from 'react';

const useTNVED_p = (type) => {
  const [hsCode, setHsCode] = useState(null);

  useEffect(() => {
    const fetchHsCode = async () => {
      if (type) {
        // const url = `https://honessi-production.up.railway.app/api/TelegramHonessy/GetTnved?input=\"${type}\"`;
        const url = `https://honessi-production.up.railway.app/api/TelegramHonessy/GetTnved?input=Парфюмерная вода`

        try {
          const response = await fetch(url, {
            method: "GET",
            headers: {
              "Connection": "keep-alive",
              // "Content-Type": "application/json",
              "Accept": "*/*",
            },
            mode: "cors",
          });

          // if (!response.ok) {
          //   const errorText = await response.text();
          //   setHsCode(
          //     `Error: ${errorText || "No error message"} (Status: ${response.status}, URL: ${url})`
          //   );
          //   throw new Error(`HTTP error! Status: ${response.status}, Response: ${errorText}`);
          // }

          const data = JSON.stringify(response);
          // if (!data) {
          //   setHsCode(`Error: Empty response (Status: ${response.status})`);
          //   throw new Error("Empty response from server");
          // }

          // const strippedData = data.replace(/"/g, '');
          // setHsCode(`Success: ${strippedData} (Status: ${response.status})`);
          setHsCode(`Success: ${data}`);
        } catch (error) {
          const json = JSON.stringify(error)
          setHsCode(
            `${json}, URL: ${url}`
          );
        }
      }
    };

    fetchHsCode();
  }, [type]);

  return hsCode; // Return hsCode as a single value
};

export default useTNVED_p;
