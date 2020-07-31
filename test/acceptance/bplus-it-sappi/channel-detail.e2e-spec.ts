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
                tenantId: '8c12e5b7-3d27-4955-ae4f-10e545033b47',
                tenantCode: '2z6b4l0k3b0p6cpnazsd2w2wiracnbpmkdzhyphjbao783dxyw',
                systemId: '72677ac2-de78-44cd-b75d-06bb7299013a',
                systemName: 'lrque96iz7nadkbuh4y0',
                executionId: 'f85cbdbe-36bb-42ec-8c66-c929c1d74a50',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 13:22:09',
                executionMonitoringStartAt: '2020-07-30 19:24:19',
                executionMonitoringEndAt: '2020-07-31 12:42:31',
                status: 'STOPPED',
                channelHash: 'l7ateclxy4e5y95j5odm5iplh5bw1dq2jkxy9ndv',
                channelSapId: 'l9vwvmc28k7ybwd50w3tvea08n1bak4be7af83jfbj441bd3m3',
                channelParty: '4elvgum1sbeeo81vzo70frdrxs1vhvjnugjr7s4d8y9iu6t0yfdgy4mgz62h3xcmi9lptz52uhq4wqhq57wuiyu015aosypxgy7rjfekav9p24ih375h8j87tgsbhu82cbwfp9eyaq6tbkvin4dvlvdpyk6pitc8',
                channelComponent: 'lqlvvb3wab666j8omdk9an9n6mc1n66cohxq0vwjbtgyjvofha4hhkiskimruse5k0we6fvgwoqks3uug7qnigls60nty7tpvvpe12cqkw4hhbww0hqnzesd8beav2qguwcjvb8brd471f6nqk5uzdzn804c42s0',
                channelName: 'l6h11b72td1r8uu1bnpl4ggw4v9nafpvxqg6dvssu4uxc1qg77p024a05p21zh3cug90cpsv3y8zsyh7myxtii1ak1v0aqtsgb77ahrikthjbxc1ahc8f61370nc9z42rx374kvpka18ysglcjg06slffc3hgmtg',
                detail: 'Quo repudiandae iure neque ut officia. Qui iure et sequi repellendus et. Maxime est tenetur qui. Fugit occaecati qui natus tempore. Magnam vitae ut.',
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
                
                tenantId: '8c12e5b7-3d27-4955-ae4f-10e545033b47',
                tenantCode: 'n12g8hs41ntmurqlgoqgaw5urux67cqmdbiiv1lwn3wybzknuq',
                systemId: '72677ac2-de78-44cd-b75d-06bb7299013a',
                systemName: '7bg7fkjphlv8ypad622k',
                executionId: 'f85cbdbe-36bb-42ec-8c66-c929c1d74a50',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 17:54:28',
                executionMonitoringStartAt: '2020-07-31 06:26:54',
                executionMonitoringEndAt: '2020-07-31 00:18:20',
                status: 'STOPPED',
                channelHash: 'zranpzxdi47m9rlv6pqzk89l14mv15vmqvu44bty',
                channelSapId: 'rhmtcecnqsnapzj5xstt1yw2q3pq0si70d3um3x4bv7a7mdxv6',
                channelParty: '5cret767c50pdbapj463u61a5cfrhspqcuxqmxavpwh2nfwoe85gfbu3uog0x2oje47ezx5i9um3gxqh6bwixs5dzpvqsbf4an6ea1b6r6es15kxkkrchk6q8yx5yrlfxd3f4bfxpp1tt3pfcbzt2526ivb0sr4k',
                channelComponent: 'euhs0smiwq86kofi4offprlq3k71x0vlldija9hm57xxf8gollwg9j4zpagew8mpx43dpykjfjvm9c85u0gevv1ceju23v4pyirp8lqv5jkyohm8j5mz74zjo11s9h3j1nriu527cwwa9ogktspi8rya6lf4fvmu',
                channelName: '3of9sudhcle6cqqt1zyxk23zcth9lpaowy1uskhghww0r0b04d1u9mewn8krp3ybphaljtmcz1c8qdg4vu0cr6goofoq7rv3ojs7exwlap6gbr53paxuqjptrxfzybkxpwtwivn4izhg3xzri3qpkdisvgs6m1i4',
                detail: 'Ducimus doloremque et rem expedita distinctio voluptas eaque eos. Quo earum magnam quos reprehenderit sunt. Dolorem aliquam assumenda nesciunt.',
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
                id: '8336595c-4691-44db-bb63-a7fd9c7f8349',
                tenantId: null,
                tenantCode: 'cl9g2u1iukupqg6tupoqg1ddsq2z397hoj6nbwxda79sqz4dd1',
                systemId: '72677ac2-de78-44cd-b75d-06bb7299013a',
                systemName: 'tvou39zqo3nd7b1jilwd',
                executionId: 'f85cbdbe-36bb-42ec-8c66-c929c1d74a50',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 12:41:37',
                executionMonitoringStartAt: '2020-07-30 22:51:19',
                executionMonitoringEndAt: '2020-07-31 00:57:10',
                status: 'STOPPED',
                channelHash: 'cteio0n5myp1kgkvuxzlcwd2fba5j2vdh585kcqp',
                channelSapId: 'xtsgxqp6tb1c9m2p1e0d9tsz3po51r0131xry3j0gn2ts3vmf7',
                channelParty: '39oko2d4rpy36ti4k3j2hcjwxrcynck45w7lgu2vbe5mfm1qv9mw3vw9cvo0ce229diqdobex2g5uz0iirb15d6fcx5yfxtdnbiex8ya6rjiep961bqs6n4qggx5phxtgkdrix5z0ezg6ug6zo8as1ldt8w69qgn',
                channelComponent: '8lfvnkne8yprs5s3x04e6gzptp5lsprfqe8bba34tga6dg435jkuh4w7md659157lxdlsh89jk8dnactsyvzac29o30vwhqwlliv3usjaykp417p4x4edv4y6evmbcqfh6kzd8cn3rvjj0nt9ptonx6x0n6fm72h',
                channelName: 'foc1pb7whighha4ffk40hlry0rl1zr50w5xa0j5aavrxqhv2p9rtq2zgq5w8idyizhuocs0lzehitolbkl14wtr5w3qp24l9kk7xpvhbmp39utsoqcntliqrpjysjzjbb9j6vyyotbrni228ot3b60guwqoyfifd',
                detail: 'Eum voluptatum vitae est expedita id sit molestiae. Aliquid ratione et soluta voluptatibus veniam hic enim laudantium dolor. Incidunt laudantium voluptatem voluptatibus similique fugit. Optio enim quia.',
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
                id: '8336595c-4691-44db-bb63-a7fd9c7f8349',
                
                tenantCode: 'g68l1gmc99rz7oxg9zkzsa3fnj5jkxrv7xmpj645kyqo9ccokh',
                systemId: '72677ac2-de78-44cd-b75d-06bb7299013a',
                systemName: '15mo0beur0lgyfln8mjo',
                executionId: 'f85cbdbe-36bb-42ec-8c66-c929c1d74a50',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 15:34:16',
                executionMonitoringStartAt: '2020-07-31 05:03:01',
                executionMonitoringEndAt: '2020-07-30 23:16:35',
                status: 'STOPPED',
                channelHash: '9ixyhwgvkepnd27p7fazfmpk08phwvs7nafyfmfd',
                channelSapId: '64c5sxykizoehzjxq2u2my5fx7fufgpolykkjnazupug5wbtgk',
                channelParty: 'arvctxnu63mfmw8bt8lduhqph4qnpwt1hwjampfzpb2b9qtjl23ituegx6uiqmhhs4efnafixebt6wtpr7xijrs2q006b6esjvd5o594t3g4ok250bj7cbiyydltrfpc9h0a9hm7ofywku4fgjo28ysd9mtpxjff',
                channelComponent: '1hkbkul4py0jme46kz2hs3d3ymr93rc45yzcfk8w8usesto69l59d71ddmcsz16jmpfmsbv1fcip44tg8pyt9be3jyg5ocs06xwbgkxo9u44vc38ev32v3p7rpc55bg4gjuiuzunh7ht0tdtkaamc97s3naqoo80',
                channelName: 'k7rqixtnf723c3q2s0mn8o69u2tbxr60asg1z2eu2zydha3lmnlttc0oaeu5n4oek6rvh59k464gr3g1s0oqqhxamji0c24p5bl74fa8ogpt5tgxp2hbenna6xtcxo54r3h0reqpuf9bixo92c9slwos052fxopl',
                detail: 'Deserunt amet dolorem aut architecto quos et et. Aut fugiat eum non libero quia quaerat repudiandae quis. Dolores ratione laudantium dolores eaque nesciunt velit iure blanditiis voluptatum. Consequuntur asperiores fugit quia culpa et a laboriosam et delectus. Quis voluptas quisquam iure nihil aperiam in accusantium. Quos consequatur eos rem impedit excepturi dolores quis ut quia.',
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
                id: '8336595c-4691-44db-bb63-a7fd9c7f8349',
                tenantId: '8c12e5b7-3d27-4955-ae4f-10e545033b47',
                tenantCode: null,
                systemId: '72677ac2-de78-44cd-b75d-06bb7299013a',
                systemName: 'vcyajejh00qdgits2qnl',
                executionId: 'f85cbdbe-36bb-42ec-8c66-c929c1d74a50',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 10:31:08',
                executionMonitoringStartAt: '2020-07-30 18:42:18',
                executionMonitoringEndAt: '2020-07-31 05:54:14',
                status: 'SUCCESSFUL',
                channelHash: 'lvdmladoepzcou2ffwi8g8gb83a2mj0k3p7ofl53',
                channelSapId: 'qsd6pfkwtue54qal3zafjhxv90imsi74dn2o92a8a5a8n5r6md',
                channelParty: 'u4j7bmgi16u0shz8pb7z9fhuih5fj85wzzbdtyw3t8s0to6mlqkx4t2capfo9ftvm2zt3q63b07n93loyh1l7gdr6cof3di69psad9anicfc5uhvunp6p05lyeja2ffbduxs9i5gi9kvw1u2p57522a8cn3ovww8',
                channelComponent: 'q2mul1r14n7z38o5bnijl2br2zrl2aychhi2midkxmu6kaqtfw6eo17w43cda1r43yyl94eozkc80s55e9y2866qv0a7s8fq6ufec7lcn1j7act0irbrbj7363b0a11k48qfdwzeu2cskp35i8hejrtfvbluue54',
                channelName: '8tkf9szowk1wrks4rvv3temv9xddgzpzzn642pt4j5nh0rkj0zque5fc6v4ucmtsi2zq1xoo5sisb22uknsvm33t0mllptnrfmnuokxxj8684h7dt8haeugwbkvv4rhr7nvfhf7ezgaho1fg6wmzuimp3xe8es5p',
                detail: 'Enim dolor laudantium accusamus quam dolores. Consequatur odit optio provident odio repellat. Ipsa dolorum perferendis. Eaque laudantium aut alias non quod adipisci molestias beatae.',
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
                id: '8336595c-4691-44db-bb63-a7fd9c7f8349',
                tenantId: '8c12e5b7-3d27-4955-ae4f-10e545033b47',
                
                systemId: '72677ac2-de78-44cd-b75d-06bb7299013a',
                systemName: 'lczc78d9keqx20gf9lrl',
                executionId: 'f85cbdbe-36bb-42ec-8c66-c929c1d74a50',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 14:37:54',
                executionMonitoringStartAt: '2020-07-30 21:53:07',
                executionMonitoringEndAt: '2020-07-31 10:57:49',
                status: 'UNKNOWN',
                channelHash: 'r9fp0lr9eg6idhzpbvhrog6r8boss57esex4bkwj',
                channelSapId: 'zbjo21zk85uihud40nohpicdl9g8uso49xv37008gi0y5qgvrb',
                channelParty: '7s52gj19psf4ugwh79553bbpjrnd8e85nl58h5zrqbzvgpgrjdfujwtjyvr1dkyvbzbakwk7ueg0rqu3elmlmj9yvurr4ci7mq63hsyoeyle6ejnne2v6mmmzq9mh3w71cxfjx6fbq4dpi44ftz9pt3u1fi3j6rt',
                channelComponent: 'esrq8kg4hankoc8rvd8e6poljbdyqpjlg73oq8u90dzvw7rg64nxng08gig9ovnv2p9za74tdnjh3sgicvyqhn290cz8i5171lf2l6hjl0zsrwavo4v2xq6jyr3xq3vwqlpz4055f4g14e0gox9j43789is2j45x',
                channelName: 'temdqk9w63no1s092r8mkj3zvybudxc526lhiq3ws3gh005xdxkd5gc7ah88rq2yaccx5le5zp90d4ktfmuoy7nix3qf88zwpvqzm8ol3w6e192nlvvh7km8a6e9zp3fo6gcspjtf5lrebpm6i6tejilpnym3wm6',
                detail: 'In beatae delectus quam nesciunt et laborum quos et. Est tempora molestiae ducimus et reprehenderit maiores dolorem qui aliquid. Harum omnis optio in incidunt sint accusamus pariatur.',
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
                id: '8336595c-4691-44db-bb63-a7fd9c7f8349',
                tenantId: '8c12e5b7-3d27-4955-ae4f-10e545033b47',
                tenantCode: 'epy3fpati2qdlsvxyjx0rabs746yxyjqxet8es6r2z9bsnphxk',
                systemId: null,
                systemName: 'zm79diijdflf6slstze8',
                executionId: 'f85cbdbe-36bb-42ec-8c66-c929c1d74a50',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 23:50:55',
                executionMonitoringStartAt: '2020-07-31 06:18:49',
                executionMonitoringEndAt: '2020-07-31 11:20:33',
                status: 'UNKNOWN',
                channelHash: 'dxvcf0uvsa0vnjtimkz3csmrkn89dqvtpt4d1xq3',
                channelSapId: '86nn7z09adoi3ykdl22si9gq60nw3804tchjahmjzhwds9j4gv',
                channelParty: '40nkhmtsaq7cy8mpyjgkybncf26qu34xgzawwhnco3x35ihkneed1de38f5b84z3y40ghrryd05s7zeknvp2tgk104vwj0pd9h7sxa4jf1sv1u3mc4bpj0pr17afmzxi4c6tyiay6f9341we7gf5s27abe740cdn',
                channelComponent: '67g71rrfw8jnrl832y7mez0ul0zfspifk27hzb34mcbbd7kfjx6mye284yfisjx72lzrb2mcmwa0q289ykf2o24edofj2iiwyc5l51mddsld0diov19o6tm7wikbgmjdte9yt9zvw2w65l1byoxbabc3qu2go39h',
                channelName: 'hw1xsplgor07lyjrouf35vk5wnc7wtxutg9sws976jcb1c6zy43d0y0xvikulswu9yijpwo41hhgxa18zoixsugessb6ib3v3g8mscueuji8garn80k8bvkiz493p11cuh3npheil75ffu133bo3sl14a56uuujq',
                detail: 'Mollitia voluptatum natus vero minus enim et reprehenderit consequatur sed. Qui vitae qui laborum quidem qui. Est molestiae culpa soluta eos dolorum nesciunt aut.',
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
                id: '8336595c-4691-44db-bb63-a7fd9c7f8349',
                tenantId: '8c12e5b7-3d27-4955-ae4f-10e545033b47',
                tenantCode: 'y1aghuk0ohtsfjz9mkk6jw6xqi8qfnzqs2ozkwwf7krm30r9ee',
                
                systemName: 'x6z6nqlhd9fuv6ea3tr4',
                executionId: 'f85cbdbe-36bb-42ec-8c66-c929c1d74a50',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 19:28:02',
                executionMonitoringStartAt: '2020-07-30 23:41:10',
                executionMonitoringEndAt: '2020-07-31 02:38:09',
                status: 'UNKNOWN',
                channelHash: '29lxdq5c0iizdtwg0vl7qbu20uegcthjqyqgfpr5',
                channelSapId: 's2qg6jjqk0u7mbuby26hixpbw92a3wczqpqp7ez5c259fdiuss',
                channelParty: 'he4u8zn3e52n4zmln4zozw8pwywvh0j2viqgmf69fg0laofzhernbf24netwcwpsaeeflc0eolypws8gwu4gwq596kgyhht2rvgyjfkx03c9g9lr09u8jqh9tib8p8vwlxia3adf0xhkoraw4go2mnws6wmm9csz',
                channelComponent: '51tgafmbu3m38ih1dp4w213v2gmspnk9uqie2cuc7xoo5nd2354hc5jemh9vf6dw5ysgmnrq5d8z4955hngrd2z51z7jl9okdg5ftp8kk1wuk6bbi8i3kx2n24frcecdsgulornl1gzg62zmj6eja347zs3b9eof',
                channelName: 'i798ebcjalq72tpok6xs6hy36s3w1nlevslbpyszrsyzvh1mxrutd28o0m87ux5vm69lozdk5l43cukrqowkncazo1namom1a8ndlhbrj1busmairvi6xhsp6k3vzoc57utza8ll7ic31qn2tqxfgwp32kbi2108',
                detail: 'Sit iure est quae doloremque vel. Cupiditate delectus quos amet aut rerum molestiae eveniet velit est. Voluptatibus ut nulla qui placeat accusantium. Voluptas culpa accusantium magnam sed.',
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
                id: '8336595c-4691-44db-bb63-a7fd9c7f8349',
                tenantId: '8c12e5b7-3d27-4955-ae4f-10e545033b47',
                tenantCode: 'vd5sn6wa1z0aqrvs6wm7keqj03r1k4bxmfvdspyxv9rzp3voja',
                systemId: '72677ac2-de78-44cd-b75d-06bb7299013a',
                systemName: null,
                executionId: 'f85cbdbe-36bb-42ec-8c66-c929c1d74a50',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 08:22:10',
                executionMonitoringStartAt: '2020-07-31 05:40:18',
                executionMonitoringEndAt: '2020-07-30 18:14:05',
                status: 'INACTIVE',
                channelHash: 'ndkolw2cjwi5pdg3qstga54zmx2q46689myqk3u8',
                channelSapId: '9oe3of0ewwws7pjm16r5nov87ak7k9iri9azh0dzrub4qszmw8',
                channelParty: 'zlmi1hqi0qyll81zp2k16fw8qil5kjyvfu3o4odddcs33vnd953jr9ur5xydzm81a0xr1x6qzt6ajua7r6spbdojkcvp4o31p3bbmieay7v4o7uavflvngsfltgk3dreg3klune4q2vwzfoxzxeh9wzxdpa9rf8v',
                channelComponent: 'u0rqu2iqm5mu465xsggetcjpbl2ajpfcsxupx0fp9p34ynhem8lad22rd58zasw11s1s2k4xacvqxnzeh8i2y63yu8dj5g1evqclpa38dj3za1tpnuimr6o4t78n7olsxlwkbjz4qvwce38l0namdgmk7mlgfvh9',
                channelName: 'i59i94xy4rrtyfrnzr40z9995spq43li39q019w909zrqowcprlv57vv16i9gqt0e19nhsh8a79u83sk0900guonj99p7crc1oxbxhns7t7og05qbdv4xztjeyly6irt2jpvlfwiq94zdbh7hsivdqupqa5wut6e',
                detail: 'Laudantium eaque ad omnis minima enim adipisci quas autem. Non est voluptatum omnis repellat omnis neque. A sequi unde. Aut assumenda ut quisquam. Vel et quia repudiandae fuga provident ut enim ea.',
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
                id: '8336595c-4691-44db-bb63-a7fd9c7f8349',
                tenantId: '8c12e5b7-3d27-4955-ae4f-10e545033b47',
                tenantCode: '1qs3k2ldovranmdqgtzy045bfzrez5yoa8vf5m5ijxq3l2o8z4',
                systemId: '72677ac2-de78-44cd-b75d-06bb7299013a',
                
                executionId: 'f85cbdbe-36bb-42ec-8c66-c929c1d74a50',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 02:23:22',
                executionMonitoringStartAt: '2020-07-31 12:10:01',
                executionMonitoringEndAt: '2020-07-31 11:01:39',
                status: 'INACTIVE',
                channelHash: '0td6ijgmmmmvb2e5mfn0x4ooewzaz4804xavn7ua',
                channelSapId: '5mdikmsz1ikhuelo9n7w2p6xvpnhnaga6dmoz6r7zrd9bqn3l1',
                channelParty: 'ar3ai41w1e9d089ry9xpct0e2mdf3a9mznen5rqz0nj0r9k9kf2hhyn66vhkpkbjl74o9gjicro2cz1q9c6cp3h4lzbb6svhk8udjnavjetr39oyskgeod0mivl7523yiktynhail4qj1a4g8ycf5une5466o25g',
                channelComponent: '44xjx8wafti9gl6z3nquxgudu9f5xlbou7w76g8en0u1vwyudquuh10mcnr4bqawri8ndi0w0jllyixy5yqpngln5nigal9t9ujw8shatnuyhelwcmq3dzrm2qlsjg2ladl10k4r59yu81cxwqb901jvw0c4op18',
                channelName: '6o5sqk01yeejoa6pdtq891c3xl5sfnyfcxwl5t3uabubvgxkz6nd4ivguqnxgl0d361vt7xcoq1osbkvropmnu9oc34di9ww4350ujdtiq6tpa14modhragge9t3gcpe9ldcx3am8e5p48q0sbxpz2i3gkipeqdl',
                detail: 'Incidunt possimus est rerum officia. Enim voluptas non. Eaque dignissimos a accusamus fuga nam. Omnis nam vero corporis et repellat qui maiores expedita quidem. Laboriosam voluptas beatae ut deserunt eum et sed omnis.',
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
                id: '8336595c-4691-44db-bb63-a7fd9c7f8349',
                tenantId: '8c12e5b7-3d27-4955-ae4f-10e545033b47',
                tenantCode: 'l6fpazuzlqqodlc6dcb2wqmxwd4sme69zpkm6mswmglpjlesri',
                systemId: '72677ac2-de78-44cd-b75d-06bb7299013a',
                systemName: 'zjp3iaob9fv5ty41l4qu',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 05:42:46',
                executionMonitoringStartAt: '2020-07-31 09:07:56',
                executionMonitoringEndAt: '2020-07-30 23:53:09',
                status: 'STOPPED',
                channelHash: 'e5mbddwgj66difflxgkct1q5ohch3fmm0x207omu',
                channelSapId: 'v62q9dfn1g3yju3ggu4jalxw2vl7s05zjrsvt1iqn8krm9ilgr',
                channelParty: 'fvfv98opqttzjmuo7rh0m1goim5irn5iu6fuaz76qqxc53qijzbhhdm96cfqgnvafmhutgh83ieo04hncwh7a5wtltx6a1omk94lbx6tyobgwkx04rpoiycaggg86dn1ycc1b2v2o2fie2a5wkihtz4qsbsa18d8',
                channelComponent: 'fhe1lxnjbh7mr3w65nur36oul8g3u0svaxj3d0xfdo9525rgk27bi9t0i4xa0od2eb3tdvl6t82egtwxu2kta0zmxcmw2s7jlrf7nepdubk5ti7imkged03h25gus80o9063txmv0248qohbmptznl25ygmv21pe',
                channelName: 'dxukc422v25m5gemzzsntu3iw5qzpn1lyi2g62wa4jw7kub8x632ndisp0npfwz1qazjxkq19si8pp0xumaah0uk5cxxvt7svn2boq0cw6lcsqv7wlqih0dy3zt1txquhn6artomg47ivt1007dxalfcq0nd81tt',
                detail: 'Sint voluptatibus incidunt sit voluptatem accusantium. Sint totam est odit iure commodi fugiat. Vel perspiciatis necessitatibus voluptas illo.',
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
                id: '8336595c-4691-44db-bb63-a7fd9c7f8349',
                tenantId: '8c12e5b7-3d27-4955-ae4f-10e545033b47',
                tenantCode: '51dmb86ceyjeov8telh1ippas1xt2qqzuswqlrtfhqthwc0vqm',
                systemId: '72677ac2-de78-44cd-b75d-06bb7299013a',
                systemName: 'nyez6ufe6ahqfi49gd0n',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 15:09:49',
                executionMonitoringStartAt: '2020-07-30 20:05:15',
                executionMonitoringEndAt: '2020-07-31 08:09:11',
                status: 'ERROR',
                channelHash: 'soecw4lejoqsa1p8vrxyemomzrepnw5ntziq53md',
                channelSapId: 'ghadhtvo9ecevh395twtpbzr4nuklxdjhb27ztw4vau2vwlg7n',
                channelParty: '3iehf8hfr9tri5os851lynpqccaora0jx697le04vfr2vsud9uns0gffx3y04sajtoolu1tegib3aayi5kfmbqiuawauaq75s5yjo4moxu9ne2j1h8fvmpjnpsgd8un97he5hzkfmgdceqxwtla9z2z14t8wp7y8',
                channelComponent: 'l9rmz0z01xmjht5gcshndgmhb6urs1r6i6jhpa1o2mhc484uclcgjqzyb59o5e3d3cn58yzu142986x27ewpeuxmer7y85xlm23wbhv7jhorh62gc4rj4in974jqnnfcs074zpaj3z4odc9nrbpsni8zhisj5nls',
                channelName: 'reuc3abrlc8zqfhglblkisjwu7r2hb50qttrb7mi0v0o282kodwefj1nnm5cgwq85y80yec60s0ieg1k75xi1gotgiftv74m7ppggpo88f4904afxfy2bm37ktt8x2mxjkyuhx3ruxg2cpotexnmg7qm8syhyj6a',
                detail: 'Voluptates voluptate et labore asperiores et. Soluta voluptatem reiciendis saepe. Repudiandae sint et quisquam sapiente eveniet numquam. Commodi voluptate aliquam aliquam ducimus eos. Asperiores qui sed consequatur facere recusandae tempore tempore consequatur. Temporibus sit asperiores enim quis.',
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
                id: '8336595c-4691-44db-bb63-a7fd9c7f8349',
                tenantId: '8c12e5b7-3d27-4955-ae4f-10e545033b47',
                tenantCode: 'l6lo6yytsbhw369h7ozbz6k1lmbdehyv1w7fl65dey96zcelv4',
                systemId: '72677ac2-de78-44cd-b75d-06bb7299013a',
                systemName: 'm1rnlwggjwynqevubg84',
                executionId: 'f85cbdbe-36bb-42ec-8c66-c929c1d74a50',
                executionType: null,
                executionExecutedAt: '2020-07-30 22:03:14',
                executionMonitoringStartAt: '2020-07-31 08:58:55',
                executionMonitoringEndAt: '2020-07-30 17:01:09',
                status: 'SUCCESSFUL',
                channelHash: 'h8cp6p6pw45novtdm51n8zotraudqq21of13i4qs',
                channelSapId: 'xclwuka6opnuump411whmqd56awqlg7yxpnf305o5jjmuivck6',
                channelParty: 'dexul2y3q2gllkj3j6ph4pxswb061dfh8k7sm2411qheryelsez8n2wjo2axkwsyfi74sofaiivc2ujdc7p7w4ubf3xih228ovlbb9w7pxuif724ya0c76c11vies4bxnyth0e77c5j4us8ob7osr0h7dck6n8gs',
                channelComponent: 'oldn4ga5z9lwvr6gh6v7tkirxhjscmwqeagdje6s26jvu1scurdm9na4o393ylz10ltnvfac7u4qn4njbiiszb1u3fchr08grot5hp49jt18aw8rsg9fcam7mnsyaopstcysf68omydwtchn2021z72619g0euv7',
                channelName: 'ua027shs3ktu378y4ukp0hlvrc6p3c4ffrxcia6nwsnlq65rb57w6fl4jeocvqad0i4iq6r8jlwc6hdez30pepd0n9pxy789jouxowgj2d1h66png7fmfqfcdm5vi17soe608aswe4jsgtho0y4bmxh4yh46l5wa',
                detail: 'Asperiores et ut saepe delectus laboriosam voluptatibus. Perferendis facilis odio saepe et corporis commodi amet repudiandae reprehenderit. Vero praesentium voluptas enim natus vel placeat quo dicta repellat. Id voluptas nostrum id quidem nobis provident laboriosam fugiat eos. Cum aut doloremque aut dolores est temporibus fuga. Natus occaecati quo soluta culpa quisquam.',
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
                id: '8336595c-4691-44db-bb63-a7fd9c7f8349',
                tenantId: '8c12e5b7-3d27-4955-ae4f-10e545033b47',
                tenantCode: 'i033b95km59ru430hnkfcho4ea73cmuo6u8y5xx5q65qlu1dpp',
                systemId: '72677ac2-de78-44cd-b75d-06bb7299013a',
                systemName: '5n8zd9v3hkygyj6suqx2',
                executionId: 'f85cbdbe-36bb-42ec-8c66-c929c1d74a50',
                
                executionExecutedAt: '2020-07-30 22:11:02',
                executionMonitoringStartAt: '2020-07-30 16:03:30',
                executionMonitoringEndAt: '2020-07-31 10:25:59',
                status: 'UNREGISTERED',
                channelHash: 'cwx6uwyk7dpeohvg6g2jaue4x2mq8v6ac39yhu76',
                channelSapId: 'wxenzdmjibui96nkusklzkh7gw0a4vge61n87fps7trkg0egqa',
                channelParty: 'h5t8veb9ptfep39visny96dawy3h7zlto0gvuaum2u0knv2vpy7glm8iyr86uib5aew51r2qs7wvzvd9a3sk6hyjjavzpkk98u7q579k875b1x9l9mnetozhawvy011j6dwb2fc6loqzxqkld1dkqiajr1646ev4',
                channelComponent: 'gvdbwgsme67vinrl6878jdgohng1vezkvo404bhgpvha026cr19nm4dmkgu96z9h09ahx9queqdlvj1eebwe4j24k5q2umif8krlln88p9mqp0u1x5w9vln261ggodqduqfrm1f3c8qfj7ffzqo9m08bsj9bb7a5',
                channelName: 'fasoxdib5kbjgez5x1f05osswcnmvg24dnv9zyollbft4af44nqpqnfzi6t21xrb7xn7yhcfl4s9gixdyewwpk5ek6c0njjc3ysczpwlvh13d5ar5hwjw1qq4g3rxwdk9gogzbyiciv3flmago2tttuot0ekbtke',
                detail: 'Debitis quia adipisci aliquam veniam nam commodi. Rerum est quo. Provident quo aliquam in unde blanditiis iusto veritatis. Nemo libero non voluptatem deserunt quisquam quam quia. Qui molestiae sint. Voluptatum delectus debitis omnis sint doloremque.',
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
                id: '8336595c-4691-44db-bb63-a7fd9c7f8349',
                tenantId: '8c12e5b7-3d27-4955-ae4f-10e545033b47',
                tenantCode: '98zxqaimkg0sqignixll0ziect9olg3xvho0ixobx6ujet49q6',
                systemId: '72677ac2-de78-44cd-b75d-06bb7299013a',
                systemName: 'ikiunlymggn4xs7xl9z5',
                executionId: 'f85cbdbe-36bb-42ec-8c66-c929c1d74a50',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-31 00:46:31',
                executionMonitoringEndAt: '2020-07-30 14:32:03',
                status: 'UNREGISTERED',
                channelHash: '2z51qlnn8rgsb2tm85e6n56brqp2uj9rwce81pah',
                channelSapId: '8yrdzoklshhe9o4yoqk30in5kqnkv3x5w3wifmlok86h78da1p',
                channelParty: '9d0p78z0ykxtmrtcjq6y54mvm72e1gz3hs832vevc9jmntbefuxc1f86w9anfzjv3y2lsyg83st7aks8gix4mzkn23zfygu1n9mx0aojh6vfva31xotl2ovt7k39lva2betf5imsvhuxi38teggw6yi23a9m9x2q',
                channelComponent: '8jif02c6rry1omq5nw3lc64b8w2ib4bpe0a5zllzsvehim4aj966m6s1igh81txfqcowzc8hi8of17b30zt57fkuz41j4bztj20aldxm6q4iuojq1md14lf797zv5mlbcj79622v2bgi4havralwgvzyazhstleb',
                channelName: 'rvx7h3nv2oj56g66kgt1ib0it6endnwjafpuob4cn1wnpi9uycsa2oyy52kwg85ttxc5zsr9hfk9uyp58raqdr8o8c8se4msbb77d2fdcru5mnz88d5ypulilooj56n13fwy9ekv2hvud12wh6997ef25t01lub7',
                detail: 'Cumque mollitia ab aperiam quos iusto perferendis non et. Eos iste accusantium iste ea. Illum itaque enim corrupti qui fugit et earum suscipit. Non fugit nisi tempore doloremque esse. Dolorem illum magnam non quia provident.',
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
                id: '8336595c-4691-44db-bb63-a7fd9c7f8349',
                tenantId: '8c12e5b7-3d27-4955-ae4f-10e545033b47',
                tenantCode: 'vb75t4ko1nk077q58kozaqc94vgxbgy0eanztxubiqt43qd7zl',
                systemId: '72677ac2-de78-44cd-b75d-06bb7299013a',
                systemName: '8kqsg7aminulh30a908q',
                executionId: 'f85cbdbe-36bb-42ec-8c66-c929c1d74a50',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-07-31 04:56:53',
                executionMonitoringEndAt: '2020-07-31 01:22:14',
                status: 'UNKNOWN',
                channelHash: '9lp1zhfcjz5z3jw4brwcopu60l0ny2pvc7n90ue2',
                channelSapId: '8julcdo9anvvayv18hullknq8tf2jvkr5zd8gpnpj32qqdtqn4',
                channelParty: 'sk5vgi0o4dptcoyv39os4xa6ocgnu1wzapvore8e0mzrvxb6ncel4po9hz3jiwc0s8dffg3elk9woa6lzvf3g70j31u284al1zpyl48rbi6jg4vv8c7hv2l64rrccjpy3rp09mllzeakdyn5189jg5flr9htund3',
                channelComponent: 'tyw2t5diu97zxmsh2fzlzxzen3r9cdee9bkugltiaw5o8gubmwyvtm15m7q4v228x2c19mjr2jazywol6arhwmezdyaswuj797t8tre7ybuj6oynxxj8z28p6qrrevjyp00nid06cukvc0mnfxrfc7613n3u1vw6',
                channelName: 'byctdygr7d5x8y0eeek1g48d8zk9d2j5uwe4lzyicze3ofjbmxd6a0mzzzr9h8zj31255bbd8f24crzf8hx620572s8l51mr5zcvwb78ul0q4492k7y4u8qg5ezmzet06nvua3ihjbn0bqn9smx646nqt2w5nk2n',
                detail: 'Similique et quia totam et illo ut. Enim necessitatibus est quo libero consequatur temporibus temporibus molestiae ut. Et cumque nostrum. Voluptatibus consectetur aspernatur doloremque fugiat. Et alias aliquam sit quos placeat.',
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
                id: '8336595c-4691-44db-bb63-a7fd9c7f8349',
                tenantId: '8c12e5b7-3d27-4955-ae4f-10e545033b47',
                tenantCode: '38f5woiwmb13e7u4s67uw7pzcq4fbmmajyebcyta146slzmyha',
                systemId: '72677ac2-de78-44cd-b75d-06bb7299013a',
                systemName: '58bvt78z29cwtoh8jt0w',
                executionId: 'f85cbdbe-36bb-42ec-8c66-c929c1d74a50',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 00:42:16',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-31 09:57:48',
                status: 'SUCCESSFUL',
                channelHash: 'juhvq34svdpgovi8vq7u3kvln1xhfpr17t1zc953',
                channelSapId: '6l75ubm5ha7bf70tn1nswlvsslght3q8mvr0orjlgsbghfuuwg',
                channelParty: 'lhiykq30tv14b2ekeqxzse476h6b57m7r4jsu5fq34qkdjxmr9b7ce7kq74mi873plb4zvgq7yr6znq7o7o534rbhzvxeb1vipbsdqrmslnu3xo8el2b8owq8yi8i3xs9f2i8tp0resjtv4vwxm4gw2ki0zn06c6',
                channelComponent: '0vegslkwl7v6rjumzff2ler8jyv84nhy3o9x0l01p3oghv0t6h1m1et9kdq2owjkd1s6d9xrlr5mimnwjtozeum2up34utwszeg6zk8f398d307163ezll7b5dqj2g327wskcl16lj1wkp4mo4yh3c6omju03xze',
                channelName: 'ypexrvek1w6f2d4bb34phr8mugfusqad1tbqqeh3049ya8y6c6zuwqaihpw9cic4bjv28pzel2t6wco8ypf4wigm26m4onfv6ze3cunwoa8px548v6jdhry2hbfephob3i11bgwuzregbh13nvr81wvc3z5vba0h',
                detail: 'Corporis est asperiores ea quibusdam. Perspiciatis dolore assumenda exercitationem recusandae cumque natus facilis doloribus. Animi eos quas dolorum numquam ut. Aut quia nostrum quos illo iure et fugiat qui non.',
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
                id: '8336595c-4691-44db-bb63-a7fd9c7f8349',
                tenantId: '8c12e5b7-3d27-4955-ae4f-10e545033b47',
                tenantCode: 'en6jvrrbpxsyvt3hpelbfirzo5skmwrq3aajqyhvzyryd6ql4g',
                systemId: '72677ac2-de78-44cd-b75d-06bb7299013a',
                systemName: 'hp17g5iqa5ruwefme8ej',
                executionId: 'f85cbdbe-36bb-42ec-8c66-c929c1d74a50',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 05:16:19',
                
                executionMonitoringEndAt: '2020-07-31 11:03:58',
                status: 'STOPPED',
                channelHash: 'msoc4elnpivgu1naovza71q4e5blfta1z1zjvxm9',
                channelSapId: '01869plgoi61w9wsdhx0ueas99wgfwst32euxszz29eqbhoash',
                channelParty: 'otq46cd7qxdrmfpjqv386dn0zh2rai7awrnmwb7bsy6yt6vnadaw19ectlc6j38mxzld0kjog7cufqgbdbodl8jjk0ghkp803f7i2csp7ofjv0na1gpsw1yu5qnd6xy2utostdt5yin969mrk9fjo7pn4vmc0geo',
                channelComponent: 'u5fm124bnubqad3cwnlgl8w0n09ed7hjix114itsgrpu7a8s4pwqfttmiz2ydp02w6lv4xo7eqyku2rapt3dce1myy5of26zv6bh3kesn25idghwdzaiofdsw4t4j28hamzx9j761itjdm3vc1hhi8kqm4kjtsda',
                channelName: 'v0y1pgm4v941t17xnr019ffk42pxp3bmktifplgej67uojffy3co4s1s1m7qezf2y7jm0akhs7ncwyqhq6735zxoorr321o54yqi07nadk5xh21h1dee1mooqlmut8ix6tfe5fnabhnywp6m5tfsw0bci98t3qu0',
                detail: 'Fugiat itaque aperiam eos voluptates quos voluptas quod est hic. Qui ea officia sint ratione natus qui a. Temporibus quod nihil aut voluptate dolores odit tempora. Est molestiae harum illum ducimus.',
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
                id: '8336595c-4691-44db-bb63-a7fd9c7f8349',
                tenantId: '8c12e5b7-3d27-4955-ae4f-10e545033b47',
                tenantCode: 'ftkpgbw0p82qgiqgrfzjugm44lipw75zbkm4fggq8j486wccr5',
                systemId: '72677ac2-de78-44cd-b75d-06bb7299013a',
                systemName: 'ei9sk9xq5kwzw6yoztel',
                executionId: 'f85cbdbe-36bb-42ec-8c66-c929c1d74a50',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 00:58:10',
                executionMonitoringStartAt: '2020-07-31 12:45:22',
                executionMonitoringEndAt: null,
                status: 'SUCCESSFUL',
                channelHash: '0tzaa60pztdjj3qemskb5wm3dc9kw14d17wqxkfz',
                channelSapId: 'x9n2e1ydzrood88vbpolo9zvca0bkobxlc7a9om1wh7fhrzatc',
                channelParty: '3g92p6ywfqx8ct8q2520es1ozolqnwjg0wckslsax0n7ww7ts9cu0dum6dtae6c9nrx7jutakp6yedqb2orwc44moshqr6jwfwhhole7m5s6wvak2nod235y8myygq196bcwia0d5ejjn1kqdcxfls1hzxhiqy73',
                channelComponent: 'fax5jfa5zoz0h31qp2ahybcto576w76khzq8y77bq7htyhsd3ylq30lotn6x87tssldcrzalzuy7k74co88dfdbngw06vqgs21lbuladd9pl0opz3vttv9s71ulamyj6pfl9fg3s9kevgk7157lodq6jo2rtd15j',
                channelName: '4u1n4m85s4r6qs569ivvegvljzr92vzdiep57xyg2tzsfic3ux0tohcu88ep57dptmirqmde0tpyi62pxgwj775fe1lechtjb3smb6icd074hry1yc8p8outi4bh1stkeyao4yp0tdd0ckwbcxk6ekgvqi4aoahr',
                detail: 'Esse quia ab possimus ad mollitia illo sit debitis nisi. Non eos qui. Voluptatem in ut corrupti aut. Dolorum perspiciatis quos quis magni natus laudantium facere et.',
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
                id: '8336595c-4691-44db-bb63-a7fd9c7f8349',
                tenantId: '8c12e5b7-3d27-4955-ae4f-10e545033b47',
                tenantCode: 'wukbilxkf3pb21msw6e4jksbymhk1z01m7ultoez7qs258rpv1',
                systemId: '72677ac2-de78-44cd-b75d-06bb7299013a',
                systemName: '177qfqrhuhx1ri2jme7z',
                executionId: 'f85cbdbe-36bb-42ec-8c66-c929c1d74a50',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 16:47:15',
                executionMonitoringStartAt: '2020-07-31 04:06:07',
                
                status: 'STOPPED',
                channelHash: '685ces85juh765s8kfx1bdyr20gb1bzuf5lgawl2',
                channelSapId: 'jt03reyyzf1ykony0rxicgf23hpxvgszp49116v0snlge2bag6',
                channelParty: '0ducl9sxz39iumwb3irfsys4tumam9lrr88186od0tg8jxzxe0gr4jtbz3j38uh2pii8n65ff3hkve6gpgnv6m0r6um90xtqwmfkks987nnqkzvvxt0u34mghs7t6o65ajrbmbdbc4qckxncfrvn914upemts5rr',
                channelComponent: 'a0x8sw1q5eekw7n4sjn4toyracztgqpz4ddyol86yzcizbzg1yvftd4rnj9wig8lmcidkgtyje1u4on918dm9c8kirp4cxrly8k09zvrsybd6k5sws2ohbmdcp3kkhgudnumjav03euv987ig0z4fo5a5zhje9wu',
                channelName: 'yke63onubykoi1etdjgcx9xu1mnbo33xcrbstu40v6sora5k60a4o88d27h2t9nxad79yn7ayis3j3fzf6xsp7qod0z7j5w631b1a933uogw6p1i5fb4mt89i0ylvfqpp16ondygjnhzxqrym6h3delq00yxw2w3',
                detail: 'Dolore totam unde voluptates est quae voluptatem. Quia sapiente eum laborum vero similique molestias quidem dolor in. Repudiandae velit et omnis facere iste eos impedit quia sed. Odit dolorem sequi ab officia quia magnam consequatur temporibus. Aut et fugit quia veniam et quibusdam aspernatur dolores. Iure ducimus hic sunt sit molestiae quisquam eos quia.',
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
                id: '8336595c-4691-44db-bb63-a7fd9c7f8349',
                tenantId: '8c12e5b7-3d27-4955-ae4f-10e545033b47',
                tenantCode: 'lez8hnbut7defoj1pkgczndyz7n6utt91l7zdlv754q36o2228',
                systemId: '72677ac2-de78-44cd-b75d-06bb7299013a',
                systemName: 'flehl4fmh95knykiwob0',
                executionId: 'f85cbdbe-36bb-42ec-8c66-c929c1d74a50',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 22:45:03',
                executionMonitoringStartAt: '2020-07-31 03:21:53',
                executionMonitoringEndAt: '2020-07-31 08:23:00',
                status: null,
                channelHash: 'n8tg3kvx4ur878umdzp0mxy7ii6qrmrsx1snm18n',
                channelSapId: '0zcz2i2r83grsckv3o4wdpqcl70p4umdnmco91fgm9wrm2mynm',
                channelParty: 'in9pb5kbkw6a1epp7fbj87g3k5116xts7zo4mbnwfqhjsu2pl05bqw9bqxazp5x0c6bzxs3iqjbqhbc8gz9cskihjo6gdb6j4mwbjn1pn4zmujgsr5sxayutm37c42rft97wmlvtuq4ht5deuk3jdb513auqfztq',
                channelComponent: 'kg9a9m1599qjdxiomubj6bz7xzv64t368fj12cm4hzrp1bhlqqfd42bpdg8wfg6fln6dxzxeaexqfi1ztekj4p2yhwx1vhfo8nj791y66gp0xv0q9buv1k03x6lklqcq463vsvw5igpz4hb9vcz22qc436ot9nbx',
                channelName: 'aoqhx9eg8p7d7bxhh1vxto7suxrvccvo2dpth506rnfpz5ooanpel62fdkz1chaoc9ojqo6k0ls8gxczby1tixmp7w2bzc1b6el5ypbb15di4i3j8xnjcvvt05x5rng47sk5excmbz5m8qt2juswoup63c59r6dq',
                detail: 'Et sit enim totam sed dolor cum. Et qui ducimus quas officia et et occaecati incidunt. Voluptate nobis sint facilis autem.',
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
                id: '8336595c-4691-44db-bb63-a7fd9c7f8349',
                tenantId: '8c12e5b7-3d27-4955-ae4f-10e545033b47',
                tenantCode: '0oa73bizc1pute20sv6tzjp6hc06ijy67o53nv5niq5z12orhn',
                systemId: '72677ac2-de78-44cd-b75d-06bb7299013a',
                systemName: '0urvxl319sf54r8mbryp',
                executionId: 'f85cbdbe-36bb-42ec-8c66-c929c1d74a50',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 21:50:55',
                executionMonitoringStartAt: '2020-07-31 06:20:19',
                executionMonitoringEndAt: '2020-07-31 01:14:45',
                
                channelHash: 'afamsjds71zg2p8rfzen2bkdkqk5i0j35jva23t1',
                channelSapId: 'mfjxm9sneaj9npr1gy8zcu16q9cwthnn4sw6fdfk6tl008iqfs',
                channelParty: 'obhm9izugi95wjytd54jbfnqn99xh5a752j1u0cy46x589btbfvacxyxz9rg5m37ra9g8hoav5y30nm8z7lz3evntj1a7u7y6udz9zoxa73i7sp841lxacyof4m97ikh2xzzea1f3jgsk3uoqhouvgkwnklvu4d8',
                channelComponent: 'atdxyoup8qu6lzijq2nz572k8l2vxp641kpdmbjwq7b915jaox64r80heuc21nwq281nhx5edv6mu2n7is3pee9nhalx6t1s2fw3rew6ch9zre0tks4k8j6jmlta4j61o6l1fv8687s03nllv7bfmhpmz9obivib',
                channelName: 'zjzhnsdo2odfyu61ubpz4l47t2kn2wcjsn4v5hvdgh9x1kdjg8wxoi3om4lacjn3yalv14zts40f3bm90czdawzlh4euycdcid2mx0q5j2nr88fjaykjbpq9kr1wdjkmr54aa014haqyrs1678usjcv6f5qgqn2z',
                detail: 'Dolores maiores libero voluptas. Commodi rerum ut maiores cumque ex ut in. Error cum cupiditate dolorum animi. Cupiditate et non qui corporis sit exercitationem ea non. Quis hic itaque ad voluptatem sit sed quis quos.',
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
                id: '8336595c-4691-44db-bb63-a7fd9c7f8349',
                tenantId: '8c12e5b7-3d27-4955-ae4f-10e545033b47',
                tenantCode: '27hlpsa468dofhun7wo3o8l4upccs18dt30rpfr4bd7kjrapcl',
                systemId: '72677ac2-de78-44cd-b75d-06bb7299013a',
                systemName: 'ftw8syk000ofckic5b2d',
                executionId: 'f85cbdbe-36bb-42ec-8c66-c929c1d74a50',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 23:00:05',
                executionMonitoringStartAt: '2020-07-30 16:00:25',
                executionMonitoringEndAt: '2020-07-31 08:28:57',
                status: 'UNREGISTERED',
                channelHash: null,
                channelSapId: 'p4jt95t4ysvunfzp301dmr5yga7m4h8x0vk0lmyy9b1hfv8gn4',
                channelParty: '797g7fli4p4tujacedhf7wlx4kvjvmfxojejpykyukzbbi92qqwog7305dsfhdg9t6dfy3ovulotrztl7h2ya4yoetah7p4k5uj0qxwus2yvporycqjk04ndr5cvri53ocrp5beomlik48pte7rqiszv3i5kgt30',
                channelComponent: 'ufrnoa5m93lf9dhtrknv8bxejj2xd7kfv87jc1cqud8wet2xtyj3lxw4evk3d5bhqo267t2xuzpzlmdlzlqpcqt2i21iznv6wwz6tq0fm17ce9cwq1rgl05ojcwtm8ds0azy55tzmzr85ep6n5ht8rhbnesg5lgc',
                channelName: '2rfgfs28cft0cxjqihgygg5wwh78vrta0w9t1fmuwnsal1j2fbaoc9v2zsjcnhwcao2sby4fcx8a1p3ab5dhm6ns3pmpzyydt1g42snr784gr01zecxu1bnc13ruyziz33nmus323rcal13cn71lxwpocvqx3iis',
                detail: 'Cumque voluptas mollitia dicta velit. Fugiat reprehenderit reprehenderit. Omnis dicta veritatis cum exercitationem voluptatem quae distinctio. Voluptatem architecto expedita molestias autem ut est aliquam doloremque. Ratione fugiat rem commodi. Quod est aut laudantium quasi ea maxime vel fugit.',
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
                id: '8336595c-4691-44db-bb63-a7fd9c7f8349',
                tenantId: '8c12e5b7-3d27-4955-ae4f-10e545033b47',
                tenantCode: '2lkjidbu6j08fu8whu930r38suxi8pay6axjuvxq8fb5wxj4ba',
                systemId: '72677ac2-de78-44cd-b75d-06bb7299013a',
                systemName: 'ilxadcr8sst6joz1b0mp',
                executionId: 'f85cbdbe-36bb-42ec-8c66-c929c1d74a50',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 02:53:36',
                executionMonitoringStartAt: '2020-07-30 15:02:49',
                executionMonitoringEndAt: '2020-07-31 01:21:04',
                status: 'STOPPED',
                
                channelSapId: 'ue718svpkd9o3w65ynihwwun6lhij87jb2yhmdj7ra2au0gebe',
                channelParty: 'ey98b2jsg5y9bglgkp2bcjzocmspcfh8b0di6jevjr2ipfrjp1px4e1a1ysj5cecsg1gz84gz23q8q6hm4yiv5ew7ho82h4zfwqmqcdku7n2b09q6tyfupfezki6yuxnzwm348ncoy8kkrnrdkup91iq3d2tawpx',
                channelComponent: 'h40nkxj79hk5bx1kxb2xbm2eiz5havjn6qil1s7n06mm0chr0eluzti09fvcobytvcvzh6urcsum6efworr4r83w1btr3v6ze49u85dm8lgk6si68v2jcm6r19u3pxkvmyqj9inp3jcorjd1dddw0x04wy40gn6a',
                channelName: 'wifwkczkkgnfu9zl02ybr5jj9dwlpsl4d9e66vsfmtnqqifsqrsn1y2hpkmyy92fehm55otw41tm79pqb4t8jl04u2sl9zlv150u9cx417yy2bxg05evzz5pad55d7m0h5bgavzhxdli0v0hdzdcs6kxdicq3jv7',
                detail: 'Hic ut doloribus. Dolorum quae eum ullam est amet inventore maxime aut qui. Tempore facere sint voluptatem. Hic cupiditate est ipsam harum aliquam ea eius esse.',
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
                id: '8336595c-4691-44db-bb63-a7fd9c7f8349',
                tenantId: '8c12e5b7-3d27-4955-ae4f-10e545033b47',
                tenantCode: 'iqh2q3fy7o7l0azmh18s5t21hj5cbdrsbmasvxvpb4s7tshvw6',
                systemId: '72677ac2-de78-44cd-b75d-06bb7299013a',
                systemName: 'src9rm4dhxa94b7r5xfx',
                executionId: 'f85cbdbe-36bb-42ec-8c66-c929c1d74a50',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 07:53:25',
                executionMonitoringStartAt: '2020-07-30 23:27:23',
                executionMonitoringEndAt: '2020-07-30 15:30:59',
                status: 'INACTIVE',
                channelHash: '40q6s5wdkmdk157y8i3bdr38akpj0arslf9ryijg',
                channelSapId: null,
                channelParty: '121y209rzcn4usv9kilmhmcwwiea8finkkz32zu7ssg91f9n7sxhpg9tpdq79al4853mi97x4c1lv5qkmwmuynm793jdvc5bzlomo6gcjzjd3tychtqqt8wdfjag42r8cfuxh06aun9jaulo8kknoxr2xmw4d0z8',
                channelComponent: 'u18onku29znv8lyj9srl8kqzk9fa2ox904iq1k30p9ngcfvdr2056crm1zaw893ktm8sd2ojsetxa4osxm91g6bh8nk1fok7srdxbofjf0abn1kebczjj1ijj4cr4vrusmv1qcr4mik00nyyju8xvvokpz3suho4',
                channelName: 'yf4bedhs2gthohtx5xt3o3ttoh0jznm1wh5qsfdfhrx95b83628ygdc76suul2dlozjwjrecdavd36x4ba5001h08e6nc9ngcn7b69ecwyaexgpti90m7sq3q9mchbbe1wfwdfpvo48ai6rgo5t7fdk7h6dgsmf3',
                detail: 'Quia placeat est. Aperiam cum quasi in reprehenderit beatae aut nemo veritatis. Sequi et commodi at. Rerum adipisci dolorem. Culpa itaque ratione suscipit omnis dolor est fugiat. Non molestiae quia itaque vitae amet dolor eos voluptate.',
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
                id: '8336595c-4691-44db-bb63-a7fd9c7f8349',
                tenantId: '8c12e5b7-3d27-4955-ae4f-10e545033b47',
                tenantCode: 'hsik2im8fvcu6iek7x5ududbijvrodulb3ck71crn0qflr2m0s',
                systemId: '72677ac2-de78-44cd-b75d-06bb7299013a',
                systemName: 'qef1hx82vcms5y5301m1',
                executionId: 'f85cbdbe-36bb-42ec-8c66-c929c1d74a50',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 06:21:33',
                executionMonitoringStartAt: '2020-07-31 08:21:28',
                executionMonitoringEndAt: '2020-07-30 23:56:12',
                status: 'UNKNOWN',
                channelHash: 'gotuocu3pw3okryt49q7w3xqx8h5sjuqcsj3vwjr',
                
                channelParty: '52vdxjgxb67zy5d1hmj230b473eoxjixk0mat2b4ni1xkqtakg85sgty755udjgn4gzv7gu4v0aec79dayyf9c1boc0cort66hpcycnodz1vlo9xl6zp9tyq9hsgqnsz1loo72gow2irj6qomuaiiu3q901evveb',
                channelComponent: 'ebwke7ogbrz624tama5xzbljhewokiuu4bncfhaz01pvpw1vudrtquxxduxhmfdxr3kvz9fvx4oq5n478kk3b0pe6xikkt4kkj6s97y1nr2mzi8i3u7u5rtyb0ci2witec3cws8x8i24ri2z00b7nfqbscqdvw85',
                channelName: '8t1oide5wp93c9e8ps07r1h337j7y91x6r0jdd0boaor1u6r92rh93fczdepbnwb9ae8e38ewrcp3etu1nntg1fc3wehl15a22a9jwke1flh0h3oe1tg09fw5pyk0tpte0gtkjxdi15150evgje8hguaid8km6no',
                detail: 'Dolorem ut voluptatem et. Natus vero dolorum molestias quo quia. Deserunt voluptatem qui ut odio sint non voluptatem quis. Explicabo sint id ipsum et dolorem.',
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
                id: '8336595c-4691-44db-bb63-a7fd9c7f8349',
                tenantId: '8c12e5b7-3d27-4955-ae4f-10e545033b47',
                tenantCode: '5azjmq1brd6v38thj94eqe866igsx6hptrbmc7fk42b4fcxibz',
                systemId: '72677ac2-de78-44cd-b75d-06bb7299013a',
                systemName: '1xm1uvfaspsh7ws5ime5',
                executionId: 'f85cbdbe-36bb-42ec-8c66-c929c1d74a50',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 00:55:38',
                executionMonitoringStartAt: '2020-07-30 21:08:37',
                executionMonitoringEndAt: '2020-07-30 16:23:02',
                status: 'SUCCESSFUL',
                channelHash: 'tj6bvdq156s5l8oaxkqvy0zy05rq1on8ceyamh66',
                channelSapId: '274b35oqictp4whzdurs3dirddpesctp69fkb796qsmpk1f37s',
                channelParty: '1jfi69n7ax9bsh6n69t9b0bu97vfsqrg3h9ulat1d5mfhl7oifmnhvnkzeznv6yd9757a7t3uz1xdeacyy6jdzmo797sopg6rau3ml5w9bt2e2j89rreioid7yaqr5f8rxg41xxpbnrjb2wzpsqcjhm145r0po1g',
                channelComponent: null,
                channelName: 'aykj5gcvr693m6awelc02615rgn5qqfqd0e4u9h4o1yy8945bnzmlbztaulujou30fffn6x03vp6ycmosh04hmzi81cb07db4zltbudemun7us4lxf1d3olodetw6u20qoqkvow6brojw5mfz2jloolhrliwyzln',
                detail: 'Molestiae quo at sed consequatur molestias modi amet. Doloremque quis praesentium molestiae laborum. Quaerat ratione voluptas ut a consequatur. Nihil voluptas voluptas facilis nobis recusandae et aliquid. Omnis delectus ut quisquam quam molestiae quibusdam. Illum et quos id nostrum ipsum.',
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
                id: '8336595c-4691-44db-bb63-a7fd9c7f8349',
                tenantId: '8c12e5b7-3d27-4955-ae4f-10e545033b47',
                tenantCode: 'an5jl7mpblttgf461ltp5ch0uobcesnqo1iu8y8tvbgg15xamf',
                systemId: '72677ac2-de78-44cd-b75d-06bb7299013a',
                systemName: 'sjyx0c5g7oizz283xkda',
                executionId: 'f85cbdbe-36bb-42ec-8c66-c929c1d74a50',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 10:27:04',
                executionMonitoringStartAt: '2020-07-31 05:56:02',
                executionMonitoringEndAt: '2020-07-30 22:44:51',
                status: 'SUCCESSFUL',
                channelHash: 'dllc3qwzz33p6qt50tv1d1b7qnwzfo3vntwk2ao8',
                channelSapId: 'f94sspuop7n40172iez22s6ofnxjasan6lkf56l6r0h5upmcx2',
                channelParty: 'vzt9uzhe1x4wq42luw5cpohiofotxis0ay118okx0ch2jf7vjb2kh9wss4ehvkg346sslkwjlbnf4ygin61s84lik2g0dbh0fkr8ys8hlzbkcnte5tym3e448o27xuiw317cknhigpmn9c73u0878n16u6nr1sbi',
                
                channelName: '43u9okzg598op6f76f8psn7896uhb4s24e1h9p4e3ujeylfueup4vx50ctrdua1r7nwi1b582zyqk4dp3fz6bpgntv1m2fop8gb3te8wmtyalx7gss08va5z201ntfqoyng8ri9f029y589py9o0yikuyjldqt3x',
                detail: 'Dolor necessitatibus autem et nesciunt tempora quidem quisquam aut. Animi dicta quis omnis nihil ut illo. Quaerat et minus. Sint inventore quas quia. Ut saepe ut magni rerum quas nobis. Quisquam facere id.',
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
                id: '8336595c-4691-44db-bb63-a7fd9c7f8349',
                tenantId: '8c12e5b7-3d27-4955-ae4f-10e545033b47',
                tenantCode: 'kwzx57p3w99ceajwxoe8hzuozvamzg9190zfhs89pjimzcklji',
                systemId: '72677ac2-de78-44cd-b75d-06bb7299013a',
                systemName: 'klzmf0p6x12kesf6uhti',
                executionId: 'f85cbdbe-36bb-42ec-8c66-c929c1d74a50',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 07:52:12',
                executionMonitoringStartAt: '2020-07-31 03:53:19',
                executionMonitoringEndAt: '2020-07-30 20:37:35',
                status: 'ERROR',
                channelHash: '47mhg73ciiebr7r9ta89fhv7ji65pjwvlamj8euw',
                channelSapId: '85isrmrpxcyukji3hi325ff26tcr83df90d8lu7j29whso3lac',
                channelParty: 'ebqhrehiy5cubp67ynchiufkwt385t20hwh9rloq4yq1t02hw49sjj35lst1d5gig6ead1levoav5k19crxvmw01qjbnovtfera291afy01zpn394gx0h6le73pld217b7rbpa0fvltvs1qmk0q7uljpx2w6xvbs',
                channelComponent: 'zvnfptxlp6mjqsjx0znal0axhss3hrhfx7dv6zqj092x4vu57slzne5iach9cxrcf5qnuhmelm7k5mcwx81e75vk4zhm0k4ooopiki9oaxqmkp725x1234syw3wfqzcl9qk2j7fshcup2abliv8trwtz1784qb0b',
                channelName: null,
                detail: 'Aspernatur culpa accusamus nam voluptatem. Nulla aspernatur quod. Id doloremque dolorem sapiente animi. Dolorem voluptatem et provident iusto est non ut quo. Pariatur maiores distinctio iste esse sit accusantium et. Nulla et quia cupiditate maxime sunt et omnis dolore quaerat.',
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
                id: '8336595c-4691-44db-bb63-a7fd9c7f8349',
                tenantId: '8c12e5b7-3d27-4955-ae4f-10e545033b47',
                tenantCode: 'bokda14wl86hih3kitu5to4l4fmf86t0dm5dmxt1in810g5q6e',
                systemId: '72677ac2-de78-44cd-b75d-06bb7299013a',
                systemName: 'dd6187eh218bh48fp3uj',
                executionId: 'f85cbdbe-36bb-42ec-8c66-c929c1d74a50',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 07:43:30',
                executionMonitoringStartAt: '2020-07-31 05:26:45',
                executionMonitoringEndAt: '2020-07-30 18:32:20',
                status: 'INACTIVE',
                channelHash: 'yextkz0983ym4cv6hz8lqcu30k2ukg5oc286zjve',
                channelSapId: 'jg8tcmrku4oeknjuhpy3ok5ov8i0yqbhohr781fk8s8tqx1n8g',
                channelParty: 'fdkj543c8eb9bhkow7ryy1tid83rhyx8c54vwdkfbnaj8kwbpzivwuh183pflfibajds24ct1u9yvs0rpjz9dhqgn2c5dr0yj88hza08z3kxigds96zfo43l9yppsmd6tu6d4kldbsvp8olnyvqv1otbeint7rjc',
                channelComponent: '3xzhwo4wcnrmo7t738xu0tekpzqctqz2fbmgy9kawganqrs499xrg63ix2m0dft7egh8h2op8100188xmsxq710pzjv5ob4h9xii34ybnfogkafq12tz8qmyd3hpb3icn9j262swtn6wv6qwhbbosgmjz5lk6f3f',
                
                detail: 'Inventore sequi voluptates. Eos recusandae suscipit quam. Rerum id quasi in molestias aut repellendus eos qui occaecati.',
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
                id: 't0xv4ck9m4azepd8ft0fmijcvb65zw3c34u72',
                tenantId: '8c12e5b7-3d27-4955-ae4f-10e545033b47',
                tenantCode: 'y2gp8cle4ztobufhnmpiv3owivn2sf2waezi5uylodaegh2mi3',
                systemId: '72677ac2-de78-44cd-b75d-06bb7299013a',
                systemName: 'mrp2f6hb8bygl36vi1mq',
                executionId: 'f85cbdbe-36bb-42ec-8c66-c929c1d74a50',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 03:23:51',
                executionMonitoringStartAt: '2020-07-31 05:53:01',
                executionMonitoringEndAt: '2020-07-31 12:45:36',
                status: 'STOPPED',
                channelHash: '99d5qmlr7bnrivep6wbxz2cbwt27wr3588gechcv',
                channelSapId: '2gqjwn2hsfi85hf04zhoqxrkyan7rbll1aa1zrb1nh8kuk0bwt',
                channelParty: 'z6hu1foec5g5956thlzr8w757nlyftwuirdr2esrpvs2xvfwslqga4hh3u6lqmzsk8lhkpaqt8mwoqmgx1m6rf7somvqp3rkbgll9fapvzrar91yrmxbk7kccdtiogn1a0vy875c3sq278alt4jk32z7limjm7w9',
                channelComponent: 'mbux8pq4ldttos0cyglgcmogqzw47xqjdnmdsnow2ahjwbmibbsf8tq1ri2ikpfrry86okojlp7t62dyas32v1suzy7cu2r3z8ttslomcn9r2s418drmrsji3evhd1nklc4v6g11sfs6gdxveo8sag3ag8u2s1lq',
                channelName: 'qso2g0grux9k2lddq3fvj37877lvlrpjcgwrpxyzjg2yif169im4oxy7uj6nys4skufr708zuebft9bc8led2jz1u9usme8p1vxntl2432kvt48d6j22qkymcd295gf9vijqep2y0khv13ea574umz3tz7ahq5m0',
                detail: 'Sit inventore et consectetur et commodi incidunt qui. Hic expedita quaerat molestiae. Tempore nulla aut.',
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
                id: '8336595c-4691-44db-bb63-a7fd9c7f8349',
                tenantId: 'kx6g7fqrrge1xknzto2zyjlfpp36dqcvgs2wn',
                tenantCode: '4gj4rdc6bndc2acj14s728lpp1b1kmw0dr7hvcbptmxbk3jymf',
                systemId: '72677ac2-de78-44cd-b75d-06bb7299013a',
                systemName: '0hyfm9jafvjqd8mz81kx',
                executionId: 'f85cbdbe-36bb-42ec-8c66-c929c1d74a50',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 10:20:18',
                executionMonitoringStartAt: '2020-07-30 18:10:43',
                executionMonitoringEndAt: '2020-07-31 09:57:58',
                status: 'UNREGISTERED',
                channelHash: '01hoyomveefwkt7vpjdqsg9fo26d34bs9hdfz27t',
                channelSapId: 'zaazl0ghgx08hb3kgm3dgd3pbim71rse15sx029mvrx0erprx4',
                channelParty: 'p0yuicwcngsizoxerogziauj3dzpmhdz7h8273f138e3jogubpw9tlg0v15ujarar4wxhftilz8j8zgnsqye0wsa19f6rir4r0cg77z10aizzvn46yuvaogtoydk7x7zsla5kkytnb1qk56qdqxb5joyrtwuhs5c',
                channelComponent: 'rmnzlw9j6krkvopnqnputyvrod158sjphr6dvfladybcej9z5vc6wjc4jthel9y806uzqb1lfxcley6onlz6uetya82i66d6x8ra46pqu0ryd2kk5l34jl752bi7kqi06ar5jwf7hfvso4xcv1jx7w4k2ujrhn6x',
                channelName: 'ubxqf8t9t4lfbnulkcvessooeq96bhagx3nthw4w3cfq0ks5sl122bm2tohvztakb65ntcg8t1p2so88q1pqyy7d89c26stbb06zar1xtvdosc017d8x4ma6dkfanm7kzme0air22sxi4q7uoh1foe0wf20pipaq',
                detail: 'Assumenda quidem odio debitis. Illo harum ut amet magni. Nisi cum alias et natus natus culpa libero amet. Ut voluptate vel rerum nemo possimus quasi cupiditate sint.',
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
                id: '8336595c-4691-44db-bb63-a7fd9c7f8349',
                tenantId: '8c12e5b7-3d27-4955-ae4f-10e545033b47',
                tenantCode: 'h2aj2kblzqb0j9tl7bcfg9zh4u38ton76xc5s3l7bbz5pk71rn',
                systemId: '5wgdyra8bnk9l1dfkjpaspuowns7o8def6ehx',
                systemName: 'w7e57da8whzlra77n3m0',
                executionId: 'f85cbdbe-36bb-42ec-8c66-c929c1d74a50',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 03:11:28',
                executionMonitoringStartAt: '2020-07-30 19:38:47',
                executionMonitoringEndAt: '2020-07-30 23:51:07',
                status: 'INACTIVE',
                channelHash: 'n9xx77blsoriy96rft935jmouxu5akt1ifq1jluq',
                channelSapId: '27n9plw3q7xc7s946y9csh9q0qo5lorm2r50w55zxwglxb00cy',
                channelParty: 'oqufuwc7hj45zzvdvpspsz36clel300o9p3kb5qvdd6ts6cy2er144ju9oooioqpxushvn0werjn208dfjii13afp8fcy8jk4sqh9d7n01m46i6r6mqryqpw39wmd8p5udtm3t0jhhlsm68zum9s5h8co1rg0cbm',
                channelComponent: 'hshdnw720rjcyqqmv7b6qi5uthxsvnr4r3rh8008ykdhfjrlqwe1rslcqudpeualuozq0pmhh87iyu57l2uqdduq4v39c9qcl5xullgz2mwkj29ugb93lucren63k9621x84cl93524c79nxvq861a4hpon0bly2',
                channelName: '0l8j9u2727o18shck2nszs4cwwlxm78y8qxoht5gi9trl0obaxggrzqx2ys1sca1zdgp6onnrt7hnqp34wnfcrp7y18tofpldqtgcxj0sovgnoqrmk2oc8xhum2mrqprvz6l8y206glznnuezwd1k1fqpr2remex',
                detail: 'Non aut blanditiis ipsam. Placeat assumenda a minima earum tenetur illum accusantium nisi est. Consequatur vel molestiae facere excepturi beatae. Et totam omnis doloribus culpa illo eum nemo. Itaque praesentium eius. Cum ut neque vel aliquid est minus qui ea.',
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
                id: '8336595c-4691-44db-bb63-a7fd9c7f8349',
                tenantId: '8c12e5b7-3d27-4955-ae4f-10e545033b47',
                tenantCode: '82rak9m87o4slc284osthizr34ome9vxtrnlhlbw3vthgsi414',
                systemId: '72677ac2-de78-44cd-b75d-06bb7299013a',
                systemName: 'zndpz81b798kljf80qvq',
                executionId: '3pkqutqh9f7nvmy47p1ffamrrg3lhh4sfhiv7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 18:25:12',
                executionMonitoringStartAt: '2020-07-31 06:12:55',
                executionMonitoringEndAt: '2020-07-31 07:51:43',
                status: 'UNKNOWN',
                channelHash: 'zvb6g8fpq9wxyoudpk9etyqlatpe9acen447kgeo',
                channelSapId: 'orjv5z4ctbvqwxce4mqrpip3tvx698l9id0zx0bq4jg70xr7sk',
                channelParty: 'e7be2y33kbe2mpvu2du4fjbh89skm4wgt1lw3i0j0lp4rqte5ico6nasjpne5qryslffsnz8qt932fmr7kmnaa6nvobzg3nzzzsu76kukmhzbkbbk30p4dmfaldtvatykt7g3e2l7qrj8a0bjk174kr3qfkzqlpj',
                channelComponent: 'l48wquzqciwvze7kky5mtgv8mcx5lyf10idexkm48yarribzw4uhs6d9oql9llh87cwvznn89sp4w45d3mfxrat7f4wl7k3uv3xjdhi5c04ydnroc1uop2eukfym95vyjou0fidj6wjp26z0sah37qlbqnxech0h',
                channelName: 'lin9cl2u5su81usyizdf7osztbvnksp19mlzbjryuok8wmumpf0xylbdekiqby6mp3q8dxo730eckk9tzzw5cv6bcww6loy3laujrn6x0sbbvlxpeosx61rroo6ewbhnhptxoedgxmy67tnkxyl5sn7fhl0s2ggo',
                detail: 'Corporis dolor ut aut velit cum sint. Rerum est ea sed. Voluptas et maxime quae voluptatibus. Quisquam labore est eum aut iste ad ea asperiores.',
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
                id: '8336595c-4691-44db-bb63-a7fd9c7f8349',
                tenantId: '8c12e5b7-3d27-4955-ae4f-10e545033b47',
                tenantCode: 'fd9iqyd1gfszl7l69gq00jsmwetjn9ep737eze3h6dz4rndfgn',
                systemId: '72677ac2-de78-44cd-b75d-06bb7299013a',
                systemName: 'hcw7dkfc3r2b8vn4oruw',
                executionId: 'f85cbdbe-36bb-42ec-8c66-c929c1d74a50',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 23:55:05',
                executionMonitoringStartAt: '2020-07-31 08:21:02',
                executionMonitoringEndAt: '2020-07-31 12:13:23',
                status: 'ERROR',
                channelHash: '21ubxgo7yw6nxrjdyytdasrbuj0gkpum6ewxka016',
                channelSapId: 'an8r4ro23adgxm1ewovcyh6d2mqi5oof2f4678xqe86avnzjc7',
                channelParty: 'zetnrudgxntsdlg1l5fhegzjn7y8cwi4n9mkvlw5kpycbqv0483a48px6bhwpsaujrnpj1t0qtkpvak6aarhlilbhvjnp74rcrgj7dt41yht478mvoy46evmjakfy38lh2z8ltbaq3iz9utdz2eljvqnskv4fvt5',
                channelComponent: '3jyd7534any3w5c1o3is8myoe5tayfbjppsts614ccqgbsj4iq2u99qsc34sbbsyc1pdl8xle3zpoco7yj7delgoveu34w4lus29w9y3ko8kkgixkz88zibqjpu97556cy2te47o8y4w7lji2ktkca29omyw9uem',
                channelName: 'pkpm6yqzl5ffcpqzq3jvyx2dgx50shvmjhg8pvdf7jmjjkyng68qqgblbtpwyqoser2ffv3cd7y6d28ow84bmjgcy8aikmizlpx5eaf63emv3nmlkdqqchy81g1autmr4gb40q9ucmfwxigf49d4jk26tdqlem0o',
                detail: 'Blanditiis inventore corrupti nisi. Tempora nesciunt voluptatem ut exercitationem non. Excepturi est recusandae.',
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
                id: '8336595c-4691-44db-bb63-a7fd9c7f8349',
                tenantId: '8c12e5b7-3d27-4955-ae4f-10e545033b47',
                tenantCode: 'k5ekt48ddum9gcpa7lky5v1rqbsnlqxio6u482iaa51hlycduaz',
                systemId: '72677ac2-de78-44cd-b75d-06bb7299013a',
                systemName: '6hc9rhdtm2cn4mpcu4ej',
                executionId: 'f85cbdbe-36bb-42ec-8c66-c929c1d74a50',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 21:29:09',
                executionMonitoringStartAt: '2020-07-30 19:16:19',
                executionMonitoringEndAt: '2020-07-31 04:10:16',
                status: 'UNREGISTERED',
                channelHash: 'rgluaze4x6190577hondkw0o19wfgs223dn4j854',
                channelSapId: 'oypf0q5d5ep7ic94xky5qa23jat8kdnj3xolm1kkq4050wnu56',
                channelParty: 'r24xlxhj54fm8yjrjmmmsn50hgs6d1kbxdhrkuyfefo6j374ut1b4t1gkfv0sovtouig5qv92s21ruyiuthhrcldipdxpkpm437274z6qdau0mpc6x8i6amuv37im7yqh3kymntcs3neqts1r16256re2xi9qqf9',
                channelComponent: 'elpkulbd062f7r5wqhdsmhdvsnrh7c38ar1srh4k0qeugnqfzo1x9itoag62xkraug43onlu0rn1xcweithbxnd7p4uxxhyd3x0ybboonkn2sxynyhvifh8xv53zjlkql03dvcit87j23l6ia7sf8wq8zzdo518d',
                channelName: 'jguj7fy9lcuv775dtqw4w7ztlrbgd6g71hnjsegsmvnccw8diw3y0rmht4j8hkh00iux7ws7onrt1zjumwynv08sd7pp5qvcpgod106yp4nd8mjimxsakrxqfmxeaf4zsv9emvfq94g9a9c2pjizge629164ds59',
                detail: 'Ut blanditiis praesentium neque qui distinctio accusamus quo rerum. Occaecati officiis impedit itaque mollitia consequatur sed ut ab consequatur. Et impedit maxime vitae cupiditate quam reprehenderit natus. Necessitatibus voluptatum corporis aut voluptatem qui eaque. Ut est aut voluptatem dolor. Doloremque architecto dolorem consequatur.',
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
                id: '8336595c-4691-44db-bb63-a7fd9c7f8349',
                tenantId: '8c12e5b7-3d27-4955-ae4f-10e545033b47',
                tenantCode: 'mnx7sjluvptp4azl1rqa8lm10zt760bbcri7mnt0ziu807m6am',
                systemId: '72677ac2-de78-44cd-b75d-06bb7299013a',
                systemName: '1zje3rr4sr0tnel6qoq48',
                executionId: 'f85cbdbe-36bb-42ec-8c66-c929c1d74a50',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 04:21:50',
                executionMonitoringStartAt: '2020-07-30 15:56:15',
                executionMonitoringEndAt: '2020-07-31 00:19:01',
                status: 'STOPPED',
                channelHash: 'jnsr29zorzcgajoykj6hctv3eqi5haxzqjjxtz1p',
                channelSapId: 'c2thikdnioj8lo433gfpuao3hkt9mvt3fklwcc6umoxanhwgf5',
                channelParty: 'ze74r2hy53b6l4j2nywwsfwnhi2ozji729ifc5d5fcq02yywqg3lsi0l65sauzk0cnccm1tmu10fleybe1v4qnu0yhncldtduquulf85hck7f13clzj65pgt83e2dqdmy0zorginaynk54swe5vezzv9l15ft0pv',
                channelComponent: 'orjkfnk9mbv6gw300f61qynmflce8siimuaclamdzzyte1cghhknstwkoakry18rq0g7391o5wibk4330q8j6sk3y8r2b0n9cdfsrr0uz2f7op1rlcuw8d4nn6poyiuu3dp48c0ibki6hh4ysqnopytco1y77iqo',
                channelName: 'te7cn46j5daxjck5oyts33xczkl6acrpks5j77hxp65vc0erk4kvom3ddt6i37gte7w7z7j94qd2oo3m0iskwo3ypiq62na20qpbg2upq255q9feffsdd70edaykrgvdtd72uuuav2v4z6cfxlxzkje329y6ejeg',
                detail: 'Enim sint laboriosam similique aut voluptatibus illum est ut. Iusto eveniet ea doloribus. Labore deserunt quibusdam vitae deleniti eos voluptatem. Eligendi libero excepturi sed cupiditate similique quae.',
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
                id: '8336595c-4691-44db-bb63-a7fd9c7f8349',
                tenantId: '8c12e5b7-3d27-4955-ae4f-10e545033b47',
                tenantCode: '7kcxdu2x5ylchqlkr0myzfe5ki1g4qf703abgwa6q8gktnsiyg',
                systemId: '72677ac2-de78-44cd-b75d-06bb7299013a',
                systemName: 'm4nsl8szbt5qp6ww12dz',
                executionId: 'f85cbdbe-36bb-42ec-8c66-c929c1d74a50',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 05:35:22',
                executionMonitoringStartAt: '2020-07-30 19:05:24',
                executionMonitoringEndAt: '2020-07-30 18:40:59',
                status: 'INACTIVE',
                channelHash: 'uwsrkdyvnpsed3xcmnxt6yi2eizor07nbfzgfwih',
                channelSapId: 'umady12tq2sejkgvt6j8s2wszcl2eo2zkugtojaf34xbigtam4t',
                channelParty: '4sg9jbhz8d6qp4enh2smkgl8mgbqldbdpcrrkgzpyhi755ti3rop880jjgnz7rbppdgm66lc06onv77gebjs3kb8a26s060odtyc5t86vqjrb57tltabp8oqzxr0ktgteixxdl2cters5b8y7yfycnvfxt0b58mc',
                channelComponent: 'w7vj7gwqemefw3mi40xo0aqbpzms32ctym01ag7xt3lp2feizcg68f4sk5kzb53c4g0cczl19b8gj0yv89ax46d7ud66edetkb9489iidetmi4bqcrzbip8ff1fjxcrwkoc0w5njofc19y4jjwus3y36236ztxwp',
                channelName: '0h3q95mvxvryovcjwdi2qng3dictzu8z4ewkpvzojo38gcog6q6jkpl62k3953rgfjzfq48byf64n2geqfbs0izh6s2sbbctzhbm09f9g10jj2kajudho5i12io375cn28op5hk322b79k1ddxiitj1nd2op85ul',
                detail: 'Magnam sed fugiat nulla fugiat repellendus architecto dicta. Et officiis ipsum deserunt quia aut fuga quidem excepturi. Aut dolores quo qui occaecati aut inventore iusto eum error.',
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
                id: '8336595c-4691-44db-bb63-a7fd9c7f8349',
                tenantId: '8c12e5b7-3d27-4955-ae4f-10e545033b47',
                tenantCode: 'zq36ovmetukc0fbumoqw5j5p36ynsckpjd8hujn27sgdsoap50',
                systemId: '72677ac2-de78-44cd-b75d-06bb7299013a',
                systemName: 'utz4faf2gatc3lbyvnas',
                executionId: 'f85cbdbe-36bb-42ec-8c66-c929c1d74a50',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 06:03:42',
                executionMonitoringStartAt: '2020-07-31 06:47:40',
                executionMonitoringEndAt: '2020-07-30 15:45:09',
                status: 'SUCCESSFUL',
                channelHash: 'cmsuh9z35onej4zjobodkocsm7lllg8ftyiggjzc',
                channelSapId: 'bxn6npor1ltgda0hcdoc3btn75cc92am55a9pgs1n0yursr56z',
                channelParty: 'kqdtmrvstlnirle121hefjc32q96q7247sng1xy1pz4spfkt18rm5wq6raam4xzp4xlclns44gcpwc40vtrj51z9ub284plewscmuu7drh24zk2my45xauezvt44kfp2mddjbvkmno8jqf3b5srp8cqy2akvkjge0',
                channelComponent: '6k9x94wqxh4id0qwgsmbpcwd9xuu9aquy5diqdwnoqoiyrxvvngru2dlqbqcup030ab17fmzofphdhlioc7hlyjt7ykucs5qxf3u8bblkj0ae6pflzrxlsrcicw0ikkcu71w6evei2rc9awg9ch2nsd8l98etwc8',
                channelName: '2h6xi6yt0xvqa98win2zqbxai2awwh9sr171zsse369jkyiul9wghy7nqro2w8n2cgf8d8hzoboket5eh7td0hg9ida300zyrq18c6767wtbinbsba8saydocgchlyh752ekvab9no4iry32at00rtp0zwy4xtyp',
                detail: 'Facere dolores itaque qui ut facilis vel. Dolorum dolor omnis voluptatem voluptas esse. Eum sapiente molestiae architecto eaque molestiae. Et libero quibusdam sint rerum laboriosam nesciunt ullam cum amet. Aut est quisquam nostrum.',
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
                id: '8336595c-4691-44db-bb63-a7fd9c7f8349',
                tenantId: '8c12e5b7-3d27-4955-ae4f-10e545033b47',
                tenantCode: 'arlz8rlwh486bjvuo4f8lmofaddezdinb3umqp2qtxewtenjj5',
                systemId: '72677ac2-de78-44cd-b75d-06bb7299013a',
                systemName: 'gio5csaeergg2mv5xeft',
                executionId: 'f85cbdbe-36bb-42ec-8c66-c929c1d74a50',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 14:32:55',
                executionMonitoringStartAt: '2020-07-30 20:45:02',
                executionMonitoringEndAt: '2020-07-31 08:15:29',
                status: 'UNKNOWN',
                channelHash: 'v0d42vgwyidcd6ewvo85g4t0yndz9s57y5jjhfuc',
                channelSapId: '6wta86y2wylz06htk4rbt8p1eifwac439njxb5qrrlsi5p7ozt',
                channelParty: 'f9j9phjhm1fs9w6r5drss7ecjjg9dsrlvtimgc7x975hma3fflgjd03slvguabld2o7796qmorbl11huog7hmjwtscs0hohkej6nmi5difmcv7lcz3xof0ljw36isw8s9314o4txkmaowmjs3kwmcxntcste8bba',
                channelComponent: 'njg57vrt9srfjr8y5dj2ifiphbi8y2uvyruvb6s4cv9m1bmiid40xa7kfjqvh6kpffgl9gay0ap53ekwxeimxahd0dhdevz22devcp906ai6cuzn8wp7h131b166uxtpuvb7vupt5e5ut1ublcx1sh6mr0fne7izg',
                channelName: 'ovc26wipoflnhniaokxdzt5t9ysf6sxygsy1gvwt6g7kmrrkv3gm83xzeu453588nig4dsz12e93f696ljclrlhv2jo7oymimx5419ccd0l3tb1i2wrqra4w87hul1iaxiq4s9ba82x4o7qpmwrvi3gbd5scnjik',
                detail: 'Sint enim dolorem ut debitis quia. Et minima exercitationem autem aut est qui dolores architecto sunt. Dolorum cupiditate eligendi omnis voluptas tempore. Vel totam et hic numquam non. Consequuntur occaecati consequatur molestias eos laudantium.',
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
                id: '8336595c-4691-44db-bb63-a7fd9c7f8349',
                tenantId: '8c12e5b7-3d27-4955-ae4f-10e545033b47',
                tenantCode: 'fvthufzgzbyfavntv9j6ljh4xdz7dl41h6forwgsffm2u36bzt',
                systemId: '72677ac2-de78-44cd-b75d-06bb7299013a',
                systemName: 'hia9063pad0r2d0ofxzm',
                executionId: 'f85cbdbe-36bb-42ec-8c66-c929c1d74a50',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 12:50:54',
                executionMonitoringStartAt: '2020-07-31 07:06:43',
                executionMonitoringEndAt: '2020-07-31 11:34:06',
                status: 'UNKNOWN',
                channelHash: '7n78d8hnm7vcwutrg6bs2z60tdotqxm3yxqn8djr',
                channelSapId: 'plwb2p5h3y475gsijtp402ewkbnar6s9ib98abj1mbah4gnlig',
                channelParty: 'okyzrm82aoog2vq3w481swu1ssdrktzruly2s65v2s42rz45cwsatomub18lrmtylr1ekysd2cqwiz51yhrn1qtqbmj35wka91fbplyo8i8a71ecphikaktwu0tv5m2lofrfbpycp9ju6spn757g7grj67w1gkxz',
                channelComponent: 'ara6slnzrut44bssy483vtij9c3f2519ekuwb2yrqissigw6hqhwqg9wc73ggswotwp01uypz5lp86z4gg6zvvic9oyfwvwptst4pennsl12uxy7v7lmsbc62265boxktpc96youdi7wqaf3nkxa5vu8x4ahwctv',
                channelName: '75l2y2l9b3md2mtzwyz6ljh2xa6huk6qit0homz8q2058hu5aodcwn1keixyuxpn28i22vcdmsxeh019ucyq9dfaahzwjj9z30euvxcis5uxolosndde3pc9kiwz7lrorlj6ll8l9hq3ah0d55bbke7s24hdjl540',
                detail: 'Repellat et in. Nisi modi quis velit necessitatibus qui. Aut quis et unde tempore est. Consectetur debitis qui unde. Ducimus non sequi voluptatem est est velit voluptate saepe omnis. Omnis numquam quisquam voluptatum vero.',
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
                id: '8336595c-4691-44db-bb63-a7fd9c7f8349',
                tenantId: '8c12e5b7-3d27-4955-ae4f-10e545033b47',
                tenantCode: 'r2i1lpublxrtek5jyb7u6f4jglri8e91eca6zz1gdslkoqntgi',
                systemId: '72677ac2-de78-44cd-b75d-06bb7299013a',
                systemName: 'zif5393b6t8jwjt4z3jy',
                executionId: 'f85cbdbe-36bb-42ec-8c66-c929c1d74a50',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-31 09:37:51',
                executionMonitoringStartAt: '2020-07-31 08:52:33',
                executionMonitoringEndAt: '2020-07-31 07:59:26',
                status: 'SUCCESSFUL',
                channelHash: 't1m031xhxo6obcrxapnuhizc7qgjnkac8pbkmtw2',
                channelSapId: 'mm102ogsad9dwc569w58pre1lrulwbrgzerfcqdi7cot0se2xa',
                channelParty: 'wzxl8jjvs829lbopq4f6cle3xhjgpdz5mcj17swqchss3p70xwd3c6xst93wfvmg0lo5qw2is1dtedr2ujhivajpy40gchcalpa2fxaeuq9glhk0lkvncocyypco2okk3vmj98o9ifsfydh7twxw61zo65tqmgvf',
                channelComponent: 'bnsf3a8qx6dx00o8fovp2l9cli8lcpeogwg2w7tj284x58sus3bnlk7wias8xekp1ydgjt3ip95tjq9xgpulcgrt4jkpjo1jtp92ugzfk8jcrn0xwhi9ow7wbnbstbes1jh1zovbr5teytaeaqacfp20p6vhik0v',
                channelName: 'y6dr9ks804rjr0aui868ltvobmfe1lkyfgetl908jw85xrogki0yw6birzlqxwvbqzh53fc521yaerkihyoi1znzuct9dcngo8t0akq8im4xqkqzp3eui14my7eibzb14p25rxl4ao9yn0qrjzcjhplfy729ic27',
                detail: 'Impedit consequuntur exercitationem magnam nihil voluptatum dolore ut. Sapiente ut error nulla enim aut. Dignissimos quo architecto.',
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
                id: '8336595c-4691-44db-bb63-a7fd9c7f8349',
                tenantId: '8c12e5b7-3d27-4955-ae4f-10e545033b47',
                tenantCode: 'gmslt03ih8lgne525zhobj1qtn4uudd05q3glq443ycl99eckw',
                systemId: '72677ac2-de78-44cd-b75d-06bb7299013a',
                systemName: '7rv1qyuhymih24nen9cr',
                executionId: 'f85cbdbe-36bb-42ec-8c66-c929c1d74a50',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 04:29:22',
                executionMonitoringStartAt: '2020-07-30 18:57:25',
                executionMonitoringEndAt: '2020-07-30 18:14:21',
                status: 'XXXX',
                channelHash: 'uxrr145gkad94d9j6k8rmk19vthao38nna6zvu9v',
                channelSapId: 'da6x97pleh0mq3v1h07eyo6efin9ugk8zef3s8ke1a3runz2s1',
                channelParty: '3ir592o3hp2ij3z6h3y61emws34nz5fo3h0v8ffon7t55rya6girgt06s7tboz968vqvjd1i2hqdpqedterjst2hk67jrrcvb9y97c1s5dfasjfuav3zbzus3cj2xml8w7ps2aljqt0l4hy3istc90wmbvfbm0nh',
                channelComponent: '540ok67bm1thw8975bcf5gtxabvzpyzcd4ykatm68yd95h1jlisoj2o3ii9qervmqz1239rzsfwiawt3pm7b28omxx63iozwr975llj3jmf3yjwexx5twx4pduwp042z6acibr6ajvxvq7ey0qmrdavwmnri74mj',
                channelName: '12jjyf388jxuijrnm59zmrm1wnv7ac7oz2yl0ez99yrez43k6rf9ywqbocfsirhp76piyth6gl53r3dg2fwnksm6dxw1fkbixvjhe8xqvcuvxkiebq6za3fo73yn5f8aog5e8szv9xyc4kvh7oxfpm7bit8vxukq',
                detail: 'Reiciendis incidunt sunt veniam in facilis ullam earum omnis autem. Rerum dolor in esse sequi eveniet et. Omnis et soluta dolore quis quas qui. Maxime deserunt dolorem repudiandae ea. Sed libero qui aut assumenda tempore accusantium laborum enim esse. Id quia explicabo odio.',
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
                id: '8336595c-4691-44db-bb63-a7fd9c7f8349',
                tenantId: '8c12e5b7-3d27-4955-ae4f-10e545033b47',
                tenantCode: '600dnynp2qoputlz3fixw6qp2z23bg7n0gz1g3o4fus37s0dme',
                systemId: '72677ac2-de78-44cd-b75d-06bb7299013a',
                systemName: 'hlvxry2uump5vp4bjqfo',
                executionId: 'f85cbdbe-36bb-42ec-8c66-c929c1d74a50',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-30 19:48:01',
                executionMonitoringEndAt: '2020-07-30 22:57:52',
                status: 'INACTIVE',
                channelHash: '4clsbexgr5c5mpxyun70j1mnzh6p5suz9a6h59bt',
                channelSapId: '1ro7uypk35qt2uszzqcdx1gk4l41dipmu7tp9wawm994ape0le',
                channelParty: 'rzmqqauz07vu2u01r0ic5ma1qwdx5do9y4pxrltc9qvmn0lindka5fhjmrmbws6fvl6q8n5kmnahm1styw7isaym4hghgl6a7paam761x9va87yn6a2htwz2wsfr6n9impquorgvi0k9f63fzobpiijutbqdjvdw',
                channelComponent: 'nn05y3r07tz9c6c9j9u1qkaiag48pbs1z4fzfltevf5rqgimfncm6awkr2xnscd1x0w7wqdyfpdqm31ynuvljm69zjjm1poquixyx0jxgijm1s1g9di5aey6806juwx9bbxrpobsdjuyou3dywcruqjsvifc5yey',
                channelName: 'qv9lrnuopguzapoizk2fvw1y8d1bn7pd4ra6yp9ili39bxsb4f60hw363982uuypq5jnr78qh8z1o89i0mkrollu2c1ogrcaswx5uiul2ag4ay3y7vn6foy28jynq5ot0hqldbon8w1t93vw3nirj3inq6q13fnp',
                detail: 'Aut ut quia magnam rerum. Accusantium autem assumenda qui voluptates dolores quod ut quisquam esse. Voluptatem eum provident delectus eum quo pariatur dolore minima architecto.',
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
                id: '8336595c-4691-44db-bb63-a7fd9c7f8349',
                tenantId: '8c12e5b7-3d27-4955-ae4f-10e545033b47',
                tenantCode: 'brm3j8bxiyev7pa9muekzcz472luphs92i28fgx4fr87q93lsz',
                systemId: '72677ac2-de78-44cd-b75d-06bb7299013a',
                systemName: 'j98sf0p759di3gt2uu97',
                executionId: 'f85cbdbe-36bb-42ec-8c66-c929c1d74a50',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 19:40:21',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-31 05:33:31',
                status: 'SUCCESSFUL',
                channelHash: 'aai1k0gst9lbuged61svt43k100c3oa6vcyzeduk',
                channelSapId: 's69wbp09wrxkd65k3mn4c8zvj3wwoktqfkynqa9ge2lpq6bzwl',
                channelParty: 'wqbk0camy0flxy9cat027295zfa2033fobpek7gi0vsyhhmh6j7kf2ogvro0cjr5eht4vx3wkw47ywuucieevivpfrl21am16prvhaa63xfbv7s3z3g0ojvi7lmv1c7zysxlargo3axddeta2636q85fjje0nfs6',
                channelComponent: 'ik3zfuyv56843p7znatyqkx1liam0jtyx4bghq4ik4vz8xv7a2n4aoq6a6uysuf1d9ttvo9lklii7y936chc4v4b8hchrqzlop5b8ydhohvm9rqbpo9aa4viuyb6xvtpyep87edt3o3c9cofou672pnsdd58nprj',
                channelName: 'yo3o8h9ezj7po16yhjx9pje34p551t4k7u7amqgokgpo1xz0jusv37q1no28f8n85fn14qow0n2xib7s45aojlhcp5ux9zhmixo48f660vmn52et95gi5qesqfozzbsonr5c0qv1gawjt3ne3ddjj41k7xqb5l7v',
                detail: 'Facere voluptates ut dolore. Ratione iure rerum. Maiores dolores est omnis blanditiis sit delectus veritatis quod animi. Soluta non dolores cupiditate et sint animi enim neque rerum.',
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
                id: '8336595c-4691-44db-bb63-a7fd9c7f8349',
                tenantId: '8c12e5b7-3d27-4955-ae4f-10e545033b47',
                tenantCode: 'zuw5v3ys52edi8af4ad08srbvvil7g2ezwtc0kthpak6cz71tl',
                systemId: '72677ac2-de78-44cd-b75d-06bb7299013a',
                systemName: 'ry8kagb0xrawrgvzmupq',
                executionId: 'f85cbdbe-36bb-42ec-8c66-c929c1d74a50',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 17:39:55',
                executionMonitoringStartAt: '2020-07-31 08:20:01',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'SUCCESSFUL',
                channelHash: 'ea8gp76hovtw259zmw6gqm18n658yab8wlitfs35',
                channelSapId: 'riov5xqklt7ej8ww9onw7ruzq2kxd4rhz3wvn7gnnvo23lxrfs',
                channelParty: 'wo8ddzpzkk5ln2ai4fiz4tofh8zvsrkrl4q7rt1zk0cfgs7wos3w25e0mqqufp4twceeqf40wz1zjnfs927skuk2of6oudj7e2ii76bhzbaz31ociah3p7oa3c8wdvjmp99qe3qiczpbvbs5uo3n8ar0lw0s873k',
                channelComponent: '0wz96krzqu78ypvwq2jmqjw9zlo2f3nolvv4sxbyx8wz4vybtkmo2oikctbgp8mexoa8smn186fgk7622x4lkedtx00vxibmdfkzcxy6tav04mb4si5y4tv2mvipop6m7n1n6r6c0p40soqnx2ppfq7rrqbb8xce',
                channelName: 'kpdw908rcd30rxa63ic053g86czqogooi8gpnupwnj7dlkh59sylqhtfn3datjn3i3fdiponlkshw8twxni81kpdzsed82w3tve00b7r9wxvwjy15enke1w02qv8j5lb21a7wmv7c13j2qv6k4uib6y1dup1rqro',
                detail: 'Nobis ab harum totam quo dolor vel repellat natus. Quia quam fugiat. Excepturi hic aperiam optio dolorem quod et ipsum qui. Quaerat repudiandae expedita natus sint error.',
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
                id: '8336595c-4691-44db-bb63-a7fd9c7f8349',
                tenantId: '8c12e5b7-3d27-4955-ae4f-10e545033b47',
                tenantCode: 'kbf51l9mzr00au1xiqvpuyw3qmprcu6hyfs29xmk0pw4byhmx9',
                systemId: '72677ac2-de78-44cd-b75d-06bb7299013a',
                systemName: 'on7tm3boylc742zn3jg2',
                executionId: 'f85cbdbe-36bb-42ec-8c66-c929c1d74a50',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 13:46:02',
                executionMonitoringStartAt: '2020-07-30 23:27:26',
                executionMonitoringEndAt: '2020-07-30 15:08:09',
                status: 'STOPPED',
                channelHash: '09srw4f3invweqrl3bsxzrnezv08mqgxdwmw1hll',
                channelSapId: 'iqh99w6ma0mqqh7two0llld5cr9jiyu1ohv4s7noycirnl6muw',
                channelParty: 'sh2ynd0l81uppkc2y4ztf8z775h14iv008wzi9qjns2sk8ymoosz2a8ivamxw50l739b3fv97ihkfia3lg2hg37rga248kyxse9f7v0beus9e5vh8ksbv62p0z235op3umkz0hm93yo74gvu9i4rpqrnfwk9mj3s',
                channelComponent: 'spgct1sxmlxi59qi2t1awzkjloa1ex8hqt7rlx7af7hklkq7z99lyo10slwv95soijsskqe47xj2mv04wwap9gojhnb0905lihtstuz3jisw45nj35mudb8l72v8igvitvxkn513tla5m7iqmcigqizyc4ark0iq',
                channelName: 'xnd5pmxeiofimc6xyzaetvuj6lop6mijr4p6ofei8rouq1aeiju1jjbfjemu01s9zprftb730dx3xywowk7oqggexc27ay849nybkng38b6d9xsf69lwibvqp46myrc050ecyak4hmaho6hppkgmsaw9kkrfsyjd',
                detail: 'Ducimus rerum inventore. Velit cum eos cum. Voluptatem saepe est voluptatem dolorem sit facere enim. Sequi aliquam hic.',
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
                        value   : '0415fa2a-e13f-45e3-852c-925c4c4d09f9'
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
                        value   : '8336595c-4691-44db-bb63-a7fd9c7f8349'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '8336595c-4691-44db-bb63-a7fd9c7f8349'));
    });

    test(`/REST:GET bplus-it-sappi/channel-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-detail/396c065d-07da-4d2c-82df-08d2050badec')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/channel-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-detail/8336595c-4691-44db-bb63-a7fd9c7f8349')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '8336595c-4691-44db-bb63-a7fd9c7f8349'));
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
                
                id: '2b4d51e2-a408-4b88-a465-c671aa7aa00d',
                tenantId: '78f4a2f9-e03a-419e-b262-b7635d4ff915',
                tenantCode: '6lx1xkbka76e57em0z8gjmd48f326y5d0sgysajim5hmnf3g11',
                systemId: 'e0d048d0-b5fc-469a-a29b-cf0af39e0ecd',
                systemName: 't5mwf2jnt89xvxd84b53',
                executionId: 'ee37cbf6-1277-406f-811e-b429c791a165',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 16:16:50',
                executionMonitoringStartAt: '2020-07-30 18:15:49',
                executionMonitoringEndAt: '2020-07-31 08:18:59',
                status: 'UNREGISTERED',
                channelHash: '9p5800vr7v8wx8zqu4w86vg5o1tfzweos1it2e7m',
                channelSapId: '7hwkivm1ticqfialtlax4joabfrkv223qky0qd69q8m605748x',
                channelParty: 'jehpqqgdft5pndmiluvucb9e3um7pchlcvcyqgl1rh93milihrfn0bot6pg4h6w45sdkvta8j7699n110chc4ema1jt5zfbsgjxi25gstn3w8vlrj3z25hfd1x7z3y1lf8wlh7na1rgu8wbooa0ziy1ni23dckj4',
                channelComponent: '0vb2bserfqsa85nvhy3nxbo7vvap2b7nehd0tcvqi9cgfo5c1cakh2wmdtu7o7olysa0yjq4kpemyzs7hmg7wuwbkwz8lkhcnmbcsf0w246u3ftov1xhj4cqyp3bhe67d7ucfnbjcdx8liu28a4f4ho60kkzod33',
                channelName: '2bfrfk9ceuaegs3lpwgnawhguz627psm5gmf04m49sp9n0u39r3g031phlk1esqscaths7gtjh0gp4uytpe6ljwbqtn63fvmjw6jxp17alhrc3bxa0y9g90s8cvetc2shj9sol18h1rebr0i1578fffpe4vi20r8',
                detail: 'Aut vel quae porro eos quae. Itaque nam amet ipsa beatae nulla aliquid veritatis est vitae. Molestiae nihil assumenda adipisci ut nihil sapiente sunt unde. Asperiores dolores eveniet eum ratione omnis sint. Et enim rerum.',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '8336595c-4691-44db-bb63-a7fd9c7f8349',
                tenantId: '8c12e5b7-3d27-4955-ae4f-10e545033b47',
                tenantCode: 'ohpmux13t2rhg5dgr49r1m5xn9o4u4dm6okshkvwqjtdrnohwd',
                systemId: '72677ac2-de78-44cd-b75d-06bb7299013a',
                systemName: 'gu2bjv95qq5ftm1jzguv',
                executionId: 'f85cbdbe-36bb-42ec-8c66-c929c1d74a50',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 13:57:39',
                executionMonitoringStartAt: '2020-07-31 04:51:24',
                executionMonitoringEndAt: '2020-07-31 07:17:53',
                status: 'UNREGISTERED',
                channelHash: '2fm4bh3asl2f2vjh5j9qxgpfv27ipzg9en671awm',
                channelSapId: 'eh3og7t7apiofz7f92jrnnc75r1vwn8mz2h34ov7p23d9fvm46',
                channelParty: '2c2f36lg0qle4hv5sq3hru3q00aaatias8lrkqzj4a5ww5f52llpm8lkxenaqmygb6o56xbmq7ttvv1w2f6fq5h6ohyynq16xve4ln2mnpdajs4iqj01ayxjp4fgijdzvt741unz1tv53zob9zm2ffs63r53y8k6',
                channelComponent: '4v8zv7xcaeipa7j7j1xdksobmnivhwudo7x6345a7ss5m3y0a6ixrhffvapwykxf05ktqzpn5602yguqdg0fw3ckc4jdbd61kbto9r2yo1pyy7abtd7zywh6sbsv9p7l1qtc3oub3dq7enqf9o05p4ebq5jphapc',
                channelName: '618k6onxo1vx9qqvkfg684oubenlysjwth00arpvw47cjzs4t8h7tk4bbp455lkpchezcjtic400gliz68lqt0gg0edo5ury30s7gqza1m3zsy4niuz23t4lrvlxbv5wh8q1cpae8koxkzy80ptcl0wcn97j19lz',
                detail: 'Iusto iure quia sit culpa. Ipsum consequatur repellendus non vero consequatur ipsum. Doloremque rerum praesentium omnis impedit perspiciatis.',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '8336595c-4691-44db-bb63-a7fd9c7f8349'));
    });

    test(`/REST:DELETE bplus-it-sappi/channel-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel-detail/7da153c7-a584-4459-9e38-eaed13af37d3')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/channel-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel-detail/8336595c-4691-44db-bb63-a7fd9c7f8349')
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
                        id: 'b28853f2-48ad-4e0f-a0ef-81b3b1310f97',
                        tenantId: '8c12e5b7-3d27-4955-ae4f-10e545033b47',
                        tenantCode: 'kia21p1hvhtc9a3yn4w4gqy9igbwxyavgl5te5pwf2ybmp67u6',
                        systemId: '72677ac2-de78-44cd-b75d-06bb7299013a',
                        systemName: 'gnggpodgaqltpnx7ig23',
                        executionId: 'f85cbdbe-36bb-42ec-8c66-c929c1d74a50',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-31 00:09:53',
                        executionMonitoringStartAt: '2020-07-31 03:21:28',
                        executionMonitoringEndAt: '2020-07-31 09:47:39',
                        status: 'ERROR',
                        channelHash: 'qf72jo8dflrwh322ef74h3g48n7ze4d13h5vuqyo',
                        channelSapId: 'rl5thyypay7bpv12rwucc6ap0ny0pv4pcbn3o90r3mca47l7ig',
                        channelParty: 'v3vmj7wqc9hb2nvzqbo6yz5ol0uvsp8zglceupcahjwqpg8hh2ynsulm0gmpcq56rh2du3xnsyih3issn6hplxgrotpbyqg6kp1mc6p3asq1uv8h3a8th10cef1jdgvn4rmqgwxrkkr0fypdackegi8xl5qn2yk1',
                        channelComponent: '3dpglvq9901ysle7gr80b6sqq3iu0wvsk75aw4efvn37nkch2jbfj1ghuzhvesfni5a2pl9jt3ln0katcev8kk46bzj3l40wlbobi7ljlxy14q6gdp8zwh06n2ftj3zfati2rp0e489tv4ddr1kdw0d2ah7u87by',
                        channelName: '077ia2tgjmoshjw430x31f7iovwecotnrcjwb2e0q1dz037fe47rm5kavjkcc6o7ga4tc1m5iuszbvbqaxg5mqku3xhpe6s9a24wgkoer5uh5iagixiljtzu6mjco5s20cmwoagmfe9fjfyc73yb8o5wb1q5ngse',
                        detail: 'Cum aut natus quibusdam. Nobis tenetur praesentium aut sunt tempora dolorum. Non quia dolores dolorum. Quos quis ea culpa corrupti voluptas nobis quaerat iusto. Aut minus et.',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannelDetail).toHaveProperty('id', 'b28853f2-48ad-4e0f-a0ef-81b3b1310f97');
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
                            value   : 'c6228059-808e-48ee-a653-7dbaae90d1e5'
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
                            value   : '8336595c-4691-44db-bb63-a7fd9c7f8349'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelDetail.id).toStrictEqual('8336595c-4691-44db-bb63-a7fd9c7f8349');
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
                    id: 'd2061469-9be7-4364-acec-96790998fcc2'
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
                    id: '8336595c-4691-44db-bb63-a7fd9c7f8349'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelDetailById.id).toStrictEqual('8336595c-4691-44db-bb63-a7fd9c7f8349');
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
                        
                        id: '7d9ff659-97cc-44f9-b9e2-a3f120b15189',
                        tenantId: 'dda7fba9-489a-48bb-9709-5006ccc9e0a7',
                        tenantCode: '5ed6um8x90vhajyu4fezge1r0stk83v3xw44sjha8m9mtxslh5',
                        systemId: '02db0ff1-a335-4e7f-86f6-8f027b097fec',
                        systemName: 'd8pd0nap66tvdvkbu9ew',
                        executionId: '762beae5-481e-446f-b07e-aa14b50fa90b',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-31 04:43:37',
                        executionMonitoringStartAt: '2020-07-31 13:20:52',
                        executionMonitoringEndAt: '2020-07-31 04:21:10',
                        status: 'STOPPED',
                        channelHash: 'l2ne47v6o42kbbya65qvi0xqec5naclj2v6an08l',
                        channelSapId: 'uhsdxwgs8wpo27a85dok3q07fj3wgk9t3h78pv88otf5a839uv',
                        channelParty: 'bjft0w17c6ginf8yya9h32gwnxf4cmq0fxb8qpgdl6qi55a045ae5h6ek7bsfcbcjpvrla8t0pyb2z6f8hvdix36m20ql6wj6kv9k5f4zq8mfol4chkcqxlkrrekmgv0ynkevl5jwl3rx8bs3kgvps5crxgth89h',
                        channelComponent: 'geeidfrnkngdwlunl6z6i9ig2z5fz5ht602xc8n118yg2vv1co56u9mmfhvw2gdso6sdtfi99lzek3n5m3pxltwwmumvdcynyxsnw67g3yow61vnddfgtf0bb9kdp0u5e4pgzndembbq2a4gd716lgceyvb52bsq',
                        channelName: 's1jnnir05ryqua94uwex31568ij41oqh7qhp6bbu5kd8v253kbrv3xikv5sdqji95mcp66rnlmb9yc90w98wp0x5xdq6x6y7ijahzc09q77s3pa4wmd2couc2gfcgjc8ov8rsxior6oicu2ixpbq6u5a9dm04n58',
                        detail: 'In accusamus sint atque. Officiis quis velit commodi autem facilis et ut et. Nesciunt dolore quis occaecati ut quasi. Provident non minima necessitatibus nisi quasi exercitationem. Natus dolorem laborum in non aut.',
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
                        
                        id: '8336595c-4691-44db-bb63-a7fd9c7f8349',
                        tenantId: '8c12e5b7-3d27-4955-ae4f-10e545033b47',
                        tenantCode: 'ke3pa82x8vaoilkej88x9qvfi5j296rlo64sh9f7rydq0vsjbo',
                        systemId: '72677ac2-de78-44cd-b75d-06bb7299013a',
                        systemName: 'hgwi1zdd33j61duwgo8o',
                        executionId: 'f85cbdbe-36bb-42ec-8c66-c929c1d74a50',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-30 23:24:58',
                        executionMonitoringStartAt: '2020-07-31 07:19:28',
                        executionMonitoringEndAt: '2020-07-30 20:35:15',
                        status: 'INACTIVE',
                        channelHash: 'cei9fk5rwagf5dufksslq3n1b10y261m0r5r4o24',
                        channelSapId: 'oz8hz15jorbdvipu499tny0i6w19kju7pynb1yjcg41jlz30jy',
                        channelParty: 'gezk5p16hd8xb4dwerrt35pro21mhq6tr9in2fysdjhh2bowxr4zpwo3xi5mloyzvacwjwknz4bcm5zyooxl5fbgjdinajtq0hpqnj9j9o11j4kgbi7d9903j8e6aev554ezworo8qmtbt2gd6umgzekstyo75qb',
                        channelComponent: 'v1oxw8trz1rn9pc1gvkaq96lrohma7g9rbrln4etpqa4k4lyroburwnqvsho66euqzqxixqgwpuixmrp02q6kse8ym3bbr5unl9yz5gmq2go79usm9ckxbu8kl8xhfwj6rz3vg8ii41wohybopfpmfzu5oucu9qj',
                        channelName: 'vvrkufx3wwt1joh8ghyksker04rc1dzfxe35o8dxw7c7kd5yu7pgl8of8tvco124o58t7vy0z64kn83x4yxxyydbg3qlexma08vy18k5uqf3olvidrrgqqdnl88ebxpxub2hu0svcpg9lsd78m9w5gunh2i47n2h',
                        detail: 'Voluptatem qui quidem sapiente consequatur tenetur impedit. Quaerat qui quam. Eligendi repellendus quod. Ea omnis sunt enim.',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannelDetail.id).toStrictEqual('8336595c-4691-44db-bb63-a7fd9c7f8349');
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
                    id: '3e2d20c8-58ac-4d64-af39-f39eef561936'
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
                    id: '8336595c-4691-44db-bb63-a7fd9c7f8349'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelDetailById.id).toStrictEqual('8336595c-4691-44db-bb63-a7fd9c7f8349');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});