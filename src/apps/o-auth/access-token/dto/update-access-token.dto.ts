import { ApiProperty } from '@nestjs/swagger';

export class UpdateAccessTokenDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '060fded3-7730-49d9-be73-7c0076f39471'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'clientId [input here api field description]',
        example     : 'e237907a-6d33-4f0e-b77a-103d6bff5a35'
    })
    clientId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'token [input here api field description]',
        example     : 'Aut inventore qui est. Officia enim et maiores. Hic animi nostrum aut libero explicabo.'
    })
    token: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'qc1wwvphpyz35pxh0f3582uebiih46g9utz14pmqki00ndis9q4tq1xnicps4l6gz1ktzzdq0adwa9kqn3g7rr329v6mk3otvzu8k1j61h5cr31265obqnujrcz55k9pdd3h2bz75a6740d05q4w425jkehgp7bc73ztmnndgfbfr36gtynqxxs7x13vukstwuknw9a60nzothydfhzkpna6vj9gl0nb20uk8ws1uko831i0jrxfeo6dkbcn2uh'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isRevoked [input here api field description]',
        example     : false
    })
    isRevoked: boolean;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiresAt [input here api field description]',
        example     : 5533839728
    })
    expiresAt: number;
    
    
}
