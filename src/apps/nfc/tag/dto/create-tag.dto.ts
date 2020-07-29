import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '20da9779-7e32-474a-bb18-e80dc5561456'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'code [input here api field description]',
        example     : 3269781693
    })
    code: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '8252d797-ad18-4335-b200-078de890abe9'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'v7o9mxqlqy56no0wyfrsv6d1qgi6p3yu9zor6a3pqikras3ngn'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'urlBase [input here api field description]',
        example     : '4iqjptig2q45emt3fyyvro66lq2kwiyyo65mrsqh2ian3vr9ryttjddm27k5q483u6tx50n6t845sn5a8xditlrs7kja6c76wcxfojvz1glm2g34uxmqwp6z49f9gvd1824dql189gqf6btkzqrcyrdo9ggancv6pu03b5vpvybon71kjuyjn63ms7uwisoeq46cfq424k6knlatgmex0io2w5zx76ikzierkh07spw4drtvh85xayzinzyo2sj'
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
        example     : 145283
    })
    offset: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isSessionRequired [input here api field description]',
        example     : false
    })
    isSessionRequired: boolean;
    
    
}
