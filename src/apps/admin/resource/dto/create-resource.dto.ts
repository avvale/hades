import { ApiProperty } from '@nestjs/swagger';

export class CreateResourceDto
{
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
    })
    boundedContextId: string;

    @ApiProperty({
        type        : [String],
        description : 'attachmentFamilyIds [input here api field description]',
    })
    attachmentFamilyIds: string[];

    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
    })
    name: string;

    @ApiProperty({
        type        : Boolean,
        description : 'hasCustomFields [input here api field description]',
    })
    hasCustomFields: boolean;

    @ApiProperty({
        type        : Boolean,
        description : 'hasAttachments [input here api field description]',
    })
    hasAttachments: boolean;

}