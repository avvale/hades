import { ApiProperty } from '@nestjs/swagger';

export class FlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '3b26d4e7-46c9-4136-bf7d-a85e2ca82c39'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '4867cd6e-c455-45b4-930d-ad6eb256d8a1'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'zdlv3ohmtobfzinl0nlc6o2zw6h0mrxf3z8j4jafyynxtz7miz'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '485fc9f4-8687-4102-8431-b9d71015d8be'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'db0ba367bk7jzt5urq5n'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '5t6ces480iwvmm156t8f'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : '6zhjyeo92whns5jpm44yg7vzdtkrmh8q3pwlc62h85ivbqqqfu5m2un89o1x'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '3s1kmi9fwgtwbr2myluvitkgfkg9nuye1g1ky2brmnyux2va5j0vd4pac5ux1w8jl0p95wk6r5mjun414voav51ad9m8imkuy2s73rjv30n68zdm0zwfhp61wiqqk3grw75yfuxza9t51bd4plybmqhr2vriett9'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'lj9fgjx5284soqbqurgqsikpn591ejl4753qe749z003hdxepowqfyy74xypaz8czy7s8di8no1xjd7y89rfddsdvrvcy4koz1gbf318yuuvkmclca8byt5aitewn6gqrsf8i4yzyr4h6ac8ovc9w6avhdw80pn3'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'exb1x83p62yf2b8knx69otp9z32m3ca10mudytwpo4wz60t28ly8w8muvp4g2x5bvcjo1vicd2s5v2wwmpo4n5o19cznezr1rp1g21ihsbh45q41r3ikho5nmcl4bbf896vhemjdd9pvi78j0osvj2pn4v2cp2x9'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'mzpy0ze0sxyijivf96wqv2f3akxio05qqlopbm6cx6dkvwfhz5sj1m87wmrwa7b5rbx7pk3kqxbty3k3ms1yj920zyyuy1f7x2v10axv3cciryd5obx4fctpdvtizitse0iv9cda7dq41gz96xfwqj0s5id1xtid'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'xmb3abjboyhmqy8ubo5yg5x13hz0nfrju4zr1haxsklsr2lsnox89uc4so0x1bf6k9s3snajayz4jmauu1ej4hbch3mvr2r6fjlrdks9s61de7543rnbpghsf1szw63qommevelvj8ykbq338a174vadmv7sbnra'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'fa2atj9xuec3utzomdac'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'idr2x25x5rw9spqih14p'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-27 02:25:07'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'k9bhkd60o63y8wi5bfn7v23bri1kqgd0bjnokf7aerdm4m0i93sa327cq37279agwepfmgu18edfxc55qtkfync3ttik9s6p21wmwgfe31cdiflvkie8xxzb2eccn4iv43jbo47v10mv9rgbtrvcax646yj3l0fn2wrdgf67s8d64xzlbqikxnhbe2f93pqbduv4u9q1ay0gydbj3emca76w098595an9mot9clpmij8yoaaidrucmxu5orw40e'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'm10oymrovyc0udjc9520wu2nqysodtm5s7p8lpk44tck3m07656zq33pxixulobplllme5ieba0rcfzgtes4obk87u07jftp10xuu90px1kda6xzo184two658oy5ujmqmx22aedyv6gn6smxxa02mrxu29f6709qnm7nyawqbkj8z2lhfjbjggzpy0z06rbm2hltgsec896hwbgbpb24sutk4xnn1kz53mxvpzazwk4az9avg9h9u3u1dp5iz8'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'urnco5zhsvod05uo0oskoxjvem088ycvkmw7qk9z8xuw564kqtz11bcqq95c'
    })
    application: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isCritical [input here api field description]',
        example     : true
    })
    isCritical: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isComplex [input here api field description]',
        example     : true
    })
    isComplex: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fieldGroupId [input here api field description]',
        example     : 'dd8cb3e7-a0dc-4945-b188-a4a37c63173c'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-27 03:23:58'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-26 19:17:46'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-27 15:35:09'
    })
    deletedAt: string;
    
    
}
