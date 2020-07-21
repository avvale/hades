import { ApiProperty } from '@nestjs/swagger';

export class UpdateLangDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : '8f39cacc-82eb-4dea-9e50-72045cd83cb2'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'name [input here api field description]',
            example     : 'z'
        })
        name: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'image [input here api field description]',
            example     : '2'
        })
        image: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'iso6392 [input here api field description]',
            example     : 'yr'
        })
        iso6392: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'iso6393 [input here api field description]',
            example     : 'zei'
        })
        iso6393: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'ietf [input here api field description]',
            example     : 'tn961'
        })
        ietf: string;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'sort [input here api field description]',
            example     : 562368
        })
        sort: number;
    
    
    
        @ApiProperty({
            type        : Boolean,
            description : 'isActive [input here api field description]',
            example     : false
        })
        isActive: boolean;
    
    
}
