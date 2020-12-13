import * as fs from 'fs';
import * as path from 'path';
import * as fileType from 'file-type';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Upload } from 'src/graphql';
import { Utils } from '@hades/shared/domain/lib/utils';

@Resolver()
export class CoreUploadFileResolver
{
    constructor() {}

    @Mutation('coreUploadFile')
    async main(@Args('path') relativeStoragePath: string, @Args('file') file: Upload)
    {
        if (!fs.existsSync(Utils.basePath('public/storage', relativeStoragePath))) fs.mkdirSync(Utils.basePath('public/storage', relativeStoragePath), {recursive: true});

        const { filename, createReadStream } = await file;

        const readableStream    = createReadStream()
        const fileTypeData      = await fileType.fromStream(readableStream);
        const hashName          = Utils.randomString(40, 'a#') + '.' + fileTypeData.ext;
        const absolutePath      = Utils.basePath('public/storage', relativeStoragePath, hashName);
        const size              = 0; // TODO encontrar forma de conocer tamaño total
        
        readableStream.pipe(fs.createWriteStream(absolutePath));

        return {
            name: filename,
            filename: hashName,
            pathname: Utils.basePath('public/storage', relativeStoragePath),
            extension: fileTypeData.ext,
            url: '',
            mime: fileTypeData.mime,
            size: size,
            sort: ''
        };
    }
}