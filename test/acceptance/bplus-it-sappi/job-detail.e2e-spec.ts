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
                tenantId: '4e5f90cd-2299-4fab-80cc-1bcae2e6cf0d',
                tenantCode: '1opczf67o9ancm8zju8v98yxen3ep2ru44w4wnqnlteopjryjh',
                systemId: '2abbc253-ec0e-4cbd-9eae-6619845cd0c1',
                systemName: '5zhu19kr4j6wlw6n31cc',
                executionId: '78ccbd24-77fa-4dd7-8db7-f475e5c41e22',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 18:26:32',
                executionMonitoringStartAt: '2020-07-22 21:20:46',
                executionMonitoringEndAt: '2020-07-23 14:13:47',
                status: 'CANCELLED',
                name: 'cldxnlvxiubxca5bdaw69leoj03s3o3mh6yt97s7w0j8i5ap0ofjhw8rbl25wvvnyhugt19692i8akeiryscjuok5lr601dwhsg5vp3osy4wpl8avf53id289awxvs61xgkm385z2yhri9vh7c2boxh3t4wd2ajfh2qsvm60oq6uoezdizn2sbxr6hg9baatbu31byak9dk413hld1iqreoe640x8slqgvmdiqkh6dnb8osnyunla20jsnmml8r',
                returnCode: 3139550941,
                node: 'zvfaa27vd92k36oz93bs7xul3dsoyhkx6lp15w2lpxmriv7dw9rla22y63uxlcoiu5cmo6deq2lertccit405zcfaim3zg77ru8ddiernyi0wsm0gr1f3brtt0wbfv8w6ghi97i9m4fd908sscqjb4fo16ahiy3d',
                user: 'fqhthebbly1bay6j8cvvs31e0t9gxis8umffsrrmf2hjjda1wjeeevilrjwov2jc6plxh7bubp9z2098q0e2t23wl0295264792w5m8c7wg6c9f94iithy7qhxx3a573gwvgw5pm7q8mqbm4mj4ukx32hsufwh6fy6ylm0k1w1rhjdcwfbupv9ac8149g1nzebj9j2s22zvvjwxcstfngo9jb4u1xsgztijuen9uzn9hbtv3x8z13ya0yw8d0j6',
                startAt: '2020-07-23 01:51:59',
                endAt: '2020-07-22 20:06:09',
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
                
                tenantId: '4e5f90cd-2299-4fab-80cc-1bcae2e6cf0d',
                tenantCode: '2q7wqmrqq6bglmshf34zahoginh0y7zlanrbmo5regd90rg677',
                systemId: '2abbc253-ec0e-4cbd-9eae-6619845cd0c1',
                systemName: 'bck36mawmpy395v80z5t',
                executionId: '78ccbd24-77fa-4dd7-8db7-f475e5c41e22',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-22 19:56:06',
                executionMonitoringStartAt: '2020-07-23 13:28:11',
                executionMonitoringEndAt: '2020-07-23 12:02:44',
                status: 'CANCELLED',
                name: 'luh2ginoerlbm04k0wc55ra77gmtygs80t9btezsp9ea2aj8wcb4nu0jhrnzkqwyxdplndhklzx2nkxfsyti5b5xt4zw5009ngwv2zfjnbhv5261d0f90swbre8i7x68ft73kyk97v7z9x80eav2k9ejc6vuecfh2c1slfgzfp7tm2olfziu169zgwe7n1a42jy14f66t6cxqdmh0j2dl7vy6pypqi243c3vtsgr1hqfi1q8epifwgcmpwg1ym6',
                returnCode: 7592740926,
                node: 'lz09r3wowigzvevv5y0cbvsrixlazn5yhrmvjzdm2pg3a3kdsrbef4gjbpdislx5dpxeqkykwvyqlilalhrr2elzo189xri7ndhbliv9gjin8fnotv58m3awa0jwxo9g198qtnuya0i6odauhq0qccn5zrsgu4fj',
                user: 'mqswbubhyhzz1uo7d49kpcflzxiq2znd8sszek5v0s2i16g78bqikro8kgn731dzh53xamvdbhsftr85tn4q6551sypyla6dq86psdq4d8i9dtfv7sjhik5tjsvz3lzui8dotgewu2wyulojczsvo9df9mrlx9vsv3w4r2b5n7pe89a7dmgfxeigxyora8os8s89bz5iz0i5kbs3z5jvcami3dh6wkytxsiv4hv7ot9f0t011z4ilzfq777h4je',
                startAt: '2020-07-22 23:29:58',
                endAt: '2020-07-23 08:47:41',
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
                id: '8d138995-0002-4206-98fb-3578d373a05d',
                tenantId: null,
                tenantCode: 'q5p303nw4kub5nf9pt2b2f7pzqyz1n4d136p4gsfmw9t5owbt9',
                systemId: '2abbc253-ec0e-4cbd-9eae-6619845cd0c1',
                systemName: 'vsbq3810clgpkx3x8ais',
                executionId: '78ccbd24-77fa-4dd7-8db7-f475e5c41e22',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 05:20:11',
                executionMonitoringStartAt: '2020-07-23 08:05:38',
                executionMonitoringEndAt: '2020-07-23 03:47:34',
                status: 'ERROR',
                name: 'm9tmyqacdly4i6j8a0iuavcgljxmbly6tuth26ms3et054vbhw2yeoiht46zzje44ibwbp9ndbswz98rhk01bgfjnijvl9p8r5x8z70g0zybi6eek7f8h9ofr34pcheehdbs5khnonr5mbfvxa8zv48ag8n8shi9wb53m73otj65zl522xg1ve74m6zibyfb5iysra33la0g56amoa8evad7gpbc51h6rvg8dftepy8nz3trvm1s1tdgbd2v9ik',
                returnCode: 7303883345,
                node: 'y4g57m0c9e30sgqrm3gmzeg7mjkh71d53bwecl7vhe0siniu18jdb4ymtxha8vtmt95rp033gcezx2uckkwddr8fp78ined6izxns3mv1fnpak367jnap3mfiey3nbzsmbf4zqtb0r8pktcwfsnd938osuu2qyxq',
                user: 'wdvnpqtmd2vu3fxah9xufd3t5ittx1pq974mjz0lt8kwagml8v6uhyykb3s2lyzcf0rhtocpisa8aly9p3c0m5tj69fni0p2w0igk5u5jb92d5dsr0pjaat7kytdgsw1k8kmwzuxvtjqdrjch6kwlu81z3qcd77d3fvduuizbixrp3458buumc36mc7wpz4pbev2hji3p8mw10s54y3f0rk9wlc50db3yeru4e3u6ekhz40990qkzua2tigruog',
                startAt: '2020-07-23 18:08:42',
                endAt: '2020-07-23 14:56:58',
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
                id: '8d138995-0002-4206-98fb-3578d373a05d',
                
                tenantCode: '97whv2bzn2eehb36dvomwebtwqxcgy6vl9fcejxubak8kpho8r',
                systemId: '2abbc253-ec0e-4cbd-9eae-6619845cd0c1',
                systemName: 'a0lswfc2e1jc04vghai0',
                executionId: '78ccbd24-77fa-4dd7-8db7-f475e5c41e22',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-22 23:55:45',
                executionMonitoringStartAt: '2020-07-23 00:53:32',
                executionMonitoringEndAt: '2020-07-23 16:34:17',
                status: 'CANCELLED',
                name: 'af1oaqzgh1vcmyp06lcsjs91jwev8zeu158qr69xylo11tqmyu6pt62edkdeytj5f1bpthszq51i0gyd95x13plrdoq63q7le4pvy1tmf99d1hpp5iu2g62cq79d8e31p1djykigmdh67fi7vcfm3fx84od0t2qe1q5xrxkbwwfm9d9tw7zwheej12uako2fmmok11g3ybrl4t8lqg1u2onwcpiiyfdioys9fko5gmsdum6kf733gnzzlqvv0pc',
                returnCode: 2089554059,
                node: 'dq8oacqhx82e0b89hwmpnq9erk0y9v44izd4s3brc3795o9k8xatuprcrqzs953u3je87kl2eoswakyscabxjfp5658nxwn7r9oplkpw7y8lk4zz7jelvjck3t2ewvaybsy6l53h5a32k4kgsxddlvcdwgnjsigz',
                user: '7gsfl9wn420w3s1pabbd524kcbc4lr6i1op4u45l6c35se37o6eccvx0z6c2w9iycik3wbcw6wpxm2anyhstgxi2yrawx8nwbua6g3ml9n3wtpy8bh4mhgerz8vo0hicrpeedivjxocfq89b4gbbei6slhe0u8pa100edoekplfpb7oq55ad1gefdgfelqzc8pumc77hii3yogy9xeih2kodbgou9vcz50cykzbqlnu0l26x1zvmzuzmay58x8m',
                startAt: '2020-07-23 15:07:08',
                endAt: '2020-07-22 23:09:43',
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
                id: '8d138995-0002-4206-98fb-3578d373a05d',
                tenantId: '4e5f90cd-2299-4fab-80cc-1bcae2e6cf0d',
                tenantCode: null,
                systemId: '2abbc253-ec0e-4cbd-9eae-6619845cd0c1',
                systemName: 'v8cdlar8111fw1sv9ipb',
                executionId: '78ccbd24-77fa-4dd7-8db7-f475e5c41e22',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 06:38:13',
                executionMonitoringStartAt: '2020-07-23 01:52:20',
                executionMonitoringEndAt: '2020-07-23 02:49:13',
                status: 'ERROR',
                name: 'pzxhi5pjyx6ec043iq9ssur52xfil5kbu7sqfmtsykx2hdj3obe332nxp63zga6jh6y9tfmjwwxjus6q3zogmk9gd5aa1c9eovxonr5gs6cih0xwn5n2rkq7rdof5hfhja5g9lxvzo1q5zkfh6bb4ubzptcf8dvdi8342im2yqm9zpmt301yvv28w30cdia16fnauhpyess7m7izpxh668pe2qs2c7p5819dr5omz0vdxvfww8sbydjt11fd37b',
                returnCode: 6195956475,
                node: '9fl8bv4ozw976sj6wdrb8wu77tc7hupiga2dver4mfj7kc1qm6bex060371d2oezq7tjufckfp6jcoqtd5nww607h4j2wm3pwu724lia9rvg8frc5cmle0kip8amd7rvkt2zidr8ximqi2i2il01nbjnhlz59s3w',
                user: 'scu28nfk1mwsymlmfwqmgnqay8bxv48ujjjmp06yju1b06iwk5ioek17cewr9nwkqkp1h41imyvda20dul1jjc5xrft67ked1vqcv8x74gb9k9nkx6jn9aow3vi9fb4rb6oby9ehmkjivdz7ec1avrlojxm14mmz65mqvjduo57tl8l0d3wori04njjjsr2znlc5p9m03xrlbjvxpl41rc4bw9itsbu3jl6jshmtmd1efx8ipg9lmzlff97rhi7',
                startAt: '2020-07-22 22:43:30',
                endAt: '2020-07-23 12:26:51',
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
                id: '8d138995-0002-4206-98fb-3578d373a05d',
                tenantId: '4e5f90cd-2299-4fab-80cc-1bcae2e6cf0d',
                
                systemId: '2abbc253-ec0e-4cbd-9eae-6619845cd0c1',
                systemName: 'b4cq3exlfaapsfok7dvz',
                executionId: '78ccbd24-77fa-4dd7-8db7-f475e5c41e22',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 17:54:45',
                executionMonitoringStartAt: '2020-07-23 09:41:42',
                executionMonitoringEndAt: '2020-07-23 17:12:30',
                status: 'COMPLETED',
                name: 'kux6iwzkadupdn9u3nm8xa2it6zrmftexxoiowv71nvg84hvc0gzswb1c5jpv0n8v861sev24wzqzudkopdvooyks1c9tdhje9u9roinss977eoj8xxuxe9ftkmn0eou9za5prpy41hd72oj4hafxjtudqqalownqln7u684ycyff6o2cnbsawcqfgozw4yvjsjxft9apcsmq19ylkf83o19rjmqvenh3n4d5o3ipx6yrkxno685d8a8bqp9lki',
                returnCode: 7451242694,
                node: 'xh23b7m8rm9koxqcygg1ygcr3qpl3fsec8x8llnuy1pe1t8aa9ijffqoxl92jfp6myer9g4kic6vbej21zwt02d5abyauypdpk7graz388p0nelwzq74sgltyr34h21x7efsqg25bjqcam2bmad3zlrfls91abqj',
                user: 'm5z0fxq0nj9cpp784li5bhkbud0l5a5x1imoivj02ymzmi01jxkuhv8apy48f93qrch3xx3lm6xd7fuvupalfciu0p12nqi0qfkujnmtkj82jcyow2eyacagkg6snokqc8j0em79t8sd3uy1wecu2ic9g1bblennx0ccejuy0zy9qu92zuit0xjxgqyjtjcuerefr1c2ku7udlijax9egpmrba8m68ssf9x9xhhpyunt41akreic1dysj8otbhm',
                startAt: '2020-07-22 18:54:35',
                endAt: '2020-07-23 10:47:12',
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
                id: '8d138995-0002-4206-98fb-3578d373a05d',
                tenantId: '4e5f90cd-2299-4fab-80cc-1bcae2e6cf0d',
                tenantCode: 'o612es7edovmhxr999ig776bixucw4jnh6awp7j12y8hnxn89z',
                systemId: null,
                systemName: 'rk159qvm4pkyu4uww6or',
                executionId: '78ccbd24-77fa-4dd7-8db7-f475e5c41e22',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 05:13:17',
                executionMonitoringStartAt: '2020-07-23 17:12:33',
                executionMonitoringEndAt: '2020-07-22 22:30:13',
                status: 'COMPLETED',
                name: 'w89dssmnshtb17kngb0tfxicvne2j90oukl8762c23pkmtkmlemik7dobdqpzhuxurnafiwbm9lltevdk0bmj9vyhxwzw6nanvmzzp8cjzwayle3ixjyu3pomjk0xdghhp1nf3g8jpyij5w3tm3rtzjuk7av3l3m0jizqz1z6kl1jub3bx765q1cmb5sxb3gzkxe9gxkv3wtwtn8geibmzlg2tcdjs83ym5750f7bejubmmsxazi6sxpsmfspvy',
                returnCode: 9782631921,
                node: '8gjli1cnkuklavq3wzglz8gxpnrxu7of6ilodhlvlaa48pzp30nrgru1u4drbktqkg4jurp7mesulixq4db6lqyl9ow98apqz6jmxiwrf707eq56q4lg7ma3pudryx6er4wvt14gqpqvzfs8fc8yg3zlsjqzjjx9',
                user: 'wiq1rtlyuxut8qbu7lcaju2flh8lc3uo4x2tavb72hfdg5oxehxk2dkp3v605icgt2vroh2olpazj9gqn571ku7ane8vamcsp01m9vvhebv1lcgrvef88lgstu5jz9579rhy5b6mmshylb1ciblc6xywj69u43y46zkk8smo8gf1eof18rlfz0f4vikqfphoxdur4uf72htl65vh11w22ckvn668xcj0fbok7a5bb5tz03p6u3yk9h8ftd5atkj',
                startAt: '2020-07-23 01:16:58',
                endAt: '2020-07-23 10:27:00',
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
                id: '8d138995-0002-4206-98fb-3578d373a05d',
                tenantId: '4e5f90cd-2299-4fab-80cc-1bcae2e6cf0d',
                tenantCode: 'njttg1yabpfg20jh99zmme8tsfwefbvmywh38rwhilrhjct4a6',
                
                systemName: 'agu7ve92rowihtk437fl',
                executionId: '78ccbd24-77fa-4dd7-8db7-f475e5c41e22',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-22 23:32:07',
                executionMonitoringStartAt: '2020-07-23 01:05:07',
                executionMonitoringEndAt: '2020-07-23 14:41:46',
                status: 'CANCELLED',
                name: 'dy2i97e1kw6oltvhmxjbf0cbenivbgvvjg2rj79o0zc2o1k2d8gv1ai425hi8elr0z3zjtc5rknnvyqnk1uv5v67m15qv7adm9orrer343szkfkqsesakiocfell5fgq63laz2777yzjbgyakbek6a3rmxc0v9xjs5dhphmct1cwbco2t23wwl4s99zs0updngrx2w6wv18cahugvrh6m7eba2hef5e9dhmapwtl0x48khj81em0r33wqimxu0c',
                returnCode: 8093418542,
                node: 'aef0v3hvqqs6f5g6gsv3uc2wws8tg3qyyvl4rqhl5p30nkalfjd2hb6evvurup1r9yqpbxus3y0ms2lfkcjz6w77mc3z6m3m7fzedt7517xoami0jeky7yxp6qg8eyoxpx0jre5cmij80vg7bw3t1tb2x2t66h03',
                user: 'bgzc7th0qy8os74tpz5ogsplxyvhj2kc26ivdytc8ybnpz6qstvb5no4j6cl0hd1m5fz4f2xwzh86zdcdwco70l6fuj4syn8wwcw2ccv91bsrbf7tlrdns29d43f5kafpdi0zxb3gx0nfaa18r9965ch69xdihy25bwf7kw678d3e9kmsfdp32qx9hyb4tmrj8a73g6j6gwtq5pzjtn4webfffj8wv3wscaeo9da9kj55x2eieamamqubieci1q',
                startAt: '2020-07-23 17:21:02',
                endAt: '2020-07-23 08:22:56',
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
                id: '8d138995-0002-4206-98fb-3578d373a05d',
                tenantId: '4e5f90cd-2299-4fab-80cc-1bcae2e6cf0d',
                tenantCode: 'be2i51hn4r8a82ks7tr2d9j5bhkue745n3xx82p56nsqndxfj2',
                systemId: '2abbc253-ec0e-4cbd-9eae-6619845cd0c1',
                systemName: null,
                executionId: '78ccbd24-77fa-4dd7-8db7-f475e5c41e22',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 15:15:28',
                executionMonitoringStartAt: '2020-07-23 00:50:45',
                executionMonitoringEndAt: '2020-07-23 07:42:40',
                status: 'ERROR',
                name: '383a02i07dsn7vp206ia9kk3vt9yatmi2kwy7tb36xml4g4vwiusc9o194b8a15qzavtgjtymwdqlzjk0farggih0otbu4kpolhnf5t62uajkm441zgdd8pbnsr6c0z24x47w88exoa9yc6eggtjqrrm8u1gsfdtkq2l6mx6ueit588dt7r3hzfzq0baj88z7rton4hczvspu5z4ilrf7ianq1w3pl6pkjv5oto4gtv1l1ym1zpjbinp05fx6sn',
                returnCode: 1860864723,
                node: '78gdrhygvscl6rjelqf79ooppiwua4tinafixqo2rzpmftfamxmxd35074h8j8py7735zf5a5f71z42pz8hjn7yixoyhjfsbs8ximkaeorpbco4vu44fi4xrf0iooty7o3y35ykpcgnz9ce8n8dbivspzdybm0qi',
                user: 'm35jp11gv3y0v947t3ua1xfs0tymzdz190is2i8quqqklxlapoxwnwgxwkj4ozj4l27qqkgqtjet4xv61wzduksseeszngac1x22v1jo2hnnyygb0gnl6ob5mbw05jxlcxere0627hmc4rvbvqioxq541m42pl6v6kw0il18fj2uxxpzcuqfjjddtf2c28srvi4ht7iqyhil3zpzcl57hbseu0te3vh7sqn8te4r2mzw3gvpmahpimyswqfnxzf',
                startAt: '2020-07-22 20:49:32',
                endAt: '2020-07-22 19:17:21',
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
                id: '8d138995-0002-4206-98fb-3578d373a05d',
                tenantId: '4e5f90cd-2299-4fab-80cc-1bcae2e6cf0d',
                tenantCode: 'uzm920zsbqe4hbvh2jot9ra2zh4bgfouyu9zidyexjtpqxpks2',
                systemId: '2abbc253-ec0e-4cbd-9eae-6619845cd0c1',
                
                executionId: '78ccbd24-77fa-4dd7-8db7-f475e5c41e22',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 06:27:07',
                executionMonitoringStartAt: '2020-07-23 02:45:42',
                executionMonitoringEndAt: '2020-07-23 03:17:35',
                status: 'COMPLETED',
                name: 'd7zn10l81fiey11xociuzx7i9upi4gvypxh5dmc7jjj5z9g58dnzcqxsmvolgtvruhjaxqefkd3ieqhul4jqa7ifmin00xzzhx50ba0zz70sjldsnspvpmxcdldwktj36jenk5j2vtcdk3z137ejl53k0d7tkaw4r3sufzsqrpqwyla1zcnywxgj63b8ehwzu73ickhmwwtu4h02vyj5l58f0xmoe3oroppxzmdxetplzda1zjfoyh5jr8x39bg',
                returnCode: 4558733389,
                node: 'manlfp8z96kg04ojr7myu0khigqhrk77wmnitbtxxscajatt3vflok9uuiqxs2jno2i5h27khy7q0y7q3qn724xs411lf7coo8rv2ijbx5kajqcf5yfuwb5mvkdbdoz8dwg0hlr513sasbvyxfmfbnogeohrzpf7',
                user: 'ym4n0f2z37ptwuzusapkj3mq0u894awhxt5aa0lqrs6sint6a1io3sbl8zy3r58x9pxxvfppigvpqh3kxm8y1c78jsdq4h1uvyrqvdt2x9dfjwxi9xdp8d4zq2awxedlsew4ik15akdk9nejr1wue9uas1x6v7bgrnl4l92my2lo0ivb64xhilg6hg3cfylhswvssuwa5rhj2blt3a10ami8e39l0df0mfyi5mcfk1fyv7m8ycbrkkwxk81tc0n',
                startAt: '2020-07-22 18:45:38',
                endAt: '2020-07-23 10:39:10',
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
                id: '8d138995-0002-4206-98fb-3578d373a05d',
                tenantId: '4e5f90cd-2299-4fab-80cc-1bcae2e6cf0d',
                tenantCode: 'wtrfvjwe00x5pc33ydtqao5tkka94h74yvkljs5o68ujdrluf3',
                systemId: '2abbc253-ec0e-4cbd-9eae-6619845cd0c1',
                systemName: '1yob40gu0v2l9bbvg7q4',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 00:49:40',
                executionMonitoringStartAt: '2020-07-23 04:11:19',
                executionMonitoringEndAt: '2020-07-23 17:53:25',
                status: 'COMPLETED',
                name: '699v1jbg5yzsaptp35syl8jkm6qbg6fd4eamja1xo0gun20agd6scgnuaurzp2a68iqgct50hthvqg6r1t1v9hzfgo2gzdrzkgaaqnavxqwqmuxp1f61huc42l0k036z0jetho4aj4sgx323flqaitttd832sb96o35u7gsbhn255mxna5dmnx6jxyiqjdybrhv5b4n55wz84u0nr4ejtigwxt8v23lfv1odkjffa7clzcoh1o147gmxgboyo1q',
                returnCode: 2023700991,
                node: 'w3qayvz6s01vimnlr0cvs2ybodugtoc432pgc3tmvc1aamsjal25h2ckapae2kpbs63dr0udjhav84iy133g0wyaf0cpjwg0uv8xg615p58uohxlpi2258xhqnpc61t2ch5cb0l75hqdwirw9gf0yz7p6d4nkksi',
                user: 'xcw3bibug6shc76in8423ovp36fo2jseh9d6ajbikfnllsfoctbov91ikbvcaygvh4nyg5v6yfnixuex7y0tx1fo39389tnj8gq72ettflbe7z5cdba2xtu9nlnx1j7magd3na49rm7fqfjhj62phdcg03vvurirb11xhr58koz0p5l79fyy4iqbo16jiidtjobjl733n5rcv6bxb03linz0a3u2hpxx7ec6ehei32xahare7bej7pgyeq7v188',
                startAt: '2020-07-23 11:35:42',
                endAt: '2020-07-23 09:17:29',
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
                id: '8d138995-0002-4206-98fb-3578d373a05d',
                tenantId: '4e5f90cd-2299-4fab-80cc-1bcae2e6cf0d',
                tenantCode: '3a1lxf867v7c0zqokmgcshaabhqbama8cahpaezdj4tbi0cm0k',
                systemId: '2abbc253-ec0e-4cbd-9eae-6619845cd0c1',
                systemName: 'ufdl054aif9fqn20l19v',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 01:07:54',
                executionMonitoringStartAt: '2020-07-23 05:24:43',
                executionMonitoringEndAt: '2020-07-23 17:09:29',
                status: 'ERROR',
                name: '39i9rt4izqdaeib81g0jajk95qkhkbxunp1anxjax4s8rq3qrfn51a3qxwroimya5h8h12txc170stvlmng5pvemcc6j8gptkew1wdo8tw5kww7ukzm26gfubi8i0wdepayjpirkgkpms1je5jkk5weygn44tnf3k1fszoei7v7autm14syknlb5cvwchsz4oc5zfy2pjump8dku26yknd0dtmgbyv3j8f3i69vkx4qzyjzkqqwe2k2y3ogo1f1',
                returnCode: 6034864629,
                node: 'zwhvwgzv4mgktgk2v7pf539mo0f91823lftz1i4ij0itkxqaqdmjultkfzelj2a8kilg532w6jpfm2pxunfz5pfa2n6zljh4t9dmvmbeh7aeffx64ck0x4p2elra4b2ru46711fs8w37of3hfq07wnp2fwqrvjap',
                user: '44mrc5s41uc0skk51miyc28ur85etyiu2gwxhrplnydwi4sr88eaoptxnmdpdbgtxzwwqldfu3zff2h4mlrnyrtee7mg9dcitlzxp5o8xezm0mjz26uq75cy0xtzdupwt9m8hnad9idzx55aimnckyqvtfrc0thliyofknlcm2q97hn7516muzotlomk9boh63su42lwoftr9b8n9g40itmbklqjxjyxczh8odrpfh8srrezf9manhun6qtu0q1',
                startAt: '2020-07-23 10:29:50',
                endAt: '2020-07-22 21:40:06',
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
                id: '8d138995-0002-4206-98fb-3578d373a05d',
                tenantId: '4e5f90cd-2299-4fab-80cc-1bcae2e6cf0d',
                tenantCode: 'kid2w8c0nk3w6zmovt2j19tr628mvoeufhpurqyaoaiw6hs2cu',
                systemId: '2abbc253-ec0e-4cbd-9eae-6619845cd0c1',
                systemName: 'gjzu6pqkscjyz6jg75li',
                executionId: '78ccbd24-77fa-4dd7-8db7-f475e5c41e22',
                executionType: null,
                executionExecutedAt: '2020-07-23 01:53:05',
                executionMonitoringStartAt: '2020-07-23 02:01:38',
                executionMonitoringEndAt: '2020-07-22 22:09:02',
                status: 'CANCELLED',
                name: 'gze418d79riidc1s0n71i6trs46u5pe9wjkl0m7ncoaags3ebsil6qqa4xx18ne5xprxjuks1clr6rx7iww6xiciiuydhaiokyrjwqk9lv4b49hj3ea3jiputugdfgkefs5vnpru6pykvu6ayi5ip9ew0n27yj9d8m2elb548kt5i3owmetia74u8okapb4ikwe7atvpb68q4ezut8ggj5iswhnfcxhituyrrqrr7lf5us94r0s8q1j78hco02v',
                returnCode: 3927473174,
                node: 'zfwkkh0hod4z6sbrofick5j3xcg42h1pbc03aj98zcabnzcuy43wdzydhuir1sdcurtng3qfikx4mjdv65v0xfwvxo2aqqerd47kqjtfh27ibz5flxi1gi3tslycgut8q7sas4v1yacmeqsls6zh205opv28sgt0',
                user: '3f6bey2zswupqouofomncfarsxxyhedz6n2mxrr2wciar5wxf3zshtl9ngk7odsxik8sfrep7gzobybktmbf0d7rniaoewekj7bya8rly1uzqg7n09xkvjst45qapn76uz3dhjl1vlk81pei1h5g5e95xrhe5u7e2t07gdoo8lgwm953gatnfhy93jdajot0rk8qfzdm8aj4r78n3tuenq0hcals6xygvix2ap1m0sn1u6hlev91ao838wfwkdl',
                startAt: '2020-07-22 22:23:07',
                endAt: '2020-07-23 03:08:49',
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
                id: '8d138995-0002-4206-98fb-3578d373a05d',
                tenantId: '4e5f90cd-2299-4fab-80cc-1bcae2e6cf0d',
                tenantCode: 'ze1x1oqnw3jdohss3ehmbu87l2x6g6ypaz3455u8g1121wjf9e',
                systemId: '2abbc253-ec0e-4cbd-9eae-6619845cd0c1',
                systemName: 'uqe1ld9nd1kc7s7evgsn',
                executionId: '78ccbd24-77fa-4dd7-8db7-f475e5c41e22',
                
                executionExecutedAt: '2020-07-23 10:40:38',
                executionMonitoringStartAt: '2020-07-23 13:37:47',
                executionMonitoringEndAt: '2020-07-23 02:49:46',
                status: 'CANCELLED',
                name: 'mb0tyvkosud6428lht8wx02w4kj6ti4leafd2zj4xfynjbgrfqh3rvw72gxtvpfb7nhel4zvwvcz9z8id7bro8kl6pe1i2tdpuh5pblvfokqlvklsppj1ncw516cmkc8rlvj3ee8vg5aaongulwed5bzsrdl6labp26d1cqjjdvnaqi3sipbiq67q9igpkvafkcsu7djaxqr4v9cefrsdjz0pgvw0ygj8ujh0j7f6bsqd7p1g08kcxfo08jmxry',
                returnCode: 2956817788,
                node: 'hse60fti4i8she4rcvdn266bald7ofdwjmg5t26wg0zr6yy4oy6d719e6lsqwr40irf6kxqjyafku2ys2vicppblxw80xn8dbwu4imkn9q25ou3h6cehbkvu2ghjrlhvdb7tfzem2yi2fsza1c9zazzkosyh0dgh',
                user: 'n3askmdbftt4gb0jqtfmxv41gqeqd03dsdf4wu5i0n187pyqdjdt7u5gl1c6w4b4qq6x6r9hk1nw0lw0rro79c0yzn52ws60v26warbj43gyov2uf0yshnik5ae2szvplpwj3hh3g7ehwd0276b6eyzxtj4n7hmse6ix2jc0bdn1zerowrhk0ltrj9vobe35179yg065fybaujd88xcc7yy0ang0x0o6jedznm4aduqw9llr88bumvnkiwux7hm',
                startAt: '2020-07-22 23:50:35',
                endAt: '2020-07-23 04:21:25',
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
                id: '8d138995-0002-4206-98fb-3578d373a05d',
                tenantId: '4e5f90cd-2299-4fab-80cc-1bcae2e6cf0d',
                tenantCode: 'udy3mcbrnmmv392eul2n0egdcxe694re9b9cob4hnwxjdkid6l',
                systemId: '2abbc253-ec0e-4cbd-9eae-6619845cd0c1',
                systemName: 'q0il02v5oj0672a3btqc',
                executionId: '78ccbd24-77fa-4dd7-8db7-f475e5c41e22',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-23 18:14:07',
                executionMonitoringEndAt: '2020-07-23 04:08:21',
                status: 'COMPLETED',
                name: 'm7qs8qiey2ano1wq1hlq5hktcu7abe3tyfzn09v5nexxwnie5ryo8sfxyiy4n3w4rzuwx3hkqarsssy5h1o5or65o1z52lz2gq0f76u7r9h7svz5bgbibk9m3t1zhbwuac22ygxiyfaf7hzgsd1ywp6g5t920ckilbro7sxldgzf65i25g43q4ieilgyeajr0tgvme5tc2tzrkz3wifbka7k4jmvdhl4iaxr5u3cmol8w5wslsg561fhuw65k5i',
                returnCode: 2889059090,
                node: '0wspgy7x7odo0xeuk5eewmp5lw1exq3j94cmrl0yz0nnc4maz4k9l3pmd4vwqm0smksxs2xiz7vj58h36w0297nvhrt1fvg2g7hcxfpk61vb0ugqgv9wyisxk36ewv40ts5tsg4dfhom9akfuh9gou9e98lodljq',
                user: 'vyhbksruwy63349k0ga4c4ao4dz4vus7qnl1qts8mlvow39x7dadb237xzdsuyrx6xxmx091ob5y4a3bncepew1vedy4p9ymn0q60mbcsq379v73h6v73uok9ov7o5v7rxb03qw498zn90csmerx6grc9k766s8aiamsn841fqq1yhqyjymczhla263ngjd3uuinn0ilqzpmqwhlkhbvqssmzsficr6v8g0xfhpymzcmrr79uramp27opmhptiq',
                startAt: '2020-07-23 08:44:54',
                endAt: '2020-07-23 03:37:26',
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
                id: '8d138995-0002-4206-98fb-3578d373a05d',
                tenantId: '4e5f90cd-2299-4fab-80cc-1bcae2e6cf0d',
                tenantCode: 'goc2xyl6ol3r25xsh97c6bnndn16tkjw8bc3cyztzgcdwp5tay',
                systemId: '2abbc253-ec0e-4cbd-9eae-6619845cd0c1',
                systemName: '4eyaressqviaf6bqfz46',
                executionId: '78ccbd24-77fa-4dd7-8db7-f475e5c41e22',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-07-23 00:04:34',
                executionMonitoringEndAt: '2020-07-22 19:36:22',
                status: 'COMPLETED',
                name: '1byvzmv94iuvrp2x51vns96e77rwtlklix5ym0xej8kheju2fktwpg8ab588a1nwfp2vw75tq033z6cu94usqj3iazu0rj2bwgw35qhjzn2sd1cp4obed2nghq7fa7shu06n4e8eetvoopnov0k6vkqxq2csvv6szw3ducpmpnz8a4l73trzywil91lt0nl2ea9184eac9z7cokcun3r3iuvuo6eubs263hwe0ffixi938dqgwxm4pyyrudtxp3',
                returnCode: 8785738622,
                node: 'wwrzaf4k9c5qasli1a5ij69af8wlpefkms6u9ci0nt3izxwurnt7ppy0t46dkv0cmlfd1f0jbe9lmt2j276qq4r5fr8hgo0f0t7hj8cts8cbprdvqjntvq39isvfoux80wkbmfm0xry5wym5at3v6c3y3caxdg7k',
                user: 'k98cpv63ap20sceo0lr9db1t1jz0pgq43sktasd55ww9e4w4rhbodrjj0e8navsu1r8n25c08kyyrpnfk2xjd997tdl1g5297c5lx0y96dyvxaa7duuomlu61omv7vzr7eg9le7bjy3a0raxxt5ml3kw75p5eupw85ap3b16g5wf7gmka5ilpwvkekw0dnwsx5z0qi606bo0m7hnrrrhbq74rzjodjzm5puxj343ai0qa54i34n0pe46k4b0u5o',
                startAt: '2020-07-23 05:28:34',
                endAt: '2020-07-22 22:02:47',
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
                id: '8d138995-0002-4206-98fb-3578d373a05d',
                tenantId: '4e5f90cd-2299-4fab-80cc-1bcae2e6cf0d',
                tenantCode: 'xy6ubxe4dzb2li70qk1oy3psq7zr0wvbs7bc8f0o9vbudj9nhf',
                systemId: '2abbc253-ec0e-4cbd-9eae-6619845cd0c1',
                systemName: '5ww5pu8vvct6xj2fpx22',
                executionId: '78ccbd24-77fa-4dd7-8db7-f475e5c41e22',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 12:26:02',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-23 06:21:38',
                status: 'ERROR',
                name: 'y9gkougij9zxpq0xlj55s84ykpi28lk3jls56tqn9oojsygsvscblz5odst48dbtdbr4ayheperxjgmcj623pwuxtnv9gqbnaj0y16tkzu00ewhb5yomzic22wc4gql14lh9vct9u3ao0p69byh46dipb8bcgt6bnboxkxbpklq3zuooum0omwb0nfegmxfd1ndyant9pq8b87nlwlqt4b3oxws2m0jaaj1kl32cnf709uq1xxko1wbg6xkpbfp',
                returnCode: 1076419135,
                node: 'dixbyqzgnd1ay656v6mnufnhx7yd37a42w09kmtj3kal1rsy0u9joq9fhxr5zip3p4rn63pv2uy0smmdga5zrp9sb1viuk43wqqv6l1oehtqpfpgjb27rqqey4rvezkv776wbp40gbhq2us7sku5gm1qi6tlli1s',
                user: 'fbcl31lat8yxzvlzw0g8afwn3zkje7ozb9dhl6ay94ztd45tir0p2k6mx7zhb254t5l11v656ogvbk3jb9sceo7sps32u07scp7pi0z7tnvr5kw5058afhf801ts3qd548mf6wfh6faj31kidfh4ba13anefeaxn459fm0ftlvt5s89cz6vjlgo7f9k4jhz0ncq8cr440nu6o88c1dysul9guf46aj95vqz3eaapxl164wm5sdor091cqwnbuxi',
                startAt: '2020-07-23 08:08:11',
                endAt: '2020-07-23 06:35:23',
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
                id: '8d138995-0002-4206-98fb-3578d373a05d',
                tenantId: '4e5f90cd-2299-4fab-80cc-1bcae2e6cf0d',
                tenantCode: 'fcfs6kydfejhg4mggmafu21zbrwc5ve7ecmiifvpe9wklz4jac',
                systemId: '2abbc253-ec0e-4cbd-9eae-6619845cd0c1',
                systemName: 'm4cys4zjf97bcv7s4wa1',
                executionId: '78ccbd24-77fa-4dd7-8db7-f475e5c41e22',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 11:14:13',
                
                executionMonitoringEndAt: '2020-07-23 04:59:27',
                status: 'COMPLETED',
                name: 'kuzucdp0rnolr6mqvs5zse24tsf86jncqjt0ckpopolmadzo8e7cu6ujpzm4j06dxnms8sg5t7vgtncapf30605ih4fmssodxhmd6otn99ymw486v6iq7i9fh3rn6qdksxghwf58s8s45nxcwje711za52i0syuo9fv63zo6y36kiuuak1ma3unaf4uy6o7cjoq38yprfuphdaqa2tjhkdmfck2q7jqa9pkmwd3fbjqan4kjoy6v7bvpr0tkll6',
                returnCode: 8945738704,
                node: 'aux3vprnte2msqi1jtxxcc7nvwji44nwflvbbbixdssnqpmj4ynanjdiattman7m6heukhyivrgfjqzkbuu912ecrk01g95l11fdmyir0p33y2odr14etnhtfi8gqu5njqz38fbye8plq5tqwh9f7028a9u6xiq3',
                user: '9fltcfbzh871in09d3ek36w6wl151ry1trkty4hifb2eru0qr8qb42ccyy7z1fm0a4aod45om2z98hgg1vrhh82v1re9tzl391htrzbu15emeeyf05qqvfzbw5rve0cya6aicp4wlh3yfkx2u76mtfqgknxgz7h5bqjwkkrxby9s4on18yqicvpdk0q7dcgnsycnb71x5rayg5pi5tdqts6yoq3t7nrazd8ogxnmz1rupavkslu86fcksacehul',
                startAt: '2020-07-23 14:57:11',
                endAt: '2020-07-22 21:44:22',
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
                id: '8d138995-0002-4206-98fb-3578d373a05d',
                tenantId: '4e5f90cd-2299-4fab-80cc-1bcae2e6cf0d',
                tenantCode: 'gc80tjczyald1tkkxmylufaxtw37szjxzrgjypojfspikn7x79',
                systemId: '2abbc253-ec0e-4cbd-9eae-6619845cd0c1',
                systemName: 'evkjv892jgruwn4fmn48',
                executionId: '78ccbd24-77fa-4dd7-8db7-f475e5c41e22',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 02:13:04',
                executionMonitoringStartAt: '2020-07-23 01:35:45',
                executionMonitoringEndAt: null,
                status: 'CANCELLED',
                name: 'ygdcaefuwrgknk5rg2sil4lblgs4rjwrh3lukzceqmizfh0aw3cmpzfvwv9quqthu0gghx3zaxetldkjmihvxyhkdykb7tueo8ler7cxhj0ryxlfmr5wm1cnxtg17er2ztaemtgjbzdup2uruwlvjqi7ljrja3c4u2dgj8dpgwc9gwuir0yoeved93ekmyc9unanpxpauxv0r2cktqxau41m20npxjauzvrfg1bju4zqanf7ypaytwqshkg1fbp',
                returnCode: 3949629658,
                node: '7vvyfx5l8ddbi8iquxhksopasxlo1qms3mmwzstg06r3d0kdsrxwj1coqrdbyek18uvlk37eqgko6uwkdeaxcexarsqr03i5xl06mz42ugpwnpt3fyosw8tpz65b0fvh2wwidtj1kt2wtrrlzhl8u328r9toyqdj',
                user: '178ivgis526qgtc054363ibj6aa0tstpaseduffcd6ouj6k08ephxwy9u1gwg74xthxk0wck71ts9hwawqy4qv1a23htunnlr8qszy0drzxiwzn1el7x2j6o3yrm383tupdznr9qg1etky2nhvjk69haia83ryt2dxcyadizt6acephaokldqr8ldg7zl1obdswx3dyshfeix61seyfr35xb3e55n673i359diaa42hj72q1yf0bvj7mrvxe8kt',
                startAt: '2020-07-23 09:38:59',
                endAt: '2020-07-23 00:38:04',
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
                id: '8d138995-0002-4206-98fb-3578d373a05d',
                tenantId: '4e5f90cd-2299-4fab-80cc-1bcae2e6cf0d',
                tenantCode: 'd1bo0f6h50ju0lewbrg18fg8p8bu0le1va65xfxq4yiwl4tg7e',
                systemId: '2abbc253-ec0e-4cbd-9eae-6619845cd0c1',
                systemName: '87lc800jk2iwggezy78s',
                executionId: '78ccbd24-77fa-4dd7-8db7-f475e5c41e22',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 16:55:32',
                executionMonitoringStartAt: '2020-07-23 13:52:38',
                
                status: 'COMPLETED',
                name: 'dsrlctpjpwaauvi7a49jh2nvyv5dsbpbl6khp3p5nq51z2kycedufpr4vdq2cf5c6etx2frctzasimq2iehiah2f5fbzxini7l3ues7b9xna2lcid3y617yo8w7x8x1q69554g9hctqglk6hunsld55gt6m48mmbe8bkwdg7zsj7c14t2e74tlt9683b236l9ey6vu57x3xak1vp9wzoiahhqdpd6x2x5wenn28kg8vp3bej9b3810j82u01ghw',
                returnCode: 6351476595,
                node: 'vfyb8hdkmtnwvxo884aq21ypxmioahxgkd7r8uulqvs5g4rgebgr2v7zx5fi9jfb5mjd9eezphd1fc5s3i33ccdj4ka3bkxfwn92z4q856wdzvwvpcs1i7tmt8g7457t361kbmkyyejh6hvmksfm3nijqz22rwjz',
                user: 'qt9vqw68a9wq6kix991crkx4hbya31ar93igj1a3877i6glp64obpqs129n8l9qwbafz2u07xuqutueze6saqqqi96t92ypxsemawezixpkpdk4p5tj27q30pc5a83caafgy00mq89yocozv9ebprv9y3aezxflv4osppyjw1fr3nzidd1xyby9lsohbqqw0eyv3h8x1vlw8ospgcvicyfnimuku9l7lqj916sgw3f15or5w4sgvhkgfgjx1bhs',
                startAt: '2020-07-23 02:03:10',
                endAt: '2020-07-23 18:06:05',
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
                id: '8d138995-0002-4206-98fb-3578d373a05d',
                tenantId: '4e5f90cd-2299-4fab-80cc-1bcae2e6cf0d',
                tenantCode: '4tvczqdcjh9b4xviwnc0ca4569ankz8guwkmfpbeaow0o26rv1',
                systemId: '2abbc253-ec0e-4cbd-9eae-6619845cd0c1',
                systemName: '69nmcspaxz6f7xto5x8g',
                executionId: '78ccbd24-77fa-4dd7-8db7-f475e5c41e22',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-22 20:55:49',
                executionMonitoringStartAt: '2020-07-23 11:12:51',
                executionMonitoringEndAt: '2020-07-22 22:11:38',
                status: null,
                name: '16zx3406b50thi5wj4fyjc7babj9q1ree9zl03tksvcaow4kgvx6yl9shm6fwld0c3tl2a341bajh5yzx9ii1rmlaecnggrdvdn5s2e287lvzl3j184wl8baayqmqziwdjtknijqic9h7nutddszcldh5v0p91sbgid2sjc0vn62jmswur1bfo75luyta8lvinjk9o25iwpk5my7oh7e73xilak7sy82sxfbhejpktel21hmc2grwneruaasc1f',
                returnCode: 3960044331,
                node: 'b1iexg59xysujqdzbhmso39ff6jx8wiufw7lhturkvw3bcthu2gc1hswnb3tdm77ra363a215rf0gk843p7qhksy37227yuoq0tj1oi0jpl1rkpfg56dy64at3izsswc3w91m1kqn6nh3ds18i8c77x4yd63gy8q',
                user: 'vpmd7e1mc1kt2feyh4yknrhlk01rhins1azajbo8atkppv4o2x84y5x216zbx8ey5fsxtb1fbb3s9n6u0us57ycavsb6gywhjzhexbuxexgssacmu4axzd44atirzc7pquhvhstpcj6dnbqk7mthisova9brss2qrr06321ma6661u5for4ofb9h5f248jem0tfad0hc8i8wu1mczot531z5158zsoklavjgvn86nkww2vp5l2hf0pivw6a74cx',
                startAt: '2020-07-22 20:33:42',
                endAt: '2020-07-23 12:59:47',
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
                id: '8d138995-0002-4206-98fb-3578d373a05d',
                tenantId: '4e5f90cd-2299-4fab-80cc-1bcae2e6cf0d',
                tenantCode: '7u6jp1qx5xod30uheirt0ezc9fb5me0cnzgarj1sqebo9m3d0k',
                systemId: '2abbc253-ec0e-4cbd-9eae-6619845cd0c1',
                systemName: 'ie7qf1lsoauiveg1aw3y',
                executionId: '78ccbd24-77fa-4dd7-8db7-f475e5c41e22',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 02:20:20',
                executionMonitoringStartAt: '2020-07-23 01:49:54',
                executionMonitoringEndAt: '2020-07-23 07:08:48',
                
                name: 'r8192bmkpmfexz7d63bh5am0mihlek4vyj7j6r9ji6q4a4e6gi4qc0pewyxmsdiezc101or27z42o44h980amtaz5ak2h6yzl4yghmizbnr23ozqynie0suagjg6c2t709pd72pfsq7lcy48i0brse95sdvwyw14q9r0ezhbiopagfo4ge5ex3fros5lkerhz706wgv4ooz51gqo74rrspwbmxnrrlxy7h84kxwwi3fpuquktpkeng77yux2hnw',
                returnCode: 3424233966,
                node: 'lrd0qlljbna7ssdk8ywfhorn4svledzjz4nzsgu98rkoct60qvrmk0jzaca0d3r9bype3l733q1unpxj4gcsaww3umktlp1lri35bct70a3v8pxqos41fbfauntkzrg6biz5490jgstzohwrmheog8fo0vsvhhj4',
                user: 'rhor9y61ygohp8yikc4onw1ii2mtifqbebge81rgb6w8u2fmsbuoi72hb82by0ims3w4p9scq3ifqfz4uwpcvedbntbd0q21qn2swiiplhepwir000050ryk9erocz9yig4s4h2qxumwdtv2zblq2g6skxdwkdj2ebq9l02pu1ulujv29hzmxv8j50ktp5g6op2iaxjgm9bksj0kpduc650hwkegk9oq4swmot3kfi0v0vikek4kvppculrczji',
                startAt: '2020-07-23 03:05:48',
                endAt: '2020-07-23 11:18:53',
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
                id: '8d138995-0002-4206-98fb-3578d373a05d',
                tenantId: '4e5f90cd-2299-4fab-80cc-1bcae2e6cf0d',
                tenantCode: 'j8367t7aftlt6gbsxvwn5wmdb9g26v66za865bv9nzixbrxth3',
                systemId: '2abbc253-ec0e-4cbd-9eae-6619845cd0c1',
                systemName: 'z7ii0v24sw3e55wrdms0',
                executionId: '78ccbd24-77fa-4dd7-8db7-f475e5c41e22',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 10:48:26',
                executionMonitoringStartAt: '2020-07-23 13:05:38',
                executionMonitoringEndAt: '2020-07-23 10:41:40',
                status: 'ERROR',
                name: '8h7z758ndstfin5l2sry3ltizjjpc1eu8m54t9r6ggnfz24t1te8aoaurm7sjay99ra97gh29g7la1lg95w9gcdjq0x5f937zxw0vjyp653xk9m4ah5ger14j4rt2gmbql17x20z9xaml5imku0ia6pw6nwz2sa29d71shvbsnmqml7hevz4nyc1uhpo3x11miih7gzn51pd98rldygbwmgopfca1ww2nxgtd8i9oqbsgmqlqpuhhe6avjgb3q2',
                returnCode: 7779932259,
                node: '46gbbx94taey7ts0zx6g6f83j9bdak4dndkda5hf0mz1epmwk7fwl1h150b6hryzehdmr134k3iho1letso7erb7qyil5jva09qtbs8hgh55vwpcszz1qox8c6kxfp8j9v0kwg2rji8fzfkrl6b0es6uonlyk3rw',
                user: 'buxut8jce42wrc3kpzzh7te7ek5z2a61qk0dmuq7stxxqe11f2jjuf3dr0luqvqx1z9tfoy52skt63le6jsxv2eyy6lgundw3e03b7ws8uaf0jqxdygskn27pv7qy20lv1tpmumnr36u0gnfhmijy055pr36g8olkmojg23xz4993gfpbeyq27bxj16vbexckzg2vgclt1gfhginu6w5tcdbhtjktbktxccqsuobop4htevjz78tuh32q5sg3uq',
                startAt: null,
                endAt: '2020-07-23 13:57:09',
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
                id: '8d138995-0002-4206-98fb-3578d373a05d',
                tenantId: '4e5f90cd-2299-4fab-80cc-1bcae2e6cf0d',
                tenantCode: 'jk40mrw0l3w0bznwyhmtelr9iitoj018qgv4nlswvef046kkue',
                systemId: '2abbc253-ec0e-4cbd-9eae-6619845cd0c1',
                systemName: 'r149ypefhqs5j6s59u9r',
                executionId: '78ccbd24-77fa-4dd7-8db7-f475e5c41e22',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 07:43:26',
                executionMonitoringStartAt: '2020-07-23 16:33:04',
                executionMonitoringEndAt: '2020-07-23 01:55:01',
                status: 'CANCELLED',
                name: 'y664t4cot259qw1v36ako6xqaskfgbxhmpjwwjc8og3nkaabd98j31xuefgxweic0n75cebtvf3eld3sk7dey9zmeehldp0loqld0lzeuy0injcqji8dc8fgrnxb314x5yj3k5biijd4hccsbn6g71acq07xkda2ea7ckj4tiuwe3xcwqu5dslaw0rzjtlrcevfn9dwedg25nqtg9f5andu771y1gviqgldttm5pcp8qw85082uogwr4vakgzhx',
                returnCode: 7000214460,
                node: 'i8yjjnb7bond9pkjt6x9jk305ya37qpgcypf80fi73ztacouox50un31aam0rvedrlskws3l4cyc80te4xgnog049vbbij6mizb25ymv0tf1tvvdziv5ff3k6tvj7gj71z9e3txb1rx7hxoqvja68lg2dxu1z7zl',
                user: 'zyehz03h9nxbtv1mrzlqrgdbns69djdc6hr265vgfob33oiuhfw27thd45ay5px4iimtso7joyr3gvb9bnpgs6pz9o52q8y7myvcsitl5k6c8wvvskemz3gf640z4j4l666o81l4m3lp4s1730xko4xzzcmn7e6pxrn6kuh25bkvgq0b9a69vsqj46hozkm62fnjjxwtpot1ayqpbae93t5gvu6fqvfrbu9kmzhgga3gp916tsubasqebwdlgpn',
                
                endAt: '2020-07-23 09:15:20',
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
                id: '8d138995-0002-4206-98fb-3578d373a05d',
                tenantId: '4e5f90cd-2299-4fab-80cc-1bcae2e6cf0d',
                tenantCode: 'rd9emm2czlmhe5nmbrc4wajj1l5plcgd4bopeyncancmi66ycu',
                systemId: '2abbc253-ec0e-4cbd-9eae-6619845cd0c1',
                systemName: '8ehl776250rr15q1uhc3',
                executionId: '78ccbd24-77fa-4dd7-8db7-f475e5c41e22',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 11:50:50',
                executionMonitoringStartAt: '2020-07-23 10:28:43',
                executionMonitoringEndAt: '2020-07-23 00:58:49',
                status: 'ERROR',
                name: 'ze741mfskszccwfk6avjwos7d3jpqkbpvfmejey6018pr98xcycc00fhofbv5bogavtg5w9dtd56pq0vj7b1fy0ebq9u57d2f208nxoa4lzbrg0xw7m5m8a4x7l4owtwefwm6za0wwgwc91i7wp2o3aftcakbfsn3iw6an0z3tir64pa6pfig4webpw1vdkinar07jkc1gdmfhjmovyuwui768ohfbniipyg15h2zafydxxczcciaf8bby6w94b',
                returnCode: 5969725970,
                node: '7686qv6sq5ae59vb6fcy6ux8qc633g12vlus9jmjpua2djkfzr76du4boe6f5rnnamf8chtl70tzafs36jec4yl9x67ktf3iu9xwswcs5nlwhjjmi32t29jolfy43r09jkivi9d4e46mt3cu4i56mdtd9l1t2rax',
                user: 'y8mur86aexxr1ebu0376x2wyshl34og1my24bvr5xul74w5tvclzo4iurzku1mhicav3rcdfgpqiup0tv2poe5wjqucnlim5b3xodatf8xm0hkcadvr3jsofhg6d04mhwlf5ys6g7hjtnismqxt1z3liisl5exgwedbjw98k1c1de4z71m3qp8blyv9pe0frmk2rukxeebeyfs7u9qm1ndsvlsj5tnz9sxvmhpxxiofc4klkcdqrhd2yamd16sg',
                startAt: '2020-07-23 13:42:37',
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
                id: '8d138995-0002-4206-98fb-3578d373a05d',
                tenantId: '4e5f90cd-2299-4fab-80cc-1bcae2e6cf0d',
                tenantCode: 'r4h223lgzz7a64dr2tuujw3ors9xiqwu6ith6cfq3vaj2ww2z3',
                systemId: '2abbc253-ec0e-4cbd-9eae-6619845cd0c1',
                systemName: 'h3j9igs8kc9krnpgzcg4',
                executionId: '78ccbd24-77fa-4dd7-8db7-f475e5c41e22',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 07:49:22',
                executionMonitoringStartAt: '2020-07-22 21:50:34',
                executionMonitoringEndAt: '2020-07-23 00:17:40',
                status: 'CANCELLED',
                name: 'kebl9k9klkmxltp7o3ii3i9w21kcwn9ig0cvpqm41x2bo1d2lnw8e06qzygzk5oty149i9o8qfj02cv5vbhy6am9plf8x0950ibml9kl7s8vlt348blgvm6qn442zmwho6qpdnc4hm9xmgijrnec9dole5i6gg05z73oac4sbajuadycttn28bgsa2l9yacijtz7i5pst9c78jf059iq0ycf44wjqe2uqn4p043x6w7y1yw90knfyj66gw6gdwq',
                returnCode: 7513139826,
                node: '3p4irsyhfmdycafoda43fo2jcica0kpn563hmmfiy2s1o6ekmd7ygsiydg8587cg9mzlixe5vbxexiyvjnlbjmpmatpkrhshbe0h9j4uic1krf0iih1ptu41s7hemoks1f5qrjnkp82vr8953juho7vzrso0u6cx',
                user: '3o9lk4gl4ac8tdj0oyk6z8nzmjg4gga9oo4v1fat5qvt0tyhplvmjw9q8tcm8vm25sn0i1lltpkatbzi61v7zs4iem3yzfm1nhk0rq84t8bsigic3tkrnosqh0zdp1lgg0ycpx5eeng1z8t13d9sgm8k41jnzgswn6iur9gmgd5qf6bqje468mo357zjdj07hnfcumlxp500gi8915pe05c6wy3kreijjuc9igtsa6yopxvrer07txyfp6sr8f4',
                startAt: '2020-07-22 22:28:16',
                
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
                id: 't0lryzsmb56u2mr302lf45kjj3cjiw2xtcz5h',
                tenantId: '4e5f90cd-2299-4fab-80cc-1bcae2e6cf0d',
                tenantCode: 'o3e639z2an9ecnsr7tiemgzp8fth3fgxjdri3xy45e2rg6pgi1',
                systemId: '2abbc253-ec0e-4cbd-9eae-6619845cd0c1',
                systemName: '5d7bdrl7360yeeimrlb3',
                executionId: '78ccbd24-77fa-4dd7-8db7-f475e5c41e22',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 04:35:58',
                executionMonitoringStartAt: '2020-07-23 02:05:00',
                executionMonitoringEndAt: '2020-07-22 20:43:58',
                status: 'COMPLETED',
                name: 'agqaainipz30g56489yfiuh7t56mljieizy2peahoraprkd9ql9p9en8dvk8hwdfb7qdx74qojwyabi9xe7uiibjbhogu37f0gwdz6653xoyt917i1jtjud0usv60vvcwj3fs5qgriwvhomnht8xbhzbdd0p5dpsmmyk13brrsekxkxpfon8z2u978mufmmatfcmtjazjr4tmjedi4t2o10d27a8oprgnjn7wyeu1ef91zdxg372i5kb3aitnt8',
                returnCode: 3897358951,
                node: '3s1rroveks9kj0bge4v23zuztufqff43fyeuye79962f2y8av3kd2l4l1y1ellpkvtqtm0x7z4zlgyl8af48ajnrq5p56a8iljb55zxwsi171tjcjetff1xamxriof52v0qhexpumq7jejyhr5zzy0oni2bu8mkd',
                user: 'pzffe64hlvtpehhp6suy3ds7a3i8ouqd9mx1f09aov71g9cvycxmsg5ewh9dhs1k1ex4x5lvoppn425v44ervwubat38ww9hfr49skzglvc5dcm3qtp2r1spavw3v4g5ry3ac9jj3k3am3kveq7plhvyklgmwpuzbxb5uud7crb2as82olp3zgkbrc0km7eivc95a1js465cpt7amd4n31k29t713aac41ghmkroxkharfv6ke29nukojtrn03q',
                startAt: '2020-07-23 00:18:32',
                endAt: '2020-07-23 12:11:04',
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
                id: '8d138995-0002-4206-98fb-3578d373a05d',
                tenantId: 'hbw689knhmnmuhqebg2xlm29j2inedpmbmdh5',
                tenantCode: '5u2uox1gbah9i0mvcqcn7dwut014m3o2y8bke7vqnsnznv7q85',
                systemId: '2abbc253-ec0e-4cbd-9eae-6619845cd0c1',
                systemName: '1mpyvpd08wkgwlgon9k2',
                executionId: '78ccbd24-77fa-4dd7-8db7-f475e5c41e22',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 16:52:37',
                executionMonitoringStartAt: '2020-07-23 14:52:33',
                executionMonitoringEndAt: '2020-07-23 13:40:35',
                status: 'COMPLETED',
                name: 'feypxaojkr88vshe3pmx5fx1vqx3dgn1v2e4u59j0tm823jkseufcgh7kbs3jlmsptrx2vwc1pqdytiw7e3fmst7gcz9stv9zf315gfswwedppdipskhkoddof87qofbz3wufe1pqd4nlucy8ax0wi85p1u9d6u2m9r69qgsqjfjh4n9bes6d0e6tg66lqta34ulvdm72thibltgjo63x2bb7x60a7mfyr0tu97gp5pqgzf5pf127smuhzjsexp',
                returnCode: 9557728443,
                node: '5gapwjp708wll3jwjg2w4ezengz50jv7bai5r7id4zlvxh0t6cs6eblx3x9ka7r44b8igl0fs9gjjvrr3xpiiufseh7i3hn29gzxzvxuhiuik6u7tx2fo8ck9jgvi6974ns9klmixdmz24lst7tovus7rg4tuvc3',
                user: 'uqh2n7qytheapxib2ffltkzm5po4mo028lsr8oj63wrdpihc2r811a394qemkkbfzgv8pbbznbeoiy9njtkpag536fln0sbwfbsb31ko1gln44u2v038cbx3qltkxbvre9gig4d55kpegnh8306dodv7uhb4fucwfdveg2k2vij6xw25eseypzc6t1uv54pfmm28tuzwaoujricgv81yai7iyi6k44r1ykr2nucf5j0pqaliq8fhhn76t2ozdzs',
                startAt: '2020-07-23 11:35:13',
                endAt: '2020-07-23 06:57:04',
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
                id: '8d138995-0002-4206-98fb-3578d373a05d',
                tenantId: '4e5f90cd-2299-4fab-80cc-1bcae2e6cf0d',
                tenantCode: 'asgjtc5pw6dnuulyz28veensvpprjdp15mifnodio2mq7arizh',
                systemId: 'eynvwohf4qjd50gz454vz8ao5s91ip4jvnfm3',
                systemName: 'l5kgc267qkozpmo7qupg',
                executionId: '78ccbd24-77fa-4dd7-8db7-f475e5c41e22',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-22 20:42:57',
                executionMonitoringStartAt: '2020-07-22 23:02:50',
                executionMonitoringEndAt: '2020-07-23 17:44:02',
                status: 'ERROR',
                name: 'yub0l35nwljps6vyx6g4gtcc16m7kkclmi5jzd6h7nbggyp6m7m805mcilm5hbzxb1geulehplv8znq8ec27t3arayirghzey0l5ekjj2lrc67mrva44cpd2wg5lmc8yheojaq5tmpvuygn06za6751zkpkvk65gs3wbtz3l82r1cf49kcxovf0jlaaja6r9d89lgxct0zb0ybodx91bs0pzpyonlfa6v2egrq694f4yfp6wqkoq5tyjfhyuul2',
                returnCode: 7988750154,
                node: 'fulyl8r8r71jr6mhovcft984k4yyyzk68bkj6vrqdjhmeucrw7cs9zx84llo40wtgpanwb0fivr8w0vkb28ebarwvott1a5wzhmjkn8303t7fwcxewnb4spjz4wfy0ocb4i4rc7rdfjyx01pu15i14uun1bna1uc',
                user: 'fucims0vko5w1yagm875238d28qaeuivn13vm5pyf95ny27udf39ly8303beee0g9fydajredaxb8jcsxiyx6ilkuvhcrhz45z86w6mxumworvfrsmp2j1m8ls9xkfimjsyimn5h3bc6p7as8flllz1uzpa4md8xkt6l2uvf7sou8oowmnkzcjxwoqigw6vxbueh430jqvz6b61kc8hohv4k5iyz1hdhy0w1l24yb83h1qjypv5z9u5e9n77qc8',
                startAt: '2020-07-23 17:09:29',
                endAt: '2020-07-23 15:50:13',
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
                id: '8d138995-0002-4206-98fb-3578d373a05d',
                tenantId: '4e5f90cd-2299-4fab-80cc-1bcae2e6cf0d',
                tenantCode: 'uucqpvzoaqpx1w8zjgiynn90ysfupzaaaahltyzsh7jxcee9to',
                systemId: '2abbc253-ec0e-4cbd-9eae-6619845cd0c1',
                systemName: 'thgz5n2drn2rrjvd4wnx',
                executionId: '4unke1slia8m235161cc7wvrp550graw91cgq',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 09:19:12',
                executionMonitoringStartAt: '2020-07-23 00:45:10',
                executionMonitoringEndAt: '2020-07-23 09:25:09',
                status: 'COMPLETED',
                name: 'ebrq2ge5geevk4ex5pheg93sm6hlkpg0my2gqfkjgxeba83i28897l7d0it8gdr2o86alu4ec9wj9n3e3p6qaj6n3zto38yfzvlunm8gn4b01dgsw1jfj9epf84uplagae1be27qj90e6uw52rzczfn3xurun0gyy5brb3zh9mtocluu1cn16diqiba988549m2tfb5tiu7eb8ev5akb9a8ql5mje67y61wxdqmyq6o4pdp6jjqslx9flpkw1yd',
                returnCode: 9577406602,
                node: 'ls4r1bj5u2576un07fzkt7n347bj40ca8qbj1w2senxq94hg194chqtrf0dk3ekfj7fs0ipf2lo3f52naar4ecr9ze0jmarol5yez5sd9h4tc3fuxnxkiwddavebnnohm5b3rxvxz5r3dqd38r2zo5ezmw9lkcpv',
                user: 'l8cucc5d3eax323msc22s07z2zepok38c44r5cnsgbw0e71cqat7u863nam3bp7o5c4gmim7fgw0hgokpgdz426lr2u3tv8uaooc8mfumn6xipr4c0dmqcssjzwup287bf3ut18g4m4fwzv7v0i5ps86q3i820f1ff53w9w7v503reuehry36uwxmoebx5062l360yocwzpvu93rxhmszl6cl3fm7pwd3cnz9bkmbwiqac86ryg2jjuvhlp8wv9',
                startAt: '2020-07-22 20:24:30',
                endAt: '2020-07-23 12:08:42',
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
                id: '8d138995-0002-4206-98fb-3578d373a05d',
                tenantId: '4e5f90cd-2299-4fab-80cc-1bcae2e6cf0d',
                tenantCode: '72g4kieixmn0pa02jwig5qiwzv7pz4sj6v68tujwkleiev25vgt',
                systemId: '2abbc253-ec0e-4cbd-9eae-6619845cd0c1',
                systemName: 'x1qmslr4gqn78y2pbeeb',
                executionId: '78ccbd24-77fa-4dd7-8db7-f475e5c41e22',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-22 23:20:14',
                executionMonitoringStartAt: '2020-07-23 02:45:41',
                executionMonitoringEndAt: '2020-07-23 04:19:59',
                status: 'COMPLETED',
                name: '661cz9siq2v8zakxcfx08wo5j8mwg7hg2rrfv373rgr9006g3uwqg95yvxivz14ed7bw9cq72cog6u41x0k4dvch7uub0m9gpm9q7l8lazubxpe0sri8m2mermf6y2eexgm82shf1pj96skmxphcj0zhsnpnkwoon8tdjqn804hxhlfl4fe6vpndcdovifibn5cz9p9bqfudlc1zo2pwpd08rg8o722y81nu51dh61meklo8w89uagi4e0eh8fz',
                returnCode: 5317048788,
                node: 'mq775mrnotoo2ln1qpjf2bqaw30fc8l7po21pwvbhwc60y8u2o6hrd0pv1rrekkhug0x638iyisvzcyuly1pf5ch0atd222xnsmb47ua881ltc0nau87o2o9pp7qlzguiklnheugwdpsrp4bgh8l5lcoiv6bfcov',
                user: '5sbtcl81gdu1n32aez73umgufvgir7om03aifn7oz2k9hutupuxb3z7qq8n4o106m93w7qe25xx4vs4zzfw205h8xhlxf4de9riks9hamno3ymej2riorttqb1g8rsn32c35h54pylqu9k5uwym87anlc2m7q80oz9lszlcj4kib3487lecqg34cgpgl8kf90vk5hhx2b5vi60ryjl99bdf2nrbje8c3e4mvl7mcxyft37riqunlqkeei0xwa2e',
                startAt: '2020-07-23 11:56:46',
                endAt: '2020-07-23 09:12:09',
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
                id: '8d138995-0002-4206-98fb-3578d373a05d',
                tenantId: '4e5f90cd-2299-4fab-80cc-1bcae2e6cf0d',
                tenantCode: 'x1otg6bhjzl1txykadmck662pwzwz21gqrftsb1r40k5qjxgkv',
                systemId: '2abbc253-ec0e-4cbd-9eae-6619845cd0c1',
                systemName: 'ww2yxyo9iz1d15w789c6q',
                executionId: '78ccbd24-77fa-4dd7-8db7-f475e5c41e22',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-22 21:00:25',
                executionMonitoringStartAt: '2020-07-22 20:45:48',
                executionMonitoringEndAt: '2020-07-23 11:13:59',
                status: 'CANCELLED',
                name: 'ilj3u6hkbi5jxafi8ilxw155dwwf1rknm5w90qnndthcjepk5aial89pqgk55mx3ez8fgd4wsv75urjb3af8y69pztw1hjpwuudcm5m7trx5wzl412w9yzj9m5ob6yqp8hhzvz9tv6fca74viah8a713yfg3wmbqafi0ulus3lx718bm1ne8b5fyza11ezkiikm404989owy4ymtalo1cxhtud0yr1ukx1gutd5g41ufqf6zd088dx9wrm378qq',
                returnCode: 8292185663,
                node: 'pv3ti52kkalynyf4nccq12p5qm8igybxom3b3tylr0yaspwpzfezi5gfr5jb7qqhw01sva0pn2qcnxyyzxevl465nrk03yo6voy4zzodshec5uppoxo51kbnxrxdksc7vppjqq0owbjgpdahaw1cbr47v8nxb6wi',
                user: '29ujz5cofhh1ms2vsqevbu3eh8bcl03hdzs20pyruts6mryjjjpiyppjts2sd3mxr7el3f0d9incbc0nbnml1ftvd0aecdfjw5zulfgu6a00tn3vl78nlw6axd4tri7oh5xbin0keo5l499tjgbzapsbxggsa6c1vogv8fkexunv56w8j6jllbomxaafl5dmzkpm600iry6fxcgskkkbyqtt5aksbg2u5ca2o6dytzv9syf6xbn4d7y6abn5iyi',
                startAt: '2020-07-23 12:59:13',
                endAt: '2020-07-23 00:35:28',
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
                id: '8d138995-0002-4206-98fb-3578d373a05d',
                tenantId: '4e5f90cd-2299-4fab-80cc-1bcae2e6cf0d',
                tenantCode: '3anzeqiq0e056xwxor0vxugt15ekx6aor7nk5sb89tcedez2zm',
                systemId: '2abbc253-ec0e-4cbd-9eae-6619845cd0c1',
                systemName: '20s6js70qwynb7e6wanv',
                executionId: '78ccbd24-77fa-4dd7-8db7-f475e5c41e22',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 12:40:01',
                executionMonitoringStartAt: '2020-07-22 21:20:13',
                executionMonitoringEndAt: '2020-07-23 08:29:07',
                status: 'ERROR',
                name: 'aisjf6uboeig71tya7c9tg7vugxo2ptfl138gr7918u45521cx8x4pgi921uozcriwubj3bm16mddu12miucoh3pkgi0ai2gbskeoio9fzp1moggd7czw80qbn7wn1r0zaurvjvjdg7bbae6xr9kiijg2qxt9k8fjfwotizl811lgccdyoi7t0ty3jemyizbj35y4a6adju0gcrwg8c31ntxz3f43uopfmqlymhspzhv76a3b15b08w6pz9dxfe7',
                returnCode: 3940280697,
                node: 'bkuet9cwbq0fcmmp4jyv5bhvmfv76omvozztio8lqy8dox1npeohn2w9l59atx3hcjmh5ml714i1pvsjaaklwcr9vsruhoqa762rtalejb9nv8kxsyu0cc8ywvz0e5n5qfhq5b69pj8x5r1jpn62dj3qf82nv64c',
                user: 't5956nqn4j5ckhls7nx17dfsx6vyws3v6nincvbdsm5wlqgb4lipuvs2j1at0s4uiti3rx0huwza23rkx6l8wseg36906dpoxsc1wlgfwfk15bshma1ivvdy6gttpf95zst7ftgd12bmyeyfcqflqw68wquirfls43res8a48o2s3c23mx19z253pl6en3jbcv4g1tkax4i7xwzz3yurg8zm7wo67dxy8w5l7z098gaktu6561kjuclrgdibqez',
                startAt: '2020-07-23 09:48:06',
                endAt: '2020-07-23 05:04:58',
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
                id: '8d138995-0002-4206-98fb-3578d373a05d',
                tenantId: '4e5f90cd-2299-4fab-80cc-1bcae2e6cf0d',
                tenantCode: 'pncl2e3xp73y8gz6lk57divsn3hy6g1aow14hs9k12w5zjdysw',
                systemId: '2abbc253-ec0e-4cbd-9eae-6619845cd0c1',
                systemName: '5u96w7pgsc5tncpmd1be',
                executionId: '78ccbd24-77fa-4dd7-8db7-f475e5c41e22',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 15:36:04',
                executionMonitoringStartAt: '2020-07-22 21:59:52',
                executionMonitoringEndAt: '2020-07-23 12:36:43',
                status: 'CANCELLED',
                name: '8gg4185ohuts3bq0on44zsdmkjuvgxiutuhxniu12qs56tnn7ywxq0admhdi02hc5yekxtqmlvwguotl4a3tykg8pnkl2z6efo39wji4dfx136l11hckl5634nuw248dzbl7yw9rqb6thozyzryu0ephmt5v6x61p09sa77z5iu5dzhols8x91rb04d2u74h1gpmeojz4h001yy1bpl77re66t1pojo5q6lsfygg1t6m67tz4vn6631bgkg22t7',
                returnCode: 79395257392,
                node: 'u28mrx1j2kexyowcgo0j0b5q5t5ynbq4cldfkee25r16lg6kk0u6pxuwl2pt6ed8r4qz5tvsyz1o8vogg26ry0drcmf2dztu1xg2mxrgmayem7cxhyx88jx9rjsq1afue3eiaaezdtfl1jbc4oeig8711uln4clc',
                user: 'l9b115m50c2ggwegehy9k770g54ncoiohjd5ld5c3xhidezypvq3lrrdijzz4up0l89iu805p10dityzcp27uwql8iuv7entgrh0uyv65d6u2eoe3agxwcbquq8ccecilgbkan2sxhjgd4zmabkyvn1lg89gpbg2cobhgsylp8opl70y589q7mlqob0g047cq9dgnstk118dhwaqrf409u1bvp26qzb3ihg84egb116iuhz53gw372j25k9kmiw',
                startAt: '2020-07-23 06:19:24',
                endAt: '2020-07-23 04:05:10',
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
                id: '8d138995-0002-4206-98fb-3578d373a05d',
                tenantId: '4e5f90cd-2299-4fab-80cc-1bcae2e6cf0d',
                tenantCode: 'jzjgpwce1p5nuc5z90wgtp5gcbt48owsszu8getofpj3689uu5',
                systemId: '2abbc253-ec0e-4cbd-9eae-6619845cd0c1',
                systemName: 'r3cbgdu23850zscp40c2',
                executionId: '78ccbd24-77fa-4dd7-8db7-f475e5c41e22',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 16:02:59',
                executionMonitoringStartAt: '2020-07-23 05:44:55',
                executionMonitoringEndAt: '2020-07-23 11:05:04',
                status: 'ERROR',
                name: 'rfz0mqujglh6454k6hszgs578e5vwuov8xjwmr2w47rqh2y5s3jqr3of8ff129nq63ehc2cdi8c5oez3ujv43taampg58zo0buct6njoj8f685y76s70rvaf5nyqaaatnuepvo5rpkvy1ynrwejtx7fnlx9vwb00nd2osk2y3cy599vq5a3a4w3jom3lovgv95sr9gjzjd88kjdy23kbj6l382ah1jetqxigut8pfjvgxayr126y88naqzx06ge',
                returnCode: 9966643811,
                node: 'atz14ee6atmajj9zg1ree31a68u6fi42hq4vqjqmfgli7xpzbx4uzy3y454bjhco8k0r1ucix1h53391jxcz2jikax9ocl6ae6wpwntqkol3s010e382w3hg8enthfdlda5rinedmqf2ei84hyqfhooz4h1ux18bu',
                user: 'qmm6u859306mbmpz8shf5www4mlv246gz0mretra73ef1v6ekcki3phhdpez1xil23eersziekdkyyfgkg6tqqa554zfyl3i1mx852rz1dkyjfhj2vrszd168yj6m7wn78hayy2pumw1yv040iczyvxxh4x1e3plc70xdoc6fb5stpv0drn5ygso49btxk40ji2xq52s07w9wstgiw827aoco7jt7h6l5zds8f1gh7jjopl4uyohp85hejge5ok',
                startAt: '2020-07-23 03:07:55',
                endAt: '2020-07-23 02:58:40',
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
                id: '8d138995-0002-4206-98fb-3578d373a05d',
                tenantId: '4e5f90cd-2299-4fab-80cc-1bcae2e6cf0d',
                tenantCode: 'y7uhjx1s5qwyqzoqzncgr1z10e2r1nb1juzuf0cpow2w8m3mcf',
                systemId: '2abbc253-ec0e-4cbd-9eae-6619845cd0c1',
                systemName: 'dn366cbo0cvcztonb49z',
                executionId: '78ccbd24-77fa-4dd7-8db7-f475e5c41e22',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 09:36:30',
                executionMonitoringStartAt: '2020-07-23 11:50:49',
                executionMonitoringEndAt: '2020-07-22 23:08:47',
                status: 'COMPLETED',
                name: 'g3iy7b7jtetjf0kl8h6sr89s3h86hvwtwizz138fth33ttkr7nmcx519k6wn9g1xcf078mq6f04hey6gcng786ekvlg4c8wc2ijoxd23xb93obce0va0liy7n621lcp7ce7nor6454gu1qtipq42datfhzr8f8kemwst9wum44ulzj91rfyqgc7yl7gsq128s8kgqibnowjh5j739pnoa5vm4u1omyvxk9u6mez2xzd42myktleqj33xxdmx2kk',
                returnCode: 9253020413,
                node: 'wydl7iqvgnvfpy2uu0ih5cnjz4mz3dc2irrloc53bm0op3lnnmj7opr4otng532owsxfe0e9himpl4aefe2cq2knno5mzzzq1xwy7yma1dsop76tsrhstsb4tfqm5ruoxinx4408goeggxh5aveznj6yc1ytasgr',
                user: 'vgrt2xohlgagwvl4v45egvnrdtf8lcz1hypmj7uiizgt1ks6i5uzf13hrteibxlgnxt1nrcv3zbuhmyj9g9q6lv2engesnd6cs9qacxz2scdhcfv5y0n0ijpg0ufun44p0ktkmc9ywohz962ti0n8qd2yrsya9k8jnwuevzkxokzh8l6zak7j79em76n9gwh3h8xhhy1y0kjsf50ykckaa69f4nlzojr0w7p5ibk2eco644y5s68img6ovuta68m',
                startAt: '2020-07-23 12:48:15',
                endAt: '2020-07-23 03:29:23',
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
                id: '8d138995-0002-4206-98fb-3578d373a05d',
                tenantId: '4e5f90cd-2299-4fab-80cc-1bcae2e6cf0d',
                tenantCode: 'bjxvxd6aa2wa5n7n2pze90plozjvg5knyil0hop9n6lqc89a9w',
                systemId: '2abbc253-ec0e-4cbd-9eae-6619845cd0c1',
                systemName: 'kyw7qw24qy9nxidaeimw',
                executionId: '78ccbd24-77fa-4dd7-8db7-f475e5c41e22',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-22 20:26:52',
                executionMonitoringStartAt: '2020-07-23 03:48:15',
                executionMonitoringEndAt: '2020-07-23 07:27:58',
                status: 'CANCELLED',
                name: 'cq1oikpi30wg41zndey99x0h3mybc3u4a4w2qtxrwg9qriwcyl23z2gzhgizyln3hat6sq554lzqlz25acbqveh3ks7q3uz5u3npo8gsdmbbjh3ya0ayayguihf53uglx5n4n3tctgpupa3h1tsbymvli7tsyo6x8dkdvbu5u85p6sn6zswwub9dyhhh55g3lgvinr35dcowuuz3zyq11frvsksu5p38h3nbcpy4a6be21ralwmwrcsdta28k2f',
                returnCode: 100.10,
                node: '3hcdgcoq1h2r130kkgs00e898rebq0oz80yp0puvpjs7mxckitn0c8v0vhtbs0nrualuoa8v8vbfscrsbb2nm5o7vwcg236ibngeq3w2b4a1vvjsvtp5djec19pqji4x3ys2pu20u3w3a1azfhzaic9rwi3kknc9',
                user: 'jvc524w9mg8hzqkb6ew519x1980g9juwz12c3ivib0r5gljlj3vvknrbx2r9yqf7tcfltd62kb79xde4con47j8yfv8rxdw6lc1oic7i25clpo850hy8oyu7ku2c7zhzdug8vdg1x7d9z00x5lj97t6emij3huvt5tcnun5k4ibjpst74oug1kb3vo7ctnp4ls5vcqljtbduj8vpdliagglo0h8bbrjsnwngv75pob10k0lze9ee79mwzwfmngl',
                startAt: '2020-07-23 00:59:18',
                endAt: '2020-07-22 20:49:37',
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
                id: '8d138995-0002-4206-98fb-3578d373a05d',
                tenantId: '4e5f90cd-2299-4fab-80cc-1bcae2e6cf0d',
                tenantCode: 'ra8n7ekjiqia2xdve18stahemtk1dgznuknd2irz74w037es0j',
                systemId: '2abbc253-ec0e-4cbd-9eae-6619845cd0c1',
                systemName: '06uipj2ypb26gapxp6z2',
                executionId: '78ccbd24-77fa-4dd7-8db7-f475e5c41e22',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-22 22:35:03',
                executionMonitoringStartAt: '2020-07-23 16:38:04',
                executionMonitoringEndAt: '2020-07-23 08:26:58',
                status: 'ERROR',
                name: 'ho0xl4u9czrbmoc0l3cb450dpuwp76wbgedmijoxf8evi4pkg4v6n5qpyd81asjslkjsc2luv7tcg7wrhqk2wullya3xd5clfplutimxxzqpnnhg5j9d0kkp1tf4w66kugrwnw9j4cvmmg4bemfdrdzlzzqhx1kbdk4euap07wek2xz5bnh0brz0kgx8i8iocuq664d34l44flxgnbve3aju6zmprqygcgpivzxj1nrr0jbhlc9la7qymoxkfdn',
                returnCode: 5527365534,
                node: 'ntqqciae58tsed200njw4q1sqp1cz7e9enuogl6b4ap82lga3o0t58fnvv1big9ry302x70j03lvi2av0qlu00bwyka5rw3yzh403ih5yscgj2jpjr8rfctxxnkd768cp7c4kdxjn91d438lxw03ol6lv20f3uwc',
                user: 'rwe34b14q512jty2abo0p221tza7vvkx43s6vnhvix3dohz1i6muu1olxgn78vgbsoo6vxps3hmmpuaqz3u247c43k3w2sujrq8kdi3ahp8pzhx3n4dygkd78cvgaeg1e6zlx3wjo2ovv8xikjgm673w02jj4bebohtu5zbws2lptm3l1xlybpindmp6rr88n28emqdc06u5yrhx0r62d6fu0uk546f5i0s6deysvbgx8k7a831fib58wjg5tta',
                startAt: '2020-07-23 17:43:46',
                endAt: '2020-07-23 04:37:17',
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
                id: '8d138995-0002-4206-98fb-3578d373a05d',
                tenantId: '4e5f90cd-2299-4fab-80cc-1bcae2e6cf0d',
                tenantCode: '9dm8890ychekyctdn04m73zgjcfqjuahj7flt2hemmap44qf8y',
                systemId: '2abbc253-ec0e-4cbd-9eae-6619845cd0c1',
                systemName: 'o76o1r4k9ybeq2xk244j',
                executionId: '78ccbd24-77fa-4dd7-8db7-f475e5c41e22',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-22 20:20:02',
                executionMonitoringStartAt: '2020-07-23 13:11:49',
                executionMonitoringEndAt: '2020-07-23 05:09:25',
                status: 'XXXX',
                name: 'jlgjks8fk3qhyahamn498ce3c110rs9g5ef8hfsplwi16om7jscn2f4vpfhcl594un77uo9ohw0x5pa6tcbizue9bara9wrsjgkyxtosuulpma4tvatn3jxerc4xks2vu8rcfjyhdydss2fx6ketcn7ma42s5pkyk6joqx8888guq9pt6tgcs9sq8vuooov5u9q6rr7qv0fnudxn7gn0nrw3u7rl28x9s3yff9s3uv49g422ri9azdc5lpuc4lb',
                returnCode: 5175234006,
                node: 'qu05z9ewjhh227gbtd7ctjn8f2mroqpqaqziaa1wbmcaofueodi0w2f9n3lfnse2489i7kppqyfx3uv6baft50f47b53acisz4zg005sdd35cw8o12195z02yooc4omm5jl8yem1iw3ih3pxgndjqs80v9k6az0p',
                user: 'f3rk1qekefclhs98wnu3deep8h9mk1z9b9swfcs02hq18pckd3h5e8kv59nnklq7gg1l25drgla2l6700vj7z3s4h1f6jnretndhq47h0ydzfh91tyqdk9cxc5tzshixh2vdy0zfvbtdemmugnnfgc3lxxccbv4r75jpu9w0wch14jnrd15r6f9vmuq31mvg91iesbn8tul6jk9rqd1pzcyhpxffwmglcsprg6jlmrc2v56up5803kd3vm3s60p',
                startAt: '2020-07-23 00:56:44',
                endAt: '2020-07-23 10:06:02',
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
                id: '8d138995-0002-4206-98fb-3578d373a05d',
                tenantId: '4e5f90cd-2299-4fab-80cc-1bcae2e6cf0d',
                tenantCode: 'hfoorg81lnp0i336d2e5ryuqym9r5gh37lk397ft4vnwpi3c4l',
                systemId: '2abbc253-ec0e-4cbd-9eae-6619845cd0c1',
                systemName: 'k06uoqwha5tinwqmwae2',
                executionId: '78ccbd24-77fa-4dd7-8db7-f475e5c41e22',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-23 13:37:25',
                executionMonitoringEndAt: '2020-07-22 22:55:17',
                status: 'ERROR',
                name: '012kfr6qjcp9xwfdsqx147jr063papolwxgi3mrtwqejggabjlnp21tcvtkppiairsnhcf2wbtprmk79wv20z1hsv9m53gfarilvx9m74yalyfg53hfnmfwz2cweqf28p27k7hjbuphjwb950cmvdl3f583r7m4nii8skbplxtzkdphh0wdcqc1cfnzyyevn6s9396rrlvqf1ij5kpoialo9dxeds1lgrlaxirljsxqhap7ejbg8bq1h48adign',
                returnCode: 2554087417,
                node: 'isrqrurmrt2scp39huccfzyakvq1kun4ia908wbe6kg7h8g5o64p8enlst5patkwosdn68vvhk1yl5241f0uxj4teeh3k229ro83zabz52qhrildm0ke4kgid62ymfwv5fnrp6gbveebjiih8djewindo9fd12ez',
                user: 'jgjmnaawfmecme3nje2fq5j2q1yh1zz1bma3jpgko46xks27wonzggu9opsvlljn3tv6c9p787pmr7inc10egu0p6fjno4rncykxu6n0s5mcrb47luqthu4dz1rdnqspsilkh9a3uczded9kj5d10ttsedmni354b0owsajc43dyko96bbfvbp810efucbteqb9nun6rljbhz6k0nfit9iql88ytbi21c6u8h4k26sp63cn5hbai9zipa4hppzt',
                startAt: '2020-07-23 17:45:47',
                endAt: '2020-07-23 15:40:31',
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
                id: '8d138995-0002-4206-98fb-3578d373a05d',
                tenantId: '4e5f90cd-2299-4fab-80cc-1bcae2e6cf0d',
                tenantCode: 'xfjj5s7llelief8o93p5w7cqp2fltgay4do41u8pt4le65oi67',
                systemId: '2abbc253-ec0e-4cbd-9eae-6619845cd0c1',
                systemName: 'zjxq7l6lzg3x7z371qql',
                executionId: '78ccbd24-77fa-4dd7-8db7-f475e5c41e22',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 17:36:50',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-23 15:05:06',
                status: 'ERROR',
                name: 'bb8sxtcgu9n0ka77vpcmt76hujnn65hfdgj3g1qzps35ssnboh0w8et60shrwrny6zblq10tdb08hf475tjw5v62p9wtfp1linx5fc1blofwbuq74p9jqf1lle05mvhlx1dbgu0g8ik4esfhoft85hn42djkuws4zkyen5hy8zxsvz1jdnmt6hlycevltaa708nocv8831ckdilrty1haq4jc2ucwfb3ezivnuz3bw3suwyl8xfqa7gg8w1bg03',
                returnCode: 2065561766,
                node: 'elkafbxjl7275e1u2xpy8zcarfflmt90ur9vospeb266lqxtlufjyjz4npk86hj9brbsn5cnoebn5khhcuxcumyhnpk7n0x6ozaj4vr5x3u84ejaccl93kjebx5bklyp6gygbd4uwdhwlcrolmfj2z9wt3ny6wlq',
                user: 'b2286kwveu2h6cniw51c6rt97sw929ca14refc8us7r2tz9ajxehfohcmipth150vjpy3ymb5nszdspjtx18dx2tczthxjx1axndfqi6o29cfnagrkax8inb39thw28p7cbj88upjr1j4nj1wicgosreu0rx5jd7lvegd2l77uhdtbqyon98j7tglrgb65irn7pdbqfdkv3pre6zym5ufa4f8eeowr56q0lu2r18zm4rmkq22sz0eieriinjhdd',
                startAt: '2020-07-22 23:19:03',
                endAt: '2020-07-22 20:40:55',
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
                id: '8d138995-0002-4206-98fb-3578d373a05d',
                tenantId: '4e5f90cd-2299-4fab-80cc-1bcae2e6cf0d',
                tenantCode: 'nl6ihmefbza2rlyc1s6o3uw89c5qmkdfk598qy7k965t7b69ni',
                systemId: '2abbc253-ec0e-4cbd-9eae-6619845cd0c1',
                systemName: 'c22op6cix55cvmm2gg2e',
                executionId: '78ccbd24-77fa-4dd7-8db7-f475e5c41e22',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 10:15:28',
                executionMonitoringStartAt: '2020-07-23 13:00:37',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'CANCELLED',
                name: 'j7t61irv6bza1fnpe8xqty149axs5eape4enrwjewfgv1e3wx6u99nosx3vogvbwatow1ey17qve0eiu32e5zjth4w1a06nxlvah3tw1x8ivwsxg8zj8dhcnv45vjdikxx03hv6x5z63o6x3y3to0vz7h70lsng4s7vdav1fdm49ry62donqdgvn6e1d2b043a9cacda1ss1hlc3bab4glmxy2jcp5y4s1z2za5y33pdqvhkwquko4wtn88eee0',
                returnCode: 8632192923,
                node: '611aiqywyy06vz42dy48c7om4sb4p64hc8f4d8b67spywutnk1tfbcg6709wcjbiep98xy82kdqtmjce04ath6azifzj43nsod6365qfgc85h9ctp93r78epps2xfbwapav8os9rm066u90lr9bfrrk65x80sq5g',
                user: 'hjzb1kqfwzazzituy2vhqv3ktpefe54v271i5gr7udkgiwlnz7wjy0xz0m1v6c624xmzqu6nqs135j4a8wlb5rx4p5dr274jlz8t1gtdwxog2jpyl3dtb6kaldq306e1bc7crzkrsop5egni2dzv8keetpnor6497uygqul7jtbewsw9jwr2rcqfazci37ac2s9e1nkzj2mcmzsg8ylsmbdlcumwh9l6pkipfjxmxdsqv40q3uop16ol8wr3b6s',
                startAt: '2020-07-23 06:38:11',
                endAt: '2020-07-23 11:16:47',
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
                id: '8d138995-0002-4206-98fb-3578d373a05d',
                tenantId: '4e5f90cd-2299-4fab-80cc-1bcae2e6cf0d',
                tenantCode: 'gtx4ez0dt8c3l1yka0hymehc848u6b078k5v6lp4jt3gku24tu',
                systemId: '2abbc253-ec0e-4cbd-9eae-6619845cd0c1',
                systemName: 'qxbp0hkj3nqbdqk9n0y9',
                executionId: '78ccbd24-77fa-4dd7-8db7-f475e5c41e22',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 08:52:57',
                executionMonitoringStartAt: '2020-07-23 12:51:48',
                executionMonitoringEndAt: '2020-07-23 18:02:32',
                status: 'COMPLETED',
                name: 'px9dsydk278mk2amfhrm74stavhfi00nf1axsyuown30bus5pxgtau8691nkjo7l17mtnnwf8l3j31jmt0qgtyvkvpwgqyep7vcvbkm15iyxrf0eq1v4zvi5fbvvdoneof54hp5wd26vm69wv2xuciaykpa6quwrp3bcb0v61h7d0tsom3xz97jk5e0h1zixbazcddulx8lwpy5s31ieluaj0ksi4j87tkl5za2cwm43aey6ibrx15r919xsrgl',
                returnCode: 8476178701,
                node: 'mgnk01202re4pcnc24z0tbx49bvpm5r2za9k4ncdhfeiik4p9fwablcqqdwwebwx8h90mdx4dphdjyagpzlqy0yq8xtbvitew8uhxb7wnfjmcqab9qlu7xrq0y1temx6xdj3625s3y9h6yz4gyqrk8zxdetq1ihv',
                user: 'kzyz9q7pnzom34kc7c1vu7mtsvyg1epz8t4wvlkt572835ik7ip93dzga9k113c7b0mo1t0t1nvftoe331qd8aqp4b457mnm757d30koua569s7xgr95i0puncahhg4k6syhq3k3dim79ggznecaq99mndzh136dm12zkbu5mpjxdcqcjmsn7fk5b408yt1ug7mlenkd7mp5fn3ugibcp303tu5f9wntmy9mv0if8f8ocyz8b4hy7qkl0zh6my3',
                startAt: 'XXXXXXXX',
                endAt: '2020-07-23 00:08:25',
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
                id: '8d138995-0002-4206-98fb-3578d373a05d',
                tenantId: '4e5f90cd-2299-4fab-80cc-1bcae2e6cf0d',
                tenantCode: 'b5rncubw8ngd7aawqxc0tpjizpyveu0rtfe1htcj8igl4y49yb',
                systemId: '2abbc253-ec0e-4cbd-9eae-6619845cd0c1',
                systemName: 'fao6rx5ibjewke0c6474',
                executionId: '78ccbd24-77fa-4dd7-8db7-f475e5c41e22',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 14:50:20',
                executionMonitoringStartAt: '2020-07-23 05:34:20',
                executionMonitoringEndAt: '2020-07-23 05:48:53',
                status: 'CANCELLED',
                name: 'bk2fg228yemh5s4jc8n20ukke9xq8wd37qobydyukqzgxujpilmvvkpm1aam55jgbdv4jqk69axzwm0ehp1tvbbrugmcgq42cd6dcow141suvqw0ggqqbhh9695556ym35sq5wx1t873l5b1xlj4y24h27s3ls53xr943bgvajzrqmz37ssyl4cgx1hldvl476ar3yulxsuii826q3exw8ioxl42oaj00kpoisfjzueuequb4qemqycto2gx5bc',
                returnCode: 7838727118,
                node: 'rlqn1jggj0mgevwb5202tmc5un2ord2m0m2jm3rq6ndxb5keffvu3gfqrdjeenve97nkeqhs9cstlfhm5h2stdktvagfz44vb04kmq2fkss7e7i27w3ow5ctbzgngn0licnre3ckszredyz4gchqh0u1bf3l104m',
                user: 'tjdulrowqytl20o4zxf32qu06o7xrqraticu92t0mfy9xq0lo1rlpwky36i0fm54178n5kaoz1q44ny0e6855qcitmhhr7mefoqdzlwz9dy42p7bra3yvrtt2rv2w1il72agba6euuq15xpwjf6e840oqx7967n0l4m0itc2j606ficqep2q2cpjsmaebsmdri9y8wzxy45w3p4oo6yvmddj9nziqbqy03ieo37mywbkolnoo480500d8ywm5oy',
                startAt: '2020-07-23 03:47:07',
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
                id: '8d138995-0002-4206-98fb-3578d373a05d',
                tenantId: '4e5f90cd-2299-4fab-80cc-1bcae2e6cf0d',
                tenantCode: 'y1280lsacxk88kieuzwtlpyryvh8hqoi4oqzc85kj3mlf6zla2',
                systemId: '2abbc253-ec0e-4cbd-9eae-6619845cd0c1',
                systemName: 'm0vsfp66sj0rhw23beg9',
                executionId: '78ccbd24-77fa-4dd7-8db7-f475e5c41e22',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 09:13:35',
                executionMonitoringStartAt: '2020-07-23 05:15:38',
                executionMonitoringEndAt: '2020-07-23 07:08:07',
                status: 'ERROR',
                name: 'e2z8bua9mtj4mh7pzcfqrelhusswf47r4e2xd8uxpgconv57kkojjk9ruw2fohim03yu97mspbdxqy5bpl7nc0z772303jbz6cpke4k40qpzhek2a61qsne2btwxfu5bu1m84cd61xbpq4imhghulmptltl5dq95943949da86feymtdi6c0eypairbeluhgyircoacrpllktmdzv62670al0dj4e90fl5xt27gqhqf6cdguqffbmmkddvqdwhj',
                returnCode: 1615305783,
                node: 'md2pgawhb84brieupbydtg44el40mgaqw8zsgs9dpd6p04pab5mwy5900s4g1qt8pjspn5cks53t86hg13gjcm3lp5lcts3kcyuhw1fkfwx990wtfhqe0niakqampsv4y39r05wrr5ydtpigr1085cywjysokdfh',
                user: '6f0zhhm2os834m9j4co7w3md3s7e55fx2t6v0r4q94hcaal5dj9togxwsuv1z1z4akau4tua6m3b2tnv7cce1swjk9156mr3dfzr4ispwevfgipjax74vgv28e1fse3on0p5u9e67k9fj31q2drhwyunar6qmo2volqpxbamlrg729mqws6phauxkjbseyf8r4dxxi2szu813c30187fzumgo9h8ir87uj6kyfhu4i54p6dok2ebz4h06gqv8zw',
                startAt: '2020-07-23 13:43:43',
                endAt: '2020-07-23 13:05:47',
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
                        value   : '8d138995-0002-4206-98fb-3578d373a05d'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '8d138995-0002-4206-98fb-3578d373a05d'));
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
            .get('/bplus-it-sappi/job-detail/8d138995-0002-4206-98fb-3578d373a05d')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '8d138995-0002-4206-98fb-3578d373a05d'));
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
                
                id: 'ce1b2a51-ce4b-4660-a279-215fb2c7ec90',
                tenantId: 'fe229a84-af27-460a-b38d-e33a185fff73',
                tenantCode: '8kqaeflywgqby0cdostq2brtcoqzbvic2srcykwfy3l3ml25jv',
                systemId: '8cc531ec-94ae-4966-8bf6-e7a81f216c23',
                systemName: '2b6pu57dkj53934htd1v',
                executionId: '720ce370-2599-4013-b867-5a5f32f3c023',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 05:39:59',
                executionMonitoringStartAt: '2020-07-23 10:15:00',
                executionMonitoringEndAt: '2020-07-23 00:14:40',
                status: 'ERROR',
                name: 'kmjeczab7a4rfk3wj2i1m9i73kqsg46oghl2g8cfe12w39nuf9bhqxtfycd197teo86bptcwwkpshnm2d102caiiibuy3wqn8kxn1g2zp00mpxopsb3lf8fh7hc6m68hs90nu6dow4h7kjdys32l99w961mao8z2lsxwc88bufi2kuu4bnoe1mca7e3tc7w9jacq8al290r9jhlfsluqbv4rpjev47r8hnnpin6wk1v65nbqj6gt1ozgygdmqxh',
                returnCode: 3871716876,
                node: '3qlhkxdq0h8pladv0uwods420mep6j8ywv7tw9azjyfg4x2u31enpnjrm3ilkul8beefzxkh2jghd8euy75p25x5k64uwk56di4yoobec0urfyyhf0wylnh3y35lbgid6pqu9n2kag3nbyydijt17wbtk4rwiuc5',
                user: '7789hmmvj9wh6dzupkw4p6mcu6rm111dnzstnzgvijwrgwle3idvtveyeg0jazg9n0j2ot8pzhktqsj4gskio9n1a2hgo6ad5cpos0d8xfsuot60y5qbzscayjw6ct5npjq3urts02wotoyp36dj8e6hy7z4i5empgita7f145pokzs47afu6yuxsyvmukymocbjg1ua12tw201jf65fh5bo1hzpvkdb79rhl0fmi81gee4tk71pnjk7t7uoz71',
                startAt: '2020-07-23 09:50:42',
                endAt: '2020-07-22 19:12:31',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/job-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '8d138995-0002-4206-98fb-3578d373a05d',
                tenantId: '4e5f90cd-2299-4fab-80cc-1bcae2e6cf0d',
                tenantCode: 'nppf7gfsyux6rzshq17wo9dbyve8yhyfoqa5g02aysb6ugvpoa',
                systemId: '2abbc253-ec0e-4cbd-9eae-6619845cd0c1',
                systemName: 'ytzfoo7tc530kbcenh51',
                executionId: '78ccbd24-77fa-4dd7-8db7-f475e5c41e22',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-22 21:07:19',
                executionMonitoringStartAt: '2020-07-23 09:10:17',
                executionMonitoringEndAt: '2020-07-23 05:30:49',
                status: 'COMPLETED',
                name: 'u8hhfctg28l49abzs8i909k7o6t9kb0poqp1124fwhj7rppr26pjh2slk8j2r8371uenu3zrqi68jdy33kxlvok92uu25ka1mxy6zrpynltow2yj38ef82ij6qp3n0svtchlesn2v0yfhzyddgoybkcm8e90bfuetjc8g7kadhxe1jcnm7g9tvkb9bh79fe6ljugyd3hohi8uvh7wccv4c76okklloi4c46ifvun7fyo1o5tgpayplrpccgtphj',
                returnCode: 2271982905,
                node: 'pb6m5f24pcxssz6c1qxvevymqukixjzzkuzhkoom4c7r65khlw1pmmqybg2cr6ldfa1hmyfi62po9jvef6h6n4fwkmfvh304iw3f1bzl0lxztsqgv78ml0816o72hz9uvvl79qa9194kfakk1mlqex86y24yxgtw',
                user: '8ufp8tlhojhzuxqadho6cz32d3wmykatfrvzgzzz0scm1j62g192sn6oe7dqw86km8j7uchy9bukz6rz9frmtzh8ll3xzfabe145f2jldp2jm6sa46hgt3dpq0g271bp0vjptisdptta8t13q73hzogukohh5usymyipy4ik1syw6rb47k7jua3hvb6ak7xcc0t3pvp40sr2uolz5n113262ur1gxhnraxcoggofavq7tvgzcwfouaw7w6dj6c2',
                startAt: '2020-07-23 16:03:24',
                endAt: '2020-07-23 08:54:59',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '8d138995-0002-4206-98fb-3578d373a05d'));
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
            .delete('/bplus-it-sappi/job-detail/8d138995-0002-4206-98fb-3578d373a05d')
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
                        id: '7edb24f5-56ca-4b7e-9028-5b0948ef54e8',
                        tenantId: '4e5f90cd-2299-4fab-80cc-1bcae2e6cf0d',
                        tenantCode: 'f69n3e9ewiaj6utgmi7fqwpwnhh3jx90azvaf8g4obgrf2sf9y',
                        systemId: '2abbc253-ec0e-4cbd-9eae-6619845cd0c1',
                        systemName: '0aogke0exu6w0f66h0mj',
                        executionId: '78ccbd24-77fa-4dd7-8db7-f475e5c41e22',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-23 05:35:39',
                        executionMonitoringStartAt: '2020-07-23 05:15:00',
                        executionMonitoringEndAt: '2020-07-22 19:33:30',
                        status: 'ERROR',
                        name: 'qbozt4w5esuo93y9w9pwq36nbte6r9rlvpe6i0b9ow36xmsajgw523cndnshepl6fb42j2bq9mko7konwpmfijfyu3clx97z4ui44oiulkmvz1zjn9por1i831i653dqg3hjb8ilppjcd9xrutnml5nj3wjqagas5glv7932lj655kydyw143b3c94jr9kqqxinefatcw7z42pzprukgco7cpo4izdd7z68glgir9l747mgtzhhxm0jx96bbux0',
                        returnCode: 4696146386,
                        node: 'ilwlmiqi155flh4u2n2ksnx5g008614ldn3dzw7erp9i22wcolv1gtqa1mgizpa7ktmyuuhtsqrrfo80igy3ognf86zo84vvi117vn1s76o9snzl2m75e680rxmvhycgz1ndm2aeobs25qy3oopn0b6bf2m96ixo',
                        user: 'l4kim9jizii1gakgfu3jr5crx1hr6jahdm53oduwhu2ry86prxeh38b7902fnc0bv2cjld1xtd7t9679o0j3pei9j7bt2pxbbp3spnhkavorarekqd6qcam7ixxal5wvgf5l94h0fp9wjgcquka6fps5youeseasgcw4dee90nqvlrzxmzi8hl331cxoqu06m39otailt5ow0n7rkpqie9wirc3nm1jk2yztoqu3df2bvrrrnf57xfpsn7ipvsv',
                        startAt: '2020-07-22 18:35:15',
                        endAt: '2020-07-23 12:04:41',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateJobDetail).toHaveProperty('id', '7edb24f5-56ca-4b7e-9028-5b0948ef54e8');
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
                            value   : '8d138995-0002-4206-98fb-3578d373a05d'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobDetail.id).toStrictEqual('8d138995-0002-4206-98fb-3578d373a05d');
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
                    id: '8d138995-0002-4206-98fb-3578d373a05d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobDetailById.id).toStrictEqual('8d138995-0002-4206-98fb-3578d373a05d');
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
                        
                        id: '58051b0a-8b76-451b-a5ad-39e4aa7f5e7c',
                        tenantId: '7a8f4465-62ab-4880-878a-5f968de417c3',
                        tenantCode: 'z8z01z04p6ga6qb6aeat00hfc3jwz6wcdqb3mcn4j7iriudbh1',
                        systemId: '63fe66f0-06af-451e-8410-2a46d04c6fa1',
                        systemName: 'mau2nfq2wy5ns8vu0c9f',
                        executionId: 'f3c37877-72f9-456d-8542-f1dad34034b9',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-23 14:47:39',
                        executionMonitoringStartAt: '2020-07-23 04:22:33',
                        executionMonitoringEndAt: '2020-07-22 19:23:05',
                        status: 'COMPLETED',
                        name: 'nr48etio304cdw0mz82isvb37cbasjvaqpt00gfyy7qkcviwk3hdj15aotbuzism0i6xa7kt41tywxwvlu1uirn8btph9bhzf3kcojku2wl0vyixhpastfzci780571xaudrkmkqacg4ldg18wcc2egxnbl3aifkqlhal5xxp0sak2swq471ije39j63tgnj9we6eoiqmyptbrz9dyj1fgqhxfnpdilhgmczgs8jq4lcm8wzb81bqnq13jov46x',
                        returnCode: 2140339849,
                        node: 'kqoy5fxhrizfhxzlvgzqan13ln6yy9uem97bvnjvyvyl06ohyf24o9yygx6qemq2aa44skx7t0okd2upnrtingjbh8c7mm4z74cskouaa0u8issagbiqc7knxfou6arwstpy7xmodze8b55zqi9gyr7ehs9iinza',
                        user: '110akxbwsfgrxnskv0kgtq92h0gortz5tuwk703hg3uwo1v7z3xc452vzfhg8cb3n5rh3qagolnsgpchykgfkd6p61wie1e74mpo6s6u7kcckg53fn8d7nl674zeqbof3t7gtfsnxy6r1tnj7rwanywe5ybwwpuce52of9g9rs9ni60of3v7sfyygehnnnutj9bflb69sr6797e4ksxoi6xnsc9ehbq2gwhok6pgr1wtn8pcqs1ikfjdx5i5qpv',
                        startAt: '2020-07-23 01:44:37',
                        endAt: '2020-07-22 19:41:22',
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
                        
                        id: '8d138995-0002-4206-98fb-3578d373a05d',
                        tenantId: '4e5f90cd-2299-4fab-80cc-1bcae2e6cf0d',
                        tenantCode: 'p642lc79xfqy7zxhv1lelt5ino4s17zvpss1bnzrt6c1jckiwq',
                        systemId: '2abbc253-ec0e-4cbd-9eae-6619845cd0c1',
                        systemName: 'nwyw5jr6xjxzk2zh0mj3',
                        executionId: '78ccbd24-77fa-4dd7-8db7-f475e5c41e22',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-22 18:59:19',
                        executionMonitoringStartAt: '2020-07-23 16:26:47',
                        executionMonitoringEndAt: '2020-07-23 00:30:54',
                        status: 'COMPLETED',
                        name: '2zcqels3qw4t79v1b0j034cekzn6fu2pdaa3ttabn4hy9dmc5ff0s85a1da6bmpb3kgf5efpu5mwxur8ixmbi9nzth68gtzkzq0dbh75kw5bdy6k1u1hm8z23p279anik3kmlrv3nqcey66l4fvm6k5aavja6ty0mpcvx5jguks5ifarp5e6hf6shupk8loklrmo99ydfyercqpw3eqpxk0gfzy36ieyjrm5ggvw9v4zabkr90i7kct1ikxdlic',
                        returnCode: 4152904351,
                        node: 'ocg7uy0ruwo9n4qy1gzc3cqm3wx0cg6hkyk58at4eykbamsghcuqp7c6e4yanqk9jt92ksxvtihrpo98m0c28gqgbzxg05br735jz81vytfzaexg2m9t91nqbvmp5wsfvea2y2zfc4nk158f61or8v8lk27z919o',
                        user: 'eikibu934y3dp4o3y6734r52mvrjn7v4f9an78c7yig9nxof8or5kxikcncfg38tz0bhjbimbops32h9anitcqvjzbjnrt88a6q8go29goix1dcuhjmghrdakeaonvfl9d9lh8bm9qu4h8cjwdl6qn9ooujhmanes6da2kiea35i9kc0p0nou5v0epd540jfca9v2mj8bz9pgg21avupxcedht7s5dmere2cv5k9jwpcwz3c5h58fdk3fwefyap',
                        startAt: '2020-07-23 14:16:48',
                        endAt: '2020-07-23 05:47:26',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateJobDetail.id).toStrictEqual('8d138995-0002-4206-98fb-3578d373a05d');
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
                    id: '8d138995-0002-4206-98fb-3578d373a05d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteJobDetailById.id).toStrictEqual('8d138995-0002-4206-98fb-3578d373a05d');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});