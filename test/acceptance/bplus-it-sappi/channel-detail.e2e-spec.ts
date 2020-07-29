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
                tenantId: 'c94549ab-979a-46c3-9ef1-e32329a8568b',
                tenantCode: 'k8sgl4ammtvkwt4g8csn3d8b65l1mtwjy29qdj48hhzn6e8lr9',
                systemId: 'ca623564-86d5-4ba6-95f7-898ee1649c1f',
                systemName: '4vb8yf8vspq8yb6lzfnv',
                executionId: '654693ad-2c0d-4b4b-a1f7-6e7f3d39d0d8',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 22:56:36',
                executionMonitoringStartAt: '2020-07-28 20:13:18',
                executionMonitoringEndAt: '2020-07-28 20:13:43',
                status: 'INACTIVE',
                channelHash: 'iv491ithupkmq5us50s6th6ggcgtk5xyf6covlee',
                channelSapId: '74ou3d6nce4f04ow49abea25adzlhxrmgxabud43ojrhkib69v',
                channelParty: 'd8lscts848gel1w59hjkuxjyiqywohlctcrxalq8pqsnwn8fatcxtajr1depuf7iiqrm02fec989eu5mpc3w1qb53gpl6dxd6o5zuvjzlj3c8ic3elzht39l0rryvqdv5xu2n9yusupbafhxoo0s9lnsxankgwga',
                channelComponent: '8npbhb6flsfm5fft18ab35rae7pf5axnwfvkl6a9m0d07l051qs9fyssgkpa029plq9m67ovessm6nd6fj2lxcilh1z43azeoh2ejhqwobt7656ww15726h2f1w7m6uvphjxpwx95aigf2jrvqem4bi79l8uhei9',
                channelName: '0y9i4tud1qufur45wx5obfv72rfi4klxhloalsufy8q59lkiw9l730efcmyifar1vk2m7mtq01qtewp3psyrf6ue3zn5rrm68jnazf82k5id0so1utbecva888cn3oew7lv9hebsyy8czlfjlch3n9wdo4s9c75t',
                detail: 'Aliquid hic dolorum autem. Nemo est odit voluptatem ipsam incidunt. Dolor nam fuga non.',
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
                
                tenantId: 'c94549ab-979a-46c3-9ef1-e32329a8568b',
                tenantCode: 'v3075h37xz4qoa7g67nhzrgcajm0iaqcw05hsasu6yv2gr4v5b',
                systemId: 'ca623564-86d5-4ba6-95f7-898ee1649c1f',
                systemName: '634x3wjfmac5dm7f1u80',
                executionId: '654693ad-2c0d-4b4b-a1f7-6e7f3d39d0d8',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 21:43:00',
                executionMonitoringStartAt: '2020-07-29 12:03:25',
                executionMonitoringEndAt: '2020-07-28 20:10:20',
                status: 'STOPPED',
                channelHash: '9ucx0xqxm3azx3iryvo7lg702yqor574vvcnats6',
                channelSapId: 'ykjq4ueflzfml2z0jc3m397bw7xp71otgyd1e8bndj4vdlvxvb',
                channelParty: 'm5hq3hr3nr05wuq8apwym8ohr1qvi4c2a8moejnius3dq7pgqe1amrvi2903nnvdmk4ybd8poxz7mp4ez85teiwvxkp26s7shel5o93pfkdzw4sfykjrggzre9l6ztopdmatsfq2gjpmy3rnfe76yr4b2z3kuofh',
                channelComponent: '7tvrv3ywizsdntwxm1hangfxluyf06mn75sjq4ppz7iemzxqtip17n5r984h8dsrm21syqpjl71v9v4zxwahgqz3u4z2d7gjt43lshxexefq9fu31tjljfbvz8wn8mno43jusmb990oe1puc8lgwaakgk6wo2oh4',
                channelName: '1imkgzout4kutkt7mf18dij4uzu3xqvub03ywmkf2f96fgyogamvbenf2rufc0ddn5vbdbobffyu1jpivuwddoow058nez1vmykr31aui9b5fzcfro4802tg14jd2pqmosb33evxe4ji4yvwxe8p4wlbe73g1boc',
                detail: 'Aut earum ipsam officia non debitis. Vel non sequi illum impedit blanditiis. Temporibus molestias placeat quasi quo. Distinctio placeat voluptatem minima eum et sunt. Quis voluptatibus asperiores dolorum animi repellendus sequi incidunt.',
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
                id: '75890c23-62bf-42f6-9d77-b8be4f40ba8d',
                tenantId: null,
                tenantCode: 'jenkam9b8ittodrc8zvyf4h0firqs3tglryjcfdcvwxgdqpddv',
                systemId: 'ca623564-86d5-4ba6-95f7-898ee1649c1f',
                systemName: 'c4kstbny6yzh57d57sdr',
                executionId: '654693ad-2c0d-4b4b-a1f7-6e7f3d39d0d8',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:08:21',
                executionMonitoringStartAt: '2020-07-28 20:29:02',
                executionMonitoringEndAt: '2020-07-28 18:44:04',
                status: 'UNREGISTERED',
                channelHash: 'rh4eb16foiqygk1qhmsggzt5th5z0xse8f87fwja',
                channelSapId: 'ennkbbkb1cj6xkkdi2xak7k9op7ji9qf9ebvdhh0m8e8mdrnmg',
                channelParty: 'hts30xh0rm86ds2kxq6y1g40t57bd7lf7t2l3a5s5ew939n7zjqr47vdba6ww6hnvosgqhm3spaozi7ebc3cadl6hx0kqilxkhgykhwet5ovdxjl352g37iuohexc6hv3fzpfqjaxy0xt4u8wlf7sotz3nxu9vwl',
                channelComponent: 'ot446gg5s7ru1fqzjdk4rmzd0gk29mut1sx8xkg43wmajj820960f0lxc0k4b178koe1v6m47ezbmgy3uf8rok12ylj8gw2ij9yqb9dkyqh2xhwkwaps8yhu1528z0slb6iiq8fujnx8or9ctvphd1on2btx4ojc',
                channelName: 'ifkv5t4nxllu3xe28q41pamqlvpml4phu2xshbo4dqba98ju1i01tfmkpajderjet3yezsjv9qs4fz19zf1h8of7akdcqihw4mechhptg0yjbnte1gdtztp7n4ve5m6mtqj9y3m6ev311rcdbc9b5klmy4z557ki',
                detail: 'Dolores ut in beatae labore molestiae deleniti labore tempora quia. Eligendi consequatur omnis sint mollitia ipsum et sed molestias. Autem minus nam.',
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
                id: '75890c23-62bf-42f6-9d77-b8be4f40ba8d',
                
                tenantCode: 'bu7r17ep354cgapt9wl86nznf0rradfaamk0vy4hp4hieri6i0',
                systemId: 'ca623564-86d5-4ba6-95f7-898ee1649c1f',
                systemName: 'dv6v19iacm5lwxzhgfoj',
                executionId: '654693ad-2c0d-4b4b-a1f7-6e7f3d39d0d8',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 09:31:44',
                executionMonitoringStartAt: '2020-07-29 10:19:24',
                executionMonitoringEndAt: '2020-07-28 18:18:01',
                status: 'SUCCESSFUL',
                channelHash: 'k8jevfafv017pif7obcdb86ri6lzxrsm4hjcz5w0',
                channelSapId: 'n817fistbh5pkxo42rizmo5b7fem7aaakbkmymptjou0x62g58',
                channelParty: '31ne2k205cukgxa0wl1duc1wol5f0ok56k2q2vjiyv854h1acb6gb7iws3ldfxyda7musysalwqi309ebwdjvou6jdrh71e4bht60m67qvzktee3ruhmfjaa9gf6aubt2v20p7x5kmfnft4nwwqnioqfl6hfui3f',
                channelComponent: 'yp6tyamx86dxye6lwydy6y1p07u2zyrgf0gb78te9kiylc23q733lr53p5rhza9ojz1anw5nw4ufr0x4bv2i2rdj8npsa265439a06bs6rkzhsn02xjbtjqyqt3ro9k7vhsw3b6s9oazz7vfmbr6dacqtziq9pq0',
                channelName: 'o8gg7t2kykv1e6ewrfrxsbhazojulfwn4d0nhqsu7uycocxgcgjqh2eoddfu9phdazugouvy9snw3oj19l4h7difwf7jadq2vdv64645a0d0l9hdfe46pxif5lf1n4at2akv910mkrk3cwco9hnp7y93wh1k2wst',
                detail: 'Quia ipsam minima. Voluptatem consectetur voluptate dolorem consequatur. Officiis deserunt sed fuga adipisci dolores et repellat. Dolorum voluptas autem hic vel quis. In praesentium officiis ipsam qui laborum voluptas quia officiis qui. Facilis minus libero neque et quis qui.',
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
                id: '75890c23-62bf-42f6-9d77-b8be4f40ba8d',
                tenantId: 'c94549ab-979a-46c3-9ef1-e32329a8568b',
                tenantCode: null,
                systemId: 'ca623564-86d5-4ba6-95f7-898ee1649c1f',
                systemName: 'v2qpdi5nr17tbmbhxzas',
                executionId: '654693ad-2c0d-4b4b-a1f7-6e7f3d39d0d8',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 12:11:51',
                executionMonitoringStartAt: '2020-07-29 06:32:19',
                executionMonitoringEndAt: '2020-07-28 19:38:17',
                status: 'SUCCESSFUL',
                channelHash: 'npy1w1mf11lbde6alp9e0nqpfvml0h1w8078c0hw',
                channelSapId: 'd6x77pjnmdkk2jvg87vsb8dx7pdg6yg7ahcsd0hzdad7wrfl19',
                channelParty: '60vohw29w1j8vped69tbct7bfrsmzfwt8wecgi5babadgbb01hvqoa0wwu567nulrrpzwu4a8hmzwgab2oib5kzed9nalputgpyrevndbhhdii09wwdqjiyws2urspy4dkit8fzq3hyvn340xla79ui3s497kh2z',
                channelComponent: 'km0na8fkfxzpgr16i4g60ppjtvpma1aqp04aozqyzxk8jsqceprhdbr9g2gnu33o884jp8hinr83waxshdqw3iz1svijegysfucpaysjkvf7kdjsp2fb188colce1mkka8pzlfbrr1thamunk35z3pgmkscg0app',
                channelName: 'ajxvirl0rpbmwwfr9pqglm4tj71ifwpnfuthjm78npj6qv5g4r6lc3mvec0wuyraxa2ohf43wrwc63gcz1cyw89hs2desr8ujr1ttuafxnw619ssr7gmur8r9isungb8cx7t67lns7mbqt85omsz9ve8subn1q61',
                detail: 'Accusamus nihil ab officiis. Perferendis ut corrupti dolore modi rerum ab aut consectetur. Quos atque deleniti nemo magni optio deserunt est vel accusantium. Omnis qui maiores. Dolore qui beatae omnis culpa.',
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
                id: '75890c23-62bf-42f6-9d77-b8be4f40ba8d',
                tenantId: 'c94549ab-979a-46c3-9ef1-e32329a8568b',
                
                systemId: 'ca623564-86d5-4ba6-95f7-898ee1649c1f',
                systemName: 'ccnv83sf418r3iq5x6mg',
                executionId: '654693ad-2c0d-4b4b-a1f7-6e7f3d39d0d8',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 21:13:06',
                executionMonitoringStartAt: '2020-07-29 06:20:06',
                executionMonitoringEndAt: '2020-07-29 01:52:48',
                status: 'ERROR',
                channelHash: 'ka37f7dbj4oeu1ird76d5xgilx3xr1cm6jekcqfm',
                channelSapId: '85msi1iuhcardcgqikmmf65cfeomueqlqjiwxb5jfc9i2kzux9',
                channelParty: '4oa9yl8977w6nvjr0snivqq26wmxluw884zfsrvatezm82xv4sde3vjx5bg4y2ir38orpn2k0pk2jcyr6ilr8fgnse5ep4qhvptedykv0v6ctl1nzn1x6asckybagvv7rkyn2sdhf4yu5s5wl1r516x4ac48o817',
                channelComponent: 's3pkyhglsy1lf1jg321lhinz131ee482bm6q2zr44hqa890lois839qc80e83nryqxxwt1yt099rhc173bw93w8blg7ruzmgfg6lqers4328gsvxq9hfyf7fwy1qe9pdfd82g2zq00mppwy6a90kw5ejsg4gk1df',
                channelName: '19qt3d08jrq5yi500s333o2mzfqor22ej99rpqxsd1b0x2ijzkcv3r0slc7ntcdak6da5j7wnr8gkno1mq2xo1cqe8me8kvkb8vt3z91iv0x2jxsv9v8hf00744r5308oopzd1cmv1obwkrbijzlqinrl8qc6jka',
                detail: 'Id nesciunt odio beatae laudantium est sint non. Pariatur iste eos neque enim quo explicabo fuga cumque qui. Unde velit repudiandae enim eos vero consequatur quo.',
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
                id: '75890c23-62bf-42f6-9d77-b8be4f40ba8d',
                tenantId: 'c94549ab-979a-46c3-9ef1-e32329a8568b',
                tenantCode: 'ez0u4il9rv2q45gghny0ghejltjv2qosu8i56txr1xkthwcmpf',
                systemId: null,
                systemName: 'o66qtnm3da2wcid6ybsg',
                executionId: '654693ad-2c0d-4b4b-a1f7-6e7f3d39d0d8',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 04:48:42',
                executionMonitoringStartAt: '2020-07-28 20:56:10',
                executionMonitoringEndAt: '2020-07-29 05:36:57',
                status: 'ERROR',
                channelHash: '8j6ou2oouvg1slz1lrvodje9mwal91fe0y1upkz2',
                channelSapId: 'l3g3rjh91gw3xscym72s6z8d1zrsx2urr2s6j96rqftar0xzvl',
                channelParty: 'c5310hygravboi8ylkf4tkpz6jru1a1izqjjtypjr6ic7gdzwootl07d3pwne1butklcux6blquonwft70mwaqnxanl6ehiuvzckr3m1w99au2zjja8ro3taqtw6tt390an3hmksnqa9dmrxp8ve84ssjo81vnkm',
                channelComponent: '8pmvn4l5tlkmz45wapy9h53qrb8y05denghstccfcosp6dtnh0kvd6tr8t5tx9abj2aegz9pumksisop1dgfr00hua81t5g80v54gua9bt68anfhocki4o3dnigff9bhkupjdko7q2mqiz3ypbuhazp6o8i5ikjp',
                channelName: 'jcud79izfk450uvhihlrq3f7g7gcj1al2bv78vfc0167j5g1e9yebblrn7qdbndlcp4h0bbroft4cud42ue98jp806v2hbvv63xhbm05m9o0d7ss1o5nnd54pq4e9ksi3mr87d63jrdehelhq7fxj880c3n1fpxl',
                detail: 'Cumque unde voluptas perspiciatis nemo deleniti consectetur voluptate nihil. Omnis tempora dicta perferendis deserunt dolores quia. Necessitatibus iste provident omnis quis. Consequatur eveniet molestias eligendi id.',
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
                id: '75890c23-62bf-42f6-9d77-b8be4f40ba8d',
                tenantId: 'c94549ab-979a-46c3-9ef1-e32329a8568b',
                tenantCode: 'tt8zmxnexsgihhv58wn7x83tad9rqpa1x0yytnlm8db13zacu9',
                
                systemName: 'tgqycd53qleg8hyj2h4s',
                executionId: '654693ad-2c0d-4b4b-a1f7-6e7f3d39d0d8',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 17:13:25',
                executionMonitoringStartAt: '2020-07-29 10:19:20',
                executionMonitoringEndAt: '2020-07-29 11:37:01',
                status: 'SUCCESSFUL',
                channelHash: 'whheuz1m5xpaqpu5kh1u05e4wvmfhkmtlsjs73z7',
                channelSapId: 'misqj3j3jv7g22vqbilsuike4nspl847fhfjyhl3r4rxsg5ekk',
                channelParty: 'e3vbkjy6rci3opp1adw93dsyuaex9yewp8l6qfrlczgzxcfk8yp4jlyrtuvbvc8l3nc27ppekr7levoodsxpkpq0kl4srzl6kxkmo0xwkswcbh975iax1obwae778x3ob7tdab0jh2j8ofqu371j2o5shdtginwi',
                channelComponent: 'fnnx09oi9y9v4q60vubwcpel103znpu02l5xl2dej9tdugnos4ytqmicg30g9jk3okutqhegaza9pifyxauyba0mpz42wgcs9jwsxhvpatw5d59f6q8nl826hox2bflno5hbdigq2tgeoykl0sr8yayqk376e47i',
                channelName: 'yunke5ba25vbz03e87acflyxnk3ql5bolpaxqbs555yei0ueb22ycu05fzwgtmo6rudyr4487n73zgltph3p94uh44r1dsmsakhm153h1eugwqualge8y5xcz63kx9syqco4jwpi92h1jl92xqvg1iswomf8xw1t',
                detail: 'Ratione iure ducimus. Iusto maxime esse perferendis non. Quas ab temporibus ullam voluptatem quia odio.',
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
                id: '75890c23-62bf-42f6-9d77-b8be4f40ba8d',
                tenantId: 'c94549ab-979a-46c3-9ef1-e32329a8568b',
                tenantCode: 'ti4saq27l8uwot59dlbhpxzrqr5wcehsoopi0fvckcn8ksloxg',
                systemId: 'ca623564-86d5-4ba6-95f7-898ee1649c1f',
                systemName: null,
                executionId: '654693ad-2c0d-4b4b-a1f7-6e7f3d39d0d8',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 07:03:37',
                executionMonitoringStartAt: '2020-07-29 10:26:23',
                executionMonitoringEndAt: '2020-07-29 06:30:58',
                status: 'STOPPED',
                channelHash: 'hl7vguz6bim8szhrdkoo8v9l5h95w2ukn531v5qo',
                channelSapId: 'zrax7pyr40tcg5iik57z03ea59kmzvuotn3t42uu01eda0ndny',
                channelParty: 'a08bptthwbk2rmt9agsvf3domn4qoltx6mx1qq7gzngy5jnwr3fhu2m1jtnk7i9l5cmmx9twx3d3v3iu6uycbnh1gcdviuxubrkst4menqs5gt82mzg2p6ric19ssjuyt9ebuvrku3eyvs89ajd0f6bhgnuclp6j',
                channelComponent: '2375h024h5r22nphc4bfwg30y2ph416bwysnl6yfai5433quhebpsvc6sd0wqn3t1nedqbclce9s7rt7fyfeujm14evbi3t1dgb2664fs5fw3u7vbiqyojmgvcb8bm2qc74b3te92o7glo82mjyxnrdrs7jyl9mq',
                channelName: 'k40d80j8c0ujx3v09p7g7szt9e22w0raw09gjlp1icedg8j9powhs1hc4y3121flos1rwxwg3nf6itc9ya8hm5d5hslv20qugt2yly5615vkb5ejbmkfzrkod2mbxnd13t3f95gqy4wqxdliq5y8zxve0cimzrlf',
                detail: 'Sed quas aliquid dolorem vitae aut. Et consectetur quaerat fuga facilis. Accusamus cum qui quidem error.',
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
                id: '75890c23-62bf-42f6-9d77-b8be4f40ba8d',
                tenantId: 'c94549ab-979a-46c3-9ef1-e32329a8568b',
                tenantCode: 'g2bi6w3ewrujwv6vo0in1oxirc33d42n3ggpeknkeup2m8mnkm',
                systemId: 'ca623564-86d5-4ba6-95f7-898ee1649c1f',
                
                executionId: '654693ad-2c0d-4b4b-a1f7-6e7f3d39d0d8',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 03:12:18',
                executionMonitoringStartAt: '2020-07-29 06:34:01',
                executionMonitoringEndAt: '2020-07-28 14:16:30',
                status: 'STOPPED',
                channelHash: 'sdn7fjd9wozq1qjdwsja4fetnipl6cr88035kwf2',
                channelSapId: 'rj6zmvqxzkncvlxjatu27vx9cm6v7h56lf7nqt63hwejbzikd4',
                channelParty: '4evvas1zad14xu36pgcqhzla4a9xuehdy1pldn15tnvzeadnpu1ck6orj8fqtskonrvfuz5hbo9uac9gl612bv9icu0u83ezi9p5smmwk1x2nx6j5mgcw95x11s3q3g7s7d8l1qi4z5puek8yj8c3l69plihw7mc',
                channelComponent: '0jiau2htbz8wjl6bh3ewo2j7ijw8dg083ax2rk0yux44jk9f2dnp7bt4wnjvdqb7phvg1pz9vv37t6977wulcp4zbj1rkt1pi06ttxsqaxs5h8yr9cdfby4eduhsnwfs6xqm0afj9vc5fdac7jukzvdoyz8q3th2',
                channelName: '4fjiruhkcav07npmzaoh3blahsl1ieef35002xye7vdqxxnu8jxemh8wtnqtulf8dhe1tkjrggzktvglcurewug92eip5dqs6cm1plrccgel045ciy8a285fxs9qlj8oaft8si5xomatl66u82v01ckxr1jdzke0',
                detail: 'Animi consequatur commodi ex. Et reprehenderit laboriosam repudiandae porro nihil facilis. Est consequatur voluptas. Voluptatibus quisquam quam aut itaque et rerum voluptas iure occaecati.',
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
                id: '75890c23-62bf-42f6-9d77-b8be4f40ba8d',
                tenantId: 'c94549ab-979a-46c3-9ef1-e32329a8568b',
                tenantCode: 'yj3qsgfk049hsuv2srdscrudjk712xvuyribgdu1ops902vers',
                systemId: 'ca623564-86d5-4ba6-95f7-898ee1649c1f',
                systemName: 'hm57sf78ommarg2hsqqz',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 21:29:39',
                executionMonitoringStartAt: '2020-07-29 12:06:26',
                executionMonitoringEndAt: '2020-07-29 00:52:33',
                status: 'SUCCESSFUL',
                channelHash: 'po7ov4gwgtw2del0iyp4cyfnq6jgrafrmjk235ar',
                channelSapId: 't0gz1rpfxlemlis4x4v0ddm13qkpi07ml5f3vxy7rx1tuswsmw',
                channelParty: 'c6e9h9gq2ubh98jj8xe1dq3wrb2x883bgqiamenvmkogxkg6qk1dfm4krn5b9qtmwucm6cx1wkliir1m6t2csnetudkvok5tdwcq2es3t0sww5x384uym34ruael6h557phfi9hwv81n47aiqikfrq9ihsw4f2hg',
                channelComponent: '6xzn2woq83e05m2cnmc2su40z7ic2et0fnwh0do83r18fap8mjoyw0dkk8gjwodvjp08p3f0qeryto6j0hpj1537cx3og5ss6i0fsi1tfufiiinjk52qadad6oox2nhg41vs6pr56ge09zizpk5k7p3v9hfvbg46',
                channelName: 'p4b4mkd1f0mc1getfp77h26jwmixehot7486jmr95ri2pbympae2m91d6coh1rx24lccwzvh0bf9ymrc7l6i33ohrode45839fn36wtet7r7a5ppz9pcg33jq4n5bxb0tznbjkhh0ein7yz244ph06z944694nrb',
                detail: 'Dolorem mollitia delectus minus. Ut accusamus incidunt et id possimus. Ipsa autem sit in voluptatum id odio illum. Nihil voluptatem dolorem. Repellendus ut et.',
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
                id: '75890c23-62bf-42f6-9d77-b8be4f40ba8d',
                tenantId: 'c94549ab-979a-46c3-9ef1-e32329a8568b',
                tenantCode: 'b5fhp22z5yyg4yjxplnz4o03ij13zgpkshzsfos8h1wpqy90cc',
                systemId: 'ca623564-86d5-4ba6-95f7-898ee1649c1f',
                systemName: '2sutgze1hupyv3w22c4j',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 23:51:08',
                executionMonitoringStartAt: '2020-07-29 03:34:32',
                executionMonitoringEndAt: '2020-07-29 06:58:50',
                status: 'INACTIVE',
                channelHash: 'lcxfn50gejps3s8b5d63ht68qmob7vbi6x7up754',
                channelSapId: 'r6wcbzfjs9kjictgaj8aqoagtz7ytkt6h961a9xuzzk4wee0zg',
                channelParty: 'iymhjsmhyzmkq0n6lx4i4e0gcgvuoub10m6oxlxb53fke6qwqglw7yqk15jesepx8g5rvj64nkl4joa4jffpvb7srs6a99zg91qyggu3h7pd7bfc6zycfdl507udzdstp880zzkha9wywl7lcwq3hgahng8m0kyc',
                channelComponent: 'pe73wxepitxw23672n0ufvu145b2vpkybr1t5yq2q3wjaxv82fzyarm3jerbayn7oat8upcat8pvpu07w1ay10v2qycfod2dtexzjckyvufnbdbzq2p15fibucrupd3kru13m7wru1nm62zg1l826pnesh96d6hq',
                channelName: 'conyp76x77a2mcfbajj447tnvnbl2igr3lakgae2bh6l49ypt3tdkou3r7i8gh9wdtaokl8ogoj4l6d87auaoqty6dt6ge8m81ey82wy2tgo3aqnm7zt76mc34pcluqbgt3tp12h56uyzkaoirqq0tsx0v4iz66i',
                detail: 'Nam sit atque hic. Velit aperiam architecto id. Occaecati dignissimos amet laudantium dolor accusamus et neque. Voluptatem id ipsam ipsum qui error. Aut dolor impedit sed neque consequatur.',
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
                id: '75890c23-62bf-42f6-9d77-b8be4f40ba8d',
                tenantId: 'c94549ab-979a-46c3-9ef1-e32329a8568b',
                tenantCode: 'g0gbw4fq3ljf2q8ae7i50t7g7uykl5ihu4xb0psii1em4ciqm9',
                systemId: 'ca623564-86d5-4ba6-95f7-898ee1649c1f',
                systemName: '1nj8tb737978vea644kl',
                executionId: '654693ad-2c0d-4b4b-a1f7-6e7f3d39d0d8',
                executionType: null,
                executionExecutedAt: '2020-07-28 15:14:58',
                executionMonitoringStartAt: '2020-07-29 08:07:39',
                executionMonitoringEndAt: '2020-07-29 01:47:33',
                status: 'UNKNOWN',
                channelHash: '4jauzcutrpjj20p6u3wgudu7f47en4bu9ozp413o',
                channelSapId: 'bcb2utq6atqncrfgwuy05wx5mlfrkqzc7cw61mgxa5mtvfhq56',
                channelParty: 'f8vc60x3aor1mutffcm7jx9q6jcnbk81umzxhgcfndft2s1tshdwbhhs5lpefhd63rw2iwnezvcq534gneilv0hoxef3iucp3mb96idsrai5hau2xxtvmnena7av962m2xkgxdtl09a9wgpdb48d93kwffqo4bg6',
                channelComponent: 'oon9o7i16ij8tli9tbcd1zzgk7aj540eec3ois01j08v8py6cu8ffphvf2mhw12nxvhg1z31bdap6g6jw2hzq0m3fpqksqntq7071ao4u81dpg07gfaxwvw0jwon0bs210kcjqduet5j40zoq0li6dtgtxy376v3',
                channelName: 'xjblpgh33c9h7t1a4fn31e3h9xb3t1mos7y6f96yvtzf9n3phgmhvtp41mr1hgmojxd0jirjtay5d72ateq13jcwi2pamszsw4mqtjwz29wkk489b67r2wk96mot6pdi8e2y48kkie2ukm2zdwk8pzf5n29vnr6p',
                detail: 'Aut similique et eligendi quia ut quia enim distinctio. Perferendis unde est. Explicabo modi consequatur sunt veritatis recusandae laudantium rem debitis dolor.',
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
                id: '75890c23-62bf-42f6-9d77-b8be4f40ba8d',
                tenantId: 'c94549ab-979a-46c3-9ef1-e32329a8568b',
                tenantCode: 'zv4qakzfwn7exklexqktm3rgy6gywhh0y3flm88z1tzrr5k5b9',
                systemId: 'ca623564-86d5-4ba6-95f7-898ee1649c1f',
                systemName: 'agksitkpyx5cr9xqd9lq',
                executionId: '654693ad-2c0d-4b4b-a1f7-6e7f3d39d0d8',
                
                executionExecutedAt: '2020-07-28 18:41:54',
                executionMonitoringStartAt: '2020-07-28 15:27:15',
                executionMonitoringEndAt: '2020-07-28 16:13:53',
                status: 'ERROR',
                channelHash: 'fq0n3m2w7qclqrxkp5g9vedicqeejgh7ypq0a1pl',
                channelSapId: '5hq4khhzd1m77qevbrjtl46xs8otfcrcj3m97rfm7f8dmmvso6',
                channelParty: 'd9dudza402vlj16gil0epjocijx6b9dzrpdo9yata4itpdugcy2ehybg3dyx4jyodjuw0bigdrgthe2qw87qrk02f1qoqqiidepvbydazqj618nyhw0olfdckyyrvma1df2vru5nu0ws8h6v5gltzi8lb7ons9ai',
                channelComponent: '1u1vn1n095jhla7834jr9vmyr6porkyx6dyhayx7todlpbdorokahplqbie41xr243j5h7gmog0f3qwkicbzxns5e5f2cpeef9262xm24tz8hj3ptv06j306jmwhklpdsxq5gva8kd56xceakl7nyt3msbfc8ddm',
                channelName: 'f42xii9cefphhf59ljkv2icriafr689lrjpxfe30xt03yuqrgw5i4utqaxl1euhvtr1ixiic5xowosl8950h92ye00tqwnlfy6eehb5yfomcbuyt6m888gktif3hs81tbtl8av36onxrbi2y2ykybtghwh6zfe4a',
                detail: 'Excepturi soluta ducimus similique. Eum veniam sint. Facilis officia vero nulla.',
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
                id: '75890c23-62bf-42f6-9d77-b8be4f40ba8d',
                tenantId: 'c94549ab-979a-46c3-9ef1-e32329a8568b',
                tenantCode: 'oxa29pu7w0tzbtb8i6rueyelm2abxmkq6l778xl3ij27qgbrs2',
                systemId: 'ca623564-86d5-4ba6-95f7-898ee1649c1f',
                systemName: '8kfdcjr3za5i0ezgbot5',
                executionId: '654693ad-2c0d-4b4b-a1f7-6e7f3d39d0d8',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-29 12:49:49',
                executionMonitoringEndAt: '2020-07-28 22:28:33',
                status: 'UNREGISTERED',
                channelHash: '9uf1c4z1ert7ekmdbnvzhfuc8ec45yp84r734cbi',
                channelSapId: 'bbjjnhdgtdtbk4manwnu57x2b8pbe53h4isc8779ru3sn3n9va',
                channelParty: 'nxu60cz6tjp617y9l9vysg62h1m47f1p84uaakbzh95dhdldunc302vnsy9107jtdtykekueaqjlq9iowpolqkr4p39s2twyzzr3wa20buvqfoew3dk1pgnjwdi3a0c5ezcz9fl7wgqe7p1sg4fna05angxlgjdr',
                channelComponent: 'tnybv6hpw1alaf0wm3foybrh3enukw3jwcloveslrafujwd52xulpv990u6885ije9iylxri2l2ea90esgldj0754nl5g7mozt8nv7bnfu94vd3wt8scl7zphiyza6t0ta2nxlvv45hjyf6qmkgrgwteya725o61',
                channelName: 'zls4iw0f5lmqmek9h3jrcemsqgq3krbxel5fx36ohcvrz7rknaslwki33vyz58fdm0w90ma9xmrgcln228xni0zp4ilbobusm7g07saamtr346ock04p2hm0wpcfdda1953892z3jsp5l8lutu2yib3ckp79bdrs',
                detail: 'Est consequuntur quo neque repellendus repudiandae quia dolorem. Quod qui quaerat maxime architecto qui est modi. Autem maxime sapiente aut voluptatem.',
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
                id: '75890c23-62bf-42f6-9d77-b8be4f40ba8d',
                tenantId: 'c94549ab-979a-46c3-9ef1-e32329a8568b',
                tenantCode: 'q64td7276iix6vhymgt13ce0qupclo11igcqn3cneuqa76ilrd',
                systemId: 'ca623564-86d5-4ba6-95f7-898ee1649c1f',
                systemName: '6c72oef5ztnr76l25ypa',
                executionId: '654693ad-2c0d-4b4b-a1f7-6e7f3d39d0d8',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-28 17:43:42',
                executionMonitoringEndAt: '2020-07-28 20:22:45',
                status: 'INACTIVE',
                channelHash: '87qdm1tmniy8ok15uzbooffp99mre8fmk4cbx149',
                channelSapId: '8q0br6b81ds0xdw8yityndljv8tpg7v61o19kdk4s3xdw9afv0',
                channelParty: 'wviibf4xkkvtjzt0zjwciihv29z16c5j1l93ahsfix0jrsev23kquo960fyj03bqaf813xvfprgyh8881wonw7wrrktw7esrnmgwk2wjz6p59lkdujlqmitagtiffj1v0v0xn9hjdv2xsw9xpv6dptm8mytx6lcg',
                channelComponent: 'xnm4hcmoqmioanq2l5nu8xpyzf6cj933rhg8148g0gl5a38mduhpriut72wfmukvmiia7ydj2azm0hvariv9940nvrpmjvp0x163dshsqhvjg23ci9sigoldxkuven6uggujhzgq51gqw6rpoj98rqp3kzrohu9b',
                channelName: 'sx4qa0gapdtcw90adq1vvp8su9iu56aud3r7fui1ha3s9a7fnh3p8w6n0k0mxz4en9zdo69b54mrrzidoexcj1a3dfzwal2x9hi3ixl0htz907zuua4shq4pcic371yg8xd2adn473ib9t3o7nc6yq3batpemuib',
                detail: 'Autem porro porro tempore et consequatur odio. Et et amet cum consectetur laborum veritatis culpa dolorum. Doloribus ipsam est velit nemo sit aperiam.',
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
                id: '75890c23-62bf-42f6-9d77-b8be4f40ba8d',
                tenantId: 'c94549ab-979a-46c3-9ef1-e32329a8568b',
                tenantCode: 'fbju934okgwhziv9ynvskqfquvo4f0jzll2u8vupqzn47w5jtt',
                systemId: 'ca623564-86d5-4ba6-95f7-898ee1649c1f',
                systemName: '8265384wuxkwyne640wv',
                executionId: '654693ad-2c0d-4b4b-a1f7-6e7f3d39d0d8',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 02:11:58',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-29 10:47:36',
                status: 'UNKNOWN',
                channelHash: 'aq4iabd4zl5k1x4ae5klwsmyvoxgrcdqpg8o4vim',
                channelSapId: 'mryqvdbap3cymhlkq9rmz96xen95f9v3f6gle04eq4venq3832',
                channelParty: 'btlyv8z49zzu9797i0umonqxy8wuf1z08inqe0je88wp326i1a55hyvhsaozmefzas9sncu3n5uy5ci8qmnyxpdj9acorxltpb72epixydb802c7k31wrs8f1h6v8fqjbaeu4mq77u75np8ckin1cgc84d99g94o',
                channelComponent: '4u9ba6c440hcgux8c020hozstuhmu2shbg3copg3zfpa4pnce6e6tyy83bw4969hk39d1pydsuct48mq6f9imll9vavad3cioldsbbvtb1awxjna1lmv2w8ooz34cycq82vyabrrs8q8hddfawd4u293q7z3ee6v',
                channelName: 'ls677826hotrtlrmoicjy4wfypxrtpmaqyt486oxtqjf46d9mlewmlkg08yunj19wxe5wwnm4tbnakesew159d1q10oiha00qyn37jfhth0mlmsfrf5lale9544cb11k4dr19mmta3bots3mc83pxgi3nrbs3v7n',
                detail: 'Voluptatem itaque ut autem vel ut qui. Delectus ipsum voluptatem quae sunt. Veniam commodi id maxime sit ut. Omnis fugiat nesciunt. Vitae quis aliquid rerum molestiae laborum repellendus nemo est. Laudantium vel consequatur id accusamus voluptatibus.',
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
                id: '75890c23-62bf-42f6-9d77-b8be4f40ba8d',
                tenantId: 'c94549ab-979a-46c3-9ef1-e32329a8568b',
                tenantCode: 'snalk2nc30m0wyno7jb2qwmwf3ctyzjoplqssqaapmk7u7hb39',
                systemId: 'ca623564-86d5-4ba6-95f7-898ee1649c1f',
                systemName: 'nsgullmlo3d8j0t7pv7k',
                executionId: '654693ad-2c0d-4b4b-a1f7-6e7f3d39d0d8',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 15:59:03',
                
                executionMonitoringEndAt: '2020-07-29 06:36:37',
                status: 'SUCCESSFUL',
                channelHash: 'v7cawyarr5s1nmbd4tikwws3p0lccgp5gkqkaftt',
                channelSapId: '2vq803gzmlze758rrqyq1m8hy0w8yzputq6u6zzwroz88fbgtc',
                channelParty: '5fnyjxamuven3e1lc2msgpp63a75sc56utpnljyp2vpgut5h0w69k1zhpwjuyhs0xurzcuw9snipofetfs29i6gxrtsjxy7231tgner046i8ri2li7i3yggvmcn15vmu35nxtg0p4m7a3yxc4oo3cbq9rdrxf6l6',
                channelComponent: 'kvbfn2j55evzvyo8bzcfxp9cmsf1rgg44pp22y44gh3zjpsiml658ldf0qlcdjf59hwzeenqjusvyrq72699s3tdt7arefouq70qcukxlt2uvw4vsaitd3kpvmftp72qi4ritj7js4sb38pb7e1um8g89z6tqst0',
                channelName: 'pf3c81enzbbvqfybzj5wvxps24fj27j1edard67d1m1vj4vvexx7jh2yujwp4emlwu0inu95wx6qhhipyg7ff6eea0mqt0isrukzh43lp57f6rgwwokp8z9fv6lo9dcwjk8pegwmqblc4fdv94xfc66igb4wmx3k',
                detail: 'Repudiandae incidunt magni illum et aliquam omnis et aut. Molestiae in provident sequi. Laborum dolor reprehenderit veniam. Pariatur fuga totam ut vero labore accusantium rerum iste possimus.',
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
                id: '75890c23-62bf-42f6-9d77-b8be4f40ba8d',
                tenantId: 'c94549ab-979a-46c3-9ef1-e32329a8568b',
                tenantCode: 'bpg2kcmkoscke6p7jlttfb325kvw30htjdozybqrzmoynpz5wz',
                systemId: 'ca623564-86d5-4ba6-95f7-898ee1649c1f',
                systemName: 'n70uxoh5qomewgwzrwv3',
                executionId: '654693ad-2c0d-4b4b-a1f7-6e7f3d39d0d8',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 05:03:04',
                executionMonitoringStartAt: '2020-07-29 05:15:53',
                executionMonitoringEndAt: null,
                status: 'STOPPED',
                channelHash: 'xo1tdbqpmoz4i92ly064cdx5ehsz5u2ojhffewiy',
                channelSapId: 'yy0c1jlb7w0otxanke18uaanrdikevc69fq4m2dvx0knydaxtq',
                channelParty: 'vs7jkj2itf3paurtfv53wt49i2jpnvijoi6k4rzwxy6ucxgn8rgkw54gos212mwbcyctlyg67vkmajcsqsd0u0y6y8fs30ln572hshnvq21odtuxatkbafx2p9um2y5d2ap33lxpbts4bn1m1pzm400zxgnwyb39',
                channelComponent: 'k2hwoc2a08ijyy9wk6zaghbnl1ahm7s14htcspxm05x0xxj2neztyn3e4xwgwkvqz1uwyjz691xe8mekosmztoc64t6k9hb1bo8071c8fsptsqwptbi1yi29dfh9h7y47mi7wo150ns4ljfw0tliw18vj71d7rob',
                channelName: 'y5lvidy5102ls86l693xnomhfve5a1qohe5gmhn2laohos7qfzbsmewmbqsua73gj4baoyyeoayh5ro34n2p64mlr99vi2zv8c19iv6fyf3xn3gdtu8wyupc2mlwrjrsv35tv2osd78dt66pqpj03xwrzl1spcwe',
                detail: 'Aut et enim. Dolorum et dolore. Officia velit veritatis suscipit pariatur corporis adipisci repudiandae ducimus. Iusto voluptas aut.',
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
                id: '75890c23-62bf-42f6-9d77-b8be4f40ba8d',
                tenantId: 'c94549ab-979a-46c3-9ef1-e32329a8568b',
                tenantCode: 'xw62zsetjyuqaihrzmxcj6kg8rl9gv6muvrutstkmppuehafrn',
                systemId: 'ca623564-86d5-4ba6-95f7-898ee1649c1f',
                systemName: 'pwqhsq5ofz8hys1ymk3v',
                executionId: '654693ad-2c0d-4b4b-a1f7-6e7f3d39d0d8',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 13:15:28',
                executionMonitoringStartAt: '2020-07-28 15:46:08',
                
                status: 'UNKNOWN',
                channelHash: 'z08p0y1vzk9cg3wlv2o9lkij5mq61mduyao1y28f',
                channelSapId: 'k25irrej8qz7b8jgyzbzqsq4hzyo2spuc3xdkonz6ze4iyvfwr',
                channelParty: 'ndpsyjxfs8baoq5mi6t7km9fld7hw7eohtbs0tb6t3ag480t362l5pxp71mlvuvrz8su47ashefk76i6typos4e0kmhz84joiw6u5v537ng692peegl9clcuc0j2rqg8e1bzxqglypolxnoth7ggehbti8xt208s',
                channelComponent: 'ud7vajygyi8mq0r6tr0l7jkxvhxt6l9xz4iuldimjjd5rrpobuy4o5ktqr03qe17uto7xvctg25uwr0ak6yxdmm0spqivzk10mmmv9cs0cnspebvkusqve04ofocf5gxc5w59hw12sv2j3jhjl7h5b822bdgh6gs',
                channelName: 'dsexemcrpy7pn5mcpp6h1alvef0kme84s77xkczt5853ddygqlv5tksh6mmb31vljt1oo8m784vqg6t9r4bqcw5q8vjck0gvb3szxhtk8z7zpj7setpzbs4kbykamtj7q2ceigmmydzaediop9jtzktk7rckbl97',
                detail: 'Quos optio incidunt molestias ut. Quas officiis et est eum temporibus ex. Aut fuga nemo quia deleniti. Et perferendis architecto consequatur maxime placeat nam. Quia eum vel.',
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
                id: '75890c23-62bf-42f6-9d77-b8be4f40ba8d',
                tenantId: 'c94549ab-979a-46c3-9ef1-e32329a8568b',
                tenantCode: 'ts8tka8ukl17nzu9zncdtl2uy78nctc4enrxqtaplhaxi7bo5t',
                systemId: 'ca623564-86d5-4ba6-95f7-898ee1649c1f',
                systemName: 'aewy8f4v6ugulckj20qp',
                executionId: '654693ad-2c0d-4b4b-a1f7-6e7f3d39d0d8',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 20:07:38',
                executionMonitoringStartAt: '2020-07-29 04:19:01',
                executionMonitoringEndAt: '2020-07-29 02:36:46',
                status: null,
                channelHash: '2gflk9t6pkfhw0kxoz2yeygyjuevftge4q31r74k',
                channelSapId: 'sbvo22wu858oasdkj179c88u0b796ljbylooigxk0matvwimbs',
                channelParty: '3k2f25plan8pntht751s05hl314hv9e9w18iuoaoiqju9esmf6s2a6qvtfspde5jtkamc9l4mhzcm031wmf4fe7qh7ov0myjkgd4lnzefvu9g5fiy6hfvo1tn2cmiq7m0rcpn0mhsxuh18h0ak2ikbab0v3rn7lv',
                channelComponent: 'o4rgbonhmnpsevoyhg6i2g2yjwtd99p2k5gbvb13q8o7kgdk7c9c69xwi39qq7t6j714gokhqsphdvbccb8mw555ia9zkuu8x5zuw0kjjz02e9g496thwz70twvaxnoaoaa0858ykp0q4pp58ajg53kh51vyyq5k',
                channelName: '7h4p8k8wei9l6i3w4eykc3cj5f5tsrd805n1ct4khpxv9a5f3l61feb3fe7lwbu7h21h7evhqstqjyrog2a7zi49879ykwtqzknt6bsx4cfagamqcwsa6bybujxr6cbiygijec3i28fyb4ihza1hxijj6v4wfo8d',
                detail: 'Fugit repellat consequatur eaque. Qui repudiandae repellendus tenetur ut aut et vitae. Eum magnam doloremque iste repudiandae est laboriosam. Aut odit ut rerum doloribus distinctio enim fugit id dolor. Quasi laudantium accusamus sapiente. Explicabo ea modi est est et voluptates.',
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
                id: '75890c23-62bf-42f6-9d77-b8be4f40ba8d',
                tenantId: 'c94549ab-979a-46c3-9ef1-e32329a8568b',
                tenantCode: '4vkraamua9emt1acmzr3yt2un4c2lx05oak7kaoehllmewznr9',
                systemId: 'ca623564-86d5-4ba6-95f7-898ee1649c1f',
                systemName: '17lomape1s18q2ffxe7g',
                executionId: '654693ad-2c0d-4b4b-a1f7-6e7f3d39d0d8',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 16:54:11',
                executionMonitoringStartAt: '2020-07-28 21:53:02',
                executionMonitoringEndAt: '2020-07-28 19:03:14',
                
                channelHash: 'rjrroi27cno4imjhp3pgwh6ffpimrjersghf9089',
                channelSapId: 'yasnjh48z7wamp8kypepkg6l3x4q23w49pxb5224fqftu2fy7d',
                channelParty: 'mjcpbvuhnsv6bbaujbfh1cj1cn7wd6k9vo6gjtxn2rmy6gzxcvbe4zb26xlk1g8z257a8bgbkdnry76c8s0i8bxpb7ubkmvq0eziol8s3nzvt92m9sl827gfbmyr2e2147vrqe9zw9nktd5v21r6qg67q3zjqw98',
                channelComponent: 'x8fo9efya08gxf50cmahkowlbt82fup7b7fvl28j9xyau3yuiiqf2aio4qip5m8w5sajnmnzqq9pm9hz47opnmnd1rogykib354q3hm125q6d2lrd1w11duh8wyn788k8h7cnb6o58xplml7ut1pgedv1dci1v48',
                channelName: 'gcp02akub9u8xznb0dxm4zlclrgq62kjsz7wkng0o6iilna76shet3l47e8ycqwt9ips21bk0h4zlgx3gksybz6yv9zfp8lqlf64uz9efxl8eura1md99jvvt5lz66tsmsftg6n7yq75hqzxwepsregkweba8967',
                detail: 'Repellat officia soluta tempore quia. Vel blanditiis cupiditate. Nobis in voluptatum. Omnis eveniet rem aut quis quo ab ipsum. Sit facilis debitis nihil. Quae ullam aut quisquam enim laudantium ad voluptatem sit.',
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
                id: '75890c23-62bf-42f6-9d77-b8be4f40ba8d',
                tenantId: 'c94549ab-979a-46c3-9ef1-e32329a8568b',
                tenantCode: 'zc0iaybzzp7vhks7ztdopbo2ao1u1nk6ipgszschdl3bfzixis',
                systemId: 'ca623564-86d5-4ba6-95f7-898ee1649c1f',
                systemName: 'lb53m1huv9drueslz12g',
                executionId: '654693ad-2c0d-4b4b-a1f7-6e7f3d39d0d8',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 04:40:49',
                executionMonitoringStartAt: '2020-07-28 19:34:15',
                executionMonitoringEndAt: '2020-07-28 13:34:31',
                status: 'STOPPED',
                channelHash: null,
                channelSapId: 'yg8dsw7jrun2ngazgrmcldyb7vrfusb37o528azkfpi103chz0',
                channelParty: 'wb5rolssu3qih8oielyct84n2lsexlg3gdbh545qt9z4l5dv39jqjf3iby5qfs5fa9pkoxx2fy8mpt3svjsopu68k5t1em8kshh9rmpq5mvahxbavccp6iuf0s1uvoxfgsaf4xy0o3lkpt0hjqjvvzphl41e9171',
                channelComponent: 'dp7tl5lu0v01spfusep42gt8t9fz9h3z4ezxuzpgn8oq7xgelpb8yg0n2hssgld940ewarh180u9rg9gyn4jrnfwod9qyph4zc6rx79ay9w1gdnaj58agco8hf4ft5nkakbbsje04257gp3g74rwqwtv56iz4hdj',
                channelName: 'zk294qfnqkjzzvcq7p2d8jonuobbm5hmqeus3m0xkt6mjr139tlgyp8a5a6gtolfg2kfs362upxsq3rn82ylao00b2lxan53wdyfz5a0l85qgqptv4d8pzhpatmfxmbgkf919r1ir2bwndaj08jiwvi8u3zy9qq8',
                detail: 'Sed ipsa numquam numquam ut officia. Enim quam optio. Iste inventore repudiandae. Rem et mollitia neque.',
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
                id: '75890c23-62bf-42f6-9d77-b8be4f40ba8d',
                tenantId: 'c94549ab-979a-46c3-9ef1-e32329a8568b',
                tenantCode: 'btq32d43lofjn8sdi1s96t6m8ahkuh53yqf7llm03lufqvzaa5',
                systemId: 'ca623564-86d5-4ba6-95f7-898ee1649c1f',
                systemName: 'g0sb6ree2c65rzdyibpj',
                executionId: '654693ad-2c0d-4b4b-a1f7-6e7f3d39d0d8',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 07:12:57',
                executionMonitoringStartAt: '2020-07-29 00:18:21',
                executionMonitoringEndAt: '2020-07-29 03:04:38',
                status: 'SUCCESSFUL',
                
                channelSapId: 'e7t32w9nfum132edadsh0zgca8lsaz0fjfu85a8mkdnffm6ftu',
                channelParty: '4xc9zh27bvccan7ysyd8g3o65dy4gmw8zkltevi8rctesywxmpidj74m1ql5t8piu93f5uzt506zdocrlko650f489zxcps269ldwvmmjwl1ubdserdaqt3rh5w88vg75o7cl12niiyzak3wb633906cqgrgr86v',
                channelComponent: '2yi6go5no8bl5y3eeregwunzkptyx8053vwlqh5hj4wljyr5vzwaud4142jtryzdrkmlg7vwb172wg6ttt5j9esvck11fsdoq11gjkptpp84xnydfso1wacn38dektqp925xjpp2gx7r9amsutyry9j6c20l21lv',
                channelName: 'hyb8drfrxtyrm0adqwshtz22wkxhw5twfg0bgek4s0jiwwifbfi84jz08vilwt3ztp3pcpp3a6rzegohpslvdblr8n16iqfirl9u3p6ymsqyau43ogojz1zfoif5zzyv6to3ybq4leycejwrrji23h791ksnhsqv',
                detail: 'Ea expedita expedita quia eius. Soluta omnis maiores cumque debitis. Qui quia ut. Possimus cum sint est adipisci nulla id et quis. Ex enim corporis deserunt tempora numquam.',
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
                id: '75890c23-62bf-42f6-9d77-b8be4f40ba8d',
                tenantId: 'c94549ab-979a-46c3-9ef1-e32329a8568b',
                tenantCode: '69itwvbjadaqv7zabx4dgh3ih9clnbwkki4m4gsz4p2ge04sj9',
                systemId: 'ca623564-86d5-4ba6-95f7-898ee1649c1f',
                systemName: 'yxlgal6z93kge1e5gyrk',
                executionId: '654693ad-2c0d-4b4b-a1f7-6e7f3d39d0d8',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 04:23:14',
                executionMonitoringStartAt: '2020-07-29 10:18:36',
                executionMonitoringEndAt: '2020-07-28 13:17:07',
                status: 'UNREGISTERED',
                channelHash: 'zelmxw14qbipi5k6cnw5s02ufifom742n4uealgc',
                channelSapId: null,
                channelParty: 'trhqzionxmbt8yn9g4ox5jddo0jtfgw9h1l3jf9ilrjwvyzf7n9uq8f9sesn4n32awf3ehud2cmbroogabzp9yymqipgv4i343j42k51ha3cm1lztkd7gf3vioa1p17lrscgm9atikel7fl1xz6m7k5tmlpt4e9v',
                channelComponent: 'h59kcx82097fbw91p3bgx3ynn78b62b673bt8cjmie0zhmty5zat2z5nlzf9wxvsufloby6lcwwirjiqnp25r5jaxn1amyuxks5ga4srhsc3ifd2bsk6bpmvcwt27xsuo5bsovmkiecxhj32yy3z6hb4ezswrfl0',
                channelName: '2jut7pnis25qmqts1c5mpglt14wrovtu3cj2k4pk7lltx99c7e7fnghc2y8quijn7ptvf2isvno32wuvj2wdzfk3qy11jpxhkyizxagebeoaimlvwnhz3jscbdn1gt5gofjbc4yu59ft7yvgh28r0ohzbnje901k',
                detail: 'Eius ut autem expedita. Fugit quia aut molestiae harum aut quia porro. Nostrum perferendis dolore ut quidem ea explicabo suscipit eaque. Maiores veniam ut explicabo consequuntur rerum sit voluptatem. Iure tempora sunt accusamus sit consequuntur totam autem.',
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
                id: '75890c23-62bf-42f6-9d77-b8be4f40ba8d',
                tenantId: 'c94549ab-979a-46c3-9ef1-e32329a8568b',
                tenantCode: '7tzz58zjs193zsvzia4plht380bd4e9mw1ige1kknstptut39d',
                systemId: 'ca623564-86d5-4ba6-95f7-898ee1649c1f',
                systemName: '20jnwty5djjr6pi0bjri',
                executionId: '654693ad-2c0d-4b4b-a1f7-6e7f3d39d0d8',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 11:17:39',
                executionMonitoringStartAt: '2020-07-28 16:27:46',
                executionMonitoringEndAt: '2020-07-29 08:52:16',
                status: 'INACTIVE',
                channelHash: '9vpxf2sioosmnmmg3x3xc4tf0r7aht6kfay4xiw9',
                
                channelParty: 'f22mstxmb5ylm7b3jiu3nn4ex0a5j2ilplmbam8osfwghank4hgyrxuoghvyu1xcnh77x8xtekp6wzgbeb3dd9nwxp8vlukhifnqpeynfc9jovakkqx03rvx4arnh05ncorytnj6am91sg9ati8mcoxsrd3zv2to',
                channelComponent: '84usknm8l9qutd6838lnyqjowzb0xl00p2v6ghagrfuxontc0l6sa3mgsb7a6s20bmmye1cyvdvwkjldl1s65tcja47bc2sv3kd1395ohtuup2htjy7r90pzp6inecil6xsesj3pytvznpq0ymuctondn58tlyhc',
                channelName: 'xhzrqma0ahf9zt4v53aeiss3t01z864fm0nzcac19yzb49saev02aq4w3q8kv89mz1mzcp6nbq17x5c0hzw96548fltidv496jqdmtzp1pap2u77jbng5ds91peyzts8g2xj0590ctjtula62mqbzxcbsvqrtzy7',
                detail: 'Sint fugiat laborum consequatur aut magnam. Dolor quia amet culpa excepturi. Perferendis earum rerum suscipit. Eaque fugit fugit ut. Voluptates porro ducimus consectetur ad officia ut repudiandae eligendi est. Consequuntur autem quia et quis soluta ut.',
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
                id: '75890c23-62bf-42f6-9d77-b8be4f40ba8d',
                tenantId: 'c94549ab-979a-46c3-9ef1-e32329a8568b',
                tenantCode: 'lkd8zm9x11nhh3ielc370yl352xig6z2ymc9xzygnf5h2fv9z0',
                systemId: 'ca623564-86d5-4ba6-95f7-898ee1649c1f',
                systemName: 'p4tht49pzqsg9rszhank',
                executionId: '654693ad-2c0d-4b4b-a1f7-6e7f3d39d0d8',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 02:44:38',
                executionMonitoringStartAt: '2020-07-28 15:39:34',
                executionMonitoringEndAt: '2020-07-28 18:10:11',
                status: 'ERROR',
                channelHash: 'yuv2tznteh4mret2sxct3g5eprlf43gpcv591ve0',
                channelSapId: '1j465yfg5d5salml0w0cg4mj8xvwn0yxszlpxehhjcpls9zd5f',
                channelParty: 'nsgdehvpjmg1fp9tbi8e3fa030ogvrnss0d9nanydmr05juf6nvq5qjszp7vtuzxjo83ayhoxx23g2f74k3v791ffyn1mfzao811blr8ps81g3gcv8qxi0kc9c8fxbiikoii11tknjds37olox3myz9xev3s3dtn',
                channelComponent: null,
                channelName: 'uyk7jygwxa76jobc0i9rw7p4tkjdaqt8hok54rcdqd0l23tqtw91l8cunmxgn69m6hvwcq1voslm3sjfwihknflg7l9t5gswegnwebd42k9wf7vz7krj92evvtegxnt69oa80r545rwj2pj0qqisk978vr7xkqio',
                detail: 'Voluptas itaque quia nam ducimus ut. Eum eaque nostrum voluptatem amet. Officia minus officia est. Aut quos minus sequi earum itaque aspernatur sapiente. Ipsam et et maxime dolores expedita quas eligendi. Corporis voluptatem assumenda commodi soluta quaerat.',
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
                id: '75890c23-62bf-42f6-9d77-b8be4f40ba8d',
                tenantId: 'c94549ab-979a-46c3-9ef1-e32329a8568b',
                tenantCode: 'narfkr8s7a5mnbuu38ba4fr7bi0kskq91c8dxjls6afbj47c6v',
                systemId: 'ca623564-86d5-4ba6-95f7-898ee1649c1f',
                systemName: '6idkt0ht5zc4dw12gh9p',
                executionId: '654693ad-2c0d-4b4b-a1f7-6e7f3d39d0d8',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 08:34:08',
                executionMonitoringStartAt: '2020-07-28 18:21:30',
                executionMonitoringEndAt: '2020-07-29 02:20:42',
                status: 'SUCCESSFUL',
                channelHash: '6cg99ugkn4gocvub27stbjjrxst73vw471pyfzdi',
                channelSapId: 'y726szj4f4zblwtofhv7dku17rr8jl2xinfadqi5k342naajs4',
                channelParty: '87lit8eawvjzw7vnkg7kf7926ggywjs5iyny78h1joe02khiwj7e86d0jd2revptn2fc2iah4g2mun959h22seg290m14aoncce2f91zzr1pmun8ydcjea6qh3j0muf5vn479qvr2n6rj1a70jw8p7lowsekyo8r',
                
                channelName: 's91bq7vewmn9fbmjqkr2dfvn2kx5m82bndv9jvc94koax1qgffqloqsvcgvsdkaaufh5ukhrq7ypxz98i54ziw9k27o8h25he9b8s9kbjt6n8b7l8mip1i2q8p6k0uyg5e451gza8c7qr45u8ew6y7s5w8tr01wz',
                detail: 'Praesentium modi laudantium et. Et repudiandae labore aut itaque beatae. Doloribus inventore nemo facilis incidunt esse tempora. Tempore cupiditate sit maxime sed qui et.',
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
                id: '75890c23-62bf-42f6-9d77-b8be4f40ba8d',
                tenantId: 'c94549ab-979a-46c3-9ef1-e32329a8568b',
                tenantCode: '9x03bq3qdhikf3j618u1ld9zb33gdod1ak05m0mde9uocn2w9s',
                systemId: 'ca623564-86d5-4ba6-95f7-898ee1649c1f',
                systemName: 'h4ckb2xevvgyq0z4nrh3',
                executionId: '654693ad-2c0d-4b4b-a1f7-6e7f3d39d0d8',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 07:17:20',
                executionMonitoringStartAt: '2020-07-29 06:08:16',
                executionMonitoringEndAt: '2020-07-29 10:06:48',
                status: 'UNREGISTERED',
                channelHash: 'd71vp0q073f5w4ykh4aclv8v551j9brzq1ac966a',
                channelSapId: '6ytmavnp2ucwx87phkmbfejtipuh8k4lh9zlyt8dbu8c9sjatu',
                channelParty: 'ffn7gmn05345mjbrgsmzv9p8atrhe7hq1639nd8a10ga1pm7wrzlw1qkq6ln9mzhaic7z02cc3nfy1lu8peowk21m8l04hta42j6uve5z2mjyk7j22fcnol899zg6l6ofynml9opg0ichxqpfpqmrfgb13mfna5u',
                channelComponent: '0tczwfp98iktr1w6xxsh77lwj947p8ezm5llcnuxtor3hmacpe3r66z8cldwybo4kmt0jotpirfyrxyviqb66lfe4mk2n0g7hesdi5tsdnydpuosype4chz2iogkh96o917y2x7ylr0tycj8ccjdfuiasx9x05nk',
                channelName: null,
                detail: 'Architecto quia numquam rem odio sapiente nesciunt unde ullam nihil. Itaque aut expedita. Ex ducimus fugit quibusdam illum quo esse error.',
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
                id: '75890c23-62bf-42f6-9d77-b8be4f40ba8d',
                tenantId: 'c94549ab-979a-46c3-9ef1-e32329a8568b',
                tenantCode: 'ohdqkv5blvffiojafsih5jjvc8ztefncwt0kp10qmu73g806wq',
                systemId: 'ca623564-86d5-4ba6-95f7-898ee1649c1f',
                systemName: '9jki86az8oeo59dxxeqd',
                executionId: '654693ad-2c0d-4b4b-a1f7-6e7f3d39d0d8',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 13:53:34',
                executionMonitoringStartAt: '2020-07-28 19:53:46',
                executionMonitoringEndAt: '2020-07-28 23:36:18',
                status: 'ERROR',
                channelHash: '6rq4ucof67plu76uga7a7m2elr3gk280xpzkdbho',
                channelSapId: '6h2e7unzgt3w0kkyxau1hacwdnbjj9yi0za1m5at53es997bdi',
                channelParty: 'coonn8bdaxvwkvohcw85mycug91v1peka5mnbs592rce62bn67snu2t182o5ihg4gzdtkkw9p4b7h9m6wu1bhjq4pw0kkub71q0f9l63nqe9pgkksf6cv5zyslow9a201wqft8w5k5qojl8bico3l4gtx0h29nn6',
                channelComponent: '23ytayi5yjta5kek0kr5vx3ypxmbiuinq3cewmeakr5ogu6sy46pm5d3vd45tswdn2w0e9ojawlz1b4b6u3yerk1ay7muqlsi044exp4oa23dxzvj25onkurc2csms3d6rg19sfa1w5gzrbq1nmr2zwh210ljafr',
                
                detail: 'Inventore distinctio dolorem omnis expedita. Modi inventore laborum maiores pariatur aut modi pariatur pariatur sed. Harum voluptatem velit blanditiis qui est.',
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
                id: '51c3ztk0w1lx7cs2r9o4luiopr1ufg4na73fa',
                tenantId: 'c94549ab-979a-46c3-9ef1-e32329a8568b',
                tenantCode: 'g3grj4iwwwh511w99dyfzdb7yoln02ysi9plz9om6pw4ljbs8h',
                systemId: 'ca623564-86d5-4ba6-95f7-898ee1649c1f',
                systemName: 'jd7qvu4j66iskeueiw1n',
                executionId: '654693ad-2c0d-4b4b-a1f7-6e7f3d39d0d8',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 08:02:57',
                executionMonitoringStartAt: '2020-07-29 02:04:53',
                executionMonitoringEndAt: '2020-07-29 02:49:01',
                status: 'UNKNOWN',
                channelHash: 'wjq75kcyrfubp0cod8c91p4ijyv2tx3rvbf7i551',
                channelSapId: 'dokkhlsgjrnrfq01blrziv1x6ou0pv3iduqyzagyachmu2qvx2',
                channelParty: 'tgfqekvx8pekhqetqu6d1ewae5l4qi3c99zelh0c36784htrduentq0uf8zllgdsahx3lk8yvgzctw157or1vyb13saw56d9mk5ywvuh1ayvlkpjsmkdaebit1k0r95i8a4b3ecnol294bx41amhl8vz00wqxt9q',
                channelComponent: 'zxoft41sprkhkl3w988olxvrqypdgukryif29aopew9y2o9h2yj80posl23z267rmgh16a46p48m50tipo28zb2xllann8i7eeavqim5pws6md3irmgmbjyyjmf2indagikj45bfjvc3bhtaddawroph8a8qpjob',
                channelName: 'hdkgv9cjv7epwkg1ur4sckwz8bthpdm6sg1t55vt6thqoicmv0wi8rkvtrpuzcp89tmisqm4jfhacc1paqcq6jm32hu1t7fgpfl7rl3bradeffl746n4wni784c0mymjku3lycpbvhal535sz85v9qoh7744ow4r',
                detail: 'Asperiores exercitationem rerum officiis quos omnis voluptatem ex commodi voluptatem. Minus eum et voluptatem molestiae et. Officia maxime cupiditate nemo non velit praesentium ratione suscipit quod. Et deserunt vero adipisci officia. Est qui rem et deserunt ut quod. Non occaecati eveniet vel reiciendis voluptatibus ea sit at.',
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
                id: '75890c23-62bf-42f6-9d77-b8be4f40ba8d',
                tenantId: 'qznqqaqa1szo9rfx7705d9ipphd247ldscw3n',
                tenantCode: 'qo1cms7cc33dqm9u76ij9hv8ib8vxxt5w5fxrvi2l1v6ssnd63',
                systemId: 'ca623564-86d5-4ba6-95f7-898ee1649c1f',
                systemName: 't7rb1ksy8iowmjkejjhx',
                executionId: '654693ad-2c0d-4b4b-a1f7-6e7f3d39d0d8',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 14:19:32',
                executionMonitoringStartAt: '2020-07-28 17:09:00',
                executionMonitoringEndAt: '2020-07-29 10:17:42',
                status: 'INACTIVE',
                channelHash: '57tvcks8zucomo85bpi18kw2zw4uyeqh8uv0rpoo',
                channelSapId: '6znjuqalm15b3076jvecaf3mbl0nu7nfxr835ubbgii4033h24',
                channelParty: 'texrkkl1mbwnj7ynbfzp3be7jiftocz7216xtj7ow9pi0joj436ya3iy9o33b2lf05w0w26oru6nn68ffqme3evavv6h8qzn75ka0ymlvrc55w5rtmmklycqq1qlppw5yj8x190hlkhrqsvxdwgvri3yje2570cm',
                channelComponent: 'nlveou8y0i73drllg54rsm22zx511zx4rv0w2sz7w5odgsrj4k6wqxq6nr18l9ytpsmmgxcg3ormb8jqs68saa8irxf9xnhdk9wqi4pzdblxs9etk45x7uiib3bsew73xlpt45du93o2em103vgaauezy11peko1',
                channelName: 'z7zzwn6265vf4i1wocuwcs98tm1066fyea8vq5tpvraodf7vfbii6x2xpww0kmatqfe0piu76xsd6jdeh2yclu1m03dn6vaf1b3qt3rou98bv287cs6jm49w64pbf5sihd1qw33qbwt01nbp7mbzmvb8zch3l7g3',
                detail: 'Labore recusandae quae cum esse rem. Veritatis nisi ipsam fuga unde voluptates nisi quaerat. Et et et fugit dolores maiores rerum et. Qui corrupti quo non nam expedita.',
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
                id: '75890c23-62bf-42f6-9d77-b8be4f40ba8d',
                tenantId: 'c94549ab-979a-46c3-9ef1-e32329a8568b',
                tenantCode: '4s37ru4yi2go2xmp3ptzpw3rohpowgrsd9knbaorzt48eij2eu',
                systemId: 'dt043buqrkmjle73ry0bm0uyr6bi6awkhsrf6',
                systemName: '2i15rchl0vx2dbq8ujo8',
                executionId: '654693ad-2c0d-4b4b-a1f7-6e7f3d39d0d8',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 09:40:10',
                executionMonitoringStartAt: '2020-07-28 19:30:34',
                executionMonitoringEndAt: '2020-07-28 16:53:38',
                status: 'ERROR',
                channelHash: '4nmrnuxxebjzmvwftjocn5fvhs388xkbyttybc5o',
                channelSapId: 'x9hgslu6njsgzvnt9abjpt1vy8yuj48nm9nh9f89pktfyo9p74',
                channelParty: '9hrixihz267816o3mnlv1o782r3zlxykkwir0luatrxm1zla2df4irou3posh2y2ox73y6z4dugidlim15ygw23c7uxu5k08q5wkh996tarczem66bqp2ji4i3m7wpc15wt6efjtjdy3byhz4hg6uitv8pur7qs7',
                channelComponent: '4g3heezhpqrs365xkwk9ogk4mgnrpjsibucqvqqgs1qydmh91gsjx6u4yx71bmp4hgjswb9vy8t9tg1bzbjno49927d2gqdpyfmb66x8jm30750fl52afcnhn28wz5lgq8ku6wov6wgrcub7g74tr3s20eybwg5l',
                channelName: 'yty5yg5mocbv3dns1yhmrsggufd41rk530012f4sk5box1ca0dnogfg0vettacdt49qliainvkn99z7wl25cbwfivrsi1zsaskjkn15fv1al749nh3kq9anad7s343vu1h92fhaidv47jx0a4rwbzv0pdm92uwds',
                detail: 'Est architecto quam rem ut quos. Est laboriosam commodi recusandae sint eum. Vero ab ut aliquam sint officia id aut. Blanditiis suscipit dignissimos dolorem. Cum cupiditate consequatur velit ex natus. Enim odit velit iste tempora molestiae eum.',
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
                id: '75890c23-62bf-42f6-9d77-b8be4f40ba8d',
                tenantId: 'c94549ab-979a-46c3-9ef1-e32329a8568b',
                tenantCode: '6dpmma6c4ld8qxn5dnoffkgbrejipnrwrp46tcsg4tiqhgny3z',
                systemId: 'ca623564-86d5-4ba6-95f7-898ee1649c1f',
                systemName: 'k07v91wr0777vrubfzy5',
                executionId: '3fc2dlex8im6y03tka1ct36rddqzmtzdfdns1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 13:14:41',
                executionMonitoringStartAt: '2020-07-28 20:03:14',
                executionMonitoringEndAt: '2020-07-29 05:22:14',
                status: 'INACTIVE',
                channelHash: '0a8nif1vxcyd8zq9gwpdjns6ffcyvrmcrwg8u6rx',
                channelSapId: 'x5983237ca1yjuk18kdi6g0wo08ran0yceyi7ev1q11y7lavcq',
                channelParty: 'ttokua5tz77hed4qazju7fm0o4m2uqt2546u2mknbcxb84p029h56dw4ewyr52vj9wqar3xwg3q23qxwtar5n4hk5308y9w281762jmhsawh5rx6otnt80z2y3aztih8ge04qz3yxhrrih7dlkkb3y7x6281d3eb',
                channelComponent: 'j8tu8ux5v3a2rnq6ozhvga3zpcccl2rrmqul7qgathbi2ia25oih4u13gvhan5wuwzq90ccaga0m2i1131dtpswolehufwlo4sx9kvbis1rewrlsl85ztyget1lqhc88vhyzhpy3u5cg2q5kdj49sueq9rkd60f9',
                channelName: '52dx59qyu0hpgw1re1vbgzw8o2x29ffwlp6u8wvgjwhxhk6jwkvbr9kzq3vq09mh3qfb4eyisa1m85a7q613r36p7u8ig7n5832v8dcr0tx8ysmac6zcfl5a0qdfbzkdvfsaeio9kadeqrg8v5m1n52f87ldyusl',
                detail: 'Unde enim dolor et dolore et fugit nam ullam quo. Veritatis fuga iste. Illum laborum enim dolores. Earum molestiae delectus necessitatibus et et quia quam.',
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
                id: '75890c23-62bf-42f6-9d77-b8be4f40ba8d',
                tenantId: 'c94549ab-979a-46c3-9ef1-e32329a8568b',
                tenantCode: 'yopk9im8s2p6503ko5oldt2oo4w0tw0sua9rzgar31udth29en',
                systemId: 'ca623564-86d5-4ba6-95f7-898ee1649c1f',
                systemName: 'pyf1j05c5nca9izeujus',
                executionId: '654693ad-2c0d-4b4b-a1f7-6e7f3d39d0d8',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 04:07:12',
                executionMonitoringStartAt: '2020-07-29 12:25:19',
                executionMonitoringEndAt: '2020-07-28 20:57:26',
                status: 'STOPPED',
                channelHash: 'rr18nz0mbflbfnpkyk5z2u2kfv7l3lwpfh5gzqq8o',
                channelSapId: '3bqou3td7740bckok9aj8lbluy6ra7ck90bmfsudqlbvf62dt5',
                channelParty: 'd8z60u33j2qlwag162f019w1e8snaogqydfenhx9drbejm9psonswh93onaiugtwtedizhcnbmpjkx1bf1gzc8vacgm8zb42ru4xuustydepdbrinoc4iqvbh6nkurttfcec3by970d18rci2ztl7bgrdvhkscxj',
                channelComponent: '92r8gw96ciiaxcq5zxc4yf5lyvmex94qzi7mm28i8lr06gu31sat1ce59tgz08w607lnwfmm5guopgv23ld9wkzfdtol3uby221f5iyj5e0nbffwjhsqupl2vfmuoi979867yweo9e6j4mnqdb6xqeyd1rku8wy4',
                channelName: 'revgfgbp49h7kuhuc654cdjl5hjnbjsbmroz31ovnmtxfu0lnje9j0xh5zxxqmnz50kcshpaggwi4vokvwtf5gssks5gqn86d8so2c3ebl6mbyznj4nrtda4b2c5l2m1i018s26ze359wrh74r1remuchlj4w2h3',
                detail: 'Qui officiis voluptatem ea officia molestiae consequatur nostrum. Aperiam voluptas hic in. Eius et voluptatem animi ex. Fuga qui maxime quis quibusdam aut animi quia.',
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
                id: '75890c23-62bf-42f6-9d77-b8be4f40ba8d',
                tenantId: 'c94549ab-979a-46c3-9ef1-e32329a8568b',
                tenantCode: 'iybgrqx9dychq5jl923f3w5teqxzycjqu7hdwfyi0dszhfgsnai',
                systemId: 'ca623564-86d5-4ba6-95f7-898ee1649c1f',
                systemName: '55y23xkbbiyxsvfyycjs',
                executionId: '654693ad-2c0d-4b4b-a1f7-6e7f3d39d0d8',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 10:20:57',
                executionMonitoringStartAt: '2020-07-29 02:22:48',
                executionMonitoringEndAt: '2020-07-29 01:43:30',
                status: 'INACTIVE',
                channelHash: 'e0h3vdk0y8vna0qrmfdz5v29160mc2pok1mwj46l',
                channelSapId: '4p1bpa07i582yj4y3fb9ate9egzvzpzieb0kcd0aj7yiii6lph',
                channelParty: 'sggjnwetpq0984nqsl7woe1nbarrqi9bjsmrpe9vk1asvf1jfuzqt037urltc589rw3mkptsk3ahvpfwxlw1zjv1d5urwbnrwwjtqq4s93vzk2uicz9oc35jrb7332k98be3fwejofwoj42pav7qytysre6r3vff',
                channelComponent: 'abys71w5qwcaz4fzblcbh4tik0a6hwl9ywinnany7zk3wn5azkftsw5tfr9orxxhx3ql13io39huaugfpfxyo1n86r72jlefyx7r4acw3jj2r2uves12ci0rpv345i242tjvodaew2cll52bpf45nokgyyhhwdle',
                channelName: 'skilwtxle6ll7lo7y4go3bed5647n2jhcif5j1cuz84vqakecreg698naza2btf3rp6p744c5rk23kpdstr5uudqhuo5e5aijc6dmb08qr60e1fpghm31plv9tdi25no5sapnbd35bzh3ok7g8ji60o2jmx0bc5w',
                detail: 'Doloribus aut ut. Explicabo omnis aut ad qui molestiae repellendus corrupti odio beatae. Nostrum placeat non repudiandae labore dolorem natus quaerat. Fuga veniam inventore odit eos. Dolorum aliquam esse rerum necessitatibus similique.',
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
                id: '75890c23-62bf-42f6-9d77-b8be4f40ba8d',
                tenantId: 'c94549ab-979a-46c3-9ef1-e32329a8568b',
                tenantCode: 'b4hnhu2624s8q2vbmi7r78ha2ordgmiftme5en3zxsrxvcj6op',
                systemId: 'ca623564-86d5-4ba6-95f7-898ee1649c1f',
                systemName: 's2eiz70v5pbe9k2pkivq5',
                executionId: '654693ad-2c0d-4b4b-a1f7-6e7f3d39d0d8',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 05:29:26',
                executionMonitoringStartAt: '2020-07-29 04:00:07',
                executionMonitoringEndAt: '2020-07-29 12:23:14',
                status: 'STOPPED',
                channelHash: '9t47sq9mmqrt9zxxmdo7quaa5nlbs9q6jpsdc6yh',
                channelSapId: 'g0aztof77q1jgiltanjdp8yk7woanzia9wozbun7jw3c1en5wj',
                channelParty: 'cl1jmjsthw939ghpgp2kdtx1p7yxnchu873ly84dva7bbpdidovkbzy9u5rv22rk4073bwn1to48t8e448ew7cz2zr57e32lf3zj24hoh7laxekk20h7ub7qlz8tsnswyw7a30wuy6bm1upaa5r8tb7prhrrf676',
                channelComponent: '5fkc1h9h7etbjz0uigalpwjgvx7j76mogsffilggrre1s0zdgx3ax34trhfg4ew3mxy44zs4japxtvcyr579j88e8duhmrwk0pazkic3n8ceru4ek89gqlhhuw9x0odzt5c31p6u9v81bssvbdzzms0afnf2z2ba',
                channelName: '39sx5iogxbikl7irb38uwis1bqf81vldhqmyzx4mtt25cz60bugyhlc2z7xys60n0gp00cl7h3w8dbtwqhvtapssy1kul24n5f0qcxpzizw33fw0f7cjao1wahb6w9hzprzo48opvtz6xupx73m22jjzh52mytbn',
                detail: 'Aliquid quo itaque error asperiores in. Et nihil quasi alias necessitatibus magnam iure quasi dolores. Eaque minima fugiat sit soluta adipisci dolorum amet. Omnis illo voluptatum et quo sequi tempora.',
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
                id: '75890c23-62bf-42f6-9d77-b8be4f40ba8d',
                tenantId: 'c94549ab-979a-46c3-9ef1-e32329a8568b',
                tenantCode: 'jgif7u7gr0x15zk9l7kiju8v89dm5d8ayxdhnflpsqpnj2myho',
                systemId: 'ca623564-86d5-4ba6-95f7-898ee1649c1f',
                systemName: 'a19ek0l7bq5ys9vlr29g',
                executionId: '654693ad-2c0d-4b4b-a1f7-6e7f3d39d0d8',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 20:31:14',
                executionMonitoringStartAt: '2020-07-28 21:19:46',
                executionMonitoringEndAt: '2020-07-29 03:55:14',
                status: 'STOPPED',
                channelHash: 'szufm5u32czfiwdtq59da540ih3n9dnho373i5nu',
                channelSapId: '7kmbvxoq6i76lly1xe8yvuf74d466taxia3059crd8y461q0xcz',
                channelParty: 'hiyha8oahdvus01ymuvid73rs15qfb8kgeg19e8i32zd2afc1d5wn8j89xcex69d27gdmo4vn95qsob17jrcr65myenui1j68izu7742e6kdwb2ixizm4etjg4yiubs9z642trb13v8v8et1dxmfhrjswh6hww2c',
                channelComponent: 'feqk4suiojrmahgyemkdzejsg0cfqxgs0p5lhqx2tetful2fnaglrx6fnp9mmbqfd33fkjz02zjb4ukoz1v47qds6ariwa69hdudzd7skhqei040164dx6ayklx4713bz6q3wmr62lor3bihpt1xk4tq9fr6zypt',
                channelName: 'agmct3q54vqhhorkm35dbrwoob52thf0t0cw75y1xpvqjhy5upvf2brmaiigowq5uzrht9tj00ozbtojipqwz4idlsl5xeg3reo1pzrzonox62ka7kz6thzylymk0agxybvo2va4ob9foxjnsxtre8pjfo4bz7f5',
                detail: 'Qui ut occaecati. Ullam et qui laudantium eos totam. Nemo voluptas error minima saepe.',
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
                id: '75890c23-62bf-42f6-9d77-b8be4f40ba8d',
                tenantId: 'c94549ab-979a-46c3-9ef1-e32329a8568b',
                tenantCode: 'cv9slfm6r2k7mqrtgqlr8ornxkjpg4omp5fxkv8663lb1b6h84',
                systemId: 'ca623564-86d5-4ba6-95f7-898ee1649c1f',
                systemName: 'h9mnualdwl0glihmj1m8',
                executionId: '654693ad-2c0d-4b4b-a1f7-6e7f3d39d0d8',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 18:59:08',
                executionMonitoringStartAt: '2020-07-28 22:19:15',
                executionMonitoringEndAt: '2020-07-28 16:29:33',
                status: 'STOPPED',
                channelHash: '5gnriq5ysr4rj3l8zksodjfcfbqa912oz08snzvh',
                channelSapId: '3xixb3d6wmseag9zzrui6a7q02xk4fug9hbovqkc2eo4zk3azo',
                channelParty: 'j7p38vjii8b3ns35k3qszhbimhmkvswk430ay5w9ybzq0idqliv76drwu5zeni123tjx5agw4yxwrvymrb3jgjajzf0tb5nmsh18w21wwhd0hrd8uitz6mzzkl8iciu42od9ywarydpbxxa8foazxvzwyxeqpryb3',
                channelComponent: '5kiniujn7dacjfonwkeavtjzjp5ya8xrm00dtnjkmrtoa17uoa9bieagk0chnsg3qdhuzmgx6omh78xiq8saec8jfedqlkx3mx1h6ljxzuxp18t95yqncpsdbtga7664oc71m7ucfhdcr8t7g2heqtklkyu9tc0u',
                channelName: 'lf0wiq3ru7kmtf0t6ycuseef6whzmau9qbbxj1fv5eicz7ewixmx5uyl9qlbymdcypu5dwyos39o5k7205jot8pnzincki4zno8me8txs2d4ygszf5bah8fu61b3fcoal7ipwf42f31aomvfxy0bwby6bhdu38pj',
                detail: 'Molestiae nemo et eum sunt maiores atque totam. Assumenda vero nihil beatae odit et. Eius sapiente dolorem eveniet optio et vel saepe sunt. Impedit autem nam.',
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
                id: '75890c23-62bf-42f6-9d77-b8be4f40ba8d',
                tenantId: 'c94549ab-979a-46c3-9ef1-e32329a8568b',
                tenantCode: 'safw4c0ankylknrho2bi57t0exwcqvj0m23dh1a4zqtz1zrtym',
                systemId: 'ca623564-86d5-4ba6-95f7-898ee1649c1f',
                systemName: 'ks0ny8qwyb2iisq4b4xh',
                executionId: '654693ad-2c0d-4b4b-a1f7-6e7f3d39d0d8',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 18:31:15',
                executionMonitoringStartAt: '2020-07-28 23:53:30',
                executionMonitoringEndAt: '2020-07-29 10:17:46',
                status: 'STOPPED',
                channelHash: 'agkphg93eonkyrmfj9bhko555l0zskjz847omy7r',
                channelSapId: '4skrq2uv5tydtum5mdp3wdgzw9unp5gewkju8g1knwhqkamf8g',
                channelParty: 'yee5xsjgld5lp7chs0qggqitz0ye17o8rn6a9wky3me6q6imy9tot47qxp0wqna37rn1elk0isbvikqg358k2skmnx1d55yierzzt625k86wtqk3h0nbl5zteeiieenb7psjypshsicguyypr90ixtk2nbyv3hq9',
                channelComponent: '20xfr6sejnrxc9otyemrtvpho56np31tp8ke7qarpozjnmzrcg8gr7kwlea0i8uq7gyiyvm0n3dxxqnf6nd0cjllzg54dvnt2sqhahf4xg2xp6mou6gnprhfbj2lb7d911utmoymn2w8sewjjcxdwgbj5zex8zfas',
                channelName: 'hk8klq2azk7pkdg4ewuz6db49br2r1fpjo0hen1eurpwleqg4v4omf7mu0g9fvdvese26nbr3md169ui7lywrzmab5uhgo20x64076kgi3usbxv98upbsp3rghaj72fd47c2796mhbavgyxzsxyhfgur4aq1umhq',
                detail: 'Delectus tempore nisi ad. Sequi dolorem doloribus velit voluptatum doloribus. Magnam corrupti possimus laboriosam exercitationem laudantium in laboriosam ratione eius. Temporibus ratione enim voluptates.',
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
                id: '75890c23-62bf-42f6-9d77-b8be4f40ba8d',
                tenantId: 'c94549ab-979a-46c3-9ef1-e32329a8568b',
                tenantCode: 'ndhsdokiykqpm1v6p691yv971yte45v5qobtbnwwc50787u02w',
                systemId: 'ca623564-86d5-4ba6-95f7-898ee1649c1f',
                systemName: 'eqq4mq9nzr18s8wgwz1p',
                executionId: '654693ad-2c0d-4b4b-a1f7-6e7f3d39d0d8',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 03:15:55',
                executionMonitoringStartAt: '2020-07-29 06:01:48',
                executionMonitoringEndAt: '2020-07-28 19:35:23',
                status: 'SUCCESSFUL',
                channelHash: '9tqq4agxtm7ib9gp012eiauf2dtceeih7w7zqtms',
                channelSapId: '3ca874ir37728vjxutzcadud3tgnwa0uiqtj0eovs22baoacun',
                channelParty: '68ux4dw1mk6uz94ibtkc910e4s1n0d7wfh78w9oaa47i64xf1ebity1adm69h2zjti9pk4n37ac28iei1vebwrs1t4qbavvc3zxqf8pkh532jfdb03cko2pnw569a5rq9f5edt1kiy23fapwg6c7ijc4suzkam8p',
                channelComponent: 'h17jpwrr86n252yqctsh32zsu16e4klmdyecptwjqq7opm5xq4v1h31pnjfs2q9rfkdo08hr8kib1bxmhz0p08eqgi578i862novhxv91jo4h41eq8rk6z7rai8hpl7b22xl4rehrmcpsaswzust6ufquncmqkr2',
                channelName: 'uhooa53rnkrtxekapo11wp73mgv6zorxmh1prls21jz24miilqcvct0um6tl94yafcz90yoremxcruxq1kdx1rogvu6uqyle5gnn40ta2l8veqe72tszt0kl3h0bxd54309onnof1yg45mykb8zo3zebiu0yt1f5i',
                detail: 'Molestias consequatur repellendus minima veniam. Delectus minus incidunt asperiores soluta corporis et vero enim. Ipsam quis hic et. Sunt sint sit iusto. Ex voluptas quis dicta at ut.',
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
                id: '75890c23-62bf-42f6-9d77-b8be4f40ba8d',
                tenantId: 'c94549ab-979a-46c3-9ef1-e32329a8568b',
                tenantCode: 'szx59qhiq6g68thnntqboo806rbjhttgrxxrt3mgy24i4eeggd',
                systemId: 'ca623564-86d5-4ba6-95f7-898ee1649c1f',
                systemName: 'zjlkbqlsi12e80bfzwg5',
                executionId: '654693ad-2c0d-4b4b-a1f7-6e7f3d39d0d8',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-29 09:28:08',
                executionMonitoringStartAt: '2020-07-29 10:50:32',
                executionMonitoringEndAt: '2020-07-29 06:55:41',
                status: 'INACTIVE',
                channelHash: '1nn4ca2ns2y024cduhfvye7rhvvz6f6a5ylo5cx8',
                channelSapId: 'ck8w4otpa9odko6m377tq26yhujm5xfub47rs4x5x9x1whk77j',
                channelParty: 'iempytz0xxnseif1gn0xqpu3x32s2wk9rnk265j2ew9rfqdazedummh7moz0l7of9i55lwdfvcenoz1k6x5bp4lwj6unlamk103lhwkvrtxf6ibvcnptsn25bvz3mbs4eff9i88eexvloci62jhz9qfj6zvavgn1',
                channelComponent: '5u6a1gl9o4jcl72vogvyzeord0wromxzu4n61x5v8nxtlg6he6nzmio9i1x8yhjppaltc1rb0q2k3wtcwz73slirpcfod8n4czofxasvbfznfkax6y0nspojkmv01uj014xmh9beo5q3hfm6wdpokkbr6xhualdn',
                channelName: 'twy6o6wl8476wye3koaqrk6gxm59st868n25nkxk2sitldzqmq7n18bo8fd7ijvqpnci1c3yjmb8sgohdd4fihfid8jc1o6qtp8lzimxfqajm9v05t6ajj8f7t0twpi2fmhlrbxuqqtfvz9jif8cw9aixiy45ido',
                detail: 'Deleniti nam accusantium velit doloribus repellat nemo. Illo minus et et. Error et minus odio aut saepe et accusantium.',
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
                id: '75890c23-62bf-42f6-9d77-b8be4f40ba8d',
                tenantId: 'c94549ab-979a-46c3-9ef1-e32329a8568b',
                tenantCode: 'dj4irl8a7ynnclehil4a1bs7kr8a901aix8zpqdx1be032hnd2',
                systemId: 'ca623564-86d5-4ba6-95f7-898ee1649c1f',
                systemName: 'c3v9y90fhpf1jvdsbr6o',
                executionId: '654693ad-2c0d-4b4b-a1f7-6e7f3d39d0d8',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 00:14:08',
                executionMonitoringStartAt: '2020-07-29 08:21:47',
                executionMonitoringEndAt: '2020-07-29 12:06:40',
                status: 'XXXX',
                channelHash: '1ol9cas9e2kx1v2i1veugqrjq67b1bxj2hyltcoo',
                channelSapId: '3r5olrx8s0eaby8c47mwz4ni9egcg7y41s4vpwqdz24zja387z',
                channelParty: 'fp266ph2lc9x330vsz9xq4dhdeq3stn3p5bkin436oogyeczjvry5zce7kz5sadlcjkmp552zrry1bncaviyx493cjm6r84s0cl4pufugsmh45a5pmzfmntxpw760dplj3fkuh23cir7ca9rzo92qc8jzzdepyic',
                channelComponent: '91ahmbawgrd5c0y1r6bevbc1ayxofexp2yhy6s53zzridudt64j4piyjwjw9ndqdpu3w92udbllgp5cd5rcclal9y3s4qpdqzl3frx9hrbmhs6nhdpgazygllbgu865eq2albpkhsfa8biugjwqo1g9efu4wcwoj',
                channelName: 'g7hg9u5b8aanpdvy33drb8c7hufwttrbd5i2ncseo4h50tsofltptfmpfp0z9ppso4k17rtwgc81ah4bk6btdlfk76rwu6l3fybqlmd5w0ced9984vqbk9mf9oc9d38utp0a7e2gmllpwe5pxwq0a9uc68xbgbv1',
                detail: 'Sed nobis a incidunt similique. At occaecati et qui voluptatem distinctio. Veniam rerum nihil doloremque voluptatem porro et. Quia ad facere. Rerum minima modi omnis ut quo soluta.',
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
                id: '75890c23-62bf-42f6-9d77-b8be4f40ba8d',
                tenantId: 'c94549ab-979a-46c3-9ef1-e32329a8568b',
                tenantCode: 'aom8538viwbucufc4zosrqy464jzlsgnfny8ih9vxiqhv2dfj0',
                systemId: 'ca623564-86d5-4ba6-95f7-898ee1649c1f',
                systemName: 'x27ivdjb0ykg52gu5x12',
                executionId: '654693ad-2c0d-4b4b-a1f7-6e7f3d39d0d8',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-28 13:52:47',
                executionMonitoringEndAt: '2020-07-28 13:27:03',
                status: 'UNKNOWN',
                channelHash: 'jxlpw96wrels3ugi8eo9r5gj1opaqluhzpsccpvm',
                channelSapId: 'ybwir9k3hhmqomerbjlks7i8y25vkmslhvl44y03gzjbkqryv4',
                channelParty: 't97kuprof14ftpieml3fb4joon5ojarqqwv9tnzjjxg23nbof6g6rkau06zovc70lfhpdt1407293q4n0i25mgww2d2lfte0lwqsnz0ndcdi5hsot8pio31on3mk8nso2xqewna7gujxjr0he7jbjngfy2xd6g59',
                channelComponent: 'mdbl3kkkhdvi2edu11uc5yb6z2ehywwt5wcyan9kpjj11e8958ayxl1tghz55g0vzp8kg3otnu9jd31e3z719chdu0cnvdoo09wz14cszgzqgej7ban84njv6huz921lavyp42v2lmx1kyhiqhulfaf0pjgq6ucz',
                channelName: 'h6wc4lwtq4tnr7ntlg66jtvgsbenuujmw0ioqjnvh66luz2ysx9c69bhc8qdew7km9ru9myqqrswtachlql3ed0qdz9yvqkr1vld4ebm2eehy8cm2fop0w118svtbbqkcvdp831q4t5r9uhugojo6cpsiiiajh1d',
                detail: 'Dolor blanditiis ea sint non molestiae impedit quos esse quam. Dolorum nostrum aut quisquam. Nam odit soluta.',
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
                id: '75890c23-62bf-42f6-9d77-b8be4f40ba8d',
                tenantId: 'c94549ab-979a-46c3-9ef1-e32329a8568b',
                tenantCode: 'z2oyw1gd9luz1jqmgbkd49i6tt8ddgmwsnb73ya4t1u710gsjd',
                systemId: 'ca623564-86d5-4ba6-95f7-898ee1649c1f',
                systemName: 'xsk4uuvcgbwa9fprh16i',
                executionId: '654693ad-2c0d-4b4b-a1f7-6e7f3d39d0d8',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 03:41:44',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-29 03:10:59',
                status: 'STOPPED',
                channelHash: 'fqdkpgs3hquus643gwas7s8ang6249o3cg3egprj',
                channelSapId: 'opbe5cghbd5teuqex11ggmjzjxw6qq1ggseskgny3izs1zbnn1',
                channelParty: '2u9n03ldke6v5bdip5q2wewbhgeefw1hbwvl7nhn7vznh015e2xkaleuxy42lw10x8kzvor4a87ssaowat2fi9n9ni8d52npseiwvbimnjthkq8jgsqywnh5m410f6a4spij4gu86guhsnv5q1oz2yqay8pie15v',
                channelComponent: 'p260x080aocl9apiucx6ikocj1npzgfd4s5tt5byi6qwqzm8l9d4b2j7i6qbjkmft54toe9bsfekmtjvtfpbvl53pqilbhro2qo8kb17qz6ynad83au4igj1zmgxj6m1n2ztve5otbeoekkhm3o43bnur0letvoo',
                channelName: '9pa8l9ezbvy784ibs1gfvntwurtu5thi74j9b82ulxabh57yqj83333gj7iexl9f11utedvu8x9fwkzib3vsrbtwx42legp63ogaa3y13g5q143geyqp38tbbkk3ymvlscuhjzdzfekmc3dawmbq1m8w1gb04clt',
                detail: 'Eos id hic animi mollitia quia recusandae. Sapiente ratione atque vero blanditiis nesciunt quibusdam quod itaque repudiandae. Velit tempora itaque veritatis atque dolor aut. Ut voluptatem minus eligendi eaque mollitia sint.',
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
                id: '75890c23-62bf-42f6-9d77-b8be4f40ba8d',
                tenantId: 'c94549ab-979a-46c3-9ef1-e32329a8568b',
                tenantCode: '3znnaxcno6p2s7qv983g4m27ghsll4w4960iaa4b9aqdptl0uv',
                systemId: 'ca623564-86d5-4ba6-95f7-898ee1649c1f',
                systemName: 'xnb1pz3gxnhokfqb3xhc',
                executionId: '654693ad-2c0d-4b4b-a1f7-6e7f3d39d0d8',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 16:11:54',
                executionMonitoringStartAt: '2020-07-29 13:09:44',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'UNREGISTERED',
                channelHash: '87ba4tviljnmg5lt0puyuxn7xgxd5zin8cprt5j2',
                channelSapId: 'xybaeyatf57xhw3pvae9r3qd0i9jchinqu84opbkow612mqt3q',
                channelParty: 'pvi9e23a6t2nu3jf2z9z394dac7d731dock9vn3r78hb2sk8gp1asnrkxa88asdrs0cyzq05p7sg5vzvqqcj6q3jbwi4aohpump4qndei3x6i89sli7cd1rlnk9bk2tpqviyj3iiyeo3q1g1m7ux7hnd4elv74v1',
                channelComponent: '5n3t2na3uav958laqfsfdxh8t04r8tebkcmuqqti4gsv9wuaa3atp4k2e9t9l93v0q9u3nvmd8hjjswnptv8aq6jm8lv3ll7czo9miej2rbsjulpkhghvacudybo2ogys25lmusp2uq44hdprl994d1lgk4of5p8',
                channelName: '13nogt7zkystbh4q0rpyu241fbl1e68fi38pfrtkq7bbf5rhm516h8r9yxtlmrjxggggfdimizq6efoe3eimhxtix66eeg6ayc9hv3ehu9loypp6yylfna925w2pppyze8uqjxiqp6797keomaetvkxflntj6fgi',
                detail: 'Aut voluptatum distinctio est quisquam nesciunt iure temporibus. Est ea numquam aut ullam molestias praesentium et. Magni porro rerum hic.',
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
                id: '75890c23-62bf-42f6-9d77-b8be4f40ba8d',
                tenantId: 'c94549ab-979a-46c3-9ef1-e32329a8568b',
                tenantCode: 'ow07y3bbuzd7dbkib5pil4v1gibgal7e5n1vxjd7kb8ty2s8ee',
                systemId: 'ca623564-86d5-4ba6-95f7-898ee1649c1f',
                systemName: '3drvyldc8l4ao3f6mjg0',
                executionId: '654693ad-2c0d-4b4b-a1f7-6e7f3d39d0d8',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 20:15:25',
                executionMonitoringStartAt: '2020-07-28 14:18:32',
                executionMonitoringEndAt: '2020-07-28 20:01:55',
                status: 'UNREGISTERED',
                channelHash: '8vc9wwlh1271fxdpuae64ca6m0dgpun1ngm8fumj',
                channelSapId: 'flz258f7t5xnsccetegq7ln77y9oxcppo8nntjkrsz7jmr33xo',
                channelParty: 'bn365dmqy84zhzv2957jf7gktnbtn03dunxbz13c93xt9xbimsx8j7sgzepr2dvi6yjvygnhgb9j465jor83qy16bqldfqjdau0jm23obz5x1d59an7ut6w59b6tu3civ8690m1m3082yov4p4s9s0pn3gq3o5hc',
                channelComponent: '9lmzhcnkl2fp7tn64pibrsacanffpysbqu4gq3txjg9b5on5prpoz2chdwelw62dv2rj2ntv9dy1iaj4mi0fo19oalikd7ahf3z0y12vqi5yzyy36mcy717cqizi7pteeiwci9j739ny6p0fg15h8ebsk47t58tg',
                channelName: 'iu5a28lwup6yekc9tmyd4xkdbo30o7evte9pfutbfmkirf898zvj1rw9rihqirozzqf37cj1kgpwcan46cned7v2f6ramx6jd7n44xskxv6mizjckwjdv6lkzsab5da0fwhp19p6bw5jf4h8109u68vwh73qr1kr',
                detail: 'Quis distinctio consequatur quidem eum asperiores sunt nam architecto. Ipsum ducimus omnis pariatur aut voluptates. Hic impedit perspiciatis similique aut error sit ut necessitatibus. Illo molestiae eos voluptas ut est dolor qui eos esse. Et quidem et aperiam esse necessitatibus rerum suscipit et. Est temporibus iure voluptas quia.',
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
                        value   : '75890c23-62bf-42f6-9d77-b8be4f40ba8d'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '75890c23-62bf-42f6-9d77-b8be4f40ba8d'));
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
            .get('/bplus-it-sappi/channel-detail/75890c23-62bf-42f6-9d77-b8be4f40ba8d')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '75890c23-62bf-42f6-9d77-b8be4f40ba8d'));
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
                
                id: 'eb81ed28-1f24-4cb0-b517-deaab9a8d9df',
                tenantId: 'fd767b36-26e6-44bd-a676-c28c949cfece',
                tenantCode: 'ngkip8c1qhwcja7ol82c31ccqor89d5ou9u2wnc356n28ikfmc',
                systemId: 'b5c3a973-0d7a-4aab-ad1c-09a73e7ea8a4',
                systemName: '6zw0ig41qv4j4o9ic8a8',
                executionId: 'edf3e1f2-af89-4b09-9585-78b8e977fcd0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 04:20:11',
                executionMonitoringStartAt: '2020-07-28 23:22:13',
                executionMonitoringEndAt: '2020-07-29 07:14:51',
                status: 'INACTIVE',
                channelHash: 'i5py77srkiiw1v6d0v0iixy6q0vxe7o24r6vao79',
                channelSapId: '2nqc8y1bkrc3m4ak7n7slxitcbah1bcxtp98oz95hoke616x7p',
                channelParty: 'ilktf1ygvzy982jhu5h0gt2bifpp5to6w86muezedhc51gfrrmxwuhll8zkycjy4rz6tq8xsozg8dwzl24wn1ps7pjusmp2y5oev9femz6olvxca7z914h6dbh6le22sunq15t3e8bnybknscffidmhjxa9v9rg0',
                channelComponent: 'am5nznm2jbfq37kp36g7wq1r8if71vxgi0i5vydtufzhtvuq72jedlcc0zx8mem8aaqywbya70j9l7q6mkodxjmq5lri4utqzp7v5hz76uxt6ac7qybr8ilxmh5yzz664ivgavga8hsjjg5gbw3hzmxkoqnb6ghc',
                channelName: '54vb1rwufcarc40rsxjp7509euk1r8eua2fosz4aahm2g4g0c4ycmu959iet0bu1mifgb5fx55zrtbv3s0lmjf50osqft44j13kecqh7rwfjqqn9pk7hbd5f34enu61obagclsifxc0clahilltj3o1q6i28e1ny',
                detail: 'Numquam tempora sit optio harum voluptatem dolorum assumenda sint est. Sed temporibus aspernatur ullam voluptatibus sed cum iste. Ex omnis ab nulla molestias quaerat nesciunt. Cumque adipisci sint excepturi optio. Perspiciatis ut officiis et ut.',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '75890c23-62bf-42f6-9d77-b8be4f40ba8d',
                tenantId: 'c94549ab-979a-46c3-9ef1-e32329a8568b',
                tenantCode: 'azop603ul7p5pjvai3yo232piv0qo4yf723pxxziv0u2516uwn',
                systemId: 'ca623564-86d5-4ba6-95f7-898ee1649c1f',
                systemName: '7u3o9juczne9u19etnqg',
                executionId: '654693ad-2c0d-4b4b-a1f7-6e7f3d39d0d8',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 15:01:29',
                executionMonitoringStartAt: '2020-07-28 21:17:06',
                executionMonitoringEndAt: '2020-07-28 19:03:11',
                status: 'ERROR',
                channelHash: '3l94jesnpv5ova88sxa1eue3z08liidi2k0eyvdy',
                channelSapId: 't8d1oa7esapcpq77pz99rnvtc5jyo3iie4yoopjfezbqde6xl8',
                channelParty: 'anf6c9iu29iqhdy6v416g99wssf634vbzaq7e7qadxgv3w35xoc9vmwbz6v908d0fe8wwmaohj9xtssjsre41ane0b9l4boserb1awuucrjceivmcji4lci5gwtd3ablxssnarm1saui6xuauv93vptvv8lel7zb',
                channelComponent: 'o6e299qpron555rqrzinbu7oyo7fiwhnsvfx5txxyquiujmqh8smx6qf29tobfd1ffd7h6drjolkdl4im6yvh1sguihf8wf0gikib8vvh8z5lfqkydmd4k68jpa8cp7w7munhsjjhl3lzo3nowij51ni4wn3no7p',
                channelName: 'eqvda4x61dxbmzv92u38o6moirh7gkw91e3z9y9il6aivijh1l79aja5cturczf7ohxi1a25vj3if4oxu4mw67ug5b5armyk69t3r3kzqbl3yziduce8c38waj5ifjxpy46sydz9xg1zzsh9gpkiraz8tg7sz8yg',
                detail: 'Doloribus soluta distinctio. Perferendis ab ut dolore nobis. Odio enim maxime nobis eum est. Et sed ut autem ut est at excepturi.',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '75890c23-62bf-42f6-9d77-b8be4f40ba8d'));
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
            .delete('/bplus-it-sappi/channel-detail/75890c23-62bf-42f6-9d77-b8be4f40ba8d')
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
                        id: '5a093435-a654-44b4-ad33-21c7c5c1960b',
                        tenantId: 'c94549ab-979a-46c3-9ef1-e32329a8568b',
                        tenantCode: '9rymgggd5enic80huv15l9w3kn7pc92gwhjaqgwxbn096zzwg7',
                        systemId: 'ca623564-86d5-4ba6-95f7-898ee1649c1f',
                        systemName: 'b1n9b69fgrzauv6dpbgf',
                        executionId: '654693ad-2c0d-4b4b-a1f7-6e7f3d39d0d8',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-29 12:30:40',
                        executionMonitoringStartAt: '2020-07-28 17:00:57',
                        executionMonitoringEndAt: '2020-07-29 08:03:58',
                        status: 'SUCCESSFUL',
                        channelHash: 'y35t5jegtpyoufh34m2vd4w5wnakl7j9vrkxp7bn',
                        channelSapId: '15q1l9vbo3kku6y4kwe5gvsb09xs0uyv955sk0fqj7u3f5o94e',
                        channelParty: '5j1n4c61883wa1b5vn3pasyofwj1u5ycapo1scvt5dju6yogo8xd1gpbf6qa5mrkjmiftjfuwv27oa920g2m2px1lh3d3o6vvfk4n0iszwdz5e5yfbpkt1rei9nl42k2up7r540zwe2wcitl3v1nd3hqqorz05q2',
                        channelComponent: 'a52zgeyk28wdek48kgkxrmo8qvlybfrcojp2tkodhnqnrowp7o5ascibdmo90bd7av6yf0aavb7ft1rj9a4u9lzeflkjgehuzyn5lvahtleorwjkvx6zpo9c7awzcw4mb74yj6ymoq443zwzigm9w4gbdz4pwpt7',
                        channelName: 'oiwp9hr2rhdp1ynqpsnou5i2lcrswn407a2t13blnizl0581dkx2pgv6i5ezv9jkltsbwtihg9xoaeclwezhcijhxyv671akjjkkk7j0dhj1jzcoa9lue29d81hdypqhjfugib2bj7mnhlmf1kai0prgl6r0sqf3',
                        detail: 'Ut dolor porro est iusto soluta. Perspiciatis dolores error ut velit amet doloribus cumque deserunt quaerat. Molestiae voluptates voluptas. Est qui voluptatem qui rerum temporibus.',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannelDetail).toHaveProperty('id', '5a093435-a654-44b4-ad33-21c7c5c1960b');
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
                            value   : '75890c23-62bf-42f6-9d77-b8be4f40ba8d'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelDetail.id).toStrictEqual('75890c23-62bf-42f6-9d77-b8be4f40ba8d');
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
                    id: '75890c23-62bf-42f6-9d77-b8be4f40ba8d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelDetailById.id).toStrictEqual('75890c23-62bf-42f6-9d77-b8be4f40ba8d');
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
                        
                        id: '1f332095-dd81-41cd-80ea-7a1128857b4a',
                        tenantId: '2c932aa5-c6f1-4267-b96e-ce9a41f1392f',
                        tenantCode: 'pankfex8abwz83u5ti8bpr5bde8wpklgq84jmk0lk7vx9t9mzm',
                        systemId: '7350f9a2-70cb-4948-94c5-8c3273417b69',
                        systemName: 'cfyg2lgvbzqq9jn772vv',
                        executionId: '83e76ad5-19a7-4667-b7b8-e0d79d78fb11',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-29 09:12:07',
                        executionMonitoringStartAt: '2020-07-29 09:25:31',
                        executionMonitoringEndAt: '2020-07-29 12:49:07',
                        status: 'UNKNOWN',
                        channelHash: '67r8zrmefibp09vtuolf6hfnmu5yclpz8m6u22jx',
                        channelSapId: '8kl0hb8qmdulvlebuyvmhyg5z0tq2v2l3hcsszhhefkqd867qu',
                        channelParty: 'hslua11mq9nxlzgawbajxocxf5ddy5rbdx2o366p2jcoo1q2e3uttm96ffv3mjn0ycksbon3p2bn0rju6p9a8bumzbimx6fjva0lp8ztetnmwdt54onj3loqx4qwor30l7pp77lpft5hvj3hvcsgsb2yrknx2xmr',
                        channelComponent: '2pl0n4uq4mtmu7m7uq8meimjwbcklknqbg3y818orri2nc2m58xsic03hezefl8ay3p24duik77m0dwnznb17dduwfn5ahh4vxqbtzxo7vokkocjwi3s4638opyf8rntuh95trx7yabky1oprul116mtapu1bs1x',
                        channelName: 'ooovplhcq4fmwxdiqxd7y4ksa93flc3kcs67chrq4nbg3kofr6sbh93ak85j0eiu9yr27nkwkv2u4wnwq82st58thq8ddjoezmhtkbssf50yqpigf1w39pcujyej0g2qugxnzlk8fi5s9mkwdq0lc0fpzb30j2d2',
                        detail: 'Qui nostrum autem non at asperiores sed accusamus quibusdam. Pariatur iste architecto et repudiandae recusandae laboriosam ea facere. Sint delectus sunt voluptatum. Neque voluptatem quisquam in.',
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
                        
                        id: '75890c23-62bf-42f6-9d77-b8be4f40ba8d',
                        tenantId: 'c94549ab-979a-46c3-9ef1-e32329a8568b',
                        tenantCode: 'zhl5a0ed1rlkdvb39l3oxao3jq37dv7sul7bb8quxovhppop11',
                        systemId: 'ca623564-86d5-4ba6-95f7-898ee1649c1f',
                        systemName: 'rhblnlrkbr3b68lnxxxh',
                        executionId: '654693ad-2c0d-4b4b-a1f7-6e7f3d39d0d8',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-28 16:15:09',
                        executionMonitoringStartAt: '2020-07-28 23:15:09',
                        executionMonitoringEndAt: '2020-07-29 09:04:54',
                        status: 'UNKNOWN',
                        channelHash: 'b7c3dfhziimvrdfuxkohpz6sb5mdsuig5kwap2na',
                        channelSapId: 'ax38eyxbs53u8mhgfj73tktkuz9fcuaiju4nosfkfpvduk85fz',
                        channelParty: '2v8ns6f7j59znoe7135l2d6dtgv02mph77n4vyoeyzu0eej86y6z5f9nc11xb568xsjt27y28xgl3fbu0b3dw7d9ky4v7mfmd1qr3vm7gepq8x3zjbc9k5w8cwm912yl00pbecg2xxapqzcf0mq7nlxnk3rquk9y',
                        channelComponent: 'vh8jjzhbxnlyjvuvusr0ke7onfcgwlic1xtsrssmxoq4ztk0x4r0jsgrg9scb0dy4a2r55qht6v7xbn3bxczscz3os3ia1if08vdb2ijmn1jm8ypgzy6gpruiksso4phf5ib40e7tnx9w5acdlk5gu3yewor4941',
                        channelName: '48dib3jkwg9fy0asott9obswdkqr4sd2qdktxk1lfk3uea457he4ckigeejdld8x6i51iygz2qke875l9euytybgzccnq4xg03xeo8f6jelt11s8hlmweeaqx9mqqca17k8xnmcqx2expvluio2chzu5lk90sima',
                        detail: 'Ex quibusdam qui consectetur aliquam cumque repellendus. Natus unde qui vel consequatur molestias voluptatem. Nulla nobis natus quas laborum. Ratione repellendus non rerum dolores veniam omnis.',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannelDetail.id).toStrictEqual('75890c23-62bf-42f6-9d77-b8be4f40ba8d');
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
                    id: '75890c23-62bf-42f6-9d77-b8be4f40ba8d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelDetailById.id).toStrictEqual('75890c23-62bf-42f6-9d77-b8be4f40ba8d');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});