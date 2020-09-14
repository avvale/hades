import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '8fbfc1b5-e1a4-4095-87c9-87b848c159f0'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'clientId [input here api field description]',
        example     : '3d8be5f7-1a14-4841-a7f6-095f50bbcc6d'
    })
    clientId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'token [input here api field description]',
        example     : 'Non eos autem accusamus vitae quaerat ut nobis laborum similique. Sed nihil corporis quidem possimus ratione voluptatem. Ea enim laborum est blanditiis quos mollitia similique voluptatum et. Consectetur in porro veniam nostrum. Dignissimos consequatur voluptatem temporibus et architecto. Ut nulla eveniet molestiae libero est.'
    })
    token: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '83afdcg6pr0kjj0jejxf16yiny7zf9medqi6m9u9j798kasvaahk10wfluxa95kxnk3zfkxmcha8k1uc867a2298725vyuer548876ai0pt46ymcgn8hzlud7iavef1d0lkc5xilxodmzr2h1fm98rh15a2sywsntome56vvl43ucwoi2x0mjvejlns1q1cyo9jr95npkuw4i7ly97jyadhdpc5wnquy2471zh1frg50g9s8rxc47876af119lr'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isRevoked [input here api field description]',
        example     : true
    })
    isRevoked: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'expiresAt [input here api field description]',
        example     : '2020-09-14 18:59:21'
    })
    expiresAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-09-14 13:10:44'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-09-14 10:45:54'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-09-14 22:11:55'
    })
    deletedAt: string;
    
    
}
