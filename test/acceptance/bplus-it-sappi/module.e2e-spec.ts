import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IModuleRepository } from '@hades/bplus-it-sappi/module/domain/module.repository';
import { MockModuleRepository } from '@hades/bplus-it-sappi/module/infrastructure/mock/mock-module.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('module', () => 
{
    let app: INestApplication;
    let repository: MockModuleRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    BplusItSappiModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            dialect: 'mysql',
                            host: 'localhost',
                            port: 3306,
                            username: 'root',
                            password: 'root',
                            database: 'test',
                            synchronize: false,
                            autoLoadModels: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IModuleRepository)
            .useClass(MockModuleRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockModuleRepository>module.get<IModuleRepository>(IModuleRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/module - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: 'ec9d7cef-6b13-4354-a789-de58439230f1',
                tenantCode: 'mc2jbc4kuissiuop4i1dcl6urdbjk3e06a2v4zvqia1wmep2ux',
                systemId: 'a0f79650-b44e-4018-aed6-c2105c2f0d08',
                systemName: '4uyu3u6pgpxlp7jjrwey',
                channelId: '19a8be96-fe40-4976-9d4d-bd9d3b26d8bd',
                channelParty: 'c5yfoisk60q71n0x3a93efd8ls70yyp9rq9hi3yc9o8c4nrxj70wktr7nhz5dgjmm2z729x25o3sg6ynqbs86tjhb8wakv15bl9aoqzjy0ldaamha2s0t6x1kmjwco6yv2qe5s6lo1mkcfogdh0xtooxmf3qj8yg',
                channelComponent: 'xs924pwg1p7bf0huzsqc3n12d5uoxt3pxujji1m11moic2cblq8a87zqzemi5ji14cq6j704986wxs4bx5l33cmv1cm4h81h9a9gr4tpyz07przwx6s5544v7k1oupuxf8yjorz40aaw8pbqlshyynri2jnm9ypj',
                channelName: 'obvekx3f5rsqcdga3dgbxi5pzpr78zca362strtr5ct7cs8j34a4ahgb77xhvrt415ikirs87y8g4qvyra1f8kt30yxdq18bdz2h1ckdz1fc2n812i541smwme7yxk5dknsbsb3dw6qpla4y57drvorf7y1bxsq4',
                flowId: 'c10bc3f2-cd95-499d-a95d-188526a6815c',
                flowParty: 'cp7z49smuy2q3fzjuauq702tqt4gtdjnvje6eh3b8rw8crzm0hncp4nlut2uzw258il3lsjoenhuj6bykson4nhoyy4di5xca420c6t63j61g6zks7587ey8o65qpk8510dhacb6ufvmp2ujchn8sjyerfkwdtj0',
                flowComponent: 'um4x8prw2y0jjv0gdlz9a97fk298tl88vvaf686is22q4zsiim6juz8nhhr4uhkdyj516j6um9yl8pdhf2fpkawycl7htd0irh6itpoaly5ug19fjulzg9b5bn8zww9kcsrmd5hga9zgeud5rixy0yqj8u5139p5',
                flowInterfaceName: 'i12fe2tlbsxyvr2adxrhbdulaureqwod8064ydn8p20kk4urzke2jamxouhygqmvvs7lcvlvky7m3i3m1ue85a5vl5jb1c8u9g8ufzcwq4uxk1228234pd546ynpilies8zr4epr9dasth00udug6oh5pb3mq78z',
                flowInterfaceNamespace: 'x77jvtpaxr1zo11m48et4vwu19mj7xeuh26pd1et55dl895gc4yjsm61r7ln6asczz6w8ypjnqsblsi9k1w9kl9cjicpwj728og320lfd3wvfpzdwj0958rqnoquzweoq9ryv7xazbyh4owxkkariogzz4g4onq9',
                parameterGroup: '9kr684fi3s7ns68ayjhe6icv8exearuocvcqs3n7qqvz9wjqaezzk70tsb57bwvphzbqo06oc5cnmebtjddx6apzustdzj2gi8vc3xpa30pkx53s0pnczxun0tfet7fyb1ui9s9mdaldbtczgxppwvxpyyx12t5xqainbkz3zmypgbcipkogri7olbjnky71692die376ec60j5b6tk7sqiqnarmvc7g2sglgcog23sysasomhv92uov3giy1od',
                name: 'q72sj4t904v5vgoh0d2r4n02pp62rpx6ggd9121lo9pn21p059kkhlhnfp5equok6uw3tnpa1otkcqvtiihnyq734ry3a7svbypun2ystr0vztkvnzqf3tea99ns1wsfyr16fdhuw6bhs5f98cdi4fmzhtx3i59sgty6wv8upgitiyycrbua4y2c5w61spfgufbzr0oz51jnzp85d4dzjne7iv1a4631cguag03h7r57calh45wlcpu6ia53ol7388v8hlyirlbq7dkgyy84o3cyjvlss976xaj8zmo9pk96cqxo5p2vojsa2jwtq0zq',
                parameterName: 'up2qr1eijh9myfx2fpeo1wnlaomvh3mf5hz1uv3eponlim7jcthl0hr5dwwz0qt5jkw3zvtggdh8bgzfnilcjduul6quhuykoszvikz8acnbmyz1m4dga6ovgmi5lnp54moeyfycbujw0kkve6hkj8o9qx2fyx3lm87wxiemt5st0rohq7k0db770j8ya889vk71n5b8au7yvn1je8pp0j86tau0qmbwf8v5xx42ymb9j18xm986e5qv9w20tmb94annpknbbnla5a62pkcf94ft4egfoe9ae6pwrx7f47ob0g0ajth3tr1frt34xn5n',
                parameterValue: '09t72cta33qzvjdtkb0ouhotmfoi4zs32nxwsvwquaipglcmuvyixmxoq0akub0k7y9gvs5x4dsr4isiqs45chk9ec4s5xfsp3p26ff1qsftzfok5qlsjg7z46dilz8ulbw9uo1l0z2uxzxd1pvt7aed4rgf3nwb91y7wsggtirat6ydfz3bm1qw2vdt6x999ckz830kihotvapuho4ybyh2ddrqdlpfovz3219ctok83rqxwc3d3tq515nqr6ltqssv2pl457r44k3j64iuxogp9zxk8ibeuh9qmvarkgftvizp105ggjczlscd8hz690wiwaaej259m20stvophddl78vkag1mlmutt6igxsfr2gqe9o0leidok5lfdmn06h6509phzsvggosd7ncur77wbxqv2ylatyhsz5eeeb0nszovefllx0ik6gwotpjx6q7isq7l1j1lcls5dj28v9mwh7g3ou94c8moipcsy8zuunbsnurhccxuzpdj7kh15namjcq5j8k5s2r1n5uhb4szxru1rm5a5rc1ugdtmeuco02vh9tyb2vi7dlf03oki4cv6azlasuhzfubm6xfy364jkmkgd4gqllyr9s7jtkpd0u7ja1bk8e1wg0kztl4mqzz22wkxh4bg2mgo1e9qobd2b23bhqkb21xz0kic88kn1ex13d9kk8npznva17avuhvy42bc5wbzbkrvi3tv1gxdlit2w7o3mpmxqfnclmy57m9lg886q38e6uxlpf9t6bs96f9dzwkfeydyfpvrqns4btgz2av8y11ngb0it8gsj21vw6oexhwb1idczvmsqqvd65k95rv2ujfa8ysp1tjz5olnto083fbutu0lv58uzwdihtn56jr1sa0phvcxrhf2i20vn3rr65uincxh0rrwho9i6u94czly423vq6j2fu5n6decx8on08hcthekzqmgnk6mxxedl5bc56sd5ijbl0b0ity599ayjmxevb1ziqwuvujmzd7q7z676kq',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: 'ec9d7cef-6b13-4354-a789-de58439230f1',
                tenantCode: '01mwtekc6bl5zqfncpfveyvafupyjgzshygbgc1dhmajmzr7t7',
                systemId: 'a0f79650-b44e-4018-aed6-c2105c2f0d08',
                systemName: '67gft3wuqyj8kwz15vx5',
                channelId: '19a8be96-fe40-4976-9d4d-bd9d3b26d8bd',
                channelParty: 'ukxdza4o2g70qqulojlstt4j0f0g90zg7tgcqrtl9wjbgfxztxaj0m6wdbfuz4nwy4ryxwt0ei9o8fqgjx09oy2qb2ffsdopb5jyjkzm36aqango9a090wi3nz51yky9lbe6ewk1tj222p7kog1yutblcqgypykt',
                channelComponent: 'zxuibpeme4vr2gturtv14wazi31pj5rd9j7357fo6e039rxly0jfhz5vu451n7k9siirskxfok5dneg7m1gdtgdo0blp53cs84krqf0tcc8kdy4og3zv64esrbzni237nt03kup3uloslvrhhtfy74wmktljv48k',
                channelName: 'ojerx5vrs7eae9wgmkgdogl9m20ktc0jf1m3rgg8jmbk7prizl36oxif758co10wwqdnfkm9pety6pt3ajqo2zxtkb3wqu9y4r4tiij8u4t182i78uqrkkaf39nvihqouku0a8aojylucz45yzog4uir27hfdzsr',
                flowId: 'c10bc3f2-cd95-499d-a95d-188526a6815c',
                flowParty: 'pt3zyob9mu3xxyxx7a983br336oy8dg6l9h6x8sm7v8qbbfm9wkcza486c4i2dihtnolw8sfjic1tlfwzdco9bsjyjy2kyng0xp7pw4uevb5y6ezmhprxf7zjcb6q7m8116ztigew8hhrl0bxq9de7yqo5ivd7xr',
                flowComponent: 'mkyy6zk2hvkbof4l9qtocac07hiu2uvx3ek6l1sxygfumrx2j9cmxz3ar5qqfo33xju8bfcn9he42mz0jsspy9pht237u93gtzz34j22dcwq06gs7qr7wmw52wklg3730j8r9ggw8nam8youzwt06ca5b956epf6',
                flowInterfaceName: 'ixendwadw282lrj1kx7miv114c0k28cqab8xilt2lkoqvukl19o9zahmmga1xzo4345sox8rx87wkwkif52meww20mk72nb4dsi5n4vj5yncrooypcm1w13x4lczoegdy1smlzp5hqp7jf98dcclv97hw33wvxdu',
                flowInterfaceNamespace: '6ba1hbjt4dytk3y76sn1ah4mmoqs9n9wj45mxm5wex7m6uh0xaqsjdvjs1huw7bxcjv1v28mj14z9yht24ct07kmjvdgiskoi3tmox60ue6ldyyzr774fpdxaf9v4byrbw5qbh3wdytzb076n9d1rh0wgikz3ohs',
                parameterGroup: 'r2965qr15o9wl9tumu2agg84ice5n6vqkzvk2lcvevspodn7qd3lirit1zx8kgb9qcglp9wri7jh07dk6qxp50glsgssk72pez3cmipdyetai8khufp7zatt5jp3b1zdmklidf20a6ghseu9s2rgx0zljjfokahondgygeoiv8rte8ptf7n1bln9qnjw52dwdmtqtb54x9ukwfw2nfvwte1b6zypb3fdyo9jn4bqw2y9r0osquho5svl8da6qa4',
                name: '17fbuyr87h6lxx0jucervs790ooiybmglmk9izhon7o4fw8s1ydt14hchppkciwjzhqxanbo3guxho10yq7bzno8o4p4zzq04gr20iqub6eu1003749d6sbzo52dyqyfm5wclq2quhmxny3ceuv3s0np5yoeu0l5hz37af0lk25jsirdktc8ajhww0ttpb47y4xa9r24wjyhglmeqee3olqobp0xyc0fafzuaonecz4rs6y3x4lschwrjuazlrf931v9l6hw2g96anwfzcgz6chqbhstluwwdwjiqsmajb1deutb9zoylg96e1gbt3f6',
                parameterName: 'zuuxf6i4uiedxpgfsapcfoxa9en2i60rd8r6b4pcyf7z0fitb47fc6w7j1bqpkrlhfy8yrbaqgz2fgqm5el109vfnuiz44e4ta30dffh1ga5qvtbm4rpkbmmd0v4m6r1xjmai5nke1lj9rot7mt2ot5urfeoz3g211qiicit8o1y4dyispa17gdsyyxyfwi24u0ginx2tc51o82ukcxq7hcs3bac54pe4g6n5q8491n6nv32qma1hdfromoak2o2wg9otvkmtlksyvyh7347oa3reo3wectplr38epl4ojokhkw5irt8ey3r4vnznuip',
                parameterValue: '0guvlrvz81r63lo5it3ylehwev58uwd5ku9et6m7lc972sr2x1b07iyhq1okwdafrsl130d6jogtuimv17ghdlz4wwiiga9hkefkiblq66ni6hpa5w4j3bgtjngtce9s31ix452aab8tzbwcozn7rs2x0v0nm0zq3xgbozpqxeq309dscy4g6unc1qr7hgbhilo89dhmk1cqa0t4h67y8y79cf95u0lxxweiumn1fq4cgilepazg0k6w6ix8t5awo5bmebinvbdln4jzfgnk3gkreixn39ddmc3o2mqghe5taxnbi1jqd5ejslz512gkmhqyl0ra84sjsxr8jy8fsd79sibk5givsl81xs96r5asykkcag5izxoqmy4kp9qk9s5pdb2019t26hpnmrfclg0ibirjm7ijxkoawnwettle7i79yedb6ffowu47z5es8za827y4zwk6f9q1k4pkzxfrf720m4owb5vzx2c4wbuqubz5hqlf7n18qlmwc8ogsih3xwhncui1o9th0wlo5vud0xrepoca98132dgvv2v3uebgioq2ldatw688bqd8q08z0484ir8k55k6bs1cfqoq8jmojck49nu5nha6tdm64699e6w7m0m7ciyhcfaomjikx40ybh1qoropoihiwyag9qbdgk798nhfy00910mqhbxeyjk6yfxb4lkgehpmgnri1rkztjp1e679g4ofpsuh4p4lxq4se19tmizkcz8nlx7go4jpe5kkxamwmy49auhzmq5q4rq3r2g6dk976xx49lcd6vsp6wveqg5rj8u5l392sjxdc4as9t2hnkbl3b36rqix3lucs3fv07q9s2lqz65akqznjgltewji2sdgpm84jctjxrv34h95ryljyj7waaott2bc02gqia672qumifbp1xpaaj694bsat7p8jhi10pr47f33c0h2edwmsuhg6csonli7lhsvrdocr8ofl5ffmix8pzmfh2qrhyey63pab9o2ag8byrzl8qxv',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53',
                tenantId: null,
                tenantCode: '1jxz5yfzwjb5ucwj53p12yz0pq806t5efioc0pagdsq4xy4vkx',
                systemId: 'a0f79650-b44e-4018-aed6-c2105c2f0d08',
                systemName: '37yj1uyruv5ouwww3pi4',
                channelId: '19a8be96-fe40-4976-9d4d-bd9d3b26d8bd',
                channelParty: 'f8dh59x85fsnom179kqj8s0xwfkti4caafejhhengrer09hcm0k9z59rhg1c95hzu7mkngtpooa19p90awqj1wa3nmgueroxcy9lzd6t44s6xzov3vmglgm02qr208mebgd7vymegizye4c1w8ri0ckx64k2q4nf',
                channelComponent: 'hihjkjyveshnmezxazjh3qltv7vajqgd5kl2e4u4nu8f9g88u2uogi0dcmvq941eudkjqoej2gchnidoskomu7vmlfq9h81rsu7oas89ka6650qtd0xw7xkg621shpwcshtcpo4ye7euxi5tip60sj8je6cn7g62',
                channelName: '3z0phtwgn0hy3tj6cxpxyculh7qljcj4f913bwbbp3zqarjvq2d9qjdj4ork1ld4cwxphku3wuo8ltgekmlv7s0sxxfbb31t3hz1kmlipcvq3dbc0sx69q2gceb7t2ataoxsgxw6yeht9776ofpqvsh5752kbr1r',
                flowId: 'c10bc3f2-cd95-499d-a95d-188526a6815c',
                flowParty: '55tfppasigv9yh0wawlzgprhelqtywz3lntdofc7inrlz86056bs5ovtdstwkgd9i8627ya856qtf53r866myhtw20umhlmzrfz31srqpq01skgduyxpm0e79amedgajmhdadg0gxbqs2ed9yb521wq9prt4nhcy',
                flowComponent: 'g99fsob7ts1zxd6ucasypta50o7kop4duh7l4r4szkwazb625jkyovk69s3v8okd510j7yr5digk4ouv4lpzo5t0w14ykyno9ravl85rwirugdt7rehm2jbkkerl1itaaj593r0xf158eimv1fmwb98luet3vaqi',
                flowInterfaceName: '03o5kr0k802zlr3fvaj2vi6gv4z3ijhx5tfm0n9r1n2s3qjdyrkjhb5wnqi21uzgjkv8ct51xd6pw9q5ng60onl2hmutotv7xhuwvgeclk85vetmss9eaig3cyxi9m3p5ymg0559kx5bfmjn436n2bnr11jnio7t',
                flowInterfaceNamespace: 'ismkm5eo9pevq3ked2y4ic4ye8e7nxobq6poaruzykp7rl7woanjqwz73ed6ye72ibxnrd333fq7m6acm4ff4by95sx581qf9a75zn19ecqqkbx04stohjlm3g0mm6f2irj5x6ldbr6e6g8t5t1jojyoit961xl0',
                parameterGroup: 'wx2ulie08fuzakpcpt30fq0kpyfv6exceb95gjmr77i9cnxamk6r3rodwzs20bmm859qe7f4a4d8rqyaccmwawmwvvh76ts64p8pupdegc2tdddm5mq69f60bo9rvs0bosfyyhbr0owrygy9xjux317w5ekzrfvt7erilz3vburasmhdmn05na0m821iidsbj6tj80wge2epe9vomfccew7hufaeiu0qrqvxt2etlkk1upy0n9cwijeehl2fs63',
                name: 'vl756lzx7p1sct7xnhq9xjlmhe8y6bggkft526d5ajfnyxc671n6b6o87n6rwqo7ich3alm0sl6wbiwwdbl6pardpkmp0g8gkin27ofxajrtoqvgbnhtgp6m4med78irasy739ptuibz3xu0g56ud7q0ypgzy6hasnsjc0ddo8ibr77dasujpqbna0y3cp23rd2i0uc04ek85aauahxkbzytm30eec9ksn9h6h1pgz9gu1bpbmg48vxwa2y1kflot8zzh461ncacsfp07toeck6kpndjttgijxaab4f6psz1cxum07nn4owh5ev09phm',
                parameterName: 'fhj0xdvahp5mi6mbiwkeng0icysx63bwzmy35saq5gq86ztg39scpfegbuhq3k1l0ex8xvczuw9hkqbq56q91az0563itlh0qhy12bemj2hzyyiap65oqty1a28wswyfwwod4tejxde4tyb7c0du093218pvwjt7fhe0kogor7ulvxfek368z2tq8dyf315l1km0rt8jh7v3bgp4eern35ci3ee0umkzbn76cobr8k7feoyzwxlajrx5771okrf4x9i5neskc7a7jk4twzezg7i31h9epig26hx8y0mvyrwgai1e2ax6e4np5sluc4go',
                parameterValue: '77e25rgqgawn9q7yffhh79e8lcydmolqtxm1hrrsplnb5twa3qv03i951q4v4gdc5xu2kvzygt3clk3f061undn37ylb2baettm1sl1vw3pd0sqtlc21gprqtqu6sld8sa57mt8wlxoct29sx9wzzxfwtmcefqi4gv38gvq8k1zgm0nrechjt50y693f56qjg4al1zfkyapec3l6kw2azcvnfz0cgpys7080w7n3nbco98gs9do4tvzsppjkr2d9sgxyl9f32h5mcg7tnn21mx744ndvtcws0me6yck9o3mvtv7ect31s8tvnvylwmv0rpyck7uscgedx3bn0488ndv34imo0224rgpq4h4lgnz7efhh7r3aq6w8gkb5lgpvavhtz5qmeptc4eah3b5mg8mr90p8wh982z37g6t8za8y69btq8ka39ak19aaabttrs0304kys2xiwyktglc44c7su15ru4ax8lcijkbr954ew6pwljrvut3c1li4h4jbbutzt9b09kxiwrh0gg4rudoa2ur9rtsaa7j0y8yzgorp0r2q0lgkrivdi3ir5lf4almd9acx70jabl1opkj2nhn641ekeqbbzqtmmhsfg490ns7wykhlv1dloxk4brslq0i3zln3j9zfehiuzr717jot17fe7mtphgtlo9dxmjmyviii7sz8fwmroomb9ax4guejoc8877vfr9mgkgxu0yt7x5p8rkjgqjp0hwy7t51omhccvwri41efmp05c84k9vnhqvtqys2meusezdbkr220yk57nw43k8tg65y20w0v50poddp9eb1gg95r5v0hetf1f5e8dt6kvr7pgvqbdg12jq3ucw98i31gdi2nx7a04ymayy9y3qvf3wcltavdakgz5qn239hpx0eex8mpiv4ga0jy0piba03unmzsj9ik9x22gg2spnvc5xpd2emk0vbvw9pkw4abyuzga9awault3bexk5r1wgmf63zag5b4355n841i9pc7y1jnlx9c',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53',
                
                tenantCode: 'w46uwm94lmey9okq0iwgweoxw7o1altstr33mf9la4euefwsg1',
                systemId: 'a0f79650-b44e-4018-aed6-c2105c2f0d08',
                systemName: '4uhxsjezchaeuggidcrw',
                channelId: '19a8be96-fe40-4976-9d4d-bd9d3b26d8bd',
                channelParty: 'opz93eyf954yf9u4i5oa08wv6lfjr1uxcf5worqr9h3hq17wxxxajfzi8ma4e6rw7nnu7vqopwz8xl1u8jxpie7q2njuv5oji2tp6bqefawcj7lwe61tqrygb2powbg2b4d3pb2zyzocda7dk9ztefd17cu4wj6b',
                channelComponent: 'svzycrj03ibvcfykdgyzwy3uiwb55uzy54awfvujunfsw5jv9t9kqbssucetu94c7upe7us30cpogi2qxsga4eiwtmtd0ed9nniqlqi3aua1ifaja0k2vtzr4mvx49wue1uq22q2lqvgi1nuzcnmyth3mnuexigw',
                channelName: '5pqun26v1w50zcx5gzohssnyk6fkykt5jqbmntnig116xk01dd80lhfhu3txzpkw5wiogferhmgjnpnzc1hq6qfuk4yen814xk7pmnbv0vlj5n232a5cq85epurt2nnt5hiryeihve0wli3sf4znthhm420r5o17',
                flowId: 'c10bc3f2-cd95-499d-a95d-188526a6815c',
                flowParty: 'h5yxxoh3buau8qhy09l86x3981qz46uvwmfaxt5hhjxr8cmw7ujse2501sn4nw5layofjy9tqchccg7t6znje2fxjgnqtn1hx0racg0q85waqm12nipqoz2h3c614rjliok336lpxz46fgklcdzg2pugwg2k3el8',
                flowComponent: '9uajqetrpdz3c54wwny4pofhhpo00bchbev1mnizushur73tt4ss54hcb3ieitfuttnzoo1op6qyd3229swdobqt0324gwmdhqf6lw5cvu3ycua90w7eu2evu442wi0t8if64cwlaub55wsfu2rk1m1p7xshl8w3',
                flowInterfaceName: 'xhmi4f2p9t497zh24cmo7zpryes2kg244czzl6tdgjbtk2d2zvpsul285dwtyi7z7ladhv7sgpmrd783tep0l4imv354tyozuwn24ff73ghra3nlx4l5e2mkc9vekw59qzzyjwr3cfolzffkq49orqfqgi78itdj',
                flowInterfaceNamespace: 'zrc06x12fsp4g9ajltue9o2jqow96itzmiv4td9yfuk2zslpbisjetg2s4fu10a36scgvd6cv7dl0jncyib0euhxoimotqnueq1ux413cmal4zj2q86xko42l7rk8xyelhbx4p7gqtkt91k4t38ysfttiuxoqqo7',
                parameterGroup: 'yupxapc3pa3inho3c7v1sjmgedqit9vgt6ajf0sj3r6k0ydwkf5hhb251ok4war0xdh8utko6bsktsjsh1i2ztj7pvwm17w9q4w6wod5zeyy5me6op0cqehgz0urqsx4qffdlkincqc0bz7udz9zm63m1chppyt46xy8vzugmmu6jc9hxhap261tazmlsr3g6jimu9rfsqz6qgtj3p65vfsf4t8fmolpd15bg85bfvfzzln5usp89s89bd33b32',
                name: 'udmr0jx2fq430dmthxx8w7fjsg8apsc0vzsyekc2zbc9h7aji30jd48zgcp9eguv7k637bvmatha30vw1162rgor0oancbw65nvk71h3pacl7atj8twkhswgf7bap1r3ycfp1sq7cjsu0i5prpukgi9p70wisrt5cqb73pyuyv6davoat13t2di20lqpq6or85snqust1w957yn7gwv1ykavcg71lxhk5owk80vaz8msgdkeiguypsav7ky7ggcn3k6o2nabcydvhrlz8kn3yq7ouuzdkvyik3ypve5qmnpxk8uvgw3bg8hzyekb5e83',
                parameterName: '0wahs5dxwatymtgnhkl887sv9a3tbazhj595lbozw9ngv63ytwe4dffvdoeukg872xcprw31gawqdn0xl41f1tkk8sln6lzprar55gyojubvg5pv7nqjacgykyjcyxuzv41pg8ruhadx1fwsctfj9rzizt2xnuca8lgcstu3sal6l9toxek76dzvmim68b94b7r8pbq9y43m0dbdo75nx324o2edv7g66lj64mbvj3aph3drgozltnnqmw48u8dxowg8dzyjfut3dy0x20ryrgous8cs7z6p8m75b300rebe76mr6pk1lxy2f51br82t',
                parameterValue: 'lrq1qlfjzez3306latl3sgdub7hzz3hpv0epl8uyswia58lz9xhrkkz0djvixkq31dhsbpq5t9day97zpmxn8xtpur89if2ehoqco56fy963y0bs4274ox8di5c66toxc0wgihbistibnnmglzuaeq3kw8f5rqh07byaf9u1mxn37vj0adunwdfjppjhf9mdvrn6f09y3jsks3xcq1vk3401gka4rcqvjb137wm34yge5qneousej9359ii0g6lbgcanl0iv0qcz5z9u34grampze8dlik34gpiwkjyri5lm9t6fpqgvuhrvp551vz38qc5r5ng3vx47z5b26lemlzhelu2dc46dtzx1jhbbb21xjleeu6qrzp2uynzy5gqsj1qa2reuhc52psg2yhjy1ltptii6cksuwh955io2k56mouz7puuaxopok1e5rsmmudxhdrf1z0zgk729tf2e3ach7z77tti21nqvdl66nxz1y91vzbjnq311ak55tyjpvz16qpfe3rek39l6qgn4iodvd62v4fihwdjo97wbftw0dcfvhnicb1qlxfz4dh26xrnmoauia11p6c5yiw7rmlt4ai7jx4aiq8iimwv2cw2hjr03uk03i96a3uggqtbx3yrqy26sg1h1uh9ctv1ls00d9jxq2dmglumm848dgf679mh64c4160pi9pnncp4xwyyzinxgwr5fi7vovjxd0b6tepxah2bunnv0d8vgbgty62lrvwgzhovj208jzp5p495dh3uuaxf40p1g454dpala8i8a3xmg06z1txmzywpsvpfv7d5o545ysiafkc6un92s3tjyqlx7dizohnhhnqjcze06bhv9hncse2vqqp63h8zousi22zjow2kfb40fm939da47sg9wh8mo34vwflf2ujdfrh5sj7tj7ai3rebsu9moo80tivc844kql1934s5y4pnsxi92hsmusax0b211dt7te5jufjymbunsz1ubzkv3n4u1jgjg7ztb01ow',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53',
                tenantId: 'ec9d7cef-6b13-4354-a789-de58439230f1',
                tenantCode: null,
                systemId: 'a0f79650-b44e-4018-aed6-c2105c2f0d08',
                systemName: 'dekmwvyae1m10tljybg8',
                channelId: '19a8be96-fe40-4976-9d4d-bd9d3b26d8bd',
                channelParty: 'xjwhzc7s96pz0rfznvkvid3a31vb4q26p2cgeim0lcti016u8a24c02lgxrag4dqvmz9um349tx16zvshkwgyxy69gabg19l70gw18u7nehjobsl9vnnbuxi69yehfbd0f20srjzni6j8bv1l7mvgmt86pubimxv',
                channelComponent: '5dl8sffvsi1ijn072d8qjk2h5nk28qjt28kic24ljenlfw0pihfb4pdyio60nvszz9vu8lfv6sxc8yvsqrg41q532b36gbrixk9f6xdgehd8mxifvpujpkdmlas0ow4eeonom6cr3akqucwww0pto0eweh9lpiim',
                channelName: 'ppl17wdntlblgrxsn97nmoffh2eeqhq803vn6gyyyqg9b2vr8lupzikp1vfzfgqj2m4lrkhlla0sgmzywst5xts96hhabitms347knkakzjr078l67l8tsudyfqah64k5flr56kidj6r4ldfcm9b2fdam0g8oghs',
                flowId: 'c10bc3f2-cd95-499d-a95d-188526a6815c',
                flowParty: 'n682v4n8um3w9sx4qtjq8t9ifxwoyguksxxwt8no5nmquvowj9bt85dvwufz76qc67i8ob7yd23uawdtzzy0o0l16nyc431dttb8a4c5mg1ri6mqxegexasdsvxt8panj8fktt4vd3nqkidpe7yi0d6z82ea2wce',
                flowComponent: '49sjx3h5vtwcpzb36c5mz5fb334reo8q8tiyfenh8v0bzx4j9lhhewi67t4q0qsliaecd7hfr4kjqva5haseje3jv922fkbalvsw1ess98vj31h797lp2p1qmoeqr5boe8d6e6vy8ex64rk6s4e9n9f8q4hzcvig',
                flowInterfaceName: 'zcr2bfxxp4pjtxf3jkzt8sp7rpj25iremqrssdddc8bupi0jrdxiwju4un7l4l2c1h7quhsy3o99p6hfi1fjgnp443er29ramz0gt3otn6rn0iwisya39f6bz3m5cv0e49hqj1j7o2e6j8y4wf6y67vtl923btv4',
                flowInterfaceNamespace: 'inloxrei119ykpsri3edv1vpohq6kp0ogwxp5w3ctn6rgpf9k36am4sym2arcttqphk1xdjiy1swhzvqfe4521p2055lpn04ia5dq17mtjeh85d6auna1gn26ta983bnso92ghaju5cm5vqr8uiwywiirw17hac0',
                parameterGroup: 'lb318i1uxyovgy3zdpbmihw5n3e85x9nuocpycbph657e42kp3e1aopscat4htq3v1mdj9p1ntj1zw5thmoz9kyva6pnndjdd3x1r2wxw7u4vzbnpe8wptg1xcnm35bz7xuc4alxutp2btxol5n7d6bymgxkmeum35tt912ptwawsdn91fa6fkdas19s8xtkbhacmfljdu2nz4k0wgkn1szox68yco4lzryzhwc6hb2ohb3y1csowfl0bt8fnl3',
                name: 'ujwks7917xeshrt6beldlpjy3pxz986jrbk6d7v25initlx3mwtgqq9z7gr91k33vlvpptw3cqn7kn4c23oa0n9sux41u854d0prmlbbmrx1pjme8d79c17r907jm0ovutjd7tg6fz8evhs67te6hjqta18ahvjqyy2wcxjh19ufy097uhphrdkbz9e3catml7rsmsnofsdh73msv0ple53liv40ecbfx1h1v2z2z2x9zm1o06diiai8iycx0xx5q5uir78bftvmg8qnfofhlmlrvho13ixg5t79w5ilrouvhz37ojjmfsn9fkkhfsjq',
                parameterName: 'hy9gdo7ayhb3efreiqelgaxgf4elzxu8lw8jsz0t5y59p0n7udsrj8fz0p97laskbx8qn1p03hwkltxdf439eed87m29kdot38hax9419y6y55xzgna2xh4gscsdvlmlkc76vfnt59o5m0m12nsxygoqt9o75g9rbdonv6wz7hddn79hfpm0zv8siku9x12dwnbz0s04qsff7kxt2ine37n3b6z27toom681v3gqsqw540dtscn1f3ldoe6roq18e43kh8yygyaar13jjpjnii40h6xbptzqn9x37bf07ljvch1lbvt55uj4ul28uzei',
                parameterValue: '0dxr75ucyzzcpeinuiiacjr8tm18u8m8efh7rtdus33w82p1yui0ec90gttddyok7m0np43inls9spr1h7romclqo82cxdvzd747msvl2svywktpgz4halm2zh9xln4al3g7ta5mlizo2z5yq1g2js25x51yly3hkb9l17hppyts40zffkw8ynfwsuugmdwb2bvm2abfl7av3si6tz7637jld5nvvb4qe8kmv8pwdiynhm5nwoli13nml3u0y21nhyu8lwlni3f7z2mzmitoww3nxmx0oektlfx3c56vyev96cyuu2vap5zg74xd4pgw5f2wpamnrgur1nacvvfabeaj4v92spcrirtg8wdc79593tqed3uqinejlofbcijjp4g62njeqkriouea8r5qxegxoy28xsciqmpojrjfdsufw1s9iyu49da4n5hlu0v2v612tn0z1matjdm8b2dcx72kghl81ytx4o92t43bcaoabh9yb6kjphr59sqyrglh170c0nk3pbo2fddxm6cw2d2piqy985b29dfwillbxtct350jihu5s32xhmb5rfgjzlzk9drb656lainq7lxpf5e094bvqnay79rdwz1siy43u9eeonaxidbj3tdll2ndqmlyhqqocbrnkvchnhlg6kz8tabjm1iqw22aznniem4jffswpe02adx8y43bsxqrbpk3qkjuscjohf4spsb6vmyv5sofmdnrecz4jp2w5v2bdj286n3cbfu1e7sh27dzl53vo9zpryhu4dl4ffye0onm5bl0bwbn6tjvqs6soi7ka9spcnjzyz0oj5ooph52elzqdtfranktg9onrnfah0um400sqh4sco8vv9iy61bm3e88t0oypm76ilcwtaadgwtmpp4rnchuvi5vtoi1gm1v4jh90ce00cgknbl3m4krx16i2qykqcl6xeqhwfrr1urioja64csokcep4ke24l7o4rqwca5kwryoh2d7ztkl6rexscb6xjk4lqpkxyru',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53',
                tenantId: 'ec9d7cef-6b13-4354-a789-de58439230f1',
                
                systemId: 'a0f79650-b44e-4018-aed6-c2105c2f0d08',
                systemName: '1yt9oxl29lxjx36im0lk',
                channelId: '19a8be96-fe40-4976-9d4d-bd9d3b26d8bd',
                channelParty: 'xfjftmlcyfhhhlrdsf6rjj4mq9ykatast3f2wi2l2qjrb2jdhg42p2abssggz4u5oq8s8icnpgcql50tqm9qp703mcrt9gp2up187zji3vemot7rwqkzjw2ds96nqswauknak783r4ncisr6qra7z451m130etuv',
                channelComponent: 'qp3sbguuu16pwbaq7mg1sydtil6thgu2jzo7w2uz70iw1bx8rds3zrylskqq1n22dltyvu9z41y845c29giil6fmpg7ofsebm8e6yglmia4phd1rllzz9eeszlibwc48wxvs9vlsm42cjdafaubfrxqdu1ar4zrl',
                channelName: '7kg0jq2vx38ymkhfrl1x589eeyzyd63cjs1uann28b7bwpiv7jx8ttsy12igcjlpf8r4uxl4kilw9f9l6u8xsd1vwvgiuk23xmva1fep00hodde831besw4mrtvvnrlb059e70ug2guyp3dyhc9lojm2d1l86m5i',
                flowId: 'c10bc3f2-cd95-499d-a95d-188526a6815c',
                flowParty: 'u4neafnmhhpedhniz6m5dhsxppfb62r3nubw2vjumczflxm0lzbaqkyqz3102hlwyeocknlad8q8q83qsau3l9vj1g90xsr9wl5f9j7cwqvc7xn8281e3oz1vytb8esqlgnccohv2yyjcwnjjbxlp57mo0vw67at',
                flowComponent: 'bmr9zc2zwazxzbxu9ew2hnld5c584ucopozkcwkhoyye3jh8sinjqkpuwn70ekr7g6rkciwj8mg1na1grga3c35hc8eo5dsolfk2izse1h5d982i25a35f9m5vqhg2q1gwjca8xboxwvwveahphn7i77vwokl4ia',
                flowInterfaceName: 'qm4vuwq5rpvaotbfxm7whlu8ung8bz3mocj75kdje92ie8s3tglv6o6nuofd54awkn9a79h10gxid8vspt3myfupjk5kxgmw63nkzn7b61831dczameluystd7jmcw3ryezqg29fthubk96k9c40v20uh9d31m2d',
                flowInterfaceNamespace: 'w1b3sx8xt1ihp9ny1nw18jh5uwc8uwjfa4mnhshjjakozp96bq5458rss9zfncb7jrdtwracw5tpi1ukygdaad0z6kkp85bvvh4a72notu5ln7yoks82bs0p2yznvpajhmqn9fp4b1qvy847a4cobge3qzqvywkc',
                parameterGroup: 'cq4gw52iymh97x77kon8401ym2r84bngqdanjw4txt6cmyzf61u3dhpje6dt17291tiwp9err84epryvmu48470qn7apz6ouusb22r5vjjqqbams76795mwurla06mljzde7pm1sy1cn7dybhyc577i9mp7sdrre5bfoq98jhda29ej9odqoa1tlysjx9g2nlq65qy38y8a6mmaqi6fkj65qgweo0w4lcq6szkact136y8utn56k37vr9cnr7jk',
                name: 'pssocob6afqdx9atdbr53sd58lx0hle2rqeoh3vyjj775lf9s6k8mr8tzewno6lpnwntvnu1xdovnkf2j4ubvlwcbirlyvs19uvkfwu6gznnex191br5xalxd6h2hhwwhqmxqrvz1xwtwcjbw65ks87i54th4ycp4d1nfb2vd3vp0ztjlk2qf2uj6gcppe2z4yig5kjb4mmohdb333blz8a92xutrxl15tr2idkt3f37y532sr8khgmkky5md5oehd8oxdkkpsdfqczw9vk57my1uuvq3tclhov43bepe8r4lj675h1juj5q1fcf7ht7',
                parameterName: 'n3ee5mtnib569w69qr66hl3ik43bu2imbcaaqmlrxq82bte1i5t8kajq5w7stm7fs669eqpn2q2kmukuknuo4i4nh8ktkho3bqueezdbr6wtdts1jfv6ntn50c0lp9va7a48mskhs7qv31waus05n9ec9nf3bw4lj28ogicxc6lb8jsmruk65ifv1z5ewm816t3idpdiujl36i4y9yiwrnoxkzadbzvovjk1ghaucqkeej2s3k1crf88rnkquzqannnpefunab9c7d7ssgak2367lfwxxltcbc3al3b4i3ab5lcj7vys72qitd42ti7g',
                parameterValue: 'shl4pxga2rllylktlq9td2ihvf7ll7ng45rw37nv9rldcoz27zs1l3acedv92uinxc5ya62s7yhidgeg21906br42uodzfqqtm18966vr4q6iams7uo9j61602h1wgd6fjt7tu3w8q9k7p96hjwj1o5akl69i0ncfqe1x7gaos1yf9epl2mg2onllq3kk6c9jvnoogxux2hbxgli9un9fdhgm6jbw1n1wjhzoznjsjwci7i4c40d8e3xtrmfj2wlyujicz63ymjhkk3nof0tshyp4asba0p4g4tpl7yx3i25t4e7xr8glxu4ekasq3wei2qj5px3gug2yc7zfkr5gytysarucvwpltdwvyc6ev9oyvfcvw69r3666awnehd0iosv6nw6m1oslbgny2li4q09v9akpckc71r8k3lkf66d4j86oc7vnl6ug4cx5otzw7cimsijtll91d5kwmx56d3lcx43goo2procyyd70d9f5e10qdkqsj8kon8tn8emq26bpyidukn6gn89k65og7x1kbdj0pwtjj2shegbids27xqqx57w2jrqnj33ik9jjbdzhhwh86hv7ela2nqxpsysr6c0ekcz2fiygib83jlqtn95zy156vf6jg3pxdfe1gob59vxzv9s4ym7e8amh97tdpzwxgop9crrehunav0cqr3jct3zx2xrmnsrhk3obw5hdqz13483y1hdm5yk6yi1hgjto2b0wls5wxpg6eh9tnx5s5skun3xw3vje2po433beb426zsx077qiprqarhk72rdmzghdlpoku3oxhurqzu3ybelmolhuhkgqoagfphckle78959nrntn778zavi819ib8i38zx9u9193o56cx7lp7dqp0yo7fgz2zmzw9bvn8f93mrdxitiscem99ntdx6hpgwjt7q3jc6cxlggqjfy9woej3ee5m9qr9k8cxo03ni8hqu3nsc3f5dxbxqrb26uskf4oz3owzxmgosrsokjitqsjt9k8d5ughdc',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53',
                tenantId: 'ec9d7cef-6b13-4354-a789-de58439230f1',
                tenantCode: '6cjfmmirlh97uusreoxp83irhfmktcli43kvcitwdbxv39nx30',
                systemId: null,
                systemName: 'ap560vr2lu8lqz4d30iu',
                channelId: '19a8be96-fe40-4976-9d4d-bd9d3b26d8bd',
                channelParty: 'moznrg2vsb67sn77h56olvhokl6jolmz7wom5vkaj0t0iu77cbambo7kd7gb9jq6qgchhgvf0qvy9tys65tlqj6sykdmw066x51yms9zzuz5emtf6zzd06bb846e84o9g4utn4hhfwyio1r1sb8u11x9kjv2tqbu',
                channelComponent: 'z06ncml74nc7l5cifkexsdvljxmsfnwpbdsmrlc2dvy877h9gjrzf8xddydrlkb08gmftqvhyonzjrfab0rldcx26lrvu7y3gemfhmr7td428x8o4yr1541b8hxig0ygqkg3kfvqz1y95cc3b6ik0zo8vbq1dxe0',
                channelName: 'ojkzscjnpd31sf5swgzzrf9y37ctw1sv6oct7ddomeu6aibsu4sks98r4lgx46qnq5ccumrsteu4tculxoym7g0940geyybq21j8cd0jbqrxdhelqzew9lca71ol5n7thpuvrr6yztl0kqi3qghjw3ri6wzpt27e',
                flowId: 'c10bc3f2-cd95-499d-a95d-188526a6815c',
                flowParty: 'euxoe0m37k2npmlivnkw4phx6yr4nudia5p96ezqrqbs5kbkb61vpk8dzpvc5xx4uz2pxkv89ti2xohq96kcpz664xnk3rkzc53yh28a5d1lfu89kq261zkk25x4lhndvp3rqusagdfy0qx5tx3n96o643mwhp33',
                flowComponent: 'uhp3j7xityij81abglof89dw06cwa01bxcynnxqfc3txlrq1rxmqbod622vjqdpqiufcmc9yrx2ut1tz3cwfgbdmsg576ec1lrvyvtc15agju2jmuuktgssfj1a0wacrq2w7bp7rjas3q6lcw19jbdbru3006kzq',
                flowInterfaceName: '6pzqiz0sqlqdrmp6jeaj7x04rfq4sg018phqvd4xwb9n7aq1ljsfnet5sle91e2j8lw7vcze5yx6qvtcxxfq1iy8swpogwabss3uvu5lwvr191u5lhse9rpcb6wyk7ro9tt5x301vf26gtgq8fnszm4805x0ataq',
                flowInterfaceNamespace: 'el0uw0k501t11218ij7euivbkptfgopvau4eyr7zzc2jhtcpve0nrcrlyp7x45mhp1fc8mw04jfkiknko1jsxag4fd6lv25dvk7y950lskv0qcstofusojmt53e93g5j9dsyz56kpy91hefgejuxrauvv7rd7m5f',
                parameterGroup: 'xm5h4syigqnqag1kdrn04ogiy75o1oinxjpwf3tb7co341b19521k103m2yw18jlaw7ob6pc6fe05j0l1lfgikzr4nzatpxfnsxmsp6nl23z36259ryfuxgjmzqd3b7cgp2x4dmfid8j2ykrxvln36d3k0b03qgjxwm0zmr03clpvqskk8y8a40zvjzkyqb2fghx0jp1iyqifj62v32878nylwr6gv0xun925ngegch1zkm8nq5k4ixj6jjitcn',
                name: '6m20m5m40czfbdjvkevpb8lqyd8qeakpymrcb35jv1hpfyrn241m0ihpdnlg6uig1x4849t158odd1b6ghs01y7i5fn16ufql8ni8i9p54vlff3rycna9a7z25m018rauxtlybwxdv5j1olxj861lxqh503dmnrrr1ziu6mz6pmpmanncrtfwmkr9i26vcf6pva7rgcrkbrid2zo1u28pd0q5kl94w7fpg3f9314lqg3z9y1y8byobv03wg546eih3m2qq8z3q6fshr0t1tiokk5y56d5bqldk7aoqz2qwdoxpmifpn86l3q9kv2vtyq',
                parameterName: 'y9efwbb94wjngf8z8uv6nkqug3oyywuqay8w4djx2g4xhp6da6plz9v7w4o7u250lkk9muio5m3iot110lgapuw3ce69e35f7ld8clcl9jfeeudkv0hz7ue89va38x166wruj5m4p5rcsfwhg460ht8aecvoviqqlx8wzmb5aekiwqd8m3dvnalq666m9hk3xl1imoz3kmdexla9z0fx0mnzy6piw0makx8nyntu9wvjqn36ohbevrstscm6txzf1phra81sfx5omjng1tmmok2nespq7upe6m5jsxpc5362ogt1pm6e8l4956jqjeep',
                parameterValue: 'tp327ze5a9dozsoo000ebvy3i5s7fbo0murfkwgwj2593vjb3zfzky7uv86ssn3mx0ac4hir1sa6tw5fm4fs4z3fh66g5gcxylrwbohp0ifrdd082dmsgpblafgy84wfaz4qy4cdlnbr6g8tp3kxf5bk3rhdcwyze59bdlbirjxq1extsx5023v0l2uzgdwmpjdzbdty2fztk9460h6b33v2itdkau4vv2jwfmt5vnxxjqkjb8ubp5gbn2yxqj51s0skelxhu9ud1yqzv53qpnwniyl7lrr00jlw4o57zx0y5oa4arvdtnbhwfbpe4k70sv6kd26l4z33foqt6nlhmqssda7ijp7eyn7qfj65wm9zfpp5l7d0niv2uiel5aibhro0ha4uuuvvm78lli52mpsllqd8i5jvckqrym55vwwhzs78j8gr00zax45uedslf3oc2bc1vk84fymeo0exmb1oz7kpt2h0p4847auao9g6p8er3hdy90qei5qb38jquzbalbsjbx1mf4xcgtauka3575i0g18dd421kh01f6ts28u1npzschbzzc4a5z9k38rgw6uz7wb94jbtro8btq9gyjpwleq1r8d6k0ybbrhzsrt7nq9ctgplffzowrmh0phz2fkqjyz1mnbqgvwhnokkmamqpasmoixvsvi4tzjpj55wkx5thnc6pdp5f609ya7f2ijpc4lb9ra4efky9ykbmpmml76an3k71ve42fxzmduvaz93o88fs1vgwa986nxaik4vdyo8hhceaws5gjz50vc62tbqw4i4grwni16apfg65i0ilomxna0i1ztit37h3hvxxh067gtmjtpr94kr8aawq16biywmya6lhqkmoinicw8r5jz9zburl7k0vhkydezuqbxjwl91s73n9zkiwdbksmqs28eabwj9ebh62yf553rfwetzvnyu8ebkr3wupid0leqy0r5kqycrtqsxzf358rvkhxvzha072rh91kqecfpfuxxyf4l6vfk',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53',
                tenantId: 'ec9d7cef-6b13-4354-a789-de58439230f1',
                tenantCode: '3cup1u6g1raiqmw0uwpi6qb80jxy370hf76ucvplqcfoqu5y4z',
                
                systemName: 't7zyb9wt2b4ypz1l5oea',
                channelId: '19a8be96-fe40-4976-9d4d-bd9d3b26d8bd',
                channelParty: '01pdy3jt7dqp7q7yzwymqbm15qs5cvwt3sqv6wm0lrby2m4ce2isnnrjlhpmyel62wsjwjgeexyodqyle006rzaaexxi7trv0xxcgeaz7z6m3tyua48nz9etliw72w1gdzd6t7j917sgnfoana61d34n2mjjhbxf',
                channelComponent: 'cd4c141yw62nippfeqf3v8ztbbnyc8bqrlwrmj1bzjxfae7jsvzi6qi52r4h9gprdbv3v7z6ki60ef9jprh9ngelysbux2hnlas87hwhhp4qz7s5kte0yh7yjaephc9tiiwltllt53jt0sf1n3shvxqi5u6q7s4r',
                channelName: 'br9jrtkp41bu3nwcooypylq3fbto02jxkpge795bbx7f2i9xy62uvdwo6lhqau2on1x4sh06bpihxl7jqcnqxies17lkfnxa78622tiftufzgjjukjln3pyr2cxpp17rjuw5bec2p7wyl842kc6ob8u3npjb28mr',
                flowId: 'c10bc3f2-cd95-499d-a95d-188526a6815c',
                flowParty: 'kmmzmmmjn02a9i10e8f6k2me6jsutc8zfyz8jsysgb4uf90mjstw4ik1as3obknxti1u364wp6o434ngu5dzq55tb6gw377o895nxj4x0tmowjz6nv83rcm2ri86fordo48pg0y496yl303l54n1bw42rtjvt9rr',
                flowComponent: 'lnaw4ck5p356xl0bcu6oiwwrhhdmbgtnqdejnedmdpda7zz5o8eedmvu360ns538uiiw7pt0kqpar4xi4msykq52mhyqtgtpn6ztx0v77o6prtuq0njflm74fkpv4x6je9yyqk4objcqgdvx33fpkc7iff0k65nl',
                flowInterfaceName: 'xjg1atktw5m8ksa8lomc9b3474f2p8p85j8hmeyj5lprip4m9bndxgpgswud67dkyjnhsuyzmajk1y7ves3883ttw17rlq72rvukvyn6e21jil1zwy4azgm6jbbywe35g9sl0ns7oixrbv9vwh2v3y8s0prezlqs',
                flowInterfaceNamespace: 'ash35uct9ey9a953ekwcjkfwtnoftcp629ltjnko8jpvr9llgk9m03srjsx7wtkrjzot8hmj5ymcbox9kbmqa4a6j79uz9ao93fgijj431f7h94e48hminel4hwvc1k742ee617167wdzyot9e8frsjwed3ig7w3',
                parameterGroup: 'k0phwnshyimx6z6zcn5k2quhu7ve5tr5d4a0q6kf0l9ivdq4y476dm8hvpa67u6saaiwkeleb5hooc8pmsssy8bmmo7b72jg3cklwao45lm9pn66drbiw02q3q6y915uu1b7uhc5okflvsbc8pzgw8s49kzutg61sy9jcklv0uin92firzws4no1hlueqs4k38qzy0k1inl3g08snmnjhremp71j1g5ws416ixiutw408gwz8dk0ph1nz04ly3g',
                name: 'ky11bu0w9xf2tzkt2ez75i8yevip9mcrk7on8m1a8x3iywyu6aq6fv1ui7inlu9kfky46c7zyjrdczo0k5i2h9hocngk1xcsitlcvprewz0o4cz4d6wxwybby6r3xwcr3yi8notjugcpz5pz3d4m7tpxvhabrf1wwnz25nuzv576k3be8mbl72uq27gd22vhkdnp0b3wco0ofov19b5ujkm5nadqxanbz07vxqi16vnthkyylk0advgr4c0t2w0x9c8rksdnqkr84owfi9ajx7mn1kvj94a0sbzx2xw714vcmv8mzig7dfrs8h5qcrmu',
                parameterName: 'dk0u8ja6tsqh9bqqsf5a25k78ikuyzak6q0zdhobznrgcirjp6po5ex41it7gh31omrp1v8w9wmce3vyf6wvpbguejef1ds12qqqpl7b0nliw2vs2yylixhpvibt8nswi6qkg9f38mh3f8jjl09vx9cxxormhsflz8gotoradf28plevtgq7j6mizmb2u7w3xcchizw0y2gxogp4bmfqq4687n4mrnk5vcqb3558uucl67varyow491144hvghfrim9rydm6jpewcq0lf61e2e2k5of9ao0qt2s5vfe4nnu9xqdus8jrcgoohuxq9enp',
                parameterValue: 'j6f9czfz1jc3090yxv2ujbogia6ukrqu7trupev457swdk0k8jupjuw1nc2rbo6p0longaom5ui6kooefmdusz2wz4ok5vq8o9qq5ziz4fpqj0vspvx6hhgjmgkxmrj0dqismdkknvj94qngsmzsq8ipq7llr94x3s5zoi0h5im1yuajiu7dm370ron9n8afza18n57dazegdghs22yu56sbes6s9vmm40c7hsbv2gx6pf5puyhmsi39gt874creo1esni9f3yeta0av9ydaaerkdbzqh3bmed6804e3jcqa4impvdzfkexmj4b9459fg84vbiqumat6wxnisf0ah2saetevqoquhw044ex3rqtmqogfgjlrcuy4nqtmsem67jmejz1xfl1c1fw1j4w0u91rqwkfi812c8ycaweo83e0fl91eo8dv0tvj4qy9g4dcei0jl3ms8te8618p81dr2th59yghmb8nnrny15pninrqcgjibjv959rtum0amsbo8aecf3d4lqd1eyywr5awjvlmvi0oey2d02oqz05uuovsfy4kzmw10nr1vhy5qsidoqlgg4g5itmwptqf4e8rw851ln5xnziucgs1jyztof8sffp9wfyclwdg6qsc1ks9xnka6hh99ky3qj78gxgpdu3fgvawdrjn0dy29ai4pcwn6zm1th3reovfiu2joumyz0svpidodgqtxf0qewqcenycei18def8txgd0ushvb03opho29yk77kra7ormyw3l5k05xjebtskoxuyxd2568rk82zqv61dalsz6nj6b90m1amsolp9ue7lirnwrixyp3985mufx8i3uakhwc91rb4caez1zo63djhc6n1kxc1zq2gnzumkvmfnnc7t5ch0jfzpik5kyx4nw754esxb7bzmxwamyiegp05vuvp9dwxrxoz90ur4mwipgw71ehb89u86wy5c8j42vl6acttdsp2xc2sn4n8jv72w89xcorwgco2dm7c46jrwjx4nu4w',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53',
                tenantId: 'ec9d7cef-6b13-4354-a789-de58439230f1',
                tenantCode: 'emauqvh9pc2sjhk92f5dlxuqa6jt1dh1dhu0i7hnn5p6zxlybp',
                systemId: 'a0f79650-b44e-4018-aed6-c2105c2f0d08',
                systemName: null,
                channelId: '19a8be96-fe40-4976-9d4d-bd9d3b26d8bd',
                channelParty: '8j62fyzdv0ezr54erbjkwsuno9g0m29uxzlrarl9o1sahx9m6m16b4jzhlkq106qr1xv9oirfomoyfmuho800i7457yjahu4gcq3ainmiuxl6ojl6qn4wi0ckxudylnec8vvf02q0qjqkg93iqegvr1rpftdr0m3',
                channelComponent: '6k5cjwecksj0jg7asr53dacrolt3wrqrcqohgrp0mqntn8skm8hk1a9ize1siiww3scjrdp7s826q8uzxzn4z7fcjg64ppwpbjm2kf2w5mm6nzc8556he9wikc21bsjlqti8nrzk8i33gbv5gphi9twm2q0qvnhn',
                channelName: 'szgpd9i7wduok0f1499s1ibq59vovf9i5985z8onh8ico0grnqkd0ogg57e1a659z6deracyl56gt6apcqb1tjau9o1l893mfhqo0k4fuds0h1pzl4693i0pqzbczmt5xbr68m9jt3cm3w1bt9o135ph6el9c0wc',
                flowId: 'c10bc3f2-cd95-499d-a95d-188526a6815c',
                flowParty: '6ofv3fugj85yuy7fkm5wreohfmhpnd5vzmuza0ucfohglvdamfvhlk5ilc8g8h771facs21immfqt6cfsi87b39a29vw22b8w1119wjrltv7iqx1u4wm5tkdj0ubrd3zjdb4a0jhwz7zeakjthm4b4gg1tm862gz',
                flowComponent: 'd8civldugsndo1pgxpo99y3w2jq3ofzxwdap45whtpj4fjjf72fmknltwe40rle37tp2cicw6eklz690xon7ax1y1oi0o303m6vxmkik1xo1ghv0gajh56ytfmaceas9ztc0tc2v4met7l7o9saf1by1ggz92ujl',
                flowInterfaceName: '7ac1aw95zz7ugdhkmshqa4l9b1czgkr0v0l42qkzbq876e1mo8pkdpvvkf3czizepe9bhwamp7bz8in2gxcjb5gx9eygbdt34l43y68gumlzo188stoucvdm3hvik93nq5ant0yinwb0njajak05zir6xtpkf4uz',
                flowInterfaceNamespace: 'dp17lwo29khvzsaehq1tvfeqoxa8q7d5n45vhrkgn8hf3maqb2f0bl4tt9hsx6hmuychh0p6bwfrqr7jmrozbjixkktwqiyn3vookftwgxbnbzrx7a478855qg4saj9r7yrx1ndo317pbbhv3qok6jwgyt9wddcs',
                parameterGroup: 'c3u46v5b1f5oukw095oj8pfyqcfwvj1cqwcsnyrdv5budqcjut6erxyi0s6xb0s2f8r7etbomg4wizj8n5inn57zcp6god6qngdnnmm6c40ce3ye9e71telzoic0lls04eygaih6n12jqwa5td5x6akfhadhky7ho3vb7fqnag9tsk03n8ez3cs1hynpyh0i6rioc8pbsy2dh4gx3wj2fjpm135l2bua7qqoi520qmughw3de01xzr4ps75no9k',
                name: 's9tqe8f6beby9pgfzj757kmvll4aza6tq4f57q3uaahso9ym1ijp2m8b33u8gugetpl9fq3mw10apdootfsm0o82b7tc8gvqlcyl7hhvjdr67glip4bdg5kn6emp368sf1ayy9hgob80uahx7ik8vq7t40ozesxsu9vxr42ezkv9u46ytjh1pacewe1mqslsys4eg9a3c9jy77udxsb9tiw4lqqxdi5w1ifwt2w3oabxazzxa29lk1zs5if1r4f7974z8q7lnzcqo9cxtgit8m9bxb052p93je76fuq5fc5f4r18u8kxxtso5z7jfnl0',
                parameterName: 'dhjmhg6y7bi0g0yzgzapj2fiv9fu0zjd3qedyoxxrjixctsg7sqm348uhr5z06lxbm48j9pcgwgn3uluk3k90cd99rfytvrsiff18a2ix3vesc6mc2yw8luwi2wab8ymagcjt8bcfzccmeqf8dujpome8qiaaxyutvbdqlqb6jq5ovavx3bp803c7rbnbpkavgrx319sipjdqh1jr9aw04umb5481s34cqww01mkmqlcc7h68t9jw42tbq4htu99z077ggt3iiwpwuxt1neqj455cz1pfolk1j24dmfjl4og2wfua7ygdg0tijcvpdqg',
                parameterValue: 'tt4yjitajj2tmywkawdb755phgca3xl8uj17kzp5paincg083pab3skpwv7a4auyn25z83kydhoigzsks92ysvjcur3g698vd8g11hthsugkns5vg6ti6uj9lmuil8xz0dyfl7q6ixgvl74fcxc63dwr8w041w45xty3843bbwf2k38e4u58966osbq1qq13y6jb4w83j6ieka4lysbjl632sllum7mclfo038s1p7ez02jfu6e47vryk5ojox1ulns4ewbmyfqus968sx3fem0ijpyqf1rlg5zigzwfuyf2gxz6gjfl5x95mgj21cjesicr7vsujlosqty4gkc7zk5ftq3g3pbtmrirk4wgpc4lbd63w1r0ttr3xktc8vny289d7ihixo0ewsvcvaies4m814lvu361hpyi25dx1dpg5oivzfq1kjho6ps5aprcezwcvsawo3wypxrtpv4ptamjhealujd0xy75gc6cc5i6e9t7zhrx44lk3xft6hbpqnholmbmgr0uti49a9v8kh1smhz56n581ehtwom4qu10cyopmmumpfy4nltryso1z8d5rswl24blkniko0tlbbb4y3q7nqqxdvxvwk9wtmv3ct9y4huu7tqoq8elc95xr6mnyvb4nqd1ossuipwt971sseyygprhhetukbgavrlwt0qfn7kxgpssa6c5sjvg8tmn3vpdtbu2ia6eh5iqum9f05fsqprm2szyb4luuyrm7rhhrymvs8hv7d8xu5e6ogzxeqyf2paturj1e260plehlbhbe52uw3dc6qv3idiod1eisx1g92g3f2u7lzc5ueiskmdr6n9ou6usm6m7xnpcgbjekyssi6kj1erz8tatxnfqpnxgpiuwhpqu8hgpipogbdncuqm1pyhfcn5jwtf96dorvh1ov7762ianv1nx6tf0tnfxuek079x2ihzg1y4ng4ijybf51hu4pb3sed77natxj5t8q1r8y28e8sklt0tyeoi4ttnhov84dv1l',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53',
                tenantId: 'ec9d7cef-6b13-4354-a789-de58439230f1',
                tenantCode: 'v04r5yonzlk8odl24hnfx581wxjm1ttnkg783k397qfi5o979o',
                systemId: 'a0f79650-b44e-4018-aed6-c2105c2f0d08',
                
                channelId: '19a8be96-fe40-4976-9d4d-bd9d3b26d8bd',
                channelParty: 'g5hlh22ew90ogmiqyn3sbz7ahrt4wahh7pd6hd378800kxrq5bowqmjt1hxdojvgft5nmnsqqm934b5ztl53ojf7d2xbfg0y0kg4isvi6o9td7ef07ia6uyl01lw1cn6vgy8jksgax1ugs5guauksj569lntb9pa',
                channelComponent: 'wpmp0fd9dtsmdoxcktlnr27pmvqfvgva97abgrjqvbp0geraj1pbkqoe08y3uxiu1n15ixpy4q7ox5v3s0jmsitr1ryhy75uuj43sgzi6ltracpqz6yjzphccgx5kaxvo2b3px7t2cbhra8kc66dlrgvokd3ymhj',
                channelName: 'ns2h8ky63slv9dvsqtfebsu2kdufth4b6kbw7gu8hpf4b22c9ap6ekhhp6a1n1p5wxhvo9ior6xcu1au8q4js3m3o3l175wloa0dhmmvg73ua5deoyht6867ly6licj9b624hps5f3r88ffj8gbx6uf6n4ht43vm',
                flowId: 'c10bc3f2-cd95-499d-a95d-188526a6815c',
                flowParty: '6wtxugsc9mk4kuvicuohpsgqmu1u31ss6m2mhsd5xvbzg1kn3u5zsvzxzdx37uwxelv9fkl8zm83sa531orqwtb84ven1vxi1hfs64r9r7avhwspd1vnvly8du5fvl778e9pxfml9tpg1kf2fc3lgva4ke7b3wbx',
                flowComponent: 'yn96ke6q0g9r9tnvovllezsgk8833qxeobuwjbd5hztts3i37is1ev09av3j4h39urah3w8z3735846k7zmnmilrantn2rzb7ejua36irua49g6tk1khggmnceatmu0a6ebg2xuhck82b0uod9yy8dnki5levqgf',
                flowInterfaceName: 'ldt68eb6n1ey2weu051n576d6smp8mzswiosc2q3rfqeoziggi5xnssb0l6crhtctwjrka0vadh30dlp5ytfdf4w2cj4hrsnd2aypo6ptdj9azug4snxr3vvqo8tkptp7nrxfnwp8keilcs7q645f9sft5l3p70r',
                flowInterfaceNamespace: 'wlvvn4a2oam7v48c241frhrc80xrp3xu2rlro8y5rojnxipzg5rbs9sj53cmv01dr6mxdror01gp5l3neyxmo9dzr2wq85du08jaofi5pi4mstwk6dez4r53cqr58k1vcu0h0fl83dm8ungw9n5sk6c2yci8i3gj',
                parameterGroup: 'ck001jqf4avnggugt64trviyk0k0xm80g5aq6murbf99gzq181f3yg3a6rkfd7xhsk5k56isc624m4s2b7yfv6irmy3o1agx44xfjk270i0oxfhg2hpn2patq6yx98disgfgsuuhv914wsds8gt9vbtnvo16rb05i0m5407yemawexl2ubz0sa8dugp7g8i16uhcwegnp0nkg2dz09n44w2ihpkuige8n6k17p2ge45iirgek853sg5hzzhy58k',
                name: '04k22uhmiih8hwabh304czxsgwl211jr572r3rzhq8un5u5lhlqyt7tclwgbpvgoixdwdlcio5rwq6sdba9rbo6yjgeusw26dia09hj8mzoo284rhzkw1aksnva8iawqgcj88j4y72i3votkzgdtye7r6wl3ao1etx514ebnatbi58uhjfbw71k7hvc4es61oyemp7psduadsxw4oc0ij869saxggx6lidmgn0tuufosvodhay9h38gb7fqmxxd2usfk8n0u9g4vwai64jk867vbr00nks4p18wy7lt760002r4hujnbkt1wesr263nc',
                parameterName: 'a74627j2paimq87bp4iups81bagcpw2iich26fasot36swokoq2bf41rlrh6n9nb7k4hfmtgdqh81mntt3bl0f8i82o6mq7wetph11dboad4b2304oeajadoa3i7r23jp96h0bnhn91wlucpbxf6q9ijz7nlmsi5ydcg326mhfokg3uxuzjewbgonym5j0dr4poj7dixmicgc61o8q9f08jbx97wsyppkwribeax4h6x2cbws5gmn7dg63axpykhrkgnmoz9n1kdm9mkfhc0y7cihlkn0i43kfmhw256xjdd7jvhnymhiqhrar2cjvh2',
                parameterValue: 'frstqra82mcqde9oiazmlh71pedu2w2r6jhbbzkelpr7urusu7tobkwdqyvnyf73w5btodntbtmtjitx59ye3x8gq9690d5jiuv6u6mgmbp3cv0k1yf0nsqa9zs7mkb22kd5wxbdb9kk4o23s40siyo57e3morny0650ifr4tjstuk7hu1py9dpaptl5j39lvzdz1b1jyaxf0c3dr0q5shikwvrib83x7uyz86zj1kdmpt22yww0vpgb26ntbz60euvvg0rox5y4k44jq9t4dxulwntpu39i0sl99fv0gdj0pgb2zvh1su0aft30qw82bwrufurk69ae5iqons3wzmz94pedch5db5tvwy7133kpr4kreh2g86lizeizicnc9w5x20e4nhwk21a7id8ri86sgwrelkb7tmytzcv8vlsh8m85avkga01f2qnjs0xl3n4wh7gtu47o33jtnv5is5pj5885sdzs6350l7zx8lv2se3o2t6o9zp2fpjlmlfv97el7xhgvb3nqgv617d04flmqbrebgd1ltvn0ttv7r86yxx38zmyvf4t0mmwm0j4jb5wwtm6nbp0ymnul8l1tgi875k4zwpm2a943p3xxlohfn3db3z2mog3wx03a1zmcgwkgmy3i39ylv0ncs6uz2nmiuusg49nm061gwhpqhym0i3yi0jcg4lodtbuinycf8vudjiypmyswxv8e8wkssqmtc7yaebqwpomn12sdxkfkvyx9s9l2rw82n7k77qw5iuej9ay1hx7l1c5h10e3geaam72u8dzc9bin31wp0g4y6qemhv02ajrirxa123oobytttii9cj3heds2k9yhb6jxwavchcrj9r5ms6j81oycd0zozyuq3b2f78tjfgrvlh6p1kkunvu4e0kxo7mglksy9r90f64moea6ee712xzbp8ptbo9aevuvmlzugr8pv88f7tbdd0j3xym53pgevfbxbbktaw5yahswc5jsqw0ysefclqmzdeb57if87i0',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53',
                tenantId: 'ec9d7cef-6b13-4354-a789-de58439230f1',
                tenantCode: 'cgapudprl2gvdcfsynb5tagrrghj2qwkj4a3ided7zwgc56798',
                systemId: 'a0f79650-b44e-4018-aed6-c2105c2f0d08',
                systemName: 'tacpaz6h2mc5vkkzgij3',
                channelId: null,
                channelParty: 'qjjaq1vuzml276osh68wie2l1eybf09fm6w14gpuq1qbt5liu0mlqakph3g713zq0iceobwa6hgf4evdlfle27el04s40lp1k9xi9v7svmvtyqrbm6ar3z9msusj1eazq725hlvag139r9sc503xyfb98twb7gt0',
                channelComponent: 'qr7mxk9txhnkop7rsvxx3v1imhbr70il0tdsy26f6itsd31ed56vc94ddrzekgyqfkxr09n6zrsrb78ptn8kwiszph3ovffc7j0e53ubicu1fq80rd7doeq6fcwu7lu80jvigovj5wg2wawnovnace25phpsfl9y',
                channelName: '5gn0t853p9gip0jdad5zj6cbk6r9kzdxrk1bldnk8ynluwhh3bcgzvmoipb45u0dgbnd56uo2hiix2k3eoinrb2hp7dkgzme1bjht2e2x27alo7rxu3j19u5mpza8cka0xbca1xljw70dgisjoa1upqkso9936fh',
                flowId: 'c10bc3f2-cd95-499d-a95d-188526a6815c',
                flowParty: 'h7n6279w6orqzs7n75e5xj0707yf637jj899it8vijd8fk8js3wqi3kc2sw555g13bw9z1f9bsissj1z2s0n6h6q1s9sqs0rsqdj2ahc2apc8wxjw2r9ds9x26wpf09tox6o6cnxw3u14vati31eq152jgot26dg',
                flowComponent: '19jqhe3pvuecly3h18egxkgimmfvbpjih9r4d0cdjpm58f45z8pdh8padxcdyy97wvovk51lp7q4jyy76rpsdwmuko6hhi70tm99xfd6gk345kxkggvpbxz32p1huu0r12fmyvha967soiueve8c4pm49lsz64e5',
                flowInterfaceName: 'el3678qe7pcloj4ytokwenyj0lvpz3qz9lssz830ydb6bol8iz96eb01npagm0dfthsvjc17f3vdg7uuhe0ipfq3sksqxsewf9fblmepotfheiuk0z5xch5yr7wdk5yyxa5wf1jgi37yzz0nqt03nnfx7e9zn77i',
                flowInterfaceNamespace: 'kfklxrc643g1g6krjicdjmzojn9z65m5u70fxdfr70q8j4e00zf80vpbh1txqmfg9b87f3dpbtmn1f470e6xq9t3ix8oz3ysxco8b6sf67ymn9n89ih6u6waqcdppu0yccziut6o5ps78abfkqo5atgbu3qez592',
                parameterGroup: 'qci3rt36d04gkima02m4gjmvdm2o9ykeee1904xrjvc589fg9b95kvejs7qboet4ik5b5twpg6hdnckokjbi7b4asiyt10uwcy9nicrb4r2fv4hhepl6105vcddsrq6h38k2a0xblcnbo3en39yi3hz0do8pptshd3ev8anxd4kaqnjfx8zorr7snn9q57jdhleio7w6rpjr7hzg275ia4kbzcoq4u6an7gksv46mwqmtc4s6otjgwws8alnwrj',
                name: 'cz7jnpzrkp4rxtdzmzzihab2w5v5qy2r2j78m9ljeag0p6odgybu5en5k2nej7nt4djdt0qpu9nbi0gz8a5bepvefemgmpgouxdcswncxbg2ht58s1yh5eof13iat5dc5ly98dabrwgqxpqhvfyagkok2hoz8xgm6qq3p45r0xhf6r2eoi6uj5dphntfq4mpxdgdfpy0kvngh8ggyqv0opu3ert0xuy8lqw332q2ovl9lmguagippe54ll20z3qq5ojp3na3svppub6wzdlabe0fzsv77caq08t4y15o37kczcx0orkxmrc7jp3wrybz',
                parameterName: 'jsx663wigpy27ubpe41wqh6nn67burwcvwc39d5r78kx2m5g3st17sjgguzqe3baf8hz2ul325ieychad8afisgwd8jn0jawchihxnwr4zryyyclz236fvm2g311pki4kxats1wbkpdrhuaydefpkflo6t66zg33wl3coy5ngziwauenq01tk7tu3iwyxd55w7p134hmtvsai6scygh31cvtxmuo5sww2t1zgnsn36lr44m0zb27sckrgk6cbwqdtg18qmqvk0trsv33h1o70p1g2u11cqbgorraermrh5bkw0bcgy5yro6j8b1lcnat',
                parameterValue: '03ui7sv81twwybhjvwjldt3xzdcdsa37mbrndb6qpn48u2966bzmcmh4z6go0t07ibmneu7wwqtbo8y0jcevsxob2q74s93amym7aeu10veu1nm0havhyl5bo2bj7n7jktpwkt4lcn2fp7u6cwtxnwbz06t6t2fpthzep65jr8lu8xjoafo2lit2ix7v3vcfd02dg9bkdg73ki74xmzee0ugfom7mwefpr9y0hknxv4j9zrijfkygfye88jd3y0b89o6trjzx6svsphhvd4jmvo6kfytezdsjpjxxqzt198spost8v9qifjlesngbchyhcqg7hw18y9grflczjgd0pgug3bd7tqjwlepqcryijav1cboqgwznfsdhwltoec20fhf0yknok5uktubf6tw7rat9icklb7xbn0d117ekfqokk7y6n1314fi6mqgud2uvhctnjp3hexivj1xbgj4pfvazv5wehaqtvewqx58g4og7dcnf7it5jk9hr6ucnan3bxxechcxy8knysj9lodacoe9n73ut84mukuy8tow9ef5alm4f2doyqbdd1eipu5ykl9yp50vj0nptzu6gygeqionebnbyt6trizvoitrj79sgyvt99zbb4qe5v9xus1u6jqs926qmk62r73ffe6g3rm3zhj112h62t3rqa7w4uv9n3c2adoxpaix5gpb8qtrmasirszpcj6t1v3zk38jgv5gpn4wvz9mvj9b61ui7p7j2u93uh4xsc8k9qj1nagcl0rtr2vjlchleh0f19aul189s6sinrwe8hqmvwsu0tcl4t88b3w0gtb4c227gfcjbqaf6bw6dvkmcjr8vo6ctkddf6yvqdxzhupwfvdp5iv46lfr7tcup3ksopa3yvfdc9gytclohbeoc5pwsmo9frz4v3yl88pn35c07yyysyv39kiik6l9hfk5bdrfabfnsw72fi3jg3tto6e95w1phmfkxmgsn04246l0zjwklzidb8mdloq18cggzwt93ud',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53',
                tenantId: 'ec9d7cef-6b13-4354-a789-de58439230f1',
                tenantCode: 'kuhzrfp59n38wkmaf1rysmoalgko8hyvth9ksj38bbcvuguqcs',
                systemId: 'a0f79650-b44e-4018-aed6-c2105c2f0d08',
                systemName: 'h7aneo0xs8zgb0arucrq',
                
                channelParty: 'nzngcnb941oxh3orn30ltl18jw7dx6inatk84qnxiqa6qnt1btfqztll5acba7o51yv1jfn7c7ozgs597s327gkwf34u6zjzq5sdlwd84g3r3lqzy4jup7vryvlgoia9uxttuvqjd5v9wtnck07o3o26mop8ttq4',
                channelComponent: 'ni4eml5fdf6fda2laqsfoxztw9999m59jd1bfp0bh5f5qnrb57wiidiuxk86qfcie2ltv4cq8kr7tmkkhcl6i0js29bue4icwthgbzpad0ica1ouc06hfd2xszcngylxwwhv4m5tkiate29tpdg9j6sa01add60j',
                channelName: '8vhwyu34kewmqw439bn6b2p8m7xeb8zymtnka2rsvfywbwxvegytt1at78fyupu6lgeta96959x66o8h1jxi7bn2r31es6lotq8dulkzp0uthne882l7oocgy7tepqaf49se02x4ozct2u4xecwz0q687bvgepvk',
                flowId: 'c10bc3f2-cd95-499d-a95d-188526a6815c',
                flowParty: '03q74qcixwuqw3qdup89ezx69vk62di1vtv9brpj74s7zcwyup4y38vgvezlo53kn4evp3qqxoybd0sjjuxych14fnk6fld1oh69bbzisn2nrbx9jqrh19rk8ad025pbaze33ibsr1n2mis3fcv4fs1dhr39h1pn',
                flowComponent: '8m0t5i2s3h7lsy946va1ei8gwqhmq8ufcy4w710f5ijz8okxebxum46hpfsk40apndlh28y892aiiz0lkamowob1z6z5ih9mvs95wngd2mqgjwevd5ovr1s6q463g0itkvoer81m88c6hbayppnxt7ptis1wk1qe',
                flowInterfaceName: 'tmjdhrvdl1wu5i4kpld6ro95jrvae9i2hd9p2qn6kawzhfjvcqktysbn6uwutljx8q33xus8t9yi6bmx9u4c7ban0opcnx9itbjbohke7m7lu3mmvay41rcyoq6hyt9d457o89xpdbt5iq2d87zpiuuu7za0b7tf',
                flowInterfaceNamespace: 'r56eqirzznl689zus39wu1dxmajl0m9550zmph0m7qd9ox3dscbtn3sq81ox3rq6f4b3aoiyvi4cj15ldfzrjrdh219bpmwrtfudvf9rz2wdxfwh05hs3wl6g1mzmrocf0sz0b8u6wkkoxuyj17nz497yzvvtcwu',
                parameterGroup: 'mxhuyodrle390tedr8sg43nkaeynzxyvgm1yp108xtrgxb85hwtjw5r142l151zdorljzsx993rp76x3pjcvkowxw0pq56me21y4af2jpkutrg0cfxxkl2c32q3ttas0at3w41pj0ch2jls9bdrvzfrc39h32dxqpgbf2yvnv25u0h6qkcw211zheh0n52t9jffycyg26fra1pfa7re1wq50j9tje2iml81q302q22wc2j7i24gl8umtym211is',
                name: 'r4bghzyb1y09kdwovy67fg6e57pzug98ecso2pd9msiktudqbaw25k24z9p2r46p5l9l0316t4adrlgpmpm4h306q5275gp590mkoh7ew0jq3bmdrrz9yg9ylonpuf82xr9vq8foja9yfki8v2o27c5p25rytk3ld0ytvb93ho28d3epnmdlc62ikzksfv8q8e55jicqsug9ern386f8of1pp8iinzv903326c43rnf35nlwnqe5cm8i84p67dbc562q9ctc07kdxct4r4u9sbvohvftau1ornn0h3wqv8htirouklsxuf1pd0r0uv75',
                parameterName: 'w7t9zcxjnpw8duemw8rz556f16fk06h6ywzi2qjk96xlwnojcyhzzeyjdqm580c9vtdieasn8z8v3lyhzlcj6fl5845094ib318ijdsjvk43800psw9ei4z08ui0fayxbvmtk6okn19loxxkwwx1wisjir1mwp53u1d0oxky9e8lg2ynyoa594vfw94u6f5d2fenj6mk2yo45s4ay0t5ntzqcf0lob83mkwlfjqprkx1t6v72iocdztkiwmepgnrhfsiipdudhlsg767vjwqta46fwz6cztuxfbn2tfx44b6oeilzwou2warlhblzx8a',
                parameterValue: 'enu2rtof6zoaxcsscsyzlmkrsv0s64kba3yjmscaweqjqn24ean2py1njm09w9jfcraolzejkva98vh4y5dwlgwvz6k5dua1ku19jrmfr1ziqbus8czuz5b8s7qs5qz5i1qkmyc256lzlcu3fl17lspcc3sjxpjfzvs2lxmsehtud379itu8q53oxmuzlpvaikdgqgalcb47hl3sznf36p6cxn1t8jp44spioemkwu3vqk2wpzy09oedsh5v60kus3cuax8tctqonxff63huu9g0i637g53m4k90ghlhqdzf5grm17442fm6032p1bra53ia8b34n4rffbl04v93teocon0yirkitw2coxfv3anhhzbc82yvlem2higyswjozzgh403s7zcsuq81d0lihd3aou57jljfijp9vagowzxvn3wtxo2whyzjtt2r6vcvdsbtpqwme9931fxd77z1o0kvpq0dsdwttr9ho2mkkrdx967c3p25utp2sammhco7g8aayy0erm31cek8kzc6fgg1dsz7xa0919geltr2mtwgzxbjxnzy5vx4plpjqow6ng3bbuoeqbsp9dgr5h70rcajxgvl4216370o1iuw1fcuzwqsc74eg8qzc4k1ti6pfki4v761gg59iuml28dn9pvuuevkc72t57eokla0td6n65x1j2jxs5pwmmtwsy3eozxkfcv9edelxrvkdk4qntbfj6uw9jxic25afe32h38fmp933e18og0ec9nxtmoyjzhpes376m3ngdpt2z9zu0aqou5hxvxz5eb81yqjyi3ribde0h43ygk22g6altx3sdc96r75qxuwazqzk89t0g722cyn6thdws6dzqbybasbyldyv0dz51pu41glvqmtsczym4zcrcebgaxamf7xlz3b5lvnulodq0t0ipxf0gudayrwegzgw8v89df022urpu9lnj7f2jbeahqx0s70xwych3wucv1a1h79koc7oj7mvapb3othftjk2j1ej02z',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53',
                tenantId: 'ec9d7cef-6b13-4354-a789-de58439230f1',
                tenantCode: 'yyoizn56cw9tnwvuiw85iizd6b851g5grlrppe4g6tx9qypjv7',
                systemId: 'a0f79650-b44e-4018-aed6-c2105c2f0d08',
                systemName: 'z2h1ilqn0kwkry12z6jq',
                channelId: '19a8be96-fe40-4976-9d4d-bd9d3b26d8bd',
                channelParty: 'qqzrvzt5m6u2d1dkcdgdfykoyuedz3yvp2643ejm734op0mf5tocszhzy1ny05jnwual9xkripamf7ot1aczbc0vzfycdxknfu17y1x9k4uuhsn0re996qewmp7pfg0ot6ea0lrx7l3mgh4ob2wwd8nnqnpelq4r',
                channelComponent: null,
                channelName: 'zt92kfgcypb2gfh1w4z322jd7p8y80xpl2g71vo3hrten05c7e44ax1d0nvrapgak5fkkoxhr5ts3xb5ay7ch6emaghsmyas82g0i253cs4bsoj7p68ubi1xkhjtqschz40zsvgs8ts8reycg8npvjd0vek38jcu',
                flowId: 'c10bc3f2-cd95-499d-a95d-188526a6815c',
                flowParty: '121qaz8bj2lgbp62v67ooblmhqk1terdatrtyqa974zt2s19gjtf9bi4x93c8ofdy9zh60ug0udegwb64gxlce95tudvi2wzn0zeuseseociei9s0wn03x7hv4aejfohc6w90yl9dv303if8xnq7n0b78dshky8g',
                flowComponent: '42uwqb7xbcavr1c0tnvmkjsqtsn4jp40pgg9scby1dnr5823x1kmokz48rpmdzjrfy6ph1ctnxy4vwl29gf76thq51e0vbudr1x3nsbvv5kmebfe5a3s4qyyursezx5h4usd7mtsrbbpddeuhw7uxqxady422vq8',
                flowInterfaceName: '0xbzqokcnsxohlw3ziozbhayeq4plark3x91xjjobk4txqp2p71p53v1pptjjuvzh8uxzqtenx87hkrj4y84pf8iiacwh0y8lnjeuuffaktt5721gxvdssqe7hruub78rkwxt1p9nn95keg3zq32q4jl0d1caig1',
                flowInterfaceNamespace: 'sxods9fsqxbji0n77rm2simrtu0a7uz5re18c42zkzec8xbwqf5nepjcloogthxu6fdwx3mniph307xfq7usfc5vgm8dozfqogiwyhamp5mkyeeht0wmwce412byud7yn7fcq50f4fm3dzgum3criab6df52eecv',
                parameterGroup: 'd2f1bowcsyfijzxgucot53hop8vc1g2joaayqf9xnz8no0m7oo09r2o129c9yaul8ucfyipfmq7p4m3xmsxpthtn8cf00sjcsixkk744ypqy5j77m8whrazhh8apk2h3ia5nh3rgu6qhv2a8pcgkuuz0xgd5glecgwapjb088c6p1807y5ofntdu5ro9yf4eydcf02imtr3rtiyp52aqdspe472up5fb8tp0jw9hcrs2p6kyec5rpmq0vbgpwr6',
                name: '876d9238iqeuo6iyk1c00gnswigjl10sdh1d05t9zxib8nhoqlzvlvwwon7debcarczkclgcoaclq2j3zymplzjryazabp2ycqclgt4md5mdwk0n0r9kfuksfoubxl7n458m7hmopjt3f4iwspje00j3kvp4gmf1b0ewaagdgaxweayq8nl9dhbeubcqyl65mnc6d0hucwmznm7ambu3e23l80zg0jyomeoxh5vouenqf45vncgp9ry7p6mogyh22ujre9rhssyjw7u301epktz0k7et30r2whtkpl2beypxv8ysp63hyq0awk35rhy6',
                parameterName: 'knhdpnsosod0z17umait09lh5bf4j6erqmv726s2d3xkqscio3y0xjx47wu461eofvtvrowb8vx3164ahvilszp7bbwlqshrafh3nmukviklcsd02o41w9ns08yky0rwd3ri8d51enbeq67lppehacgdaoe6ft5kzuf8sep0xcd8b11vw0bh54nud85iyt00h0c1btk32mqi4u5bexf3jb65pdqtia6tkroc2y0q2rz2q9n2zd9i48vheadjeh3af836czgslydl4rdsu0mrnkei6e9a0e3s5cx3p3qyjawzc1un4y3926e5wiux81sc',
                parameterValue: '7zwbdu83e1bhl1ajxekddy8pwip3n1u4gjozudo5pxir8u69r74z2bs3u7yavqiwtobr81pqm4hwr06zjlzfaclt094hs0p35be8ho9akv7041xixf8ouix9zqsw9anxxeiegg4ip6e58j0b1670se3a55wh4sp9jet8sjmqg7l6xo09jbtf54m1zkaq1thv6k7fxqurdxbh4t6ci5jkohgb8u0kumpfp5uw1wznijlhy94ed7lg2isawa5ufystbet5cxtkxl4lo3s8tb29635phvbium8hya3uc4l2uc1ld4cq9g9lfcdr1qzvo2zf9p7qoeq03ebq5c5qg71ilpulon0t7deang9c2mlmniwijyto8s1c4iqbj3gbotmiddkekju8emvkky3lzum8i790i8wmxrf0jg0ag5wyogq2njukcaxarguh5061efjafszt4ibr34jyipjn11e7ypvc99dwpu0rgk8zzbi12yvpjqjanirr15aczm05x6mpx7wydqdp5v60ep5mcrapncr4sutrdzk0886dd7fgsyhe0z7zvpsafv1z4g5akuly4sdl8961w1tkuz2zthf93b83nn8ytu0b2ozar78sey20vfoycyr3arbjawl5faphfo7orh2ufxv5xnj1bk2xbwgy1umx377p7931yag3ovdsh3ekdpncnoo801g4mm1fiu81oqbbgdkhrimb85u47r1w38ypsol3muutf90c8ce9dseadkp3qzjn2ylch0xn3ik4ru6kdiuhrl4jsvwalqvzp7oi7ywaahchwsacp845jgi5722imasswckbavidmgr9pifq96qcfkt1uzksmntm623eqmmb85bpc6gh26lgnyrnn42hecrttefr19f2ugnf3iuhi7y1xi71w2md9pnj65unzcmbwcl99efxo4a99t5xpwmksoyyu5vnk7wca9q8xq25mm6h3x4oihblh0hjxgy5oa9tkud620y0l68g8f3gggh8tv0j0sq8zfqk',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53',
                tenantId: 'ec9d7cef-6b13-4354-a789-de58439230f1',
                tenantCode: '4eat5kvxaj6ps07kx8kh6g1zkxfwm1li1m1dogskobn3o0q5cu',
                systemId: 'a0f79650-b44e-4018-aed6-c2105c2f0d08',
                systemName: 'hv6rpttpe1tlud3lcdr4',
                channelId: '19a8be96-fe40-4976-9d4d-bd9d3b26d8bd',
                channelParty: 'qk6i8saz1beydarcdxaanzf3i8bchi1j17krut55ir4s08yqy9vdmdpc9w3mupzoq7byea2gidpuwf3hxqzatpwd7mn6uiphdf0eis2kbcx6onwt04rd2rycwt4kqiolz15y8h5b05yf2aimi2ajdxc5zbwk1n2p',
                
                channelName: 'jlrhurpfyl27ohbyggjssqqq5w1avbqluxkuf1snb0e66az3mfk699kaqbgzimqjuhaomv6net21fj93ll297ikgzriu5kj2pmljat66jwltnop3ogig5bkotysbnht6p91xp53zcreqam1zj6zlz8n6eqp4hrqt',
                flowId: 'c10bc3f2-cd95-499d-a95d-188526a6815c',
                flowParty: 'u172zlrok3wsy78y12gvmrvc69fz3cyidiuafu4h2lb7gp2ct4bmpw4m4zz71x59yuwk45yvd9248ar09t9jvi6wsk4z5qlb0t2ql07wdt0m8pwq93vvms6s5bou1ekegwd82h3sxlqmn2dc2i84cqo159risee0',
                flowComponent: 'h5bjr8s2tkn8u9nv1e8v4egh3p36dg1vtyzockyebh4qro162vqmabvaz31tmnw8psu4bj9krdoik05u9akgv2p1mbqcwv6fqkgd1x6cskooj1i8iox6puwx1k71p7hbmlftnqqxqs4t1zd9a9c4eeashtcxxwr7',
                flowInterfaceName: 'v8hqvc4436go3pdz30i1pnd8ryt5unazklkq84zad11npowv4bj4r5ijj023avyetqe7uklfmcdrsjfteenz90h47q4o86bskwx060kmjlji5fuexubhxfl1miot45ctasyods12eq126hyj0lftd0c4l9nz59id',
                flowInterfaceNamespace: '7y22ulkz1h8jmcum44n1nk48pufbhbgvsjs1ernd4x4ve696mexjfn57ez5y1f77gouq54jlblgkjkrz77cnpti3ufc0aq2fhauk3gh1iageni5zez8a1hj3pk95patntih1came92goagqcmdqdmqou6qi6zox7',
                parameterGroup: '7x2fw14naqj8jh167ac4pu566f7bp1etlh8xeekm2fkoi2lcovx3148gkm6vhgabyidvyd8ktqus598hlu9df0emqkf9v83gocze63tjmh1ul6v6i23k2h0r1zp9ayrtff70ljrphl781ztmbjwso8j7vkq1eckqbl1uk9ytmjvmocppcdqbpwulvp9dnnleiglahlrfdqwaehroluekvjn8orbfaflxxykt8e7ocs1ya9we0p19lmuzewbby82',
                name: 'jwnixdxih4eh53ri5jela60krt58y1umfsa7bhhr6hg0uxn2dzbg4h8ultk5n9mutualj6kuauihanx2pc32g1ntpxkdwugber831dprjyrcmd5gzhufgqux0u6dlaugnvo34uaosabkc8ixe3x9qt3h5c5cj6bmt7w1vx38b1ogsa2srsug3dtg5t12vyrx0bm44mi206h979mr8edg5b876w7ao16tb8xqjvjuslszsepyd1xxsv05xwy0b6lsuysa2vb605m77e1jy6xa6mjml0ubda5mlfmqt6zpw2c79z7ujqcbh8ajfy64zg57',
                parameterName: '7znd266cvb1341gpg97mhgudmdtqrlh49zztgubk33g1shu9tl7dhfpt1z14xn0cbq5xrlin5yxehtfe8xfpq57semcy6wnivojrz08xq3v4vecqdc8s5qjw5lbtylpmyzatds7eux1wosrsllfozyuomqrcwv4dgj2upud2mzvk2aygh2d8dy61hk6ae5lzzbht01ty1kdc3ikwz8eslsswswtr1nyof8wssd6ffwhydesoo15jbjykc0qzwf5okao95wdsd8i7k9ak0l1ptu36rz7xzfwupnj41nrsejk520jwk1d3kp9wbzy5nfxh',
                parameterValue: 'p564btqrrwjwh66ujek0d8x63umqttwug0vyfvker43fa3q3pdpfohatb8115woloaygo28kpt1crkvcbii55ccnybd8ufm6ayo5fm57wvlrgsuaqmfn7ctyt8t4muui9sdrf7mr9popvidk45wqcx629zzlc1brx3eoxcavjxh5yk1almk0qkw0741wl945bxl8hmh18wo1qvcof2yrkj1s4crn1y78iohdbbm6q7n5flkxq3e2jjmb9p02fk7539t2e7nsgqivgb5phaop637w3jmi057kihh2pbizrhcuahremdomq2mmxmlxb31mf9147ox0jhuo7uoxstzqfqwb7lu1hp6xomb2wt5noaa9r9k9fv1btb8rb8yzrk00mjd73qgifdird857bwg87kbngyb8f7w0p8za2leree46j7x6prq2o4lx3jm5cqbc1j7enx3ml5l0ox7h5dpcs156xf9vp1kez9vst29i7dfmdhndho0nfsl59qcj2dihbat4kz89gj8eb2zbifg5mzzbkg2a9pa352ydmtyys96g4lmirlxxgvz2uiffgyotpl21m4p1b1soe0rhkecnswl53jl58y5fh7xhb9444d1x23aikukwhbk9xcd85wr5lcis6w1bt2r5fpmab2tqp8lfn2fnkzchrcbc35yszsghjy65jgmardnrw45i2gkkvhlrxzpukjpgkm29zuogyfawxi86svy9k9ltt2jrpkgutfmao1ym9fo5caxo3q40gxk08vms3y2fxiohx1gpg9h7e5sz2rmnixq7aat883hisz4fobdslm4lab0ua76sgqto6rcm8qlxpmwcrucggw7np61i32c8vud44430lelid9orqb7kj5rzoog58626nus2d938bnlo1mwwzssdevbuq7m3d1ek6phkr5uxb0ns2ydvdtvi8bam5ryt3qoqozwn9clqkjkaik8tz947untu69vp4woz3ok1aw2flulobrlpd98e9i7wf8wi8jv6',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53',
                tenantId: 'ec9d7cef-6b13-4354-a789-de58439230f1',
                tenantCode: '9yi9n71gge03zq4y5oahnz50ugrtl2txnqp2nc60i94wz9l7ds',
                systemId: 'a0f79650-b44e-4018-aed6-c2105c2f0d08',
                systemName: 'f2djqwoj21jsrb9fanai',
                channelId: '19a8be96-fe40-4976-9d4d-bd9d3b26d8bd',
                channelParty: '7lwfady6nm66qe0i9oi6gs4mi86k18606lo7y372taqrf5gxni9zc1hdxor391wgpulw7zr7joh74bqabqr2j4r007ckzao67etd6co9cola95fzt0ffazf5yq6igk55nk8f4o0bdx974mim8e6f01w7hsa2gu4g',
                channelComponent: '4wksuyfvvrjby3wbg7lz0m9n68ytcelsfji7az6okz5x6ysd4ni3rl35jsle0aud3ttogxqt1xhefwuut8zglwdy2bo38s16bv4do9odclgun4do536rqy3zjul3b7yo5ykwipgqo2m75p2mgmfwiplwogwagszb',
                channelName: null,
                flowId: 'c10bc3f2-cd95-499d-a95d-188526a6815c',
                flowParty: '9wyifb5ou82vbhq9cxmf5tukasvf4n3354wri4wj90mpm231n8zhzp17tso7xlgatusj071jv9p0gvhgrm9mrhs51fv31n9575u9zkev3x4prgmb2kava7vfamxe86cgrrjpl7jp0i7crxncrqkfm61om2zjzoo0',
                flowComponent: '1ail44l58ekereo8xrczcaji18tpr25yfhxnnu08uhks0mvghz8fgm7pmzo8cm9zhf198ohf5he1qgfxz3flilv3xmhtyh3r5jezmcqg57mefka8ry9mqwcesvyss1b1ly3fzb1kzdkyrmro163vi6ygndy8srbt',
                flowInterfaceName: 'r6aw7b4k54qfslkut809rcxfz9b3ps4g3v19qxo97va4c95neodik0xg67jy7u610j1l5v1k1uqljktquf5797jl20df1tot0zlqufu8yrz7iwvtlwnk9y2i2eihekwm26k2bqrezkp47zxboxgphl9zzzp65vv8',
                flowInterfaceNamespace: 'wawmtj63gp6wavfdbnlpyt99az86fcpx8apucaaytd5fi7tfz6akukq333p49prydtxt3ugu05sph4wu0fsee8qo6anp5ux89x0k8hn6q16kbz8bpr7js4gvqcm9zfbqa93tjc8xspsytyv5h975j2gt8pmgo1b0',
                parameterGroup: '9apq78mlw4xzg8ky237jmcacob99bckwwh5lp14lypaqbclzo50dc1mvadm1gnojizhp04vbrsavlsisjha2ykenuiglmfgwy2u010wrci9yxcc66rdv42gckx3m0qs1sbreea6xqr1obm3jbzhcm876udr6zcmdsujr6698refuc8xefgc800ktjfrxlo4e589u70xmodjsv0zr56y4oh31nr66ulzrn5c9k357zi0gpb9h6goy5ssnatddayn',
                name: 'f3t9699v431c6epgbu2smz1rqidulpnn2l8m9k0k9s97hu43oqtfstyoifrg4uqsczaojooc6wqka5y3mcjy9scx4msnpoqomh9248r348vhvd7jlwoor3rofvi2jtb925nkt6mfvmp36h8kk4fngaduyvjr9mjgh47dfe8nd96k2i8errcy61yklc0iag5lj7d486qybyav2aaekzhbknufl23x6u4mzj3s29a2nhsz63pwz0kmt7i57i0olkn7m1l22mqb48dxf5tlsu1g5nfvwsrxht7eop3b3jstwvivcaqn5krk8abu4rkif1a6',
                parameterName: 'rcklfnbftbe8dab4nsxr1k8zwm1cc33jb1l3l62afnt3k04iz4rhav3q4fx6lieo0erwd2c85n9obma0z1swoi5rkr0xwgaspqjaq7i7yyhdkahiyjwh9twlnd364iu4od2upion0plz1gw0weg94bl6af0c0zy8gv9b7wtnpdkstia4z4xxdd22p8ucn5rabcak1vur48isjx9dd76ddxvduqkva3f8zk0aqnks1wxcbjt8ab9fk9yc1kg14r65b37v8stwijpljbccv0qsc2q0lkvzmrnkd9kkcln885dvdo23cvpwiu1p3tb41pux',
                parameterValue: '3lebp1vfszgckyszhhz9v1oe3f0ijdvtjxlnsuv2ghf9r3m1khsdoowkl4hs25vzw1ewheabvg1xirystzws303j11wrbyrsvsuqax6z89a01qano4zpp0bakhojr68eckz9btekkjne7kl3xyxwndkkeo6ye74uywkehzhvfj4z6ibj0y37cr5m0wxgosqfab7js8525993ag1jxhgnpr6bnewu2ehae0h9zn840eqldu7tvbuffp76j263joyut5eip466qvzoqsgpckargo18llv7yx165py7or4722es89ckyq3eiya3hiczqvtt2u9wr25lwvs87eqjabvklnvv7ic3f6sxm8w4psivaobw5fjbhu4tjvbdbsj7emql22uav9a95u5yplsxfc9v59na30q7ghwnkopa7geilzlnx648141f2iipvidgt9felndctbgq3g5slv40u1razo32a29vm88416r4kkqobkiqbm71sq0ncnsblnkld31tzcl131ntqevan8njzscabzl34l2l77p8vbnus7uk61l6kce5ubdx7et735sznq7zpkqah2yvk5ndg88vr5oo7ms3mh5v89bk4ylr2g3ux3nohf3yj7rlyw7nj92ovne9lg1qxa9plv4z7wnfdnec22iayuwhh3osum6pykyxr7lxlr9x6u5mkxk5eb9jc2kq5pbt7qwhhsscf3oo59rjt6tivvrg63np5wsrmsfipmdse3wu1xwq26ta08k1k7czu3mvd9l9kq0ci8u7bl90vq4y3tyc5iu8fs2l16zoomu914i3xfqsb57km2kv1oo6zse5ukhft035e2ed04xpd5blrlrk9kc3v6mzcmzfe90l6yv6udxrnwh102e7rd7ux7xmikxufmkspcfl86s6dbt9k0kuzu5mhs4393kib4e7wqzj0fn9rupmdqa5g7ouhr3nk6rmcurq0gxk2ra60whitet7bd1req022a2bdiydpk5w4zuuko4rqx0q04y3',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53',
                tenantId: 'ec9d7cef-6b13-4354-a789-de58439230f1',
                tenantCode: 'othx5dxzc2k2dwvg9qmca5r7ajpckfurn02kac4t3vxg6wnrgk',
                systemId: 'a0f79650-b44e-4018-aed6-c2105c2f0d08',
                systemName: 'p4jc5mwbz5s15sqeyv82',
                channelId: '19a8be96-fe40-4976-9d4d-bd9d3b26d8bd',
                channelParty: 'c2nfmnw4j27ag6vatir7hucmqqiqdz3ey81gqgmpl4q0drive1rhu5nacep281d36x1xlqn8nh1nudi8y19u1beywgwy1xy1o710amzbf7qcqynwjtyr35hfujz7pyholyj5nh6uj2xhf3rsv6o7pl4ko25qwwib',
                channelComponent: 'cokelbt5qh22of6kn88p3aadds9fvu6ehia8v6wf6kaes5gq0cjdg6z19slmf22blsj11ewn253cw0920demtsqylg8mbug68zzvr6z0g2ybj0nfgtgbj750mki7is3gcmgflb6j2bvzqw6hs3wbwannx1vrj4nk',
                
                flowId: 'c10bc3f2-cd95-499d-a95d-188526a6815c',
                flowParty: 'm91vtyitlsbzupqi90ofzpdacjkz7vuv4z6tpttuqmu0sv7udulusaldbdy9euohnw5phu6xgzwtqnlxwy93pcpy9rvg4jtuj4vz4i3tuzrccfey3r1b5smx9pd0r3w7uz4e2n7bq7yslxw4949cn4acpl3vfuad',
                flowComponent: 'e40rnx8ndl8g4imba595ad66g5a32qox962qpy1sjlrmljxpz11c5iwvnchggsy6o0kl6no41kwu6qrla2vt5ps9q64uje94lhbifqonlzt76r4clrnke7qn58fnw5xep9k8zfztpao8x7rnvybpjsx1z6f9zceo',
                flowInterfaceName: 'tzpgc4esrqj6yxhm8ac2dmd63rvmwsaw2gz53t9sqy4zhqaroeah156wav2o1tn99womkw63wk6quvzi8uqug8ia407q2srcjwimgvzclcoryt92gdna59g5mhwfuucv78dq3nw31bxcpuyh6nsyo7flshgvir6j',
                flowInterfaceNamespace: '1krlkp8ywjxt8fd32a6oy1zhi5z428vlghon299r1j9k9q1kvmyhu3d856irsdj2pgpszszk4tzfjj5yogqkvvu3jdihpq7swtgzk5ihvfycqfvpwvwxyf0ako47cuj9ap3fgnojvvzkspyqczqbf0x62s83bv6s',
                parameterGroup: 'd07z4dhtw2iiblf0wi0nznx7oa5l0dcl9ydi8rn80t04dfotx1xqlripw35q4v6b0s74onjuprvoa96675gtorrq7wh9hbe5dr16o8s74ivfx5bodqccly2oxkuhmkmlq9e46pwr5mmbsx3vbywcujnnihk3m9c8ds8z0d55ib6al54aqzf9rz6e39aefpd8dbnocibgrtjh9qnglg0j7gycrj62y5yy9b5g3hry2q2e2dvtb1c0crcn38xn1em',
                name: '4fzauthig302shhq2bcj0rgf5386xt7eafuyju1ryv1uky80ezd6gklg3sc2803c5yaili529spzifwyklbanqzj8qwx21u3p47h1ifh1ashtmorqm1gky39fupouuzg0ukaf5syun49c6k93ue1aj2uau2nv0b6tml1teyw38hfuae9gxeaobdbghiql5qnk7idcv7v1iegrcu9adbepaow6papsc71llhw5suhhl2y1phc2rlp7giq485q3dlid9rmeta8qmz236k37p4stmejh8nbmekjm7ua3g7iymm9lq6w54vf7yy327hnnua4',
                parameterName: 'gzjvawm2hswl8sy0y8wgi6gaquud7w65cv99w0dwwuf0p831pmz35ie4plklfivl850cdknfdd36jaswc0wy493d5h98si3izo7ojykxy9c496czvgxziix29uy6via14v20c09mdzag6dj1y9s8sr0fl2vmfnq2uufg43o5mq26ygdi0cytmq0uwy275svugbcn02xymand9e4xh2594vzy4eypx724txdqjyh09ede3fu69e86iyq3kweex4l4ryg13jdsgjxddqo65rghusc44l4tanbgfqhqaqg2afm8htgvzih6h1oahu7rfbxd',
                parameterValue: 'yjusppjjf11k7a6jgbfmcvtnicey14pjz39ubra044mc9yjhq48i36hipbmp61zwqeq7tog216y763y410vs5kdndf8th7n46djrrtf8solmbpk5n2jafdxhvwmn4uu7rt8rtlq6t6l2c9namnrwkvp9rkyk9uatyuf5aps57zmlt9o7x9qk90rfmn4hohomkdkko4v1rr02e3jtpw8gqer4ewyiv813ixx1d4fted4q33o6o3i0wak1xg5ftq0y2azwzw9n5lnh6ku1bgw8ctnxvty0bqycz3hwdza0xwd1pgj683y8y3bwjxupl018t422ky4j46aunmjbqle74xiznv60az5502lloeriwqlxng7m4qv1up8gycqyfzmhc6ku5kz6yi0759euflrf5ync83zh4sisnwp51agfgksdc3e6krbn19hkwlx2i2sardmrkdlxbpr8a13yuemkj3baslr3vupgii03w62onnh88jb45kg6o1v92ou96q0yf2v6he3oekbt1xfvarippmndtus79ny45qxwj0nqhum2g8sxeatnc83mualq0fh1m1rrpd6rkco3e4djl7c6lt3g2g98v7dvsmu8p9yd20zd4u9ap2czcamh7t1z9pcmg4tvism2maso35axb3lybioh7phu4hhka40edzqwjlo8wln7e7zmxf6j2f93sol4gi9sw623nu6iu1kr5upkghv1o8na97u9bbv9ys68t66ue8x6gds5k8x47vvo6asjad0p4x8iw5ucxh6cskg1ve14lc6txsaoxg48rthvv800wyto2mx0fsw9h84vevak10n21ksr97nchbfxlh3lv0mm37i6maem07beq6l2r1hqxx3ibvvl2i5pc9e1t7b8ub60s6yorxu8gxcn5zunpjprxi516oq3qn10bn6dyzo2kmt97p6d1inggcohr8pq97xrqow219nd3699gjrnc9aqizm8c3owz8ylidxgk7dwo1hq9lbzf8cc1slrz8m4',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53',
                tenantId: 'ec9d7cef-6b13-4354-a789-de58439230f1',
                tenantCode: 'ply7iq79cw544a96320arazxk2texx2x5fmo1z3mez5y8ccw8h',
                systemId: 'a0f79650-b44e-4018-aed6-c2105c2f0d08',
                systemName: 'vp4kh62wq8057gbke52u',
                channelId: '19a8be96-fe40-4976-9d4d-bd9d3b26d8bd',
                channelParty: 'ggohiefgurrwa6udnfu1s78xe0on437ra4y6b0aumc1q0tlfpe6t8qrpxe55agwok3o5wsb9x4l1fdxj4124go88jvisfqm7dfo22li334upvsdpu9xodt598rdst6fw72xebo58rbgw1uvmvth914y9ccwjigzg',
                channelComponent: 'udgddnn5tygkz9eru4anyrsex1tqcnz3j7h5qtnz51ajxk1pjteg7g5todpf9q1cpb3bj6tvtmk32cef9zoi0rytqjrf4cbn8k3guuj6vmjecvrgsap8gckqgtv5d399cfmo5yypj77osqqd4vlv68xd97uqez4a',
                channelName: '7qyu4lf9u7wb6y763yvcejuxnczrlfgdlhx18gtp05e6woght2zoo0pcj3v2j3q40i9a2e8kd7mhskqgeauz7tgnjwn9wqo9mxqs5j9u03uq7ofjgmlzgybwrijalho7fe8wkf8g8n53crdfj88c45lkajvtk47i',
                flowId: 'c10bc3f2-cd95-499d-a95d-188526a6815c',
                flowParty: 'l4pj5pm86tnq9jb7w1uianddu35fig8v22jhfd2tgjzfzynhqlep1fandrs5607hb9tru01ikzt1m825jus798nuw3cbq72ail8nhx91twro3q079z3dnhrkw6jg6ucfea0klg4pj7xz9wk65mtc6m9ak5z3u6kp',
                flowComponent: null,
                flowInterfaceName: 'xygnogyspuwdhgabx0nxg58harp20o4enjzq64py0xekhwv2yykbeuh6utr9x08fz9hcl3nb5t9ld9czqvsil9frzong6e6ge0yzvoza1txhfwe5k9jj592dkrvvh5rbos9mttahggk5c06qnl5ngc2b40ie5zo4',
                flowInterfaceNamespace: 'u7salcatsz1t3u9abpufwqvj6grypifzczlxzdmel7w1hn39ah56o34ovcrinx41d8shchtgjm63az2xk111p16c6lsku3yoc8ac84rnpji6d6d5o639p8iwqpu3vpkfkjjhz474zo2clezbsbjqklvizwgmzsrt',
                parameterGroup: 'hhlea8obe8u44ll659xsa5srjmiltagukmkqjr4bzedx9chc74u27ccyqrr4q43yycxwxr30tl3dd3k0gp8ujgjli0aqrbvv5egnkrejxjbxcowp3qf58eks1ffpcaqp67kgstawqgvweor83ckriz544v8zbms6jt53ugtp6hhotk8tek7xg9ulfpsxzkijn9oy1fpw9zbi1n2gd2cunicgeuu5pvg9xitz3dbxoc7yqhevfu976h6qv3m9fqn',
                name: 'anoe36pmoj0du55lkq4k1m6be646jrfnjp8dorqk82w9f8iolkggnabfcf48hzwkz0wz2obs9vy3vg141vmb6harfxda3qrgai7eqdh25eb268jkpwpociu9bolt1fer80szpywifuwlf6w8zil4n0m3dea7mslmu2cd22v6i0znj22tk6hscaj17bszg389crss8w9d054xfp3or5886rsqbfp5muabguzo0z0gnufxp3480zfsbwszphsucgbi3drr3c4gbu0783pogsgyb9jq50s22tuppudrfzyrp1echh4cw3j70uzkyr6ocgx1',
                parameterName: 'bstb0cyllj0kbmx3v70vughcdjknodwyqu9cdwpyxkqhsy6qftkzydh3i0mnqv0w3by9h4rfx1k3u51bpux0whl5p6fh2i9rluoq21kupp4gly172oz1k30yuv4wfucla89tk0lgm6tgz86boj7caxfnhdaegzd7ktnyshdobz48oyae0jdtc7ef4j0ddf19c7kljbxu8luf28sjxreil0v7jfp7i8l30z4wut2jg5qqzs5lejib9156a9ohfwj2tjrugxb2rptnafamcve4qfrdc66t4kx0uj21fw9xv5dzotxiz60pdrrbdt25lici',
                parameterValue: 'gpg3mxf9r0zen3qj427buiheweya7qud0j5ikvd22ppifmyazeiwctk7cl2vsjfsx1mvillupcmpo3ko1cbf1hlzdavqofzpcn6no4sbohn8vp6aendtmeakh95m599c0vnn855dr9lmzvhrzyink9jye7jmhahyhd0dg9erdxdadgrw0y0xu3uuweo2l6gm4xpchdyg1lxkruwvso4mc3qnix22aoof8n7m30daswx4olg3ifwprlkjegkgrbirey0focoa4bgogilit0b6mg7pkux0si4y2dlkft8p37frd782xzq5nb77mqzpb3pzkeap4fyfiflcjgm44ru579xnfrqyotdbf2mg2678kyue4ehapd52dj6agi08wz126p8u2mecjlye2m5k6qxconhd37c5d3p5h5ccvibhr7eis8ltmck9j26lkk8gdwb9x96bss9wk1oyww10ea4qgjcbeat81u1nm7vl2dx9y32imlaucz2dlvb2uo3nko5khactbfcablakxh299ulgihxunu396akxr6ygmi3ijchm42og47y3sh7hxkf6v9yc4p0og4p5ya34l58oklpfrgimk1ryeqtm6z4dh58ymnrbqyx8fahp0o6iwplz3i4c7mncb7so6wx059tnz4odbgmlm8kn7o7gzxngy4cbhs7vbodbay755rlyatwv1ubhr13xu94rawmr8po6348kdkld304tz47azrxv794du7hjelsshhqi7q61lpnpsbc22vjt4ppa5w6cs46tqvet7bj910m3256755jtbjkq3celnwqonkhfoqdwgn0c8rajg5pegr0zch6pub5h8aowh56iap661q69c1z1odxa7foo1g7osx2fmlrpdzmayabxiczsifze1i9gz3ag6306iosmqjfbajmj930i0uit2l6wlmlkotzi5dl5k5lfukrfemyffawoew3r0dnf2zz7ukjlwqth8f8hiyaettu927hvag1i9he3e08e62dp45m8',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53',
                tenantId: 'ec9d7cef-6b13-4354-a789-de58439230f1',
                tenantCode: 'k4u9shuguxqbpiqu2paeezfibzop4f0ev1ddie9aj6lwruvesp',
                systemId: 'a0f79650-b44e-4018-aed6-c2105c2f0d08',
                systemName: 'rwa93ez7li2lncjtlg68',
                channelId: '19a8be96-fe40-4976-9d4d-bd9d3b26d8bd',
                channelParty: 'qkic9y84b2l8v0oyoop0medvsko0klfhtkt43wyec83m85pd7izef7abvgfzobcn3avrvpwumdgp9cxezx2ypqdex00s39suaxwk2yngt77blkp8c190gy2pwib4j8ipb51nkup5sz3awerzm1oc2zp2pshfc96d',
                channelComponent: 'y7d88t9aqfmis3mhi04dis4emsmetld83294lq3f7eh6d3zwhk3v1khovnjd2b0oe5jxelgzj0trbtrp2a6thlxi0jhcwrcvphutkczmte55obxuhnhk31j4joje7vk17z3s8neboakftf0ygkysmvfhcfomv477',
                channelName: 'ne8toej6cmh57uvsi6mm01ar8cxmoy22l2c56ht2cq4vfg3fm5km4z634eq1zfle47pb2covgmgxcf5k51by5lnjtywgot4bwgusx1gtb7k3mwy4a4g17g7qb42p4grsc981c46icicmil7q091cp3ocur99v0jm',
                flowId: 'c10bc3f2-cd95-499d-a95d-188526a6815c',
                flowParty: 'ldn7uc4yvxrfkhge2bcwymt8nge00vhuv8anoy1tr3ryhmhq5z9f40moro5weys5cks6h5necv9o837a3ukbxd36tiebfjmxtv216twu9x54zm6c5o2e3vcpp4udwdn18ugrm4qfr4exux9rpoh2slbzzkw84h38',
                
                flowInterfaceName: 'pudk9zxtoh131wdaxsavc5fpjen7akfu5z67701hm054ml3jgo83fv06c40hmb1rf9arkkot2cvf5t8yxfurgpse5prh7bpyakimhxju4lrgucno3erpypjzxo8rn69ax3sbl1xe487zitylqaoi4hhj8ux5zmma',
                flowInterfaceNamespace: '6grkj0yjhjxiw2cms5gjdidja8rwwjmmgykhnrit8u4kvxlowe4kmcosccio527gn4kjds0slvnsvedzxziq7f12r8lo2qakzggwqkqefisnep8dui3spcdwarymmv8asdqcp132t3xxaxi7lqhre6o2plyd0uk6',
                parameterGroup: '9nttyi2fgr73om55hcf54dfyhos5nc0lwiqikuzk8xtsgtugd359f91eajlqh3fb6m0mfzzjkl5sxitxrdopx2kynz9cn7zvndhn8thd1za0yehe5k9e2kilypkxflqukmq4p8a6a5uftzo7w8pvoeh2lh9d6tag5ao3cujs844ubnyvvt63tn7esco8htprwxcyt6bod4wwnzhtv69tu72olh5257ysvcu2e2yshy3tzgdmam9v93fc00h97v3',
                name: 'fopy3xgh579eig28xq0vuj42mz9gbnn5dotwaae4py40i5u2x3chzhzhwkxsu9vpqimmn999qttik859fkquvrivixqhfj9ztjyty7f7yr8qwzz2yj88khxbhswnqjv5ym1u0l08k6k8d2i7igoxrn02pj3f0szexgt2793hw4lrgydz5csz5imbj94n5r569n2zg8cnkpqufdyibea9jgviwvmf7xcfcaoawez9ezkm1for2z95e9f5ci2sibmonoan8xrbcly4fsi1bs1udf8f789z8vq89nxif9vjuvw6jd2ddt845lhs3k40yabo',
                parameterName: 'pcftxvp5bsewpukmaf91eiusp59hu83sloxb1k3168d5q03oe7oh2vmwg90oz7jjd9xir1gojd63w5o8qvwobt95cvyev1agaf44ku0zpp5p36bpp2imu5dbkja9vh7c82wgiyub5ojqgjrbowjre50sfu8d6k3h13fu05726c87hhcqs5gi5100bn5fwkhsvv3hw5kx8gbjza76353tjxyrzgk2pk6y5nv8mlhhq4lxiqkt2os0h1llf93p148znduns78krsyo9t3jwks22llnqhyd2pxl6k2l3odf03zoixdtdimtgso6hox21ird',
                parameterValue: 'jp0zl7yqqsvfoh7tf1ixq2l0pc7mb7g4hk7tu4z6xeabz5gomt4dox66evyt4zgqmwmlfoel75psga21tzn0c5nf7n2wswl8grwdu2n0xxmcbcrhwy6kc6xl68jfjdvo9czuzeq0x0s1hqfbdeaaerrawzgqjmahiyxm8pxi3air1qp5a2uqi85mqngyxvsyvyw80jaei3i9wp7pvgx8tjywo3gvwi9h1mfha7n0vs6bx2wfewpweflyzqg7dc2xbs3wl73qux0gmid7sqa71ignde572gbfvppqiebn108ycmcozsusl4wue9xkwtyu6qjz7zup2lmm8fmoitplke9hkmu8nscgqtyd9tux4yppjmdizqoezfvnwom2zp6dqee372hwvru0rlrndmyxl0baijfoq1t09lc5f5bzxzobdcykfnqsgkfnv27xiohdjm3ev5t6zyisb3dkgzevivb5sflhg2m5t1csov4bd4zhq9cwhqqww8h4u4fsv7fsoz00x3bytvmojx3qsyiwdr05g00hvh9lg4hpesoyahl9yte20yh47mdlhkrrcca1psomuw2h4ppcjq3lrf3yiy7m0462tq640ua2gp2am6j45plytug577i0340e432gqee89ew9w5r6jvjhjv509x4qmwmegtjabgos06820dlgjlcwbb6rcmy0cgui9ao5q8icolpd6h5ikqssbxjd35434tgvi8hyslgodc75c2go1nfl2qkv6laaspbltuldgifmrj61cngcccec2e04isu9uq1wasfcy4ecicpmh49mby38eiw3nwjilf8nrvcxtec3jsyw3ruhwovdwga78ig6vjsjkuzjt5qpet3z22idoh93nb3gfer497holom66lczfwxvu67no97g91rtae77ss7a71ukacokzmnaxfb1e4d8nnqxhx4punw7tbnwcd6dcp7novco31g9p3n46652e0l0crg3yoemrz09lr82ztxsrj8t0z9e1ucp6wcp',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53',
                tenantId: 'ec9d7cef-6b13-4354-a789-de58439230f1',
                tenantCode: '51ngglne73n5vqskmw6fubej5u2wwqqjywruehmo2j78f6sfaj',
                systemId: 'a0f79650-b44e-4018-aed6-c2105c2f0d08',
                systemName: 'a82q0hhu7oez5b4wm9ox',
                channelId: '19a8be96-fe40-4976-9d4d-bd9d3b26d8bd',
                channelParty: '0foo8qmw2t39v759io5mdcfrko9847rld4al6t2ye7gb0jzqoef28flamfekzsxp21vhivxcvhapkl0pblok32f15l3xm6v9ukcxkadfuftnx6xfxpspktf1esf522sen5jcvcb1t2t1fkc7s267xu95ckwtp5gg',
                channelComponent: 'rlaqtbkyqjngf4j24gdn6qz4q97q4spozxo9apc1ww6mws1atukabiqvlukde0c4afn1rr812rgn057gqw7oyd4cank00zianijj4ssqrgtmbg0oqlo98dfccz1hwdcyc2o5it6v8lnby8byuu1mg4qdaa3w0mbf',
                channelName: '7t17jl0n2dv9jwpdxqt5l7eb9n5ymu6cmgi3sz8fokrr6cvdprr674hl2nym71ur0uhtyf1h9ini5bh3dc58m3p4d02f8pk574xmts9snz3ryqe8g2yw7pvk3gc7ztdnkypq6o61a4liyqqhq1r6gac3ds6xf0tt',
                flowId: 'c10bc3f2-cd95-499d-a95d-188526a6815c',
                flowParty: '4lpuf11xbt7zjm7pyhe6q7uoku2wfcysc4sw2ozwmmvxsujck297uiui1okgoxmzqb3m5hf526ptxtv73y6pi9m5m904jbeu5yeiljmzpe3eqmi40v4oqmhz14m05tvgyee1rcrtfwrcdhyk7qg2vurj9dyu7a9u',
                flowComponent: 'a19bdyx6sxuclhilh9pa848xioc039a2k9yi92tkoecjo1eoj9orpyxlyo2iadwdve2dxft34inppuc5eldj41xrpv9r13l063wxui93opw9iohet8iigswqfv57gl7y95ky2e1r019s9ebee3hmytp9mfhfeu58',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'wyvf3orogxi4qf3w8wi3q8tq3xoo1r1gi0t3kq7t4djv0rl7oca6jgv7wbd8jprkeuwokc7ki28npcs10kbj63x4to82iju2ak2k6ubmg5n9x9tbyzfvdxctuhsoetjri9as6zthkxcaaj87g0d8jqao58m7kfru',
                parameterGroup: 'g61abn1wf6p33ajtngfmrxoj1wgkuiflanre0eoinysffzp2j26149twlzecn1zqp6qdv0ntczz2jhn4anjcodg4cvoofgu9loq36ct474440u9twt7wu19qzjh8jp7s95kb2h928bqsh0t6ga5jfo7qli3jasep4qhck9enr25xggjpi2u0twfbtdzu0w3d1lhnywma79ggaii14tuayy3ycz7sc8wvxxy2hyadb8iueedbncxjisewu517s8z',
                name: 'oevapklv6qjdl1kepgs8owy5e0wka0czyyew8wbo899uj5ynj7haqk5afjbdjpz068wkqgbnq5ztbr5lrmugxzm9vemztz9evebp16tmsyerfwzldviu1xtg0ri5fsn97ht08r58m1l6r1wfqda1pxpqbp2sprl57fy6ri5gy46j7ijcjbx7mn1nd6196r0b1hzfsi0jjgzusqchdo3cfajw6mpda1w5ah0cjodfy0nnydpvlrvky68ijrt8t4qn6yztmak1mns176pxxqty6mt89l88mgba0yjfkqd2z6qqppbewsnoua8bfovlz4yg',
                parameterName: '95ckerh31qde5agfga97dlvd0i0nykmq6q80vuoy9umkpen1rnuih6dwnjzxuads119zff5l6uqse2w9w3frhrd9fz00fqdppoviadn89kto0ja933gpv5rf5urvyl6s5xmcjjhns9flh0y4ah2pc6pz1za9efxo7remncs2n6d41yfqzrbmbbj0r5428vynei9cvmnuhrb1awsm154u11peo7rk9qtikoexn0uuhz7znfi4gbrpjyiz2e1irjzck9qd0xn9vlr4zoju0agyflxzhidofzsdhad6f4ct4y8fnlsp3jqgp04ngzk9uu3p',
                parameterValue: 'ojdayvpzqaveibe1gippscmhzntfwxoqefb1wrz8fbiassomqff4f6sd1lmes8atms4bxz40624nj0vxmml603d0ru84zmr371z4ayhqg76txkotskpt5vqhnf58skr0qbsfbcdfwd0p4ef0y0ytj0s2m9xcaqxwzqmqo5odx8c7vtdk1emvr7q5ujvzb0h2smi3q5yhx5lsrggah89xxpwrkhvqc3n3wjfucvj3n7vph3rw34yugvrsc88xlzccp5hrlow2oh1mnwa4p6j2p2dp18b6mnc7h2xgzyshxyyf8nuzapq908p25rie9nu4kpq65mdave34f3fhbhn5yvkhiplqcat0w1jkx1muev49me2jzj3mhpgk1w9c5xz7uywlckcxw6wr538vqlgidytmo8sdxdcwpq5qlw34l5jyf13473sclwdspfz9kit0f3rc0jd462opsh4lag0duhyjfddpyudu6qng02s1f9katfgawmjmt6kpmrkiaju9s8exhlsvavyb8ruhlxjjlaxj5q3x0yxl006bwr9a9iy4y2ln8ucff6zuqtvf8yrkjjfz0zf3keafymo3tiq1kc2tlug4bxgwyon90fk78hjmqrxacx759ol79cuh6hdyxoxgubujbwvmvozet3vnwth0gwelxx6k5fzck9y1uq0krd2tb7sxsq4tobp4gm6x84gi6nkl7jgctkletdop400aqxek48zm84196q7xowxzy7arvt47asghryrgbx1j8znz5maig5pnadvawfh7nz5dy42ztaveshggepdm116375rgzwvlrofgiqkbbm1suh5h1yk1j7f48dtqt6kl31drlftx4wgl7nwx7hozj5zifqa9fnq7a7euzg6bbmadebwclwoxfz5bq0p96omiancfrz1yi66q3zden5wlycrb24sucyupithyf4zdwn602qc2k2s71pwrkaxe2apyofcuuq5t0x597xfs3urlswkswhakj7i8b2v30dy9g2bl',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53',
                tenantId: 'ec9d7cef-6b13-4354-a789-de58439230f1',
                tenantCode: 'xxdqemm2u5g7scmlch9tm68ddz39r4k7glap9qjeird1ztdykf',
                systemId: 'a0f79650-b44e-4018-aed6-c2105c2f0d08',
                systemName: '4p8n0yhqvsddbt3kthnh',
                channelId: '19a8be96-fe40-4976-9d4d-bd9d3b26d8bd',
                channelParty: 'lsw4y0m3vh2lq3x67spv32cdxapw7dsfquadoum5mdl78h4574rqnj65zh6ca9nbw31gj1b66i1vt8w0jy9n3mebltqgyeec2lxjmvkqip34iczgihy0d7p8s1otz12kcf4mezhi98224cfdhxvt6x3d697kcs7d',
                channelComponent: '4qccft9v8vkkvcoqmbcx6ktdcftpkyb8lt441yduvsrx4z6xpcctwx97s0ffe8u254soc46adpo1q1chjzytdwht38ntg58f0w5djrjyv3brexaz8w57zknqt0idztpyueuoufshkindqdyodcqnea5an5a9l5lt',
                channelName: '7ju197hsevknk97h4sgr9jv2gik2atufl47h9wg0rx54cbudhxplucqnbrewd9x9agrwt2h5dfk3hk230epnio5ecrfddckojq8kxuie4rdi7xyrdhgf4n987muwyh9w7w2ukyz59p3d5ho269tm365tm8r36v44',
                flowId: 'c10bc3f2-cd95-499d-a95d-188526a6815c',
                flowParty: '4ey0r9x2j35dg2500bb78ni1y5wnxvv1g39ziqujvwerxlo5o9j00w06b5wsz22emxnnuwtjmneh2a0dlo0s0yyc6n6gtymj9sn88qwbvj25fs1e82ervu9y5o4p9mt5ywi3ngdimz39ht5e4t8dozwkzls7o381',
                flowComponent: 'zmlpiuewfy24tq9uax1rve09lldlfoyzrz7bok1tutjt34c1mfa3ea4t61ih5abff2xr9lrb1u8mlsooappdm040o5fjtwgncg4bwyv8ykvysg5xz2iac2ph89pmq5bg611kdb0dz9wuju31lnycftb54ircgkkh',
                
                flowInterfaceNamespace: '0a48p62w48rai3sqfe0uhlbc7n0d25g1zac1k96afcxw7zxm6eu4qhch4xohfb0102mv11767400zw50ab1abxjvz65sjvo96jr3u5x8f38u43uvshfixeroo6fi84xm9w2112npo3avdq1mcdjqgel2o61l141i',
                parameterGroup: '2sep81addd1m44fnnl9yjezp70uvssyxqqf4zs4ct03wxnzdpcrpo6dhtj2ya1trywqrn6gas7jwqs8829rxguo3e1jns80o1fx2exnwjjpzem2zwv0q9c35ijal9jr7dd9kxcve279x23vsfk4ru6jsvabe04kc9ejp783xudqq52le01wovxmz03nm8vzgu4131lsf87b3pu69tuxqt59acifd8vdc3552kckndhenjhoydiz32k1xl5evfc8',
                name: '53v6ng2ao3c7ojw1zc6dk1b1a64t01xzg62kav2j1sukri9al0lnzp9h1qsjz62wwfw9qkzc257lj72f6yujfs7mz297c8r00h171chsq23gdiflu8sapf9ud47153f64l6w41zc66o0cd815axz5mhdbbu1sma3l6jubt4cpr60i8trnvgjfz016uir2txjgoxsbc3sy5lygok41fcmatnh06f61audlfcjlxlhsnh4qj2vdz2nnle5tls5fylc2esk8pufrfsmgbd3a49l77fk7qb3caf1zon8ka9h7kgm6l08tw2kukhe5j14ne55',
                parameterName: '5lyyha5e5r6wrnxt6sdy9c6d2rvr615dp1qvni51l204rsy6e9wzj9tpah5hl71abayyhswwl20qelgu7myazn1g4hw8xeihry8f80464orfzs4jvt2jj0791knqqfeanpc10pqrra43nq1gcd21acnxw770ldu1cmuvwfg4w9aios5n3t3qoq8nstsju4popdeofyejvp369n3fgqzlzmjl9pgutgwxhw7fr3q6ri3hh0komyy9uzs6olxda93072pr43nsquusfe8lf7ncqjw85nti17bh7s46g92j6qep2zqh82ohx6ee06dikgz1',
                parameterValue: '3pudj68y6msbc9d1e5w7j52eijwatbf6ujr7gokcyjvk2528n3xr6rgwt7khxn7pdrd41vefqmt8532normkwqurorpiqclsmvwxw0vxeo6ydragvmwid3f13hlh5ejnb3v84i30egdspbm9ww8522w7nx7kmxl9iytkxekcd3uy481367ndr4ztl8vvop0k9bgpoz3i7bsr89n7fh8dgc5pjmpmnegprv2fiwgp5yn4sq96730e6nv8qrner08nbqh7jjo85e5rit2ubu4kwt0squ5srsbw2ifwxo3hl57znin6b58476quorpefepjyxwqstxd5hq4g2hj26o19dac2pfv43zov0xf9ckss49wkxtfb8cf999vn9yogqkm09ruj18ibp8kr3xp5ow0gnm5g69a03d8rxr0tr2qucmesbujvswmkf3jovioyz4e2jh4ubj7rqum82eokajewy25jq4jew1a3qln67e5e2qztd9s2czgmyuig0nlcvarwem842uvz537mq9l3913pd27z2wxbk68qcw5moxfxt2sns0s1bu7ds77an3uj5bt9n4rsv89gc19zpahxoitfsoffnqnciegzlyf9xz39o8uxtje5yk1vl1drwjcgwlu6zp03abw5qcrn9saflmart3nl7uw3kv1wkmjtdvh92905dqk02md2ih0zj7es8xar73a9avcgraxukaq23zdr3dexdoq69afldsk0zwx2yis4n0ot208a83t4uytfb8aw8149pwy0xpyqs0tj27i7nrkkynk0b67cp6l5jetsnnc15k131q3vz7c1uqkfl009yj8igbspoxi5t2rxeu1cjl85wp4n2bm2rskpynts8bouh6jqnnao3iul8yxxik9g09p2ux5edp7j3mf68kb442jd5n2lzdgljg6h3zpskjnhmu22dew464tvp5o5krlpgq8wvyd847zqxngpx2gvqno3rc5l4edch1ft2fy39zt34lkjgi2alh9o6if18s0',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53',
                tenantId: 'ec9d7cef-6b13-4354-a789-de58439230f1',
                tenantCode: 'mrwnmz7g3naltv68bh4preut9ykjotkwpt4q0je0z0cwqsg98p',
                systemId: 'a0f79650-b44e-4018-aed6-c2105c2f0d08',
                systemName: 'ipjgv6rtvrz6ytjk70lc',
                channelId: '19a8be96-fe40-4976-9d4d-bd9d3b26d8bd',
                channelParty: 'v69tdqiswiicetf5k4xpmkbvbdqdij1vrqc1y0vyti7zupihgtp8amrukqyscm1yq6l68fb9m3uk9jwrspvj4xcspvlcbligrdl6am2ybg5zs49w66m2wk6zjfw2zf6nsrysnd8p2sc7omtooi2m8yu4sthyns0y',
                channelComponent: 'q1j3jsevwqnaome0xt6188htn9g44d8ve362c8tkphmmt4f7nz70rv18ntasnn6sx3e6vljuwjdne64j1fbfjymmx0f0sgten921fbohmoxjoaqwhhhjksfee0srz66b8xa3im9dv8211b5i7obc6c7n6co2e8yi',
                channelName: 'kq0vihmue31xhs7bf163bekvurr015yk6w46cmaxpxze9mrrn4tiwz9gdw1z3q4kwfap9nxxgrtrprtugghx2dvtaadvtulhv5oefxvjh3am2dtuoid779o0z4s4txiinjb3p47glpsrgu5dswnzgwhqxypyzurh',
                flowId: 'c10bc3f2-cd95-499d-a95d-188526a6815c',
                flowParty: 'i7msw4xs0bu8eh90pnm5mkrs2k0vxwmih7knn69g5cf40flsze501oskwkc62zyq5h4enwc2lxwer8keo4blvxetjo3t1ijmgtpb7ds9xyl4mcvvh3a9z5bk1fhskyewzvng98xdzfscxx3639yto9ykqjzvfu9o',
                flowComponent: 'cctkpvz651e5eihyota32934sf3iwvbhi5teb2362kysow2pqj490zuoekv3apbn16nfutrxyp5plzs8cbxahxsdtw6sloox9zumgmr8sxa2ztp0s0u2rwqootl6aqnqd0886p4jsi5vmxgna3p3ecxyll4x8jnx',
                flowInterfaceName: 'dwpjpek0avb2xn6dt5u04zcc6fh0z6f3t16fg5hpvti05g1k4sgdvugjg1m23vvnicxo73gwlzo419zzj7xkuli691vuoe94jpdqkxh6oud9aac2687yfsiv7repmaq8smvdw6q6zjns9c2imxz2l8nk5qg7tw0y',
                flowInterfaceNamespace: null,
                parameterGroup: '0lj449vj5qvmc2ppgufv0zn7vu1tona5cs0v6gozdyz40k3avztu6g8i46o9yqorlahfmm44ubjmzbmko5rr7a420vhhz6xnmrino5hkav22f43eium4ajo95soqclhd88e7hunczhp90nt9qq1ais4lbjwqyqg6b72c92qnikxwjmo61pal9pwsal7w9eqq9jiwzm5q0nulehytcvzmjg1apizp946v7lej5mubxg06uf0tmr5ctlxy8hemlbs',
                name: 'ecvos2pr5zlxr0tkb50gf48k61p8q8c5nda264vl8nnd8jqonhoof9m6iay0lyrq8nqm1ao2x2z8eegk0wmlm8srxvg6fle0lnx4ayv0cpqz2hszzwra9eczmj8u8wz0hhw07edfv1d39i8t4j492y6g01uuzc21rbv1t81kckii95n0aahuec2bp9nxmunlwyos8ks8jugfjvaylq3ta4gr6sz111sjzdatxxptse055k60vayg1wy7p191u2n6cx4gaju2g3l4eoo1x5252w81uonsjevbvrd0f99unk93l9pxxge3hdpbqkapy1s5',
                parameterName: 'cxthifyeiwwt3vw2j9011nmggl1pj14s2j02d9kyo68wvu2k3z1fy5t00j627u9mh8jiyymich0b1sif138ww7ntorq8nuqg9snqjuatub6svy22ghllcbao4sfcks8f88xfg3ypk98qt9wc7uyvpqeq2fkochb2ugnqx2xmbbx6xjtdayayep1o5rpg9x4jq10tza1t40emoy38wkqigeha2l868j1z4waci7d52wkogxr0druvic033m879kl6sku4fdqj7yqy0w9a82d5m5ewi50ca4d0orvaz8rii6yxhn3kb3h0hpcqxfeshtxf',
                parameterValue: 'gr5gxiltxuxdqcu04g2gmi9ecfgyntk9k3mrm3p3l6yiwr5gnl70z9ahl9igrnpe73y9o2pfoozhic230tqv2s045ifakvl664ulxnq0yglq2pdf8pnx1l06i5gnv415zrivyht3ata2fnpl9zd8rg4r3ew3629d29p0uuqf116ozzlk3izyp12tzg4xknrybxxiqrqwiae57heab8gkxgn1yiwpv4xn62qa6bs2pz1dcz2nbymi11ufy41mrx9byrqos84cf7f3tbwn054fhuu9ttgtzah0g0zgzlybzxr34msupyi8csov0n02kjuak426dgdp37qi2qzmbr2fj7pn224aly2qblgcqb206kbxwwxvb7o59fs9jcbqnlm2p67ghaluruqs00f7xyqq8bf4m79s138jmz5t9t3fdd3uik74lk5bzzgobot5lkd31rzpj99hcqhd0jahise0qzfr79qub6onrtic7852l28wceankg28ckclug5knmqujd7zhnqnxlahckqdp51w43v8qstimx6covazcf2ngkykyr8s8qi3ug8xs7wf11t90trwguj5922cq0w4ikgi1cfgw4vhclbpdbwddqhpxf5dqam3myc011xvubcde2678871gk5exssd9fzcko6h7mvovrtt2rc2272q2epyrpki9snmt2fkrdoqilxd2nwfkkuh4j03cf7z6z15ckjuislludnure6wmuryv6jfs0qvfjq76lf1oltbhjxm4qntehslbvftdyurc022h7n6smk4ob3lewhvcuiyu5clx01emwndy9vmkrn7rlwyr0piyveedvjdd70dpw4rolsmonvf892u4kf4a8vjuooefw04fabb2gz6j51h3jq9ehfqvl5aykvm1hll4k7ux9yeeu0lwcuckvc2u0s10jt96y8q8p28keu70x2026cw35v3w68umon8ss5cxvf41owirfhsnblzbzrioepoaldepsopbhg5vh11r03c1w21azic',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceNamespace must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53',
                tenantId: 'ec9d7cef-6b13-4354-a789-de58439230f1',
                tenantCode: 'qhkuspz4f0bkmp67mlovdrbk6pbfkt204mql2bupoj5p8bw9a2',
                systemId: 'a0f79650-b44e-4018-aed6-c2105c2f0d08',
                systemName: '1kft3se307fvznjq205a',
                channelId: '19a8be96-fe40-4976-9d4d-bd9d3b26d8bd',
                channelParty: '8k9rslofxusu36ow57d8bv69b0whyw9g8n4hnxyugjh373nrk19jqupsuq16t8b872q06bazjzpey27g0gj9qbhpddnpe7n20azw0si1etzz45017vzn01m0t83cerbraun5o9smm98xyd9zgu393gwdtm2dlb0s',
                channelComponent: 'radr4aqi5kzl6s1c4dbcjdos3gu47hy71jsuoui1yd0jntuesqsg2m1tv44bstuo69l77mq0do7mbaardf402udo7ahk6t1d1m78nn03p38iewyr14n2nxupdnqhbgmggdwqphozq449cy3wsv27qw7tfmso7p0o',
                channelName: '0evn49ox34559qkwprx7uwc1fra3wm9h43gtsgk87cb6r0ernmknm9nbivl7the4emo3qv0qvwksnn5owqcw9xouwlrgabc8vqku10m2eptfkgjo2c14d6oy17htsqhys0wzi4rq5v0xc3cwruvxh01it6wp0mv8',
                flowId: 'c10bc3f2-cd95-499d-a95d-188526a6815c',
                flowParty: 'gn3rqehjxdct71miotf5d0pgz7p7tvgpj32lamk3iarcyc560pf665j3xvzvanoarxg0mzqw41p1uxzed4iu1zeshuqth1fdy4d1pz9h52xrnfaquvph9rz3yihf1xxg4qx6hs1jb915e7osecurkrfuxhvyw0qe',
                flowComponent: 'sgf8cm1dbqzgco1l4ndiw22nbfslrybjngtv1mrz4zrsiid7neqzu19924t7k0lunsy32ludnex9crd01wkmfae39eoikbb3rgfwje6q3za6zmg5jo3x66f19ho5rbi6ape04bdhyh3yc9e6b8vtrmiuhpe15gof',
                flowInterfaceName: '1wgo6izdycjmh3i0sc1il5pcw9d0me7lsbseksaskh3qruq9nn4w4xdlh2kvfvpb5coo28l71xp2a3r6ebhhgwzivmarvvd337i01tdu98zfvg530ycb68wtuvbxx90kueass5rj64wkaguo6rwvmyed031us9gr',
                
                parameterGroup: 'dalgu1kbcvql0olpq4inhu4vzpz7yvhqffzm2u6nnia6jjcdtadbv9e0dqoywi7mlgfcmz2mla4mxn2vbbnydlbflqhutprxf9ndheeh235bqay00rhaxugyaz2w4nd1dy62k3js99ogz3pocjn8o2eq4les38ofevcdq364femixpvmzy6jxz2xhfw8s4bcbnc4507jxqjbnpmdppcor3kiy0x4fm4n5izeluhx7y5e9y0fsqsf2yg7aeeeyxg',
                name: '7kecpznxom0qyq4ewcoltl56t6687drpueub7mtj5sn1ez1ygtdodlo1tkzo2yrxnf7k5fwqodweh1o0tdc7pmzlvzl44jtolchbqu3wmutoxfbsa9qlsfgxabgdml6hhk1qd4vpio1umrfbglxfyomuxkuc2p2pyao36o364gxbisyxd2b9d5dqto9wfv0l8gpxkgn0q7onkjkx448ist577uhevx375i03twgku8wdgevp9buldl0uv2x0c78h7ngaff508g54rm4my9d1tav5zn45zkujdg1umecatnx83j2muzb75b4ea9636mz4',
                parameterName: 'w779d0om3ha5jz1xq5cq3gtq4zo2sxvg8m8c995inat9syn6gnnvm0ncf19hogub53vtgyb9tso3d1onbrf8nuhex51eskvtbalpeyj8etd5kbmr7i7670x7mqo4fghvwyzugtz34m43jugjjpvztei7oke2a7xm1eg1hd6ifvaarbgms1dp2lsaftj1eyfg6cebc1clpeszayvp8lh49bdca885gc307z1ukqu60b8kmes7abbt6vhxpfhgotwuopsokz0wikp23zu34zsmhapl8ajhm6z2nr99380jga2s4dyrl52mk2h7yt8a5667',
                parameterValue: 'g4fc91h2jbxz3dpp8mzp9nfz5yy7l7mzo3ft38hel1v7r50pw41c9wvr7bm3uire7dyys3yzb5xs4793hik2vi38de0ys3p9mhncuu3jzf1ivxk82bs69isbovppo3omdhhg4xlc8b4tqsxs2d6271ih398uyfpbimu9gqd42wm0uwbjqabk0voim1gugyl854r71ar8796wn4la3s2s50jyf4dpcmn3z5ftb9qnhgide21ti6vhgxnvc8s1kox9dmxn32ioksidvyk2idud790rmgtafq5e8kpo791s7427axy5p25oanme8ayqd602986vm898uus5bbpm2hrg43rft2w2byldivtfxelkou3iihjb26gxj91kw7twi2etwql6u1mrz6nv70lvlmbc4bhimk2yzbf7zlrrjm6fbian42ba1l6s18ihja51bqzbj5f9gs4aga4xgr4729ymiz5otlacdy0pgmh3t2gwogbk6a5nurjdgq8nd5ssxm7sca0xf2tc4ioibv0p0c54p0s3laiif4hdl2t51kjg5a2xo41n2x9ajzi2da28we2nlk41yhfht5nmlwqj4ncjb40l25dtwek7pz9wwa98xkhb1cz40zp4qkdqqd4zb19cbniot70yvclekxqhc2v13925vfvgp2m2zm0bh5cdclb3kmuqpqtbi3pgjdnuw3r0rjjfsh1nspfz0vy7ido1bmfuz887rtvxt05jzijtoa5g9osomyhk7w16p6rjvjut1k0ydfeb7aaloy2d1pcur4cqol8l99w32n7d11t66utik4urjauyk380j7iivhe9rwybp322qdfxrsbluydp5f04192f3t7n1hc9ueqqpbjk31zaadn1d48t5t0op6kkwp269jr2mah5hf9uqyl4ndaxjuypmqxztp0jp5d5ihdi2qgn0fjurydpej0e6y8tum8ubp41cnwtlz2j0htbit2kvjus2jmrjtc5b5ctex1ntgug7hl8zpe31pdr8yz5',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'x6jjjw02ykrhdd8x7y6p0nr0i4eivukp39wof',
                tenantId: 'ec9d7cef-6b13-4354-a789-de58439230f1',
                tenantCode: 'w5pqwk9vvbd43wd2g8oemfo0opomn9pp1e6aelahtj1gr8zmo6',
                systemId: 'a0f79650-b44e-4018-aed6-c2105c2f0d08',
                systemName: 'j9ky7vqjdrz0qmyxe830',
                channelId: '19a8be96-fe40-4976-9d4d-bd9d3b26d8bd',
                channelParty: 't8n093s44kkcihgfwymfcztvjd4rws2wvtil99vsb9fi9n0t9g3eanekfpaqqwjhe9j4ww6z647m4zmv9ddmpywby88t9vaofpedf5jbajpr2ds2yus0naxkqrvz3nno14wk9khtq4i3irfa6fejso4hd98mrg9e',
                channelComponent: 'at8dak61usyi6b7n00c9593kt8j8jh16bm9iiy3paxmx1tnmysjbhkgemqzcnbzu5dwrplci6taxtki9ejp0i7wbmgju0qiabx92w585e2sc6867qwxy6yqga1g9p3hlq1wgypoj6lftp11x3iqpeopa1b4q5xke',
                channelName: 'joicwhi7xa6rvl1qwjj3bud3psxdej9s88yt4njb33mktgo85znnem4rk9ny8045xois7mz6er8xlw3tkwiq1nn9zv37wl3v1pdce6x2e6yx2cb1h3fz58tbkhdla1o0t1wtct0vza8k9e67k9u9w1k73yn9cs0y',
                flowId: 'c10bc3f2-cd95-499d-a95d-188526a6815c',
                flowParty: 'u3w7dc29tbkjbztaitd4t4caenlzoyqpxjv2wkve2x0zx01gw08nyxiqv5swayg06jqxiqgf45f51hd48y3bc3520qqraz3yme22x9rkbkuy7vdzwzzg6fs89f3nol7nfyetjkca7lgmlqsxfmpwpoz1lz9ab95v',
                flowComponent: 'uxo44maazddyold3p210zrhv735k9of6n40qtohlgpsyjk67pj1196hdzymj4nnm0efvmsukh2m8st8lji12g2e00zrp7muygefp0ozldikplaofyj59qdjz5kn4oqiquxarp632owg43xd1za0nlpqrnibtol4y',
                flowInterfaceName: 'xt8r75x14hlq6f6qh7wujfa0i7bytyo492jcwnj15b10gxnl68hntgqp3vxm4t41zilim8vjrb1wevuaqf6dl1kql96ihomimxma1jkvaaben6v0sy3lsedqccnkzmka36mp42o64hti05hh7tqksmz43sxjri6w',
                flowInterfaceNamespace: 'geg617rorca5ql2ypscph2sj7gqgc0v16medbicdbwiqlynrwrv9u8ambagtk02g853hqtiuo9i0n5g0imx2sgqs7qlbex80p6gzzskz88413bh3cirsm92l6pw10iag7am3z2ym2k8aekuprxcg33khqsn9jeva',
                parameterGroup: 'r9pzw7rxza1q5jaui8mv86vpgz7q236scxjymy95vtq96nzlzjuww0sh12p522llvm2w1gf6v9jdladturcnd03mwmyxw9mo8zkqyyjdtbwakpi3u78kfzsytaf12gj2jm2h5a2h1aboj79ne3e0h4vgzqvqxgz1o3yd7ikjqanusbfm784if648p8kucarvsjwslj0tljj9ksbnh38jqsfsb25b3ql83fx5843aeljj4tp6ls00wjao7nkm5nd',
                name: 'cjtzy7pjjsv909ews16zp0o7866nbnhnttqv2pe8rjsem5qe9lutkxq73xo86naw1r1hqwd2u21g2w3f53qgcxh5ro75adze400wi1xe1nkaex8v5ssorqipey60fa1xpei9exymhlwdtqgc6jd6sq3d23a477twgj4tpg9m74cgpqbiwbayd9fswzmtm9slpsl3nbyip0g371iucx6r71unnbofe1oimppelqs27ly4mb1gvezesdvn2ywzymlx1p7qefv9h9lx38wkrrvp40fxleoeg81q0wd6x5d0rs8ejxrmu4zwn26ebe6v71sj',
                parameterName: '4v5boqqfpui6lckr2dtmh89htbqdk72fil7dx20qxy63i6vxf4wjyfwhxi99jjyd2ysjhq00qrs1t2k3csxiatqib976x7ycmj7o62s0a7auyyqcsk4stfquntr8ntba7tmciqjeojnwvxscqolx9kl8fhqojwmaj84rooffj6cr9dmrazy65jvqzkh4zfxupf8vmz592tinhylna801jkh0gov6xdus5qii0pj8wcptumlcxbecmilxzi3vzanvw9xcvq8iy3x8alspopua5upcnpsr46osz6crch384282fw5d12csk0v7v898m41v',
                parameterValue: 'c1zzhiwgw9f3i8ul8i0abdx80f8vzvqzx6jvfigeqwfqrygmq5zbh2z181uo3ys6r2rkwzsyi0ga5h232723uastwja3di2f7407iud7lekchtrnq5b5gd457nlm2icvpoc7bi51yn8eob5yqow69djdnaizrq7qoxcb79o730tg4o8sriy0hd4wfgtxb58bdbxpf2tw4tcursq9q277femjmok4oxd3xwqpu6xk19z8s6escm0la4i786brt9bid7abtn7k9m3mta5xisfi0sc4kss3frxguk1ttfdtq03c050lvukuje24sq7sfn7rfyrdq54mk26h9wakvtj7a2a9yhlxz7dznboovoomkevcj3z2c5c3rt0q8dzoftb83u0v6w15wiogt2zb8i8uqmwt4bg9mcv3ccqwc3ouzjz1qmp7xkhgkmcqsvzwytbiefbzxc6ypo7sk8m5fxw15vqltz9v481o7sroefv55gxxbwse4ajtorstazuc4zw54eaukjggdux3h1e3gyhp0zssfv9alk6o4bz8d1wx9be0tf8tedfmqe9p6pkuvr6uwwpdfdlv96rydei5277flhgq6nmnoaxz8u9u55dxfdoz1r6uq7qdkblq7n3yrsb78oef0f6m9rof7boep3ja5wrckhkhg1huugh2v71ysir8h7beiksaqqxptvm4porgjdspldkvx0x78amqrxvbpp0ig19hw2396ldn5om20tqnonszwpxrnlae3gdhy8o4jcwzbkqnr6k6zbnzx4qb84dc2zgypw06srbrlc315ltcro4cw7vhcgxaewk3ti8fkzewh60k1teqtiz1o6mk1qf1qe1yusmmmwdls17z29pll47ja1dv90kdicqomy4g00kmcyynnbn03vyngpt7ccqbbavazvdq40fdyfx2g6z3v9ejqekailhpxv55zez251gxrcq4fgx1la61pbtuc66uryn20f8k56tky6fyneunbl60cbno26alypjn2oat',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53',
                tenantId: 'trtdkz2o770g4pdqzs8k94eniu0hbwlmt9lmc',
                tenantCode: '2dmt165tswedirhapcujbqcf8qsjjtx5lm1bb7iwyh30735reh',
                systemId: 'a0f79650-b44e-4018-aed6-c2105c2f0d08',
                systemName: '8sce6ge5agsxhxb6cppm',
                channelId: '19a8be96-fe40-4976-9d4d-bd9d3b26d8bd',
                channelParty: 'e9t4zi8wljoy2v9obl3rftgif4932ynurx4s4e99gn7leq98gkq4wrm7qdl02wu9574gdrnq3eqqspbaulk828nigjmsboq365i3wrmu0vq14t7ug5ckyes6rw4soe8lr529xxuzv3b8oy01npro3pmzrp1wmv8f',
                channelComponent: '4q4redpp7cfc0nt7nj6ztmxr78bbtxg8scih5f767loqeia9s7get39jtagah59q6lnl0hv3vnyhnl35z1b3xd9n12ank4xrb8ga1bihrkhaqcl9zakl2bo51objbnot7zzgrjvwmgkwjj2hcywgqwsp21hkazvl',
                channelName: '3oi9c0zuc4p0g4vls0rna5mxxo8zk77feoxbhrc0bmkq8mwn0xvruzv83hrph6ks8lz7ban7sqkt6nmce6g2vhxmdr7tuvh0z1fqrxwg7y6oqbz8vfyxptbvzad0h6jtcg0m1f77nxliu7oisl05eogk2xlvgb8y',
                flowId: 'c10bc3f2-cd95-499d-a95d-188526a6815c',
                flowParty: 'a3dv8mcrspvua7b7esntggnc1tcb27ftz0ifo0486dy5v0vzpd6s9brd0wxf16fb748av3zr9h7nchakav9cpap1e6uobpxufrirb587ztjmiasb3nlby41i479oddksh565376di3nmabylszxn5b0na2q9szfz',
                flowComponent: 'bf6atf39j4n3jvxerxmq3l63uqagk7hdkfp74y9js5yo6vulu4wxj6alo8tcwl50q7cybijf8jqbwawy7pxs14avr9l0pmbrzi65iym4ar0pc92395unkh0itaoj4uhx6fx3zsr0w4wsf7w6wokoh1agqbjfbcic',
                flowInterfaceName: 'ix4ly534kfbgqwl0d7x0534yr8cbsr35y73hh3otlwmatebe9k3j3w57auws1chk3oe37d5rfvfajre4eega8dj2x91z44kqn4664jnh4hfpehkqpqdaumv7zfjm39knnmalaqwqmkp1t29hy8wx746q0g2ojzhq',
                flowInterfaceNamespace: 'fax1wsigm5eq1hajha9lnml3nu8d2j1aufgxsdxgjq3xo289lsegpiajgw1txpqgavgxaqn0nnnt95cw7k7d2tnp0q7flogsol7o78hp2vhx72ciwth4cqzn8eoa5shis0w2lugfu3evaiir25a4qumvyn2cn0k5',
                parameterGroup: '2mn7urkjicidbk6mzupcyw3ak2zynbtmtu9z3kcpftmhmi86st8jas1dy8ehm0d5abj78e21c7af83xl8rvqp79c5x7tlszgdlxp86algd0ou7lmgxnwv2q78ih857mor9xtvafegr6grfs17czo2bhtya9yy1rpda4gmzzsid96u0mglc5iwztwkwe0tslh1uxeokkfs876qbktld5w1quyidp4x1b333700l0gqaamii3lpm17uvkuffeu9td',
                name: 'q5uj8h3j2ue37a0qwffkb4tczacm1di1p8q8ymy14r05k2ncvb643t7jl3cxa82j6bi1bsffwneibrzcdg44ky00ziceaj0vn00ctwfn64mjptc15xmef2zotblpeza0atd8aqvbxlrhnsm6la5rd2ns9rq0d1ryoj0m61mevl0n6jwwhaozm58h4j0u3lidf6n880mj4v8cn54w4qveb3xtqez79x9bv8zw3fod468ynplpyywxbhhwwyix42qa6heulkr3o5sjt43ujg251wycerurhsx9kcb5whpacae0gevskegyxpzxyg1j97ms',
                parameterName: 'yjipfegn15ienw5exdk8qnn0mjvus66rkk41uq6fi32yuknc3qh0o6mguy828bbvxs6x6ar9tp6bifmrvyjf4h7dml9gvvo05sssfxan7q9jinfe1zezboehwl5ew7q1ghchu3xrzkdbkf43c9tckutklqtznosv4jrdbkly5g3x8zsgvfv78674yhms6so3g74wh7bmtrfgzdfq6gukdl5uengsxcsl7osfaqpp5bxpvpx3v5yoyakye1wghge1s5cefl7voapnxsxaulmj4wwl7zfb870qxj69jt7due4ftro8wavsnbbb827cjpph',
                parameterValue: '2pulr1ztqqass5y1imp7k38mtuzy337s0a88b5fr89uu0r9nv4uu8nt750v8hw4ra223tza07fhaa8xr6y5kg0ss5t7513q5gbz1jlf85871wtu1teucodwkr070u8nkpri9nn4ameuafe9pv21msapmnlsa5klgtifutxnkimmcl5pur0g0bh4d43vo8pj5b0u4kdjqr5ymbrh9cgduo03spf3wvme044vuizmunxg1qbni97j83vq6tpyt8q7ew65s8u6uhrhru2o1l68dbrqrn9wzbx90r73xsg1rv31y2fo50u0wdou2cz8yxog01xptao9lexm442um3j2k03n7d9h80hsstbabf8dc8dom8iskf2h5vyurshme0kphqf287ztn0iwv6fjk4ah3xmlx8lrlm3hpfh02wo69ssn0gwjg55cvbhrg2pcjza9nf602yky3vgzlkrhsgqjfvjb0g2jo4912xb115r7toyunybksqybsn1j125rxwpu4roo4upj7p140hkpns8s988kcbhh4ksrxqnh6pjc8rjbs22v90prej5v2qu59z7ucjyz08dvcl6e77so786hk8t3x2u8i303ju298fl3ovosj6wre5ob1i80r7howgq80qvtj1firsvlourdp4hv8v13nwokn16l4bx9a6xzxqe5k6g90jnj86jejmanl9v046sktxctbwe49jyg9ywwyhwvdd4b0waz3gf5h8wd6c6owebqcllhjc4p518xemy9uv6t71j60i33oznrswmq7txbrj25kl5jebil9dpx7oss9uk3rtmktt15pavkqqohvu28pm418yi9grl87is7v02hccvvhvjhri7swc4n6wwarf0rmt5wfy1d9bnwwrdc4v7c6v6pgnq5h1g892prp4r8agvqsb83g6jbhyfdhenhtytrixjrw99n7sby2x3m4tq7cs6nku7pw92lancjpxpi03nw97c7054y8izh3u703aev0hihl2ghbewdwn1gg',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53',
                tenantId: 'ec9d7cef-6b13-4354-a789-de58439230f1',
                tenantCode: '30ctzscc0o24fzhrzuk484tjwhgeeii2lfj40dpr20pjf88vg1',
                systemId: 'c6s5w3wydk4hd72o4y2zrhwe01ngzl9g0cvoe',
                systemName: 'aoxttuezpfpzes57yn9j',
                channelId: '19a8be96-fe40-4976-9d4d-bd9d3b26d8bd',
                channelParty: '67n4del7vh5ps6lw3gmoone103ytdfvh190t008in9ckt5nmqod77c8ihb3wnop8ucl188a5nno7bx5afev9cmdu6h12vw7uxrl26i97n9whbp5s0bsl8whitpq0ewyypps9qb4l1lsnpsehxq86y1yfd6g9x09s',
                channelComponent: 'k88fa6qnrjfjhokvwmb6d39vbjepizh8i8iqatqx0en1cirio5ieao1g2q7l5ib9ndpoczjirflpdl5dyt6k96tq10a0vu06rqs38l7czs87c8t35gbk9dqa1z30x3g22hjg059z2h5lhqthurakfpmq9fqikb6e',
                channelName: 'm7g8d8w4sodxumz6ta6b4bhz5jv8159oevm5xsx8tqvi8e240h2q1g7y1sxepqnquy7bcrw1bxejxcncindnhaif8um4s1fv8w7x1gn89ws6csb8bholuk5pcblk998gifzn6l7rqh12de3q31xa614ig32efq5w',
                flowId: 'c10bc3f2-cd95-499d-a95d-188526a6815c',
                flowParty: 'emke6tg4am0uz1b16gwhfeng2d9tswelkp5epl1qlsu5cgxioj6tklv7f38l8zrv2x288eh98zcqdu5i2rcrrnhs47e40vpf9zc0x4nqlxbe8o7bfosgwrr6fm1v3d7sqogwft85r7jvrc6ysaqhs2bchjhnkaol',
                flowComponent: '32elbcq6vzzbk1f21cpf9kyg6gr8l13143jz0b8821exivsxcidlo5pfs1hn1r4eqliad74mamvm28quaioa44e7bojw9zgq7jh55l836hkhvj4s9sqpi8u9pfkgor8rmq9kr0oa7zhj6of7tbwoqcjljhlhe6zp',
                flowInterfaceName: 'jqo7s1pt4vmthwu2v84yi0b1lvk18a5dgsi80uas5wicg29e18ey2sw30j42tb2tw4k19oqjx0ybmlcrk0l87twnffacguxojbv10ls4sdcbs6ykuqboxttxn7ov6xta2c0ihngw9knjz8ue6vtjldgqh2aske7m',
                flowInterfaceNamespace: 'mc5zqz3c9thnb1l1r2s0d8o4qaiva0j23l5n1npoxtdx4ioh5cj7u54yaymqk0qpokcb5za9o7rg2xr3veio85vrpuvf2vybp33hr6v0in69mh5llbsus60ycdvxc9mh1n0m8z524y5n8cbtj8p5e7gz01pp386n',
                parameterGroup: 'f7xvaf59cu3k1hue87p38i2tx331vxwyu4p71awf5hayxin8avbp5qntj5ssnbwpkldlbaqtcul24byc9t26yvh99m8g6wkzeu3ncd7tryk0eek8n10o344hfc8sspxq6bqtggb14l9da11fri6tgkxdonombfhfegh82uwx6ho4ag74hlymg708g0c048it4o0hqpu35abpy8t7lycvfvid80diarzk0e45nipxyrt5xlvmpsvghm6xp5g0qhj',
                name: 'scxn0sv0fngtugdffx69vcxh9r1o6qyr6kxkedcztn15kzo4ob63p0vh2aom2vg31cveoo0eyblhbuw9kpk7d8a0u7e6mciovtk96b3zvzbloiaualpc4wo2ef13wd0h1h4c0ma9nq2a41dh7xggf2m6txffj5fa8d3fdx0uqbyxeg07calg7d2qfyen1zdbwu8t0pbrbwpfr8obr2lg2yrzjuds5ejla4bq99d2kctl6ecgbpwynuuxvjmv126cd87u8c7crf8qhtdvpj4pyy6imdh8wvd10ss2sjc1a55poifmshwq3axzkiykwlj3',
                parameterName: '8odmi7q7ffhthfj0t08a2qlogngli2drn0dskt3a6wtd5xr62msionqdofhe7foob8hkx5dh74ukuw11ixhme06hnuql93k35km4915rq71b4oc27tlzy1je17jj25cgj56sq298iiti7j0t0wkxs367tj7i15eewdzyexjl8gvgvr6vhcagrnzrkzlwfze6a5b3c0bkzt40ugbbrqmj7nr4oe4g5837dhiv37iaoekf6yr489mi5es0j2auiqlecmg3k2axhr8st5jg647vagcyljoorpuzzfos6asla30ymb27vbm9v8hdtnkqlbw6',
                parameterValue: 'h6z8m3ac3911anxooh0qudznk71d15tvit7vytig0jfhxfy30f1oris2oqpn65n7eh66qimw8ga23j5jfohxqsoovqf26gmek60p69qq2kizm3bd5kb2icljw8nkj6lgy6az23hzx1r9qf2spodkroad24r6pgkd5fka1s84c0q6fjl82gncbg3b4ea88czw52kkbinwfimusnzh0mr21z1uqyu150l49mvevvq58di3e4wth1zqhmrvz33988rbpb6sn7cmscugrb83pp5g096w2cua0lazexr2wvodci0dgdgvgju9n1gonae0dh5tdp65hoabme3mv2vdb53fh1ieimf3oo5vse9y6x7m19dr9vhlms2hyjhmaq0535mpfebiatnylcncqhvn2z3o7sjc66jcx923kpvmvqwr61kmjr8ub27mkwyodzfja6h4sq7d55ffsinrj3f75gv2idugo7dpr4t7kh1g4n8podb11kgevkbkj4te0yghw68zxb09y4vrodpwy68uibiihqdjboawauicuwmnrgxmnhwzn17sgnij97iceb99i2woahvkzee4g1dpxlo3djs6s1dkt476kptp8tzurqash7zkswa441ky84au2wm91fay98vcnj0feuc8f9p954lg14xswus4lx1x2mnck3g68o1w2ngvvec9ar6p5kiaie631dycrrannjh1m42oqscnpqv9g0s19txj6loa5s9ds9rm8hllc3wylbuel7wfjq31tylbcpxzrc2h3fqrjvxer272nqmw2btpj67veuygni4vwo8qkeagd5lh9zyv23bpaupgu7tcs3k64s5n0y0slrvwdnurm0kw1p3onmi9asemujf00wqd1e0ljbvn2i7k0bghohxfue4pccl1v6w8l960dsdrfdlwadlu1z5ninz0p9a9ot1duybx4a3krrq0yhxmeo2fe64u217le53vkoxmqgqesrr9s2htn639s1mnnso1m3x3jjessvbmtgnv',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53',
                tenantId: 'ec9d7cef-6b13-4354-a789-de58439230f1',
                tenantCode: '4mu29ool3rjzkrtidl99ug7rxsimniw54lcpsrzkpfaikt37vz',
                systemId: 'a0f79650-b44e-4018-aed6-c2105c2f0d08',
                systemName: 'dfhes1s1497clexl9z9i',
                channelId: 'mljahctpx4ciqulynjc7ji6suqasy6z181igb',
                channelParty: 'ipwpbbrljurvvssg6x4rahy31f8xmi21vug3b7srmppoo5z7eiob3rwp926crinukuvyt7ageu6bw7nz2pqkh2us1k2zblwb200tbzd8l5bhijzk9pxvuu9nn4e83wwpjtpuctfou49g5r9ibys3ftgfo52027s5',
                channelComponent: 'tzdls4blvzxfvzx5di7ov5zfisbjq98r3wv1v419fps8saxn3y7qz0xdy6pk9h1d6bzia993uxednm3l760ku428mm5asb4js4qfdcrc0yu1cm4r92n9on7ikqkltz0jcnajtwgjvjq51iw2gbmcl8sjqjy84e1i',
                channelName: 'ybwm6an99n6ljrpadykslkhluixt9asaj815hs0mm1pmgdo30fm2y24e0uvvcmxl0rp89ifm351dloxxhvwow22n6luxa78u8dkuhcf0ztzd1yrde70pj9ebsyysrks9u3h4nu0cymz5j25slr4avvm5xjcgkv4c',
                flowId: 'c10bc3f2-cd95-499d-a95d-188526a6815c',
                flowParty: 'kmsqdwmduswbyp5ljliv96pbmhez4itejtoe3nyaqoomixpxgt6o63q3u27q5j5pzwr4vmd8ot9fn7jhxs8zad755pwl6gzql02fqndaf1bciekj997c78s1g5fd21ou7m4dx9fobuy3n5me4744yz4w8xksr2k7',
                flowComponent: 'v1y00ff0f566u2714jl1x6yrwd27wf8wkdp1qnwf1bpd2sojmvomxwnd6334kzf12fo7c4n2qjh6gncp7ft0m4zcc4hjc9x7c1nmqc630uifaz74stqhmnt40nwzkqzzjeepwubnwglcbar7a0uzmku6vlrty6em',
                flowInterfaceName: 'lqzazcb9etfsnv7jvv0th1ch3oxtjhq1849g6i3zcsnydrrwx9m2tffizdnb34ciq0zz4qxodcazshsl94b28h1orzer2dk8o1npomhjj4rc2oy78ouyc1kr48uvqirdhf8j2xrl14y3rdyeacoe4v48n9hbeoos',
                flowInterfaceNamespace: 'hz319yiim1urwkahw0q896e2nva32wsdmiuednmwtw2pj629ds8z75vm1sg8b4ulgii79w1dsgyx4qtc09rzvns19iefwche6j3crse95235ja5z41ukmgommapavwqc9bvab9uksvdtz0j0m5y562e1ab4bt6qz',
                parameterGroup: 'iw2v381ngs5eyjlnth1inhxwp2jllfgynw8vm4ujwn61r7el25ao4b33o7rrp8tgroda3fbmw41naxzvyk2zr9rw4a21vvpavfrzqty7d806mjg31oterjwxeknop480g29264kisxe6ahvomwqtkudm8cu839h3sug1ijlpzkorxpjrvbv3bccplidjyvylt1xsfqe3tpsrt6kq0qmzu7ytns5rylgx422eh43dpok0csoi8mdiem5kau8q0ce',
                name: 'k43f376jwvgdx7scaiaec5b7p2ea6ybe4g132sth2goqzrhhoqp6eptxaamdf2prmbm0xejeq7v6elm0ds0884gzcsvrza13g5pa8o2h52x2jpto91bxj8eas9gjwxuxjokhz4bj280057pgsr57omvqde843a4fytwnf7o0win3szy6gh9vq49h2wg7w3e8qztpv62f1itu2y93xlpg8v7a47xds5hxj9c3h0cbek2z5xgzbgud2lm1oba3uc0vgfl5jqo9kjxyax9qg4r8s01dnrklz1p63hx8pegh3aquysv6nnitm1r66un5d85b',
                parameterName: 'cquz4lsscwc9iwftfmrf7qxweoeexhev4zuo4rm9vhs280pz1wzvfe3ljk7j51geci81bpmbsw2ut58rlvj5qpp9dfdepzs7y1xp8yskbm4iirgs9ra73luy8dpwt8921e5gfxn5rdxxvvhmprzy4jox6xfa4tujk1geqn80i8gzxn8ced7yfg0jo8rlvhnqm0kfp3kb6qlhl6ktj1n0burxx6kt1627s25yrevj0742u3akuq2bb5w75q6cxxidxyhnbrcrf1mgc1kvjus540eaoqdemwsi5g28mvrajflgro7u6mhwnaugfpx1vthl',
                parameterValue: '56fhuho9me0e0i19ijpv2n1mvewrf3tbgrliw4m56plslb0bdf95tyswco8b1eicfwl1iaa8q38acafav0dtk3yhowwwcfkstvwrqvjvev5sbww553r620u1o01cmpedu0rg3q7oknbyqecmx9pk7w5qbeqpo09yngoojage217wbak19845q5u4qyappovqwuyqpweuzhtq8n1jnylvzjdf5yrm943hbe471pkma6ytlqdt1mxcs0ms7gbc60t1ztjx1q37l2avgx9qvpgvrbxozul0twmddpzblmstoolor2gtjc6j2ku8z8k1jcnd0e9ht42phxjpaqlgpqf9g3m2cpdxwyskqvlxmwxrxbgczg3ie1r9nlbh5mllphvne5zqw2m72uif24q9e36pl9lo8aaaf5rl612iwpi4l06nu8hiiva7vzidzubr47u37aw44osmdpkioaa1i3qh0kvuojtuelj8kzmwzwaphnbqswj2cgjqcuye7r8k7r3fjej0pnyi5os54dqdbhopeawcllwjo80d7xvewy8xpfzsndxdcjonactoo44h5bf3yh56pwogg2oef05b4xqt8hd1xnd2nwt2bl5dgzq0eq9a1nr36pdp260qxx4tpbvwsmsymt2l04a5ji80mbw1e9wjulhzypq3tdva92zo1tygl0yjomptht4gx7vayntg1a7xzhai5e853m6l6pxeuuzd4s6hbuyiqxmow26hq01l3viby3296k7kw95n1ntafsy14f268zbupslx4ngo1bamcxcb3d0aqaemez71vzyigfsz39a56xtj2yesqilvyxr11re8zd4plv707r92bygkerw4y7e0r0pu34i2ts8wvdd5h5on71qrkrhxe1fjh9kzewuzib3j3qjqnyuxkfu3zbne0vx37eutdbt4yir7e918yhutz1hf0kh8rtflechgpnd21vzsxx8w2fl9f7vs15s0yfjtrnjhaddlo36elx4b1hgpspd1dhiop2cz',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53',
                tenantId: 'ec9d7cef-6b13-4354-a789-de58439230f1',
                tenantCode: '4ucywtfiyfhar8vle1wfh2wg35hps2ejgroot57ec7f8qzmole',
                systemId: 'a0f79650-b44e-4018-aed6-c2105c2f0d08',
                systemName: 'euhhubu8o3ztc8ivx6ef',
                channelId: '19a8be96-fe40-4976-9d4d-bd9d3b26d8bd',
                channelParty: 'ii02q5vif9waf1querkf9wpi6xg4udiqh84qdhnbof7hwx2iyibtdjgqs714pzhvcddklf5tkqvfrs8kin0cysmqf3nvxoewmlrj2mtxdl3jp1kcs912jtcoi2gblmxab6bm7c5idq6y3v0jqc5p1fij79nmh1ie',
                channelComponent: 'cn6g52tqtt61f70z9qcjjhe04ua2fibqf6lpcaoj5j5sreqjisozs43qqy2leiqpspbbz3stxcyxktvqr9baq91js90uy7e4aimml1fjb60230nuzsktcru6s4xwz3uqs3j4bxd5p3uwtwt0zkelhmg1t41nn6xj',
                channelName: 'e9h6vpq20jhpfhhe6l1xbpzfhm08yclxmspfilfmtha5mozo3ley4kdvdq5o26cv24a91monif2wqzrthjn39xq6rmg2pp6knl6cqw3j43v159v1z05p30kfg34ae2x9e8t8ll54jo2hq6hdcb8mldbxefint26f',
                flowId: '2gjimmrqyvaldmbz0rfk0srqwwrxprsk5cqst',
                flowParty: 'j7ae1jb5c3pphpv53tnvai13gw8u9jz26syr65awt9b1iih1vx2tgxeookh7w24r0r33v4h48vok74efq950ixuc9dsbsphdi9p9kee08k2trids68daw9ilgh6u6hzp7p9102bu8ujky1fvxirsgvktisqu8p4v',
                flowComponent: 'd37h6gxlnx8ehx9kfkgva975n9cckf6ak7knrydjjborlmjz0w9olhm9kf3aqamw6cv5295so16oo6vrt68ok5279u4s5kux8r8xb73m3a6m2pt659uixlv26gwamadf7091v5fw2933uvjbafd3kchnomgxof82',
                flowInterfaceName: 'ox0v1fg1ypmz2snpybjpmu2ug1l8cazjtpfnvdnmcskfhhkyqzvna7bxjsc2yk80v3kkvp9jk4g2ckuxy7sastawgpwwj2uf9tsx9t0qfbmxj4l56r7583jtkkvcq5uvj7br5hwni9elgrp835biqbxdjzl5xz5j',
                flowInterfaceNamespace: 'akjvd1kppx31hb8jmocurw8fuwqxihlv6zz2bthi0wco2ax3e1uh2jwmlot8bqmlcphm80raeqe25cewrr60ipnabs42qswbjcwsq5bxvrac182t4b8x4k15e0i1t8z0qcp3fjk0vh6ky2owp91sdmnqyrv5inj9',
                parameterGroup: 'faath892cmetnop6buz88h7y6e3eelfn6ee7puamf6agha81p93w864c851o16vwe619wy2fibo30hnj5f15relcynbosianrz07nkog118uptx1j90t6xior6beuetc9iayz0a0oqb6csouzccs5t6bcq6yr0wiezt3e4rgyyazagf0a6ankaegdh2yfqjd42h0co1m2uurbrpwlm3wt2vif6psqdarjuc48p0xr7ichhkuj7m6qck4w67lw2i',
                name: 'qsyh6ococq35hjollu2hi60ywlk25ktv1kbkzxgvhn549ewa80nr29vz483aapj35jv6t2m4rbmuiufo6mqu30foqn53g30jx88lb2jvusl6w4btjrr497odsariaf70vhsiup6xtk87jp571we8g60rqx6sjh8tlboksvxfz2zk78sepfq9l21xkb0wzri9cs93yfwimxw4sfy5kqgmvt6s4z1ihv00dqvplmw2zdodhkm3kczrnqw99opctq983ijcgl17o960792sjpm0p836ymdguzlnwgjr2j621gwq0vn72hua513gcc6ttrfm',
                parameterName: '3g3shlbjfnrxywf9l55swc6v2r88u3daktyetr51j6847fudq57mb1i5e9zrywaw9v5fr3ql9cps37n0h90qnc3anlpun61stupjk7j6fvw1uk2ubk7qlf51j980sa0g35rgvmaz31doe7umcz70v1tiphd1y9238jfleeqvsf41vuazbuq86vnit4j5ls68g5zi4wi2ak08z698yfb2zvtvrq8mtd7osnbktd1vzjwjxozlfb3schuqgcoiz4teyk2te57l2lghlag3a5ms9q3f22qvj5nhd7rjykptspcki2k9fsy3ojukph8n74f3',
                parameterValue: 'qdlgx6gph587zodnhuy1ha55avujuz9trx2ayot15175u5x4owi3r68zua8d4yjh4qaj3ffl956bdl7sekt1g4bb8sqdbfhkqbpcru83esefvyr6lq936rpe3da33a2jr740fgh4zuynq3n6gvdikajto56qf7n0gkoolj54wmwwsltkpkhyit48vh0ithpsjlwkotmxcvvtpk7gh43p5sws3rjzltrqbse2ey15eand907nb0w9g02lm0p3r8a5hvdjpxeqil9txr9chh9hm21ab2gmgl7vb3bsa6b5xlukvw5l43d23r4am0shmf35250sv92tvahpvcu8v28te3fur6zyto0hajiwq4av2r79x1n5ju4cy7onf64st83yg8prcagv40y0hyfwoy9d3tarqbamwmhff57psb5qlo7ornpbwko3vfxq2or24bnm0dywgu1ju0wndt7r6dp8aukvxzparsxtcjedtfqazdwvnwk7gau8dfccdbo0t0k8g6v150zgrvf52d7q0fxmyxa6808l5oi2843i49i9994k6tq32f6kupsl8ubld6p2b6x0z9lpgvo1t7etbewwib5minge1p6of2lianfq54mb3ucnd5qrm3k1ge0saakdcvf6ixc7z0ultpdnk0037iamzv0oc9sco4vsb7ei2hyjawp1irvhih2v98p57xidgd6t1r83d4zoqm1349j4dh3ztchydze4teskydh2d6puk6a9rbbf1hub28pl4bjcd3g3atk4jbl7hybgkpmfupjntl2adv2zo53z93yarxgghjp382li6zyf0jzsd5uw9vaol9t8vbaueu5enm4h6z7gd7l6uzwyf8u67vynsce5ehayh3l82uyavpe3nrpqx14oxcjuqaxkrgarmhrdxau6kaft9ghmkubzheeaozyi2m1nlhzjz0fxksl7jaiab7uf2wtqszvhpfg7ke3v208j3nh4n9uoxivknfaljbqih6n0ras5up7k69t63f5s',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53',
                tenantId: 'ec9d7cef-6b13-4354-a789-de58439230f1',
                tenantCode: 'i30iiq7syskst608do6s6l1qqp73toqm0h4r3lls1l7hmcc72dd',
                systemId: 'a0f79650-b44e-4018-aed6-c2105c2f0d08',
                systemName: '9zjv7y0i7nrq561l01cs',
                channelId: '19a8be96-fe40-4976-9d4d-bd9d3b26d8bd',
                channelParty: 'ccxec3mibn8uf6sfk5d95z4nnctxaw9dbx1429zj4ten0lw10w43ih07vhyckdtzgha14bf25d75h9g18xr69h2a10hzyl5yyy4wtz982pp3bxli5bjdacjausxyo0zarb8xj8owtp7ps7u2koubfr72mxajcisi',
                channelComponent: 'mqt5ny2mlqzgarenc02whsbdmklescu1ss7wlcciksbwjwdxn8upea5auus38k80vu5np4nceg0jklujo2ah1rk6dc153ysm4d1chua5birk4gewzhafagcl38dtoteotsw1h81g14rwrt33sk8skfts3wyinx6z',
                channelName: 'mxz4rhrilr2x8s0klrqwejiu3a8sjw1jyyeglmkos9oa33yhv10yc7azafah3nu7xkryccpq4fjr1uzlctv2gxz9p03dnml9hlvuvmbbkrv9yc84wqiixueylhhz9eb1jj3p0lj7h3tjob1rl9i0dmwm2skl2vog',
                flowId: 'c10bc3f2-cd95-499d-a95d-188526a6815c',
                flowParty: 'ulub3a1a268dclja680feihm9me2s7z1b4rtp1r6g7fdwhm0z21bx6k5ylf2mmflj64r91nqpamoh7yd3you4ulne3gq4bj0v3p3hvctcqv4ai1r0akd3eg27lapgrk18amg34aa59zo169xhuqanvpzbj8x5264',
                flowComponent: 'uk0ebmxpg1458qc8286lonha2kzt5frluiitv2r998nvlql5ek8wgh9k3tzxef5r1muzhy8brdb9uqqow7bwapfqcixovhjm2rta7c2y0eo1okt2ysyd6xgikn6bqmfxvb9etghp240vqa866dwrustnk81ugzfq',
                flowInterfaceName: '3u3l64kekpt4udk346h9bfj7kmswm3fghswqxxm86jrrdijwg1rine3iv21scb8hazyuawm0cj76ckeh4ye2t23iazbxj7m0iqkwg3bk0hnr6nbrdvfd0fn9ovylva2enkt8eyj6ln8iztoye2kmmrneoqz67dyr',
                flowInterfaceNamespace: 'd4co9uc2evckx55b0bji6l76sc15ooasqu1ds2l4qb86rplt7zho3knzltc1si36qhvhed5q7h9ewz0fc4ndvpxm8zywg84xo0or92i05rvke3xko6ap3zcrnizighw4rp3rje0n0gafky1ciedtk0fl3ga1en0g',
                parameterGroup: 'gr98w32mmwjmgl5f6m9ve58bk0241ejjkdm2vkcvbvviks4isc9f5fq10mcexpou0srlf9lwh541i1zbnawi94giiraf3uyx0wrrobgmu22b2nrvtvj0kw2dp9ezg6qz3v1knrkp9tio7r64vn1ki7le93a84e8w5561pwejui1eo6dgktz2vx050xkngm9xh4i2blo29y585b9rb2m2q542lq1mlsi9ttmw9vlfzsgxjstmzi2338p5wdilb2a',
                name: 'rv9bhur9n68c1b7jzon2szl71u0glmk3yok8c76tfp0xgvbagfrs586583cu8pqffs33hxi12k1s6e7cav3n3556tn8pbkitc9ks5ebc8qyrl2p25kbw4oszxoqyki73b7944106n12d5erdz2vm01brwsuh46dxjyaawo9bbywy2z089tqwsgr9s8rud6e0br7tv8so9d14slhpbddatov9n918c9krv26b7rijpgocird6cwv7gyrunmrafnjpesk8d9ve5szsetuop12hkjvw9ifwd197zd0em5u8y7yxtp885zj9cqdx5f9ekywp',
                parameterName: 'ceqp8l9z694z5gyc7c8zo55s33zbapqprvqw94bw6b1novdkn3qf2s34d34yrmkzjnoef08pv89a04cztoviaamao1icns0hz9pafouokx4m8ztdwy2h0tvqozb5afm4opkeo7610988wt7c16bmga4ol8rndtabm8qb1y9ih9imfrttrhqosglwre3pl05hbio1c0ax70fx8xzwbjogxjzzsoxnnqm5juhtzgnnd9epb4b4jebi72z4t3e2arpmzrl86xjcentz2y8tpuftdjokyb87la83fb6e7uchdownkx61zgmjua35x56384ox',
                parameterValue: 'uya89uasu4x494lljtpi74cpn6zn2r3ep03t8rpo95sx81i47rxwtepj872s5j79eekfx78pujsnhtcqjajzd6mkpny9zkmrmopdj1pnes0e7g2wly8kptri27iutac1ayicunpqccrroj25o9vsxqv7915za69clx9ay2328g3ku06jkmoah0c6f3d3iulaux024mrbkw54u2aa7ee1mxdassgt662cyvr85u864d86epw31so63txxdt2e80alnuxkz3rkgktapc5u6w9ht81k3qo6olxeyug8fn5p2e7o3m3bqp488hfhjczc30jj8p0h96bh5dcpjh9vp13diwjpbjvb18rgt40p006x7th3lp5244msg3l4r3svoenj53h8n0ot4hbyrsw6vp8l9vdfshoenm0lumtghl52cgmxuth0waueqv2ojcp7i1si9g4q4m9s95fnwesuwjkdp1qfe8df94tfb2oga81y9n1gflhbptkal732ekx1tu4otfuv4ffu3eeeajlfb1w9rk8j22xk8wapike2pj7sl10ebpwfy6yasffwypjxaueypxrs0ir6096njblu36os85n6y8u9qzzkr40za1v3jjkzhwkdtn9s2feb4dqgvhtk1c85wuxnsfcruggc1vn6cqjvzao6xynkd8uqdzbiddr3jqxr1ha5m0nwbe3ucey13gf6r00sjdltxc4qyjdinohbw1nm5f88regdn3k7m47s363b6jh3286rq8ueqv9mal5bj1qzf4v7whorklizlkt65ppfme3mto3060ornpgbtauf5je8uilz3avz4a928oepdood0susgpeoicnuxi0acot4fjv5wwi9uwv30gmd8s29823ljklqoodlby0rs5z3pcs96nxcl3j7duj2g9248ppxzzp8zvq5rqb2mhl9xtrz72azgwan7gi65r8y5wjf23o2kk3c9pxw1qvw18uyt4x2mlj7y0fagunra0ziiqzajoqmace2q9z979l7',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53',
                tenantId: 'ec9d7cef-6b13-4354-a789-de58439230f1',
                tenantCode: 'n3qjo0zu3chv81al0qgoa5t23ckhc28lwsdtv7nrpdzg033l3z',
                systemId: 'a0f79650-b44e-4018-aed6-c2105c2f0d08',
                systemName: 'avdqnas1i0ogtx3mxlsjc',
                channelId: '19a8be96-fe40-4976-9d4d-bd9d3b26d8bd',
                channelParty: 'qotoxxgfwoqloian8o9l44rd0b9w1af5gmz0el18dilclx5bgh1ts9xhbm5wp8xyqwve0vtwc1xgv4392yy9isxh83qg5s0j4ja8e7i3e1zjix7s3lo9n0isoehc51pkptzc8eevmqp6915xvcqfqxcoxcsf8gyu',
                channelComponent: 'phcyoy3gov0xb5hfd7v030o5gm5ze3kyefthi57op4pwt5wr7w3wjtpo1e83w8n6q5yjs2sz6j3ac8nne6hnza0dkshqv0k0oewhj1ynk6hkmq5mn9jknrwgc0w0mcjeoovldqv0ynygm103aam6ah2ute2odtn9',
                channelName: '6ddoy7czltxbnlurgh1eiz8fdc2rvxb0robsnsmveyvqd7kz9wpd1s5qcszjn3qz52zxknoxfb3iwvzhzph1j9o4g8fe3sk37if1xqc5qrorzmi3wkkm8em0d4py0s9v4ndfmai0ryyz0jhpdyzog6ex8v45m0sj',
                flowId: 'c10bc3f2-cd95-499d-a95d-188526a6815c',
                flowParty: 'qv0h4l1l67u854wsnf8iqi836rgobxmael9ecz21jbdzwt3331z5w8wzl79ij6t14uny4if52kela0q95y9m3d7tedrq8ot3zgvmg8dr5aw6lau4rahy9soz1h6ymxw7jptifrn01clyf15t306xqeh58o27xox3',
                flowComponent: 'gyjvvji8bp339jlrxra08l9lm5i6lphr3gquwn78j8pfjocjykbs1k6l5q1yin7ckjrjsjdiizjm3yjaiqxn6c2aruvtlbkjqi5819r71moalsafhtg9j236re1e0oo8onymbgce4rtjqq7mcbvkz79r989uwbt9',
                flowInterfaceName: 'hic2i2lhhh7xfczmbvsx5jtlz2sr1hmtcpqnuve4pxtu9xkfvca2p93nowrr43g5dh6kimr49o2itrho6pf1xvhxklm9kd7fbe327ol0wh1fn51fzppvv1yls5e88fmoy58gaemomgkgw1w3b50ay8q9m46tzs30',
                flowInterfaceNamespace: '8jrm5wrq5yh8nlu45nbok8cxjllfgaw5xt44fozzq7mozk85xf4q7yu0en4mnzrav3yp6mxm3uhhzmxik9c2bmudw2zuhgx3sp4na528j88643a8e3pfy44vruc69il0l8nfqo02a3hvwcht5y8zvom8eksvev77',
                parameterGroup: 'a159ez4r56c8j9dsdporqhg9mh8cmqgsk40b4d4z5fqzl83482arsagr87ztbmtt7gjcbrxe4tl3jt6lvo40khw540hrwjqjt1u28skpxl9h1k6pulv1ng6xg1yjldqtxmmi3nnr7hbh7p8nehl4ibuxi7712zbkkvepfqbk1cyf37hp70x4f7q2jdirpvug0n0b4dsek3miox2xtmpb1d9mfp54wt8kz1ag0ogiq22magh19fmo8h3wdow0gzh',
                name: 'o0jirc28760xd1z2h9sccify8j5565svpz0gc4k3r1guixwy4l8p9jdqhg3jpe8obvowsb6kbkt0wpa19a2k8j2w22kw0vam2t1lvgzjd3b3s0onjm7xq6nola93z1ivy0oe1lo1cw1je2nrs79171bn32nm2me6n1h8tgqhknybksnnc2wa3s0sokww4jbqbuzxuwjo65db3pgr20y7vvjfe4zn1o8ljsn61zudst6sfxb8n2l747x4bdlg9vilbr2idg695777n2eq2cmlsvmz55kvng23tu559bmtzpb51itmn2cl8n3x8hebxn79',
                parameterName: 's3m48e45l3u5nc3g7c0pfjbr52m50yanh3wk4gnzeoweza0gamxes7s1f5akmx6s85fkmzvnvgjxopamsyllnclo4fnkuvc5qy3hg8na10vg1ickfc080rjmautu3rc2kt2l5m4ke9uyipfmo8kdw87jlyfp29plruidjvwwlbe5ad3428aeefhy565yh91v4xj6df6pwq789ax538k802io6svoyt8u6od8j5n0w7ckxa82nutltoc0rfmt2xem04jtfc2vj2kvom0e8xu8ubjng604w6xp48wt27eo3x9m64xoqe01jd88429hxulr',
                parameterValue: 'aqq9i31zz91uhq3agiksu1mhlz108qdhy2rwf4gmsp21gmts27ji0lzrsm5l50zuu19sy3aqcmov7y5b5hc6k58c4wx7gl4df4att8xh0ixz981by0vhidpv2i3opg1z153woseoj05np4jln6tfjs3ypfbxrc7b6tkvhv7lbchw8bd3jkyapb6rnh6r8seaoq96u146gkxhmeynfdzta6on5by4sinporbsny0816u5lyuqpzfjals8e8byqhkomvcsa50h9q7tor16icyg7bgc478mtael6l6exhtqt7fvre3zjd4hlgyaajesqc0jzcwvps66o4cquv3lmq5xassokb66nuh5qupt8oxz7uh9ehhdegbo7812gse6ug6mm122jfqvhnwyqcqrclntp27h8z78hbee7efg1oupevf1mcl8v1agkgn2405q3x5omgnfwzwachocn940djn1z0do248c43cxt4nm2t3ipc62c54q39ln22qi6s68tc85oi7ra9twnm5deeky7opnjjgeog8eo8rwzbtoc0r5qgw5gtxs65udu11tlkrk7f9s9pckqh13av01mjl9a30utdvnk8tt16ph19bprnqafqp2iwg44j7mljszszc7qfvcgl9tqmzg6oxntlgldv6wltsj6qp4v6qk7c5mnvehqr0ro7b4yilxczwa3cnz9ysgyfygghqg3z7nicgivanqle87jwmpwa5unhyf7hesdtweqzqhq9xrgwidejp93i5nr2fhtbkw1a9e8wyxxmctyye6ffftqggfqxdeiq6dr6yb6l9yfkk9ot5ne5o4cui4cjqajsuuc1u1cz6eubiiu6pxpp9porcb5wck8f0kvvzwafe2ghln1eygoccwofax7a7egtm5xtxxgiz7t31xcasaxd1ypssujm9zrsuohe5e2y3d38x1oc9x9rhn6yv2t1yc3ngajlb19zaue7v8h97f1rs6y53pivy84fyaniw1spieyqk99zxuy97yox5k',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53',
                tenantId: 'ec9d7cef-6b13-4354-a789-de58439230f1',
                tenantCode: 'xa2ggzythitexebqm9tws2kbtbb9nejzm5p6x91ffhmcm0x1yj',
                systemId: 'a0f79650-b44e-4018-aed6-c2105c2f0d08',
                systemName: 'f1780e0joih45yyjg53v',
                channelId: '19a8be96-fe40-4976-9d4d-bd9d3b26d8bd',
                channelParty: '5jnwbfx3hhgj79qc49ld0052r7rq0zuktpnximv3q60y0m9b0j3em8au1lkcehey172n1ya6o2xgkz7575z0h5sdkew87uxd0oa5nit15k0b0jytlndk3t4bn212jm64sm0si4milbb133k7t51ot4559nv0t80kc',
                channelComponent: '6vuktjr1c47hksxyygfnl931lv4ymcff1ek23eecrsiz0zl41h4cvg5ugjq47evuvuo28yo148y00c8n3zbcahw8t9lom1qqzq2gfpa4gs4uc6fetr1puw7rabrb0d630hwwqzztulvrw46904ypxybo95m4z6bm',
                channelName: 'rcbaniqfk9lm4079c4479iulk7vy46rvn24u6t14n3gykqjpl5xjcxqnxm4n4olap18obb7aqw4ytmavd9dvdnrfsiqx6jjl19tjymzwgci4vtf1pf4u5wtxz88k2dfxwvte517wnc7cxktfi2ahnk9ddpggvzjo',
                flowId: 'c10bc3f2-cd95-499d-a95d-188526a6815c',
                flowParty: 'us21yrw1v8bup6inojhcxztd2wbm0hudmlf2hdwzuhctsk4tofeik44n49ygh5zxjfwqarhcna9bs4n3vxr6h65uw3kj8fy7ofcq6h758dfqxy9izuacu38ssxw6jz063eb2xwdc39ucreg54rwec6avoqqp6wch',
                flowComponent: '23b0v6bfs57njyks72u2v3v8w5h4hmooap7sk3w4fzfxa7ym8cnd5xndpn3k7557ffs894rlu23qx51pk7irwjvxgycncxhtsclpo2gfz5lwjvfz73owt5vd19gcec9fzqkclmli0xrl2k5qtixkz1jby3l5xa7s',
                flowInterfaceName: 'g0apgni4uog5avfwx7nk9c6r9p7mdq6soae834nu1gsppifykqbt0napqiqdwswgngrnw9crk6okyar9beklwpu2fysfq69yfw8s8zfc3ft8z2325l8jomojpwc2iir8ipcy1m7nx4wmd5ymc8wwsiqqn372um6d',
                flowInterfaceNamespace: '7zof06er58depkzgtv9duffjcr5gdwko2po1vu0amns3w8e7clcc7rhbrvdpqc56fr0s01z3tdfx3c6nrue4cnbypzm17bdkie2khq6svxj4pyawe28b3j6ugrg5adr1pkidg7p9ur9ikyx3j9rl230zoh2hn5th',
                parameterGroup: 'qc2oi7wucyqk7m5gqq9s6zamcjnjw5t5rr6582cecs1zfa49vwhjucfz3vfh4hr70r25q6hue1yv16vja3lxkd5poz03b7rvhp8tmbn4e90a3l0nnzkrfpw06j4227ipzdsp2dcupapei868toh4c8slzdc49j5vjzx3hndplwx5md52i8c3sxzwl58twxj6rrqh51xi15nt35ryr0vwt1y0hof1mh14zbp5m1ouhbvip7ckuwky74rnevi7r44',
                name: 'hkp2d61k1vfvrrrwvh0112a10tgh2rli9bsf3ovv9pmcf1fcc0okssaf6r8ywd299bn1n9jssqfux3fc73zc5qsegeoxzy1fkh7kp2e27vqij0hganx82wek59has7bm30nd06al5be2htf30oenamnulsayotne0gklvqfnh8dehakuvuj89f6tiz3xltywpiqx1ydkn9ns2w6f58yxlsk08luw76mba1d1hq6nmlja6bs3uv8p349m6l9r43r2drvfyoeepmm0tiw81l95nr7qe4z6781b9nvagrd2f1ult3h4n6dq2vm6jti24sjb',
                parameterName: 'nmykleobr5076gcvibp5xz1zhet8nbgomo32uxcpg3x8mmpt34kxi08xe0qgx8cyaq3dq1mivfyh9ye7lydc3lkeijkvkl8awz46rr3nm21nht7aobayo3mqr899hryzz7cg2ytkjzxyy4c29w2yx4w0qwvkjxttit9fgv0t1zvojjpmhvo0r9hhodhh928c8n46ml8w181kix20ehtxjkcc0ucvr0iaunob7t2cl9uelmthnutx7o2v6apg573p0xfhounejcomurodq6ephc6g4k9r3pb3qld1b20a6iek8dmg7is9krb0p3jaypsb',
                parameterValue: 'to2hryfizccz7j0427yn4523fm7imfzluqii5rx9ykstym0x53eeza5ldhw1usuh4kv3jlnoa862f8zsw6a0oum1zaxho347ejkh8y9q5bu3kgs5s3d7wmpm2ietus743xloz79r6erhjgr5ppxbzge6tn29593gxmxcbppc33xvf996r8ptscy9n4rt9p0hcyoldjlk44cb70bh2g3ywci17azpsg5ibvwx6ddt72y0510tkvrddx1rc47svcal5v3anlu874irjje0o86vwchhk0kv9kg1z7fyqnqt95uyvsi42keqdiczkdpxdds8k52szvfv6b7oqnehqsakrpiue1w1jzef238swpaorw1v0m2lpyitt502q6bl56h87nkeus3xnjh9alxiv007ficzh1h6tsyxrvgw1dn85dowlh1wz7zqot0nw7d92rdv4yqkj643a7z6kpnihypgkd2nnmvar9lx5n8h3ja6pfb0fhbhmi4erwx6bdjas3ov2ct0ogvelcc3boojgv9utwaixz2e2ucvgwarbwi0mj1nyu3izb58i0iaeijawx2zod2n75dadipjlk36b2pca7af8r73byhecafzooq4ww6n0a1ha0o3hqabhotr3vr3iso7arfihj1qoqbsd2gjnokfnuv7z2w0dju57qty9hb89kmxiiu7cnxefekkx1dblnf5os2ee5f62fft3o4imooi6fvt6tryrspzrzgoq4q27ho0lvkfl0dlhivggvg4x99qghwens1f3njmryv8gndbw579qv62acooyegs02h903bg65v36ph4xppwbqq8qx8zkzwnk9s0dvrakqxd6a6vr2pv5o6958e0my69cbq3lk9pru0nqz863up14urlhdzdocxbfafdv7wi0g5elujhuipxr3aio3ia0irvauhw4030lhjf2fyw76kakqv6pe9xwmnzsroe69sh3bphqv6li3nvqsmscrr1yt5wxejyqby9skgyj4bexg32x9er',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53',
                tenantId: 'ec9d7cef-6b13-4354-a789-de58439230f1',
                tenantCode: 'ab2lv53n26nelrq3u1wwzcj84easjk8y0mzdmtuyw1okakfaxf',
                systemId: 'a0f79650-b44e-4018-aed6-c2105c2f0d08',
                systemName: 'zmf6o7wa8j2pu9uwxqmz',
                channelId: '19a8be96-fe40-4976-9d4d-bd9d3b26d8bd',
                channelParty: 'rq6s61bkvrq5ft6h5k990x8uhipotlbd09z41xna8rk92kwryo9dngsguwgwqa2se7pw27ijcb97kv3rbob8vkp4glvat3tq0i45gzbz1liqimib784287oh989iia09ssp849lx96rgmsyz8kocj8o6xoniozsq',
                channelComponent: 'zzxvwdfv3hu5ud2a1b40ocxnh0h7pr7ls3gv0xwepf8fea8647b60ks4oygmepwfurydva9cw4dc6vpwrggk9uvfr87ch9ak3rj6g6uifs3o2uu1b8ksbcx5rnixblexday1jyplbjk9uy6n7siar2kstgi4kfqk1',
                channelName: 'cxmsq9kgkrifb4bc2vbtqgfvexv521kjdx8xuc3wdj1sjywmq9f3dcda0v6xdqm7ok8r0uuh4jbms6pwo19jcacfxmfpdugwvnlii0l6ykl1xlqinb06rpky8q95ns45htwwt89f7lykns8qrin6lbnfy40bjbkm',
                flowId: 'c10bc3f2-cd95-499d-a95d-188526a6815c',
                flowParty: '4ka17f67cobhbf48stipkaio67mxhicq9byu41mov7wl80wg25cw2v1kcufjuma2noic2dkcaemq5jmv9tfjrhbxhr8zn9570vlpk2eb6xyu3sh81v44yggf88vkch96fw9q4zg8lys8sao595hqy7n6l66lvnwd',
                flowComponent: 'rm0zjx7twv3lzssvzv2px4sahjajniueby745w8w348hl225ffybo7e0kfvnwbqld41yzgv7l8crn15l0wr8mxc4mq1wc6yylbyt9wqe6jfvg3ikf26eghifh3n8fwjoxb7wbxynv5tv0kiihn111r3letq2ysqa',
                flowInterfaceName: '5jcy6zbcazqca1nouqqwdoml7nuwkokly9bbh246vzltidclh29cjpvkflb85iyta694wupvd41ty1l4ss4f8bq6k5msuxuhrw51x1xwpciesxxrn54adlk954yffwrp8kyuvvdga3dnosiasumwnhyar6rsjf7e',
                flowInterfaceNamespace: '7k7fmlj8yi40s5ewreb990u4mjo9mobvuey9uhso2dm1ufo765p6rexkozjmiuthx6m83xa0onjmx8waq9rg0e2n3j187nogpbtq2mi3g0bc9h3oieyzeh7kqdxahlrvcd5uvcnhvlb9azj8h4ub0isn2bd4usdn',
                parameterGroup: 'w1zm24acbu6gbthbns0tkowumumc7ca9h3c0s83vz6ajz5t7692vlb1kldo43ba7s7myhc3p82xyfmipp0w4og8v3tndgyevb8j8c88yxn42ex737agygnu7jlu2ay5xf0s6tn2ldwbaygzwxrkyidtggl7bj8saargmlz8pju6bakjawwy5kdc7yj1ay1jx4jyivz42vfds883au68oe12btxm77g4ieoqhu9vun3o28peu8xld505wjjst16a',
                name: '6d036tohxeaaie1kf4v40khd98plkvsjp71bfnei53wr7s6jfc91lee9f84i9imakxo25e140i9ud15y9rv019wekxkq0s53l6pwz6h4ddhuozqlcf1d81tld4yp6rb05e93rhijg7agvarbfuqcoom7o5v3tbn6df5qnpc3b1sugrm05k5p64yy9bv7o2dc0ddgeupmvr6skl0n9pxjycl5jnsz7o4u17vvqut2z6vtahod1ps01yk2rtzcn8ascpr0qwzj9gahk0ekvb5gjoc643kb9zoxp5zf5qhcv661m19wa9r8t2hpibuq6oyb',
                parameterName: '9o618w0aak7vjcy293oy7wk4df5lsje9yyns5dzby0lmzfg5nxixou7chpfixygcksba25wn6rn0rnfn3afll5rf3rt9ejppe9zg9nex03e8wq2vv068bvqexhqw1icjq205g5hjvocwu73m27mux0ph60cyx5mibopp0f2slxalcxknreqdeyatv5byre0ykgu7b2c02nqwt05dche4uum7uldrx495rtkd2qincsyci847n6inw1vkmfu0tdl4q1yy7a2lqheqqtm4x9gwnryran69yzbu5r35gsgtjvvnbdfeb232btvjnfkfl61y',
                parameterValue: 'xqpz2k3m5921mm7t68tmkqf4xhd6c4rvt98kuhp64wtpip6x7gyulj0ntoyjq6h9ylems1pu3o9xmfszi9vb9biuws5g07tp8j4i8rri769lbtnllufetuc6s9y3yr1enpvc0d0614pi4qqcq9ip7nkt5ex87wnb102fn28dae9ja0yigelc69c5rtmspzjabnyubkxjgbj5c9z7rs7uz0hz1t9b7n5yqywqsvveiioxfmdpyi9c4kyjfa5u7fyro1offdfxochskiwwuuogv14y2j10hmb5l2ogr0681tbfh3q4j2lqsauo0jr0ov5u6svixapicamima4en081pcvuyuln7r95t355e7jj9jsi0of9gt31gr1zl75ozpxhgiu60syh1y5pn2fp3mvx00csdyddnsh74jb0z88ursah1s5icwubtsjv0qvo87uoml6jrjz4vukp3256o53sk7r0yo8932b6l22q6qkm13k4x4i8o2g120xb8xiuowo7g7cmibjxv6i5ou5z4f0s5wqv7pm9mxrlxomqe0feuy396ow2tvbyogw50yceyy64axlbzajwynbgji04z6j3qv44n8q8pnmlmbedjtoqyr8uukwvwtp3178hygvmhuellzfcw11fwz7cfov6in7lpwc0areaho9zxd5poxt0doyeax47sysqqgke7tbkz8rxsls88d1mkxbyt0dbaumfmy230dgp87wb7uz23jz94jzl2lntxtmk6ky2ljdpkbxbgmousmkmq5gxqg2lqvd1gofaywrcgtgfjctggkdxwijnhw9m2mpiznvlhv58m3kjr7lcmnpsj022i3znt60lyf53rez2ig90rbyfzl5z5hse56lyioa3oc4tm3vwqm0gpwu0egu6ns8fc3ykks9nrqgadyytf9szdxjclj5l2chqcd10lj5m23144lbtzgs72f3l6qsaynviyq1f7qka6x83ng9a3mrf29gfj4hzutlpqx0fel4xck6k16lpk9hn',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleChannelName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53',
                tenantId: 'ec9d7cef-6b13-4354-a789-de58439230f1',
                tenantCode: 'k9ej0ug8gwyz96v6fzibbg78fbarpt9zl329r2pbzhzchnhz3x',
                systemId: 'a0f79650-b44e-4018-aed6-c2105c2f0d08',
                systemName: 'am3gm2xko6h8ub3t1w0j',
                channelId: '19a8be96-fe40-4976-9d4d-bd9d3b26d8bd',
                channelParty: 'ubffiqx3zf7vnc6j3mqzswvn0y4g7mcx7isi8hbfzc4673c921qjrzud64r0vi7b0bmsg90mvg7tefuvamj5xhxkzrgscrr52zp73er27vnsnkqwkp996nk60u39ad9apwklogaifxhxnwhkg5q6zdzfnz3lk75n',
                channelComponent: '3gt8yv0y5jupj7ctty8lc8kzvisp7pggldhkykok6fq3fwkeqb5yu34i4mrwufea70mixabb748g2k4nhhagm34mdfuom9xizz41p4bs4xp3bzk8vi5k3xuoexnp8llp4s1we12sivmhchmq5r9308qvb8bm4cra',
                channelName: 'vl3gcdegi671ttypf0w4mz1icq5z23p0t5dd6c7hvx7br3y68b2q19slo8qozrvwskk7j0vumev3r71sx57mgv2uzqp2al31u0qfpfabjw0n42o4u0jcezcoodmefoksh8omabx5ahr8ygsiw10mkx3dpr2qcukpr',
                flowId: 'c10bc3f2-cd95-499d-a95d-188526a6815c',
                flowParty: '3lja92468ao5qs00fbw0nmpyikiuw5nxkkjdpu1x8so5qjbbxnt6waxbcsjixx53dim3ghlsut1e7mqgbtpjddorymwpslztqgljyiwzq6o3s9s9al0xjsrtbalzuvbk1tyw222yaeb7wyszi895lnlmfpzr1419',
                flowComponent: '2dq1nzzgugmb90hjvdievy4zn59qcgxpqbdbig1ufosd1vj9emadnf6e5s89vk0322s7h2hwy4dv1mcjgytxad0601bkorry6o22uc5yywpfuc8205qdnjh82yqqdt9r0mpyuersykc43pg7rz6s9i6d06atsroy',
                flowInterfaceName: '2qnmh009xr83flxe50tykb7h1y8et05hkxt803qkqf19fk84b9sm4hizhaaajntj0ygzhw60y01xnz3pqtw5s9sm7agyuym75vii641p7yl3zmo33gabn3gcdmk21wqp8ibsqr7wsxcwgxdwk3mlay7d2ggis90c',
                flowInterfaceNamespace: '5pftafnmuv3urkp9gbb1ls0qzexrjseyc0x65mxcdux8xmfbxoi167pm8338y9897jco9c58c3x8f93vk9mk990pnzemr5l5t9hy103kms0tuvjv8rhw2ognoeun34u1dn1n3hp9k240h5zo9cgvvmuu2ioyqb67',
                parameterGroup: '03tsd3dq60zejcdr2gdhugnzlut3zvzeajzxdgd1u0j4jpium3lqr3drkyj7jbf2zpibmnaiz9kqf2qatzk6o3801ewdtgsemdpi9jfxlmi2fb7tv4eua1dokkus2cpm9fucj7epiqe4fo2wzvxgtcnvt3p1wpcwhlg05eorfkorpppy6anqs7j31dxmn84kk2drd0uggkpi1vlblnm6hkgm6xrscc1uy41zma9yjp3kogivw87o4y8evqgvzz4',
                name: '3t239fwxy9lyigd2bdiif8xosgg48fdgodsgdyvuebw8j3k123r3f56466z6guwxz7m1fpvs3za06ule9z65oqm8g17ff9xscuyhoryg6y5dbogmu98avknidtlsrks12thwmub8yyi2z19d211avbc19x3vvi8rn7098atg6keoqlouedwz83gjbrpb30du6wv8ovsmrzld6tjwum99ndwyoii3qnd2164jryoyvfn5hsg9oikbdmufydcd7y8m893gsx2s9p5v5z121zv8843zek39ulwjibmy797a2uk1fpmoksuxz1ec26fg2alm',
                parameterName: 'kxaz4zymre0h3tu0mnm3gqukfke2c9f616wgbc4jqpq4caq4a1wb1o44vqptvzhrhejj8ir4azglayqyv0dq6oxdf7hbbhm72wi1lkwrwybeubycwwuqf8fu4reugxh3w75srorzj6a53od9gsp64pjwb95owodaxbhy0a4jqj3jcadkg81g870qs4gzm5ibxclbrcqb2rewyie35ante9676rvvggv0f2jw7dkdo7er02l7e6pjwx88i60xyvwqxlmdi0pv35ankpu9ghzf5r54pga2o2dguw03yfimmc1mx1lw3o3pgb4yh9wk7d02',
                parameterValue: '76th3tkdeja9aeytf7aptmglan3f249gn69gzwjmfc10evedztg4kvno9u889vwh2qlhiiwvpcod08blqycn34ktbqj1i618csi6wx92y7uej81jn2mkzl9vvbnyxwap0u5ybsqwhuq21i9h9jox9vi1mz2rny3zs66gnc4zcck1nb0cwqcv6uhn8us964rk08hbe3ebcfzzjvy58cxl8uxt5ewq6ng6030lapy1j8thqrv5uiicm5vnpg9jvuw9ztqzqhe103tn6nb3ye1kmnqzvja14t9a6xk8o7kd9tozlnorrb45cldti4mz7uomqw202jvcdvbbvlntghbzvzmy9etjtv0pa8a0b3lptjjj31ayr6xobofptdpzbrb1gh6dq95pkklcczxdpm1zo2z9xvdhy49jerbnw8ihoedrm2qj4qk56hrj7ktvt8tv6ytn251mphyid3tozu7u2i8i2l6g47mxjh5iu09qbqvp09b9wf2gsd5v0s7bw6rfkucwhq5trbzuxe55sokt0l1c5kvk2sb2qy06gssh8kt5t00etnl8oe82paef3nssaln9e5eb2y51i62sspb6cxorqma6jsajkrq0yxpnl5aotzlfzyb4rtdnuvaiaq9yd4op54chmceenhtq2wpnacsmne0vgongr71vz1htnjgovkggvn67jckcbgukzep5f6ji7l0126jyajao4bdnh6x0m3li6t87olxep8a725es5qr9xh3etmqch4qfecukqxr1veb6hwe1h9pvbbzpy60bd3ojtqnljk5j1q2xe3qv3gh0ynz9q7bflr89brpzv7d3eidobk0yh30gwzx906ldqde27tk35rki11l89eld131b4piycl6aovun32rtxf26l6bewo39re9cl53bktxluw7w8a6ykpsor7oyq1up6llsh8008v8xrqorijk6uzffjqsv1q52ignn2eoiuxqoeuw6lx5wf2ikhqp6boavq4t2906mjafqjamkz9ei',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleChannelName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53',
                tenantId: 'ec9d7cef-6b13-4354-a789-de58439230f1',
                tenantCode: 'pi0vhtorv2tnyrnko72d0e7vdphqbv4zogpf275i7mkfpk8w56',
                systemId: 'a0f79650-b44e-4018-aed6-c2105c2f0d08',
                systemName: '2b03q6ljtqnmiaz5kx0z',
                channelId: '19a8be96-fe40-4976-9d4d-bd9d3b26d8bd',
                channelParty: 'ci1rx4j1c8a0x8oh2b5vw12974pzknrergok3wfommy3mbt7kx3gg2d1sazwjigwq4ytxq9idnbskymmy54df4kv02gnlkpxq9rsws785b61bjx7ljoev4zul99m7nntlktfsukl8mg3trbwydqd0sdfdiimx9pu',
                channelComponent: '2eabj9g8elsqk3dakgwkdodb04jjhtfzlyqgszyzqcomt7trqk9gkr16m8820v5furyg2uztwxcfk85zqs92lr5qb7mbs760nlbf58ppoqxcfi2u9ocyam44pf2ihyy8ahnievuvnwezcp8bndtfaec4yzbzwx2r',
                channelName: 'zzhrtutdq4gd2oaqtfnsycdwgltsqyo5nmaf0kfydmmv3dq2h6nbnu9bn18tmq5c9f4zkj8fr3rfg64n43qp4bnykh0exw56djbw0rc0z4zto5ql6isg4qyrt4psbq1r4icue4glxaoytr4k0vceb4u63cnd2l9y',
                flowId: 'c10bc3f2-cd95-499d-a95d-188526a6815c',
                flowParty: 'ltj65wtnej9jb26nt7pi1ekh6nh5nu5zhxvzncqjz5jfwddoc1u2515hi25erx8orah21ft1emhu1atmhk2p1cpk8lxjaey8t2m436sdeo280i3i6joitopti9kg1tmxu21cgwbaywc4ctlrosq2uo66j908zri8p',
                flowComponent: 'se4wc208ra4h9niuqr7eodmwyx272ffsqzin3lt4tn25oihy0aersokxlkdto4tkndad6ws4dpo2yqa614c8filj2we1ab19dtbncon5prff3ehid903u4ngnqu8tjh1e2jbbvnzo47xe7b4lmrvhyg2q2jmscqk',
                flowInterfaceName: 'rkplx6oghdbspgumrb0v7qxfo3vql033ekij8hju6c3apt89unwzs033rdtclmwbzu7sbibkxflesk79bhsv1zkrbdf9iffdzyc6ge8jt7hyl990bkmlmh3lkk31k5mgzglrddkhm5jw108wx6ghumkp4ugs0rmf',
                flowInterfaceNamespace: 'ulnxwfvy87819tgvk121lcitugrqzfhq0atmyut02mami8w5xlfpz32botwk3hug7n6u07hl8w3mx1bejvjxup6rs7z24rfjme1lc2vp6v49ealmqqmdh4konr18afb6xm0418gb04nnbrg1zafl3oxibd6l98yl',
                parameterGroup: 'j88u1mvxp4fh3g2dfg0nse52ilnuy87jh2tlrbx7wcdwhdjg3elnuc194ihuanfjd8mwjiv43oq1u907kbam98bvtqrvjd519b0o5wmkaszsgfzzivoazosw0e4sfw91bfponx6c5ows5zd9p904o5hnexyzb361thjfn0z2mt35kpaa32vsco5os95iyidp09k5icw4nsqy2olkwzzfryolvgrotj1fg5609ogwpz1i9zenzpe47xjii1bjyff',
                name: '0s9v9atd00i4bxuuj6asvpgoe1rgkcpk966fbsror271uirbzaky8ht93dxi2psaxz8ufm3nlfbnd0h2jbwm2fjfy4nb2qda5m61e4gtdnc58wqdrvau9j0eawt14uzqiix5g7o46yn0v6v9xdvtet124t74e5w2rkeevo847gck18ujtv7s2mb2rq98obv9nkcugqsdp5bqhcz77523m6je1c98pcatphwhsyyo2ddpm50w1dfuq8vp3fh85ji74dnpflg0pmyza7sf86k7q61z5hm3zf8eiv2jo731hx4k2mawlorsf5yxc2f82ebr',
                parameterName: 'wayb0sbkzh55unj99z4kfcalicx6pdv9iv3i697jf1ny44t9khydyrixgqsregeujc4ssbfd9z10xdz3addnne48psq8xdd9o3pg9zg29086nbcmn5hhswper9kbht6sdivtjym2nrf8i09oarw1m02zo8n9ov54gx05g7p7d3cnye1xtwe6evvrk0gcqeld17dtal71fz21cxuis0ymrusw6cj2rbcak9wjjok6ql8ncjebaiqpmsy1g2vzkr8h8uju54nsmjizk4cy2j9goxw92c6thn54azeviri5smu7a2vz5w0xi43ez4uu600r',
                parameterValue: '7rspa8afgyl66o4ux6vkuuckg2k0pc4bu3hjusu4wmkyqbt3f0dfqao6z2vrsl0vbmvbzk06fkomfhjf4fogdzhamfs5yk0z2ib8n2ku5qutrx77w6k97cqd9v8xe6ifnponockrx5tc8a4x54dacpover6ovjflkofj8oz5myzjmk9rh8lae0ccim271bn5pf7oof3tx0o48bcij8jao61wecui1ppdmjpw033ovr3pmtmg4z9y6ljyvpzckz65esd9nsl4mezruun1viaylax7vvxophyzovt3c649lwro95i6ch1v6r3vtqqe1sev55vd1dqn2tiz9a8i6pwa5u0iu9bwhbthhbir5fhmsdt2ia2aa56umtl2zkdusvgqnkb4kqkkkppfm5t6ffmy0tftumkjt0k90agxt1av5hyqvlia3vrmlqi427h7rjy74u606lp7yxd1yrycm9ogy3ehr9rbbqr54lzqmzbhv71o1l0k9l13fze4yck419dqa7uwy51vj4j2b3ad1vgzs2sxup2i22mf2o3hezcxnyk8g86wn1f628unhfzkv52bwv8uhzrj63cw3zkpyfbbhnler20804yndtwiptw6rlfih7gxwo8b3jqz3uapdb0gp2jbziz6oixoa29c184wnyrjc28yzo3hxhkzzt1hb3j551yiphhk60eyaddm2bpzohliwxh3k9oj6eg140zvwvpfv57uw2m2bfo8tnwx0o10csa3ed4avjqgj5qfsm1iqz0syn8enm8bunwvvwb9jhyjss7ayl0e03bsjguqt9erz1fowzhpysz4y64k1vyd0hn47u2enpcx9l7xnav4n7m8l5i2pkazaejf7p10uyq3j4hy4jfp3phlbh9gajovmmq5hkpxzif4f4u06izk18qgjmd4jnigml6sfvog4t1ppmhlpq6bk49slxj9zrohdzl158h1zauq3z9gboup0qpfga9n9gmlf9211uzbuaumiwo31mclgy6f9eikiod6',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53',
                tenantId: 'ec9d7cef-6b13-4354-a789-de58439230f1',
                tenantCode: 'c5s2s6zklsxq3v3kjw0v7luq33tw63xbtn8mh1lnqequzbfdv5',
                systemId: 'a0f79650-b44e-4018-aed6-c2105c2f0d08',
                systemName: 'jkwc1qon8tdwd7f51ux3',
                channelId: '19a8be96-fe40-4976-9d4d-bd9d3b26d8bd',
                channelParty: 'rtxeaxccq4spjr0h8tjgq37gfb8q5phkg1ezt7998gam1d5nldxlesx9uimgmbz8h5fz9gjo2zl5n4y7tnu71awodkke9zkgaxx4wkm3bn7u5eeluzw1smjl87pvtzvk275sfg0qjzw8lnh3sof4b21n46db1zsi',
                channelComponent: '9g4urlxojcalxarl4orpdd5mlmtl66le9vim6aqu8rhwqetpqnvn642obus1z43ju95156xvwfw619rmffn4t0hbd9cwh1i11trqd182s3gptq8jsq623s9r16jizw30dttdr1sxk0hir257lax9ri1v5cl7fa35',
                channelName: '2dcrqk6uipd3sj4yxnc345wy077mc78vw5dj3df0w0m3oi6j142vwy2k71m1z32koyshiqsjxt1m2u1mbrv6cx1ed6mt9k9fxbt7c5y0s8ccgv4opv083czdxh2zlk6ih60wtq8tzedlktkr4q45nv37tx9v3tbi',
                flowId: 'c10bc3f2-cd95-499d-a95d-188526a6815c',
                flowParty: 'q2e4wbprza0in3bqll39mmfd6dj8dqp2rsxfoq6spqwl45el4p3ia0kuyqthojhhocboxe5yo9q0jwf1cexa3xjxs97zoaypzb5ppcg4h7241fuxp1ay55esubzwqn9qxxi2toxtitvpg21f0kkxqkqx1c9jwqb2',
                flowComponent: 'af7pib5db3ouwnosnwq4uq59zuv6m00sl4gfzvso4ni826u609g9wj2exleh6qq5p0fvn7k9rzsb78uaipev8zobkpszar4mwu35i381pacbdxug1lk0c1z76q7nyclaoly004u7h478uz573u4rq9zv0g18pqkiv',
                flowInterfaceName: 'avsorvu7c8mmmcby9m0pujgvaxr2035q1e5z9nmi5f55kpfq4kf9yfc9muataweyf56adv7hrvg81gu9kra1mqjnvpniiea926t7vaeklv2kc1xnl1bz4xmtbae95nlbxdatdh8pee4q1baot0z23kh8up9734wx',
                flowInterfaceNamespace: 'va7sy5n4vaj3uxvomz3xw52ihl47kcu1ukkw7q51urz9wlky6soxnpch2hgcykd47geyz6j33bqzb25dyp99a52fi5ywbsij9syuflohtl3pnev5j4nvirmd9u8s6iv6p4z0by11afwjsuifsnl77ufcvoxx3ucn',
                parameterGroup: 'vtm9bpv38oxqd7gxm1okcnlt0uei2mdd4943kcg1acqicmduf1jpkp0qvac26pwct61bta8dnp5738v0tk1lutcdtr87ovz075fgl85esbob3bh17iauc49gth1g9pr0fromy8sus7oqc023tpof2wzw3rigty4qlzt33so05gs0tialqy39f4y46cipiz89dabtx5hj6aucxpo9savzw9idx5yz6ep557ta4thvwm179kyf5cg5b0duxbcjuv1',
                name: '2xa2eipd7rxjap61i3iv8fpywcqusrw9fjuuvacchl5ciootznhim79o7wn1lvy0b52gep4788wjvvp1il5ypmccmdka0zgq1hy915whvrb7n30x2vcl4cpxqcm4dk8yslxhk7c2b74ivef4heoy00kpzn05am7q18pie6vzprf0j5qv9x437m4ib2ovvhbqymy4vezml1axoavh25ffp4jqca5qwx6wpu0s7prr0si9y3p02nbut292kzf139xouk9va6wzi9gu7n4itogoijm26dmi94n0rguy1dkucdmcrixjw9d52ooz3s1u3vqo',
                parameterName: '1ec4ncxdxawa5z6l4n3szdsk5ww1fl92ghfn4tnyss73vbr7c8phqc8wubxkageyio0iqbtijafhxgwn6ek2zwwhpcrstx8ww06n4wtbnb23v95qzueyx3p6848cnra7qivb7t90wv6mayysdq54zoge864cgi0yzngxipyy0snbkqba7ozzn2smhiotov8etfefx3hv54g1ex9wtkhfaiiujc65rr5anmz3t96xlh4ujp0isaybs79ff6rwt8176uxl75g9skr3rxcaewh4d9c55ep46455u2glslb9juk3wjthyx4qfhlfj5flcwv6',
                parameterValue: '6nk93tnr96mtnh5zprttusguti302dy9gaz7c4p1ua6q7ueut965q70d6r0b9sq4cpnx1mwp2t2t7wwqnkggx14vvu6vazvutjf50zolqhldpeeyk6uk7wic8fe1zdz17da1yb9r5x2b3zdou4gb0ttiiw8ybncnumg5p87sptz0y01k7twapksw2blem0kwg2xqqaszutbhuz0hcxy36ee1g87250d87g0zmgm69aenfis8premppa6r21re0xlcf0lpbnevhn86dgqa6qb4ly8c602qoxjq1yj9ynkt8hwha59zpwslgazyl58f5nodud4l8q66ixa8l6cyj9ky6ak46hp185muwenkwuh2zrqa65psoj3mkropenwww2p9l7do11z0mw3asdrur3wquf5wdvgyio79gnimqokwhww1hbcaobf5p9uw7pmy203m7bttikm4ml5wf1cg0s1suj07g19q4fjr7pwhdvabbt471y57dvti80rsbacyu8mfvugjk1t3lw5p09jc4fj0wvjv8ovt9daqqiknh7y072po1kvfjcssysi6x6z7fsoeu7x1x3wza2717dmmes260x50ewip5boazxs4x7r2rttez5f3xu494wibljc5yckhz07k3n7hg0mvasy0492ccz1pztj7k56mm9vppjus2ige71olobuh1c7z62w0430rvo6r7bhril5pbm2uewjmnwckewq9g94glt4e4n0ihx247q00tjdqu5ig889pa48agftq4rejli5g2x2mjo9bnr8qenskhawg60a7p4fh0qggap1px99jb3hngq8sq5t7yh2xwq7r14z3f9hhq8jmof7eiqd7154dtqmgsncb2aksoapwoimcvzocpinnaa9eght4ntfqus25lw3hvate2tmsevxcp7e8my4rp6uto39v86z4mmogx3af2lmjts5x3j2h0tzlc7j2nayg6uu8yxiq0fjuedzho5n0hs266dv9n3fbrwfy2nb43vipx1q',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53',
                tenantId: 'ec9d7cef-6b13-4354-a789-de58439230f1',
                tenantCode: 'rs8a9rj33vg062hwwrbahbux5a2rck9mscua54zl18vpdhi39z',
                systemId: 'a0f79650-b44e-4018-aed6-c2105c2f0d08',
                systemName: '6pbz7nz5dbhbc8lt2hkk',
                channelId: '19a8be96-fe40-4976-9d4d-bd9d3b26d8bd',
                channelParty: 'x0qv4qtxvjnjvm5aopi4h61u5cg29q714h2qqq3ygu7zct7j0piqc9ntr1afja92byy9cfx1raz6wbk2xipnv0m0thk7sfex5s76v3v4fxkntktg68apvp3d0q0unxdgrufaxdsg7asi776edlha77uulajdddax',
                channelComponent: '8cpho027vw4d548xyionsg4b53der4ej3uudoxmiogb764wftvllxuezbbmidbmw465i8jtxu7pml6253jfu08j9ltttfyfqxwuysemlyh5jnasy2b7tmskt0ogawh0s245c2b3r93n3wwpbnbsez9rqcdi5qa24',
                channelName: 'bpex5qdfjxmjzhvr4jnzm40ejvyo9sz31qfvmbsfsygx4oz3dws0djaoxdx8zw4nm7br677te4bgmhwmk84liz5zfcps1s64bvqca1kgzbshl0fgjkk3bn7pvrdaaqr0wmycqzs9jgyv7hfncos1pdq7tq745w7g',
                flowId: 'c10bc3f2-cd95-499d-a95d-188526a6815c',
                flowParty: 'setur2x7czibpnvx5tms4fkdgrpwskqwtxv95m8ao9bma6agsiw9heydcwa50r5kyb4r75a4d99k7enh2wud11bwf7qoqqgsezkpnc0pj907c1xerla4wwm8a1unh9kmz7si9vy4mqecx6ormsa2d6186jpnf2yg',
                flowComponent: 'ykefb6ubk23cs5tz44r6w596x1mu7mquyy2f0l505e1x8jjhbu7nwez0wve8p412orkjz4g1a6ceni8zvx36gbi0ewnfkmavgtl276ky1cemf41mwdd7g8ju6qde4pacvpnvhy87f9rerje4x9m60hg4i4v1d4vp',
                flowInterfaceName: '0fxwrl1dfhvoan2a66yk9nf7aopt8x5hcjdigts7efenz1sahs1cd1v11q6iwtfgn8kosw9bm5djtpbjawvaqnn34ahr9mh4arl1rle4ofvjdm0zhvfpf8wfyp5v7142ph97h4wfn6b6fjj0u6cdfcpzqfnex9yk8',
                flowInterfaceNamespace: 'ymoqajuhf4pwxxrcv10p65jk8wsaet4b57hmu0043zdc6y9hl0kw3ei7zh35tyim74zl5ibsgbrb6mqc00in1nzal1gcra4ljvm52ijofugmjdx3p3g8uopub7jcyud9lazmm2jm5neb6iaa0034hjpkzk8hy8pp',
                parameterGroup: 'oa7dglzbf3q7wn64gp7k2zi7godowrwitbspc547noghzbhtbe3ithayoy6iyt9olhqzx71bq5olfeck51nwvavqda52cetmjqgbtbudet0m1z54obcy6gpuehdbh9eo402pg172b0ya07clt0sio5kuek4tiqe7n20h0u7xzoq6jdeee2124d1wy4rrwzn9int8ojnpj6yl4k5cg7p372q0hg0u6wgyyppwlzotzj2bf1v0khdjvy0rg60sfdu',
                name: 'd07un5k9sdx0k7zchq93vrtmqgoxr39otin8o0eeupa81gujbtefc0epeuaay8n74ppan22snp4lm5bo2olxs2s5fy7riuxc9p3gwvoxq4vospy6fwfz5lsth33qjm4g2gdya3t028yt8ae0k4yhq9okswnbjwm0qv1k38szqb5k99bdhc6abt0fhqjjfuclk5gl1n5ia7du4ky7s5ma4xn43wb1lj4tuvj014l5tah7uunkgzhwfenhhc1mjgk253zg3xg9l8w0h0jz9asaj27b1n7fksi1t147yk97z689v8weij1ubi3ejc0n9y3u',
                parameterName: 'uu4p8vdjvaqpkeuhhw1buev50nn2671i54c3ww938i6sdh3nm5xcj3ubqii5efy42xmxo9y836laieg3sy7y8d7bquaa9b9mvopd33adk9umerjd77uhaxfq5gq2kzb5lgybj4n30mswgk8qfkcqsvagt0s73g3ryy86eaonx2co19gqarr9ftxrszkqwuoh2i0tcap62eyc5kkp2jyjiyqh63onyq2b0quqs34lvdp2v9ale4ixxcte8v1jbmzaj5gy0nz6rfxpa7k1zsbfbap0ajib5xjavkkfogomyern736p4hmhpfs4is8k65dr',
                parameterValue: '51emhsftwjryhi3bsqoldawooq6dpp1gxc1n2hgjxw9z93rxryhebggug6y8m2xfak9bp9rerfdx1li3whx43djnvshniqmy3xxk09eglq7eoxnxwq46ub42x41gs6bdf7s5f5jfy3xdoj7fvmgmxnojvxivr67cy4swc6e60awdqzoyyf8tz5zkasp733blvutr0wjig5bg22u9h8r74xb6nyb7u5p37zsjdtuz7eonuklhxnzmlcdyfzllb3ctpw61w0ufh93fhahv7r69xs2z7fwnx83x5sseo10ri0ugcgqqwkn2ls7kq8m4x1qvrosp26pc21z8597lrix10smse1gdph7970cxpe8s2b1mqp1dpdv29i9tbi67zxorw8ngeqmwu456pn8q4my7xkav80bfidosbtss32d49minc7pmtlolbpadk4jx5rftkc87bubdj2gxs9ma1t8di3sdmyc4w8du2cvlvp99n7u47ad16elxaeqf2fl5rw4x7j6gc5munvqu5ez5de9x0eymgx4fc9goic4k2kq2g9wvzklqrxuk64qrw6hayn8fjlzbivkjz6y172zln77coe3cf9akxtnc20xtz97n78foq6j3hmafxcf1jis8cf70h2w7is4vygfx3gzh5qxwimxpi8h8jio422db7isrzrnse3o4q62kwk1riom2vrp7g0r3xsbxnjzbva173vbnjro0cthvw74xejimjhx87kqmfbfbyql7lwcgsuazibp8mj9d208u2c21agu3oqooad1bom102dadld2e49bq0v8am108qfpq7ww5555czm6jivkyjlp03alq1kanpi68cpuwa74wsem0amb5h3xyzukigx7jhx8m44esgv436m6tlblib2v2mj0f0d3nkttyce2tkl2o0fzec3q3m0we5cfk1cp5iikhwq104s4i6f9auxtpqqmzwoqsa9ac0w5lrl1pcj4exfg4p13thzua6mjqo7wvl6yda8nj05dtv10y',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleFlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53',
                tenantId: 'ec9d7cef-6b13-4354-a789-de58439230f1',
                tenantCode: '6j2hecrtj210bme4ay867ca8r9u8i4okgbpy168jscsfazso27',
                systemId: 'a0f79650-b44e-4018-aed6-c2105c2f0d08',
                systemName: '674spks72pbfczot3sxr',
                channelId: '19a8be96-fe40-4976-9d4d-bd9d3b26d8bd',
                channelParty: 'i9mosrqy1lycakuvdjnkcvvqw5dulxwzd5paq29zq2dkf1iuo83r1pp81vp9fo77akfttsm7gb9m8in24fnu2ol9u7ov0jhh1ny2kv5h5s20w6pjeaidmvnhuv3erv81eo2uhnnd9jm7b2rxfzayi4ielmnpyxcp',
                channelComponent: '7kd663jts008e328mdek8yjwmg04wr5n7puvn7rohu9zgmixritkt0tzaxfxz4ppu9mgy0w6s1eo5l43917lujdhdc59sqdsevuk7xtvx8e7y19ibdayui3mxkwv8v1m767hr4ylk2dnashlxlfossn3cbyys0jz',
                channelName: '12g1gm6vx1o43s9iyzd3okx3xkvx6oulyslwpa2tpepay1eetlqwo010ux2bl1e4hrs40bhb1rzzxbm18g0gf5zo8ul0br05hw0mkebk6e9hjoddcilh90b8g2m3ett7pgb1cf8htjom4f0buiz2rj16npfqjmaq',
                flowId: 'c10bc3f2-cd95-499d-a95d-188526a6815c',
                flowParty: 'i8l9iwnkrdhoyqr79ffdjaa7k6s80y7dn1nhndltkdmqql3hqlo2hdzlv1nl0btap149clxktqokt3xon8gcvatplrr2my60mqm2ehwa1dbhcedzcx4uy7v51mguqg44igafd0xg184ldeuw59urnm46575eoltc',
                flowComponent: '8falnzkm68wyxtw0vg9hsoy0641wrbay0bslt9obomnkpzp2rhfn4xlfqgved0vjwml65z600y953exi4gfvntw8x2dy6xxkz5rm3qi95tr7ytx7bj8b87aa58bsesxvrcai8cblhnwnb3uqgwtw3e10a3f945q8',
                flowInterfaceName: 'ws0p22xqxqn2u9q69krynujxsvjfnmtfal2k6boibjx1hno05bk2iwaehpqc04t2x51kzfcf23kgtc4bq31ip7fdczadg9m0h3gl7hw88otap0015xvqxe6wejk5ag7jhwq5v2nj28lq1t9ijy08hfy9ypj2bmbl',
                flowInterfaceNamespace: 'wbrhpy5vd0v7dvnl9so2cs9ntra7ksg3x7tlfr17evk79i4lgxmxgpvi6443ckf1jjqsbhr09zcqvn8hf54g84purkfnpx77x8hncueomjbrm21vpx6dp3k09v6wltbsw1gspa1h389cz4ykm9xqfziy3pzdwvthr',
                parameterGroup: 's95upud8nok4f4jdhsaxt6mn544h4cyk5isc71zqnxj90sepx8p7kzxvpz22mnzixj7vh4ky2uq68skvkhnl48qyecy0deazplytdinofbhimcww8ogzt5xant8x7vhqxefdjsnauiyyiqps3jgfu3pzrwlnapf3cndbzyroakyrfwqfg9ys5wv8lc2z48y1hgsmp37zairiteitzoh22cmedr3mu5ba1j1j33c27jo10ajg4mpmsjz3wro68tp',
                name: 'hd2idcwndxqd7ompg9da71pn1j9s1rvyjkf4mp2msgzichoutjvshve9s43fj57w8cstoy7l4cq1cueyqhee6y6acaitams3rhjrdpntq5u4z5qyf9f0ue7f23xhkca9rymopmcl6g1jckqgsetsyghwty1rpz71yapd0o313uzt5195qbjmrwrktebiiv3ig73xeduwtvxiyw161yl3jzlis7bmqb7h30wkeyn5opb84h9s87ftcbw53bhwl6zhud8dmk25gr42u4wcz87nmrdah6f0zrube9cs3ds5f3yj25nso4ivnspx3h8djvk2',
                parameterName: '2zg295sdkrzdb760vcugxj753yzhgr7bgaeg9z9ssd13cydf8ucjzs7zqbgiqk3b6ud66xrdku896a5rawrdc8jg4lc38rdqtm4xlx4umlh3vw5pll0431a7fc7vtv8hk82z3jy6azuqu16871n5khdcn5jqmvbbe4xjdm1gg6l93jm0wubhmfn8tnstwypelwka3svj78uwjq5dv2cxyg3gqq99ibqwais6se4t6v2z3pr9u1l4cq5ruv655g2f4oqdbduvekvl5gffuha0i0xnwt2h2uwbb419o6lbm7z9s9ctmtjhbe6qvme8y93l',
                parameterValue: 'mqrihun6ucpevp9pzu58pvg6i7qa2545g0kiwduvaxzo1cmz60n0ud21xp68ckhuuzq6aor4mmt1dzr3xmpks89u395p46lzzcdhxkud5mfiwjwebbxz4fb25vldxadrr8jaelwx76mxs6iy1yrbv82m5c6r18ksnpn95puoromo1n1h1xx0wrjpvwgiaz3xyvm86vuq0gg8e83sii4h279mkni47wmt6ahxo302z2n4tg2zdmdq9bnnakhrinvflyaqee4n1g7nezhsa5rqf7u5btzi66ntx6gfagzdj3qe40jfigrlq8mtvx6w8nh7wd3k8loh4ogm3woj9wfw90f1w99bti5k5wi3h9lk10i0o1588d1sc84du87fnn9kdrg2dclolg1yhwxrhv1xx9ituc5qx71jps20tdb203ty9owxi80it02bsp9rfb0l8i1fcjgaxn642ikmekgglvrot742qquzcim5xsfyirwdt398e5votxm86dkbu8bt13e1evoeg2z396vilej2rkntcfur5cq8dwycm0q29gmlkud276xsawwlqzwegougxlaluk71iwezee61nb4bpeg3wc0iyo1mf4g3l3j47gpzjlyzxn3kivrs2i47ifeisf7ef891k0vc6gbrm6v84dtn1t9zncfu1fhs8171kdltzh8f8lj7ni4pf4el8gaav6f9dlsxolfevg0n1bsdpdht59xr2u996dazxjh9zri3y2oa53w3r6clvoifxe3luy780dwe0h85kyzzjh0hqy7yl285id2bc2w1jiqtzp9pmm0cewv1vmomumszu6fltbjrinjljzumjzw3xpvq2ce5dz18gcm5hinmvfwkixwvgho4dpm0aky1qq8fz3p0chyghe22wxoej3oegcptq5idcbuqcl73uvuenxkhczgd8ro22li97rv6x8ot9kr3irjr2c2zxu2i89szmuzsf4bkw74t64hqz07fu93ph9fim0ana4m5u4u75wo2tsyx',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleParameterGroup is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53',
                tenantId: 'ec9d7cef-6b13-4354-a789-de58439230f1',
                tenantCode: 'cesp969gj6ubgemnpbx5s5y3y53zirw0xwi2to5zed489dkaf3',
                systemId: 'a0f79650-b44e-4018-aed6-c2105c2f0d08',
                systemName: '0kvws759o1scv2y2ng43',
                channelId: '19a8be96-fe40-4976-9d4d-bd9d3b26d8bd',
                channelParty: 'zsp1fmuri913ox9wok7t233gpd5274zo3e8wvjb3dtcxkqpa321hqmh397c5wnrp78n0qacneu04r448mmpxjkdpse4qxssnlea4lsuoyeujy6xnck8z0fsafnk61wod0u1i6cif6jn45mec72jx5cmqpzh2hcxl',
                channelComponent: 'ah6smx2s3wr58t91sprstbcrs405pdi7ry9312yzmi5s2r3dosqvndtc54gxjal5lkcgdkw0fm6wzsllpe86upxillsv539zorhqecjqnewqjga56lemeerdkgqv79tgl4db6hemem6a8b7l0bnqhrtshywqoy15',
                channelName: 'j59qc7bswl72iquj8iqwrgxzi9nvcc8fz5wo0tddlq7f4npzvuswdwbbx6lnbdx8swd2lsh4v34lf6ogzgxfi0ql6rc9z81dpa83c7ftr3oeb12ivy8bt8l38ew1g9iv1wz7y8f9x8hv8owsdg0psjdq0kckxofs',
                flowId: 'c10bc3f2-cd95-499d-a95d-188526a6815c',
                flowParty: 'fv7gwt30gqsi2blvebs72kkc8wge7fmetvoj82rmuw6c6wfl8fflo10zamihgqchq81gk5odjqxq43oy84j5l28gn0wo4nufda6pregx71wawi0syg72rcdzzzzibgkekr63ylg6q0kspr2lc4xsezbdhxfwvuw4',
                flowComponent: 'bq8b8gvskrgu09elkxnrg1f9ip7tc0exqfy6oty53oe25172ujobwg25vuwwo0a7d0bw0p3ah8nkls6vm45kxflimjkpot3ajgdju37gnsh2cxv67mupymg7s7t23nash5wyn11h119thijykhohprd09m1bf0uz',
                flowInterfaceName: 'va1c5w4c4ty4nb04gs7vawbsgajjvx84co6m81f88wbbthgbhopyq5jd2owwvl6dvbb62xo8072mmi2g9w3ledww87axdxuiv5n33ay7kxzds0e7izvjs1iogj076vstn4q8jc0oyqy00n9d5z7vhaber9q9anzk',
                flowInterfaceNamespace: 'ebh0ywtzzwb5e3kkarvm28gun6xq6rc5xai8otszervscch066kezu5cq0b89gkgrtck4bb8s0pje6gncdsa21b1abfw5vyaigbh3d0sa2v2bjkiwk7h7cafskqvuy8moate1ccz7j1j7zsxok3innhotgxxbs6d',
                parameterGroup: 'r3mt5qbir9ia27nnu19jgjl7pxz9st390pq2l9o2jbzwov9kfmw1soag85se7aarabnh3l1nfyes7q9xff2d60j38k4bc7oa5qj3daw9bctnp1fg5wr9an64rf3vpurnr4gv34c3amh0r1i2npk5wj39iweh9gmyp2dqp692snot8d5fkjpx2cfcmw61fzllyvws3fgon7r2plx6zty5r6g58xoi117tz8eie5sc655kwxys8dg31mt5q2p2fr63',
                name: 'puu4u8s3d0m96quv5hsxrrw6881ovwn0xwrd7c1hlgg3qx4wrl7isjzzcl6b2mrtod369y62pmy0lte6q8pqbpqfvpckyi2ioprh744rv2h6s0c04p5d9ix2r9n38s59mxjgff6xx1dam1wmnij5t3ugowl0zw7b9lekgwpvjepqswmkrkkqq03g1a8pd8yr0is18xtj28dwre2fjwll73k71k428svfwyn1bjk5lny5bd2nqlsfs7fldylru4ds1yvb3q8p0fqwe5669mjdw4du6q6hzgax9qxckmqcpeibn2a04529evro48d2jnzg',
                parameterName: 'ek0ur9dfnnxw3427n0rxp08sodp3g40mh5p4rdg6q78c7xsblb5j978flxvib514ywwjeviz92xj96kp83gdvqg3qn7lsrr5uv7w2kpc3avhc1cu4si2vbttx9b2nyjfawdq0js5ittjfcnjd9r1ppkv69hy4pp2mnb5krqql6v2esvaczz2swz5mrri2j2gumlerrninx93y07osyo4gfy7e07bmucbdrte6wf140jwtehk92i516ufwhp779co4e02r6ao11nylarfet6q3tkn2i4cf9yty0dphuijuub7ej2kidkwtxixwc6f45ge',
                parameterValue: 'kqvfnzkith5f5gu3oloq54ae44sf7o4i07vba2o1np799esu43ssog90izaka7i1i34sgb1fjvpnfioqrlnjve0gxlknmgkomp9nsw7246mn9ma341nbmo6tj3ecui0wok52l7w13zk1odityovqo8g7jls2ui9k941s9yc7yalp980d05kfeo0tntu18c6puhcuqqfrt3qf88xm272h36o6msjs2r7mr8o1cio93m9kykyqpj036rmf83rov3b6n0utdk4vdgaayapfgeiuwnk1512ua9hik9tvrv9zqyyf25rd4z30mibhhnwjvf753mlhnhj59o9qqldrrsvps8as592vint469oczkiocih80yp4azkv46emsr24qqqyzsbtv8w8zthv2sjnlab1rbcbdxzoezkkno53alkeya70vrxplsdg4exddp2ihniowr5od3yx7qqadl9u5i7fzy4jj63ys7t50b7jtxbrfxam5f43fxu8tmfpss4pthyng5bztx68mhhdr2cdmiqzgip7em68rpn5jjlrqw94aclo0vs6m8xu2icr34dssqdb4owm30ln8q51w30ause78gyt3fkd5go6q2fa98qoxc79d92uvzhdi8mw8fzokh1uf2juhdzrx17xao0dj01ebsxw1wypc7ce9wv7podvmhavhq54x39a59kdfzqkr6agnw3ulcgt6n91b2hg0wr51tbe2kzncxo8njy3n8zhg5uvng1tdmvcpxana8lztlfldgb0pvcj0mwmqb8157v3iqyvnsrie1bx2zuxw8w75887edcnraykajukxwlzd5hr9hzyyxttln71f1phtq6u31of3hlzn5tjrdc9dqb73hwlg0idnd7gnbuf9jn3l460gn3lda00aa5umj8b31u8zbijc20b2ntmbx38at02h2npppgd82w5eaki9ck8uac3wbngt4riwbn971wfkxve23ax3f3avilcd8cwrgo3bk0eezkvklwhbspn3go2pju2',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleParameterGroup is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleName is too large, has a maximum length of 320`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53',
                tenantId: 'ec9d7cef-6b13-4354-a789-de58439230f1',
                tenantCode: 'l3kadcy3xwcxo2sw9rgody4lekgo2raw7b0dqyv2amdrvez9c3',
                systemId: 'a0f79650-b44e-4018-aed6-c2105c2f0d08',
                systemName: 'eiyidacj1lqhvnazdrsq',
                channelId: '19a8be96-fe40-4976-9d4d-bd9d3b26d8bd',
                channelParty: 'p9swdg81l3b92pel62pmsu7dhj7m7deko2nihi6xwggq2gr98ewnn9kj1hr09boky46gm531pr8nhq6torsljzo7x41ju3pkz7ck9mrsctqwr8qdrodu92900xqavqrvs80rzfvs1qybynfcjf6tgbep25vzdrdn',
                channelComponent: 'uyq21efmubumkezassgz119oy6cwth3kw0yeywk1o1l0dr0ch49n3tfrjqh8b6leuz8be4h7l1cu68j7kg5lum18lgst323t7a6kpe3vk4cg17c2senc5dni1n6dy41sd46chqvx9qebuk0bl15jwgbkwll01iy5',
                channelName: '0fcmiu3k53g3m0b034u28o0mk1yn9ucgeuadjt55xkz9eicmaua6c8k02nst75cxjxqr2sh7zjwnmt4na3lsw4kje2xjs4lvemvzvcprhrnh7qgna9ta5cd7i0i33lcvoy1ot9dni1eka6yne3vw1il4hwpiu03s',
                flowId: 'c10bc3f2-cd95-499d-a95d-188526a6815c',
                flowParty: 'v14pltyom2fcqks1j55clwxryrwgks3eygvt9vj77u831i5no7z168twkdvkmismoxjgu1dcvwydqgh9910bte6m1nwio1j2lsrb2s8rld118mqu4q6u279dffvc1ws2tlineldh1twhdctm50u8l6hlax5bypm6',
                flowComponent: '0rsetd6f4juxj3h0ikazythtvdsyvp35as72bstngr0px150kce5r19fixuhlnvzby2dbmo0b6hbekh5o9e96gp0apwh2evs17cdmayeyrpipaxh8pova7ycslzvtwjvmpj7jej54eone40rqkw9astu02s06isg',
                flowInterfaceName: 'w6q7kmsxzbvab81yytcuim0qt6v48akoacmabf2q81j0cltmcmtt1pnjc5znbxdcpiblnl4sk8275c2wrdlnufgdkftj8u2j3gtoi5eveqkd8z8n0593yai9hrslaajil5zaz7u55vpzlbntdpdcws6doef6f0bo',
                flowInterfaceNamespace: '8h57a5mpgb7qq93vjukj8yjmq2j4vzuctg89kmuhtbzdlj8d08gc5zaavisahfxbxjyzsi6zjrkg10cr5c0yjzy6gth0ssd81vz7yay9jk7h51z1xbkjh5zy656klz17zdjwhdiu4cbwet33aocnyr17zkkojuga',
                parameterGroup: 'qxraofw4pw2ulov003a0a1o980r3zlygkkqhso8s58akb0q6as4vdat1vbkkssshmo11imiuse3mnyns4p3svishro4ip28uq1940rk0sqnm39jf1qoicfgygvn8ke5kuj39phc7r37qvxbip1w0qanuvvzwgd4bb8l57gxuqs692sxqns22ioo91of1fd9zgg9us45hc1py3h2gxp2ri0vo7y0l5zzux7qpnf0pwkthgelsbqlzg3x4y9frz3w',
                name: 'ngqqgxpnjuj1f04inc0ogyf9h49syda4r3xh96yyf53sxj809b1rxl68gp9imwgpyaj81stoug1b80j1boq8vskd3r8tr493rhv8cs0setmvaf7a2t1920q39yq9akiyn9pfapqrrrjrluf12crj7ccrz4aquazzjasuz6mx7d968ntt87flrcapbnkdcgds4giwyix0y2hw0kbe234q65e9hm92q3qj8yt7hak16o8svvok6pdgecnh0xdhnqzrj82z7rqgfca3a73h3g8c9r9tec4ibs97q5tu65k6wuo695x76ep4bw1zv00seuzyf',
                parameterName: 'xc5u2qj5jul2qltdndnygz97qkvou9kqgcas9v1m4s3nxq3mhb5c8vozcfsivrcpruh5k028u7aza94afep63516kvo8m7aqp9f0decs1gfo96g10xjttrazud9bidm2tikh3auze3vi9apyfuaesjsgst32d29eombl71iznxf86xzpjdyzdpkvrhpo0d8i226sobbp502doe0e7hdfrses3mfxk7utqlcb4frebv6halyyrgmm9g2fd3542w23yonlhbpfvpfdn0qouzjk6l5ui28ljxkkcx2j4f8zkmjt7gr0fuwsn7yf07qnrfts',
                parameterValue: 'ty7d76nirssyo8jf1b9b24axmxkvrzpui8lslid1ndq9dvejvnwb533ffcspq0nkjfejt1su886ujo1bzg6ikji7z2jdxayzutnomhupgsywcgu834w30wb3es3cinswl73x2lesv726gcybbodgxlf43clkgwc3qxn8haj1dj1b22ict968z5epcv9bc6627euknqdpociryy1894auhio8g9qz7hnueo0gl5zxjlxreag1d83aerynsqtmpo7ng2mcl13opczj86yc4uqfl51etp39avdyor22kugdw5kytzeq9hc6oia5j2rwrclfiozlq0hswbedhpb1f3gc507ovl8bfiv7wd8dk21mk101bv3hfoisdixqskycm4olumft168x3re61hh8zpbin8y3ea0ij72vnx21j4sw7r8puyqqrjlw2twc5zlrjkqlzor6wgkdidri8o6e11p4t6ytpglwg4id3ulctwn3qv40x9jnejxmdklu50w2kspg42ht4fdg0o41nqd6dlm8il7rfxtjbdxlmx84ubdwyeljdfnq2r6nmf3h4ufueynta633lpgyz3lqin2oi4820sroq87uxea8ta3rnrsec09bpzrbynebnxtfv3j2v1rqa0jludqj8qryqcd6y77cj75zu88uypchqiiy53d0orowhvr6zvveygv78b8wk016nf5t4ncwd8y065djt1ure7lsc2iy33u5uonglcryvb4pv7ethnso97eygm96olr35z47tlkowypjf6hrtk6sgsos1lw3tafupcnpjiegvmv5614e12og7uoxm6dntrvfmkjxkmybpghv2ct8wr7h8hqog02gqv2qy7erg3qmbte9r0sn21m6t2jdqc2rdo7ewe3moecivdy9qnf9l8tihr2ynnsik2wwyhf4rq13rp1447nlnx2463nultsop0q4wekb9joixbbyqw4ivydp80c75bvxq8n1ujrx9k7w8tqm2oevhqts9f5nyc77sh1d',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleName is too large, has a maximum length of 320');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleParameterName is too large, has a maximum length of 320`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53',
                tenantId: 'ec9d7cef-6b13-4354-a789-de58439230f1',
                tenantCode: 'bjm05wqeu6or5lwm8fn9bqur14hzhn8ldoj43e99fnsr6zte41',
                systemId: 'a0f79650-b44e-4018-aed6-c2105c2f0d08',
                systemName: 'k7bms103285trdak2wxb',
                channelId: '19a8be96-fe40-4976-9d4d-bd9d3b26d8bd',
                channelParty: '4u917vbqz4agnp6qu5o5sbgaw62donh4mopashsd6py9sdbkbi4ly9ir3w987itnuuggqkk7n3xw2hzh9zmoszxzkux4x5l1t17u1rt4akp3x2su7ec2xasgoi52ijfrg7vkqe5lseznmspne2pgovi5990qbzx1',
                channelComponent: '3an0jlcb0gnccgudgmd3ty87csglm5llqfobuzcyncubh2cnzgh1yhx8nwyk9et85l268hi9ud4xswz16vwz2rz2pj5l061s0mxi79iuf8jysscwocy0o9ytbdtplgao6d1m4rpmudgql8ujcbsfahftd8o8v4db',
                channelName: 'qed31jf7o25pgm4cca4n6u6bv65i81l9te06nww7tc0z3s6spjhg252d6aqt6myoknv3lh2sm12no9pggmuwjupyq08u999yxfwxe9cwmazcdbch3bhvq8pks5t0g2o49wq1gtwkmeqfmkkxdwt8l7tcs3u39oub',
                flowId: 'c10bc3f2-cd95-499d-a95d-188526a6815c',
                flowParty: 'ssae0kl7vj7d8tll08fsu8twd9b50ww1zmn9itid2c3hjon62jhheec82zzv2bc2q87a5ftjbb59sv4uztr1d0if4hf2rtbc84anafk30shxkvqs3wczfy8ipncosor2qasd9f19nln81ak3jpl8w6ps7kru6o4l',
                flowComponent: 'bjlxqssf2oj9yk7w1ebn9wter8ag4xf86e0em4lqlszxtemqlxb29ipbjbgydw5b34ngepjjxzg3rto1wi23a5wwltzok9bdbftkkthtvmzdj203r852k26xfpim0bku2eb6j8as0ye1o01v8srm3j7g6zzx7t09',
                flowInterfaceName: 'wwrrttdl71i92pdgtyqdzjncd2yxmruvug47jutsg7anmcu4wigkghpyij0mowkzowzivdc631tm7hwa05spqtimzyfolk1yke039cgebs7m0px9iff14sgpxaiiek8u6bl6eptkpx4yx6yafnyealxqnq0z2yoc',
                flowInterfaceNamespace: '3krussxxhdzwn86c5fv3nymbiarh9ae9bdnvxokwcjk1cok28z5jr85n7fpksbimvhxz4b7ksopjnygjd4nvrsfj3ydjfw0gs6gxx1q0e5liaiuurpzm47nrwuqq3k5681eto1ouq6h0i0ej0ap2gsjywlzeyldj',
                parameterGroup: '32d4ti8vrlcnb7puua3g33q06u8pwywyynhl45hocwf6q1r17j2a38i8r36xhnn21fey3ser8wsz4grqg2w5f0m59n03uaswzz2sjvqouuco57x6dgtckvmyj4zvkeynd36ls7m8ymdv06ixryctgbpaymokzmjcwh51v1ftkhi0lrjlgp8but3obzu9jem2d8miza7op25eqbzyuxd50pe0ykxv7qjls1el8tqeinfaf8mwa9jvgq25k95tif7',
                name: 'v5lcfzh0x9l6db7cjwxeftd0src984cyo82gysdkuuazmcr6it7xn5yovj2jmtn2lj1149hdjvkvarli2estmfdjglfhnvfntvfrqujju6jj5rh9nq89369sper04lyxnkk1hsp2ntq1aukvyzhhd4taq0hrpyn1fnigdqav32iottik3dsbntp5purnwx7lkv7l9e1kgv375sb7smved3kj3l5trzvxur5rgqpgs7r2g76nzit8kikn9bxi32leb1o2lhv5dy3yqfodydsky0j7vbrt14gtpv3upbp5cr65hy9b1wfwk5kendndpkik',
                parameterName: '28l98p9jiqtbltbmsiasoh19l03ft4i3jc3q7r354poitgqghpgazrp86ucscc46q8sq8xq0svi3l9ubtz43fx3gqc91cxg7xqzfksu6pni5xi9hi1ckk3in4qew0qu369u97q1j4kephip0oh9seyf4e3e4gkjjwizbb5mwrmqlopzipna3ltslq1vjb8wqugx6ti6ridz3q2o36fp6wl4ph6sup3yrlr5f1b9ysj1n4643m0mkx531bcn1mjn5p1jagsfpxt14u8d6an49la8yu4q8ytgy0mhoe1luhjt9hj0n3dm9qyxdye6sox8x0',
                parameterValue: 'ytd55m4t70gsl26zyusnjba0bdb36tciw3y6v1ib8rh51j4h4pj8ajm3fgaco26nittv21x7li16rtbr0g3xedcb1z9u3enhzb01bux2kzeon24ivrojhajecenrufa4w0j5u52ybh2nufy7qx6vigkvvbsanxwcmigq2sxhxahchhd0fiaf1rlbkv0t6pzoh7j6zdidsnxp989a6nnbdv9qkifmkm91nje7y8sbdcozov7hs3hlzzppgitsveuohd3f80idgterv237x9efjoikfsz1h1zwx0pgfbjldtjmt3dem1ea7rfx205plrojkwd24ed0eapirs83vxbzqu5mk1czllu23zi46b5k1u8atwgclyn45jmb3am23qwgn0f3ce8s8nuvtrr693027t7gp8svtr7y0i0f5s1kvvfoci8ue7ojn7b24yhwqzq72pgymzkdmqx4ec803bhap9z8puumgbyyp7a2a2j8ci49wfvq43cja5x0kg4muco79sxim4j31bhazozysot1df8nz93xtz6nkwhkh2vchixby8maujew16i1bcoty010mzj9c3yf8xsrtogg62511j0uo18qmz1flydes0ikaevyzh8ya4rzda7rphbzcdc15ofl1f6gj9ir5xdz6g6m6btg63dmwpqjp65lnilfgg6s4g0j9q8gddz5oiu975ckjsit83trsbi4j2lqqpyk67ztaylwsie5b950ti75wh7g8hwxs0wty9d1scqfubs8rzf2z46q0n9cpsnphd52tly43mtofdswjnyab9soyozbhe7mpwxj33r9a1vrxicgnu9neod3bb3zubbu056lz7f8jz66dqjpiys8b0bk25bciirm1sayynd4n7mjq4bdrrz6f6yrj4bsdz9nvy5zghr7g67vr2r9jwyd1e0akdvb4cvtpcl0j4hnblexkohkv6t2b2312vq469khy3jnbdmz58x0zagvpkrlqyep693imvnrtcx8whhldm9vk316',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleParameterName is too large, has a maximum length of 320');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/module - Got 400 Conflict, ModuleParameterValue is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53',
                tenantId: 'ec9d7cef-6b13-4354-a789-de58439230f1',
                tenantCode: 'gc62uezsl7y51l1gqy66vhzj0c85yw50yzxie3ek08qcw53vd9',
                systemId: 'a0f79650-b44e-4018-aed6-c2105c2f0d08',
                systemName: 'zenkcoi9anfvp1lupnio',
                channelId: '19a8be96-fe40-4976-9d4d-bd9d3b26d8bd',
                channelParty: 'qxmxk484wq7svqsyyke7f0auiayt7tbyigmnzabfw7c3b5onvmvz9w20xiv3nsk4yqggcf5ma3h3osz9t4ji0mo4ydb5cy1cmziyo5xsmkm0iolmlfzu9u27e6tasxomswuw9d5oghjgplmi2jd0p48svltr967c',
                channelComponent: 'vt3hr5k2xest83i6yzmunjzop65jr1rk7ccxpncqo327rktpqiqo6y2pww9kz31i3u05j4cl5e29ha9hm70pgwxd5nte1ltb3bb69rydg4cb3oy26y8cxczkhq7xpv2gq9emrjx2k466um7tblrivde2f3ho8wcv',
                channelName: '8i131e6366a5ly5h6t9o24l1m9dipxbture1tj93muy8ikvkb6mt86fb5e3b4tr7prr35151sbwjou81gnzqfnorypvaun3k6cuoprcg7lbjuorlw2330cl2h976pj56chx2ppb05vpsibk0gi4ycm1kez6wihco',
                flowId: 'c10bc3f2-cd95-499d-a95d-188526a6815c',
                flowParty: 'z80ztb7wkgyze7pjdwibjne337f1m30je6g3q4ftpb4kaqovcnz8fqglsiole4yagyqus3shmk82925hqbtatb8gj8ktogzddj4ymp51nfx7gjr4zt33u8a4wgurd3ppwivm7hfpfnu6z28a8rqqpt7o9c92ye7n',
                flowComponent: 'mdhanqejmmb1z73b0h0eoxbb6pqegbkyqrapjs2yw5v30q3qe8f1obub1pukaughffednffh1l0j9o08h66rytjeaya603jyvhmu72mtxdhdvu8u06zmrk544h3lfs08rit7twucopbm45wqbcmnmgahbdnpg74u',
                flowInterfaceName: '3jtllo72cuyzjbag2qj4ecloki18eckkyeilk7j0k4gkh0w5z3qwd8xc0zc4hty74rnv0yeha6jrf9h21e9zoldtqbcg42ddyc3k4kbayw8kk5xaxxj9zk318dn5flfw44aj7nqklswof0b1v5fahoh15kofyt5e',
                flowInterfaceNamespace: 'osh1vvc0fo3zmqu2gdnpbk9suet05xd6w7niykcy5z7cp0tgmaqb1v57i0bsvzubfossk9d5vcl868l5w3teubbbbv44nbpb8seotxajglj8j3edi9tz27ehlysseg4s6mthvtgn6im1qol5xnkpmfq73hrov406',
                parameterGroup: '4du37ihuttijke3xca6hckxv5yk9lkolzsnbu8onox4ri9qt9d7n1ee8qlpv015n5x9f1z5l0u8hfocgi0mh2meau1uux17q5u7lim9hgyc3o3ys336d86f1426q51uv7q7tdnkb6dj3aiayacu6ngv6yw1lv7a36ecce8rb95fnrxtvhfeuk98djc3rifavnboxp99lpq0e79ip3hd91rdsliszipy0800dvim35605jgnmqqvfnv7t1lu844z',
                name: '581y1ylso3la6ysmg4q3qjsqcjxbpe7x808tqkjlnar6u39fqerguerarrtx4qdx4drwiajmmymv1jexcryj25kp7xti2jp9s0379s757g3ztc5pd8w7dsg5qadkmusf7s0d7zxkwyk5h6rw6xbd85q579pqzfytidhy15xyvvzybsyi0yrat1rxuusf2h8xduray2r0o2gl18me4i3t6wontsqcf16g3c4q5xg9sbq4vmu6vjmnf92dxes0hdrc3z3afrshno6608wxnjgassijakjoecbnsn57vpbtrwp0681dw5jbvibfg3f8iu9a',
                parameterName: 'a0gsg8tbqhg10p57vvfs2s3wug2b0o1f3irxwfiibb0hjb2u2svyd4vuj1ifugmioqrihv69fykb2823o68bzniy97ti7r5pylyugqex66z68oqp7faqy3hunq8ienv26qtry3pvfltkw7d42zo6fipb27p40313hy8haqsf4h1njez4oteky93teca658x8fi3qd9gwyy1uw54q348c4jbiupr71md53n9qosva6iu9vrrzgsc0k7wjyvxawlodoab5fxblfq7w3r21309nwzpiqszvyxp4xe7vobu7hkg0fz17q2n61h77hlywkwyk',
                parameterValue: 'y0a2lliwgtzgn1rjq1av0zukq034gzf02q8cq1unvfkjg5t6sdu38jx143ckmft5kjciicpl08zun2u4ema01l38uvqpbbowk5guq44rjuegioqc4cu1n1vwmzosufxa817umk08eh2bx3yj9lrrffpsowbhwwxp3hvae8zasxyjk39vlcddattj2lfsnumpprq6q53b4m7w0qhq3kmywzphtgrdadynnsjl159ecrcuyg7healtlx9fws2sf3chjnrb4j9h3fe6b7qa4xe5ggus9g4n68gt75jdrriypvg689i8jt173kv3fg3xrgjstkj1dlkpofwkex1ckv2vfrpjy5x3wjiquxoz0934v0a2jtz1yf9t1n29v57gge9g5vz9gv1u1pe1lv7mbwhx8x96g83mp5rwysprehzbk795ns4absarqv5ifoobx4fiz4qzpkod5spllez4m5bp2qrttyugyjr98fttoyq1qcy98eoxlgazkj3eqj7pb2x9e844eslrv5hlmuys38t33iiqk5azhl3k8ejrrqm33ttx5fqfjicgc35dy11igfu0az6rrxuj4otmfo5m3xtzf2bldllogb19sllzgfb0rl26tmjia6mhgpc1a1c0fw1tc7w9mcdh9lhfzkryzv0orh14wdt164y2cftqgk9alkh5jkvp6ebzyij4dkwwxdwub5k49bfcoje291eoc33dewx5r6dpez9vqlmici8qroaee1ed90an4zw8pfxz39vu8muc30dz5tcvnnujlmtf2xuzbjhezvkk7aeb5ga64pzerrszsnlhit49bket9z6qi1smubesowxrxle2gvf30f9p2iuinell48h0l9v0pzg2nyn95cf4zayis8c5mzzkpwc7mwxvqntskppy1rlznjv13aj5c8hhvk70d27qrnyr2w1ol3e7fc3rjkc9phvh9ob8el1u6nt4iafu9wqhy26se6kisk24zwk9lgcclbe0v6wvwi4n67jz2f109rb9x',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ModuleParameterValue is too large, has a maximum length of 1024');
            });
    });
    

    

    
    
    

    

    

    

    test(`/REST:POST bplus-it-sappi/module`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                id: 'c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53',
                tenantId: 'ec9d7cef-6b13-4354-a789-de58439230f1',
                tenantCode: '0xcrpo6rnote9f2pymmzza3tqpwbj47zznm1evthwdlfo4raep',
                systemId: 'a0f79650-b44e-4018-aed6-c2105c2f0d08',
                systemName: '8t8225pc1t795xf7286d',
                channelId: '19a8be96-fe40-4976-9d4d-bd9d3b26d8bd',
                channelParty: '7k4f74cykt5c1kb9b5pk74jf9zbth820w1sb9nvalgw2gj58t8vkoaz3rx2ib4ts5y6ky1adajhmg01hzceh3cnov09k3qzb9d8zmtttx00vb18bj5t1x2iq6lm48lij6lqmocmfgbbnyqh199cwtz336xpf0wxu',
                channelComponent: '5je6h1325fsmpeht7fjjnupf9d5nfc8mgjfpn951enq43thqoej1r2wjm239647lhigdy3vhkwzg9t5bap7yf5cu1z1b7xc8zdl7kn9mbe9m561weti82vjxcmxzx3amnt0ocdey39kv5gvoztvxljemyzg7qmw3',
                channelName: '1086exj8kn70p1t8wrjt5xuo7jfqnyr2vgfhv8zhnewptwjow6jno0rpaylvg94tuo4n5sti93afcx7lkzjifaegij9tzuajcc2n0ici7m7yccm27vjc7mj462i1sk8ex515pl2ojh5t5vcxjfnnc18te111wirw',
                flowId: 'c10bc3f2-cd95-499d-a95d-188526a6815c',
                flowParty: '4568dzwb32z1zwv3b24dwl1twy6wga3l9qt9uvpizh2x0p8cskyikgixua8qzob7d4meb9e6v1p7vp7g4mzdw1nz2xy1glphtkypa8o2i1t1kcb572b161gpvx45rannyrb88bjdzdrynvoa4lpmz5ulpklysrtu',
                flowComponent: 'd5d1pez7b9q8k5ljf3dtv4gfij1amu7nxbfvzp1mal0alrninuwc3ptk67j0jh40empzk1w1swakwbf5480hzvs70yg24duty6g6gjrvzx8izq0avw21t3vw3ktvqsvw94osfmaf74djsxhzmrc62xdyx1fvl6z7',
                flowInterfaceName: 'ymouoyyt6b87mnxg8v41ud6allhtlo64d7haul06lc7wi1c2h036ms7qvl345bb3sw3pprauwtmoat2dfos8202v6lsxfwbja18cl6qn6kmn4477ajepgy65lrn3a980smlrjkt4xbzyaig2njcd3qr2fiyequoa',
                flowInterfaceNamespace: 'q8qqrj77ovu3l6f1rzz3dg6t5250wjvphxyne2itr15ifzk34s4enbge7ayrftz970brmo20dxyyfddua5yf98hbkzp1njbu06qhuoi713zko0h03joyyp8o96rwic6t7n7p44f03y3hguccp2ibds5sodr0f1pc',
                parameterGroup: 's2om0lc5iulpl22nmbtqp8okachyi8m22pen3xnfajl90bsm3hsjf0pnkhc3y2dyzirxd9bj0p9zj6wf20rqf8wi7ipmqe81ijrinzz2xq1tvllcxlt48ooxj0m9luwrztdyze85w8c8ca7w45ufvr7ievlakn4erb1mexxfd23ytq9u2a2keox0t4hj6y1lyeic2oqn53trsguhjx5mcpb8rp3ioq5scxoohbgillr2j4hx2ppnkackl7o9hq6',
                name: 'wvh9etkz4nsnhdnfpnzrdlvmmzi8uidjow2u2ipo0k2dt8262jiaguua7m085n292dacucewy4ktz96u5vhh2eq0uiy6jgxu9twhwrb0hu7ev250cxi46p6wkd889l0tr1bfloynvdhbh8iav4em41zkml7da7nvgfm852wok3mzrylq8qfedcfuqb7nw20hekiuavzo78jn0qorqv4gjj63vfrt0kzjvkgmmkuok7gm3jt2cldrvyp39rojlgiygyizc44r1jr0kwdgcfe6rqrzr4kpespr15nd7nqo7hvz0a6uo0r494j76y46fmb3',
                parameterName: '6wee7cv9f88gvg9clbylj4fym5w6k0h9fu8zljyecja5bfqzh4dlessh2nfxsln09siqg62ivw0anxe8kyl6ugysockwl8irb0q38x5364s5oeqh589e44v1hv6szx4o03urdff4mws96z40ddr9vp3clfhblcrh6lfiubqkhbiyjeo53766yqwok5n9xmr5y1pmim9x09uequpg8p55zd89wbsrb9ybkzlc19mpss9w8dm9w7x1apkuq4xmzt202qjh8h4qbp223yvnq8hhmgiv34daxp6dxudz71qmufu1l8679rcsc1jtekxpew2h',
                parameterValue: 'nqvrm0iysu57mew9mo39jw818z81c4wamv4hcge4l5ui7n21lou59bqmggvnbus66ebermky8kvva7mlwoy2gvk2iyow3jx68gujxamgre4njo9oxb6a3zgt01xfil379wdpnmfbum2xl331mzoqt28h5jiyqdz70mz8r3g6r55bijqei24fgbmuwi8sj7pazfshwld9runf9edul7bccecj6e1u7h0pm7hve4emyr227ae93xbtn5min1ce9wjaihnoa9yevlrve2qoj77kido7ltlm0hzcbockpm23x3wr1rfjrspoknumifyjesvqn42to4c1jyp359r7wqhkq7m1wdwyfiyrbfp8qy4x2lnc6fq1qhzxa95wtlmterj9d63qi5gqtxhry9a19iphjmwr60lwvgb00e42khjxy4hafqkg6coolad8hmyt7kfqh3xlmaayj33yiadt6168i42jyywtav4875q3lfxvv7sf8uono4ldhw13alyt4lm282ub5rqhlo0xvjguhom02y7b6pfa7rm9e3mdyn2de6hzxcmmit18gcyjuummmxdxqrf7dhd3q2zsf31a5vcdth0z4novg8m8ehg17pl1vld38jkfwsqa7e28eyrz0srbayfn0b9bser60mcqd54xt5eed78ajius54ii5kog7o5esr6ubyot9ihoc8esysoifp3uxopn38svvdcrxc6dw4koprvhjw0rgyvp1fb5mt1z8l9bwxfl15dn0hxfnvdr1cxy9dl037a3maqvqx9l43x2q8hbdfv51a6hneorjdayekcs1z7mza1jiuypjobum6k3opf4h6y4614wl456o7fu04ur1oi1kvfgm86t8r4d1nvamtcw8v4ukiqmvr6vvxfenavxf4mk7rstjsu10im2qflquvzw6xm571vbobqwyz8or59pw8p24nujz5f69p9j8pamu7nzkbkcuu19v64idibgcisazsjgxll14h8i69e6kofh1hhjed7ohyri',
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/modules/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/modules/paginate')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command: Command.OFFSET,
                        value: 0
                    },
                    {
                        command: Command.LIMIT,
                        value: 10
                    }
                ]
            })
            .expect(200)
            .expect({ 
                total   : repository.collectionResponse.length, 
                count   : repository.collectionResponse.length, 
                rows    : repository.collectionResponse.slice(0, 10)
            });
    });

    test(`/REST:GET bplus-it-sappi/module - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '00000000-0000-0000-0000-000000000000'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/module`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53'));
    });

    test(`/REST:GET bplus-it-sappi/module/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/module/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/module/c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53'));
    });

    test(`/REST:GET bplus-it-sappi/modules`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/modules')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/module - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                
                id: '21bb7cc4-643e-4eee-b5bd-74efc3484d9c',
                tenantId: '854c01e6-ca8f-4915-951a-7cd9ce490965',
                tenantCode: 'c303tv5idzkqp0u292rz3josh5s5xop6scodyafhcwu1y7hfeo',
                systemId: '9cc06f17-5c37-4529-be5e-6d3e9e958ff5',
                systemName: 'lg3i3lp3k4pw3u9cquoq',
                channelId: '0ae48a8b-a2e9-4b22-8391-15926e91d505',
                channelParty: 'ubsz4lmdz4ij3rmbb17kqdkoc2g36ima73lzwd3asbn9j79wetw2ztab0quu7j6ld8p4z3ag7gmms3ga27rws7gvigkgr623tcbraed0rc0mg5yy0nrhapk3nwwobx95acc589ux69ltageqg0qf3tcs0yg63zpz',
                channelComponent: 'y5rfnuupzzf9bvwtua6gdphnsv7haseq7gu5u2awr7szroywhi1eja91j4u9qe46mijp2j0lzxy1yaog43i5q8fmqh3xq611z28n7h8whzqyeureunpa39ggrv0s5ahirm9n5kxj5hi766zjs831ghwvhepe46of',
                channelName: '9dvvjr7sthm655ytecbp24zmwisq1sc63nuuxpao6k3a466fdx9e14nbz1ufw8omjey45jqcbbt3gxzd1gwy7waonl23qw13ebpscs2vom0p7q8xdo7tt69os6boj9ss5p1pti5hklbcy69kvby9fckkkovmxh6k',
                flowId: '46a7e2e0-bce4-4d03-81d5-d6d7f95a17e2',
                flowParty: 'sw05pkpvw3gcpcg04f9kr4mhhbtg8yapxz7zv5lkxulbt1a90hww5146ew9so499nmvo7jfbppascqpu9ob0wnm9uy5einorhmdz28p6fypv8g5k3ba4arnugjekms9w9t1lgtee8wao2vms6w5ym3sgi3mvsvux',
                flowComponent: 'kwlg213tw1cog8b5pu37hai0t9swn6n4umkee7k2ywpkmn3wzyt671w08t2iaa0mhfrz4tmwfxuc21k2sd5lp9rw216ir7sqhzis126v6sjrsxt3wz0kt5f7yghq5jivyxkim6zs14rcy4zkmmq0sn7qj0jtq0k1',
                flowInterfaceName: 'kb1h5fvllp74kb18ato14sucxhynan4blj0omy1lnjv0jhjdfkfrmkklfituasy4jaf39ol3ege9umay9xeufwfxumdicddc78xjgklrrnlv3g0n8005wvq7f6udcbgvu2l9xmnq7a5l7psx5sm4s7wrqbwfc752',
                flowInterfaceNamespace: 'n8dpyv975x6spl23jt503f7162nickctew7m17gz39kxp9h3tjutxbvtkxvkxhakaradqkbu9xknow2hpzu2bifk9socel08nu3j1d05cjge87nbxdum03y8g2xcw8wtjpxwrf60pf7m6mjnr2rop3fvcydio7dw',
                parameterGroup: '2x4rqeue2jor9ewc9iu690and16t9lrzjgor205o4w5nlw10lchi2n5xenpi7r0724891fvbonk0b8ada95ez4fgndf5fmx29adh5i30pea9ch2om9vxng8ehdg7jk551znme14b1sz4vi96vux2gvgtgcxu3a7jrv1bf05qyvec7ucuyrdmr8dzri5b4i8q7zop2iluwchi91hiefmevgtjgmwpu2hpe6bcrgtsi4u14s4k7pe89k1rkl243aj',
                name: 'a9dokuwkgz0wqmbikk4crdc2ps5153sw5dgy46t1efct7jng14euhgna5kgjy924a5jcnns6gd8jmftzalafvu3u4ea1s9dexhtxkvyvxuzguzaa5gzu4ekl29nwkgnivnwwkggrn79t293g36nvja4o7p55d1ogsqymlnjsnfby05yy6ilpy98cn7gtelpxyfbnx4scbi5b8x040npbiya6ia7cp99velx45hzv3g86zgqpw1xljd9igkgszzd47vz8wb88p9jqxvri5cqt07flyh0pp29g5i726g871tjrwn2pqpgeg5jl3w7j3yky',
                parameterName: 'xf43ego3m8i8c2okmpzo2h8helgnt7sacnicsoxbpbvcm7mi2t0ucztvue0sn7q6zkdmbqf8dt2dozfy6x6y2zebqkm2e0vx14eorxtd53z7w3fuv8cky626ia7wqvmp92nxc9bbrqtj5egxkrtxfx3nc9n3ncaa6ao35x8rmlwadieja1squ181pjth994ay9wxnpu84bi02r0fxby8yaz6prwjhrihg1z3s2c1ubczqssiw4wqz5g4i1ln7qtilzgy3tt359vlu304u0yvp7itk5vhqkrh5u37zaxs0psjxl3uyjo8dsz2us0p4ufv',
                parameterValue: 't3o6jq3sdvc8uzml12kybcrw2svay7fgmz4paprar0o8ea8wcnfmz32ejjhxqgbhyz3gkoatt3kbuixriog8m2ep1l2gpgdbfcmq5otsw3qd2v9jjypixmengvf5cl1js4q9sznds7yyxmddav92i5q6j394o7p7q86jbhkkx9ae4t3bh0cypzijq6n7mg9d46anv726h7tfctnkvuff13clzem6iquhwowgubszqbarms9q3j0kjh0j1lh1zg4ls4fu8nnjfxxqbsvbyvty9m5zpomqx8fvckdpcxnbd77k1whujngqx2006ngknm42zrh5xz3togin83wmbffxlva0krad6zs35mn8zaizz4vu1tqkkrke3v7h0hcchixrm0ptiqthgr9agnqychbscrj2lmoh5wyysjafqfn7zolf0z50dqpf79j2srbiwcwshd66drr6nnodrgc7zscexsqi55p998cj4z9i348mw6vb3veqox3lo2yyf7mq9do7tkte075nizoiul7lrxtey8bumlwg8t4o004k2uy7r4tkf2cwciuvpbz4t2ys87d8yl1ajs2fbjq7qajgb3eiyqc5g27kjdj9um1v0s8ro77b3ny38kb1hiwbb7f32nfewli3uf0pfriugj60utpucp1bdp89j7wqem776yw94tnmw4cocnpm9ctssave12brnp06uxryzqdblu8rx6snqxvwtftcc4l4xvpfxkb6mir51wt1qzp11290h2gu0x0ixx08i3cizgl8udsr2o0u8vnmw2cafbrjme6iamrjezkz074r355tajubsblxis3f5b63ypjvojb2vmzbwyvp2g89458f00rgs97k0cqu7cdgdpqqbtwtcb3tc6cg0lwoibt08unareynr42edm09dmd27gg9k7xfcjhcu0gtmr2meqz3lel6r1f3ksvbouzvi6c52o3pze78qu9axwdhx931jxzu646oxhorgwlxwnuoq3pu7fiqsp44b6511z85',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/module`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/module')
            .set('Accept', 'application/json')
            .send({
                
                id: 'c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53',
                tenantId: 'ec9d7cef-6b13-4354-a789-de58439230f1',
                tenantCode: '5bnyqi9vgln01ekfvijvylth7gvpwhrk1kplmhcfduc26iyfxi',
                systemId: 'a0f79650-b44e-4018-aed6-c2105c2f0d08',
                systemName: '7bu14exup4kmxdz0hle9',
                channelId: '19a8be96-fe40-4976-9d4d-bd9d3b26d8bd',
                channelParty: 'sk2hn2v0vyzln1ljv7ylxleqd4fepttxwgnocv9yaxu1ma5n65d8yq0udc6jt7bu24e1xmvj7qgos2lw61hqrxm6fpwddulsooplyqkg2zttyqrqrbtzr5uow8yubby3lrhspc06z9h1ucgufxomujwkwaew5ubn',
                channelComponent: 'o88d9z4ajcig6f7fzalruqp23ssxsokz4vi8719t9gptcfwf6sorv6e8zlu1fnq6vkac7ox5vyf8qnapqmt8vcsrul1h9gufdl417dko5og5kfvngctk8vfl00opurvrz5dhragxp5c4hhfdfp5onanb7tjiqnza',
                channelName: 'p0jif0chgycrxjqsh0dlju40q0s9vn68xc7n4yvr2ekqc61qjpzkm0upgh2ya8veluvakj1iuiajs5p83qwkt5hoa15t63mt3ny2q0jduwsu5hb2ivas3db4ou5zgnw0r6x50mf51cpzorf099l5flxlq9lzxi2p',
                flowId: 'c10bc3f2-cd95-499d-a95d-188526a6815c',
                flowParty: 'jlbkrbkxbww6z23bqyax7d57l9e0r049rurhvp9t6ynyype4ls2om2u00dsq57bh334wkkxqow6lipggypxh9124fvjj4u4fxc7cwveqx397wefol7qnr618frbmmz3im19ndn2kvnmzxpiq1vyyvy7s554d4a0l',
                flowComponent: 'x5d1a077r75iaxqaluer49e6uobe5jzdmrtb5b1b71gylszpxzuwmzj83ntka7tr05aoi0rak0jqgtgubk9xbxo2wxsbt18y2m4uetkr22bsx5xxjmbgx4akdr4q1l643s1qyqamjym5id9cnk6ua6jvaxjoyeh9',
                flowInterfaceName: 'myi2nw5f1msoqa30azfv2b5h5828ie3du49vgrkxv7jbd5xnzcqq2orgir87ts987odrnl477foj1sd910d15luftwe6hb0s55if6yu2m9v62565o4g4s1s46s5dyf7wgaytj0eywwjpv0fo5c5s96ao301dpn88',
                flowInterfaceNamespace: 'styyjo50k5rbd8jlk50md218xgewdlcmxz3tux2gxxkpgetxxe0fjbdt1w8i8qxjwj6tlqxeljlv0z6ntn2bvxib9ctx75yogtrueh7lxfoome68pstw75pkpzey4medn8nocivy3oxlhg4ccxb07p7n4jp5s4qf',
                parameterGroup: 'lpk94mutr6jik7dqbb9mcq1t1kpf3t9dfc03vlphai4ier3l4gyjsonlt04ve29mjwwhd92izxl1gte8jda1g1pcs48ua5o7hoaz40hj6aea2qvugw64ynv4fxomjblqirvz3ambgr3q1slb0bsdlhacrhpof0smtuwg49xv7p47wowul5mss505sypimcsw7q7cujh8ve7rynhdyu8cc6n9q3hcgc42n19fu406o3c4y55jcah7r09vn6g5s8u',
                name: '3u82y5o2iphtc17yvg67hv85qa1wclskfm5ztvpwm4wmtw2z0m9yblzwffgoh0ughld9hju0d6fsi3hvwbekovscdvlsc527vfhdybd4z8ksn8d09w4iqngq289gu7bbzabdyc0dtlp6um47ivd76jc0prmz1jpe4sgm4i4e9h3lpe7b6ohz9u3co3o3kmi2gezzxm3njkujpu5pam4qpo1fax0c96v0wlfp4zwvdxdmuw597okdag5ogyd6hxzeasxoqlda5x1uti0r16gi7nvfbemnfmu3dagj8j6vkqbqz9erhlibhndgq9jh56xu',
                parameterName: 'dpcrm1m6k3fmp0djrek0adggoblj7m81a1oi14zccz7gon4lrlkc3jnzml4jcdelpaj0b069ccd3johqep8997qbzs9hhqhojdrtaek0btteh3iocgrsh5cbfmxzcj2uy2a1p6gvmxnredpeydpnopv96w8sfar2gcaigubm775sv6nhghe8namfeyja6yf3ug2ark3a334rxjcq1dxwlawxln6axj16ffrcme8azka70klu2exoktjt5d8kj58a28lm62kg4wq0gauncheo4cwp1kppz71q7zdcooxh0uihm89tjvk6dh7dqe0el6gt',
                parameterValue: 'y5gx1jeyc1ww6k60u93qefrkx1u7kptix23m481kki4vdwwtq1ywnuptbt2cy7y34bqshdlc76ftb6fn1z4b1fmljwrm0366o12wka37zz6iwl3hq7ogtze3r0d095wc4exgkxyfpqerjfqt7ewpxo34wf41rmrhuib1l2fhccz3lfoafx3gzxtriq0egpk8x7rjk4tb66epp0gq25ft6uo9681upw36rdbfxu4zzs3nbtsxfwu8t8f5bxh574xsshhsg7ztwjts17b9xemxp9r6jr0v3fn79k4434kww5c861exja9u2bzaepb2ic47uugybg0jk20dyxd3cnhts3s0zq6wtjci2drxijdw497vdt6ivg4ke10qenhguui1uw8zjvkbvnk46g6r45x99lms9cavkok7lnohjuqrzya6jg5a6jg02xkonvjho1dno3auqpt8k0wdzweczlct0y47mzjbyw43pwr67q0ur5v9syism9hkten9bw7qc4hrs7ss8bcsia586jl32heh0ov2hph08zwsy8r60cr1h8d89p9b87jc1cc83mflo75onyjfd8g4gxi28a2lm48rehn9n45cx3xnv4iwagx2hhnfexbkn8ra2s5dlxjlf3e2g6osmm29tnuyzm8nbyc3riyzc8g597jl44ku366p1eovolg6md5zm2v2isqstyjci1em5x22smdtcofd9g3nh8uqtab2pgnc64c90q1mise2mqhvgvxqi45kccun5c8akin6ozf079qdw4ih9wcgjvei268cxp4i5ardhpx8v6kytjinfhxd474oamjj2s195fil34yltlrat6e34g5uv6jl344dxw5p3ce2negt7vbht1c7meapjumvraq90qtumtfd3zv374ip7rlinmew8y090bg2diy2as0xv3uvmsb4c4q5c5m7b7b9nlfxrl46z83jeop4n5ngrz6r4qdkollpc30lrczjoft8kts72vpl0i9gumeqx6h3xq04qcmp',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53'));
    });

    test(`/REST:DELETE bplus-it-sappi/module/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/module/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/module/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/module/c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateModule - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateModuleInput!)
                    {
                        bplusItSappiCreateModule (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
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

    test(`/GraphQL bplusItSappiCreateModule`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateModuleInput!)
                    {
                        bplusItSappiCreateModule (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '64358e8d-c10a-452e-8497-8a4f0e409026',
                        tenantId: 'ec9d7cef-6b13-4354-a789-de58439230f1',
                        tenantCode: '1908tnf5ub6o7ki21ojtdv1npuakv5zstssg60fpsz37ohogng',
                        systemId: 'a0f79650-b44e-4018-aed6-c2105c2f0d08',
                        systemName: 'pbqqci3qlrxhc60vlb6l',
                        channelId: '19a8be96-fe40-4976-9d4d-bd9d3b26d8bd',
                        channelParty: 'xmsuwgz32kji96vk4qhkncsznros9ymidwubk9tra5en4mmsfz7vhnh1j4kovmitu53ke77oco1nj3sectvvfhr4wm9l51lgnuxlqv0d0bmsqtekgnbwqzcu294v26t1cqqpx7slp0gj4x76vfzw0taotyuh5tfb',
                        channelComponent: 'uka5yxi961txfrdupx6m4e8oc7qm9d9uydje3mf7lejr572spsdm70q66hqs402cwabx4na7idcgknacj33frgqknm95ddyd8beepbd76jf75aux1ac9rhq8u9y23dtd6g49ivvjhh6ka4xcdgkkqxbdg2irs1ye',
                        channelName: 'yx7unf8l17wm29istw1s80zfxzgmd06v1xhlxee11qms0bwx1wxk69dk93wsj3oypfzi40okeajulmy1ud5vcon16571yg9t03n2mcjxymhxvuuqv9a4z358fs19sxcdlor75hyl9ft96v3g4a1whrs8z4f9kpfk',
                        flowId: 'c10bc3f2-cd95-499d-a95d-188526a6815c',
                        flowParty: '80p1v8ut3fsu34hxj5zquba2b4zebhko05orm23len77wjrh9p7px8cev4hst1toadic5b9t7iopl4y9w34ez9vul8dakg1b6fef9vmwtlspjyqkthqs7g6vdu9p3146iknuz37tpx2x3v5w0j0yzxbnrgqqm896',
                        flowComponent: '5kfego5f8jrkah2ygnd7k4xyyjdw3mkzbvds798ktpday1n1efixozsfxxkyxifxbnc1wlm4dt7zs2o3nlacv4trjcwrpbk2eh8u5sakeomv3hecuemt91ubdfyru6xrsp6xbx6rr0a8bfvq4jsdgetys8ccbbl8',
                        flowInterfaceName: 'kcm2uf08ab98sql3gqu0typu5qnbbl9nlqrp2vpe8njbxtannd6hu3j3bhwst6oc9seruyqq4kkwt34it0f80nptvoxm3r3wnu6npppt56hifrk6lu0xfia8b4z3h07ox8e7w2zwig5ltlkquk6a0qxdxybybnuw',
                        flowInterfaceNamespace: 'g55prf70uugoht7wbbhh7gynuagsit5s01v8cxbia0clx4osru3ys6je7luozdemgyzkql13tef5od0iuyl0sjorsxpklxrr7jevc1ku25fxutf0inarvfjl8bi0ynpbux65y4i2zwle0itr9cipi286pfn79nek',
                        parameterGroup: 'hzdfa69qnt9baf5q8ynn6h3l143q4rmav1ny1bszp1mras196kdf606ab9jtaqn1rpt1xe419istj1q4qs8kb3wdeiuwfte66h1dijb03ljeap1gqtg0pth15hydbz880b15yb96d5h8youe3p0cmnlh58gd6sl6nahbwhl5xxvptp2pu52subc1qc9jwpyu6bp26m6kfv1xi3scr5zz1xbpoa3t2twqiwzppsachag1lozgvr9y247fh7y5sek',
                        name: 'xoi2w9xnxd5l6jl1rf71op6mgiwbj7r93i7k39jdhlpsnvlmjkvvvhdm4ga06js1ehhxsxzpoba60u1my1tk6jhea5n0f4va45tut3h37qaw5yh14gg4rtprpz6jxzuhs0wn9nzbo8p6jzkmfjorsc46cs7afdwzkx85rgidmlk8obtyqjn58ijtflmjfe7ynm12xyu9fz03hlnqn17dfq2w5iszydn7u65g8ymsrmralahp1n1rcwxiwhat1ebqv6cosp3lo9p6pddg03vszd5i6a7yj7tsl39q1mldckduiuryjnzj8cnzzt2cmdn9',
                        parameterName: 'd6goyz7fbh4zp6kmbf90sw7rgfg8nvk5hydtb9xz4p6lqdzfb9suo54axbjp5jto0zyxzamcbjnzx76xsun1v31r632reihk0tjew7wovxtda2ed8b8qr16w3i8p92kupqmlz40yo9y8da17fregz93gdo621xd0h6b9u91tcf8mti8aomr2bdtp4e71u6gt246p52j2kp3w3epx5uozfs8gdyexf081cgw062cghb1c2cz499pu5dqch3m3gjrd895wg24v94colkl9w7brn99mg5mhlg43ljrg47k5oubd3ms4gfg3pnf2lhmew8m6',
                        parameterValue: 'mv220l2yrh6qkdjt38ddevyjd3ivrekbjiidgmjm4abvq5tjhi4c49su6gfvtzdbgaahez0eb6r0jn4jrcmd27msisgdo9hisfayl8rvblnqfcaxigpnbi5k6joic369igp69fqa8pctlpehccilonx38481fcw2ywy4ry1hbfsz8y8ai2nv43k78bm5cocgfya7uivn21n3xux4fv6r13ve56kuztuxw67wh3em9lceyjmttqq2ftsl5sl0i77oh1szbzto6fr0fztnaajawime5r7y1l7rb9al8uuik72y6wub16ax7tchslsj3hhqe4hvlsq0wgjtwhnzbt5rocgkrjk52zoxr0wvjv9dirsu60olgfd2qhm4tyl5e1gzcuadaucgsyl0d6rroypros73u4vgi1i0tu838vys8aivx9g41nitqt6yk4vdntp5wmexsh2mdpwg4ot5byyvi1m1uot64el8mt53owciwoizcyt8u96s4g5vk9zq6nvvar0oz55vavry6wmle9c1c9liv3txsmoc54njx4dx6iafx4disgj2atx7oowp35zu2t7hs0wcf4kktgrgez3v9g18wour64tc81xrdbsj45kqqfhjhgtxazb7eyw006oaq48tfu96oo9meznocjp1qrble2tungf94t82n50xb1zkakqsvzs562ewrqyw0n26omkur93g3bwdea01vya24ofd5npbbaemcnlue92xz97l0n37p7hvqlenacmt6fpis3gg5dagafup9x5z0bnyke7y0zfktzakgv72y4aen65c9u8u26o54o5n2zd1mkgvi8xcq0865bi3opoh34b4ayai29nqyplet3n3hs4cn0hc8z0ka03dc8oj0090smljx79hjciz6suiz86hryutlzps402cx6dgauwus6f79cnox42fbdvckwyd3dwi3te4sa6edoovkr4ci7jmbgn1autcs6jy6mxcryrlcf9uthk3rpao4g0bgngy35zhqnhc',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateModule).toHaveProperty('id', '64358e8d-c10a-452e-8497-8a4f0e409026');
            });
    });

    test(`/GraphQL bplusItSappiPaginateModules`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateModules (query:$query constraint:$constraint)
                        {   
                            total
                            count
                            rows
                        }
                    }
                `,
                variables: {
                    query: [
                        {
                            "command": "OFFSET",
                            "value": 0
                        },
                        {
                            "command": "LIMIT",
                            "value": 10
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiPaginateModules.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateModules.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateModules.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindModule - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindModule (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : '00000000-0000-0000-0000-000000000000'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiFindModule`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindModule (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : 'c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModule.id).toStrictEqual('c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53');
            });
    });

    test(`/GraphQL bplusItSappiFindModuleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindModuleById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '00000000-0000-0000-0000-000000000000'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiFindModuleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindModuleById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindModuleById.id).toStrictEqual('c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53');
            });
    });

    test(`/GraphQL bplusItSappiGetModules`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetModules (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetModules.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateModule - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateModuleInput!)
                    {
                        bplusItSappiUpdateModule (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '71a41576-dfc2-4c39-bdc9-912f00c6d952',
                        tenantId: 'f82a310f-58d9-46c7-967f-c5d32b193597',
                        tenantCode: 'lprjmxtpuzmqijb3x08e7ge42lfp3pvmu2wgzzhs0nhls6ok6w',
                        systemId: '15b7bb5d-d768-4fd8-8026-607d1955c9f3',
                        systemName: 'c4f736j2790qipzvmcwz',
                        channelId: 'd15dc543-b7a3-414a-b6e6-93819e0847b4',
                        channelParty: 'dhzra675jm7q9maj0yhmqztycz6s4yh8drx5dawgxl5n0aaegkcm37dfa70ptlfcvdohvethhu5461qg0t62bix7lf8yvbsr87upz7hm4e6y97zqmgojqykrjf6jc48b40vai3qknntu0jwyikn4np8ipms6am48',
                        channelComponent: 'jn7kfzax2oj5vqxtjhcwmmsek2jarjqv3w4eclqn43cgcdizqtfzmikproq2ajfhl6oxy1c4wdwo5aefn2kbwdin1wzqi6vbb3pr0xqbf7vft3n5cw85m6d3y8kk80mob1z6dpn3bod95ik1ebuje6xdskiukjmz',
                        channelName: 'jokz82kx7z60m8keepps3am2f3dnb1po8v66g0i8pl1t40jqayszwy35y9l9n2zj7nt4pj976iza3ldkdf1aonda50wkic5ydm4fdgxp77kixdr6nq5s97neebtc6tmt3nobz4od3zo3e1f0vm0erbu552xdrnry',
                        flowId: 'dc48d666-2f34-43c4-8c32-db42fa86d48e',
                        flowParty: 'iifxrcpl18l8ydzir2kq2b5tgxfwse8cow7t6x2ma4fhntcqjyyk5z84twd0lgu8t5dbw01g1524wmqhlummga8oyq4ozz7ck2gcxzgukkkhyej2w9sxr7eyerzlo4djw6gcs1ttcsxd6a5uqq8zbci0ncxiyayj',
                        flowComponent: 'ce6f4q57l6uex84u35nqge2ofdovcy4b7siwz20bdjtrygzdtkbx6utidbs042tq3gjc0pvql5vf3dsmjcfw49q2dvsks5uc4arcq1euth8v9da9holnqbp14qweneuhavgs6vhic80nuq2ha73821laf4qxf0d4',
                        flowInterfaceName: 're7nx982fv01jrsfw03ny2pfrwh5oavfwlwkjszhvxzi7986nxph55x967qrkxfw742caq43xms32m1dohqv76cjqae4lv6rqyhss0la448gtmgt5v4mzh1a2klox2btih2sicen1pgifiqqhwqllenozq7ryvbk',
                        flowInterfaceNamespace: 'o0cxs1r6hf8tahkb6j8j9s759aft7oaxe71gr3mikv8tirs9tn4hurqmh7mmzsccetty2aeb4ek1jgnhlsrydeb1bemcli39iuz9ypi2p9n24tj0l89l2rteibz6v07zvxu3c3lsk1zt1lqwojxczlmz4i14ba2r',
                        parameterGroup: 'tn9gzuqyu7woy3rdfoc9mw5xinpmj1oz3us7l8fp3r7ujhz1of0nmvs30ffut92bdp2fi9v1e7yqbvrqhh8879uinh9sn4p3ashg9ug215goop7qfnjokg46mxagtrpnb6x8r0435h0lfjz2j65b4kmkvqtavmgu720mybkj51v0g05ig8zrnhkckcg927ykqowddckiwi4sip7w75fnhim3brldjpq9oba30x43dtk8yvpqwd114t2hnzdmnx2',
                        name: 'q4fo11yqzmhj735pc16afi2i4u36ut1k2pij7agww39mzn5j4wjxp72zopk2en7aaj54r6ia83jfnbyqf38yufwp23cj7bar4lwxg63t947igpju8nnv5mxcnzvwoe88k8swesewosdni03yuuew1tz6hfnq48pt7zmf1x8ntvnppqr2dr8jpnoi4frzlu0xehnt6asm3l2kzuctakerxl61ymyey1zz0rpai2deaxttfoyhtforigdkt8r5ve1rcmc6f44x0k5zpmay3yww8cau66q5rxwz07j3jqthq5dqgy43uhb74dwd984od06o',
                        parameterName: 'ef8f86wrxgrep159hmqe5d3jp2ryukhw6ekagbcjtpxayvm4hk7witf897dneqwsh301rfhzip5a5vahctzm6bpm9hq0aj0xz5obntvdt5ajo9bchr5cs6frt0rmb2rjzrorfm6fvtjpvgm0bq0b1m3tw0sbkbad5zmfi63o6n25jr3bwd9hn6xmkuhlwaif53cikzzafdc77uy1s4j7b9d6ky6oouuqf4cc9nzjordcj8yl6vkyebyjhy8579j39oz8jf28k8w5x1j3m92bnfxiv3wodf8klrg6tv9ldgp7cx6jglsph7echujxvyps',
                        parameterValue: 'yqapwrnslj370y935ot981ymh44bzirvoxauct8cmfaz1j1p74h1m7bck0c11dygu5hczekiryink7ifijnx1qov8y9hkhbds6hi9d840isdy96c7eh8urakyi9wd3tm5znqeu3lvf3azhdnqehda2fnmml2h06h4p85aodeg7553upms6pz6tq9yo02h858953d7amlgespnc0qt0o7wwxhqld7k2c0vt958tcehidig8wafsxl19siwd7z651yauvfgh4dyb3zw9jzzztv6bp7gqr0l47ovkw3gib99eowugk6qz4jnpoxtoaxynytz50cd8kdaba0efvdjvizojbdjv8r6cekx2vv1n9q0hcq00807ngti2mxw1vt4l1ijo6h585j9sbk9tos6e5k8hxvy9lykkt8h7ue12yujuvboazz7ooh28jxios9682zua9jwojan25lj9z2hs4x2xx7nt1sr9pzybx8x21j52p0xqjef4dpl79x23ebggz2l1nb17xn945yqsh3c85t1jna3ytr5miz2b98icmf0lnutu2gp2io2tnj0ppydi6ecmqk4a32ujinsklalhdc0el8fq15g4hxq0kwrvcr8qw5pso1rfsffiy683nlhodkg5t836azkgf34zny40ubq7wmsvsumowqzokis2qefpwlr885kdlbnxzlysetviyu65o0clrdri6d6dmr02jdah2mdq7tmolavusv4d7lcdsk06yfc8qyp0qfg1f7qbs8emlxri1ps8h94h7yeahvozer2iz37p826fbng30ods7gxpm8l3zjt7oe4vbioicx00x1a56kbw2ij5otk3xy0nym5pnbqi22k7uuilk5zpio55qu6pm4t15lhm126keiys274n62ip36tbs2f19lxnq973dnrwhslcaoeqwf5s290599soqbbnc8sy5f6oirotxfsoxx877riioav0mmxruwgjjlgtvvb7inpn45t1ii32omb70hafhtur7we9qy',
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

    test(`/GraphQL bplusItSappiUpdateModule`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateModuleInput!)
                    {
                        bplusItSappiUpdateModule (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53',
                        tenantId: 'ec9d7cef-6b13-4354-a789-de58439230f1',
                        tenantCode: '4bx9r71h0qi8ofgc482u7zkaxkp889uq6g2g19t66jyff39wzv',
                        systemId: 'a0f79650-b44e-4018-aed6-c2105c2f0d08',
                        systemName: 'ta6n0tjl5dxl5m8ztinc',
                        channelId: '19a8be96-fe40-4976-9d4d-bd9d3b26d8bd',
                        channelParty: 'mbejvngavrbvz48kd30pob7x9p90x8jqqwsmkqa6tex6r554mog0rmsj6skwp5x1invusnynqubwl55y4jsgnbc1365yz8sm09pvqkdukq0hdtoyq10tlcedzetbbu6wq6xwvvdt6wwmyxlxsrla31bxg7wgsfqg',
                        channelComponent: '2apcjorwtvu6o3or047wp4obvef3h4p7n7lqz1lcumdpu3h6c5hgf4tl59to8dwhajpe62d4efx5e1y9caf3tnxv59n5dp5ulik29ila0utf6qngsgb2n3tpyuzf8vh7rjp863qwzzkoywhpfkxss8sfh4zgqlgv',
                        channelName: '1xbe1qtqfyxriifd23sf8gqs57cqdx5elc2dyjbs6k9j96aouewqjzqgdrlj02gmwbpo93mfms1kow71lotmy8toot4rkgsu5z3j63krbqtm00xonyss8k9roit5tc69igabkpicgckvmhyzn7s0cbzdh8y3zd3d',
                        flowId: 'c10bc3f2-cd95-499d-a95d-188526a6815c',
                        flowParty: 'frgteedyf3kmyomzbzds6uoqho2hohjvv7hjxehwvclhe4dqqzc5jkkmsanc4ut1ljmnzmikdqrqvva1wzww7youesmhmqvduz4cnmwd3jpri8lkjm0dlizt2d9d9yqombtkf5us4w56uu3yycm3f6uc4apxqsjh',
                        flowComponent: '674lu7po7x648ivobilzmgrnzflp3shmdnxkqzftw02vyvoqmqlki959m1p9bdv4loave33inpt4tbl04wmnrsn8l39h52x7h01s74bnijaaawj2cezdib77iu8x1pt6ef2s11gi1oi0prxa01dsdq2loa1diytl',
                        flowInterfaceName: 'louhp1mb12bqh5am4r9v9h63n8q3irbjgbuuem9eqz11khdy8qh0jf6nezmku4irb13wumsci9qre4gmdrzxcemlv6eytuw157ppt7eyjhccvswcljho9wtze0zcqtzo0llod0qll1x2sy2m2931awrkexbw49o0',
                        flowInterfaceNamespace: 'hj345oeep8o19cdk0o9ywbu8vgq87pw8fqxlvbamdufzwma2tvcfc8vllp3exu0ffqn4gr27l29oznkujln3fy5nrlyz8ocyvfzm0eog4o4gnkynp9oh1fyx1i369zirgwzv3gfbhxo35h9myelgl9afzxbsucid',
                        parameterGroup: 'du2bi5ehnpexh58gzkhrerna7c4dpwu7ouk9j2mjl7jr5ljaa353z1ht00ihj9dj1ytwdkkiangf9v9jcgvyk5xny6bkx69x0z3akn7istbgqpo27z0vyon87lx95guznmjywibkm9gy5zey2tv0qabl80nssqrchiucwfh635wcfrd3f4dal7cc8oflq3smfr80jqju9kga4plbtgji2jexyy6z2od5rheof181voql12djh0lobynf8t45r43',
                        name: 'pxhfz4pzr9518hq99x1w27oo3wvn39tkbaah4zne7qbsf7gg1fawoc05uuihvhu0lr1wmqtsp42tecaf8r85nd77tmgb92fqil4we5kblecoietkrbzumdt4jlhwb0frdjw3qo2heglkk7m5liezdaub72ahoa8iv91ky0stms3fry526v0y4xtyp7n49ehoi7j3hnopj7w2wz94lhkfw29sq27ivt5a7az1lc2iw0n7jle7t3f5t2qimhdcmbfr99xk6jhu00cru3yvvufrfmg8krp8jhu6edxeg6lyzzisn2qm9v2gz155mfktem3k',
                        parameterName: '1q0exf2o5nvctadtuci9k8ybsuahsfo03esr9eqgtbeo7cd5qohs08gvbxtnybm0mrvuayb757zym8azew1yypuwdn9gmf29afmdzm1qhmh04jm76hakbu0dyc6tqtyo1o6mioharkwrq9sa9otkbyw2m09m9w3tcd6ntj3rhkebj61ujftcpx9mhvbn7h94kd8bpuugneqe112zigb9e26cvkomvjkyd7dqpewnpurdppe0c9awv4y5gglwol2tjokh370c8hw3lv1gqtdbunc5duebo2c09tk2ferk8rkt0vqt5q8g0e0u6vgabmz2',
                        parameterValue: '9x2nj6ubsj51jyr4z3brq92tmk75ivfpr7sr0w9cnwa6dkglcr0r1tbr2rohrwjzz7h7btwt3d5mxxozx2te9w2u3c4peedtd1j17ad9ze11r3wi9vbip8ey68rkyy1khrstd9jmqkj7xwnv34erb7nn8qph5ajkwrfzgdc28stautq65n74bc54w8yncen929qt252bxbu41i360atlq8uknu1fcpi2s2kr1qfbvrv8unk8uf4heu9aszflcwba0w11789qq08c5kdv8ftfevik7ggru17srw7jtcsri5m75hl7i7zvb9wcxtujqfthwldrzfbt5btizukuxmy9aseelc5lpwxer2nbs4cqmb23cvv9pz0hs89zcvc9ugjqftpnltmm1yyaxi5hm13h271k86anutpw1r306t22yj1nwawgmedxl6z9cledk1qjmqsar6xfra44r3wj45fjkq5l7lix9qxw9l8c9yggcstpknuuq0zogftmrguxl3o0llnzzbrmg1ebnd8sqpihvjk3g1nq4l2bdazvk3tx2otfldjed1jmdx6i5vqooba5myqx34j95macl3d7v20em2a6his128kuidnowaksb4cb1ebkoh3v2njngyumig5xnflr87ucw6il6atkalfye0xaebw38xskdkyd0rs82gysmr7alrmgv8o8jq5sfvpm244b6ob2mm5j1nw9cf12yygpk2su8fplrbl2jf8d7rizc7i5pw4t73tyyafswpr7to29ixctdybmkmo6j3ktat3oe6036o4p3z042dbhwdmj5im7kibato7dg5dy2rloytqgdzpg1aqi6ab1enspy35bap0fd78u7w6wsdok9kccfokblqi3sfd5cjft72vdyzbpnsit2ksprdkl32ss9iemhb2ry1a6k4mm8lqc1du1tr0xh7m0t3n5thh0jsjaopszrusd88cj7ahmct6breijb6m5lx32336v7xodgao230b9qdtt7g8y68samx2z',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateModule.id).toStrictEqual('c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53');
            });
    });

    test(`/GraphQL bplusItSappiDeleteModuleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteModuleById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '00000000-0000-0000-0000-000000000000'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiDeleteModuleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteModuleById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            parameterGroup
                            name
                            parameterName
                            parameterValue
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteModuleById.id).toStrictEqual('c8ec6789-ae6b-4acd-b3ae-3d48cfd8ce53');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});