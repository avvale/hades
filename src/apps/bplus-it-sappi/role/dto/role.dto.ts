import { ApiProperty } from '@nestjs/swagger';

export class RoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '3b1bb011-1b5b-4ff1-8453-d226ed4351dc',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'd76e18ba-d0b3-48e4-bebf-0bb95a5c04b7',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'mta0fcrh19qt2mn8alcs7gb9zlc0g7fbkb1pjofix9ftrbtfif03jhwflrbmh5azxfyndbtcca899pfxfgx8mdhdulh5695j2i0f7640ced8swqne642f4mjj8fhlrqp6ujjlgbxgmefflmvza0n7zoj3mjwdhxnbdmx7hz1gfy6gcu31przf3pjcptlqudzvg86qg6e7cqe5whizm047uusc64zf5tapuy217et6sskmvjq3q7bkvxmhxtcnso',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-16 17:42:52',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-17 07:35:08',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-17 03:21:15',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    deletedAt: string;
    
    
}
