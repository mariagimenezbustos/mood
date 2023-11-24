"use client"
import { updateEntry, deleteEntry } from "@/utils/api";
import { useState } from "react";
import { useAutosave } from "react-autosave";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";

const Editor = ({ entry }) => {
    const [currEntry, setCurrEntry] = useState(entry);
    const [value, setValue] = useState(entry.content);
    const [isLoading, setIsLoading] = useState(false);
    // const [analysis, setAnalysis] = useState(entry.analysis);
    const router = useRouter();

    const date = new Date(entry.createdAt).toDateString()

    // const { mood, summary, color, negative, subject } = analysis;
    // const analysisData = [
    //     {name: "Summary", value: summary},
    //     {name: "Subject", value: subject},
    //     {name: "Mood", value: mood},
    //     {name: "Negative", value: negative ? "True" : "False"},
    // ]

    const handleDelete = async () => {
        await deleteEntry(entry.id);
        router.push("/journal");
    }

    useAutosave({
        data: value,
        onSave: async (_value) => {
            if (_value === entry.content) return

            setIsLoading(true);
            const { data } = await updateEntry(entry.id, { content: _value });
            // setAnalysis(data.analysis);
            setCurrEntry(data);
            setIsLoading(false);
        }
    })

    return (
        <div className="w-full h-full grid grid-cols-3 relative">
            <div className="absolute col-span-2">
                {isLoading && (
                    <Spinner />
                    // <div className="text-neutral-200 bg-neutral-700 pl-8 pt-8 italic">loading...</div>
                    // <div className="w-[16px] h-[16px] rounded-full bg-green-500"></div>
                )}
            </div>

            <div className="col-span-2">
                <textarea 
                    className="w-full h-full p-8 text-xl outline-none text-neutral-200 bg-neutral-700"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>

            <div className="border-l border-neutral-600">
                <div className="px-6 py-10 h-[100px]" style={{backgroundColor: currEntry.analysis.color}}>
                    <h2 className="text-2xl">Analysis</h2>
                </div>

                <div>
                    <ul role="list">
                        {/* {analysisData.map((item) => (
                            <li key={item.name}
                                className="px-2 py-4 flex items-center justify-between border-b border-t border-neutral-600"
                            >
                                <span className="text-lg font-semibold text-neutral-200 mr-4 ml-4">{item.name}</span>
                                <span className="text-neutral-200 mr-4">{item.value}</span>
                            </li>
                        ))} */}
                        <li className="px-2 py-4 flex items-center justify-between border-b border-t border-neutral-600">
                            <span className="text-lg font-semibold text-neutral-200 mr-4 ml-4">Subject</span>
                            <span className="text-neutral-200 mr-4">{currEntry.analysis.subject}</span>
                        </li>

                        <li className="px-2 py-4 flex items-center justify-between border-b border-t border-neutral-600">
                            <span className="text-lg font-semibold text-neutral-200 mr-4 ml-4">Mood</span>
                            <span className="text-neutral-200 mr-4">{currEntry.analysis.mood}</span>
                        </li>

                        <li className="px-2 py-4 flex items-center justify-between border-b border-t border-neutral-600">
                            <span className="text-lg font-semibold text-neutral-200 mr-4 ml-4">Subject</span>
                            <span className="text-neutral-200 mr-4">{currEntry.analysis.negative ? "True" : "False"}</span>
                        </li>

                        <li className="px-2 py-4 flex items-center justify-between border-b border-t border-neutral-600">
                            <span className="text-lg font-semibold text-neutral-200 mr-4 ml-4">Date</span>
                            <span className="text-neutral-200 mr-4">{date}</span>
                        </li>

                        <li className="px-6 py-6 flex items-center justify-between">
                            <button
                                onClick={handleDelete}
                                type="button"
                                className="rounded-md mx-auto bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                            >
                                delete entry
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Editor;


// -------------------


// 'use client'
// import { updateEntry, deleteEntry } from '@/utils/api'
// import { useState } from 'react'
// import { useAutosave } from 'react-autosave'
// import Spinner from './Spinner'
// import { useRouter } from 'next/navigation'

// const Editor = ({ entry }) => {
//   const [text, setText] = useState(entry.content)
//   const [currentEntry, setEntry] = useState(entry)
//   const [isSaving, setIsSaving] = useState(false)
//   const router = useRouter()

//   const handleDelete = async () => {
//     await deleteEntry(entry.id)
//     router.push('/journal')
//   }
//   useAutosave({
//     data: text,
//     onSave: async (_text) => {
//       if (_text === entry.content) return
//       setIsSaving(true)

//       const { data } = await updateEntry(entry.id, { content: _text })

//       setEntry(data)
//       setIsSaving(false)
//     },
//   })

//   return (
//     <div className="w-full h-full grid grid-cols-3 gap-0 relative">
//       <div className="absolute left-0 top-0 p-2">
//         {isSaving ? (
//           <Spinner />
//         ) : (
//           <div className="w-[16px] h-[16px] rounded-full bg-green-500"></div>
//         )}
//       </div>
//       <div className="col-span-2">
//         <textarea
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           className="w-full h-full text-xl p-8"
//         />
//       </div>
//       <div className="border-l border-black/5">
//         <div
//           style={{ background: currentEntry.analysis.color }}
//           className="h-[100px] bg-blue-600 text-white p-8"
//         >
//           <h2 className="text-2xl bg-white/25 text-black">Analysis</h2>
//         </div>
//         <div>
//           <ul role="list" className="divide-y divide-gray-200">
//             <li className="py-4 px-8 flex items-center justify-between">
//               <div className="text-xl font-semibold w-1/3">Subject</div>
//               <div className="text-xl">{currentEntry.analysis.subject}</div>
//             </li>

//             <li className="py-4 px-8 flex items-center justify-between">
//               <div className="text-xl font-semibold">Mood</div>
//               <div className="text-xl">{currentEntry.analysis.mood}</div>
//             </li>

//             <li className="py-4 px-8 flex items-center justify-between">
//               <div className="text-xl font-semibold">Negative</div>
//               <div className="text-xl">
//                 {currentEntry.analysis.negative ? 'True' : 'False'}
//               </div>
//             </li>
//             <li className="py-4 px-8 flex items-center justify-between">
//               <button
//                 onClick={handleDelete}
//                 type="button"
//                 className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
//               >
//                 Delete
//               </button>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Editor
