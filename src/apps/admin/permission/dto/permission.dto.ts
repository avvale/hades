import { ApiProperty } from '@nestjs/swagger';

export class PermissionDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '5524b000-a998-4723-b0d4-88bb5a6c5afe'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : 'c2fef42e-87b4-43e4-a824-f4540d012912'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'ilj5hkytx26v5913zyw7r3s8vp9a2nxtq35mqqmb2zp4dql7soz3wcg94vpo0ob3lfx1vanv59m0m3pmxguy1psmt25cvyak9ix2f6o5uqg7z1289i7ymgr613tnhu6v54s7vt3sncdkoshh65k44detc23un4dawum4uss22r1uvvbiujri7t4divsfip9w5c0pzcxkqt7t2gkhxsmqekl71oe3jumsnsivbhzmj5g48txvni4lfyfqjw3fcyl'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-21 21:03:44'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-21 16:58:06'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-22 00:10:05'
    })
    deletedAt: string;
    
    
}
