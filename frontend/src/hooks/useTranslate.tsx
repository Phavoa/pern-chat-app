import { useEffect, useState } from "react";

const useTranslate = () => {
  const [translatedText, setTranslatedText] = useState<string | null>(null);

  useEffect(() => {
    const fetchTranslation = async () => {
      try {
        const res = await fetch("https://libretranslate.com/translate", {
          method: "POST",
          body: JSON.stringify({
            q: "hello how are youNo big tummy?\nIsn’t that a criteria?",
            source: "auto", // Auto-detect source language
            target: "eu",   // Translate to Basque (eu)
            format: "text",  // Return plain text
            alternatives: 3, // Number of alternatives
          }),
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();
        if (res.ok) {
          setTranslatedText(data.translatedText); // Set the translated text
        } else {
          console.error("Translation failed:", data);
        }
      } catch (error) {
        console.error("Error fetching translation:", error);
      }
    };

    fetchTranslation(); // Trigger the translation on component mount
  }, []); // Empty dependency array to run only once when component mounts

  return (
    <div>
      <h1>Translation Result:</h1>
      <p>{translatedText ? translatedText : "Loading..."}</p>
    </div>
  );
};

export default useTranslate;
