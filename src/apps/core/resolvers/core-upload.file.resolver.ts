import * as fs from 'fs';
import * as fileType from 'file-type';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { EnvironmentService } from '@hades/shared/domain/services/environment.service';
import { Utils } from '@hades/shared/domain/lib/utils';
import { Upload } from 'src/graphql';
@Resolver()
export class CoreUploadFileResolver
{
    constructor(
        private environmentService: EnvironmentService
    ) {}

    @Mutation('coreUploadFile')
    async main(@Args('path') relativeStoragePath: string, @Args('file') file: Upload)
    {
        if (!fs.existsSync(Utils.basePath('public/storage', relativeStoragePath))) fs.mkdirSync(Utils.basePath('public/storage', relativeStoragePath), {recursive: true});

        const { filename, createReadStream } = await file;

        const readableStream    = createReadStream()
        const fileTypeData      = await fileType.fromStream(readableStream);
        const hashName          = Utils.randomString(40, 'a#') + '.' + fileTypeData.ext;
        const absolutePath      = Utils.basePath('public/storage', relativeStoragePath, hashName);

        // user IIFE to invoke await function with promise for upload file
        await ((): Promise<void> => {
            return new Promise((resolve, reject) => {
                const writeableString = fs.createWriteStream(absolutePath);
                writeableString.on('finish', resolve)
                readableStream.pipe(writeableString);
            });
        })();

        const stats = fs.statSync(absolutePath);

        return {
            name: filename,
            filename: hashName,
            pathname: Utils.basePath('public/storage', relativeStoragePath),
            extension: fileTypeData.ext,
            url: Utils.asset(this.environmentService.get('APP_URL'), 'public/storage', relativeStoragePath, hashName),
            mime: fileTypeData.mime,
            size: stats.size
        };
    }
}