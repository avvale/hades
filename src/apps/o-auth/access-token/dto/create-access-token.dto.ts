import { ApiProperty } from '@nestjs/swagger';

export class CreateAccessTokenDto 
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
        example     : 'Sit voluptatum doloremque sapiente ut assumenda laboriosam. Neque deserunt consequatur labore exercitationem rerum nemo. Vel qui aut est eum iste optio. Non laborum doloribus aut excepturi numquam.'
    })
    token: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '8w5knwfzkj4e986wd8g3nt2aeeqfz4o3gxilkfkij50hpm3xdggcmihaukjjhf4f1cfucr3iomukua8o8a1ka2w1y0p5edcq1hron2ogztcauz1eu4pz7htq8oxddt7xxkt90nsgc4frq20af5xbmcmdd5gawrev4d83rlsnx640s7h00dzz5ccbznvcymv5zz67f6wllkrjt3g0rqp5gd9iaeh6jb4bywqeiopm3qfz0hz2b0i2nncfjte1x18'
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
        example     : '2020-10-16 05:44:51'
    })
    expiresAt: string;
    
    
}
