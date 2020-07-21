import { ApiProperty } from '@nestjs/swagger';

export class BoundedContextDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'a8355191-017b-41b4-aa48-e167d3051c1d'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '8w1zkym6rpwq5ld5au8x7vnsylo0vmn1qflyga8rni6dlp6wholscb63bpmhy82u0xolazzei88vnkxrkq4lmyjw5f76ckcdlgyzo5gtun1t7p0mcfr2be8mwpp388pm3qh0658uimp9kvppzuxb21ynnc7454l12z2kguk4uukwc54r48ynf405grvxbuy23xm8fulj10z291jgx393xsp6enrnzgcb9usp1y0dljvapd5ufefeof73fiiv3eg'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : '58zr0fee7s18mcp7fg9o'
    })
    root: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 933090
    })
    sort: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : true
    })
    isActive: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-21 07:39:49'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-21 13:24:48'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-21 00:39:27'
    })
    deletedAt: string;
    
    
}
