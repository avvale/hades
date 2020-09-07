import { ApiProperty } from '@nestjs/swagger';

export class UpdatePermissionDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '563049ab-6a1d-4790-b182-2c1ac0a109b3'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : '45489bf1-b3cd-492a-8510-413b42dfd34b'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '1v5teopdnh4h0ebo3cushmcmjujadgxlheir4fvmovtm5qx6yx94h7hhjcienki92g6hd3n838gof4q8787tyyr08yj62rbq1lbha0z6hceozgrtautxblq9jkvmra9z2ig1yuesjhwdt65hiarobxroeek0b756p6jwpmkkxqxsnq4ro2blg6i0jzqfpzvscz4r9fm88tumud283z1u3ae1afchavznqn872147vz8xeum759rg9akoduy9bif'
    })
    name: string;
    
    
}
