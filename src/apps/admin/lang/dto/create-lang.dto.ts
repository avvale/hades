import { ApiProperty } from '@nestjs/swagger';

export class CreateLangDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'a021c553-0491-4ca7-b111-2335be61f140'
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
        example     : '7'
    })
    image: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iso6392 [input here api field description]',
        example     : 'ly'
    })
    iso6392: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iso6393 [input here api field description]',
        example     : '2ve'
    })
    iso6393: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'ietf [input here api field description]',
        example     : '9p88n'
    })
    ietf: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 420733
    })
    sort: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : true
    })
    isActive: boolean;
    
    
}
