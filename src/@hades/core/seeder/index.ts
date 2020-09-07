import * as fs from 'fs';
import * as path from 'path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';

// import { CreateLangsCommand } from '@hades/admin/lang/application/create/create-langs.command';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';

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
                
                // read seeds
                /* fs.readdirSync(hadesBoundedContextPath).forEach(async file => {
                }); */
                
            });   
        }
    });

    NestFactory.createApplicationContext(AppModule).then(appContext => {
        const commandBus = appContext.get(ICommandBus);

    });

}
bootstrap();