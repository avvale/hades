import { ApiProperty } from '@nestjs/swagger';

export class RoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '08244bd8-bd19-48d2-afc8-22c18d1d571a'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '9a709050-aa31-4825-8316-e106c9d1f084'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'q79u01l0seivdg9d9fso9t85h57m4ywoalzcsj7pqiq4l9gzop'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'i81oikbox5o4ggv5bpf6fdcgs5ul8utdblp10n4yp276ur355bncsw5xarle8gn606g5jzfbwbjimqvhp42lw7gy1jskts11gxeu5nr2tjj7wtesc7oeefq9sf1heeu6pmkfwtcvizjuvso1nhcs3wzbo14cpguis6natn8n4v4a2kivtf1t0b4z1mxw6st8esajcuyzytk5pxssfa3crr3kn33lia26s5l9433q38cawnoznqz604e1tkpex8r'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-10-21 01:28:36'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-10-21 07:06:15'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-10-21 08:47:15'
    })
    deletedAt: string;
    
    
}
