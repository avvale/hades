import { ApiProperty } from '@nestjs/swagger';

export class BoundedContextDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '5e7aebd1-399f-4e01-9ae5-8bd13747a60d'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '2a5pquj6mj4j2ragfna0ival0hewahcixzml9ya6e4fntcqvedb478tfo8qmgen5zlsf7k8j1cim3chs1cy648r474uq8v7lx86yvo5km7xyyykcuyvguv1ekrfn7qes9y9vgiks4o0eq4rdhgros34j1khbiga9w1w8wd8zrr8fl7dfw8s2n6niynv03pno7ns2998mbrf36gqblr3lqkxabha3t2po1subu7jxgyo1d7kw98qdd7cdfxmfsv6'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : '0aomujjevfk9kp01j8j2'
    })
    root: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 243347
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
        example     : '2020-07-20 03:43:51'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-20 10:06:15'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-20 08:53:31'
    })
    deletedAt: string;
    
    
}
