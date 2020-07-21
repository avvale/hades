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
                tenantId: '5b766746-0377-422f-9532-537209df1406',
                systemId: 'f0dfcb1d-30b6-4adc-878c-b25b89bca551',
                systemName: 'knp6pffw3uubrlqd768j',
                executionId: '5cd8a0f8-fe3d-4461-9ad9-b96bfc8bd791',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 08:43:26',
                executionMonitoringStartAt: '2020-07-21 03:07:27',
                executionMonitoringEndAt: '2020-07-21 14:07:06',
                status: 'STOPPED',
                channelId: '86589264-60af-4ace-a380-4c2761014c43',
                channelParty: '2rs4wqciwjno8a8997wppb67o43blhxnyk08jxmet8r39obogwj530bxal2bpq926w4ngcvlswg9saraox8yjg664dcc0d7u5huhs7zn8fqfkeqj4fyed3n6ea6pijyac3fy99fmov24j3ikho4w4fwz3x443y6p',
                channelComponent: 'alp9whk6bcik4fazvg4pk37s99xhv7n5totji8xdzrru2ovuy94g289y3ip0pe7ppnxp1y75w5kzpmvltgcvg1712z6z78t5y94su2tuhdcfd8pql0jd9gjbf7izr1mhfwun99ybxnk9pcmu43lxwmkb9bl1416w',
                channelName: 'myyo1fatgxmyrfkjfy9nx3s555w9dl3o88kcqqkys5x3aqz3spl8yj3al891h71qyh5ckas76ma7ifrd8uc9kzdnxnma3ihhorz77cv5zy9rpvj6pbdtuxytnqgfhxokngewy7mnigsrrpcoyhxyo6yngjelefxd',
                detail: 'Esse sed necessitatibus qui sed reprehenderit. Velit qui et autem magnam. Voluptate voluptate deleniti et distinctio est consequatur deleniti. Omnis aut assumenda sed aut aut dolore consequatur necessitatibus. Dolores est explicabo ipsa qui illo omnis dolorum.',
                example: '55aq3dq53f81fd6v9wkzmc8pxxoinu64fnymhcbk0tf1rn74f50sx7vkfod0udpofoqdq11lj5705ectmsysb3zltmipydwesqkllzyehle2ii12r5wa5otyxsv8ez8byffj2bku9z2ouwb2f9qaz1iod9fuxs3i',
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
                
                tenantId: '5b766746-0377-422f-9532-537209df1406',
                systemId: 'f0dfcb1d-30b6-4adc-878c-b25b89bca551',
                systemName: 'mn08yuvwmj0egqaj3nw6',
                executionId: '5cd8a0f8-fe3d-4461-9ad9-b96bfc8bd791',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 16:03:18',
                executionMonitoringStartAt: '2020-07-21 01:23:18',
                executionMonitoringEndAt: '2020-07-21 06:50:36',
                status: 'SUCCESSFUL',
                channelId: '86589264-60af-4ace-a380-4c2761014c43',
                channelParty: 'ua090m3bpuzmczf7wx6d2hax2me0fqpapxlj04466wpvvvudaa9aszmyvbly8d8trhse5f0l0i3n68hpye8gfficw5wcla08dyn6jbzdrv96goelxgpgbeccf2wp54a3olx4n2r3ulabbisg7tz7v1cv5rhabgjd',
                channelComponent: 'dwtw0gnkuqyij5uvkbq32y1q04pex3wdtswvbfhtgam95odph5v0c8up95xv15xmtx5dxszudtx3n4wvo72dz74ire6jhru69d1r5nai5uedk9hfjukib7r9npv5y5g2pbp4a7c9ilt8yp0y93nsiqt0hx5ztjrp',
                channelName: 'f9wzjik8zvvxx9ohk895seqoken3pbl1te7n89l2l9z1o8ul5avdkh2ne1mm807aftyoyftjmvjspk8gvnqevfso75014oovnrqndmzh15aatdmr7na0e9qctfwohbddi33oflyrtbfdefaw9gy3zkn2zvftqxuy',
                detail: 'Excepturi aut totam voluptas molestiae. Nesciunt doloribus veniam. Nesciunt nulla alias ratione delectus eum sit omnis.',
                example: '9w1glds5mler255xq60g6xpfs7use74k8nvz7pje2e8c6idro9c0tboxuhvnhjpe8rsbk5het5h03q8nbyutyp1atkr97c2j1xq9vivuwsl5cri50a4ujt4ilsvkntr47mi83j8qwh2ak6t04h4kd35fn8wc4110',
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
                id: 'a163e5ab-d7c0-49df-8c47-bbe177d5bc38',
                tenantId: null,
                systemId: 'f0dfcb1d-30b6-4adc-878c-b25b89bca551',
                systemName: 'idjatey8ey4x345grmdp',
                executionId: '5cd8a0f8-fe3d-4461-9ad9-b96bfc8bd791',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 17:03:44',
                executionMonitoringStartAt: '2020-07-22 00:46:26',
                executionMonitoringEndAt: '2020-07-21 04:34:48',
                status: 'SUCCESSFUL',
                channelId: '86589264-60af-4ace-a380-4c2761014c43',
                channelParty: '4xgute9v1fox0qafww3b1zme3s1naig3bxermulo5z1yyodlus8riaij6wxoldm66cx33pks91s5mmmhuya423a1ye2t8czk4thxwecknjjjajgp1l21gkoa4qg4e4vg2yjrqircn7var3e4r577rq8qd57ca3gd',
                channelComponent: '3dj06w7x35jhn5wsxgu0jpetd922gvw2ntmd9pue0vkzyl7jj3pz9vpwl2u4j8q2x5tw0gv2cc8ys5abf01j964umr2vophwdh42p6vuchvkvuxlihtpo1i2invtt1j5ev42345lxowus7indoh0m6b9pjbcs7ks',
                channelName: 'g1n7jokwurx8e3i9s8e8e0v54ve1zna7p08fjsn57byydjb368x7ojyrqbo8xppjvmklprwhxbxsiricvok3didf89aadd90pxz6n9g4lsyifsnx0ewx6nxm255ymc1jv6ms9cz2fj9qgeqgcmbqlmjfj07udzgn',
                detail: 'Quidem rerum harum id dignissimos nulla aut quis qui. Magnam exercitationem voluptates maiores porro illo qui. Quis facere aspernatur vel tenetur ut voluptas est. Pariatur soluta ut iure vel modi minus in doloribus. Vitae distinctio nobis sapiente blanditiis esse harum.',
                example: 'qhyeakfpvr4a0bs4nenqgfs1fitez90cjr01ij7ge0yr7trca2hls2xjsv1a17wawoigyklbfhdhggd7tyv9xtayt8rzefyqtjqd94vdy4jsa6c4sxbz8hw09grnoh0hp2eou6drmnvanp074rgxw7n9cy28oic9',
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
                id: 'a163e5ab-d7c0-49df-8c47-bbe177d5bc38',
                
                systemId: 'f0dfcb1d-30b6-4adc-878c-b25b89bca551',
                systemName: 'k58an3uevldw4k2zum84',
                executionId: '5cd8a0f8-fe3d-4461-9ad9-b96bfc8bd791',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 14:21:15',
                executionMonitoringStartAt: '2020-07-21 20:45:27',
                executionMonitoringEndAt: '2020-07-21 02:23:53',
                status: 'SUCCESSFUL',
                channelId: '86589264-60af-4ace-a380-4c2761014c43',
                channelParty: 'i6siwh9mzpz7ut451usxixanrg4yqbj2w6d963vq9orwgpdswat0z01ts1g48gcfwksy32re3neb2fsl34x09o9unj1161kqaw546s8gqa3i0xv1svs4h8i06bv1ac15pk68o0q7iq5hxdcty40r5n3uacw0k1cu',
                channelComponent: 's3xhf6wn1urjyzmeyrvonjhiobar4fqgaj0f84554ufwl5u55dapxswpr7elax8ak8xwmixnsb2jaz8c1840biclicsyai7za4j9j4bzta3dxnj9mjn6u4q316b5201ilxnb4lbin3ksuj25hc2r4gvzb2bgn94l',
                channelName: 'gpr7dh29v6xlkycc3tj6kt9dfgt3uwvzba89h9fj9ox0m3k0s9kyl5hio2qy8weh21te58fl6byi1znebanzqn42i09u1e3cfakr3af6lrhbr2n4imeqtfc21jek7zmbfzif3wdocfguclg9j4ucap05fwbj3ewg',
                detail: 'Ad sunt consequuntur quis omnis quos. Repellendus aut at. Aut libero aut illo sit molestias nihil omnis id nostrum. Nemo cumque nulla et et qui occaecati incidunt aut consequatur. Saepe magnam vitae debitis minus. Inventore quidem autem maiores pariatur quia assumenda illo eius eos.',
                example: '70gdyfjf2pe4mk31hpui65dmuuva79845ckhqru3dpay0sc487crhdfqy9ku5w8ivtfml0kq6wuxb1j4xfksaad1lpv3a6zeprbpxpinftvrdt8sr2dcbwggtjvd4a32olrblqp01eiapafv0ys5v5hnk9z3ghf4',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a163e5ab-d7c0-49df-8c47-bbe177d5bc38',
                tenantId: '5b766746-0377-422f-9532-537209df1406',
                systemId: null,
                systemName: 'spht8mtm7js19p4c4jty',
                executionId: '5cd8a0f8-fe3d-4461-9ad9-b96bfc8bd791',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 09:36:21',
                executionMonitoringStartAt: '2020-07-21 07:51:26',
                executionMonitoringEndAt: '2020-07-21 19:38:56',
                status: 'STOPPED',
                channelId: '86589264-60af-4ace-a380-4c2761014c43',
                channelParty: '49cuk1za964c5trlah45v9imcl7r70tishbmqe1f0lnoiqxtrvmxvekkh0b63mj5v97beofh282u7uticg4ds5mc527ltx4ferk8bh38ibgfxvayhj1urv0np3h34tkjra7sh0hr70eu1fjy3p74j7qyxl14yxk6',
                channelComponent: 'caus5evyxnz2d8yls9k0j4stnunmf3ulesysdd7n8nbo9164ryy9g4x2o5jsa8ljt1t70ldtcqf8qddjxiamd34bxgfz7wi4ex1zs4ul41117sq5zr8kthzaaytx0f9uy80f30r9wbdow1hrod67ddwxbg7avvck',
                channelName: '2ks066k54fxzqqgib4vqcb5uc3vf15mga7hmokv7qk8r5kv6wdrzultppggvbge0zvkz1gir63llq2zcbtbzbswcyz72az3l8272onx838nu6wmm9wpqt54njwl34xty8o3rxwszn5w7gvww63wzbvzymnnih1nt',
                detail: 'Voluptatem maxime repellat aliquid dolores aut nesciunt dolor architecto accusamus. Ratione qui est cupiditate. Aut at accusantium saepe accusantium. Nam deleniti alias et.',
                example: 'ljpj7w2azoowoiaqgko0rbii8xe8cgus2quy3v26uhy38ljszkn7njcxvrwecaq77o3xgbk9s6bu9fqo6cvon4qnvrixeyhrjd3rm7t4v6rbhqmazpse3mxat1q7sqkhmop4a7nvtkzr5iin8whnivz8y8ui7fvh',
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
                id: 'a163e5ab-d7c0-49df-8c47-bbe177d5bc38',
                tenantId: '5b766746-0377-422f-9532-537209df1406',
                
                systemName: '31owacrgr8mnd6t3tpi2',
                executionId: '5cd8a0f8-fe3d-4461-9ad9-b96bfc8bd791',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 08:51:53',
                executionMonitoringStartAt: '2020-07-21 02:54:13',
                executionMonitoringEndAt: '2020-07-21 07:12:11',
                status: 'INACTIVE',
                channelId: '86589264-60af-4ace-a380-4c2761014c43',
                channelParty: 'lpea5e3awhd98vpj3ppehyypeqbgkc0weqy9fcq0f6o4dyryoskv414k72pj18bqbantfe1y74vq8yqd8swiw1mfgtoj2qcxsgo4wh7ghl3bc98rmgarlfkfd1dqzkb34kpgncvptkn8zzpebmn4od15000rbj4k',
                channelComponent: 'au5h7cwnf88jpeb70z9ijaufvrx4xd2wzvsbufpozmv78cooa5c2mkre19mbuc3fex5i0fza9tknbc5dqtk1gmhue5yocgujotk33iw8uc96tlw2fjet1ottahxfxelp6p04cirlf7say3k0didm5i0qoje51otj',
                channelName: 'fyazkm9ja85vcklg9dkuv3gxypoydmezp11kx6kw14g43o3rswd9ow5u1iru7dkucnraw85d34b88lyhsyqfp9plrfzmkdagz2z0s6ze8740lcgqemifz46tavf34qwdet6qxw5jgyylh1l0zh0cnbyi3g9tguly',
                detail: 'Quia dolorum quae eum voluptas velit quo incidunt quidem. Et soluta magni voluptatem repellat. Quibusdam sit veniam voluptatem voluptatem qui dolorem. Harum est magni deleniti eaque rerum excepturi odio aut. Iure esse est ducimus voluptas minima non iure molestiae quam.',
                example: 'xh9qh37azsxbnivp53a970kz3jafa7wfuu6rphkesyebcsqo9oaa9alcj6o8idsfs2gvcbt6z4rtl0cbvgl1zgevq0josdkanumddy034xfs8o6oyamyzgwuzxup2k0swu6rxpo0hbq10l2sjm98hgjupa5x3ttu',
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
                id: 'a163e5ab-d7c0-49df-8c47-bbe177d5bc38',
                tenantId: '5b766746-0377-422f-9532-537209df1406',
                systemId: 'f0dfcb1d-30b6-4adc-878c-b25b89bca551',
                systemName: null,
                executionId: '5cd8a0f8-fe3d-4461-9ad9-b96bfc8bd791',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 22:08:01',
                executionMonitoringStartAt: '2020-07-21 17:22:36',
                executionMonitoringEndAt: '2020-07-21 01:42:43',
                status: 'UNKNOWN',
                channelId: '86589264-60af-4ace-a380-4c2761014c43',
                channelParty: 'z3nda7cv9wl0gygwdcsyr6njoll17vfhbmnfhi5500767s45nu9f2gepjeh4ny2bzfzuap33nfgiv9xboso1xasjwu4waat88danavkjshh5i3z03wj0dc10ziz3ph0laargui8mdtztocduug7ry1kwk73nnb83',
                channelComponent: 'q881frst8kwtg6bv8q828bt21jb7qn1rvrerchvb9h83grap7h9qnm6xpg2bnfafc3tcj1pyn6yeps4uhuk8kle5xbkl4khjosbb63uc16d31ewai8ryox9wggbeplltyhdhwvg0uqjh5savv7bryafqv8f12yj1',
                channelName: '27n6wle6s2taj814yeo08nmaekib8mnpubocibcefzaybw32xwsffi31zv1mgpw36tywaf16shdqk4gtf61mm3a56jejyulx85pvs1x1vlrucx9gzs5btcp81f4ew6cfzpmviuolug3mhns38d8u27rnnoknkohu',
                detail: 'Nisi quo quo ut error vel. Labore facilis aspernatur quibusdam voluptatem iure ipsam fuga ex. Autem consequuntur facere harum similique corrupti perspiciatis eius. Beatae sint voluptas sapiente officiis temporibus nobis est sed.',
                example: 'mfo1b5vldn3lxeibjcnl4cm5tp72xqk8ix6bvrmriy56a11gc2wexnfqjhykpejwrmvygdh2bmiawp8ssgkl417nihfl5npmov9fqaq3tikcqo9j4n2zfgsfdo8ceab79a0m4joy8j1n3v7zj8x9a4jttmhk6olb',
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
                id: 'a163e5ab-d7c0-49df-8c47-bbe177d5bc38',
                tenantId: '5b766746-0377-422f-9532-537209df1406',
                systemId: 'f0dfcb1d-30b6-4adc-878c-b25b89bca551',
                
                executionId: '5cd8a0f8-fe3d-4461-9ad9-b96bfc8bd791',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 02:07:06',
                executionMonitoringStartAt: '2020-07-21 13:56:53',
                executionMonitoringEndAt: '2020-07-21 15:54:45',
                status: 'INACTIVE',
                channelId: '86589264-60af-4ace-a380-4c2761014c43',
                channelParty: '65mpjdt1159y32fhz000pk4vqqly9vs9p6heuimbbvxriserxil6wofvio0d26btwoipuspggj3ryf5u6q9bhy0oravhg37d5hnwv4qwnkg6el52s8a55pau1cmdrljld5g6wu1qqugspz387xp1fezjk12be0aj',
                channelComponent: 'ts5ugpx0ni8axwjb23jz1fbt1ee5yn9i1x85qo1sxr5w0ydgenb91vm6gcm08kv0br557wo9kekx7ztb0e6vsivwmmpkh55rduvgij4kn0li7qt26hxc45jxazihoqumabgq1avntqsyxldo9kssyujqem8h27mr',
                channelName: '95ksp48baukvnqtjb2vetwknqznm8z1dc1yp5aiwqij3o7ufmqv4oclbcmt8t8ejzihiou6b49g934mdfhysz3mmza7t0amircjj5nexmslwlywmkj1fnj6l56he69xxari48c16eflsv68ex8cn7osr8fnxgck1',
                detail: 'Maiores non non odit. Repellat voluptates voluptas sunt cumque aut omnis. Et mollitia quia sit temporibus distinctio exercitationem architecto est.',
                example: '8lc9nl48hgxj7ly4wu3tk42s85xs7oayau5y9mkp38q9rmgzzp8cbsgav3fynsppo7lw6cflmktf1r9ocsvk68okakmtns6ge34b0ktds3paspv2b18h02hbvvr9zcowdcw0smqh8w3u255mclu91ew15rm23yul',
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
                id: 'a163e5ab-d7c0-49df-8c47-bbe177d5bc38',
                tenantId: '5b766746-0377-422f-9532-537209df1406',
                systemId: 'f0dfcb1d-30b6-4adc-878c-b25b89bca551',
                systemName: 'v9qnmcm8lq72wwjsq118',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-22 00:21:55',
                executionMonitoringStartAt: '2020-07-21 03:42:45',
                executionMonitoringEndAt: '2020-07-21 09:33:17',
                status: 'ERROR',
                channelId: '86589264-60af-4ace-a380-4c2761014c43',
                channelParty: 'iotge3yqtrfhjqrxzgj3m003mf76gcyfnrnq604qgkkh42dsm6qgjnnf3yxb6tlu4lgup0mi81mi5k2d7zqhq1zs7vxcw1vvslp113q4ocqm10zyt8sz3tu2c7yk4emnni1kzrwzp2b3dgvce0memxsunvgafy4t',
                channelComponent: 'f305qhdcyh7uqguvslqv0hi0o7isshd7d2qgrlpioh80h1hkehce6ny2j8unl8ur6bu1ntcd7liockpmrqvpzt6cjdf3as7geyme1uvtwo25ils13grk6vv1ylgtejp1p8e8fboyownsp14tfqqzgxxl1g789nqm',
                channelName: 'ubkwrwqhbrti45ys25x3jddewnho81my41uxqhdbd6ztv0sx1q1d5z126c5ntebqagivzvl5kg2qmjdfenm3ouvdvxlubbapwsg87zhp6823k7wzw5xredzpry8hle4ddr0zgd7pse67qf64ptovz1jhvr4djv1r',
                detail: 'Expedita ducimus enim sapiente aut impedit dolor eius commodi ex. Quisquam saepe non quas. Saepe labore accusantium aut. Necessitatibus nisi aliquid culpa laboriosam sapiente voluptatem ea. Odit officia et fugit consequatur delectus doloremque quam.',
                example: 'h84u3m9l7hyuv4pqcux6bbs894oz2tzxjj1ytsw9pkaygsv95j6lumqfixbdkqhh53fklvofpmki4a7sx8q44s99cd9cbn09ggpzq3n7xdmlzzew1v217odvzv4m638jqzvsqksbwrlsz1tsbcrqqrp2epkw8dke',
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
                id: 'a163e5ab-d7c0-49df-8c47-bbe177d5bc38',
                tenantId: '5b766746-0377-422f-9532-537209df1406',
                systemId: 'f0dfcb1d-30b6-4adc-878c-b25b89bca551',
                systemName: 'h7b7ktt1zth8wakga1dh',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 05:32:00',
                executionMonitoringStartAt: '2020-07-21 05:24:43',
                executionMonitoringEndAt: '2020-07-21 20:20:00',
                status: 'ERROR',
                channelId: '86589264-60af-4ace-a380-4c2761014c43',
                channelParty: 'l93vnpdy9l0cdjmwkhzgf4sdzi7rg1vwozpg49iyxgsbshdnlfzf5tslw1ear3mv51brjh0zjwtopiwl9l3viu6gj6b6lypz7g4hxcyhfhpz52kfz4ydnj3w4qlqetcmhnrdp4nvtbqesxuxn9uddvf6irc4cozs',
                channelComponent: 'lx7i6eqyii815equ6rnkgc9s9de9a0h6rvy1zjeu9wm01ng3ojakaffmkyhda1j8m0pzou6rfhyz2vi1yzi6efwms4mmbnlrjubgtzxkrir1s6pkzpri2m6i7fm04lg514mzdoli67nzmgjqt5mrhl0e30pgow9a',
                channelName: 'zqmtodjvz4zvzdgt1kksj3hheuh9bspb54cd0uxmec5sdmu2xn2e2abar2chqh0tf51j6528rpa42r6jmic9yull4kkyy4wrvq252d38nab9gwkbmkmvjqfh34tz5nmm1wplktjgum3wbstqpwe4nl70o0ushagb',
                detail: 'Omnis qui dolores ab ipsa autem dolor aspernatur tenetur dolor. Voluptatem culpa neque corporis quia autem et architecto. Eaque voluptas quasi qui quis debitis. Doloribus voluptate nostrum perferendis quam. Illum nemo optio qui. Nesciunt omnis fugiat.',
                example: '8pverrxk68fl5e5htjqkumh8ib884hidga3tamias9rggmurhz7mhyk5t34hdcs57ekp1eml6irwlenq1ietse86spd8lu7ujpbpx0h4fobtn59rs8knc8k4zgc01ayq8uhg4m4do9h80ha4ya5gxhb2dgvjnjsi',
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
                id: 'a163e5ab-d7c0-49df-8c47-bbe177d5bc38',
                tenantId: '5b766746-0377-422f-9532-537209df1406',
                systemId: 'f0dfcb1d-30b6-4adc-878c-b25b89bca551',
                systemName: 'uzv5od9a8mdnaj31txj9',
                executionId: '5cd8a0f8-fe3d-4461-9ad9-b96bfc8bd791',
                executionType: null,
                executionExecutedAt: '2020-07-21 21:28:58',
                executionMonitoringStartAt: '2020-07-21 22:32:38',
                executionMonitoringEndAt: '2020-07-21 02:33:30',
                status: 'UNKNOWN',
                channelId: '86589264-60af-4ace-a380-4c2761014c43',
                channelParty: 'ddwjw54e0szya0ji7ss4rlo8yizuxfavi5l7x7c7dg98j7icm7jeyqkifl185l8z7ri2g99d991ybsoj59zqfteb8h0emrbvjcufzjmq0rt0y2ranccnp2stbh9tr8uquqg7zl6kr9zz8a3egfv9wwzoallpta11',
                channelComponent: 'g3delhm8kpvtpuh72qfzjze05l2jvh8rytrzzmbgg3hqeygg5th8h2dx7onxbdzpxl4qarot70m6safus124alv181nts717a0xi05yp5kqolbllkfm2twrx8y9bnwxlh291dow5ze63km8fk7z5and5ivvvl8dk',
                channelName: 'sse4p3kclaojdmseoy6y75eciubk6og3cfogr4aoybymdhnrpvd0dcz8cjm9f2txnhd0kqr60hxbl096xw8wh1e9yhrr3ajodm2diroa92xy7goieabkkabosjd9rdc9o49zsr701ulunzvrqukfwpsauyyonbs9',
                detail: 'Ullam qui voluptatum aperiam est voluptatibus aliquam. Eum aut eum perferendis. Eos dolorum incidunt sit quo omnis sit tempore quo eaque. Nostrum ad consequatur alias quis voluptas rerum officia amet.',
                example: 'ejvdx0jjx8x3jb3bxgedcm81hl3i2hyrt91aznbrr3syjf57m1blenj8b14oa3pueele4lmy1jxrdz79sait1ekuyq2qc1eu0fuiq8ir5ose0m74mrwpvxagm84wkm1d5ny8gbq0glxbuj40898c1rq2sxfpyppb',
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
                id: 'a163e5ab-d7c0-49df-8c47-bbe177d5bc38',
                tenantId: '5b766746-0377-422f-9532-537209df1406',
                systemId: 'f0dfcb1d-30b6-4adc-878c-b25b89bca551',
                systemName: '8ermpji0kh2wdpbitcgg',
                executionId: '5cd8a0f8-fe3d-4461-9ad9-b96bfc8bd791',
                
                executionExecutedAt: '2020-07-21 07:07:05',
                executionMonitoringStartAt: '2020-07-21 03:28:59',
                executionMonitoringEndAt: '2020-07-21 21:19:58',
                status: 'STOPPED',
                channelId: '86589264-60af-4ace-a380-4c2761014c43',
                channelParty: 'dtl1am5zufdudzetwwwrfpcgp4rfgvupt1y6h8mlc72gqznmc3dr8rno0ky0ekgzshvt1a4p5xjqw9h9gz5oclah7qrwqpaa27iy9gctp3me3gft48fvj6v2hjeon0devtkdaiuhy5lnu7vhc5ih8fpeydunf8iy',
                channelComponent: 'jkbrbr2fd51bv3zb9wklx3899epc1ameq7945m3qd029rkmrueoztheblthwx0dhf9bebdl7xrbzuqjmikncqcl0gceigo6vhnt3bcz4g523iu85p8yhwy0q9p7ylufgd2nz2aprkbovsbcperj1h0eoltfo91n6',
                channelName: 'jxpxxtysxptnm3jfo4he4gw8dmy4s1b28h2dhnn9swxiv4s3j1kyk36n0f9v0x39rggfncrovgd34nzf9tkzgw5eyx9i25c03aelbt9e9o7f6to4g8tyj7zbh9ryxmkuesnv9pe30pfc2b78soa372fljh1p3ohl',
                detail: 'Eveniet consequatur possimus hic et ea modi dolor. Rerum quisquam consequuntur distinctio error quia praesentium voluptate est quasi. Mollitia est dolorem quos maxime amet fuga. Vel necessitatibus provident aut placeat inventore modi et aut. Omnis quaerat et dicta incidunt magnam aut quo rerum quia. Non tempora aspernatur aut accusamus beatae nihil enim officia tenetur.',
                example: 'j1xvxz5jpq4eub76hejfx18h229pwsfieypjesk9zzc39ene76mnaoxhj2nmvb4xg7rjvlfp1vgdusjunbd5x2sb1sewig8rqsj3psrkxoyyok5ddirpeqw6t21blfdhbq206j2sptk2jhxiyfxv5ubbpj58odkp',
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
                id: 'a163e5ab-d7c0-49df-8c47-bbe177d5bc38',
                tenantId: '5b766746-0377-422f-9532-537209df1406',
                systemId: 'f0dfcb1d-30b6-4adc-878c-b25b89bca551',
                systemName: 'hjg1xd3skhg8c5p72wja',
                executionId: '5cd8a0f8-fe3d-4461-9ad9-b96bfc8bd791',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-21 14:27:59',
                executionMonitoringEndAt: '2020-07-21 09:30:08',
                status: 'SUCCESSFUL',
                channelId: '86589264-60af-4ace-a380-4c2761014c43',
                channelParty: 'blooagidlf7mxkwlirkpaxhh0wkldvv4zyz6qik3852lzhxzegc7pbt5dg7g7gzl80ooon2lwcdmu9dcxgc2b2ryke8r9q610hbtx1y09ggls8q7c4calfehtvc58i1zt43ytwwsmt0f2aqsnrxy980wsbhlc1km',
                channelComponent: 'uq6vf56u09uew6hmhabev39l2wihqp69kl03gx2xkkxghilgkh3e989hxfcwd6z1kzjcuwanx5xmpdp4m9lig3c9jqcmxjpzhasikafql3gh20yiz6p7y2tpa2lu9t6ojufuebxam5j3vc1lay2y570metj1fy3n',
                channelName: 'v8kgyjo1yld6rkw9gpbim2jii9p96n1f3div9qnliivcjwb824015czs07lbz3zvi02pprnnrqzlws62miv6esyj8eemv89ykmxccx3e1rkdl5vavb81rluse48lajpe5uq2livqha6bhmsyln1rznwt1s2nv27n',
                detail: 'Corporis nemo doloribus quaerat dolores corrupti quos excepturi et quibusdam. Dignissimos aut ut nihil excepturi facere porro. Assumenda ducimus voluptatem dignissimos fugiat rerum laborum enim quia. Facere vitae qui odit facilis dolores odio delectus eos. Officiis tenetur consectetur.',
                example: 'gnm3sf54qzq0u14udrhwxwv9d3pnesdew415i865q5bi2nsodaq0246r0zlel81a5eohv038mh7exz762s9r87voumoebqzp6agddftx04wwbtroklr8twi938qxk1tudlh2d2wlagro5wdgod09cmodizdx8qcr',
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
                id: 'a163e5ab-d7c0-49df-8c47-bbe177d5bc38',
                tenantId: '5b766746-0377-422f-9532-537209df1406',
                systemId: 'f0dfcb1d-30b6-4adc-878c-b25b89bca551',
                systemName: 'fuzb5enurbd7evzf8saa',
                executionId: '5cd8a0f8-fe3d-4461-9ad9-b96bfc8bd791',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-07-21 23:15:26',
                executionMonitoringEndAt: '2020-07-21 21:03:36',
                status: 'UNREGISTERED',
                channelId: '86589264-60af-4ace-a380-4c2761014c43',
                channelParty: '51a8hpfwhr5x9uezmp2kobc67n87aa7z4idpbiv56fpby54z0fn8qj3kdoxg8a9i1tpvs1ygr8gzeb1coumy67awwj64f4irdfqgykf6e2gu2m2bbe6ptfikj26efr3tytsqyy4i37pp2qiscjwqwr4zs1sbcamp',
                channelComponent: 'idfovg40nv413p24d7zpk98bbg5sa5yt9m960huzxmq3dkkkt6gm5x2w2x1ehmshswio417xtu1ycwshv8hyev6izy535795inrlu22sa5zyh4h5ycf57iqvh2qu0ul5jo6gywqlicidywekfjpqhu3xz5ddswsx',
                channelName: 'mkj4zrml5s3t62q58izsl7p2ukuadrfvw58sm0zl89kq84k21jm28jmxk5z4xhsvqhbxatimkl9c02qt0q0tijplx6inpeypmxynt9kp48k640htagp6by4737mfdrknhm8xib6xe4zrqymyqf9qusyq5xhtvqeh',
                detail: 'Dolorum temporibus dolor id in distinctio. Ut illum assumenda cumque at quo aut. Rerum ad saepe occaecati sint et amet repudiandae saepe. Facilis itaque et officia voluptates illo ducimus animi.',
                example: '2nyrsmmoi2ub6p046jp34kr97114m7gjnl3sdesf786yvpzhop2ogjdyl422n9dlncynhdyeiddqt8w3hzcr2sfezl25jgzyj4ry7sd509b841ttb9tl3j4s17ar9kt0qobo7wzteq0923ozm3jq0uxkuqkk9bck',
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
                id: 'a163e5ab-d7c0-49df-8c47-bbe177d5bc38',
                tenantId: '5b766746-0377-422f-9532-537209df1406',
                systemId: 'f0dfcb1d-30b6-4adc-878c-b25b89bca551',
                systemName: 'h1ocnfdyn20wh9905i83',
                executionId: '5cd8a0f8-fe3d-4461-9ad9-b96bfc8bd791',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 12:27:46',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-21 07:47:32',
                status: 'UNKNOWN',
                channelId: '86589264-60af-4ace-a380-4c2761014c43',
                channelParty: '1x6nbn1xojja4ps52wtte9du89gnyvr0jetixryirarn3ng3sx7h7nlcvs14r0p45vgw7jkuy0g4a8q5wntaoqgykbnu53xbbzhqz51qotzuun7jk7z21s4nbtn1f7ghw9cckz4f4g5ig7fnxvhq8aw3xfseabi2',
                channelComponent: 'zodsim13730mfbzjql35uk5z1j4mikjgwry8k47k5y3mlcs4zap01q0dfrlmg5o4xj5lv9eylpmdknxrd3udxsey1amef0vtjyqmpxa4hc9xu1bjqb2royyhdr05dh8bo8n4iz2oab4to6hx3qkibwzz4cl3i5mm',
                channelName: 'myetwu9qfnv97fpr90ka14xribgeg4cxsobplzo62ag32tq0jywid1kwydjb9ole433rflhr2041g204ul6k6g888yilao36xxb3og2y7es5ibt6srba9yvcabk1rf5uydbsb5u8v2x4bqfrahdnnhfqxzq89w8h',
                detail: 'Non corrupti distinctio enim quia perspiciatis ipsam eius. Qui ratione et aliquam et. Quasi dignissimos magnam qui. Expedita expedita doloremque ullam vel doloremque asperiores eaque.',
                example: 'uixk0g3tq4kxn25i5usl7679ybeyaznu73oob6ng3vcvcusy6rzjebeueepc38pjwilqedy0rbxfqn9a69lui04824kbaaykk5figg29gweibrsmd2yjncv5lke2co0480r71gdhu4c9ymbq5jayoqs4n9zuelr4',
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
                id: 'a163e5ab-d7c0-49df-8c47-bbe177d5bc38',
                tenantId: '5b766746-0377-422f-9532-537209df1406',
                systemId: 'f0dfcb1d-30b6-4adc-878c-b25b89bca551',
                systemName: '056scge0yt20xlb8y94d',
                executionId: '5cd8a0f8-fe3d-4461-9ad9-b96bfc8bd791',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 05:53:55',
                
                executionMonitoringEndAt: '2020-07-21 21:19:21',
                status: 'STOPPED',
                channelId: '86589264-60af-4ace-a380-4c2761014c43',
                channelParty: '0n72uifc88lix2ro9rf9ilewsk09r450r6ugvwy6mqf9ivmumiqousb7l4ohlpzt9y6a3in56gq7wmkj7x62vnj6vogokt8v91t2oecq3exyq55xxylid9nvsparu519jem3rqeuducgac3cojn2jmliczp2crhn',
                channelComponent: 's6uefqitnd8jj7qpzi1f7yomrzxdjxxt1fjitmajx3px2ej5gjuz5niy74rl6mrhilt0d4275727nniskk42r8suyucd0mbamln5ike84h7gh3zj87bgbz9seomfv054gocc5lb63nmfb7tj7k2pys9c0ar27o7h',
                channelName: 'nafot33kxejfpyl0lr7threhlcensgnudbpkz2p90hrbgp5cwjz9ju3kw8bcdu35mz2j9pll1t0aek217sfdh8m44spac5z3gav0ok09b1clmf6a71c93khzkglrk7et2t1ljav7c5he67y0go5poyld5nggnaa1',
                detail: 'Eveniet quidem molestiae sapiente. Sed ea et. Nisi est rerum necessitatibus eligendi.',
                example: 'uaxutz9uweuz2mmd0rmo8xwnuuvg4067zqpaala3g922vw3jagkki9v949bdmcih5f01azcf3gde27sejvax6jsoonql09yhw0g0ame50l78v9mzklflm7b60ia2ng2fw6njiujkb0h44ryn2v5ulxagmanwr782',
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
                id: 'a163e5ab-d7c0-49df-8c47-bbe177d5bc38',
                tenantId: '5b766746-0377-422f-9532-537209df1406',
                systemId: 'f0dfcb1d-30b6-4adc-878c-b25b89bca551',
                systemName: 'lf4olt95ui7jqeog3y27',
                executionId: '5cd8a0f8-fe3d-4461-9ad9-b96bfc8bd791',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 07:46:19',
                executionMonitoringStartAt: '2020-07-21 17:23:23',
                executionMonitoringEndAt: null,
                status: 'UNKNOWN',
                channelId: '86589264-60af-4ace-a380-4c2761014c43',
                channelParty: 'trly7l2jzcbdcszzo7rtv0sthiihk06xb2eena2yu0pr400wjd48pf73tsotqofk1cs9zyz302b76dve892bhag2140ma6vjlefk45u4xicb4wajpijprphh7dsrqax5p0c65t7svbr4az5uvgqse22wkkvyq6gt',
                channelComponent: 'hz6njci0vgbrbr1rnd2yk0kv5mnkhqe8g7uqrqb2hucom813uzooms3e3lm0b2douj43boserlihve2iy94ax0id45o4kfn3zuap4rbq6sv9cm6xrk71705r47p24capwc56d9vqvq10osl4u1irxe041fziw0lq',
                channelName: 'rxtifcshivlyel00us4fih9im2hbr9pywjejuzjf8x9ql89367t239aceatkf928velxa231xbxtl657bgdb23gjwmhw0rv28w50ib8zgy4ktod3bv00o8ihxe4yeakfgnslpamohn7dju5u2yhb9yxtzf843azm',
                detail: 'Temporibus dignissimos inventore in quis asperiores iste aliquid. Autem dolorem sapiente. Blanditiis non porro non corrupti.',
                example: 'tpdc46vcs8eutp16kgq5xmpjh7uk846bqhspel00zhet09slieoxegbiby4hy2i1b93uai4zq4clb40uaq2xd61c843f6f0a6zy4t11lyutcxiax72udm59txozvzqtm4n9unzfz9dyrmh2ce0y2b9lt13it5dmx',
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
                id: 'a163e5ab-d7c0-49df-8c47-bbe177d5bc38',
                tenantId: '5b766746-0377-422f-9532-537209df1406',
                systemId: 'f0dfcb1d-30b6-4adc-878c-b25b89bca551',
                systemName: 'br73tcw4k9usyeee06sg',
                executionId: '5cd8a0f8-fe3d-4461-9ad9-b96bfc8bd791',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 23:52:43',
                executionMonitoringStartAt: '2020-07-21 07:29:54',
                
                status: 'STOPPED',
                channelId: '86589264-60af-4ace-a380-4c2761014c43',
                channelParty: 'rdqch984ma09f9mpri5gmjuu67khg9wr3au0168szf9kduz74htgy93igvf253ls3q2yoibcakatwx1v48vaaccbnkvio0rlprkqxdpx1gvlt10i412v4nz7iuu1jscj425jm557axlp1p2tdgcu279szw9kipci',
                channelComponent: 'bwqgnxwk5a86hx3ecfs29eb7panhi1eh2ar2ulxhatosggs8zk10i82f3ljidh8e4a2nhp92xupke1crcfcabimui27knbyxw3w4idura3lfltnc0277y4l37cqlma78piw25shrryrm3qdjrrdhmgfarwb9033v',
                channelName: 'vmu6c2e8s60dxtftctb9swrrow1tons7jjf55wu5ig05vvwz7p26pfp3h9tcd0y499e0xscou9ojmqwncjyjbjuenu6su748hrjp8c32pfykfs7drnonld4rkuayy42829xzswv1s8htm1luenms1nr8x0wwt5qc',
                detail: 'Corporis nemo ut enim quae aut velit. Quisquam iusto aut adipisci id ut aspernatur. Eligendi numquam est. Expedita modi exercitationem ea quia quia. Ipsum amet et cupiditate quasi aliquid aut tenetur in minus. Accusamus ut non cumque.',
                example: 'nwx891vyhzhgs6gfwvixiv6ootjfaych7q8v7jwwsgyo3eyoz7q581d5whv9hqngkh45l42oz456r319816xku1am7hnl1wfhrfauqxys3igx88b237co14f74jcv3j67sm6ca1lx4iju7w3lxtpe5zx45i1yc3s',
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
                id: 'a163e5ab-d7c0-49df-8c47-bbe177d5bc38',
                tenantId: '5b766746-0377-422f-9532-537209df1406',
                systemId: 'f0dfcb1d-30b6-4adc-878c-b25b89bca551',
                systemName: '3qnjrzj56hlmrgpvn3b0',
                executionId: '5cd8a0f8-fe3d-4461-9ad9-b96bfc8bd791',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 02:21:20',
                executionMonitoringStartAt: '2020-07-21 12:28:20',
                executionMonitoringEndAt: '2020-07-21 21:38:28',
                status: null,
                channelId: '86589264-60af-4ace-a380-4c2761014c43',
                channelParty: 'ymfqesnqe8i58qzu0f5w7993uxyh6aookyrruu2cyykp8w000ebvgrple68yuzyrot1zro5lke8eqt2ca25x8sqy7uqt2jkmfp47oexvuvie9mdii6bg2qfwp5pom2eur3opomgn076o0yh62sajlwkdl8rokch5',
                channelComponent: 'tjnm8qnmlsgh64ou8e01kqtkdzuartdn4og9w5bxyaqwockb2wu3wwaebd7kg5rrel1l09yz9wys36v6rqn2aivqxnrvb463qab7h2km6bzzqy4t0yfi74jqmcs0aboxfp2kwxxo23n328p0z6fykmbblhtvzf6b',
                channelName: 'yembte8nh3ki67641xmky0wpav6d4gg6xev5l6isyp87jat5f3hexmkitiodx3f95k3b3aftqn7qdb8alwnwnuzxxcqh0vby0h5cxbhk5gef95fh6prxvxrpa5kuicsnv5zsnrmy2ooa5h7odgjp099h91q89zpp',
                detail: 'Error iure debitis sit. Vero dolorum sed. Commodi enim qui quibusdam neque unde cumque deleniti necessitatibus deleniti.',
                example: 'ynov7h3vbknu6qlwxx3kexmiddzb2ps8howsk51e76ncydlnwfc89fqe1upi5ztebbfkiwcc2f5akhic79168c3p2kfml7t5me63sae3r69kutroiazom4rc1tjk2z71lemcvkjgkx04w1gjgzc5ni075gk78blu',
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
                id: 'a163e5ab-d7c0-49df-8c47-bbe177d5bc38',
                tenantId: '5b766746-0377-422f-9532-537209df1406',
                systemId: 'f0dfcb1d-30b6-4adc-878c-b25b89bca551',
                systemName: 'cjsoj6ooc0nwyxp15ud6',
                executionId: '5cd8a0f8-fe3d-4461-9ad9-b96bfc8bd791',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 07:04:28',
                executionMonitoringStartAt: '2020-07-21 09:44:56',
                executionMonitoringEndAt: '2020-07-21 22:38:53',
                
                channelId: '86589264-60af-4ace-a380-4c2761014c43',
                channelParty: '9wmr8dj49fdkg45spqv1pwvo9m01yr02eun6v63n5smer1gz4rx1s2iz8qn0diy6131zy37h4kj81nt6a305ra6g3x3rhtyco79fqzq8y5fr5vr6r87khzf5o6avh45lb83safmcbxghej4jmzvtaany92irnuw9',
                channelComponent: 'xq7rangbxo15xha8enkzswbko9f4wyd75wj9w02nh8l5n0mberwq5jlj8kkf5j6t845z2bziuwazburuky1ftb4brg7tiy6bu33gqlr5ttuzrre8y4tb64dlrhzhfxf2ti1lge586bomv6yz9iap5u9pvivmygl7',
                channelName: '6qrvrw40szxwobi51ghdxh8id5lnjtsg03fe9kbid91wzsmxw0s1en1w9geiey7uch6xmf8cj8lae1knthj6f3fahthh9vlhcjj6mbcmu1eqt1ej73ohn7w2dvwc7rta8i2uzlex7t0dboe68sdcx21ilybae75u',
                detail: 'Et neque quia sunt autem atque modi vitae vel. Laboriosam quod voluptatem odit repudiandae. Accusamus nihil rem reprehenderit assumenda quis. Quis est est. Deserunt dolorem consequatur voluptates perferendis aut. Molestiae laboriosam rerum sint id.',
                example: '0q1xxqg40qs0huqfcan7ova9cbs7mqtip6t2kigrnejwmg478wu6zcx1dlih3ox59xe5jgq9jxy74u4pzebtimrktpaejlbmcuopit51t8m3fr8jyxotausokxinldxpvss796b9bvelz0yfist95uqrxmsaafgk',
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
                id: 'a163e5ab-d7c0-49df-8c47-bbe177d5bc38',
                tenantId: '5b766746-0377-422f-9532-537209df1406',
                systemId: 'f0dfcb1d-30b6-4adc-878c-b25b89bca551',
                systemName: 'riykb7efjy7hjooa3jb9',
                executionId: '5cd8a0f8-fe3d-4461-9ad9-b96bfc8bd791',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 19:58:51',
                executionMonitoringStartAt: '2020-07-21 16:59:20',
                executionMonitoringEndAt: '2020-07-21 03:07:43',
                status: 'UNREGISTERED',
                channelId: null,
                channelParty: 'c1o0y6ujlnzx7frejslk3qalae76pwp6rk6s40b2niraa77sx5uzcdkih46mm1glz8qytyq4og796xxsfgo8i6kcu3zxcn1e8t7ferorumt9m36i1jgitpx5hw2cfu010xeqgjr8ticuyfv1ekwoqpyvg0u8w5z1',
                channelComponent: '9ok0khnjmzwardin4o751saau6551enm6ekqe4k2qf5c5vr100mfmmmc6nt4s4fcv5nf5xpdzg1jm9wk0js2sna5qndk4j0s095syzcqqpgj1m3zhqa6ocdyzflyqyu8jzvfnto3ec9rjb08zvskxqozydkp0bjp',
                channelName: 'xo2it6arqfx81i4ea52ceivqj55dg75b0l8f3gvsyzjubhs371oa9420shsvvt00jzd54kfx4onyyzerj1pufnd0upd858brnizxqjs6dln2zhb73p0en8d2hob5ewubsz2thqrp4h0aopjgb9ra76mcd48136lu',
                detail: 'Aut maxime omnis totam est rerum. Corporis et vero nulla repellendus possimus pariatur aspernatur aut laudantium. Odit natus dolor nihil similique. Magni sunt non in laudantium et aperiam nesciunt aut. Sit eos maxime.',
                example: 'wywfm2y8cx20vmgzfwnl2spho9cycetluzwn308reumss14nohbbometlr3okbiikzqkjehjfyaqjzzpriix2kqtkpbrc5ahi42zhsrlf6i4493yqn5ymo4qden14e4d9i3c0q0ynv9x168jna7r5ye0xbbu8kt0',
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
                id: 'a163e5ab-d7c0-49df-8c47-bbe177d5bc38',
                tenantId: '5b766746-0377-422f-9532-537209df1406',
                systemId: 'f0dfcb1d-30b6-4adc-878c-b25b89bca551',
                systemName: 'h3xsf26mvw56h645r5f7',
                executionId: '5cd8a0f8-fe3d-4461-9ad9-b96bfc8bd791',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 02:32:40',
                executionMonitoringStartAt: '2020-07-21 08:42:21',
                executionMonitoringEndAt: '2020-07-21 22:21:25',
                status: 'SUCCESSFUL',
                
                channelParty: 'qdmp82lgxjdjvrlsz5szobgx3bq2z35onq8xz3ec6tnmqxlhqzx9s3hhifl3jpajga5j8bshot971hsmbgr4vh37ipohcu3aeof59jys4ypoakfbcnbd0dhihm4cpw2t2tgs5ikgh35r0mi8nffx3ly0gap0kx3i',
                channelComponent: '1vi6ui5kterdgd3wo2p9z8a4yht2gx4s549semir863amz7tclk9ir9cncuuk5qdao7bnm3s5x7bygmfckshupo82btrgu484oxand47ekawx08doeqsixtvuy9ceyny7wul5u7yb3vv660a8pnge9ud7oqhmmm3',
                channelName: 'm4wx8fcqie3s90l67gogr9o91gmeir9tiuk4j2fw9btor83i7md1cxvuhug4haj7lkj36zkf3uvmy0cyrttwbnshada3jjtv1x6csi8cnr8v0a1dtgiuqlkazeavopjwrmo3o62stfd674vbr3ixqovdk8n0ooj1',
                detail: 'Rerum rem qui. Voluptatum assumenda eum harum. Eveniet ut nesciunt dolor qui et voluptatum qui quo facilis.',
                example: 'cfcfh834treduvj3yqil9lbogbmtmnwdhip27f26iyn03sjfp1c5qs9zsj602gzvyj3tocfob9rn4rrazoiwbg9eg6n6hq3bm5nvfvzaugpbtn2xflzjdpgcd78k1qhxmjy6j0s5mqxxrlud27gupck8ysvbgx91',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a163e5ab-d7c0-49df-8c47-bbe177d5bc38',
                tenantId: '5b766746-0377-422f-9532-537209df1406',
                systemId: 'f0dfcb1d-30b6-4adc-878c-b25b89bca551',
                systemName: 'h05orehrju1r5nejz8k1',
                executionId: '5cd8a0f8-fe3d-4461-9ad9-b96bfc8bd791',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 23:56:18',
                executionMonitoringStartAt: '2020-07-21 08:19:12',
                executionMonitoringEndAt: '2020-07-21 04:32:26',
                status: 'UNREGISTERED',
                channelId: '86589264-60af-4ace-a380-4c2761014c43',
                channelParty: '5rlc7l4094ju56dlvw0nlqpai12n4q64jhucfz6g5l2qqcs69lapjfj3efc7grzlwgs4qf2zqmmpg9hwoa0x4hegp28m982kffm3jorvugspedw8oid1pdy0xg58e6b4l1x7uk0souvm8lnolf678og96kr9ov47',
                channelComponent: null,
                channelName: 'mlhv6mdx979umijhugdfjqfc505yhrbt0b67v721gv6iv98jipct0nwpv4yhr85y6w4wnp3ax0swr6hrgnuapkwol1x9rtduvg9gp1g99jzdrcspvun0jaq2n5uzwp9jj5rboz9yo5lzu2jmrirw6xvsnd63ygfe',
                detail: 'In veritatis eos est illo iure. Molestias dolorem vel nihil temporibus. Dolore pariatur officiis corporis.',
                example: 'h44yfvzpdoy58l0a5ql0c7e3gg6tqckcbq8dwts1kdfgrab7zdjgdttbjhp22dmvw46ke0f4dcxwgoa0wz5p3qyemuwcc8udh65lq77z47g82hyrh3uzz8wja32afw67hrd2bi0gym9am1fhucai67i9ilftr0av',
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
                id: 'a163e5ab-d7c0-49df-8c47-bbe177d5bc38',
                tenantId: '5b766746-0377-422f-9532-537209df1406',
                systemId: 'f0dfcb1d-30b6-4adc-878c-b25b89bca551',
                systemName: 'a4dlwumke2osl79mi45v',
                executionId: '5cd8a0f8-fe3d-4461-9ad9-b96bfc8bd791',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 11:47:25',
                executionMonitoringStartAt: '2020-07-21 08:50:29',
                executionMonitoringEndAt: '2020-07-21 22:09:22',
                status: 'UNKNOWN',
                channelId: '86589264-60af-4ace-a380-4c2761014c43',
                channelParty: 'sg5hu5t9nor1x2q1dwj9jf56navop7uhwjsl1m4xj6day1wt3dtkq3mpo7zcuuhl5uzsikbnkwrcasusj6zigakoe09m2srsccvq012zfbgf8gpjdy02ymuuzhp3bklsmb7d2p56hm20cl7ctcnbi1moe7cfrkaf',
                
                channelName: '29jg3sujfho23xkm72iinwwkjfwwd0kq9xeeps385a1994f1yocjk8l0sgix5gas4hqrd8yvddta93c8wua6ku5pxp3ecqecay26x65yiy3p0qualrdjfcy7mb0zi01m5b30kll1rtevqqkueuve0vw2ful9q6ua',
                detail: 'Aut qui nam. Ut ex laudantium odio incidunt est enim. Consequatur sapiente amet velit maxime. Eius voluptatem quo.',
                example: '3ul5sajsfjtigdizp0npdqe1mcpbat3sfm5bp71ntjl4fx5xc7hfodcc85tl219fi20uc8rm1jjako5mmsimckti9tlf9ogbe6nxo1lqqt0lcwtqizsfonu6x3es4nbexxpi7wqjxmz4ytuy42egnit3gjpmsuvv',
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
                id: 'a163e5ab-d7c0-49df-8c47-bbe177d5bc38',
                tenantId: '5b766746-0377-422f-9532-537209df1406',
                systemId: 'f0dfcb1d-30b6-4adc-878c-b25b89bca551',
                systemName: '033q3foysxymt526c3od',
                executionId: '5cd8a0f8-fe3d-4461-9ad9-b96bfc8bd791',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 03:10:12',
                executionMonitoringStartAt: '2020-07-21 08:55:32',
                executionMonitoringEndAt: '2020-07-21 02:57:36',
                status: 'SUCCESSFUL',
                channelId: '86589264-60af-4ace-a380-4c2761014c43',
                channelParty: 'ixw387md2fysb4sjuep1pt25ysxqfe6jb8z7oktesyu5i4cft9qmuytm93bnzuur8wmtguvydrzrlkzaijv0cxn6d06b3p0e3g9q1g2bphnj5un1jwmhofakc437gt60kkdhkn0j6broboomd1cvr88hjd22l8k4',
                channelComponent: 'irt4p2bnc4e5dh7s4efcklgezqncsi2rri90i167p8vck3wprvw0wozde6d14tgv0bwoprcvojbrilxzywr75j0s2bn3ygk6my5ui1745315xan8b25ow6hmvlzhsbuu6295eyxbiupnw65vj7e1kwwqguzz8klx',
                channelName: null,
                detail: 'Consequatur consequatur tempore exercitationem tenetur voluptates corrupti aut quas error. Inventore eum dolorem nemo accusamus nostrum ut. Possimus incidunt eum at quae eius. Quos dolor qui.',
                example: 'w9mwmr4b6sip5eah83k68eilhlv220eof7ce55dg4eo6zl3xulgrdkwp6zcaemabbinugam4farqd7ubc09j7cmzd7cnga5qo09nv62110u4axeek5hsfc85a0zogpaoykh3brx8gzbza5z1hhcr0o1gcln31tkz',
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
                id: 'a163e5ab-d7c0-49df-8c47-bbe177d5bc38',
                tenantId: '5b766746-0377-422f-9532-537209df1406',
                systemId: 'f0dfcb1d-30b6-4adc-878c-b25b89bca551',
                systemName: 'q4tqvei6blqvm5e9ap57',
                executionId: '5cd8a0f8-fe3d-4461-9ad9-b96bfc8bd791',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 16:54:52',
                executionMonitoringStartAt: '2020-07-21 02:29:58',
                executionMonitoringEndAt: '2020-07-21 12:39:14',
                status: 'ERROR',
                channelId: '86589264-60af-4ace-a380-4c2761014c43',
                channelParty: 'dbkgcfgoghejuaaqkzwwds7te61zh5ucam3ifsyyvl3uwrv68rgumbe67tfmxfoikfemjka0ubn0hvbo1o33phr05azrtjmcle29m2n5kc6tzba1t77g46t11wresgtzermrm3yz2v3p00adqzaq5i8fimn0me69',
                channelComponent: 'zam17n7cg2euwbhcqjqoq4zfj193doy4ufjsuqp9jg8ba8ggreq24fh6hl4vzuyg6gyqo4186288joarnoq4l4odrzp7qbq8d7gct0l0mi50q0r013te91f9u983g9vrlss89692832lshh1fo2y86qa1bmz9zvk',
                
                detail: 'Fuga at incidunt illum facere cupiditate minus quis omnis. Rerum sint quo saepe animi aut aut maxime dolor. Blanditiis quae maxime explicabo molestias. Et sed quisquam nihil ipsum nihil.',
                example: 'bfq1c36khi4etdhl5tcw8kbk2zmttw2rjghjhkbizn90nv3zv9rw5o0nb9euskmgry9irwx6gjmzp774bd5l585aoia386owjqe8l8xbj92fihrawuinv43y8xzragn4l80i8lxaabdc28zbklvarp7xp5fuwa5c',
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
                id: 'ciq9we5keda3w7wozvei7wgo547ouancv2ala',
                tenantId: '5b766746-0377-422f-9532-537209df1406',
                systemId: 'f0dfcb1d-30b6-4adc-878c-b25b89bca551',
                systemName: 'f1brzvrei496c2hhdpgc',
                executionId: '5cd8a0f8-fe3d-4461-9ad9-b96bfc8bd791',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-22 00:46:38',
                executionMonitoringStartAt: '2020-07-21 22:53:23',
                executionMonitoringEndAt: '2020-07-21 11:58:20',
                status: 'SUCCESSFUL',
                channelId: '86589264-60af-4ace-a380-4c2761014c43',
                channelParty: 'd86h2pfwflm7d51rtdvj1yrottmn91xir43y5pkgtasw4s7dyokn3ga0izqs3hjwtx2bpblr0scisu8nqb77i8inpw67360uwc9m09bv4ei1huua0oiti8ukk4km03yvs323qi6d3ktl86sz32yebzglqjdrnhdu',
                channelComponent: 'nirwyows16y0bxzzueawj5anfedtevj4jim5c9uanw9h4nxu4csvu5e8tgi04wsq1gfml1y27qkgimpwzefh1e20ul200d7um0p6jo12e9kx7evzopckj3o79h9cr4o9plalutpo9olcvtb6equ34hgyltranun2',
                channelName: '1gqvpa5tdw4lcdb9t4aol7ehbpuw11h9mi98oes5v1ja9svpvgw9te83ec9u3ln35drv6cenlwa9bobwryllu45ia5uog836owsml0gwth8ulkhhpvl8rlcdcmknxx4ye2tqn8tb8gdregjse75rm50c9i88h3lp',
                detail: 'A officia est voluptatem deserunt necessitatibus asperiores porro. Enim iste aut incidunt labore necessitatibus sit amet rerum est. Non fugit eaque quo atque. Distinctio recusandae corrupti nostrum illum corrupti est.',
                example: 'y4nnkd7099fw14o6070vr02bf2qq73cbf9cmbbeuyy2cewu9wjzfmzuj7fxzk1dre1ud1iux05mk9q080zk2jjskm4vtomdjqksb8pcp88nulz0bp70z6adqbx1c5agaivki7msn0ko2ayil3ut4gpizhxp4uggr',
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
                id: 'a163e5ab-d7c0-49df-8c47-bbe177d5bc38',
                tenantId: 'rt624tjgs66r4ablhcvuskly91f7sdsgjafyr',
                systemId: 'f0dfcb1d-30b6-4adc-878c-b25b89bca551',
                systemName: 'mb2y4i1o34b1gzkwsft1',
                executionId: '5cd8a0f8-fe3d-4461-9ad9-b96bfc8bd791',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 06:09:06',
                executionMonitoringStartAt: '2020-07-21 12:12:54',
                executionMonitoringEndAt: '2020-07-21 16:26:42',
                status: 'UNKNOWN',
                channelId: '86589264-60af-4ace-a380-4c2761014c43',
                channelParty: '7dyhclpy0ledtgdrhis8n0sy8mfw4yvm6svgrpu65bwbd30yv1bzm63mzfecrwsjohlcregwjh6pysvr87itdyjo074k691zr1hvklj8zp4a0umyw1l6suvb1bp7afh4brjod8m64ukfiu6zvxepfvcdvfb08sqi',
                channelComponent: '3nnmzzbaz3nrm1fcc7uzry65qk0kvzs6mjsqqcn70qp1s648c3thgfwh1gwitbwn06gw9evgxkpmyljup15i3cs7u0qwozjw1ezk7qb599kosih1jty74v618ic3uiaea2wf09ghlc95yvt3ed2pecqekephddok',
                channelName: 'f2xxqd125zkza5hetx2hau5hoa0ugo9fm09tgoqd7o2l804tusbpepkb5srnhmdli5fva05559i4haeh0cxmzw98ec9r695sdyubaz33zvcqrexk80au2o19edkiil2xebohn6p35z777m20kak9uuv7uzyawa3u',
                detail: 'Error magni ea. Quaerat molestiae omnis sit qui alias asperiores. Voluptatem voluptatem iure aut nisi. Eligendi aut minus in possimus nulla. Blanditiis sit minus libero sint cum qui ut occaecati minus. Rerum non perferendis optio voluptatem totam corrupti earum.',
                example: 'yezlaxei9k7okz7hg10c3y64pxj9gp0esei5x6i0if2luuxgzb9wcqf5uit2f47leao0aqduwmyqnamb976nqynl9ji74t0ayfhvpl2r17tqzjd8e1r3pm8ah5a0csrql2pp0ezmkvzjcu5tzm5jcg82maq5jbp2',
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
                id: 'a163e5ab-d7c0-49df-8c47-bbe177d5bc38',
                tenantId: '5b766746-0377-422f-9532-537209df1406',
                systemId: 'gbp0odmiebe946p1h15x5vinzosp19fzjh8o6',
                systemName: 'o18x2y896svqjikd1poo',
                executionId: '5cd8a0f8-fe3d-4461-9ad9-b96bfc8bd791',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 01:31:37',
                executionMonitoringStartAt: '2020-07-21 06:52:56',
                executionMonitoringEndAt: '2020-07-21 11:22:51',
                status: 'UNKNOWN',
                channelId: '86589264-60af-4ace-a380-4c2761014c43',
                channelParty: 'xck7e955fpe8slr1xhjwdqhd61h4z7zsv5dlhf6ksifph51g4g93605anu783e8fy0f4rmji2fwsyy6f6q52n6ku64v3z89tja2bxu2r7l7nled3ppxx0gqf86sw1uzkmbg2nimii93zjsxw1577plok16dbor1m',
                channelComponent: 'jgldc9e4bxo6nivcdc4qpy5hs6szsz5dem6mg4rb32g23nprrlcjw0xindo34tnstlovqswpkttfu1u7kbu270ej9ftryidmi3ecyccs8gx0sf7uqho37fo615t2r2g8rux4hicbt1ibuk63llb3za5x591n670v',
                channelName: '5caymtxx8lbnujut90o5xit9s4nxyiqi9owbdtbw2d9jporbmst7rt6n9l04cbvhu1d8wt3wko007hr2r20gktpy64tn95y6p8fgnrpy4tpiz3ohdwt5n5t9586sx6jk4bv1kpxsjfmfr336q4snmx47harzn58b',
                detail: 'Animi nobis aspernatur ad voluptas reiciendis quo enim. Vitae dolor eos. Quam praesentium blanditiis quis dolorum ut.',
                example: 'to62sstoyvimyluvd8sbhle2z7fmrhanrxm03ti6ix41l3u994m3vdoq4efw0ad44dln498dt79z7rbje6ohf4wgqb0ipop0wox4jwtj48e7w17ozbsucncimv9c0i4dtsvc4g58miqtqfkqhyd3t6kw13az6vlx',
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
                id: 'a163e5ab-d7c0-49df-8c47-bbe177d5bc38',
                tenantId: '5b766746-0377-422f-9532-537209df1406',
                systemId: 'f0dfcb1d-30b6-4adc-878c-b25b89bca551',
                systemName: 'bagkjkk76vkq6hljmn0d',
                executionId: 'kaa4mxue3kx08z9xgyp511sxu7fa921ol6bd7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 04:36:06',
                executionMonitoringStartAt: '2020-07-21 02:25:37',
                executionMonitoringEndAt: '2020-07-21 14:01:28',
                status: 'SUCCESSFUL',
                channelId: '86589264-60af-4ace-a380-4c2761014c43',
                channelParty: 'kz3v27vzonxfu6q3aknkmoj16h0g3z1mrjtrqgak1mcvnr3a1behb40cq6u11352u80nckw6jknpd8nqgrahlhps9qr12dczzfye666sjbwhdrxrun9hfly6rms2yukny87z56qs01fdu5h0v0u3283aqxekpz8v',
                channelComponent: 'ndtkhq9q7wymb8nwzwlbtkekmqqaovh287n6dkxudyvft00byyggxpq9s8v6ubkbk3m29gymkurpdv1mkbij3lt4e3gbv3s9sz9f7c1dunxqhyf6drra15ld3j624xhdrb0il8ku55q6i4wwaypy8bpeoi49ggib',
                channelName: '7k6rskhbprx5de2xrn3h4lwkmqk2bttwm8kmb01h38oxauk8pw25aokdp4wsqoq5p6z7vrl91thpccxs72swsttjhffun7mbpmz6hyj6mp1mbko9ypxkdml6k1sxxzxnlf1g34plofebvshlx397qzbiqe83qjut',
                detail: 'Vel sequi est harum vel enim magnam cum. At eum expedita aut quis. Reprehenderit delectus molestiae qui excepturi quis natus recusandae veniam optio.',
                example: 'i1ux399a2rz2cs2aghexqofpw3m3legjy4cg0s60anf0omklt69i2b0mojuzog09d5oh7co9h2n7u1hmv4v5s5lrcmjfvnyg1rxhp0i2dpbkx62yujpcwlon8mzo7h827toj21zxd61bfj9wdqw9wvue0aob6h3w',
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
                id: 'a163e5ab-d7c0-49df-8c47-bbe177d5bc38',
                tenantId: '5b766746-0377-422f-9532-537209df1406',
                systemId: 'f0dfcb1d-30b6-4adc-878c-b25b89bca551',
                systemName: 'jervo1i284qq20vvobwg',
                executionId: '5cd8a0f8-fe3d-4461-9ad9-b96bfc8bd791',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-22 00:29:38',
                executionMonitoringStartAt: '2020-07-21 01:59:19',
                executionMonitoringEndAt: '2020-07-21 07:00:34',
                status: 'STOPPED',
                channelId: 'r56i902p7itqeq545iklwrank3miqu26d0svb',
                channelParty: 'nguluoen0lw626trypzrxuvo1xtvodegnokqxh8uvkwqzrn182mbi87817raovvgxyzcyygdy24qk6d5nxt55777d0cl5ynirvxxmq1j9qnh4brx45aryxrl3vcu8d5w4c2dkcyhetyk22onx776u1ufzo4127as',
                channelComponent: '63u8kqjp1tapp88f5g6wzly9yo4morbepchmhdz5kts29r7lja3lznypb5rxf2xw7gzjg5e9fco8bdqtkexibpt9efm2uyz8fwun3o3bys2rleek6r94jwhlvpsdajuaagv22dowl5as6a352axva95v1ile9q8r',
                channelName: 'huegnrx66qjnzl85foppml91p7g4okben9c5txdct7koo05cf85cyd5ciejp1sewvqzxvgir9rr0ean2vfnygduz7h6u1o53n4q2l2461cdv5a1begsvymbkgt0k0m5tfxivypbgqrzwnicbwajbnftipek0o1bu',
                detail: 'Voluptates autem aperiam quidem occaecati voluptas velit velit. Quia voluptatem debitis recusandae veritatis quia sit labore. Hic et minima aut est accusamus delectus at quo unde. Voluptatem fugiat quasi aut adipisci.',
                example: 'uztck20qv7rcbs1txx6dg4vyk39x2f5qe08w3whw0wwq92jmodj0ga9lwa8eshwniocbhbcgcgkctw27mepj818w08yw7uab1a9avdn5oiawtl18ko8la3blofkk21hsq6bxfglrwooxy59tmri3x11cfhf0bfom',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a163e5ab-d7c0-49df-8c47-bbe177d5bc38',
                tenantId: '5b766746-0377-422f-9532-537209df1406',
                systemId: 'f0dfcb1d-30b6-4adc-878c-b25b89bca551',
                systemName: 'vqrl8s2zwx30hy504fyt1',
                executionId: '5cd8a0f8-fe3d-4461-9ad9-b96bfc8bd791',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 23:41:54',
                executionMonitoringStartAt: '2020-07-21 20:14:15',
                executionMonitoringEndAt: '2020-07-21 03:02:36',
                status: 'SUCCESSFUL',
                channelId: '86589264-60af-4ace-a380-4c2761014c43',
                channelParty: 'bjwzp8s6exaglutg9w1jomf42q2vq4rwlxiwxa3eb6vf1k4mku5bstqzp83jnu15a58zybhav40me79z3ebbrk95c5xxckxmxb67t7gmgfnym0228rm3etsfvx7e1kktb26lyv40kyjxzzk8l16j6b7usvh2upev',
                channelComponent: 'qbzey5sluqb9aca04pokusa3gv7diews5471j0im71z62n8dwpomwbsgx0vth4ans6mq1i5nvzl6v231vs9qmnqhkhv29afle1nf3s85qzr5wmb8tq4etns4uwgtehseoxuf0sz0nrzwo0f3ax2sje6wztw4i4z7',
                channelName: 'ft8ws27e1gkw028m46yo66o22ngxzx6xf4d7o9cy968pjtf7i0mk730muk7jkx6nx3lvrze9a8rjfmcmhvyywbgl2om15218c9nn48b78ik6z41anbrn7ztyqg2lzxrfp5xwhi8oqb0ij8ntu836h27kby9dpg6e',
                detail: 'Maiores vitae molestiae reiciendis quia ut cumque autem recusandae. Aut praesentium et quaerat cupiditate aut ea consequuntur. Id vel repellendus quis placeat sed. Neque ratione assumenda repellendus dolorem velit laborum modi perferendis.',
                example: '8zrng7281yygwjp1p1i8rcok9wawchdpeunko067mpkw6h1ji41vo32rihygr2ji97z4i73j2jvdpgl9v6y283blkr45ufv44s0fuenblwlm3imblemnk9gd9r7i26hxup7cl6oxtv9gkzcz8lb26t64v8dqq2jg',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailChannelParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a163e5ab-d7c0-49df-8c47-bbe177d5bc38',
                tenantId: '5b766746-0377-422f-9532-537209df1406',
                systemId: 'f0dfcb1d-30b6-4adc-878c-b25b89bca551',
                systemName: '7q01uwzibhf1pj7xmauv',
                executionId: '5cd8a0f8-fe3d-4461-9ad9-b96bfc8bd791',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 13:41:36',
                executionMonitoringStartAt: '2020-07-21 17:51:12',
                executionMonitoringEndAt: '2020-07-21 19:01:23',
                status: 'UNREGISTERED',
                channelId: '86589264-60af-4ace-a380-4c2761014c43',
                channelParty: 'h8ujpnen1rmqvect1dv7pqkcpl7m9iyl043v2itt54vzsp3pm5er76lcn5g88v3ty5hga1i5c5z8wxe0niifojyt9moqoyloqwpd2x003gv1qvfwlxuwpo7e68zi2qbysssu3wdnpbbubfe2bvlsyw341a1z910zb',
                channelComponent: '15spau63b2m7o9cm2qblu2lk689nvxc7pqb5q72s8327il84yimup7h5k4zv2ztifk93jguk60c11r2e79qgnxjchzuzm8lb6c6zvzwvcurgxf6ogdn1xy7wcebwm5l4rm2tjyfhvsp0qzx2fh2dj51z7j556ykr',
                channelName: 'dhs0uaazm40jrafchkoinh2wztbk63spfjynd9ovsn9zr6nq5of9n8aatli4g512gfakpjjesx91t3avh5sxzi1en3frpdtlxlxavxtpq3l9v0gqoep2m6957q3llvovxmes5e8t4xpio5p38t6lqbap81t8zwej',
                detail: 'Et aut quibusdam id aut error rerum a. Placeat delectus voluptatem atque nihil voluptatum. Quos vitae aut consequatur eum impedit et. Fuga voluptas in nihil molestias sed culpa possimus temporibus saepe.',
                example: 'qxmv1ka3wl931yxpf9jqap3ek8w697xwee19hs6gpodkb2n8173d6ujl99p2o5flfkxf8pldoml7jrk6n0ay7vysghgtrkumydldv7vraa1t1fis7nyvw6yc71j0rqkrnp1m0gvwtepq2ynosifwe75vovosd51w',
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
                id: 'a163e5ab-d7c0-49df-8c47-bbe177d5bc38',
                tenantId: '5b766746-0377-422f-9532-537209df1406',
                systemId: 'f0dfcb1d-30b6-4adc-878c-b25b89bca551',
                systemName: 'yg0h9brg9jorls1xlh3l',
                executionId: '5cd8a0f8-fe3d-4461-9ad9-b96bfc8bd791',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 04:19:51',
                executionMonitoringStartAt: '2020-07-21 16:50:04',
                executionMonitoringEndAt: '2020-07-21 10:31:54',
                status: 'UNKNOWN',
                channelId: '86589264-60af-4ace-a380-4c2761014c43',
                channelParty: 'kfeato9td1kz5fyowqtklr7t1fyownbzttu4z7o8rd2wdtx0pojqav12znt7qnjbkoatbe1mti7dh2giu6gpybudho8fiagpguf4jxfluzjoiu6fb2ph752p94ndotwhzpkkj07txyncvt6jxkr74h5p32bifzwk',
                channelComponent: 'zgr0r92xwqcub6sikciqox8nmzfslxmuca1dqiiwj4os46mheavwnhgupqdbo5dmaskx7rqukhnjk74hvmbrjzesn3hfsdq821zu1sox3dcwfkokizzl64x8s9qrjga5u468jfart95nh77i86gqdrorujlw2l2si',
                channelName: 'j0ipj1g87zxqif52vw5z233g3qz0u7mjqx9hb4c6ry1wvk9azd1niivrsu2jjosmjc7p2vjymjokrayvsv69q3e69sriadxd4z0niu1573kqaah2kclpx3mnl51xldy1ryl6w0ptyavqfzrbt7024yg9ihph3eko',
                detail: 'Similique ut quasi ut itaque. Nisi quia fuga magni sunt quia qui est aut et. Voluptatem quae est magni in. Rerum fugiat perspiciatis mollitia dolorem excepturi laudantium.',
                example: 'trfxxsn42jx12p4egkefma3wbi88pxa5dopnjoiev192dn5f5f23zyv1ty7hvi6wgvb91jpua445h380wqltq175033zanfrpz9vef65vh1hnployxb0ct82xqiy2dptnmd4taunmvcqiq8jingky6k2q0x2mwor',
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
                id: 'a163e5ab-d7c0-49df-8c47-bbe177d5bc38',
                tenantId: '5b766746-0377-422f-9532-537209df1406',
                systemId: 'f0dfcb1d-30b6-4adc-878c-b25b89bca551',
                systemName: 'kgln7g1gdbzxb5yijxe5',
                executionId: '5cd8a0f8-fe3d-4461-9ad9-b96bfc8bd791',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 02:31:36',
                executionMonitoringStartAt: '2020-07-21 06:47:57',
                executionMonitoringEndAt: '2020-07-21 13:48:52',
                status: 'UNREGISTERED',
                channelId: '86589264-60af-4ace-a380-4c2761014c43',
                channelParty: '7wm06knymh1ol4ec39faoqwubknn9735qt3qne4wpt3nvlybcr3u3dgqcac1ot2d6fopvh5zv7yavbhcg2n30t3skdfffli3twjgu1h7lhcl5zirm3xiolnv0a52ssexbvh9g5c72x0tpkta8y9vbkmae272g3a6',
                channelComponent: 'r3jct3gsxblkor13fw135x9d4kygojuxitgwsggz2w6b6lb4u9f8l9xkz6anja30m0yv0dpat5xn1ewloyjo4n7jy5zy3kmqp3kwc7ylbwimgqortxuycjsa1bnzb04wch84o9xww8owy4391zejrs461i4387ec',
                channelName: 'vochle9aij8emc52jutil3jrx66u0zgbqczwyyiuxwfhzdr42a7mkjcfcixwfiz2x4f21apsp9r8jswx65v1dsi8bzinevz6vuhibrh84t6q2d3g8cwlgofuxwkysusvpt6k1sv9cwi5wuyyvu0vhs3tknc1otcak',
                detail: 'Delectus fuga porro ut suscipit. Reprehenderit ipsam rerum veritatis ab culpa. Odio at accusamus ratione accusantium natus architecto asperiores dolor. Ratione voluptatem consequuntur sequi veniam qui est sapiente omnis consequatur. Quam dignissimos aut vitae. Occaecati omnis iure et explicabo omnis molestias.',
                example: '9ndpsb0r5ovoaw7vc2kjn7p8jse84haqofrztwg7sz7dgd1fx7ycarr5wvbjdhg76uxv35qelcrkp5mu9ueal2imy3v4smx49lg5kh9xq8kd8lxpm1zuepxatq9wcydmeocpwng207o8z6wcei9qddkte220cpk8',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailChannelName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExample is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a163e5ab-d7c0-49df-8c47-bbe177d5bc38',
                tenantId: '5b766746-0377-422f-9532-537209df1406',
                systemId: 'f0dfcb1d-30b6-4adc-878c-b25b89bca551',
                systemName: '7hzlzk8f7zgat2yl1q0m',
                executionId: '5cd8a0f8-fe3d-4461-9ad9-b96bfc8bd791',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 17:11:58',
                executionMonitoringStartAt: '2020-07-21 10:35:37',
                executionMonitoringEndAt: '2020-07-21 09:28:18',
                status: 'UNKNOWN',
                channelId: '86589264-60af-4ace-a380-4c2761014c43',
                channelParty: '2433xn3apy9esos6z5zh0f50amhntm0osqw7c1ei0rb6peyci5m17htvrld2galiyhvnyorse6csmx31siua2ntqm4le3jaxhcx0d1o0p1dhw41tgid0w9d9jgma5aaj2ytlpzvtlcnjhnqk4y4ak72lw0umt6vl',
                channelComponent: 'ubuo4hg80kzcdykki31mko75t6ty378lzg11x0dlw63dry256rd5pnyajz7wetqlam91ze15xaukl8hkzqd561rinfhqb07dnzfqfrgsx68entjstnjp7uylwe6tmw3toubqz0ogfvinmsl5xj01xxyq1srkms5i',
                channelName: '8xte23kwumulqvcrc5aoh5hxvmku8xj6pkhg6ihean56ygwv0hyujmevnhgvik6znfrafpii90xcms22s279fcktx2n4tqm426va5w7k3cgahm6omc0fg3vu7boaw5plhrpfb5f7iu01hmrin16q2eghmvssz26y',
                detail: 'Porro eveniet quo optio amet animi sed odio debitis excepturi. Dolor explicabo sed nemo id qui. Quibusdam suscipit sit voluptatem incidunt sit.',
                example: 'uk6gy2gz4mim2gnwb4f4pz5tgd9boy4tsa70r6ab7gdjvf7gnbs7o0ecu0u0f0bgrmja0xlr9907015lv95vof6jidil98dgj4x0f93bc5u99r69ddn8qicldqbcrf1bfbvb0arvyejdxk376au6qcstfz8z79clq',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDetailExample is too large, has a maximum length of 160');
            });
    });
    

    

    
    
    

    

    
    test(`/REST:POST bplus-it-sappi/channel-detail - Got 400 Conflict, ChannelDetailExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'a163e5ab-d7c0-49df-8c47-bbe177d5bc38',
                tenantId: '5b766746-0377-422f-9532-537209df1406',
                systemId: 'f0dfcb1d-30b6-4adc-878c-b25b89bca551',
                systemName: 'rcjydeuuhifrmr8wujom',
                executionId: '5cd8a0f8-fe3d-4461-9ad9-b96bfc8bd791',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-21 07:46:05',
                executionMonitoringStartAt: '2020-07-21 15:34:09',
                executionMonitoringEndAt: '2020-07-21 22:40:14',
                status: 'SUCCESSFUL',
                channelId: '86589264-60af-4ace-a380-4c2761014c43',
                channelParty: 'jtaud9sv7s321swsaly4d67bdu858ttd2okfpgta7d5nfta5t1xh8onvzneo0ielh3uzet2zna69tzdac105nf03qvc5g9gl2vdco4ivg4vgr20au7vk1c9bic4z5f6ku9odu9egil9rfr4pf166n9lf0gkfxifu',
                channelComponent: '5h7ha9xigttaf605sjd2pnpnf02tbo4g1gkauzyh1fm0g2yx9eswvynqsgkqwzut852yrhmw6h3glqwr56dc1940t56iz6avrdv7zs2dydhk72lri714dincuwc6f0dew94vscenarsk7x35tfv3e4q8xp92odi5',
                channelName: 'umydezq53rsd7doj4ebmr2fg4kyzp2sc4xbug5m6lw3t3l1ju73gn3ejfum4rf71fz3xyt2sr2e9on6dmc4ujehrp4zybbzerxvla1ubfmwcx0b86fpesbvr9fw5oj34u42hqx93xr7w6jqoqf85s5r6hu3xm58u',
                detail: 'Beatae dignissimos consequatur. Dicta sed optio dicta voluptatem. Dolor quae est placeat. Neque voluptatem mollitia pariatur alias at qui itaque facere.',
                example: 'vcboxgwue1mtozbe6ocfiolmjdn68hes3i8ob172yg0adyyjdnzvenva5u04rja13l15kupdc6k6l0gmfhivcr0wr0or9bp7qsxil0pe5xoevxapg5exqwu65h7hvtqv0rrtwj2oex4kxdavtk8rc8c1u5pxww7q',
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
                id: 'a163e5ab-d7c0-49df-8c47-bbe177d5bc38',
                tenantId: '5b766746-0377-422f-9532-537209df1406',
                systemId: 'f0dfcb1d-30b6-4adc-878c-b25b89bca551',
                systemName: '763zbns9nijydw0eyl9c',
                executionId: '5cd8a0f8-fe3d-4461-9ad9-b96bfc8bd791',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 05:55:37',
                executionMonitoringStartAt: '2020-07-21 05:02:29',
                executionMonitoringEndAt: '2020-07-21 12:28:10',
                status: 'XXXX',
                channelId: '86589264-60af-4ace-a380-4c2761014c43',
                channelParty: 'ab2k8i7sua4oonxr9al2h0zwgpzdqn44cksbfxh6zsldftu9hxpoe1e61n0q9ag5essrsude06lx57mhwikg4jkolq5e4cbv2s6ywld6bpx5lsxf1ab6flpv644hbj7l7uhkf746mt9a6kbujxgguubsa3xcunko',
                channelComponent: 'umyvnudqhptqsgit82bdsxy4o0r5fbkzio0m0l6qsib4jfu6gv9qqigp4j6m5sp5rillrlo7z92zg4k9pheflhyx66kq9eb3a3whhse955h6fxl4y76oliruc4s1kad1v3bqd9l2vrbmy1kd71opavatlugfbtxi',
                channelName: 'm7h6n9hf6lblhkzl01dpfkrngiywekl82ockgc55ni2g1epusbj72otavkktidrmeytwl8bsdvorxalu58l39pu8t9zmn6lm3ujbl50dvfd3rpihvtlv40nr56loq6giyhwh28uywmjd2511sa2dwywyvqyi4yz0',
                detail: 'Magni modi inventore incidunt labore commodi. Optio nihil exercitationem nobis et eligendi architecto voluptas officia. Fugiat similique quod sed perferendis.',
                example: 't1nentymwwmp0x0ia3wlfh1tnkj8zl4kfgov9r1oacbltwfgq9jvox93tymgfnm8ww3zav56ddmb1p9vd0hsicbfq6nz5i3bhy24pvs9smwsdbivjnckyxc49na90e2da22kxtola0abbqejr9ojc5insb7kzcgo',
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
                id: 'a163e5ab-d7c0-49df-8c47-bbe177d5bc38',
                tenantId: '5b766746-0377-422f-9532-537209df1406',
                systemId: 'f0dfcb1d-30b6-4adc-878c-b25b89bca551',
                systemName: 'qskx84t605dptq1z7ygr',
                executionId: '5cd8a0f8-fe3d-4461-9ad9-b96bfc8bd791',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-21 05:26:16',
                executionMonitoringEndAt: '2020-07-21 10:07:09',
                status: 'STOPPED',
                channelId: '86589264-60af-4ace-a380-4c2761014c43',
                channelParty: '4to9p3rszojnn4ko789wj17429kjr0low0hd34d8hfqa3t7f2fstl7uukbtmp21emls85svf4fofbisa0g92as2czqu6b6anc4cefc8f2fm3cvaua45ueu5jd64risvfi9i6p4r2o18r05t9jthjk7juvyyl1o71',
                channelComponent: 'qgg468r5bxcqwjwqhjtqnoznpbacyef386oacbvkvq2y9r3vi9wqgozuzjhyugur9rqs2puq1rqw98ylkf2g3cr485ir0q0up0gquqk43gaf1qdzcjgkueepk35bzh7zyskrroqdzvnp6n5pz30g2en5dcv75fdv',
                channelName: 'gyl5bncnarv5gf8pr3dlihyfw7asrx055uq6kl72zkujcxxxnw5zczaur1rcvximi9hgtkbetolcpk9pjg8x6i9iir3kv5hpm2v2ppx6dooc2n7pg2wc5qsmqlufwa010tlr5nwknt7juifza4uep441oppdoyf4',
                detail: 'Sunt quidem officiis tenetur nam. Quo optio possimus. Similique dolores velit minus nobis. Enim debitis eaque illo eos quo doloremque eveniet dolores. Quis fuga omnis tenetur nobis molestiae quia facere nulla autem. Minima sed et sed omnis ipsum et.',
                example: '8lfrxlelci2muji69edu87wtm12643m808de04xd0oh51pn418rwm18wenb0ttbru30clqewbzpsj6lovihz1oscx4mx9ed70nirmze1kw5cngebih3guf39335yt9yybz4sfkvn0q8er7zxrv4uc1c22a9uie43',
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
                id: 'a163e5ab-d7c0-49df-8c47-bbe177d5bc38',
                tenantId: '5b766746-0377-422f-9532-537209df1406',
                systemId: 'f0dfcb1d-30b6-4adc-878c-b25b89bca551',
                systemName: 'sue6cvs2rb25cixalk7z',
                executionId: '5cd8a0f8-fe3d-4461-9ad9-b96bfc8bd791',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 13:41:39',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-21 13:44:18',
                status: 'UNREGISTERED',
                channelId: '86589264-60af-4ace-a380-4c2761014c43',
                channelParty: '7h396dqjdka0h6n6l27dqgy0el79bjddfthohbqmneqjsu3hl2qoo797i55l2so6at5wee8z4lrdvmv6neivs4rhooaduzcuc2fo37twoxh1dis63kk7oie002p7aosi97ujjqlmyr7edcgwrt3ph5jwvqrcou20',
                channelComponent: 'ds57dk6ly73i24tm2gyskaj3o2jkzt5thkydizzo68fuiehcz532ocavun09e9n1sqzo5d5x1e5iwxgx3pbvcugaym12vet5e99rpk727q91zk819f6lkxgnvhbyuyjhtphr7bfbudygc86xc6jb13tv1bxm3ntl',
                channelName: '91ynsxewoiobncz3uy00yvudowvbpq6swpw56vi8ttnwkix0nfnxuemuv6hb17ylnncd7in5o79cca5f99gfyhsmzbihpbcpck09q1rca3rfea5ztru0dvsm45bdfd64sbbvo7abg209m8cdic9u9wm4v2wo7y8z',
                detail: 'Amet enim voluptas accusamus iusto qui cupiditate dolor eos. Ea reiciendis officia aut ut sit atque aperiam nisi. Mollitia rem tenetur. Id tempora eum sint non. Nisi occaecati facere sed delectus nesciunt.',
                example: 'ootl881hngtrmcl2voqh2j72vg41q43s48t5ekp1mtlebzqgev5fyfursmb2ch0jzs943ci2es2sxpg3howj4u5qhg31lkylz9ioqyo75z10t25sq136q6787f97xjxhhv491nx1k09yrb4bpatc7n01q757kbvk',
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
                id: 'a163e5ab-d7c0-49df-8c47-bbe177d5bc38',
                tenantId: '5b766746-0377-422f-9532-537209df1406',
                systemId: 'f0dfcb1d-30b6-4adc-878c-b25b89bca551',
                systemName: 's9fg2biatoorwnufg21v',
                executionId: '5cd8a0f8-fe3d-4461-9ad9-b96bfc8bd791',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 19:49:00',
                executionMonitoringStartAt: '2020-07-21 19:05:15',
                executionMonitoringEndAt: 'XXXXXXXX',
                status: 'ERROR',
                channelId: '86589264-60af-4ace-a380-4c2761014c43',
                channelParty: 'd6ik02rfdw16vt15lca6ftro5labwq7j2aajwegjvqlbkuyz1qc4g5u4a4cn5yibufzb41kre5c3qkg79fskc9vmsz4hx76gcmql023epbak20tlyv0hw8vfkv3t3twwv5hg3zj6jkk0w6cpkcqjbypkj96g32bt',
                channelComponent: '0pr2madc914d7hx06glfkcs10hdgnvo8kj7ypj9zyd9fi8503ovhlrhny419ii52edgrrnhf3p5sntjvwh4kjgn9e7ybtgtbl19uc5hr68x13a6j812a7yu0t8dxx6ooya28yhg89id9inire1qchyaspv9z7v0r',
                channelName: 'eov9beav8s8is4yc3egyh05yhlw0j973hbmeji9qrtsxwhltnqe6iiz04a2iymdp5cdxoroswivi0zeuaceu402llej6vmvhofutotrxyhkwcqrsy1edv3qstdyr145d0ffj111gmivurha3xczv14jtdabhughi',
                detail: 'Occaecati autem eum incidunt sit corrupti qui qui incidunt molestias. Aperiam animi quia expedita deleniti et. Vitae id reprehenderit excepturi accusamus autem accusantium quo consectetur.',
                example: '20bhiu4qi183fblozcyq3umrs1ep8dbxkh3bkwfbu9mf19bk4loblsduyfqm6etzhmc2fdvu7yelvrq61uak70ivekc8kpijjndgr1moyo1ytwwn3babljv9kz10nmfhu7x5q34fbkkrn2hnw8wmxbd2v5ci3fqq',
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
                id: 'a163e5ab-d7c0-49df-8c47-bbe177d5bc38',
                tenantId: '5b766746-0377-422f-9532-537209df1406',
                systemId: 'f0dfcb1d-30b6-4adc-878c-b25b89bca551',
                systemName: 'ram38107yfcsfv8vpb45',
                executionId: '5cd8a0f8-fe3d-4461-9ad9-b96bfc8bd791',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 16:37:32',
                executionMonitoringStartAt: '2020-07-21 21:54:02',
                executionMonitoringEndAt: '2020-07-21 06:56:17',
                status: 'SUCCESSFUL',
                channelId: '86589264-60af-4ace-a380-4c2761014c43',
                channelParty: 'szrxsc9lnqavgjgb01k6ihlq9g43nnit03aooekwygkw51y8a6xvwgarr1lurtdwbq72gpj8c4d0ukkd8pd6lk3h6uv2gpuzgbj1bgmkm0j2bvvmuvg49b4gh11pp88qrnr3icqaeant2galdg3thb01fcpuiq37',
                channelComponent: 'au9hrtdj2vpx8n4h2324mhi66hgnqicajcxjtzsh0jde8ubh68mqxw6b2fuyhagdw73ttscecdx68egj1sg37e54ixfnrhslbkd9vnytemc1ylwi26ibpdm5v26l07sscblod3kbddx3eevo2zf5z3a4eqbgb0hv',
                channelName: 'pkpnmvzb3w7b51mrpgr415ntqm3mx7ges9anzfj9ic3n49ql479si9jfdg4o5xz83789oxyere8vb4efhklmjvku9c5kf75qict7ruvzql8gzxh21hmzkav5yao8am50j05lsrumorsuw7bve2o67qpid1y0lmzb',
                detail: 'Dicta aut rerum non et ea soluta dolor. Minus enim et in aut vel. Perspiciatis minima tempora excepturi tempora vel nulla voluptas ipsam.',
                example: 'yny95y0rub6fiuuf2tu1pw89txq9dfp5pyjvzc1zs6f21wxfkr1864jsm081wde6yioeau2rn6rs749oes6y6b5duycj5c8419ismtdfaex3uh43uv32g6ix8dn18wp1fa5jq9y94fd3y9znlpihksy1owdyhkgz',
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
                        value   : 'a163e5ab-d7c0-49df-8c47-bbe177d5bc38'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'a163e5ab-d7c0-49df-8c47-bbe177d5bc38'));
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
            .get('/bplus-it-sappi/channel-detail/a163e5ab-d7c0-49df-8c47-bbe177d5bc38')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a163e5ab-d7c0-49df-8c47-bbe177d5bc38'));
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
                
                id: '32410003-ed64-4d4c-a4ed-3ec1c33e7838',
                tenantId: '5b22b51d-3752-4802-9bed-095e0e878085',
                systemId: '08d8d1ee-4552-4dfd-9620-c9ce4a8d9f7c',
                systemName: 'aw7digtbcoursqxwpwf9',
                executionId: '2422ecb6-2be0-4e6d-afb3-ea41a5ed35ba',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 08:48:04',
                executionMonitoringStartAt: '2020-07-21 09:13:41',
                executionMonitoringEndAt: '2020-07-21 16:52:11',
                status: 'UNREGISTERED',
                channelId: 'db00ba3f-bb9a-4978-a5b5-c026c7e874af',
                channelParty: '1gxx5njfl7xkae4c9621d3mh2nfxqulhpofddvitkl3zu72ldq6qltwpcq2jpwxs9tg3gzuzkcaceo73gfmsfgzxueqjdt80gxxh0b7yq1cb4nlbp7mjinw4re7x3dl0plv82fq07hcpy8olqxgthqfqxwqd8kls',
                channelComponent: 'fnb43g7qol7lsurgp16rihlc9ysszme976svji9ko00z47tgnjk4wnemxmpk2fcn1197d3tcb57wqh9fcv43n3oczjq7v8qvsp3j0l9e6hyyolg4oci0z5hvh688kxu54uf1c85hrnd2tfagtftca2657qst1601',
                channelName: 'w4a8hw9pkszo8a3ogjn4bbakoeb86lmnvfx9ywokw6mz3711o1ezk5nxa4oio7cez3crb1nqz854x98q71dei78avlrh1tbnef1qiseqsqannc5isbz1iebo874z1b5i0vqz7ts4d9e0mcqzdtkiiy71i337dtil',
                detail: 'Perspiciatis aut nihil mollitia magnam. Est voluptatem rerum repudiandae asperiores laborum sed amet et ea. Voluptate omnis dolores itaque dolore nam ullam.',
                example: 'sa59hjc1pmwu05790qb94n10omtjp0spycgza2z52h6md5tnvxexq95v8el5665ufsk5f6dnetlrc4owory87fzen53fmd71jx4nexj0t9jwhg0jdtqv8g7kx6jxjtynnk9wu3h8062ptf24i85up8g3m6vlpn0w',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: 'a163e5ab-d7c0-49df-8c47-bbe177d5bc38',
                tenantId: '5b766746-0377-422f-9532-537209df1406',
                systemId: 'f0dfcb1d-30b6-4adc-878c-b25b89bca551',
                systemName: 'y4uhw9c90md9b967vtn6',
                executionId: '5cd8a0f8-fe3d-4461-9ad9-b96bfc8bd791',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 01:28:26',
                executionMonitoringStartAt: '2020-07-21 08:33:18',
                executionMonitoringEndAt: '2020-07-21 14:18:58',
                status: 'UNREGISTERED',
                channelId: '86589264-60af-4ace-a380-4c2761014c43',
                channelParty: 'jak6wibb5shzoz7yglfo11fuwy3tnksfs95q6vq4pit3mk7y9pe4ngxhycb7ag7e6pt4w8j1buwk5k7zv013rxi9o21ijm894a59ridelftqaljobr1b3sntbokvhyr0mvonkvuqv61g7zth2x6si3ubqszw8ul8',
                channelComponent: '87wljw9wv4xk6niew23imywlj3j7hzobf3ekeph0fooiel69nfrk0oy8sicdmji2mplro8rgbs67ix1tx89nrn9j9coc3xely8eiynoixkx3lsk3k2b6vgnxksxecgq7216wokm91fijsm3cbjxocfdh8bjljufr',
                channelName: '91h0e48vqakw9vg5v2zx7k437zi2lsa0sqcwdr4wrjydlnedgx3rl1xnpctxkj5jemwi6zsf9bxpnp0kttjag79tswm1leis5pqz15v7vhwx7i8nunxnzhigtriy90vfxvmfbtqcbbf310a9t1bazkw7z4j63m7b',
                detail: 'Soluta omnis sed aliquam tenetur. Quo et necessitatibus. Tempora maxime et et pariatur aut doloremque rerum sit blanditiis. Ut cum alias excepturi repellat.',
                example: 'wy1c2fwp6cst3ica3kpnym7xy887w9u0xzduhqc3g971zevf6n7tliwyegn8sy2c44zr9oevx5s1isexxl97catpy0dy2ex5xkm9x7aoxktcwnjuebz6n22hik5wiuceyze9hjsn26g4af8btz5inf2lvvrgrvnu',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a163e5ab-d7c0-49df-8c47-bbe177d5bc38'));
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
            .delete('/bplus-it-sappi/channel-detail/a163e5ab-d7c0-49df-8c47-bbe177d5bc38')
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
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            example
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
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            example
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'ad5728bf-435d-41c2-b4e1-5fceb9a241f9',
                        tenantId: '5b766746-0377-422f-9532-537209df1406',
                        systemId: 'f0dfcb1d-30b6-4adc-878c-b25b89bca551',
                        systemName: 'aj4uhchqfixl2r70eesr',
                        executionId: '5cd8a0f8-fe3d-4461-9ad9-b96bfc8bd791',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-21 15:19:14',
                        executionMonitoringStartAt: '2020-07-21 12:09:49',
                        executionMonitoringEndAt: '2020-07-21 10:53:54',
                        status: 'INACTIVE',
                        channelId: '86589264-60af-4ace-a380-4c2761014c43',
                        channelParty: 'ouf3dz1b1y699tajcz2ga80mxxn43vcjuo2f3oot96ugzt9qaycal0qisuxv0li4l8o00jwuivt05oe89jkoz35do6e5m6yfhavjh35sosaane5n6mfvkwez2qs1c7e6lq7wz4xsw22kpdup1j0yyqhk5ag7wc40',
                        channelComponent: 'y860c7pkqzlzemg4lfx2w3r4dsvtavirfe8wfamj9nody5ej1qwafj81tnxf7vv623d7jp4rdmkzrcwpb2kcibd491fw5ujtq05qj3g47ty2vbdfl6au3abl4qsiku3mroav4sfvil2splyh4o3gow830goypmdt',
                        channelName: 'rgpf6xrgw86fbiuf0lvfpw2a089g7xk97vmx2pgk3rnfqwpdlvdyt056eidbyu7oxddzzzxidt84rq214joppae8ssjs39qmiff8ijzswkxh86iw1rzzfsby0lp8bxba1qq4kyxyeu5u1sm1m724qn5jrhyyqnc0',
                        detail: 'Et totam aut beatae eos. Illum quia et sint illo quia temporibus. Nobis ipsum omnis porro eum. Est nisi voluptate hic voluptate ad. Ut qui doloremque quas nisi voluptatem doloribus.',
                        example: '6xkh34k2y3mxg5ee78pds4949jnefaj25du514pcwax87pp89fmox56p0dhgw0rmmcbs7sw8kslruyz4nj0dea4bbcs6t9n950izj6fhi0eepvqloaexmntbh52eu1nibl2wv5fpdk7uoe1c2x969w3tfcww6gge',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannelDetail).toHaveProperty('id', 'ad5728bf-435d-41c2-b4e1-5fceb9a241f9');
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
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            example
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
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            example
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
                            value   : 'a163e5ab-d7c0-49df-8c47-bbe177d5bc38'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelDetail.id).toStrictEqual('a163e5ab-d7c0-49df-8c47-bbe177d5bc38');
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
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            example
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
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            example
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'a163e5ab-d7c0-49df-8c47-bbe177d5bc38'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelDetailById.id).toStrictEqual('a163e5ab-d7c0-49df-8c47-bbe177d5bc38');
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
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            example
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
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            example
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '8b5fb7b6-58fd-44cc-aadf-af370230c697',
                        tenantId: '4e35aa94-c98d-4fcf-947d-ce57fa3d9ce5',
                        systemId: 'db91a764-063f-49ad-bd5d-b33e61300655',
                        systemName: 'ixx4be24134mx00ommm8',
                        executionId: 'c8fbe262-e722-4e6f-9fb1-a152db5540ec',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-21 16:47:39',
                        executionMonitoringStartAt: '2020-07-21 03:56:40',
                        executionMonitoringEndAt: '2020-07-21 04:24:10',
                        status: 'SUCCESSFUL',
                        channelId: 'bdcbfc8b-af71-4888-8906-86bf55274c09',
                        channelParty: 'ekqaosciay8rn1scz559u02pv54w2irryjjmqj2iql3zs5ca0hg2n95d4gnavjkz3w0b0bxfk8zoadmx9i3ocxqsmwuoyou1n8en0gk2c8vugo4sm3fksz8atwtw6mgt0cm55a623f5qjlz4bgg730qei83fergg',
                        channelComponent: '6zzjw05l5rz274n72ewejfyl4a7q5pv9gul0osvmpyz8i2egfvhxlkqpld5eq155trfvrfjd366emdw6azyiqzkch1pglg2q8uabqu03ccwrooiukddyqeypmrwgav4vwqp0mojgao0h7pkih4stopx6c6sia6be',
                        channelName: 'ux8six69qau9wgujegfzwjk3x6nch87mn9zqsrqle2uoegb2jff5xilbuvavr5su06x51onqxhz848htr6b4l3nj0h75gpopj3y93pqmmmfnpyahmchbkvs9kb7og2sbvww7sd5kuhzh1984xs93xhpuiyc6lkaz',
                        detail: 'Eaque nam iusto repellendus accusantium sapiente sapiente officia. Necessitatibus dolor unde aut est quod voluptatem. Qui quidem in et consequatur explicabo cupiditate.',
                        example: '1vlaomf43c7czqvcgghb1fx2uf1f6n44x15fyh50r8jgi5n0zdt41nus8n9de61gyzzaxxxnnppui3xu440zmrohjsb4fshubq5dpyxp33h8tw3noek1ypoisdej1ug70v3f39kxdr97tbsfjgjtryozace0f4nd',
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
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            example
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'a163e5ab-d7c0-49df-8c47-bbe177d5bc38',
                        tenantId: '5b766746-0377-422f-9532-537209df1406',
                        systemId: 'f0dfcb1d-30b6-4adc-878c-b25b89bca551',
                        systemName: 'bisv1y2bw18yd556jmbc',
                        executionId: '5cd8a0f8-fe3d-4461-9ad9-b96bfc8bd791',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-21 11:37:03',
                        executionMonitoringStartAt: '2020-07-22 00:17:41',
                        executionMonitoringEndAt: '2020-07-21 09:26:25',
                        status: 'STOPPED',
                        channelId: '86589264-60af-4ace-a380-4c2761014c43',
                        channelParty: '5ik7d3nvgwsecrjvjsd0y3zzuwpoc232s7fpg54pgdpzxpvyeihotbvuxgfavjr3rs1qpaj2q2tkbnmuru0h2niix54d0s0tnyn63psxc50t7ll2jn0lz0k3f8vs2o18hefojdgncsavitq3st9vm9slmbi3pdcr',
                        channelComponent: 'up62wa02eng4o6o2o8qeblaaogq2h6inhou7ob2m6w4xoha49l492enemxge5at6nq4ej3fb13xa39z9fmk2b43ywcnpek1x0qmeoltuu9k2xdx1eppr39imnjxedfw9d7q8ep2ydr07xopd2cvyp0vxgtav25po',
                        channelName: 'k0k897xyxuwnmwuk4fquaw8eewa7mxfwk6w1fj90hu3zwglpodcqnld980aqmijr3iaofj5lq860icg4lp035mal053l3msapxk5gq0p79df19us8w7q1r21axbhpae0d76uzkzyh88jp1aqkpgdi7dx1jp1kub3',
                        detail: 'Porro at inventore. Asperiores error ab molestiae natus laborum officia consequatur itaque. Aut molestiae ipsa qui asperiores. Et aliquam et. Dolorum et ipsa et.',
                        example: 'k2d4knx0ryycfxly3fs9pc6nnjfd4r8w8wkqu7o9icqttih9knddhmzkh8oekq6bwpytjrp3ltoeg1bejhy9hxaaol0hv8l28zzneut0wh0hfdibegsuyqo5fnz3rdc7ggcx9v3p15uyvrckcryva6oniz505elk',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannelDetail.id).toStrictEqual('a163e5ab-d7c0-49df-8c47-bbe177d5bc38');
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
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            example
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
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            status
                            channelId
                            channelParty
                            channelComponent
                            channelName
                            detail
                            example
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'a163e5ab-d7c0-49df-8c47-bbe177d5bc38'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelDetailById.id).toStrictEqual('a163e5ab-d7c0-49df-8c47-bbe177d5bc38');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});