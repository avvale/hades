import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { createWriteStream } from 'fs';
import { Upload } from 'src/graphql';

@Resolver()
export class CoreUploadFilesResolver
{
    constructor() {}

    @Mutation('coreUploadFiles')
    async main(@Args('files') files: Upload[])
    {
        for (const file of files)
        {
            const { filename, createReadStream } = await file;
            createReadStream().pipe(createWriteStream(`./uploads/${filename}`))
        }
        return true;
    }
}