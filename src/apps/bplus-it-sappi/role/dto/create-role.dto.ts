import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'd247bdf1-4cb9-4e35-be80-5a4bb5acbe62'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '28186aed-f2d9-4ca6-870c-36d994e0fd6e'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '4fdb24x5hixdxxy84nxmn4onjzc59vgl8f0nbbx982a7ex8evx43g1b8zj9tzawi9jl62r1r7rpvgqcutmnxk7uuffxut9gyzero2qdtvurmtxpb57u2ddb41j40145mord96ikrxu2pj687yakg25o7q4h85bo6l2qofeuzje5ipoyhjq86cmqjl47m8umainfxtyhh5ulb0serf6ogq284nzd24p6vstlyxkjahkrs85ql0mbzy1ea9nr5pzv'
    })
    name: string;
    
}
