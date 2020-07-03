import { ApiProperty } from '@nestjs/swagger';

export class UpdatePermissionDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '747bfcad-c6a3-4118-893e-bfc04c8b5929'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : '4c99962e-9e84-4d89-bee0-08f27d46035b'
    })
    boundedContextId: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'xun0ysuz1trgub06a2p0txt5w04ddh56n5qwi8pmmpxnbo36rk3oyy4mslyeldh7m94ec393rxfm67qg566n0yaxj6hlila5p5850m5r7yi0jr7ti938781nyaz6nv9c00us12u0anpm9ck27epw6ud55t9h1acem0lvn2g9x1f4l7819f85cr71d1flsuuhln5r0m6or47tclb8zj58fzy2uby5vrltf0guh2m97w9rxih4nrb3xg4iev5lkf4'
    })
    name: string;
    
}
