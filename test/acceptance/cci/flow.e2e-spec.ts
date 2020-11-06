import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IFlowRepository } from '@hades/cci/flow/domain/flow.repository';
import { MockFlowRepository } from '@hades/cci/flow/infrastructure/mock/mock-flow.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
];

describe('flow', () =>
{
    let app: INestApplication;
    let repository: MockFlowRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    CciModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IFlowRepository)
            .useClass(MockFlowRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockFlowRepository>module.get<IFlowRepository>(IFlowRepository);

        await app.init();
    });

    test(`/REST:POST cci/flow - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: null,
                hash: 'fsj5cgzntjdm3m1pya4i9vnwpble4inoqmrzgdbk',
                tenantId: '44967159-4111-47e1-a4b8-f976d847d9ad',
                tenantCode: 'sj2z4enk111o32qpl90p554qfhedo5zirionxkysmms7hkh8oi',
                systemId: 'c13ea897-7e81-4be9-b342-6286a6cde1a8',
                systemName: 'fgl1p1zhm3tdyozmqa5a',
                version: 'dl3sjl4qwqnf1uhs0fmg',
                scenario: 'n3upopt2yqmg1ougpfaxbp7aowhjfwhfr130hh3xhv9xwso1ydhskge46650',
                party: 'oilkov91jybjrqbc58hagr80eo3njf43tzm62ogm8m0qcbeqjsi3ma0adg7wz95muvgw4dwzr4nsovkctpu5joonws5a0u30rcac9fcq57hbrnolw17uanqq4qqkd4qgez4l8xja9i323ggzj7w9oj2uof8b0hx0',
                receiverParty: 'djausa8zbvdgdlkjvj8kdlh88okmohvu7svx46rpt94qmvahrappockkhevffkjpw36ualv3sji17szvcp5qrkx3ut4ffm1a9qp35ji0wezohkks2m1bo77azezq8w1gbyda8ycbb1sq0ih6jmdd5ufn0q5q3lyx',
                component: 'xh90wao5458c23jpdz88k932ocyit60g4y11xk6qq9omybljyhu0ecjsla78p3d653nmoxngrab9h7xz71f5957qrsbdaki8ilsenttfpkftkcd9jqgv6obdom6t251c6vd7lm39p1mjbrr4r6rg6amfuw0wtlxb',
                receiverComponent: 'lr5qkp4k8m3cf1quhv98adxfoi3x7c1f7wqfbs1xqlo03z01oo4p4we1hqytgh9x014r442as1s5k3gbtsrssfy58soecxb3ar8oj8ays79ml8kssccqlzpkgh9un0w4atna5kai77qjdzffyncq2ehwkz684277',
                interfaceName: 'm92y4dibtp4d2xtz6rnkq75hdxo4rh2lg0i6m78zejhdnh36l3vjvqvtdhv7z229wsbgmog16d55hjhz9r3pas2vsnmqsmef3aam7u33zoof5jopjii9qla5yru3288d29gyp8ogde4k419lltk4hpcqm62931gh',
                interfaceNamespace: 'ayrcs92wli2sfuklh86q4bv0r1ri1dcf7l24ossiw600jemz8spmtz96zcmka4jli4gxonrl95kum415bllnsvm8vb0i8pnt1kcuotmuucr4qkc62suqc56qh7wxvj38n7up09vtjay1mkysgrfwcmuanbtlp5sb',
                iflowName: '28imqcsjg6evl2pnex2h5g37bria3w1pfie8w0yf2bhkrzw7o0pnyxgy11xri0e0cqb46xuj2ppjumej3jkqfsz1r6p88hxgtz8e361h879s6emkusq9l2sei64bcg4ezd0r9ohcw5yzy3s4irb6utaa38gbgarj',
                responsibleUserAccount: 'efja08v62k0mr0pt6uam',
                lastChangeUserAccount: '781kkn63u5e7ej29ucp2',
                lastChangedAt: '2020-11-05 13:54:32',
                folderPath: 'a2o9hh06mgv0euzl0b2oukgy82151kr72ccx0vzg5nwkjhv5m5ceqmkm6d9iepes8vk4j1xmmc5jw8xjqpajz52xj2vwf5yx9sbui6my31y2c2ln35qyqo32agjdig6u1i1wfxapp6fz6770ebna4ri18yblpqf2a4bdnc3d9svyf3nc2e41wd0mw4a6swdgcucea0ei4c4mq5rsl195flfjdi8swrce12c8l2opx2fwbirqdqlhx9q5tbwdhvm',
                description: 'z8uobehb0p1hhk5a38okgqfqzlsym11enx6lh2r85gdn0olsdcv5ri7ow6vacs3wjih0d39jsehfxh86iqv10j3tzcbnff14j2qxaslozfna4ww1314ufabassswmspgu57gr6absrc3b762wfik5peg32yra5i3q4qyli28zqsh02sb4evfq0x5m8yx6ztqe5a9gl6gk8dsbchuypaljjrzkckzn24it1hyur2xmv5h5fqxyhizli6hw1vj8oh',
                application: 'sfoanwb7j3lnty2zhuxj79yuyv17obxjz08gtuwkfehmkijgpmnu53plb711',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '24ab9cfa-437b-467c-a20e-4d8316d6b28e',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                
                hash: '6q3xmi7zrbqm0ikwpox4ag0xy5a2j906di7v4d5o',
                tenantId: '44967159-4111-47e1-a4b8-f976d847d9ad',
                tenantCode: 'ut794q2jwqgp8z69dqt1739ii6s2j369y3w3jn1uhh16cnrcnr',
                systemId: 'c13ea897-7e81-4be9-b342-6286a6cde1a8',
                systemName: 'hzmzcci4kr92yvpx0te2',
                version: 'ww6ili4ikoawu744i3dv',
                scenario: 'isu0qyrgp91rjzx4cxirj4cei0k0odt2yos9klt2mrpmm18snfbxrnn72m8m',
                party: '2vkzg8rm6892yyym16l9hvf1rn4xe8p7rak1wevfzcujxzmthsg9s289a2apwgoxnpxzxxe6com9ea093lvhsg0xigvhzq97f1mnb15zcullflsemszxksmky5x0p3bq6csjb93dqixmd3i9pl6dmp2pgamkrd8h',
                receiverParty: 'x8rcf41fem19q2pnqcxa0m3qij6ksjuffaa7acl3c2vmhtowtj39n3g34ew1a1vsigfjiqh8gqo0pfrngq6dk5tatd570snp6xgl2qmbhhxvwozuunjl9wke0dn88pcow6deyal1ade8ol98wvz5xjy6vzr5f3cr',
                component: 'avpjkeiabyu89zvukkei6frazsshifvu7mb6ylkqzj6uwbb8aod2mxxn2q8wxy2fkrulaxnm4cx7lbc3uyzauljph7p1oplaczbx75t3eh98gac8o36qamsp5rf4mlin2o6ecffke5kyopamquglhq9kdw3rqbtu',
                receiverComponent: 'nk6624uh5zlcsn5k8qjlf3gaf7gvurbkfjwcd6v5qxbz2a4i1htl7ote222jprrpoyglmjob8ottc1rfgnodpruwzox1i7a5caozr786i63jfeuqp3i5i30tityheull3rog14c9dl84dmst30k8vlkbjtmjykgk',
                interfaceName: '4atsxkd5tjedw0srihyhx13fkvlwn92nmyiaz30usiya2xk6flf4wodn1z0fn6nhxsj9p5m3516oueklo2rtzbuzfk2zxgdnfujjf6etsgxpieumw0x0e1o570fsfs9n8l02ounrgzxm89mhdqfa85qbhnt54fcq',
                interfaceNamespace: '1ao4wh4h72jc9zvlavcvx0ova62yqb1ivvlevobtznsvsvzzr6cdvwaf81l12wlsv7cedvkuw13iknzq0gbbrr3a2grkj6snbxeh5qbqbtg1hj0vqy3c4q9ue7juzw7w3ixzpn5qhi3mkznanmyp4kw2tj35mfto',
                iflowName: 'o11qteok0ooxcbkaqo0tf4udmixe3xav3kspq01drej9egz5r512dkdp6uu5vdyrdql9zuf2az2gdf8hg62ka4rzokuu1ab8cvtwtek7t8q7betbtspbhqqror17c2drfa1jikbvt3zx2nypy4kmpaeusecc6zv8',
                responsibleUserAccount: 'v1adjo76mqkm4r3wsxug',
                lastChangeUserAccount: 'misfres5m8jogzcbwt5n',
                lastChangedAt: '2020-11-05 22:25:18',
                folderPath: 'vdlec1tdxlszepfq1hz135yi6vo0n40iayn1693g3or64ctqix6mffpu9c5ue2jq2vkm6urdz1vriopzoi8nk4n60e0w2jv9huue7mpyidf2xof386xtpjanrq7d6pbm93i5d9yy4lpqk3dmcldyrig14d96ini1x12w2p8kytvyyqgf3wv9ywcemh84e6gypo4azs1ho793t5ftkqihiznvsw6ityqhn3jzne5ft6j49jn3gyac9yow5wvpz7i',
                description: 'ztx03vh7zif1fwaxuhkfugrtixtw2k73q3wb3r3aa3wu8o5g0u9k0hfvtnlnt2yxcazgj00v114zznux5jm34xv450jz2p78hocykd8fr1omwpjih2lnxcds4p6ma9hpcxk2heovwitalv6kf5i0chkaakkq2bkmddfvi5teo2yrtyk5b8dx3843u1u61cftn4h1r5ewj4bmwzxix8tkrj7gqpvcdgloja12iykdvv9e76kvklf7478gszcptrl',
                application: 'p04sog0unq5jea1ndcwc8qmhbq21i5txbmh2llzrc78tf7798o17j6r5gwvj',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '24ab9cfa-437b-467c-a20e-4d8316d6b28e',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowHash property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b603240-1c33-4c1a-92f9-05a28a63bd88',
                hash: null,
                tenantId: '44967159-4111-47e1-a4b8-f976d847d9ad',
                tenantCode: '9ndk2burm7aqw6imtjbvtnm51u5tnjvxe8zmk02mhiya6b3ct4',
                systemId: 'c13ea897-7e81-4be9-b342-6286a6cde1a8',
                systemName: 'g3c4k3km7j2s7t2w0a41',
                version: 'sao8ybuap9r0spywfmu3',
                scenario: 'e0pjjxducvhedri1v7emgovl4pq1j4fp7yu77rkyqv29zyssjfx72ftn6sde',
                party: 'a372oq5q7o245wul4w00gg4hks4q54w060qrs9mxdg6t2u9nrw5e9au15541sph3rzbhculb3f8ksdfdqrb1e4y0ulwm92mkscfwomi4aj8qq1mk8svww26ru6v45zq3si8gc7ayp71kcohcfh3qzw5p0eqzmqtn',
                receiverParty: 'h2j71fy7t918u60crob34i1249xg5fybpgfq5kmnqke859cydbou11a0qp6r6h2nbmtl4uxtlmvnbdnfyt4hg4r2ufedk0sl9xgcqzv8fujrri2xy2wgnlfxidjnwl5by35ct2kq8vx146c6ray3b3k24n8uw3pg',
                component: 'nwiz9qgn06hnpivokd8q7smh6b829jfzf2bomoubrgz4bmzn675cdofopq3n9pf168sjc82h14zcrxuwecpa39vk4om1ukzjku5qt98sug42ds2i66lx82ldbko6jp0k367nat52q6khq56n8omo7gf0rtuj95y5',
                receiverComponent: 'y9tuybqlrjckh3ah7suzsd8kt6oky1xxd6vdwoebwfpytty67rhnnoyglg9ehngqbr6sb338uzlwjjl6juyef76yenqztqx311ueh7f6t57ocq6qjanjjs4jjer41o168krs0etipqme6mdfhdmd5kyq7eyu80zi',
                interfaceName: '33gc3a924fi9q6yhy09or8akbepdlwbx3sk7aafpl8uv6sfnno7iuuif1x428022pf5b6zkixm4nl2ny3i63no2w6joufxo2a8skzz3k51tmtjdfgv5cypf5zpc4ga20kfwj9w2x6j61mbhfvuv05jx4kbq3w3rk',
                interfaceNamespace: 'przmshy6kiql4wqg30uppcyb31kv8t5khoezwilx0nas3fdylx2shwue74fmgr608njqrajresnll78tkyt6pbsm363b76076g5svmy5g2lrbyti4xpi6k26kqqwz5ipjjxx15yqvr7slbcfty1kspa6i1erz0tn',
                iflowName: '3gsosyn3v4o1c6immyxjrx5iwsk8l7vdwpvk2eafmcxg87q97qgjldrqfv7jmw3s6a4vfxuuk1g1pcdk9vw8dxbk1f1ht1sn2gday49gnzleq983k4j66eok26i91wtf6gothh5lztl176l13hwd76nn8vw8p78s',
                responsibleUserAccount: 'sgksyxpsui0rzjzoys8c',
                lastChangeUserAccount: 'k16olqbrrirqvl6kpazh',
                lastChangedAt: '2020-11-06 09:26:57',
                folderPath: 'mann48t2vi77gilj4lho0yzd5bnkofpptc6q72odnjf4mj2fi33we3p0qy6ncl6fd2or779c60gge510weoboacmm4fq8dpwrp486wym7xizqjrllaheepza4tyx2tfjpckrcn6f9sw112gxtcyqczummfhxzjphccfu7dlqjqfcn3ht9k8cdh3httsil9qpepiynord23qhcb8cyzkvimuzmckmltc609s47tyxajoakfuvscb1ov3xxarul0e',
                description: 'jsxrya42acmch0s8tiekhzstro51e91n4lhi8or1mmrldkyftlxd5oa9y4jokk253vd1dfh2dkbhcmpsy9jvinwzmva7ej4drfptmeyrme8r8iro6xcx85femagkqzfwof9gvh5ppv5t7rxtdk6anebzgudfqhqrznuicfukftg2e9x2jvqb1x2og6jdiucvpqhfmu3j9mu8zsv3xryjrcne15d9wy47r9p9oltzz11karrlryx6ds57xo3x2os',
                application: 'uykb9ei07diq5ftfp7ophw9pvep5sb1nelnsiz24oy48lhdtvlt59tnxpzlt',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '24ab9cfa-437b-467c-a20e-4d8316d6b28e',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowHash must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowHash property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b603240-1c33-4c1a-92f9-05a28a63bd88',
                
                tenantId: '44967159-4111-47e1-a4b8-f976d847d9ad',
                tenantCode: 'xfv1uzrtf6m1j2w59zdjq0bxilurfwbcbprj0ieqv9smua73mh',
                systemId: 'c13ea897-7e81-4be9-b342-6286a6cde1a8',
                systemName: 'onhxtp1iefi528zwatxm',
                version: 'pq78c4zr6civ0jonnrvk',
                scenario: 'fyhsboystro7tqaqn7gkjc4jfiqimhqosgs0amar0m3crj7uhyp9rqctehs6',
                party: '209ze2c8i7t1wjagfy31vocaqds6hmataj2kdtwx92kf5auzpy926uxt03vq9lhssu7b8tuj6z80uy89xz9bz39nydhz26oindmc739t5e3vds2krs8u2crhanshenu22l07dmsu9hzmz79qjdh46fskz93yywy2',
                receiverParty: '13rekd99nh2nfvwybjdb04ac18kwcwa0u17xnc5xzavj2fxpucszqqn6ot0ozt0tle1r9hyfj9ufbpqt0i0gqmfzjnf8bnxr4b4sj2n3dmuscu56moj6zxmzeru3ntf8kcahag39xsfdamy82xhtjs4u6dswpbtt',
                component: 'ay3nc1xx7g974t2pmbjwvoykoilii7b8832ishqr38ahwl1xd5w6jd3o7n4nrgcnzrat386vw89m1eq0la790asqxaelfbvy1zptomvjh8xtt0essdssg8anbb6s0npmrtmw1mxvdgfixcs5c7ej190907y9jjpn',
                receiverComponent: 'y7t85rryhaobqa1686gmmzgw62xck27093rmkyurmifi5mfvu6yf9muf9xs34fsrqbqzy3cxs6tucnxxlxekbwdcd4su9j98s663kigmpef6b01or6lb8p2zgkzfmvxod75pgki492aldgpyp2xhboxhncw9nlzl',
                interfaceName: 'bb4pny9y1u5yc6uax4f1n7p05uwiid76zybou0mwcf4ju1x0slh8sq2m8qa9at5dcng51axy8w6y8929bnbx7yhde1i4xa3oft99o1yqrnpy1b5iuwacyqnyt1qo3v61h2vkc2g4aaw63alz29n8bxzrik5an2qv',
                interfaceNamespace: '6jfdclty4xa45taoqgqmh05dg3ersss5l6bs08zuey8b4ia4m9wpvr7ie2y37ycn8vcv9vh0ztphyf5i0g0j9q6f37px6c0u2tuhoyzf9mwyszpj93drrzmn3117szj6klhki92r0gk1auskukf7q1a3eppgl0c7',
                iflowName: 'ug5ulawlub775b2iudqfsd7681wr7moh5w4zu3lbcdixpve2bkzh5gb7x9cvb65prew2dv44tjus1qyprecf8r1p4nsvuuvwpcqf89zn6i56nr802l5ejizpezk1tugwu4ur353qhsa67eshu8utdyvnsgah7al9',
                responsibleUserAccount: 'ktcjfe6bobzck1cub0v2',
                lastChangeUserAccount: 'tce10x17g1irog8fcf08',
                lastChangedAt: '2020-11-06 06:52:13',
                folderPath: 'aopdwwczixxopl2nnbboe8uruofqo32qznehpwelqi54i8ygrzk4610suv7bdcktyqdnat1idyd1eutvl7c9q3xd2zuvsykbekhsu61d6fnmmmcjzzo0winffjgrgkahzbiy4bkyurqnfgyiuein2gtcq2m43me292z8gt55q2mzi3us7meb5lof0ph86m65m2yt1lm5qbwebtxeekw2shwui4tua1lrjyizcx0ovnztdvrwieb36mfbdy125u8',
                description: 'hbfg9vt8lfbwra9iasgdh0s9c4hrjxoaf1fa0ve1r3upcs7iu7sum1py99hlwd29u68tw3ybsq06z4l479qqv7uatjj24dyag4u70gtt0txh9myg1sajmx2ysnq99vpnbpcjlq8l7cjckypbnv9up4fp1sgdetwxoibw2x43k875iuin1yeixfgnnp0v2vg4wl2fe95lsxrbof9g8ow6shjhzaw650my65exsva75qjhd18vnuf1znz28or8php',
                application: 'zg8wtd60w5ikyinazx1vncvi92qm0qhbe6khaq4lpxdqxer21hl1tu0lw2uf',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '24ab9cfa-437b-467c-a20e-4d8316d6b28e',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowHash must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b603240-1c33-4c1a-92f9-05a28a63bd88',
                hash: 'dmqbuo5l49xulyicdastpqwv617qnu6fpx26how6',
                tenantId: null,
                tenantCode: 'ufbgss3jj0082par4uw05tyyeqfuflnyq2n6dwz9sd0yhpktf4',
                systemId: 'c13ea897-7e81-4be9-b342-6286a6cde1a8',
                systemName: 'n9p3pxfxx0y88n8uuitl',
                version: 'aip5exinn44h5ec7b3a3',
                scenario: '89vnkwbeto1e3lye43qz61cjt5iopeu8zc68yh32dd19nuey9v5f2szj061m',
                party: 'z7mn0y0rle4vzol7ufn00g4pbtz96z98sswjykgcztjwzhgqhfnanq0hb7pg2l2c4ki1cy2hqvtebgav1wqiaipvjiufzl8hgrwp2ja9ibazg459uf7hvo05wxanisibd7c4h614j0npqtw40ua84kvn9ackdo3o',
                receiverParty: '4eyq7c82czd0ghe2vgmchlq5be1ozpvidp1bof8gdgv45fhymzjuh66nnqgjxno5yee6dwzn128cmg9fvxxd45f2lujr47idq7gnrds8zwtbd5633kr0leum9bqfalkswhzusyu3j7ab7vs7meggz1saafl440uq',
                component: '9yp3rjqhkckhwyllb85exn1qfxmiqba9knw2fhvt1rh5fbceuy7ml84a8qu2et2nkvbzo3gv9ytafcphhv6wdisyqx5oqdlfwz1dcj444c9u83b5dyl94tmly1hwnzkpjhkgc2yi2tqpbw21g9rp9ejevtygbh81',
                receiverComponent: 'nannqsop2w9wgtved2dut1cs4vgn7bxtyzbkjtbj5ryg0mi3oq9tn40zp5cu09jos7xqdava1r5vrwsglgfvk2pdo2o4qmufw00eyil8bd5q7ieafoavtsbj9do2g5jbji7m5njhz3vyh90l736mgklbik6edo91',
                interfaceName: 'kr5586onr8p16ycvmydmukwgio49kotpomzsukdknrk3dhj8ux8ij34v0e0dm473qsc9m9i1rl6vhzyi3awhs1vc10sv7jo1vk0canrk7nzu187nixf9uaxdpqq7qypcp0jt6z48cu9zyo7s0ly4fqxy1mgysima',
                interfaceNamespace: 'nmcv9acme72qnfc2rxzysq7c7ljd6x59rxt0tujsuxjgvizkdwdhz7vyhbxsywj6v2vi0qaq97d9hfawnr7j7x4d3wl4pny29bxe6ob5jds3mch1e6ywb2z4qetxp7fugtyij31p9zcvx551bis47r9wu0akwsy4',
                iflowName: 'o1whwxybm6dqfkiiywk8ik5rq9j9cfkrxtywj6uwxd7anx97eh0o8y8s3h0j0emi4jvhv68r6cwxr4gx1lyeolgtfl72efabjm9si44i3jbw75bg8p48ppl5zgm2hgok34eekomrjjwodh3p0uffxmz2f4wfu8oh',
                responsibleUserAccount: 'p15wd3llz21196puyhfm',
                lastChangeUserAccount: 'qwstxob0fyrnvwjexdkp',
                lastChangedAt: '2020-11-06 00:11:44',
                folderPath: 'mprefq9svkwsl65si0nltwbbix4331aqglm7jqcj0cg53p96y3cm9yw7l5ngynjt1717e2rrepixdj5ya9vyc8xxwa6vwctf96p2jr0xxc3xds7c8vuzd5paq8cqx5jhwrhg6p1amogmjtj2mbavsi32jhkr7mc6sztavzs09kb29rdu06p67w3op6zny9nnf7e5orwq6aqzzzfvy3x0xoyepzcpiqwgq6f8jw8zcinrnh1fu05bgctqcjyirtz',
                description: 'qqox49927ft55dbl1vcutskvox5h0yr4eyj2dgnxvvhsunwnit3nbz575y4y27k2riv1ew3qxcv0iua33e19qy0h6qtqt2jj5v3ddex8mwqzsha6frgjiw1mew80qow25hlbtcdih5hevbbcg3xyhxcrgvj3yn4pgb1vhb9o1xym175tkn3woe7gfm3uax9voczqwj1zc42fmuty1va2jky401611g56jt3bj3n2fl0oe6ih0bkqkihtyv8azte',
                application: '5k79ghmg8azaabf65uuvb8wd8gcfp2xlpdylmrqgyi7vjjtil6fqtviltcwd',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '24ab9cfa-437b-467c-a20e-4d8316d6b28e',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b603240-1c33-4c1a-92f9-05a28a63bd88',
                hash: 'g8yf558elrieacubr1h90p186cbth07zuljvas6q',
                
                tenantCode: 'fxrkms7jwhd5p8uyfn5vyy1mn2jm0ymwogs07askkq0inx794i',
                systemId: 'c13ea897-7e81-4be9-b342-6286a6cde1a8',
                systemName: 'xoh1wzbcw8kqaor4xp8e',
                version: 'aaw2bnsk50f1jsflkp42',
                scenario: 'ubnxvpu5htzwmnvjyff16jpzl6mt08u6datruch58wdlfom0nijtjw95i4k3',
                party: 'sorxhnpxtb8t4v5au31uplag6kdsefrahgagsnrta0vv9cxoybtw59ubdf7gc56f9spipr9v3uadddfolcqlzswxhkuuz30t22m5magd92ofobkwbs4cgz810wme6pueq6d8rzogl6o5cfheoc3wtc498m67becm',
                receiverParty: 'xscd6mmkd5tapnpjpijuoyaw636z35dnnw4h285dxfxw0qty1evhy40lvvplvsn1iaun5vylhh4l8e8s9u9jmjlcublrnfg4i5i4sidzjlzj6u5qcdcr3g4mxr3bsnkharl7sz7wrpv5xty4ml9c7lbte9030jmp',
                component: '1uu9wurn90gnxbxjrjrhhnfmdt7718ovu8wx8l5rktvhdxx78in6qfyqipen50438ei0y932xczjisic2ebk53idwrwgo9ghu437xnzo0f9a5a6k07ebscn101zd34o8ts6709tpvm0vma41m2dy05oqtag8r3of',
                receiverComponent: 'tevy1hfbna70a3ewdmm92waegekgri5f3pgrz9oz9hqp72b3gqqh8wp7pbw2qlptmp3vez0ox7bmctmcywqct4z09p2ol3v41vc5d9amcdfrwgwjmrl1rwy71on004mtsxk0hip82sqaaxmvbdyxb62rnz1dq30k',
                interfaceName: 'acfg872tapap4u12nrob5cw6suyowm5y8peb86so8omebyw893ca9gjwyxi1ik5pcmuen27xj1j4ibi5r9sw0e1963v6sawrl3lhg4bgd4j2bnb3l54h0d30v6c6matlyhohznruvrxyb43vf3pyvhn70ajirx87',
                interfaceNamespace: '9z5uur77ue8vu4g1iq9umhvl7xq9dskcp7y3ax0mkjshlpywl8td5pn8r00rp8l5wl4ac0xtkmu2i58w6qm5gwzoj3xo957usytkaxd3mu1493gbk4g7xhnazsy3n0srcdc42t2td3evjfvxl35eim12vm18l0fz',
                iflowName: 'y7vb1xpy2zu3ld9wxldt825hmafcs6abvl42vqhaic26kzx8k9e3ymjt69c4jpo3j8d2bi6weupkq2tqnjmbfdftq5yu3aqvqnahmduutrs5qjhoxwrxu6afhkgx91pjfma69bgcgndbzoh9m05vn6ja57u0evf2',
                responsibleUserAccount: '6w3wtjjsgw7b5sgknc3e',
                lastChangeUserAccount: 't1ia53jst82y1qgj8aza',
                lastChangedAt: '2020-11-06 05:02:11',
                folderPath: '2o4bn1ckxxtqd1mfjun1lws08hy8qswzqarihgjwh0n7kvqwx7hgm8d199sj5dix4xogdv58jqjsfiaw8p8tr066z3shb3demz270qai5n3m95oqnvvutuwiys9ftyx4o1w6qy4nxlheum1fagip289mb9mljvw32eyebd0gm2ciatgjzr5qq6fttl98c1qeiwdfilc5jpsi5u00g5rh940o6sd388ag7ebqfs5u6o3b9vlnljaooiyp7isg4lr',
                description: 'mrm5oz8wweedz0ys0uhmoky4tna009yrnu5rb15tu2t06gfacu67txo9n9pzh2ynfs3rb4pvzq99ooqruhs2k4trsnqpjqf4t72ke7udwjb6id33xvfacy8xhzlgew9b7v1ep5ovpcw9nip9ctg664wj5tdfq8yxbqv1wdd4iceggw7wn6bw4wt1n1q5gmmckqwzpusiby6ofxbiwjl69dy4kmkp9wvb4hk3xxve3wm8mkixiilim5qgt8lkq66',
                application: '7f0ugn81doh9lxb8ghi7th4sgxhj8wj0s0cej1kn9jryvnusz40uwk02kvdd',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '24ab9cfa-437b-467c-a20e-4d8316d6b28e',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b603240-1c33-4c1a-92f9-05a28a63bd88',
                hash: '7m4g29u049arjh082hjjb6omucwog27shsinfxy0',
                tenantId: '44967159-4111-47e1-a4b8-f976d847d9ad',
                tenantCode: null,
                systemId: 'c13ea897-7e81-4be9-b342-6286a6cde1a8',
                systemName: 'bo5l18umgtazt0hl0fzg',
                version: 'xjvqq7kk7kma2k0tjnug',
                scenario: 'tg1kp39cmbd24111fmey1in51yk0r2zvhee8ljivleo84xt1qb8liju3dv2n',
                party: 'wnk54yto827gf8z50poq43pa1jtepg9pl6sliii40bhkbvtsgqfv9mvdpi8duae5qto62jmpu1t3i94vdiabedvv6obain1t53wle4elbmpmq37dz1l1kkuzzxwumvdhmrollnhmpc59014jpex9j7saynhawpxf',
                receiverParty: '6z248qmp43ri57s5scstsxeccei243p4n87tmmfsqhfyec537vj5fckguux75gdeqmqt06y495wneaci8z9w6mcq9gq7wprc04py7tbh6uxa405pmn772brbyzkf96kgoj7egehliitaai3oj6he5td5rkvh2d67',
                component: '80d1wm24ia9f9i5hngiauxn8qinofgchdwn0tmblkuiqd5n6t6exd29cjh5ktrup4wz14nxn3k0vkat8mfciowu0tlh4ywqrlgzlj8bpe5ccvjlf4v8gozsuojq3ssuerwsfpbkjcsniv19hpappw8d7bhte9lkx',
                receiverComponent: '3bhy1f4e11kl5311ivvxw652aeaj37nhkn2awh5eqwlfgtubzde3d089ne86vr4v1f5o5vsl68dthcx1iwqxaffhc15uaruncjflwc5js8g32dqebtvsdaze77cjbuuw9s62nwl6o6f133wmulf160b8w3x2v62j',
                interfaceName: 'sddx3y4qluxc6peap0fw4tbkijzv782rdoxjt53akunq1ahd1unjvqnxdunmyqm3l4gjnl7p1vfdsjnytbra8v2xoey0k1aahkciaxh2i2sjvd95e1f32dq1js4uirjoxid41obchsor1ci7p0pbum4o9cdom3ck',
                interfaceNamespace: '823scra86i63gk0bqmsge57h5n0053liepxq7nb956th2tf3vwt83gvgs7sqwcqep0in8023z45rdlnar864moeh5mzozm3yitz0hxr1hyhuzzpshsll2pv4q3mfpn3yf9f93emv4dkrqc9zrvphh77c9s9dcci3',
                iflowName: '0c2nd5ike8vuizz6i2lpdik9qfdrbvaz8jz0wyj0cs2emamxslmkzc97qqqw198kds645hqv9ph8l5ect819y0ldvbob7xwnmlann745kbdfx8gq6vatpvkamtruzryhv3a9n328k685op0yqfeqi6zubgkr6cht',
                responsibleUserAccount: 'nuireyd1is1hgibs0gv2',
                lastChangeUserAccount: 'awnv396y9juvsfidxcmh',
                lastChangedAt: '2020-11-06 03:30:26',
                folderPath: 'hs1d2ve090kltfqy5tculr36b4nh0vr3edmo3keg37xhbsg66ko59we23x7795q14zu0igdajxojvp4txfy4kwwnqy9abljq5r3tbjpp9ytzktdvb7zchmt8otvc74ahlif30c35pvqz3wau1z37f6kbfythojxy6rtt6gworgr26qto7lrhlkryoqxsdeadm5azd7d286tfw9u7ah34gib7zz5bqx4bo3hp4zxjmktyojeil9bx9jlv1ljmq7f',
                description: 'foz6yrv6cp0bzilr01v3h9rwjrisn1kopekddoywellaeo9ab7dqdud821kqoiq81kvebewej94j46fj796lfwyqs1ziqweu0v3evd4fq4v1dwa7x1eoyympukm1l63tdylrmdd3izuswikjgqhfs6505zmxeuk3b346qsjxlwy3pbt772ab66kuplbyve0f889cxdod54w9du68mb17qvsx32w1hw1s9sjok3k08soappgaxesianqzhsb9hz0',
                application: 'd164b499ofsp8p1xm5or2dv8690rpcwupi79a6fmk2rhg9ntxybzbntt7cu1',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '24ab9cfa-437b-467c-a20e-4d8316d6b28e',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b603240-1c33-4c1a-92f9-05a28a63bd88',
                hash: 'r41my3njrd3sd1kdyp3rzdx4fpzh6w81pavj4kvc',
                tenantId: '44967159-4111-47e1-a4b8-f976d847d9ad',
                
                systemId: 'c13ea897-7e81-4be9-b342-6286a6cde1a8',
                systemName: 'fdnwc8ponqt99skmgbrq',
                version: '6kiod7ijejy3a8ryg0ta',
                scenario: '3cfh00h71s4txwk2yi7vhmgxvohdpjwqgrh0sxxy9wwjawot8gwb9cxf4vvi',
                party: 'n8ern83y6v66y9ahdthkhpo3x2mrct2ysd03pl5qu2lunwhg0gxvofbhf0pgkur9quhbakn3g19u8wck000tijelr2zl9thxwhbr0c1txe8m8h1k6525dkq0vo7151i5t4gjynwiwqkxdzgyf47uk14s9zt6fdzf',
                receiverParty: 'jes8h9sf42r2fiqpd32esrzqy9t8m5f5a7t0uwe67oi59ylhs20dy9h0nyp9l3nig1uuz7i9wfrcvhnpb89sh5nhgb21ukgvt53jzkxs9zjfdg4y0go9ficbay9tbhjkft6loq20rvc4x1c5fug4fvl3frn3lray',
                component: 'wtxqr48sz1wkqiixjlnh8qhaez83j7zu1oksoe43sx1zykqp2ml6pis9f63v89m991480xd742pgoz3km5dqtdbjexk26l3uz0gvp7stm20lzh8cjsgmsdkqi5quy2wmocr219w5cno0l730jnnplin4myyeonpv',
                receiverComponent: 'ecs6gpiti7frowuem7pl13kwpdb02i674f04i69dzunyt1wxwxwkei4wox6bzoo6iofapk1jrvnt2pqwktllgtejzyva08hmvc0zpobsk7pfyqtizm6sx1a2cnvp23t0h72vpdhp5xznyggg51hk526q4w1zixb6',
                interfaceName: '83vq89t5htb6gaha2rt6vovuuon212gipekuofq2hgtc9y6fob5d3ljupbh4e6byf3n6hr1wf7cvx79r43pgr6spdgkndpsmvbvzl4289ly0pvdbrffq1f2dzitsizluap4ee16q224rhhutgpdfaabki32fyh14',
                interfaceNamespace: 'c4dfmkkj833xy029t0lvy95oyjl2sks7g0o01l6b4cmtk4aq02gdl1kcyossy661yl4akk9sm387snn0bolxjv5n009gsofw5sxun4afsuvphwwrlqqhc9y2i1i7lcvnjubo0i18tfs0imnbf8cu79n9qhz3uc4x',
                iflowName: '364jjz9dmn5zl79n6fhzllylbyvgaiha25ohxoxa5enso3nfl4nctfc5b8jvr1oi8qr4badijjkaq2qba3xyesdid12crh89ehcgiyo5vcidj7drhhfucpz6fkh27ag82wgwhojmvqgc83qf85uou8vjfkxg7gro',
                responsibleUserAccount: '62jebd16wsni04me2y39',
                lastChangeUserAccount: '2x48ok3q1n73hfd58acc',
                lastChangedAt: '2020-11-05 23:24:22',
                folderPath: '64dojl41zzlmm13rbf2aj9h29df9ah1x47dwyo6y5cwqmybdgdd1uvbbsv3mszocghhiq093ijdl0fsjod1p7wfxh3lqbo3mrc7445m04mxx9yl4yvv1e3jr0xcbnvyk16n8hbcea7mzh3wexrgtpt44d2dxpddemw7vw0alpnypb7v4ayyiioiqwoh0felfa26wp21ef9svmf0cifn1bhg88rd1hevkko6elu8jt6stdrfs28j7rija5ohopzv',
                description: 'ctr5nffyrjixte1okpoirxyziq73593hqedbymrqdwecqbbdl7dpj4a81sej33v37arybfqicm6swjuce5i8vx66qvcgfbr544l7yjn1gllb5wg5jbajs07h2pf9rcbj5bcakb6i7gtcfcv7y1e3623s1tkwlwr2e7e2dcghirb30dmonf78yas4x9hufmsmqzpiprboq5kmp5tnokx7mxs7pjwwt9w4vntw5tjlolxgcyun57yesqn87aet6ys',
                application: 'owc1w7fyxojfmixsv2zpn94sfrzoxee0b451nxi6re4jjeuzxm4f6taupi5v',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '24ab9cfa-437b-467c-a20e-4d8316d6b28e',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b603240-1c33-4c1a-92f9-05a28a63bd88',
                hash: 'o84wwo425ziynbmtkep1qdfk989wxg39y5fwge0l',
                tenantId: '44967159-4111-47e1-a4b8-f976d847d9ad',
                tenantCode: 'ufhe3rrig10w8rfxu9dt6j12pfdlmje1p4amqri86c2hek1q9c',
                systemId: null,
                systemName: '76yjruma3ibdps2p1zfv',
                version: '3akg4qrkjkqa781j7dn8',
                scenario: '7212hzzk7wyeri4u39hh7sbf7eohukwtjbg92j47xbw7p6wvlkibfz3f6rwy',
                party: 'mhh1t84inadtsmnrhkl59zgmpuyqayb3n6l8xn4kndqze6e6p1kmykuaqwm38s97h9uwd7467thyd0zgp9ru48f91xxjy07wyza70l2u7g72n8dxi5i368iyvqtllcrkov8n5n4dhwz7zsmc1z3gcgg155lolxzu',
                receiverParty: 'u1q4h8t5fh5ny8582brlrxi56b4umrzlcc4johxh3odvwbxicjfyxjvf7qh9fu29rz4ppf7cra7wol8a7pgs4qlf4vozomxmwakmqe7zmmrc8fp2dhrowx4usr0drqcz7m1uywv0lqrwgg6sje6g93kmwkwpbtk1',
                component: '6kmdqs5s756bam9bsjehon1cghrfqihoxb8ryysvpy44lnfjioy4wq2yz5yuqt7jm059evx1iaaat0pfiyzgj73yryw0sjmjhn2y4jh0w0jh30k8fjwfahuo50d9uwuch9zk72xufvxusuitu64t8uc3zv7e9njx',
                receiverComponent: 'vj73xza9jsd4x49bz2wyq5p8kac9b11qvkmo9eo9lxz1mtsoae8p9kejoy3qoldao32dzpuf415khg97txkwft2qs1xgixkg5fc70yv5bzc5dbfpewjnuj4lv0ek383n7tpq3chh8sk0a4tj05ktydqkvy8oqxdz',
                interfaceName: 'p2yik7tavhi95lll6gjwbkdzdz77ah1i20i1vtitwbkfptvmd23hk3l41ta3tmz7i18wsv53dcycy5xe9shwlzx0d0yauu7z9tfzn6fcoerjlxmagr737f5fdcb4b2tsly4inoj9qjwv8gz12l18wf0u33w45b3x',
                interfaceNamespace: 'wvk1c2iauz5m549ke7f8qmfvesnueak6vihf46rn7lwn6bfa1phijo3niwu7qpsthudo78zvhnwitdcnnn7frg1h6rxw4pj7wxsxyzyop98kf9cir067wahvt6y0qcagun8r4j6bqgcxsayx31cv9jbl1c5adqbx',
                iflowName: 'moso5hsi481flsn7j4r4sekm1juda9qq1tojng0qazk7nhbt0u0wdd3f2b39i25s3x3dcut8n3ynuoxiplqtixt9vpaiizt0e0r8hte0amnba8c4xzvh1tsk4yfpf6inmq9o86w4er0yjlaz0bq397yog01v9q92',
                responsibleUserAccount: 'y8v31e7g33pexrgme0je',
                lastChangeUserAccount: 'mitwx2bvcw4lhjhtrw8h',
                lastChangedAt: '2020-11-05 16:27:17',
                folderPath: 'jx9q1frp01ncxg3dk8buofie2mkhsyezil6ssebb78ogrttt6h88iedqt036uaikebdqsk2rpeazvi3znefdiaq99551qqy8dhtl3vuxeqa3aych69quhyhhl4twexxueg3bsfya7zeczjvjpp3ll4uz98in4f0djr0lx13yby882y7lr0bcbmxhr1q01jhxiymrbhs2b1xtja3bpo4zrm2zueq9yax5cvksshmzsfmcl25ucqi5rzlu6s4p583',
                description: 'g549jdfxikoaev7dwdl101x1i2os6qkznner1wt5x91gv9ika5rojmlwhmdvk7xkp9mj37hpapits3c1ue184lnn8gfp9sdqbe56w5b6urwnwshg2o14pdhzkwgx3mp863qcjwx866w0tqms3zoi493nm8dh4nv8ylxsdv1xfwwxwefzk38q9jabfxbtgg1gnmv0k42h6426ywrj1h9pcz27ss83m3p1esrh9e7sw7blyynehqmj8vd6j5kz0js',
                application: '0vg1fjlcp1hj6zu96rv9h6anrb5gwlst4frjvcy7lhdcqlf4wyisp13v8osh',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '24ab9cfa-437b-467c-a20e-4d8316d6b28e',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b603240-1c33-4c1a-92f9-05a28a63bd88',
                hash: 'frzs5wkzji569r6hsl6xgoi09nvi8mug0l9hm7an',
                tenantId: '44967159-4111-47e1-a4b8-f976d847d9ad',
                tenantCode: 'ajxt7tqevt2rovl2vo5ynhoru0c9kd1k90m1xhwi26keoc1jbp',
                
                systemName: '29x90zw3pmxokco0itsk',
                version: 'h5378d9lu2tzzlnqfuog',
                scenario: 'spdtcl3gdlmgly0vqsd9gyxc7j738lm31tiy88o65jjmo1vt4z71qw4j98xq',
                party: 'nbmy634vwead8ryqs6dqyjf0eigckmlcti2xpgfow3a8fa517fg6q6ti4pp62bwctfpu079vg3eflyxdo4pgaqeba1z0bco3hhwe3h7cuj4gfvtwz84x6fp41ntpsjw5dvf8lwhu4g6ijtlkl1tsrwo2pkd9ki53',
                receiverParty: 'bq7lg4y04klbdqhg2u6ok8zwps4rr7ddbcl3lfcr0tfigsfni1b5fn5ujasylq76hwpxi9nfdugcpbwyjxulseqpwnqhz67q568n7kz9dwpev68vzzy6jihwhr33a3i0uk2onsky38nz93a6gkixddo142dtvhp9',
                component: 'g7kv5kir2rzvwvflwgalk4hits887f75c96xemci7wrc74o0om7y4cqdl21ihytz4c45kqrnxl936wi4w6g6f1pymijgirag3slwyhafug89s1u4zpchctr5cqoqwa8ll163blmm7te53t7tecm9gj47lbjknb03',
                receiverComponent: '1zn1wuoh4fh1bffyesvdnksr7hzu3o3pa62wah2i7lwu22j89m2cbnw5ubx9730gjcq0c0g1sr8zrtiuwul205i3dnivb5ndfwemvg6ixxby4kjs1fsqqxtwp8rwlrx4rkx9q7dkj1pv43mtado1qe8v9uyzzaf9',
                interfaceName: 'nd5fg95swa9dj1ar7jpso6rcjcrl06z2y9a130e8vj4m2jbfksnx9u9rv41jx24f0i4sh0sn9mw2pb1nfy4evieyiuatmua4x9xodlvdyhvh4fxjooozguzmxshj8mmzz5mw3mtvsxp7njvnqfbfsyuc96l0xjtx',
                interfaceNamespace: 'cevndnavmcw8kggwt5ozwm4rs67j7581f7lf4txv9ofizol4ngnlfiri9hgkvwabmbgbir8qdfmvc7jc3aytochxskkxqh81yemsxcb7zts905p16c5efgf4pzma5iqkh2sbasssqtt6xv0fsqiyph3bp47nnm7g',
                iflowName: '4epvw0aumjl764wzhucmilroaz929aik3qedqbo2m18nxyoobymn0bu8et1pr8dbl7g4fkfghf4zp7hawo6vycwvhaykrz8tv1q6m7vahykp41wb9rzc24fo5f0ichb2683uixp2nt9eb0nnj4bk0docecjr7tv8',
                responsibleUserAccount: 'f8e1lvhrf6qgkhnoiasi',
                lastChangeUserAccount: '1q5byyih4de4agc8ggnn',
                lastChangedAt: '2020-11-06 05:45:49',
                folderPath: 'mimbdqmnvav96eg24tkkivrg8v4szy4w7fgpo3evkkzqgzmp3bgb4pdujnww8m9tl69svm8vu7c4gfrd7ehb3gj321biho7wjq4zkbxt7j53ky2h2euyg580bi6f9mg5mboenqv2gwt6q87qtjptx8ss0hlr78lxf0qqltumywnk9zy9cb4dokuopuxnp6etlay0epeufjn5npxdep6xal6koy02zg6hz504d7qucejre8ednzgta6umlvafaco',
                description: 'xs78y5qe83xje9uyhwlzsizntze5tfo71ioqditwvdgrh2ahmcro89fudm1wt1uegi9z84q8zgng9xgrn42p09lynprnam6gq9k2smbnxzwnbqy3xcodfzjppnzm72pmj3c1hgxe4rzwyriquud1kj4ky1uhxw5ao6w6yiqaqluhlw7upamucqeucheb1gt3ttqi8h6fo8xdpp2099vv0wsw24j8zouljipprtxadgxbmjw9luu6f12ngibtlg3',
                application: 'r9lu94qipi5nqfsq2r0anqgrc5nu33pozzpnpunrvjt1nn5c8qak7ve57op0',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '24ab9cfa-437b-467c-a20e-4d8316d6b28e',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b603240-1c33-4c1a-92f9-05a28a63bd88',
                hash: 'df4stzshr0srj2slnarcdro0ngyzz7at8y3drctr',
                tenantId: '44967159-4111-47e1-a4b8-f976d847d9ad',
                tenantCode: 'eyt8i21zm3owy4hzju2aitkqxoexmbwwiibe429a3qz0c7kagj',
                systemId: 'c13ea897-7e81-4be9-b342-6286a6cde1a8',
                systemName: null,
                version: 'gdglh53q69ugd0vzo7kl',
                scenario: 'rqc5xxra8fkr0w8ji5axpisr44nsg0swczdo04cyyt5p9uu6a3poq79kr7jt',
                party: 'hsecptt1uv3pz75yrfzl0karho187dxi6r6l1kp7rfswc4bo96ocfb7dqu6zzh9gggykw2gjn6tdzl0xklwfl7pzhsbb610rbtyckv9m1wg53l7ffoyzx3e1uxa5tlk2q7ikcc6fxu2nambqipp49206f1hxdwh4',
                receiverParty: 'kaeyjahem8j75dw0cd5gvxo6d1rfp0c1oxe0jzblar0u6dh6s468mlp6tz8zrxc5ftj29s3eqmmmja5zx57a3fo9vdbgtcvpgw67w1ep4opkmforxrgh87fc7bfv50030evt6rjgg9iy1q6hhe414k7v6msvgxky',
                component: 'hjxbu7bxyuqlrsotggsmjuck2hw01akvd08xbmovkzqfde8jgsc3ougqjh8d4nrtshnxke6ddpnfcfzk39mdc3h8twprjgq6ioxzkektukkjvbr7dl8batq353lljvaljtnbc9mipthsy2tow51ydjuh6udbeqge',
                receiverComponent: 'hg7x07yx81o1yw1xgfdbkg9j0sjn45jzfykz88yuoodj5im899cq27ixbv7odwzzjkyeagcd7f8p9z2xwm7nrsuob3lcw9141y1z6hj00ijliuz5t56ryu0wa3m5g31sd9jvn1h2hn10e58ncal7ilnonuj7r3wu',
                interfaceName: 'mpmwtcf3j36g3c93nqyd1a0u0p4r0rj55k21ugwy6bihcawafd4xswjctp0ybdwdwqgzwy1djw6128bqn50n57kps6ye72jowlz39xcp2gfrxt1udxzqa3o56n3363hjh2e27u2qa8bimhz1k0b4lredhfqiiic8',
                interfaceNamespace: 'ucm8b3wvq5psvqvtfn4ariwj5zuqdv5lgc9fdzztfhfuntl25k8nlj0r3l4xpclinh50xjxe3nu044tsl88qwy4ojdl5euhmbmg0hsd9loa9kq8302vu9bd0pzvwomfyc5xa8g073h6c61ogmse8mvao1a3386i7',
                iflowName: 'c1b9p2xkhhwz0koqv7480j84usw4s74eu7z6j576xwwblulg043aglkqqher64o854w3h01kjyfai5mcu130fsl2kt7n065isjrxxsnfian4qlw1zp23f0sa827i6h2972hkvk60035flof1akt78dy0zh7ptwjh',
                responsibleUserAccount: 'adwwi2prp7q0vki2bove',
                lastChangeUserAccount: '41g0phrkfe5541jqen2w',
                lastChangedAt: '2020-11-06 01:31:09',
                folderPath: 't3kcfw94clayep82nd17gvp4igldro5jnmsknf3y3ygt0yrkkxgwtgp3w4dtbhj532n2o6i4ezwlp37sc9qqedd3dlka3b6ij6hglzpavpkqjlncuan8o8oumuitmd4wr6io719rlntxfur1zcqstt2zdg5e4enltcpvmk43mebxd69hh70ilx3mjt7b6wg5o1vdca7fqti4z19weodsh4etnikv96hyxl3snbnjutvb4ow46cju1z4nnxy90yn',
                description: '9xteq59auh0yiccj0jk2cwjjwboyaf9k8rqh8y80z7fb9oid041q2u7nnaeh80xb0pc828p2l9bipsvze6keq47oh1ai0f6azrh06oc5z1mbtwj27ln3kya2hca3lzadxzxd84s0ch46z4f4b72dkw3zza87rv11tuwzu4znp2hi2352um3wumwf61swppylg99c8bik2lfoihjjt10x40as60n566ci005trwucdcuhc4732wuze1jb2px6ftf',
                application: 'tckk80d3q96do5qj6po16k44242ofwwjojbnax0popa9n157blu7svguoqe9',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '24ab9cfa-437b-467c-a20e-4d8316d6b28e',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b603240-1c33-4c1a-92f9-05a28a63bd88',
                hash: 'fj2rut1dngjzult7jbvxm4h2urck4ij81tsiylm7',
                tenantId: '44967159-4111-47e1-a4b8-f976d847d9ad',
                tenantCode: '2k0sas26w0mqwl8hwtv5abf3e4k3aaibzwcxhggede3bo278ej',
                systemId: 'c13ea897-7e81-4be9-b342-6286a6cde1a8',
                
                version: 'smuge56c0azmd7jhl7vc',
                scenario: 'r2px8hjd9rz73olylkyrwntnudbrsceqd19xxftyrrfno59y9mceaddre2he',
                party: '3y0g1waqh8ddz0l6769c4rgfpy85745leqchm2j1xblohogxrg8hy1lodq28y3bzypmztxinjfoozkf3m8tsnfn2cyr5nxvqmwgnmu6948x37tmy3amks9um2w6n9claumauwqct81zusy3w1ax6b3gqqyembtoa',
                receiverParty: 'a6gp1ikw01uljduyi023s43w38a5jj4k3xv7hn8h9uurjz006e6jjho27sl5a5stq61oh0x5pdwb09r8yzwho18vi1dczhfibsnnydkvwsmcf7dkqyep12u2h1oaonkhhj4v9wnr4akzedkcf5hwmrx2wxgevvyw',
                component: '12zsmy3zykr2n0rckqbc7yhspyjbtboujzfqxaj4p3ycixr4b9ctcer68wjowbajsckm1s74nuze5timkz4bchdkukqjrkqso6volrcbd03gbthll4cjubshtbvqneoqj8qa954yncyz3nhgsz1qvqvjpncjtn3q',
                receiverComponent: '7ccr8xlkbn0d19eef4la6yv2lmmx2oceh0qn3qkwhexx72i4oactu25z6mah82yt1fgzx37x55ecl8rqurufl7kdqs5slj2qa69m5s0jdkda0e2ag9u4fcccv4p5m1m9bc6c71pny4p73cr41q74pi8rc6cvh0hl',
                interfaceName: '1tx36f2mq1k5231yoy2luo0iowcyqnyt3l8ks16ef68eewh4czq23ad4iatfc7f510lobevj6ijrn5fktnbvdmnjv7t50skrsevh1vdklxqc8lz5zx0dn6uqd7pm3dh41xfpyjgtn0obra72eiddfn3bhrgm4gkm',
                interfaceNamespace: 'vg2cznf9nukajkmihqndp6iaz075nudxwyzl9211mawcsgeojw6t5kfdzt5gdfi14m9tkhw3pxzrftphurmw6sdcpl9soe6qp4qjje1wvm6mv43xk0puqxajtgz8djvtddampaemv26g69y2gqclmabkmk1hj0td',
                iflowName: '1xqid78cincswb3sx8l857fe5x56aa0ubq7ccap6m4ssnit1cm0xgxq6uy3wzbnlz6ez698zf4cr2r9j28wpdtha84tun4wjw7iacmxdmlcextzef0sjudugjl9ralgw82an3mvgxxr5c13izm2y3vpydo7n63pq',
                responsibleUserAccount: 'llmt9hwjtksfjx4y0pi7',
                lastChangeUserAccount: 'jn2f40l9j3lnd6rw60hk',
                lastChangedAt: '2020-11-06 00:51:15',
                folderPath: '5u5355zhknjg2978sbghesnasdpmruphy23oeqqv85squ065k8v3qxui8dl72fe6edf43fh72oc6bdlzb3ejkd7jfirw3zxl99igrcx3tpw2jdvy2pktdatgdcuukxs7s3sh5xhkhu4r9hc2s7lfs6ib8dotuy3ixesiej0upucbytdaqg9i170el29n43mr7icqtq81yb38y0zqr7wgpb4o7bt8skjgfjj6wkhvx9quodvhh48cxxfpncn0clt',
                description: '0hvbrglxelnlhw0fdeurbjrw8i7j8v79u1eb5bjgxssdc7ab8r5ow95do83j6oovjxly17wosvq03y3sb2oqxkmvrr2c4xqqc4o33ychcdi7ciz2zrkhyr2m4ujnaqeaak417ed2q071oa1vob5lk3ptvx5gf69g2y511r21ue8nfpc5grxorbhyio3lrmiy88jfzyx7qezzmvux3hlhd3hqmu5nx7fry058itstnanhsl7kkz4jwlosl950zw5',
                application: 'qd1b92l6a1tdagy9if65diu2g0xiohkoshhldbaz8y0pph1uzpgvbrrdgzw4',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '24ab9cfa-437b-467c-a20e-4d8316d6b28e',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowVersion property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b603240-1c33-4c1a-92f9-05a28a63bd88',
                hash: 'uqo6iw5myeqtsjcgj6nhnb13i9jczr45fwkkyn0y',
                tenantId: '44967159-4111-47e1-a4b8-f976d847d9ad',
                tenantCode: 'r30vkv711w00pkz9yhy116qut4co6nhsrl8wj4leke4cqjgc6r',
                systemId: 'c13ea897-7e81-4be9-b342-6286a6cde1a8',
                systemName: 'wnu1e7ozn04atwici5y0',
                version: null,
                scenario: 'oser6psv0c56gx8lpe7bgkansr4jpd46itsioosyj49qe8n7gp2dfbh4nnrd',
                party: 'kwo6vv0awyvq0ux9yj4qrtmdhnsi0imonrwwffujff1kjo344q8guq5pp3qo26bpihy3sm3qmm125sdu1l5vn7zw33p1iv60eze7sl0xgcxt44vx22r8flrzgpyryt6j60py0u5u7a98q7647kf47ouplzhp5iar',
                receiverParty: 'uqo1qjm6a80dnepy21a14n8sj3p86tiqm4j0neka80veeilpxfoqfmzlhjjpn91vuo95934qify9oc18kq973sufyvmts4ciyopyzk9biskekchfvnhzpq0lldcfjyikjced37ajcffqwhldkz6sh9vum9bdo42d',
                component: '0fjseaphm2rxdus553ny4iqudg0gm0lj4kp851d3ypth7xyxbolmmr3u4o14wldoy4vxmo9tic5mvj7rzpaoqgthy11xmp5ozm5cm5nzexlf4p9tacrnht172aahtnhx5jhwgazo2k2396ln2zgiyqn3pe6ujo48',
                receiverComponent: '2dlodbr32emu7aggzww4h0oxrw0i3tzn8du4ntjxzqeteg69zwuvtrbbjbq0gtjtjjnidt45m99emcty1u11g6z0n3qlt7pmoi6ol4vgw03knff85hp5lko5wp8ueywq4mhdcsnt5q8auuzeeclq8udrp3a7k7l2',
                interfaceName: 'deob55gm201219v1boa9cn21nbtt7hszh4xdksw7bmwgdtfz2m10y3qgqpptcohjbsgkuqh9ij9jvtr4l6z1hlil77qcrymgxosyrms4pj60l1z9lk134gmntjfanczz1qqcsk4z3wqai6qg9dw42bd63xxiwhnk',
                interfaceNamespace: '56pjwtdxi2pfae8km4shocfejxss8v6gtua7efo3nyykv4g6b4sejxg19v7ockqjq41wlb03k5khrpb81q4brf4ccvezn4elj0brdzorwfqa21hvj5bet5u2f57r1i9orm910r0gd7s12yq54k1xgu52pq2vl81a',
                iflowName: '6u84jqn94xa54oz3j0noy934d911g0zfbx8tjhuff6z6e19aag5xw7uo9hxtl0geggi91o6dqvh9mws04u6qqvt58wvv6ydl3712bh0ussplmjkt9bok2n0obqqx2oz57ruxd3b02p29lp79o25t9qvunke4vafq',
                responsibleUserAccount: 'ik1sf48378fckzpxeriw',
                lastChangeUserAccount: '3y70tr18v4fmlx8eqzw5',
                lastChangedAt: '2020-11-05 17:58:46',
                folderPath: '8k6m7x4mec7c1cdtoqbuqaqr9j0po03s1d05rmyknhedsjkdl1xjzlkw9itipb0hrrutkcacrubmxkihyxc4ywfkzdtkmzcf87h2hax51lx1ufp5wb1uo1z2lserfnjnfh2r43rwkqpk6a94g6mm8d7wnin1nb56m3mez72vsxjnz4j11nr1rue08mtdzxxj53rddetj8r5geh24bm593v0d9xpm1z43xsudhmt52lgsh7thhr6izy18q1yia2t',
                description: 'zr1ri9prxhqttaxbw93g6us7cprb1idy4ujagccgxe2n1gi9veyx6dtjilrdd6a4sb8ukqqoatxvnass063akkker2uklo4848g7h3uoymdrhu90vff08a9dwd5ypig2w2lwelv04izgeuyvavpqzzbpiaoif0ymjfivp6itlnblbs1vup7p2mwhfcku5crxdnxzztnnbrx9vs33kmp13z8avr4gvqmer44zh5kz46lhibolm3lp82w9nnsdrod',
                application: 'kntytq7f4ickywk55q2zvrv17pvszavj8o7q06s64n94ic7lakbpsb2r6d02',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '24ab9cfa-437b-467c-a20e-4d8316d6b28e',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowVersion must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowVersion property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b603240-1c33-4c1a-92f9-05a28a63bd88',
                hash: 'cft1996achzruzcirrx0j8pgqooiqu5bqjz83krb',
                tenantId: '44967159-4111-47e1-a4b8-f976d847d9ad',
                tenantCode: 'mr4xapzjsn13tqunyka8lpuhxb6tt1wlua8jx7uk4gout1ow6f',
                systemId: 'c13ea897-7e81-4be9-b342-6286a6cde1a8',
                systemName: 'cqr9r6j3nyv031lbh1lo',
                
                scenario: 'tbgafvaffyz3rb69zj5h73t8ovayfvnsclm8fvxamyjsk425u1w5zg2zohay',
                party: 'a611upxtudeioixhqh8pqdrvl87ob0crnr3ozkumvyc961tajsf3278w1xvwgoyzzcezbjgkucqlvp22jhxn1naf90gbl7hk7cy2upv4mgzl9v8ez4a8lumxcnz26eccamkue8v3xfvj1lzl2uf99olc7ui063lu',
                receiverParty: '11gheuxvtw0ymeoh5bwllrcm6a32vwv8w7wpa9svoawmhtroos5qj06p59mk4lqkiyidpwrbdw63oe8rzwjwn3l6t2eto9htpzvo5pgo10ggl98pvtdcolrsigb5s5e4ie6rn8outnjbcal5ukptc2496d4evggm',
                component: 'da1dlg92yjqxs70fwlb5pr35c56zj5o30j8mdx6ft3epdemqu9kxiasbgjfd9f3yr40disda653iyppg5xqp2cxzb6opok8ojwkmtljl8nxg4a3l0kgkg5yqqit7vyft5pb0js8fg97lg7e8o90m3ejiqbakchef',
                receiverComponent: '06iuthstmk76e8lp76z4twgr66ocrb0u4psc903pr9ndlb2ydore0a7ee9uisu30vtzo74vznk71zjheipj8ms2yipdt1b4a31rywccx5o3svahg9wr0kofct8r8gw1nl9fd9865uzw7tpghppccrmxytnwzrb4x',
                interfaceName: 'aoyarsdy98pk2228us0o1cd8udqzr3uoc0upij2ap3el8u7kg0pfafgczmlwddgig9hsswr02v7g7447rqajz6vgd2t70k9fccuxmhiyxeuumy5t421m32uvcp290peiwax7euyrq8x82yuxyt4w2czdvz6k0la8',
                interfaceNamespace: '9m8fxlr4s4urqnqls6to1s65madwa6qu9oszvmta1w8prpqy3gv6ukesiexvylt4akhrxdwa4g8wjnrtb0811dajdf9u2rzh8l908zgzvokukjbp57dhgrv8jlc0nsn78bmn1qlmm60hn8egewrmbwllrao7gqrv',
                iflowName: 'fkh0ggcl1fbqhooymy62ki3zll3jhd9lr7rc4fswfiseihn930a3eh2jbvhp8aemtcfxsy9kbvfpb6dijp10bg14r83tcomsdxxbqd80qpinmnfie2nfh52u8wr5jca9djmwaqop32ht4aosrt18i1xdzj3jd72d',
                responsibleUserAccount: 'oxcacj3ktdyteemr3cub',
                lastChangeUserAccount: '495biapo7iufdcxyubqv',
                lastChangedAt: '2020-11-05 22:46:10',
                folderPath: 'ef96fg7arzmd8p8sre3a57tzuj7exzrfq7o5fcnujah4g2oz75ft117nmjgz1o8h03yj9sstvk5a7ishtj2dskrpmp60ts6qyewazjcw1j4x4gvbyuyhebm8wmamrekd0u79i3bt1bso6b7o2aui5y19ystpysj5r93yhwko49c1ior7gy5uqrhwedp5nrhyx7tj79mrt5fqg6moyyp0j5j8tuzantanudqo767rmn924bxwzy6j9din45lcfzn',
                description: 'bs0b3lhke6frswzmtvucgr9h3hjb1fzfeqj98b18dz5cr1efwybou79opnh7pbrk7k855fibhbpzcnmw7xq60jng8mbjg3fzrnufuk0q0m56keub3e1n9c9l4g2efemdqzdqhkjb8mmnd9mck0uggm377925gxc3a5pbrr74cabqvlkoc2smunlogu776jurpqwl6t2rdfnyjr7phgals6ye1791o407mn4ba0vufqgt7iju8yvxviqm2rvvdry',
                application: 'd1zy6iu31xuk2sr4z9oor5g41kv6zgr9ausp4r8o6ixwj1byyayampesn96y',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '24ab9cfa-437b-467c-a20e-4d8316d6b28e',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowVersion must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b603240-1c33-4c1a-92f9-05a28a63bd88',
                hash: 'eel50ac1cv2t2887kobqfjxgxx0468eh4vzwr6e1',
                tenantId: '44967159-4111-47e1-a4b8-f976d847d9ad',
                tenantCode: 'cj5zmqubiubuia1shc3d80m7r0xlrx0ss0xlfbpsha11tph8r2',
                systemId: 'c13ea897-7e81-4be9-b342-6286a6cde1a8',
                systemName: '2p9vwxalkpboajmhejxz',
                version: 'nm0hdnbykb1huybcf27s',
                scenario: 'p02nsiv7hlva5atisq2pdpk9o039ruqggq8l44vdpe6r01hfnl9u18bt1vpl',
                party: '7q5ksespil03zgub7gokk9yzt4k8cfx3gag7id11lmaefonwl1x8d2a10miyiqtoiqwehrw77vwxnqvy6ffsiyn2b6a20ntqzaopqrnimutnzm0qgzg6p4el9trm8xy0o9f1wkrsoo89tqdq4rrk4i4f5abl8zzy',
                receiverParty: 'uiee729iu9rvpr29m44x0f6atpf91mu2v34w4pojgg98m7fx37bf3iwfvwd2jq31zsumhaq7xw8by0g75kdlodc2p9stuhn9fjgcc597ljbobxvlr8wwfcmn4vf1ylhjsieqpsv2io9pp0tlg0rod9nr6ti1uj2l',
                component: null,
                receiverComponent: 'fhdrbz5jsi8zlfcx2txnbdxu8md1n2zwadcqjky8li7px69yqzmpb6u141pqzmc7a6771mrujzs6lwtzcg5o409nsmsrwh8b2njht9mpbqskx67mf774q2ofvg4s25jftydw9kjwp7nltx750cempaszrihiwebg',
                interfaceName: 'cs73v4iu05yxzhfekh5bjlmkt37adt33j9uxlm8eoeag4uemz5wg9bk1m1rk0gblxtwqgyrf2iekllsrkt97ihndjwrnzhq1p98kex3i82ajvjbclxiz91e5j53ewzcwh07x8x7pm3v20gs4a4gv41845txwv32j',
                interfaceNamespace: 'q6rcuniuecx40e32qvqu8txufyyv3y4r8f5ggpcvxdixsvr165ztxndfxvmi0ja2pnak904m0e906s4hphxedyy82fi6ix19h7bb53zoc5m3v13mq0lun5u2oof800kwtbsd1n3pgjdklyfdi2h93bq5p0j0tsuq',
                iflowName: 'qg9zpb9yfmx6q6biypmzuhhk8pt62sm18tckgcwdw4blk7mothw0749wbhy7p80tehzvbqcknx6gbksfnwy6q0462o4skflfmfbre2v0cpnxjt55d5ianprhy1st9s28yrefnb4iml6dvtzkmpjnza27aozxhkah',
                responsibleUserAccount: 'kzvcldgbk0wrbqh3204u',
                lastChangeUserAccount: 'sc62378zx01p21i98c1p',
                lastChangedAt: '2020-11-06 00:15:39',
                folderPath: 'pp8az6aw6uud2e1v8wr86vbuckl0jx59tf9xe6rjhtbd5wzh5w9hhymo7ik2s27veq5aeiuh80177pqttrhl439a9v1ljxlrvxqldtf4kccfvmfysido5k1f671di7uvpoynwyb3w8wbh5a2ao22ihf8raddl3x7eh7x845xn0c2rnqirnqniwjz8wnvcmr4f6m8n9s9fuvjxgmithbqd2xkh63kles1bco5g11dvzty59zec7ui6fz3qvsy516',
                description: 'pqpxg16246yb81h4v5owrwcegv0lpiqscfzfbgu3zanw7bl8gr9776b6izqk9jolzjj07d2pvzml19xbfc9la4il1ipk2jmt6qcwjdqmbb2a9ic64rw4mxzoa5c3g3n31mrnatr7980pn5x7x156vv7xuusrhq7gemn32ztabw0tnj0xhco28dg6n4n8ejsc0acvegmu2v2f7wzmduef6o99wv0yl7zhngqboyzkaqaklf5vqozpuisynjo38z0',
                application: 'q2l2teb05tmkmu6udjyka4ppzglso4kuzrg3rl20z2yz1nmzvl47p4iqhz57',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '24ab9cfa-437b-467c-a20e-4d8316d6b28e',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b603240-1c33-4c1a-92f9-05a28a63bd88',
                hash: 'z4xaze7go671mdkv1zck94s5s5rii7g04zm1f7t1',
                tenantId: '44967159-4111-47e1-a4b8-f976d847d9ad',
                tenantCode: 'j0njesuu9fs4ditzfnf29vyjyeuij0l21769ylofnkkne5dpu3',
                systemId: 'c13ea897-7e81-4be9-b342-6286a6cde1a8',
                systemName: 'vtvloaz6s7kkxalbrmz4',
                version: 'zydpj3xt6zvvd3lz8okn',
                scenario: 'peqcwrm3pvpqe2vbx9hs4w7d0av7k5eepw1t6njitxwthnw8tutsb31a1dzv',
                party: 'e66ndzi58eudb1ksfbmejyytnie4lzm8mu0cj65dyu9noo0je1hg4hbsxml0halz0pk0axqfbq828z8z0l21o6bwrb145zn5rl8yj0pn7hbugdcsbftlcow9lm5vn4bjj0y6kwcnbv5jtp5ut40jt32cdvsd2yg4',
                receiverParty: 'rs12ch8vb8spacu1eyksj6524qu1bp4kfl2yenxepyhkffzjmb7vxlg1mzv3hxea45racx8slkfffzcfvkpjnhphtgxuzm8tp023zhqtd1oweo2437nziqddj2ee926olo7gf3o59woybxnhyq4ixhnb5u7nskhy',
                
                receiverComponent: 'suieba8b0hyhiljdsj5t0idgjm7e62higtososn65pnpqzpxwq3nsikduu6lvakxh3g0al4z3bip8uf857c9htz17m3j4yljoqcue6810b2jsh4qbb8ua2pm2b94gw795zh3k4k3ebb56bwdqaplsoft6hnff04r',
                interfaceName: '63rozq6xawus6i53dpsfjcbqwiqp1v8owr3vi24fet4bljcu8hzjg4far3vce2h3x8l1wncnkakznewd75532i7vlinbrn2c2po99ackunlfcq6jxlbadty2fzraz4f56l8xm7unvdpovla8awmxh46g3hyeka2q',
                interfaceNamespace: 'grs1g5s8q4aewhbm5cembt2e9h4pn81p8ki01dlktla5uyp1h5ejcw5bj1ed8j1xpct6wg8q3z9o5rq0u9aqmwx6uxljy44w7kklqtsdi708oy60jrgccaqm9liqettik2bjszb9g7m5wb06aom15jwopidetkmm',
                iflowName: 'enbthmz6abi0nudojzb7jbqtcvf5nonewphnzpdrsh7t9xlqf6mpodbxo8gaa8wt04h42vazg5vvu07i3xjgiita7hatvmyxose26lh710dv6kqd6m3y02ktw4e8fbchn0ctmin3outshqefnckm63p1k45gxjb5',
                responsibleUserAccount: 'hk4818yjkcpbfu92fkgm',
                lastChangeUserAccount: 'uw4am78d072xzbzq4mws',
                lastChangedAt: '2020-11-05 23:02:15',
                folderPath: 'phtwmx2ob8qzr55tyzqajmy3rbriwi3ibixgc5uh68xg60toeesr0rqld6h6hf5l8odhs6870w5cyw6ztbv7136tbus5tgfsoy3tntjvdrmetic62r5woz0go81dskluvtsnfdxyg3pdodkhi7neoxeopyzp1gfd8aq3xiwjhpl7bg0ycfpmzszf9fw3z79z9hwsnp5an50ls0eo61vgnoh6yq4c8mscokfb7uyruwg7xfh67q5dne0355ga4n6',
                description: 'x96as8y3hhs1u8stx45i7zigqgwj6wbvefi938cmhvdycp1p980zt048wrvd8oe60jpbw3rs3of8zi9xlwcmji2myaempqqmuzdg03vouhp3hfs5jff7yc89qrka630fdlq06zl5vnnadftn7jfegcuocqibl93i02qy147tanxfmwkvr34mpz21pjxhr2w0jp5f2l1l56xvzak3g605yyj5hrn20drflh7xv1gnqaffyw7om2m7na91f699r6l',
                application: 'rdb7m5431wyxdpq47loydglx9u0mejjnncgn08qqdn6v3ap8zewzn7mmpxth',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '24ab9cfa-437b-467c-a20e-4d8316d6b28e',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b603240-1c33-4c1a-92f9-05a28a63bd88',
                hash: '9lyv59nei12a0ee52nv7k7iqdcixx8fvh0hm4xet',
                tenantId: '44967159-4111-47e1-a4b8-f976d847d9ad',
                tenantCode: 'rhqxa9hwmswecsfv71cmz39r9w0y4xlyjixfwt8085w6frgxfw',
                systemId: 'c13ea897-7e81-4be9-b342-6286a6cde1a8',
                systemName: 'g5oj1ravhoi1xlkfupey',
                version: 'y8sky34r2ftl6grv9pyw',
                scenario: 'dv2695rm7wix65mgwki0tsn6rl0er5pxorgo5mg5ssh64ni2ihbhnrighp77',
                party: '0upy8agv1tixni1bkxsmil9hgifvms6isd2refx37q2xva1io5npocxnv3tdlzh7aej6o3obh67j4soq2mykadh0vkp6gf443y8gbzl2xg6p02bife8ylkuwli9qpv1ua3gg1l94f4xxwsbkdlyfrqm7m1h454qy',
                receiverParty: 'aatd0du08j0rhd1bvojq2qlwoy85858unh5ua2are63k8c28bt8k89x4aum83nhfiwgejxjuw8e14uise7f52ujosq4pa8yhr5m165g6gpmdtvqomnmovdp5p66a1emisxqzdp8st9jyysn6o0h2yy706qlztfva',
                component: 'psi78xf8f64ceaifhty59u5j2d5k4wmn8gockejd3pyo5soijxemyod5gzqazzs4ynrn5fqaacer6twqu7rdsxemgn68f5l9kdp6fhwk6e6otca8bvk19sbege2x6fhobfb2f7bmex1o9hvjj3du2shg9g4rytk3',
                receiverComponent: 'yszias7k5xnrt5uhehzwruvi60zc8dbvx0wnluwok7t6zlonexlr673n65d777k7ka2m7kn4x0jlhlttm81ksb61jrcc0hrpj12a1llnv6km5cd9xu9kpu34ugoifveprz8u6gf05vlz4mdpok7ds7d12gbo2lsm',
                interfaceName: null,
                interfaceNamespace: '1uy4qt100y03rzk45qjfqt09vxr8dwp8dnto87e1th6gs5chfgrwgi6n1ov9qpkaggliwybtdxpqeltnu7iineavdz254vrs6jzx4c9q9olf9kut88xicdbrtntcf99upe7pp9m4hwvcv8t7t0ha3b9rbehjun0x',
                iflowName: 'pe2jhcv39h68oez8xv4d2g78znz4b067donsgytpje7awsrud87a17c4jyrkdnfhpn2loz9wo4uof30sp7mees0uzt0gtvvjq2j35zgus2fmmnk113ewl7x2z8jkk74c30tsp5kbm9znguciohn6co27frcaccje',
                responsibleUserAccount: 'qeubjsd94lmxdptotlqv',
                lastChangeUserAccount: 'acuwgtq20b1ter4h8s5o',
                lastChangedAt: '2020-11-05 16:52:46',
                folderPath: '4k1o9k2418o6ip6aczcmgq1xog1yhtb3zv08j8gg7h2em2hr4jvosgaln3iltyrlsxze7qyx0w7uowssx8lqeh68bmzsg213i0c3u2yrr5h2jbaskg0y3lsfhsjl68gx3vjbucn0wt07y6mye6q3var0w6qfx9bsec6ragnh7drxlh5hexiuzan9jexoandzopbfyxwo8lb8a8u7q9ykc6zqip6z05da3lv9t1qqc83c5tgu2y8ync4odomg7vl',
                description: 'eec09nv2wj3d6ld5pphvglzr3hi1co2f0aqp1v5xsuembsw3htcnpz12cyval6i0helt7iq6luhzfs512c2kbod2fzr5q5nimgvwoe2g3otxu62avgy35vhw53zcflhfpgog4d68tzqd88z4vmz3o73hn6uctiw8q98mjqgrfc5pkqdgmfltsjbzvsqxb084zwmtaehqfyn2mksc4heo872qfekpt1jba75i6g1bmmt0gy73m0fugt81qzlgjey',
                application: 'p3xzjol6btcrb50ku8avgtyhz9ys4abege0vrs4gs9vmd4uj5v7i7cj2tvkt',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '24ab9cfa-437b-467c-a20e-4d8316d6b28e',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b603240-1c33-4c1a-92f9-05a28a63bd88',
                hash: 'zxc5v0xodev1j5fm4xqjopljlr4rcrg0opfg99ko',
                tenantId: '44967159-4111-47e1-a4b8-f976d847d9ad',
                tenantCode: 'bj42ry6hz89gcnf4k9i2iwwpnlk97fcmvqxerms29dj84kl8qj',
                systemId: 'c13ea897-7e81-4be9-b342-6286a6cde1a8',
                systemName: 'h6y117uj1qs2kqo0j53w',
                version: 'zvtawwe4u9boq6kxv9ok',
                scenario: 'ymdpn1wq88kr1rnw2phv1iytzk6lxizi86l3r2mufsibpd82tiodby3mc7tz',
                party: 'ro1zk9joa0y01ja23rd1hap1rb2gfc4owcdh0jq3rc6icbhp19l8cbl4djer6l7ya05o18t4xhp6xogspzymlvp6wcfh9mwi0lo0y82plp9nxvy2wjufnaaz9ed3id4jt2f7r3e2fore5yl8u2lpxysel3gs4l40',
                receiverParty: 'f5bohek93ya9demkb9v8zwadg01j6u0s9ywf2xf7ibmj6rx4rv13gmcv6cjzkvg7y36kjrejaw7jlqsijk1oa44g7x351twi7bfmq72l14sbtetvkyievld183yo6i8zpcwurtriawie16ux63le5x73xycolipl',
                component: '50fht2eux80jiylawgbqqzfel0vlt9utfikwrqpli9n4jqmbq71m4g3rpj4z5xubfh6jzh9ia68f88vtzhi8bd7xv4s2plk0bfnjbzhi6aq4dn1a0l57wbpcw14fky0h92gjty4mcvobmxavxd5v8k65vmrrvy14',
                receiverComponent: '72sdi63hhih6gwa840yyxxuwyn4w1v6uqro6gjjjkito9ypt6251xwxml7iubf8r5u6tarbklyx3fjdxlas6s91sdguf646emh97hv7o2kcoon0kyhup9o7gbilrjad9b80e0sd58pesdz41uu03mhbfwz6a9xpd',
                
                interfaceNamespace: '3rdy5ghkze3kyym767b5u2u5znx38mn8omjsfv83xgzr331yzvm93bqs5r1ti5e2dd2ypw69px0n7ygxiovkmq1nbyc1xgmeyhf9k4rwt8fzq3blqwgurkide7qashvlp6dsnbxk0vj7paa8arvugeep5x5r21er',
                iflowName: 'upqukbd6kmmjn8h7ayet0xgv44s69le345b26tfz7dqit8g1jlh8a0ctjip1l8mc5rqs5ynazh6fml0ukb8b7vuh9mul7wamt8zytteba6d79kzips09debecy3ia89lk5m6yonkctognc1817fhoz6qtujlvny3',
                responsibleUserAccount: 'otflaakztfi2jsvjewpt',
                lastChangeUserAccount: 'fx10h5tl6xo0nciy5bue',
                lastChangedAt: '2020-11-05 19:24:38',
                folderPath: 'fked4odwmtixgvnvdgwft8869gqcf6316wvihb8c3bsc9d6uw2fj7q5h303of0aj31mnipow09aykqbp82b3i77aw60dfjnads3giidncf24uffurvw1g41bm7taw3v7m4gt61u6adsh8nj2442o4g0mxomtdr3qu36j46mivgk3pa02pks950vl09e3h2mqc92k1ko05mo8pp18lwry6lzrbx0drc41udzd5n80wib4n9287r2kwtmt5gyjbta',
                description: '9k3kgsl7eyqt5c4t7umc6n0vnnnja5flerkgumjx87n7gccz50a1lgz1dloz9nekmm9gm7innmrtz5dxotxns9kof03wh0exeen211otdbmkuvlsful171skz97u1w0vycntr2gxrjocigqtogmqksejdmol4q5nhwnd062xph7asmbj9fafnpnmisrc0qv490t1jt00xg15geogdg88a3pzg4cw7ukd9etkrwcqzfxbzmohh8j47vjeg7bd7yc',
                application: 'b97wt6q202m85daxd6d0quw2apf6v667u472xaufp7e2f35szcpq2u5hqbxa',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '24ab9cfa-437b-467c-a20e-4d8316d6b28e',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b603240-1c33-4c1a-92f9-05a28a63bd88',
                hash: 'vv4lnxd0u933hcmxelasc50h1hrpiljyj6xh4jyv',
                tenantId: '44967159-4111-47e1-a4b8-f976d847d9ad',
                tenantCode: 'ozazs65txr28q6622x4u853rl2ikpvok9av7edkmnbbrs9vzld',
                systemId: 'c13ea897-7e81-4be9-b342-6286a6cde1a8',
                systemName: 'm23n7zzd8pimsaa4xur9',
                version: 'v11rvum5wv2r24ehjnz8',
                scenario: '85esv4qidv5f3kl07mnv8u0fqbywic7dr0v23m8j2p5oql4arb40sgsswgmi',
                party: 'ah5ebw5625g7lzgdi91cu0vv1wxsc3irhoml5f5ejtrkwd6epttdg3vf5ebpf7cxxtgt8knl8wkz85bdfcd6za1m1vcy6dot81fmvpkcr0w3en5x89sj355pij1753lv5qhmxj4jfq4kb6senka8rfhd04ys8yil',
                receiverParty: 'ax83exdcksr72l18gr1yhri1215q695nqljegp4opfvpc3wki55xin89u3o0sqvr7hbxrszwjd4xad1byc6mcgymnu4ofpa7zhwdevrbktre5p9r177f5gouodb2gtt4yz4j2n76x294on00yniqyntp8b4vsxj4',
                component: 'h2gdvznegrww37erty7oi54f415uh8qe6rxnp79d2wydgpperqt1v8mgoeu712y8av3d4iexahw96q18jwy9yiiydaqitrxzpe83v6nyuy82fbzxg9w0h9mlsv9forytr2e58c6pi9gl79mryblqitbq4jd1oit9',
                receiverComponent: 'o53xwuehm3apwhzb47qluzbiroix5f4g6clvbiko03scpqadnqw3aipleaqbgso9suydtd3iawd2x1g91g1yhzx7mijj5luj9rhsm41rgeztgdvy9rpvo6zon8qjn40wpkmgsrhi102p0x1aw64evmcs326wwvoc',
                interfaceName: '3hbkg3xrtrmfdnhle9hyoedzm0fxolxy14s0ve5spoorbvw8daxxpkg5jwh0n71y2ntgdw2sqsy32bx4sz6mduol3oyapxyje0cv1krqs69752x3fmkcxa1rq2ax0q9w5t66oji4cjw9s68o7pmzuq9wgd6h326g',
                interfaceNamespace: null,
                iflowName: 'f1ouhwc48kv3nv4fkl5pkoxwqzbmvura8tmak261db0eu33ueuim60rzv46im52gz6bv9j62rr02tmlumaf5uqptrr859yvfg458l8fa8zxmonppzx2ytu1zaacvage3g5g3egq09fweevuo39a7md7xpzzru79e',
                responsibleUserAccount: 'v32kmn3iz7z2o0t7b5xm',
                lastChangeUserAccount: 'kjtd0uuxki1kvv1tm9ft',
                lastChangedAt: '2020-11-05 21:01:08',
                folderPath: '2ch8zcbrpb191z4nkt2hyflpqqn3ixs6elw96ccbr3vobbf8lrooeunwuayktt1pqqlpcvrb9uf6273tj042lw7y8vsvrwq4brlo13ewnazmfvoz0turxv5g78ibn0jbuo4xpzqpdxn441thedm8774j7m5nmyodfwnvu3f0wyiaavms9nnsag0xtqhh3j09zyhdm34dow9n3o3p14u6o5s1f9y3mdbx6luscbbihi3cik87zolnr70holbtyjg',
                description: '9krzvwdyszr3hs5z49vuxi17djrbfts8poyxhuxrqyc5evnjpm3oplg2m937xkjjdsu8zm44977xkxengdhj2lzxtr9cax2ext2aicu0lrn6kzzhnozot2ugmukz3ip4gplqsmh4pledhy334zgv0a4k93k1assi1bdf7cnv4ypg91dr35xlu9qh0blf82kqlnwhk67noxego1munqtkpagzbbxny3xotbxr4mvlofahllhzdi01jxvk3ko4pa2',
                application: '9599o6kibwrx5zhcch8dp3ezcgmvco6zujonznqbli3abgutqvjzyliilu6g',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '24ab9cfa-437b-467c-a20e-4d8316d6b28e',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/flow - Got 400 Conflict, FlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b603240-1c33-4c1a-92f9-05a28a63bd88',
                hash: '4zspif6fswbe1fvsw02p7w0qr9azr0qj4zqjeysp',
                tenantId: '44967159-4111-47e1-a4b8-f976d847d9ad',
                tenantCode: 'x25pjvyzz98kwmzx0coyri7airp58510c8c058s9xbgbo560al',
                systemId: 'c13ea897-7e81-4be9-b342-6286a6cde1a8',
                systemName: 'nzlg62xn2933u5xy6lke',
                version: 'xallui130sgh4h0kt4j7',
                scenario: '1qro5bvj6va3akto4biwo97rcfw0itidn9x72cbs3hrwxzqtoakaep03rd2c',
                party: 've64fzn4fa0bufeqm3x2yyhf8gy9vtz70io6s1w3ez6j7fj48zvnfbariji2m9qlyn27gjegvov6f1w62py9ouf42lsxhwe857fcfrqwf7odlylov5aram28cdjn8xymu6h3mlehechf5gvlu07c9cpl4b6n7dlq',
                receiverParty: 'jw2cxbsj5d2e40uoofgipwjr630m3jnnhay4l4jhkr2arbhp1lw73exp1x3wb09d347e6yuoehzydj0kp1snz9uoi9yumgcm3p4rdvqoz86asp2bslksjktagddlgvdp46kbfah6asau4epnuu7iunxyiobint4s',
                component: 'tqdfgp0fkx8qsnkval39f6400qp8r294f46u8lmrwpj8ch0vaeexxmhekc9lcu7u52gzbajqz4170bcm1lpoey3cump9tty1qevcyzfowpk5cip4am9jb1liu0ysuvt135gt8pombj6v1brckh9pcka6i8f2ajih',
                receiverComponent: 'z107xxxf2y13yh8qqvs7b9y7xiajetal3zrob9318h1gho95aoqrpwoexn03ms17t7gfua4gley1n6h2pjw3n6fkbntjqdjlm6epkiyvqpvy082xp9secy44mb2b6a3d0i1s9kqcmqscbsdie0bcecgt2b4k3n2v',
                interfaceName: 'f70osju4szq5zj06fgufcrebl3iv7fpgnyho70jtamtp3nb96679jwwvjt7ux5i1ow3nrv035tp1qjirj64zsvpfpeuqvrs9bkmm4muzxj5z8o51u6c8v58930qx6i5btfecx4uxw04yitqlag73m7ddecjuopxh',
                
                iflowName: 'z8mbdrrvnqspje6hi3fpedyiwew38je3itc6hxck7qgymb7tn3wb3gh9728inn3vdtez5i9f8eamylar93crpi7mlx2po734dod057g0x1732dwdojqol5sl0btv2rjitj7xtk5xycuqbtgoqou1a1a3uk6b5tj9',
                responsibleUserAccount: '0ec39dusoiz928uiibhz',
                lastChangeUserAccount: '4sqrx0jqqsh79gh5n7yf',
                lastChangedAt: '2020-11-06 09:21:33',
                folderPath: 'fm7a0hvwh6jfgc8cw2ug21p42unr96cs0k0bdsp3s61c6atec5vxpg38j8tmexv1q85lflxcx5a1ext5fdrzy3qoeninrnerlxz5tx906oge9oso3isbergyj9fwggisn513fgeapqu8s89vt5n98ca1cr2j8y1bfs3n5qx3s5nf7vjlr6uod0g9h9t3zlgreq7gq1v8w0h460snfk9jubnpgd6ffghp9dthq8pfniatsfgqds3fk9bdu6wpplq',
                description: 'dnlt25ihoewmb9jakuihw2lioc49rysqg58uxfegri4fg8u382tlxedx597cm5wxfowjf1xdzgody27yn8c4t3wy2qi6kacau6ttxyapzom7fm3t31eqm0cbi1juqmem0bf3j5h5sw1tj4lco7sphr83oikuzzybdfu3l0oflc99e91tzerwewvbog1gdlgkt8ucyfwi87o8e1qv1yk9hjhmi6260dg11k9vpa12ygpjfviueouq6mk8dm1uou5',
                application: 'xavrdp2ipnmyhtfpeuefagct7xhiawcoi2hn7rd0i3dl7wc69dm1gpjctx2l',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '24ab9cfa-437b-467c-a20e-4d8316d6b28e',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'dtbx7u8qsuh2nu4ku2qdw9hwaedgtdxesshxi',
                hash: 'jkmw7lffts8g545375plbt74znr105id3flqoxdn',
                tenantId: '44967159-4111-47e1-a4b8-f976d847d9ad',
                tenantCode: 't8msbzb8y39ufsj9ylct51r6doye3me5z1kha9gr784vgyzeg6',
                systemId: 'c13ea897-7e81-4be9-b342-6286a6cde1a8',
                systemName: 'rey6ehnh3ixemuhgn47k',
                version: '4sqh9bwry497kp42wfxh',
                scenario: '7turztdq8rwx2ftfuizrfxgsjqsighz1wee81mkudj8mqdohc8137wd3jf5u',
                party: 'xuj5zhzkxqzm1ose2qhs7ol8iilne3killdcpxxvaraikjq91q3nz6m48fxqqefb2n4ch1ahaggal1p4xyqht7t4b7is5grvefvy5yt04ux1p54u9an4h8vfef8n6d8kzkh0ltnh63sp9wn38q66me1lf53x4796',
                receiverParty: '7hclh726yvu6wqi1a2rquehrox49jibsudyvq7y9u5aetzyxt7ei5kkretz7ki7sjp3eqa8ljxrtqcakimblouddzy45gqgv7eqrqkefrjiy7g5thm15491pqnrjugly2esgzy99mvlyps2ghhlaok9epmdsz4gl',
                component: 'nho3e6znyksyyatte7nint18wluazp2t15x2c8anlpxo4is8t0abo5i5bxmrt8cp3gq06bsg2j2wnj2of1zf374ow3dcvyx1lom7nggw9uvvl1go624893nkdqhwaokz310pb4s2q8074weacmkpk20y35wxy9pa',
                receiverComponent: 'lxastawlep1jg48j11lqrd525ldp3p233cmhot7jbzyaiyjqh2025g5bru6ws1zsnbfc5urlz4uhd7tnd4mhyv54f3j1njvcejm3gcrh4asvja7joiwhqpd3uj35zh710yw0tcah4bj1ixfb6m9myo7n07c9oxao',
                interfaceName: '5o7lviua5ahzfcm036siq4vi3ll36ut9fkni4s49c6z40fbbz6yg0cgeifnswutkndc8hr8g45a72i862bsq04cq25gxlazywwyyxxtxjrmgwpmw94bqgvva6h9qrlsx0t88k47z13fj63lmiosywiibkei015xa',
                interfaceNamespace: 'kwdqyfcxcjigyep6744fm0n24zsnljhfzj93xj738lei3xyyuy3d1iq163bcba8wxtt7nxvxuhurn7g8vk0t61if56z6ghe36p1wi56pvrbj3yf7f59l78tnut4638ncvkniohai2xyeww3vv7q135qvw4n85m8y',
                iflowName: '8jtv4ficg4uaxxebqlvab3le6an2edm21ickuisuq45uz93nvqtz1e7z9kilfzba139tfjwbprdbpgqjp0bdkli8igeoi2k8hvdr6lbo9rohzwvrwosvgdj17sfkdxzlxh9vop79k8tcgum6vpsupbqiu4ugecof',
                responsibleUserAccount: 's2bsrd73otoi2q7xdhf5',
                lastChangeUserAccount: 'enqcy5cbms1sa8fr0tsu',
                lastChangedAt: '2020-11-06 11:31:37',
                folderPath: 'p3th7u0foewh8tlrudx7nvmu5ggcbswgl8hkknif3ncks3hbdavqmp9unu4tfy8ukvwwb9i7g9677krbinmwuxbj8pmdchgl7baynduzfavvwk6zdgd1zhabofteu1q7elhs5iwb8k1sycjnmt9bllqcvs5l7go1y4dqjyk23hr9mw9u5a4ickp5udhiso5of38xgzqiymlq20yhykl20ezb877iof6lolljkoe20jrrowoydcgkjy2mpxuozbd',
                description: 'fzfep0h0tf36aeheeeplazdu628i2eyxdtjgj1blvcd39ad9tf0ivum38nozw3x9c80hs9kpgyiuerzbnzrbn0njh6isjfr5pkywls2h6t5la8smaoi91biwvrin66hbnkdmc4at4q4809wpwplo895xs10aho4y4zh5z7t4jgjsh8k31nqx49bc69q5dslzqmszv003dol1iua5asp1y6pqhqnz1a6m3zlus3bxlgnq8uao2nxgimeea5h7v2v',
                application: 'xqafabcsp2g5p20sjawv23x9k3evsd6qkwwvg2umps2zvf0cbld46f5np0tf',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '24ab9cfa-437b-467c-a20e-4d8316d6b28e',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b603240-1c33-4c1a-92f9-05a28a63bd88',
                hash: 'cbvxlbi20efp2pan0akd19n2htvc5x1igef97bsm6',
                tenantId: '44967159-4111-47e1-a4b8-f976d847d9ad',
                tenantCode: 'ld7klr5x1s3b9d8kglk4phy39igxngs092lhdntj64crsb01ok',
                systemId: 'c13ea897-7e81-4be9-b342-6286a6cde1a8',
                systemName: 'jzh0fqw9b5xi74pwbxyf',
                version: '3drl9kp9on1cl50xdjs5',
                scenario: '2daalmdnrcdbi2wt9dlwlzgz5kfmigtiel6xtwtgj3jt46oygktca3apfqbt',
                party: 'ahlu46bdg2r9dzcakzlhegvkz6cikplqvp08e0oba5r4a6gz9icn681bvcx5nlowi82pxb9lz6sglk4vg3o9j9zyhu6a8flbbxsylvfi8rpfbq4oxagz5euixzsio8v1bvnag7s50zm9ugfla8hgze92igpi16t4',
                receiverParty: 'athdfqidrknoguelku0qku0c93l6xhw3iuwqwq4orcjra26i82hsml0gmfi2rjihfxo8jakzetrfv46zp9d6ue2m82tr719al01do7f00r6gnypm035szp9v7h40x24bt86kjqs4fmvnzfrwfh3ayzh0jzvn0h2x',
                component: 'xgihhg5ufsydrhp1nyrvck4xygfhg823aojjjykf1cbery7x08qibzucjchnm2wjjjo15dfefywf0gr4mimbeuucv1pj3pg47bt2q86ph7rsrjsg1sl1yef8j0dfxijtgb1hyyb8xoqdpgj1ieusrgc9uezjyn4v',
                receiverComponent: 'gzd5ggqbj2pfulku1pnv5qy0c4wxdvdez3eushkkqg9pn8p584mg9siqm91qkqwobikg705ehir9jzv89qp4zy2cosjtgjvec4lriqddke2e7lodqa68an6p4ivr13aq40nvwqgixb1jonslb42vx7vrfj4cbclu',
                interfaceName: 'aq7ackoekaghtbfbjer9a4i2jk6sdwfeignmugwy0p936pwrlmtkhq7syccnlxaffm7bpqcc178b0sj9g0le6qgi9n5nsiywl771d0ptue22724g3thfer1w4gdh5uvbbzm654ndgr6memm7icvaafqq7yr9u0a5',
                interfaceNamespace: 'zlnev2hbuu1es0ywe4032jxt7rq88kc5lqxo3h5j1cbj99u2dwww1izzicwma2bt3k5vv0e6vywuikkepnf95scpdicr2cribj9jfpr052tls6l7adhfrueayxiian2e4aq5k7t5odfd1b77m6ttlg4oe5gjismv',
                iflowName: 'qn598vx2as96czwv6s6vibxt9ty7d3g9ba3oki6ykxq35fe6aqkq3oxrdvqw632d89ir14j2awojac5pw8r2vt2m14mlwj71t0idqv8zjz1ya3ucdn9hqf1fdwyi43pth3ub54wzeaecimkcwmazulvyia6d1t2t',
                responsibleUserAccount: 'hzmh2spt5l6g2f6vx50b',
                lastChangeUserAccount: 'yy60ixc0utwqascb5jqs',
                lastChangedAt: '2020-11-06 03:06:41',
                folderPath: 'e1352cf3opop21lfts6zpzsnwmdkpbm67akfqbjyfgmlewr1kxydzua44qu9ahyx53p8ksc4346z5vml55ssb64rhr2vrpszh3vyohnozpp9vb43zyg74uh0ov9ju3dxwx5loaic74jjbipzrv3xfh5bpszfw39flc2b1yjtn4aamy2u5o7dfx7bcm7fmzxdjirbhsqunr5oafniu6qby5aagzsr1o49lp68oslz3lkyrue64kh9r49ewwxdqol',
                description: '8x2ht06rykcuqsy7gphk3z17n820fai0tnyyz3gb6rnkn54nde103iepa23ljcou4uxhqa34181bcj0zov6fqi8wyavo2rh6ggolqjnqht5nmec6w4wszptd6e8cslmfq09bonl5q4az01sf34uez3cjz2curdaha8d8gwg1tp14viu4an3whfow7v8h2b2xc096x0isb852xqsfi65r4kiikek4omgxqqst8kx0ot2ow3frt0a571ohxlyqk0z',
                application: 'y5dq4indvicl1mm6tlgcfx0bsppn05isarhq2kgz0nk6oaggd605kkpoy18t',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '24ab9cfa-437b-467c-a20e-4d8316d6b28e',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowHash is not allowed, must be a length of 40');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b603240-1c33-4c1a-92f9-05a28a63bd88',
                hash: 'n92x175040f63da30xyuifkhyzaxm6iz7rdq6m5v',
                tenantId: '2wnt0c597cbu91vj5b8us7g0go0p1twyqadil',
                tenantCode: 'o0vm8w0c8osp60499cs44lwepvo7xluvj2l9r81w9l8130sw4e',
                systemId: 'c13ea897-7e81-4be9-b342-6286a6cde1a8',
                systemName: 'ebm44131kyhhm5e24hch',
                version: '5f2g27jfcc6klnvwdmn0',
                scenario: 'sy55t9re2v67l69nai3rc9jgrrl7x2qh28lzm4a32vy7bakwwt7o2v7zs5en',
                party: 'uc31hk8hef3rqb4ayi1sycmy0jxg71ukb3tk2wxzwf3fqje9md4zjfnsknxruwwk34yl7rkl6hk96zf4v3rmqjaevtjcu1cvklizqpxfbltz1gkub4lko75v4xj9vhljziaxilmk74sdd9bg6nhfzfr8nwy4xd29',
                receiverParty: 'jrvuzexmwuq1j0als3t1tajsuf7hv3aizjz0tvwnh90ks0tlpeibsidcx6tr87iaobsxda9gr67e8tdxsi7ak5ly23dhcx34kiue5sxh0egrda10xrkp0sfajluowcaezz7d79y2ytu5jx0yr0dbc78u4rja97lk',
                component: 'm35zsy2ywn6rovkzcsdxf746h4fsdsgnb9ok5vagg3nrxpg80fccabeb4asob2st9fs8r8pk9v35mvgrexmvn01ggm9ndb4smn0xn7fce7cgy9qttho04exp9923wiyu0mefofun6ogmyvg09piuargbvdtujeba',
                receiverComponent: 'orl1hw41iio3eif3g18ecqv3233zl1kfmg1o5gc5mnsoty8eob6w42pkydnfbzdqc0t7jd64tbhxd6c1oc6g9iph3kgsarzegxungef2lzs6tj03n756dsu44jizlt7nlw9tsvontmvujbaiyrws8ff4h1mhd3ma',
                interfaceName: 'cc1tzjmoid7fhw1nwt5k2fhmwbi41kb75kssxw3l8pbn8g1i7ixjvu85zpodw3mreaen8w3qqvhhcwu4uue5am7ffbw1tffprevi9ckdlz3nwvmyqblay9bk8ea20yulspy0gx6x90ez864hml9ml0ykbsu1qu38',
                interfaceNamespace: 'gkx48nwpv2blk90ximnlxot3uolv6zs6okner04u37xj6a63yuzbnm5xk9bvd5g3wehynyn9proxzuzvopdvpvdvc2j5i7gl91twax1sy1v36xdpn4nr67ms245w8z5f7stcjfjh0kkia5qgt19vo33c2h40l9t6',
                iflowName: 'nzztkubtifejtj5cclq0u2d0kwjdq55swg4xymy3uuzzza9g7yaphlm1m32k8x1w3tnjrrzij4uuc4d8rmbclcem7sevs05w0gia24bxb19pp5uewbwt2ayholvfsjc5ex32hfql8d4bgtioqt4xhr1sdbt4oz76',
                responsibleUserAccount: 'fe4g86jbgomsbj6p7a17',
                lastChangeUserAccount: 'vimmgn3g5d22fr9i7mhy',
                lastChangedAt: '2020-11-05 20:09:05',
                folderPath: '3wdjixrp3t43s0vprh3kjieqdr4xtdlmsngaw4oqds9o02jduw7t859zwqekb1taivc39cs6fxt1i7lx9syvzhppn1zomgj9c3eywczug5blzvcpyd1bzeb4ll7yqwookdx8lzn11pijh43l8pl6jtd20c0cweicib8n0mot82zu2mfeoahodf52pppt38w7ofljx4n1rf483ql8twgb3kz5lv8t4ro8azp6y93vkc2jyr5kcv1kljils0q8vse',
                description: 'a7af7hry8sm8rg483tufoqfti019eeu3ggoacvgxmaxwo7con9hcv0o43tkr7389w4dsbssnrwvaqkm2ujnxa86ooa5krp43a2aw3dwi0xkpuq2p21793vryowzuhappb0wh3msgpqhkbxniyhy7cq4z6xko79u0hz11psezidaaup3amjzofjbe7z95wh27kgk3rlmrf26c691kzrztnhe4phu1yrcboyc6rmgsl5wndjib7kdea9lln2vs8e9',
                application: 'iqfewiy92mm312mhmmvbhk6jayg45li3lm6x1cq3xt6lzkd3twelxiaik1qp',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '24ab9cfa-437b-467c-a20e-4d8316d6b28e',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b603240-1c33-4c1a-92f9-05a28a63bd88',
                hash: 'njrnzy2w3byzsby1yn2tqbxv9dxbiocnb7slkck8',
                tenantId: '44967159-4111-47e1-a4b8-f976d847d9ad',
                tenantCode: '7ebv18n3c6eyfruxzgunjpixk98ww2gz3xz41r1ywpl7wdcxma',
                systemId: '74x3lx0ykj0gafmiwi0crbh12593wfhuxls1r',
                systemName: 'fwgb7df0w4hq28s9f4pd',
                version: 'ykwgwbbyhiacd69mtzk7',
                scenario: '69wz9ec8egrng7ncr1mpgqge5xk3rsohczr754ald56onaunnzk7wzfqog7t',
                party: '6uo2is79xntuxz32lq6q8ye1ldbmy8tnlnj5ac4g55wgxqnvf45ha8wpo888vyzd4zesrl4esv9wg9gxjtncc00x638e8mck8iu2apvf6mkhbx2h3kdc8mey875q26smxhzdf3c61eneadwl5oad9vccha9j8fio',
                receiverParty: 'njdj3cfi1ues6vhg2d8nyon681yiakqz58944olhj82h5f8sf2jm123c4ywqeqqghw0by1z7bxsb0qhyjh7o0mp3j0tjlqukgb6eq74u5lyn8b4s72zxsonay2uzz84zozy1kmr291w7vdh9mauwjc3qwrw8mn98',
                component: 'eez0zwq86djac1mxhvc6ijrh3y8dvzemcxxcqctsdo8kzlwefnl9o3e06oooiuewio2d6mh7asb75or83pgxrva94epe3jxn2hdl6xismm1lsnqrfhn5xh554pg99cc1cmtukxn696o2zyu2t8nl6qyfg2uvz44c',
                receiverComponent: '5kfm8ag6g7hg58c5tiuqqk7jca3l8t5669w1a5h2llhh6ugfmcxvf44p0hoxlgyp7v9bfuu7cizr7uuke6xtc9htgihtms1wo5m4arey7pxpiqgzb82qqvpbt0hcv3gvdhfrzff57lljray1v58crxy9ctnbscmf',
                interfaceName: 'bsqo6sop43dc4b4foholgt6h4sp3ryaxf4959o9rujb0ehfxth5mhsj1e8dh0mxutc1gi8a8yshyduxt6wqtfyafousx6fkvyqgrgqu35u9wsr73d87gpzsk9mcsu96cg3vg5osue6siww58cluz2toco8k0rjyf',
                interfaceNamespace: 'othk1rez9qti9sm4kjhefrqsres9ws2yj0hm5j75phcgmz17wwmjvsugdim6k7pm7tq2yxllw8uynlvpsj72vurv99crd4we5lyrxa2bdbz7u2dqtoz1t1nnc67b9zxn1l8pnjmyk2nbyvtjfqfscgv2j2zhxbh9',
                iflowName: 'cd1hrtyqhnugw489dm9uuv0bun8vsay5cvpchp155dw5x04xcg3d06ctwelw24c9dfhmmrjf8wd77lm5r2woo20fsgeszem7msonn8hpmljee2qqv4ae2njgoptdu6s04hvw9frn1tgns26yy84zriu2qel50f3m',
                responsibleUserAccount: '8fd3y2ocpj6rgkymlrst',
                lastChangeUserAccount: 'hwbsoui8yjiw89p4clr2',
                lastChangedAt: '2020-11-05 22:46:38',
                folderPath: '1a8zbbr81qz0yt6gh46akay3xfcy82k6gcjiabdxrysgmirjkd8f3djij2pu87xlwxvxc62cgf1awfcg2329fxjzainnrtan36yyfptab93kpza46uqcpyfn1uxjluwbvvw0grooegiwpojyov98fd8zplirva08u24bczchpb2cfgjzss5zeggh7c3ivai72pdir4p728bl9pb6sun2rzz6wjiq1ytu3l2m2r39446gecocg9scfe8w89jdrzz',
                description: 'xkrbws0z05urvt1e0m55dp7la63wxdytpvf65ne0wh85bojv3qa7v2spiy58k6h9yzjnecgc5z98b9penvt5s4akmvr57t6bb52fm6g7g21ojhnstuaz834nmo55hkm3y4m54kle8gq2q9ecpho0xjro96kyb3fj23xxs8a60zzaqj2mdhny3zhptjht0ejfw9vvns3bv3alavb2mtf8fm2k12bhc6zm3hdbphbccoc95bfxuj8rpaaafb6cuor',
                application: '6bidhhpqhm5l5zueh7a515bgr1sdsgcqhrwn5xb0m3gaex6xod5ckicxkmxb',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '24ab9cfa-437b-467c-a20e-4d8316d6b28e',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowFieldGroupId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b603240-1c33-4c1a-92f9-05a28a63bd88',
                hash: 'xej04am2j2a0cbjoy2rzzckvbanbjlsmk0ygyaq7',
                tenantId: '44967159-4111-47e1-a4b8-f976d847d9ad',
                tenantCode: 'oe2vnsw0uo9k6svus7s57t5s8la6kv5t4xe22yljvoswz4bip6',
                systemId: 'c13ea897-7e81-4be9-b342-6286a6cde1a8',
                systemName: 'v7mv8shq7316s5tayhg0',
                version: '2qmelubtiy570glj2pf6',
                scenario: 'v52yn238oy405gena8flzt815rxf4z6l083ggehq28572ikompi27ctyn4j4',
                party: '9xho8dg9dbtzqysczl9x9oujju96tfawq57woiex37u0q6hww9d3yi307nnlym6neikr61v7d0y9dcoupyjoahy50r1j1t75r1zjwuwhlvwhg3npaq47mvaft5qihggrjra8mz7fsqoie9lz8qj73kl08yfrjtqz',
                receiverParty: 'rp0u4ecewfrj06oc5256hsndaa58y13y8zog7x3tuuprjcqjh7xvalaxnnh7hkbblgoh5yercgkzn72oi2gamomxgxccu6wevja4osysnq6tpj73nq935qiqlroyytchfz7tll42zougkpxbyvi2uitdt4qnzrwy',
                component: 'skmjjgr38mvdzppsu9ltfzb9hcu1i291fbl8jiy9kfozikrh5eqchzl86h34mknj4p5q8ylhun3o27w6x1x4wd3m3vfellgdk8ilf04hlku0l8q8ncscmjtkwb431jjg8ujxb9zingk1gceohfzf9placmrdug9y',
                receiverComponent: '6xt4pdfu350bx2gxi0ocgjk9w5zmbmkw2vr2pr8ddwkysotpaqfkpq4lmbsewyk9dy36cr8tkgetu3urla52i7hs85zw483vkkd987yqbw4qc06kmcfh7de2auu1d32gxm82p6k5wy3t61cbrcaeh0gs0armzeup',
                interfaceName: 't580qnpige5sicyucqkrprza8j4r5kw42474iojz9lhza0urij1p9544cmzu6rkzc1tyo8d7iuap8b0j70wpm13yw1ncgfgoiqw776m8hbguc5oqwr0lkodhndvnv2qs2ih0mmqxofqjj9jx88vi89ovl79x71k5',
                interfaceNamespace: 'wie5isd6xgeg7aoa1xmrlta9au239y5olar5tehgay203b7dilg2g9wowifdf2quvsdm02h24c6ho5wr9sp6uelgp8586n5d88m7gtspt1wrv33tge9ebxmloon3p0rse2m96m8s8j1xkxxc46860yzvpbu6asym',
                iflowName: 'dbdgmait46cjxc1gwkl5yy6obcnh6lya03klhyeo5ljvc0udogv7a1onx3gyjlx7nbaazy4zzxap51zavunf1hmn01s9qymjk3lq9pi6h0p94yyfq9of8atah4zjts6w2ifx39wovdubf6ch6mdvtfv8uhfuhtez',
                responsibleUserAccount: '285405as224xkdyjxmtl',
                lastChangeUserAccount: 'op66yormy02sy5xoeqnw',
                lastChangedAt: '2020-11-06 00:09:29',
                folderPath: '4jjy4j46uxcny41uod70bvq6b4zy6jic82lsdns2kwgbcq8u8rh35by1ygjqy31qs9sqzt1m7op9ep9es3nh79hyjtcrow8k7czfht9myfk7uah2uef4j49g5h98ce5i8xr6g7wqgvxvvfxzskc875wb2na4jbrm30bz5rbns1zsxm4i79qx5y2n2cokhtcg5iqndmoj63l9lrx0rd9a1jwyb6q9zzg3jjy3yc2lvyh33p0wd1a24vls08vv96y',
                description: 'blii9647s7l9jcm4fqqs94d2f85vo5e56yc005y62x3xygie8w99448fcbulnvzwuyb3ao1iw8itt7jktrpujtvdmlp43lrneg3d9yph2r6wphltu5k7gv053kfkvnmwrd8trqvvef1sstttuptr2l3vszz5ji8pmvpnk1809kvzxfvtqfp89wqa1kzcn14x310ydmlayeazlkf4n80a39xq9ikmbr66q8svw9lhsbh1p028kvtgk82o0pu7mbv',
                application: 'zwswcx9en2wg9tkz89ydvshsa42ilcckwcxf6t0yodouit7ktbs5afzjcbg4',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'otz4vytx4so5b87u5g9sil7ve5n7ugh8m2lt9',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowFieldGroupId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b603240-1c33-4c1a-92f9-05a28a63bd88',
                hash: 'zseh88c4dimr8nlbnom8vkzz9nutajx5trkt82ns',
                tenantId: '44967159-4111-47e1-a4b8-f976d847d9ad',
                tenantCode: 'rqgo9viqzyswqp4n8k2h67fhl3uyxbc0mp7floq8yi013pia208',
                systemId: 'c13ea897-7e81-4be9-b342-6286a6cde1a8',
                systemName: '49c141hyv12do1pa3sq5',
                version: 'srsugnaf0wibng7c0tnt',
                scenario: '9dmb1m9msnqvlax4bkh542nqnb4eqh7xb96064esed8608dtogbg11y00liy',
                party: 'l5bua6eqivza5iq7jbr22qyxsx5q6b53wa0v8bl1ex5q2omqojg7fkixrpxqsx4a8d9diz7d8skaf8chj7l6w7h4dmis1hesx5pt94h9t5yvr03uxbtt5jk4wksxhagrer6br81gt4q8j85vcujojoueph9274zf',
                receiverParty: 'q8htbidkr3kk17q36rx6bdb914hflt48839zrgxosq686gss1mzrk49e85d1s1dx0nbhvyzk8k5tb1hc6112jbqp6axnalmm4a37qof77k9dr8l9190hoojyh4jk324d0i6oz77flk0m6sgwtk1n1gvl5r3hfusn',
                component: '8aqrrxmmx4sf90tcyptmo5xv5yhy8b5kqxpien0lzdcp5msn06667vrhw5l7idli4vayn09onj8shlseilyyfcey530h08fpfnmy2e7g38yohes8ch5hjrjry65fv0z33poxoxoyond4j5066v3fs3yxvx7jar92',
                receiverComponent: '082m1nrk3u90r8lbsbfjo1j1igh68sq8bf5bi36ki7as5k9xon3riy1exmz4vyirtv48820m79i5xk69loecuqldxp4jd77k8v5asq056o36bxv8v1zeafr1kh5e3f5jzbjp1f6k59snyoe4mesdlnvpgazjz5ne',
                interfaceName: 'joakgunm3jwxqhrd8h27d43n9tw90yhvmn2gi3o8hoktp3qtj3brdvzu77a7z6p6jo91nyarc77svy9skg5s25qnfozu627tigf4ye3niu0gzplw1hc6d4w1hqjbgodvw55ydffp8kqkj1we0fcouvc33uhqok6y',
                interfaceNamespace: '1zolehhgxrpz6z6yx0hasmg3yh5shpgt8c9toestuntlaas7c3ogk5rk81cudwbflstmeu7oc6m9uk3iv199glrkhitbdm1yite9h3djtsbhkyjd7flkegafnpj9p0ri7vm2qrqco4d9gwz61pn8eib1c0mhf37a',
                iflowName: '3203kuni0yszakr772vs2kj1rqukahikdveqjklvbiyn8fx1bb7vm961samdnflvlyc92rek3x9iz72kenah6cvhu698bd2rgvvq036tfrv34x2z3flzxysvvm2bhaf2d6vc3gm6kqdpxsqlf6ny8eh1wzhjg2vk',
                responsibleUserAccount: 't12ib9gak0kcwpkyjiz0',
                lastChangeUserAccount: 'uuxg46gkmw98iyjp0orr',
                lastChangedAt: '2020-11-06 02:56:38',
                folderPath: 'zz14nar8iwxxjwe8fwse7nn0klu4wallc8khl1xnh0odph0y4mo0th623rj749npkzeuyslm9vxkkf07zat4m7qbayzt3wwu2bc3rzdyc4a5mesae2fgy6qff7qw49hniqlc8xgg5xkaaafh6mur4qsxl5vhyiw762ebb2wlhy5nvlqw9m6lxn0uflo9j1qk1cbw9w1syozuye1peusme3gapyrcudr400w5ooy2v4mz764xq0nlvywuaqsfpbz',
                description: 'q1bblgonlwkq4w9aqwvw3lk5qcrebo3fycwadygiq2pgjsgkn0z2erxvph90nu6yxx22lgp6ebf97mm6prigu2625015t6s85wvmglkyl9wh6iaugx06hupyvgtneealhruy5lop25wh8jpie5dq7emr6kzdtllyejesfjeoxp34l1o0d8h0cq6yoyy4ndd2r0cjyobrfo40m2wqfc44bxfsm4v4eh5j9j3m6zu3kw3f03thrc6i5n9fai8z7u8',
                application: 'dwapqbmrvnb8eg3q30uu92t6s76126d8c38whp4w0u99ov2j2a6n3evd9krf',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '24ab9cfa-437b-467c-a20e-4d8316d6b28e',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b603240-1c33-4c1a-92f9-05a28a63bd88',
                hash: 'v2zluo8p7dgwpkl9ka8ur3wcnf8fjbd0zxoj81n3',
                tenantId: '44967159-4111-47e1-a4b8-f976d847d9ad',
                tenantCode: 'ih7a06ugwdqv5li0kablizfyeh9zd5dzs75w70aleh99ymvbc0',
                systemId: 'c13ea897-7e81-4be9-b342-6286a6cde1a8',
                systemName: 'plhtw5jiy4tcpq8oc5pmk',
                version: 'iy1s2irobff3bi2uagy9',
                scenario: 'pdg53qnfx6dad272xcztl91mz11bmn8ns1bpc3w2wsvvx3b6h5kyibdj0os6',
                party: 'rhyufzupy64hulnqj08a0o7nvp6bdqk2tngnel6ghtoohlr62s6oihibmu8dg5uy5dbt9096hemoyfx1m5mtcgbuzzphj9wzym0ewitrceits1q3ga3t1fbz3c3wva87kztx3vbbogs0x5ta1xggbofnfj2kilt3',
                receiverParty: 'sua43ch08562ifewhnab29tb51p5by0ui334cu2p9bc0aza6wy2i7c8pkyqqv6aqvcix3f4wlp1l5sr5pz7pmrwk6dioyi3gv75kcdzboc0vgt13i5hmuabc1jg6cn5z2sll3jf3ptvrqi732snzyl978qq68hdc',
                component: 'od7v51y70q32ah9zaajw9qy7rjnen6hufocem0zdfbp1y8ybdy0j46wyhrl2xdbkrs0p7knzilr9pb6wz2ssom1jfdmjx26hr08aywfzmnw166az7w7w4g92u0x6b8yn875p5lk4f037a4n1jdx165hmbkfgdtl9',
                receiverComponent: '40qs220gm73kf7zdwts3vop5ytu3y6hnd3v23z32qq2evoffbe4v8335xzkkkmq0dpjs8m4okb9uty2cz4ap3py5ru2a5x207pnrejc27yy6auixj4jdzlwe1wzzunk832ra6vo6u2bghed198e2jnmluqtj81yh',
                interfaceName: 'jpe3cveq13jzoqg0uaf9zqj6qkg5sf1lwfxijgi9qzfhu4nola49mnoma9r2vem8qcpuh8gh5wn34u07utowqw2px5fkezn64u25aw7f56pfezo4czpbu9fma8r7l462lnu22srrr1vtyhsd1eg8n3hepzftc4q4',
                interfaceNamespace: 'ct8thi79zaebaoghvkmjhqp4onsa99cezwrab61xj1qweoc9ovy7ct3ldbzuojtv36ncwz0h6yolknvu2pw52efsoheks875z0a9lwb1rdmnhdrmc5m1rqk8prjjyip09fuqime9mqa4adjhpmrwf07ul442w5iy',
                iflowName: 'lb9x8yty8oyin0grq2oeasrqtn8yi0dmqezbdiv7w0iqhueyn7adlptvr5sb2hm2hhukbl8001tep6nf8jo0v886b1slacrvlw98uu140bapq48ggz0vgbi9zr0xmbp50jwid1895pcsf3a0oik90oqg9opqsrmv',
                responsibleUserAccount: 'v7xi0cgprn5kgg7jydf1',
                lastChangeUserAccount: 'hy2u7s35g2ah09jtvdxe',
                lastChangedAt: '2020-11-05 20:43:46',
                folderPath: '6jonwmcemqrnmbxcrvryxapv85l3airzaaw337ci4u6x74u0u1jpjj3qb6kd69tsv5p03aifiq4502um0daf2dqop86u6307qm7yfzk1q0bq945q8wfnguyqu4ftnnhcm43lohhkggy0hxtq3fud4m2g98osgps004u5c4lpovb1eq3yxmqciz2s149626lpqfwdnt92u4d9q07h46rjfchnc73dxbvsx1exlsrjdmd5ucgxf4y4cg54chy0x4f',
                description: '21qs4lrc26gkjgjdusdn8fcaidjw1gy4u2kq5gxsdtiyo5tp9o6l1ktck7wfe1xrha9iz96uh9loscsgciz8jligf6r3ew66ziki1cbyfjwlwviviskaj1y9iq2kewf8k999nihaztmzmaxmh89bh10oyz7j4hxgpgdzsy6rrlpfz0ma23g0hqw5vdxed0vxi8xko8u9usu163vxgoqhw5px7jp45s468784g0rzt876qx4pxiuk5xmel4c473f',
                application: 'x3odzw0o9u27ip7vepf5keq83ygctpdi8owo7nxmuqu27qwbc1l7i2qbb0ra',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '24ab9cfa-437b-467c-a20e-4d8316d6b28e',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowVersion is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b603240-1c33-4c1a-92f9-05a28a63bd88',
                hash: 'kint5so3j0dlv6qi70jirun4j35s2h7p74d6nq36',
                tenantId: '44967159-4111-47e1-a4b8-f976d847d9ad',
                tenantCode: 'kcj4hqccnqmmzsw60hcii6uom6rv91tsgzw374nwd5fwct7rtb',
                systemId: 'c13ea897-7e81-4be9-b342-6286a6cde1a8',
                systemName: 'rvfzp146krdtdpf2f8rq',
                version: 'pjxcir5y28opvnfszhimy',
                scenario: 'i1s8k9ms81zo60qi6fa4vtzwo5qxb6xjkbkvxo2q4n6tqcspnb3awrnaha5d',
                party: 'avo231gf5yxvsz1jbt7mzvd5heknoq1voenkxr3dgq43ud5dah5kxkjqxo039fkhgcg76gncqp3h0a9po83608emzwyiz242fwjtkjph23nushrd0rl71umzajdlhx2wva79wzznw5sznh32amlkfk4pkyj5vpjq',
                receiverParty: 'ngq41b9c1wn8c96m5eg4hiypprowp2emgr1xtzhnqeysf1qrbcw7kjg6c9d8iumk8u3haob9qvwyhu7h843carzxunt6zexg5o9w90e1otzxsi1tos4fbuhtywilsr2s910tw366aw0omupudy55pdd2lcndzi8p',
                component: 'd5o06n9gjphwvhbassoft0su6izj6yr34twc4xfw5gtiu67w9zcknmahavm527h8eddc932qmd4eimqn7exaflw4w19x7z2hjsb0svyxgupoohnh83txrttbp5cl7qzwzdazyaivel43dmacnm7o3xzw352mqghp',
                receiverComponent: 'd373586gks5lpq46jf087k3vyr3zv7d61trmw5865wjgfqr5hxy2t9i1m4o1fzfntw22kr7z76rvek0gc9ssbgwn6rhaqgvlrxtpeo7tqoypr16pq9v96ez84unj0bk3o6u6zr62ubmzskuxlom5b9jztrsue1hq',
                interfaceName: '2j15cfaie48thcfqinwx6qyalrkhq8aph78swk94dr0pqmuvhdb210kto1d89g15di5df39ggm0vrk56lebreqg3pv1409y8atyb3cbpn7rhxtw1o6pxww68qzzu3vsi4fxchr2cp5tfq39clqq8d2ukgxc55sk1',
                interfaceNamespace: 'vfk4p2fkae8jldq76mg3el5www5sf02itushgawrpcck411at13y8unyc47hg14fv696mlv9pl8u1caheq0rlprk4jinxy7mykuulgciqk9ht9z50qks5wnn5m29h2ok1logfldyxjy96kvxhxefhnshhkel7f37',
                iflowName: '1kd0cr7i3ujl24i382btzr0d7c140x9xjk8pdpmiw4tvvb8zm0jj64cr54rqgbgii15jkjr0omchon2s3tzbt6w6dava9dn1vhfevp4z4oiaozhdkwgz897h9sn63t9b0kci59lgl1yf79dlyc9eozu1og9q1byk',
                responsibleUserAccount: '977s7lifknzt1vmmroi9',
                lastChangeUserAccount: 'h008p03p1yadkst1oqf4',
                lastChangedAt: '2020-11-05 22:58:17',
                folderPath: 'ociedwgt5z3eojcf8g7nbbu5zwyp847joip1qnoivvyjpg6iu8mj5wyifhrln6zy49h8eapj4975ks2n1e8pw1xtx1w2ke54jspn86111k9ym2cxlqpld4tcq0mf34vrq92zoj6fb8tgrrobmx5m2bm3f0seodpvzh97n3lhk08ovyszyh45vvq3ewjg8nfzggswx5yn6gerwpchtx0xs3t8wdq2tp0wavso2qn0rdoa6nqqw2f97gmar9vljzo',
                description: '6xxdcqsdmvxblj81f195egvjaanl6ckm0q7tg0cbh1rudqp1vcil92fa5kuueeo24tvfsx3tuiyirc6x9xjc96bd6l9mtqs4tskvy5z8h6iqugtowdxiggt5zgk8ic98ush44r1613vo7bixso7vs29ztukhyxaeq16bwjsh45h0llq6n3u8q5ne9wdfcngzjelcoxrq4mvztnwehygggkgmeoo5mri35iqkbjx2gzn5xit7jvtc6zh2bk0sek9',
                application: 'zu8o1ug65eoczx06atj4j3i9nr5smhkkkx77dakc3lx4en5vmx5qmxompog1',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '24ab9cfa-437b-467c-a20e-4d8316d6b28e',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowVersion is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowScenario is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b603240-1c33-4c1a-92f9-05a28a63bd88',
                hash: 'z2j5pyzykvgj33iz04nw2l8e42vt9ihn91oe4sx3',
                tenantId: '44967159-4111-47e1-a4b8-f976d847d9ad',
                tenantCode: '9n0ujzlit8njy2y0d9ufoi91w2m8a2kna6pt4srksw8f5osztl',
                systemId: 'c13ea897-7e81-4be9-b342-6286a6cde1a8',
                systemName: 'zudvwsx1fzgmibe72gip',
                version: 'dhv0nucu8wzcnw79fkrg',
                scenario: '990ygezn5c2tt1k2y0zvaqc2wx6w5z7z9xkmod6asjgwnm0a91vhquh323lqi',
                party: 'w9io7uvmzxnt2xlan2ayzdlz9hjd8qpcr3lzo1nfy51bsdju7qlrgetzgu0m50e463s7fxzzgfjc6dyabyokt9puzx4jkqhlnvfoi8yaffi5lrc88w3ed64op50atdoypiihqca5x9fdxxlag5tfpbrpfoybwhlv',
                receiverParty: '4ecgs6e2inxyr7i4nm62798wn3oecwdu5t4kb2rrly2vaj4iz3m5635jbtgsm91jpiuqugrw4oiw79yhn858b277kumg336gqpz5mvlcinxhaejj7oi6raaej7cdzh65re0fpe1v31j8uclygxlp5ic6l7jvf1um',
                component: '5buovo2vmn5cc01r4lzd0ftk08bb6nizladw1q0i2a986hauuzdze67e8m84syqc0wa2m3g02j6ldnxrrwo4shayi6x5z9czhg3rl4avoit7vsnaumcfjagdsiah89u6jh0bhsheuphqganz161xlemcv6pbeytr',
                receiverComponent: '32gpc9qep8y2jwwp9i8zf3lgjnd0dm59cnbuu4jufuj5nxmoyi3tu7f25821jagg4ut5e0yyhurwr71uyqji5jkydrrtqx1kyi8m46tk41k1te5v7q5cvbpelqbjjczjatlyvpz6wxlt0rrh0uhhbbrpv3m7j0sn',
                interfaceName: 'kqpun72bwed5hbapdxfabntb2xiiyvlzj8a42p248uq4anr9ng6v7vkhmbx1ggodxv9zdifkny5ma9g27fpyljephhhpelo12rqeqi9a9v1kyjx9rv4ye24v0yb1f0j64zo0zly2wvbxih1rxlfzl4ugvqdsa4yk',
                interfaceNamespace: 'e97v7oceqx07oksmhsvf6w2rkpxttk91d61b2y6znropj3n33q1887vvi9g507q0xrdvutrwje51nsxvzx8ysawqi5zjv4p15zxlafyif4rs1vzq8tdfbqjq777gq72ip6qudl40nqqddpkf1glzy8mf1h7tsfm8',
                iflowName: 'chs3hei5i41cm7dum5wbnp5si4sxv9jokkwdpr73bh8q8b4ncz8wmr6ztpd9l97v3jrzk1or76nswrgccmf5tufp6ju4j2kz59npjqu92rywze8weixbqzj7iq12i27eyzvhcmlrt5l276b4qq6jo0zii3nf9440',
                responsibleUserAccount: '45utbhetanndj23gphzk',
                lastChangeUserAccount: 'vbndv2tr84nfuu8fb0i8',
                lastChangedAt: '2020-11-06 08:23:29',
                folderPath: '3sddplk3o9uiyu4eo1nkhpqopwkh3kn8p8myukom2n5g4m66sgip97gzuxs7ah98x6xpo18lswua5odm7uden80yor0iekw3nlulyzisjwija7plkylbv70ypabjeotmdx9oauygj0r060j341qdey54t6fbrv93ylkceww7aachrtz6q4957d69gwwcqz94k0w3b9nusaa8tx7c60guq1vcgczsq9y14qvnir3xta0rfurs7hjsnrrmwst5z07',
                description: 'a4cjhc1xaivrmhewxzhugn9kmu5hvud8tcouqw0m2fzliioln3gu7dytpzv38wzrp377cpt6dtddh3c1rbxoh5susnmi06m6pn6ioh2yyiy4he3yolqxo44u2cqv0vvc1osy0vpw8o426xl80gdie06xog2ps1is1i4waug8rigyiq5vy6xmck47324ucumjp7ynb9n1b8as1mg7qwd3hlw3jx3z4c6lf02oess0k3jjbrx1wmok8p8tjnksiif',
                application: 'byo23h4nuxef1jd75vz6znrmmjoqkz5xcvld7g3an0yla0kkfbhkrfalm23x',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '24ab9cfa-437b-467c-a20e-4d8316d6b28e',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowScenario is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b603240-1c33-4c1a-92f9-05a28a63bd88',
                hash: 'si9an9v5cz1vq7oqn4c0vew4gyj9hz62tjpzfk02',
                tenantId: '44967159-4111-47e1-a4b8-f976d847d9ad',
                tenantCode: '9ypoxjngg1dt82rw408i5yq1y8p5bgy7qfit16uylou2bknlzd',
                systemId: 'c13ea897-7e81-4be9-b342-6286a6cde1a8',
                systemName: 'lmennk8qyq034792xgkt',
                version: '3digfmyhvg7pkc4b4oaa',
                scenario: 't4x60ydwecun57gr006ebbswqfxl21mefkjeqte25z40m70344zqg2y6u7wc',
                party: 'i2j1vkrnpb8y8hmyrl41gbao0b9qj0toqow1enmj78n8o5icjqory27gklfgof0dapz0ft1qrkw93f76ub6pwyvk0jir496qcdig4r0vzz84nvo863w4z9889sd62bwuzvfbwnfeqwk0qjb8gi0t729lqmridf7hf',
                receiverParty: 'cbbk62u6gi7eip767h7zbpv889svpt0woqi2g5a16fbnpo5qfl7h98kpfrj7rrzbi1x45nvie5p207hebdyjjn7aqrzvkkzzqll82ga8lji3ofkznaxwvu41nlgdl4u2856enb1qgl24wyr36kea88nl1opae9mz',
                component: 'kqfub0uetw1m5oqphlq00xjtzuznz0tcukperq3ucc5ws1k74vc06rwg18rc1xhs2ojgu00pflvswrwoof1rsnw7qesp6ky4u9wqzmb1rgjzc7iyvn71zrxafebe49g4y3zvrxrzfn7umjvn95fnuzpwvy6p2slr',
                receiverComponent: 'qr7v34u9e923iflhjurbdwhhky1grf8qkgw16t9zu5kodo2pq0yesnmyxid2hp5fu0t1s4uvd2pno2uyaufxcon92v5ibpyox49s6dzziuxkgpxxmb3mgtha0eyd3ft6ejyo5vq1nqsyvfywbbzkc64aftcvei1k',
                interfaceName: 'essk3d287uz907wa24peeuj3h3z00mjm31qgenbc32jpupwitjxwb0b8ezvuaypg6hh3v912lw13yk2pgjfxw9ans7pu1mz4r7cxg1rj514xwxrp3ekcsav5mlzi8l34lcjeg91wqthhbff6pwbi5rrzz1pttme9',
                interfaceNamespace: '0ugp0czklcm6q9b1sy94p7oe2qrasquoccxl5d0v3eom1kfu0vkq14fz4jnxnvxcnxsv5r2zs1q93375d2hw17pvnsib2v6i51pw7vcpv751hrh09hif4mkhl5k2rdb1puz3hvje44941pw7bzemzhk7kimhpjn5',
                iflowName: 'qlijkxzaz7jh6gg6drzpddp1bwtn3sf9nh0k1xnhiolhvm2ldpmwk0ettfo1c74jzapkq8c5hduv4fl6in1wnl7fu1fm32ryob609dtqlxkgu7wtghrqlbjr99etgdn5jquuxcwihr577eykqldmcxjxcpuihmaq',
                responsibleUserAccount: 'exbmw4qf0vwrni5rg5zj',
                lastChangeUserAccount: '6ydd6vwzt8if86njeppm',
                lastChangedAt: '2020-11-05 16:48:44',
                folderPath: 'sq082b2095v4e2dsj9goqs98dgosvg9k2bhrqu6o6jtptky1am1mm83gpy2xswis7kc0qm2488v3yz1rt7r43z9wwjlhbt86ffj6kgpm0zfm3t0asfry5e4sttf0ojbmdi17n3lwhir7ux220a37kajxptb0ypwh1n6dgt6xmbudyevyuu75acgnexusxpaqv7std7d5l5t7tplhnd9h8qxqlxd86k5wmq718s9z5cmo8gdayw6llts73l1qe8i',
                description: 'v6aywswjeh7i1s9e8h0glbortjr48f93hl98e4hgfbfi1hxwcbbnqmzbx4akjerw4zqm7yo76zp56fvk9blixm8yks61xgck6q7sa8j41yy2rylg69k2sk3knnwx4ykorechgreg1j10fccdd069v7g8ff2pjg2royxrf4xbfdg6b4wo5gozcjfwl94dp9npcb924aj82445f54444up71aqb4lt8k5cpydlaeevfda0hapkjk7gfezn9fca3mo',
                application: 'm8mpsww4o1tj9kn6fwva4nfuvqgjzy9ff6lk44wwgnax8lb0y2ojknitsdsw',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '24ab9cfa-437b-467c-a20e-4d8316d6b28e',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowReceiverParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b603240-1c33-4c1a-92f9-05a28a63bd88',
                hash: 'l5jqped14e4pi25wtxa0jasbi2l9hut8xgeefcyn',
                tenantId: '44967159-4111-47e1-a4b8-f976d847d9ad',
                tenantCode: 'rtddiudo4lsxxuxrlm31floeciavjmqzz0bw6j5a00r9zpnd1c',
                systemId: 'c13ea897-7e81-4be9-b342-6286a6cde1a8',
                systemName: '88uj9g9nlhnsa93lhk1t',
                version: '6h9i2w55n9vfyjh0ey4a',
                scenario: '9zmgr05tifeo7lluiavzaepvzieef9lf8lbby9qalp11hnczs705fvladlf9',
                party: 'ajxcy7x5g3h15s3px4vqj5spnw4r16bbjcjunz0nt189wk8llw7r6bghd2sepo5536qmmewnlm6tjz7bp1r5qjwokfoyjyw05rtsr0j4cj02d5okveibvwzki3y6ybfwo0tdj5i0cwvmir5sqttlh6qmbes364yg',
                receiverParty: 'n9nzr09aa86htzys2mr619u8byzehl3xgfwsd0ic9p71eyag3btfukepgwwu6m45i6f09sk2o760f11xz9qosfjyvu3ynanke228i72442dhz1yq8vd9dtmqylgz3j2ohy7xkrbnklwl26vrytoetn3lxxa9a0swz',
                component: 'xvnepztyx25e5zi0m37sg4h7v0ond5nvwqg7sxsa2k7bxqrjfvcl1sqbx4w1drlvl796ng57gs0yv9uwu7lht69xnuwzdfqnlbpf6yhw2bdhi7uu175qyxdv918ejkvbr84g2oxgfvis2x819vtzl5qy0kan1pwv',
                receiverComponent: 'zn8pg69u4zieq4qfde8ind5b2px9sopaevehqu15cjdh1ohcphnauqqtiucunjwrpr91vd98j7io7nq3eeeytur4126jzir0mw96ofqvxndgb0amkr9ucge6o0grs0sgzu3t0gq8utdg688mi9kqacsogndcmass',
                interfaceName: 'j6wi4e8f6ova3niuic9n13mrro193r482z80jcaohpx5hjgdauwmac1xxzfcwfx5u29parh5j51xa90mryandjsjwtmgpuvp2qcbcriw7b72kuufkw9vb51r9d9tcb3agq9br98ninoohy0so0spsbewt8t0j7ck',
                interfaceNamespace: '397ep9lveu8itfth1z7v5navyhi4w3887zvq150mzrhxo2bbtsrkb4gm45sfdlv8gkwnai64777v8wbbcr9as8ymrlxv5c2vzpf0jjeapqe44zjgnzu5q7ow7znjyzj4c6d8ajl55yg8cv370fgcw372m93l0uzr',
                iflowName: '8wqfdmjkpq9jdtksb27xsfv7rctmbfyi8o003g3fe3ggtw1wfnqwue2r4xpqi3uoulzya46vshd8elgclsukfbl1xg5w612o9566adr3hp44fpohxovki4c9qcc3qvcykal66jclyh91el43cnhe51nw9gakhd8k',
                responsibleUserAccount: 'ejkcdn2j8k9lm8o0n6mw',
                lastChangeUserAccount: 'uvh4ka7xe0id6vg5bhni',
                lastChangedAt: '2020-11-06 07:33:23',
                folderPath: 'm2ge87u6bc5x3cznibuzxaq1gxb41poh46wkmzo59ctymd1kbnxftkpqsr6f0mw0sqvn1768a0umfbpt346ka3sttmt0tqvtjm2d1blxx96f7hy0sco0g2v7adyp7hb07ixrb44s2jt6vjftnj1r2wklbjjkpk7obrqs31etfm6i7ht7536yd0y2zbrpos37d9laoonei4p5ztqymimx410aw5v2u7i63r53i978aj38yy9p37gqxizewq9npft',
                description: '90yzbnroyxxprz4d0h4z6k9mjaeb8vd6z3jvo7f3e3s4e1ngr8frlzhpyp7id5m0pjkfgftd6obmlc813sixecxyxoil1wmi1mgpeq1j80t8l5h2vffmjz1rj1c2uwc6dcrs01ewbrmrkoi5seiagk0nqzvktnu294k3dgogn674rq5jzjucfjby0afnsuvl89km6w93vhh99y16rhvjexeucvyze3ekuehwsll8hbv6su6ji6toz66u9s60mc6',
                application: 'plzokzcpl390s2dv6iiyjur1jt54zalntb0yq7pxd3ry3ct402whymgwfbp0',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '24ab9cfa-437b-467c-a20e-4d8316d6b28e',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowReceiverParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b603240-1c33-4c1a-92f9-05a28a63bd88',
                hash: 'dd3alg7c59xt6qu50db8rqthy1evghbnp4jzgkxn',
                tenantId: '44967159-4111-47e1-a4b8-f976d847d9ad',
                tenantCode: 'u5renlbdnddudcmmlils8d7lf6rt7edrw5042wwkvfmeziwkhs',
                systemId: 'c13ea897-7e81-4be9-b342-6286a6cde1a8',
                systemName: 'bjz7uuj62t4oa7d4puck',
                version: 'wp6gsd105bbg55c4ks37',
                scenario: '0735qclie6779xn7ltmb6s9mppcj6vhyp4xl0qx8dri2pwlylf6e6q1m4uro',
                party: 'k5trf8qytmdz9x4ytjt134why5mxcmypwpbs08jlf83bvow6nltbgdq80dkvgzw3i41pdbrs3ih3fznw1emuwxvu050h4n04zukt1pms7f52vvvjodfq2kuw6a1nhhhu9wy7ixh1hdutirkpk13hu7gh9yg8s2wg',
                receiverParty: '3kv9nlgm957hthqadji02m257bc12rg2zk5yh2stycu4xkya45zrmk3nhessuwrmxw77wxpooala3lr5g91cho5619pw8g698ioudh4zq2d7jr17iomahqtu9bbv9dnd7mk6behrjkyppgkb3skwyruy3g6ulxv1',
                component: 'p9boutbupgt28psjjh1k6hvzkmm4p0uheopustckvbtu66n5s90hiptjo3li3zf4202i13pb4xn7hh1nlec2lv4x8ibe2d14sgu093z5o69dwji5n7pz6xka643p4mzxmo87z90eg1yy3c4a7x8gwvhzol648m0oy',
                receiverComponent: 'qzbtmij9pxd4ohurr2migpasub8nfw58zkq7d4cs62qgnl0pkzz3dnx2du6hu7xl3u8g2zg3vp4flri03hd6lddjk8sfnmv8lxks2e9baf9fp2fbc594vx8a6baqhbcntkci5i1u5l2fh0s5b3szdnw24xnu2itm',
                interfaceName: 'v45gy98ey6fm86tml2reolmzcvquiigdszcfem9q4xyyaci6s2p0bv2jart9zn1t6vtqxrummh7e20zrhnxnf1damqdbxqd4e0gx0k6n1uet7msbxci0hlwkap749aiwrlykc5fyksx2kzg70xzx3wa0xorl7zkk',
                interfaceNamespace: '3h2gmyat525fb9hwjaa66ao3yf64ryou9exe39dlx5au5d98rzmr9j4jbnpd8t2enzdcnu9c18ho7oua0ccfh46b9gygzo45yh2fkzhxg4opxjvst9c2f53tw1qsv1pa0d4jxnmdnb3e3zf1adqt0tw9lg9zduhu',
                iflowName: 'plax7c07p79n3byrzcj510ojrdcb8eb7znfdholrudg869qd07l1fb7fm9xxw788p455sfqe1jvaby3dzw5r7j0jcyn8a3wz850xnkslccx5i86igmxh3st7s4afpyxx60via6dg0is01wxzqmjpkzauyk1c0utu',
                responsibleUserAccount: 'penmes7zz5i6usegfs93',
                lastChangeUserAccount: 'p91zwtrtdy6h8e9s0w6r',
                lastChangedAt: '2020-11-05 21:08:12',
                folderPath: 'f4pnktdq1e2avuwk3yjznw5u2x9v22duoegdrn5jvazv3x3xbow81fecab4bawwwtx7dodwbc0lv0pzgeb42d0a9nn62xk2itu0oiup941n0n0arudgy82djpm1b7f73ygh3h5iroq1lhc6fnnaa9pisebglclfbjl7jamrhyb7pdqm4kk45eof0v98ky85jmrea7lku71k4q4gi6vbvuuj1r50lc7mwor7cztdgxd3s8skcwv3ghn8wlrjdsv3',
                description: '2e7hjfdefal1un6n5yutxa5fdrsypcjybajssgxf71fask8absf4p2ew4bagr2nlndhksw8t8pmbh7ov0oopwpwl1y9eoxvw49b088qz5byj18h8oja02unjsiq9vo4fwyxv011uqjznxr3jo7xry4jjdjlodg9h73qirearx7qaepxysjvk62n1i8sb2dhy3kirjxg9b4q9wh5qse6m7ep8b30sm0voqcafq7er8sf0nq4qnsmnugz5vms8e75',
                application: 'e12jvuyivch5ot07frh98g3dgoxkx1iax291vpmqsdmdn03obfpbsliixdnx',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '24ab9cfa-437b-467c-a20e-4d8316d6b28e',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowReceiverComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b603240-1c33-4c1a-92f9-05a28a63bd88',
                hash: 'qcf3ogbh7d6a28fdas2c8aa13n35dqbivyos8p0p',
                tenantId: '44967159-4111-47e1-a4b8-f976d847d9ad',
                tenantCode: '7n3eyyr6dkw5oniwwg1iu2mkv27p3tqjre6s6jp0k3zi6ixgr7',
                systemId: 'c13ea897-7e81-4be9-b342-6286a6cde1a8',
                systemName: 'sic3bcijug70t35s54j0',
                version: 'xcpswf4al3ny56z49tgv',
                scenario: 'ftoy3t7787r6hvuo5nt9l4mo8drxhp6d98u9pmscb7ywxhs2j81j42nzzv8p',
                party: 'z2290dop941cnxr31ey04p7nkv8cwzovj1kk28qro1kpr5yqnt0an1rf2vjqtah63lycvfyj3q4d2kwlfgl2w6mlibpls5eoeu6lztkofco7f37mew6uf5bmbrx5q2kuljah0fkn2kpugrde0y9s87sl7dqj2se1',
                receiverParty: 'itduyz336endp20bsa3ph2duhvdqatjt7s4o3q1w5hvtgn44q2jdaxo3azalprfrk321yyoxvvlzwrlmh4kln54wgnhuwssqm5bxf0akpi6gtn1b78j3axbkjctzc8ccyknd03sdybzbe3ceslm3dtfrgwm0upe3',
                component: 'rkyejl81rrh68mcrctl8b57s0948cr9493bho0c9p86nvochqs6zfjjnjn96js4tc3osiams25a3xkskeeeng9uvxxhaes6l7ooxcun7ycvdwqk4bosem8hh6pav9e23ksei0labxtbzjj4aap9yydcgtxbjc2m3',
                receiverComponent: 'mvuvlcqgr9epuiiy7jyqyi446ghfyq2baymn79j8vkhapkiatt1lr91rapt8kdt7uo4pub8u2ead8e4nffb9jwsqkxau1v1vqyc4xyjdtghviq4ecdoj0u97gm816284nxa4i6vwrjkothf1vn9pjit0mknmvfj7d',
                interfaceName: 'wh6cfjbit3nkth6bv074613snvr91b6b9axxa5du3fi9pgs2jlxe0f372rj2ii151y73n4zlcdv8k8vhcb439rsp1jshqtd5x0r52ja6ue96jwykjarxrw8582xjpyuet4eu7lruy8o0rlu7gpdssmcettp3z0nn',
                interfaceNamespace: 'a71hozhllvzrkamyq49y47d7uwhrbclj7l2rhdpme8hmhq70zeh8efztrzq6xv8gt64fzgy21dp32wilwthqe48tzh558hohbysy4hzwq4po1ih3gak8gvyhv794zyeuet74cblysmbmnbn09tm142krb0ho2ra1',
                iflowName: 'tqnmpbepdgsm23fliv0eqzi7c8d09z5nzgm7ak2jwrykoqts40ovyoa8zz7sptv8n4q8qmozhtq3pmsegi2bh27cgs16bv939mz17yilt69opj0qwjm57ftz22v4qv0p3fllpae32g315vzwojzfd2ptlufqbmuh',
                responsibleUserAccount: '05c7rs9njtx1ej1fal4j',
                lastChangeUserAccount: 'walraevs1zsqqa1vp9k0',
                lastChangedAt: '2020-11-05 20:31:14',
                folderPath: 'buwcyee8rzpz4oaywkhzfstft6ld7kb4n0sm7n9bbr0gogzfya6mwz000whyt18vpd743mvqh8ac0tfirl627mz5b0q1292uudkhap4vwq1uey4xo6z9r6okrmxtr2d6pnt331x9ce6hxfthl41j3a88jamo54m4e7z85tg2j1lbfo7w7fnaak8vyobzuy93c0at37sv51rhdn904eiv2rmqf88qobh66zjoq135yw5c85n52bxai00buq0o3i9',
                description: '2lpsjqphmn1chfihz954bdunrgplvr9qtt47n8z68ic27hqp5d10ry947pkff8lq66xfs7cfzviov087nh9x0bhktz9v1vim5leb9gtfij1127hpesbydro7f9zohdk6no2u9w18ajdfa2uywjpi5o459uzoxs7y16lbvspd8sdb5k3o8s0jk9q6qy4u22gvtkfce82cvd57a3dr0ulc1m2v1ivtzs83yi2cjbrw1kitgnk38u3ms3iaov3nm6p',
                application: 'epqfop27yc0367i515k3zhm5j99u8hmaxdqd9dhszftle0rm4e2owstpyb1c',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '24ab9cfa-437b-467c-a20e-4d8316d6b28e',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowReceiverComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b603240-1c33-4c1a-92f9-05a28a63bd88',
                hash: 'ark14fvfhumz3iri4smu15ymbr65jfc987b2nnkb',
                tenantId: '44967159-4111-47e1-a4b8-f976d847d9ad',
                tenantCode: 'jsvywjafueka0ur65inzpukw6ghjqo36y2t2htwz3bxrlp3cjk',
                systemId: 'c13ea897-7e81-4be9-b342-6286a6cde1a8',
                systemName: 'rg795ymz8v2r6veqfwz7',
                version: 'zoidyxa50hcmpmpegu1s',
                scenario: 'lepasxm2ku8t7zi6q70ogk8vfa68snct2idmuto24t479lsn4r3jgtvwwpss',
                party: 'qmy6d41zvco3ioj5d3cq2t05vg4gays4tpk7ks07x0ya5xax28xr71rxx04lw4smc9juyh0i1k5jeyqdhj6ppw8ghefh9e8mh3sykc66raj1t16w7243g0kljfpxv37vb1jjgzbfk0z40rk8gy16f6oi9sqasrq7',
                receiverParty: 'efoonavyy29a5fgie8k8rpnkm55uqz5o132u7d80boib9p4rhvgp11oqmfsqvbcodamf1cwx5y89imqumxyfx2qk5f7z9oh53dw2rn96t898qichvc7ooxbubco8lokp95hlsqp5oix42huoh7tckzzsvduxbxzf',
                component: 'fn3w2ecpyikyiquo51xef9wk2101kh10ft6z1byeh23eflqzioasgbh7rqd3rmxcko8ndqjvwxqd4tsvsrvc094wymmpbcz8da70f319xfkffq8vg7koad0kp8rxhl2gu0nb2goawvnupwokq47pf3tamggada02',
                receiverComponent: 'vu884tc1fl46nm6rykfa3vtvl4oz02un94djmyaq0otf83x4kifdlydu8x8spsbhhoxz2rr802xo8ymvqsh47x4q84gocb77bjiqkfm81x4a8xrb0yh95sefozn423mp1qkex9zlcsvpaizj8qt6b61p3dja62ra',
                interfaceName: 'btc8ooz1l69u5ww26xjhw8pwbttjfcp299gl93xghpt7453uexpxnjb5x2xuz4eydemwju30nqed7z47st91cqibwvczvpbpsnnsgnpzccuoz6i62xn3sigg50bfnjk6yzbe576q51kv1e678h0wl714glhdmnern',
                interfaceNamespace: 'kkrbqy2emkmco992f6kfasjt418wlyaguabqawtn40vuj7d2y85ttsd38q4gwvdj3iw47ufzxvxv4gh9x52bvj188138vc31lkc2bk05wob5dbvjcb8yf8txby7x9zqmq4yx0wcefnu7o9uul0uha3ukp9if3lxj',
                iflowName: 'qe0spg241up4rpcrvyjtidbqpdf3zwrwrnn7dp3girs8pp9in4hh952l2b0gld6vyrwhmyhddnyecwbynndvm47kw1yebihmy1pik44usgpqxlxxrusu86c207h1e8y5k2x4jfoqd1q3v83zqrox4ujnde3o2xr1',
                responsibleUserAccount: 'jo1zpb9gb4li58ggz08m',
                lastChangeUserAccount: '2c8tlfpk6s1bya1vt4xy',
                lastChangedAt: '2020-11-05 20:04:44',
                folderPath: 'q4b6yz1ydygn4wwz6vcyh7a7oqgxcuqmxj5qn9efcdk2p7sj99i6ygxzgm42fj7grz6s46rffhc5sklyct682ukslrmx2vpnw5dv8gabv4vimqq38nmul0kl4luvx91ndyc52mi7lqeu27w5xhssr5f33aag3qs4fyxwpzbz8r4160ktat1gjstzf9jp2imb24r4h7gptkz78cmpd43sx88h9wc37l5irwum80jlt59lk4ry349qp7e7z7a5kcs',
                description: '8pq6hgwfbndsnbgeu3gnzv7o0pukxef0927a1ru31gch4as0h02z6xr7jq83e9cvv25mu7sdmnolw2s0cdxe09il49rn2q0lcvy7zpfr3ykjxr4jn4l0cfn0papw07y2t6327ip78ggwd4sjwgol65adkh6pjc5qh5fph6cpm9latnd3i2656e8zfd367lp1rk1gx9w8yvqmzxow70ze9hvjtzhjls2nzpq7wxkwpipu9qvjpf8k5uwn59m70n2',
                application: 'h66vjgyipv3ij2r9qwa86nmz5e2dwuec053t6k3cvxys53k8sf7d3npxcwmt',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '24ab9cfa-437b-467c-a20e-4d8316d6b28e',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b603240-1c33-4c1a-92f9-05a28a63bd88',
                hash: 'fzvupnkbiin7o4ev4t6qup4pi6sombsl3r0oar07',
                tenantId: '44967159-4111-47e1-a4b8-f976d847d9ad',
                tenantCode: 'skdsdhua9gng8iqlwge2lo5et83z34bhk7qy4vabm5zthi7tci',
                systemId: 'c13ea897-7e81-4be9-b342-6286a6cde1a8',
                systemName: '3la1j8qivrrtrs31t5ai',
                version: 'wb1gyllqfwo5wd45xdst',
                scenario: '0p2m7novxkcj53xs1ykwensxx5iozkvih0fk94xapob4jokl0puq7kp3wkur',
                party: '726y8lzk3w3l0bshnfkqb403637m6o6502jgq9i0jmvvv0r49ygou47sros8x6relu6g4dt6hmjtqnv4938gtsuw3k0g102c8z14lcneligt14jq1iktxzukzf90102y4bd92wkx1qvk0506ddiih23dpyoqyzuv',
                receiverParty: 'kckyfvoyswtsox25b43kqxw6h7qr9hcmuhudbtwx1hvn030cn4j11khhxd3up96nabevvf9uj7ljd7unmfcn7gtu2udj4yhl1itxqvmagg32mz1gpdlpwbouf9tbnvesewylgip839od7gp7r7oi92p5miwx5t7m',
                component: '2ah4679vltmlyhesv0jp5wqtzie7ybgo2fv9bg35cx034zdiyi38m0zy9ficbdkho4wccneexsuk9oduyoij1j5pn0tmunwcfgpar6rwqa5y05t3nujndi6cdh0besj9z762qjfzv3lpwm2hsu93zn5isq32dbxq',
                receiverComponent: 'fb2zvcthzgfpn9js54muaytadqo6zbhohqy09wkch855t6paig1ekgy3obxqiatavx6lz08tpx9ucekqfkvjl365bjn71h4gei620h2nmhmiiqoi2icu1bu7lut8os9zws65i7pfsvqn2rjtzuzuu4puz7eviej3',
                interfaceName: '2xqzjfk1k6b4v4a0tq0wckburxqnmkkkczfe0akz30jnm0e54tbj0kcsxismwhw6wj172qe420tlga81y5rgyab6w1cghun4nf09f1zfeyv2dnpac5pwk9wyt8kmxw9hgb6chxmd4i7ynjim6papylyx5hpf27hl',
                interfaceNamespace: 'ur6p94w7kjf0tvjmvwe5esmk1xea91kqs9hr1ssvrwsqsy911aeq7s8qh4smwky7lmiw1ezzhrw1yenn60fuas3tr1o7i5e8240ts2wfx4rbv5x7yk6f0338yiqfo94fnmy3aavcmjkd1z8tj6r0ne55m7u2bec5k',
                iflowName: 'pcgi6gd36lyb8p62d9eujvhgpw5qrm5nzua8h8yrg42ea6x9czczmjc0calizrk6wphw1lduz9hziy6y2xq3lq1dvirnxadpin4dqbut60wy9ssoi1q6x3yvcvxzm0m6dyfhtn5js8rk840ei5j6lv4ldzs3ita3',
                responsibleUserAccount: '4fjdwtykl2jjfv9vr0wz',
                lastChangeUserAccount: 'esemckloabzy8r4tzyb4',
                lastChangedAt: '2020-11-06 05:50:34',
                folderPath: 'l5qcyjpfnqu0d5zfgzfpj6utszwgc3qamf3qhp1v7jsibpgmrdjkeulw33r768rlyjfuhfxjdh01s90t7cyhq21rz23e10buzqdacufrd6qoe3t6gqo7xzu1c9360eqfgtrfehio85odcfkx23i31cgdh32gm5ped1jtiv5liabtymzjilxv9hq7fscdduz4vri7nstr7j8a6of2b1gaodfiahi673a8iqbcksukbbb75wnpiuvlxh0a0hixy23',
                description: 's4zjwxftb0k1kyvtls7h5b4jat1d4wz77cng2yge2q25tj61mmk2n0vjwclwkxy5zbwfr9cqjavbihz8rd5fn3m1pb00v0oficdzckho2zqhai0c6vaanyflyfuzkpo9p3azampjgcd5u8pasvig7jz4mvji2p294xpgh3h85kxiab5jponrwiu9yq5nvrw27z51l9pup047077k0auzsa5ert7hchvul4ynchfzyp42srslrgb0i5hpbt8m2q4',
                application: 'rib771b3ny8zdkmw2jvlw5rxrnyffzufwo0uhqh7rn2vv37enhq81qfdlhvo',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '24ab9cfa-437b-467c-a20e-4d8316d6b28e',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowIflowName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b603240-1c33-4c1a-92f9-05a28a63bd88',
                hash: 'w1gpoovoqkc1ts6ri0c2211kx5yseo3u6ba1nzej',
                tenantId: '44967159-4111-47e1-a4b8-f976d847d9ad',
                tenantCode: '4jvvxp3deq2esy5mmw79scraoru3k3p9jagoz2z4gcrbujznjh',
                systemId: 'c13ea897-7e81-4be9-b342-6286a6cde1a8',
                systemName: 'myz13v1twxcn8i9czam2',
                version: 'n6dnecyi0je6kj1enbo3',
                scenario: 'sarn0t1lcuxyw94cx6u3u9ligc488ybvjkneaiqwqmrfh74hny5evppt9lct',
                party: 'oq4r9ku4b1ydg8ovshtf4796651oywu64cycnr94bmssa5lh0m03w7hxt53troxa4klvusrf9kx9rq9obr18tlkpy6b4xau33thkxhvgkmwbdscyx4fdmirmktpeldowi2mw6dhtpr545r5baf5bas7s6nsjbayg',
                receiverParty: 'n1hhvro6trh3kyepo08rxraxlhbb71ck0bdrbg3qcst11ontw7yyrif70kx24gt0t5507r6qei8q9bm5mtarbuq2mmsbr3szmxkdf1kxb28xfb5hfj3h1wmltapbui6g4ae0h2802xd6n6r4ahlz4dn7bcbvw26g',
                component: 'lg2pcmcle5e5sczhanniekmy0pxco9yshjz9orrw71vjlyx5jzux6rvnh92a5yj4bzk8o10msg3tt1o7ulrdnbb8j25lpi6de7m4nqgjma6tfnmhxo0a3ktth5vjn0l03t3bmj07lb17s2h0cuv4wuyyaesdjlmn',
                receiverComponent: 'ldofykc3ikfregn2tjwi0aj8616ow3561sl6svw2g9c7xvim16jlg6xmj67960xhhg1055nmyv7ugey0x1skt482ridaz1m7uejvxaqa6pu5e3rmf1hn4rx77aa711tm3bbdn1tm8jfziz88fq79yd3hxibm3s0h',
                interfaceName: '2dnuqkrdn1ju4vaskn2mpvzxky33qmm7sp0rjequ2qvkqtrtvqjwz34mtrz4eusiafrsy7cws0g4o7p02w08tt1s8xu2bnyivofkur7fzqcnm7km5vbfwjel1ndwvwvs0j64gnms7efw948y45kmx29zvlf812am',
                interfaceNamespace: 'nrvix6lyavo3avzb7mha0t1vic1o0fchsy39g1joua7pqwud6lkxinv5sap0d6jcfgc2blmmlbu8t9ndexdmgnbqkbhgwx1bsdisoe1j0yunbjyqoblyvo0rr9k9z61uw4v9i03t3j3kj4ny13jqe7zn9wwemy1a',
                iflowName: 'b3ef5hewnefein8t79jdkz974g1ef4y15u45g26blh9oh13pgm6pyps0g44evhesqiaurlqihc5x43gmmqc3tznx5twajifa1zq8yebbqk2u4yxo6eti8js1pjtkmgg55kkntdtfylrpc2rrvquwk1cdrrrjr5jgl',
                responsibleUserAccount: '2wamacpzd7tfaevuym23',
                lastChangeUserAccount: 'fryymmw5z9cprh65ilwk',
                lastChangedAt: '2020-11-06 06:13:33',
                folderPath: '20pu9zg2mulo4xxmpydqmip0d5akynmnzf25qekvbe7nje7ondt4wrbmn2fu89zon9ffupfi1vwhkndg3ru2wx8wva7jqagzri8i8523xxkejymz1qcd51wp9he22wuxnc30n449etncj23o2ue548g4lcacyoqsmkwortxynouiltcxw878vtm28hz6c9g11ao2gm0gbaorg9xw3th7tjlcy83eokvi9zep5b7et0y2f834mu3mx95jhu3ecr8',
                description: 'aabe8lit3uqi1zrkrki8kzvaar5yoepsrlj1hzplmrg2plrzh0nm79oe5ha7j8atcfiszgxtku6o8dv3mrikkvreujdiss3i3cz2jmpd37ft5yagubb6gjijoa4z8w65zz0dabfjp10lgd9eqh25nhp4joqmz21q35i6d3z3j03zu7fqfx2vvpz2ythw1gzyoaws1gkc1kp6nxh2oynbtuzo0phtfhjg1uwdto9651t0qi23nnv9w5mujcvhbuz',
                application: 'piu48pxyajvgg04wa9jtiwcccp9n4f3608w5p1xk0ivfih8x6s6n0lwtq4xg',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '24ab9cfa-437b-467c-a20e-4d8316d6b28e',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIflowName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowResponsibleUserAccount is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b603240-1c33-4c1a-92f9-05a28a63bd88',
                hash: '4r1lh9eslx56my4r20ea18sff9yrsjviz0fjtmq0',
                tenantId: '44967159-4111-47e1-a4b8-f976d847d9ad',
                tenantCode: 'vt0wgjl8ut87r7h2vth9t06o71v48nqfqskbbht982rkkri484',
                systemId: 'c13ea897-7e81-4be9-b342-6286a6cde1a8',
                systemName: 'jmhe0sle5601ljuv8k03',
                version: 'nz6r0o80u6scd10f2q2u',
                scenario: 's8x887zzvuzn3pij2slrdtgelzxlvimnj83vhwisa226wymb8eegd203cj6x',
                party: 'mm0jw0evf424zw5o8rwqswr8kunfw1fisgi7scladi1fcj7s9ayo6p2xdokm1ktb4jzcd7z19w3nver07vp08yay55ya35dvwmhilanv2t4bwd9gz9nxnofopu3bdu6m9mo4j4xxob1i7eaihq5t068sb5rmqb8r',
                receiverParty: 'vyhkfxqbrljsbsqz2zw2z3p6xzkw0jci4ctieuyukt40m01aoppof33rrwmi509wtcmzllvfvfwwvocuxcgzf6g15tnckuqke46uz83gj6qn8e48rd4qmx35wpr4vyrxkn1mtnhg0loxd67ltcfs1nzokmjw2y84',
                component: 'l6c4700jb2obaab2bmb0152l375gd61rn75j0tus3m5wrpz00mebz0ppw6l0cf74ad7aq6dbpx2j58kog7f9lx5rcr4j7eu9ih99v1k5neebjdl2sxxhy8723064hqjo0ids0u7lc8ecunm0d5yq4yopto8vkhcm',
                receiverComponent: '2h1sm75u0od394804jl9q59w2z52o7if1qk7ryf2xta5z87pmo6fgjeczi9zyzgqdqh57ywf69ko0vgs89wbioj5yqqgwgerf8kayv7tlkb69urb8wf1y3q60yjcmxsske4fo2pur7zibzdbga91wzufrjcxcz2e',
                interfaceName: 'g1137vj0zleuhr4o8re31k2x809oe4vahvb77nxe95grsyk5z1w2zu0tzllep0tnqaro59r3c9wyxtu8zzy6iqk2avogey3gdqu8gi7mthqki1dliv04i869h3aqsna20pn4s5rbe03ru0adsod6p3iqjjgsyy6g',
                interfaceNamespace: 'rhj66ordxusiin7j0m0hrra0zy47rvrom1k3816i2dz2eu71cxfkrkjetv46p5pb9l4zj38ce40w4azryg2m9ilfojmd9z5eyby0dkfqhppt3gmqvnrusi27wlr64roocbtwe74dyvqn4byap2p8y8s8awiusj97',
                iflowName: 'aeai0a4g1x0bq47qunczlkqn31yoczwp2i11y8sicjt5lqi9ruhdrmiit3tnh8o8p0uiie5wzl7ptelo6i6qkh4v1ncbcjt5ip33vgvsnpd7t87sciuo6r659m095eqd2xmeps8pxouijqs7sn81k7vtd05v2ofj',
                responsibleUserAccount: 'gm25pf2b6zzhveengvnbf',
                lastChangeUserAccount: 'xh7365ktzlc7nf28xafe',
                lastChangedAt: '2020-11-06 09:28:38',
                folderPath: 'ldlcnlqkljsyl6yc4lrfyjt4dir3esy1v40o6d5ck2bqot6o808132daa0i5bi1vv7olcc7uox2hrnbbf5yn5vkfmwid5arnnbmzzu4cizk1iyr4br24wlxv1fd0ezwhg8m7p8j80nd6jhwkwperrvhggo7nl7o5ksulsoez0f481e73tviojyzo6nasermoozkmvfv2k4t22knx69bhx1tpydj2yr05mpbjkv5qtn6lats8mgoacudeo17b0h4',
                description: 'xebkrhbn83m9jglt4dvrvg020ai5ub8xwmeb5xm131mspigcn2z32is84fci7934k9mu87il5nfyvl5jodz7hg74k7eel41wpqlgw48s43uz1eg3nop08uel1qh4lr27tstva98fgz66zockm658n8dee2mq0uvtomztnomn2v1e9plv8qsyxzwat6r38f0lh0hrjyzn0i8gxjyx2khwd3klx2uc7zi1pqi1rq47hpphntr4a21lchvk7mw4bch',
                application: 'wkgonnrdsf9svyafctjhhjblb4dl8ix5axtnyns1qoz3swlu6fpx04zlhu8q',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '24ab9cfa-437b-467c-a20e-4d8316d6b28e',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowResponsibleUserAccount is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowLastChangeUserAccount is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b603240-1c33-4c1a-92f9-05a28a63bd88',
                hash: '3ub2ma09slcpn36oz25jfpx5mjns2d6adzqgeoc5',
                tenantId: '44967159-4111-47e1-a4b8-f976d847d9ad',
                tenantCode: 'c8r6xxjav5bps0wc2lltuyu82s82nka4mdp6rkdn38ebegnz6g',
                systemId: 'c13ea897-7e81-4be9-b342-6286a6cde1a8',
                systemName: 'nsjmyk3na8s63u7ach2h',
                version: '74zlrqk4hv696yx730r9',
                scenario: 'yfqvdwaf2svqwylc6wke3w33qcdfgw2p74c18qgs0fsgma3aqyvb94jra8rc',
                party: 'omzuofjplxy4ssljzytuhi7qonj2o56m4tw3jyhqg1ckm544c0t4dr6rz4zu6yc3q9e8tr2oqajgp6z08kqzhfh7mskda0ayj6zzhc236bt778aullsx8t7am0fapa11td1ddar3hiv8cpkng3msq1n5lrk1r8xv',
                receiverParty: '4p0p7xh1a6athfaiz7b4uyin33mmfgg3nhvd3rxf2p6fewdyfgek4dl832ftwt4o2nh38q7lefg45jqdr7yjp6eywdy5pqbk6yev4pn0emval82hj7yao76dnoya8323byxbau5b2avra0ajr9ie2ir433907l4m',
                component: 'xh7q4rcm5m9nhn26etrx3uni49ioeeucsomh75qhnxfjacud2t2bdqhk1med664h60m3bh0d6k6s2o8bu676oz4g015vcpstgti40vyoebov1w2y5ipbfmfz3k6mxl4al8vu9dskfkihdevqba60vwgsjungkyys',
                receiverComponent: 's4thrmew6qfztgzlgi23u0fi4lhjc5acpw1ajfpyjpkoata1v1lcox3owinjpsw084jrymy9f5knfok6tio9sl6anrvas4y83z6smetd0c4fzb42spm8yyear74ssizhsyeg0kse6cxu4p983zqowhsspav2bb14',
                interfaceName: 'z5f13kvujg25y87m0ypbu1jhcb75cfq0ifmfu8j30xc0p65maa0y9n4suz8wqbvmrisnuqp1fpw0an1vxs6gocmh9o3k1p4612rk9zm35wi6z7e2n3oiovslj6q99nc94kugcm82g3r9srqy4tovdouhrakb1ril',
                interfaceNamespace: '77sh0uaupz07b71t1tg5hd7whmh0qlhzyu6ct94ok8ji4y9reg4j9bssx49cfhr5nk1a1m6h2g80510fjxfecjc340bbnhkmr47bjq7gv2c3ty7g86rubfoicy7qzb5bvv2qaw9lq8kbgo4q3tt3m8d811pb6dg0',
                iflowName: 'flcagffjif6wpmreqrj4iy1ybfo3rdjk51uocu1ld9aloq5bk7hlp9xgidtbuv3ync12hamf60urdbsv45fwieo7tv86i82up833dn4vg5xmjkhcj4p0rnwhvjv92jdr6ac48xevg3ysmnjapmzbomc1dqc80k66',
                responsibleUserAccount: 'e7s3nfda307cdp44y2v0',
                lastChangeUserAccount: 'fm651n50q3r074bsg9vmt',
                lastChangedAt: '2020-11-06 03:05:08',
                folderPath: 'hn6227q4tuoalkp3g4dbn1woldhaw2yxadwpyrp1asf4cuu1tmx3q6d5i6x5m90wn785bjqkr23r5wdc0778guyxe3vrozruhdv6gddt1jit7ebk76vat3eh80s8r570p6vxxhtgkcv13e49lp1yq9x4mczb64ucxdqyofbmyg9e6xo81fxs00or8r0j4bn837mukihcduhz6a1yuzbfltwy379n0mf7judzl8sfaafdnyk80w9k926abggowov',
                description: 'ywn9b6dn77ob5vu7vogvi25ylp5unxl67zf4bk8eu5eiea0arxzjv77x38i3am0k9ar4gmchjmfafl0uwxji0xxhjzvao60j8w96sdiakt7mgpgs0qqzdaoc1csu91s9uu5dcsn5mnrada4e2bap4cgb171crd3yiuoyfqd0jazlyg3ou14btmiu6unkpgpvkuy7t1g0qvgq4xxeca9jqeivgp66f2pwvaup4xnwkgd2iinfqgseeq6ecmt1n7g',
                application: 'mcq7e4ue6kxp1wqpo4sq2hpq7kq6d4tg82704s214fyvhws0uozric66gkpr',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '24ab9cfa-437b-467c-a20e-4d8316d6b28e',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowLastChangeUserAccount is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowFolderPath is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b603240-1c33-4c1a-92f9-05a28a63bd88',
                hash: '5gyszxos0nbh88dif2osg1q70l25zi93f8t9bfkm',
                tenantId: '44967159-4111-47e1-a4b8-f976d847d9ad',
                tenantCode: 'h4w7qsub3axy0np6qxl1vvqz88rc5lylv24blg7nz80o5spbeo',
                systemId: 'c13ea897-7e81-4be9-b342-6286a6cde1a8',
                systemName: 'lbral27nksu6k8b9aa1m',
                version: 'fxcayaqafwtlx13am2ec',
                scenario: 'rqjnjuzhkqkdfq4pn56j0t0n7hzwag6w0b1h7g7evkuimybc0o5y3hxq8fgn',
                party: 'pbjg4s5n1g277luhgcnkx9ev3igxtz8j7675uhg2o5d3nbdqx89nq7hbozvbhgzghixp0m13fmnk8zg50bu3p9jhhpyefpnvkztzjdqt4heis3wbbakc0h4wcwx5r1v67mi5k5yyd6k9xesq0nirrkp0xmz5sz7h',
                receiverParty: 'me4eixr8dzaxg64s86vo6r6tce3yjz15sdu7cu9f2wr2fb613iojnh431da2hiwpmto9h9m5hc8mm9wbhyglif8g4buba18ei94y7i7afvuclg0u9ffasr8ymv9qzizwkwwqpqykyriy7ao23z3i1bcypk41o7hw',
                component: 'n3rx6qa7wvttghltio5g3kwqmu3y8wmjdfnu6smz1y9m9ymf3bkg2pqzbzl8s3c6bzbpojsdiz3oalg7xnp7y92v5mgk0gtik0xnqnksnoyh3lzo333197a4z2kjdxde6kn740i7yfcaa0p6bhikuabkj7iq0u0s',
                receiverComponent: 'ua6yrflj9o33dvc77xcybe65zh6r7rpdak48v7smtscmrnv80lhag04hnjee6bcnvod1mpmv96pj3h9hdh5qs3yox3jah982srpkm63lv451l913lfr1g47kh6yhys09a26ff7ct4mxjcsim78mg6ang6hh5gpt3',
                interfaceName: 'mg52v3g7iqe20gm3o8sxuvctmgbdokxt4wk7zm04atlamm4bksugmqtj9d8jqsbbylkmszr1p660f8xecxjt2960i0u1mo499n4lvmi3aaolx5f8qn02zvo6u4p9qm8l0tso9yh8n18t5tm1zzuhm21tlpo1jxco',
                interfaceNamespace: 'bd25osvbay9ohjsplzz84s2o7nu0eyqqf3lkez7oysngmt2my6n71pgmcaliep326qdm1o3hv41oe00vmyoyph4n0pqk2m5514bs5jznymqtkg8x9ibj0jvfwccx4tbpazo832ghy65zdykdd137zoysw5a1fbwz',
                iflowName: 'lp5x15e4tquv728yuyu05x0ndcphcdke4chv75is8akp089i9c5w87koi0i628il6tp57he1bygb1wjeknz96jzqw76qhvqwhzbgmhqp2lm5d4h0dgs3y8eni9lk8agqx7mtvfcbepgr5z8b8v5oygmbbat03vif',
                responsibleUserAccount: 'gpvxm0nscx1w9dsc6161',
                lastChangeUserAccount: 'wnlgvelb3spggrimoj2o',
                lastChangedAt: '2020-11-05 14:30:50',
                folderPath: 'viob9b6t7x25rhdnu3o8ip1nwfwjm7wlxf3lalta4bprts7pi6xh1tyqujmkkcjkos2s52zvib4g24nacv1cl3swvdqr1lnzf7ubssof8bkjgk121ke28tcxhy1qek6jlif8n0u36x3o53d35nfn9mlajjfjxxumzhruvbfqucr2pjce80gahhxsawr22jumy34olm2fhpem5qpd31zzx3u3uysbrm3m3ckdihec4w4e7xubbonnfcv9dhr96djl',
                description: 'xtwjgrb8jnt7ia5rfo3oniedfs1a2s4wjd00yxfteigdwyy6gmo72uyxzyf1d7nx1vhix0j7gqr9h7s1p44t8kw7w04joia2gr7src3hm2nh7zikw0izvzwj3gr13yxs9a5j67w2jup9nd0udzkcgbu94ikk3hzh3jgn3sabwrb600p6vs9c3kiyzd7n52i87elw42z6wrmoactjxepyj3gbihpd4q0tacfz4ktamycf4238dj10eznwrd0kikm',
                application: 'aqs48m354zfiqspgn6oic9if9paq9qdkn865qmqrb2n7efs2t5qt2se8jven',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '24ab9cfa-437b-467c-a20e-4d8316d6b28e',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowFolderPath is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowDescription is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b603240-1c33-4c1a-92f9-05a28a63bd88',
                hash: 'c2xefzk42flkhoa3tto0hy0wd46pdlnns6iujkr0',
                tenantId: '44967159-4111-47e1-a4b8-f976d847d9ad',
                tenantCode: '3i1vlpppniyenf3up2mor13i73uhtkmmqlgzigfwytilwn97qr',
                systemId: 'c13ea897-7e81-4be9-b342-6286a6cde1a8',
                systemName: 'qchin66xiiwo346nw1zg',
                version: 'op1gxampcnduopacielw',
                scenario: '1utxg3xvav2gltte2ag20etijwlnuz1rzpsop38nn7jgsvo5zduj74jfookp',
                party: '84c0qawn3p85r8lnnr0ungp6na9pnyka1mnpzbpa8ddaczayu3a0wiw71zspw8pec5kz6dsws6jij3oy3kw1949gun8pvfnadw66dag1r4a3uu5lr557go8vq3grpodku8bv1nztolzaq78vlsu4zsczoobnbdoh',
                receiverParty: 'ejzmjthb8mv833gaz6rsp850ubhoj9xzbor2izswfqqjood7ns6vstzcqi6w8owdwa7tsvsy8k83no9tyim07ww2p0bqai3ql93g1p75dpne9gnm88sxlra8lcy0xonpe32b0uxiqc7yruw8gf7nkbbk4jh1bfzl',
                component: '0542hglcu7j3oeuvlwztk8pq1ghk940ybkp0rh56q8nl8relane62b5rvon1m6g72rdtymjutsmw25qglumn7pin7c6vnbnmqoolrrwq7mz9kfk2nzcfle3pm5hmeayncaom2hht84jr84f7xdf090b7g30bx6c8',
                receiverComponent: 'cd3njux0ukxq0baioq4azelg906x99k7f69frjwfzw45ngacfm9oekmzklbabrf09zyicut23qf248r83ykvu7lkzumh3qmsn7hfr8i5g6icjz6keekq6hgxcoll51ivzifczginlmsja3i1mnclcccewk11xabc',
                interfaceName: 'hycpyg4rwdvs1mcrb1vecykopgc4j34aiqjtbmobj2q08675zt6q05ikz2iuyijnqp62dxs77x3ao1sc0owybx9gwj2exduu1jub1u45zsgtd1fgagu4f53w23axeqqtq5j8ryuff81i3yudu66ciuuwbds800k4',
                interfaceNamespace: '57h2bcdv4944nh4l2ebsvw2yvt676wgb56ahdfwevqc2991t94f67ccp34gf9sjmbq3hzviyhwtlzy12q1p265ypx6i6lsyofjkfjpstiym8leyafclkgjpf1zfcm3q3l1z0a1dfy524hym86zp1o9msfskfofop',
                iflowName: 'r82qpg6prlpp1vmgm2gaqk1mzuzb6t7t11x6dd1rie7jpekb99wupavox3bjrwzue4dt8h8mbr02mb8ggvek0ot2e791vcxb0s6kmoimpk8r83qvk9g66pwwqa7m7esleh7cieb07gkchdb67c0530n4kn5slz8o',
                responsibleUserAccount: '6mtgns9ylqabh1mif3oz',
                lastChangeUserAccount: '29wo0q5m6t7rn9oqkm8a',
                lastChangedAt: '2020-11-05 16:10:08',
                folderPath: 'mrlpxfmskzlx25glkbv854itm8ed6ibs88jpkg3lrbv1b7b81g8xvr0mp74wr669msa5licz6xgx0858ktbxenabyf1zqmaca857t39rjdeps8i9icp6ptg8icpnp6glngj0wqz0s3j6ou7zh3hxa6g6od9o5orjsccgxtd2igovr0u37o87zc9ftol2ivneo1ig3n9xgdyqiw6yvb10h37uomg1ve2egztm9p84vledhpfg2yuirhjcifatiez',
                description: '3uldbcj1w4e09xio512rztx2ddhx7r6t75o952pzurfb6k9ozgbfigumuzslysdm3k8ir2wfgqvivu0ca9kpqtfmv1406z7k4ril59fs0w6kmz2jffg6uj62jidhy9q5yzts4b3gzcg81plpdpfmn0ng3gif3niqbandu9c7drb35fji5lm8hbc0cngbidg3x43udv8ev3r4q8dhv9y5xuupat4tiyki4v7o2nqyuvuga0ya3zy56xqiv3xuamy6',
                application: 'avrthmuyj6qrl0kzpyqng98jpqmym3glt1h3coycwgmca9vgmdxdxhbclagq',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '24ab9cfa-437b-467c-a20e-4d8316d6b28e',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowDescription is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowApplication is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b603240-1c33-4c1a-92f9-05a28a63bd88',
                hash: 'gf4gcb39wd2p40m4e8ixcbqpr1r7r1gt4odd14pp',
                tenantId: '44967159-4111-47e1-a4b8-f976d847d9ad',
                tenantCode: '0r5w91ofdexpprbe530ptghooptdmil17ki6rddbeyxrn9xxwk',
                systemId: 'c13ea897-7e81-4be9-b342-6286a6cde1a8',
                systemName: 'sttgzlr2iszry8l6w0qr',
                version: '82fhukb7jd89ff1nnga9',
                scenario: 'tw59ih3qpfq6idktsq4fxrqyruh7obtc44kqtyv6ryuemenp78w9zndxiq23',
                party: 'azen9rxqhwezzex2dc56q5fgwu68jagxk9aq11eyijjl9exghhdoar4h0sfoygdtqr7di75nvlsmaxfpcnp2ns8c4qb5pq63nz1m49k9bktugyhyxrzzslv6371hdpxocjao8xozse3fv5gos3pb3jfc44n7wpjr',
                receiverParty: 'bv7bvnuj31f8phcth20cymcnv2aa38m13yc9zifmybd3xr713e8nufkzmwc1lvasg5fzll5azss1grg0n9eow0isenf35tossxrd0m3x38a2b9mmo5onr6g6xq5dii5cx21e3gxznc4xfpemhf2is7q56ebdy0k0',
                component: '7yp8hgz66zv5qt73q13ubtqkubqattcjyr5r0l11cvcfs2ms2r0g9zjnboby4m0hbvblrt08lrjw0zaxydnt8cdl96db746y3yk05ebmb5f95zcfxma5w2878jks3d7eq6tcwkq3vx2obg8e2s8c7kfjvyvteaf5',
                receiverComponent: 'b2pavs7ac7y48fw2igi6n8uc40qkb61aekx7f1h4aapsdtm0lslshku5e1xn3glzdrl1moa2wn6dwgra05g8rafp9jrlke9ba8w9gf2f6a4dsclhi7ha9to91qusw9lmxlanabeoxd64ze2bw6b38lsw08tcll9m',
                interfaceName: 'c9erzqdfqmsiry031oatjddwji381v8bsmzh7813xyukucgnwbqurhwhcsbw8bvuzof1tjnubj6m6jnm2jf2fzn6oc2jibib4drtqwxem4qkh9fs1yxtisr8ncmefo3p1tg4fvnxr35vcvn2z9alohg7qx90bqet',
                interfaceNamespace: 'p2o0warxb6sy2c2hfsnsf99vlm9lgemfr9v8dezduenzdhnrvkh7ld7yhve9pecckhm822nj5b7vcnhxfhzzp0aivjk0cjqiz7jx3fvz5l4063rzycncndqc7ide0f5n3808l6z84a3q1765o6jt62d31std94u2',
                iflowName: '5czu2vhup0eistkzcqjjrlvaaw5sny46cvf5r1skt7c74tbpi69emu8c01sjp82wewmjf6567cim6gaidzva58b7ow216ozhvuxijl6518g0tc2eknhkyh8e8kr5s35dr6ux3cl5g2cd7qvljikvah1uyrqk2wik',
                responsibleUserAccount: '5m83nerdaq2m6jfx2vd9',
                lastChangeUserAccount: '4mh8vm5gy9v3l7z4jmet',
                lastChangedAt: '2020-11-06 01:46:55',
                folderPath: 'lsuup5wh3rusrrzkhh1mjva34d1lk3cmsas5h57f50pj8f9mt19yb49epfye0h19jov2wmqlh8xkx1lqcezpx5vfsbonoy4xkszv9u0vupdow8he8hfldb367oca384diz0j7mqjfqycg3vlq34s6tmw7ncpynadey7iutyvq5ky1bf0ins1fal9zb15kw7qj90e2kpjjsuxlmvvalejm7hzlzekgzqfwhrz38oarx3mmvxbuhnhvxujoxrb6hq',
                description: 'r7mreuju6x9hrshx00z5o4bmppwiszaugugihe6zbcxo2cpd3gyv2o7gcwuqz2v54mdrkfs271h8p7iujmxacc6zow77urjui31kbnwyxm08oqtev4y1956mab9mxlmapqlohv1meevienkelzez2bl7yp91uvlgl1xyo5hitczzbm1c5d8rlf31x4bygoe8j79od05lp7au3mjb9m0vyn1ccku0vcyhro826dff0i7oomr8zyoajxhbeq7xgsm',
                application: 'togcsa0li5ehz1mdblohnm3792phq92jivjyo1eh8fb60xig0lucgvzxgwmtu',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '24ab9cfa-437b-467c-a20e-4d8316d6b28e',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowApplication is too large, has a maximum length of 60');
            });
    });
    

    

    

    

    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowIsCritical has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b603240-1c33-4c1a-92f9-05a28a63bd88',
                hash: 'syy64j5awd55h1zif5zrr6r43ic1q54m4nr4mtle',
                tenantId: '44967159-4111-47e1-a4b8-f976d847d9ad',
                tenantCode: '2y0xg22wo48zwlpx7somdq47totzrxhl9344b6t97gb8nwgf6y',
                systemId: 'c13ea897-7e81-4be9-b342-6286a6cde1a8',
                systemName: '916ty8j9y2dwhzdzea24',
                version: 'k5tj26c9g8mjeivz377g',
                scenario: 'sgq7dafdjxqfy8k2wh56h8j2wgfic76nt361xykas8i77tfjaipi13z9hjs9',
                party: 'ggk55eolpkkab4w9hu9479xuz61g9bgh3nlmc1rq9hvc97dr6pwda2utzlzgs4160cf4adiiwjyz8ny7ydv9pznlvsepq5xzoles2ksxogroepdekbchvsysomn1e90m4lyfey4saxwnn1r523vegj3vqr2gyb8h',
                receiverParty: 'krxr5f6b6t5vyatuh3b7s3j9g1yl06jusje4hu5xnbtmh7mx77k41uy2w447qrhcsnlgqx7ioughsnrn9ltrwgw4sfn1bb3b02clw62npm5vmwv89pvm0bju0y8ir4zhsfw1i8xj4ycfremnbngjrd1ufhd59r9f',
                component: 'chtckippubamtb4qd4xtirhkjb38rkaout82s4hmfe389ni1sjggt52nh1luj2tzxf89jtkv13kaxu6uj3ao2ovidmp83va3fqm190zasliabtvs8p59wr9o7gtxl5z7lmue3lijod5khnvlz9baz7j9e8squq0u',
                receiverComponent: 'r6tsutpk9kc49gtqz0qz3ksjmpuryo5r8iw48afibqdkcc0z9lk8t6nuc2mbmux9aznafnm4b37f7eoozqalttmglu9dmbefarb34vtqil0wu22s20ekoul2mcfl98xed1mumk6qwd5jzoci5n8ddp50maodc5pv',
                interfaceName: '89nbhzspyck6tfc1jrfn9c91n9mcn4efgqhxmtjm88qxc17iz03dszbtfwmi275lsbzu5ja10p8pzr75nxufpiidhk7qw3vmn1urny9q8r5gchhhjxqs4w5ol6qz8kag3sfzss7uphouet0bqs6nzjexw71n172p',
                interfaceNamespace: 'dt28c66548u76eszhikh93o18bddfkdhq2ozaoxd799x0bluyubbdelwe11ppynzavibb9t8xwhqylfof22ji88s8lwyxruy2j68enwvo4z8jsom3p33gk8zpbknq85f6tm8d3bc4ktsnm3pmci6lm9xd7bjd9xk',
                iflowName: '99uxh0a58rkn7zxvfrxgnbokqrjvx7ck5rr4qjpljc4qzr24u0xnva5ge5vc487zl7tntp4glo1c6llgbnbpms0ljgfbab3evxo9w1tyyvjvv5u21yk31gnr3oncjba8cegk0xeqlm8v7sbrsqmpsr4w7bfzphr7',
                responsibleUserAccount: 'miypsw9katk29g58mp7a',
                lastChangeUserAccount: 'iwo8sb2j3jvwn99qpvjf',
                lastChangedAt: '2020-11-05 22:45:59',
                folderPath: '5jm2m5mshmzlb1grfkfndei3i8tv5dwo7b0tor7fxe19ij33f7npnrt07773s95zbed2afs8mwrlpiv97734uzptaefqbi3spkuwoy0cln3ut30hh59z8a6rhmmwe9kqiv3gucna3y3fvs86co0ps3y0tp0w9ubnle30wy68zbzkn2t7477s8tw6gfc0dhn0vihtuo5505vyyh2wgktkctintna335vtao9mt67t2g9hee6zd1fyucsk21c2zp3',
                description: 'btu7p57lu7wohkg39us7l630vz11yx0udhou6ekednunf4qhjzh1dpi43izne104qp6lhnc7me9gm48c9i3xfbg66hzzdftiytre8klo5brjbnuyw99u9fgk1adfybrtfnq8cktl1usl41hw67957yc1ybss8tha1ik87bkuo3cd4ijqgus5dx9cw5mb7icae3lkx02nau70gf8yb5q2z5fp7l4nduhqwpbs55lsbog0nafbrvadpgr331o6uy5',
                application: 'envk353fenihmxbukk5cg5bqf5bly1jvuh9nu5h888pdryn2nmbwxe249thr',
                isCritical: 'true',
                isComplex: false,
                fieldGroupId: '24ab9cfa-437b-467c-a20e-4d8316d6b28e',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsCritical has to be a boolean value');
            });
    });
    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowIsComplex has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b603240-1c33-4c1a-92f9-05a28a63bd88',
                hash: 'i204kxqbxojvnuhxlrjjyiibapt9hkgo6t7ebkki',
                tenantId: '44967159-4111-47e1-a4b8-f976d847d9ad',
                tenantCode: 'ylrd3imrlbokwczxtlldo0oyemeszkfrlq6ec2jg5adax3dthp',
                systemId: 'c13ea897-7e81-4be9-b342-6286a6cde1a8',
                systemName: 'usm7hqe8dqosin6hj7t1',
                version: 'lr8nhg54hcqcr1vwt6gd',
                scenario: 'lfhdif90i7chvbxwh3932bamazsgstxjhoo2fq84bk23m21mog03cfrqjskc',
                party: 'lw5nkwdmk0sm0z350m71c420ao0f1008pmttg60ram1jols2fb9wy2nl18r6ggcfxsox06wvzcm4afrf5red4ji2oa2imauh2z9j3ev3tg8pbpu2z42ewslihn1idx9c48owz1jz0a63pnizlslybg6rjmwk8mqa',
                receiverParty: 'wr2natgrsg7ylesm2tn26npk2jnn6mg98qku17e0tn0eveewq86hkru7m45pe2kmg8shxdg8ikio4i2femny07kmamjgdq5iulgr8up7k3c44uh4omn8yvumosnpo6iqhz8g9qhiv51ghjrxb350h6waqvz9wtmf',
                component: 'jt73awycb31wbcv08g4bnih0omeqn8njrkqrqigcwq2m3hmi49ylv5mwrc39h26tj8e90fzk7jktz8mugw9cj6al3vx8qkb7x7o89hhahi9jmrlf5ombqlp5gz861cr39820xomulsuw4zvbmckzhd9f6ui23rkj',
                receiverComponent: 'gwrkbchtgcobqpc01q4up8cvxnm4gd8riwelrqh5v9krma2ruq0kmhozz6omynngw60a4iroiju3y4hwcvn29q02ghq3gg3h95xh0gxl7ipa4nsn3ryieoislbevj5taomvfe09mleuoussqne3k3vpcl9mitfsf',
                interfaceName: 'a3tatxwnxi20ttfzce50u85n59ar2n2rut11v9rs5wguy27b17bhmk0wzv6tgypk2auewyum2v9llidt2hwm0jgr2ysacgpiuxcncdxmpym75gk8d52cbx2r3jw6vmayd9nijj5p6e01b8g0yxjlappt6i6pmhs4',
                interfaceNamespace: 'k5p53iqt1f50mn6krc760zico74f8iwb26j4w788c0gz1g32th3qwyf21uvjjiamnmjwvyifp817tyaxxx4u66ftk3esaji05q7jbo4b75hwdndhb7e06mcb7i2lx1begqyeba4v8n1dryyk1m66gkeai92maa9f',
                iflowName: 'xy3u56918eraxru6vazqfbejcktbo4pexol1dsm5vt8pwdl223x10bmmc5g4quaw01ufv1848237i0gwbx2r290igpj6bv4s5e8ozv550n0y1rjb9dr7t1qj6l4pn1rc5syvc8n9a218w2nvegm1hks8e4ivb8iv',
                responsibleUserAccount: 'ome36jonhs68vjzirbgf',
                lastChangeUserAccount: '0wrj73pmevwfzn4x1fvh',
                lastChangedAt: '2020-11-06 04:07:06',
                folderPath: 'ed1yqjarsufv0a8joothiwhfdxmtm9fp3jz0gjnthqnpcymtph866fdff6xc4rzn2dwj5zkv0seocz72lffdh4h0ul8myujidwnsgynn6ckyjr4tarylcivw6711tmp0ueqrcxowaq7hg1jsxyjcia8d2aerymcuogqzv19d2gg3958dnpcnnqs0p3coa146s518efvcice6oavvyi8fb99mzxxmgnouofcgu0o5eppz6hrmk7898wjj5su7rbi',
                description: 'u4z0f79wqq2fwak9vy5qtfrme8gw4n2yvt1cgd0fjnajijhlxao7x6xihy36z8fph65inl0suwtttanf12874yjq8lnjjvok9c5hhk8fwwyiingq76iw0dk9aw627trakbp3dwyicghakyhh5qhjyz3soohl1z5hqdmw5vpiajxydickhbk493l5h2m6vp17aw80qyxprpouioph8uf2yhwf9fv9v6y3fj4gr7fxbhsgqgw6d6rw6js4j0qi326',
                application: '67tljf43m12m33pjxy7wc7y2ouwxfxex0m9qhmywr42schtbaf4k6xeti2mr',
                isCritical: true,
                isComplex: 'true',
                fieldGroupId: '24ab9cfa-437b-467c-a20e-4d8316d6b28e',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsComplex has to be a boolean value');
            });
    });
    

    

    
    test(`/REST:POST cci/flow - Got 400 Conflict, FlowLastChangedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b603240-1c33-4c1a-92f9-05a28a63bd88',
                hash: 'v44bz9dau2o9k1g53xdf9nbjdpdjw6widdhfhfki',
                tenantId: '44967159-4111-47e1-a4b8-f976d847d9ad',
                tenantCode: 'gab3gfvwybwwsfc1iygfip00eyvgiy50t5st1mh72k45dt6q8j',
                systemId: 'c13ea897-7e81-4be9-b342-6286a6cde1a8',
                systemName: 'hdhbcog89ozw0kcvfyr3',
                version: 'zi7aycwc7iishv82cbe7',
                scenario: '61sivy8pmay1grs4l0nm2nmexssqu67n384m3ss4itk7jz1xe4sivt4r72sv',
                party: '2g0xl3iuigxme4v6ls39j5vqqe8hod2vx0dnvf76fimzeodpletcphpyqvfw6ruvoy2yzz2qpwqgtzyz3mvvwisss4vb1c1p1a186y2v1540nchdde8m4hg4rv8hfbudq44u2za0kie4lt6ykyaazka7y1dd3dhm',
                receiverParty: 'brl8yw4gdfi84aztrqc8k9oah6aqn24tf40p70vwtm8ec5jl9kk96b2h4180x2mgyyw5vmanybf8i564di8dd2xw7hhhs2dqg5jxop9pcvclf0ql3dcl76eamzh8osb5lsaiwyvu1bkkqf13c2jm7ifjflrlv2ux',
                component: 'n1ywxnbwrvcsg08cfuuf3lm58jl6s5fjxyvhhrlwrdaqk0weqane2d200w9uj88u0qa7k35l85p6xfyaafy85vaqjkbbl7hf1kae4jzescwqgl93ob0xynwbk53bi7my4qawcxnhtsr7uxk7g63iy6ozcc7mnpcv',
                receiverComponent: 'q0i35pe2vpufywo8c4uqkf18m1giidmwwa7ajko9eepnuu0sdfhlhzj6mbxnxpcdroo6dtapasfmciawat0xqvyk88zm26vkb4ppm5ku7x1w5v61i7vl76u2pc6lt0llwf5d2fcqaq75a73sewz1mh21wvfw9u3w',
                interfaceName: 'ws91e1ou8544ot4ajtgt5o48s3q8kawtit4fu7mz588qtsvaes1nnatn8pzq4c6uvjdc5zh1mtzlixvs1j7iqsc4wi3ks9l0wfudwajfu2scj86yztu1tt16g4ipq5gojt1l06lrj8mf3tlaoaej5e9zn9d4wybq',
                interfaceNamespace: '36eey8oipe4aa03jljsdbq2vyip1lpicih4pg6yt0x9if4rip0gzatdod521xjjofkv660g70iv207po64h9nkmtsort2sv89taofs7ygwj46nm0yo5coum3bhgpv8pyzbzx72df8jgbj768he9so4gp4uw6zlw8',
                iflowName: 'gaqhadg4drujk8vpi8zac8ro3dwxy985lq20kimc2d8nhs725l65l9ck2zvmhmlps8qu0aoujrn13k8u68kejur6zr3g1i10huh81ta6ec758d6w3wcnch5gzc0obzr5wjh4gd1prl4mvutinzheb8tktd9c5vws',
                responsibleUserAccount: 'jmky949f33fuzm8svg1g',
                lastChangeUserAccount: 'lirif4rf3af2lkuqtke3',
                lastChangedAt: 'XXXXXXXX',
                folderPath: 'nkt037a2xujkucmjfson7s526r7kl2qu6q4kzahvw2axst8n27zylugcssac9gr5dd3te1qkjznxgnlj8pvipyim2ap71vaxd21v9h2r9is7hyli3yk12q4ghnen4qofqu8vlm5rpke2d9bjs3larxgrrpjb2vx1cuwwxlj9fn8m9y1bm3lq27tc63n3fvfoihv7urhzbj3ele60syz1yegv6j85nz9w0q0qwrcypp6fwo9y22b2g130xw9k8ze',
                description: 'qlrz32q1n9oqkt13smspz7xm6demwkj2ihlebxox58nh0anap90w1hw3a44u1v3lggoefbe02lwyfvgk7j66h5r1uq4zxtof5zslfwit6w2v72mhznme7ufzmlbmjvd0jyuiz3wge0be55uh9c9yy59j8ng4fn73fw9nki1x5tfv6dy3gth7zwte1g6aehzkg0kiaqj2fy7c3vojt5txobyqeiprtizslfge1zfleuyogvqtetp4gsdpckzerom',
                application: 'ypl5yxezez615mq4i10axxlyulkw026s7kil3m5cj1ksud1i8u9rmrwt7eh7',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '24ab9cfa-437b-467c-a20e-4d8316d6b28e',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowLastChangedAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST cci/flow`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9b603240-1c33-4c1a-92f9-05a28a63bd88',
                hash: 'b53xeriavdwoscwy7mhxihx6ktvoypr8214lgfyf',
                tenantId: '44967159-4111-47e1-a4b8-f976d847d9ad',
                tenantCode: 'snrtoodopz56mui0tosy70ruilajxw1u1atdfbsojzkcudoq6c',
                systemId: 'c13ea897-7e81-4be9-b342-6286a6cde1a8',
                systemName: '3ijz4svv1xf1f8waaxfv',
                version: 'pnrzzghct82caxr93ugn',
                scenario: 'zwyllz2fpcrbv7r2res0p9ebpoggl6go7phocg38jxmmbkvg3el8x4vvdb96',
                party: 'fdrd5lrgxa5b9taybyzw6bpqoobigzg8yy2y225bi1dfu2cgj6cf5fwvlyknofwoe2qzykhk09aqavb7pur7wptr7ar2q6hwsde43qhlqyrgrhsambbrls491qgj5kaf5b508pscx6j64lwd9v6sdqxwfql1uxfg',
                receiverParty: 't99bmogmaxdcbchef5g07deehsrpg45ay7qlf7hx3n2wbnak53dtfasoy06eicoe85l409c0gw4pu0s12cpli5l3czwdaw0deq2b47ffaxq8cf7lxzfucee46xqilielis6mou3av4t08xfgt3hem53kkctti3n5',
                component: 'bgn5fvszd9rz5rrpgn6rjqhjzesmy8tcvrxe2ilbmg5x8uq3n5dtzm3z2c0plizn39iq64zrr2qnv7ad672ax461qelqpp6iwas15f7bki0kyomriv5ckj18sn5rra2wlb4iz6mv0dj7hfpk66bopm6rmndeh4e1',
                receiverComponent: '73sh78sn3bixije59392d4u7cijsiq220nny17ipkhvu8fr7vewl1l362lccy2t3h28z5roq4z2tjy4gb7w5rtixltuuft2ryppz308v49k0gyr7ci6dkqn5q66mtilln1ppts66wl06bj4kky9dyixrcs55crh0',
                interfaceName: 'zq041ki1h5alym01jlkzo6s97e65b4l2tot3oasza6kpc1c2f05wluqpdrxpnglu2kaz9q06um9s22sfc5276fdu3go7tydjdpl2ov4zpmyp8kil2c2qez8kaex70u48f8117midjq1k8yxy1hh1j7kgzu1s3xhf',
                interfaceNamespace: '0shkefhqdvmtaz947qrifqd7l30jb1wqhzohh7fn5soard8tzzy62l377ccrslnemf30li1qf1mgomu7pz23nbv7dvbrlip0hevk38z1in8kmj8ntqydqz2uuowb305qcdqaoopqr5y02kp2rcnl6zof2jfutvun',
                iflowName: 's67u6tb2en2sp2jkr9deaz0oc14w2exbpqytg94mtulamv8forsgpfydua98e0bcgjgrvbyvf9uvfodjh6xk4jct6gy5gkafctrkg0xlmpdbnv7slxboczfpze43hst9pqlskocxg3vrybjyz6jnz9mnqpqjikej',
                responsibleUserAccount: 'emuywqrugttuf8mrhn59',
                lastChangeUserAccount: 'la1eqa6wb9tmu86rwat8',
                lastChangedAt: '2020-11-06 01:13:08',
                folderPath: 'cdfhsvtfmxdf1ge9uwau2japw6yjbnlhwmjlj0vvzim0v9hrgu00rsati5f6x9878erbtqfeyehdz8yz71cdbx2fcgf191264erji5l8912lgxkyxxw8dm4hasb1o6a1fabp2olq7s1wimz8adoewu3woa8yl12bjq42og1r8kkqzbvscdynq43wyz72jov3zvcn12kps05s7q6llslyqrzbnqmfsijrnf205qh6t8euxwf7pn2it4en7pbzp09',
                description: '4owxlkg151k42ymbj5pz1eo8uaeakh09sk3m90anae5rfghwl0vcugjmpmj384cjo6zqix5oeyt5s6mhtjqo1ziqsczbt7xzb3d8umviut2srqsnts9a936k253ygxk2m2gwinoughdqyssmcj9glespw1ks66eoi25t8sv3qg03ukla04eef0xytpv6awxjko3601iklf9uhoe6rggjnapcosjzyes33y95zmgh2ni0nznpdg2wae2i8i67lbp',
                application: '2wfvesgj4h3ipx4zz82lvpqo9u9yk56nra82izif49xmujml1t3m4e7enzoo',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '24ab9cfa-437b-467c-a20e-4d8316d6b28e',
                data: { "foo" : "bar" },
            })
            .expect(201);
    });

    test(`/REST:GET cci/flows/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/flows/paginate')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    offset: 0,
                    limit: 5
                }
            })
            .expect(200)
            .expect({ 
                total   : repository.collectionResponse.length, 
                count   : repository.collectionResponse.length, 
                rows    : repository.collectionResponse.slice(0, 5)
            });
    });

    test(`/REST:GET cci/flow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'a5920c85-8f79-45b1-b251-7a41c9998c47'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET cci/flow`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '9b603240-1c33-4c1a-92f9-05a28a63bd88'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '9b603240-1c33-4c1a-92f9-05a28a63bd88'));
    });

    test(`/REST:GET cci/flow/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/flow/7d9905b6-747c-4327-be8e-ecc3394c3aba')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/flow/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/flow/9b603240-1c33-4c1a-92f9-05a28a63bd88')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '9b603240-1c33-4c1a-92f9-05a28a63bd88'));
    });

    test(`/REST:GET cci/flows`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/flows')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT cci/flow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                
                id: '5c23ff8f-3e99-4c18-b7de-bb6f6a45da11',
                hash: '8i3gzu26rvq4poqfa6pk6tq976m13rsc315pb2qj',
                tenantId: 'f4a3ec49-50f6-47c1-9772-117244c18905',
                tenantCode: 'b3x6dv8qj3angxxvhqismfgo8sc8ietcl1aj6e54yy0vj414zu',
                systemId: '0e049b6d-e05b-4a29-be68-5fd3ce0ef683',
                systemName: '58k1t5qrq92k1rj5uwyo',
                version: 'eco3wketwq2tygt9wg5e',
                scenario: '433a8on8rknz9qyufqyhmu7xatnkbohe6up43n8b1j4rggwl7bhf2asnwvde',
                party: 'jzojsde91cuq1updteoavxapja0zvsvpx47viczdkc6wwltzret671w72pf8x3ch0gi5xn21x7j8q19j87p39ddcubfwmsqf8ww3xnspwwws4s15dxbyu323pphl1u0edt599lmlq3vy6x5syy7pody4fwvm5joh',
                receiverParty: 'bc74apw77py1k4tioz6xuzyfq0gf885e0s0ecnfld01fvfm1col5ek6r9z1k4kasbjn8xfv9e629wfnahwt7eadmtiy4gpj6aepub0k8eld19i3366utpks8fkxytmblcaesaesgbcbkl0hxkrniktb43k3pc300',
                component: '7k0t7xo56eatism5d7nkv59gngr1rnd26aq71jgmebp60o1xuzoh8x627o4e9rvpmamlmitd13avf5kxgfwazznbd7uu76ounl58dqvxuve3qft4g2bz00j2tzy7eenuhl2e57vycwighvu3gqfi3pxml0eerrre',
                receiverComponent: 'wjovljdq6auefjc21zooue79bd4x9xquyc35tkbwv6fwbs9ch61epmsfz948hcmobofztcjo5anb4j0bj8necr62l5okgegmoqw8nefj6ybphyfopeyjs2s5txg75o1l7qin5x1tepou9qnq64rpmkbiywewpfu7',
                interfaceName: 'ptepiqoxr0708sgqzlrijyaea10qetnjczgomstdb0dz5hrfyhtqjoqqvky850x8qc0t9dkp37qwyl95g16wo920pivykqf57vjwe8j3qrhitzbjq3sv2xanidsxi4sj3mcuvh2k2tzs988ul5kwo8e3f8a9ha4l',
                interfaceNamespace: '1zp9nqnt0gp31yfibaish1ia4gjbm69dsez0rhn98mcsurea59qsag04ctcnh5lf8emko3umnskebtpqui6yeiyqa8jwbw9nbe8gvo4qyq5kcwob9p13aqyoeewgciszppj5edo5oltx3rtlb0i1g3uvn16c7sip',
                iflowName: 'wn5nefcnibh5roep04iogk71k5an8wn9e6zogk36ky8hcm4aegs04w20wm465dz7cqod8acj6j6o5ualp3fws8rq91esya9404exe20feu9zbekxl3yrddkm18kt8s3l2sni36fogowk9uu3h71w1jibx9ax0j23',
                responsibleUserAccount: '9bc0tpfol4utzl2f4hat',
                lastChangeUserAccount: 'hmsk9p60lwaok5aa60qb',
                lastChangedAt: '2020-11-06 08:05:36',
                folderPath: 'a3i06yv33v4m8p7nszr45f5v2sgilf1k3o2a74kfmmulr9xur5jmrnnlorn7a4bwhbbmnrjom3aa5253sr23lufy4zbvw6gdebmajojnstvtijl1gk82ez80uhby08kdpiefwlw1dat45o2abi7nfigcp4zyskaa046fef0nplsq0ctt17k6w1n6uwmnoi15etozgllncyv2gnyzdnl1wnm3o36dy66yb3mkoodra1z2lq7c8r6p7wai172sifd',
                description: '7pxdz66au9ouuaehedw3ihg7zt4ehsc1a7qb2l6wjxkd5otq45479btx28nlvrw0iceoududniud86bpfmci4ynmkdue1amqr67kk7j3use2k40yld2avie9n05zltu0frepgs3xr7hlf1xailuy61j9130cz1v0sma0rijx9sz7001vjc8ipom6lguepcoxv800v1ncld7atowjor3jfe9njcf4uedmtq86q4bvz488i1ynjy2i80k0cazgu1q',
                application: '4lq9ykn7xeel2w53l64jfoprwz2djimcosepp5uh1r5q8aqbufmon6fkse30',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '918a5086-2201-4d64-8861-936e43652581',
                data: { "foo" : "bar" },
            })
            .expect(404);
    });

    test(`/REST:PUT cci/flow`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/flow')
            .set('Accept', 'application/json')
            .send({
                
                id: '9b603240-1c33-4c1a-92f9-05a28a63bd88',
                hash: 'urlxnh5ras84g0rjo25f440dr0iwo0xep6eihpp6',
                tenantId: '44967159-4111-47e1-a4b8-f976d847d9ad',
                tenantCode: 'jhpq1oj99yb43vrdcgvhf9lhm0kw0ad83bsmmprbkthkbddqi3',
                systemId: 'c13ea897-7e81-4be9-b342-6286a6cde1a8',
                systemName: 'svdxmkgl8cgkb15bg4bg',
                version: '2u2finjepqy4qq1mi60v',
                scenario: 'fp47z9om9i6vzflxaqcvbcblvskifutlf5ltuen32g8fb2znmnkd1spkd0hb',
                party: 'jwwnva4107dd3v35k53j4tr49iavh5rg2j0gkbm9q033uur09iwm1xqmw4b1zhbf5ipr6ybq57k9uzdt05f9yek80h53dga9j6ktmcggwioe6mkjzrajwvv8bchke2vgr2gygamtzgd68q5dzbvw84ejadlqw5kf',
                receiverParty: 'hzz40yt6ktvtszvhddq7lh393b94i9g618nuh147katlmnk6dinyclydru3j5mawk9i9n50f7jj5n9140ymq8dt4xfws1ynxevdu0hkvs5pirv751u1o3ilec8e03y47t52tgg2s0ge4zkpqjil1x7tbtt4z9ydo',
                component: 'xe1236v7kvuooqjkp21kklj9sqp3wxw7n24gokd36270e08dovu6139lj877lty2718w5yepi35881n95vgfmdj1aukroh3ffxve5l30f9do49vq1b33ixlxoroa8w9swnynt41iut4cg26s03prg9seta4oafr0',
                receiverComponent: 'titbw9dx18geuqtebzm0k7kljb7d1zj5uwo3rueeqm7b1l8cp7w18o2ymqbq66k2fhzaikmansmc8tohqb2m12xja7qi3lytnxxkji5qinddyy05mmkcpz6q4n5nqpcztr3zzmxtdx8iwjkai5ou92h5z5ckdnd3',
                interfaceName: '2j2rl32h12rab9gqxr40qdlscrjrtzmsqyntmbmne53ablp7cm3z9b7agfl6mjjnyjjk8tvxf0v3hghr4s006hz1jgr4cboctx53sx5al3cuy1g2vjic6hfl8sjhoxozufodmo9zl97buv75ti8qqzba524s8bgc',
                interfaceNamespace: '97jj67nwzupx4bo4xuj28fgs0jqveantz6hlzp0sc5oi4t53w5a2tc10l07ammo6u4syxj5s40769r5hkihri9kuvi6r5l18uhn2gml8ttil33g16ag1vbh8dw9ge6tkrxv71ez1rlkuanc55qk5mahyr9ps69h0',
                iflowName: 'yx4rfwr4skk6sdkh57gzqe24fpix3bqpy7bfi7zi29bjbs6zv05sceollr71fvrgi2g86h2b35e2a73a0jjbo0s2vjmubip55k9o3tgukhsefnmvwma8pwsghbzl3g2bj3nypei9tokqx2q2x94krbi504n3nwib',
                responsibleUserAccount: 'h197bj1pj7rlx2aio6wp',
                lastChangeUserAccount: 'pbt1fbwdz247fkburaua',
                lastChangedAt: '2020-11-05 19:05:52',
                folderPath: '2823huk9xie5emxvznaivkepvrhq82hyd208lme1zzbrv97ilgzdr2pl88ztzzlmwgw7k5un9iu03trmvz3l7zfq9l4qsmftp4ks7y0i7mt6wb0v8m6gdldr6wadoqnhcimiatj2ng5o74qpy7h9tcbjn9ce0niu5rw4zqvdooi2iumodxaxbhsz390pvlpubw1veymnezv6w6vjd3414x12rx5viigatgil0n1eml6fwtwokosy7vzu60do0qf',
                description: 'sv93arhcvqe4enzsxk6ram1hskt7swv8akyo2wypu145njgo389h5r7wdhkdbg76e8o462dbhj4f9q69wvceh5q35leb29qkd4sy6jvdcymehublgfqavu67ukt3oars70mzsgvoumbfsedzavg4ps71pmcsgkjtjbabrhgk08r73dfma61b9hjm9866x879mz38reve92cu9slkav0kl4n6uny7vyxhojt923li3vg4btfektww8a91mullb23',
                application: '198soxyu08kenv83ciikqtnxhun1jdhkzwik0npo8oi7gsss753f9eokr4mp',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '24ab9cfa-437b-467c-a20e-4d8316d6b28e',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '9b603240-1c33-4c1a-92f9-05a28a63bd88'));
    });

    test(`/REST:DELETE cci/flow/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/flow/47de9f46-cdcc-4b0f-8b33-d2a0ec4344ed')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/flow/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/flow/9b603240-1c33-4c1a-92f9-05a28a63bd88')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL cciCreateFlow - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateFlowInput!)
                    {
                        cciCreateFlow (payload:$payload)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            version
                            scenario
                            party
                            receiverParty
                            component
                            receiverComponent
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: 
                {
                    payload: _.omit(repository.collectionResponse[0], ['createdAt','updatedAt','deletedAt'])
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(409);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('already exist in database');
            });
    });

    test(`/GraphQL cciCreateFlow`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateFlowInput!)
                    {
                        cciCreateFlow (payload:$payload)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            version
                            scenario
                            party
                            receiverParty
                            component
                            receiverComponent
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '8115a3d8-f686-4ec5-9b2f-4530794a711c',
                        hash: 'cigqrgf84abvsnf3fmkws6l359jfa5d6vcwkey30',
                        tenantId: '44967159-4111-47e1-a4b8-f976d847d9ad',
                        tenantCode: 'dmvzs6i3e40vwzzaptip6tdp2uxzutvj2u10v7c7bw2g9btoa3',
                        systemId: 'c13ea897-7e81-4be9-b342-6286a6cde1a8',
                        systemName: '0sdx9q3kgacwbsbvudse',
                        version: 'fsfsi019ckzcg2rdzk7g',
                        scenario: 'zmg3flaaikrnvge18rnzt5eyukv2d3phf9qiqnqb19pow0dleqzfsp00pa9g',
                        party: 'icljt7r4ezggpxpqrqhbu6bj33b1k64g263zluhyly9llo4q31ut7medf6801wuuj3ki7g6qzifvkh877mcuvsxuff6fbnvaobp545k5qwpszuv6qp802gw1upqtylcl84bz4maat2gite9jlgi0ryjfbzmc2r6e',
                        receiverParty: 'uxz3pnjy7dcyfn7kx7e7yivi4sq80ba76ezh64g4hhis537iyws7rbktdk5t4pxq9ypiy74hi4vgdhv89ohtr68j0sbg5rdx152mqsazzv2k89y66i4zn6kxgn2nqhrjfsnp4e9hbih15pb0qq0gh2odscb65t1j',
                        component: 't9xaqvkiliihzc2x1a19j3u3po5bhgq2qc82l7lucxoijx7xheesx3xk8o12hy373hsrsh6e4xnc2rtrs6ogbid15eyge1e4ks5e2olcknfmhtfijogg9qp0qneurh6nwp8t4t3pj2684u1hv75ddc70xmbv46vy',
                        receiverComponent: '0q0tch9cw29c3z8wsflki67r3r84s4obko84jkpy5x6pj1nodm2xpcwy9prwviqkszh2ybwj9vnaxautw7jf95e9oj1vedzogpctlawtea9ei7ed4f034ibgl1gf3wtwd8o4l8m5t7pgnyr4tqgyn3rtdydhnwlr',
                        interfaceName: '7irtzmah0ydr7u0nxoj896b66o8uzaui1n3rxqcllmfvm9zj4bjisczsnyhojmzi8sartjkf0kn02a1yr1drcz8f8glqs3cb478rrd8qf2k2tija5nrac2xh3c7j9l9ec6etayl0ef5kpk5dvgpscuzjc2fo5odb',
                        interfaceNamespace: 'ribwzw22nhnnsoe3rrdnqcouqxfmp53i2ekxbm7pnfwvsljp520slmqtmpc9oqf5k0qad4tztoh8j2g2l2psf5gosfuio8c1ojb8ud5rpel72valo6tn28bbwcfd555ex2wi6koqkr8r8h1rgqqex4owfdrb8gok',
                        iflowName: 'y3oo72kvmwunlnaehn3lbaemvogewck92zhxdalpjqeb745f32331cm40io58qs1mtoh18l1zkfd04bil4jt973vdt4xgw7wgrdpobzqx4vuun3jc6f7o2yf3x0sob57z5to2i61tc4bffa4llixpzmkl9njufsv',
                        responsibleUserAccount: 'w7n8sdvxe5xn6gurn2q1',
                        lastChangeUserAccount: 'su09284bp9ll6t2ja9ic',
                        lastChangedAt: '2020-11-05 20:38:47',
                        folderPath: 'foprepnvs2q5r7iquj5bslkc7q5yudenqolnc11709kf1kjqjwzd4xt8t6ctdv810qgao3v0998vsp7thudcraxkxu16n69iawi6o5kvyqqvez5bi72yz3msvx8746oyxzw91gms2dk2oqrfbpzdsy4as28rkchcshb8fkj8fav9d6wp8ra680ew8kgt3o5g2q52gqr8njptlcmspjk63xe5f1rgxhim69qgnj0u549106qezdwb3bosmy54zyp',
                        description: 'mblc9heptmrd0ahrl1u1a7mlesq5xl1fneygsvdh2ania2t9pa3923f4qdrp4rvinvk0n69bb74jymju7jnz5sahvfsuxiocipmjgw69kz12e0363pincws4z3a3krecmegvbi3nonk260mp64ij7747v6izdq8g80mi5hle1e216f0odzroaubhcmzkdhojzoadaox6dl1d99vzqlt1tatju30z2xlt8s26gc8dgd89xjfa16piizgqc8woygq',
                        application: '26zk4asfnef8posi559jb31omsbga2c3bnhrwma7nmp585ox0eet389mqodj',
                        isCritical: true,
                        isComplex: false,
                        fieldGroupId: '24ab9cfa-437b-467c-a20e-4d8316d6b28e',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateFlow).toHaveProperty('id', '8115a3d8-f686-4ec5-9b2f-4530794a711c');
            });
    });

    test(`/GraphQL cciPaginateFlows`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        cciPaginateFlows (query:$query constraint:$constraint)
                        {   
                            total
                            count
                            rows
                        }
                    }
                `,
                variables: 
                {
                    query: 
                    {
                        offset: 0,
                        limit: 5
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciPaginateFlows.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateFlows.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateFlows.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciFindFlow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindFlow (query:$query)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            version
                            scenario
                            party
                            receiverParty
                            component
                            receiverComponent
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: '69438e68-831d-44b4-8032-f9d1527b662d'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindFlow`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindFlow (query:$query)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            version
                            scenario
                            party
                            receiverParty
                            component
                            receiverComponent
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: '9b603240-1c33-4c1a-92f9-05a28a63bd88'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindFlow.id).toStrictEqual('9b603240-1c33-4c1a-92f9-05a28a63bd88');
            });
    });

    test(`/GraphQL cciFindFlowById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindFlowById (id:$id)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            version
                            scenario
                            party
                            receiverParty
                            component
                            receiverComponent
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '4d73969e-e1cb-4084-ab6c-321f9f0683ff'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindFlowById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindFlowById (id:$id)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            version
                            scenario
                            party
                            receiverParty
                            component
                            receiverComponent
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '9b603240-1c33-4c1a-92f9-05a28a63bd88'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindFlowById.id).toStrictEqual('9b603240-1c33-4c1a-92f9-05a28a63bd88');
            });
    });

    test(`/GraphQL cciGetFlows`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciGetFlows (query:$query)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            version
                            scenario
                            party
                            receiverParty
                            component
                            receiverComponent
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.cciGetFlows.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciUpdateFlow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateFlowInput!)
                    {
                        cciUpdateFlow (payload:$payload)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            version
                            scenario
                            party
                            receiverParty
                            component
                            receiverComponent
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '2935d4d3-b630-4a7f-a910-a1d7a2eea1bc',
                        hash: '20eatijqumc5w70e9kqb531ke9nv4lsuvjxsamkd',
                        tenantId: 'bd335aa2-3a5c-4f9f-9984-82c4b18dc62d',
                        tenantCode: '1ejt0668om0t39e7ktahqfnhbcpg0wsagrnwi5rsnugdqixm59',
                        systemId: '0d618447-b43f-4f62-bc51-95edcf470ba5',
                        systemName: 'nbmqcd2sts5w5xfe52ct',
                        version: 'juztbysu5hv86l7ap2eo',
                        scenario: 'q2kxy9ufxw9kqpcietxt0owqmdyemyl0qcppduucsertn37zc3u5d9j9d4au',
                        party: 'l83z03oh77imo8bjheaovh5alani21qtiqw59vyut4iordirzj3r1w6j7mn77wxfsi2b1pokx7bxlz2xkun1b1fshkb2g68sk44wp72spisoz5ubet0tkwlt3bn5tddsmjl7l1kevxxf0lqcci5vlmicmnc285py',
                        receiverParty: '08lebcguymtx0k9pvlb49im912otbsrhp02bltjoixquoxqldotd9tlre6vblnz8zh5o2lr6nppfmxo0gvh3o98mx5v782gjzabrwpvngn9u0l63wf7unbax5rzdxclqm76j1lx2w0eq4ijd7hxn6iflhnh402nw',
                        component: 'hohpf4fm4of7mav1z8waurxw8okn57ubfhm52fm9100r7i9sys6gck9v12iqw6upar6j5rceyq5co4ufal4k9b9axsvubboz3aub5zjs7t5mtpydab3r4aslhdywdr10ewvplv9ly6o7pbm0psrzoag30kx4mbr0',
                        receiverComponent: 't1099jgy2665fe0z0wk7oemh1b2q3pbuefs1jeja5qy5885dxw7h2npwlzsipyu4t2cahde7mqxchpeeedv4tsc9fhsd3tmw0wmy3104yfw664ft7hcw7kkgrghi53ugzsjvr6al74d6fui7lzww927791kugaig',
                        interfaceName: 'atqbe5q0rkey6732qxvy2oeqnhq5jebwa7ftpddw5bhaylqtrudemq4qvlgpt268ct6m8udr9rqjuytdv24g15cab243ra2t7l81gm9zd9733rk9p15xagx6euz3gin6skjkt48hpbw4b8zp9c2u1t3yxit0ojm2',
                        interfaceNamespace: '9v6wh0fg0odcrnhp7yxe3x9pqim9bb9eqnegvgr5zfmb1krotqlee2wweji7g6dwdbhfb4uewbwucrjc9pta640ty7usz62jlu9qvrugoejphy7sohn78sfk5hsg74qhhhqysti7qkjokqbq5t5ajy8fy5cfxhbh',
                        iflowName: 'c1wiosjwb4g8wers1zjfa2outk5x0fx3r5c24kglqaban1qs2jxmtdc5ob9k7i48wg9a23hm2rl9797uhynpcz3h9t3r7dsdgxctcwxg9vg69uxtgnqw2n7z8ie9cup7zbi3e7htpkb1g7l54xkenueiatzhj6io',
                        responsibleUserAccount: 'qi6je5oxismsq1v951au',
                        lastChangeUserAccount: 'ess933m8qwdwvh5zv6qa',
                        lastChangedAt: '2020-11-05 23:23:33',
                        folderPath: '44dywobpokawde442ww6pz6w51mczzlr2uj08mm9vo9hx6igu8ymy9i8qs9wloj4k2enym1wq1037vshjuvhosjlc9ax67528kk0m97leccqqi1a9hhkh7c6eteu2b2x7zkpedb804y2rqhqvxj73mh1x2jna2ikn04c8qgh0ktfyh3scm9t3jfo8tf4tbcsa9gl6e9h46234e5l7soshvyntpig4ntjxem95qfnk2rolrz3pkk042di262jvpk',
                        description: 'bvos33nkdwu8etjjvew0ol7vy7xfmpcsfojiay2x5ix1wqznwz16257crb8xudei9jpy0i805blia35v2ewlzxlyk3ddzl53nuy6bdqkey2zaqf6l161xmmy2tfod6as5bdkoukg16qpqnqsk1tfu4oqea429cbbb6hihkjt89em3tnlrxnu9ha4k2cg8zqy71od66qymgv0qj5n5t5s5uzl2il60rh3d8820u8m7kmme7ky9z9tgadmnc3fj1x',
                        application: 'j57f3al11qwfmddek9yxnz9xhgpgbx19q38u3lczv3ph83kbre4bq468vvtu',
                        isCritical: true,
                        isComplex: true,
                        fieldGroupId: '0338538c-d0ae-4324-8424-70dcacaf1d96',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciUpdateFlow`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateFlowInput!)
                    {
                        cciUpdateFlow (payload:$payload)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            version
                            scenario
                            party
                            receiverParty
                            component
                            receiverComponent
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '9b603240-1c33-4c1a-92f9-05a28a63bd88',
                        hash: 'zuxccbq7sv56ulwczddtaqg2xlpb8u3nc9gb1r3p',
                        tenantId: '44967159-4111-47e1-a4b8-f976d847d9ad',
                        tenantCode: 'baaahas0qs01vnpp0i75uoba975f57pmpd458sybdik6qog48b',
                        systemId: 'c13ea897-7e81-4be9-b342-6286a6cde1a8',
                        systemName: 's8er9msavgd2wszmpenp',
                        version: 'mnx9cnp0osrwos10iwg3',
                        scenario: 'jrtpohuolfghj3qc3e87yuf53z1o1dtvwx2t2ni8it7ocsk9vp6yoewosbyj',
                        party: 'exontsvgpv73enorrilum3u30zibf2zz7rv78fd1o25anz0ii0zi7tq2ho4ks6ckvql0lpv35ekl934a5qwz4q2gt3w0y4613mtwwxgty3gyzknxcp0btppmtinqh480nsyago8dznc4c368tnbocvqinecbwyuu',
                        receiverParty: 'x6fk1s9sn9wg7y6wkznqcdscda63ykwxe0ikdx5hzfg5ofnacejtuhaa5zsfdtr4pwk0gjsb8dsqdpph760fun16s4gscxi9mgut76kslx4nlhrimf7yi15fash6lwza80o9thfc9fkh5j1kt8axw13rodamg8xv',
                        component: 'me0do2njpzqnvaidq3popw5mlpkgta55pmy0rqpqu5gn3u7zv4zt2ac834qkzje08byq41ueu3mb2n01a8glt4o8wjzypmc52qontui3u79o5je627ursqpcsw1ngt3o1jvn8aoq8m864ekb8b9cnxf1he2gfqgg',
                        receiverComponent: 'v50a0jui12h0iu9bblubw6d705at3gdqyk60d5do3bxg4ufvpbk1fo0jhvpn89krauqv54zho404clcpwy4k7d9ebbhxa3j1q3xl3ma01k3684ijybu6t3z7tglwtdjzbwo2s38hh4vui4cxdzfufdkwlt3zwun9',
                        interfaceName: 'gcyr2ci08ae2twi50vq1crlvmckmnl93gvi7n0j5pzse01h10f4sp23amwq5908356z6c3imu23a9biwren0p9n5jh4wvjyf2to5nfwxvs0sda5jkw7q38aj8w06nf18omb5ipqdikecuuy7m6g0h30qwj9q74af',
                        interfaceNamespace: 'nj4lv3vp3rnvltkmn5o7nvfvblcbh8v0qc1x56nuvkb3qha0na83blfsi1j0onmjcdmcyheo5tjyh409sm5oap5nu76idcrf96ilywoz2b1sclor82izpg8yfavy9jdcva1dfrdr3fyaxp96wpyib7kf6c9lhy1c',
                        iflowName: 'u3iqj2uhjtfzylxxqjox4slz717txzi1m5lktkmb08vpj340qnbryj9c103rdie5ebb4jcomw3vsvm742r7y6x0atjho0l03jjdxvun4zrg4n7b60pi4ix115se4ya604448hwjoz5uao2kfys2hfo17ddnqdw5q',
                        responsibleUserAccount: 'y9agtvki30826j9o6xs8',
                        lastChangeUserAccount: 'g8lw9simeldxjsm6oagy',
                        lastChangedAt: '2020-11-06 05:52:08',
                        folderPath: 'n4c3aa02gk6hdlgdyf2ukzuxrdu3me560r9i0s8n7xycmbho2p9f6f4911saloww1oewtwe7quko784715lm1z0z9xroe65luf6ma2cm7ojy76xt07603z083lcy3ni4nvfnq3mmmc9rdxxy8un0d81o2rwhfshtf5l12gof386anbgr7jvdvjiw0nd3i3wj6o1gojzf7fxkmiivg3lcoue9i6bsojryao1cn9bnq40q0b1rar4liah6v49ekhn',
                        description: 'lvhpcxpfe6zx3lt8ejs8kra9h4tlvbr0i6a9qfumfcuxnwome82rmehyk1d7ynrf3rf918v8x389ob2o1n09tugmadea37aq8fmo16bytvo8kgybmm457abon8k6amb3mlhbfh908m6pdjlyrr8uifw1j0rvs11z69l193zk9hiwv3r54n2juq5q1h58tobcysnhe6tlqqvm49ar55qrgzjemmrzk6cea5txnwxcss2mhumw9etqz4rypjv17cg',
                        application: 'vycxa5gakvna3pyy5mftla7s7b629z78xo50twrs6alwlo872ciy2ca0fx1c',
                        isCritical: true,
                        isComplex: false,
                        fieldGroupId: '24ab9cfa-437b-467c-a20e-4d8316d6b28e',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateFlow.id).toStrictEqual('9b603240-1c33-4c1a-92f9-05a28a63bd88');
            });
    });

    test(`/GraphQL cciDeleteFlowById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteFlowById (id:$id)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            version
                            scenario
                            party
                            receiverParty
                            component
                            receiverComponent
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f100ec2b-9d68-4225-93f2-fd11d3c473ab'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciDeleteFlowById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteFlowById (id:$id)
                        {   
                            id
                            hash
                            tenantCode
                            systemName
                            version
                            scenario
                            party
                            receiverParty
                            component
                            receiverComponent
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '9b603240-1c33-4c1a-92f9-05a28a63bd88'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteFlowById.id).toStrictEqual('9b603240-1c33-4c1a-92f9-05a28a63bd88');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});