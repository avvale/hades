import { ApiProperty } from '@nestjs/swagger';

export class UpdateBoundedContextDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '357f268f-c497-4fc1-b1d1-4f6dfc8e4079'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'fbba20pawqrmjwuhoyje4grbel1nej0a3235s2s5vqhamhn8mn2m01wcsythmci2b17vfqeop4byk3ed5zpbmopknwx286onzzmegadr0dg558wwdfmobdu5r3414fjj8tsanvkfzajsdulop7bo4j6kviu76ydisf8le9d9ty6qkjmlxsc0dscnzw8fbtdsgvbejmmt4vulu4wuejdo8fei55od09fismkybinydtmr9sve60ro45m21rwfvx8'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : '2t8irbqzo9zshq05j1rd'
    })
    root: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 808224
    })
    sort: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : true
    })
    isActive: boolean;
    
    
}
