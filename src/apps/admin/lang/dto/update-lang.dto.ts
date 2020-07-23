import { ApiProperty } from '@nestjs/swagger';

export class UpdateLangDto 
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
            example     : 'y'
        })
        name: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'image [input here api field description]',
            example     : 'q'
        })
        image: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'iso6392 [input here api field description]',
            example     : 'cx'
        })
        iso6392: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'iso6393 [input here api field description]',
            example     : '56p'
        })
        iso6393: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'ietf [input here api field description]',
            example     : 'pidf5'
        })
        ietf: string;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'sort [input here api field description]',
            example     : 325109
        })
        sort: number;
    
    
    
        @ApiProperty({
            type        : Boolean,
            description : 'isActive [input here api field description]',
            example     : false
        })
        isActive: boolean;
    
    
}
