import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IChannelDetailRepository } from '@hades/bplus-it-sappi/channel-detail/domain/channel-detail.repository';
import { MockChannelDetailRepository } from '@hades/bplus-it-sappi/channel-detail/infrastructure/mock/mock-channel-detail.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('channel-detail', () => 
{
    let app: INestApplication;
    let repository: MockChannelDetailRepository;
    
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
            .overrideProvider(IChannelDetailRepository)
            .useClass(MockChannelDetailRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockChannelDetailRepository>module.get<IChannelDetailRepository>(IChannelDetailRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: 'a32a2837-b181-4e09-aa08-c7e5e9a168f3',
                tenantCode: '0onw116sdo2ou8frty2hpgzoeirim5ll62l4o95xzsmcv82rqh',
                systemId: 'f07e6293-cbed-4b64-9210-a1124af2ec75',
                systemName: '4azeahcrnlqsgvvpht6v',
                executionId: 'd26cd44f-808a-4dd3-8a60-bb6db1d079e4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 08:50:34',
                executionMonitoringStartAt: '2020-07-27 01:48:26',
                executionMonitoringEndAt: '2020-07-27 03:46:13',
                status: 'STOPPED',
                channelId: '62fd8a68-8fef-46a9-9523-e3cfb6cc6795',
                channelSapId: 'bhyp1bl0kuagl1wf4zjsmqwpxop5f4o5ob0v1lpvhx2djedrh1',
                channelParty: 'nv9q5gi6rnpt09xv0ugarovi0lu0te9xgqwgh60lyvl8acpng69zg8gwktybbwbpkc6xvdsyhd7201gbhuan9tkplquok0iidkyxohbgaxaiyrvvxzmmb6tyichj6a22h95mvbrmglgvj4izyxlvgppinj807yas',
                channelComponent: 'ckoqmawz41rafqu2vxkds6gqqb8l29n0pp8xpr2zsi2d6q9l2biii57rugig6yf0igabk75o8d2162ymchamczqpqdpt4ytyukkc3qixdy044sj4pv7a4kg5nq8002m8s5eytq9o2f0ncxwi7sc6ihe14ipgocut',
                channelName: 'vfqvm2c83vepgk859lmp9wury9ei179eaapxbmstifs7nnuvmxbiebrbdftddqxyh0wjd94w0zcji6elezx11i5pdyzb847xapq6j6rejr3f35x9281q6r909ocppraxygvdvo4m8snt56flhd7zqi54v1rvqm3f',
                detail: 'Magni officiis accusantium dolorum consequuntur voluptas rem. Labore velit eos provident voluptas laborum laboriosam iure. Est error ipsam molestiae id. Commodi maiores aut saepe. Sunt et est.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: 'a32a2837-b181-4e09-aa08-c7e5e9a168f3',
                tenantCode: 'd1doni492z5ma7395z9iq9r76gc3dq564geolyhhrmm5880dvz',
                systemId: 'f07e6293-cbed-4b64-9210-a1124af2ec75',
                systemName: '2z7827tfd0dja4jii8f0',
                executionId: 'd26cd44f-808a-4dd3-8a60-bb6db1d079e4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 02:44:23',
                executionMonitoringStartAt: '2020-07-27 10:50:23',
                executionMonitoringEndAt: '2020-07-27 10:07:54',
                status: 'UNREGISTERED',
                channelId: '62fd8a68-8fef-46a9-9523-e3cfb6cc6795',
                channelSapId: '6joq94ovzopbykzltxe7gf1ykqi813pjmhg1zwguecuc4iynm1',
                channelParty: '8m48wj80sj8317m2m52f9bder2ssriax6f4xdphtcymaswkqrva3yy7p8hm6dflwytbi7odc198jw04iag5y3zbcrw4q59ua4dx14glsjt3ozj0tzp3xk73xnac7dy271xwos8zlup6xd3x0jmhk044ybfyrkbmm',
                channelComponent: '5qwjxczcs3gdsd75yit4kvo7lb6d0w2iduo8rzvlmxr4ocjz41ky1qgje2g735iljrf5fby8vc83v2xzi0isstbrb3r7ma9gtfashymakqya8uyz0e9xczw0sc7k8vq7lj9lki1lfia9oxrl6c51qpk37psaf3hg',
                channelName: '2c0gh7k700h7tjppcidn6le49m1oys9yb0qa93l76iptnoltyuwt6wrg5pkrd6beaa2pov6hz1gwxw0jiakk1ejmfzqhhbckey6g5p0n6inlwbachdrtkrkvke1vvdmekgesuv3p71qq8svkx5wmx1ibtdjdzr5h',
                detail: 'Et placeat aut velit dolorem ut. Molestiae harum voluptatibus quis. Omnis totam quod.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd35c0435-691e-4f46-b0e6-ad6c2452cc01',
                tenantId: null,
                tenantCode: 'nv73xeiq1w3hqz9gbi0byilctj2lp4n9i9dlmxq9bo1825050l',
                systemId: 'f07e6293-cbed-4b64-9210-a1124af2ec75',
                systemName: 'akixkicazsdtpn0fvm8a',
                executionId: 'd26cd44f-808a-4dd3-8a60-bb6db1d079e4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 04:41:28',
                executionMonitoringStartAt: '2020-07-27 08:42:12',
                executionMonitoringEndAt: '2020-07-27 02:02:12',
                status: 'UNREGISTERED',
                channelId: '62fd8a68-8fef-46a9-9523-e3cfb6cc6795',
                channelSapId: 'm5lie6osz4bilfe87n5alw96tc5fok81rlr32xj16yr7ner5f4',
                channelParty: '4udeps4qffwb34xtgsrchazwwzuhwk8txm8o2onyit3uy57ty3mrzuhlazl1y3phvzvvv9pqx0t9tx5bdw7u146ndbrd9d07kt7igb4jdny16vj3iq6pcbm8ajd4e4nai90obyzt49vuw4lsd8m3d5pj5j9ivv2z',
                channelComponent: 'f0cyzd9otz8za7kluswn090hfb9yek9d246shrnbafpjp5uevyhi5478oc96ggqv2yhnpc6yelcf8ptzekin6s5r6eejylo67v7spdnb67jw265honpgipxps5rnxv3za1h14z9kq1w35kxscril4uedlsz64i7f',
                channelName: 's1exwr6fyctfr85xee7zedxogqhp1sagvuxve8redc9udnt8y8buaey07d0qdlr9j3fj8lvoc6j55lh98zbvgzr80wzlcnw4reohhll35kfzryohxr5p56i4liz8tubxemvzd9al9549np6adsahe5fvdwb63dja',
                detail: 'Voluptatem corporis consequatur minus quisquam similique. Incidunt voluptatibus vel distinctio dolores debitis expedita velit soluta. Quibusdam hic similique qui modi est assumenda. Perferendis rerum libero laudantium officia doloribus unde ea illo saepe. Ratione quod quo at dolores debitis laborum quae laboriosam beatae.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd35c0435-691e-4f46-b0e6-ad6c2452cc01',
                
                tenantCode: '2wpvly6r18ubo790ll6xoche41mo80p04i15iaqcpkotmw31gs',
                systemId: 'f07e6293-cbed-4b64-9210-a1124af2ec75',
                systemName: '2v6pdvbdq1p1x7h4uyb2',
                executionId: 'd26cd44f-808a-4dd3-8a60-bb6db1d079e4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 23:23:08',
                executionMonitoringStartAt: '2020-07-26 19:13:09',
                executionMonitoringEndAt: '2020-07-27 09:56:32',
                status: 'UNREGISTERED',
                channelId: '62fd8a68-8fef-46a9-9523-e3cfb6cc6795',
                channelSapId: 'f5x3uqm9c2wjeofll1h5llc1j31w8rl4zczksf9335exskpcsq',
                channelParty: 'u5fjkon35hv5tgtn4q096derrd3v3u4m7qs0ntwc52t7j1j6d0ulyzyx7q6fczgm8a2pr16py2iicx7b5gbl34rgj5wy3zvw64x0kio0g7n3b6u8mp6twzph1jhc0lq23g3lgw4tt1zctezwrof3iki68zaxk6pf',
                channelComponent: 'eojm67poefz5n1d8gsvml58yh7265rp3p2trn4c7hhbv6nnusp78ngotj8ssl7yr53eowws70ib67ytuvpfjm1lz9vrwh3rwdmt9w5civ01x929zahic7me3yxj6la15gxt424krxov6yotdkarvn83wl03b2cl3',
                channelName: 'dnc3notowztch8hckjgoxs8fviqn0wc88b65wxk82j4f6my3vo2yff21at37hkmf550ch0cso1hjc9yq8vphb28dm5qlbewsjclfo8el7n147k2g3j5k8azjy5fk7ofltr8m33a3c3yfczb7g4w5a4xzyhwwig7n',
                detail: 'Hic voluptas deserunt odit ea sunt voluptatem non. Rem mollitia accusantium libero quaerat dolorum earum. Voluptates nihil suscipit.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd35c0435-691e-4f46-b0e6-ad6c2452cc01',
                tenantId: 'a32a2837-b181-4e09-aa08-c7e5e9a168f3',
                tenantCode: null,
                systemId: 'f07e6293-cbed-4b64-9210-a1124af2ec75',
                systemName: '5nfvp52o0vtfq8qd67jw',
                executionId: 'd26cd44f-808a-4dd3-8a60-bb6db1d079e4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 16:59:54',
                executionMonitoringStartAt: '2020-07-26 20:28:39',
                executionMonitoringEndAt: '2020-07-27 01:32:34',
                status: 'STOPPED',
                channelId: '62fd8a68-8fef-46a9-9523-e3cfb6cc6795',
                channelSapId: '65ksciqqgykihwm35riuce5t1ps35jb3kzwlomrob8z6wb7js2',
                channelParty: 'zoe0qkn0hrnh7tjd7uedu8wy5as3hz3g4mw8m1dpdl8n27x61nkencr78y5dhm95ai724ik3ve1ad2onv76h3q53u0klswfm1ljmwvggtwmku97fulmemz8lt9ewguatrbffgxaiazm44wipd6nvagmrj1chyesw',
                channelComponent: 'qj4d0848wuz1f9m2e986pr29wu25esa40j3yipq8gyoi852j9emdr77gh7svybldjfg5hejetjqw55npx3ebeqs9nt4lzucrsjyjq57qpyakxtaspdrdq8g55tqga9nd80wj7nfafj7qik58hp4di4am7mxhfz11',
                channelName: 'j5iw2qm5qp6qcs0uqrxv5py0748fv05amkcdtjlsxmmrtiio2occbifioqbs9somdjoyua1sggax7z7de1okpryyc6o543o9rl0gjlganp6ix2m4prvcy3obch60fujm1e9sgvo8jbjyud3b68hu6re5sika7mrj',
                detail: 'Omnis ipsa consequatur iste dolor eaque explicabo explicabo est. Amet voluptatem non velit sint maiores omnis. Aut accusamus temporibus est est. Quia in quos perferendis vel amet velit distinctio doloremque facere.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd35c0435-691e-4f46-b0e6-ad6c2452cc01',
                tenantId: 'a32a2837-b181-4e09-aa08-c7e5e9a168f3',
                
                systemId: 'f07e6293-cbed-4b64-9210-a1124af2ec75',
                systemName: 't02nrj7207b6p8bzw8v7',
                executionId: 'd26cd44f-808a-4dd3-8a60-bb6db1d079e4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 05:13:57',
                executionMonitoringStartAt: '2020-07-26 21:31:54',
                executionMonitoringEndAt: '2020-07-26 23:36:59',
                status: 'STOPPED',
                channelId: '62fd8a68-8fef-46a9-9523-e3cfb6cc6795',
                channelSapId: 'dmln5cy4grgjiz6a5m00t76evx7z3xb8c86vqs35j97izhbpr4',
                channelParty: '8xp7qugb4s0w6i3bx2b3vly4bd1wkv319nkul2zoe9huzxdqtw4bfci7381co9hqjk02723ac81z6pvej51bx7lipgmsivbm3rccl533xeewpz9lik6dwtfldxlzk0pl8yy9e4uxu3hui2w66ksm44q66pzkvyve',
                channelComponent: 'pc4rd9uzcn7rg5gj3noxygyf6wnfdp7eabt3adb654rhci99s9wagmhadricjyo7zo82qqlbptzktcfczvyt0s8xe1t5hoe70l3851u5ejv4rcds793zt3z2tupkx97qpyb56pbaob9tpftk10fghxeiz1kwzz72',
                channelName: 'mfmrm3xh05phcv69h2ptbfrrcmmz635ix9wmzeyob1eluwoty13xkvfaitac90p6hl0m223ul740k15y6t5tqx4gsrv8fu4q4tkybe1fwxyq2un7kzenbitotepqyhme7iq345iqie6hlomdilhpq2dks3urqq52',
                detail: 'Ut sed sunt unde et ea unde quo aut occaecati. Earum tenetur eligendi voluptatem sint repudiandae animi temporibus quo. In qui voluptatum maiores qui deleniti. Modi consequatur dicta harum velit magnam autem accusantium ex minus. Iure ipsum voluptas. Ut animi blanditiis veritatis magni asperiores maiores.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd35c0435-691e-4f46-b0e6-ad6c2452cc01',
                tenantId: 'a32a2837-b181-4e09-aa08-c7e5e9a168f3',
                tenantCode: 'nplvynpcsy4ibrgb4mnrgtbyt9mqyyngep46pj54pnd9f0ho21',
                systemId: null,
                systemName: '357d0mzwmcvfrhf1wtzr',
                executionId: 'd26cd44f-808a-4dd3-8a60-bb6db1d079e4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 06:32:39',
                executionMonitoringStartAt: '2020-07-27 13:06:07',
                executionMonitoringEndAt: '2020-07-27 13:35:54',
                status: 'STOPPED',
                channelId: '62fd8a68-8fef-46a9-9523-e3cfb6cc6795',
                channelSapId: 'bicfumuon0z6xc7ndq3jzdn31x7rinv7ucgcmugvgay6hqxr4z',
                channelParty: 'yme57tmfx5xuqkiwgus7pyiq74kwm4opxktu848rju0w4xvz2gz10fwdm8u45s11fjpq5o3qhtn5kw6753yv8upfj67p6jec4pn04tif86nokl4n869ileqjvv6d42qakqpnfe6aau6zigv8ntuceuwr7a8ftj94',
                channelComponent: '4fioqgbt5eo7hqqb5hv1zqegfioozol9nscear4n7y1or905vs491gc2aol7cfbz6zqiuynzjfvhdxxsmldjuqvfoe5tqnsqthvsvee4ie3afevbkzm15x8ekrjhocvsnofg0z86x065zbgag0e1tgkmm8nochse',
                channelName: '8q3v97pkmxlx9k176rbbgl4btt8b26fwu8k60nmmi1n10fe9njnl3jzfube7gevlwgcbu700y1ix6blb7k9myuyuxvgm5z9j2ie54l65mhf2dzv701tyg5rpu1jskcs7dtlkl3qadrsceltg7v01k6ba2d2dhl4t',
                detail: 'Quis placeat nihil nisi a. Distinctio deleniti quidem et quae consequatur id neque. Est labore sed ea velit animi. In adipisci qui ex ut placeat.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd35c0435-691e-4f46-b0e6-ad6c2452cc01',
                tenantId: 'a32a2837-b181-4e09-aa08-c7e5e9a168f3',
                tenantCode: '3sstb73gyt06340hxw86a4gzghow4mw38pienbuna04gqwppx1',
                
                systemName: 'erk088xauitq9dtgubeb',
                executionId: 'd26cd44f-808a-4dd3-8a60-bb6db1d079e4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 03:28:08',
                executionMonitoringStartAt: '2020-07-27 04:34:43',
                executionMonitoringEndAt: '2020-07-27 03:39:43',
                status: 'STOPPED',
                channelId: '62fd8a68-8fef-46a9-9523-e3cfb6cc6795',
                channelSapId: 'xqmaqr8x6y7i1oyncb0jkew11zzlxoe3it87uwkn5fwo4nhjke',
                channelParty: 'an57jkw4qlpjwmxzlxhox2wa70apmrz121nyze51meszi5fid81225sboz95fy5hah9z0ir3qjgzvkdscxk0kr1j75wj137y17fqfntf4rusotmadofe6nsuwza09e4lu7cy42s89pn38w38xi7gu4crkdbl6ue4',
                channelComponent: 'muj004de6pq60zlwvuyfhwpk4hny1janvryv7l1ouc5ebaozkd452sitpql75s5qbxoupgcgeo6qtik7yevtkacivlta0wjd4tgmmtopr5p3itte992z3zi8uisxk7ydswgwwa26nx2d237afil72v7548dpw9y9',
                channelName: 'ijh3n9rh25je1jfl66b46c2evgmenur06nd8lbhents7ny72ynho3shb9nr5p5x389b5x04ejcb389ld5j2mc4wqq3x2rq6rlf4lrdv1erqngs9dy476113l7t6sqma99ghfldetub81mq3yher2ll5xoo1j3p5h',
                detail: 'Eum illum adipisci natus consequatur illo qui. Fugit dolor aliquid aut quia quam totam. Adipisci nisi id et minima optio debitis vero amet. Qui doloremque accusamus vel sit libero porro atque. Repudiandae expedita voluptatem ipsa. Consequuntur et et et atque impedit voluptatem.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd35c0435-691e-4f46-b0e6-ad6c2452cc01',
                tenantId: 'a32a2837-b181-4e09-aa08-c7e5e9a168f3',
                tenantCode: '53uilbh18swk249s56p8hru2m2itnt5011ihdh8dwxpwettduq',
                systemId: 'f07e6293-cbed-4b64-9210-a1124af2ec75',
                systemName: null,
                executionId: 'd26cd44f-808a-4dd3-8a60-bb6db1d079e4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 22:49:14',
                executionMonitoringStartAt: '2020-07-27 02:59:27',
                executionMonitoringEndAt: '2020-07-27 02:29:13',
                status: 'UNKNOWN',
                channelId: '62fd8a68-8fef-46a9-9523-e3cfb6cc6795',
                channelSapId: 'zox501h6dko741pztf9cik5r1f76uxca45f13tgiptrr7i0hfx',
                channelParty: 'dmryzlfict9bjy8a0bkzlf1xiszszcotgciesw8x4wst6evfttlam1u9zfth8417qrmxt48vlx9v4ecdl6q8stl1bkooj2s3bmkddj4rj2qr6olgog2e8dj8unb8e483jvcrk34gab5imjuai5mluxvydcgueh3d',
                channelComponent: 'okvy62vmyf8rcpdwox0al15b1xpnlx59vehutxald14nqc0onh0ue6l9og05my4uww3ynhkjud6nuoieorjvk3jpzsw8qrqvgh7ygwmo2e4xxpo5dgjd4ngs1x16nr8vq002w5u40xqzyebkioqmfviw06h4et4a',
                channelName: 'slhs49fzrz3ooaghbue1d9zp14mc6v1l71yg0x8x2eamcdgc8r9qnpyoawaypcqlthyhu48h7ljwc30fpglj12l0orn4a9jsj00u241oacevkkk7rdfruq171vtcx10xa53enbigv1taqq5v7afwbpq4f0qcuhwj',
                detail: 'Deleniti repellat aspernatur quibusdam molestias alias voluptatem ut. Aut quo eum. Voluptatem rerum ut. Deserunt eaque in quas blanditiis et eveniet doloremque.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd35c0435-691e-4f46-b0e6-ad6c2452cc01',
                tenantId: 'a32a2837-b181-4e09-aa08-c7e5e9a168f3',
                tenantCode: 'z8o3q10dreaesefcabfelga3yb9gbffdzq0i4xkwq3yxpw8ku9',
                systemId: 'f07e6293-cbed-4b64-9210-a1124af2ec75',
                
                executionId: 'd26cd44f-808a-4dd3-8a60-bb6db1d079e4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 15:16:40',
                executionMonitoringStartAt: '2020-07-26 21:41:17',
                executionMonitoringEndAt: '2020-07-27 12:16:06',
                status: 'UNKNOWN',
                channelId: '62fd8a68-8fef-46a9-9523-e3cfb6cc6795',
                channelSapId: 'vb8a2p9xeed1290crmcf5m6adk03akva51k0dvur60vnk26r77',
                channelParty: 'x6djsxpqbvnr9bfz9819a1in99qfvb6ljiqy60xeh9y0daubl1776eq1rvm872pnkgk2wv3byaf2mblakz24tw8pt4xmqywwqb2yrzhhkca8nlwbwtdlvujwyhes82nfmrbyy9g2qyhkheysvby6l3l9wgmsvpmc',
                channelComponent: 'c3s46oq48qqij8zefhhps0oh0ndir1ivzrlhuoghda2qawxlsia1lzmusonlz217gc0nb2cnibwgdycc40w5gi8bl9foy2u9qf5fzdgiphyrlcv99qqcqxyvn4qusw67fpgexci66ui00tdokue1m4gzpd2anov2',
                channelName: 'tzoom8e0mqjioh4a11zxsw9qbt2tzhkd6s3334voo6o326qkyvwgnpteu508077093casho4ovs2uxgu12j5ywiavtm9ak4bm3agxrmehx2vofwy39016eia1nbt4k559rfeurbuu00mqy7j33hwiwsqgq099ngm',
                detail: 'Accusamus magnam consequatur aliquid delectus distinctio dolores quo. Distinctio est pariatur saepe. Consequatur et tenetur. Sed accusantium et et quia id recusandae amet dolorem distinctio.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd35c0435-691e-4f46-b0e6-ad6c2452cc01',
                tenantId: 'a32a2837-b181-4e09-aa08-c7e5e9a168f3',
                tenantCode: '64u68teep5qgmw090kob3j15ugqmktek3k6aoyxgkjs69yghrn',
                systemId: 'f07e6293-cbed-4b64-9210-a1124af2ec75',
                systemName: 'mtw3dti592poc9cjzlny',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 22:48:28',
                executionMonitoringStartAt: '2020-07-27 05:57:26',
                executionMonitoringEndAt: '2020-07-27 13:36:44',
                status: 'UNREGISTERED',
                channelId: '62fd8a68-8fef-46a9-9523-e3cfb6cc6795',
                channelSapId: '5ttotyonzrmdlqg655lxzne99hyjw0dteteoov8na9c27uo7tw',
                channelParty: '5g2edjnpijp6ur7xe40qxtb7j7kqrpkfw812dm2krrxf1qzf1qj52onq4v2zw95t3ztd2wt0tzth0kku2buvezymbibzcbll54iml3j7j0zxd9x7y8jcw9c9ylpts6v2j31dediv5zw51ntxp6cn9vy5xw4vrb1f',
                channelComponent: '9beqfge7tmmkxgp0m5h1g9rakx3b8z41dq6dtscx4985jo1n822ze99ia7fom7wl1px66pge8b8m6rlewnlh2clvd580bh51gqdf9haocmwtu99yaj23p4rqsfn5a1beohp1avcj25nk8spza72gnfbawl8mn01g',
                channelName: 'pc0zz9tu16zcjajlhs4wgh66mb54qbap0iwy1plk8vfnsutma0sx3yoku42hpw576a2yu8gpbtge1f2c2vqcpos0nan9bfquslwcv0b9522rrcv1d02l1jvs1ymbvhymi3fdsrklzmhetwuusrxln39pypr1eeez',
                detail: 'Nemo sunt assumenda accusamus ipsa. Fugiat numquam magnam libero sit. Repudiandae iste aliquam reprehenderit rerum. Tenetur incidunt dicta itaque mollitia. Est quia atque qui enim illum aut consequatur aut quae. Et sunt minima deserunt dolorem cumque corrupti blanditiis.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd35c0435-691e-4f46-b0e6-ad6c2452cc01',
                tenantId: 'a32a2837-b181-4e09-aa08-c7e5e9a168f3',
                tenantCode: '6cei0a07pbn6kkdczaw8mx64f12k6pic4kmoj8pndxh302t6la',
                systemId: 'f07e6293-cbed-4b64-9210-a1124af2ec75',
                systemName: 'loweertju54gnh6qm1ti',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 19:44:47',
                executionMonitoringStartAt: '2020-07-27 04:29:48',
                executionMonitoringEndAt: '2020-07-26 19:31:16',
                status: 'UNREGISTERED',
                channelId: '62fd8a68-8fef-46a9-9523-e3cfb6cc6795',
                channelSapId: 'qjis6xtemcvby58xadodn0ojxep10n4xsg45e2md5c6k5h6ish',
                channelParty: 'mb64gua4e3chirtqdyb242697vs39bpp4xdiwx97nhlo40kgdtw2evpl0rft4160sf9vj4qp6voiugizicqh9uuvnbd6zxnupewdhvv8akj8sv5syo6e138ntjv449j52q1rzgu6x72pgtvizat9w6d592wb6t31',
                channelComponent: 's8hp4y4q6j5ci6r3v6n8s47srikt1utgxl9vv2n43l70ueky4uahinxjjemnv27vepvszv5p51sm4eeeubehew5dpdh9lausbcnmltgn0jixip1icqauvvei3mx2tvjn2ybc62i4ek6ffa1yhyx9jpdceldw00ds',
                channelName: '0h7c9lptur2iw6df0awy4e00n5319017ypvk9jg10rwpx80engs9bpm0uvxr57yhue1jkdcsz3848xhnz539fq55uko8x4be7dql61ctiaez7qy6bwk5pgr8fru4xq7i26xpj9c37xl3hx5g7vub2ucgfprbcjsk',
                detail: 'Maiores nihil quia. Laudantium doloremque officiis sit sit cum voluptate ut est. Porro illum aut fuga vitae voluptates. Sunt ut quam quos. Ut impedit nihil nemo perferendis omnis dicta ipsa aut veritatis. Voluptatibus non vel rem.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd35c0435-691e-4f46-b0e6-ad6c2452cc01',
                tenantId: 'a32a2837-b181-4e09-aa08-c7e5e9a168f3',
                tenantCode: '933hyh6z2ggxrpantus3s923r1fy5a7xydnbq3ltfs1sdm2hzx',
                systemId: 'f07e6293-cbed-4b64-9210-a1124af2ec75',
                systemName: '63pwfd9eueg4t8se86qq',
                executionId: 'd26cd44f-808a-4dd3-8a60-bb6db1d079e4',
                executionType: null,
                executionExecutedAt: '2020-07-27 10:39:26',
                executionMonitoringStartAt: '2020-07-27 00:30:53',
                executionMonitoringEndAt: '2020-07-27 16:59:07',
                status: 'UNREGISTERED',
                channelId: '62fd8a68-8fef-46a9-9523-e3cfb6cc6795',
                channelSapId: 'gob7vwa90zerb6rdh6cduu2p6msn2u3sxde1q49znp8l41tyr8',
                channelParty: 'zt1ag2hu381ihmybvr5zmrdj3al8as2gfhziswv89a13fob6g0c1urxqt722fshzo9rr8sb9t3rwh9nz7d7nk4j4slykbo8ojwpytdtt10ajb7ysnd8pbbeet3oufm06h9robnm1xv2cnzqprj0tx6dv7qbm8jfq',
                channelComponent: 'mdfesllluthco8btsfdb840ts0xdf213k5qgm6b9r3gdxiw7egnzsvorxm7fug33qcq8lj2i6s6dtv6lbkz334e1i336e0y26jqnrmvrhykjbffde6gbc8of9sjwn6zyvqdjw010t61ss79bphnqksovl4cbemhx',
                channelName: 'fa7ihd1tcn11zcf91pzfzwdz5cn8zoqd7tx98i20f9krvbsmc5gbttqftgf6oqckc2qsq18osfhnrkegf6cet60npbl0784igbfn0j0sx58ytuq18b5j05m7lt22k0iofuwa21r75qlyoxqlrrmboud3p36qox47',
                detail: 'Dicta repellendus ex cumque ducimus vitae voluptas eum aut. Alias quis laboriosam eaque delectus tempore quo. Maiores occaecati culpa similique cumque iure quia consectetur similique. Quos quis ea autem.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd35c0435-691e-4f46-b0e6-ad6c2452cc01',
                tenantId: 'a32a2837-b181-4e09-aa08-c7e5e9a168f3',
                tenantCode: 'pdukdb2k9hnf231gpc9jgpsxh4d159ivqios6ewib3wapailzz',
                systemId: 'f07e6293-cbed-4b64-9210-a1124af2ec75',
                systemName: 'b8fvxcvn9ikohijty2uk',
                executionId: 'd26cd44f-808a-4dd3-8a60-bb6db1d079e4',
                
                executionExecutedAt: '2020-07-27 08:01:08',
                executionMonitoringStartAt: '2020-07-27 08:31:46',
                executionMonitoringEndAt: '2020-07-27 05:41:50',
                status: 'UNREGISTERED',
                channelId: '62fd8a68-8fef-46a9-9523-e3cfb6cc6795',
                channelSapId: '2hx2b3bzao3i89i4wahj60j7jfws7uwf8uybdm9qd3zubc3f07',
                channelParty: '4l3hmgk87h64vt5h2r9zeli92p2mjbfc0fhikrrayukocj3vpj53ii57nnjc48xhtz2ql4myaigfictnam11phd8vbheprct1x24500omgurwepwxnx9j2eaoy2uq9oyfd4wpvytqy526q0mof78jwgvcurfm22f',
                channelComponent: 'vlgp32wr5dt3z5ktika32ks9kg4qc3io495qh90ikcmvljgsvqkfv6a21sbs9k2z5y9uy5oxuvlnb80yrldf7zphmg0k08b8ci3o68xzcrqqbp7oshbflnfz6j75fn3hn4sqodldhej3cdfuj80vek5nbwmup28e',
                channelName: '7ilmc84ne62sy5zo572j4yyd4v10ifa7gg0ygkxflbnyuhdr5chvnupkyuiuqr3f6e2nx7ovmzfveyxrqr6akivqw1q9oep0jljy332ap5cqu0vg9gmr2y5hpwdsi965y9c58npqr4d5f9q5caoqrw85p9phlxsk',
                detail: 'Velit fugit harum eum sunt molestiae qui eos voluptatem maxime. Iure numquam ipsa dolores dolorem consequuntur sapiente quo temporibus et. Et cumque tempore eius quisquam ut ea mollitia.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd35c0435-691e-4f46-b0e6-ad6c2452cc01',
                tenantId: 'a32a2837-b181-4e09-aa08-c7e5e9a168f3',
                tenantCode: 'd7u5qoq0nfkvflsazsegicc0up98mbtxt2j7tahbq6qhmpj3hj',
                systemId: 'f07e6293-cbed-4b64-9210-a1124af2ec75',
                systemName: '67u1nr95ibjkaqlat1f0',
                executionId: 'd26cd44f-808a-4dd3-8a60-bb6db1d079e4',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-27 08:19:48',
                executionMonitoringEndAt: '2020-07-27 05:02:18',
                status: 'STOPPED',
                channelId: '62fd8a68-8fef-46a9-9523-e3cfb6cc6795',
                channelSapId: 'zrgc83o42pyfir4wxmk2tws5zsnyk58e1bp26fhvibi9cts27j',
                channelParty: 'ej69079h65h8cktbvv3vltssznds0gnblzqg8ugda1zhrp5oiqy4lsdxbjhdf2jjw234abi2d8qyvu3ozkfuzcairpqh4fuzfjkowtbzmgrb7lvbf484wmye606to4qwolduym3azrtfi59gocf6l5bsj7gs3ddg',
                channelComponent: 'm8cethbhmmm0mr3xm8n5yqt3o82cy7dhqca477a1dl67u98lc2paa39f425dbc2fbr3dgexv74i2goav7826fc0pzzcgqao7817cxjcznn8pdflx0y4cvkmhu11ef1pmucvodk4q9e7cgbfkybkghoehahagpslv',
                channelName: 't3sio9cycvevc5c90886n0n6f3mzjge63v0bidlqoo7z8yrlfyk0avmgg0z46zkrarazb6ntn5f1r2cqvgf0zn1y20hptfg16ziuue6duc87cbvgjn1ocyvhgsr5abu8sm5ucu84urf8l0sfnzmgvxmcdor6ynl4',
                detail: 'Enim omnis repellendus. Nesciunt sed veritatis molestiae id rem quis ut sed. Mollitia aliquid animi expedita molestias et quo labore. Dolores sed incidunt vel et. Saepe quod voluptatem illum id inventore.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd35c0435-691e-4f46-b0e6-ad6c2452cc01',
                tenantId: 'a32a2837-b181-4e09-aa08-c7e5e9a168f3',
                tenantCode: 'ffkl48k5cfz1zvawwj8hrfsa5ckl773bbm3i8zqcb05gkwrabd',
                systemId: 'f07e6293-cbed-4b64-9210-a1124af2ec75',
                systemName: 'rtg7uo8uak02omgw73od',
                executionId: 'd26cd44f-808a-4dd3-8a60-bb6db1d079e4',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-07-26 20:45:50',
                executionMonitoringEndAt: '2020-07-26 23:46:38',
                status: 'UNKNOWN',
                channelId: '62fd8a68-8fef-46a9-9523-e3cfb6cc6795',
                channelSapId: '0o9a82lysx131pt5zy8d2gdfinln32gyoyksaajh7gri6ihmio',
                channelParty: 'g29hdu5kxiqopgzzlbrddx9madxqskcnpl5xxdmz55v0aj63s39itww59e8fvrt51p44qon7i1yxs8exy8vysob3asisp155z8v4wn8u1wxsy4puf2pawh7s6z3xq1qz84jji5fc741og8tdbadqlib2q1zk7tbq',
                channelComponent: '3osvyhiomypiklwyrlczg5ny2jg4h1mi3gocnzay1h58w6y4n62izh29vufiah4oixtg2dx3phn3n27mhp4nlgvd25bpo46g17upigxvynowtwxlegdqyfkrmz58wgv45bwkzsyzhkybgfviccyhccqhfij8bcjp',
                channelName: 'xe9d34aucpzxz84scwuk4c1ozhwu3xriy81oltw4vt4qlh9ong4ixinqism0fo6qc0k84q10tctrdpwihodz5w9jwwkcagamub4j5k804accvja6u840e7dnhl1zv1889crgw2bv21vfgu37yrrclmatjhijokuq',
                detail: 'Ea maiores rerum earum voluptate. Illo et hic. Et voluptatibus itaque eaque et est quia dolor est eum. Numquam voluptatem sit quia quidem mollitia iusto tenetur quidem et.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd35c0435-691e-4f46-b0e6-ad6c2452cc01',
                tenantId: 'a32a2837-b181-4e09-aa08-c7e5e9a168f3',
                tenantCode: '15soqduu0mik43d2f3r9l4hktmytjtkp6q0e2iwd86zqcjkjze',
                systemId: 'f07e6293-cbed-4b64-9210-a1124af2ec75',
                systemName: 'plqwfa6e0piq401yielh',
                executionId: 'd26cd44f-808a-4dd3-8a60-bb6db1d079e4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 02:36:15',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-27 01:04:56',
                status: 'UNKNOWN',
                channelId: '62fd8a68-8fef-46a9-9523-e3cfb6cc6795',
                channelSapId: 'dzcol06jwtmhi7nuranr57j9mgafizk8zmyjtcpbdabs3nxcph',
                channelParty: 'flom8xmpbkzzjn1w9nf4mfc0lgz1dl27kals4oegy96phwjuw0pru4gj6gxkmzh0hbdx4ov03mfzmo2cvkehdgs6wxu6hxj7hhrzy2bhgzj73f8szz8c5h2dtmi82unwfydsw2157vospt9qbkw38q8wcy0r4huo',
                channelComponent: 'hodl5uxhqveo7x3pluvisy40ro3n47q2o96ujs761x32geahyy94aofkyofpl32d99oiqyoj812vmolsv0siz0heqznhisuc2jd7l4dr7vg4opmdxnyuutwvxhzz3y0w4oeuqa6031yh7ppxm2fw0mczu7lusgg4',
                channelName: 'd05rklvx9gwcnip2eicoz1bubk6e41w29v9o8m6edy9cicbqq0m0baq477svsqx9al8yqfxbhs9gueskxhh8iodh6q7hul2nb1pewqzhlpn94tby8ih476uf92bu6j23octr94btusfkbpbi4lxgvxaouf0w2uno',
                detail: 'Architecto et laboriosam est non voluptatem neque. Eum saepe doloribus repellendus corporis sunt deleniti aut quis quod. Saepe tempore doloremque doloremque. Autem tempora esse tempore et. Sapiente repellendus illo provident voluptates. Alias nulla aut assumenda.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd35c0435-691e-4f46-b0e6-ad6c2452cc01',
                tenantId: 'a32a2837-b181-4e09-aa08-c7e5e9a168f3',
                tenantCode: 'hvmkhyi9psc7nhd4baxzeq855mgul1lnzvi12r0jkb2sk9e49d',
                systemId: 'f07e6293-cbed-4b64-9210-a1124af2ec75',
                systemName: '2xvtznddlg32n1q0ps8c',
                executionId: 'd26cd44f-808a-4dd3-8a60-bb6db1d079e4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 13:00:22',
                
                executionMonitoringEndAt: '2020-07-27 07:33:00',
                status: 'UNKNOWN',
                channelId: '62fd8a68-8fef-46a9-9523-e3cfb6cc6795',
                channelSapId: 'kzvlzz2grioi35bp364ouy548e275u4u9km0iicoa2v4vlj4c2',
                channelParty: 'c5yof9ys6blpvkpd5b7evrirgok51rugta9rabbfdh5iexfdvazszbh3vf2s2vooj6498at99fd1nvl3zmr8q8j6c4kuavvd3a96pq1tepquppr2514yjh50hqjsz14hfcr9z27orz8tmlq5jk1tr0irw6ghyro0',
                channelComponent: 'il3jr2iwteji8ncda9kkv58wd1c3ciy76ho29aluxojledtevd6cuqupuvmm3g257lkps0jnvm3w20hdygvvapi4sobppo02i7xgbom6s13nj8meoqyhgxcb8wmh07zzwh3q62tg6aj7k0t4o04ieuyyc7eoxdun',
                channelName: 'jtqr0cbv7ad8p5buzchkhtz3p0gfi1y9qbe76bs2k1ibelgfd5wlrclgnhnci2stjbsly3qs2imrxknd216l874uvdr0a8zu87goluqigiirs4dhnpk1a571it01okw75l5n0flytpt3wyssmdqimdyut1vd9lux',
                detail: 'Ipsa omnis consectetur ut consequatur. Sed incidunt sed voluptatum. Eius aut minima ut ut consequatur itaque.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd35c0435-691e-4f46-b0e6-ad6c2452cc01',
                tenantId: 'a32a2837-b181-4e09-aa08-c7e5e9a168f3',
                tenantCode: 'j1jqx9gyptuv78mcar48nuiaqbdfm0hjvd758u3rfkex8jqufg',
                systemId: 'f07e6293-cbed-4b64-9210-a1124af2ec75',
                systemName: 'q0kf9hozxicj5d08e5pe',
                executionId: 'd26cd44f-808a-4dd3-8a60-bb6db1d079e4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 05:52:57',
                executionMonitoringStartAt: '2020-07-27 05:28:12',
                executionMonitoringEndAt: null,
                status: 'UNREGISTERED',
                channelId: '62fd8a68-8fef-46a9-9523-e3cfb6cc6795',
                channelSapId: 'b1299d7nez64i1v7azn1kuz3wj937115g1gk1wiftjpvgukp8j',
                channelParty: '2ilz1pgx54hhnhadrrvglibc0o03v3efdbwvi39svrzuyqocqfgyif7520v4yyjjzrxvyrmic4phn155isoanmh2e3dnohfum147gh40ll1d5f7kzzv9dtsjxukmg7z2obgiz7r5dzgaf5mrnbabasinghjwc9vc',
                channelComponent: 'y79nic4s3kicvcdjfhnsxramyc59p33twcuh6d71n4nc57hzgnwwnm3v7ip855yzzuh36xwp50aj7s4y6qplzod9v4i2ei3rxkhw8y4hw5k39puhmq31tsx90trxbt3cu6u88etzq6a3xipzhfng3p7d6fdovpkj',
                channelName: 'jupnu9etmedhvl1w5zdomlojbigubd1pnebv2nw2ujfkm5jcv0tsq61a5ig51p5085l94zvdpgg73dodj6w6jbu1lo7aooabpuvobsokmikgof1qioy06hzfnve8qpfumprzloezd1266gabojth9g2lmnse450h',
                detail: 'Qui et voluptatum earum qui numquam itaque in voluptas. Ex aut omnis minima impedit sint debitis voluptas. Dolor sit consequatur voluptate id et voluptas. Odit voluptas voluptatem architecto adipisci provident voluptatem et nulla. Eum ex aut.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd35c0435-691e-4f46-b0e6-ad6c2452cc01',
                tenantId: 'a32a2837-b181-4e09-aa08-c7e5e9a168f3',
                tenantCode: '62ocdlyu3bvoueyw4hw91o1ufhvj86qazykelqvmpnjj78cecb',
                systemId: 'f07e6293-cbed-4b64-9210-a1124af2ec75',
                systemName: 'g88vb3sckkzi9jzr3vlm',
                executionId: 'd26cd44f-808a-4dd3-8a60-bb6db1d079e4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 07:34:37',
                executionMonitoringStartAt: '2020-07-27 00:21:47',
                
                status: 'STOPPED',
                channelId: '62fd8a68-8fef-46a9-9523-e3cfb6cc6795',
                channelSapId: '6bw0b2wrfhaeykwmpvma66vjudwdka7yiu9viva4gahpfftdmz',
                channelParty: '7v8mqj9sft4uc6h4jed4avzpe5wrkxu8zfb1mys9btm1m9ho8sljbi4mdkh7xabcmtlsffu6qe5km4mgznqeptrixqotfmbyqwdtdyuw766qu1xwlgez0rkaab86x0yyuqfd8hgagwvfcf432jnyvjfnvod4o4hi',
                channelComponent: 'cffhcs5fizefuz2u0qbkomip1vnthpgvsgz2oqq6j0jne3wndts19ekkx1dl20c2hj64xgpbyneo4lz2r0bmq2eo0sie7f95gmoc5n0edw21k3rnuvqqhxrh1q9731ksd1rbgvamehkm4daa83qcywfa79m0dewr',
                channelName: 'o5qfj0rxaznxgw2nitzu3cw93ih5g1sc5ppnruiyuy3l81ng6wzrgbcqy43op20frdf8j42zkdgo9xwwv2hhd8so1wba73b3k088bznnwsxrmc8do7km5ngu8umnlcyi9yznbmk5arqa1gxv5apmlapn3oggdsdd',
                detail: 'Nobis quis ut rerum perspiciatis. Dolorum deserunt explicabo laudantium corrupti. Similique et et dolore eligendi ducimus rem. Sunt quam sequi est impedit corrupti impedit.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailStatus property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd35c0435-691e-4f46-b0e6-ad6c2452cc01',
                tenantId: 'a32a2837-b181-4e09-aa08-c7e5e9a168f3',
                tenantCode: '567krykfmyvttw1iaz4ctdyujis1qkxi5o83dj1v20pxw616lt',
                systemId: 'f07e6293-cbed-4b64-9210-a1124af2ec75',
                systemName: 'pk7eyt26ws7uyzh1gr4l',
                executionId: 'd26cd44f-808a-4dd3-8a60-bb6db1d079e4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 03:15:50',
                executionMonitoringStartAt: '2020-07-27 18:06:45',
                executionMonitoringEndAt: '2020-07-27 06:00:54',
                status: null,
                channelId: '62fd8a68-8fef-46a9-9523-e3cfb6cc6795',
                channelSapId: 'm8nl7wmcay39uvdfiitbh3k37171vqk5f5isdqmaoxtjpprhn3',
                channelParty: 'zs47zn3tmdh6ukyssam20lii5q7hfautx101locv7yyccqgprlcbp29jqcuq801g68irup1cqho7tcscer9c3jt6l9xdm5zaxbem9vnjaeyz82qsk5p3bidepgqqr98fkn0h2j447haty5sysuucym017tssacwn',
                channelComponent: 'rcexukalz516l7de56hw4cwhj5jpuuzt0cjbs7vnen4xseslhbclsaemyvo6zn19f8tgag8mb7pq7gux7ro87eegpyiv0jtsxz0o1oq1csln8trsayu0kdy22ojd8puxkc3989uu450de81i7gs06htzl3aezo49',
                channelName: 'f47wcz3k8rv2zvc782171leyxezwtybvbvzrxlopktrgs121bakx58vfat2cmk5yhaahpfzt5jijrclsx0nmaoggu4y7o4ahk2ciga3m3mcbmbru8avb93wvwfu8ntyvkjzv12q8dtg66nm0jjlb6sakh7u7mw2d',
                detail: 'Officia voluptatem vero voluptates nisi exercitationem repudiandae pariatur eos omnis. Officiis totam qui quos ipsam saepe reprehenderit. Nisi voluptas ullam sed nam et. Voluptatum dolorum molestias omnis et ipsam omnis. Aut id voluptatem quia incidunt.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailStatus must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailStatus property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd35c0435-691e-4f46-b0e6-ad6c2452cc01',
                tenantId: 'a32a2837-b181-4e09-aa08-c7e5e9a168f3',
                tenantCode: 'yicpc69cvyyvx2e5iou7h226g34wftfx276i2lpq683cuiyot0',
                systemId: 'f07e6293-cbed-4b64-9210-a1124af2ec75',
                systemName: '1zkgu0g0mzaz89hy5vjq',
                executionId: 'd26cd44f-808a-4dd3-8a60-bb6db1d079e4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 12:47:20',
                executionMonitoringStartAt: '2020-07-27 16:31:12',
                executionMonitoringEndAt: '2020-07-27 06:27:43',
                
                channelId: '62fd8a68-8fef-46a9-9523-e3cfb6cc6795',
                channelSapId: '1rific8zbxrf7hune6blunsgof7z3hiebyq1y3l4rgsv9eriun',
                channelParty: 'gvj8plvk56shaej0cyqq1bjtpczgq4mu8yrgc72034x80ghlxcf5i63nms4xlgc0weqmu2cadhrohckhvt436e00x4ckev4ydvf71hd7nzn5209qc2jhn8cwiyil2pr3ce9gkbleq1b3dwso8vaw8jax4d6lpq3p',
                channelComponent: 'jpbt1oyn71vdvt2burjp7cg6mb3m4kjcoyoz4n3zxle33ekmk2gzsxzmv9ef0bzoje7vab2we64n47v98nfz7bqrcxc1o8r3tq978rbz4t827d5011o0icy4s4l4obya5uuhk3hw1ig663txhoxd0vapcmvnv58u',
                channelName: '85jw12h0omsq3entruhhxlzk2q6nz2h2gny1qhtp194anp3680vsyo3gc9yls7noqjubmyy34rjqocqsnv73atdmqa4od15hwgion69q4em76qicg4eqe18pqurkkw8onvndvev39h9fv5rmbcvjin5ypbs33ai9',
                detail: 'Hic magni unde et libero ut quia. Doloremque modi repellat ut voluptate nihil consequatur sed. Exercitationem quos alias itaque magni optio aut. Architecto pariatur mollitia reiciendis eius fugiat.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailStatus must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd35c0435-691e-4f46-b0e6-ad6c2452cc01',
                tenantId: 'a32a2837-b181-4e09-aa08-c7e5e9a168f3',
                tenantCode: 'b96uvzzncoj1s6vrc5qt17w85reb3bbnt296rdiqbu83rx8kv1',
                systemId: 'f07e6293-cbed-4b64-9210-a1124af2ec75',
                systemName: 'xyn26di2wwhsce0wcpzc',
                executionId: 'd26cd44f-808a-4dd3-8a60-bb6db1d079e4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 02:14:35',
                executionMonitoringStartAt: '2020-07-27 16:00:13',
                executionMonitoringEndAt: '2020-07-27 08:19:20',
                status: 'UNREGISTERED',
                channelId: null,
                channelSapId: 's3ipj1gqpdksahdjfxbgrj01edbatdksdl68mwqmig35rurj96',
                channelParty: '6rgnu19ajc80ogsgg22d6b478kd4wz3l8ibzdfob7k0iisf00l8s5ylco110m28alpgmrr86aa4x4pon9skyh1ceudeq7esoznpsubehwvjh4r4rx2xe1e9e3eb42uy9h7q6od6m3n9s5jw8me3nyrh5jlr5z0q8',
                channelComponent: 'cdsz6sl9xiw4rf4nosbjx4kl2tfgtsuk2lhp9uih3htcemyrg0vzfcwd7lc9xh4531ayj88m9qie51ct0q2css7f70a0wt0lp50uekq6cbk2pnzoee4cy6uw5iifitdudgivfral0ojbp6hovufz0h5qwoak8bjr',
                channelName: '6zf80x41f3tz33uumj9rt5tiuca1mkwda02cn28nbm021utjvj8h7ha9eekfstg3jgpxl97u1bri33jmuifn4pvrdp1sngz268be6yrzfszpueh5ny8ur7husi24t00884c5lkmv9jt92tw0l2gjqcmm6o0htkh2',
                detail: 'In sit rerum temporibus repellendus atque consectetur delectus eaque. Magnam deleniti quisquam ad quas est ut aut. Culpa unde porro corporis non tenetur reprehenderit sed. Dolores in inventore saepe. Aut ut eos illum tempore tenetur. Recusandae cupiditate et voluptates.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd35c0435-691e-4f46-b0e6-ad6c2452cc01',
                tenantId: 'a32a2837-b181-4e09-aa08-c7e5e9a168f3',
                tenantCode: '32x9pxmpxydcn2ye6lyqluoa905xlbo83erxydf9zoetbzkwax',
                systemId: 'f07e6293-cbed-4b64-9210-a1124af2ec75',
                systemName: '0lxisc7hnpem2u9zngae',
                executionId: 'd26cd44f-808a-4dd3-8a60-bb6db1d079e4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 23:05:10',
                executionMonitoringStartAt: '2020-07-27 09:16:25',
                executionMonitoringEndAt: '2020-07-27 00:34:28',
                status: 'STOPPED',
                
                channelSapId: 'f7s1r6as1mephsa0zt8muovlv09s1q7if1orvbmxj5wiko8zzs',
                channelParty: '3zkoapzwaivco791a95c6htjud8744kxfpdsvftopta847jsar3pzffjyow2snbkjeggiqx3oj8hbc1v02e9oww1urwzwi58sqs2qg2kd5y20ebl746k7tsv36j6b0ksxcby2lj6in86mscp9zu7h8t4c6sl61e8',
                channelComponent: 'wl5q7wd06y7yalola3roa9gnsfp9mza57730ae8zojui7bu9vln1irzibybpevsmmgh935ui4laq21hjq8n28ybld0jfymmx9t8rwcuh4kgosmx87r8ip8seirxhdmw1yxzekjx93ymr4jr9p45b79mdmh8v6ly6',
                channelName: 'odzcvrgc8b7ucqxdvoibnnyzhtspldg0hv27j5d9297th0y82n3lrpu5r5s6aphfaarnzp9r4kusnhdne2l6ibxaa5d69sekhs9f303jgud932vukv6dynsqfthcarqouokb93gy9dq1u7u9z3szsthvsl8t77y4',
                detail: 'Impedit non mollitia numquam. Unde praesentium accusamus eius. Nihil ad impedit sed iusto reprehenderit. Et vitae adipisci molestiae nulla voluptatum. Corrupti repudiandae sint perspiciatis praesentium deserunt qui eius.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelSapId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd35c0435-691e-4f46-b0e6-ad6c2452cc01',
                tenantId: 'a32a2837-b181-4e09-aa08-c7e5e9a168f3',
                tenantCode: '03v2ha9ozq8qtffkml1a23l4z6jple15pccod0dzimtckh8s00',
                systemId: 'f07e6293-cbed-4b64-9210-a1124af2ec75',
                systemName: 'y6vre425eap36net656j',
                executionId: 'd26cd44f-808a-4dd3-8a60-bb6db1d079e4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 22:39:21',
                executionMonitoringStartAt: '2020-07-27 17:41:43',
                executionMonitoringEndAt: '2020-07-27 14:54:27',
                status: 'SUCCESSFUL',
                channelId: '62fd8a68-8fef-46a9-9523-e3cfb6cc6795',
                channelSapId: null,
                channelParty: '4vtplimxvcaar4rgtz6gqkq27k1mkuai8cgsnqeddqc0pur8ovwzcbb1ypsiefzduo0hw5kpmn88pav206lyifyve2wdnb7kqydfjcyyzav9rectiysfapm1ycfa2f78bup9jf4uf5d33fto5kk5bp82q0v004wt',
                channelComponent: '8afxal8yyuq7v73sw1nmhr1dkiybj47waypnx7lta7a0kf3z6a5rxag3ycrfn1g5wsuo63qudau8mshz23pnh64pq6bfzbcizass8s951pggh2fcfz3o5j7bcmrnxi6018op8yk83m4xdjildth7n4223hjrji6h',
                channelName: 'rvig036r3tal3v70251c4jaircdj04b1dkwslf2545zywdlm22y6fhl4cxwgsrckgnpfeboljsttiga1gm6yhm2zp3o1tm3twzmt1q1qoolkgmnmj4mb8e9u0cioiwtaawvp30tz0j0wuyclej1de033daq8g9m1',
                detail: 'Quo quasi totam ut itaque ipsam ipsum at accusamus numquam. Incidunt tempora occaecati velit aut cumque. Reiciendis minima illum consequuntur a quidem voluptas corporis vitae. Quia aspernatur id porro ducimus iure dolore illum autem. Vitae repudiandae error voluptatem libero.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelSapId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelSapId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd35c0435-691e-4f46-b0e6-ad6c2452cc01',
                tenantId: 'a32a2837-b181-4e09-aa08-c7e5e9a168f3',
                tenantCode: 'm9u74tiuiau8eroac0ralxkr8wmae8lfxmkcsmk8qwpao7cyzx',
                systemId: 'f07e6293-cbed-4b64-9210-a1124af2ec75',
                systemName: 'u147j2aga85enrl8qrg6',
                executionId: 'd26cd44f-808a-4dd3-8a60-bb6db1d079e4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 21:55:19',
                executionMonitoringStartAt: '2020-07-27 05:38:06',
                executionMonitoringEndAt: '2020-07-27 08:41:25',
                status: 'STOPPED',
                channelId: '62fd8a68-8fef-46a9-9523-e3cfb6cc6795',
                
                channelParty: '2t8b438go5b67ex540pwzzaixkknrn99ntxqkdh49ozwle52sbbwdo60bpf4er4xsiuwuiyfa8g07dmye0clk45mstioktl186qxwv4i6kt5u6tfhdetp03ftetbbx8c1lqm06bubywyy39pq66sfl9l0af4mbxo',
                channelComponent: 'h3iqf4qpuv3ey1fcv1nq2levwqzasdfabsq7172x94hxwsgy6lrb70cc7f5qpw5dfo62mbactxip7g8b5hbu82nygvbb3oz54q4a5romi8svnilir4ewwf7guibr4rswmk3iq80a5n43unb8sj7oqrlrgouhgwe2',
                channelName: 'jxas39ucqv43sikyidnzv79dys1vsss1o2ahdk03zma5s4ru8wl6d68yo0mcg3pebt53lx6efpr4s54jh9923uq4q127kqu27esclj0zjrrnmwa0dvmitkcctbd9o8515zsmzx0ko4i7873bqj9abm724ek6aje8',
                detail: 'Fuga id et nostrum debitis soluta consequatur illo illum aut. Dolores incidunt odit molestias quam impedit quia quo. Consequatur autem ad deserunt soluta ratione magnam.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelSapId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd35c0435-691e-4f46-b0e6-ad6c2452cc01',
                tenantId: 'a32a2837-b181-4e09-aa08-c7e5e9a168f3',
                tenantCode: '27gp0gl6uh9autindyc3j1blseq22yoiw5fgh508a6s3bhp62v',
                systemId: 'f07e6293-cbed-4b64-9210-a1124af2ec75',
                systemName: 'nnp1ixdl7cvjsb20a86z',
                executionId: 'd26cd44f-808a-4dd3-8a60-bb6db1d079e4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 16:25:12',
                executionMonitoringStartAt: '2020-07-27 07:58:41',
                executionMonitoringEndAt: '2020-07-27 05:25:51',
                status: 'UNKNOWN',
                channelId: '62fd8a68-8fef-46a9-9523-e3cfb6cc6795',
                channelSapId: '11djy4fiunq8rn14asmr2qguqhtvxy0x3d8457am7jqonswubg',
                channelParty: 'cd6u0bjzrqdzma2cxe3mexcsfbp30v4ycmxxysogm0jri3zsu7s6qyuat2ff71cmvgyecpw2dabw2e5n7zmyt199ttsjtlgcnmbj5t2zusw6iljk2dvwk7n1wk0zkcanpsqzdchialflsemn5j3stz633dbnrfan',
                channelComponent: null,
                channelName: '7h9vj8shpnhugwsmop5cz3x8sx58zc4t2lcn66zzhkwvi4np5rztwq9uqhzpia4bo0ajrtz1rgv0ebf817tlie27xdq2aqqjv4snab1qk8fp2iw2lp6fmor2ajrp0a1gxjugygsaxfxkldd5a3qcgyrg38mhtlz3',
                detail: 'Repellendus accusantium ducimus occaecati deleniti voluptatem eveniet. Ea odio qui incidunt at officia in. Reprehenderit aperiam voluptas ducimus aspernatur molestiae minus autem est. Voluptas dicta inventore ipsum sunt sunt esse eum. Facere necessitatibus sed omnis doloribus blanditiis. Impedit aut sed.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd35c0435-691e-4f46-b0e6-ad6c2452cc01',
                tenantId: 'a32a2837-b181-4e09-aa08-c7e5e9a168f3',
                tenantCode: 'i151h3f0b6nha8ksfryhhr0081d26t4s9l0bvhy4mnggxx9fij',
                systemId: 'f07e6293-cbed-4b64-9210-a1124af2ec75',
                systemName: 'qu6zpltwh252rkap9wrv',
                executionId: 'd26cd44f-808a-4dd3-8a60-bb6db1d079e4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 15:32:26',
                executionMonitoringStartAt: '2020-07-27 05:01:57',
                executionMonitoringEndAt: '2020-07-26 19:59:17',
                status: 'UNKNOWN',
                channelId: '62fd8a68-8fef-46a9-9523-e3cfb6cc6795',
                channelSapId: 'tixpzakwpbnyykmxr5nkzqqtz70vrn9cj5fzx4unv4i8xh6dm1',
                channelParty: 'o5itadjfdrm5ke4vt19mtza0ykhrlpiuj6ixpe9zfdmm1rp9kjbq6kpmec0htherbuax4hwibs7zu6vyenb4ehd9z3rpr8csifb1dy92fpt3ywt2gx9a8r7qs57ogck8nsmu54xyoteianrzyni6fff33miqbk3o',
                
                channelName: 'pp7bzzwmla5npxzmkp0ocixg7vza1gml5ox5o8vqgohkt3y28fc9vwq8jtmmhuallup0h3of64ss6wgpfn0cuols9110nsyr3ny53yemweluefyap8keuiblxz8yqoh59kuup1ixskiyadrhwfgl62gfxdxcor1q',
                detail: 'Earum perferendis hic blanditiis. Ratione neque reiciendis non. Rerum accusamus incidunt laborum velit qui modi nobis. Non repellendus eius nisi quia enim sint ipsum possimus molestiae.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd35c0435-691e-4f46-b0e6-ad6c2452cc01',
                tenantId: 'a32a2837-b181-4e09-aa08-c7e5e9a168f3',
                tenantCode: '7m5kcya53iu7je72dhmig2yfwouuljbkh3ixf2ieckzi25m5ky',
                systemId: 'f07e6293-cbed-4b64-9210-a1124af2ec75',
                systemName: 'o230u6p30oc2rtmurg53',
                executionId: 'd26cd44f-808a-4dd3-8a60-bb6db1d079e4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 07:18:26',
                executionMonitoringStartAt: '2020-07-26 23:09:01',
                executionMonitoringEndAt: '2020-07-27 00:32:53',
                status: 'SUCCESSFUL',
                channelId: '62fd8a68-8fef-46a9-9523-e3cfb6cc6795',
                channelSapId: 'iu2axkxkotvyqchgcpm7ch5pp0yv1osy7iudmv25hnbdwvs0bo',
                channelParty: '5bgu4ln1lgnpj0nq3la6zi2h0hc5z0n9zbckktj8z1k4n8fc87u2sfe866u5d1a2t4sz2nrsrx6mh9nqj6amyoh1zhtpxwin65hicovydsd3wr972ysgr5bcqh2atfp4k2wf297b017vipytp6wlplwn2l3hh866',
                channelComponent: 'l0x1z228ef6cnmxr1bzd1ze85i0cene20i169cfyzfsflv2zyg1k1hun9t9nnnh3x6bbr19jvzbk0984jymjggyhhzn99phuelvc2pesajslhlf4nblli87mtg24m86f56md4m8urqj6o3wci8xtrx85fxljmuow',
                channelName: null,
                detail: 'Voluptatem dolor et et. Est eveniet dolores consequuntur et consequatur expedita nam sunt sed. Temporibus tempore ea.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd35c0435-691e-4f46-b0e6-ad6c2452cc01',
                tenantId: 'a32a2837-b181-4e09-aa08-c7e5e9a168f3',
                tenantCode: 'sf8sa23ahe6c0e5sh7d16iigeh9y5iqj0d3dip3h2bdv954vfu',
                systemId: 'f07e6293-cbed-4b64-9210-a1124af2ec75',
                systemName: '6i7ozgukr7n673wc2ymo',
                executionId: 'd26cd44f-808a-4dd3-8a60-bb6db1d079e4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 15:11:43',
                executionMonitoringStartAt: '2020-07-26 19:49:40',
                executionMonitoringEndAt: '2020-07-27 02:49:15',
                status: 'SUCCESSFUL',
                channelId: '62fd8a68-8fef-46a9-9523-e3cfb6cc6795',
                channelSapId: '7oawgeblz4tvix69mr82bzmti6e41eincxpbtjdbpibc3olqq4',
                channelParty: '6nzme7lpxruqxihf15czwudyjq366ttbadeo2s1cq97ga7bhsooyv90e0h9gdfthb4e2y9rdr8grlru4161npy9yajllb3saqi9fmw4zmhujgdh4ebvg0w01yhxztsuoxmc8fmshbethyaa8yelvnlqn9835fami',
                channelComponent: 'oam5lcf2dctc1vxtw09fwp9530gae1ufofu0oulc043e1gtvz8i9celjf8uiqje13wudrtl1awqntmx93pj4w45bdut8pgbnnzb20ci25ob8wda745q6yvt5gjqdnjyow0r0g3mg2oum2ulq1tu4pjgm7fkvvyig',
                
                detail: 'Fugit corporis iusto. Hic eligendi culpa laborum quis quibusdam. Quia velit vel non et est. Delectus quidem occaecati alias cupiditate vel et quae ut quasi. Tempora ipsam eveniet soluta est magnam est qui.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelName must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'pqza9gbvu06wd2nf9phqrdao13aqdbq318ec3',
                tenantId: 'a32a2837-b181-4e09-aa08-c7e5e9a168f3',
                tenantCode: 'hzf24j4m9uivzu8yvbkwibtfmyd1zty27avhrq963t5m8qho73',
                systemId: 'f07e6293-cbed-4b64-9210-a1124af2ec75',
                systemName: 'o5f8gm8mhk2dgi37maiw',
                executionId: 'd26cd44f-808a-4dd3-8a60-bb6db1d079e4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 22:35:54',
                executionMonitoringStartAt: '2020-07-27 10:01:51',
                executionMonitoringEndAt: '2020-07-27 08:47:23',
                status: 'STOPPED',
                channelId: '62fd8a68-8fef-46a9-9523-e3cfb6cc6795',
                channelSapId: '16tysnlfludyn4z6n43zg0vul4qbb9r8s4emqjxtn5w6uiahco',
                channelParty: 'u4lf0xzdx67w8t1po55aoqbozqam72alm70j1j0j47nsnhudrgjx7wwhprxfotwbtgz53ncwf2bhdhs6bgu3qqv93oqmalg7vy98ej1bmf39fql386a9qeh2ajw2lz8oblcitn8vf4hkicz812qpx9l2xeayxj5g',
                channelComponent: '8w1hovmhsg1bekogp69fep2dglsjnc9w6vks08vlq6vhqtxwet84haniwrtsrn0pldwejnjj6j6f318gvftd7cuxwp2nvk7nzbps7itjh8v68v7gyfilz3lofyozfl9v7vaac6aswavdh4xliau3okxf9ovravta',
                channelName: 's6ksa4mg2amxxgv9m3yxadgzaw4imfsla31sg14zb3603k6ycm5ciuko2gll2c41vohtm1e5ym655hb0g2xtzvysqlt39kcl7wixpwphq0ihu5rf5bjda3wxak4h232vsh16kh40wlrbdm12ocnhbzxwr77panp5',
                detail: 'Beatae dicta qui qui voluptate alias. Dicta eos voluptas qui. Veritatis eos delectus repudiandae. Eum et rerum aperiam ullam molestiae. Quia maxime soluta aut facere sit consequatur eveniet.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd35c0435-691e-4f46-b0e6-ad6c2452cc01',
                tenantId: 'gsff688eybyqt0fuxy1h1mcdp3t2gy5aun039',
                tenantCode: 'djhs87cnchd6zaqjhjs72dmzzcj47pb17bxowkze5p7drq8u0a',
                systemId: 'f07e6293-cbed-4b64-9210-a1124af2ec75',
                systemName: 'o8awl4ct9vexjcgfwvot',
                executionId: 'd26cd44f-808a-4dd3-8a60-bb6db1d079e4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 07:10:35',
                executionMonitoringStartAt: '2020-07-27 10:11:16',
                executionMonitoringEndAt: '2020-07-27 13:37:03',
                status: 'SUCCESSFUL',
                channelId: '62fd8a68-8fef-46a9-9523-e3cfb6cc6795',
                channelSapId: '4dujhklhk0n24whb70lpybomipkw68og83ewpxy4zvip5k9x5b',
                channelParty: 'a2b5bdxtnicdmqqwm9s3mghxw4wfkj5dmcceqpujiyz8eqosi8jc1y86o6r0sqwehkm0zlre0xv52e0232ezz3fgz9iuucn6xi6ev2tla1xp39b2c67xz2a60hl1s0xfh6egsdn9a989ipwwcozhwetrdpbl62su',
                channelComponent: 'hrnek90h9bdddtapqrypd5p26852zatuc7mbc6isc103yc27d8fwn62hloicva5vpi1oaen27h6sswu6t44e4hv95s3o8vj92tuo5e5dd1e2rwu3m9rkqavpyb3lkci9fbb1kt7lbykql3ol98aw7e9c28nqnqfy',
                channelName: '15x1k9r1y9ene7fmzpvpx0dugxpehpdconvyhiuzrscjkm0vmohoj57j5p6dqai6uk7snob40swioii40mxcc2z6qzc154jgl8mxo1jgwrzsp008atgjh2dd7g4zoozl5s8bwwv91xgpjdbqb5pqbnjhdo6o5wc4',
                detail: 'Voluptatem repellat voluptas eum ut ut molestiae nisi cum ab. Aspernatur facilis repellat et. Assumenda officia ut repudiandae. Necessitatibus sed corporis blanditiis eligendi est architecto. Nesciunt dolores quas aut voluptas consectetur repellat. Voluptas quia voluptatem dolor culpa dignissimos quia aut ea dolor.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd35c0435-691e-4f46-b0e6-ad6c2452cc01',
                tenantId: 'a32a2837-b181-4e09-aa08-c7e5e9a168f3',
                tenantCode: 'vw9bkow45v7jg33d12c19e9vvvtbwb5vr0tmeww35za0r2kfd3',
                systemId: '203qnuxbqpe472s0z9m0s7mt0btvpmbqmcfd2',
                systemName: 't4gmoee8azrnotu03krx',
                executionId: 'd26cd44f-808a-4dd3-8a60-bb6db1d079e4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 06:46:42',
                executionMonitoringStartAt: '2020-07-27 10:16:57',
                executionMonitoringEndAt: '2020-07-27 08:09:24',
                status: 'ERROR',
                channelId: '62fd8a68-8fef-46a9-9523-e3cfb6cc6795',
                channelSapId: 'lbyvaqwxmofypffudu4z97ei9il39k2htw1hqpnhnjh6vqovkb',
                channelParty: '4yail59is89xr2fxlils56omvap23rrtq1wcvjfq81wolpl18kp6yhw7llrr8p2bgewsz2sc9uve8xj5ai1q2en9071pbanuleopp76l7ycvgu76wj7vphf9m414a4qoxvrq320bjyr61azb2tepnpyb7ftt05kq',
                channelComponent: 'jdywurxgtltve5vgpgj58w9pt31nx6kqgsdbxawt6zh7j4r3vnepu5b93x9nbwbdpetvzt0unfxp6wybginx9gwxfvxpotsb3zxgzdyeb6cilyowks1dbw4y8r20kvwsyf4kozgeg4k737bksehttnp20urkcjr0',
                channelName: 'd3oz4jxsficsz1z2yvy7f92xqvypfv5wjv5niem9d6g4g1hru54mddfmd8n1hmn6grcmxwqjd7dggy17csnpcsvwimfv2z0kiw3dmnd6bduvpc9xidvdouaa0y3sx2h7y9xy3hjkvwpp1etghsz2b5xr6zm6srrh',
                detail: 'Ullam perspiciatis non consectetur recusandae eos delectus minima nihil. Dolores et aperiam cupiditate. Sint asperiores voluptates sed aut maiores voluptas officia aut pariatur. Reprehenderit molestiae voluptas architecto perspiciatis beatae possimus sit cum et. Cumque quis iste alias similique.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd35c0435-691e-4f46-b0e6-ad6c2452cc01',
                tenantId: 'a32a2837-b181-4e09-aa08-c7e5e9a168f3',
                tenantCode: 'onx1wwqyogf66mqmgjpcit6ozb40dw52on638nj0uzfy0r4cbo',
                systemId: 'f07e6293-cbed-4b64-9210-a1124af2ec75',
                systemName: '9dcaj9dit9kbe64b96l6',
                executionId: 'tcuq3vflp368ai8sl5v03hnzns6z299xueaa5',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 07:06:13',
                executionMonitoringStartAt: '2020-07-26 20:24:59',
                executionMonitoringEndAt: '2020-07-27 14:06:26',
                status: 'INACTIVE',
                channelId: '62fd8a68-8fef-46a9-9523-e3cfb6cc6795',
                channelSapId: 'z7n3l0cpl6le9m1mxw7ocjxdv7rze09p31vglbhw204cnjak61',
                channelParty: '0c0jzvmzete6nnser9r76vvidrnar4debd7lwezgk5fws18iy1niv46rjq9rut5idkvt839u6edpk9y4o5oki1aaaun9beq82ptse6htp0e801v9w7zbepy6ozivbboquglv67hz38hcingt4zpo9bh38roi91xt',
                channelComponent: 'eczgypbmp2po24vber0o2ktydkgmr8j52s7k0kigpvyee89ql16ux7sb26p5bvhr4l01ilme4wvsdqlfagei8zeoqqvw9g3g3cr7yav2j1qp41dkq44vc84glthjgtxfk90m8yq274i6tyb5jg8k55ur6o7xjd4o',
                channelName: 'a39qm6oxg769huohzaxpxg25t5p4wxtrds7qrkkjn89geoum4ibxyw8tnri4jii92urg2xqcs47jdiwvhv3cidr0agsocroprtyf51e5xdzfiv9mjir8otlnkhfodhdn0erluv2jg3rl4wsvs9vqcbocsvxq33ik',
                detail: 'Numquam mollitia laboriosam dolor qui culpa corporis et ipsum. Totam vitae id deleniti quo eveniet repellendus ea asperiores. Pariatur cumque quam error cumque debitis ad. Id aut aut enim rerum eligendi incidunt et. Quia explicabo hic tenetur quia cum et eum.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd35c0435-691e-4f46-b0e6-ad6c2452cc01',
                tenantId: 'a32a2837-b181-4e09-aa08-c7e5e9a168f3',
                tenantCode: '6qkiun0exsb4dwhgf1uxjjv0pyn67ixf0l3u7b41isqe00gp47',
                systemId: 'f07e6293-cbed-4b64-9210-a1124af2ec75',
                systemName: 'gwgrbggxislrcasjpc2z',
                executionId: 'd26cd44f-808a-4dd3-8a60-bb6db1d079e4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 07:16:34',
                executionMonitoringStartAt: '2020-07-27 14:00:07',
                executionMonitoringEndAt: '2020-07-27 03:29:27',
                status: 'ERROR',
                channelId: '7s3d11ddqm0otvuup7k82xv1kkjbmx904b8fy',
                channelSapId: '1s1rsk4i17fw8pxi4sfv8dducnqecswcsuujajywddk4uu7zkv',
                channelParty: '3dhw2p49gkmwg4gcztpfjck1h3ss0i3l2sf83kbho7fnitglon43e5hwh5j7alr25pea1bgfwlwsxvxeubhub59rce54rd94y9p7glw36moiq3ja2t72ime7tse153z6tk5xqvdwujyd4ep8nrhyv4dikdwr2k60',
                channelComponent: 'xvhxgkbnww3n9ru2d2i5jvtrm2apuq3e8u9agnk907wa18rm6z2irendy00i27hyfbzknhan6vupkmlj22u1gx6lhyxlj1fzk8ychqsqrl1eo607pgums29jix0bxalp39h6wpl04a1ayyukhttg2c1wfb2btr9c',
                channelName: 'pnqujbrmjxe69y4c3ayy97de5l652i4s3iaky5teoyw2m8qcun5me6ddq9vgekqh9bs5ixqbmp2dwp5dda6ckkzmatyiymqzi0frxrmm7knkwgiutu6d5o80kepdgv8fscytd2g3am5buvfvcyg3hxaxse4stkap',
                detail: 'Quas ex ipsum similique eveniet voluptate. Voluptatibus quibusdam est qui temporibus. Officia aut odio laboriosam ullam amet odio. Et in delectus cumque fugiat quos et excepturi.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd35c0435-691e-4f46-b0e6-ad6c2452cc01',
                tenantId: 'a32a2837-b181-4e09-aa08-c7e5e9a168f3',
                tenantCode: 'ffge1jj64ctrx6crly457uolcd2orvz1zvq1nnw4hvvdv5y2zki',
                systemId: 'f07e6293-cbed-4b64-9210-a1124af2ec75',
                systemName: '5bre62ig5506dywh9wjp',
                executionId: 'd26cd44f-808a-4dd3-8a60-bb6db1d079e4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 16:35:45',
                executionMonitoringStartAt: '2020-07-26 23:22:53',
                executionMonitoringEndAt: '2020-07-27 12:04:49',
                status: 'INACTIVE',
                channelId: '62fd8a68-8fef-46a9-9523-e3cfb6cc6795',
                channelSapId: 'gljgr5xfsakhcxz585d4y5bqsxkm8is88rwxojukyblrk6hksn',
                channelParty: '5yuy7qe0evbq4w3n6xw69mpevrl280dodpi96f21ajlrhebb0jj5nwf2py5f6gfyezudf0jw5d3x0m8jjxe0d5e4sgj4jl4svne5yuculyx525mgokcyh2e79domwn4iogwzsmz8b8ilv1xiu9c2tvvig3zaeb7t',
                channelComponent: 'g2mlq8bp23nwvczdaosqdac125sbgc6x91p1l0bb92j7f18ki7v5q1y0xpiui8i08o9mc7vdgctjn0no7m40rjnj3gbhh9v32uc7dhfetezs1lbta4vek8984r1d5y8wrkwkuq3ed5nbh0cp7h2wbl0og400g9lo',
                channelName: 'mzqmqeqxcsl8z3b587mfdln5lqy7txh6oezg8rn8pynk43gmex7jgvkg1sb040yewlk1l4ybq2srkaflqcp6q12ujw451sdykk5v5gri34rykjwrf1gcv9koy2lt4hunldac59ol0726yd0blsq64rug7op1kmf0',
                detail: 'Quo asperiores est est amet. Assumenda ducimus laboriosam blanditiis ipsa. Fuga magnam quia maiores. Velit dolor sed dolorem quia est quo. Amet quia dolore.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd35c0435-691e-4f46-b0e6-ad6c2452cc01',
                tenantId: 'a32a2837-b181-4e09-aa08-c7e5e9a168f3',
                tenantCode: 'sdngyzedxq9qgm2fjdjt8627ucn0u4xk7xwgmq9dxazk5ifjx7',
                systemId: 'f07e6293-cbed-4b64-9210-a1124af2ec75',
                systemName: 'qqj7wqqu80fx7ywj4jb2a',
                executionId: 'd26cd44f-808a-4dd3-8a60-bb6db1d079e4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 15:23:04',
                executionMonitoringStartAt: '2020-07-27 08:10:04',
                executionMonitoringEndAt: '2020-07-27 15:32:48',
                status: 'SUCCESSFUL',
                channelId: '62fd8a68-8fef-46a9-9523-e3cfb6cc6795',
                channelSapId: 'rpqcmpuoydfj9nrtgj5yvun1phsy1r3vzt5lpl2m614wn47lbw',
                channelParty: 'unulm1mh0m1iys3cead275r6ikf3m7j0p2u1sggopeqp6n84ojbbqpcduillk5rrw8nnhamqluqsfbkq53440jehpi0u3hu8uarvlunjer5h4pktpqg7ohrszbez2aazxtytjoyd97swtwdl6pkk9qo48m4c528r',
                channelComponent: 'nif74oapxd1st6pelzlhi150zia8ptxe0xg2qi9qgtfzrc7eu3aynlugelt4j15jeunkrhgxci1y5fcdwgvvvkb6sjmqwdumjmsa46eeuxdd1hi4qoz2aoi6wmgm1jn3ugxmoulpv16812ygv4g84yh5vcm7tr7z',
                channelName: '9yrven7n4v7qdoa0jfk5soibnba0loe4d4ruu7dsf5dfep4dhys9er5irbtglum9ztw5dz0gywl4c8a1raza9p1861hpp4y5rnxoaa6sxr9m6xwu0xxuh9osrma39yatrxof1jp5mfhkwgzbq78e27w0spq62rdq',
                detail: 'Repellat cum animi. Et molestias soluta numquam. Alias odit aut id cum quibusdam nostrum culpa est.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelSapId is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd35c0435-691e-4f46-b0e6-ad6c2452cc01',
                tenantId: 'a32a2837-b181-4e09-aa08-c7e5e9a168f3',
                tenantCode: 'hgkrgy6abkf3ar8d9mra436tor1rjoaxa2q2gkmvxj1ybi6cum',
                systemId: 'f07e6293-cbed-4b64-9210-a1124af2ec75',
                systemName: 'p4d4yp7bttre6ent09w1',
                executionId: 'd26cd44f-808a-4dd3-8a60-bb6db1d079e4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 13:22:03',
                executionMonitoringStartAt: '2020-07-26 22:59:59',
                executionMonitoringEndAt: '2020-07-26 21:05:14',
                status: 'UNKNOWN',
                channelId: '62fd8a68-8fef-46a9-9523-e3cfb6cc6795',
                channelSapId: 'r60tboy4s8j9nvyznf34ubi1fev638oryhcij9r3ih840evlm0h',
                channelParty: '1xk4ehcee4bldfjm5joyj32kaxkok69u402wt2fwqthvb9m4dj4y7b0wf7xbqcqtg6v92m4fxse4j2d56026fvsr1eppeykt4nhm7axap83y2zkl3fmyl5ep446giea12rixgz38rk4gw47ep56a743k5cmf815g',
                channelComponent: 'kgrr57d1kyyu4ot44cp9skvg8hx1ajy534ruslqcvdhl2f39w8useannnmh54a514muv30t36hf4l3p0aaqsl3dpp6fqmekesksqvimrcwu7dhre0twrdv5xcltfhm8l04br7v497jwp67mhn5vbbijpzsg6ihs1',
                channelName: 'niq7uc0iqdfiq5595xig9trg3wnj72fmhudxjvfotxd1wc1b4en5hczyuihwasaoxctv2h3bhwmlyc4c11vzsu4e0lonhypev0z20i8l2fzmwj5rz06t5yjp4eycv92z4jd099u0ie1rwurn4lftza2np19heb6o',
                detail: 'Quia dolor libero eius. Ipsum eos aspernatur consectetur repellendus omnis ut. Fugit porro dolorum veritatis. Vel harum magni eveniet. Vero sunt aperiam aut nihil qui asperiores dolorem quod consequuntur.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelSapId is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd35c0435-691e-4f46-b0e6-ad6c2452cc01',
                tenantId: 'a32a2837-b181-4e09-aa08-c7e5e9a168f3',
                tenantCode: '219jblizzbuw9k6iepocw7nc2kav67zrfm4rvf29luj88l20ne',
                systemId: 'f07e6293-cbed-4b64-9210-a1124af2ec75',
                systemName: '3yjobtcf4g22dnm9npev',
                executionId: 'd26cd44f-808a-4dd3-8a60-bb6db1d079e4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 11:17:46',
                executionMonitoringStartAt: '2020-07-27 00:41:44',
                executionMonitoringEndAt: '2020-07-26 20:46:14',
                status: 'SUCCESSFUL',
                channelId: '62fd8a68-8fef-46a9-9523-e3cfb6cc6795',
                channelSapId: 'p3fttgzvto8fkbp0mikutxvkm2phtr8n6cau59xaxhp5nl0ixu',
                channelParty: '48zdondw0tgqtt8uh59em02hnfc3l0tyuzxrnaearkkyity4z2a0237qvlhbr33k9u7rvsqe1is00oewfg041eyzvqtilzm9kpw3rjiwdvvf0r5vupf3o04mor1ylj6jl3l59xt4121uqe3j7hbqxv32ae91qs62w',
                channelComponent: '0fj7dxym284t4b0ax6dtevp1clzhb5xz9wr91ttax42fukja376fv6b841zf6xlnh4lzqfyc7px28j4y12i1p91hq0so5eex9jm90dbexbt6znuah9mcc2s1npdb7qmzeiq78g56fy2o3004jvlkg8e6upmqx6fx',
                channelName: 'qgcwcagje059ym06nh17376yis7bi50gf0bdiwx73uv1a6uewyqhyqga13ybv1y3eko4a6q5vrlbw5k8j4qyxatpllg1xm4v0dnqjvrebjxe7f1u0x2hmi7oepzdhqceo2g1dom6k0h5ktg5rx57j1s5dsun6skj',
                detail: 'Velit beatae tempore. Et illo ea. Ut et sapiente natus ut non. Reiciendis est assumenda. Alias est molestias ut voluptas quibusdam et. Beatae modi ad voluptatem voluptatem velit culpa maiores molestias in.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd35c0435-691e-4f46-b0e6-ad6c2452cc01',
                tenantId: 'a32a2837-b181-4e09-aa08-c7e5e9a168f3',
                tenantCode: 'm0n32xuxuglfpg3598u2w6ze26acds64dp9at5l8mqan2x25t1',
                systemId: 'f07e6293-cbed-4b64-9210-a1124af2ec75',
                systemName: 'nnsz4vew6x3u46n4ol1f',
                executionId: 'd26cd44f-808a-4dd3-8a60-bb6db1d079e4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 09:28:18',
                executionMonitoringStartAt: '2020-07-27 03:33:42',
                executionMonitoringEndAt: '2020-07-27 13:48:26',
                status: 'STOPPED',
                channelId: '62fd8a68-8fef-46a9-9523-e3cfb6cc6795',
                channelSapId: 'bs7y8iixeob76ku3cua9mu0kk8k34t8aykxwb4tgp0w98kxb1e',
                channelParty: 'tevy7ez30ai07pse4nmygq5mbw81yeoql47i3srqfbg9hrcd8jng0kb35h6y6mrxunnvjro0a1mo0ktr64u8jbdlpimv2n8gwg5fqcyre88nifwueyvtj90e09xff6ic5sktfw8exn0t3cau6fe4g9izznfyx7zu',
                channelComponent: 'ylb7fudczdxlml81ya9zs7ulbqge08u4au8eibtfaxo2ygu0ooxzclm1fjr7vpgmebmnp9rw1j4y2usg8rcl31pzxq1a941tmscaqjbn28mnrf0z7ztoa7ppwjeod2dwn0uh0nv4ngydp7ielbejs7n1mq1kd11ud',
                channelName: 'ovwqad633wp89p6x70l5ab3j7b4iv0h8g7ungolcmiqkgves5ix6h1gtp67ris2nqotc9ghpjknlkdop7x5frlofe79elgk62ncd4w8sdpoyebg9krdfk5lxe50mjb7at10cahecmkrxzyqarpw35f9t66u12hg1',
                detail: 'Aut qui sed est non temporibus aut aliquid est at. Voluptatem omnis qui et est sunt. Facere omnis sed rem recusandae possimus optio et.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd35c0435-691e-4f46-b0e6-ad6c2452cc01',
                tenantId: 'a32a2837-b181-4e09-aa08-c7e5e9a168f3',
                tenantCode: 'ylw4y3nv8npuetn5tvclge312ecrjdgg3fzhqtv6qq4m3izvlz',
                systemId: 'f07e6293-cbed-4b64-9210-a1124af2ec75',
                systemName: '27cc0zzpocbief3i7usm',
                executionId: 'd26cd44f-808a-4dd3-8a60-bb6db1d079e4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 17:17:43',
                executionMonitoringStartAt: '2020-07-27 04:52:40',
                executionMonitoringEndAt: '2020-07-27 18:25:39',
                status: 'STOPPED',
                channelId: '62fd8a68-8fef-46a9-9523-e3cfb6cc6795',
                channelSapId: '8qehjmggd0778l0383gf4pifwfyc71gxomjsbsve8nac2cqat3',
                channelParty: '19slmckaq8rfhnzg3g3l83ao92yyw8vkq0qyf4rqhrliqx5dlf9pqv2hlj1o5akcddzhbkcju0rckwga5k9er02hbgy3lnjr2laa5g5y26u38b91ahq4qouv4elhlcapegv5c4se6qbu7qx1bakhsxc8dwil4nge',
                channelComponent: 'wpqpy8n7a8lh5kml2pt4iuzgt131w8pfjw4bdsmip2j827zbwfdaa1t63hf8ejui6iwxfx6aasxkptmsgb9j4gg7bvbr04gbbbpzeeihgz1rbkpgiuiyv11n29xnh97zj3lxzrz6lhbml94ymiqpqm7szjr54m2l',
                channelName: '6zben9rd4bk63t40yj3n7z7htg84psdw2esadd4bf084w2q65x28tow4bsxa4pkq9e4wqd561zbu1tyrkcfp2yq5d288jre13q67479ednzsdmmv62jvkg7n8hef9k6lcxtypapixnwzy2qkjef16koywpam473cf',
                detail: 'Asperiores voluptates dicta nesciunt impedit fugiat pariatur qui. Neque eaque nulla et assumenda reiciendis. Libero veritatis voluptas sint aut aperiam maxime. Et explicabo ad eaque maiores rerum eius quam autem.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelName is too large, has a maximum length of 160');
            });
    });
    

    

    
    
    

    

    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd35c0435-691e-4f46-b0e6-ad6c2452cc01',
                tenantId: 'a32a2837-b181-4e09-aa08-c7e5e9a168f3',
                tenantCode: '120j52mdmw7natt71y9r1g0p6po36ss1jmnhgp28fxnml6zpd2',
                systemId: 'f07e6293-cbed-4b64-9210-a1124af2ec75',
                systemName: '1w7d0nxk7cpl5vd2w98n',
                executionId: 'd26cd44f-808a-4dd3-8a60-bb6db1d079e4',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-27 13:20:49',
                executionMonitoringStartAt: '2020-07-27 16:51:21',
                executionMonitoringEndAt: '2020-07-27 00:45:39',
                status: 'STOPPED',
                channelId: '62fd8a68-8fef-46a9-9523-e3cfb6cc6795',
                channelSapId: '61t7n2y193zn22yfvsb34p1qa7w4ws28tor336o54aum138zo6',
                channelParty: 'hwvzcdzt2u7wab3ezsegp5y4c22rkqqbqs3kwksequ4y0jj5fg9nccuwmerklxratg0qebrp9uatuqwjmffuyvi0gmrl76vpsyphmxs2mc7m0tndj1nl4a9q41ucmdtnuvip8l6tgw2tqadyhl83sl2eok9ju2j8',
                channelComponent: '02mwqr5sazl1tbzk3z7oo9gm7ui6sfzx3hcxl6dhsz78pn9zsq1ajx7aqbwwytkft4k1ck3njeijebg0z1obe9vabxxyubaa850atigy58xtowy9kyyc0ho8v3tlvfozoi6g2d30rq0oq0sg27xkj582war7e23t',
                channelName: 'b1nhj3xfwj5psz6c9easy05tocb699qmli087yz4mtkfh84e5ai9ajtzvejsyz4awzztos7lsxbur5mq7u8gxlw4wjacru1vd9vaoaucbn18t32jqutcqyary8oc8x9uov9ibyjvdd08px935obwo7yrbxn6npan',
                detail: 'Officia assumenda explicabo. Ipsam quos id necessitatibus. Dolorem exercitationem est excepturi impedit exercitationem numquam et sed voluptatum.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailStatus has to be a enum option of ERROR, INACTIVE, SUCCESSFUL, STOPPED, UNKNOWN, UNREGISTERED`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd35c0435-691e-4f46-b0e6-ad6c2452cc01',
                tenantId: 'a32a2837-b181-4e09-aa08-c7e5e9a168f3',
                tenantCode: 'fpfc4b0xchjqu48p7vbnosq8hewrxxb0rquqkhnu4obmjtzqfc',
                systemId: 'f07e6293-cbed-4b64-9210-a1124af2ec75',
                systemName: '8yxhrk85lqqa75scfg7w',
                executionId: 'd26cd44f-808a-4dd3-8a60-bb6db1d079e4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 14:13:29',
                executionMonitoringStartAt: '2020-07-26 19:47:52',
                executionMonitoringEndAt: '2020-07-27 12:01:29',
                status: 'XXXX',
                channelId: '62fd8a68-8fef-46a9-9523-e3cfb6cc6795',
                channelSapId: 'f2mz10ckcwywrozhjpd2jro8edho9irmdxo0gdqr1cepe2yvul',
                channelParty: '9xx72qihvrkyadflypnfau3536bicn9sndvnuushxke6qnimysfdqjugoukc3fgims0skq9ijnb9cyfmiwyuf80m4w2t1uzbxeg52xbtzk5rjtqrzg5nmja03en2jqw61dve3aa7thj9ko3sciqxwuehjhvjjwe9',
                channelComponent: '2fevt549ak74mz50k4za0pnme4gw6ta3bz3kdb6pr695ltchjxb812vwt8fw0bdutlcpofplj5yanzv220t3w7akttii6xgxs7igbend9peeafkw4oo4ys1j2t8v23tdmsyyd7fuiq5v313y1x6hac8mni3ptc8a',
                channelName: 'r35pbemej880bl90vznd87u8ywkmnetwv3pelgojxlk7ruj8uiz5jn8qej7loyoarf9esvloukeoo3vfjvdi1gjv0r0s9nk0xofkog0zdf1uqxljg0k5smgyxphf061i0msfla97carwad821b99x5my6d2mi0ls',
                detail: 'Facilis quo nemo quos totam animi quia molestiae. Soluta quis omnis natus ipsam alias cum. Id quae praesentium numquam officia iste quod.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailStatus has to be any of this options: ERROR, INACTIVE, SUCCESSFUL, STOPPED, UNKNOWN, UNREGISTERED');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd35c0435-691e-4f46-b0e6-ad6c2452cc01',
                tenantId: 'a32a2837-b181-4e09-aa08-c7e5e9a168f3',
                tenantCode: '626h7imr1zwu0wqjwdq8zd4eqfuhwm04gjafszho8ta6exqbh2',
                systemId: 'f07e6293-cbed-4b64-9210-a1124af2ec75',
                systemName: 'tw4iorqrb3zlcqu1kb67',
                executionId: 'd26cd44f-808a-4dd3-8a60-bb6db1d079e4',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-27 07:49:17',
                executionMonitoringEndAt: '2020-07-27 08:29:32',
                status: 'SUCCESSFUL',
                channelId: '62fd8a68-8fef-46a9-9523-e3cfb6cc6795',
                channelSapId: 'n5ibihti16cszu6bmk7u34tltw3x0njh3i7ktmqa0ywc2cb5sp',
                channelParty: 'zevc83y3e6k2evcy30f6zziz6o204ccm4i5gkqmca7hh31gubr9omemx9pttlzvm0sxa2pw7s2w45i5zrxnfbtbuiilcspgn8lyuj888jzmqk0k9ks0zcrpigdgvjjmltw2eemunzoux9wo9ds2xt3ryv20mmyi9',
                channelComponent: 't8su1slrye1zs47xtgukhwexgsg4qz1bq30q2ej5mldonc1clkxwna3tutcko7e4smle9c9w9symh58ghjh7hn2hc8h7czwleyi6ztv7ss1i7inircw21om8k61bbcjub31rpm0ayxmfkvmo9ke39d88hq19h2oy',
                channelName: '3ojh0okuefltwa5tcsn01cu4cvcvum3g0re9adhlxi7n6pg5elceg3zgwb9n24l5ulx0ydi35ca5zse9n70ywe639vofuzx3zdog73z037smdbpuyjfokpdqvpilvcis4qh87srymijj4um78fd7k3s6qxpzv996',
                detail: 'Dolorum aliquam ut voluptas laboriosam quam. Vitae occaecati officia iste corporis tempora voluptas minima fuga. Repudiandae mollitia ipsam impedit et et. Sunt natus eos totam tenetur dolores aut harum sit.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd35c0435-691e-4f46-b0e6-ad6c2452cc01',
                tenantId: 'a32a2837-b181-4e09-aa08-c7e5e9a168f3',
                tenantCode: '6sbp79oqymyjw3s5kxb0nv377qquafnm5eplm69vvb4clewjvo',
                systemId: 'f07e6293-cbed-4b64-9210-a1124af2ec75',
                systemName: '3g69yes12yfehjcn3vuy',
                executionId: 'd26cd44f-808a-4dd3-8a60-bb6db1d079e4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 06:27:28',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-27 18:06:28',
                status: 'STOPPED',
                channelId: '62fd8a68-8fef-46a9-9523-e3cfb6cc6795',
                channelSapId: 'l5a09ngmpuaa626gklfpncm0dkuqxgt38ijh97dmypmlnhz9hk',
                channelParty: '4vcls0k1tsy620jbe7ahjyk62u9saqurt89262zmdl32ekarcsyfgxemweyddq3hs34r5v1vf1dpv24efdsxes1lnt9kh4pzver0r2l9i41r8ij6nnjk43gi70zl7twsacd2lrqoc16yqjbp1lq6uqkb19s69kwm',
                channelComponent: 't6j6l2o9u7bfftuur99hvz73mmnee84r6fjo0zeuidaj8hyzsnn605lwr73iya24fa7hmnmm844ie5xosddfjg0wtyvipvs29vf5w3yw87laou1ke0m2mo4ygehfz19yqe3rvmp8984chyimnjxga9iawhsd7jrb',
                channelName: 'vbh4oga7perwx59j7454he9fsjnu8y9l58yb77hof7mn9a73o1wjy8h67sxnjbf404p0z5flo1t05h71ww0mg4g92yasw55mtwrm2ams9ae3qv7jvyph5qttpwrsdrlf3hj983fepsq7pa0tg2esw0stms8nireh',
                detail: 'Incidunt eum ea. Esse est voluptas culpa enim quis fugit laborum modi necessitatibus. Doloremque dolor quis qui quis. Dolorem repellendus nobis sapiente amet. Corrupti qui deserunt voluptatem.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd35c0435-691e-4f46-b0e6-ad6c2452cc01',
                tenantId: 'a32a2837-b181-4e09-aa08-c7e5e9a168f3',
                tenantCode: 'xrawa08imjpxn0l2edg6x4iq4jm36sumxj5jwl8saoikbpul18',
                systemId: 'f07e6293-cbed-4b64-9210-a1124af2ec75',
                systemName: '92mjnkzwgmt3hwu0qnd5',
                executionId: 'd26cd44f-808a-4dd3-8a60-bb6db1d079e4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 00:06:14',
                executionMonitoringStartAt: '2020-07-27 02:59:39',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'STOPPED',
                channelId: '62fd8a68-8fef-46a9-9523-e3cfb6cc6795',
                channelSapId: 'pkldy7u0tcb4ix34jtasprzvzzm0ous9mfflj9h4r1w710mbo8',
                channelParty: 'ppggfoevxn8w085awqxfosvbobnhq6galt002qhh2dwuvpj57aro0r4sblw308fyvo743t7ywkz85rol023txh4dx2thi6igm5c2v3zi54jpnm7adt7p2iyhsunlgxkh34qgioi9i4o5sy47yyio3ly75dqv3ns7',
                channelComponent: 'yyekwo1nzf73eh22xqaa2wv8aoa71ujddqp23bnmkcypk5web49g513mdp2mv9992fxnwiews06ng26bxmxxxy41ssgit3xsodacyrzpcvc1w0nwym04zrnnc3peap0rqnyzaya6nxofvoj9jcy44heelk4l3z7o',
                channelName: '2pe6f3fu5cuei1erc7v01eka6tbtnwhgdmzkphzgktjxfcfgy3380ltvhl4z2c9igc97wi00gf18rgzqtkpabeuyx8o6txedj8kmih29vv6p7uxm5kbclzt3n8aq8v55z7xj3o3phg1lwt0yrryayem4fjwjhcv8',
                detail: 'Ut corporis fuga ut. Esse ut qui rerum expedita possimus. Est debitis consequatur rerum architecto necessitatibus eius dolore id dolor.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/channel-detail`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'd35c0435-691e-4f46-b0e6-ad6c2452cc01',
                tenantId: 'a32a2837-b181-4e09-aa08-c7e5e9a168f3',
                tenantCode: 'flcbe65d5pxjwnb7t7qmlfl8i2oarxgsimsfincpsggv0cf2hr',
                systemId: 'f07e6293-cbed-4b64-9210-a1124af2ec75',
                systemName: '1ug4rcp159ywbumvyexi',
                executionId: 'd26cd44f-808a-4dd3-8a60-bb6db1d079e4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 15:20:20',
                executionMonitoringStartAt: '2020-07-27 02:07:33',
                executionMonitoringEndAt: '2020-07-27 06:17:57',
                status: 'UNREGISTERED',
                channelId: '62fd8a68-8fef-46a9-9523-e3cfb6cc6795',
                channelSapId: '54a0z5rkflgs3l876mv7mnd0b1ritirna4u5qjubiluvxp9u3a',
                channelParty: 'n694eoeqp7fpiwr8qjfmisqhxcgax543z18jgzjmyq3u6t6lk5d972dod12hnxlgvkjkaxuxx61b33ajsi3rskrm65r0opon5yghmvxav5bsc7zpb4zaquw3qkv24u96as8m129ylmz3oa9h9wgyitrh36tjdupm',
                channelComponent: 'yywosbk4h0r3vm1pfl2lbp4zybow4w2ypnrjldjmoc2jdfmnzge3jk5t0666n3vt4fwp28fhgmstah40e2seywegw134zt9k5f8zskgd5povd5x0jikt9rei2gwk571pk56lfjwa86p4ruj3ww9y9p2rfm0lx9fj',
                channelName: 'nhr8lznr1c1r9pbp189qltd6d9dw8lqzljw7zy4zq5ww3xj5998d4rwmd7zs0uvz3g28936b02qzmvezkdpj0zjsnqouids7slb9fts6yz3mdof1wfrkgwqnyp6qdeikawqqwbyi11eeqrxgnzun6jsr3el26vpr',
                detail: 'Consequuntur qui porro dolorum dolore non. Ut ducimus quis exercitationem aut dolorem atque. Exercitationem dolorum odio ducimus ad tenetur quisquam officiis fugit. Laboriosam aut modi aut omnis. Totam saepe deserunt. Ab dolore autem tempora.',
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/channels-detail/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channels-detail/paginate')
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

    test(`/REST:GET bplus-it-sappi/channel-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-detail')
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

    test(`/REST:GET bplus-it-sappi/channel-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'd35c0435-691e-4f46-b0e6-ad6c2452cc01'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'd35c0435-691e-4f46-b0e6-ad6c2452cc01'));
    });

    test(`/REST:GET bplus-it-sappi/channel-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-detail/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/channel-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-detail/d35c0435-691e-4f46-b0e6-ad6c2452cc01')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd35c0435-691e-4f46-b0e6-ad6c2452cc01'));
    });

    test(`/REST:GET bplus-it-sappi/channels-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channels-detail')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/channel-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '496ec55d-e719-477d-8377-9726b19a2002',
                tenantId: 'c7fa148a-7682-4e34-8141-85da92174675',
                tenantCode: 'yomvb6waygedgjvcxwayn4hjrftxjfxyh6b4qcq42feg60k3hj',
                systemId: 'ca59d6a7-5caa-451f-8c10-4a73105e6cfd',
                systemName: '753ba266d9ei0b3qi7b1',
                executionId: '5561f627-8487-4640-b68c-3783b6970e6c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 19:16:59',
                executionMonitoringStartAt: '2020-07-27 16:50:55',
                executionMonitoringEndAt: '2020-07-27 00:22:10',
                status: 'ERROR',
                channelId: '0784abcd-6c3d-42fa-a590-932baa2a26d9',
                channelSapId: '0scoqfy4jckltu4iy3pswd3w41fxy6xh7xs9lwm9gvfe5zadh5',
                channelParty: '34akaf2wzukvzieqei9q8o119hp4yg71rf4b7un95cq7g2pq19mjj2sauv97jf1xoigjbfnm5oxrps67u09pforbpocn666vpu9e18z96lncm5b9axklhl8lzbr855fxvby9kjnv952qxqedb4wjtfm8nbw18l30',
                channelComponent: 'n8ao70uhj6wqle26r5h87b3l9pr8q3cnmaau1n8fnerpuh2j7b3p3t8w9506vlp1ukb5k3at623aridhlaswubt1yjerbbl3ysszc9qiloszns6nniheg97t7lt3ju3grhyj2cqwj45gyrniu04gh8n9s73tryf7',
                channelName: 'peof8l6sinjlrt38pai9ky2de42ocycdk695lo6x27wriigh5clkkp99r9wea6fxecwb4m01d3m0rwlswhqn5z02ya1hp7zmfxvxbcqh6jh9cb9qqjhf84tpkv4xddmkl0nqjg5d333w3lufdfsb5fex1q0gkfp6',
                detail: 'Voluptatem blanditiis quo velit qui sit est. Molestiae et laudantium doloribus dolorem. Unde assumenda ut nesciunt omnis. Voluptas perspiciatis tempore distinctio officia et repellat ducimus perferendis. Error fugiat voluptatibus nobis molestiae id autem sequi consectetur.',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: 'd35c0435-691e-4f46-b0e6-ad6c2452cc01',
                tenantId: 'a32a2837-b181-4e09-aa08-c7e5e9a168f3',
                tenantCode: 'sxo3068yxon4sc7ziq14ecuqj2a8yu5f7oxauhxycj6nzdoar5',
                systemId: 'f07e6293-cbed-4b64-9210-a1124af2ec75',
                systemName: 'ozgujkqmisf5ff9wlzdx',
                executionId: 'd26cd44f-808a-4dd3-8a60-bb6db1d079e4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 21:54:47',
                executionMonitoringStartAt: '2020-07-27 10:38:05',
                executionMonitoringEndAt: '2020-07-27 02:35:37',
                status: 'SUCCESSFUL',
                channelId: '62fd8a68-8fef-46a9-9523-e3cfb6cc6795',
                channelSapId: '5w5ti9reuv3ylyjbfrkjmobsjbnpnm71kjqia3fomik5h40co5',
                channelParty: 'fxfzz0vjc9r0qizwgdkueg7z2golu8s3cwhblitq8xociobdt8rmw1tziuyw88pstnkcxhfaulsngq5b9t0ebmkng09rq0jvhdtj2jkrairqfvx3icnpwf27vfxzz5nj0dt3ftistg43bdcari15q2joklborypu',
                channelComponent: 'uv8y9n6uygm0k60z6uy7q5zix2uk9b39h8et42c2z7spl3u9hrs7lzyvol5gon75ohwgjj58q1n43gbamkgamo9fifz8j39gqlud85t6ju43sn3bxj6j3tuopaixm3h84dcmjqvwuw3ef3mxwi6fwskyow1prp9j',
                channelName: 'hhqkcr4y8x4i4lyb2or1q4zejj1q3mvcr7jyrdgk1qio7wd0bgc1iprrv37oo010o0r1m48kijfz8nhusjsw8az77vx4a7tnqnpmbazoa1s9ksggqtcez1ujfwo2zympb3ayd5kdygt8v79mdnshubala7vza5by',
                detail: 'Tempore dolore aperiam eius nam. Sapiente reiciendis officiis molestiae ea corporis. Et nesciunt id et esse aut et aperiam qui unde. Magni quo qui quaerat voluptatem id praesentium quis odit vitae. Perferendis minus cumque. Dolorem officia explicabo reiciendis sint omnis sit.',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd35c0435-691e-4f46-b0e6-ad6c2452cc01'));
    });

    test(`/REST:DELETE bplus-it-sappi/channel-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel-detail/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/channel-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel-detail/d35c0435-691e-4f46-b0e6-ad6c2452cc01')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateChannelDetail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateChannelDetailInput!)
                    {
                        bplusItSappiCreateChannelDetail (payload:$payload)
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
                            channelId
                            channelSapId
                            channelParty
                            channelComponent
                            channelName
                            detail
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

    test(`/GraphQL bplusItSappiCreateChannelDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateChannelDetailInput!)
                    {
                        bplusItSappiCreateChannelDetail (payload:$payload)
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
                            channelId
                            channelSapId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '4dd9e558-9f2e-436a-94d0-49a6c272c76a',
                        tenantId: 'a32a2837-b181-4e09-aa08-c7e5e9a168f3',
                        tenantCode: 'wpi329odymgmltianym9k3xnwrv8g1io93covmho63rzk787nw',
                        systemId: 'f07e6293-cbed-4b64-9210-a1124af2ec75',
                        systemName: 'ye6noh3p8go3vjeulxa1',
                        executionId: 'd26cd44f-808a-4dd3-8a60-bb6db1d079e4',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-27 14:53:43',
                        executionMonitoringStartAt: '2020-07-27 05:00:21',
                        executionMonitoringEndAt: '2020-07-27 00:45:07',
                        status: 'INACTIVE',
                        channelId: '62fd8a68-8fef-46a9-9523-e3cfb6cc6795',
                        channelSapId: 'bs2eaexn3g2hn64pwgp0cu8r0sysgr5833xibebxeyss15ltkl',
                        channelParty: 'yvn3zii09h8254tuw3i9rltwk9m71otmqn56ymy4zcvwnqz4yzq1klfcwjrc7f56nfd5tqz04a5hmlxl9ukkgnmcptphedvs0ews45ytnv73f0condr8v1kddnvesj6tbg4hjkrbhy0gq46baf2y6hpus621oieo',
                        channelComponent: 'pskedxio376ewirx9bxu3y4d710qfbl9zd0ndqxap4b0re6ircmmmrm30g4azmr7aygobcsgd0kjbsxnvmksq64zocnonwhz85xmgnvrvwdpcz9n0ko2zzkllh7qv8guht8gzdco54wctoquwa5hkikok4gywe03',
                        channelName: 'yeuhoou70gjedpecf3m1qsdftu3gsrjcs1f2znae94i8y6yygx6jx4onrwbqtsgnoynjc1mmsbxnmfvonmhk591lyr0kl3tbehmgzo9i7dt8ns5cf2eveoyxjhuppegeii1nbntozvujquw0djus94eonj12zj5q',
                        detail: 'Facilis dicta labore voluptas qui culpa qui quia sed. Sint amet fugit cumque sit hic et sed nobis dolor. Est temporibus et. Omnis sit recusandae ullam enim non provident veritatis eos ut. Nam minima modi ea odit aut odit iste est magnam. Corrupti maxime quibusdam placeat.',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannelDetail).toHaveProperty('id', '4dd9e558-9f2e-436a-94d0-49a6c272c76a');
            });
    });

    test(`/GraphQL bplusItSappiPaginateChannelsDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateChannelsDetail (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateChannelsDetail.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateChannelsDetail.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateChannelsDetail.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindChannelDetail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindChannelDetail (query:$query)
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
                            channelId
                            channelSapId
                            channelParty
                            channelComponent
                            channelName
                            detail
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

    test(`/GraphQL bplusItSappiFindChannelDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindChannelDetail (query:$query)
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
                            channelId
                            channelSapId
                            channelParty
                            channelComponent
                            channelName
                            detail
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
                            value   : 'd35c0435-691e-4f46-b0e6-ad6c2452cc01'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelDetail.id).toStrictEqual('d35c0435-691e-4f46-b0e6-ad6c2452cc01');
            });
    });

    test(`/GraphQL bplusItSappiFindChannelDetailById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindChannelDetailById (id:$id)
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
                            channelId
                            channelSapId
                            channelParty
                            channelComponent
                            channelName
                            detail
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

    test(`/GraphQL bplusItSappiFindChannelDetailById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindChannelDetailById (id:$id)
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
                            channelId
                            channelSapId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'd35c0435-691e-4f46-b0e6-ad6c2452cc01'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelDetailById.id).toStrictEqual('d35c0435-691e-4f46-b0e6-ad6c2452cc01');
            });
    });

    test(`/GraphQL bplusItSappiGetChannelsDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetChannelsDetail (query:$query)
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
                            channelId
                            channelSapId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetChannelsDetail.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateChannelDetail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateChannelDetailInput!)
                    {
                        bplusItSappiUpdateChannelDetail (payload:$payload)
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
                            channelId
                            channelSapId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '8930d2bc-ae5d-4385-9adb-6e424da991a7',
                        tenantId: 'f83b40c4-9096-4117-bf90-173ee9d9ef45',
                        tenantCode: 'pzthurkzgca7rru1ulo8c2gqyj979zumsp9wraobq792tgf0mx',
                        systemId: '59ffe9a1-f04e-4e9f-88eb-7dbf8aee306e',
                        systemName: 'rhgpoggfrlmztqaffuxt',
                        executionId: '35eb5c9c-338b-4735-970f-6fe6b5973e91',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-26 21:55:41',
                        executionMonitoringStartAt: '2020-07-27 15:49:39',
                        executionMonitoringEndAt: '2020-07-27 15:54:28',
                        status: 'ERROR',
                        channelId: '47d565e9-da8b-41d4-887f-b4ae92421eba',
                        channelSapId: 'nrf15vo9oitbrkxhnz8qukwo5fay4z2xz0ohus04p8zbwm6i7a',
                        channelParty: 'flml280eo0pvi9bb508f7q424jpxwngru99v8wbbyy7axjvdasunwy6ae7k54uj812184bqshmgokm1tqzew5w7nkb5mdkguinguc7flhopcrcjsfevazzu99phgjor5syxf5jg0forwnyd4a7m6g3ipc9nd8dgc',
                        channelComponent: 'divvlfkpdpp4h3wmm2nmsmtvto4vn1i4ucpybkvtzac8ub5cg6wl5acagqt7opfbd19ugyvf5y4i1diig5803qo1i73v6ll9bqpx62nm3nuemrp1krh941z3bdfpeoav2agsw4esx9rqnf8lwx6k9ak1g8v3sv82',
                        channelName: 'ss6o7xtw8uyghz5vd4gx3zzu234wheivqk202ju55paebfp112cdohvsjbp8kyi0cp4cbgunhnls8o0h78mpnx9xyhgicln6jnj8alw9xq0ddu8w9dqi0bh07kbj4nsp3tfp4ph11keusmjchh9nmi2z826yrpif',
                        detail: 'Dolore ut sed aperiam sit doloremque quas. Et harum ipsum. Expedita accusamus quae. Quo quo sit exercitationem repellat eum. Id omnis corporis maiores aliquam in odit saepe.',
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

    test(`/GraphQL bplusItSappiUpdateChannelDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateChannelDetailInput!)
                    {
                        bplusItSappiUpdateChannelDetail (payload:$payload)
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
                            channelId
                            channelSapId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'd35c0435-691e-4f46-b0e6-ad6c2452cc01',
                        tenantId: 'a32a2837-b181-4e09-aa08-c7e5e9a168f3',
                        tenantCode: '6awio79epmlzrdnpenhn36enksjxajpx10vdlklibbwuk6pvsn',
                        systemId: 'f07e6293-cbed-4b64-9210-a1124af2ec75',
                        systemName: '2613duxudy4rp1aupjgw',
                        executionId: 'd26cd44f-808a-4dd3-8a60-bb6db1d079e4',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-27 05:58:20',
                        executionMonitoringStartAt: '2020-07-26 19:42:27',
                        executionMonitoringEndAt: '2020-07-26 18:53:22',
                        status: 'UNREGISTERED',
                        channelId: '62fd8a68-8fef-46a9-9523-e3cfb6cc6795',
                        channelSapId: 'g2j7dy52guchl0tjcy40ajemfwn5dxhr16kql5bm4utmmh620k',
                        channelParty: '4hud65hwb1rp4663i58ggn1mwygz9otc621xb774v5mjp6vrwsfdoghdisekj8em5kqir41kbv763n63ur8jkct01uqcfcchzmppbnocfq7l3l647k95gd7j966u7q6y0upyf4fegkjhpojt0gbcs8nv397m9940',
                        channelComponent: 'yjleq7at7m7cf74qxa5u6j95xtnzmk1n9jwb88juc6xoonu13r160dtrvy3htx9bq4zuhamp04uvggdfx2u2l7q38xaufg8prdr21ekgnbu3q1ag5nchgy5stxqtllq0036mm0i19s0zqapyp30q62zenb138vy1',
                        channelName: 'ayps4ppa7fg0c68rhnqcnxstybv06nhx66cfhxry9uq81r9xprc5648k3jr0va3tkewcx636zh4m470gtkn1nz1j0wk7ylby73b5zouj6k83mpahi3fioyktlgi45s9634f1vnn79rd75aoqq4k9a740q0os8tuy',
                        detail: 'Officia qui at et doloribus asperiores. Occaecati est et qui cum beatae maiores laboriosam animi. Quae dolorem ratione eligendi placeat fuga voluptatem quidem dolore minus.',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannelDetail.id).toStrictEqual('d35c0435-691e-4f46-b0e6-ad6c2452cc01');
            });
    });

    test(`/GraphQL bplusItSappiDeleteChannelDetailById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteChannelDetailById (id:$id)
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
                            channelId
                            channelSapId
                            channelParty
                            channelComponent
                            channelName
                            detail
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

    test(`/GraphQL bplusItSappiDeleteChannelDetailById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteChannelDetailById (id:$id)
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
                            channelId
                            channelSapId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'd35c0435-691e-4f46-b0e6-ad6c2452cc01'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelDetailById.id).toStrictEqual('d35c0435-691e-4f46-b0e6-ad6c2452cc01');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});