import { ApiProperty } from '@nestjs/swagger';

export class CreateLangDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : 'a59feed3-8ea3-4d4a-bcca-33a36ce86807'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'name [input here api field description]',
            example     : 'r'
        })
        name: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'image [input here api field description]',
            example     : 'i'
        })
        image: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'iso6392 [input here api field description]',
            example     : '3p'
        })
        iso6392: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'iso6393 [input here api field description]',
            example     : '60t'
        })
        iso6393: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'ietf [input here api field description]',
            example     : 'nvx8t'
        })
        ietf: string;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'sort [input here api field description]',
            example     : 235647
        })
        sort: number;
    
    
    
        @ApiProperty({
            type        : Boolean,
            description : 'isActive [input here api field description]',
            example     : true
        })
        isActive: boolean;
    
    
}
