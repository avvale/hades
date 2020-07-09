import { ApiProperty } from '@nestjs/swagger';

export class CreateSessionDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'ab627b95-5e94-4f7e-b2fd-b29af1ef833c'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'ip [input here api field description]',
        example     : 'kifvg4nnrdflo8q'
    })
    ip: string;
    
    @ApiProperty({
        type        : String,
        description : 'tagId [input here api field description]',
        example     : 'b757a5a3-48c5-415f-bdb7-1d52efc782b1'
    })
    tagId: string;
    
    @ApiProperty({
        type        : String,
        description : 'uid [input here api field description]',
        example     : 'zbcyt84zn9bosndygpgdq6ii2zeoppi6zcbrcz51qiv8z6hjzg568x88ookz2lri'
    })
    uid: string;
    
    @ApiProperty({
        type        : Number,
        description : 'counter [input here api field description]',
        example     : 315573
    })
    counter: number;
    
    @ApiProperty({
        type        : String,
        description : 'expiredAt [input here api field description]',
        example     : '2020-07-09 03:37:35'
    })
    expiredAt: string;
    
}
