import { useState, useEffect } from 'react';

const useTNVED_p = (type) => {
  const [hsCode, setHsCode] = useState(null);
  const [rawResponse, setRawResponse] = useState(null); // For debugging raw responses

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
            mode: "cors", // Explicitly specify CORS mode
          });

          setRawResponse(response); // Save raw response for debugging

          if (!response.ok) {
            const errorText = await response.text();
            setHsCode(`Error: ${errorText || "No error message"} (Status: ${response.status})`);
            throw new Error(`HTTP error! Status: ${response.status}, Response: ${errorText}`);
          }

          const data = await response.text();
          if (!data) {
            setHsCode(`Error: Empty response (Status: ${response.status})`);
            throw new Error("Empty response from server");
          }

          const strippedData = data.replace(/"/g, '');
          setHsCode(strippedData); // Success case
        } catch (error) {
          if (error.message === "Failed to fetch") {
            setHsCode(`Network error: Check CORS or server configuration. (Fallback: ${rawResponse})`);
          } else {
            setHsCode(`Error: ${error.message}.`);
          }
        }
      }
    };

    fetchHsCode();
  }, [type]);

  // return { hsCode, rawResponse }; // Return rawResponse for debugging
  return hsCode
};

export default useTNVED_p;
