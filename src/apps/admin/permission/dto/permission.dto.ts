import { ApiProperty } from '@nestjs/swagger';

export class PermissionDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'ef1363e9-19a6-4d9b-8197-64c4357f1038'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : '57bf6214-4089-48bc-a72b-a84cd60d6b71'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'tfuuvw697xvpah3ykslnio5gl7h8kjjyst7r2soo7mjew7q96x7jxymrwbhkbzl39pod9g1kidb9m3a5jikdagzjb3wzqpr6b0ibcm227wrrimf5ql924j5crcjp4pj603diumdom2a6mrtyocdtwb9yij9bxpxsjqryv7dknh3m3qf27k4uxatyqlq3q15n6tpinob36l3n8l08gb22danktvieune4u1te31gzu4o0mf12k2kqlf7jx8ebxco'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-19 16:06:13'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-18 22:54:55'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-19 04:06:59'
    })
    deletedAt: string;
    
    
}
