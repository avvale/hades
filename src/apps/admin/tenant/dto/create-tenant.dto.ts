import { ApiProperty } from '@nestjs/swagger';

export class CreateTenantDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'd94d4722-7446-4a49-8d23-0346bfcd2881'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'Tasty Cotton Chips'
    })
    name: string;
    
    @ApiProperty({
        type        : String,
        description : 'code [input here api field description]',
        example     : 'Small Metal Car'
    })
    code: string;
    
    @ApiProperty({
        type        : String,
        description : 'logo [input here api field description]',
        example     : 'Rustic Soft Chicken'
    })
    logo: string;
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : false
    })
    isActive: boolean;
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
}
