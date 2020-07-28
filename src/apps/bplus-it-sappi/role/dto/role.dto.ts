import { ApiProperty } from '@nestjs/swagger';

export class RoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '3ed2f404-9a41-4f1a-8b67-f51430c2236f'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'c4410ba4-c699-4d90-9b4e-17390b35b42a'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'quu7bkj5oef69a20v3rp1snddjr8tjaifxawpd195r2kkb8uta'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'lrli3c42m5icyo6fd95gqtk7faafnlqebsxuiv10cplpa13qtbcsge5ldrqkayalvsb4e1p139tuhuem3ls9hizw8yfkfj4lx78a9uckvgy8w8axavpw5fmqopkqknc93bvkxj4uoe9b7ab23qe9h322kooy7szsxghg2z3nnal7tnxvgrtetma70eyj0gtdq40lxkm794bgrv0rsx1czxzerhbquc55h4ypnybvweadmzbrod44e7byct49hta'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-28 01:44:07'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-27 17:04:54'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-28 03:48:51'
    })
    deletedAt: string;
    
    
}
