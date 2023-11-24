import { getUserFromClerkID } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { NextResponse } from "next/server"
import { update } from "@/utils/actions"
// import { analyze } from "@/utils/ai"
// import { revalidatePath } from "next/cache"

export const POST = async (request: Request) => {
    const data = await request.json();
    const user = await getUserFromClerkID();
    const entry = await prisma.journalEntry.create({
        data: {
            content: data.content,
            user: {
                connect: {
                    id: user.id,
                }
            },
            analysis: {
                create: {
                    mood: "Neutral",
                    subject: "None",
                    negative: false,
                    summary: "None",
                    sentimentScore: 0,
                    color: "#FFFFFF",
                    userId: user.id,
                }
            }
        },
    })

    // const analysis = await analyze(entry.content);
    // await prisma.analysis.create({
    //     data: {
    //         entryId: entry.id,
    //         userId: user.id,
    //         ...analysis,
    //     }
    // })

    // revalidatePath("/journal");

    update(["/journal"])

    return NextResponse.json({ data: entry });
}
