import exifr from 'exifr';
var imagickal = require('imagickal');

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
}