"use client"

import { Children, useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkBreaks from "remark-breaks"

type Msg = { id: string; role: "user" | "assistant"; content: string }

export default function ChatUI() {
    const [messages, setMessages] = useState<Msg[]>([
        {
            id: "m1",
            role: "assistant",
            content:
                "Ask me anything about longevity!",
        },
    ])
    const [input, setInput] = useState("")
    const [isSending, setIsSending] = useState(false)
    const messagesContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const container = messagesContainerRef.current
        if (!container) return
        container.scrollTo({ top: container.scrollHeight, behavior: "smooth" })
    }, [messages])

    const sendMessage = async () => {
        if (!input.trim() || isSending) return

        const userContent = input
        setMessages((prev) => [
            ...prev,
            { id: crypto.randomUUID(), role: "user", content: userContent },
        ])
        setInput("")
        setIsSending(true)

        try {
            const response = await fetch("/api/assistant", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userContent }),
            })

            if (!response.ok) {
                throw new Error("Failed to fetch assistant response")
            }

            const data: { message?: string } = await response.json()

            setMessages((prev) => [
                ...prev,
                {
                    id: crypto.randomUUID(),
                    role: "assistant",
                    content: data.message ?? "hello world",
                },
            ])
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                {
                    id: crypto.randomUUID(),
                    role: "assistant",
                    content: "Something went wrong. Try again.",
                },
            ])
        } finally {
            setIsSending(false)
        }
    }

    return (
        <section className="mx-auto w-full sm:w-3/4 h-[80vh] flex flex-col border rounded-xl overflow-hidden">
            <div
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto p-3 flex flex-col gap-3"
            >
                {messages.map((m) => (
                    <div
                        key={m.id}
                        className={cn(
                            "flex w-full",
                            m.role === "user" ? "justify-end" : "justify-start"
                        )}
                    >
                        <Card
                            className={cn(
                                "w-fit max-w-[75%] shadow-sm",
                                m.role === "user"
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-card text-card-foreground"
                            )}
                        >
                            <CardContent className="px-5">
                                <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm, remarkBreaks]}
                                        components={{
                                            a: ({ node, ...props }) => (
                                                <a
                                                    {...props}
                                                    className="underline"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                />
                                            ),
                                            p: ({ node, className, ...props }) => (
                                                <p
                                                    {...props}
                                                    className={cn(
                                                        className,
                                                        "whitespace-pre-wrap last:mb-0"
                                                    )}
                                                />
                                            ),
                                            ul: ({ node, className, children, ...props }) => (
                                                <ul
                                                    {...props}
                                                    className={cn(
                                                        className,
                                                        "list-disc pl-5 space-y-1 whitespace-normal"
                                                    )}
                                                >
                                                    {Children.toArray(children).filter(
                                                        (child) =>
                                                            !(
                                                                typeof child === "string" &&
                                                                child.trim() === ""
                                                            )
                                                    )}
                                                </ul>
                                            ),
                                            ol: ({ node, className, children, ...props }) => (
                                                <ol
                                                    {...props}
                                                    className={cn(
                                                        className,
                                                        "list-decimal pl-5 space-y-1 whitespace-normal"
                                                    )}
                                                >
                                                    {Children.toArray(children).filter(
                                                        (child) =>
                                                            !(
                                                                typeof child === "string" &&
                                                                child.trim() === ""
                                                            )
                                                    )}
                                                </ol>
                                            ),
                                            li: ({ node, className, ...props }) => (
                                                <li
                                                    {...props}
                                                    className={cn(
                                                        className,
                                                        "whitespace-normal"
                                                    )}
                                                />
                                            ),
                                        }}
                                    >
                                        {m.content}
                                    </ReactMarkdown>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>

            <div className="border-t p-3 flex gap-2 bg-background">
                <Input
                    placeholder="Enter your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    className="flex-1"
                />
                <Button onClick={sendMessage} disabled={!input.trim() || isSending}>
                    {isSending ? "Thinking..." : "Send"}
                </Button>
            </div>
        </section>
    )
}
