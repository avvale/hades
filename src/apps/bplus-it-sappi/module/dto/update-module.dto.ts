import { ApiProperty } from '@nestjs/swagger';

export class UpdateModuleDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : 'bac4e3ad-e299-467e-b9f8-81453a5badc2'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'tenantId [input here api field description]',
            example     : 'c87deb8b-4968-4e99-82e5-8b88b24983be'
        })
        tenantId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemId [input here api field description]',
            example     : '8df2ea6d-c3f6-4e2e-9a08-691a8bf00288'
        })
        systemId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemName [input here api field description]',
            example     : 'n53jxto4uq447xmijiae'
        })
        systemName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'channelId [input here api field description]',
            example     : '441e74fd-7959-4f83-b022-82ce46141f3b'
        })
        channelId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'channelParty [input here api field description]',
            example     : 'tmvronun65y05fo998xyp7lws1z0n309yuk5w5zbou1m132v9wzzm9wunsv5v0mby8pi84kyxs98to5n48zah0efqoxu7o6aoox3agr33rwye3t7xcpk4ai1s667u56b0rpys4xpsq43z86ws2q8lp236vr1iyu3'
        })
        channelParty: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'channelComponent [input here api field description]',
            example     : 'upoe5d9dn6pa2qb8lykxjd1nvwhtpqz055vv2dzg3ro07x8gpq7i9n6bzc8gjavy63oioik7qwlgpmlden083xl66hway5mkmkoikqcsfuhdmailgbyp9u783ppcer66x41mcb91eircp3cyxsfxjqqhgsgqy0j1'
        })
        channelComponent: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'channelName [input here api field description]',
            example     : 'gxnqfs1r5a22kgd9obybh1cuqpfxm7f8f22s93115ibeolqtx6dkkqirkp3n40hftextjh34uan1t2w1mozvcav9la3g0svxwcr1r5opbyyz7jxn98r1z2y5ti9atx3irm53a5vaiogp0a6tsxvuge24og8tv9q3'
        })
        channelName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowParty [input here api field description]',
            example     : 'n7f5t7c3rd1em3ey0r8gh5xwinrndpot7ve4nhee98po8vavp8gb0b3ixlrk3clff7z88yh0xda0d7ms4ctue4t71r0svmqrsnjknywnknv71sqmmmiy2kmnurgoavrrwobqnavkxfkd990nlx3hu4d8b14yiwrj'
        })
        flowParty: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowComponent [input here api field description]',
            example     : 'w04n4fcwj6jo6bdr4gfk2cimkdywz7lzlpbvy6ltyl67z6ovvtkauv8fje7qr58mym5b3rt0xoneefvt53doa2wbam2hofjeb7mhxr86gyqovdgq7zzfhanqmxoi3tiebdp8zeo8t9l0r62bjd8gyvj5g25ice5f'
        })
        flowComponent: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowInterfaceName [input here api field description]',
            example     : 'e6pu20xns81s7a4tpzqwwo7uifa6xbngan1eqy4tv4c4530pi1qlntg32kkpwuu1egz7567omxctiletybxrrer39yxxsn8nw4k5l2e3qavrwjujeop06kgmaxsl6sntq4hrya9os850i9r0f95c1n5myrvv80gw'
        })
        flowInterfaceName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'flowInterfaceNamespace [input here api field description]',
            example     : 'ejqbo4ujd61mh5artv92rp6ip5tmwxnl9r4q8obud4of974bdgzodjurcnsi5qdcx0zwbzzvvkzneuqxivv44d88a05t4ikbxqqd5nagmxnzj9dpqlr0gtt1nr3k89jw5vzvgfdv7mke8m78pzahvof61ehgv0dy'
        })
        flowInterfaceNamespace: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'parameterGroup [input here api field description]',
            example     : 'v74dcv79beb13v7flxizsrv9ikqzii3anahgj9v9oqbngthrk4noxzz3ngw8i60mf3kx7d1aqau1s4z2k228pcv6l20jfnpoevdfumjh5rvt9nv4pinysavl9f5v9cfk8nj1n4f30bs2v61l8dllqo5hhank564u7y0m1sd2h54w1gqb95ftlintd0e4gufo5mq1iam9ueqwkipmk3n14f8dzkmox1drhugpbe8gfg0m8nwednhukswfqmooo9c'
        })
        parameterGroup: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'name [input here api field description]',
            example     : '7cchrluv4kjshx5hd9sloabfe00yh4s88e0p2l2x7d4ajs6738rd6m0lao0ubwwgjctom3nsilkpisgilmo92ff8slmkgcfgklxh06hm6i6fx4mepfa6ibe8wv1aae0tse7g0ufbb76n4drg8ynu2ndq562bqrpdlylu70vojps2vts722b1noxdnjc2uht7w16v5pvnhbecspbuq3lxo62eqv7rm2cc4zqist669o5rfroks7p01yzzcqpq5rlecs0z7gngyipb7sglozpbdmqu2gz3l40qd728v7upjbms9qpbkrfpgba9oephic5w'
        })
        name: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'parameterName [input here api field description]',
            example     : 'yooprnxj5qsj1o1mxb2f8kgwvunzolog9wcasy3esk8g6rwjcojltyk8evun0ko1oaegrazb2p82e39spkf9ed7p0k1ligkly0fyf5pqoe97gutrxjz2d0z022srsrw9jg2yst59q1w2t3y6sj0kbktmqcx3hp8hc8rpxvwc6ts132hieeea1swb0femgg0uwuz490841gnv5v09fshefir7zirrti9wdirspu9vi0p2lrzd5xzppsd4nwmyh2c5w4464jtuvvjb1b40v23mi2m7e30bqxzrni80fnv7b7jjths7lta0trl29m3oczgo'
        })
        parameterName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'parameterValue [input here api field description]',
            example     : '5t9qzxwa9758thntmg668uuljiz8svhgeq9ewvpeumsjrol64vscbliu3kitt37wsdbivnwr8pcusq18zw1c2ph438tgn8rfrsyrigi0n758w0ajmezvpdgg3fvykwt10zsp6x86t2auralaj50zyo5s75gmv83n9rlp7smhane2on7rjkgsvolrav4tobz8pirtarnpjv91hf90ktww0vg5c41aib8a0b78r9ds1ozdddyziomxliyzswfw3mf0vinu3gbr0g9xwqba5rcvh2mdo3avk8l07llmrmz3678ajux1vtb20eizs4gb7s1k5z4l7a2o6afuzfh5rnalcqv7e2hmgyde2jm2m90xqagibvqfa2cwcgbmupozapfyzyo0hq9ha8sx5006aytuz5y1qqbskkb9wwytp05p4otcboqso5ejq8p4zl546x8q1iecigoezga5kbzeoig24ybodpkf0em4b22a5iwe2eyjej3ecq8valc71bc6ztmcg6borily4bsttq7ia2m6t2jltbbessvc6jve11dh2tmj893rczvoc6h539t66jo3fd1eovwo9adm46dthz2sf45tlx01b77zc0ljbwushe940z9k16iyol4n47xz6zovkt75oyniv67jahhwwzc6x60b0c80en3fhdxy58fva1xr6j2hnv59xngjoi99yaisj8o2rzshq8z1rrprah9ylkpyzubqh6tzd0v9rj4rmbdnkavif26ebrwcum4c9sholztult3fwwgwco5jmxz8cmdukfbow3gygt69bd2z1u6p6gje0z65z759yqheho9iyo83tqm7hq2jo7r7e4xbjbrtmhscmja3mlvyui5289cugjfn4jl1eri2a4a1q1pjvme87451t8y09p2o819sefh64a0kk9ai85sm7z2pyiqjcwnhxt9iza6yn0pe595syrt974t848d3d06hkp433fr0njmqen7it7q0xxb49yxjrxp11ysd5bsvk1cvi5uq'
        })
        parameterValue: string;
    
    
}
