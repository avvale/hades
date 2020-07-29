import { ApiProperty } from '@nestjs/swagger';

export class CreateFlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '0cb0483c-8a7d-4378-b026-f78949422144'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'v8snrajxpdz7xl701ll8fmvbt8hyd7vun2etxlia'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'c7e37d86-9aa6-4fb2-afd0-df883496803f'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'n1x8fqg1fhywrb3yfk9modp6n6m1fzr282rpvbu0nu2jrdr4lu'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '1847fd8c-663a-4a25-9186-564787c9cdb5'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '5epmcl31z36w0vii0m7h'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '8k9komktyvzpz248tj1m'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'yqzisic90uwkxkzm27gxhxlr8khsubrqiw3xoezsp7h25a1kgccefe2lxeco'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '18q1baa4pvuia6lcnywodbi4i0mhwaknccrnxdnx4h3hfgywuilwt0gqlfjrdy90r90gfr9xxk1d1z5mvnvhoz0xr3t2yykjo0z66ia74kbq2rcof5yj8otbbg2dv432c4pb3grl64nx4t3r2cc98dcvl12917xb'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : '4i1jnulfqszj5gzw9cqkbiv8mfd2j8u7zkxjvgf08sdt2ckt0ti0hz6bu1zwwnuerhodwh9pkns1spwf9w8eorkgu0eiav1da0pwihplujuajw1hfrnyzx6ykzzckeuh49alejiqvyw9ykqpl4alx8ae5ck2r6a9'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'fxp0lyefnxy08jhtr5wjzxvf0ygadbg29bzc2peskwu7t4g5jkvn5wb7p561bhcfrg1fjisw2t5f9iv4jhxmaiftbmf1l1qi9srjjzhy6zy2dx3quo1reijxjo1nx5aak441dtmyf3r9wgm5dz6veyvwt8xzaxia'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'ubhpn6pkxhqk0g1fqx44pqayn06lapuzc4tjnz7hgrzgyg3q4wfyv5av7gpeo8iwtp08s5p0gzg8o7orb57mtn9u4mzp7e57rb4ed9hfur1vq6m4s717fyeqkfjhkko7xezyj223x8jtzw0jbgmttc0kv8ex2ze7'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : '0w0t5zjif10y29g4yqrpx52a0berc5w8rdho1672luc0jgr0wkejmnvkjeyl28w9mcc5swpb5j6zqmd39lqgchqtebcixt6c87sf204munarrnq1n47gil5ouyd0svdmd3sdkyxg6ddc7tnzg30evdy9dijq9xa9'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'sul7970pp9imxewg1k58'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'c2lnxcama6u9577048lp'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-28 23:39:11'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'x2i4o9jz2ea1hsezc8w2447p6eoc7bz1q3fsh492yasc0j09cax2lwdt4h3vaw6vzfd5sd9cpx36ru0cxo8z7j2xcgi2c5b3ztgbxu8136itucb354kakgncet58f9ajjcpaklw4z0brtj2wpsscwvmv5kolitx265ect4gldgj2qzxi4kbcsh7z47k2t3ctx8pd8og9qikmxbpoecotue2pi6tned06ggsl3qyh02d4dovfts4gfesbl59ili0'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : '5f1ved8ku3z2bhg9g8snxhvrsj6vsai7plt9qvs2nhbt7xduz47onumwpspq10m3sbuvnqrhhnt7vyba0yh2400zzgqqgadtie5cl4t9mk3h7nna4wb3vflm4qx230c44gjiwvasrkdpoix6sfdj25goai7d1ykgt13vn1nz48vtjl1cmyay8uhgndj0l9xkndsyoo6opxdui5cgyomkbf016msz1fjk4vs19umfle41hst9d5md2b1fu6j5q5j'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : '03g2kve54n1tx6tx1cdxzuoap4t6e4aot94cjpe4ivi528s34bj4zbk7wemd'
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
        example     : '3fd38e9b-2c9f-4e8f-a0f9-383e9ad09b1c'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
