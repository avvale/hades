import { ApiProperty } from '@nestjs/swagger';

export class UpdateModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '886640b0-cb76-4cdf-a92b-9037840f28cb'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '40c0f04a-c005-4825-b83a-ce7b7138b826'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'qcolq2iubp77twy10xzzttcmw0e3hj300brrjnyovqqacpeo4h'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '4fcafefd-49f0-469f-91e9-9caf55ffeecc'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'e8z6chavc65ozvw8zroi'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '2ae86aa4-f0bd-42b0-bbd0-ab786d92e21a'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'a3zgpzpmuag10paqufwec9w35pa6hhxwcmsu8ae1ocd9w7jhv5oxzwiucoxein7d351yjhs50851ayxw531qk7uehulihkkh9i744ez456r9tfyan4bomt8qeysgrmayhfnf3e061cidi3vq2pecrtpar891myue'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'u9gjb1wyaflgg5dnrm4hb1i0igj7b5t2figffinc1txvznh79jtjrbif6e2tevk5rhm55cjir8fl8vav2oz51w6fi5o7f6g2aq1b0xiwfgzmjlwn72l1mnpnc1fjxwonl4wf9wzj3mc3fdqmwm5ptmwgnibn3ss8'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'uphgky5gy2339zecovfuz0jni3vrm4zgwwa8k1e52bfvnmaf8cuvsw2mc9ankc569cj0b2jcejuht0l0f5o04rr6st6q6fp49gsmpulo6q8gntrcmwn09bwt184vvyzwd26q2p6uluja0e1nz2w7gez9z31gzpoj'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '8428b521-e3cb-43dd-9aae-df4c68b9de73'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'nezbxoe8ntut557t49r61rda65rx5nk1eb2k3zyvnp5o0rlpb1b8s4tjlzv26nu3w2r8j56100nfpb0aqn5tuiizrcwr5wmx47419pszxlvexgrfmy4s6akxedqeosfwv8811gutusbm8bcyx3mz1b32t08h3py1'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '64uy8241ldb1mu0kgewemzxswmmjtsojdl0ybsiv3n762n8j6rlcyeiehe033ovwe11yz2w8ezzykdnrcjaeadnej1v2u40e2n5cnzqz69mzseibie0qnf44wtd4wymrk6ki9yztqe1cmpet0u420493k6n7tmep'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '4pw8pnuixq8gmaxmuyd1af77k4b7px09qtch47ck8up41z3efwoz6z92speijdrikvsrp6kg5j3r8d27duvpplkc7ifs64mswjbfedbv04l9cl6iqbsh1jfnc99r14uvqm834inejycad2jqf6alc8e3e70jzjnr'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'qwhwrokuni2m10qwd1kbj46ca4fxwpz7z1shy8qqu0t2d24y0qsjiin6404r95745imiifyosopasmmh3cugdu0e9en4wxx22fyjmg0wxm77083xr8of7xfu4fvnimguf8sv0wzrtg0fenfcion6gdvzki9lfd0a'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '01bfa3n2h1tc5kztz889'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'yhxo2tydi4l7d5revj8anoviady9jjwmbkrtleuhvfwc6wmyu6iby1ysn62ksxcg3l3gtdei0cxoxwpgfeugdfpo4l7v8ao7ibz29r7lz8jh3qpf8ows1jdixtuky1ngwcsjont66kwhwcj3ci02yvzsfvza4rahtlc21dx86hj08j9qw0xgvv6nzbnhzzkd34gchf4qx1ag413dl21bfbxeuuj4qgqn2xtfnfqdbdo4w11mu0exb32bjferp0f'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'sw41wvz3pjuj5tofn597ji1ytgzxm4hpnqqqkw7w3g2yiiv09510dqmjcxii4l8mmkh689ewq383l517h5uu3fqsehtwjjokk1eiyjlw6mtpi7ns85quf6c157hkrexd2qczf4heovs9wb57qhvcx101yh761r12kxf8xyjet8w68zwsnbg4iwar758lfkuintw1fw91azrlcrgkegj0kb9nrd27iwqxga9udjjpdic8rnrvfii1o3acg7j5q9kw516ifu14i84yrgltl27qffje7150is8xj8qnd4hk917hq6l1b0l10p7k25rpdwko'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'sgmep70ciadh4modddv37v9q03qwcsafcxfmbqv9fzu83t6g5yam08b2g4twrg6etpz3rsekx3oddnjr5ik8andfsr2u3vrhgx1pqhy99vkplms6p5re7pqfxrmuuoqnntltle5rqkbss4om84vifac0acdb9sl4w243cm96dg3f7xay6w980z8fii8cfuxvuipc7mglnp2oh8nun4qnnubzo3mmjx7bevciql2m67xsbuqojf8nag2oby9sa81uubl944z0chjsf65fpgxr9lrufgqlda9vdtn9xtgcmnpi0wkvf8d8dcdleyipldv0'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'vc4o8t16ow4h84arjv878x8edkmjxjdh3kqw262573u0zwpfugy5n2ncpxh0vzjlmetbrylslim4e6zceiewt9uh843e7nn4217mow58c2ye8bpnt0q36pcxkfghb1k1r73pwztpmu7t66a41wlc31ashgza6ur0ge5ewzvbvpro4wbjvf38m4j4mvwh6wdtd5n8yb8ltx636wyk79wzsk91sd5l1ezql2l7i7ikecfeiibjvsjbpyx1gqy03uc9g33mrd2ossxygmzvzihvn1lf8agjjco829x6u5715s06qxz5lcc4ry9jc0he3zqceoi8vkmyyhnyihh7ykaixlcy10s2g8n3oju37q25xd0z81pwcmspis431dou8d88gqj9vc3zz574gixgn9ocrrtyp0aym4hdnt8osqt2adkq5gqy7vbcnnd17nrli9x7mg1x5icozicmzwpjrtirryicn7i1wpnyp6q736z10i8c5oustt00qw07a6d280n7gmwmetphpei2dlvpw3s8fkudqjn4z9k8c3h4fvsmsreumfy372hray27i0je7txam476sca9evpdxv5lz1pefprqjatzeb4b7yb6f2xslnurfzgxtixk7ygykjwfn6jp0elpvsnzjfo99nykpvyw23dxcqpc02bxoyy8qxq23fzaufpua987z2jfzep3d04kh8u9nxzcsevocqwmtlf2mz109j8cgv38g5gygp5i4cbfvac9696wkaizn9o3aud9jw7oinuk2k00vlr5ls4we9d50vovjhb97ifjq4k1slfj4w5itol8kq662mn62pi4nbas0234we7b9ihnn3kl7y5ghh3ngwv7cl1olihjvc389o7ga3c61kfmtb1g30z55m84pmbw7gh115mg9oqogxxzef9r6ixh7l57j64ifin1my1l3k4cdhhprj3vouwweiuw6nrissd5tkhkzpg26fcd7858r7j5qrk3kw5okx9k4t0rj7neyih5dxlniykt'
    })
    parameterValue: string;
    
    
}
