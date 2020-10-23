import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '4d6b143d-885f-403b-a4d5-b14966719c9e'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'j35pxt3hqqt8lb2r97aozym1ot04krj5truyqufxms1zxiyhkeoez5qda3kjxibrk2i04qyuf55yyo39a9j4dhlldf3b7m6vguwkgk9kecgffdbjgn85fwz57xuxbbugfjkkg09d34dazcf3g69gkc32z7nhq1rnhen2s98m7xu1y9gmfm80ekq9wv72s5n3g8un85qmy8ar7e0z3yy8mkkfwwubsox6fj3fqmagrdzypwyxv5nm8uz6jq85foi'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : true
    })
    isMaster: boolean;
    
    
    
    @ApiProperty({
        type        : [String],
        description : 'permissionIds [input here api field description]',
        example     : '',
    })
    permissionIds: string[];
    
    
    
    @ApiProperty({
        type        : [String],
        description : 'accountIds [input here api field description]',
        example     : '',
    })
    accountIds: string[];
    
    
}
