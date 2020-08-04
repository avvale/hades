import { ApiProperty } from '@nestjs/swagger';

export class UpdateFlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '19c29c1c-2b1a-4374-af5b-9b4a8c84b387'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : '3b8tkz50ergr114kqbpmzrfngmg16zz9idsyju0x'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '6859cf6b-6ebc-4a1f-8763-5a69c33aba5b'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'jqys50w5gdlbucfdqhvuej874jcbgawuhgoco12ooah3rfl0lb'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '4a20b716-d5ba-4ee2-80de-084afd7cf1cf'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '5txlj92aliuosz1i50em'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'p7gytfm82s65u82vhw9q'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : '7tmmje4qzss7ukpw1gjbrzquvjdcoty6atlj2s18p4fer9ty8ul8rvltjlmv'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'd8u8nmht0vng0jx585oyenfkxh3r6si7889rddqceom3ezlyd3oe0n359hne1wbd69ra70gtlk3f9c2bc54jwimhs3ntw96gbv0ss8dz67gkt397lm6n8jfvhguvctq147h98si2yv0gse17a1gpe51ql3tuso8c'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : '70den95546hh0jyvkdol3lbzkoq5rvnxzlrtp9b02seka01hbwsxfmvioubgtijsikjy60wmbsnu0yvg034aqvkj9mm4pcxbh05zdatducixvo5xnxgkif91lnhj32il1lk1z2gkn6e0nzdneudy9nuuqr2b3wza'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : '8ddr7yx01u9ppkwjwcyhidhhc3tozcw62qt79audxajlyyhimsi0aim6kgbv1fpvujzrc4ruervuvccrziyz478nbscnuzp2tj806luuqomuwj0x9az38exelphzb69xfuwy9uivcqgcixxph1sbjeuj10j4fv53'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'i97t3efq4ypthbmivyrhu3eobdc5cwh6o9m8g3eugpwmbii2dd69i1w8gv8dlf58dr0yg83r6x2fltnm8yko6jfcexqk9taiojc1t7a7s4jfw9itk3tkggwmd2xbcpmenim6nwde8huw3i50psy77jeh366ibqzi'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : '2ep10pvu5ftzyop9bcpdjhrxpczd3m374tqwdk6mmn5kfituqm3h506xj45byqyuo334hppuluznlaay70bokyrdpgv5ub1pgeavyh45ge9i7zu0pp8mp5pxalee5vg01utbbqeglq5qumex86888tyf63k3ilbp'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : '8zcrcj2lvfz8s850w0ka'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'klhwy68hxbakjvltwq1a'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-08-04 05:27:21'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'qdt8gaezkwa47brmxd3w9421ya062fwsak2hf5mf1gqam4l2a6khqm08goyxgifb8ugvulab3qenaqxp0h0qmfwshyk6zj9s2sv1zuh1weyi3pay204070h8xnnfryejr9nz9l9qyjb5iy4odfs0ae0hiatu61dmhalc1hoj9j0be0wbxrteeckftlo336v4mxyqp17ub6bx5jwhlpkrjtav0s93a770gm71s4zi37gzexuumvgx69g357h8a43'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'v7a5ldz1x60ncrz75blqo9q30mjl83lyyauc6oywaj162rmzb52kxw6bxycu751rqbvemaw0fpb01qck27cugsvkn4rf0ujb5ybgxowtqw226psx9f4si8gto5spgpeva78fc0uc6n1ntj8o5x97rur7wrq7mkjrt747t8oup13fd2d4kmhr7d3skrcs5i15dzfxotwvt9xqhppscod8c5nej3j4o487ztacga44gysbdbyjyx2lt2f1f5j6e42'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : '1er4wfphnfmbr1cgfo6bkbg7jgpq3ha8sqe8j7xl53r4wk6izwfs5sx38s8e'
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
        example     : '6c55ada4-0e8a-461a-a2b1-63847e5befb2'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
