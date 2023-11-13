import { getUserFromClerkID } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { analyze } from "@/utils/ai"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export const POST = async () => {
    const user = await getUserFromClerkID();
    const entry = await prisma.journalEntry.create({
        data: {
            userId: user.id,
            content: "Write about your day!",
        },
    })

    const analysis = await analyze(entry.content);
    await prisma.analysis.create({
        data: {
            entryId: entry.id,
            userId: user.id,
            ...analysis,
        }
    })

    revalidatePath("/journal");

    return NextResponse.json({ data: entry });
}
