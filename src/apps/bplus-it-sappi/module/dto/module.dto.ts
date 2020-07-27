import { ApiProperty } from '@nestjs/swagger';

export class ModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '8c122653-36d1-436b-8270-cb3e5bff6f19'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'bcc034c8-1665-4250-bed4-f9613a1cd2d3'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '8l5cokmz7jbc9z7baaoodk7m5qp816sw64xa3s9gsl1pj56owh'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '9agtm2ijmdxnw94l49ru'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '948e1709-2ab6-405a-acf9-6a1f1fd943c3'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'oh9sab6mqsdb2grf1r4a'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : 'e62e7fa6-e398-43e2-8be6-6b576b589dd1'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : '12zra1n230z37plecbk184tzv1vda9gonej0x89pkx91yvggiqckxa1c8sygs5djii9v2f0imb0r312mzz4pm5s8ssen1lka8rjbokrhpkh6n6zyjq8hefavzayuqzajrmy1szylsx7hqg8vhvkejb19e81s4u93'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'isecu83gp3r6ts4o05nba5yurafpfwh1oa8e4vys1n50bm3vz29i69xcm1vy1hdhalen6o3ebul3l4bv0udy8w8vjldy2yjkw66bwoszdyu2akjfd8murwg8y4m9vqlr09bw7ayjauo42h2g6n9lo5v53fsaemr9'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'on8qf6we1qbf1iau4xflq6qn6mhemqwq91jvobggx79lggmvqo7k1a73ldywtotslvwrs5qyh9bx90xoeqpz0582ruplxijm7y1rtslh2lli7i1zxcr7tcx3dyweer9qaloan8vza1ymovjwh7caao5oz2kzpqjp'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '29d414aa-c091-481c-ba72-a0bf9ceb23b8'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '4kf8t115gy9ldftclbf22lsyytxd40mbn4z7abhm5s5jsb2ybp89hp4ud2tp48u3c2s2t8k13qzcetsod7cr2ozpusdsnxlkxjtnpwzfjjil0w12ikuvla9cw8h50ssv1jj9pdj6s0curtbo0mcxbpch91pcxxci'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'uq45fgdtizpxshxt8aatq58h7p45y0jwj70kt4iuif67wv7ptgggbpzd4sn18u785opxs2yxmvi4xg9zd02sl5eem49c51awkuv8g4v1gkjpv0r0g48us9mztb8p52tqaedm7kwfczg4vkq34pvcu7kwmfhti6a5'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'vtojxgciyh7uyfuupurpre9omydiopli92i47rz4m9ulbh73r10kkq59au58hoildrcbhpgre2463d7sm5ck5pomswvkqfjm58e79mn4ifntjbayf172xsu5z8u6xugg2az6uojgimuc8ik8qn2njfnle5dilr2a'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'uisharqf2omb9hl1rnlet3scbbi454ste8vbx7a1n348vcjhnw7m1rwsof2lj8gjxeem0sietq0j6oq42vvjj5tmt12e25vs4yftd2ttnyer09v33wvdprvy3jrd13mjb70kcjhc7a4v6ezb7qkqxji1mh9us0ox'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'x2tg99mg5s4ih7kpzbhk133nu63f5j2ddb14msovls81ilv54ub0lwhbe2unik6lyyrg2qyqvh0q68k4ho5ny5gdegu1rgceodegj14s8tourdl4k1yj3iu6oqijtcz2iki4wjk4q6vt20ii7s71gc0p9qxhw4ojnnvg8m8m7pnpbw21yl976qx9feiew5zma1oaoqjuet2kvd3z0ucpkdhwef35qcko46uk0dmc7b05v9jkeupmt671t9xs9lh'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'raogw1ae86m7vpx2nmuua3av4nmnyd7qyfc8u7i7osg2yxxvj40e7ll35jt4psgelhi2k77x70cry4793jtxymz4su1a7btl823nztwwnjo4w2p5o4d01e4lzfrs3p18jawhkbjw3a4ln2elgr8frear63ixblswexljunv924uqbs7eoy6z2veqeeox3lz2fco8gvbtr3epyfse1hb2248a727r5wg4aujw81jzdancu9qzotfhktvl4ga26tdmr0qma7h0q6pftrt466rphcc66fi3u20o61tej7g0dm8m71pf3p3aj6godfvg71so'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'g2wyz20rr5uvlwbfx50dowsa8q6yevt1drz7bti10owa35m9jh694v0jkc1bg77h8np5pzgdcr7hfydnf03hq1dpe0x98klx4291ragh2dqqizq3k9kv4j2sdlssniielyh3y4qh0z4kse7snviej6pbpsbyhb4swli4rvy437v2570k4mly54w2p76gkti8bklc4nrhg1e9w23062hnks279g64atnlg18zwcehqec59mirpi1cbi9lep08ioji7xnh4btxh1y9ksfgfrov91dx8mh0ktz3qauz8k19o10x7jbrz7x1rph5da0a4amk'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'jf1ke2sib144rsuhjjj7giy5etsd2o4966zcy118rna8j7fx2vf3d6ew2ibdw13ikpshyhh5c79z5kg6s3c8xm1iknf7whe3fjg1ikmp5wvxx37iszfbmiwq0p58vsz7e2xg5s6zr29fok5bsywvdk620g3h8s9t8g8rrq7545uyxp1u7ibg4lmmf2a4p0kdkxo4hdnh0cif7hqk2104e2arfvgc0fc6obemcsyicfsqhopkbpxacvpl8zt0kn92y8cy1os0uzfq0aqtzi1qlh9vlvibiwzwl4gn9uoyfq89aoojsrd2uf8enj6gxodje0vfg1oururuyp3z7qtin1hyvmik6zyjivjwxfwx3kd85r73epwc3k6ysfzasiq6cyst8nz7goca8kc0qicx82f06jas0lpbewqg2ef18uvd3ho52wqto5d2pjev0q9dm34568qa8nwhf2xhqobz8qr5eg5u1abfi9g8w7fski3tiiifar6ju7rpwcnfjte326wl81xng0yqyv6bgmog71uz7sgtpks6fvidpwuwbkfxa3hdmf1xggyxyjsqjx8w3wnpd326ywz96zkd76wpyvrfuoglzb0xbfitu4te5przv5be2ci1btgl24n6uzjxo3ri6f5xr2d9b1154ypu3mqy4fuew88m0vqfvav4zdruzb5d28evnmxnux60sndr5gcddebyn1c4t4tkxa5qpytfp6sqm5x90gxheavps5v0ee5epggfhedeqb2e4753bm54x5c9m10mijupvgd3w7hjt30b1x80v9qymt64xgzntfguncuj5i598zem2nh0vlrgv1h3j0n0fu0gzhrqvxakbrl8syqtgg7ketipw4wk1zrnwshtt4w1lihk8vj4m8zfka6dyirt88fww35pq2l4r1jd1t5w9pttlvh3nlat359cd0slq4otxzox6rvo0aplead411wtpioc82o5vmip7j5hbe04pc7jmu9rahkr5fxhy7d80w2e1f5pf0j8'
    })
    parameterValue: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-26 16:51:01'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-27 02:20:44'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-27 06:20:26'
    })
    deletedAt: string;
    
    
}
