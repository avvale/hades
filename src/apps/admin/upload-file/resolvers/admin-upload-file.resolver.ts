import * as fs from 'fs';
import * as path from 'path';
import * as fileType from 'file-type';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { EnvironmentService } from '@hades/shared/domain/services/environment.service';
import { Utils } from '@hades/shared/domain/lib/utils';
import { Upload } from 'src/graphql';
import { ImageManager } from '@hades/shared/domain/lib/image-manager';

@Resolver()
export class AdminUploadFileResolver
{
    constructor(
        private environmentService: EnvironmentService
    ) {}

    @Mutation('adminUploadFile')
    async main(@Args('path') relativeStoragePath: string, @Args('langId') langId: string, @Args('file') file: Upload)
    {
        if (!fs.existsSync(Utils.basePath('public/storage', relativeStoragePath))) fs.mkdirSync(Utils.basePath('public/storage', relativeStoragePath), {recursive: true});

        const { filename, createReadStream }    = await file;

        const readableStream                    = await fileType.stream(createReadStream());
        const extension                         = readableStream.fileType.ext;
        const mime                              = readableStream.fileType.mime;
        const pathName                          = Utils.basePath('public/storage', relativeStoragePath);
        const attachmentLibraryId               = Utils.uuid();
        const attachmentLibraryHashName         = Utils.randomString(40, 'a#') + '.' + extension;
        const attachmentHashName                = Utils.randomString(40, 'a#') + '.' + extension;
        const attachmentLibraryAbsolutePath     = path.join(pathName, attachmentLibraryHashName);
        let dimensions                          = null;
        let exif                                = null;

        // user IIFE to invoke await function with promise for upload file
        await ((): Promise<void> => new Promise(resolve => readableStream.pipe(fs.createWriteStream(attachmentLibraryAbsolutePath)).on('finish', resolve)))();

        // read stats of file after uploaded
        const attachmentLibraryStats = fs.statSync(attachmentLibraryAbsolutePath);

        // get image properties
        if (ImageManager.isImageMime(mime))
        {
            dimensions    = await ImageManager.dimensions(attachmentLibraryAbsolutePath);
            exif          = await ImageManager.exif(attachmentLibraryAbsolutePath);
        }

        const attachmentLibrary = {
            id: attachmentLibraryId,
            name: filename,
            pathname: pathName,
            filename: attachmentLibraryHashName,
            url: Utils.asset(this.environmentService.get('APP_URL'), 'storage', relativeStoragePath, attachmentLibraryHashName),
            mime: mime,
            extension: extension,
            size: attachmentLibraryStats.size,
            width: dimensions?.width,
            height: dimensions?.height,
            data: {exif},
        };

        // copy attachment file from attachment library
        fs.copyFileSync(attachmentLibraryAbsolutePath, path.join(pathName, attachmentHashName));

        const attachment = {
            id: Utils.uuid(),
            commonId: Utils.uuid(),
            langId: langId,
            attachableModel: '',
            attachableId: '',
            familyId: null,
            sort: null,
            alt: null,
            title: null,
            description: null,
            excerpt: null,
            name: filename,
            pathname: pathName,
            filename: attachmentHashName,
            url: Utils.asset(this.environmentService.get('APP_URL'), 'storage', relativeStoragePath, attachmentHashName),
            mime: mime,
            extension: extension,
            size: attachmentLibraryStats.size,
            width: dimensions?.width,
            height: dimensions?.height,
            libraryId: attachmentLibraryId,
            libraryFilename: attachmentLibraryHashName,
            data: {exif}
        };

        return {
            attachmentLibrary,
            attachment
        };
    }
}