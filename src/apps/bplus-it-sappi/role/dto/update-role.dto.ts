import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : '6c68c5e4-ee23-44b4-855d-20ac92d58daa'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'tenantId [input here api field description]',
            example     : '4ea53cf0-4253-42b5-b7ff-460ba94e25f4'
        })
        tenantId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'name [input here api field description]',
            example     : 'h6xe470pybfx8hj7uomp8zwh1ebmxfmarzzrd3um1tg53ljzp16glmrafebg75wclxqm95o7glpwtwyh7nlyomy0u8a8gvbcn4tglo5hiwvpwmfhzo8bgbm5obs4vdc0ytuokzhcyidjltm131o5zganwsui4ifnglpwgrj04248q6q1hafwhgipgs5bfn9fhtb3ponigsrn2jxucsb7oit5tyz5889t1tq41fxfwxzmrrbsu74e4ar3pi5cgri'
        })
        name: string;
    
    
}
