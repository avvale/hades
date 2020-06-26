import { ApiProperty } from '@nestjs/swagger';

export class UpdateTenantDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '6e243e17-899f-42a2-8d0d-86cef1c96469'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'srs8ld4pfqvnnvja1ik2nykjagqcbxr15blrm1ns6jv1jd8qdo0lfcyuhg4kf3grvo4sctfwmvy2ly2rcyknb0hzypznvzf1x9l3fy8b20ogdaah9irqhji9eqcx6xslyn2e5d4la6dix3q526a8m01kycl3pfwc6tn09jny0kce74cirscgw9i1nwde071dkv3ox7vlkwa3h0w71gtsr632alv8lyy083t9s33ddummr77sfkc0np4iaf639uf'
    })
    name: string;
    
    @ApiProperty({
        type        : String,
        description : 'code [input here api field description]',
        example     : 'amlmx0305n25uog4aarb73520gkvcpue3jiyilewg4ptewehm4'
    })
    code: string;
    
    @ApiProperty({
        type        : String,
        description : 'logo [input here api field description]',
        example     : 'nshclf5nn5fhpbyyh05q4r0wrd5supp8udi1ne8dmdizz4vxjdhwll1udqbshb3s4pc4squvztvvdrzenogms5o21erc5dfa9ooth5kokvieqk9pkhvgosutrc29g3uzd8pxss2brp0k9waq1794zejqmu69zhvec8x2a7utqflor8ovmks6dshewexa0ubieoini4hx7g7m39p7g2cm8e6flphnrqxaqpcsejhgvcd3m9zvvvxyfule26m9bku'
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
    
}
