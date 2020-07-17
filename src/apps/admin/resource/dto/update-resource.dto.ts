import { ApiProperty } from '@nestjs/swagger';

export class UpdateResourceDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '2c26fca4-536b-4ede-a8bb-4a6f0ab83d92'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : 'ef62f526-feac-4e8c-a9c9-9ed906bb3891'
    })
    boundedContextId: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'blvypd418a2l6kxo8coc66juojmhtkdicapkz1mfi59745jjvurt0tlyt7vtli20ywina7tusy9c3w87r6f4ig9eewgapt7r5lz2nfbufpq48wfo0tvrx38vkt52lqyhtomxu1b0zuhm09m9bxx3xhxdn0unk1zbzsjyrllklx0utog63q7frvtanv7xs95g0gj0m32iroloefi4k7kwmdorc2w0ea6zrxtdj2wtsro6easlnz1p63x28t21lij'
    })
    name: string;
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasCustomFields [input here api field description]',
        example     : false
    })
    hasCustomFields: boolean;
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasAttachments [input here api field description]',
        example     : true
    })
    hasAttachments: boolean;
    
}
