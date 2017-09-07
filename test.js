var fs = require('fs');

const getManifest = ()=>{
    console.log("get manifest start..!!!");
    return JSON.parse(fs.readFileSync('./manifest.json', 'utf8'));
};

const setManifest = ()=>{
    console.log("setmanifest start..!!");
    let tmp = JSON.stringify(getManifest());
    return fs.writeFileSync('./dist/manifest.json', tmp, 'utf8');
};

setManifest();
