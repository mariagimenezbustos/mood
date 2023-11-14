import HistoryChart from "@/components/HistoryChart";
import { getUserFromClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";

const getData = async () => {
    const user = await getUserFromClerkID();
    const analyses = await prisma.analysis.findMany({
        where: {
            userId: user.id,
        },
        // select: {
        //     sentimentScore: true,
        // },
        orderBy: {
            createdAt: 'asc',
        },
    })

    const sum = analyses.reduce((acc, curr) => acc + curr.sentimentScore, 0);
    const avg = Math.round(sum / analyses.length);

    return {analyses, avg};
}

const History = async () => {
    const {avg, analyses} = await getData();
    console.log(analyses);

    return (
        <div className="w-full h-full text-neutral-200">
            <div className="mt-4 ml-4">{`Avg. Sentiment: ${avg}`}</div>
            <div className="w-full h-full">
                <HistoryChart data={analyses} />
            </div>
        </div>
    )
}

export default History;