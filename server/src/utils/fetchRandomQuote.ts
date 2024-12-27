import axios from "axios";
import https from "https";

export const fetchRandomQuote = async () => {
  try {
    const agent = new https.Agent({
      rejectUnauthorized: false, 
    });

    const response = await axios.get("https://api.quotable.io/quotes/random", { httpsAgent: agent });
    if (Array.isArray(response.data) && response.data.length > 0) {
      const { content, author } = response.data[0];
      return { content, author };
    } else {
      throw new Error("No quotes found in the response");
    }
  } catch (error) {
    console.error("Error fetching quote:", error);
    throw error;
  }
};
