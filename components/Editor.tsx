"use client"
import { updatedEntry } from "@/utils/api";
import { useState } from "react";
import { useAutosave } from "react-autosave";

const Editor = ({ entry }) => {
    const [value, setValue] = useState(entry.content);
    const [isLoading, setIsLoading] = useState(false);
    const [analysis, setAnalysis] = useState(entry.analysis);

    const date = new Date(entry.createdAt).toDateString()

    const { mood, summary, color, negative, subject } = analysis;
    const analysisData = [
        {name: "Summary", value: summary},
        {name: "Subject", value: subject},
        {name: "Mood", value: mood},
        {name: "Negative", value: negative ? "True" : "False"},
    ]

    useAutosave({
        data: value,
        onSave: async (_value) => {
            setIsLoading(true);
            const data = await updatedEntry(entry.id, _value);
            setAnalysis(data.analysis);
            setIsLoading(false);
        }
    })

    return (
        <div className="w-full h-full grid grid-cols-3">
            <div className="col-span-2">
                {isLoading && (<div className="text-neutral-200 bg-neutral-700 pl-8 pt-8 italic">loading...</div>)}
                <textarea 
                    className="w-full h-full p-8 text-xl outline-none text-neutral-200 bg-neutral-700"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>

            <div className="border-l border-neutral-600">
                <div className="px-6 py-10" style={{backgroundColor: color}}>
                    <h2 className="text-2xl">Analysis</h2>
                </div>
                <div>
                    <ul>
                        {analysisData.map((item) => (
                            <li key={item.name}
                                className="px-2 py-4 flex items-center justify-between border-b border-t border-neutral-600"
                            >
                                <span className="text-lg font-semibold text-neutral-200 mr-4 ml-4">{item.name}</span>
                                <span className="text-neutral-200 mr-4">{item.value}</span>
                            </li>
                        ))}
                        <li
                            className="px-2 py-4 flex items-center justify-between border-b border-t border-neutral-600"
                        >
                            <span className="text-lg font-semibold text-neutral-200 mr-4 ml-4">Date</span>
                            <span className="text-neutral-200 mr-4">{date}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Editor;