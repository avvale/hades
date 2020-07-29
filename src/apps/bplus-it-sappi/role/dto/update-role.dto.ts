import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '2bd02d95-4282-4d95-ade0-c1d066a09c20'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'fd0274e6-6175-4522-9c3e-e055cab9f5f0'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'dm9z2lwmciv4vwx78pf991ffk7j4mdy1m2xnnlzs95hxlr3cr1'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'xn3fg1enn22ivjmf8gxnprcygwz53sf29p7ufcvjhvlt22ovpm53zwbzj6ft1azhsa6ale5xbfv1v1j9n9xqtuelj8wgupqs9o80oonmol237a0eepd5sqwutlo7rv5xonod28e46pdyuqf0rxg7jsznxdg7o9o6pzg9ooty9dt4vx6tltchj8f5p367ueyl0c14v96iw30phn5n0pmhksqh5bx0im61b2de0jkgmvi7nv70yy2bdv1hrq8muno'
    })
    name: string;
    
    
}
