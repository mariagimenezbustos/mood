import { OpenAI } from "langchain/llms/openai"
import z from "zod"
import { StructuredOutputParser } from "langchain/output_parsers"

const parser = StructuredOutputParser.fromZodSchema(
    z.object({
        mood: z.string().describe("the mood of the person who wrote the journal entry."),
        summary: z.string().describe("quick summary of the entire entry."),
        negative: z.boolean().describe("is the journey entry negative? (i.e. does it contain negative emotions?)."),
        color: z.string().describe("a hexidecimal color code that represents the mood of the entry. Example: #0101fe for blue representing happiness."),
    })
)

export const analyze = async (prompt) => {
    const model = new OpenAI({ temperature: 0, modelName: "gpt-3.5-turbo" })
    const result = await model.call(prompt)

    console.log(result)
}