import { ApiProperty } from '@nestjs/swagger';

export class CreateLangDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'c80cb940-c8dc-48c4-98c4-5757700aaa81'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'o'
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
        example     : '1f'
    })
    iso6392: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iso6393 [input here api field description]',
        example     : 'h5u'
    })
    iso6393: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'ietf [input here api field description]',
        example     : 'flfum'
    })
    ietf: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 640000
    })
    sort: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : false
    })
    isActive: boolean;
    
    
}
