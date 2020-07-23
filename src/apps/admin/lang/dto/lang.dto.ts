import { ApiProperty } from '@nestjs/swagger';

export class LangDto 
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
        example     : 'v'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'image [input here api field description]',
        example     : 'c'
    })
    image: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iso6392 [input here api field description]',
        example     : 'b7'
    })
    iso6392: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iso6393 [input here api field description]',
        example     : 'c8n'
    })
    iso6393: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'ietf [input here api field description]',
        example     : 'en4wp'
    })
    ietf: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 177310
    })
    sort: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : true
    })
    isActive: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-22 01:10:19'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-22 14:12:39'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-22 04:14:59'
    })
    deletedAt: string;
    
    
}
