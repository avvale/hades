import { ApiProperty } from '@nestjs/swagger';

export class ChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '5b0f85d4-de3b-483e-8d47-5943196ac792'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '0ba7dc83-44bc-4eaa-8df7-16acda49c833'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'max4k8xdcuannkfthzrq5l4zm9jfoly69u10xglqar4q7klj24'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'd84fcfdd-607d-4396-81a1-7d832b23a85c'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '2mji7lfa6tbix7kk9n1r'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'vhvza9ijfjfh50mzpad17ucssx2iva887kp7nft4w09nl6m31570w9xfnn0maiv227wx976h32uh12ft3hn6jorp4rpwxqcmihj4dh77dxa1nb6gx54linoady28kcr8n46wixtdom9ag3g9shy253zfwkf6qait'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'i85u7y136ji0sqige94z0f8vu9zrqt246zh4wle6sximxmno9m0v7lm08lrmme2q0lxjor03mcvmusxd5kb40uxq4lhl8zgbd3vp5tv2fn2bz5l3hgi600mki2c9k7lurejj68y5oskeob8x49jdthqqyylnhm5b'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'knp1ziptdz2ejghvrxj8ibbojmt3eg5s7ef44imb11278ui6avaigthqdrnkiizw96il9mkvhx0oiap9hwmkts8djmo8htqyjdpyup93f277varya2fu9dge7zkhc4k3qye1pjnwqqizx4kwjhgw6zpc2n45s8w0'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '9fc4c1ef-349c-4ff4-a507-4caff97516ae'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'y2e6fqwpmw03fqtxq90pe3bx1uo9i4cax1osf6hx004ozgrorbeweavmxldpadtlc93mvl8gsvti372hs6mnpyaz5zzzc0viv1gtocwqswe8cxxluo5fdsd9fj35u7z4729kydxy19gt82il2mddwoa6e21yhb9r'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'o9z58juatl7357yquk2awgfgsdtmpv4zr2qfhy3e2uapigq3bfhtm5xx9hk0l55jz7sy0c0aywm5k9lbt21pn5yjxlir47ff0kh04tjmbbujqwteiyjwypsjm940mioe39jywpkd107xcz1dgb58pcrdafpj03n3'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'yv6dj9xi3dre9k2q5bcpbd1tlbdzxg7d7n5l1ord9r25ce118t4864av6tkxej267jtayj9vkfr2lowp6nch93d3j5fjvcdadw5u0hpea0sqm2ok4g4kmokrwrvr89uy2ung5s33vatmo20fa6qj682fpefsn0on'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'bfr6m159826aanxmah0gwegdmmmkmnjo7cfdfxwrsy4dn0idukq6hyqaqzskxj3dc698wrdvlj155biy5wiwdod9myuasd2fu84al2tsqrd8dwos36d9mb8utgvhegve24diptlgxmj2ozzs6r4ricomo4tnb2im'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'hymt9w8gavozve5fg5r4'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'jlsgs2juyriwe7bsrlmbjzh4r7aa1tmbiqkhzdxecywrnj9w2eaf5a8408rd'
    })
    adapterType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : 'SENDER',
        enum        : ['SENDER','RECEIVER']
    })
    direction: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'transportProtocol [input here api field description]',
        example     : 'ebgjmu356lje7p3yizxrlyw1cr2kqqrk18wqu9c77jbqkk56nwxw2zylyk93'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : '1q2s2en39t67thzykeenwdi083zkv7k3om5ogoh2ir35dhmnv4izxp43ypra'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'h9cutp6iv9lai5lezfzovucesja5857ku5n2qzer46xi1uwah8yrpcy6m89jp5gv58loybu0vhtb5rjhltchkojhw9ouvbeww5djmtf0f03ww4urhgcq7xi7s2l2p87vsiwj1qo9hi6seqfjl8nb8umw54wz6p14'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : '9gqt9781oyeimdwf3zlh1kyvstnjorhkfdxohtlv2uuoim44ilkzbetfg8jh1q5s5sswiyrst8ncj41qc7syvjbmkn82gqrpxxzmc2hlgf114h99o4xhpp8d7u0onv82cxxf73qe4fdcp8qilinugr85nxdeoqa7clnpv9melvnxjzrtqgq5aionvcjs6hy7e9ctcefdsagwv58dywn5whawwandukd41duij2xk4nvkr0vt06zmr2fisk7l2exej2wxxxo8z742ytc0di2uzvyceykmeuhfezzp7nipjwk799josvc0mnc59vbzvpun'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'je14l906vjwatznbn3i1bjwsznel6ux054op4xzdb9jnny6jenv4xqwoyve7'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : '85a6o9sj306q83x7krz0gt1osp43q6p44hsl0qbo3ad609d0hk0zqkmn7vfm5nhrtt07h1y3y11wmcv3jfnnkx3hzdznva391p8mty3k43b264v763kcxwq445oxqeq70kr2mymg2l4yw8gxccyq3uspoeudlukf'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 2516549174
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'rs394zcmeymxx5ffjgdxr51x6uy5izpdi5rc4fy1p8b2r5glb72lo6vgm1jvwrfp9vcy5txupne1f4khb70oesrutwghonne4qvtlzubap08xwk30pv3yutv9z9kwitzo8elzpi42qp2yhk1sxw5fgn6usyo8sa0tdb4quv1jn5vyg3pb8hrnz105se4hjjwqrufgbks9cl3gxi03nuaczbyt511dyl1xhfdsp99ecuawbiotw18hkzwz93taf1xkhaky0i6yph44gsley3jbqkyktkiv9j2ix7y6q41lzku515f7o2d4ta2c9ss12z4t2x73kqb6eoperxv1pd3acua0p7ehnjq0cbv6tilp0pdfdwc6acw0w7i8fybtqj3goimrpzszzxhxa3v1iciid569pn7i62qa6v65h0x4mea723rlwykc2gns3cpf74nvs4g2bvtzokpkqm5lcp5rx5lys6pz5xovqwc41jhqrptf9m362697fgvygh5fnuswgtvrayz573ezj7kzypnf1jswj5o836b5a1napgx0f7puj8pwghdztz5kfswbv3524fco46a3pr1b5eszw6hwqg143ad9jkbbw73vgfa54x2kucz8exrohwhpopu59m8cossau817tnz0r56t7s5vbovaybxhyec206xr5br4kis6e6fgnnpoxb5tvcp8t0nkmgcuied23e863i1rnn93lh96xs5l4ikckf2oml0rx1gz9q85szlpewfvlfncn74nszs80snhui4q8xj97l5qd4q0o09ahcpr2gqu3sc0jg049u7dq7vjdryd1lrtm6l1xq1tbyut3j186v0lhg27hmstma5f4oby9ee77oxl205xhnx8ifvtqsf7n2xu6l0g5ox5ov3ib8wqtng4922fa148hbtgog5cdv7bae7zfbciwtn5y1nbjtejrtfre9fq9p0v4ktw4qaltfjduxi4chzpztjc92r4yaxf5yn33ca7n7antia5xvptj8vlk3n'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : '6h0v1umr96wbbdtmnu0e2jaqarn03eenru2cwt0c32sykw10c2vwlfey0kt7sadnzbdrxgkjfv5h4bpodtrhnqr7wky28r9rrbgr42g798ulehc7hu6z5nkw8ucho1tkeikpcna48e6ym0rn84rng1kbkb1iknl0owcn9z1p1gtb9gw6mo75q539a45pkari3rm6lj4orx276ow5ip380h2f8a64y6uw5oswxq6fyi1g88du5szvx7plr61t0vnvo3tyzul8tkryldkgdfj4yr1tx5fu79d268yo3ivc6zgqhtnparrrwh2sp9mcw5rzh7gvketfv2q5zpc58syax6hz7i2rfw7fgmzt48ha8qnv7ia7e99qjpzi3i8784w3rualr44541m49c0fg68uetyowfcq2hjo305f174y43f716f9ylyzwlh73yxtt9n85ppaza4eqn5ld4lixvejwwyarr0k0y2td1oh5173cktjrjl5aoho5sll4f4y36hnca3tk7masyxhluzpe9by868b3fuu5r6zrcdbk49ilbi3e11jdyh3go7lo980la9at1hp5wrw2uha8ry0sh5u6m34ln1zwt9zyrdcwqpnvg35g1fv4vwxqem5djh9l2agd2fs96k16ptlgz2a701kcjyyawn6rtfb4jj0zqj4dbja3f652w1g5alejnmtoivlq81mxclc14ca3z3ledsk09tgghioekhq5xkj4oex81h4jfzwu7bcmg8ccgits9clmq069ccvbfgsr82966xfsvqta2d4o87wc6v8cn2btdt5b3b449r63wtmlmd4tfj1imwli77uh46uyywxwsa86hoias7ydeuk0w70n6nlklp4a2evwbxe1fthu4xq8ygnts65dzi2b5wphkggojv00qwnm96dz048tnly5437q47kffksq1bj2ooxs7w851uwvr46jljsv1xk6c47u3ocb07e02llqvp2c6aua9wzu6dij1vlt9ud2zxaobid30te'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'x2o340hhlv08y2c5vu1tsz8ubtr3un2df4yd3cmj2o8nck8qk0nk0eqokbp1'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 8698110130
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'abjbcqsjtlpmfjbs39y6jqeo0283hr71dts2o60qxxhyfe9ju8hsw29xkxdm2nza0517thb10auu8prsj9sc5w0muiiikph4b31z8vlxe76cq1p9j3um1s6wmegw50fjnn6hea8mi25b4xjnfus9tg9wklan2v74'
    })
    destination: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterStatus [input here api field description]',
        example     : 'INACTIVE',
        enum        : ['ACTIVE','INACTIVE']
    })
    adapterStatus: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'softwareComponentName [input here api field description]',
        example     : 'dyu1sckavhky937rybs27v53i2otzgbz8u2z64gsbu50vssefeirgo6tsay5fh2u6m8gxotajr4nwp2c2w2ydx2y3rd8y43pbxzrw4k0qg3myda5v2efj2pakhp1raaggln2eig9l3nd0jlpsm847v5cg1r833my'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'k6fmwbmgdqjxlk28eblf'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '2gd5m0rr477bemqnrml1'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-27 17:49:03'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-27 01:05:47'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-27 14:43:46'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-27 11:22:04'
    })
    deletedAt: string;
    
    
}
