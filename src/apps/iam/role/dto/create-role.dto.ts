import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '922e168c-712d-48b3-9f45-137677eba31e'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '6zelaupbeh6p5h3j85qrzlhee0plcpdt5zw2jf4g421kpi6rgi2fvk2ni82do5clmquey5v3813fp71h6kynfwggbqc9y6bisvd8nzswnq41ybw8br277y2pteen9ngr9he03o9mvvfwv9qcmxg8sshrq3drwc0z1i3mmkn5fzarq5ebjntbd1eimvufrjrakf1mp9420u5hkfuu2ef650pjjoa8tvjpyr313gmqkn784x323cvqpvzqa4e7vlr'
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
