import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '37034281-2b7a-4a96-a163-8118c37090d7'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'clientId [input here api field description]',
        example     : '4768d54a-b685-431b-92bf-b8de85617701'
    })
    clientId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'accountId [input here api field description]',
        example     : '0a306606-b98b-4deb-a49a-7c6be52562d6'
    })
    accountId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'token [input here api field description]',
        example     : 'Vel aliquam omnis maxime voluptas similique ducimus. Porro et ut eveniet vel voluptatem id porro quis molestiae. Eligendi omnis dicta sed. Quis architecto eos quia illum sapiente nesciunt et magni. Nam odio suscipit eligendi nostrum eos asperiores. Id architecto magni aspernatur omnis nobis mollitia mollitia neque.'
    })
    token: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'sgiezqglzrms1n54z4lphghqw833rcwum80cohm2bienm8ir8voobjnzktsk409eye29cxv447kq91wpad8udt0ammby0gwm97daa9zfy044zyzam177syomr2jgpdl55uaj3rz9mcydxfa3fxhouor204e02s6bbr6enwd8zetqj14wt6ovv1gmokorr2024mf9fipm2oid5tkdqqcqiyux9xf4pg5lghivnhnmftegp418usbm9geb2ko8qwy'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isRevoked [input here api field description]',
        example     : false
    })
    isRevoked: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'expiresAt [input here api field description]',
        example     : '2020-10-16 21:02:31'
    })
    expiresAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-10-16 04:32:57'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-10-16 22:33:55'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-10-16 10:47:34'
    })
    deletedAt: string;
    
    
}
