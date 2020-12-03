import { ApiProperty } from '@nestjs/swagger';

export class CreatePartnerDto
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
        type        : Object,
        description : 'socialNetworks [input here api field description]',
    })
    socialNetworks: any;

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
        description : 'email [input here api field description]',
    })
    email: string;

    @ApiProperty({
        type        : String,
        description : 'phone [input here api field description]',
    })
    phone: string;

    @ApiProperty({
        type        : String,
        description : 'fax [input here api field description]',
    })
    fax: string;

    @ApiProperty({
        type        : String,
        description : 'countryCommonId [input here api field description]',
    })
    countryCommonId: string;

    @ApiProperty({
        type        : String,
        description : 'administrativeAreaLevel1Id [input here api field description]',
    })
    administrativeAreaLevel1Id: string;

    @ApiProperty({
        type        : String,
        description : 'administrativeAreaLevel2Id [input here api field description]',
    })
    administrativeAreaLevel2Id: string;

    @ApiProperty({
        type        : String,
        description : 'administrativeAreaLevel3Id [input here api field description]',
    })
    administrativeAreaLevel3Id: string;

    @ApiProperty({
        type        : String,
        description : 'zip [input here api field description]',
    })
    zip: string;

    @ApiProperty({
        type        : String,
        description : 'locality [input here api field description]',
    })
    locality: string;

    @ApiProperty({
        type        : String,
        description : 'address [input here api field description]',
    })
    address: string;

    @ApiProperty({
        type        : Number,
        description : 'latitude [input here api field description]',
    })
    latitude: number;

    @ApiProperty({
        type        : Number,
        description : 'longitude [input here api field description]',
    })
    longitude: number;

}