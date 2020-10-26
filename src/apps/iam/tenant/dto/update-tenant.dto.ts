import { ApiProperty } from '@nestjs/swagger';

export class UpdateTenantDto
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
        example     : 'e40dxnlcoh2awzz1b683bfqw95p6zc318t3v09bca857gfqbdoqznhjzjljzyycuipden2o8h7ofpngdssvjr5auj1qbkv1exe1kfl84s6nuw5lxlnxr4ricrixzr3irwbmfwywwueu4y1nrm7cu1t2vmfhfvk3myro2vr2vqnykfirhqzaog3dhhggjinurhiiairfnpog45ek4lmfm3357ldslp85v58kjanhzucvzoef52628e2gzlol9j6x'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'code [input here api field description]',
        example     : 'wlkf35h47myl6h6gwmknh1apms9vnwgsexb3zf0xy1ytqdgtog'
    })
    code: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'logo [input here api field description]',
        example     : 'a16wp0leuky42fl8cqk4lf2pzgnnna45yf46xux44k3769wnqgdv5usdlddi3rv3npiiest1bz4l8z295tv9d6vki9lwkm1fqg9tx98dsfuic4tisqzswgv65hjm5nf9brbfwkcsmpi859jilwwmb5os3iill9qer6jpsicgagx8joi6ekfl9a06i3345k7rik94mlzs2bdub382tywwccaa9etxs12tyyqb55dgyg2g2k7e77oc7pclojewx0l'
    })
    logo: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : false
    })
    isActive: boolean;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
    
    @ApiProperty({
        type        : [String],
        description : 'accountIds [input here api field description]',
        example     : '',
    })
    accountIds: string[];
    
    
}
