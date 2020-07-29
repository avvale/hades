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
                tenantId: '379b11ff-6d08-41ba-8e5d-e2ce9413b96b',
                tenantCode: '3urg57ticmkobni0vx72p2sfjhtkefbz6cg5xy058ruciit68k',
                systemId: 'a00af397-acb8-4d11-8b6a-72d04eec80e8',
                systemName: 's5fuod2uaamm0uwjipfv',
                executionId: 'd445db73-8d9d-4c6b-9125-7f6f60e8267f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 15:07:56',
                executionMonitoringStartAt: '2020-07-29 01:57:25',
                executionMonitoringEndAt: '2020-07-29 05:54:20',
                status: 'ERROR',
                name: '3vfp1i5kk9mq9uoink5uk7s9teh20zl93wg7307kl9w6lhf0cemyj4ar98lgv41gxas1qit8wz09tllg104jnukg5tlesmcogskzuojjd27camng0kj4c5s6w0h4zxz86i9p1x0fuvtvegi5ffhxintgwqgfqn11ituq53f1wa259gcnpk957xyrpupn90wulstwxfd7flud4lc7abw15xrc856iijualrx3ugubstgeeogpku63v810hfs0j6z',
                returnCode: 9170563641,
                node: 'pw5m9svmvv1r3e7jsr25c51xo94x8jw4kim8atvmg8jd238mk2cdeju5bubd7jdbogsl6mcadhfu8ceq26mz3af1gcrdeo4k5napz9wg7kkox0euhi2oj0m0rfxojc6davmz9llpoato7jrn5ogcd1ogjbahp46n',
                user: 'dmy176f0z4ggdrqw5fstzhi928iogj4tcwyw2gpags2mprxfdazny1k28j0v3ig7jaj7dskot6ap9yazr10fgqirap296q1b6ye151vvjegx7g7p6aof183o280gujsu1tkk03n2zscyz9o6p41uzuvf8etpy1uhy7mh4ci4oy18cyk4ir39z1l9jnjesvt97inxyt264ezyxqbewjhznwl4xvytgwer0jixxmwz7s255med2lblu2llneqp2nr',
                startAt: '2020-07-29 05:58:51',
                endAt: '2020-07-30 00:47:39',
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
                
                tenantId: '379b11ff-6d08-41ba-8e5d-e2ce9413b96b',
                tenantCode: 'mgw7cs7ucjhjaw5ska3gagctq9pfeqppouky7qwchfax25650a',
                systemId: 'a00af397-acb8-4d11-8b6a-72d04eec80e8',
                systemName: '5wv6qggyzwt4ius7vfwq',
                executionId: 'd445db73-8d9d-4c6b-9125-7f6f60e8267f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 07:48:02',
                executionMonitoringStartAt: '2020-07-29 02:00:50',
                executionMonitoringEndAt: '2020-07-29 23:04:54',
                status: 'ERROR',
                name: '724yuihy2k0lv35kfbbykz5u0olk0bzyej7qur88b0zywsb3b3ae3pojxspmn2pevpzxpo31odrw38qhv9ir4x3av18zwj4e5yzk4qyoc9m8r639q40f355mhjcboo8ptzkmt6j9zbwg38rc9pwxrq7an2se5rnanhj91pbiie58ocoqubdxxv1ezre4c52c3u314de3l32kcruz7btqd5ivgep2gzvxndif4f7culg5ec1g2utmt5e71cz8s87',
                returnCode: 5667789853,
                node: 'po9t32cvt4bn7im02rkm6eomx2h0qlsprx4dj5uo7eb7e2hmpml98ibh7v8rkjdmge3v0joi7xjoog8beiwo2cxlnnucyz4bn9c0rl9e4w286cruewr5eg2rx6zucuvz43791obn04w79za5dfbvgpoqvj4hztvg',
                user: '3oanz52scyhdyr0sott6pkszpva6yocrn751e9itj6e7y43u16wweo7r0gtjn2kfnox1l1lwzbtle8wn915pbxnk4ezg2ef5n3esd358aanpv0nyzw7w1xctq81ojed0wz8fue245h9pdpdyvqthoe5xa3um5hscyhlghrl0bxdpyr86o18x804ek728myaq4zcn71pqpcxj7ilhwxwrbyl0ot4zq3u86plzw3etvra594qsieoltn90jdulfbp',
                startAt: '2020-07-29 16:31:11',
                endAt: '2020-07-29 08:58:40',
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
                id: 'cb42f3ad-6a02-424f-acff-4235af79f568',
                tenantId: null,
                tenantCode: 'qs7b0e92qn1327c4nrghr2d0aancxh3qu9jusj3jh1fmufprkw',
                systemId: 'a00af397-acb8-4d11-8b6a-72d04eec80e8',
                systemName: '9z1h41j5wnkts722wq5h',
                executionId: 'd445db73-8d9d-4c6b-9125-7f6f60e8267f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 18:01:47',
                executionMonitoringStartAt: '2020-07-29 06:06:29',
                executionMonitoringEndAt: '2020-07-29 20:07:01',
                status: 'ERROR',
                name: 'xqnxdy5whizthrq0207uivq84ancpgagazs8vjvywbxnkedwlhzf8tfaqo3fa0sdjx6b8wrkbypjgbpjnzhlocjgam0vipv374o1g5l42uppt91d9r52my6o72e0uteslwsrv62xl2m0ezirnwmpr96p0c4vi38qb2093lclu1zo4ib3jbdky64jliz847ribi704ykp0vhbly839v3r39qb5y8j8u5b847t38nwjhfn3r606w5d5vnxaa3hh3j',
                returnCode: 5849518214,
                node: '4xtw3wiami3j5csb3sw4vyuhn5u66k9wejpxobqwzokqc3884y4xkrlov3to9hg0gky47v1srkigsevav9v9d9b6rofzobvk1k12pqporrqb6fn6jul5sso2yujdzzb2wlqrszzt0egusu1v002dwebud3p9upk1',
                user: '796pynehjzps8pc15vbr5yta5fl6vews8l37wdqchkb480dvq6x7tajfsi1w7zb04tpsouf1735thjrf1fe40fachk9f60lub5jhz0u3xxbud149aere4qvcl2s6vnmw4vvzyy6q8p8qvoprlc9c6pc7rxczt0pxhbgsl7owsdew2u0gpw75472a3ecuws2overdobwqc1215pevwg40bv4dghisr7sa4ur29rmwx001el2cyvbakuj2j8ttq85',
                startAt: '2020-07-29 11:47:21',
                endAt: '2020-07-29 13:13:04',
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
                id: 'cb42f3ad-6a02-424f-acff-4235af79f568',
                
                tenantCode: 'atqtitcaad14lemcic44tb5jebnbfhplmhc14w3qf6gjc3n25c',
                systemId: 'a00af397-acb8-4d11-8b6a-72d04eec80e8',
                systemName: 'tzjg50ze6gruhpud5uq9',
                executionId: 'd445db73-8d9d-4c6b-9125-7f6f60e8267f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 23:30:06',
                executionMonitoringStartAt: '2020-07-29 19:23:12',
                executionMonitoringEndAt: '2020-07-29 14:12:44',
                status: 'COMPLETED',
                name: '7r8b1rnne17v7utna1otvf22vbki3i3i4ys1neuadbwn8af7d1xh9kpuj5c9b1mgfy89ce8uyoseifxf7mkwhe5prry8y07n3t9h3t8fcq2p0tj3uapv6hmwh0fwto99boqk01kb54bjpu8qu7tntt7p2mzn3kf6zwz0i7sz1yob2z3ydd7v48vihdx2mydl9tuw01z9tsj9pbahvtx5ug3zc4qii57k2hsk9nnh8r6p7so4ssh2cgfavuiw08a',
                returnCode: 2514535019,
                node: 'g2ujhkdrumqfjgt46i6nc1ex8377coaaulvl3u65gn046fwjtyr35t88uq90y9oe6fkijfaz9arked3ubtt425akt5t5uuzlbb17tx0ngv8k5ggpsrq8xe8s8l3ihcnipm7tp1qf2itk6pz1e1fmm8tc0mxk8vqq',
                user: 'lszc4h9fsiaf1fm676cti56l8cck59j78fk7vdzynxsoige8ewbppklnh63jdtgns56aqo23phow2a9tocpy979164lgliymqp5x2uij1gnhxo8j6kvrk2kcyqhx5wouzr7xep2q8dvge69ta7lam67wcztspj90h9b9isdza5078mny3bff7g7idj2earxdcduiyfkrxwuisdv2mk6h9hoejih6a4tnv5jw1ec0curqbfp3p1occgi16jw0gct',
                startAt: '2020-07-29 03:55:35',
                endAt: '2020-07-29 19:24:13',
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
                id: 'cb42f3ad-6a02-424f-acff-4235af79f568',
                tenantId: '379b11ff-6d08-41ba-8e5d-e2ce9413b96b',
                tenantCode: null,
                systemId: 'a00af397-acb8-4d11-8b6a-72d04eec80e8',
                systemName: '9mawy9uamsur7prrdlxp',
                executionId: 'd445db73-8d9d-4c6b-9125-7f6f60e8267f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 20:36:04',
                executionMonitoringStartAt: '2020-07-29 22:52:39',
                executionMonitoringEndAt: '2020-07-29 10:26:50',
                status: 'ERROR',
                name: 'zprzpjzzb21llrxb83r4ibe72q5rro2oo7qaqyravsum437pzxfw0c7t46fj1jf255pgwapxe7aery86jdc8fodlogdzmu1ztutuo07yanqy1qqoqk23ksbdqkyguvpcezj9cabn7dvec58x6096wx2t9lmkyee1lzi0feqz9fhp7lysrbpkqnimsn87j98wpkjwg5sv4sff55a4kk5pvzr50oi4ryt1r7dz4yj6v1b2l8c2yani3nwxkg8kdzo',
                returnCode: 3778072441,
                node: 'vgjyjup8c8r9dkrspd0ur96butsz87fdin9o5mno8680zhtfwcpvryff2zjkrxehnpq6rhtjle0ga3y3mw2yg225tskf0illlqenp4ryb4fgucp9gn4z6bpi32c97x2x9xhhgstkti90u9aiv8l08nrrr8qa4c02',
                user: '0ztzwdes8glyr8xmeruxz3ej3x0ay5gfvwi7uqwjcr2cxcm9gebph58w2gjk7yt2x76n0cmm7hp0w2ebewqfovm9h19xhyssip4806xsccvgsrrkujkql55epx66ct5bkbt29lqgllsbphrbhsl7h96gu934itwohiki59uxh44goxrcpn850r9gcgsaes9divqmioks81b5qozk4wgc6ite0c6jse0hx1gxliyx0gnejowic5uzgyr9qradids',
                startAt: '2020-07-29 10:38:33',
                endAt: '2020-07-29 19:23:03',
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
                id: 'cb42f3ad-6a02-424f-acff-4235af79f568',
                tenantId: '379b11ff-6d08-41ba-8e5d-e2ce9413b96b',
                
                systemId: 'a00af397-acb8-4d11-8b6a-72d04eec80e8',
                systemName: 'hjdr83v191vn275dqpec',
                executionId: 'd445db73-8d9d-4c6b-9125-7f6f60e8267f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 21:03:40',
                executionMonitoringStartAt: '2020-07-29 15:15:32',
                executionMonitoringEndAt: '2020-07-29 07:58:46',
                status: 'ERROR',
                name: '2slyi0gdzve0kbkgye9e2c2ch3pkmci0h9i9sx4ob1pwkv719eaw5j9583pktjsl6vhkgj7r7viw99gqnwqsvkmnfotrt4rmehwzipii6m3l4gt95j3ag089afj4ayac1ruylw4k41vz5ce2rx4wxbon7rxhk4sj3ilva6msu9h0tyyrz1cke0bt3v94map2qi5qwhhs5ympjugkzj6cnq6jfxk2sdl2tnrwdm0drk8iqs2g1w7gxskdasw35ji',
                returnCode: 9197812649,
                node: 'csdt84l5ael67eqdi7ps8ix1u529a0uf8w46wigajzg07vmibdprezs9g62o9mfyhb26ih8sbgr08hd99nk9jtn9zws08jh6gagp609vts66l5gyih8yhemedmlm28x9mgyjhov58x89eckajue72nldaj26fkdp',
                user: '9nrk1i5g3cvyfvdz0uir8z3pbnmm3wg436hpb5pxr52xp3zi136y55zuyx2kjp1cvec1u4tl1owdja1dln390w5kzqr1o68izejpihaqor0gutypwurxlxh2cx3z75jhvpqhix83obk07mxrhhcnhvzoaini1y1pfffvbq160srlfz2e05vujfizsprmkduftik5niids44h0wykeqnmj46qhf0ynj09syea74847d6t42gsyzpjbnql4apcx54',
                startAt: '2020-07-29 16:43:30',
                endAt: '2020-07-29 04:31:52',
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
                id: 'cb42f3ad-6a02-424f-acff-4235af79f568',
                tenantId: '379b11ff-6d08-41ba-8e5d-e2ce9413b96b',
                tenantCode: 'm80yoy2wk14j33p45kwm2m8h90e7o7fqfaq33c5uk2817pojsz',
                systemId: null,
                systemName: 'mrbb6330di2rbmq9vi4l',
                executionId: 'd445db73-8d9d-4c6b-9125-7f6f60e8267f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 01:37:29',
                executionMonitoringStartAt: '2020-07-29 23:39:02',
                executionMonitoringEndAt: '2020-07-29 06:52:39',
                status: 'ERROR',
                name: 'kl1mg6aqnd7o46hxusmdfgjyvqqjwqt77extdvlw5gmnmtu3yxxg3khk7vywexogf2nnb1xf7a3ymrcr80hdbxyozqocrw45n4hf5w34xhwivojlno3sh5sprvzj8gey0c4gcl2y5hxd2xuzxfkpnsc90uevjmwekrsqz1j0e2jvlcd29n9w5fohhp5sc5ef95ohz7f9i8k312fo0hbq8bqb67j8ihnjz1agbko8xrottfbatkomzn4gaejqe66',
                returnCode: 1152333037,
                node: 'uokh4r7qeu1cdntq894t8letq7rq25xo28hu2k4gngreeyq7o1g5rypk6yu6r75epuktw1kcbyaogyzp61aunr447tjfjr9obaqjdtzbqzsfb0gnbau3jb60mi96z8txlmo8n032d3st5w3lmynd960eax2gxew6',
                user: 'rj2qby9nkt9qdrii229mjgmgsokpur0losv108wtn9xggkrq0mfa65g2449dl9y6nfrnes7p8srf00ypz4jcxl8e3xm9exgswsf5feat1i45gdl67kv9q8dxi9m2mr8pqirhmw3ccihnbdk5mzpb92pwkp3353k6xghifn1vmml6vkfaznwfar0tk3itouly1sb8y7lje371kigt11xpjmt0f6swfjpfdsbmodotxxpmsj1zp6kcw81re9hvhec',
                startAt: '2020-07-29 04:38:09',
                endAt: '2020-07-29 01:55:44',
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
                id: 'cb42f3ad-6a02-424f-acff-4235af79f568',
                tenantId: '379b11ff-6d08-41ba-8e5d-e2ce9413b96b',
                tenantCode: 'km44mcbvz3l3an3ihd76d092xwn7ai1ut0n367ssivzd5l4l7r',
                
                systemName: 'a6ectm81dyj68at2mpev',
                executionId: 'd445db73-8d9d-4c6b-9125-7f6f60e8267f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 14:08:03',
                executionMonitoringStartAt: '2020-07-29 18:27:58',
                executionMonitoringEndAt: '2020-07-29 22:01:40',
                status: 'COMPLETED',
                name: '7ocgkoi8ibfuwiqor2k5u7e5u667wab90zgrklqwm1w5fy3wtv7cb2nhtox3qhwjbljjfyoamdgfkraiuom7y17ggcn9nwt7vxxp6qeyi7wo7mtvf566kcel3qlwr54kifj20batz22w35x8nhx7ibwzdlwplevqb6iz3qm5v1990961gij3n6hiqa25vw3umxq2fkyjrb4vm5iqbvjbmzegr5o9gr53jxbuyonhxsxa6gyeawmhlrm2c8m4kmv',
                returnCode: 5650867169,
                node: 'skokdw5aqqtztmavvkmce0eb3gfyqvvncejez3oji6sq4tesyt9swjeoarbzwnwa10rpebzojyvj4ziw52kv91mvvp7ye6coff7t7h7bmwxd3tz6xffubo44nsmpzlqfi3tfmkh3p21u2s78kxdn5pdsk8wowoyv',
                user: 'kj5jsydq6q18snourd0hftsny74n78y693va3leefv04zq9h5xu9xgc0aduerjfhfuceoq5endlf5lcljy6jqws765lv2fjevg1s79qhrgw06wn8gbb92okdv30ngnwzrikc9hps5wxmlaxky1ukfm4aue6xk06fv092ae0kd38o35dvcwmef0obhqy1uk1zowz8ot6s4qnxb7g2o26s5pw3ahe0sgykigx55l4df7t5v0lp3y9c5w497q9433x',
                startAt: '2020-07-29 21:11:34',
                endAt: '2020-07-29 13:13:26',
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
                id: 'cb42f3ad-6a02-424f-acff-4235af79f568',
                tenantId: '379b11ff-6d08-41ba-8e5d-e2ce9413b96b',
                tenantCode: 'jgz5a5jrm72cvffftupgm9gxsr7uhwccgg6m52croz1dcvyxmn',
                systemId: 'a00af397-acb8-4d11-8b6a-72d04eec80e8',
                systemName: null,
                executionId: 'd445db73-8d9d-4c6b-9125-7f6f60e8267f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 02:20:10',
                executionMonitoringStartAt: '2020-07-29 16:42:21',
                executionMonitoringEndAt: '2020-07-29 03:53:39',
                status: 'ERROR',
                name: 'pmiv1zh9y4lswljdq1olqno69urnepsw5ukcenzx4okd8gpcv9ganzke5s7yh1jdo4gqr8rim2u9snxl1vwwvw8lwentnjlfj5bkx06cco2z028khbds0gd4jxdoamh7dd5u7rpcop5z5fu0cch5ch52hybps9tneqrh4tdex7sx88bvd1quhcho80dfq7opyejs03ya33hkb7rwyhbwimbadlbtue5h718ngmf80jp9cryktx9y8oq2rgcgnj0',
                returnCode: 4315705613,
                node: '8i6jty1npnbz62ga8hx5ha3lil1l55g7lmcptj4i59vgj639gp5ozcddule84b2l5ddoxsi0u8czl1r15ig2v0kall9j3hzrhfm42snga0xd5xg4kgcnbd6nifuy9r6hesi45a9wah7c45kl4tuqjwe3lh8yur1i',
                user: 'yv47ztpej9ms7dp91ju5qzzq69wcogwxdhidken61f572dsy862side04h19oug60jwk7i34sqvnsmjxdpe7vk5zb5svwmlroc3g04el6vm899hb4ifvhk4scpyv68zjtl3krkrli6t56b7fex1glivo0gp4gx821e1mnq8i3xf5070q7sb817tuwnb0e0xlhr0rrz8uprl1z7h24835h6k7bqaf2dnn6g8d4jqlwebqmc1d1tq2d99akwsom4f',
                startAt: '2020-07-29 12:58:58',
                endAt: '2020-07-29 23:13:41',
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
                id: 'cb42f3ad-6a02-424f-acff-4235af79f568',
                tenantId: '379b11ff-6d08-41ba-8e5d-e2ce9413b96b',
                tenantCode: '5wbem2856p91stiile3djitc03jua1og8y5wx9m9kmt5l9o17i',
                systemId: 'a00af397-acb8-4d11-8b6a-72d04eec80e8',
                
                executionId: 'd445db73-8d9d-4c6b-9125-7f6f60e8267f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 12:31:27',
                executionMonitoringStartAt: '2020-07-29 07:27:45',
                executionMonitoringEndAt: '2020-07-29 07:26:39',
                status: 'COMPLETED',
                name: '07elchuyt9zq8boiwm0e6bm6f9n2n1onqqwezg5nhghi6oac7vh2c03rwzts3dc3opavn5rvz2guljx2iwm19qior77qhcraqrob3qderh4s8icytdolomnczq5nlmqqdg9qoblpnwwee0n703xrwjz3m7tyvvadvsurmtt15b3ixigq95urgirjbwct6bivnsksddg5e99kvyv3qzx30roznbl46b0pea5t6d3ffx2n0st2mpkizw92oz5bsyi',
                returnCode: 6937891036,
                node: 'k5zf02jxls7coh1ugqxsuzbmmcsjpbuwavg62akg4ugtyusek3jghe3gy5t79btvxkhb154vaxbf1fpfx0yzcbn0a849fthhkcy0fy989vn3r6udmnjtzv1p8jc1am9upcppsxalf1jeiaoczjoxfnpbwrsky8po',
                user: 'qx8mstec80mp8dafdfxwsvto7zvg6kobltn4bl94xtcyj1oo72lssf1ouevgp1fm3qzflv62clw3q18snq8oiz5ykzdxtuftkfwsiz4dwjpaqruzqn8yeriydzgipu4riwy8now1m7dzaut3et470bgnxkbn4cec7a0czv0e1kk3vigwbil786fbnig0diq6dcsjfcxzxlpe2ub7ay0z8dzucqg26v6uyel32atm7gljc5sz6qtqn4xal2wfwnq',
                startAt: '2020-07-29 17:51:12',
                endAt: '2020-07-29 23:21:34',
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
                id: 'cb42f3ad-6a02-424f-acff-4235af79f568',
                tenantId: '379b11ff-6d08-41ba-8e5d-e2ce9413b96b',
                tenantCode: '02ejgf9533q3t2t7g35exvdxlb4dzjn7aeh7ljhkdbwvzezg0k',
                systemId: 'a00af397-acb8-4d11-8b6a-72d04eec80e8',
                systemName: 'h6xi3kuoar5g5eiksr14',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 01:43:08',
                executionMonitoringStartAt: '2020-07-29 15:05:21',
                executionMonitoringEndAt: '2020-07-29 14:11:38',
                status: 'COMPLETED',
                name: 'szubwru9et747b7cz7j2uzhrc1tugme98zpkyfto5vtqjts1wotyvpctyno193dy57dvipjmh1ykbrvuj7ey0chesgy7g74mrr56sozfd6ekdoqguf23ukoufggkva6jotz9448vw3myd42ukvbeokrokl1foq02pj8rs0rn0kficyntlbued0ag089rk8h9q4aja3orpv10ltkr4e6pqu48qcne8bmulzho4xxow810kgirwq15i4cm1egqwii',
                returnCode: 1227350625,
                node: 'jmxrfacxydzg6s8hfb4ae29c3s7fe56ttomas93xc79nvfyk7kve0hp4smo4kb3qaubbhckauu9t7yjg80tlz6fsy7hc8cdwi2gi8i49lu7bjmh3ftnj2yfrwqzypvcx94pheoh60kcnt9vb7gl6gh80f6sc1jql',
                user: 'tnj6fpa5mcyv4kyt6n83b26c5n65l5z0sumotuo680tkkqwnf0rgqbx0mfid08lofaqc4t9npmx6r8k05tnhutuy9dug357u8414vsln0pels1gvuqja6u0lgif5jm44ng1zv0nzvroxkh7ocutl6kli1jkutl7gzzo13zodmxp3s0wxlwq03z4bnl3cpq9aqty5y7c9x4ls7wvnds3gup66w9tle683bgg8yo8vt59mrez45mkbjygoz2040v0',
                startAt: '2020-07-29 23:30:56',
                endAt: '2020-07-29 05:20:22',
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
                id: 'cb42f3ad-6a02-424f-acff-4235af79f568',
                tenantId: '379b11ff-6d08-41ba-8e5d-e2ce9413b96b',
                tenantCode: 'h3nma04r6inkudf6te76gp1hqtsn5klenhi60gn8ivda3m7xbk',
                systemId: 'a00af397-acb8-4d11-8b6a-72d04eec80e8',
                systemName: 'bsavmphpj1i2n1lplhjp',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 10:53:06',
                executionMonitoringStartAt: '2020-07-29 04:34:59',
                executionMonitoringEndAt: '2020-07-29 10:32:22',
                status: 'CANCELLED',
                name: '5maentkrcesbvcg5spwqevb0sbwe8314szpiotobs63teo7umbd5eo6mj2jnfbzuvz5zjwtyeurhiwhbsr73fwufl46h230twml4rklw04defypbt3exjenp59s3hoqxuokpzz141657dmewhrzfpnxdp6u7q7a8ukr29yozaof6scyvmwr3f1suk2nncddt1bvtmmzj6s6bahr15al9saani02d535sipjlyrbshnjegdhpxul5s54v819su1n',
                returnCode: 9126112490,
                node: 'eey3pf6ndekz4ugtnjcv1gegjrnziuddqw0c6p0f8jeeen48t8ea2dlqs9l7cpdoew3j3clwghihr5xzu9tkymlahjvbu5cbow9d7pg420ajgqje92qqzmzje7tc1banqx6pxrlqd9j0pxwu3kppthfvabo5pvs4',
                user: 'r5g5es1eggildqrtdqtklheyzf7u4t5ld4p12neuphbdj5bz8li7fl688qbo3701gr0nu9we71wwsv2ck1xhwqcr3qnh87n6f7tl6edjfs2e1dgof9yekjftltpqw26485gm10ob8uwrljjxlnb7mjbdcd1iia3e0n46hxuy1bvvbfxbsw81lnw096joistnl9qmb60ng9w44avnli8yz8uidflom9zxh2zui845kpqqw3p6zqm9y0nmawzjzee',
                startAt: '2020-07-29 14:15:23',
                endAt: '2020-07-29 04:45:55',
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
                id: 'cb42f3ad-6a02-424f-acff-4235af79f568',
                tenantId: '379b11ff-6d08-41ba-8e5d-e2ce9413b96b',
                tenantCode: 'qbrd39t7bnfpki3oqv42cs3r8ubzf4yvn1r5bsekfl1eqswafz',
                systemId: 'a00af397-acb8-4d11-8b6a-72d04eec80e8',
                systemName: 'w01d1b6o8hp5h5lb2epd',
                executionId: 'd445db73-8d9d-4c6b-9125-7f6f60e8267f',
                executionType: null,
                executionExecutedAt: '2020-07-29 18:03:34',
                executionMonitoringStartAt: '2020-07-29 21:13:21',
                executionMonitoringEndAt: '2020-07-29 05:45:49',
                status: 'ERROR',
                name: '5q08110gs1nd5diqbckvwyy8u7liq38u5a08dha8jmde8b4yu774gwiylufak4s83o01xunbv8dyc16yfaajpq2bk9mml7zv1x23jvyq1jow9rwnn89kfi79ow5vnm1r35m87vh0xhwjsfotui7gmwrj4tki9o7x6ejqpi4abxxrrx0nnjz9mdhnjr5njot4iuyepw9skalnr9gd7fx671ptmy45wj6vmdjbmtf7znlodfkj55c0bhc9bkdulti',
                returnCode: 2974999487,
                node: 'wtg8l2941wntauv77gvp4e2d31jklmrdse0fhxahwp31wykibih6499r98ekovdynmikm4n33f68xu31nk9w6kjyiwi7kpapn3wdekkny0dam4rnje0icqabgtaj7gbo27twdbtfowntusm14va369vf13orhw3v',
                user: '0b4rezgbemask7gk0kssi6f33y5dpxplw6w6mxvjrp4o5s6a8sktcuot63i16w72dccjmai9bb6homubvo5bpe5b768uxtc1fcz34dbf2zxroseyjohsn78cbdrtb359ks40s1y6ayttc1eleq37zb1m9irlhkpis7nhjjauuu35mnpq5myk94kb2z5g2vbh6giwuk061a5ww97a6a9t0xb88ic4ufy9e1ykr13a95a0id41w5g9h2scsmem6cf',
                startAt: '2020-07-29 08:45:42',
                endAt: '2020-07-29 02:33:57',
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
                id: 'cb42f3ad-6a02-424f-acff-4235af79f568',
                tenantId: '379b11ff-6d08-41ba-8e5d-e2ce9413b96b',
                tenantCode: 'erpdnksoryeuzofjz5pysoaiychx6hhrk6ytj1eqi9n08251me',
                systemId: 'a00af397-acb8-4d11-8b6a-72d04eec80e8',
                systemName: 's8b9fjztt2d2iiiu320w',
                executionId: 'd445db73-8d9d-4c6b-9125-7f6f60e8267f',
                
                executionExecutedAt: '2020-07-29 05:05:24',
                executionMonitoringStartAt: '2020-07-29 22:08:19',
                executionMonitoringEndAt: '2020-07-29 07:42:27',
                status: 'ERROR',
                name: 'fh4w6kvtdkgzj8b4wm8zbfcrdneh3y0ee6k3qyjc7ei8d6w454h8fmt1nzis8dx233j8zx5x58xjb6lvvlycfz60mqg0c9rie60ppoo7cjwgrwvvluwx28xjn0cvoymgj154b23ngdg9qe51jp14iwq3d73llq1pdjg8b3u5wq24hz2tf8ra6li4kyiimvetvjjqjaeiruyag6xy3y3dz1oqdpozqlzgs9jvnwi4b616xorgk1t4pulmgblyr91',
                returnCode: 6390711954,
                node: 'o875b19lzemfp8kkv9ell3cv9i11814qe2xeslt10o8ol946layyhr08nkyojmvi1l0b0cuivbsrueurhobqv8q5sof2hgt7qgw9ia34leu6sxjl2mln2077e0u8rwo8xyqjqgf3nslxm03exqg081e20w1h34l6',
                user: 'wt7q96ejsuhgiqv69d0fokkq5zsnzix02qdh13v08by6zmydeekzuweyt869qzuq5eluevwqw8kcmek37cvdkfqrwtwu6ae1ykbag1lasd3gnue80ix0yfzp9fxcfxexg2vnwvxexctvgigbnntzfxjrpueph0xn9chwheehe8diutrvi2yabuz9u1g1r9q7cpj9ifeejb27gpt8dhdsniidzjcu7d2hb4o1o5p1r9buwjfb4251s5sf7n1bd4b',
                startAt: '2020-07-29 11:24:54',
                endAt: '2020-07-29 21:27:13',
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
                id: 'cb42f3ad-6a02-424f-acff-4235af79f568',
                tenantId: '379b11ff-6d08-41ba-8e5d-e2ce9413b96b',
                tenantCode: 'kqi237nwdf4f0fbquxzs1abfxummgjh5exp3iykp6lke708ye9',
                systemId: 'a00af397-acb8-4d11-8b6a-72d04eec80e8',
                systemName: '4kp8jl6zya7lv1635f81',
                executionId: 'd445db73-8d9d-4c6b-9125-7f6f60e8267f',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-29 11:13:01',
                executionMonitoringEndAt: '2020-07-29 07:21:40',
                status: 'COMPLETED',
                name: 'hp6gw5zlpd549k59vq6baskghyuuejdh9hvtvpu6uid4zi8pgqpshhmsgk46owl63nzs7iwzjfr444xpnywopijdjonxe402sm0twkn5yqe65vqc3uf67hyweh80yev717ad3ztzq7i6u5oj5y8crty6rf8lzfqb0phm18d06dovm59xnu53ocmvc82ebj1vlswa7sic0uecw9iktu3n9zwwo6eu6bql090p84dv5az7tkuosemnvv8lb1jui6h',
                returnCode: 7128573687,
                node: 'aonyaqbpn1fw5d3pkd2q7ayeesy60fsk2kb7kgs3m9xeu4tekzv4nc6y3cb0rkbz1afa06posm7f6it23cjj4j5ic59yul570j48aw4kb1vukh4h1c9lqv6tfuttprx8k33b3k6jmb57zu0dxzsuw6ss7sl8313y',
                user: 'sqz8u6xiksrwyia2800jwnm4vd8wsgnj0eug7fcas9ygy1orx57yooz6dd9hqxofpefp6wsv6vkisl2v8wjsrco7y5f26hl0d8dd5nc44g6vt7ykyidzeiojv09pi84j1u6bpa83vb05x871fudjay26qmy6zxk7wx5q7uq09yslcefg6shrm8spwop2c6rtsu8l522k3xlsyoypzngk7rgqephh40egh03q6y7bpgx8p1rmzl8yegp1lmmx1kr',
                startAt: '2020-07-29 10:02:46',
                endAt: '2020-07-29 02:35:48',
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
                id: 'cb42f3ad-6a02-424f-acff-4235af79f568',
                tenantId: '379b11ff-6d08-41ba-8e5d-e2ce9413b96b',
                tenantCode: 'mrgpfbydrwotf5475t1y8dm4g09ghahchdkyhggmie1e7racze',
                systemId: 'a00af397-acb8-4d11-8b6a-72d04eec80e8',
                systemName: 'beb8yedji2j14nmdqcit',
                executionId: 'd445db73-8d9d-4c6b-9125-7f6f60e8267f',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-29 22:14:24',
                executionMonitoringEndAt: '2020-07-29 12:00:16',
                status: 'CANCELLED',
                name: 'bthiiii78plc0wg7769619c7c7vu31oei1alltkd5dzzvhk5zb1jahvw8u4l8vmk8orz920n0ytivhtioxy0xb2j2176dsb0z2ynpgphu2d86lfqmaoqh9tedmsm590wh6bvt77ca3ymd1pn2dof25sj7jvrx28ucno8n8h4h72a967401rwvqrk5w5c5mufu1ozvznktwfmcjfm8b6qqaffucva48nbuc798ci5igp6yokfx5vxwqrq47jhali',
                returnCode: 8503616680,
                node: '5v3dl5lzhym0otmukkcqo1wh8oqxxp4c2p2pwdr2pushuyp6h9dguptp35wbs2d4c2i3ktinn2lyithlf70p6w3qyxuza7hcfqni6p4s126d7oljvpwyx4bqvdl8z0b0uglv85n9jyfj76merlep9cekun5jbva7',
                user: 'mgvsvhsqvjdt6i01fb7o6hj28r9ci1apgjghmjjk5o9t5s6104mavnd7af41wdjndb607ditt5uv3oum00llzlzn94370d7xui9akz3khdsuhl5tt0i9u21fl9jkgd4kaq58pw2kdgtlxt3kk195eiakyrre7dac9uym2mb51rswvixpjdfixyf94a0ims9gj8w19bljf7h22usiuudzi9v9wdsnvyj1awcfhhcwqzu0fr573uqpf2ruayc23wn',
                startAt: '2020-07-29 13:09:32',
                endAt: '2020-07-29 02:16:37',
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
                id: 'cb42f3ad-6a02-424f-acff-4235af79f568',
                tenantId: '379b11ff-6d08-41ba-8e5d-e2ce9413b96b',
                tenantCode: 'o0gp19mp6ntpyby4griydf7awffy7e220oin74t0ah4b9eop7q',
                systemId: 'a00af397-acb8-4d11-8b6a-72d04eec80e8',
                systemName: 'mudaa4vco5xg8ovhjs8v',
                executionId: 'd445db73-8d9d-4c6b-9125-7f6f60e8267f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 14:57:43',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-30 00:15:14',
                status: 'ERROR',
                name: 'qjahxf855ydzn40w8ei7er9umme408gvz9wzrg5fhlrur1nt1ksxbkzu1qtprl2ka11fjc8thyv2626kl3y4gah4qv9lie6mw0yyfxo4uvfvmnm9entqs1rs20l0xtaywo2xn36rk920homd0vnj5rnmqutmwca1butsn0822x9v1emkdbiros6heihomu8g8l5j5uqyypnesp271dexevb227lwz5lcj1ge6fmj6o90kbx4xy34cpzthbrdsvb',
                returnCode: 7165329483,
                node: 'u5e2en7kg13ybxn1h36yn17uayfrfgx4bihyr1o30gsnbosdd1oapuyufqvf54b557r18y0u12w81xcjs0bgg38u2xovnstjc3m1yic4kmnepdic67mo6kr0v2k3mzuz8uvs5zfmb5rqena0u68t9x5hmh7p6wp3',
                user: 'f90dzbsmqhb40c4o4pglh6z1yghf03x94sgh5zmaqt8gmwi3ti9b7wrzd3z1wal280betz6yt6hr4yuixyizqiwu8bap9ebdb5nvmn05gjddoxu4qv6jb1o399jeltwxkae4fk34k5fdabebz9gh2w644rcuzmyqj6hnysihw8gap5hn3gcd1jztlr6usi5gepu28j4cjl7lp3psn7l3t9z66sjwirsqlxnx01ahujvtb5k6y8kuy5pvlhux2dc',
                startAt: '2020-07-29 11:59:34',
                endAt: '2020-07-29 09:45:22',
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
                id: 'cb42f3ad-6a02-424f-acff-4235af79f568',
                tenantId: '379b11ff-6d08-41ba-8e5d-e2ce9413b96b',
                tenantCode: '5xuzdcb1glyn9787kgrdy0ohqhhrmmh6kmuj6pyanvf8kiwtz5',
                systemId: 'a00af397-acb8-4d11-8b6a-72d04eec80e8',
                systemName: 'ivr6lv275kfpi8mna8th',
                executionId: 'd445db73-8d9d-4c6b-9125-7f6f60e8267f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 14:39:12',
                
                executionMonitoringEndAt: '2020-07-30 00:01:57',
                status: 'ERROR',
                name: 'n1rtzkngah059ll7t5bkquwi9dhmwah0d387cmroqt48qri7f4wm136ksygiagojkckk7dhld74ejty8dek5dl1qnkmzdrsf7bjtljkyoluundr7llnkmooido2otpe0xs0lq54ifq7no0s03buoaprsldbvf8j1ovqz6kbmgy61cholqys403nj1sbkf834t2kn2uifw365jujqx5b9ema834jhygsmgquwnoeykmre2szntsjdt7hs1ug6wr2',
                returnCode: 4464535279,
                node: 'ttr42a1mgk46rzr8o4v6rktu1mjdbwydqme0k6l2m7cmdcymy757ph2y6eh9hhvrcr6rwjuwiuu7qcpy35nczkhvybfw8h8w51alqeywqj5k5ykv1iddjajrv7sicu5lrs61zjtyus604t43k915awgzoyb3zsd8',
                user: 'u7t90djf42t8mxzgfwum8qiytk65bvv5mlm2ugezfmvgshau4h2cwruv108c7dlclq0cnsmij5aysfkdemouagx4c0byv2waasdam1scf5mi6cxy80ip1v2ywcoq34cfbg82kam5yddefgyet878eovpz3uiyp4c53w1bf3d6285qritmtqcbadchyuzjms9s0w3pmdlfnjwn2u100gasw8h149np07aozqft9y12o9jwzbdg1yhrj9sia0dqx0',
                startAt: '2020-07-29 13:58:20',
                endAt: '2020-07-29 21:07:11',
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
                id: 'cb42f3ad-6a02-424f-acff-4235af79f568',
                tenantId: '379b11ff-6d08-41ba-8e5d-e2ce9413b96b',
                tenantCode: 'szxubid517zblgcy7tb3a71myepjy2phndpnji16dkd1dprg0v',
                systemId: 'a00af397-acb8-4d11-8b6a-72d04eec80e8',
                systemName: '5j77hzkuus9j0xpplqdt',
                executionId: 'd445db73-8d9d-4c6b-9125-7f6f60e8267f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 06:35:09',
                executionMonitoringStartAt: '2020-07-29 18:21:19',
                executionMonitoringEndAt: null,
                status: 'CANCELLED',
                name: '3p1j2fjmp51o81o6bgc4rw22w6mjksxbcb9pa23ol8owm5judfth5j639lmh49y5msv27sycjvq1j9q821367bacok4qk23ka4objar0dng1z640mhp3zbiy1da2f5bcer83pdjnvx19d1s0jdmwrdfdp7r87zohqhss4y9103x4wsfgaa7t6ro27qrsuuqnpycpduobcttgew6hlg3prsukr1ricndoozk0kmqsr501449gwz8u33va38ahdoo',
                returnCode: 5557947206,
                node: '8omanns4chpxsogvifr2m8rr3q5zl9h8lnvmfsn6x60yb7x7fi0ceh93ajaz4nx1cjqw08n0yg342x2n14one0nn1hxcer6e5ije7krr2n6pchl4iyeensp54lo1e3jxuvd6iygo7ipbmq60qy0oqmyj8yaadeb2',
                user: 'dgf2txmnh000embxahgc1xhqop8117izbjo2a0obji1lwxb80vo1et42t27fktn23szpiq5o36k7ns3jz89k4kvqjd2admy6hz23ld2ss82ol3bn84yhqs239y9pyl966hlnvc1yxcv3j78s5vpntuxdxqjzu63pyx03t3t9t8c64h38tem3zevj0a2p3lv6n78k96nvtp3a31ohi00b28rptymzqz8tigsdbiizsal9dpn2kwmn0zfdfv65exi',
                startAt: '2020-07-29 17:14:39',
                endAt: '2020-07-29 11:48:09',
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
                id: 'cb42f3ad-6a02-424f-acff-4235af79f568',
                tenantId: '379b11ff-6d08-41ba-8e5d-e2ce9413b96b',
                tenantCode: '1mov6mr0klfvclp7oh87rifzfxxptrqmq0l7ux00w11sgatlfg',
                systemId: 'a00af397-acb8-4d11-8b6a-72d04eec80e8',
                systemName: '99wpgssqzw6n7ma9h3uf',
                executionId: 'd445db73-8d9d-4c6b-9125-7f6f60e8267f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 02:16:55',
                executionMonitoringStartAt: '2020-07-29 01:25:27',
                
                status: 'CANCELLED',
                name: '14v58dyuk8pocfql1kks2cjj8vwhm7e8qx05ct1ygs7z5msykx2r9rsm2tfjpto35ci9ff0kk74c34vvwy5ppdhv80p77o57lmij7j8fdcar40kzenw5v091ku2d0jvjc2qig8m3c62cphmxvujg56vj9xv1pi999n7e63iqj46e7g68t1e6bgefpdv6v1lgdsuflia1vjib94j3tmy51fewuxrh8r9hxf60esakcwh21tjpbs4zo5verso18v6',
                returnCode: 1632091650,
                node: 'e896boyvgvhxnomvf2sb5njp5fwvu52fccqy1cb740idqpeq4x01v4p5ebifchxosmqcftx7aoy5rrum10bgjp9t6fxjeg6w07zbx9svnd1z91pvk2tai2cc9bewsh66z1f7kwkl6nwo0wkx2skgf00finz1ug9h',
                user: '0s5c8ta15gnro2bniroi4pixz6on7b43ow2sptjg76bfvw60i15argfu1mmqhuuznjsi0k8haz3zc2k4rlone4ev220g2strz4r4q37uhupger4s5092ksv3r19z77b5l49s7a1p0ynbfti1rlcu0ge0k1h3cqg0zroksk6davjfojyhpe21v1w23qrv9pgvl4t7qcpapwbzhyhki3j0j0e1lv546kmhxyhjwh0r72dcs6ku8gayvuya9ddrt02',
                startAt: '2020-07-29 15:26:38',
                endAt: '2020-07-29 02:46:26',
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
                id: 'cb42f3ad-6a02-424f-acff-4235af79f568',
                tenantId: '379b11ff-6d08-41ba-8e5d-e2ce9413b96b',
                tenantCode: 'zzfkcsx0owwbwzsvd5ux6f6alq5l067ne4fovahw38oiaavff6',
                systemId: 'a00af397-acb8-4d11-8b6a-72d04eec80e8',
                systemName: 'dpla0oi2p7b5jagwfbhz',
                executionId: 'd445db73-8d9d-4c6b-9125-7f6f60e8267f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 17:48:25',
                executionMonitoringStartAt: '2020-07-29 06:45:41',
                executionMonitoringEndAt: '2020-07-29 12:42:29',
                status: null,
                name: 'i1zpa63ti1jq47jf6b9y49mrifq0er397z19racr6l7fwk103h1t9927cx6h78rgr1alr5zw6dr145el1vi19hcos6hky23au5iozgn8qiqsg6ikbtvhzei8b3e0gsvdhh7p2x3nqldke2rbi8junrx97hr2hriv7vtntobs8uhe29mjul0uyxjt5jq6b2lx8ki0c0xmnwb1piutmj2sgw0mze7gqe14tiwx6khjktn8xnq3tjeey07xh6zq4j5',
                returnCode: 7925165499,
                node: 'l7qm6pbdvr2f264sctdkaypmrnsl0z6aweqs3n1fuei9ilmv7ax139b01jsbfzgapstwooadiy69b4dw4kvpnjrvail7em9nu7u33pprpg66o1q0wjj2sh2yvbt2nruaddyy10ae4s6zoq0vjccun839o67w5p61',
                user: 'gjnv3woo9tzv48chrgv50xn6245zxq7ulj6n3smq6fcufqkr7h4qgjzxe1p7gzvlq5m9oi5ormp5bgg31xwrmd0enlxtw2qty68xvnh3pdtoqzuf9kos2vfp5161tdm11jmdyctgzxhkuses0agkwy0m9mkfosx85tqpoxbmvuwbmk0ncfxcknvaz95yb61zoe7o55k6vfwa2gcofisad1jl0uotl3x6e88oqm4ge1z8ihgq2s9vkdwb086oczq',
                startAt: '2020-07-29 09:59:43',
                endAt: '2020-07-29 16:03:50',
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
                id: 'cb42f3ad-6a02-424f-acff-4235af79f568',
                tenantId: '379b11ff-6d08-41ba-8e5d-e2ce9413b96b',
                tenantCode: 'a93fly73hz3tfyhr2olx1hnqcpxz5s8klyp77eps3ws2vv79xa',
                systemId: 'a00af397-acb8-4d11-8b6a-72d04eec80e8',
                systemName: 'tsey5fzbho5bgejj8lki',
                executionId: 'd445db73-8d9d-4c6b-9125-7f6f60e8267f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 01:12:48',
                executionMonitoringStartAt: '2020-07-29 12:42:46',
                executionMonitoringEndAt: '2020-07-29 04:15:27',
                
                name: 'so7yzux9wckwa4pa05z6uunekljp8nm5gjam6e3chy9nci6w7pbhdl2vvacdqs2b695bif0z9wzm6llfy8e0179pc7suzalafc2nduleypk9pv2ilm1tckib456z9gjhpkb2eytq3m3gzwe6w10hxrd19s8xozbcbj0jyukjqj7r8dpvzgivo6ot6ip14c4e97dbgainhzlmehpo4aurj84skq1oc5a764utnojyxfserbhmcc8roeyhulyr4as',
                returnCode: 4788363230,
                node: '0axf00nkbvv3rx0mgq4yjs69idnjnyaw9yub5g89ujvp9e004w4jvs42vsio7h4ma40r5m7pv1rsshphvodjdqasdr49sml7qpjq75q046oyhtely2qgvd522qbcfx7ghmbx6w7zsqzdco8xc8kjf6o801lybf8g',
                user: 'gdt14w9mse1vsxhbps0b83ujg03aow1hi6b0c3kej36r9kr6kz5ld4us0etmz9xmlpsfo691701u07zj519ql14kf9fc6ggpksdyjybuav4ufsrsaftmpisp2bywckfgikpkp203qwwunc481fl0ph4kvvkn0zpg1suolzcbsrfd5907hzvhtw8g6hdqdymgrz4lefcp8aftn3uxws4gxkre42c7brmps3pfwbflwi3fu75tb65iqk58iy2kmci',
                startAt: '2020-07-29 15:21:03',
                endAt: '2020-07-29 19:32:59',
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
                id: 'cb42f3ad-6a02-424f-acff-4235af79f568',
                tenantId: '379b11ff-6d08-41ba-8e5d-e2ce9413b96b',
                tenantCode: 'ul5cvi50k48sw1j2yhiw9v83k4v3ru3yz5ro3oihgy5kaqlja8',
                systemId: 'a00af397-acb8-4d11-8b6a-72d04eec80e8',
                systemName: 'coy8vh5um3hcyf9u9q21',
                executionId: 'd445db73-8d9d-4c6b-9125-7f6f60e8267f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 03:31:45',
                executionMonitoringStartAt: '2020-07-29 14:13:32',
                executionMonitoringEndAt: '2020-07-29 22:49:31',
                status: 'CANCELLED',
                name: 'd4x2ridiyzriv3kohloj47dy2xdraca6vwrajcvre3nqfpct2zdx77rycn2c8jzft404jcw02kla958oujlul0q25b5ck2cryi1fu67udckojtto5iedk0hwbxinafde3ppg1rm0uhqi6z6zr07kcok475awwgna1oviu9m10hoa1ufuqpm47p8o8w34rkestwkj2ic1xkao1d7kvradhor68pxecx3hh9z9ya7a9s2c5b8lxhzzj3nhljwv3qi',
                returnCode: 5907396191,
                node: '3zgmpmhbqmel0payek9p2ac66jf34gqnikjd4nj0y2cgpsdadwpkbc3gxcdt9hay125mjt0gdbwyk8wa6x8i6ckklsaowzygw4mt8kchrm9ault97pz169n3x4cst76uiilmwnvem0fsbu9319ahexzs94m0bumf',
                user: 'b9jxwfwnkgkg1jcc9dogxw0y0k4pahqpt73gxh9s88jz9jbwreyt80vwbsvk9jzu9g3prmm4soyk062hmjrmw3jfg735cw3er4kz19bpqgwfc3hcpt9c14qabye8rks06b2f8b7lo8ncjofbem7pr3npy7jkdh70s6il8k3iq7si72ja8wc46f57yc4sty1akh2xsffhn5uc6cvxt0ic7leitrr3wueucme8etlhvemiu5s7795ncnccn013j1k',
                startAt: null,
                endAt: '2020-07-29 22:53:07',
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
                id: 'cb42f3ad-6a02-424f-acff-4235af79f568',
                tenantId: '379b11ff-6d08-41ba-8e5d-e2ce9413b96b',
                tenantCode: '3dvkikc1xspi4qysfax9hzljx40rip0vqc4pbq8wj3kb4il7q3',
                systemId: 'a00af397-acb8-4d11-8b6a-72d04eec80e8',
                systemName: '4s3a9zlxjh806j986zfi',
                executionId: 'd445db73-8d9d-4c6b-9125-7f6f60e8267f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 07:13:51',
                executionMonitoringStartAt: '2020-07-29 13:59:06',
                executionMonitoringEndAt: '2020-07-29 18:09:00',
                status: 'ERROR',
                name: 'de4bg26wvdykzvn1rfrbp8sr36484n4x97wznoubichsk22v9m1gpu5l7ezph93payuyezkxlfpbutgd1lfngjvnjw34gmox4dmnqh4nlngx7g8xziegg64ht4f93oywcvvf49m8c5lg8xut93eayifwudmwvrgw7pp6kibmj02fxoe1b12uniq65apv0nrbs4191zz2cb1winlad9dxjym0lqwzsqvemy5amz24dn7qnor5qhdluk2jlddfd0g',
                returnCode: 3794505147,
                node: '0uq4hshq4u76g2vebidt7caso58rgfgdyvynhv9auqbn10n35miwt2wbk8tht95jegqdjymb7a5f373ha9cgiae02ygwobfy86duzrs8hpyc9kwgkqjwsojk5ywyst8rwlnyjzaq37mst4iusx6um2l0jbmyekhj',
                user: 'oxybi5xjetamux5epe8zqac27pg8vlkc2m5kuazfkhzir4zqtguwa4h04ujsstp7vvkun6g4cwmg8yb85l0twqkyzz74w553cehwdohwmevtd5cysf0erxbdnadcmdk8bclwm6033cu3486rfoi9qfbcnmc39ucuz07i8kyyk6759c1s2w0qp4xqyc59glw8r6hpks4a1xlnd8spclq17skwh7hm7oc8gf0ui41jz4st7g5rwceuhmzi7ko1s1w',
                
                endAt: '2020-07-29 21:38:33',
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
                id: 'cb42f3ad-6a02-424f-acff-4235af79f568',
                tenantId: '379b11ff-6d08-41ba-8e5d-e2ce9413b96b',
                tenantCode: 'l8l17drj8oo9vn5hsmsdzk4bsypwn5tc6axgvff9oqjnju1nd6',
                systemId: 'a00af397-acb8-4d11-8b6a-72d04eec80e8',
                systemName: '97dnmt9usd9ey2litq00',
                executionId: 'd445db73-8d9d-4c6b-9125-7f6f60e8267f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 03:05:10',
                executionMonitoringStartAt: '2020-07-29 02:01:56',
                executionMonitoringEndAt: '2020-07-29 06:15:03',
                status: 'CANCELLED',
                name: 'pv02gc5xvps5r6nnksfgz2jukbqro7cr78ye5sskto6hiwwqedivaoi65eyn93i90gvfy22koncom2t9qlsf662fafghcqyhktcnqjwpbqh5ms6cjlvpal6ol62oj2relb6fcqlz6ejquluws4gvnyep0aj2pdy3hhtfw1g4d1d102irho40ix9y92v5y16eodp9482lrxrkolplheq1ac9sxo9vcvol2acif2e1szwrxbs43u914ze922ycqsv',
                returnCode: 9677412609,
                node: '2sbpiexhpokhuxoj8ccoro7thh4yty4dxz59uhbgpth5zbg3dl3nxuxydhr0q59gz4oe77b6z1b1lipfb92wliotdiva26egoye5ig7huz720ey42vpbgc641mcxgdc5999jq5ztsbd0vitb0yiftgcl62ln03n8',
                user: 'cs4d1l1imezq6bbal9avg3v7512mbn124ix90clg0oldb21g712j8nhrci9ni1j2k10pv8pj9ys04it03l6rm6xlrp67ej1501zyvq7l40t2ukul5u5v262wp4x0ec9tad8zgcgv4f04vamuvrmxb9spkf8u6gsldq19xjc3zl9fm15zv4f9eoewfdknlbisnkj0g0gjr482y2akeuqqp9l4mwuljxcq3w7lwj46r6oxtvoo5joi2r2gm0svtak',
                startAt: '2020-07-29 15:26:57',
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
                id: 'cb42f3ad-6a02-424f-acff-4235af79f568',
                tenantId: '379b11ff-6d08-41ba-8e5d-e2ce9413b96b',
                tenantCode: 'tfll30rfbh1qp66d313arnim4iy17yhbpeigspgp4mh1l4pih8',
                systemId: 'a00af397-acb8-4d11-8b6a-72d04eec80e8',
                systemName: 'da03tgmyrbbxhzbgysg8',
                executionId: 'd445db73-8d9d-4c6b-9125-7f6f60e8267f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 18:47:13',
                executionMonitoringStartAt: '2020-07-29 23:37:02',
                executionMonitoringEndAt: '2020-07-29 13:13:50',
                status: 'CANCELLED',
                name: 'lthj9q8htii4gyk8k7yxb6p6jasvsujht8ktc3ctnouzzi6tejb4vq7km70fi4a8kszyeferm7o8sxb96wp5up8cg2mgk9yceh7j1p4bbl9zase8n1vcaew3sv7mgth0d7tfwnir1h9406zcpd8odufskripxcdrgs79lnhta66lp5koe1bu8d4yo4h87dqy9dh1tzfhgdex3fhf9ypzxnyt7i2999hhfy37ngdrdqfnqmk9nae075rtq4goxot',
                returnCode: 5468904768,
                node: 'hdtsmejjxlvfio5vvbzi5vtqa0nytp92ouii3hi1m6kr137j4dsndrfa3m7zdhf0mfz1zv190nfokwvsxnugz2q5whghk8mo477ryfkdwcyrh6wk00s5y8n2sz9wuyi0dtq5p7ynzilpx83f2d92xb0eullh514f',
                user: 't8kkguomvh244552i3ca627k3o7vb08czm8quswfy0j45sy2fb1pba30v4xvjdy92119704igsg3p8sdgkyyczegxj8zvjirwva96ok2xihqod6uuixp322d7fbajvcmxb3stq5386kpy302wv7fq9vyc9b05li8jq5qupgdku6y4j6he051juo9uiwx7fqwvvgqd7n96hu06gln2tezvew92au1dpjr8oha61m3fodpvgmqs1c8830wk25cqme',
                startAt: '2020-07-29 21:31:14',
                
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
                id: 'xj2pesonj9oepmq4h7kyqkb5ffakdgaawdwj1',
                tenantId: '379b11ff-6d08-41ba-8e5d-e2ce9413b96b',
                tenantCode: '7xasfz7kyre9ptxdaqnbsvglfoo1v2vgg4r9vt1r44w6a4wgni',
                systemId: 'a00af397-acb8-4d11-8b6a-72d04eec80e8',
                systemName: 'khd6k6u0zlr33rytg1lh',
                executionId: 'd445db73-8d9d-4c6b-9125-7f6f60e8267f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 16:33:11',
                executionMonitoringStartAt: '2020-07-29 12:41:50',
                executionMonitoringEndAt: '2020-07-29 07:25:27',
                status: 'CANCELLED',
                name: 'by79xva96hb54e073j50tyxwvtijc9elgzsyrvvaax6gtldc3fglxvxonxna7rqpunnr2xpqscgp5r8dlbdkua8jnbdwf0ba2lov8tcdoucq6bq0hitmfumcpnuws7dbxc48itvcphokot4twxc05lz6h64hgy2nun8h42e4os7807pii8ahry40yhnoa6viu8whnj6s4oy8oz9ciyx7sofoe60ynlsobzxmeul0b33sidxlsrw4axotr21g7eq',
                returnCode: 6373184410,
                node: 'ilpjhj59h9whleaidzkwwoq480hkqtbtd95sv5l9fyulc8iyieppowwryoaanf7otwlt22rmtssmbmuv735ada8jkbv17nks5skx5n8a5s5khk24zv9lgl366vlcwr68w3rgj0necm9f7a0moigxgrb0xgb7p3zm',
                user: 'c02jcnoj34lw7n4cvd8axry8c8wcuyzk7i9gvnfx2fe469njng1nejpogrrjf7tpb2j9i6rl0e5654k11lgzoa0pf8p5217onj50br80oo9mzdc1ur9yk8lat34t5hpfj9pu7rpgvroeh0zp4jwithkyloxdorxtd13bw60x03zs8g4hce0aj1mdpw556wnkdtsd9xp9yhqfkzkixi8gl07q7jpjeu3bxs5d57cc33x7nachp4j8lqed0k2onby',
                startAt: '2020-07-29 10:37:18',
                endAt: '2020-07-29 12:44:59',
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
                id: 'cb42f3ad-6a02-424f-acff-4235af79f568',
                tenantId: '45t00plf5jactm8ap496lg4hmh5lm7ob1rb55',
                tenantCode: 'i3g4g9jthib84c7acvc9prj1anrbx8qclcps41vex9sxc6m5ec',
                systemId: 'a00af397-acb8-4d11-8b6a-72d04eec80e8',
                systemName: 'ibrvodu9glsdjqqwob7d',
                executionId: 'd445db73-8d9d-4c6b-9125-7f6f60e8267f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 17:02:23',
                executionMonitoringStartAt: '2020-07-30 00:04:23',
                executionMonitoringEndAt: '2020-07-29 18:42:51',
                status: 'COMPLETED',
                name: 't2r050v6k3gotnur24fc642ac0q8cbon11o3au51xcb8g7ac4pe8cpe723yscg9minqbeywzpxeptkl5p5m3ekfhc30yyppwdeckjui2nxtpq4drl26d3pc0u6rgqmdc9lqww56uh7zbwvx56cclkm1rymaosrhs1oidadp95vphgkugfrnci21ybfhiq588htf4b74k3wnkn1qansr9t1mx2su7wl4n09ckzt5ibqqa66i1m1pjbfb6njy2twe',
                returnCode: 2698560501,
                node: 'dckiengurwfijkatfkxipvcyeafbo79n3fqg1fdiojtiq5jntf01cpmja6gramngjrgcp7z50yf08oapb8jyfeh2d31r1vnen5ion3kxc3gykvo9v1cxyfv7g77ba5i65z192psdv3b2u3w67sx8qmb71teokvd8',
                user: 'pyqvqqqfm9gbdmp7v60rwo82nisgjnuxjz826cgky8da1l9zt0ugdbvme9ee3p4zktu60yhn6c4swarg22i20ish81w0l1vgaitowx14ddgipv9ay3bjq9pjjwjexcq23zsyv5fli3t5sqv078gftfc32czaloomu8qug9xpq2s7j27ok29o3zm37ddj6w7wmzv7jlumtn7fvju05oaie7doj8yhyk4rm49u75e9qbvnccvryguxtk1dyewfkb4',
                startAt: '2020-07-29 22:48:06',
                endAt: '2020-07-29 09:01:17',
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
                id: 'cb42f3ad-6a02-424f-acff-4235af79f568',
                tenantId: '379b11ff-6d08-41ba-8e5d-e2ce9413b96b',
                tenantCode: 'v74kgatdp4zejlbgh2zh22706qlitzph2jhkcw28aybvehvky9',
                systemId: 'lruz1s3eg9fljynnjh0df39mvbykekuwvw2ls',
                systemName: 'qf312aqt77d3kdb4vkuy',
                executionId: 'd445db73-8d9d-4c6b-9125-7f6f60e8267f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 14:05:21',
                executionMonitoringStartAt: '2020-07-29 23:56:32',
                executionMonitoringEndAt: '2020-07-29 08:53:47',
                status: 'COMPLETED',
                name: 'iv1bw5i2uhh9zjkaklfr8tje3u95mmhq97556vuuzt6xgaj4g152wvi59y6wel6h1n4dyzwdf6o4fw6e76r08ng0oxqcjfvdwufphx0h0b3k0nb7cr0bune0inxwpeaiakd001obinz2c66ogsjnqaokwob6g4kt02mb0f4mmep4c99j6pmf8duj69g3kgjeppyk10iipxk1beqbh1qgawrs8wd3s5b3y7sso8qrvkmt2o9jjujbivqeox9jjxb',
                returnCode: 5213454252,
                node: 'fayqwm994zys7mukvav3onczfibj8bolhxhbleoin64b13pe1q838qlv7htolmidryg462orkfttu7b4xss5ng2zjvdzltjk3d685p7q3eflim5d6avutvqbdpvbsx5h2gds7a7wrynncrzgy51016f05bntsweu',
                user: 'cp6v4bpf1l092ozrzk64fyd2al1i2qqz2s7y1yj7biem6xjjsww9f8nln5cd487hsz4u9vrylep9p36u29zjvyymn9jfuq9tnvgt77h88x9y31dtk29a2dmedvpn9dx1ntxembv8zyyyns5do5wukr61htgxcplwdpf00xi3m9aiedqyqsf48f5ze34t5cm7b3nqyker15ymdg2oc08zk6nq2i9u27vtp6k96f6id1z0sjxhg080uorm46v8eyb',
                startAt: '2020-07-29 16:22:55',
                endAt: '2020-07-29 07:11:42',
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
                id: 'cb42f3ad-6a02-424f-acff-4235af79f568',
                tenantId: '379b11ff-6d08-41ba-8e5d-e2ce9413b96b',
                tenantCode: '4rx1reyastj8mjknc1xzl4da0j0cx39qc2k1fg952hnbxbmqxl',
                systemId: 'a00af397-acb8-4d11-8b6a-72d04eec80e8',
                systemName: '45518dj131527j7k3rv8',
                executionId: '5l4kfblvl6adwpm3o0h9lg8a1freycck0hkax',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 09:56:33',
                executionMonitoringStartAt: '2020-07-29 01:34:19',
                executionMonitoringEndAt: '2020-07-29 22:57:43',
                status: 'COMPLETED',
                name: '8obn1z3298habkc1uuth4pvvkyofng5hta03tgkc3x2efhj0a0pemzf5v3sdtm3ac3qq288sqwtirhg6a4ib49gb1r5kgnlzinidpt5f9n9dn51hwnvy678q0h66e357y408dya1lls6ts16ha3olj3vfngx5e95tve9uye88uskhik10lnn9wmwiqnqtd49zg68z733h7mleje77038av7bfqddz8q79zi5fwvcvg7k6xj6znjrvoslkud0iud',
                returnCode: 6444900399,
                node: '2r20jvhukrrar2pufav4ifdhqgrsxp21tbuzx2cvj5rksgc2k7c115kmdl90d2d9m35i1f3w9usrx15oanvpbwi453mf6c66qc6t41nn3zdquay9l3fhyfdvov12lgcmh1t4jwkrp1kfver40vy5rjt2vqh5q2qz',
                user: 'axqh1bv8wdsxzhmrg3o62awnla1628wzm2zpv9j2wblr832qfo438kou5ixfazcmhve00zpfv3d0rfcyj34brupjneffv05vqtcex8l9xlvavon5j9bsh9oquimp45oth9vhq7voua7hg45ai7nz7199rwjtlirhrl9f286c3yebmh5e3jos51hz99z1jq66sr7pjgks37dchs0gpqm0ecsxq856pey9qnuuxb6sbbjxv2p8jyx7lj07zw9fmgs',
                startAt: '2020-07-29 20:54:15',
                endAt: '2020-07-29 23:48:36',
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
                id: 'cb42f3ad-6a02-424f-acff-4235af79f568',
                tenantId: '379b11ff-6d08-41ba-8e5d-e2ce9413b96b',
                tenantCode: 'r4j35j5owdguzbkngwuan04v99tpv7fwpdfy295q2f2lskkln1t',
                systemId: 'a00af397-acb8-4d11-8b6a-72d04eec80e8',
                systemName: 'pcz346fix093jzp9v9vw',
                executionId: 'd445db73-8d9d-4c6b-9125-7f6f60e8267f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 01:50:48',
                executionMonitoringStartAt: '2020-07-29 21:18:26',
                executionMonitoringEndAt: '2020-07-29 15:46:36',
                status: 'CANCELLED',
                name: '40f1x7zmaonq2vlb779fsgz73kk1cs98f5ha2gcdzt3rzr4duxcnepdce8c35l6a9xkceb2ys1qgxqbbf88q94m00ronci5cs8iel4szv21zwkxz6yx0pyztu3b3a7sy6bjkozs6rrrcm1rmtobwgednao7wp6j7ezm8okuyktcen2vcwtfj2e3wt03gk37dhn8hutne46e7feerka0fmkzvv886k556rel96vf9chuassrk8p62w4qc5s4t07b',
                returnCode: 8733133384,
                node: '0e3ef8qvcg6guw5v6gjywi3w3lfl4sckqu0fftad29r9zjo8ugpffh8f7iwohewwwx2a1ktnenjqfkectl1yju2i6x1k235gpzs8ilh4p6qbw06g6plobe2uebpzzxh4g3p5otyt6jv9aqrrvq4bwpsjm5wlusgw',
                user: 'i0b95yki9fvsfcj3bxjuc2ohrgy6ii25z7ivdkp3sdb1luwyoyvmllce2sqpa1h6efgknmgapfrhxslx4oecgusbmp3z7ek65r96f6ccc99720zpsih3l9hgm0khrenjv4zfzp8cgrqnryj0vmgwscfj13glnmmqk2shpmm1it957zwno3a5s3jge7yc3gqxkplkzm2nlid8b5ojnwpfe48fshyofep8ymsnbm05is2hijfftu8seskvy9ot4u9',
                startAt: '2020-07-29 11:49:57',
                endAt: '2020-07-29 21:43:45',
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
                id: 'cb42f3ad-6a02-424f-acff-4235af79f568',
                tenantId: '379b11ff-6d08-41ba-8e5d-e2ce9413b96b',
                tenantCode: '4cbdd74l85dm4tpsqn8ibu9d4691gij2rwessxkz0wqe0qz6zn',
                systemId: 'a00af397-acb8-4d11-8b6a-72d04eec80e8',
                systemName: 'c9kh200ov2zc7qw07h9x1',
                executionId: 'd445db73-8d9d-4c6b-9125-7f6f60e8267f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 22:11:53',
                executionMonitoringStartAt: '2020-07-29 15:00:56',
                executionMonitoringEndAt: '2020-07-29 14:53:31',
                status: 'ERROR',
                name: '8juhrjtwyzh57kg7u77zp1mnckhjf1qq83f14ic82340a8061d5rwpbkfjuvf617dhryxcw98owngygh847iazfr3tfn6t1kp6a5pnipv4xmomaydwrsf3aos75wfmta7lo6rhf6t6otjxay4l79dtgzu15rn5h5jgr13u5m23ogdiqn9btp4r1csq4qfh57ql6ys3dd2qakmipfrfyyhzdl17x0qnrruk1ir2k1ujgb3j61vfwpdbxeob7g6rx',
                returnCode: 9727588229,
                node: 'jwlnw269ho5l82ehqhcly1u9xt4zv0yypddxw0sdcnnyxnnwvevz9qbalok36ywg9kam2zf9yj931wz3vekrl12ariesj59vhxjimwb5ydnjrd706lzmd0pt8csdqe91o8qaml9gbwyrnxv2ksl6mec0l80qdo14',
                user: 'qcgd8gye7wevf797v9tq36v3bavledo7b0ogswpfpdl1nez6rl5rihqaoo5htpxvtnt1lfh5kjlc8eou9adzt35jx3xy4q8d7w577iepvmjfztrxnnlgxl9rw6uf4pu9q4g71pfnq0jxssrethnkdaguwyuuenyrhwfre54zzswx70u6uo2iimkr5j535oeafgwe5969qt83btxhze4qj3ogfjzbaj8bhaqv79rx1961n7mn5db6e970kimncgw',
                startAt: '2020-07-29 18:33:57',
                endAt: '2020-07-29 20:52:01',
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
                id: 'cb42f3ad-6a02-424f-acff-4235af79f568',
                tenantId: '379b11ff-6d08-41ba-8e5d-e2ce9413b96b',
                tenantCode: 'f38rwixo0ujt0p5m8m6ilw8vxf9rgxn2cwqt7w2sljb5g2w4ve',
                systemId: 'a00af397-acb8-4d11-8b6a-72d04eec80e8',
                systemName: 'bcmhtonnuc3bf3t8jp3q',
                executionId: 'd445db73-8d9d-4c6b-9125-7f6f60e8267f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 22:48:07',
                executionMonitoringStartAt: '2020-07-29 04:58:39',
                executionMonitoringEndAt: '2020-07-29 12:19:27',
                status: 'ERROR',
                name: 'e0lcayc0h7bntax340suufswrhxnpdv8lmuk9h8onck75uxzti6w5alk8wxrlnnl52otyhvhz3mw6solob17hwifpcaj97v47pf5phg0avznkmiqguq2xj9bj902ol8tewa6ch3g9aot4c13klwnjqzojrpiv6322nfwszsse0q9c56hc0vpd2m7xogz9lpw1cchwttoob8rv0j55p2xrzggeed2alhnd056ec8eq89817npewrmjaxwhm3dp1lq',
                returnCode: 8157755993,
                node: '7j5vz6ipn2o622prhbxil3lc9g8obvqie6a6jax5i8huawvwwx4iq2m9vj44c66nh1nidn2wxudgej5oj8w6cmovhhimdk0zsj4uaceztfppenq83q83kxeay4uhxucgpw4g4b758rm1gusxzoyh7q28vl5mdj1g',
                user: 'jov2icov2pirxk3jqwwzm6kkrc2fkbao1n1x894085vxp03lquiikvbf4nvktfdkbum6p8zcorb572wjn0t8z6wd4eyv3vgfuxnn2m9w8c5wlysw0kabptgrp2vvce8r0h07st156zp040inzvinpwvgoatiu9cxp5hckl4w7lh70k1yfzoatm83xrz2eadbrafn8iczr5ricny03my6ybe26u4z1ikoemn30aym0dbqvz72x63xlx1solmi7j7',
                startAt: '2020-07-29 08:59:34',
                endAt: '2020-07-29 19:46:13',
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
                id: 'cb42f3ad-6a02-424f-acff-4235af79f568',
                tenantId: '379b11ff-6d08-41ba-8e5d-e2ce9413b96b',
                tenantCode: 'wco4uhs765xwc418w5tialig8crmhjlobb338j7g7xxss0o43z',
                systemId: 'a00af397-acb8-4d11-8b6a-72d04eec80e8',
                systemName: 'qvw6lsk0s2j2qahd26l2',
                executionId: 'd445db73-8d9d-4c6b-9125-7f6f60e8267f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 12:45:04',
                executionMonitoringStartAt: '2020-07-29 19:25:10',
                executionMonitoringEndAt: '2020-07-29 14:30:03',
                status: 'ERROR',
                name: '3ndez9cefuq9nok0xmir2fda2ax9rzla0ntz1ehmbo2og6jrgqndioatmgs3y8cx4igdw91m5gt2z2fdk7jemz9mdfuqzuevvm1bhhmql5owz7xjh0yr80fgx0fs93z37xshf6nh31u9s095jik36vroozpuqvgmnrd34b93b25sa8boo8zyr54x5wzetgvetcgjz2xq7rqjqajweortb4m28v0ks5fh3ki6z9zfnpeym8jrj76d8t2pfsspapw',
                returnCode: 67735452302,
                node: 'a20rtk9f7n8nmhjnjbjoiu9slu2a7sl8kfshvsw8kxxas1mr3ir218k5i072qvccdrnv8yp67dntpolzdnmd4p7lf53sylyremgwx50hqnq0vpynjgoy38on0e9sa3ljarsqnypzsza4sbo1lxhvdl0i7gn9leb0',
                user: 'ti20cs15pl1z4j3w1u17v5g1sfe8l7d1ojz1m63abs9qszsbs7ko1y3b39c3mc9waajhfj4c76rqrodiovtatq6p741cy2eqjq1hlqunst0ggqxxgd9vrtsz640135lv7gzr3a8k8nuw1yz83v7tc5yzwcn4lpss9jcgfg7l80oofxem9tfi9lm8phh5ga2pc7e3t8s64nuag3bxvxhp9con0s671izrsgdlgst4nec1g2ehhi62raraqafpyiy',
                startAt: '2020-07-29 17:29:57',
                endAt: '2020-07-29 09:29:39',
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
                id: 'cb42f3ad-6a02-424f-acff-4235af79f568',
                tenantId: '379b11ff-6d08-41ba-8e5d-e2ce9413b96b',
                tenantCode: 'k9h40vvh2rlt097c7ortt121o5ubfjtd3sax8pmr4q2r35vjbj',
                systemId: 'a00af397-acb8-4d11-8b6a-72d04eec80e8',
                systemName: '8q2qas30bibyjpfirk3d',
                executionId: 'd445db73-8d9d-4c6b-9125-7f6f60e8267f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 22:24:45',
                executionMonitoringStartAt: '2020-07-29 23:22:35',
                executionMonitoringEndAt: '2020-07-29 12:20:31',
                status: 'ERROR',
                name: 'cbaoc1a1w3k0spfxduifmze6wc77mow5f5ljrjfmi2ydbcwplq1b3zk0qdvr91u75msxjlaal4f1nwzekxdromfftabqxzz9yq07oia0735p5iffdgrqh9j7t8c67d4k8kbfhhgyokjphjku69ovmvcd1uha2w4moxfgahmkwu5hdpvl82fx5ikx57hg1dtrw0vap5daswh4as1rqis2t6x6lg7x64gzy1gyzvh6wxgnyto1kyoxpcel799yfrw',
                returnCode: 9903641003,
                node: '7heuimxeophmlbz112jr6fmtwj5f551ohpyy81cgdga1d2gqfnlmrxo3eo9ww1gmj3u9pm926msk5npo32xa5rirxg5lzp86ejw2b17ba8pju2607xsmppnni74mczn9x9ndgxpxwz19zvqw84p85qijboo5gpiz9',
                user: 'f6e6r4gwwgt2yjnlcs1u7dx68ybk1ms96vt4abc77d6zhgeihi24kclhh4y5iy98yk5da86a7qxkp18ekomj0gohuks7n9zn0txy1wk3xmz5pwplysqnoxiel2nw3wsagd7gqv6nupmapgtgjd66l8udspzemvmuz942a5i5jsrslof04opsz38ss3mbwokn4urqwxkch351lhzjybupbhvh01189k49tlytvkd1yspqmcbpzy9bnt125zuynft',
                startAt: '2020-07-29 01:09:07',
                endAt: '2020-07-30 00:21:50',
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
                id: 'cb42f3ad-6a02-424f-acff-4235af79f568',
                tenantId: '379b11ff-6d08-41ba-8e5d-e2ce9413b96b',
                tenantCode: 'albwl5ya63jxq72irt813ebdix76ikhbum66qkv784rnj9s9b3',
                systemId: 'a00af397-acb8-4d11-8b6a-72d04eec80e8',
                systemName: '1ho2l39c2w5x6qe9pvkj',
                executionId: 'd445db73-8d9d-4c6b-9125-7f6f60e8267f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 13:32:13',
                executionMonitoringStartAt: '2020-07-29 21:27:55',
                executionMonitoringEndAt: '2020-07-29 14:22:30',
                status: 'ERROR',
                name: 'atp3jop1vzlinadh9onl7m4xotwzgod2c4w0xup99tztr0d5jhb54p2tx5p6avldar4omae6yc7q2zzhy71x31a12krmmoytc5u1rpu4urhm4kouot77bjxkfqycv1t8ylny9mdde63sc0x17xzep0775ee0klmd7bdombb9dhkk0wlfw42pvvbsi6v6q5shjogbnxha4hiywki5pq7jdox99p5hmn1e56jauwhjcjp5bwnh25ell76miozq2sl',
                returnCode: 1495010030,
                node: 'xn5n4eu45031g6biu99j2dyk2cv1pbsm1l5sc06mj28uqb4mdyq02e15hldb7j4m6ilkvzeahcq3aewmxflo9r564202dfc0wqt8ekp78h9fb77hnbi8nqu4qdoq4fj1kdwacuxn5rnq2sg49j9qt6rvuzab5mc1',
                user: '8b1om5d5c0581n2oqm47qk53sqhrfc74v5b6gttf8nxplux1giwjwigz0dnbqis5lm32q3z0w9fz2fhu26f2j9lk1dfoknjt9ztxk1vwn2vx5b0fhhusgspwbnksg8s7kf3swovlhits7zi4s8c8gdzfrpcth2h58do8drbsh5zmrpb2uigbmmp0gr6ll9t9ird1mtlih8mwm0rn1712ffhahikxpwpu9zwcvd2h446jkquscwtertirwmcjoriz',
                startAt: '2020-07-29 17:09:52',
                endAt: '2020-07-29 03:20:13',
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
                id: 'cb42f3ad-6a02-424f-acff-4235af79f568',
                tenantId: '379b11ff-6d08-41ba-8e5d-e2ce9413b96b',
                tenantCode: 'z8bdleawkz7c2fd8f2zfuj3rehgmxvu2vcmbb44edguia62uem',
                systemId: 'a00af397-acb8-4d11-8b6a-72d04eec80e8',
                systemName: 'fc1x360r7acpzo42p4c1',
                executionId: 'd445db73-8d9d-4c6b-9125-7f6f60e8267f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 07:31:50',
                executionMonitoringStartAt: '2020-07-29 21:47:44',
                executionMonitoringEndAt: '2020-07-29 05:21:04',
                status: 'COMPLETED',
                name: '4n9ll4gbdac09ibdym4flop22rbrs257avv8l1mxi286s72xo71nmkn792kpelz6gkc8yvh90u948oxbfdpjbm8pzuwauyp44jxkythsu6hz3pqvaxsxnr199isk812o95wka1nlbqssz81n1to50bqu26r7k44ezigtu65whbk7n6xrpe7p0lqvucfg8p6ie7r21wsui9cwx959usf1nnpjck6ifilf3hdc4ne1j10v9hxftotou8rf25mr8pq',
                returnCode: 100.10,
                node: 'b1pngmzigtpkty0u1gaqlkq79dun86aig2nsve6oustiykc1cg8rcmqrb0hn5retblmrtdgj3j9xgofti48llw4czq6fzdcp9tqwyylapmswipe8loegpam9kklsym6thvqy5xheqwn2smcnuaxcbuqvicd092t8',
                user: 'a2win959idqvswlnp15zvyn4m3wedq1pbx5uz4xulmz2p75j8ddyrtzqs1lbwejyrznh00hz7emgpib0csr0o8d52ivg167f2mm85gqbs9t2qngan7a5pl0wttb5ahp94521zm74yy3eelrce7vk6572uhdmfp00exxd4c6dvj5y2mu4q9tzq2602ksefsyregoe5ug2mlypa4d0atfs4uwava3wmo6scfqgexzwlpx76q4e24yy3f5ooo98bx9',
                startAt: '2020-07-29 05:14:02',
                endAt: '2020-07-29 14:41:47',
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
                id: 'cb42f3ad-6a02-424f-acff-4235af79f568',
                tenantId: '379b11ff-6d08-41ba-8e5d-e2ce9413b96b',
                tenantCode: 'e1ztjmzan9x1f6iwmu1tqszsok03qjjw3zp5mls977px7b1mg1',
                systemId: 'a00af397-acb8-4d11-8b6a-72d04eec80e8',
                systemName: 'saafj0fcdvjto761mlih',
                executionId: 'd445db73-8d9d-4c6b-9125-7f6f60e8267f',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-30 00:57:29',
                executionMonitoringStartAt: '2020-07-29 20:47:53',
                executionMonitoringEndAt: '2020-07-29 07:58:50',
                status: 'COMPLETED',
                name: '1xhc9nic03v08kwo6uraz3h6f1dnn2flyhuei1yry7wqsz7i40w3drxgyjo6r0vlz9gdazf2m3oznb2ssu2b2fu3na1q1et9ez7im0p09owjst3l1illbkfb5bnnoyhhaujjqs4tdlz6bwg3gu8vihgll6gi17h1h1hz8c9u17xz4gwvyu6b9yqnerm6e04ooan4o9ymnbhconpwv0fju2wososayxi4z5ak7xszmebi115lytrid0qfay0xog4',
                returnCode: 5583374219,
                node: '7gplt1y9kwff9hv7tngxiwwh9b1320x3207r0nx6aleyuonvendl6dklzqyybflr4vb4g8in0xqk5kau1dcqap0bebf5c3m5i1he3oh9jvdg5bhxszue8kmvl1j344jnvb7u922ixf1yl8eevnz3zrj3lbwr9w2e',
                user: 'bdwviyccsahz7vwmdk4ew4vw8rqjar3q0950a0jtg0z1c6kgozwm8nm6kwcoc5mj0hzfz1t6mn3ltrtsfmiptutkuricxv17rmyspm5kofcljikqkeqoh6nwpxbex2dnhnq8xdzt0bnl575rem67degh1rrn0n3fgm0799msg6kg7d4t9no2dke9vq7k6vmpzgmzl72z1bg9gncxbmt0sksvv7pmx4sm3bnyn0lqcj5zlmkns43zxw7klqp3ob6',
                startAt: '2020-07-29 19:52:14',
                endAt: '2020-07-29 21:31:16',
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
                id: 'cb42f3ad-6a02-424f-acff-4235af79f568',
                tenantId: '379b11ff-6d08-41ba-8e5d-e2ce9413b96b',
                tenantCode: 'yn1kratwqg32c6e2nxzx976iduh2fp5cqfxgs370y5ypnat2q6',
                systemId: 'a00af397-acb8-4d11-8b6a-72d04eec80e8',
                systemName: 'dd68cctvb91erkhjwx2g',
                executionId: 'd445db73-8d9d-4c6b-9125-7f6f60e8267f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 01:46:12',
                executionMonitoringStartAt: '2020-07-29 21:54:47',
                executionMonitoringEndAt: '2020-07-29 03:26:05',
                status: 'XXXX',
                name: '81o46q3ao4hkuhq67v7k6xcg0ud0lfaaqopnod0e9788pb8cuyvhhk0qexw17dqbyol5esygpfz2tplugjxmtrkog1r2477thy749gmparpzro54kuxinblqaj5wvk6in5e0p1f9ul05ohc1f6u6tdu5f29gd3cnjdvgwiyl8i11lm9t1qveh58uvyj38witco3d154sxxd6788nwngmlo0xrl7y6tjtbt31mk9wkp3cjh50wccnro8hpoofxzv',
                returnCode: 5223310693,
                node: 'fl2xt7b4a1igomilt1ddil4oh2axim53i36aqarjqpf9tyygsosm96de9ymy0zqdlzg052fhxzd6s4umsvdp4w4d6yiq1mkuzdivz9lfekp9hmlk8j96wx0wmjh8kvgqj4ubo1sjdbh794ss99eeaua4u15mzd3g',
                user: 'd381e359w6sj09i9jup1n0ewtxci67nzdjb7c17ekchrl5rc67qhg53vys50htqzktem9o7j8u1bmy6t2g6d90oc5v16dz7oc5q6oaq8pu655ovr2nse5qhuzv9njmombj3gxe8qqhvi054byry5tcck1wyj577f6xi718r6yrfdkppzxbn3obu44alcvfdhyh4xyisfy50he4q96o1diba0bl0i343ingq5ffv3hnbl2zq6frzowe66ostvrhl',
                startAt: '2020-07-29 13:58:17',
                endAt: '2020-07-29 02:52:01',
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
                id: 'cb42f3ad-6a02-424f-acff-4235af79f568',
                tenantId: '379b11ff-6d08-41ba-8e5d-e2ce9413b96b',
                tenantCode: 'm3np44cxcaj7qy47m0cxycf356k1ogsv82aiugbrekdcdc3orr',
                systemId: 'a00af397-acb8-4d11-8b6a-72d04eec80e8',
                systemName: 'hzc95o4d1y9m9huqmd49',
                executionId: 'd445db73-8d9d-4c6b-9125-7f6f60e8267f',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-29 23:05:52',
                executionMonitoringEndAt: '2020-07-29 10:59:08',
                status: 'COMPLETED',
                name: 'gaztcdqplcx5yy0z8z5rbn11cbc67yj40r4qzymmr21de22ec0jbugvqhtrfwx0ornlcrd67wy090jwqovacyt300wc0e9t8ocoou2y1gggtspessf0zjv6wcsrf92rx7quexyzuz4q8q7sxrr4mf53km49affewehtcqpxhyg9r5bnl4oa9xgfgkalvwd6rbd7whqd85o11xvfod5k4259w8d80uwgbfsbccadxt3xh6mqhk70pgybwngwblan',
                returnCode: 3357471467,
                node: '8ex4ady5oiiltl4bt6jdwax83rfns6y27a0oozyxg1xzvcmrgyycwm5wj5qumoajsohwfvuttz799ld2u7spurjkiyzsbu1r5e4c4q3t3222y9qikvf81rvxc7tmfqd1g9p8omrkcbxqcqc6rkwt88tfgourgv32',
                user: 'js8382qhrti9ra5of9uh20l5nqarn3yl13b0qm9zcxkr2vy9zdrkaga9xm0bxntyeul2fv80o7hthin49uayjnbubzyeh4s6p0zu95qwexaazppa5hldzclbhb84ocriohwh5elrxzsmsl7rawb1h98i0jjipw6qjfsvpi6wr6404p88et8z2te5rlu1k8g2ugyaddqoypi8qej4il7rll50pqtu31vegn96gulqzawlgk9ch5cadsedb5j5wkm',
                startAt: '2020-07-29 15:00:22',
                endAt: '2020-07-29 22:03:52',
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
                id: 'cb42f3ad-6a02-424f-acff-4235af79f568',
                tenantId: '379b11ff-6d08-41ba-8e5d-e2ce9413b96b',
                tenantCode: 'rc1ou7ylhgfpmqhex8bgbxma4i13t1awu1w6zfc0ub8ei890sy',
                systemId: 'a00af397-acb8-4d11-8b6a-72d04eec80e8',
                systemName: '44uj4votsevjhdc0dfv7',
                executionId: 'd445db73-8d9d-4c6b-9125-7f6f60e8267f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 20:12:17',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-29 15:45:47',
                status: 'CANCELLED',
                name: 'axtyp4w1avnqum4ouilpf5y14p5yfgjlbi46kzgiv78xshbkemvkzfnuvxiy1gt89z8y2espesi2hz2xhea7waa5xve7i3l3lsdngcpm76dbzaqeagv7427svbeu47lnhtwovrpnwnfl4x2sy02zsargbmv0zjj45l2yfy4ddryyt4ofct7flv47hha8vy2ib8pjrxvz1aew9fdh2l8mg9hcdtki7c7q344xybuzf1p4pjcl005jvskg33js0tl',
                returnCode: 8132600733,
                node: '63rga52mddizko9s3glw7jss9y97ekg7oki3pks8b8lrl8gdi9ou2mmwwgfjkjuf0cos8e633b7wsnexbryqzabblrsp80vnidb7ujf2s1hgljtd0qgykr78fuizokw4yh61y61mk4litwij7o4ygvswx4r9l7ye',
                user: 'q8d6dqlpzpqm7gi5ta2zy0v2ewa2e84xaqumouun8k70ccs0ccyslp41nppimzzg9i1xzl806imjspikbcixtcdim0s1f561ydr4xn0saigxkkow3n6k9z9glw5xkw226bu7yuxe8740a6ye6i3e0drm8qxqd49wfvgwdhsqrxti2e8awhdps6yl9yw7i0wldk2ugbr25txeukv591scebcyszzy736fxvp2y4zphgtcnfj3t8cdpf9ulnq9f5w',
                startAt: '2020-07-29 01:18:40',
                endAt: '2020-07-29 19:02:30',
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
                id: 'cb42f3ad-6a02-424f-acff-4235af79f568',
                tenantId: '379b11ff-6d08-41ba-8e5d-e2ce9413b96b',
                tenantCode: 'hkegr6eur23kaxoiqd5h2vxry3wi0pwoe6n6edgg4hg0w4k793',
                systemId: 'a00af397-acb8-4d11-8b6a-72d04eec80e8',
                systemName: '640amsw1eyinc7pm6axv',
                executionId: 'd445db73-8d9d-4c6b-9125-7f6f60e8267f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 23:49:27',
                executionMonitoringStartAt: '2020-07-29 03:40:49',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'ERROR',
                name: 'xbs4m2zmbve5mb2z669eto2r0rxe7jm92ex5bc329jbn678lo5eeotsxesngyey8xnmsp443bexjlhn1jd65qtk162gvgah5hn4eomzwqegqtsv68yvfawyxy5neimjtdp75lacz0xs7zg79jl0nfgdmylayzck4cydjj98ji7zqh6jnf83rggzfmlusc8zsm1w94wptzwnlj7hyfi8mckxs7543jjkybx0d5rq9doid3v59ub4z9ih0sqchmxa',
                returnCode: 9993672785,
                node: '0b6piyl0dgztp7osbqui1b633d5hf7r6oxtz9s0q22raubt6vjgazrwmmo9ogasdixg25zlt09uz227ljrr2z3hr3xlcu9u8lz3o547z7d7hymuy4jns235zej23upvrapbgwsg9b8n405ffyefkdfvwzr9iou50',
                user: 's6g4l89aftgyxbuaoq7az2m1ffd480qr87bk1nleqeazqzrl82zh15sod6dtchydu9jf6fuxolmgm00rwwj7hvacfu7vcu3274vbycjswir90xgc5wobig5r1003rcgkp153v600y48mjora3voj7au8jn8ctnkzip3z0kd0v6mdxa84uown672cjk0519x3fm1pzcu8tnosgrfcpdkwgisrph1pp0jxla5dlckkwor8sngwwd1ov5ixjtdn3rd',
                startAt: '2020-07-29 23:06:07',
                endAt: '2020-07-29 10:46:25',
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
                id: 'cb42f3ad-6a02-424f-acff-4235af79f568',
                tenantId: '379b11ff-6d08-41ba-8e5d-e2ce9413b96b',
                tenantCode: 'b4wkfcbqy8m153tyvs2c4utbpp0xehzv9mh22lhur6fgywa4uv',
                systemId: 'a00af397-acb8-4d11-8b6a-72d04eec80e8',
                systemName: '9g6xz4wf4g4c35u734ln',
                executionId: 'd445db73-8d9d-4c6b-9125-7f6f60e8267f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 19:45:20',
                executionMonitoringStartAt: '2020-07-29 17:23:21',
                executionMonitoringEndAt: '2020-07-29 23:36:43',
                status: 'CANCELLED',
                name: 'ap73615he85o1eb69i7y3ne2i6cujw35vrcdbaepgs5fcqqp4117wyqxc2wobr1yxfa18rv1shwgd7szagotnsz2iod7rfhv7iu2utbw261c8cctixq9a3e3zlw3kgb2wdgenlerq8pznqtuwvmtn4pek9m6qks15lnplvo0oi8pm7gn7oyc7iwp1pnj2955altv0he77gouwrrbn6gbrtbxeoaysg3fow83u6mg7yunnxloqsov4h17jwa72gc',
                returnCode: 9691352525,
                node: '61fm1nvg2wqoidlkt4tsodgj2vdtk2bafcn6dzwjmegmht2yu0snl2phgzwt2949te75fgex6z6xdq0w98vpjptyyyvfva5w22utp1v083qe15ue1xb5ol4q8xkyzklzbbom2mm1t3mg9h5l7m9hj8vxy0i8946b',
                user: 'dz6qbs3r3qy9e0fnjmqy0qsoqugoc4ft1gmagklfcan4aj8k9mp4wb7u2z2hgk1k7huwb5nbxgtse8m4msdc0dsnoxl770gnftfrsgwyw2ivnjjyob565vmvnzbivmmuoje1xd1ncjy0q04cwn7fclteoo5rpwabf76zgulbgictim1yowiolvmowriw38z234mpew5ydwg0h4a2sja9vi79uq8ik9t14dnjxschsjr86os88n0eyqvishg230n',
                startAt: 'XXXXXXXX',
                endAt: '2020-07-29 02:09:16',
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
                id: 'cb42f3ad-6a02-424f-acff-4235af79f568',
                tenantId: '379b11ff-6d08-41ba-8e5d-e2ce9413b96b',
                tenantCode: 't4rq00m62b1q44rv7cy2mg59r7b5c4xyjprcauseqp79z6v6xx',
                systemId: 'a00af397-acb8-4d11-8b6a-72d04eec80e8',
                systemName: '0t4a8rkdt9jzqy6nt6cu',
                executionId: 'd445db73-8d9d-4c6b-9125-7f6f60e8267f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 11:59:00',
                executionMonitoringStartAt: '2020-07-29 15:32:26',
                executionMonitoringEndAt: '2020-07-29 18:17:02',
                status: 'CANCELLED',
                name: 'ftuk3wn5sflrw1jdz0bug8bkz0h2j8fig1endsbp297qoxw68hzqxmbh29n6tuqs2mvxd3ak1znuio5ata2sg0353k35053qyh1h61uwduze3jdw079hgkjgixmw0iyq2hxf6hhmxtkxmusww9o141m1i6dlpkc6f5np5se1tyyfb6nn46lge80gojsumehp5d0wwc6u1dqd447n3mal4jtmo9axh9607kvy4cy66hpiys3svsmb12yjg8hnfy3',
                returnCode: 1822515052,
                node: 'loabgw1kgu76otqfsd08v7nugh2bkl9rpfia6pqszz82k943laapq08gumpenrx5yum5z693paqqaacqzdjrdeja3m2mk2n50791xc38jh5qblhym78bh3gmz3dj2x5wrm0t7tn84rkh9zqbv0d7efwlwk4l5hxl',
                user: 'ipanabrj94nvr7kcc0n821m3tjpzptnqvltwpjiiwnwwcu37zsa882djou7y1903ghhto12zc3fmvqy31nsrnjnoe7lmeank456sw2j6658g6gidhbavppmd0irza6muysg39aufo1ozz7aic7oj99oxa0z900t30rfzrs8gquwu40v2pxa2sj9ec6jla63hxgpv9kzyhl341x8myufsyx083teyfvrw2wka49boz5j6w7g5kbh7msnivfzlayf',
                startAt: '2020-07-29 21:45:07',
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
                id: 'cb42f3ad-6a02-424f-acff-4235af79f568',
                tenantId: '379b11ff-6d08-41ba-8e5d-e2ce9413b96b',
                tenantCode: 'qqs6fd0uss8ts5fg7rkbo992pnyulyyza8dnrmhm88x7qvmjut',
                systemId: 'a00af397-acb8-4d11-8b6a-72d04eec80e8',
                systemName: '9yjb3bq38ugejjgbc68q',
                executionId: 'd445db73-8d9d-4c6b-9125-7f6f60e8267f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 05:00:15',
                executionMonitoringStartAt: '2020-07-29 23:35:22',
                executionMonitoringEndAt: '2020-07-29 20:39:45',
                status: 'COMPLETED',
                name: 'hvchsqzzo6lhu0l87ltqv9c6yype3giusmdeu6qfuc88xtmkwanabnry6gfzclqjnb8fxcec2wi3hfv2xsrikotnetqvvl0ob5ka78xmpbi75k2ziea0kwh98vw3p4nlwvhdwwl76damzrsjs7ck0av4o4cefo13gtj17w6zk4b4l3elo4eky8ivovqckmon65puq62v7rj09mzx8ophvlgbqwayxn0cj1tr6wv6oic8de1h973on2o9935na0m',
                returnCode: 2636060099,
                node: 'zdhsiwwpkl5niit09uuxjyiixksm6g6a2vuf6c4u6yrz0udyrvc51rzymgu4q7om80cr5iwocpxnsssbxxd4xtrugl5vyht228dyb78v49cq5ctypuf505q1h8n0h7lb69753h2xvzxkru50mzb460itt26b5xx1',
                user: 'cxkt7vdwbqzv9g01eeztohl6guaugnna4m59p1l49zj6hoveaayvmnbz0lsowv8pzv5b8m9u9xvbp1jo9l3qareohl6i369nlcxc0v3aqzrhy92dmnnfs0858dwargad73gdwy8fdyupc9mfkijdnadirlavtrdbw4qll9avlhbjxxude8ls0yu6m5cfbhv8oa3oznsw23xdn1o13nd0pyrrzh0vuxglmx4794colu3cx19li0puvumpc4lf23j',
                startAt: '2020-07-29 19:33:34',
                endAt: '2020-07-29 13:37:49',
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
                        value   : '27db2a2f-cbd5-453a-ae51-91332fe0737a'
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
                        value   : 'cb42f3ad-6a02-424f-acff-4235af79f568'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'cb42f3ad-6a02-424f-acff-4235af79f568'));
    });

    test(`/REST:GET bplus-it-sappi/job-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-detail/3d9ee7c4-dedb-4f4a-8d52-dc56cb494eac')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/job-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-detail/cb42f3ad-6a02-424f-acff-4235af79f568')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'cb42f3ad-6a02-424f-acff-4235af79f568'));
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
                
                id: '3a76bb74-4d22-4d8d-9f63-30ee818f9352',
                tenantId: '6604fa04-1ba5-40c5-9079-9b12a5f9e59b',
                tenantCode: 'hasdvsddqtbbbe3r71mka5a3cr5wz8lwvx1krz664ig876lak2',
                systemId: 'edcd483b-00fb-4ce8-9624-894527a15ec5',
                systemName: 'ofa8bl24mnxkb3aa2oiz',
                executionId: 'ff541969-16df-483e-a501-2c9a93b9745d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 17:27:12',
                executionMonitoringStartAt: '2020-07-29 12:29:38',
                executionMonitoringEndAt: '2020-07-29 15:58:36',
                status: 'ERROR',
                name: 'vr84cxt5gw2u5ymhhk58ioy41gm5n1h71mqyxmlan5o3xaac7gv4mwmmacrz5x1544x8oiqa5swji2gxo9u6jvmvwjd0z17zqpxv9f31din0jcvraroyovl79tml1adz0s394200e0ie1oh9tndbu6d3i94q22lyqj63137iif98d56axj37diusrpd9a9vebkmz7p4hr4q4o1tn0ubx1dk1hiu845ncn28cpffeezmlkm3j7tzw0073fd3u00w',
                returnCode: 8689178377,
                node: 'tbq3ixiugrbln8kanciodi2scsmt5povc62lbuxgdxrihzyu8nrmycn7udcu2v56i6ardpke58fdergotqe5k8m2urtllkd8s1l2ey8wm7vo2wvij13jfarp036t99ufanldgbvh5zsnm716tw5jtbzdrnr0h4lx',
                user: 'e6qpqcb8sv2wg85j6v466a4pt4uk8ofxu2ahrx88albqz3h3ws67moyh1gf7l4xwx5tdwstuyp13snio4r27r08nsetms0s2m8flvqrjewjkz36zttz1e1mi9vfq05npsai467mvhg1hw69pbaprmruxw0c5jy87jotdpv27pfh3akwdngpjdo0n6liywyqubsktlcej2wo553bqqpepohdyfo79ixnxgangee6qcz0k489w0962f5fnp3vchq1',
                startAt: '2020-07-29 23:21:25',
                endAt: '2020-07-29 08:38:39',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/job-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: 'cb42f3ad-6a02-424f-acff-4235af79f568',
                tenantId: '379b11ff-6d08-41ba-8e5d-e2ce9413b96b',
                tenantCode: 'pfxbt05imbwrgcs0uta02fbokpibo3a2yu0gvu1hhwhzj7h8tk',
                systemId: 'a00af397-acb8-4d11-8b6a-72d04eec80e8',
                systemName: 'krfyn6vagkszonlav1qc',
                executionId: 'd445db73-8d9d-4c6b-9125-7f6f60e8267f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 02:01:18',
                executionMonitoringStartAt: '2020-07-29 14:19:09',
                executionMonitoringEndAt: '2020-07-29 09:45:14',
                status: 'CANCELLED',
                name: '8qh4gtpb1xqinx3fyeblmv1k2ojm1f0lyz88100sgxd4r6k2noy4vyv7xhegnuie06v6e3gn2fo6tj6udy988h5n0o4lyeqjrqr26etayq5jvfb8ignwed292xkyx1b8lujw9ao6g7s2v1tyooaeh1719w06hdefcqb9q0e4vwqeo5ftfmplhi26n9blhqcra7n8vjrikam3pcso493xdihkq69blhly9z5m0hb0rae9hs2ua8iua1iia3mghfn',
                returnCode: 7581553124,
                node: 'r3bkdlp3oo5b8fjnkega392lhbj8rgvnrhvk9113recrwam03wfw0jut64ou0a1imwj8fky8t9qkmi2y2ncmmqav9hldoabaabpkbtyl6jgrngyxd71q9b9pjotg4t48ne0mcnctob1309xpn56zia98zrslt7g1',
                user: '2dcfxjdka6tikxcadmof4vhlhyuvipbsx4xovskdf5pth5puukj6e7v9wwypuc1l64lc2t8whzutehrxzyy23ehqrv59eezwu5d32luujui7uo21wxojh88dukayo6w6npd5r9slcax7ku4raplv9vq5nxk683wmc5z67bzow38clqohc2ic1obnqicwu0iwoz7tuo2jherak2k90knfctpxxkf6jyjly2d08dxxzw8zs8f87m7dzntqikx34br',
                startAt: '2020-07-29 21:36:08',
                endAt: '2020-07-29 13:34:40',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'cb42f3ad-6a02-424f-acff-4235af79f568'));
    });

    test(`/REST:DELETE bplus-it-sappi/job-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job-detail/d61d55a8-d84d-4bff-9969-80b405fd0136')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/job-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job-detail/cb42f3ad-6a02-424f-acff-4235af79f568')
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
                        id: '8329366c-9930-464b-aca0-334b5f038348',
                        tenantId: '379b11ff-6d08-41ba-8e5d-e2ce9413b96b',
                        tenantCode: '0lrmloy90qsnf868jmjmtvhvr4topl6fq8ngg0u2bqfg6g8285',
                        systemId: 'a00af397-acb8-4d11-8b6a-72d04eec80e8',
                        systemName: 'k6sx4fwoy52wdqaq0c5g',
                        executionId: 'd445db73-8d9d-4c6b-9125-7f6f60e8267f',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 14:38:24',
                        executionMonitoringStartAt: '2020-07-29 10:09:18',
                        executionMonitoringEndAt: '2020-07-29 22:45:43',
                        status: 'COMPLETED',
                        name: '4d6znuk1p94h9gq5748gv6088lmj3a36fktf35yx7yqq24toqzy0wukujlg9rhyc6xiqqdyc2u7zq1e66hldy8il3qv8obtpdcpqtwrefaq79jtr956tqxa9d7n31rg6invq064gcsgyh9lin70xvuov6f657nfscdbzjuqu703tjs2ik9jdcc8jsfi3vqz3b9dslx9q00xze9frryd323dzwkbnj4mx88rt7y4bxui8kb55i9dw2x4trw3o450',
                        returnCode: 1064374565,
                        node: '8ctnsulmnjf2lk3nsn245kwbjwuzwnqkjwnxymamvbpidlabjujuabhcbfm1d06uezuxsj9c6bfjxx2xmnqx5zcv2put6t2fi1psgdc6reyakzl8yo47vc8jtwjzgfeyf6f7vzhgyac746xwtpdbtfy0gxfmkfa3',
                        user: 'ozk7mu7ququ2abb4wvlrk7zu5u00shlagsadkuswg2cp4ph6u10b6kw63ivnlzb64kbj84fojyyxcpz4fiq8nytkq0z4o86sxq6vbkve40d87uwgtx3syc6qr3jdvfdremzyunvibyn3d5zzced3kev55wq47jdrspidk6e7v4kl8aqs0w3ynt84r84h148inohk7pvf8ply5z9t55v7wkgo9xg37hmyvz2xu2diayxqup53tlz2q1ezmeq8az2',
                        startAt: '2020-07-29 20:08:51',
                        endAt: '2020-07-29 11:11:35',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateJobDetail).toHaveProperty('id', '8329366c-9930-464b-aca0-334b5f038348');
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
                            value   : 'cfd45488-3332-4c5c-951d-d9d639e48335'
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
                            value   : 'cb42f3ad-6a02-424f-acff-4235af79f568'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobDetail.id).toStrictEqual('cb42f3ad-6a02-424f-acff-4235af79f568');
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
                    id: '544432c0-4bc7-4ea7-82ea-d1eb90db8ceb'
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
                    id: 'cb42f3ad-6a02-424f-acff-4235af79f568'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobDetailById.id).toStrictEqual('cb42f3ad-6a02-424f-acff-4235af79f568');
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
                        
                        id: '4e382419-24a1-4a73-8914-ebbcc9b59990',
                        tenantId: 'abeb3e80-76b4-4f1c-b3b1-fd6455bdcf1e',
                        tenantCode: 'p85v4jo399yazkh7bjbwi8m0u9f9fzxz37rv0nlhtah8f8kec9',
                        systemId: '6d4e5869-c13c-43de-b4d1-3b0f0a3d4359',
                        systemName: '4fumijclkrvre1vs1lkb',
                        executionId: '1280a4c2-9380-4405-8d9b-82316355bb8d',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-29 14:53:37',
                        executionMonitoringStartAt: '2020-07-29 12:11:17',
                        executionMonitoringEndAt: '2020-07-29 06:28:30',
                        status: 'CANCELLED',
                        name: 'h98drie10qnzzbx7m3olhkcdxdh4vs1bh7omrps92x3w57xg64vaahn1tvx4u97jpp4r0n6b0txkz7x1i8badk1n7iov0p1kpg5eldfylavwx03f1zclwqrzk73tzuu4wgbcyzguytljnj1mmyh1uixcm7zv1tsfcs6p1510fr2rtv2fg5xc0rpz2r3okmhdpbj42q1zzuktiwtdl4njptqg7dyoob3hp6ufzzzpf7ldlruif5d3f40xdyub7t7',
                        returnCode: 3322458249,
                        node: 't4sbj5o25nk2g2rx2h2u24dzjvqtuzudbb06p7bnucvww4jhf484usksqsqiyeblon05zcl407t71az8db32925ciakxamw2zpfts2u25lrmp5y6q4eje1ayox0u2d8ft0ilo36kr2nd1clq9w80v2rkg34zbp7y',
                        user: 'aaltqikfsw7jtkynv93jqb4a4y3kg1257k93qfcu24e6sqaosvndlxsl1d7pzofio8b64thip8kt0941hag22kq9hmyhgib3tjy7epgfr2lh8kt9x9wgqgalllcnl9zlfp4e7y6nomzfoh9ry5roenvooumsh1wjreey6mbub6c1pdoic6yu5jbn924rvket7lbdqv390m7uphxg9xuzuu8aaal7z9di447qfck2d373vha4z9w1ac76hvwnfla',
                        startAt: '2020-07-29 13:36:30',
                        endAt: '2020-07-29 03:06:46',
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
                        
                        id: 'cb42f3ad-6a02-424f-acff-4235af79f568',
                        tenantId: '379b11ff-6d08-41ba-8e5d-e2ce9413b96b',
                        tenantCode: 'u2waez7fvt41k2h7r5infobv7tlx6ixxnhhb9kficl6mpvvqet',
                        systemId: 'a00af397-acb8-4d11-8b6a-72d04eec80e8',
                        systemName: 'hoqijtry8dkmmmzpwz23',
                        executionId: 'd445db73-8d9d-4c6b-9125-7f6f60e8267f',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 10:28:57',
                        executionMonitoringStartAt: '2020-07-29 08:44:16',
                        executionMonitoringEndAt: '2020-07-29 08:49:29',
                        status: 'CANCELLED',
                        name: 'f6lb1vqx2gpcs34nqbt1kwhrh0uhjbgx7opfenjqeiwxyxwbqjmb2qz7ht1f62eyckdxejk53q0h4se8s2ltgg39o1hbiy5w42gzmnfhz1gkyy9lnh99kr84ncoi3qk3i1odw7icpwf43jpwgqdxdy9a5kckvb8b409flwp8ltmn5gq0v77r299xfu7h4rfduq50199on2j92nlss73zc8iiqdxi3dkeal9qwo07w8c2kjs6f6p8deblqgou7dg',
                        returnCode: 4236969053,
                        node: 'qdr154ehmqolb1upcs9jrljuhi2pcufzfj9w3312cafhh7thgm3ndse5iwiu05xo78yd5gj60tjv3g6uk3jgzptw1h9vbim07qdu9aetzq8g7ualszihe25xq2n0xd6dsuzpk055p5p8e1kmo89z70as5676rfyc',
                        user: 'w7xadp58vumtigekhaj39a6fhrthqe6hcl82r9mkslfn6yfmfv637qlwkgktnry0gwh3s1j8mn53jpkomk1kjtjfymcicciqi10sil3csxgg3tjj44ltt6qz216qi822r3me415xgic0mbw3iya90nhdm2g5juj8uh79n5h99f4ms5pllyb9o40s98a5ksudgv3ae9o3fksfga8b0r943gts8f9ib9eyn7yna3i2338an1n5ops1u03aktweznb',
                        startAt: '2020-07-29 06:49:24',
                        endAt: '2020-07-29 03:26:31',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateJobDetail.id).toStrictEqual('cb42f3ad-6a02-424f-acff-4235af79f568');
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
                    id: '1ba83153-9a70-41ee-b01d-35a59656d651'
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
                    id: 'cb42f3ad-6a02-424f-acff-4235af79f568'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteJobDetailById.id).toStrictEqual('cb42f3ad-6a02-424f-acff-4235af79f568');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});