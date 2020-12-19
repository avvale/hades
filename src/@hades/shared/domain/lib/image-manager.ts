import exifr from 'exifr';
var imagickal = require('imagickal');

export class ImageManager
{
   public static async dimensions(path: string): Promise<string>
   {
        return await imagickal.dimensions(path);
   }

   public static async exif(path: string): Promise<any>
   {
       return await exifr.parse(path);
   }
}