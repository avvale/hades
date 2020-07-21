import { ApiProperty } from '@nestjs/swagger';

export class FlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'fe52fd6c-2fe7-4ea0-a810-d1103fbcecab'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '115d69a9-fab7-4051-9265-75375754b2e3'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '709c6586-cc95-4d58-b738-eb8c23e06b09'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'qojunl3l5pbz3gy1ly6w'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'i46i82ob8kjmmdtd2muwszwkvh7uoex3sk4s3qzgpyor5i0b8q4uirjiw1ms'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'l12lojjzyftztcozszrd4jiywmrj2bibq5l8ezgo1cl8rvyrgjfvhh30c0drj6dme88v8pdm9wms4aylzt7v3pnodc9oxn62il1e2b5omc7yu6qi6zls35vpzmfboid8jtofri2i2053j1aj2ve48ncj7xo3dbzn'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'c9mzyxdurih48h9po7ugafzaq08kldu94yb2b7bqbkwqhj54tbdse40o2smcef8p0fllu6hmf6i3yz7cnmm0bcmb8qj8l09ssa29tzxjxzrwuws1kh9k9worpfhsmo008wfnqt2n6e2efqyjv2ld27ghcntj22zr'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : '2jyrtkupm0fgqjoctwx5u06588y9qrzwpz0x6sii13hqk772e45sy0gd269n3jxva3qs5ulifafu4yrw68miq1yo2l9vrsddepvhn1n56j1wgeazqvmcvs7k6a70op0sjrvz7redz41cl0256illpauxb4253czi'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'n1fv3fold51qo383rs7xk2m6ne3x557w0fdh88pijrc6cag87chkkz9cu4tbgm6mfhn8zs506djk18r2up9kib5cyt1i5wbd4pgfjurjt75mimda20pjm9475rdntuyfhna9zd5r4ylimyvxotp9bno3ynmqbjzi'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'jdjtg1ktl4rihau9mnc99vzvx48zx9ma7n668d0yhc3z27bm56vrqdwby590y30s9wua32n9dawtr0awnhymsipeyh2e3f0ip1jiibn88tqwqt5i1wm3oddqpqurcmluho374e2ltbzwvyrtfzmbtwzhwqdfu4yf'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'z25ycoeb6n2kje30mnw8'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'kxs71bso61xl15eu5pzc'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-21 23:38:51'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : '2p9crotk89b9eq83bq4kqnl511ybiqi33v947h9yk0519ot3igyczzbd7i1z9ifgbhffr85as6zki1yegagmdjgwm776mh0l34y8ylstnyzwd8q2wljug6na2qkor853wa00zgp7psapznrzmww3d8ybjhsxzjjxh5t9qqt8wtbky8l7m500v68d8gjv12wwio2le0h30w262cuygxtt18tlgmsjoryfa1h8p3l77ml5tcgcm9ilg2tr63rhiml'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'omne6q6nv8gx82ftdbbvu2dztz3n56e972d3i7xk8k7tn8v3pxp7bm26r3det1o1co5sqseikucmm5fzqnsemacqtasv61shwrnlp8x2urec2cevz0fqa2km00psdwpyhxlpzbn89xaox5yxnigoymv5hv9si3cwc1acl4zsrkv5679f2eerbi439j4zg9e6khsfufdi2xnkcdo7yv51ccym0aql1jzdm8hslki3bsbjqgglx8k02p9s7niciv8'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'mka3eofgdzz6mkpg1zxqwmwa5utkcw9xlkw93m9la69cp8qxdfnrvl074kf3'
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
        example     : 'e01330c6-950c-47db-94df-596b83e53e55'
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
        example     : '2020-07-21 01:12:04'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-21 02:56:49'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-21 01:42:40'
    })
    deletedAt: string;
    
    
}
