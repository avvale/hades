import exifr from 'exifr';
var imagickal = require('imagickal');
import * as path from 'path';
import * as sharp from 'sharp';
import { AdminCreateAttachmentInput } from 'src/graphql';

export class ImageManager
{
   public static async dimensions(path: string): Promise<{width: number, height: number}>
   {
        return await imagickal.dimensions(path);
   }

   public static async exif(path: string): Promise<any>
   {
       return await exifr.parse(path);
   }

   public static isImageMime(mime: string): boolean
   {
        switch (mime)
        {
            case 'image/gif':
            case 'image/jpeg':
            case 'image/pjpeg':
            case 'image/png':
            case 'image/svg+xml':
                return true;
                break;
            default:
                return false;
        }
    }

    public static cropAttachment(attachment, attachmentFamily, crop)
    {
        const image = sharp(path.join(attachment.library.pathname, attachment.library.filename))

        // TODO IGUALAR TIPOS SERGÚN MIME
        // set image format from attachment family (jpg, png, gif, etc.)
        if (attachmentFamily.format.toLowerCase() !== attachment.extension)
        {
            image.jpeg({
                quality: attachmentFamily.quality
            });

            // change data from attachment object
            // attachment.extension = 'jpeg'
            // etc ...
        }

        // crop image
        image.extract({
            left: crop.x,
            top: crop.y,
            width: crop.width,
            height: crop.height
        })

        // TODO, VALIDAR ESTO
        // resize image
        if (attachmentFamily.width === null || attachmentFamily.height === null)
        {
            // resize al tamaño del attachment family
        }
        else
        {
            // resize al tamaño indicado en el 
        }

        // salvamos la imagen
        image.toFile('output.webp', (err, info) => {});

        // get new properties from image cropped
        // attachment.with = info.width

        return { 
            attachment: '',
            attachmentFamily: '',
            crop: 'crop'
        }
    }
}