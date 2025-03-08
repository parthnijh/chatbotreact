import React, { useRef } from 'react';

function ChatInput({ handlequestion, loading }) {
    const inputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const value = inputRef.current.value.trim();
        if (value) {
            handlequestion(value);
            inputRef.current.value = '';
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            handleSubmit(e);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <div className="flex items-center space-x-2">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    onKeyPress={handleKeyPress}
                    disabled={loading}
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center min-w-[100px]"
                >
                    {loading ? (
                        <span className="inline-flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending
                        </span>
                    ) : (
                        'Send'
                    )}
                </button>
            </div>
        </form>
    );
}

export default ChatInput;