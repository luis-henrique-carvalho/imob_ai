import { Bot, UserIcon } from "lucide-react";
import { Message } from "../types";

export function MessageHistory({ messages }: { messages?: Message[] }) {
    if (!messages || messages.length === 0) {
        return (
            <div className="flex h-full flex-col items-center justify-center p-8 text-center text-muted-foreground">
                <Bot className="h-8 w-8 mb-2 opacity-20" />
                <p className="text-sm">Nenhuma mensagem trocada ainda.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 p-6">
            {messages.map((msg) => {
                const isBot = msg.role === "assistant" || msg.role === "system";

                return (
                    <div
                        key={msg.id}
                        className={`flex gap-3 ${isBot ? "flex-row" : "flex-row-reverse"}`}
                    >
                        <div
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${isBot ? "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400" : "bg-muted text-muted-foreground"
                                }`}
                        >
                            {isBot ? <Bot className="h-4 w-4" /> : <UserIcon className="h-4 w-4" />}
                        </div>
                        <div
                            className={`flex flex-col gap-1 text-sm max-w-[85%] ${isBot ? "items-start" : "items-end"
                                }`}
                        >
                            <div
                                className={`rounded-2xl px-4 py-2 whitespace-pre-wrap leading-relaxed shadow-sm ${isBot
                                    ? "bg-muted/80 text-foreground"
                                    : "bg-primary text-primary-foreground"
                                    }`}
                            >
                                {msg.content}
                            </div>
                            <span className="text-[10px] text-muted-foreground px-1 mt-0.5">
                                {new Date(msg.createdAt).toLocaleString("pt-BR", {
                                    day: '2-digit', month: '2-digit',
                                    hour: '2-digit', minute: '2-digit'
                                })}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
