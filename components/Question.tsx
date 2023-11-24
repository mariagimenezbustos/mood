"use client"

import { askQuestion } from "@/utils/api"
import { useState } from "react"

const Question = () => {
    const [question, setQuestion] = useState("")
    const [loading, setLoading] = useState(false)
    const [answer, setAnswer] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { data } = await askQuestion(question);

        setAnswer(data);
        setLoading(false);
        setQuestion("");
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    disabled={loading}
                    onChange={(e) => setQuestion(e.target.value)}
                    value={question}
                    type="text"
                    placeholder="Ask a question"
                    className="border border-black/20 bg-neutral-100 px-4 py-2 text-lg rounded-lg w-[calc(100%-112px)] mr-4 mb-4"
                />
                <button
                    disabled={loading}
                    type="submit"
                    className="bg-blue-600 px-4 py-2 rounded-lg text-lg w-24 text-neutral-200"
                >
                    ask
                </button>
            </form>
            {loading && (<div className="text-neutral-200 italic">loading...</div>)}
            {answer && (<div className="text-neutral-200 text-justify">{answer}</div>)}
        </div>
    )
}

export default Question