import { ApiProperty } from '@nestjs/swagger';

export class UpdateModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '64685734-cd17-41d8-b1b0-96c34f75142e'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'aaa34636-2cfe-43cd-a83e-651c47420390'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'pewzs626zwk5gi2t0fdwoe8zybmme9yhorul61ta0y52acghpt'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'b8609cf0-0e90-47be-8a34-6be9bf537ed4'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'wr1hek25x8fb7j9dxxql'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : 'e8a2dfbe-32a6-4185-bad6-e05196afab10'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'sitalef815u3a9ccol4sjqusplsv4q6z44fm52fvqm5ql3dv6musai6k55ayr449fwcncqkartzhljxd6iu2j67gfy36sen4e2f1uk1ixmtiq4wms08ci7q7s0cizn8rv4j4133zvivfzxfdjsm8lu9vtanotoj0'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'jfoddzk4g8v18xtrosqu6li73oqim7xy6kotjmok0gdrvtur0o0ydkj21h1jso8kms53xugfput0c8iixl2t88fhkxeeej23rc179krjww6s964xtbmp6lk9zslthuxn3y9694xh53uzc9tno2hazcz4bl0sr0tw'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'g13d6a2om9sok69z63b2sscv3q5wo3kh4na2p4w4bvf4xl8buplhim67mwfk4sdbybaedawibap079cd1suho30zzap2pv53gthh5un3tx4ouk1zgy30q35bcogudb2hnuxuu4zz5g3yoaxjnb48kskhekujireo'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '4bcb77f8-2248-4717-bf10-697efa4afa2f'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'q97rrcpe7zx51x3cuwirnjsoheivwi9lhd4dx3a8jaaj3pp1ctprv080pqq8b15k1wuceu5tuxvqoj88jzi3mz3xuw8ib0nk6smuec11sg30qnmgedsatzwl28lpziew4pgb0zfz1tbnjesqxi4q4brhry9y48we'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'nxmk63o72s57efw2k0sbtrce7tghp6suvja450kokvwgwv1apsddho5egcoi1dqxhjamvt9wb7uep5v9fwmqrgcnxkny8lgv0wsiqfgxrqfox79dkbjvc8a1wa95qihpuq5e2d7kmdy7z1t3xtdqna87hgcbuia1'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'imhj2jwtkc3ao4h2lj5ec85brus8dzglpfapw5hh1myajanvp2vec4odxge2dw4gdp8qe2njmv9jfpummqklp69jnvf9fdksvwapg13s1jlfw8fk81i2k6vklad09nto02ii8n23hjcos0djoxo8ztgtk9545ad3'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'ppljvb6eqyysxpf0ngv2obit90gitxhqxg5ws69ys8fep452t1cbmz44b1njjryv9h2xhaeim01uskt9dpzzgxzlfmhpv6ie5w1nj4y4hytyma2m94f32ok6tkg5xb1duxx3mmg0oa4jl5285kpudg1iz08wqpvm'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '86rgr7cx6luv6mt8yedf'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : '0ocbsg690ednlixws1re5ct7nn00lpyf6p895s9konv2l1tpkc2wq08htaryv4o2va8ujllkg7sne7zjj39dqm8x6yx9ofb6th5rrxrll1nhbz3pz6gvyi543ilrrfwr3am664tqq29zaif1g5yreyc9v0tzvjb6yhnzgrivx2bj0tpwran0li91dszf7svglb3d5mbva5gjd8ubgvh8crev57x0n5h09o94cor2za7k9qqza7qio9y48wd7pqp'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'kfligio64f41xycwpusd0y18tu0d4w6zgqeb9y4lzbzpa6sxa6uucoluj6hevt6ae617jsx1r37tntt5lq3yydpdsvnkbm2wz8ckwrsu1002uvcxhxh8h2odq9t8r5xt2b3dqs75gphemsdj0mvx50q4812j2jk3wid116jbpki00bvqhst0onsondk34sh829rj1lsf4uave1se8j6sj9ilpqu7zy6aedyfp44bkz6f32hhcp10619hir3c9u7p9nmxanavh3hnklvqd9o1epdomuklhvodapf7yeyiubtrddd7srwb4zugm68u2291'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'vee6wyuufxjbk7wisy6ny8m9m1n9osxq09pdu5c9sq60nmoken82ecb7awsp7o19ususi33q5jzippfgglgm7faaj2uc74m7933jee5d4a09xinz0y3r84waz0kljuyi7q1ko85ogyo3figj78rk1cbiva7of5dqfip6gltwcs7jw35i8odowj45mzvg3i836u70eucq7skuq3ir8bfpg6l994wj0wpdy65rt0tgwt2hrzhex0bcac3cvj3jmzsih6lnz298jo3025h28lg46xs1zuj7kbtwlnfiamvtfvqnxncesyic9y5y3aa4w5df'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'lac3hl3ogs9fnnejq8u1qb0jlqc344lajz5f8uqcipyvd1riy8s5gurv7bee132zucykws7gr8slpxvny5r90h8vo928rin4fxk8zzy9cszmzvdmnmd1v40tgpqk7kqd7q8lfqs1rvkq3w4s705rzfldtt68hc2ywcwtp4lph0g0w6rbyl5d3y3bbqlyr4ukttos19dv0hfo910j4srxeftokh55y64shtem9z2nm9i5ykueaduiaoj4tr9i2pezpd0sc7z7pdf0lw9fmz6tpqth4va7qm2srgu78xtsxhe0x652qrfl5xk1xfz73hycl6lw3ld1zmod8f98wfkp1vkwqjmsq457gc729seohz34w4oq44hrr1p2k9hjspht3v63lc1l98m9ly4lzefjp9y0kgp4nw7ketrm225u50wb5zqfgvgypas4lpk92fhyvz7sixivggz287jblu3u54qlvthc6896rcv3kq4579e4rlktaks2562dmnjff60t2oor8j9ubuuh8hqs3okkagebvwgwo5260qn6zq1cqk90qya3v2t45z8d2p7oxcpf0xcv8cetqkxvlhnqs5xpt0e7aq9du4y4ywnyrt2lofrhs702mk6bet1z1hgi3hzv6ognc4rkkpd5sv7s1a6h6g1l3nsq7s5pt88ekuthljhydf42qz3c3vg6rddrp4kl3nl7scg0aq7glniwehh0vu40ii3y4c8s6a1z2xkshm3nch7nvkim9215yuitqk6vrxwqkka6zr8c55ezn8cb4n49eum5buv7g1stgz4bwk4sn4zqjfxzn2uqmo5vl3953xsl1ix2kx5mnj05h9yezakqfmm5gjldhby6339b9qf3po60o4tz4yv4wv5qsjvqpkdb4pbu9fciadip4zi7683gkgj5nmzesys7f2hek2levmbxuxs7xu5quooggexrt4xzu3ajnjgo4h8il27o7r4zhqbfg73wa5362uueltfqfb3ecobf8ym9x8rarf7j'
    })
    parameterValue: string;
    
    
}
