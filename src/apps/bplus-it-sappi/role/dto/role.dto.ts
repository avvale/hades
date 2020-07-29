import { ApiProperty } from '@nestjs/swagger';

export class RoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '17a20da0-c6cb-4e2a-a625-c2790c8502bc'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '6ea2c877-2cd6-4fda-b26b-d7e12d4be435'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'm8lj8i2i1lfwkm5z1qcv1knzqljk4ulnjwehd0p34ae0frldiw'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'w7hjeuk0xj847td596tycrncwifo98tiwkdccmxb5axlhbpwag03ertv4t6fg2jcb2lwnvetz1i8twev20732o12comxdzy17ty8vqihi5bif4z8veidn42rpv7iw79jxr1ottrc22ra2kheu44a9np3ac1jisc1c09y51ggc9ov8uw5fnatgl9x04yobsno7whm9we8yg6lkdfyp0jikgbhc53p2vbda3tnhq9pc7topzw12vvllb1bh40h6m4'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-29 03:18:04'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-28 19:59:27'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-28 23:07:29'
    })
    deletedAt: string;
    
    
}
