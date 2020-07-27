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
                tenantId: 'b7ef8f9a-5525-4206-88db-da0a0d5c25a5',
                tenantCode: 'dl5n62m28cc101rrpglozkcocu741dvy821pxqk6kksna1t2gz',
                systemId: 'd1044a1b-7fdc-47ea-9065-8f232f9f8240',
                systemName: 'oivnwmgwukl2wf2gb89y',
                executionId: '55bb5b6d-7c55-41b5-9f8d-0a4b84685596',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 08:04:56',
                executionMonitoringStartAt: '2020-07-27 02:40:24',
                executionMonitoringEndAt: '2020-07-27 18:55:47',
                status: 'CANCELLED',
                name: 'e8c0uk8nbt9je4od25t36cjs34br1vu8m59nlkjta69n50db8y06lnkh0w1v7ehq7a539bp17l5mxkhovfivl4qpg0qlgw4l9bm7gfqduj4hthjuca5p7gjs3817axkm198zlczicbk7au25lpgp055puo0g9aejt7kb51eugt6g88gghz2isgaqgknftjwvsqrtmp3rno33v7ririlahzlqmurutwxoqdxfsxao1na0l8gjco226yxnuysl6m8',
                returnCode: 2276016955,
                node: '0d1hbir0txbvrts4e8lr1q30w8t3586of1bkqjevb478w8jigaqsqcw311wi8sn6372yfcudcyv9zkeh98ubvg6hrporv8zykq8xj3u7f1i5t3wuucqsdk6oet26j3nej0ep785754krowlk5lws3wb6hy629x4o',
                user: 'pomu0d7hkucw1h425m4u534l81fmcbdoyk2npp3a9z866gisqrlnvrzutdbgha4q6r0xd22j0baiiaxgm22qmglqoszco1rk7dyk5rm4ar4gexurg2eh7a9hlhayei0j0s9ontqh0mcalex6oooj22r4tv2pj2pom9g84ihnwq7krjr3mqoaj02f24mwn8upereq99399cr13nao5bn7qtdljqctaeaupcyqq554kc8f59q4jkh23vsqvr9gls1',
                startAt: '2020-07-27 15:10:37',
                endAt: '2020-07-27 10:22:32',
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
                
                tenantId: 'b7ef8f9a-5525-4206-88db-da0a0d5c25a5',
                tenantCode: 'owilfcvqztzb2j3mua3rm898gov8nwxbic28n5b8qk3cho1ttz',
                systemId: 'd1044a1b-7fdc-47ea-9065-8f232f9f8240',
                systemName: 'rkesgyqkwdtm7bbqz51j',
                executionId: '55bb5b6d-7c55-41b5-9f8d-0a4b84685596',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 05:00:57',
                executionMonitoringStartAt: '2020-07-27 05:26:18',
                executionMonitoringEndAt: '2020-07-27 11:05:10',
                status: 'COMPLETED',
                name: 'chin9n8wdf1gl7sseqsd6tig3mwahoul3tobaj5y2qso8d6d2p69eut85b076ywiwrmd6c4czlv41lnqr7tekhs27dibpxgzxvxhd0bqujvoeuh6bcw5jewmpx3xemewa333i5d54ozrtzxggyt9v6rwzzcn4skwuzrmrgg7vuecwenixg08e97o7cbsal67ftl6ydz8rcrl26s0tizduoiimbne44adnpdl0a20vi783om61i9cx50cat23d72',
                returnCode: 9082764024,
                node: 'zpcsu61pozkvx1pm8mvr1tz0h336otfi6i8rq21tmkgmovkmnp7t8ay9owzi97owjbpfwuydx6wth5y0duj9afhf7c1vmbpw4puxj44e03ckbkjcexi7en74w6xzy7ynl9hygdsj81jagskpx5awd94yjhndizjh',
                user: '46ymr7q55sskts7xjwmjyutoim6elrle04kvpt2y9fq36nt6ntjxyjj2ek8dplsjob8uklw23agqtdoye9jb7ze4w9qov5e5v6hyz72ig3cntqmewdhih6w5m5xtgomxsdhtu6v4y1ha74z25677m4zscvkip8ogz1rurl29zni9pkl9ctc6h818s6rzw1y9img01glbdzawcwbvrzyax9ljjwx0bbm53nioh8v46n0c26enoj4achmnya6lzls',
                startAt: '2020-07-27 01:42:31',
                endAt: '2020-07-27 02:03:38',
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
                id: '4d3aa02f-09dc-445e-914b-8f762921b63e',
                tenantId: null,
                tenantCode: 'y46lbjcu8n1pdxjgqsos5k9rinorzxx3yrhgobf8qoe1oeoht6',
                systemId: 'd1044a1b-7fdc-47ea-9065-8f232f9f8240',
                systemName: 'tp81dxrfq9akkew2pnj9',
                executionId: '55bb5b6d-7c55-41b5-9f8d-0a4b84685596',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 17:44:57',
                executionMonitoringStartAt: '2020-07-27 23:01:02',
                executionMonitoringEndAt: '2020-07-27 19:29:05',
                status: 'ERROR',
                name: 'aj9ubn1x7a5z7f0tf4sdrgksrrkykyqj2ujxrq9oy6fra55odtenpke2n5q69d3e1bcfogbtn46dqmge4j6kavqfwb9dpzni4cep9bvyi138j7eh0lzhk2v1a5dap8hafmq60r02a09yiot8fjbe2cscux23v10mjg0uly6lhosbu8c1ibrm3dyn5ld327z83yfi2s8qb90xyrh5q0gfh7vbjo1znc14etuirujptcq0bypaix9hhm6wt48c50t',
                returnCode: 6173304083,
                node: '9670h37nbnnuun5kduz59iokw195zm3ufy0rcxsgs6jynmj77ijafmy2z6baq6mcn0lwxyp112ad3a5ctz96g2nyj8wqfefzabs58xxr62zpefzyci76vjqvbco541r6uwthdbskli7gm6nb2s0nw6fj0vn4o7gt',
                user: 'b0h6xckalhqgf1lhld7qbvev0nifdyca79kd9trgw0z2eqd3gr119dnw7igjp1d3en6wbhbfphphtvqzg258zp8ywuawnc113gbpukjvxk133vthfymlgshnwifce9c27uhk7rmy3bvegtbn4sm2l5p9qlet4s31833eey4comrn295e6y9y7jtw2z7lfujvdww03xpwrlp5zbe1583s7yfofnotiq5yekyyq7tz5d6d0wkpj8pk7x3wq2fj7tu',
                startAt: '2020-07-27 03:14:38',
                endAt: '2020-07-27 04:46:30',
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
                id: '4d3aa02f-09dc-445e-914b-8f762921b63e',
                
                tenantCode: 'kbtr2qa365yj813vgql6cneags62jf1o70c8zhsvq8pyxbpvnw',
                systemId: 'd1044a1b-7fdc-47ea-9065-8f232f9f8240',
                systemName: 'tgkxwliksbnfw1ilcwxc',
                executionId: '55bb5b6d-7c55-41b5-9f8d-0a4b84685596',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 07:46:58',
                executionMonitoringStartAt: '2020-07-27 09:17:27',
                executionMonitoringEndAt: '2020-07-27 03:01:55',
                status: 'CANCELLED',
                name: 'yze31t4fqn53phb700agxf4yn9mq2kpw6lm0os0h819p679h3ypsd4l1cj83mhtgme6j7ze06ezwqoqoz08co3mog0hocbtuidjp1i4x2ps4wya4zcopttr4adbsdhn9e3hz975zyph01l9mif5qz9ix55gdn8saep8nh2uz676cxu4kwggycjstxenwnf8p2w5utb54css0pj512otahurq8eajk8fzb12yg3pbxh78xjlmybfcpwlsszhau6v',
                returnCode: 7435223259,
                node: 'uzyehblf0biihwqkc7d5id9e6b0ti6nk3e5wooxn9ol0grquwt4ycxkaxzg4eqrxgcmd6z6r08fji6a84z1sxhl1k5t901nmnbstj8cuk8udq5m9erbuw1hz7e26sscprrpw7z1grr6de4lvl87bso1vzt9bmv5f',
                user: 'dvupp97r6kb2vx1v4lywcxktay0b2hlvtpwhzpddwo6ri2v0d1lgw98atlwmuytouxbdbx3fnqw9kyg5lia09ecd2ewjthglkd5vwsw6khnwv90cc30oiqwc0zz7po7lrzh2pcd1ya9mp46sw295mmowk297wvjiwkwbzly7uwko8zihuzc77v1ph8lzjnn4cncdm477z0e9wpq8wq5g6yq3yvytimjgmcan9hl75xgdiaggcag4xhrziycshi4',
                startAt: '2020-07-27 07:54:22',
                endAt: '2020-07-27 23:18:57',
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
                id: '4d3aa02f-09dc-445e-914b-8f762921b63e',
                tenantId: 'b7ef8f9a-5525-4206-88db-da0a0d5c25a5',
                tenantCode: null,
                systemId: 'd1044a1b-7fdc-47ea-9065-8f232f9f8240',
                systemName: '4ueut61q3iofryl6t4ty',
                executionId: '55bb5b6d-7c55-41b5-9f8d-0a4b84685596',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 07:02:41',
                executionMonitoringStartAt: '2020-07-28 00:30:04',
                executionMonitoringEndAt: '2020-07-27 10:10:42',
                status: 'CANCELLED',
                name: 'qvwflyeo3gsob50qonmyq4n3exddxfnoqtxwsonsf4v8rh8pucj7sfvia8vlxcx5dwg151dr8avtmdz9ks8swjwl1tl02of8nw0emth7icxf2gqgsfguyody2s746acxxu6gg8gmtuee8rij9492mphnr6x5m3dok3nt5f89l16c060hk9tryny1k6o6o3mtkmg2fenjw9liyuyh6dis6xlcdidca8ydrwrfudutk38qdvqfhlz55sj5uqeoooj',
                returnCode: 2092253503,
                node: 'p10ud2kclynh5xi9a8nxr43e3g570utbp7bab3n25p72ixdp4reutxplggt9ilbxsea3wkq7ombv328hp82qq8xxsakss3szekx7f3hubzfp34hjewkneyu0f2w89qpf583gd8kfjff2mr8molwt60nayjxx6wfa',
                user: 'q97mihaxfur1eezp00ewmwb0dtro2z40vmt56wz0r6xxad3f9jifjgx84b7dx63bqvk9z5ykqjz0d5da30wvzihjwn5yetf3idg6qezq1cjgk88dysk92dk7rcn7qby71ebls5km1r64qf0j9g1winfa1skzxt59610ff8f6ebfwjlgxw0ge7lxpqpjac6cdlq5avku35gij1wh6izhpi3wnvdzkhvtdi589rkgiec4jl9cfnk4r1sq0c39v036',
                startAt: '2020-07-27 04:08:12',
                endAt: '2020-07-27 12:07:59',
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
                id: '4d3aa02f-09dc-445e-914b-8f762921b63e',
                tenantId: 'b7ef8f9a-5525-4206-88db-da0a0d5c25a5',
                
                systemId: 'd1044a1b-7fdc-47ea-9065-8f232f9f8240',
                systemName: 't52tnozxiq9tq7c8v14b',
                executionId: '55bb5b6d-7c55-41b5-9f8d-0a4b84685596',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 16:51:00',
                executionMonitoringStartAt: '2020-07-27 23:46:27',
                executionMonitoringEndAt: '2020-07-27 04:19:36',
                status: 'ERROR',
                name: 'cvwch4s87vr10jol4rcs4hkynk466me0mqypm9e7h9t0zj8yq04l3xldw41qjm8u7lhg7iwu7wrvu8wvc8vkxynu7tc3oqh1vz3s90u3loipwgpbwfgwceq0robnsqfgc8k1kct45c79loy0owe7hop6mbjwd1bwhn0g2cba93o12u5vksf7ynb4let72avukff6pozfqvifrh76160vyh7xcdjesenkrchdwootwie417juiloipz5j0shgwmj',
                returnCode: 4117278632,
                node: '2lkq8xhox0f3dh5nowknxb9nirtf7m3ga6hxcxji0fg3qqsmoq6xuj8si60nh55mw8ff1oxbtstu9i2ihbqfs5bb9mycci5jwu1z3spdnk3h49zghj15lh3kjuc5oqxnixxam8athwmcuvfabfz4x2d56bhfkmlq',
                user: 't1p7flqb90ysvl3s8l02pys1p8atl5f2dqvbdok5e8ujq7rht3rwq8fiftdec49ubd9sfnc2xezd41vysf12fh2mfgw65j05rllfqwqs0gachaj87zhs3rcmnoenwjzbir8zhme5qntnu3e62e25v1a1zt1c1a4833qplkv1mqtpd5vea7orv7er66xng6tftkorah2lzi3qnlgbkwy3ic596w2fn8tyy5rrmr4tf32m73u33gsqdysq7bnpile',
                startAt: '2020-07-27 03:39:43',
                endAt: '2020-07-27 04:30:11',
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
                id: '4d3aa02f-09dc-445e-914b-8f762921b63e',
                tenantId: 'b7ef8f9a-5525-4206-88db-da0a0d5c25a5',
                tenantCode: 'xkxgjatpt0o1o8jkqrs1ywhomxepve7qwd9upvc9vqv6j026sb',
                systemId: null,
                systemName: 's59y1jho81ielg06eqok',
                executionId: '55bb5b6d-7c55-41b5-9f8d-0a4b84685596',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 05:35:49',
                executionMonitoringStartAt: '2020-07-27 15:51:05',
                executionMonitoringEndAt: '2020-07-27 19:32:30',
                status: 'ERROR',
                name: 'olgvyjbuyv6axjhr11e8thyfu9d0kplxmh1cquewkir45rdlvuupc31tfwhccklxzioom9sq3v6zxyxonrf296767bduo8mmvmylr1spkzzmeip3agrrnpnevv9u102fvpp1vpd8b06l80h9uz8cnup3ldmvui6bo3bm0t7lmf4gk84idjsb9v98kugexx006pu40zchsiaf8dlskx2sibrc31gs1von9ej58qavpqvcl3mb66je9zgeg8ahzeh',
                returnCode: 6665150438,
                node: '3eilfvoz9fuofcftodgytgu9lninrn3as0efr9vwh6orax88u939vzrin7y15dr66o7goofn15ufyb1376yproutarb3geoshv4p5jopd2yn0vdpot3psqw23kmf3tzpunye4ea4ej8fux572qkycpr65tfzd7as',
                user: 'koxfkcdfjvw3uxllnakbr3aoqh8mofykp21d684olzw43ym9w8m4ig7gy5xtfr73k75a886irkrz7fisj81u2tchq8p9c1mh49ryhpbt8cuw94doghleznqdd2kyrw1g984w4xqxh4ct1wwmrgt503lt9xf2w95d6rlr33l91o38cm17ma6vzcog1d7bgy0jo5655gykukv20lrsmn8w7uxdvhqb2pgaglfyp5f48t8lfesrfj2zxynru3zf84l',
                startAt: '2020-07-27 02:45:43',
                endAt: '2020-07-27 19:06:14',
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
                id: '4d3aa02f-09dc-445e-914b-8f762921b63e',
                tenantId: 'b7ef8f9a-5525-4206-88db-da0a0d5c25a5',
                tenantCode: 'fmll2u13t5is9mdxt1f36ppm7pj3a8xmcsew53mt7camvp3bwy',
                
                systemName: 'xuk8zwgvcm767ibzpycr',
                executionId: '55bb5b6d-7c55-41b5-9f8d-0a4b84685596',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 00:35:01',
                executionMonitoringStartAt: '2020-07-27 18:33:25',
                executionMonitoringEndAt: '2020-07-27 21:32:41',
                status: 'ERROR',
                name: 'ujwkpyzbjrcgjrer9f5v9v3p0si1b120hn9hr3bf4xvctppzxgo5l6jizzx4xuiuqwmuq9tyd4gg9vu1ojlf5glbvtfam255krxgm8p3qigkrnwm8mkx2w5aa7z36w14rv6kvqam5cmmprp2kxrixyi3pvxvvpmjkgzg6mvxfda29sytfj8ds7k5fc1qoou9ulyg7q9sacy2v62f27nv4iowjbbhym7gyl1ngm1exo8nj5kjoddhnfvm8zd0f8s',
                returnCode: 7401664300,
                node: 'wvgtofe22atlmrdvu3hrwyjrlolodyokj837x1wjkujzqcb4n6pw8eyq8697dsmkzhux2bzpdv7abhx4oenhunaxb4x5m0q5ueyptvmfjo2nhw7vdq6rbk4gn534uub9ufm0cypq5cs4rq93q5eujmujg9g8v0ya',
                user: 'c8hd0o0s36mnjac4c2hl8bks9z2tc2yxqhk3sa2kt61cr39b6gs0y6saa6u1tjzaa3m9b55h0k6vxgk8gxwbqkwcwxvercbaumycvn63l68mrpkd1kika8klqacx3329lb8oomxturjvdx5p5ycqma1fpcta2hykkvs66kc3co92t211sp7pk96hm5bxqg4a9wo5lhgcj19j08gkph8qih2h6h8qwsbkqeurpw3ss5m8gdc5jgbdsufekxogaam',
                startAt: '2020-07-27 21:24:32',
                endAt: '2020-07-27 04:51:20',
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
                id: '4d3aa02f-09dc-445e-914b-8f762921b63e',
                tenantId: 'b7ef8f9a-5525-4206-88db-da0a0d5c25a5',
                tenantCode: 'lougzm417rh27r14huhah09ec5v096nidgcyf2xpod1tk0tgx9',
                systemId: 'd1044a1b-7fdc-47ea-9065-8f232f9f8240',
                systemName: null,
                executionId: '55bb5b6d-7c55-41b5-9f8d-0a4b84685596',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 19:51:34',
                executionMonitoringStartAt: '2020-07-27 06:01:35',
                executionMonitoringEndAt: '2020-07-27 13:47:44',
                status: 'COMPLETED',
                name: 'pl0p6tuqomjr8e3otmhch11un572mmfu7rc3v7v0svstima0j34lu99b9oy0edr0ndwasvek32jzlrrsjk1s6t1wvpqqe0c22sb6bpw3vvx5atll1fq7e72xf9u0bhyqm4ifdmdfhjpnjf2sqwawrw4go4dmip6y70g1b7ufe5oyoudoq0v0sznqgp0ly1f2ft7c2tohqc9rfuvc6m3mb55qp1lxu5cjhq2d9bsxqz3onr5pr498geaa93x0gzk',
                returnCode: 7552825928,
                node: 'g3eda2y7ytrf7hf3x6tye61936jab0b25dv27yre2wlqch56be2ialy0n8fsbxms0wkrq6pkiuqo4vs6j76sq4t5taaj7ub6uohtwodwjpxtyo9735l87pnhdjqun8esfrkw58bp85pbandavx9qziqzk3ixb4xd',
                user: 'huccjg4ft2ggrx47rlxnana3br4wkz8zm4ly8js8r2hfa71g2or0aslakvypc960pdabp9u5xmr0bmwnu5bbkisygli8bw58l5v4oqbasg2p6b475m13iihn8q4ojztm4i845yd02c94nmerj9lexzsawlfc3ufslrtwm0zlp72fhx7lqn0y1fifxkdxgsi30vcn6pzv10zhk46jrgnb7hl1bykb1wm8csgl4inp9l22qhru5tpse2vidhqux6j',
                startAt: '2020-07-27 11:44:51',
                endAt: '2020-07-27 08:34:53',
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
                id: '4d3aa02f-09dc-445e-914b-8f762921b63e',
                tenantId: 'b7ef8f9a-5525-4206-88db-da0a0d5c25a5',
                tenantCode: '8nxtsbwzy2rjiuedh4hso8m7oeqskcx50ab86ljcixezoc4zyb',
                systemId: 'd1044a1b-7fdc-47ea-9065-8f232f9f8240',
                
                executionId: '55bb5b6d-7c55-41b5-9f8d-0a4b84685596',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 12:36:27',
                executionMonitoringStartAt: '2020-07-27 21:11:20',
                executionMonitoringEndAt: '2020-07-27 13:47:52',
                status: 'CANCELLED',
                name: '2jttrjl9r9yt1n9j7klfcf9if7zq83jnzmst7kv80lmtvg9qinw3dwhznw0uzw3f1aa2xo9vzkr3xhoq21ht93b32x17p8swxm5lw1nuizwud7xw4vzr2xlkzxmh9f0v7ntpmp4ew2uetf7y38z5ymrkzsrit1mskof7r25er7tul9s3asjt28dqbymqqwmmqs9bkx0w7m2jdspf893bd2clpw0cnrtbtgp3696nf6jm3c753nkk33bnwzmoi4v',
                returnCode: 6509643975,
                node: 'q9kwvmlrmdmpmobsatqib2bp7oxcyt1sxlbruv7np0g1s9rcby82vzrycd2e54i84x4o4o58b11ml648kmxfwkkiqj7u9bwxjprpsrjhazx7koskutwvpsi60qc54xfeedy6u1cvzjbzi24vj35fi0tv22oz8ypq',
                user: 'vrjs6s2w3lzklgrq7wrhi6t7xyu9ztdphfhpryl7uhnlsw4uicd6gm5uep735bci82xn2j4aeoxzz5omik06zo5jbziykhyfwx5pdfyty5ku796lmxpxm0656dqo431qumhkqx2s4kmb82iajzgqapca9kxgshfaooye8lsas2kt7qo26ndbdtn9vctk0rkya80egr5sj6blr5cz092wwimfq0hllb8me4np8gd9gquckk43zrpbsg1b5i4mzih',
                startAt: '2020-07-27 11:30:45',
                endAt: '2020-07-27 23:27:40',
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
                id: '4d3aa02f-09dc-445e-914b-8f762921b63e',
                tenantId: 'b7ef8f9a-5525-4206-88db-da0a0d5c25a5',
                tenantCode: 'p2jp28n7wmxxub2lfre3sw7k0k63ca8chbrhyd8xf6rcad3ku6',
                systemId: 'd1044a1b-7fdc-47ea-9065-8f232f9f8240',
                systemName: 'vhddox87xbsgqlxqdi4z',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 01:42:56',
                executionMonitoringStartAt: '2020-07-27 12:45:16',
                executionMonitoringEndAt: '2020-07-27 10:09:13',
                status: 'CANCELLED',
                name: 'gifl5us0x4b0aswnnrgmjkb9rnsqhwuytd92766c6j9olra9j8ur6u55199esk3tmzargo56rjpfrg8lbh3235e7dztt4xrs9phz0yl8frh7we8s0nl4cuch0gbjx3cpnevz0ijw6stu3auuy1ad1qatdm4jxz3kpt68a4712x7xix427cwrspy61t85foyh0w7i1z9wfmr4poqt5807yjhlrhl5zzighfgf52rfkoab571gbemkj9ezhs2wu3k',
                returnCode: 1864567020,
                node: 'xpgvmx6kdf1b7ma2c2u0nbpagqqqstmo0i6qxas3t02g2jav66z0b9enets5whh6xxjvgv591qe9twji4r8yqfz4bgbd6fo4b8faakcac84ygovjpnbhgln5djcxsh94ua85ivf0f64d5c6rlxp4yve6t00jxpid',
                user: 'uxb44zyzzeeynj2tb8gxf6nzfs43jrl5c0orkyhxyau9so5evs4qi8ooiiuczvkuiumcssqh1wzz9xp3h1b73t53vfvd5exen60r75e6az26ulv24yih0hbdksg0cvurrkr53xv3k0ww4wna1oagvnc8xlz475kmiapf22k21f0alrqesw47qjquusw5cllylganmbyoqo3gnp7xt878yh6odzwogvifdnr2h76h2e9ky1g42a67wvd76barp8s',
                startAt: '2020-07-27 08:18:02',
                endAt: '2020-07-27 14:42:20',
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
                id: '4d3aa02f-09dc-445e-914b-8f762921b63e',
                tenantId: 'b7ef8f9a-5525-4206-88db-da0a0d5c25a5',
                tenantCode: '6ck6odfxvfcmhug0gjsiberrxuiqdi6mfu1j0rvrmxk29fnzat',
                systemId: 'd1044a1b-7fdc-47ea-9065-8f232f9f8240',
                systemName: 'v18l8nkcdl3dsujr6bwf',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 06:57:59',
                executionMonitoringStartAt: '2020-07-27 03:18:32',
                executionMonitoringEndAt: '2020-07-27 06:10:00',
                status: 'CANCELLED',
                name: 'dfzfd3wh603r7y5ou8e03qmfmg8syq05vhuxs8xh7rjhrcxk3u0aofnpl6wtc37i09lkwgknljleadzpt4hiqe1kw8ksl84wiwvbmpewkhp7w1qpz6mblduxvy1jejjz77lqz13bbfriw2idcf7ybnbya3xm6h2p1a05o4juw45cs3eldsqm61roa27f42n9j0s51h20p5jti0wfdckgxp477zu5hu6ecko6ws06ylxht00qdgk25iyqxox4bvp',
                returnCode: 1084714842,
                node: '988d0pq4vwnexuqat81l3plu9iujah1v9tnqrzgtt4etcoq39cj2gou2t1xnd7b9bei9lt2kbyytbfvfp8hq3irf3hr1v6q3h2k0sd5ngts0l8x6jog3yxqfpabhgn4bfvbasgop8p0zkxutn4m2aci6ey2qr4bu',
                user: '3dwjyj1st166l9frcxrmdw39xphnw7ggl3b726b0i26y60awu4293tz7i51xnynoqsxd5me5olco3jlb09smv6w699xs2uzgb3waw940svt85gv51mwhmecb5xpxp4xavfdec3z9w29ts7st6o57bnomkwcjtmacwd8crrl9os5ljh3o675t0yiipux9o6iw09tfeafqa0jvob1qpwrammt2vp2t7g3ys00id7kl8uscwsftt3pvvgwo9o68z8r',
                startAt: '2020-07-27 16:38:46',
                endAt: '2020-07-27 08:56:48',
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
                id: '4d3aa02f-09dc-445e-914b-8f762921b63e',
                tenantId: 'b7ef8f9a-5525-4206-88db-da0a0d5c25a5',
                tenantCode: '31cwyipvgjlarfvctvx8q7drp7zblywkcqqub067g2qvacxj5f',
                systemId: 'd1044a1b-7fdc-47ea-9065-8f232f9f8240',
                systemName: '63apf905glyrazdifier',
                executionId: '55bb5b6d-7c55-41b5-9f8d-0a4b84685596',
                executionType: null,
                executionExecutedAt: '2020-07-27 04:26:33',
                executionMonitoringStartAt: '2020-07-27 07:16:09',
                executionMonitoringEndAt: '2020-07-27 22:44:55',
                status: 'ERROR',
                name: 'cvgxwmvvn9aj72rxp7e3a34ytkxqqfes1tjnffu2byi001zafh59wdi69dm3l3f416nqhorntchlicchg68e80ppd0rz98iwgnhjrtzwx2i4j6ly7e0wy5qhkghrl1bk899ygpw07lhqfpdevwnt1xce0o6p6srqes59tooa2lxu5erluz12hn7dqtbqf83gppda3jhh4zebe7byblsvn01wksxwzkana7h837v0b8ttuig9f0r4on7qr7tv6ud',
                returnCode: 3624743395,
                node: 'acctompqlh3fqvshs0xg2d7ujtrfrxne3ggai2j2q1atmp8w7i4dojb1y9fkjqdng6vh5x8fkuenwziv1bvmtzvdezlcyus1ic3p9x07l2h997xmz9nv95qrgcm0x81bhyynytfc7hiyq91dafrg88s5hxm0nuye',
                user: 'ftlgqrwbr9hnnoth8v8gl12yffarp5htovnqu4pim802v4lsk5yiqi237t9nyodyyz2zcfbpcnwih92orzgggzxlsaow4t3a46o3ele0iuq9wd28wkt6g7wc87inhwuye0jihs8jrbdxnlcqeyaejjmey7ek1f1bi67kn3ve4w49x7yvkpp8e87nrzr3ldez1sypob6gbokdhyfcvps8ihwoal7gnf2w0hiyhsjra9wr5louktv1pf3m88bisve',
                startAt: '2020-07-27 10:53:52',
                endAt: '2020-07-27 22:36:59',
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
                id: '4d3aa02f-09dc-445e-914b-8f762921b63e',
                tenantId: 'b7ef8f9a-5525-4206-88db-da0a0d5c25a5',
                tenantCode: '7qyi04lbuvywz9suzg0ju9pxw3dx5kgl11ptqeic76dkm9fgiv',
                systemId: 'd1044a1b-7fdc-47ea-9065-8f232f9f8240',
                systemName: 'vogltswy83t288e9bgbt',
                executionId: '55bb5b6d-7c55-41b5-9f8d-0a4b84685596',
                
                executionExecutedAt: '2020-07-27 19:43:09',
                executionMonitoringStartAt: '2020-07-27 09:03:36',
                executionMonitoringEndAt: '2020-07-27 21:33:01',
                status: 'CANCELLED',
                name: 'ctrvd41tldb7ps4ptt5543skmp32u6946y8ld1jn5xnw7zfn7kfgx6xdzv91p28bihye6gs3cvd2n55pn2o7uwbftfty5f02z68uflmdhem1m8syemboqp83xs00a792fr6145t6ygtuieatgtp2tl4fdowu1odmmzrng9zi33wv1f2rjr42i39kvvoeivkw569ng7v3i8e14crqymxabsevksgr8w9cuwm6et92bfvsz3138so7zkc3pnffxcg',
                returnCode: 8841881970,
                node: 'czaa0fng9i5rarqvz7v23nqmpd5jln87u17jf70emrurs77bp6em1qbqdcyfl28x47p9s0510k08fv9n17nimxoimluhi9k2rg07nl9d2wcgt47f2t1aeinzq16jnmunvgz0jqye2vs4a7crewx5lokys7zqlzkq',
                user: 'vmyyiqjaxitv2pc4o4hrblm93t2zm1jumoi7ldm9x60vma5tde25lzpvd78givibjucxeemo9ohk1an2e2ibw2oaopqhety0dews8p7jctyg3ng7idyv55nhdkb6h30pqyd8a2d9x55tc1ve2kpoovyun823k7np9iggw97vrka9o97qq3w9xyu52q6sxqdhozx4h6pq35fy4dw90wu1jn8pisghhuwz6a4ei80sioui1ejuedbsnhd1nxnqxwt',
                startAt: '2020-07-27 19:57:46',
                endAt: '2020-07-27 02:45:35',
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
                id: '4d3aa02f-09dc-445e-914b-8f762921b63e',
                tenantId: 'b7ef8f9a-5525-4206-88db-da0a0d5c25a5',
                tenantCode: 'dmqm43yhrs3vthwo7pf7ni7dvbodo3t2g7o2qssdv82caq6ht4',
                systemId: 'd1044a1b-7fdc-47ea-9065-8f232f9f8240',
                systemName: '3adzmog9annvtnrnnvyb',
                executionId: '55bb5b6d-7c55-41b5-9f8d-0a4b84685596',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-27 07:58:24',
                executionMonitoringEndAt: '2020-07-27 20:45:29',
                status: 'ERROR',
                name: 'io0jfg1kg8lmt1xzowx8qy84rbvrcx9kk1d249830towiityekaj3s94v5a8pgyfwedkkdg5e8o7hwy2ykizax8dsvibsksx4ic4ypvxtcrn3i562uioo6nggrlrvns2p2und2f12fwl9nw9wcmznuehs5ny5fmrdb6epupr7cu7zy5eqid7lkyzxkewrzk4wmwxsz8glzymdo9qssytc8jln4vo0p5sgbxsqhfqag600rvbo2a0e4u217k3kbf',
                returnCode: 2129037165,
                node: 'hokrfsv7idljzmg07atsgubrmyldep2o4rf4fj01i8sm4a8tnig4u77w5kcvitadvrf8sbcspwd4hr7sb5wppa3mv7so01ifw09hej49sj4abrb8lv6izs2eedfirnmchmxh4q5h0a40agloqybmoq16t8jecz1o',
                user: '5zhp4535oegemvd7an79798yb6upwajh3vknwb8c5ypq6bj4eksme7ge05ynt1c9ic16usziv3vfjs1yn9ojmadt4v66oe5nudbp4beevu2eqzswyxjd90kgsslqos1b1m0dsri35lgy8z4h02fhc43uq4c21goojwvp7bl8zjzk3a45y6ufzxyyreusv1w9w83zyrxw63kiia0g70u1v75aqyjk5ki38o7ecfq0ymh357qqtcg43bchh32mylx',
                startAt: '2020-07-27 10:25:31',
                endAt: '2020-07-27 21:01:51',
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
                id: '4d3aa02f-09dc-445e-914b-8f762921b63e',
                tenantId: 'b7ef8f9a-5525-4206-88db-da0a0d5c25a5',
                tenantCode: 'jmhu95bf5nk8yazh6npheesl68plwiv9nl7wbmonsewruua4db',
                systemId: 'd1044a1b-7fdc-47ea-9065-8f232f9f8240',
                systemName: 'd273o8j7dutw8oeuzj88',
                executionId: '55bb5b6d-7c55-41b5-9f8d-0a4b84685596',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-07-27 13:32:35',
                executionMonitoringEndAt: '2020-07-27 10:26:04',
                status: 'COMPLETED',
                name: 'mb4vu184rpkbmjv285jy92cfqzydtm0pwxfq2xlo07p9jgj3dgbx55re23h45v25p3dppy319l1q5yjajtfazc6dhvkdh5a8mwl8hseywcd834bm4bi28ex0uvih69u6is45wdm626vc740zhbssbh0isviiqy9qsrs241iek38659ectdqpwhjx02qjr9y78adsoqfnuy5dj6gndcjn560orgx9yfjjp4dr7i558a4ojnnlm9ixrfqv5dc9oap',
                returnCode: 5194995231,
                node: 'jsc320sifqn79ho63565w95jqbid7lngnfrz1vsqoi9ognjcci8t7w8j8u6z1tjl5u7hys4x4nr13hufjfddwgmo3c39cbg8wdgj6mwv394064i299hqghxnb0qonvprff6qcr0qv0cwxil592ewcueyjz7iylhr',
                user: 'rv25sys5cd7l93lck5xddk278u2oc1ktps7gan399axb4h9wvc7vxabip3oeziqb5pe4wyrvqu2r0ywhfxe675uuqug14ovuvm217khotnc10f3vyiurdync3si2srothcntp5gecua9a85t8ipzu8djd0rcws3n5n04zy7qank1iwj1gcd30wwjgjanplnq3trg7gwvhy42km7oigpat0tzsmkika4cczi6i44qmsmg2ehle9p90fmb45d8ojf',
                startAt: '2020-07-27 18:20:16',
                endAt: '2020-07-27 04:42:57',
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
                id: '4d3aa02f-09dc-445e-914b-8f762921b63e',
                tenantId: 'b7ef8f9a-5525-4206-88db-da0a0d5c25a5',
                tenantCode: 'de7ctz2hvj6hp8i1zy3kq2myzdl42nsw7uvz59khkr2pi8qrll',
                systemId: 'd1044a1b-7fdc-47ea-9065-8f232f9f8240',
                systemName: 'p0kwdcw8onsbd85uqix9',
                executionId: '55bb5b6d-7c55-41b5-9f8d-0a4b84685596',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 22:49:20',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-27 17:15:32',
                status: 'ERROR',
                name: 'bo6rda7ra1ez9245cs4aaduamn1m9sszspnwb3gabx74tpoo6hz5vopeuxj7x6m5088dxekbi6xusdzk21jvecmxlkemv684dcm9rhh7ajk939kbzrumpi3vxtio6e25m5nsp5es5isf8850241gtxf4iobvsj14hgybzhfazy9xy96ai5yafs4fgxt8w9imbietms8biily0ovrwyq17okp3vu867x4nd6m2woupg7a7vd7yw4iztbe6lqgoz5',
                returnCode: 6389695807,
                node: '0xp3xyzorz5nryk781mrk5pbcggl9z73b44s3jzke3uv0t40v42dtoxcyvkf0lac4w7q7v1zx6hwvfvysu0kotpejq57vtmn664i6wgvn2qbvfswyidiy22bw9ab3jfftpcbkkbf53bjtiiywudo454kzo6g13vd',
                user: 'nypd3hakw7s9zlc2xz79wvl5yanowg371jtnorv0n1ek4rjw3klmhyf7qz67ty8wxbv96mn74po9shw1dictks69ld5s0wsyb2qna6l7l3bntkisvbjhitlc8brqovbzxce3pbiejnx11rmexj04y50kk1zm6q5i93p1dnjta9bdgyihp4muvrd6mf7yfc757my1ecx2bn72ct3hoo0qgn0e6vzpa12kltis0pwm7o55byvih7vx6twlixnqd2t',
                startAt: '2020-07-27 04:22:13',
                endAt: '2020-07-27 11:11:03',
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
                id: '4d3aa02f-09dc-445e-914b-8f762921b63e',
                tenantId: 'b7ef8f9a-5525-4206-88db-da0a0d5c25a5',
                tenantCode: 'n4uz10z6eetatp6rvaj35n7epjbdoqh8750x152rw140l28gqa',
                systemId: 'd1044a1b-7fdc-47ea-9065-8f232f9f8240',
                systemName: 'cyd2716dj2np0ujf5srk',
                executionId: '55bb5b6d-7c55-41b5-9f8d-0a4b84685596',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 11:40:46',
                
                executionMonitoringEndAt: '2020-07-27 09:09:11',
                status: 'CANCELLED',
                name: 'x4hufv1vd0je9whncd5pvi2fjzvfuo2yv28ue0xctdp29p27rrk5nny8c0vcikqis30rks7bg3or2297yncst1os1yu26nrgm2g7dozdip5lrazrwvh26xrufu50ammnkmw2fd865c95o5cbhqw0ll6oh2zvoezbma77mm3qj1g1s037dzt9la4erqwnyfbr4tq96wi45623sxxb51iwld5784s4tiuweh0fq99xz30pd2ge6ywuo2m4u7g8lt5',
                returnCode: 6622604529,
                node: '3ue2zssym4hk9a2kp413zybhbgznqzq48ki3x39miumn19koif6as9mngti0f472myvcti7g6ud9fbbq843er300i2sk9e1s69zeh7kezfgxypdfnjl26fbf8fxng72ovlu7sx0w3s4zqob5v89lew0a84cpioqx',
                user: '7n4qlohadpo48mfn16xcuuq2d09oiw115zdp053o8ugzgx6yheow71ywziq3egfdwnxv5vshwvnppb4zse61he59oktz2bz7caxnn7lcrs041s87hj8srmbch2g002tdkxeirk0ut6wsyit2x9a0v8973mg9ohra6ql0fdhzfve9e7p99ceskuawpea65qg85rs6rz2ha8h1jj2dctgucx42qcelqm6m47zzonjjvxg84rdgwq7b2xe66hqljii',
                startAt: '2020-07-27 19:13:13',
                endAt: '2020-07-27 07:52:03',
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
                id: '4d3aa02f-09dc-445e-914b-8f762921b63e',
                tenantId: 'b7ef8f9a-5525-4206-88db-da0a0d5c25a5',
                tenantCode: 'adgosdkv4nzvip7m7yb57pbe5di3l55fy93sftgjncjbp7nqtl',
                systemId: 'd1044a1b-7fdc-47ea-9065-8f232f9f8240',
                systemName: 'h5pa2nv35mp05bocpi0o',
                executionId: '55bb5b6d-7c55-41b5-9f8d-0a4b84685596',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 20:56:11',
                executionMonitoringStartAt: '2020-07-27 19:51:00',
                executionMonitoringEndAt: null,
                status: 'COMPLETED',
                name: 'x94vccpaty17xdjz2e3s8w1dsds9og1gu194gihney3tn4jk4cbe5ibjv2cw20x9h6frz6uqzkyy7siaj81nfteyjd0j78grnf9xvc05uxmzxjsw2t4bxxn7qzzijc4ovopwga1pmehacjipexq86w0ffzbjb2i7rjv3y2la4lo0dag4jemxihb063m32rvahvynv36xga2u0ravsdkejkfgwzcp5bm90nh0w52fxnucf3iunc3rb8ftxlz0acv',
                returnCode: 5114758050,
                node: 'ao9ha6hpl1tje1u8qqwjkzihwk6b8gwodfjaihc7kan6jxlr7zpz90xzh9qo155pepnsgacmpeu52eha7a6uk6exc2878iifzpeq7aw11enitxx4kcrm1w31oa9rjnoesf5odkuiulto6j7o3ijengofe3wotnsl',
                user: 'ax3vz7zozbceuc3p18fr4dz6xslcn4gy7sd45n7t25vsnqf30a0zh38cil84xp72104u900i2cmoz887djd6uqyg3n2q2ey7gptpd3jllgcactse6wb63b6140ewph47oowi8tr5ufcfldz0onl4kj17dfcyq7oxixyt9wpw68a8ke5o0kv4ptv5fkxbw6nfb3c42a246ltgldsbdi4fmva658jenqcmbk1ku6t54zba2rcexsqmy4euvkaelc9',
                startAt: '2020-07-27 23:59:45',
                endAt: '2020-07-27 04:23:06',
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
                id: '4d3aa02f-09dc-445e-914b-8f762921b63e',
                tenantId: 'b7ef8f9a-5525-4206-88db-da0a0d5c25a5',
                tenantCode: 'o6k1xdn7rgwuf5p5a6cihwy3l6h0gg2tem006qlcfl8iz9jgkh',
                systemId: 'd1044a1b-7fdc-47ea-9065-8f232f9f8240',
                systemName: 'rneciw8mc5vg544ekr0f',
                executionId: '55bb5b6d-7c55-41b5-9f8d-0a4b84685596',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 18:28:16',
                executionMonitoringStartAt: '2020-07-27 04:38:31',
                
                status: 'ERROR',
                name: 'qm143hx9hcqv0ab1cg6724d7vdgbpwfngcssnba0td8ctpmrdp536k3etr2k3xsmr9d3eeb92pigc1q3lma0uj73hdb91x8u0uxi6ohpv37ohlaqos65vcxvsk8f2px4mtf16u6ccwn9z6j1x5lyr3kw6t5cv3d0krhuf7lwhsqy3vynp80gn0jrrtxjnudfy2ysm8bnhuyf291w7hi3kj9vwbyqm1p86uhon7gvd23kls0pxk4x8n6bs10fof2',
                returnCode: 5049722030,
                node: 'ncp0bv1swbqiv649gootz94548woel3zym38xs6a870jyvd5hcnetq231v0l9l89vkdk6s0kk9c5z3u46g0t7x492ixjhud45ztr4uo4v4u6u63bbned2v27l4iqnija8kxjd5lmni7murgdjfq7olhoq2v6dkgl',
                user: 'cy9cc8fnqd8wuzafhmvh5wmlgiygnstxv9qu1a64jp4dg3sexh08asjev5qrl4285489n47aggypyyzek4imun6kb3y8ipltk63yy5e3ye832anrvrll5jwj0hz12brqfaz7y9czn430wg69l9jb9u14hpsotjzfutw8u2vhmub8xnxxxocza19tznkait5z9rsnl90offuvmv8l9wez7630lqf4v9cvli3ic2mcwrqfe6p1ot3z446mq8jiob3',
                startAt: '2020-07-27 12:35:48',
                endAt: '2020-07-27 13:34:21',
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
                id: '4d3aa02f-09dc-445e-914b-8f762921b63e',
                tenantId: 'b7ef8f9a-5525-4206-88db-da0a0d5c25a5',
                tenantCode: 'bd2ize5quarz54bnm9hfvmn4ab2y54vd0qxbg365u71h0r5sla',
                systemId: 'd1044a1b-7fdc-47ea-9065-8f232f9f8240',
                systemName: 'lee1h1ewbl5m56cvh6jh',
                executionId: '55bb5b6d-7c55-41b5-9f8d-0a4b84685596',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 15:36:41',
                executionMonitoringStartAt: '2020-07-28 00:43:57',
                executionMonitoringEndAt: '2020-07-27 09:36:45',
                status: null,
                name: 'a736gcm75opdcmrgozxvgraccfmfo83y241k2tjn1hqhe4y3btvydmt1lj4to8mmze4507un915twaun5vo7qb10em5skhgvezx9hr494i97zvwgk6xh178cjyf7gc21baccsvscx1spi1gjn9tiwsfkokl3u0vbktqw2hhtuciwrldd1ogxj3xgy3uuasnojfna3s0ai1obbtlpy5h4nq3l7vj51cdrd66iyan2zut72hysdltqtjjwpe78c8q',
                returnCode: 5478285729,
                node: '0mw7f53urpxd0zqxcl58dlolm8vr66zhohqe0srsay0wrkg4gjknbe3b6hmuxslf484dk2ph383p79ewpsy4v44j0jrrb3gn978y57hvaa8v38pwu2mgplzgwl2skhwrw2ahr2b2ylip5bbulab9tit9op4p0n4t',
                user: '92y5w10sa0nod5p357g5giaax4f6zc33yjj2cmzp8k3v7a7nd60gnf91y2cipm71hgxq79wl1xccbb4zmbwigc7vc3p6sim8ji2181g30mizw1epho5ppxcc892uso1jw7g5dyu7ey6o9h3ei61enmo7mcd8zzqqen9sbwqc59xbu2i4k7wememd238z1o0ygle1dhffepncey61mhdbochbjqf9lcuz1tlqqgj7uqb2q8dh3wsxmiabmiudm9f',
                startAt: '2020-07-27 15:38:14',
                endAt: '2020-07-27 01:57:18',
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
                id: '4d3aa02f-09dc-445e-914b-8f762921b63e',
                tenantId: 'b7ef8f9a-5525-4206-88db-da0a0d5c25a5',
                tenantCode: 'fzhe18kim8s7qdiae1puwh66bqe7fpvyrpffoklvzhr1i58q8n',
                systemId: 'd1044a1b-7fdc-47ea-9065-8f232f9f8240',
                systemName: 'wmymfuatfbf7xiz03mad',
                executionId: '55bb5b6d-7c55-41b5-9f8d-0a4b84685596',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 23:38:55',
                executionMonitoringStartAt: '2020-07-27 02:32:28',
                executionMonitoringEndAt: '2020-07-27 08:20:28',
                
                name: 'chvpwf5y9depa9lnpfn5u38uqku56ey96s7qv5r91y9efegklccplic09buuyfgkh584h2n3ajig01cem6qswwfcq0qfi3bfq7jxfgwaxata6zvg4epw4q2w28jx154vhiub1hy6i5jw1unutbb675naiibmxv3zzyy07zy979jmyiyirv0st4jbvjqkd7gpnac3wjtw9zftv04jvv4ftdhgg2gab5btmkaf5xx6iiehtn26zcomwg7v9yj34qb',
                returnCode: 5788917039,
                node: 'mbr10vgfb9llgb7f244pm3mh10gb4e5dbuz2sfzy8jwhm498a776lw3rxqtgaqv07n02m7vbj276t1xtr25k874wlk93j4hsw812id3z1ltalo84k4228n8tco3bu2h7y6qs34a8jxvavm78qr9849igzybezt41',
                user: 'vd1m4kclk6sacos3nt8hybswkthtqbvyqyv56ctdse3q6hbt3ub02xuyz266s0awzc3kzgqy837fpilbdnwrh29mh55sd7nwl6eaus9dxx6iox8sojicwc86yppdwdouwbwvqnw9walwq4zhbbcmf4g8mu71hwqck5t73pzd2dgcvsed0ffcxblvt1iyq0y45jznhze844im3ciitfxq9wlkmrj4z2lfv8tix3u116z40h10p5c57kqo9bjom4b',
                startAt: '2020-07-27 21:28:26',
                endAt: '2020-07-27 18:48:48',
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
                id: '4d3aa02f-09dc-445e-914b-8f762921b63e',
                tenantId: 'b7ef8f9a-5525-4206-88db-da0a0d5c25a5',
                tenantCode: 'vbhya0cgmzmpeyj4lundr85m0n1cq4tzzl8fdt8gb32ral86t9',
                systemId: 'd1044a1b-7fdc-47ea-9065-8f232f9f8240',
                systemName: '8u1ijwkwleti5k0u6i9p',
                executionId: '55bb5b6d-7c55-41b5-9f8d-0a4b84685596',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 00:45:25',
                executionMonitoringStartAt: '2020-07-27 05:15:08',
                executionMonitoringEndAt: '2020-07-27 19:00:46',
                status: 'CANCELLED',
                name: 'qd8ul5p2mgenerxq29tpki5jqb90n2wmbqf8fl3xs1nr8foj1sfup47s7crwmq5i2c91dfium9ze58u9xpw8lrwq5h3736pp3ozmk0voqm877v9nac9e9xpo2i8g04fh24jdh8aa097ifn5t0rvjqtowpzabeypp8judfel0fluo6w3t4nf4uwzx7bi7u9xx132iidepa9973caner9r8glz1akwg264rmxg86kl6dawnjizc1bvfo8xz7ztmcj',
                returnCode: 8541847724,
                node: 'iov6sofyrkli73glebfz17wmf423ggpwyn6ef70ogbrkvb9qn30aloiga8di0sux693e00jatl83zb1n606g0cvp3i1jxr6xi5e3qpja4zdix2p5qupxqoi540tjleh55x3b8mqyvnes6fjvneuq6loqett13370',
                user: 'e6wt53ah979q4a6n0tec2vhmb1sfco36533vd0ytfoywe6lnrjbxd5br4fq3y3m7yr7jpaayid019zbsorloux1a337nppwi9t2si2lbsu6udyx3ezyxwvx5ba873ft5hl848niygewuawmviay5278qndyhxw9zqf7v9muekn213vz5o43t7tzth9pyh16tu5yf80z1bpisq5gve9vntzjiaxcvu5ggmbmpm0tzfvao11jmxqd234l5tm7ievd',
                startAt: null,
                endAt: '2020-07-27 06:12:13',
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
                id: '4d3aa02f-09dc-445e-914b-8f762921b63e',
                tenantId: 'b7ef8f9a-5525-4206-88db-da0a0d5c25a5',
                tenantCode: 'qu96urup4brx1glbibf983gz3vylbramrgct2otnvtol7mhjr4',
                systemId: 'd1044a1b-7fdc-47ea-9065-8f232f9f8240',
                systemName: 'mo3gctn7biyedniy48lc',
                executionId: '55bb5b6d-7c55-41b5-9f8d-0a4b84685596',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 04:23:51',
                executionMonitoringStartAt: '2020-07-27 09:38:20',
                executionMonitoringEndAt: '2020-07-28 00:52:00',
                status: 'ERROR',
                name: 'nh7100ickifpl9gkojdg06cxoakky4gadf4ze8ev0hec9w19y6b7fdhteet84sw9qxel40i2fnsllnnxkmxha018vsnfyr6hrw9qknb3dt3ww63qcxxe4gtlyaxi12eh6bxq106nwm029lr8nseq701ygelfu28el8e0gav7bsp1kej616pu3evq3ozdlpxil9oa4rgtkwhh4znscau9dv2i5x0k8h3hhocmrwybgj1wlis9p8k1ig150zn1pli',
                returnCode: 8223955736,
                node: 'oew3syf44sp13uvj8e9phqjjazpfo6zmb9y5p03rfv0j063eq6dxjygffzwq7gh1mj98rhi1nc4k7hy77k6rzekhlmyf8dwb39acsxgpc6d9cix3hkepz6off32kfcx8bpr14hpgp9b0zflqd4dybo6bpep0z6e2',
                user: 'ornb3emh46bhy6vhpurb45dsdh16kf6i3o8to6t3zwfkwgpi92d5277bbdv5zpv83wudsi7le64e249ms5z0hnrmnacp3egkejyqr731jcyb7e5ju34id5q20yfsfha2zsgqoipp2m7nsjqzs548lbio9vlrcntspedhfqek83gw54rcxgnkmpva0gvdimo93qlhdeqjek4o8ct499l5egtrxyxfe2hiz1eq4c6op7i1tq0xe2uupky0p00m2os',
                
                endAt: '2020-07-27 02:53:09',
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
                id: '4d3aa02f-09dc-445e-914b-8f762921b63e',
                tenantId: 'b7ef8f9a-5525-4206-88db-da0a0d5c25a5',
                tenantCode: 'tgppfp23yy2vx7u1xykypamklnh2q8fxxxp6pf14api9hbsez1',
                systemId: 'd1044a1b-7fdc-47ea-9065-8f232f9f8240',
                systemName: 'gcoz5c8hgtmtkelhnuaq',
                executionId: '55bb5b6d-7c55-41b5-9f8d-0a4b84685596',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 22:36:28',
                executionMonitoringStartAt: '2020-07-27 18:56:28',
                executionMonitoringEndAt: '2020-07-27 08:58:58',
                status: 'COMPLETED',
                name: 'dkvgkvflpj8ugxsq3f934mh04aikoxiv59exs0txqn9s8x3uwc1h6k3co4wki3oimxjbbax5a2qfibdkunu3yynl2ry4eaj5n900f83znqaj03t30pormxq19p6jitu5ayash6ak0g10wbad3v57xhuz66ufvfterdrq4ff8mveg2umxmmn6n96vtf0d3mrnndxuqlv7hm0usaypj47ok9qv6f40j783x43f3mk7p8s36uxb1rxwyntgmedrrnr',
                returnCode: 1442774673,
                node: 'jowzv4ibz1blsnm83d7151nmgt1rtgf54jtlrg9gsf9kaokbwvnb1na4menpc2gbjg1h8opsyl1mm6x8kil2pvvsnjawne190a47tfwwyhmshvig1goyd1g7wjgsjb7g9qrzjzuwqy9vt1f7m13o02lcr1j1f2y0',
                user: '73nyx03jg123bbxizdeihjo39zo3es0i28ijxk2iir6lh2eqfpdl79zhpa2rfdchb2na02oyqqyuhz1532x4m0xmia3kxviaw2zo0kolsj7km02rnk62ilhfhg6h764yim6qsrc0wugfmw0e24l32pgcudynqpm9s99rz4t1dy9yoqhrqkdzgrkoqee8hw2hv2zj5kiyeilhxqn99blxfehpza2gk7uauc4ykeuyymesqziiud42739y0d5qker',
                startAt: '2020-07-27 19:18:27',
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
                id: '4d3aa02f-09dc-445e-914b-8f762921b63e',
                tenantId: 'b7ef8f9a-5525-4206-88db-da0a0d5c25a5',
                tenantCode: 'e8nwie2w14hl42xuci2jemhoxuk1986b58nm4kkfhi9ayejk58',
                systemId: 'd1044a1b-7fdc-47ea-9065-8f232f9f8240',
                systemName: 'rmhuiubjgm3oyn9o1tpb',
                executionId: '55bb5b6d-7c55-41b5-9f8d-0a4b84685596',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 00:39:06',
                executionMonitoringStartAt: '2020-07-27 21:05:07',
                executionMonitoringEndAt: '2020-07-27 23:03:24',
                status: 'COMPLETED',
                name: '4lejcg70r6jaj9absarti9ia01a1hh6j5lgv1xuoxddowqpcma5dbbsb2sdfhlk6c34v5qw9fdfmeg0bmhc4kv3wa3hv68u39nt981gzzwg9a9kyhkj2getde03unr3eynlebf03n11qs5r6iounlnyza7i4gtlrqy1wi80x2xkehs2d892w7axgcgpoq0w1ofi2srger0t6wqdtrjdifqvxm3juk3znjo0erdmbsy22z0lsb0kzyw0oj0zyqma',
                returnCode: 8352571804,
                node: 'recpv23tq8v1mzj3kcct5wwa6ewaj0j6bvqa2tqiqxyezjdc4vxwg1pf20ocpg319kymge3jmsaq1x4qg04fcd3nlummbm5lzci3w9amuhfr3uy3yftt0qjs71hpjxbccihjc9rew0sgmec76eybuwshcf4tucvx',
                user: 'qih208u2fih3nk7eykavyjtc9z3eatafcaaap5wypx4qgz56p0a1y7gzvnsdjc0watnwmwwcje7cly15t249q0rew1cnocqmnvgc1izslyiiq7u1o83gcn5bwb4qppnjdqhe5nlx8vua7goi6yrj4ulz6o8oqfciilt813ome971rlr3hfyj4ruwgk4jt8yjsxqb3ldy82uigjac91dx2al3sdq4nfwf01hobezh3li7b5eui56g5ploel3v3ks',
                startAt: '2020-07-27 22:54:31',
                
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
                id: '2pqwi6a06sht2i0uvkk2742geefqvrh3pu5aq',
                tenantId: 'b7ef8f9a-5525-4206-88db-da0a0d5c25a5',
                tenantCode: '0rt1kix5zmj6y607tbwnkrjzdunycne5xw7rq9vutdpdgd5h2f',
                systemId: 'd1044a1b-7fdc-47ea-9065-8f232f9f8240',
                systemName: 'snld8ov8zzkrdlouwj8g',
                executionId: '55bb5b6d-7c55-41b5-9f8d-0a4b84685596',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 19:51:55',
                executionMonitoringStartAt: '2020-07-27 23:36:07',
                executionMonitoringEndAt: '2020-07-27 20:15:43',
                status: 'COMPLETED',
                name: 'fhb8eplboyiioycjog1ibrfr5sn6u6xluv1kexf8ty1l6pwgfiep66hsevs3rdkrfywm8c187i8gy5zrhz1gu9p9dlk96b8upl0qjdiwwak7oov9fe53psr7rj3g9zr6jqo0p5k4t8th10d1gcsn7a8zsc1emasu9em9uc9ez1xvop8rmkhdqiwy9baeov5tqi1m1yq5cubg7xhxp1f2ncuhkheedq8aktco0m5rjv9aoh1hghhxemw4134ticp',
                returnCode: 7320163456,
                node: 'sj756h2aavgf8hxy92vmiyl0j367zg9idz27uigyrxlk2x0x2455zf8n8l1wl03k2pw5skbov8wr9vxgfn19bmmusyljpbo6gsib4n08dcfw2739et55ksx4jvt0rhoxubaxlmlxjryjqp38dflquldmxlr5oiv0',
                user: 'q5vv7csuhs9tlbildd56uq63ktkiva0vi11x5rvf7sfjzyf25s88jhqy9qs9uawjuivzfbz2ihpikowuvy16oi1yswylh75oyg91o9juqvh4earb5qct474vegaeivql3rvz9kmih1cbadyce8gjwc20z862pxqhewqhvykxnw20kdzth7pbjfyvgezlynd9ii8yrd12oqienyhoumsmsjac5zqit7sn7fu97fr3g95dx7nqey7mjxpcvcw9dym',
                startAt: '2020-07-27 22:14:26',
                endAt: '2020-07-27 08:48:02',
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
                id: '4d3aa02f-09dc-445e-914b-8f762921b63e',
                tenantId: 'o3sxi16dylfqlumizxewak2yc91ie4qmj5qkk',
                tenantCode: 'p7fti9opw4x13vki5odk6c4d59sbb77ck0yjggg5ov6vaf83mz',
                systemId: 'd1044a1b-7fdc-47ea-9065-8f232f9f8240',
                systemName: '84g52rx09warrky3njap',
                executionId: '55bb5b6d-7c55-41b5-9f8d-0a4b84685596',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 10:02:57',
                executionMonitoringStartAt: '2020-07-27 17:24:05',
                executionMonitoringEndAt: '2020-07-27 12:00:18',
                status: 'CANCELLED',
                name: 'y5fkn1zmlrkum04iqh37hl6l8wmrjfiyaenkiw6oo35ddoez8watzhmkwhvgpmr0n6719yjdbucprj0or4no1pnrhod20augrgdydao95wbmkcleaxf7qccdjl5gry07t8bdo59x6q70pk2zvchxcaev7ybmboh0xmljsi37v3et55x5e9hrzac55j1ffehquh3j77thsp9hovkgo7a733rlm2zv82hv4h7p7et1mg4yfxjktoejjzuxsinuu4b',
                returnCode: 4669866324,
                node: '5rsw336m0ey8esenn99rtz3sazuft3g84wy38hciikeneaup1n2pkbj61er55hlm2wp6otezq0keeffmpbyeohsve0ry0b79lszzfydn6whj4nsneac61shaxb97km4dj98uav83cskbj8fy566jnqxnhg76p9mh',
                user: 'ockohz7y224njlksckt95j63eatehvm8cson4omwia663vi50mmtb9p8styrilqup8vwtwefilhvsdzochsu4rcifsjg6kfopwjoel0i8dnzpdrtbiwtlbdso4y3szu05utpu0ccnn150o0w8bh31i2gjlh0rjfjhlc6lrzogu8esnicw4hssr4njzzz38qmmgnu2qwgn1tedken79cyvhajlnlo2bfc0mbl0h6bwt4t3qtzrcjfbcpe663unih',
                startAt: '2020-07-27 23:45:27',
                endAt: '2020-07-27 16:49:56',
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
                id: '4d3aa02f-09dc-445e-914b-8f762921b63e',
                tenantId: 'b7ef8f9a-5525-4206-88db-da0a0d5c25a5',
                tenantCode: '1qkt7tbibu2l9z6o8xt4l7w1qsg8fgm2v9r5j5kihgeajpxg23',
                systemId: 'x7u9299xdfm1m5gzvrqkjvl14llpof6e14ceg',
                systemName: '7vfv29hfrkdnnv80r8rt',
                executionId: '55bb5b6d-7c55-41b5-9f8d-0a4b84685596',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 10:32:10',
                executionMonitoringStartAt: '2020-07-28 00:05:27',
                executionMonitoringEndAt: '2020-07-27 14:25:08',
                status: 'COMPLETED',
                name: 'x7jq27n69t529oh6meg5w8l64x74itp77snxpsi81jzxopn2hmuc3cl33hnzz33dx7v2zkme30czwmkgy2uh0j8dbj66reo8g63avojbkpx3rnz58ejxlbzi2arf5pi2b2xaxedjzgdic1tapblbcxhtc2nso1pex572f6egj731d9ixdgovxrd6ma8l736th8nr9ekcfzg87hm5azex2ha3nlaihtv0q3xts5ewsp9pomqwgsv20c2yxc040dd',
                returnCode: 8435310541,
                node: 'ori4lypw5c49xin2bhkmerldbmtoxq7giss8m7cgv3n6ohr3080xobxzuifc1uivqewic3yu1t3opag7ncre2af7e3ztfvswuhf4rcqu2e4g2by6l656dpcntt0n5jkpsf1d30ju1o6mhzdcxzhdpc39wwgyzio3',
                user: 'cpth87ayp2wwyhtohs9wyivueb6pbh04lviu13fniwejwusv8sw61ne079w7i72m0zna1aj6l533feqrn30h3k7ls6b2a2pv4mdjsav2fik7fzw3g2l8ezh659flw3rl3dp5jf98tnla6sjleka1s31phlfkzlfl9quzznlpwk03icolxitn24kgkesv7ermfxpyjmyjfin1llvvr28ywsumq5hsrbxdih2i9p1axoozgn8jc9opebzk43harm7',
                startAt: '2020-07-27 16:24:52',
                endAt: '2020-07-27 02:28:59',
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
                id: '4d3aa02f-09dc-445e-914b-8f762921b63e',
                tenantId: 'b7ef8f9a-5525-4206-88db-da0a0d5c25a5',
                tenantCode: 'i2v13y07bkgio40b6avntkxzeknojjhexrqc7ilr5x8rgc80tc',
                systemId: 'd1044a1b-7fdc-47ea-9065-8f232f9f8240',
                systemName: '05f0ts0wlquslm52mq4c',
                executionId: 'ufm0x1ahxtajs69ik0owxx96ibkt7gfprn44m',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 22:53:39',
                executionMonitoringStartAt: '2020-07-27 18:40:34',
                executionMonitoringEndAt: '2020-07-27 21:37:50',
                status: 'ERROR',
                name: 'v2lhfn1xrl5pm9r5mmvmtdqosny8e9jw3r9tr6z8m3cvpdl8kbq5x54oputtcg66v2xvripqtq0f3gbk6az7kemq36wk1n7eg2gqax98hhu8nlvc82g9s8tw1mn1nazno4lrz7l2cp9v215ukhvm84f8g5m7gkpjbk6ppitnw3gipfv04uzlm3dvg9ph8katdxg2xu3nvwwwtknsf33pwxoues3rytmud4tbrzhjltcbuyk930226s7r8c9k2dr',
                returnCode: 7914221362,
                node: 'hmm8tldgs8a36hha6hoag7jj22bqk054kzv4l3kvgjxi9tvhd2dipkb9vzrithasmr04x3jkv7tc69qmyzpkrxncdgs0moajhf9cfwli10d8hjtfvttlafy4j5ony3wd5pwadr1u46e5cjwj5uh065ws29wbmrpd',
                user: 'hl4tu59hfhb29q5vzp5i7hez83sn8o1db7z24i633pst6xamny7vssxhj8o2ngzbw9pgklv9qku3zzv2esag7zcj9dvy2u4grzym60zo4jn1v6dbvckagtjp8fxwf7pmsuq3vbgjtwk25k0cegsr9egyv64sq577wgntqi5u9ct0omr3echzxhegkd51yrigeekbs4cg7027bl8n4wyqrssu5ecm7lfru9kuxdtyig6gvxsn57ljp1rf14p2v6e',
                startAt: '2020-07-27 11:32:30',
                endAt: '2020-07-27 16:20:57',
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
                id: '4d3aa02f-09dc-445e-914b-8f762921b63e',
                tenantId: 'b7ef8f9a-5525-4206-88db-da0a0d5c25a5',
                tenantCode: 'p5m4cau196synkl97jog8yuewkyvuzbldynvkz2t52qh3loftjp',
                systemId: 'd1044a1b-7fdc-47ea-9065-8f232f9f8240',
                systemName: 'p862alh1y0rq5xnutijh',
                executionId: '55bb5b6d-7c55-41b5-9f8d-0a4b84685596',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 02:08:17',
                executionMonitoringStartAt: '2020-07-27 02:12:17',
                executionMonitoringEndAt: '2020-07-27 08:39:27',
                status: 'CANCELLED',
                name: '3liomur1zvt78witvk4ap8jxg74ew99ce5ddfsmdhq2zqgfj99l9rmp3lycuf9tr1xvoydwos7r1q02j5ivasr89nfvsyjz32axmghoqhs4ycjpy0z08lwc2y3zpy7jyt9dsc9ab4u3msgiq8grj1j6a3iapkbrw4h4bdt0ikm6xt21xnqchz9lv6ui651u57e8239zuu56z0mk0kdecs61dhl2fn2qvu800234b9cvz24manl1g2se8qqriptz',
                returnCode: 2643601647,
                node: 'hfmx3ksq30n5bqcrnmt04az3lm3k0rx10pxt337jpqmrap3k897tefueyhpeikfdrf8u6z16u4snj5wh9qfacomkgep2xe8j0bqqbhpvbkh8d8oa7icp32ec8ecdtvx2ukm5kvfveg77283o4zgolv4sfq8bhbye',
                user: 'tulpsc3qdg756l7if7b4zvwpzmn9b0xuz3k3mkkgd1eqn8lrzboow98j1mtifbpd197v1m2w78jobphlvlmvq1piq6i8i2w68lgexsdzl8ty73o7rvbn5cilziof9089k6ub49sg7kz80xjle7192nw5mfszr4d7q676xzmyw77ksshgp52951oy98e8pzuezzxc2dupgvkjuf3jkasdo79xne31v7l5rp4f217b36unhucs8bnc4hp08qgen7m',
                startAt: '2020-07-27 20:03:14',
                endAt: '2020-07-27 21:17:05',
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
                id: '4d3aa02f-09dc-445e-914b-8f762921b63e',
                tenantId: 'b7ef8f9a-5525-4206-88db-da0a0d5c25a5',
                tenantCode: 'l8kj37i90ry7m2z24t344vckwo3fgvbarh2j8a23jap84tlx7j',
                systemId: 'd1044a1b-7fdc-47ea-9065-8f232f9f8240',
                systemName: 'c3yd4t1pvzy8ha5a7fd2a',
                executionId: '55bb5b6d-7c55-41b5-9f8d-0a4b84685596',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 05:35:57',
                executionMonitoringStartAt: '2020-07-27 20:22:50',
                executionMonitoringEndAt: '2020-07-27 13:40:09',
                status: 'ERROR',
                name: 'yc69v7dbhzar27hbgz7mz18m52u6u55x2hv00x9c55squl28maperj28b068bacrvk7jjmi32klqgf374tkbzvns7q3tidh7nl2r72g0uzw7axu2tv5bkvuxstt12svuazxrgk0tpx197ngasdy0l1rwti4vh52x84hnrkq5ppu8y0ykq2v6s8yf7turffnlf70ui6xjqux0glt1w7nvup715zthyt2z38mncqwj7goitjjm0uh0skbi37jvm59',
                returnCode: 6621493458,
                node: 'ijn36w6vmjkd9kyc1i4t8w1134widgr0ist4pzq7dolv96hdim8mqzjvuujmfe42ts9nsbcka2embn3ru5hjr9ia6h3ombvvo43b5xoh5y1ldk20hooh4iyduptdw7pbqvtljiug8ehbpmq9flr1u5n43sic38m0',
                user: 'cr3vhehc0mxr14gooz7hwz3h1z0rguxabccfkxvmniron77v8v85hdgxum1x3q5sd7uvy70629af60o9j8l8r2qvfjnmxuairpo6rmtfvs8zxkroxrlip6i24jzl77nws47ixx2tsgir28czn314zhlgrsxss7qzskfx76hwzn1dtrkv7maozveay87xb3byiw107rq4auj6qldqjqfi30ybb4jw321xb36lk40g3ciglihenlpg2hlhax6oljr',
                startAt: '2020-07-27 15:33:17',
                endAt: '2020-07-27 06:15:31',
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
                id: '4d3aa02f-09dc-445e-914b-8f762921b63e',
                tenantId: 'b7ef8f9a-5525-4206-88db-da0a0d5c25a5',
                tenantCode: 'ker5axm5c2yvz9pofetf9t1nhyrnj243ns3atu61pijc3znjg3',
                systemId: 'd1044a1b-7fdc-47ea-9065-8f232f9f8240',
                systemName: 'yyn1beja4ciqa5ubo6aj',
                executionId: '55bb5b6d-7c55-41b5-9f8d-0a4b84685596',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 21:39:24',
                executionMonitoringStartAt: '2020-07-27 18:36:44',
                executionMonitoringEndAt: '2020-07-27 08:39:50',
                status: 'CANCELLED',
                name: '4oynr8gea40js2mjvmswnqtwvhnhqvvd6zrnv97cmpcjulqv7yiydvtxgzgi5pjuupkqn4xxu5rfl89t36ndvroikozhcijd1f9bcd56bntxxw5tokqwdjqswx28a002dqkm9yznb27wtcmdi2rb6ps2t6oltt2ypf3i0pw9dvrn73vzr2a1ymsg4kqczkqjn591mienj9f15tcq9eif61znh8z35stexnnj22ri0au7jurhkk3y5bxmnayg6oks',
                returnCode: 8654039584,
                node: '3g2hdzv4zpm87x5kgpvkdlg1yz8zsrcxciaybr9wl91m7k9yya02ctta0fxbat2zvgztdv0zf21w7qijw4xchklnco4derlc6zcyebzs7tke0psj2rgh1gypwi26a0it9otctxdes5iszlf514u75y2lqcbkxoww',
                user: '2o79cn9v8fi45xdpkp43rertlzou7h1hs36t7als9cs9wxhp5xgpqfcbw4y21wikl3sfrbcvvzxgvvz57exh2ie63he080a4tyrgz0wsb3l6rc9ojyf3kria9zl8clf80mgazz1aumk15q4kkgk10deldo8iz0whb5jm1ab60pqlqx3p041c9rgbt1yerydqvno9mfo0ui4c6y9ufva4xuy9s21bvwgf9wx5dqribrv8eukn4ex0wqf926uc13d',
                startAt: '2020-07-27 12:08:12',
                endAt: '2020-07-27 23:52:22',
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
                id: '4d3aa02f-09dc-445e-914b-8f762921b63e',
                tenantId: 'b7ef8f9a-5525-4206-88db-da0a0d5c25a5',
                tenantCode: '3yzk1mcx0o3ezhg98zyn213f1ces3r71x7rsfg9oqw8eyzjjs6',
                systemId: 'd1044a1b-7fdc-47ea-9065-8f232f9f8240',
                systemName: '2el6kcnmgnicpoaz50mm',
                executionId: '55bb5b6d-7c55-41b5-9f8d-0a4b84685596',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 22:16:38',
                executionMonitoringStartAt: '2020-07-27 02:55:26',
                executionMonitoringEndAt: '2020-07-27 20:11:41',
                status: 'ERROR',
                name: '1c793y3afmnrw6b2617z0jmcb2d3fru6tpfr6ojfl68r8oin30hyuq8x7c45y5s6ubc6lo0dxjlz5v96u6lyw21x4koubngn65sz0n4t48dpk3w062xrohpxfjxi5y1a3zw89eau1nb2fftxk9xmaef370c6t8wnlx3syngonlgtqey13khrcfuza5rw9775727eiyte309bao4p5l2ooxidmx82z86lzo3hlsmzfw2cjrju3vxx340kto7h3vp',
                returnCode: 85240174782,
                node: 'keu00fj0htbkxtfdxuvhrogtfmmju7d1pzv3g45sqruh3vzwi433bampawy76j0kigt5vmtmqrejooele379kx0gs5le8emdkpgg1ahdbvbq3powqt5lpltbsp2liibq1zb7oj3p82ay7jgcu41lzjv3xd9lzd3t',
                user: 'zh22mzmvkfr407pyas5p79sguh3z01e6beitopa7vd4ofj1le67eeozja87uzpmgcv8mjvhn4da80pjhzn0zd1sngmth0ef1zsvna9uq44f909oltymh01uez7kn4aqtbab0kbk4m30hqx3j0qw567krsxqcd2yhhah86r1r1qex41xsgqp3vvd1a7k8uzpso794kgeivu2fd4j8pw8y3apwu6u6k1m3yx93nifnqcv4232hzs6n89lkxodzudq',
                startAt: '2020-07-27 07:38:30',
                endAt: '2020-07-27 23:14:25',
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
                id: '4d3aa02f-09dc-445e-914b-8f762921b63e',
                tenantId: 'b7ef8f9a-5525-4206-88db-da0a0d5c25a5',
                tenantCode: '3v9kmn6bdss7812c9euyzssnmhmegrqi07xkhuf8du4lce7sru',
                systemId: 'd1044a1b-7fdc-47ea-9065-8f232f9f8240',
                systemName: 'fl0sffj7knp3gnxh5tp8',
                executionId: '55bb5b6d-7c55-41b5-9f8d-0a4b84685596',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 16:43:51',
                executionMonitoringStartAt: '2020-07-27 15:14:18',
                executionMonitoringEndAt: '2020-07-27 21:56:06',
                status: 'CANCELLED',
                name: '5cnfk37inuf0t6ip3u34sz98mry1ggvjeo39akb8yhca0cmp4nua0rl447nubsdv1sdlqagav3m0e5lv5ppoa7q463dr06f4xlfxfcehroqlqq81r3jge2bwkox9b4urmtlhm56uz3f0l9qjk6esxluq45ekscsn6vp8q226e7bs48hzou935twqt3spcye9gl8qxmdx3qs7sdlirohxbjzah207lx2gqbrzaxcmgazve0n0lbrawpr4h8b5ub1',
                returnCode: 3548208750,
                node: 'pv5untklj1gd3a437lcohwrkvd3mot1ag00rzbke5hzs1cyh71ep1f0kioaeatx77coohe5jh5hs4njehzazh4ufrykn1jddgo3lp2apx8wo8qd7t4a97hqbhgwbsjs5v1fyxc7r0rne3vvyauv58oqq5ihmbhv00',
                user: '7e0dr2oxic4qufds7lof42swaa0on13o9oeqk8g49v4k94546og77szwcnfr02xxxh223fa430uz1qzom30u08rr8ora5qxyzf4j7fh19upkv90s54wajy8dwc2p2vh6tqabvoddbf672zvgj6d1h0dikf10ny3blh29a8vppq2mxodz95kanvjj7huyn84e1oe3gegwxb8klbhxul0xlc990e7qk2ltm37o3iq4davbcc3z7m4hnvqkml81sm4',
                startAt: '2020-07-27 17:29:20',
                endAt: '2020-07-27 04:25:22',
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
                id: '4d3aa02f-09dc-445e-914b-8f762921b63e',
                tenantId: 'b7ef8f9a-5525-4206-88db-da0a0d5c25a5',
                tenantCode: 'ek1mbkhli2i76hzn5f5jducrsutg6iwcf44o7krkypbfik57t9',
                systemId: 'd1044a1b-7fdc-47ea-9065-8f232f9f8240',
                systemName: 'mlduli66scrsr9ljroxl',
                executionId: '55bb5b6d-7c55-41b5-9f8d-0a4b84685596',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 14:28:43',
                executionMonitoringStartAt: '2020-07-27 15:38:54',
                executionMonitoringEndAt: '2020-07-27 07:08:46',
                status: 'CANCELLED',
                name: '18zpdznm9cozds8y14rkucic43j5pgdyhyngwaw60ikgw3kwpkovezi6vncg6i2nryhztdtbz66lfnfp22xkkzs4v7aalwnpjkdhzv5asc91ohozwiscjeoy5hsgcf2jb04fkeq6rbze2m95o4rexn3je9ps64c2icvhp1slredfe05uaa1tkiv1trmnlbbgx1l657cn1ul5sutdhhgp3dq92noe37vufcp44r8c2xx95t4iflzl9jrnkkuqecj',
                returnCode: 1913691480,
                node: '8y4442m757lzhsln3sbj0dsxhywh1zpv4wb43n6s55ylns4i36k06f74c75xi0uednpd5nyu7vp184ajmlexdwsnq14djeud1gkp104si73lrj34mby2zwvn4lncwol1zoid7yg4d8it04r8xdaxxiaf64cggv7l',
                user: 'vg7wq5p3rak8qqepwwf3xfqhipv6q32dd3v42cacq2ijyoyiq53qv04cok5k0o5r8x4y8wovoa5bhljen0tbmxtxtcc0ggklrb2my6j042qzb5c3kqma98f17am15xs3w3bnpxmnizt2smltyl7l95ngk8sd0oem9zl0hpdqvy400p2l6fwzuadzq4i0u3d384ab16n1nzn3a8gsz8ohadp1lg7z1cex58oi43jcg0oujfp7xgb4o69gubuwis1j',
                startAt: '2020-07-27 10:14:09',
                endAt: '2020-07-27 20:27:37',
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
                id: '4d3aa02f-09dc-445e-914b-8f762921b63e',
                tenantId: 'b7ef8f9a-5525-4206-88db-da0a0d5c25a5',
                tenantCode: 'wp1y4f4vbanrrv6mk62gt22wdd6lseo88jgdifyj9ecyoou7kd',
                systemId: 'd1044a1b-7fdc-47ea-9065-8f232f9f8240',
                systemName: 'sg6fi3lcpjoel7jexsqj',
                executionId: '55bb5b6d-7c55-41b5-9f8d-0a4b84685596',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 10:36:58',
                executionMonitoringStartAt: '2020-07-27 09:47:14',
                executionMonitoringEndAt: '2020-07-27 11:06:58',
                status: 'COMPLETED',
                name: 'o6ko2mj14j2b9m6vk3o00i279viyhx7e76tiw7rp78dvwu4zcjhcsojdqtn60j3klrya9x3bydel1d8pebgkazmex7pv7oj1r5uxfxieo5cmrt7d08d19779s7ogxny2s2wpqxxluhi2527ufl41ni789f2dl6x91qz30794t63p75igvt2ck5nr9fsusft7y8s2nu5znx5p8yd6aac399dys2gd5z054004etaysr24ufdc66ndigtp0nytx2y',
                returnCode: 100.10,
                node: '28vsabcckufqlyn6ef73acknbxlx5t7j2zr0nu5f85o6o17d76x61z54k7q28hz3c9kxlbxaxvnrmeqk6q9we73neujuysoffeibkrih2zw50idfq4a7kkcejsilx35a3lkhke8ghdv38brzbiv4ucli1nqbprhf',
                user: 'q8hn8ou29ok02o1jed8wievxksjorrldpcda1r6jsh67z2grz0grfveu6ofq76zymhzel4o357v41jwq5rq7h0d6qktorv96sw9olry6kize7oi1t7jjmrhocspit531dv5qwmtcrm409ormlpkz84cxg7cihzv0lto3e76inn39rw1ird5qtsv7cwrzewgaadkx3uzgl8tszpmzym1a07d2hx09pp2q9owh49n6h619361etk2ka2eda28awyi',
                startAt: '2020-07-28 00:08:57',
                endAt: '2020-07-27 11:40:05',
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
                id: '4d3aa02f-09dc-445e-914b-8f762921b63e',
                tenantId: 'b7ef8f9a-5525-4206-88db-da0a0d5c25a5',
                tenantCode: 'jzi7j8cquo0w2pageccxt9ex3lsk0x3aukg6c2ob3urs02yacn',
                systemId: 'd1044a1b-7fdc-47ea-9065-8f232f9f8240',
                systemName: 'etjzshy75ycb3yynj6km',
                executionId: '55bb5b6d-7c55-41b5-9f8d-0a4b84685596',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-27 14:05:52',
                executionMonitoringStartAt: '2020-07-27 16:45:37',
                executionMonitoringEndAt: '2020-07-27 19:06:25',
                status: 'ERROR',
                name: 'e80nyu7n86s6rijsspazsj3iha2uiwoqs2zqpfrd7ofou23dqx7a4imqkqf3qnezbjkq9vnpj8zwged8y8l11zrxh82lqbri1b7x7wk8vf8kmeswkouoxeqk86mdb0s0r8be6195pzx2c6xbb61gw40ege05ydczptgzvpu5cetupwuhl0ahj4fxkvsta2wfpj1qel90f7i31azqvxr96797rkkhhjg5z4ealc6r8mbsh6zpl200i9pvqwd7qhl',
                returnCode: 4528697000,
                node: '0s9dyzzm3m51p6t9exti08abewxrwb2zi201m814m6e1tn8069jlr7epuvhveh3l7wtffvu1mp67jiuz9aeervzd5fn81ohhyc6aftean6xoorrl1l4sr8iz04no30sxip2rwsx3fpw55mmb4h3lurc7o6rzwmeq',
                user: '1zjo7n9khj0lek5fnf8jarqib48lq1chk6mglpmyrbwjqyng3ftai2ierxjd0ylillaczl7l4un1172o3txlc9w5p2yj48ehhf3msmyk1fiqy9b79zl44dcze18rim60y62j5hphyczfe422osce2iga09ukzeehxeumkzriv59nb5ly3z7bnv4nbdc5xwvj0h6cbw9e9vzzma32an2gciz3wu8skjk7jmbkdvj5icb9b6ag7evmzw45t5lqzx4',
                startAt: '2020-07-27 16:27:34',
                endAt: '2020-07-27 02:09:43',
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
                id: '4d3aa02f-09dc-445e-914b-8f762921b63e',
                tenantId: 'b7ef8f9a-5525-4206-88db-da0a0d5c25a5',
                tenantCode: 'rfhbdj1m1dl4yodbw9gqiz4h24txu5093q8t4tb58duijg40zl',
                systemId: 'd1044a1b-7fdc-47ea-9065-8f232f9f8240',
                systemName: 'wqt87q2sku09cuyohf2x',
                executionId: '55bb5b6d-7c55-41b5-9f8d-0a4b84685596',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 11:41:06',
                executionMonitoringStartAt: '2020-07-27 19:07:19',
                executionMonitoringEndAt: '2020-07-27 23:50:21',
                status: 'XXXX',
                name: 'mauowh08ehf5c2eekxmo2n1mzdt7gwsgwf4xhxwrygpa83ow89yk2lwmbjx5s0xgumib2b7r1vwrfaxxne5oefedb1je8so0sm12j4pxnessrwyybiqprdotk6cvj63q3bfvfm7os0rxl9mwa8mauy3ecmg2zqup8gs0irnqmjwdd0tq2fukv5ph03a7i90t71i8mdqqqdj4w1gebywlyxy1uxcknrm8ar9lphdpfgornpjajwec0vxk6t1d4b4',
                returnCode: 8339432123,
                node: '3cxes6gl38zs1tjofvwamky10i35w5ay9gp2ceq0gxc4s205ce27y4mrvbiecqiommufpf4ux6ceq15hqgift1slfbh6u31r9aikia9h2w8djim338899mxld1kq5i0tj09nr0zfi8ohbsoxs7m1c7pkq5ejjkl2',
                user: '98208alv40y31vjlfrvts0mnar2d6djm8vu6dghg1qo2u6eux9mg4v5fa4zi0wd5c0otlzc2rsxi4kh3fpbpbxgjsv8m0jf4b7t81bz5i8xpb9rm4dgqzwssho5ufoxkoadypq8vd07b2qudwi7z0a09vnbsrcy2951vnaksgcubtpqx79xod45o8ehat279ruvcwehf0b2b0n9oe6ysh6lsa32gc3wfjoo4gdfcgghmukvjhgt6vx7owydywnz',
                startAt: '2020-07-27 00:55:24',
                endAt: '2020-07-27 13:18:30',
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
                id: '4d3aa02f-09dc-445e-914b-8f762921b63e',
                tenantId: 'b7ef8f9a-5525-4206-88db-da0a0d5c25a5',
                tenantCode: 'mtn1wxyvdh960491fg6p17qeimpnwapa9uzgr32g4e52uwtade',
                systemId: 'd1044a1b-7fdc-47ea-9065-8f232f9f8240',
                systemName: '8ts5zh2v587pswbn12es',
                executionId: '55bb5b6d-7c55-41b5-9f8d-0a4b84685596',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-27 22:12:22',
                executionMonitoringEndAt: '2020-07-28 00:48:24',
                status: 'CANCELLED',
                name: 'pjkgw7783dapzrxm9xrbolb40y48b156dkd0mypz7j1ebulpr4r0xd0qf7dq4ktem4a60mztu192t4z4ntg2lp1ac3m8bpqbhsujozsclupdxcqv15aswmsju2v4pd9nzdf8w3gpuyzcaf8rpdg9obnfxoesiu4p3xokp4habeoydnckjjygrj1yugc6jln2ja1hpvw4pgsousvuskekbvne9h2rkhuf9p9pe2lyfrg1ril2qt7s8fzeg5xtv5t',
                returnCode: 9804786907,
                node: '8yk233sl66hrazj4gzihoceoaf3xfdv2uvuabqptijg6glhetjxuy4jn1cqd6xqnv5w1orktvtdza74ba7d44q9zjttxqqcikc6sinsy86xuhbhd7t3r88isodaf5jfnc2tr1s3j6dhj61ob6hexqwsdwhx8v2lr',
                user: 'm82gdclj1r1g4d22vy84ky3tizv2wtof1ldrtmy0ej4ahyrhirwnaaxw78emxnjvlln6oa8cirrqotefwb5ntx3uralsukc9nzwxykjt0gxkpj3y4qrq0uam50e59acwa0vxhywfn6brqp91uj6uyeupmj90oizmxwd591slqpvn05s2a9jpuo04srujxy4kwhaaikca96xlclf4mxw3kjg2dxye2nysk8e2qf2ftl2arul7y8cbtedcd1gg47m',
                startAt: '2020-07-27 08:07:04',
                endAt: '2020-07-27 03:07:46',
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
                id: '4d3aa02f-09dc-445e-914b-8f762921b63e',
                tenantId: 'b7ef8f9a-5525-4206-88db-da0a0d5c25a5',
                tenantCode: 'p7ggllxny6bf581zkn2pvyw1xi4w5ar1ix3ys4grh005xy97mb',
                systemId: 'd1044a1b-7fdc-47ea-9065-8f232f9f8240',
                systemName: 'rkkupcf9g2xh15tr4u7e',
                executionId: '55bb5b6d-7c55-41b5-9f8d-0a4b84685596',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 09:54:09',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-28 00:12:52',
                status: 'CANCELLED',
                name: 'djxlme8bgdyhnky0hhdo4f8soqncfsgznun21msy4jkekho0u2yag7fuae5drbclhubjwbyf96igx7kcj35imx23b95879ow1id0wxlgv5vmstpur5iap6zy9geuzzt793wyesg8lxfv0jlte36gwkgbem2q7apm45135bdsvh1sic8fwim75wl8u5zmjyow7xgqis0511zja9g1474y662o7d01bacyyrqomft1va9es899puf05gs3oyvb9w5',
                returnCode: 4924472188,
                node: '4hgj7z4rakkpv848iehccxpwvwa7ifjdrbxm44b30ebh5vwe3cl9recsisijbsn123g30ddc8dab5oxiidpici23s4t2llnhb8h9a1p3fopxnw8dgj4yse5y4hup1wyflo7wp9k1mfpmhw91ccit3dshorm20wvs',
                user: 'uk6pzxggmk6kdmrpvnaezh2f16giqzaqqb9zgbaya6nq97kx1b9ufbqowrbzy46rwy6696d2ugku9f9zajsls3yp4bt7w8uqwae6kzv4saitdjk2zpik9w0fn821n2hbovc807q7vtuplknxerhctdmyfrvd83n3dg9thigmzd48njzk21p1iisvoijb4f8wuw1qrtfuu2gm0egnmz6tqh0jqmqb0d0dt3d9bu2qxwm0dlbg02g1m7ht9bfab0n',
                startAt: '2020-07-27 11:20:29',
                endAt: '2020-07-27 17:33:47',
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
                id: '4d3aa02f-09dc-445e-914b-8f762921b63e',
                tenantId: 'b7ef8f9a-5525-4206-88db-da0a0d5c25a5',
                tenantCode: 'c18mln81mwqezl5wc01sb9mkyxt5104jkzomnln81rojrcow6l',
                systemId: 'd1044a1b-7fdc-47ea-9065-8f232f9f8240',
                systemName: 'oqs595u43sivhxvrlkng',
                executionId: '55bb5b6d-7c55-41b5-9f8d-0a4b84685596',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 03:20:18',
                executionMonitoringStartAt: '2020-07-27 11:17:32',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'CANCELLED',
                name: 'rbqrjiz1ndv4x9fibihxl24dvc0huntc4k4rv799maei43bds2a5pcj0la8bptaqw92q05uq8ix9lurqvuj0ljqmcw2ovqgqn2o9lr5esp1pnd4eiaxkbdjk0zv7ygahl8oy8fwqeg8rga3pzhn6965a7t9lebg33yv7tcj6w59lbylj5wl2h677igcwxu2dqo1kq333oi0b9eocgou34vwzdkuxyjn5hjeob5gwqvy6ng7ivk296pat9ulyrhn',
                returnCode: 5797165804,
                node: '538lj0bdnxpvofdx2wdrfzntkifxu2zf05ki4pm5vvqsgiov78nn5i621csu6qm8chvt29y62d2u2hbvkk8izkgp7kmtg6jzbyysv3uq8rqejosgl2o1r9g1afr2no4vj05m6urz4sgbfwt94oeeepm08aczmnwp',
                user: 'yi2iulhk15bs5pow8h4ulef3wlisxs70rju2hnpi5edmkve8lvgvy8m3r4cusq9ajjoss5wgws4gfrkgza3fts7mxanp9gmif1q9f5iieff76dw0ozgmjsotv8hakn4edad46uq7103z9budv1a8i86w78gfnwtz0pu8lngkltysc5rtkgcr5ny5iod9x538nfb6hqenfb3dfmnygfzuad0r3yjas6a67sbbjo2p6flfnxueg6617fnsfixsdgy',
                startAt: '2020-07-27 02:45:36',
                endAt: '2020-07-27 05:09:23',
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
                id: '4d3aa02f-09dc-445e-914b-8f762921b63e',
                tenantId: 'b7ef8f9a-5525-4206-88db-da0a0d5c25a5',
                tenantCode: 'wer2h0xefj4z8rs5d7hhm4fupy5mdtpppbgi4xfx3273s21pyh',
                systemId: 'd1044a1b-7fdc-47ea-9065-8f232f9f8240',
                systemName: 'yhmdtxrm7mhg0fcmo3og',
                executionId: '55bb5b6d-7c55-41b5-9f8d-0a4b84685596',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 11:07:49',
                executionMonitoringStartAt: '2020-07-27 12:41:09',
                executionMonitoringEndAt: '2020-07-27 10:31:36',
                status: 'ERROR',
                name: 'y2z727mpffbpp66f8bk0e8ejzgj6qdf1fcmqs0a73vz432mefsluc7vcxtg2qv8fm78zd0btvkj0qskg3nfj8gbvo72zobe2q4qddzi4o7hos89zyg8b5gqdt1wicf91oc5zroi24nhj6e1bzgq1gomnxcnsefg4iol707l5969hej4780t5766yik626fj3q35t0n04a9kf0d2v1iw9zjlxmtxzspma3p6din01gzmlvdfqx2h7iymt52bhv7p',
                returnCode: 9244430625,
                node: 'eg0l08h7sthsj9xynew3lc6t001odpmhud689qwq9kdmiygx6z562lbwarfa3wpct2jjozkmbem0okuzuok3vhipuazyr9ozir1pf2ruqmxquri7g6y588adoprwg82t84ov8xf66z8tip3wh5oupaujr9tz47vm',
                user: 'rmpzcnjm8m03ssmey66op3q9qdxkkr4639cldqv434wb2gzrrni00ks8b5gbvyc4uj1ncgq0bbojrffqgw2qxvlef28nh3y7why5jae83tk8zwqgihdgflc0kra32a4iggxk08pw7eo3z34wu6xmlate206y4ewbbxmatkw90r16b6ww12sle9pt561dkxzy3qmjqqyzrzyevi8mgpij7p28jpke7rp6zawvy88wtrven3w940c4qn89m6qswik',
                startAt: 'XXXXXXXX',
                endAt: '2020-07-27 14:42:57',
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
                id: '4d3aa02f-09dc-445e-914b-8f762921b63e',
                tenantId: 'b7ef8f9a-5525-4206-88db-da0a0d5c25a5',
                tenantCode: 'tcaa93md7ydygcc586lgk6atwmr3x5rdaye8sludlb5opsd5db',
                systemId: 'd1044a1b-7fdc-47ea-9065-8f232f9f8240',
                systemName: '0f7kn91cpqqhvdis9vr8',
                executionId: '55bb5b6d-7c55-41b5-9f8d-0a4b84685596',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 20:46:40',
                executionMonitoringStartAt: '2020-07-27 21:29:46',
                executionMonitoringEndAt: '2020-07-27 03:25:27',
                status: 'CANCELLED',
                name: 'g28av7bu639h009a2tndfvrrqcs0wharnhgkn91pu6qng8qfj75to41u7tos7c731atirdqgjgn18h0mcg2qkhumuhqkzlwmb2o2jbnza8pp63ty3df3ykff1d8r9gqrrge4klcas63nvqhdi3kictklbwzebmn4frswm555f93qelonh1fgdgwtcrk3gkeqs4tfroz5s876qprum7bhlxso1adjzxne5flhw12102sa1bk132dsji731t7zbdc',
                returnCode: 1181258098,
                node: 'dzq62lbl576fvf2ri8ju876b0kutp90brvuk5duic0por4bha2t2nqm4cqa9jsynhyl7srm7k5inhrhlows0buy4wfkl6unu0wd6awm1wwnb6eb1r1ueoqwf5f8n1fqzfd1csovhzecncdu40emxqyyd8resvw8x',
                user: 'xi7w0top5dq1mq4jphcnrylecqje0oo67kn97dtrbdw42x80w74y4kltqsifnyt21mflmqqyvccicq8y8s6bk2efaadetz1ade63msde7wsugwlx07kb802cmvc9wui5z5ugy5r85h0hxascb98j6zl6be9450q67pz0bv5r25kjo9cykln8xhnmofihgqw37c82gorr7zv3ag8nnr1krwtot89y9km2wrmfuphf6qfm0elccqgtydqgyc4ytf2',
                startAt: '2020-07-27 01:04:20',
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
                id: '4d3aa02f-09dc-445e-914b-8f762921b63e',
                tenantId: 'b7ef8f9a-5525-4206-88db-da0a0d5c25a5',
                tenantCode: 'h42fwrlnelb79rylj3edenwdmuno8mzx58idxsev7gesspkdau',
                systemId: 'd1044a1b-7fdc-47ea-9065-8f232f9f8240',
                systemName: '2wl36wuirylqyau3mxfg',
                executionId: '55bb5b6d-7c55-41b5-9f8d-0a4b84685596',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 18:09:25',
                executionMonitoringStartAt: '2020-07-27 13:36:02',
                executionMonitoringEndAt: '2020-07-27 03:35:27',
                status: 'ERROR',
                name: 'i81gqjizunk89sqc7pf4wfth8zijgkgjfsb5e7regvvl15wv43jb7q44vnfjy8d713v70f75q95wymzyfxh5qozoxwdo8domaaqamolnp0pt119a7mlasmm81ylwowk5af4ck7kef1ktkhkwy82xflqtxqitu22ckqwr0bfdvh30qgkxfhpo04r1lett0acu2c02e6x9q8csariicpvpaplcvjxorik2ov5zo886ugfoai1nzdeffeuo1qwb7wa',
                returnCode: 3861199368,
                node: '1r3dme4jab5mty9lqlt0bfv468zdqv949ngha5lvod3d4jb1h2c354ki67whk1htxxpjcxd8ryhs4vsgjphyvdgvtotlnavd9qasc9jr3i6wwrxcdbnqj4a2m3rmmf0lk3peb1dhomen81fmgc4722wbaugzrdha',
                user: 'no8z4of7qaj8yyd006z5xez2p6z87j2d39txej7ph9jlrm561wtsi01j0je5jnmfubrka2856x1z8nh9s99wcby3irjr7dj33g51twdnsflhqtcdsr9jdw73zj1azvc2xyv79xzpwxisjcnnmuvvq4ydwsvj1sz1ydvkyv9bl5o3yl2ykstzoggos2s5cms9bteq93wf1mofils8zmvt8w0qq5rbcddmg1mzwgk5vbge6vr5vq8t98vrvhip7ob',
                startAt: '2020-07-27 14:12:50',
                endAt: '2020-07-27 02:49:53',
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
                        value   : '4d3aa02f-09dc-445e-914b-8f762921b63e'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '4d3aa02f-09dc-445e-914b-8f762921b63e'));
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
            .get('/bplus-it-sappi/job-detail/4d3aa02f-09dc-445e-914b-8f762921b63e')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '4d3aa02f-09dc-445e-914b-8f762921b63e'));
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
                
                id: 'c81edfd6-6ae4-464e-bfdb-763e57e1c857',
                tenantId: '6de8f832-c1bb-4cad-829c-e717aecc9f00',
                tenantCode: 'km79u0vsggzg43s9xwje5t6scilohb2z3xn5w886s4kywxx42q',
                systemId: '1ee9cffb-365d-4574-9769-a4079fa992cf',
                systemName: 'vbgytif5lqx5f68zqhmj',
                executionId: 'df366571-8e87-43b9-b023-03c206c5a422',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 22:31:13',
                executionMonitoringStartAt: '2020-07-27 06:51:08',
                executionMonitoringEndAt: '2020-07-27 18:17:58',
                status: 'ERROR',
                name: 'brq4fvj1oi8zmwdfolrn3r335a2irts0xkqw6vzfsk9jtdj7k1k1848b5o33hlxbs7grj2lz63fsn80m3y29i80rskdudlkwkwybmvphuzwgv21vqa4v693f9rdalijradt578y0mshga8vchi0m1otyfhlmjnre059q0t1fgx7uha6uywt4aerxarnxifcx5fy6ckk61yw5ss0fs2gfnr90hgwop2hrjrp3hn0y5vy9vmrbho9j6k8tuum03a6',
                returnCode: 3450568831,
                node: 'uey4umgpgevoplx4n3kbu4e6z13m5a3cx574gd731oc0c8dvmcryx5nmc97ksd8ammnfkwsfrh8bluexs5fy3ciy1xfycrdncu8utgsftq7angqubhsqm7ho5ctjri07lwk47pp66dw25mlw4p85j5r1i8s6me9f',
                user: 'u3g8t378v8jze25a0xdpided2mq0w3zofnd6b0eggh9p0f4uhvzee6iuyy0iuu0lkpchik3gaj7qmkhbfhgc0b3in5oetfo5jcfl4yhm55k7mrsomkx53cxbksvuq53b8jrebybrrt2u0ggndkrizt5itihwhvm4udoukdlyhfb8shvk3ns21vdlbkpija0nienvxfi6f9esoai9btzzhv22tiup8l8czlbgi4nwn8hha59n6lv2pbgz1kdzi6t',
                startAt: '2020-07-27 02:36:01',
                endAt: '2020-07-27 12:18:03',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/job-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '4d3aa02f-09dc-445e-914b-8f762921b63e',
                tenantId: 'b7ef8f9a-5525-4206-88db-da0a0d5c25a5',
                tenantCode: 'jn2ibrmislt3ei7nnyx5pk1tshn8ra55wcqfka7ibxl1xtw6yt',
                systemId: 'd1044a1b-7fdc-47ea-9065-8f232f9f8240',
                systemName: 'rpioowf32ytgyvsbhctz',
                executionId: '55bb5b6d-7c55-41b5-9f8d-0a4b84685596',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 14:44:07',
                executionMonitoringStartAt: '2020-07-27 17:32:24',
                executionMonitoringEndAt: '2020-07-27 15:14:47',
                status: 'ERROR',
                name: 'e4bzc7cks8wwz6rcnoey9lsf6acak8e96wu5u4ez5fzx2nls7djlbf13ebj6pmykw80gb8xgj1wsmfxyzfnsmsafvcnt6j352zssmhzzatya2ixdoqfznfrzek8tgajky7j20cv19lgcs6uzwzrfjhcfvcrejp23om5qz40hbfhkjymb0v2k9tu1w3wsmhfjpia1a9kyiwudrgk9nxtsa2wiqnjchfm7xcbwm67iat1ok5ue49dorv4p7gsi7nq',
                returnCode: 8015896654,
                node: 's0wsxs79t1l9goq5hwllyygg7l2aiu4i88mqjoyspc67lj8tx9exhgkhxdm579agas6pn02b2bwt87zu5whnsd0m7q9bnj1a7gooev5raovb0wdqxbkyqr7a89y8f07a34jxm2731nl4ka6zdnthiriuh526b87q',
                user: 'trdkbv3t2txgvdjciimy1cgjjrw71t64nc1l5bqyet24p1t91hz7qtd8j68vut7cunz3ov7hoedrr156le3ux4cu6vv5i5ga54l2x9v398mchrapb1ld26ii7z02tnm2bqba0cepq7x22981336jjg2ge3wm9ekicxdym6naxqkit8ec0c987w2a6qcuumo9gbdwjj3cep95365nqwueg48gv935g14hpqviqfef5f5nmkezs8zxl1qw5rd9ai3',
                startAt: '2020-07-27 15:27:51',
                endAt: '2020-07-27 02:38:28',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '4d3aa02f-09dc-445e-914b-8f762921b63e'));
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
            .delete('/bplus-it-sappi/job-detail/4d3aa02f-09dc-445e-914b-8f762921b63e')
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
                        id: '6feb0ad9-2589-4e4f-8888-20bf516b3869',
                        tenantId: 'b7ef8f9a-5525-4206-88db-da0a0d5c25a5',
                        tenantCode: 'wq6yptovmehcmpvkmp5pfaprk0l8h6hrzcj7f1ttg4zljg5yiq',
                        systemId: 'd1044a1b-7fdc-47ea-9065-8f232f9f8240',
                        systemName: 'rwj57rkyubcpthunlf2r',
                        executionId: '55bb5b6d-7c55-41b5-9f8d-0a4b84685596',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-27 15:58:49',
                        executionMonitoringStartAt: '2020-07-27 02:15:15',
                        executionMonitoringEndAt: '2020-07-27 10:12:14',
                        status: 'COMPLETED',
                        name: 'g4nsoxjmedt4a4ekzdgdn6vgx8dryp1q2lh4vgwiqllvrq7nne2ztpkupg44thl1utak2lgr8z6xib3d4aun2m8tewm9x94ysg56gubsbwwxj00y7emr70e5lqtvxd511gj2btqkbqa4x5j7lvwq5vb03vai7s9enl2ywy8tnmgye2p87az9yk36yjvjgbofas64dvi2znbiw9okr319xkr1jglkbkfainftg8gs4ja0ohzqzcf0l47tjm1xcmj',
                        returnCode: 4734826127,
                        node: 'mi76isfgkkwxjhywmvisej47v7usqf53s7ofumjm79knd43yj3l6dd8qmjwr90wydal55x9i1pqrj0e96fw3c5tvcxg6uh8bb6chy7f6tia47zwz0v6j1x32toz7jpe76vh4g0k1d21c8wm2s9d4bz6udaq16aio',
                        user: 'ljxgorv843vc2k9m3zrippddc2p31w9hp7v2qvdefnxygctsmfkeybfhqjexbr86iuczbvr77kwlikn1vrf2cafs326oj0rx2i3r40gc8o3ay85zi38xt6jrypzgc6738lsczc6is8tkuit7ocjrpxih8olmb5iltnzk7jbfacfaargw4fz0bwutnigazyoxn8k04pljumut9skzimrli0ovma8uzone9g2wl3x10290ogy76b0kv7528nuws0v',
                        startAt: '2020-07-27 05:18:08',
                        endAt: '2020-07-27 11:37:39',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateJobDetail).toHaveProperty('id', '6feb0ad9-2589-4e4f-8888-20bf516b3869');
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
                            value   : '4d3aa02f-09dc-445e-914b-8f762921b63e'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobDetail.id).toStrictEqual('4d3aa02f-09dc-445e-914b-8f762921b63e');
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
                    id: '4d3aa02f-09dc-445e-914b-8f762921b63e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobDetailById.id).toStrictEqual('4d3aa02f-09dc-445e-914b-8f762921b63e');
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
                        
                        id: 'a44b2630-2dcc-44f8-a014-a3a1fc325724',
                        tenantId: 'f7acd9d0-9e69-4e20-a1a2-1863543096a0',
                        tenantCode: 'dy7otgj0g1pr0bz789yffvha5g70mqxblvpz6bfx9w8ib9m5ej',
                        systemId: '4d3abb02-83e3-4daf-b067-1680fa2eb32e',
                        systemName: 'qmz14fziq4aqepexfkz5',
                        executionId: '43d88af0-b813-4d21-9a47-270f30efc68d',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-27 02:57:33',
                        executionMonitoringStartAt: '2020-07-27 11:51:43',
                        executionMonitoringEndAt: '2020-07-27 03:50:02',
                        status: 'ERROR',
                        name: 'xjr1dnihaex507q0gckasq6h54zkvnetszdzvwoqd9zfg3ugk7lmtke58zgg9yu8yxhyukt31i52dfwn3uspza907jhufv0eid2ny5zsb9tv6kjwcpsx3wxpx28pmii7a9qja2s0rjbfak7qt7h1ozp267klq361jzpm3w6nb0jpexhf7e0mvlao1tpn7q7ijbj02rrh97h9d55i93wbez6m0gsqfy5mbu91107gx3kc28wlet6q55hyf22utdm',
                        returnCode: 9905303261,
                        node: 'ebkn442yhjotzh272r2mg5rwip4d7q36qoneon4ir3k8w65y5s1pz5ac91kwruegougxnccynccpdr9ddt7q5891xgdd7g5zrgpt14sogfgvta3oo0iwbis3uufzl97lr0xjvzc1mqk7hdn0i4bt5b6vk2eed22h',
                        user: 'cfrmo4g97b7knt60ol2n8zy51fb4nxvsepd5xnodgog7lytzpfbblcd8b4yu1z8ij8we9st5oy3fy5sc8fsvn3oi01lc5k73mc8bosp3fnf9lb0ndxlcgghkgsiu0y2jmrj733wld0jcdi3yymnyyws4dm3dv126s6vk8sj7gghlckcs0y6g224eq0w762lkc1yws5lb0pz4ctlh3vo1jmmiaxsn08bl27eg1bucwg88aw3l18k3465anfgik0i',
                        startAt: '2020-07-27 17:39:53',
                        endAt: '2020-07-27 06:56:37',
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
                        
                        id: '4d3aa02f-09dc-445e-914b-8f762921b63e',
                        tenantId: 'b7ef8f9a-5525-4206-88db-da0a0d5c25a5',
                        tenantCode: 'm4umhmcn1mcoqvuuoasqsnqfkpmsncek0bzsovga3mkuuszjex',
                        systemId: 'd1044a1b-7fdc-47ea-9065-8f232f9f8240',
                        systemName: 'fat3k04autb6ilf2zgv2',
                        executionId: '55bb5b6d-7c55-41b5-9f8d-0a4b84685596',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-27 11:00:28',
                        executionMonitoringStartAt: '2020-07-27 07:18:20',
                        executionMonitoringEndAt: '2020-07-27 11:28:38',
                        status: 'CANCELLED',
                        name: '41besjp3a41pjuxqb23kgvxafjas988izn99flgklrgje3g42lg6vcuqu81argib2jnlntu31bznkrr5ad05p4vojh94021b4vofwxya7jl5v0nbk0owuktdbxojwikrp8srsoq6obr7xlbupg36w5x9zy9isuiw9adk6yjvcnio0fkbu4aawst4ffnumkoq24x58ww1m1mg0nkecw1hpd8jnipe5z8xtcm9gh031ohrgg2e2ku2grik3l221oa',
                        returnCode: 4902655815,
                        node: 'zodcsvzm20zfkiukja0kxfu3cs5dsx0fpaedxoe4fsduut86rz37uf095p76m5mlx5pvz2chtvx3wwxda6qzbjpqmthxg5ky8yk76zz7a4byayg3i3mxvnbeazxp10qzlue8213dgj7aoo4h3hn1sdmyxad0cfxv',
                        user: 'q18xsun3cegzj6235fkae3h3qcmcrzv2mvru7heodj1gia5zgy6nhdbgcspvjp6zo8j7ad04b9o1tpvrea82rm3fmdpa4ipljr60k87ws5f80bw80ekds7e1ldz0guyezhubm238sbkux4jbefxsk3bgm2ga88mbhatyt6csjri89srmh84ziwzfy9rfws3ei9cl08a45537pi6dtbdxha6av9hxm76rx31snqskpqbx0b7enpme66iw3xxj9rg',
                        startAt: '2020-07-27 05:59:37',
                        endAt: '2020-07-27 12:28:25',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateJobDetail.id).toStrictEqual('4d3aa02f-09dc-445e-914b-8f762921b63e');
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
                    id: '4d3aa02f-09dc-445e-914b-8f762921b63e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteJobDetailById.id).toStrictEqual('4d3aa02f-09dc-445e-914b-8f762921b63e');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});