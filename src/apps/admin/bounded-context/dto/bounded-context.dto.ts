import { ApiProperty } from '@nestjs/swagger';

export class BoundedContextDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '55dab76c-fcc8-4dbb-877f-503e2c7c0e8a'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'yn1plvmakvo55d32q94dp6ldqlyt4ndaqhnui0iswohc4hzbhvm2u3kpnhpom1iltyruhbzp2cql514dqog93j29egvjeyjbwayz0vmsb7tx3zekjib25m8g7lebvdl7249yu518z460rfy7wmg7cz2h7rx170swzgbdltrybbxkj2tim21ydiezw8s9c7s0jxb94h11nz4mmhg0fl4jil9hodppaiil5z5uz81g3xsfweh7a19y05vqrfzicsu'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : '9o69kxbzmcw8l8xlwg5f'
    })
    root: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 113218
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
        example     : '2020-07-18 20:40:02'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-19 03:03:15'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-18 23:17:25'
    })
    deletedAt: string;
    
    
}
