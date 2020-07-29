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
                tenantId: 'db5bad96-c700-4aee-a85c-dfe278dc97f1',
                tenantCode: '5waxvtnqbduvtqcybpwbwobfglawte7k3fi4w07s6kfczoilh1',
                systemId: '9daa226c-1e69-4364-859f-98f77ce408a0',
                systemName: 'n0t1fx9of63y5czib00c',
                executionId: '3d9ed954-a7e6-4415-9558-c588f3a67d5f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 18:56:37',
                executionMonitoringStartAt: '2020-07-28 22:29:13',
                executionMonitoringEndAt: '2020-07-29 00:42:10',
                status: 'UNREGISTERED',
                channelHash: '2mpscymw8wsl4a1p67a2u49uzbskcm3al1jnn4jw',
                channelSapId: 'haw2t2aer29cynh2d6czstie3rjlt7qeb6t7x5o860jvjc53ns',
                channelParty: '73t2hpptzf79w8on1uw1konrg20h2lz4irv1m7wmpjjkdv7ey6d0wanfknrgg5ag5wejn3x4m8bgyz71tp16geong615e36f6e8blbejuzcfxdn491x4s0ukzjxj746rvyz3u8o4qtke3s7sq2u9heb5qutasavg',
                channelComponent: 'h4slcao9dgy12zezjskhdjwp8hevzd9pcc72un5hglxzslgjrzggrp6ec8b2aiexv9gtrn10wcfwku45koqnhlrjmzaey17pdkv8ezf8v163dgnfarzhc1h2ohk3u8awljj7v4qvfl2tuksbn0ajymiytvssn8ii',
                channelName: 'sh28u6lqmmili7gzu38mdk4vpfoqi88th9wi2trlz1es2p7rz2ces0dn3z9fv62s3fm7lusp4oyxlismjtzegfwmu97fqxknz1ss833w0dr4n004iv1d57c0jxmgw9xht2wv19lqx4db81m9clg1wwepg2nzuwl2',
                detail: 'Ipsam distinctio unde. Mollitia ea maiores aut numquam impedit sapiente rerum rerum tenetur. Velit cupiditate quae placeat.',
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
                
                tenantId: 'db5bad96-c700-4aee-a85c-dfe278dc97f1',
                tenantCode: '1psydy82jqp0ryrybmvk58c32ce13i7qnt0739bu4izwph2ijt',
                systemId: '9daa226c-1e69-4364-859f-98f77ce408a0',
                systemName: 'b74v81jrsp6hmzf972pf',
                executionId: '3d9ed954-a7e6-4415-9558-c588f3a67d5f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 18:59:22',
                executionMonitoringStartAt: '2020-07-28 19:37:05',
                executionMonitoringEndAt: '2020-07-29 08:35:50',
                status: 'INACTIVE',
                channelHash: 'zwik3p1gptycghdj7wpuc6z1doxw91tgzc2gsuku',
                channelSapId: 'etoht08ekmg72h4pjzsciq55svsbgh6uwtk7wljdu965ezd9xy',
                channelParty: 'r67c1x9qbjc18hmxq7htc0evyd2x8c8fo9p0tzc5detwkhu2272cjh6nh0kw0warguk1s9igmnv85e8sfruzglkd9z0stfoapdnhj5valg138qxux6wjjj2z8q1fo2ndefmxbdtnawxso946pm963j41sd2qutih',
                channelComponent: 'fm341mnzapmp71u9kfe1f1e7w44jhkioqrj81m1yigujadtwimx420va99mv34we44c6rx5pr7mcg2v36xfmvbp5rj9a383y5lccwhg8jbzrgog31w72azvwmmsczodzhyl121tlusi43p093k1o8jxpv129986u',
                channelName: 'kgknrdapcnmpetjmmf4zeegqhxos6oijluqvzrd1uxu9i0z5nlke0icr5o87itsxii9py2nf83qz4k57oyn741foeqhl8a06wo2mogxkcqamw06o6gvn5nhn858zzvsrze1jpne5qqonthoq0vv0imrme6gbssd8',
                detail: 'Recusandae voluptatem est error nihil beatae totam. Quisquam molestias sequi quidem iusto natus occaecati nam aut. Accusantium neque officia officia deleniti dolore modi et eveniet quas. Error libero magni nihil. Ut facere asperiores placeat eum non hic voluptatem dolores.',
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
                id: 'a8a619c0-f32a-48f1-8b56-87821e187ac9',
                tenantId: null,
                tenantCode: 'a4lwhlofddawd6jorze4vvuc9gwsdh01x7jgb5rj6vy5c7rm0g',
                systemId: '9daa226c-1e69-4364-859f-98f77ce408a0',
                systemName: 'f4kvejn6clx3p93ih2jg',
                executionId: '3d9ed954-a7e6-4415-9558-c588f3a67d5f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 20:24:55',
                executionMonitoringStartAt: '2020-07-29 12:28:13',
                executionMonitoringEndAt: '2020-07-29 11:27:07',
                status: 'UNKNOWN',
                channelHash: '16rms8ird8hm4jtmnadxo70lifcqe8a9phl7ui0e',
                channelSapId: '7ta2jkmovhsv1ef8h887pqbb99pjij2jznpbgs24cbjespy6z8',
                channelParty: 'sbvgy6x1un1lifffxk9t8bcce3jlyn8dm1nkz001j35r1fz3sjpklppw8jr62jc88bf9fqpdtrccgc682ofqmeaj0tabou5hgevsdoikp5knhlqw22e01yhc6jtj0uw25masl8s33zhpeb61xmlnhlp5jwn2cswt',
                channelComponent: '9tokbtzt1uffbjc01p578g49bm3tpc4sm8asyqj3l9lwg0yj6ywichwp1k42f71wuff0emq271qixr4khnogtipn520mmshz8do69izw0z0noh1h868ujj2o67ue1087fe81fl0wxe028m14olzth0wc8q8zdbwz',
                channelName: '78qixegb77iho60uk19qb4th527k2p9c2f0fo03tgi8f7tiusymmrbcjk8hrp4o2vbgdo0ggk972leglrrcj021rvbtlxo77ahjifukvxiafkce13lzxan39l9lq928ni6alsqbvkjek7gj4zb1bvjp63r9kvzro',
                detail: 'Vel rem itaque dolorum illo necessitatibus dolor labore accusantium. Eos omnis et. Consectetur ut rem commodi. Rem eveniet officia laboriosam nihil totam dolore. Facere laudantium sed unde et.',
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
                id: 'a8a619c0-f32a-48f1-8b56-87821e187ac9',
                
                tenantCode: 'fp7oeie44omxy8n2k10q5r4x8od622khhqqqct13yqgvphlji7',
                systemId: '9daa226c-1e69-4364-859f-98f77ce408a0',
                systemName: 'wxtnk0wjlrk6okdpnoo9',
                executionId: '3d9ed954-a7e6-4415-9558-c588f3a67d5f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 06:38:20',
                executionMonitoringStartAt: '2020-07-29 10:29:14',
                executionMonitoringEndAt: '2020-07-29 10:47:20',
                status: 'SUCCESSFUL',
                channelHash: '203mk83xvtgk492ts1rxsomopq7ptptinmqjykab',
                channelSapId: '0voofthegpgg0ydekz6nkfmkirztflw4w54vx9j3js5suiea7n',
                channelParty: 'v825yqrattpwyg9wensln6dpzgpytbe1boiryq41btox495qpeqlqel6ceb7v0v7hg8d9c6bkdqy6k8jds6njs9aw0v59h1nf0c2ggj8q1kfxx6gteiw48kzhclcgzi8fr7p732lhdvjrnk4gl4tbsy5niln6s5q',
                channelComponent: 'n3rtyfgjxrgez5a1x62tnpuymg7v1seyjushm5s52387hjrwnrxd80sb7bqallr8q4dmsvucnvay1uw3vjo2en3syallpikkyvuwzg4kpgwqod86tty8687z71j60lyask26s49xrs7lzmxxf4dex06if8d3ocme',
                channelName: 'wpnjgr4f7hq8xbyk2cjjs9shfniruuadoaxxhp03yzvvys9e9ifvbmnpl8st4th14v2ma7862wp1ceqi8zc9m0cjp3980uecrqs6xof6gns1ptxqwmxp6ok4qsbr3t5raj7qwixijpnv46fiwy3wwyeek8l8iv58',
                detail: 'Qui nihil natus et. Sed ipsam fugit est qui eveniet deserunt inventore. Dicta et laboriosam pariatur quibusdam doloremque aut minima minima. Quisquam dolorum qui quo error explicabo reprehenderit sint deleniti ipsa. Assumenda consequatur esse. Aliquid minus id eum atque incidunt nemo.',
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
                id: 'a8a619c0-f32a-48f1-8b56-87821e187ac9',
                tenantId: 'db5bad96-c700-4aee-a85c-dfe278dc97f1',
                tenantCode: null,
                systemId: '9daa226c-1e69-4364-859f-98f77ce408a0',
                systemName: '1h2hek2w47hcrovjbhl4',
                executionId: '3d9ed954-a7e6-4415-9558-c588f3a67d5f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 01:52:08',
                executionMonitoringStartAt: '2020-07-28 20:40:01',
                executionMonitoringEndAt: '2020-07-29 06:27:19',
                status: 'UNREGISTERED',
                channelHash: 'i14peh3umfxo1rqk95nhyyj85h68u22f3phkynz9',
                channelSapId: '3q5wmuz9jvylr16bjmes86prftfnof8rh09v90mduf5fbw12vk',
                channelParty: 'syeptuceqgvppf2uh6lm7c8w94t5l84prmao0gurzs417x7z3wghkvahmv7gdmxrpre36l03grggunmw3ytfg2dpll00y1wewui2krgdskm4l673ju7th1jc1z38ekqpnjhoqi9wc13e3wli8xx0iokm7223b2wl',
                channelComponent: '7wfv54yutkjk9qngy20clh53bll3y8mh1m4lo8foc7hk8wt48lgdhtdpsjvp4bjmk4arcuvvf3ugjbnz8eihba58lm01cy67dxcpxhkzlopcwgopplbab3rnojtji2swvgb6ow92o4afo5xtiqedfmdhhou0z9o3',
                channelName: '2nn9utk57cufdmgrhodoyx76icj60b1zvr0241vw1j8rtcvurdvipu19pv5753r8vzjwcgl0kcni9pqkh8uj5603urrjp13z3ki47ce2dtg8r8vkfls0gf7qmpzmn9lrjgo6e3zxhllpxd6b2b4k16w55jdtdd27',
                detail: 'Placeat tempora earum qui et nesciunt laboriosam. Laboriosam sint molestiae eligendi et. Dolorem quia aliquid consequatur. Est quod expedita sint molestiae magnam et labore rem.',
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
                id: 'a8a619c0-f32a-48f1-8b56-87821e187ac9',
                tenantId: 'db5bad96-c700-4aee-a85c-dfe278dc97f1',
                
                systemId: '9daa226c-1e69-4364-859f-98f77ce408a0',
                systemName: 'qcdz0erfmqfx71ajzgpg',
                executionId: '3d9ed954-a7e6-4415-9558-c588f3a67d5f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 07:55:44',
                executionMonitoringStartAt: '2020-07-29 07:49:45',
                executionMonitoringEndAt: '2020-07-29 02:51:42',
                status: 'UNKNOWN',
                channelHash: '9sy673vv80k3vbjthrzw2s5rpfxil8fygz9adw4k',
                channelSapId: 'wyr96hx5smzlot6on2j9k053pgfzh5w6ts1x8g5j418bbnzhnx',
                channelParty: 'cmj5nq9zuz61ypaj3vutfwrml4f5asokz4gjikqqoz3xx5kpi1etwmkbrl8xamf8c4npy8gt2qi8dj0u8wquozf6um737f3cp9zg7dhnxoh0ppaydx1z9l13ct8nkzs4pe3gn6bol5ocd14v4nlkegpnq628q0u6',
                channelComponent: 'td9yerjvru2urwd1p1bkhcsvzppa5imjwmj609sgvv60bwa06nm0sz66c78dr6jajp7bnnmj8od3memk2o3sjnqviqqc6m3mp7azfl6u1xgb9a7kclguj11riui8ofnl8wvrpibktd8baopa4lnye560q4bxblta',
                channelName: '3s5997hmr34fbu417cob3zloy4fwwbyh2svs4oiubg90m8dioezshnaikya29o27zjgbmso8rauf2mhyyqipwuig69eyvr6xzxvqe6x2m7jocboadeey55mpyuawea1xo3qvwh3ki49c8bdicw38m20s58u6kzxk',
                detail: 'Quia vero aut velit ipsam id placeat sunt quos praesentium. Est pariatur deleniti eius amet unde numquam. Quia aut molestias maxime blanditiis. Rem neque architecto alias minima nobis eum. Fuga laboriosam eum. Eum id autem ex et ab totam.',
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
                id: 'a8a619c0-f32a-48f1-8b56-87821e187ac9',
                tenantId: 'db5bad96-c700-4aee-a85c-dfe278dc97f1',
                tenantCode: 'mtmxshgdzxrz9ayyp7a59eeva88vepzlqa6wovhjbiaa4usq3k',
                systemId: null,
                systemName: 'wn6oe4x34p5zinjaslek',
                executionId: '3d9ed954-a7e6-4415-9558-c588f3a67d5f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 05:23:50',
                executionMonitoringStartAt: '2020-07-28 20:57:10',
                executionMonitoringEndAt: '2020-07-29 06:07:33',
                status: 'ERROR',
                channelHash: 'ubir4litpe88mdnvx3kjql809m4u9xg7zboi2k2k',
                channelSapId: '86rro2to9nb5ujp4wkf30y0b8yoaml8rfnizitrlxtowy33lqm',
                channelParty: 'reuoyy3gd6c4uy3shral4qqh3p77686gwdndchbd87anoykjwf1h7j9diexk5l0kgwahp55rohc3thkoyuttecoakxru6vli4q8en7mgs2xtrmhloo8o09pygml6zy01jchpfciojdhhw10sof3gl9q08w56sqyb',
                channelComponent: '5jik41coosfdm6401qsrgm7bnrewb6thc2ksbmuak9x0l31e4axzlscjfpdw0te5ztaaxunksjtpqaftlpa825y8lyvg34s5wh3xfptgzusyyb6wcfcstt3ob6rlyqv6inhjuzc9yf7cc4jx9tda3yolw1r59moi',
                channelName: 'a7wt1mpo9s4lz11z4qp2w7fo0uwl82fwzju2rw8y9ilsmrxx5vuj7igvepuk4grj6ww83egj7nyg7c8351gfsa301ci26fzlap8jojqglh1dkh8ltdaccgsjpmtb8cmv8f25dcz5x1mwjmw3yf6yv5ry05atn936',
                detail: 'Ex esse sint labore. Dolorum itaque qui repellat et repellendus. Qui sint dolorum. Praesentium veniam dolorum nobis dolorum. Quibusdam praesentium veritatis fuga aut autem et nemo.',
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
                id: 'a8a619c0-f32a-48f1-8b56-87821e187ac9',
                tenantId: 'db5bad96-c700-4aee-a85c-dfe278dc97f1',
                tenantCode: 'p7jeeik3pqwq49e8dwuxweqhl0v6hbtw5k6vsiyri6opmyj3b4',
                
                systemName: 'gl9q5h2ek61zagxa9l0c',
                executionId: '3d9ed954-a7e6-4415-9558-c588f3a67d5f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 18:11:57',
                executionMonitoringStartAt: '2020-07-29 02:24:52',
                executionMonitoringEndAt: '2020-07-29 07:04:24',
                status: 'ERROR',
                channelHash: '7n9c1fdqukf336492qaw7mrw01sljrfmlck3da20',
                channelSapId: 'xs0rk0tq54g1qt2hsx4krqysyj9y4yz4m6kip2suwnja10jts5',
                channelParty: '7usebe1q45cwvjy0bqzsmv3sc6icg9mg7v7nuguun2blu1hyvruyt885epdax5d1ut8t3pt36y41zzi8hd440pdysi2y3wp931zxv0ugcl36g0td3jbr77xpcrsv1lxrye9a2vxpfoka2r223mc2p8ad9ja4xsqj',
                channelComponent: 'r3x18y6w25ymlen8kh18ddjw5ez48lyywa3rd6sec7vvcritpstslr47cudjbw9b6hgvkn9ng6g7f9ymlpwak6d0kvpdwxvk7eadgsw8vqhnrjky9rttcnzv9t0xjmvpizfgl6lbhdfqeupsldzoddf3f86t8qlz',
                channelName: 'ds4bekh3qztid1rdn4f2p5n90iokft6aum58jwu9xu20yooa5k817ma43n30zbtkjyuykyxps1x8b0n1gjotjjmirfqeezgt6gjmbsjznuf4urpk6y8cfgpzp4le18pjwnpektwsy3mo8lcrdln1hqk6wwn8blnw',
                detail: 'Omnis voluptate qui culpa placeat reiciendis aliquam corporis. Ut eius repudiandae consectetur sed dolorem minima quae. Consectetur perspiciatis sint ullam dolorum voluptas vitae ab. Dolor consectetur et molestiae omnis et voluptas. Animi dicta voluptas exercitationem enim.',
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
                id: 'a8a619c0-f32a-48f1-8b56-87821e187ac9',
                tenantId: 'db5bad96-c700-4aee-a85c-dfe278dc97f1',
                tenantCode: 'uuejcfbopihwslxbpqwezbwtt7oog8qivmnyxyej9bwv35ltos',
                systemId: '9daa226c-1e69-4364-859f-98f77ce408a0',
                systemName: null,
                executionId: '3d9ed954-a7e6-4415-9558-c588f3a67d5f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 10:58:05',
                executionMonitoringStartAt: '2020-07-29 02:30:53',
                executionMonitoringEndAt: '2020-07-29 04:25:33',
                status: 'STOPPED',
                channelHash: '5eizyqtqz1uguq14qfh088ltqhubmitz02tq5gps',
                channelSapId: 'gugn40gc871zvskceb9dvfp2w5lmtcyptscv2ax93wm5t203iz',
                channelParty: '9vip5ehm5rozm2r1clpspz2acswrjqxfxnma35f6jam53j80rwp7l1fdn7t2eewdk3stt3vr0acir07yxmunyzbcgeja1uby7qiz83cpoqv9ighd51ztlpjqgybecxvotnhvbozvvsindn7yyn4rn2ldn7o85qqz',
                channelComponent: 'a624j8hiya6u5m2pbe03qwc39c27zfgrkddh9vte3jhw70wy04oafijgscm1yq2clje3ms0f7qnhv5t9r4ce2pwixudljs8xtxnstpwvyp6fmksixe80kd2jqjppsictru1iercuqmdbicv5hiu6h0sd9vvj830q',
                channelName: 'oahi4fgwwp52v2i2m80ym1ynj8wvr97hdx2nxwz384lly8egd8f6d0qt8mrmun0cks8s8522nvmtezi1lmfuiwrpptrqd2he5s346fchbperwjtwgdl3w2f6v2mo0snu40qw7qbnzah9gm8dbtmhpz2niyrcyeel',
                detail: 'Quos dolor quia consequatur consequatur eveniet id quisquam dolores. Harum alias et est facere non praesentium aut odit velit. Vitae autem quia sequi molestiae enim impedit sed unde. Beatae reprehenderit esse in aut ut debitis.',
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
                id: 'a8a619c0-f32a-48f1-8b56-87821e187ac9',
                tenantId: 'db5bad96-c700-4aee-a85c-dfe278dc97f1',
                tenantCode: '45tad7y5x28emibbo7bvowv2wcicpgh48mtfi551utvcgq1zuh',
                systemId: '9daa226c-1e69-4364-859f-98f77ce408a0',
                
                executionId: '3d9ed954-a7e6-4415-9558-c588f3a67d5f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 00:56:11',
                executionMonitoringStartAt: '2020-07-28 20:21:05',
                executionMonitoringEndAt: '2020-07-29 15:02:15',
                status: 'UNREGISTERED',
                channelHash: '9tl9m7a1y3khhez7q8l3ccba70rux2elmw9jnswb',
                channelSapId: '2ke99gavrp1299d883crg2nftlwh08q08me0o2s87yczf4upwa',
                channelParty: 'qp3scoxmwqet2tieeiictllsm6j54vpmswa0edqqf7bvmi314tjt48htlt34mtlf979bkid2hgt36e7o333h6uuw6x9mtbzq74wn45g72otdcvysylh01dd8nxd8uam4h0v8xud9f378m75vzwjgs2ut60lppnwz',
                channelComponent: 'urhajrvyigx9m66mwh6mhy97lbzd1mrx8jpk3nlq2h13bqrzmqvgrm64rtwz7uyqpmtrcg4tyf6gb4sf9vg0sx6olgm2giauqpit0pvkhdf1y7ayirq9liub200ss21v6jab7ebx7lfj8ar3g8e9c17vuloanuqy',
                channelName: 'mj2556ovnb11j8no60y4bjggqxhm86adbkkj0uu9p73x7b351aq1n8a2bn4pvqz72u6q8spkbfeb6k7nlw62kysqjwzufnemmo6oiv485itryzvksnkbv0d3xfxr3d1rvgxb1sqf24ov40o86hb1nlccayfjn0u3',
                detail: 'Mollitia quo dolor qui. Hic exercitationem consequatur commodi cum laudantium et in asperiores rerum. Illum et ullam sit id id. Aut officiis quae beatae nihil et.',
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
                id: 'a8a619c0-f32a-48f1-8b56-87821e187ac9',
                tenantId: 'db5bad96-c700-4aee-a85c-dfe278dc97f1',
                tenantCode: '38sszncs72jbqua60yvu9g18lqqyz7lk8o79yoe5u1ibmasmt5',
                systemId: '9daa226c-1e69-4364-859f-98f77ce408a0',
                systemName: '6xt98m50z2la0fa20iqk',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 03:05:01',
                executionMonitoringStartAt: '2020-07-29 00:12:34',
                executionMonitoringEndAt: '2020-07-29 13:04:14',
                status: 'SUCCESSFUL',
                channelHash: 'jn1fex1iczjunbwa9ks1ra28php9la353i87b80t',
                channelSapId: '2qbxolvme227kemklttw743lp2rgczhuqvfutorvhc84ms2ddn',
                channelParty: 'b1jopi9i107mk40324edsjo4kc9c6hcgq7z1a0uiwl7kwsd3mvnd9v3giyo1uw0n8re464flsy7em5te2b0ghn8j52x4w5thhdhjzeyun8duw7wa47vpsx98cetac8xmzda9z0iwftg88feyapi4c9zx2zfse1eb',
                channelComponent: 'shmtg0rpmrnlledx10lo9s94fwaxv4c2mtcu0d8os1wuf6vkb0h6z7r12desmsxxwyr42kbogxslss8jl1gnk3tfc5kn5uwauml1en6386y83wprg3w6bt0a7x8hwcv6hxcedbypuv4h8zibb5ixx4nn6gy4l10d',
                channelName: '2d5rvumg3hyedxq1yk029jt9abegoktsnnta0wxz1aa1f65ffdyy7uw91yc89zu2mqree77ak1ung6tj42uib4jkskqai2duku7nhqt2qa0lpvf99wluc3oewaccv1g8xv3drapny7sjma590qilru97kov0w557',
                detail: 'Sed sed vero minima dolorum dolores in dignissimos. Numquam atque eveniet quos dolorem in sunt commodi. Iure esse amet eum. Reiciendis reprehenderit itaque. Unde voluptates inventore vero aut voluptatem explicabo.',
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
                id: 'a8a619c0-f32a-48f1-8b56-87821e187ac9',
                tenantId: 'db5bad96-c700-4aee-a85c-dfe278dc97f1',
                tenantCode: '1n6f3852uenvlb4m6jwo8chsio7294rjmvcs8nme42xd2b13li',
                systemId: '9daa226c-1e69-4364-859f-98f77ce408a0',
                systemName: 'es2cuk74hlhem5dbe4gu',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 09:52:01',
                executionMonitoringStartAt: '2020-07-29 03:16:20',
                executionMonitoringEndAt: '2020-07-29 11:04:52',
                status: 'STOPPED',
                channelHash: 'lpue1k9iq6qd4tnl089fzq5onn84g8tjw5bnsrop',
                channelSapId: '1b3h9jk1a5khkdff7oemk8gpfogx32bhr68a4oh6lwtaglknkc',
                channelParty: 'r6qfb71mym2q0ieo42gznwxnf8ft8165a0xe3x3wid3296nsd8ethz806248ssxvwce8fqum1zxf14fb92k5kyxajhzeu7u11ckdfbtpllij043ley5n4pjj1465tlpwa7jejz4gwham5lq1m0wbd95pxkib1nf7',
                channelComponent: 'y8blwwu5vo65hfqwxgikguxjrm5frthx8s4i1pe9u1rc6o9e18bn0624uh9luxkhkao922uleugykghg7h7i2m3mf6jhc8uz24v2o9p19lfnv0ylva30101fjwgfdnhigqtj98xp9s1e9u2d4hta0b8klyju9vcm',
                channelName: 'vzbf3idsm9xjtmtti0kmijq9myc6n3g3a5w4iwf48je3vbu5w88pedjh0quyosyd5wkinmfdg0ufwhqigasnxgzgb7prdboqtpa6s60ued3r2dt1jblh6o9g4oj3b2foqkokniieuox4bpurq0ks3e0o3dtvcebv',
                detail: 'Eos laboriosam voluptatibus. Quae odio id ipsam beatae ad molestiae autem iure. Atque nulla maxime. Eos ea quo omnis voluptatem.',
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
                id: 'a8a619c0-f32a-48f1-8b56-87821e187ac9',
                tenantId: 'db5bad96-c700-4aee-a85c-dfe278dc97f1',
                tenantCode: 'bhorzurallpxjnk60tljwbcj0fvryy3pk61hgv6xcgtertiei0',
                systemId: '9daa226c-1e69-4364-859f-98f77ce408a0',
                systemName: '8zh4jadmec04ppgnhrxg',
                executionId: '3d9ed954-a7e6-4415-9558-c588f3a67d5f',
                executionType: null,
                executionExecutedAt: '2020-07-28 19:37:47',
                executionMonitoringStartAt: '2020-07-28 23:53:52',
                executionMonitoringEndAt: '2020-07-29 02:44:18',
                status: 'UNREGISTERED',
                channelHash: 'e2kimomhyjtk12ur3kk537abim576ztwvjbo54n7',
                channelSapId: 'qm1p5a5q99g2by3jqrdyp691h1e0465g5p5d6djuh2wg1b5ubj',
                channelParty: 'be3x2e9qwajtqwwpfug4pe8iydpxvit800entudq990j5hswv0l5ytqde1glc4z520q4d9bcm4wn9768zh5u5nl27reiuql862htozl9z0gp3vfrqnh7yerm36uqabud9u50pufnm770dezocereo8kp3jwkmzge',
                channelComponent: 'r7apd5borr2ff7t8wvr4htkdv1a1j6wpvbtw8is1yk1mrq85bk696h497ruyv97io6d70lwssf7hfjorkpqyeczjfnsnqssinmehbyoc6cuesijn3l8e8rtpf7p14ndixj4rdvhj9bwmcisxmupxqis5tlv9d252',
                channelName: 'c91zjb8oicvku17rub1zumlgtlq6vwz4f2c640y7590y39tiv66yc2v9c2oeyt5k4ph7n1zjkq60dbba5691hpap3rwwpvhcltkoenc9al79h00gwchlzlxsfoejb2p2lpwaezbg2n7xrkq6v45bmq6qnf63akb9',
                detail: 'Blanditiis omnis non dolor dolores quisquam quos in. Et ut ut inventore aut. Omnis rerum neque pariatur rerum et. Blanditiis est nihil praesentium accusamus voluptate nesciunt quod.',
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
                id: 'a8a619c0-f32a-48f1-8b56-87821e187ac9',
                tenantId: 'db5bad96-c700-4aee-a85c-dfe278dc97f1',
                tenantCode: 'z48tpghc9wwre6l0lgb54gk5qf0odbj3loxpq9epw7b6ylqsq9',
                systemId: '9daa226c-1e69-4364-859f-98f77ce408a0',
                systemName: 'tl1g7jcpxm16nu5lns7q',
                executionId: '3d9ed954-a7e6-4415-9558-c588f3a67d5f',
                
                executionExecutedAt: '2020-07-28 23:48:25',
                executionMonitoringStartAt: '2020-07-29 01:37:04',
                executionMonitoringEndAt: '2020-07-29 04:16:50',
                status: 'INACTIVE',
                channelHash: 'z6ivpne0k5bcecilkn2xgwzf7lfqtng9n1tg0ikj',
                channelSapId: 'ltsdr0swuydj8verirvkcbc7xhhpx3o6fvosju786urhj8oa07',
                channelParty: 'v1h2d2jz9fna9ut16s2ybq2ttsnjgq47vp29qdq0239cd7n8jldvyz79a3ffssy4pu0mg7aq63o787f422zo77zoky3qq4ji9ihjpcvhhki8fn4pd7ccc44g30qhb19ep7g17lty5ibph3v44yrjg7ill8y2owdd',
                channelComponent: '20p0f5upc2bqt5ihijnyca03k0el1svc7nayobttpsq0etfqxsotirq99f6ab7eichs6shpycuvqtl28mr74lfl78ikdnuri4x1wqk5vv3gi2mlt7jbdyzwnnbm01mosfgh5165m8er4o2673yucreu7lauslf3n',
                channelName: 'ate8ssbcdlm5e0gk56ohpcvddhosuh1en7we81ghcd4vu2n70zz5vmem3ifm4hqp1edw8a6j9056mh5jsggzjcithmevu5rm0heoon0nqef7m9830ea10jbjyb3l4j3l01erskzgacsn1vdmlkklb4majdc7dozx',
                detail: 'Cum ut eius culpa officiis ad quia magnam aut. Et autem impedit numquam ex. Ratione harum sed odit assumenda.',
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
                id: 'a8a619c0-f32a-48f1-8b56-87821e187ac9',
                tenantId: 'db5bad96-c700-4aee-a85c-dfe278dc97f1',
                tenantCode: 'bq4bfhpsre633m6rkn7tablhzr4d7aj8hk5zt2e6lql3ibqf91',
                systemId: '9daa226c-1e69-4364-859f-98f77ce408a0',
                systemName: 'so4eo0pue6swzg30d40w',
                executionId: '3d9ed954-a7e6-4415-9558-c588f3a67d5f',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-29 17:02:24',
                executionMonitoringEndAt: '2020-07-29 01:13:38',
                status: 'SUCCESSFUL',
                channelHash: '88idr0whp6r7uraeua6gsmlmq2vy2n6jsn0p5j4b',
                channelSapId: 'gy3h1aavb1ztkc5d97vfmgfjmuhddneswt7zez4xggajk6e2ka',
                channelParty: 'moqj1njdsgnyp2w4cbovqpulnodnqv4cjse6uvckxxkubuqftggma8kf5lw3pzr65h6joqhaa7dat9mwtn80g4oxisusk1t8mmk3mrdw7nhw6mnadrlmi95mwxmjxfgc9usfqau17a6i169l1hplx058ge5aqd8o',
                channelComponent: '7483ou5fej0dtxqgou9cygwl74yzt16r3tt3n8768eotl5l9xiu5copa9pifga8mlrdrnhp8cuqq0zbtjddgfs9smng4jt9j3dewcrbzqi3pw5hiils2e32ckpjsw7987uutceihkcpxp1w8gj3zwiuet2x2r0et',
                channelName: 'x9tu910z9bhbbmphp97y636pbq6u7k93w8o24rizgwlhgu261mgvc0x51ys0wkyqoc5i5b8s1pjspc1nthzakbnu003jvxw1v8p99ufma3n4m1hko1qp92kmsbkqe1ynsqt3gir7o1vphwrg3munuora4xec5k5b',
                detail: 'Quisquam illo maiores quos. Perferendis rerum quis. Omnis esse sapiente voluptate.',
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
                id: 'a8a619c0-f32a-48f1-8b56-87821e187ac9',
                tenantId: 'db5bad96-c700-4aee-a85c-dfe278dc97f1',
                tenantCode: 'v5ses6j6dnuslw96wl6djw8hwe9uhplbxx05pewgjm63uu9359',
                systemId: '9daa226c-1e69-4364-859f-98f77ce408a0',
                systemName: '47sz53cy4onn2bzhxn4x',
                executionId: '3d9ed954-a7e6-4415-9558-c588f3a67d5f',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-28 18:29:35',
                executionMonitoringEndAt: '2020-07-28 20:09:30',
                status: 'UNREGISTERED',
                channelHash: 'yry1eb0l0bni4mtm3xlsworc62klw80zxetxxig1',
                channelSapId: '97lur07uw47pzurudsteqksa3o2jm11uo4y1ktezub8jjbvrsv',
                channelParty: '43wsrptq31bf8tkdk54z17n1snt9fvzv3d4oll7eilbup3mz3unrvart6c9n5tuvp4o6dvgyr4n9c40m2wqb9gm7vv8g7nw2tf38elcf3bpoeu3osd281t75nx16pogfxayqn6j4stws0n7gk30zhxa6wiuwh1l3',
                channelComponent: 'iv7u3a9l9p9bjri17yjyyheerq4y5xz5hi5z151m328y3gswxya8tkehrp50h413fm09p3yz05pln8j7kgpopypakrbjopde3d6bage5mto7k1yh88wa7lmmfuca8ytcg42nblzr59n95a90b036mqkx6da5uxx5',
                channelName: 'uy38djv5i2w67035d2gqx737ancgkl05wy9vz96ovxpanzfhqj3qqdrcj89zcvhqn55vcw0u2sw9j3s0ex6coakqbio6ydxada40cvkifxshljrd71qja9khjjmvdsn2k2kop44f9lm0671ps8qi5fbam85jzsk9',
                detail: 'Autem quia cum voluptate quia sed in aut. Qui sapiente vel enim. Quo dolor dolorem tempore pariatur reiciendis.',
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
                id: 'a8a619c0-f32a-48f1-8b56-87821e187ac9',
                tenantId: 'db5bad96-c700-4aee-a85c-dfe278dc97f1',
                tenantCode: '3jbj6t0e5nc4752skoi5w7d469avt19uy9szgznqc9x2u7v7qo',
                systemId: '9daa226c-1e69-4364-859f-98f77ce408a0',
                systemName: 'z5q13lzo26p5o2qf4t0s',
                executionId: '3d9ed954-a7e6-4415-9558-c588f3a67d5f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 16:25:36',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-28 23:44:49',
                status: 'INACTIVE',
                channelHash: 'fbthd67k6fgsxnm3dw0xy98qjhblgdboeoj09bx1',
                channelSapId: '46yhhv560fdt47wv4zpqno1lw85t9u19h0oelxvhwwpf3siwbn',
                channelParty: '7ydv3cw2lg4r5jf8jsc18u1zapc6s5sjprirkzb8r68d20gnp5htv7trgybbu7yvzgt4jq5f086vkwud8g9v757df8uym3lej1b4hatn5igposvjbtpsvkyiba6fz7im34ywyaznytlkyj39ki6drtxldw3r9tly',
                channelComponent: 'vdfhng5w4acf51wuuoj24uowfdvr9zoopd9h6cdhy3vcvf807q4wv2qwsh3ulsghq9vsg3wb6xisg75q3ijcedis04x03bhqwttq3w9z4o0abb22s9larzmj563br30xwmufmktltjft61kvnt76p5e9onlbo6of',
                channelName: 'h5bqxxfnqbixpezhj2422v7io7847ps5dvo3m5a3o5pnqb058wq4oup9o4938nyij2b0nvanvfajth11k3mqh3ae9h41phm0hwwio9i5zgghn2hm5evnfehhufzpbffl4okymml7kuk7jsrl4t8lpzdhyooukfmt',
                detail: 'Qui consequatur dolorem molestiae et autem consequatur nobis similique. A aut molestias vel. Sed id sed ut ea qui omnis incidunt.',
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
                id: 'a8a619c0-f32a-48f1-8b56-87821e187ac9',
                tenantId: 'db5bad96-c700-4aee-a85c-dfe278dc97f1',
                tenantCode: 'vpku78uivfbfwza53s9cnxiexeyylfo2uogdhhjf9x3w5z7twy',
                systemId: '9daa226c-1e69-4364-859f-98f77ce408a0',
                systemName: '3fk68cq0tsaobx23pgna',
                executionId: '3d9ed954-a7e6-4415-9558-c588f3a67d5f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 10:03:38',
                
                executionMonitoringEndAt: '2020-07-29 07:29:08',
                status: 'UNKNOWN',
                channelHash: 'b0wag9alv0vu6sdw4jiegsu3qcqyhd0gnvpgm3b6',
                channelSapId: 'hup7bvfaymrtfi2azjwhgnqximwdbgt8b62dkb7ga9ud41elha',
                channelParty: 'vzuqi4745dq6pbwz5z3e5cr96nmew1uap0zohgpvswik666hzusf9uf05z1jbkuu9q9msjmzugtqbs4dvcnzud6zm7oohzk8lbmep5qe19y0ihxar6o3fwzo8648530c1qejsg2d8y6mzrm486959qivq0kag42y',
                channelComponent: 'f9zajc3vd1w2oy87tcgzfvruj0by665qsdj1xrzc0n3m5f20lsqfzrjgbj3c7s5dyrfdamzqeo2mec7c5kzko4dai3ky38d3s05spx8ojbccmbv5spuqqw8ood59xz41ph9o44hq730mqbr2f9zvyrdkhwccq9kk',
                channelName: '4dd0vo523hcdl55ixubmrxxo57h78z8405i1x0buutagv97rnf4xcz7ayfylgcegq9sqee0puvc3s0n7xarav2gc88e697p2upqaqgu00fhu4so46d98yt5daxpvrl7x9s5g7k2w5gp4q7lqewbzzxtu40q2g6mb',
                detail: 'Et alias autem. Et laborum ab earum veniam atque rem nihil totam. Quia dolore in iure. Qui consequatur iure ea molestiae eum sed non molestias modi.',
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
                id: 'a8a619c0-f32a-48f1-8b56-87821e187ac9',
                tenantId: 'db5bad96-c700-4aee-a85c-dfe278dc97f1',
                tenantCode: 'c9jkhjn7o2e59q6uk6gtmcepg8j7ezexp9afgcwat5uc4pudqw',
                systemId: '9daa226c-1e69-4364-859f-98f77ce408a0',
                systemName: 'l49v9rayu2p32sq7prq6',
                executionId: '3d9ed954-a7e6-4415-9558-c588f3a67d5f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 20:54:12',
                executionMonitoringStartAt: '2020-07-28 22:22:19',
                executionMonitoringEndAt: null,
                status: 'ERROR',
                channelHash: 'mp37g43zqbz174jxviv0ltavraxacfiba6cro6g1',
                channelSapId: 'isuizlgc41bhl61n3eg7x8pk72impme6wybe6qgqoin7bz8mnk',
                channelParty: '2o7dbb8j2mxwh4hyebxvl3hq3f2oq52swe1oitsnn9oy18ryys034bv3t24kqbojik60qmdmfsl1a6sf2gra6nhx6j7mqdat9a6uvk0rc5nub0d0rxbs5w2djs1rgsfff8w8mfk02pqz7magykcjy8grqjahyv40',
                channelComponent: 'gsmqufilnx0egbopsm5muw052cwaaqy7i21i6n9raodeyy5yari88itihoiepjw5nxqkx3hs66kduas04rm4ig8rbli3byjr2u76hehg50s6w2o6gm19z0ig9d00sd6v53ud67zdti5x0b0nyaxmurmt2yk5w5ca',
                channelName: 'mxedygl8lddo2n6y43thnb6lla0blti32ahx6tpqgp48neuv0fs1hn4y60e1wu3u4v1pj76v20ne5nafe67ycof80sspc965zky9zaziavatd4kqy3lktxh462a17thb74kbwk743tc1fc3lwx2u81mnjn9622rm',
                detail: 'Aut repellendus sunt eos maxime. Doloribus et blanditiis aut dolorem ut explicabo explicabo. Illo ratione quia illo ut.',
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
                id: 'a8a619c0-f32a-48f1-8b56-87821e187ac9',
                tenantId: 'db5bad96-c700-4aee-a85c-dfe278dc97f1',
                tenantCode: 'g1d1boqdxu7qe1x9mxz9hc4zsqq1whdh4k2tbqafydee35eyk1',
                systemId: '9daa226c-1e69-4364-859f-98f77ce408a0',
                systemName: '2agbwu5r8mhgbxhpb5t0',
                executionId: '3d9ed954-a7e6-4415-9558-c588f3a67d5f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 07:23:12',
                executionMonitoringStartAt: '2020-07-29 01:06:07',
                
                status: 'SUCCESSFUL',
                channelHash: 'qth5wdniwwunsfsqnvkxlk73cd52b29r43z1835w',
                channelSapId: 'a0uxcy1fjpphpmosgwph206ejr0rp0p8finslybvifwz0x4bz1',
                channelParty: 'd82gdy7q98kwrm397dp6o6clxf2sgej3m5ogedwa12usdparj48tplevnbf812p2z6dlq75qpxfjsygynln51cqe992h40g9oz8ubnb0qqd2ror29s2o2x88bx4pdpvejas6gku6r12sn0btj2a0wct3k4vycgij',
                channelComponent: 'wkyrpe2ly8rj94y7627orxic8rnd6sbcjsmn1yxunioyt7zdpfhcdlq6nxf8mcszwh3p9ik4qef4vdr3qim6zfbafi0zkuq6ldo31v50mekxun1raxji25enal3smi7q1dh4suvkel9qy0wrfxii7rgqxaanp95t',
                channelName: 'anlxwo22lsuxs1m4asgh9sod8ne33c089kl2leisla3g4e54dewjb6acbxl23koq6lf7zecdf2qgunc3wz11kr6khokj0rx3kqo1t0rscfcnr075ai1aq5trcmzglp4wf58ii77j6x2flytv8kfil1y4y0pb0t4a',
                detail: 'Omnis et excepturi et officia reiciendis. Perspiciatis culpa quas qui qui est. Modi repellat minus. Asperiores est sed rem incidunt est. Ut laborum saepe quis cupiditate enim. Eum velit consequuntur.',
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
                id: 'a8a619c0-f32a-48f1-8b56-87821e187ac9',
                tenantId: 'db5bad96-c700-4aee-a85c-dfe278dc97f1',
                tenantCode: 'nkbk3o24bds6wrkjexl50xoven5rsxr47654gy5y1ni6dzlue2',
                systemId: '9daa226c-1e69-4364-859f-98f77ce408a0',
                systemName: 'ajo13xvsforrmrzemmf0',
                executionId: '3d9ed954-a7e6-4415-9558-c588f3a67d5f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 23:29:57',
                executionMonitoringStartAt: '2020-07-29 15:35:15',
                executionMonitoringEndAt: '2020-07-28 22:32:54',
                status: null,
                channelHash: 'zrfy0fljxoclp8rwob2vun7xiabrk2uw43vebfk9',
                channelSapId: 'o3edimixx4d709rcts48ax660nxng23phahp21yftdwej2tt5c',
                channelParty: 'haddjc7pojni9loojzrsga97i4vf8jmri2qjpzi9kqehx58883zigqcdcvxeu407j4zygmxq2bzwoegmw0r13zepb89m1oup2hh9uxjw0lceketo5zmqo7zq2c3jdeni3io6fb9kgq498od05u352ke4ekg5ugim',
                channelComponent: 'vxzh5n20hj6krufz4vewx2lbcyq6fo1fja90zceozzo00yuzlkqwug2i9i8hxax1fty82sxhf8ih05vu1utpi2hl0kk4mbwnmakmxgiosbxso38mcmw78ju1e8k1dujvss5h8cayy9jwttxnxp5ax47lmkyp74jv',
                channelName: '84zxt43ots9xsfc2ba82qtse7nzxt2xqd3cnnqb1i5c06rfi9idwt68300peovcqdt08bz4mb01axubtl56dekf2frbv56fifi81j10qsabmzu8lf7v95lbfw7obzvlm2e96134zdc3dbibnqfh43fenuhyao16o',
                detail: 'Dignissimos quia quibusdam debitis nobis assumenda officiis ut deleniti. Necessitatibus voluptatibus nihil nihil omnis est rerum. Atque nam exercitationem sed magni amet nesciunt aliquid.',
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
                id: 'a8a619c0-f32a-48f1-8b56-87821e187ac9',
                tenantId: 'db5bad96-c700-4aee-a85c-dfe278dc97f1',
                tenantCode: 'gc0yu07z2dsszjdpkit4am15yq6mpjrf65e4y1iu5w4pigmh4i',
                systemId: '9daa226c-1e69-4364-859f-98f77ce408a0',
                systemName: 'ryk07l7fb1tiphkzvj0z',
                executionId: '3d9ed954-a7e6-4415-9558-c588f3a67d5f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 19:05:41',
                executionMonitoringStartAt: '2020-07-29 00:48:22',
                executionMonitoringEndAt: '2020-07-28 18:21:25',
                
                channelHash: 'm5kctaz3diyh7mni0tjkuht4l63yfq9i4bgx2n5z',
                channelSapId: 'qdd9h1sge3cwaiuunuz64lhmpnj0aocwu0vzt9zm6r6ujn7hwm',
                channelParty: '05opoueiy6m58iggdj0226aabuw8w98bgt1p5znc2t7m27kzxapiucjttsipx5r94iswxgkq2ou9vwqrwd0y19txfalluy94nqop7vvng3m6l0vu8v182aoi8j9oo9jylnq064ucbzo2ri4qfh3oe5h3ksx8pv4p',
                channelComponent: 'xkm7t05e7l9jmb1aefas0ndf6qk3lg1z46uwnn5abk2olpv9i76csqragc2cn1fbfizgw8oq8crdbtlh5t76zqcg8zgewmbdq0zb3mknqfase6q81z3dopqh49jdorj17153mwtznawll7r3ex0lcnb0ls73cg5b',
                channelName: '96xwhyhvo7a026414er2304yjs3cw1elav3q1m46dfyol1d63egooglye1skk0eptx1i6kgw0rhbgz1vjjihvch1cq6g9mo1oads9fr648dymiqfbgg1krhachpeqk99w0d5j1bnyrpsnv4ne4nma37w2cl595er',
                detail: 'Quidem aliquam fuga tempore tempora. Deleniti esse voluptatibus similique et explicabo. Possimus voluptas et hic consequatur.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailStatus must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelHash property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a8a619c0-f32a-48f1-8b56-87821e187ac9',
                tenantId: 'db5bad96-c700-4aee-a85c-dfe278dc97f1',
                tenantCode: '95jzyrus5ql8pronx6houpx0l9csk6kyljtjghzvxkoldlka47',
                systemId: '9daa226c-1e69-4364-859f-98f77ce408a0',
                systemName: 'j4mjlc4c4oqhhk1v00jc',
                executionId: '3d9ed954-a7e6-4415-9558-c588f3a67d5f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 17:08:44',
                executionMonitoringStartAt: '2020-07-28 21:05:32',
                executionMonitoringEndAt: '2020-07-29 10:39:21',
                status: 'STOPPED',
                channelHash: null,
                channelSapId: 'j8nlvztx3piffwehpvd8zz12rvgpk4hs7y0kgfpe04jn1a4oci',
                channelParty: '1qpjl02gta0ev2dyqzcybt9fusszbf825llssrgw6w8gd14p0pqtnic788p3j7iaz2nd2j1mxzm9q710y6wm5pvog6hklgpp19xjrtv0z0x65blkfpxxlbp7u9su9eggoya6grsf1gryavwkzk0pwbqybqem1v1a',
                channelComponent: 'a2uyi98o1kncppvz3t1orx6cfwo3nhvpb7zum2ixc7dt8umynbroggduucbuix197b75nu7eiab4ggqaz37phswe08okt3yrtcwxmvaubaxmm4g08q6ig9pwit2q8lwf797jk8reufs9sdyozefioh0y35ae0bjl',
                channelName: '4w4rwinxn4qpnbpkkfzwy2zk8ft9zmfy9rirjg5w50uvaqdx6tz8s1lwovd5btasxllg98joh7fqbsw24kw625106ymct5cgm6jatjlt482gupqrnrcgva1fllg9uwq1qcfepnrjy46c4gccxfv3vt5tlo5gdf8x',
                detail: 'Voluptatem facere id. Inventore explicabo impedit rerum. Ea rerum ipsam sunt ut eaque iure consequuntur id. Vero est porro delectus laborum illo. Voluptatem vitae non animi tenetur quas expedita et debitis suscipit. Accusantium qui qui aspernatur est expedita quia ut dolorum.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelHash must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelHash property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a8a619c0-f32a-48f1-8b56-87821e187ac9',
                tenantId: 'db5bad96-c700-4aee-a85c-dfe278dc97f1',
                tenantCode: '5tup4xobv6h684wv74jytwj7bseuur9twsc54fl3p3m2yxl0j3',
                systemId: '9daa226c-1e69-4364-859f-98f77ce408a0',
                systemName: 'kja57754ti4tg6914gqe',
                executionId: '3d9ed954-a7e6-4415-9558-c588f3a67d5f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 01:36:30',
                executionMonitoringStartAt: '2020-07-29 17:54:24',
                executionMonitoringEndAt: '2020-07-29 07:18:43',
                status: 'UNREGISTERED',
                
                channelSapId: 'yche6cfqcd319d3azg4694kdcs7s253lsb4kj8my9lpe0b1qfk',
                channelParty: '8yhjm9e097d9k1svrhy3na02iglhd0bvindczg72z7p6rlxjunfli9n4w29evrg0ac7ffr7k6c8f18kd2vy529h2rwhuuu2o4zg4w4lotrds93a2sf7yi4zjhlvlkblx8yabser2cqdet6gqhx8uq17jmkc7exr1',
                channelComponent: '02flt73sjb9wzmgwdbqak2xru7uuo1u1se2l7iuxl7mc1050k5ra7zhwp77skhgd9jo7n9qgj0o83qzj6mq95l3vmwqev23di5w9a14gdrt7c75oqxyyf594lk78xkdvq07wgudnx5u4l0aqz24lth86rwsctffw',
                channelName: 'c1im04e8vyhlatgz9cv2ec0tt97zlhn9nmwjlvzqu2ryyv8h5pgzfbdjwbpuef5g3qaf5tx7l23zappf5l14z3f1b1sewatsqph29ixjunfhd8q56ldd09w0txa2cs6pp5yed4f7ukhr70hd0st6qlioqheek01q',
                detail: 'Adipisci tenetur ea. Eligendi voluptatum temporibus ut et et nihil. Maiores commodi illo numquam.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelHash must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelSapId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a8a619c0-f32a-48f1-8b56-87821e187ac9',
                tenantId: 'db5bad96-c700-4aee-a85c-dfe278dc97f1',
                tenantCode: 'v2e1c6futirnc7vj1lda3drn9eeqf695rqw14k0d3v3g2mn5wt',
                systemId: '9daa226c-1e69-4364-859f-98f77ce408a0',
                systemName: 'j2rbovwo8yp3t4x55fx6',
                executionId: '3d9ed954-a7e6-4415-9558-c588f3a67d5f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 20:47:44',
                executionMonitoringStartAt: '2020-07-28 21:08:09',
                executionMonitoringEndAt: '2020-07-29 00:46:36',
                status: 'UNKNOWN',
                channelHash: '648lnu9f5x6coghtgdczg7e1vfte6vgcfzxlzipr',
                channelSapId: null,
                channelParty: 'k1t4p0g7i5mqe7yi0n5vp1xod9xl4uc454yzxvhyr3kdtx5dj1r8hy8zyhdaepg0r0ccrzpkepku9q5jo23w1u9xch766d9d44j6ypbgc10hub0cz2k9dbtaej71ix9pr7x8be9g7t6yookptxrkoot9n01vy4ir',
                channelComponent: 'yu5ep9vf0f2aq8t72fkxyn43xra1l02imqp6iexhz6bdahkwy1wbywfv9qou18b2z2gwblnb74o3myy5h3xvfrv48zfawht81cplio8iprkh9gez4gw6rjj8azsd9r4icbblo39kr2wncmmphwlcqkp7wrbizqzy',
                channelName: 'glrjfte842xl7648cltfrwknphbv0gdy7tx4ssrwqn2pwddwv43a1r6n38dpw81kwa1v558g9zngtfbmj6cqucsgaa48fg4fduzz9y2b2mzgo4bp6cjv3ftiely7opnfrpsg7igolb357kf38voprubonhfmd5pe',
                detail: 'Molestiae necessitatibus esse nemo laborum qui. Et autem porro et ratione dolores tempore qui. Est sint iste. Cumque temporibus consequatur quo quis quas quae quia non. Illo eius alias ipsam dignissimos natus. Adipisci ab ut voluptas alias facere nesciunt quisquam incidunt esse.',
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
                id: 'a8a619c0-f32a-48f1-8b56-87821e187ac9',
                tenantId: 'db5bad96-c700-4aee-a85c-dfe278dc97f1',
                tenantCode: 'xv42yhl60ffehw257sazdw7mue5j3v1plv08bfwsdf9alrb6hb',
                systemId: '9daa226c-1e69-4364-859f-98f77ce408a0',
                systemName: '8kzzogjb8heihjnn3uzz',
                executionId: '3d9ed954-a7e6-4415-9558-c588f3a67d5f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 16:09:03',
                executionMonitoringStartAt: '2020-07-29 10:13:13',
                executionMonitoringEndAt: '2020-07-29 17:47:46',
                status: 'INACTIVE',
                channelHash: '57av90s51vbsh0ki2vpfcmgob03r1wzykpay5453',
                
                channelParty: 'ulte9xsj6fp4ff142em1xi8pqbp3z77ku7axqg63q4bpc9s3zsnnqsgd9wp536elx1lf5yeu26bprnhx6ygglo1kpvjfl5fo2n1t2j3ri2w7qby9eq12r2a7r44hx58m4s9kf73cffzszo6dzz468qdg524uaqvu',
                channelComponent: 'x1foqs4xlum6pk15trqy3rte5ugzotg1p74alwn3ey7bpm8aokky3axhw4ns380rn495jzrvlxqxwiz9ykwnptxvbbsw9q1aclw46k6449nezla20ek7ff1cxrtwb95lx54ipfdavobkomncaig8fyr54sph0us0',
                channelName: 'ukiwqf103plllwjstfh923oas1i939azlunuveuo1a3kzbc4op18zd1hbjkaaykhgetvd6065soian7z41jn6bc3jz6sd33b0ua0oooqp3qp958glvbogmy88mqy8cuovgf2z7qsjc9set4agioo4hgu859r6a1v',
                detail: 'Iusto eos culpa. Placeat accusantium quia porro laborum dolore. Id fugit qui quia ut at.',
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
                id: 'a8a619c0-f32a-48f1-8b56-87821e187ac9',
                tenantId: 'db5bad96-c700-4aee-a85c-dfe278dc97f1',
                tenantCode: 'lec15rfj8f8jwp8qgrrk1c51aj6alyv9a1kouaq04ysg45krmb',
                systemId: '9daa226c-1e69-4364-859f-98f77ce408a0',
                systemName: 'yrqqujcafblgije9wc52',
                executionId: '3d9ed954-a7e6-4415-9558-c588f3a67d5f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 18:33:12',
                executionMonitoringStartAt: '2020-07-29 17:02:17',
                executionMonitoringEndAt: '2020-07-29 15:23:34',
                status: 'UNREGISTERED',
                channelHash: 'cw2u860cyivw4gneyjqoveh324cq5rt9mmqf6mam',
                channelSapId: 'mwaxldrtn1jzmc69fsiud9qbvpzzah56jdjrv8644l7o9i4twz',
                channelParty: '8p9eqb88emy9zhy3mpy2ti8dibtt6a31lcnhz9ofst0dz72kjzvfq41kt2ghg0c310owa4axn4m0ahylabz67fyw6jh1psmo9artjw4qohzsvepgnejmfjicag081fol3memy4s5wgrbe5le6201b4ai0jtq3eqa',
                channelComponent: null,
                channelName: 'g5q9yn2qlau6phbiud9yccwya7eec0irxil5zi6n1aliz3tlucjear8tsl99b1rf40k0vfypn95dpq0uzdoxqzd0q7y69tjik5w9o9uep81xhn7e96seu6rmbxnrfuh004kzrsevolksr4kqnlpkd0u8u1e4n164',
                detail: 'Illo aliquam et consequatur ipsa optio velit dolore optio. Delectus quia doloribus ducimus accusamus quia voluptatem. Est doloribus ab rem doloremque quo fuga. Rerum possimus est impedit.',
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
                id: 'a8a619c0-f32a-48f1-8b56-87821e187ac9',
                tenantId: 'db5bad96-c700-4aee-a85c-dfe278dc97f1',
                tenantCode: 'anb06cuqtyxlxz2nwy5xtka98bmitogrjntcm8z266gpo81rnz',
                systemId: '9daa226c-1e69-4364-859f-98f77ce408a0',
                systemName: '9ek3ggu9vnc7qvjye9id',
                executionId: '3d9ed954-a7e6-4415-9558-c588f3a67d5f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 22:44:50',
                executionMonitoringStartAt: '2020-07-29 04:40:17',
                executionMonitoringEndAt: '2020-07-29 16:19:01',
                status: 'UNREGISTERED',
                channelHash: 'p2kwk53wq1cy6j6ldtx9jk99fkvf9z7kfs3oy7fg',
                channelSapId: 'skdx5y6w5ibrijzfd8vwlb8haibdsjutmlqad80fpai33qpmpm',
                channelParty: 'mnauofw8pwlvy039sxnfh2bs1hz0shymorl47fqnc8wq9hjyt3f6v3xqa7kcoqgmmp09wyq6koh0ioytdra9f5mpjqi3kj3i8ivtnbwmptvkglbthcdejxrn7bs4u6blkgjns7byjszcorp3vz1xbtp0xqrxhhhk',
                
                channelName: 'ekwe150s69l1zumya5t6hcl9w2lm29fp20s0v5qc6bzq94vi8rghsmyni5wvqiyo7wij8ivjq4ekx4emi18feijlzvkd6jg3axpkfjubyqviitmm3mnqrb4twfa83l6eoqm3r43chas9spmytbe4f8vrrfrqkn9i',
                detail: 'Deleniti doloribus perspiciatis. Illum adipisci rerum cum aut. Possimus nihil non qui nesciunt et esse vero cumque harum. Accusantium harum omnis facere.',
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
                id: 'a8a619c0-f32a-48f1-8b56-87821e187ac9',
                tenantId: 'db5bad96-c700-4aee-a85c-dfe278dc97f1',
                tenantCode: '2doz36tlc4neb2qbbyqj6pwzkoow7sstkxr72swajbhlqvgw7y',
                systemId: '9daa226c-1e69-4364-859f-98f77ce408a0',
                systemName: 'mvur21zygorenj95z4dt',
                executionId: '3d9ed954-a7e6-4415-9558-c588f3a67d5f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 00:25:09',
                executionMonitoringStartAt: '2020-07-29 10:22:38',
                executionMonitoringEndAt: '2020-07-29 09:59:32',
                status: 'UNREGISTERED',
                channelHash: 'umjf7soha1oiwe5gbiz7z8isbvp15mcmwpfrz351',
                channelSapId: 'dirjneyefnydhbafdtyiqdl2vtjlag6nyatm5kjjwkuzqj7mvz',
                channelParty: 'fnzwr9ko370szqnj7o39j2k0ggx4x68b9ic0bauevf1u7xr92op1dwmx2m8fbg83km0pu3l8kzc54ktkcogwj53qp5wreurlc9f9ycpbgyc621s631he80opfwwyvr789vpl53ni5jhu53k54m9yi1udq0ebb40f',
                channelComponent: 'vnhforpzr0i3omcnnirfdyom6n4kjdtoqhxrzyciue8tnrw2erhx3gbdxv8a1vzsbi64if5bdlvr02gquuscadrwwwb2nja8vfh9lu10jlia2y0lme17ld3pagunp3mwgyubs9gcna11a7037ahwalvxesfy7u10',
                channelName: null,
                detail: 'Autem veniam architecto perferendis molestias hic ex pariatur ipsam autem. Quas quos quia vitae vel similique qui tempore libero natus. At sunt ut nihil reiciendis quos.',
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
                id: 'a8a619c0-f32a-48f1-8b56-87821e187ac9',
                tenantId: 'db5bad96-c700-4aee-a85c-dfe278dc97f1',
                tenantCode: 'ou7bug2gixkhawiykqs4q3pqpem58w5h7x0oc1k5dl86cfuixv',
                systemId: '9daa226c-1e69-4364-859f-98f77ce408a0',
                systemName: 'w7qh93yqdiye0n7owjli',
                executionId: '3d9ed954-a7e6-4415-9558-c588f3a67d5f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 05:02:50',
                executionMonitoringStartAt: '2020-07-29 10:32:59',
                executionMonitoringEndAt: '2020-07-28 19:34:13',
                status: 'ERROR',
                channelHash: 'ynwb2mrfkqw3zhi1j4pxgp9y4g9t0gmjumrjsf7i',
                channelSapId: '0l51c2wyo8tctzfzuq2qofrimead2755jtp4pgorzywjmziz68',
                channelParty: '457fvp1p8dlr33m7vrod3fzxqr13r0ws0upiwok3moo3p7k38b82eg4jjkvx4o7tn4kcni6essd3r3qxd7r0u4csui5rsmibi0iba9ao558h2rm1qytk3cejtv6bwwbdoyrnds8t7uh1rgvzxzxv4tgbbqsxdtii',
                channelComponent: '8xfi2eocqvaghtgid1l7jt25quhfbdmgeat0d6gpkd4sqenu2qbehjphw527vfm8ap45q0uswcumo5fglu4r020d0tmaqfzh7m1aoyymbe4jpopivw83zbq4hyyhpulma69hdomiyibzww7bpe6kdx1j27yoagyk',
                
                detail: 'Sed a quae beatae tempora in. Mollitia quas qui illo fugit sunt vel eveniet est aut. Libero et dicta distinctio delectus soluta consequatur molestias fugiat. Ut voluptatum eligendi ipsam et doloribus voluptate magnam provident. Sint accusantium dicta officia id consequatur.',
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
                id: 'mppvtwr74kvc4z1yvb4lri9uo7xemq8otv1yg',
                tenantId: 'db5bad96-c700-4aee-a85c-dfe278dc97f1',
                tenantCode: 'hppugo41h8ttf4ijr433v6xp4prjlp5qjk5n3k88xaej49ndju',
                systemId: '9daa226c-1e69-4364-859f-98f77ce408a0',
                systemName: 'nr6lsebxkt95cugbwrdq',
                executionId: '3d9ed954-a7e6-4415-9558-c588f3a67d5f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 21:14:53',
                executionMonitoringStartAt: '2020-07-29 17:56:18',
                executionMonitoringEndAt: '2020-07-29 00:45:45',
                status: 'UNKNOWN',
                channelHash: 'qmcbyjphyt3248922jzp0jdu7jrb5duw1klrattu',
                channelSapId: '6d6jpgb28nexypigbgnimqnai4zwzjv2tec74hj5oz880w04ms',
                channelParty: 'v7z0pqn7vvt5j8s76y9r7lwnuchax6h8u1e29prclzfexn3dm04ws9baygvzohyhd9tae9nt9mhjwd3j3yl37ph3jarbaav8uac1nebv6wx22953lxnlcskm5x7kswjdgmwt1c4m3txq67zmksvxjhsdbj5vvlmx',
                channelComponent: 'neoufopuiwwtrv7620lkj9ql2f58tymrik2fiaykdilgaai9xxzkoscifdumj0qq2ut1yut4s6r4wx6spm18pgozih822kjjhwz5jrnj5gvn9wcw88qpqzb50nn73o0lsj1nltlktx26mggfxliojs8yz580iky1',
                channelName: 'krqvhhosa4kn8ko7o658z8kqay5uerrzjxh9uj0aftbxtzhh8wxgu26yye8e9sva1ozi5dy827vjfm2jvqpecm0ks01fagj36r8j6r5cjmbp6cj5k3bur4bqouen34gj6lpv139xz63oneaqs25vwhoha2ulw93q',
                detail: 'Cumque nesciunt eos cupiditate rerum voluptate deleniti. Et et rerum sed est enim nihil dolorem. Officiis id consequuntur dolores dolorem consequuntur aliquam aperiam veniam. Nostrum nam culpa est quia tempora libero non. Minima voluptatem debitis. Earum id labore nobis nesciunt.',
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
                id: 'a8a619c0-f32a-48f1-8b56-87821e187ac9',
                tenantId: 'hawjju3dansysk74af1ej6x1dhhtll9p7xz8e',
                tenantCode: '4ttjjruionxutcnw4nsoml6ir3wbyxd903a5cf4adpc4p5dfco',
                systemId: '9daa226c-1e69-4364-859f-98f77ce408a0',
                systemName: 'vryd196g4gcvewuv13xd',
                executionId: '3d9ed954-a7e6-4415-9558-c588f3a67d5f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 17:21:44',
                executionMonitoringStartAt: '2020-07-29 14:35:57',
                executionMonitoringEndAt: '2020-07-29 01:12:30',
                status: 'UNREGISTERED',
                channelHash: 'wa7t3ozox8xbtlpwit598a8ts7c5y2nl1327fo8j',
                channelSapId: 'uyt0ffvpo5woqwdk2xfwtb2hvjrnfwduyctydd6hvjljydkk5u',
                channelParty: '9hkmje99u06yeq8rf2krh7ipbmuqyi61cyoyj28tp4s28b5afdeg9yp2qgi2hkv4qip8bmdbzii4x8albodamrodf8ynk3nxubplwix5qcatww8k7ipt7gvw10y59up364abfryi0l0th49aehy5z1gjz3xo1czi',
                channelComponent: 'gxtfm2ilgahj1auriluq6ljxsjhf9uqbgekctnnkwwzynrh95n8o08ywndcxsv5eifqugjukd44i3q1dtlhdf6lvd4vgk1ey4kj5qf8fr18a3q17cjrjmrgpg051qv513zlmj9wybbamb7qbw6src6afi8rxzr88',
                channelName: 't0dofyfwzaisab25qdxzh6k9p1huft2yn7g9zu8bvmx8e5je1agdnvw7bp8s9fnnrnkblz0qboing9rytn5n75ji6d85n5zd1txiyj1m91huoht8nrh95r27ima2977d7u5hy3s34vpauw5zxldhotdwbsrrdi78',
                detail: 'Sit officia et sit distinctio et et voluptas. Fuga totam ut. Commodi voluptas inventore repellat earum cum labore et quasi consequatur. Voluptatem omnis quia excepturi nesciunt. Impedit at ad omnis quibusdam pariatur consequatur.',
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
                id: 'a8a619c0-f32a-48f1-8b56-87821e187ac9',
                tenantId: 'db5bad96-c700-4aee-a85c-dfe278dc97f1',
                tenantCode: '18m6492pkdkxxib5u60whe0j6ezaewdbq7u6ytt95gco7wcnu7',
                systemId: 'padyhy7mqb58o4nlrzidg3x5w464v197bdpdd',
                systemName: '6fi1f4jv9phdkpp3opcv',
                executionId: '3d9ed954-a7e6-4415-9558-c588f3a67d5f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 13:00:22',
                executionMonitoringStartAt: '2020-07-29 06:49:18',
                executionMonitoringEndAt: '2020-07-29 16:32:11',
                status: 'INACTIVE',
                channelHash: 'd9c004x8n32m6op2eldcyf05knvryml6triwbrns',
                channelSapId: 'lao1bo296i0uanghuymfjssv4fh59e0jbupfukmpzbntg828is',
                channelParty: 'w4geq9r7ebkwgfpmx3wmpr2320prbuizut77t1qgrs4p85t3i50l6jvm70ba9expz9pkftt524lv1xaywnvphyyy820h9nrv69heot4y7rl6hmi7rf5mjsznz189idw8crgb2j8qmyawkzjyjxr23v5ulmr5344q',
                channelComponent: 'ugodb6ii5yinu0wmrbmumcb34gv17nbxuxy7kygsoqq0xsni905lk5fyww0m9nymcjqzuueqpv9ttqeo2d0dihswwvx7vn947hdi83mzcrzi0fgohny3ue7bub4l74gs1bunlcgs50jtt2ta74sqkhz6asherph9',
                channelName: 'jv04xfto4o02gbc640imxebtvcn6zcr0wy3v755nvg83p5ck7cy1i8zyk1270gx3th87s4587haw9yftest8e34cnoq9mkc73an7qfe3277m9gq10e8n0ps0rgvs8972xqe9pbksiq2sorrhe1s9eaukwox56vy7',
                detail: 'Non dolorem sed officia dolorem nesciunt hic aliquam est perspiciatis. Numquam nesciunt enim et amet non ea modi iste omnis. Et totam libero est. Reiciendis sunt ea corporis qui saepe. Ea sed sint aperiam omnis officiis minus dolor quia voluptatem.',
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
                id: 'a8a619c0-f32a-48f1-8b56-87821e187ac9',
                tenantId: 'db5bad96-c700-4aee-a85c-dfe278dc97f1',
                tenantCode: 'tw058k0do6t8hfq598gvo1w1u6j3pc3jqx47nrq8d52nxi6jrn',
                systemId: '9daa226c-1e69-4364-859f-98f77ce408a0',
                systemName: '8uine9j2x92lzubn579l',
                executionId: 'mctdgm1fsebji7ovk86mnuay8bgggftqg2gja',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 12:30:36',
                executionMonitoringStartAt: '2020-07-29 07:28:36',
                executionMonitoringEndAt: '2020-07-28 22:11:48',
                status: 'STOPPED',
                channelHash: 'jigqbqktwo9rmovyp0a15mqx0r2qiwm1ow9rqivj',
                channelSapId: '6f9wpxe88j3rsta9mwcyispdir8a2hyrwnv8eecmfi63x8xa1b',
                channelParty: '1jy390lvwvw8p283m18hbz16si70d4gdh03x19b9mcj4m1o21xin92se0toivxls9vk9gmgzru42l1ssylwyq69vjwfvsedkv987f602d68u1bntk9ni5l13rysldji4olr99v2uiald938diqxps8wjd8626aut',
                channelComponent: 's9ae560xmb4fpufxt4t2tv5a2j9oayrbysrrfz1bj631rjsi6i88y7qk8n5udv74psq6uimktr7vv9xamweyi28z39s41lo9qxa8fpikmcys7i6668u33d8upq9lrfzoo5c22q1xeskbf8xzhyrhxipy1y565g8x',
                channelName: 'wpk1jk45d3c93234g5lmyesya6ng1uqahnldoukpol9riu6wnspdrepdnpcxmquetkw6ef1fg3dqcfnvznpvqhy2dum8zknhozccolx3ly46a6p85278dsbo7akxazuphz04m55thq1x5wetpjjlfs1ivereyiww',
                detail: 'Dolorem sint eligendi sint dolores neque odit eius sint. Aut necessitatibus ex neque quos quasi quia. Doloremque magnam totam est accusantium voluptatem atque quidem. Quibusdam rerum ut sequi quibusdam iste suscipit et illum tempora. Eius quia ab expedita repellat nisi neque. Qui repudiandae doloremque dolor consequuntur autem aliquam illo quidem enim.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a8a619c0-f32a-48f1-8b56-87821e187ac9',
                tenantId: 'db5bad96-c700-4aee-a85c-dfe278dc97f1',
                tenantCode: '60g0dsntlp3cmdken4zyceoo3chdgyiudxdibg3hxidr6jao5o',
                systemId: '9daa226c-1e69-4364-859f-98f77ce408a0',
                systemName: 'cml760j9yc5f6jhs9kh7',
                executionId: '3d9ed954-a7e6-4415-9558-c588f3a67d5f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 04:22:30',
                executionMonitoringStartAt: '2020-07-29 16:20:36',
                executionMonitoringEndAt: '2020-07-28 20:11:18',
                status: 'STOPPED',
                channelHash: 'v03upwvwzmxn9f9bdmkv3vyjchgzn02xl084jxyk8',
                channelSapId: '72zmvoftpaurugtz6iq70a8jkhictnk30g23sgqizqz5luqe66',
                channelParty: 'w7i8kp405uoqyhrfkoupuehpz3zxulpgmv22ac4nrfr1k55h2nvk6f9x5wad8hgursk30dudab1t2huyd71igg3ecqv1034328jiltdlyuvq5e8tq2d2h2fnl0cfu93vqo0hy8khgrw7tk6u8boob6jifx0xlc9e',
                channelComponent: 'x8mof3az46mljfssorikfc3z8bb0ffnik15odxaq48jmmjm1fpzmlq314vej4c9imtv7vey6ykbgrqar5zrxkrry6yoks7pryvoyj8wt543hv9xmhqx7a86j199vwrz8250yqiobx5v9il7lzbt4q2f9och1tm66',
                channelName: 'yt0l2zfnux7axvluyealtp5vepd4azpl9p48r8kn7feqw55xjfefdbjjdhjhhjqquiw59ck8d2m199ldniyspcu7l0ew4qypdh6ctx4f5e2565cxviyy5vy1zmdrcywvfju5q6rina03jfmg6xvzvrpxi2z0pwqf',
                detail: 'Et similique voluptate quod non. Maiores nihil provident qui facere saepe accusantium odio dolorum nisi. Quos ducimus a labore quis aut. At deleniti reiciendis.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelHash is not allowed, must be a length of 40');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a8a619c0-f32a-48f1-8b56-87821e187ac9',
                tenantId: 'db5bad96-c700-4aee-a85c-dfe278dc97f1',
                tenantCode: '3sjaxyu8bppeddjbqpl9ksp2qsrwkeovzgk67sgs66d8nejl8cc',
                systemId: '9daa226c-1e69-4364-859f-98f77ce408a0',
                systemName: 'zt5p3vh02kkrhr0t15ep',
                executionId: '3d9ed954-a7e6-4415-9558-c588f3a67d5f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 05:08:36',
                executionMonitoringStartAt: '2020-07-29 11:08:26',
                executionMonitoringEndAt: '2020-07-29 16:49:55',
                status: 'STOPPED',
                channelHash: 'jtqlwkliwbeorfggjlvokzh1dd989h5q8338atlj',
                channelSapId: 'jhxswf0slreolw4wiq3q5hwilptlepsjski3mmuuhq2lzbz4rh',
                channelParty: 'bq37pip6tmlbjt301flq5nd1t0g2u4ad6cjlgemdzngili69db6vhluqfwgeibl168cprgg4k7538z7kwt0fcu1c6gilm759s5xgehlemccaqeq2mwu74g2bjtihrv4ddjd8k18fdaavqoruq8iytcjwdg42mija',
                channelComponent: 'w91vo9pc3w4ull4z8a2kvrvlxydqsiqya42nw4uxo8u1c1yi9avo7hrdsjytb089rhg3g94sfpec7meexs9bdd8zob511qsg208b9r1fo9kuahhx27migd9itmuooqvcq6tcqj6yh2b4h971immoxu3zxz30mvry',
                channelName: 'xrmekdgq734e57tcuvbdgf08kf8bz29op2z90rzg4mdphehl1ez8k7a3tcrid21dn07zzk2tzz67jz97ai7lokbphl303tlzv7j1jln4v5fp8vmtxk5tbfkne3frdpuws74h9ezyxng4jd4l4hwuf8pv1s2kv7t5',
                detail: 'Error eius est praesentium placeat eos est eos. Facilis consequatur saepe quo voluptas nostrum veniam. Voluptate atque consequatur sed omnis ut nemo dolor vero.',
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
                id: 'a8a619c0-f32a-48f1-8b56-87821e187ac9',
                tenantId: 'db5bad96-c700-4aee-a85c-dfe278dc97f1',
                tenantCode: '6zuf2kh6t3d17up8vnc1xse5q6073yjql6i50vhznmkuye71qt',
                systemId: '9daa226c-1e69-4364-859f-98f77ce408a0',
                systemName: 'neo05i6ofmhax8onj09vn',
                executionId: '3d9ed954-a7e6-4415-9558-c588f3a67d5f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 03:39:40',
                executionMonitoringStartAt: '2020-07-29 11:51:39',
                executionMonitoringEndAt: '2020-07-29 12:36:30',
                status: 'SUCCESSFUL',
                channelHash: 'qe4wlmr47g98ij2nplio0wytnstuuwj8ysvgzzdx',
                channelSapId: 'i03ft6eelvdc3jdj1ykd68d5fxuqwc5ud3y3q9jzac0c6rq0gz',
                channelParty: '93csu17ml30q429xvdb71n0om5x1qzm23rcjbfbo977qzs43fk4fq1fsprjwbnh0mq981hn0let6o5jo0cdrek0pibj49o9zoa1r3nx76ogpw0x4x5bvyapfufysetkoqp8jp498ng93jfjqnc0b649kv674hltp',
                channelComponent: '85go13uu3aoipoe0ffu3yr2ut7zk6vy71cod6ub1xhmpzliyu1823cvkvualnrjs1fqoqc8osmiivptntbnqp4q99i5iuh0oc5zohrboizc8sna6uhzv914uelhwcndqg1e1exxqceswymjybqdwcdxjxwmh2mtc',
                channelName: '9urnenw1k4iqagjzu6ddzh6g5cbwbjbdz1j0opk2o1n1waulq73xpqzb8vk245ta96c973fswkr77b583s12r9pmga1hihroapgtruwlqyiq78apjjcz4xtgpoe6ln9xxc4jz5rtk80sdfdv125e3i5gwrfur8ud',
                detail: 'Deserunt dicta officiis voluptatibus. Ut libero voluptatem explicabo et. At sunt eligendi rerum. Commodi sed suscipit voluptatem necessitatibus magnam eaque. Ducimus rerum aut fugiat optio voluptatem quia magni eos.',
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
                id: 'a8a619c0-f32a-48f1-8b56-87821e187ac9',
                tenantId: 'db5bad96-c700-4aee-a85c-dfe278dc97f1',
                tenantCode: 'xpzn83xa1ngj501txj97suqlqr0zu7c577z65xkl84j1jr5e92',
                systemId: '9daa226c-1e69-4364-859f-98f77ce408a0',
                systemName: '4ektwhfwjm8k6pml4l9s',
                executionId: '3d9ed954-a7e6-4415-9558-c588f3a67d5f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 01:16:24',
                executionMonitoringStartAt: '2020-07-28 22:38:47',
                executionMonitoringEndAt: '2020-07-29 04:43:22',
                status: 'SUCCESSFUL',
                channelHash: '2832vwyre574jma3fqljhpc3v49vyhwgsp8y196o',
                channelSapId: 'ff527xwtgdlbuuipyflf0xpe9cdgeis6q37s3u6i8ss8vvqokln',
                channelParty: '5yde7nbd0prajgo3diuqjg30pjyur0xcmdpdttpby2a32yq2ukscu6nz0jaounsy1ghgvtjb5zmzsvx1qbl0nfliqcn8z0aco6yk66ty9acyy2ulhb0j4vlai7od7hajutwm8739x5eewfo3tzxiu6rv54ddjz1t',
                channelComponent: 'i7k9davjub5qu5uecrp2bykej5fosestguh00ty8b22a8f7oqw8sltae2y2uars4zifxil4fqrhcjyf18lnc7ftiz6tnwrmqpinsiud8yg1cg55jmg8wbp91p1ypwoo9aoiykhdd6f53t2kcu67f2ccivfhngtqu',
                channelName: 'yq7nbydj2n1n5mun1b71cyk2fk2mezurr08x0hiiprhecvloq1sgvkae2dsl3rjw8jvepiwgao6r2cupr8x4wze8tf2d2de5a9w8vbqle40hquub5pdqi9fwqbqq6fi5g441z3g4y6lvpe22siggu58a2oqhz9px',
                detail: 'Explicabo deleniti commodi ipsam enim exercitationem et natus laboriosam alias. Veniam porro et provident. Et ipsam aliquid culpa expedita accusantium est voluptatem. A quia enim omnis quo.',
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
                id: 'a8a619c0-f32a-48f1-8b56-87821e187ac9',
                tenantId: 'db5bad96-c700-4aee-a85c-dfe278dc97f1',
                tenantCode: 'wy46b1x7k8wrxm8bdl3f49d3x2eje2btc4djdaadrh9fjg22p0',
                systemId: '9daa226c-1e69-4364-859f-98f77ce408a0',
                systemName: 'z6oxpdi9tr0ctm0ueodb',
                executionId: '3d9ed954-a7e6-4415-9558-c588f3a67d5f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 21:45:11',
                executionMonitoringStartAt: '2020-07-29 04:50:13',
                executionMonitoringEndAt: '2020-07-29 04:20:25',
                status: 'SUCCESSFUL',
                channelHash: 'ejd20btssh69uxly3ruzir6ih9tw4rt1e0h89fp1',
                channelSapId: 'ptw1paw9ju0w83i0r1of8pdn0tllc2edffqkkubg4i8ifoxdq3',
                channelParty: 'jc62ia8zjf4c6une44jcjuu1tbxm7t7nqdxmj5qxshl45ew9ffvwlxtfi5e0f6wmd05g8flkz2ilwvtp0aco4h5gv5e5jp6180kfesilfj6ybp7dpkxf69hcfbekaegf2i4tiogn8z0vpt3l62zntutllrzdzcz97',
                channelComponent: '3gek15e5gqejwyvttqywqeieqtlbxlaewhuvxica14wac8vehcpje5fu5t0sac7ykh1a4lzeq6tj4ngpkgm31wskj0x1sbn5q0r96zndz1w32oygd1mam2uayof4ha3ocxzp50d783yyq3hnzyu6kkq0oftogpou',
                channelName: 'f4l5lvsvl0tzhgn2e2nsbmjhxjm9t32hsahhw7gjyy1ci4tf2ezh3tuutihvar3pux54yijgtztah3w101dloin8epguc3466u7mjfv1yvu2xabhy1zjci87bw5j9m51jrsifcn0ig8cunxg2c2ra524sb7pom32',
                detail: 'Consequatur voluptatem rerum ipsam. Eveniet sit debitis similique natus sit debitis voluptates. Architecto perferendis voluptas. Ex neque assumenda voluptatem iure dolores qui dolorem tempore eum. Non aut alias explicabo pariatur natus.',
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
                id: 'a8a619c0-f32a-48f1-8b56-87821e187ac9',
                tenantId: 'db5bad96-c700-4aee-a85c-dfe278dc97f1',
                tenantCode: 'd62gkwk1mfadb25r775ux1leo51tkf291ehk8aw0x6y6uxfuil',
                systemId: '9daa226c-1e69-4364-859f-98f77ce408a0',
                systemName: 'a4po6vecbul2jf7xt7n5',
                executionId: '3d9ed954-a7e6-4415-9558-c588f3a67d5f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 21:08:27',
                executionMonitoringStartAt: '2020-07-28 18:42:49',
                executionMonitoringEndAt: '2020-07-29 08:18:52',
                status: 'UNKNOWN',
                channelHash: 'docuo46qeom3xvxs045hcd81i4yyjhrf1viztxhl',
                channelSapId: '42o5sokdr494mclncgj44hkrz6q896oremv6vojxqin3sss2qw',
                channelParty: 'e5we4n3tbfocg4weeu17na6b891yi1o3dkxjxga30pytmkl38i8zkemjgfe4unt5bo0im10io4zr9pke46ublfvkwp390skhdutm0fb5vp0mq0tnrrz9yu75zvldd9pt3kzvqvkl0josxvjz9kbv8z6nwgviroa1',
                channelComponent: '0rxdytjfn29e4s6vzbmr1m4vqlomxwu0jdm9tii0l06kgxoi9bfqflqjfp8hut15jsegs51dhygsj06d5acwviizctg179jrram9cot3e75k4wyk3ykmjnloajshftjbaqy9fdhbygxotolp3c05kzlo2zvj71eg1',
                channelName: 'z0h0qwsjrkw806d0r44k7u8fdgmuqxpveqd5xcozfkdzbvaa3hftgridijihoic22earrf223yio5wlxqh51ho4549oa8822018kmpnq6pi3bzn06ry5a894gu768icjvemkul6czwgmn9nxjjul6osy9hehlkqq',
                detail: 'Neque velit reiciendis non id aut vel quos qui. Voluptates aut nesciunt atque deserunt est. Nam occaecati eligendi beatae et dolorem esse.',
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
                id: 'a8a619c0-f32a-48f1-8b56-87821e187ac9',
                tenantId: 'db5bad96-c700-4aee-a85c-dfe278dc97f1',
                tenantCode: 'lqazrp0o5dgjp2jjd6nhrqtp1ba9342x66mkty528fzf612he1',
                systemId: '9daa226c-1e69-4364-859f-98f77ce408a0',
                systemName: 'f0kfvz5ihnlvhlguin9y',
                executionId: '3d9ed954-a7e6-4415-9558-c588f3a67d5f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 16:56:46',
                executionMonitoringStartAt: '2020-07-29 12:35:24',
                executionMonitoringEndAt: '2020-07-28 19:34:30',
                status: 'SUCCESSFUL',
                channelHash: 'kyyojmz147uezyje9lglg10zchdvsa9mipucq52k',
                channelSapId: 'bc3frxnzwmpfdmquuahmu86745yon2vj4429th57orfz42hnhc',
                channelParty: 'ntojkpeew2gpsgwdc5dmskh22k6a6874hqy2lypg3125lz1a3lzobj4gtdgovopszvhb9nxmnli2684bxxs81208j216kl0buhek08l7pqjvf5x4nowq401ph3cbmx0oeht07vfb6hsnoxs9al6ifqeeqhhwt00r',
                channelComponent: '8qpgibijt0uh85vc8zf5zs4n9eghnalwik7ccdfzy210ajdif9m630ufak0oo7wzog7t179bmyahza7j01b68es7rcwczq5y7e6lptxjwpzskc8ev4l5chrqpqrmol6btwzepuhjb9u1qlzwv5iqaenj7x5zlrdx',
                channelName: '0yeo7wqdbovgk0xllhbqwgypi1qfgodoehjsg0wqldz1pa1png9nithb4okrwdeb4snqb41mh4a3okls70l9kan7gdgmwy17w0gt29safk2tkr0g9qmbtbmt64urlyxcfxmvixfp41vhalzx7ce72mw949mtefe51',
                detail: 'Ipsam dolorem sed excepturi eligendi in nulla excepturi id enim. Mollitia et nam magni. Ex eum aut fugiat voluptatum amet assumenda quia nemo quasi. Porro itaque aspernatur rem quae dolores facere quo. Est illo magni nobis. Sunt sapiente voluptatem minus sunt natus quia reiciendis nam.',
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
                id: 'a8a619c0-f32a-48f1-8b56-87821e187ac9',
                tenantId: 'db5bad96-c700-4aee-a85c-dfe278dc97f1',
                tenantCode: 'wji7tr5cso2c7vfz0homt6pv1v8fgoxa6jab1mlspt8bi41tau',
                systemId: '9daa226c-1e69-4364-859f-98f77ce408a0',
                systemName: 'civu4g12qsfpq3ooe9vl',
                executionId: '3d9ed954-a7e6-4415-9558-c588f3a67d5f',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-28 21:05:24',
                executionMonitoringStartAt: '2020-07-29 13:40:40',
                executionMonitoringEndAt: '2020-07-28 22:47:58',
                status: 'STOPPED',
                channelHash: '1hp28rb72eu938dlp16a8nezto8njnb4ys1voh50',
                channelSapId: 'tdnnewvgpzhmbar296fkr6fev5p0km2fpn13s5vp33nbwcp336',
                channelParty: 'mywbsjhtg7op67wgyguxsa6wmykho99xcyt6le3spftrby199mzu2ms1wr9s3z5fzg4sbahf5ai2s0edvdm1zt30a3hmowlwfdk4fqkwg37zt4bydbe231jeibx6xe6o7l5qvr6uz2e5h62d85uj5my360umgk26',
                channelComponent: 'ry2km17fmnnurpjk2ga0hch4qgpgnidv2v4ra63227ied9iquyccpq1hty1xz5v6dnvw7zi9f9c5tpw8r9qtdn9iijm0rejaj86algx2r0t02n64i97uacnmm7osqqycb66fibwdnithdjs2o3p4oonvc1j2e6x2',
                channelName: '85ofb0bempjrt9b1tmv3753pkweurp5j7qb22f6hbck553q460y94r3zls8o8he2hae2s2uvrtj82ompzkteoqmfusg4m3hmst94h0f7qa51owgshn9yg95u32k47yfmus42e3e9k5vashzcy62rn8q7gxjtehua',
                detail: 'Animi delectus fugit voluptatem quo minima. Aperiam ad unde dolorum voluptatem necessitatibus. Dolore mollitia neque porro ut.',
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
                id: 'a8a619c0-f32a-48f1-8b56-87821e187ac9',
                tenantId: 'db5bad96-c700-4aee-a85c-dfe278dc97f1',
                tenantCode: '79kcech93yhbkg83wxlpocjuapsjwl7uuuk7zsdi4xciiwzs85',
                systemId: '9daa226c-1e69-4364-859f-98f77ce408a0',
                systemName: 't1u2pbs8xjxqi78alftr',
                executionId: '3d9ed954-a7e6-4415-9558-c588f3a67d5f',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 12:18:32',
                executionMonitoringStartAt: '2020-07-29 05:25:09',
                executionMonitoringEndAt: '2020-07-28 19:30:28',
                status: 'XXXX',
                channelHash: '17vxyb1olf36bkbm5gjz0ss9l5defgb7srl2sh2x',
                channelSapId: 'tovg4ieeyy0i39n2q1kljlc80i8aht6gg291xh5pdv1c2avvyt',
                channelParty: '4vm7eegm89rhjdo8mrh5ph2wop2prbiowh1xm5dv43s69knl6n07x0zs43yfwnfgrnzr4xdesj0t8b4wokfgxo3nvx9k54m6es8xnvhm0i74fbextins10rief3u4yf3o1iwvtnhwz3f2hkud2zib5u1zz2gpz6h',
                channelComponent: '0r6zel7md6xk7vlbt1o236fn1l7yk7vv4yp8f87jgwtiy4kwb9n1kpgtcaocr90lk2vyytmao54ik422dp6ct1j1e6etzdkpcza9w4pov2a5nz7gkvw7wt0wh6ybyhgcey0yz8rwtxuvf2wt96qkfqts858auy08',
                channelName: 'atib0is4j4gmy6e9xi79l6mp7gs3s7c2m96e56jasq0yz0okbrt1f542i1nl5jm9myo784dwfvmzs8hijy5s20e3b2oj0i9eyaf06abtk072hboxsx21844iolhma0450m8acrxj6d24bxrwtkn7seatyeaiuhq7',
                detail: 'Aut laboriosam nemo sint. Et nihil suscipit est ut doloremque tempora eveniet quae. Voluptas et sed consectetur eos. Non eius sequi sint tenetur tempora fugiat inventore illo.',
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
                id: 'a8a619c0-f32a-48f1-8b56-87821e187ac9',
                tenantId: 'db5bad96-c700-4aee-a85c-dfe278dc97f1',
                tenantCode: 'bij3wyeflw2et78azck1y8897m9wxvm5937csu9iqc8o9qcf1w',
                systemId: '9daa226c-1e69-4364-859f-98f77ce408a0',
                systemName: 'y94xf3c8skda8m5j4duq',
                executionId: '3d9ed954-a7e6-4415-9558-c588f3a67d5f',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-29 01:16:35',
                executionMonitoringEndAt: '2020-07-29 14:56:42',
                status: 'UNKNOWN',
                channelHash: 'kyffl6ky9ja50mvrbe4ei4de9vud2d1kin40xrfk',
                channelSapId: '29k8lfoeshwfxwob4ap18zt6kp021oy9g2itw8kcacnl1ot6my',
                channelParty: 'fuqykqwfgf51khem8txbiknqwy90v7c03pyoln183i51prse7uor6oq1mogn40fpfe6317p9452tsguzh7a8qyjss28y0uot1y7caiks78g0krj84hdwe3wwhmhzar0q3x9tpxnoal2dx71xog3excbpvgkydr5q',
                channelComponent: 'ctlxoo952vypx0kd1mgo9f60y2pxg150nzyus5a0bfq319smut63429a9e136s4y0mz2q9clrp06jir10ce016t00qbdtkmj9su5k2cm4k8ltixl0f7adkyv9ojb1w9cczujn023hmhic7ul3uxvt7wr515c57n1',
                channelName: 'rbqkv2e02uibtc7o6drgzg4644rb1mm821wmtjvx2z8u4rp5wb1cbu4pergvv5y3yfedkdvw3tyumihah8ucd1hytekgizu01dd6ltmszmql9cwhjegka729b6df45k67pju7lpijf9zyu3km4zq0t1kncg64znu',
                detail: 'Beatae impedit rerum omnis ipsam. Corporis ipsa enim aliquam quos occaecati. Et debitis ad consequatur. Similique amet fuga aliquam ex est doloremque porro error iste. Quod doloribus eos aut. Aut ducimus quia eum et quaerat maxime odit enim.',
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
                id: 'a8a619c0-f32a-48f1-8b56-87821e187ac9',
                tenantId: 'db5bad96-c700-4aee-a85c-dfe278dc97f1',
                tenantCode: 'ordr12n77zk41uww3wb7ohrodp87q509i09kt89rzicnktkqcy',
                systemId: '9daa226c-1e69-4364-859f-98f77ce408a0',
                systemName: 'pjxrm1g59offbzcgxf9u',
                executionId: '3d9ed954-a7e6-4415-9558-c588f3a67d5f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 11:30:59',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-29 09:43:53',
                status: 'UNREGISTERED',
                channelHash: 'c2zk3to0j3omu137k92y5c9p2eywc6wmzm73pb0b',
                channelSapId: 'zrx1c5tjksd1kpzhadxir6hby0w8huxrlz3pmfalgamzn8x7e4',
                channelParty: 'vp6l6mj3v518i22h4rq07r54ynmma457cfbo9upld6qx804837x0gbic49ix8595zuuieltnfart5quyk44a7bhni31siokdm5ephh7ti2amxu6nyoeexqlp5ogxlorkavtjjvle8elsrwlmrhiricbbn8l82ktj',
                channelComponent: 'frofnstnrndl0zcm5ap8xiixm2949gptqylfk214mlje9wuup7f4cczwbipb1oe2l7wwrl1f41akooeiw42g8iter5hz0yoe476s2c5tztr6ufbax06zkxoyikudbxex4rk4dfkoyuc8mf4gxwtnbr0s2oanuk9c',
                channelName: 'd89vg2qpkqy6h6a8q9vo7yiuy72uaa8070x3fbksj19afb5cxsxp3gahmgfobmymovcda9p9gbc7t5ncziwl8rf4bufc8lcgst8ahkx894gtitog0ipydofodyr335qbf7acbbcd384v6q39fnhcdofvjc1pqsrw',
                detail: 'Tenetur est veniam et veniam quam sint quia. Rerum sed quibusdam. Omnis qui iure ea exercitationem dolore tenetur. Omnis dignissimos voluptas qui eaque in qui vel asperiores. Ipsam sint quas quo nemo aliquam qui voluptatum excepturi.',
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
                id: 'a8a619c0-f32a-48f1-8b56-87821e187ac9',
                tenantId: 'db5bad96-c700-4aee-a85c-dfe278dc97f1',
                tenantCode: 'f98lxijqxagd5dcve0xuw7qopm9ha4i7dtfewgknxguupl7j8z',
                systemId: '9daa226c-1e69-4364-859f-98f77ce408a0',
                systemName: 'ubseld8xgwn67odn84lm',
                executionId: '3d9ed954-a7e6-4415-9558-c588f3a67d5f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 09:50:28',
                executionMonitoringStartAt: '2020-07-29 15:09:27',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'SUCCESSFUL',
                channelHash: '9x9l8xklsrxu0oavt7gzd86wedb3i1usgke0xkxm',
                channelSapId: 'onx3alopsnwoucoi8kl497zrwx21khirvjezlxhg3gfxi5kd93',
                channelParty: 'uonmhzvwnijykqlzw4ne7667gl7ovl39lb4reueab7l7drb6bhctm4ljtx0y5wvvw6xgr1b5ijah54gd4u4tgfw44dp2w6mhjgaayby7id83pt3u376m0nan3gaflndugb8wnur5uywb82qrmc43nidiwxiz2l9b',
                channelComponent: '9ig5j5bxhqt910ugn4rv49vt8zm80dfuattn4lhxv2jjckzh8g73l543f8jwrjmvt7yr3p2r2zn1x3z9vno5pd84owi9n0w3syq4ncx3q7pwqc3nzux9r06qev078psac6nw1r7lv9030jbllex3yqz2ak7dtfbq',
                channelName: 'vnum34f9konkmytwt5uevkd2izg8nzlir9euk43b9j66k843dyc750xbriph8lqv1yryxo27ea334xasbn831cxktq6rhy4ix8y6rlglu91fplcngdsv62a7dl1uis717dbsogbq64ij1r6g7pj4mv67gueabokl',
                detail: 'Sit dolor ullam id repellat nobis voluptatibus eum incidunt. Voluptate dicta inventore sit. Qui ex officiis quas est. Voluptates delectus quia quia consectetur repudiandae. Distinctio mollitia assumenda eaque. Ullam exercitationem inventore excepturi quia quos occaecati porro.',
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
                id: 'a8a619c0-f32a-48f1-8b56-87821e187ac9',
                tenantId: 'db5bad96-c700-4aee-a85c-dfe278dc97f1',
                tenantCode: '6zsc8150sltueedq1ukd3nbe8k7yi9suc9t25occrb9ajza1p7',
                systemId: '9daa226c-1e69-4364-859f-98f77ce408a0',
                systemName: 'uucx8jdyn47v3nhuduhy',
                executionId: '3d9ed954-a7e6-4415-9558-c588f3a67d5f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 19:00:34',
                executionMonitoringStartAt: '2020-07-28 21:56:04',
                executionMonitoringEndAt: '2020-07-29 06:20:12',
                status: 'STOPPED',
                channelHash: 'gu1id8t3arh0dn7m0pzj8v4wfxjqc3rnnf7rqt6x',
                channelSapId: '4g1seso8abiznykzn8rww6y92on75rqev1msvry5wvis9it7aq',
                channelParty: 'q8oix7iiphv8rwy82hyl25gxi639md3rh5x3ym6yenvh2ao4kfbu06l2r0iwci7xnawdno1u7qpyrr3m66r2jn6mymplgcts5jm99bq1zjm14e7npygy9djg6agkokb2ynh5j9vw7f02naj6xvyu1nra87y003ex',
                channelComponent: 'oo6lecptfea2trctm66l86ymcfj5tyftpcn4z1lkb65vh2i7z71hps87ogwavoh3xembahod53l1vxwiteai81kzxvaremgavuk4igvx2un1yjctts6mn52vdymdqwl383mwzw25y8jhneowhyvgwf53l5a87fls',
                channelName: '71jmbtztngfbldvqd23xt005qd0g2anf1217egjo1vqqgl4zmfeso2xjwjbi1l0zg7v0wjhre69e6zsh9e1dtctpumktew6m25l88ltggj9adhkd9punwjvqhj06fc0oujpkna1ton8htlnp3vnpz5glfzrt0d2p',
                detail: 'Autem ea itaque. Eligendi id molestias eveniet quasi maxime. Exercitationem repellat sit perferendis molestias ad cumque non ex saepe. Voluptas porro sit dolorem et est.',
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
                        value   : 'a8a619c0-f32a-48f1-8b56-87821e187ac9'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'a8a619c0-f32a-48f1-8b56-87821e187ac9'));
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
            .get('/bplus-it-sappi/channel-detail/a8a619c0-f32a-48f1-8b56-87821e187ac9')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a8a619c0-f32a-48f1-8b56-87821e187ac9'));
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
                
                id: '731f23e0-32e5-4d94-a273-19503818f88c',
                tenantId: '1baa5987-6897-43f9-9475-165d57b97164',
                tenantCode: 'b7m5gmdo7y2dusak3p8t7r36fcg95geatppwo67xiw27n11mq9',
                systemId: '20d311b8-3fb9-4641-b045-a4f9e173bf4f',
                systemName: 'n9whly61ntciota0umtd',
                executionId: '58f52ca6-acd1-4376-b0cc-9da1157770b7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 05:53:53',
                executionMonitoringStartAt: '2020-07-29 16:00:46',
                executionMonitoringEndAt: '2020-07-29 09:15:20',
                status: 'ERROR',
                channelHash: 'w4549ss7ncvjg9imffqpi7tubw995smkorwvxt95',
                channelSapId: 'dzpbptiq1iw45g9td78cme053f37r2yti8v5uk0xl1dfo4sz50',
                channelParty: '3fkooh4rj2tnw24brdk9zic6v8gf9gi9ya8wh4glv2cgcfzktduncmka30tzf5vy1uey6qj2a5ymfnmbn4vw0yt4af202ae41heub1xlgdxadera8b6qnmrfq9ibx5ogphbhr27jhl09pfckgx0gcjybxdoljzjo',
                channelComponent: '4dbjtfl7rz4yqcmoc07196mhfxkwn39z3r1fnqhqhhigdl95ood77mr8e93yp1cs3adah1d9cxli9xarecv00uwoxw2qydb6awu4o8wdhibncglozbq0tjs3tllzb7uhzp4si4uem53fjmo2pf9o2vpoa8x11y6z',
                channelName: 'han6st7ci2fpbztgkn1oltvj0q68xi8an688f78ed6efba8sctuwkv8h1sjeefw0nmfw4ag6hidt6mu3zfte0i99fm661psumcs3c45lqf9dhz5ow13xz50pbfmxc7y6b3so07mxnl74rxcp44jjfo1pdg112zx0',
                detail: 'Voluptas alias ratione est eos. Molestiae accusantium repellendus sunt consectetur expedita soluta est. Aliquam ducimus occaecati in ut similique deleniti rerum.',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: 'a8a619c0-f32a-48f1-8b56-87821e187ac9',
                tenantId: 'db5bad96-c700-4aee-a85c-dfe278dc97f1',
                tenantCode: 'vm2mkj4qu95hx1qzea3z6bjnheexyzgr5g0ecfsqmpobshdo2y',
                systemId: '9daa226c-1e69-4364-859f-98f77ce408a0',
                systemName: '76zrpfczf1b2j0tzc7xl',
                executionId: '3d9ed954-a7e6-4415-9558-c588f3a67d5f',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 17:42:31',
                executionMonitoringStartAt: '2020-07-29 06:49:35',
                executionMonitoringEndAt: '2020-07-29 08:43:04',
                status: 'ERROR',
                channelHash: '1jjwlrimp1zeoczzf022zusqvdhdn7mdku91wf2c',
                channelSapId: 'oap7hnqtezkvb8kfb2d1q50itipwf9msl6oymr26p6q8jbiwiu',
                channelParty: 'kvcbo0xalob51a3i86zk8enmqxpdtvhqze3esu3sdjbgb53i4y5ae7vyg9ukcbwojepb4y2ltpnr1tlxbtgwd9tsnmd8fybh4fo8r1s6y4ozqopgxms97qnsonj1s1y3u87k2mo14dmrkxrrkrf83u9uey3t094n',
                channelComponent: 'xf8btazqhiuq4jrffs76n6wukzj4bw3sak1dxbz4nhq4es8e1owa6cn6b18dcgqubx5mz8uo99355zlsxhump8acwippj5yy6t75bm5vjd8mhnyz0g8bq8gtdk68mqhth5kwstc1ris4za81ridxuom7xzvj5yat',
                channelName: '8qc48robcbse62lxm9noxul7de1zwpnzhempwutf3426tm4mwjgb65fk1ceywxonulrwwty9jug0eqw83u4ar58byqfis9odfn202m6jfcjkxsg4p1qw84dbafel4139rvmozumhxxf9ueitgfnw95vj76xr2nca',
                detail: 'Molestiae tempora fugit voluptatum. Voluptatum qui aut facere odit dignissimos animi odio beatae sed. Alias ipsa odio sunt veniam sint. A et quam enim ut ad perferendis voluptate ut amet.',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a8a619c0-f32a-48f1-8b56-87821e187ac9'));
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
            .delete('/bplus-it-sappi/channel-detail/a8a619c0-f32a-48f1-8b56-87821e187ac9')
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
                            channelHash
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
                            channelHash
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
                        id: 'c73f733b-3d11-4ee8-b79c-9995b40aae94',
                        tenantId: 'db5bad96-c700-4aee-a85c-dfe278dc97f1',
                        tenantCode: '9ajqz461n6xxa9iwd55kho543qj5vt78wu2lmsulnh3bfbd46c',
                        systemId: '9daa226c-1e69-4364-859f-98f77ce408a0',
                        systemName: '9rayiy0w617u6myuagkm',
                        executionId: '3d9ed954-a7e6-4415-9558-c588f3a67d5f',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-29 04:56:48',
                        executionMonitoringStartAt: '2020-07-29 13:21:40',
                        executionMonitoringEndAt: '2020-07-29 17:29:05',
                        status: 'ERROR',
                        channelHash: 'hfoa7tyd1fx38l9vmcrjg6j4pqx7gyfb5u96edv3',
                        channelSapId: 'vwanhbuan97mq9sp6fb3jigd6zi00kr8at5d3vdjgbm8tx03g3',
                        channelParty: 'hh28xc4xprd8zn1d30txx6p5vhnuom545m3nofjpe8igc3mafeji5llzt0zgmdibgo0v0d45q5d1ws2a68vyajjacw5sawym3y45r6eyikh5q07tuvitz01djzsqsqrsr135t5ufmhax9k4oc7dsb22e40j55st9',
                        channelComponent: '3568zr8xrcjzmo6v7r61pvlk2sxhaasu5ys3z7t07t4ufaxca8qjl6pl5zld1ng189r801lroy243x1h15aglxen5ioi6joirren6ihyppogwv3j4xlz132uklx880swhht642fpca6iifip019qitkho1p2r9ms',
                        channelName: '3f2qxa5cx2jowd1qp71cj7tbn3a59kn9whce31lq5a3apfngw8c4yd06zs5mxwizaaaee7zn2iwaugxc44i8gyhx12pz02uh60kl763b0xkb7cepnqb0foq9up2gen799tvobl9k1mwaxbmmip7deay1k91eleoz',
                        detail: 'Qui amet id qui nam sint explicabo. Expedita molestias aut. Dignissimos perferendis vitae eaque qui laboriosam ut et aut.',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannelDetail).toHaveProperty('id', 'c73f733b-3d11-4ee8-b79c-9995b40aae94');
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
                            channelHash
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
                            channelHash
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
                            value   : 'a8a619c0-f32a-48f1-8b56-87821e187ac9'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelDetail.id).toStrictEqual('a8a619c0-f32a-48f1-8b56-87821e187ac9');
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
                            channelHash
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
                            channelHash
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
                    id: 'a8a619c0-f32a-48f1-8b56-87821e187ac9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelDetailById.id).toStrictEqual('a8a619c0-f32a-48f1-8b56-87821e187ac9');
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
                            channelHash
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
                            channelHash
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
                        
                        id: '1d709b41-bc5c-49f2-ae5e-6e1bd8ffbc25',
                        tenantId: '200cabcc-a481-4256-96b1-985f7fe83d61',
                        tenantCode: 'zda7qbgjaojajyeem67lvzrqg71kjorge9meu3l5416udufgzh',
                        systemId: 'b84f8f17-ca79-40c5-a7e6-a38a913d3e97',
                        systemName: '6hq8mda0y8i32ops84a1',
                        executionId: '6eda6c30-605f-4cd2-8dc7-6fdfb291a315',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 18:02:09',
                        executionMonitoringStartAt: '2020-07-29 05:38:30',
                        executionMonitoringEndAt: '2020-07-29 18:05:34',
                        status: 'ERROR',
                        channelHash: 'm445yhgtzdbbmyt0g4dfebrafdr21bauy8x2lp4g',
                        channelSapId: 'rsl8to700tdyzwux8md37bnb8biomimm9ol6ye7tuxzge23xfc',
                        channelParty: 't939hmkhjg0q814r6mhyc778qg4l11s7my7gkb0m8t4k882tin71fdih84cjdu7a25mctwmx1xkw1cy81ezt2rwudj90hsz09oqrh89joybs6amkbgmar1jgzkown7s8bx39ka2p98v1ai9cnyk7kwoaehjn1hn4',
                        channelComponent: 'fzu95ev0am15a8ig31qhlfix01968si3phqcorczqwm320yc5fknesswnebznhi341y2mugdk03ii5me2tbl3pq7h34077zof8i74efm32qeg2zpn42mqhxm5lw101znr6gvpj7rje84zuebjfw8zel1ron0mccd',
                        channelName: 'q5ifhgsrzr61uzy8u664t0eoshaxy5x0o75ds7qa4fto7spcoh6ps2ytcbo59jurcigzuwfu52a15rtjqyt06d7cc1ax9bnft1dvq3y7iaupm63tnttcitjgiyf0cybo2bset5puhswxr6u10z1au2yp4larigty',
                        detail: 'Vel minus vel. Voluptas minus eos quam est consequatur. Ratione dolor fugit corrupti aut nulla porro illum.',
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
                            channelHash
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
                        
                        id: 'a8a619c0-f32a-48f1-8b56-87821e187ac9',
                        tenantId: 'db5bad96-c700-4aee-a85c-dfe278dc97f1',
                        tenantCode: 'v08algkry4qcy1lunuob3f26po7uayvjuz6e6h5q1coebkxtpx',
                        systemId: '9daa226c-1e69-4364-859f-98f77ce408a0',
                        systemName: 'lttjjhy6thde6wl11nlq',
                        executionId: '3d9ed954-a7e6-4415-9558-c588f3a67d5f',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-28 23:53:14',
                        executionMonitoringStartAt: '2020-07-29 05:13:44',
                        executionMonitoringEndAt: '2020-07-29 14:47:56',
                        status: 'ERROR',
                        channelHash: 'lnvyl4hfspvhryx45kpxu33e0ivscvat6kqzupf3',
                        channelSapId: 'yxpebzmxl0qqepjh24zxop6p838v3zu2jb4h0gb16lnveig460',
                        channelParty: 'jiz7fkux91ahhs5jmqfrua82rxislqg3x5dvfntgj1x0u8vqd813r99m2mvxbvpb1o9zx9hykwf3udsao9k6p8haqltry124fq6wth6xeccookekgl33jl58jhj8abk8fcirsve6g9b9d5lj676c4e2svkhzs3qm',
                        channelComponent: 'oiqa2z348b9hjxf3wgq4px2h0tisnow0yur69cbb1h9t3syf0qo6a42tn0bj3dnhxuw70op20se0q24pz21ydwvfnn0bpq8nh55oqy1blo7xticltgtntafan99s3kphearnijyi6f5tkes4vbo9aenwyrdrf5z1',
                        channelName: 'yy57hfk5wo18usfencg0mkjzkh3rid9stm3672dz18nw1ige8pl3acnxghee8ybg4rqssj1yco6ukqt2fcdojqf45646497vurc8fep1ryd5w1gd7qnnpan6wopg8fiwh6b25lj4ejysntlregrvc3a1yh9aplh1',
                        detail: 'Minima autem distinctio. Nostrum error praesentium voluptatem suscipit et porro iusto alias. Doloremque est aut modi nobis quae in perferendis. Ea fugiat aut animi.',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannelDetail.id).toStrictEqual('a8a619c0-f32a-48f1-8b56-87821e187ac9');
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
                            channelHash
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
                            channelHash
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
                    id: 'a8a619c0-f32a-48f1-8b56-87821e187ac9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelDetailById.id).toStrictEqual('a8a619c0-f32a-48f1-8b56-87821e187ac9');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});