import { ApiProperty } from '@nestjs/swagger';

export class UpdateClientDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '895b4570-a8b8-4b47-bd7e-9643d2017523'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'grantType [input here api field description]',
        example     : 'AUTHORIZATION_CODE',
        enum        : ['AUTHORIZATION_CODE','CLIENT_CREDENTIALS','PASSWORD_GRANT']
    })
    grantType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'oogx8by8442cdeykvxf20saw4t9u72hm9apoc1ci7p7pk6uu3im2clbv1yxub4wsatvhwl9ignmc83ivqerentjtlbq6m3nr5v1jy10xjk75xq8deszw9tw9ezd5lodeq5ye2c3nec8wcsabk98474l9ya0isoatzs3arzpjqigmqainvn7rm14th0h6xgdn984k27ioekyoqk3hfosupgbj6powfg60l2b07m4asz7t2gzos8b62w9dvt5moaj'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : 'aoxnkfigyvhjzkxee5ksspeohrs0kh9xb96fq4bp96iot2reoto59eaphdzetngp7y90rotjw23ttrhyris92qrm8p'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'authUrl [input here api field description]',
        example     : 'wv9vg62kx0jxby3ytdadetroxboacfxujta6tniwtx66f9rvhmrz382off1mxoa9x1r13rrk0z3q9w48w56cud1fucf642m59dw2mf22l5caxrd41wdf87jnt5nxe2oaeu0mejmybktamqb36f2vv30grxjtxywlr6p9to57ch6yvt8myt9elgc83lsn3ym7ag9xfsek34d0w7mgj475ltr3bbhsr1vwitu0to6zppw60q5iwea5492ys76lql3re43qimmee28g91jiqazh0sqd9hpu2nn3xbr8ve8dcicybju2yog60vsvk1u2r5m3xpb4zim070iat5f26e7s5yz7kg0u62wu9y6oxztuykntogswiyivgqrtzigz85ejs2oiv42z1b42cdx312ldo7dspn5dseoknn2oo9pf0juf9sc4i8ll2kbnw4vpg703xc6lm4n9our7n6cxsyz2q8t4i0yp31kzh47975gueuxkqhu2eespprt83xyng34o1bpkicyy2c9ufha547zmqlx5ozn6zexmg6fp4zbzc6brm6sxs6tir5bj608ihbgz4aa5eir8wyyjgd8uq6gji0bwywmmm1h5eow8ikws311utaa24cyjk8xay3japqr04cyas572e5hcv5wvqyat021zegf38dlq4bdh89z3om1777qut9fspvuxhyn41pbketnkyr2god7hdi336xyvemzb7n6fzwc9jn7cqknsehd2xznnwamfriz5arhaly3f6wbruyi6gdjo7ka2cg91cf9ivcn57714x9j3peigw0a1nz4u8qn7p4lynnmk9lj0emq15edtj48hepcxh6bqt024hanhv8xgz1fdrt61vh5a2t6ucpm4jlurxf7d2mm4b4iu6lw46mulch6p72s6hctd3me84l11ggx5m21otdd1bkyk4j58zqeosiwvmcutl8tsj8tgc4y0pxwli8vg7snqd7rigoqe5fwk5z8t42h94n4nocpbn50hrxil0vgae723hydcxgleip3pr3kyiigbsdpte6gzisibx9zgqerm3ai2vdrml42i6072mi8tad39pgxse17embbkzrcdaak2t9aw6hdpbdto8cqjrbvx8088p5a39l64efhkaft0kuxnea8jiw6oo70ovpqlkmdiklujf65r2wi69t4rh5f08uumj2mtm8io0y41oa9h9kx03zouh8k9z77taa6tm6cuwadqbaf82tjdo2fscfeuyfzt0xk5z5l00d3jzr4t8m1dr2x6vcwoj7dm5ez4o8jtmt9h31nxcck13skuzh9qldvny4lspu66m2kji7a97debpucr11b35xgzqh7mfp8vof1d4wwlb2y8o3l07qlmh010nugakntb09jkkgvytpxtjtizdl4du8ufuk517kt2tk4okqroqww1wtl7kspgzf86sqrc9uldc3ywtemtwslrsbtabkimkqmzrf16z5guay3awpzt06x4ktjir2zaivuf4eti43hp11ktbuh8cyk3l0lb914tnku767u241t7f9km58mv9q5dj9p7xhys8xpm4mz19gt5xqhfr4ollb3pddxhywjwctgtvf3wj0ahwat20z0lf6m6i0o129tzi7gyx0mt6j5k4dqr3gos8lfimfxb6i1ant276qvj1oxosnx76w3gvpeyig22xgkudul5djn24xf18tsjn8ycowasjlrq9ulg0nd23hoh32n907irjr6g7j2dpdbswfohgggioqic5fm4ge9synr0nwr110s2saahd0r0cxqjo6tler4cced6rzd8oqmv36vhvk8ldwysjmfbf7r6avo8xniqpudpof6o1zeezkk3z47f13dhcgf3orswnjp900kvjizhkm0o8zdmsauxgemzto44txz8f1gtzwqcgmn9iduvhzvjc4gwaj0jzcaywa8vl2vpvddn9gu1s6af3fmdnejeey0tehx88306m0nj99ubbojip3de88at6hbqbf59tom846qbt507ytn806ow'
    })
    authUrl: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'redirect [input here api field description]',
        example     : 'ikkr0vupri8ko3n7rtyxpqrwnwqizpehx4i4y9pqd9ua1ljbmc1gjx7vjfmdq2jswmryw66ity0jr0817pgs1lvt0aadhcrkje58mm0rr09olla6xk0rkxle733yozpcpyu1p2c9igwt7e3nhrbgtb0q5xocxn75qpkbqv32fzsizfm36ip6ymlbfhzlpfvo6wx713djlj51io9565nhcwp4ccinns0noid6vfdifyb6abgufm6tv4myhakf8n9fybmvfl4d5v3ky7oz35mp0y7uqwp7538zxqlmhc1n4gq0c3m34z23sy8ffcqzzl91y74mw8lipln4qksy48qo6mws45gyrp5bc9lh4oi8g4ylpsbm7xr6e3cicc4041xnpyu9j30bkh9g6ke6uezn9ek775j1bihd6o7uq7xkpjqa45scusd85008b4hr6a4u5e95a3nnjdunidv6e0j370ev6xsum0qqp3hvaab7tgj8b2tfb3l4k367qcgx5i7y5ixm2b1bnrhr3foowjmb6gr1acnkf0wnrimecfkr9kb0ygko14vqc8pcdaww0z4f4kenm4gdr61jqmfu3t29zevqg8u1le5jm8rwh9gvylar83n9mvimgh0iivsn5t0y6s9gzahkfia2ny8brfhs4khsf61mtasr8tuwgh33sy3lfcyymg0oxs64i5fnpmouxdyk0zv7x77gd48y4w71xnkap6bn03reuyur4ll46k76zfiqponcf6sx7rs0batug56n9zqguwa894hzkz3zive9c4l7foxfh4m596yyc7gm01fw7rns6lzm52bje1apruk3g1xk4ruryogffh0nx6vlqom0kbisekmvxu5a3846w08bcu0z089a58gcknp8hjglvjly9ducwudvzty6ui5zxes4v682gcqf9z7w0m2606pw0hdodeak38bxow5nh060nti0gzdrf3n6epf99tfcdhawpwk57pkotqpskpfdac7yzszj4r1legbeq20tep62q49v5ll7mzmypppgcuvk1ris2on7q1mbz7pk0isj3tatf2ygzp3vw14jjvcyfy6zj5m91wmmqw4b3o4hn0f4p0b0adwf48lbt3h8n15lk7xpluvehinkh52ytqhzb4t7q4mhg8wlj0x0w6me6v61q3v2bq51d362rtnkdkgjvsbun5icfn3tcdy0pn63p92e2egfxfi3o7asuefr2i12h7rgmhivy7qgosc6p3c9oib5ej8y6ygxuw836kv23e276fyxbl1cmsmk7cbu7757wicv2gzcumvvgri5tq3hnlzqmhq8oh8aneig21g7isa5rbjfodrkfgg985t3r3qj5hohdyrrdq1tbgq0151js4r8fo9qgzqeg0attfvodl61mgffx1a5qqqc9jzpntekzz50j1ebzeefdf8pqo0x90ieu59ol62imd170z1ygot7eqcrlbnvjdscmnyk0qxelag882kk444j3xuc98a54i0n4dgeh38w4hysg7opda86b1k1f2l0d4x57adhiu90hey44mmwd70y3hqsx3sw5969xnpa74p8623zpoz2p6vci4oxo8z6vwani9vcowc0klg0o563qwvkt89ku3cplrrsmhy9cew01v47zahax6b3u662gsnm7mpj47krxcc6bg6lh4a4e925uvco3loaqbiak8rs2fgx40jwd0g9ajhispohaptdei5fh7rqcia3utpbalwkqr39y0jq9zj95tldke8zi75yuaehjmurtjz7u8y239e89qtx442qzijt0zps2vsvqtmr2mqpuwyjm8fghqz6rkmvia9qf903e7cuyr6f7l587fhry9r6zp2sazj1oaz5d85a2j5fkgrc4fjtaqh5ywo7kyio7ymbslndbqnkgs8d05monoh70an9bv9hf71aw7psfpdz8oxiu4ufcnj20bg39vkw9x9ik0y7vlx9n9btq2jdlkimn5zbw938bemrlvjv358d4bosurgysa02zjqmu3k0ta0k'
    })
    redirect: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'resourceCodes [input here api field description]',
        example     : { "foo" : "bar" }
    })
    resourceCodes: any;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredAccessToken [input here api field description]',
        example     : 7892812870
    })
    expiredAccessToken: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredRefreshToken [input here api field description]',
        example     : 4580197924
    })
    expiredRefreshToken: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isRevoked [input here api field description]',
        example     : true
    })
    isRevoked: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : false
    })
    isMaster: boolean;
    
    
}
