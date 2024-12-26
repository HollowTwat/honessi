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
              // "Content-Type": "application/json",
              "Accept": "*/*",
            },
            mode: "cors", // Explicitly specify CORS mode
          });

          // Check if response is not OK
          if (!response.ok) {
            const errorText = await response.text();
            setHsCode(
              `Error: ${errorText || "No error message"} (Status: ${response.status}, URL: ${url})`
            );
            throw new Error(`HTTP error! Status: ${response.status}, Response: ${errorText}`);
          }

          // Handle successful response
          const data = await response.text();
          if (!data) {
            setHsCode(`Error: Empty response (Status: ${response.status})`);
            throw new Error("Empty response from server");
          }

          const strippedData = data.replace(/"/g, '');
          setHsCode(`Success: ${strippedData} (Status: ${response.status})`);
        } catch (error) {
          if (error.message === "Failed to fetch") {
            setHsCode(
              `Network error: Failed to fetch (Fallback: ${type}, URL: ${url})`
            );
          } else {
            setHsCode(`Error: ${error.message}. (Fallback: ${type})`);
          }
        }
      }
    };

    fetchHsCode();
  }, [type]);

  return hsCode; // Return hsCode as a single value
};

export default useTNVED_p;
