import { ApiProperty } from '@nestjs/swagger';

export class RoleDto 
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
        example     : 'bztixs3gt6zxq11mg9kl6ubr8vj0pveslb8ku53gx4kbayhs0qzzqlugvny5losgvf1jvh6l4cpq02xzw9adrnmzb17z6941t2yj8gxbjcbyd9hpwmsxnmmx5qcka0t5kf32hk0t6yes6ordap9bv52umy0o8qjr7vp3v8dahyn9aene84t4d6zru4hyhcgunaybx1qq3t3d78lyif15x6lbumbupvtclkdf9ufgwipnxhkn7rgmnybqwr3gs0q'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-21 20:37:38'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-21 11:17:16'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-21 14:14:40'
    })
    deletedAt: string;
    
    
}
