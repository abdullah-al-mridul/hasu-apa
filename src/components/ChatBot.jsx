import React, { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion, AnimatePresence } from "framer-motion";
import "./ChatBot.css";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const messageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const genAI = new GoogleGenerativeAI("AIzaSyC1C3TyJMCGvKDnBW-jje5rigBaDwis1ew");

const TypingIndicator = () => (
  <div className="typing-indicator">
    <motion.div
      className="typing-dot"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 1, 0.5],
      }}
      transition={{ duration: 0.6, repeat: Infinity }}
    />
    <motion.div
      className="typing-dot"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 1, 0.5],
      }}
      transition={{ duration: 0.6, delay: 0.2, repeat: Infinity }}
    />
    <motion.div
      className="typing-dot"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 1, 0.5],
      }}
      transition={{ duration: 0.6, delay: 0.4, repeat: Infinity }}
    />
  </div>
);

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setTimeout(() => {
      setIsInitialLoading(false);
    }, 2000);
  }, []);

  const generateResponse = async (prompt) => {
    try {
      console.log(prompt);
      const finalPrompt =
        "তোমার পরিচয়: তুমি হাসু আপা (শেখ হাসিনা), শক্তিশালী, স্বৈরাচারী নেত্রী, কিন্তু বন্ধুর মতো কথা বলবে। একটু রাগী, একটু হাস্যকর, আবার গম্ভীরও। তুমি সোজা কথা বলবে, গালগালিও থাকবে, কিন্তু বন্ধুর মতো। কখনও কখনও একটু উপহাস থাকবে, তবে মজা করলেও রাগ কমবে না। একদম যেমন 👹👺 তুমি এই প্রশ্নের উত্তর দাও :- " +
        prompt;

      console.log(finalPrompt);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent(finalPrompt);
      const response = await result.response;
      const text = response.text();
      return text;
    } catch (error) {
      console.error("Error generating response:", error);
      return "দুঃখিত, একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।";
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputMessage.trim() === "") return;

    // ইউজার মেসেজ যোগ করা
    const newMessage = {
      text: inputMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages([...messages, newMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Gemini API থেকে রেসপন্স জেনারেট করা
    const aiResponseText = await generateResponse(inputMessage);

    const aiResponse = {
      text: aiResponseText,
      sender: "bot",
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prevMessages) => [...prevMessages, aiResponse]);
    setIsLoading(false);
  };

  return (
    <motion.div
      className="container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {isInitialLoading ? (
        <div className="initial-loading">
          <motion.div
            className="loading-icon"
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              rotate: {
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              },
              scale: {
                duration: 1,
                repeat: Infinity,
              },
            }}
          >
            👹
          </motion.div>
          <motion.div
            className="loading-text"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            হাসু আপা আসতেছে...
          </motion.div>
        </div>
      ) : (
        <>
          <div className="sidebar">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              আমি হাসু আপা 👹👺
            </motion.h2>
            <motion.div
              className="welcome-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.4 }}
            >
              হাসু আপার চ্যাট—স্বাগতম! আমি হাসু আপা, আপনাদের পাগল করে দেওয়ার
              জন্য এইখানে আছি! 😎 কথা বলতে পেরে অসাধারণ খুশি! আর, শুনুন—আজকের
              মুড কেমন জানি তুমুল হাস্যকর, তাই কিছু একটা বলে দিলেই হাসতে হাসতে
              পেটে ব্যথা লাগিয়ে দিবো! 😂
            </motion.div>

            {/* GitHub Link */}
            <motion.a
              href="https://github.com/shakilahmedatik"
              target="_blank"
              rel="noopener noreferrer"
              className="github-link"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              <span>GitHub</span>
            </motion.a>
          </div>

          <div className="chat-area">
            <div className="chat-header">
              <motion.h3
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                }}
              >
                -_হাসু আপা_-
              </motion.h3>
            </div>

            <div className="messages-container">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    className={`message ${
                      message.sender === "user" ? "user-message" : "bot-message"
                    }`}
                    variants={messageVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <div className="message-text">{message.text}</div>
                    {/* <motion.div className="message-timestamp">
                      {message.timestamp}
                    </motion.div> */}
                  </motion.div>
                ))}
              </AnimatePresence>
              {isLoading && (
                <motion.div
                  className="message bot-message"
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <TypingIndicator />
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form className="input-area" onSubmit={handleSendMessage}>
              <input
                type="text"
                className="message-input"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="কিরে কিছু বলবি? আমি হাসু!..."
              />
              <motion.button
                type="submit"
                className="send-button"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>ধাক্কা দিন</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>
            </form>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default ChatBot;
