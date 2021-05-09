import { ApiProperty } from '@nestjs/swagger';

export class CreateCountryDto
{
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type        : String,
        description : 'iso3166Alpha2 [input here api field description]',
    })
    iso3166Alpha2: string;

    @ApiProperty({
        type        : String,
        description : 'iso3166Alpha3 [input here api field description]',
    })
    iso3166Alpha3: string;

    @ApiProperty({
        type        : String,
        description : 'iso3166Numeric [input here api field description]',
    })
    iso3166Numeric: string;

    @ApiProperty({
        type        : String,
        description : 'customCode [input here api field description]',
    })
    customCode: string;

    @ApiProperty({
        type        : String,
        description : 'prefix [input here api field description]',
    })
    prefix: string;

    @ApiProperty({
        type        : String,
        description : 'image [input here api field description]',
    })
    image: string;

    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
    })
    sort: number;

    @ApiProperty({
        type        : Object,
        description : 'administrativeAreas [input here api field description]',
    })
    administrativeAreas: any;

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

    @ApiProperty({
        type        : Number,
        description : 'zoom [input here api field description]',
    })
    zoom: number;

    @ApiProperty({
        type        : Object,
        description : 'dataLang [input here api field description]',
    })
    dataLang: any;

}