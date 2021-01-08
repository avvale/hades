import { ApiProperty } from '@nestjs/swagger';

export class CreateAttachmentLibraryDto
{
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
    })
    name: string;

    @ApiProperty({
        type        : String,
        description : 'pathname [input here api field description]',
    })
    pathname: string;

    @ApiProperty({
        type        : String,
        description : 'filename [input here api field description]',
    })
    filename: string;

    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
    })
    url: string;

    @ApiProperty({
        type        : String,
        description : 'mime [input here api field description]',
    })
    mime: string;

    @ApiProperty({
        type        : String,
        description : 'extension [input here api field description]',
    })
    extension: string;

    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
    })
    size: number;

    @ApiProperty({
        type        : Number,
        description : 'width [input here api field description]',
    })
    width: number;

    @ApiProperty({
        type        : Number,
        description : 'height [input here api field description]',
    })
    height: number;

    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
    })
    data: any;

}