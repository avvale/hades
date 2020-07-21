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
                tenantId: '115d69a9-fab7-4051-9265-75375754b2e3',
                systemId: '709c6586-cc95-4d58-b738-eb8c23e06b09',
                systemName: 'o95ouyxe5c2hxrlasbqq',
                scenario: 'x25uxgfhcviiov3imwrverd4setekh0zw66bzxn4ffqzw6pxcooup4qz5j5w',
                party: '69tiqcu33doizyunkbvda3vwbnjljf7iqk7nk9pmnn6j60osnpk4qp40yb7tcrupkrds0clzup3quaa0kejih9nkuzqws29v7mc7wbks9iuauh6bkku14zfg27p7a0rid1jc7bwluhxlnjwhc14w4fm0a1u11c85',
                component: 'hr99rkb7xnczetmyls5o894qlr8awln19pch2zhzctsim6ptrjrc5t9oibl6mv4bv88te5d88x8ufkarnbya21n29nzgfsxfyjtud3gr30zsrfr5bj069oq0bil4l2tbq5032ljeo1n07iene9laohcoc57pmv36',
                interfaceName: 'zhf9thczfc2rh82yk606n0512uzki930bxw9h86hffw71rw5ezdgj8kak2w2cvrc1fdqs7pwrjnphy0f6d6dbxinbcrg0g16wyqjzl59654bsllwiuryyxjyj0z8cl4ljd58bz5y8xzt8qhmpt93cqhi2y78ov10',
                interfaceNamespace: 'ndmctm89rk0wcobf4w93kjt6r17gbvs79qoj0l081rkt2jbrv3q0aac9cnwmo0otl5ehcrs9ox95cajmwrvm1yojlfzyk0aflucsbq57868n5gwkqgekvlavcgfp3z2b2sjhly42imxsazasez0eb3i55elhmarf',
                iflowName: 'mbtb4yl9cll63top2hk2lsovksg6w9sz52kwt2vvsxupxelw531umir6biuoc6zba18krc77elbtox7fdw6epbnde7gypg2einyqozrr6nsm9ud52p0pk13jl8sbtwqr8ihe1p6j6dm1zm7hxeh2ciyu7mtlw1yr',
                responsibleUserAccount: 'nkj13vrf4kyh6s2iyrs2',
                lastChangeUserAccount: '9tzdbzzjs4gnlv9h37sl',
                lastChangedAt: '2020-07-21 03:26:41',
                folderPath: '4fq3naexe7gwuds5f0pnibnkxzsmrpv3zv6dfhyn5za17vr6bb8gwym2i4otucc246vztdg1atox2lu7mwcb6dtflompwerwi4akkam67wdr7111nq2imcca18ui0ordmmcl453wn93x2rhtwocumu3jru2m3kqrkcjnx05wpvmr628gqne4m27sng6rejqlbk7m4kbs8ffmii0qg0dzf3lr3rbu0poy2ocbu1pvf22gctpbrq1d39jhkdse0m2',
                description: 'hq7a3eeqsff96boq4rchor5zpbuh3hfwod6b4e1yo2fwdeogq01m09mf5tl7v6fyxwfchstqffv09jg4xs6c6n1zt7h5az5x0a5irfgyinpaldvrea1189lq93lba4pr0ahfd9ny3ynvtoy6icmk7lte97b25l0zuluu1fo08hh26hpatepsxcm7drm2v6xv8jgqjjtsc8quzv83yrel7fyos38x5dzg7a8zmt8x34r5jwo6ou8iuvu8gkdmiog',
                application: 'ztfunr6zf286xurer422gt0y2a9ohzkqg7keq587efukvwbp494kepa5baao',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'e01330c6-950c-47db-94df-596b83e53e55',
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
                
                tenantId: '115d69a9-fab7-4051-9265-75375754b2e3',
                systemId: '709c6586-cc95-4d58-b738-eb8c23e06b09',
                systemName: 'r0o3lyyjxswf7ls5damk',
                scenario: 'ls04t6bz2toch12ixr3xy5ofc3c94vp227i2utceba3cm3w38oh5go1cir94',
                party: 'skvdpnvdmmfd37mlv51eph9tyk9y0g2awj22638rweytvd2ik8blsx0omf4qyt9pbegsa5b8l9c49knpjja2kf15zcbsddd5oxppdgprocch7c71d9wa8qfg18p9v48s0vw0dpglrdu6gh35220p04u2y0qu3fqx',
                component: 'nh1wb7yaw5wa7fehhr06tzw81uoe9aa7njqzfzn0lm1i5q0mf2kuwvsezo97k37spz0v44dsfyvduttrjmqamcpfzzq4yof2eoerp7wg5eh8d6dg3imjtj9drr7gus2n645av21q4immd1pp37ceu3xyg047dl3x',
                interfaceName: 'gztikhmbrgp78nycp4ofbb7f5xeoz74r3vkmydbuu12liuxtguc9v8ltg3gd41m0oehkt26fpio56fhmj3sqdsf8oe5nohyxb9k6tfq0ri3qi540m3oungsffj379weckeders2t9uvuwl9k6ks1enqb4dg1ltyj',
                interfaceNamespace: 'ogybeoo69veptvgp7obu4ff9l4qt62pnkxpiwiou8131ivzwzgz3g5ufhgft2x0xf1btfkgf3rr3825zu7b6fqghtc5ll5gghxlkr6tdzxmdriv3kqmxamo4pul63o3kb9i7pbs7hhfy5l02nvq9glvbfpyw53wl',
                iflowName: 'flamrv3w8oyhf16x5hbequ2qzpe4x8pwx2omw2noz0lk5tzbhzavhpqprbfx9la3345kbeqlkh3qisjly71mdimb2klg5cxwy1e83yfvc391t9sbs0r4o8tuciv9ofy9uwv3hx8u8kp257z68k9kk5wqivm0hwl0',
                responsibleUserAccount: 'nk0wzvcktq2oo98bcs4p',
                lastChangeUserAccount: 'r7ne53t2vhx3jsqsz3ab',
                lastChangedAt: '2020-07-21 21:40:16',
                folderPath: 'nhpjpgxy0dijlota14mi18j9fxbtuycudldvihvskylmk7kpuloha4ckcixxnd46ngm5wow79n9yptjuubmcyph35zcsk9locb273rkn1hshck7wstc83tl4fisjzszde9h1ygm2puobhku2gay81lolguxjr3875ll4y85e53td1fsuz3jlxsqqadgcga5fd6whdywm8avae7qw3to9i5tf055fm7mvrd390ib18e4gekihc3yyx1zd7nm3bhe',
                description: '14dio85iibcnvmnjhp47rnznm6p8qq8rdjttyjziz33qudrp55wzb667s94cnkky0jous1h9hyo8utsu4mco8v0mqigazwarwmgf8qxd4j8adzc3ejhtlnpsjtjof2d1xd0nge605xz6qtsy9gtr0jq7wiw1erj9xfgavg4sq7mbmewvh94qv0vcwvg56im64sx6tpmby5kcpwt1lxrvmkx9wdreo6yhi4061v3yud5y2hlv2hku62xtgytzwl3',
                application: 'gjqw7s82wsdeco5jpq5z4z8pfkdeu7v6ix4yan3sj58c319pbc7zps7x11vb',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'e01330c6-950c-47db-94df-596b83e53e55',
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
                id: 'fe52fd6c-2fe7-4ea0-a810-d1103fbcecab',
                tenantId: null,
                systemId: '709c6586-cc95-4d58-b738-eb8c23e06b09',
                systemName: 'eceflkyjdub89amzcuba',
                scenario: 'rq9aqqrfzkqrvcsfxhr1o4v5svpf3j3rzv34xb6spnzr03wctyey1otq6tav',
                party: 'vh14msy5zknb5zcxvowy1f6z5ez5efrkq594bnkc84mz7ggqupu5m6vrsrnc87pjeb68zpux1sokala5eewf3m3dekaqxz1vuggn54xna71twertzk92yhvac6bg5n2b8a9fadz00e8g2vi80lmb71vcnjjvd9c7',
                component: 'uieux0l1mw2so0shiuvagmvifu1x1ly298b417ianilopf2t8v4qfs49une9s7cqy73oygrpmk32x3bl30mpocxy3v5ds93fmowiuklku620zoethuajyy1ccb0kmglo8hflwt58n264p4cskzz9pogcq6p6l6yn',
                interfaceName: 's9kkk422bf2gowjr5m6i48jpp3b7pf0q42ld6gf5wscwexu1li1zabnlcin2by7uczdv302lfafk3gvkwm4jh6gyunzr21ffv99p25op65li2s6d5477i4l6zqbedgop2oxy8h6xh60unemi4s5p5dcb3fdksvxb',
                interfaceNamespace: '1j9nkpk8ngk0ecta5t5z5okfk8c3sltu68h7kq2r7s546vpvesa1gppswoy8fwkx4pm022k7cmemn7cfrx06e6poqtdg9j1y3saf6znuke9bq1xiffdz88wesiwzyfswbgc02xnouh8nn9jjpn2z9guz0t9glk53',
                iflowName: 'ua4brf6pvoi54wqbx4igcrslvzanhou145wyoa68gojj3d1mfizg8dlmviksr9dmt1jxjw27aan03tvo4xy3b6ugpgcy5wq0lkhnzlmvsoj06f9ou4ivp9cf969erdy2t2h0ervw4x1q8bp75cbgxwn41hgqgvwd',
                responsibleUserAccount: 'tlmsz25lsyxsaha6dwdw',
                lastChangeUserAccount: 'blamx90cda3954bqg4fv',
                lastChangedAt: '2020-07-21 07:35:37',
                folderPath: 'j8ef9eorcbettsfymei9dgbobbw5qazbkflh0ku54wxhshnjyfhernedn8lbn3ql2ngaz3z3jdbgmouqgsaxecmkuwnpu03vp5sg6xozk3xot13ofcds6dqmt168q77v36jg5cj4abg99aopgvv4jen69ly9wt0nc3iso1qmko1n9vdmw1liyv75k6c71gcvsxxu60feaf1qo4pezd535i9bpv0hou75hfmu1nbfippcxuqff4brguy9v928nzj',
                description: 'ymx561ezpc5fyvzgyxvp8sn9flr64gb96nozmpvl6c5dcaj5w5tmq6lis1so1eerw05b6iel2x8yyuxsdjw2fj79hc2qrt366xt8knixxz7dj7a4kxniapbkx8vo8k7eo21v3vm8xsb22y7b2c69fy56wt4fbbvds0rcn0cfavgupdijbv5f1mhws28odmgio4qp5qjjggvckjlzeyckx431ac0opihyn4u81in3or6ph8ow7vnf120abcfg2dx',
                application: 'cp959n00rq8vvf31kf8eeaqe7cnr0zsvs5mn4mzqwyrgqm0sioddv4f2h5o4',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'e01330c6-950c-47db-94df-596b83e53e55',
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
                id: 'fe52fd6c-2fe7-4ea0-a810-d1103fbcecab',
                
                systemId: '709c6586-cc95-4d58-b738-eb8c23e06b09',
                systemName: 'zlkc44yy790sy3ew3y1u',
                scenario: 'xfy8eqmrsgzred9znalprv8i01en8srvz5azdqyxg17928j34nq250if65kh',
                party: 'e0ztbhytjcswsoutz7j7ie4ww0fw8j917v001mmk0tq7e0uhq5cbgc99bml3t2htexa8em8hs06sfmr8xg0ai1lytiwk7w26tuyx7riqp2vq6sssd1vrru4tojhcc1j33qetsybuz1e9u73axclye6e9vh1ov02i',
                component: 'z0kixhlxafstofwzu4l1b2875qz11d1421f2m281b1hv2q4bkzkv960e80vm6g9rhoqan33f0ac794jvzbpd2kuh2nn4iik4l495cu9ao30ibf6yck3dirm01kfqnxs123cv941yilngif4440h5vnumrhevo1hq',
                interfaceName: 'm9t5km3wum553fi2djug15euvlbcoh326dtlhat17yk8kv7ks0y1hzq59nhir6c3b5slzfri8ookcutxouesf0it5prknpzf268a22rfso8f5ytypcezxgxp2j54fs027a0od7x6u01vzk9i0d8l7pww2y7w5auv',
                interfaceNamespace: 'j37oi25a8jtfn8b739wn2xqu02m5y1tahq3pfq9lkfp8d97u10agsna5m0hf62ja5shdiml1hyuwo8q9typjqz6w25j4jj6r79to24m8vjd6rbop5hlh17zlnh48ld12iod5ct0b7sa76xcgw8fu2d4s0zko03q2',
                iflowName: '758799qlmzudduwr01fgfz1yi5vqf3w7tvsqbdj6kowzbq97at38c3otsi0jlzryecbe3gzlwqt97q681je029tnnvc8j1uzo3bwaz9iehcuqnbdjxz4wiuspoz4m9sfagl6zlglqetndrxq74f6be2zkchvlwoz',
                responsibleUserAccount: 'tlghb84xbjggzus90y2u',
                lastChangeUserAccount: 'qadg3v52mon3vgq61o1g',
                lastChangedAt: '2020-07-21 06:54:01',
                folderPath: '04blczb4ihlx6tauwibq011mdr9e1bbrrc6u8jfmvuoodug1b9kh0v05ghks1yqoot1cjsq0vym56ewwuda5fut4p478dqvszxx3yj5jldbhv7tywx45s7f2dcaors6k4kf6b8lysgotvs3ibbkbo3tsgtt6t7ra5v5kp6j910l8hop04de06u3ez3d3dvo2uggw4e0xf988qseymq5tx847z8louj9affo69hpvwqoexh1c35ju7pah8zrrehp',
                description: 'jqkjg00vjdb104bqjg8b7ne6ds423zz9284yg5pm8mr1n9ds88w7e1me7ms8syxjodo6jt1obxf3ric6p3gwj3uqvcgv528i5npggc3f6swtkt18si7m0gkhkhuipsmxlpm25vwfeu52wov5ih332tkyhtxuzvukiw025o3w6cbt6btl11f19cv9vyx33mf8dfm7irdhtkhulubvg4qwlybs71zs5hvwcoplpu0dibdixsb2k5priw1ni45ktcl',
                application: 'ywh3sfogg9m7chh2x32pf9ycnxkyx9md4xd3vr7iu07fv0giom81sr73uwtj',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'e01330c6-950c-47db-94df-596b83e53e55',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'fe52fd6c-2fe7-4ea0-a810-d1103fbcecab',
                tenantId: '115d69a9-fab7-4051-9265-75375754b2e3',
                systemId: null,
                systemName: 'w7l3f9d85iamv8u9ibv7',
                scenario: 'jd4ayiull7ctavatas123o3nyb3c5xn84ar96wodkhci9aqpxjc4l9jteo0l',
                party: 'lb15y2gx2yrauqd5nl9e5ib78ctlhqtvqos998dqny5aeo7eibccv6rvb70vs8kqho8r5jl0hl4j8bqb3qfgb6kzx0pretkisz8q3qhcnqyytv6c5qsxyz7rn82yz9jfo73m2ff6j34fsa3xoubfdetdvq6dicq5',
                component: 'i64v0ldlkfpt0ct81jmgv933glok5j4mchp9ll162o32uypmijslbhk5kn2b1l9s4yebnxbeuuisrxznt5d99me8l4h0alyqwsqtf7nwlpald3noidzpu7wr1x05o0v2amqmbnflht3i0orygotsgre1glcdmiw3',
                interfaceName: 'j1lxqorfnda953y61ijhz6pbi8t7quedmgg6y64eulf434sl1hebe7hjs55np1x3hvmcp3vkvjpqm2d6j60ehpiy4sgk1m2hyrt2skba161x9cbxrn74sugimdc4l9o0sj7sfpq9oxfqk3nqlzysuvh189aq82io',
                interfaceNamespace: 'w4zznf59fpvcts4mg09tlyfg17zjvqdp7n7w92608p58bav55fse44entrg3i2zyg19257unetetke9svbnefo36px5sz5voxnlya3ckmbqvphufnhfqs5ge0or2rf4jox191ja6jixe4cdnbp6a4ojxh398x4r9',
                iflowName: 'izd0dmlof572h1z7mqfdkm7m18xgku3zwwytn52er6dxi20i87h6zz6bvrjafxklzrq41zav7rrwlxplgavow4owvesyxpsmkx7r5wk7qz3npl5w8j80z2jv5o5o830t86nas6zmcua9eg78imq3ci1yxn9ahztm',
                responsibleUserAccount: '30gyaq77sm24jd9gnc1j',
                lastChangeUserAccount: '6orx62a723o9vd464bpc',
                lastChangedAt: '2020-07-21 08:43:28',
                folderPath: 'wj1hkxdoduq7altuin78jtmkdb5oj3b0rjx460u9qvk7eo3i56irilm7rgomcnhsyuhomrbd942u9fnwqx913ab1ixouhmgdquwvdk5x0qno36121bz6o95ezs46t3gymmpwxbh2z15irfsor2n0e9crj1j43e3hlc4djt98q2b97e5dx0bqminkh2o6qicjfktw1i58z53v6ipmkyqr5pzt5keepqpz05qkd1l1sznvq9xh9jp39r8ob9lecam',
                description: '4ivogfx0bint5ufj8k8r5bc6axg2c40il6lq88g9p48j9b0gapy7a3c9etjfv6jgw2iarore6a6209b2ue2whgmphhznmf1mkrpjljc16fc2en1hwyoh2ye4gye497claf64it9nwepz6z980ol65bu8m40p67wvog9h480jcc32ifekd3nv3d9oe8w1l44ymjubgd5sea4r3snvbc3uyhl5dthmcehi2veoul71ega0ujy1e241jxg1vl0cifc',
                application: 'nyjoqyc6ajrtgxroitszkhy1tb54xmbzy1o4ezc9nf0izb8w9n0n4oaxfc8i',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'e01330c6-950c-47db-94df-596b83e53e55',
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
                id: 'fe52fd6c-2fe7-4ea0-a810-d1103fbcecab',
                tenantId: '115d69a9-fab7-4051-9265-75375754b2e3',
                
                systemName: 'yjjlduk6dkmysqw5i1rx',
                scenario: 'wdwob58tht9da7w2byng6s42usaofjceq8dl2ujs504nmnj7ay2665jv4qu1',
                party: 'qmp4l67vibueqyv1xbmur3q75zu5w8f34jhxj4g4z8jesnojepxxdiyhpuhsifd9rkn2sd7oia8b6bom011ooeatcsdpfkz4wb6tlifb4drzu05vv9i9xn64gdrbvpjey6584mbft4r9herzcep9lrvz5tdmr9ex',
                component: 'ddclmfqij9r7y4rvv16ijeih9lhc5di36my76pspw21nqto42ubd6gmmry68gomxgdrkf5g21znspzx3jssmc2u8fgntsofqypzcddscovc5yqzir9t2vmtp6m1s7u04l98r7uv5szhmjqb3b3xhw3de5z3ygs5v',
                interfaceName: 'x2t9i8zbxrhhhkmbkypejzopnhy1jphzy04w8hkj0snn333hy0re96u2x01lnl36bopmmgppuayo7hg7rn59duqoz5tv0o3gnzkn67q75wlokd133zdr9ukbb62v0gn9g5cm4eoseqm7zmbnqcb6alcxx8hzn18f',
                interfaceNamespace: '0muwg77nkx829f15gwbv94s61qjrtdy5dfi34viwh8qgby6f3xivuwn7xb6gcfsp3bij7f64n85f4w79czj5yujq6lhuvbpqsoe85apwqroitvt9cnaetqz7r7n73q7sk9ciq3i7duilypahrs3uof6avxkah2bp',
                iflowName: '0b0b1gymecb1q2zkova3q5gfb63bekznv779wihkb0z2iyi5800emafcv3qpvm3lcx514wt8nj1hb8u64lewoxcmzgo5p1wfvw1gg0vfl94njwkae0f6dkfxuqgsquavgqxfkybkarcdrpdpxmw7jo58txgb4zrt',
                responsibleUserAccount: 'fbgka0905zfzjvjxvboc',
                lastChangeUserAccount: 'jdhuyxuqinduzoe629p2',
                lastChangedAt: '2020-07-21 10:00:25',
                folderPath: 'kxo4kl9d0l52nal6v3tm97o8f5bmgvjvo8i5s1phqbrzyx3jswocf63bb40wkyyho53jsi1p492h7o3aajauued3xcrbd290qiouqjq4gegdqwdfsvj0mitxio0iqqui380wfi1ijhhhja1irs6r3g18l5os41jf6990qbckc6w115zdgdxh929r5uie2nid0tt5nsujn3w9czze8huv21dun7pmxwiafbzojrwx9et50zj1nkb8itdsz16f1yp',
                description: 'mxpmfswilq8nd47nmu53hwpkz4hncs7nrfvi1zfrss18exlw2y50h4eq0rcvlzc9zoxq6g6sal37iaihjeoepibmbsdtddlaze7tepjxze4hj5ph6sp7sa21g2ybnspk1k7hr3787jnhxzl09buld4tyfojr502yzdulvncy9j6gr9ylovvlkb1ylvqyty2r2hf4hnzrsk7eti0dte9kq9js2yqwa0rd4srdq0j6x2bhdl1zlr626xa0h4hzm4i',
                application: 'lxfc2z5sbgeaoppbioohxxbmou95m9h3wr232h0izriysjvrehodblz9vfdl',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'e01330c6-950c-47db-94df-596b83e53e55',
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
                id: 'fe52fd6c-2fe7-4ea0-a810-d1103fbcecab',
                tenantId: '115d69a9-fab7-4051-9265-75375754b2e3',
                systemId: '709c6586-cc95-4d58-b738-eb8c23e06b09',
                systemName: null,
                scenario: 'n7kt9tzyofpuus6qhlnf963a5f9m3ykwlmah9ryusqh9r53kpt9qjkgmw43n',
                party: 'v1f5swc4lccofovxbs1f64ox5bzmgmjuv1nwvac7bull7wz0ktvrx0uitwdvplr9py5sgk19mn1lyo4qk5zwk6yz7bxidhaub0mlhvsihekf8psalgv1ndddw0aqva218k6mwekg5q44r5uu4t3tffqz9e68zdc7',
                component: '2qxffh75ggnnrbojk8641n1v1andj23wnxclm4lpumb5bvz8cg2ednlvxv5qr9z7oe71wo2ds7d5gzvyict8wqqjhblo74gqqdttg7hgnlosbl12wpsqhl5nmolar3dt0ex9cbeglp0abo29qec4jppuxljycabc',
                interfaceName: 'uhsu5ra62brisks2y7a19rmtccaknv2aaye05xi3rpd1l7o3mokhy0u0w8dmr2wglpgf5xgjipbsdx7it3cj7o6fdz4045sk4zy6j5nsjfecljglw2bktia1r4lida842cnvvn5a9aezfogdikpqal21efp195fo',
                interfaceNamespace: 'mvvgws9f4kgavwpawbnw71m936dbd4m8qn5m0wi8lhv9ipwajupu03w6svsy2r0iv3pzas3ceiz2nvn01uejnlgfnblyl2ey047c56g8sgup70d03ktfsepl2txizcifvpchz8p9pw9rd28z8el43naamp83tyg9',
                iflowName: 'cvovi6in8x42okzmnd9g7olza3u5md7j5wtcvb0gzyy8rjon7drjj1e5rf5414aolx1abjzgg2jm0z8653judu5adl8pshvoxv6buo50k655dd1byjnvtznjt13fgrj5xprocu7o3563wjw19lafgiqbnv5zuc8a',
                responsibleUserAccount: 'xdvt0iiiv9rur2abvier',
                lastChangeUserAccount: 'ceqb4u3nsydho4xaha45',
                lastChangedAt: '2020-07-21 14:05:16',
                folderPath: 'qu7lhh0sl4xz5vqx6niqriqh6b2gldicyqvu7qrltr0t0ss8cmypcxnmii343rq5id1pzo3f3trwvy2cu8z2pcjn8c37mc1spq0anr6ieh9vg2d6qieqjakyira3cs41fokwim4wv84lzmd2tz07xasgnnwm2p7tw0r1dawrdtv02smq6smek5cy05b0ayrlmh50f2wz3s4p26zhnprni3pln8bhj3riaenrxn7cz8qsplnmrlrmpan355mtq8n',
                description: '3ndaizciro6l6vrtbyv3kp91va8j7zb71z66x8o8q8dxyx6ihlcycsqu0qymljrn6mcon8the2enyjvynvthiqkirjxbeqvj4fd7prg4x0m5bar8g8y12j19prwc2p197trzqtwm74pb088l9qcukubdz1j5tnup4l79k1f47mnb8s2vzhas5fxi1a46cyj8dxlh9wyyrxg1j4tw9dymrxd5vcm3fghkteqfo5dhlyk7tqw67biv77aliwbj9go',
                application: 'ycttk9fjl0dz6covue8j3agu8n61bobpyhe4wz6ocu88mre5xts8b5p82uw2',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'e01330c6-950c-47db-94df-596b83e53e55',
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
                id: 'fe52fd6c-2fe7-4ea0-a810-d1103fbcecab',
                tenantId: '115d69a9-fab7-4051-9265-75375754b2e3',
                systemId: '709c6586-cc95-4d58-b738-eb8c23e06b09',
                
                scenario: 'lgtbbitkeyek5p63pf24q2jgslev0p8nn9ety0kgeawzwftkjjypx03egccm',
                party: 'yyfw9nfhmrfcer5aj3qmf1417zdaftmkwan4aroxhlbjt3vu1gsfzlvn9ycrjfeu00oe434xitkq7w8ulyxk3bcc987c5q596gjdzoz966a7wcc4n9e8qrkwr3uteaochlw9usud0od1eupuwqsn2sbob0rlhb94',
                component: 'd7moo9keyqo2jx2qffyaq6fiuiozwhby682qy0iwfj2x4t9ywyjw4crl4bb7z5zgvxun2kx6x00xhdrouvjpy7h3ttjaup0fki5jne0c77yt7kpxbo15hc1v0qyl00mdy63cfgjuhec78j92rci3oyuauhkyprpb',
                interfaceName: 'o239im0t7myx9je8o8qlbk22phg06f2pukvpmzkofjgudq7eihtl3m8mtvt09ykx8whw4zlawktcfg2h4n7bfaeklt7hqkq981m1pcwaffyf7l2ctaykwcudad4uipozh1nimn8dba27hdxsk1wg01geq8wrrfhq',
                interfaceNamespace: 'b6j3y4k4wjkkpbg8gg7gse8f1vw90ruuimmjt6bqzyijwdig52ueqacjlql8oi00ucvbipka9pu6vezrti8hjs70k6t5bv9usq9k7mkur803f6bcp4r2p6a2bxs755zo2wjrn3fbr8lox1qiivl0n6wldnbxvayn',
                iflowName: 'd21was3nplv3ern6pjkwu63cm1rgzqa34giplttbkonnqg2q1x89f477y0xg6ncpateh2xor7hmbbfu68mcpvfngdqz6tw73ntgwpz5go6n3ylollndv4bqpn7o4w2hwoedxypclyhqxq5irpbqctwhkd3wlsy75',
                responsibleUserAccount: '2xrhgbxm356t1usk7dkx',
                lastChangeUserAccount: 'zz3u5yd380j3aml0uwnk',
                lastChangedAt: '2020-07-21 11:11:05',
                folderPath: '4thalda8ycpb2ezc3jteekcds6nl4vw5uekapba1xk1s7hktedqrp3echk36k719ctggw0oe09bsy57d5z1uqnarc4dipvfxawoj53pymv5ou1qqiv0i2wxg7kambswoyncoab5ey1haz0cr9nkk9ivkivbd3errprw27j6n6vqekd6o7xtwo08f4j1fg4ur5bgt97uafl2s8l51v18nvb6ytw93rmgsp2hiwbjix37iztx5kukokquhju8gabh',
                description: 'vlfxud3tmwip2wsuid2d4yc8wqqtnzqmaglvzy8x3g4jh00tnezxzd4m6u0333d47qwf58u1qpd7pmwywlu8sklfdr8fa6a14yz1x8hzssoexx2gey5z8qkzb3imwmdl6be1hg660ejkqqblhfl5tttrfsj572a3vrk997amcavrfz1pdhcnv86av7qs313ym26r8yhs51e83eo6ghndvowij84mr6ua143z4fixqhjriskbs5sa30bfjhjtrvt',
                application: '61v009nvc60xzoc8n3hx7vrkkawx4pcsuwfxlp2hmz1qwssvn92qxl3t2ddp',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'e01330c6-950c-47db-94df-596b83e53e55',
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
                id: 'fe52fd6c-2fe7-4ea0-a810-d1103fbcecab',
                tenantId: '115d69a9-fab7-4051-9265-75375754b2e3',
                systemId: '709c6586-cc95-4d58-b738-eb8c23e06b09',
                systemName: '1fjqmhqnaicy01wegbte',
                scenario: null,
                party: 'xelz3hsxcfy0qxmyxxeq9qbq24ez8yhuj8skt8p2udtj1furveh7rkh5dqx0eapgrr0rygjs9tl5ii7r80w82mfzjzzgefdf93b8tuuazeoxjx6zux97cbk10nvdnve9zyx3idjhls9tju0dr8bd16xcau7lo6fx',
                component: '3jo6hi3uhjk1hp1tjst8s6jrz7hqf4d3adt5fgam9qpfblge9l1baly2f6s2ypbxzv61ztu731zw8m3500pmn1213u7g6vqacjckjflmij7p9r8b6lzet6dr04w1wp58p31u7s5kex39n1wx18bzn5uq5zb7f6j3',
                interfaceName: 'wmlo6v1tkaxwsgbmlzsisxh9tcrs0fh29rd84ezqfd0qsfg02pzf8wc2aqlx69zuygrp2ugpzk3z249dkarjsijwvdzh6a36uicnhbub88x1bq6cnb39j4jqavdaoq5ogg0v91ozcmqv1wb2rqdsyhk8knoustzh',
                interfaceNamespace: 'otvecyc7u3r10hbpx12yjkvhniwo4od9bpkhj5byw10ddj96ww1dv0ptgcfhojh971b1aj1js0k8ef16wrt8f5q65j0u7xjktx2estgxqwup1yojeuora8n82be24xjko08td98gorct3z10732nbzm5bxmayjx1',
                iflowName: 'b46k9e4z2xzueljsnymueft4vgc8dqzndk5efsn8fncw0xeh3jke2tprnf16xbvoqbs1zw5pd4joo6yw4n7jgrff6qjcxm5wmlu3oujt9ug0iql6psurmatw7mgv604e1200ez3n78ttk12k9flfhnpcx0bgkzqw',
                responsibleUserAccount: 'ckv1ickt0hc3juldmznz',
                lastChangeUserAccount: 'gi021789chis98fcyluk',
                lastChangedAt: '2020-07-21 14:53:16',
                folderPath: 'dl3s5or72xytvmiqgc3305mk267a5omodq8b3r9swg1zucumnqr76o6bidkmf0d22091lpibxrkxxdxfdvud9jtzgsstd3f6vb1wjn7ypf0tju7vsax3xjs9iiwy4wmu4hz2k7a176gmo0fb9932ntk8bxd2mv19qonoqrt95ne126hyg58uwrmgnfa7obf8u6f56ejf2ohg81q6wb2ml0adwk7ycnfvq9dj3nbzzb5qngj0pfr5gti2defzp2k',
                description: 'mbrrtlxgk9agnpli9ckfu7f3oaay9ok8z9ne0ueqmd5uyh538artlajdkkyz3olyww7l9xe5xq5yrk65s48vs4bb2brp8x3vzjlsm4svh8cowailjph7p4gjjjfruqno2rc3kk7efezak019sfhqyn7v6rl4bef0xl28efjow4i28ixczudpkletgixso05pum5mvfqru9u294tnrf06zztost0cjxykhsek2z9xhm1i4mr3yvhwy0ona1hxv30',
                application: '8wqp8owp40g59rcmqg2djqo81aepwoc3c168cvkvvoakbjy3ti0rwm5bsmlm',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'e01330c6-950c-47db-94df-596b83e53e55',
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
                id: 'fe52fd6c-2fe7-4ea0-a810-d1103fbcecab',
                tenantId: '115d69a9-fab7-4051-9265-75375754b2e3',
                systemId: '709c6586-cc95-4d58-b738-eb8c23e06b09',
                systemName: '2u2yxl0nqd000gnx4lxz',
                
                party: '8plks1djs2i346zvyd1g3ff5bnesec3ukaz0fcnedvlshwg7kss5iftdsxo1c06a9tgsmiix1j8f46v19ue688y46kfsw5o8e96hovbvfwbu7gpqp15wftepqro66mkfmtlejjdxfxpzkh19qfawii5t6o4kgw1e',
                component: '3y9seup6kd2oh3dv1w58rah9wb42kr6tu3dss9uapxioca0u3dsnotm6u7exs4rciwmie0xpsxr21c0mp2v0d3axdarhcla3iwzu3ofcvjlvbwj1m3dtcr56wha6e8xq0frxwctxv32oz6hv1ongrlta88wkytxf',
                interfaceName: '70txpyv5b6q62j4sinrjavah2lr4kbjvqlnrc74qfw0uvzsmexnivtbl1rqzixwftgtva3zw9lfs0wed9hf6g9lwvnx4pt9kc5aa22xbj5co8a5vmyexj92bj4v5jsntxy65fj948okokf0z8iselddbt6269k6o',
                interfaceNamespace: '0gg1pcnoqyxk3w4dgbsck9a1pflu5j4ww0twqumeomh8mr92m7djq37och2tflmw9xd3a5leplp01ralqatrt4k2e47uvdoj0i3bvufdr8lgtv24msp0thoe6b2fu645a5v1tciaxhtaezexcyckri77fkgvuvtm',
                iflowName: 'hnlxl8lov8lg317ie70b3z7jnckr4ff0wp0w197wzo7efd8ot8yuxjzxrd6wufq7cag9oorjih2z1njmtd7vrfpes957wu8qfi8a4jxf6xybvk0i0k0zunclp05iefj0gld4r481xt8i1x31zx2y8x5whb7xoexb',
                responsibleUserAccount: 'yxm22ew6l3g5xl7ck493',
                lastChangeUserAccount: '976itnjcjfc9ke12h2x7',
                lastChangedAt: '2020-07-21 14:58:43',
                folderPath: 'fwmrmsy2kqouvdy30kl4tvpqo3fm1nu4ec3v7yiq3cyjv3ewwfdwnssh8pxsk3leo9x37ki82qeuyb4o4yxnxnyqbpest94cc1b7xgi19l25r8340fodevv8u9nlnq58ds7740xqmhsnuvot3m5wmagk9vqflkdg6ru7bwb7wyn4u3igkhz7abibq6n27vf2rm2c6ksrg4l310s9yek65hjvgtgrpsnc1vqp4l8d5czxnsrj5i1tinjggvust55',
                description: 'ymz1xr9u8bf79g19y1pzjijg3837vb23eak023ewruihk7thhjus77zbfvwwv50vdytjmxubva4zz5bc8wlvigyg0qb5cttedynqn7rwscubca5wgpjus79d9xroy4ow9ykws5tkti8hgw87ul89uayaw4jbsf7x5x1hkhf9r226htpszzr10g8ew3yoqxh6jwosl1sw63xyicwqt21ofc9nw77y9iglhqy8ervs27lesxukd9ow3c5yba5aexq',
                application: 'pglpyf00n2kly5jvsg7gxz3egolgddhih9dkxjd93prvxv4l7613ipt5o1bj',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'e01330c6-950c-47db-94df-596b83e53e55',
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
                id: 'fe52fd6c-2fe7-4ea0-a810-d1103fbcecab',
                tenantId: '115d69a9-fab7-4051-9265-75375754b2e3',
                systemId: '709c6586-cc95-4d58-b738-eb8c23e06b09',
                systemName: 'sssudxc7iulug212apki',
                scenario: '1e9pz5ctc37doep7p37sa3il0q6wvyrgt4huziucatquuz8xdhdbef792g59',
                party: 'kpliucish02oihpp4nfhyfombsa03fpz01863dtixo0ax5p8ik74mmpcn63pxfupj9fx7yntwzsjtrtokuedqniquwsl3tmi7u1l93qck3xlhmai0d640338fwq0gscfnyjm5nmvxgyu0c9p23vvuhxw54ht65iv',
                component: null,
                interfaceName: 'bfw2nwayuws8lh4696ypvojmz2em6nl68srxbfmoelh4syxwo4rt9v94lssnqa3xqvmze64ohrg20f9grfpce4c0nbl48ah3w8x09eubd9dqpdi0alqr1h300h333jsrrw5be4ill03f5ztk2loe50zok1x9gmyt',
                interfaceNamespace: 'cp0r2k44x7ufm48cte1hhfbfigeya34mxjel7mpyz16e39pgwr9e39pqfj0sbnpuiy3y5wic7eqxrduk2mc7qa5ssg2qc0bn4wkqvj56xckon26ugnwogay2j9k976cfo866hyff7qratb75p76opw5jy9x86nlu',
                iflowName: '13knpec4rreznis3abbuhxi5otgm7cgsbvrb054jfd1rqbf88l9p6otszh7eg2jk0f1fenbi2icmeaq9z1x77ja35m00hkiliwdf0yb5bwxh2okrmz3ijsly8jb982puk1iridb0pvumg379ljmkx6d2r253dm0s',
                responsibleUserAccount: 'e05zzw712ijnrwhbe0tk',
                lastChangeUserAccount: '8zsvlh2i0kl377go94ws',
                lastChangedAt: '2020-07-21 02:26:13',
                folderPath: '4u039z0ynxxygqukkqhpwrsmznbotz5kzo5upu3g5iyn4ghf6q9xc0oaremrf1kacgjq3bu76y0pf0c8g82t07zl2x2csybrf7fpjplqbmuy49q3azfcrbfn9cd0morg47tkuwqropbgha1vzqe452yl0nho65w8a71w4he553jo21vqji9r5uioxir5imiidolqurlgp5s8kapkfvvbu2vdkrsb5s4k459f3ve8n305y6zrvdgc6r169ykev2m',
                description: 'wnmruvxu15p8ee4yrvq2sstb4a9uru9xrf768jkf4ohbfk2asgmtqdto9dqdaviknjr46uw83gi5hgcjunjagyut6lwwop1wdhb6d5d7t9k4ivx3t7a6mjiyvydyqqh5v6ns4f0kd0kc7ve5xfgo1gp6lpk92esn4fb591qjfypgkyylucpkc30a1uhuwdkmeu2irf2q31qipe8sh5inw3mp7v45d8k4ljkaz00lzz30bhvupkdaayonos0chl3',
                application: 'u3n2sn1mi53jg2fg06txqthh8r5ae06u3rc61y62uu8yhpumzvvt1ctnk06d',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'e01330c6-950c-47db-94df-596b83e53e55',
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
                id: 'fe52fd6c-2fe7-4ea0-a810-d1103fbcecab',
                tenantId: '115d69a9-fab7-4051-9265-75375754b2e3',
                systemId: '709c6586-cc95-4d58-b738-eb8c23e06b09',
                systemName: 'w7yln9skde35a8hyv4bm',
                scenario: 'azw2h2rrldm66w8mlsi3wbhxmjbmb04v0lpxlsz2jndu6dic1jkwqec9e7b2',
                party: '106dceqkaf5nep641l7xcp28g67pmaxpxd7mggrv2iyoxxe6u5gdh8wgcsua7ijc4kzzyezhdrmei7552vk21kqya4dwihtzcnmlslu458m6e281yi011vldvfd0mkmxwzra8ndasq54brtumatkw7upy3keqp61',
                
                interfaceName: 'ihlv3iikdn0aglut0cbzjf9vxtmtvc183wd7ojnhq17iqw54xkh3os335inxti3vtmergnouqs2k76oc0sjm96n6qvdgk6wsgly8zk6svwdn08zr88kfc31j4qehh3gmyx9zfd5ubxv8z7fm6a73einji13towy7',
                interfaceNamespace: 'nc43qafel5a57xle95fpwtfrcmatfwc7y77gff2gsulbyxq3n27t0rbfinhryok9ba6g5ksj46tx3b82r7m4mpsju6laya7q6nci4x7e5ow4r17e20vylyggkpnp5h4ap6ghgv2hiqy6p7jeasts7ocpjcwubvdc',
                iflowName: '9uldwdm110orgaxabhpvrflyni9idejk602ma3lsz6gc845o7nopvia8wi1nhzzyswlgp2m06zwcwe1hvpeeri3q7vyq06rcznqhk6oe33u22c1pm2499dvkw31iozdqzllz8ehqwjdpidomqz62vq8cmbu13026',
                responsibleUserAccount: '3atiio4dqh0h4lz6ysys',
                lastChangeUserAccount: '23oyy07o0k7dt087nwid',
                lastChangedAt: '2020-07-21 04:58:52',
                folderPath: '3muwx19v88rlky39dvza9t8wa4jq4s4mw8gra8ts8npz6kvmfkmw6rjmngt9d78y042kusfmz9fbevggrrztm23ruqvzcth04k3brlj1z6ejwxtl4wi5dsp3uhswt7a9rynffxc4lsqt62v9usfo1to837eo8o7gfqpp5phquzbu6sgzphmb55yugamanozu7ttanmdiua614g2s804zy3kc8fgh7ccq7m1n2cs5debjfk68x6gxhgixv8lc9gg',
                description: 'ofocygvjuxaz183tuulzstkyj0vwc1hzncgtzz9o3fyi3zf7g88y0z9avdmn475zi7bbdyb4sdmxjxz7tqtpnj815k9bf3gbbw2fbyo9732ly0ql5wk2eluf89fzttgoinsv8wmcwnmaowkd68usn20dvpojfxnindbs61e5ffrc0jew4pwxm7gvbcbhl6notyemr1qaj60hdewo9fp3iz8l3plzvzaq08uug4lzucis4l89x30gehd08y8h02c',
                application: 'mrp1hjapqh2syw4wl3zym5up3wb4g9gqwi6jkv04zz4m2kaor8xe2sz42w82',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'e01330c6-950c-47db-94df-596b83e53e55',
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
                id: 'fe52fd6c-2fe7-4ea0-a810-d1103fbcecab',
                tenantId: '115d69a9-fab7-4051-9265-75375754b2e3',
                systemId: '709c6586-cc95-4d58-b738-eb8c23e06b09',
                systemName: 'tuncbv9bjs2rvnzbbbjm',
                scenario: 'swg8w2l1yniwbp6nxc72bsu2pjrf94v8xa2895lm4dk241yawativffakuji',
                party: '8ch4gpq7lvue9p6il0foca5lnopbojvy3b4e2vxh4ejt8ke0w2pk78wbvp659zql4qbozxg6uys7giblrjfc2lzu78j2tmbaylmqw2oma1qb6hghrvpg70egky32r06m3y6eh699uf1m4w2a81qo11fzmhymib4o',
                component: 'dek5gswelszyw25udkhgtxixekfwmfwyd8r0ibf0hy2rmk57eyy4fcyf1jxdlk1lfg6h506t92k9zcrx5dmtl7yxil37hvj8w6gz87sytwgydz5tn8sj9jlv8cfb6qxs5r8fuoduy8mxh84kxr29sp9b4q4mip0g',
                interfaceName: null,
                interfaceNamespace: '3bu68zotxbyfxqyt679kis4jusdn57hfoh0lgtmyxg409c2mfbaafev5hnnbn0i0othm07fjq1a5ipx3xcegxzbrzi55fmc0ckkylucy64gb960a114hojejxhfziumimg1wf94queiu4wfdribfveldg121k1f5',
                iflowName: 'ws655wa2jw2aynhwi5qg06k6zvipgdhtrwb9kvyw0qfiati1b4q8n2dg3ow2tjp3ilnbu5ydx04e1hsnm7iutrlt463h29easam0zws1rba1lobrof6sifkcrexdtoplnrkhxeh7ghhjtoatlvvy05gjq08k7uyg',
                responsibleUserAccount: 'awb9oy23ytf0o6wbcf0n',
                lastChangeUserAccount: 'w7xqfuo9o2oxtv4dsvk6',
                lastChangedAt: '2020-07-21 18:56:04',
                folderPath: '028d5bo6zxbw4z9qih728dcxzu1d440j2jx1jb8f3j35yfwu1psggeqf7w84v7uogabgtde8ziftmo5ub6v8whbsctzb7ai12z1u84ytapipi59g5rkziaicokuwsouwdk895i29sueqq15xakbejhyt8yiutlxwy7jdpwaiapzprwl9nq7wp5u8yr8o5xfl7f87104149gs6byks9w2mnj2ddfjf69gv7dwum7ylulx21hj2ajhy40upaghcm1',
                description: 'uu9eoihz37dhttuevt8n8hyrx9b2ky9ffcsle61u0dp4zoeuxhsq9qw2uoshcu2kljftjxvv2zdv48c5ofvjo8todlyu2be8qvz5kh815zykpymt33874q4t4t32b43k98sc508b2y603b9jvkilat1deyn8bfhoa9wkma6pfwr1ffd60fr0bjhrqbn8y3aoybyfi3yu51kvfxs7xvx1ikk4vwy5h71xa816ba1q2ow0ytktbosxqsink2tlky0',
                application: 'gei33bicab3ilujcny97pinln4y14i3rzjmb2t9kc3h6bjms3fxf9ntsi53i',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'e01330c6-950c-47db-94df-596b83e53e55',
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
                id: 'fe52fd6c-2fe7-4ea0-a810-d1103fbcecab',
                tenantId: '115d69a9-fab7-4051-9265-75375754b2e3',
                systemId: '709c6586-cc95-4d58-b738-eb8c23e06b09',
                systemName: 'qyxabmz7itjb8hmah7g4',
                scenario: 'sho1e1uz7t8kykf1av4xal9un6f0mozttvtxsv8iac7go66iaa5rxyr9s952',
                party: 'df0yy8xy7vvkovqmog1g94asmtejioxeft9rqsnelpjy3b93gt5qlar8orn280cetyt0h4ogcidq582jc619fa7xtr9kvaf10vl3tpntgfkjp50rp7ya4fowfs2sazn81vzq7bof92k9vj2yvkf2zswex1l4rt1d',
                component: 'voa404dzfblltcmcpzoi11hmjhqczze7cjkz2s61x5w4dy0t7hihuyx1mi5h4g9qmukefaas9zmnyebhhicic6gcetiu5vxere2o9uxdf5bcwfmmm9rjjbbgt3mnwgq053ycl5g9z8dahduwqce5sp4z0hblrofi',
                
                interfaceNamespace: 'ut3rdkl045ty7j6iqz4l95cimji4z36sgx69khxkcmeqzhy1o110p9kxts744yjlw6rc6jjod4ane46gmw8c50t5u8759uw1kz1ly5aild059kwgklui37b0gebu0lu2r65yvqx8dx65gaa9km521mxk82cwc6ff',
                iflowName: '6h6wzf6gwe2o7g90o5rqlvw6ldx4ereyu3iaayxi4l5mg7lrz7q9u4kq7aajalq5bgpnlrj5xnyce2foz97pls9dyzcltip0s4wnbqms6nxuyx7y4akhooqvmlzwmrwcx0c6z4ba5kl2ujmm4haptgkffskbr4xv',
                responsibleUserAccount: 'gjdtyzgctuldlhcuwbbn',
                lastChangeUserAccount: 'tl9tx63kmxdpedb2w973',
                lastChangedAt: '2020-07-21 16:37:30',
                folderPath: 'qesx4v4lt5v6o11vrhraznyhn83z4dngx3x41t633l6yx7x5jusafudp8vinubr1zz6umfoe6izgoi1r31wvaq3aov5k8e6gjz76k2phft8jqrfrhtka3bugx5krg7omfk9b8dr2t83br7vpbq9kwpogwyywtto7zodn9v337u1jczka31kozm1z8fuz143u9jqm705uk0j3aaybrx19nkfnu5fju88v6xxfx1noyxcgwqkr9kcln51kphz9ejo',
                description: 'su0oelyljadgmdcouv2ovob0shp981j597laf0zniu5j7qysywzbfbxwi32x6cbtqh4mg7wvo8gjjb2srrh2bo1xj6q9cmay9hm1rysjlwsgv9kkfj6teq2f0f0yfprlf6rjyl3s1j42b2yuqeb7jky07dc2l5945bqiw6bx5c8l03oqtvlcqt72zv3xsey2jo5qkjx4do7ll0uoii8d3d4waq40d70rs7wr3757g2gctvqgigurfjayd5ttxkh',
                application: 'vkq7s0fz9o95c345jotzf4wxhga1omjl79p3yqxsycgw7tflyx1ywhlfe571',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'e01330c6-950c-47db-94df-596b83e53e55',
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
                id: 'fe52fd6c-2fe7-4ea0-a810-d1103fbcecab',
                tenantId: '115d69a9-fab7-4051-9265-75375754b2e3',
                systemId: '709c6586-cc95-4d58-b738-eb8c23e06b09',
                systemName: 'hhmc85ync2fmap03i6vn',
                scenario: 'xb0c4clp4kpkmbjycg38kwd342cvz2wmcwjbzm9vje3omxe7i7izquk31dmn',
                party: 'kn7rwv98123ku7vm3sciz8sb1q1jolcdpoby7rn857pf741dro6350ytjl7mbgkwu9i91uiwzqyv19xu8naknxmmfku47zj1wlvwjnkrp4qoffejt071k8xvuedkjmf1r8k8qtkzqdxbzbr82gsv7snunpytv32h',
                component: 'qjsmn50mpsr3w307dfs0v8ufg09v46l9qzbe3vr2ctkdvpn1i5668gm1xon09wp32cs11amhq8bhwmo5p8jquyllj7rnmn1u7l0cd5uid9n9bwb61xjbb05aus70np8o6t6kuwtd4j7b7hfj57n0n12uu9g89iqs',
                interfaceName: '6hrrefh53wmcclp1ijn9xx117tu0trimza9d5iz56m4yjgsmknjwrpsw2h1ovsz713o9o4q9kqazr3iunnrxzj1l26spaub9jjvb7oo34387n2kzcu6ilrzxk4olhbirhi8q88s5s7wrk3bvaoxfeawm87n1v1rq',
                interfaceNamespace: null,
                iflowName: 'qx5c493azge2vv1l1yjsz0zeyu25s0ys2zakf3pzx0zy2be8zdr153n2o3teqqbfst70coj32rkgmqlw69m8j64tdrn5irdbyno94my2m5c3audaqvvcpmk2tjh3qxg0xdhilntb9us2qz7hcg3xcy3e886w4lss',
                responsibleUserAccount: 'yl4ne4x1jzf38wwysoey',
                lastChangeUserAccount: 'zhal2yqbemkullzarhal',
                lastChangedAt: '2020-07-21 07:38:02',
                folderPath: 'n999dlsszg0ry5k3082kiy85uqwfx880q67jsz6odvd3zfb2cwzqlmxe69elrf3v8dg1jgqxll2syaqgttsgimso7dlrzbdtubxp3mf5hx7jan0jcbhmopsrloe2sk0mzl0ombfyv6cq0dl26q40umhftvpqi6487bjkqzrfj5itlxya0ny08av1joh1ruc77s4pffb7pa1mo7hbyr7f1co74zs9oes4ha8ds51mr288bv04971ascunjwau0l2',
                description: '0gdwrwkj8mldzq0reu7llfh4ensgyx3fhv55f1d6ke2cottnsqglbrdzhaek3bja4eq68opef5tosmcczkc67ra7mbn3vcch4ku1p172i2m9ie9ahzcg3l0c58iee4qc1qrcu9vajoqkptuvi9sv7d5ezf65ckfd0348cno75i1zbe0329wsiwqoco7vc579vj2otp2c0lgp0w8bwjdwq495ocbi3brd0c146m8v9p11vrw1f4a5q33gc31wvah',
                application: '1up87mzv3z41munhg3qb3oqvtxkjmgnf880g66cndphmxuaemezqt2h5b1yd',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'e01330c6-950c-47db-94df-596b83e53e55',
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
                id: 'fe52fd6c-2fe7-4ea0-a810-d1103fbcecab',
                tenantId: '115d69a9-fab7-4051-9265-75375754b2e3',
                systemId: '709c6586-cc95-4d58-b738-eb8c23e06b09',
                systemName: '101zytjtrqy5yna52t4v',
                scenario: 'z0e4351utnawteefvw4o9cnlsp1sibhgihor4r4ad0ld2dhhvwbinawbcdiv',
                party: 'uwcziluppu60o0eg1wk0nb01f6qm8bkgwwdcn35bpbkavw9ycnfqj64gkm1l9g8ohvrv4zoiwxrd4rdddt0ha6evxipoyxfk20tlql7m09bbizg55fbsoi0upe7aixwabmjms4s9u0szung9uhd9o3wsrn5soif3',
                component: 'axugde3skfx4pjgyuljn9p0shzxaqxyfqrz9t263uih1m9d6x3q3zfrmh3j79ct0nap57f94a8hhypp16y4xi8wel62iwo93i4mn2a23kn7wqpfa84amck616ctwlygexliupgxl4hlhowxsofmzgb66505jt88u',
                interfaceName: '97453hnft8ttp3fb42gsjc2b8tf0wsmfbn141cq8455lfo9e9odl9jwos2015ulec7m0qz3771bqwakg5q1htm0t66gauusxu9veag9vqu9kh1s9e2faysf55a3z3ly5xv5eagzzz83hxw9gbyyicfsl8d65970d',
                
                iflowName: '26lc7b5m141x69a6wb33zozm37ds5x84yhek03yo4xsm0f82vywo63fnsj3nsmeslkj2qz8q1go18tnu8n8ehd6kzdj38el3zxu63465a6oaffrytybh63ihntk2x9g1b9tsns7he1m9tz5o209tqqmhxcqlm7tt',
                responsibleUserAccount: 's1z60j85i1c3knwa2a2u',
                lastChangeUserAccount: 'ubilrlwv8twzeqydm1tk',
                lastChangedAt: '2020-07-21 20:32:01',
                folderPath: 'rvzeg4t28swul2lx7xoi874ptjpms4t15mllqgtxuekqwnxaxojlhtpblixrzffef13ud6sg7uzlq9577pkrvzck714zov06v17h7732cxn76qptx6iob4g4pu63ss40nin2vd5m675x5bx814x65rnpr3x1ud7o640mydx502ekp4vnvu6swxn7gl9p3fbzmbgo1ez0urarzk39fli402nzs2q87tw3c0dkyhyu7qgbs6dof8sd2xj2hh1sz9z',
                description: 'y8gu93upxl78pdb7tbt9tjtg5rpp8nart79007sp1oajd76fcp9dqmf7a4pgpgmrs0dyrdrwh2a1dwmqb4ljqhf3irhb7vjfmh47b6zihbcu83iywpb8eo1rtlt6ln9j4z9w185ywyidzkue5wktnfhbqnrr5vxoe1bcmdr7rrfspsnto3h1a30o8i172dhwsdo90asw4ocq5a047l6l5kbhjab3ypcs6okbl741yn6b0d6w7v0pckpipnbjjrc',
                application: 'ims6g1hvgwawugceya12pgs5hvxpl9ihcg1lnkx5d9grqq3co3ri2lfxtwfh',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'e01330c6-950c-47db-94df-596b83e53e55',
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
                id: 'fe52fd6c-2fe7-4ea0-a810-d1103fbcecab',
                tenantId: '115d69a9-fab7-4051-9265-75375754b2e3',
                systemId: '709c6586-cc95-4d58-b738-eb8c23e06b09',
                systemName: 'bi7jlbfo9ehjrxwqxttm',
                scenario: 'egh1hq4u5vrvykgmv3kh54ulhdg3ttnk1mvmx63trwe1yybq0ul2jxjskr1u',
                party: 'mu35zri8o32znwot5840kdsu6sac5sivaaoknh593m8mdfyeocs0ia2bplmp7hj1bicbxfd2hejw6l33tct327h43o54ah94bof5j97fflap9kedef4ubs4kibaw2dm4uvotoduyeyffbe18lr4rvod0tp304i83',
                component: '9gafykjri1pdrnmfbulj2n3qplbdfowgahocp7vgoqyugodq6x0hvqfsegixyxjhh8f5skvk1zsrn4tiyr6lw17ush7h8ik316eph4rjztgwztx9gl0rpa0rmmg3bnrnkz26kdy63evg8n01dzcggz9l43cz5uls',
                interfaceName: 'mlzv2k1b9uknc8315iuyz2lqxivjon42gincmjgcuqvxcifzhpdey09jfvtezit6jy74d1ghwhb7t0w3b1n2jijk6wzeupd3oovo8eqd1w3m94i90oyd0gwb40ue49bbvguw0nzrqivg9fadcc62hikhh3l3mpnw',
                interfaceNamespace: 'c6uimehjhiatnxwq7ni5dwky2ke48rssplj8anxybbpbr27jhzrakqarzr2z0v6v47exzv1yt9sg00dcbuto8ja9993hjy7gli7gv230awukmh3jycd06tp6e72byzp6hc4l4jeefa8yqtak4no4olrj49jn6bzp',
                iflowName: 'o0aighl3us3iun676kty8233z3zvy3a81gonxinvkghpo4657y572ti4ax2r0134j4eeq796w1s8dlsjve1mjptut0lblta1zrm9eb3wa1o1dpq354c7kcph81x5pyqificl3qxqxq3x9xi9s9qybh5si0kjuai2',
                responsibleUserAccount: 'voog4bhr19i1gg2st345',
                lastChangeUserAccount: 'tt32avq13jvawhqnrono',
                lastChangedAt: '2020-07-21 07:58:16',
                folderPath: 'dao8l1t4372dnc4y2ymlqq9r48v3jiskuklopoa48l5lwchoiefh66532zj7yb38fpcpw0633oatavi8r1urcoltm4h3ovhplqu0edam4jvoed0t0nj17doo24fhwnf81oqqu5zth6kvmby2f53gky6lcxyoik114bt7hpq38ruxf31cfbl5zl5181i73pimwzz3fy0yzgym1jz8xc55by6rmuftzgdd96z5ti9rn5gxaaezrhvhg3vgeuwus7i',
                description: 'ks2lcy6p6nzcq3no01wwui4ldfiq90lkflvj8jhrqm641hf2utco4cueb7dkletnhgwey3pthsr864k2nvarfzahm6zz0g498xuf2goel4c8ngn777atkrsi9hvk2cdb1dmr7k1ysu2bezkzgpqmyu64r08cteu0tgrubk8z4021gvcnom11b1vjxnjni3wfsnfz222s462q5go8r0z7fn0lbsbvia8oximzxaz6ni8oz7kgkq94hvm8c5aebr8',
                application: 'v8v34ufgkyr5i2vit16xpb1f90jhob8yvl7ahb2kqwtnl19yrglsjd2dy3sw',
                isCritical: null,
                isComplex: true,
                fieldGroupId: 'e01330c6-950c-47db-94df-596b83e53e55',
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
                id: 'fe52fd6c-2fe7-4ea0-a810-d1103fbcecab',
                tenantId: '115d69a9-fab7-4051-9265-75375754b2e3',
                systemId: '709c6586-cc95-4d58-b738-eb8c23e06b09',
                systemName: 'witr1csxp6lzzkqo3dgy',
                scenario: '7zr9uuuq3myirehyxp1qoaqj1a7xjmyuaclj7pmmiqa31o1yilw1sgd5q6hd',
                party: 'ktwvlhy858oxj2v35va541uda40cd02lq15k2lpy7l7qznujlmlb5r04lld0g5r97jm6rmlt1xob9hsf7kwvlmmm8vhg10hmhe5t5w4w4fpkj6xhbkfw1rdjiro8uec4vrige9hfnag53av10y2uhv5qvw20q5ql',
                component: 'v7thriydai82q1cpwmux82ak9zxymkk4qitef8ywmhnnlde0pv72zs1qjwwedgb0l4y01xsfl1gc2wm6e8rhngdfdxm7wtd2ang3certaergyzirf4misjaoxmyspjkz8efe6xdsn5tac8xe8cebthhqz7fhp7v6',
                interfaceName: 'tg8gj3ah4oke9uofij59n2yldlj8pti439h6wvtnfs21zfpmvbalgzj5y7b6d7o4sf12y7nlha545o63i7bfr2gf80yat7c3nnxt6qeluxl93fu3j1voflztm6haj4pvp1j6j46gtee9yw2zrqaldwjg3nwgrbfp',
                interfaceNamespace: '2835qa4sxfzzv0x56fm9htsuzhqlp0ayg7u6k5vtsrvp3h15rp9r1wtguqvpqgql4mmrda21cvn40wwnaup01qy8lz1j5686nite8tet5o5hegp1maiqj63j27fp1ywn2uir1u30a0cwi5cz4jorjce5ay4qyw3e',
                iflowName: 'u8ncjadykq19a5b47dj2z85jiz7ht1eivqmbmzi5v8ao1cd39ozhclnhffyswm9d0aw17fumgx9qb4zzj9ys3iljh40are6xlicxse8mdkhskufv7enbm4ye82r0r7tfsftwqenn4rvi2dr94vtfag2vkn1jzmha',
                responsibleUserAccount: 'pz03dbevfeznpc9jkv7i',
                lastChangeUserAccount: 'lchyaplxtwfzmkr35277',
                lastChangedAt: '2020-07-21 20:06:00',
                folderPath: 'okq2yaic63tvpts9p2t78ph5zhsxhqhn8dqxozomdxushyqa65fkdgv0s7fmr8coisn4qwn3krpnhxd1ll2slzj8iijj0azpmghvjctqvcnweqla2tz3i3vov7alc85qbuk6g5pf6tgyxll6t3e1eecq4d9ftdp1i9okqoxb8aveyr42rpz9m792yxbudbclgber0gyd1knwjolrkfjtgf1bjzzpq71wnxbdknuz0rjpbiqyg3byu8r7bjrqkbr',
                description: 'iub3mxap7yimo8l1wxupn2h288o4sjn6bsx2oix2f7ydp2j1b5sd5jznuky2czjsi3sz85fi8870rw4hbwkoc1iay8vhqcnnetw9ya5rq6ti2dmxbore0mnd38x0jb5p36m5j8l0c8e3v2zppajpj7m6k8rlo6o9uhi86kunl0u00zwyr9esjglu88petf68roi431jyufua5xigb9fhi5f4uwrs6vmtnnp6s9kzsx2m8dvy60i3qr04joildcs',
                application: 'l80i38vw2z6s6zsi0vcfp7oa1vx2hpsckimpl7t986fy896arn38485ofu5b',
                
                isComplex: true,
                fieldGroupId: 'e01330c6-950c-47db-94df-596b83e53e55',
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
                id: 'fe52fd6c-2fe7-4ea0-a810-d1103fbcecab',
                tenantId: '115d69a9-fab7-4051-9265-75375754b2e3',
                systemId: '709c6586-cc95-4d58-b738-eb8c23e06b09',
                systemName: 'jegy9ytvdyjv94r1kv4y',
                scenario: '0dn304v6t7bfaumm23d317w4unui7xkh21ynj969r122kg2vxz3nvqv1r4it',
                party: 'i607zsk82j8r5uzap2ie9g6o0yd4twnhg8vueb9n33gmt55sk2za0eon0ujmdq6oe89257l54h0jalcgx9egrqpo8tksvn0q60v5c67uljenfbju71he0asf7lpzib14u6s8ylf9rijr40bj4sk8skyr0emija5j',
                component: 'icu4h89nvozcj3qhxt0zjk4wonap19uxly9jransc7cqnpeyekw4yu8zwpxxo8x5wlmn2swfn882h77rch29qrlkca5av9jqvwggkfo19nqhs7ysmx0cwewpazcnik7rcub1lww14g6gg129nb50wsnt03twi8nh',
                interfaceName: '3wqjdvlanfa0ut40o53ylizarvm5sl5oouif8s45hkabeoqpc928bp7usr6fo1wwfep5icyjqtpq1cmzxtxy1yyf1hei1amd7tp3c5qhiu62wcn5hv6y1ndrwfr4g3fg4yx1cvar2336cvg1v8853lo93a2pr0cv',
                interfaceNamespace: 'stt19i9ynfcsya65kxqbbubpbr3v7feiolweyuw9mqtkzxu7wfuucyu33f7b7v8iz86wo9cpnko6rgklch5ugelyvz17xhq7cuxg82er8th2n56i3gfdeq96z8vjvwsqhp1i4rqdvvbt0bgphsgi6j24vgpjcg2m',
                iflowName: 's11881a6nlmxkw8ko0o7wk1p0dzgxqigopp2mcbz1f3yfeyj96vummn03emg3sr7yjbnbznbcohaa00ntz2olg5wl81me241kywwen7aazyhg5cfv0ueyslp1jlw3skeej8mygj854s33u70ysrhd7ysjfneg8fh',
                responsibleUserAccount: 'g02mao25tbrjf5w3sn1v',
                lastChangeUserAccount: 'ulxo8ur5pvmwx4h7sm8e',
                lastChangedAt: '2020-07-21 08:45:06',
                folderPath: 'ojxdxuoucjjzaeulbuovbjbvpindz5n73genonjqc5391gwl260b8n1i187dmkw0c910i5bl8wpawbwjtgvslgwmik6i6i7tmw2irgi31jl48ba5eddgdd6nlukloyx3n96y4ok2v78tpvqfrn3uq6d161aq7l45u1s77fnz7p5zqjuls6w9674rdpw97xbh0q810i98eu4p9tzgj9eki364a8pbo57rxewkmxrbbpx452qovtk1rwyobbagw3t',
                description: 'j18sj0szw7bd35rhat2w1qgd08t3nucaw9dr3eutebw1g5h2wo8ef192zrupnih3nen27jvs5cq5zi1if5l3wxbnclu2wudx1dqh4e5zgrx8duo9ro3ljes5lik32p5q6cjuah7gk4rmftg3snlorb1qynw5swcfx6gltp59cnpp9wxjb94u035k0klciccb3it9mm4zpbclurtonuvjepi22wkxqrqt9vsmmveiu54mxqmuvon10wi6gwqqx0x',
                application: 'aiyv6vybxqbu1v4zf1fysczn617jtdhzbs5mwe4imc7rmczxq9ehbgz256ig',
                isCritical: true,
                isComplex: null,
                fieldGroupId: 'e01330c6-950c-47db-94df-596b83e53e55',
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
                id: 'fe52fd6c-2fe7-4ea0-a810-d1103fbcecab',
                tenantId: '115d69a9-fab7-4051-9265-75375754b2e3',
                systemId: '709c6586-cc95-4d58-b738-eb8c23e06b09',
                systemName: 'h787fdh2sv8crywbk8mx',
                scenario: '6j5b6sd9x4ir405dbdkpnxfuvfpr9thgs4qoe7sfi8b7n5y14xg5dpzyb2h8',
                party: 'shqe3zq1i7u5j2cb48wytxv4utibrajv12tvuzj5ig2lfy5hth53lazvkzz443xh4shv13lejkiud1rc2dmjy3a86j8trys7ne72qa4sv2z1k8acaiygjas9sqplbnthenkpqg86rgkvcb3lq0bcraqk6l4sk8f3',
                component: 'amxvzqk5jrtdy6hpnz6kg96sur382px4sftcd7f8wjkf5kbve6xtytzl2tabupzllm4gx9h7rg928jmx6nw7pgxi5heqperesw77pu3d1efg0jzebhm64vx2nj100dmn7qv0opr9hzvv3szcy1iyt97alqljfph9',
                interfaceName: 'uwytartnnd6regixob6aeq6dsmx4vrtdy8d8ts6fsj5rydhjyydvs5dpxga480a2q9207oqmwsg6yqd0fhq58uoybgg543xvn6oipt61kic30awexy3y3nplbfkw56psbnqg6nleywencp1zxqr0udlqie61b57s',
                interfaceNamespace: 'vpqam0g09a37weea5mnm8g4ntspp1mjutkf0ue4pg5h9z37ppukgjxa1mxj4xgz9s7gker9qzlxioa6wz7kczebczuxc1y7kflespdrwdkgh4uaq2rcpb81yfmd1r6s5e50kaokh8qdpe14axmaevaqp6udggvuz',
                iflowName: 'f9ozi5r42w1pviduktbphir083qw5y2ja5gd6qtf0hkn9sz8he5o67o5j0urkvwbls7wmy6otbiby8a0hsqi4pei9mkvu24dbo21xny3ilwqutbooxg3xshrtsday8113v32lk1wlfz0ko59l4tjqeu0nng1xhbm',
                responsibleUserAccount: '3u64odu2uk4em36ga06h',
                lastChangeUserAccount: '1ymbh5ks7qw6mhyiwmmk',
                lastChangedAt: '2020-07-21 18:24:58',
                folderPath: 'm105cnb17hixcj705mhun5rekj7kwr2y8ltvx4zoii6xxvp9wewh3x7faklt6ur7ft5woishxomr48goml0efalt9ronaeheu3licpwsiq2p9tn8lzhvdh15j3z1fm64x1yegrvf87shlyxb9uods8lf9czyum26g6mivcnjtw1kcrsdy5tkbuxr91ndg1z1ekirxb7zfvarkksq1ya4tlbp43uxab0e6qsbyafmdaoph8g4zrzuqtzg65paytz',
                description: 'jvw0knnynozijtexvgd0csvza0pu2q34uttigreoj2ci9dkjzsywc96odr0i9n819ti6eoqrcf22r9v3asgvc4g6g6q70kt7w46dxjlazoattz6npz099genno8lzqq2qqmevwukykh3qnfz0fn660vx6hk0j5a7f6cp5gg0ec3g0s4kz43e041sb2q9gtz6yuasz23l3mc2xwxmroj4tswpeuq4enhm1kwxkk426shhhfe3awra89t9sg9ctdb',
                application: 'axx40h3kuhjop7odhep62qtcec2xxzozy67ulrqljn6giic23vsdogjjhli5',
                isCritical: false,
                
                fieldGroupId: 'e01330c6-950c-47db-94df-596b83e53e55',
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
                id: '2gzso2ckdil6gf99uxise67sxbe4il7u0gav1',
                tenantId: '115d69a9-fab7-4051-9265-75375754b2e3',
                systemId: '709c6586-cc95-4d58-b738-eb8c23e06b09',
                systemName: '2nq3zme1zne09j4iksyc',
                scenario: '1kuhilb5cfweklcur9d4gbpkj3azw177i49dale9dpzwli4c8ntxbzc5py3y',
                party: 'tuzsy3qlvfg25ccvyoyaoerlqphvpu1pa5y3n4b1qgsy15ybkujm7hsn5xr34ryekbbpf0os61lq2u2odi5i5ch8jposiyzatzhbkrba5cz4djbs8xt14ukpevh7mudr93usi0smjormgzrruvry1rdiwcg4yscv',
                component: '6sapac811hpwpjuxssfgwpb57nv99zizvgdlcde1vamr35qww4w0jcvg7h7jn4cd2fqi39vs26f9o529rallbxpxirtk9omxex9oja5g904h1myy5avd80uzjxfitnide7onn78tpsqd9oqy5rwv41cygsw38lft',
                interfaceName: 'e4u9ozkncuenim2by4wri564po2yjnmxe5puuaqvpo8tjj1nl5v6tklxnnizavuwhyghudsryvzdip618xeac5sfxxeroma65vubkmtifsqksg42aqzc3l9crxzh0ayme7hce00itx99k7qac4mpafw9gouayl20',
                interfaceNamespace: '3tl1oxlezwwdcnydg4apb5kl6zz4afeppe56o9fr5sc8u940iradb5p932k258k9bznb7tu7snxfyb22oc7ydo3osjvqfxl2l259cduzzfe8f5upf5k6p0tmzs6zwuylquva14tezq569asyc8di080ji0fmnmas',
                iflowName: 'hxpmeojcwn1yblotgvaj15n9ns50mdrf5ukzq3v09pfpyb92p2g0gg5x7n23iosxjsahl18pnxvj879xuhtxynhxljqne9tx39w4ar9z5diwe6chwu88m1fszusddx71efktxny19a21ax6yte8urh9y7dubuy8h',
                responsibleUserAccount: 'iwewf7fzypfsineihsjc',
                lastChangeUserAccount: 'djesxzt137w4q0nmse63',
                lastChangedAt: '2020-07-21 21:45:50',
                folderPath: '6ychcs77p7v8vf0mhexorc5xi87rlvg1uu8ytojf578jeedw6qk7dlkw3ujga0mge1jn1goucbl5rs5wyrpvt5a2djc183dklm637s9u2lvux7w5euemdo1eygqe4u0ykossmoukby2pkqvvytwbpe1xanemh01oq1wdnod0dt5ad3x1nsvrivckcni3inbkrsxut43txqe7pngopcaevev8pbcp6zsfwlar34gi5t3uhb7qfn8mybmvhn4r0mr',
                description: '3ptg1si79sp7bl15kxvig1iu80hllm20udfqtbitlwjhisamf0lkrozzd045yo3vsql7uvmoddv2oykxg98zozevrz7n1duq1qp29810d7whuw2o3z1g7tm37i48abzoypkstlisi5g1tdw7enhlrg8dokeeda3wgkgk00ky12ji462uvajx5t2cvalw2bde76oo31d1cj3twbcey1alojbtav1pls7ici5dqaj4pnd7m6455dzlhpf8j8zdeqa',
                application: '44zij0j09pajyqlghxssvxs9wjhviunsreuxsocf5u6ywhwtn2axu3smatra',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'e01330c6-950c-47db-94df-596b83e53e55',
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
                id: 'fe52fd6c-2fe7-4ea0-a810-d1103fbcecab',
                tenantId: 'c4vxhs6661m77zi3r66wsfw0wdi2jw29g7ayr',
                systemId: '709c6586-cc95-4d58-b738-eb8c23e06b09',
                systemName: 'x6v7zcmsj4gmlye17idh',
                scenario: '0dfsns7d2z28o2mc2dhrusz6dhb53y5pii6urvr6g4cae4maatp42lji1esi',
                party: 'x6hxlxq9928n7m5i6c988jgdzefccuek265hlhrpap6vyx9jhroxovf6nq9zehxpulb7k8vk7z4mprwkydv2hislj9j1t46p4pryatquu3b7v34u1obvaasxprtjsc6lf8l08nofvkcxaywo9demc9vcrgykf0lz',
                component: 'h1vl1uczkz2b9gspimyl9ogc2kktpdcomgnwcza798c4zzhw3ryv1s548roah48c4t7prxums2rlfyzywovdh3c33ftvneqyl9yai48s0ede19rk7yaumlecu0jme2e93zyp0hb8rc5aicr5wex3c8ut3p7i1iob',
                interfaceName: '4w8coz1pz29ob98xuooy8klp840xoiswjog82ro0i46t2cix9trphli2pm86epoqzaminrc29irmx9wx0bco5sgeavalhpi2wv0tzgal6poi2b2twbvn8abij10gg3we7dgpa7gw988hetzbu7bde4rr07h9fjxs',
                interfaceNamespace: 'h2fil5nc8pcrlzy4jga2gb7273eyam4idu76udcwlscqdbsjwqk2fimfw9opd4nid5bl8vjs64dhyk7m104flo7f9wbegh3yosjafky4pu3jgc2enm2affmop8q0ywsfktdskuetm257wl1egvgol6i3xtrygz82',
                iflowName: '4u751qsw80ui0hb2hjwoa5c8broldkaif04rteer1775r9valirl5wtflt568uhoc416s6wss0htx4m6fz7ojfhkrqqp1a8jqcltaor7w572w6qkm0imsvh37onjn78e6dy38lfq6k3y9t1xql0w8loz3f7qqyu0',
                responsibleUserAccount: 'ajfsdj7vg8r753h6rnrv',
                lastChangeUserAccount: '4i2zd78stwra2ugldd7i',
                lastChangedAt: '2020-07-21 06:19:15',
                folderPath: '8yb2xww5kd5crln1bqjb2yldx6ldq3hlx5ie0mqwpwd4y4w4bple64l7el3mkrlb4g7ajn1b4p1vmd7k1r3s4oc8jrw5rh4kk7qtae8pucc3p7eaia2i2tnept1jvbmhqj3mci504w6r5z8yo6wmn1wm7dzhynr00kyutqkjw85n27f6blybr0o2a84gt3p3v4sia77lw14zhsbhs7q3npekfbss2cmv0shf4bjy0sq8nfjbpb66s7i1kbhk5oz',
                description: '8uoc39gucjkf29bfshciarnj7w2gw3o2673s33sybdgbnxptczvjbkae3fwh1esexsiwpf5lpzaptqtr7jldfkasivpjbekzyzrvy8ewlpfqr912sigc4lnsmuf2gmaw5fyxd68keojr67kisq8679i56l8vijbh17tm074rujxxizuljmjp133sm7nrw6xibe64cqlaszh1mogr7e4w7s90rolg5h0hu4bxjrbvbq9usdnh8pby5frgovqlqfb',
                application: 'nfnb4kmfaqvan28aytrvyr0ukkazmqvab6ih5uitbmmgccn4krj9z4hpr1yv',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'e01330c6-950c-47db-94df-596b83e53e55',
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
                id: 'fe52fd6c-2fe7-4ea0-a810-d1103fbcecab',
                tenantId: '115d69a9-fab7-4051-9265-75375754b2e3',
                systemId: 'zola8gvfv7j3b0q23a2a2pj80rg9oratmh3tt',
                systemName: 't0ruvkfgq2mju71fz0gw',
                scenario: 'urpai0lc96o6fl7pqqllen81ke8ixy1kfgujunvch1nsfj4ozl7yyr1sz8uj',
                party: '9zotznt178e2gvfds9sqo9m5irwsxvn8zcae29s1ayt8c972n4rfqjad7ktyxtek851jae8t1s865loq7snf5uj0jl97wyiyojjdwj7y15kf1rys8inxiaxuxocl5k4pn4wyxper1zvisqzn3j54c3z9q7tjtifv',
                component: '7gviygzwg42tkr37dmrj6u68zvr05s1dxl0ujobv5ep2fcdo5usg2b109pfa1g4463auhuo1gmoc84pca4pmymapy0054udm59clwcgfxuwkhlz4193uq02t0zhnl45zhuuxjtmx81dqzrwy7ognh5aix21i8sl6',
                interfaceName: '1fmsf4zwdv6gssw5ncqccl9hbxin57jieng7xcfznhbqmxmd67jdxrk0w4afhq7j3tfcrrshtnk26cn0gkc77jm1mwm6h4261dzetrrrrmbh938h4yju7xw1jy94chcuvokywxob8eo0ybagmh5i5e8hlltg9uhs',
                interfaceNamespace: 'xerrumo8hwl5pthzrttcareabusb7kptf8nvrl6jz2nd9bpxvb4l7n7bqq7cpwaa2x1v4mf32jfqu2fun40tvdf7rhd6psnujtt55rh9f0php2li2weqstl3vtftcrsi8tc1etr0jzbaxqvrk7rvomdkdw751sc4',
                iflowName: '4utpuljat6gghd18kqt2944cc02fahfocmm22clkytzmncltevp5prukuprzugbzj4sfj7hd3j1qj2f5wvop50k5sro4ufnz3b8cbi8tu37aar0kc6ulyts2uxj3b1s5d7pcgt673mvigk7o5esylu9zgbhfcruq',
                responsibleUserAccount: '9t4ixc90odkr3srn37o1',
                lastChangeUserAccount: 'zfis55qprnc0ogs1mh7x',
                lastChangedAt: '2020-07-21 15:45:38',
                folderPath: 'riopvij5v9c09d9xyxdjhh2wyp3dbrz5x027evq17rzmxszyg5cddhdpqdfk1dzkujcbwbp6hzlzu04ict9qdg6s74qhe3snylu3a1ehau1jfwyy6gq7d6cgw60ai12zzlbxrzg0ojacwyez61603kif4rjbpv741j015do1016v36zeme4j2vkxjnl6zmib6ui30tl7fovtvkvrig6w86t8yejblmgf4f0i7wzw174255kmnjofz12ug0cs2uu',
                description: 'uf11qc0xn9nbeairn5fjd2vz3slqh46udvzvwpb895qqd5vljea6xlyjdckhxyvyj34ahmpgabdfu1umcs8xdb8bxdfp5pa4fd6gt2wnani01sqqpswuaioz4i74y2lgtoav087jnol1qx1l543ws6jhq8dprjzetekh9xcegxhsoimx08ncnj4fojxlpxyv1muumznfgzm1sccgwt3uek2cms63it7ykgmo13r46it8vj6pmocxs7k7k75icx3',
                application: 'yxqie8rhb4qlat6wpevhb426b1tnqbpetdb3x1epdo8fy3zpja06v5gjkxg6',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'e01330c6-950c-47db-94df-596b83e53e55',
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
                id: 'fe52fd6c-2fe7-4ea0-a810-d1103fbcecab',
                tenantId: '115d69a9-fab7-4051-9265-75375754b2e3',
                systemId: '709c6586-cc95-4d58-b738-eb8c23e06b09',
                systemName: 'bm79nelgeijd76rdczg7',
                scenario: 'hps2z9whh0mq8ydghhf1c66tojw7k8l68vfzsyk259m925hoi2o39vxqq3cz',
                party: '87gl43aj8pbsrtysf9yo18o1risa8n5wjgtykuca4lyjzkljuusqjxckkn6eiofcynfcoom1dm0uevaobkh39jg0zd3u0ql7swv11nw3qel3bclqpy3lmv48iiao2d5whtnp08tfjuykojqzk5gixmqqfdrwcm4i',
                component: '8z9pwintuaj92f7bokirzchi158mi0bibw4xk90sjenxpl6i8dc58jmcdhj5vsaae2hc57z5ecixjzzfcc268598c7679xv8r9yzt0te0sgm4r1ycrla5501ejhiie92th9dh6cdu3hl8kj4up5gz1g1m534tc56',
                interfaceName: '84jdr4x4h8tp1wga3yzjpfpdeb5n6yud8fu6d96g9mkqqt9jpxhp4frki3gpvaqpvxx378rwyxzujlpl7cqv8nchvey9urt09vi8ix3r79gy09mh4t8ui6jpggx059s1uqwz0alp1nkwdomambdj02jfzpdcbkat',
                interfaceNamespace: 'h6xlma27w1iekyfy4a6dq6s84g0dqy5ep5h6zwraggggvp2o8o8zzq1ygrse7lt5aqlmp8vapx2sudl128jdh2ohwqv2wh2842e9qkojf27q8u5e1isnayk3zuuzhxs0a7tnkc342vs70f7wyt3zo23xjd1dcsso',
                iflowName: 'slyzhha1wfxhkfq46r08i0u4cnf6c0diktnhcxh03a5yreeydihurdd6lg6ylhcfxfibpq3tuuw34pf6rq56zg4oi25s68p5ksvuqo9xjyjco247wp5k1vjto3osjqkr22cbxpd2op5zofdxens5v0gnzmmchkgk',
                responsibleUserAccount: 'mof430qzybephuft2ip8',
                lastChangeUserAccount: 'mcjhohv8ak82x9gp0hz0',
                lastChangedAt: '2020-07-21 10:50:51',
                folderPath: 'w179838fm5zio68mrjqkt6fxf6pgntuthw9hu7mndpk5f23o0n76opt3eksqeqjrbqa1ugayqlim9ucpez0gc3h6i5dv1pmb9t85mx3vhe4mxx6fgld3nkmjs6eryy9dzu4tzb7yhcf7hcnrb44zdn9f8tdq18whlhg6egh29v8ij4mw91i16vacr4uy412qtiu5218oq0u4cm9ywz8h916wpsz1uxs2xaoi4enxp0g9fzklc0rej9uwy6tixsy',
                description: 'f0yoxox8h8hqd0ux9bewerlityrb7cqg1usl8j3gaylwju5g2hcv2j96zr0vc03js54t5e268fdz9epfmi51gp7izvhr9ilxy7343ycr7d6clzswg3a7nfx0fnglzx8lz0xi8c9v5hoeavcbembw9h1s0l5ry9m8jmeekvxg8uktpj9q8a5m0s8unbtwvaido4vkzr61btqf19pexgtd5eztpoo8ue88sqqwbpwabujxmjgadh06mhk8pi2nrws',
                application: 'lhx8xfhlweehd6w7s4cplc5qm0jgp6d2r2b281uatkk3ijy28wyvgnju2hq1',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'fbp6l6u7vfbc36bisq9pm39icsr6o6sto57xj',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowFieldGroupId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'fe52fd6c-2fe7-4ea0-a810-d1103fbcecab',
                tenantId: '115d69a9-fab7-4051-9265-75375754b2e3',
                systemId: '709c6586-cc95-4d58-b738-eb8c23e06b09',
                systemName: '1d05xt11g0waqosk5cs2d',
                scenario: 'g6nky0rh8u1l26z22mcfm0icotkh2jj3q30nxal3l8twlpwclrbkzo2m2xac',
                party: 'e6e5x88qu6wjonqzlavaliihn39j46ym8wafu273sci46ukozc6zenaq4nopwmhdvsaybh5tf41fwey0dvgo7ci28u4edakehv52aadt506mgr8iu38xp4dl03r4vi0jz7gafpdltjmmmn1r2mze88cu1lwuro2w',
                component: '77eybo6x1bsgz8kx2bfuxd8vjzq1uufgyw48677b1fw43v6urekdjqf1375lry9qom8qbznaw63ax9yrxhf8uy34kj50cgm8pvavdv560han4tzu219n73bk7zsbpu7mhaopodrlgm4vwnavi1ek187f2ewxp0f9',
                interfaceName: 'ut260voyuo5k7b2p9uititaexjkrusq3kmcava1j0y20vh3broi7gaheakvv4p84wck6jv3gglg52xf9qcsfgw64pi1qukkll12mystuxe6lb7w21kappd9dwtdy1jz9c90ifob0l93c0xgvbl7v4q1xvmrdkegr',
                interfaceNamespace: 'x06n9a5o8wvrb7lbvni17zc40zyznjgq3bfkv9dkroow4vhc6zw3l792nul3q9n68v0nikfnknluo0xrv5awucnzfn54i372og5f4aif8trbuecwhmnv4t615ckhh5vdx2r3rpn1otserhtuqdsfzya648inch0w',
                iflowName: 'ecvzvtiuf9r9ywwi33jfdjn9eg0mcf7a86r52kcmczv79mbznv0h3jnmrwfticy22ex32fgkhekrx3zrezav7vr488szxl92orxwruepkvh6ad4nbqrrs50pqiqzn0clb7lw0bhq3ziodvt27pdp8f0qtctxk7jy',
                responsibleUserAccount: 'ys7u6wmo8hy6r8k7vyso',
                lastChangeUserAccount: 'ksh4n1es9x9ki1qrwtp3',
                lastChangedAt: '2020-07-21 06:03:42',
                folderPath: 'ecdpwolnip4toj7a1d7sdcceuhpjcn7am4hl4tp8e4119hp0kks69j8px3jwghaz1ff6fb89rixh3qnedthy8sf9fdy3ngcpzh0q37q561sut2sgs5lvrc08fvdg8sq3vj1992mb0ni9hdcs7naz4qyj9enzglz59rm7tmaj2l9ekyqlq7elkqd5e3nsjvi4q0045g288wxubm3iehocst46saz34gn3em8yqt9mvl5b7r9aafcktajbqrbi8vy',
                description: 'hrg6tvwemf9egoln12wc51huz2xp8fuq38m8lml5q5l7473lcuuauwj02bsamhyouc09k0ubcmt8zcrnucs2ezdf5za0pj10syyjt8niy0jzm971kb1icm2dg3e50dqxwzrnucldmptmxgcjba7emn50721o00e82j00nmktb55z5h3ger3cersofrzdexbndiq03p397v3qi9dcbj0ps0t94pkasbbqao5fls6nqeya89mnc2e2a48w8a055sj',
                application: '3n317dsjzk9j37mgukqwh72rbdae349erxk6m4hbv8oo3lmtqfbptcl4ix11',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'e01330c6-950c-47db-94df-596b83e53e55',
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
                id: 'fe52fd6c-2fe7-4ea0-a810-d1103fbcecab',
                tenantId: '115d69a9-fab7-4051-9265-75375754b2e3',
                systemId: '709c6586-cc95-4d58-b738-eb8c23e06b09',
                systemName: 'dnaa0iimnynzow1g3op1',
                scenario: 'ul7ptg3q8iz3pjrf015haoicboe7xtuudvvxdu3pqpya6xqiblj79bw7r1xhx',
                party: 'qvjqju861re1dmqaoe71lz8evjck303he0sniecwdd120ejoyjipcxp5mlnh0xdgriwmdd0tqmmwhg6qlw12ceff96h0zhurogqyu3b7ccqnujhhxcsed41gcewexz2q802ornjrb7x6vtndnkc6exdbqwwu4fwj',
                component: 'nixfw1p8vhsqkktjlgrem7cucghn2j1i6t9f54pbx4k0iety8xlqn9kai87torkfox1xyxoi0gpg8rm4grwz7jhialqs3b7eibzlm7wege2csuou3hsn9g91iwy9dkonoffk9xt9mdhadzouymzijcufq3gfkykr',
                interfaceName: '89k4o8yjiscnu4hf78haql50j0in4szdxl94uumth8tfiux03yrutias711q6hw6h2glapgv6kr6dq7eaugdl677c4v40ayxpmrfdk59jknolmu2aa8lxg253nqxj7bdhcf6o2gw29tob9uvbe33ewkbof8quslu',
                interfaceNamespace: '04d0iz5obwixbc9sbfsvalrne98uevv6qosgw932ju8weifuq4tbbnwad2j02kbgal7egvfkvei819atpb464ydsbemrdjn7re1lvmqgstpg7u0rgfvouuscydz9erke6i20rcizk09d78w5inthorn8m9uwlzbl',
                iflowName: 'n7v089zryljt4864obszxsnfrk9zpx85kx0ths5esrzpwabkrz2whd8tzocn3demin0b0w1p88bvx38dzv6c34pb80ekifyatabg9903nbvvpdi34rxtdf4spg1w6fs61fodihejra9gr40g8lgbbp3b8cqby2o9',
                responsibleUserAccount: '1i6llka09s2no38aepmh',
                lastChangeUserAccount: 'i6h7dk0hey3irjp1vzhe',
                lastChangedAt: '2020-07-21 13:45:26',
                folderPath: 'kv2zlsuyij68k2z319i53jah4mz9pny2e1s1yrwte99y9znbo95j3jx986i2bezfu498mjext8cu8o9ycfx48chk0s8oa1luyqjikyam1oe8pmwcd3n84nbd2jk30ny5h1e1tm7u8n2oglw0nhp1ys3ovxdl6kmzrmk1ulvf5y32q4baw8hgl9ntgtmspww28c76j8uoi8n21jbq7hzsvff5aef29neeb6ug0sa2gmb9sy29daw6sp64or22y9q',
                description: 'oko868io2xrwcxw3wp4283hsq29poyguckjcjjkgvtid7gi6t0hqe5hfexu2tkawl6cv62lq87zrc4nslh4ugnmbyp17gwte7a32y7jejqecnz05vezggolnkcn0bbiajdgca3ipdqwsxy6n2g8f19zshqmxiqy8yf9xtyhpkejzagxpj8ips1r68gdaq9d86cism8ciai2ndju540nc4krlbj2skbpdxmfpgagmxjpbwr8f4azt81u110esh7i',
                application: '8pbpxefvdnevq5wm8i3511yb2hl63hri1qtkalqlq5wzd2jb7l6i1zf7ipld',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'e01330c6-950c-47db-94df-596b83e53e55',
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
                id: 'fe52fd6c-2fe7-4ea0-a810-d1103fbcecab',
                tenantId: '115d69a9-fab7-4051-9265-75375754b2e3',
                systemId: '709c6586-cc95-4d58-b738-eb8c23e06b09',
                systemName: 'jfuotpjuz032ady5bzeh',
                scenario: 'f7dnlgf9bsi3yi61cykq4miy78km0rsgayltw5aihi8lcj5404tgv74gfnfn',
                party: '9adrh4k86np1h27l5qn8fxmvbijterh1c9gjfei1tpihtj6rj6a838rg1qn84c5wv4q6fh5jyd5si7gp3fs8gvch9qurhfzu3gnehf26ceixtvzp86mck4rzbkz42hdux29vuzmjgqs1a5zjf6fx7jed19flv9adk',
                component: 'wsvydb1ye4flwah0vurhmtq21dtkjwx2oqnih7la3ee5jq70h57nsbwdkvox46292p82vp95cvk859vjgtp6vjona8xlpinswtcb9xmexb942sdbktgp7iu507eun0xoqr3g9qb9jz83egn1n758jhiy9367w37i',
                interfaceName: '0sal1hwtw4q899zc5spuehqrhe39nht7ol0ii8b3y0qv6pgibjgqjanp11widxgamp4plmeots5aui0i69rwl497uykmpqsmgk456n5f80yv4sgbr6fz323cpomxfajxezlgbg4pjvcpaxfs8rdgxw0435wadn76',
                interfaceNamespace: 'ga9ie58w64ynde7hpqiolel3hn8qivefpi0x00e1ww1e7uczd2oqgefky75qyhw42nr6916tae96vdy8gcogarbvyskmgv5z4ak2jdxe1aomw1v2gq7jghahfhzw992q2x8amz7phv91yhgf4m4oxtvco5q8bfqk',
                iflowName: 'lrzdxon4pyrs78aanawu15dnibybp3pzxkimlpm9pmb8fs11beqz6v27rijlf5lkhshhcu0o45hf032814vau0utl5l7taogvvm38ga9xansdk8jy7jf8fxjpebws7hu6tnqk8pxytb4qu9sro2tduuuhmi0cltk',
                responsibleUserAccount: 'kp7pkf6v53cvsm5jkgjg',
                lastChangeUserAccount: '6gd03taeamzbk0o3zpuu',
                lastChangedAt: '2020-07-21 07:47:05',
                folderPath: '9baiq68zc29f0dyyuqhfo3p3mbmwe5f0f8430xqtqfy85b6y5lppzo4exvhni3g4hx4g0oobmrncgcf78u7d2peq653regsimdzolsxejc83uvzt1jc5i5jepv3ymlrsk0fjhosxs2l46o6xvq9l3y45rp1ywja8m65zrzl83lx2m2l3i4zhyzfs9dhtztvwrhecw4iftbr0886rixzbw2tn7sejq8p48ugpyp3pnkfirjqevd143t6mtkfqbma',
                description: 'h35tzwra4v5tnr27hggf5a5os088i6gyrvtzq7la7aq1lv0jst0xvm8tv028relxcgpi953jad8u2w4jal7p5ekepu7xuwnr7tgl48xcqqwuwl0yqc5ukb4bxf4dnjy12ne1fhpsjdhvohsfysbfxtv78k68gtdw8q8g6p28nweqsui29kqd6dc56ow5sauj1iisf4986dosfmzdelb2zjl39hvdr5m3wk525ce1affjr5bu2ep3jwvwc6r2jst',
                application: '15e9yhk1hj97w6lmqxhusla9wfpvwish82d7uv92h2gy5tc5f627narea6j9',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'e01330c6-950c-47db-94df-596b83e53e55',
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
                id: 'fe52fd6c-2fe7-4ea0-a810-d1103fbcecab',
                tenantId: '115d69a9-fab7-4051-9265-75375754b2e3',
                systemId: '709c6586-cc95-4d58-b738-eb8c23e06b09',
                systemName: 'gofqy71buc237nnbj2gg',
                scenario: 'dysuhfvxz7yhzmju1yayyb0104rt31dsb81qrxmjoxnejn154w04conrxkww',
                party: 'vzyq3oxuhx3sdimlqpti4o0n9libh5trprpgz1bcmn1f0yn0f2k3vc4nwqapgmth1n0r8lhen33all7mk4osdpy9w5du730ldcidk5bljjlwsuybas3ciie332bu7fuh5t3tzyzbo0rjn3hqihkp6h009p0vqs0p',
                component: '2710jches4u497y3ufz79efff6tdowcq6aje3qkdkmihfrlge5dievekyipbat3osgdddbpmgcqky5nlr59fb57q8x6qmuooc3px9f9cn6ksd8pqznk254kx3knypu7nkrxqsyajpgqu3tzzsgcmyrc5ihlxx3eac',
                interfaceName: 'm2ijbyifqej43v7c7wf6g8i33ny355jeuvvozay4i3t8uk4qa9ncsnf5j79dnf6z1yc0qekw5ikfk060g6zbg9pezkx4779fieu78fkzqe3fage3y0jeb71awpv4vske9h6q72ddlyn6usyazrqt4q72757kokop',
                interfaceNamespace: 'dmt5s327gkpl07pn9cq0wf0m0xncvv6cm8muc2njkulvpnki8kghwpy5fle8pzeqmjfqakhhjcjcpq2cjuaz8p07johzuinmvkp0fx9ccnnq9o5abxjrnjda1hwx5vzuyqhsq41fmy503kupzm1qi6tzz0aqrrsh',
                iflowName: '7w3a3ky4c2hjq6dhtx4pa0vn9kqfd10wtb1tzlirmuf301erabe6wxwcgx0ibw8zhld9r2wtj3u4z7nn2o0dlac2fu7jh6mrl0afexf03s18zbnkpdimdafi0m8gn2z8e07ginqgve3en45ueesvp03asr44cbyd',
                responsibleUserAccount: 'fq4q8dzbgk1zkncaf8kc',
                lastChangeUserAccount: 'k5f3669kerf7ssfaegi7',
                lastChangedAt: '2020-07-21 15:25:01',
                folderPath: '8trzfavfwwq8pp5vsk6j7ayf5ocp9j017cpdtuvjuhs0zbsk6skp10a3q15bdae41hueujzpvbsh79h5ef6fjnb7qzpscpq5hd10pz3l1p6plwkd1x91ahum4ewlx373xs8h9rybjffzig43i4j3ym0iqhvr1kqrujthmyn2848cq1jtxe2txxdt06lxf9uaoeijee9kjeot8mvnzae06opru1csuafemxmhneiitw0mfrxz6s1offj21uq20w8',
                description: '10ji80ovozjrj78op2vjcv8hq5whx51w2f61b6md9vy5xtykof5poegatix4qo9d6oxury0mpygq6ez7ea2x2l87nkz6msae6q9pge36f2lo07dn6os0so9h8ke50qp9ujyoes5f3b7x8376q888cls2o7mer65teaof85rfkn1g31tmony16927p18qfloy0120ss8bm8fhos83q5w6wvdev3m4ucb1jl5tqfv2e8y2aj73xz7wbda1gzk3uia',
                application: 'g2hkwei0y60mte56vi8bkvkr6z8szx05qh9nl2wtcp9o8ccd9ej1f9bklsdm',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'e01330c6-950c-47db-94df-596b83e53e55',
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
                id: 'fe52fd6c-2fe7-4ea0-a810-d1103fbcecab',
                tenantId: '115d69a9-fab7-4051-9265-75375754b2e3',
                systemId: '709c6586-cc95-4d58-b738-eb8c23e06b09',
                systemName: 'w7s9rdnz964x2dqqqio9',
                scenario: 'jxh68on7xv2yk1o2vnoo2urzwc65o63upk8966y6i3cxc818r0kv6g62v7ac',
                party: 'r6bcg62pmr533onfmy9grhicldtfltya5arfd064vhn2c39prwvvywki5ad924zw9xkcdbkvliexw4pc2hkbl6hesckiywyl2do3stig000zg40yuwyj399v3e6nfqyac031lecsibk76kq59et826s74ua73svp',
                component: '74ou1anro5bwh2n99si9pouhxism0fzdcwxa14t4vlmrt9hw9p2mbuqnx7p3cnxhtrzsc0f13guly5khu9gkt08ag6jbqr5e70k4tgi06quieb1oizq4no2t23xu4q3fsqzdhexg8scclusmj16kj04i7yecvz96',
                interfaceName: 'p83l6cwccq1qdaxu12s698mky2btxqn4uqxulg64adav4rgxuovmsn72qer46u36x8p5ui59c6vh5b1vu2jexlkuhpncakllmq716num47vt4iamrbqe5c9xcw4cp4qc4d521bjkwufx7w6mo63y4mzqngciv26bd',
                interfaceNamespace: 'luvi5tc691w5raz0ohun1yoolsuxnuu2uievwie6hqn3keabzjvdsjtl206s7n1izwdwko41dpmgw6mrcaac8gmqwm3dkdzd0ypro03wquqykngcimec6tscr7rqim4mpamdxgxk0cl6iwih6g6p3dept58768bv',
                iflowName: 'pp16f6o3nfpl8bpqyfpen1794hjhxp0dws4tvpympg1tfoj8tu9h55sjx7c1k2x0qlvq6cz6mfp633drmq8xhodiu7kgeby9ttyp1mbcg1y1eq8vb6jji1qdl5m4hqfrv2fhc05wnzdn35w3zadlx4l2lpwbpiym',
                responsibleUserAccount: 'mvffnvr4axvwqbv6n821',
                lastChangeUserAccount: 'sod0qnpd808q93i0nypz',
                lastChangedAt: '2020-07-21 05:52:01',
                folderPath: 'ksowjd7l1nou6zlomzfkn8av4y1dnf4k9kr31sb5kyitnnnlpa9o5slca4f86kmftx3og7zkivnuz0sd9bpoczgaqqzvsnfiax1a0xux8uezdzewbzaga3v6quaevwp2qldgfcl79jxw5209szhmfa7drcovtok8cfthionc6g0je8q5oxwzuzglhoxxrr4mmdqs1e4ldc854tsv00yrek652o386i00ts2a3eh4rxxxjt69sqgupjznny9la8w',
                description: 'f8agsddqr28o06b3ljeiixz5h8qxrgqxabeftbqjtwbr0myszri9er6y4oj48iw16ejl29ry1kxik15aopir93xhyaq6mdg33lx4tfqc5drzcpfio9zrlatgx8te7poxzwfqf9b9ukxux1p69qn1927r6psbbkdmjqe10e1kqhljiqp0ve7d26aybn9j8jo4pi33srev47htx08bbtipbi5gi5mcv2ybo1riq5yr55hb0715xyb5o29x6xwaqq8',
                application: 'dfh0y0zv9v6xxlr969guzykbjhhc6meq4d72sw3imgg4rmioxusv6p00tmbn',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'e01330c6-950c-47db-94df-596b83e53e55',
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
                id: 'fe52fd6c-2fe7-4ea0-a810-d1103fbcecab',
                tenantId: '115d69a9-fab7-4051-9265-75375754b2e3',
                systemId: '709c6586-cc95-4d58-b738-eb8c23e06b09',
                systemName: '0psggk0d4479j72mtjh2',
                scenario: 'opnsi6azpuutn579ckfqu9ivjhd9yx35lqqubf8w3ujifdi9v9o7nw5pcybq',
                party: 'z1rx11qwzrsrxbg6glc2uujvc6t1g0kc50xrqu91acetpi712qdsybvo9nt3mu20aj0blbf7a7j99d5oyktlqnprrqqfbch1egfjvo1zhxd6ohw3su05lxevsqg00wwhbkmghg5371rhpytl64q812wzacmkjyyq',
                component: 'egzqn6aevlp3qw7247jl9fdx9x8kii7zndec4uws58oysvgxmhgvn5jkv9c02b3rnwk347fg2z5ui05zymmmnrl4hcwejkjr8b82s8ey6rpdttxqv4vq5onibya36gahuupj9rup2v0p05bavyijdw9410dcw9cm',
                interfaceName: 'gqmqldrbukih04dvplk793pzgqq9j58kim4blxl397ny1vf1ri6t3a2zlt8kflmy9tr1o0dx8uybudr55tw6a7gexmadookw48jqx1wjra5x7wvmfyzy07zonmw4kt4d499hc7c29ge32bti68ietpw1veabuyem',
                interfaceNamespace: '80d7b2lmby85wp9vq7rxe3u0pfv2tsidt9iowfp9d6wg91f0exgrlwdth80e3fg48vdj1m6nu3prm2wjblj1z8m7ub8h5xbgslsu3xavdg8qd2ffw2mq8qynkvyw5mjzljvcxpt2e67qvmft08hsm0f1fq9shfend',
                iflowName: 'dvgoee0qlyikuvhh9jb9fp50mogrsljkc0v3ig8q186ifw1b8ram01fhkxn2fy3ucbqr1sb9bq9ecayl4w1fof0k7uxqb2nkxtzroku9jrts2o9ijwzdw0v1xb4pxdgabn462jrotn1gphyfzwmx2etwo2lkmlk6',
                responsibleUserAccount: '1r2u3ndhtqa6d4tuij5i',
                lastChangeUserAccount: 'j06u7oa66gsoe8n349r6',
                lastChangedAt: '2020-07-22 00:09:44',
                folderPath: 't4leyl2qj0gojcrk19fbfhl1difh5fsndu750vshmu1cox72zmkgze9029wzkgux4mb7l336yzfda8i5ejj5qqo3p72hrae7zzn8ebdem5n4zj7fwurzftf8yijgxv3qls344uvknijpbropvufnw7vobjudeoccpyj2mdgxdlun0o3g8mwgv62vtrcxtwsopbmai10dpc7hmsb6966l6eeb0e1tp62uvqpdidhu1rc4lec3a1ln758im1t14e5',
                description: 'o4e08kg6c6nstq786w8p95qz3ose3rethyxl54yaby0q7e15w4h03hjryr5zl2o16ci1exapss4064hjp8idzz82eyz3939slmzlmctsp8j5k1ochn8dv88ljmxq1qz4axugkaj0gmrmb0hyvt18igwklmsatwksd070fd91rybr8uppal1xa0xhm14vylm47gkxhmijpto7v7qj7k5e6hy0msoc1sfwaody1t279xeygwvbx7ftuf1cdn6jglc',
                application: 'yurwa7vb12p0f4vkuyqd5umvagw38ttrsopmh3ipsl66kwkecl2onqao4ni7',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'e01330c6-950c-47db-94df-596b83e53e55',
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
                id: 'fe52fd6c-2fe7-4ea0-a810-d1103fbcecab',
                tenantId: '115d69a9-fab7-4051-9265-75375754b2e3',
                systemId: '709c6586-cc95-4d58-b738-eb8c23e06b09',
                systemName: 'oh8bhu5lr1gs83mwjd7p',
                scenario: 'yga91mdcr43ux9ihlipoa10vn17nuzkg9u5iqv5o64ln4xhs8zpyq82oyj4y',
                party: '4eremaq13atmdv0g72m5tjpwp5fbumqqyze5zw4jwh3xb38b8nfimmxea88caqudkf2v0wod86ph8ureokw232uvsz0noz622xi1w2pba2rdnsfj3cyybpxfpsj2v11y7rvzhe9uk6jk7hnat0y2gf05zimkhirm',
                component: 'u7c5dcbte7si9dwj2b079hfsa4n8q9l8kojcrnsc8qomjg4kj91gdogojrpt52mey7z6xwvdle4k5uhmgayclz2m1ftjytka2bncgldmo2boe3lhv7qavuarshmgvvem5qjvf27db8mniebfuxzh1726e177bnj5',
                interfaceName: 'sev8ojt0d5or2bdujvzvzfcvt250p9nblusd904ta1gern8beqw6034c6k5ehi7en0098ux80h41zhwj3mre3stfdp96pnnj5l907n167cx9n16cgyulfqtmy0jhkb39l8lji5z23wayx3v8m7192cjcd42s3s1k',
                interfaceNamespace: 'a2971fy7yhsrh2wk3ili3q8m0e8xepjmkujhwz6z5aurmv1grysencjps5vgrliwg14b23gq65699y8i0u2zw96vsr4k24d6jattho64khiv5rksru12difl1ncnp1nqv16ch0z6up8ktxusgl83iuwktoop33il',
                iflowName: '0ry5gpqbupjv8ht5a90fy3aup717ysn6p6bxtq8uqjcvlvxdz46jtuv8aen74lxpuzp2em7e5dswk13q29epshbo1dw9uqnyrr1q9vn9sedptofk3xuid1jssydz98y66p9lp27ciuyenknfe332xrp8vrgnumccc',
                responsibleUserAccount: 'c2ccok9xl88z94ghqs7x',
                lastChangeUserAccount: 'n5ayk9gnsiva9a67b746',
                lastChangedAt: '2020-07-22 00:06:56',
                folderPath: 'jfly61bcgdpntzpiffxqtnz1qdlwf5rezt4cn8o2dfb237k2am37062ho57xsomv5zwc93b0zeabliss8eyh938bdilsh3kywygzdzjk9fb1bhv2049j3iop059sb65n0fqd7eivxushii8wnnj26aflpuaq83cmdx9r0b9aarspkk9yf77uv3iz5g9laqmu2gxb9mp4dnkk3il4kv0okh29sxx65upbrmin7jf93r0pvcna3jtb67y9997aa8p',
                description: 'zjf9vl4l6b021rocn2hw9q5yiuq6yh02dwgpzgojdqgyg5max0vo7aflduhyvd4g0tgptktzft6p08dpggcj8mzngs4vur684yzfcww8vbjebpzotewhxchfjgc2764sfos23e02wpea2yxotcrbkwsiq8aq0mhgi3beh5yzk071zvko89yvhnxk9ltzn4q6nhebw4y1spd5oz90p7rcxq9r6lz11l9o4ygxd0nw5kzg25ussvwrvz3uj4yhl0r',
                application: 'ergqy9cyipb0wu16vu8e6c6yo9pat2jo5268w34z856ya5y2dguv3uewsf6o',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'e01330c6-950c-47db-94df-596b83e53e55',
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
                id: 'fe52fd6c-2fe7-4ea0-a810-d1103fbcecab',
                tenantId: '115d69a9-fab7-4051-9265-75375754b2e3',
                systemId: '709c6586-cc95-4d58-b738-eb8c23e06b09',
                systemName: '3ow4x9e20by0hlzb6xv2',
                scenario: '60ch4rvc2yvwgl5l48770umftyppch97yyactm2dvqs9bpx1gottv290yyr1',
                party: '67qc0djrq16h6x7ea1t2pkm22bgdvvh6ga5h9y0mepxa4c2j63wbzno7nkr0wspi9vduefbxryna3wyovqcvjfqwylwyn9ymkl1erh36tkcxy62bc9vsqo3bwsjx7ig73qy041twd0f5mj16392qacvapllcpvd1',
                component: '7ot9bw6ijmc1wn8h9379duzrmxn07jo87c30zt2j6vu3wm5t3nb8necul2k3grgohox4crd2wew0yyp5l2tkojo94dbffi0h0c5r2nzqxh9ecewuwzty2ainlfk3za8724ripcl4ursgnh4fod4256ltn1cehrtb',
                interfaceName: 'hct3sl4o5vuql6luvq775sqdqd5m0izj1lrrpxrpghpx9j0smj45l65cq9di30td8piu6ocas5java6rlxch76xqi1rxmrwn9kppc0ggpe4krzn3xmlbeyljh86wqlroorjdznn4rdxl5g7c2m9cc5tppxy29wbc',
                interfaceNamespace: 'b6ld038z3n5flbb8yrk6jp5trjl6cxpvigby1mnuheqerg7ktp1hlfohsmkb0t0ywfgbvhw1ez6ed7voxccgq9hz54d4g3wc4amh929muvgg2r4bj6kd3ocwqp6uv0qdj3owa6rgl63vfb0j51b5uqbf6ozx1jok',
                iflowName: 'ilo87a13hbsuwxb066a7w7ruqqgpco4983ysi75tabkthztccjbixoqfy9c17jal1m1wk8vbyxwa7t4k08v5hw5fu40ah5vah6esnda5gi9eprb7raxf9lfma8rl9ynfgkcf00c78zhld8mkg5x1zqkdj6ivluvb',
                responsibleUserAccount: '47cotij7vta1c8mvu00za',
                lastChangeUserAccount: 'urtzdy51vw57oi7gdven',
                lastChangedAt: '2020-07-21 12:55:34',
                folderPath: 'a2njl0i0f8kljo1zfkje2l7ru3w4v3otzdby9b4kb1usrkbakbnyg7bxlwje3m9qo9smxa2vg1palheb7wi1z071mlszvxbglyyj2kvufpjrat03d9m4cixswfiodgt8iq0ygq2vnz6ptg348tn4h6531nscwt1uxpwgsmi4oxxfgtn0565c6i9uohjvg214kw7u7zhqu77p41mun3oiyhsfig6uxka3dy64qcgexfdnkpgxy1hmoxkgc6vigli',
                description: 'alm9i04fn673i8ps8g0io57qcesv91ckemr73jcml21f4xeh29ry779bhirs3avwqcgqrboyl8dwuh0szff29q8k65283ndroz8czt7ypy7wh26reuajnooiiu8gz9gutn2guqwk27wbn1hrklm732jaoj501og2plma3eqnj1kg6y7v3tyba3dp2ofn1fbujffe3gld17qwal1t9svsyg4xrj4kd1nqrivbo0sdefxj3zvy0dghqyoky0a050q',
                application: 'fuajzkp2839lkfogn3ybew3893avu2v5oen6wy4uw86jn92u438dj5m27nvn',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'e01330c6-950c-47db-94df-596b83e53e55',
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
                id: 'fe52fd6c-2fe7-4ea0-a810-d1103fbcecab',
                tenantId: '115d69a9-fab7-4051-9265-75375754b2e3',
                systemId: '709c6586-cc95-4d58-b738-eb8c23e06b09',
                systemName: '2hlbujohlmtq4y76pk2d',
                scenario: 'x3wsv5y4bkzu99adyg69pgddwp12trjca9ll25ouhnl9z5pmk4faap43p60x',
                party: 'orns0cy9z6acy8x10ttbjvez20j2nsey86lo0txan9ju8ql3jlykawl0n0qswr7pm081tooapvlwz2l2ojlwkd9na9bsd7zz4isngvpgf0el21l25ocubtidupip58s1xx17fp6cpy7ho1gwengmupoycdol99mb',
                component: 't9vp5e78tu2sug847la0ktcdfymv15179rhwltmz1ingmo751an65il2sd1s9upecgiq4tej65lhnpcvy17i4nf4cdeilxkju2qwr3s128ijknn83kis589k76wimcqef4kiq8ve1ljx657dwhj13mz82fdnr8g4',
                interfaceName: 'li8fbukye45cxkkul1axd5iridbjjkdn2a15m2nddrhi27zsrodhn89a1en0av1lshtr7dghdfifrzar7d7uoh4ff8ofdr4c1ri2gzumbjrqel2roso385bn2rt4etvkbb0qinj8e2ye1vt80idyt3qvf8m4hnr7',
                interfaceNamespace: 'ig1wduhbzgba1z75tv2r123538e8x7zfsdxd633odugcnx05orlqoydduud1qpf0ihkgnqgj44u1a97hxbtsv9346vzhohof53xem4hqo4dclx1s2mw37omte43w1cb7apd24h0cqnlorej5fojx5qhl0e21476v',
                iflowName: 's1bdcdu4m832f2jpmpfo6a54pydownf44yofclm2inriuv3kmdvl7jvwc9hx93z09bg92mluay3zj559gxcilnmdvla0czzkcxwhswoyt7a9kw4rsb4cqqc6yolmdib3hj31dr48a0nm0pj61xbehgll2eiun8co',
                responsibleUserAccount: '6pytd7sgnhrybi5gsk2j',
                lastChangeUserAccount: 'pji9zap74gy5vp572488z',
                lastChangedAt: '2020-07-21 02:58:16',
                folderPath: 'v7bldb1oxq8kduf7uc5thpfqkqgl1izd4gf0t0icl5iyn5qny4jbfnejybgzxzs4c67fhd8rz6gtlipfzwiz8pe6vn4agrwubl8p2y47xrm5qr38fizpjpw0xzh6ssd65z7tz35k0cwb2dv3tkb10n14gvm82pxzc6z8n7njg113n9304hk9tweq4zd14yz7arzv6t3io30phqb913xtc1zcw9ek19b0kic2yr1vv9jhwjc0nw7a5ctgdmd5urk',
                description: '1izl7lmecakrvuslz1vxh65n5yxhkwskmju9blb5iqouopt91mfobb7pj4bgqud93it79vc2jrb8j8lre40zza7kjf8g1j8fgxlxryb9wfre79yw9a7i4hal4ib82x9ux5f8izc5vrtdla0zm5r6tcbw7dfm1hxwiqz73kvlv8ccwckb83ikzj38rskmusubox8aca4d902k9sz9nfui4pfrh3v4xoyeofm21ha5kl51u6we8sv8hl97kf7f7u1',
                application: 'qnkjau33xhdxmphp9cb050qlx0u9pltmjynnnwk8rawjkvovs2nfx6k27hco',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'e01330c6-950c-47db-94df-596b83e53e55',
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
                id: 'fe52fd6c-2fe7-4ea0-a810-d1103fbcecab',
                tenantId: '115d69a9-fab7-4051-9265-75375754b2e3',
                systemId: '709c6586-cc95-4d58-b738-eb8c23e06b09',
                systemName: '2ufckf49nt25gy209e6m',
                scenario: 'sv17mu3u9yiqiocsj4bhq3e3u9blhep0nh4uk8xo69cibs96oslnuogdkmfh',
                party: 'bsua6ynwxje8pigrv3enr6n1ar64mdsjo6i63tqkggyu6xpvr33py94vyuwthglkyb9onisut2c5ikah6vneo4ckimnv82sgfmgehihq6cqmiu3sy5tihkplz2kxetesdbd5p4rlwsangjsbnvga2fb5adyaxsae',
                component: '3pee9l4fagmcdt58u9a74067em6z09cbasm6w32wy4xcnjfsw83zhkb7w9lqjtdposyjegh43xamd3hfmg5pg14xedz4koft546q2kbid1s9ohttrng44gu7airm3byqelx03a2ppch2m0qqbed4n5djp9g38pej',
                interfaceName: 'dqxoalqud8hhptz0opj26nxhfypos63w9dj6wj1hww4lihq2s1pa0mk03rzyr0mdz3j57tlb30e8yebtiaeam6ae11f31avsy4fezofwhfy9i3t1zw68ulq4z6cp3alqm04113f3q6ryw8ogqks42ltroia4pawd',
                interfaceNamespace: 'xcy4fwu4wa1x40thnmij54w78x72o33og1c0klvt7jdzd476qs6iqxmq61glgwkert86pallkh6s9y6fu8pv0hv2sa1n4jte1eunns2ca0g9e8yo03zgc3zpe6o0v3iu0y166teqlqh0acw19x2pufoo6xgh59vl',
                iflowName: '9q6ejirhi4wncmzfxhphkw0ine87txgagu3535cktujpzyxceiemi6qxwr8qr4yxutl99b7yfo82t38rg9l398yof2m5me637rmb9lgp3n47z94kjyz8fbu5u30np8w0dwiesifcpgt030ilvng50aa6fb2d14ra',
                responsibleUserAccount: 'fapgta9biv4wtvtwxfkv',
                lastChangeUserAccount: 'vabwsxrvswb77k9842ox',
                lastChangedAt: '2020-07-21 18:20:55',
                folderPath: 'ziz0th108mplu169ht08uoblwth2e35aq688gahut46475q03yjun4afb1oovynorxwnr92rztmy0ike72zysxjl72clicgil3zejri5emk599i1fgt74cswiy7ka7x6gfc8fgyu6ndp57gtzhziglhhpedbjir3wi7hi2oqfsnt41q8dk8tza2kb2ohld52w1f7ol0jjqmlbgoj4mkql36lxv5p0qsfs86a8ethsep6jx2hmafecgsfcyvm88l4',
                description: 'rjlhfmqqb41lr7vb2r2x4vlo93p5hkve266k3wzmylws4i4b2aar1ve3wtn7naxuupx3gyp242q92x8t1pa0kjx0eh7sevw9xu9xkcq6snmg4nv437m28mng3e4u38lbet3wp40sb03k58rv8id1fp8z36d6ejsu7t3jwk5gabi7zkcw5jgr7327ex0dzpq18lqaj8qagk86u1cok2pqx49qip3vnmumecm4dakp5jcxh3mm4ip0i980lxkxj48',
                application: 'g99k4k0cxlma0seak85elpk9t0p1sro11llj0zyr2h97vjv1bzpy8pb7qr47',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'e01330c6-950c-47db-94df-596b83e53e55',
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
                id: 'fe52fd6c-2fe7-4ea0-a810-d1103fbcecab',
                tenantId: '115d69a9-fab7-4051-9265-75375754b2e3',
                systemId: '709c6586-cc95-4d58-b738-eb8c23e06b09',
                systemName: 'hrtukgofcfzsdo03hpgk',
                scenario: '2rg84dnu439h08xa7wjewzt4mnhrop9vjtz469urraubptx2dmgil6rc02dy',
                party: 'fa8s2byy8gmr716gs3g4mrf8bvqza3s8vz1vqp6oofitsry3i2gasb0o7a9klntuh5uth51m2lmlrc4zw4lz0s5861s94emdtjlou84cutr3kwt10z2p734ngd65mhvxkn2zs5yjv1x041bazhgitnxwhq7i3n9l',
                component: '1b9059dt4x8crguey4isexb664hi5c1be16lyj6xinv6lvoke34fff1tde5sxyo5ykdvuubkkdyjzul02mbm1nvdgpdr4vjyf3jv6hjxlq9dqo8hcbw40hxjbb5gz34mcfiqkt96tlyrc6g0bx2w0lxqkwnx321s',
                interfaceName: 'qn9c0to81qyhmmho8f401bwu5cop98mz39451rq172qz4tvylbt6xjqubsuc5dpja4zkv26jh80cbae40qpazrbq7431muan9lveiu7bklr2zp2y71sgc7hhfrqlio5p41ycfuhzevlwkpm28j7wwbfd3c1pn2bv',
                interfaceNamespace: '18cl9ifihsdvh0o29u9m8pmrmwmhoh9ih5a5k0atvr3wvtnhstic0vwvvgq87q5v4fe3vkkuo6fst9ibu502crnqudusxjxqvat9xuc95powpwghzfy1x7tlc0jm78bevurexy0sz8lrqpv94k5apzkfobap257p',
                iflowName: '1avlfhha84wrc6ue2w99bocqenl0laudeblr7mhoj6xfu40md5r76ggd9xhh2j9bte3poylyluho8xew6ajca0jnmoqrykmaaif1fxihqiz9ll7p68f2yoq5ebbxgfz907jilmrvovq2tw18ct29eoagjq8qw9ad',
                responsibleUserAccount: 'fa31knkcv8kum3vd0si9',
                lastChangeUserAccount: '7clw2rnecxrn558i5pho',
                lastChangedAt: '2020-07-21 16:53:46',
                folderPath: 'igpz1d8cqyvnaj4jgmkpv0jcgcxea4pkaou8f1iluxbqmrmzhcs0fyed9djiei81sqgbbxcestw63z6w791nqtyzql1j0v82wj5pu1i9722y57d1ilvsol13rqhhmb5dnb4p1k46cel54id0pl2f8q5wqbd8pj5zndj7dc3ahyyzt4qebznvqhj78f5aitt35wiwg4xhmgbcp8pb9z68z7uysc4fa01bd7vzarau2y159ahfcl2wpfpqdygrfli',
                description: 'em6ikybg2ozvcc255u3jua3r3bw4ph6n2hnkojz2eowfyfozaomqi7r9eau73x30g9rb8ynb821szslwzl6o2wyk3qfv4n5lf3iz1k8b5x2voikrz98qv0jkwptg9cid36gjsku6wiwv6bfv1vx0flgtkt4jpkg4glm7p07jjp1ed6y7f9sp5lfrsivoe3o3ntgq86y1j5f7pvbep3u2p3unxlirs62ixd1c5zyy6j2d975rnyffnwj32cewc03n',
                application: '2y5li6y4e21rd89luljh6ks5sgiwye90fkiyytzu3y5kruriy67xny2x647h',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'e01330c6-950c-47db-94df-596b83e53e55',
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
                id: 'fe52fd6c-2fe7-4ea0-a810-d1103fbcecab',
                tenantId: '115d69a9-fab7-4051-9265-75375754b2e3',
                systemId: '709c6586-cc95-4d58-b738-eb8c23e06b09',
                systemName: 's0hnoezsi90pjwvrggxg',
                scenario: '0w9ftus9y3tcs6akkiwusdvp5d8v3sa6galxaxlh79j6t6emve1kgvxdqtjj',
                party: '3ugq19246g9lugz8nf18q440cxd9ahvlwknmumcabs19vg0onybi9f0blnp0c2dr72itebgqcv0dettj0zgkm067idppgi1a2lxgmreka4cr47jp2dwiqffq1j578li3rp08n0jyvymfb0mamtfleq877hrz4lpp',
                component: '3spotpr017wzqkopkoqx69oqqw5d1sq13cmkanwgzi2sopsm3db1jqodf1bln33ch43qq4b8g64wylx15t9g9tky3hl7vkhw49e0i8idqpbdsgm69j3dyl9kx9dshuouqkutcwptc4scxvzai59n60sttrz5pqz6',
                interfaceName: 'z6n3ix7ch2erwb2bsklk9v5ept0h64nrjj3l64w07iol2a2mnsrbp7yabsd42g8so2j7iy0sffrwbt4v484wgeswukjn8gkewpi7kg5gxwk1rn89p3nv4r2nmpsl87i7th0zivv6jvbb1o78yl4z1sjxlab5z26h',
                interfaceNamespace: 'cvuhptkdb7awyt1jmd3ro9mvdnmkdmru6tfi7ho979ootfl6gqy8uuq82ao0nv3353s1f1a1c7c9m7han5uud2s7guois9rjbepvhgxvvabj7ks8u8uj24fvxxgqclwztwfpzxgo48z0kmth90bf58hubcihafzp',
                iflowName: '1wqxbh20e3c9dnszvab8b5g3m9k8ujcmtqk1z9ef44t1d6k20whumqahfkrj9dfndkhimg3cyhcik4j687hnynxsxa9o6wlf79inm64nst87pqid843arxkmy9jm8slz8rai14f1tkebyo6imr4g90oos0fzui01',
                responsibleUserAccount: 'x5pk8y7970vapsitpmae',
                lastChangeUserAccount: 'oxmrauep7ce2xbsr9be6',
                lastChangedAt: '2020-07-21 16:28:12',
                folderPath: '1qe661h8mqh0lgzo79zmc6edp5k9n0bot0ai6z4h2y4qw8zjfum9urkllvijttej8a1ri6yawndi4re76uxdn988yjuaklb9bnpz0x305aaxv01pabme3hs6ivdf7kemujeq27e8tp8t5ki156x3henyt1n1dd20f6rpjwrhauwpjeijwb0si2e42cbuycttmbthk1v8twktpb48euxybywbhptv9notyp8zc1z84oysfqltxgr5uamb7lvsujb',
                description: 'd63keh17ql8u1tb1j1rrnopw07ytmr2epv31idkmv859ndnnzcupi4y26pqr1rpcegh048ftfm07e33vllofpdo3uqbnge69b5kvc0ur4nev5a5hzer3ejcazm9ovm9d2lwbwsvxpy1lpu2165mgf08czayjxoj5aybxagklj2pvc7fosh2xle6u9pxwpck2ybyjxe4qt25fi7iwjc7ai6fg7g8sexazxs6tlllugdyuuv3run7a076pohc7dpx',
                application: '2y4gj0dev0455v5k9ymtr4ivhjrf4wgehzhrx72ssg0ls9erq3sftmawd368m',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'e01330c6-950c-47db-94df-596b83e53e55',
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
                id: 'fe52fd6c-2fe7-4ea0-a810-d1103fbcecab',
                tenantId: '115d69a9-fab7-4051-9265-75375754b2e3',
                systemId: '709c6586-cc95-4d58-b738-eb8c23e06b09',
                systemName: 'o0nq5j3uviomz7su88f6',
                scenario: 'xvcgox1wpr2obzpf0am947mrebj3b3oneciv8jgl56fg3lqljvtnrk0nhuea',
                party: 'zglcmam410tlec9cbolb3pnsi1dy8c75x5y2a1bpy71ao70lig9nlib4ghup3kk3w14dg51tgtgbihqxbl1aeks496hqzwe7hogpv975qq7b1vrfrc581nti29mf7t993ca9yzywsea2gsmhnyll5odyq9hmqskc',
                component: 'ywd3nltfaduewc2azdz4m2s8rnscjuelhvte41hag0iafrw9v75613xwhhsw8k1cqkgqd0zhnrh893y1vbbz61oyqkj0tacj81jfty7zwmpen1lq8m9jz9ubjacwfsc6lwve1rd06txxrqqyzgv7983c4mac78ni',
                interfaceName: '7e9r4esh7bxnltndhmb79ge2vmwfqzueepzwjh5kvy793at0dcoo9xko7fmtxn3l6t1inb6aztzpjye67negl7rtsbfikxngo943cpn3vqnwmr84x0k1fof9jls8w1s3kqftbdxpmvfp18iq127t0229lgclps2o',
                interfaceNamespace: 'hxdvz22dyu9x2lzl4vrlv0o9p2imwzhzul9y49womrx6uo4vyhkzebb1pab1waqowxz9qi4j94qbmy67p6vs2tj15g1698jb8fs9601yh18qena3o9yr5oqzxph260gy80iaegd7luo3xlojkrf2r3qe451xzrco',
                iflowName: '2ctukpflzdi0rlj0sc9fjy1ek0ehe6radvjpszcirf5pzdnxfsyaws913dsylkh1ayi2j6ils5ewsahtt1m9fm4r7pgzrafk1jwnxtpntrhnkzbkuvr0s3j213fnmw1k33xvp9y7dpt8frwar2aepfddvruguvmv',
                responsibleUserAccount: 'wdi1nonujxm28zv1smdu',
                lastChangeUserAccount: '8209i3md7239ymkgjw3o',
                lastChangedAt: '2020-07-21 12:27:38',
                folderPath: 'ti3jsxjo98ces52cqbd0qwa6rx2t241zru9fef6sv3hh2oy639aypcu9de8s64lr0b7vqbvnd8xnhfy8nh5ezylxz07vqnqaavsmd5yjxufy7s623soay3abqiq9hqiymogh2r6vs2k34xsdq2y0hcppd2jln1z5zfbckroh50fxohu4fapipznlzycoh4tiv3916a4on669e8wkt60gcjni2r7fvi8u56q4mb7cea9855zphqyenaqbkipolzz',
                description: 'zbjfjddvwejyco44rw34fwc9h4c6ft0whmv8gkvhrw76fqimoq1v0vij44r0aq4wqz5k20zehjc2qrzakzsyjhpj4949eyzpvfsfpbynnir6my23s9w6u15p9qflenorqihnt1c7qaojrufxyefvvj0jpgp6fnljpb9op3hjx6qhqrxd4g4j4ossfuuy3s2boei2qyy76auycx5zxl5zanby7gjghkhrbh54j6s8ze3d0fb75ocqrdw11e7ij2n',
                application: 'n0b1ybmbny8h4j4jwr5ud95jqyq3u1peqj56bv23tc2lcyfe75m89t65ac7f',
                isCritical: 'true',
                isComplex: false,
                fieldGroupId: 'e01330c6-950c-47db-94df-596b83e53e55',
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
                id: 'fe52fd6c-2fe7-4ea0-a810-d1103fbcecab',
                tenantId: '115d69a9-fab7-4051-9265-75375754b2e3',
                systemId: '709c6586-cc95-4d58-b738-eb8c23e06b09',
                systemName: 'nn1w0rbz8g0kqalt4lif',
                scenario: '48y2pmg1av3zde1u1qiwvuxlufqdpoyn374r2196mbxidxw06qv9xzu59gu5',
                party: '08azctzu2tvb08sfcyji9n4z75efo880pw8igv733jlsdg6fkmvqeq54hdja4jvgdqf4fhktgfzu9fcmhvdu2nwhb9qf30btaagaqllo358m444kqqfhq8qvwnqmbf4nt7vh65fujtqbvaw8vswrinaiwcvzo5gt',
                component: 'id8ug9nd1yk9q1chs5kwjgxuyd14x8iulbqj5h37olca16i1aibg2xkym8bz4u69cdbk7xvz7usgdz9qm2k40jsilq5nq0w7xs1n54vuxdjbicm1o4utz1syceajtooixxjihrvk8wiydw6zqej8pi96sdopjoiy',
                interfaceName: '5v7qni9mr0j9wnawwxuuhv93lhgqy07zvednuj9mg5xgdzxftmt1bdgvv35geb7exfsiqlqix06lk17t37ua5w64oohrrspuilvcoubjbe7y523poxodsvfa3j6i574j7rlxsicqbh51tk3ymbx82zgbi3d7i339',
                interfaceNamespace: '8klwq2elgyw71p9dazbx7n48cc6vpzsl2yh4wa402tk0kgu4frgzq84ellr3yjlrn3wlblgx1cesu9ew5cjf3pqm92k9k7dj0nn6a2hn8rzoy92slu2yh5di4q38a2tk3qxt4a4b9ajvs0u8vfqvk0ukqx81slnj',
                iflowName: '8m1ynz0avk6zsdd2v9nxll2c6smpvgcaa9uxn521iq5u8n0qtbtl5ftnaqjpq9atzv0k1nenxpjxsm93yq5he3dyj7dtkbqm9o79x73k4r4bnk6nidpjp1rif0wukypkjocp4lvh5nshe56ouejxk3t13mqogcel',
                responsibleUserAccount: 'y1g9cto0bvedgb4e8sgk',
                lastChangeUserAccount: 'o8hxzq8p0io4ej7vauga',
                lastChangedAt: '2020-07-22 00:48:02',
                folderPath: '1yhip5semjyr3czelatip049hla587ii16idvnhob0gy6eqqcu9p9y1hkpqbizylbbia6u3zzwyj2toi7qfmex0evr5j3u96tywlkte80dcs73h2wr53itis1zmkw1x0b7zl5reaj796eg3cka20wfu9wkiuurtnf6pkbxn5of1me8kw4jezo3ul9ie55xg46tdadbm11yzlrfxrfqpwtgld5o3rmspq72uijpp09c4vpgn5300y1n7lvzfbw4s',
                description: 'gogazfcc72lk8zzfseew712dg9uugturv4d7quyf76zm33xnfhf1p11bcx0l8h4omx6q6w9rwnkygmo2zuoq8564t0a90o535mc89van6cfy2kpobw86cl9tkowcahdexsdw4byubrl4rblc4lfzmy53s0dt9h4ud9buf1vkgyld017p6usp4ly4x0cwngddtmqb5hufprb4f4v2nlksy7al1d0cg5ayn8egfssjkox8odioo31fx3jtge8sonj',
                application: '6ctwe5jmm5af8wrqvpsmfkqpxp8lsp9hrt5k1f38n3kuxj0md4n0ny6sv2g2',
                isCritical: true,
                isComplex: 'true',
                fieldGroupId: 'e01330c6-950c-47db-94df-596b83e53e55',
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
                id: 'fe52fd6c-2fe7-4ea0-a810-d1103fbcecab',
                tenantId: '115d69a9-fab7-4051-9265-75375754b2e3',
                systemId: '709c6586-cc95-4d58-b738-eb8c23e06b09',
                systemName: '73mpp7qx04l8hj1zst5h',
                scenario: 'jnxzmrbtyst46uqds8lyuhgy989671rv1g8ej9i0iczamvowrhlnthhr84w0',
                party: 'x1ogi0nfowgaeux32edkp0nw01p2cnhyy0pkdpjoaecaos7y1474siudq9lq47hm9x1aa3ha313chthoma3sgc72ldn50hl10ak3k9lh4duwflfguklhj2bee9jsyt03etiba4xzi9mnomtjahmropw2gewv98x1',
                component: 'dyf7n060ctntd344jnifpu93712atedkj1l02gw9u6bkwxos4hrltkk9gpn6xrk09omc51smx6mhtnsix8qbsexgbad3k2f0jqd98u2k5i28c1b2p7ceyi9yng0i96jtdnu57v9a2kub4rpxr9mjro4h3je9q3g4',
                interfaceName: '5xowqdiephw5ocdsqe33iimqm487rxejtjrle9iubgh93o3lnnlkmncm3f37t3aih62myxepuufsp6m7qavjgy2v61myg3bkqa5vpbgmj1fnxvhzsu1rrb4z0ak2zthbgyxz57atmk3skfpnyyf77vrank07e45s',
                interfaceNamespace: 'nmhzg4jfaphjbk6afc0qs0ngfxljm8f9wgwb9bx6vrvoa6xeqwaj72u19pj1x2o8z0sxhqxcf3esn0hurlvwt5s7zrb0h3mf9v5u5m94ikdwsjn3kvikzbuwsnai9k01dq66edcercthsdgry5to2xrnfimzwqvg',
                iflowName: 'ifsver252pho6bae8pzq93ogw1kua4dnp3wrg7twa1prh4waexx9mqgr667mtr56x6ir7h1syrhht2f4w3g896v0u1sp8xenomec7ybluzklhygi8jb7eemuzgh3zjwshv7q86ex8jydcu2s8ff9u5ycrmyqtz89',
                responsibleUserAccount: 'mbcr1gewk80s76nckox2',
                lastChangeUserAccount: 'rlqs0l3kyvldr3yr8gsk',
                lastChangedAt: 'XXXXXXXX',
                folderPath: 'xwian7xr015hrixrhntxmjes9yd3vtx5f8bna369kj5gkxlig2mrycisoahnk2tvf5nxyljow9hoquf3q573bwddmzvzdvk230513e1gfec8th2z9ow5jgjjjhbfm9aeje0rol9w83kjq7a5vmi9872fan8t0lu0f68rox4febu3zjibmy534ybg4cg9rahtvhmyl16sn279qjizgr063rtw3ypw07lgcbwdmqszvyq3dlr9j0dxqif5wufe2rl',
                description: 'fo98i1bbh08t95oyf0zzs720qlka8ghc40imhufzjc606gnjcewe9kr1wovujzk4gnvqy2wyxcujkvbg6is0vs9ukj8yp4tc5q0w42h0wxbvdvks2fa72kq7gjmzpfx0bsqz22kr3bn0lnk7e3mjslpyrku4zb29aikis0768ncr77ejv755e205w8m992c3gjv94ff4onwg8h890k4el4x77jozh4gkhezy4ximhzf9f6uhmnbtgl2sphvqky1',
                application: 'm434h92hkbxj704orgj3chtcpn5ap6f8upifnbqn785fxosy0tzcgeghlaa4',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'e01330c6-950c-47db-94df-596b83e53e55',
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
                id: 'fe52fd6c-2fe7-4ea0-a810-d1103fbcecab',
                tenantId: '115d69a9-fab7-4051-9265-75375754b2e3',
                systemId: '709c6586-cc95-4d58-b738-eb8c23e06b09',
                systemName: 'zsp8evqnthmyryi1xj26',
                scenario: '72722w96eqdvyzsuwq0154tqyd1t53alotyx36g12qsxyzol4plyt0df3zo6',
                party: 'febfsmchjev8cgsvvzy3jw3d463qal8ovbg3ic847p8p8fyfafsnsii0nf2flnt1d3r4p3n05vus1ood02tx42q4onh5pev7fvmgrb9jvvtm2zumxn7fqunejhsq9pmz42m1i044zev72rxwy8jy5tx0smh5muww',
                component: 'tdkojr5d6okgpo354wmd2frxdj8o80gvfcpfsummo6n3uzsb444tssec4ghgjelqiercmz8lc31yzoss5n5jo2r6asp5pph9uyso21bgkhqjq72k08xn2bcwvk3xtsqwpw5oyw9m2xr6t6vb6hfmaz1ivhqt1hng',
                interfaceName: 'i85dqe6ul4kajd7dinw8pdpfzmz1cov4gng6ya2kkhb28gjx5608wgi6j4se4fvumrc7anzem7zth32unwjqmps6j9q3otmxbwmngbfivhs74l6aff3yyv7yss1axip0lhbeycsgx4ri7z756vg5ziboh98djgak',
                interfaceNamespace: 'yklbyopprkooip6b9qq5ataxsgm3nwz7n5doy3w29uyyvvgtuugtxetauhm6o1a1umusujmund9twhl6mgaj1dp90yn47fk6ycidihge8l08qholgx0p9ernxio03mznzk282tnlztvgxwyo9wxs2mmfj43vxomr',
                iflowName: 'yu8ro39q2y01jt0n9tnz3c97b2f2z2rs0gzvc2joua33s5q1cki58suku4c0n164fdxn3bl9z7ecosq4sbah2y6wokro1fl8u6v9xha3em1828vxyzhs01xg4j0unzkq9aieeo0uaihvwqjl6ub8k9gclhlb3jiw',
                responsibleUserAccount: '21lifdge1cbj7z10zle8',
                lastChangeUserAccount: 'f5a79gjewy86n1jz5oe0',
                lastChangedAt: '2020-07-21 09:13:53',
                folderPath: 'pqv82w4pg4sn3af2ncb0jlc55csbujg6tv2nkwg3ti97pj6oct3yatv4sx9w236bxp4z35g0yru8j10dzem74iuydezjmrqdnspjgamiqu25obd700naa8oehber2jhttb425xub19e52vrw519y45w7kgq9uzr4dp7sfstc6lk7j32vy4y15lki0ideu7v3l6g18yl5pjhxd60g56k0heya0ht1edmzu1gl9s0cxt25336lwkmjpsc0uhaazof',
                description: 'b5m6my13zawyd6z2d1yovf3oyn1rrernk3mt2l1y3fi72dvcp1ydjls951v1pm0kwvv9n63wnakqmf5kpjuz9jsq640atp20j9a6yjv1ww0rs5dyywfy8oxkhkncaic13c661pz3we3c1heuo0oxl6odxh5z6tavhs6bbn87lv6ne3vrwj87xpeaugyc5fnan7p2rx715go0wy05zd2nazcgctv83wzjr73saodxn85pw2pgm9bhn44c3e4cpc3',
                application: '164jzywe7f0r9lh86v08bhwjos7v396lez03stfmkfefy8b3abbq69d4qjup',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'e01330c6-950c-47db-94df-596b83e53e55',
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
                        value   : 'fe52fd6c-2fe7-4ea0-a810-d1103fbcecab'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'fe52fd6c-2fe7-4ea0-a810-d1103fbcecab'));
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
            .get('/bplus-it-sappi/flow/fe52fd6c-2fe7-4ea0-a810-d1103fbcecab')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'fe52fd6c-2fe7-4ea0-a810-d1103fbcecab'));
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
                
                id: '0c8103ca-1dff-455a-be5e-249543042f17',
                tenantId: '631b0ff4-f1a2-45c8-908e-68e81050f83f',
                systemId: '46d1a749-bd02-4f1e-9492-7dfde5022eb1',
                systemName: 'o7ffed3thkpi51e90fp2',
                scenario: 'x8q4iy2n8i90q1skpw18zgibeig10ha8dyqljmb1igph4gzxw9yh0es35pkq',
                party: 'rkqge0lrcdlx4rgtp80r2v8sm5yhv3dtqqxc41yh03z5nwxm86vyhnejareiczpwu4my6k2s70iw9mca0x99o2bxn351eqodid5xubp1x9unhhbkzqn389ogd74bnvpuwaw5cyip6ljer1jm0lltrqry6kmh3vp3',
                component: 'hxu567npdgqfccvr2y86o3u33js1mlc0hxdp7v0reky64o1ddj5cqdirzwfjxbfuyrpvbxp3n133s7dft26oe5l3wbux4muom88gzdbjq9ss5cgrnuiwajuggiez2ahaqpuoo4gtded1od89gcojhzfi6t7p8pf7',
                interfaceName: '3xw9twvozpckznz5q6hosk5sopxqvy280qwonj6j0lg7a5u1vzgvyioyvs83ylylxj2m2is9ytnebydvvv176oyxd0c0twwh19r5m6n35qhglk4jaq6pgyi5ncclfzmwmsaebit68h586mgmef7male0xyzdsdfn',
                interfaceNamespace: 'hwadmyowofjt6t5329n9bm93tkkju7lpo1baabuqs9c1vqkxok4ma08iofricxdzhglihtkw964io0tdx8pm547kdluia56zazj28l5xo3vumudpqtdrhdumdqthi1m8nmmvtjyzr9q0g8qhl5c7z32z0butbuen',
                iflowName: 'lnqwm76tcwpdg8s6o9f4349ntsdwybo11v42rlpm01pymqyt6xvorvub0v9ww8tm6x2qby1b9urn70ba387iqiwficgtplioejxsuqcge38pv6dqmk8o9c7jktdefvwyxxn5505mqjilh5ph4h16gm08djzs9dta',
                responsibleUserAccount: '31vw9x2pyi9pex3w6gs7',
                lastChangeUserAccount: '0kq7xa02qo6u7ctig7ck',
                lastChangedAt: '2020-07-21 19:57:14',
                folderPath: 'vaw0ewwvyg0uv6r7kf47ms7ttcst4f831old4i3jfe4fdujznufcslmqdsz9v2h8oflhahw5krqw52m00q2ge2k16w172ug6fadmqfj5kocytrnq03s5e2ymy5zgkr8cc2w510p5sdcqyoqnsuxyf3mo7y6foljfht60jft6oingimzme8e4ajdqdgzvoj8vj5gkborrku107odottsm6ihbm3h0hfegysokbd8ad7mfei970ennv2jsqmovfxv',
                description: 'i3qyausdezkjf5h4u0sc86hw6nevz5ypldjycdxzrs6d30g58rx9n29dfyyecp1tct13o1rioqkg5uqf3qwsbvipbh31airzg9b9kwu749lbalfeptewuql25dqlzze7p4g5jj00e6rvwg8selfqjeuu9pq5bhn1aieg1htuv9v673abjii5zhbuqr7vbxixah7q4jx4dtq9y0hv3f6ri1k81fjct9rykg1q7osbwhiapay1smdadapp53sdin1',
                application: 'lui7kqwaiqbbsvghmbrwv2744pyevdqbfewoyudhkkk3ikc74znpc3uxxt03',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '6917b26f-53ea-4475-ba29-61298ecee9cc',
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
                
                id: 'fe52fd6c-2fe7-4ea0-a810-d1103fbcecab',
                tenantId: '115d69a9-fab7-4051-9265-75375754b2e3',
                systemId: '709c6586-cc95-4d58-b738-eb8c23e06b09',
                systemName: '8ejaf0c0d2czrysxbhod',
                scenario: 'x5du9s2h0y6l5n5obxua2pq80r2se1oc878ub2yqhq1mdb8lufpfwrk7w96i',
                party: 'rbxiey06uxgpj411eu5qc4cup9ploktef11clsrv2u5bodk72wqol8g3eujru22a2ceds751ho16kzl1h176yvopv67nss017x1cim45l3dp3cy9467djukqfbg3wdd3ubfm4m2qbx30opdr16hrg547mup33c0x',
                component: 'm2k7xxnxip2y98pvi8m4be8fv1rlhlac2cfjn3heqjqdkwd10zrwezfkqko4mg2i5389ilf8dl6rucg3yttyw04i6elxti4960pqc5ripaf320lz689lhc36shasbtpxixpo71bo9ew2pfq9zhmmiwurw2ke16x0',
                interfaceName: 'wk3fnh7297yutmeu29vvh358ji1plpzuysm8x5zkb8pfv8bihjzocrj7iizo90rhqu3uf4euqlsmdorlow0qlnvhpcmcyxdh5rjkd4cuadcd7qkhviifblz0ho6jrizvphmzqmtvbsfmt6p4qdlu355qvxb8jk1b',
                interfaceNamespace: '23huhhe06uapbxik9mnsqer1f0niq6lhwab467ki89rw3tyfbf23ykjcvwrvqh4wuury8p0r01t8cdbpchq3trynurcfqrc9v3qmwu4232lfk65jm6csjc0enjsfk77uk4526w2u58mvnpzqzg5m2kiieia4pxuq',
                iflowName: 'k59zu33y2v0izm1wwyeimlhqyqpfp2mzibolrhzb4vt5pcq1eviu1rs1mlt6db27yrou0wnr0ufwbcpw4oglewbb720nyu1rfvhn0c57rvzv7bxfle2y4y2smq3gj1i0nihhvq7am1r8oio1cei7fghbveqbit46',
                responsibleUserAccount: 'xa9i8lat8ojpzexj9nsw',
                lastChangeUserAccount: 'ofqp2gs3ix72rhiaw63r',
                lastChangedAt: '2020-07-21 16:58:28',
                folderPath: 'vxkj7zzl8txf3d7z85w0dyhfr233zghj6bj3suktynz25dfr5cp7r5kjq7xtxnlj0u6rp6ajg0catmf68cbs0ew5ecmbqrmpcvxma80c42gp2jvnixl5davkco9u1omafv3hvh7vbtbyxmgtq8je1a4mnrtqshqdsyra3f0em97bc51xkmdqe44thqicmhvh18t4furwkcxl9vz7t0aodwi930egcnwyec46rcjosyq7zz22q0xn0xvtx1lm5ze',
                description: 'rhvynfte77q4us88gmbvtkmbzbla5k26w9o2icqy24l3todyxd4lkuy61d93q7xmzenymh1n565oaarcv5gkaoxas8q6bpyktgedg249grfiqnqd017w1w1fr0ale5wepoehbcdz0tfgmf8feyzee2nescrkxnijo9kgbqgwpc4hc65naddkno40mkqko3mqgctol8ggtskg3sp3n2v3y0cubzdgu32r9ijz71dnvrq8xxknksusl59ttnql5qk',
                application: 'opedxb8nlknv0xfk8bauavt39aldtdyyjgnilqejowpjq4biafhgnd0uvkf8',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'e01330c6-950c-47db-94df-596b83e53e55',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'fe52fd6c-2fe7-4ea0-a810-d1103fbcecab'));
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
            .delete('/bplus-it-sappi/flow/fe52fd6c-2fe7-4ea0-a810-d1103fbcecab')
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
                        id: '2c27f7a9-4902-4fe8-8944-af08a80eccb3',
                        tenantId: '115d69a9-fab7-4051-9265-75375754b2e3',
                        systemId: '709c6586-cc95-4d58-b738-eb8c23e06b09',
                        systemName: 'wvno5t0s9gln8a3efx3w',
                        scenario: 'uae2tnfboak0qfg5e1uv3az0vj2h8z7txuo5xvm2w09p6txpkj9s02uagye8',
                        party: '0zxl8j5t43bql33xvx9e6zzzniuyp8jw7lbyvfs5gfyjw18la5a6v7bc7pla66mezd9b3yr6jtbz1zht8wwibpdsda50ct69ixyv0iba359wqjpabj3i55d3qsq113lzazfot3kqp2c8idfoapz36w1k3r4xta09',
                        component: 'o1oy2zw0vd7yw8t1c60nhdv0mb5ussh7m2xhgua35kq4hftnxjmtkttdquybgq5jfn50wz3gtbt7evps3vdtuae4e0zx6jju7g5xqt2fet9cq1mkab2eqn92rhozrg7y4kploxkanppdztvxvvf05p33gagva8pm',
                        interfaceName: 'mggumiy9faofkxeekpgl11wg3iiy4pqvcqb4t7cvv1hpxjqwj3uqdfs6atipwmcxn4ib0qi7douerk3bwo4j6zxsgxgn557j14i1dstx6y31oy4wq57qyrgvmxdap2wxowgpm4wwqsj0mcpa5flzhorwcmbo8hu5',
                        interfaceNamespace: 'k1u4mz7b77ocgz8slieofsr0nmmvqmnqnsrh5uny83waao2b7kzew7v37fl8n6yk9m0de6zsupwy6lnartyihizd0liwqdk4psxgru8wzuxafdlfulkju55dupjolx73f4cg5kl4jcwmwx0aohb3iuhnzs8p4ucx',
                        iflowName: 'rxqjky466wujpqrpdr7pi4wwwkr1h2g56p74rjxd731iefxnpannf2f5xcfvfnon7vun6vsqhh6pi3u0sazkw5dfyrheqluaflozvkrt40bwplgcx6n7f7tepeisucb79n8txt88ym5onvsxwm8fc2fv8ens2jqb',
                        responsibleUserAccount: 'jdu0i9pieqaeyyvc0u03',
                        lastChangeUserAccount: 'xl84mvvrbwjlmpei085w',
                        lastChangedAt: '2020-07-21 01:58:21',
                        folderPath: 'fasrbtb395kq08fnchrpjwqurpjge6nl92sj1brbvuzonqofpp5pf1xz2teb0xa6npidqynqciyyeo5soh9y6v1fqpepywinet2h1ogo70hpjo94yh4mqgqya8bfmmpcdy18dvuy8sb6g7ckkcoddji8agzzi69eb10orda5xg8zh6qzo9xryavy14y34b33qoycp2tu9bzon5068h2cn33nar9csp5fyedxmab6wwbw6anf3tghz4pekjspo2z',
                        description: 'i0eqm61zddxw5i391mdrzz13z8681kexbi1ozl99fd97ql423cxd29r02rjtmokht7pq854929cjwcfb7vlbsahdn8w6x5focyr1o1chd39voekutk0p8n1afz0h49k3827ty9mctoqjqevz7adflra269pi22jwi1kyc5qwhl6pyeg0925qk00plouh626ijq7ax1ae3dvt0gkrx053ytozwvq2dvspnkc02n7ieytpnoiczyw4jftpdbsyql2',
                        application: '0ioue6rvmazf5jd8kfo73zdczv3196pnxw5wprq6nu0f78jyiku5i2x0ek9h',
                        isCritical: false,
                        isComplex: false,
                        fieldGroupId: 'e01330c6-950c-47db-94df-596b83e53e55',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateFlow).toHaveProperty('id', '2c27f7a9-4902-4fe8-8944-af08a80eccb3');
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
                            value   : 'fe52fd6c-2fe7-4ea0-a810-d1103fbcecab'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlow.id).toStrictEqual('fe52fd6c-2fe7-4ea0-a810-d1103fbcecab');
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
                    id: 'fe52fd6c-2fe7-4ea0-a810-d1103fbcecab'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlowById.id).toStrictEqual('fe52fd6c-2fe7-4ea0-a810-d1103fbcecab');
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
                        
                        id: '0414df80-9321-4084-bd71-421dc5d01b9f',
                        tenantId: '96a04c10-4b6a-4894-819e-e26f9e1c71dd',
                        systemId: '28df37ab-f1cc-401b-991e-8a07c3bbc9f4',
                        systemName: 'uh99vr0uos7mhuphghw8',
                        scenario: 'kab7w9kkg6m3bvm3ycgbr3ufbaxh2bmbv7o7uvacx8nk97ly57nwy5c8jrvg',
                        party: 'fle8uiscsu5fpfi8k7efzk14uqk5cwdh1719njzpa96ssmx8t3kgzock7a8fzyfqa9ufaygwyhrcif197lm61xcyuy85u3bwx7lamwlirfr1t82ymx2kwx9u7ljlwqezu2e8ksdmitb4t0807cqoyib0hj1kyg0a',
                        component: 'c1ml4fnudvi86nni8ohunqjhcz6k5i5nbwclpjt60gcq4y9ztfirixz45obx5sd479z5ngasf1ibhraks23pqhdwov8nelm6ysi9k9t51mj5ftr8fceq5tiemu7ot0mdmwczyz8w640xqno5o9nj0tnhc3er6zdu',
                        interfaceName: 'q6grmmaj4j21herwk94htjh18bv8m8bqrhxkcs3o1uq8riujv28nyhvs1iz3a02lrtrfxy9pry2ym3ls7xcgm788h85vx8j993w71qbmr37lmh82gd52h0d933si8lz7ts597imom074u2epqo348hhsr1r0l7c9',
                        interfaceNamespace: '3keid3kd869q75ssthjiw4yn3flrv2shd05mwwb8cpg16fo22d03rvlli6njgajztp6muzs5r2sxr986d1pzloeowktwyh9yvaaqgwp1ked8id2absxf1vtuohr9j2djmm7s2i2ktepx2p12eigpf3wldltjr2gv',
                        iflowName: 'r7qmqjfwc7zzyz14z84jt38nuif2b4y9pkr1vr1kwofloox8lwobxiu1th99gn3rgw5cy9l8nbz4h4ffkkqgzsb2oz0r8xjws5f3pvbz5kmooye23z8uwv6fu5f9s9jzzyufq75d3i81f7admwi7jgexb578n543',
                        responsibleUserAccount: 'zpgpf9i7xl79tbh7i6rp',
                        lastChangeUserAccount: 'q9rpseho5mpefp8ivw99',
                        lastChangedAt: '2020-07-21 23:19:55',
                        folderPath: 'pt72chl1ryqubz84yemafhxij2oz3kd0zr9g8feiz2gmo44u3d3eipcmjwaadrem87hov76le1rdd5h5r6vm2neca88s5agvtwgqbnhr622e0keyso5tvjgt4pdu9ucntdn9tat28pjtq7encqt73t9xula4fih6jxxpz67jx8s6lkcd1cydo5361ikb68n3wl6q3il59mjb2bzbg8v0kg5pj3qsywjb5jwzrc6wio22zzd5t50fvbi9t2ey2gs',
                        description: 'd7po4qne4m59xy6sto4gp935px52ca5t4b1kyoauvin109omqtjfi3z73ihc0darfchlaln9ud91pq3r0bpmq823v6hpvuyr8nv7zspckhyp7ay0f59fuzpnzyvqadenzoc80k9jh0eyns0k7qd54iuauofnew3sfboalwqf8khagsx66kmeiwzk00b7lxw6w80roslkv74amh464xbb8sfy609x5wsc5zl4x13foqumm9zzkbzr8r2ivfslgub',
                        application: 'mfd74jxvziooaw81yw4wacfh79pd8jkny99xdncqlv220k30m33a99afdv9p',
                        isCritical: false,
                        isComplex: true,
                        fieldGroupId: 'fbee18e7-0d03-4f93-94d8-26e40b45197a',
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
                        
                        id: 'fe52fd6c-2fe7-4ea0-a810-d1103fbcecab',
                        tenantId: '115d69a9-fab7-4051-9265-75375754b2e3',
                        systemId: '709c6586-cc95-4d58-b738-eb8c23e06b09',
                        systemName: 'hkk8qczk58sgul25xxbo',
                        scenario: 'h3lb07ecxiu0zrguxndg90t7enwqdzqvwo0xe1rd6chsqfd8jblzuf6ymxti',
                        party: 'gag0ggytk2vs6da47ko9cjgrgta67xlw7kcfyomfppd6szg0n1xt9uweosr7t0r5cdchzaqrjcb3g1ww9ez7xvdl1r5jxouk82outspmqr55v5ax8e6asjhl76m5qjvuyznc4kb03z0nvtjioq2f79ridil5at32',
                        component: '60lxklzl25yg3k0ibk20ex3toeuhhqi98nvbc5d1clk5ujymc5vpwt4x4an7qrdpg4w3ha870nwa40dh7l0ravja6s2t4sia43rr0woban0n8j0l505it9e0zobbfolxq1cllc2j8szsfsfx1hroh0wlkcdn4kfn',
                        interfaceName: 'b7ra0cjhihbqv44imq9brjl4pyqtevibxbzjx1uuk97tuc82lxj2m2ahjk310hm7p106h9fetc51gr9wx6ejnpk77jate0gi9o43erlhy347mdicveljc7jjzn4u23f95x3ybex52xm897igfmfg108gpahkx7l6',
                        interfaceNamespace: 's3jsjmzvxfx6q9fjshothhvdwwonalclkfudmzq0q5egmt24tdw6quzirwgsmsil7etizbz1goj736uvzb4rlvird1gf1j8jxbnjds75eb462udga6ntd82mopwahj64o5goq6iyrpoqxqlagf1xbh7dc5jcswle',
                        iflowName: '2j9y0punlzhmf2a38tfw18aky9f2n31x45yk4lvtq677lrpyvauima0qqs98mvgbttzr070t7xrfxsdaiwuucyas0mvw2mhmzlzahvclgw7ydbfxx6w7lxsvjlwpokmyhgqaw709mhzobl6k1a44zqjy96snxsi3',
                        responsibleUserAccount: 'z8lwou91gcspq5nwh0bh',
                        lastChangeUserAccount: 'qhi7ujk1al0hmjtq68ih',
                        lastChangedAt: '2020-07-21 14:25:30',
                        folderPath: 'tzamocfzvkogjv45i5gzdedxwy2byrkmnp467y36sj4l23g5tnsh4ec8ik1nes8mfgpxg9u5b834vfmt0nhqps4u92rt3lt371ew6puzkhhf9pu6u9fujflqgr5zlmo1npfklo7ny7e3ztywqotkqg0lgvk4xhfvlb8yt37m5isf09849myinz0v8cuj59kit1m9xxcvvms9u06jr8vhl44e7vmtmp3yf4rppc42km9v4ieoeeses13jxilkxqh',
                        description: 'x5hyrsh7fewe3vafg1b0iy0dy9u4tonle6u2eojqi7pm0brdoe1gz78w8v2yaemr9498u5vg3yo38jdu99pgnbaliuc1vd1jk2psm4ghzgtk52cq8dq8usv9l97jym1r5o5xn77pxag8l9b8rdzntl0fyza3an9d6ceux2e166yo428335h5a1jg1zcu5ncwsh8bkrwyoicuk7qel6w3ohxunewofgwce0svquygsio9i6g1rkl4202wtwa1wd1',
                        application: '2qk1mtmantp9c6gjcb14upda7kmozn84bw6ehab7ek9r6u13mer1gxc6vbmh',
                        isCritical: true,
                        isComplex: false,
                        fieldGroupId: 'e01330c6-950c-47db-94df-596b83e53e55',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateFlow.id).toStrictEqual('fe52fd6c-2fe7-4ea0-a810-d1103fbcecab');
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
                    id: 'fe52fd6c-2fe7-4ea0-a810-d1103fbcecab'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteFlowById.id).toStrictEqual('fe52fd6c-2fe7-4ea0-a810-d1103fbcecab');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});