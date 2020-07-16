import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IJobDetailRepository } from '@hades/bplus-it-sappi/job-detail/domain/job-detail.repository';
import { MockJobDetailRepository } from '@hades/bplus-it-sappi/job-detail/infrastructure/mock/mock-job-detail.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';

describe('job-detail', () => 
{
    let app: INestApplication;
    let repository: MockJobDetailRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
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
            .overrideProvider(IJobDetailRepository)
            .useClass(MockJobDetailRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockJobDetailRepository>module.get<IJobDetailRepository>(IJobDetailRepository);

        await app.init();
    });

    it(`/REST:POST bplus-it-sappi/job-detail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '93ba12a4-8601-47a7-8fc7-3da34e71a248',
                systemId: '4b0edacf-4b04-4fa8-8621-11e0ca532d69',
                systemName: 'r4h9ej1rjo1t75ocwrzm',
                executionId: 'aa7c0a34-1f12-478f-bf35-f3c1f2e438f4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 04:43:10',
                executionMonitoringStartAt: '2020-07-15 23:53:49',
                executionMonitoringEndAt: '2020-07-15 17:52:14',
                status: 'CANCELLED',
                name: '77nv8z96bsvd0wzirs2k4oppi3ky21fvuay2c8qep31cdvyfhbdc80pedtou6yk1a3osx9vh1nk1w8xrn4hk4rzu62s8h297xdzy9fqg4afyqydyx3g6rrq39h30xg9sn6ihdeq1bain5511i3tcgxdv878l49c4hg9mjxfmsa99j9c2hsevg74kpzonypgiv4tgmhcsohxsztg02tpfy9iss5e0nprjo6sq7xb7x23ird3mve91ehsx24p5nh6',
                returnCode: 8437314400,
                node: 'gtpgl8f253flrneiarvpokf4718msglcigsrwck70yjobm5bjyznuve7kknwjtqzrcdlr4yemb0e9mc8ob6b7av341oe4z99ljtuuk9w1az4z277xp6axr97zuga55o5hebljmof1atiho8abxqethkedab0qnyf',
                user: 'y85jld8lkbaoomo05iwdjkpb2s9zspfxhyiofrl04cv1kz4iyyon9cmzm39hpdq3oj4v3e73zj9h0vsd56ijhkkbhejlylbjq5gsqare84wmhbxzquj56csikbe9iqedk9407rgnxm697re5vovyaseoncfcfugrnu54csf60fo0fk193f6fu59wlbs69mxeysk89f2xkpn3vgsfu0sawcczgqr8xfrgkrrvdj2pcg0t61dxq4byw5vo5ns5wm0',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '93ba12a4-8601-47a7-8fc7-3da34e71a248',
                systemId: '4b0edacf-4b04-4fa8-8621-11e0ca532d69',
                systemName: '9eohulgca0ydytk3ouxb',
                executionId: 'aa7c0a34-1f12-478f-bf35-f3c1f2e438f4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 04:36:48',
                executionMonitoringStartAt: '2020-07-15 19:36:35',
                executionMonitoringEndAt: '2020-07-16 09:39:54',
                status: 'COMPLETED',
                name: '3nomvyzcqagayawwfmmnvuwitqp6eaz1vcsysqkmwetb5428blam9s58oory9ekrvbqh8wms2t6n5yt3gsu1pxsprs312nlrnktq2a0thklyjll7y3qqpmr19uy2dshjudqtakego69wpiz25spyqa7z79b57w8wib624cy0hgxjgvd943fw1a0uibdnipv4u2ls6cy8v09y4h067nhufdb7fwu7013aiszbnahqg3duclwevq3w83qn0yacst4',
                returnCode: 2316616917,
                node: '61ordagr6t6n4lbehzkeu76o9luvqx9c2gm42buc5brmyw356u3fgdrl1takexziw7aseldksle1p9vagtn5bfgsvqdgdo4p2yqol2iblx1nleovbruvpuheaphqt53c7r1wtzwi736ppqmsy72clx1o2n7c6zr1',
                user: 'mvnxnqtqnl9t3q0pjdzhslf70p8xqtjqdof38aexw7bpr2a46ub11pvt1jeliqk9ebnb9aerjshg73p9mwvzw3dzhun9nky1339ub1mrq0ms06wetztfb63sifahbovgmt007ppwh8hxhr6riq96dci1kdqrjvtj9a0fvwxbawuh1ps4iy96j5jwnt0yvep5zjkrx9817gxiwwfewskc46dwvoqc14s5ea6q2asuo84t75jrpzdy7g5wlflpyfo',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'e72d76ab-361e-43b5-b0e9-11e045bbd835',
                tenantId: null,
                systemId: '4b0edacf-4b04-4fa8-8621-11e0ca532d69',
                systemName: '5spfgoye3uds19cvpxdy',
                executionId: 'aa7c0a34-1f12-478f-bf35-f3c1f2e438f4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 18:56:48',
                executionMonitoringStartAt: '2020-07-15 15:48:20',
                executionMonitoringEndAt: '2020-07-15 18:50:01',
                status: 'COMPLETED',
                name: 'x4wj3hodoz3syosklxk3uy2m262t92sxpaa2ki9dawmwzph8qpehealm8190ww436s4ho3rm6kvv573lgho0tut07dmr9i38dmzlis2grhe4akihcbwmtq43rde3lp4fau7qgw1u9n3qbtt6ht4w2hsidphmb8hfg8crlrdfjylnjktad36b490m9xl9bo6qfv4peibk0yvdpe4wpst9izunapkv80d2p2yws56vkxqnagf0kppd36rd08o6wwt',
                returnCode: 1722118799,
                node: '7dw9aprgfskdbuwe2vqishv7kjr4689bpvqz5yj1y11czhgnbrlqbn4yza1buuwdu3x2u6ohoyiv4aoyi5d32mjkm2xqtc9iqqvxkxwjzdkhrht4ma10po7h11oslx7nuamjh46qzqdpo9v34stipd5hp2tad1qa',
                user: 'dxheomnj4zs9t0fz2o9wujh6ueod1817iqhdj5qvg100wyvtq5a622yg4ytrin5znsn03nw6crjrrh7dxxlrtlj8lulfigpyrpfb0jkwsn3gfivkwok2218ich3g6kk57bhur9nw8t96kdthj7sjnx9ius44brbt1cgd8kzqrpsbdagtsdvgtdz1q3qju5kub9vt1qpccyy0xhrl5c96iiyvqjevjvdwyb1q210rtywb4kdyr57dxrmee9p39z0',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailTenantId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'e72d76ab-361e-43b5-b0e9-11e045bbd835',
                
                systemId: '4b0edacf-4b04-4fa8-8621-11e0ca532d69',
                systemName: 'voyeozjtenfw0q0ievbs',
                executionId: 'aa7c0a34-1f12-478f-bf35-f3c1f2e438f4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 23:12:38',
                executionMonitoringStartAt: '2020-07-16 02:37:54',
                executionMonitoringEndAt: '2020-07-15 22:40:32',
                status: 'ERROR',
                name: 'kirfl1xqq4bdvx251ua4mhosdvsmhsxbmxkx2vf22etzsln2ai2qtotx8qgs2drkf3lzw10gnpe12ucyxkfh8fwp0jty9fqh3qknwkuhcp4iqf4umf9pgs4fc2bw1j84tifa43vh11u5r837zig8k9l0qzfkn1o34wf2w8gxzv79ppfmykwjjx7m618n0azh3agvmd98zt6gw2z2su7xxrznyjpupo0sstq0m6ohgin4qur118gkjjkszreuztd',
                returnCode: 4391422902,
                node: 'yk2j8owdqyj7d63m6prky1wkmd1r8n6qm9crhhzvb06p5d2e3l6ficc490k1mubqxzlflr3pqknq0f46qf61u6c5ajsk2hyi04i8j93534fz6g4kjl3htbtb180fxr5cfsn3fyykd3s9szw0xynenci2t3ffu9os',
                user: 'l81ig3ef0xvy4mc4m0swhil5se9panr7pa3x1ddk8xiqmec7ma3iba0qzkvssbkcfesqvsqtiw17tgn9ko088rh9wcgj8v3iox66dcion1bur90hfqce0s76ysd1pvty8c5bhut2x2j47yx46jmapfcr7w4a87gbzw82jfaahw4inquvdlbo92snapvdbedh9g1h1dbmw3cclvbjb2bvmp6bwgd3l06hinkeiazel3b0r154bjr4cl04xq4zv8b',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailTenantId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'e72d76ab-361e-43b5-b0e9-11e045bbd835',
                tenantId: '93ba12a4-8601-47a7-8fc7-3da34e71a248',
                systemId: null,
                systemName: 'rfd8m8srq95x3brnjbwh',
                executionId: 'aa7c0a34-1f12-478f-bf35-f3c1f2e438f4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 02:08:35',
                executionMonitoringStartAt: '2020-07-16 12:32:44',
                executionMonitoringEndAt: '2020-07-16 09:35:53',
                status: 'CANCELLED',
                name: '1jvj7cq9no2pa45471yww76k47czue1k9cns47lu2vhxdu5rpfn998r9aaru2q70327dl1vt5maeargw86svpdh3aluemkwqhzgoqmfoo9eb0qv45w7tks8216ci9tvv2k69okn6wp3g8mk15hvnab9eqqzt2tsxvnfpki737me3afo7in9o5qadz92d9m0mgtgblvzc15pci29p2qckympgge9zfxoof0gb2eg6cdlx13hodbz457rbg4k8rzc',
                returnCode: 1104380987,
                node: 'mze40zolx58azs23t1ez6kqxg10w05d3owgi01c0u6lf7p4is9un9xhw77eq82mr2b5vjdki9rs8uv94klee8poyoc3vyeie991bae5y3mepplai0yxogvxv50q65odxfsdk57bv3n6djj4dswfa3e2p0wlvknya',
                user: '20ih22mmfj3ckq232oqthmwguyhk6x9o6ram7xnm3yzgjm8rkc0hi2zmjhrxa56d4jjsh80n36onhl9p81v6e3jilfskvrclssazzenjn6jkiyvd2q5f8ozmad37hhsnem9mdwykjaruznx1v8ukfc5y8exrjh4095pe9w73kpikktaibt87f26t9lr4ezkxoe2bkqdfnch1zmv931oshou063362shysgjo7zoja37kbw7wqb8mw80korhgsbr',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'e72d76ab-361e-43b5-b0e9-11e045bbd835',
                tenantId: '93ba12a4-8601-47a7-8fc7-3da34e71a248',
                
                systemName: 'jzdkhsouulzbwmcjh7af',
                executionId: 'aa7c0a34-1f12-478f-bf35-f3c1f2e438f4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 21:35:51',
                executionMonitoringStartAt: '2020-07-16 12:16:03',
                executionMonitoringEndAt: '2020-07-16 06:26:23',
                status: 'ERROR',
                name: 'zyv345sx1vmpn1sza9tw53a2zf03kugbp81w0u6hhzrphnbjpjkta8ecircwbxfmphnkvlseqjf88f5mwet3zj7fos9r83649rq8s5zb4dkws4mmshhre1t2w2c1xkky55794yleb9k2en8w04kn0kov3av9b3xi43yof26pby2tvsif4bf06siioms1f5803uqtnvs60aoobxuedmsor3ke1g3mghaq08z4pwol7vrn879xc27a4i8qs9ky5r7',
                returnCode: 6326151562,
                node: '3yo5btgqlmo6k38uq0vvwxaci2ldhpizxf2m656zbh6kc8noryduebx8iz7f4t8jixeop4vd4wb1dvq84d78t8wllrh34wxmxu1srm394uihnth4qziy9g2nob2ia5ouv3iimmencg9yno7ee4z28gnbbw5lwul7',
                user: 'aja3pyb179wtw14ulteat6zf5tuvxn0vd633tqenxz7vkrdoac4f4gzmhas5keejzprq7z2uyoc2iwgzfa9lmxduojz50ia17ll2p7eljgkb8v5q4momzotw7mbsvumje8ozostxy10h8v1jpu33fsbdzfxlhmjvwm96ve3cwicp8uw272bbc24b4nggm6uu4mv0x4qn49mqsro5pvyuc9pdy1cex1l5w20w2l05z3ljplmuzugjmder9rghpev',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'e72d76ab-361e-43b5-b0e9-11e045bbd835',
                tenantId: '93ba12a4-8601-47a7-8fc7-3da34e71a248',
                systemId: '4b0edacf-4b04-4fa8-8621-11e0ca532d69',
                systemName: null,
                executionId: 'aa7c0a34-1f12-478f-bf35-f3c1f2e438f4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 17:40:04',
                executionMonitoringStartAt: '2020-07-15 16:45:55',
                executionMonitoringEndAt: '2020-07-16 00:11:22',
                status: 'COMPLETED',
                name: 'ryhxv4tvqvlafz9vkxkum9wlb7wcckjgej41asczj831bzjo8q5x9761liokdghmlu3cjwx6h63f0pufp93qwf02qul1rpcgwqtsbbu6r7icio52mb737d7xe1jtp2ikyqq5fnm726qzw5a4nql4stzka9eh9gtvodjw84sin74f1r9xpxotcyhwro7zn87w0yrph1gg0hxglwtzm2xm0gc0fegqtv3sri4bw32pgf4e83566s8a1z6h65yrh1n',
                returnCode: 7607901154,
                node: '5gchz3ah01a54lcpwvxg2677hk2rf21mqwzyw3jz90cigau06vkltth1avlr0xcbdeiy3wurc57llmszwgdmsy3fm6f8b0g026j3qeouj7fgcg8zx84omwmz33rfzmy3ixyxv1zp8upybgg9l9vdjawmqqysu1m9',
                user: '4tw45trfad0ogxwvy2v177tyhvkzty3fwsg9hrala4f93l5p7dnwfik3f24boi0z6jj7ojpqitq97ghjxe4bioq1zeuj49ce9mx1na536sdt2vttmvya3etg0ock1dtd13fwfv5ig5vmwlfbcflwl845ow805uvd5mfsfycduc2ccyu65xb5dyrfvjg1pg02kcz5btwdydogyupx3vwdkrielpmklv7ork27rcsqfyhfytb5ktp3r104ib5eud6',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'e72d76ab-361e-43b5-b0e9-11e045bbd835',
                tenantId: '93ba12a4-8601-47a7-8fc7-3da34e71a248',
                systemId: '4b0edacf-4b04-4fa8-8621-11e0ca532d69',
                
                executionId: 'aa7c0a34-1f12-478f-bf35-f3c1f2e438f4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 15:58:54',
                executionMonitoringStartAt: '2020-07-16 05:27:32',
                executionMonitoringEndAt: '2020-07-15 16:08:24',
                status: 'COMPLETED',
                name: 'pvedpjnzt2yshedryi7trjtxeaqvhmpru34wwao15czfv5d1l2finq5ndx3jrk99thrc0n3quke0t8gntqgwoyx247jljf2ibqn2po24wq4piqu07vtz459t6dbludf5ha2wnjedc05yayavydq135hs2bp5w6yjz638p5k8j23n7nnxisrapvszj9ixbo3d6tko6i23rlt95lpy0lfg2q7bn443im21nac8hmswi58xb4l6jeg440lzcw7dmqv',
                returnCode: 2065391983,
                node: 'p75wrcn5fk3vwgumbmgjjq0ed4pwal0e9z1fe8lwusjtm3h7bkxa9nja6m0hzo1a9sljretjxxtvc8wwcftgf0t9l99k5zmhzrw7fw2vil0b0lvflb4ui78nd4dz6ao6ozw39zj95wb6qvytck0bzb9kzzhcmelv',
                user: 'coizc4xpkrzn4hzxhwjjyhqp92kj8pdbnld7pnw1sk3fs912eayc701wgkexkrhtbwczp60n8ycg690gv3r7xppz28an7neqhx1rh5xgue5va2a7uci9brzx3dj0yxk5s4xem5k9gm6zfher5hfostkygoy92weabrfk7wwrwlrs3tyep7qa8h7bqr1qyhacs5oo1t5g6aaj5hi47z5hbvatscsq23ehel0ikgwkuqyd2dnhy3ee35b0twbs2zy',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'e72d76ab-361e-43b5-b0e9-11e045bbd835',
                tenantId: '93ba12a4-8601-47a7-8fc7-3da34e71a248',
                systemId: '4b0edacf-4b04-4fa8-8621-11e0ca532d69',
                systemName: '1tza48y6w77qbjti598u',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 10:18:01',
                executionMonitoringStartAt: '2020-07-15 14:24:20',
                executionMonitoringEndAt: '2020-07-15 19:29:30',
                status: 'COMPLETED',
                name: 'hy9s207lk55fqol6hvude8mzmktl6rvwd7e9xlxgum6kn21sdj8wwnfjylt9j4nvh8bexlpnhzqsq4ya8ni0s4bim4c01w5250fzn0p0qkmhkb2kn1n4zynwzv9lptke98t0vcv1zyoxvr9z0aff8vo2pkksp1fl3jrb9vd51wfuml17m1jq9aqnuq38w3sfkgft4rs6qwfheuxd6jqxji83vj75n9pgq7c1zu45tdvvk52uttvex8ixf4p5agu',
                returnCode: 1001260461,
                node: 'rb7dwsu6y4ln4auy1wy56q32sti04q62gvyxkrpfrsjjdu31v0o68u627tvrkl32v1xb7nbvl55pkee0ukjuh1nylz708k0uofm55n0kvyfr0k9jmhiq87e74zh7eu5yuyzodx6c1yrgugt5ox24tgh3outjkhyy',
                user: 'kpq7kblzgsfhy4c6lutfyt1kreta92xhkd1mc0nv6kozamhn317dx2ksxrzn6zj0i5s5ytu09d6g1z2k4cf39l2xn3twfb44gs6umwh1utv69gaxnnuv5lgxpen2pzi96ku4noa4o2kyb8blqi9l9478c5hnsinchlfd4jte6cai5xpq13b40yzxwm0gtsj21ujybj7p68niztdkz37d2zyv7jromtn825l6d5r2wt90hgoqt3clc9gv8ke2o3l',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'e72d76ab-361e-43b5-b0e9-11e045bbd835',
                tenantId: '93ba12a4-8601-47a7-8fc7-3da34e71a248',
                systemId: '4b0edacf-4b04-4fa8-8621-11e0ca532d69',
                systemName: 'g3g5d8mcqlpozqsnzrph',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 01:16:30',
                executionMonitoringStartAt: '2020-07-16 09:50:16',
                executionMonitoringEndAt: '2020-07-15 13:06:50',
                status: 'ERROR',
                name: 'vbi7fx7qxa463b1bnnlgyf0ndkpzm46mgd4whq47k77l0eeror2npgk9eu8ul2l8u1rmo6dd7k9blcm2ptc6ehiirwm2zetcut15q73akqxk7f47j7cxg0m26a77w0tnwl2lnssbiajirfjxkf8zgxgwfh1ka1c9xsiaxnpc9s5vrtfdwujeqxguc1iqfziz4uhhqcyu9bucxgwrzns6ahiuzqulgeoxw77qnziduobo7k2qv7kvhnd9z22fqjk',
                returnCode: 2165521543,
                node: '2xw0erse70i9wrc7l7kq95v1obr07ychogvgdhk14fyuibwyrjhcof50y3ygms62lg8g9on8fh2rj4399rar2z55mnmk3tsgxsbxp18idy9u4yc5hvueh4jbnkgc50kh0mh5l9dbpmcz2brs15vtn50d6jo9eea1',
                user: '3yw3im16uqpalh8yybuax4rd68d30do3vyewmjccos7smlsma62awr0npqdj4bnnx7j45snf43i86cf9e7atah7elpblhsdbj7y7787y8e5t0w14c3tcidea6ag1v1ag43zknse55pa2h35hcwovojgjnh14hospkemajs48c5a5uxyhhxv860dlh1xtb96pvb4xemwz616cdmmgcvmg0hl3hnqtdvn3td83bwm2f5xvlhk4bs7ct8gm6fttzny',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'e72d76ab-361e-43b5-b0e9-11e045bbd835',
                tenantId: '93ba12a4-8601-47a7-8fc7-3da34e71a248',
                systemId: '4b0edacf-4b04-4fa8-8621-11e0ca532d69',
                systemName: 'yb0in2d2edu9x6pos1nm',
                executionId: 'aa7c0a34-1f12-478f-bf35-f3c1f2e438f4',
                executionType: null,
                executionExecutedAt: '2020-07-15 19:34:55',
                executionMonitoringStartAt: '2020-07-16 10:20:25',
                executionMonitoringEndAt: '2020-07-16 02:53:49',
                status: 'COMPLETED',
                name: '1i94w9on8fx1p4uapyr3u4cfm7b9sw6q8p2ccliozx3xn90kv9x3n9ajhvmxoepcwkxt2gj0fl1mksm9vjz9ujrpns3ogp3j8zhh7qxoo78y5xui8ek2fv8aga0aviko7z6ztwrekdbz3b1xkrk5i0xcwktplyr94hislxhgv22f8c09y0ubxqf3c0tpmgecib6rzm8219jwc9ji8bjgy7ggwyezzoe41x9t1j60s9hm95ev2fuin0ucuw59q65',
                returnCode: 3200129519,
                node: '3hv568af1dew5v3d8rmqwarhed1pfcqy8civa0d50839wka2zqmjcvp81p9e7ztgb699wmabjguohuquh3y3xaqywaw3vow995188l8k1dna310x68zewm0mvwj608ct47rmybajlykq39phcqn1mtafea3w1asm',
                user: '8m9z90oxnns1tnt4q4dq5wp04foxczfl4abepchlufmy0ke2p49e1luyebmrf7g3tscroait57fugcyohwl3xkgpdihr4gj0tniezvs7foja3g6zzdzwjdmmu76ph1js826gu09b0tq8mfls8i4swbi3v8dor2d8lku7dsyqmow5twwucjghj1453zihjojy4ov6k3axk5nqesqupo6xabn0sl9ww9uc5emdclqebkdgxuh917ubrn98fyp77ix',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionType must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'e72d76ab-361e-43b5-b0e9-11e045bbd835',
                tenantId: '93ba12a4-8601-47a7-8fc7-3da34e71a248',
                systemId: '4b0edacf-4b04-4fa8-8621-11e0ca532d69',
                systemName: 's10xjsqn7va0coop9l73',
                executionId: 'aa7c0a34-1f12-478f-bf35-f3c1f2e438f4',
                
                executionExecutedAt: '2020-07-15 21:48:56',
                executionMonitoringStartAt: '2020-07-16 01:47:11',
                executionMonitoringEndAt: '2020-07-16 02:02:53',
                status: 'CANCELLED',
                name: 'd7rq1ieut2ozl863l9rjpdcgtve586j2hjpxerezxfo9vi1ake4lsimay9dogzngby9fzshh4jctwuw4ydfnmj7vvryx2k1hbiv1ue31d6lm8cq1vf4cvmx2w1o3ywil5u31k6fr71o59wcnb244fcqzh1foxozk4btjt0gyo3my0az2lzl9rz1r97vfmbt9hunkx046jp5tpgc62f5vbftnn43g33g90fd5zym1pwe5sxtiwe85h7s0xqxtobd',
                returnCode: 2217569822,
                node: 'xvlprux2z3e6kf5gio9z1ebo4nnu2arvkd1c7nf52ror1badudazlf431etvhk6fr6a537sreyjl8osjbwz98b2jhx7to8l6b82h8m8udg7lsqfwixyq2t31yf634bt8p9jtl8cuwl5gehqch7xiolqdgqjwsupa',
                user: 'hh7gt01ak443jpj5uo3bic9fodjiujbxops5b2h7bkxjldjkx0862dytij28mm5u3re6cq3ndkl1hacqpst09kse4avgwijpq4fftjp619b459qegsdt6vgo5zl64t2s4n9eyoo5wliywdic4z1qxdkejxwhpnzpvyxu1etezbn6xflwd5otvioqdiin6217eplr4sa4tnsnhetymwcc8c2hmqnlelgy45ztpgnqj2kz7rm76teezndk0tos0u2',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionType must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'e72d76ab-361e-43b5-b0e9-11e045bbd835',
                tenantId: '93ba12a4-8601-47a7-8fc7-3da34e71a248',
                systemId: '4b0edacf-4b04-4fa8-8621-11e0ca532d69',
                systemName: 'ya24eizedvewrku8whhb',
                executionId: 'aa7c0a34-1f12-478f-bf35-f3c1f2e438f4',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-16 02:06:15',
                executionMonitoringEndAt: '2020-07-15 14:55:53',
                status: 'COMPLETED',
                name: 'fz12te122kd7pnlmmfr3z4ykia7cwgimi875nlfpdatupvqww64c5g2vvnd421dnb64mbkwbjhpxaz1pz6gjkdl570nm0xjhta2wfisna692hv8acyi145fl4cs8jnzay3371fznlx60mh3aswvqyalzlqg0ospf7gza0swqpbiij2sq79qvkw8tk43l8ejjyizkvc9ywno53bdgg89abidp5ilszaqa3dscw7r5zob1e1du36ohem7193pc2aa',
                returnCode: 2479926199,
                node: 'hkc0duxohkqj7gsjsougouy7tm093putb0dh4wv1wm9n2lyuos9p54k5s4v6japm5fr620a2vz7s0e7y6ee3z3ct54jtq8nl4szomcf0k551s8kv92gvo6p4v3vhcny2wjw57w3fsx0v9sg1wvyhxcnrbv3s920l',
                user: 'j52a42t6uibrc2ikzfyjfjzemoiy88kzw7cngxapocd0i9p8mvr5p74mwqon7xp08zcsxxfz1a6l44zb4190sabv6ia8t94weiwwumpxws75l0x67jv6ty5gya2b9pufo7g4qzoqvpa75unzx7v59v45bhya0bczjs2k072gbynl0av13rcgt4byy4m2xpwbctq0t15wsfboq21iqd0aiiljmcrqqo33v3b5o3zr7lhkc6o8jtkzfk9fzi217zi',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionExecutedAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'e72d76ab-361e-43b5-b0e9-11e045bbd835',
                tenantId: '93ba12a4-8601-47a7-8fc7-3da34e71a248',
                systemId: '4b0edacf-4b04-4fa8-8621-11e0ca532d69',
                systemName: 'bfy860y6d3f7uzd3pozk',
                executionId: 'aa7c0a34-1f12-478f-bf35-f3c1f2e438f4',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-15 17:49:45',
                executionMonitoringEndAt: '2020-07-15 14:55:51',
                status: 'COMPLETED',
                name: 'lciajelu3y0yq3choib684j4efxllw7f6fm8mlj325uh5l81jzdmudy6mwuos2wc2wtbw7wjhcm4b80su3yytjc8i37dpmbfjli4u5mzc2iuwa7ymp7arswv95r8ksyzyson9k6prgjnemq6lxi6s1cmvvdbrm231s10sxra27hawipwojigruz82d7xokceanpm5vs9rxazttyfrlczpm4qz04acs7m0we7y6dbvi6acah5lr1wdm8i71l2veh',
                returnCode: 8914313229,
                node: 'ontyf94he204fzloge6apvwjw8ip2q7gy6xap0w7pd2tjq9sxom5uy2i6k1lag4sa2jlvckhgmenlxp71ocq3fgaa1c9b8yf9t1fj9snq0ip4p026l6l1g42cuvewdmhff19ap4gr4bof4ysngixh7at7qpm3e0i',
                user: '0r6pxxqog7h8y6im6fadpp7eb72w5lmzjz64gawcau3la478lf4nh0on4618bjjneoyy3sba8dixkpqcr61e46map9cvegfduc19noh357cyse3sonygl7d90umqnzspvtgmte2r2xab4jzt0cgew4jqi6fb68j69obhrltqb9avmj6kp9k9okpwrjvwe2q4n2zthwl2uw9pnvhs2d58nm3bnzk44fqmd0i0bksu18a5nwzuec63h05js3pgk0b',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'e72d76ab-361e-43b5-b0e9-11e045bbd835',
                tenantId: '93ba12a4-8601-47a7-8fc7-3da34e71a248',
                systemId: '4b0edacf-4b04-4fa8-8621-11e0ca532d69',
                systemName: 'fyk4lw4j7v6nrl42e76v',
                executionId: 'aa7c0a34-1f12-478f-bf35-f3c1f2e438f4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 17:12:03',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-15 22:58:17',
                status: 'ERROR',
                name: 'ykk5kyruxbtlnwr7li3o92f81cyqfkplyqw4g4c0umot8un30xvmwqomm6alfz9xfriiqgs6w7rv2lw25wjefk6qn0qp7ecl4add9nn98kw8ve6wmvveiy7wjk8s5jo3ec17chguzmdtkmod0lmbdmbkgexp1qyhgwwn8sgdlm8n77tabqut3mpqxpslsma6kg8mszmr6ctqe3p927abfz3kynb78hqyi2iumvlh4kirgn7naum8e1vwbjre6wb',
                returnCode: 6857041775,
                node: '6r6vsubdpmv8p45q0yec5gakcwrk2nh7rswsa4scgy4mwyqd436z7a5hx3lam1th6jcv9c7e2rrlk2oent6t75zzldwgijzm5rqojdqasuy1rwhk8tbxzqolxt0m5v4wyrz1dkkuzz9dso8qz8c3qnqc2tpun7lx',
                user: '7p2kcbyfd7nf7cvuv6rihbeyko9c76cm3qrvavyth447oilotzwymgrvr1uibhxmkzals8r7bnp4lr77po6s8o59y1ndygvi0y0bnb5hqpb36znofwqekfsgyfkjlqj272uff8m5tqoroymidkcddpmwr1gqd8ry7lp2wwevc95q4zmkz3ixc7v5o2etyvjmauvpjorqhofan4g7mww7fmstnh5tkp23402jmgomuc69lyx6cqu0cb99mua06yk',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'e72d76ab-361e-43b5-b0e9-11e045bbd835',
                tenantId: '93ba12a4-8601-47a7-8fc7-3da34e71a248',
                systemId: '4b0edacf-4b04-4fa8-8621-11e0ca532d69',
                systemName: 'jfv76bzdg6kfbafoed1z',
                executionId: 'aa7c0a34-1f12-478f-bf35-f3c1f2e438f4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 06:37:44',
                
                executionMonitoringEndAt: '2020-07-16 12:30:05',
                status: 'COMPLETED',
                name: 'cj5btrala9dr77ccerglwzrw4tqrxvgwd9lrd98s5hqhji3ryskfwtcxlzflgz9wtwmezwkmx0acqgvag8guqb1luqpnm4e8v77fnt7e9nl3lpb7royt3s12fa0o0vrgkhq454zexpldx6vlfpqlw96xj59mijkwovwrzg9l5w99sb37snnfvoal37wn5sjfni2gahtcyskxzjqfwht02j8vmd2i6sdody42zkm180g14m6pjpsakubjiij7cho',
                returnCode: 3383419327,
                node: 'yzvvu91c8p3ks46id3ww763cibkia9filfrbvmwuyowqan2jx057o2ydo6yt2ufz4y98k4cnlbu7os57qth7ld7jexfd91wfxsp2gpzj9oxdgfxb36zvn8iczl8qcyj8ngj7f08wdm0rgzt9bk9xi7osm5lcxd8v',
                user: 'loi582ucdv1gp2k779e2ow84ugm08hhg9g3n7rsmu4nw2lywk1g1cqi8r3ladxrswxz2uirj32nhlag9n4o9bl3x8vi5ybaq3m9y5bdcsqt8dleog80vz5guzx7c06agltv4x4lsmb3g0hu1yjob8bci6d5ga0zgwr30j9p1pvn53yypkzkior1lhd48lzd2a12q1evaasbelh6jon3yr58tgi4hel6kxf8m40bo5ijesbuw4ac1ugdaqwr5lhe',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'e72d76ab-361e-43b5-b0e9-11e045bbd835',
                tenantId: '93ba12a4-8601-47a7-8fc7-3da34e71a248',
                systemId: '4b0edacf-4b04-4fa8-8621-11e0ca532d69',
                systemName: 'opf8fuax6xtpidrkm516',
                executionId: 'aa7c0a34-1f12-478f-bf35-f3c1f2e438f4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 16:36:15',
                executionMonitoringStartAt: '2020-07-16 05:11:38',
                executionMonitoringEndAt: null,
                status: 'ERROR',
                name: '7g0b6v88j6j6ia3567cxr7s18t6df9orz5dv014qbhkt4mmwnuq1ssq3xk5o0iwqjcfrmvzpc4tjgng01w7tpuc2sc87gim6sffpeota97b664vqamek5g5lh7lx7lv2f3t3ke7b52oyvsvs1ryzgc3qkzvvxwfwip6rruw78s5srvo6axzsw1nx7kx4i7mxs1dec8n2h19a6vrbumve6i0pi62cgxwty8cwsqbf5v0wy5efkkwqb7ihnjd7cz2',
                returnCode: 6754716337,
                node: 'c6ef7h66wj628mwmkw9qt0efkihacr0d93mdukj6rm1hjvdylidargqb648vi4cpycooq3quxsrzvkiujarsrjhkyr1weg7pvpdzpidp0vpdao9o08ogoi1ee3395uksbmxd887i2qoqnluj5fij4y5ulmba4dwb',
                user: 'gk7nm0clmmfgyr1po58yjan7ng18me2dh0sl3wyq5e30hgqovjg1bfz4pxz4emv189amoan15cpayhsn07dpktpe2sipzy0za9jbb578nvo99fczdmek0uc6wsunx19kn9oii674xzcsvldnzpv1hvsrxgsb6h57lm9txn0guui7rnb7k381aihj12u4ewy7tmqieujud3hn4aahoq51ryptw5x8wh4tv3qpijk64aesmumpbnci1mkk91x5z2m',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'e72d76ab-361e-43b5-b0e9-11e045bbd835',
                tenantId: '93ba12a4-8601-47a7-8fc7-3da34e71a248',
                systemId: '4b0edacf-4b04-4fa8-8621-11e0ca532d69',
                systemName: '4khk67fedcgys16y1ede',
                executionId: 'aa7c0a34-1f12-478f-bf35-f3c1f2e438f4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 16:32:18',
                executionMonitoringStartAt: '2020-07-16 06:20:51',
                
                status: 'CANCELLED',
                name: 'mphh63ee208kawqry9w536uay7bxop0y85xxhkvj5p01dn8ta7ozw48v2dg9tocpf5fqq6e2v68v0q17xyk8iblhby03g5vrwoqiog3qf0zo5qgtv8d9z619k9ph51ad77ru9a3nl30inwo0qivtqeu7jb7m5f34hj0f0ylqczv6f9fgbg29c92yg2tzaz1x98vfcsrd0q90bypj595clreq4yulixb5xrq8n6einuvklux5w7mi994x34a972w',
                returnCode: 2018954913,
                node: 'h2vso6rl3kn32mglqbtgnej993k7k0xpoxdl07wyahardmpsk3akxgq7fycll3ooomk4rhwan5iumy7iltq7hrcqptfp8bxdh5xhjqh6rm2lfw0857yu3it13h33go4ikzjf6g0xjs3yjlne5yhdwcn2dz3dvnjw',
                user: 'y6zlwx0yobgrzfq4zza8ogr9cez488otvnfve0lft3ordafnxr4054lomo9sugwlahrxsc011uibqs9fvi864lgt46qloeinyipno614gczie18sf29ut8jv2xjxgc8optfzaiqkczfasz1sxi2y8wyxw5bq4r4m6j7rgwo95qhdfcyx9hs21o2u6yxy8vvcu5pug5me53ugbkmavrfuh1zd603thou24xyu9ufjgzp1kgna2mpkpfotqshuh47',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailStatus property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'e72d76ab-361e-43b5-b0e9-11e045bbd835',
                tenantId: '93ba12a4-8601-47a7-8fc7-3da34e71a248',
                systemId: '4b0edacf-4b04-4fa8-8621-11e0ca532d69',
                systemName: 't2j32i5vndxrifad3qdt',
                executionId: 'aa7c0a34-1f12-478f-bf35-f3c1f2e438f4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 23:23:51',
                executionMonitoringStartAt: '2020-07-15 21:29:40',
                executionMonitoringEndAt: '2020-07-15 20:00:07',
                status: null,
                name: '77bpncjlf2wuh6xzejkcaayt6uvxoq23abfjqllvbkxga4t9ulom1gauc1ypd9918ssjc3xeobl5i3dcyqxabcd0hhi2td7gkzxl98d9iojiqnw4odlst5l9fc4qpr9lb8wgpn9atkitirja8ow4c928ygu1epffwa16y16k8zsfwdkbh8w49fmj7vtnq6gizntbgp4zv1fzka2yf8y4amxvy1bzn786mes0jc09pg5qw0hcpbusvtuod6pqrvi',
                returnCode: 5964821319,
                node: 'jj7z8pojv4zmuy79jr7dey7dnqd4qagnk5g4ue0e3f09zt64ay6effvzgttmmzww2pb6ta0ojlf2ff1c1ln7lk4vaj39ar7kfby8dg6iurntzuiy2474e1ytb6y2vs8k5u9ylkincgw9f1l4hxbgtzpc0wc2poc6',
                user: 'p58ib77fwc23vnzzo06u75c1hj948nppnr1gvs4mlfd9qfx3z11gbtxgp51ku8lvfl3prgdyr1rfs7zdl8vi2x25xgn288r026ex3f4iyxqqdo6aiqf08cq8s9qhl4ikk9i8t9vlbedynfzqyq93ihnhmoga54rgech29gx06y826uf7f969lervjijzmf93s9j131ljyxjn1ckyczxorm4umngr73rlgo8b9ggpj8g1tchen5k2mbdwn8vxcha',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailStatus must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailStatus property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'e72d76ab-361e-43b5-b0e9-11e045bbd835',
                tenantId: '93ba12a4-8601-47a7-8fc7-3da34e71a248',
                systemId: '4b0edacf-4b04-4fa8-8621-11e0ca532d69',
                systemName: 'msd9fg896hw2a4di4ifs',
                executionId: 'aa7c0a34-1f12-478f-bf35-f3c1f2e438f4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 02:29:44',
                executionMonitoringStartAt: '2020-07-16 00:44:39',
                executionMonitoringEndAt: '2020-07-16 04:20:09',
                
                name: 'wxkj16tdebk4om37vggdn3h95swfwztsi5xfsplwybutddc3fbh3rl3esep4cgp75io5wy9evne2xgogvt7fe7lg93d99t9hyku75icjnugbtr5jcn87or9qydm6p9pzdyfc824jfzl8pnmjpp0ninktwtwo0hkr5ndeiv8lrxy0yrk7wr5fku10utd1pdk5wgk5c4p0tdcjcg8pmf9r59qu7csxbeqro5ibprgd07lx5cmu96t0ra13vyoy88l',
                returnCode: 1586637928,
                node: 'vp34m7osgaq2lfzl1zjqwhw65at5fx1v3uxkdfcb1wnijj090l34sfp6y9uj6uabghj252bxd4rom0h2p7hdhatre6jdjhbyzuwt81b6x9kheam379pb2tq5o1y4k0zgi71tch8dbfc7x9nj9hgih8glp3l879v6',
                user: 'evl6eb7hqejllmfapsvirtaxam3648q6osqw7pnlfqt12nteauhhjxgp7ghr36bhydehq0ew7c0e58hdbd5j27fmczl6s07dvsczg1hlidk73kv55ulw4az2n13mivbmiz4qrvyuf3dcu4jp1gvl0z9opjpb7q70y04p8kpj6hx2y18x7fhpryjee2t2tegbj6bx2ycx6dq7i21p77fzkhupt68twrimuf9eizs7e4z3ndc0ijs5onrdnfswjjy',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailStatus must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '33n4oc8wgrpbnz3257v6upaywdfbxua59v7jt',
                tenantId: '93ba12a4-8601-47a7-8fc7-3da34e71a248',
                systemId: '4b0edacf-4b04-4fa8-8621-11e0ca532d69',
                systemName: 't5mbbphmdtpg27214h4m',
                executionId: 'aa7c0a34-1f12-478f-bf35-f3c1f2e438f4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 00:38:10',
                executionMonitoringStartAt: '2020-07-16 11:12:15',
                executionMonitoringEndAt: '2020-07-15 15:06:11',
                status: 'COMPLETED',
                name: '3sj3lgjbjat1sxp6lfxk9o6qqdxe8db4bnqdcjsx8apcncmt0min8dzdrhimzi1ma57tmkkss0ocl4fvtr27nyvpdpwkfrma2sxqu6g8yfg6jglys811nh5hhk68pki7onkku4lo6u0qp5n3rcnrzinjthy90igcqtjdh7yttx97oj0270z477qg7dj2e6cjcxt74ss81nak0ayr0ns2h53krai7i6axysgi8fqy1cuh54kasxa17wjojfp71ox',
                returnCode: 6008221323,
                node: '5x9pken4ccio2wwlyrt0d26810lyx5bzuo8idkh291c5sfqvcjx4pg13q4i8t3kawa7m5wjm9twr4sppcovis908hw4duboqofbq3cm295a47kakkcoghoyqy5wt14z2n6v9vqkrbjhuxclvsylk3p2gc096cxyj',
                user: 'zof5vwndwe6186nqmd4y6fo7r9mby0wqclmnnnaqcjc0t9uq7u7ii8zoqe2u841wc5fuh96ekmz83827jgz7s6op5h0r57gqryzwhjtr2qbdki0bm19ijz4qnutazaimo76xx5axqfmv12geqhtfeso068tji92unnhhbup65cxvd38fgej53hj9wqv6znk50a75jy8eocxc4chq7i1ewgfgfgo7u9abflgh0vpdfx3v2gf7yirj2n9mufkaafj',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'e72d76ab-361e-43b5-b0e9-11e045bbd835',
                tenantId: '5kz22kbsw9eznanehq0bh2orxy8w8kf4x8qb7',
                systemId: '4b0edacf-4b04-4fa8-8621-11e0ca532d69',
                systemName: 'q5fgqz0d3q69gqg6qf7u',
                executionId: 'aa7c0a34-1f12-478f-bf35-f3c1f2e438f4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 16:41:32',
                executionMonitoringStartAt: '2020-07-15 22:48:23',
                executionMonitoringEndAt: '2020-07-16 06:59:43',
                status: 'CANCELLED',
                name: 'p21rccbs3z9667e9hvxu52q3abrykjdb9urkuy82c7q9gmf3mpku4m82364e4osao5m121j9yuohza3p9y5zchxafpnym7vr7kj05yprxdqw8ihjk69r89uuznhktjt025z2bl98tg9urx70x7e4qh4v80w3b7x88rw471xfcqozf82ul6xzod1jxrjn40g93h5dnag1tw3z5dczcsxuhgd2bcm83ipbswi2ebhictjdnyp2us7oe4vgynkgj6u',
                returnCode: 2953566349,
                node: '23yjyy4rb4k0paj3e9sto8hdswopm32uveto69pqq9h8048kxdd75xo2vws9yrs97zbri0tcarm3bjkubsltiny24qt7xe5f6en0umh0k4vz3l44849lqa0va41oi4zm367m54o6wxwltv4vodftprplfrhse0qx',
                user: 'nypih7q08by8z1bvn6ad49wa0toujtl257dir568onte9eswqgs5trvj4vwn6059uebp52ki664ppvqq01adkaklrlb640lq2r8fhm1rb9zz1u9hkzr7bsfxis6y84wux009tr6kc0ljx68zp3w585ios0txcizvzz2tou2rvzed951io821pj8w22x8tuqxxbqke8n48aion61is4c6qg7aaktbiyad3u5t5ehzxub03yci4vjfsrfaurznuoe',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailTenantId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'e72d76ab-361e-43b5-b0e9-11e045bbd835',
                tenantId: '93ba12a4-8601-47a7-8fc7-3da34e71a248',
                systemId: '905g5sxilddkpp4v0wf9hoclk3furq2zynx0v',
                systemName: 'vbqi0dxioe64uq6i8gda',
                executionId: 'aa7c0a34-1f12-478f-bf35-f3c1f2e438f4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 20:13:06',
                executionMonitoringStartAt: '2020-07-16 03:23:17',
                executionMonitoringEndAt: '2020-07-16 07:15:07',
                status: 'ERROR',
                name: '7vojqp67jj8dst0wjziyu2xkqnf54vtm7a6v66ggu4t4uac7y1o6t5yauqsflhuzoxli3ck29ar1zcldpsw0sq5n90kjnyl6o8dtbsao0gzsggx4ii1drm1dlv4i5b2bfxzugf50kw7yjs461shkz8yi5yh25hfvirxzb7jvhth0nt3d6fl3m33xvo0czk9edv4hlo78nupdsvbvav3iejbwjlufoqi7viy82r9fq5bup0akd22c0zf89r28g94',
                returnCode: 7336250680,
                node: 'iuhuusefgtkwzn9x5mggwiia48p0imfebbf16sgpyqeaa0nv2da6tmrqsn9z336ce8ru5piecwavf7ix00ryzklbi0igjn7pzt7hbh3qgot0bx6zfb6ofwn0fxp4fhqdbas81m4dvnf8qxr9earfck87qqjtahji',
                user: 'yek2vxfbx017kpcud7np3c8q6mp58ddyjjrygbvhindysuogmz4849zrxiqkns4gocwrdo5ipomqfdiv8gzq5msuu2gff484c3e3a1ky264s3cfkp1sxbx8g7gvi3alorvyc629ia8as8blhvfqprnq1gpm3iphd5syi4l4420dv5js21dr2a8t3yar9iz29479jw12v89y4inu4vzccv7fl4g56uecxtzkeijo82e5zhc778um4sk42q2hnkck',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'e72d76ab-361e-43b5-b0e9-11e045bbd835',
                tenantId: '93ba12a4-8601-47a7-8fc7-3da34e71a248',
                systemId: '4b0edacf-4b04-4fa8-8621-11e0ca532d69',
                systemName: 'r84dseh91jedlsiwdt1n',
                executionId: '3vdjbl7mb9yoal1r824hfc4gxi3ui96gx9c0x',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 17:17:57',
                executionMonitoringStartAt: '2020-07-16 03:48:36',
                executionMonitoringEndAt: '2020-07-16 07:03:54',
                status: 'ERROR',
                name: 'm0778cgn4l7ktyoz8kk3kv85wdaipn1dlbl59axguablafmysmjxn0c8lyk4l4rakwt14w0v37zogrjqvc8qeijkpsu5lakjkiyo2yj1b9a9j32wlhk7c1lh57pd23kcsd89dqm8cvknffvwkezlh36m20054v3fli3n9ewmp7ffv21zonh6a6tfi68flviji0rrhkyt0dajoctdzpbmkl5e4lt6z3r1yc2vzv1jxvlcqnaqt6uweyts96k6t8l',
                returnCode: 5944165031,
                node: '4353vvoqdslgt5f0m6o3qc6ytnb4v480gu4xklhpkekqbl4jotgjnmbmyz0pp5441auj84wtu12vol9c0awjpeouws4pe9xxrsfzzr0d8iauco4pzmqkq6kdcvft1orduwhxcxzfhfvkcs9ndvx7noofc02jec1a',
                user: 'rbvb9vvobcp6ey9z79ze9cnhxiksdbvb2qo1ypvko1uyvqf5x77oz9tnlgw30s7nzhsiq1ayn5npu21mmlfycx3o0qvcprkpyg3pkfj1v4kxt31ycrspge50uifbc17ykck419txjhtzxiz2u12f06gmdt1rgunivedwvp31j0jwwhhjbi5ni406kg7c7mzv3rwcdzzkuecpnu9ms5tv4iwyfb9i9pfn4wuaht4ytsbwx9lijmdjk90nlkwh4z7',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionId is not allowed, must be a length of 36');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'e72d76ab-361e-43b5-b0e9-11e045bbd835',
                tenantId: '93ba12a4-8601-47a7-8fc7-3da34e71a248',
                systemId: '4b0edacf-4b04-4fa8-8621-11e0ca532d69',
                systemName: 'y6wztnstbxdpg0b9uaqmz',
                executionId: 'aa7c0a34-1f12-478f-bf35-f3c1f2e438f4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 22:02:18',
                executionMonitoringStartAt: '2020-07-16 02:38:19',
                executionMonitoringEndAt: '2020-07-15 13:47:12',
                status: 'COMPLETED',
                name: 'q2ecztyx3maxhrxxcco1535wawpac55asemvyulqigusksiyb61dvt7k9fq4vpiv40ajf6cswrlp63fzwen4m3n2suj5ll54au1i9aiszhv5ay7qa5cscjo8n1vb1htwlu8tgvz7aua42msto4tivgnoc086m6pwhvgdee6aprnrfpu87w9rikhs6z2rn8u9jt06eq4mrn5vup9w9wwcu56kknlokzddhsok0c0p71k5ixcl9idg6lvmrk72i6k',
                returnCode: 8292944968,
                node: 's0up2ie5a6wh4ajt9w74ni6rai1a8n8b11rhzcj7vto0ko5yoxeojcrjy1aucih4zhwa9iq8td01retequ8udv08um8mo8mya4xdiebygekbo4fmoe9z73btlz69mcc8utjx1owcaw6bkra9dtnsf0x7d8tjuxvn',
                user: '6mjax8uk5f3z5jkrlzlbf703oi9v1tut5yd1vrnacagila8h1222whn9e74w1q253kz7fiz8co30bpnojy1moquvjk4859e2anzgjm254m0io8trmgogpgrs8otz21363o7pj09dnvx8q18spg0ubl9wn7cmaigzpt1b7a0m18zifrd9v63y1mqrwk9km3o720kauqg7mmmua95f6ria1prui3y5x289t48oivhhjthnd70mlhzo2seue7k536f',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemName is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'e72d76ab-361e-43b5-b0e9-11e045bbd835',
                tenantId: '93ba12a4-8601-47a7-8fc7-3da34e71a248',
                systemId: '4b0edacf-4b04-4fa8-8621-11e0ca532d69',
                systemName: '30vwaxq7pia94qnmivqu',
                executionId: 'aa7c0a34-1f12-478f-bf35-f3c1f2e438f4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 00:29:44',
                executionMonitoringStartAt: '2020-07-16 01:54:16',
                executionMonitoringEndAt: '2020-07-15 13:50:49',
                status: 'COMPLETED',
                name: '8733m9nsg4em62ey8wqyalviljg6xrnmiobhdbmp72v4cyeuu2dga2ufxc0fy3nue449qxkugxzayxg4cppjtry4cznyho57xbadbt76y52y6pcxy403vu9suvk1wdkq7lpqoouk85pv8aqnuqer90nv9pfrhhbwda4u2eluphkrd5goi1ufr35ncohw78kn4f6re541d1hjwvfglsg66lf4h8t8iqdaomsf8pc7ernlihe1ic0m8zxqri7lcqrp',
                returnCode: 1406776043,
                node: 'p6dzc4tjl3kv4ueomal34c5wm31fxr56st07v05d49moxmif52ycity4hb2h1psa6csfkv24gu707obgwykebcr2q5x5s5omryon2kplbvfmnbnnug758os1dqqqpzy3vyp39dfwuh26cq82dopkssgzhwro9uh1',
                user: 'j7u1zdvgul6fzhxx5o2kcg76rxn7ovmk6tyhe6nol0zhejd20yiakk0dqrfa9s94dbmmximjkc0yld3rwrw2w35js9v06wykubhnexzt7dgxka0b2mlk2wk3j6osvj1flz4jhesptm0c5xlbdy48l1ye2wchi2q8nl8bt30hq6gmanbc5en9skua3urfzpa91azii4vpqz9ksk51orrnmndqyrox93d3q5jviirrcs303yphe8utrdgozak5q2y',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailName is too large, has a maximum length of 255');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailReturnCode is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'e72d76ab-361e-43b5-b0e9-11e045bbd835',
                tenantId: '93ba12a4-8601-47a7-8fc7-3da34e71a248',
                systemId: '4b0edacf-4b04-4fa8-8621-11e0ca532d69',
                systemName: '3nl9xbtwb8ppygwb9l4g',
                executionId: 'aa7c0a34-1f12-478f-bf35-f3c1f2e438f4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 08:30:22',
                executionMonitoringStartAt: '2020-07-16 07:42:46',
                executionMonitoringEndAt: '2020-07-16 00:37:10',
                status: 'ERROR',
                name: 'z13gc3ae7cqckzey6cy9381yzjlsiygk4nwn9qpj4pkz2myrjqrlrbamkq0iucv4z0ov4w76pe47r900np4ct4edc46vztlxqgbuclc4cwbz635ige7sfm5109w0oczw6axxuy4s47u4r9acthqgegvlothctsg523ij3nmpehfr1h99juqcn2rz8z2ioax1jmr1r4jjt30ntmx89nbwyk8ydjfozde2f3ch5k5mtbzaqecw9vp7gefqi7qfp2r',
                returnCode: 37012820195,
                node: 'n2r0u9766i9qt5vg8llleoshpdfd277tjwtfsndixjcmmaqq1putparytohxs587bh7iqi2pz9d02pr3fy4fj9087uvfjqd672sp9qq2smmbo96fslz541amc5buz1e3xt804pfyrwyac0u9hzau8c4i5sldszla',
                user: 'tuefo57ic2t0xh4lf0xig0jktqdo02esk9xzmk20n8hfogwb6f36pbggizr5hd4axayd46oqm9ielppkfii9e12wxqq7ter60vqcfe4hn3s6f55m18kpsd8wirhqkdwzq74ntyjtdlqwpl1071wrvcx524qkdoo54en0j3g9kqj09kvurks2b0v4z4dfsk3qgy3r54ehm9gsc5sqf9gvwq1r0qg7iubnegzsatcsj3gyl4qqk45ss4xsmn6lat4',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailReturnCode is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailNode is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'e72d76ab-361e-43b5-b0e9-11e045bbd835',
                tenantId: '93ba12a4-8601-47a7-8fc7-3da34e71a248',
                systemId: '4b0edacf-4b04-4fa8-8621-11e0ca532d69',
                systemName: 'p3wktszvlori07rk4io1',
                executionId: 'aa7c0a34-1f12-478f-bf35-f3c1f2e438f4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 07:14:19',
                executionMonitoringStartAt: '2020-07-16 06:53:17',
                executionMonitoringEndAt: '2020-07-16 03:57:05',
                status: 'COMPLETED',
                name: 'yxb6e6m54wovtahoptm23zuigpm7ou1m7cbkt6de1vvuh011pu7tqq4z0vz0tzvzg5q61eap7prvv76iiawcsect6oblxolu2px647gkhqh8ifxjubsw53nsja5xe4ps5ikgm4axat6fa4v1e94sa6pk4tz6cq9q75uju3ib46sw8ntq741h9zft6agmpedqn7d2w5snf2alzooeaazq80ze27es6mbgpzugu3f8v3j9et8ba4mfw9n2z1j2auv',
                returnCode: 5319956274,
                node: '19odrbjnf8u4jaful3ph1kipmxjcb0bml7jwp0sh8y00w4iqlk5pi6tntos4aaquqj12ydu688pqpts0f4w55ct8oktu6e2qvsi111vnvcp6zxfdpimml2d2clyy65hode8xevjri50lpk55ug3hxl8zu708gvgah',
                user: '8xzumaz3azwe40glcds5v9thj8kv3cfo68wgstxdkwy0z2xz7rchj1s3xs4mxzzwps3sd24f0356nfasle0awcxml1cu8lmdep0lxncr51nedt1e0ffz5kmhoxlkc8hhljbyw1e6j77ja26c7mebtsr24i105hymc6c7l5psdu25ksmlfgopc0i8focl76o8zspit7cp6hixmd4uzdx2zuvw2qfgzj95w0fttbg3zlj826aup1nugthanlzoz4h',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailNode is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailUser is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'e72d76ab-361e-43b5-b0e9-11e045bbd835',
                tenantId: '93ba12a4-8601-47a7-8fc7-3da34e71a248',
                systemId: '4b0edacf-4b04-4fa8-8621-11e0ca532d69',
                systemName: 'crfujdv4ecax0jgd42cx',
                executionId: 'aa7c0a34-1f12-478f-bf35-f3c1f2e438f4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 17:07:23',
                executionMonitoringStartAt: '2020-07-15 15:36:43',
                executionMonitoringEndAt: '2020-07-16 01:44:13',
                status: 'COMPLETED',
                name: 'zouvdxsgo5o5x8azit85zmggy954zhlda0zmvk8pufolx6omier2o39lpn3r7it3ouev658yai48epxntzywwks2mhz6f10750g9ys653dgf0hqe7kzwuizvzd3fq11q53wxn1bexe2bervudqzdhmnfb0xbsq113ya87imporb56kq2p5l7h58ipf98fopvixqnuw6inqvspzpb5zq4ad04wdtqtz3klrhr8o42hs9ymyhops6lqazlr6wvf90',
                returnCode: 4527695894,
                node: 'n6ckvspg8ou606srsbyr77kn7hecek2mkgp4fzehv2kjurizyfytngeoqcl3vijutnz46kbhcehd2u09odn4sc675fjouiur78keuscb82eixo5am6efxxqz4uchh5czzc540ga62wn574rs9ufp7r77mvcy78tj',
                user: '8gvf2gubxxk1vs96tpzsokkpbyde4k8nswml7mznhc8dhui8153fjyazany2jke1bdghmk9m1ofp6jjjy9ntcmtc34gjfxssbecjh5iic3qx840f1rugba4rzujlqsyicuzqrcoarbnbglijp3z5kbian2ko8aw93f8otgbni5453it174zk24vfrsy9ysmvwubo012621wf3ied0pcywh0tjyhuleb72p0z23tg0phmny2j7m2kmxpgpdm7zn15',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailUser is too large, has a maximum length of 255');
            });
    });
    

    

    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailReturnCode has to be a integer value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'e72d76ab-361e-43b5-b0e9-11e045bbd835',
                tenantId: '93ba12a4-8601-47a7-8fc7-3da34e71a248',
                systemId: '4b0edacf-4b04-4fa8-8621-11e0ca532d69',
                systemName: 'fwvnvx8ja2nbh437yfaj',
                executionId: 'aa7c0a34-1f12-478f-bf35-f3c1f2e438f4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 02:19:29',
                executionMonitoringStartAt: '2020-07-16 06:26:46',
                executionMonitoringEndAt: '2020-07-16 10:04:09',
                status: 'COMPLETED',
                name: 'tytg9oaorg7g6p4xbdwkygdbnj9r69sjbqfcxj45hrkf0kk8mvhl47l2mfzl93mlavxa42kowrarj2s8p6jewiplg8z2l7lz7cjjlnut5d8r2mgwklcevi00cq7l4cp2s7gylxxq6w9bffg5q6yps0qx6x423zd75lrunfn3d12a0a13bzr1xg3gy58cljjf925cbd1fvzpd9bd9yia7fswn71rpgu6vkdss248qfay5tjhi6rdwszk66gn022d',
                returnCode: 100.10,
                node: 'i8dybhf19fqxqfym6rj945cbkc7kiky966tj8cr2d57m2o3wjoh01t0pzcfvdvjuk1qdje0f2nf2nkya5764pmwiyhz6v7uftbf1t3z3n6scb5gs0n4g8emcmmh0wxd5fxsefyi8k69jgegr10dxqkztd95g5jyq',
                user: 'holulfpf320yix48wlycr96botuwjri1ksqi4gdpnnzilpy1zerx4k55r0ucw42655kxza6hqyssg2kd2oenungfnfyst8xa1qo93xvmdzw02y35ibk3r5d6z4x6fvjahu9ie7u23gqh9i650pfmmjlgff1sbel4lxex7gvgym8ex6kqlmjc26bdu1odbtydgepv30rf7pk1uiw9fq9vfhfs2iq2a28becin4jeitafr8djqs38fh6pqb9jsg90',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailReturnCode has to be a integer value');
            });
    });
    

    

    

    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'e72d76ab-361e-43b5-b0e9-11e045bbd835',
                tenantId: '93ba12a4-8601-47a7-8fc7-3da34e71a248',
                systemId: '4b0edacf-4b04-4fa8-8621-11e0ca532d69',
                systemName: 'n8uk0ahw765t9ej5wm3c',
                executionId: 'aa7c0a34-1f12-478f-bf35-f3c1f2e438f4',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-16 09:59:09',
                executionMonitoringStartAt: '2020-07-16 12:51:05',
                executionMonitoringEndAt: '2020-07-16 04:29:58',
                status: 'ERROR',
                name: 'pzaur2qr0du6ax8k176x6rwi7lorca1t0v2kcc2xt9fcssct45ngtbbc8hh8c3q82dniypbnfoukdwxjke46pquimly3f3nah0rqnfpxnrnq6mechjf1da4jq9rmw9b7c4tj1b2rkxi4bmtdxrlqyxbuyydylo1r3y8kzf08kii63oj6344lpvwtez44ws5rb6t3jmhv2lhbsspsi7ml10j3ja1e6nmpjja28cj1t4m0ew0ajtiml7eo3iohkui',
                returnCode: 6315764188,
                node: '367mfbocdg83c03ibejaunsfgmgu4l4fvir96liqsoujfwkzaipxbw21hvw4nevrdwmtpbhvyhuftiyc32n6xicnx8jcq1randm5ecjmhou7wql3czjg0iomb3rv1bqwe6es9akbw7mv506oolkug04ihc9whj4y',
                user: 'sbgxnnk2bi23bs76fvnxlo62xrc7ut4wivdqag2c7rc295bztqe5tlmbfhg559kmew1ss8g5wjv1lqqcdwr8xkkban0ye4gxmlhzifwxd5k5uvnxx0utv7kpdb9h6898mc1yscitot6833o1rp3pmrahzxd23xakl5bpiyhewrkqmsv4npsj0e56843t1703kalyiu0c1o01a4pw32fk57zmubmkp98b87dgjsla0f31cvdud5nhujfr804gjz0',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailStatus has to be a enum option of CANCELLED, COMPLETED, ERROR`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'e72d76ab-361e-43b5-b0e9-11e045bbd835',
                tenantId: '93ba12a4-8601-47a7-8fc7-3da34e71a248',
                systemId: '4b0edacf-4b04-4fa8-8621-11e0ca532d69',
                systemName: 'bfvjsm1enpzgn26hzq6e',
                executionId: 'aa7c0a34-1f12-478f-bf35-f3c1f2e438f4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 12:15:46',
                executionMonitoringStartAt: '2020-07-15 20:29:10',
                executionMonitoringEndAt: '2020-07-16 04:34:28',
                status: 'XXXX',
                name: '22tqwid75wgksgiebbk913vy2chybtpgjoyjhkey7y76y6vhdr985r89ss5zpq5f7dg1new5pqczalbuugcn4hj8jdlxv99k0gto7nfiz26oxxzyyqr6x6smi9b7hjntzt21kz0slr4b47conwse3b2r7p4f9nk53pvkur14ysm0fvlcour45igifztly1xsttn7jpdemkl1fmtf7yvb15ttxiuefhszlzhdi91a6uvoixnffedt3j4t17k7p0n',
                returnCode: 1917802455,
                node: '53joxhxaouji7lafu032zslqoclbpxi457s6uec25n6pvunizuq6k51hn8008veaqvwwsbiavsuqvy76ogpw42d74532kq6ktn28q2xvvnod6lsz8q8ec4ujr69ciy3hhd6gim11fc1mlz3lz26lnm2dm7o5piqz',
                user: 'q20vvs83kwj6ncpza9y0nzolysfht5i4kncfg4u22jimxqsqswq1ajrp12h2l7s7f0g461pxg19rry10s1o1i6npm5cfjl0yb2jnvesiej0aeedui5i2esb74zz8tzqfr6d0bahng285rcqmf1byfl59bj63h7s9yl18pfqre0yvh0xab3eh1bpq01evy1zj3b4cc0ld6kzock7odo9pfp0fd3ml4d1b8tvxl23cjycvlhyz2fvrttimcntvlgg',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailStatus has to be any of this options: CANCELLED, COMPLETED, ERROR');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'e72d76ab-361e-43b5-b0e9-11e045bbd835',
                tenantId: '93ba12a4-8601-47a7-8fc7-3da34e71a248',
                systemId: '4b0edacf-4b04-4fa8-8621-11e0ca532d69',
                systemName: '5mnqbgwj7yb7255ytl9h',
                executionId: 'aa7c0a34-1f12-478f-bf35-f3c1f2e438f4',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-16 01:06:23',
                executionMonitoringEndAt: '2020-07-15 13:41:17',
                status: 'COMPLETED',
                name: '28d2g9y0wqzsiqr85ya9ohj1bjjyd60djy4kofviw0jvuyj4wip4kmqv05fitxm8agdel1vrg0h1eledtcpcflssteeddiigbyg77hdqh80q0r0urrv1nica8iuhna1n8j9odhd5yszqdjtgx9eca8cacen0g9uvecegirbihyktcrbtf0cboh500er2hp8lu5yrzqjqjav9gps2lcvpdslsb5cb2nwidolgyvyc7yxksbjulbrn4l6v2x7mnhb',
                returnCode: 5229958174,
                node: 'od1kec0tjpfryi8ugxpa8c7deo3mmnzdclw822n15on8gn9rsi80sjod7vwycpotswqew5g68v65q391b4iho953944w01naoccx2i6cvyji2pftyx4c9mdvnf4rzuhpsu9nq45zl3v914lufo5adxvlyx4o7wqr',
                user: '0j73ixhdsivjo7ognvcra15deuhn5kdr0qyp3v8rh5k6iy14ze903xsvzwtmzw9umknvm3ud4y6aw8675hb2vr92fekczw7yyj0wbp6e8a955fon1xpsurujo7ygfcresriwtjl6yjkqnubio24w75n39gnkr07lralh82nuliwbkmmt85qahrs3mldmavygj24qd586dg7kyffojbkm9jsjydlu39p2urgzt49ium3ycbu8rnjp20ar5803345',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'e72d76ab-361e-43b5-b0e9-11e045bbd835',
                tenantId: '93ba12a4-8601-47a7-8fc7-3da34e71a248',
                systemId: '4b0edacf-4b04-4fa8-8621-11e0ca532d69',
                systemName: 'tjp3ayfoml4jvo6t4bn6',
                executionId: 'aa7c0a34-1f12-478f-bf35-f3c1f2e438f4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 20:26:33',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-16 06:30:07',
                status: 'ERROR',
                name: 'hi157pm4y43whx98fb9zulfodk33lno0at8iu3ne7myik5l5etlvzemwxfutu8h9579o5pwcpasiy1vy2tc8g3wnslofsgheir7fjqw16uo37tlq7f3gg9jydebjush7flm85mgl8qg3m7t7v1d4dvivwlu0fqpylrcux2687aadz59v02qeolyyqtw9t9lyg1wi8pyyqcufr7lxnnqi9koayi1kvj5ao4khqxoqbzdkx6uczyyjzsadjryvdg0',
                returnCode: 4689648774,
                node: '8t3wd6i0jhh8yo5hmcenuz8an8pll40easrkt3ieivpmo8uatb8ve8k1485sodwtxc3nlv643ulm86g5fkmr6pwge113ye6ngl3st7g01dr9jsfm6dpn3eftclq7515grcjopfy2xdky3ahx4w19atwgslt78uxd',
                user: 'n1ywksvib55ifwdt0ud8tbb6sr9xhg5k7s496lx5lbyb8elen2q8t92p9mm67a3yi5xf4wdqzx93mxi9bkaxduf62nrj39ro1ov7urih8ddbyob8kyjy3galku1ht7awlh3mkjdflff13ki7y8hzh27rf18u7qtc07rpj8ifdjutc8q2mmj4u6t1png4vi1qgse1a6qudzcxqbc2kb68310thgudum85d5bpvk7tcdwrqp4tl9vgnyudopzw21m',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'e72d76ab-361e-43b5-b0e9-11e045bbd835',
                tenantId: '93ba12a4-8601-47a7-8fc7-3da34e71a248',
                systemId: '4b0edacf-4b04-4fa8-8621-11e0ca532d69',
                systemName: 'amd923dpxou6dbdhbaev',
                executionId: 'aa7c0a34-1f12-478f-bf35-f3c1f2e438f4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 01:23:34',
                executionMonitoringStartAt: '2020-07-15 17:18:33',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'CANCELLED',
                name: 'jxsnikwr0kmbpdegm1v9rckgopvg7b189m2zfcjyqoqgwih2zpffkfqikd9rhlue917uqgt581313umjxrxkfbgav3kjqe156565lz0fztgfme4z8o1fifksali4g7ac39rvu8o93uowd9ognf6u9cdvfblx59jhdugqwqcrod6muhxswx4ce35g9kh5y6fy78icstzh3c236n5joby5gk2auxwmvhduaa1ve16k1bccme63m22njadnunoslmd',
                returnCode: 5433660952,
                node: 'ytmi42ejbnsqcg1wol9h5ns5vhy4yssnzbgpdynti82q3oedvewinglmans9thzz4nt6fk5jdldnm4ofdf19g45396tzzbqdwffh6vy6e7xoek6lddcrq3rct2jj633uibtcb1r9t41e7mz21qrngz88afy7zzxe',
                user: 'r2o1l6pdf3zhtbs5fqq4mtfxprckjnzg67ema0bn2ebq0385bdnjse25tbgrsbwdhgkwc0w7mi0z4xe3zp2zuc1ll1ny5exybdn2d9gm1504jmxo5xywfb6db49xcypxbvh01abjujj357xk12ltzbdb7hhclvndj0ufoies3y5x2wikeid4t6ontiempjjka5mutd90rx55f5x8zn66ebsh3n9xtzwv4pp5ls7jjnwtjk488pluuwojgsj3rhg',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    

    it(`/REST:POST bplus-it-sappi/job-detail`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'e72d76ab-361e-43b5-b0e9-11e045bbd835',
                tenantId: '93ba12a4-8601-47a7-8fc7-3da34e71a248',
                systemId: '4b0edacf-4b04-4fa8-8621-11e0ca532d69',
                systemName: 'zrj2925hqapssd91ob57',
                executionId: 'aa7c0a34-1f12-478f-bf35-f3c1f2e438f4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 16:04:09',
                executionMonitoringStartAt: '2020-07-15 21:48:43',
                executionMonitoringEndAt: '2020-07-15 15:38:19',
                status: 'COMPLETED',
                name: 'pog8b03tltw5lgvkvzzbj8wppwvyefu3nyp7vkxwkm2j46ypy6540hz9r9o4huyflq84m1yagunuysfw9ayrjb0mfs9nq19psn9k64b016g948ptg6vf773w6uxq31sqv77jocz10r8hd5omza0gxommqaxadm8dmkzpefgthdk2s0elw3jbhnp7vsxvqkjgwi43y6dgekj65or013aoqmgbiws517kf3f781j4vwvt0ip7sy3jnwygw5zh3wky',
                returnCode: 6583412675,
                node: 'k0mm9l9qztbnwklhwqr389t0bbwn9r3xyvwssbsehsuerzwoiaiasdswvf6lexzb5pk6ufio4120hwzaasn8r8owi6ospql7ajsai7h256f97061piepv7l5xenampiwvph3gfodbuq9jmvxac39hgzqa8kzme43',
                user: 'iwpvdkzzlcaink9e3fbib5uq0uy0j9euq4e3mk0mjetfb2egb7qqiyxxe9vc0r13uxvd5zx3jywuzi9nxtcn24z5nrmt7ktw2q0yyjxvbsz92eeumn3p0xbc84g3tezkwedlh1v12g457fc7zswcouxwdnm6a3jndue24905vxt5bl0u6pqb8jx17ab9gcayo7jcbixqxwcqc1ohqztlbory6zajh6h6xiy19lhqzzacftd6xpovslhnnv6xdmo',
            })
            .expect(201);
    });

    it(`/REST:GET bplus-it-sappi/jobs-detail/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/jobs-detail/paginate')
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

    it(`/REST:GET bplus-it-sappi/job-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-detail')
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

    it(`/REST:GET bplus-it-sappi/job-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'e72d76ab-361e-43b5-b0e9-11e045bbd835'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'e72d76ab-361e-43b5-b0e9-11e045bbd835'));
    });

    it(`/REST:GET bplus-it-sappi/job-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-detail/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET bplus-it-sappi/job-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-detail/e72d76ab-361e-43b5-b0e9-11e045bbd835')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e72d76ab-361e-43b5-b0e9-11e045bbd835'));
    });

    it(`/REST:GET bplus-it-sappi/jobs-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/jobs-detail')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT bplus-it-sappi/job-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '088a58ea-c213-4047-8eb6-65f887af52bf',
                tenantId: 'c2d091a5-7e29-45e3-b3f3-49887d2f40aa',
                systemId: '2babab29-dcc1-4b66-b313-3fdff5fd3953',
                systemName: 'exfs9qm12vug7j9ssb8k',
                executionId: '513c01a9-c6a8-41a3-8d5b-0980b0ef6251',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 19:34:42',
                executionMonitoringStartAt: '2020-07-16 10:40:38',
                executionMonitoringEndAt: '2020-07-15 22:35:30',
                status: 'CANCELLED',
                name: '4yivq2vtx5c1xzdtcwwviqd1sdbe4vp4ou5l2yhb33b1x1qt4xipmzpsqfc3c7bazdbvwox3psoajefxye8y8zvtfputwrbmee80jg2pb13wiohfqr7mmagym2ncskq6wghlakbd4gzbn1iwp8j10ueps7fji5enx0lbtih286gdiszooj3dtdcqiatrl65pjwjlc6ghbg494qt3mo5mzq7spy4j2d7ow870dc015w8avp8wtu857xm5db77ylq',
                returnCode: 1496665888,
                node: 't070hsm8dmpzwe6wldjfkqphlizvvs3px7pcta6fshpi9bu6304wcglwa3ls2hrfjfm5fh5wrk0q0keg6gde2enic7mvf35fc51k9rmvbv45aeqh57pfd7ho9po0ikhec9lp0l1yyy3i9al9ebrfxq29fpuvdoot',
                user: '1727jz0ffph06rqvztnt7f6kdvz0ohgmz2ppxry4ztb439zl1djj1yz6vtjagjc2chv4u2qnuzemx6dermvs6eoyqr0s0zwncvej0g4o41kfm4zcrgt2gwh0a7vfwsktq9lzskmq2kh35mdh1ld2pap1iq7lrlv9dwa36wfkbf3kqqnvhkb379etyk64gusyunk7mogn7um1chw7idaz9chhak2won4pl1ntllvvgs46film19xuvn9fyqr5wvs',
            })
            .expect(404);
    });

    it(`/REST:PUT bplus-it-sappi/job-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: 'e72d76ab-361e-43b5-b0e9-11e045bbd835',
                tenantId: '93ba12a4-8601-47a7-8fc7-3da34e71a248',
                systemId: '4b0edacf-4b04-4fa8-8621-11e0ca532d69',
                systemName: '69j0p3vs08p5zqrl92jo',
                executionId: 'aa7c0a34-1f12-478f-bf35-f3c1f2e438f4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 00:26:25',
                executionMonitoringStartAt: '2020-07-15 14:08:26',
                executionMonitoringEndAt: '2020-07-15 16:34:25',
                status: 'CANCELLED',
                name: 'lcio619mxrjsi7sb7groxmvu2ajqr9hfgiq9v4k4uh65bqs3vy3ajn8w8rayab0zyk9n2ojkge8syvhrz0yarxy2hlfzb8sj003eoovdq3xvizdajcccmdatc4fhlr6nmgp3k8u3mia1jdzj5neyz506rgr301yucwbh7lagzdrtv9gj8dh3m9xljicpiti7vwbrixp3koq0gwdtkwdexp6qr22dsc189rfx4ido3v3yzg3no7qinyzc0e76jse',
                returnCode: 3821951487,
                node: '2a66vhispfiklrjykd65k569yp6d77gec3bhdwla2sbe9udk1sy0iifgsm1kn6rz9yniu0ds9ciei0a9uvmjpzuavl57ikb5wvdz96v3ujwv4hvtlr5o6ru06a7m4vhtxfcw6m8782mvswbg2p2c5edr1lsc14r9',
                user: 'etp8xhuhgnh23r0lff26xut22r17mxs04n3fdbcbjmtdi12t6y2j5g5ippp74ya3q8zw69v8ebq9ya3drsahabbzc3y8mp959pqr85gvr4gypnjxo95tupjq1ynacq0yv9s3yip8ab7pjiww6jp5f8hubkza2ko9gq9ufighqwtzh9ei2fmukmreyauixf18ptrmpmsq6tlitbbgl8ggkcdtkt5agfmsalhxlm5802032fybcno7b1ke3n8hnui',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e72d76ab-361e-43b5-b0e9-11e045bbd835'));
    });

    it(`/REST:DELETE bplus-it-sappi/job-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job-detail/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE bplus-it-sappi/job-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job-detail/e72d76ab-361e-43b5-b0e9-11e045bbd835')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL bplusItSappiCreateJobDetail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateJobDetailInput!)
                    {
                        bplusItSappiCreateJobDetail (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            name
                            returnCode
                            node
                            user
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

    it(`/GraphQL bplusItSappiCreateJobDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateJobDetailInput!)
                    {
                        bplusItSappiCreateJobDetail (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            name
                            returnCode
                            node
                            user
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '08898ab5-f42c-4ece-a75a-76bc2037ef07',
                        tenantId: '93ba12a4-8601-47a7-8fc7-3da34e71a248',
                        systemId: '4b0edacf-4b04-4fa8-8621-11e0ca532d69',
                        systemName: 'icovrtlbzlcaotte8x6b',
                        executionId: 'aa7c0a34-1f12-478f-bf35-f3c1f2e438f4',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-16 05:05:20',
                        executionMonitoringStartAt: '2020-07-16 05:02:20',
                        executionMonitoringEndAt: '2020-07-15 22:31:29',
                        status: 'CANCELLED',
                        name: 'sarjkcgrjgytr64oybjgb4ty5n4pd0k8uze0csnrvge0gsjy2favwr6gx8rxziaubbbvkp57ne1ijmkpfkbzpv04npeu2ckcm35i1jcyj5jubya9geur81smbvme089nhcovpx6gmook8ya8sh8mes8nftpamj3rs25sdnqd5iupo4h36rjf0nccnnkd6bzmyof83ej8id1tebwal7szjrkp99xet9i6q70uv9fq0p8r5f7rahbdjae2h0rwsgn',
                        returnCode: 9702386274,
                        node: 'mee8q7ncb7esoqeaq1u3197riuz4kwfxnelegmnrp6i7emt7ai9iot1c22jjcqsehh12x76itmeu4rb8ozh4um25y7l8qugrk96c8dono35557qsgld3je4cawalftga0entv13t3o1s7vxnt4jispohgh11qk0h',
                        user: 'l48tf7y5f465te1gtejrs1gnlm5zxpfo639avy8oc2qb0ragbj7j2jb14cj5lukkst1ihbxwl4jlykcet38wdsb3hmgofvpwjk60n6jiee9fr8y5ywfiybt0y0tc0vjklk7ts95qrrxbcpqkcrogy2c8uhvygz3kr4avdgfbuttu7cci61azlulo9zn1trupa4syj96uzxepv5tf6qb12nevt14vau4xvavgznxh2jau5hyzcfqr6xkr8xo1b86',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateJobDetail).toHaveProperty('id', '08898ab5-f42c-4ece-a75a-76bc2037ef07');
            });
    });

    it(`/GraphQL bplusItSappiPaginateJobsDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateJobsDetail (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateJobsDetail.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateJobsDetail.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateJobsDetail.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    it(`/GraphQL bplusItSappiFindJobDetail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindJobDetail (query:$query)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            name
                            returnCode
                            node
                            user
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

    it(`/GraphQL bplusItSappiFindJobDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindJobDetail (query:$query)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            name
                            returnCode
                            node
                            user
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
                            value   : 'e72d76ab-361e-43b5-b0e9-11e045bbd835'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobDetail.id).toStrictEqual('e72d76ab-361e-43b5-b0e9-11e045bbd835');
            });
    });

    it(`/GraphQL bplusItSappiFindJobDetailById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindJobDetailById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            name
                            returnCode
                            node
                            user
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

    it(`/GraphQL bplusItSappiFindJobDetailById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindJobDetailById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            name
                            returnCode
                            node
                            user
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'e72d76ab-361e-43b5-b0e9-11e045bbd835'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobDetailById.id).toStrictEqual('e72d76ab-361e-43b5-b0e9-11e045bbd835');
            });
    });

    it(`/GraphQL bplusItSappiGetJobsDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetJobsDetail (query:$query)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            name
                            returnCode
                            node
                            user
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetJobsDetail.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    it(`/GraphQL bplusItSappiUpdateJobDetail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateJobDetailInput!)
                    {
                        bplusItSappiUpdateJobDetail (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            name
                            returnCode
                            node
                            user
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'cc3ef78b-9cd7-4364-8cfb-aed17f26bddb',
                        tenantId: '9c7b8cb6-d415-4452-888c-5c8e22631d24',
                        systemId: '1e08f902-0bc8-402f-a28d-05e15adcee81',
                        systemName: '90zh9o5h4dy0uax1cudb',
                        executionId: '162875ed-868c-4324-9be6-93c2335afb55',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-16 04:40:38',
                        executionMonitoringStartAt: '2020-07-15 15:24:17',
                        executionMonitoringEndAt: '2020-07-15 23:18:06',
                        status: 'COMPLETED',
                        name: 'ab6np5dna01ahr0yb7nmclbbcydjoifkm3f3birdblcaoteazxoqekkb96dc4xv92kak562qrc3xlc60qg7w544jgr8g07rkcvefiqbvoj0annxvbmnqm1mlw5649gn837k8ud316e6wio6eg71tbjsnb050tdl54b92pbzcw6f71xou5znwx99pdqdyrroznjmspq7b5xaglt3kp2si8e7ib2avyxem2gy1bsftu2fdibznemtsdktr8y9j7sb',
                        returnCode: 9111583776,
                        node: 'vi7eigea17bzxsi8zjq7ks4ukf92z06ffb828dx2blv8pkiv60tb8xjww9r0jdv8p7k6joxtq0n5k5ihvo7zmulcbo78voswvloxs0qvj2qf2doi2wtyc31v6otf7690g3cpeh902ausnr4l7grnh4xfm7kjjzuw',
                        user: 'ffjbm3lr52qu0epgc59xj5fxxqbqli6jb0yrgqpp5t8xmmblfxd4n6sgi8icdoifaiyy3eqwojpt0d4aui3wecq8y8br2r3111gg0ecy1fa2nvrq7gd2r4mm31gts6xdbxtqeavobvuywlo2pnn5wpcxurvrf63nwz5jpuo0y4v1fvi1s4lxao0cysilfka1k5ji39p5c4dfaeijlqlq0z6uu7nbu4gjxvp417712vfkdy712o9fwlo21a28vmm',
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

    it(`/GraphQL bplusItSappiUpdateJobDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateJobDetailInput!)
                    {
                        bplusItSappiUpdateJobDetail (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            name
                            returnCode
                            node
                            user
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'e72d76ab-361e-43b5-b0e9-11e045bbd835',
                        tenantId: '93ba12a4-8601-47a7-8fc7-3da34e71a248',
                        systemId: '4b0edacf-4b04-4fa8-8621-11e0ca532d69',
                        systemName: 'o45c1fwyt8naczqmyqgr',
                        executionId: 'aa7c0a34-1f12-478f-bf35-f3c1f2e438f4',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-16 00:26:24',
                        executionMonitoringStartAt: '2020-07-16 07:51:55',
                        executionMonitoringEndAt: '2020-07-15 14:39:15',
                        status: 'CANCELLED',
                        name: 'd9dxh4xaaub99zkdqsvvu73u5opoym2t1dvw103gdopzd0pw0ktend33aley9p3uoh0trrtdxugo00slr40bzy7dtn2ygyh92xmakrz4byveyww0iek3atwsxwklwsjhgjtr237fgdb2tyk880p36tl5aejm3k05hvdpksv0bwflvyhzap7f9s9syfxpypqz662raq0gr5k99xgjelqbosq12kz2t2rxyvljkcuzal9vdpp0luztt4o8d5qi0v2',
                        returnCode: 4752555392,
                        node: 'asx3lwk3pu3a0zuupqhuonmpacvocxhacg6tbb85gy90d38x1li685hp0z94wn83mk39tsijb07hp2vb753umlmja9484pacuayi1vfse4rl3i3pg4oplhvzn9byyf60h4f7nnhcmgsesqr12wpmce4eldnunn8k',
                        user: 'gcauubb221sszw1zu3niv4jftzipvesxcypxn825jvyvuwjc471dycp535mszj2pmtp13a0c63x8szxx64cr5vn96s8nigj768x95dgykyzfk5dziivqs6b2fr67n8640t64y7itjoucc49ue328t918fbgwbu0dm8xqpyl62hh4laaqhhoibvipzyzgbq6q2pk42qipwq46w44nl02rubt2yuy5d06x3fm2aj1lem9zwsvv3ms0aan4xsdxato',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateJobDetail.id).toStrictEqual('e72d76ab-361e-43b5-b0e9-11e045bbd835');
            });
    });

    it(`/GraphQL bplusItSappiDeleteJobDetailById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteJobDetailById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            name
                            returnCode
                            node
                            user
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

    it(`/GraphQL bplusItSappiDeleteJobDetailById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteJobDetailById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            name
                            returnCode
                            node
                            user
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'e72d76ab-361e-43b5-b0e9-11e045bbd835'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteJobDetailById.id).toStrictEqual('e72d76ab-361e-43b5-b0e9-11e045bbd835');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});