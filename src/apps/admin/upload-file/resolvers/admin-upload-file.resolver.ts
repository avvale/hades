import * as fs from 'fs';
import * as path from 'path';
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

        const readableStream                = createReadStream()
        const fileTypeData                  = await fileType.fromStream(readableStream);
        const attachmentLibraryHashName     = Utils.randomString(40, 'a#') + '.' + fileTypeData.ext;
        const attachmentLibraryPathName     = Utils.basePath('public/storage', relativeStoragePath);
        const attachmentLibraryAbsolutePath = path.join(attachmentLibraryPathName, attachmentLibraryHashName);

        // user IIFE to invoke await function with promise for upload file
        await ((): Promise<void> => {
            return new Promise((resolve, reject) => {
                const writeableString = fs.createWriteStream(attachmentLibraryAbsolutePath);
                writeableString.on('finish', resolve)
                readableStream.pipe(writeableString);
            });
        })();

        //exifr.parse(file)

        const stats = fs.statSync(attachmentLibraryAbsolutePath);

        const attachmentLibraryTemp = {
            id: Utils.uuid,
            name: filename,
            pathname: attachmentLibraryPathName,
            filename: attachmentLibraryHashName,
            url: Utils.asset(this.environmentService.get('APP_URL'), 'public/storage', relativeStoragePath, attachmentLibraryHashName),
            mime: fileTypeData.mime,
            extension: fileTypeData.ext,
            size: stats.size,
           //width: GraphQLInt
           // height: GraphQLInt
           // data: { }
        };

        /* return {
            name: filename,
            filename: hashName,
            pathname: Utils.basePath('public/storage', relativeStoragePath),
            extension: fileTypeData.ext,
            url: Utils.asset(this.environmentService.get('APP_URL'), 'public/storage', relativeStoragePath, hashName),
            mime: fileTypeData.mime,
            size: stats.size
        }; */


    }
}