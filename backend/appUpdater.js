const fs = require('fs');
const { mkdir } = require('fs/promises');
const { Readable } = require('stream');
const { finished } = require('stream/promises');
const path = require('path');

var fetchFavicon = require('@meltwater/fetch-favicon').fetchFavicon;

let appdata = require('./data/appdata.json');

const fetchAllApps = async () => {
    const fetchFaviconPromises = [];

    for (const [category, name] of Object.entries(appdata)) {
        for (const [name, info] of Object.entries(appdata[category])) {
            const fetchPromise = fetchFavicon(info.url).then((d) => {
                appdata[category][name]['faviconURL'] = d;
            });
            fetchFaviconPromises.push(fetchPromise);
        }
    }

    await Promise.all(fetchFaviconPromises).then(() => {
        const data = JSON.stringify(appdata);
        try {
            fs.writeFileSync('data/newappdata.json', data);
        } catch (e) {
            console.error(e);
        }
    }).then(console.log);
};

module.exports = fetchAllApps;
