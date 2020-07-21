import { ApiProperty } from '@nestjs/swagger';

export class RoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '8fd69091-78d9-4942-be62-d502744fda3b'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'd0706715-b701-4bb1-9baf-372f4a71accd'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '53o7g8id4r39gqh8mi742bdfju67v8x10c2w0p4mjl62l6rahv0fs65dgkys9zodb90r8b5p0xhpaqvcmbsl6kedjluoduaznjp5c2h7rmepakw0njbpc9v0oab1e7xa9o9lga0au7iksg2czo3ofv0g82g1xmx6ghxf1wg3rqnl8pm8iz9m7wbd6zhy9il0ttlmd0iilybpyqu6skf7xxmz3yq8reqnphj3y5fve65smqfttlsl79a7wozi99c'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-21 17:20:24'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-21 04:18:11'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-21 12:47:36'
    })
    deletedAt: string;
    
    
}
