import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto
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
        example     : 'lzouj038yc9mqgo23qj43domaqhmkjgzjdy6c0u7y5gnktaq9z3as5vsz07r08apx5uls67777i1h78wqh1bahod45aqrpvpmx7nvlbdp1lnz0z03nay0es4o6a12lyny08xqrhzrljw7raoq81aqznkot9my100d9fbt1lp8wvtqnifrgv9ab0o0qgctfmfjakovgquedbb4s4omq7s6bysu4nvc70fydylt2vcyakdcwpunq6fax232apfnun'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : false
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
