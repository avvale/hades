import { ApiProperty } from '@nestjs/swagger';

export class CreateModuleDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '92442675-0203-4d7b-a251-1c3657038203'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'wy49aksumee8xwperi18yi725c4oc7uptv2367zmz4zz1sttmly01pi7rqfjjprwykhv9khnkjjuulgmezitung9krqa23pvime29ev8y5np6ctuw2ykp7202vwl68ki3gmxk4vfstuk5tb4vk977bokfzerknaus6vq5bazwaeswhyd0hx7ez6o50inobqzudswkheagzyh72oiwez60nvb4w3vf44l1l90qu746cdg2venq24srlijei5h577'
    })
    name: string;
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : 'xqzk1ormrlw06u84evom'
    })
    root: string;
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 479716
    })
    sort: number;
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : true
    })
    isActive: boolean;
    
}
