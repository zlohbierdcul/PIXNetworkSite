const fs = require('fs');
const { mkdir } = require('fs/promises');
const { Readable } = require('stream');
const { finished } = require('stream/promises');
const path = require('path');

var fetchFavicon = require('@meltwater/fetch-favicon').fetchFavicon;

const downloadFile = async (url, fileName) => {
    const res = await fetch(url);
    if (!fs.existsSync('data/icons')) await mkdir('data/icons'); //Optional if you already have downloads directory
    const destination = path.resolve('./data/icons', fileName);
    const fileStream = fs.createWriteStream(destination, { flags: 'wx' });
    try {
        await finished(Readable.fromWeb(res.body).pipe(fileStream));
    } catch (e) {}
};

const fetchAllApps = async () => {
    const fetchFaviconPromises = [];

    let appdata = require('./data/appdata.json');

    for (const [category, name] of Object.entries(appdata)) {
        for (const [name, info] of Object.entries(appdata[category])) {
            if (info.faviconURL.length === 0) {
                try {
                    const fetchPromise = fetchFavicon(info.url).then((d) => {
                        const filename =
                            name.toLowerCase() + '.' + d.split('.').pop();
                        appdata[category][name]['faviconURL'] = d;
                        downloadFile(d, filename);
                    });
                    fetchFaviconPromises.push(fetchPromise);
                } catch (e) {}
            }
        }
    }

    await Promise.all(fetchFaviconPromises).then(() => {
        const data = JSON.stringify(appdata);
        try {
            fs.writeFileSync('data/newappdata.json', data);
        } catch (e) {
            console.error(e);
        }
    });
};

module.exports = fetchAllApps;
