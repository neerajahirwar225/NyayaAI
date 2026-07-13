const OpenAI = require("openai");
const dotenv = require("dotenv");

dotenv.config();

const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
  console.warn(
    "WARNING: GROQ_API_KEY is not defined in the environment variables."
  );
}

const genAI = apiKey
  ? new OpenAI({
      apiKey: apiKey,
      baseURL: "https://api.groq.com/openai/v1",
    })
  : null;

const getModel = () => {
  if (!genAI) {
    throw new Error(
      "Groq AI is not initialized. Please configure GROQ_API_KEY."
    );
  }

  return genAI;
};

module.exports = {
  genAI,
  getModel,
};