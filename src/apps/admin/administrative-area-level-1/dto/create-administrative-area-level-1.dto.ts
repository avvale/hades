import { ApiProperty } from '@nestjs/swagger';

export class CreateAdministrativeAreaLevel1Dto
{
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type        : String,
        description : 'countryId [input here api field description]',
    })
    countryId: string;

    @ApiProperty({
        type        : String,
        description : 'code [input here api field description]',
    })
    code: string;

    @ApiProperty({
        type        : String,
        description : 'customCode [input here api field description]',
    })
    customCode: string;

    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
    })
    name: string;

    @ApiProperty({
        type        : String,
        description : 'slug [input here api field description]',
    })
    slug: string;

}