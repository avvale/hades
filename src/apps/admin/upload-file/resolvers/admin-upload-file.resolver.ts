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
    async main(@Args('path') relativeStoragePath: string, @Args('file') file: Upload)
    {
        if (!fs.existsSync(Utils.basePath('public/storage', relativeStoragePath))) fs.mkdirSync(Utils.basePath('public/storage', relativeStoragePath), {recursive: true});

        const { filename, createReadStream } = await file;

        const readableStream                = createReadStream()
        const fileTypeData                  = await fileType.fromStream(readableStream);
        const pathName                      = Utils.basePath('public/storage', relativeStoragePath);
        const attachmentLibraryId           = Utils.uuid();
        const attachmentLibraryHashName     = Utils.randomString(40, 'a#') + '.' + fileTypeData.ext;
        const attachmentHashName            = Utils.randomString(40, 'a#') + '.' + fileTypeData.ext;
        const attachmentLibraryAbsolutePath = path.join(pathName, attachmentLibraryHashName);
        const attachmentLibraryStats        = fs.statSync(attachmentLibraryAbsolutePath);
        let dimensions                      = null;
        let exif                            = null;

        // user IIFE to invoke await function with promise for upload file
        await ((): Promise<void> => {
            return new Promise((resolve, reject) => {
                const writeableString = fs.createWriteStream(attachmentLibraryAbsolutePath);
                writeableString.on('finish', resolve)
                readableStream.pipe(writeableString);
            });
        })();

        // get image properties
        if (ImageManager.isImageMime(fileTypeData.mime))
        {
            dimensions    = await ImageManager.dimensions(attachmentLibraryAbsolutePath);
            exif          = await ImageManager.exif(attachmentLibraryAbsolutePath);
            console.log(dimensions);
            console.log(exif);
        }

        const tempAttachmentLibrary = {
            id: attachmentLibraryId,
            name: filename,
            pathname: pathName,
            filename: attachmentLibraryHashName,
            url: Utils.asset(this.environmentService.get('APP_URL'), 'public/storage', relativeStoragePath, attachmentLibraryHashName),
            mime: fileTypeData.mime,
            extension: fileTypeData.ext,
            size: attachmentLibraryStats.size,
            width: null,
            height: null,
            data: null,
        };

        const tempAttachment = {
            id: Utils.uuid,
            commonId: Utils.uuid,
            langId: '',
            attachableModel: '',
            attachableId: '',
            familyId: '',
            sort: '',
            alt: '',
            title: '',
            description: '',
            excerpt: '',
            name: filename,
            pathname: pathName,
            filename: attachmentHashName,
            url: Utils.asset(this.environmentService.get('APP_URL'), 'public/storage', relativeStoragePath, attachmentHashName),
            mime: fileTypeData.mime,
            extension: fileTypeData.ext,
            size: attachmentLibraryStats.size,
            width: null,
            height: null,
            libraryId: attachmentLibraryId,
            libraryFilename: attachmentLibraryHashName,
            data: {}
        };

        

       /*  const attachmentLibraryTemp = {
            id: Utils.uuid,
            name: filename,
            pathname: pathName,
            filename: attachmentLibraryHashName,
            url: Utils.asset(this.environmentService.get('APP_URL'), 'public/storage', relativeStoragePath, attachmentLibraryHashName),
            mime: fileTypeData.mime,
            extension: fileTypeData.ext,
            size: attachmentLibraryStats.size,
           //width: GraphQLInt
           // height: GraphQLInt
           // data: { }
        }; */

        return {
            tempAttachmentLibrary,
            tempAttachment
        };
    }
}