import { ApiProperty } from '@nestjs/swagger';

export class PermissionDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '33776019-8027-40ae-8ce4-0f736ddc7ad6'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : 'bb46f885-9e91-4ad4-bac3-64496af6c532'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '384rarhl4b1i8avagroyk8kbtlbqvcw1w1zv3ifqbb1sjnbp05t8x0dm8mu05s6jr6vx41qmmt7cvqp66q44yy4tkjbesvyd4vrtw8rbfpjef755zrdzi96433gbmk6bdyyolb4oak3e5uj5pvlze3do7atjx81fvy2ag2nfu484hoqdnrc22mur604scszrh3zakek7tdqaxhzvhvakrrq7fdb55858u306xoxnr8e5k2xwdvzam6eg4f6425k'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-08-02 22:12:56'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-08-03 05:53:46'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-08-03 01:11:56'
    })
    deletedAt: string;
    
    
}
