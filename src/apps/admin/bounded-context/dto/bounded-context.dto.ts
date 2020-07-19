import { ApiProperty } from '@nestjs/swagger';

export class BoundedContextDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'db1564dd-99ac-4a9e-b51d-87a45133fc0b'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '8246pyw0c1l4yr6zk2zmfpyymjja1pf12uuvhqbkwm6zet6nyrmz43hpiuf8p85vuhy9p2ys5hkzydg1m5fv7rc2uks9o1vb06gjv652dfq3uph2u8m3lbn0twhzx1mel4q8uxbeudajgsenhuywuyga89ktd251wusqxhpw7m0ebjxjfdw9fb2efppv47dfcgj0m79x2w12kl0jzca7d57rxof1aapa2xsds9w6h6avvgyo25qeiscblqq1ovj'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : 'j7mzv0rb4m1k4dj60ved'
    })
    root: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 773425
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
        example     : '2020-07-19 11:13:49'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-19 01:44:15'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-19 01:42:45'
    })
    deletedAt: string;
    
    
}
