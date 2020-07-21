import { ApiProperty } from '@nestjs/swagger';

export class TagDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'b14beb99-e0e8-4e6f-9505-a59263cd6eed'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'code [input here api field description]',
        example     : 7894005846
    })
    code: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '0d7ba885-0f6d-4149-8d2b-8e15081fa80c'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'xh7qwmqkhydd6ew7sgeu59xhz5t60yac2ljuqzn8dfjaow1qkj'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'urlBase [input here api field description]',
        example     : 'p1ybmzjt1thrl9i9rsjrcp27pvyo7klnb35rp65mudg6ci055od4oflcug26mk2w5e387ecmgezjf5bawjigcjeqn0poogjfr4bbxwumix70qn0m50nn12mo1vfrx41kyxgmkdccce1d2gcssguwnkt7oynduckjzjzqcgptqov8tjifdntm2clbhyk3zhy683p7wxecqsxpx3kdl87wdjgkwxstgnyz0gbgen5dwkwfg2pk9k0fm1hgqjub1sj'
    })
    urlBase: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'params [input here api field description]',
        example     : { "foo" : "bar" }
    })
    params: any;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'offset [input here api field description]',
        example     : 354912
    })
    offset: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isSessionRequired [input here api field description]',
        example     : false
    })
    isSessionRequired: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-21 19:02:30'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-21 02:26:04'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-21 01:40:53'
    })
    deletedAt: string;
    
    
}
