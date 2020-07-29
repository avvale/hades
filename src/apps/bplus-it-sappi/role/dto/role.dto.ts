import { ApiProperty } from '@nestjs/swagger';

export class RoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '5c3fbf4b-b3ce-45b0-8c78-49c5fbc26bb7'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'b5c8236f-8381-425a-9320-978649a142ba'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'ixd97rc559tpjimxnhlbq1ehqoytnqhrkxdqwxx0s0utt3dc3r'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '01cvck7mtta25ppeymwikrs2xh3n8w3umvqqzf8dxhv4ub7la44eidvs96mz2a26ny1ib6qpremu9mk4cmfa9srir9o6x0hll9w0kine3po8etw73tbm7twy09nrrooogbck3enkx0ca4g8u50cetolwpzmyoi4ns9txiswiice8c2qypbf72mi9vxbx9rfbapqoow4qn71rmgxlv3y6qsppsih0vihq87wxoeqje6uhr36fb1ekm70s30otk2l'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-29 06:06:53'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 06:15:46'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-28 23:19:29'
    })
    deletedAt: string;
    
    
}
