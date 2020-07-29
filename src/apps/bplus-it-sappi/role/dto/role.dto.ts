import { ApiProperty } from '@nestjs/swagger';

export class RoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'db13bc91-b8c6-497d-8a0d-2a9fc5a6cd2c'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '64a2c4b7-7233-43dc-aaa8-5e7554b9b380'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '5md0fkkzc8fb5260iboypg3n0s14eccslrlt5bvmhpjjhqd2cz'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'tjicrgxxthesjrr137k7kj3lfsc0c24hg3biyo2cqv60bhhau9p71n4q7r6kljpx6crdlsjayf4kanv6zp2yzkhmbsgqmpm9erzc3cdcjinelhn44tnlzhri7uuk4ezh0dnj6l77kq1jqx7com031db51iti9lkulfnzgy61ekeylx0wlzoogj66ijybd8siugfh80nvp9g1rbw1d3dvajatkud8zhsd7wgbxu40rdv818731w3ahzy123wp10q'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-29 18:16:08'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-30 00:41:46'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-29 16:27:26'
    })
    deletedAt: string;
    
    
}
