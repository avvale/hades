import { ApiProperty } from '@nestjs/swagger';
import { ResourceDto } from './../../../admin/resource/dto/resource.dto';

export class AttachmentFamilyDto
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
        type        : [ResourceDto],
        description : 'resourceIds [input here api field description]',
    })
    resources: ResourceDto[];

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
        enum        : ['JPG','PNG','GIF','TIF','BMP','DATA_URL'],
        description : 'format [input here api field description]',
    })
    format: string;

    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
    })
    createdAt: string;

    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
    })
    updatedAt: string;

    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
    })
    deletedAt: string;

}