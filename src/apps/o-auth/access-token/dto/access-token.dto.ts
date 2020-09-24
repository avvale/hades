import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenDto 
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
        example     : 'In delectus corrupti id eligendi quisquam qui molestiae voluptas quia. Rerum et temporibus rerum nam expedita. Velit rerum doloribus nihil labore fugiat sint. Sunt quas unde est odio laborum enim distinctio est. Nihil adipisci explicabo qui aut sequi. Veniam quos minus ipsam et velit quia voluptatum dicta.'
    })
    token: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'dmznmfovbtz7vuq9k98z9rcvulyk69ae0nzf4dpkb4bt1j6115j5807rvvnsths5q6a51n6yk8hbwkbxg1ni7rb6ix79x3c16i96s4oo66fvf56ei0cwtn2j7jwq854z45auwv8r9rx1f3fvnl1k2sn485dqmmf86x51vtkq6xsz3jftilmdfmn4fembyv9wbdoy9dvetr0bhhqltl6pjjbla772v7e3ze9zkfg3spej6jxgy84h9fvez8rw2zl'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isRevoked [input here api field description]',
        example     : true
    })
    isRevoked: boolean;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiresAt [input here api field description]',
        example     : 6067613352
    })
    expiresAt: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-09-23 19:20:22'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-09-24 10:42:24'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-09-24 05:48:28'
    })
    deletedAt: string;
    
    
}
