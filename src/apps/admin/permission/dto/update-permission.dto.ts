import { ApiProperty } from '@nestjs/swagger';

export class UpdatePermissionDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'e7244e3c-b7c9-4637-91e4-8b13af8d8da8'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : 'db8d5efc-fbd4-4fac-be3e-334dcc2881c6'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '321n6qwnry216vrs0bst4o4l7gzuctc6646gzxqnend842ubpk2xdu43rp7eu71frdmytvdseu5i1ogqjh3doz3mv3ju6ffy3cdokximvgo6wpmga3qysimm27lxjf785ksl4oyknk18gc46x3132c03lhcte7zsdg2z4pgy02peapgys60ve9rjcaa5qyonr2l3frogpxpgnalhog29gcpvn8qklrgxs32c70q7hmfxdu6lj2l0f3inry1qfvh'
    })
    name: string;
    
    
}
