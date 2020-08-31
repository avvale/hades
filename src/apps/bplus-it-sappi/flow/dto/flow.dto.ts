import { ApiProperty } from '@nestjs/swagger';

export class FlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '587eba99-315a-4cec-9a33-9417cf9ded57'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'esashtskv59bq0x4pnjbif00rkcpkn4e9hpmpwiw'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '89fa92da-387a-46d9-a7a8-a694b6e40124'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'psqylpqmajsgahjobvhe293hx8va39ypu3jmmk58shiyib4b04'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '4de55c5c-628e-4e9b-9ab6-97649e3e7d57'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'krgg4dyau9u3q6033hj5'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'wum8brb66g6hr6cvlti7'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'pmw93h3bktdumuq50nbh9otifh4im4dsuzj7t30cpdjljz7l0alkqlxqendx'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'uu6psrcy6d419k3rpx2y7u7dmzh2ofx6e30ruvjci6nlidxmvdo1xsyv5eg9b1nomfq29k7fdtiqpx2i4fxt4gso1mwem0o3e8q2zga509t7himhf83cca7xs3hm55e0m9e672z4ddcitk07pbdvxjdlry9ips1m'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : '7q8tinu3dsg8w5xg6u32fj7l3bpbi2ccg98zzo6do44414pb189n9vmc8tmu05g2dl81u7dthsd182h9zlzwpqo67mrjexx3yaxs6ytk7wxngn815thkz1zcodm5493hbip2vu75sv2mj15zcjt6gy9foitqfza7'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'bc2yqembvpbh1qpq01pz5nnfum668fj5dabrloqdrku8b8vj05nx6w1n14rtjj9h3w191h54dw0hz56wnsvocj14bjmu47mpxap2u4fawn97j3918ub5hn10prsymi9cspjwm2ufjjuy6u14q27z0hsccx5ksq4d'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'opzubc6f45huok7h7ot9fst1fhnjnj6j13pa0o81haeq3ehvoot30ycx0qkodlkk7utaa4zz0u11o9qg1s96dwwg7oyzt7udjgx65sb7hiqduylybvb9ase0wz73equox1wj0wykmysoo5zmopf3mnhpwwp8hsg6'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'zyxptqq12v9exkmrgd2oyopjdsfg2ji106ih5byvywyujcu4ghjkhprq9rj13edj5w8r2kppc8bz5wo51ty420wrfkcp5fj3rt39cdtbyz9aqzj2wv07ksxwalzjvgr8sc7im2b2o3g4kysrdijdria0tnufn5z1'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : '1fyxc1c1wv0y0dmhfjpc'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '8xse09fcrs8t661zosu8'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-08-31 00:34:31'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'zca24t6ui9ejzs6imwzz9whi0lnsoiuj7xue3h122lnuwigx3lbqmhjr5d138egdf4apwccfmktlearevp4fazbmsi0bdwrn2ytf2n62gns9k3sdh0x24inendm02bdefooeuq6qm4teq790j4mm1quez1y3zig6ibcm6bdcxli00mhrufgop8csqmhfrk2zffr44ufted6tn2aaqlx7yg4qrlaua7ji0egpqwabky6d5ngbw7tds79scsjkv6k'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'atppdrdp59cxm99hdzhyg977owl0540ga3nj0bh25rhi7r6w9ydhdne8l9dw1qk9l0rgf3gkvj9nrvpv8hrf36fcrobuvxsra51687qatfdk4vkt7rtvv4cs85mhb5ctenwo6l2gyb8w4q6kyftfjyrxqeqqocgj65oss5dmo9u3iumg2vh2xewtxavautqm3tg9pr6gw6w033t2fsrkf5pqelbeu8so86o0xoya6fjgwihz0zvfn7l22xsut54'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'xjow7swvekkcr9uytkletirn7xkukgjq5h64job9dzts6ra90z3qhe0xlaok'
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
        example     : 'e04f8e03-1e3f-4d08-a4d0-a77e4cc5e9c2'
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
        example     : '2020-08-31 07:26:29'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-08-31 09:08:46'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-08-30 21:05:43'
    })
    deletedAt: string;
    
    
}
