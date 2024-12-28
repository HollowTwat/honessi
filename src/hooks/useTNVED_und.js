import { useState, useEffect } from 'react';

const useTNVED_u = (type, textile) => {
  const [hsCode, setHsCode] = useState(null);

  useEffect(() => {
    const fetchHsCode = async () => {
      if (type && textile) {
        const url = `https://honessi-production.up.railway.app/api/TelegramHonessy/GetTnved?input=${type},${textile}`

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
  , [type, textile]);

  return hsCode;
};

export default useTNVED_u;
