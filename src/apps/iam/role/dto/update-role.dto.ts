import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto 
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
        example     : 'dgbj5n25td27h2kqofyyf32cr3rpec015t4lhu59ytcj0kfvb6fju92zmtab3y2m7j1t5lxctwc23acyj0m2cu3vwd65ejmsk0w2iy1r0y2opeh7raeoygxf8l2qej8bbgfqsdj5kvljz0cuibjsmr3el5uhjrzrvrj7zs1marrkriegzbxtitj49a4szxo1akgh2gj0sxbrrapmqqwuu0djx9o1vgb8rlkwa2nwhau6axx2ak69dm9zzkjny82'
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
