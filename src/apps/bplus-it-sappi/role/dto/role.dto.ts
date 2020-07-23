import { ApiProperty } from '@nestjs/swagger';

export class RoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'fcd0786f-2071-4bbb-9ced-eb4238e3d895'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'f1956da6-5a04-4877-8a26-0b40ceac824b'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'uelnc1a2boejl47oe7ormw80a4w6ko0wqsas0p2s92cl6vu9a6'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '4a43gy365qq8repfquzzxo32be9ix4923chqbfmgi2b0038q6k5apqipchlxssh4ecccxqzxqw8qp5x7qd6fv5bewdf5fhxveio43x9d9cwz7agzm43wodujr3fs084rni4mbjph66dfdvcdgm04ljkzevmb7vlg8tiqp24vni6tyju6uitn19357bryyfwo69cc0bssvls6gw96ff17z0sp4rdq19ft97qxh6seljxpw6cp82hg3cxooxviz2d'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-23 12:23:11'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-23 16:46:29'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-23 06:15:09'
    })
    deletedAt: string;
    
    
}
