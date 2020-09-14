import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'a519ff03-db35-49ee-9162-bb4398fa8e45'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'yqpiuaeqxqjqfji053fykqe99pq8vxjfs166ap9kw6tce80k731n56c7uo3glfvctq6o64a3rzvhxql4pe8fvguil5l6z0xykrlntc3ij5qvjtk9jufp9mosx45fp7io57t9qldmkv9skmqdrbvkb5batapjhwl2l3vptczieqcrbzvkrc20sydm3i0gtp0bhmf2lwrhgvcrqduboh6cqtr4dp0mo3notm00yrqgwvn1tdf22t93v2w6xf2boxr'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'code [input here api field description]',
        example     : '6i0hh4pgha49dy9iqor5eobsqxadpyj5o8av2zir7xfxwm0naq'
    })
    code: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : 'v3oq53jhy7mqa7t94rlr74j6y51olv6u4tjimu4s1su347qtla32e4787cyf53r5spcs7v4alh510rk67q4750xxrl'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : true
    })
    isMaster: boolean;
    
    
}
