import { ApiProperty } from '@nestjs/swagger';

export class UpdateFlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '3203f3b4-564b-4f6f-81bb-53e7bb4f6940'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'sl1sb76bdmivvwneehmakxbsiuektsiaolblp59cpgpodlkglv'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '7f1f5605-aecf-4cb7-8317-bbb853061653'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'njexrob820yeom7yhjrd'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'czktc1fg1vubawmrcqgkn52kpkkb1kl1koobif3stzb6vriwropi0ia22ok1'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '4zklog5enx5fpf7cygwjsl7uphqh9o0x8pdb3u14baukg6x0xvcdubre265r3cjbm6nyya0t85wprlwfc118sfkxzqmvwxolz0fycpt3sbcdnlhgqgo95ana6y2wdebe2urfbwpkxqupp5em3dj2mf4674uo23uk'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : '82oqxt05x14nxu10o64snyivwloqhl2zpg9ul04n4q6qs62y2y9zw09rhktd8lo1ojj4pqpjyf9fu24ogfo63g4crrlrhcmyadg7jcwb5jj4jbtxsf2h4srxmbjuime5x0xn40pe4fxm8rq1xvw63czyetr85pn3'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'uyz2f96z7i0s8mz3cnmpm01wrt66xietqzhu9r2v8slz9nv30ts4dmalc4movq1w7n22dijib55bocjqqr5gk0hoatwjckpo3kbo639nwvegivptshhvsxhy2a9zb3nyohklxdbv0fb4vdtt6sle1zf2yumz5mhr'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'nl1wkfm1ttl1d1vgb6uuqtes267z4ggmaudkexo7n3gq3ml84gsps89ru8jevt45jp2trbibo29oycicl0qqwy03gvnsauuhj37y0ph022lzzi0svn2z7bjqamu4e8fsnm0j9hqxm2y8pptzjo73y7czb38cq4xa'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'kfke5ou8b78wmw2grjpn2iu7ju4sjrzfnir2ff2jb1xxefmy6pnzpvt25kjc3rc40wuuq17ij4t991g46dgev66rwi31bjeuqucey50kaovlw1ag3zrlbck16lvx825shvf3hbw2d32bajsnpc2m0c1elqtdcni9'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'mvlqc3tvipx2en8w5byn'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'ulv9m5isnzcyds2vw4fn'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-22 23:38:36'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 's1iixo0rk3daaumdohg4i17r4ojokm1j3yf2p5ci658t9r95juhhaps45u0lw6k0qo3b260ba36r76hg7yv296lcvn6e4c7l96h563dg8okbg6lkfs3rcnp5kpdbaljdbd8pukgqd1spggb69h462z85i3wj8b3jciduddqyo2aom3aruuzs9rjt1w8t5e29wehfcv5h9cxpw763wv60eeu2x2pa5rkdq5ndveqx46t9rhzqsrg8hmtkq1so03z'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'pyd66qachhtn5x1656omenfjwiayq31ygdmfynj2jidmjq25bc0odsjvh1ftglbcuxs4lk9liezl9lp8mpzqs7qgr4kfh0f28v4nlgws60lnfyvfj8rwy0b661d2341q6lw91rce6pihmh1z4u9fuo3tei4icyy3orw4ckzc18lx9hjnkfn5akaw3vljvcvo2kxjeny2m223pdpec9abvr5dmzs4s2fjtvu9wlmtqm5cl2i1bktgh65dhe9cmvn'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'dbiquo86kgea3dekzargclr9x1px8ddj4y2dj0srnvn88ki4vdin6gnbom72'
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
        example     : false
    })
    isComplex: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fieldGroupId [input here api field description]',
        example     : '08a26543-4686-4000-9f19-5f6f30c920d7'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
