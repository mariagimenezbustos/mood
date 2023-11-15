"use client"

import { askQuestion } from "@/utils/api"
import { useState } from "react"

const Question = () => {
    const [value, setValue] = useState("")
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState()

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const answer = await askQuestion(value);

        setResponse(answer);
        setValue("");
        setLoading(false);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input disabled={loading} onChange={onChange} value={value} type="text" placeholder="Ask a question" className="border border-black/20 bg-neutral-100 px-4 py-2 text-lg rounded-lg w-[calc(100%-112px)] mr-4 mb-4" />
                <button disabled={loading} type="submit" className="bg-blue-600 px-4 py-2 rounded-lg text-lg w-24 text-neutral-200">ask</button>
            </form>
            {loading && (<div className="text-neutral-200 italic">loading...</div>)}
            {response && (<div className="text-neutral-200 text-justify">{response}</div>)}
        </div>
    )
}

export default Question