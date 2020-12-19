import { ApiProperty } from '@nestjs/swagger';

export class CreateAttachmentDto
{
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type        : String,
        description : 'commonId [input here api field description]',
    })
    commonId: string;

    @ApiProperty({
        type        : String,
        description : 'langId [input here api field description]',
    })
    langId: string;

    @ApiProperty({
        type        : String,
        description : 'attachableModel [input here api field description]',
    })
    attachableModel: string;

    @ApiProperty({
        type        : String,
        description : 'attachableId [input here api field description]',
    })
    attachableId: string;

    @ApiProperty({
        type        : String,
        description : 'familyId [input here api field description]',
    })
    familyId: string;

    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
    })
    sort: number;

    @ApiProperty({
        type        : String,
        description : 'alt [input here api field description]',
    })
    alt: string;

    @ApiProperty({
        type        : String,
        description : 'title [input here api field description]',
    })
    title: string;

    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
    })
    description: string;

    @ApiProperty({
        type        : String,
        description : 'excerpt [input here api field description]',
    })
    excerpt: string;

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
        type        : String,
        description : 'libraryId [input here api field description]',
    })
    libraryId: string;

    @ApiProperty({
        type        : String,
        description : 'libraryFilename [input here api field description]',
    })
    libraryFilename: string;

    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
    })
    data: any;

}