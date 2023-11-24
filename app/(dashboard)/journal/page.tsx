import { prisma } from "@/utils/db";
import { getUserFromClerkID } from "@/utils/auth";
import NewEntryCard from "@/components/NewEntryCard";
import EntryCard from "@/components/EntryCard";
import Link from "next/link";
import Question from "@/components/Question";

const getEntries = async () => {
    const user = await getUserFromClerkID();
    const entries = await prisma.journalEntry.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            analysis: true,
        }
    })

    return entries
}

const JournalPage = async () => {
    const entries = await getEntries();

    return (
        <div className="p-10 bg-neutral-800 h-full ">
            <h2 className="text-3xl mb-8 text-neutral-200">Journal</h2>

            <div className="my-8">
                <Question />
            </div>

            <div className="grid grid-cols-3 gap-4">
                <NewEntryCard />
                {entries.map((entry) => (
                    <Link href={`/journal/${entry.id}`} key={entry.id} >
                        <EntryCard entry={entry} />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default JournalPage;
