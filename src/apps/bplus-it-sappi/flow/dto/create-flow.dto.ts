import { ApiProperty } from '@nestjs/swagger';

export class CreateFlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '1e830191-6cc4-4500-8bc5-1390347b5b98'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'fd68f554-6eed-4217-970f-0bfc51a4c4a7'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'xp1hnrnj43cdvqpkgrv0g5s1s8ipjn2rtcz8knmjyb2y4ig35m'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '5b2b50b0-ecb4-4fba-b688-b086e9d66d2c'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '8o6zoekciyo7gkxzs99o'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '7557mtbyenkum5bjdlmt'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : '4lzgr1u4qgf7cs82x7macomlk69n8f5fem7t0ri9c4go2jarmgp083rqo5t8'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '42d0oiqchqny8un0sw0con5ibf6wmwlog1qbunj5vj5ebi8z4uahyfsgtnitukb8oa80d56a0q3zfux9xfof99vzas7zr7vq0vto0y704al4ccs505608n26xvzoq9z6x3et009kft5gs6z3ms17vbe9zastrthb'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : '7r1639tjlw2h7rakaqw0n9tgp6eas3u8ppcmk9d30b632d3cvrd5k610gznoaeu68t493rt6ourhtj3qg7vt0x1vhiafpw74fod9jdbirrxwfdccusnkx9qtu4ojgf4znauf0tpghgz5zmxr669aph2ccptlpm6n'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'ufgg1g4me6jw778pjpwynyc1ltqprxrdyx7oe6cte8rzxweeijamrlcbj23lge70oeum97sgs6g0l33zez70yc29ym6algleec28cuxk26dk6vawfup15jp6n66wqh4n4z310dniq48m0vgkqw3n0xe2m0aevnbq'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'p7g4wxq4p8n047i81te9mjrgixmnwt9yh33i5o8qkacua31ch4jygwgqi5teebkhrxhurfnjkblqsmcddprerju3fl575lc6xwd0yrpsjert3u98itxrmttjx4ox5u3klx1p5rpob7s4bjmfds83blewp0sld6h7'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'ze83h0sg788huzohodp6qx8438upbi5092mowgs0yvrh1dsmqt5m7k0wy5n8aprg04w5zy5invxqo9zgf7r25amwsyl4rc6gkblsbinigxz8782egm6at41hmm9uuz72oc3981t5yscvvuk4ur3acytbczmjclxw'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : '8od57dja7pekbj6cd2ro'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'q764pfdhc62rrs9c2r8c'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-27 19:35:39'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'b5f9xhkhy7y4686wqsy1royxbmxn4ir18yrgtt9jr0kxoxq4gbpmx80n4nu4n5be24yxec3scjybmers32x2w43b11n7qsm24gb71aua6gvzyyaf33ualbpjdzoc64v3wgkij58w7exx0c01j1yeurcxxkomq7bbgjk8ecmnh4q2eqhk9i9czlnch2yi0fh3er5xou5uyy871az1ztlncrpb90g0p8eb1l2y7q5z3laekkibgax5bd2bm01uub1'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : '4rucw5s9xdds9lhsndt9y6sxv4j9j2nqpr8i0yiojdecu59wpigcr9dtscau6l0z098exy54i3pwlgn9dpetho75h4mx4s8eff8bzwc8jaon59zvagvmp2qrdkij432b4f0sbz8ojgtzrasm2dsbzg7yuvmme9gttjhi538dr7g50pr6t1q7l5itgfu2ry3cptraxfajrkaslrfw7du3v1o4qyv5g0v5uckxb2q4bkruvhdsj7dz6f4qhm1v4gf'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'vw06u0p8smlkt9ythx616rce5bpgldivva4u4adrkxo9p7v47p6l2n9suj4x'
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
        example     : '2e910aae-f108-4b9a-81f2-fdd2bfe96927'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
