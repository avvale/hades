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
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('job-detail', () => 
{
    let app: INestApplication;
    let repository: MockJobDetailRepository;
    
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
            .overrideProvider(IJobDetailRepository)
            .useClass(MockJobDetailRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockJobDetailRepository>module.get<IJobDetailRepository>(IJobDetailRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: 'cb75a608-d00f-4b1b-8c96-ec59158b5bec',
                tenantCode: '4il56t5fq8ytcfr0dgj5e80hpljls0kgremfewwr2lt3cbu1i6',
                systemId: 'ce797352-393f-412d-ab4d-68f1d8f2d600',
                systemName: 'smsoallh4sp521i5m3dk',
                executionId: '4738be3a-7976-4914-aeac-c984332ed211',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 21:12:14',
                executionMonitoringStartAt: '2020-07-29 06:52:17',
                executionMonitoringEndAt: '2020-07-28 19:01:07',
                status: 'CANCELLED',
                name: 'ddqlzzpt6249qdcjkqrfgazbfpio2azc49zxwy2az2vwymevkmzbgmcxcwia746eqyhievb4dsjmmcqja367s8grrh8gnkgvx4oxcbvgy3npda67qc72w3madeanbn1zvwvlhhhcvdhpwb9ccrg2luz49ji83bf10jtdfm7mvz8ops4q5aok2qymwzwe2ffcx9eqwwg3kir1mgmodh3c8el56p24wv8a3y34zwwwvy8v5dcyhnea6aszri7fv60',
                returnCode: 8796309917,
                node: 'y6iz3wdopqwcdf15ppd85auqz99rqrxcw6k8g30ssi1n1yufpz5ootb4d5ezyysvpmz9tuorzceyouoohqk6g5am6rxy6vivtac61lupyn84dy4w9glb6w88pezibqsnt62hldsvtl2oqak35v3ztf8yw1wqhmpz',
                user: '3w76j8vx55zwne4r7638h2g4npfggglu0ermh6fyt4zd105mtuhv1qfe3lmyk0fxm776mxxkgj1xre9gfaop6gxpd4nc5m4crwcg7abgk9da5alne80rxgao08tbspgv2wni4ro1sasd3ploanxjzustl4cqg1u3hip8s9l95hxa793qw85k2sjhbuf3r8bixegf4vg7vk8cffogj4vd04ebevu5vd6f3z1ra00d9gy1zycg9d13jbc3i29cqfu',
                startAt: '2020-07-29 02:27:26',
                endAt: '2020-07-28 18:55:26',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: 'cb75a608-d00f-4b1b-8c96-ec59158b5bec',
                tenantCode: 'pu2ieodm8p6a33asknnl24ymnj17gix5tr87xxgsilo2fwtp8m',
                systemId: 'ce797352-393f-412d-ab4d-68f1d8f2d600',
                systemName: 'x11yhanp8hml81p4yx5p',
                executionId: '4738be3a-7976-4914-aeac-c984332ed211',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 06:32:39',
                executionMonitoringStartAt: '2020-07-29 05:23:06',
                executionMonitoringEndAt: '2020-07-29 03:26:29',
                status: 'COMPLETED',
                name: 'uvfanruayd3o8txqsfvh0m1ci2jiy3dg8cwc83ztrp9t6jdwzlvvu3un4f72deq7yxbqqt0v5wxofq0vlftwoef3dmantn3ypk1fi638wv84uchc463r92xnm6d79rltq4vy25ns7afg4u0eod8utqvyvyt07e4m3xv9vqvvi5uz0ibq40k36wvl9bkp1m3yuuhjynoeg3icdajeic30hp2fwyii271ujiurikzj58lcmelkpow82sj07hq83kg',
                returnCode: 6427507696,
                node: 'i7zmqmvkmp4561wyy7jnq4h8dq492ljsr967dq4ifl095bw41f5bq6slmtk0gbg6pt3156n5971bx5ry3fkx5b7saashuxpqxfl40nkl5mhm3u5dkfs7po95xv95rzria4vs1m4jkm4jyjstf16607rps6wg0q3o',
                user: '41rygwn039cbdcyxixh0wqx8c9d3rvjd8zzw9w0pvb4fgsd6f4o93d13hd1pxuvxbgm66mbwfy5cubr3ap5foq7huged4wd88u7kehrtid03uiqwqksd57n180ljezy9un5j9vv35rtegj2cqqtzca8xh5c5zrm6r1ko9zl1cd0zr4upc04k1fpw2un2pgd4kd5aio0iq7rmgbobea73vwiwv53bkc844o7apb1gr3dnodialpkvz4b6yv456ic',
                startAt: '2020-07-29 03:41:54',
                endAt: '2020-07-29 12:36:45',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6bf26010-a993-4870-9263-58c16db28cb8',
                tenantId: null,
                tenantCode: 'eqqzx11mk35cfr8e8x4osk0y3b0m8mw8m8y0dbi0w161opfxbe',
                systemId: 'ce797352-393f-412d-ab4d-68f1d8f2d600',
                systemName: 'reby8d6zmzafkbpxse3w',
                executionId: '4738be3a-7976-4914-aeac-c984332ed211',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 05:53:44',
                executionMonitoringStartAt: '2020-07-29 02:58:54',
                executionMonitoringEndAt: '2020-07-29 11:02:26',
                status: 'CANCELLED',
                name: '6e7k1t5sxhvxyvb60csw5ebidty21o8kxo4ih19br8cxse4iit18ppkt3437ifm56wrdxs2d4t8w9sqxclk09xcev23u9uopv988ijw31n6ug60nno9qv6pyh53xjknpnnmbbzqufau03yh2yjklo2utueh8iwcc1qdb0drd93wsjttxog35b939waf49p0cg5qnj64pi2pifba7unjjp9o4hz0lqvfbibfu8jkuqwzt2tnsllcxxkvdmlhby32',
                returnCode: 3151929097,
                node: '6jqecvs00dh99ly4tsp3sfgydl27wjosm2kqqk01ookyohk7xackfl1evzapkvnd5p3iw2p6hc5chc45m4iu7x87ymv95p3ukkf11if44m0odhme8clhei4cl4edtn1fpev5vweg1sl0knsu9qu2pvtjyy7q89o1',
                user: 'u9mzu0wtrp76mh600g97bmxe7kup3np5kix5xb273jm58vdu4qh9cd2fs3a2sm0u5xexbekwkjttqxfq4g1zmb5zr9vyzcdssvg7ol6m8jn76uopru5d3xwom22i0ymmts7ckzymib7urs90wdtaxidugjcc031ck0uucj47ok8p9kdo7jdbcq18pmlsd7ckkz7jmogh8hq9eentg8z6zr6ljccti6yexa6whixodxczyf3dovm3hr7fz4b30l3',
                startAt: '2020-07-29 11:05:43',
                endAt: '2020-07-28 18:50:17',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6bf26010-a993-4870-9263-58c16db28cb8',
                
                tenantCode: '4mfmen7pgm2odbavf1rhpfashpsznfivj5j0i9ssqtelsj27es',
                systemId: 'ce797352-393f-412d-ab4d-68f1d8f2d600',
                systemName: 'pi48phhwtbto3003px98',
                executionId: '4738be3a-7976-4914-aeac-c984332ed211',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 12:17:46',
                executionMonitoringStartAt: '2020-07-28 18:30:18',
                executionMonitoringEndAt: '2020-07-28 21:54:39',
                status: 'CANCELLED',
                name: '3zmq7frcqom28xf3ttnzkoa1ks2ot2jn2ukuixu6m2oit49pp5iavlsg1rcm72lifkdihwhbcox87ggepjroltpk9hap9749qtxjy8pw3jq76tbttjhp3xretwul2929ip5la2fnmb8g5p59b7gi5z5g3gkqcxdm3pe649y7og6nra0fbxvyrgdqsus56906pv01r8zoqxuptndznom9hhw4oobzgr41kbg85zepjc3hx99871uof0mw0agiq77',
                returnCode: 2112846787,
                node: 'ocfk4r111xbqfxqoj7dzkilzf08bu0bqqgdy4i5lzxosguvx8wyhwsym2qfwopbqr75g4xjh46oggb7wyxeueqdrkajokoxpli6q10zevtys0v24pmrvlb0ewzir1r7if10im1h36nrexmdn7nqaaeu9gnzhf05u',
                user: '9jpgqdnilzhzfktofaea8e504mf5x2pwb47yh0x9sjdni9ya56flgj9xtcalgs6kf75cdhz587cw6zna2wj9f4qifhs3npqeqq6avessud7sz4dyfbydcmk2bk9q5l5vjf8evwrvsap8vf90b6459vc3t5vhm3aqls5d90e09m8sbvdfob9msbxstcmqhcxcki5e0uobon40xd97qyhfkv9j8xq59zwsyz08mjryysn3aqzg4ekt7q46dnvnrsm',
                startAt: '2020-07-29 12:06:19',
                endAt: '2020-07-28 20:44:02',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6bf26010-a993-4870-9263-58c16db28cb8',
                tenantId: 'cb75a608-d00f-4b1b-8c96-ec59158b5bec',
                tenantCode: null,
                systemId: 'ce797352-393f-412d-ab4d-68f1d8f2d600',
                systemName: '22nmvjeupfju1o45cv5q',
                executionId: '4738be3a-7976-4914-aeac-c984332ed211',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 19:11:05',
                executionMonitoringStartAt: '2020-07-28 19:10:55',
                executionMonitoringEndAt: '2020-07-28 19:34:55',
                status: 'ERROR',
                name: 'xn2iunpio60d42w2qgbd7ch3qr9jfkd6hgc16e88ykbgj2i5xh71u6ti0r9hf4593rwfq43hpfm6rjmkb2jx4bdo4p7ujrjbnxh7x9kpqthu0wqjdvohplzr6te5vzqjuv0y5i8ew4j7oxh7ybdu9foi9a2q73mi72f1rs1vl07uufxnps9svhgpmlu3f2bhsw154036zipwyo7avg4s6jri073t0rxy2v68ycht2h29ip0zugw6xcwbkaq6v7x',
                returnCode: 8560515038,
                node: 'b548s1lj2hllrrul2rg64k0pzhkerwoq9158ypd033wvq15ek6yefqdfvta0rq63q34mg3xjain04wtyto9bp53l37y2l9ymocspv3c09m2ojp7mhhns92zbnzvzo41hizc7j6vsvb76zkafgf6mutb5mpr1bdyu',
                user: '0or0fza2p0uml476u7bby93syfb5olnne70dufna25tjo0x0bjigyomu8ukfgt76xdaifw90vxrn7t5txoz55jpt5uwxjwandmpc8k378xjej18spd8pzg3pcomxtlu29ltw06v6abh1tiacsqasehhqo68m9saugitl826xncfrddiut04y0gtfo6rowhjrq6fln3okk7bl8m20kp41xr8s8ri5c1i1swg72nrn4wxuul6kn11aoh1cg0kyt5h',
                startAt: '2020-07-29 08:47:12',
                endAt: '2020-07-29 01:24:36',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6bf26010-a993-4870-9263-58c16db28cb8',
                tenantId: 'cb75a608-d00f-4b1b-8c96-ec59158b5bec',
                
                systemId: 'ce797352-393f-412d-ab4d-68f1d8f2d600',
                systemName: 'tjbh65yegtsfdpmo3u1n',
                executionId: '4738be3a-7976-4914-aeac-c984332ed211',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 14:18:18',
                executionMonitoringStartAt: '2020-07-28 22:08:56',
                executionMonitoringEndAt: '2020-07-29 10:22:44',
                status: 'CANCELLED',
                name: 'quzdbzie872tuhw3hyz856s9pb3s4jommuvc86pkhayrk8uid7m4kndt5l3z081hy083uygfbj5h2dm79kgt2w6w1g1l674tk74k5djz9dfn9wc0cuvtyruyg4fuvr1le1gakj6cfocvuzozxjmpsmyrkf6z07sm67ct1kxqeuep27csxtpg1b4iwujopjjgn68obh4730w7z2jupdi4qifo038mu4ak2rr7anz8qvi1byt4aio0ezb8pigb0cy',
                returnCode: 5508524040,
                node: 'ytsx4n9u1fcognqucrzakzsbqfgsvf6prvfr73dvfengjyfc6abcq9wyap96wltkcnwwor9ff91zl7lq377fpao6hdyvvc4jxk2z811q9b1t9vur8q07gous0ay40nlarujri6rg7uiv9k9u1yfliqnet9j254mj',
                user: 'cellfiplvj0uixdef7c0c6is5zjadsmuz7rfi8pj1pb276ljjuccinuvxdvsgr7zsp7chgvpnd0kran8d7lgc3cdn5gv69nayqcztlhmxjmb9zw391ezh04qc7nfcwvci6dyld6o4qlif47e3xuhwzsto6cipsiqxp5sxq04uc9kiiydasyxo6o9o7t0awzddgmo72hi5tynphihjn3ci4kfr9rzzvgd1fv9fbbjdvwj0rdml45o3vsuar1cn88',
                startAt: '2020-07-29 10:54:05',
                endAt: '2020-07-29 12:44:50',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6bf26010-a993-4870-9263-58c16db28cb8',
                tenantId: 'cb75a608-d00f-4b1b-8c96-ec59158b5bec',
                tenantCode: '6zy4rp6f5ao7624w0pe32x7em1835txeijv82c7wyg8r7zcrex',
                systemId: null,
                systemName: '9gjcv17dpz2ylp681dgy',
                executionId: '4738be3a-7976-4914-aeac-c984332ed211',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 08:52:47',
                executionMonitoringStartAt: '2020-07-28 18:18:05',
                executionMonitoringEndAt: '2020-07-28 21:15:33',
                status: 'ERROR',
                name: 'q1emfixxq1bz18fwhi1x5y56gosl0t7wffyc7kuromfx6d5jvnn59uuol0am1uanb4cxt6zb94sz2e3h4prcs4wijgyq2tbrx6prt4igt856ad8hsb2ts18s671vaxaohk8h5c421xlr3w2djs0c9g2v9dzzuqaf2vkoyiai8ue7zz6hj2aqzed1e81rlvtyle7rbleai29nd6we5xqtp02o9y76qqmf9lsp90lqy57ep38ykxtdma6dljd514o',
                returnCode: 6840526497,
                node: 'jrlmpdionaud90ap797f1y89g31mb24mn6wcmfwzewq350ddg74mo6ln5musot3hauxvb8hl9ogi6506and2j32zxdxxpfrb3d2z2h5xxtdyzx2yjclndmhid3ayffsb32tdhkkaw65parpltsr7j9p6p08i09qg',
                user: 'js78f294v90zzn5szolwkgvvx6vdz5d31a29nomv6qcmqcz05ao9ac4as5fyl3erasb494qtrma6m65z9d4hi9ynia7lemqqss8xl5ffezk4ucghomc25afzesc44gpde6fti7pun7cblylzceahk14p260o95ns4terlknobo84h9wk26vfxrulze3opre6c3md4xfmescaxw9wxx0edu2x18ws0x7thal6k2okifbj6k9oic33tyvxsqqeho8',
                startAt: '2020-07-29 13:54:01',
                endAt: '2020-07-29 08:52:30',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6bf26010-a993-4870-9263-58c16db28cb8',
                tenantId: 'cb75a608-d00f-4b1b-8c96-ec59158b5bec',
                tenantCode: 'wwucb5oxsg71r3hneachrts4bfhsq3o6lxvxie7rjl33zzyt0w',
                
                systemName: 't81cbdbl2p4x5o8v5ni5',
                executionId: '4738be3a-7976-4914-aeac-c984332ed211',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:10:58',
                executionMonitoringStartAt: '2020-07-29 00:42:27',
                executionMonitoringEndAt: '2020-07-28 19:34:41',
                status: 'CANCELLED',
                name: '2gur4732ixgf45x2rd1haw628n0d3qajzxfxtfn82sbblg3pqevbayzdnjamzbzf272p4bwa4agokj2zkx58k48scmai9gi2riax84ff9cv30228cbwog9hdgu8ntn1d1zn44dn427i5t85ch8hblwe6pgxnehvwzpjj2ul5mo5p144dx6sh2t6ovqmu1qxs02nx9unimogzu8pmthj7014ubk22hx2mjafod6kfmdbakeuckm06tavc1w8i7as',
                returnCode: 4454309215,
                node: 'xbz60u8o4cfy527fx23e85351scfxxp9n38xohpv6b0fdtuxd0dlirm53x70t0cnkpjt1wm0n5uaplnxppdzphh8nmmbq30x5f7i78t8fjx1vkpm3l7wyoyt1vpa5acb4lp5p6i7h74p8m0msv5elx66i9ktfu4j',
                user: 'ba7jjdb95efvfv9gvl5srp58g499ri53nj13lyej6m70ct3rch22ijbdofe3oot93dvv0zlauv87mm7fisqembkmgc5eq0zlq2vi687eox0mvsdy2e82yqlqbk5g7fyeyoyt45ydxqt9zy7dnmxycmrbtjai1tgbzjmmtt7z1383lexzuqm74ypj0ecotqipgppp8rra0npnt0ustrqcto1mveqjctdft1jzepcm1cqrj0gq38yfl512rn89k9n',
                startAt: '2020-07-29 06:20:09',
                endAt: '2020-07-29 06:10:03',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6bf26010-a993-4870-9263-58c16db28cb8',
                tenantId: 'cb75a608-d00f-4b1b-8c96-ec59158b5bec',
                tenantCode: 'segzb2i2ekf9i3mtnh3yc32sgfpjf1agycpzjfppbtzykh75nt',
                systemId: 'ce797352-393f-412d-ab4d-68f1d8f2d600',
                systemName: null,
                executionId: '4738be3a-7976-4914-aeac-c984332ed211',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 14:54:53',
                executionMonitoringStartAt: '2020-07-29 02:49:17',
                executionMonitoringEndAt: '2020-07-28 17:52:27',
                status: 'COMPLETED',
                name: 'lyz8l92fmrocr7qp7focxubmzpoaytox7r5hwuokivb782k55555lan9ooqbq0ant5jdwiyvr6sr3o3iuc7b0sgll3uxg3ymgibrbe5tco65ane41scily7fk0veqirtsf41zq9wuv9l9i61sc1uuicn4hkter8470rk96takb4wp7n11a93w67ciw68zpr8y1809h9w5walxewe1uuxw0032xb5uzl2tv0cvi8m4c0nz18e5p7gdaa4cqrhwq0',
                returnCode: 9098921957,
                node: 'yjnqblgbe322avd9l5zayg056ydco8z3ujshm3526nse5m5tj3f1afxzz743dwkg9p7dklubxykszwe5d21x43zk0uj17fa077ibqmtr79031c3drpg0v0xj98odci6tug1p2wsls7yr0k6kfmi92h8oi1o06zkv',
                user: 'ly3xb0wukozwowodlk3yxs3qfbz3ticexq9pskid58mu3ktpug24xfztbxqlaz8mmx1iu3jmkzhtcnwuefsvyg7us470ojydiginefs5t58hledlq6dtz9vexcgml3wskorap3d0d7y3bdxkrk7r5yqeqx7ffus0g6nougowul1c8ihgxvgx8sva44tvffykqajwythjvabmsp44cb7mepluhzc9kjldvr5it8d2id0x91da1ec8h389q40zh45',
                startAt: '2020-07-29 11:05:26',
                endAt: '2020-07-28 21:35:57',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6bf26010-a993-4870-9263-58c16db28cb8',
                tenantId: 'cb75a608-d00f-4b1b-8c96-ec59158b5bec',
                tenantCode: 's47s1snbw4d1ordogijpitaipvv88jdpo59vvdm4tmjy7lecvl',
                systemId: 'ce797352-393f-412d-ab4d-68f1d8f2d600',
                
                executionId: '4738be3a-7976-4914-aeac-c984332ed211',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 20:07:16',
                executionMonitoringStartAt: '2020-07-28 21:11:39',
                executionMonitoringEndAt: '2020-07-29 05:17:18',
                status: 'CANCELLED',
                name: '6y7oghr0joxwau94ulnstkr8exsiom7rmbfaj336pl6jsivyjkqaxqxemjrwlvuge5k2bhkpc1f99h9fiy9t0923kikwe7x57qd9gs8xrxi1nxxaz6fed401q46ufvaf3zw7hv0hwrvyvkutxjfruei36swe8awt2636j87l6h68dow3o6x7mk1qpfdryqgzyoh8sp68md2rt4n4rdp0joq0zg77n0wi6t4a4h2nkph8wdsamqfiq6evitdbsvd',
                returnCode: 2287919419,
                node: 'gwud9mpnq3hhtsiw6ax33d2xg4bbtnyo44xh8l2xxpolgl5efwl3mi6terfs5mxvx3nm506lnda0xvaaldy3ty1h37kkjgqk07aibl6cbkbzqzoces7s8oggh5y10lc0bat5hsfgi1146e8hkb5ip9mefx5ew3ir',
                user: 'hq4t8kxknuekidjgf8sw6lg0wlnxcl0jye3nhchyulcubp8z6gaj76vjjhlrna766ciqacq808cehtt1a5217vou4zm0ya25ido044frtmbbhn9pd13mpatkhzx7kw4tihmkf0wl7huormyzrwa62qawx20cq5trrxxax2uhwolw512ywnc9z6ia12l7bidtkwzyojxbisl5zmd066mfir5vq3etnf8bly75zf8ru6zjctkybi8d25oo4lkvylq',
                startAt: '2020-07-29 06:49:38',
                endAt: '2020-07-29 12:49:21',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6bf26010-a993-4870-9263-58c16db28cb8',
                tenantId: 'cb75a608-d00f-4b1b-8c96-ec59158b5bec',
                tenantCode: 'rf8nh9uxuzpnu94pc5j1kp9dsutdmzlkye2uj2xhn63qdncvkj',
                systemId: 'ce797352-393f-412d-ab4d-68f1d8f2d600',
                systemName: '5oiwv65oqj0ui2j0k1lk',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 09:27:37',
                executionMonitoringStartAt: '2020-07-29 11:00:22',
                executionMonitoringEndAt: '2020-07-29 02:58:28',
                status: 'COMPLETED',
                name: 'm4uzqx6cxwxgs6ngliiy2ln7a9zucgefl3sswf37625qms4wtkmrq2wtl4uc2rzdfdzhdnbz7qpikuybqpf8ir2k6adcwjgabt53b4oak3sl86bfvpc68d6zs2djhmeatydikjuwb3vlmz7doqdrlor1ihn1lb6xa23h9pzei756a458zft7luice2j5u7r9g6l40wwdpbdtnz9ipady937jchn2wd9zwvsc7qmfktiy3wo1rentpzdrtznouj7',
                returnCode: 2973118297,
                node: 'm178n07dhs0y1xeb5puf38z6w8ivt1me8e6aeivr1d3yu9pqr3vq4z9ljqa7mopwdm4mtaak143m0o1csd5pwuzqfkdr3okh4hh36yr0qzuku3ast5f5eyezncf6fsftd7ijgbca8qvua0x5bt2s3lmk734e6pfd',
                user: '3nkcfple2rfwo9c6fnbf0l4whhmdexyzpf4edors4y80c10f19snlsjlcwhip737j80e0kt1j7kypnuxade8vm6a566soevghvkjnqyqpqd6g6ui6p11z5clzjtbdlw0egku8rnnzm7biitcnpi00d6y8uwgu7lob0jf2069wnvbpiwmz3ssq5uqeuqf2c837ezoj7f7xra1sghlx87hx20mdo5decvus6wsb5i4vrihlup76gppbn1f9f43fym',
                startAt: '2020-07-28 20:54:56',
                endAt: '2020-07-29 07:46:05',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6bf26010-a993-4870-9263-58c16db28cb8',
                tenantId: 'cb75a608-d00f-4b1b-8c96-ec59158b5bec',
                tenantCode: 'ezk59fgkvd7e1gz84giuqjvncn9kpuvgu71phw5u1h77x6kvhp',
                systemId: 'ce797352-393f-412d-ab4d-68f1d8f2d600',
                systemName: '4a0q5mh5sw9clvo0biwe',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 23:14:41',
                executionMonitoringStartAt: '2020-07-29 02:47:45',
                executionMonitoringEndAt: '2020-07-29 02:54:49',
                status: 'ERROR',
                name: 'yaq5a0do62c8spjym59n90j2smwomhaptdzpuf7p5flx6k4pl8zwsofbksfxo21chm2am4j09c2n8fqevp9yegkcth2t6grrjw8grr8yhnbem9l3xk9c5ufz1bjb5jyp6yjty5zi5wgxn3l0vavojn30p2f0i2ox9ew08cft75t35ezkcl1j0ra3keqnsm7c8s3sf4ko6guhyiu5to7o6z1hfwnsnznxtsvqegy0xji9empd3itmxs8nehd0j7j',
                returnCode: 1012636579,
                node: 'dbe6017n3v6kbsn235zg4grd7wj2yerks9jykznzhyc28v9nd65jxontd0r4f5abxv6yff6vkrbh7774zebwn0aazby4jkvedmff9rbskbhi1zrp4lf12x6875m34c972kh21jqhlo3zxfr7j63pktkqrin9xeqa',
                user: 'n7k5osrdzu21wgorkcacwudpk6n3aqramy6ackdx57vucvumpubhldak77m901n1rvycnptz3h84rnlfarro264r4bnetgzl3u85uai0390nlpicrz8721bplcku1bcp49qxvscl93zytsr33ccz3r01he756te12wlrts0fogksua6d5c5c4t49o0s9qtv8447lut835cf8edj9walv3b82wnadk1rw54mj5pw025h5fkach4o1nae2h0s7fwv',
                startAt: '2020-07-28 23:45:37',
                endAt: '2020-07-28 19:13:22',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6bf26010-a993-4870-9263-58c16db28cb8',
                tenantId: 'cb75a608-d00f-4b1b-8c96-ec59158b5bec',
                tenantCode: 'b84ysv0dnb2u8zuqgzcpntf9iborv1fit3ih44dtii94tgnsxl',
                systemId: 'ce797352-393f-412d-ab4d-68f1d8f2d600',
                systemName: 'zukkdtduptbck3eriijf',
                executionId: '4738be3a-7976-4914-aeac-c984332ed211',
                executionType: null,
                executionExecutedAt: '2020-07-29 07:46:47',
                executionMonitoringStartAt: '2020-07-28 20:34:12',
                executionMonitoringEndAt: '2020-07-29 09:14:46',
                status: 'COMPLETED',
                name: '2jp4yomwinrzf3noxl7q0phmug0d0dbd6ijxns9lpk4h8uab9y6nwtpky64ng4qj16cz6i57pxxi6yf44651yyb6s3ndkpi8cjckkogtcv1pk3c8a0mx4tbuugdb0qjzjfuwg5q185eom7hgu66mkddd7j7u1habxmij52eo3u27u9a7wpm17j7747oz5r0obyhpjjy9jxuvc1kxk67v4bljiwp5uy63d4qcufr98nr2jz5bf88o9bd4okntluu',
                returnCode: 8256706356,
                node: '9l6hlyvkfsqysvp7gn90jel193jm3yc04ki0yrfhse4jtk5t6llr1t80iwk03rleg3ik6edbcgbcj8f6avfs1462i7gdnm6frnkiumwu56mkt6nu5k3s5ujqvwrgd0cxh9wcgsdkzazw5msswklbeujw5rfk9znc',
                user: 'dxmkpsnj2u6lehj3iz2pc06vgcggzwht1v0mm7lggms6in4awe4uzdxolxf9saqyvjviffuvfzpdm352lohobzhap3t2coq9tdj0ydqhj5n3yppmqa9eu1wwcnum24gau3klloostswrhdyp7nyjxfogywe7pp5bp3h5z7fd4mqchkq6nsa4dmr6ku5yl8hiajo1215b1fr9piw4zj3xquhjpahgqixlxz8d2xb4bgq0nwnwssf1731164iq1iu',
                startAt: '2020-07-29 11:49:46',
                endAt: '2020-07-28 19:50:03',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6bf26010-a993-4870-9263-58c16db28cb8',
                tenantId: 'cb75a608-d00f-4b1b-8c96-ec59158b5bec',
                tenantCode: 'i8neof3oan5kpnsmpwdf42u92zuh2q1rctx8s74ef7hteywrzw',
                systemId: 'ce797352-393f-412d-ab4d-68f1d8f2d600',
                systemName: '7v35zlcll1y2yqxwgw53',
                executionId: '4738be3a-7976-4914-aeac-c984332ed211',
                
                executionExecutedAt: '2020-07-28 21:59:17',
                executionMonitoringStartAt: '2020-07-29 13:39:24',
                executionMonitoringEndAt: '2020-07-28 16:42:26',
                status: 'ERROR',
                name: 'i5sktnyg5uue23fcgorl9satdds1l9u7ra4i4lwr7s1t6rhotde1cq9q0sjerzuewgntyx3krtucad7mfdfxb8z9rq1ydj8mszaii2ps9tni6dg6mwlee0eitnm2meslmm35mie4w1966icjhyo7uao65htp3aa2nanwjwp4p1qx59qj43qczcmgsw1ioa6riujcszeuhxbg1gf2iglifk8di2hqa1b88j1yoq19uryusdxv0koxdx4sd2n25ue',
                returnCode: 1600949140,
                node: 'g0dfuxvxdth6vih0qt12aefgrv4e7ti7remrojipxxxbdw2h4y6ohhfyychoagvrjng3r05ybrm3p6prp6expbwnc9knsvqm5hvj1fz44iobnrftr56w5x5dmuwphxei5f7twm8ufm8qjpqn6xj6qzhexvjt2gox',
                user: '4lnwkrvj02th5ql5cqag5ld6s1nosf768f6geuh59992feo1dg9rrng7qdueh7fqy6a26hdbnskvebnv2pcc9nueuyi40ov57193x1fbahjnyk7fi31tjlrsbgdce5huvv4of5d429luzlljicmjxav3qcg611pi5gdwqmm3xx9hqiigepvqwftpyhfaq5sfh7xv3ja4hzic2zv613aezfh9wgzkjfvocrsbm0nv74j7gptetjp7vy3by8ozhu7',
                startAt: '2020-07-29 05:41:12',
                endAt: '2020-07-29 07:43:38',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6bf26010-a993-4870-9263-58c16db28cb8',
                tenantId: 'cb75a608-d00f-4b1b-8c96-ec59158b5bec',
                tenantCode: 't95hjumfo9bwfkm0sivpoilrbwlita3o0bvut4rdceke7lpfoi',
                systemId: 'ce797352-393f-412d-ab4d-68f1d8f2d600',
                systemName: 'mk3gyf2v79dltgce74rk',
                executionId: '4738be3a-7976-4914-aeac-c984332ed211',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-28 19:56:47',
                executionMonitoringEndAt: '2020-07-29 09:31:21',
                status: 'ERROR',
                name: 'r49py1kpkavynehw2c3qjrqwnat4r3j6h5bsw2ivqrf1dq6i01o8apxhseuujo9dpjxc3y1quicbnm82839mp1fhb7p2o2v90chx0cl1yvm39qtmrxaanm635lfoq3zziyj9fdfadro2nlojia6kf8lskph5c4le0rpdvo2o087k2cmhv275gbpnthapc9p098om4mq7z18x2ves1b3pwwq82z1ha40h4w9zex3g3kpmu2j8aok3vd9vc2x9543',
                returnCode: 8351682055,
                node: 'erqtnjttzr0zgzjrm839cmceutqb8dijjy7n6nmgny2lbooxduny9r2uvlftxb4n87marhujzhy9ntvmhz8dghm1gfb8h4d0k953bnynastclq9jemzfeertsq821dsbmal4btfklrzadp01iehg4rtl1on3ue82',
                user: 'huucymurcanfj8639ens8e9t5vkiijpnvnle4c0uolnn4ztlquoqt1rfp88b62mhdci85g7ynmdwb6py67v90eitjgbpxsvd9yre6ni5aigxlemomejww63gq56w15ua9gpr9iq6iqmtsvx0116b59n2n1hihuw0e1h45lpknlo3iuz8amramzrc0qwt5xr4ejzfys6siacd2wtpsbtdskizhpmsqzk4we0hu3wryxeea5a3nfc9lu6474xrb4u',
                startAt: '2020-07-28 20:24:32',
                endAt: '2020-07-28 19:55:05',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6bf26010-a993-4870-9263-58c16db28cb8',
                tenantId: 'cb75a608-d00f-4b1b-8c96-ec59158b5bec',
                tenantCode: 'dhdlss4u6ueqi013jtwv1fod1n6dgc8olazebeaj4mwsw7kwbb',
                systemId: 'ce797352-393f-412d-ab4d-68f1d8f2d600',
                systemName: '9nclbm0hm03y63b4kbnh',
                executionId: '4738be3a-7976-4914-aeac-c984332ed211',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-29 02:33:45',
                executionMonitoringEndAt: '2020-07-29 15:42:04',
                status: 'ERROR',
                name: '29l9ydomyseq4d3zzn60kiv3kesynxutt7bf44rj99dfhrpnylol5ghcliwade416zvd42i3pe3ameob41fpravsb8m8yxmmy3ewd6um3kzyxmmfy1o33yvu9fog287hnwo8hklu5n3z6z34zp7rr78ala10nyxdok71itiqn149m2s8z4zn8zy5k4tw5t804obw8s2o37mrplabepb3fs2euvo6bbnspnc86jdf0ywtg0d5ohpcj4k1o3arckd',
                returnCode: 1348700892,
                node: '2itweqet78o26q37x06peqj3mdfol54ulrm60nco8nah9os1wtj49q2mbw9zdq0qipl6ewsc9he2hzpzejkss6slc59mzg8jppu7lnp78ofckgoj353aowle7catvsfukyhrnvg7xbf75grfalsl0rs6al9opp2t',
                user: 'lcwqcafrcqehc4ga1bfybpvz93y7fbtdb22dyg3oerrjvel72x9b8r657alre6xbe945s0nm04oep3v6bhug3uiw14kc51otu7l1e2h3eejw1kl0tbez9w46oopf2zp7nz1wheg155z79qr4h7rzo28asi15ylxcxr6qn74cmo5zo32ok057nlnnvr8tqu4zs63agpx8zyitv711pcw7i2vxe1zem7f4p4i2anh8txj2w84aok517lj7zrspv2g',
                startAt: '2020-07-29 06:16:20',
                endAt: '2020-07-29 11:17:30',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6bf26010-a993-4870-9263-58c16db28cb8',
                tenantId: 'cb75a608-d00f-4b1b-8c96-ec59158b5bec',
                tenantCode: 'x6camhsqyl870ato366qf31awyvr53vsnu2mipdwowcq9s5mhm',
                systemId: 'ce797352-393f-412d-ab4d-68f1d8f2d600',
                systemName: 'j1xmhsk2g7p06384e1gz',
                executionId: '4738be3a-7976-4914-aeac-c984332ed211',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 15:56:46',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-29 13:24:41',
                status: 'COMPLETED',
                name: 'm3n7gmvyl0cm4v7tndaweb1wx9wdms6om6dygoc8nyg4hsniaymhyxvejkmmjr0oybalp6wg6ccgk8v275zus2wrh3ke59vcwb7rm8fhm2a43szewtnbe0lgxewrhsuftknkth0a4q5m8k39wj9wvc9cb31k3yjkbkwq62z7gnkj7noo83jtod20qoxb4cs2wdmqbhj1lbth9w2y831qn5hl34ehhqrnm05posf590j7s85ei6l3tzmd7imaqlm',
                returnCode: 6643902262,
                node: '8ky7r5ry61wvx2g5zbyzxbznxzvj6bajp3k88p0ny4nzecmgyuq82m5dknwwkc2g1frfsbpvmm79ate69nhnqww6wa1pw1yg84bwja8lqhx7ca6hcg849ogbd9afnlvho3yep0o4mjy5odz70jf07ngcz5a8c7ek',
                user: '1a52p56gb07wpaa98xn7xmrdaav8zx05mjs42hc17svsguizs9q6cpjrkkmx6nxub9uum07ozjnz4ty4s1x49mt01gjoarr4f6dwyawk3n50ogm30yjjya1ev776cy9zs4r8vxoebgfc6f2c637p6pk2iemwz0ce24pqa8114ot29031nnft01a7xqinr39u7xmld6y45p62z9htgx598su7d0in84nv9y3xkd2qedc9eh16lbe71v1wyta1y0j',
                startAt: '2020-07-28 17:43:48',
                endAt: '2020-07-29 15:49:08',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6bf26010-a993-4870-9263-58c16db28cb8',
                tenantId: 'cb75a608-d00f-4b1b-8c96-ec59158b5bec',
                tenantCode: 'hdfbxpfl2lw7f4bhtyrfnai7u91ig4ltj8d480p2o3g2bi6j1r',
                systemId: 'ce797352-393f-412d-ab4d-68f1d8f2d600',
                systemName: 'kynk8yn4vlmu4y3xcmgb',
                executionId: '4738be3a-7976-4914-aeac-c984332ed211',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 04:25:20',
                
                executionMonitoringEndAt: '2020-07-29 08:56:28',
                status: 'COMPLETED',
                name: 'c179311ar9gfewidez00xxp0uc0nxgjvoc9oyndk61o3n13g2d3lpbxftke58gybjhf18psh9w3jws5cukwea0e0hrsync7gokvc2sghhe18z7r29yob3i2pdqxt2e4qpyhr8eyw9jaobtm0hxff4ry4irjdkhlpuus84a5kgehpg08poah7jz9k8xwkhixgzooiugub40qjgb21rmecblsgr7k3xeoawmdprlhqmp2qn292yempm12u6tchmx7',
                returnCode: 9920841247,
                node: 'qxuwx9scmrgc4fv9oqd1t973xrr0pir3gt7tp0qflt4m1d1oerd2x4d5p4b4ua67lca68h6n8s5w4b3uqf4prg54di4hmgttc20qc26t57itszbfyeh0uv3mkhbjl6ekhxw684npxgvgepasidjss4hbbzzgul5u',
                user: 'v96zvo66cio1th0mkbocao85ye7icyqkwhrl5n1ia8rcrnhf2zaw5w6mqppz94h2pledqlyyzfzwdbxyo7pnm7ov0x7h0738hrf86foky8kg8nlpkpga8cd0txltd5gztpplnvdl0jrqo10laha89ad9xd0j8sit3socqh5rpzyg29xnccnhdjrvofqfxfu97zjw7ut975jolxqlthqpfl8g27lou8t8ahv0l6ig9ld0xup10pggn409lake04a',
                startAt: '2020-07-28 19:49:30',
                endAt: '2020-07-28 23:06:36',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6bf26010-a993-4870-9263-58c16db28cb8',
                tenantId: 'cb75a608-d00f-4b1b-8c96-ec59158b5bec',
                tenantCode: '3nn6riea2kg0j3889y1tgcgq0b5bfz0bmo9ggpr92kxp56jof0',
                systemId: 'ce797352-393f-412d-ab4d-68f1d8f2d600',
                systemName: 'e1jgawqx4t3t7ilqzsw8',
                executionId: '4738be3a-7976-4914-aeac-c984332ed211',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 02:44:24',
                executionMonitoringStartAt: '2020-07-29 09:07:39',
                executionMonitoringEndAt: null,
                status: 'COMPLETED',
                name: 'ef24i07nespz7ovojb6o6l3fu6x24asyy01whm67ku6mz09zodzqd59a5fhscq44ed4lp4h97eqgbc8dkgahoqc1ebqbuqwrwcsw3st9vqv91q1534l5b605ptnapq95yemn3l6ea38zk15gb0vtuqury01u19pzsepllsehea5voannrffd7hrs7lcpwljha2co42g6oye8y0t4cl6as01fyoqvtqcev0ni3y11uaonltaty8etoh6vprkho04',
                returnCode: 2108838353,
                node: '6mjcjzyqelfd6rlqzwpzvsjt894bvf50e1areidwg3xy7kbpz0zt3d8n56qycihqicu0iv4a3z7h84tot5mmhrrlnliqlqvuxtghkiauoidt54b7xu139ggdm6buy3w1nz01qgwca84lfy26yend6xeywwxht1m9',
                user: '853xnfyz9ydf2by81yppqy9dj9uxkfbsry9ze7xdevyj0n12flltpofsvy680zzdz4yzx3frsgvkegfsag87jqpgruffdq32i7xioqmp1s3snu1dsxpu82tcs3x1njapapmews8luq2y3ghiy88a2vrislgwj5o6eula781qyasjjw6iw8i0gop5lu0g4qg8y0fs5uc8dqih2o4dxlhvtp78x3r9hg82hfjy5zw86zur1nbznbxjwf9yk3el0v7',
                startAt: '2020-07-28 21:10:23',
                endAt: '2020-07-29 10:14:15',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6bf26010-a993-4870-9263-58c16db28cb8',
                tenantId: 'cb75a608-d00f-4b1b-8c96-ec59158b5bec',
                tenantCode: '3q2k3buje8nf7yj5m00nixp99qiqnh6orxb14mst4sg0g7fkqz',
                systemId: 'ce797352-393f-412d-ab4d-68f1d8f2d600',
                systemName: 'kgrx3f4x4vbzavthcdrb',
                executionId: '4738be3a-7976-4914-aeac-c984332ed211',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 02:59:12',
                executionMonitoringStartAt: '2020-07-28 20:48:35',
                
                status: 'ERROR',
                name: 'uuu40a0hr4uv63usgua2cuwfjgwpj1hb8et9lbx8zbikyd23d550t1q88ml6b0wgh4oy6oii2qyq10m9dn19y95mi2t3bw816fmvwwwb3gii06j12dvx8jfef9fkcixyryr8cubaaf13kdss5d5g1jgqnhwov6pymccoguh4g91hgyzgjctzd9ducy41bowd7xe36zi20a872o7mx6zszbjjadbvg5hge7ues69y2ttck7sku4cyp6ekzygrvp6',
                returnCode: 9155973704,
                node: 'syf1gqg8nbgnb0hbs69uswciclx29yzw5c5bnn6ebdgo9n3iti3g7kvh035ozwn6a0bcxsf2grn0k2hhpydn87nb1mh8dsdac3kt2i15cot7azshlhbt04sykdo5mza174w5yvkphxk540yq2x3i781grwoiynqi',
                user: 'n0oxaj0ts3384ildxixpv14rxnh0bdr85wsak5s2orcqic8b5r3kt6kkmtwkgi78z1ulqi4n1secrel7pwod542jdscsa5eu9xej5j0j6up1c84gv8b0g0jlpy8ko1k48upvx3qgtgwer2mj7a6s3uskdoeokgvjegag4o02e41u5oh6k0x3xmeo0ho7ldbjr9ypkky4u3oyr9xepd6mgwj3eahvg6of3uww10a8ikwbrny6xijclizbf4qhs0z',
                startAt: '2020-07-28 23:42:31',
                endAt: '2020-07-28 18:02:33',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailStatus property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6bf26010-a993-4870-9263-58c16db28cb8',
                tenantId: 'cb75a608-d00f-4b1b-8c96-ec59158b5bec',
                tenantCode: 'v23f6pa70v23okykv78iwey6mg2f93gjcd97cxqlbgvzmazc08',
                systemId: 'ce797352-393f-412d-ab4d-68f1d8f2d600',
                systemName: 'zlkj4me71m78cftyl0q2',
                executionId: '4738be3a-7976-4914-aeac-c984332ed211',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 08:16:13',
                executionMonitoringStartAt: '2020-07-29 11:09:30',
                executionMonitoringEndAt: '2020-07-28 19:34:46',
                status: null,
                name: 'yvvjxam8fnzcunyxczd0fl62epjbxuf4k8dnmoe6l7ol4m4sgikqb7xu1d6vv024wo1r69mbelmj5kuowlx0he3az8ub9t3iuqpi5zhuf45mplp0dboibjucp6w91kfq2b72349z3mzu4ys2m48s6j0dd2gwqyv4ttbxxpgpotyr7q4th5w3hs8nxb70sccna778ap8nnvyobf2dmq8yxwwk3yxipuxhef8bcapvo7hqs1j1s4kwrj56gyalv39',
                returnCode: 3511710313,
                node: 'e9e6jy8rg97v39gbnkajcqww97bzdbauhlsh37e3c4u1jhk432gmashk8b9jafbmspdzc77qh48k1z1nqrtedfk82j9o73h985a9eom6ztrejrw13vw9gykrt2t6v43sb52329e5x7ocy3bt7kglxwobbfxwxuwh',
                user: 'ph807bgcywb6yfs8yvvwts528y4wma9rr0k5t2wd0o901gie9lh3faxjvqwmqn12d8u1mvq3dgleibbexnazzqgmvoi5wc5hupvwdfzt641purd744hqgc9ih0ajftsixw8bhdbwg9iau4hqxlqszmgghhd5xjhm657i82czasd0x034uc1bwnfm5cdd9xmnyspymipmhp0tsu33x8ju5j72hle9fahlb1kv81pp0zabln79mlct617if7rosat',
                startAt: '2020-07-29 03:14:43',
                endAt: '2020-07-29 09:57:27',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailStatus must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailStatus property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6bf26010-a993-4870-9263-58c16db28cb8',
                tenantId: 'cb75a608-d00f-4b1b-8c96-ec59158b5bec',
                tenantCode: 'q9i8y73rswhr7rel53q3wk2rur08jj45fzofmtlim3fhq19we1',
                systemId: 'ce797352-393f-412d-ab4d-68f1d8f2d600',
                systemName: 'ie7dtjnme13s4f3razbw',
                executionId: '4738be3a-7976-4914-aeac-c984332ed211',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 10:56:31',
                executionMonitoringStartAt: '2020-07-29 00:49:06',
                executionMonitoringEndAt: '2020-07-28 16:08:04',
                
                name: 'nbf6r00ir8n3dg6axjc195l2fn47nbdgu3okph650r1e59y1mnchrob1qgc88wj3xpsfqy3vpwd9x1llhgdl5ngp586e1hmwb4o2nz7b9m11xp3njzfikz4jccyovwz0q61adx6j74j6wdr59zuzwdhhrrmf0kq4qo9qhtca3kl18dpm0bsb5bd1drs2w900t6h1lz14nwb517p9u4d521q9qpdvfwdxu6uqslmzm6fq0quym3zfdfpv0ruu0fk',
                returnCode: 8728882179,
                node: 'iv16q4rgx14u7p9u3xrratk56y1hqnvg9laes75bdjmz8sttgqvx74m4nr96qurx6qin59gqza52m3rl5qg945hst1l8bg0uqi4wzf9jyr2rbwsdida74j1kfum1oj66yz026lq3d5m82ums2agpzzbqcslrgycg',
                user: '5dv253lwevbh5yh3d8xx6nsannmosiq29bc12ls1720hsgyjh9u3qz2k5rrao5942awcna0jiv0xi9djdzhrae3aqlk6ta4jjotabmlofptj4pqufjvc3t9bspaleby4k3hu84unti4y6xihfb8apgv6a8260qlboxbdrkh30h4xw5kv7vfkxkfo7o9ee3y8yg1tqapjtzjnsg66rv84tc14qqc41dnyk7zj7ees9kqrldu5on62gnlv5ab64og',
                startAt: '2020-07-28 20:22:52',
                endAt: '2020-07-28 19:45:15',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailStatus must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6bf26010-a993-4870-9263-58c16db28cb8',
                tenantId: 'cb75a608-d00f-4b1b-8c96-ec59158b5bec',
                tenantCode: '692z9bwjbolajxfe671uw4zhpuneqej6xoxwonp3tilr9xpi7x',
                systemId: 'ce797352-393f-412d-ab4d-68f1d8f2d600',
                systemName: 'jff97ejlxgdq5fnffmmb',
                executionId: '4738be3a-7976-4914-aeac-c984332ed211',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 10:24:36',
                executionMonitoringStartAt: '2020-07-29 13:12:48',
                executionMonitoringEndAt: '2020-07-28 17:16:21',
                status: 'ERROR',
                name: 'hv5x8gnno0n8v5b9sj934i661toerxaf228il5n8ay5thpq19lfn0772hqbzceviwsrnlvll8q6gow8qyl6a3p3bzywjmau2lur8bczf540fwjqej6zyopf84reji2yw17gb17b86u5cp3c3ss0mqtajiyjl011clmt8nddx92xln199mj5bm03bmzt35txwxxw2t9zcv9l33t4q7l84n11r38eq9a3jy569i1cckfzytbqu1mh8dx02kp9srtz',
                returnCode: 2594846230,
                node: 'rvb5kpsx4jhwl0traa91e4ux1nq0phsob0s01f1nlgyp24wxfyk4q87sbpbreu2ehescmwx1gj25hvxi1o0xztublwm9cz2g100x8of7vdf0jtbanld882hbfdnyfl0on3eao3yp5a04xk00396cjl6dbgoe05ut',
                user: '3vahtlcch6mddmy0u2zg7en3ffqmkm7zhreltn2wml6mpg43vw0arjnlyx8tjw8z6cjttlccqd45q19lnna9yjrieq4043sis9blnwi66bzhzuo1rxfpk3btvbg2acgr09z32qihs2c44d76uzdtvyt5rengosi5faee66sy5o62p8yytme5mbenpasm1zex6qpytqpcokm2ljm5kf53tvrzd0ulzsg3ix3qwhtnuk9ste7jsso9u3k10lom2t5',
                startAt: null,
                endAt: '2020-07-28 20:35:53',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6bf26010-a993-4870-9263-58c16db28cb8',
                tenantId: 'cb75a608-d00f-4b1b-8c96-ec59158b5bec',
                tenantCode: 'm0xwgtzuhhl1fh8ja1zhupgcijmi59c8e23n089s9cjm4bwe7v',
                systemId: 'ce797352-393f-412d-ab4d-68f1d8f2d600',
                systemName: '86uob9819q5cbbhwrq67',
                executionId: '4738be3a-7976-4914-aeac-c984332ed211',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 11:34:41',
                executionMonitoringStartAt: '2020-07-29 03:20:21',
                executionMonitoringEndAt: '2020-07-28 21:42:54',
                status: 'COMPLETED',
                name: 'bl6d17dq9jtcnzyv7a1223tq15e29xt8g3xud5mmnbxcgb08vqdu3psl6maraa7pqaez90watkncq5wf6fe0lddzbevf905ql6m9u1r6o3go9l63ln7r1b1wizkodiubs9fmdnr5j97fq8l26wp46hf2arcs0k27xs7hvmh82xq0s1q6v981376bvmilpxtxi0iwlbrzy5mulhyz38awko9azdigam4vd6bvxt194lkq51glp1ppa31uaqgx9ft',
                returnCode: 6844600210,
                node: 'f42cl4q1hovribs23hjgne2u74p3ju9l6g5k9bhdgjv3bkxj18ospidnxxt8qox22pw95ex76hiin32ri89en0o5r2dwmij4qvpneu5mv2189h95rtsvs4z2w1mo3xzelsw6mkxq7fy2li65tb1q4j590nye3ibs',
                user: 'f66q58tafrb158eflwuuiqhxhcgzgl7hetk4t6clmx01pro7hivljtjev8tojgmq2em21i5jgpahk8yo605l6ul50wyzmvekp46mjk198g0p1hs1ut6k54w8sxe0uvy0lldhg81l8dn6m2xusepur3bwxzuvcpnk8u1xpnrp9k6nxlbamvm2i43mmmgij4a8rw0js4dz8yszwmjpy60u3v2qlb18p8eekulcmnnlfzwmqoch393gdfcurgse153',
                
                endAt: '2020-07-29 10:00:15',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6bf26010-a993-4870-9263-58c16db28cb8',
                tenantId: 'cb75a608-d00f-4b1b-8c96-ec59158b5bec',
                tenantCode: '4t8c8x6o15yk23pegst1zirns2lmtzyetp1z8lnlzdhrmhcgxl',
                systemId: 'ce797352-393f-412d-ab4d-68f1d8f2d600',
                systemName: '40dbef8av90f8ig8pu12',
                executionId: '4738be3a-7976-4914-aeac-c984332ed211',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 12:52:24',
                executionMonitoringStartAt: '2020-07-28 19:38:08',
                executionMonitoringEndAt: '2020-07-29 07:02:50',
                status: 'CANCELLED',
                name: '680vdtsurk0ikjf2tqigwqh8m17b4pqophuu9f86kaqmqqxca126lnwm5rbwmrr68t5jt4tgn8ynfixk9sh9va1g1wu28xyii9gyuqz8l95v54950ibqrlamo6pjwvr31ftn81xckj33pqsxhuad4l940aowfnrkomm94xfet5zy56hptcegh0coisn102tz81mg82ns4o7uknt6ni90nlyqq5mgh32g6qaijbbx2g5ujpak1bmotty4rur34jl',
                returnCode: 6026060818,
                node: 'nl1l02w5bs38my4la1vkjq2qnq0d31ndjrgtfxcvmt6zagtv4hk83pjwbhmj21uumfn8336jergtl731z3zda1uvslhvbvximmr5zg9b5pm1lr1rcd24amujvuqjr7rwti021px8ccja5irhwejek2iqrsc8g4ji',
                user: 'goeri98k59vznl966jyeknqr0h8ubn8om0tuegh1uxjjatjjgw6uxfr44jdy6gwbp1hbq0r7b7bqgnqnhgexgk6k12u43vuoqojkuiq7yuveseygbm3vu7mxstb7sjmof2mx9p6sljdjdjipcup2r79emgol6sfvx7het4u5k1ngs4rka3e9z2w33q1x1ojb2x6upt4gjx7iilbkq13hl79xggu1g2anyqbo0abvq3p1n97o1t1chyxl23a907f',
                startAt: '2020-07-29 03:38:11',
                endAt: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6bf26010-a993-4870-9263-58c16db28cb8',
                tenantId: 'cb75a608-d00f-4b1b-8c96-ec59158b5bec',
                tenantCode: 'h8b54yog6c1xwewemd3stidg0u6tztkc4d5ut6nld0cg6543g2',
                systemId: 'ce797352-393f-412d-ab4d-68f1d8f2d600',
                systemName: 'maaq3t5gkf84a6gitk1k',
                executionId: '4738be3a-7976-4914-aeac-c984332ed211',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 05:40:42',
                executionMonitoringStartAt: '2020-07-29 15:40:23',
                executionMonitoringEndAt: '2020-07-28 18:01:08',
                status: 'COMPLETED',
                name: '8b0p7zaxj6k1npjpeu5sawccqo3nktzrjy4gl4e7b7c5eqcfaqkyjzmsl5s0rukvtm6giib0ygrnlf8meocgx7jl659qtqj4t44glr4zmugrnhwfvk753xs45jz2t2klxkime41tqt7vm5l30qi8f32gh1wos7kg2xkjh3gh3q225crzrpzgd972imec3vqtr7eh4c5b9ojqx53bn1r7m7kikfbu899uesn3tac7p74h4crcx3cpt4kugf4troi',
                returnCode: 6522076416,
                node: 'noepu912xpc3igoi6m21bon0o3ekd87757x672b152cuvo78yz5tmoichvq25951wvbjlrpvxjavojhxckua8rx1stvb5d82lffem7wup6dsh8blsh4vnc6uaz30010dnvro7p6zkd9hwkddspyqz8x0m5qrhapq',
                user: 'y6r90ryaxa4faxkz0oy599rnul7us7d51og3k00ezi318k9bbvcoufr2ob04kzt1o18dm8eo7btlub4x26xy5km143soevkdpy4e9fxpshy32txy19zdo5z0ip8wdhhw7wr75oh3vfsa1abxkwwfcg7wv8224u0xe5l6vuwzoq0ov06v86a7x9n701c4ydqp5abbhi2p3x1ekqkfwk1txv1twlx9urwka8934v3oq25e6ta8zmqwk1pvocikx76',
                startAt: '2020-07-28 16:57:27',
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailEndAt must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'clwzujpikil1hvs5rj6ec2sia570wzw85aoib',
                tenantId: 'cb75a608-d00f-4b1b-8c96-ec59158b5bec',
                tenantCode: '85jgkmgxlcshpla5lr6ubf3ijisq47uqokbe9roofqdkx2x6sq',
                systemId: 'ce797352-393f-412d-ab4d-68f1d8f2d600',
                systemName: 'hun19hfbfmhdj4b268r7',
                executionId: '4738be3a-7976-4914-aeac-c984332ed211',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 01:06:37',
                executionMonitoringStartAt: '2020-07-29 08:00:42',
                executionMonitoringEndAt: '2020-07-29 07:52:33',
                status: 'COMPLETED',
                name: 'ifhpn22h8d4cgxsnsk3h2l12ud3vmsappv9uaba504g57e9p94j1j8lt4bdqsqoyahzvwi7x1wfi1zj8ixos57ul8y90t1nnllpkqewbbhuw7lvml6az7x0nszuh2dmltufakmk6uvtfln32alro5gm0dni6k066y18w5uhmkd9sh10f8xar4ckjmc5yhbornof0ubwzyd9r0mfq114cv3muzi0yh0b35gzsg2l6a7mqo6kd0e0spssrfs1bae3',
                returnCode: 4995638468,
                node: '8r29ssnrmicwv1z3308b7lyc8ticd4db9ns6tmwu0uzaltwz0i437cqscxvll20q5jndhblmorctmmby9ce2a2pta07mif1tpoanoc9a03q73p9w9flph5m745uj75bpqvvcpym6yzrmx07h0s7e2b8uo77zn6vs',
                user: 'c14r9xjvx8c10sbpkjfa7wv3u2wszfyh8n6ee3405gewirj0eqvg4vv9yupxl65g08vuy9fhhse6g1lldcd79koce9j9ryh3q4vdgq5fuij6er3150uaba99kf9vxufv6ptx0m2hfes2fvavxy1bcf5wcb6s6fcr57048yqp2pmzuhruqo00p83eajlfl1b9h6il2im8zgicao8qjseu4um2u9qo8xk7klfms70b4c54z202b1w5lm0jv2u3qmq',
                startAt: '2020-07-28 20:04:50',
                endAt: '2020-07-28 21:29:20',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6bf26010-a993-4870-9263-58c16db28cb8',
                tenantId: 'r8jrdneq48jsbwicku4q7v488yhi7k9xhuqvm',
                tenantCode: '2m16vtk1dsp6k01q3wye4r6zijbac2w51xnjjxi5vanq5smtfr',
                systemId: 'ce797352-393f-412d-ab4d-68f1d8f2d600',
                systemName: 'nmo5kqkiqwe65gfhkj64',
                executionId: '4738be3a-7976-4914-aeac-c984332ed211',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 02:27:57',
                executionMonitoringStartAt: '2020-07-29 14:22:47',
                executionMonitoringEndAt: '2020-07-28 21:16:39',
                status: 'COMPLETED',
                name: 'ddozfjl181v1w1t614c6k8fu56z78d8musod58wogksqy9qt1721x6bmbzku76jpp9ua0uiyyv03qimryixcxcz4an3v8d87v8gxlq9z9f895999dclgflrkttlxvqfxmxccv2hespdf6m5vvjczv1prkkhwybpqlgd00f43eulbmkdnik3jd3umd2o6d3z0cb76432988h4agk9agjl2ynt4hw6usyen6xrkbhppwpmaj0s07mexe4qbuqiywz',
                returnCode: 5159390523,
                node: 'qk98cxy6gsg3njg14pkcb11h3uvhu3xdsldrmioes5cozi5qymaj6w7goebrbtmudsadhb2lmharvhvu9niynkyuwlnqa241c9dil3gstmv0hvl1po6f8bz2kctczvq73sju61ii4oyj1kz2vye64bwwl07dvjz6',
                user: '5s4aw08tbdfyg5blxxtffdrfcagkvhn8w9fc1e9zwhdawsquv2abk80v7c32rfbe7ep8v6lv8mh0ha5th2jfr9qticcjpouf766hfvwiqqnka6p9wc5zv0rin7cs6dm7qot5f2plc7toykxl1m7ekftntmgwl5s5yosv9eqjajzgkpt1b45sl05ud6pj696ee051czo5wlfq695ywbcmyh32tsg5701unrnwbuut0ja0cvj3whh4lh7h1zs8yhh',
                startAt: '2020-07-29 11:02:16',
                endAt: '2020-07-29 07:09:11',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6bf26010-a993-4870-9263-58c16db28cb8',
                tenantId: 'cb75a608-d00f-4b1b-8c96-ec59158b5bec',
                tenantCode: 'i5jxoj2z325uy8fguv1mwvhm7kmzn9m5qdbz180ijikrjmzzsv',
                systemId: 'thaoss1szuqc9s7fgm72qgu88pp7wcg6z8yy2',
                systemName: 'fzsivvin6awrcye5xgif',
                executionId: '4738be3a-7976-4914-aeac-c984332ed211',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 08:15:06',
                executionMonitoringStartAt: '2020-07-29 01:21:57',
                executionMonitoringEndAt: '2020-07-29 04:42:00',
                status: 'CANCELLED',
                name: 'gam58vl5dsid5eaqcd847i8vp38ripihze0zpz51m44ginrk0w1dh945i41g3gfc3aap3xk5fgr6jxrkk7bf083pjvrxhjotoi1qa41mjq95iwja8ts9q147yotn6b1v6adpd3sav0lg1zukccnei44ml5m8o8pigntq5wkputhxtz0t1d2yzw627mjkbubeq30ct1z0tusl7rnihdqz6sbwktksa6vqv2czzlf7hdrojdvhxag7zhpgky2ktqf',
                returnCode: 6014430995,
                node: 'zlz1fadq6wjct52zxoxe3cfexlr3rqet27yha5trfnopjbm7c66oafwn259hv70acu6os4t26dgvbeh3p0xytkt5rn9cd6i392l9d6ayptdah99187yfalx0z4rfnsrhnl8ylmz9a8nuyovjf3hunystfd0swmcm',
                user: 'fukby6gsaznylaumpobjxrfjpnh8nhrm7u17sme52j4yj97z2u4ek9fj2qy88diao00mc6spdfxpp3v2kux8uq1dl16cfpppm346kytnk6br2ozoblkmx2zk3yoqwgy812a7f93yp7acn8rhmnkakdr98e4vnrlf6r5fdu6rnkofldozh1gzkjtj2oj5g2szgsqmifftftfu091z00zjt3kdfny5lge2nisqdsvroefm8yuyu2ukyu6mcaid7pv',
                startAt: '2020-07-29 01:24:47',
                endAt: '2020-07-28 19:03:13',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6bf26010-a993-4870-9263-58c16db28cb8',
                tenantId: 'cb75a608-d00f-4b1b-8c96-ec59158b5bec',
                tenantCode: 'gdzqyua107rav8hik1dek4lzsyhy0a3aiok6edju9bkk5zmjd3',
                systemId: 'ce797352-393f-412d-ab4d-68f1d8f2d600',
                systemName: 'vns1dn4lsffyvja4zk1u',
                executionId: 'immvhcxgtkgkqeme4w1qj8gsu2oxsdzpgqtid',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 02:24:11',
                executionMonitoringStartAt: '2020-07-28 20:12:27',
                executionMonitoringEndAt: '2020-07-29 03:21:22',
                status: 'CANCELLED',
                name: 'nr0cuxlbz91c46kyo3d3pa8cge04xicrqra983gfpe1h9f04s7k8gxi5sasn5u3yxmdrwr5xvsa4jv6w13rllcv5he5nb01dh15mntob2nfenscrtq68oavuf1iq9zvf92whom28jpzncyhf4v7slfd8y722rhemk71m5cccfa0sgb7qacq69llj4sktg67x63jih6sewq5ss3xl72t8w1uptu7yrn9ifnunk82jd01oz7kph7zs20jwiir6mqk',
                returnCode: 1005486454,
                node: '60k7pgpjmhc9juwl17brbbr1fbwuvp2q81g1eeo8yk9cf8665rt6w5j8hfmgj7uzkhfw39m4tf6nlw8tf849ok2gaosnmsoxbfes3tvh7lwlkldf7jhf2e7pugvg3v38jxz4pk2soj8i3zff25ysufzqoxcazdgj',
                user: 'hixmbpgbgbo3z6wezbroum9etq0a9b9497sydbov3l7lo074wf6vi68wwdj6neprdhqwawevb2gbxgobxhfk5l2jv194sz98cgyoct3sbll441w6jnrgspzdey25w1r3or1ogddzn1wwjtevyc95uq1xork73uo0dr07u4jvlo6x165uo286fqlqxdnzj2t9luopru9q497fh4css6t0nq8tiksmbj871ysnoix616npvon20ra4qy125x0ei6t',
                startAt: '2020-07-29 06:01:00',
                endAt: '2020-07-29 14:29:44',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6bf26010-a993-4870-9263-58c16db28cb8',
                tenantId: 'cb75a608-d00f-4b1b-8c96-ec59158b5bec',
                tenantCode: 'ndb4eqyerj9z0k8o2ifq1su4pdsfrcq4jdjf3jo9r6zdx2xwobm',
                systemId: 'ce797352-393f-412d-ab4d-68f1d8f2d600',
                systemName: 'i1g0s1l069woif22889n',
                executionId: '4738be3a-7976-4914-aeac-c984332ed211',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 06:13:12',
                executionMonitoringStartAt: '2020-07-29 02:50:30',
                executionMonitoringEndAt: '2020-07-29 02:38:57',
                status: 'COMPLETED',
                name: 'pdyokbak2hgqece2r9iizpkto74huy6pi6j3r9tl8ye9hybmx3lmam4kiwjm00675ngxe6pbfbjtismhv8bmp5tp360a8x9ejewt9bfa6keu9lba6a4d6cbvmsuquu3awsvdilgp97y1l453w1yabcgmq1wxwsp1ry2wpcykmu8b9bicjijwh1a7lig61x4hjo1tvshw40lguwcmc1n000wuclfchehii43898brt5lc3ax9gnn3c1e3nv1q6uc',
                returnCode: 4828391293,
                node: 'yy1zbxqiyh19go2pf0w1xeyla030ydx6aiwzpcmwu9j9e4vsh47kca9cdipr9oqv3s998hxp3k5mg9roc2z5qe8z0wizvf74absirvvxpwdbka36vi281x0ewnpbwwio65aa0l0t75uoho5e0b7dsxv1ud35ex1m',
                user: 'x3a5fuw4q5e1p076ht9aqada0qft3526fcu0vpzeqjn28x87lel9jizbphrs917cz1qjrcxfevx1rj7wtraiuuomu84rctfelrad3ergfz6w8uynycxx5vtudd3h5f64x4t76dgi7gxl32974lgypw9uhrxujk3poa1g83mlasp09nhu6kc06kfgganu42p769vbkvudaf3vtjsc7rkutfh1878e8y13lijbhhlbwzjw3tv9837k67xpzimitjq',
                startAt: '2020-07-29 08:21:28',
                endAt: '2020-07-28 23:15:55',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6bf26010-a993-4870-9263-58c16db28cb8',
                tenantId: 'cb75a608-d00f-4b1b-8c96-ec59158b5bec',
                tenantCode: '7o6jlm3wa7r34rlz21m5c0yj8wr0l3wrc6q4iy7sbsjx76b915',
                systemId: 'ce797352-393f-412d-ab4d-68f1d8f2d600',
                systemName: 'pyoph9dskdo0l5rhaxsri',
                executionId: '4738be3a-7976-4914-aeac-c984332ed211',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 01:07:57',
                executionMonitoringStartAt: '2020-07-29 02:30:32',
                executionMonitoringEndAt: '2020-07-28 18:57:42',
                status: 'COMPLETED',
                name: 'ibsnvwe03e484u0uu14axmya81plknu4h6h1x4tsgdjzbcwr621znakqoe3xji1w70i0ricjk0ln83bgq6cgrrh2gej2sc37y4ds7fgdo7elc5v8zthrl4m5atwribdmiqxkj9vy1bbspqf69pn0vyexqctlanh0wfu0uw7gow5ifm95uw3i869cokatdn9im629euu6vr88kmj7a3rs4zizrc2psp6m86zj9oa0131cqen93ceuimovo9dzm50',
                returnCode: 1197156227,
                node: 'ofqi86m75kxlft6bzmq5ldiz3qbx48i6q3cxnjire61ht4z3c63edmpryiait5bjizzh0i75lp1qf5diozepufavot0od4jhrsncu2m2btbdu1ovnkk6qy00gfmwqu2oda3glcuswnciareet5ys8t7t042kdqy5',
                user: 'vjvh44r6lll14sip8s9xl7a500rcnsez7eir8epa51up0c2bgluhrjmcj9s4j788tp9d1opru52sc4q7mqp8ljbp7v9ybiql4anjgwbgi7dfphkxj3fzo9ohwvv90pdkjk148acbdaukqsov257ep24kli1sjw601zqng704qlr4uy122lh2sl9t0b9v4o2lvixq82at93m4dobyod1b4u61extgbkqrkxvpu7mc8fgkn6ta2c3m6ckg2uevl1q',
                startAt: '2020-07-29 04:13:38',
                endAt: '2020-07-28 23:08:57',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6bf26010-a993-4870-9263-58c16db28cb8',
                tenantId: 'cb75a608-d00f-4b1b-8c96-ec59158b5bec',
                tenantCode: '544nj2hmychyejtn00pe3izwotjzh2y10u6grnbs7188i2cmf3',
                systemId: 'ce797352-393f-412d-ab4d-68f1d8f2d600',
                systemName: '49o4jqt6ik27xv51xwss',
                executionId: '4738be3a-7976-4914-aeac-c984332ed211',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 14:11:02',
                executionMonitoringStartAt: '2020-07-28 22:55:31',
                executionMonitoringEndAt: '2020-07-29 15:38:49',
                status: 'ERROR',
                name: 'rsxpimx92zbvjyndtc0u2unxnxng3uea69368blvnhyte6wak8xxlpnadagvuo6uk88vqaps6nu5awvijc2r1fixi2op8tf6h2vfjy8bscoki8w97f3kysnaxf1hoqkmxx53w0lcnhquba452djvyh3qkgp9kgfpatk5qelhjrwzvucf6yqe5u8g96b6r3zi13nmjc79vz7pe2iwchzk9c76cvz2sn34ue0y22xyyoub1345vwpp9cuqz9yhbhpl',
                returnCode: 6975603175,
                node: '0hqaxnlmynqkkhrbgdtcigbg85j4zr8y2tl8j4hn240qc1n568ucv2ymejnwv9lnmjkqjw61k4g6hzqi4qdirc2vt4wirc5mmm7dz157m9pc5bj7tjoucp2ij4g8jcncw74qn4jb1np4z8ug3uawh10jhpjs7bph',
                user: '0g4nudyl646tcdz747lder1yowa7a4xh27d4eofay1lu8p9s91m1qqgjjsmvgs0f8uwd83qf2u28pysqiovnod70wg6ieja1zjmspjelg41kfg3qdz0w7bxrneia55a8hdokghyo3w0im16wwci6ewp3fdwl58ze481y72a6htjmuy960krbjroq665vad7hk4ktz3pytuaiqyce78o0qwqnk8ewb1lzp85jq1i1ox2206hw8jqxkrjpa02kvr5',
                startAt: '2020-07-29 03:36:48',
                endAt: '2020-07-28 20:11:19',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailReturnCode is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6bf26010-a993-4870-9263-58c16db28cb8',
                tenantId: 'cb75a608-d00f-4b1b-8c96-ec59158b5bec',
                tenantCode: 'meihl16opeaygodbtdlm1839mdxckfhijeiawvsz6rw96oj9xw',
                systemId: 'ce797352-393f-412d-ab4d-68f1d8f2d600',
                systemName: 'u8pq7vt1xvlrpj6exs3i',
                executionId: '4738be3a-7976-4914-aeac-c984332ed211',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 01:11:39',
                executionMonitoringStartAt: '2020-07-29 11:21:23',
                executionMonitoringEndAt: '2020-07-29 01:35:08',
                status: 'ERROR',
                name: 'eqkpmaasrp7fa4m9ab7c4wmfsma9yeyej3bpzeb8aepkdk3tn09ei9ita00lnkoqrb20hv8rjvfdkb3v5sbb5wupaoxa376gyjls1rha0eexoxm4obmzg0257gqoxqsx9a0i83y8680bdd1teya0w8n1kdnde5lj89ca7rfpykoa6hjhmhexmiwnfr3ym4f3pl0eiahrv5gycferb7uazyj51nibt9z1swm59sf7x0x7ptksrzd538ccsrka0x3',
                returnCode: 17144553255,
                node: '5qbyavgu0ens5crxei7gt8h6fw88pah6tk5pdiz0f2wksyh8cvkcuttgoqr1zzgv4qud6w8q2aap6rg1bun8pfqyvh1g0h4t4no9jvhqwzy29itxwmjpjotq6b28uiib0h0jv0zpbjc0ek64j77lehz517x4zim3',
                user: 'j6gij97iducnqnacub7zzpf97wodfw2wcylucro598fjrxe7kwovr52n4xab0v6d10u0mjgx3apeaxorzepetnyu2ewnjj7vvb5xw9pj03ndje0n18h5l5ufi761zs2eg9dqa95sxqdfhxegxe9b63epexa68nbf6u00bxq63eyt6ac2lcd9sb4vb743pa8w6us3opcylk61ckp56yuam2s3n93bnpra80s88ujr95cawvkrfhrep789msol5vs',
                startAt: '2020-07-29 01:25:56',
                endAt: '2020-07-28 20:51:20',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailReturnCode is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailNode is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6bf26010-a993-4870-9263-58c16db28cb8',
                tenantId: 'cb75a608-d00f-4b1b-8c96-ec59158b5bec',
                tenantCode: 'fdtp95zetyl4pbhyczj4qths20ammfl573owerqkhx297hrpvg',
                systemId: 'ce797352-393f-412d-ab4d-68f1d8f2d600',
                systemName: '4wb1hibm603symb540tm',
                executionId: '4738be3a-7976-4914-aeac-c984332ed211',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 09:02:08',
                executionMonitoringStartAt: '2020-07-29 06:41:52',
                executionMonitoringEndAt: '2020-07-29 09:01:45',
                status: 'COMPLETED',
                name: 'wp0c3usjwz7ly84k5y4h8vx11vppebg0r1070hjkvh6vohyif3noc1gc0f7bsp0eb1uh0vjogmsncfuo9naizg3nqrcb7xklynae4lum4rxqojs5qfouex7zfz9ol0246eje4mofnrakf5z4slfm5omn2f14vn7ejp2uur25h5711yin606n8trg3hy8b0j7p8no87b3avar5fuaytwp4hxm5q2kk7km46j987gmqf7u45yf6kx4ga88l4lthqp',
                returnCode: 6753681302,
                node: 'a4tsgbhxkc2kunqbvq8twxaoankr8dw00uho80wqchkwxlirfn1921b3hu3zudcjsihreg84bu22nimn2c6pmej7kgnf9xp03rgopmpmzcllw6ip9j46lefo7583yjrh5bxfnhpdxmlf8usyuhx0ifw3zkj2qdaeu',
                user: '03st0m7iml63phs522juaw4uqjkgmzfq24ykwfikr6uzimejrvz3c2l8qn5gyn6r15i8tcpr5iscb7do8fztx10ufqpb4azipdk5rpk2n3whbf0fiamo5ydn9kvor43xbgu5boc5bu8atfrxgwj05iuyux3t2m3xytkeqigusefpezzp4g1d7fc92xo3ipq5k0r22jznsyu93qt0qrx83d8m96tbqw0n9iarhoecr9wrbuibdn1wl3ytpgttlkc',
                startAt: '2020-07-29 07:41:58',
                endAt: '2020-07-29 14:00:54',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailNode is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailUser is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6bf26010-a993-4870-9263-58c16db28cb8',
                tenantId: 'cb75a608-d00f-4b1b-8c96-ec59158b5bec',
                tenantCode: '8vhtsxkbvhj7pwmfurfilgi7eg7ga8h35i2xunqvefbsrohbww',
                systemId: 'ce797352-393f-412d-ab4d-68f1d8f2d600',
                systemName: 'v3ehtz04p0yo16z4c4ax',
                executionId: '4738be3a-7976-4914-aeac-c984332ed211',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 21:10:31',
                executionMonitoringStartAt: '2020-07-29 02:25:29',
                executionMonitoringEndAt: '2020-07-29 07:34:25',
                status: 'COMPLETED',
                name: 'ojr081i8m6sf3yjksjbo77ozpj290l1gjax8ivfsk5ndvosi4yo2pzi44n913kehz9x16bwri4p8bkdoaou8z1txl3ykzes0bsuvzz2w8nuy0647n9kkfcvh8a57qdaomqbptrvuobpdgcn7h0cmnc3wbvhmt4gbrtzqbf5z9shi5u2ypg3pw80ga0sf26wi2k2dpb1axfo8d5tyz4343arsmw92qcmhzwzskwhg6h66mbnidvbyeozz116zppo',
                returnCode: 1993425401,
                node: '9ymrbwlvhe4cmgvxn2pg9j11mk7gjgx3h5yapei4xc263m8d5z42bv6a9ymp8qotvvyd4oxp6584qy3bcvrpg5sjcjz9riwfw4tj5lqxkgdvd6n9tvp00v04l05dp5x9ioaorkut9siglvmgl5zfl7ie7qg7m4w8',
                user: '2ghe6oj6sl9n9nfgb1ik2d6scquwz6popxr7lson87yxwhc91ihpcdfq8z79dgpzqr0jumql87ddvq7xsk07k5fy335mxfgqrgm3lhzw5hj61n8edc7y1s7mozf9yxiguudhw6ineh7clh5fhwpmfndcjf9v01bid9vuvgrkeloe2ykvqexdwufbu4nqxsg9mzpurph7lj5v2v5t3ojptbwvt6jpfxt1k7hbcyhe5zuz99w5cqpyalvkemwyjsg2',
                startAt: '2020-07-29 03:25:05',
                endAt: '2020-07-28 22:40:26',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailUser is too large, has a maximum length of 255');
            });
    });
    

    

    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailReturnCode has to be a integer value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6bf26010-a993-4870-9263-58c16db28cb8',
                tenantId: 'cb75a608-d00f-4b1b-8c96-ec59158b5bec',
                tenantCode: '615g8ks1roq6fbco65qf8qge384q0kq6rumoxloeg9aejzmlph',
                systemId: 'ce797352-393f-412d-ab4d-68f1d8f2d600',
                systemName: '2ke12oarlbr9ywkokal7',
                executionId: '4738be3a-7976-4914-aeac-c984332ed211',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 12:04:42',
                executionMonitoringStartAt: '2020-07-28 19:11:31',
                executionMonitoringEndAt: '2020-07-28 18:55:41',
                status: 'CANCELLED',
                name: 'c9stwnpk9typek6evjk33dk1x11gblz0gjm2xc5339x9kebg20lxyxifoei8zm7twj38cnjrfrd5r2n8e9ja5odqzktr9rqu2mu4yms9mphxnonymoksaanw5omtwedbcfvaf26m7fkr5d3yisvqb0k0242bo9gp5fcbriyxnqj5sxq1wlink51foje3q0vu3b64kikwwkmic7ayynzsz0pd64y7ug403smcbuj5f2smbx9icwqs9hwdnfznrkb',
                returnCode: 100.10,
                node: 'e8lylht9u8u60ypsmld8fawocz7du5ks67bbcm1abg11xmtrzsizgiobekenh2gnr1aqld0ydt9ij14c97tx14kzi8i3prf0uqzi7xfkjsguwfftjsrca523pcr4oxkcrlzouu4ljbynxhfnpcmt6iuvlwu007y5',
                user: 'frifmb5znan4wi9dap7c8i44sxbgcu3gqcf35g4l9kad37c9i7o4j93l2uy6s48j0xygudv6u8pt7thqvx2yb1unqkl9d8o9xakgxxh9ol9a73q3a98znv1r2dhfzvxams20npq3oe8nnb2t5gqc4keq5v1cy70ne7s8kphwdgxwu057tu6h3hsfotdqp9cf9svkj2ccyayyjylev1e7ea41ss5gqyljo6uu3ataulv7fx5jozzab06ceaapykm',
                startAt: '2020-07-29 04:41:17',
                endAt: '2020-07-29 09:29:47',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailReturnCode has to be a integer value');
            });
    });
    
    
    

    

    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6bf26010-a993-4870-9263-58c16db28cb8',
                tenantId: 'cb75a608-d00f-4b1b-8c96-ec59158b5bec',
                tenantCode: '2jcsjicv40iros3x63tsjp4cqmhoplhpszwwdjwn29jas8p139',
                systemId: 'ce797352-393f-412d-ab4d-68f1d8f2d600',
                systemName: 'xb2jnq0zcjzs6qwf0kp3',
                executionId: '4738be3a-7976-4914-aeac-c984332ed211',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-29 09:29:46',
                executionMonitoringStartAt: '2020-07-29 07:40:53',
                executionMonitoringEndAt: '2020-07-28 22:14:18',
                status: 'CANCELLED',
                name: 'j6noerjjm0s76xem6vojwnc0t0syyy26f5p1qr0lo72au7am7t9ermbs475ppqej2t3w37wtbqb1rv1rjwde5cfcw5f2us4ro0rl22l6ujmeo4lc4b5varcbe2ge4dppkltxew4hcs6ga022k2h27mlh1e32k4euruqxhgq9c3b5q919etu4obypn214uulnnmgr6t51n31lon85zs7hlrc83xcgqocgp6g4pm70losmejhzl9ctnre1gh52cyk',
                returnCode: 4687227311,
                node: 'x0pnlmzkqmqv850jy0hqmly54kw3dcenbogs3iw0oj4dxjhg8jyb5i08q17orhj8oz417prsqm0reyjnnqgae3m5kayjz6rt36fziygdeifme5isg1wso8q2nrqvlxe36m3cslv4b2lfpyib2nwcwa6yb9cq0kya',
                user: '05oomo3013vgq9o8uzn1dxo26pkwbemqhmfoz5gwnd85uwdttb486046u6ts05cizj39cbedihga51ftweo0qewl11mthubrsp1mfhkr0vakx8499pchfp1h2h1h7hyz963jvmr1zf1t7j7u6l3k3yrlpxbpu9cl9qyh7mk3bjtpbephrmon1h3tme1qqmwx8wel1chaoidmhn88muj3k8zgzy8af4p7u86jh6u05bell3eb8tztc1o7ogerixd',
                startAt: '2020-07-29 00:47:58',
                endAt: '2020-07-29 09:32:56',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailStatus has to be a enum option of CANCELLED, COMPLETED, ERROR`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6bf26010-a993-4870-9263-58c16db28cb8',
                tenantId: 'cb75a608-d00f-4b1b-8c96-ec59158b5bec',
                tenantCode: 'g4yzx3g7hiaydzn0ucock6791ebmesax5j9gt0jbb5uf8k0hd7',
                systemId: 'ce797352-393f-412d-ab4d-68f1d8f2d600',
                systemName: '0l642jzonkzx3nou7lqp',
                executionId: '4738be3a-7976-4914-aeac-c984332ed211',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 13:49:34',
                executionMonitoringStartAt: '2020-07-28 18:07:12',
                executionMonitoringEndAt: '2020-07-29 09:39:16',
                status: 'XXXX',
                name: '342y8h6mik1v1rocuw1yx9efxnbnesmnjgt8qdujhdpx5iw3rdg0gfymgzo5rwcobcmdgiuu0roy0t31wgcdx0cmtnqj4cqvar6034goq31yalmyzk1nm4gum8jquv9l2ykiblcy0ut6mv6mx8o6qzgn8i1bvyoyfdqzis3f8ql750w6ty2ordpoe8kpp4w13kokk1vzkfodett79f4cp4gh738cdql4uxxkb41e97bqeuang18js3g7zhzcwpi',
                returnCode: 3725052865,
                node: 'f0dxgfksrahwkwt7v6mzy58wiqtqmdaaopd6wg72dlyolmskkblopmehe6b4yiqm9zvhp07db9j6a1qqo8lczyux8ychrvvjv5bwkhe7zjmycegsokefiq1ntcjrz3jec57ww6jcl65ynlv33qrzp47ao1jftt6w',
                user: '9zco8ugkzlklb3olx418sqyf6advhuwgnng09wkws3yhyfn3ksyplb3tvya8rapy2w6wli8ghur7k3wgkgupvebrsi8sxu4jkcdbo4a2apcdla242t9n6wqovalh45t5am3ee4g6cl0orliw9otes1pxfvoz2xmaj6sbpq2pzvg2gy7yxtfi25yt72nyi2nf0nl2yt1r1wk07fiicvzxhw7lw17tl6pdbcqldc4ormyh4j8nnmmhozgdvcs5rzw',
                startAt: '2020-07-28 16:10:41',
                endAt: '2020-07-29 08:24:24',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailStatus has to be any of this options: CANCELLED, COMPLETED, ERROR');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6bf26010-a993-4870-9263-58c16db28cb8',
                tenantId: 'cb75a608-d00f-4b1b-8c96-ec59158b5bec',
                tenantCode: '78z2gc9z18gccvxd473u0ke9fazm1ohpik50sdszejv9z85pn8',
                systemId: 'ce797352-393f-412d-ab4d-68f1d8f2d600',
                systemName: '8ac4pgppmryklxxzc2ro',
                executionId: '4738be3a-7976-4914-aeac-c984332ed211',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-29 02:56:17',
                executionMonitoringEndAt: '2020-07-29 08:35:22',
                status: 'COMPLETED',
                name: '4wjo3e8nrgwpbzq8zorlq36qz832020mjq4lyce49icz6quilifkzik88qd62zb3n58fjuma9s0tfblve9mgd5n7sp7us4xwlq7su5jhkd881eaotqt0gfs2ed9ssk4iqzx4ixbwce1iyol0xcmmsq2mpvvr210x9ygol6733se4ny3r3kt7hxonxi8whpv2xrvxcfsf7ccs91bj3ipfka1rv9dtnggtrr42mrglau4xpf152wmr6g5xiniqmhy',
                returnCode: 5744899604,
                node: 'xqv55bp5uszt8gkb97abw9bd6252fjk9lf3zrfty2nzivo8b4v12nz7mcqbnp055mo4nfozxsv27j02ozyrgi2gwleterzka8hjgwseh32vsm3orbgg4nh3ticx9cdl16hyucm4nd8l0q9xvfz6uw9bn4ibk31jg',
                user: 'g02h4jfpwkitv2wcca438j54hgn7wxcnv7prd261rq4xcfxzyms1q7h34rtlcy5rpbr0vvjg817nbhuhm0cb46hmf427npl2208yn242qir60wsekx947tgtibr9wywqckgxrdvz5caz3cdxvsyv8dkubfecw0utu26o257mik855mdthy90miadlndpi731dytwx5f69van82o8gfivfeeaii6q1l1aoktgy1gg6izbf3h040dhyqenlrcd0l8',
                startAt: '2020-07-28 23:50:06',
                endAt: '2020-07-28 16:36:13',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6bf26010-a993-4870-9263-58c16db28cb8',
                tenantId: 'cb75a608-d00f-4b1b-8c96-ec59158b5bec',
                tenantCode: 'gzx2ltovsin2sk7pqduqan07o12zg0jhz12nw92m078b1k8lwn',
                systemId: 'ce797352-393f-412d-ab4d-68f1d8f2d600',
                systemName: 'bysut9g56u48bp2tbuie',
                executionId: '4738be3a-7976-4914-aeac-c984332ed211',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:05:23',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-29 04:08:14',
                status: 'ERROR',
                name: 'fq6a7ab9k1qnntu42mgxjbsl8whpppyxm93sfxsti67kjg1z500rtfwg0mv6h54h3u8oc3xqru5mo3amife1b1uqix92x2zk2dlv7nr8jlh03u0av0h6zkc7ng5vnqayikbfd17ch3cfltvjjf8b5ilr0fiuva3kzta7gotgwm8lizc9pfbhzell1pn6ldwn0cx4uzajnsyg8ya0f6k5hf6ti8trmragjvm4t6fdzaa6cmss4ueea1d9kcgw93s',
                returnCode: 8570215770,
                node: 'rpdmvkdlztoo21johuydfjawlnjv5z4crf4va4gvl5p8exv0uxugnl6g0yohmmh4n1x6nqik2ujb9eopcfax0eq0inn7cyip3derbq7nxsz4pylxx0ozl733unu8t79gayy2b11n0uaxkfnrswaxkm8c1l8gizvi',
                user: '8daqpr08yvj97cimoypk6kzllfus00r1hwbfhy2s4pcso5imf4lfj50sz34taoonfwpq2l5ftzktrqjdewmcio1yo92w7l70sd0zp2jpt7j7c71o2u9zc0ldecom89d0ytxt2807tdjvkpv5x2b8e8kf4xeoo07fftv0u70og2wzvq7dgerk9w5hixn01amqfwy2lfiy5ue7dlhuxt7tcw47qdg3umncponu8jadhd7xpkj16uylg5uu9cbs7ff',
                startAt: '2020-07-28 15:50:32',
                endAt: '2020-07-29 11:25:23',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6bf26010-a993-4870-9263-58c16db28cb8',
                tenantId: 'cb75a608-d00f-4b1b-8c96-ec59158b5bec',
                tenantCode: 'dsbe18pzoferczouite1q273mk50f9l5upp5x055t82ipbt24w',
                systemId: 'ce797352-393f-412d-ab4d-68f1d8f2d600',
                systemName: 'y2kuz2adkjn7qyrydoae',
                executionId: '4738be3a-7976-4914-aeac-c984332ed211',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 16:15:26',
                executionMonitoringStartAt: '2020-07-28 17:15:12',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'COMPLETED',
                name: '5i7epw5j6qkwbmirmb5ulproxyy7fuusbuh6o2dobycvd6ibhscuo2i31r9yba8t3zx79tco52twznyovne63p8a0dw0obw67ey2svpih3gtrvvtt5lo3itm6tyt1ykeivfhud65w45dirkguedgqwfp165ewnd869ehc2n7ezad1lesytssmfiu3h6h78x6aci96ia243nuqd8uu0zrnzmrtwdesxkcunfmx5r2nwokdcrzb4hwy92iyjggudp',
                returnCode: 9935105175,
                node: 'pjwfcaico0zfo12j9tw49tprd5xrq1ow8oeliszdjbecyw44wz6xjmojs1x8o28hxnabeyfyvr5imx46iq0cgilxnzrc5492ynn63shwqdghosf4wgtvmkxd26b9srulrcuwqzjfzvwgu82peg45abn6szerzx92',
                user: '7qhbxkqp24yqnzley7g81lqcayxksnt9onhfnttoafzwci4cgofq5c8wgozkff0nj9tqu040sqzmgp5br5crkeyektyb1q94y6xue4i3zap2k969dvz4qzs2p8eof8xwqfhrp9gag9hismv3y0wzhe9ixn1yg8f3lwrnsp4m3zbab0x52o4hpwp4yag50atu5683y8tk4jd0n2kd5gc2z8ep8c7d937flghnke6t2kex9i83a9l174ojxdu2bou',
                startAt: '2020-07-29 03:06:36',
                endAt: '2020-07-29 09:37:35',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6bf26010-a993-4870-9263-58c16db28cb8',
                tenantId: 'cb75a608-d00f-4b1b-8c96-ec59158b5bec',
                tenantCode: '8cckwpmgxz63qes5x6ku2k9ye7xd1qie5d3cusoo6rkiynji1f',
                systemId: 'ce797352-393f-412d-ab4d-68f1d8f2d600',
                systemName: 'nfdi3bpjet2dgzqg1bte',
                executionId: '4738be3a-7976-4914-aeac-c984332ed211',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 12:19:08',
                executionMonitoringStartAt: '2020-07-29 02:21:53',
                executionMonitoringEndAt: '2020-07-29 09:29:57',
                status: 'CANCELLED',
                name: 'z2mjugk5559owjas6fk1476vacawmdkcoz4xtnxzhhl3u7nmqiag2sieyybtsinh1jrdkr6za5a2sx4094vwftmf33pw4sphttgcyyvfhorcvai71xglictg1aspio8bzuwkcftwcfb2ksxwr5v62jd9c6egtjs6eunpqsdzjmgcs6qsm1xlfrcxuppfbgo752kf8c47hn2613k4r9ctdonz0r9ax87fn3gz76vmud0gu6tyt4v403qdtixf52s',
                returnCode: 6327963524,
                node: '5ia5dmsmwh9ismjz1nq29ni1klrok8g211zz169ivqf90fpi92xj86bglsx3kxl8mc2g0jnp9uk2d215dqp9ibld5wrm1yjcv3rp7pdhynrm8c5y26bdhtvvqcav61h2xy3rvjp43d4r66w9p00qunguh2950upk',
                user: '1ho5rfepfiyx80hesik35avoozkrg4gsxyu4v5acmggxz4kxhu47gkqhr316wsqe9wiw4ka5tbj6124n8vbz4yxpr67ecahhd6usw81641o4etqc7tv4whair39fh43kpf14c4fd8uajab0dqkvjb2elyvohlqhuf3u4qn31tdxi9dwo1ybkdab39k1vi5wicx1thvnv5qp1auqv6uiw4tizgv0yy8lwz7d5xfpwfhhft59dp70csvbw8aherop',
                startAt: 'XXXXXXXX',
                endAt: '2020-07-29 05:52:44',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-detail - Got 400 Conflict, JobDetailEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6bf26010-a993-4870-9263-58c16db28cb8',
                tenantId: 'cb75a608-d00f-4b1b-8c96-ec59158b5bec',
                tenantCode: 'lrecdpt85js50266jlihcdld8dh04dnvivr4iuuqpm2o9jslyn',
                systemId: 'ce797352-393f-412d-ab4d-68f1d8f2d600',
                systemName: 'xs529s70pjqzdxokopzl',
                executionId: '4738be3a-7976-4914-aeac-c984332ed211',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 12:22:16',
                executionMonitoringStartAt: '2020-07-29 04:05:26',
                executionMonitoringEndAt: '2020-07-29 03:15:41',
                status: 'ERROR',
                name: 'cafks05zp5cg01kfu5ewtnu9pw3v8ms0pbzgm6el3x2gs0y8oyh0wfhdhmx8eiez2de0zfrz6s2iedbarfopqmldi5dshaveq2kqwogp98c0623yk4vnjafouk2vcfq49sd5hraif9z7ci8gihhdibdeaj76tzucrwi7y3e1lqme28qht1b7trjz9rs3adcqoiiwy757aeurwjx61nfsiknmw4pmypi3sa82yds8s802b5jlcjisg4wvy588d81',
                returnCode: 6955362386,
                node: '8bbtrriyn9mn2yw5ojowkyidy0qaqstpd6qtr2pdfgl80ig7j5c3m3eyuxeidlmd54zxqcqhu4x47iczqjgqgfsiwtzs485fwsvs50oyoc7xzk9mz6o1xdz398d4d8l011iw2cq6o7v44fdqceskyflz8ige8s33',
                user: 'rbbvf17pj88e4nua26p83vrrna6bbq6er0ezhbq6ifcih4pbjtyhffmfl1i7whaazj4wfxejiumoulshe5eyf38gdr9xpbf2roonxj1urettvv1vvy0575z78hf9o6vtrwpl0n1aonllyv7u69xwrmhltjlh0jwjan9eaucazkemi96eh72k4ij99dnd64we09s3h8xiw44ho427uli3jhtumpawtk5ikhl2nnkl9rezeo8d18hkui1gg4bplz8',
                startAt: '2020-07-29 03:39:31',
                endAt: 'XXXXXXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobDetailEndAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/job-detail`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                id: '6bf26010-a993-4870-9263-58c16db28cb8',
                tenantId: 'cb75a608-d00f-4b1b-8c96-ec59158b5bec',
                tenantCode: '6abbr7zjgmox4hglbgbyfdxnb1kngtecp67s1r2lxsvjtq7h8b',
                systemId: 'ce797352-393f-412d-ab4d-68f1d8f2d600',
                systemName: '4vv282iqwdqzr800zkfl',
                executionId: '4738be3a-7976-4914-aeac-c984332ed211',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 08:00:51',
                executionMonitoringStartAt: '2020-07-29 04:58:57',
                executionMonitoringEndAt: '2020-07-28 18:29:34',
                status: 'COMPLETED',
                name: 'x5czrk1iv2gehwdkdilallkzc3k5h76miwk4luj940jqybwwpsatx7kztac2rosa7qah6i46zka3rwh4j6frvpclj1vjkzwvpu6ql9es2d9ruq4aww30lv3gn9vzhvcez4mkc2rf2u9yi4av3zbcmhwfr8g5hu09qy3bdz6cles5ueak0v9tbj26hf30fr83fm8l4jsvhdslu5egv9dv19tcylyo7jpfzdj92wnzj3gbvjj72nqw2po4gedmsa0',
                returnCode: 8110047188,
                node: '5ei1vw87do4g0a23zh9lnewnea5dis1sft7np0bdrwdscghr3htefpioyt095sdc1r3we51xlj8greopi9tqp8j0j0ocgr9wmgm0kljuqiw95oceeln3x53uvjtf7hy5xd0y2vg8kap93qdh8gvd2b5m0e8zki6j',
                user: 'qbyk79ssqklyslve88r1438c5k0tue07txnu9cpepo2qd1xz21r56tm9wfknfbalqre11rp88nmrs4tx1mljspwi5sxrfzqx1fd08qlacdfypg78p36nyrfg8baw3y1tg8nrybuzuzmthngtqu0fh73r45457b4cltahkhvuzg0e8b8tcterudibp1wceknctvv99h41ptzyv5ohuyaw7k52f9onnhy8ixuv92zpw9l9lg4dntvm08dtimozdep',
                startAt: '2020-07-28 17:41:12',
                endAt: '2020-07-29 03:16:25',
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/jobs-detail/paginate`, () => 
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

    test(`/REST:GET bplus-it-sappi/job-detail - Got 404 Not Found`, () => 
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

    test(`/REST:GET bplus-it-sappi/job-detail`, () => 
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
                        value   : '6bf26010-a993-4870-9263-58c16db28cb8'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '6bf26010-a993-4870-9263-58c16db28cb8'));
    });

    test(`/REST:GET bplus-it-sappi/job-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-detail/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/job-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-detail/6bf26010-a993-4870-9263-58c16db28cb8')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6bf26010-a993-4870-9263-58c16db28cb8'));
    });

    test(`/REST:GET bplus-it-sappi/jobs-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/jobs-detail')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/job-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '6233d513-e553-4472-acb0-b0f1c49d449a',
                tenantId: 'e14459cc-c0ba-458c-bd6a-520b9b6a5ef7',
                tenantCode: '0mhcrdso2sugtbu2kze8ef1792x3ggnxd9yi8lauknoz61938b',
                systemId: '34e5ab45-2488-44af-95d5-933cfbd6e9d3',
                systemName: 'wcd8prfihz6hdiihqdm2',
                executionId: 'feb5fb21-bbcb-4cf1-a027-dfe366e3d3f7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 03:31:18',
                executionMonitoringStartAt: '2020-07-28 16:26:31',
                executionMonitoringEndAt: '2020-07-29 12:40:51',
                status: 'COMPLETED',
                name: 'u9leiyohbpzx865l5w2b21z7fdfkwmpy2ag6neqwn5zr0a7nkyiz1tehjuw4lsxquuvitaeqreyxfkvrdaf1m1ftnqf2dudoaj8yn27jebwlpnk11fpqp2nbwzz1cv3u8na79i1bbc8fiuab72ans796ce6pypo0c028xptsd4mtqranmfv2dcuca851yxlq9gmugcaot34ccifi9ahjfzdrfy28m34negxnupfir40qb92g75qhghda3f8w8ly',
                returnCode: 3372927691,
                node: 'ppzx90xtfn5mhr17vtonen677t6ex9rj1g60fi0f72zatk7qte8jn8ct8qj4m1y1gya5yrlp386a37h08x0e4mfnw5mb0v75jr5ptxg3p9l7e3ccrzlouhhgrs885izqe3l0u9vqmsga6f0pgahb3tjadv93fm0p',
                user: 'ea1osbgh8bx290br7ovzj2nfvx75nq7oq8f7xxmz0k3lnj90hdai65j1wfwoc2qtybg967k60eoez2ch0p95330frxnwx8uthuc4tbfp9xintoafpjnwlc7558q16z8vamslt6hsbcwsnp7prbjbnkhurw3vfkbgtm4tgcm9naxyhhapumaeszmhmyih2sfvavyn0ijkqyj4a3wyxmpmquf1eiw7a8gcvycrtuwj5y9nobufcqab73u9qsnbcqo',
                startAt: '2020-07-28 15:55:47',
                endAt: '2020-07-29 08:07:20',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/job-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '6bf26010-a993-4870-9263-58c16db28cb8',
                tenantId: 'cb75a608-d00f-4b1b-8c96-ec59158b5bec',
                tenantCode: 'w3ficurkuatk3j821wy1qx297atb55rs9trwat534jk4seodh7',
                systemId: 'ce797352-393f-412d-ab4d-68f1d8f2d600',
                systemName: 'vh7poq2aafsn2npsov3z',
                executionId: '4738be3a-7976-4914-aeac-c984332ed211',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 13:15:55',
                executionMonitoringStartAt: '2020-07-29 02:45:20',
                executionMonitoringEndAt: '2020-07-28 20:33:21',
                status: 'CANCELLED',
                name: '58sdncyzqwre3vrqeyp9szfzytxways7fxmyz1ien50ymyqjfp0t4x6km1tcmpzqjgkofpykj1zrw4y1ue61whfpyxmqcqqpkouo8ifmnwt5ltr4k3pzh6h68zdd2jb3w9wfxv9in4k1f9olxh5sszkm4k8iwr7j0itlil0186fibnku47uzkd2ie625r7db74dgp11cm4paupo7tbattb0pvp3smfq4vhelgili5uc6avs68v5383qc2q47j86',
                returnCode: 5025192128,
                node: '10w2gdsvf1kjq2pl6ia2qbriy7d60d44bbq5ccrv721khx4t0seqddzcn2zt6tcneq623m3dyzfog1homy0vp1spbndx0bttykchnqxlja85gisr2ug01baicrc1yku2njcm4bgntszn1p90i56zi94b4di9mkjn',
                user: 'grch5xxjfxrt9yal0hv9w9l4rwz9gjx10buhnedr2spvc0n6urlmyrq4oqr0axadfxz0bsmyt23r2r5s3opoi3fo4uq3qg278r4ddv02x9d9cagw0kq16ffp5d2ldg2o2yajy1nh0fs6gfb9ch7d6r7icepxbj0c094pjpul10dcds5kl5pztq2medajm7nkp70r9ixaqvdfzp46pjnva02hipggy8uldkxucws4rqqwg7ubias4g1138j79y6h',
                startAt: '2020-07-28 21:13:25',
                endAt: '2020-07-29 06:41:21',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6bf26010-a993-4870-9263-58c16db28cb8'));
    });

    test(`/REST:DELETE bplus-it-sappi/job-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job-detail/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/job-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job-detail/6bf26010-a993-4870-9263-58c16db28cb8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateJobDetail - Got 409 Conflict, item already exist in database`, () => 
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
                            tenantCode
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
                            startAt
                            endAt
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

    test(`/GraphQL bplusItSappiCreateJobDetail`, () => 
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
                            tenantCode
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
                            startAt
                            endAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'e65d09b9-ce74-4095-b49c-c1c45f11881c',
                        tenantId: 'cb75a608-d00f-4b1b-8c96-ec59158b5bec',
                        tenantCode: 'iwqcwhfic0prw37t05ovqpn5zgq092x1dfqvz7up9l8wzjmhqj',
                        systemId: 'ce797352-393f-412d-ab4d-68f1d8f2d600',
                        systemName: 'uxmr3b4sewfgdnxpgkwi',
                        executionId: '4738be3a-7976-4914-aeac-c984332ed211',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 04:52:32',
                        executionMonitoringStartAt: '2020-07-29 01:06:28',
                        executionMonitoringEndAt: '2020-07-29 05:24:40',
                        status: 'ERROR',
                        name: 'dm4akt102gmvzljs9ql60w3su92estui60w86izfyn30k2fglf2ag9mwjhv939ippwy2srcev859g7481lfp5e54j1qlm3l3mtmhs1eibvxx6wvr6oa3phv0lg60kiec1m8jd19rcmhtmd1x7scub1rvfyguum34pjyg348mvx3mj2qoetkqzvzamgmfk4efjutp4ni6q33js7fwv5nfj0su0kmy8gfn0xnj8ldzkbfss50ax6dtlkiaclw9kbf',
                        returnCode: 4242631959,
                        node: 'xnlrk0zq2m02b8vadsqtakn7nnwxmvbpmezfo692posup0phwmd3gb3yquo9w4wnvms06hds8q6syst9ey9uxg3js2ncms54horuf9i62tqhhiw8adfc1grymz807f98lwy12ah5nrgkkp1bhaa3reqx5gnu8nov',
                        user: '52jxnp11o1x7tzjjx7ec7w3y6cjyp1yjfszrou9rh5qlu15wj11zgar09og3hw638lb8kq6zzhihymvinvmle9a5d22hfjtooo2gp4go79jsqmk63ncv5odzbe5wvcx4cwk1gqkeqqyg6wb6wzdn0a2qnynmowefym8jjvf2mcvq6pia0fczmgfvm15er4y5xidgg5f84wunu7mfe2ootqfh691rdb4xfm3q0qye10vcomgpfdwpk1r69dn7n5i',
                        startAt: '2020-07-29 02:16:01',
                        endAt: '2020-07-28 22:23:29',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateJobDetail).toHaveProperty('id', 'e65d09b9-ce74-4095-b49c-c1c45f11881c');
            });
    });

    test(`/GraphQL bplusItSappiPaginateJobsDetail`, () => 
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

    test(`/GraphQL bplusItSappiFindJobDetail - Got 404 Not Found`, () => 
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
                            tenantCode
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
                            startAt
                            endAt
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

    test(`/GraphQL bplusItSappiFindJobDetail`, () => 
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
                            tenantCode
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
                            startAt
                            endAt
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
                            value   : '6bf26010-a993-4870-9263-58c16db28cb8'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobDetail.id).toStrictEqual('6bf26010-a993-4870-9263-58c16db28cb8');
            });
    });

    test(`/GraphQL bplusItSappiFindJobDetailById - Got 404 Not Found`, () => 
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
                            tenantCode
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
                            startAt
                            endAt
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

    test(`/GraphQL bplusItSappiFindJobDetailById`, () => 
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
                            tenantCode
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
                            startAt
                            endAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '6bf26010-a993-4870-9263-58c16db28cb8'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobDetailById.id).toStrictEqual('6bf26010-a993-4870-9263-58c16db28cb8');
            });
    });

    test(`/GraphQL bplusItSappiGetJobsDetail`, () => 
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
                            tenantCode
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
                            startAt
                            endAt
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

    test(`/GraphQL bplusItSappiUpdateJobDetail - Got 404 Not Found`, () => 
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
                            tenantCode
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
                            startAt
                            endAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '1f18918e-7d95-40d5-b3c7-91d3a96e941b',
                        tenantId: '36878aab-b900-4347-b73d-f5fa8b915d5b',
                        tenantCode: '1avrvb0r1540xetbypgsfvievx4s1l3euiqp13967kt3xhssq1',
                        systemId: '11a87e07-434d-465f-aaa3-5a90c2526993',
                        systemName: 'q4ltthlrxqz33z5p7a5j',
                        executionId: '2aaffd49-88ba-450e-9b8e-89a39e3ea009',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-29 14:38:39',
                        executionMonitoringStartAt: '2020-07-29 10:59:43',
                        executionMonitoringEndAt: '2020-07-29 03:19:33',
                        status: 'ERROR',
                        name: 'c5kb44wwy185z7jc6unz2r3169q53ju7d1567951opqgqf8bh9dyb1tzmfpejunqgz6f1ekbt9use359pn6l5iyrydyanq4dx9rs5h689sk11jo8894tiwkc2ip85g4j13ja4896xfw4jrpaf3hqds1fzm8a6ilar5lhh0avoccier4ttji8ur88ltxls1gxpeminl014geo8c2pqzqlzmpva9pduwp34dhl6msdln12lkponj0jl1cv4oksehe',
                        returnCode: 8750852384,
                        node: 'q9g574ubzd5wm4h763ep9ldm6ukfqv3wjepyfsvgj4kn8a6h5qf6tgkbsnoh2wba36fi8moxityxy7sz0hnl0j90bjn9c4ohya5aiojw4h4f2576oxd7htaq6ph81ry1ss23tkim9a21oab1o0gdqlppoyjii95x',
                        user: 'ik7fg404eyoc5xbpafnpimn9v4shriqjku883zmu19j3fak328dkgj6eewcqdywp9bnrvnbmbbqj8z30gsunc2exdxtv2eaitolgcrv4ha4c1aisymyv1mwega3ik97d9ixjdr2ihr7ndabtcg5d4wn30ukm6hy5o4qd2rmzomzs0ykvcbs4r9japymz4xusl4x912j8kloc56o1frv1r9bxkoi3jdadzj7agugz9d7sae89c1xl6lxeej8fzi2',
                        startAt: '2020-07-29 01:34:42',
                        endAt: '2020-07-29 14:20:02',
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

    test(`/GraphQL bplusItSappiUpdateJobDetail`, () => 
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
                            tenantCode
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
                            startAt
                            endAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '6bf26010-a993-4870-9263-58c16db28cb8',
                        tenantId: 'cb75a608-d00f-4b1b-8c96-ec59158b5bec',
                        tenantCode: 'bf3fn59r49ofa4shsyo3dour65prijpcxaqocxbm27ry9094zr',
                        systemId: 'ce797352-393f-412d-ab4d-68f1d8f2d600',
                        systemName: '9tiimvp8t8wyggnsx5ww',
                        executionId: '4738be3a-7976-4914-aeac-c984332ed211',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 14:37:50',
                        executionMonitoringStartAt: '2020-07-29 08:24:22',
                        executionMonitoringEndAt: '2020-07-28 17:01:46',
                        status: 'CANCELLED',
                        name: 'i5o7iighnswm6izq8gdx88uwbz3lu8ap58od2zgdxbxcefjwlfpnozh3z124zqr7oc9b2wnn8xni00o2g292p9zw185ymp0f9zwhpphnjj4g6vdb7dd4azbsmq9fgulnmtzs4sxrd47yg7r92uks2lo15x2cyzwz6409a6xdvray6yxlc8pha5oc9ymzbxo9cwmv6hftqkvce10fcx3lof819ys94ueh3cyjoj4xf6upu6idq2n9hnyx27ivn06',
                        returnCode: 9137855529,
                        node: 'f45mhw34lqw678iwwf2r5sth1zkf65xrva5tvzqok1mtc5xv3ibfjyk6ncnkgy1b2ox8ayq6a2fzx88yfp72bqsnd4ibk1w94zd36eoamba8j3d9h5zbhefoz1x39pb06gr3wfx3ebx47pc6fywd0ynw37hazvn9',
                        user: '215jh2siy1uxomtfcyfwasrgum4jxx95w1y7g8nsu3wrzgmjljk6e1tpzk4cjboqgr0hadlbp9ugn8bfqzzckog4l6vw75hu4jw8z91cwi4rndesntrbd7643zj63p8k1kw0d95aitz5o0i7ixv8n1s5u6mektul67zyvzg0ojdj3b03is761x1kssncur964jxgv8pfcz8m8gpx2xmky3m2mjvktenyzvrr6tobontix0zn03rbefw0xzaansg',
                        startAt: '2020-07-28 18:38:36',
                        endAt: '2020-07-29 14:42:24',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateJobDetail.id).toStrictEqual('6bf26010-a993-4870-9263-58c16db28cb8');
            });
    });

    test(`/GraphQL bplusItSappiDeleteJobDetailById - Got 404 Not Found`, () => 
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
                            tenantCode
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
                            startAt
                            endAt
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

    test(`/GraphQL bplusItSappiDeleteJobDetailById`, () => 
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
                            tenantCode
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
                            startAt
                            endAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '6bf26010-a993-4870-9263-58c16db28cb8'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteJobDetailById.id).toStrictEqual('6bf26010-a993-4870-9263-58c16db28cb8');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});