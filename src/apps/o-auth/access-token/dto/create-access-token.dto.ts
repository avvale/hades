import { ApiProperty } from '@nestjs/swagger';

export class CreateAccessTokenDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'fccc7357-a0b1-4e74-8890-825947f99c5d'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'clientId [input here api field description]',
        example     : '4e0fe39a-79bc-4ee9-a008-2120c9c4d2d1'
    })
    clientId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'token [input here api field description]',
        example     : 'Enim autem suscipit nobis voluptatum officiis. Facere at autem temporibus voluptas delectus ab quis sit officia. Architecto vitae iusto suscipit rerum voluptatem tempora aliquid. Consequatur doloremque nemo. Expedita natus voluptatem sit ut temporibus voluptate ut aliquid.'
    })
    token: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'lcgart95n2m06o48miv1zvl1l3ahy64j5zpyzz1f7ijrg2ynmpjhmsd54hpijes9znoob0iatfxc1ewmca9qvfnafz5ky8zftkq2kjs92ann66c96iaehxonguz8xcfdp2uk1vexly3u5krda6z6ulb25lj6gm3g5nygz3pcld8c09veqtzmuuwogv2s6ed4cqk2vtidx4omsm6vmsszrf7nl12bp406gp5n4f0tz9jcetk9j45php3f964yeiu'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isRevoked [input here api field description]',
        example     : false
    })
    isRevoked: boolean;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiresAt [input here api field description]',
        example     : 3576283803
    })
    expiresAt: number;
    
    
}
