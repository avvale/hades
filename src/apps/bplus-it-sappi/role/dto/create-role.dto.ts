import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '2bd02d95-4282-4d95-ade0-c1d066a09c20'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'fd0274e6-6175-4522-9c3e-e055cab9f5f0'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'xrp3dlj6j8em2d6z7pihew9ponzco8s9ge9rmw0yg8ce1z4vpa'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'hhjgj1bvp344k8c1x26q6wz1p8t66muujnctfdbb70nfgqf1heldj0tjfd72emx75x51ndc1uj9iktltf3n2oqhl9ch4856k4vkq5g8qag6061c3ysoztsap40b9s7ltlrkpv48rl3ytkk1bk3toiz4sbi1ifaxpfjacax9uaibf58446x8d6nanjw3cg9vtw9eqvy8pij5egysskyvbkdcdrvngr6k593xjoiiz2t8x4n1f2c2l39ob0omy0cp'
    })
    name: string;
    
    
}
