import { useState, useEffect } from 'react';

const useTNVED_p = (type) => {
  const [hsCode, setHsCode] = useState(null);

  useEffect(() => {
    const fetchHsCode = async () => {
      if (type) {
        const url = `https://honessi-production.up.railway.app/api/TelegramHonessy/GetTnved?input=${type}`;

        try {
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Accept": "*/*",
              "Content-Type": "application/json",
            },
          });
        
          if (!response.ok) {
            const errorText = await response.text();
            console.error(`Server error: ${errorText}`);
            setHsCode(`Error: (Status: ${response.status})`);
            throw new Error(`HTTP error! Status: ${response.status}, Response: ${errorText}`);
          }
        
          const data = await response.text();
          if (!data) {
            throw new Error("Empty response from server");
          }
        
          const strippedData = data.replace(/"/g, '');
          setHsCode(strippedData);
        } catch (error) {
          console.error("Error fetching HS Code:", error);
          setHsCode(error);
        }
        }
      }
    };

    fetchHsCode();
  }, [type]);

  return hsCode;
};

export default useTNVED_p;
