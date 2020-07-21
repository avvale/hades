import { ApiProperty } from '@nestjs/swagger';

export class UpdatePermissionDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : '26cd0504-1f0f-4132-a209-c0939984de3d'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'boundedContextId [input here api field description]',
            example     : '6efb92e9-069c-4c46-96bf-e96c5beb0709'
        })
        boundedContextId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'name [input here api field description]',
            example     : 'a9r1o8tsi6s12641gk34w9ehm7h93k5ejog4340ak1hukok93wp1b72ilcp59ii2xm930xwm49o6ou8n5ybeo4rkroi3ui2fwioypexm1rx8bwtdcbw3co6yki95wx8059io03syxw5q5z50yg2b65m7va5yy1wpc408lh20o5jeldou7uf55z4n25bfjn4q7gbxl23buvkmax3lg9tb847ovf0pbghlglxl62elbs1ui5iopav5ujk9n05ht1y'
        })
        name: string;
    
    
}
