import { ApiProperty } from '@nestjs/swagger';

export class UpdateResourceDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'be31694e-e0bc-405f-bb9c-c12206802ef8'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : 'b8f3d565-b9ed-403d-998f-26b70f67d093'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'ianuea0mqen78rahy0iwb13chpceyhfm3usmuc8tw9zsv9q40qhjx1nz0u9mz1jg3dtq36o5rjg5rnbel1dh1vg3z9pg0shz9fbdqgio67b0vwh8t4p4bitu9tc8eyfgeuk8ejq6pizi8y8e349flnlfk291i5hflga5cq0s0rz329uf9uebullrjco254kvhyeo2wh1ry9c7l16cetej0gk0tcw2fce1q6bl3ubwy6a90ytev2xpcpe57m59sq'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasCustomFields [input here api field description]',
        example     : true
    })
    hasCustomFields: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasAttachments [input here api field description]',
        example     : true
    })
    hasAttachments: boolean;
    
    
}
