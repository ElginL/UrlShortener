const UrlMapping = require("./url.entity");
const dataSource = require("./dataSource");

const repo = dataSource.getRepository(UrlMapping);

const insertMapping = async (longUrl : string, shortUrl : string) : Promise<void> => {
    const mapping = new UrlMapping();
    mapping.longUrl = longUrl;
    mapping.shortUrl = shortUrl;

    await repo.save(mapping);
};

const checkLongUrlExists = async (longUrl: string) : Promise<boolean> => {
    return await repo.exists({
        where: { longUrl }
    });
};

const checkShortUrlExists = async(shortUrl: string) : Promise<boolean> => {
    return await repo.exists({
        where: { shortUrl }
    });
};

const getShortUrl = async (longUrl: string) : Promise<typeof UrlMapping> => {
    return await repo.findOne({
        where: { longUrl }
    });
};

const getLongUrl = async (shortUrl: string) : Promise<typeof UrlMapping> => {
    return await repo.findOne({
        where: { shortUrl }
    });
};

module.exports = {
    insertMapping,
    checkLongUrlExists,
    checkShortUrlExists,
    getShortUrl,
    getLongUrl
};