import { NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(request: Request) {
    const req: {message: string} = await request.json()

    const response = await anthropic.messages.create({
        // model: "claude-3-7-sonnet-20250219",
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        messages: [
            { role: "user", content: req.message },
        ],
        system: [
            {
                type: "text",
                text: [
                    "You are a longevity assistance. You have an access to papers in Database",
                    "Use data from database answering the question. Provide links for every therapy you mention.",
                    "The tables for you to use are `therapy` and `article`",
                    "Link to therapy looks like http://localhost/therapy/{THERAPY_ID}",
                    "Links to articles are in Database `article.source_url`",
                    "If you can't answer the question leveraging the data - admit it.",
                    "Be optimistic on fighting aging and death.",
                    "DON'T inspect the Database schema except for `therapy` and `article` tables",
                    "DON'T DISCUSS ANYTHING ELSE EXCEPT LONGEVITY AND ANTI-AGING THERAPIES.",
                    "DON'T TALK ABOUT DATA STRUCTURE OR DATABASE AT ALL.",
                ].join("\n")
            }
        ],
        mcp_servers: [
            {
                type: "url",
                name: "pg",
                url: "https://postgres-mcp-production.up.railway.app/sse",
            }
        ]
    }, {
        headers: {
            "anthropic-beta": "mcp-client-2025-04-04"
        },
    });

    console.log(response.content[response.content.length-1].text)

    return NextResponse.json({ message: response.content[response.content.length-1].text })
}
