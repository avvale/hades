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
                hash: '7mr3lw7yepxqq1dzarag33v4xraownsmjxs0kvaa',
                tenantId: 'b707273c-0f02-4f10-bc35-f9cb47d06aa6',
                tenantCode: 'uv6r97bhbn5jw77uxzhpy6t2rko4frays7tsvbt8lghe0pwabu',
                systemId: '32f7c3b7-a713-4db6-9c89-475089debd99',
                systemName: 'hlvwsqhke4k46ijftr9t',
                version: 'itrjo68ttihua6pf6yrq',
                scenario: 'spz4ahobgh3rspxssu19it4xkavqyu6813ziy4plvc0511xpikknihuivtck',
                party: 'ej1vp8y13l0l037toopa0d0ljq2g5o3ssokwdpf8ut231991j4y5ugqcror4ir8m44wvumxbj7vpml95zng5xkt2uc5j6ao5wxuznro0end0fhgeu8gmq0dkzj7rfrn6de2ts6b44uh4hq9ta5njb2bwqzgbkjks',
                receiverParty: 'joxjs7oenipiamwxhh0czm15wows1twe4amef0c71zewnpsh2cx75vymf2hj9eqdfytjzd3130ru5t8ht9c6j2s25ez0emvqni9p8hp3kdq6tqy8ruhczns2ijdoosvjx2mcvgqdy7w6omhpk3033hwm33io932o',
                component: 'gsmk4xucvz17s71jetg5uhbhbh0r4dv86vguab5iethdesxofiqwe3in5cdomc2dzybfgsoi7hlws92wqpkhfhieko3x8u2zlc3p73ms5zsyyj7aqjthvpusrrc04hbae25ahebj50b14sa5ksmgl637mse40re3',
                receiverComponent: '8syc5lz1iru4iv3xrqz4a4slp2x3yvlerj9xv0sn79y14rq1phbbrkipf153yk02d648r80ak5wnkhg6zpvxiv3sdjgalebti60j9knbkirq7x53q07gz54vnp11bzl11oik2z0ezq7wzevzhjgnrfwdijwnlz9q',
                interfaceName: 'jghjyz9w8xxzhbjqwuq97zlgvr33uw7iacua2k5nvhy0fzx5s6ulvy4bzap18rumf9c7v50abknaykyvu57afgfznscpdj509jd9a32bw4ldn78aymtcwgyoou0287jf8kiq6gpoz2ckmfpyf6wko3f8zygij1ys',
                interfaceNamespace: 'r6orp0gn45sxd6j3ycwng44sk8y1tdlk0e9nr61img7uhfvx1nls8xyb6xgohqr4pockr8vqhbkvg6x6ssirh5e3xprusdamps0xhb709lj3jqu39na8op5frbyz1jimp47tumbqz3dkiivou97jrheruowvj8pm',
                iflowName: 'utlkseupjutwsxxgyml24oylkss1f9pbsfox3shmrxdhzqljhyfns8egrc4hnha4lzteavxvngz3c7kkd9eoorl773scheacicmnaqeniuhplbwmm1og80cr13ozceh4m8qe15wycfacbjy4ys6fw473p3jc0r22',
                responsibleUserAccount: 'z4gjrb8q5wzzxoaf1rin',
                lastChangeUserAccount: '75t4iq2y1emjehg45g4y',
                lastChangedAt: '2020-11-04 15:01:50',
                folderPath: 'fvk1g963xobvj88fxfsgqn8jka5clatphfegltx3cd5flfev98u449tcsu2rvyvmntrgupn6oglullrjjh6ba6lcbnbfbkat9lnwjpxsg4frg8sfoochpnzivysk601k7a09esx7p54w5rck7mr2tuepxz942hefe0gthrmmldy7jh2s2esnxfl3ni0pzz6n8jtdnloi38h8hjbp4sua2df9up534vci55pvqyhiuf8qgeauy7rv974xu1b8vhb',
                description: 'wtto2pieqasp9fswhj1kgmr3bld7m004uaww39818cprsx6f8eayxdnferpjeshi67yyt1y1eelrnmz37s7nxo2td564pqpc3te8eecmnz9yo4qxgswjmf8d2ywdhveziw5zzd0cdy3el4aghbjxck6wmw8pyop6xz52x9zl38jrhk7msbuuae3koz69bcw9esl7o5a7yoemhxiv8kunw7c6cnwnwbpouqo4jiepo9n4vs5f6c38uhkj4vvo4hb',
                application: 'xbkuqkeeii744s7vvmg6waebkbgjxh08mcgk9zn20m95dcwqnlis7qw7oi2e',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '60740a56-eee8-420b-bdfd-50821bd298a0',
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
                
                hash: '1x0w29gflz8e6vk3i4icdg0tz8nfdnha8r6noe8i',
                tenantId: 'b707273c-0f02-4f10-bc35-f9cb47d06aa6',
                tenantCode: 'j8od4cftfai6v6l7upgtt57y64kb916u8gtfulwc2i1qzkhuo6',
                systemId: '32f7c3b7-a713-4db6-9c89-475089debd99',
                systemName: 'sfzq80xzvx59i8w4esag',
                version: 'xn5ur1yumrwqz5k9w8lq',
                scenario: 'zko9jhwgy5a0gff662qxga50x4oe2uf9m6d051036jh6a5v3vowe7qs5dlnu',
                party: 'ym0a58uo9l1ii4ghifwqfwatjyd5gvfxurgodpj4887pvhv059y65atibc4ylokzet1j7z7xos3fp8ilop2zte1wl730ez9s3ok30us8y78akvru4jfkrifgu32gavzn3fptwp41rz86o887hsxvsso9m74eyolb',
                receiverParty: '4azmjrwbb8hzj664moeymweyyi6gprn3c1icnpw5kafpvw30bwoeirbwak3opbajekzqumhw7mjy6x82y8cpz8i4croq9chcta5qm5g6w5alexiwwbrgd4siqmubeimg667w1ad3te1tf8sea52hbhuolpt1bdg5',
                component: 'idyl0shholzmwrijfmct2ru1nue01g7qfsb50uj9uq8t3u2am8oz892yd756dttlcb2udjxy3t7r2164d2ckqu38ogbdtqtrgr0dryzd73ac2vmybf7kdd7mnm1f1u2t0r6melrxq1ekctnob5n2tw8hhm6cvru6',
                receiverComponent: 'yqvvorbtb0oxszyfvtrhh0iz7cc0kg2fju4hu9l3z34e1q2kt7uxuzxndirt4joeb2nruglfcdwrpo48edcipe5od41jivdmpcpcmpn902cleo0mdqd9hqgzyqpnwdx7b1d2afvaacoymc8olynooy1nxhsnr7yu',
                interfaceName: '6xahku8sha9a7y82zf6ox4yzdpjoliv7b4z8rixv5a5f2jl0dfohp6fz3b0e4esbrk1y507n6fa5njz7bn7652n6zzukelhw6l5v4yqewq7f7cyfhiga7sb65vxu1pgc08zyeut25d3dkgvhzexbde98wgocj2kq',
                interfaceNamespace: 'is2vam350jaqs9a6g5cs3c6xnkwbsy9sdd7j0ui62orjebywcvlbdn4crjen2569hb8uewklzbli3thrxbd09d9pbninpxewf94kocyt0gz6dkfzy29an6dy6bpg4o58wltvlgsdxc3uzbz5rbyj18iu4u8wfe6b',
                iflowName: '33p49n158rbkt4ozfe0xr3jseomq2tvzxr7mu8atfkosn4csy35wr7wao9iy2yqacvxqiu7dxqpdnfhkhrd1nfb8kwjfoa4bkfb6nm5st4hjcgdh3995q4iao9jmkf95fedrp782r7q11qije5ud4gzll1vgtyfn',
                responsibleUserAccount: 'v3atou0osnmdjkicab38',
                lastChangeUserAccount: 'hh6n1g39u9bd1f3lv6l6',
                lastChangedAt: '2020-11-04 13:53:57',
                folderPath: 'rhn6ph5rw7jrp9qpm8nx33348hztb8zct2l56sj01xvvb3j5okyt2typ3jf1tztk37fobsg9qzyvbwro6tt9qdo6l1lludnqkv90vt56lg7gk34ylf8o1thcamaliiicilgh3wqwjfl14wx8sblatylkzuymb0qghlm2rz8si0paskpz55h9x349c774n6y3unk3b6q5biqiio0bfv9rczigwiafrzm59my6hit4qg4pbx3hi5nlq78elyega4a',
                description: 'z3suxv09uixjl77qsq2jhagcfx43ulnrhts8d7dgbey12iku9lhyht3uogem8x5359gdl1lni3hd1csf8y4hwp283an2q8pyq8mutnvk1w2dc75uxk6pvtwwb6h34g9w9xabr9j82yohi0n2f0n0km3h7fgogps7n6qbncsxvtwwc78byqtdm46qu67qqlm0m6ypnpr22m02uemn2li7ytkgpzcdo9pc5fxyd0ekmddt8c9dbhuuciwuvi9egtt',
                application: 'md4puyfdook0lrxx5he9o8tnmqgh2ilmy1ct0gwfriqlr07b5rstpgjxl663',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '60740a56-eee8-420b-bdfd-50821bd298a0',
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
                id: '2c7ceb87-9fc4-4919-8474-72a415086496',
                hash: null,
                tenantId: 'b707273c-0f02-4f10-bc35-f9cb47d06aa6',
                tenantCode: 'jxfuqe847xwob0tahu6e05f650lwxszjw608zm0rkwk9tk4lvf',
                systemId: '32f7c3b7-a713-4db6-9c89-475089debd99',
                systemName: 'fj8jbgv53vubbgtx5zc4',
                version: 'cdv09lrytbrvld0ic74x',
                scenario: 'wehkbo76igjpyhg3l4duaa0q5ejmpux775g5hbrxcy4ayd4czdg1ve7cf7v8',
                party: 'rr7deib7bbk9o3hhtxwgaffnzajaa7jpsookj2ftt2mjay3antjszjl18gw1jue0qw7ie3kc2gaixe93pvdkpm8cls1hhilbut15i3lztfzh1v65owihgmma7t9j2gtgzyhrw5z1yabw2v9l80z7p4nxo2eifmg7',
                receiverParty: 'u6pmbgym4o459x8ztdldnx73qa3u47h826k1eibvk7f94afro543fjeijisorpjv54citvx2ipyj63ifz4zaevqojbquxerk0i9t1gxfwi9uhj107l2omdmxufftzomru82b3hm6erx8gr1w9yzdm9epzbkb62kl',
                component: 'xufcwc2x257bkhy50ezhz83j5zx8sen5mx0yp8ivv6yeu6b0xvn5yvjhi16ma55q4xm7e2y9rs4w718nu4vme95qieijkwfg99mjhf1ffkwi6uwql49bzy51nrc46oyncqhhlrosk76anegn2vuqq1hxlsxoy747',
                receiverComponent: 'id9dvxiyi7850o0s7aeazmzocw40ghdekrl0izaqj77cql3i9b7ebqn270o3ptb151w4cfjzh5tvjqpetgzd0wu88d88anzc576r82tkwmn4queqjs7gc8ventptcz4bdsrhpqcvvf5mo121gmaao2uqf6hqjokc',
                interfaceName: 'kruzb6f29i07e6b6h79xm06yfhpiy1wsonlthfx4ft41r5h6cpzk3xpxp15q0caa950gf2f7cqxa12ilgs2n93lytabsn5g8k5r6nap0qn9leiwx9tga8xh28o9mm1hol3bh4jh37lgzhd1jb6m5puprxtruenpv',
                interfaceNamespace: '3u6ul9rl6sdo1w1f8lvp3gtzi6fw6cdom6chi3sjrhargaggqwfk9wl6w5iruex5fcnrhhqxk0t42b5wa1huhrzu9n5zjsnhioqhm6qzfo10u3er6be51wrkhgf0xfc0mxsvej8fo5nws35o1wzc0vuppiyotrtl',
                iflowName: '000w80csibi6agsam312kb5b8khnavz1ynfsl3z9m6qa85czd4v5oxvqodhwx2si9dybpg6vmv5c1mjpej7t8myt4qnnq39b6ip1tpxlydg41pc781vddx5q8xisbal87965356dweydgrxq2cld1w1fkx3imxfu',
                responsibleUserAccount: 'wjsfppv6eq9d87kmdj81',
                lastChangeUserAccount: 'g854op2lc3s9i9pyr03w',
                lastChangedAt: '2020-11-04 09:18:10',
                folderPath: 'ghnv34kj6kz8flps4lo9xanfno523xc0gjyaxhi10hh6z8lqjnmdugqjsphss9s367kli99c9flgy9ff56wrxckdqf704b52uq67fwt9xnjtw9ptjvpl1ta3z6r5m5sk6z5gqfswhz1138bdx77yb7mhteujt73rqhe368pj2c9jfiy6oitcye5yb2d9dj4nsasfuxx567dl23vszzr5b76quk5xq6yrw6l4nafudhkjj2kzxdv54qrgu03mhw9',
                description: 'dnj12dxygg8yfx3sp9d230ge041nt36sc9yhp10hh58f38yhats26bf9nhr41gkmxo8cdjip6fintf30igtb09dtibmg9fnlvsyb5z2jc79phbjs8jbav2p5598lblx32853452k2ez2gbdr0ve7w0mhjeil7srs1fsw7sef870a9knvewjkhjis5gr2ebvw7f3kt7p4y89ejz009dc1ydhurol3868lajr9c11c0b0apl3l4oyk06njt3oepxc',
                application: 'lhiz2a33tzn6rwgnv5eitmwtvm4zzi4sxifoyxmon9udqwhesey5556311vc',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '60740a56-eee8-420b-bdfd-50821bd298a0',
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
                id: '2c7ceb87-9fc4-4919-8474-72a415086496',
                
                tenantId: 'b707273c-0f02-4f10-bc35-f9cb47d06aa6',
                tenantCode: '1m6qnhik1paq4w1d346za7xcw8s8cchem39zyeec0uxsps0oge',
                systemId: '32f7c3b7-a713-4db6-9c89-475089debd99',
                systemName: 'qog43vutz8ex4lsyttr2',
                version: 'toago5d91be9vbwu4m4v',
                scenario: 'hgfpzpk6q89dgfnvie0t4h70ik09zx2r5nh912jr9j5vh298zjfq6o5iuakg',
                party: 'djxenck7mqfv822l74vl5cs7a0v1kg4dhzdrpm8wq7oit56uchqoyr8hnwe7d3ocq3dkje8khwrdqmfyyz6cu9z8079a7t5l9h9g81f0onx3uorh276g96kl46gvve9uz9dhn3970rfo2go9b2uttxumfi2vdnfl',
                receiverParty: 'i3ooeg93e540eugg0vds98k8s8rsfevqe1nznmn394ia0621gmc109gkrbhbu2x3xkbgrazfqztvom3op001tfsxfo7do2dgw02e2sz6jhgicyw21uqza66bsv4d3gx90itsyynkgulh1oqzis9iag7x9dqo9yjk',
                component: 'bbnwcr77y62h5ojetiwd58pqzj5stv353h583ink7o8nqcyrqq7xpzve7c1qgjg7rhyhv80gvkqum5ccse8c9fp957q6f7lfdyn8oi0tptowiwtf1mypwavc6jyt41k2vsjqo6ek5jdav8wrxq6mlrvgahq2eryw',
                receiverComponent: 'jelshpm9latajxugax7zt2ke1l54j73y7bfeloqiulfp2m2fbp4cyt6g58vfoxb9kqe6gnovd4xte26ztvaqbfiwdzn7jmkm5wgpuc7oqyv0lc648v3686v3ilh33equuebnebwmp3l80bu44coiyzgl6cwf9hnw',
                interfaceName: 'm61qscsrlsm1lm3ocuo6krcyzpu2faxxgrkzaz9hghrqvtbg71bzpt6h8dn8iefy9r476m20mfeujk1bog6h3tgi3ui5pu70bjurd93f48inq6tp3veq3yd1yfxb5xtza6o737gbv53ldrhsaod5qovbpxli9d7u',
                interfaceNamespace: 's6lzw0ma6xx3d8m9m55gg0c0g6r0pa8kxpfe5m9o92n2txoee0crcmf0hirfww982ki00smpkv7yyn2uzuaur2yoyfzcwmnijo36x32yflz6c16ee0kv1kiyrraspm4fs1ph9rcr7mugtlrr8dmm5alfflzvin5s',
                iflowName: 'ctic1jmymbn8i7kwx95grt50y8azbkby53aij290zug6kjj3xzsc0pwbic21xvdmak2wfat33nl238uqe6oc4fiacsfqwk6u95w0jjtfere63jexffpohpd0bkdt1cbzc3orncx1lp4roqx6d9pjm0re1ackvd0h',
                responsibleUserAccount: '1ozi9j7d85y8wnj3d2xc',
                lastChangeUserAccount: 'y6lipl9900i52i9za8z6',
                lastChangedAt: '2020-11-03 20:38:08',
                folderPath: 'yyjvem9ao3b59dq1tawjbcsz54soc072f4d19z33iwser5vjedyhvzd1fxng9d5r5dpz7kxu6wrxulalpzp24v9jp1770zlhnt94lvys1o2ubjz8geit1sjdlfbvheerlik24tcqyg5uarreky67g79bb1dcbjwi61snep7lsuz7eh6uz6eei3g9f7k3ygcf32p6zkuabr8ywzywbivr2i808walxeot1pbsp4itff4e8xaovea018brd64j8c6',
                description: '1rur5qhxwd7sxi5xrkdwmcc8oxqozltcgjculi6v5wvidz2g471h6ex5l2wcox7ywvwqvf88us4nx8h8loo58za3c9vzcdw52ycwsrc93xw9kk6zoq67hov3f0780hps6ckybm779yeckd1orm4fuzwfpz9og8x7ygf2fs59w3fwfcpjkm4xag1dtrgzvh4mu8ptpsqbd3qtuz4s8orifftbc3gk2v7hc0uykiehivk5l3bvray9co3pos1mzhl',
                application: 'mocdk5epqqy7ujkk2mpzuwxmox6qy4l74ryajgyht4jigo8gln7knmdwv5jz',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '60740a56-eee8-420b-bdfd-50821bd298a0',
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
                id: '2c7ceb87-9fc4-4919-8474-72a415086496',
                hash: '8j9bkg9z5cvcda363j7hez9x9w5racxq1odl25t5',
                tenantId: null,
                tenantCode: '50ujmzdojeotlomy63r3fqdxhg1mfw875pdoagn2xzudutyhib',
                systemId: '32f7c3b7-a713-4db6-9c89-475089debd99',
                systemName: '9lglnljx1opecluyuvqx',
                version: '936u88x0bpiaoj1nt0z5',
                scenario: '7lub787n70ccse54sshv0cr9ljr8ywqtemrbh86vj3ngjy9o3fhe54pa9duu',
                party: 'y8gydlh3t40durrcls0ti6ielc7d2qbe45xvhtt05jy4y9vf4oy7i9uxjkvvnp4b61aohrm60dy1dzv82l4iqzvly1p0sxhw0h3z8qvy853szieszvv3oetf28plmhf33al19xk0te906eid78bkx7hs42s0iz5y',
                receiverParty: '1gzb7aspukjxm1kd7jkb0t9gshhklziupj93dmh2c4fpbicnv1w09rwav1dzcx80a4m6abvbs3y16da6bh4z6falhnp08vdfoilv0tc4efq7sgh87s98s7w82b4gl183hn42xx1ci29d57af4znpwob4noi46wht',
                component: 'ucithkn0ko775ucsytt3yzsxfi257bxselbx1uoabj2v6gnnufyetlnv3l2dagl757rmtg42b64czptvb6pzbxn07x9k5jxmvnqwlvntpb1g2s7lwfeeovnp35oc47wxol4cxcoakod8vnvg3baphhesd5snhaf8',
                receiverComponent: 'lmy37n20yd2144ds98b8l8svablqi414o37kxss4bsmmgrajgkymre41x93u5chd774w62p6gzqgct9f8ff6770anv5l9kg7vcecubqlqcs56v1u18yquo795hrxm94oo8gr8axj4vvyb9vzw8qo4m85dw35maxi',
                interfaceName: 'hpa4mlopf9d4tbb3hwvsfpnm0oo6nav3rhjjqr7sleca3oo1bgr8j2qhvthsyj3u178nweeri44noj72tjinfveugvek8ffghaau1um6fc3pofrlhspucmk6v29kbwm0l6nwiiu0a6gzq9ciun46p5fdbi050rjd',
                interfaceNamespace: 'tsi67ufn2id1r1k4yqcozpty7diqs86p7ht3qgkdpuvpo2b9s16agcuugwmde33hlzra5jeinnueshzxuws063qqn1n0xl0vjj8j47eren6nilx11spm7zr48f21n48gmvrvw6s3dynvfr876fdb6otv4kh6vrmo',
                iflowName: '02rpuq1fyypfv6n6ejl20iktex3aaiwbh8kd6ctadmg442jht1pqd7rbmkyybrd9icfy3w25qtd0f1rxwohtd6h12zpj7dj0w78l7j19uo71lf89b8zyz57wqvpry02ay2nshrwg20c7ljk14lmcrlr16hvyhlus',
                responsibleUserAccount: 'j3wrxx2v08p3c00hn7ui',
                lastChangeUserAccount: '2rkfw5jafix3stynn6k8',
                lastChangedAt: '2020-11-04 15:23:30',
                folderPath: 'qlql6r6cn7b3cs5vcffji6dhf086etpnqalnk14c3wztfvuta6bzh5ko8uw27hcbh1q5bhxhlrtqmp99gnide5msojlpfu872pw4i3ewpytiofempcqvhyvzvn3exreqsto15ktr6byg4f1hdttbm9vb50bqnxkjmba2ldb91r87j4phow1uq9du6q2htlwl27fb0gmrtiujk6c7h3jk81b7p1m2xw3zv3ms9jv40719ok4zuwaofj17eq4e768',
                description: '3w65w1vzczu8q9j35bt2zgfcpc8qg79y473x8tqoswkm1vbqosibgs52s8y7s0as8ypog8q4fd3zw884k3jasnq7sfsqkaksz75j35ctta2sjh96w0ks76aeo7l76yengozdjwmbxpvk1dearx589ctvfnk1vnqvtzx9gcyp9iix66vll9a4e66n1lxamxw919c6lfuzw12jv1vsgp4ed1hns3berm656qrcmgfwv0cbktdlusswak8jbdv0bov',
                application: 'qn5rw89ipmp7qgh0v26keiik8bniv17gc0gwjb471kagu70gl1iwcp03ad2x',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '60740a56-eee8-420b-bdfd-50821bd298a0',
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
                id: '2c7ceb87-9fc4-4919-8474-72a415086496',
                hash: '9jvi7y3u9wnej86rxq2jls0t79l6v26ght3deen9',
                
                tenantCode: 'q3vjxb68tvyh74yu5h0i5kshk7a701egvrfb2dco6z92qzwyl5',
                systemId: '32f7c3b7-a713-4db6-9c89-475089debd99',
                systemName: '29lszmeosvcc65ks5ofz',
                version: '6ng0s919jfsjbunr6pek',
                scenario: 'tm749i6gayww2szshaopop78lklnp2yp7qeu5jf8hbadym8fut2r3nhit7wy',
                party: '4l5lyz6bz7wb7fbnzztzekkj6gvpl71rhjwoy34go8q7q6vkfyvhjdgds3ugkx0wnxwjyez3akjxbsg8neayrfkfvbtck9ai3o7iu83cww43m6fey8sm8ubdrlffhfef47gms8h7odurz5xuyge01acejavlhitb',
                receiverParty: 'r42asutk85jjem2ojbu15tzy5bnlxsoawlgdw8w278w4kuht874pbtyra26w3uq8gjyo8y1qo5z8nxq5d5xwkiz2sg25tdud7jtr9fyymph79sl7f0k3i6etclw1wmh4je4wo37thlxxwpj5j7tblss1enccowi9',
                component: 'db4sqgm65ocmccshkrmo1qlttgxx0y35s032qfq1al1byfxrh2z1mefk5dyhba0vmpaa1429p3e9lmx5k03omx7ysu28rx9xubpo6znj33o2q6c6uqktapje0sor7u9ys0wu9kdgqct1dafie6hyb2mqj4n2w4pn',
                receiverComponent: 'pqaqcwe4v3dl20sjm01c7xeiao4py92meyyf6v14kxvrfjknxx9thjt5at3gaz8j16hw3zb1i8eppeu5pseogxqnnob3ykgqp7vk1011mqu9si368bjdx7y3kgwnlbm4fg2wxuvx4y4ujkoy1s5jv31lpg5usfan',
                interfaceName: '1mxr13a602kks0o2zdn2enh1keut8c4vrb24gzji9obmvspaodmcb75kq3vat2rmj8l0ukscw222nh9dnl79tnmhihpd3ycksdast21xnmtmw1vl7gq3x4hya8ocm4o6w5amhisk50bvxz62tyzbpt06duko6fwz',
                interfaceNamespace: 'esim88d2nx6an6ujbmxpdwzqo3njo1ts1dg7zv9lzs8th50ykqnf7oav4xh45ucerbopi72lt3op46dkytxqyhb39a16e9pfiuklwkize25skr16bd9yj865ui5r8l33ahkobv5axu34fn5kx8hmu1fkvyguxoq8',
                iflowName: 'tcwahs0sgnyoamkt0if0iiiytdtobpnn0cx2e0of7265ju9ix8gwp8ss7p00qz0gmu1g9ihdot5z9mwpbbrb2jwf0ncubrl55v32jirwh5n5xn6vmviebb7iws18l5y6lmp9dm2grq1wrllil8hth10ggd6sqxqe',
                responsibleUserAccount: 'uenb0icgk9p7rm4q0wzc',
                lastChangeUserAccount: 'j51p9n8pbztiacm731tj',
                lastChangedAt: '2020-11-03 16:51:52',
                folderPath: '2o3zdzqufjmcg8dsjnvnu0xyw0we1r1u8ljpjnstj3lwedtc9dw4niwojkdalegyxn0n7c4wwx6tbwagl3x1nd3xnkpa4bp8afst7gadnam34jcburqw46t3vp9xrn5d0otwhyklvynic4tp41kkqikibiv79toktq8oni19rtlgsuvvko70u9yh3kponceslflbk02ecxdo69174t2tvg7qrtf0hpokr5nciqt2wnk69lbgkaxfekgqz6u7nol',
                description: 'oocj3dgoxrgz7ag98q5oe9gxpic3tetn43rwqg3u2mbkukusai6iqto1huwm1akmothypfcra7ygk7uph87nxpljsgga6l8navcbjgrny8j5tvz0kwyvkxja7gijwbf5kzv9gpusjr754rz9skjd1w9kaqhi1pccbrj9bw97ed5tysf5qtdqno778u4rcrd2mzb9e4ba3vi2q4bn6pmobhuyzxlr5295g3hdfyc2ru31r2u3imyybsmkw69fugs',
                application: '2k5dtani9chku2vy14hphk1w5tv28dvmfqlob3sqmklfx6ud2z9vuz28a3qo',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '60740a56-eee8-420b-bdfd-50821bd298a0',
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
                id: '2c7ceb87-9fc4-4919-8474-72a415086496',
                hash: 'qnx4g0gtcaj5x7ko87hszz7sm2auqhh0i9vge3du',
                tenantId: 'b707273c-0f02-4f10-bc35-f9cb47d06aa6',
                tenantCode: null,
                systemId: '32f7c3b7-a713-4db6-9c89-475089debd99',
                systemName: 'td0rchm20uadtbk186o3',
                version: 'tpmlvs6afvwbc3u1lhrf',
                scenario: 'ig1qdm4tearav5mik3gss83b6phawduumtl8vowmwz347xx9nsiapmu4buvz',
                party: '98uanspp2uxpyorof75ebyr7seenmhkt30t2lb87c7r1vkuo9qlxegkptuf7t16oitz9xy9lsl5h4pxo7h9ndj7fj28nn4ac9wfmmzsrtazsl1c2ehhcmuvtzjh1sms20tb6p9adlwmv4q2n62m9rtg1lu0q4m9n',
                receiverParty: 'xjlw3pkgk674ts9dp3lrj36rbo8pbxnzcninw2d3znniljnk9d3xyy1j8wq6qaqftfln6ehqn22wwwntgsvhbmvyandhjsjrd9i22ueo9tk9hrkkju0du4br0vu2rn2dpum0ldont1crwvvrkqr5if20kypa8el7',
                component: 'uusx4cndycuawmh7q4u5u03akah8szeaf31idc9dfqcbakdm0y0111qfp4aluakpwmfn7ujv3lc55nuj80iqrwjgzbojxkt1fk8019uy0za7vf5n6wgei6pbgpexq78nkikzw92m4lj0zqxuc7aqsslvuhxulvhc',
                receiverComponent: 'q4efwveii5n92kk0ee7ij6319p8d6ja87qgb4bm0tw69asmv64tn4iu2ihuqshxm8sqks2eluvy7iq8e8krlz8cyns2nm9y8ouspjrfqozu8a3qlo0gk0bvudch7qp7j44853lpcy9t2iphy2sov1kjldwxse1lw',
                interfaceName: '4coxeuck4zjbj4f8cgz6huh049omo52n5u3hesq0ut751hfenwhcmw4241k9slanmpy3i1fidkyn0vwpzw9ggh9l579hrxfg80iyz79n5my7jdslstz0uc1ix2mz8wrkeq8ow5n5ssptx15kzu81svwlm8yyfss1',
                interfaceNamespace: 'pjvkcg0x2xad5zol012hm7dajp6380t9jjieeyb2jr4qyo05dt5hc0yfk80hhmf6wepeuq0mkk77uxq882yoyuwjijxvobqvc5xrrfxqxt2mg2b25r0sekkccja1jqj7wp7t5wxk1kvskfh5xrjvbossulplnj9a',
                iflowName: '2hwvqqkyo8nfgkykuk6yzfchwdko21kzsmsppykc2pwrm3cqkgfp8p811bdf9veynva7tkzo49dvt6tzxlqu8z1n40jkv3qa2efhpgw4t4c2yfv20v9ds18f8615xqyf2b6cjda4xaz7efq61k60nx3q0lsndwfc',
                responsibleUserAccount: '8jcxdkfrac99j814tlyc',
                lastChangeUserAccount: 'e40p4fgnmrdw1vngo6tg',
                lastChangedAt: '2020-11-04 02:57:55',
                folderPath: 'kin611549pdbc3lw2z4jqae30l1tr97lh3mty9q9lv4a82czh72po2jgq2ocmub6y6t2b5s7hnphroeyltemq0e3sixxp7cobhyptzt0zrdmhfoyh31giawbwsj2y60eljvfn4hxirlwi0h63gvdhfq5dx0lgh71fo1dcixc4oqhhe1awewtazbtrd6vs3eumrao1qu6qprm1bsvgrj0mcoxklr8jirbcopd7fo05ab2jr316jg8gnq9ab06e0x',
                description: 'zzex2n8dp5jsb2ofl57bcl6rlc51fgygdqjdtvo458s5l5v6gk0hbc8ekc5l6ilbeud0h1qkn0ypmom776bv22ps1e8zzdbk63cwa4im2sv7qs9h1y4e95d3vdz08ay8r1fh1llhr5ude3qvlahrr7h1b80mqxvwpoauo3f4yk8ojqbc9cux5f9cv1j14sf6313h4g59ituijvopnam5nx90566qbi59ydjz8sts7n0gtu9ykg69jsistmlt64f',
                application: 'pxt8406f6ayf9uorhjumavtutitqq2oskc77qu0otrn0lp143qpdpo00zcy6',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '60740a56-eee8-420b-bdfd-50821bd298a0',
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
                id: '2c7ceb87-9fc4-4919-8474-72a415086496',
                hash: 'qyjjgnmmeqyjg83kx4tv4y3vbt3425gxof2ssy38',
                tenantId: 'b707273c-0f02-4f10-bc35-f9cb47d06aa6',
                
                systemId: '32f7c3b7-a713-4db6-9c89-475089debd99',
                systemName: 'usbmljvrf0kwcytxqc72',
                version: 'oeemb6r8j6t9tfkni25d',
                scenario: 'pngfmyya4z6sq4ey1uo15pqe5f15hi4ktbb72emsssi1qgpvp5s3xcacgu60',
                party: '6ryeu6t1fdbputreipq7ubnrqonpg2crrp99ibosxvs8ek8pz007agbisl4046r2a8gjcly9ujbppyyc6p72dpj2lobfvvz2qgojmyqab2rnuzkmyxlmkk3ar9n1anpbv6gge3ljkykaw7rht6g8395b4f6hsymg',
                receiverParty: '9qqlrrq3jyivqtkx8ax69d8488ef6c8h33c7giiph2r9q8tvcgio2tl7j8k0d272l8n007r4hb5n35bcni1v6jhrl5apbtucl1il6u2b32czwkiy4py3m2gfnlvze5ycx9ehlo1d66vdq3hglo50prm86xgn96nm',
                component: '83kgtqpbvdhvvna5w2k9o65jmtr04pozcp08o0ez7576ekhjtt4d0y7znyj8tgan0d5sqtxt6fpvdaf56nvpiwwaappzkvgh6sf193d1lom4pwzove8ge75f6htgu9ypyezt9m0oe5z66gvrc9mya29bbwekynux',
                receiverComponent: 'g6yooee7nqdibhralfomgdvwv69ep45bia78rcslkkp5msarxqzzqli3l1m00adrqbg9uewbj4mtx3k8a0xcc4xadmz25jfki1cj5g4eapff5ns8o7jgaxtforo6m2p32f2ky0m0002h9txk7ue1odd3yuuvo4kv',
                interfaceName: '2gw4ltw7d11zc1z2lo2hafbuwf16d08tvd3xc9nx4g9190xezlo87yoch1vf0zz5pzicuv3wwfwfasv4zlciqih50i4loswxgx901y7q73tp8opnijdbz6fxo9jvfr37rlep9pmcsjgbxll6jq1rseqoe3oyvu64',
                interfaceNamespace: 'g32by0akpbx4ldjaj8bx3yrho9euqfjliq3odikkxv4nywfzlwj1jkz9lssjweihp2lelbcf7ykxx6pwawvxp8n7sacp6mw059e9xji9rp52xjsgt10k825hf8l6cq5r2ioxqq6sqgi5zg4uqhkbaj4mw4xoc987',
                iflowName: '0kdod1dt1ressf2orwk2vibtye0yjgu4h7dt2cl3xao405bxro0h72tue4cpz5b2q314j4se8lv4mjkaq3z1llnxaegywknez4bvgi8pcb3wg0km973qe0t66q948v33nvuxigg92xtyxr9o4nju4bufnb27xkbd',
                responsibleUserAccount: 'rz480ugpdufb2bygclbb',
                lastChangeUserAccount: 'teay0vjqtnde6udztzkb',
                lastChangedAt: '2020-11-04 07:43:34',
                folderPath: '453c814ztpewfflfsx7rudcr8mtpklkqwistu2z6fmtukf8w9fmjetygliy1jfs6dmymb0wrgmkeepane1lyouyojea69bob4jq6fotg20ypzp7vbwbw2yjyhzi1s74q2i4oli3gqfwuqa8p6h6j7utl6by8gk756g7k04mpqjdohmoeabf1e1p9hjj7bknrgae6x275r4kb1pg5ywd5scuf1fxrvzkxo9bwtslhbcs9rea6aozu5srpz0votrw',
                description: 'ltyp2jb4oe508symuu5aqh8md5wnvdt3oyf5gclxzc4rb2el4qnvdoa9lgo60d16n38joc8jpomx0m9sjmvcg8oa30ai5m3urgdtjvzt07c9k4m30ukbk0fhy3xzk1zj840v1k8v5ht7jp1lv699ife0d7ekxhbfteq8xhpdy8yk8yd2b4q78fw5d4x0bzwxubtkkq5bnhaij5u58qc8u6j598s2mhexqt7hfoailf6g6y9dd81tenw36dpts2l',
                application: '7zlp0ei4y4avxgt5ene0e85rqjr2dqd088tzfpctclg03tcj42oz1jap5rev',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '60740a56-eee8-420b-bdfd-50821bd298a0',
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
                id: '2c7ceb87-9fc4-4919-8474-72a415086496',
                hash: 'i5d2bvr7qzq3hces5qs89g7x3t0ymf19g2oygvu7',
                tenantId: 'b707273c-0f02-4f10-bc35-f9cb47d06aa6',
                tenantCode: 'xbxhsrq8n7bhqf1unz6achq0eo6phu93cra4wt40ysmfglq2fm',
                systemId: null,
                systemName: 'g24sujt8196zuw8jzb8a',
                version: 'jzszxz2ws0h67qamnbya',
                scenario: 'bzkif8af5qaj727s4s56y8nt6th9x7mvxmoqqe45t8zbnkkg0yfag40m1tay',
                party: 'uhtctdbxfk66i7uwotu5yd14bh3sj8dx0vio9cd28zy39fgjnlvcjzzpbol8sc7jfx7cdjkvogbpxhu4ji9m17sumw7rzo1h5oru5tqlkwb3n7pb5ct86ez0rw8up2uhoqkj5eqwn8gxsspgiinwu11iesxh029n',
                receiverParty: 'k6wqp0scz2agm3a4ncx1sanm1ukjw63m98wxh2uv8ui22wq7s8lxf27597m3edyqbjlworhvcy55nzelq8lafs93ib0of289khl6g8p12ldm40i7in6kw7y0d1ylhtk4gt9vylerj4jzivumbrkl4gken0hjpepk',
                component: 'y5kj35x8uv2yvg10irxted3bkd3a050k154203madiav72gvpty67sn18zwhj5igrnuu9wczqma641a9s4ojxkzk4an6ubl21jv34l75p1gv6wse5jyyy01jxoqlbk0io3uuzy3yx06m4sbui34t0rfgg2v35mbe',
                receiverComponent: '8embd8a6d0ortva7bk90dn8y94p061resko30wlfcym38oe87xvfcuks93e6syutxbvnreaepn55kq74bhamiac9u8s7jd1ohnyd0h07pop2fnn3lububydppqt4nvc4r4z1pes77y2vfanewqvhqely0dinjai1',
                interfaceName: 'g5reg9hw7xjfoz7uctt4xrfn7qgg3fefogqnpw7u9f6maohhj51p3zjvmld4h3vv41tknzuvol89n7rn51287k82wzqyzp1dh0x8db52s1zqj7bm3vqy88oktmvavc4aels450urqcoi1arwc8wmt8ro4qx8wpmh',
                interfaceNamespace: '8bfekd3swu569f1k20s4zu762djqtxd7f059t18ygcmr0p9xjlbesr6sa8k5ugu3kucoywff5q49krju0u8wy6wuc0fwx9wdl8tyxg5e6wxtvky8nlevxunqgjkuidn8i73cf8c9e3tbllh5tayg2uutkhf2000g',
                iflowName: 'j635lebmrkkh99lc52lbsjckga0rk7chlmtuozemf7j8xweumme3ior7y3zp7ie4jyze7sl6yz4ut9w9or3qco4f88f072mnp2gu9tncylm19tif61gct8vb32hz6k1016i6ch2jzzrqpkpeks0sl4xe56pri2ez',
                responsibleUserAccount: '8vg0ddsls83wswuj708v',
                lastChangeUserAccount: 'lps7adozkueu3dluqa4w',
                lastChangedAt: '2020-11-04 00:08:08',
                folderPath: 'hnety9q9ckku1up7u6yvlhwd0mq0nveho11lr0bmjj4d0ba1py1glp78ytb1z6rbzy8gydl4yareqq7mmh5twrpx1ce2ptocxuakmuuu9xfi85sma0lgyv65ab678owpn07eby7was9errax79o0r2fddtu7w2kksg9oiqcog8ag7gmsbd6s65om2rfl4znso5uc0ax45e7kjk99tzmmlpbnumqu3p7l4z58lap028p2v771wi9v8bnoe5cw4jl',
                description: 'ydgua78kewmcmsh9jhwg85vgkk2j529t9bpnhxmxpgojc9s99lvhzbkw9x70wrj399kb2g6fcmzv8anesgapz6pvebmvvc6d58v7wt75ja0fent1oarglvc8deust3bfabtm3taf7ispb7iz85wihfzn4ddnnuvmqwic4m1a5brjfeokr94d4o0wcrss7emgkvvcr89avnax3tv6zonjlnzvj0i7n7h1id4dfq1t7nrtf8qwm3v2102dbcvw2z9',
                application: 'a3ygrlrafw5dd4g3kl998jnbdda5fu0uhzrcbehxatwwd7zj5m56usl5l1mx',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '60740a56-eee8-420b-bdfd-50821bd298a0',
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
                id: '2c7ceb87-9fc4-4919-8474-72a415086496',
                hash: 'hchgayoken3g0q6b4y3159rerdz0gxzigun81oah',
                tenantId: 'b707273c-0f02-4f10-bc35-f9cb47d06aa6',
                tenantCode: 'ucwvnnrvre0o30uwj1ardd8q4q3qlzesl9qpd3z78yerm0to7f',
                
                systemName: '1sk37dykxinhh5bifyks',
                version: 'e4nb9yy2slvd94g9rrb0',
                scenario: 'upz4pdhdc6v046cne2z84k9rl9l0pjzhrxbj6y06cs5v3oucywifrx3wibz6',
                party: 'y76mbg5ecjql9bvrhk1cpcculwgnzc6hfynyd11jj16fsdsonwrzalsm8iwt3yu98087awvx3bvdfgqvxfor4e0iw5mwp2h3yqpv31kc9ebfd91iuaoaghkcv2m7a6ncgff2b9c3q1kbm3r52pgrj9srduh9woqh',
                receiverParty: 'tp7o33a8f5roeah2ietohutg43u7rrzmw8t5wuq4kme6fhbdb39ydsczdnb62fxact7sgnqkk1mwe20lu5413hxfbo6nfqvv7sfvrby86lg912ko30u6reyrr2s9iz2yh6c39gh21m2825ges0vvu577tr5n72o4',
                component: 'e7ifmdmhelemumczks7a3z7dty1bgfsjyvefgxhxn09ei66y7thf0qziq78wwxrg4fhx38nphsfvnpt77fotqjofpvt4y67g418x5b3ns383gab19j7ezfj0pkofzrreuaewxd4d5f3h2rqktcd7z7j9d19n3416',
                receiverComponent: 'srhgzddjgtioy02fn8a369e00wnw049bbe5oxlml6yl72m4se0xft4vt81fuwukxtxpelkyek9nd49urcnrzy69bxz4emy7mgnsdcu9d58634vu3d6dgp4puzjzhvapbpex5dcuz891xodoufyqcueh98sljdf1w',
                interfaceName: '46hkuhc9vh46bsctfun4btnvx85piqeg335adm0brnhqvgh5s1mi8p2cnzms2q74dif0myriu16vmwyyajdeevp7a9vncu9cxq4v8xcklxt1ywibr6hzjj7nums9ikn00b0r84xoljzgzg4dq6zxxtt730r76sez',
                interfaceNamespace: 'y7piun21u3kcz5vf7t8k5o0r1o233dlla8cpov3u2qwuy4zdk3fbowxllygn22v70kuegjrpo68zq4jgyjjnznvrc6plosr6oor7cxq9pdqbqnjo9ukq0e015b2zgiprs6wejnmjwjtzlxus6dzooswn9ry7759m',
                iflowName: '2ur3yuetng5ows6hdeauu2eqkjs2bpv4fv2i6sly2vvekc5q45csfho0wv02uwekt75f54lbipu9s8q18b1149nmbqz7jwq4nl82tyu43ebcgbsg27f77fof8fkcfxuvg2z2j4zx6y4z1xyk3mlv7ur3ffe0fgi7',
                responsibleUserAccount: 'hn42m24oh1d2ji6l51k0',
                lastChangeUserAccount: 'k9gaessu48q9s753jch0',
                lastChangedAt: '2020-11-04 04:45:37',
                folderPath: 'yndtc3r8sy56iw5hfjsjvtbhm9mmz8vh672696ozu20s4exijevh5amns7rb6gbya6hblreff3v11xdtcrovrzoa2cdtat7p3kmagfb2u3jz6g7a0aee740od2rq9wzysklvor9usb62vpqvbs54nyt4lueepxsdscvzxh0qgeiywbbwubgtrtk5k2q8exs57l5npos7ihk2c9jv8gdmz460c0p17sprhyyt8ert7195x5919qcr01sbghykg3v',
                description: '5i678hei0iy2glncg2gs8oatm8tnah1f07mbb4q6jsteym58bsvbirmb4mzh2xaym189c1m3h7iujvcp6v2fn9xjc4q96o7x76t0cvd61l0aj66xa8ahp2duyy5tlc2w87hzkxn0pe4n4twfgjtiu6hs9uxd9bf3qvr580illeyu73hn8liyuk3ybd2z72rda8fexdul71911tkw7pvzaib09mami99qxll0iql0uy1iujb6kf2nblkpim98b1h',
                application: '8kr0jrbcfq4cnv7ekppxownbj0bcypx24o1q1dvs0m9ihgrqrcarykuvxqv4',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '60740a56-eee8-420b-bdfd-50821bd298a0',
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
                id: '2c7ceb87-9fc4-4919-8474-72a415086496',
                hash: '6x5b6uyg4wzmrm8lqpin37v0tas8rwyy0akne1qa',
                tenantId: 'b707273c-0f02-4f10-bc35-f9cb47d06aa6',
                tenantCode: 'fxy7f78tly4vl43bhi7in67tnretiz7eeapcsgiwop4i1ajamf',
                systemId: '32f7c3b7-a713-4db6-9c89-475089debd99',
                systemName: null,
                version: 'z6y9bvwl5ww34bvp6jth',
                scenario: 'xit92ui6aq4x34uojbceqr3qm1bup4l2pfeszz4g76th4tco6kzsnkkqq66l',
                party: '2yd4wqvfe5mw80fjzx6m7y7zxfk4qf9jqz8sqzj4ywpctbxsz3jey7hojelle6baa8aqrf1z9vlw2zi4qs7oezqvkg20mlrpc6hiuwqlxugdv3m6exqrtmuyru5a4mj2lw9qgvmwf0iqopnp72ra70fqbqj8zrwk',
                receiverParty: '9na2n3bgrwfdauihxrawiuxmujzeygqv3pu6v0o853r33dv7mavwyjett2sdyfmmw9o7c2lclw5fwbfe5pj78fr35jia3xhbw5rdbo361x80nna2nysottihmszny108oue8e6up8wu0cy4y4bm8vun65zcavuda',
                component: 'v7yic65oy016l68nzs8sal3my3em3bmyo2kyzrpl76rpo5c1lqq8adz1ag02j41q10b589mm6xjp1wlx4jejipr2i1eaw42omcc5nu3r5hvnbjg01nhg0xnp9fme0jpuda8tf38hnssz9jvxo3qrqub6o3g3j146',
                receiverComponent: '0lygm4i066hmp08ado5gykssa5zddlfrzal6bfr7t43zv36zbiqpn0bnaqhepyr1laat4hhi4wod85lt5qwzdip9rws9fsyivjqt1apnkoz347xh4uhubtlks67sa93qtb43z4kt39jv01pbugrn5emxczppqqzs',
                interfaceName: 'cob0gz84q9p19y37sbiyyjcox7x0nmd0pe7tgvedijk53zdrj0ncwhfmfxigmh00wgifpxybxd95lqqjtx0hq740rg8xj4nq7vmmaf5k8hjjmdt6s40xpdgtcmc574qidulkmvu95iba188kd5oz2vmocm1iw1v6',
                interfaceNamespace: 'nr3ngo3azdxthwmm5vyqz9gwrr39hqx00gu58v8alu2qppaltg1fi8wq3dmdghc1x4zl4wr228tcfuzvnse5y908rxajruuz9epzy1cv6enixabfcoihhy56ykibr3isb1hyygqmyl5ay12up9a24tprl1sljbjw',
                iflowName: 'drv2zobmhkdtyulspzoczyubrj8nfr1w1rqj1tbl6gxtsdoyysfxj94ez8c9lb11djedanh66vewhv0yv95tmzxiwctzdn5nuc4wipcjwmu2mjzyz4u9n960pvirkn5pc8h2f17kh1e1pvfz6sl7ukx13jcyxeer',
                responsibleUserAccount: 'vsm2xnfxcoaxa7pv4x41',
                lastChangeUserAccount: '6ry004cbojh3zic4btwr',
                lastChangedAt: '2020-11-04 07:23:06',
                folderPath: '1oy4ptjpn4xy69ve983r6bkwk5lj98mymqjrzqerc3ahqs93muodb9g935qbvygcdjrvjd5p3miluepamoacsxu4ud0b5u6ef1dvr96daitmdmcwthu805jz9crzok3mbpg5w4efwvvmejars21v9y74ldh0guezbin9r59k0qx4so3hdijbbi4u4kwcu52j5ghlmnmj8p4962uqygr6uxpwyt9ex9zzmlyrxhjgjudnubl39zih5e0s1mxtab5',
                description: 'f2lnyouejb9m3s0zxeus9aofvnbtbfrify0q39uk21gjy31p9qcyubxhh5rw6lkzjxxt9h3ta9b1t70plbbmqtzzgdiwet469in1rzez00xx4h1bq3b3v52f4zuw6tq8wiohmwx9ifxe4g0rdyfxo4nlf4gr1s1hav5al7pf6iycg9sxe9prq87ywgj5zap1k8mk3i5uqfxxzxvkfmxzyqzkd7su9tmi78vk2swagyusbdcbdzvoa4mkoxiu02y',
                application: 'bumli4tfww54xhh26bfpoj46152vg6yi9ths085m7xyb40vz5aiqe98odpb3',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '60740a56-eee8-420b-bdfd-50821bd298a0',
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
                id: '2c7ceb87-9fc4-4919-8474-72a415086496',
                hash: '5jytvj5mx8hc07wejpvgrsei54zwgajv42o383zz',
                tenantId: 'b707273c-0f02-4f10-bc35-f9cb47d06aa6',
                tenantCode: '07z5dw8hgm48xvxx8gw4ik1w3tpai6d0g5hi13lfnhg4p0693a',
                systemId: '32f7c3b7-a713-4db6-9c89-475089debd99',
                
                version: '83l3ahoisjylgif4i684',
                scenario: '047bcm92gmc2qqr6c8wkrmir3ttzeid79b6e79p8syrk4k6vkm4d5ey45atf',
                party: '7r37ycpmmw58n4t3srdm9dbshoond27hwtn4ks6g9pu0uegsmhf7ohy04hn4johm8biim9zjfnovposrbfjvgk4duzjsxppddymvshy9l81h4kio802zezb3t1ptl0u546eqqx609cncsi4l9kr5eggh6e9hj8oq',
                receiverParty: 'qr6rq1lo2eudk0uvlw2nya4u9df6xtq9gsdtlnjgkvq1uy6px1q88qp22oz538na5xfhjhwv66fdaz2ms80ns0n4v7j6oidz65fu5niuherh1pnrxjnsa7fs7u8t4ykjkn4efozil0ame56zkuoxa8fppbb9d7u9',
                component: 'emqdwfe4psx1hjeawdj782r7zq34fa8rkoer3fh6kwseml360blgrvmqh75pl7x1vcu5wddmr0kt8thzypbykh8u8iq28658692grdfxwg4lqjvs8qln9gbyrxhxuuavgt39jfbubrxpxdxi17hgalt9o8mxtk9t',
                receiverComponent: 'tsvxuo4he1egqcvwhu0s1vj0a72af7jpbo69bo5wfnhqikc3fy80ntl02l55abdydm6b1ch15u2a0r0gq0pzxd7t2hsb9z87w7gle3c70j70t7bkkoesovzheikrwn2ocrw858sajbp0d0eyumyils6l22aw51pi',
                interfaceName: 'hjdinhpk0uf26a0d0b0wil10o6alhxfrstfe5js8v12bf0t9jcjcp7e5jy57g9yck2g5e9tvs30ohvf4qh462y7gmghtm1zx68ls3u0gov1b2yt69az064l2kxx84varu14zjw8ms7hits60vlzmw60dv6grehi3',
                interfaceNamespace: 'uk7utt010ga2n1qfz9j1hpqqrztvpdpi6zel751yva5hrvuv1q9lk0215vj2xycm68vtju157ux130dq0xcsfm4zyczofhwigodliqdlnxcm03i8h6x3rppiqmwgzr736ldxw91t00a75uavaa5gymmmgo1n8gnf',
                iflowName: '1ozogy17mh262kzfvoft6uk9cpo8mvlcb05o65gkxbzr52exvmnrxr9hkbmr4yrnou24gqdwb8bg09ka7szlrul2tnumdujwa7ecdqn9n92jhzp1bt6iwlkskno60kofg7owaymidshsm2p1qk4z5fj3tbfomfx4',
                responsibleUserAccount: 'jpiat76xy2be1etqelih',
                lastChangeUserAccount: '6yl63mpbwhnbt4v4cjjq',
                lastChangedAt: '2020-11-03 21:16:34',
                folderPath: 'xqxw67apo6e9vlwmu9gwqig95lh5261o1yk0cv76qhdse5i2waoz8m2fjnziojppuf9q22i675iahjj3f6e0iw33mckwhayphsil99i5ln2klydywb951axo8tr4c54jn4gpgyzooyimz55h40f157b6s33om3gktajhezr5uubmk5v2qyxn57gm4nos2bv39a63cz4t02bo12sq8myk1lxszc9l32wnr0bwteypqnfsmnsqy37y9exg6kriwri',
                description: '1nl4pfmc1jzll9l7kav2kvgx44yszledso35bfovt8gv769fm0nqiuxve9gie9ju07cj96plymuex7087mhq951676cpwxcb5byplcl70ybw9ype3ecxo0aa4rn3mr66uyg0uneyukw1o0qa0noyq18gbt4zh9pqqnxfv0ypgghr8oklcwhrfesvwcxai3857jg2fq59n2vzqxeiwq8nxoo059gw02xat7lfgi7irdezocdagtojuhliga5zq48',
                application: '55zgsbm2xl6d14ul3byn4m1h5yk0sg5ytgx92wgulpsjn86n3b30o2xw1xw3',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '60740a56-eee8-420b-bdfd-50821bd298a0',
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
                id: '2c7ceb87-9fc4-4919-8474-72a415086496',
                hash: 'y442bgc83rkfncwikb3y0rulo030b0fbrdx7hrc0',
                tenantId: 'b707273c-0f02-4f10-bc35-f9cb47d06aa6',
                tenantCode: '0hiifvmhbzljzh6224rqc4z0y33feiuvsbu0x9h6ta17mlsgfi',
                systemId: '32f7c3b7-a713-4db6-9c89-475089debd99',
                systemName: '0plob0x8u0d3c0cr348s',
                version: null,
                scenario: '9i46lbf8levzhajhcwi6a69j075fqvjxdmwi9kgwas9puptbjbp33vesq9q1',
                party: 'o62apwc9089fll2286lkznd8nqg01n8i784pyui21241ge8kyrpa8j4xmuhsicxottemnv8lh0nx7py2xggdiyl4j7mktvx0s698134ibqrzpghnli3f7qz2zoa3hwf6lltz7xwimb649m4x47hwtktjvwox1rai',
                receiverParty: '549zban3ck1738r0940tdsurvniw0fuo504peplhiii69ptogpcvi5peluz72n89f2e4qwkel20kiypdab2csi3tqnf5okpxfgy2qgzwkv6jw105vvvpbgi2fa84ud027orh4uxg7aeekg6tjrk4epr9bop021dm',
                component: 'ksodpj2jcyehy9to5viwk4rn35577xyck7shudl3vdbosifjqrozfitsiu9u4iqmc8919k6ncvzeq9eg3ctonkwiwwhvbjdqvsjwh5fm09rf1545hjh6ibcsx6jbos31q4syj1c57m0ovobgs8jo0x2whxng7bo8',
                receiverComponent: 'dd0n1ezxeo0pevmknawc6con0h9gwv0s1ggcnrdzuooep2rx1l3rhl7qk91yg91fqw3t2qag257mc066n07u0dsxogjrk6wfgjtcoqdhgkwznt3d8m8x1rusynqu4venoowglwcpbdh1350lsnzxe0re9zaycg30',
                interfaceName: 'o5o3jwcf15p4p7ceb5n8wl857su9ttohwsiakbg4hggcczl8ebydu274rsgzyjovwi33tnzbw9bl28nega8oxpuakvkdmmq8jkuux4tssj4mhcfvo4jsm9gr12wbac1uldvkq4cich1l1ox81qlumvl69vyw352z',
                interfaceNamespace: 'vtlp8uxo5h2v348cb6dery2x8dke724347a779bxtg1suo7d3mquosdept7gznlqx8um6qsqdw0e1im0sgql4716sfyua8uhf8dvo9o3cn7hk47t1qad307m00flcviia9v5vs0oqwl7ur2b0wz81nd4ejhtp02a',
                iflowName: 'yo5bo1u28bucer5i3oshkesq7zkqv6mplws7pw5qlbf9b7drcr2kb8rosx3rhhu4uybxa078fin1rcsfixaeuxk4aj8np7g75rk8ft5glqxvoe1p7m3gef3pwk5m3v079flgkv2v2la9kjiqfizbrw91djf8v9ei',
                responsibleUserAccount: 'kurelp9evmei6fwqdffw',
                lastChangeUserAccount: 'u4zzgiv9jvwh91aop18f',
                lastChangedAt: '2020-11-04 15:01:08',
                folderPath: '2g1g8q8la7vbmubkm26sv2n1y50f3jazb8yi6xpgxggr6qjh4i4c40an8bbzepirpr8xmucqkikr6bsfthhfdy58aam4cl5eaahvjhqgpgdzbbysx0nj0gsxkneglkfmzxsz0ovxoypep8ohibegu0u7wngwq6bwglm4de7im9gz23dseryvz3hw9hupx6ku6dvam7evplt1a2126cnuxu04xy9qqzf3h9dc3x59crj4yavpw27p4qbltq3awcj',
                description: 'ylxdscrreja7auz6wtb236ynmm14mtjx1kbj8b1u9ml6h3j9mgcqkmqe286pshcihf4pl9hmc1ggc9eiy6pmeuuw2b5p7n58uz6f0jh02dpvncu7hnd48ecsk22e5y49xsa3qshrfogyh3ms066umhoa4dt9u14xdqivtrh3ux6azeoqxms4i1gcpuswakfjicx7jnsw13tas5lizdyy1ppnat4lmfnib24xh39imp9qrpyipoatxl09n03n2jv',
                application: 've0f4n9quozc0j9udimfa1gohwpkaxnqqk8ygmaqowkp786dx8myfbb8howq',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '60740a56-eee8-420b-bdfd-50821bd298a0',
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
                id: '2c7ceb87-9fc4-4919-8474-72a415086496',
                hash: 'r34tn013814e984yjaxhz5izvk78lhv9pxb9lhu2',
                tenantId: 'b707273c-0f02-4f10-bc35-f9cb47d06aa6',
                tenantCode: '2gmb8mivw66fd7hkd1n2d87d1nkoux5riiam8mlfoxbevd6ub7',
                systemId: '32f7c3b7-a713-4db6-9c89-475089debd99',
                systemName: '1jpic424jcffx0is4mn1',
                
                scenario: 'zwgqduxcvkirfkirpjcvruln1t1082l8bfklt0o6h1sx4bxv1lydch2gp8dv',
                party: 'psxdsxh2f09vafpwtxj5rkw236dg4r1pxcv84005jvvpbnq3lw4zgutcideo8miydg6bb613f9cngjf11j56llm8gt9nhmsfq3uodykr039q2zrw802fhz8ebp5qtjzsuvycsso6tfbiy3fq46m0gb91so4ogddm',
                receiverParty: 'mejap2pjuavsgtgniheeq4nu053uh284fh7j4poln84hgt4pzqor5z3qkjzn0x1jnofko2yi7p0rjijd76hovcn4va3973gi6n4q1ry4ey8qz791ib8sqz79f1n4wd2egs6adung2lnlo49iz6brtacarcqnx9hk',
                component: 'vj3lh4eoa6ebft6hgo389n1h02z9oymyhldrh5p6if07ntkfgs4vvygzazvwx0at4cb2edvv1uohkratqjf279owutq4e69r6y7atp92lvaa77rm9y8fbpfj0crqphe1cboof06n43m9olfi0ein7t6llye8bydl',
                receiverComponent: 'yuu58gfcnv283tge9lg3g0264367374xv7pyka5hoszrm7e4jdsrgtut0bgsndjuou4sp45lcepg18c4lhcf0fybaqebi1xme3nqk1g1jdem7skl90xtmiqtxxk77l8t9ek83m0va2qq36ikf5vkkrp9qp7fixmo',
                interfaceName: 'fi10cxj2zvl9dtbsjes3p6bl66bk7hx6v60wultf9fg8ozvvqevlwu640d38l15e10ij3oo0agbrj5n3vet0fbul0abkfz16tlnvz1vk0e8c95piilm677aeeso6pnnltrx92wwjv2qem1z42mtu6d5zpd4nrb0d',
                interfaceNamespace: '6cretmfp4xpwa3gpau9ig2vdn54vo914ijzooc60mcb93b7r9p2vlajnw3fy1lc3xbycjc9zist52ttgk10ijg7kkjni2j8o7ad57ozs0ejo4tk4i5cagp047b2luv19s4e8vwrucwanyvu1vcsmvmn394rgk8mq',
                iflowName: 'y4u21d90u450i08laaygx66zbn3ud3jinpaw0zi5xv4ituexp3uxzv5b4jb4ytt5nbxcjf16is6o23crx31gksry3odet5p7ucfdc6ln6k8jcfikoajf82dzkzlqinm225834d5bcdxwnozcakb95535ys8pe2y2',
                responsibleUserAccount: 're10yugtbczdcvrhmbsa',
                lastChangeUserAccount: '7b9r8ybgf1oux4ri1dsr',
                lastChangedAt: '2020-11-04 04:48:13',
                folderPath: 'li0l943vle9ypksweglonlz9voh4v9nr584y6mq696854rev8h41rx6rvp3rvmtb4hq4g5l2wo3e72uxax03eq8ijdya9st5w1vgmxcg1vho8hdvgiz5s3hu6sunjw1w3pvcfx2xa67si4wptes40n5f07rcuytln12vk7xfxqrh7xip5gbu6ztrfl5zucr41975cowo4rdl5u9dcro8m9cdl56g81e8hnrzvx8ht7eo6w1afvr7apia473a4kh',
                description: 'ncj3wn9w940ui62u57vcmtfmqx3b1tva0r3wxfoftlx20008rdtuz5h6dq5t8w7xop85ikr0fq89e6bltuwanm2e868dsgx4p94vfdpcdhkbq6awcgxphro8s4gv4zfqqonntqhhyhjo87mzw5kjwlm8zei7mrjq6fxjcnd2rwsy3q14d0apjb9lc7x5lf59q1k920r6fe33ec1y0sv9zjd1mgt75bw2i47qsnb9v3ssgtw7u648cmff5go7sq0',
                application: 'kfnpdb2uc6tv3z90aocuwv9azbhc9vkfr5xjm0f81asw47uds07q5wrdmwj9',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '60740a56-eee8-420b-bdfd-50821bd298a0',
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
                id: '2c7ceb87-9fc4-4919-8474-72a415086496',
                hash: '4rifc30akksj9nfp2i33ou757z5f26vfhst6mkey',
                tenantId: 'b707273c-0f02-4f10-bc35-f9cb47d06aa6',
                tenantCode: '3pgti2fuq3jc3ng4xpjcx3vs7acxuznvqwrwah5oexlc52quxq',
                systemId: '32f7c3b7-a713-4db6-9c89-475089debd99',
                systemName: '2vcdjieo1l1llnxjxs5z',
                version: 'cpdbexnc3thssa1l9m7t',
                scenario: 'kivg5lfwx2ajeexwqlko6dglivrus4umgklxy411obl38xlt6q6p5q1xwxkl',
                party: 'fpw1wlw0bd2q7bi42dolviq4osdsfhb63dtc918lc8lcrg53ayrisajdluufmyd6y7yl0alx7fgi05ompqmgphyjn2013ipxki2cuy29owzfq4b5bpu56c7k3m1fe1e0tthqnnarnvxvkxze1rw3q9ks8xd2t1ee',
                receiverParty: 'opmhe0kjiben7pui8yqnhtkffvj1aor1a4zg0hjimznc8o0hdshruxn4shvcgrzlhewmoi9sqkjovikvh2t00azk898o7nha1hcjyvsjqstr0936qfoincjspt6ok9ivou6yctiog82joldhz5h2mg0o1wvtuedg',
                component: null,
                receiverComponent: 'nd1vroe3h3cxbjof3gr9mhd9nsa5ruqqhfv4mgbjwrh198tstb265weumw6jrzeg3p4djm741c24j8sy93y8kpaukucp4p0ognhprp1zqid90wvihc9vuk86m14ptjv5gtl69fppnzt65jcfw02kdxoawsb3twco',
                interfaceName: 'rpg1sbav8yw3mkwtxqntde26sv7av1z3fazl9uy9ecx2bgzkd6ebd6kimi4dx9je4gh3n5zp1z0qe5lj42276ru9vnn48ytg2w7fyc95nivty0f1guzz80b6go4qpk7tyrvdazdvjvm995j7whutet2w52b3nawp',
                interfaceNamespace: '5e5yyv3jf8vcbm1e5p1snifl6dhshvon36b1qnh6vhl4hhqcc2m84pavq2yrcacdl4bvhwnnhy5ku0pcutokq5f5d7z6panfrv0w7ovkoel425nulztf7uo3duhoz6zr4mrtq50lvm5sstws8m1pi4njusqnx22p',
                iflowName: '08anf8anqgiyn4p7jni7eky1i2hgqfraaolxhc0fbk6pc2btvikgst5wv0a5j7wksntvb97k1mihy3ir7777dm3hr43n78cguzgo60azzoz2m470jc24zjsuuckze8lhg0jtfnw6w66rd46k3r7ul5adw8mfd6d1',
                responsibleUserAccount: 'sgky0fnwp3verzzftt0q',
                lastChangeUserAccount: 'i54evkidzeaix89oi6kt',
                lastChangedAt: '2020-11-04 15:09:54',
                folderPath: 'rnr25uwihqqytyvl7bv79t1nv286ros1zplfr6j1zi983c5jcqjbzyvvtmlc5vx8w7iihvinscqk1dig1g8nsl93pjwj8m58ivr67c4ey8l4ose5celomyaxgxkw8gpzgxu86kkbkdkh0izkbh9cq4mcp08x1vwnsj63nzyba3w0h4ybui4d214rmooukw3xolepkm5habluop5qd4z2t9cvh01knu57f14zsdubf22judpd16m706ofppholk8',
                description: 'jrqjx645lac825wza9q87wrg9v25amyadxqcagsfftdnvi9n2v6kgefenarma1q303e3was8lvjlg1krfyvr0gyskzv74uyyfxuj8at465kewepfttq9d1j4932645kwxpayb5fp4svwm30j9vy59bvznexp9yum7jqd9mysd7d7srgeafc622md0b30krvmu6nxz686q0mwl6b2lwxb75565oj6s7cd1f0ub2omu7oxqqrtff3s50q2bgh0hw7',
                application: 'ivri82fogs19ax39z3qyqc5ndhm8320je9zdgt69h52j01ssdcxk3izoqcbn',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '60740a56-eee8-420b-bdfd-50821bd298a0',
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
                id: '2c7ceb87-9fc4-4919-8474-72a415086496',
                hash: 'cwk1fbg2eugczlvgelctggzas9gx7268xx0ep9if',
                tenantId: 'b707273c-0f02-4f10-bc35-f9cb47d06aa6',
                tenantCode: '34d133y7ecib6ive8fp75nbzlzwthcvaukc0zbhyc7eau2ynxe',
                systemId: '32f7c3b7-a713-4db6-9c89-475089debd99',
                systemName: 'u4lb0ispunu5les8mynb',
                version: '810frwujr7whqfngfzll',
                scenario: 'zb0lf476cixr17fc0jt4wt83orocwu5i1ecfezebxr6st1v6kv6spuxx2t1u',
                party: 'mf56s1dccrk2w719p8t2qb5zknmbr3c6evfcctfn54qawhc2m1gkis9jhwoxgxsjjruxb34ytokbmovwowf8ojtbs3u9uesw56ap5w8v7d7l9sxfodw3t4fqbp1mqi3v495j0t6l58225zzbtj572g5kaofmuaep',
                receiverParty: '9euo2vtdhag19npz4dje127ks61jnaxey6cwb4oa8nc5ezlbq2cgp9hi1ixkfvuging0nyi3cgehi9aez8nr7en8cb325xa7i8es9cn7x882o0oucrt3bir6ad9b8y2f9gy9bbm0er6lx5bix55fbxldqf609jcv',
                
                receiverComponent: 'rnpo6cr6e6h7a0todh9eawurct77g1us1qwtc2w91uivxrqbi3b0olzxjyy84yxipxumnvfkaad84a83vyjs9cwwmkohc8735e73rwzh7lhnmy7h4tmea8qc7c0yvx6zfhgqp8yjv3yiqvlh4hdym0sbsxqkxt5w',
                interfaceName: 'sdxpjxikdhsranpzatzw1v2e0alkl7ec34i38vvpazf4es19dkfed2jzl8ece6z8z6rugvs5e37ttyyikcjhuyzwj5lozwewzpy5usq25dtbvrl3hxp80bg45gwrr43vzssppao6l5xhzhjcnq2l0kt6futs4cap',
                interfaceNamespace: 'ofzsty4yrukxd4l7cdvyy3alm8s0gluuq5fj3pcq167llcqr93sdrjppdw56zfkfavpdgzyqllmjp8m5bpydlcwjbk3momrevp4oxt9kyhbg9teqq02yvh0xctx8m9o6rlg68r4ocbcxxismzab7isymy2rgtczo',
                iflowName: '46cz4wvnrr7vhzoornqylkv7ae0sjumkuffy6xf3lp2uv62cen9nlokijxapci3omi6wc0xsc4r7vmydt6rbyxzs4p57qbyljq97h1ykcwocpe3xhdpkk7q9awbe7cg1x9nsafpyul1w0aj8ms2bwe2xf438zt2e',
                responsibleUserAccount: 'n2j6fnoh52o0p3q4bpaq',
                lastChangeUserAccount: '2hgyn9qgye5hdatt4ktn',
                lastChangedAt: '2020-11-04 00:31:36',
                folderPath: 'iekys1ydgaf07ehlf84sif9ykt60x40dr2y9w3dl4uuoj3qmu22u36c4d5w2xf9q01vw4g42lydjnuevlj5jvitg0udmow2844iqoekq5slnv1yvmi7w550kdq4a2ot0g2gxb88scyf0j73u7mhhav2iadhsv5q7ooqm8z8mnkkz3p6sqajmh3ksplkfl2d9moa0a649lcb2oarye6hamsk2cuoyes5b97ietivnftmam99vkqp1u26t40jofrp',
                description: '3haj058rh8nk24i8zmv0jsx9mew1gji7racse7sx4ehufoug5j2juuqjli6rm16121loh7m7l8kq4jqql0dcsouafw2u9yc7ty6zezc79vwbxqpgpt3x3dsvb77qzp575l7ntzramoo52jv004b1czeto4zba2t7jn9h247dcrnp2rcefzp9doz8ntlr56cxtm79h5hth26j0qzgipt6zbu4bayxnlorurwiilarjm7lbz8okda4xipyhin9ucc',
                application: 'nz7ihy7a6cahtgpbnecwyt7clfrum0oj461lx0czjbup3rofa7jnsj4t8u0k',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '60740a56-eee8-420b-bdfd-50821bd298a0',
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
                id: '2c7ceb87-9fc4-4919-8474-72a415086496',
                hash: '5a4tl7iymplo43hobctr222c0pji4pwfc2cilhh8',
                tenantId: 'b707273c-0f02-4f10-bc35-f9cb47d06aa6',
                tenantCode: 'fbcf7e1bqtpzwjhofb3mcwjjfeb6lnpqa2aknhn91j3gfauknw',
                systemId: '32f7c3b7-a713-4db6-9c89-475089debd99',
                systemName: 'pbr8oyaacs03jnf103ey',
                version: 'hdzhqnzkdmacb14p0a7j',
                scenario: '9fvq4d3imr9eypbrjhhhf6detnrtnc52ihu320awmzvzf3uj5k8bwi018i6y',
                party: 't8yeplc2dvv58qrq8wbxxbq62dos816mdnzjfa1b0avelsesak9pyeouuxdbvtl0xuo1cdriknrb891x52zp72ekdry50icsxoj89nwlzgpcrrrab4dvfxkt00bhs4c5nqt9mkp2464z7qf5sfwdurtcpeletpat',
                receiverParty: '442dhwne86uuy75kq3k9n1ho3jtnppx0vrn5tam7iermboe19yj7izp76url37ivqu3jnqs9sinlz5rrk2ncofn4fhvbfajy9ncatjh49mzzmcjqhiu6z5w0pffmyjxu0ijzoyyi120qxeqs0k7yfl0rbp7qqczu',
                component: '2bq4o9vzehto6lv594ob1x30buyd8duktmwf95xotlzt37lw28eponk7wzpqxqdw1hnbk29th6d66is6yz5027u05tf8q3vt34wtigq8mxcg0nat3vnf2yolzq015tw612gykctzfr6zh3f4n50hd000yw0gaxc1',
                receiverComponent: 'i2m72f1r0dfgko8omgr9opb4wdzhtpfz40bohas8uefi7ftxeybwsudoway302st1uo5435oez4hxdsnqqqklhj4pw70t08fbfbhbtsa28mjpsdjs8pgg0iil5cqeuvy37d797980oqzrccwaqwtfm8x5gjagwmq',
                interfaceName: null,
                interfaceNamespace: '6d0gdp5n91pf166xoehi9xba4i9t231rlpg4e1spl7etyjawb6u1rxnya1ulv3eiy51hhgxnbyrybr5ug32w3uoejnturm6sj1bg6b0nqvbiswcg9cyazsrp96js3yfnd5v8wvs73wf274r6o3vl1dwzbaamgicl',
                iflowName: 'z8f374ssj8gz0ycpxmlup5ko5u0ucnxjayvftrkwt624bw43ypre9znarescz69rmj2oru65ww2c43ekbf0h5nwx3d3e5wt8p7rh5juj530qkt7eex7wf7asdx1ol99whbjuhu2cis1ofi5so1khh7bhtrioll30',
                responsibleUserAccount: 'ppucjhqa9r49q3s2z174',
                lastChangeUserAccount: 'bn652xbjgxcc6upjku7f',
                lastChangedAt: '2020-11-04 14:07:27',
                folderPath: 'p212qn7i2lo9ij0l1ad16ovhtj8zn3n532c44s6ah2iuj1o6zkyb6sli5l1kr7vizqunonjzt9hkja8gssz4x3zi0i4md7timdpzfr3fw6riaujornu6dqfam0e64d0ss7u987q0g89otncs52bqvx1r99tamnqujmj82pape2bebben1vbiuu2016ladeb2kj3wgx88yq6rjn8ywgirgyvg9eycl80mlt4t31igymvyn3bej4fyq7zw3a8azsi',
                description: 'telcfwvklctbfu2aus1mtm78lqxzi4y4uc0bfelptc55tb3ma4p1sptqf8glkdp3lpkm6fncjvns0fycej2fmq27nxr91kt7w8ema830z82qunjtvhmvyns93w893lu0sxx70uhb13d5r4rb895b1rwe38z0jtmuxjaqkt7g5lefk2xo60dfh9ggtn4vxk6g80yhhjp5acbnwlks7gvu6nyp8jhn1crmovaxm938segg3mtkxzy5ik2qllhwd0m',
                application: '64n43e7qf3jj7lazm0xxx4glka9wjbof17yhqhty0z3ax62ftp8c9x751obb',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '60740a56-eee8-420b-bdfd-50821bd298a0',
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
                id: '2c7ceb87-9fc4-4919-8474-72a415086496',
                hash: 'a8jjbewdre73zquva3qpb9lq6gjarffwd02nebfs',
                tenantId: 'b707273c-0f02-4f10-bc35-f9cb47d06aa6',
                tenantCode: 'h39rn6b8xw059w2ot29foxbaps3lpo96d71h2qo4vmlfuzrmcp',
                systemId: '32f7c3b7-a713-4db6-9c89-475089debd99',
                systemName: '60l5ylz8h0spo549btal',
                version: 'q4w1b6i1xhytpunvtyxo',
                scenario: 'nlk3gp189rvsv78fy0p1m84wabodkk89poiadzet5gfgc9tqeh7vlfmg1jkr',
                party: 'sdtzkjn5kyqb63kpfpfbyqil8w5vpdtuh1q929m5q5vdewhh5vpoli7aea2pyup2c6nkwoxmnv33ouiyxrwhd5m2661kzg5yzss8rcozgyd8behnas2bi7c9m3sy5hwcmn043ep3c5mvy05wnle04adynay6cbpz',
                receiverParty: 'b6kw851i1wn5ietjht0uraremolwe3j2c0bv7itxraqdsvpxpql7tbw1ejwjyw1z5pu8ruvno320jvvx17ujtlbm6xj5btsijt4yemauodl5se0g5g659aaruq8e22nj74vtnz3nrd644cy8106i2cx3dipj13dt',
                component: 'k0h339ny80hgb5ae2mgmvtn6v7vl7wks418t3crr9ryraosoxgt74pafxf33dm8crhkdnu33kafocskb1j3fik5o1g6yg4345tl99mnetbmi3u5zrhykynadr54z9h8kamb2oz3q329hg1wf1durg4uj3gdt8f8i',
                receiverComponent: 'a1zt36br2sp1xnbrbxchvqjzqx84rqe2ronn5ni6hsa51v2ur35irmopvsbcdfwiijp2fysksuxdwj066jgwz2foinx3trajlgjt5muyjfobqi51utfbndkf15wclt83ncfkhtdexmdld60zqnef8zjy9zsc2gef',
                
                interfaceNamespace: '8kjc3wnqhebv22yk9sz1xp6rb089wzs8umfoh1n5c9p2kysvdylarb4r9q1e3sl46agjjz5f2smjposvnhohcartf5igjoo9irgasxov93sxwtrxkztx2mn8h2huc48qblfse8kmjhp74fd6e91ef8weq1tklbjw',
                iflowName: 'kx4cz2qst2dteoozseq4qfio7j2ycl3pbdla4y2p3zbp2gmi5r334bjgd5okt96s76fql3qwq45ggjbg4ouz7tui2sr1uymlfwtplm4rhlmbtovfakddmzeul49oyje2nhtk5a1ycqac4uebsx4te4jp6z7ep2bw',
                responsibleUserAccount: '2i7rtke0dtrdz52khp0e',
                lastChangeUserAccount: 'vxop01d8l4cj60376xx5',
                lastChangedAt: '2020-11-04 08:43:49',
                folderPath: '66yy1y1n0ywiieow4qphmh3vmjk538e1a59z8qcmhx59qrcf3zp9gewrlgcrm8q3p3k6qsqa95mot38l3ltm269ngbrk7rreomgy8hvnab7hsv0z5iyfy60dijp2eeg4fxfiilif4p7tfiehctcplg3wpq0p3rbuuuppbhsim7bwym2zk0diewyv0d2gmslh48tff2349zopw3yy1o3ouk6400dosrle1561fw5ndk9otaeakq65sv1nosz6jjx',
                description: 'otw026soglb2a5jbxdulvf67x3n2gphobe4deag249uezlqmpqkjayels0xqlzdqm7n1vlneyr8rr7xj1yz2yb3zr9gfxrwtp9n4q1lxtaup8o87r0r37w6g6ecvdphu5iwplpvq0olu0ngz3gvaiecw8vr8ajqfwv2wjobs0cnmu3d9skx7d9mhuvajndj6hjct2bkspyhh8svtii5knsslldon4nvxac1r2po7cwu5whjx6k9ikwtmhjmusv0',
                application: 'o9a7rbq80wu9lkpks008m1f2z9n7dkigc0k0txghh75vci36vevy2q18ydc4',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '60740a56-eee8-420b-bdfd-50821bd298a0',
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
                id: '2c7ceb87-9fc4-4919-8474-72a415086496',
                hash: 'hww5rt8909z7p9fccn5p3r82ow941chimgc8601p',
                tenantId: 'b707273c-0f02-4f10-bc35-f9cb47d06aa6',
                tenantCode: 'bakb0w5ii02itz8atl0rgmyen91v1hrypkcsomznp503eay2cv',
                systemId: '32f7c3b7-a713-4db6-9c89-475089debd99',
                systemName: 'cmbbuexg4ueo6v4frhm0',
                version: 'q3j1nu6fnl79nhfq5xas',
                scenario: 'mx70lmcdorq4ynncryze623ljw3sr9vgjh1yagdr6a9fi0yl9ciupe4fvj7p',
                party: '85c2r9vorhiw63r7unpqt3qvllppj0fnv0p0dmqh1h2k14g49uebiniagsfoztsl20brd09d29juwurvtiq2wpj2v9b3p4cmywit5dozz3z5f1vkqhfdqr64tn38uvghf33fcbu0q83z7kkn5cyjmcbp2drdk31j',
                receiverParty: 'i6o3by1l548n1j6w1cjgy857fs8axw7avw4lxqj7u8ebslevtxxkohifjp4z33o8vh48d609qz06xfn7kuufwzjdt1ak3lk0uzjvn8h943hv28ewph0fpbep2adme7sz78m42elssty06oe7xfzksmbwxktbdhyz',
                component: 'iogjgbugxk3gno34zzxj2l5zke4tj1wasozyxqiqd7bbbtpqp0kdnc0whzyzm8y3f5xaligxdytl2toxbuf9hffusudgt8uj0mnkwepz0h219ism24s9bpvjkoon9ggrr16ylyks3l3ufqhx6vw756tytt8jpit3',
                receiverComponent: 'a0y8wbgzyjz4wy9kaaj1j8jai6w60bymv7czqn6q9x48i62im2fl0v84oa88215c4j72dejiwpqp66ga3ccw6l4k93fsnau15qs05egc34yg99n1n8144udok9xbfbkr5offhwj8277uzcbow6x2es2pnuzwlyer',
                interfaceName: 'g2j8yo4mfo9dc2pb3g8ik83nnbjn2rrw677s1ry5ei48zp1jdwxnsl4fxz0w50wxnrc0j3ddbbtri2e5wp2gkttvcfra0wahx4jlpeodpf1hwxavz8mirbmcdz8kzkcfgvzpobmgulxft4ede5rne0k8ti05m613',
                interfaceNamespace: null,
                iflowName: 'da376fbzc7mue2xc7553lp5evldi0zpkku8zvpek2kjqyeimcj2o99u2ps8ymiuycmqj9ddgvklzymzhwc9e4norgjg5qvoxu0vw2c0z0qs59eoxc8a5on9vmk0mr9gpfzdxjmkcrc712z2i4ysqgx3tvvzex9wv',
                responsibleUserAccount: 'c30dhbx3lealhp5kigvz',
                lastChangeUserAccount: '8mgmm5hxped6otxd35xh',
                lastChangedAt: '2020-11-04 16:02:48',
                folderPath: '8vuthg35qp8dmv2vfr0xiny8wcgiyz5z783qtp51nm0oyrryxx2aabotk2of78q2ksz6vitnd0wq3fai2mqpai0309o517wefnewykhekkr30gzhmr7s0pmrp773y80e7c9d698viv2ntm26xinzhy089cg51if98ja983tfbi6wrnoo3cbzslivyvb03nvuszjnf6xaxwf243d7naqld7r3rd15lvicm5zu8ijcdehuiprraaklyza5hqgu5eb',
                description: 'ybyjo9j7uchlivp75n47npxaliewt4zoqvfw56aaa6o5tuimldqhk0bri1so73w7by9abunz9a71meblxngn4jzk997uy4ej7v6kahfqeeol0ip8axu209fjz14p0gu5zxxzdy9i9an2x0ktokqqusw9p1vk3yc54dhrna91pyzdrn009msdtk88goabrwemcby4wn642ifj2t01ds2xboek5ytk2e0gu9pgn4je5vavpek6n8645kpmnf225yw',
                application: 'zc6kcadj2a3i6iwfny0g68re3rllm5nl6i2xq9ekn8jy2upl44hgmyy3peyg',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '60740a56-eee8-420b-bdfd-50821bd298a0',
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
                id: '2c7ceb87-9fc4-4919-8474-72a415086496',
                hash: 'eo7aq0d99p92p0z1igda0ipdb35p48toutuz0jyu',
                tenantId: 'b707273c-0f02-4f10-bc35-f9cb47d06aa6',
                tenantCode: 'wdkt51s70qcoms8gq4pw68dk1few9y9rbgwrgec04d9p9uq3gw',
                systemId: '32f7c3b7-a713-4db6-9c89-475089debd99',
                systemName: 'lwh0mk9hs466l2yigbmp',
                version: '52ni666gtsid6cdhske9',
                scenario: 'vxhputck20yp2kj5j5rog77thau3cehmxgc09ypb4ruit8oc8lftydco8m81',
                party: 'rr4gt1j04om4m0nbbhb7ed7dakke09x19m0e6gnezeduzlaz3k8v6vshlc13zubmolemjn2tmwoosgd82h85anipkqr0jbv8mc2vr3tnnukulyk8kpvxloc0kxtqqylitibq94hcgekfj35p8xgbd6uhbzha6iug',
                receiverParty: '1lx86cxxri96c0za4aed431zk7543wl1x2jsmr91vwobdnqzo6f16ija8jxppim7gu0oc838a4ugdp2s3a93g4zfikvya2zfnt6yg7vdvzofwqzccjp0ugogqnu0xddwb8ic3a1p2yltvbnpm6v82xas0owmpsng',
                component: 'hrrtfw24khzma7fnolnokzkq1qihf50r17o6ogf5sf2hwfvr2cuvymarr0x94cmb3wv2mthjwypf6zhfyyijrw7v8lyaqa79jzq4xblp0sh659cl5bwtj62lileig5nih960tggjf2df15gvokv6pdecva234xxt',
                receiverComponent: '3d95i5tcz9roeai0mfvio99igcds0fjql04omot1ftqflo8k9stp75vspybrkyqm6964gguib6ajs0etxf93k3pzlkducm707pgdc8dfjzqnkv0iz2v0ndopuze4lya8l8w06tnw5un6jyernrcbqhuwho2gnx6j',
                interfaceName: 'j0vnzd5w45p5tij6fbhdjdgzfdya2nssir8xezv4nbhxb4ev7w43dwjy8sbs6jx79na1j2vie0gkj2xr8adfvxs2elrehpm2t43pi182jv6a0lv95z9hd7wze4iditakzfahuo6rwnc42o8po4shzhlsm7l01h7t',
                
                iflowName: '7ibd1drlq92m72ljlvzf77yt2p1qgz5tjx8m6z7b633qx01pm4cqmx7kkadr4yzuppoe4mndvvei7ekmjg6crgqhpj0x81g08googjs88bmxwi3qv2h0swlm1j3xtzycsy75n291lyzvoqtcpw4oa2d8lrb3fm3f',
                responsibleUserAccount: '2plv9fu91db790oequij',
                lastChangeUserAccount: 'g3vak0rmi2uyljzn4qqp',
                lastChangedAt: '2020-11-04 03:41:26',
                folderPath: 'um6ds2qfft0jsw2e0iqmeg74yfde6hj2mr4f89819txnkozqvu1ncfjq9cfm2gc138hn5rpb5d73t4ol6ouudfl1i5cus7ei2kw12msgo9s24fo1ap5g63m5q965fo4393o3czse4o9y2zf7y576wwneatq9ojzn22z0enaefpevk9i0qh4onb1xb5uwcg2nheabw386o90vkl41ysq2ndgsnww281rye6iod7pany046n548emmcskpvs0e9wl',
                description: 'v5rm8kogtv49ykur8ads4h6dd0709zelysh3cbkybzda5a9mq6n7sx7ikl05bxy840ldzpzchf10y3s7fcuvp8jmni69yknt29pgdi1ku60zimh0ynef0li0gqts4p1f4ct47el7hat57fyhvkrz3tmeludvkvmyxl59ol39i0mks16oyywyop3c6zkg8r4j8lpslqshtx8nvnjc8ks7q63lr291rujyye3a0esflxgvwijisqrb5pbqvckkhqc',
                application: 'c9g9426r31gx5dzgzq5ymdjgo70s8d2p0cyi0ljleiqfzmteekov0dd6wn4a',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '60740a56-eee8-420b-bdfd-50821bd298a0',
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
                id: 'awnt5ol6trq8z1ye1snenb0zuai66e7tupyb2',
                hash: '0omkv12hbzkuza1qfn4l8va5tl9ge033geu5gz6f',
                tenantId: 'b707273c-0f02-4f10-bc35-f9cb47d06aa6',
                tenantCode: '0o0u9ecwe0t5pb2p8yx2tndxn4i73fntmr93fujvur4gbkwcqq',
                systemId: '32f7c3b7-a713-4db6-9c89-475089debd99',
                systemName: 'sig41xl5l5i54p3bdapt',
                version: 'ahrfhju6qg2v13b1w7d7',
                scenario: 'ooqp9kj0i5z9nsl4gq7mv5t2v46z8we3381235wxdsrxaiunvnq2tzzrcf7e',
                party: 'pbh45ttobgjrmoojcz74q953bzz95dmeg0e8p5z392wewdl3qc5ul6fv1kirdca4xtlykgvce5wvmc3iwem4oinn6t8b22j5n6xfluhmd9r37t3ag9scbyiyr32au7jg72fgnz86jjei4idmgagfv2lrl567wjhh',
                receiverParty: 'dx9kmb7xz02704873ab9u3k8d85qwmitcqae3sv1klrtuh08t4p4jn0h83dod6h7ex2ay8do1zmrm8b0ekhdh9gau3w3jmhz0hx1mnsmnsoux8h6oysgxbgol588aat9nej3shk5kvuanikgntof0o6in71opqpr',
                component: '8ofzis6xunohpb2l62159uj9xniuvgzqx5iyjxjupzyuti7ic2hq86y3p6dzictbuxn6nonlj2glfl3hrz7lu3oh28vtertvpqd93i8dt550irzgh10r3luvflu28a8qncepmciytpde7rxiqsydwfgkyqkz52iu',
                receiverComponent: 'n0sh51hghlk2jof02l7y2jgpa9hbkb2bj1ex8enhk0zb9ofrbdbkek5tniytd6ocyqchde76pgto6m952ztvmz9cn679myinfwhk4ihqojuuxj3zolng66tvzgw2et3ofbemhukccnevip64h1sh72sddvd4jwxb',
                interfaceName: 'bt6xrauc6wuruk8uiv84qry0dbm3swz3uwt4dv6nkn4w3ibo7fxv3piowzam8950oertd0uahkum8mupwzw9nba2yti85dtcjm3m7c4tuuj3d3p1akouwiua7s1nbskxnfg4bofoe5w7o9dpdmi4oy3fklma6w1n',
                interfaceNamespace: 'z53pcnljnk12sbnh4ql8fu68g8hw4dc44yfm1crn4e6q0642fb9s3cz2q2glian6c7roagikk9t3cnoh31h84ewcjv5ws1w9leroefffy3qfpogs22xbs5dondev2g8fgmmo3b9yewokhxdqdzxwjjtlgm9mjuuf',
                iflowName: '3qds23ofws30ltuzr6k6fm0r9w1zor8q4jsuy8xc0wiiti62x7yt93w2bf5xhhr5s3sjtgecm1yl53hjiyhsi16kwxm3hhi63fx61sd2zck8rkkm1fwmi2t4ay3zpdl5d81fofbfkt9l8ueubeio04v0iyz3gzh6',
                responsibleUserAccount: 'npdvle2yhtdbwvatfpng',
                lastChangeUserAccount: '136gxlt2xruh4j5vwsg4',
                lastChangedAt: '2020-11-03 22:48:14',
                folderPath: 'ozmoxorotnpacn4dtqm5imqb9mi0hzkkke90649jxnt0g1kvx65365s2bnlgjikkueph52ltvje7urshb6yxvddn5frwoo5div24ifpvagydiz6w4dd0rnj78k4qs7hyayp8qqhkchn4c1znf27sc5nileqsw6784fho1tacx8hrkpdl9d33yjqeuthdkucsagj0siw04tnb3xztfi23irjdjxept87ssoxmw74snoaxupuyklrultt1bxnkzhf',
                description: 'n1yvd8kg6tuulbcj317w5e0tni2kl93vjowff9hq4oislkmoss4q561e2xgpdp3lglt0i5uvmuiyzayh17nshgsp0dhrrvgkz69b9smx15inqg3il9h0w3uifvi4vjhg83h1ap6cq22y95mn0ljluyn4cye0vlhyh572wp5mypxfiifznxmypeq3nzrftqmnlw9z77iuon4m3yf3l2t4koew6dedp3k32bj6tzsqgot9g5q0yru9gio0rovon30',
                application: 'yl2qmhguwrr3z6pyx8n62dsv3yej7f8boojy5b3dl29w9ajrrvgk8euod6h9',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '60740a56-eee8-420b-bdfd-50821bd298a0',
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
                id: '2c7ceb87-9fc4-4919-8474-72a415086496',
                hash: '5cgb1hy0yfkxu9hzy5o7keee99osit7mkx1rdqt3c',
                tenantId: 'b707273c-0f02-4f10-bc35-f9cb47d06aa6',
                tenantCode: 'yg82tm13sqxucs1gmh5njpdlelvwti2e4kvqle99og18wc7ugh',
                systemId: '32f7c3b7-a713-4db6-9c89-475089debd99',
                systemName: 'rsflij8oglm9gati2gkk',
                version: 'vx4gmtz08ne0ykxcuv9n',
                scenario: '1t2oelrxn8iu2qi4us1c25v1czw4j0mmmfy0czj0iskjrplh98gzhvo8swab',
                party: 'i56tnj5oe62egdgz1czabk7gm4a93487ae7q7rfohmtikxazm381lkn3lh1jqye2l2z1s6p0su3cfvufnl2tyjkhxqlcbq04g9yzooxall418t1v50h2guwkc0dgax5z20aa5p798lyc9hqqydsq002g7269fkhg',
                receiverParty: 'g5nhdu8wfj5dubsc022jv90xt3cp2wwn2h3dzjcd8braml6oyypci38nknk4zmll10o4kwilrxomhwvbae7drwr8u7rd2ettf7pn8swit5zsr66rokifnoo2plfclohzbmeivgmfzk2j4o6i7yfq53ftesuuys2z',
                component: 'pge5facus99c5sqkd5pt3dtb1vx54r2shpi1h9d7g6otcb81861gz0354e14if1uhy1q1yi0yceh85r9vkpbk7h3cg4nx6dj7e3lvzma3zkvmu0jwogjo81286p9j9uheoiwl7f7u5hhuul7cwok1l1o6psptfz2',
                receiverComponent: '78kku2c26750tzcg0ba79bxmtfkyux22bb136tyjp8nccqnk0an78thn8ok6k5uuymtak5cqak85iu40lyg052kbus7tjpwuhdfbqiekx34xssneacz1ww9ro1at635ed8l180wv967lddhwfqi2qlpjcpmlabps',
                interfaceName: 'mrn3ag57ukz73m7aemmvdug082zii39ykdegt26rwhhd5xqgf0fckkiecf0ssv1w2r3jdj7zq2knu598u11abykofy6mzg6359ipme1yddf47nksspaulvunm25ruziz0k79nykuncuqj5i7fwfhp6ppi93tz8zo',
                interfaceNamespace: 'jwbmmre29qms1sseqblw21tk0jdq3si7vbkqy8fzfpat2efdq28zv6tpuua9mcnhq3t4e9jeqpq71re6y8v7xqbeinnt185379smxv9onixm5glu3m9321rcc1x9gn3sbzw0ko2z3q3ljlfat39h4sl14kju3quz',
                iflowName: 'fnvk3ua3k6gcneig3xm7k96wdz418yfpnc31cl5wfbgnrdvvb621qa92paeb6opd82isjut0hzm6qh797bl7pz7ezz1xo6xt6mvifz801k57gzk7p1nduobrxi2230y34eo6pts0dh0aiv06xoj4h6l7mnar0myw',
                responsibleUserAccount: 'ha3uy6c485uuhlxzbin4',
                lastChangeUserAccount: 'wiyz0cqk58rzydhd60gf',
                lastChangedAt: '2020-11-03 18:53:19',
                folderPath: 'jm9k86e2lyc7xt8h4aoj3537k4l158fjpbpsjircxgpr12u6xl360eaylkazw4w0deflr4upofdh48i44kd6044feoj8uz7zwuct8k990zijd870y3n4cmoskaq1si2s13auexwbon6z93n3ou46vqf71dqzudypqe5bfq4plq1vuu59qln1noz182c59og298ydei051l3kti104irkhhax7zvpnjltbmow79tys3reo1sencu2380t7e0l6w3',
                description: '7y5likyoqujdiuhcwfjya2qoe2fo68mxpzdvi5n2xgiq305cjfi40v58qxdn6adamwp80435052dcd38iu5kuflfutj8nhfw6v82pnwbh372gjk5ee8b2e1cxwwdcgod6m9ryjj863mt3fzb239pnwjl5pj8nifo5q31xx9amo7x6m8ed7l4v5z58zt1qnzo14xf05z6t9t3qourdtydxz02hiq20oab8h79f6kg5s4bn8hgylmo1lvjpm174by',
                application: 'geyuxzr2oeja86wg45fqyqmcrjwb5nawexurql2ko72ffy7tj3x161tjukxf',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '60740a56-eee8-420b-bdfd-50821bd298a0',
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
                id: '2c7ceb87-9fc4-4919-8474-72a415086496',
                hash: 'qbphj8ur00rk1p2fv9q9czbjxeubw4k5fovtlflc',
                tenantId: '3s9bpyl6txfymldhuoswm4puevcx4u94imtoo',
                tenantCode: 'h7p5cm3b4li8u1mg25ph6ni8mmtw57pmjwnwlb7i2vaijqifn4',
                systemId: '32f7c3b7-a713-4db6-9c89-475089debd99',
                systemName: 'x1vh6g1tfmnq0tno9n8q',
                version: '2rhkqyw86ogg5awpy9aa',
                scenario: 'ttdxdtu4z3hyputxkhzy2hq53lzis0rlu7d0vq1mcj2cz55oburv4ft25a2c',
                party: 'x7sxqwktjk8feq59c5vfnnyb41kz81ghmbl2fwhrdix1nsg6upulbl9wdepj8mrv8onr6fgg6vh84anyrcaq5328rnbkn82a4p0n3co6oy790ap49bafm055mcvjtgn1l1n252u5t2og064zsy21zb72xecqivt8',
                receiverParty: 'hvf2zj2b7yr66f4sgrmvg1suzcoutoqrt8a1sj4a5k4p9yw0t32q7l71jqnusf3lmtnm7s7efedbl01u8zxqo42pjdnv2ga8mkdpcx1s5x88ztx3cke8ycrm4ty8xowomtwxdrua0fociof516zloh340m53miqv',
                component: '05l1s0ojiiy84ja2tyl71ky87vnybexcr6f3x7bb6hg9o874kh7jvjs57ou1m3nedsfrf6jk29gj7elhd176vebbkol9rjphkjx1vtc8az7offi7mzqm8dnj2gue8a0q12lo4qxq0iq30zysf9sp8wewxr4fvja5',
                receiverComponent: 'n9b2586qavv3gdv1pgh4pizco1au4t4uexolvza85pszqt2qzv1mmjkdxvsadg6h88dgv0ao8zarjcwp5vqrcsn5vwhypt344zqdxqatuzwdcd0zaphi1wksjqo8859g6o9aspkvkbnx05wz2wisnphhmwni4t14',
                interfaceName: '9hly01brrzygcdz0cq9ll3m7pplleizd2wfvvwm38y05vh0w2mo2hcw41n5f5mxde6xvb73ike6ixe4uhboy6hrspwnvjnetyl22mqy64dad633xko6p89eqwhg3j8w7t9xjmb65m4i7faugb2uqydvbc5gry7u6',
                interfaceNamespace: '5ftqe8ezdupg923ohhpbphkylprbs5dcovv8p7a9d4ck8vtx3kw5abynos2dw9ssbh65lavp9emkavks4b1aatizer2pppd70w67sq4zs4zgdb9c7b0dvdfapo3isqdyhl3doifs4thg36dqetcks9i1swlr9m8a',
                iflowName: 'a53o8ctinzy9rx0d9sryucqqygd91wtnzy0cds64hu9ertyya6jvqcqk3rkgkie0zduyj2pqmp8297vts5xye0drlveiyqfh156as9f30cr0pwrzw0bw1yl1htkddohp3pb8lqbje4zs5mba4yhcj9cdit3tsag9',
                responsibleUserAccount: 'c09uonc33q0tbn2eqr93',
                lastChangeUserAccount: '3sefif2psns1b966rpg7',
                lastChangedAt: '2020-11-04 01:17:03',
                folderPath: '3b2zn6fp75ghtiq4fnu94d3gu4fwwgitmatlxpcarlex0la5y41cblde87vit79obvwhaih986c2twf4rlssrqo5zxaqlkxb84hvu2mvq6wp1cvzrivz7t753pwgptuxmzqichbnp1vdykniv269harqmygq6g5fm9y2thvhqf54j39mdqfrdkvd2o9rw7rnegc8h3bc7z6srhzkew5kfp29lx6ybi1t6jlzlhwqemxh0qhopy6o9qaxjcnfx7g',
                description: '74jop765gh0nuc362by595ms6iaw6jmxx3ziz70ikwvixm4jt7rzjhwqfcwk8rneqg9sr47c0xd4648flq3v3gm72v69eal0v7rlbqdil1rjvb6cvs4s901veoj0ribq0fxe597txzhst5z3uvzew81tx3uas460zak7ya72nb28ohalnzr8jg0docoo931fpbztymudghi81q1snjlac077pch84evynetz1nkhv1n8lnoznqmrx95yfatp0i0',
                application: 'ayves1hw50p8ekinqmvl49m1g6jrnj86le2rpt8g2uca0acik2as6lcclhy5',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '60740a56-eee8-420b-bdfd-50821bd298a0',
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
                id: '2c7ceb87-9fc4-4919-8474-72a415086496',
                hash: 'xjvngaj95ar8avth5yfonnle2vzxb5k41eobxd1k',
                tenantId: 'b707273c-0f02-4f10-bc35-f9cb47d06aa6',
                tenantCode: 'ouuxl8rs3odtwsjxphw13x0pxhr7wulfcfa4evrv3eabiztsef',
                systemId: '4u9zbqlxm3gg24l3c6ym17gfac2rtvahqruyc',
                systemName: 'juq797jbw75v33btyxsz',
                version: 'sa5wvndl0y9lumf0tosf',
                scenario: 'imqdnwb9or3jbxd2jldiimwt911npisubnw2iy5myncny86522ov8s5w3npj',
                party: 'rmvqk3dwjo0yru2q7pwlptraen8litzho82ifi4h9z4exyxy289y5h2n4dktlpjf0rtk6reaaep1sjyt834w6j1fjo6zu83lloii077h47ejjc1ryn38rzxgtk36ezio8j40qfhszyuilqos8shjdpi18zm871my',
                receiverParty: 'krrj6p9g7mg56n2yfkjhilsb3uizg4dzhet34uh373rksy5fxudb0sf0llt6w2kefwnmam3xmk6tzcfc1kdfwd8saayb5u90u2jxwuhdbbkse3pak2g685a09gq09ju4r3gwlv6k0zn79o4v4zpx57642d9q70cc',
                component: '6wfrktqp7e8fwmnpv62mej4g7v5vcu7pze3j8b0b16sffck1bj1yualv8hgd0j8lp2t98i9n4v0zeew3ebavky2z23ikw343aznyl4xtvpinye8rxxy3ynwvsy9j62s16lhw1bnzmwv08i6a41kbbdznxbg2t1ok',
                receiverComponent: 'pn00ysbyk3rpdfx4wxf65nblsmfrw50acw665cyr2ca2iwql3zyx68mxmqbktagzgtkmxykhza87u8bez94o8jp6mblc8rc5ymgh8r0psy2wt5c8eervz1rxsmn6t45r5a3n0fljw5ilwwbekg002sr0t459ofw8',
                interfaceName: 'lbm9jq8z7o0dsvmp2hr7sd23di3smyog8w0og55nf01o2qw8sj36s99ia2pe3hjlcf3ohzh8gfwx9ya721257tavyonrl7av0o3c1xskr0bno7c69m3ralcq4bnpa3kowivzf49gzegodkno33dnzshma0guwjtc',
                interfaceNamespace: '9d1t530m4a4t4kmb5ycy35pywk9lj89i0xz9ddqpnls5peorucecsbasvo4z20q65kot62zisfh9o9ulrat4scr0ubco21lsqjq6hehkvxaj9t501dzlksindlsngc6aa3ul9wvledqmm2m38cv9ufstmrn6zzei',
                iflowName: 'e36ljlytoxxklsv81bqqrj4bc8a9n44y0jk3y8hceitq1so67alfnn35khnlby9643jj7y616xjyddq1fxlwujwolg90gji4si3asnjvdu3aneqjpfbeqj3st05erwbtj06qu5ur6l04fmojceem3x9asivcxu4e',
                responsibleUserAccount: '8lvnkuvqmxj1jjr36dy0',
                lastChangeUserAccount: 'kisdgjhapvel6snxqilj',
                lastChangedAt: '2020-11-04 03:07:16',
                folderPath: 'qiu8nqtvhanqqc19jwn8yd75kmqwhzh942x5u80auf8ibtowir5rnk0d2a12q4knd4eio515w2ica4xvx1rij7gu2qnnmz7htlhpytngndpx2ij6pnt5agir3i45w6rxkjp3p6hqj2lk1vgbmqmezrr8ks4607gpylanft94g86sq3y2x1pfnttite4nvbjca2nqvrjc1vjmefggk3komw0osmx9q1dzvqbx4ltbgo54s32klidd2ev4lwn89dz',
                description: '8ikm4efnevfgc5qrhqpqw7ib3v2le9yvn4s3sb9r4sejszk933c8hq824u968v1vzy1cuezjb4wrqiwgfmvy2tjz36jh1d5ybuzx3ji9xnkgubww6ppngg7tpdxbzluehsnhaz7e9qkk90hglrynmjbsheyeebistaqi7oio1lmu1b00kwpg3tmio94mi2k70mn1n572vkjyqhrn4uc26zj99bmbx7x92b8sg31vl7d5bgo6eaa44e5qyhr27pf',
                application: 'to5a39a0jsz1msnxrq2vky7f77811yjkyj70ersouksnah1l81fjwqkzv1bx',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '60740a56-eee8-420b-bdfd-50821bd298a0',
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
                id: '2c7ceb87-9fc4-4919-8474-72a415086496',
                hash: 'q8ls3k44z1row15zc0x6yq74gof6zsqu733215wm',
                tenantId: 'b707273c-0f02-4f10-bc35-f9cb47d06aa6',
                tenantCode: '3h0pov8fbjneeszrkj7llu83b01mvyq0jd0t6g31dk2l9s52m3',
                systemId: '32f7c3b7-a713-4db6-9c89-475089debd99',
                systemName: '96sdoek2ji0h7atwfytx',
                version: '8dbb2pn9341fxet6j3w4',
                scenario: 'y8ut3edcjot20ke0a098vexn6qoo28ltlts9tagjfgiwq8bu99on3glbw4hp',
                party: '3lbdaawp0e1x1dchm8xxxjl64z9c5wuzmd2l2kc1o5ya56n6lrhz9bdmqqvp7lwavyxvlmrafae1s44zvlsgq6q6ltd058azkexfuc659vzj8w45ohqdhqan6ukxi5ldvchqjkwlvnatirqlizonork849huzkyp',
                receiverParty: '76c2qs6huwwh3w499fp1vffqo5aaqn8h1952i4o5gq4prbjajm0gtue6i0p4zbia8kz9qhjyrf35pn9hacr9rkf24vofvx5nk34q0nxixvsdy2dby0saoxa7kkyu8ray2kkc21frqpi96a0usvfc1o7fyv7bhwj3',
                component: 'j7z3oodqhzb5auqwze7ydb7j7ch3anc1kqyim43feo0ongay9a3f4rk4agazt6bgvxlr7zcv7u6a2wj25115gpyslshkuhjd6p3i57cbxb8s9v0iw2u5fnshpmur2b95c8kw33u3fksa0un64j5y9bxc7728qcgm',
                receiverComponent: '2wxrk5snbi6nb9thlb04hdo0o4dbox3r0svypil7pqgmn2oz7lqdbkxehejvm19jsmwk1scsakx2lo9opw71tjnaualcp92809ev3wdjkezy7htfpk6zyg36gmrjzoya6z4re0iw6td3c96lrxmpgktd03pusk5a',
                interfaceName: 'tuu387y1r25qf0cjyeqsdm7boofdwj2e9exlyihmayarbp7jstt1nctcjrd636ntqfoxxyan5s07kn82pehmx6onhwz67nz8ioamau0fxs9vzk2c2wld58303yoh1ix0sw9fus8jor9gr3aer4zw2ypvc2kqefkf',
                interfaceNamespace: 'sn2qcrquef86ak0nyr3we15nyg6x63a4l9ye4ou6bats3juw811755ka60p2ite8n6em8uzmbu73t0j4ewfxmqn9hwkdpje80p6hivs8t9kfhe4tytrfw0jl01yf2xp28tur7x7ddanglcx1p1ffiyfmn8opeut3',
                iflowName: 'oavqtnpe8v4iribs2j3nr1kve3pubctezpadk9tors3clgseo6mjb7vfqzbuilf0jhqa5kwvsw0ykm1o2dltrbtp21u79073wrlpvoxpyu57zyd5p1l6595l597je8stpvka5fn0ol4le5m343r1tqyj0irtdsfp',
                responsibleUserAccount: 'wsisu852b4zobkoqblsv',
                lastChangeUserAccount: 'wu6uk8oy6giq3a5ijty2',
                lastChangedAt: '2020-11-04 06:51:52',
                folderPath: '5bnm8sostjqz9mwsk7o07d9d8761z1qmubysy8xxc30rxzd47m20mym0n64r98s5vpvlea2rg4it312uk0hi7boenvytrvcdmsxx9n012m5kse4rtsxcyhmc35wfx8ie496wzviix7tflrml7r44iuxwrb1mhc0l9npsg418gjmfry1sfdh5k6cj98glx6u7fo80c3y5afk6lg8xl8u7irkktjtp7jra0need0ybf01mm5295sgwwc093mrp0dz',
                description: '6pvj6evx61qxaat23x2khgwjwcy6ul8cm0y0f49nnar2bz8dfb2ap3ev7qdvy8fe160qte0lzclb30mnux7uviczqeb5ctuhddl1vlg4n3telvslbgp6np8ym6iuei4pqww3l1i0ifarq3rq3d17c3i62ulhhvvyhxcc64niv1c9396mz7thkyxztnrrf23fj8wn38z2bhiqqfkrunm726qufitz98tvmewz2rf1zd6n2dsrkd53tqlnr9jjooe',
                application: 'p79rvrzzas89nnupet1ojhatwe0283z77ywu3k5ia6raegnra31nezf9035u',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '38zjcnpu13bduw8w2ufi31csfanutel5bzvtc',
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
                id: '2c7ceb87-9fc4-4919-8474-72a415086496',
                hash: 'ft28e503ludkh3h9dmdh8ivucwdot1m3hnfpucn1',
                tenantId: 'b707273c-0f02-4f10-bc35-f9cb47d06aa6',
                tenantCode: '4f8inaao40j62vg6rq7b9sdz097vc93gaj7u5nwm1ohheaor45i',
                systemId: '32f7c3b7-a713-4db6-9c89-475089debd99',
                systemName: 'k9z4vbf066mzw02imirw',
                version: 'fwkzoyekjkrso5oih2sn',
                scenario: 'vg824wjk0n01huygwz9a9xpcmq4kxh8ccls32mfoh4p3do97obvldxeb6z2v',
                party: 'fbytejks0cducvb37tcynz2q7fx3uql4vem4qh98p1vc61w3szl2sufwz5x0nq4fm5b63sbn052kx3c61tv2w03o9jgsf6j1csx1tzvw9gsi4bkbq46he1zcqnxcnsdmkqhycdjgd641icflsqcicee08sv9gl80',
                receiverParty: 'pfzqsvma8dpl7ui4fpjl6cplhomoj1smjq86pav7wp0l5b2vq5mc73s9lcin00n5ri7jp2v8x42bpoomkqho2g5gp2nsktw7pgus46fuyvynyxs4cbtu1s95w2rgbzxdfvgt6pwo2kg99b1wlnik21mn6wih0gnc',
                component: 'ena640p8egwmiq1i7vk4feurdg99qb54tbwpoj5yg8tmpipyi3u16g8jhimb3941vi8v28hq4ns3lr6pbx6x1rkvdhk85sdf29sid88nicfkvpgkant9k46l2k08jaeb99plqnrikaen9dv9vhmcwzb1eh0p0g9o',
                receiverComponent: 'p4hr6tmdd66hjsbvk644rlcx2r4x0qa9hgrt9wm990pe61tqchfjx36dfxi54egsb0hylt717f954mscey8pxqx3z1py8esm5g3ozoeed9jduv7t5yavte7d9twnzjjhq7669aat1phs26cu8zjojzs2wkwnh5sr',
                interfaceName: 'uixr4svk5q0g4hedhreab69kie37phssahbra6dxwpyyietbffpq0waufod91quh4askoztwuv9ipdynqy5sh6tfgse0j56hcln5q3wk6mc2vh3t1orfopy91be04ulctycsqg23bsq83y9h6mapayjynvs43tx7',
                interfaceNamespace: 'cofp0ogyu8q1jz0ho6irqrafvmxfvjcm1hqwwcg0a0nfq3jwk81ntr38766svw8o4u7mwbmg5qegp8cd8lcp4stqbs4d5xfnitr7cfp5ty3nky2macksm5x8jhkutfxw36os4rhklimqny4r93toc2k6isgci2s8',
                iflowName: '78si95fdvlrin42j9frf4ih978r4itjjo3q3kem8ol5mi8l6ocx14p0963ttnb5sltbqkeppy1c0l6x9cthjrobr7fy1ers0t9ua9fo2ysx9iaxudrqjnqh7duzjgjyoty3qhqhepg7l6acltdo7jpcnj8al4345',
                responsibleUserAccount: '9hhtipogje7rcm8xfq14',
                lastChangeUserAccount: 'i7jgyzjwh82pz795f3s8',
                lastChangedAt: '2020-11-03 17:05:18',
                folderPath: 'qhwhpv1bczvrj9xqqsqg6uksl8j7ggnbux3ydwvbp5w1xvgny4dc75eq563ye9tb7o63koogisneesgvatrf1in761hb7f63d1wfhjxv6xzcamveqi71h3sygxfmilqwvfqeakmuug6nbjhyfehvee70nr8xtcmi34qrayiurpvzxwixikccxpcjvkc0x0tppr3y7ye82dmh59wlwcyjtc0pq8mppgual4dp90yt5k1c6b5sxnh9gtfm2afwxzc',
                description: 'g1cki3fyp791tmhqsu2qdn1b5lbuuwv1xxkmzpi8zixg4zhumdo3b8lfrcobcr06jwkx2xrd08yetzk45pcv5dcbdx98zrerb361hhjbyzq2ouluu3b6n4r7a25x8jxib2wxegblm7vlbkvk321cx1b61jzxhmy2rowd880u3z1ub27wc31xlqx6t8y0yt5w66gj896puvur75frpaiufijgmehnhf4oy1424zsk1ndxqdtrr9n9ztc7nkjfoxo',
                application: '0x4hdkjfr77xir2kw531cmq156enypq4v70t17c30pd795gx8e19501m0hwu',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '60740a56-eee8-420b-bdfd-50821bd298a0',
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
                id: '2c7ceb87-9fc4-4919-8474-72a415086496',
                hash: 'c0rgfm4ol6m6q91xxzz6pua0p7b1en9qfrwgqhre',
                tenantId: 'b707273c-0f02-4f10-bc35-f9cb47d06aa6',
                tenantCode: '4ic8mmcycakkpbfktl2f4vwhlv9hq04jmib8s36724hwgxmqzy',
                systemId: '32f7c3b7-a713-4db6-9c89-475089debd99',
                systemName: 'ldad5urqf7dmcsmwkuim8',
                version: 'm1oppx9ohvt6t6fu9ny1',
                scenario: 'ivfi918937p7ip7g22k6s99l69woiq6vuytfssothpenkm82l6jp761vzhdm',
                party: 'sdeqrcyfkcbrz2e9ce4k8x8s2xwcc2r954a4n73cj23p3iwfgn1yt0619aransx9k1rnjt5m1gfelyqoviy4vf5lussjv4dy2wf1e4sqbvkv38ccn25k0uhhx8jrip5m1amngg3rmvcxc8zszv1z0imgrvl4caql',
                receiverParty: 'qpapjxoh2pa0iyzle289pijglbada8gp776ck5eq7bmxgeqyxdri72m7qk2mch3nwrr30iuqaek0ojr3wxdfapbob5pzqjiupzwtu2itlwf4l5t2zw6u2af0kytyco2zyreviorgaob80aoc53659z6cmhcc6pyf',
                component: 'mf1g94fe27m2fr2xprr2v0q3t25xql90m65zxymet2gy4gmps3grkq7i8mx3aag43mztnfrrusqcvkujc4953a7tb5v3j3lyfyjio5ikxbnifmehn3nn7k4b4ah2uyqw9gcmjpzdm4lvcvhon9rcqwie2ia3v956',
                receiverComponent: '4apf3by05ggn8qy59oke8ziqscjfnhcly6pvmd5raoukbyh5etfjyckecw78yt3agt43a16wa775ulc3zu43zqkt2buh4w9qwxagqqtuwx579qybnjxa3r4mkqwn4i36c5ao89rm9iz3auplha9t7fp4mf47zxzb',
                interfaceName: '98i7eixv0kgr0ukwzqmh6bstkbosn3ef0b5thfgv6e1kc2mj6pzhz2ex4ocispyzsznji00fm507059idloiidferdx7i1za0ep8ytaby8gj8a5r1oi0dcyye8vohjzcersz86qcop4ewjf17xsl9idarglnm327',
                interfaceNamespace: 'auxmb39steohg70wmlst52792kbmoppid63fl8zo1k2jd5oeui2z4zo1frmyu8dsxa2wfdijz79v8tipg30ujdg66vphhaergiojciunx06h9ebx0n54jce8ghurudrp7lo5t791ngq3bzewmw0vjnyfc25kqljk',
                iflowName: 'etvtf9640juyi55xuo3an324a2kmfgjyyni4gpysjtzp2pkzuw232j5l4tyj5q2l1s8rps4gkek1v2gaqlnahtmittdt7pzdlqsoi9wwl70971fib921z265sx9rq27kmdujyrbotf2x3o5rtv09gcp969zi2o3k',
                responsibleUserAccount: 'mannhxl3sfx3xqct7xvk',
                lastChangeUserAccount: 'tanhao2b5e979txm2yh9',
                lastChangedAt: '2020-11-04 00:11:03',
                folderPath: 'b4je1qy3vpi9di3nx7kg12cue0l78bshm4ig276r15tpewgai8pppzmo9xtov7owmf4jboimhoa8ljan2eq2ub7l06limfi4a3k1wf9ib0oksdxl5bxw8ochc9lnvd3hlmqzo8hjrv54qpmiyjpmlquvedn6xl1jk88os3q3grjpdslrvnia56dy0xvggj0d7nn3y28vzj8qubgasdmaa26xekrehoci0f0lwxvxaglaesjvmokpo1ay0yppa8v',
                description: 'cjwe1fi18sjyl43v852dfpnsp8kjnqttkad5ibet10wr8kp22exfqfo73d3llqbg8e6d7h8irm1l4g1gpdrm9h7ojcmfwtwminitt1xevotkdk995ovhon9phn6sj67xs9bwd4idu1rx78a6rohdjsh65510cywovyupvt22fouhyspvlxft6qmq667i7ns6851uohb0s4jl7oox3xr2fqos8ztz226pcfwbc9loo9yc9imp6ynip4arwb01kwm',
                application: 'v3xs5adz8po708194kdg0vb0q797c3xthvt2p3sq4z2iuxk7w1is3l1sy9nw',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '60740a56-eee8-420b-bdfd-50821bd298a0',
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
                id: '2c7ceb87-9fc4-4919-8474-72a415086496',
                hash: 'sw2dz3r95eiqjpub95yoze3bk4dhpvfumbsc757p',
                tenantId: 'b707273c-0f02-4f10-bc35-f9cb47d06aa6',
                tenantCode: 'e1esc0f07z9nwifdq1b0m7i1gvrs58o0bt7myjyhugcb0d3f4t',
                systemId: '32f7c3b7-a713-4db6-9c89-475089debd99',
                systemName: 'xl7jpru6fw3sha6lrk28',
                version: 'kab402j8ccpwqa3ytern3',
                scenario: '29v7z2pguc2cpr0qc7zo08w2dq5vm3h0g56xuj6166j79j1le4vkpfywb8b4',
                party: 'sndh2oyrrogqo60wyz5g5xtm6y2q4bak3kbpjimjevzsosdok5tm6yl2s4qsb3e3omz0plbbgq3l30vxr34d8bvqe0ackklnnlxhi97mkh01sx35zob5fqxdq8u3jqi53dmpv8m83asynkx0uxf6eqhjhtmdy698',
                receiverParty: 'ity2d87qfe8je5w2jlngmb3k7c9qxe7gl5cqw9v8lhhm7w4c07w1wlsvbbnjre7chsay8s1li6gizhdv9j0n6vrgt12d7qepkdsfqp1bao90y2z5kput64dfxt5bkcgyttthtep17kuweyya5kl4b1x4cvrflbl5',
                component: 'uslvgcy7bqz4vlfci6os32zan4hj8vb9sw1dek7ubac1ynl8kepvmvbempv3qbw0dw9qrqd0pa5dkuogrhpibywxjj3373ujzuxj4b8buv2267u5jdc43tdmh8971y9r1uqlamri6ua9oeki1evn63cmi27q566f',
                receiverComponent: 'x5y151twtn6n2sy4gw9qyn3apc2l3dpne6ha9s1mgjz7qjeeuf2aidhiuebrldbnceco3yrejuycycjgvv5a38dcss8anbjnlumpjr2iumbi4h20328lifbd8h5vxw2r5pzxyt20dlw2dn1pra20hgvurgeg68hd',
                interfaceName: 'wd0femejo595r0iqjxmdhylotqn6kb1q61mclft26549e3r695jtlaox6o0bk7f5j3wek1um1k2sj61kvf8eqfwy5xgqbu9b9edg03jgxzjnbaicst1ycvean0dmj183tp30pjgazcck585ttxo90ubsoppjj718',
                interfaceNamespace: 'z3cgq4a2ujyo4p2dcwq1bg7pro2qx4r5bbjtm5esm1vy2lx33vqa2vaf2gllkesypfox95agv5sw89nnl3ychum074coo86ds917ovbzf7080rliqfg0orax20raqihnial1g8sz4wznnzag79km82hnkkg3uagl',
                iflowName: 'woweijk2w3rnfcr8g6rwlw897bqzwicql6qwdzf4yv5sbr97zfc6c946qu1ro7rgp785j93s234bzy7j72lajmv0grtqpy1iogm7h5jy8hdv39jrijs9nz4idmyf8ukj95yjjqirwl4vb2s099tb0wb5epfjdvk0',
                responsibleUserAccount: 'vxzp90z137fr20ncj60e',
                lastChangeUserAccount: 'fgy61q2q3x1dqii00zdx',
                lastChangedAt: '2020-11-04 14:38:39',
                folderPath: 'tuyfzemnxngu9slgiw2bz5i3r3pd4j9zlk0veo8bbyg9w299ejz8fii4465fyrhblptii90anrrvzsu867xt5bohh3i8xulzj51ozruzac3gt8tn395yuoxm1pdpxb1qwfsa4abjl9c51f05slfpgk0hiys3focykn0aj3je9sgrifb70gn5fhiu5g3auqej88rjx1866leq9nfmustk46c0hy81zmbnx1vdtipezhea3m2rwjmux3wfbjtd3yp',
                description: 'c4atimqg9ji4j1m3fj7k7icfwp7horyi1ju6cfh05l5v2i7s0mp09515ncwwzaat56mnzj1i6ltzta51pgrdv9oz06xf431djbe48h02gchgm66wuxawwk0oihx43p4hba5oxfn7rp5vbdw8pvqwo3fb3xkjm9s5apqqlu0wowkym0jupit62y79gt3h7l6dsp0weza6auvcmwxc9dociuur1s69foh8eyjpkolrnzlcpy5bqcdzh6taamuyigq',
                application: 'k8t52t069idzaazisx7um851krecaou8gplrgfx24jg94fpujdnelgn7m9ze',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '60740a56-eee8-420b-bdfd-50821bd298a0',
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
                id: '2c7ceb87-9fc4-4919-8474-72a415086496',
                hash: 'hyysvxmzre9ie551arjf7ep4xmk8zi16mufkdzj6',
                tenantId: 'b707273c-0f02-4f10-bc35-f9cb47d06aa6',
                tenantCode: 'lwnzwz31cv95x5hl6qq23yh63yuqydex7iefc60w0j91u6x0i0',
                systemId: '32f7c3b7-a713-4db6-9c89-475089debd99',
                systemName: 'cum8tr7bevlewk8q4646',
                version: 'mxufloa5c3eh03y5efj3',
                scenario: 'imab44dx6ija4qg34ryf1juc8p5uhnxo93u8n9v0l67g2mbuqpwcv0i93zvs3',
                party: 'y1g9jyf1eap5uvk4bvcvoispsux7uyducvyg0yffd8shz2mdrd1g66mlxtcszvrmpum816eqzvg8uylbwt6w97didwwqujdi4irl475wbvrz9dnktt6abjz4k1aqjp026zve2ovwosf5lll6efqmoaoqjhlmwow5',
                receiverParty: 'lezpcbl4i9qw66ee8v00so3h8ajdg8u50kdlxrrp01x518jjm51j7rhhbfwto18jo7hlkt9n0hmnk9jz1sr1ieptqg1gulb7r1tlgj2v8dcs9k1khilpvlagje1wv825ylvnq2r0e0jj1sgh0m7z25e6neywaibl',
                component: '8t349yh3potgz2qy4deghepvnw5on84usiee7qoiwdrg0pmc55vyardejtk613zptjbpan4zagsn6y8fq8q74tuxhur49mk1v3yiqdw8dxpgewll92ish0tq6wvem1a5zy0vxe56gfe1nezyhqwlfjsqynnll502',
                receiverComponent: '5uan6xuvzn6izi8kntjimu77evvls0r2dj1vpyuevpirmuk4j7ksmgzgushegnbb3hd45haxmh9x9xi82q1v3eqpazy90b5l877jkl33bqw3tiqjwddyfz83grnqhceeknbkq4bsqyy1nrnl1h0yefdmsgeiax64',
                interfaceName: 'ze42lpladfode1tu4curytljxwpqb98nbnr4hx1csv9omumzde1qe1o349mhuw5affxpjumaujp1tklqry0c7kacpm68rez4ct9t13m4mfz7t050m7d7d5utji03m33j9ksqs5pot3c2qmwmgn46tdmivbb3opqx',
                interfaceNamespace: 'lxlwi2r64y2lq9u7y967h73ljmazaoqcctj0pbtgb547buqnfd2v5oqtvva7p3mdhri16iob2kaxbgy4g4jrvbpjmc70atucf5n5e8qp6smtdta2safcv7o62heed23ek7m3lc9f9jvlzewgquuqvfcdpfhe2d4g',
                iflowName: 'k9jdvydgnk87l7ccghm8g7dag4j39z2fz44yw7i5b2vdvwdkxcq0spa45i1sk96zikfnh1p0vqr16yjjfjkaygccvs2yhx3axfw0vaycrp5k0nf8ly4s9rmyh0e46jesk0fqpxhhb88my3fdgolbp7o0ujtgr6zt',
                responsibleUserAccount: '1xzped16odwr5opglz86',
                lastChangeUserAccount: 'ysrm0wibj2lbp1tesmq7',
                lastChangedAt: '2020-11-04 05:53:10',
                folderPath: 'ztumzrjpqe1buuizepj1t3v9n2m4ken52fgbwpj9ni0wkovu5xmsrm5vadylcknnf024fqkfzv4d1a42quotbuj6tayh2kzse8maohaux4cgf1yhwpa1kogbo58xx943mozhz6vrpan6e0yejoilzfxo7yoqj496j8gdiyt4jfas7eyn0gac5w2eijgsd1op1m1b7biw3sbzs7zqe5hnxwsxgwpzqwrsm2m19sqioz25d89efxq296ssfl1k8sa',
                description: '0ffo4htoj3sfkouei813c5dp3km8x08w1maa2temp6nequutdblptpvcosrtl15da8t4jqxluipqtzwkzbvkcz74ibuh0ldd8ckdc9lbvpjr95d6bdayqaou1p2y7s8p52jqk83ii68woam7mji990k49ffu5wlf13nbh7advzqdvp9pjn08twtzl2b51nmybclkkx7tqnvifmuzs4yi7p45e1xlzvlouxs72pqy0ymm4sc41j89fdz823i1juf',
                application: '54n4t6nzrhm6dd3x7h5od2hvrkr0fe9c5o1un62yqzqikipgp0wl3kiet21u',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '60740a56-eee8-420b-bdfd-50821bd298a0',
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
                id: '2c7ceb87-9fc4-4919-8474-72a415086496',
                hash: 'i83legm43ycue3wwocxw8wfzppfh9cz11k5o4k5h',
                tenantId: 'b707273c-0f02-4f10-bc35-f9cb47d06aa6',
                tenantCode: 's49txgbcbcxygh51yoinygfpfk99zzrekb80k9rrg0ej7zrgjr',
                systemId: '32f7c3b7-a713-4db6-9c89-475089debd99',
                systemName: 'tk6omvqroz2hdio82f60',
                version: '4k6o1656byhmalbytig3',
                scenario: 'qnilmnkv8tvx2x2fpzgdbsil4yvdoj6v0b3qnq5uxad6kp84dyocjv1vqqmo',
                party: 'etwr1ic9tllxdftu4dfgxt8tafpsb43jcmw7s70jcolae0wdsuifcgtpeqw3up4pa9x978g44busreqalf3sqsxhtfrahxk0l9k94qjjagy4qc6b9pgqujwo7niqysmx4yzgp7rj2ge3mb1bjpacu7sfge6fi7k13',
                receiverParty: 'ndnh6n9visxxxbntr1vapl8p9p06us8hs9ndf0gcc2512vmuuypj7fzhd2w3fln1khvc4kgug60ts9qlxa375b2k87el3mfaka6kp5j8tdbmov8wx71cag2gixbxxqhbw7vlg4bhf3jbeyirvvuku4wsp3bh81nf',
                component: 'p81ebvogdos9qw0su2tldgplrgeo11prn3f66bzct8yl6pujqifqny6mn4ng4g8iutlry1vvn2xwf55823eep478so1u3ef9xs7zu6hfcydc5nxliwf3ph6f6o9hxtkm9j2gsmb1mrk4honl88049acvv11g8ulq',
                receiverComponent: 'uqsicbb0xb03e1swg7v95yb2la6l6grv2y9ubob7gz3psxw1wadupwjl7gybhldw9yeao7e9jzjy27c7t3mbmcnub01x6c9yrntjw9mxlcesekj7mg8y1iv475i64vwroooeh39ed7nmvdnpajpozelu9n2y1kwj',
                interfaceName: '7v449m61xszyswpfgi1lw4kjmyjzfjxue2dqz8u5rr7cnrgp88osg5mc5wzmom70la67wh2en6wkvaaji0skng8as1la6eegtevci1877q1im8rd79kt0tm8hm82a0g60obd26k014hdzsnkx9vjixoe5ocjlj4u',
                interfaceNamespace: 'o8061mtggjr14zcw5m919vwf071ossdwdwa5y6hprtjugo2d7o8qjcbobddduzggz1f1l3x2ypjt8p6dya1w497hxz2o59aeb18dcgikgzqd9wxy3647gbuy5i7t6r6e80f240zokh820hwmg4ufvolb2nrxtpvv',
                iflowName: 'n1sc7tcxgsuqrxfwkezti0cqc70ij81tdwzp29c7a8b1ufjaey8ru4oyj04nlrbvajdnfyzuzals67egdslakkr9we2ah9ekbbp5wjirzf4sk5yw2ik71kmhk4x2duam66cqjlvgddtbbvdj298nmcqf7lfx9hcg',
                responsibleUserAccount: 'r6eyrkz7y0u1czetlss8',
                lastChangeUserAccount: '77j8vlk7h8g7xkww9jnh',
                lastChangedAt: '2020-11-04 02:18:27',
                folderPath: 'jkwsn7mbe7c4zo4ixnofqc5jnmw9lc8fbn3omvs1jmectwtdp8iav0z6zf0dhfynemcvluf98yzlwqa7anln7hktycfpxw1xegrxajctwhhnqj4fbm7s8jrg4rasl0h3ear53r9pxh8jly1vycgqagetj9onm1aj4yln06y88tg3wqx4dw0lhbznywfzz0ftkknawed03v1wy6le4i11huw93evn0vmly39ksig5c2t55zhpi1xqvwadt45o3w3',
                description: 'p9rj8g40hi29r64e182ns5dnra4lzvnni0jlrasb5qo0262w7fzyes8rm8xyeij31y6h23ding3oa1zl7i5dshmk2qiigz7ix4altwl9ey572bylhyywn4humx8qhcynun2zgne37fefzaxy43bhowoaadg2ua6xa9ezpx67siej94vxnnfbx7s8xrvaund81wknndf900mbda7l59verusqhr0apxthhd5i2f5lmwlodkbquqom6h6spoaatez',
                application: 'k45bv2s266xhsf1uwfrmqhmf4yfpcbn51wx3vg1d0g7wb09soqsb4kuc7lvq',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '60740a56-eee8-420b-bdfd-50821bd298a0',
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
                id: '2c7ceb87-9fc4-4919-8474-72a415086496',
                hash: 'wp2g8irayye0ai5kic7drpxhlh8wouyky418fbdw',
                tenantId: 'b707273c-0f02-4f10-bc35-f9cb47d06aa6',
                tenantCode: 'hnn4rpz5cumz5qsg4tqxu5gnwo9vylvcabpo1gx98reg4ybxtb',
                systemId: '32f7c3b7-a713-4db6-9c89-475089debd99',
                systemName: 's8aeqrxbac1w3wmf9fya',
                version: 'f3uj928d8jgcuuypmlj6',
                scenario: 'i91d51t9emfo9s3gzqcl634wdcc05eet3axo2yglqmitz4brnzpc2yovo44b',
                party: 'rz8dbxuoz7idgz6s936cctnq2moov5indg817dy4i0qvxqp9g4s0kmb1053v3kt8yop6j0a01hut8ji0jtgelp2usg3ibhp0x7ja03ehqqoxozr8lj57sez3yi54ltb34qu45gxibwkin89wt0bepq85qwbhap3s',
                receiverParty: 'v4b9dyqmptnvhwnjjx6avf10iqax8dag9wucmz4nx980ms4rs8vkxqt2fc9ouotjcbpyoh6jx5plp7e2x2hcyvsdzw43l8djd1cjlytrpgppzctc6k6s9piwitnbaiezebo05ynmqgueucblzhok1047vbsn53uot',
                component: 'cgsw20ji8ytgwbbnzqi8jvwgp1mzns6oz0tmf6d6g2etcaedxk0jqfjbklozc4iljl0hpudhv9gr7br6zdojqzo8bun6thq3xgtmw821scct7qizm7ibld4y7b6eiyzxyfz2ouo7rhihgfujrwc7ia3xcrplu3qv',
                receiverComponent: 'mnqysx46fxurxt6n14juxkktbbic4ze4mvxz9zukeg0k5c6jo3j269r9caokumrzw8sn059tt4gmnz9krwa34gesx6ff8encp181nmt0pnecld7ngwalj118sfy036bh9pz685f1d29j3a99z8qa43bxeo9n8q6v',
                interfaceName: 'cz20rxfhdk24j79msckvtm7mhlq4vxs2shi2kiyp9izfjlbhtpuoft2zios1zsywg6kdht28mswbj5sxq6743llqm45k6as634l4x69buh80wdtr1zne6lci6bij8x16w7vm0hpv8h8btmehc3qwli5er05ycmjp',
                interfaceNamespace: 'huv05a2r23px1serr1o61x8cxxxuv0lki4t6uoaiyklp4fnfr595s21iz847cim5ibbzdl6u0f9bffcswfba60eqwyhz1fztntl9rnizyjmy4ldt5qgnzwda1rztfjd2zn0snavq86ua8g99b7jrhpny5i49vqf8',
                iflowName: '811ilfka53qpslw6truokaik89s3ri6ojs8by0toq3qsvgf9zv55zi22y6p5k8g940gjj2zjs3li4x6mgdpc5p36deizrqynzxhwbdm007ylw7bqz8kljog67veb834mydh8ly8zvd8mmlyar4pfjqet1s76oxfc',
                responsibleUserAccount: 'wjfz2x9p3rsxp0thmbc9',
                lastChangeUserAccount: 's546j46wbrmdlgyjjebt',
                lastChangedAt: '2020-11-04 10:01:16',
                folderPath: 'rjy7qkvck0x151zc4iesqh2wa5of8lgepid8q6pl1l3pxwxzdrwymsn7r4fg2cxugf7xen76073e7i3ebmmvq1k4t5ciiuzi2qwow39bknjtzwcq3mxyopx4xky7moz1lbiooo5z4xngo2pqtzou32qqxuyaayaygz9ihap01uxjku4bh0jymjaxvg15kdnlj9qdv35gx2m1detnzp4ebd4oqaxfu3kr8mgcsa4mnbl5t0wkn0vp9k13rwle5sb',
                description: 'qzaelh3te3yua1o4qrh7k26baxam3l5693aje5ajp3ogeumf9rlv5ui0fpgqqlipq84suasr2feo8swre0gq3l9rrxhsz9mjnh3r09ospachwul7ejhr067zup0euwrcbays83a9yqfs7lr4ytngmw1y7jtxo1jttqr79dxpca9gqhzpyrjrz9obsdwy73b8oxdkhz8cqy8d8givmwdjgk9u6nmfy73kl45iartu6mxurn2l8cgw0j7zffg1oqg',
                application: 'ndiisevkxnz1pvyjjbhvceuy7vzblve6fzptdap9g667rerypg0jeqbfmq8o',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '60740a56-eee8-420b-bdfd-50821bd298a0',
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
                id: '2c7ceb87-9fc4-4919-8474-72a415086496',
                hash: 'mdu0r53fyeuq92xevjhwnbe32mbg3wb9kjoxcz0e',
                tenantId: 'b707273c-0f02-4f10-bc35-f9cb47d06aa6',
                tenantCode: 'uwiv2xrs2usijfgpoz5qrgxkk9b853sufi5740ibbyhtjqyxbd',
                systemId: '32f7c3b7-a713-4db6-9c89-475089debd99',
                systemName: 'w2c8opvyb3qsl35qv7tg',
                version: 'yxgoveul2gf6gxod8otp',
                scenario: 'j3krrrrkos8q0qir2rl0o69gkhhv03ted9tyewqo0j7559xq0q7q5v2ngnvq',
                party: '68u52p237nygozt6l506j7lkr543b8qmnl2dd60q5zpzx715bd23bdcl0ek3f8ce440t8yy5mrro4er3tijq0lqdkl94lgz5jeiomlr07u03auh6op907d30bze9bzo6segj0ipkgebswtm4qrq5tv1nh4yjfnro',
                receiverParty: 'bqlswpdfke3qv5btcttjxh8x73zlp5488j6z1m2mqmikfa7znnst6oeg64vhq0m53dxddm0kzfykorzwvwfrnr49j8gwvh4ir4el6gvnwb3888egssqis545rfb6prebpimq6g0gwzc178wj350ue7pxcj88lto7',
                component: 'vzpde3ft807pzbbjys1envq3xve9v1d0pkn87uecce0j19eyo6hkyobxkb0twstlfxuefnqstcdlzpcfl4w9b1j4p55gm3x0zjctpz6ktbqm82cln3d6osigyor3agxh19iu1xgxf6ocpog7bz2y2us0iz6ke9yoo',
                receiverComponent: 'dndf3mbs5xud2yyu3ssy654m71i2uxe4pztdleoolzy88bd0s42lpebr2wfyr1rsepasea8ni8u9xj6e10s1rig5hhug295b8ygblodee7hi1av3ivcyke8l7k3z0boajv0sc59tt310dhbkme6y3a7kytc6odag',
                interfaceName: 'xk09pwa2k4t2caap4ips6bsfwwnwswwdzhlacultqjc47ftixszo4x7pxtaep0e7ct0qwjr5e51oq7eu862acl2m9y84qod3njr7qnzvmhiuk4r4nbyqo8ai54826hvsjin60dnw60ao93u74h8svj4y0486fwbw',
                interfaceNamespace: 'zqcsjetpliauynfytojbrvcray5i5wga854v29lc4dfszmpy0y6a6v2c22gxhnnsp6h6htoqpsy54iqvvqp6smsxsz1jfl48rzer615tgpcgjqv4bmttg33m3b8phgui9e7oumb7buqqnxliamotc0r6z8vcldn9',
                iflowName: 'ndnb5zbaxlolweh9ylnms7gygt600l6nglg2x0kqjxdtlob0bzfh57y91tbmnnujk7f4y0t3ujhtuoh16f9j221i0z67ntksh9rgf6jobyywn9pdlttt84v7iksxe5aqfif29xqglfb61c4hgpsghzk8xdk042vz',
                responsibleUserAccount: '2bq968e2neo82nibxtak',
                lastChangeUserAccount: 'yfmmlq9sevkl5fw5cnbk',
                lastChangedAt: '2020-11-04 05:12:43',
                folderPath: '5izqag90nfdlrw18c637n1omzj30miacnivxy3w8zip0nw7200la6g7377dqs24kjxffw1gzouqqwzprjkw6pfevznv526lcd499f62azwtap6sdujl0kdfbu47bhwskodn1yo9fd6ro7mt3l43fhhnnh5x1lxl5r6kayetn3k6u23lykwkn1ah9inlm53enw8r53e9wyuoe8x84juzm1nqirbmwo1ob4ag3mnnep1tz0xoi01d5mtjfxhwxsye',
                description: 'rv8s3bw6jf9mdcspxcp25vrwrslwqz6q8fpig7tvrporqkuvx2hz7ij4wtm9ailu3mhrw9t47qmx2ktgsnc6lmwgv2lid8ga24o71n17omjwq0i7xvv7igymm51c2f4mkuw1x50dctughp6ge6ukjejsheef85svkprcebqqcpm6ywyg0tkjlq069m3c9t1fxxgna36ppyyhzk1mbz79uknew2eaop4jgzenb6gwpxocyhqvxlkblr8qz18ioap',
                application: 't4p8yx8wegxjew5qasz1e67jgec6smynicajhemjm68dhntj3r1ok1mx4opo',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '60740a56-eee8-420b-bdfd-50821bd298a0',
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
                id: '2c7ceb87-9fc4-4919-8474-72a415086496',
                hash: 'p6kngwg6q0e2fo7vplcrkv4csxp0zu2q8yesysg5',
                tenantId: 'b707273c-0f02-4f10-bc35-f9cb47d06aa6',
                tenantCode: 'tq9zyds1cb0weam65j4v5iz9wum0vh1ar9jy62o2axkd18dpa1',
                systemId: '32f7c3b7-a713-4db6-9c89-475089debd99',
                systemName: 'g9smj3prihcohsxi7zb4',
                version: 'j85s879rzgiryyzv0g48',
                scenario: '2pjfhrmed7opwqilqeeg0fpkjllfkowa35l4o6v60mu7eylaopvyfyjh2skn',
                party: 'b6vvm25df8skf9664asnkxjx99omoanpac5lgv8aaao4xh0v1ohtt0gmevnf5m80iuxmsz61rnihkbwle8dzvs53532nrzpexchpzo5f5a4an0we94gldcq7sxjuvrw8nnkz9yoep9yvi9xtu9wkg1e9uvawgvdg',
                receiverParty: 'nuaf1a2zinf58xhqgjswozlw0trgpiz4fu09kifov2k7ko77fiynrbcoplsxhs5zm9bcf0jikm2dovij56hlnl4w614juow9un050dhzzdybznt01okipbo4ph9vavjl7yo2ntyi8mf0cevsifdd5l4thln8ydxu',
                component: 'l4tdvkim21wnq4gmm88kkx2wbbmaloa2tn6qkly0009syo698pg00pilu14qg8m13h40scm2ccdkfo8o34i3xfl8jyt0zi4plirdcvmdf7t6gckksdm8mz4cj2ky7977s1z843f193xvbrtcvu7wmlzsw7aaxlvu',
                receiverComponent: 'bzc78uy1b6re8lnypl0zyqtpjdrfruucgfmc0pwmadq4qn3n71zwp7z09agqqoyumm7p71dvl2deo1trfppkqn5is4z7gx2opwn1z4zfoh958dcomolsncli5fybfl0c0j4ytu0lg67btwmeiztmjgtto5d5oq57e',
                interfaceName: 'cdwg040dawhzzlduprb5mwet1t65ct8hobq9kj1vhsssloyr2py778yuq601tvyhpxvhr3whhrgaifoi73wbyu4gh2faqkv8mjxpm5u1kk4t8p294xg733794efz9cyhssm6ckt16du08wjyuxke6u8a9c65dt7g',
                interfaceNamespace: 'bn4b70y01bnqerzomb53jy8yjk8sawjjk2wdpkyzrhctujbwr21ohgi5yu41o4jfbvpiyq4mt9an3amhxflo0rvkrwne591yk7dnq0r2ecxs9m0k82deh5bs0ubmpaj960fuj5sxtajnfros3dd3oemymg7edxbo',
                iflowName: '6y7lumvfhwbiwvm6sp2dxjvioywn1cu53pf89xvicegnv8ygy32945yrolhvw1k71vynvpq34j7oj4oc5m2zol2dwgx4p7nkxhfuhzvdvhn28h9wbpid7bzj23hwpfl2aj52i5t7mw8w50erhre4o0lz4n02t3mi',
                responsibleUserAccount: '05e8gtcu766ltp1imuua',
                lastChangeUserAccount: 'xd0wr2dnew2hmvmm8j6o',
                lastChangedAt: '2020-11-03 16:53:48',
                folderPath: 'ktgakdmheh5mf5g6cttto2og2lshp4xomtnqtb0yvt9cys7bi9rqm52k040n5zhjj9vk7nhdsfgdkt7y2mopey2zolkmwpqs6wwmu0qcemtk2cdi58cmb9a46qak4pq5e4urugf6mhpwr9e1kpc2byj2dbmcbiuvdf33ru3rmwudu0kgucobn6q6gt6bpopgscq39jxt0e1ihl87trrlffxf6p9hbngexhp5nlz6fgcc6l5kj7v1upmfzxaxyho',
                description: '50pp447b7acisfjjh5rpok37j5m14tijytskgc0m0czb8xxdxittlyr4amwms9f6yry9kuzexc5nknq9w6qx0aqs6ayj26tvcneygaf27lu22tr5863mw7d4glw29qcbtqksb46rim64u05tn53hoqpjxr8ppf58s950iiphop6qnsfw2uuk4e0ry7qqhj8cfhjz8d3rg6cxdmw8fofwzkkk1dm75443fzb19dftveyeg43dv4l4o1de3s6nblp',
                application: '3d9nl958nw2fr9ckx3dhdr7f03gt70jw8pgokyju58lwojhgq8eeo4iwrbhq',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '60740a56-eee8-420b-bdfd-50821bd298a0',
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
                id: '2c7ceb87-9fc4-4919-8474-72a415086496',
                hash: 'kqbkjg2avru28hqr9heg6c5bjtnhb9bmv2y6cdc0',
                tenantId: 'b707273c-0f02-4f10-bc35-f9cb47d06aa6',
                tenantCode: 'w0nszkrkwdu7rbs85ebanw45o6r9pu1gegzd4uw6yglazyhc47',
                systemId: '32f7c3b7-a713-4db6-9c89-475089debd99',
                systemName: '8cjezlybw7e1nfb0a71l',
                version: 'outcsprzm4w7ehtm2qui',
                scenario: 'ahllzyz0w5sgzabbdqexfoxzwavebmygzabbd3o5dr84j9thmrsev14auuy1',
                party: '29d14rt0lbzpxhp5cffkwer795stmvgl6lo3s5f2ilww8jylbw5swn0sefv6wfgj4bndnihoz4fjonf7g54x4pxr5zge3ng0dxiqxdb3hcmdwf4j7ghydlu9trszj3n6tjmmukd3zs9mj85anh4cscxl0ks9mctp',
                receiverParty: 'gss7ns8swpcuzisc0ouqhaw7o2zwpxh8xinkiky5w286g4rxp0i4jm350u62h9nqab8hvxif9w791ycbdy6u74vcoykuqcaz6g92tfiylxfj8uk6gqrxqirl98syi71ezx4xai5bg5vvylsxcktvrb792okkkin3',
                component: 'bz2u293q66gn9p4cnq0910scuc4106py23nz8lyamanff4hi11k0wbn6wn5uo4xptco3jy4y8iv1yru8q4r63wgb3x9xa9dcxg5obyjv6o1fvx70btvu5uqildqh404kywcesinoe57nscmi11lkhci36gti8k65',
                receiverComponent: '9nani9wfnptetxwkxmzqtxu9zybas6450g841otlk3vhve0tpy5i5ckv1vflzdjl3fv2e6lbrxs0wxwro573kqx09k6aygz2kkzx6yu3jqfgrqpcyf3zun9tpibftyxi3p11t7vq4wqquvd05x2wniqx2bhp5otd',
                interfaceName: '5d25nndjvpgax1452nni34br3oja7plaell1sddt69y4q73jrwa87zkw9qxjzaj0wv7gme61r096solh0qkhsucgqjl529o7kuhcay8kh8j79ywzq0m0pcd4flf5b3ub5qdztk28xtvhs651d3wzzfm8ajm0kqo14',
                interfaceNamespace: 'xpsmxsd0fgdaxpubxkbuaa1s0yu7obc642u4bh42cyrqe2wg7gw8pxt278pio5folhj41e5h2ju24gm9xfn65mvfaf9ownw6tqb3gyt74d5mcagld5xubujpmz15swhdnw0e7gwr5j17c6lgda8z76wcn167wjzz',
                iflowName: '64o47btzhgkh5h8b5uiwmo8vvjijh0l7qahk4w7cm3mrdzxqia5wqz8trqglncapvjjdhfng5ql7je8uqjz2j5ru5z2jn9qhqhl7ki53g3u7n1ngyma8dx0t3fkbpo94y49arcok2aktmq5h47gn8kzuni83g3g4',
                responsibleUserAccount: 'a7qvhfu3mii7k3mpm5bv',
                lastChangeUserAccount: '33oq729aqeb1leltu8hf',
                lastChangedAt: '2020-11-04 06:04:20',
                folderPath: '0fb65bunfof7w8cwlkd1ehk296zzcfo2p0kyq101r2wyziypf95siazd9z8ootgs6uscsr0eikiaqowgo6r6zvbxy45i419e4pgbsaaisek34hnsp3l7euku5qh7aozmkkmvoad843gdww1f7ntbbidpxut4a2cy959ztb8cevhdolrn7di7dxu313r9k0rkgjvqplt9cxbrtgol3wbzsmb4emv3kjt3evt3zxtmvjhy27629t1hjoclvmla1e5',
                description: 'jhysi5qvmccgfi1y99asejn27dov9op4w6kocelba3t42irmzze4rh4fhjafri0i28nzv22y6uowim9s0fyoctsdrvgmteny3yxs3s5sqmm05mrwbi86yanj2my83ptzsfta2lew71fmcxtz30ttwg5e0fdlvb5uv4rdxm09xr771fjxmz636qnggsocqvbx134x27qqdsquah4rt44o9ifh08h0al3qm6r1erq12vhbxkw7jvgpdrh6fevas1s',
                application: '3c36mlr5manwxczu4x99vqqlpyldp2pc7z4la9df3y5gpqs0dy3lekb6mzhl',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '60740a56-eee8-420b-bdfd-50821bd298a0',
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
                id: '2c7ceb87-9fc4-4919-8474-72a415086496',
                hash: 'lv946w3fvcxci9kcaoybdoy24a4km9mifmq2is8v',
                tenantId: 'b707273c-0f02-4f10-bc35-f9cb47d06aa6',
                tenantCode: 'rsqelce4kc337cd62zhpr5ftbd81lk08lkb05alfue39w8bo9m',
                systemId: '32f7c3b7-a713-4db6-9c89-475089debd99',
                systemName: '63camy20q1p6bm57w8ft',
                version: '7p7p7xdbjr8orze0b6eu',
                scenario: 'lbw23f6ji0gzfaorxkef7jq5gw1xhjz6261ilgpn4sj0soj5wicfeazqcpge',
                party: '3fiw170rfhitixzctfqxr2z6zg6507wsmpufkbi905mpgz43osw27k1iqeu9q1zo851r403nqxivohumhcp9g1f2aiui7rehglc4k0pi1e75u626npa0posmajkae4vxk886gkxkf6rtjqnmsrwjsh5lj429vud6',
                receiverParty: 'rzodu6hxg1goh9gx37q9rubsjjecntrd20ixi63cuhen5gx8td66x51pqrpbqdurc96psfzgkgetk429iy2zxs18q3upwpeqnspy1360tt26rbiz1s1a7hcywk65y77q4ue9z8iecnrimfdvuf4l07w0cgsgwn8n',
                component: 'xf4ef8uhlj6oiti5jlylcbrlkqayv04o6nuz4438ft7n59sdyyfnxpo1w0k63ptxxg9mfh3l7q9h2tl50xvitgglby5xvj0wcmyyylyze2sex2x4965fgcr64h328zkbjbd8i31hhtlz8ueswkip3pvxv529fsmt',
                receiverComponent: 't88wx4r3cuhp6gaqfk5kv3tqhaoedrotralt255ygxt9dec6829vhvpr0lgegcuit6jyab73k36st3ydfi8pcaan79fk9p8b7kekf57afbjf980utxzusjvzm8yhs25zyh4z3349u404j5658sqnfzutjyj0hw8n',
                interfaceName: 'q5uqqmhon9u1dpg1wpkaoszgtu8cutmvmn21bm3lzhzj62fzipa4bvlyo4jm1kubgnesbo3nx01ay43pyvzdsj9rgwwkt1xkoaklmgo8dwedq8ajut7vah324mu4b3xv5ekonshtil4ef6041ocwg0c4krfsmeqf',
                interfaceNamespace: '7ts1px0ym4kkhqgv3t8540g5qqeevt40qs6edr0lhm7ounjqj5kizkqdqbec8tehrlek9n04p6fdkadsf295lsy19mihgq4ogm5lfegbpzyzyb6am4cgeuf1c2adbjxyjvh0r697eif60yofpi95ilggd69s3v157',
                iflowName: 'ht3hstzsa0a6qk1g8jk3x2dyj0ozh3pdgg451e3rpcgqa4dad9g61gj9r7qnevytyyw7jrudxu1eejpxvwaeytf91ou1otecup8si4le4gjysxeyrk6cl0riif82enizwignp803489e8a1qtzcjrjrgymnjwr2x',
                responsibleUserAccount: '1mr8y6xoc1a2gped75xv',
                lastChangeUserAccount: 'lqi3aqrm6jj9mdgayqf3',
                lastChangedAt: '2020-11-04 14:50:34',
                folderPath: 'zs07figymew02rn9jqp8jepunna8m6v56014y948un6xc9uvlujuja7q3z8inlgbclmirmzl1w1mk9lls5v5dlytz7nzeic34xe45pl5r4fbaxo4lxcb05mbwvfcx5n9aic80fbu969m2l8kdr05sacv4z1lm8uhxyv5m22bklw550gh3h8zvcqbl8p9yvscpec25ap9ct4bmbm89oayq1x55tni0s4stvcp24xgr70ecibi08z5poj7ehaisy0',
                description: 'zt04g9iyt7zjunr4nm18kbocfz67lhm3p2xuxk3lq3ea8cp6i6ivdd6plt7ybb5m18try0egg0y2i793g7j3xscq4mazduad6jz29hl1701r9nj25z9y3m2tfw8qqiyt1lyaaaf66muelt2itnjmz3puhyicwhd1jmzqxq40igx6b5ozcx7clh0k7av31eeaiii55c2n0cy58gwrm3kxu45kpoc3cj2zk0u4ekyuy0uqoe8cwexh3d6leep0nz7',
                application: 'rw7mngvmol4kfj9v7pozex0hazpljs5hgb8ow9a6i5gffk39jo4x7pwk1u8g',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '60740a56-eee8-420b-bdfd-50821bd298a0',
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
                id: '2c7ceb87-9fc4-4919-8474-72a415086496',
                hash: '35gd2a78aryic8x51vllalfp042s2xn4bw3hkvfc',
                tenantId: 'b707273c-0f02-4f10-bc35-f9cb47d06aa6',
                tenantCode: 'f3dpa3zgwy4z2amv6exme3x1ou41a06g5vo8avhllkg3567njs',
                systemId: '32f7c3b7-a713-4db6-9c89-475089debd99',
                systemName: '5rc4r2pl1woloy99a5ke',
                version: 'webp88pvvkkk56x08inl',
                scenario: '0xx1wh1do0i4acmmvyb6ztoj1359o8zljogk0l527wuwhit2qoncefiesy7a',
                party: 'ysbux6tyn88za7dmf02sn8ay9f8d3zyb45rf3qossas6vsvpgd9nj0d5k66dhpu6vz9cqvy17umf90kfc6ji5veyjist3i20jxu4fp4hvmdqvmapxxzqp7uagqdjry76qevv7za34wnvwgtlac86mk33rb1k57r7',
                receiverParty: 'b8n8z6pkd7p2nkeocq99iwxcijqbe6yx89dw5xghcp268peo7w3ysinkmb1jw17o560jnxqapg708rkitbgh83ic6f0dritz9xsuiirbqts3x7a1qmv0kv4y4fcea53it9c6x72j9vzlka1b29o58y4gpn6vu88u',
                component: 'bh65d5wptxpk3dkzb9t7guykbmys190h3t8qu5ns1uj4b0cjliolpgjxz0j1815tn0a8r4irlqe62fn1z7qzsmxsbahvnsajmfadgc9u9v17q8uo2nzaaewk1f6zbeu00g0jjkqo1gu6v44ri9bqkvvmucqlg4br',
                receiverComponent: '34p5uf3n1vlc5a080ml6fctqeofxb5o8taq2apnxayendjcziw9lwjsg38z5cfs0e2gjmt1i5yrwjk4iow0pi8mp7hl7en52ilclskcnpnhblw9z8eygeuo86viawowh3cpx9cd69lpnvpsc039ewzjnxumub2a1',
                interfaceName: 'ux0ndmzsgw0dbqvplkxjnkyvdekgjd1ashglo94qm9dmna5n5ytlkor1vggusmwic8cukdi4x0upglv49xkeuvur9w2kqt3v6bezhkgz9utchwgco62gvjju7grc6hartlqgrutvd50004dpciyfbsk21wfi3gvg',
                interfaceNamespace: 'v17oojsdmr08f6amm0kgxcn54v78fmvbmuqs04d3lcxgf786bq4mow34v41oy7ehn9ucs62rm208x2rltcnhrsl7ddnj57euoqjkgl754214s8ymbji3g6uy24q33v3c1betl5fgzrjiuysu4z019fac4k4r4mx3',
                iflowName: 'rjvlw0zvb4dh527fd5sk8ukytf4dbv696sevwo5fmyn8g9zswv52f8pzywgwyv5iow4en4hrixm3hua1gzu4akojy9tfglesdhclqje9vc3n3mkrte5l2lwozbdts1vt6kdg0pfqngf80o4wkqi9g4r1up80cn827',
                responsibleUserAccount: '6ez72to9nmcsg43smmk5',
                lastChangeUserAccount: 'mj80zwfnohj6jlmovmct',
                lastChangedAt: '2020-11-04 02:47:09',
                folderPath: 'jfgwndlw97pavubhnffpafcaujv6e4gmv0zbn8p9aagz2sda6zqy9wwegfndhplbvxce44qvqx4p59qao8ixsq8b44y24oo2yfoxib8mm19x2wvbtwi81ksauxriw1gn9t6b4onn83uneoltc9ci5p78j9yicpnco1zikzph8htmvfcr6o786t2hyjbxyiqwzazdif076bdfk0z1bp2emjpzgcd6n5yatktghpls0deo8kuriktbzsbi1k5e8cp',
                description: 'o6mwncr15ykaivak0owckb3ti0mgzu5xz3zqs4o9thccej3am98j86hv6gdgj1btf4y1qc5fcjf3ierjxqr0u4ho4f4wttd0zq59h8rjy6u9keb3azranbpa8bwxlvcno04wrn00hmiky65ekwm15mmlreu915lgks4xmjxa1noc044uuvztqfk1czmdysc70tgyf08q3dr29jg7vs9hziaatenr2s5emhwzr78f2x7fvilomxskm2pdmkssw9r',
                application: 'bjkhkg2hjlrfdv2ov73dqr2h8fkaxr0ivefhkn2396jcc9sclbj14un5mc68',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '60740a56-eee8-420b-bdfd-50821bd298a0',
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
                id: '2c7ceb87-9fc4-4919-8474-72a415086496',
                hash: '42s0krjdhcyibqdx06nnvjvolol8kah1qfs02mab',
                tenantId: 'b707273c-0f02-4f10-bc35-f9cb47d06aa6',
                tenantCode: 'wdxjnhhd865da0htnov9a1t5d0y29a402oz2akl3egt37nksdp',
                systemId: '32f7c3b7-a713-4db6-9c89-475089debd99',
                systemName: '5mg9ht702c12b3moz6b2',
                version: 'f3d5a8c2iefucxabooi4',
                scenario: '0hj3ifyixlm0wtvn6xwzhamc0j6tapjwpavnopsyhd8y16kc6utvi3dpt8ef',
                party: 'dll5iblz0z0n71fvap7rize7ml33hvk3qsjxdot92r9twb6nhzcf5tzixa1fgpqtf9ozx434e0gqfmlm8qo4ewzx5m11wftgxxbqflxk93g9atjsvdqdz58nfnah5m0kz0ohb9n5rhxqn02e8aqwdqzssngu3zvl',
                receiverParty: 'yizzz9nnll6cw1o86m5e9t9onh8fdlpxkaqea7r8mc5ev0rsnqy3wde0fcyv1hdbd72t7n7d315ohbw7yws1ubnehcb8xmw079g51tvxwkmjlg3csnsn1n5u14wdlmy80ur4ydf6oc54bfbyjl4jst4qd0qsk63m',
                component: 'ckp02yjvpjxsmlpvyaz12mza9zgkwjtb4yn42ljtjygmrjztc7trepaf9hkhtule8uxp5jbh9ez4hh9xrrjqkjqgglro93klzhl13vl8qfgaqxn80828qyq0ddg36h1lgycbf85ie5ig1s4al0jot0adzj5fpddz',
                receiverComponent: 'cksumbbhubx9y317k4pyqs6u25kclgqxpygrwlz6jd6philg2kziadj8cftki21f1xaj0uuc5new4dobxq04jnp0335dfspv13en3tkejo78brawr0jpov21j5wobhi0we5myrn6s757hzdxl97eafb6ppuj8xdb',
                interfaceName: 'sxfzfipvvcero23v2lyp0cysjguyjq52k2cu1p7yh4pmc6haltz7vjj8nqkw9dr12za239ccbjp9up3oed09i8a5rlha465utl926l3s9mzw71mmvcpdl1kaa06b3yw4am2hfvp82hhyg6bcnv6p21wfm9sv09wa',
                interfaceNamespace: 'q6wbkk4fer8o7c0zq674em2a5qex3mhi0agaibv0r32to7jrw95caeu034nhtk7akwtmz5f52o41ajg2zsi8plkej4wjx09qsu98lfcio893aynpfufxygjuit88tt3a0p7x9kebdu48mgqrgzqcuj287x12cw4e',
                iflowName: 'ir5ykt17ed5bx8jzlv13bjnxshsv7t5jwh7b09a9zhqk0ennef0tqbwla5l3qmkwit2ybsp576yq1bip3z3yovguvk6n2buodxcx10pda5h4ea0ng3yvhozc3e0wvbuy8j2iijpxo0oouzos95sl729k76ew9hwn',
                responsibleUserAccount: '9y3rc209k5z0j37xhma64',
                lastChangeUserAccount: 'i25kwhgru08r0lotqm6v',
                lastChangedAt: '2020-11-04 05:50:18',
                folderPath: 'r6kxw0y3hqgapkuu3f98b0gvamkvdoho0i8lmzku4wskitrow2bwrcejmnmhvulauqbnx8hmjr4bg0ckop0266mvn2tej4nqby5di0wf458gr6nhbg58r2iuwajvfdarl6r9yp66k5nh6hkb844q5vaofujjxrb5xde7c9kswwn1i2a27q2z4fjidngnyhonseqwcfu6qh300tolpo1ml1vljqxdqef0eq799mehxj77s8kmm9sagxf04ffzgpi',
                description: 'a2bban7tmh5xcv8z7mpce8m1jw4lxpofqls2u2trr976e27yge81tcr8ry72gcgh4anriynpa1t1rp3b49igqs4uou1ivagqd462xazp240lq87y1kwpn4v9ms71ll9gh4bj1epx37jsj5nnq68bh6935g895bjfwzfuuvecypiekpmjwlseynbxvtjntub6rv615wpo3957ycyqudivfl4d2tt4i17h5hh556yw9uww4up2txmztuwungcf6d0',
                application: 'd86b9kejwsfqu93c3kb9rax60ti7ko5w0uq77jlmc91g1mzt6idm22vrwgcd',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '60740a56-eee8-420b-bdfd-50821bd298a0',
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
                id: '2c7ceb87-9fc4-4919-8474-72a415086496',
                hash: '0wmufz3umbzlx3d78tholmt98ghlbp3ydh310nm4',
                tenantId: 'b707273c-0f02-4f10-bc35-f9cb47d06aa6',
                tenantCode: 'd1erf0lcg8uj1s7dbfio74m7j87bd5bhj1559ksfx3fv7jl9gg',
                systemId: '32f7c3b7-a713-4db6-9c89-475089debd99',
                systemName: 'nq67r1u3caora9qrb11m',
                version: 'zt1n9nm87fg8vggy94x9',
                scenario: '8ugwamgupl41fub8veygbyvzn07s37we30ft423ft97avmkqln5dz08i8fei',
                party: '40c52bn65vlkmnvltrwr9gpuhzsjsa416xm4evsdbjrsf1cxpd15cztohzgj939gmvybl6ysblcziyzq8w3wd7i6r5p4gn60ebpbtk07pxblsc7dp53etd53l8136riseb8w8yy6mfar03nvan1aa7d9mkjnsgbr',
                receiverParty: 'k2re18uokt30lts64iynfxdjxs896opwwxtsrzqt09qay5u6vfdingw9f0372tryk4fitrbn681zup1smps8fjzbhdvs3lzgx3bkk77ezoi28hpkno89kf289zusj538jxayfemnlxqff5fvnmwhincf7s8hgnbl',
                component: 'w3ma4tadedp2k976g36hwczo4f507synpaeg1si3defbndgg0hudg22mtv54w2h3cym05izvlex796xqm99ie10q751b5lb9meehjszkb5wrxeq94octvek8xtgq4kjt3ief53vfktymvsn6716aeyuozr4j3d9u',
                receiverComponent: '04bmel3rzmpfq2qiw1xsc2k9o2t5mdxj477frny3xu7mxeipnxre8ez7arfeeafkdl5nwcm2ntzq59hy14d7n65j3wg953tbzeszh0xvi82nwyeguvhyaj3q10wvn1sombqqhbnljwe6pdwgnt5ryocbuz756dlm',
                interfaceName: '5sjjxwjm4y2dv7gesim8p91g6fmn4z6jhaap3esj0kg2bdrvgdc4pvfsmrg8n1thx0voj9mydr1pv5bqnqb4vzjv7ywxssqwtmzcial9bnv6eevoiukxzzzpspstmulp00jpx2s8erqjf12m71xupx7044l5y70k',
                interfaceNamespace: '35kcwx0fidcwt9q2g65obw4smfuevk46d73wougqny783tloox98jtir23qgwc07ue0dq07c7bonckwpd0igkzpjynzyfsth6ctuc18v0gtwise2phzok2lwhy4rd9aw6juy0lw9hfqwxhx2kb32nphoodril4pr',
                iflowName: 'sxwpblen9vbfdcy3mtt4pqlf9et86e8yqcymaga18dzvubx61e3yu0ied5bnn1zuyrt4280xwme214fr42v3gcwvavqazb5ficix5m2gkzwxe23yr1paesky2fh1ptcljn50z17de6y7acxlum4e2vzpll9b3hld',
                responsibleUserAccount: '267zizbi3bo6fnurisze',
                lastChangeUserAccount: 'o3855pcow3l13yjvlnms4',
                lastChangedAt: '2020-11-04 06:37:08',
                folderPath: '34laanxox134u4p2ial872ql9aa1qr6wosy33ypxsupgxrqr3e6cnfptjodrz7pynzyhniz9eof6njaiesa9j7gyfcwbmu1vxpkv9s9qhiq68ugxol95y3vg024a4bmx59173kwmkfl0it4zhj6e7p5888tbssuf2sl1o1t0i0zfcju55pto7cv1lvv7imk3hzdq8rgahk6bgr97d6xdvqjg8eme98ui2veh1w7f6rnpwtrlwaybaoj3w4lv324',
                description: 'ff0xymgeen57zyf7sxtryzeizp0l24zglalo1og0mf0cvszr08d21zktuurlekupbo8bgft76edls82f2olzlnv1ga1cfmh15wyh949evm1zrd6ffopflq7cbh6trg34szdud77j7606dzqrw9v7fgduxiupapuhivrn9apyja1t31xg3cpkk03fgqgl5lhw6l159nxtb17dzz50qy7dgkemfdd21f7asxuzpxblkjylg0ale9lan1r9fz3cix5',
                application: 'anbc1v9d9f14v4gfqn5w57a13vw90weyjtiewqoko2x0jrdk5dj3ci1sat9b',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '60740a56-eee8-420b-bdfd-50821bd298a0',
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
                id: '2c7ceb87-9fc4-4919-8474-72a415086496',
                hash: 'ist41ghgyw91z957yokum2pe1pkplfbbkccz8b9j',
                tenantId: 'b707273c-0f02-4f10-bc35-f9cb47d06aa6',
                tenantCode: '87uxgnawamiaf77aj7f55tc6gehht1hlgxm07veq975sjp3una',
                systemId: '32f7c3b7-a713-4db6-9c89-475089debd99',
                systemName: '0i6i4hw9sdfd68dqrok9',
                version: '0a2yo412jv7j8wr3ak8e',
                scenario: '2ree31xu247rmnykhlvfqng019w6m0mufcnun4zu6m2a8r4n7f77u0hcwmuq',
                party: '7yggzhwnrtqen8tud8od71jlfzlm5b1vd10ojsxqz3zpne28cq8i1nvh9bovopqs7i0w6hm45ruc349h28zvufn36r22zux4kxpifjhpk9denx27ehwi14xxrfkrde1ph0ravb11mkd57dn5lp9vulbtyy2guafw',
                receiverParty: '6i2nbygksn2t60y13ua1g48cxxy060autr77wuidbr9h0eu20ut7xq8wizro1a5c8kx1cxj7fc37a3wsya3d285dkryglln3ahigwvu0edh16kitjd11306fhxvgoluhtu8d1q2j1jpm6rgzv4hbg12607cuoshd',
                component: 'jbpisp9cumo4hwf0k8x0s4jih3y77yrwxlpy8o1yk29b7fvdhwnt8lbtz5z6u32ge61fh0pjc0rppfllkn7obojc0pvew4p16xv490biop68gt87wnrd1zgubc7dpfox3m7cfv6jzo2ebfjrqzlijg5jjegns2d8',
                receiverComponent: 'x0expk767ldx7zmz2g3l56qhsdfcf15r27y1fs0cm916oeqawj6iyf83txfl30xo5820874ya6l3xkpoxue99zsq9udrpb9mnb82qz239yho4e1l5hfvc96juqy5olqh4htjgt8iqosf1y9sh7mm8fu41smancsw',
                interfaceName: '1hq6hzekb6xzuvmublr3t1nsgaiqu2ktaukjnl6oufip369uxgpm8qjp3v83sg16bse6hkumnietu7qe8rdntij3gtkjqabbzvsyjpedmrz528f01k1wzke4n910hrvbjxs2xrxdqmftndyse0023ec37r1gsr67',
                interfaceNamespace: 'xvy68wo1aajxlqa1dpj4xacnkucl9el3s928nzifo8cvk5s1v6s7w9mtbhshb6e4f4p0v4nmx36ij6bx6mgxyo5fvh46ugi45pxq32dsn4s1lcned87xuk5wg7vlidrafdxec0ci3h669ymsmrfpk231rcy07d1d',
                iflowName: 'xq1o19v00l7k5gj7mn188ufgcxdjtsgd4oqsmbnche34u86sva5a4azz8mqqeix57m94iz56wpy5t2w2gmxu4b52ijoibli7ctnj7u3sun2u3nrpfrj72uhn09bl4y8dob9h3ca6u0icttdzpnx7n0c0xruwrw4f',
                responsibleUserAccount: 'gi8tk3b497lr989pz3m6',
                lastChangeUserAccount: '18nsewuurqy2vt329v2k',
                lastChangedAt: '2020-11-04 10:20:19',
                folderPath: 'x9z7qkuxeckjcy3cayp4hxgq7zy6jbzc9upcqis90dc6b60xxk7rt9fedebyd6xm6oon4qodbv2zcalppy46mmqnmn62qc0zqva5fe3jx54w36tb7yilp9lgmj4znz534dklfzn7a7ywsy2z73hd9vgokoq29wn1r2p4jp524l1vqs82u3z7gaatct2rpooeqr529rdt595iriskh2s3lxegk9dw8f0ccrl7toxxo15frfj1ka5beroa3ydf71oy',
                description: '0snomw3wj64ja4p5lir4w4ookujwr2ujb7ngi4x9vyi33t3k1r3cnfcnc9xzjwqlbaytki67pyc9ya4eldmvgibvmmaa075yrsn26aht1tpxhq7sdb735n388atz0h2pw76nogld80qpk0crgigi4oh37qw8bp3w8ri6fszvkvu4y5f014lcd1op0s5qpsfx38l19poq7wexad9cjjx2g6nf028k1dosfgn5xy8w24vb2n8ryjd4ab67y1qzcrh',
                application: 'wkf3pnfrtcjj2ws4g7dsvqsn6uyl4uyxaza80oqy0ftm852feafgi26wu8vz',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '60740a56-eee8-420b-bdfd-50821bd298a0',
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
                id: '2c7ceb87-9fc4-4919-8474-72a415086496',
                hash: 'fxxu4edb56n7p2bmuolmab8k0a0ts1aovxx3o08i',
                tenantId: 'b707273c-0f02-4f10-bc35-f9cb47d06aa6',
                tenantCode: 'avwks47gmffguj0ibfwva2r7btta9cms8apsotfy5829r05gp6',
                systemId: '32f7c3b7-a713-4db6-9c89-475089debd99',
                systemName: 'ain9ctc3gi8fk87a65gb',
                version: 'ahyut4glyg64mdpwbtur',
                scenario: '75pyuikqkjxt5izywk0b9k26bidttbpok4ysdbvazy4pyv8hu0hbdu5zeblc',
                party: 'vshvz23teuvmpzwdnn47cybjhh8agxd4mcvcjb4ezq6vgsirs61ml0jaxss6dm85edff06y7ta69lgy0i33vaa5vccptpg3tf46thmqyyrpnhzs7h8ojtb52ons3raxos51cuvthfzt6tc0fnevr34yknh2zwetj',
                receiverParty: '1l6o1qq6l0xuy97gp2kiebwia6a9vl1hfiydmnmqdzfjy3al680cijpkmq3cho3dfwerw9z6g9s6y3j0tgovc5fh6wiwgfefg5i30vljrpya1apgxvap52eyfu4uc3ml8sogxlxj70lqc3cevsqs763jdn3r0ozc',
                component: 'c8j2c52may6rhujfnt2q42thdut0b7yorr89upjyeu521x5esgjnmvax5mhmfgedk2jlact84edyzto13ojfl2jetfl49u4mj0d39l0schfajfjj5dwjpkxotzss0re5i99678qulb2wqps1qjkmp8of8r4u9job',
                receiverComponent: 'mq7kakmh5rcqig10ko5k5zugmqo2t2758dwmno8oxvjcnvehgdiwi19cbc9qsi67mj9sv68ea0947mcq1v8ox9ktkd118a8pqdrj73o3iwlfva1gigiiky0udbe6esomsjwx402v44wj0ltc3oel5lzfvimvutaa',
                interfaceName: 'gnf96n85ymnr61ehm3nlvy7rcbzzdsq0708tuvdjtamrvdtmeief1479da4494c7zp9u416fgff7tp7r60sqkh16s1anpodxztxkahvqea8l3r46n26bkml7wv4oa6ebii7fymwdy4n3869gh0vflpyv48oaqha3',
                interfaceNamespace: '6tqf1ik8syjt827zhktmehnd7q9gb9ozsi1cfcb7egyl1gl20j3xnx7818h4o598wuwf5bhle8f6rdoy39kn1mnp2z2hyjr6tkwfvm76fi78nnnkeooxdxztf8ti9lce4x6259v7a3285h690pp23rco3qva9c6f',
                iflowName: '2s9g7d3o4q1newhs68i9h8qt2ppk71zyr46h96w3me83umx9mpja5cjt8dldvigvjzlzpwni8wdi8fttna8wd1cik4f5l1ditutl64el84sc0m0bft0wu7oqwnh7ealn4mdzwnm1asxxlpvxoajfzzevev7dee05',
                responsibleUserAccount: 'rjybgdpd1uv93fzlefzo',
                lastChangeUserAccount: 'xa0qhcmhreqjatzeiovo',
                lastChangedAt: '2020-11-04 01:45:49',
                folderPath: 'kjlq5u1glm80hfynbbrd42t8i6vou64rbb2x7bwp2pewuwath945ti2z84h7mvb07zlauqwf2haflxux8fmjslo2cxxfv9e8z6809yjtek8wg2u9kumtm2i7ubbvrl8ael7np5uw66dcrhms3z65dks8lto9z89q4qhjk7wj1aneowlnk96bk9wlrovw391swd8knr17r27ghe69eko75d5pul144226riltcnzs1f8lj1ccffff7htcc1o8zn7',
                description: 'vws4pvblrxbgt2eb28t5gun4uutjkc8s1gmfs47rfcgfd0rt9mm44uqp90h0ritx6ncowdfimi07v7xjb21i5i1wkv1x9d85b2tyw914qzpklt6jj2fyfao9avd57aeb26r19fpn60f16t5lwbpzu3tuwyolmj9k8gre95j75pq00qsr1bcd89gsx3yhujhtt38ac5jrbb412u84qzs286fxenpj3a6bsyaaxi7j9oiv604k76ausx6m8k426ayr',
                application: 'mrey295d8t980lad3hn1c4tvso148ehs8ntzeklazsx7f6fe7vrwkbvhru9l',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '60740a56-eee8-420b-bdfd-50821bd298a0',
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
                id: '2c7ceb87-9fc4-4919-8474-72a415086496',
                hash: 'ddb0rs8jq17jkchnkq7se4m4tw2c68yk0c3492a1',
                tenantId: 'b707273c-0f02-4f10-bc35-f9cb47d06aa6',
                tenantCode: 'mirslwfh6q2b05x2hdysz0bcm6syj312qsfx36s7z0rc1j48jv',
                systemId: '32f7c3b7-a713-4db6-9c89-475089debd99',
                systemName: 'mflxrwxrcqswbpg866vr',
                version: 'p1wtmre80tbg899g3oxe',
                scenario: '1lhcxzl82enrlx7icgdykkzgiuwo5sij0z3zwkm5vkq6jufxdqyejehkg6ou',
                party: '1a090hy8snqid9ua8yd7aiosf03fc9pwofxb8dewnmmwbki9yfwnpvy0crx6q7drg9hf57zvype6dqbit9blp9lwa5oy8o4ugdfwtb3muu0wc6xu6z8xshr1vzud37xsodzgsl3pizziao784wu0i9low4t8bu6m',
                receiverParty: '4bc6rlece7xzdgc6eykcl4nvplsmv1r1euprr83udv4chq5cui0qv6jtkj2xss3x5i7rjx3fzgklyn53ameccljt5806cqyl2olekcgoiib09nx3lfx8o60j34cgaakhqam3ren1agxjniexuwsx6r9rbmo5d7le',
                component: 'jta3ie5gkqitcpsufvz5g003sum5iashjtaj2tdv094yjp2ug44qurgzjfiqjxkntumsyr8hfwft9opxkbgmzugaswxrprlaodhvd5viawlijsymz4pjtnjc4bkmdtk8jv5oly423lb1hetzo72cjyh4q86kvv41',
                receiverComponent: 'ybnbatkzs2lo4j2kkzkbiu1frtpbghouj7huc6u7x10je0s4ge37f2ak4nhymzyj5m4tzdqrixmp8v319czrlbl3niqtp4kfuwj0fns8oe2iaqapizfpm789z1xoojn6s7plgpokasta4kcv0do1qo2ewokh98fz',
                interfaceName: 'o5gnxh0ojvy86hvk4fcrcn10fhz9jq8euh5y6l3cixloysnb01vwczvgyfrv08nastzo47q91e2qewu2vc24zpl2n34l6zrldzv7rhonem1zoktd7idof7yb7qbfvtq2umf7bbxchz8zydm5caibin9b2za27au1',
                interfaceNamespace: '3x5w9mu214eohgjfyq2y0r2dbxdtt7j6l253ivo8ycgmn9rq9em6rfclsh707prz4c5ffpf1uhv64rf72lpmpc33bubbwxz9pqobtf2p6e46yv30ngozpgxmf3k6b4auiyw93tf8b50v2llfp6ej4wsvw41vswor',
                iflowName: 'poik4a4x7sgdiw5l854zdjrav91646yf537x1rg68jzo6jlij8083uc0k26ue269zx585o9cnqli00zcx6ayd28o1mszwudg69fvm42imap9mze4afl0d6xj36b2hhrz0gzx16f14980yl22dmmpp9iimjxhcd1r',
                responsibleUserAccount: 'ikc3wuwj1h2raeouva3t',
                lastChangeUserAccount: 'jo3zgbngqsc5xn1a1wi9',
                lastChangedAt: '2020-11-04 10:27:50',
                folderPath: 'sdu3zs0wi8jz6koudpsngalgqh3hcxhphphb31x5lz9nj8pvg5qirth5e1p03j0uyisnyzrx6dcdzp8un70hknqezue9sxmv4znx08u5h8cysn77zznmnoqx1ilky5bse9f2cj39tjvjpntg32onqrqianggqwtlddbdxof5dt8t7id9rzcsyxagdk4mbslshnqlf3yf8gxjhasvx9uftla13ic0bbldgrkdojchfjgzfifngzr9xgqqnhothsn',
                description: 'xzkx4uplz6de8jttbfnyhhea2y8sweq8n8jgjfzp8vjbhmucgr4gfz8dhnjh9sbl17j3e2vlfa89dlrj2c7un9shlp4xf6ak73k61tfdrpq5oxjm1jfho6ktr4pkc0mipdx277y1pj03u6zbvyhg76juky04xiv6bzw1xjggot9o71dgu0w8lyjwl27t3q895tmqac2m165wc44t6bbcik3jr7zsytbioodteo219e7lrggqpsgffbkqnz5i26f',
                application: 'bnaaqmtqul9x7kf7xxdqx7old7wbdmpnzrpf5tp12jykxj8g507pozcdc8noh',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '60740a56-eee8-420b-bdfd-50821bd298a0',
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
                id: '2c7ceb87-9fc4-4919-8474-72a415086496',
                hash: '5zxu2zmsuakcxdtze7w5a5aqjkhh7jbpra64bvv9',
                tenantId: 'b707273c-0f02-4f10-bc35-f9cb47d06aa6',
                tenantCode: '8jjde5ksjjy82dcurw2xphxs9uuopwrj2wp3t8qzcugaex8sv8',
                systemId: '32f7c3b7-a713-4db6-9c89-475089debd99',
                systemName: 'fvjfvftle0jgx7c49eta',
                version: 'yhgboj2fkv36gkbgr60f',
                scenario: 'e24b9nkayfnnlor3pqw62zy3t95zcjda3f45x2sbwc648fmupa1qlhp691h1',
                party: 'vjusg0y3sxfmzcabg991ud9gsis2denunrlxyo0j44rx0ioax7mycl8bf606cso7hyta0v1cxy35catzdae91255m0906aby9m0vmppx98cs07rgvnphsvs1zisqidnsf7tp4gt7sgorplwzdf2i69ukvpkr3194',
                receiverParty: '818669uo9qdq687noekeu49t353it2xkhcf35x8vifg9hqta5b4b5kmducspeover0dfbdhx3hlcw5xqqenxx604niit49amqwo1tdwlxz9lzy0zckv6iturrtsensgx80fyxxgyukpr4mol3nqa9gb7b5pbd2e9',
                component: '2mv98r7jah0j19mfntl9hrml49bfs09ugobkdenv419r3oonket8nko57nb6uklk0r19p283szr610jt4wuxmp7d2f0jc3yb1z9ltu35yoero2mkm6k644eqlrf662ro7aat752pfv0de8alwync76fxphmmx2u0',
                receiverComponent: '4smlqw2vjscv4ampvmebwj5ec6648sfynx8gmp2ko3gu7u0e2166wq6woh5tvzexmbr6zhy9jzgl51e8a9qks3nro91no8i41ow2fjmsb9ddnfdgfg2s29ck0apg14g3mkpjvq3pfv97rdrjnv9o7ar10yvgn3mf',
                interfaceName: 'gnvkku6dwxy2cphtmt0b5ity9mgfsuz8t72ad2whcakkvysf5q4iud1la6tt4arh0cr3lpvkk6kw9mqcam4i22jhgqgn779x5x59pcdcdc9w4oaltl46ivmbxyykh4dhbvs81l0r5k027azs4i4e29j12cfgdxza',
                interfaceNamespace: 'ro9a96tw3o2hofap3twh8wg1xkbn476nf2b3ine3oaa68j279vt0rtwcmrkrgxg6x56xh8lvrts7ojg5iocnug23h30z3wuzumobds2bd7cslw308hin2docu8zmq0z46l4s421rmg1ti4gcfyzbc4xohpvgxmup',
                iflowName: 'grwng0bqc3lbkcf06m05e8gsvoc8vul73sy8cqnfmi2qh391uwl358ymwkqdnoq7lqnt3k88ob7pmbqq2h7w5nm5ncn2ztqe3z7k6a9rrv453g8nr684k7lpfyuyja73q2udrindtl587dqbqakks12g3uewaqym',
                responsibleUserAccount: 'eovj17z5slt64gfd56sq',
                lastChangeUserAccount: '5r2ozkvgepvkerodl314',
                lastChangedAt: '2020-11-03 22:08:19',
                folderPath: 'nlnvcp1ssyqot9hf6pilsl3cvpijwnx819libulru322dvuzvi1re6ofsu3d6dlucot0g0ouybnu1emx2mxi995d2eqfijglzbowngism77uuf8h91ji3r8fmv3s4npgzb2bd1m6n0hvcarkhsnf7v8mzkv2rinl3lcuvhvse4g08kus49t4oi3cip42tuhj58emxc15g99jsaogu3pcn3dtrfainok0hssc9xlzt9cyrgo6e5hegitgw1fu8d9',
                description: 'a8p5ugcziofkma8lknjm5dwrmsak9m6d7eb3e80nzd0lqv06p9pwemrk92t8cl4nt1pkw0lmn1ja54zvt2fx2gpx9lx0agyaahtr1obp05jthwgodz1cylwgxsrk58b03idw5ivymsojw68shuguth128ikksuztvucqyqjz6wg7z6kmh7bylyfjv6y13ux5umnnzerds0a6d7f6e7lsbt4j32g5opapwomiotnonf2q9qo567v2p0jrytxnjkp',
                application: 'apx5bssgi091ykyoih2aof8jodztrfso2xfy1qs44dspsuprppeggdeusro8',
                isCritical: 'true',
                isComplex: false,
                fieldGroupId: '60740a56-eee8-420b-bdfd-50821bd298a0',
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
                id: '2c7ceb87-9fc4-4919-8474-72a415086496',
                hash: 'rkv0v5x5h4k5cp9kmacposui4w8h8savh4zsm0ft',
                tenantId: 'b707273c-0f02-4f10-bc35-f9cb47d06aa6',
                tenantCode: 'y0spqviopkra90b8tnm295c10r103e9rg6g6clwdl2l5o5qscd',
                systemId: '32f7c3b7-a713-4db6-9c89-475089debd99',
                systemName: 'b93nz0j74jlvfzfhhbzh',
                version: '668fsfhtu1zczic5eyb0',
                scenario: 'ljnbafgtqoga1pu3ly92jduknrby2za0180o99fzw4w38pgfyhptw05femxs',
                party: '7c6c2245cmz4bznc02fcipvmkkhbm818z1ykbbthmso7y4dysp6ptx80mas4znve0qn7lmah87wba8rkzoxf19ybgm3wtkcgseqqz7baj80uq599g8p2vnyrqqv5pxftfewxkjwvgwkz8d5t5sobpm2zdpvw5llk',
                receiverParty: '0r7nhgwc51lvjownrua26dhcrvnxjnegalht7t86g2nj5dklge6hiwhsdiosoo3q6hldnbnjn74ahs7yi23dls7czh8z4o4n73b95pwiyotbogxd8i1gxos7nauh728mzmv44v6igee94s605ydgjun7od0gj4gv',
                component: 'h67pqowdbzn5u911syneb1avhm5zjypdbbxehaswdc7h0ermrr5hxa97agk7cjp835ivd55p0dfsd3bd9e44kt82whdqionagyfmvx4zktky3q67a6o3umailpulmcc2pbvmmxt8hnnh4caos3zhkit1dikcqncm',
                receiverComponent: 'ni7dznsbeldh2763mka4ycaiynrh4ikyvivpwy8dex73q4erb9jlf3aljd3q3q5ry3cnmrktli3c8c5wcd2n240f2k6muczdnq5w0ezeuplmyxx8i4rtmse198yuz8viyge6q3yjgnsaqg45lj6y4oqy4vfaclvi',
                interfaceName: 'hr3brvgi7ggrdx2x1zvgamelb3q2zf6yipzjeun643p75md4nxx7i52dbyzjqqsujtpplcvyr1b792uasd6t2u1uxz19b5w28lisiun8jgz7boplv7d63j4m7geuicb2hk3os39083d4rwqmbwmazx93iaa9zb3k',
                interfaceNamespace: 'bpf4sd28eq0en8fbzjqhcd018cegrlj1tyy2rrq0xb0d7ihfxlscsmq7lvoy4or0rtp8mguvawz7f3o2qzq06egy40gg6hj8x5jvhwivn7a22k8bs061rv8rzgb943mrok7e6sbo89pqx78h6zekentyrss64naw',
                iflowName: 'xnlu38u40qbjat2igz283fs52o2nooca3omv18i2wb2slstlc4b3qu542h2zy6jypwdiwlcudk6vmzqc01083p8zmbvrlou6d211mpd79a2kqk3drva2i7j0rkd1bmxyqxztgvs1o5kcwhtitwumegalqtp26h59',
                responsibleUserAccount: 'uosdxpwtdjg9b1it9g8c',
                lastChangeUserAccount: '9x8n37mts8wqczut9q4h',
                lastChangedAt: '2020-11-03 19:33:42',
                folderPath: 'hqt9sel60g11355zb7h5bnjo9m4wrzywqg9pegk08iljpjmw775k8gypvt9e1cx50u7v1oscgypdkvv41qfn9a29r9wvst1gb87fdk30qjso8vswyrsrkwiix0kjtpk6x9rrgncc33467je3z6jpcnhxsqh8rqgkg9t6e2izuae2yt8ul9tk2sssbouu3gzgz9y68tf6ui8wtm84cp4b5h6q9vlgc17ibx59md0m5bxu3akszqwf6di1zr4siy7',
                description: 'kwuamhwfd6801ink9jkytlefkpjsypjj49f9ski6qb5wc0dfv8s0h203yz9hore6ym6q8ujzq8shk4tj195ixnp2vj7ei8u71bq1sxpxcvj6w17u4qh2zh3vvafq7qp8ltlyh0qtvao5va6jtz4cbceorffvmaovhojfvry56e3744sjwpyj3ocsuguy1s0488uaup3ed0rtv0w5d8wey6nh7yqsigpbn1bbe28zic3nlidj7d2herybfwb4fj9',
                application: 'ph49n5o8qk9yb5trriaa698q65dnbgwgyo3lxh8z2bo7o07yf8q54seo481t',
                isCritical: true,
                isComplex: 'true',
                fieldGroupId: '60740a56-eee8-420b-bdfd-50821bd298a0',
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
                id: '2c7ceb87-9fc4-4919-8474-72a415086496',
                hash: 'bb3zz6xwr8owvsgmn2c0is2fv2nc9wgefb4u5zub',
                tenantId: 'b707273c-0f02-4f10-bc35-f9cb47d06aa6',
                tenantCode: 'm06844m88rv6lmchw9aw5g5ahypif4li6gug8vuv9d1aze6f25',
                systemId: '32f7c3b7-a713-4db6-9c89-475089debd99',
                systemName: 'ji3u3zwj2go2fbkt1007',
                version: 'v3g4uvuls1lfxpqlswx6',
                scenario: '4siukam458pqhtx2rpn5idxi1k74dc1su62jwhhg9zjx7504c717hdno47ko',
                party: 'x8by97vbwlix38vx0axmrn16goy4i89y6zgn5o268e1dgjy4mk3qhw53uraz46oykbwv6n873nwfozl17lr8hg2klby74pqc5l2ew7ixilu64hqns62p6eapcncez1g5wwgtnr8tx6agj2mm4q99hinxnphfaq1r',
                receiverParty: '7xpm0ja5yv0b6gm62wlnwrhordsamog1sq2fmvg0xa3eii3ljxba9tzsmsdazxeqodepm6lyc2djyph7q7i0hbceuqihel8m713h7mmrrskly1s4xnukek81h3uduows4sbuwt8qds0oy679hkb3y9my1kv4bmxb',
                component: 'hfeh0iypcmd9cwwmss2a9231c5g57wz7ffvqgw1bunga0xh6ianf1j2utr6rqh2pa2n1epncwx20qfgxbgezd9lih8o7qmgrd3atdp9g2bwxga2oz7u3ajiem9yzoinqnyiow3jad4ok4a2rb4cvax7jq6t5olcm',
                receiverComponent: 'eyvk5d62a7bewy20fvcwrmuvpean37pksn482qtdtb4mo4tlhjskq6fixecc0wk61umpe2sj69scfqkboxr3tgzv89q7jz597ee2w3zs5gjilimkrs8fo5aksh82rmx8v2191fvdol1m3k3kd48wvdhp45h67l4d',
                interfaceName: 'blckzfo4xia8g7etvb580pgjp05uql0zj67b060jvj1pmx6orn078fj4a4jslp3ub0ihtiaw613e8p3jj8b3mprrew5h8avk4eaakl4s0gthljytsbrmcjbj0vkam5veeqo6mvqrvbitiwdz4csyjg695cbvq0m5',
                interfaceNamespace: '9e8zx3vd9vzfxk3eex2bjpiaz16nw6buojel1dbh9ju8evf0fzv1zs6oeb4tgbfhdjjlrb7zo03wwfktiejbiq5j521emeoxe3yqfcitxnghabni6cte5xyr8926cs4klgs5bj0wae0lomfqpkalzbhzrqqa13kt',
                iflowName: 'gl6is3r6qqp1y6quhm1tr0ofnyc77kajva1stxsd35rgsdz2t1j3pzhszhr9hk30az90ni1au0xff6n9vjdp9618v6isov4ufy5b19v4w2mfb3f2701ozqtufzykbe4y8nn4h3syxpdahe402d3otzc0d6t5wjue',
                responsibleUserAccount: 'fga9c3if3hxxl55f5e2r',
                lastChangeUserAccount: '9u5wr0r00502kiid1v05',
                lastChangedAt: 'XXXXXXXX',
                folderPath: 'p3k43oyao7aeaoy3pyxwhopcnqexxxoowjjr34lf3w8oojkc4shfo2rxow0fs4ph3fkbs9793nrnz3z0vm5rgune5ntl4y0rujav5em8f8s946bqebipwk8knilesr3mqahqh8iup8qf0pn3ahsf1gdtp1pswzzf0qvw7v3py5rilwc52bfzqhh2lfanhwgqrvnrrl9ucs76yup7sdba5bvipygelrzi4jasw5nl4pqjn7fxf0jbsgg8madhnvh',
                description: 'stf602h9427g8nfmqeqg1t5mjgihmsj4v83vh9g7113qduahsb9xjtonp9s9il1dzg2114hi5e69be3u1tpkg7plk9gnqnoijgqgi52jlsyphzewxzbarf6n4irby9h7cbbycz8ytkoy4290bgktxtzkkdycs29jjssw15ilze5e502eqz3spv72xm5orf2nibjno3q3h6ntzd9of49n262dtrvg4lvanlex1t8v78vrsl2x4b2bnswa1s8lluq',
                application: 'daydfkqlqvfup8yq4o0q4eqsyjwwsvie09utmoo3fskj92mvpq041jm3es62',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '60740a56-eee8-420b-bdfd-50821bd298a0',
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
                id: '2c7ceb87-9fc4-4919-8474-72a415086496',
                hash: '7zcb6wlpyzha0rv3xazc24lb3scjshqqddx3mr67',
                tenantId: 'b707273c-0f02-4f10-bc35-f9cb47d06aa6',
                tenantCode: '0xn3jm3n2m825o72qu8wbffkpe1a7a1g8ko2gsod7vj8ajswie',
                systemId: '32f7c3b7-a713-4db6-9c89-475089debd99',
                systemName: 'n7cthilu4lyivkw70b18',
                version: '0msjq5vu9sk30gcaskg5',
                scenario: '7f7kthqo0deoylwf20qs51vv8dhpamhxpdutrwtqid5gtnnzb41cd8fjeit4',
                party: 'nwz0c98x32ve0tvyq6o7xu18bhqh2eep4udwtiwnzjwxw75pijtoz9i6p44x89dfl8zedsyafj3sf29xrb682xcuipyewnz4ybps21bktplisv1lwrjklwd2g91qnkareyatr3rc7v4td5w89se9mj8shpxqtr6t',
                receiverParty: 'z4bk7hux7b4kjp1xui3n8l9vjr3f8iyhdm3dvk80zcp41k8t45xhazagye6dtklewwq02jch4179l9xj4irtab824r0wzvc6unx5rqer81ia3kqupeq3iys55ovxjbyn9e1nkai4mstotxi72ucyqy4nxetgnkbl',
                component: 'upgpikinvfwvaj9zx01gkt59x03n7v0q2gpsyhpz19eait2efueoy7x8j9owerueskboqlzs06r892nhj4p72vqu9ya0cj2oiuklhlfayhpnhb7c7sfnbzt0y8caf30p2f7haqsaab5t4ilypf3to5axvz4y79o6',
                receiverComponent: '62jkqse90m8d1sqmvxji1f299s0jrq8ueskwvi84j3lji94ynvxt4dy3s03rc4ogas95tolvu5cy2ld3hgftjk84h4l9jofnr7q7euyoxoqtex6jnqj9vdh0vrolkkelcficwyxvdqxktxrf1szw9rdmmwg5kvrp',
                interfaceName: 'lb5zf4eqol5233h4260et8yhc2apj58xbvfgsf7ninw27nuu6h4x0elvv10slhljr6o3dsagnrm8t0nm45sxkue3sb2p5monxnba9bbzfsm1j7o5kgjfsg2l5nyom8zb9pummxyy89bzs18u548fv8ei2wm3gj47',
                interfaceNamespace: '1bgte2xzht1h55oded2b6tiq1rarepmgj197c7oraz1zfygqwhffm4c6n9ebax6f26sd35t8pm3ybljoi9wweniolh1gyg9sabcgl7f072150h4q8u59oe085bwwzlorn3l60x3qirclur7jvt82onyxpmeqev40',
                iflowName: 'isrq3q0s9qc9uz88xb21ordz5f1w7sfwwg77mu72aun08ty4lt98xphsz4ek6aq2zqb6gtxnnl9l8cnws8fe4bthoknjl61g9vwx2kdabpx96m5am2i216ck03h880zi1nduubnrk4ff2tly9bb0jphedpyb287e',
                responsibleUserAccount: 'rtdu0mf10elc27vto768',
                lastChangeUserAccount: 'h29nf9bkfpry9zfqzmer',
                lastChangedAt: '2020-11-03 18:51:14',
                folderPath: 'i1y2aczj0c9ufqeay7v1yzx671g1xty2whwk94qk3njhq28w6m93pepqr8r3pvpculmixdde6wlcuof52uz0hwmlmyhq7g944md7q4bv2t9reuzamin77snzffg45wha3w7lntoc0s6euofpu1fdjj3kfy9c3hov7ia47ppnq00oyqq5szy6xmrtqzzrq66t4nh63vpvgwbpjing9a9vfolfxglef35q0ctwzqmrjwssyku2e9exxfugnhwedef',
                description: 'lvlqos5ev6ti4gfidxtgpxhaku0y51a99fwt6bxri27nfb109l11afxesbuk0pnc6nem2c4lycbcau2rk6rm0xckdt6tzrtrclm1ztls9kfe0ea1mfjo7ua10xnpyymsgktxv91hxz9ltv50eofg0t7jtqk9hai45m38qi93nw9p5zjjgcgofpw6psrm0ny8xvojiralgcef7yra0k9jq4fup1r94nxmlgbk9obyjb3ya7tq4zuze41hxm03y29',
                application: '6r16ujj35ix4yr8n85nmeqtt04vjgkkruzycmwk88s7s5fl9v41mm83km4uc',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '60740a56-eee8-420b-bdfd-50821bd298a0',
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
                        id: '46276041-2043-4c57-8e5c-7092b38e9541'
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
                        id: '2c7ceb87-9fc4-4919-8474-72a415086496'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '2c7ceb87-9fc4-4919-8474-72a415086496'));
    });

    test(`/REST:GET cci/flow/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/flow/864c9b42-1ca2-4b78-ba11-f39a0685e854')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/flow/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/flow/2c7ceb87-9fc4-4919-8474-72a415086496')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '2c7ceb87-9fc4-4919-8474-72a415086496'));
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
                
                id: '8da1a20c-baa1-45cd-8a1e-82861339b522',
                hash: 'c7bn8ghu4qpm6acgtvn4or4blazafcmdm6qfvuxv',
                tenantId: 'a6653be8-a4e4-4ec8-9a66-9f57cebb7360',
                tenantCode: 'hb0sxzugigvc4mpylpgbm0utxwnsfwq8nrzevqgcgt43ddjwkt',
                systemId: 'ece25e06-2a0e-426c-9d4a-9e7fc580c1d2',
                systemName: '4va0qc0wm5qpdfz1r1u8',
                version: 'oiabym28ja7wkiy0c4ln',
                scenario: '33v02kb3ieoaad8tksssz7xnhau37sgbifkzawpuu8cr82ii8x62bslnbveb',
                party: 'zo5r2dpi1ayvr2emxsorwoudu76v49axja776fbdrqgp91px0m89dmh4v6hqf3uku9dqmevnoffpm2aqxzqua3hk8uucmqatvviokstk6ucb5eyy7k9dz2fi84goptgfjp1drfryd2jaz7r6s5x49qvih97chdm8',
                receiverParty: 'swdoef5kcj6jh6ccaqmnsc327iekk94w9t1kiqjrj0jg9b37h24eloeutx65sxo2lhe9hc0xifmmlcwzbuci6y1jdll07sik9nhwahr7qks3h7k2onaiqpcicpbcjeld3nckzw5p0aw68b7g88fm7zppmdnw5cck',
                component: 'vm3r3283bwrscuslbxiyrrweb5zif53o8u7w4mglp9my12ep5zue0126jsy134snqnjejcfxxy6opbh4i1457d5f699pmj2e6qnby1okokhmexvkck1dhwtcgusctq9jzb89we0kt2m1sn1682e4s37komkztqnd',
                receiverComponent: 'e952dwdrgagknppypgghy7luomrmltf657lowhjv5fdwuxy1i1sad4qty49turbcwfdxciogmp2p86pbxhek457jw9xaon5qx58w1e40zsypt7m8jsfwdmtnjwcei900pdaexk6anxtvqzkeame3tb7hy2isbviu',
                interfaceName: 'zus04vl459s6d3vtx5ji4djx9b40kq69ngsogz40m8hamttueefexu4l0ai693egm6dfiqo0ueduexpitv9hb7tsd6esqmga7n1an2c4k8jfndqar8xzlw76vnzobewl7jfrw94xm8s4yj2vy9vibfdo1rnazxsc',
                interfaceNamespace: 'dnig9b2zvdwx8gur4gbu69us0r3gohuiugus8gt5343hxhwmtx1777i7w14ju9givcd7h3v9c1fr0xqpwqa53378cwb1ngzwcrt3rfiskzd6g5kcyux6z3tmt8w9kq8ibyb00sniiuvjpbhqm8sn17kbsxqx1e76',
                iflowName: 'll6r3bcn0oyqra8em1yjcu7pqf6c7ijyppoxz1yored3jdxsmhs15mvqnyia6pgv9mobu49figv3evl8k7w5kgln5f7bpbkmh5pincvr2wyi6ggwg8dyd7q7lxsfu3dcwxazksknxqn2mm6v3fpqznf1nvxv9rua',
                responsibleUserAccount: 'k94qfk7r303rsm8vrarn',
                lastChangeUserAccount: 'rj9gqcdn0v2j0mqs6afc',
                lastChangedAt: '2020-11-04 15:50:51',
                folderPath: '0br3z470vd3sk216tpyw9l9q1k2vwoysdfmuiezzvzb8yz3kutybn6sx7o53ql4qer5m3t5cf4g9nauodgov5155bobtyv8t5w438p6z6byk7a2jk561ao1y48huam8pz2bb6krd0ljwykrhkuth2548quupze29daa4z0xomi07u3drxcr1pg2siz0vtlgnntsey1yxagb21yxa34wv0ikhsiv3qopw32yfsnva56de1xhcymraud09lef6fg6',
                description: 'vewimshrnyzidyy6dd3w66wglmwcmq2hosk4copq1vgv0kc6hv34zfgt0t8kbqxyvfjjjfhgn7urkh4xcs0h2cthdv14ru13nh0yw2r4pi7sos6goonb8thom0ndppqlgarsdc9kdwikem6mdfba37mx4vbuzhirbaxytd7apv247whvj3f0razat0i755xjfvksn8mtue8jy91c2jobaeayqhsopo1tykaqexi5q9l798qaa8ov4p0sfkvhk5t',
                application: 'vpx9arhdkneatugce5j8n3wo5zqm6ka7v1ftmlsuae23c1y1egyd3svbt33d',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'c139f230-41a8-468b-ae70-b0356442428e',
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
                
                id: '2c7ceb87-9fc4-4919-8474-72a415086496',
                hash: 'tlnvq802sgc64h7m8icu6fkhscmawpzhnzcpzq2g',
                tenantId: 'b707273c-0f02-4f10-bc35-f9cb47d06aa6',
                tenantCode: 'txuzthvs182sq30yz6775t466v3lrtiw5ijv30oypximwnht8o',
                systemId: '32f7c3b7-a713-4db6-9c89-475089debd99',
                systemName: '5cad5f81dbn5i83w8dst',
                version: 'avlmt8r6i8mi7ns7lpf7',
                scenario: 's5zqfi9pu1xtr5y310o07bf1mwuijcu2k0rr7k88att50587w2c2ny2jbj1e',
                party: '623o5k6nja20g67wumi2erwry6ngqe2truh7ondywoh4six6z8jcmz7oqcutq2wwdldtx6cgz8igp39tv6dsg3fdmguwug2v4ktyd299edb2q83p204wzjczpz786rfm9ofqicb25mpb6lskqtwxu2s18f4a7jo8',
                receiverParty: 'xwqykgpxn76fudhpx4e5hhzglox9rv948m17eeqvd6sko3ul26pww6a3p9hsguxsjwqdzp8ogs1oxbboqseezyh8h0n1iy7oev1jbfwcyvui76ms6e9u6805rxsf8iamt5cfkf1bhitfrli0sivrf3u6evct4c7g',
                component: 'sb9gumasoyy2z1b9by49ac7u9oyxnqtailwacui8klmuc3dsoul6tcy7ljku450mczw3vbr6wpf2etup0zmvwotv55r0nkm245kcfkpjifka7qbqje0fruns9endhnf5i7rprsx2kyyb8e3zn7m2zzqq3z1bftao',
                receiverComponent: 'wayc0j03ea064rska8psrz18nv55xnoii4pe3rs32gfeeeum30kcz5b59ycnc7q7t01wcsoje69wsjt8l14mqc45vd6reh4msv94r73rkfhn7hrnuavqxc9y86a62rnqyhnamg51sp3fsmnzi005qguh2qya1thx',
                interfaceName: '6db49x5xfkoyb6hkh20idtk2srzuw5oc22tivqwmgiyz8kyxl93fa1b9c4b4hrn2npkbun6hzel6xlnj0w9w1brdy18iejqvge0ggsj63hestse9hg83g1u1wjq5pxivjq64lj1868dzdto2qz77352x8y8ekx5k',
                interfaceNamespace: 'c1db6otzl8cztn5rwdgax67bfi75m4mw2ofv8txbmww5rftmw3jszo7qudta6typ91otjq4334e1b5zmdoxs8za7z8w293xrdu32ua9x4jz87k91sr8zrvan8p1leg4ifo8zqwdbxdcr8nxyc3mhmn8fh9ddbwc1',
                iflowName: 'rvz716x3ftfjqqms3sbzk650pzvhnk25s7ua2a2dcgqmrj0k2ktmrx7licm1t155xu5i6p2jlan8l7btyps7oret2awnf1fs6r0h93rf3hzt3hybu9ixlykmkn4p4re1gjklo6cwaqr2vti4f14slo6ss2uoqhwx',
                responsibleUserAccount: 'crjn9qo1gq8kw8k4kkcz',
                lastChangeUserAccount: 'oa4kbyyug4p1srtmp7lg',
                lastChangedAt: '2020-11-04 12:46:51',
                folderPath: '5w9eg8riaajn2a8b6jjd802amjzpw1yf20smkjj11yl4vrqcbkibdo8y074dn4kn11m6ls3brqhwyzo21b43gczoso63yjmttg3in50sorpbm6seaadva7jzccc04y06zouuj6clmrjsopfipdukv362ppr0gecnooicz91v0t98u3py1q39yxz7zzzagw8m5gtw09jeriy9qcga3qcetr4viz13ewsfprvjn8z1si2qm3wn768l3y3cm1t1sp8',
                description: 'j9vrpi11brzjw719mykk8sdwdp9g7i07njtzhiq39xvq6s5czqlzypg5ema763lf7x1frvc886t5zx4i9jgvydkcv3hp8k42oj04zr1y3vwpldmb1wqus2jeto1jkqca3x5x7m6yjbrbsnsb5h8pfj3ifysbfpln351nma5ww2n4rj0rn3ycj8a12yrewkuf4vs8gb2cn2cv7hgdw976txho0sl9utqfbula9nvftadiggel6t0237eg1foe0fq',
                application: 'tcguckb2msywa2xxvp0cnmdafs9tt8k2hsltphoe3yx5gcl5aavsa7w9d426',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '60740a56-eee8-420b-bdfd-50821bd298a0',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '2c7ceb87-9fc4-4919-8474-72a415086496'));
    });

    test(`/REST:DELETE cci/flow/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/flow/b5472c25-92ce-413a-9100-41d250afc4aa')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/flow/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/flow/2c7ceb87-9fc4-4919-8474-72a415086496')
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
                        id: 'bc9f1583-8250-495f-a044-e1b2887f94b4',
                        hash: 'tlo8ddn2561m9i21r3d75lhz2r71utvouzdsdkfn',
                        tenantId: 'b707273c-0f02-4f10-bc35-f9cb47d06aa6',
                        tenantCode: 'm0iwtdnva9hj3h7b91wvoq7a10umzi6i0v9jyf62mq8mi2yhiv',
                        systemId: '32f7c3b7-a713-4db6-9c89-475089debd99',
                        systemName: 'q1h8gvoe37aydz9opos6',
                        version: '84b2toh2e8vyhm7c5p99',
                        scenario: 'v1fercw9st0gglp98t6esy7bmwvlwja2zk5xsjivp33lunv8fdz459dmw2gz',
                        party: 'tuecfc08055iqjub4iwz878c2omdt2da80tva9yhi20m41v8o0xrrxzv6x03eg3uvbamm1w5wowod40eo811aor5ih1q80gklg91nvfktdgux06nuojqsgzveatxouoyi2wiwlebmkvhz3271ofcoveo419bw6mx',
                        receiverParty: 'vl87xfena5njwahof29ranmbeji1u3wv2rv2olg8qw1fc5id417j8xvf6a4zkpuboe4h5vqqaq1f0he08qrz6eqdnsxr3iogg74rv9ffejuwsjave8d13ajb4iof6ulq3kjt4xiaxstzuaw7kt2fvsqnemqeek9e',
                        component: 'ogs3kh5yqso5y1idq12hm09pfhpnocpxsivx52992pphgdpex8b36nnr5d4dtbkrd7l0x3wf3p7z39bogklmo8e3ezl6m1429sc6t1lo72zeg5mh5b8azk9362ierbu7wegym94hq1vyvoxcjd4v6cca901rq92d',
                        receiverComponent: 'bj7ytje1zysuxsjkugbih33vo2rlit9s1f9n5lod2wsecuru0t6wrfr96im9zfqwpjgharnu003waq2ing60daq7jigoapks48ei9sm5b0sm62gkgz0ita746bl2aghs15r6gkc2owcvdvfbz0p0fnq8j14z05mm',
                        interfaceName: 'c0j49mfb3hxxo68u8iht03zxyj1mzzjumicwvjfez9d9shwfpz0xkmucltkpv9hqfp148ekpnjj4vhkus1m4nrh99nvyvlygviwmco05lg72pvirecocaxzsr2dj1rianlwtjii8dqqs85jomsa85cyerhx9ns78',
                        interfaceNamespace: '0nuxj1xn7upkgon0myosjyohlwbnerv7l8mw3r46qibb4luhyul6qiybm35jbnct58dcloxj97fcdof8t8r5jdkyb6whfelpmljvcfptd0d79eddwig43bki9z351q1zkbr954xi0aizjcxuovr4y8uvoadtir61',
                        iflowName: 'lmrws6kvs4rp51ar4wlhn1buba31xmor2u182dn4s8smkn9htwxp99f9tgs1w997rnryad1jvr2f90wivi9by8iw4q7d8dxk4m9z4ydwc125947rc1p02t08zoj72sx7cp1otrq0jbjfux5qiiuvryg4pdva6tkd',
                        responsibleUserAccount: 'cxcptdn5d4pna7nuomg4',
                        lastChangeUserAccount: 'nxqpsm9v4z22i3btbzfa',
                        lastChangedAt: '2020-11-04 07:09:54',
                        folderPath: '0l22ndil1bh6kees7gb0gee7kxqs9bolt2bopb5jqegs86y47u9oylf1nydc5juqskt6rsr09l9ap5uixs31v0raj2g5qxv8axri1bt3mcs9tj1l8yahbssr2p8cjau74h4us8wfnugay71qe1rvoqwf5fhiuaun4pgz8355j2ucryxnnfva4afmqzfot55tr6tdl83mwvt53bst4vg2of6mt8h8s8jvkwgfh7wukq3y1zfljif0wlteemtxlxo',
                        description: 'm61qi6rt1lczryh6io0b7c9bxaa24p82fz5a7zjfxufj6d32opm3n00odziv7s73ttbywlmqwvovz9dopd0cobr9mp3ejf77x7d46du22bh0fpg5b1wudtebf0hts9703dxwhqnma99y6t0o9p4byvq8q0d33ikx3dikxt5nmkyu9yekrrcdcp6mk1cj6qz5jjobbpthdhcof6pwpjs1drm7l1rpnzzvh5q04xh3dghvee9pr0k67c7oik7uv3h',
                        application: '0seqwez0vr2revxp4d24opoezuzztemp5nkatzx7imm5cu3gojs3vuryq5sf',
                        isCritical: true,
                        isComplex: true,
                        fieldGroupId: '60740a56-eee8-420b-bdfd-50821bd298a0',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateFlow).toHaveProperty('id', 'bc9f1583-8250-495f-a044-e1b2887f94b4');
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
                            id: 'd53af0da-0907-4d97-b49f-21f1ef8a0be0'
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
                            id: '2c7ceb87-9fc4-4919-8474-72a415086496'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindFlow.id).toStrictEqual('2c7ceb87-9fc4-4919-8474-72a415086496');
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
                    id: 'e8e7f81e-3bf0-4ba6-b994-12a488e0ad67'
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
                    id: '2c7ceb87-9fc4-4919-8474-72a415086496'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindFlowById.id).toStrictEqual('2c7ceb87-9fc4-4919-8474-72a415086496');
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
                        
                        id: '362905b3-b5e2-4c59-bf2a-3abaa2e2de37',
                        hash: 'xm2gpkgk8ic87u77ij45by3h8lljncybwf1tt6zj',
                        tenantId: 'a3ac3d63-0fa5-429c-bc36-b902f44c7756',
                        tenantCode: '9t0u7t3goo8g3tmlqebqsxhjieut4o8sjdf03p870xdlv3mryl',
                        systemId: '5fabad2b-4566-4e79-acce-584abc56a7a1',
                        systemName: 'pll0b1a930om1re4athn',
                        version: 'd374db0zjod5goh9e447',
                        scenario: 'vlvqk7qaavect1yh6m49tin5o20ovwvm2lz20a43y8y58rqoddbxlse57znv',
                        party: 'az992wbxq5279hnzltrk0t5zxtzgsabvybt8wde7fa0swjkcbbrixx23hjt35fg62f0e7adbnsbmkky2y3j1fn6xf7hkrqnnnyo20wk5vm0taxwvzhf401pysecs7b7iyqvmdrjuhlzaoof859npptcai69mnpdu',
                        receiverParty: 'njsv7crvti8pckog0eqtxtz3gz6ibt76al54tocgkeysuv14ukhg1cq8bco8pgmi7c0ynp21rxac7x0euufvn7otq7ola17q7npbswelcczuw6ym2u4aqaiokw6oltbaf96jhdvlpmqtxli2b5bwi05qaju5h255',
                        component: 'hk5pz027e50jktsfwdsysojecz67ycfteq3v7khjdupwi4qwjhm8tg8drvpxv1np6m8l3je9ctpfhzn6nqex6nwzwb8v4cuns5f6u1ev5k8fvm4ffd03lgs1wkzcm3pyx7to9xjxc2kwavhhjjaur7yzknv92o7l',
                        receiverComponent: 'ba6v75i10vforw9phaug739z4zf4uua2pi6gzribshav0m3vgq7ogaqje2cxdm148ajyc41pwnr7eawmxe2leg1i4furhyez2zzcdd590kqiag9ec009792hrnocbd23r24k59mygniji1tpntv982dh12jc15dx',
                        interfaceName: '9hhz8s9v851u9r7iozuq4d87esarnsqpkfdi3974gjzj3697utci9pzs6fcerr13xzo0rgbz454jeqlqzcjmmtcmzv1gnqf96oqz2sn9blw46g4ekhe0bbr7b8fff2dakeo8tvcbmr7fg0thlszvj04skqi41da5',
                        interfaceNamespace: '7td4vcc7k32zwfz7zw3g4itloveykoy56f2eth990uui8kyoohjjpcf92nnvdyruf7tcjjz8ymx1s7uvfplwzleqgw36afcrxfqu0yjqwc39fq7mu45fikmjpm622xvp57k54k1t9tp7mglgwi72cvcg6gvxincx',
                        iflowName: '50vf50kh9aj4y6k8iipxsx1w6in1jpo9sz4zvdua8nq38biuryxy7kj83h9zs2cnu6xx2se4q1fmahowce7z54x1wfu5a75bj4uf6xiwr84qti1crtzqq64acbtyidt3p9a8hw6v3g4qitez8f15hbk58og7d7o1',
                        responsibleUserAccount: '8w02tbjaizcw9l750obk',
                        lastChangeUserAccount: '4kzk62b4ihovk1u0z7hs',
                        lastChangedAt: '2020-11-03 19:38:08',
                        folderPath: 'vs6yfla9s8e8k3lu2wc2y46blu8bfrhd31tmgk64jyfwj6wuk535ulxzwnu0gf3xwrndevojh3gp8zgygfple0zkx7nu7vyer1fg5xezmlxh1khndx7bqkkmwnju4smxi2n6xtztowvrffdkl8don4vtflnfs6x8kucp835zxkmi7ccj3nwxhcw1fcdpb8xvwngt4ic02o5ol5edhfkt2pc48tuysngu0n5c8pvv8qrd7x9ywv92yk0bo97woqc',
                        description: '04720m95dy2mnep84agnq8tcfvb9j2b0zd3xeqqyfil887uhnf0a2ei59vg62viz74qe2lospo2bpg11ks2sav3878x7bggwx6djmvkvqetvlx1crhbftgibdrkd7qcchcs5ewbpjiip1sr1zp15f80485msnll93uzod2ffel7872t3863m2xhcq2r3c8iu2wiwcfj97j57y5mmn4o8toqdq41q106w3hba8mp1z0vzu2wdiou57uznp8dcsjv',
                        application: 'nq1kzcn00g8e4bwl54owy6i5tht2zuv6tg41pq556v9aj59h30h5f7256zjm',
                        isCritical: false,
                        isComplex: true,
                        fieldGroupId: 'd3503fdc-5490-4425-943b-c1ce5cd0bded',
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
                        
                        id: '2c7ceb87-9fc4-4919-8474-72a415086496',
                        hash: '4wysni0feq32ne0zbyizcwmzm3gqfm7tmttlk3r5',
                        tenantId: 'b707273c-0f02-4f10-bc35-f9cb47d06aa6',
                        tenantCode: 'c1z9fjpx07miehgqn9uf28iowuyajemwdi9x9zi1685xsoxsjy',
                        systemId: '32f7c3b7-a713-4db6-9c89-475089debd99',
                        systemName: 'mj4lfibvf863gx8t0108',
                        version: 'bb8b1xfq2u59bpebj1ue',
                        scenario: 'rxcwjgvopnzi469ljtuz61j12lftc3berjo40kjdlxr19rnmesl7m7937y5e',
                        party: 'pi1zbuz3jnjjxtn9v8cdtb21xwkhvd2jebaqc76ij0yd9h086csjypa0ghyk4vr0qeqplu43vzjdl27ywqeeuju1qrkxs6v3zkgvgewtbnr51z5nfdjpjv4ij0ihrrvp0004s338cjlda7mab7370fovflnupq15',
                        receiverParty: '4fhkq7eh1u1qj2mfcgd8hbpp7ghlzgl8er654lty210dub56h43ud5jjot4lcrvgc598d14dta69wr44vwi166a7szk72mekrv0v3qy29culnfm3fvoiipfrz1uofpj6x8tbb1akrvv32szpm5m0uj7f3o5rp9e7',
                        component: 'y4iq4qr6m29idzu0y6mr7zih9fz0md2ir7yaj6sokji9br2lqbk5h2w81d7xxbiyu7665hnnuqe3tsp12js1cyxg7rxwp8new0v6l8bym5fbyipl6k1u59s50uxl6jgfsxq4an29k889zrdecqqxnzrex0jsyolu',
                        receiverComponent: 'amdbxpxd9omhz6x9u5r9albutt82k7epih4onz08myebtqqsandf3b05ecakl2up5oc8v4sigkqbdgaj12dauai8gvvvrgypdvdunx3ancw6d3nt9dltrctdemew3oxto0chr4fnopi79tfq4wpo1m2kcty40ylr',
                        interfaceName: 'c1qdp3fe8kyw4zy8m3iytubr1iadqdu0ool7pk9yrfw5okhy6sjlo12wuxffavm787rgaospe5gkkhctf3y17f2yfo2tumnx6jkx3znodvy1p0ib9vof52vcytlhq16yjprg9ey8vv14f71o1mdnx9450665aj17',
                        interfaceNamespace: '01gfjbypvo4mnqfidoni8j3af0qo69v2eayotdloqw02cnlplcq7bv546w2j49yei8sl2ybrflf3jl9z35r1t5bgxwvq4q6p2c4uemxoqqcc8kfnl5lfwt1eg4ye330gae8agj9feka3itsqrq8l7p35wcoo6w2v',
                        iflowName: 'c976wbr5uu3ct8y6ke54eetkbe31tq2sw5d8ivr8f5p71lgubmwrbuo36vmfv16btfxfody1kj456xuve3l38scxtysm52hqb4miqib2cvfxluy5uttlflvprmqyi8ij56h2yb3gxswm9bp4n1gb6icqyp3ter8l',
                        responsibleUserAccount: 'whrf807ecru1op21s967',
                        lastChangeUserAccount: '3yw9hlup6h0ae1tay9jn',
                        lastChangedAt: '2020-11-04 01:03:34',
                        folderPath: 'sepfw7gmnn4olo9ljjn3tlqog0inpure1bq40to9dy36bji2ffpmdxsfua8pve5oiyj3r1mkdnqsl1esj73cybffzy3aw32piwbgt93eocuslgmld8tpih3zuqkgor9y8zj975vi25mxr24uak7grp0jjjp52f41ebm0z84bha7j0t9cuph8t3033aii2o2cnkvo08lrauola8suhidtyromirbpihepvfywxtwvlk6qgy5hh57kpldxirvz23z',
                        description: 'utpmst1ivg3ibm9fa33mlzsdp2vh2wz8bjmzk5egklpk31ftyhws176i3vz2vejrew93jz06v6lor984kvnvx5cw7zofpo1j908kykvq7423j2zriyrtzucnqivjcye0wdr4iy082go4p51ogpgpv488rgya4zjsb5q5f2fd23niplajlx96ofyh5ha4d94p4sbxqioutlqf9zx8trg2pzi9y9ffseevi45p1qr9bpj4caa5ff31vh6pplr1clb',
                        application: 'zqubz71t5j6wd70rct9vn5rboa25615u55ahgx1yo0ehsr9h9yw30f6hyt95',
                        isCritical: false,
                        isComplex: true,
                        fieldGroupId: '60740a56-eee8-420b-bdfd-50821bd298a0',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateFlow.id).toStrictEqual('2c7ceb87-9fc4-4919-8474-72a415086496');
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
                    id: '2cf7dba4-251d-49f1-a5c5-4971c48cb4f3'
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
                    id: '2c7ceb87-9fc4-4919-8474-72a415086496'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteFlowById.id).toStrictEqual('2c7ceb87-9fc4-4919-8474-72a415086496');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});