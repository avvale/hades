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
                tenantId: 'c8ec4d98-010d-4b1e-941d-a7a86c30a653',
                tenantCode: 'vf2hyhb502cq6zicasklwdjlwj4q16ka1fhyunt7scli44n01w',
                systemId: '5dbbfb28-421f-4131-9f54-668dc4f9273d',
                systemName: '6a9ugnlplbq635iz5tq6',
                executionId: 'c30b8a03-f9ca-4346-944c-918dc83d6aef',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 00:05:44',
                executionMonitoringStartAt: '2020-07-28 08:37:14',
                executionMonitoringEndAt: '2020-07-27 15:39:55',
                status: 'SUCCESSFUL',
                channelId: 'b9ac1ac4-324f-449c-8260-37cef826edbd',
                channelSapId: 'pz8cy188tzm3z2fktpl7br80ophs421yktbuwm7k3n2e7shxt5',
                channelParty: '4oh38lodd76fjz8w5urwabv9vm1srgil6nx0376taxn6bqkdboqxlsu7pryvgz3igshf8vfti0cifb0juajlr7ddatl6gyxzgjqgnx54vc0yrjh88gnlh4eie0jkv3gca0c0utubc8mk88d5jf5fv619iw0affq9',
                channelComponent: 'ytz17elqpwio2rsz3jufcgl07d0r3mak0z7yrn3c1a0qdck7gf9k3u7vkihqvcw8xpyqhpc7d3mq9c5nb3e1yl2j9bp2hixosu6f4udr2iihfp0z19zuxgth0w8gl0hmf43ya2nu7nn8z7t33nnb0s445qjkk2vr',
                channelName: 'v53057zvj5wjw435svp3hnzqzagdus3k2z7mt2zrdjhb7e1xpqs13ja1momxqlv0l8dlddave1kqloytjqf4064cbbuhvnk8sqzgavtml3zjimtfsk8wrjxginr85c1w3ymx3q7duof4d8uw5jkb09cbgmq5ado1',
                detail: 'Quis in ea dolorem officiis commodi eveniet ea. Assumenda omnis laboriosam atque omnis. Nesciunt ducimus vel est quia aliquid asperiores dolores vitae totam.',
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
                
                tenantId: 'c8ec4d98-010d-4b1e-941d-a7a86c30a653',
                tenantCode: '4770j5ygn93y2t11f4me1dlng0t9gbkfb70lrqj5s2z2y307my',
                systemId: '5dbbfb28-421f-4131-9f54-668dc4f9273d',
                systemName: '7bknb5wj8qntm6lt7aou',
                executionId: 'c30b8a03-f9ca-4346-944c-918dc83d6aef',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 02:00:43',
                executionMonitoringStartAt: '2020-07-27 18:54:57',
                executionMonitoringEndAt: '2020-07-27 13:58:31',
                status: 'UNREGISTERED',
                channelId: 'b9ac1ac4-324f-449c-8260-37cef826edbd',
                channelSapId: '0dh6ma4atther2cmfcxa6rvx8hneaupkndnbqbp4ukjtbbsewr',
                channelParty: '0d2gk11g7v2bze8rxmht85ndj2tqwxrd7xzpbzm5ablikik7sqhpqnnxgoeprr94p4ary30s3kvksxd9yd7gumc1x0lmc0ifkmgd0w1j3s6xu4080247jlf73t6n7c940eo46fe1mujph7t9n9d1dixp3571qxsb',
                channelComponent: 'fke8uu65ztmjp5ew10dwm1s5xfxc5tswx5fkyp989z8gnaeqqk8zspowjt7ij55pxnzslqrm8vfqqx6dyebmt5gax8jdenumd8fa8wezwypjhq4p2zpd1lwvhu3solllqyxeafewq7ditmgg7s3rppw038ht5i8r',
                channelName: 'yykmzmw6681mnjyvigevnvh3fo33b452lyj8ajq20hubn36mmkypp76n3e81o5b19y25d3zss2hqd7l4b0ubdeuqu9fojsq4fnuz34flzqe1hjl71x6liuj8m4utt1e0enhrcckjdd2t8dt1fl1aywguokmbvvry',
                detail: 'Quo et temporibus consequatur dolor ratione nihil consequatur. Mollitia ad aut beatae nihil ullam ratione. Sed aut in. Aut a corporis nobis recusandae odio et. Quaerat asperiores voluptatum vero voluptatem. Voluptatem quia enim accusantium ea cumque unde.',
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
                id: '11e36733-928e-4ff3-99e2-523d69ae370f',
                tenantId: null,
                tenantCode: '1m2vzbb9j5yqosx06tfl4ko57j7siemmv1c9yie8vvv8pp8nz9',
                systemId: '5dbbfb28-421f-4131-9f54-668dc4f9273d',
                systemName: 'e8go2yuq3bvth570mio6',
                executionId: 'c30b8a03-f9ca-4346-944c-918dc83d6aef',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 15:59:27',
                executionMonitoringStartAt: '2020-07-27 19:17:28',
                executionMonitoringEndAt: '2020-07-28 04:36:14',
                status: 'SUCCESSFUL',
                channelId: 'b9ac1ac4-324f-449c-8260-37cef826edbd',
                channelSapId: '732ue4gt69pow3y8wo6bf9kgzyvd8mo1o6ht2qfw0zwk2eakbn',
                channelParty: '2y9xpj13scdaxddsbh4tvl7qz5n6wu3nchc0g7d7f55rb0zmrhuean85gq67wp0axtphi6le7vb8uqbyu7aw3ubfgi6qqpp70g321droztcukulraw1igsnpfdxqwqkxp2djp1zbfv4yq35acrou9ru58sjmg9e9',
                channelComponent: 'pz2tzpzbwfmnx3pzs038pzgufq7k45idgzu2gzx74zpns23cxjqlwk237uf0ypt51iggskd3ixb1r49sjwq796galfxq7gd2dxigacjeet74sb1m3zyqega7f3e3rf1e1xrvcx1y3puu6htjfwk8ppwdup9hjibl',
                channelName: 't13kw6otqun0mqkke3obxgeqilrlxn92jzibswgbz2wbmc5z10uwzl70arctjrju7eysfi0i317cwkwrrse4yagmd3i53mzem2zt0ub9x3cep4jynpjrmhmgor6no2vhfqwsschiufpotzl7srlak41ybc6jrtrr',
                detail: 'Et ducimus tempore et quia et neque eius. Possimus est dolorem quod ab. Nemo aperiam doloremque.',
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
                id: '11e36733-928e-4ff3-99e2-523d69ae370f',
                
                tenantCode: 'b236aj2equohrsak49h5dlmxcngne1y107ill8uvhhcl8hs9a5',
                systemId: '5dbbfb28-421f-4131-9f54-668dc4f9273d',
                systemName: '2iqllb3snmvwj8z2cu3w',
                executionId: 'c30b8a03-f9ca-4346-944c-918dc83d6aef',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 16:23:08',
                executionMonitoringStartAt: '2020-07-27 23:50:22',
                executionMonitoringEndAt: '2020-07-28 04:53:53',
                status: 'UNKNOWN',
                channelId: 'b9ac1ac4-324f-449c-8260-37cef826edbd',
                channelSapId: 'pyovhm7eygy9j8j1sl8cy8p2rufinwtw1u9sg3ene9mvtulw52',
                channelParty: '12t5844d72f2lacv07bdxoic24t6brlwips75ta6alpyxvk1xa1lblkqrlfcgiikgr11tgro5v9jzzpksbuejz6sbsj5j5lvj6rs13biy0t4lnzd02wowdesixebd4gxwqct9n9hi8vw9wspvb6vmujhntme3q8u',
                channelComponent: '3f4qffg6sufewdcz3bokuep4azgivtjwavcdr11iidvj9b8t8zf2tq0bz842jkram4x3prsj5ervfm9ojx15vneaj3ojvcsi8a9q1oy0d926r3rwxb3u3vm9ld9pc3qcircr05lvt6fehgxy2r4dx6m6i8xb79v7',
                channelName: 'nxeas6ulyzuebkfqr0m1ku0luddqpd0etzz1sd2f2oe55n051czojl2vcmq8lsapdps5hwvjcdvkfvowsqzx2zhxvn6tndk8m7f61aj2uzahbnqprahbo7hhokvlv8di9s4mc9ugjjczksdjmo2c1qqbrwea748p',
                detail: 'Sit quia nobis ut asperiores. Blanditiis fugit ut ipsum vero voluptatem. Veritatis aliquid quibusdam voluptas nihil qui odio magni. Quisquam facilis laborum debitis voluptas commodi est maiores et. Et ipsum odit omnis quia nobis.',
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
                id: '11e36733-928e-4ff3-99e2-523d69ae370f',
                tenantId: 'c8ec4d98-010d-4b1e-941d-a7a86c30a653',
                tenantCode: null,
                systemId: '5dbbfb28-421f-4131-9f54-668dc4f9273d',
                systemName: 'dr6rg07a9p1vy1seewcs',
                executionId: 'c30b8a03-f9ca-4346-944c-918dc83d6aef',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 08:20:12',
                executionMonitoringStartAt: '2020-07-27 19:43:08',
                executionMonitoringEndAt: '2020-07-27 15:02:33',
                status: 'STOPPED',
                channelId: 'b9ac1ac4-324f-449c-8260-37cef826edbd',
                channelSapId: 'blsjy3m49ccdt2e16tjh8mbw44k089h9fm8f10td27abxi3r67',
                channelParty: 'gefzu8njljxcm8o0vuynnrsbys41m61imi6oz7rhcpcw4b5h1m2i8q0dzloy0h72j2mr9xac798oi7kr1l6aqxd6qb9g4pf2f4gagvwb1bx5q7u30yjsil3g9gr5i7ms5b34qheqfu85eetnxdrayx9axdep19o2',
                channelComponent: '9kz5llaei2pg3ae8ct5kj58znsm99dfvsyjf6kd074pmvx875s5t5wkv97lqfxv7ehxhu2vj793n5d5aiuckeo4gz6fsl8cnphzfyh5n9lig61plv67mea812mkrx4klrkkrvzgtv9k6p6tqdpjkmgv2tbgjgp98',
                channelName: 'czyzdeoq2nxb43apsmux8k0icab5kgl3goqvnp0b47trsupcc8r75u7yr52alhiguyrct9l6mjf9vfz6sb8v09f8hagyyf6udh584y30ls0k26phk1qognmhdb8ewr65tmkvpnw89eg3mts6bmhly5640h5giurc',
                detail: 'Dolorem ut quis. Est et architecto facere sint. Molestias eius iure. Maiores nobis quisquam et qui. Dolorem veniam quia aut. Possimus atque aut.',
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
                id: '11e36733-928e-4ff3-99e2-523d69ae370f',
                tenantId: 'c8ec4d98-010d-4b1e-941d-a7a86c30a653',
                
                systemId: '5dbbfb28-421f-4131-9f54-668dc4f9273d',
                systemName: 'bqzlw41ebb7494t8fxef',
                executionId: 'c30b8a03-f9ca-4346-944c-918dc83d6aef',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 19:28:00',
                executionMonitoringStartAt: '2020-07-27 17:24:43',
                executionMonitoringEndAt: '2020-07-27 14:34:50',
                status: 'INACTIVE',
                channelId: 'b9ac1ac4-324f-449c-8260-37cef826edbd',
                channelSapId: 'cn59uq1ptjdam0y4fnbmxvca2zh9tmbbtqjokdg2a0vz791pq6',
                channelParty: 'lznotingtwt01hk3pb614zj6ldlxqv52zl3yezd66cs3vk05rqia223a6csukfsk263fxdyc1c11mo66935r7mb0lmjgxhhr93jc4iduijxf2fkkcno0ub2g14je67ud88smyhotso0gimn4gh2izye4s86c1i6g',
                channelComponent: 'hl2hn3zca11coe6uqlwhjlaf9eewq1nmblm1zbmfmtlzwf375n1i1sevdyxj44bflbnlh559dm5na1ylg11wz56uo23npyyrn51f3chi6pdyh1g0n3wshgq9hu3p4f4y0xuqzqfwpf7fs7xu5cttsiwejnng8pox',
                channelName: '0dk4j9cssa64oayjz6vsidvvafskpuv40qtisoyov5vkoyr08vpqur1ayyh3scn0rjtdmfido52nbucspjmewawslqk2yxpwbdfomschba9lfptyb1ppulr0m0kx5ccowzsggc5wyqzrfrsuedsktk9qgmnz9bjl',
                detail: 'Explicabo est fugit delectus ad expedita consequuntur et eos. Natus optio quas officia. Molestias sed sit corrupti culpa autem consequatur neque necessitatibus libero.',
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
                id: '11e36733-928e-4ff3-99e2-523d69ae370f',
                tenantId: 'c8ec4d98-010d-4b1e-941d-a7a86c30a653',
                tenantCode: '32wh1exz996xrl2kqxxn0jyanu28gdwz9sm34zb4rm7253xofb',
                systemId: null,
                systemName: 'hndkluyga2yikpuh2lo4',
                executionId: 'c30b8a03-f9ca-4346-944c-918dc83d6aef',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 05:19:58',
                executionMonitoringStartAt: '2020-07-28 08:46:09',
                executionMonitoringEndAt: '2020-07-28 00:43:01',
                status: 'UNKNOWN',
                channelId: 'b9ac1ac4-324f-449c-8260-37cef826edbd',
                channelSapId: 'jfjka7mmxl5gyanz0tnn3v0078zoqi6f4havye2cbm9gdqa8cv',
                channelParty: 'a8rutfxfn4kcyh0wqykd5xoe0ayrxl8mpgkop0xigktizamljrfzflgkkf6ed3y7kmb11uf72bm3vlxxd1s54noih4ru5ikw7wjg4fpaldm8hn5oo9ta4xblitewgqhw1diwx34b849x5ctktdtrhbtkf8m0nydy',
                channelComponent: 'ttulk4xfsd8s0iv0zqahik39nnwmphncyyx4km3pzsu18tbfm2sbm5r5jxets94xx78wk24b2pih9anr3uk450cpxhmymetga9n311u2zdkov8lz4ds4w4ahenec02k1iumbzqjuy3r6yq1nmv9apqdypqowtsyf',
                channelName: 'gmydexvi8hx7uwu9uidwpauhm7r2gcpzv7uex5bmm9l0i2ixezs8f25cmo267qdjbhib5txfz5gtejpz54vpvmymiywtlco6pqza2chzl06jjvk61029o6oqvcb95nkxgjxvsuu7vhf7pvs4l6qmawpgnuxk26nd',
                detail: 'Voluptas quia molestiae amet maxime quos et accusamus et. Commodi voluptas exercitationem eum quisquam non possimus et. Eum illo eum sed beatae modi.',
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
                id: '11e36733-928e-4ff3-99e2-523d69ae370f',
                tenantId: 'c8ec4d98-010d-4b1e-941d-a7a86c30a653',
                tenantCode: 'rf0c8jrje8nccjxkhxr3vxvhj17lb4fwr5cvemw4buhrzxxi96',
                
                systemName: '3r6zqr3ecf1zlzuqoraa',
                executionId: 'c30b8a03-f9ca-4346-944c-918dc83d6aef',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 10:25:21',
                executionMonitoringStartAt: '2020-07-27 16:37:48',
                executionMonitoringEndAt: '2020-07-27 20:45:36',
                status: 'ERROR',
                channelId: 'b9ac1ac4-324f-449c-8260-37cef826edbd',
                channelSapId: 'phvgz5kl5p6rx1okv8861d92gowo3mxvbes4utjbkve3kwcu6h',
                channelParty: '26qiyuw67hoapq318yl7a3u1peeod3nh0je33rhogxgk28n8dcv7byfdxqrxufa2q7h7tmdeun6uavidjxvccenc9w0wpd71lz56yfzasilvtylfb9hbve9exa8u7m8k2lutdhlbhg9vpqa2y6liucjqhpsegc21',
                channelComponent: 'ni82f2snopahw2kzru697xocg4lkdspog580bgqi75jaysj0exyf4ns746u8pa6gkm3qgxrbr6ju7r9d2sbuzv1vjz1xyisipbnjegil0vn14yxv3ttyb8wmtx4s205j5dtlzmd8fpjh0u3rx049yvy96p4c62hh',
                channelName: 'rbpjktghyjy4rdil7kcu6okgl9b7787kotdcy4i6xmwhrzz16h03dx0q91wzs1uq7l2xccv6bnu2xd8czwis286483siuivxke3s2vobtpp8lnxp3vx7i2gbthm9v5fc8an1kckqta7rw41q447mmvj1d2fcb7jr',
                detail: 'Id nihil vel eos. Reiciendis ut asperiores velit deserunt deserunt. Qui voluptas reiciendis quia vel. Dolorem et eaque cupiditate. Omnis aperiam veniam deleniti. Quis optio provident voluptatibus tempora et itaque et culpa facere.',
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
                id: '11e36733-928e-4ff3-99e2-523d69ae370f',
                tenantId: 'c8ec4d98-010d-4b1e-941d-a7a86c30a653',
                tenantCode: 'qvkhxdzzo5mtkzzmgl26gbnhvflezx8e7nlphjto0u7a5z5vxk',
                systemId: '5dbbfb28-421f-4131-9f54-668dc4f9273d',
                systemName: null,
                executionId: 'c30b8a03-f9ca-4346-944c-918dc83d6aef',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 19:59:11',
                executionMonitoringStartAt: '2020-07-27 17:56:49',
                executionMonitoringEndAt: '2020-07-28 01:54:36',
                status: 'STOPPED',
                channelId: 'b9ac1ac4-324f-449c-8260-37cef826edbd',
                channelSapId: 'xx05l8n6fq16aj8mw5lmkpi7drngredbz2k37oam6b8vmdwuuz',
                channelParty: 'f3fo6zhye31h0859rcy04x64wzummoovsuf9szmd2y2ml0jtwucv5lf0b2ha5tpbd7sj994c94608fwq0u7kfzxb5nz6zx18dfg2rn293weoo01kfdaui20s7niw5p43qzg6vresdlarpi3vdlygaavhnbtlzviv',
                channelComponent: 'r17typvukuotvdqvkcsmepmy8orezet0gnhtrdvlafxy70ebgyzyl0jtgffwk2b3dot58qejk5809pzn82lrwh0pd3r8ldtesykghwkjon11gjfkgk09hpnohttxyqrdyax7njczcvf3gmiru9ajsywi8vl8706l',
                channelName: 'opbxzk0u6wooxh73wbswkvaea7d2xyewiyskojlore1aih5bhhfisak5aimtg51scknkng8psaikochrsvdjsb523tcn6r8o4a49i2ch9jt5qy165wcvcr9gzzbibg4finpid9ebcdlmtwguz405bb6dnfyaghh8',
                detail: 'Expedita tempora voluptatem harum et laboriosam dignissimos labore quasi. Porro voluptas molestias. Ut et sapiente. Omnis molestias nesciunt veritatis dolores et. Ut sapiente beatae error unde possimus enim fugit rerum. Ipsam vel aut odit eius quo a.',
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
                id: '11e36733-928e-4ff3-99e2-523d69ae370f',
                tenantId: 'c8ec4d98-010d-4b1e-941d-a7a86c30a653',
                tenantCode: 'igkenzrtd8lwugeqvei1njvf1s3p6yekr7eze9kwm9ux75jfnp',
                systemId: '5dbbfb28-421f-4131-9f54-668dc4f9273d',
                
                executionId: 'c30b8a03-f9ca-4346-944c-918dc83d6aef',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 16:42:20',
                executionMonitoringStartAt: '2020-07-28 01:48:48',
                executionMonitoringEndAt: '2020-07-27 19:41:11',
                status: 'INACTIVE',
                channelId: 'b9ac1ac4-324f-449c-8260-37cef826edbd',
                channelSapId: 'y1pgev9e0871zvdju46bomk9qkgt2lvstcpbh5c15rj8g2vmnw',
                channelParty: 'o93hjvtd5kuf8dchctp09qd32287os3y3a74kf8spfepcr6602c3trjt9bjt78lswb6wl4gjncqlvr2pallfwultbcbzragpdnw9crd309f02sr0hgs2rn0mj4oe14qdjnjkosuo52wsen9ufng81vn19zwaa4zi',
                channelComponent: 'otv42kcj8zk7zoq60xd0yp2tvs7w6kvi0zloxpdofftknf85d785725ce6snlh36nwbypysc3j18bmt5lk6ffbdunfmzvjgho2rtdjrtery3nr728ll4g205iw9ndixxntcuev2mtfgqrpzflu7b9nqqv9ocsrx5',
                channelName: 'i061c9c9ukhzfsokwi5ontz8kecfwr2fmmi2vpl5wcf7ffbxg4dnx65y8nycj3xj2rn03siddynz7squh2oy0389h86iib1qybbk818h45l77pt6bms5u9la67jv7riuu52fm6cqpi6wcuwl6hoibn0u5a482mrs',
                detail: 'Atque voluptatum odit nobis dolor. Dolorem commodi non voluptatem ut. Soluta eos consectetur qui et recusandae.',
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
                id: '11e36733-928e-4ff3-99e2-523d69ae370f',
                tenantId: 'c8ec4d98-010d-4b1e-941d-a7a86c30a653',
                tenantCode: 'zluw1duwu3wq7q4nyt1m6fpaez1vhxob3ryhhfadq7ah2yvas5',
                systemId: '5dbbfb28-421f-4131-9f54-668dc4f9273d',
                systemName: 'igc8ad9ddgnv7jrnrc9k',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 07:27:59',
                executionMonitoringStartAt: '2020-07-27 20:54:30',
                executionMonitoringEndAt: '2020-07-28 03:18:56',
                status: 'SUCCESSFUL',
                channelId: 'b9ac1ac4-324f-449c-8260-37cef826edbd',
                channelSapId: 'o9ixe26kdmfekgsx0gs1m2avpqrz0az5wa90newed8eizayu09',
                channelParty: 'whh1n0iwtlbvvi56rqvn8l2d9my0l6hykrj617wav50gru64puxr33d21qrjgm3lfe98tbhobj2hkquw3t9ioz9c4ez2cxpza6eeaipdrmpwoxn9hv0hjvop3qj8m2vx5e3r237ou5tdyhs011lj6nda5yzl9ee6',
                channelComponent: 'xusrzczhybn5t6160wpym4h9sdwh9wg6k0cjoiyodcu2ypk64smevsw2sona0lux3uni56es54nen55q9r2s9o4wtj0ruwq0ukfkredrtdrpp4dzpp2kbapvoddplsmffw8k7wsjcgmwvv92v1wt6klhz3ba1105',
                channelName: 'g1rtx6i34y8e2f8rl29omqnwv36oufj9ysvz86b7fzng9h79oirywq4tktag6o7i899knjz9g7532hdhbfq9lshfcrcblpm7x5zi3tyyxgk4a6vpu3ne6mym68d7zasjo0e0774f6k0t911tsmhkljdda4mxcvm7',
                detail: 'Nihil facilis vero error et quidem cupiditate et. Ratione sed repellat. Molestiae optio tempore.',
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
                id: '11e36733-928e-4ff3-99e2-523d69ae370f',
                tenantId: 'c8ec4d98-010d-4b1e-941d-a7a86c30a653',
                tenantCode: 'ipb6ghvu0hj033yyekawkltljyaxs0erzkvizhual5nmjzxlyd',
                systemId: '5dbbfb28-421f-4131-9f54-668dc4f9273d',
                systemName: '6rymuj9spin2msngrddh',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 20:14:34',
                executionMonitoringStartAt: '2020-07-28 06:15:07',
                executionMonitoringEndAt: '2020-07-27 13:43:46',
                status: 'UNREGISTERED',
                channelId: 'b9ac1ac4-324f-449c-8260-37cef826edbd',
                channelSapId: 'pnrar63rgju9vz02kxy4v1r3zknfwaf0wrapj0t86b3f1aqnw3',
                channelParty: '79tv68ma536pwo2q86ncmv12mohw4t8si3sy72zeznomt6b2gu9yy8iwxmcxy1md6uq45c98azb8dx41z1suelfv1w948luzgm9vn9aeoo2hwxaum1isot97ljyttpsvit53js0c6zqh9myx0rus6x2zzt1iysj1',
                channelComponent: 'dc1mfh09uxrwrvpf5yb60shvtoedy4wk0dwk3jgfgd303031ippw10zb609rtkvwq3e48igheiprigaqj4y33hk6w3wb26p3birnubuuhmx6fdhppif2ix1wov20n00ntgbeagw489ldeqd3u6q3gepz211flu9z',
                channelName: 'c6ui6toshpd2617qef8z40y2gwsemwefjjyd27yjm8nyowbnobu6d6rx7cp391510v58u0bxlrpv4sebx421w7pdtk1irw9cqwwmjy27s6rlrx7s31ya4c6py0eewdeq1ovk9x5r3c9y7xhozttdtn1wyz3j3uaj',
                detail: 'Neque repellendus quia recusandae animi quia assumenda praesentium doloremque. Officia architecto et odio ut quibusdam. Distinctio esse omnis. Corporis soluta ut illum cumque aut deserunt quo quaerat eos. Ipsam sit explicabo velit.',
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
                id: '11e36733-928e-4ff3-99e2-523d69ae370f',
                tenantId: 'c8ec4d98-010d-4b1e-941d-a7a86c30a653',
                tenantCode: '4q72x8m5j7aw2yzkamno08ig0erzqrdlufi8s08cy8y8miuuuc',
                systemId: '5dbbfb28-421f-4131-9f54-668dc4f9273d',
                systemName: 'lun01amm0f6ajidz551z',
                executionId: 'c30b8a03-f9ca-4346-944c-918dc83d6aef',
                executionType: null,
                executionExecutedAt: '2020-07-28 03:26:42',
                executionMonitoringStartAt: '2020-07-27 23:32:28',
                executionMonitoringEndAt: '2020-07-27 22:42:29',
                status: 'INACTIVE',
                channelId: 'b9ac1ac4-324f-449c-8260-37cef826edbd',
                channelSapId: '0iag72ppu41y5dkvyn6xrscfo3zlmthrg9kdkovny7ke35ioai',
                channelParty: 'a3286q4n2ux93oa7bsnjvxmf1a1ebbgfmj1kkvdvg05trwywp64qplnhivbax6iqom0r6whsh87h7dpr6fr3rzmqk6yeq9ycuop31kvd3beffergb9z6do11jj5wpw1vse8dlvvurmaer0t5hyvfxykrl7qlme5j',
                channelComponent: 'rr00bjf2tri4pwqf5x8ne9myisvep77kia0e0i48i19c3eh3sj5w52bltxcfd9flld5oytojtcft6b9da075ujf2yfyc0jzmd0pcjdrjf600fy2wygzi72uesekyzsyy4sfrq9i123zof2qeytc07iggl8lcckp6',
                channelName: 'rc0u60kue210mq5pkjd29kpdbtjhvy6v6hla3bcxi47un6j9bh95c5bfhxgvtx81a9b83snq7z16mztlp06fffxv0jz63l2cg5xkp5lx5jt9p483apvhy749kw4klc74ferc8as1ai51d8okwoypzjjyejya2r7r',
                detail: 'Cupiditate qui recusandae. Tempore id aut tenetur. Atque quia est ipsum possimus. Et aut perferendis sit minus et.',
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
                id: '11e36733-928e-4ff3-99e2-523d69ae370f',
                tenantId: 'c8ec4d98-010d-4b1e-941d-a7a86c30a653',
                tenantCode: 'gk62jf23hc3tk3pkoh9g6wgrixyqitjmd9ghm3xxoad27yuu78',
                systemId: '5dbbfb28-421f-4131-9f54-668dc4f9273d',
                systemName: 'wz88d0ffbj8iw10sahnv',
                executionId: 'c30b8a03-f9ca-4346-944c-918dc83d6aef',
                
                executionExecutedAt: '2020-07-27 20:05:51',
                executionMonitoringStartAt: '2020-07-27 23:31:11',
                executionMonitoringEndAt: '2020-07-27 19:53:04',
                status: 'SUCCESSFUL',
                channelId: 'b9ac1ac4-324f-449c-8260-37cef826edbd',
                channelSapId: '9nisj89635kk7a04r8hy68rmmx4irbiurq2v5fyo3no8bbvrlg',
                channelParty: 'v2ej4jnirepnuse2cf3lad0r8q9lmsrgjs1xetdivtc70r3sjc5ytg9lqjvevtprbaobxyyh0nq2mddwon0gyekm0a9zf75fgc8uxv8hsaqshto3i8oothzen21oy7pj1taexowisczwhh8xx8frebndagxnoq99',
                channelComponent: 'argk3yed7hhe2ia32bdahi9p0t1cvmr353js2a6k57euzygddb399z6rasenik4tzths31x3stex46zh8cqw1z9y8qs7fk7vjvc4tcrnfv42rl9ks47rz9fz8jy2otohav4p2d2gy00ig0dnkmt2ymqvernvuxfl',
                channelName: '5uxhhmin9k7udlwg62zwyih2qjlwisy07wvblp0z1lnuh788dszoj61mow9575iusctuuj4e0h7gr5xzudrfarvk7yyuzv51g6itu17kuinqiuhyixycyw1bcptantm576m1lzcnvatkkvynmn1iiw8gfeq92k5h',
                detail: 'Rerum tempora magnam est ut iusto mollitia numquam. Accusantium quibusdam itaque. At modi repellat possimus aspernatur quas vel labore. Corporis ad voluptate et blanditiis quis. Illo sunt molestiae nulla in error dolor molestias. Quas dolor autem et similique quo.',
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
                id: '11e36733-928e-4ff3-99e2-523d69ae370f',
                tenantId: 'c8ec4d98-010d-4b1e-941d-a7a86c30a653',
                tenantCode: 'bsgui7ay4wnsizzi2loucjknwaoita3fm23waeakhrw8e6xl3c',
                systemId: '5dbbfb28-421f-4131-9f54-668dc4f9273d',
                systemName: '99qa8yv492pkl0s92m2f',
                executionId: 'c30b8a03-f9ca-4346-944c-918dc83d6aef',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-28 09:55:01',
                executionMonitoringEndAt: '2020-07-28 06:25:30',
                status: 'ERROR',
                channelId: 'b9ac1ac4-324f-449c-8260-37cef826edbd',
                channelSapId: 'tdcz0ukg19fmsw1to5xp6jea9hw0y3z3xgy5iidy9h12lusc30',
                channelParty: 'xq61v7dauayj7f92ox7m2us6bgfbd18cl1rjmjnxb9asw3gaf88oufd8cxphw25qjayzbto6ob9w7rj14idgt44iv2trdrh3dpy40wnr6l2e1ubkb8rimrgob387rojkxcykbszgdgiq4fox96hw2uts5j1rfugd',
                channelComponent: '1y5ae6j6vzw6fwtd1s93yufmv470z6zyba63mn8kuk4clt9wina64aqt75qitshytbbaxthy4f4x7guihngqhyva3t74ac5ejt0zyf2663d6om2k6a4dezpcokftwxzpskshje2c5g1yikjj53cd2lxyt6nzs5ov',
                channelName: 'qlga3zbqdilgchm7mkcnep3u7pg8vddbwz2ma0hym7xhegazagb4p5zt78eyml8o9gouqdpfrpuban7xqj9wyf5hhokyr2jedm5inpnbl6gxnna1aruh3bpdkan2bmhr1quxadfxvvji28qk23y900zeqp144xwv',
                detail: 'Eligendi fugit et dicta sunt non. Eos beatae nesciunt accusamus. Sit quo esse omnis. Dignissimos facilis vel quis in voluptates. Rem ullam quibusdam aliquam accusamus dolorem veritatis est eius cumque.',
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
                id: '11e36733-928e-4ff3-99e2-523d69ae370f',
                tenantId: 'c8ec4d98-010d-4b1e-941d-a7a86c30a653',
                tenantCode: '50vxyplf1mvmiq4nspk1219e7n4l5s51codw6wvuthc18t4ql2',
                systemId: '5dbbfb28-421f-4131-9f54-668dc4f9273d',
                systemName: 'wjf8px0x2xi21gsa9f5f',
                executionId: 'c30b8a03-f9ca-4346-944c-918dc83d6aef',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-27 20:08:39',
                executionMonitoringEndAt: '2020-07-28 04:36:17',
                status: 'SUCCESSFUL',
                channelId: 'b9ac1ac4-324f-449c-8260-37cef826edbd',
                channelSapId: 'gdnhkmsr06ur8sujjiv1ll7fk9c80uhiqdm58o2sl8o18yer46',
                channelParty: 'oydrtl54ox03p4lo8mpeyc80qsekbl1vem4hyxbpced50ydym731sw0it028vutos06d1kpo4n17juaxyp1hb3x4z9as0j062cjam6txy7q69tod1snbdkwjrf9vuldxifyw9uiy08nv8k61eanvsq1qmh2qsfki',
                channelComponent: 'swh0ch251e2fei80srdkc3h3l9h4qtc12hpx6ukjut17irs2vbu0m94hmnx78i5uy8ammzmjve4prp0ieha6zwymlls5wqofsrux8rhnq6vm9v38ignddykmgyqryswvzwx3nv551qgsh5yiszserydcr88qgb2d',
                channelName: 'k33rpnhsm5fax6algy4k5jmq9d9xt95w1703wjmgimora5uclhfzjs1i35aj7n9flvzewl4wzkxdoekgz59gb7ca6lrynq2lq69gwzkttihk84ab0t6ele1ioi9o3gl1wahpm9oglveszbqi7uog10dnlwzewpv1',
                detail: 'Nostrum asperiores non quia eveniet explicabo id sint pariatur eos. Sapiente quis non in labore quidem omnis. Laudantium in aut sint voluptas magni impedit. Quam ipsum accusantium.',
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
                id: '11e36733-928e-4ff3-99e2-523d69ae370f',
                tenantId: 'c8ec4d98-010d-4b1e-941d-a7a86c30a653',
                tenantCode: 'o1umexgjeljwk9u58t7tnqj6bpdihqil4ga2wwfvpjfbfct0py',
                systemId: '5dbbfb28-421f-4131-9f54-668dc4f9273d',
                systemName: 'djxht59lh4nr6y1y2pr7',
                executionId: 'c30b8a03-f9ca-4346-944c-918dc83d6aef',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 15:05:32',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-28 05:42:44',
                status: 'INACTIVE',
                channelId: 'b9ac1ac4-324f-449c-8260-37cef826edbd',
                channelSapId: 'kdffwe7ae3iv2vs99wurvkxs0v9fw1e1pzr4blmvvyfxyhgcba',
                channelParty: 'jafqfy4n4tzkdxgp3tyuy29sbeiheyu2laz8nn9re9lzv0rghku51bq0k9wgnfgo766o8g9c92skpwxd1xe2armhta3rhi2q2zpeprbeohp93kdndj6iw4snk13hocory6ppaw3dfgvbjgpvtwevpsoks2rspfup',
                channelComponent: 'k2gv49w2op4u44ezhpidllvxd6kzr7bh672m6bfcf9ms8kqa7599tnoarsmybv8c5z8tarbymn5lxll4ruxhiaeanmbplqu5hnalouoz9vytt2ly1l3csjreqvml0ihmn85bub93x2wt0ty3tunls6lk2bnhe4tg',
                channelName: 'bwyqdftwtegjcexysczha29pg7bo7941t6vdpl2vv1k9whwz9yzk6s0ykb4jcg3xngb23qwnxqb1zxwc2td1y0jaxepscguo36hesywjvujl8t8r7b3wpmdv0si82yb4wwic185mo000ln4sns9b16ksy14m0pbl',
                detail: 'Nobis labore omnis. Aut cum rerum perferendis repellat. Enim nisi quisquam. Assumenda mollitia temporibus. Nostrum nihil molestias. Quisquam blanditiis qui eos quia dolores vel.',
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
                id: '11e36733-928e-4ff3-99e2-523d69ae370f',
                tenantId: 'c8ec4d98-010d-4b1e-941d-a7a86c30a653',
                tenantCode: '71y0y3gcbyd1msassuo4dlien1y1gal9rwfs56p29k7z06u1hb',
                systemId: '5dbbfb28-421f-4131-9f54-668dc4f9273d',
                systemName: 'x82fxd7kekqjdz1592zd',
                executionId: 'c30b8a03-f9ca-4346-944c-918dc83d6aef',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 19:08:29',
                
                executionMonitoringEndAt: '2020-07-27 20:44:35',
                status: 'UNREGISTERED',
                channelId: 'b9ac1ac4-324f-449c-8260-37cef826edbd',
                channelSapId: 'llmsquh98370ytb4rk8a9q13nrce2pmgffznuio53jijo88lym',
                channelParty: 'i8fhxpjhp73pi2oaqwm1f50szqj2l0xdv7dcs31l1k02pohbzid8dnwfa18ollhn0vs379quzt8mewyrhqk9vl3rrh3duic1ke1tdzxg3e52bw73omko7bh1l0i0d8s4c3vscjtg44jq198ma2jsk8y2szbthmlb',
                channelComponent: 'avegcsz9xhrp6xz14hgl80n3s01x9k2fojxj5ckc9n46qgkmp62wbdfseu58d086l0m8nxsh5ihqifa9m47h40r5p8yfmev8iyxeixpzgcnmm91cip7536g4135amy16n7ycr55d2gdfiya9ruvam070ktvujhrc',
                channelName: 'ivuxqhia6pbwtmjzryx5ps3szj3aju3c4q3gsnti2m9f2yroyskdb6vi8hd4yr42mj8aj9c9miniqsmtvqrcub7tpia9porgsslxgrccn146hf934ybp1olzzhjvnrn596lej5533p2fdo48dwdulliz52m584pg',
                detail: 'Distinctio id voluptatem. Explicabo et sunt id est eius quasi esse magnam id. Asperiores maiores placeat assumenda rerum minus ex. Non dolorem ad quisquam et autem vitae dolores et. Voluptate aut doloremque excepturi ut. Odit iste delectus iusto aut et qui.',
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
                id: '11e36733-928e-4ff3-99e2-523d69ae370f',
                tenantId: 'c8ec4d98-010d-4b1e-941d-a7a86c30a653',
                tenantCode: 'yuy27tyr3ga53du00z3n15cej67a4z6xq300pi6ltmxqznxrbj',
                systemId: '5dbbfb28-421f-4131-9f54-668dc4f9273d',
                systemName: 't37bmuy5ms32p7sbr90o',
                executionId: 'c30b8a03-f9ca-4346-944c-918dc83d6aef',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 12:17:23',
                executionMonitoringStartAt: '2020-07-27 19:57:24',
                executionMonitoringEndAt: null,
                status: 'ERROR',
                channelId: 'b9ac1ac4-324f-449c-8260-37cef826edbd',
                channelSapId: 'ba2ned3pkxd7zb38h8glbcg7xcrt7osgn0291oub7bt2et4mj1',
                channelParty: 'b17boblh5lquyr2xfr4u0l3sptq7nojsp59t0iwgtojfdfm4pjlfpjibjy32j33j37gbs1gilkyehcys5tslwnh3bkf5zb0mufxi4clwukyufw5rd4mabp5h47sl64hjkmwv8tr1x0uj5ti5to36yzhycmr68ndk',
                channelComponent: '7fixo7hipmnjhpe9dvekf51g5ow0wkvol23kgsb7qxrnkofoe2hfl6bkhu4yd39bfj5f8lpkiz03s7965mwl398pv1hody94c54p2ths1rfzla2xl6wway8t4ypguc55xapkyyzdqvoaasob4ppb07bbgpa0nufz',
                channelName: 'viiq02mhdo89gdkgu9tum5aofln933nns6t168gddy6raq3gt33jwrihvnhmuxm7xs3fpflasskwh6c38zw2yxjch7xws4qotdf26ssgwx8nay35mfataq7bu85lj181upk1fa8n17jtw5hyrdapep69560q2d9a',
                detail: 'Dolores explicabo ut voluptatem quis labore doloribus. Corporis aliquid distinctio suscipit quis provident consectetur eos necessitatibus. Sapiente deleniti ea rerum dolor tempore.',
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
                id: '11e36733-928e-4ff3-99e2-523d69ae370f',
                tenantId: 'c8ec4d98-010d-4b1e-941d-a7a86c30a653',
                tenantCode: 'ghwc1x5xp8fnluy8v8gsd0qxwi9hc04rg0xvjvntxbwq89mtd1',
                systemId: '5dbbfb28-421f-4131-9f54-668dc4f9273d',
                systemName: 'ggamaxlllzh7qm12ejgd',
                executionId: 'c30b8a03-f9ca-4346-944c-918dc83d6aef',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 18:02:17',
                executionMonitoringStartAt: '2020-07-27 18:45:41',
                
                status: 'ERROR',
                channelId: 'b9ac1ac4-324f-449c-8260-37cef826edbd',
                channelSapId: 'omuikbh904tsx917g2hbyo7m4rkw962l274ptl9wv1bazgo2hq',
                channelParty: 'wyirumqqowz12pwajuiq8zoc1tsvv530vq9xaod3hdl7iweyi83lb0xjd8leng2l2dgw6bhsotbwv1h4ue61q123shkqctj0pd1tcn1p2cah8giw3yenyzh2z73mbjqac7ymk9tfgnybgyipurkisnycc8au64qj',
                channelComponent: 'waa35b4fbisj824kk6i3sgbwvoydqbmd235x4h95ac6tt28bwh04wxr4bfcsal8fmq7r9hfdjcxs5raaquyr8rm7ife33dr9z1wsc1nfxdl3tm74malap1y9q1l5oc52qxu0jsz4ncbgb1deaxyeffkkx9s84vbj',
                channelName: 'umgcnux1n1v14b8xb4c96vewjdiqxp6vzferjn9f4ixn5rbzytqzl8cw2pyqn32fakpredh04z0zh7j42wqf1bqkvtat3qd6xpo3orjwm531kc10bhomd9sunn8gbotmdj4dh9q5maghynaqjeetejwi4ihkp8ba',
                detail: 'Praesentium placeat quia praesentium dolorum aut molestiae architecto. Dignissimos sit beatae corporis laudantium non. Officiis eveniet dolorum ut porro itaque enim. Quisquam illo animi aperiam ratione iure eligendi numquam. Ullam voluptas debitis inventore maxime maxime aliquam.',
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
                id: '11e36733-928e-4ff3-99e2-523d69ae370f',
                tenantId: 'c8ec4d98-010d-4b1e-941d-a7a86c30a653',
                tenantCode: 'x7mfscxigiiy4olzy1pk7pf13dw7j72vaitl5du0bcbd95orco',
                systemId: '5dbbfb28-421f-4131-9f54-668dc4f9273d',
                systemName: 'ovxxi1jevgzyncmm8q0t',
                executionId: 'c30b8a03-f9ca-4346-944c-918dc83d6aef',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 04:59:25',
                executionMonitoringStartAt: '2020-07-27 17:47:59',
                executionMonitoringEndAt: '2020-07-27 23:52:11',
                status: null,
                channelId: 'b9ac1ac4-324f-449c-8260-37cef826edbd',
                channelSapId: 'cvcw9k9dzqucoyke5xchvg3c5ikie7tem1zwg1ldv314uoercx',
                channelParty: '0yq3yddsxclx4dopi87qo560dujdlf53zmnjn1eh4fiqxgmpqdugvlbj9k7wf9ynaw8rfecnhdvqt4408msdj03tskiam6gksgj3rigvcmhw4l67yrg5kf5rt0k8i5wb1zjsaf7pw3ocs8vsp9pce8ksebixg1t5',
                channelComponent: 'cqvjviqwotxh6arx7wevppi7bhxjk321yuaymxnbemc3dbb0nzfgi5arcszjl7df81lg0o0o6cpeuxn2fc5kpc4c76b9acvcs6jacbjz1mtogio7uxh83t5pumoy7rtgr6crs8k92ew2brvwk3mvqs9rw9sfmram',
                channelName: 'w1vbyjtqhzj7edbd4zpqnar37dzif6rnzqgt44dh0xmwvs683i67sidqn4lx5nq1khj99ladjyxgjbswf2um12euj558w7vway0jyk4yafx0xwg5wpkzyhhmivg6u6560emzntjkapka2ockq7bllj24ltdeg4vw',
                detail: 'Velit sunt quia impedit non sint. Qui nihil illum quasi magni laboriosam magnam qui odit. Exercitationem ab praesentium dolor ipsa esse tenetur et tempora. Reiciendis tempora ab qui repellendus sed. Ad sed iusto voluptatibus fugiat aliquam distinctio minima consequatur.',
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
                id: '11e36733-928e-4ff3-99e2-523d69ae370f',
                tenantId: 'c8ec4d98-010d-4b1e-941d-a7a86c30a653',
                tenantCode: '6ec0k25hfnxb4e0824rksbm7mo50zr0yjpnhwxcyzxw59npndj',
                systemId: '5dbbfb28-421f-4131-9f54-668dc4f9273d',
                systemName: 'y11gdm1aoqm0tsaudysp',
                executionId: 'c30b8a03-f9ca-4346-944c-918dc83d6aef',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 23:04:03',
                executionMonitoringStartAt: '2020-07-27 21:14:44',
                executionMonitoringEndAt: '2020-07-27 20:16:33',
                
                channelId: 'b9ac1ac4-324f-449c-8260-37cef826edbd',
                channelSapId: 'ogwom8xsaie4i6ng0yqv1hdli23iu2il0q2hkgt429x8m4y6vs',
                channelParty: 'i2nwk6tsz8arnc076bs0lo7bgptp4dc6m9tpyzl6fc079bpznoue496szgvyaffla5oi9piplj9wecycxu9llqpq6ewhhaf3ag1txji9fm13tw0c81p2n9pwx5ua2erfew3hxnttdviwg24yg07prghdntu5rb76',
                channelComponent: 'w90gl9smf2upugtd3ya8hpn2f69hew3tes5khqlegjhdble4d06qjm2svdn9u4i4n6zvhchezmupn50a2lhi6ipu5cylm4eom0w87xayiq7oygw97yiqrg5ok8enui6kcm5syqlwuvh99d6t6xrzvoqllnmmc4v7',
                channelName: '7k9vlgket3bovqidtfr7g76oio2jlbuhvdncp5l7w80tvaoc2dfi02bd4k6vbnesfa4vg7ri0ndaw9jw1u19hu2wfqih1tjcgnqlhyx8p6q3wi9er93vq9oifdxkqjwn24zhmb5wazhje4d81s1gbzau2bb6p0yk',
                detail: 'Labore repellat iure impedit voluptas expedita. Aut illo enim occaecati voluptate et vero. Placeat eos tempore et.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailStatus must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelSapId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '11e36733-928e-4ff3-99e2-523d69ae370f',
                tenantId: 'c8ec4d98-010d-4b1e-941d-a7a86c30a653',
                tenantCode: 'a1h7rwqy83vioo2sue0cgapw7eua3x27quosht65yncv3023o6',
                systemId: '5dbbfb28-421f-4131-9f54-668dc4f9273d',
                systemName: 'y6c8rollrazm3rhyb29a',
                executionId: 'c30b8a03-f9ca-4346-944c-918dc83d6aef',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 14:17:58',
                executionMonitoringStartAt: '2020-07-28 07:53:16',
                executionMonitoringEndAt: '2020-07-28 03:44:01',
                status: 'UNKNOWN',
                channelId: 'b9ac1ac4-324f-449c-8260-37cef826edbd',
                channelSapId: null,
                channelParty: 'kcduoxk3i1xcqufjlveuyh6vhlc33chpwox14kl0w64xlk8uj17ecz155t3djuh6xjdtjbtfiqgyg5zwclxxgp1de6ufc503bzl3mi0te9yykevpzf353ib1x0xlj3febmps70qoiayi83hxq3jwcglubwf4ak1r',
                channelComponent: '2nkjozcxw12l5u6rhc1zb5jrnp0ki2hy5wvj4wqhrbe3zxjgpajwq1crajzvwq2mioc7epahigwzzj866ey6m96bdi8j7bz9lpggsiqkitsvp6tg7ytch26t8phfcm5m063scnnw6qo5hj8a3y830qxszmh6f15l',
                channelName: 'tjyeqwmo3b8wzpyw209zinho5cb9er8aqd40zbjjme2vn39so6txvytf4ybpmj3bst853ui3r2yo51ngksvvxa6habnvipsrls4pfs4i0lrnwzws6f6av0jsvrywel14w41azgnm3i8ekfqtez4ealwyetkmyaa4',
                detail: 'Id pariatur laborum debitis omnis qui neque. Quisquam dolorem non nulla modi illo quam et. Fugiat cum saepe molestiae unde inventore.',
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
                id: '11e36733-928e-4ff3-99e2-523d69ae370f',
                tenantId: 'c8ec4d98-010d-4b1e-941d-a7a86c30a653',
                tenantCode: 'v97prlh5q9jhyg557k26l7b2mo9b3ruovt57pvheiks3hq1hq9',
                systemId: '5dbbfb28-421f-4131-9f54-668dc4f9273d',
                systemName: 'hjx7kse9uo3kv95la1om',
                executionId: 'c30b8a03-f9ca-4346-944c-918dc83d6aef',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 01:32:07',
                executionMonitoringStartAt: '2020-07-28 01:56:32',
                executionMonitoringEndAt: '2020-07-27 19:38:43',
                status: 'INACTIVE',
                channelId: 'b9ac1ac4-324f-449c-8260-37cef826edbd',
                
                channelParty: 'pv9dh92f9aq4ha1v66m856fjdio4dp7v0kzndedj3vr7yx798abx9ilitvi1j5hkhpkiqhwnkza6hnh0mrz7wvlhlyvou79oy8vmriap9xjaerwgta7ctk6v45g8oonc5fr5a3kecjlro1z9gaow3uz4vktj5539',
                channelComponent: 'ycf9chk3z994631g8tza3ymeuiadb8l9tj81bxwf3fnhb2xbuobn4ovfy9oyp8f2u9nkp7lbjb471ttqonzl51shmg473nbnr56g3g887ir766ty1d8nfhvtzy0xbm1a3d8h7piescmxrpk5v8xbom6gbabgj5qe',
                channelName: 'j3al4e8gezwqu7rlsa1i6vsrvtfykrvxtf5iseszqglj6qf6klfnt35wwu1zlhwjqc99ywt7d4ldpv3h7mngygufbqq9n9ewb5hcli2c3zn2btvck8m3o6nvqp8gr0ak9k5tpvv9bt3erg20zjalfradorggq59h',
                detail: 'Rerum et ipsum quas occaecati corrupti. Rerum aspernatur ut molestiae aliquam nemo autem similique illo. Aut commodi molestias quos illo iure nihil animi.',
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
                id: '11e36733-928e-4ff3-99e2-523d69ae370f',
                tenantId: 'c8ec4d98-010d-4b1e-941d-a7a86c30a653',
                tenantCode: 'tn2lr81t2tlc1qtv5pwacisiis3gxru6hjfe1k21ur2mcn1p5e',
                systemId: '5dbbfb28-421f-4131-9f54-668dc4f9273d',
                systemName: 'f6b8fk7ifzwczp7lhdvq',
                executionId: 'c30b8a03-f9ca-4346-944c-918dc83d6aef',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 14:52:29',
                executionMonitoringStartAt: '2020-07-27 14:25:53',
                executionMonitoringEndAt: '2020-07-27 16:02:46',
                status: 'STOPPED',
                channelId: 'b9ac1ac4-324f-449c-8260-37cef826edbd',
                channelSapId: 'de8r923htlzq98sz9o00gud0e7t620qepryhtwaqmf5fcvzzzy',
                channelParty: 'v2kzqhcwj3u8jenqo2ux5fi44r0kfvxbn46e75mk9x9mxoc55xjiihba1fgqrk913durkoeit4dt8yysob6tj8uarkkjfv0axert6alseegofirrudk4wsh3oey93k48lanwjnoag60soacrm8cyywobgqm6s22k',
                channelComponent: null,
                channelName: 'ida1vagjho8xadkq8iexfm6sktvvyzamsqit9j70w13cgu8fpd51ymrhq9218t2skhld075b5zg6nvxtef281shdmhqxeysj1i10yb8alz2hw09o6zsc4fh9i2xeod96fq0770eokwpdr3qev2cmb5eoii1a1ezw',
                detail: 'Tempore tempora aspernatur velit sunt assumenda facilis ut consequuntur architecto. Ab nemo voluptas natus eligendi tempore odit laudantium. Aliquam ipsum vel maxime nemo. Ipsam at quia soluta id voluptatem qui ut ea. Qui voluptatem et nostrum perferendis error. Enim eius qui vero.',
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
                id: '11e36733-928e-4ff3-99e2-523d69ae370f',
                tenantId: 'c8ec4d98-010d-4b1e-941d-a7a86c30a653',
                tenantCode: 'ytx98lc8nvawhd9b315xqa35vdtpu3ghv367mvio7i8vnhni5u',
                systemId: '5dbbfb28-421f-4131-9f54-668dc4f9273d',
                systemName: 'ojgnmvpzmibw37jezwax',
                executionId: 'c30b8a03-f9ca-4346-944c-918dc83d6aef',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 00:58:10',
                executionMonitoringStartAt: '2020-07-27 13:23:06',
                executionMonitoringEndAt: '2020-07-28 08:39:52',
                status: 'SUCCESSFUL',
                channelId: 'b9ac1ac4-324f-449c-8260-37cef826edbd',
                channelSapId: '6y90rtyrgp6idne6kav80tdlw2nq204w3hy3df4xbcwm3svp02',
                channelParty: 'o8r20fa39qtfb8sx0kfrwsfpb4zjql2l569en8honzxwzokbqvo3yx9e809m34nepc50usgh2121bxklo4es5xz8vnmw8avzmlabu75swo8mslfmhenjg506matzrdnryjul6yykdet5hq497vix4ghebllz89wq',
                
                channelName: 'hcynikhhuiuwwvutkdxuffm2hckxkt0f3kos3kmzdhefnqu23l3bjczv1aa28a9d3st8vq02tfzit0y5ojqcaylsr326ur9mx8bg2vonrv7hsaoqd8t4nwrrdfyks0p1x7q4lab3had6rpqq2tjwz1mmgipimk2u',
                detail: 'Molestiae dolor recusandae dolorum eveniet commodi sint omnis. Qui unde facilis omnis rerum rerum dolorem. Possimus perferendis dicta ratione facilis modi earum tempora nesciunt. Distinctio quis id porro. Exercitationem commodi iusto nemo praesentium.',
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
                id: '11e36733-928e-4ff3-99e2-523d69ae370f',
                tenantId: 'c8ec4d98-010d-4b1e-941d-a7a86c30a653',
                tenantCode: 'mzvel43fsbdwg0bvrdgj2rietpy3i0g4ncnvrlbb4bypujkxuz',
                systemId: '5dbbfb28-421f-4131-9f54-668dc4f9273d',
                systemName: 'hv8f1tcdy9golvjc1sbb',
                executionId: 'c30b8a03-f9ca-4346-944c-918dc83d6aef',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 11:05:24',
                executionMonitoringStartAt: '2020-07-27 11:47:18',
                executionMonitoringEndAt: '2020-07-28 11:11:03',
                status: 'ERROR',
                channelId: 'b9ac1ac4-324f-449c-8260-37cef826edbd',
                channelSapId: 'ndvyj39wb6nb6471u68jhkxhsfe2oxc1xrryv3j2vxjil23txu',
                channelParty: 'khi1sx2rdpsxak2natfk5ewa1pgz627bwsfj6ogfhhbtvytt8m12d00gzego3ew3n1zurpdq4ugxais4woh0vmqyhj11tvvx4ktcvnr9hhocs550t5fk4kd276jb21smslb4c74qozp5depj0n2sn9utztrzq0th',
                channelComponent: 'ipyjk92lc17ted5rjpz7gyee0sg4627ocmwl62p8jv5rttl11swvxdhalwm45cehudllb0rok5zr8gfjhyg1feso4ul8ojjwtylz7hastvshri22h8rhl25h1lltnbt516e7kcm8m3vy2angvvmd3v0pq4kjpaey',
                channelName: null,
                detail: 'Occaecati nihil deserunt vel rerum consequuntur facere amet unde. Temporibus molestiae quod et et voluptatem. Dolorem quidem sint autem. Est et quod libero recusandae impedit ea.',
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
                id: '11e36733-928e-4ff3-99e2-523d69ae370f',
                tenantId: 'c8ec4d98-010d-4b1e-941d-a7a86c30a653',
                tenantCode: 'w5fm3esjrh2xzq40bw1quu94a3yw4x1nw0q1212ea14jcjbdzd',
                systemId: '5dbbfb28-421f-4131-9f54-668dc4f9273d',
                systemName: 'a4vkirvvwi0vhsztwm9w',
                executionId: 'c30b8a03-f9ca-4346-944c-918dc83d6aef',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 12:40:35',
                executionMonitoringStartAt: '2020-07-27 13:03:06',
                executionMonitoringEndAt: '2020-07-27 19:23:38',
                status: 'ERROR',
                channelId: 'b9ac1ac4-324f-449c-8260-37cef826edbd',
                channelSapId: 'erzlprau9sk9aikrd311yqt0a1fq3z3052c6vvu08dlehdmbet',
                channelParty: 'wxk7e40658pugdlepl1oo5utmdm3hbg919ae33o14fn2x79mjqijf8yptflimff5oy2nmccxr0a9um07wqlnljc9eihk15geguhku4wabv6ki2u2rkxvg9sbosvbi7svih92ihzjbdepips82cyaod53twauvcnw',
                channelComponent: '94tn1e3co4pui9lbbr4ono7cn6ja97x2gz1bmgikrngphd1kdusx4lpmezwyfubtd6sje5zztgy0eu9enk7m7em13op21h0po6u23v9oepsl5l24l179qf9cggj8xjb3tqrjf3gcui9evsq2tn2ut1for9hjsmrt',
                
                detail: 'Nobis voluptas asperiores dolores est vitae aut in in. Molestias et ut ea mollitia inventore quia quos similique non. Qui consequatur voluptatem voluptas esse.',
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
                id: 'ymrv4p2nt743a117c2jwunxi8r8z72eisycut',
                tenantId: 'c8ec4d98-010d-4b1e-941d-a7a86c30a653',
                tenantCode: 'jrbs0jjtzcelj44k81jqwmjx6pmf2fm4hvlmohlg4ka8bsf7nn',
                systemId: '5dbbfb28-421f-4131-9f54-668dc4f9273d',
                systemName: '1ia1z0zf22oakxp0q1tj',
                executionId: 'c30b8a03-f9ca-4346-944c-918dc83d6aef',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 22:37:37',
                executionMonitoringStartAt: '2020-07-28 10:11:43',
                executionMonitoringEndAt: '2020-07-27 21:09:21',
                status: 'UNKNOWN',
                channelId: 'b9ac1ac4-324f-449c-8260-37cef826edbd',
                channelSapId: 'td9c0zlvg2j1otkq0udk4w4vhtrkbwuu18amhb0wrukk1st4ea',
                channelParty: 'jw0eo2vgv73fslhke33zjd3ghh00s55wucneicp1xhkp9xwydv7xuazknnzr8tav3wprsz8quqn1s0xldxxil3drweg6dtnu03nxddbd7j63mx9qacptspqiva4lh29gb4fn0o6leb80l0n72pka5n4zh86t3ncw',
                channelComponent: '4hbyiggabev3s7arbiv4834hzmj2zqcdqzzr7tebl6n4r9gieapr0w3dloq9illx3pif7htndgmd39oxk4ti36va5zvi0pc0t40dooy3tc3dajcxldwfwymcnm94ehaolyrjeja0mhfmbjdzxgvrvuilz9h94jq4',
                channelName: 'ya0s48bdrydhxrwk84a2ixjfmkrck0swpfcgqxrdcugzr1f5wn0as28wmgyjkbupkx6qe8uw9tbsvn5cylsyiuor26nbuizjlwvma07ty5ap92l35crp991n7o8bbgkqvfwqmozklq4z5jzn2hbvct0tt9m7u9hf',
                detail: 'Suscipit aut qui animi sed sed est quaerat in saepe. Qui id recusandae aut et qui perspiciatis. Natus numquam dolores. Est non cupiditate voluptate aliquam. Tenetur porro sit repudiandae qui.',
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
                id: '11e36733-928e-4ff3-99e2-523d69ae370f',
                tenantId: 'hg0xtp7vrtf1489enye285k9n2xm652ax84r9',
                tenantCode: 'g89tjeotrr7ukrsq76uhaqxj7gsp7ftl2krh7smcb205lud3j4',
                systemId: '5dbbfb28-421f-4131-9f54-668dc4f9273d',
                systemName: 'wwilpygl3qie572k3ajc',
                executionId: 'c30b8a03-f9ca-4346-944c-918dc83d6aef',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 05:26:48',
                executionMonitoringStartAt: '2020-07-27 23:28:36',
                executionMonitoringEndAt: '2020-07-27 22:28:55',
                status: 'UNKNOWN',
                channelId: 'b9ac1ac4-324f-449c-8260-37cef826edbd',
                channelSapId: '1c45i3mxnythc217y65jcnbr4iftattce894pyon874l2wwwgr',
                channelParty: 'rg86jugu2t8c88u58t3m496rx5t29bh1bvxohwn97y8n6o93zfrytnh2ojg1bim42d9iy9dmyvzbe39zdxalxr2jatlci86r8qdv5ji4izpk1m0fdsrtg331l0r5gpwj4rwswaecm4yhqddtts05q4v1mger1jbj',
                channelComponent: 'ih9mhgk3fyjit5t4dx94yjteepuleij2yrdrnsmnuc8knm72stpb65qbvvynyy6scs218o7a09l7kk48xevh281cuuq1fpikegyx39tw32dmktbwsr1wlcx0jbl9va8xcm2fl0e9xqi4s867myjq3m9fhy58jr12',
                channelName: '8qrpjrxihdau23qqdyueaahwj98181ehoco6hjzrr227atybvzwxgqigqo0vuiwf7051manwztiu0rvxp5cfo8y3mrkgho9j80rorznloqv3041on5y0xio3qhtaif2k8d31huhxw20cci4665y3v2pbw9w6vzsi',
                detail: 'Laborum ad expedita. Suscipit cupiditate ullam quis eum consequuntur explicabo at deserunt. Sapiente libero sint fugiat reiciendis neque assumenda.',
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
                id: '11e36733-928e-4ff3-99e2-523d69ae370f',
                tenantId: 'c8ec4d98-010d-4b1e-941d-a7a86c30a653',
                tenantCode: 'zdfsma5kkjwgkg4x4fybxpn9m1j3fw4sei3qryzppay6qdrc3d',
                systemId: '3lfypaf48ow4p2fcaf37dmv209vwq25a07bfi',
                systemName: 'bwqfy1jzs989jvvycz0t',
                executionId: 'c30b8a03-f9ca-4346-944c-918dc83d6aef',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 01:29:05',
                executionMonitoringStartAt: '2020-07-27 21:28:58',
                executionMonitoringEndAt: '2020-07-28 04:39:24',
                status: 'SUCCESSFUL',
                channelId: 'b9ac1ac4-324f-449c-8260-37cef826edbd',
                channelSapId: 'q6lwraz31xtixccg5ily5z6v01inir1jmxinxrpaminttvt5lr',
                channelParty: '5fgk7zcmyl7s2ocwkxomnjz27crrom55xtvq1t4d8oekh4jv0jgxczm3ju201pg7euffk4bcy0pyl9jdne0585ajcakzcyuox74gdk35ll78imku7zb5b4k7q5ghndnvxh8u96wo1o3ncre9ovq8fk8mjpfdzny1',
                channelComponent: '5r876nyr5bckn76d0mim9av6vi23xvp7f6egq28bo8lv7x73q0mu8v9gx07qgm19w0tuqaijwwtjsd8xhxc1pxvsne8359il9vpc00x1rz3crcbeja5j8ps59wi9fktvesnz4362db12pe8wz4x1hm59lxva611x',
                channelName: '0qdkdafjo1vyoph02fcp3uxm7fkkaamtozkgecsww4iav5iuftu9qfr54a142vpbcnk8v6r10yq1ve1mvi8z3x9s2nqh28o0l0sb4e196o0316oarh0oh777dm596l1ol3scse7xx7ktm0k8e2admif4e2lbk24c',
                detail: 'Optio ut qui beatae et accusamus qui. Sunt voluptatum velit veritatis alias sint quam error. Dicta adipisci libero laborum nam sunt dignissimos fugit consequatur necessitatibus.',
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
                id: '11e36733-928e-4ff3-99e2-523d69ae370f',
                tenantId: 'c8ec4d98-010d-4b1e-941d-a7a86c30a653',
                tenantCode: 'tkcf5ppuzfnfvolmy6jzlu6wxonig2pe0o7tjpn21d3pcyjw83',
                systemId: '5dbbfb28-421f-4131-9f54-668dc4f9273d',
                systemName: '6e7co8ix60ltv5d5lu5c',
                executionId: 'qmurbcax5n6c3e56ekuszpm2ho5h2c5yhjr13',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 14:50:58',
                executionMonitoringStartAt: '2020-07-28 00:26:32',
                executionMonitoringEndAt: '2020-07-28 01:42:30',
                status: 'UNKNOWN',
                channelId: 'b9ac1ac4-324f-449c-8260-37cef826edbd',
                channelSapId: 'b85qqep6n78qjxtbzd1xtdr68d9oyb8j63cdftfxio2nm45uxe',
                channelParty: '4k6yaynbtc276ow9rpmhhyma0xns6lonfhmjlcuz8mj2akd5abfp9cowgb51vlf5uwz29ct7depiyljl1wezjza2bkz4818c9n2gic7ikjppp1xmm36ul23ra8sgj7yfkp6b57roep7eq4mqzho3wz8k826yzenh',
                channelComponent: 'k3vbq18qsqcakp09xo19tod5r9kd5glc4ckwu1cmbo2zhquju5569a4ixcnscebm9s0fjd62abf4nlsh6fik1fzw8vvcb3vlyr6qe8zric0xihqc2wxcl9m1vhu50o6x5q6l6ozqzj1omcztgysvcv5887jfdszd',
                channelName: 'zf4n6y22ojorl8kz7rp74orod9gf09pwmi2ftr195e5qgh4dvljoy48unx757167gmn7pxbm7fz03qjixcagkz8o3mj1x1qqvnfmyaqucpnilnn7g22t62jqf5dh8n4q8sne8dts8g4jj1ef23xkud5zbpxl0974',
                detail: 'Dolorem laboriosam suscipit ut sit ab. Odit veritatis fugiat unde esse facilis voluptatibus. Facere consequatur quia autem deserunt facilis et eius. Minima officia libero hic. Ut eum reprehenderit qui perferendis.',
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
                id: '11e36733-928e-4ff3-99e2-523d69ae370f',
                tenantId: 'c8ec4d98-010d-4b1e-941d-a7a86c30a653',
                tenantCode: 'qr6sdkm0bd8lfqpzdx8k1smwo9ahj19oj0pxyn9aoxn65muck7',
                systemId: '5dbbfb28-421f-4131-9f54-668dc4f9273d',
                systemName: 'jqxa98uz68dk3ytqpvuh',
                executionId: 'c30b8a03-f9ca-4346-944c-918dc83d6aef',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 10:22:16',
                executionMonitoringStartAt: '2020-07-27 16:01:20',
                executionMonitoringEndAt: '2020-07-28 08:16:06',
                status: 'INACTIVE',
                channelId: '22zpfofx3hz13y1i0mr3eiqynu64sbt09foba',
                channelSapId: 'hf844brcvkyeo1y0ztwztfxhwjcr4hl0wcpuvtge3szllqknai',
                channelParty: 'c6gs10sx6hvgxnb3v90yvetl73f79bxc1nw69uhj7y4o6m7nhgusu17a2tyzdmctt650acj769l84ms73uujid9qb99t96p5t63txdwbr2t7leg6yhumjoee93cuoi6vsabot72xxvtf1fpvq11jvar12vvuxorp',
                channelComponent: '88xog46nj539d7vdigvjoxtf05i75okisvn1i90pm1z4yxxz3xpfvfdagiec2pywgixp8iu3qpm16ojgtbhrsirltzhdstpk8wmzcht5zbfh45gn4q7ouynmia9ezzdo4qjooojy4ur4o2xzg72paonxhpie6zgn',
                channelName: 'lfzwn0dw6l3m99ih9ztqkshiw6jxatzzkpvkvw8m6ueiywzb50bo9gmxk9ornc4iacjm3j4xnyb5hgxug4b31oqxi0i5hpndm8f5vaybyevtca77gp6o1knxkcx5hcf1slr65f9w6ae391r266nkkbsiaac051cx',
                detail: 'Ut quibusdam rerum nemo magnam. Corporis et assumenda distinctio. Ut est eum repellendus odit.',
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
                id: '11e36733-928e-4ff3-99e2-523d69ae370f',
                tenantId: 'c8ec4d98-010d-4b1e-941d-a7a86c30a653',
                tenantCode: 'qhhj2cwf8eq6h180lx6todlf6313e9jjdu2kqqsm0nfqy21k65l',
                systemId: '5dbbfb28-421f-4131-9f54-668dc4f9273d',
                systemName: '1zilol2xsfq4lb4tuzn9',
                executionId: 'c30b8a03-f9ca-4346-944c-918dc83d6aef',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 08:50:02',
                executionMonitoringStartAt: '2020-07-27 23:50:28',
                executionMonitoringEndAt: '2020-07-28 09:51:20',
                status: 'SUCCESSFUL',
                channelId: 'b9ac1ac4-324f-449c-8260-37cef826edbd',
                channelSapId: 'gilalkwccabjpy2wk9pj9n6762bwsbg85rf3xivf7uow5x80pt',
                channelParty: 'jorv3fss3xeqz2pl3mf0za8nd0ueh0m3qjcw2arrbjlm1moichntrhi9qeg3jpymnktbqt1crzrg52s9oedz80ystn5i6qgwgt4ivicei5m745tic1suv6143yt71dxtjxmzp1y61drm3qsdm14ovp5we0u9wgqs',
                channelComponent: 'j8gdwwiqeotxnj8gfasif5c0x8alh0gxnd2h2115bv7nj83clpqrv7ay7jqwf34cq3fipj061psmghlw7rc6zp4xz2887ff7aektpoxo6jjy2jhe50sc0qu1l44dnrusulem8dghgncdvvi6vi86ub08xy0kptgq',
                channelName: 'iwdjg3f2h92hcxn6y1qjht4w6wp1gx3gfkf69tdsnh7kv0nhbpjuj1bb06pddwy55cjeijdaffn3iruqi5oe1q9h8bpdvpvntic4eicjb0uwb4k0l54or9bwrcls6gnx3ib7fyoojblwayacz57xalrogtbpi8tf',
                detail: 'Et eaque minus suscipit asperiores. In aut adipisci sit fugit et exercitationem eveniet. Est id iste cumque. Illum et perspiciatis qui. Repudiandae qui quia consequatur libero accusamus beatae in. Quis aspernatur earum illum est.',
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
                id: '11e36733-928e-4ff3-99e2-523d69ae370f',
                tenantId: 'c8ec4d98-010d-4b1e-941d-a7a86c30a653',
                tenantCode: 'uyrcne5fc76l8s195kpqhavejvw5wyr67cuhrajw4rxqpnszdn',
                systemId: '5dbbfb28-421f-4131-9f54-668dc4f9273d',
                systemName: 'sylr3eceu855a602onwhe',
                executionId: 'c30b8a03-f9ca-4346-944c-918dc83d6aef',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 02:38:41',
                executionMonitoringStartAt: '2020-07-27 21:09:19',
                executionMonitoringEndAt: '2020-07-28 03:06:24',
                status: 'INACTIVE',
                channelId: 'b9ac1ac4-324f-449c-8260-37cef826edbd',
                channelSapId: 'w1e6p9onlenqv5tvpyxyyi8k6c6uzakakb5pf8zvqza19ev5i1',
                channelParty: 'fcfu45qiex37u4re0718t635jun3dv8ypyy1vgziplz3x0ajk0p5jiukd28jd8i9fmyb4zxpri9p6g96zdebduji68etve5l3m6lfkpm8z24076gru6qx2kscxx9hm6zo1y8wjoh6uwb8ff60iv1ltytej4b2euc',
                channelComponent: '7gfde6v0bh7o919jaqoekxq89wlet570x83obtiic50hmk1jtynj1ojea4rckld014xmsoi0tiwmp6ufnvrvtppx4b2jwrzjm8zfyaaygiezsf96kdlgk14zh2ceyxf51dpbc9ki0f6fd19abajco9fcar2bsep4',
                channelName: 'o3kz16g9gawvzg0duidfgk2bjagohcrvdz258dexxedz0wwoawcvfpixbjipyxiu8d5f2wytbkzx3intiqr840yibnfkw31bd1qzqxmxgusvo4xx00ni6vjf5o0jq7etpxqcyoivt416josihfollb4snpysxnzi',
                detail: 'Illo aut omnis nesciunt aliquam velit ad illum dolores quam. Et ducimus sapiente et. Fugiat ut enim corrupti in dignissimos iure eaque qui. Ut officia mollitia omnis animi.',
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
                id: '11e36733-928e-4ff3-99e2-523d69ae370f',
                tenantId: 'c8ec4d98-010d-4b1e-941d-a7a86c30a653',
                tenantCode: 'bxa1wl3axtrip5fc00ekm4onu8shwwfunihqwnkqlqkg4md0ht',
                systemId: '5dbbfb28-421f-4131-9f54-668dc4f9273d',
                systemName: 'ker74w7jljc5fqij0tse',
                executionId: 'c30b8a03-f9ca-4346-944c-918dc83d6aef',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 04:02:23',
                executionMonitoringStartAt: '2020-07-28 01:56:12',
                executionMonitoringEndAt: '2020-07-27 21:19:40',
                status: 'ERROR',
                channelId: 'b9ac1ac4-324f-449c-8260-37cef826edbd',
                channelSapId: 'akz5br0v24mw3rla0idtfyiks6p3o9jp6efgwwp3c4q7sr4de9l',
                channelParty: 'a1mgl8wjfsy9hcvdz6j9tsmh79nggze56ilrq6yesbj6s5c1pv31k9w35fitsnprvrign077kfopuc6kgf1untixaan31s1z0fzwwpzrl43e1iz8ra9hq6h3i1lbmfh565lswy1nqp3gfj9upjbn83k6noifkk7k',
                channelComponent: 'e2qm4uu8eemusapgund8dg0t1ksoah4huvmkzh1kmontm610e7qsr446lnzk6ucurqsklbj4fcd4o9s5naqngrlofvtohnjumcf3qqaucbnz9iithb57a9x8gz8hbn6aoid9a3mtvgajb66pt126dj1gri7xn68y',
                channelName: 'imlotr3wgehsr1p2swbw1vdibiubc1yz7dw1mfngmhd7gl8gd9nsxuqd2i8d2e1rgrfefz99eoqyb3ut4sf112kt9mcfqx9nly3sb74yvsq3ygbnrxf1as28nus4q678yfeoyr8gvvvefd2k9ccin3833ne2b5pq',
                detail: 'Qui id deleniti reprehenderit dolore in inventore excepturi ut necessitatibus. Adipisci aut nemo id quasi excepturi. Blanditiis ab recusandae voluptatem. Sit aut ut et tempore odit assumenda reprehenderit magni reiciendis. Sit repellendus perferendis qui tempora deleniti illum qui.',
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
                id: '11e36733-928e-4ff3-99e2-523d69ae370f',
                tenantId: 'c8ec4d98-010d-4b1e-941d-a7a86c30a653',
                tenantCode: '0ibntnytkrq030z9msddv1j5n6zgoji4cgjjvj1u6wwabn9hvx',
                systemId: '5dbbfb28-421f-4131-9f54-668dc4f9273d',
                systemName: 'wj1vyqhnxu27p09zrurt',
                executionId: 'c30b8a03-f9ca-4346-944c-918dc83d6aef',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 13:46:05',
                executionMonitoringStartAt: '2020-07-27 13:17:41',
                executionMonitoringEndAt: '2020-07-27 11:42:27',
                status: 'STOPPED',
                channelId: 'b9ac1ac4-324f-449c-8260-37cef826edbd',
                channelSapId: '43dor4jj3ejszt7k4gl8a3w696sdvwlwfse2nfng31bykcmb2x',
                channelParty: 'wkszq6tqu1r6s6c50gu6qndgdhu35gzg1pr4kczit00omkdo9wzqulgf41hcnrqfwkt5ov1x382hrgp1gpp0bu0aksq1mm9qa0booa11bhuu36ru0lp13fijy0jvi6kv6pod7ork7gmhl3cdij56qmkuz4srdzk3z',
                channelComponent: 'ia389e9yirdycf3d5x6j8oscaep5epbd0jofu4dtp9qdxj4dhbm16jynx5rximzhtppop6iprr7m09rc4ikjw7q06di942aziqn5uk4xdisy2bksnczqlvuxwgg5sn2ed1cqsrnqwn1ozvim78spiwtw0te0n3hc',
                channelName: 'y8z54g0vgepzockjq8vsudonx77iubseomreao2z25eodcmr861urf6c3527t33c1wpz58q13x12acl1o5jaaf1q124uj2xx85i9wuj94x5bsf77q26s3c1ywb82i122qfii974kh20lq3vd6v8m0j6asicww7i2',
                detail: 'Rerum laudantium sapiente qui sed quis. Corporis enim voluptatem. Perferendis vel magni atque consequuntur earum rerum et. Fugiat voluptates delectus ipsa aliquam voluptas facilis fugiat. Nobis quo eos quia aut quas ea quo.',
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
                id: '11e36733-928e-4ff3-99e2-523d69ae370f',
                tenantId: 'c8ec4d98-010d-4b1e-941d-a7a86c30a653',
                tenantCode: 'pdxog738b6jdmghmioxif5eliidgn5upqkaee1wxiuy4aaguow',
                systemId: '5dbbfb28-421f-4131-9f54-668dc4f9273d',
                systemName: 'oidbijhmeqso1rfpes13',
                executionId: 'c30b8a03-f9ca-4346-944c-918dc83d6aef',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 04:13:16',
                executionMonitoringStartAt: '2020-07-27 17:26:27',
                executionMonitoringEndAt: '2020-07-27 16:46:30',
                status: 'STOPPED',
                channelId: 'b9ac1ac4-324f-449c-8260-37cef826edbd',
                channelSapId: 'jej5duva71tzcsud2anr840h9r3goq9cszj9v6bcnkjslnn9p1',
                channelParty: 'c3u8l4dhvuk86tek89hv19yygidt6a5ka62psp0hjzfegpx0ihsaveaakmxsgwssjyh6ekb6x2zbyvlc39yup1icobtdljrs6ibvircws952doyr4inocdbfq6sn2kx1uo8j3hdgi2ezwgufi5mu6i4wem5qrrgj',
                channelComponent: '1prax2mdg9zndsppx6mb3ccwj38z5q1gr0xit9stecvgtroiapfxi3va2rrdsddccpnz39whnyivgapnj9is00kbnpvr0xkjwyhsfysr4sobindnxb9jzgcjngoabsw9d4h9jth338nkxyh511ar40ujscw9tyywa',
                channelName: 'x3orr86221cf23gjucmm4bjotbcbaoleyah88os4qnp8wpakfodqireftovkrh40o0uhm6fhl2xhp7u6vmq0ydiat606xdfx5jr8vqgdamvtlyukh950obwpychi7tvro1pyx4srh83x7leu6ofxxgqov45j1xcd',
                detail: 'Unde itaque voluptas debitis quae quos delectus sint. Omnis deserunt itaque inventore iusto natus repudiandae. Sit et reiciendis vel.',
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
                id: '11e36733-928e-4ff3-99e2-523d69ae370f',
                tenantId: 'c8ec4d98-010d-4b1e-941d-a7a86c30a653',
                tenantCode: 'mjjmkgp3lkhies0qrchji9glls7j0pln15ij20rzaxatyzik4u',
                systemId: '5dbbfb28-421f-4131-9f54-668dc4f9273d',
                systemName: '8j7v3xssa0chqbmrb70a',
                executionId: 'c30b8a03-f9ca-4346-944c-918dc83d6aef',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 02:59:06',
                executionMonitoringStartAt: '2020-07-28 09:38:00',
                executionMonitoringEndAt: '2020-07-28 07:05:30',
                status: 'INACTIVE',
                channelId: 'b9ac1ac4-324f-449c-8260-37cef826edbd',
                channelSapId: '1yarninpkemnzhd21k2bq6ychzi7v9tz2jjstndf5rle7nrpz9',
                channelParty: 'jnrj3sq4lzavl3rxfyn8p6oafczvtuy6oz3tylidlbn265i5f203203j23j4f1t53frgm8lopq3lcwja7ilz5aihc3yszysrt7satnlmz58skrz2s26oqrrhqkhdy0rd13g5bvy3i5nju75o8cay8qe7lfeml92z',
                channelComponent: '7qu0vhdd7axaf6h8ok8x216zn7ibbwa05fyk0xonf54o4gy1l7q38kicnommflw11ox4e9x5mew1ql4m8ems36hyrz2vfdapp2fmcnaclx7jcjfljqiaox56f4vyoxlj2v35o76liwkhxfqqn6my55w7gg8hg9wb',
                channelName: 'v005epulgwic6w35ag5lwbgwy773vfzj05rvjg6jx4dzfvg35fi5aviwlfwl6xzyagw9sd9wnqa3kncyr2nyg9hbn0ifpotrlv5n5ps7zdmxj345uzn5lx9eql708p67y0an19k70ammrb53wyghrolok79rxtcnn',
                detail: 'Vitae unde id facere consequatur nihil dignissimos accusantium est. Ut corporis vel vero sint itaque. Doloribus et unde magni quia quidem omnis in.',
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
                id: '11e36733-928e-4ff3-99e2-523d69ae370f',
                tenantId: 'c8ec4d98-010d-4b1e-941d-a7a86c30a653',
                tenantCode: 'fimbnheb0una5dgf5eidagxd426f3uxh66irfrmzdl9br4klri',
                systemId: '5dbbfb28-421f-4131-9f54-668dc4f9273d',
                systemName: 'n2sdakliag11bbm5lzbk',
                executionId: 'c30b8a03-f9ca-4346-944c-918dc83d6aef',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-28 01:39:02',
                executionMonitoringStartAt: '2020-07-28 06:58:59',
                executionMonitoringEndAt: '2020-07-28 08:06:43',
                status: 'UNREGISTERED',
                channelId: 'b9ac1ac4-324f-449c-8260-37cef826edbd',
                channelSapId: '7oxw5bnqsaaloul8hbn36v7ckovymugrdu754psujyxi4ulxe7',
                channelParty: '0h9q6abv8m2jkcdpkt3k5321t99456wfh62gbnheh0kx3h49d3uoqsz0pjyn59dbuq8i0fkui35zoanug21bo25hhlwzsy01i733b9hyfuqj2zffjygn1lh2u48xlkn42kx96er3d9s7emm0vtab4jg57o6iei05',
                channelComponent: 'samqii9b2dvowtbi722zxh0k5e96i2zjngrxcevu3q0uek1wkrl9vsczewbr6gc86k9ddwexzm31umsomj700nmvayoq08yhodrp89a2i8i7bbwfwq86kvgr2rkepkipk8xrbvaakvltgbeq2rl63ka75ipgie8e',
                channelName: 'qwxqgw3qn8nynob8d4tfqwoj2wawystzbyyxsokw045bt2adcllekyqc3j6b4u5pa9oty9kpmu5gm1p440g8rd9dkhz68fo9oobgrhsz5gxw3clwrbxnxfxwkd1zy1fb2i1fb3tzq050t9vmam5myo1bnfgneevs',
                detail: 'Aut ut voluptas facere odit quia. Praesentium consequatur sint aut et tenetur consequatur consequatur id. Explicabo a similique. Totam impedit quibusdam est error. Molestias vel sed ad ut.',
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
                id: '11e36733-928e-4ff3-99e2-523d69ae370f',
                tenantId: 'c8ec4d98-010d-4b1e-941d-a7a86c30a653',
                tenantCode: 'is3pbmtd16mm730q21iud9vy5p12yyvhglwkuat3n2db9gktru',
                systemId: '5dbbfb28-421f-4131-9f54-668dc4f9273d',
                systemName: 'x2nux2se4c4bz2yqvjl4',
                executionId: 'c30b8a03-f9ca-4346-944c-918dc83d6aef',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 11:11:08',
                executionMonitoringStartAt: '2020-07-28 05:56:57',
                executionMonitoringEndAt: '2020-07-27 22:45:16',
                status: 'XXXX',
                channelId: 'b9ac1ac4-324f-449c-8260-37cef826edbd',
                channelSapId: 'g6dyiv5dnl8j1yxg1v4271hasrs48fcq06rcy0fh7nsefqc9hg',
                channelParty: 'efckt07ceiiqp7e544l39ute0b1n2mullmbpbyj9aflj5smvgl3vs0yehpygyoogm74mue16k7vu31nn6dtu5ogrhdctbn35nsd733sed2zpcqvgaldbbihk6hvutbwc8ot1g9plqqeq3ou7qbkds7qu2s41888s',
                channelComponent: '4tlm52gaofns44xy9lf2drg73xjbg2iqo64509qjfb29jrtsa9e77m8d1qaaw4dta2fbo21yjdn5h70e1fv27lqjf0arwdl0x7dtfaqnhb9kc16es9gf68o8wz6h9jseu3i690hwk88o3r3u224lxfsa9v9cbwah',
                channelName: 'uqkg9je4kkqcaz8uud3c9wy3x3l9w9pp9xdajmg846u7tpbwcv8lonwb264m6hrew75kvr7t13su79n2lv4w6q9t2ri70o3ytifx8zah6nrm9l3b4znpzpoxrpb2vxnueqwn35ch4kkgj2j6dcyg3gfzhhytgnwj',
                detail: 'Ut voluptas mollitia asperiores facere animi eum et sunt aliquid. Vel et non et ratione rerum et qui. Est et voluptate repellat voluptates eos ipsum eveniet eveniet a.',
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
                id: '11e36733-928e-4ff3-99e2-523d69ae370f',
                tenantId: 'c8ec4d98-010d-4b1e-941d-a7a86c30a653',
                tenantCode: '9cy3uzbp92jin9ksprgwd2ugqain51i8a6qk3yir89dlaluliq',
                systemId: '5dbbfb28-421f-4131-9f54-668dc4f9273d',
                systemName: 'jbxdph6ekuwjrgrnhpha',
                executionId: 'c30b8a03-f9ca-4346-944c-918dc83d6aef',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-28 04:28:49',
                executionMonitoringEndAt: '2020-07-28 06:10:43',
                status: 'SUCCESSFUL',
                channelId: 'b9ac1ac4-324f-449c-8260-37cef826edbd',
                channelSapId: 'l55zdd3utbhqal48bix1to2m56s59za9zkckquqo6glmx6hfdv',
                channelParty: 'um0d0ydi5q45iw3uhxwh1gkzkw665knf86uqancuxg26cqul9r8dej825r4mgz334mcbzn41k1oem1ajkc5fieh52pw8v1gd7lz8qsl311pc9cqftl92iyod1s1r3am41i1zj5jk63i1moln0tyjrn0km24fon36',
                channelComponent: '11g6sx38kyo99hdiz6qxsb5n0y6k6evagdb6nfh830i11ymkcmv7zobdt2vfvxulj4bzl2f7pcrw640q79he5mz4uqbeotw7v5eyorcmwjpn2yp56otugm2ml2vjcofaxafzzahq0273lj4zdnvh3cb8zyp9rf3y',
                channelName: 'lc4y4hnn4192k8iw7eyvlnl6cc0ktt7aib6vmueaz3s265v4axags3nko7m2setnbdjxdz0yhaemwjxmid435fwejablp5yok8a6a0i2pvorn8pksxitrca4xhoy1skqeuu6p0ot6hvsmzerah1gbea9f7zmlt65',
                detail: 'Quasi illo qui. Nam pariatur quis cupiditate tempora. Ipsa adipisci enim aliquid earum. Non fuga neque velit ullam ipsa quia necessitatibus consequatur.',
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
                id: '11e36733-928e-4ff3-99e2-523d69ae370f',
                tenantId: 'c8ec4d98-010d-4b1e-941d-a7a86c30a653',
                tenantCode: 'f21zlbg6sx4o0vevahav3ierhqq8bbilx5yndy65yj69b0it44',
                systemId: '5dbbfb28-421f-4131-9f54-668dc4f9273d',
                systemName: '4wkpxk4x5sksbpztbm27',
                executionId: 'c30b8a03-f9ca-4346-944c-918dc83d6aef',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 13:17:07',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-27 22:42:46',
                status: 'STOPPED',
                channelId: 'b9ac1ac4-324f-449c-8260-37cef826edbd',
                channelSapId: 'v9abk5latmhsevf9fqe1509xkeebazc6vqvrkhuwg3pdukpjvf',
                channelParty: 'hubguqtok699o10jq8r4qchi42e8g251z5q7bju220cenfn349o2ialqj6mabae55ehswuv90j2be5aifp6zazs3cbausox94jxsfuitwgwaz5ytrg0qe3wl14u5g1y55j6y86iwsffmqbi97jwein0npok4vbf9',
                channelComponent: '80zm4fad4dj5aizownc8ijoffxetpzwfzqp03uxay48cdsiqaaezj5hwzcs6sc80oyzniid92gyrj29dw1j4iroixunx45w0hmymre2ehqeyr075q2lugtidjxku1znsuv9d09c685wct1mqmumn1b3jvtd7syif',
                channelName: 'kpyisb3gi7e7nrp6m4ruqm942gphxzoz10480w9a0bka41934tovz141o8ujc76apmuoxpl6awssrh6oop222k9xuiias9qfyut6crxdkhilbyetc7aidtadhdbozxvasluex8v6ghzoxei5gw003z9uu8okodic',
                detail: 'Est aperiam minima molestiae voluptas impedit aliquid aut. Iure et voluptatem doloremque accusamus tempore in quasi. Repellat vel doloremque facere repellat ex laborum. Sit magni explicabo dolor ut nemo unde ea.',
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
                id: '11e36733-928e-4ff3-99e2-523d69ae370f',
                tenantId: 'c8ec4d98-010d-4b1e-941d-a7a86c30a653',
                tenantCode: 'p676evm0r91faeiigec1afbjqkzrfysy1uidj8nfkpe4gzpntp',
                systemId: '5dbbfb28-421f-4131-9f54-668dc4f9273d',
                systemName: '4j7pm83sytvosvdcalk4',
                executionId: 'c30b8a03-f9ca-4346-944c-918dc83d6aef',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 03:20:20',
                executionMonitoringStartAt: '2020-07-27 15:31:02',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'STOPPED',
                channelId: 'b9ac1ac4-324f-449c-8260-37cef826edbd',
                channelSapId: 'gkzmw5jgumvyaa1a10bu65x58tcxwo2vuacpsx4llwc45o97wj',
                channelParty: '862mha32pbkunq8fwzgo31c6rztu5tjk8jnzf2g4922u6gfmqwl2d6fla31ce236bm0jwm20mgvtcchff5ibp38fb5rzs5pjqwr2jvn53beptdi6f1q8rz3sa61dgqzccf46j4uk2j6avq6pixmlq2vrkcdipjsf',
                channelComponent: 'dgbvioic65wvohp0b505e5axamj23ydwd0ehoeo1kccb3k2syf009p2dxinf9dcf2ihfxr5j73cxf4mj00bqtw7nsiicj2c7nu5ik775c6nqx8mogg2elld6h0p6jaipykxb5vt3nixye0qyy94nvscpqdxj5yg3',
                channelName: '4korrm75ckxkgfye91tvbplk5vv80827kpvk0ad5lvzvfmmm5og2qfrsklfangx8hpelbgr2pa4fuy2ec7b1goexgfrf620zkxbb2s0y825jekbscw5s1coqdutfmffu5za9ee9jultmp9rmdvimxjp6yahi347w',
                detail: 'Non ut vel sunt nobis voluptatem consequatur. Dolore et praesentium quidem ipsam in eligendi est. Libero et magnam et tempora vero eveniet. Unde unde corporis sed. Non eos commodi voluptatem rem corrupti assumenda dicta aliquam dolore. Ducimus qui quisquam perspiciatis iure et qui earum facilis.',
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
                id: '11e36733-928e-4ff3-99e2-523d69ae370f',
                tenantId: 'c8ec4d98-010d-4b1e-941d-a7a86c30a653',
                tenantCode: 'o8mw302u8nx9bpbhfxhuy4nq3apz8plvdafrr6dwrpk3ea38j2',
                systemId: '5dbbfb28-421f-4131-9f54-668dc4f9273d',
                systemName: 'uhrqm7z8p3voexk3tsle',
                executionId: 'c30b8a03-f9ca-4346-944c-918dc83d6aef',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 05:22:51',
                executionMonitoringStartAt: '2020-07-27 12:42:44',
                executionMonitoringEndAt: '2020-07-27 17:19:59',
                status: 'UNKNOWN',
                channelId: 'b9ac1ac4-324f-449c-8260-37cef826edbd',
                channelSapId: 'rlfdtyr589rgasgbxzxlwjshk9via75o3rio6u5gno5csctwbw',
                channelParty: 'nogl8x26lwo2zj1xjk0ltaet7dv3k31bkamfalhxhp4kj3n8gktkycnoi707ayphg80o7ypggicht2m1vh556rhgmlbzn1c2c9ze1je3dtks0y2zt9ika9rz9rre5k1eahyquoraaz82zf6d1unj2w5hw4cdbd82',
                channelComponent: '3riulffognvl0vkwntzii739qo53k1gy4doalc4yzzq7ngkamu9lwr5or7xmamq2lgcysmqc8szv8361l9ycnqj3d3t26dbxau7ilpf9ymm2a1sisawn64atavr7ddx33xfhc7i0x7v3ccz8bkk4ibcgnoja4niu',
                channelName: 'zjfiu0758hu484vektl6iv8761ckd8jioho780vmopsddr7r4pmoo2knj608ddcv3sh18a5tq6y1kvj4h9ivadrexrp6clum8funnera127foibwshnb7h1epg9u326yxjyxuwhd19adm87ch7vvzj50t4wb1f6z',
                detail: 'Consequatur dicta dolores quis id ratione sunt. Alias ut quibusdam aperiam omnis distinctio repellendus autem. Placeat perspiciatis quaerat impedit consequatur pariatur sed. Id dolore officia. Tempore eum laborum pariatur sit recusandae aut temporibus reprehenderit. Voluptas maxime rerum.',
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
                        value   : '11e36733-928e-4ff3-99e2-523d69ae370f'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '11e36733-928e-4ff3-99e2-523d69ae370f'));
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
            .get('/bplus-it-sappi/channel-detail/11e36733-928e-4ff3-99e2-523d69ae370f')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '11e36733-928e-4ff3-99e2-523d69ae370f'));
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
                
                id: '2ce17b77-9e21-4cef-a6e4-ca4ec8f0a1ec',
                tenantId: '9ecdb677-906f-4e37-a333-eff8a3f07e42',
                tenantCode: 'lnd5vqg2bu01pk8pjocwg6hd5eyq5tpxk6qwzrmvoumlvqcqr3',
                systemId: '575a6e88-cafd-4fc4-85bd-43508df022e7',
                systemName: 'jz33xqxkm2gi6zixyi4g',
                executionId: 'af85cd9a-ec59-4442-8c27-4c632da16d6a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 12:01:27',
                executionMonitoringStartAt: '2020-07-28 07:46:24',
                executionMonitoringEndAt: '2020-07-28 01:50:03',
                status: 'SUCCESSFUL',
                channelId: '409950b9-dc19-4b0d-b1f5-5737fcb9a30a',
                channelSapId: 's48gzqce4dgqjusebrkt8rnx5ikjk165pg6kuo2lsczr0c6qhe',
                channelParty: 'n1zg1r4dh4djvwofhngbo5xknc0wwitr4cafhi3vq0784evqeler428tkt2t4sisx9j8xfhl7uqd9xbnoyivtp59gjyv6tonv327iznbvyu8rxhoplmn0it28bxivc4yrljmsw3y9wxtdhgvxe4bfk254vds66vu',
                channelComponent: 'nxzgig0ksua42v32qngsiccv5wtcqtv5655mhzq98znwwe63suw8jecpw44ezpk06mpxa6ntggs8dspby7jrlrn945k04ep6ks37xmnc2g1lflvkakkvbaar69rtf1y9kz7y6tgvu32jniivgb16bntm7tiqotoe',
                channelName: 'xouudrxld705kzr0cwcg1eucht54rvibruz4pryo633tn4s14bjby0jfc6lz4ak438vembhtwu4yqdo3w7s3hdjipp91z2c6ji1wuphsiwuo33s3stv4l4emvdlwde62343lf6ew37c102wt2haohd54j6s4rim2',
                detail: 'Enim beatae modi fugiat voluptatem dignissimos. Quaerat eos nam voluptatum error voluptatem aspernatur placeat praesentium et. Rerum quia provident facere sunt accusantium excepturi excepturi beatae. Non et dignissimos cumque. Ut et eaque.',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '11e36733-928e-4ff3-99e2-523d69ae370f',
                tenantId: 'c8ec4d98-010d-4b1e-941d-a7a86c30a653',
                tenantCode: 'lzovswv6o18strju4p7oqtu843wbk7p5rj43y0xlt278632boh',
                systemId: '5dbbfb28-421f-4131-9f54-668dc4f9273d',
                systemName: 'o86vjp96uounlw1aq9j2',
                executionId: 'c30b8a03-f9ca-4346-944c-918dc83d6aef',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 06:32:51',
                executionMonitoringStartAt: '2020-07-27 22:14:18',
                executionMonitoringEndAt: '2020-07-27 23:41:18',
                status: 'INACTIVE',
                channelId: 'b9ac1ac4-324f-449c-8260-37cef826edbd',
                channelSapId: 'owf5w8j5l08hk3uo8zd4f9j84a6j9nuo5jckdz058cne52tphj',
                channelParty: 'j79tzgucoxku8xgjdv9gpek8w0gv8kfnenetxwke0n5zx8zkujssolixjl5v2lsx0ef9bzrd0oi2r9e30hxam8l95o9qtal8sd5he0tynvavd9jgez73em46t3w0shhhf2a76e90b6lcvvgmdjn9moi1uwtnuni8',
                channelComponent: '8wlg5ldwrkgt9xlvoy9fvmibz54yerotqo73o6ywzuaxmvl5tqocbl8exi1dy9tuoce5ggwoaczy2zwx0mkatllly06i543xyai7uiy8frzho3bmfza6aj3hkytbb97xlbvw3r77y8qnntnjegt23011kphctt0z',
                channelName: 'n5ghhplvok7xldrmcwr6idh2ferjdrn6qmyyaixs8p4pp6ajclwjx1xxw92h9ls8ekm42s8u1nj6e98427fnje5zupxqcul3j1ttupmz4a344s5v9ms52ei31gw4x7zepgdzzho130g6vp2pn1xpddioka13n44p',
                detail: 'Repellat aliquid temporibus nostrum. Dolores aliquam et dolor quos earum ipsam quo quasi distinctio. Non ipsa voluptatum eos at explicabo vitae numquam. Et voluptates soluta. Eius et consectetur in ipsum. Adipisci iusto nobis dignissimos ipsam dolorum eligendi repellendus sed.',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '11e36733-928e-4ff3-99e2-523d69ae370f'));
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
            .delete('/bplus-it-sappi/channel-detail/11e36733-928e-4ff3-99e2-523d69ae370f')
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
                        id: '83b7c50b-7f64-4304-8644-c48b6e84bd6c',
                        tenantId: 'c8ec4d98-010d-4b1e-941d-a7a86c30a653',
                        tenantCode: 'ot3q88uevzhe82kpgd0fiatxwh7umcvly2ztr1merseikfw899',
                        systemId: '5dbbfb28-421f-4131-9f54-668dc4f9273d',
                        systemName: '2vvecbey2p2hhcjjtmqc',
                        executionId: 'c30b8a03-f9ca-4346-944c-918dc83d6aef',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-27 21:54:47',
                        executionMonitoringStartAt: '2020-07-27 16:45:54',
                        executionMonitoringEndAt: '2020-07-27 17:08:53',
                        status: 'UNKNOWN',
                        channelId: 'b9ac1ac4-324f-449c-8260-37cef826edbd',
                        channelSapId: '712mam32jdu29hi0q7cmxeayqv0sq62la0gjig52x142hkov7w',
                        channelParty: '2nvd689o3ik31d2altq9i30wy77iee0qicly48meewucfeqa42tz0q01bspd5hftn3t15s7vgsend6rpdckp3jnt33i3h0sanvm5qj04ojza67h3gdkbzl8e4524sg9y87c7iz1x5nktdsim9u0x71iq8dmbehvl',
                        channelComponent: 'aop0bbvshan8oxty3zrvaz8bx3w7j9owffrxbuyu6xeretnm482jq89uujt5y4ju8xbl1jnf9r4cahls8htdf5yfn29izcvqjxkl5skgxqeurz8xyqvtsslw1ea3evrqfw105s9k492a55dga5durmqtvuxz0qwp',
                        channelName: 'bxncdjxzfp254eft0yp0t00wl9vdnx47vtfoonx5gi1u10i1btlufn9olf8xf5pollsq79ggaax2m3w5xjsbe2718q901yywwa301t0wlxzix4ldrkfjw6neltn6w98bc7o1kqg1a27uqhhl0kr7ohxylhiepo6s',
                        detail: 'Nulla dignissimos labore sed velit quae in tempora distinctio consequatur. Sed a eos fuga quo qui. Ullam ex et quasi. Omnis consequatur architecto consequatur. Ab necessitatibus qui qui neque in officiis recusandae velit.',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannelDetail).toHaveProperty('id', '83b7c50b-7f64-4304-8644-c48b6e84bd6c');
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
                            value   : '11e36733-928e-4ff3-99e2-523d69ae370f'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelDetail.id).toStrictEqual('11e36733-928e-4ff3-99e2-523d69ae370f');
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
                    id: '11e36733-928e-4ff3-99e2-523d69ae370f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelDetailById.id).toStrictEqual('11e36733-928e-4ff3-99e2-523d69ae370f');
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
                        
                        id: '5844a6f6-32d0-4b91-987e-4af5bb15b643',
                        tenantId: '6839bec9-8ef2-44ef-b0db-37f2f0d5d76d',
                        tenantCode: 's3wkl113ta57toraaap0rg304m8lqc9h1zsq3vt73llqdsin9p',
                        systemId: 'fd9f5342-8828-4fb0-a51f-475960f205a8',
                        systemName: 'j1tzxzoxfoc9638qx6ve',
                        executionId: '8216c5de-b28b-4336-ab09-9ac81de9762e',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-28 10:44:55',
                        executionMonitoringStartAt: '2020-07-28 06:22:19',
                        executionMonitoringEndAt: '2020-07-27 15:29:21',
                        status: 'STOPPED',
                        channelId: 'aa1a6995-464a-4fd7-b53d-670936b676e2',
                        channelSapId: '1roq630psg2wdttqvfmgpia6dwtv657kwowysnw9mel3qq3uqt',
                        channelParty: '553v0i7ts0pm9vghxchnixc9z2mor2xr7kddleuavc4nbtiopwrvkig084l8xc6kq2vpt2tpmrmlz37b2znfxqsk7rb96vdddb95vxc2lax5796im6ojco13npm2dyjagjga9rny1ib83osei8j8h3dxecawvprc',
                        channelComponent: '999phuf1tuv5gbcev8zsj1ra411ws8eld9sihnf4x1eo5onubc6cspfiycf7o1m285ci1nheid66iapg3od8qwjca2amc4cn9zu7awxdzg7pshuvqs9du365karlnwxe601y690u1wkzzg6zm9mzlhjautdwutwm',
                        channelName: 'j18xkt71qq40ecj03pkmqzjzzznfp6og6y0u8se8c6op45028my0squlo9an7ygak38335t40110l0hc6qm7iklkx377lr4sye73qiewsi2l1ihkwae2k1uglvqevkck96gcny2erl36cvkbxnttfm2xwa802h5p',
                        detail: 'Beatae est tempore reprehenderit molestias magni quasi. Qui consequatur rerum cum. In earum neque laborum odit et. Sint odio quae quia nostrum.',
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
                        
                        id: '11e36733-928e-4ff3-99e2-523d69ae370f',
                        tenantId: 'c8ec4d98-010d-4b1e-941d-a7a86c30a653',
                        tenantCode: '9574k0spnspzubpatrtjpf1zmwga5l9m3tdjlgh4gc3ayl8uro',
                        systemId: '5dbbfb28-421f-4131-9f54-668dc4f9273d',
                        systemName: 'r99ya0zlintykiczu1ru',
                        executionId: 'c30b8a03-f9ca-4346-944c-918dc83d6aef',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-28 07:25:00',
                        executionMonitoringStartAt: '2020-07-28 03:33:50',
                        executionMonitoringEndAt: '2020-07-27 22:04:46',
                        status: 'ERROR',
                        channelId: 'b9ac1ac4-324f-449c-8260-37cef826edbd',
                        channelSapId: 'olihex29e0ka320b3cgobg2wc7vvykk46iw83i1vm7apzpzktk',
                        channelParty: '44qafx2o2yfsxqg6qs7g0sau09np4rvgdgy4etpp2kya5h9xwqh9ps8dbgldcmmqg9o6aac04sh6bwazxrwrelyvzypdpu641sgwrtstq7w61h7rh93jqdbb0fvvlfq1bg9982hx69gth1580qq1lxr883cbmfja',
                        channelComponent: 'y7tdkcxhlx5wxlnd3xoa4zv8a3cibxkocdw04nclc54oxzoz3n9fab2amvq6h02bm3iwbpoospji4iibmzg6kf5loug6fwgshsmo5bw790b8xc1bc86li3v1882iy72yq66miku7h4y9hmm5lcg4ugcegg7yedgw',
                        channelName: 'ftpcdf2n2uj8xfzusowbz5a4o15tr7189wfe2vex3ldxij13ds70oqynl8pnj0t427pfgg4xdrcf7etbc70owtrk2277i3bvpbici898q65mjg5li61wbij3seg94gm06q5v2iqc0qa75q816fingsb36o60xz9h',
                        detail: 'Enim facere eligendi. Odit ratione quos ut tempore. Eius et rerum totam.',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannelDetail.id).toStrictEqual('11e36733-928e-4ff3-99e2-523d69ae370f');
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
                    id: '11e36733-928e-4ff3-99e2-523d69ae370f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelDetailById.id).toStrictEqual('11e36733-928e-4ff3-99e2-523d69ae370f');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});