import { ApiProperty } from '@nestjs/swagger';

export class UpdateFlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'b10b028b-1e7b-4098-aae2-18bbaf2fec38'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'mv0bo3zc2ixg7x8tu47njvh763wi4ddvt1c0t7x7'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '48132ca9-66fd-4019-b9dd-620337ddbe56'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'e5fwnm3y1gz9piwkk0hfpqzsebthg5gvvbf45o3n8loqs5cx1c'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'f98b30fe-06f8-460f-bff1-8d567c29fedd'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'fzok3uoxcfofpdqkeohh'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'h5z8duwsu8lv4ukz47oe'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : '6h822q4dt2flncka97ndtsx6thd87wajwed35079a2om1t7ty3pqp0z3sd48'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '73vrmz29wtd9octp2a2u9drbextdtf734y2kdnh917e4nawwo93f2mn4fixh4jm58o5l3huqgfgehrw3749n2woha55wi5ld5kqtty689nfxtoj17qp0k9d723o7ofohvy8am09buvnat82n0v1u5g12415bmpse'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'oum4i0qweu3xxavxf4zo5a5nj6wyg40n8l58na266byiukv0wjml61m24w9hyeotuewzyk23ebhk7xwbwrkpcvgrl3amcp7mwh4b0xl54a82jfftytuk1lipwh7pqlmr263ceeom51vicc4rnm83qde5emjb4xw5'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : '4icnwmaiinya6j7lvlr5axpiedabp7qymy3b5abltt5hr8rmdj1obbac7pk9drg4kiauvxr3kfw802gktemmhkdlro5yfjlugtpkihyzkmyp27n1wlyerutsy1a6qvwhxuq94gkrg4rrusjuj5kpx5ov7va35x31'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'bxzlaurpxd3poki2jvqahf81iu7y53pe3od2kwofxity4jzhxt422xbscn66q8wqla5fqxfwidv9ot3n6of0avtyq7wton5d1n983e6g6zedx4eu8bs034amvuzyoafjza6fv6j1l4f6lrhdoj9aokdseudf52ux'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'xcyew81fkke6wy7pbhhl8fdxxgyf2i60vxcfoxjb3mf2e79gsuubbuwylzujc5dc74mrwuy3ow4xjsgcupv337g94477dnpbh9ndu7w7ek9exclz5948p7avakincxpc18hn2ihmwmvqcbu8vjxpvd92jmocl7kw'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'd7thpp5ro2t7yof4w49q'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '0sfsmrvh84ugmqmqvau2'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-29 03:37:49'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : '7ww1lkpkdioi17xssyv5nbxku3oz6acu82zq7973bpn2q4xv8bwakypsjpy4099d5ijkvska4jlc7wfeuhsrfuhqi19cogvfsoi6p1pskz6yct2o5c1jics8s3fbx5zhrh3mb7d83ia4hesczb2n7uwcjk6envy88354jquooi72m1u4qkd8nzsvhzql9yglu55l21tf8srm6844edtca7qlct6n84ufglvzhcl2yja8qomtsrhr3s4sgzoznye'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'av34uz59q7n5ow2w4gds55ojnr05chmuliywpplulqlew1udcc0umnj5u58o9uztkjv6wbk3xyl6f9591cqy03o7f4aqmclszi11j42ilbg74gtg5i05iv5ftupfaxnm3ztiwr0xw9zvzy3cvm9a4ikd4ran9se13vl34fub097dqjwem4lohf9t3cnoxp5r376na1m1zfwiajo1ca8063f6t5w6w3kvauqh5zq4puoolbp03hh4y5mobk54jwj'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'cdp45nselg91yd32ho2wl4ufina9nc42jw4kenxog1bwooadp6gr1s57t6in'
    })
    application: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isCritical [input here api field description]',
        example     : false
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
        example     : '0bec15a5-9dc4-4383-b536-3fa9e4446819'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
