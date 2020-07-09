import { ApiProperty } from '@nestjs/swagger';

export class UpdateTagDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'b91fa74f-012c-4830-9dd1-a930fa42296d'
    })
    id: string;
    
    @ApiProperty({
        type        : Number,
        description : 'code [input here api field description]',
        example     : 7075614978
    })
    code: number;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '9659665e-b461-4578-9df2-5bd2f5cc5014'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'ff5vxqnpwdid3k87lwgfg7by9mcloei89xy3wxbmlugbz8jniu'
    })
    tenantCode: string;
    
    @ApiProperty({
        type        : String,
        description : 'urlBase [input here api field description]',
        example     : '3a6hx2kiqeprhwtqhghdnqmu7y0qxi1setyf7utcl6qubnvxihjizlqdwf0rjxynlyeqaj3go33s1y8mttto44uqm9vb63asxj5h7vm13rzjyjr8lyh795b1d0gdah6f2ooseu5bgkxw92fctasslkff4xl84wi5dlsfkb1xk66k4tii5w9m6te80qnwrzeec1pasxsk3kxe87dvtjl5o42l2qjlqs7yd5mvfif4s79q24530wrjzwmfiwygg8h'
    })
    urlBase: string;
    
    @ApiProperty({
        type        : Object,
        description : 'params [input here api field description]',
        example     : { "foo" : "bar" }
    })
    params: any;
    
    @ApiProperty({
        type        : Number,
        description : 'offset [input here api field description]',
        example     : 883299
    })
    offset: number;
    
    @ApiProperty({
        type        : Boolean,
        description : 'isSessionRequired [input here api field description]',
        example     : true
    })
    isSessionRequired: boolean;
    
}
