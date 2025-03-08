function ChatMessage({ history, loading }) {
    return (
        <div className="space-y-4">
            {history.map((chat, index) => (
                <div key={index} className="space-y-4">
                    {/* User Message */}
                    <div className="flex justify-end">
                        <div className="bg-blue-600 text-white rounded-lg py-2 px-4 max-w-[80%] shadow-sm">
                            <div className="flex items-center justify-end mb-1">
                                <span className="text-xs text-blue-100">You</span>
                            </div>
                            <p className="text-sm">{chat.question}</p>
                        </div>
                    </div>

                    {/* Bot Message */}
                    <div className="flex justify-start">
                        <div className="bg-gray-100 rounded-lg py-2 px-4 max-w-[80%] shadow-sm">
                            <div className="flex items-center space-x-2 mb-1">
                                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs">AI</span>
                                </div>
                                <span className="text-xs text-gray-500">ChatBot</span>
                            </div>
                            <p className="text-sm text-gray-800">{chat.answer}</p>
                        </div>
                    </div>
                </div>
            ))}
            
            {/* Loading Message */}
            {loading && (
                <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg py-2 px-4 max-w-[80%] shadow-sm">
                        <div className="flex items-center space-x-2 mb-1">
                            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs">AI</span>
                            </div>
                            <span className="text-xs text-gray-500">ChatBot</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChatMessage;