import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto 
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
        example     : 'kjlsrc4z0155qry0pfy3tof5ttdxixn32yw1my5baxrr3aksxhvdnkaes5u6w2puqcn1gfs4ebiaftpdn56jzmtf8im9fdmzn0jw5gyou9br6o290bvqkn23wje6dfvmtw4yrgxpkjts815jvxnpgyjt98vssyxh7jqmj7lhje7brbqv4dmvnv7od74i57akyvr3p4tk3tqxlgvq20c9fnhyduvqyg711hbuiubtnyt0piec7qakjytysf8blzq'
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
