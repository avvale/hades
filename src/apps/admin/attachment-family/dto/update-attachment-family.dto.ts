import { ApiProperty } from '@nestjs/swagger';

export class UpdateAttachmentFamilyDto
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
        enum        : ['CROP','WIDTH','HEIGHT','WIDTH_FREE','HEIGHT_FREE'],
        description : 'fit [input here api field description]',
    })
    fit: string;

    @ApiProperty({
        type        : Object,
        description : 'sizes [input here api field description]',
    })
    sizes: any;

    @ApiProperty({
        type        : Number,
        description : 'quality [input here api field description]',
    })
    quality: number;

    @ApiProperty({
        type        : String,
        description : 'format [input here api field description]',
    })
    format: string;

}