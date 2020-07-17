import { ApiProperty } from '@nestjs/swagger';

export class BoundedContextDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'ea11ad2c-6782-4afd-8f84-a7832524f60a'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'hid5kl0ckjrl5716izwpz7htv3n6ezzpikhs5g0t0xg4z41ldayk9btf48ccosdroevpeo7j87nx5lkwxuknmc2mc3svfpjdogsen31oi0lzr2zhl4c0gp1do7shxmn7sn4fj95tj36n5hn1wya1y3ep02td29w8m57fujzje6bzrm5f4uf7ji4c1ovle5lum6q714l4n8u3jy1655dy2uk07vmebgwaeswijebprxa39vbsjze20xsrrjymv7w'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : 'ndbgf3yvlfbnjhrvoo13'
    })
    root: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 575867
    })
    sort: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : false
    })
    isActive: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-17 22:59:30'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-17 14:20:46'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-17 17:38:57'
    })
    deletedAt: string;
    
    
}
