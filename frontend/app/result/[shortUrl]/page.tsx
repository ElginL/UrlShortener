"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

const Result: React.FC = () : React.ReactElement => {
    const { shortUrl } : { shortUrl: string } = useParams();

    const decodedUrl: string = decodeURIComponent(shortUrl);

    return (
        <div className="flex flex-col h-lvh items-center justify-center gap-24">
            <h1 className="text-6xl font-bold">
                Result
            </h1>
            <div className="flex flex-col items-center justify-center gap-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-10">
                <h2 className="text-2xl font-bold">
                    Your shortened URL
                </h2>
                <a href={decodedUrl} target="_blank" className="text-blue-500">
                    {decodedUrl}
                </a>
                <Link href="/" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Generate new short URL
                </Link>
            </div>
        </div>
    );
};

export default Result;