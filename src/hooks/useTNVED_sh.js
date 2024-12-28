import { useState, useEffect } from 'react';

const useTNVED_s = (type, materials_t, materials_m, materials_b, sex) => {
  const [hsCode, setHsCode] = useState(null);

  useEffect(() => {
    const fetchHsCode = async () => {
      if (type && materials_t && materials_m && materials_b && sex) {
        const url = `https://quart-test-production-9039.up.railway.app/api/TelegramHonessy/GetTnved?input=${type},${materials_t},${materials_m},${materials_b},${sex}`
        
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
  , [type, materials_t, materials_m, materials_b, sex]);

  return hsCode;
};

export default useTNVED_s;
