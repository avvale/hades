import { ApiProperty } from '@nestjs/swagger';

export class CreateResourceDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'a06e9d16-bddb-4f2c-b9bd-4dab319949a8'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : '6418ef3e-8d2a-4555-a5a0-e1e611036456'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'zyyexee64kabqs25gugk5hmhj2o3x375s4b5995ljb8tka9eghl5cft4razyo0dmo9hadbq2yjbyqu0z1lcybuf1wt85ef6fzmpm7of5goppa6nt3ya45e9qbx88ve8mucj00a9kclqm2sw1dm80troj3f6vdbotmyruirhusdg93tqyu8log6g7058sqw3fanme3xixcuwlmag3hrn3vibfavvbb8a1m2eatnkq8hgvc5gi0yy9tvz5g3vhq4p'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasCustomFields [input here api field description]',
        example     : false
    })
    hasCustomFields: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasAttachments [input here api field description]',
        example     : false
    })
    hasAttachments: boolean;
    
    
}
