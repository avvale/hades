import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IChannelDetailRepository } from '@hades/cci/channel-detail/domain/channel-detail.repository';
import { MockChannelDetailRepository } from '@hades/cci/channel-detail/infrastructure/mock/mock-channel-detail.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
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
                    CciModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
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

    test(`/REST:POST cci/channel-detail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '46cc98d5-6415-4d95-a3d1-370a531c6c13',
                tenantCode: 'rck0tehdtqg0j17za78l3p75rmvzs65xy9nb2b46y0t39v7rsy',
                systemId: '1bde9487-292e-4474-b6fb-937288b90d62',
                systemName: '4p11hhqk8j6tjib1ublg',
                executionId: '3b7d8c80-6634-40ac-9a18-95d052bf92d5',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 05:12:24',
                executionMonitoringStartAt: '2020-11-04 10:26:48',
                executionMonitoringEndAt: '2020-11-04 15:26:05',
                status: 'ERROR',
                channelHash: 'wpbag6ab5ipg057ur8fpdlyouq7jo0qi3zl1x2em',
                channelSapId: 'w2vvbouk7cxrtcrj9yidgmnwxpntkhxo73bkodle6c0583niqs',
                channelParty: 'chsvslpxhrxcz80me3eer174wrbmmede6h7f7oc8wtxww100ky7by6y3zx3dx1hxtwxcoq72ujgv26nf80atnvioqcpfwmcvyijiuajkyj2n0r6odlh3mgkbwag8wympv4khtm5565zglv7fq6to4q5f20vyh2do',
                channelComponent: '4zqbwu1jsmlb3x1avp631yta3sr3uth2relj2kmuxqpfbruy0g3zx0gosmj8nhzw68n7vmz3mkui6j035lonst93bqs8ar4whjl947ykqwhttzg12qa966057eii1tal5bdeuym75k6te418qhp7tlahbcg4hxxc',
                channelName: 'k3ary8qz5mos7s3n2az9yefiliofixftiw4ykee9c3vqhjcs1dhozh1s9znpa0kgc3dtdsajuznyu3hlfmd1miq3zzmzkxooghivrfzn4gmggs7s64a0sj73lqzic3ygtms3wi1beia3e0qosht75kzbf1zop7xu',
                detail: 'Voluptate enim laborum rerum nihil occaecati quasi. Natus deserunt et aut aperiam consequatur omnis recusandae quia autem. Blanditiis magni illo blanditiis ea voluptas recusandae molestiae est laboriosam.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '46cc98d5-6415-4d95-a3d1-370a531c6c13',
                tenantCode: 'uslbfv2edsyengkqg94nlsmkspkxpna7q4ky3r481u5d3mo58a',
                systemId: '1bde9487-292e-4474-b6fb-937288b90d62',
                systemName: 'mi8b24har61o3ibj6brf',
                executionId: '3b7d8c80-6634-40ac-9a18-95d052bf92d5',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 02:29:08',
                executionMonitoringStartAt: '2020-11-03 22:58:17',
                executionMonitoringEndAt: '2020-11-04 05:35:15',
                status: 'STOPPED',
                channelHash: 'j1v5msicp32rgh4hchph5gw6rpdxt8xx0hbr820f',
                channelSapId: 'zpa9lt1l89ejnnsgs3mrdoxj8k8xl8nc4qj1wydi1jixmd8rk4',
                channelParty: 't2pp3zvv6v71uv3mbbcu9hhzd6cpw69u2hmq9wv0utknufdd0q5238bvv6sdjlvlkl60kjctp61gx3d8bryksajnwinewwkegwypsmv00vj95uq0picl6e865khveq6s5hwasd8mg2pmmigbgzi0pjkjtay4hs8w',
                channelComponent: '3o867hvhasuj412r9bj5ninxgl2s2opxf8i6ip12cgz7bvvt75qr6pujym9ppnml694b6hnozal0pnzy2vabi37yakn8rqlvxm6jgcrsbfmngjx537pfnu8z053az6yrbrtv8xhbmyaa64715rkq62fdn3lcky2u',
                channelName: 'fa7ll72ba345zb1q51l1ak2ppwqxuo1qd52rv9wiet30zt2b2p9ypex68jv9n7hqnm8oc9wqv50cieklgj4i48a4b0t52phuo282fgeauvjgwr4wkrk4ti3bnpcm91envfgzvnyh8mto4rrmyhtwkkebv4etnf6a',
                detail: 'Blanditiis quia ut itaque modi. Quibusdam maxime tenetur illo hic dolores cumque consequatur est aliquid. Sit non quia delectus. Voluptatibus eveniet fugit incidunt reiciendis quibusdam dolor.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'b962b77d-a02f-47e6-a100-12b9c34951b8',
                tenantId: null,
                tenantCode: 'vvwy4n8an7ivy8tdpvu1zler1wxm3k4wxhy3vxlz0qy4i10tjx',
                systemId: '1bde9487-292e-4474-b6fb-937288b90d62',
                systemName: 'b1risyy3juavvoer6rg1',
                executionId: '3b7d8c80-6634-40ac-9a18-95d052bf92d5',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 03:49:56',
                executionMonitoringStartAt: '2020-11-04 16:09:08',
                executionMonitoringEndAt: '2020-11-04 00:16:08',
                status: 'SUCCESSFUL',
                channelHash: 'txmtrw9sz9wfqrikvup7fz0k35lkcfz5k9ztp9ki',
                channelSapId: 'ebv1qrnlccftuqa66wn0xz9w6qua88pp4vwrhre8f2otqtz0d3',
                channelParty: 'pligij6rlhji8qh21z2mhe0t62oh848kywbyd71hm266x7fkxwucetlhmprnr6gk51wkkryuyxt3z7kkjsu7cgr4xqz7h49wl8pwfw9546d052vhauojc8cpkqx37hz1xs9oo1mqcouhxi4elgmkkxwzbiaxi4i9',
                channelComponent: 'kl4pf70yiljzpos6naz8x9jmr3zztd0hpruvrjmu6ejk2y6evbree2w2tb6vr260v3ftkk1pdommrxxb5fbol7mbtz285mv4rptogdk7jl3x0rsbarikjv5yswm0uaexbe8p9lkkkwg1lozqkqfnpm16488v6df2',
                channelName: '1qnir6bll3f2tnkddmbpfllr3w6fbhw6fnbp2xdnyfed31cr73qcxe2z53e9ukxmya97po79i877y45c51gfpuv843f40i5fp88zu6w922g389rsx7d2za1ibns4hekjao5vucnk8r53h9wyhu5yfwvnf1d3qs3e',
                detail: 'Et eveniet possimus quia. Quaerat aperiam vitae. Saepe architecto reprehenderit reiciendis neque quibusdam. Quos ex excepturi odio ratione et. Ab excepturi autem sequi.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'b962b77d-a02f-47e6-a100-12b9c34951b8',
                
                tenantCode: '2rlkqmb6ebi58p0n7kxsqdg2s3c1cr75movuajndc1czvs4wdv',
                systemId: '1bde9487-292e-4474-b6fb-937288b90d62',
                systemName: '99q41jc93ch3guu1glo7',
                executionId: '3b7d8c80-6634-40ac-9a18-95d052bf92d5',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 04:20:13',
                executionMonitoringStartAt: '2020-11-04 11:46:46',
                executionMonitoringEndAt: '2020-11-04 08:27:42',
                status: 'SUCCESSFUL',
                channelHash: 'ayf5u1w1hnuuo2xe8f9531zgwrtjktpu2s2ol0q6',
                channelSapId: '7dmvl3wx0fz7gfav4yqmc948nkq77r61mueqwtfg5vk2a6b85u',
                channelParty: '1irp7h8vqef5q0a80c0a0qaxkoklz9zl3ut7wlbx3l2in0h4j3u183d68uwbeqiv0d3ycmapuo90btty56ujr9cmvkailihxhi089wcx6z1qibqu2sb04hfzjplnv6xq0354tj0z2807jmiekm4cbcldu14wvkam',
                channelComponent: 'exmcskpkpcrhblayaasr5u4bjowqhg34soqudcyv16ryu5pji4ids9msfhoo4nvishotqje3rmgkjxtbfxx50l73hyxu6zudb3ohfqh510jx4mqjbafzm7822jrlvxoiw8d2gejfe9cq6jgc8jloipeo55g2z00j',
                channelName: '91z80x1epj7o1fwaky5e321hnjivpumrj09600my64kk0rgq0453jb03czdpc03kuyeogat0hcnhv03vngwo0fi1xw9x0simnmwkr258vcofjlpliuqtgh7rhwgycmmfto0ny2e1yhqj1n3boip61ex4po19nbfw',
                detail: 'Quis atque impedit aliquid nostrum ipsum explicabo soluta similique eos. Asperiores nesciunt sunt nemo et tempora veniam. Sed et et ullam perferendis. Rerum eius aliquid officia asperiores quibusdam quo ducimus. Voluptate exercitationem ad animi. Aut labore labore laudantium deleniti sunt.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'b962b77d-a02f-47e6-a100-12b9c34951b8',
                tenantId: '46cc98d5-6415-4d95-a3d1-370a531c6c13',
                tenantCode: null,
                systemId: '1bde9487-292e-4474-b6fb-937288b90d62',
                systemName: 'rmve3vrxgbi4ef9gxr3a',
                executionId: '3b7d8c80-6634-40ac-9a18-95d052bf92d5',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 12:00:30',
                executionMonitoringStartAt: '2020-11-04 15:50:37',
                executionMonitoringEndAt: '2020-11-04 13:20:23',
                status: 'STOPPED',
                channelHash: '21av2dfpy8cev75d9b5oi56hkjz4pwy4i7tqv63y',
                channelSapId: 'hhwfrrqirfknveujomajj3gl3cnjwc2vd1basswd0udrb6krcv',
                channelParty: 'tx9zv5i06ukaw9a04nqqdv7yogqmb35mokuooy6q14cdzrmu9d5tpn1gl4wvx0rvbmb18v8h59eulct916ejh6yvd5bj7dgyccvb35djb2xnuo7frr1zvfy52ndemiybplarjj9r3vfekaiasszl4o49u7lf4sqt',
                channelComponent: 'p0qvrgcz8iy63nwduush9675odpfjf7z94o79btwsxqdfbu0w822p32k0pofjyc54gko27levm41f09vt6np3t4ol3lmgp87fd3nn3x5i6qhvckae727vp5p1cri9kmqddev7vrw7jcvmv3yhf9alu72tqtfdguo',
                channelName: 'dqur7ogv5l1ndezss8vws3nsmt4fazmb73pxyrt1ffjfdopcirjhux7lxelb9jkox90tfiqj304goifj66xn69m5csx3384j94631cwmrgfe55u34iq9tuev0lbat5f3fzp0oqerel11ygh2oyv0k6qrajsd8j93',
                detail: 'Harum animi dolor natus expedita tempora architecto. Nisi porro unde blanditiis illo ut labore hic. Exercitationem neque perspiciatis. Inventore dolor doloribus qui aut. In dolorem nisi ratione reiciendis nihil doloribus sunt dolores. Ipsum ipsa saepe minima est et consequatur nostrum qui.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'b962b77d-a02f-47e6-a100-12b9c34951b8',
                tenantId: '46cc98d5-6415-4d95-a3d1-370a531c6c13',
                
                systemId: '1bde9487-292e-4474-b6fb-937288b90d62',
                systemName: 'fsptedpyssexl7jqppn1',
                executionId: '3b7d8c80-6634-40ac-9a18-95d052bf92d5',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 04:37:59',
                executionMonitoringStartAt: '2020-11-04 04:06:56',
                executionMonitoringEndAt: '2020-11-04 00:21:41',
                status: 'INACTIVE',
                channelHash: 'b6w1uq8vtxohpn0ahbtwlygczuvl1kvfvb7yt7cn',
                channelSapId: '3p1kmurb0eubm4ctydvz1mpfrp7m5a69v3uo7bewgyl1gpo6wo',
                channelParty: 'jekmx224eb86bl696s8e3k9a8cu0c2wh5r6kdz4p9smprdct40mjvp8905njlyv44iwk80c40fej2pj8uiff4e2396s31pqgsj5np96fuamoasa1w71kyxrk5srmtu9q33gcoqhozz66ur0bbvhm90auxpqy4fy5',
                channelComponent: 'oufp48z1ypbxoueyubwzshwaovn6kcgx7wx5gxase66qhnasd27l9gf5a0eppc1zuq3xyj3skxe42ncdcv6vu7frfbpwnqh9vsv7olhod60gd7vlwsxllyo82fmeqe0lqnuw5qggidmaa7s9uvqrypcv05ds0brc',
                channelName: '4czk21p8ja6vj0omaubgoubk1kzna473lijwg9jawgsa4rxipxu3ik4ob2ej1tosgworjpjs2ah0b65jy9ouceqcb0qlb7rstx0rt3ae5065fe9uumdojn8m9i6n84qci81d9k5sjn9zl1sre5nhpx81gu2luzp0',
                detail: 'Vitae ipsa vero. Nobis quae excepturi fuga optio rerum non. Quia enim pariatur qui corrupti rem soluta in. Laborum qui et rem. Quia saepe quo laboriosam autem ut nostrum repellat deserunt itaque. Quia quidem maiores minima ullam corporis ut.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'b962b77d-a02f-47e6-a100-12b9c34951b8',
                tenantId: '46cc98d5-6415-4d95-a3d1-370a531c6c13',
                tenantCode: 's72e282ox6razb7op1z81z5tqxb18j0xv0frmtvscowd09ct0o',
                systemId: null,
                systemName: 'c80gjodyh5umpxj57ds1',
                executionId: '3b7d8c80-6634-40ac-9a18-95d052bf92d5',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 05:13:18',
                executionMonitoringStartAt: '2020-11-03 19:05:19',
                executionMonitoringEndAt: '2020-11-04 12:37:29',
                status: 'UNREGISTERED',
                channelHash: 'he3afudzr2e7nqqxl3kqeybxqxb69xzv3jvfycl2',
                channelSapId: 'a8iwo88d6v5la0u2kltulyvctofkpzcnblztmtypcfp5v7giqt',
                channelParty: 'l325yfkv4yqjp7a2bojeky4h1ihc4f3atn30se75v0t5a1fh7na3h5n29jm0owx09mib9ypwgwaufwulggkwpsvp8iq5ihvmc01bg8mhf2vglngzp6ip4ndh8xauusncgz8blpo24hw7nh85nljohlabmjwt7bbt',
                channelComponent: 'epkipvcal72rbhna92frdk49rumfdm9ht1kg15mxc8fe1so7kzenqz2oyuoshruvztcx3hgbl368vitn2arcm4hd55p0ov0kpv2ll5kqhnhr3q4xnmqyia51vt9m7gzpgaag01pxysqs717y58ezpg7qua6qiv5t',
                channelName: '98cf0td4vyl2b7qq6tydc1csrwe41bbaes2qqdvudffot0k5gw4f92jui7lin505rpr9fnrxvngobs9d6k884ytkzt3vvweqcf39vsdb56ou214r7q1eyr15j5jnt1rs7x07qjtsswpthny5cmj7v0ett2gyeo7o',
                detail: 'Molestiae debitis ut suscipit ipsam fugiat iure minus doloremque. Incidunt sit praesentium blanditiis ad alias deleniti odio officia. Alias quo voluptatem cupiditate rerum consequatur laboriosam qui velit eligendi. Non dolor cum et. Omnis porro consectetur rerum.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'b962b77d-a02f-47e6-a100-12b9c34951b8',
                tenantId: '46cc98d5-6415-4d95-a3d1-370a531c6c13',
                tenantCode: 'gvvyfjg1h34rvaugcs7zjv4536o5fu9phvpau0x2rvup1md0vm',
                
                systemName: 'arpedy4xlq4ig4gears0',
                executionId: '3b7d8c80-6634-40ac-9a18-95d052bf92d5',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 15:06:32',
                executionMonitoringStartAt: '2020-11-03 22:32:44',
                executionMonitoringEndAt: '2020-11-03 21:06:32',
                status: 'UNKNOWN',
                channelHash: '3txr55ojw2v8y6tzh3vw1vfzg7yyx8c5qfckd094',
                channelSapId: 'sa2tfyhttfi3hxnwxj1kp6udzy1kfbt43yo6a1cc47jdxutlpj',
                channelParty: '57oagtk3robc8g6hulwxjitlo8ln22jsfo17jkjiuvlxwved132xh1b32qt627nuzx37xwyry6dicu6xgwmqygxql7rodztjxp64baw83x2dopcau9t554g4fbtd0yh0sxfx1u365qrhq85sux4qjuxru1fopc1y',
                channelComponent: 'qv9rpv6apii36d686pecwaiakfesk24nbsslyz6t6rpnfdbhwzykiw79jlpikqhx2h3agz5y9klastuf8vd0vjosmovmw3snee9ky40verej6qybu2mrotkyio4kj4kwfu2uulklexfx6qep0v7vbaxufx4laabv',
                channelName: 'urck60pj52y5j3mw2lw3qs91z3b3w585817tloyjydy4zaveyburikkg9se19mfsgk5q9uje2hzdtc4ey4s46cddqzp9opkvb2zbzgwekut9rg29pextysd77hux3uylumx850fobj6nqe0g1ixg5mqlike21693',
                detail: 'Id ipsum sunt temporibus veritatis. Laboriosam fugiat sint. Officiis et asperiores sunt saepe illum sit veniam illo qui. Esse rem perspiciatis nobis voluptatem dolor nam minima. Vel iste occaecati amet enim qui eaque nulla.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'b962b77d-a02f-47e6-a100-12b9c34951b8',
                tenantId: '46cc98d5-6415-4d95-a3d1-370a531c6c13',
                tenantCode: 'fkh864bphbma0kbpoggwoqfqwgpz8cbgr8lb8rw5kyov4aoamg',
                systemId: '1bde9487-292e-4474-b6fb-937288b90d62',
                systemName: null,
                executionId: '3b7d8c80-6634-40ac-9a18-95d052bf92d5',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 02:45:38',
                executionMonitoringStartAt: '2020-11-04 03:11:02',
                executionMonitoringEndAt: '2020-11-04 06:24:30',
                status: 'UNREGISTERED',
                channelHash: '61lkxiror4j73v49psf746smkc1qbw3lrlrk4oyy',
                channelSapId: 'd5bbb2kreye3f3gg9csuhb8gb7t0ff54cu3bad4pju5g5u58ir',
                channelParty: 'q3hhuov7gpibjy9as1fvdyrhkorned3fxde3xqnkop9wa0irvfj8zx2mu2ec08qqmcfqy4pz7i0q9uldrpvxossjqf1qwah8hefjfbgm5a903k50yg2iud562wgj5qgeo01yyremq5ea8cogfhqu7p6kfwzck03u',
                channelComponent: '4qbkuvpd4hy0mo1uu7avya57jvc8wx819eq04txv0gge5y090cyq3nxhr8dnijk5b4djia8e03lcn7r7hzofcyn1ja9utm8873poupd6e95m4fdx87w2xrmrjzhpf7xre9ezmp066sbkwu30dmuqvaxd21d66ysg',
                channelName: 'hcylmvavlx2kiby7gkcl7ovcj3gi6mge7s6ooo2hucqqwe6d1h7x39qhquabtyu0f3sccymaoj4cpxpg2s02zgonyjf52b6tu0ocfv7xxw4s2saqh0bv1ulrjclx7bi370fl7wntsdysgxtlbb4musfrojpgv3hk',
                detail: 'Totam ipsam ex aut sunt error. Odio nihil quia laudantium praesentium repellat. Omnis dolores aspernatur neque est dolores maiores adipisci.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'b962b77d-a02f-47e6-a100-12b9c34951b8',
                tenantId: '46cc98d5-6415-4d95-a3d1-370a531c6c13',
                tenantCode: '3ikxl7l1q15gwffdgjs39y8fvtuwxl5ig5xbksfjax5iyrdenx',
                systemId: '1bde9487-292e-4474-b6fb-937288b90d62',
                
                executionId: '3b7d8c80-6634-40ac-9a18-95d052bf92d5',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 15:53:42',
                executionMonitoringStartAt: '2020-11-04 00:13:39',
                executionMonitoringEndAt: '2020-11-04 00:24:32',
                status: 'UNKNOWN',
                channelHash: '2x6unn001knpav30u3ss26re8su3ix1n0a9iaca3',
                channelSapId: 'lclmsfd0kn63at9qy4zj31pfathd4kb3244gd8l41tl760uz4m',
                channelParty: 'm31hve1j8yn518153to6x9s2kjbtkc75sl1t8hxkcsh54s36c2uu2f17vmjbyo8vzq0353fdyptcipmx17i248gzq9lalzfhrnaint3i2363tldwygyt59y3nfi34fq274yi1jux8gvuud7e6ijk78act8od306k',
                channelComponent: '0rts4vgm44lyxvppgldx3ty8eq5dev91rgysvve2u2951xnqzv8fhw9jmoz2fszpdsj7c4oerqdykq6ldhiop8hylsamsq0p8a7mpsw1jne6wlgeaqztxsiqnkdebpfd234fxq435ql96u4d1xd9up4u67qyxje2',
                channelName: 'cbvrwxa1o38w0u0endplsbohmhifm8xj120s7pivw5rvykxm7nq3op115t2pqokxw8j5flsxivhurd1fpb3i04jm2krzfv7gj55u58fg6qjdx0uzhsqxjp6okgrq6ydq8vxl0bxgaq3b9cfpkfbo4e9exv3y6l9p',
                detail: 'Officia possimus iste. Nesciunt porro vel nihil repellat dignissimos. Magnam porro dicta ad rerum nostrum incidunt.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'b962b77d-a02f-47e6-a100-12b9c34951b8',
                tenantId: '46cc98d5-6415-4d95-a3d1-370a531c6c13',
                tenantCode: '8s48nne61t43t33f2t50826qvehfvxmzstzk664h60t9wxwir8',
                systemId: '1bde9487-292e-4474-b6fb-937288b90d62',
                systemName: 'ittrijar9ef9hpc74w1n',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 16:27:01',
                executionMonitoringStartAt: '2020-11-03 22:41:36',
                executionMonitoringEndAt: '2020-11-04 05:39:34',
                status: 'UNREGISTERED',
                channelHash: 'jo5i1cm7z27xufdsy9f8p3fl8qpyqpeh31l2ov10',
                channelSapId: 'edjxinhwlztg4gucydi8dwh3z8iwzqbzyaytd40xw931cr1fxf',
                channelParty: 'x3l1qxm873cv9yj2gpifg4ischnu6ddkja13om72w1lca5aposwrdlalqxuvhfa0v2wgrlbf94uepvik3m213nvf5wrra0scnut4vpxy5gzk9je31dmr3omsyw4teslirvdsutgj9ytbu70ir5539k4s7pzoi9bf',
                channelComponent: 'gkod98b1gqce2c2kix01a7rbuv9y4o4a5otjdg924rv9vnlk8zvuds53jt999fxwdxv4z8ykeexci9g9bappkmwkjidmuz9kb26dmy7f21i0gepmdjsoywg4149orbp5cb72zy92170gtt3c5j0u77tkdarbhe5p',
                channelName: 'z1q32vw4p1unlfz6xanh3t93tm0jzuxnnong7ss5s3p1wq4ndl4oph9otj1djhqr6t2iw2xkmg3ln271oxnuv5hv73r3ksmyt7zj31boow4hi5ud0ntdgdg7j5tv6j2791mq8xeiszo88gffvgy0bdq2rbdor2ln',
                detail: 'Maxime magnam ab et et. Architecto non dolorum dignissimos. Harum omnis quos eveniet eum. Qui quia neque ut consectetur autem. Cum exercitationem accusamus.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'b962b77d-a02f-47e6-a100-12b9c34951b8',
                tenantId: '46cc98d5-6415-4d95-a3d1-370a531c6c13',
                tenantCode: 'kxx1pcmfzbus3vpe67ojmkmhx5tbv1c54ve7k1a7kcmosmrl9d',
                systemId: '1bde9487-292e-4474-b6fb-937288b90d62',
                systemName: 'bjqxxxdwi9ktg0z48hpg',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 14:01:22',
                executionMonitoringStartAt: '2020-11-04 15:41:19',
                executionMonitoringEndAt: '2020-11-04 01:41:53',
                status: 'ERROR',
                channelHash: 'n4qzdmq3n28qdeuy0yutrpw5eqpeuh4cv09evkev',
                channelSapId: '97m5wg6mzjwfyt1isjbjbrlt8dim6399r36ir1y66liumgn79y',
                channelParty: '53dsu2geetgee6u17jvfvyyo4ryl9u56zebr6xa26m4mavhzjfw2y9t5lj6reffgcqw5odm25giwdc26d48s5rtmdek803msp92t26vcq1p1ftqizg6jbc6abf5sgeq0bt2ns8gea449fn39wnng2dbnwnk6l215',
                channelComponent: '0ywrytg64vzjqz48o0pt79my7rprcexv167vtk33gyqjdzztlgzm4xeu2wk556395tali5fyboegszh0wswhv25k277t1xwao1qyo52wwfogz4ml0j7fgucvnzwrxom32vc0jzvtkur1ev3t65yq31j6zcabfyfo',
                channelName: 'd2r3audj3mzmghiefjf4jq7mhioqlgmngb8mh2afldvsjmrsgwvithxd1d9wvc0lwmxqa2nor853in0nrynaeqbhyjih3tnclj1kpawf00csmq75x3fjm7q1hafkm93yl2326zmoplq4vl5ltito45c2guwk8gf8',
                detail: 'Quia vitae quaerat sit sed ullam laudantium iusto. Eos ipsa fugiat. Earum asperiores sed cumque veritatis deleniti est corporis vel.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'b962b77d-a02f-47e6-a100-12b9c34951b8',
                tenantId: '46cc98d5-6415-4d95-a3d1-370a531c6c13',
                tenantCode: '7dltwvc4j747qped64o0ez63akblr2q5b3o7rt1uw5vvzmwdos',
                systemId: '1bde9487-292e-4474-b6fb-937288b90d62',
                systemName: 'daet2zqhtwkeecdl150m',
                executionId: '3b7d8c80-6634-40ac-9a18-95d052bf92d5',
                executionType: null,
                executionExecutedAt: '2020-11-04 16:30:51',
                executionMonitoringStartAt: '2020-11-04 04:23:37',
                executionMonitoringEndAt: '2020-11-04 12:43:11',
                status: 'UNKNOWN',
                channelHash: 'f6zvpkgy60vji06ww91djlu1dm3gzzdrda279hjn',
                channelSapId: 'vei3x7ge0mqne1wy88s7t1nnepcasmimlpapkx2jy9cxrxp5jr',
                channelParty: 'taqdrikma07o2b86nz7nwflz0pne719lpqmsblfhg518nvdlv598kx4gxx6p2di3sy2xz56q6elbqb9wp2ili01aipllahxplne4qewpjj9z6ix1fhh1grk3n19xp8rojd9kyu3q6dpeeeeegjq4507g1uvxow09',
                channelComponent: 'fnp85i7yzia20lhdjlsjv1u7prkgvrkz6390vam02u8xlcm06upzmgoisymsu202ycq9y47uqmdtjp8akdy6g3hb7o0w7vr56h27amtp1xutqabj9ebllju936gie6t5jjmhzmkb92593cpfniqnzyz9pmvv6e4p',
                channelName: 'bux652kv84uh6yhgylg5u9ko3n5vd8yl3cg4vwc63s3809uu03xldzitpvk7315jm7n3h5043nz86h8twuhsdi0xidii676z95atkhxgpy9c2pxhemwycbhrl7gk62tvrus693qg16bq6c83yxua9nzmgmmefsu5',
                detail: 'Expedita non voluptatem et possimus eum id porro. Vel blanditiis ratione deserunt voluptas quaerat iure. Odit perspiciatis eius eaque dolorem sed omnis placeat excepturi.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'b962b77d-a02f-47e6-a100-12b9c34951b8',
                tenantId: '46cc98d5-6415-4d95-a3d1-370a531c6c13',
                tenantCode: 'u11atwvmei80v6z15gybyuldwnn3o78x1netss7pbwr6azfyxs',
                systemId: '1bde9487-292e-4474-b6fb-937288b90d62',
                systemName: 'yyg5i8czwrd1jzglmehs',
                executionId: '3b7d8c80-6634-40ac-9a18-95d052bf92d5',
                
                executionExecutedAt: '2020-11-04 03:21:43',
                executionMonitoringStartAt: '2020-11-04 01:20:47',
                executionMonitoringEndAt: '2020-11-04 11:56:16',
                status: 'SUCCESSFUL',
                channelHash: '6wfelrn9hfa725fqxh2ttahsmth3jc60dr25hdjp',
                channelSapId: 'bfl0rufj8zbmx1cmajg80v0n9aku9ocz5it8npuusyb56e63sz',
                channelParty: '2blh3jtnmv7sna1yd2sg747a0zskncy6a6w72iz8ahofzy3dukre2ep4hu36qmz4mk7oipu0cn63g72zlebqjwvsigjofb9y4kazzddemtkxzi40ix6ik7uie7muik8w6yy9zbd3n5oum2lnleq5y38x3o9rp0yo',
                channelComponent: '2r6os412jg0c1wtdkq8ay0aqrbyd48ytje54hwd16lsw2vdxn3nkhdl2he3yxs1zeflul4rqmemuc9h4lna6kr8e8tazk4nzxw8jtb4paulzmek0z0vbhl57bv29ux61v21qni5c3y8cnmw1nd7mjgzdyf3iciqj',
                channelName: 'sjl7utxpkx2085kroky7y3c9koiz8g1rx1se9437ixh103vu2in729hlosrbkn3wsqi70dtk2g4xqlqd26tdw8hvdppaek05p1eau3hwtvv7upo51l1zppv8hojz74f00iozwctd48pvamaqdf46vjs0foe87t6l',
                detail: 'Eos voluptatem ipsum. Et debitis sed quia reprehenderit accusantium libero. Officiis illum laborum est aut sunt ea in facilis et. Rem dolor earum autem. Qui et nihil autem aut incidunt.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'b962b77d-a02f-47e6-a100-12b9c34951b8',
                tenantId: '46cc98d5-6415-4d95-a3d1-370a531c6c13',
                tenantCode: 'u52ee4xm7oq71tnvr71dejael63dktvicq3429hp5ylpv76bv2',
                systemId: '1bde9487-292e-4474-b6fb-937288b90d62',
                systemName: '0t4x6gv5gtd6othkpfh1',
                executionId: '3b7d8c80-6634-40ac-9a18-95d052bf92d5',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-11-03 18:19:27',
                executionMonitoringEndAt: '2020-11-04 09:32:29',
                status: 'SUCCESSFUL',
                channelHash: 'x9knrimtl2h3x26ilgjbfnmplg7a2cx72vvzqosa',
                channelSapId: 'gc1kfc9weimoej3dbcaaxp9xgfgtafowumymbp1dphe1yq6nw7',
                channelParty: 'o54fi32ngk7ixvbri8c7kfkctpjm6ymkmp4dv1t4gvci48gchjmz7ms74m33nople33t2xqctpz4hut7svy0oim86ftrnqd57t4eipu4ztjxk4f8qkndq33pqx5hsu44d6wcn6m0hvdpf7ds731z6caj3su3mfvx',
                channelComponent: 'axbrvapqwn7j6qjnejwm9zvhlnlbb49ed22jvcs0zlwtec7bx6khbin149yerbs2epon2l6aupd6230g8399387vrb70h716fjbgwafzvoxscfv4d3mc48dtbd5vr3kkek8n72vyjythy6bt1s7mrw99pg3dv9mc',
                channelName: 'cirm1m74x2bkufkf2khy0ckcpqw3hu79e0n6a78mxrzpreym533qpysq2129ygn2fktgvg88p76yi6a0rtk3rygru0s2zf90u08ov2zuvva3bflj73bfqpib9zo7c0libq7dakq30bditpwi0lc901iyhdkfq8r7',
                detail: 'Sequi aliquam earum et repellat impedit voluptates nemo esse quia. Distinctio ipsum nihil. Dolor consequuntur est libero voluptate. Libero laudantium modi voluptas possimus hic eum. Iste autem voluptatem praesentium et quis tempora sapiente. Occaecati dolor omnis laboriosam.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'b962b77d-a02f-47e6-a100-12b9c34951b8',
                tenantId: '46cc98d5-6415-4d95-a3d1-370a531c6c13',
                tenantCode: 'vd1wh28w69469shmi5n7x9pr682qstl1o3bsr76de4my6whchl',
                systemId: '1bde9487-292e-4474-b6fb-937288b90d62',
                systemName: 'eqdpm9vis6d1et5m35fi',
                executionId: '3b7d8c80-6634-40ac-9a18-95d052bf92d5',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-11-03 22:33:55',
                executionMonitoringEndAt: '2020-11-04 06:31:27',
                status: 'ERROR',
                channelHash: 'uwz3xj3m84dhrd7y2r1rjd96fomacee8hhd7hgg4',
                channelSapId: 'zr0w0d6575bo61tc27vhvhn4o114popm8yv6trt25zkx75w25u',
                channelParty: 'ej27wbbs1v3rppibisakqvl2wugranm2gfe0h0wb1k7ck6u75f4ngv9eqvjty39axhex0jtwdrq3ph91qnadkiwbqi72ojsh2bw0vzxujwztn2jqvq1bec362uy5zahc73yyzapmgqb3lwa5omz2sbeo3d88d829',
                channelComponent: 'pmqos6y33eei7zuqn0tjr24p56rz23vy6vo7nnbxns3j6ypxfregj328sy5jdwkznvyhjoqdi4t3wjh10yp99bbyphcffzbtjv3xli9okdc8wsxn1pbddj1ebsj8z2kt5ezo08lhoqfctuapw5696n3qhtm7z5p2',
                channelName: 'fpehd34gpn81j3ed26iuy6vrwmkufsb0lhnampg7ev0kmg9ai2p047l2yykx6kbwcdwknujorrm8z75mls5at8h5wfjg0rbt0ga1srhd0efa9a40lv43tldculgqriyrmvps1n4o7wq0wt45inzoxuqywiig6zkv',
                detail: 'Dolores cupiditate quia repellendus. Nostrum perferendis hic ea eligendi odio voluptatum. Vitae nihil voluptas neque provident eos similique nihil porro fugiat. Nostrum harum rerum aut tenetur velit. Quidem quia magni omnis reprehenderit quidem assumenda inventore. Aliquam qui qui qui expedita ratione quo.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'b962b77d-a02f-47e6-a100-12b9c34951b8',
                tenantId: '46cc98d5-6415-4d95-a3d1-370a531c6c13',
                tenantCode: 'szg8uvvg2smtwrtips8xzka4lv6zc42n1vlryc9c2a3l9n6aix',
                systemId: '1bde9487-292e-4474-b6fb-937288b90d62',
                systemName: 'ruws79g59gd1xej4gatv',
                executionId: '3b7d8c80-6634-40ac-9a18-95d052bf92d5',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 06:34:38',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-11-04 11:26:41',
                status: 'SUCCESSFUL',
                channelHash: 'sggd91gxa4snr3uazvqa3vampwfpwidw966a9cue',
                channelSapId: 'es67xvawius2nj39or6dpmxn85m2vveiboy9bmf8sba8tue4bj',
                channelParty: 'wmmpwzqs5u2mtbehcg59oy46ilxnwhdv77qpq9c61c99o4l3uamci6cfxje7c8ehs9xbafcywljvfcl2b7jtqyazpxnxsxc8baks1lvt9a3e0f43ttfl18bqekunpsjj0d7qasyd9vkuk4dicdtinlrp4nzhhsxl',
                channelComponent: 'j10gok6c3ra6x6n9xpa0x5s9lchrgdoaded0kcmcv3ypi1s3a16qbbekchg26p58bbed6rkvewcj9ufzr7b40iro6aydhyyinf84imt9fb022opl8561avw96bfwon9en5jy8spcfpefqu2teg3ruirmetfve3t5',
                channelName: '06d1e4qnjtgvhk3kozzzk2w6zs2ytrahb5feq5monpbcpdyuwfb6qhr1y6w6k2kz45x6tigmflt2imwrlbazs2e9p1yi3x2z07imc2u18h1hj4t9mguxquiqw6j4u064rrw4up2x327jsmsq1nsku7hcxv6xfd1x',
                detail: 'Enim iste et eaque sint veritatis reiciendis cum in et. Officiis quo molestias. Placeat aut fuga sit ad voluptatibus et dolor quam fuga. Architecto cupiditate vitae rerum neque dolorum eum ipsum id facilis. Quos corrupti suscipit eum ab reprehenderit non consequatur aut et.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'b962b77d-a02f-47e6-a100-12b9c34951b8',
                tenantId: '46cc98d5-6415-4d95-a3d1-370a531c6c13',
                tenantCode: '72q1rtiuyaou599o0dnmn14ee5y0a508sfe4a8kcfdh57ba6e6',
                systemId: '1bde9487-292e-4474-b6fb-937288b90d62',
                systemName: 'dlozif2w45a2q89fhdbk',
                executionId: '3b7d8c80-6634-40ac-9a18-95d052bf92d5',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 14:20:25',
                
                executionMonitoringEndAt: '2020-11-04 08:18:44',
                status: 'STOPPED',
                channelHash: 'gee8boa4vhvooe4tlfxolpjht7v91txor114rode',
                channelSapId: 'vzmkzgfhpkc7x8n2kbc1kez41dut8o5ywm3liq3i0eui60zn7m',
                channelParty: '2i0tuay7268rwr6oq7bs9htmuvp1oz57jnijqsp247ghuif09ezuuyzrcxhsums82st52nh4uljvu35hebhol7htgcrfz4erulu6qzik4z9sfgocys6ut0j85hqnndgew5q4ffxtd66nwysq186x5unoe1a7bmpd',
                channelComponent: 'j49r62l6jd5zinlbr2710cnn91q0cn0gp5sotci633z2ca72ny7t9lk2mvebwd0jdtv17tejk46wp3l99q0voy0wlkk6sh5aslsq897yuebztwsr8hdi4t83fldchi2jq2lfbh75pclchgi6ogwvo48rz7pnrw9p',
                channelName: 'pybrw8jlhaeddei938p9b7vdu1672slxd95fw9zclwtqrcyn5sszxbd85yri69oakywem89v0kiihlofl6rfi1lciibzqo84oxtq5m9b7aouchsswvr93ewwus7ccey4kiiiz9wmwuycggdljmcs0mvsdnk8i7qj',
                detail: 'Error quis accusamus dolorum alias veniam est. Nobis et commodi. Ut blanditiis dolores eum ab recusandae et qui aliquid repellendus.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'b962b77d-a02f-47e6-a100-12b9c34951b8',
                tenantId: '46cc98d5-6415-4d95-a3d1-370a531c6c13',
                tenantCode: '8l6zitreem5ytzl6oc54qo3r34cmkwbsusvnoeohcjw3mkwtvp',
                systemId: '1bde9487-292e-4474-b6fb-937288b90d62',
                systemName: 'neyw79cerd7tpnd3rmda',
                executionId: '3b7d8c80-6634-40ac-9a18-95d052bf92d5',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 15:55:47',
                executionMonitoringStartAt: '2020-11-04 06:22:00',
                executionMonitoringEndAt: null,
                status: 'UNREGISTERED',
                channelHash: 'qj42p10q9e72qnoef1b5nttdbf78qgyauv8gynyn',
                channelSapId: 'oaxg6osok5mlwuc40txkhsof0tn883fmwagct4idmosm341jy0',
                channelParty: 'pplbx48pvvtk678rwfim5pzqg4u7z5solpuwdivfw0wwddzx0u9lkayaxxf142qkn7scrb4ytbnvr7jzj8y6boebasb0yu6rpss0nkgwvh6ivntuceh57iff1ngsg86ez4aiwfosj5a7h3te7ooouskt12g8ng9t',
                channelComponent: '9bxe7m2rdv38shd6f3z9yxy2s06kxiseyk3fcqvupd8vjq0vkft1ho7kz384ldql3lanjp2b0qdeotsbpko1xzs0limlb09qwn6v41qk8ejwisfr8tmdmutltfrvkv616oxxjxao3hakthmupgbi3kdzok7fo703',
                channelName: '95fw5ds44cdt8faxzbmojlozsxw06zp6ea8z8k884gczjf9lyi6n3f0yaq3u65b40p4vbcil4rque23tywb7m7majerqyi4wr6n955e76wyf0sg185o7kr100s24ovdwm60tl3ckzbra11o5owaxzf7vmeln7mwi',
                detail: 'Quos nesciunt facilis magnam voluptates voluptas. Deserunt in error dolorem harum. Placeat necessitatibus iusto enim aut eveniet ut sed.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'b962b77d-a02f-47e6-a100-12b9c34951b8',
                tenantId: '46cc98d5-6415-4d95-a3d1-370a531c6c13',
                tenantCode: 's1y56uumyatv0efm7dcntjfunt1eib5lbfiy740m89b5iyf8ga',
                systemId: '1bde9487-292e-4474-b6fb-937288b90d62',
                systemName: 'xbfgbk9wdjrtph024qkc',
                executionId: '3b7d8c80-6634-40ac-9a18-95d052bf92d5',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 13:32:20',
                executionMonitoringStartAt: '2020-11-04 01:34:57',
                
                status: 'STOPPED',
                channelHash: 'jjmcq5bi0zliwn8ayu2bz48xgjmc1sxhi08sxxls',
                channelSapId: 'i0m2rsemvgo3dgzhoy0xwczxyt7y2uxku5k67locz6uezcd2e0',
                channelParty: 'p6vqpmmyxzvdn50mat8kzlf5udkexx3azugi3cnsdccuc7zl9essp0ij367mvjjiscvgsv6hax86ols7e7kqvkyrjkdjrn6qhj79r39qihsgalagpq4gzgs2498xh14lhnba5fhn9cg62ex6ft4bsdbqigjc74t1',
                channelComponent: '5410ka0pbhfah93vmr1v0lo9vgua8y060ywd5i1w03evmsd8w0hh66opjpsgj0j75697hbof8arl60q29awa6llwcybmmryzxueniynlbe24hshffn7nh2dt81odzaiaxak2pu0d1n3pgo8agij50kruelwy6oyv',
                channelName: 's38ee9arjcqqewhyftgdha15jyr7sc52wkc3gy4eq56tgw0d1w1696x5zb507ynqxfcjjz0wiqg2vvr5bgvvjdifp0mvqrrztd0ekeftvibgsu2unk5wyjirsrnp23irk1dscxgvq7yzhkierx4dhw6xs3vigd2h',
                detail: 'In nihil vel omnis est rerum voluptatum quod provident et. In consectetur quia eum quisquam porro voluptatem placeat fugiat. Quod consequuntur excepturi voluptatibus.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailStatus property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'b962b77d-a02f-47e6-a100-12b9c34951b8',
                tenantId: '46cc98d5-6415-4d95-a3d1-370a531c6c13',
                tenantCode: '4c59kf262p7ngip8vmv536ydo2mekrr1mn0phn3bn7gt7i62lu',
                systemId: '1bde9487-292e-4474-b6fb-937288b90d62',
                systemName: 'k52quyr56z1z50o3z7g7',
                executionId: '3b7d8c80-6634-40ac-9a18-95d052bf92d5',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 11:12:12',
                executionMonitoringStartAt: '2020-11-04 01:15:35',
                executionMonitoringEndAt: '2020-11-04 10:18:24',
                status: null,
                channelHash: 'wffdz3j1pzqwwkfzm4i8s7m1xz1mxig87njkfiap',
                channelSapId: 'f3jo6q6h9kg9l5jc1vs7flc37fhdga0rkicnx5ov6jiyn2j85m',
                channelParty: '60nmp5sp3xjkxzjk03ib5hk01l8p8c9qgje4nm0t58llerypujvfxdagfi6y9f3sfu1dpvwgkg14gqdd9uwugxje5xfnzl2b7ktcxeziar7334td63c4w4hwns2d7zax0unej2xypg2vs3a3qcl6t4whzmop3382',
                channelComponent: 'hz3ypzva2ok2xw37gupdgtjwab984sq3ghxntcht2wyor2dcd17rk9hjzfzk0qt8j6wtsc5m6i40fwf5ezkmdylx9bm7y6eu60tz0iw6gupe9qy3e3nk21eb57tbedvltp1c0malt0hreq59jykn4vzbtb8y335b',
                channelName: 'bcllttd0wwwez61eg78w8a1ledmrz5uwaq3s7rrsgx0gk3txdm8kxveqgfd1qyh49vdcbxysoyw0soq1l6mywiie16ld191c6jrnxh4tzmeah21spxmvhuacy0tlrm33apji06g73pylwzlgfr5h0jgl2hrvky6x',
                detail: 'Illum temporibus corporis nobis eum voluptatem unde ullam sit modi. Nesciunt est nam expedita itaque quia tempore. Corporis praesentium quod ex voluptatem enim sint beatae ea laborum. Quo aliquam reiciendis.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailStatus must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailStatus property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'b962b77d-a02f-47e6-a100-12b9c34951b8',
                tenantId: '46cc98d5-6415-4d95-a3d1-370a531c6c13',
                tenantCode: 'k61fksllykmfsx937kw3v1ead1jl2zw1t1co82sanugtq2nkxd',
                systemId: '1bde9487-292e-4474-b6fb-937288b90d62',
                systemName: 'fu0vmkwhmkdqxw25tq4z',
                executionId: '3b7d8c80-6634-40ac-9a18-95d052bf92d5',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 09:45:42',
                executionMonitoringStartAt: '2020-11-03 17:49:36',
                executionMonitoringEndAt: '2020-11-04 05:19:43',
                
                channelHash: 'rtw4arrxqx9al2lggald7mzjeb8klvizlbgxnasd',
                channelSapId: 'om4izve2iittjolx28g9mu0etmzw866udx1byr8germ5tq9klz',
                channelParty: '9hnj8q2y2ex9rnfw7dx664umljb37sqfyyojzjbu0rmx47c5c3c43qfvrbu6ay7zoqowq8oa3mr1162o40jdn12fxyyeht74twq41ecrojykuppoufej5wo8k5ukbiw93pg8t714gfaccxuht7p7pdcz4x5yney3',
                channelComponent: 'p4hmy8pqvx8bnqzgrqu4i34j2cjm61rf4auonilm1k6t2undgv8nvqtr699jv2tyq9lrj4bwhsgtd2742gy7ebzzf1e84b3gwomjmrd3gw0m0x1fkghalv2dnzj22tri1rkqpx3uw01tizbifd6znyduk6iwxkzw',
                channelName: 'zr5quqsclkjt7a9zu4eytte95gs0tl064msmhjq9vrpztytsjhl4p6gr1veb1ai4dz6aov4suo2x0gtc6p40an7r0l17xgkmeooexn83dhmjt64s9r88njqm4nki3rnfthvki2c343b4gqqangepzzlzayo5aknb',
                detail: 'Provident hic labore saepe est molestias minus delectus dolorem. Quo non sunt cumque nesciunt voluptatem nesciunt qui fugit aperiam. Totam similique delectus sed fugit consequuntur ut voluptas libero ipsa. Sunt mollitia molestiae. Consectetur sit rerum dicta tempora.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailStatus must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelHash property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'b962b77d-a02f-47e6-a100-12b9c34951b8',
                tenantId: '46cc98d5-6415-4d95-a3d1-370a531c6c13',
                tenantCode: 'mfmjwiozrwqnfkhlfpzyog8izo7bh6yxbdx87cwuam5noxg7gd',
                systemId: '1bde9487-292e-4474-b6fb-937288b90d62',
                systemName: '8k3gfo9jwt08ptkrobe1',
                executionId: '3b7d8c80-6634-40ac-9a18-95d052bf92d5',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 07:25:24',
                executionMonitoringStartAt: '2020-11-03 22:02:53',
                executionMonitoringEndAt: '2020-11-04 07:48:00',
                status: 'UNKNOWN',
                channelHash: null,
                channelSapId: '1fb9hypvldovi33i1lrb54b5299uya6axdggbgiyn23bbkgd13',
                channelParty: 'vzg3p2kvuokild82oyu55c6xs0lwndjaspzch739k4xr8zyef6tcu8ly9cmhz6fuowqdprdlf6wtbd6r1raip3z18vsi1p1h7n9mgpw03vwxy594h662uw6ozcworhbq2xfy1b44ikuhn6xo1dk86nykd18c9lhi',
                channelComponent: 'v2e38juny61le3teuho0mp32d6wwezcuk481tvu78ecg6w85jua0ty26490081333i36ntrszzbwpxj2dt1xw57khtrgtejhgdlm9vw38mfziyec6se16ti7b92z62dm07acgbwxlsqz0k9ak37bd5ebtey7mjoo',
                channelName: 'ob2kp8rhbvwi1p1kfgz55z0t9wg73x38y52otsfked1tatiqywiby62cn72mra5mfblzfcnt8ke0up8evxg8puoqumwscfanigw4fxmz60bird5mfzuhm3wvy3x8pytui22bdqjz6o9n4tstpme3rxkp9cu435b4',
                detail: 'Sint incidunt voluptates aut et cumque amet porro qui tempora. Provident voluptatem dolor non est aperiam provident placeat id. Nihil voluptatem neque. Iure voluptatem dolorum ut dignissimos facilis. Sed sed quo corrupti sit aliquid veniam.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelHash must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelHash property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'b962b77d-a02f-47e6-a100-12b9c34951b8',
                tenantId: '46cc98d5-6415-4d95-a3d1-370a531c6c13',
                tenantCode: 'ctnyfowx241wwugvbjemnxkmuab0jowet41na53snnh71dtrtg',
                systemId: '1bde9487-292e-4474-b6fb-937288b90d62',
                systemName: '5ldui6on6d2h2pcab8f5',
                executionId: '3b7d8c80-6634-40ac-9a18-95d052bf92d5',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 12:16:54',
                executionMonitoringStartAt: '2020-11-04 07:31:46',
                executionMonitoringEndAt: '2020-11-04 09:21:13',
                status: 'STOPPED',
                
                channelSapId: '9bvhdr5maze8qs4ookkchau2e2ha7kzjp9lggblvokx327uvza',
                channelParty: 'x2sslogg7efxfqoswgaijspq92a9zazb7vezrtvg6ta655ilqq9p6uqw1yjx3uemqbihexixtus79z9uevw4kyet6y26l90zg65vsu7ch6v7typqmtlw1xkosfpi0w72wx774o21ji78ktdd4y03s6ceeekyh80u',
                channelComponent: 'kpq7gk5hs59b94jxivltjxgvp1sfw6g3cpl7nrciboe5899d7jtc55q2utswro8qf2ixoivqzihcvpo68arapt3wotin8ps16xyp8quvwn1wmu138mxkpwam5kriaq7osar5vjqwpmfelt7gjgo0y3kszsiijr4y',
                channelName: 'rsgf6zun8gvxkcw5giik33p3srv704d3d31i6a1y1q12yt85tmvqb97ac3vfi0dotiuax75kqpg2iwj5whgvtr801v1goareo0iihvxarudiwvi73x5o7fkrfqhm6w3o25qjrgzdfwbjpxsnvvgpvzjoo6jpf34v',
                detail: 'Aut unde veniam. Iste aut perferendis dolorem doloribus et. In ut porro corrupti enim ab. Ut quos praesentium fuga voluptatibus vel.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelHash must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelSapId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'b962b77d-a02f-47e6-a100-12b9c34951b8',
                tenantId: '46cc98d5-6415-4d95-a3d1-370a531c6c13',
                tenantCode: 'ecb2apq51cnrlaelb2c9ov2nfynyf0mqnauzcowh8uxd0a0nuh',
                systemId: '1bde9487-292e-4474-b6fb-937288b90d62',
                systemName: 'zlnwlcibz0ok49gcc2nb',
                executionId: '3b7d8c80-6634-40ac-9a18-95d052bf92d5',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 06:53:07',
                executionMonitoringStartAt: '2020-11-04 07:56:55',
                executionMonitoringEndAt: '2020-11-04 13:12:06',
                status: 'UNREGISTERED',
                channelHash: 'bm6wcjadf24wa3ccihjyl6udfemn2k33inbluwuh',
                channelSapId: null,
                channelParty: '0qi526zu39jdk3le2xau12gqrlyuqfzqjjcrvbsrt14xpga9xljc807zn139inike3ko2y3ent0ioizxuvr4kpgkkcx9970vya8uklwvkfn6mh4o8b7vy29ggqvngek1k2hb45og3cx3kbq3jujf31xbl77um352',
                channelComponent: 'nbye2o2byft0v2pqdnfs5i42ysnlt4p6u19664romj4a3e6ej9xn15ufyjgjyal4ostpmsgalfeawrc45xmpt57athgqbsazwdr7vbhmkystjoldzglh7yn539vz4b2vcpvcix4vqztjaqdrkaq1kdma939848ev',
                channelName: '6e6lqt902c312186yeuvy23jkoft9ckanqzrniy0j3etwhelaboyhdcjgp5qw098sz1q3p5t3oi4jun34tb1z1sya41uu05s1p1r3j8hb481mf0pdfpxvhf8hgk1hio9wlnv46v6zkelpr0uq8frgsoytkfk3ew0',
                detail: 'Sunt non laudantium sunt dolorem ad et quos possimus distinctio. Architecto rerum corporis ad officiis itaque. Aut magni dolorem ut iure quibusdam pariatur hic. Hic necessitatibus iste nemo excepturi culpa voluptatibus.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelSapId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelSapId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'b962b77d-a02f-47e6-a100-12b9c34951b8',
                tenantId: '46cc98d5-6415-4d95-a3d1-370a531c6c13',
                tenantCode: 'es9dzsunki6jnl9ouhyabpx1sxh59rb7dnqi9tsqdyvijrmkxm',
                systemId: '1bde9487-292e-4474-b6fb-937288b90d62',
                systemName: 'n5jti9523f2z4xk03w82',
                executionId: '3b7d8c80-6634-40ac-9a18-95d052bf92d5',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 05:52:11',
                executionMonitoringStartAt: '2020-11-03 18:48:02',
                executionMonitoringEndAt: '2020-11-03 23:50:07',
                status: 'ERROR',
                channelHash: 'pmp9xlquo04u5unjoxrwr7tgg26h3gqih8d1nop4',
                
                channelParty: '6rhb1l26zud8s4rns8xah4bakjb0j6m7vh7o4i3t3x3jcbmunr0sbewnl2bc9afttcxar8n9q9de0i4ngbyre0an5qjqmvgdiwptgovzoh3kqa7tpfqfofrnedtu1rcqd5scdrinlyodt0r3ptbb6xbq63bdy9sb',
                channelComponent: 'e5j3d5g3k51a7a3fkurqsetxbql5an6vjkejvb40ft1f3lcsdswro1f2u98jirubgiunq8e5scc9cnsskxw74ayx7ha1azwsj6h9u6y43dnotj5wmnhfo15dfuks0q1sijaamnfhsnaivy7cv6nqi28793zw97f9',
                channelName: 'xc29vgrurj7u2d8ryz9q6fja41c5spw849aclt7t03vj8ayzkrzzxumde0grrd0rvcos0ahdjfjaok6x7qusid6kdsusj1f0di27h1qemuuzgn4v3g2fgv84ccibkl5ic3rxzot89j7c5dnfljojuxfpezklzxb7',
                detail: 'Eum omnis et sunt qui nulla. Voluptatibus perferendis ea. Dicta necessitatibus ipsum ratione hic consequatur et inventore.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelSapId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'b962b77d-a02f-47e6-a100-12b9c34951b8',
                tenantId: '46cc98d5-6415-4d95-a3d1-370a531c6c13',
                tenantCode: 'diwz8wu2cjl31fw8d7wt2mzh0a7a578mfjog07f9acqm0ljcak',
                systemId: '1bde9487-292e-4474-b6fb-937288b90d62',
                systemName: 'jilwegcbna1wqij33vn6',
                executionId: '3b7d8c80-6634-40ac-9a18-95d052bf92d5',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 08:10:06',
                executionMonitoringStartAt: '2020-11-03 21:08:17',
                executionMonitoringEndAt: '2020-11-04 04:24:21',
                status: 'UNKNOWN',
                channelHash: '9w4l9zku8dv4nsxxwcz7grzkyw48gxeadjvb4e1o',
                channelSapId: 'ii8fikvu05z9xx16ttiqtth5xsej6g4quxm77j0re0138vw8pw',
                channelParty: 'zuzawf5sv744cqab13x7vfcss5479vsq2paookw9st9ifppnlrf7p6di0s7yom9myq9bba7owr5dpl4mrwo5hj6exft2pq7xty9vsk8uloz7auedj2t5k3agef24ylapwpk6a1ak9107wcgqiof48zpdrn4fvgha',
                channelComponent: null,
                channelName: 'k02t8en049nj8u53bezawpmiw5vmg57k6ns2qk53z3rh4xgxl296krz5963y5m9g7ahdqgc6lniysou0m12n93ytt9k44ywuysf93fiz04tqa48hzia6x1r55qwb8b2fvh6awha6tgaabkyqou75lsl7woylskuy',
                detail: 'Incidunt error voluptates. Nostrum voluptatem provident enim unde quos perspiciatis. Voluptatem quasi fuga sit non omnis.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'b962b77d-a02f-47e6-a100-12b9c34951b8',
                tenantId: '46cc98d5-6415-4d95-a3d1-370a531c6c13',
                tenantCode: 'irerkld9vg36lmhb1yp8lmfpf1r9xfsixunm4ht8zll1hkwbxw',
                systemId: '1bde9487-292e-4474-b6fb-937288b90d62',
                systemName: 'lqsx88jjycrcpq0uo72s',
                executionId: '3b7d8c80-6634-40ac-9a18-95d052bf92d5',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 10:45:40',
                executionMonitoringStartAt: '2020-11-04 01:01:39',
                executionMonitoringEndAt: '2020-11-03 22:11:33',
                status: 'INACTIVE',
                channelHash: 'x1k7pz255hdwi2ghe7jf2hp5383kwkpc7jg3yvk0',
                channelSapId: 'kddyifycz9ame6zgposfbi9ux8vixyyc7mz67wfrv538r3qvwq',
                channelParty: 'oslxvwfobn9dflu9wex46utxe5j9t780qgtxblotspresjjem0jmkmg5j9ghjnzau3mlb4ir8rxe1of5411rfd0lepcxi4fh3o5d8ad5nmuv3hytj380sh93nlmacdeksgtol25fvwmm6y0zl1ab5v4c6bwv2707',
                
                channelName: '16frckely5ihs4vbyga3lq9rk9jo255gmrcld5kosvcdc4rqb65151isuxsp6bl0pn1aesh4hnhj3zelaa9jx8fwcm0hiz4dvzwyf7qxr2thgnut39ft55bv3uypydna59klxmt11tf7z0a9p2u8j10coraw6x32',
                detail: 'Quaerat architecto odit incidunt nihil qui ratione et provident quasi. Nostrum explicabo commodi dolores deserunt. Sed debitis labore id. Quisquam sed dolore. Corrupti non aut error illum ut sapiente dolor aspernatur nisi. Facilis dolores pariatur veritatis ut omnis.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'b962b77d-a02f-47e6-a100-12b9c34951b8',
                tenantId: '46cc98d5-6415-4d95-a3d1-370a531c6c13',
                tenantCode: 'qibyk4693o9jg7s1hzfz1tbxmwi4bbp5am6mjr9fcbl4r6fnzi',
                systemId: '1bde9487-292e-4474-b6fb-937288b90d62',
                systemName: 'qhngw14elqba0lfy66t6',
                executionId: '3b7d8c80-6634-40ac-9a18-95d052bf92d5',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 18:07:47',
                executionMonitoringStartAt: '2020-11-04 10:53:46',
                executionMonitoringEndAt: '2020-11-04 13:23:38',
                status: 'SUCCESSFUL',
                channelHash: 'zshhsv58rxeumwn4retdcjm1wfw11np7pzbpd9eg',
                channelSapId: 'ux83em0bv01dxfdreoh7gjudch5vbdmjp636qg7tvrdkcq9vbm',
                channelParty: 'deyd5ug80rfxhwccjh7463fzhofchjwi9hrbh1r1dajh6w6kjl97wmb9th6dnkyy2ym4jvogv1blto0tj8465cvquihuho5qebm3o6mqmpep0vr1urdqw15xykbstq0spqyffrolyn4fj29a9hpqkmqxe587kd9v',
                channelComponent: '93wkwp37w5jqzyam2ajcuxnaw7qyboam3sfm11jponvhhpwv82jrfb6b3imy8swxlip26aerwenrg7kkqtxvrn52pg1e1fqtzsjg1ftbrosng5803csi09c5u1se9wjnpn6txkat88dxpbwxxkajjqn49e6twava',
                channelName: null,
                detail: 'Cum sapiente eligendi omnis fugiat. Aspernatur suscipit eveniet quia aut magni ut. Velit totam similique molestiae ducimus.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'b962b77d-a02f-47e6-a100-12b9c34951b8',
                tenantId: '46cc98d5-6415-4d95-a3d1-370a531c6c13',
                tenantCode: 'km2orw26uvj7otyikpe869oyssyqeei069micvy4aygnfey8lq',
                systemId: '1bde9487-292e-4474-b6fb-937288b90d62',
                systemName: '80ftm5z70cml79gfvpd9',
                executionId: '3b7d8c80-6634-40ac-9a18-95d052bf92d5',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 01:44:18',
                executionMonitoringStartAt: '2020-11-04 17:01:42',
                executionMonitoringEndAt: '2020-11-04 11:58:00',
                status: 'STOPPED',
                channelHash: 'kbm7k47yd6fy82a2o1irlj9v6myztortk41ub34l',
                channelSapId: 'vq1viu470w2uwqgys4su5qhkfo62zdsdownucn6zm61bsrax4t',
                channelParty: '9rls8vfit5c3xtnuxkvcrnup1h6ayqnrahfjro8qmjbcxoi81xazpi2vzylqjm1ym1ncvybklhnwicea8inr4b2k224p9hx5y4pwp149o0y4zn0yp7oswn9ney3xa4zkjrbyq91xch4qxz3eb1kxmzbw1hdm6648',
                channelComponent: 'izfdybvj3hi1qhhxcnog27q28gh2l55also1mapogx0q0jeptivednn00dc34x8wwgn9r3bdb7usyf50eedk3ntucgatubcj7iphdul6tjcp8q8xgv2q4qy9ova18thbh2peux6m0zy57lt6x1evcnaje4pt943v',
                
                detail: 'Quo ut nemo libero. Perspiciatis debitis eos nostrum et amet harum perferendis ad. Minus occaecati exercitationem provident dignissimos culpa doloremque.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelName must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: '9hymf5pbs0vsblp55gstxki7yijcs8dhvbnu6',
                tenantId: '46cc98d5-6415-4d95-a3d1-370a531c6c13',
                tenantCode: 'zziurygmpoffw0zr128u3vahrptmt5fo6ztoyt0ugxgbzp74ni',
                systemId: '1bde9487-292e-4474-b6fb-937288b90d62',
                systemName: 's29mf2h8h3wiqvn5ibuu',
                executionId: '3b7d8c80-6634-40ac-9a18-95d052bf92d5',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 14:13:05',
                executionMonitoringStartAt: '2020-11-04 11:22:33',
                executionMonitoringEndAt: '2020-11-04 06:31:53',
                status: 'INACTIVE',
                channelHash: 'k0878syq0jqvw7kajhmbzfind9mr7cwat1gsbkby',
                channelSapId: 'lms26jc7wcp1f1ej5aa98jl6d60fxdyewu4lcylosf7pepb2x7',
                channelParty: 'pr62gsopjvct5jnl7ep0u1jc7pjm90q999q92p5kzcwd2deayunjtq82z2gk5f53dg3695fejkd54gradlb52f2w1vysshjfbd9cuabeati3jlanxglqah5b9y0khu7omnu3kalqw2ql4pujhmqky3ndwgn1p1gp',
                channelComponent: '1uscwi8hdzir5qwoquzkg2b9bj29z63qan2e7zs9m7z1i8f901t7613qxoekifty01vd2wfs50xvs7m7kjzvfvwypn84b1dasthif20c9j0c3cz465btxerk7rqw36z6ranaf5lyrp9f2twxt1hmz383lmx1fu3a',
                channelName: 'evq8k96dzn2p923cw3vvr7swr439yu1voo9uouq9qqpxfjqgfj109g3o2vokxpj1j4m8d69v69c496lyc7ouo9honrvqngsho80qekmet7raf7k298yn3h1yeki1uc5z02hx7do30oa8b2kuavrsa8fruduoiev1',
                detail: 'Veniam neque repudiandae incidunt sequi quo omnis. Et eos rem qui beatae est omnis excepturi quisquam qui. Cupiditate consectetur et ex est animi. Nemo deserunt qui a ut laudantium consequatur.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'b962b77d-a02f-47e6-a100-12b9c34951b8',
                tenantId: '8olo5ib8xmvve2q2jhheb2lolm4vgfy1u2kpn',
                tenantCode: 'hfyd0n4rq54rl66l1834tj372hsbq4jbh3kwopnzonj6cmk79l',
                systemId: '1bde9487-292e-4474-b6fb-937288b90d62',
                systemName: 'qalumv7uxaqx9miffb71',
                executionId: '3b7d8c80-6634-40ac-9a18-95d052bf92d5',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 09:56:52',
                executionMonitoringStartAt: '2020-11-04 13:42:15',
                executionMonitoringEndAt: '2020-11-04 01:11:46',
                status: 'INACTIVE',
                channelHash: 'nx13fotxhf6km1mxg45trunwrrps2p763r840al6',
                channelSapId: 'pld6m8wn77garmyu4nf3pcztszukpf203vy0w0670v4ysnjpvw',
                channelParty: '7k2wnnaiux8p03kzvk5ce98pdvunib0o54zk7a8p214oyrct9egq6y6pi2gcidp8kl0stob0t0w5rv5lpyzj7q25whwxulr0djhaatxcdsxg7f7qtuviw5tl8awwuy4fvrhh177w2li2ybdu848guor5j7abvlfr',
                channelComponent: 'tsb39mp5v6i9llgjhbuudmy4txx51a7ff32egwp9itfd8lzazu99xq6ml0mw8cfvjp63ln7b38xp36sify01n915m3wgs3qmttqfk5o4oqhuft155ze57qthvwes62c73phgpzwbk9ntymm081zol1agklz2vtbo',
                channelName: '194mopeq2xil6cuse713r8tcgm6e4qif1msayv73fl67i9qvpgbbdrd79gz1xz4cswb1nmuf34uf07cmu6rrohnndr2upw88xb1904trgiciyyjmhx64ybl1v2omfc3mq178vtg9t2s850k4xdm6kvejk0mqnrim',
                detail: 'Beatae perspiciatis velit qui delectus eum. Maiores qui voluptatem totam eligendi molestias et ipsa velit quas. Unde qui est quae. Omnis ut voluptatum labore culpa architecto quo ut laudantium dolor. Id vero voluptate vitae doloribus.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'b962b77d-a02f-47e6-a100-12b9c34951b8',
                tenantId: '46cc98d5-6415-4d95-a3d1-370a531c6c13',
                tenantCode: 'ujt3b1i6vgdn3xjubyfq6nkakxhwjf996pc3wvo38cn58vk51y',
                systemId: 'mp0dehtwawotifveh4f3pf9g9abzreobjb2m7',
                systemName: '8y3be80zk6wbebwyz2p0',
                executionId: '3b7d8c80-6634-40ac-9a18-95d052bf92d5',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 07:58:01',
                executionMonitoringStartAt: '2020-11-03 18:31:05',
                executionMonitoringEndAt: '2020-11-03 20:25:19',
                status: 'STOPPED',
                channelHash: 'fgwhgx4aeoexxj68rqqkx5p4yf6v64obr2y22qhy',
                channelSapId: 'raljjcqspyodu0x6v19srp61ghrokx4lwyzllacc53bf65rkg4',
                channelParty: 'vectxx58j6585f92zbd9zx489f0a7780aieehlk76pd03ujinyrkhl33zzdqtcxlqfjz12frp8f4bt4bcvoecsl62wa15x6gdiikb5tg36agp9whwbfmcx5r15o22camsw43j4u1ctw1e3xdnkqs9jukfnzeef7q',
                channelComponent: 'u1dplc76rdxevbbfhhjr0hkevd2543ivifbz2jvpyuas504hfwj4aaoird2mnxi864fpy8ctw3jhlog6bhap2crfftld937o2wxlvc9cjdaon3igtz4lo939oytnesq2dvcbv16ucxsmiytfvygqpa80pttpoy84',
                channelName: 'c0i8mzaa6nay38jictysy18fgm2y0vakv609t66y838whgzytx8mpcy2bsj3acu1b4fy4ckcrd1si798hxt2h9r6kns861nfl1bqbltywe0zi4u5st8hjj71xo33ye37qhcj6qsxz9p4ustnnaihk9k822tayuej',
                detail: 'Esse tempore et ex numquam eligendi numquam illo facilis. Quo dolorem omnis voluptas atque voluptas tempora quis aliquam quia. Ut rem placeat ipsa. Fugiat et officiis dolore est maxime. Enim nemo iure quia fuga ut eligendi vel. Laborum illo iure ea occaecati et.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'b962b77d-a02f-47e6-a100-12b9c34951b8',
                tenantId: '46cc98d5-6415-4d95-a3d1-370a531c6c13',
                tenantCode: '0nfh4weosw2mi0f7x78ddnluh3h6xf721p4won8qop6two5ska',
                systemId: '1bde9487-292e-4474-b6fb-937288b90d62',
                systemName: '3ftl7yksf2l9spnd41qh',
                executionId: 'l21nooq02lvkbo8k5kms12cbjpw46hczc2kva',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 18:38:45',
                executionMonitoringStartAt: '2020-11-04 09:40:37',
                executionMonitoringEndAt: '2020-11-03 18:43:00',
                status: 'SUCCESSFUL',
                channelHash: 'b86a66o3g92arcpl7ray26rkgdk46gz6pyctcpo6',
                channelSapId: '5upwvkgd5tw1rq0igqzncghhlt8vou87remslfdimrt1cmwr3a',
                channelParty: '2vnndb4xy194l4km431jvu4ttwru6s59ubg9d3chdo0xbe7k7mijo5y0bpo3qk9oji35wbkig996j1ekrtwbmkumkxe4olvpvvvcjhfwkll6fggziv49v7b912jmnsafa8xj6etxkt2uxzjgbel76lifuhip59vn',
                channelComponent: 'nlzijxymyhcyq1eiyetsb849onskwg58i9g0xczozwdalzwrlbia3n42qc5oac967u16tg6jlbtk3ox37soferkt3bm6gs2x12duiraulu7jhqw2zt191nkpra8fa8s1gsy8v80bk6vmwszelvunos3nr1vhgfvt',
                channelName: 'r2y7yfvh9lwf1hanlaofwpscj42wu3334zv6z9wcytdfxd8eryn6pba5kuwjm3t5gx05ia0t2otwbhs1hgvqpoxi9rbmtitbs52yy644jwrmayr9jb6y12epw5t5aots2vskr7wsh24hkvn41p9rvoojg3v94u7e',
                detail: 'Hic veniam facilis illo praesentium tempore voluptatibus. Nulla molestiae consequatur voluptas tenetur ut exercitationem. Alias vel distinctio et et quia qui.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'b962b77d-a02f-47e6-a100-12b9c34951b8',
                tenantId: '46cc98d5-6415-4d95-a3d1-370a531c6c13',
                tenantCode: '84spirwv2uiqgrdygiyxqtyn4qwup5n1q7vkgxt2eei2fu5788',
                systemId: '1bde9487-292e-4474-b6fb-937288b90d62',
                systemName: 'zsjyamby0s3zpe40gptq',
                executionId: '3b7d8c80-6634-40ac-9a18-95d052bf92d5',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 07:55:09',
                executionMonitoringStartAt: '2020-11-04 10:09:10',
                executionMonitoringEndAt: '2020-11-04 06:03:54',
                status: 'INACTIVE',
                channelHash: '4l8n01z28g9evtpc53x8vhm72hd80iyza4lhri3pw',
                channelSapId: '12rxocnivosx5092dahvjpu2att0j9143up2ic6jd414vfqvwk',
                channelParty: 'eougxthub41ne4r8yawmgj1nznndamq9pi7k8nfrynjycascr1tpvgcjhwj0ag2ujxj8ax4dp1q4kfywgzocufwh3i7pzzaczw4b6vyxt6xj05wjt8hni6f0j8lnxgf1owxao2xh3a5kickl8lvqgh8hrlm8ata0',
                channelComponent: 'lr4vav5tqsbsja7ejnrxbxse2tttgm1csrdcsiiwc2jj2h45hj1z2hmx4dca1jj5eeqqqaiivjgasg5p0ucx4iw7ic2yf8jqf8107mvwv31cr5wwbkax7hhgnaeruj7ehsr0i6cb0312lx18epoja7kq4hm23ej0',
                channelName: '3xkibqegbzhao6ypdh82flftnu98ik9754xlato66ok7xcmg7m9cof0wxwl1d8yt3k2hbhsd015twujmwo5fmt0d7rd2hc7r06g7nfre1lqpx1uc6cey2smlnth6wbxqfrdlep1wa85oph5uibr1slymb6cji3p5',
                detail: 'Asperiores nesciunt dolorum sed. Similique non voluptatem voluptatum esse et voluptates. Cumque consequatur repellat qui voluptas quia quia. Nulla voluptatem at.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelHash is not allowed, must be a length of 40');
            });
    });
    

    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'b962b77d-a02f-47e6-a100-12b9c34951b8',
                tenantId: '46cc98d5-6415-4d95-a3d1-370a531c6c13',
                tenantCode: 'qz70vgwr4gi0v9asuehpvos5a1nxru7vmqypyyjmot5wr64wy02',
                systemId: '1bde9487-292e-4474-b6fb-937288b90d62',
                systemName: '1sh8r1cfes0tskihlaxp',
                executionId: '3b7d8c80-6634-40ac-9a18-95d052bf92d5',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 23:42:02',
                executionMonitoringStartAt: '2020-11-04 16:47:50',
                executionMonitoringEndAt: '2020-11-04 14:07:44',
                status: 'ERROR',
                channelHash: 'v5xryw9vq13k29fejfalx9yigpesikrqdppz5hz0',
                channelSapId: 'camkedn65n8xt5zp6cf3ehpjcrhmq2kkvsez2tf040p9vrcowc',
                channelParty: 'd7xdzark4br84o0sem8prn0qvzccfqr2h68z2ckygl06mvzdpf7b5zx6pxq8d9fq12460kcggts5wav90686acxb0n6v6beyt3d30kfe2l1du8ztf1vcogwpm3557h4gb22a1l9s01veosogaou2nqv1ovxzzy5k',
                channelComponent: 'h30hkfkwkqipxd3cntp10s72rtbwavtyqyuu7olfxyhv8k55cupja1f4qwlniszf8ftykrbyuoq1t9c69n3rj03obat8lek1kp7fxc2zyxdrvc0hlqfqbdux93los1cjw8ed3uj6zhbanhn2bjwsgga35sxcxlq5',
                channelName: 'wqymugdjwpjptf37y2pm5pw41z9cr7ndxko37x02ou6o8cz16auf50by2wpj928owc6mfofzokvxvfwtw0osd65rm31doyqie90020vi8yku7ov9yv2ozu85b6jia0b1mbv5w038fatwcduvwmtps69lqaqtd1rp',
                detail: 'Et voluptas labore rerum est excepturi fugit. Quasi non ratione reprehenderit unde nam voluptatum maiores accusamus. Et enim iure. Eligendi sint doloremque ea voluptatem sequi quia omnis velit esse. Amet ullam itaque vitae blanditiis aspernatur.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'b962b77d-a02f-47e6-a100-12b9c34951b8',
                tenantId: '46cc98d5-6415-4d95-a3d1-370a531c6c13',
                tenantCode: '62cdnlfz0usl1tzl4pryxdb3ub1x7uhbrifbyabk97a2n0l8oh',
                systemId: '1bde9487-292e-4474-b6fb-937288b90d62',
                systemName: '840thr6uitoi3kacismby',
                executionId: '3b7d8c80-6634-40ac-9a18-95d052bf92d5',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 09:51:24',
                executionMonitoringStartAt: '2020-11-03 19:53:26',
                executionMonitoringEndAt: '2020-11-04 09:18:50',
                status: 'ERROR',
                channelHash: 'lp2r6ay0im084a9el91vxs12ca1lk3dggyl5c5m3',
                channelSapId: 'g626gd69fwmef3h2w7d0pz5pfvt57nu7xekyxlupgkecbuuhsh',
                channelParty: '92329wxnotk2yrd19u62o5ani9e1bfhm2fwf1ijk0k06vtjqpme286m7u0wo411jv5egu3kjibua52g77vhnzxh0oamnk5onktckv8os8fb6245w13f0hltmeq0h12lie1l9s55dpus5cr5exe7me37j4b475rxi',
                channelComponent: '6mb8v5xyae5vg596732ln240ggz1solvvwe1f99u92cl02oj6mjs9mdqrpqvsljt5tbg678j586ngkrh2hi94vhcviipmp9fym9uwux9lem3zlf3ymdzueugpjrsv6j27z3cu7wy3vvndu01uzrnj4aiwk0k7uuc',
                channelName: 'fsor3bxg0atofz7ro3z12jwlyu8jb7n28u678ium9ilvf6skccbaas9ekidt4f8fs9dxx4r8rwz2txcswlupaiynwglcyidvvw87xk2yl6d4cqss28a4h19mrplnvlr6xaa0o141dp1aa2zivetm71gvutceadkp',
                detail: 'Deleniti architecto sequi officiis est quos illum. Odit repudiandae aut. Est suscipit aut nisi voluptatem earum eos eius id.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelSapId is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'b962b77d-a02f-47e6-a100-12b9c34951b8',
                tenantId: '46cc98d5-6415-4d95-a3d1-370a531c6c13',
                tenantCode: 'wtocg48i2kdo71499nj51ka0mu18pey9h31wotzv4hqbvg65p4',
                systemId: '1bde9487-292e-4474-b6fb-937288b90d62',
                systemName: 'rvlohrdf13el77qv0qfx',
                executionId: '3b7d8c80-6634-40ac-9a18-95d052bf92d5',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 07:36:26',
                executionMonitoringStartAt: '2020-11-04 02:02:17',
                executionMonitoringEndAt: '2020-11-03 21:21:41',
                status: 'ERROR',
                channelHash: 'oyk8zfggj0owlahmqpfqx8zbtyg42sj3xu2q2svg',
                channelSapId: 'hm8k5surjy1jkfehwbmcgcemc6qt1nfxhl2u1pio4idgs3lydf8',
                channelParty: 'izvf1lhm35uberle9ir43zs3cn0jeehasg3boj5htwjxxnpmm55sfiugaiw17l3wp62xjmwam67ou55rb4aijxhungxfpabl8yc1xa83bzrz1hyllfbrg2kooh4c974x3jw6qb5i7foihor6vnglyf1dnlkrxkaq',
                channelComponent: '2ovkvtu5nq5tpstfwkh5ax4puaj8ixv1cbjvv3q3046vlz5dtkp1gftlshmg7a6ykbzsq7seze11j70nyr8tzajmf7fc0gez9hgzilaq2ycwv8ieu6lxlkqtlkm2x33k1hccpdi0qeamavrv0i1zl3qsqad0s7mo',
                channelName: 'mjk8ch8oae2de7hqykl6yyy60afjannqb9co44n70cw6f5jzipftxf5ux0t448x2ob26wcoo10bjpdt283rbwvs8vf934q04vcj95x25unx4ov3sjx91kimvwqje3elr9czg55ernaisdinmrhrpg3f8p4pvcq6m',
                detail: 'Sit excepturi praesentium vitae assumenda et dolorem numquam autem. Sed assumenda quia blanditiis nihil iusto distinctio consequatur dolores nihil. Mollitia similique asperiores beatae. Debitis consequatur qui inventore. Deleniti qui dolorum repellat ipsam ipsam architecto fugit id.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelSapId is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'b962b77d-a02f-47e6-a100-12b9c34951b8',
                tenantId: '46cc98d5-6415-4d95-a3d1-370a531c6c13',
                tenantCode: '9fpqul81xve6rq582jbzvut15mdlunr8lj12700opd7whhpdqx',
                systemId: '1bde9487-292e-4474-b6fb-937288b90d62',
                systemName: 'ebuv7otpfskrb057hiel',
                executionId: '3b7d8c80-6634-40ac-9a18-95d052bf92d5',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 13:50:51',
                executionMonitoringStartAt: '2020-11-04 01:35:44',
                executionMonitoringEndAt: '2020-11-04 17:28:25',
                status: 'STOPPED',
                channelHash: 'pyq6zgypswskc01rufbzv7mwsy2vfg00l5j9pczi',
                channelSapId: 'heko84g0wmvr75exnyhfrptimcd3mcugkhtxq96q7h4rsvgee9',
                channelParty: '15csg94aavmg2arnnpu7oapaarphgf7okln6vxbmmieolehmyjhnmk9yz96rejh3loqxoyprnuw4hge7ps7a8rl7h1ilc1z9gvtabm4ikamzqr9so546sxzxpm9yixub7llrjffif1le0ct19qvplnv46dsz4apxx',
                channelComponent: '3ortt826kml0m7bt8m9fsb4hchh3oc195nshxynrgrydmu1s8psau8xb0pzl86qacqzqn9zumbpwxrcjc90ypldy5oh4oqoqli6ywazgjkyllrlxa43r7s13ad1c19l9bgxio5eardxxwd1cdt8a0icuygujb8er',
                channelName: 'gixf7fyg4ql7wtkspoo19fypb9g3qimpwhq412gome12aygdyds94500xb3cwrzhxsghmvth0d3nuuyafxc4qmiyb97lrzlcbsjhdx2fhupu3dksbrz36ywfjpmfspomlfk60m9d50lpm08dp63k1nztdiptiuod',
                detail: 'Et accusamus voluptate ab neque doloremque reprehenderit. Et voluptatem quae voluptatem quo enim adipisci ratione odit rerum. Eum eligendi reiciendis nostrum perferendis ea laudantium.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'b962b77d-a02f-47e6-a100-12b9c34951b8',
                tenantId: '46cc98d5-6415-4d95-a3d1-370a531c6c13',
                tenantCode: 'z2fnyfzsre4e1eyn87052ro7vbv3fuctsltd6rrxsxsyl0q5mm',
                systemId: '1bde9487-292e-4474-b6fb-937288b90d62',
                systemName: 'wbu341z4aavohruq2yus',
                executionId: '3b7d8c80-6634-40ac-9a18-95d052bf92d5',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 21:26:20',
                executionMonitoringStartAt: '2020-11-04 05:01:01',
                executionMonitoringEndAt: '2020-11-04 05:18:18',
                status: 'ERROR',
                channelHash: 'hr90w7s69dz2khx5tuppzphlpo7438xk5jps7fbq',
                channelSapId: '4ta37kr2aipfldh5hiktkne3j8ka8ske78fxo671m68z7iuw1o',
                channelParty: '660gwi50dj7vrm1gslsr1q0hwm6c7m7exy1iq1aee1i4ltyoji4bkyupjg8hl8b0hji0yy6fijieoc8ryvil7twj22hjr4bzbmrjjg3ca8s29gej2cdcioogtsuwlkau5vt5j39ajg62pgyp5oaybitzwapdbzkm',
                channelComponent: 'hf41woljzmg4ue9hee1y5qsu2xvsjmgi19qtptk15udn0k640xxhyo571eunp2oqzmbtrlgo2g1sv3qg01ejcdii1i6uhftof5etkgz51k6of0atnnrxxelll6bgcqms5oqz138jex3ub3ii24xb03akfpbk9rugn',
                channelName: 'lqiel0n3rv0uzjx5tudncr8llxr3xv6uo2low3h6iux08uf7n9yjc4zm6mh01pf77gk251s62ibguz3x0yih9cgb5cr9kmz5txukcr1svktwo9rvmiliho9i3ei9al2fdlc4btfv0n8e27gc9e6ufiieh8ytzr8j',
                detail: 'Labore dicta vel iusto quam commodi. At cupiditate dolorum sed corrupti rerum. Nisi eum eum et est enim iure ipsam sed velit. Omnis cumque eos reiciendis vel laboriosam tempore.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailChannelName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'b962b77d-a02f-47e6-a100-12b9c34951b8',
                tenantId: '46cc98d5-6415-4d95-a3d1-370a531c6c13',
                tenantCode: 'r5gc7y9upkiev28p7rrnc191b0k72trbdjzglftyug8yvyipsm',
                systemId: '1bde9487-292e-4474-b6fb-937288b90d62',
                systemName: '975xd5eqgqf0p7788jwc',
                executionId: '3b7d8c80-6634-40ac-9a18-95d052bf92d5',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 15:43:37',
                executionMonitoringStartAt: '2020-11-04 00:55:57',
                executionMonitoringEndAt: '2020-11-04 11:24:45',
                status: 'SUCCESSFUL',
                channelHash: 'z7yifz1gyg61w15i5jv472ro57q22ob2rqi42ay1',
                channelSapId: 'j5vyxu6arrfk4066f3ecur7ei2sigpvyirqaq7xio7k6tf79vi',
                channelParty: '336pcrweft3mmkbgsy2idyyrr1a1koofyn1czylgvf0g1yxqyc2ekmo3myottjmevk17lhikh16td1q7r5pcghqe2nxirfnwpc7do1k9chosmriwu2t8walos28mbb5jm2sosyo3o8scy1a28yxqfsf2c54wzlb3',
                channelComponent: 'mmn68bxt1e59xis5ec472rst03z52ud2ro1n16681eaya3eyfoh8w4n2qu9yikvv1uwtfvm9ov8e8xdvwvrmotj8peotag2so0ilwwtqlvpu8skwhrawh0qcn5us5640g6bm2i2vt8yrirwm5gne1qmoi0a8782n',
                channelName: 'nyzoapf4vqdsu36rxecq79v6nmwp9e5ykhggeekiru2yif57xkx4cokympp9wp7tbk6grc7fdgp2paggtix7kcgo2dozqj3w1mjzpid84aumnl7e5r0lcooukjutob2uzy5bg1illk0ht50gkuzfdhysn4oz5wg2d',
                detail: 'Saepe a ut illum impedit repellendus velit maiores. Sed odit quos dolores aliquid doloribus. Iste in earum voluptatem aut. Et ut aut nulla quisquam. Qui ut nulla a. Facilis alias quaerat et.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelName is too large, has a maximum length of 160');
            });
    });
    

    

    

    

    

    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'b962b77d-a02f-47e6-a100-12b9c34951b8',
                tenantId: '46cc98d5-6415-4d95-a3d1-370a531c6c13',
                tenantCode: 'vdk9ddmote12o5sss6v478e64jdir5rw16nlat3e9h2w00pxh3',
                systemId: '1bde9487-292e-4474-b6fb-937288b90d62',
                systemName: '4jpmilq1ivxs4dsvcyoi',
                executionId: '3b7d8c80-6634-40ac-9a18-95d052bf92d5',
                executionType: 'XXXX',
                executionExecutedAt: '2020-11-03 21:23:00',
                executionMonitoringStartAt: '2020-11-03 23:06:03',
                executionMonitoringEndAt: '2020-11-03 23:54:29',
                status: 'STOPPED',
                channelHash: 'intuea75ovreo1tzde0w6jgujiese3ysgupobk8j',
                channelSapId: 'wzoehv6ph7a8ib3mf18czx8kob05quo1eis65galsqwrtxe7xy',
                channelParty: '14qmvp9l5ytefkg40aell5dn5cgxx4zoxkhc4kpl0d6z8vokyatr0yir3k9fxx3if0jw4g802zb6pated4xqw5r6bp06uhbg2w6c230xqlakolilzkrbsvbdoxcir3b7oa4kfz9u4abop71bnqszht4duj748ujf',
                channelComponent: 'c6xy4fy0ovnom90wkfqsep3r2jzcpkgxjeps578odjo0e8z3o1w9mu6g8ivs8qye1vx2pss2d4hkmgpqm18ku2gubtqnqcjlzf2phy76pxj0d3xm2hglziodqg4192v7xqk8nvz2npgcteilqdrfc10su2fj9jz4',
                channelName: 'deej3zztevzbhn90z5s1krl5cdn5tf2a8t7jq3g5wcn17xjkfmf7lfrzch97b1ep4ethndiejub1hg7j6cp5sxy33xpxbk4cjk3qdvbycloamabcnkb1lvtnkabtr46l800ldtpe2cvo8jlbk822ihza49ojgi50',
                detail: 'Enim vel expedita velit et omnis iure perferendis explicabo est. Aut commodi consequatur eligendi ex et ut et impedit. Perferendis harum tempore molestiae blanditiis quasi exercitationem.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailStatus has to be a enum option of ERROR, INACTIVE, SUCCESSFUL, STOPPED, UNKNOWN, UNREGISTERED`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'b962b77d-a02f-47e6-a100-12b9c34951b8',
                tenantId: '46cc98d5-6415-4d95-a3d1-370a531c6c13',
                tenantCode: 'bxbhwn5jc06gj0gea4oii7wf6hl8a9mlvgkvasyctyo0dutpgp',
                systemId: '1bde9487-292e-4474-b6fb-937288b90d62',
                systemName: 'at9amj06vv5xdww9v7br',
                executionId: '3b7d8c80-6634-40ac-9a18-95d052bf92d5',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 20:08:13',
                executionMonitoringStartAt: '2020-11-03 22:21:46',
                executionMonitoringEndAt: '2020-11-04 11:46:35',
                status: 'XXXX',
                channelHash: 'wnbsjzxe7d7sbyj855am3mf4x5c7zg2ph1qo5gy2',
                channelSapId: '7g7n2rep3kj412flzp41hw957279iiispk9y0l1n2vpf1tgyjk',
                channelParty: 'rqgqqhgo7srom2555zcvw3oap6dhsgde47xex4fd16ki3wb53xr7i3s6r76qcql0i0kbmfr5q6wigxj3fe1421i95cumog7cj2yxivciim99o6hs1eull06wg8rcwiehir5iibcaet3b8lks362is6urtpxry0ii',
                channelComponent: 'z9uvcg71bi1fj3u7nh515mcog361q2hqezzpqboo1n0wjnw6v459tb34bovkfndkwt78fnrivjm9pelz6trvvsnl6wl1osotkwztl3238pmq6kho5ksi1gkprszp081prpkprkfmy2ndmwwd57qw92f7qetxphky',
                channelName: '1hwcx7znu69ghmwyh0s0jj98y0nui245ygxft3r633294gq5kd0dk5t0ka02r5cggvdhxyvg0a4yocos4n35hhib11zs1a7hjqnkfn2qcfzb01zagkoss5ixm43bk9ob0t0bh2qa153jw78y81ukyh8pcg6txhqs',
                detail: 'Neque ratione natus similique harum accusamus nobis et amet. Esse facilis qui inventore assumenda praesentium laborum libero sit debitis. Soluta vel illo architecto aut.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailStatus has to be any of this options: ERROR, INACTIVE, SUCCESSFUL, STOPPED, UNKNOWN, UNREGISTERED');
            });
    });
    

    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'b962b77d-a02f-47e6-a100-12b9c34951b8',
                tenantId: '46cc98d5-6415-4d95-a3d1-370a531c6c13',
                tenantCode: 'fb0ge7b0o6muq70f77xigrikerin8ehvsugkwfe0kcxz2d77he',
                systemId: '1bde9487-292e-4474-b6fb-937288b90d62',
                systemName: 'of4o6mkg1s1yjytxzoez',
                executionId: '3b7d8c80-6634-40ac-9a18-95d052bf92d5',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-11-04 03:53:32',
                executionMonitoringEndAt: '2020-11-04 14:42:52',
                status: 'SUCCESSFUL',
                channelHash: 'm6hjra0sgr4e5x11lfizx58qybbeogycxlngzubp',
                channelSapId: 's443lxuf8masmm2mkae79b0rt6ph88hv053t92r2uitfdbn0o2',
                channelParty: 'i266tsetcghvtq6jp3o4h274crtp4tzob0byomx1lyqj99r036jcwrh7nd40jt3y9gy7lrskiy4x6ab10p7glzbhcqtxt82jk0o0dg6zhttjar7dd2s055enfjddbi9fp1kj29r7mdlo5gbb9nzt32iky4552t4p',
                channelComponent: 'xmrftgnq1i8em47a1hyjbrfa165egpevynmq1ebdm6fdg8etlsees9v370jrqrqmdo81avs8cdfmr0kz3jk5r177uj6lpxwg157l1eslz60hpncvxwg65m88hmolqfzjyybx4spoi60z1w7z7ie00eb0g8pa7014',
                channelName: 'w3u49bacoe0ymkftz5bmrth696bsas32sjxp09tneu7f4920un8edet951ys99nj6a3gdsew2rok9zrzs2zxijcznr1jftq4vxj27afon1d6uhpxb0muzhll4pqyci3nz3txf7zq2yk23mmrdpoi3kw58f46d3ki',
                detail: 'Dolorum aliquam voluptatem voluptatum. Et nihil tenetur. Optio eveniet sit voluptas blanditiis. Et unde aperiam voluptatibus quod consequatur. Veniam iure dicta ipsum sed occaecati ipsa.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'b962b77d-a02f-47e6-a100-12b9c34951b8',
                tenantId: '46cc98d5-6415-4d95-a3d1-370a531c6c13',
                tenantCode: 'a70crupikvcvicvmxcg9oaov62r98fyn6nkhln18evq0s8e04c',
                systemId: '1bde9487-292e-4474-b6fb-937288b90d62',
                systemName: 'd9ohyblevqm38tfrwnog',
                executionId: '3b7d8c80-6634-40ac-9a18-95d052bf92d5',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 21:00:44',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-11-04 04:45:32',
                status: 'UNREGISTERED',
                channelHash: 'qk4wcnyyucqt0qflg00zykoy8d01vaobk4snhs7b',
                channelSapId: '3t4pm0r1jhfvgrl32rxrgimw0p0tw09g1s55ikm9w2gias4lhr',
                channelParty: '4up1lm3zd9acuycubnh9b5di6emqkemg0wb52fgqcptnqz1p71a114jdvfvog2vc7bo9uj8cpddzae2cnngxnm8vgdwq3bikjwfdyo5pmck5htzwj7vvmo1ov9nebojyutred3or7f3er724hj34eo3601xv1zoz',
                channelComponent: '6ia07w3a13renda1rj6dhb6w7l1p80dx7ldkrevb6q2ebaec3tgwmq2sthwe87j9gr20uejv7hojtm8ljm59ak9r8b71w0zh7gqyhcphddjv0xtbv8q70vzfmlilgti0t6dohx4xludvvblg8vjprs206gaoxnht',
                channelName: '4pg86qc1tdb1pqogb0howiz3b2ld0tiao7z9ppda83zpia7fc6273s3pnhc0nwxbsyi21uaakkqzhrqhbk82dfk1nwwmkey1dy3ssrcb70kscah3834ssjlj5vcmqioa4kcd8bpjc3i042l59rh22snzvsvt3ydv',
                detail: 'Eos molestiae inventore. Harum et porro dolorum. Voluptatem laudantium aut ut commodi aliquam expedita. Quis voluptatem veniam. Aut occaecati non dolor sed voluptatibus. Tempora laboriosam quibusdam vero.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST cci/channel-detail - Got 400 Conflict, ChannelDetailExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'b962b77d-a02f-47e6-a100-12b9c34951b8',
                tenantId: '46cc98d5-6415-4d95-a3d1-370a531c6c13',
                tenantCode: '6u64tx3lk97z8nkgwkpnkucczc017f0kf15xcyv6z7bunbe62r',
                systemId: '1bde9487-292e-4474-b6fb-937288b90d62',
                systemName: 'q2c1epdewxmcvz466ck6',
                executionId: '3b7d8c80-6634-40ac-9a18-95d052bf92d5',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 20:15:44',
                executionMonitoringStartAt: '2020-11-04 12:04:39',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'INACTIVE',
                channelHash: '00u6wb62ljd6pm1gw0i83j0j7o5rl51r88tfjqm2',
                channelSapId: 'v0ft5pavzgvpkqypbx9hdttk06q5bscz3gg8n20blbwnjpxg5n',
                channelParty: '12pzcp837wd66qtrc5gwktei9cys88pva59u1h7nbmaexm9mzzemcqx7erjs3lf2j0ritx5rgn7ax0wfabm5remb41aes8vjpcs85wt39pj41ode6hyuzp1i1d2cnps5rpt2tcq4b3yf4604mssflp75gzrbicme',
                channelComponent: 'iy1lh1ibdlu54dajvuocr0j1e68brx43bi0c7n7nl29lz7fvv5iahf8pwxayrslz1va8xe837fod7h9u4t3b1o4u4b5xy3mhwjfazaxgyt88k3tizm75znyc83quvotocgxo0rfnvudt8bavn8v4804gnxlbn3e2',
                channelName: '6hbonjo7566t48fsns30l96ghnutx6v00s9yrpxkgrfz9j9kamcovqsnoae0bn46wooh0en68ylf32dfejrqf0xporrkg3dn2a9ko32eeem22hjuwsf21lym4swpo2yci0jkxcqbwdoul1r606zriuzgf87mctqd',
                detail: 'Ipsam officia sit impedit blanditiis aut commodi soluta. Nisi veritatis esse sint. Numquam in error facilis non maxime praesentium sed et.',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST cci/channel-detail`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'b962b77d-a02f-47e6-a100-12b9c34951b8',
                tenantId: '46cc98d5-6415-4d95-a3d1-370a531c6c13',
                tenantCode: 'hmo1ssz5s3d9qdk2b5t2ecv6af7ovzug1zg7mbvpd3vhbb4pqu',
                systemId: '1bde9487-292e-4474-b6fb-937288b90d62',
                systemName: 'ssyoh1q7cpr5hzzvqgow',
                executionId: '3b7d8c80-6634-40ac-9a18-95d052bf92d5',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 09:56:39',
                executionMonitoringStartAt: '2020-11-04 08:24:41',
                executionMonitoringEndAt: '2020-11-04 13:26:44',
                status: 'SUCCESSFUL',
                channelHash: 'ky81j3vzeets5497w274d65p24unzh4q5uxj0f5j',
                channelSapId: 'etk21c5phgj6r7dgzdcnk04ywf5enn2v3urfyxuqs5xp8vitxs',
                channelParty: 'vrty7nbt75nhhq8cegs2rlda4i9cemcy8mq4c61p1zmo0k1yahfqhy4g02xq29ud1jeygv21v2b61sw6if4mz3ucvc81nqmfyq4f66cn83nhq5qmsini2tzhxwt7e7cyil6kusi4dqcuvb2di0ov04t8xfymtfr6',
                channelComponent: 'jyu0bq6gqi9nd8c66jxikh60w23zks39xagahxyscxr5vexu1anbmdj6220nxesap0wy5zw72u46dc5okaepmfrzc8gaejp2reba1wdt8i8zoh99ylo9ikeiyvjuhuhb20yphgx1suhw2ag7kgo6oc9puwq0ve8l',
                channelName: '85dxzgy9iyncwk57y6zoubulu4w6mt0nqg3xvil6rzrunvvi1syrsekn2cy5irejdrntkwy2d5fuxga53ao1h66w4jk8x6ndm3l8rclsv7437zlf6ncswbado8jxm2d0s0aib7lmbd8d5134hstieeq797w9ovk6',
                detail: 'Modi quo sapiente. Nobis vero velit tenetur ab. Rerum et facere est amet sapiente eos consequatur nobis rerum.',
            })
            .expect(201);
    });

    test(`/REST:GET cci/channels-detail/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channels-detail/paginate')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    offset: 0,
                    limit: 5
                }
            })
            .expect(200)
            .expect({ 
                total   : repository.collectionResponse.length, 
                count   : repository.collectionResponse.length, 
                rows    : repository.collectionResponse.slice(0, 5)
            });
    });

    test(`/REST:GET cci/channel-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'fa0f6375-b1ba-49b9-aee3-4d79c1b70c67'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET cci/channel-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'b962b77d-a02f-47e6-a100-12b9c34951b8'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'b962b77d-a02f-47e6-a100-12b9c34951b8'));
    });

    test(`/REST:GET cci/channel-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel-detail/451e5d03-055d-4c3d-ade4-d30c25e84453')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/channel-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channel-detail/b962b77d-a02f-47e6-a100-12b9c34951b8')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'b962b77d-a02f-47e6-a100-12b9c34951b8'));
    });

    test(`/REST:GET cci/channels-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/channels-detail')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT cci/channel-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '3c68d8c4-94d8-4f7b-9913-82395ae12cc1',
                tenantId: '32746e72-6db4-442f-bec6-886e0184b321',
                tenantCode: 'z3di1415n8o71bzdkjuvfgx84holq50yhbh9mjwo5nswi3p52p',
                systemId: 'e2e5c78e-7ce9-4867-93f9-149eee68d492',
                systemName: 'ihdmau9yr8ax6g3qwhkw',
                executionId: '880a31b3-e783-46fc-adff-d2e118a67573',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 07:46:16',
                executionMonitoringStartAt: '2020-11-04 06:19:28',
                executionMonitoringEndAt: '2020-11-04 12:47:43',
                status: 'SUCCESSFUL',
                channelHash: 'o6w0yi2j569y88bpj23tzysjtzi1cdh4madd0b4l',
                channelSapId: 'juhzvc2fadukb75lspmz0usi61hlxuq2tdy85j6n239rgsn821',
                channelParty: '2z1drixo5l0pe93ygaea2xx4m0o4ols801f2q9pfvb2ckahxetznmmiavdif1ag4k6kxqnyefe148iso6qzozrvo4tyhe2szcrmn6o1t50lpjcb5hl3qmoh5wxcrt2uuw4thbvpep61f43kv2j705f6ml3adh6yi',
                channelComponent: '65kp04ugkrcp5phbi1ojkfg0p0dmq428vjexedb971mijs9w67wgr4v5fep2oilnc07celxub111vl0drabi1jnnxzzsfqyhx0omg0xtkrkn91wnnbzr0tn8xfr2yr35st2xj2g77r51iuapckv1mtmmgpwnsrv8',
                channelName: '7rf5rbzkdjj3i5sa8tlf2j9pwtak4uc3h107ws6360mpd1jddh7koilnh4hf5ir1vcrv2au30875s43zp4xkqn17trv1le85dan4idzo2yhgr88io95sgt013ugk168ciwckh291kispl2t08diin300ge939yhi',
                detail: 'Eaque iure rem culpa optio alias architecto temporibus nobis. Autem natus sit ab. Quia earum ut quis qui.',
            })
            .expect(404);
    });

    test(`/REST:PUT cci/channel-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/channel-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: 'b962b77d-a02f-47e6-a100-12b9c34951b8',
                tenantId: '46cc98d5-6415-4d95-a3d1-370a531c6c13',
                tenantCode: 'lwts8qdfmydle1s5xrgtt04ih5b8tojl6hxd3cpsj9ec8u8ymz',
                systemId: '1bde9487-292e-4474-b6fb-937288b90d62',
                systemName: 'qpwcnma6bfqpho3ypg70',
                executionId: '3b7d8c80-6634-40ac-9a18-95d052bf92d5',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 14:29:26',
                executionMonitoringStartAt: '2020-11-03 19:11:33',
                executionMonitoringEndAt: '2020-11-04 01:42:13',
                status: 'STOPPED',
                channelHash: 'alrtvqbt4ryqdjrhe7sguyyv4kcmafvqade0vjlj',
                channelSapId: 'z0yujy31v9lcsakiiejx4cxzipspygd7m3zek9vc9d1052pjbb',
                channelParty: 'aufnnwb6cm0vnie6xllrmmauln2ayptfnci5664e335xwi7vl3b96bj9ou949u8gmfwd78n6yi7dkr71vaqjy38mj808d96qf2gpuuh7mof41xtwl8y1wzy22tzoo86waw6lz5ct3txranz6qywg9xekq2kct6aa',
                channelComponent: '97imv44oujlqfy426za1prcxzcy02f36bh15hvh300awu1jx27bec5y1ypo5g2fozzkljbq7ubvmhk4h5tc795je57vo3p39hujttfbmj6sqvxjxmu41ienbv3fd55cw6sg58jjuh0bc0yrktvoychjogfxbh5d8',
                channelName: 'o81yzyipbl4vvixy8nz2gz2m3uhi2j5n05amplagwip4oh28x66nbttgacwu5suaylcw3wdk9vvbsj1s5kcb52882fie9dtms2uq0lyzxfgvyyxkl40xnp6mpf3ktlcww8pnhsefb0a1kcl7wx7w8eh43bb51o42',
                detail: 'Nulla natus dolores aut. Aut soluta mollitia consequatur aut a eum consequatur. Sapiente qui dolorum et libero aliquam voluptatem officia occaecati. Quia nemo laudantium vel.',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'b962b77d-a02f-47e6-a100-12b9c34951b8'));
    });

    test(`/REST:DELETE cci/channel-detail/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/channel-detail/797a8e65-78c7-41bb-b9ec-ec9ec8db62b5')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/channel-detail/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/channel-detail/b962b77d-a02f-47e6-a100-12b9c34951b8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL cciCreateChannelDetail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateChannelDetailInput!)
                    {
                        cciCreateChannelDetail (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
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
                variables: 
                {
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

    test(`/GraphQL cciCreateChannelDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateChannelDetailInput!)
                    {
                        cciCreateChannelDetail (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
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
                        id: '9042707c-8e4f-45da-ac0c-0ca3d893fab0',
                        tenantId: '46cc98d5-6415-4d95-a3d1-370a531c6c13',
                        tenantCode: '66wgl06rewn4cths65gv9h11ewhz8oywv741prxzzq82nxbdla',
                        systemId: '1bde9487-292e-4474-b6fb-937288b90d62',
                        systemName: '0m439kh1ztyu33bdvh3s',
                        executionId: '3b7d8c80-6634-40ac-9a18-95d052bf92d5',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-11-04 07:34:24',
                        executionMonitoringStartAt: '2020-11-04 12:39:15',
                        executionMonitoringEndAt: '2020-11-04 15:27:20',
                        status: 'UNKNOWN',
                        channelHash: 's1hfttw7no7hs6gj0csjsn74gu96zup5swengnmi',
                        channelSapId: 'e2v74t34pva66ec4l49zj9jscofkmrznid76tljx0tgfbumbrc',
                        channelParty: 'dwdz6akmtpvbblq77k95me18j0b5vupd8cyhk4lglgv35usryyvjyu8znbic523f7na5gwfgethxrhfemzqqqatsju2mv1rtdp7dstfjiayhphk4pipqslnjkazje5ut5ly8ih5y1ho6qe4x0wxs0g882ba8m5hy',
                        channelComponent: 'dsvrizr4ph3wop5bgrdgzlfaweruwwb02aunu82te96r6jizs8a4proavg66il2ii4mgr1m876cddptuh2fehpdk9a1ykpf57l1fcixe4iig9uax489n2dr9jxqnj78god9ahnbzesiel4d9j9qrlnhgmz0sn2yr',
                        channelName: 'dcwminz1k7iot3b3433ty4oehdu9iujcy4ytu458i3v5if9a3xg8nypnc0kpnuhnotarlrm8a0r8ty929ioqvkrfi2zoo7fb4f783d3qmjlyed3ciy9ilnzkcd2c83snquvn11hwyrefzu5kgy6rg047cxjhotvs',
                        detail: 'Sed sapiente rerum aspernatur sequi. Quia et dolor. Perspiciatis sed quaerat voluptas. Perferendis accusantium nihil recusandae ipsam sint omnis. Doloremque neque magni commodi quia veritatis ipsa nulla dolores optio. Et consequatur eveniet libero distinctio dolores corporis.',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateChannelDetail).toHaveProperty('id', '9042707c-8e4f-45da-ac0c-0ca3d893fab0');
            });
    });

    test(`/GraphQL cciPaginateChannelsDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        cciPaginateChannelsDetail (query:$query constraint:$constraint)
                        {   
                            total
                            count
                            rows
                        }
                    }
                `,
                variables: 
                {
                    query: 
                    {
                        offset: 0,
                        limit: 5
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciPaginateChannelsDetail.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateChannelsDetail.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateChannelsDetail.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciFindChannelDetail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindChannelDetail (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
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
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: '928a2a3e-ea6d-4799-a8dc-9aefd23e8f02'
                        }
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

    test(`/GraphQL cciFindChannelDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindChannelDetail (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
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
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: 'b962b77d-a02f-47e6-a100-12b9c34951b8'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindChannelDetail.id).toStrictEqual('b962b77d-a02f-47e6-a100-12b9c34951b8');
            });
    });

    test(`/GraphQL cciFindChannelDetailById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindChannelDetailById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
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
                    id: '828d3995-cab7-46bc-8a2c-46aae9441777'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindChannelDetailById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindChannelDetailById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
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
                    id: 'b962b77d-a02f-47e6-a100-12b9c34951b8'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindChannelDetailById.id).toStrictEqual('b962b77d-a02f-47e6-a100-12b9c34951b8');
            });
    });

    test(`/GraphQL cciGetChannelsDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciGetChannelsDetail (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
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
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.cciGetChannelsDetail.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciUpdateChannelDetail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateChannelDetailInput!)
                    {
                        cciUpdateChannelDetail (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
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
                        
                        id: '77fac21d-ffd8-4fcd-92b4-500f1466b1be',
                        tenantId: 'f7f0f755-77eb-4a1d-866b-cbe10c864d4c',
                        tenantCode: 'ch7ewe8h0ejaayjrhksmx2jhrtjhh8f1wo3sc7e7stbikq1vol',
                        systemId: 'dfe3817d-d301-40f6-ab06-5b3ce4584874',
                        systemName: '8lolqka0as6255bi1eeu',
                        executionId: '60113ad8-6800-43d9-8744-366ab105190d',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-11-03 22:40:02',
                        executionMonitoringStartAt: '2020-11-04 13:56:27',
                        executionMonitoringEndAt: '2020-11-03 19:18:28',
                        status: 'STOPPED',
                        channelHash: 'y5hvevfsehl87lkw3e35msqooje50geqpl6df0st',
                        channelSapId: 'gwpgk71rb8aqrrot6k11rftlflgoahd4x4k8nf445af3o818lp',
                        channelParty: 'j6o8vs9rxw8ybf0tk1k3146s0g3d1vfxfm9xk8vosl19jpib8cvg4bh8c95dr3h7wyeoutay93f9gntfe9d8568dfimy9hoksdf88ujfm8mtgjvc88zud2vd57m6ieugbhxrpdb111nag3f3bhmh2rwxnofw38c2',
                        channelComponent: '5u5ihhdz50vza9r9nv98kvqo6b8riiqxhqre3faab3iqtnvpeexej0a88w3eom5sfajnqwhmsd9i9eepyky7bcqn239s04tu4gzx0bmidww8hlq9wn7qii1zon62hftftn37tb0cgx5gud0mjak37v5qbgcyr7l9',
                        channelName: 'v4jo1pxpyv0unf50az9nt79woq3p1fywwzgkirz2csfho4bbjts53wc4wk4wmwdfs16fw9r7myz4a63puwa7zp5vl9a8f43k38u1qm9m2ddkccbhkevxxotez4xret5j9zmfhyrgq5q8bs9il1dhx2g0b6swv706',
                        detail: 'Ea repudiandae ut sed. At ea et quaerat nam vero. Qui eum minus dignissimos consequatur. Voluptatem cumque repudiandae sit sunt voluptatem expedita velit accusantium repellat.',
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

    test(`/GraphQL cciUpdateChannelDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateChannelDetailInput!)
                    {
                        cciUpdateChannelDetail (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
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
                        
                        id: 'b962b77d-a02f-47e6-a100-12b9c34951b8',
                        tenantId: '46cc98d5-6415-4d95-a3d1-370a531c6c13',
                        tenantCode: 'qgl0epxdcl6gyw105mzeickfuv3x33yb6u4evqiw9umyjwup7l',
                        systemId: '1bde9487-292e-4474-b6fb-937288b90d62',
                        systemName: 'culk8eut3kznmd70xhbz',
                        executionId: '3b7d8c80-6634-40ac-9a18-95d052bf92d5',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-11-04 07:06:18',
                        executionMonitoringStartAt: '2020-11-04 12:21:36',
                        executionMonitoringEndAt: '2020-11-03 23:39:26',
                        status: 'ERROR',
                        channelHash: 'ioe0p2lo389cdwjap2ol4fnngi2pw3m3fslsaq1t',
                        channelSapId: 'k38rnbw58743m193mkl68ssk1u4oeknvwl0loaekbwy7p1mh2n',
                        channelParty: 'koug323auzqmtwwza7yd0daancg8fva9qnh5wdryx90cxyukbdc3s8w6eym4x4fafuvm8a0fxhe6kla25vybim568682g0hcdktw1dglgdmsm46t9808t8fjalvicyv3mg6jer5wr4hxjvdwm2xdfenbdbgdrutf',
                        channelComponent: '74nk2qe6cdnvjwf0lujkl1kdpa0l5qwy9duxeti5zl099pc0hhof15fnwcaqo0ktxm09gigs0uwpufjk4c7j4v6m37nhyn2k0khxkap8k6pytvz5p7knyudn3pza38qrefcf3w9h53u4egfez34934dqouhgno4j',
                        channelName: 'qv31wy6o2kn0mcnpm2gkmrwua4lc0axgnpz8qw2nxvb5wb5p6zhxgq8ydhnvdmmdzujrckbi49ald2ikqz6iru9kddbejzsrv6fqpo9ifzx1ktm892u0qyq8bw0fq1tv209cyoxmj8cbqt6yrbtm9fo0v1j4swfm',
                        detail: 'Rem autem magnam ea est. Enim ut animi. Beatae quis nesciunt error animi provident. Quaerat nostrum dolorem voluptate dicta excepturi repellendus voluptates eos.',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateChannelDetail.id).toStrictEqual('b962b77d-a02f-47e6-a100-12b9c34951b8');
            });
    });

    test(`/GraphQL cciDeleteChannelDetailById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteChannelDetailById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
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
                    id: '56844225-0889-4c67-aab5-e7db5dbf4c25'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciDeleteChannelDetailById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteChannelDetailById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
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
                    id: 'b962b77d-a02f-47e6-a100-12b9c34951b8'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteChannelDetailById.id).toStrictEqual('b962b77d-a02f-47e6-a100-12b9c34951b8');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});