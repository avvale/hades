import { ApiProperty } from '@nestjs/swagger';

export class UpdateLangDto 
{
    @ApiProperty({
        type: String,
        description: 'Lang uuid',
        example: 'd0e0ef42-27f3-4f6d-801c-f7c5fbf2082e'
    })
    id: string;
    
    @ApiProperty({
        type: String,
        required: false,
        description: 'Name to identify lang',
        example: 'English'
    })
    name?: string;

    @ApiProperty({
        type: String,
        required: false,
        description: 'Representative image of the language',
        example: 'usa.svg'
    })
    image?: string;

    @ApiProperty({
        type: String,
        required: false,
        description: 'iso code 639-2',
        example: 'en'
    })
    iso6392?: string;

    @ApiProperty({
        type: String,
        required: false,
        description: 'iso code 639-3',
        example: 'eng'
    })
    iso6393?: string;

    @ApiProperty({
        required: false,
        description: 'IETF language tag',
        example: 'en-US'
    })
    ietf?: string;

    @ApiProperty({
        type: Boolean,
        required: false,
        description: 'Check if language is active',
        example: true
    })
    isActive?: boolean;

    @ApiProperty({
        type: Number,
        required: false,
        description: 'Sort of language',
        example: 10
    })
    sort?: number
}
