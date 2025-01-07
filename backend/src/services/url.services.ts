import { UrlMapping } from "../db/url.entity";

const { BASE_URL, APPLICATION_PORT } = require("../constants");
const cryptography = require("crypto");
const base62 = require("base62/lib/ascii");
const urlRepo : { 
    insertMapping : (longUrl : string, shortUrl : string) => Promise<void>,
    checkLongUrlExists: (longUrl : string) => Promise<boolean>,
    checkShortUrlExists: (shortUrl: string) => Promise<boolean>,
    getShortUrl: (longUrl: string) => Promise<typeof UrlMapping>,
    getLongUrl: (shortUrl: string) => Promise<typeof UrlMapping>
} = require("../db/urlRepo");

// Hashing and Encoding approach to generate unique url
// https://blog.algomaster.io/i/147560459/approach-hashing-and-encoding
const generateShortUrl = async (longUrl : string, seed : number = 1) : Promise<string> => {
    const hash : string = cryptography.createHash("md5").update(longUrl + seed).digest("hex");
    const encoding : string = base62.encode(parseInt(hash.substring(0,12), 16));
    const urlExtension : string = encoding.substring(0, 6);

    // Handle Collisions
    let shortUrl = `${BASE_URL}:${APPLICATION_PORT}/${urlExtension}`;
    while (await urlRepo.checkShortUrlExists(shortUrl) && seed < 10) {
        shortUrl = await generateShortUrl(longUrl, seed + 1);
    }

    if (seed >= 10) {
        throw new Error("Too many collisions, failed to generate short url");
    }

    return shortUrl;
}

const addToDb = async (longUrl : string, shortUrl : string) : Promise<void> => {
    await urlRepo.insertMapping(longUrl, shortUrl);
}

const longUrlExists = async (longUrl : string) : Promise<boolean> => {
    return await urlRepo.checkLongUrlExists(longUrl);
}

const getShortUrlByLongUrl = async (longUrl: string) : Promise<string> => {
    return await urlRepo.getShortUrl(longUrl)["shortUrl"];
}

const getLongUrlByShortUrl = async (shortUrl: string) : Promise<string> => {
    return (await urlRepo.getLongUrl(shortUrl))["longUrl"];
}

module.exports = {
    generateShortUrl,
    addToDb,
    longUrlExists,
    getShortUrlByLongUrl,
    getLongUrlByShortUrl
};
