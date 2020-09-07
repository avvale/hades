import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() 
{
    const skipFiles: string[] = ['core', 'shared'];

    // @hades directory
    const hadesPath = path.join(__dirname, '../..');

    fs.readdirSync(hadesPath).forEach(async file => {
        
        // get stats about the current file
        const hadesFilePath = path.join(hadesPath, file);

        // get stats about the current file
        const stats = fs.statSync(hadesFilePath);
        
        if (stats.isDirectory() && skipFiles.indexOf(file) === -1)
        {
            console.log(file);
        }
        
    });
}
bootstrap();