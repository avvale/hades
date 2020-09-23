import { ApiProperty } from '@nestjs/swagger';

export class BoundedContextDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '2dab947a-23e1-428e-bc89-8913db14f010'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '8fh4k7hnlu2yn3oevhqg2kjcxxs6jzvftx0jwgjwdm2kkb2fwza0pjf99g10ttj6a7e1r5gknli07ug4x5kxxc0zutw5w6lt1co8jzmw7zk8n3vv2vik3hegu1y6q6losh9eddy3vszewrwpvdqejgsf4jty143i4a1na3pi90qjw9aljcryv4s7lumc9u2adgv4x73l72q7365zc9bdhtqvrhpkke5k4uoy3d2aeq2v9nz1d2voz1gwawtkiz1'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : 'gfoboa0ndp7tuws2duuowzza1bteyk'
    })
    root: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 300147
    })
    sort: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : false
    })
    isActive: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-09-22 22:31:56'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-09-23 15:49:55'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-09-22 20:36:54'
    })
    deletedAt: string;
    
    
}
