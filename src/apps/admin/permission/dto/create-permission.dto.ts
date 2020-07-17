import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '0ef77df4-f553-4a3b-80e2-c4c0ef91ac94'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : '2a301d1c-e2a3-4c10-bd9a-e4af53717ecd'
    })
    boundedContextId: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'uf61zvazx8ga34ugb9mg5ko2n6r7h19sfgajkcn80ax8iif6iq7c850bzwk2ger4i8azxo2k7x08apu7rznv8p06jp5ukeo3t3u7u6pd7p1q2on4mduqsi1tu1c2idozk5v0orbw30qypmunzhxi6avqjldm2yobytko4f1re8fl76ps6gnhk02o4ctswpgj2gkh7so9dpvnl0ytif5sky2oalkkzgawa1jv8i6g32crzn635nf9qhn2car99et'
    })
    name: string;
    
}
