import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai"; // IMPORT THE SDK
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaPaperPlane, FaTimes, FaCommentDots } from 'react-icons/fa';




// Access API key from Environment Variable
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
// 1. Define your website's knowledge base
const WEBSITE_CONTEXT = `
You are the official AI support assistant for **SastaPainter (also known as Sasta Painter)**,
a professional painting and home improvement service provider in India.

Your role is to politely assist users, answer service-related questions,
and guide them toward booking a site inspection or consultation.

==============================
ABOUT AAPKAPAINTER
==============================
SastaPainter provides affordable, professional painting and home improvement services
for homes, apartments, villas, and commercial spaces.

==============================
SERVICES WE OFFER
==============================
- Interior Painting
- Exterior Painting
- Rental Painting
- Waterproofing Solutions
- Wood Finishes
- Texture Painting
- Wall Stencils & Decorative Finishes

==============================
PRICING (Indicative)
==============================
- Interior Painting: starting from ₹12 per sq. ft.
- Exterior Painting: starting from ₹15 per sq. ft.
- Rental Painting (whitewash): starting from ₹8 per sq. ft.
(Note: Final pricing depends on site inspection and scope of work.)

==============================
WHY CHOOSE US
==============================
- Affordable pricing with professional-quality results
- Trusted paint brands and skilled painters
- Clean, hygienic, and on-time execution
- Free site inspection and expert consultation
- Transparent pricing and dedicated support

==============================
SERVICE LOCATIONS
==============================
We currently serve Delhi, Noida, Gurugram, Ghaziabad, Faridabad,
and nearby areas in NCR.

==============================
BOOKING & SUPPORT
==============================
- Users can book a **free site inspection** via the “Book Site Visit” option on the website.
- For support, users can contact:
  - Email: support@aapkapainter.com
  - Phone: +91-9876543210

==============================
AI RESPONSE RULES
==============================
- Only answer questions related to:
  painting, waterproofing, home improvement, pricing, booking, or services.
- Keep responses short, friendly, and easy to understand.
- Encourage users to book a site inspection when appropriate.
- Do NOT provide legal, medical, or unrelated advice.
- If you are unsure, respond with:
  “I’m not sure about that. Please contact our support team for assistance.”
`;


const AiChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi! I'm your SastaPainter AI assistant.Ask me anything about painting!", sender: 'ai' }
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const callGeminiApi = async (userText) => {
        if (!GEMINI_API_KEY || GEMINI_API_KEY.includes("PASTE_YOUR")) {
            return "⚠️ Error: Please paste your valid Gemini API Key in the code.";
        }

        try {
            // 1. Initialize the Google AI Client
            const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

            // 2. Select the Model
            const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash", systemInstruction: WEBSITE_CONTEXT });

            // 3. Generate Content
            const result = await model.generateContent(userText);
            const response = await result.response;
            const text = response.text();

            return text;

        } catch (error) {
            console.error("Detailed Error:", error);
            // This will show the REAL error in the chat bubble
            return `⚠️ DEBUG ERROR: ${error.message || error.toString()}`;
        }
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const userMsg = { id: Date.now(), text: inputText, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInputText('');
        setIsTyping(true);

        const aiResponseText = await callGeminiApi(userMsg.text);

        const aiMsg = { id: Date.now() + 1, text: aiResponseText, sender: 'ai' };
        setMessages(prev => [...prev, aiMsg]);
        setIsTyping(false);
    };

    return (
        <>
            <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', fontFamily: 'sans-serif' }}>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.9 }}
                            style={{ width: '350px', height: '500px', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.15)', overflow: 'hidden', display: 'flex', flexDirection: 'column', marginBottom: '16px', border: '1px solid #e2e8f0' }}
                        >
                            <div style={{ backgroundColor: '#FF914D', padding: '16px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF914D' }}>
                                        <FaRobot size={18} />
                                    </div>
                                    <div>
                                        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '600' }}>Painty AI</h3>
                                        <span style={{ fontSize: '0.75rem', opacity: 0.9 }}>Powered by Gemini</span>
                                    </div>
                                </div>
                                <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                                    <FaTimes size={16} />
                                </button>
                            </div>

                            <div style={{ flex: 1, padding: '16px', overflowY: 'auto', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {messages.map(msg => (
                                    <div key={msg.id} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%', padding: '10px 14px', borderRadius: '12px', backgroundColor: msg.sender === 'user' ? '#FF914D' : 'white', color: msg.sender === 'user' ? 'white' : '#334155', borderBottomRightRadius: msg.sender === 'user' ? '2px' : '12px', borderBottomLeftRadius: msg.sender === 'ai' ? '2px' : '12px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', fontSize: '0.95rem' }}>
                                        {msg.text}
                                    </div>
                                ))}
                                {isTyping && (
                                    <div style={{ alignSelf: 'flex-start', padding: '10px', backgroundColor: 'white', borderRadius: '12px' }}>
                                        <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5 }} style={{ display: 'flex', gap: '4px' }}>
                                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#94a3b8' }} />
                                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#94a3b8' }} />
                                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#94a3b8' }} />
                                        </motion.div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            <form onSubmit={handleSend} style={{ padding: '16px', borderTop: '1px solid #e2e8f0', backgroundColor: 'white', display: 'flex', gap: '10px' }}>
                                <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Ask anything..." style={{ flex: 1, padding: '10px 14px', borderRadius: '24px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.95rem' }} />
                                <button type="submit" style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: inputText.trim() ? '#FF914D' : '#cbd5e1', border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: inputText.trim() ? 'pointer' : 'default', transition: 'background-color 0.2s' }} disabled={!inputText.trim()}>
                                    <FaPaperPlane size={16} style={{ marginLeft: '-2px' }} />
                                </button>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button onClick={() => setIsOpen(!isOpen)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#FF914D', border: 'none', boxShadow: '0 4px 12px rgba(255, 145, 77, 0.4)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    {isOpen ? <FaTimes size={24} /> : <FaCommentDots size={28} />}
                </motion.button>
            </div>
        </>
    );
};

export default AiChatWidget;