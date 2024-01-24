const ColorThief = require('colorthief');
const p = require('path');
const fs = require('fs');
const icoToPng = require('ico-to-png');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { createCanvas } = require('canvas');

function getAverageRGB(path) {
    console.log(path)
    const { window } = new JSDOM(`<!DOCTYPE html><body><img src="${path}"/></body>`);
    const dom = new JSDOM(`<!DOCTYPE html><body><img src="${path}" height="50px"/></body>`);
    console.log(dom.window.document.querySelector("img").height); 
    const imgEl = window.document.querySelector('img');
    console.log(imgEl.src)

    imgEl.addEventListener('load', extractAvgColor(imgEl, 9999));

    function extractAvgColor(imgEl, ratio) {
        var width,
            height = imgEl.height;
        console.log(imgEl)
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        console.log(imgEl);

        ctx.drawImage(imgEl, 0, 0, width, height);

        data = ctx.getImageData(0, 0, width, height);
        length = data.data.length;

        while ((i += ratio * 4) < length) {
            ++count;

            R += data.data[i];
            G += data.data[i + 1];
            B += data.data[i + 2];
        }

        R = R / count;
        G = G / count;
        B = B / count;

        console.log(`rgb(${R}, ${G},${B})`);
        return {
            R,
            G,
            B,
        };
    }
}

const getColorOfImage = (path) => {
    if (path.split('.').pop() === 'ico') {
        const promise = fs.promises.readFile(path);

        Promise.resolve(promise).then((buffer) => {
            icoToPng(buffer, 128).then((png) => {
                console.log(png.toString('base64'));
            });
        });
    } else {
        const img = p.resolve(process.cwd(), path);
    
        ColorThief.getColor(img)
            .then((color) => console.log(color))
            .catch((err) => console.error(err));
    }

};

module.exports = getColorOfImage;

