import { ApiProperty } from '@nestjs/swagger';

export class RoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'ea584da1-fcab-4a2c-ac84-b97f5dbb1a7f'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '3fca77d2-9de7-412d-a364-ae3163b0a36f'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'e8xil28xwl0n3m7asfalvlyz10eliahn6rfvhaqipxki8fx467'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '2pffge5zi9j2f1vwhshizedd6gj8da1rtczthow3emoeu0j7di3q93jpm6oxmqangvc5bvkhgyw6gwsp9je7e881s7qjxyhd81v7faus12lsnhg5my747wko35muq93z5n3vmwdcqatmbeq5d0gf36jjg4az19tmvmtunk1svp5zf9wqms66939n6ixfzcxqk3r2bbsqbfwoo9gwyl0ijxknj3ggirz3zjv8hrnzfb46o66rdgaofiipktxdkvv'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-24 07:11:07'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-24 12:15:17'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-23 20:26:19'
    })
    deletedAt: string;
    
    
}
