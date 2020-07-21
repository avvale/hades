import { ApiProperty } from '@nestjs/swagger';

export class CreateResourceDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : 'a016b6d2-437a-46ba-92dc-d42c891ba04c'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'boundedContextId [input here api field description]',
            example     : 'c466f698-71db-4cb2-ae46-08604fc10fe0'
        })
        boundedContextId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'name [input here api field description]',
            example     : 'hh81suu3edgll5urf54x1j88yxky7pt8clz93pg5m9jvn1iexg03hhzymmidtd2ynl5mx84ianjounrpz8rckpra7slzsr1vmlbi8l9t4lo45yf3656vlrsheb0se5ffzyr0ch3m2dpzd5m7g609eylao4dvtd8q7gyenufv6zqx17bky8xsuirty6i3izg4g2ab6exaioqh30j42uvgbd4uvu1xeusnvb5qczhc26z2m3wbxh7lp4fl9v20fex'
        })
        name: string;
    
    
    
        @ApiProperty({
            type        : Boolean,
            description : 'hasCustomFields [input here api field description]',
            example     : false
        })
        hasCustomFields: boolean;
    
    
    
        @ApiProperty({
            type        : Boolean,
            description : 'hasAttachments [input here api field description]',
            example     : true
        })
        hasAttachments: boolean;
    
    
}
