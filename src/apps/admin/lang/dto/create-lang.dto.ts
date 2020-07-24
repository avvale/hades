import { ApiProperty } from '@nestjs/swagger';

export class CreateLangDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '7935d89d-bc14-46e8-9e30-8ba56a34ba52'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'p'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'image [input here api field description]',
        example     : '9'
    })
    image: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iso6392 [input here api field description]',
        example     : 'u6'
    })
    iso6392: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iso6393 [input here api field description]',
        example     : 'n79'
    })
    iso6393: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'ietf [input here api field description]',
        example     : '1t84u'
    })
    ietf: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 143363
    })
    sort: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : true
    })
    isActive: boolean;
    
    
}
