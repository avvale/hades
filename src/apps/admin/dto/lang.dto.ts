import { ApiProperty } from "@nestjs/swagger";

export class LangDto 
{
    @ApiProperty({
        type: String,
        description: 'Lang uuid',
        example: '0aa94b45-9dc3-413e-bd65-f299bccd2f43'
    })
    id: string;
    
    @ApiProperty({
        type: String,
        description: 'Name to identify lang',
        example: 'English'
    })
    name: string;

    @ApiProperty({
        type: String,
        required: false,
        description: 'Representative image of the language',
        example: 'usa.svg'
    })
    image: string;

    @ApiProperty({
        type: String,
        description: 'iso code 639-2',
        example: 'en'
    })
    iso6392: string;

    @ApiProperty({
        type: String,
        description: 'iso code 639-3',
        example: 'eng'
    })
    iso6393: string;

    @ApiProperty({
        description: 'IETF language tag',
        example: 'en-US'
    })
    ietf: string;

    @ApiProperty({
        type: Boolean,
        description: 'Check if language is active',
        example: true
    })
    isActive: boolean;

    @ApiProperty({
        type: Number,
        description: 'Sort of language',
        example: 10
    })
    sort: number;

    @ApiProperty({
        required: false,
        description: 'Timestamp when this record was created',
        example: '2019-12-26 22:32:15'
    })
    createdAt: string;

    @ApiProperty({
        required: false,
        description: 'Timestamp when this record was updated',
        example: '2019-12-26 22:32:15'
    })
    updatedAt: string;
}
