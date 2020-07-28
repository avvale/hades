import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '3ed2f404-9a41-4f1a-8b67-f51430c2236f'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'c4410ba4-c699-4d90-9b4e-17390b35b42a'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '5dhjsnad4vn9cp1e08cioydttrcbjng32nzbwnl9t4x6m8ewib'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'r4hioexgwk6r8i6287ysckdzt6qirg2zg558jdoyn0avb6lypueuh178qc37b3sid1bnm58jwxwr9hb0b6e4k7t22r5ec67bnw3raadih0fzcf9kzj0rprcpbb57fnzb1evdsf0yyo51jrw6uiwzxlrag2xy7aam0w96glf2wv4jo6u9mlxu1cwcwvhfus1c84pwznogwrcvroee2py9w1fdy0sw2bl2zyu9v3tkkn8v9wj6oyyyck27ut6s6e8'
    })
    name: string;
    
    
}
