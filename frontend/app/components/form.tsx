"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import isUrlHttp from "is-url-http";

const Form: React.FC = (): React.ReactElement => {
    const router = useRouter();
    const [longUrl, setLongUrl] = useState<string>("");
    const [error, setError] = useState<string>("");

    const submitHandler = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isUrlHttp(longUrl)) {
            setError("Enter a valid url");
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/shorten", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ longUrl })
            });

            if (response.ok) {
                const shortUrl : string = await response.text();

                router.push(`/result/${encodeURIComponent(shortUrl)}`);                
            }
        } catch (err) {
            console.error("Error shortening url: ", err);
        }
    }

    return (
        <div className="w-full">
            <form className="flex shadow border rounded" onSubmit={submitHandler}>
                <input 
                    type="text" 
                    name="longUrl" 
                    className="appearance-none py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline grow"
                    onChange={e => setLongUrl(e.target.value)}
                />
                <button type="submit" className="bg-blue-400 py-2 px-3 w-40">
                    Shorten Url
                </button>
            </form>
            {
                error && (
                    <p className="text-red-500">
                        error: {error}
                    </p>
                )
            }
        </div>
    );
};

export default Form;