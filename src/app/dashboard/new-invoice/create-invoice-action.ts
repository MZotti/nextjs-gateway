'use server';

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function createInvoiceAction(formData: FormData) {

    const cookiesStore = await cookies();
    const apiKey = cookiesStore.get("apiKey")?.value;

    const amount = formData.get("amount");
    const description = formData.get("description");
    const cardNumber = formData.get("cardNumber");
    const [expiry_month, expiry_year] = formData.get("expirationDate")!.toString().split("/");
    const cvv = formData.get("cvv");
    const cardHolderName = formData.get("cardHolderName");

    const response = await fetch('http://localhost:8080/invoice', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': apiKey as string,
        },
        body: JSON.stringify({
            amount: parseFloat(amount as string),
            description,
            card_number: cardNumber,
            expiry_month: parseInt(expiry_month as string),
            expiry_year: parseInt(expiry_year as string),
            cvv,
            cardholder_name: cardHolderName,
            payment_type: "credit_card"
        })
    })

    if(!response.ok) {
        console.error(await response.text())
        throw new Error("Failed to create invoice")
    }

    redirect('/dashboard')
}