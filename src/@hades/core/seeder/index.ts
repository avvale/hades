import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() 
{
    const skipFiles: string[] = ['core', 'shared'];

    // @hades directory
    const hadesPath = path.join(__dirname, '../..');

    // read bounded context
    fs.readdirSync(hadesPath).forEach(async file => {
        
        // get stats about the current file
        const hadesBoundedContextPath = path.join(hadesPath, file);

        // get stats about the current file
        const stats = fs.statSync(hadesBoundedContextPath);
        
        if (stats.isDirectory() && skipFiles.indexOf(file) === -1)
        {
            // read modules
            fs.readdirSync(hadesBoundedContextPath).forEach(async file => {
                
                // get stats about the current file
                const hadesModulePath = path.join(hadesBoundedContextPath, file);
                
                console.log(hadesModulePath);
                
            });   
        }
    });
}
bootstrap();