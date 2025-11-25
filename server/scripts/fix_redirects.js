const fs = require('fs');
const path = require('path');

const redirectsPath = path.join(__dirname, '../client/public/_redirects');
const content = '/*  /index.html  200\n';

fs.writeFileSync(redirectsPath, content, { encoding: 'utf8' });
console.log(`Fixed encoding for ${redirectsPath}`);
