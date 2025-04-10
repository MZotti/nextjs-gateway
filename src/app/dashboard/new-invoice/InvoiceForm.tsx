"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CreditCard } from "lucide-react";
import Link from "next/link";
import { createInvoiceAction } from "./create-invoice-action";

export default function InvoiceForm() {
    return (
        <form action={createInvoiceAction}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="amount" className="text-sm font-medium block">
                            Valor
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">R$</span>
                            <Input id="amount" name="amount" type="number" step={0.01} min={0} placeholder="0,00" className="pl-10 bg-muted" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="description" className="text-sm font-medium block">
                            Descrição
                        </label>
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="Descreva o motivo do pagamento"
                            className="min-h-[120px] bg-muted"
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-lg font-medium mb-4">Dados do Cartão</h3>

                    <div className="space-y-2">
                        <label htmlFor="cardNumber" className="text-sm font-medium block">
                            Número do Cartão
                        </label>
                        <div className="relative">
                            <Input id="cardNumber" name="cardNumber" placeholder="0000 0000 0000 0000" className="bg-muted pr-10" />
                            <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="expirationDate" className="text-sm font-medium block">
                                Data de Expiração
                            </label>
                            <Input id="expirationDate" name="expirationDate" placeholder="MM/AA" className="bg-muted" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="cvv" className="text-sm font-medium block">
                                CVV
                            </label>
                            <Input id="cvv" name="cvv" placeholder="123" className="bg-muted" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="cardName" className="text-sm font-medium block">
                            Nome no Cartão
                        </label>
                        <Input id="cardHolderName" name="cardHolderName" placeholder="Como aparece no cartão" className="bg-muted" />
                    </div>
                </div>
            </div>

            <div className="mt-8 flex justify-end gap-4">
                <Link href="/dashboard">
                    <Button variant="outline">Cancelar</Button>
                </Link>
                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 mr-2"
                    >
                        <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
                        <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
                        <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
                    </svg>
                    Processar Pagamento
                </Button>
            </div>
        </form>
    )
}