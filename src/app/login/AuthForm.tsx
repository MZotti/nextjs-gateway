import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InfoIcon as InfoCircle } from "lucide-react"
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function loginAction(formData: FormData) {
    'use server';
    const apiKey = formData.get('apiKey');

    const response = await fetch('http://localhost:8080/accounts', {
        headers: {
            'X-API-Key': apiKey as string
        }
    });

    if(!response.ok) {
        throw new Error("Invalid API Key")
    }

    const cookiesStore = await cookies();
    cookiesStore.set('apiKey', apiKey as string)

    redirect('/dashboard')
}

export default function AuthForm() {
    return (
        <form action={loginAction}>
            <div className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="apiKey" className="text-sm font-medium">
                        API Key
                    </label>
                    <div className="flex gap-2">
                        <Input id="apiKey" name="apiKey" placeholder="Digite sua API Key" className="bg-muted" />
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
                                className="h-4 w-4"
                            >
                                <path d="M5 12h14"></path>
                                <path d="m12 5 7 7-7 7"></path>
                            </svg>
                        </Button>
                    </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-md flex gap-3">
                    <InfoCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <h4 className="font-medium text-sm mb-1">Como obter uma API Key?</h4>
                        <p className="text-sm text-gray-400">
                            Para obter sua API Key, você precisa criar uma conta de comerciante. Entre em contato com nosso
                            suporte para mais informações.
                        </p>
                    </div>
                </div>
            </div>
        </form>
    )
}