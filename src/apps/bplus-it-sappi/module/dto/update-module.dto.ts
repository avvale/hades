import { ApiProperty } from '@nestjs/swagger';

export class UpdateModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '99ac10e3-5712-4ac9-bae0-5a299ba548c7'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '26606de6-1d47-4228-b9e6-7bfbe97837d2'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'zmf63ah5y9nff622y34b2h3quyowl7vqxbh6t7myajcywpvubz'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'df315455-a321-4647-aff1-ebf23d45dc6a'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'qjpdp101tmkhe5rmbd9p'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelHash [input here api field description]',
        example     : '2y8keiwj3l9c0fm0aizys3fhka5c8tfnl7mzrvo2'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : '3pr0cp7a54297v0dw4ftv3lje6gan239rl0v22atah5b6g3hrtgo70ra2rpv9dowzqdew0pevw4xbhe26smzoskbvli5e09pb3vxt48fln2587wqe597lt3wr4cnclazo2ut3d7jg2ojwhrrmcd1l6v0ylvr9mex'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : '5l68uop0hxdjbszkos1xojjzsrspnlejrll84izc6maxh0jqsndetx538lyyzs9f3p5npgiz7xs4qs6d1ijhdv9jddfpfzvnvn6enxh8ap4bvvjd0igla062fgc0ts6j43ptyp6aal5nat749x76suizkeyqqht0'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'l4ajb9mh9wvtfbynzmhokrhf7vkfyki93nmvdsoprqauek7s89fgxj0vvdt7ts7nri4iky9ympuetk1z4grzexy9i5ixyzkj8cozuaznvz1xyqwpfvaqckpum0uxeqyrt0oafaafwren0ov7exur5rpiyey40pak'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'pfkkce7lgie4gld47qb8hzy9i0dy3czpg4bwnetk'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '1b35nvy1alnpxyz4iw4ojy2gzjpir4okro4hk789j384mg3ptqgnqbsr740o210mlgf7ucnjfqxrwr02e6em6051phow3jv4e63033ydvhkvqdh76d7ku29sygcvym2g56o6oqk3bdt8fjsyxm9p2nd69lruail4'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'qskmgrj7en583j2blk0mhmzmfw9nmqegcukdhv22pw51068ig0htyrao256v5i7niu0vbuur3ak1d1wue0962x7ul5lfmjg2kdboxgzllh98z8b867ssh0rc8v1fawjibci6oz058tdk6z50nk72qccdbfbwea8i'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'dmxdmb7xh7cp89u651y95r3bslj60bpgjjv2zf5kv3nexlx5ozxd5qny21c4q4mgi0j8uc0bra3sslxcapx4cid3708anhis0h8akltmyfntxt1i3heujnrxhchbpi54el6izp4n8yqfqqp3pm2by2obcxvva6ru'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'wbqxpsz6fpze6sddt2vtz89w0ipa67jb11q8gp8z0a8wkszcsfucqxftzq5v0e09o55tcbqygpw12hu8bwn99ih4d1pxnc6jqrbjv7v2poa1iervcczi2ulogmt378gi8ia9pqtg9iv7yr2j8ggnmakdx3dzlwzh'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'hwo8k2nesu1cm6772195'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'ya2ty72wk6iukpvdj8khbi2lx3mseiq1pkh152r8mgmvpaacdhsbehkfc642d4sefe2ey7m1e1q99f1y0cba6hvmr8729x32g5g9u7761kfcp5tuhbxndsjwv0t0sgjwy1a5z6xnfjvs83htog0wswph71k83kbl0u7ddbt7wdhvip7qhbbvuadbe3zoqrsdn5241i3l9wkksw4oj7l7sz63s7vylf6glq11m4beoa3vxilf92814bkw7vk31nd'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'mb68ua0c97xcbuh3aawrtye32y26fotf2r0slm3dxcl05tk4zyfi8862zxttzmhe5cn073fyqxzc17amkem4vvdg2m81cbzjkdqs1ass4kgzyh9bq8vp5jhvkbrwjjxwmha1s9r75kpyq0e9bpb0qyk9l5jbgx1nz8ka8h15zguca45xw32484dv7h6wlc4t3p2p6qu1sdeplvydc2tw6y10iodfivq7wimsgnhc247nm78un7i875tldxahlh5zf273fnms2mv28dao5sgak2sbxny5ei72soxfvp9ebm5ex99c9w69eqjno93a7dtv'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'jq3a8rb9rcvjd5r3kmbysutex0x54sfmrohz26hghi7ly6yew1t65x2hrqbqgvuy5k2xmhtdz88h242xl94g5wxvqa261bqvvht3dnoqmhv9ngoeleykou2n0v4abslxkeq9oux1jxiz9fcyuz63uvaa54hdmug6ievyebko6y4j80lrcuh6vghpeu4b5my59sgxzeaobr3t9cdkcdcfwq4578b99t0ge5w88ghsf60y92x639p8x91jelyc3eimwe07zgs8rkzh4mwdmqusis2zr0fo44rdpq00ylik1bsnc27o7usf1tvk550wqlg5'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'tio9bzccppf8bex02uk0yiklgndn8xvlamdu1lvd57uvt7u38heuhnubekn711jxskzz2wchuvpde605jtqkyjnicoz8f36hyc0ofschl7e8nv2es042v0ph9o9hcvbws5eqlm2zsyo245c9lrs72lir5whuqjd9mwtjzi0gda9msvh5i6342kwymdz5o6d9n06iylqnykncv4p5hhh48lriujkvxpcqsvcvze768ep18hyxhtbhdrsrv2kwn8qdeenpk56eh03kaeat07qp37eowwio6v5awph2j1rr16jpguiaeaygu1urszilo78j72n2tb77ul1u0ck7ob6ok8z27ps209n9n2gppd73qvatxo84zkdjakbotke1xfglrl18gedwhndwh6x3yaofgnvfjlfbdlugt5x2xn2oc9ufblpscl2eowe9gtfsq9i66fb5ujv2o9n195nrvcr6zwjp3cib361olni1swkq5a22qyqzwjzdzqmynr9y2edc22rn2knc1xqj4vi64d048ebdi3if7e8fzqjl6emn4pc8wxhvoxgjngd75976o6pn0p23nothx5dgm3a7vgjtoau0fv61mm2k2daq983njjby2i40mzkaskedpyshe4epqg57sxd7cc9tm4xey7jz8zpz1hiw4tv978p0b83didi53cbcwh4vccfxw3we3htqwl99w8yiwp6lz4zwc1gtw8gq1f6ftp895ukcc64o58dd4t3xbtywybxh1zn2qwtgt1qp9x1i5og0kkaykwy8ow6pz0ukqsyay0kk4nwfcuw3uz0wlq8rcdlme7whte29zht2llj46dztxtlh95l5ff1f2m84b9xw5ergtu2srv9bp154nrp30nc8s8hn17gden0tb5hefbo9i8m4yvw1lfywrn1jtttukuumdr8vvie0asluhdo3g1znos6nxqh16hota1vto58943ytgp7ui96sho16c1r9qt8ttbmyruqafs0q2zmy92slcodor40t'
    })
    parameterValue: string;
    
    
}
