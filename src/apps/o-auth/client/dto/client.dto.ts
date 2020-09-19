import { ApiProperty } from '@nestjs/swagger';

export class ClientDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '2bd7a018-b574-4dad-839c-8d0f99fc40d8'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'grantType [input here api field description]',
        example     : 'PASSWORD_GRANT',
        enum        : ['AUTHORIZATION_CODE','CLIENT_CREDENTIALS','PASSWORD_GRANT']
    })
    grantType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'f5g2suw1ecvzj742pnnp1l9lel8py2dyy89c0kr9yhjh0qi1bi15knn7xdfh73aumd5kh98e7g2wivjz7etqrpsu9ambc88xmgu9311g77g532rfsyspwfth6473ae0qe3p9durmwu66fy5mo82i4dcwj6vcnwsgvq90vabe17wyzloen6d2h4ppulz0392mqs1mk2x45ijc3drfk9avkpbkgde4me7rr6sfrc1jeotwsv3vlok75m9r0j5pc53'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : 'aszbtet8tz3v7rksbx2cnfijw18yw8trsib2zorvmm6ey7jkkkfsus9khe43p26l5y8v49n55qp17ba01c91bf9o8v'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'authUrl [input here api field description]',
        example     : 'hg0lfnq798pnvu6bms3adjguvxrokgfjm100i0qmtein1ndnox4mdebg2zwt3njj7fk3q90390jw0996fzco9re689jnj9rcl6q17irmh15hn0740izvp9cj8eipmv9wtc4jn935anw3mr0e88255cbb3golya0k8571frndlstdd788vz9xhpij3061c412c60kfi1a0iajsv68r3jcz373soxo5gbtk1dwnu2pqcr0kzp929scl8txp6svk6lyeb9gb73yz1y1093t2l5e9k7ifnbszj4ymvz2fpeahskt0slj6g1lvs1g0trvsqul8jmpoh6nieynebhgiz2j7kw0ktk8nf792f3e364adntuncgifhlznrdkuod95pz6ylffhovi632nh98xrdf1rfsmubzw30i9i761linxzw9jqduydtjjlbb34dq33tk1ap1ek8smk3yol62ajplgg4xtdi8q3ocq0yklfni7en0s0vjcmgto7mhdedmsnhx9snn0cisiqhlqpcqt3t0702ubahor2g084qtp4yt4rcsv6tullivuzojp2mv2lt66uk1nhjvx76obt9z15bq78b4ono3i82y95equup961vz21ln41zgmaj76xrkc97fiq76ed1ew8g1ro8ner3fxivcuet9nu6fljt4mqn8w4hf13hgslqt5soih4ztmf57b8thrfq3znlnor0iu60l0pthjjz6p01pxvkmdqu0eeb596nqr8o40zsh38gs1id33pz2zy3hh5x3b39oeufed4036y5yyr12suxxlh609fpev86ex7ozkvnjdwddxq8xqujukoorpwagytv1etw7nrm2ztngcbve7t3roro14s0tow0mhiv1wl6qybgbub3ua2mdnzs1gy9zuh86utrrfyktwg0vtvospwg1aohwsmva7p5emfip0jzbcyqjiq53xkrjqfw0rfw4vhag9jw8f3n8l76y0un4jd19nrj79i0trzm7zr4tahhdsdlhncypcbj5j8kgser6dgkncf8wzoity9waf34nwhg76k3gibfd5dd338cntzxa6l1ydmt416rj59t8rlagtp2q541tnxe1508cgjouqmc7jypvgvgumrip6jk8pc58xxbsw08nsacpdoa2z693bcq6pj6ajv7v05xyt98hqjt83zzi807oj04f9qqs3svq11lo0ub2irg76yfkf5pgr4x4tlwv08y8xv7kh9ai123vae6xm35hjtcafwom6ht6ncu8mx7pvh4713qdxbmz0xoz0rimlvavp0psbfd570swk6yryjcnpav85ftw7jikh913xe22m37nlx9vmyuzp2bkmwhq4zgoc0anvwsjajnfwfunimk8c1lg1m8lvx8yiijwjgpxj8biwvd879uvu8i4fovl51aj4qmpmqmfzlf4zygkhlof4gie1t09y5ay7j57g1zb2bsy2fbtkaj5dicwauni76fntdfhlegjct63naltm73nur58aalr7ra717hqc6huerpnl6jhp4jttx11di8z18p6fcgacitnj0lu72mk6uoburgzpg3nw305ulaewittre29livljpnqdmpkqxu2x2ribg8zwrajt3s89qk1mq7ca61lss3s2wrenfjksuw10ly2erapwokk1ef00dr630s9mya2emri7yntspq5x1fnlf6fjehs9e4p7ph2qgrus5m9ckxvbwz05m2sup2pzjqroate1phdodzg3a1c4iwxnwpj5galqpij5kmax6wv0sy5jrv0pt4rrdtptzqaiyfcbnkryc624grt7zsa8dqm7cwsqetf648qprqh9h89mgeelm2ev0npf97mnwb0kp8tcgpfxw95vhvuwfxy43bhtlyjjf31krrqbekc3wpek72b0p1prbc2x5dapo6nru6thkmsrbodrynnclgvoai82fhivwn0dacx5phir6j2cuyfsci1z6y6r8k9tuapinkyutz3gr2x49ym6jtie8gzlikdnjzwukj92f6svvyzd'
    })
    authUrl: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'redirect [input here api field description]',
        example     : 'jglqyqu9g3qhbizs5wqf57z52gtr9x7zwndkegnjwbevllfm1og3v3ymbu59oxrv9d69lrcufstc5rbccjrr7jwqmwbt3jji34o61asrwgh7xy8swjcr268oaivi6kp3yp9dven2o702i26fk04mrfridmn7pkax2u6zfroc356z3n4u061p1aod1yyr6r1owrxwtcl3yfk4o0puwymphcq4jjfuf2huj23sna1j51s0jvkupbc4nwk4n1833bl5ehkbf8y6se5fqgxe2dyhpdwb75aw5ilzkkw4fkffbuk6z5yui0ovpjn1k1dkfl81a9ju4g1zv6euxbqfxzunn5acczeubv36a05hmgiv565e2l9lobd80tk7hl3icsmasa94wwevfz5pguwy8atg69dc8sobxkzuaqpezu3hufswgdx9fr0axkl0ypf9dxy7kh9eai63snaxcgli2odgze1mz1dm5pcn3vhbuv8d4wfw6vcotx73wcmm76o9eaonyqaevoxquakla5gdtcvl8vsdzhwitfi7878pq2o71nusurpmbemo1oujt7dkm7qskaog07gu0eae1el2rr8e6flvzd15nwj8ye4taom3wtg4hglywikn7xr561ew8429obkzg8ip0a56eypyd59xxfqlrixn07en515lc0w8er0r12dj1z9z5tm6jaiod6voplfceow3w0c7f1ezmqazk5biiblookj2sz255hm2yybme4tkftrljty3pgpk6ubsc4ld3vrnpvu75u1y3h30u8r6qu02gsuca8mi7ipqcsxme8u617wag1s5x1keb8j135j8ozg8tehw9dgdtb31nc1vxiy6kulj3jw5d1i0nqu2zd1xu1f75nmyituqozd67ikye5jfckiun0qicw5oqzr8dvlzhcz2ulm6akmtk6pm88covejb1kpyoh365pb5u5mau2meioa47q7f60q9qqx6ztaxwl1yfxz59opj5nxcsxatqc9t4vr0nljda5vmmqabktp2in5musfj2unxnwlcjoke1lhzybzzqjxxtdvqurko2bwbqgpe6jf1zupb7m33x77thi4mgtf24s7es5xers2q1zv8lbcr6iaqi5untpv3pl1ocil1zl9596y8mou2wm7akm6dpvctoiuvfzbix8q3m3g7yozrlhp68li37uxp72zs0efkvd5mkuc3pvz0jgft946wzuv2twm0kg05e0ov8z2z75e3e448vqqj9r311b2ij1li08jkjsyv7um50p2s7988pm6owrnbbvf0w5u259wypwwhjq5ddewxqp2ymyzxdgtblihvyac32lyhp0iive3qdne02im41z9qza7lolbzko3sii2shskcn0b6p88tlhfl8v1oe15wcbgpy8tfzf8363iqqfzyttfrzriltbcfdim4v498u0trwd3wyge3awafu5w17mrrckd2mj0x1lvk6ro84p48go34h9gh6tmanw5zqqix7nfz5iqwvyi1rrh1uuvfv0f3lw3j2qu69189hp0euoc5ku8lw5oyzvtzj0ipe7bxkfgar62aqq2phujvqtrsluu2x115iywnwqvhak0j974c1hzr54rogv4m1tp5prydie2b90gcp0bsokvwq19udhff8unjvzzwu8qm5c4jetppurh0jmj09q5b0frqrwoxtnpct769s1s8f90sw83jaw1fj40n3mdbbvrij4i1c4w22712ifheuzc5d76lb1vf7cw8irdylum62e6ffcdmjddb96zre2e8gfhw19mzs3myeu9h76lo47zsxolubp53hmcjzlqs7yn0wign0grbq9l9vryw199my41e248svcyx6fopfeeczxnz6bm54d2ytbmf7t0zg1yn66d6bktgeebswbu3oqgm31d0x9hrrwvfln5g0ykth6qwse6z4scbb67ekjjkv46ui9dg6q9aonzq100ugs3m6f0hq4w5zo9qpqom0iilyzb6cnsf497hvwygw4jhvocd5qj5on3rfgis'
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
        example     : 6613948287
    })
    expiredAccessToken: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredRefreshToken [input here api field description]',
        example     : 7858485878
    })
    expiredRefreshToken: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isRevoked [input here api field description]',
        example     : false
    })
    isRevoked: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : true
    })
    isMaster: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-09-19 15:36:01'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-09-19 06:25:03'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-09-19 12:05:37'
    })
    deletedAt: string;
    
    
}
