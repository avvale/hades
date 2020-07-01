import { ApiProperty } from '@nestjs/swagger';

export class UpdatePermissionDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'a3448654-e7db-42c8-840c-9c47ee589727'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'moduleId [input here api field description]',
        example     : '6d5b02fb-7368-487b-9115-4b02ecb0f694'
    })
    moduleId: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'w9nucurgvelz23urnd3cuxg2iirer369a5o17lqmftrppp91na564bhddxxkvgcbiqbxe9soehl6zypwdn1yr6aq3c94tr1sinpnutwbzkkiyc2r3cno1xcmst8jinnm0ewsrxi42six40m447hfaat3ckrmimlfc6212jz3dfy7nmhaqdi6vtxbi3ewcnqg9bfjds2ffbgxuwo7hpum15dtekexbcwx9k99hygtrlnshpujw7qps9p20l490aq'
    })
    name: string;
    
}
