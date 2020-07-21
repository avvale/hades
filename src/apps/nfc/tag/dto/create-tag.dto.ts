import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : 'b14beb99-e0e8-4e6f-9505-a59263cd6eed'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'code [input here api field description]',
            example     : 3592271081
        })
        code: number;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'tenantId [input here api field description]',
            example     : '0d7ba885-0f6d-4149-8d2b-8e15081fa80c'
        })
        tenantId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'tenantCode [input here api field description]',
            example     : 'zcae2sx0tyyag69amlwitvivll7lohr8fx17fwvbnneaxcwu6m'
        })
        tenantCode: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'urlBase [input here api field description]',
            example     : 'd7wpuwm4qub0rh2h0zkzw4q8l8yg9vvfjg5d03zolldp5mvdg1s2httvh5k1rhw4q4rqyk1ugt1jtqlb8lob8v4irhdxnw3mktj9dsbkccz68tepf86xq7xzzopiougcz8phe4b6x2504tlx2blz6pd2yjp7jlmbt7jukvsxzihrbz1ndbuhdj4e9nzbpbmoehou96r9krrchlf8dkvvtlml4ysy6wrds8p5y71bx8eyj2s0vgo5jv1c20qil3h'
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
            example     : 120329
        })
        offset: number;
    
    
    
        @ApiProperty({
            type        : Boolean,
            description : 'isSessionRequired [input here api field description]',
            example     : false
        })
        isSessionRequired: boolean;
    
    
}
