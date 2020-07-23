import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'fcd0786f-2071-4bbb-9ced-eb4238e3d895'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'f1956da6-5a04-4877-8a26-0b40ceac824b'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'y2c4w5b3ksfj8aacybgmrg2uckm1uxvy9ho0cd6lpl405g9pjy'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '5vgjp45an5qe7bxtdejgatg4f672opdafovw76etgw5mn8smho3hrky9ntokv69haflcj1b69efre46qbcaon318iteqrv0q0uvt7iujr85bea3vcs9lpeltk5xibnoedurjhethyj47ois66y578f4jregmifpd75v4pfdks9yhwo4g3jbiyfvr7ivb5u8x9699vckbfbl4tm1cujbjppuiao3mncbr2oegjd2nwr9t8lsch0kegpsso0ke2v3'
    })
    name: string;
    
    
}
