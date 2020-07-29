import { ApiProperty } from '@nestjs/swagger';

export class PermissionDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'be6c6cac-18f1-4b99-981e-c928c6342868'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : '4eefa322-b9b9-4e1a-bd9b-f8d82ff1952d'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'edagt8vsprz1annwsylvyyms53kwultx2ju7a3oyu364q8y7qj666p7c4ekq5t1e5u0jvmp29d3prbsaql35rsjvx8r4w47ylcrbii1kpxgazvjiagcaaruavdgt417ma14ohn8xs7lclv37ckbb9g4huvujwyk4jv9pqy77l2mcfypxiy4nq9h4sh60269jpzuqmo0iiy8irjibp256zt0ldtju0c6je97vqiph5li0rx850jk1skbd0pkvlgp'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-29 10:26:02'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 16:25:14'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-28 20:10:16'
    })
    deletedAt: string;
    
    
}
