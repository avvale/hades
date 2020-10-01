import { ApiProperty } from '@nestjs/swagger';

export class UpdateModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '8bfcc05d-31c3-4b71-b298-9fb07b59008d'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'a7d47ad0-c6b3-4e34-902d-41540843b0a6'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'xu6zbp15dg2eefz5qwhn3qd5ebm9oa0asco83xup79e2roghqj'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '7a783f3c-6d8c-4452-8ed6-f523d74c42db'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '4i211grwu3lntx9rktfc'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelHash [input here api field description]',
        example     : 'gqd45lgi3dod675572zfluytmbn2oynf610tpizy'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'g5pn8z6c3vb047hno4mdnagjfj2bt7kw36abaeiusz8wnxzxgm85nmsldb7nkb7kwuy8kkfiq1xfkxms0nwyq0av9uwe67ye93e9ngfsfe40hz055o52vzppm4ordkqbh5fmpne3i546h6sa457k67lwlswnlk42'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : '2w12rylm1brho56xdroa0hm0tlhliue4azsxs8qw4xf7w11tcttpz189o66gsz0pxa9lgvmd2g2vfrarz7u897r9x4hsw307rh60pld3yq9fogfp9uix5yk0gn86d0wn40rufuu0pab3geujb3jn3ggbu701pwof'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'sjvubx5ohtpenw0baqrjd4z3x29rppfvahlox3syrote94j15pxfbrzx2tzn2yqc0017kdpctvjhxr1iqnoip5r70846j0lx3izx6ii22d7xejgf5fax8lf7br423inxggtq989mr15lxdk64a445zenced00ivr'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'w1j7q2hiyqplfp8pxdejesgola75xvoiic44gdmd'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '578nxuedv5wy97dvtu7trfcp7jbgum1wt9hkx0xzei9ggacbd1hot6itdul3bd5kzrjjyex1hz79f90xpxyjx4lgvxkd4yoyysn5s7f3e57neztnncf05gc529zkfw7muq7z3t9jrdppalys9kgjdb5u28wr3yj5'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverParty [input here api field description]',
        example     : 'd1q5njjf0duki2vgidr8ev2c2irn9f2t6byhjw380zjovnpjkpkqp07ja8hhmfsclxumi4ihq9geoq5s1wx6xe5obpwrphfl2pr01t7r2r6eibeeo5vt9w3mb1f1aqqvjk0mwztllyf0ixfwr0b8mqzi95e74cn8'
    })
    flowReceiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'pw1d8zjwvabviq0otxjhfqd129qok2adohepgu3zle1d66viqvtl50oe4086re2exj69o49uh92hic7fbisvnlzyoccb5fhrkoehwr4o8v6l3i6yze6dj1dgp5e9pg6e27wlp3nkt6d3i03bg9k533rp6p5thqhn'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverComponent [input here api field description]',
        example     : 'fbctckxojtxlycsduea7owo8eilv9ahulct946t60tkzfr2m7ccegvy9trz08q11evvrvd6hso6in2zccczsd46opn40ctiamoxy9naokg80vofrktyan4wyllf6luso7lnunuw25s40t940d1vsizivzu0vkekt'
    })
    flowReceiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '2n4czm3coii3ecehztqm2vk783rkb2kh7ebj0if95aygqcw7lfmqmz4oqialfweujmuo3yz0wwb422snke667ch2s1jrl4voz5rlntcg4rtc1eqdq0cjeuli8w66fs6tvlllhzrlr6444i7d31vukhnehywaok3o'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'vwmaygjag02nmhji2ghqqjsba4b6c8etb7sqrwcloya2hxcc3j75q2jz045kjt6bjpoyse8h8tlovajmb8ilo5bfcjivxh9icao7zrwqq2jfwrjsy7m6idd5kul4grt97dd8z2sziz0u1piy4tocgvys885a0lin'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'as5630q3ymxvh5tdk60c'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'j5f9a5tm1ffpk0fe5ew6frj81901pbbpvt3yfx326lazcuanpnjmxkki4m35gbxqqo0qnsgdulf8i36phn5abs0ra5qwyr9ib4d9jo8wb4k1rw0qj5moac0x8ybxd7e0qlvnlr5ptlk8b0pxhhhtb0ci9xoff0wtk46n8aej4uno5buupmxohq4hdbju95w79p819y4vo26wfj60pu4kyvv2m95994nfvob0y8ikddfqtkvf4p7p0xxys8wdssl'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'lczuf9a1w6kptd88wp928p7jynkefx3qtfqgejmaj4ujcpgx6yk8qbvo3u4yuof9x3got8c4o6hf6i5ubxtyex9lhjsb4bdgw09c8qot38e4wkbst7q5tqxhjxn8w8io0aag1zcnjv5x1kqefgqbipvf4y6asiyutqcrv5wdzaoq6aizsy2t5dr0q7m7glos6qfiahwuodq78740d0hblckrgoz9jynfzgx6ab00445ftrrtfo8rst4h5pc1lmm3pu0bap5nrdpyn7m5xkr25b9ndak25kaai4rmr52uiv2tyhfwl8lxtbgrekbdsiwm'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'jij83qy5r20kg5nr4q8mgvzd3biyunws97w0ydb4wq1rhacse5y3vkd1bfm237lh4qj9eah4xie82q5n39to88tkl0k14r4wnz1gbeem6h0ctu81ua0hubadagap8ral9occbmmcjl0d6wmg5ey29qlw746ljdfne2p9jipvbrbj7zvyll8a7xl5qx6ulxtxpxdzwxu5nfayfaqh6r1u82u1ufx6ceo1oqj4c49pww8luq0thnf6c3sn8qz4d7do00dezisjzs7iklhgncev2kbc0x6u6hi5asg54b0imq3y2yxo1j1q2jik5bxrml4e'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'qwtltftmgcfzh7t011q8gdj1lcmpw55h51tudl6jonw9czaq5n14i85urohsv2w4i0rwa7yrwlh9l5w1zcgj0wzw1nwdcjqvx5kjum2a8jwg8nw2gtyh82lmtezfojqf3jsxb8gm2oxv39me5f6z02mf7ogxnqn6althn10iq44xzyd4lnch2m0g7j5zni86im351o9fhaoedkfrv4bave9ok7koghdw24417uik5gy3ru2hsf3b4yn971wa6ugdzqqs1s6drihf82vuygjem4supzvh7n74ihkuswmhxannsvi4vwyrp7lsgwo67smps5l54hdz6ob5dj8m45ikliyfwaw2i3jihutq44ghouj9j0u3dot264xeyn1tofwgca3zoqusybknhqgxqk53a2p20k75lacj6si3u9owk8g0sft98615uqy80ixyo5p8sfo1iqjipveo7zu4ucug5fs1vlm9azy0isylagsxvk72eujaibtm31ro05wlte36sht1kkpn1whc6mvmz8afpz75sxap8r1xu5ntcy6enq7vd7q8xrk6dgay9gorlidcgso905iil9y72zq10j1yoy7kq6yrjgnim1izctmwhvh30ggmnnrepqa0jre9ymuktwc2e86jcf66jb5j36ik6ktecrtwljp0066cgk9ho6j561c2rupmcps02lngrz4zefk1b66zq2pz9pvr11tthd9iukc0h8b7cuw3ai1esd6me0jbm4gsq5hkzl1irwoj98fiw7jz53smw9iclbq9n9ug0joi512ygcezapnhllssjvctqtgagqhjvcmvj9o20sekbxp4laj51oerjrzu3xh3v8o1znpqksh373qpdfhry24q67ca6ezeka2hvk658b2wwt1xc2wlf8n6lj053qrmgwqcqn1df192b6oqfk0jf4p9akd00q9pdzkhdvyhnfatiwgol0qm12t1i937tp31wtn2ze32c9g830r064f5yxwumvpotnus651gn0kqjqph9y8wgu5hx471fghmnjauqoe5q9alsdu0jaioks61yzwvnt3055bq1gq72cqh68f5ui5dswopsu4g0c6stjburgmuagdrk579waw1563kxtmgu2frwlr6xgiw0titcej4fq0kex6wgsrizwd4xbn3hy1cxht5xuab7scn8z04srfi3ypeo8ux48mzts8sot486vo0hkgdo6qe4gyjfr657nbmg2t23gh5c7ctuf6a48w8155q6a6fqls2gqhy2xta8ck236n0d5sjii7bu50yfnymktjdyqofvjbstfkwr6o4qgbj2p3lbvkoe6enp61ugjrv3cxuspx7166c5jm95aqzftpf32ny1ocyowcadxz0le3nt18bi67hz046nzby9iupcfld4nf4tqra29ldz778krqxqw3jbrzymig5fgirymzesqvutbj20p2ox77ngs2gkoqktrs9yuj9go9zbntchl78cr88p5x2mevv73m7f47rn9x97w5qxf6v8e2z8d98dkk6p83eui55otl62lvy4ftmka2p1t8xltq0c3rbzkhvi9ktr0bws7v4f6499gizn4f3pvsns3y7q3pfdbz0icy4nyxmv4kr7bvqolh0gzsv3dit8xoyo4d0e6iklati3dnsrtohqb6tpec339oxpci3gcopatfxg5r5g0c5ys2b30m1hn647n06ud1fknvgsatzpri40nc564bzrsvp9k9tvtc3nr2kbjjnym8cn8m4dqqvw7quhv81nbwq1b9fb7r2ony230ygo1sogjmadgkshahi2cs3hmzq2dzthvk763y4vgylmo24sjvv0oi5xbbgwsqd9bva2jdggasoygdsisugi5kvt1per9az8omi19w4x2joxp52z0fa2scdin5lpw5x79urd2mf6egsqgzli6p1ixn4nvpgxoc8g7sk9fczwl2gt9aa82e0sj1kmcbhqeg9dp7zqjnsgoll70jpcn1nz63jm76r2wlk2s2h2wk5df5gjamo'
    })
    parameterValue: string;
    
    
}
