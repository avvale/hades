import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '53271467-a2bf-4b82-a296-ab4602e7e26e'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'clientId [input here api field description]',
        example     : '4cbf7124-b70e-45df-88d7-d9ed03f0d49d'
    })
    clientId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'accountId [input here api field description]',
        example     : '7fd135bc-bb81-425c-89fa-9ad9faa83cef'
    })
    accountId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'token [input here api field description]',
        example     : 'Odio incidunt voluptatem maiores et est sed quo corporis. Cum consequatur doloribus qui repellendus. Illum nostrum sint cum consequatur doloribus sed vel voluptatem. Est alias numquam corporis.'
    })
    token: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'ww1oc6egkzz2hdnhpckowe2bj9eblbk973u68u8s98qb4e6pmi5ujxmmrzkz86tzdet26omrcrfb4lglmgmxm1cw8giqj2x0qlnqe93rh8s471641skape9ytl73zy4dd6xbhkwpavxx1gz8nqknl0gbbhb5wb4qfntv1ugvudkweft1ckm4ywlzz90lr16331h5epidegba1qasyalzdu0b9kaeqwxxq7edqierj1qhuvzjd8r82roz2pogkrm'
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
        example     : '2020-09-26 19:43:17'
    })
    expiresAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-09-26 12:58:27'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-09-26 05:06:36'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-09-26 11:09:28'
    })
    deletedAt: string;
    
    
}
