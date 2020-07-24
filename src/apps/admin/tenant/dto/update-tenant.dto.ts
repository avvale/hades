import { ApiProperty } from '@nestjs/swagger';

export class UpdateTenantDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'a705f952-7805-49a5-8239-ea5e38486f36'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'l'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'code [input here api field description]',
        example     : '66de8p1a63o48ollke65j4nfwaqqae0odaxodr23ymaogqeqvt'
    })
    code: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'logo [input here api field description]',
        example     : '4'
    })
    logo: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : true
    })
    isActive: boolean;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
