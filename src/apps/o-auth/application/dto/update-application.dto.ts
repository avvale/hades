import { ApiProperty } from '@nestjs/swagger';

export class UpdateApplicationDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '09ec177d-3de6-47fb-998b-2b9e097d2cc5'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'xx7k010wdh1tjrqzzmbwme2ycou52r6w6mke8v1041tnrsimgrnbxmdrwiw8genqg171v4fdceebu50wtmnb7qaq4e0oowjkknaoh9n3ykxpf1mn95bfwy050l7vhet20a7nmgnapxmbnyt4wt08012oabez89sbsm34ifz2hng19mm19rt6xm5u2rl7syhtllgv5vnqesz8hoe8aho9gutc5tneace5coft4z39as2tf5ea13ouxr3zlxkx2ah'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'code [input here api field description]',
        example     : 'cerftpm7x8qxct4u7h161jv5wle5w5ezqw905z8bwztcipk3jl'
    })
    code: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : '9cls73ucapm5h80g4taz8fv9wutbeyr9kaea9m3x9wav32fqpp1qy2hppvxm5q85uek0wn738icrg20awa4mo2t6wt'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : true
    })
    isMaster: boolean;
    
    
    
    @ApiProperty({
        type        : [String],
        description : 'clientIds [input here api field description]',
        example     : '',
    })
    clientIds: string[];
    
    
}
