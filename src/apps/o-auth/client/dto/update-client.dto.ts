import { ApiProperty } from '@nestjs/swagger';

export class UpdateClientDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '8327d549-c4a1-4f1f-9509-108d5766f49a'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'grantType [input here api field description]',
        example     : 'CLIENT_CREDENTIALS',
        enum        : ['AUTHORIZATION_CODE','CLIENT_CREDENTIALS','PASSWORD']
    })
    grantType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'owrauj60rlwt7epdwgu717pstbfzdq1i56wcnenrvvna0yumddtxw2om5zdzmndeej9p4caa6vgofz1jwqpkk9jeafpb23j0njzwgt9r2ugzq1lcerig5im6qis05urt6jsrmq6c6mwfnr0qm2bdcsnvtme7q3cw67aim6jh67mm8wgbqpgc1q5t59t65o27za0n2p8ypd2cxxmm90efuc9gix9brfcf1axn4b4979dpkxyr8rm27ie76mlx7xm'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : '2bu7rp0rod9awy56nprcrh8on6lsfcu1cfc32j34h1mgj23s4f37swwssti4i34sllxtdn1s4ebl3vj3ntizfqthcn'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'authUrl [input here api field description]',
        example     : '018jlv55zevehhxvwrz8gbp1nx97dgjswuqelclvaf2rp4c9ryijvsrsw4sz3w9bzv78hbsfvl7jylnb0a8xn8qahyim7y344zstgrgh6p7vawkhaa22ngeh8rxux0j8vyz7cnkorf51sac3u5570xcwk2k4fbivwdid0j2b2za0jke2fjj7bg61yzlsspckigdls2qdkv08hie7cavk8f45ihw9z30rwdcqxwgxd2aile40r133tclvmnd0popk7rxr8axc3ydvnaiqytusl62yc09k909vtgaflwh61y24ap89u8jfbr3s6b1jf9deocbe5gu20ruk4lwoppl4rotx01kw1aogae2rm8rngn3w7ddca8xws9ozxp6ejkr8cjksjjm5vojtfwpp3crhzccj6ibz6gbtyjzn7l7rhn0frk3fg54l1swhad9134u1gkq1u43bfvrk0c4d9vlbkiy4q8rk9nrrtrvbd24fzeip8oekyxutms2e6mhw0071th3q909jj13i5kovcyuhar01zze3o3hd8rjm170p6anvz8boqm6fa1shvm427af8vlapt3z9z0c7ksdu7agm6a7dnwvovzxcmt3t80sa7c9j835z07dgf44lkaauddjytg1pwzxpqlyllmfgilei5qlrxtl5x9zxroww3k6he4zzrgc8lnfbdno9ft8vbn36p7et9kh9xnqjgpj8gj7rodxgh0hbsp7vn4ujao3nbbjefo5bq1oxsxirsf02tk5jz16qius1wki1ss7yzmjj3kb91yqqwjcq39spe3rh46rxnos8o3asp9b8w57o0qfkghjt2pj21ugp3kfn1l2niyb6rfixj0w4536apfz8zb4tgnrntfaj90tbuhanr0gf01hu6xfscbfkr4kg13ccrr49h8h0hutwq850xjmcyxy1gxwpem3i5u9pyesne6h3b5f5uzks9x92t4hdxktwbzvc1y8anc2zcvzk05wy9yshenu4bsc7cfpcr5q2slma3koixkfj1sbnye8xz06dtrz2qy3v1cnnzmywgz8ljyy7ecaq90zzn9t5yr7vhsf4s1fpkcodalvnulr3a6nbdqj1dikqtj9dyg8gf5kay7dfbd1pyflf34s2umn3ogcr3ncno6cxdrpcdqkyyqwtxg295w34lesuibk0onaaswnqiaor4miqm0rup0tuj0ubyw0e3g2l2zk1g5tk78y48zv4rnndsyilctf0v1bdpkfxykvc18o91qh26bvr9hngsw7viccvpe4ecihkx4cdjwe41kmeiqhixvsx5bk7gdaeuetw7zlq3o6edeg10x8elapkcb55gzb6rsb1trmxyvwiwr3ev7zxizpl29buk80sbopqsevygfmoq114bhyinrsp1ajwaogcni0pjjhlxqzchqz8a74yq62xcpcmtswih7cv5bjdzs2gxfgbo2aaidoq286ixoh7dgr2iotw85gijrw3bc75gig1w7pjpfoe1l8tbe0nuxl2yk8h4n9g38362b72e4fuggqafjholerukq85493eqh4l5th41bfiwv09nuvwvrv3k7isn15webc20u8p6yxlw7utv0d1u30vzr1d02ocdrpaz3xh2lwqu1ha2wwx5dd9xsna77m47a92tdukl77rkt41r3rbk0a35k1xrt1y0mu782bwad5c02r5wxrbnl4wfjm29kl8g34hkqt68cy3hszmon7n31pztz3anmlv6fk3rfherhpc8mt4f2qpugu8ystmijqtlr427mdivsx02sokn1tvhiezlpkcjmaleztp3fduucbfinopdacfgrzo46esdmxfbtt1hpwu7bo6845o3txl7ze6t32udvu6cic6dynu6afdk7qqjpp310m0pm0f2sjt8l4so2ybnosx2evg55i3lvga3kmp690uctvn9iatibwjt9d0b4ol19h7s253kjcojw4ub8zfhv6r0kmlu52k91ieva68m92bixapp6kf0q1b81mbi6divuzzx4gh8045'
    })
    authUrl: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'redirect [input here api field description]',
        example     : 'mwsbtcww6d87el4a9fnjp8hbbr5vrlcl6cn9txiuljtgfeui2wix4fn5rwcvyk1goe6xg957e4hc7ib2cjsb2p68a6hw6jlqkyv3zarpfl68kukaudnmyt6hbo4g4p6c1h0zmzt0jty6l72teaqswmvv4ef9mnrztva9xrl7slfyw5t5m7ajf89g3h8y7y67syc4k794romlgcnx7bqvdkwf9siafcw3oog9x7y5jyd66tipbpo5cuoyb3m1s2cp5b6ctkdcecbgvqjv5sanlj2qvfhog1lc9588yqbq3vt8396wa1thbxoyr850ivhf4pp8djx7h8f7evht8bxqngmehk936y2f64ppu2nyuy1ai9kpvg88dwv2n201csgosrlovj2gmkhpfchiwi5924pol5zt209sd17bmdz365gv80grpzy8yc2kx2bh9m69ais8wu498q1tbfp5up7kl8nis46h7jmcrvtnmeq0y3nxg3vjy78r0mhmgyv9qu0h94qa8c4ivagjxxxx49i71vgtgg58zjyjpd3jjvwwnbmmwy9322a4q2d37ygz2rkqj0axpgebnczml72u88mkgrd6j5vr70cfapcjzst27bwiivo1z78oixy4bunuhn0yxn3p320y6i3nzuwf2g8o4fjsyjuy9wla39f4xpgznmaucrjxvo0gyph58iyiwzx3s2ma2k28ipeuurxuqszrg7iv6hr0bjq2fi8xasaoy9tsvomre5awphw5482uk9409ncp7i76zck9sj96xcsdik2lgbsrv3uy3dl6v9gntsr1je9a719hgse61rawhxqn3famodvasl0narub5t4gis91fvhx3b0bmn83z3652yabmbt2zlt126e7700v09o03q6teipfj7a1le1bv2xr6bpc4liau852ricwykueq1e2uui8naijqpeehw8nzr4neb4xx0dbogo1nioqzc0cdt2mjbtav9ia2uxx0ftad1w3cm2sylapboe6iweqpw62qt3vj9i35c0fo2xr5kmmn28kukcfipgt95bybaekz57dwz7y1u1o3ylwuwqko1ktuktj6olyx9m4u23pez5woky73untv7557mxzuc52kdbkn3lvcmxu5tmlgvj2lpv7k4ztxrpxraogkeumacmaixroxsah8uwjkeezgz1fv4q2uiz9am9fvr78bqfkx65rc1ws6ng9rkvc84ff67qvdwkqtab281pkh06maq0k760psv3il1lc91nvzhdggyrejah5apn63sveo3fud089jlo55g3wg2k45bpk95eiucvloyijo9vxzd9ibfgigo76kzp95mgdhyyuygtuqopjnn6ab0xtyww3qrucan6xg0952b5extrg46jetxtu9wt0ty839nxodw6vhpyrxlvb73r0lby3mrtj3gs06h516yr6vrjbgev0ss79yn95f5ad07v4pi00h0kdzkn9hdpd16hhjqyta9lv40e8dwxvsp8k1incojdtb9h1thedz4m9ewec3g02qvqunhy36971itaqem5sscctjd20nt8hjwu3urg60bufbe9nhrtrzjabcbt6op366ysf0knorqyr5wcopgwem3vapk320b3v18zw7apji38zhjjppu29lg1syujuey56ydnud7762kkc3spvjj5y1g9bojrzhypbtgj8912fnsvk3yn9lks4d2bquimooinf3qzu3gsn3dr5fx8zpl23o9bnmicvwr7ju0zd6t5xpe57osrb1i9pnpk67sb0psz4i1oytfbdl2852bzumxvqscpn6vvzp9umx65jd3evn6ebyqh6rdz9iplihb0wgq0zjbcxkx3opyscoffrvp0wx3extkthnr2nertzwg4wnl1to5tctt47oppffu0jihdvg7wpbr2hbbpx9cq00wzz159rbg1x1n6m4h0ky9jm5i4xrtica8prnit0mq016dsim41v2hk3ew20mmbdin9kx1eqd3o1s0g8n2nihxtu5qdzx3yy2mo6eq32'
    })
    redirect: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredAccessToken [input here api field description]',
        example     : 2870738741
    })
    expiredAccessToken: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredRefreshToken [input here api field description]',
        example     : 2549428083
    })
    expiredRefreshToken: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : true
    })
    isActive: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : false
    })
    isMaster: boolean;
    
    
    
    @ApiProperty({
        type        : [String],
        description : 'applicationIds [input here api field description]',
        example     : '',
    })
    applicationIds: string[];
    
    
}
