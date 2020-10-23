import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '6dff0dda-5a79-49fe-87b0-fd9378dbc58e'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'zx1edpu1eajigj0r9u8civhu87b0t806xjjk69ni6sp9uxpembg7oshhis4ea8il7sod7ppgntbjnqtk4tamrwfv88e1kk19o0ynbpa06ckhtjec0n73314mund4ornrvnpauznd94you0oaj72bfhg3h7xhd5a5fdnp4tiksrr3zdf196nwb68g791hfc5z8pgbqk7zgxvec3ofmk2lpbuy99fte4joeqk8irkworshoc2b6mzey8knjgmmpsn'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : true
    })
    isMaster: boolean;
    
    
    
    @ApiProperty({
        type        : [String],
        description : 'permissionIds [input here api field description]',
        example     : '',
    })
    permissionIds: string[];
    
    
    
    @ApiProperty({
        type        : [String],
        description : 'accountIds [input here api field description]',
        example     : '',
    })
    accountIds: string[];
    
    
}
