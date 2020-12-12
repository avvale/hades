import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { createWriteStream } from 'fs';
import { Upload } from 'src/graphql';

@Resolver()
export class CoreUploadFileResolver
{
    constructor() {}

    @Mutation('coreUploadFile')
    async main(@Args('file') file: Upload)
    {
        const { filename, createReadStream } = await file;
        createReadStream().pipe(createWriteStream(`./uploads/${filename}`));

        return true;
    }
}