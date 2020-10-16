import { ApiProperty } from '@nestjs/swagger';

export class UpdateTenantDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'bf7b0cb5-9279-4dfe-a957-989935830dc8'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'iziwe4htthpirmxh4dt4zexoigz18jetad56z2rmnsaxmkvkngglszibawiwf3ijbjyjoixlgrdyosnplid2adgtjmhqxti2ja7cor3divfw0evi7jijk5o8tirxfd8qne5ls9hxnv2h61ihlg9otmaz7isahwti8si6vor6idyk0vcf1kp8w2cwftxtvvoekue69uhy3ctdy6wgze0s780pl7ig9sbiwk5zj4y332uxpkg7z3vgu0encxshtv1'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'code [input here api field description]',
        example     : 'oam492ltatr5wm9c13zlejbs2edtj95n4kbd5l1i5b394vews8'
    })
    code: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'logo [input here api field description]',
        example     : 'c8irc797epvqi5qiimqjr7fi6jsemctqim510nlrhcagm807khov6hmdy5tkhae4rf0ti6q9y20tzacva7mu2bei7q0j8y1d1tcwrtagsqhzjkavlrle03c3cx70wgf8m2n0dzmmo21vahx39jxdib0r3pu8pc4ro9upfxuosa29bs5irnwavo6tx8zrqn64nmk62wwq64xpdpl8tr3tt9s22tcy4ck8ieljq9oy86kaeeuvvgwiv0g6jmt91ye'
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
