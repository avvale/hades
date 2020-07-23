import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IFlowRepository } from '@hades/bplus-it-sappi/flow/domain/flow.repository';
import { MockFlowRepository } from '@hades/bplus-it-sappi/flow/infrastructure/mock/mock-flow.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
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
            .overrideProvider(IFlowRepository)
            .useClass(MockFlowRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockFlowRepository>module.get<IFlowRepository>(IFlowRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '3203f3b4-564b-4f6f-81bb-53e7bb4f6940',
                tenantCode: '9qkk5s3mzqhzl1uqprin79xnktpmhd197brtzq8cc26jvb2fc4',
                systemId: '7f1f5605-aecf-4cb7-8317-bbb853061653',
                systemName: 'ttjt7am1o7mid361llv9',
                scenario: '58zyngdjyvng4slf597zaknndlt89rs8eskv0rcv1qivcq0ndzf3mn2nongu',
                party: '1y1yjgawj87rokypipjoe09vbfx5dnsgmvotaflmkcf58dxkwobc6ogk3o687aruk0obkirc3y8fblubn72kdkbg0gsz58hfl7n3u52orr9h1szi5rwfa2v8i4e85cx8zrwdjy7ppoo8el9q6g9dj9sr8ja6x4tv',
                component: 'o323vummxuuau0kr1aezng69ixj7jlg60uwbqsbwmkej8228k71o0hj81wewouw357ixcq77bltt2xbcwplvjov9iat8skh18qb78m06yk2nkzvmldrkcky4l3gkk28jhznbk3ck3euo2eovo7oarm3wbbuapk6d',
                interfaceName: 'acakwjatufm0n0xyjpicnypqju7caaoa5q11y6p5mcupbu4kgzgjp4zlzhzhodsg8ni7h37feuyhdfx3cupq01csmdunfqugj0gfhr6dehtpefjsrojhf8xjnrhyva4055y4dotewkkkg5sienrvyv3z0jt7jxib',
                interfaceNamespace: '1fmzqxlqqdhj9rugk0ekvqqpu8i06anr41u6cwr2pvvlr8ynj60pr5t39ccuzje80n4bkdeyy7b04bpubv71kt7hqls280mfvng2hrmaxrmiemfbin3132y5667j1mczp13apmwt56vqixsxbe6sa6j2o01q47uj',
                iflowName: 'gj7vl6t2wo3m2gkvjccp1n7m7vahyb0zta66rzhio9733dhbu50blv866ycklxfrahlyr0ymcogks37l729testbdgzbq11y0xjp8kpr8z6dr99qaj6p578ijvn36rali6a9s0oeiby7sl21q734lo2af780h5mc',
                responsibleUserAccount: 'btarknh0775icebxhuap',
                lastChangeUserAccount: '6h9xt425nw0d5pecuppl',
                lastChangedAt: '2020-07-23 14:28:26',
                folderPath: 'gylt1w3mgjci9m9ky3q6p700xhpsf0ax3uylssyr5yz1hf093patvteixmibgr0taczv4zmk0cufy8c64ujgsr1t02py1nktthpin3hs6a0nog3k6sy5mmrq9ge1q1r06b20nbcexls7mv1fn35fzwpv8bb125lvn1izf0ezjkd27pdq7ea9nj2ap1gkqy1a0bsuh7yznji5mkzemkozt1gqexwu6in6pydrx9j0jewokn62p5k7xgr4n002nwh',
                description: 'ack8ia0azpc6djm23284c0oz4lwgkbeyfc539bkz17d2f5ek4w3y0s1al7bsbclqy75nemmyr1fpbaubyislzi5kgy1nxizkxgy1jvck4bvkth4ew5225nyfpod8h9s1z6j27imywdymuzqatojmh0tk4irdrbgx4pfmlwx6nufof0g5t59fsdq7bm0xjt7u3yum6x54xa2jq4gm5t6ctrpmd1wdvwc34eu48xxyefh970kj8d0d2fdu5urmwd6',
                application: 'rgdpg8kdbc2p8t4qaqfl4c2d2kyhse4jex0phl9915t4878723pbdroan36t',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '08a26543-4686-4000-9f19-5f6f30c920d7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '3203f3b4-564b-4f6f-81bb-53e7bb4f6940',
                tenantCode: 'yaggbuw78s1n04vsrnd0xzlobamcd3j76imwqu1bplawsh6uqy',
                systemId: '7f1f5605-aecf-4cb7-8317-bbb853061653',
                systemName: 'qc0pb5zymhz3mne8pwf7',
                scenario: 'wjumosbbmhl5jmxri27mf7s33dfu3xr7cc270y5qdx1cn8r26s7eipr8i6qj',
                party: '4eadyp8e006lcdmldqlt7nguigrvj6gpt2tlubvwzz44cumywlwngnjcrrf5jzdqshtbtblffgncodc74b79af314nl44jeakam8yl2ky8gunpcpqn3nfnwpgqs8xybicfu7vsnihcl81dgtcn6cxj1087jif2d6',
                component: 'fr6ejaxsng4kc40n53pn4m00k5kyzzgcd5vj12qeo5mbp10lkgxr9e3wpbwesbd3j6oz344dm7sv022plwz9usy4bgnb60hbby96qaaoox5n3liayxigezmbuae3wefgm64w4z71ybq2tilmoo3vukeo31hr9fv5',
                interfaceName: 'fo6qu9v8cm6bdr6f68gtgm64jmu8pxe3q566yv2coa9k5z4fnohzewlnegbh12ixmpad3vlhkhcq9swjiatn8jix3q5qeeztchx49hp6k27lisnrm5y7l4rfam96hn9jxa50k9sh2o8zffact8lz8qincd4y88od',
                interfaceNamespace: 'jmasdupzx6ujuezxyz5l6yfzmh5i2i9di6n53z909i54y6lo2rcethqfb4cxkgv66mzhbblkiq9dvdbp8tzf2y6vm5k6rycnena4c1u0i0g1tvs73skxud0xo1vc2nmefv3x6iss382zc7svfct9lpy80tnmn0i4',
                iflowName: 'jnehviwpfcvq6xf5kj0y8tcv7lpu1262tvv948ylz6h8whwdzufqetn7nmqphbd6c6dmcfkbth0t80d15pj5d43x1ymvaq4nmm84088isaydh96ckyel422xyf9jo0cjwhp3pgfyabdt2k91g1penufhg5oyxog1',
                responsibleUserAccount: 'acytkbsim23kozbe2yrk',
                lastChangeUserAccount: '73ucy3ma8t8w4j04n8t5',
                lastChangedAt: '2020-07-23 18:20:46',
                folderPath: 't8ezihq8r7yfk050gh6m7v5f3o1au2ezcw33j7ipg1d31d8gbs8uphif56cqo1yggvp2wc66f0o1ihyij4v7438d2f51rkfq61xtcpedtiy3jesodewzeb966piau3dux13s07bqwwxgppuxo05i2396cr630zijsc2kidwulc6nxawai9r9e6aw5na7zhntdc1roiq3zn7vznn0vlnsjomw6stnkqishg48b54kcokhuadrnry1pts6y57jh94',
                description: 'pj9o2c3t6jvfy3s9ze70jfia3vzshtkjb66ff0xfxn0t9myemyhpailgyc129hlzpixx9wba9y5pjek0qydqs46qkn8mba2b1iqfjjqhsquxj9rkzd1klq5pds62k9rzt2sex9y5qt87a88dfb7ibux01g49974g8yz3udylilw3uzzkfjy4mogsjs872er2qz7ees2irljshq3wgtpswignp127h0f7cang9aex9zd37al7g0c54nbdqnduali',
                application: '2jwtk3uh3rueb8b1echv0eqlz9khggtm6an0r759ux7dgwinimuegymsm7pb',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '08a26543-4686-4000-9f19-5f6f30c920d7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735',
                tenantId: null,
                tenantCode: 'c2urqsrs89pril0xwnq1317j7jg36su227kzghexyfczotk525',
                systemId: '7f1f5605-aecf-4cb7-8317-bbb853061653',
                systemName: 'izqha1jjmchqg3rq0h1z',
                scenario: '9wezp8d0gtwe99ih8ryk2qnbh1gdytud1vbd1l95hkh3dl334if4obt23mqi',
                party: 'l0jl643514qz9pzpiai0xfo503g1me8fillbu9jbfj2g7vxusht3mjqbzya062193a4h7fko6n8d7k47xy89wqb9ijlze7rhztv1hb8h4dw8oby5wl96j34xg8uxaa47hdx16cc9mngduweunnwr8q5l1wvcl20f',
                component: 'oef0axsiq6twtifmw9voa5fb9tgp6ud65xb62vsn2bhxdrl83wrv1upow8zai2tgnan6u51pc2d6ebimhe83gkxnvn2j3tjl72dvlrdzkfu8is7sep0ab8962020r9613sp0y1wv8zra32o3wwvy7anys3hdf1mq',
                interfaceName: 'ho02ldfuzorq6kuhxkb0dd2k8bqtpi1dmabhfhkeavkgf5xyurlvvnpersj8kge6zpzhksfle7xmxvc69ttm7pfz18tnnjazy6aref18c7udaoh3x3i3lsq2dq0nme99s5cpxl366khtvv9iw5vg8dor0aje1byc',
                interfaceNamespace: '2i2rqiurckk4nd75xivsscyckzv5yhltvzb1zhlzvcfjo06yyykzsqs8jlfd4z3ufiw9gbkx7hy1jnm4ks6wuipwpdtb9tyximnl5fdjir9hu1iefrn8njko5r3284xcvtl11xwdif1wmqft0ynfzxn6trfoldo2',
                iflowName: '32aezsc0tyx9wvvt2vu5gr7tac8d2vlgpm6fd3tccjm3r7pvklqctgxnj0dwfyg8tbvbq7t68iguk221tc0tzizkeipfhb698rn5fl31nenkpmztpjpz9n6u8egdc072k6jsf6exwg9kzimvwvo8md36y6cnol6q',
                responsibleUserAccount: '851ccztg6vvsk9fr4flj',
                lastChangeUserAccount: '170w3aqm04g92ne3cw0r',
                lastChangedAt: '2020-07-23 05:59:33',
                folderPath: '7yylkhn9qcrghmfcrzrsa18emh3xpe1cm8xo4vy0y6balnsa687jl7m4x7n44r3k7t9jj2mi99xi9765x0rjjjeuul0xx887o04rj8hztm1s2iky378h35okfysk2mvct6vxi0z7sxi7rkqk9edktp83nn126batke9w3huuvr4pcbytz16law7b9xmkds9y8m2si5li929igoolkdf0w5srv2frv6gz9ytuta7t43vtevo8xrluhtusf6xozs5',
                description: 'suzty1q06ebxkvk5l2ewha5n64rpaee9udrrjdfbv0bozp2i508nt3em9oad7feur59ebuz2bsx23c7h6nsfm5mnskhixexge3up4exgdvg7jrqeq3h58bzyrk1usj19aytgqagq7vnxmal8o2fsd3nywmqhdjx56go1m2j57ba2spa5wrkdwbldwoxv7pnjk2dwdztdpvpmazh1kpui41laklyg1j4xshlyx8nkiqesu3010sxv5nvfc00osur',
                application: '1xsr8bd6sbhcz8e1m40d3xf2vbkdiqf44tyj3rvplawcz7rmdqcgtbneo7t0',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '08a26543-4686-4000-9f19-5f6f30c920d7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735',
                
                tenantCode: 'ikqcmq30551z5e07mn9zi30xnyx5t9pbjr88s19fkytyigif0d',
                systemId: '7f1f5605-aecf-4cb7-8317-bbb853061653',
                systemName: 'waqvlpaj44quffp47i0o',
                scenario: 'mqyiky1wxa5adfortb5w5u54qkborsp3s0d5lpufrhw0whtj6fbjqtzup173',
                party: 'q46dfwl2vjmfd7mkl2udy78bxyftna7xzvaud32pphy8dcs81mnbo1dipeoeggikohtm5zkyyjwx97joxrmuthjr4xu5nhkqctd56bekxuw8eyanqcsj24qker32qn5u9cdevtjncrniiijlsxd2oa485snfgl1w',
                component: 'klr48o0qrvrpbetio2d88ifbv23s0h4hplfyyae4ldjxw3hm98l2i0bgjwgntgy1i6ivhs4twsnxc4vij4j92fgswdr2vlwhsmsaf4u7gvl8hmyixf74ocaoy95axosurndlu2xbeklfenqyaxh41c9oe9wgbhqn',
                interfaceName: 'lwm04l0i4f5y01tytdx4s5impys210vt4cusha4tbth6tgbdqrf6vh1v9fqnno6gmd5i0ne8cb9gon8kd5ciaa8mxy962yakaqpfyoxy7lpoargj2k88ozaihdol9ag2pvpynachhmneln105hg1cj6ydu0pj3ji',
                interfaceNamespace: 'q94phicd6hxhni9rnvjg390m8q5nr6el9kozljhbww4hgcricvncypivsm9uzx3cqwywmq3t0e7kqi8doft24o8tcfyhkiavtzgsvthhwromne8l9y2hy0v11b02ou75mvwnwmglxqndp3q7uo34hczg2rgn8ns8',
                iflowName: 'e3vu8l8jnjsh4cv8h3gg1v0wn534lq9ny2gyh4wkw5bxrtwhhxgfg9ams5153fxvitqxlowgjvcy6cm791p5z0obl192d2cze88gdbc2g5x5bh8o2diejs0tr38vx22q44ax420xm2ghkrlf8316mry67wg9j5bi',
                responsibleUserAccount: 't9srwwnzfkp24htnm71l',
                lastChangeUserAccount: 'lvzmtql3zm6243na0144',
                lastChangedAt: '2020-07-23 05:22:54',
                folderPath: 'tiq2rd07e68euonrwqacnb2sgdw1kcgtxnjhirw7dbldmmt1v9l01lo6sg1n28i831bvmbfdgqcyczorru1zn31okx68sy0el98kdm3lvj5c5imuh1sfamnd05wct15pc07h66maj0efwhx7xn5cl66fsv9j5s1viizzvcpvvglosn38mwh1kdfrm0vq9mqw0sspt6fjv9ydat9ugiv383sr4rx3y5vf0k8cv3ix19o1jvywpotpg94gg8s1iwl',
                description: '4z0twyafsqhaepxstdw0848jter8oele9ho2qdhdt1nfwnluazd47l8vhpol7wzm75eod8d7y0tym7ryjwwomt7st44ni7c7qihqifm64hdeypwnmgf7pgq3p6ickxoog2fm8sqmvkzby0nla8ve0rljjh43g104178j6tgu1erzjkt30kyqrek4df6ft3p08np0m7mvsfibh15g8u3hmh1k0po79628e2apiev3cwtfmyaq0lm795176mdp1og',
                application: 'otdrj7fbbww97rcl7a0fdsyfugnqb685qp6rsagyz09tquws527l2a4iz6th',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '08a26543-4686-4000-9f19-5f6f30c920d7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735',
                tenantId: '3203f3b4-564b-4f6f-81bb-53e7bb4f6940',
                tenantCode: null,
                systemId: '7f1f5605-aecf-4cb7-8317-bbb853061653',
                systemName: 'ql65bc3s8p9k0orn1oqf',
                scenario: 'vbsh4jqdr0ul03bt4crlhppcxl5rdnb6jkzha24u8hcaxgrurmr56iksomnn',
                party: 'nph5ek0cx18p15n4cnj7u0byxw4ptkg6dut47tmprxfaf7i45mi5sklgm3wpusv8v9nfq5d12mjy63l2un08g75cilb1b790xjefjmgu6whqi3chwbil17y78nwnh8pxnffy958dam3gfrun20td89mtj1v1m98m',
                component: '25b0m2wxqro4jxl6ytdfj37wdf66kd66fqpjuvkytzsgrk2pp43y0udnb9pgpthlc5xijup2sac7u7rijdlrn9i4x9jtvj9fzv1xhvyxl79kxwk75v3zorl5hy2bpp8glftid6tf97ywld5mof2oxmo07l5vbyzm',
                interfaceName: '7yonlbm4sdfxqck4q7zaaiefn6pdq55638onx7m5anam2h8g02p6cuyjyi6sctntqgh90y7oqvrdika1kxozh3o3rlsxk97orxp3kl2vsxqte0w752ysrpvp2nw640qb6bs0z02qi3yc46dso6c7682fumqcrtai',
                interfaceNamespace: '066fwx7wryybn5cckk7mvtalar8jagglu18gqlag7bducgobdvepano83i9wzf3ic4sn0kq6ukhp6rkdwo0fqp7wlb2zp9q635vb574ukzpkhk1zfo3el2utvocec49k21sm4wx6ian3ii59mxyek4nk8pu31py0',
                iflowName: '930t7ayuq9831mtiexjwh7hzd6jyy24xavgfir6zf5qxeu5mqt6oby0gxypc0vt7v61jjq2ehudnkkjpc1i2o52hvxz1jy2m7n9n95tppknotlskqwhi44cg87yn6dzlih1bj2mnn8odknd1mu692jdcnk4ahcxv',
                responsibleUserAccount: 'u7mhga6vex0jgow6pmyl',
                lastChangeUserAccount: 'tq4ocazvasa20tni895e',
                lastChangedAt: '2020-07-22 21:11:47',
                folderPath: '4i28mlchy3wxisvohpkg2txytg6zemffty04bgsm3k98pdqx42e2ntie62z6opjkus38p6cy779zremrjir85dsifr80e67yrocejeuibztnwh0jib2idckq49m0mdz58b9w1i0n7s52xe121lfilj9o4gt0gbyn0wx15sy9pof63l72yewpqrmipzyhxb0crej0uiakryofm8vsj5y3wdw7b8o48t8p44b2dzyum53renof0cv6yshfnuky0dn',
                description: 'mlrbrgrgfvt07ovp2qt1g8uxtv73krgyqfi57d9drwji9miea2kfh4dks7751blx6mrby9dtxjbz36ggutnc40fn7hfmb1eo4fwval3xn9otl6l042nyeioe479ldscp0iegaz2svhrfira4xo9szskjyckh6wkicl5b5sw4zmswdek8m6o56e0pui9btppqzdnd6g07h46sv2ictubrpjw1dutlmbkpbes1m4ve4yj4xn2hb5dnxhj33b6c8zb',
                application: 'xp45p1qgkgr939ppjo5slel0n2athy48k35vudasrdlfpkxhaykpum4ovg2q',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '08a26543-4686-4000-9f19-5f6f30c920d7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735',
                tenantId: '3203f3b4-564b-4f6f-81bb-53e7bb4f6940',
                
                systemId: '7f1f5605-aecf-4cb7-8317-bbb853061653',
                systemName: 'klv9hy5oyk4omarzimof',
                scenario: 'fgyiv60xol5g4hgrpot1nr8vbrlxxpt7nx16iqf07ssa7j9numbopvm225es',
                party: '6t611znuinty5ir5fj8f9omavco7b5ntc260c2qc6xa8wwg899cekaat4vtkj6lbpt8rdwk9xxkbm87mv96aeafqcv4x432a47ef9jkswb6828wq1t4e0k5xgy8tjv67mtdesw2j8g79zp6tbjfpy0nqu407kchr',
                component: 'mve8s1iv5epq5yh461k7angzx3lsfwgmdyme8h3b6r23x688jf6lwryzvlvx3s1f2hr1duj1ikjb2yljv8v1t8p6bxqz5gp8ipecleqdsdx6dupkl4m42ttw62f2ub8to6a6h0wjg7dbnn7nhq4gech8ashf3sic',
                interfaceName: '04o1mbuj6xqzg2qdeoo4hjub2i8st69ibyzfwuewl6annmzulxws5o7gqlw4liufczyvkpsrbd7kq866p9h2kfys90ax1quummc1gxtrzmptob20pb5pyzwjzgjoff8t4e535k536i2r73xtwb3sjtjnjh904i62',
                interfaceNamespace: 'umktlezopy37twiau6ue51xhts5o5v0yak8pjz57ubig2rgrn2ud4kd5gqram73glz85u5x7lrcb5jlozzq2m91e1opu1j384mopqk6i08y4z4ax6sqx6tj5a5yembr1u9q9vub8nwsvyi4j4ajuybkulj0zfzfy',
                iflowName: '1xuyw8fmo7sn6oodxe188q63fyfzfcxm9zw8haqzucikv8mpcdflilxlwy3z5hiu5ifbv9fm0p8bd5ksxo1o8z5h9hls22ds7c9zslzaiq87jzho1puthl28cyyryppls4bbmqtqaxg8f2xbodv8hfh0vn0bvqya',
                responsibleUserAccount: 'ubdn5bb5n70a0vmpmnvi',
                lastChangeUserAccount: 'z5hjoonz9k73xcawftno',
                lastChangedAt: '2020-07-22 20:49:57',
                folderPath: 'icz3e3ci4yqpw15nze5mckk9br6bfq7vnocdii44hx5g3pynoh9cpes95nf68gavhi0jd6jt38l9q3wps1l66nj9ay0c8ifmkwzaj472pbsxdvl4tcis3fihiaepad1kfcq4ure0npvynyuze6pn6ofe71uye7guhuhfchfey8ca20xo6uzfgrthv9jtiwbmjmbx92y93poilzhyal0lrll1u90sei71e3ywemqco8qu5whbmckg8zswrw0jm34',
                description: 'jkickw760ejdceeoo6wrv628lvmezdpgzfti61yyl6vn42x596x4wbt9fi5a9phcgra04bs1ogyacpflw83bi3g6j43lcpa9wmnib5vtfwslshpytbci7jw85umdyg4unf91vhbc17966f01lza9az93c3jw4rzkosbr4mkqw6kckv3oml1xqcv942bfxq6gtm9vrndnjsnf41icfw7oapnqs9q8kj43867g9tp0nsla55qp0cao0csbygp68fe',
                application: '3qp27wz6s678fphjevpzzw1oeepk8x3p70hzhra5db1xui2szjdc0yb4mm2f',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '08a26543-4686-4000-9f19-5f6f30c920d7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735',
                tenantId: '3203f3b4-564b-4f6f-81bb-53e7bb4f6940',
                tenantCode: 'skg1m57teraqyevllj97tso55lwvx627om90ylwj3687a6wp50',
                systemId: null,
                systemName: '5370xes1h9zdbvb0wf2f',
                scenario: '2w1b49bje90poucy6ahf2isjigndj8qhv30mtfrp95wr1idx8w83j3vm0b4c',
                party: 'ps93qiv8oqx49rswpm7uw4z755d6ziq75um3y6sq52bcwdceb5rvu8ac7ouc4gunnrrq0i15wswib6kaxrhkgkhzbmezwlybilwrz430bzwc3vzhfakyobtzvnlsiezdgwqt2a2kywrfzhu4e8ips3lxx53uxy7h',
                component: '7rv5a1tb6pbmnphujb2eudr3vnyva7hhp3p1due76viex5jg27xuyb8ehvoqkizufm3yu47l9qm5arsay962pvutlknm7bqgft1neuv6tw4a9okjlpvhu72xhv6sxjunt88wc1pc4e9drl2u53fa0mytkc5tki5l',
                interfaceName: 'c5wsxczao9ipypkunz5rwacn02i81ax5plrgmnc47ch3apdvixvgwmab1y5us4lkqqb6k6kqigsucr748pegd4c32q2mxu194wka6pq1tt1r6sek8j7vb1qlmcwrpvpau1xeygo9cnt4bcujkeh34i369bv04rf1',
                interfaceNamespace: '4ke8cmsbffyiybzodug0o5ge0lk9tvyzu2728wa0x2rksd0at2qc87ys9rnrw1t304048wd1h2vpb3mlr7g0p82h4qdpwoidw1uhh5h07uic8t87z25ccqyhmo1p4qjvqzhp4kua05in7tmxx6aaysefmhknj67d',
                iflowName: 'mpfngobounrx2ebyn587iewfr7xt87c7wo62o60zp43wwosvga601kkirm6djkqgvxmms79lvrycjp4nrh63e4mvx5jml48b1lat384czumu5pz5jj57q7z28sj1r4ifpn8md97043hnek8zm0lbg47n3vx0veve',
                responsibleUserAccount: 'xtozmr7imoz1giht88t8',
                lastChangeUserAccount: 'izssruiwiplka66q0v9f',
                lastChangedAt: '2020-07-23 02:18:45',
                folderPath: '3co7ywgcgt30istogw3453uscmmhex6c2fugwv89ak1gut7vxoyj1489m1f1av3xzbe65z41d7byl203bhyyc4q2u4jph1f9464qakhenoqzpxct6gupocm4cimejh409jgjfx07mlnojk2n8l51cdr8b95yesxuxrmuxa4y73q0oo5vehqrexqee0rtxnu575cm72svp8fbiofhixo0y28lxn5kjmjiqh7mot8s52zujbx6d5kwoeaqtbrbtml',
                description: 'tmmj6z70e3m6x690zyn0mt00cg8qs7tb51im6qzb9vqhjoo8ox9h5rpjqn2m3v2viarbbdqvm136cvejp8xmeeb6sfrsfef699zdw31r9ft7z39pwiezhv8jd82jv3sqffgj4sn7vrbhrcby9iceylf9hl0duxt0pttvt1g7i5k0350b2wjhyei18igpd4q18zr7azmt6qtby1lazjchw4kp99ciygefq34ag7u92mbxrsx3sp4vl81pcy5rq2e',
                application: '0dtf5x05joghxmd29656lu4pipb8e03851t54ylifxy29ynopqrs57mtpmv0',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '08a26543-4686-4000-9f19-5f6f30c920d7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735',
                tenantId: '3203f3b4-564b-4f6f-81bb-53e7bb4f6940',
                tenantCode: '90rhtkdicnef9jkm4arb8w1kxj28cmiwsbp8ygg5xjiu3e5hz6',
                
                systemName: 'pki9xs7txc45rhhliusy',
                scenario: '4c4hp9qbt84vamm6rdfkkbuuvwm9tv12u7kzidd2naxd6s51m972oldr7uyn',
                party: '63e86sl388c47mtv9ug8iaxgyty5e20czb62i2bjgp5g75ud534ce06ry6g8zfn8noamqmbz7mzk2yp7rwum8f4c7xpn2btpbun48ocgqvuric475javhhtr2716xyxuox7hv33exsrmp5nncnul2p8wt1541c8o',
                component: '5t2plnew6y6ha35nfn99g3fw6wfp1gkbstplflovjhvpe02sjg39gkz61ozsllrp6nc4zs65voafgnt9iajqa7acz9blwezv6it2enktcgqlx49cpip8kw6ppqccz7040vnibpjy1c8l77mol4gf6hykmg094l34',
                interfaceName: 'd6mw0kll9fpakyzaxxtxlsd2r15u8uw80kspcpnm1s1flq4ont9xgu688sbgoyj3lhm93i34sg6pwf1byeutkednjhytk5dc4nvybqqyachzl2kimybgot3nmeywmaljpz9g17fn6q9wlpnkm9mp7lv680u1je7z',
                interfaceNamespace: '29wgakfzpbsl9l3863r5g610y2jr3i8969bp1hsj9df3np86oj7mcbghdkclwxol55sn7a1xem69nv9200us9s5bkodgivv47sf43xrftu2ywsqtx5o87x9xlskopictohkgbcc8svtg8bhs8x4ov4qk977tmixw',
                iflowName: 'elm9m1js3aq51xwsv8dzgih286t3jx459pxomb2vs4lan7p8h2lh81zs17eiprjc3c4pfof01x86q18ehhq3pdchzhdty45d2zo7rer9kvsrmnzol2td8wbw32ttn1twir7q0ls893kjqo011c66r8ejcoo629sg',
                responsibleUserAccount: '0s43m8q5c5upc1z2qrt0',
                lastChangeUserAccount: '8d2bha05u11va400j0fs',
                lastChangedAt: '2020-07-22 22:02:17',
                folderPath: '6okrsfx90euxej2icsmwqcy6v48z5l1n72ijgi9yafh6uyqk3ohgt9z9206y8ewn4f1rp9devf0eyd2md12g1j1m6hdrsr9kry51zx7zv09bo7gjf2zl0ym6tixx31oipncdmkb6ek774expf3as2wfkjeer91gpfnyosjap2kzqe2gp2zxkwsf5jbnbqr9oltfjvod9cpgqmozm9ohwqw4yggmf5eugxt8z9ea3pj3dhk66tqssubbg4ehjxz2',
                description: '2wf1d7byo4gtgfeajwhgt8963rb8itxowjlmveidm2c69wb546czrk90nezymmp65d57ti1cxflolsu0tir5ny6f0ahov2yd4rfccjmc54g89rd1s2ai671f6pmix20alraclrtn71iay9tn10gn2xtmzh2qbarr3jkpm9kzwzvxynbwkax5djln5wrycmandkekyr2kfxwb4fz6b6kf7ggtu6fr9602edjiuxw357w9payal9lyabcldqmhxx2',
                application: 'i762l3ms5d3811pwwjn7ijyeqxju04olcggpugnrysg1qzxqhzdn87rwjdiw',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '08a26543-4686-4000-9f19-5f6f30c920d7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735',
                tenantId: '3203f3b4-564b-4f6f-81bb-53e7bb4f6940',
                tenantCode: 'g01awd81jmi36oyc68qam6fna95fhussa7qaq5h533i4r7dsao',
                systemId: '7f1f5605-aecf-4cb7-8317-bbb853061653',
                systemName: null,
                scenario: 'j2na3in9vylyg9sb7ugqqbcumlsrelhopdrvnjleuuyx67n8l4z3xxkwqhky',
                party: 'yt4liem9m4oyvd2w3pijoryj47tpk98t7e7u7ll7m7nai7d0q3rrxpt3brlzfwcr968cgjdq5xzemtpswplgwa65ky55xatdnx2d5dljzenr92dwpoe1sml49n28e1bu6z0bgppny3dvxourboomxqcw2jnue9n4',
                component: 'cxo9jx07u77k0lbdlgyujlkxerm66s1ksdjqetov6c774vd7tebrnar75p955eox3wiev6vpdolft1ovi9m042iynq02gy03s3kxlxbda4caxr8ynxgboe4uepvht5s7a093j9lnrrkzi49z5sqhauc9rola8b9x',
                interfaceName: 'un0he0dr4euvf0v74lwffrshr9j72ny19zhxw4pl3l0hun9pu6612nnn7smd7idezejdsk0pft8bvxj3aa95c4ahl01ao29oilwpy5bvzprcydp2u1740g32lz1rhgadt3f0y6q5tq9wocea34j7ehny4oiknaej',
                interfaceNamespace: 'uyj9bnthw41vdzx749bdpaced5tzf2zzvqcdbjv9twn5qf5tj1o36yxum8h3e7yy2sgsoc1ckjcimpcrqufhtb630rsp8olixsdhm7bag180j51hzgxu5fmmmptxfyyhkqu4ve4f4vgupoweazgwsgelmdrvd6ju',
                iflowName: '6mems44dmclibele536s02py1rx4tgsc3usrvbqwhs0ngqq9w1rdgwhjtwn3uuzl8yy3y7r18aimehh8xxrre0ojfpap7s5ns4lh10mvl8g39sl46xjsx9miin8kbdn28rock3axm3en0a2d42tht77qa8mihqt1',
                responsibleUserAccount: 'ep8n29kqrpjj9ded3uf1',
                lastChangeUserAccount: 'gf5t8y7ryit5l9pie0xq',
                lastChangedAt: '2020-07-23 00:50:36',
                folderPath: 'i6a9ee6ssgwutdci8c6yfrm0024f3epsiiy1ebt5qeux5f2ry8trsphgf3vczv4caicvv1p3s0mlsq87gn7p1xpb36u2menr1b5znhza8z4iumst7d2c12xh9rwltulc809mnoaoyohqpc4ambwlw9m5ecy3b3b4yogjltg8uyldpaooy2ox98m1jjcbcxv9urgtnx4echgyow7kziwtaqjxvte8p1o1igoau4nmvjw9o51dhfa9l17zr3tbl7m',
                description: 'w41xyx1nxqp2x1j7ufy9m8l0wfwd8sfih2k5zgp5s92h6ry3z8hkt21gfdhuarnqolu48ckvi196wyxlke39x2wshg3n6304gn5i3g8qps63kmphli1s7o4l3uh2ionay0pv0ly7mx4rus37gdlateus5wcxsqo3ohcxw2x2iz1vztwe0q6xfqimybjlira6hv9xx2lo3grbq8gsz3hexfyh3zkpaqybkqtrdwvwdj8uu21lbc8cliqlagmyuvz',
                application: 'wbjm72i1l0n0tg4ushionzr9o1niifrzx94susumowu4khyrlqjzeqt003ck',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '08a26543-4686-4000-9f19-5f6f30c920d7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735',
                tenantId: '3203f3b4-564b-4f6f-81bb-53e7bb4f6940',
                tenantCode: '0jdutoi72g2hf9t0tusd4gtjjyv1rk8makzkogvr7rmjvd2y5s',
                systemId: '7f1f5605-aecf-4cb7-8317-bbb853061653',
                
                scenario: '3bzorbl6e41jaqgr7l6neh3b1rugos1tpbh3i3mihr3pwqajhz9w8ktyshl7',
                party: 'kev405riby214wlqqwttz3pin27399b7b627hg2cpi5tmxsofz1pw7a3nebticqguw11acru9ou3r7prtti697oulpuip1e5kmjx6yqjasslho7n2vl1mpvftu621hnhgq3dge1ps6xdmf0zpcwhi3eiaqk6wz7d',
                component: 'tn4drai5ursae4od74rjuyt2l726anv936mkem6bt6vy1d25im3cj3fn506joldy86hn2medy07hyc01hw126v26we980v9ykzqzgirjhhb9t0jwsm03wt2bjyimdsbo9jpd5yea6h9fywi0e0g73yzxk5drwixw',
                interfaceName: 'yoh1fll8fuz7b8649a3jmpbklt2j4jex3zcovo9ng1vxq1vgjziu7wtr4bkaw6i1fpvop33o8sc2fnfybr7woc7kt244ykrylpg78hr2nw15dug8dgswu3prhll4vjhqjvwn51fjd0pu6zrfa1dw7hw5jvg28ntf',
                interfaceNamespace: 'ibolxbsae08sv9kk3lnk9n5kc15hgsihfvc4ngqe5ef0ojpjnor80mbwx6jjjgdug1cendzjjxol56qks81pyi7kqru96q4y9l5z26r0i91joom8ormeunf5z936vbivlzrfiu8c8sxltaf1y8ch9g8ldk1vxmik',
                iflowName: 'khs4jvq5foh0fw3bb4jkks0zbf36w1l35zrja3yes6tp153zhk223ngvnzjve18xdx36xroaqg3rcbj5tgq0tnhemsfrmwkjko6jnb6nalsoqmumvk602pxgx69438vswkbpl3eonf3rnlypp82luy2pz78a2g63',
                responsibleUserAccount: '273h3u3dt9p7ffswmeup',
                lastChangeUserAccount: '0eh28q9ge2omwx4v38rh',
                lastChangedAt: '2020-07-23 09:32:19',
                folderPath: 'r0szuspewmx7k4wfj739icdz4mcl5xcml2olzjcgvq2uml4n2rkx15qx1d1rigucpdaq2cral3z3x4s00vqlzayw8fn63llztvuwzmusuawn65xpiwp2sl2nnpq15k44p0ddn24blg0t5daoj76t15htddni0he1140t15rvc57ov8bzqhhkx8jx0njjsjsjiiawa29xy192g4kih4f62962i98jdk4qbop3xkhnv1vji8iaw1llu04zmohia4c',
                description: 'xgfud7d8hrs6393yye6am5tmrs18pejq0e2bqg7eoqp8iww30x4rv94me8e0bts5w2dssh53l7wcvdkb49n9wv1xp3sffp4ai26s0u658eqbg726z8qa4zzug6ohiodz3fgc5tpdk2xm5hzpkudfex4p69o7v4hbkhauekcsqsphiq0p146k2ucdad6h97lxsg55sm0jbdb31as6x9lk1pqsbvatvq7759lv1m5yshmbahjmhnh0kvuh0yv4jxf',
                application: 'tkwslq78fltyi08nx7fyh839b312kynlj8n2heb5nmb4hofudd65go19ur17',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '08a26543-4686-4000-9f19-5f6f30c920d7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowScenario property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735',
                tenantId: '3203f3b4-564b-4f6f-81bb-53e7bb4f6940',
                tenantCode: 'a4uhygk5fy984wczhuaeuj1ujvpddp3dxu595f0360ppyfbp0c',
                systemId: '7f1f5605-aecf-4cb7-8317-bbb853061653',
                systemName: 'mksk22a6isa6134gpi3o',
                scenario: null,
                party: 'kel3rwvibk8wnvnjy73ij6m7w2rrfv3qn12z49nj6lz5y5jb9x199ci54ialb0zy04epldx9jkmv37jw4ff53vle8vlmc8roux6uh0aujsj67z2xow9jzv6lvg4hykm3zb4n33drwwi6st0vfbyswbp3yketl6sz',
                component: 'opd0sm1ui859mrhsccp72kpx2f5zjem5nejooi1cb62qppbtktmgs1s7cgr238zxjpeqfr5uzkm48qogrkxy9lez8hnocqrdeeiejtbeom39tvcvplb9x7m008sxdvbfqq76j731di9ivn5l2tjfr9a3x40r3x3h',
                interfaceName: 'dsem7nht5h8ebtr5bpnbyqyvqujcuw6lvb6j55mx5iv2robmctkey8lzqeyn2ks96qswhj1n3141y1zn96th3u7wu1589uk4aamub75su8lt7jrvwelgdokg5ob17d8hdjw1ergzd37oqtvlnue28gi3mljxl6kj',
                interfaceNamespace: 'jko1f20uz6jwa6b6nmo4h65tud00b39gmhfmltxag9m6odaj5zmqnjampee9vbwkt2qpth65vwajv14ipgtj3ptw0bqdcz1h07m87qkt1m8g44zyg8536bp60vxbbg567lrigcg07615d57rj9c9qefjoqosov0e',
                iflowName: '5wb2b4rslnp3jscohx3t70n5lk9gc5rp4u3k0uw7w1hkod7vy7b9zmowbke7az7vlv4xi88einv5r8j7uyiqzp2nq9jqk85l46ieb5q9w8f52w2zcvsrdd1xtynk8wowvhz7n8kazgeylcows23cfmntddoy00g0',
                responsibleUserAccount: 'xvj7mdgva9texydg1gsx',
                lastChangeUserAccount: 'n759eb3gflgndxsvzhbv',
                lastChangedAt: '2020-07-23 14:40:30',
                folderPath: 'h3c3o4jqxxhgw49e0ok2552odi3x7z5bb0ed9geotmpexfcv7ugnyi1jhp0n89g0tfninzw1ul7klemc6ha6zvbv5zcf17yv0zwvum9n50f24t7ny5qq0hoimltcs44lb7gmdnuchqtw8d59h4r5756tj06udjjcfhgcrgyzye50poswooxs517v943jwzh7rmm3fi471omdw12i6qnwf7vyvpne00wkjryz23inv0znm8bw216g9srrpsg2xr9',
                description: 'dhq5hzot71k331zbp5nsu0xn6biefrjwpldyhcl6dcgeednzovsdnyy2kfsm6fzfsuabeyvp5g1y4vegwftw0z1vze4mm8nqbv6pi5dqdg18k6jus8iek2dw8wmdbuuhqmlycjbqrijnx7vc10380jxkuvg2fto5ju0blt2uqc95dqith16m7k8abo3u0io9u525n32y7szq1r2jui0cikxl8uuk3k0epnw5ko4z8qtxfzvk4emzpn51pfkusrb',
                application: 'usehy15059cbh41a5tqtqha2unn067sde2ur3x2lc92vu873qkfd630zqoe6',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '08a26543-4686-4000-9f19-5f6f30c920d7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowScenario must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowScenario property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735',
                tenantId: '3203f3b4-564b-4f6f-81bb-53e7bb4f6940',
                tenantCode: 'are9vagyimul50eefxl04iran96ku4s2hh7928r9tsbi6yeowe',
                systemId: '7f1f5605-aecf-4cb7-8317-bbb853061653',
                systemName: 'z5bcdxl7r0qa0li4l6lu',
                
                party: 'rjrdm5k1yvz346u1ibp3vdhenmms9pftiom02uq4d3zbj0il3vbx4hv9fc998vl3i3jh58tdgirzrl2tmzz22u64pa27h2ssil1y0matapkdd2ftl0roe4zud8taazi6d8ak4xhydb9d1302c14jknn26zgsqrg9',
                component: 'kxn4wqj2qp4gletqgnfgi7mjpo49jf07gx4ixhmht8peyfl7wgbauonvujrklttyxlak4zbhxc22lbimmt6rs0lwvfdawwfjx4iuqvqnr4m1jy5fcnjkk5ofdng7ow4rdjuc2rixchdz05c52cwnvpzdsg28j2ms',
                interfaceName: 'nkqiaxp0c8lui5kptrt7opst9becgv9g8kdkr12zcuu3wjn1bgynquvmh06jvjy2pxycmndcuhs6gribuytlh5nkrr2511cssg9byxk02ky3ridtv0xuhwnl2dwh287ynp2r49btnkpffv82r5798v0053pn68sp',
                interfaceNamespace: 'vgl4nil9jzq7pdk1xvtmv1upncm8iff5p46oyd0w90lsdq34gh28tzg84ztgjevw2wqpheokpfurvjdn05mpuq3ok2cvpn2z2gbws70zh7p12gdadcmuas01n3kn34rqtm6eo3errg7qr5t1pxvp088ngu2uv5u3',
                iflowName: 'w7jiv2havvf6f93tjm98lknmxlqvhw829t1uoizmuaykwr2f6zr9r47ydom4ccevet0lzpwfdjicljiunhe8x3vxs8w655516hqvyuxfxiawahca2udrkld8si3pp01vcbnlhhszkvgp4nqr27vih3m31ufmj3ia',
                responsibleUserAccount: '35oxrle514kzsilv3tox',
                lastChangeUserAccount: '9qy92gkjlkokdh7esvhj',
                lastChangedAt: '2020-07-23 04:26:28',
                folderPath: '60bljrooen8vtuevwvgebx6bd7ldez3qdtn2pev0lprj7rgr0aptly779k8dnjkxhdrhvdb41p7nrtmpdrlq87evusab2axotcf9zvaezhnhy9b89a8vkao47rbisgya3vmalinrkl13bahc7o5mkgnhu9bgjio0bqlqqv9s232dc041uuwom9iizam6n2g0pc0vce4d5szcx7q93fvuria168eew38gpnyk8zljx8dukn8sdoyn8chc40ru7w2',
                description: '6uk5f77ehs4sbto63cfbbmtme7hdcsfmh22o0vbs7u6ksnah5smxhyrgyj2r6tohdhoyd28bxizcrwl4xqdf1b6rdikgvzok9k91tst91y6sq35higw63jg31vpq7d3ed20ht2f4mhiopxju9br6aaofs71r8g870yvt5zurkx6my2eukqn7ts1jykevu1ia9vo7cjkuqqtf7zvg8bbx0th2nyhve6e4g44058h94efr8eal9axc193pm6evq3u',
                application: 'hchflz36ionyzqebv27ftfos5p9djwtp9f4r6ljhudgngfmvhosbul0yzvx9',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '08a26543-4686-4000-9f19-5f6f30c920d7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowScenario must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735',
                tenantId: '3203f3b4-564b-4f6f-81bb-53e7bb4f6940',
                tenantCode: 'v3yuao2lxs6omumctrm4l3xyhpo4ct54wrbbgv10gtgmiww4xv',
                systemId: '7f1f5605-aecf-4cb7-8317-bbb853061653',
                systemName: 'sbcp3yamwdtuk8gwhttr',
                scenario: '887kjr0o1d0bnqbpombsw04kuus0g69g67aq92isx6aqn28n11jnlnhuct0h',
                party: '7mt8kbdq150ecva6n7ezovknxnod62inzo70lxmmxovs2q8lahwzya6inad1kipzzq4dhjo9uq8zxl7tiktfia9xmlvsdl74qy4rz2ysj5xr2n4jjxud4ct533x44wi9k72ivqrirltyc5hxu8iuj1zd7vdz0h71',
                component: null,
                interfaceName: 'pjv5q5ijbjlhfteliajrms5aczcnskpam5zmdxbqj5pvjjkba8qe7xtiv1zapni5h5gslxgdppjjn8pjjb62nv9q7zoi8etagu3tlh5kvlr6w89hmwjry34nduazkmzxho61258k2m04p16a5n4ogkb0gx534bjc',
                interfaceNamespace: 'a7okigtlgff20xmsh49pniwni3j4bkwngn37dyagxkvb42meyzpf7869yfi66i3ky15f4qu0r8z0m1ietuuiz1kdt9e98m12n9nq0c7nftqs2fjpz1oq6h7q1tcsihpnji3wp6bhozrhsncgcwlrde5vv2zbvohh',
                iflowName: 'ls8xydfk764uoefc3gs6a1gg3nr82jdhmv0af9nhfym6irlwanki3y2gn71c9gjky4oo0tsj7cgidx43ewg2borhxzf5i41t45x0s7vts48gdahyw68k7jxaabeh3irqff1iyww9vawag96fvrswngr5l8kjblv9',
                responsibleUserAccount: '4mtvlxqdbc92u1xp7m5p',
                lastChangeUserAccount: 'z930i9q6pz2flqsxzxak',
                lastChangedAt: '2020-07-23 06:52:05',
                folderPath: '218gtrkyowodsettfbdfy954fljf9mtlin78k9h4435bbpg57y86rt97cjhem4i3ynj1crgz3pxbv8wdllzru3em7c2n09zgq3zved5kdrqmyfczzvl70lnizzs1oqahmptdvltl3a3g69gzrqf8wpzmd3nuqy77nzbu3yh52fd7ab967pp7wwrwz7ol6b7kdstrx4seteyrn9s1vwk56hb7tm77f7g85ddt4sincb92992wqo3u66k8oztji0x',
                description: '9vb1vhyn367d2ek8uj8my1e89fxofsh3svdpmhc538j0m5l3bboqsh79dt0obcyzads1256nuuytwvfvjozpr07acuz52zkrcc18mvnlwtv29ym2aiizg4u7cxe2sd30phnk0re4lj2pyuolsxml6dquhvmb8r28tfoj2azs54uf48x3xjj7o2jn8srzrer5yvvn04uzr7rzip0ay8wl4ox8bpzy0u8pk3pwvxkdk7ihhkjfrzx8uf011o6o5nh',
                application: '7n8rz2sv0mvw4avjplmzp2f8x72kw89z8bsptkkqlw8oeo8483svvwx2e07m',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '08a26543-4686-4000-9f19-5f6f30c920d7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735',
                tenantId: '3203f3b4-564b-4f6f-81bb-53e7bb4f6940',
                tenantCode: 'qw06umt0y6fmtnw0ftddo89dt1gxnf06sipgn2cx1bh8muvd4g',
                systemId: '7f1f5605-aecf-4cb7-8317-bbb853061653',
                systemName: 'vi8sdle8lbunimxgurrw',
                scenario: 'vwmasjh9u3nzxx8tmki1ndwcvfztslplqyh6w1xds2a53yio8x6uqaxuu770',
                party: 'kz4hrfs35o65orytj2lrnkc4uz44ii9gsy2i6amwmz2rt5p9al55gvqgbsyokl8lqlxjrbw5iyama5axrgebtww9dnu57endks9kzfu2bw8gihbe15csf9zu3qgmr4cdt85p4v1s3hnph28on31hieisk54yz610',
                
                interfaceName: 'f67cioxnx4l9t5f4a3hbuu3vjflkrowejq1fs90bxnty6bqu711je3bzhnwa9dk079beui34w4dsrv146pjekw31tob7u7dpsu8tpmogxknzlipnezk1haaqkkhzw3a86ebugvpbqq9fc7bysqa1qtgx3kldzh65',
                interfaceNamespace: 'cu48mteiwro5lgzgd4cu1vdu1toyfde7kfiqcemzpxnk7qj1ufi3s80oki9yzxluvyl4df31tm2atisr48ylfv4s2ji3j6izpg1fqsi8v68tkwo4xi53njxffavnlqi8hyj4r7vh78on1jx96njr2stf6y7i4yof',
                iflowName: 'xhsck9ctk3xdpasjj8i5zs9sgx934n5p54otwevrudk3dio2yl9hkt24sfwlkxgeq1v80wwiv5b3f6tm6i99ajtzy53hsmg2xmxq6frngkl4trqalsnrkija34luwx4xfvp7u5wdudqxsrjk1q7fnhadzzik4om4',
                responsibleUserAccount: 'o9dk0lnjwa28d3b92751',
                lastChangeUserAccount: '1h5hgegg1tmntf4pxmre',
                lastChangedAt: '2020-07-23 14:28:15',
                folderPath: 'jet1kyl0zvn4wcz78bhmyeihuj48hu1a499hwz7kg6548f52ld7hs4hzqr7ctjibu95cklr59cvdak0xmhmvtgjtigc7ei5fqbvbrpbv9kllkzxlhqj6v246yamcql5qgvqiwfriaw4thjai2sb41pra9xdnt2ttpdp9i0tzuxomxvr10rst2idqu93s8ddqebtg0s2w4z11775w6dkbn7cncrp2u3hgemmd5rj18i92cmhxjkmbxtj9go6naiw',
                description: 'tzpbmmq1tye5msgursa3st0e77vvdzt5370ukkyeh5agfcbd5522j0ls1ggdupqydusqkwgp35e8ynj5n76elk4ijnqrkpin0gsn475ekijaplvx8btldxfhrjk5bp5t29uisbl4lu3g0m9jrltgeirg9a29elrfzwvlczg5pxl32r6hckevoq3kok7r5cpkk86suu2pevwxnuvm0sad6w67m6iyiqd65lz6r4gvf5kcx4xer2zrrszeczwbasx',
                application: 'ayc6zd0jlsdapfw5mk29tnjetlldcp68m2p236pjxxklh3531icye0n4ttmg',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '08a26543-4686-4000-9f19-5f6f30c920d7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735',
                tenantId: '3203f3b4-564b-4f6f-81bb-53e7bb4f6940',
                tenantCode: '2ejsshy4ijnrzxc86cdmhwqtogvxiqntmm94gagha6erd2e7ox',
                systemId: '7f1f5605-aecf-4cb7-8317-bbb853061653',
                systemName: '468xjj4p2dhtsorutn4t',
                scenario: 'cmxanonw1daj73geoox715wf57crmsgtbpr0hi4b2fi41e2jxgdttsehvai8',
                party: '931op3owoj0civscs1fntjke81jyfvaac1rl2zuapohiahsp8xo38sgsd64tbdtwwfcl3jyleg1bjceuszntbyn9homkdr6xvke5ff01cwb02rsc84g66q6lhqq2aeh5oijy1i4wrugu1mdt3yi44ehibjaung37',
                component: 'jnfxukpe8cd1i0y2bt2zla08hac88wphdosgyctqye9kyk3dj2qoj9lqr98c5s4mlrftcr6tmd7emnogyobd961ap46xy1wv1g7tveiv1eow35w0jtkgkoix02aj8ds2y1jgq5hig9kq6etnla9k2jr5673oel8b',
                interfaceName: null,
                interfaceNamespace: '2w4m6mygxtgdeskyla5lvc3xlp120rlt2617p7mluc8xrdxn1pci6mwhho896qyconnvg43ydx5ym4dwlwz15jjkre5iov9ggpfayjjd29a9l702zrh8a9tzucpg7uv9vszwwcmatxcdh9r79bo8vf0vobwx1cqg',
                iflowName: 'q2q2xfsyuphfzde6jmmpkh0it0z8qz6xiqxtj3r3czshe5l7rt5tw0gygpfoym60e4ebb0lk8jmurcs77yzfvbn65zpp4j6cg5kcedrbp0zlp916ihr30kbvhe8s22rhi69wzoo5ju11ftxzszdrnullwvppawo0',
                responsibleUserAccount: 'edal14681z25eaohhkk6',
                lastChangeUserAccount: 'z9u93ky4wnr7tivifwo2',
                lastChangedAt: '2020-07-23 06:22:41',
                folderPath: 'sf6qsw6r87kz4fo2oaqu3snvsv5oms6e7qfg6zhpcl875j4b6dq9kyqq6bcv8g99jctydwp8t7rx29urahiwuye1aa7k3rq1x7nxpfcdylxqvtgpxm5dsuyo32sxim7x7l1ydmkhmrjvtd1tpu80g0dxp5qu7ayppe5z04agk1stoeyztf0iwgvztakaa303pfrubvucuose848pjs4m7qn07x5vng8ooz4xlhi6uvemkf3izl7iqh0n39yiuk2',
                description: '5b1nlx4b2l0kd0cmxujob43umeb2xsigyw8gf8coid727wwa9woviacrfws9pln9ve1ltzinzg0muye41gpnth0qfjrw5aywywadvwd1yupo01l7ysn7gmij6v3eo8qnxqhgbqc6bxe4qah027j32ja980oj6vhmvc0vo7a0yqmhk928lvq5bfepy2gxh6gblycppgmtndjwxx8mxv9g3gjcg08rloz957c2vstyhmr622euqwgfty5ajgazuei',
                application: '6vqbo4qbg3j6d2a4m72r8wytpc3s3kf7b05d7aq6m3q3tpi07gapp5fl1obh',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '08a26543-4686-4000-9f19-5f6f30c920d7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735',
                tenantId: '3203f3b4-564b-4f6f-81bb-53e7bb4f6940',
                tenantCode: 'y7m7wgj0w1fwctwdx44gcyy9jq6pdn5mioctuqa5cpq2na6cx2',
                systemId: '7f1f5605-aecf-4cb7-8317-bbb853061653',
                systemName: 'crhtg0pz7i3qkni0yp8l',
                scenario: 'x6eyn1j6937z3zxh40rux8z39ngs5inaa5mc2z8hdsctgu6i4uojxrxlikvu',
                party: 'sbtnx1mgvr293a482v2y4ire0iqqtrbu13firi1yjjhe9dujx81a1z3s634ceomj2ryw8tpn1ovsoztkfahw4yt4nyfv9bmvlezcl45m2cm3a5ii7mg8tf5e3mn4ey25adrjhp75cks3ipq70a1mqc1gyeg8ihud',
                component: 't2rv0uur6hltu8fg5cr84gfnajn32x0yc5obkirvk1c2z8zgr1igng8nl0l5am3v7iky7zfayx9aq90zysaevzos7oajb73yrnk1sps2k4jg2vysajrxgylfrym0252b1d8ynhulbu898pugmul7tswtaq1ksjp5',
                
                interfaceNamespace: 'xj1ts0hzovzifjurf94k0olc6lghdcai0tvyst7oxyeg1l62p3zhht7vztoh981v6n5fj281683uuuuxc6xpdg9fpc0jsd0lpvgjk6jpz71lr5n4sydwjc66r953gx7urt1ovir0aiv5aur6e7qx75l9uyvicjny',
                iflowName: 'ph37u80gre4v6b1mwg9qthgborcs2xeeyk45yeb4lbv5x6odskdu0ltqfwzua4jp6a4y6jwgvjytrqcgh68lb4itqwls7khmo1027b52h9o5zb4231dwp207porxrcaqz6wfkgmeyi8szy18rb8c1512jsa85wq5',
                responsibleUserAccount: 'dch3rb6240bawe4grzff',
                lastChangeUserAccount: 'k7tz2kpulf0qaeuo0jfg',
                lastChangedAt: '2020-07-23 10:15:52',
                folderPath: '213ptulcd29x0qo9w7fxf5qx0hbvnj4yeackp8yve1nyzs94e4izxu4u1iamskzxn320h5s5h5a1z2u968gf0s4f0n4m92c24wo8ir6uw73suqn78muxcyoxdeop1cz79ktrfenzbkutb9srmkpdxgyt743j1zwugieksoov78gn2i617d56207sdwawjocj6k67yrntt6gvh8l0ba96zw0oiqtl9fr24oibzb54gwglgwxeev43nte0mzr5c83',
                description: 'qbscq4judq9qpfbeaxpkyrplpinnguagl8dt4xhpfbnc9tyrzk1aaw7ptbhtx4v5kc0p2xqmiur1842hl2z6vub5k9blvf4cymtwk1httd5nxt3zqseb0y3h5j8uk83o2xk1gqwvz6sf66klr180dvvzvvkmd8n6t8wshu9z4e4sqnn2xm3wtw9p1i0w3yt4l0gh447i86x5aab4p5ba38ep8uy6ac7mfwpzuzx8q1nid15mn3mnz47gmjf992a',
                application: '6alllv3g8t2oj3s6kquj02i9g9c4x9go8sbe5wi5cy9p6rjq9qfzgziir02v',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '08a26543-4686-4000-9f19-5f6f30c920d7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735',
                tenantId: '3203f3b4-564b-4f6f-81bb-53e7bb4f6940',
                tenantCode: '0nyawk9nbyd99aoe436676tfxke1u1cqvi93w9mr7ty8stdstw',
                systemId: '7f1f5605-aecf-4cb7-8317-bbb853061653',
                systemName: 'uxjdg87o46hu9nd29rot',
                scenario: 'cnzjbvr22ces30yag39bvhcxc9zj0o6n6bh2l9ykvfu5q2dn3cpt9ndzca21',
                party: 'y41sk38l2b432op31g6m0qp6idfs0vhjux46jpwz6nxec9akneret9l1zu5rg9lcw1srp3p6g2wf4h7fyvmdgd6m48gl5yv49x9bflm1gg6ui8wlzm1by2qyfy84fsa0ya4otnbmdhdiqzngnjwandn49hs4g1k0',
                component: '4xz2iquhgghcloyv5c4p0oqqnpjfe17s5rozekwgtii9hn6rudi4y2yymv8ym2w7glmzjag3vn5djhg2zt3n3yvffaqc0mre3d5xh1ysf1698sv1s9sia4bg3wlxkwz1vhfa5blvqw0x7jxv6k4bbohrqt0tyhr0',
                interfaceName: 'lblajkbc2i26bubhihlri16ag8vo6h6odfnv0yu81byjbde28gx5m3hv6a0asjtvkmzk359itlxrif0hrvwjxyujtclwm86cup7g98ftapuwkg0m941636youo9y8nq1m58dht6wy58kxlbtd1gyc53o82hw3u4o',
                interfaceNamespace: null,
                iflowName: '0nx8kx7u5sad0csbyxqv1pyj9w6hy3fp2x1sby3tr4niankm0mt9x36t8jbod9hwzpeoykawt2xettv6uz8ank5m6wg6713ugc1qphni2g5yxyl1qbq1ri6357bedwy20dkk1rtirvgasa5fqxx4gaqcjemqujex',
                responsibleUserAccount: 'vyycdi3t6rugqzbod1o4',
                lastChangeUserAccount: 'zbm8eq2rko3dyime8owf',
                lastChangedAt: '2020-07-23 01:18:08',
                folderPath: '8hqt77z53i9ezleu8l1wvh1mrv9hhbe0u3a2ons3dn4cr0jn2xjtv6gfufplada44awxipyivxulz94dvbfzzusxnxm0ogd0cal12fjhx3wc15fdmalys0cu6nkors2cbaj2hp4py3teiqch48il4cwiv1uwp5ayzbt3ie3sa9w6k66987vfegnny1lu6wzawyu9raacpyds7q7frztdfpxskqnewpnfpw4f9oybkv52skvj4ts7q9iy2jnpeyr',
                description: 'jw1cc3hfgbgzqct1dcgxsz733wp12egstcq41mr70iwzommkzfivtn8q2ox0l2a3irc2aps6069nsdt2el5askvvz901qlyef43tsuolmbcgzobq2gxsyv1l0wgxb8rizgmlmacvk3isc39qdrl9oyjbu82v2i7fl7nt4zzg8rg51t3v8au6ksk4z8sd6a70wefwj2rwhb7xxxv5br1szmzbdn1q3s9t7jv7gmf76fxq79zuq8ns9jfqk2z6lln',
                application: 'db1o317y2tcaqdwamfy17mv7h5ctcv31abds8s3sqpyvpcq78ysfrns85h1n',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '08a26543-4686-4000-9f19-5f6f30c920d7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735',
                tenantId: '3203f3b4-564b-4f6f-81bb-53e7bb4f6940',
                tenantCode: '96ajxk1uzdsycymxjd5jzv5szhzspgbud4r3qrwarg54vh4yby',
                systemId: '7f1f5605-aecf-4cb7-8317-bbb853061653',
                systemName: 'jgm6nxp0pimhmnwnojpy',
                scenario: 'ezed6lb9rgbtrdqsy25rn1w0knicizzze4up9hsylfarg5s15ir6c7mnggah',
                party: 'smfgf3a8hvgva8137w1h3vxhaxcuxy931g59tz6c0dx3aemjzo791q0nnbk690dc26rvi2lz0hs6usw3zpksnughhvnnc76j13iwhsgvedxd8pqmeb0cdrps9oqvyjpdj83kbu5e1oxsjtp6g3mnxbi2mzi8fvht',
                component: 'xpnhvddsm5d7mcdaxzgp43mq3hpjpmz3p7424j695a2f2g83z6sg85hxytqypmp3motp6grgtm8krtioy2vt1xntmxn8sy0eb4dxevwkkv5nvjgwopk5aav1jydq9bqdfeizog50zwb36py2mdc91eognbepsrfm',
                interfaceName: 'hrrwieamhl3i2kxxcik9lqskwbun63av9foibxyg1dwaoaaweg4l7mizulj44k6tajv9han059jxlfdxbv588t2kc7t4127vcyidiatgq979u9wzl72iyig8tb0885wij3suwsvvbpxrnsnpd92obh2jr6dvt5xa',
                
                iflowName: 'y7lcuw87e33824bjrpqhw9e783f3rva2qap0dbcfbz2zc4c4z1decfgi96j9xao7ibuyof2ilf1y2tf196uwl2gbyigpdrwogjxjtlpjcud5ssmox7zr9pvdz01cqxoi0enkd7vf42jlzp2h5gbguicmsrytku8j',
                responsibleUserAccount: 'pntt6xlyv9uuwfn0aw63',
                lastChangeUserAccount: 'f4sz1he4fvna19cpyv4m',
                lastChangedAt: '2020-07-23 04:23:27',
                folderPath: 'sh8rr81q09fccsb60zqbh4mnlaw46zy4hdlgr65uapvf4tf8b95bx74jov4zj5xrlxdiihxucr0wwht1s5rqz0102wox8zilk16m6ohj12q9rj607g63q6guu3t56v4nc4v4ysmm3v10hqyig6vf4y0bjnmfffvvngnz37adi4iaf316iep5u6mluds4y1o1sdptxsn4vc4dpogkgqbmdn39q92riub6he8zlb57gahvp206m4mvlf4zes007u4',
                description: 'axk4j9eve5dhb27je21t45co8ll5kqdogfw4a1edna1i7jlpj1c9q7zyb2hbjqwnkyz8o6iqlpfjog9vbdiqt2rbxwa7k93snr737cu9d5f04fbp83buvjvis1pfxnejl4o7lr3hsw61vtt4znhtyw0pdu7dnq0r51c7lbpm0grhsmaqpvp10e8ckyhu78tx9ra3bmqtno4f23c6z9gppt6qcivftt6my36rlgx3pf7pi5uao18u3w6xd5d3xew',
                application: 'wgu2hz8ykjgiol1kbtnft15qaph8ty70qoozcg83e3g0bl7reeyjg7x0wnjm',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '08a26543-4686-4000-9f19-5f6f30c920d7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsCritical property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735',
                tenantId: '3203f3b4-564b-4f6f-81bb-53e7bb4f6940',
                tenantCode: '6os8915eexbjbobfndw9q25rjy9w616djvtt8ijzup2udiye85',
                systemId: '7f1f5605-aecf-4cb7-8317-bbb853061653',
                systemName: 'kdne2leto7tldd1e39wi',
                scenario: 'd0l28s9g6v4th97dimi5zwpxp5yqhuasfbgmki5bf7dafvsoblwnzksj0w2p',
                party: 'nyyhsks1f3rg3nts2szc1w6qqyx9gbg12vraxv7yc0bk4xfemck08qv5f59dwi8qrxyu0o7xv187ug58obhlaw6ra79q0an5808aitiwx0xvdxq6335cb07veq6egcxoecls80kyms0fdpuaetkk6bncc7t1n0sq',
                component: 'modgixhgudyke2pn90h9vr56pgkds9k8pif6n0ob16kvyrr6n5l2nd4gbov1k7fc1vyyzmm86ado8zu8jrth4usdq7v3l24h1hh9lehnox20wdjs4snbiurj6ft5fsqdjabuoqye5ujuc31fb9jva18dau1jkjba',
                interfaceName: 'gcb5z0e769lea722lpv1usrko14ysu7yulw2yrayv3e032i755cf3njxlxev3xry4aji4swe0p33w3tue7cx459dmlacxgvss4mylbt1jsw6bswmedkrgfgkhccoyrwyfxrk394wkm4gf6t0ek31jmv32v1qyxwn',
                interfaceNamespace: 'hqdbrnowzj1zrnoauk3orbnm7inx1bjgwk9pmh9bupbnao3zionwq5dasqu1xoh0jr7v7a5yul8j5dx6vstv4i1mjogis9evnwdxpazezpdnopaxbi3hly7u19wjx9k18vj59tu4l5boj4q428khqvxz8ltndz6n',
                iflowName: 'h9c35dozsz6pu1d6pwkejqvvztgbxxrcocptm43j9k5efmb0upe4fe32p88f34vjhbx3yq3yxzpj00y7wq1caoxhyeyy7vac7sgahshp0bi132t61sqwyzpldhr31z2mfitiglrwsqe2x1nu7u33t4fwrls0p0kf',
                responsibleUserAccount: 'ljrsm5m0m5sqt3qy5rs1',
                lastChangeUserAccount: 'kj59jyg3smlecv7495nx',
                lastChangedAt: '2020-07-23 14:50:09',
                folderPath: 'pgw2oyg4uxxn1j6mqud5vmb0vnhjnofou52bbsrvjt3wemn7vkug0g8fzzhwk0ua82uxemvyve6m2ct74cpu7ldngxzdfpsgqhbwk22bhzvt5xe82s5127v28olnu1c67ncbnc84p5pxzeekn37q09uap6qacza8c8h6f7nvfigcxokwv2csgufoohs9d3kzrvqhrbvonvi3oys9sfd32pzwjdw78atl8nbj9z1qkx9us0ju8unr29ztzc1itln',
                description: 'siipsx5n1q5esq8e7icz74qksba4m85kot9zj1ykvxfc2u7o1b3eo6dbyrwbmi83cs1eevc1muhlbq5f0whfxillbo0r5bykru5d56glom5ppk36i1wk6k8i5xyn56kfx8o8vvwtaaiyet3e7uye9pdn7u13jcyd9k3ml7f2l3aqrp0sndr5gi9uiturushaodwr4drjdl2qptzdhp62it3y4ij38sl8uejzv1w6aq9t1ozx1xz4u0kzju42gk7',
                application: 'pwnah5v4ili0r3jma0e02sfl2zrlb8sr0qy7mbl3lvsvdze6xvwyo18kzx3j',
                isCritical: null,
                isComplex: true,
                fieldGroupId: '08a26543-4686-4000-9f19-5f6f30c920d7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsCritical must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsCritical property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735',
                tenantId: '3203f3b4-564b-4f6f-81bb-53e7bb4f6940',
                tenantCode: 'xgmm14t8wkn09k3s2cuc7hz22eisr9kbrjkrmcubltrkje0y4x',
                systemId: '7f1f5605-aecf-4cb7-8317-bbb853061653',
                systemName: 'g0904j3z1uzbmf4hsk7i',
                scenario: '5ulw1mzau6mrc749jwwbmv7edzxuwu80gvemtqlsmscuxy8k1n6gsnaawtt5',
                party: 'v5k2wdacferdecvosxp6f66j94x5q55jv07nvlx7srjhkwa9efjkcpyy7ryijh4c4hd417ni0b5fcz7v9pmsc8dnukm2189gfeon9ww9jf4oxp1jfk38x2eu3vundn8smbf2jwk1stg33zp09oeg6g84v157z15d',
                component: '7pgcnep7wdzh70b6wxtx3rkzctm7pwkddstsxq39fjsj1z09dpx0dah2uea2x60muvo1dh4hmnnqjxu1556jni31x73guuk2uueym95jnkmtinwzgujbgolz31hz23grixghu3dmpq3k39im8nc65fcbo4aokbod',
                interfaceName: '4e56hmlj1ttdeio2jf5zj9rryayck1w2bb0z9elvz71kv3wqkjuvhubz4jqgvn3f7if6bd467xy1ivgv3b09hi7u1vf620mdpwfxxrdr6bjinidq7wr58q2bp9fr8hst8wjhoydfdd4g2e94o0hez3q0iu0ik01d',
                interfaceNamespace: '4qf09d7g8b9lfj0tszxo5jildo4ld6isc89oiiy66fhqv0pbmerq8mpee315rfm44l8fpdygfcjypucwx0l2ozhgrsgpemelsd12f6elroouw91yqe1iemijtqjkt3bqxr47xtc44iobg8w1qd0gpphhfv40564q',
                iflowName: 'dgkjq1rkc1p44wu8tx3z02iv6t9k6k5le1arlwsaf38jiriomuapdoicpw87ok5n0fqe5to65u4scrmmz1lycvm8vvq619435o43sa9la2kipvorqwv862d5zggqanc8mca6t05z618xght4yg63byo8jb1s8h97',
                responsibleUserAccount: 'cqtij9dfzpikswpfg1ou',
                lastChangeUserAccount: 'i4yxfio22lkr81bxuvs9',
                lastChangedAt: '2020-07-23 05:37:44',
                folderPath: 'lb8vy5iebycowisakg7q8c49rxguzxadimh0ljstx7ap1rjdtl8l2ddd8dprohfj01vt2lubcywnogls47gdra3x144ewefjjfme7qdfh5okk9i10ef8x0d97e3n2dk4pd8qlbz8rv65twgz83p91j50bzj03vgm1hgpjv2vqsze2yj3g22g2jvyjqv5c8fss9vkesdebluq3fx11my127miswfgrdtnu06rl9gmboqiq3vz6ygud58s0t484wf',
                description: 'h3jekubughbur07n9ylr6g5z15k15sdosh0ie9g3yxej0qua46bhbhi2kjlgjuelnptnssg399lxoh2zd74x66a9w5xckqp6ku7n1yz9uduf8k8wpn7rfftn07ark3jgvcs5ed1k3lir7nrz3ehxi345qic6hbqdoy78qcr4x0f5zhje6d1nkevt5fhy4dgvj8l393w1kxyj1pgyy4qtxpve7zej6quhelxn1z9b1sx6ga6dlaqm0j020wxszpx',
                application: 'b7es5su4f5ava0dyqzqpcgavon14acywn6766dam8ot7u0c0c1bvfw0v2ppc',
                
                isComplex: false,
                fieldGroupId: '08a26543-4686-4000-9f19-5f6f30c920d7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsCritical must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsComplex property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735',
                tenantId: '3203f3b4-564b-4f6f-81bb-53e7bb4f6940',
                tenantCode: 'plhp52rncf0pf6c8nkre4zemkrbs8kcuib2q584va4jrmaxmmy',
                systemId: '7f1f5605-aecf-4cb7-8317-bbb853061653',
                systemName: 'lgtuqby3lpey61ew9oat',
                scenario: 'uqee6g1dv1wejga379148q1cjuzx9n08ssxfadxq6tk13rxzqulsrglyk7rk',
                party: '5tmp5r0ycuhojsjf6e8inutskvmr2err5t8oa8onzl68ifxmd5we7wntymuqqif25l6635k4qwu7gqu8ap4k75xr7r4wg5kz9rn9uhzznpmd44val6eqtngetv4hac4jahbg3riqpewku1ca2op2woh33babnuqy',
                component: 'ux2efbzfm5t2xm15kukn0gjzmzkhuf9k3o9yl323jrdwi4v7u4nzda4wvugz9a26air6shcrqagcgygu55au9rbwf88568qjtudrtvpk04kfnkg1fpu06bk09m2eftpao7yek5f7ywom2lg304dkr56b89hg7jo9',
                interfaceName: 'kb5zd5kprxhgnq1mx56bblk1ublk7gw7cvg1dlj4g6i8ciifoq809xv88r8bndjipcsliut8zxythd1h0nc9l4gaqenalv1f6bzlkt7dtl9eqjr7bhznmtcg563g6rego6vt9915lh3wzyk5ttvxqj46v1uztxem',
                interfaceNamespace: 'gwu8j1yczufdyny44zyc6hjbsxd1sncn0ki3mkbo9xyyemxxh3hanjnbixjht5kru9ylibq79qyueen3o25lafsqb832onzlw1qmjby190vqfb1ccuq2zgd93gnxiyhbys6xg2ji9vmdeq6mg7l64xflsgop2mmb',
                iflowName: 'htj7w8zx827kb5fder2hnrhebqwf75anqph7g7sxekgg4cfmqbnxkhf7jah7khmiihq0ife0mkotdvhhzxxvewmzpqd1jmf5toeb7yo0y4hva7zwc87nbx2es28kld8si5fj8jxt8a27x5p7gk2e1my79ovqzrdp',
                responsibleUserAccount: '5ncfklnvc9a543aukwz1',
                lastChangeUserAccount: 'ltyapz6tf3ap15ufvbgy',
                lastChangedAt: '2020-07-22 19:02:14',
                folderPath: 'xrnalngte5b5nsyep1bkcpt6ggbw57pwd2t5it56xdbrq42e04j1ug4iws67w2it8c1t1kymapggh4j5huacv66jjkwbvkaw3bqoqdr1aun5lea2btekaor2ex9sxyt3uytqznah0h9sn9bqp4st0af3fhvguh316ibpz5ip8xmlo9kt32wzn76dpj7et9hvu6z6f0scfzy3awo5606ztmmrugkn685nqwzkih4w01sjne8idipgc7atzrdfdpd',
                description: '2woeq03mfb6ch67fwln22vtm9lwq3v95lpy0nov69a7on0ajcus33nqz9dg7godj20otzon9hdyuhp36du2p2s9b9brxdd8x25r6t3ov0rs46vnkhbz13ir2y5ja61x36ixssj69qdxr3nj8xjp3yy8pmkh1w5gyi01ant8to5nn0be084n8lndfa968b6nl4ol0vprzckma61wnal5m5cxud4qvep50rqss9q0hf5z6oiakmg7y9pxzvyeiez7',
                application: 'ntxj1ocverkdgg0n8swq936bymkjdj08xlvvy14y81wc6v3tqtqh1zhnsw00',
                isCritical: false,
                isComplex: null,
                fieldGroupId: '08a26543-4686-4000-9f19-5f6f30c920d7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsComplex must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsComplex property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735',
                tenantId: '3203f3b4-564b-4f6f-81bb-53e7bb4f6940',
                tenantCode: 'a8u4xddfg8biz3a3njtks1o2lv07ci5xwf17wdtiuodhyfuxbp',
                systemId: '7f1f5605-aecf-4cb7-8317-bbb853061653',
                systemName: 'g9nc6wiuasbcwrseezl9',
                scenario: 'xchm19hvhfut0012skgn7hi2mas60ez8qjnmk9q75r38t8opccem5rgydpe5',
                party: '4cqf98sz3d61y5bttaaeyv7m4ezpbyu5rqlips5pv2kfopes6l70eyxzvc0umpc744r5s550uvtvsmov6uzajs6ty7eb2zfkuk89ia0vy1x7cqnw0g4hysvkedyvqq4mxk2xuz1qo0hi57mkoca5zojja09ujbmc',
                component: 'rxz3bw6tzjaccz6z1swsbar7bsfqc99shsrrvdi8gwmby2ieag66n49hd9jm9lcw0rb3wdad35ep6q4ubsv1wetq19j907qlhmbcmjkg3r8sl7jz8h3k2plrx0e78lwm3fs53ebgo051cnu1eljpht3x1olnal7j',
                interfaceName: '6e6jycirqpzc6921dj2cm97opb4z7orm4swgq8182y0bt1tbmp2fhftk5hqyu7ndk0amz98kammzslokflnjdrtai8m5ycj89k2urfocnqul10m2fimm1athvd3pymm1mdvfdigqugtihvs9gquvcxzfku4qnwtl',
                interfaceNamespace: 'khixcmatvmvleoum5smoq1js2gapmaxg6mpu2s8rssn3hyjx07h32rngxkvkit54omusvsdomnusb2666j3vlq5slt5srdfpi0cpk10ndlp6u9xdep1a8hv2pmosa2vx76j3azjeavahaduu99nkmbee9oj8w3ic',
                iflowName: 'v4b6h9o9boolrv0nqaf6lqzwvm7yi735cllqbs6rb29k9ovnlggrdswkom3yeocz0s04l6hxv1g04qvx9nxerxguj40xp8zy5ws6471c3ufnt9ej31pavr7r8ewjsnmt6zsa50trf8esf1dgnqhsjmfu0syal5ln',
                responsibleUserAccount: 'hjhwtq0w2tkiir8s8ntb',
                lastChangeUserAccount: '1khxvior5z350iheui9k',
                lastChangedAt: '2020-07-23 08:17:06',
                folderPath: 'xghy3khph4n9a3c762wkt68l7vn2icemgz99e8ydr0c7knlz0jgtqbmwckgv9pryf4owqvjy93czgcaspak9o972fi7uwrj8oj1moayebjaht3bronfh7e0txqz80eqyd8g60lc401u219c3mygkmgxilnx570jkw543mok9j87ykehanoohv3a7mz05sagfvri4ut4lgi61ut18n5rlu6vrixkt6rgnb56xqkwhmjcflinr3hds7vuzirw8wv4',
                description: 'gkmi7fd4yf3oy9phb6i2sca3xxn9a7j9p12k800rhckevmiijjcxs3rrmqlzc1opkrd9fdeerdufedt9w34yba2yqn05dm85o9na9g0vkzf2ogicar68c5ipby9g7dq8yu880nn85gr9h1l2b1be4ibqfyp9652a2d70o4spz54xycpcfzgssg8drxfbq0902lklh9ct0m2sl877i4nkn05x0n8zxff1u3vf2cozohzkjp0kdslgm64egfo8df5',
                application: 'bd2qf2kf5s82h6ztcz842cw8h8ij8r1bvmkky3pmtxd84g5hxd8iydwlmync',
                isCritical: true,
                
                fieldGroupId: '08a26543-4686-4000-9f19-5f6f30c920d7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsComplex must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '2c0wxjd1lmed77ubttdwca807nodz7wuarmwb',
                tenantId: '3203f3b4-564b-4f6f-81bb-53e7bb4f6940',
                tenantCode: 'f4ilgrdbza1u9nstmtw95sujc6ai6qk5yk2zdzwpt4ekvc2cwd',
                systemId: '7f1f5605-aecf-4cb7-8317-bbb853061653',
                systemName: 'ylymdc50nlnz0ey3vpaa',
                scenario: 'lr3z8cs8u1on01vt1q7j9425ap5l7a706mmfpxwty5hf125lgjs3ngc39mla',
                party: 'o2omx4qfj14dvkazkzpy3trd53pq84abbyfpipqkjcbm95mapknq9gx6jkumwiouix79ebre04r0qv2648ow9vnc9cbevmmuueitetvfc19tdvrtplombxd15djdb2smmom9p9z7fsdbbwgmi5fnjhk4z69e5zr2',
                component: 'c7oj1ia7t7nmfuq6ekjoy1b4ajqxzzrww7rpxcuu3a9vq0d0rldhmyv230s3ow4h5dgo0zaj7gk9ltdxglfmpxh6hp2khweolmgifl6o105xxfhoie33q2sw30mzp8yo8o4b9knzbxbdkdahl18r90o12djqehl3',
                interfaceName: 'g968aobpn328qe59gmsx0t2iw0j656kysy14hlvduiysw1idozhioqv71wd9yy3nsefupadyu4z3hmqt6fh5mm81k90q9dtnqhq26hxx6m6rijihlo7wjps7d7zmd6a4qxwnymdu93rmh45o1sybgxu2lafslenb',
                interfaceNamespace: 'vsuo5eff9anivv9ulvw6hin0p1dpz3udpbqt86q4h8lebt3v67aed1lk89do0g7jfh3oa6nd8rh4aqxvdlio281w9r0z6euumi2cco13bh6esqdcnm3b3mhdayde2cjwqjr4yxjy57xxx9mgi2nyiio3ei3f9xfb',
                iflowName: '30b9unuttym4ahqvh4st0x051ojfm77deurs3mjbibzz50y0qs1iw9jr77nsz35zd2ucpxrwxtm5c3mci3gz49pbtti5k739zvsmygh4uomli8v1a9zte0sojm6bluf4ve55nn6i499n3xqdrkepcwu7pnzkohrt',
                responsibleUserAccount: 'yiotl85v5ai2tgm9c6qo',
                lastChangeUserAccount: 'paadncrf5tysy548caa4',
                lastChangedAt: '2020-07-23 03:57:15',
                folderPath: 'hxv9el79d9v9153edlgy4vr09su2rsjpekehwkc7ey1h1we3xvtxr3cki4wag0fr3zgi6thvob21r8ses207brgyivqbs8nr6u6p9i7eh9g5x8mxy4o80127uhay5mo50sjrivl2gklfe9wi2mlt8ka1ebhd22retswysft9w9zu9jl99rbzuowpm8meir9v02wx4t0d2hawl0fycutm999cae0qy5debvqankndh03ttk18b2kbdj7zg8w4i4f',
                description: 'lengj6phmnfuxqo384h00vtkoicn4yu33n4y4mkb389fi1k7c26d4mshgya6kry3ug2vsdbo8ji62x8s8b6c26qwgkumzz642a22oplg8my0g3owrkemtj8bmsu6toqkcmkihwts72iyslaoc55cjh0ljttze24002zyytkdkl81joulhk93nrrexcff1uck7x8le6v8cagek71i82jzwl6p5rstrpj8r176iuv3av6qdcktw3esphe2hhnko6b',
                application: 'p0ugiihtxi47pnl71wm0wuox3ryeneqff8njqm1k5hyi9r2er8piwnqg31iw',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '08a26543-4686-4000-9f19-5f6f30c920d7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735',
                tenantId: 'zkvwurifdc8b6l9ns3lr0av0g8nt5f1bbfm8q',
                tenantCode: '13xt6372z2ghl86dqjt4hw172kwiiipkbaxfihv10lbmj7r0f2',
                systemId: '7f1f5605-aecf-4cb7-8317-bbb853061653',
                systemName: 'ferzua0ya9x1e2wieavy',
                scenario: 'ax9u893y813ti4rrimt0tw7kutj518vl5399h1pfxrfu38izo2ncwug0pxu5',
                party: 'bvih1novi9uoryd8qn2kz91pliteusrvmfhcv4461fyefo1z0k5byit5iqnw1thg9g7x9dvpprxj9g56ek49mts28itcrjp0kke4pqrzw7gevwb0ifixp5rkynt0nrei19dsbqjfkb352pbrqxle3mphtcumljet',
                component: '89bvxcwzrdra0upoqhkylrtu83iz904eewzjdveouk6qddydjamsm2oqsh0lct4jvrj6bwpzia4ngh7mqp0s72y9di4a18iac7y39csqithts170k5p26336lkxkg9jison8m701ht7tw8eq6ibk2xvx2tpe2ser',
                interfaceName: '4mp3r7dlhq4ly7dhud1n6unqc58o5oej03518y8882f37kwzqizhrgixg7ur4gbdq9ziaj32xo6hhnilxd61xtkusilhx9vhq69ziwj6nsu5uh7lw9czacot5ewbsiw4waphqqd38ab1njl1lcx3cybk4bvtiaah',
                interfaceNamespace: '7ke1rch3bl6ny7bum9i2vwn5dkir2qd7no5n9te8s44f1kotn2irr7o6qhhtgfenqm09fgxlzpxvy72t9hhc7ds2qac2yl5c5bfo1ync7sdvz0isjmpvh8d9f7w286p0crr68egwksvtlvxdvw6plffneoeoe2aa',
                iflowName: 'm4bana0dr6l99zvhlzaew3k8a168gicagxdd65fwr4yh0p1qfqmye6dlfreew8efn68zcu2njwmrddollrxl9z4hwwooygr7uvokt67jd9j9v7i3bgcoxy8vd9vzwec49qkbt9194doq2uzwqi4r8qmva152mv3v',
                responsibleUserAccount: 'qv84z7sbzkoq3f9xxo1t',
                lastChangeUserAccount: 'o024vnzzdh5ycql0k03t',
                lastChangedAt: '2020-07-23 04:20:52',
                folderPath: 'vm8ccrtb4fahndzundasthpigmv831v5iikeqrmfhmxoi6f7ea0ig8t96l5oewwkhn23gfvfkg0vpdp2w7t86ukz57ihwd24iuigu3a8zji7qyfpy5p8d5te2u94ne7jjlwq59n28o4wz83utl9rmpigtx4elxbvvzsse6clmagsw4t747ze2rwa0e4x7enbomotjwk62qltow1epyvddk869dknig9xi3w7i3sgu5gxwghhn4f0eeak6gmsid6',
                description: 'yu8nl7132zo0bg8h49rn6xjm1as6bo3g38wozotctfcp882ebzvyqo9sit3mfctiqb3fps2xg36ci77s3zeaomnq8om5d6svahyvh80n3mw3q1zo744ib8ekilzx84jhblolh3ouue15hsxy6531rxv0r2f33ou6ker44x9i6fqr86zx28hwf84z7dzhfwlgdvuk5nt97x7n8jq8shncevlit0fb36onlrftwtwwsv47vrbuqv5funypfcajqdf',
                application: 'aj6bvdiqau7owu8o6wnbj0pcb3fnc55aejc1dofypt0e80yefyjurtov87ye',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '08a26543-4686-4000-9f19-5f6f30c920d7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735',
                tenantId: '3203f3b4-564b-4f6f-81bb-53e7bb4f6940',
                tenantCode: '4kpijfi41s28kguzltw8he9id3fzcw0aksav2ei92gr855c9vk',
                systemId: 'f0k8fs0v5uvdhqw2mfa9029g2tzs8amhixo4q',
                systemName: 'g7pjh6e4yf39hd94b40d',
                scenario: 'llvclen9xdxd17xp3b9cl9cw1bnykkx7gizbwzgg4re6alld8ln2lmdyo21y',
                party: 'riwdzlh0t55i14w2202gsayzrwe5a0j1geqa9lzc8f3zky861qdpe3cjrkop6j52qvb3teu62s1a2d8svg5jj3baovlw8g40bcgi2rn7o79bm8uuik26xpgx85z2kdwp43kumexdr3mvluapr06x7j5k9d2eq9l4',
                component: 'vmx924v0lgmfk4viqimzv9girtg8s81skptuwne0bxbgqperh2jx51aqnz14t1ell0pwxkcq7g75gn1uyvbjcvexwimo0tt3rz31vsthpp9wsrtvq9p5a3uip9hs3dvqr4jr1ux7zu7fdwoo791x67xlgzb4u2l0',
                interfaceName: 'ahcp8xq16qkp0sgonhbzagrwzzpgv6jlb7f8ihq3z318aldt9tg70d38p9jv00gpfb4jzwy02cn7bulvuxmr48hix33u045psh6ld1xqsehoa3fs4eak1qbzsleu2yce1yhwru7jqna60ms8eledm9tfbs998nsy',
                interfaceNamespace: 'fk4b3fd5t6r4pxc03vt25mio0w486zzjjn808241gaa4zmdf1uq3wwr6ya268bptsugiw7fs41lad4zwrq48322ndb4dvp6xf8dtdw52dtlhg1kod0ndiiijujug0j9jv5jkez8l8vf146a187f7pg7l3ay6vq9t',
                iflowName: 'ysi8xm9gaywe5tsyjv9oatoy6r1ifsdqr68n51hfv35gzz9whxaylse98k9j89q21pi8iodwf0vq05z0xac1a4ez2n7wvh454jn9gr9rucjusmuo4rhb78dqvj0ixylkyt34vxdhrai882u8vcrz3dksvatapbpc',
                responsibleUserAccount: 'ei31rc7fuvblnd15l2pp',
                lastChangeUserAccount: 'taradgmu5kz6hrme8ttu',
                lastChangedAt: '2020-07-23 14:36:35',
                folderPath: 'c88be8t82hsqiwprqqompn9gvur69nv6kyvx3ypuwzthd51lylt3xwyoq4v55xut32axr9h9e0e4twjhxwgr6823dd7zjpn3ukd9r05k74tcqpd0hi30ftogeakkkxu48nniqt3guaf2x55kaf3wfh0nnh4oednkn2azcyiz92cvmvvod3cmeq4b305rm1ga0ua8q1hi1bh6ywko34cbsudorn6oircqh1lwsw8pdj69b3ux4ee1l354wrjf0cj',
                description: '7wi525dw28nbq33a4ehgwne729932fndtvtulwyszerctpgt1ryle22qgomnlf6caee9gs6gtiz2qbp5ddwsyohwhh20j5aobyq08iotz557x0mlbhogy2w4swve1wu4tvtel140nnp27vwjp1bumot6ymy92dxpy763fqgyk83b5enh1e6gdj6arjvlpmmtndlhs1dqmpshnnacvqz9bwltbuotwzrybl136gnp4kzk38b1pezjo0wp5fkvcq6',
                application: 'ox46nlcrxftvqlp92hifz6r17lzdl0u1yy00ekmihhk0u4q4ah2gkb9aqkub',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '08a26543-4686-4000-9f19-5f6f30c920d7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowFieldGroupId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735',
                tenantId: '3203f3b4-564b-4f6f-81bb-53e7bb4f6940',
                tenantCode: 'v0ohhpkvn01thyhklv1hbiipi4xsnrk5585551tnp9w70xdhg5',
                systemId: '7f1f5605-aecf-4cb7-8317-bbb853061653',
                systemName: 'fuhvxhtabbaeb0l3tpq9',
                scenario: '781tup0a05pmxhjp3se5x2jpkv9qsgh7cjsmzsu1sf0f9d005y3m9307ep2s',
                party: 'ewgfh1jp17fqwc62f8mqt28tq8hpu7izwqhxuq2phveyxhwly3uy88il63onnxpj05xcck6a4y2rtlest3ypsyul33a6k2uvdgf64242232sfz0n6hu3o5nykmln5uuf8omcbymvbzbl9fio99d7u4t9ipci0524',
                component: '9kjj4gvvx6pjast9uwt7nkr0isr4ptylks2gceiiqmd4prkoo5p3dpf5m6vgzoh4n9bjplyk0mcvz4r9fdoq36fu63epmqaqghioqy4pn85khiavv5hx86nasga4ipjwsi6ienzpl5oajxotd2j90l8qnfem8vik',
                interfaceName: 'i1c1pg9tmi08xtukbcs8pl37f3unxtdx7i2k696uimlkbtiw6d4ntn8ezej71wx21ozuniu5n0muvfxi6wc0yfoer1gjctudkx5ww6bk6lt0vmm05vkreonz56ee9cnyuolj4ig1j97bp7a10qnt6x8zd40xuf8k',
                interfaceNamespace: 'u8myxl45h9lqhfg1w14s6a4rxnptda4w1zrbcc9pvli44u5prcziw0wrqaoxg7f2tehw70r7su2rnkgepyussl9lu4yyn5ijswyyr917pl1xgtk4nxqgmevmfmeyi62pgmnc2pge13vrwsdw0p5rgmbd7k7pt07i',
                iflowName: 'dvrfrla67b5vsvecridut4oyokvj3y3bmzzklxqrpylypte5tpbuf7ztxuqi8i7k2qt3vjee7vv7txlpt2jq38zyzz0z25tzdgxsiiiiid40j7231qnn94nlj4f5z677gwi9pahiljei47qyfg1ms4fs7egei998',
                responsibleUserAccount: 'skq4zjxg2s94vmixp06g',
                lastChangeUserAccount: 'z585v6rmfbl0dsdzqjqt',
                lastChangedAt: '2020-07-22 23:31:27',
                folderPath: '5g5hnh5cyvm5xcfou7pz1npuo3tj2b4hx09z0jl7r1ljh6n2r86vdwtkajz4tz35uh5tbtftnqzwa2vlcw3il4dx6ta615zwyj7tobey10gc5kii3tq18kgwd280sftes8mpaptrtfzudoaf2uwpqsj51gzxra8hvpgj38bxczwfr5e2wqzxmsgpogmcv6d70jl5kqngqmr529u1qkkc68q2akrui7awhzxewx1180uk9u6n3fmzfw43dr0qdye',
                description: 'fbbyfrt70y7t1nxo71haj0lii0i1tn9wnt89c92jxxkki91b461i2nvu7zcyw4aprs39qgojhptn1teywb7fs4ercd3nx56xit20wducfacxjshuljzzeekv3ww8c66mzb00q96qqnotjxldk2udrcd6lbnlmgj7d1hkosu84ynyo1zkl2c6p6rabuoode84gu0f2bwop8hth0d4f8yhbr99ezg2fvx88bcop1obe0e06e1xzws5ki9gy9hqmho',
                application: 'qpr1vq9xv23j57ppbn4oigtc1jy3in908xw2g3fhya44rjbwd82mg826lsk3',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'qojnn353slu66icq2kq8phx9ccw9jv9kkecpl',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowFieldGroupId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735',
                tenantId: '3203f3b4-564b-4f6f-81bb-53e7bb4f6940',
                tenantCode: 'qfixz6oapmpavd6zqq10dflqk8wxz0rqas514bqzrfjh0c4l8zw',
                systemId: '7f1f5605-aecf-4cb7-8317-bbb853061653',
                systemName: 'ag3xokcwhcj0qnjjyktx',
                scenario: 'i63uduknrme9fneaws4w8gy4s98jgi4486y1y1ahybvij8qx89bvpq6uaq0a',
                party: 'hkd534io0gaqi3v7gqptvusyade8u3g0ph0a4v94filmwjm01jb78fo215yau4p710cd222yofjent778uyx2ftd2xwy4w3frqvg3kcz9lvywa8ovrpw9kfg89o9nssdcarqpj139foa6ratddxe0jig3sh2vg4g',
                component: 'nocqhitegkae0nc5uq41dnudwy9wcokuw3yb1iilwmbthzei9kz1tydy5oiyd8yuoxggaiv5cbvabdnjry9vpnqq140yzrwsbl5ssff0i9qa4qvt4jmr8bcbhvhxc7tjlwkf9ivx3jb07gvogqmiza0gzqxdiaab',
                interfaceName: 'zgb0c6hytiz6v4yac6ylzsn8soy75bf7976kvz8ovqzwyi1wxwsqfivkxrpm5jnwk2c7ovwh1epvzqxv7hk5tpq19nzn4rbhmy8pt5w6698klpiokinnd7w8cfrjx5e5e1nqm0fkyw7ufru9uovcndxuxl94tg0v',
                interfaceNamespace: 'cpn3ot2xm9h0m9arqsy03w3pzwgr9cw4szgiq7syyt60uvc7e51erpz5n6nnpdolv14ck907fasrimsg4n8g8b58wb7iz4atibo91exdr1peqayzit27n4a5b45huszogqeo2hyyaxa4o7bah2iygufo94lxr7ni',
                iflowName: 'eewofv2k214xbfmbvac8lfwz4fsukx6pe1fc8dbkwoesnbhk9a49rhy9od8x0jlq0u4iwwpzierpwet608017fkis98vyieasjg4lk043ptix1pplpdnvqaozk0szp5rj0qsln4upuptq3gjvqar14m3tx2rmyd7',
                responsibleUserAccount: 'su0uqfdsw2xthrfpaq37',
                lastChangeUserAccount: '0kxks83wworq0zgwf8zp',
                lastChangedAt: '2020-07-23 17:06:40',
                folderPath: 'yljqa63h2iddnkz3fotqzvhc2jxqjud6f5vsyex35eaxdw8wiyu5b8yyuj43kkyxa75fico3f5hqwliv62odwgu8pytvjfblpxytj5natos0bbwl1ar2w0wla3j31qwncps6tohhqwvfkaztz38lgbqj3wur1fcncv5qjlvi9btmik12fzh91vk4demeuvtk1bdjzssyqhwhhuwadv42oaovdymhgq7w11iqjoq1zdgs62r3qxh3ypf28ogy814',
                description: 'v9rljg15enavntdvt6y3ty6fdqtfy7opdcrvj4cnxttr6kgabakogh2cp8rfw8t4vu2kl8sk90ep53yfo64stymypvsnnf9z4seiytm2bm4kabsuz971ihb07v4z138k6wsmlvb1vdj6y9gwzrpuh05pb2kgsd2m2wyheoxq52kc82t51ffqumsicgzw32299khn3cdiz42vkpjvbjn9d3t8aieea0lxr7vg7dpol37ne33wazb1p86hwuskw1z',
                application: 'z129y05hnr2s5hd4medrnhg20a4evqpj7c7ane8o3t2us1ugq8gfzz4ijbr2',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '08a26543-4686-4000-9f19-5f6f30c920d7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735',
                tenantId: '3203f3b4-564b-4f6f-81bb-53e7bb4f6940',
                tenantCode: 'puf2oa8thzx99gfrn0b0bmtnly4klh9yyd14c20dkwxe3akkm2',
                systemId: '7f1f5605-aecf-4cb7-8317-bbb853061653',
                systemName: '4d5xhwfxd92sczz649v99',
                scenario: 'xwo2chki2dwiley2so13iriozcfkyb5shecj45145mtffd3nep5fqierepgf',
                party: 'w8ad8myvnia4m5aspsdnf2ta94s7h7phenqlvfvayh4b9hzfi9wsf2n3jkvo1z41m1ry8eyzstzryj7goagsivmglhvqxvpjofl30kzse7x7o87hbfwqzun55xjx5ox0ptfcrj5gj2tedmgp8ilszjezms6eb44f',
                component: 'bcn8d6ssrvg6j79yd3iv06eczxdbhjdkfpptfkkfukpkm1utvb5wcq18lmyvsgd2assrayc9bcb5yq9rbd21xlnn02k4td0r768kae7lqthflpbu579ayhle0ub7iwh1u6mye5hm95ymmodejf5bi3bu1vqyt6q7',
                interfaceName: 'hzrj1dvzxnwq6pcax9beeykgoofkgqpc2nmcd2dzh2jkiuojl81488sqfk6szxom0q7vcxoqr6wyvk5801h501vcpwb1yuxm9nqxivqddazuzh8s3r3unxn8w6d99ec319zai5ulphblzmjcr7eofw75myklssvu',
                interfaceNamespace: 'a1j1ly9cfbauw0kjwn6j9jways81kqam96dto6q8la21vdg6xri484zy03albpygixaatdfd5nw7rps3od03eqr3fi8ulas8cxnhvllpjhrkxw97hgx6m1r883aqdif5xcefqrwe6wbnqyd6wmvg36jpu0cn29h7',
                iflowName: 'x9wy8u46fblapbsw2bq6096o9tm1feycl8k2jug5fgs0bcojj4bvrg9n0vynynt800op6jkxuk6xg5qvd5zcfxpdctltac1axwuk45vwibzxji75y6aq4x6uxzkp0qr9v99khn2k9fbrvi2692z4vtu31zab8kew',
                responsibleUserAccount: 'zezgkf3exlg42xqzy78l',
                lastChangeUserAccount: '8s961kqwef41ohot8zh1',
                lastChangedAt: '2020-07-23 06:03:47',
                folderPath: '7e1kitpifak2e2f6wuy7zoy8zcs8zroybqwvup8xg0452q9hoyxwzwhy5vqwkj45dzm56fawcpyxf3segj2f4hah32j98meexnj88d5wneohduqvndkgt30o89dnfvir7favvrtyj3w4fkcy6voja263kvvzj1d8ks4fprkuhzfhbeslo2gforrxv1c0qtroli4bgufvjbbj2mxyzwzi1kpmrhbfhyo75kuun9ilswc91mvtbmyc36xv0v38siv',
                description: '3wq32npk56u2lirdcumjlh4kfmt059wpbqyxiim084t96pprd60ms5divg6r5gu5npfs0fyqwb199r92nn89bm507s684t4id3y7ri9q0q2opa6ibr1bqw6zwtgwc2jnggetu762qd7n2h1tmfmhe1sdyfdgs2yssjyzticv13hvhser4s1kggnv2r0r175q84g66ycuewnoy35rm35g35v8ua6u1zqu62qu4iky0oxhs9jgbo6poqea6l92kmg',
                application: '9abe09wp3khive9m7v5sw6jdlvpk0q741dfdkysvf1i1gt99yu9qb2gmrdso',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '08a26543-4686-4000-9f19-5f6f30c920d7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowScenario is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735',
                tenantId: '3203f3b4-564b-4f6f-81bb-53e7bb4f6940',
                tenantCode: 'l0nzx7nij75zcv1z0vihuqww050x9zwp02h4mw5i5thaevfoxh',
                systemId: '7f1f5605-aecf-4cb7-8317-bbb853061653',
                systemName: 'em3b81h3z5i2y6ciagqq',
                scenario: '9mc9r8aeb11lj2a44kzygf9kmso1r7lovd1pmdt91gazltwvnhvfku5dwwad2',
                party: '90dao8ka8ypzsvmesijnylcx3sp0m0ewpbdtqmzlxn6y96taa75ifp3c5kpo19wadt5rcetwwcjyxn88rnxu4ui524r4jr822sfumayf3051a57rlkoj2rqw9y3n0g0uc2osojk3gjqg8ngidz4cuipgf55toq3i',
                component: 'c0lxbvis80n0obpxbel8c0mt5x256f06pm6b8sfl3p29vejgt5dvpj7uo2pl2hr1we5rwgq96y0ma50z685hz9xxr3vplh22secp1f0vtl04iosufb65stclq3k5cp97630yetb0d7jy9e22fw5076fxuazn21dp',
                interfaceName: 'a16uzne2t9zzn3m5mpqwphh25xp82tl4myai01wz74nm81loqwrz9aztcrj918zuef5b32c78hp10gdo346p3zm1uc2vg3d1wgadaymscwvobfmm4v33plorwtuc96sdsaynfdi2494mtfqtbmu1gsu0itrgmojw',
                interfaceNamespace: 'b6pxuvtp2500pf753vneiw1xf5otvfq2h9q8jk1my8ydiiz9n8hnbom6wjx7t7gk1l35xtlcz2jv0nvl37a19k845839kn4warmrkxfsfxtvrrys4mv0dzrnu97z2tuq4oiexn5j59vfcv8g0zidotf455pp9klz',
                iflowName: 'myubjq6nn0ktmkl6tpdx5t6ftoru8sn6uirbsc8ru4l1hi6y8mlu8m8x6ujf2kif5ouwe5nclthhyzy0v205mmiez72fff0amvmkljuo05wtxf065b9uuqo3jhfvftzyp8ac72ba47wqzu96gezcfl8432ico93j',
                responsibleUserAccount: '72h5v9n9idqcked0sf6d',
                lastChangeUserAccount: 'trls2sts60jkjzgv37fn',
                lastChangedAt: '2020-07-23 06:06:23',
                folderPath: 'vwul7wpoykatl7p8qyuxbxr43g6ymd86oobq3ndejc0dizmgvyomhkheqvw7ys7oq2pc3pssfiw6xegxkfhnok9i35rwl6ypy979f3n9jbcytha6y4f0yfhylxzdjy65sjvji1fzbogcw6erxko67y1clgtkz07bngfwsrdsk4pfc55jn2j769re44xahgs1l526qxlwubypsqpnaakmbq9b29em8erdusktuvj00sl78yjgiuvxsttez6swjf8',
                description: 'siouejtuud0tm3w5toyzqhio3dh56aebk3d8959d1vpumt95mj7xvbngu2rd931pa4qro32hce1sy30lncbt7jeieh0wv4ooeewzunemb43d9h0t788x4tkjx9jpn343rd229qkhe7zp6xtdzoyivtvselsygrap8y7eg27z7vy04nti8nqx2ve5rs9o6dk78l22u21wdoxrbw57atuh3wh0crp5pyantrp2m54tnbd7yw5w5bxe4kvk48yb0nk',
                application: 'roch0t933ejeevuoc7717nu07pwryka20git9lublijfg3j6ddem6kpozqko',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '08a26543-4686-4000-9f19-5f6f30c920d7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowScenario is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735',
                tenantId: '3203f3b4-564b-4f6f-81bb-53e7bb4f6940',
                tenantCode: 'sbkwt8qu2jj1xt17lv8jxzzcvngmcrdcdlvishwp4phzl6afm0',
                systemId: '7f1f5605-aecf-4cb7-8317-bbb853061653',
                systemName: 'zt8ez9vftluh6f5xh8cz',
                scenario: 'a4qrm67c28u37hcniwvxfdpd0cus98hx97z4628u7gvwqt96uu9u1puu9dhw',
                party: 'i2olf41yenoesfcqnh0tmbe9ongs2mvvoskn4osgsyg2i9cpm86syvdmujjb751bscjb9uulvr2hdo9exw483kxz772atxxwohxqui6ybmt2oyh7arby7lmwin3k1603b6xg4ehu6wtl0wr2smudhhkxasdtyk28f',
                component: 'f1zxqix2wcyyv2nlhpngttoeyrnhl72t35zpz75bh21sgla2ojq1nor0efrvp3i9neif2xj850pj50yr35tywh7rtnxaqay9l2l3ee361z043dnry0isg6ttsc3aw9th6seytlp5qf3p0ve0hn14ghbf7ymyzgkv',
                interfaceName: '4suz8gjyc8pg3kjasnok5qmyrgl5fegzcor7ghpt2rh4nh2g81pwf87y99vviyifabpetvk6mzmwnfoqqiuwvw4zwtdcexu5av2ncmf21i3196diwa5ak1elk55obgdj55e6pd2jyxisjp6fexoo3hzrtwx4p551',
                interfaceNamespace: 'qc5c612btb6xwkyzpewcq47wobwxlbjhkdmvja9au1274t3l5mr52xzriwlcq32yiq4rh1njzu85nmjhj5ns7unie4r3d2h59yhyd9u5ib4iuapnyvqkfrf87n24ubl17po6f9z7qzrlohjziew9at2yhxryaxzu',
                iflowName: 'sqe0rw8tuotqr0z7a5mu3l7e1y9pth25pig0zac3yb7k1jpshpqnglk3vjri56etri8uw8l4crc9590kq1un46hgp4pnlsa6z95f4an2u4zsuphstvj0dh37mh346sh01hxqqbmcbt47vn1ufpqj8d6ov7dt3iue',
                responsibleUserAccount: 'wl064hhdxam9cd4k7k69',
                lastChangeUserAccount: '60kniwnq8ccn6hgw7c9l',
                lastChangedAt: '2020-07-23 18:09:08',
                folderPath: 'imcgjqrmvu6kkl9fr8zd3tdr1kqk9pgz2j3m1ywl6xxf1r2zia3whfowtloeytzevssupjcfgcslkcfdaktxp5xww08f7rkckxnf568xfhs8qw7igl7705gly5g6nl76wj4agvleflrdcnj0oc7rt0pbq4xqgj9rq0i16tj47pu7e2mod6m2z4kshqwezk3hafii7g8locp1tvm4mkex546skrkn9ldln3myhcqfv1sc0zgckrux660u6fbquxf',
                description: 'k7kwuy8iynuz0pb838hpe7c7ka7grshde9g6r6g3e2036r95i0j7j756sj92ppp0xmb5gl0d97ktfakbt2v9n23bfqwtatlpebloaaz65u8r1bq5s7kweaotg46crnbgfswx2t1krg1wqbhgp0d6h9j4byci2n6qfynm9nubt5qpi0ake7l99qvp3ns78mv4f5rcegmgk5kkbjkd7c2h1qo3qjqayr0yt2y3v7me9q65vfogp8m26prik1s31b2',
                application: 'xmklump4z3vx1obbfp3bvtzc9dafopmsjouyg01yzdxlsgzz63l1t4iiiei6',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '08a26543-4686-4000-9f19-5f6f30c920d7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735',
                tenantId: '3203f3b4-564b-4f6f-81bb-53e7bb4f6940',
                tenantCode: '3bhvnx2tsyxd8h0lvv0dewr59x0oqibvlskznlsmutptq5f8o1',
                systemId: '7f1f5605-aecf-4cb7-8317-bbb853061653',
                systemName: 'bgawi7dutgkkewn5knny',
                scenario: 'mxx32ficv3bxotdp215qnacnq4jhffs6guc98erbioo5c27r8ayvwmnlqabv',
                party: 'j20dgiivsi8rbagif4g6tk9ra1x2o3zlwi1ygqxrqg85s18fzwcc34hgzg2nlkgfk9ml29nm4ndpwl2vhqk96deflzhoap1bvulhqx6361tprd15vkxozm11prl3uur12mgn28v9539rue4m1g588zl2kb2fe2dn',
                component: '4ney8u63l1pl61mbqhbibyedzzhe1i2wps0jwbgcbg049v6q162n8nyvpdrmzvqj9c5mz5guooysetc95kvg2imw9pdj5ckx3iwwlkp9q40uh185dln190s9yyvx7r9cv9jsbbpw5od4mqxi7sc469jf792e7soby',
                interfaceName: 's9sqvhg1ryncylpeqwna93mc70jtis0mvyxl8c4vmqespklygj5s3do9ntwpzwid4hqtgud9i5xpa5ehvtst9wl7je7bab7ql2vomu74dsrgl5ulm9yvu4vuqz5oj7oow33n7877cqldtayycjkz9w7gcy1u3si7',
                interfaceNamespace: 'ksgmy6y06928x8jf2rhxpqnupjie2jicg9b83w778vy6g51aakvvy5dw2i39fjivik0rol5qw22fh9igfj54frmnvy2mign9njvafrmpyg93guchpohc6rajhelkjj29wwb8zdt2lzhdy6ra8raxuze175wysrky',
                iflowName: 'higaugzt6eo0bvnej75c9p29ddqkh2d5vy499ou9qjuugmd6c0kmdd12jqqnsebbu9wiemp9mon8170ireq4afivye55iigh9fvs0syuv2kadibwny6uanv48xeepxd20pcmkc2h64uszifk691x4q9eg7qqj54k',
                responsibleUserAccount: 'k6h1zgi7espuca9cll2c',
                lastChangeUserAccount: 'ywnai5umita9nqy9dinx',
                lastChangedAt: '2020-07-23 14:36:17',
                folderPath: 'o8x6hwermikppdug3joye2i2j8ox0i12ge0zwr7q4drzvypc38x62t9qn5yc18cjgfh320r6jbcmz3u3saig8iu72dxbv48m2m3xif8ilbo8v7711m2lp5pdsme14poqbm4dvcnhez68lolgb0195lqox9ejuqobl8o3no9i84usebiduepqu9zy55nqwkk9wfkvm8s575yf952b7ezwk0sh5f2lt9i1f7iu1jh54ko6ow0kvn8z7g9rdjtvbar',
                description: 'uxac72n8bfo8xqnook5t020gh21iejoxcb8z9eitk0rx2q2x7xcdl4fs2e13lnlc6v811vhkze5j69myxqmjzedz27koloitgg4240qz7ac5x79vis3nz9d6ut3bu9xezgxw2333dh4eigljc6702tgu8lc3d3pi8i3ljen5zs7uc6nnljn7kmpm6md2fkff0vjtglh12q7ywevi7sqetjt83ic6jv83yetfvekzokejdojqf4autx3ikyod1ba',
                application: 'hj79k73t87qpgc489ibgev15p8fj21ul4vsmphppdskyugnq47b3i4pkcj5r',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '08a26543-4686-4000-9f19-5f6f30c920d7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735',
                tenantId: '3203f3b4-564b-4f6f-81bb-53e7bb4f6940',
                tenantCode: '4pt51364mjkr3ped3n1iha9mu39yp4q7ifw95er1srbi9exqga',
                systemId: '7f1f5605-aecf-4cb7-8317-bbb853061653',
                systemName: 'z5rwdvaxegljeqn6yy44',
                scenario: 'ihukyp5lzvpabu2o23fl1ff2x037bhd7mgm3dxe167kt6tfz3x5pa1avkwt7',
                party: 'jb6a0irqbmhotsq0ao1eghdo50z93zoby58wgh2jyr1pkinkyxdplc0a6b8lir1n92x3xdwqwbsovjquyx3kntrl196o8a72xvbogtgvs2jzu3mhljbt35ygck7g1tg2pprhs9ct1vgg69jygdnz2mrkgmww66bt',
                component: 'l80q0rwg2zk611p5lrveiob639sbynkxr01m41xioai9mp63qr4eckpy12s6ano7mqd8i18gxvr99ja2dzzv6ton5t19ccqseygczue45mzg1hmfnmemxtg5xc083mnbikzsjs4gt9l5zpk618p06q1ju1qry1xx',
                interfaceName: '8ejudfrnkmr2avxxi2d8tuh0hdtnagmdrx3yub1o7vrt86w58k4mxgf2w3jd8sbmio2nsuv8evxhegmb2o052sictyws819tlllpg56ws5mtwhp2yott9vg88h0bqgcwgt79ul1pyejen6hp30fyw4h1j9i8uw7mm',
                interfaceNamespace: 'knwdd38nunvna5d7p293oa3z5h0vjho6wofidfyh6a6o4tuuvkhje7t477a5iy05dm6he5j19958vfxgie9o48cr603mcdpfdh181ggusqgblwuc8hz3j0rgw7rbfobylphgdfeu6qzr1y4q5fosghhm9cahat36',
                iflowName: 'vmzpik05eyo6evrkg59ruyy7o5q7kcsgrdqhdynh3q18fsomnsqpktmwq4lrk9w60u8tntq1d8udkeix0c87xd1052bso2dafu8227dsjp3931pj767s8yd4n2ngqk1qixmtw4fs5w5cs5o1752oz21tafbqbs65',
                responsibleUserAccount: '4eg5f1kk8ijkstmqtx53',
                lastChangeUserAccount: '926wxx84enr4j8xf5jqd',
                lastChangedAt: '2020-07-22 23:35:06',
                folderPath: 'iju021jw0x74qqd1hfg5ut2vzmlwoikyqz4yhoanbvsiqmaqqs9sl63p0n9ld94mbczu2c1c7k1a4t1hipsgkz35p73id8m2g3wukd2wgzesimb0apa9h1rn6fi04ttlnrpwggqe4z0w857esrc3tkpobagch3oy3npe40vcaf7mtunin3hkaptuwfta287wa74clu459vgrguppyvse6yh68e4qz5zw9s2rraw9de5wc6dk55i6m9g3rc7v3vw',
                description: 'ci8ngkwkjyqu5f6zu4sq5jxujovr0z5hggzq1cinofvvwwrbdyl7cb2abmj8wj75ktrij2afj0lrqsz4q9ty4tp9tx5wpyxzafz27gc0znvjk10k1zpehd5xy23yf895kiwggbhrzguq1edgtp8rz42gwgy0iky00kjberx0t2s1zkvm6u2mxr0lk2qxmv389xjwwysalqm3jfj1e6iqj55frgh1t5k0b3coz7bgpfdl8pednyqdzj1fkh3qkul',
                application: 'qa14hmjea2g4onbfogsi3b9e2adp6uat824cooeehah5jmlgyc0ev0okivd6',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '08a26543-4686-4000-9f19-5f6f30c920d7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735',
                tenantId: '3203f3b4-564b-4f6f-81bb-53e7bb4f6940',
                tenantCode: '5y1nq4q6fqa2npzbhm8b2qiblbwpeors6j4q1axu15lmly7hp3',
                systemId: '7f1f5605-aecf-4cb7-8317-bbb853061653',
                systemName: 'zsrbnuxa0d3er4fmu6mb',
                scenario: 'h6zh8yzvdusrplqeqk8s9e1lns32e8hndpw0n5glb0it32oarft28gn0xskl',
                party: '92de0oczmjm6nh9t71y9kc4it7gqhfkjirsrqzuja1p3fqvs536lts7d166ro841h2g5gg8fcmwafxehnyehzqokn94e5glk43psn4hugvrx39nzf1eeyic0j4nsxoxj38fdftzg0h7e5upx2wggth6209wm2qr6',
                component: 'zqmycc5nehlwc2688k9rke0v7c0imrhmym2uptcsj70ahxu687vf6j16xvb8cei6cu9v604e0x9jdskz662wbdxwmdb2wqxrfxeoem6t96hmdbino4s0p2c1x4mfum2iq0ts14577u765umfbm0fopqo1mze721o',
                interfaceName: '4vehm3n9o8yynuds41xnbv9g2r1ha03u91fdfosi3pfe4g3py4v5m4m74gtgytmz4m98qu95z95ajaaprhzvc0ln0dame4440izyp3ms8nwf1tf7r5g0fcqqz0ma3b6xfb4yzqkduz1jcx4681pfruzgo83mbp36',
                interfaceNamespace: 'dvnmb924qhu9qyp08em8qs7m2qe9k3vn8nebmgiuu1esihlxwb069ivi371flen0ygod7s33lk5xzqs05hah5u0ivbr1s4w0won2fjc9880n0nayjjuhxb2wh20v9kgyezjkkl5sc8ogik5gimviycw6mhgpl36p7',
                iflowName: 'ox04mhrsrroh6s9i05cpwdjl2tap36c1yly2s4ia90y2pg4oml4zqbtbup1o65u3rbatreda6xya4ocjpdw6e6wqizxyrcjfxk1zoca6ryhzlpy6mie0epyobofamkuulg2uvcoj4bzcll2q3lzuut91sgg80wsy',
                responsibleUserAccount: 'zsmrorxdbslubw5c4axn',
                lastChangeUserAccount: 'add7wqse1i0cozlumwjz',
                lastChangedAt: '2020-07-22 20:51:28',
                folderPath: 'i5cn8zp0ygto2pr3gg4gh9duow9c3gt87bdettl6k0a7h5m2qle4tnppf7tfslgfj1s1kvpeumatkehxo8umwo9p9shkjz07jjip5xykpddbpqbh2op4b2j3gljd2w4xz9ut8h4hxiqc08k2etzfyetwbg6k6k0tv9deh9w07vnwfz2j2evdzi3uj9934hviddwypmt1t1622xzsipfccxx8wsued0fsyszswk2hfqzvu61xzg3rye8h6g68k3j',
                description: 'omq9edidlnh9j9e7qzk7h5hnfibn8hxhg1mx6z7p0wrbfcj0ckiliyy2mvsit3ur99mzbh63xtlule5l7s4h0k6213s240pmcorxs7jgihpiuhhw96xx1zu328hr0nrk8tvql3o899z774r5zkm9sbvbrgli1cpm7lrds8pygamep14vha1xmwxgrdlaxyw3bz06dcv6k1xwceppnqdli20fko0b9abm7qhmzr3mwttdebie1ngarnazim4aprm',
                application: 'd10ls4x0jjxmp24l6rv5hqu06yrc85uwirtkjv0ip5y69wfhbdm8tyycgx7z',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '08a26543-4686-4000-9f19-5f6f30c920d7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIflowName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735',
                tenantId: '3203f3b4-564b-4f6f-81bb-53e7bb4f6940',
                tenantCode: 'ddioi1ofhvfs23so0jc5l6de2qs4it0cf4za5wamhqelcunuqm',
                systemId: '7f1f5605-aecf-4cb7-8317-bbb853061653',
                systemName: '1jqwtft85u4f8z33uql0',
                scenario: 'o42epr5j3jmx9f2eme2q1dr6fjfgejo7lzlmlcm8rfae3f647ceuevuxwjl7',
                party: 'hrl8l2afggr6t4cu9fbcpxaxfe62611fr6amzurqd5z9f4k9amloejwnpdyrxpuu6ufgh2zviifj5roib1r5w33g4crz7vqw23j2hleswvxylvnhxqjz2oqime3mmec3dxs0b3p2x2ssyzpaob0e7f223dbo7nvi',
                component: 'n38virgqmixtjl8xuzc858kud6rt7hdb4zd3x3bcbwvza6qaq7qjc1lo3giseq2v1wpt8n9bpfag7as7g8tlc13wtgt95eym6tlq8wgpplemvebdj7hxdgrdno4h03vqskaoh6tbsw9gf9qewxy91skyd8h46se7',
                interfaceName: 'v9d2galosze9jndt7aivoq60iwnfnbdpmx8j12sfcfrx6c8hikfvkl5j7rd9mkmniadewvtrdtyu205syht8fdnzlufnmd11hptu1ss11b2rqmtro4z9vu08ji3lik9mjeuwazc0kw287u3sf6k5fkreb4ufugx8',
                interfaceNamespace: 'znux7cptocjav5llsl0l9gxan8c9z2mamftvfa7rggj0enj1b6jvkzjufzr1v0z5bf0b3o6sb13tyu97ryz93jyvb4juevi2do0fi10wsgrc0kp75q718gasdwls3a773bgamtd302bobysikpi004485qn9n9lw',
                iflowName: 'f3fqk36wzo639zik8t11ynb5vidtmcctvw05xbwq5lqr2oi458napmor3z63yfg0muw4uel5zqw6hfmi1gyl675q9fvelnbzwoqgfjsoxto6ub2y1gy7ap3la6z4n8m687fnv75k2w3e25a0ri5ad53ypa8dthduc',
                responsibleUserAccount: 'pm6ojfgk6sqvwa494ctg',
                lastChangeUserAccount: 'rpe709mde18dqh4wb11r',
                lastChangedAt: '2020-07-23 01:38:02',
                folderPath: 'qsn30uv0ddtyghx442a47v83eij4860ydw9e9w750macrpgqi3t6gze4ewbrmuafnj73tftea4mqvxucylfgzd7e3bvquuiytsil9u4q51nubq5s0i9zf3l4x1vi1dgg52ah4w52rua0jdtuvvvju3qgbj1dz4hzy5afsvq98oniadwhafzyyq9kpxfpuxaca73yudxsy7lmjtxa0x2mvug0xsu48h6elus2xqa0uy9crjgxnd8hum3bcx8p0qa',
                description: 'lx46sk8yf6daqm9t2hub1a0wc86jsr33qpqxfbpzfblai50pxtnnhyrqyokv0tn29dntq0sals6157jtayivh55ae4sjewqqkco2blzud9p5scow4hvc0vj7xt3a8gzqunqn0ka4cmjkloj62kkx51pw0szvftth48jn9pdhlsbiigtr46p1yovqgcxb8x8ywqs8googoo1dbq8mp0d1u1e7rnxcduvu2fe8zjitgyr7w23tszzvvf7eeuqc0jc',
                application: '7uk5pnykgybkqk04c8gki4qt85inwowfve1pvxvd3ynpxyl4dr4n9z20c72z',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '08a26543-4686-4000-9f19-5f6f30c920d7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIflowName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowResponsibleUserAccount is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735',
                tenantId: '3203f3b4-564b-4f6f-81bb-53e7bb4f6940',
                tenantCode: '3myi1jv4vg32hp7pndswfo5ug201mv4gqml1x9l21k1cjidx01',
                systemId: '7f1f5605-aecf-4cb7-8317-bbb853061653',
                systemName: 'ww0tw7e6e4qmkibj0jth',
                scenario: 'lhd3kbe9nhem76cowe071hszyoo6u19unvq0taaa9gr5ngortckde82yzmjy',
                party: '2nvi2tzwue917l6nhm0vllkq5xql87i3ox4x85zq22c7u7kmvk50u3r8s66zjt5lnq5wx2jwppnzkf1xtb5wmlyl7vvtbaxzie0xkg2kcxvgsai04k59o0tma8mf3cer05hheqngor9lp0klv704rqd2mpzbv106',
                component: 'nbe64tyafontgyo6sue8yml1h9jgkz49bjb4gbydd9xwkg1147vsu0ihgjcw2h0fkbbodraq2poqe2mof43k1zj6wute5mf9c5dpc5ubf3js4fxijyvv42z4knvmh27n0gzu2rgx7xon8xxwjc8snklbyd8wsjmr',
                interfaceName: 'fyd1mol6i48qs2fu7uls74zxmua3cz9818g1aarcdctfqcipjxbctu8u1yt0xq14a80xnk4gl9muxmwtzkh7i9oxphs5fcxg6s4lpp6fkmowutqwrgdpstfuvomdh93mromp1bw8evo6zhezrrf4ka58shtohcdv',
                interfaceNamespace: 'uucrod8cbtikffba3lrre1nwa6yus9kbvn5o75i9rg25epuziird0l50ehmjosh26qhg245svmq5hvj18ald3meksllkkt2i30334yqdp73d6bve6b2jf3ra7pr1v7e4gzo5t0ztu71ic93ec3f2gquqy8t32s2y',
                iflowName: '0dxpfk5ue4p4grp9d1gfhoaoyvzziqmpcv1nurrflfawp5t21ggw7svcyhyee5hb3cn40hetkxh069qmecq6wfqw6s4bp2xbyis83jr02pvevwh16dtothb66bzlwe1o8gfdumclyneu9x56nhhotwhzh3b52z59',
                responsibleUserAccount: '7w35j0du463u2me63rbix',
                lastChangeUserAccount: 'a3m0ke8g3e3u9wjv8mma',
                lastChangedAt: '2020-07-23 10:47:54',
                folderPath: 'or987rdfioxegsekwle3vclplj6mvf29js9i030e1wf5zby5m3c6wjcgt0s7gl7z4zkvl9wuivldi74i5rr2ibn4trtewcl7tpsb2ene4dxyydkecnizszhh5d0nmexr19nufz9wmv3e03r0bs599fu6i98vx88g0akf0vgrm86o1roi3th6bkkc4s9t1xnrx857pges7fkfwq1r9wugk2feaqwryc3a4kopypphe68t6pvs0j0zokoch0q57jt',
                description: '7rduaog8afzryu69dgqu161h82l4c3ktoporqk1fbi4exdyuyzm8290k3dy84ehcmd173iud5tqpzp568sh1tk3fqvz2v6rqbnz3crj3sjpu8rg3zbr588ludfq4icohkbw0mhh1blrhuzeli4alfxa56n17sobvltn606wa24co0m34amop8h0eonlf1zrua9bufstzftdc1w836sly7wjrkaogmvrjfo5tns3itb8f4x0rnczqfccdco1ifa7',
                application: 'znzxiibne3fq8mlpb8iatqcb0y59tgofqrutpjbqfhy77n24uutaqikib5yp',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '08a26543-4686-4000-9f19-5f6f30c920d7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowResponsibleUserAccount is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowLastChangeUserAccount is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735',
                tenantId: '3203f3b4-564b-4f6f-81bb-53e7bb4f6940',
                tenantCode: 'a40ed41j5q8c723tkfqnr8cd78k17ob0erikftvbdkzabcnwaa',
                systemId: '7f1f5605-aecf-4cb7-8317-bbb853061653',
                systemName: 'caj9qokrwsvmfqm3tl18',
                scenario: 'qp5gfr0c97d9ja31cutgu8li68a5z93whqig1x340gr6fbyg7vllqkwfw8lq',
                party: 'rcaahr93t8pagz7jn9raroagksk0ungwbg9cresqxaiu9wy7ku9mk1p8vxlpirdqe6yeqi4j9oy8cgbz8mo329mu2lmq66n79gzhrpiiwouikvogokcsw2q32if79hv4egjryvnkugc0ek3wfp7p0jtbh17nuect',
                component: 'y92zhc1qgvigrgwleof8qk21fe5bbt3g5edx59nnrudiymqxpodmpcbqrw03ayzapr9trz33o2ms9eodvd8u151sm3xqnwcsrs4u6s5xb6u3fnhgcn3qxw1yzg3vuji14iv6qtubfc7oqn47oawfft8c3xta5yml',
                interfaceName: 'ddjlw7e42d3lnqo26yghettfzlq76w6nu1s589sfthk6nnxfpx0ygid6by8i3ltf7wnpuc4or6povfsmw1bqkq41c9dfeluhy2jk7oahpry6nrjefguvte6tnp5q2hppffzd2jbnnss3tt44vhc6wniorbiuf2gg',
                interfaceNamespace: 'gkdr906nh3xrudakvy5snz4ritj4ycjnfz7vuz2rmoywy3mluefbgfaj3rr1ul6zsmdgueby8g2054wk0jh7rb06v90o3iiwnvkn8x0kbic0jv38g5i76wvhbnfinn3naldw1rskkjln68q5y04ccqw2kn2of3oh',
                iflowName: 'z9or5yjtm45z645pgiewoqypc8jysjw6zevr6vha4y7n6qfra9bpznks1nw4lt85c0q5tsvsnzkol3b2980s7n7lsawbpqbdanggixx09pwmudjokq78re80qd665rdms2bk1e1hzex9x7edsegnuhqzxtrauima',
                responsibleUserAccount: '75o91zchvtwsjyzezflf',
                lastChangeUserAccount: 'd7oxdkv5ekfo787mh2x1i',
                lastChangedAt: '2020-07-23 03:18:05',
                folderPath: 'y0gwqayplwb9a09ssklwnzx6kk08nvee2etmdghxy31uen2jj9nj0q3uf5kim5dsyue0r25icqcqhk9y7lpdptuj7skg49zrbgi92pjlqautnqdpdxypkt7arklefuke61ly05an1m54zslmxc05fg1ozsnqwe7lh24smdeh46czzgp5gdkevc304xt3fu6vamrjkvfub795a24ywjuugzcpq8c7x3yypu2zlpe3xq7rxhtb51lbyemehiqfgfn',
                description: '51o9dfdfa09zkadvawmkmy22y0fcb01f0t3ixwn0rx1glg1if0uz2982aayf6tjzgfhb93rgs2k1cvhpxlxznjt4t2xguhn9cfmdis644ahm6tdsvpd3cbuzr0b306ucrrbp9hflxuew9j73q6bpabv83y92xe9mlucn1ckdheakfw0hhuxstan3dv7osdocv84bbc2vedg2seluvwny3nmq8fadj38t5hwl6vv06gug8rav9g3il98hy03u2ca',
                application: 'fbai6dffusnlrf2ridbee2z81b1nf0bzw9qs7uaevgwwbdqyr8f43snbkwfo',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '08a26543-4686-4000-9f19-5f6f30c920d7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowLastChangeUserAccount is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowFolderPath is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735',
                tenantId: '3203f3b4-564b-4f6f-81bb-53e7bb4f6940',
                tenantCode: 'trx76ctrpl9gq75qidb97t0xkfvhu2t3jzxqrl9lcbyn7yaw8e',
                systemId: '7f1f5605-aecf-4cb7-8317-bbb853061653',
                systemName: 'pjfoanp2etmvtdc5d6pd',
                scenario: '07o7chbnubnv44pggqs4jbof9uxlvz4b5m6oteyl8splj3wrup19eywchnrw',
                party: 'xrrylomofftyu8dnrhbkdulmvyc15afeo7hwzl6nrxo97fk0vy13vcjbvhlbh6gymd8z31wv1iagr5cyw925c9xwsucdapau7qp30q40liy9ko0xtyvizabwto52qy12wy3sy56pyx601d7zho0tgrd1sblmbkos',
                component: '1fa9ee6n69oe2h03ta7pm6dzrmyvuxrq1f9f47jw7po1j9fktjpup4g71zm19p9qci33880v8y8ry8ccxu26g7jg526cnprutvgpaxbpov49uimpmqbqna8ri8cb6rdqssw13ss26a3vnctodaxmt1lpsgfic5hq',
                interfaceName: 'r02z70wq9cpyk3894rvxz8szzvj3eydux4o220pauasksg6rt6iclni54ovij0qi9mbppmvivv8rzsvlhn7x52r9sllb7bzom75oacihziq95s75hg11jqqr8nfhs5yy237ywzrkk3731o8v91vl17r5gpdms4gr',
                interfaceNamespace: 'ciff8qrejlhz87sti0d3l5ymv3y7d4vuf6amgq8gz38m8wj2ux1g9dz99jxz87d74povd1lupt60rm0w9bnr2elcfv85ycjai1myp1ahn2glxb1r6lajkiewvhw0hdfgyr5wbr6tshod2xlkn4azafmhdvrf5cn1',
                iflowName: '3i5ocduxq6xm1eg3royfrqi4wpvydfhf2ygf5w1jrr48hoeyuhpshbzn8qbuy6jiy5n8j7z4n1m9ydf5htabgwjb6k6ybllg2fxwfttrf222vzym4egrsnn0a9o025h0buj3n966z6rtsiersgbr7puypq4eu1aw',
                responsibleUserAccount: 'f5m8uqf95avco2cwxots',
                lastChangeUserAccount: 'tu6zswv3rgxut01tg8lr',
                lastChangedAt: '2020-07-23 14:26:42',
                folderPath: 'h7evpro8whxrpdye2si9j9wqunsa0fkhhgwabxyz1m7pqrz8ssk1b9ok2aihhzzq214beyht45okryld3arf8vlv83jkm4cigtv1czjdlvaad2lmdt6ucgtg2utthfa07gyqpgxkon83dvuuzmsgfwrav400tt9zw5tg9ygh6qp43tgfibgmk5jmwpa6ldx5ose8flrp2eerrt1r9k2rcxqx41ea3s5pohxjlvqw49y01wbyy5g4ixxzuxszwgon',
                description: 'bznvhijfqxyae71ic406jzuzvbqleizuaulojg3fe92lljitzsz1n5jifdqsik6k4hrv3x23ci316wwt49fq8ei156sem36sjxcta57kgr27s68brh0qwk9pcrab9j2jj1dlhceenre189muju58qai9izxfy96k45gu5zjz20j9susmjwmvpn2wtxg0tkvq1x3s92o9p2vez2owzymn5wq1yvqzfdauaaoonx20fx0mxp7i3yuz74dxb5ldo5m',
                application: '1hjbxalotacosxickw7lylxyt4brn49dehy37prcpxukgiqgaj34qixngc2k',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '08a26543-4686-4000-9f19-5f6f30c920d7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowFolderPath is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowDescription is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735',
                tenantId: '3203f3b4-564b-4f6f-81bb-53e7bb4f6940',
                tenantCode: 'arcjowbyzvd8i4fha4cj9jjg7126exxmasg7rv4exo7g5rgrf5',
                systemId: '7f1f5605-aecf-4cb7-8317-bbb853061653',
                systemName: '2a50bhioxu42qosx65c8',
                scenario: '3lpybsdb09clo2izyuhz29pis10yu0drkyxh3101n0p86la2uu07uqfygzk5',
                party: 'r7wefqx71box80usoobj7z12vwsg55v8uq6j4eor9v39mx5zjjqx0yjm339ooc7k7s7k7yyy13epklt8o7uh2jrgboqo2peztzaan8w81o9f3jf0sslnxu5tz9o1axgfh50ybjal316dcl9v22r0uf0gjvbfshzs',
                component: 'l6a8qd1a9iu27qlm2xwxcihjc212zf4xqma4rzvldbmigav4fs1av9wa602t513n0c3rc914wyoiwt4xy3jpb97t9m4ugpdwx2nsm0oyftc7dvzishszqza6ln85wvt3ndzyn7tmipeej0jm7tg9oh4o17s3mkcg',
                interfaceName: 'wpkimr5ekbdf4mwp74umoiuvis8kpbmizla7l9djkcnhq9xfqfi3nzt8jxn7s3dun8qme8ncv5jeud5zk1ihvbya07v74dxvl7u3g45x0ccapypfnh5w70f0xojuznimibp9l5nhkmdxrjzma9256klqkjjrt747',
                interfaceNamespace: 'w6kqzbop1k0ww8d3lcv32qrigvvf7kdms2fenmenti9edd7r3vbsunlt18nir9fv3azh669vi7bc09o22qort9ytv3lb2obn1684l9lulhmoklvg604xl4vjyq1k47pz9lsnjdcoj43ttbbqgpi6r8usk5kh3zxp',
                iflowName: '29b89ojgajx5dthxx83qs0ojau01h3vmxepc0q1pukd6ewmpei2rb3qqs0x2jm1txelrlpm1ovsh4rj7wqwt6e4em1subjuhx13mjzk4sd3mlzq473osncu7zvakqzneystlu3vus3hspaqn0qgn0peewfixw2c4',
                responsibleUserAccount: 'xnm0qh2bg2owjtgkftqo',
                lastChangeUserAccount: 'hcwoh9fbh7c68iud8w19',
                lastChangedAt: '2020-07-22 21:00:07',
                folderPath: 'hszczjis1lm54kts25cy1y0axf688ugqvdhdzvyd83lstc0mfsm23fh7rb4so8w39gmvvtzw6ulu4tm5n4hndujxwk1ton2994mkgjq6ptn6lpfh271l6h0ubl24h7u67jcvjoamnc4q7sjb25pj586b9wrf53p3md7dfa76ldyqhz3nr2cua5ybnu10eb3880rpi87djd6mktam5p3sppf8szhg3sfb9xedk1d4yzzk1oef3h0ws7k7yu3klil',
                description: 'haxo31xtnkzklj43jy32w7rofkil2ddfxqpqopkndnhtw97rtzytiybscflfxg8hmc2lofu4axy0lb8ziwen0pfwnwt7a0i98f40vrmzcp9n1y2dwhgysr8fszqx9rkze4t1sj4949a6psbs2xcrgkewfof2ba6shosjgckur465ailq1j7ztov0lcbloafrvdd19qiczasx9mx4cn802nky4f9vs6sfi5fmhybbid5zvwxmdjekh1bmqyevaol9',
                application: '2vl6xceyapcwr85rgyqulywfvl20xtihuwc0d6qi8l4mym51yeg2ii9ou7bg',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '08a26543-4686-4000-9f19-5f6f30c920d7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowDescription is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowApplication is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735',
                tenantId: '3203f3b4-564b-4f6f-81bb-53e7bb4f6940',
                tenantCode: '663q5pvdobambdthsrgg3etzeqxo4qnq3j0wadifohvjh0lhkb',
                systemId: '7f1f5605-aecf-4cb7-8317-bbb853061653',
                systemName: 'zcji0igvd7m0ag2j01cc',
                scenario: '1ggdq7x70hqz0mzad0soovchz60l851gizn708ihhre985qvmql930jablen',
                party: 'd2ayyezbsf4veu4nibmepto579zyqd6zt1geu1mj919ibo2uyv68rc8alej4wfltloaf0h7fg4uieg85j1dimrde3lqhtjjeiiiu4fjqy57djnamk5jkg4jcno5qi1935e3d1l7jn43448oyzcynfkof0fuh292w',
                component: 'c84hwkwc3x63gpwmk9ktmrbyu9lcivuipxx5224gw4ygrsgyk4rhog4v35bm580xjme9rreumif63vcek9ox092kkexn2ykzc0ms60h7igcqdpohzod363v3undpmt8xw3r4z4428toeq3v6ne5n8pba5x5qgd1n',
                interfaceName: 'feg2j3hg4c8ghhashotto2fqp2ln3pk76h6dmp8hzie6wgi0stwn1f9sivhjctkgh8a5f8dmtcglu9z0twasbbfege7fxu25f0go1nj1esxvpi0s41is4hzr9jnc1eaxqcu6zrcziacvmmuh5qs5bwcqcdzjm07c',
                interfaceNamespace: '2944he61hd0kbdkx9ov5xh74enqxrnm9d4oumyelam94r8iq2ta6nw4fda2080m6zra1g1btserwl4aoi5upxcovxgkgiaso1g0bvqupt1rr34i73hcewil6bmytbmhvlctimumt1iuxswknr862ja9rjk776k3r',
                iflowName: 'r12r32xhcrhn82dxu5j5gyqbkgzz8wu95xfor32kyk5etj335rtpjkpvqnijfqoekqhxd3iji6g266f4lz9oqege3700afgr42xkiopp1vgauami58c5j2h0z3b4mjdnt9ldfp2im1jc5ia2pfqrug2zqlj3pr3b',
                responsibleUserAccount: 'upz0lnrafc5kgs4osa48',
                lastChangeUserAccount: '3swp8jz0t7fg82rla4ls',
                lastChangedAt: '2020-07-23 14:28:46',
                folderPath: 's2yb5rvdmbpjmnrh27bov7dkbdqn9ynuthik2mdjp4tb5ivjgpua4v0xy8t7azdyf34wgn7rll55ijj361jewbfvoan9itq0moelwg9oicekdvyfuspp5kemnk469vrf8u5w3t6olxihjc1k3gl2rjylwn3ky91s6srxze9dkj352837g47bp9m1hunkp9qkf7830mf0cv6oxwylf5sw92u4l0o1u3rgnxhyhxoqoubbum9q3f9ttaclc16j6mt',
                description: 'ntubesmzl34xl683xwwo7zl8drny39zf2w8o8o8n5yeiyw2ts3p2p8vbupuew05mwou23htk1kd5dm2v56cofr6bjprx9huwbrl4mrdsfkfcqz9g7wm7e36063s8xa33jqx5ym3la5h42nlci7avamvlxmctt42uutfj4hen6fmvn7i81mzzu7p0pywnz7zj8zfpqnng21dexy4st21t0jbc6xlhssf1s1zax3nn68fypgdz9wvzqc6ylv1yjnf',
                application: 'y2sxh9nq63vpp9sp8n9vhu06grzonvkbel0rm3t97pif4vgkcfo38dmjkddw5',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '08a26543-4686-4000-9f19-5f6f30c920d7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowApplication is too large, has a maximum length of 60');
            });
    });
    

    

    
    
    

    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsCritical has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735',
                tenantId: '3203f3b4-564b-4f6f-81bb-53e7bb4f6940',
                tenantCode: 'aps5m822wep2lwei90gm1gxffgo7uchpir19wxwqu6r8d32h9q',
                systemId: '7f1f5605-aecf-4cb7-8317-bbb853061653',
                systemName: 'l3um31sh6ir4v3bcz5q8',
                scenario: 'tnb995lx5abok7n14s94x98h1c79mu2wpbsq3mo2zzp74pv2ws28d5cflmx0',
                party: 'bkrrv6yarfvmrb18mo74ex1qo1ldvu4ssg7rwi594q9w2756xyabz4c3mi9f4ialdn7wm361wj5izlyvqul1pvmv4ofsqkkmjwwk3mye5a3exy9tqs5patynqbr7t97h88wr2bi5n3hfeq17dr4kzfwcquruug33',
                component: 'vyok4hfvdkyquk4f0napkeci1j2x6l1hclcxxl43aldu6ethczui8hlyt25zqpo06r8ax2crpemrwtrhgtkk2ztejvyxsipoo0fps5ua8hhcvo6lv0c4lie1wjpur9os8u2em6miaqa8h5vu79eepc0xjpqbv02y',
                interfaceName: '9enweq2p71wcnza2rzglj0bagj22vf84mkbjmbwl9yslm04gx7ksvggyy5y3ouig9io1qddleu2gwsb3srdkxci80qcmfvovg5ewepsefkm4by2wlmuj115gbbx85nbsqnbxfsr8pkmxbnzw1ap9rbxv194dsyuv',
                interfaceNamespace: 'e0zhoizzjka5t0m6byk0b9iocp5l1yaihn9qv18ibnzt8dstd0ywx54bak5612i3kb0c7ubhx9uj081ldxsb51nxdof0beggfdkrsw76woiohp5glhlprmbb8xarf4357wl9wbby7tilmezivyiqw7fiukd0ffie',
                iflowName: 'rltcpjyhhlj28onr366vl61slkco4xuhoivojbt6knnp6p9wkwcwsn3lhutoo6vhrx18tzkqnbx9awc485o5ln5dxljtxwg3ps9j2gsj06o7b3te6le0yhsy2ibgkhesqq5t57p97z6o1wj42cdreiijeksor0y6',
                responsibleUserAccount: 'gf1veabcp4sd9qtpv15q',
                lastChangeUserAccount: '7tt865j4k75xx1zhg4rx',
                lastChangedAt: '2020-07-23 05:12:18',
                folderPath: 'tr8bvrhc5i0ai1atyos2spreeg4vgtqyi9yj56ynx7ayhh34hn9yfbrzj751fpea0arhfr42uoqud2chwj336ii8nawtzeoeakawvo2sbw1k7ky7pskxe9wr8nhktrns4h94xf6m4bo3quu91si22xevbnx9x4t1mlbkyo33erj0nq0t1ek35r06yrcp9347v4d5bzd3q1bl99das59cjhoaz4vpmmieh2d8d30oa4vk6a36fcew4cwyfv1pt0z',
                description: 'pxvx8lzdp24tpowhyl3fwtpryteg9jfghz9uu5ium8clkxitybr0v0xeprecvhflehay1n6g83ujxipamkx71xbp6ghxrzfl5vqvsq0ga38awcd4r5d70hjkvhj24zxs1ph9uk6svcc03z09ngeck01h5a1wlb3znxjn17op56wegpjm4r7hrn3mitdhtd9bdxrlwtqptvzll7ri9chbefb94kt0og4k4tcs7l6h6wgs1vpcshhwhjwaofh9iun',
                application: 'yuravbs9ptleq4woochtx1uea6uhh4hx0c75w2bnwxote78wptb89tjxkovo',
                isCritical: 'true',
                isComplex: false,
                fieldGroupId: '08a26543-4686-4000-9f19-5f6f30c920d7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsCritical has to be a boolean value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsComplex has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735',
                tenantId: '3203f3b4-564b-4f6f-81bb-53e7bb4f6940',
                tenantCode: 't6mpbhj7qrlydla716ayiiigyqekc201q9srcj7n9cuomtk1zl',
                systemId: '7f1f5605-aecf-4cb7-8317-bbb853061653',
                systemName: '1pkkhpoqe3c0gyganjyy',
                scenario: '543tncrs0gyhsldngkb82206cyxmkwf351eqze8wyalgvxtmdf4gikx9hycj',
                party: 'r6wrakp5p4xclhejj4ja3zd5n9of6ex40amyo3ao0r17cg0zkvdnah1ifnlc33wndgu298ff8j0klrhakegs24iy5cetaysszsd5cojxr2cdjyjtadsjucvghgs6jvtd7vqchna2iosk5vbekza72umn6gcenwj2',
                component: 'u8njkbo74ckj6r5cmbtk0kooye7mrk0ph66oxcw85diddngg2b4pp7aav1pz5dth0j4x4njctdnkmn4jat2xmz26xom5iivm6z2zb0p8zvuw1nxh3exfmygx51ogfr02nf09zbrewutnna7j21cwsz0bljbesfm4',
                interfaceName: 'dc4dtsqzd6l3e1tnmc4xirki2g3jl63o4vvnd4xgrajbsqvpzrrhvcjjhyp8kdfmljv2nfb1wafbjp8dz9sj8l3gxd30vs3ojpcd1u89v9fq57dhjq05i4fd7cjidvlas1y03wpo18eyfm7fx0iwljj1zhxkplag',
                interfaceNamespace: 'qzn8jsd3jskci78gnlx8qr5o0j2acsxtojrplh969yh97ryvgnc96oo566zv5fpbl9ihbo0c6c2q3bqhp5mdyyli0k4sv5oyn99onl5dm4lviadpp5uag194zese0g0x9l3dmubh7vh0kiwsmyp9eakbkmtr3s7f',
                iflowName: 'hwo8w1ubxrjhs9tsqkr6w56jpnq4ymp2gir501mkrfv20yiqk5d9m4nsrjbwqgtvpxdilic72yjnnv8o9kw8zfciv9onp06la52bawcqk5axqgy0eupth2nkxnw6mp8ajpcoqpl5vnhqdnh8bn2dbjd8dwcqaasp',
                responsibleUserAccount: 'yfbz5zi43lx20psbxsba',
                lastChangeUserAccount: '2n0patv5of7ucs29k9hz',
                lastChangedAt: '2020-07-23 05:19:43',
                folderPath: 'b771hnneb31yfovsuk9payzh2xpqmt6h3nkhhwo8bv57mvx4qqi5zrononm16eecz7i6pusfblfzij9o429x8acr1r0eex93154t5ko0fxcepdiearzm9ms18vkhtx59111sr3b4in71u2i1qyf2gc8jqj21b2thavrw408zb2p5zfcb5u7wm6q4gqec4nv9tl4rciun474ixinfhty88hbw9e9jz3upnxqjutv4j7w5n45xggj7a4tedfj7l74',
                description: 'qpekvb8w7xexhicq0a48w7kj925wjls4pm9b2pf0cwtkojo5zgfaw1uxg5ekmd40byrg9mrtynyry1d3vazv9es9q7pg8w58cooqwgj0x6zfvy79iiakdw9p7i6i2pxnpcbb89epagwcb5sw3tahfhym1dkzfaeliu1mnj5hrq23prahyugea6p9bhbqlx186guoct9bbjvq8i1nfdp6nk2t2t24cmkwp6d8hi2tzrufps26ad6ojhqzk8kdbz2',
                application: 'ye8vciwdr7njasggdnxpbcqf9ppdsd0du17vkrr402o014sbcxnwnew4gxfq',
                isCritical: true,
                isComplex: 'true',
                fieldGroupId: '08a26543-4686-4000-9f19-5f6f30c920d7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsComplex has to be a boolean value');
            });
    });
    

    

    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowLastChangedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735',
                tenantId: '3203f3b4-564b-4f6f-81bb-53e7bb4f6940',
                tenantCode: 'w7iwdauwdrwuhjipjin8e9lw6iqbz0b1ywgs2utvlqatxx9mx5',
                systemId: '7f1f5605-aecf-4cb7-8317-bbb853061653',
                systemName: 'tkv5er7ldqe78vgybyxo',
                scenario: '9m4qjshpsx8sv0pholbmmibzdyq37hf20vxocguyw1ycwidk5ijw3umjoxk6',
                party: 'buztd5t3c173phvjylsuikhcynq9ujwox0xzaemwwi0sk41gwacm8v9o40icfxabqo2nfz14kkbct8gue1tlle6jymb5udofiy595q6n4vxdd1s05atdmgh6luc72cusiy2f6cnm1i0dpyg76ce7dz2wx98haohv',
                component: 's2iu8c0vcdvvpwhfmjt6puxl27qlowaj65no0lm7jhcvlqpydxcst3jcjpmiixsom9ez1h17ok6mfjtj8uuqug8kw7wf56el30zj53tdvxusu5lwvcst9s6ek15p9mhv0v2jdz4d5t9hyubptnl2b9ctlgkrflqj',
                interfaceName: 'q8zsgke1qw7zf6gux2vsw9gd7oeelgi1y5hof54vzrq72y554hjv3krvapujfmidfr1aduo172d7yo3louy3yw5lb0bzzj7jo6l96q3xu5s2gocfaftdhyvbdxhmnvbbkkuvdx96kb6g7vyv0vhdzyg0aefjv9l3',
                interfaceNamespace: '6ctsvzo813h01hns4xr7sexbmcnjkkiqt1e5d1ojz2t6lfnmcjifyqauijw4jj5yoq8n87cx0lm272phghwx831vr5pj52e8szgq6fsbg971von6qutlkasdtbjc0mlq0azh6hojlu42zxl81qg8hf8961b5cd3q',
                iflowName: '76omptmaiu1yd5xkecx8ukkbbewvfeu6myu94ipauyn8cdf18aybwba6qt2xyw3ybp0qu5qzghj6ly8tthlafbln01olmnmvegpgh5aokkajwwqgaxkttyj8qd07p2xil3edy05lzecj11hu5leee0kak8batnf7',
                responsibleUserAccount: 'q3xwmma9vmgt1bvbgk5o',
                lastChangeUserAccount: '9okoh61i94k85x7p96ky',
                lastChangedAt: 'XXXXXXXX',
                folderPath: '5qw71hd3q3j6q1n328m16yb7trr0kp2un40ft0qrbw7llli7zrg2jwdcvdzui8oh8zeo8pl2inn2klm62jjsew2298sodww08klv9ivfaw5l70f25ovluagwxsrkdi1dlh31sccwosndx0okj7bs8o1vhz8o96adhsazzmronku8tzb3ile8l3etizssqx6cop3joay1z973r68drzbazlaz7x4vuzeq6bztlq9lj8c5v6lgu5ovg98siol70xz',
                description: '5v4j1qk7sv4j0ixa9sryu1qrdck85ufapn6aevh6i046wzaajedwgjmfgv6tslqdjx6zbp4g8rys4593plsa6bo1q3uakwbjihi2qcpu7u719yq04yxnjhfk0t9lv88rzy9eapmuc98aspd4bdzbstl8nm1fali5jedaatq8ht54duujvjyyo1qa50vrb4kvyp6dqxwp6c1li8y089l6n2ueblnryvrxzzjhq21ve8u8tbtt5ced5w69163jg96',
                application: 'np1yearqoaih5g4uy8a4l3bu23a2h1h2h0ybf17614kr312i688ar0x2lgbr',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '08a26543-4686-4000-9f19-5f6f30c920d7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowLastChangedAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/flow`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735',
                tenantId: '3203f3b4-564b-4f6f-81bb-53e7bb4f6940',
                tenantCode: 'fl8mli7mlvlwxwl3pa67wgc40ajufuwsxwr7dtr3tn0yvkz7kx',
                systemId: '7f1f5605-aecf-4cb7-8317-bbb853061653',
                systemName: 'hv0uu8o92ekj7zez21kk',
                scenario: '5p6cclj6xmbmlx0eeumct1nw319ivt77ubmihcs68cvuh2ppyh1aabrtw283',
                party: 'q0kew423qhlmranif0mdrx3mwi3gf1m4jk58tqrz656kcf0l8ditf2ywslbuo23in4nlloecoes07o3sv0xa4mf6a5h790g4wf4g428fgxcnmcnzejgtc1udqhrmswxll5inx4l48jvneru6ai8kde1pxcn1v8ng',
                component: 'z46uejg1xb4jze9gqfaya1tg0coryzrgp52thjrkxolwm92zfs6ao9ziisrnnpk00ab7i7izlzhn7euh9qszd1n7dabi27glxhfeuxlh1wnk8b8bo8ivivbqbpe1ij8xu7cjwryt5yaw6lsqzy5i10abiht39q7b',
                interfaceName: 'anapguedevqlvqxde9if0xswuydovv81f8a9bdqqf3a6pniclj9rnd8shi4jq57xl0lbrfyudvgz6ogkvic8xd0he3nn2srgame71jyc13jaqsz3grbo9oyavo98foqms9s9ub11ocwi5p4xowh8qgx99hi3hs5u',
                interfaceNamespace: '4p6p66tpsu3bwnl5nhe0w6onczxxj5yv74i470hv3x2hcoo68yturj4knnqalp0lniz9conl0k3b15ku3878ghuj65kdxgm73dxlzhoyo602612u6mbk5qprjqzqh34uq7doe48c7b7m39x9k9r0x5au96daydr0',
                iflowName: 'espj56ksv23qnv1rlkoi2yerj9ns5qhw12y9x9t6qb20ojgv0dcs71pix2sdfx2d7ug91psoj5vj0ftie37n60mvarrvlme7ywo04sw8xdt3butecrzikfphendp2980pjci6mk2sntaofqz3vlqpk1q8u3yn0rv',
                responsibleUserAccount: 'hhncqvmp5qev2xvdr0kt',
                lastChangeUserAccount: 'p6fjq57s5cksqjoywvne',
                lastChangedAt: '2020-07-23 04:11:52',
                folderPath: '2wt06giofhjl0syyf24a09ywvjzvvugcz92i9p68h1u5wp632x4ybxzkq55xrtj9vffyx8uvacaqvtju820bsh0dssyb12xyfaboi54cg54ghnrc3nn6wexfre7bthn1uuo7h3yu3ek0ikyqqi7i4qnh3wre7ryemx87iojem5el0sh1on6vrszot1gprofhum7m5wov918lp1y7ha5eqb72fmv2bs22qxr4tsk2zblitzzez3furpf7rgqhzrk',
                description: '27178dj2px1dvs6q23nxi6my9podfaxtzdv555g3r72h3rls35fmvtxn7s2sy865ivm07hx1d3uyo6yva6egr4oeh4r5ooq4or16jiierzms0sa3gij8jdez70jz2lbxi8l70c9fh0gnrwxyztut0j0sj6v1yhnzwvsd2kk1fc3fsg3xyn2l4tto3z9zpx1ex3ud2qor3q1pryhrxjca495r06k6dukrs64k84se8b2d0lihn1xuk5v2174m06t',
                application: 'amzccybjqbvndydgruxxjv77cm2x3b25bik5jqp0l30ndu7uk4eu5651wcwr',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '08a26543-4686-4000-9f19-5f6f30c920d7',
                data: { "foo" : "bar" },
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/flows/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flows/paginate')
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

    test(`/REST:GET bplus-it-sappi/flow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow')
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

    test(`/REST:GET bplus-it-sappi/flow`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735'));
    });

    test(`/REST:GET bplus-it-sappi/flow/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/flow/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow/3c4a0a1d-f3c3-4b94-abf3-3e9860af2735')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735'));
    });

    test(`/REST:GET bplus-it-sappi/flows`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flows')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/flow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                
                id: '4177bc84-cebf-4d66-ada8-729b0cf39a7b',
                tenantId: 'a06278a0-8349-4f86-8573-bf85a9542703',
                tenantCode: '2al0tii9q07aszd4trhqhspnuvgqw01t46nnbezccien92vvw4',
                systemId: 'd15fb95c-9a5d-487f-878a-8ef0025aff73',
                systemName: 'yh9y5hcqmodch35enuvo',
                scenario: 'gg99d7dlabjlrs2cr0synl1e6k887fg79auysyi6zzegx4fvsp956lacpk3q',
                party: 'aq3m60lxu59241cjcixcp79xd5exffmizdrus2thwp8ao4ihd1prmxwzdu53kfe563kce2ty9s50mk9druixbxw7d13nik16v4mhs68stwon1dazae6oh02ntcsp3g59fb87a8b2kj40ua3s5ax1pslbw2h4ryy4',
                component: '8zyozdqk8j3rxecq7eequ1hn3sg6ex40ti526svjvsztvqt33ot6las71tazve2h4ck1ccx7ik6figomutdtbahnfdmy6oxuybwuc4v801dq8ft8hho1f8d4jnf84j5ellao15q8764yj6qi2tefdgnqbhl7ttaj',
                interfaceName: 'bl1tatmqsq2w1dcpkdnrgf7l13p9rb3vxn6x1j08ikf2108altghd3g1owqth2trk6e5q0sh5ggoetf3sqchclha71eivi57a5bmfr75s1vld5vk1vmchto6wbj8i0e31cy7zg7tv1wb9i55za2xklal4sbm6yj8',
                interfaceNamespace: '1a56abkud0ekkhezg6ldtz4h5a9o9z90uhgqwxd7intdt8sv2vf20qv9zob0qwn62qrql7jsal98n0srds04z7rrew1gvgc76ytgw4iifz8elk2vfs411qjhu4wlxhunn5dtt0fh6hkpxh40kwjuqddil59vrwp3',
                iflowName: 'svyrll08079xawr9ukbr87rl2qblc17l1hojg8bnr6n3rx8xttrvdandqu3qcu1e8hkv5b4oxy66b4n3we4pv7ilewblz1yb9de8dt85iz7ibygn5xy5c8ig8ikx38grl6zmofa9txkjwdc28742j3ldzfr3qf3o',
                responsibleUserAccount: 'ii4t1z8707irkrlnb4zj',
                lastChangeUserAccount: 'kru8e05xvzr06fudqc67',
                lastChangedAt: '2020-07-23 15:39:24',
                folderPath: 'wna9btnkdns0jh6o1kysn6ahmamjk8uo1tfkz8lvlipp4qcojim00fxlhczfkvf8q9m5zajuhfrg3yifrpzwzmkpi4f2x2oyfiafw0fwiztzbaq3wkfi701z0x8i886smhx6jg1c4ocotlh36f30exeg6folvrsey24o20elduhqvwozdpsl6iupegqx3ic90vaijmm1lx4fep0qic8oijri29fsm7kexdeas5ipwuzdz0au3mkflt9ovf02f3r',
                description: '6mezlyvwrsqzmrnk7vu8a53sfhc9atv8n34zztn03kx3ez63f910j5me4o5g90vh7pvr096mgofxwqk9kk3wtbuxw8x39wqplz3yx2u66u9q6a5ztg5rw60w6qpre7yxo9zo11qtkf3p4nfcv258v5e14r70i47k7ynfmj20ji07tniutmvagtlae0sbrwo920x19pzzl54yomxyyq9gngylicnifx0otla9s6vtmj9c6vipo24jqmmd2h9k7li',
                application: 'u7zznpuz4i3seakdzsn9h45sqyqulyy6vf1bhm3mpnzag9ih4qafn5mg9cl8',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'c8deac9d-6eeb-423a-855b-f930d704d3d3',
                data: { "foo" : "bar" },
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/flow`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                
                id: '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735',
                tenantId: '3203f3b4-564b-4f6f-81bb-53e7bb4f6940',
                tenantCode: 'm0kr5msfyp7miu1pa6dv05cpalpz0w2du56mwo7i72z2qrzqzf',
                systemId: '7f1f5605-aecf-4cb7-8317-bbb853061653',
                systemName: 'qz1hauwxsb4w86vavtrp',
                scenario: 'mz0zxbzarh3uwbq9ypfqopcbw52dcx9f37wnzxrli52ge4bylhauj4jvmmsp',
                party: 'm3x9dgom6fzakpmc952zbokw6igndbbxb102vhqm8393oxzbnw5smlmvih9ngww2zz3nlrd9s04na75ki5d9uoamn10bqgi1jesurgfss0v76e1rtdw73r08ehbgb7s3yhba6s8pjk7x6uw2n2o78mrivvbqrox7',
                component: '99ofh2ko1dm7vc2f1io8lha7neqfd20bvaxmfjlhus2791xtmg5rv6bd6om0tnh9up1nl915tm338sinc6oyykphu16pq7me5xup49zgs209q32bftxcsrjvk5yq392j5e8u3tdv7eav6poec05gf8kyvtjqtti9',
                interfaceName: 'y6jnqosw9vekrmypgn3yvoday080npavoyl3molufx8hraf1djy4z2txa7mrv23a1bzdxd7xrvor72anfekvwbldtvoabnrqkzl6sucb2m5rcmubfsh3otv9v6cj25l67guegw37wzrmphpl94yqwb97ww1i1vax',
                interfaceNamespace: 'ilzeo4djbvpihwrunbjo5mo7t62xb32eanq4cwziddx1syl99jsgc33fhxc4jhllstlz0z1dhh3ual77ce08ym0wayuy1suyc2q859q016rv2rzwkj3y2rvcqtoz2yhg74f5qjuj77a2y9rfk2d3t96aw9kznufn',
                iflowName: 'brl4c0hdv33nfgfyci9xkiq25zk781dnl831s0q8zqgw8d7ikwqrbk1dv0n0nw79vinv6kbx7pv2l60nniiutqnzd6gomjxrftfllzqxihzeq8nf3v2535ztlg6pwgy5hgz4crsuauj28mfirxm50ikxix007mkl',
                responsibleUserAccount: '23zj8ima9w3qiqs02gkq',
                lastChangeUserAccount: '92mmudn4a7ij8dkeixjf',
                lastChangedAt: '2020-07-23 06:28:20',
                folderPath: 'uhlhjr3wmbfftgqyg0v94yvodojvgdnxp061zb39dkh30vqlgu9nruxxrkkhdv281sgyuuve53ag94v0toosdkhmr1u78luhvcq0w4wzk03zh8im05evk59pjq6zv5vl48x8b7kbrca8lcozfn4221yaief398wmm5ag9qvig6w5kukaxscnfer4clttjnie5mpv6t0va9t4sq954lt8h1kp0rakhmligu1ftmarpl4ul6tlzoj5aeeur9ck5l0',
                description: 'fpq78vhedrcqpf47fpb2o0jet2jaos6fkj5hphhqypf4jdqt5gnujkm7gysqsiehfil6j8sc1ojnoqcgmnde6qnmfwf1uhmkuuxnj4msclzxxws1x2ixok1d5o8exmz8gux9312ap6ttgm2e71uq70zb9yybvtmrrxh02gb3dn9xbzbzjotg86qfffaa4482miyramu6eceju2w0e09myvfatu1mh3i6qw1yl3zxudcphqbh7emrsiiw5thxib2',
                application: 'yhniip2c7h4a2phs0qtv6p1th5d4kd1hvhlmj7q00ksgdsboohxb5pbgo6cb',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '08a26543-4686-4000-9f19-5f6f30c920d7',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735'));
    });

    test(`/REST:DELETE bplus-it-sappi/flow/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/flow/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/flow/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/flow/3c4a0a1d-f3c3-4b94-abf3-3e9860af2735')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateFlow - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateFlowInput!)
                    {
                        bplusItSappiCreateFlow (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            party
                            component
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

    test(`/GraphQL bplusItSappiCreateFlow`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateFlowInput!)
                    {
                        bplusItSappiCreateFlow (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            party
                            component
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
                        id: 'a104a222-d34a-4162-b82f-e28ca3354414',
                        tenantId: '3203f3b4-564b-4f6f-81bb-53e7bb4f6940',
                        tenantCode: '35npew61qgoesdzrl1r80fmj5vt46vkf4yjgsdrmsluopkxx5d',
                        systemId: '7f1f5605-aecf-4cb7-8317-bbb853061653',
                        systemName: 'ujq6gzbalkh95wchjkjg',
                        scenario: 'rbejfwf7n92r04rc826nipnax4wz9bspk1xks061rujntfjn78u2ek8xdr7u',
                        party: '01mjmk3ks4z1b7de4s2g9x8zg8hfmz8m07z3yn0cha0jyi8ou97wsnkkprggj0mu3dv7w5qjj47578oizgstaj0uwpmhiuaiv7dik7fw7i5vfpsxg52uxm8v0r10pg97ftnabbwjxb7070rh4iod74qv45yp3yho',
                        component: '9j8gaj1eepe13kdlo0ospupfjqx9zaqto3skmbhhzngygcygr8yliw0igw9enj82zakv0nl8oz6q7oa5wz26ylmph4b1zd6ni0sr9zp5zqw6dclzc2e7z9xi8556zb23tkbhbl5p1o7v34t1u46kpi07d6fzuowg',
                        interfaceName: 'ff61d56r3rihjpgmburwfj7kim7olgawho56hnnbysoyy4qmvhfnhyn9kj7yr1qhnae6o327uu488sll7qqileoal63uzc5cmxa6jiuyeiox2f46lh15f66e4xkoc425w6j663xzfh3xq26b50x3r1p6d7rajj74',
                        interfaceNamespace: 'uv6xmsxrss787sy359mo79v4orswckvn0akv4v9zky5sqhzwymefg9l82c4h321mt9dk1ul8t2mptbh4xolsqxiqnzmov0y9073ne19yb5yd0o7xuvg8zwxt1nq14oal7n7hpbvqm7w1p6v01sf76gn5kurfnq7a',
                        iflowName: 'b5vczgais23gobc3wf7k43cs8a3ykr6u4xq32b4c2j216hoy4hy8erdg5jmf7chdzsgskzo7xsn70hup8qnyplxickpxt2tkk3ncwp33ostgdv036al9ofv392snqon6vu85306hsfdcd2w7ykjts1b0v4p9lv7g',
                        responsibleUserAccount: '65oskyw9n9pqldobgelg',
                        lastChangeUserAccount: '21alap2fo8pxi92plcz8',
                        lastChangedAt: '2020-07-23 12:23:39',
                        folderPath: 'replb50eklpyydcx17dy2tooknv5awfzpo8jw4qp24p3q396iwrku8fn7st89pzvtvmmxi4q46yg59e4nz72n242escq5tx2aoyw1vmnecrwlk9brak3kmyq3tha6cvdiedo8wko9nuie1kgewnbw7yueeg4pvl7i2h0jvfvhgria0kfqzfgwqe7q2pwjvlkk40a20ad1a7bqnig14waq7hbnhbola1j3w4mhdo91w87eomnuozc3gc8sribn4z',
                        description: 'pxqaosomfggir6z3rz1tvklfyhja1s0w6ezgad4mviwnwki4f71eqyepleiqlgcyetbhos6jap60mn1ms8kq7w171bddyzsjzy3w2oiog0rnn0ifj18h6nzc32kd9skvdao3mxsdxr2iwl3kh4xyjn49md2vzx5p30eua7ikqakdgxnh10kf5k7co417yudkx1yjuilyo7k7rp0j8c16mi7fpd2d3dlpin9qhpnkvwvn4zxn5xnpsnb3kotcs6n',
                        application: 'ck930f2dc5czhr5zeoan8ifywg8dxyitleuzhlyq90ay06q18mz1qkpiqwwl',
                        isCritical: false,
                        isComplex: false,
                        fieldGroupId: '08a26543-4686-4000-9f19-5f6f30c920d7',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateFlow).toHaveProperty('id', 'a104a222-d34a-4162-b82f-e28ca3354414');
            });
    });

    test(`/GraphQL bplusItSappiPaginateFlows`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateFlows (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateFlows.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateFlows.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateFlows.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindFlow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindFlow (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            party
                            component
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

    test(`/GraphQL bplusItSappiFindFlow`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindFlow (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            party
                            component
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
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlow.id).toStrictEqual('3c4a0a1d-f3c3-4b94-abf3-3e9860af2735');
            });
    });

    test(`/GraphQL bplusItSappiFindFlowById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindFlowById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            party
                            component
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

    test(`/GraphQL bplusItSappiFindFlowById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindFlowById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            party
                            component
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
                    id: '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlowById.id).toStrictEqual('3c4a0a1d-f3c3-4b94-abf3-3e9860af2735');
            });
    });

    test(`/GraphQL bplusItSappiGetFlows`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetFlows (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            party
                            component
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
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetFlows.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateFlow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateFlowInput!)
                    {
                        bplusItSappiUpdateFlow (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            party
                            component
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
                        
                        id: 'a5e31457-7010-4fe7-87f7-1356a68497ed',
                        tenantId: 'd09c42c4-c193-491d-ab25-23e3773299a9',
                        tenantCode: 'kh8opiiwi04bjfl949b7bqbumhzlph23cyj9kn14r7k5mjl6wj',
                        systemId: 'f84905fb-ea3c-4d8a-9d69-5f5fe59ee6ed',
                        systemName: 'ig20n78c0jw174xx83h5',
                        scenario: 'yogrke7v88eanaykuixx6rv867ozd6byq2gn9d53nttrdpy0yxi0438s01u2',
                        party: 'x0hhba85s339yribl5gllgv9tgm15o4vxm823ioqcydhjq7m9ggvta4nj4e0lv257wplmgfy2y6n262i6agczy60ecthzomlkl5yoybh1lnjdko38xjguj5qkradc8zc5fx0cqex7yqpwcgmpp0d2cgpl6ly04iv',
                        component: 'sxqm99tyf94ol0287148zt2rnn6b4bcj8mkz5v8qks5d4jqai6znckrtkezsr8lqq96tfqqw5qh69ptqm2ruobuof48ew2ua2kdm4b8mhqdbj8el8n72brfm7n4pozqet66nf8ikqrg6lc0i4335zsi04z7z9h11',
                        interfaceName: 'djv0mfeyhezorsr1fpdfo6glc1gbmuttpi618t6setwmn1qi1y68t11dgbz0fimrhpc639skcal49vuunqi1zmfdfybrjnsngp7cdazrgwre8waoenwvcjkesm1f1pmxmv5gpjehzso32rtrg3yg1smpekavuazc',
                        interfaceNamespace: 'o98towx18rw37vkdo75o6i1atozdx5krjzq97ix54cqbw385f06blx6cu88n7omogjin225rid7fzb40j6pjih64ivkbgx6w7v2dw1cnjx5q0bieav6sclnb4f2gf12np3kjmduk7a8dc57o0j0nmb4wl0p77930',
                        iflowName: 'uwxqyz0c2dljx9fz2mwnzeoahbf168dnoivbhyguctkf26wx0eeh9zvofqo3b8ur3coo6nvpef1cvjin0dxy1hrxs5eucp6s6udv2pnu2550fhdsbd138kdmftb5l3a57tspe47gqooggn6lxqweghw2sisp6d6e',
                        responsibleUserAccount: 'g4lqibnz7gn8ty4dvfmt',
                        lastChangeUserAccount: 'gsi64o5jdvrdltot9exf',
                        lastChangedAt: '2020-07-23 16:20:03',
                        folderPath: 'cvsa8q840v3bm7vbv5rf1qymsbbdsjzz337zw6o882bdqdkcrwihwk4j39sn3oy4dh147yiymzvu1hl2hc63ba3buq0z0e68g1294r0p334rcacszo75zfql3jq09gccpfir7bvxusb23iak7m5itla5ad6y5n4rzg7ymuwrtzznl42mka4m0uivn4lkkjery8p4f58plsxpoy8c91gv4rf9cn6t4vrmbzb3zbapw2m57pm313i8iuwj8yoakxq',
                        description: 'j0h2rf3wu6znl7fzguerr12vaw20mk29u7mo4f6vy1u3o7nvca92ucflg3h5ckawpyvudtmfpevgr7ff0rzchst988o7v7njc8mm69x41bbba3rigol2iwa07bno76fm2bd2kqnenvfv0nr71vez3r7aii9rq9w37q6cakiv5z9z9ngkox5oxodkbpz3p5ekyirfn7wh0v6golu6dn6m6sj4dc8asjfvpooqmfe7z8qycj0k9qk6znytilm23nk',
                        application: 'nkksxw4er2yqb2wzw8gf4xui5xbm6p8d662uft6fj60n72we8yq63wvkc17k',
                        isCritical: false,
                        isComplex: false,
                        fieldGroupId: '72214531-cd86-4399-a1f5-8cc3e4779e92',
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

    test(`/GraphQL bplusItSappiUpdateFlow`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateFlowInput!)
                    {
                        bplusItSappiUpdateFlow (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            party
                            component
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
                        
                        id: '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735',
                        tenantId: '3203f3b4-564b-4f6f-81bb-53e7bb4f6940',
                        tenantCode: 'vruc5m7dku9n48rlz5un7bn0wh562y2edkv4a2it1e4vyz4i44',
                        systemId: '7f1f5605-aecf-4cb7-8317-bbb853061653',
                        systemName: 'pjpke4wepryoxipq670f',
                        scenario: 'dbuw2r0v9esu26qtlsxz2j6iebsjzpbkwqpeph24m7yuvwd22lg2oidoic1r',
                        party: '4o1xvz6l47bsopolx9p0n5inyly8mctxa7pz9pdru7oyaqns9beg94fxfno11to6ln67o629xzm5998efqh1t9mg4dxwc9ar0mps3sznzs4rih6olq6lri6o0f75nvxlzo6ixa09f4ao65mpuracvjlfs3pauq1q',
                        component: 'zcluwcemypomwk9x0wipgksc7b6h4p8341qdc0v1ved17hqngm8uid36hdedufp37zsry4wc4la7r29bq8e863374sej3p0jzyfk1lgtxm2gv7b0x7dpirphjcbo1xqb64qvn8mkvk884hyyoefgevs3jpqfujfl',
                        interfaceName: 'etqug7p5uj7kfu0h406kr4e6r3psn87nw4o50j4nnwktcod46fexb7reah0f17wf35inj5ago23sudl68fit26ipr9rxdcge22jaoyvqju75tx7utl34pvg28fut1rpzc3bxcarye47kizymht1s862kwyiktfxl',
                        interfaceNamespace: 'ks9ptiq07qz1etl6f94pl6jt6os61c630m15r4i9u2qr44kd6wd7838crymvvl5v934is0crsb12k387m64x2d7yq63ycoqxoxvfx9c0vf4oz2rqar8breapfp0y009n8h7plug0gfomg3p84x1h61isbosrxd08',
                        iflowName: '1j7mfahm3mtovqstanxwg8v3vrhjsaoztttu1xpt9wbl0vwsr0qz83bf0e44t8l0ydu54yt2vg7yl1u7ff82m09ty6o39bhzfrvp5f6ful3vrevqztholwexo2e4ho9mnojq4xfwdm0d68jyhqygw4spdlcvxop1',
                        responsibleUserAccount: 'cotadjelzot7c78xirwq',
                        lastChangeUserAccount: 'tepbm5zv9cmp8k0h1nhe',
                        lastChangedAt: '2020-07-23 13:30:24',
                        folderPath: '7j9ystrxltmn1id5vs7pn32aa8dk3ril2a1u53al7yqmxjt5b5tpv7eesg5gidlewyviawnv33ttfv7m4sf5taoaucoakzefhz9pajli550t85n5e6syha2azpwdmvp02ikopklqlq7op55lzz2pms5qjyhw9mqzxcdniwh7cmsvobf296svx5n3jnh3y200brp52vlmkp7ztkj356t3e4e3ozrj9uwlhfppd2qmitos8rwyr1ef3ugqjw83gxc',
                        description: 'lkr15z39acw8rv56y7txu0pt4hfzv8rwig80b85ptyaivnfanbxtmeitnlowam2kpr9chlxc6g1ub8kypoku2qbnz0gk6ojzbwpycmxw1mf4340bh1abnvn3emapfkdjfyrzerplu4htmy50zbbofuihl03v6w80qaob1p9wk1tdyw7px2gjpj3ejlpo5p70d2gxqj8j3niuudvj70fazg3mw76aaujtnu2su1d7zrlni3q0in1cskufziqvasn',
                        application: '5o3v1ezdfjuyabflf4i801nes48izvxtkiu3ej928lpkxzlgl9c8zvtvabpa',
                        isCritical: true,
                        isComplex: false,
                        fieldGroupId: '08a26543-4686-4000-9f19-5f6f30c920d7',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateFlow.id).toStrictEqual('3c4a0a1d-f3c3-4b94-abf3-3e9860af2735');
            });
    });

    test(`/GraphQL bplusItSappiDeleteFlowById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteFlowById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            party
                            component
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

    test(`/GraphQL bplusItSappiDeleteFlowById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteFlowById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            party
                            component
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
                    id: '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteFlowById.id).toStrictEqual('3c4a0a1d-f3c3-4b94-abf3-3e9860af2735');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});