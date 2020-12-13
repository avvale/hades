import * as fs from 'fs';
import * as path from 'path';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Upload } from 'src/graphql';

@Resolver()
export class CoreUploadFilesResolver
{
    constructor() {}

    @Mutation('coreUploadFiles')
    async main(@Args('path') relativeStoragePath: string, @Args('files') files: Upload[])
    {
        if (!fs.existsSync(path.join(process.cwd(), 'public/storage', relativeStoragePath))) fs.mkdirSync(path.join(process.cwd(), 'public/storage', relativeStoragePath), {recursive: true});

        for (const file of files)
        {
            const { filename, createReadStream } = await file;
            createReadStream().pipe(fs.createWriteStream(`./public/storage/${relativeStoragePath}/${filename}`))
        }
        return true;
    }
}