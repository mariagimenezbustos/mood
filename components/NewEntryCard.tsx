"use client";
import { createNewEntry } from "@/utils/api";
import { useRouter } from "next/navigation";

const NewEntryCard = () => {
    const router = useRouter();

    const handleOnClick = async () => {
        const { data } = await createNewEntry();

        router.push(`/journal/${data.id}`);
    }

    return (
        <div
            onClick={handleOnClick}
            className="cursor-pointer overflow-hidden rounded-lg bg-neutral-700 shadow text-neutral-200"
        >
            <div className="px-4 py-5 sm:p-6">
                <span className="text-3xl">New Entry</span>
            </div>
        </div>
    )
}

export default NewEntryCard;