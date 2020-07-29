import { ApiProperty } from '@nestjs/swagger';

export class UpdatePermissionDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '627c5997-66bf-4e3d-80f6-7a26763a2ebf'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : '17b0817f-fbe8-41e3-a7d2-061e71833fb3'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'pziixgna63fash1uh1hc2brw56s7ohwxtqeoqqklgbu8e4i8q1q191zc2uac8zlsoxtnidiymwyrbtfyafzz1e3jvjv298fgen8ccm3p2d7h0fhkq3kmhouhxxtua43duxnsc9lhe2olsuaiieh2ya7yjyyfn9wn7cy8itci4xh5ya3yb9qqf3u6kuat09wex33ivualz088sxj91pcaq40jelp6ppbnwh1pwkkl1wdp7j1b9msnxrcahilgm0f'
    })
    name: string;
    
    
}
