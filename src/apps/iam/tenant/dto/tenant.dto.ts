import { ApiProperty } from '@nestjs/swagger';
import { AccountDto } from './../../../iam/account/dto/account.dto';    

export class TenantDto
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '520e69b0-0a30-4be4-bef7-83ae1429b9f9'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '4oh7xnendsfhz7zc1y052yk182dorhtggb8u619dw7znkuu0cc5xytwdccrecf8nnhb4hozqkt30arrejtvwc65pu5zasg4af1s7bj1kdcdt9h4uriltmwnukldim1a9fwgsfnct7iv5abyq40jeflwswv0q2zz8byzaxz1dj6p32w6urloqhfo9n84k8ctnxk0fj0ugffzy36adl4d22em8x523i20ghkh5p8fj4v170piu2bf38hnq54xwcvu'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'code [input here api field description]',
        example     : 'mkdc51s22q8ycn5phzpota4dteqi2dw1ua89mrw9n8anbootj9'
    })
    code: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'logo [input here api field description]',
        example     : 'gosr0py34px8wf9yausqxqbbz6mqbxz9swqndm4mkkv5uz9s85uh3ahpd0hbb18vnbzgnoa599xzqw962wzrrfuprcbv781q0whncwnsvr5vmobnhs35uxwhgu9jvxky931g6b9cfkdtur87g6swa7ndtbie5x3npzc7e84jmg5fjwqd8xnufipw46k85pf7v5dqsh6vr9wgzrvhe59e5xq0jmg8b0iy9q4ely9qg84ttv9td37qz1oyzk0nr8t'
    })
    logo: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : true
    })
    isActive: boolean;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
    
    @ApiProperty({
        type        : [AccountDto],
        description : 'accountIds [input here api field description]',
        example     : '',
    })
    accounts: AccountDto[];
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-10-22 16:36:26'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-10-23 08:09:03'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-10-23 10:38:32'
    })
    deletedAt: string;
    
    
}
