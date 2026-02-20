import React from 'react';

export default function ItensPage() {
    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Itens</h1>
                <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                    Novo Item
                </button>
            </div>

            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-6">
                    <div className="flex flex-col items-center justify-center space-y-2 py-12 text-center">
                        <div className="rounded-full bg-muted p-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-6 w-6 text-muted-foreground"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10.5 3.5h3M3.375 7.5h17.25c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125H3.375c-.621 0-1.125-.504-1.125-1.125v-1.5c0-.621.504-1.125 1.125-1.125z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold">Nenhum item cadastrado</h3>
                        <p className="text-sm text-muted-foreground">
                            Você ainda não possui itens em sua lista. Comece criando um agora.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
