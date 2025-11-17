


//leer del file system
const { writeFileSync, mkdirSync } = require('fs');

//Leer las variables de entorno, intslar npm i -D dotenv
require('dotenv').config();

const targePath = './src/environments/environment.ts';
const targePathDev = './src/environments/environment.development.ts';

const mapboxkey = process.env['MAPBOX_KEY'];

if (!mapboxkey) {
  throw new Error('MAPBOX_KEY is not set');
}


const envFileContent = `
export const environment = {
  mapboxkey: "${mapboxkey}"
};
`;

mkdirSync('./src/environments', { recursive: true });

writeFileSync(targePath, envFileContent);
writeFileSync(targePathDev, envFileContent);
