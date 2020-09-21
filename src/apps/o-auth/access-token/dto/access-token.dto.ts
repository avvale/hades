import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'aca2f62d-123c-4830-a6b8-828c4d95b661'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'clientId [input here api field description]',
        example     : 'b2cd938f-6b5a-401e-97cb-e78355e4b54c'
    })
    clientId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'token [input here api field description]',
        example     : 'Fuga cum assumenda ut praesentium. Quo aut officiis rerum dicta libero quibusdam nisi recusandae. Tenetur reiciendis eum. Ea suscipit autem esse.'
    })
    token: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'hynqbzbe9w36woe3lb20r13cpie9s880vvu98i2fupgutuceoq2vzp2ulz27ivr5aatsemxxaeeysbubow8tdurvk5mbwfm9dwf5w060m7pka4pfw9cyckzlhi921aycp8zdv4antaaz1kjn8mn3ay3ut37tv9bvukms416mby84uh5jp35twbu839vknnvh97x83ury4vnpcflvpraa93swubfxb5aeq3ap747hd89bx9kz2nkf2pjisdxc3wk'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isRevoked [input here api field description]',
        example     : false
    })
    isRevoked: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'expiresAt [input here api field description]',
        example     : '2020-09-21 04:21:08'
    })
    expiresAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-09-21 10:59:58'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-09-21 04:06:35'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-09-20 16:08:19'
    })
    deletedAt: string;
    
    
}
