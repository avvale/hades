import { ApiProperty } from '@nestjs/swagger';

export class CreateLangDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : '5af64adc-1d7a-49ad-8fe4-6b3634a5cd08'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'name [input here api field description]',
            example     : 'h'
        })
        name: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'image [input here api field description]',
            example     : 'z'
        })
        image: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'iso6392 [input here api field description]',
            example     : '86'
        })
        iso6392: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'iso6393 [input here api field description]',
            example     : 'jp8'
        })
        iso6393: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'ietf [input here api field description]',
            example     : '5z22a'
        })
        ietf: string;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'sort [input here api field description]',
            example     : 286482
        })
        sort: number;
    
    
    
        @ApiProperty({
            type        : Boolean,
            description : 'isActive [input here api field description]',
            example     : true
        })
        isActive: boolean;
    
    
}
