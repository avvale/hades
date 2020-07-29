import { ApiProperty } from '@nestjs/swagger';

export class UpdatePermissionDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'be6c6cac-18f1-4b99-981e-c928c6342868'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : '4eefa322-b9b9-4e1a-bd9b-f8d82ff1952d'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'eu3rlpgnu9y84ggqkxe1cyjhktng11o3et6xpv0f608s3illo4jmexld6h1sdz0tp7gh7ksrg0ic9hjoakzw0xz48np2hzcf4wt3yk3ojskg7d95kir8jf4u6v46j78v5eu8ppfa9jz3lcg9dz8jthr1nbz5k5ol4m1vouw5n5868ew4uow9h1onfpfkwuzukc1wfga08f5e1tncb928ykkxzejt8l60cwj7xilube4m7a3pmczv1sli5u0w8td'
    })
    name: string;
    
    
}
