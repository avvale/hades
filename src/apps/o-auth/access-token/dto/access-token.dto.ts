import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'cc9fb6ca-b741-42f4-8511-9b4058fb6c38'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'clientId [input here api field description]',
        example     : '7cd4ed81-8c63-4b05-8efa-3e45aa4d9dc6'
    })
    clientId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'token [input here api field description]',
        example     : 'Iusto consequuntur animi consequatur et sunt aut quasi. Ducimus fuga sapiente. Sit et eligendi ad ut ipsam numquam veniam. Autem vel temporibus expedita voluptatem fuga. Et temporibus optio est magni quos a fugiat.'
    })
    token: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'fdqsc0hhmbs8vwdcwa1526nqqbk89zf1pl7hj2ihhklw01i6v153d79m0grz9powxt7dijawr8tf7bv2qkzgosrdcsibao0vahay16jrmln11udmki8x8uqk3xlivv4su47yk67ecyq4hvn7xij1t43vdfuu936pg9hlpgimzwi5jaf2jw0ny78e8yia8rv4968zppex7siro5ql6fk4w9fuvy457bpp7wm8q896tv6finuvh9ubcqc8e6bkc3n'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isRevoked [input here api field description]',
        example     : false
    })
    isRevoked: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'expiresAt [input here api field description]',
        example     : '2020-09-20 05:34:15'
    })
    expiresAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-09-19 18:28:28'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-09-20 01:23:44'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-09-20 00:40:22'
    })
    deletedAt: string;
    
    
}
