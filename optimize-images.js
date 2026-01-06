import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.join(__dirname, 'public', 'images');
const outputDir = inputDir; // Overwrite or save alongside

const MAX_WIDTH = 1920;

async function optimizeImages() {
    try {
        const files = fs.readdirSync(inputDir);

        for (const file of files) {
            if (file.match(/\.(jpg|jpeg|png)$/i)) {
                const inputPath = path.join(inputDir, file);
                const filenameWithoutExt = path.parse(file).name;
                const outputPath = path.join(outputDir, `${filenameWithoutExt}.webp`);

                console.log(`Optimizing ${file}...`);

                await sharp(inputPath)
                    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
                    .webp({ quality: 80 })
                    .toFile(outputPath);

                console.log(`Saved to ${outputPath}`);
            }
        }
        console.log('Image optimization complete!');
    } catch (error) {
        console.error('Error optimizing images:', error);
    }
}

optimizeImages();
