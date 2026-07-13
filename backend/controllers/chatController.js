const Chat = require("../models/Chat");
const { getModel } = require("../config/gemini");

const askChatbot = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Please enter a legal query",
      });
    }

    let model;

    try {
      model = getModel();
    } catch (err) {
      return res.status(500).json({
        success: false,
        message:
          "Groq AI service not configured. Please add GROQ_API_KEY to the backend .env file.",
        error: err.message,
      });
    }

    const systemPrompt = `
You are a helpful and expert AI Legal Assistant specializing in Indian Law.

You must answer the user's question.

Identify whether the user's query is in English or Hindi.

Always reply in the SAME language.

Structure every answer exactly like this:

### Simple Explanation (सरल स्पष्टीकरण)

Explain the issue in simple words.

### Relevant Indian Law (प्रासंगिक भारतीय कानून)

Mention the relevant Indian Acts.

### Sections Involved (शामिल धाराएं)

Mention the relevant legal sections.

### Punishment / Penalty (सजा / जुर्माना)

Mention punishment if applicable.

### Suggested Next Steps (सुझाए गए अगले कदम)

Suggest practical legal steps.

At the end include this disclaimer:

"This information is for educational purposes only and is not a substitute for professional legal advice."
`;

    const completion = await model.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: question,
        },
      ],

      temperature: 0.3,

      max_tokens: 1500,
    });

    const answer = completion.choices[0].message.content;

    const chat = await Chat.create({
      userId: req.user.id,
      question,
      answer,
    });

    return res.status(201).json({
      success: true,
      data: chat,
    });
  } catch (error) {
    console.error("Chatbot Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to process legal query",
      error: error.message,
    });
  }
};

const getChatHistory = async (req, res) => {
  try {
    const chats = await Chat.find({
      userId: req.user.id,
    }).sort({
      createdAt: -1,
    });

    return res.json({
      success: true,
      data: chats,
    });
  } catch (error) {
    console.error("Fetch Chat History Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error retrieving chats",
    });
  }
};

module.exports = {
  askChatbot,
  getChatHistory,
};