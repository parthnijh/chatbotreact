import React from 'react'
import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'
import { useEffect, useState } from 'react';

function ChatBot() {
    const [ans, setAns] = useState('');
    const [ques, setQues] = useState('');
    const [history, setHistory] = useState([]);
    const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
    const [loading, setLoading] = useState(false);

    function handleQuestion(ques) {
        if (ques.trim() === '') return;
        setQues(ques);
    }

    useEffect(() => {
        const getBot = async () => {
            try {
                if (!ques || ques.trim() === '') return;
                setLoading(true);
                
                const response = await fetch(
                    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            contents: [
                                { role: "user", parts: [{ text: ques }] }
                            ]
                        })
                    }
                );

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();
                const newAnswer = data.candidates[0].content.parts[0].text;
                
                setHistory(prevHistory => [...prevHistory, { 
                    question: ques, 
                    answer: newAnswer 
                }]);
                
                setAns(newAnswer);
                setLoading(false);
            } catch (error) {
                console.error("Error:", error);
                setLoading(false);
                setHistory(prevHistory => [...prevHistory, { 
                    question: ques, 
                    answer: "Sorry, I encountered an error. Please try again." 
                }]);
            }
        };

        if (ques) getBot();
    }, [ques, API_KEY]);

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 shadow-md">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-2xl font-bold text-white">AI ChatBot</h1>
                    <p className="text-blue-100 text-sm">Powered by Gemini</p>
                </div>
            </div>

            {/* Chat Container */}
            <div className="flex-1 max-w-4xl w-full mx-auto bg-white shadow-lg rounded-lg my-4 overflow-hidden flex flex-col">
                {/* Welcome Message */}
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm">AI</span>
                        </div>
                        <p className="text-gray-600">Hi! I'm your AI assistant. How can I help you today?</p>
                    </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4">
                    <ChatMessage history={history} loading={loading} />
                </div>

                {/* Input Area */}
                <div className="border-t border-gray-200">
                    <ChatInput handlequestion={handleQuestion} loading={loading} />
                </div>
            </div>
        </div>
    );
}

export default ChatBot;