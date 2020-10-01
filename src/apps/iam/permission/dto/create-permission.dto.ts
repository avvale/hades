import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '7b405718-cd71-43f1-8611-2ae0120c241a'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'umib044cdidp4r5unyc3tjp2qopl1q2psp9qttm7jpv6z6fg92d4lluc37ny8sve7d37g5b9zdvrnsp8hoflv6bz3scdpmbpimuuj3pf8tas53word9d50pmp4kpz3yscok0xy5co9u1ak5pgi9l216mjpp5e24qv5ae9scst1pcrgdp661zugzchzxtgel464i0ie5zin3o28m7ahug6ps6w044dqvm8aidfdj8b4eyehtqz4oz22u3q98xb6p'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : 'c0b489a6-e83b-4664-b5b8-845049630726'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : [String],
        description : 'roleIds [input here api field description]',
        example     : '',
    })
    roleIds: string[];
    
    
}
