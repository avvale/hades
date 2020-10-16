import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '46db8d55-08d3-4b2d-8ee5-0b8f4ea91b16'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'jdxay64s6lx5w25p5j7izmol141voanhd1vzang59rvjd9q18p0qcpr37jxqzww9b6z3oz6std88il8vr8zwiv7zvnpn54ccqsa0wgv4cpzhkeouvwmngnjwo0u9i2krcwjtilm5bd5drqigafhuglb488tuxu0v97m86qno1o25bvpt95jomtkiz62ztmwfodrzf3sp64riwv26i2aj19qwwdbleqykk653tp5iusejwza016shr90hkfwvq9x'
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
