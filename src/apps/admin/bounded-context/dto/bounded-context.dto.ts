import { ApiProperty } from '@nestjs/swagger';

export class BoundedContextDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'e98b198c-a3bc-469c-be1c-451001d6adf2'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'sdvxwvdylr8f2ucpk7uvobo3y8eincnxjlswjmsod4mbv3gegu9s19bdnnaavm2zydb6ilpxbt36tb2ylldsuye08jv3gjqgnkwfecwxulntexmqxsqiu0luwb2y6lp95cfnjkct90o20j6itx7darqmbrhnj4i3io7erqh4ybeqg1wzwap4118wsj08s6y5f60fire78458kjf9id2a6qhk34umjddtfkzjck9ii1s6f1q1zxvmhf5dufa7ilt'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : 'qckospadx7hmw6b0mqep'
    })
    root: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 609748
    })
    sort: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : false
    })
    isActive: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-28 23:59:09'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 10:26:04'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-29 10:34:37'
    })
    deletedAt: string;
    
    
}
