import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '26610baf-b32c-49f2-a506-ad321f68998a'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '64b53c23-1ffe-44dc-96df-0f3488af5681'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '01996283-9bcc-43e4-9963-a18831786df7'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '1ai53xlgz704wbs273514n00rw5kkwaxbozbj9zrd1prvdfcmag6cxikkbae0tnsgxe9i66nr9eojtdlwz9hy8j7lowd6gj59jwv6vn3ijbusfxpyfr56kz7myzkul0137ie97k9p38j8fumyvv7ugukz347nxv5'
    })
    party: string;
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'cvkrr4o57dcf7mserajec8og7q9709yqtqqo6s0tie7io25t6fl1q4bxe3y1hqfjano8ozo8jx1fmjabtagrtcb31qyqrqh0wk3agtsez17x5ndgw09h9i094syek9tnw8cqobbmni6hxlla4iwyb2au62kzxg5w'
    })
    component: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'l30kto3gffg2d62ewkb6gttdvbsfn5zq5ub8mvtp27mlu64bqaiu4bg1p5cskertc60u3y73ju5bes3sdbg08swycpbou0vujre6f0ovfefulj92fe35hkyoq031ycv2j7cb390sp49rxoonwliqc7x2q0ckkdhx'
    })
    name: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '8gda17klh9wxrdrf2k2f2w3i9ii219j27kyiv9tw540t581v62hw7w19sso7gorw5h1mmjg6zabbov10fsxuif166577r37vm5okloqrsqstrex5mzwiupau1gmv8gli7wqvq00bqk3ufir2a85yfzr7awj2uo51'
    })
    flowParty: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '05ts1a7f9kcqi7v20hxp4m3dpdgtpr2o3bfafvpa123m2ojj4l9j3z1s6s2a5fl0pdpqeucvgui8i1qpbbbk0b5qypjazeqwed6754zejxsmuheq9zt6fgcbuzfcx9rgnxvjs1ivlexhhpxn48cy62pu9xtm3agt'
    })
    flowComponent: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'wkptnvydxwa79h250lcaixi799na82po11y0rdcee4dbzpvun9i0wk3wb06hqlig6ywmb80bfdpaoyqi8i2u46vx02n8wgfxru1cktr5ipbdvlakj0jfim8hor2jx5a89qktdygbk0rbzn7l7zonmmcya4sumbpv'
    })
    flowInterfaceName: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 's5qyd3k2dfxqpl53v5eh12v6ag9uf5s3q8j9is1h7gzrxnue2a4itoepv2a6q11oassyi77qkpidk8b0kkbrvpbximfflkf2riga4brq1q10gevsektz02mqxhdyya7r3qciz9riww74hf8ek9v0w0f6i7529xb2'
    })
    flowInterfaceNamespace: string;
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : '0645f5wc5d1zozgose0ejmprad0dlzsjkmofx9jfg37rsus7ou1cu0gmc7cy'
    })
    adapterType: string;
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : 'RECEIVER'
    })
    direction: string;
    
    @ApiProperty({
        type        : String,
        description : 'transportProtocol [input here api field description]',
        example     : 'x5kieenkjtvjmk95vo6y8i701z8y2p66ule26ietxzw2s9948wfd5n2x8c2t'
    })
    transportProtocol: string;
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : '2zbms7mteqf2icebtb4jm6gg2acmo2sa8wh6n91e72abcp0je82g2kc6saz9'
    })
    messageProtocol: string;
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'a7bvx6jhgqihj8i11q8l48gcvvd6i4p1980bwuemnc0as2oezycmdvc1l8x8bpxohkopur0m0am6maoe6z0i9yxfjkndrrifvrhi0q1cgs7c69t52gx5sho4ruipq4rx20o95dtrtruxapkl6sf8ykrh4bpf69ze'
    })
    adapterEngineName: string;
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'pir6nuy2zhwdaknicw611d4iisnk8yhfwoufret917b4njrfmhcmifwqyi8q3si73v53yl6fkt5ftgz9ofoltt6az1kn6ceune1n2w5kaaei2gytqkv9d40s6fduy4bkey9p5t00qy06xkl11bzsljjokod0mif0fbk3ng53havm59jczdi47tm260wu7iw44is14sz4tr3tmq8dat0iunoqkpmij7r477i2bxjhabwxyvuexd2iar4u3ua0cis5qrhp6zpeaw4sz908m4lfabw0l5vm0ivb1gg9b3ele8u1nszg61hc1cpawrh6893h'
    })
    url: string;
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'ghbs64j4v3ez3o3k5nbnyrjh1f7aet58d85ozx45zv2eybfaq0co1mqtsn4c'
    })
    username: string;
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'zb10mbba0q4qwe9uuhx57p766sie1jax4728zi19hyroizr4f5a51kw6iu769t46pzgo1z5orgyq0dha5b0djgb5up14v09odcyejf5e91rakez32t9yql9imhkydju0pps8b39m14ue6q2s70trwlfjr0tx1jnw'
    })
    remoteHost: string;
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 9593496795
    })
    remotePort: number;
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : '3u0puhs0t2wl2px78977dqucf380b6y0dd40kv8psz2cjeq9kkjmmk9dihz5flium5yey7gij4zqb6e4zlri63n4ik16390izrd0ecgj81f33t0b8fep0a275grirnq6b9ej3jfely2wxt9fg667busgalttpygci0hf4r6qlviy6xhodz6d28s30wi3wbe2mi64pe5uxujc3519hq59wwkh29l082xittbpdun3nvpah040vjn21sdpzxu8lwmtgytnpi12ju7vnlhacdklpfsnoh7flppxr78lt8q0e5m2t21hpz54h31qlzowdmpn88ercapqn0gvioumlhoyji5ig0c9gouztuw37durpqyzxq6hnbb3d657uqy5l2em1rkcpiz3nxiw80sgwbhxszfrsf9tu3lyiwwz449arryhbhamqll494cp5s6hylmdka7iocpb4ucotwwxbybxz9kvchs5lj6qnn8j5intlgx09b544fcrw61m5nfqq654xnyjzcfkhoqueoge957tmil675n24tzo9zuuj3kf6iyhpyoxxree5ekqmrni6wkqrmnuss0exx7qe3mvmf4qhmfz1rm97syhr4t2bwbgpdsupqlrc35qadiq6w0knorxnveer8rip56490ue4m650edpbaquk7bviarjmh64s6vbmb3dr2zzdukma8ixs9w8y8zzjpc1obw1e6i3v2ro02mp8hl50kh6qfz6cr3yhhinv208gorr81xctlzxb7uu389s4x3ctk60xdzerdvn8jtfwkupmj7zpjau4g4yaffx2dog85j7i47zc4orjkv7z97l4jml8yyt2knyb4kclbkl4bobbunuo61bwi2zpf0berizfidyp44qtqi5qu8hd3ludbsfvo9onwa0dvuraumv2dxdri13rsttwxfafs4b3u07dgqhr6e16971zrv9x0jndp7uzpl15b77ume44in0t3lg7cfpwsbcyxdekobh0tmi4nheilh9550fktuz'
    })
    directory: string;
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'gyli0id99776tc1l05uoq07xgbquo0kspa5l7n23ao9lb2f08tf972keolua2o1rjr2jd3gd4pet2ggijytm6x9zcwmd9zssfqztaflvcbt7lehzazhqc2gq8j0lyseb6meo1rndkii04aldsyvpbb27n0h6jutmhchr65rnfxta931eos6mctenfhcloi2d3m36xrv4w1t623wmnd514pzgo8nxnmybgd29qkqzs86w882tvijbffblnjn8uny060mq16mzgizjgjmbdbgrnv82517t6hklrzpb1qi3zhqzcgmvdsgu1sbh6qjflqrmujkz7la46c5bu11j2tzq1cbrb5hyyi168ml35e7n2j9fl9lmj1gw9sue4gxtskwf5ynhmin05t204wi7pmts5f7z7cdupgwt3bfyyp2w4r5ux4tzeitbdzaq0ruy5smgjz5qg5b4eh3hogv93zuxzrl8k3zq6f8n4j541fsj6zbj3yydulu7xgo40tueksygkf328gxmiljn2omvg3mfr0bw9xmkgr5jd6z2kagag37xflcpgzp9wfdvg7225v8lmpix5ioqsjsm9ay9yxl1soll4cbxympdzuedbfag2pm820mwkp4k6gi7dmhw3kmsenxq3vjrvpoi2d5z4iz7iaakws59kgi222lr941jodvjqlbpb4nyl96obfk8uqfn3bwplnagnwpvj0qaz4yzozeigkzcaajajlngwq4i7rv90gnv3tiymgdnh64e6qamfipzok8uxdkzrsaw7c5o994knl3u35fp7henrbgh434fao1n3hmx1r77d7lrxcu3pcc52t0fauhuk1anwdqzz7jpre5wg525qjcnhaxfejbdkosp608r4pwn5yimx56o1ovbhn3mki0smn9mm8fhd6r6huhwuq8r5efx6x9q28hhtks904wvb885gum4cmthfs4jeb2nj2y01n3rfzmaw5ax9z7teuk12a6ieiw9oyfo5anjo05pp1un1ifi5qr6'
    })
    fileSchema: string;
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'hz94z5ejtwj5eymej9lc1oe5xmct87u21qxmor6m3zai0sr071xunyizcyt8'
    })
    proxyHost: string;
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 6349359993
    })
    proxyPort: number;
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'vwedtb3ms1k5vnxfks7ccxm5w50y34jfxlaf1e9xnw2dfp8pafpmq9fw3q4fylea9vlol1afo5hx0e8vlx5rg17d0x7jqqp7490iah96j3koat6drkij3h9ynoc2pz7qkrisx4w8vzhnjctvyqk5cm996xc1miqs'
    })
    destination: string;
    
    @ApiProperty({
        type        : String,
        description : 'adapterStatus [input here api field description]',
        example     : 'ACTIVE'
    })
    adapterStatus: string;
    
    @ApiProperty({
        type        : String,
        description : 'softwareComponentName [input here api field description]',
        example     : '7ira5e5zzwgw9h1x15oyy70pa9m47meq507ij7o2mb9xmlc6a35mww5o8efni63wpfu61o4xiucq2zvpx4pitpon5kymnol6j57k38h09xnssmh4n4nmlorzm9e4vm7r1s91yjgbyi4zy3mdr8x5ail8za5it29r'
    })
    softwareComponentName: string;
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'm54lgw53kaplxlhpk9gu'
    })
    responsibleUserAccountName: string;
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'l2e5ywbcsyp0djyi8pug'
    })
    lastChangeUserAccount: string;
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-15 23:31:11'
    })
    lastChangedAt: string;
    
}
