import { ApiProperty } from '@nestjs/swagger';

export class BoundedContextDto
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '100be2dd-fc5a-482d-9093-45dd8d9d58fb'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'm0p64qqstgrh1k0bgcuamk5xdvn72b2c44fzkd6cbxx7no3587oq7zsn1vup9x985pjfg26wzts7hc6q3ir73ofyq7k4xk46b3ta9ak594pawg05d2yj4c0tuhpgi4wf9wdr225o9br592be4439x2j87nowv4yoyo6ceer3fwfoory6xzgzjiei4plobti0t3v88tlop9iwwrng00ns5oaiheu80y86tk3rhcd278jfl4im7a5b5obmfmexibq'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : '5umh49bd04irwszklicaaed3xfjvcg'
    })
    root: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 712020
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
        example     : '2020-10-22 16:27:19'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-10-23 14:23:49'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-10-22 21:06:31'
    })
    deletedAt: string;
    
    
}
