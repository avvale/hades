import { ApiProperty } from '@nestjs/swagger';

export class RoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'eefb8178-ba66-429a-a32a-c30a1c1fea44'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '83bc9cd1-f4f5-471b-ad36-614e22528735'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'bxut7penw87k18i5k3xq9h9k6dn6zfh2k2rsqpsoi0h1cfdnsa'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '92wb3jb9pidf536ptu7n9elft45yk5fqkeyrh7rb39mc0pi0jxx8786l6ltvrn7336gmvotk9zso5fjzqr3d0zank7sz4mcw8nnrhckzwt95xhja6x645g1ju6rcwwgvxbo5bs8yho9uweixp0rccn9bnb177a54214td20rb4f56uk5914uvijsfvbchtareiopelz48ffr1prfvgrjigkvs1jdcdhpw5it0d2mthxzzjviy0feelebrksti8w'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-27 16:38:09'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-26 23:41:11'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-26 18:08:06'
    })
    deletedAt: string;
    
    
}
