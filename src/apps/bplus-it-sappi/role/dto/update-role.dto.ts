import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'ea584da1-fcab-4a2c-ac84-b97f5dbb1a7f'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '3fca77d2-9de7-412d-a364-ae3163b0a36f'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'ymukeh31oy9kfy0769r4aq6fwbarguo84b5fhy2i38pqtahj8k'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '1r6f6x9wl9ganzj57726z4st4h1h9vfmlhwi3cab4ncvmv5hplbo9bp84u6whdqraq1o1r4pm7j3l5j6sc52s7kguvwsk3j03fu4dkp2vew6hi22ae9rx1owqh6n1irmvn1syik5yfqjlpto5b582tsizn0ost1jv12gs08gm4vq5ngpjbz2yv1s8u8pe0wzwp9c5upiv7ulvb71vxf9i0l9p2wmvspqknam8ffqwghrfbapjrd4hte7jy0bypp'
    })
    name: string;
    
    
}
