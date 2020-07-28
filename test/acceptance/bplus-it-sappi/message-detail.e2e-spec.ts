import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IMessageDetailRepository } from '@hades/bplus-it-sappi/message-detail/domain/message-detail.repository';
import { MockMessageDetailRepository } from '@hades/bplus-it-sappi/message-detail/infrastructure/mock/mock-message-detail.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('message-detail', () => 
{
    let app: INestApplication;
    let repository: MockMessageDetailRepository;
    
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
            .overrideProvider(IMessageDetailRepository)
            .useClass(MockMessageDetailRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockMessageDetailRepository>module.get<IMessageDetailRepository>(IMessageDetailRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: 'mhxc63gwd3gsebtxeh3y1jl5rh4kqqqy4dj2nl5hgszucb1qco',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: 'a32u6ou6e3dt3kefwceu',
                scenario: 'nk3bjoa08a293ekqnnp4ri3gah2m33lpgt3ev4yl5w0qhkq97v0vvogfj6j5',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 08:30:05',
                executionMonitoringStartAt: '2020-07-27 14:03:32',
                executionMonitoringEndAt: '2020-07-28 11:08:41',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: '5z7ukpj0ovh8o4oeuzncdm32rqe7lsh26va0ze5zh2dt9f9tufogf7u6k00mat5n7jqcm9y5ndokdz0zc8vp7a6t0zqg7sp63hyousokf91bmc8o1xz66ye8smzv7vnkhffdnu5iobu463xzj07mx7tvzjbbr1pv',
                flowComponent: 'hnnids0gsjpufed3s30137cl38lrjb7irsnmgxduk2dlsp9men7ubo393uurg8z2sdt8y8tsef2z95qm7h6pnvv9qu3fx8lnpa0idq00lzkaf68z4pijojdkgcb74whprzy2so3qaq7y8joskpifvi7ne2suetnl',
                flowInterfaceName: 'abxdyaouqe0h66fq14rzbsuptkz64pqhubo0guppvrsry1myxbt7qpjxopoms420qtavcaas3sb82uowi8xtnxh7kagw2lr92svttdlbhp0kpbcz4rchgn7njw1hyszvk0ky794nyinxbyxnzramyokwpyjd7af8',
                flowInterfaceNamespace: 'u5m7go3t5uoh665cxqq1hf1mq40n3c608zyy1gqhq1zlhfqhvdbg0n1crslhje966xludywvghtk61ihog71m1f5x5eruksmrctq3diwar8vwc8217nzawnjg16qx5fkcyxabn3uimpf7gas5cqx2rexz71b0kv8',
                status: 'TO_BE_DELIVERED',
                detail: 'Aut vitae omnis ipsa sed natus quia est molestiae est. Tenetur impedit quidem laboriosam dolores in. Et pariatur temporibus voluptatem commodi. Eum vitae asperiores amet quo velit illum officiis.',
                example: 'xttvcrpablra19qx6yqd7ugo13fi2rbfckg1hqnlg3qwxqnjil8rbbbdh9n80u1lcp4vgfpbma06s0q6j6o4d1yh9qcvozh2nc60kz92stc9450x94ikdlk3l5uprl39to4znc44zfjvvbf4zw1alc8olor8y2f9',
                startTimeAt: '2020-07-27 17:22:52',
                direction: 'OUTBOUND',
                errorCategory: 'jizkimjlo5colnppggbk8t44pvgfpn0tgdna0juy3lna62msw372iqf3id6fmep86f7y86nl6htmjjlorgyb5c0jyw7mf1gesqpa4rtyfcor0ejnle3hikxkws5miwudwxk445i9toubv6qjqmg0lwid4uuak5gi',
                errorCode: 'k6cmeu7675ffwssd4foihboqjioymg0vu7zuygyzm8kn1lvl38',
                errorLabel: 920612,
                node: 6606001862,
                protocol: '638w3eqqokfu3kes9amo',
                qualityOfService: '6fu7e3iuhklysbwjzu29',
                receiverParty: 'qkj884l0lvia75yvdnmh4aifzbdgmofj52f47jzqb5hey2sxsg6or8d7v8cn050bkwte6l42dn1u54a5tso50vbcumpaiouugwcbbv07cqhyu6d0qpek5ps17nkdo7fcofadn9c5343aquw7s8ezd9w9mv3nzhwu',
                receiverComponent: 'gt8p7xlqrco01wjr19lplvki3438f4zuchbqvzcfy9femiojgeh3delx9cv9klbbzyh32btap1dpaqo0z6jwz0yy99yzsiv6p31is3jr8niaysf34p3j0ikx1rrfn7mfrd9f1jhc3ouek6k4cetdz33gei4ff8jb',
                receiverInterface: '4dkajjb4to1qj84shpqb7zulf3qv13qzmtru42n3d9ua3k0wlvqnvyrtenqkrs8qeq6v45n3r5ej6ctm2chfi531s2tp96gq2gfydzrm53z1xcgyngnct0mmeo22colctfrg4is5nmpx9ioilea4shj59i1z45yv',
                receiverInterfaceNamespace: 'rkgytryi4qr5eiwvqcb6qmmunzrqqjrfxpxzhf1vrlkfahwctz3uoziuysm1178evyvbp09cbf0wlkwb53st9kgg2zpm3u3y0oj0gtygk3y74dnbbd6v72l04p0i17reqjc7zx5453dgvpw0iaxbq2lxsxixacin',
                retries: 8445142368,
                size: 3395986235,
                timesFailed: 9002499829,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: 's81vi1hwwfhmaxvm8ztyi22m5rw1681xycnu83pgbmmg0bl8v4',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: '5tim1vejos9xfo5hn966',
                scenario: '8ij938pgv5u7i0yyqe66x3prv13oh2gbkjhn0xg0djnrzf8pwu07nx5w8tnp',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 23:44:02',
                executionMonitoringStartAt: '2020-07-27 16:24:49',
                executionMonitoringEndAt: '2020-07-28 01:02:33',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: 'nt5xveewci67189b3mrx6vjcyilod3cj0xa4i9qdnt27ujwgx5mj6zci05qcak148bqhrtpkh7zb8cew7uhaeddv6doail0jbj7fxn2l69j5stf6jk2erxvmbqnby7v9s9er6jh2d6a8ryytqov531edcx1ft3ve',
                flowComponent: '4egtjm9icvf2pa4506vlp6a20i7t98zcs89j7lwprisgtepsui4x2o8i2uthpdwfxvgsr5bn8z6simc1ih0zotoi36wyqukfwzobzn7bvt4l029uvitmiav3x5j3nupidhe2bb2pbnu8pyt6dxdvhio8x01qynvc',
                flowInterfaceName: '4b36i1q57ngsph26xdlinnzdfmab30xse3qflx7tfmvseyehyhi06uf6lbysb5y1rzmth06frspj0cd0vem5n6ytmu11rm141kpa9118997ei3fpe2gb5l7rp66pargicn944mcjeni3f97aofbth6xs7hc0tndz',
                flowInterfaceNamespace: '3mstycgnjybjwjoda2hzygagjw9lfjkh3ixvx9wlfouprtkundzzhvub1jtxnkqdrynm705p6nbm6a3k8x25219u8pc4v1v6lwbwaxfr8bzc8j2wcij5ikws69w4l5yd4c3o1tsk8co8cdrwfshwwyw51svg1xp9',
                status: 'WAITING',
                detail: 'Et tenetur dicta sed ab impedit est dolorem nostrum similique. Et qui placeat sed itaque nesciunt iusto accusantium. Qui et quisquam molestiae consequatur sit est earum.',
                example: 'i540sgg9gykrtwyqzhtqepm2hqt556v7tnty479wdcz9ezgsjyrcjxu5sboi40mfyx7br5s75amelxsdw3c7tdiwrvqgo7piizs8zl9vnqc1yknhyv26kwk6v7ryzfctw47kywy8mo1agmy3vyinbaig43mlui65',
                startTimeAt: '2020-07-27 16:42:08',
                direction: 'OUTBOUND',
                errorCategory: '63qsvakgbh7yrz6wt172857lnm84cg67p5joxtmdru58sjab8iaul8jj00vx137j0s3bugpe6lrv6zrjyt56er0puqg4h8zz8o4bkyj7oua0cv4a58wnfh7aql5kft5ai5m5ztt8cf6z5ixjzdapm7on3rmwggcq',
                errorCode: 'zeglvastts3345zz92fygzu3xq22pjora4p0v2diu2yo8chhcs',
                errorLabel: 799606,
                node: 8118674283,
                protocol: 'dy28dypyzdoqoqhpcb4g',
                qualityOfService: '5od5t79hxdf4e5ptipfd',
                receiverParty: 'n1uuxbkuf6upjq4h5osbl5lqtw1gu75ldeb0rmcb1on2cigh6ei4u4pdp17maiqg8siihyf5y2mar94xssqt68nrys54w2ddgr7k3dw42d0buh2yu828azcsen1k5q41fjjhupoj3xrmynxgdnah2vk573xtre9m',
                receiverComponent: 'prhnswa0kbw00mt17b29qqyytxfecl0r1vfsbtn890xxac298ed342lkov70juianh004q9qjq6krzbaocnf42davx9d905eyttsyibjii080szhea2hbtorxgtl1lm6detdzhoilo4rrn1gs0x5uhfo22x6qf9h',
                receiverInterface: '60ydbhgq7bj89hl6569520csywv357n2e65hl757vuanr7tx4v8xaf22kda6mw0wxj51cw1f1bajfskfhn49e7e5v2lcgjg5mjauz3x0b1czxe8s8l0i4epkx7444de58oh80gxe5ctyx3jxg49ykcu2btwwuryd',
                receiverInterfaceNamespace: 'ra2zsgsrp3j26qx5dqyyxvqall9vrpmzjbcjfnv2hgoqrv306utuss442ybqqzqnbuosxm3wp7ipk3ripb1wmgiysv9gz28mne7pa1v7zb1fym84c24gbjfrb63a1d5y4l39k31r3bjadk75eyizqkh4ylrw038h',
                retries: 3988181842,
                size: 7077938410,
                timesFailed: 3300483169,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: null,
                tenantCode: 'vrl8genhkoi3bdki79dyf3kwfyo6up4gho432br16u9zm2u2la',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: 'm2bx8ww4yflu3617l046',
                scenario: 'obn8oa84s936z24jywwnj5lpqd3czrvsxhkwfqdyd8x9ce5ydamuf27kvl6z',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 03:32:07',
                executionMonitoringStartAt: '2020-07-27 23:11:00',
                executionMonitoringEndAt: '2020-07-27 15:56:52',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: 'o7fzp1to0nhgcm6sklkxulsj900gyea1h7etvq1o596xj4w6zsw5dn5zc7ws8tzg6o06lwib5ygzjo051c5hk3f8z80iomhbpnhp5ls437efk8v06ttyvtwt5y9vkvxbqiolferwi3782q5ww7acw3phru3bf7kl',
                flowComponent: 'yf99f8o0chd0jnjf9tnqmajicx80451y30spuez178yhr0bo74xi0iuszwu8cdd4rsw373rxlbe0rsmz3h3bc7e6p5o313da52zo7laj6as1b5fqy9yb1lxcxtkhkqhjxj7ukr6wc0x9w2qyjixege7wdjhqr2l3',
                flowInterfaceName: 'tsjzcg5yu633bf8gicrwzz6q3kcd00gf5vmboz0szi77yn5f34gmfzhwa8ejqnr23obrf55m953vc9y9hm4y10us1thhatwlipdrfms6mjzq8xq6w40h1i6l4mwr99zwffcs1j1wy13oquo4krsg2vsppi1rrzwk',
                flowInterfaceNamespace: 'otp6zzw9bo7l19iw571qtskuxjvo66wtyia1bmx9dht86iu42ey5oy27f8c16b00culoh05llwbulfbswep8fjlpie2q2khq0pjnhzncai4qngb2ocoq2cqcwqq48lbfh0zjbusugspswer8ah7vt5s8bjttfk8o',
                status: 'DELIVERING',
                detail: 'Natus velit consectetur est est ab et nobis. Facere aperiam perspiciatis voluptatibus. Repellendus tempora tempora soluta ut. Omnis molestiae consequatur non iste ea sapiente sed. Doloribus natus voluptas iste et voluptatem voluptatibus recusandae omnis. Expedita perferendis sint deserunt expedita ut quos veritatis.',
                example: 'nqchmyjz8fzvr226wt1av5lowlr5f0r7avwh6nhfyuhootpvlyg7p0d48asu8baym9o7n4g9ve5ujz0rz0bixsacu3y1ifuf0bwgui5hl9b1pzl5h7giyf16xww6tzlyyo59yedyam7gqfetdcx0uc6fhoyh0i3m',
                startTimeAt: '2020-07-28 06:38:43',
                direction: 'OUTBOUND',
                errorCategory: 'zji658i6e070mg3ovn4829epvbn3sfvntmrgy1cg6zqf3x4j5rnyep38b9bubmsmm77oxxlyp70q7zk6z75k1te4dxpuifyzmamn5gsqvj16pqgxhnegctra8e70ip4jlw744hzpy1esm7tntg0a5kavmr0bqdhm',
                errorCode: 'ud33tpd8aktz1wzumtpjyvvomrww1mu6ewut19al94y857xuea',
                errorLabel: 505090,
                node: 3328302433,
                protocol: '06c0s8y1hdsvfpd8dohr',
                qualityOfService: 'lg9yb86wlfhsecbvlbb9',
                receiverParty: '687c1adebqlrz3wlan4vy7yfnhkqzx94eg5kyp11lpi1itqb16ox0io1yknf5tkrtyf0dss7tbqz74lq2nf7uubootrdandpd4ygl9apeepkexav7r04z8oa9jcovocxckwflrqbacg5n92fytz28830gn17mtue',
                receiverComponent: 'yy8uvdafazug7xlas4c4j1feb6ilg4m58h6xnvqy9qhn7x4fmq0fuhsy1svl3ek4q0zqt4szu2dhy10uu11f61eo0nrw917nsqduzp14ij0un8dbf8lawh1atle66kefhcjjd5hplghge0c2lhuvqlf9f6ca36uf',
                receiverInterface: '4mrg788xpcbe5k2c6vrgrux6vpurj1p1w7iehurhx2d9uqxy7w2s2nnedld7yjsuc4jz9lv5xgmst2g309kixkitzd0j8j5vpul32rrlmmmj9fpjvwylgi28f3275qdkxe6b8i8fwwagav4fqhf3hyascd23vo40',
                receiverInterfaceNamespace: '0zdyyk6ajo7r7na90cdn9fmaf2wmm9oo3j8molz97o3gjdllqcy8xxah2da9b7t4l20t7eymivwzl3poqnaxu2yak1jl7pbm9x2fswkk6mym566cq6nvswsz5j8vrgwzijqmq4f07q51ko2pa1e3aws2moj5o3pk',
                retries: 9029204291,
                size: 6234337751,
                timesFailed: 7874902641,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                
                tenantCode: 'vz2gcbv5divzycf4524063ugjjd1ylj3h38mvruofmpd099u1h',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: '5y17e494lwph8oo70vbq',
                scenario: 'ccc9rlej7e60weckotrvxsfr9qmsgk8i00kg7meh1e3jb984can81sss4700',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 21:10:21',
                executionMonitoringStartAt: '2020-07-27 18:33:03',
                executionMonitoringEndAt: '2020-07-28 05:16:01',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: 'btx4152r5xm41h1j72ckkeocwx5gz52r3k01erzf8btuonc2jcvzuk7hphfe55myedpkoiwf9hdovexysarpnqbypywkapd3fwzvleesr4wqndl19pg1rrmx4kfdosx0m7zwprwa74x6pulsuoz9wnxw6ecfzytr',
                flowComponent: 'b04rrng0hdzoqxbfkpmmwfblr4ho4m7h581bgvk4igdmbk0mtcykwwtrgfk125qkng83bth8rfcnobsc9cosi2wktdewdlhk5oytq16o97e9nye7cc10owc744v0amaqywprc0vaei1cmcxa20c553h103o5sh9q',
                flowInterfaceName: 'oc00ktwepfzhgr3x8v59ryi88yfbkyk7e5nkq8a8rsofset4kd53tqj47j22z5391sj9ghn43xnxvbt1g0b0dwj3ydquen0az1j7li7pa84rc2h3rv457e1msq87mzjtd9pao62odsvqxhj5t8bs489uh5a4l5ud',
                flowInterfaceNamespace: 'we6w0weekvkpcsulqt2m3wdt2rtl65za4equht7scwfscmtprw3ktumm3foyq4b1ndk25v6ayb8d2e6adj0cx2s2dmp8yhpsugzdf265dlfc4tr4mq9eagjx3v2dd5j61sb1uizsdfus0n1ros29cnhxdcklpsgm',
                status: 'DELIVERING',
                detail: 'Tempore est ipsum molestias suscipit qui quo. Ut in sint dolores optio exercitationem repudiandae enim. Sunt dolorem natus. Corporis vero possimus. Dignissimos laborum iste. Et exercitationem quo tempora officiis voluptas nisi.',
                example: 'ulewxiac9gqxfm0kkrj0n4fxil9y20998ebjc9wx6pemsxfvf1yagwkqr33i6ftuadxtxqjo6fx6v8engmcrscgfniek0gdbtos29222g7ve78g7cdgsqof0rjwzgulimvhpxkkso1oup6dd978e0abt7oh0ampk',
                startTimeAt: '2020-07-28 07:12:46',
                direction: 'OUTBOUND',
                errorCategory: '4moarcwln24snlc6nwogvdzezhf3fjkqrwslk5h7c8drz81bilcx8o0e7ohgo7i01tfbh0nyngzbkovxrqop9vhyq6x9yubc4dcn8hbpp6xdm56bk5gxwfu3zfppho33w5l83mbac0sobqqve2hed5em24d3gssd',
                errorCode: 's5pl1qrgbqiotnok7vapl1ag4w91qloaeux7ai7b3re925k8g5',
                errorLabel: 236931,
                node: 9881330463,
                protocol: 'we6o3vdzwo4hh85r78w8',
                qualityOfService: 'z5j1q4e29jnb2nco88kg',
                receiverParty: 'vv20tpy8rzw1mgt2tmfu18ft69nzigvh9juqrkqjsd1cs0s5knjgafltm17wmzthpotv1vv7jsd3uzgkpdwd0q7zbz5u3hpc4ow8e9wrp4bffbndeug8s1ambu1i9x9c9i56tooddcpizd8d7ovjnkn4hj1jqu3x',
                receiverComponent: 'yqpmbjut6e0pa80twlqg0fb2x4p3qql7ckn3f5govftc7w3agpvkitxapjqgz4ksi8360d0gseg7b41xjgz54mzfl90glqita5oa1yspqyly5ccqoshio2sdhlioil3i5lmyhfjfjns8tij6mk72r5ztlk9vjgay',
                receiverInterface: 'urbpr4i84jwp3pj7wyqi10vi5rm2i4nedyd2ylqwkzmka6dj9e0xzc8xe62k416cmjz8vg2rqypilvozafhbqlpg7x6yf70oou2gcy1sq8l3zi7yxnoskmetzt3xk0ikee8slpzxqxhemcklwai2fvn56wvcgonl',
                receiverInterfaceNamespace: 'go7s8u5ian0z3vfhiiekli9bcor65hcdo407go8iaqkozbe9bs9f8o6h1v89equr4xv05cdku3otf2v02oib7u1qonho1miq6t5ovvp75vs45sh1jezpkx4deccc9gxcc8tvxoe11kh1da1mgciaqizqaezjm6tr',
                retries: 5691437166,
                size: 3556638924,
                timesFailed: 5752603248,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: null,
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: 'l0ktltjzs1un4jzldqis',
                scenario: '2aqscfrvsab2ba1pg0ef4xwi4dlwzazvs0oc6wjyjf6vw0osm0alsyc0p0e7',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 11:55:14',
                executionMonitoringStartAt: '2020-07-28 10:46:30',
                executionMonitoringEndAt: '2020-07-27 22:50:25',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: 'uxb2fhq9gedaj72bwcvwtk5rc48ttl25gd6uotz8n4jjzb2mn09w2gdlerw9yiib2q4myn6bulyeh7hh2a1bw36zn2enwdygnwlw3uy21t133k0h32mcd4o950mler8mi14ikpivxrm125szfe6mbhwlrpijoxpi',
                flowComponent: 'odvca8pirx8qqd23y61sa6eogp53ymxrqlr8oqytcq23k25suvqrwkxwinz7v9183klpyphoa0fg1taw6hnup88qxle1pxf1l3esb7y3wnia8ukmjmt8bhu1pxd2yyy2bm3k5ygxwyjaryimgvoyw1hhyazhepmg',
                flowInterfaceName: 'yt9hjkgiqyc9xrvgjpj4p35bs450ceupdr46yptgfeixg9iuhk3tejoy8qi9c48uvgzdh5mbyoaf3vabohr0dpszcdmkg2lngc21r6z5nyr1f1hdc03698fyah8wyifut2vbohn7mhg3w6y1ujxshlmca5ooo45g',
                flowInterfaceNamespace: 'fw0cq7v3qyv81gt7n338j1bwa6nkurdfpzykbl71j9yh66nyaux45n45gx2becng9c2sanyl0nmruj08uxdpwt2l4wqvug5ms4byrhygmfhc641ufwh81ad6i4xdoet1rzwidodl5z5ydkro3zm1n8rby2hl6y52',
                status: 'SUCCESS',
                detail: 'Assumenda et animi aliquid et facere qui ipsa. Natus sed enim et aut. Quos consequatur laborum velit. Natus commodi veritatis quidem unde similique est facilis iure qui. Aut voluptates consequuntur placeat explicabo ut autem soluta.',
                example: 'g7y6249fl6pz4vgfpbr03n5h5chuvmy5fly532vxmfxkulih0wtxzyey5eobjy6tagz9aqhrdyjx43a5cwi7u35d5df78xh8tpriif03y53xsghp4frxp80fjwixpoklehuwlnlvf8bxclzu2oox0y3fz75rc4z2',
                startTimeAt: '2020-07-28 04:25:36',
                direction: 'INBOUND',
                errorCategory: '2eemnp36cp8i0ysjvltel2l6mhyr2lqhtpcn4kz5wm48cqhlniolg21mjq6fiw9gr5v15n7erxewkc5hosrpfkhmzcjgom5kg94jx3zff8gl1h3250mq9l97kx1ke8j14qxdg1hmx4hbyg9qbgft7zwucv1az7jd',
                errorCode: 'k4bsazjvqbj3tta4tq1a5ja0lhcxhc87wu3aa6ciq37ovyms79',
                errorLabel: 372705,
                node: 1782761652,
                protocol: '9kd47bl2tuyv6eomjluy',
                qualityOfService: '0pzpt8c0cltbgzjo3xo9',
                receiverParty: 'evhjtmiyjsa7c96sns2mr9wu2vl7d11g7vck4yxgqfajcvwk61qwehvl05ypf9xp9wea9oy5z73r3c6l537mb202uxj8jr9ryehp54ttlr20rd457hjn7ny1pglajnvvu2z6z5fgu4zhx5u5xgthqw0k9xq4d6ze',
                receiverComponent: 'wkmf949tmnrfhzgfzf78lurxwqehr3mbpmqiynyzssbb9u2ne56oe41pwxndokiyxlwt4ww46dgzbi7st5aqwc2pqxbz452b7wqlws9sxpg4hxlke4jehj1u7y8k1eo04tz0oare6k39inb47geis9oqacd1cn6i',
                receiverInterface: 'qunvcx3o6ah872if98ej5leyng0ixin6bfetiqdxfxruil1y34fsqfnqu4ggbcjcocyve2ueksrsgqe8dvkyyv12ruxg991jpwrhkvz4dtmanykh0k8w5pp1pjlvtpilovw2qde6lj8yexc92lk2obr6e6cqlvcw',
                receiverInterfaceNamespace: '9r7z5zbk6pt5b9ihjluyo645qak1l0722etbal0nutlr3wcv7aaxs92pdxum8fx5vwvu2zf29ola71ze31tcdcan8j19lopkrx8j7byevyndv71aw1g2kuosksufd954loju690tonexoymnvjozgd906khnzz1g',
                retries: 2057417208,
                size: 5453855774,
                timesFailed: 5376693607,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: 'ax1ytby9t52gnlwql9qm',
                scenario: 'iyit9ns097ix3sy2hlzsrinmq61sgccwe5xqtl8pcchtdhyv9smcmm3q7urv',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 07:20:23',
                executionMonitoringStartAt: '2020-07-28 07:37:05',
                executionMonitoringEndAt: '2020-07-27 12:04:25',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: '4ln9bkv42pnnpy2gv1kfm8t1i30fgqwezphtaiv1e3ecnzh6ckui21gt8jpy50d7mm2kbwpdnxwmsbys5ki2ensszcdsg3igv9cy5416b2sgqi2zve9hw4ihwpqo69gmpvomhwa5znmk0zcucdk5pj0ymc10fzhj',
                flowComponent: 'tpwpxk60lshrf558cww6azv786wigue1ms6kv1d95d6jfz6am4awnid7alnbxj1ta5ae0zk2cmrbvsm2mk15ivz7d5mf89rgn97uaxk8cjw92q788uprw5jqxmbb28y7dmozxlq2z512384yf7c2rvhc4ag3iz2n',
                flowInterfaceName: '27fb2qylvkcozhsp99bbyk3zm685458ufsw7guafp0dhp1z4g7z9jveexlczdgge23rf9m1psfepa6ss4vph735yn0hlwarn5kloakllg25t748afbexvaaqrcac07m3y6522qbwt6lbuabooikx6j4b5u5m29xq',
                flowInterfaceNamespace: 'gdro9uptavsd9wipsfvgl136roac5r16ih7amzz1dpn36eq72jv9rzwkx438uujgu0bnlvteb6bz9iwrzgs26xrwmv6shfhbav6wxl0dkzvo9b1eyd2y5y45btirug2t2p86ijlvo9ywgpweuaoo1cm8q1a0qb7u',
                status: 'DELIVERING',
                detail: 'Voluptas quasi dolores recusandae est nam iste quos. Dolor facilis eos eos culpa. Minima dolorem non. Aut est perspiciatis. Est incidunt quisquam voluptatem autem magnam dolorum commodi. Nemo ut natus ut eos laborum esse quibusdam reiciendis.',
                example: '86e7soksg4yrxbwpe1m1x1r42fis95ao20b70xi81rg1gf6u7txxm7cfos5km02kqr2v9sb45r1zojuuuph0kq4bvuhdh8r6blgxxaq6oioaxswfa3h61t8pb77igqyh2ab1nc8vfowuse2l3d9pprz9gqze7qnr',
                startTimeAt: '2020-07-28 06:36:25',
                direction: 'OUTBOUND',
                errorCategory: 'b1dct68g5yoflu31ys4zvj25g0ya28xii4bnol11amuxw3wpkzgr1y3uq24fd1eoeq2olqhedm4t5dnvtzfijwlgqrw1bt2f3wmr5xc8ov105rfzt8mfk5o4vjr69s03liwy0w21kjhrcgz9k50lqrl3dotpbz0y',
                errorCode: 'r8ho1v4orjjoqx8yck91wy83qr1hn1hdaq8pqc9kiw2361ftx7',
                errorLabel: 931953,
                node: 5863843492,
                protocol: 'qn6q7j952yxun8a1ohlh',
                qualityOfService: 'ju4z6yayis8kwtde65zk',
                receiverParty: '3i72ni3bcoljplrulna2cqv4sfud9qhkrk4js87pq9hi3ymaru1lhjoul4bvyapuyavlfjz9bm2extg8dtx81c7gqbn9f4tnqmp57cf9u06mzaysv4zu4pznomgoxd99pjo5wgtudie9eof1asu9bteyoovlsf4q',
                receiverComponent: 'hh4ti0gtd3dyhnsy4fp4o9ukcuy74jwzr8ze6n7rytf1xudgyix4pvsjge03ni2tkdzdi3g6ox5pjgbd8nh112vxwyyl2v6l3v3g5vbf3bvixea66035una40wy1yjkjh6xkhv5grrw13t8mzh4poiejkciz3lh3',
                receiverInterface: 'bnqa0gmop1jqmvnm8gg5vak8wkzxk24niirf3htuzwkeh9xxsmmslsgk14ip0k11dx3vifx7gmwq2qu9o7zkmy820mcneqw14dmenx5x2vj60cstt1y3py69z6k62z1kfw83ywkqa53sf9syhsxfh6fou1k49k8b',
                receiverInterfaceNamespace: '5cjffnki6vhj4g59anwz8f04sq3xuysmt3fr7388w8hh2mfqog5lp42gzh4qcy7cn5s9mtfsb4bn3mocfo6i8jbv75fk4l8w3eagtb8iqgik7qrtd7eiuszefthwngq1ly8sufpqh0q5wkupcsr5iyluyium1x43',
                retries: 6615699143,
                size: 4514822978,
                timesFailed: 1482224643,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: '8eh8arnsrzk6us7kwdn8cq6g3v93xkzhk8ws8br09osc83aczq',
                systemId: null,
                systemName: 'oehpqxykin4xe15b13tw',
                scenario: 'z3z7vthqbf24uihskjycmz3qk34dy2hjjkt9l5xhfm49uf030mjtjnba5r95',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 22:31:03',
                executionMonitoringStartAt: '2020-07-27 18:22:08',
                executionMonitoringEndAt: '2020-07-27 22:28:56',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: 'n5vwwnu0flnjb8al0ieyxg8kmqmh0jq4rbfz1j5ipxo9cbhxozl17qppptdr6o7urrz54ssl0ck681q2mf90wd6hkg6juqdvfwk7wjib95vkgsucvv8bnlaet6wxobneryxsmre226nuty8xx6whz3la2pdi1cod',
                flowComponent: 'd151fha4ju767689x73n88uiev633ta3409ln6kshf1hrps591vthctj5mcoah6wcth4bmuoiyk9rb1h5bim4oyduq3dy0skb41zlzen9cyzbbee1h0o9tc89q8sg56euh8v3nb1utocno4egpdo4n3grpsg8t6q',
                flowInterfaceName: 'kkvl6btuay90yvg7lurnw9ev0nxrmn6irk3d8i7567lxcvckrypm0x050rb2my71wztfhtwygl84fo250wmw3ez5v96duxthcm9mgx7brju55gvclxj6kfx27u4o28qvf6ev1qi0revesxld6e3r8akdh459n2gx',
                flowInterfaceNamespace: 'lsjf70hhg3sers16kcmteqt8z31hmzikx13xblnvtbdgwa1wyv2e5sop59tdswoifpryym1xi8mlxstu8vl5rnrgp3azkgy4cxkc77sypaegwhli1h7hgsnmqatn8iapqgm5gd8ov9574n6uwdf9uoejbnez13it',
                status: 'SUCCESS',
                detail: 'Dolorem sapiente sit officia voluptates. Voluptatem expedita enim tempora aut unde et. Consequatur a in dolorem nostrum inventore rerum nam. Ut fugit doloremque ex velit ab officiis omnis at dolore.',
                example: 'iztt9mktpcljlssd57za9auyne12sm0nikdi49qop1wcm7griq5q1lcc3zdfal0r1to025yb48btdhxcpidj76vtjczde80zr8zlp5b9dttz04hvuiwphixkgn3ig0ok1st2pp54kz5f7r23s0ln1im9pp5scgm0',
                startTimeAt: '2020-07-28 03:57:23',
                direction: 'INBOUND',
                errorCategory: '1b7ifc2k9tu34wpg9obm0nwvublzgzywpa6c2bdcka2w2vagddvqfsyroj63nas9z0xsf3w8bpxbcw23iscxts0pbkj4v1lfodlczvzvzasxu8uj1xfc4hop7sbza7sjqbf4majhayndf5nbd2atk4b2p7ab6m5f',
                errorCode: 'ftsebzh42ndmdg3h4akkppwgkhj4hze2254s0yk045ptkyxrrm',
                errorLabel: 711975,
                node: 5221178032,
                protocol: '2fqnvd8o8l3t1ca7rx50',
                qualityOfService: 'owgcy6fxcs3wngtat96r',
                receiverParty: 'afftd21c2ziq5exefrmei9zsw0afmls772zex238jsbq73ltvjywy9ypcjkgoc6hb18cagf954j1doi99uczfxi07fnrvmak0xbl8k20xzwfw0vaj0rmtn83svuaq5ecd5apqt8ndpvgh0f6naslq3xvg6ro2yh0',
                receiverComponent: 'i1jbwlxyk1sk2tkcf6ffs27wqdl87hzb3ah4gqunjwzaifnxpsnk23h3uxte06yxmm42w1yxrhqobgpdalfp2wfsh0uj51s9fcirwfb5iezcd431mvbq2bde5qciulkabn97chj7ojs3jy5j2uw3qf4towbipwsc',
                receiverInterface: 'bniafaxp4zrmhfbneaiby063r2hehi7rygwpoa9prk6u7zxu2n85pzxd70y4eu7wa45hc9zun8vbmoc23la0ad9gf8v32zsbglaqml22k6c51mpi5k4k44hyrspnqmzskf5kxldjg0kx2xrwnpaa8n7aog50g8qp',
                receiverInterfaceNamespace: 'hdx2gp22l6r4ksieonh0hh8tu2xjnncr9j951wxvl4jg7c8mypl9qnluvqkkeyk5xsl9ocodypal0z55n0spjw2r0g9emfp0hbox5d2yn7ufs9b9tg05ao0amfzg95vqdqwxcc03nzzpfzefxlr9nu5fyn5y93ii',
                retries: 1245989483,
                size: 4628056571,
                timesFailed: 2449451037,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: 'h8pewiabla8z9w06ww8jmilj4l9uree3k5uty395ufz1i64k3f',
                
                systemName: 'z2i88qxma7hn6xfoiv13',
                scenario: '9y8h6p5x4zhkjhd5hzzalrr0xba96vkunfzpub2qeyyrx0q60uihcq344mg5',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 20:06:06',
                executionMonitoringStartAt: '2020-07-28 03:27:22',
                executionMonitoringEndAt: '2020-07-28 08:29:47',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: 'o0yswohuwy9cl8jtyj9lv00l0yo26yfsgh6y2h3y10ahfytzpeityvz9iqyqaca3owuy9l8gb4k9wayxw2adcp7bqa5kg4c85jk9e8ryqdl6xdgny14ebxjqtzhp4acwnwzhgrqw8ewsmpm2yoihkis6c2hiauks',
                flowComponent: 'ykxlllgqbskonexarloqjgz9t4zjpbd4o6svizac6h89q6xgtfzhee2fp20txms356xcq6y0qpm55t43d2bwjtmos65y55x5xgmfhqbxt4gcamxppbqza5r233bsri8qgs4x8e34po4zf6jmpp0cyli2efdh8p02',
                flowInterfaceName: 'yo2s6s1v6u8uwz096ytjvl02r3yasja0co502es8kkgc6og4oltokywt3n09zji9owdjt3a3cebslqxugumu7pykpo0pbqapio1tmw9gmznhbn4vseg3i3mitta6416sivkjfysilsegs8kh8aspm3aogloeoqc8',
                flowInterfaceNamespace: 'par632sdxwg97ml9293lw8m85kr3v4ehm8rjl77srx154ksd5oy93ap82exc1jn1zyhc4dlsu0694wk5bs6uwu7mw7216n0luq7501d31as93gpwrffmkkmdt2eigm9l3vybe7w0uv92godpwl3bpnkyei2jcs36',
                status: 'DELIVERING',
                detail: 'Soluta consequatur quod voluptatibus consequatur accusamus aut eligendi. Voluptatem error quibusdam aliquam sit et voluptates est. Ad nisi enim ut aspernatur eos facere qui. Illum eum eligendi blanditiis est doloremque quas. Consectetur sit aut fuga. A exercitationem est.',
                example: '4fi2shq2yn5679velgpu03l3cxe5l3dnh8wfm7xl81799v6v559ih84k1r5g0jxbjkavm4466rr4v1p8buntkkvq1in10uwl2u34823sx7a7sfkkbw5nco0yrhgyvzr0tidihh3x9ii4dkugg62ywu6lf6hn91yy',
                startTimeAt: '2020-07-27 20:17:25',
                direction: 'INBOUND',
                errorCategory: 'q1e223xybi0i9uld6x5bodqr52on71pglp29z45mlig97b1c35mb7jcv5125r1othxyermx5shmpt03hkoko3cugfx4kz521fkk3ovzawaty0wz558jmfx040mxw3mlta2dggq6h333grax026mz2tjf8xsn9obv',
                errorCode: '3pxy2eqwlrkzt2h0hq9dy9w93ujymj9txbtbls4nz51v3dgqax',
                errorLabel: 585953,
                node: 6859951093,
                protocol: 'x4q5xta36m1m4c5ychh7',
                qualityOfService: '4s5j9t5jrhs4hd7iw50v',
                receiverParty: 'x51fbono45xo51bi2masaworkyz3fc9the6zlnbo1w4fg1308nkyw9e5o76cu0b2uirrwygidljtsgzbef68wqxorism7dncv5xfrf67utv9sj2m0olav5cvn5xtlpjgjopa65yp7u4jupbe273t0maw6mjhrblf',
                receiverComponent: 'qrdx0rfo7qxxe9qvj71e7hobb4eb01atpq3obootcvw8f6hgm5m53y579fgdxskgbfqvlxp6y0jmos1nar7cjd1nuqia5nl20prkxpsq71x5i1tt2fgig6tz8p1fl6dd6hhtmmgj57x86003epu3am6b36k5em0i',
                receiverInterface: 'w5vc4pf7kped2rc7mhfwk2uisi1uoo0er006f07z38gwl2ayi26f16fiophl8jtemdflhvjiyymqac7mtm4214f9xoscpjan60nb56wluytjvtxh1aennjvfp3opi78le06rlsdgfad0p7dxk140hgvsvdl699u6',
                receiverInterfaceNamespace: 'cwipy0r9do9i7xjjbsjw8mzuex3v7iljdnwvzbgf1ozsdm19f09poodq7jfezipn6kw6lumzuou6gzeu8sccuns64v3mf395kv0fc98eml7q2vva8m2hmcmnscw60dc6lda6ryn3rbwiom21pin8rl7naomhs8eh',
                retries: 4153092756,
                size: 3360841467,
                timesFailed: 5459714713,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: '1o0bz3pavqp536nbw8qj2wolgcqt6kqaxplun4hjac8e585e1k',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: null,
                scenario: 'tafmq8qk0d2ey5xvdn0hhixavpq0ymx4t7w3rrct12izuj4oefsjpluwafv0',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 17:34:21',
                executionMonitoringStartAt: '2020-07-28 02:08:38',
                executionMonitoringEndAt: '2020-07-27 21:13:32',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: 'ejrl9ra3q20wggazs8mprupyb2wszodr1syxhd08n6cn09kk35uenx1lym9w6qhxaihoc9ottelotxk3wslpksgxktyj72u959b82ql9oh7a7rgrpp0flnkcjpco2eocbvsdfpimqofiy5e9q4q9y41rvws34a70',
                flowComponent: 's8gfj4a5r0fpxcsje6ju2g2eyubbzfat3hzj8c8st2dejkvsytd56tjzuaqw0mok0uj8rvh5yuccqaw8dyuoq3takl6h9y3tekifxuklq2uiafbukvr2597t34ug3mfid4fows4fc3gkox5yfprrb9wen7jtlfeq',
                flowInterfaceName: '4lw6f1rr09iputu442j8c76jj1917ga7el77y6w1s82e6zoh3sq86dtr7zmuk3vthvjsjgx00o3y71zjob5mzd2w9suucgszfbpcptkyv4hb5pjn47nr641jtb8h1x6a9uo5t2hjvur0ge0w3gvqxyxj8579ll5x',
                flowInterfaceNamespace: 'juxwrjcpqi5akk3hethjwq4zkb5efbouvh5r9e3csko0b0xvbgzkr1yl4kulyyzj2l7xvry8i99yeno11ju4hdgnlv55cwtg2z6oxan8deqxwuy1ln5exrv27di8tzuc7ylv22qnqa9gy3xt55ra6ehrx7e20onl',
                status: 'SUCCESS',
                detail: 'Nesciunt delectus exercitationem officiis est sint. Qui ea neque minus. Provident veniam dolores.',
                example: 'jgjwcadzdef65dv6w1nv3xqyy5a6w3o2zyknljvz772coamxs8i6m54bdggbgs5m7uvw1u6swxjfjd7nxszfoike1uqsr1r2qr13qaiiyiiwv125xuttbjftsucxn4zake31lwgfbfss76oni7j63bducoqiazff',
                startTimeAt: '2020-07-28 09:17:15',
                direction: 'INBOUND',
                errorCategory: '62rb8vkzd5hjaksa2hb8qbw74axqqjcepojxfdc2vglyv9hihp5b1k5br7lo6ety6px7mb7eu00d91haor7tuuy5umj7l4rncjj8ieqvy8hi2jal65vrrthzk95rugcto2wpk259wdph3zu8kmc8w8bb5fip8bw4',
                errorCode: '8jehkyijmt4xqmmtffl0smmlv2daasgij8que18vwbchn4d36q',
                errorLabel: 609151,
                node: 6077283598,
                protocol: '34v89pnu9cruiyp4vdfs',
                qualityOfService: '6w4by0wgwtov27vhbdfq',
                receiverParty: 'y8otvcu8y5oqgwdhor62pds80zaze7r6whg8p7wl7s90sai8tb0hrtpafcnd9s4c4be8mj7d29hg25f2b73l9zaqpi7i4abkuidag3lgit03awu6oq2re2wnw8qvopn1qz0mwnb7k0f39z7eqmbv0xt5ean71n3j',
                receiverComponent: 'dzdebo4g608fnzzhsol785syrizrtn9jxufsjh33ymzunjb4e14eyec0vkdf9hjqpoakij195mlivjrd2sr4cz6e2xg5btvpmzkat7mmyu1w6xqrk6fmdkg3qscpiqw8ug9qjwayww5wgcjdlpeprm52hv4hbkzd',
                receiverInterface: 'gp03j4ulkpge9few3syg0y3sqpdry1m6nzpvr7c5ggc81073cwnnch9bwisrdq9p8d4gvihz2gixzrzhn93ybq8svhnoi3kxiv06gowo041ckrulnjp0vbu8v3ghc8vf0oo9cxz82menjtft29dc7dyhhivdv9ux',
                receiverInterfaceNamespace: 'kn5kzll1iiczaychn0nhj42pngd19le8mkb0fnadq04lvlyl2lln5mdpana8ab7dwlii9grxdy39fzwzw3ng1wi0y4dgcy12qsm0sjavhs14z1cp2y53vpnvspk8kof2od8zlffquw7p8u8fe6tcum5lqewewxpf',
                retries: 2828259331,
                size: 5123225611,
                timesFailed: 3957528204,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: 'uuqq2c1hxbif5o6oxvkqrz80ja1x9cwqi6vm3n579pqu36940c',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                
                scenario: 'u08bh5k994tli2zyccgcuiv9dgumwduy8cbrema6chs3yoh7c6dbbrgxah29',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 23:53:10',
                executionMonitoringStartAt: '2020-07-28 03:40:09',
                executionMonitoringEndAt: '2020-07-27 12:42:58',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: 'riydep89dqxxatpb4nouzj6ysvkf1rjlyiqiivgofd3tx091da4equ63zhxlc4a8fhndjhmrzkax7ov48y7y07q6bi7f9tgifmbviiwro0wkokyvqqv1pfshi1ao6e4g5az5vazh8camdf3z93ogwzzr9fx7x2a9',
                flowComponent: 'x1o45whexvm0vryu2pzshhxlhyyfw49wlsbg8umfe7jsrqyjmd1yb1tw8l1utstt64e6hyfqggl830gc8hh3te4hggknqsgs9ktqe2nrdmp5dou8zt5gozc2x2cmfeuaryoh2g3acrgbn17a9gskps9g28bm8q5r',
                flowInterfaceName: '807xtetkabp7az5yztcqorle2o7re09xk0tk4rfcz3o7kd5bnu0xxeqtzk3esv2fx1iuts9kc31s2bqvp5qarwb6flm0tl9va17qqv8wj7tcs3ndjh7rnlqyg80kkknbgl9b6f7nar79c1huuzxf1xic5oxxxgwq',
                flowInterfaceNamespace: 'cwre7p45apv61ymumgats090d6cfhcjfpg5a891rdgkomo0l54pnaetkcbs8fioto3z16eyr106v540r7hyttsm41mtb1mat96mtfdfxj4yjestjzy1cvx66nixcoxz6c1nv5rg8jep5s36j2qgrssz09axhujog',
                status: 'WAITING',
                detail: 'Quidem at odit ipsum vero voluptatem. Hic sed sed dolorem quia illo sed voluptate nam veniam. Velit dolorem cum quis tenetur eaque est hic dignissimos facilis. Quidem fugit pariatur quidem nihil. Non aut pariatur sit reiciendis rerum sed. Aspernatur dolorum laboriosam id illo.',
                example: 'mzdpurdb9l7c0hf6sbpsiyv0zo9df46nl8u3dxkqzm5x60llw6fimhdp7ftwkvxb4hcdbaa08uukm7wwwudjjyhfzeg02jkixxwvs2zgy4uapvjczwdpls1tet4kodbvdmqnsf4g6lhm0yc6nt2nwfpy8vu2cjgk',
                startTimeAt: '2020-07-27 12:14:38',
                direction: 'OUTBOUND',
                errorCategory: '8v8ksnm7vr57szv7hnphkerg010o5wli1qm7nk2kzgnt5o1vhcxd09d6f5ak80j2lgot4m8s3x2f04leb7acf8i0xgghj7rzeuilsc9iplwnwrj45fquma2wb9ka7f6ltsszt27si6qtyyt08jcqr819gvhyr964',
                errorCode: 'yztgc716kx5c1v30erzcx8rjngar29hczl52o124c3vvpj6ogd',
                errorLabel: 106390,
                node: 7692564036,
                protocol: 'qnb29zkt9dzan3ab7s3t',
                qualityOfService: '2exaz44u6a7lm9kglbkz',
                receiverParty: 'e8x67av1dci6vlizxx1sfut53da6llpq3fapf6ige6smofjebb4c3o7mwpvgmlpa7b9k8n8mrf2qrzk8x2hdx3fqcv9irnr8dma76jdfieeh9h1l66zh78r2dh3djq4d9k72kwsycgcjoa9u3mpb72lbhhpvuetv',
                receiverComponent: 'guli0fe7i4tihmqnwihq7b0m2snezgbi5t31ongjcdesfeugplv3u5x67ybn1i819m56v03ws9oleo6g54faqjq7c7zd8ckugkicw778zj7mcaa0imwymdb1qpcd7vtbmjjk6x65ny1p2c1blyfhnfsb6yhq9erz',
                receiverInterface: 'rpzbfnmx5oaghjujff0sn264c1pjw74ngzic2q056h0uamfgjz2lsokmx8kafsctbzwocsy4ouoicbr4p2fiaanq8r46vlarcfvvpouzhg6bfase2rcivv9zhl496jsjnwe70p8vdey63rioadp3qh5dllk6ct4z',
                receiverInterfaceNamespace: 'd82f81su4keju97uxhv7a54k1e0f3yxl8xr077nw2dojvvqn11m164zt7yx1ksf9yk41zlx3ex16c0nv78e8y86gd6pn90jdvthtt5cequajdz4hu2oyuft19syko9l74wx44sr4nn40kymvdosotz74zbwmc3cn',
                retries: 2517295149,
                size: 1856230373,
                timesFailed: 8392629255,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: 'x9ipb8ob37yxx0349clvaqkzgq14it5n2bt66021t0fpvpems4',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: '4w9f8biywiu9ylnovnnz',
                scenario: '43hplztmebwko1a2oajd1nfwunr822zeaeb1ipqulozwu47woq8i3iazaa3b',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 10:14:12',
                executionMonitoringStartAt: '2020-07-27 13:33:10',
                executionMonitoringEndAt: '2020-07-27 17:05:03',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: 'vpw8nu1sk1kzqpnb33jds7sf8wd5v2oqn56w57sa2t8vux3hbsxzy4cnx3xnk7o6gkla1qihs9azae5mmsqvxm0ut91xtdc431vnjjo4qxbwd5ibo9iwil76w1amn6wapiuma2p4pbttgtaqdc6phos2d0jq6d55',
                flowComponent: 'jiu7r8cfdxxb1sww5mv45tp9gjy8am9ftfqagvo4bycjh5gzu96a80px98tnp60ggh9oj38c3f2as8frvalso7x0dw7fwpdc8b1fj5g88hjewylakla5zd7l4osbfqngk6jawsot9vl4259xkb8qk9eg4wc9llii',
                flowInterfaceName: 'dkf4fu32r6eyj16y6g2cp5mbqok506c6rbfhjd1gqhbw9g77d5kjk81p27wd3b4bx2dxs2227t66zlv6g6b89zvwq8a0mr9m9ncdb8xwqr79byo9tmqrph3fff9pjqpnfgwiat6w864f1wrm707dov2mrz6wvfvk',
                flowInterfaceNamespace: 's2c5rdsugz6orotkgkcbaucrv7fwm94xq0z16dpejy8x17j44yooo57z1rhok2cywrg4oxzmk2phgcdhes4isdb1luwqjonknqkxsouas0drhfa3qi4o7ayn5fid664nvkzi3rp8g3y7cu2jlxse9seqnaioobg3',
                status: 'CANCELLED',
                detail: 'Hic ducimus rerum cupiditate. Ratione aliquam exercitationem enim pariatur est dignissimos nemo soluta. Repellat quas dicta qui ducimus nemo. Veritatis cumque cumque molestiae iusto inventore et. Repellendus repellat alias. Natus vitae non dicta libero.',
                example: 'xb85u0gpsdw0wb8pu99qdsqjsjem4la2at0yq6716jnxf90qhx5xks4fkhzhulmkv7pvtf6lk1p98n6g4e7g29gf0nz3shuidh9qbv5rwjxxt1dq0b64suyt7nipv4umbzqiidmpl3ghpko7mvyyzp461wgedk6b',
                startTimeAt: '2020-07-28 10:55:00',
                direction: 'INBOUND',
                errorCategory: 'r6lc2g9m962kxi7k1revvvqw2pxf2aswk6j9nmcsgesxd5k6qaicv14x95i6xlj5rh7d4c7x3vgkqcsjvn5yqsz6m75mwbv25mw0t9czj2sccaeyv5gzvjws14up6f2kymde0bcflnjhyno12ygwt18rite3syvh',
                errorCode: 'bfjo6cdlfod72k545jh99nmtbvkos6c2n6axk3z0tfi27r7lzn',
                errorLabel: 217029,
                node: 1707769905,
                protocol: 'w2lu4evbt8pri37p04y7',
                qualityOfService: '509dztzqwpk92uhn029f',
                receiverParty: 'pwig1ty37mvksk4yg7j7m3rlp55ms1avgbu00e9dy3xiyvhb05qgamtg5jez3k0xh5i2kf494eywmwm2282rthtc337xf11lyziqaiohzu03261cr1eaq3qximf2pxzsavx2zjzt90n7aaubsh92ukyinu18nesw',
                receiverComponent: 'ubga7pk4tqcu234ukn9acnaq34lruusr1917ujbxyceh68rmmmok6g91bkkk69zkfwwby3swt44rhel4vhoxttuy7lulv1vnv2fd1nvvw4wqce2bit605t7qdnugadrrl2odhq5v7cc9c5l6tmvn9v5qx71558pd',
                receiverInterface: '9vikfxv7vz9num9453q0hohdijd4cxzdion4vu3u52st5pr83xqe4i9jiok4gfa9sejzw3yx5kpjcvuc9ghkp3pxjdialp5sfho3xz55p38edu2euyrwh5zo3789mrh3o2ew7wk9y4s7bczmgr1pvhjfv7ut7g6o',
                receiverInterfaceNamespace: '5f3cwyv2kfsz99muxvit89g8h3gxr08lxh5611lk5wfih4fdpd5a3rt8xj0dj7g6s6cm9fbg5ruxozmhgeitvfp504jwh3j3n2jbrccnylibg0f3eovb6gsefxpbdmau5h4lmirvg42lkyhwy29cv293qyyk3v8c',
                retries: 3292379091,
                size: 2283572114,
                timesFailed: 6689537990,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: 'i0vf0zg3l21lt392dihm951q3wsonuzl3towz6nhi150ukv9jb',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: 'th5fok51birvvbbzo9ai',
                scenario: 'khj4b33nh8q21dwy3bxj5lx7fe61aak8s7zl7zdouyqb326aec20kit3mg05',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 00:21:09',
                executionMonitoringStartAt: '2020-07-27 14:55:34',
                executionMonitoringEndAt: '2020-07-27 18:46:57',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: 'npiqbgpid4q7c1enb3jgfduo916vpcd1yad9dqqz6mvcw27epbnbclq0h26y5g3m8cdj5hhfyxm8m7sr2rn7cfanql6jzdsh9uo3jeme4au8t6t2o8mujfou3c1n6s1yqyucruujgv4gmmysgkr74akr4rd0c79c',
                flowComponent: 'y7hdpz0rfengftbqeyh1kad1pq53ed616o9rkg8m7001t5la3gkjz3h70vmiq8ikgt7oentilf4v16o19yk68yv1ki7pag01zkrdrrr0n5zthkvgkktbj0j2m9mk3ewgdgy46pewjeyweclrf2f59m5cn9b3ehkz',
                flowInterfaceName: '8ydih7h7qol4x4c6oeuqc50l45y57ywz2ud971y0mbsyjnnjyh8x1ko3zfuqb80s0fpga11oavf12o6b2pospstlj2tiuqts3pnh9xrzdi5x46ctgyjb3f512sc0bk9lwamp7rqvyneaiqq184qm2lf9c8tmdhn8',
                flowInterfaceNamespace: 'hd8lgdg38y4pykvnxkqivjb3no9o0k8iuxapzuz0s6xa71p5x05k9mglly1uf7df0j75dvy9o0qjgthi8yabu5axpm839so6b4o3ves1ir9n34vhnwjofqop2aqpwole6vx0dwum40i0r17ipgw9yv2bs81nnkyi',
                status: 'WAITING',
                detail: 'Quisquam est consequatur consectetur eos. Doloremque dolore fugit quos. Aspernatur vel ut molestiae alias magnam voluptatem velit. Soluta praesentium quos consequatur est recusandae et voluptatem rerum. Iusto modi illo voluptate. Vero libero accusantium incidunt et ut.',
                example: 'taivxs1mmxy3jazwrs9yowao2urhnrcsxezb4ur27sqnac8gl17nm2okn97hpqekaarx4urt6g1r42vrt73pdpw1isl0pzibw2ob4kwt6x3gz4aziddx0d45pw1ujee14fm0ejplnnz2fbskno6yqohjdta2i4cx',
                startTimeAt: '2020-07-27 19:21:42',
                direction: 'INBOUND',
                errorCategory: '9rv0nv35qk9jccwrylb9dci1mpgkwezjshala7u5hu2g6u86mlwix7qcnwyfgfupwu324pglxladj7xrib8tll3j94h13vwfnjnz4fxe3x4y5gbfah1wiqf025oigami212xpkkfeutsw8967p9xvk6mltk49uq0',
                errorCode: '2z3mmfc60lv472fz82vj47idbctp0is3twpcz7ux1m4iv4a1zb',
                errorLabel: 346409,
                node: 7202996485,
                protocol: '8x7358c0lpxlkvo1insr',
                qualityOfService: 'vih6exssjy60f6mtiwe8',
                receiverParty: '8lmg6x8e96b8q4vvsln4a33d50gewcbowokfqowicdiz28epk0dph5u5geutvdsrq4wsk9gf77dxpfojmo819al077tkkv5tqgttn5gro9kjaj7kgbcpw4g0g8uhe0nmzlakz9pjyoqwx97vju53sf7frh3yi8lj',
                receiverComponent: 'dhx7k6ktmc5gdbfn74fmsbtxaf1qddvv7mxm0bas65kpk0h9yez6y8f76ltz3hgbmjn8i0ekttle9lcfxv7cfx5vef3miy4774mme647uou6wj6jlcw904yy1mrje2rfuf8ov326hytzkgtos7t2ka224x4vkpdr',
                receiverInterface: 'np5dd4fmd11e1575kmrnsoqf9hoz9p724dj9rxpymd68mvfhp29v4il3ss0xnah2zmwq2h8z1nkwehrs2majhvk3k5dzn1wz817hamqpgnic932ewefstygeh3oujtdt7c8nleoagv63nbflse935uaabfpg5j4s',
                receiverInterfaceNamespace: 'xmpazr87p306n818n08nm4a1igytojuxzrnb5g9844z81ystocp6rr57xzkks0z88ct7dlet3gkz8pxomoa22xpo84hmpzee29sb28w4a63os95lugxxx03c4k7sr7o2xtwjfjvcftzy903d9yycmcxpfas03y5m',
                retries: 1140016631,
                size: 1785287121,
                timesFailed: 3001482795,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: 'goh39s16bv2o5jzys2svviznsew8qxtgkagwf1coj8svf9tx8h',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: '0htuh6gkhz4ui8csu53a',
                scenario: '072dfjfn2rhqctw2vkl7yevz5ye4bbyd91rjlhl8bg5jf6y47t7j3iqyw3ng',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: null,
                executionExecutedAt: '2020-07-28 01:30:59',
                executionMonitoringStartAt: '2020-07-28 01:27:19',
                executionMonitoringEndAt: '2020-07-28 07:37:05',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: 'zny6eiy3kyvgnbsgh1n90a36ldol4a80gr0tr6y5n8v1inrpxqo5uyano2juu35epttv2z6k6r229h7dgncmiforravzsr86rt1vk2sr00n60w8o54qt2ar9soyl5xr0poc2j704caaxdlwxf6xxpqq7y4vojasa',
                flowComponent: '7wn4w5tn39947dtshto1qwn4u14834yliitbwhywcp1pdum1ho7spzqyi2i6kdw399cpc9asphqffb7gbkycy3qtn1s1pfybft6kku1wic4kznpy2pt9lkqtvewiqpprtxqt4e6kuqsc062297e59kyyvadhwsk7',
                flowInterfaceName: 'ylqjkw7btio1vipqkudt6j1yzmucjuwo383zevjgvf3yjzbrbh522jipsgxpga6hegm6d17m7w46k8hld20hgem1m2y8v5vv8cxldseqc4jh33mhazfhzaw8wvp64592sorhe8h7djenn13rbdx0mdbv3io8y2r9',
                flowInterfaceNamespace: 'f7i26fwhh265209uy6kaloodzrnbfe87hnukrsfy91jsti3ctahcl544fsv1846unber9j12pzaz51c5o39r9yp6rg7ceihsg0z94gekjn3qip7ghvaigzkv8u8bqh7vtlgd3r6u5v2l2xl6658sbfltoayc1al4',
                status: 'HOLDING',
                detail: 'Temporibus non et architecto ipsam earum itaque. Facilis nesciunt voluptatem voluptas aut ad animi quia quia earum. Adipisci possimus rerum. Voluptatum commodi sunt reiciendis voluptate in. Quia sunt saepe adipisci ea ut.',
                example: 'ndpuetdd2orgl9wn4klvz9x1nhmvdipqncvf7lqm7340cwna5ui4hyddr9atcrh2vgwpfr37lhxb709l4s6j1uagyup0m87np5xiu7vara9ju5t498lsnfh06wwbg3sd1rtg4w2laoa18f796wrkmky2tn67mixv',
                startTimeAt: '2020-07-28 09:14:22',
                direction: 'INBOUND',
                errorCategory: 'z47naitdwbghdumkdvf58s7cecohez7b289tmptsp1sr3gy0q8v2wn45qzgzqkd1be22onnu124mo1tg1bh7fqd5ewvw1mnq06n4xb7ex1am7zk7a0ft2j7mdpislszkfn40gimi08822sr6fx8wifdov05cv5ui',
                errorCode: '6xttf7xx7rflta6f0b1xtvfp3nu8hcr843j04cxsmiwibqul7v',
                errorLabel: 115226,
                node: 3746721914,
                protocol: 'cuyfjk6ea5axgto9sipp',
                qualityOfService: 'itcj50ylvbkds6xi3ego',
                receiverParty: 'gg4cdecohhkqxusjwhsnxxji4hj8bwz78118z9c9b56kte9jvrtfin40qh2sh9640nu5bq4yh18dip2bo0i8mswzivje1pkxoluuepc3hgjjj5dysl7g6c5t1o5tuji86zsa8vxpjjbis6uij7niwbmrpk2mha49',
                receiverComponent: 'm64jwmponf4fjyqivgaqc12glem562dloo1k1ey9njw2758gz7eocqets8yvl4v9y2b57i05indllh6gj6eg5h85nlv3ffe5qi5r6ie1e1rgml18th462b7g8er1orwnitblpgsvcgyrm5qcrnsx9hsgb4frf29e',
                receiverInterface: '8eh2l7po54d9xjlkkg3b1zn28xt69xamn88keoze9wsyvlt292olfs56ughj9zqrmw7fk9787a0byghnav1li0759lpaiyk7o9nyr3ejpyhlxgomdq066kx822lbuug94ihzn10szaepy4jq37ol398t78vxvq8v',
                receiverInterfaceNamespace: 'h9e1g8tdpa4ye945lwyuk12suwkgw69yq4dfll2trolqyo5168iq43oh7ubmdh08ni4t0g92zpd9ah7o4v7f6hw9qfxws0jb3hkfx56gli9qkcyxwkjezsvtno2in8wlo7b3knpw4dq9kpgdroafvm0e9r2191x3',
                retries: 5245947811,
                size: 4734194310,
                timesFailed: 1202512242,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: 'tfsb1r5yr9uzbk3tydh30237ayjxxeh0hr1q655luae37s9jm4',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: 'oam0j1gb7u3vng9qtuy6',
                scenario: 'i2gafh6jwkeih2hrx5va8lybez90h5evjoni8l168inzuaqko4200uqp2nay',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                
                executionExecutedAt: '2020-07-27 15:11:48',
                executionMonitoringStartAt: '2020-07-28 01:39:12',
                executionMonitoringEndAt: '2020-07-28 01:06:43',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: 'eqyza3gna7ahynf7bc11yygo4pj8jm0j5y0d7pwjlm3f0s9qk0h4pfjytncxeeuxar58maqz1vlgfb0f1zuy1328slhn82kwothcb2n755ehdvpamk856715womi3l73rb5g6t1a7w8fvzsvzat9d7b2xgwsc3f4',
                flowComponent: '24npdxjev9i18jzge30vs29gfuten47jc65achivhh993x41z7b9du9anl2mt2nsfnrymrmflle4si253uen49g1dd7pryy5p0saexc0c63yesrsp1ayk22q42c0mlxgynyo7ln0rq7yugruuis6mc7z61h162sf',
                flowInterfaceName: '8ttuknmfv0tfncm7zolostx2pv37b7525qciyn7h4yhtvunm347uaq616zvmkxak7hnjn9uynuatz8hbtg55sryp9zv5bxj09uz1pn3psdrmrun2a9uli617z4o53l6ee6lib6isybrzi4wxnh3qm3bjuw6add6q',
                flowInterfaceNamespace: 'wq44uza5oonzurnszobqaktj6oa72vt8qyk1apb790gxpjkx6m3tvgzlhtrglmxjxna92mxb08rxexjk01ql936gfart78q1m5aulgy3aq4jokeidk4lmxek2ovgjpj4703cndou6sookmjmdz5h6eb3zar5z8tp',
                status: 'DELIVERING',
                detail: 'Excepturi hic labore vel qui rerum sunt. Doloremque in et. Animi placeat eaque. Sint reprehenderit ut perspiciatis ducimus. Aut totam quia.',
                example: 'dc0hmjx586spe1yt73tojjl77bikrc9vjccbjpxkbe2gy09b0e6sqooob68g0c8hbbkz21ye9n7jyrpd43xri86cpdta6q00ce0uaq04y66nioq026yte88cs2glrlcw1apz7wd8j3b4q7qshhqd31ew5eido15x',
                startTimeAt: '2020-07-28 10:16:15',
                direction: 'OUTBOUND',
                errorCategory: 'e2v2pko2vvresfdv5vc8u0jkpf1c8wmuxmyh4nsuir4y5h5orf2j9q4htdt8uogeo7cazguocdn7hil1xroqqjb8tdwsy5bw3gx5f9ktrqcrranf8vwwdii0tmvt33xir8acni4m1bppgbwd8n9yz5r06knh9no0',
                errorCode: 'wy6crf8u8pnu20xcliuwo01526ck983uhguku1576izp7x4d82',
                errorLabel: 926388,
                node: 4507463780,
                protocol: '5e7ombxe4ith1pvwt2gr',
                qualityOfService: 'wwi9rl7ljrzi119qk9w2',
                receiverParty: 'eba6a2bx4hmvkv443l39il4yv52oj76voqwwej15caedot128kmdp345r2hg05f3fugx7ijjmo7z26inluctt3uvneojnujavnr2wr00i0vbioxmu68nuinw56v0q6eq9b104hmi5sjyqhxd4v48lhksqo6ojbvd',
                receiverComponent: 'l7wsv88z6bcu865mao5ew2k46h56sfykf0fqdaeoj2sqvyul4e51dil6tkurcfter1dwvxv7fbyi5ci678na5oi5dkjnqiikveo1u1o13ohm2trk3jmhr172lanlfnb30m869k72e8fk2g6fl7f3kgjwcnisw31p',
                receiverInterface: '7w29tdd5qkpc4lmr8elnv08vofanwxu9fpzqcdgghbe0tijb903lfou3uj96q1lsado2n4f4lzfw9wbsx9kr2kdk86qah053wx2kzfe10lmzhfz9fmo08kseft5ogukkgmxdv671ol8js5vuw5r8cc1ykv3rxpzq',
                receiverInterfaceNamespace: 'n1eza5jcs52iz831m5qeap6g6hbk9dvazgsburdsaquwz3cvdaho2o8ti53gko4utq5h5ucfd63b31ozwpb7f9el91xyxdw2unnjqca18ufmstr7sw2t6smrl8d06n558583do8dauybakdf4fkcmda20lo9q39q',
                retries: 4147059244,
                size: 8197966418,
                timesFailed: 7152267825,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: 'ck9mxsvhqr5m7z6q6tys43w5w71lswgeqzj9wdc904tixxnfzm',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: 's422q2l7wg3zwq24jp9o',
                scenario: 'gealbzw5pcnmabtbbk8kixpzdwdfd9hj72m8ejcmh8gdqtwbr0yq5lgqf82n',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-27 20:36:47',
                executionMonitoringEndAt: '2020-07-27 23:19:56',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: 'kw9xz2xx8plbxqa3k2qld1oo31gp737lzsmueh8j26m9ak95ge7ide0zdllhhweejckv0z0j8b89cqgja4j11jactme7kd3mehttc2rghnkqcgjgqxqjw4mi8v644zgngngpbjf7osscloamp4n6qpaxxf51l9l4',
                flowComponent: 'cm2ude4mxl8s72yocqn3uaq6v29vw5fhqamea6xmv01cnsdujckck2bxa4m0c7fhsw7rwkqc4cfqdtz31ws3hiz2f2yjlvs8qdde7pho44pcssfdxxtnmpojhcz2kxmb0edqplowmg62842jlxh4j8p2crqrqpio',
                flowInterfaceName: '1oguowjbdmclvoiscfnfd6mgn2dz2h67a4mzd4x14gyq0r8worddazllp335d8vtk5ltplkixx7w5r1wo6oyju2bnh9bpzy6nvtntlzosaki4oaehd0bbzg638n4wozf1l500zzv84qgtxhya010u2qoqyfjmytg',
                flowInterfaceNamespace: 't5j60kce4xwifvdstde21ozgnh8nst1ziriyiwqi9qsatvivgvkafoneb7o9p1vjoyxxocfyrmawduof3jto9ttyibc132d7e68w852cbbp2jtyyt4l1aaf0qeq3oachpkn09hganb4bsg5jz5fl83fewa3v9yxq',
                status: 'CANCELLED',
                detail: 'Et iusto et consequatur eveniet consectetur sit fugiat dolores. Qui odio modi ratione alias ratione. Quo nesciunt non aut aut repudiandae possimus nam dignissimos harum. Rem repellendus aliquid ipsam itaque. Labore harum rerum et. Totam velit qui blanditiis architecto repudiandae totam possimus earum et.',
                example: 'vvxxdrlzeeews5m4zn0d8tp5pxnscomutfdv24fi7k59odcpam6l6xerjnpx2bo6j8mujihukmo9ag2i1gz6jdsa9f0lu5w9i4bq8fgijzrinadh2o7cqxp13fql73l6engl7d16ianxo5ycgdhrbd8y306dfwpq',
                startTimeAt: '2020-07-28 00:08:12',
                direction: 'INBOUND',
                errorCategory: '9wo8kloqcgkrqjh3q7jm1ay42wf4wki9boac22w94xe4nosfbhm5phkcpuqguy5rc03wqnt6q4fgnnhh12q9nkie5hxclkcmrb3iyykff0y357v0g46dw95mcldtpu7vzbj186lyurlc9lbejkvn2pb5rq9aeb0d',
                errorCode: 'i3xn2mcmjz33r8wdo85c7k2cqedx9g0w4u34h3m4z5z517hc68',
                errorLabel: 349455,
                node: 7336225158,
                protocol: 'f8qqwmmpitt004kp5jcz',
                qualityOfService: '2bx3zbuz8sawsmkvo9nh',
                receiverParty: 'ceqjytp4dw9dce204xpvkp1p5vkyl2thhpky6kg2wbl1b8mt0yijlzxzbzgbhs5uraoy5f03zz75phs9qms8b27397tplkgn0lfe0ria4zbrzlfijl89nymxvv7gryhv3q7g1mp2u0xqor48a112i2jbl85vqw5r',
                receiverComponent: 'cckjfc8m6u8q2q2m7qda6eosdpf5cmbf1uaid6moy990bo6v1cy3lco2ywdujg2ltqmqjnpss3m1o20qdyr6p15sdsqwonz64kdhsty8gp6ewlpb06bdzj4ufmmwl1i4aq5bn8fwa7hts7fcdmvozm8vf7lma4y4',
                receiverInterface: '85pbjhxx1py53k9zjo6jk5oogdnxphhrg4y8vfswchlc4ko0i7w5ob8cq4ikk3oaed5kde0ydczpxd1b7k5pgw9731wn93uych3dzjbu4mbpm55xs82hpk8l6zwh2qk3bm1hlm0vhohq9ln1afd48pefqdmbwv1y',
                receiverInterfaceNamespace: 'kh4w6jskawikk8t1w8ih1sbkskdi1p0k98muxzx8mma3iqsx8tf4275q3hvcnbl90pinfrba4r3tsa15fvi4l3xlm15gva9ayxasp6ni8wetseuwf1h9wtl9w69i90ipbzxify96n5im1fyn8wkmc8p4bf8dd8km',
                retries: 2999013674,
                size: 1159710025,
                timesFailed: 4650036241,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: 'kw1iumycghec2ayzuiit7pd993fi2dcvn259l4v5sayt5m2f4r',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: 'li7hqzchehp47hptw8e6',
                scenario: 'h7qtusd2iecp7x0vsz2bbdimzera70ro9sht4doabe3ytgrh0m9y9215fygi',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-27 18:03:14',
                executionMonitoringEndAt: '2020-07-28 01:07:07',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: '94wn7579wk69w212wo43iem2kf1mka58z55df5kw8el8aiqp4w4qjxuzvp9fzoqz5m0ov0lwa01cet8tot5pvf9ro7zsmh8uff8kvhfkdqm31w8jmqz6knsk4hurvew536fhzltactk2bxutpqp6ylmkd20zi0dl',
                flowComponent: '3k2tjwoeqn0st3v6xyxw2qvdalocf8tw764obtyif28egp01w4bnlav8p1bw0cuvo7lqdsvy9n1sz9mde6itqtlh6u0ff07oexfps3lkkxxvocfdoqhvbvv2cec5dnh3lm2p9ok8xm4owolu5g589fdidpj9ygsz',
                flowInterfaceName: 'deqzoe44lqts0mo2uf80lap5k1rtsi9jzpxd0gxqiqfvgd0silhz15wdtc2kaj475084hg0bq3bkl8cf30qoj0losr9c8mog13ua9ua54wx8ylh8g20cm6iei8ij3jlrm6cmzhucayfuogvzrrr8cihwbesb1use',
                flowInterfaceNamespace: 'mk7f9omttcg4eam6g1gwmw7v8z688y7viqcpt2vym324zo7v7vcbvfhlsn8c9oz5lqigdtvwi6znso1ldvyl0exn87n3mcqskkif55dnaen2a6wngt6ysdmm7rou426g0lp9agbwm7r9lpctn9r9qa6badgxq4zv',
                status: 'HOLDING',
                detail: 'Nesciunt recusandae voluptas commodi veniam. Itaque expedita maiores nemo accusamus sed nostrum reiciendis tempore. Quidem sapiente adipisci harum eaque commodi dignissimos in recusandae.',
                example: 'p9ln5jhwnmj1merfwq2imhmtq9k3kwr7hhrug4eetcoag18u771qhby0au8guiwjz7avn3llo3nvun23tpqj5nsyxuwiehjmwbu3yn6smwe1f3k69s60u9zq083rpb61okpzdlheip1mlhj0fb9bjyutolox27lt',
                startTimeAt: '2020-07-27 16:20:41',
                direction: 'INBOUND',
                errorCategory: 'y5t66eguegovg3zc0nu263m9ncvrr1b872sbspqnqt1pr61v88es0f2ujcb72bw7v4szn9rum16etyrokcmupx224q2p6mht20lxs69mw8h8eb1vasyj37b5ngvv3fihkww8hsmlg6qlb4btnvovwx1jrdb3hh6v',
                errorCode: 'd0bo1032qlgn7w6i8q15ecxtd6o0cgnmg6po4cymb9kv6os5ze',
                errorLabel: 612769,
                node: 5162178442,
                protocol: 'lhymv3lua08tlpnvobli',
                qualityOfService: 'oyu56ht0w69ts15i1gwt',
                receiverParty: '2s468oextd8p8qai4evt5twmr11aip7s7u0m7lca0jwwjgfqrn4k6wr2u1he77jyr7nn78k4q5uy5khyslfuhxhh6nrybm93gljbmbi60sxw1ajwuivfqla6bo930ny8vaakvzhcjuvsvxah9hcqgs14i2ruvz6x',
                receiverComponent: '2q07g5d17jihdr7zfd8mqv1bscdl2x5vkodehjax9lebcif4tfmephdcy7uqzjh9gmninr2rm5mxv8oulqya09l7zfnpmagj9gobxsrh60c5vfc5kt1m8eld35lpejp4a9q3zs13y46oa2wbwpz8infcrrgg3yg9',
                receiverInterface: '5p9lvsuwxy3rdav4cdxiu7tx3991c3mpz35jt8jnd78eneqzdz43l9cgfc3kjzh60my24reszq1r2p4zz3f9yvik7il529r447zqslp624u8jxeu6q59ozlzlfwdqwfpupk2fwp80h0r3uqrglbmb2ak627kr2v3',
                receiverInterfaceNamespace: '45o3c7jrawcf78ovgz0v3h0pohhyp4cc3koqrb3p2xx7jrggiver29dhaher46difrmt7s5228dsfyt453quifouowejiehhjrd71fgzci51o3tyksa2avoxcy89pvekjh6efk4icwcrbvtjiz0o2ief5j4bna2o',
                retries: 2838050061,
                size: 3615357672,
                timesFailed: 1849619100,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: 'z7k1n8dxjxmu2j0doi52yviyjguf5vrpg0t80yijix74zewoai',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: 'mmspiot7tecq48l1hkpk',
                scenario: '9c9thjbnum0vb9l3ns76frralwggtogb1cgix7clwqs8t9inx71q369i8bzb',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 22:19:41',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-28 08:27:59',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: 'j5n60ajtb5qikz7ysinb7dpply44ib28leyvr59c5ff3yfm9h39erwiquwx9jc268rtcf2vksdrx27rom73hk9yvdtj685bzsxwoce1labxyg7n8de532xls8f8bgs0wihc7hxync7j05c0zacmsbzjqtrst64he',
                flowComponent: 'g67e5qxemkrk1kv2mj5trt21orjwk0kt9h15gwesjn7htq72m146jy98ubm1skdkcbkk22iqxukrr281a7qgffqd3uculypjyjv3rrqkeujiaiujyt3rxu50a2lnnf0nlcgv4wemp0bf3pmoy63y6puqi9kf0l4i',
                flowInterfaceName: '9coyqhddayafhcpk5t7yi006bqfc9ia86mfc9nt4ftyxq36s8oauoi36zrpw3bqy0gqcamm2ijt8z4z4ms9ydzbmz1tqc8dwa8mrdqobbgdt46wu4kzk5y786mkhjq6c6qepommc17dim02dz9tneogytn32wxae',
                flowInterfaceNamespace: '8an8binio26fwo95ydcw7bxenpttzoj4bxnl7u0uo90a0rot4gf4eyhsn70y8dx34ifwdwczr5wc4d515yae8e893uluvw5nfihw2ei61l68wdm5ims5pih0y977741hvmpkdmc610m9n87yewbeo4hbl4e3r4n9',
                status: 'CANCELLED',
                detail: 'Autem fugiat soluta nisi expedita at voluptas qui. Quibusdam labore laudantium dolores qui corrupti. Aliquid qui rerum sed et ipsam aut molestiae. Itaque nam laudantium distinctio et odio nesciunt ab labore impedit. Ipsam debitis suscipit occaecati provident sequi nihil.',
                example: 'e5b3ilbr1yrm3pvbzkoy2mqvngpnp5bs64nt0erkmxqb2wkjiins3aj3eithgut2ersspg3b2ibrl0v474w1afarsll7s5maxz7k0fymwd9yhodonb1kwtmykfz2frwwoojdl665qeyt1mbd52rg1fi9lby37q27',
                startTimeAt: '2020-07-28 10:51:16',
                direction: 'INBOUND',
                errorCategory: '0hg6rhqo3l9u6xf2zo899w5n3nwug3abqafchd6kfqjp51o782obkrk1ec9rb52pv3wfalypw7x6bbnnlpwchjk4jaspdge5xvhuj9ski2fj762d9jk0wr4gvdvssnoq179fnpihfc6t8bq277kmqt3wt2p1nj42',
                errorCode: 'm09bqd49c5cchm6okyt4hmh9qx08dgmkgeddy5po2nd664k2z0',
                errorLabel: 826139,
                node: 2458152030,
                protocol: 'wxgs0g6ybzkfc76qitdl',
                qualityOfService: '8ipzivvacbs4jr8za5o3',
                receiverParty: 'e8ru30la65td49il3wh6uot46cerixris7hvkrt4pvhnzel8bzkmf1mg7kiwlydjhbxgqv62ef6bwjbgpec7f4dfd5fsjk1mdezlqxutfir6azecstvkgidal87tfy9oaodm8ktyut8bw1ihw5jpc90wck7qi8gr',
                receiverComponent: 'amwlmx41gs5epqx1513cnzxniqloznaix44r52v23b8eymgb1bqjft6aj3m57l0ungxgptmcu445i9ouwxadrz54ja9lu2kwi4h3o6d6qxfnd0sjcljzq1qsjnv81fpbg99qrjhmhgsigcmdqhg3vhdj2zhg2gto',
                receiverInterface: '05rtjdjbhlk3fmj2uaxrncflbjgda5q2p14g6wkc57jw2oquwampj8no88rgalfz014w07rq6407q3fkx463ubmvqwwqopn7autlf6fixluyi6i7o433xe7gn6k9po9p6en5chsvbyx74ihwptvgkvx775v1sxop',
                receiverInterfaceNamespace: 'j8lw3u8h6pxnpn3otqik4ew9bvfhvszbwqvup0tqq57lrrviesgy3bvp41fn941nfqcqni1sccdd09l7q34o3vmt1ucd4svxbnfahkuqh48ka296t1684c1y74c77wyilop4qbkxt9md6ba7jo935e640z3tkb27',
                retries: 3398544640,
                size: 5035637868,
                timesFailed: 7572291364,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: 'vaflj4zl1mn0hbt2bzdgdvv87kd2qcgif5arzlfnv80qygbgar',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: '0zf2b0hxwpxtl9f9w6d8',
                scenario: '2ezgenj4god0lsrmq4rlul324f720y8s09xgcv3djv03kleg25o7wmpmvdsi',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 12:59:33',
                
                executionMonitoringEndAt: '2020-07-27 17:10:10',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: 'ag2yxyz5e9zj105obp418b1vqkfp89yu8if1cpatcidqj2esfpy5ovqo4q1yttcez9xborcfaef3inufoccb3qhl1468hktjraex4w3slzk3rjp06vs1ud9qjdxnnboybuxskrv2n6ki7rrk976rlhivdfropzia',
                flowComponent: 'fewtg4868hxdowhxkhffqre455n0t56bwuh4bv4h68skfu5l9vgy7e9dowkhxbbzeyrbtipkb6zrhhlfw0y7a71mvf7oq31mm0xepa9fpzl701vjymrirbhxdugggs3mkb1vqiv0a5mc96jxl5ok5d60dhgbx8lf',
                flowInterfaceName: 'kml32jaxwezkki65b3pu08n3vflfn0z5f6sjfh88g6uapbzwkzn0zgwx7hwk77hvlm9ltguy8kuipghm3acvqbdbv5v7gnkvs62ijilcjjcmjxxtjadzyx0pk4buq8vkttj1x4fgki8t47b0939b7xbrsmf61ofk',
                flowInterfaceNamespace: 'nih1c3b6btrrsirp0eztszf9i1d4zgvjq6mzgop3ibchu4rbdnrrtg6jevjpb5qrbejy4tl3vdnyzgudmwhg2v7oz6y3whxkelcvb7o25lr2nf43sndjslrgyj9xjg67f33xnkp69zwyr4q47qv4hdbls2m9vj5d',
                status: 'TO_BE_DELIVERED',
                detail: 'Voluptates qui repudiandae delectus. Et libero omnis saepe corrupti id est animi. Est et omnis neque vero praesentium corporis animi. Corrupti rerum itaque. Praesentium accusamus libero soluta vitae aperiam nisi eveniet.',
                example: 'dwb59uo161g3wm9poicijrso3b1qycu7yufdjypi7jcfl54yq237kf7lh7ysydm6obhx09g16aydz3wxr3kx7upnlgdi59xrq3qp6d8495evpd5jpaj3yshxs0b5sne0xhbkqb9l9ka8mwfyezee4362a2mk5wto',
                startTimeAt: '2020-07-27 17:00:45',
                direction: 'INBOUND',
                errorCategory: 'koas2dqxdrzidd4tb0wvz6f4tj844aso6a68h7r6om7fua1315c00dpuo218c0gi6l23nutdrfmaqgypvc3zuvxaooesozt4xitzib1jy42j0wco51xmv1lqme9ukuuort1sg06rawyhf7bonmvx1wkhiat5hnvo',
                errorCode: 'eg3plaircoc394u9amwhx41nbudp0od4pfsu79wughv6r9c5c6',
                errorLabel: 682289,
                node: 4846794417,
                protocol: 'hgpkiy7nggro378tpq4o',
                qualityOfService: '2sciy9k9b5bg5sj5vm8o',
                receiverParty: 'c3rmyh72alk5fdeu64m5kmzwf1nohxszm7qkc28bqeuq3d51lk7jah3g0d21n5bexvts6jgi1swn6fxehi7vpdb5d57ngr8wkr39bi6yvyryz42er5y533rn2hkvujps38cy6efz1r3itsu9m3tpfzfegztmac3w',
                receiverComponent: 'v2cdflkqorug0henmyt7hsy47lzpabue35pi1nh93a4r9wv77imi0iypkouoevkjidxqk14fatkdo1ddexipv4d04bd3pdnnwd9j1jrfzr7ufxnl9drtqw4pqhle5nn3hn4sr7fro70o9dpz72iin8vn97rqusge',
                receiverInterface: '4pq5d1ekwpmrrp7ifzimo9ahla85y06slt9tk0k9kw5kgpm0m919ywvf1cm9bvjpamypgosvdn02iq8b2lkoqwussxwst8i3cina1r9ob62tlrvr86fg3152gbilihg4pfii99rn6ssm2e6h5mi4ax3elh5xz0vl',
                receiverInterfaceNamespace: 'k2ugb59io3tz8m63leknpgv4x2qdtznuvi0x9uyn3ltghqfxcg3e90a02yd5axm4hxp4rhwspr5khbaqn2o3q0lqf2xsqoeqyhb2ss04xlap30tt74r2we1e7wrlln6d7tbxssf1j1yorjxk1ay7lvb6614q7jej',
                retries: 9452998041,
                size: 2466699165,
                timesFailed: 7860429876,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: 'chbdkwdwuwnvah7b92vcrhfb4rhhimr5qsq4trceb0rl3ndjh1',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: 'u1d95xtryyehhgdihmcm',
                scenario: 'aspwgebuorvi44gmmytonutzpxwo9aqik611wcttpg52m3kj9a0601351nso',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 05:48:40',
                executionMonitoringStartAt: '2020-07-27 14:24:47',
                executionMonitoringEndAt: null,
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: 'fqb1mr3095fb9mpw845fknxnctxzzhw31ee99z3trrzsbbocyahclukjjrwja3g6gvyc7ecyjhvrxifr1t3pixaepyjlrag9qzlhgxpigx5p09ywxo9o0v7s0x0wsc3th5e0o7uu6nn4kefnt1ialx17xdubiy5a',
                flowComponent: '38z7868mtwb3r5q3xqaa87cjkq6xr6f8kktvrq39vnz8wi3qz7dnymfy06o637tr3tn7cjwjfazt8e5s5j1tsglhw728mtqtuph64to2mxz0pnb7lbqubdhu9sot4iprbawv03ucbp22aho400n80j0mzpldqy41',
                flowInterfaceName: 'p08gei99pln68qc3qbr5k56r4ia0i6qrvwfjipyrwhgxx7yfwi5kxmbxufyoteaqldh26e6jj6k60d77slv0epflse7xw8a6om7651vze2plfpzflitp4a1qab26akgidevfyucwkjt2xvqaqtu487vbrdr4xyqq',
                flowInterfaceNamespace: '3tgu31f03xxu7qb85s22y1k6sjbq653kd7j1dtl0z3f2sulbtmwos3oi9g4sl025q7s4s7loryywa754yg8hxh44w4q62nfmieisdh7mf1e7odq1rqiujiby48i80uufjib995sddamzwrllazy4d2bsixzpe7b0',
                status: 'WAITING',
                detail: 'Nulla optio sint debitis minima ut consequatur ipsa aut ut. Placeat vero nemo beatae. Aut pariatur et. Voluptatem harum veniam officiis et. Eum eligendi consequuntur sed laborum enim ipsam sunt. Et ab modi quis tempora omnis eligendi pariatur similique.',
                example: 'kqicxjj9mkg6xdoobis93arjxt5lz14k60j91en8wty9qky340dynyjl6tyn44f4zf8raoiswzfwewrtiyloakknga5vtpt34bp59wlg8wihrmflh0c7dnn6l9q9bkkpxx677yw1casweyyn03jeai02ecaezytg',
                startTimeAt: '2020-07-28 04:32:36',
                direction: 'INBOUND',
                errorCategory: '1hjnkvlpzw159eyqc7k1tdlm2nn6e15tj65ehovxm1ukf6388whwy32wdl2g7zdm85mtxk4fenmh18yp27nvbiv8agsv9ks5p5pi8t0n4fgwfrq9twot3rf7tvfzhjgt21ztbqtn55lnu9fhs82b4ys6mx3hntc0',
                errorCode: '7zw0wikbfo0942h19dhehfc9pjaqxwhzazqrt3c7rqly2vhxm8',
                errorLabel: 853282,
                node: 8754715496,
                protocol: '7ljndynrt9u7n0gheq48',
                qualityOfService: 'iy7nldpy2owql4iyy135',
                receiverParty: 'nqxs60b7t7pgut4fwy1badkhhgaeiarkn5n66x2kzeo1om9zgu9fm4ydxnpl54s8yi4lf7kbldyxmgetr6pzch0auzkfemx9vnpfu987mbg1xnz6oprpgrzqtit9jqqkyuhvt1wnd2nuwxqhm4mb65fl9jn0iqas',
                receiverComponent: '08yqlx4w37l9uwjsu8vdq61z99n2psimf18fn9dii7yfb5q0nwdt30kqkj15wkox3dvnejvncqds210pfsl7nn6u74w3ikvct1t0hfhe2ot9hb1fret4gwwmv6pi4uzi99bmntuy75ujxbde690whgl9dlwklbhe',
                receiverInterface: 'yamd1hoyakwfbf08r9lmaoblvlvg053vqnernkee09kn68vro9b593x8eg79ppy33fkrbybdudt6ugg6ezfem5dhl0zeui7bx9corjgk61jzdu8idm9s0gzvvy22sshn5tyz232hd0bokf5wqmmvvcjfst0uk2nc',
                receiverInterfaceNamespace: '6ycxp293btg697jpzl362i0ekotzbhz5zja1mcj7lju3n4isrtfv7qh52xxztf6ulm1l2a734zwzzvdiwjh0p6w0ov9dq7dwzmmrjsu3c341n7cn5tj7q7mznqcaz86of3542lvir38g0a3e9aq230w0u4ur04x1',
                retries: 9839512646,
                size: 3935923945,
                timesFailed: 9080141033,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: '5485bsaxyd9htv9jwdwydacwk3a7dgelc4q3zugg7dbufrqep1',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: 'ngl0yh8mdyxhnmsgh55n',
                scenario: '9ptg4z8adbg9t13kmmods2zjv9lyvkp18lpxtrtselqko6do05870u9d67h1',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 10:19:56',
                executionMonitoringStartAt: '2020-07-27 22:16:48',
                
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: '5qfhpdgqd2mt3qdtpe0nkkshmlhgs8rbjiryt1veh30gy358qqvlruj7coarv3xvtkm9oswudpmvc1g3tinl46umyxbm7hy5j65j39aic8r7xmaqd00fo03fc0mzrk8ddov3vvtse5fkd03fyxjitmbn37aukmby',
                flowComponent: '1jq400jzk37ioin2kpmjyh0klzcv7ulbzhdagrvcafq3u23xuwpewzmh29artr51tkba5hnfu8ubxc6ygyh9yhtcm7qpk6wdvg7omefwz24w9dna0fhw67t35mgzakzto7i2g533h5xxlpjryyrz4si7ekl9zzlr',
                flowInterfaceName: 't8atf4aw9yoagbp5r3zt6j2uwgoygcfu2xym2utqtfxl5fze5wasvtlr3289v87itzgtngmx5rurncpgwjesspdvoogroc8brm4xp0h0j60u7yl4ogub94vo8h8ks9yw3v2r3twft58pck7ju4cjknso2ndm3hir',
                flowInterfaceNamespace: 'zyr25m93pu3iyhsj3l11ocy50q5nczimblmqfjeocr2a4qcnfptrkn4ybi4ljho06tc406r8hjrkt50cocpbuyxetvqxeauinqby1e678d6yav0i15qtl8mnrtlhabncfv2000e0y1o2o2fj246m1j78m9l5m4rk',
                status: 'WAITING',
                detail: 'A et quas neque aspernatur a saepe est. Ullam iure vel. Nobis totam omnis quaerat nisi. Quam accusamus sunt iste nihil sed harum eos ut.',
                example: 'v8nu0klw3lz50w1mqluccrr9en6bs14d6dutshkeu2qj1t1pzraplfkmnfa62m3f083ldi2igux0x9eq3xyac1mhvyd3zbq7eapm5wt7c6d59jiwpxf6gf8jviyj1mkgihiyvct9vd0k4pjdhmz47k9rrn57vu6c',
                startTimeAt: '2020-07-27 21:28:43',
                direction: 'OUTBOUND',
                errorCategory: 'se7768cjjxo5y4ptoe7bo6exeqoa5bvea73n3waet25rny2pk6jk5q878w48xgtwbov4x6l0rj2nwlvaq80zmdllqbiifleow9wesy86x09pt75nxd7b8gysn66vhc9mckqug57j3le7sawbgjb46vrt4vtgo98n',
                errorCode: 'm664nbd4lq4ug37nd5t3u8tcaotxjo54qsp7uqbyeiz2z3vlma',
                errorLabel: 416357,
                node: 8445448395,
                protocol: '940s0yihrudnrmvhbwto',
                qualityOfService: '7n3m1ay74afub9evqrxx',
                receiverParty: 'mzgu3wpgemndwtxezp6gh4iwbctr20zu02v5pu9qxbv27c0fbrxwe5aeji689xd26x5s6n7sylyv5ep9a19272ep1pad9s96welcam8la4tw8f8ds58j6p7u9hug3f78bc5cf34wvkuu3uvv4ebe5hm4sx506hih',
                receiverComponent: 't2slxm15mfdhgyd1eivocv5yn4n7o159npg5y3b9h7wx6uz168usypj2yb8056qkbek7l6s850kdk028vq9y9kfcj39s3e83143unzya10pqr144bblbd8ltdvy3kuiwbxa1mfacjuchvxwria6hcf8os1ltsa2t',
                receiverInterface: '3t31uk3hqgnz7mixqqfrd4fjnxzbo48hnta7rsdjxxllm14rk4rbxxm1ttltn889n1aoc5bjo06cvtlwuscgrp38hjfsb59ymm6kimczpwaihozqzh7n6hhyk2dumkjznoi48bz6zzq2o5o000je8sdb4qfujaki',
                receiverInterfaceNamespace: 'nfwxb8foizhg8iegf7i0ydziodthbily7ye9244m6v8m629ovde5k6l0d3bnokh8pd1affn756x7jhngxipym0qonkbl0ejlqtu06y2fdbfjaez8di4w5zlf4phsmzd96dyesovy8whet5de86zblnku9w02daj7',
                retries: 9438007986,
                size: 6324567598,
                timesFailed: 5270475990,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: 'yrwedllqrakwzfuvsex8v6fuc87svp5n3v4c9lb55z2mff80t0',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: '17fq05y9mueohy3q5b2s',
                scenario: 'e5j9tm6i4s7qipxyzo8bwd016u57t9p0ne19jdddxug4lzicbs6ld0dfbmi8',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 02:52:10',
                executionMonitoringStartAt: '2020-07-27 13:10:14',
                executionMonitoringEndAt: '2020-07-27 23:37:12',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: 'aivo2r53ijvupz56ujk9nu02phnfajh8qa5s0e2bsm17go0z9iim0kexvnsc3p29njzl1f69an93yo0g1r50o8noba2wvqyaiplbmmqkeupw64gehw7q66qodbi043osyxjwtes83tqr5t0p7rt8tf039f02rtkb',
                flowComponent: null,
                flowInterfaceName: '36kstu2vwl044z6othozp43qerb8sjene7cwekfffh0gfjs4wt5nr5am3j6l3y6azcheyjg6s77431rvt7zdcmq0o0hi1v6rzzkzd83az4ktpbuu798qnsn81jrjuw7vyivuiyi7y4ezoyg58mwwxjl3cn0dxsgv',
                flowInterfaceNamespace: 'sf05romg1bpfv65ftahhg6hvttgzu38h9izxkvee123tls06ybueqryw6liv14qu1d05og37jx2uvmql6b7121qdtyxw9bn97h2wzam9qsgjezm0j0n2i4k73wczkj1c18cvx3ra86vq3iqdhnr6z3z63rq4ipo7',
                status: 'WAITING',
                detail: 'Fuga voluptatum minus qui quasi beatae ea officia tempore. Corrupti dolores atque fuga minima ea repellendus non doloremque. Quis unde esse quia architecto magnam in non aspernatur eius.',
                example: 'f5yvrlxnyx6shr2x0eou7z3uff627z7aap38b9dscn22twrnm3rhqs2oxmx9fzt4mq8r3m9ooglruulpc15dtbownl6zh5om5w5e5y055ba6k4qa5h57o1rxdslhkjb8pajej1mkqr89atq80u3jdy9fag5yw928',
                startTimeAt: '2020-07-27 19:32:52',
                direction: 'OUTBOUND',
                errorCategory: 'eu7h4ixfautnuatt1dvk6iemthw23tupz3gv8tmiiao9ixi057yhkccglm2oh1anm0to60bx8dqzz8ropoqck746vyvn1grryoefak221aroc1l89ki8vabv4u6z7v4lrf0reo8fjb63tapewg3n40e6ek0eq0p1',
                errorCode: 't1pu8l6jt4zdfppjkcxz5zi2wrfm0169cc2sinmkcr4aen0iws',
                errorLabel: 364398,
                node: 1288486158,
                protocol: 'z2bjw5d756g2drc77e8v',
                qualityOfService: 'yvy9iadb58yyy21nlddb',
                receiverParty: 'c3vurgfdh0a0db2avty6ppt18hwhdq6nm2b6n34cx32sroaoedbput69qzqd4tnztn8v3vi6vkf1sm7v9562eebamvqdl2sr029pmj1z2h0u7if1kf8mb7khvgxw7azj5ovvx6wko741zm0iu1bgkml35u8miftl',
                receiverComponent: 'blvdxdipzepwhj7ucx7ymtu0iomk1cto9pdo75jbqxq88ptlzktm0w637idu88dub8r75cyysvhzze1baxr0tdzy0sk0g1jzalc65eck7kevtdjhdj57ycd6ljenoflnr81h0t0mx8fn20cjgva0x3ak21b7avbu',
                receiverInterface: 'fqeuui0gpg2g9lg5ngb12kkinc4g50fj5vdn8a3ouuxkye1b8m2xupsmkdbpxb55px3pqfhd80qd3mrjk9bz0b8b5o4skfvs28797aspp9kvbx1jvz2v6fovqw6e2f1vstiyq3tnku3jb9i5362lipya41brprg2',
                receiverInterfaceNamespace: 'j15sswpxg0dld1c1h6ap6k5czhpys6f379m9ubdylqy3026eyy45qr7wgmhuzfxpz840fv7futsmixkta5271qkmqmcs57jc6462jucgyolq50oud2vk8mwl4w84pfcdk7zch0stgb8i35jud1qyj7vdoa2sokf3',
                retries: 5520424231,
                size: 3528861557,
                timesFailed: 4881046646,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: '6risl7yndqjy35367ezzx4qig09qumi0wbyp5c776ixn7zi4su',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: 'iclabmvs8r2924ns5tjj',
                scenario: 'mz7hwckpyvenom0jp4pkv4v322ix9umozf1ixg7fqm38w0016076d6yzmvw8',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 22:56:15',
                executionMonitoringStartAt: '2020-07-28 04:11:50',
                executionMonitoringEndAt: '2020-07-28 05:26:51',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: 'vhpq14fyut2pq69x6efkf6bdt2npsanw10f0t9w08pm77qultmu1esyoulg3x2ru6ct8fzzvdpc18y2bci0ll4dfrj1j4367mj1vp324uswbliogj0c6b0m1f1g8ttrplmgqw4e8nv7682qflrbvatif9ned984v',
                
                flowInterfaceName: 'hkaa0j569ehy7m1eac8tr7hqa3yh6cp08srmhrlebh7t9c8kldbnasc2gx8azoc7ltu7eaaek8laot2gl43pjg1374sfsrnxwebzadmwiixja3yvjgqebnq66qr65g56bp9rj92v4uei922hroe2aetb3sanlstg',
                flowInterfaceNamespace: '1g2phgkhb507ympzcx9hhiizem2azotw3zrqn1m8fihmml8rqxunaaqjer9xqqrv2ao11jpy50sx14ogc2eghs3rxftyehcycvnle1hkgvsosml6v12kcc4z3y9oyle6yml55onc7iwa0ne47zyrv1sudl278l7x',
                status: 'ERROR',
                detail: 'Rem molestiae aut suscipit aut. Eaque inventore molestias praesentium quas maxime autem porro. Sit eius ea neque possimus accusantium dicta aut reprehenderit. Aut beatae et deserunt minus et. Omnis rerum voluptas magnam exercitationem quos fugiat. Vero nemo omnis modi cumque itaque molestiae reprehenderit laboriosam.',
                example: '0jst3vooec4yppogt05m0q7vqno421eynkyqq0doi6bi7pjqjso7j0uhmdhf1lpti5fe8aulg34szy0vu2cuk899zo9unp8unglsarnjto2x225y7g0bdkmr1ajniaaf5bdt2cooai1ine46t6el6ln37s55ppav',
                startTimeAt: '2020-07-28 06:21:50',
                direction: 'INBOUND',
                errorCategory: 'ff4s92c5t7qvyybud85z4qx17h7a8g5irylsvyearjf09j20c50g8vy2q2246u8qlh6n3jiyuklsd7nksnwfghnk2bjofinnmrcvlajl96fhgeuhic12zkh4omxyxb8faa3cy6zk65cyecdgn1dpw1i68dtxxcg8',
                errorCode: 'ghp1y9ypilpoj56kmpotj7tnwt4ywiti8r5r96uj50xf3n9rtw',
                errorLabel: 510063,
                node: 3445787256,
                protocol: '18sol1m6f47hboo0jlyd',
                qualityOfService: 'ifawe75neah2u74l2mck',
                receiverParty: 'reorcqvqjlhi79inmt9byqlu02kqap1tyg8x6hnpm2x2594fuqd38774cxoobdizazvcy3lembbos63vv01utrjbczfprsc56usutdl5pypq9dqmcuiz9nkp2i3chl33f84li66h4bkbgp4nf8rjit4ivw3c2vkw',
                receiverComponent: 'ajvd90xwukoznbeuew5erxingk6dsggwd11cu8h25sqqxvgza4hecnij81mgnvna4onos03pg73p9n8yal25ra0vbqvitgpxn8bcm8fgig9qzzn3ipkei0x0y4lyms5s0c1eommigj0gxiy5l6te6zk4xcabi34o',
                receiverInterface: 'eayease579khzioz521ztblajaomhug8g1plsz6ylt9lhczwf5xxu33rycfkdwoabyckx5trsnonfqjusbvcp66kqokquvldic4skg8ykcccvvebemwd61g65ii98ljqb3hzi9toirmruz3r2ihnerez0e336bai',
                receiverInterfaceNamespace: 'azx6q74ln1oo40rcyftys3fflwltl94ugr3ujiganbr0g1io3f5gfefnz58by6zwxl2yuou29malgiua386r8jx928uuk9gsryt4g0ctz80tyihwmq0b8xz43cgakswx0qhkrl1mne53qu4i9uscl0qw1wbhgans',
                retries: 7086971460,
                size: 4943599982,
                timesFailed: 5376020392,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: 'ze7jlpj750bsyrbni0j8l60tfqtqkoz0f3bp15ocvnrvi743ui',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: 'jf6j1yep2x2cqo2imgty',
                scenario: 'pqix5bpzj3aduhcm7ntf8bt427zpsrckzsx3plz9o774ueugqntws2uzfmd1',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 18:52:10',
                executionMonitoringStartAt: '2020-07-27 23:06:55',
                executionMonitoringEndAt: '2020-07-27 15:43:02',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: 'mvb28olk0oybjlt318rmm8qvpe31qfe22ur0zykg1l3nyzah2raj1bxwpqza4yuslqzk08zz2s81rslr46622lniv2c93xh37b58xxt09thhrwtoxqfrzhc5mcx92mwyw5cxwvrlydmb38se2u2gm2oz7srkbrig',
                flowComponent: '7aslg9az55hvqk4cex6bpyuin7c5v36uahoxqqbrw6x716huyn73vfx9gbu79rnxd18wou530uhc26a76uio9kzmpqcr1p61x9y1r8eapn62l5mbnvt3zi14i8bdcnzzm1heporprxf2xbfi2kac6zbhsfhzmkjs',
                flowInterfaceName: null,
                flowInterfaceNamespace: '4jaloq4gaat910222k0ebp7ym9bztbr4ew1kl20brnrgcedlc57w4lnc35i0swvocvaqzigb23hq51q8rqu4gukppmd5pg92hvjnx9479e7uxkd8zd8y5fdsijq0tl8yosngn3gg69k5891m54whh30eentllsm1',
                status: 'ERROR',
                detail: 'Praesentium accusantium veniam repellendus. Amet debitis repellat inventore maxime nostrum unde labore animi. Nesciunt sed id et nihil. Aliquid laboriosam recusandae enim. Dolores atque qui dolor nisi cupiditate atque deleniti. Quod aut voluptatem.',
                example: '52uc8hnyyhkjtkabpcl0fx0674de4zcg3o0d626x3fa9ujl5xjnlklsvhmfryfjlxqj45cochunm7qvqajrnfebxz7fv5pz5b372422dgoczhlwptvil9paplqm2kice9ezo8xcmf3lpb74wc0ea9gytzxwl3q49',
                startTimeAt: '2020-07-27 21:30:37',
                direction: 'OUTBOUND',
                errorCategory: '9vuybxngjfvg2d9hvsncwjw6vv9whhr8103evhq2esa29xiri59u2wrrcw03neispjthz5xotpn42tejukp5v5kfs3neljbsraseet3j2777l3k70j001glwmqgzxi5993kmc24vfai6lk4j3la1ot1dox00ur0n',
                errorCode: 'jm3khndmt1t312fg1czl9szexg7yck28fbqhgtbs1bpwp3ulbn',
                errorLabel: 358552,
                node: 3797375080,
                protocol: 'xppm0g596zyq36c83os4',
                qualityOfService: '5qgil6h77b3xyvl2eqhh',
                receiverParty: 'ymzy5nlrle0klig22bbtuxth5epz8i6nxx1v2g5g54ltxnlwg93qai80cf5ecebx6zdlta25giz9no2vxlzsg2phg2fzhsu1xhnzlp34hbftfo3ure71yu8u4uk3f8xbep3vpiu4v3aiefx5rx5n8t0yho4hc2mf',
                receiverComponent: 'p6kae7d65b6wgbah4lh9649rozefvb2s15pj27t40dzxzve98fozoz1m0pdeebsee2x9n3vrymbvx8frtqk6qx2w1azhiy4xw61c553yvkmlbelvmp4rl41m1uys1tywgr0513vx4qrqo702t9drs97cgxl2w06n',
                receiverInterface: 'rrnmun3g5kqgoehbvrbdv3w8wvbv2xum97j4k60gqpw4tmw9h7uh1bibm1o4h3ja5hf7q7j0ucgv0bereu0r56bmrygxih3y33rq7uc34bg64buqqp7kr4476oi9cbw83u49jauk902prhf4ecmf5zi785u9sto1',
                receiverInterfaceNamespace: '57sqoyiae8cfa7480k01hewahnlg1ynhz5p736q7n10nqlrxwkqrhd3652y2qefcowvragcjuijtzw25b4o4l8zgenmmnth7vixrai93eujtoxlspc4i5gfdw8w2d7ydciuva9w9cts56tslkwpsjzdz2s5id447',
                retries: 5024849306,
                size: 3506033457,
                timesFailed: 4954201869,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: 'oezz8cjmkxzto1l7iaq5w1a47r8d9wtv47e7x6t33a5v96lvo8',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: 'ak40yc3td4abgvro7739',
                scenario: '38r6v7m1i0wvvj4s8x9ho9amte1oisvjhy702ilyckas53ggtdci4ofskul3',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 04:25:00',
                executionMonitoringStartAt: '2020-07-28 06:59:01',
                executionMonitoringEndAt: '2020-07-28 08:05:35',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: '5fmsgf9crc6015y7md28wvqdz3q4jazo1eslm5rthfgg3l0g0cuvx8zurrywfbiyrnt6o6996b5mcub3lywv1y7hj8tvapf1ot9o6ojmb36yj8lvz6ektcfiwdp3kfd6i2kfe5iry4uujnhluzsr8iv7at4woltw',
                flowComponent: '66a1hbfa73kceks2olpck04e9aixdfgc4r8ymv2r7yziumk4s3gb65eu9t8bb5z4qez77kq9oa4h0b1wjnoxjq5iptfrtf14ce9gb9v2gslhkwsfrseh447b4im718e7u5buf5bkohxjd5xt5wo37qu1iy9bv0d5',
                
                flowInterfaceNamespace: 'ybr2gkn1rj0w1q9jdkpjy6c1z5z3fze7mxkykidvhgvl1wfoef6ijvsyccssf03s26uphgaspxk862o0j5wzeuljikfacz6tw96epl0d3vtazkcwl8hmypbglq16ir1uslews6m0awr3pxg9tofiphpltt6bgm3b',
                status: 'DELIVERING',
                detail: 'Autem eum non tenetur. Molestiae libero soluta quam velit qui ipsum ut aut nemo. Officiis in sint harum id. Laborum odit quasi occaecati iste laboriosam.',
                example: 'uwrm1rc6cm1e0fxre9delepzh9uijxdi1ojsnidf2xavf5ap6ow2wuuzaw8cdvgxiuqa796xy7aqkr8bqkzqajvy83iwkj41e277h57siq0rs8k7g54rb4fpo4xokrb942t3uc8p5yavrs21223a9kekd8mz8glr',
                startTimeAt: '2020-07-28 03:25:16',
                direction: 'OUTBOUND',
                errorCategory: 'p5cpu5wjdqhzhthj3n0ljptnj913c89zcn2a1k5pfl1hvxp7py9d7fjdiky7mqd8x56efxhctzd5k4tcji2026jj7r2rxvty7m4kvbt9eo4hknsaccbpowctkp2eyx4ggaj3fszhxqhapvlltex2xidm9rx32p5o',
                errorCode: 'qcnm5ognqakybl320dweopbelioilh54qh17oalcqogk9jxlsb',
                errorLabel: 239607,
                node: 5182462451,
                protocol: 'ogsjbaq95hdxgqjua6w5',
                qualityOfService: 'vhl56hm9zxp31ov5lrcu',
                receiverParty: 'q02nzekna0b90ad1nfoiy6zqt4h1l5phghj9jz55h9tezs1blql7c6zziiqqg1myxf3e0xj37mx5b32d54mgqnjif6sspus4rhwzl6o9u4wgmq4g3csh996mswbe3apjpu1qisong3o0cy7uk38h4vau4rdnbj2f',
                receiverComponent: 'yra78jb6osdd8zj8vgsf1b2mw6njc8o0nuydkrgyspdb6j4wpdbsmzmmh2s2sd9pcj4ehjlyj6az638djc8wjtpq140tlo7jqb1bbcujhdn9axikgwlqcro10dr4wasxs2hjzycncy4nvysiij51pekonpc39i0z',
                receiverInterface: 'qoqlqs3p4rwoghjwe4p161vd6ebqmg2lyufpwvudqyqh9h1zqg02wwqf9hmdz7ruegsord82hcam3xc6hqco4wgo3gjq9xfby1if5y17cldm5s9nwifr1wsbzllwbosb9jk04v4fi4ae9ik2x2uxdwa69qcqxjaq',
                receiverInterfaceNamespace: 'exehn5281zo9hrqoepmt0nwf3xooydzahqq19v2wifkrnrodbnhdzhvcr5o7qkkgmxe3fgujz53izplbesvj6s9gt1rlvzpiqvkare79cwjkdid4ns47pfj4j4wb6vptvl8pce3a3e5upxke8grw17a9k7ql01gk',
                retries: 2629890974,
                size: 9746874170,
                timesFailed: 7286302271,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: 'lmx9o47gwm8nz9pph6yh0nazbsfs11j3lso61n4ohmdhii7h6k',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: 'lmivgdznrdynvl9g2qef',
                scenario: 'bvqcjkciq3jqpduqqk3cfwlxg5v8wgs04q9do67vcyo7d2pvkl1uukicmlft',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 04:39:52',
                executionMonitoringStartAt: '2020-07-27 21:58:39',
                executionMonitoringEndAt: '2020-07-28 04:10:10',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: 'bznnrwzqhdynyhz7phnnb82fuczpcq3lnjte0bfgfp76ky0uz0n15i9a0tmcaqqzexeaxi56bgr9bfbtlr1to2b0t5pmsbdtqeo7fb79zsd944yl5rfsawvrrlat7kp3ql1yowtn480keqhvydadixflx8khemax',
                flowComponent: 'ujoyv1ptot4h884ze88udob4t84ggktcbzvq2oada28nzcjcf2w7kg1dlv5zs7gtqn6pa1ihgwuu3jnn4jt70s05wlzxy8tejdi88uxd4h4enaq8ntyp0v0mx6sjybib172kbnna86qryqkxdukv66r5v6im272d',
                flowInterfaceName: 'jg0d1sem4esy7v9cqzdwbpynanpefj6pv4brm87h9zeo1yumqucb26ulx5z1mhvnonxg14uyy6vnlskwzs02f4f1oc8ndmf4112aqx92757yukkm1vlsdzpaanp5509595y5lkbjkvvgocwziq70xkl9plmr7h2q',
                flowInterfaceNamespace: null,
                status: 'TO_BE_DELIVERED',
                detail: 'Qui alias delectus corrupti veniam. Exercitationem officia alias placeat. Et tenetur pariatur est non. Eaque reprehenderit aut facere aut voluptatem sit.',
                example: 'm012tsvs59uk52clvdjpxtoemesg6c1hvlwaa1hoos5rkyfuwwaqq4wyu5q03pzujifwkp6bgoelh3asiogrb6lwcnvmmqohr065l36qqy4hk05k66dpnidw6ss7itaqh06ieil5enpvp8fax6xqoagrgluctji0',
                startTimeAt: '2020-07-28 10:52:22',
                direction: 'OUTBOUND',
                errorCategory: 'f3l4hs9lgmtm2p93dbujd25c6lkgcjcoexllbhsk49xlo9ccv66lk72vk3prnxhs1av740oocpwv4s0kqofoa322755ew0q643ihl1ncne1u5g6cf76jpsp2pg0ercvtr6l0havy0t4f0qpzd36b0ldregs75agx',
                errorCode: '28frie9w7y4x5ys38ji7zk8pq5dlzci57foch4uen3tdtom4ms',
                errorLabel: 508335,
                node: 1057795144,
                protocol: 'e3324i0273ss012im7ve',
                qualityOfService: '3cqjouefmzcu9jt0rv6n',
                receiverParty: 'c8024debeswi7733ytrfz13r1vr770gwkanak7z87kdpm3qp965006g3f3vr5aw17negrbvnvkmcovnvwxfdq3p0ljdgufqkt04y6p7m6osoxn0uw6hzn37kkdu4x1shqslnj9axmoxvc0wsxe7tn1wagp5v4a3o',
                receiverComponent: '6xz7b0642fv5u8syjk06l4bquduy0rx2b1za0oriyy5582msnb7hmz7qugogqm1kqy040u0rj4erkz47hanx3g721j9mas74zlevwxgsv3igqugzmmqx0fztfbg7b9msjy30jn1jj5msrlwiileyxrc167u95swq',
                receiverInterface: 'eqn86uve14aeaifyd4aga1pby2fd75397acztelnreiwfybb6h2nuupp2f9u5952zf9wegr3d0end79aaeacaddekzqwtjqll7zmhcwickqzuzczuil1vdnechhdoehf4masl4ywmewaco9mp8p0fo1fppg7qpwf',
                receiverInterfaceNamespace: 'ihbwz7dz8yxlbm41pt0oqnfps0ebagmq55m9iokrsglmi1xxbfrv39e82fd1pbf1rsb7cigwi1dfyd8opdvciizeca1znk3fxo2vb5sxf208f6cxz2ir00gxhca1bwu3pqgma9e7nmfgmz3yfl0e4b8dg6qt6l53',
                retries: 4472070314,
                size: 6467572540,
                timesFailed: 3345631195,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceNamespace must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: '1whi9rr5py00i56c8p8ihua77st6lz3ercac8prv7yvxn25f9q',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: 'by0wxh31adm053h7fkhr',
                scenario: 'qkdmmqrycy3fpy52kgzrq5p144dk3mzhr8fare0immccwfvxortqduqecft7',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 14:00:21',
                executionMonitoringStartAt: '2020-07-28 00:19:40',
                executionMonitoringEndAt: '2020-07-27 20:38:03',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: 's163w5823tc6u38hamsdc7fo187d6jwd23711mzyz6si03s3jnxo0plj9nr0bjbvqomefatjn3xq80wgfai5yvqdxcudq78892anx9b124mgdx0amtprbd17b92vuchbm2uh859xzce5zbnn7k59nc23n3wg5ew9',
                flowComponent: '88dmav2vj2zsw094xqiffqtzhsvbfuypu0msrb48h2aykuc1xjk9uibyijcwt9336n7joo9o3zijui2ztri4dvabala9o3j5pjae4bnrg678qrujwor3x9x90pzv0ufgsyaxv5h41v132169bsudfntysehl6xq2',
                flowInterfaceName: 'juk9317kujx8i642gyafonmycz829fcag0ngclkg076vgpwu9lvxq5xc6lyv4sfhuhuezmkdpe9yzdpup32ytar6dz0k9ujuqschalhb8f5c1e7l85tz67fc5226u2juw0awjlep1wq015fopcea7hhq4b1c2ei0',
                
                status: 'WAITING',
                detail: 'Delectus error cumque. Cum excepturi assumenda sed ratione voluptatem qui. Error et aut recusandae officia a architecto. Commodi et quia delectus. Non placeat hic laudantium soluta laborum voluptatem harum tenetur. Perspiciatis reprehenderit quia velit inventore accusantium qui aut labore sunt.',
                example: '58gi72g75naapq0bgx4wmczn015xg69hzpqhq4pscew6fvkzzo43jenptpfuh0wg467lgur3h8mqp3lzv520kflpo4hqmy7fkmwau2ia92uaf1mdfoeyitt00jyija0ubpzi1e69htyv4flqim0zikolw2h5qr8q',
                startTimeAt: '2020-07-27 16:17:28',
                direction: 'INBOUND',
                errorCategory: 'fj1uqs2g1qdepl4q9zspew0vnb4aal28thyuhsofqmgueuajrr91jrchkvo5pnukxac7lli9wc9z9m3irp4sp1m4gjsqbnh1yp956yjtb8gxocqnoprjkbjzauhz2ozpum5oe9st73voorembs81kw3xcamuyv9t',
                errorCode: '9gdirqo3i68ihpww2ya6orjl0yn7vay7xe3zmaapg417bk7e5x',
                errorLabel: 961807,
                node: 6113537804,
                protocol: 'e0l7s70iy6n626y5hbqx',
                qualityOfService: 'r7tl6hpzm5106qyqvrmo',
                receiverParty: 'sla1cqf49gxt0avnw96gknmf8iekpskurza4o40043qpezt9z8gcm5sashpm889p0nbej4fevz6whecttihdjxv3l1xpec38idai6qspix2tlnwqq6w5726etfue2m1gd25hb08suxazg3fgf94u6zdd4ito2h1n',
                receiverComponent: '4u4etf8em3i9li4tv06eqz2en5r82n1cl9zbmq83gyaubdr59paqqy5falieflfnbvhen7smywg8kgqz5xgclnlyaz1ck79herxcmqpuhryc9f4tggaqers9xudpe1s95pbyaelx3oy8ye8c7wf0xp8ymowurmbh',
                receiverInterface: '6vuajyo5rl8c8gmyfz382o2ubs51eu6wed70htwlx3723h6o52y0fdh1n1w5oi94vvjnx40ec31hnp1rvhwvin8eup3bpqnalphzw9c3hta9gs39l4g24juyf7pbkuwom7kedq9bgp8h3fw16p0q4r5mk9nt43cj',
                receiverInterfaceNamespace: 'a8ikaub0n1tnzg0sttapd2jyhxga4xud87gnhjqzwf8v66z4oax8piguqvbi4sn9jkp4nsvpgeblq3nozul9pgzk463sv3t996fmumshigw1agmsvdv012u72ncajfpz5olsfguufw2efj1e9pu0dkdt9m6x5ic9',
                retries: 3912579884,
                size: 2153906583,
                timesFailed: 4338870832,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailStatus property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: 'v36tgndvq4lixenvkagwdn2kajs6uwz74yswgp1hldzmnpnndt',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: 'b5kmzss4u1wpfvfy6738',
                scenario: 'm19rwxda6nii6rbmq36dv00y9ba0pkbj76o5h59htou6qbg636r8zlc96cm2',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 17:35:28',
                executionMonitoringStartAt: '2020-07-28 05:54:18',
                executionMonitoringEndAt: '2020-07-27 12:52:08',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: 'ztw17x57avymw7bc18bjge1wk6gvjkrjf85wnlvqd1vmjwma1me4kwanwd4bddn88xr0yr3p4fy89kf216rnwaphqs742avxrf4d0i853o6ulw7icem5jd1dm0l39lztd0524ymcbpjzwyj9mpuljh8i5b5pv130',
                flowComponent: '4tovh7t724dz9bfmqfhlynolyo7a571mn883lo3jvtd432vcbcxlsbpmsc95fjb6b5parom661xasau0nyl8wzg4kznkno7502hvsh0i28zdxrkpow6gqg7mhlx52en4h3xc5xf4chg8uhqtfuoxv0a1qq8p9rlv',
                flowInterfaceName: 'zmm7m3cnx02l0gkbb67hov0zcod8uglem80eu6owx80xmgsoqrm7zmz0w5d6859ypvpo1dmxj24p75a9msr4aow1j8ogq0ioiw5oex9gbmn8vxxz5az9mwl7jv0i7uwzn7ofkvaiunrxg1yj4j8s41w8pp4ogebj',
                flowInterfaceNamespace: '0ujlah2dwxh3oxr3tzz5jzznrvndxtik2nw8k8863x3b1lnnxfn03aglah8uzo71ir5y40zv6pr55fiwki3932h3tchhscqwbjacw4kqedeesedtz76le5xi8pyemm5ptuubpuvb8csu5rnvsk0gvbzhg8r2tkbg',
                status: null,
                detail: 'Est voluptatem fuga corrupti quibusdam id placeat sint et nobis. Et excepturi molestiae tenetur ut voluptatem eum rerum eum. Consequatur delectus earum quia ut. Quisquam reprehenderit quae.',
                example: 'qq6kfcnkrj9wfpprvkxgrpxou2bgym4khhfc09ets4jt7qq5fuz1337pnu1fsc29gnhgu2309roxpzi8ju8u4m96o5ccpy0mrgsh61g7xwqr7zpa0w7abqdtr3blqx02thapzz63d97trz9estxtz7l216xo62ii',
                startTimeAt: '2020-07-27 21:26:32',
                direction: 'OUTBOUND',
                errorCategory: 'bua1y8k4cbjatmbxmx5hfdc7oyvvinxzuoaam7233114wldejkb898rbq5vgq9clhioecj6x09rjd1q04kvr4duc0qe6kbpszpwj2keejdmlxi5bod16r61tkws1yt4rjyc2o9cojrtwj9lt7wpcckmphni83pug',
                errorCode: '34jbey6i506o8hynfwiwsbqep6tt1r8qa6it06u8ni4o7s0r2j',
                errorLabel: 411045,
                node: 6605524308,
                protocol: 'u517n42gha2cq6bia6zc',
                qualityOfService: 'ewq8w0hx6s2kgbo2qxh8',
                receiverParty: '5beyzv703unjqfg55y85ks44mruoppx3sfbx10q54od5r7dezn9ig3x9bfki289hauzwadxwl9opr65fucv21pf9n4ewx6p0z39r3xhzb8pgmw71foweyvj5ygytovohyj3prw0q3z5vdl9dl426a73r03gcs0z1',
                receiverComponent: 'n8c54ozyf373h4bls5i06rgydiy6vp6qnvk90eh8ml2crqht3392cqubzoneu6xk9wfyavb0hjdcs8n2rdjfrbhrgtdh2r6bud23cqjoctcardcu09awqc26ooa71jtqeqwwhp5wq489uewjbns835jw9jdzin6t',
                receiverInterface: '6ostts3cya8keev33u3s20898c76c046o652sa926sgc97j5gljl359h9spxmhunzv3t748aaq6zmg5jgq56j00sv5buqknkltj2684ifslommm58alm4249q6op3i8sl07xkbab9wlz1pomr10nwaay3betp5cu',
                receiverInterfaceNamespace: '64rnmdc0fdfjtyloq1xf4jd7nlf0xpw8pgcvylu2z5rtr3bcj58reop7mpnnfkdjm38sr1yiass0h7u1i0s3veilxfa2z6jv41lpl7xlbvhwxoxmanutfrdlux9xk28p3ydrg6oe5pjgkqptwmqu6dp7wgyj9eal',
                retries: 7117756568,
                size: 7304156252,
                timesFailed: 8247847847,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailStatus property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: '6mh97o8udg27g9tu8qooq2qiiyiv5xhm9tgs8gyaavdsxt0goz',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: '3h4d3sk27g4whkxyxtkt',
                scenario: 'zafbmuuoqeovgpcot6fmezpgjoi6c1i3vzdvuuscv0x66pslgzo3krypyz3w',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 00:46:39',
                executionMonitoringStartAt: '2020-07-28 01:26:09',
                executionMonitoringEndAt: '2020-07-28 10:40:44',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: '5ba10m7ug5s4opn8zxu9l0c3lsiqrz46h2i3xczeteixgtc9qkziyc261s1ji10ycgniaa5yrmznqcsu129y8bpwmued4cdabcljyndopura7e4edgxuh8rezmp2gwe2jje6p40wjyh384k1aewwkmfsmglt2tbb',
                flowComponent: 'zgb7nzye2frj69pakq5249zunslra4pri657dxoa5depcfeze6kjnoiocjn8uyyobe2og44t30nloypu3ogt1kx20zihcbf3etplybdet412tks9jy2sgaobx8kav80919ae4wy7i7kfje7g3kzn44yi7ns99m14',
                flowInterfaceName: '5eb4h6aesju1oj9rle3fi5rb7urvj41gnubxqm89vs07pz5u9zce5mrruoh00ldddmxmxhk2a0posdzfz0kl3708fw57yrru4buh3yr2sg40qr5yfp6vtykpwggici4smbpey46y2yzn3eut5ixvsnafx15qs433',
                flowInterfaceNamespace: 'jjbwsbpirdp25mdei5yrfpd5x37073gehiznemgw8s9k4i084y9p3g57fexrzeg5okx2oqlwaiwe1a47legjjqe2oxufld17v19ffqug7n7lk7yt4emppvzs7rsk38ln2f9uwa4sui6n7vqbfb2bqvy9ywqullzh',
                
                detail: 'Incidunt consectetur et. Labore cupiditate cumque excepturi doloremque qui maiores explicabo. Ut non voluptas recusandae praesentium. Et nemo dolorum.',
                example: 'ub5ec15pl6la2np40h4tocr5gyl8tdelxo87p7c79m361d8zrtv5irwjhu6lqfrt8uohfm9biu0180cbaobx3tk997netlwfw0c8sue744pgaat5fiq6qg15ulix1vlwrxgcf8acj54obbp1bjiwbqeu3v0lqg9r',
                startTimeAt: '2020-07-27 16:18:33',
                direction: 'INBOUND',
                errorCategory: 'sflwz2yz52mp6yp2zgkz2hrr2u9iwclo63oer2zjfkry45c1c4q7xdsignnshik842ez3m7aqq4l4m68bn34kq0bhz3mrhz9oh9bq34ehp0ofj6ge94hvrj3apsqqg7u6qfsu21zomhoudizo9i06a7zwpixxtid',
                errorCode: 'bn0ui40u7nda3ta9l9i0t5q4kfsb0hjmig47fhzo675ld1to43',
                errorLabel: 385154,
                node: 2613868512,
                protocol: 'utiauxwsi3hfjnyle7lo',
                qualityOfService: '0x3mkkfquggcpsocirar',
                receiverParty: 'ylzifit1v6v38ligl3ufv9b5guflc5frsraix3qfe6mbiu0d0xtc9w0zxg34fk6zu8b391tgs5hgyr9lisc3eodglfgvi8jaklkfoezj5je1gsj8gk1uot1itnnc9mvc6sscm0qn51zs4t3i4ac6btb5c5o7bdi6',
                receiverComponent: 'f9wwagv209rt0nc01mzajyjpkjufn5cf3r1ez5ttpmc0zpp7catj2svl1fuev10xd1xbtg6s0qrh6pjmf1cq0lfijgre6a5c5po5ac4l8elwh5nl7fazkj4b9hx0vuftjgezn79koir5bnli62ske0sser4u69b1',
                receiverInterface: 'kymy4bpqjuax8ny8ipbi9jox14okwqrboxh7nuxokieanc0umyxdvv07as8g4136d979kbqv647e1n1v3bdj689nhf2j9koy63rtgqg9lwxz0kdm9h91qsctx92gthfnjsjgc7pga8eujsj7grsurxk10pno463o',
                receiverInterfaceNamespace: '1n2nk1cqq5yiv1l011j8fndieuetvx0fiqd5ndpa28ova3fwykoi5c0jm5p05dj87cfle1wffp08qfwdbvmzra2zyonz65rcuhjdk9ullt1kr0t9z173nf0gg5m78368l8x6s9qog6liy01bi2q851e8b7q81f3d',
                retries: 5036916672,
                size: 7984818387,
                timesFailed: 2358752206,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailDirection property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: 'zpdij3n4rgrzpdg4epo7ps37jl1bjsknob697i1rdhsp8a9ye0',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: 'sc52fj5qxvgqh61mefr7',
                scenario: '45nvqn5tc9m42hpo2ln7uhapnzuu9js3av274dj1ne7fmnfqg4etqber3pun',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 22:40:20',
                executionMonitoringStartAt: '2020-07-27 18:37:54',
                executionMonitoringEndAt: '2020-07-27 22:10:41',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: 'jylti045ygzdguuhj8zscttqkxndqefb6nal5koe609sm398rlburenrhbaky9lj86hfjwkqpzjmat7vyzlb2869vyabxlwdzdhw1i84945k5oxf85whh1q1ftmnq9bepu28cliw6t9pxv27pbys3an707xt8vlm',
                flowComponent: 'wv77a2awsr9cmv4pu4v6tf0m0fqdiggdzba1odzjfcb07hmy971yg4knnocin5z8vlwblmvgs8ve4bxi47xzmruswnaz5mcmwxzj256b68cwsfq9dgbh3i6tsdjnljdmr7kfbhjgw2z8noqan8g732trkwm99u97',
                flowInterfaceName: 'e72x1tnkahry4r9n3sucsfgkp6etkf9eq53wwv5j2kznuy2ri6oa66kve2owbvjc8toyfe2p9ummd17ctil6juw0tfyj7k28sca2y6jreujj2p4zyxmep6lgarv2d725ruowjrfdu9suz1gqtxrfz1xr8q8xw6su',
                flowInterfaceNamespace: 'tq8dvnwoca94dw9k418lg5z8lw4llohmjlr54aoqe5fmdcptrybulu7ypkiylr4quwr9u7hyhz9z7hn0sf2vjumgf5ch3a5efjeubm5e17glmn42jlu2g1t32c3s8mcesnmx6m1lfripvw19lglol3oqhq9rkkis',
                status: 'ERROR',
                detail: 'Suscipit nihil sit et. Dolores tempora consectetur. Aliquid id possimus corporis libero soluta sed explicabo. Ut officia repellat dolores explicabo commodi recusandae tenetur quaerat. Ut sint sequi dolorem ea ut praesentium at. Illo error magnam.',
                example: 'wvol9ppv2twz7jpjwnsy2n08d5az8vwfc7sntnuh0428k2bf8qlhq9l3w7g27ay18mwijh6r14u07d6xre0910cl6b856p904rxd4s8qk5qw3v9rnhj0o8sqwp79ivwuaeqcvht04c3ou2f9webk959lrlpa67eg',
                startTimeAt: '2020-07-27 14:06:19',
                direction: null,
                errorCategory: 'z2lomw9e34ppe3prpera3wfdirgsr7qfcspb0pvgah3rspfzmb8hh0yqe0r2w0bkht6mieibc1lu2gpkrdk7dm38ebw2aispak5dk9fq0tf7mwg2dvcz9fky97cogijy8gqp4n43ygp8x236ixr6d3bkd9ghhnfy',
                errorCode: 'qomoyt35shwotbw1okyqfek05lsa8iygybzhz95khfa6yo2dme',
                errorLabel: 435006,
                node: 8398537803,
                protocol: 'qia1xhdz1u4qjw1p94bf',
                qualityOfService: 'khiugvmjax5fcjpx417p',
                receiverParty: 'e758bd1md6kg30ros7lf1xb4btfh2wwv0ogrto05gqketfgmq8kbl83o7ptwpl0lox9fin7dstrwj1kx32xatd9u2in4vtdcbixt367qw8ozmp8lbpzjpr4df3zj5thjao3xzun6msdmc9vgcujzy3qwpynzkr1u',
                receiverComponent: 'tqv3vrbjz9zl70aj2b3r7tgyl6sqnbe8jq4meoad1nn922wemhcvo7grni81g0zpsaiv002uhedkzguo460n5sepz2zdxjseklgjvqa5v8pkpekj5hlpdazy154iqipz2zmdlywbcky2i8iv2ke53i2nbqaef2yd',
                receiverInterface: '9augkg7atr88hot1spjvgeqv528tbspxgxn66u4vdlviooxxiah2x0gj72jdqx1br28rz7xl7lowshm5qmvoq7euxkszromn0a9g8xwnmcnragfq7vlha2x9ovgvfotq2s4zupqkjpkbb0lmbt7t0jg05vrtz16h',
                receiverInterfaceNamespace: 'yuzqs6qe6igkrvkl28rsdb4ho1qx0q26lv3sqx2jrybnav79f3y4458r8ggctq71t6ogkvzh8qg5fb94ytlijm47x0k4xnzruc7khwllxs85olbji32bd9gntbasrql2jxsaxsp0jtwn3bx61yrbvgfovtqrgg0u',
                retries: 4753031510,
                size: 2477838773,
                timesFailed: 6121332450,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailDirection must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailDirection property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: 'iwnwq22ka8nxwvc2zyjd8f4ur0klackhfmvwuce8bm1jtkisiw',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: 'tac4tdmuxm9ttgkmd1by',
                scenario: '9gfu4uqyhhbbdym5u1v7g6m0qbgdksbfj6yhktxdmzl4aw1tw6uas1ompwa9',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 05:26:32',
                executionMonitoringStartAt: '2020-07-28 08:01:19',
                executionMonitoringEndAt: '2020-07-27 18:01:03',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: 'wp3kfolgywudqq69pajmalbt6genvlamqoproxdvik2d0upuqb81hfg05uoj0fdwb1vwes0ppg5x3lfedsfb2dvc4a8x9q88a788ptjaim410oxy4ck1d47ki3bu8tg6zbrkvx6w7i19g499x4ne5ijwckk9gw2e',
                flowComponent: 'iblsjcec4akgq0ixjib4kprvacvcq09fus28691eyko8npm8iarv8opyes2iwymog1gfhuwkzyn1d37u8tq9lx4nwy1c2lgij1krtaa4kul1b622m9z2jjh7b1xa59uxfvd157803jih6anhrbt3qhhmsc07dpi9',
                flowInterfaceName: 'yms22r0rv8burwo3d4t9enetuimz88nfz8dc7bb4nr64vx4o1ky6kyirkeeku0ptzwff0xirvfwkrrd8ydba514s40yw2sfqxx73lycq9qphdin9znfw0sfebov0nj9vsexhdfax25z19ueei6k34nlxfxn6dqfw',
                flowInterfaceNamespace: 'o9q5bd8azun3vu6pqv8bh31kk9xedaj2wsbbruyj3zlf0dl4njqbfvjalipqi1thobiqldmp7jqds8i23znfyd1yfxmpnbev830lw6mv74sk58cgzghk1enqxm0scmyt4gyc33sdaoy9xwi0v449jhxdhlnt250f',
                status: 'WAITING',
                detail: 'Ullam id et atque voluptatem amet dolore exercitationem nesciunt sit. Similique dolorem fugit et sunt culpa rerum velit. Eligendi eligendi voluptatem. Et cumque quod animi natus voluptates sint ex. Quis amet reprehenderit iusto animi qui nulla et. Consectetur et cupiditate.',
                example: '6ml5ki9s6ebmu9u0mke6aohrxt7r1q0g8lox6ovdy3ep2mgpnhhcnhxqr7u9cbgnzheyl99w5320cyxio0bit7c8jb3nocf8a27w8fme69gbgigmbt7l9juymld6miaus2cg2skwugb2z6kd3d57hik2tmywwgvo',
                startTimeAt: '2020-07-28 01:47:55',
                
                errorCategory: 'ej78aivv1pbe9kn1yzhxzzwj8qkwq3tkr2es469d8nljioxg1a2290epkh13raglaj5if4j7nad0qwon36bxujdamrs0pt64bdwwkj0d6omtm4k12e0g1ylnzteibaagxsac7xgy0xrvit9zu51inm8g3xgkyf72',
                errorCode: 'ldjqlaz6xlakfyzz31kobtv4914ewb63u3smoqvznu7lc2pemy',
                errorLabel: 561739,
                node: 6508810198,
                protocol: '0vkayoge4r5r3wlpt6ie',
                qualityOfService: '5m7uwp97iyxneh7ndllg',
                receiverParty: 'h18qx0dfviaaevmanry6e4bw1qtjx29nm879y4typrg8y6hwxjdo40jj03zvd9yutakr4tn5pz107qzi9n6td9mb60rr4j9pn7a3cegd9m5fqntju7yecy0jva3udwhljgd3gga24zhjb8z2wcqrs5tua3isz7an',
                receiverComponent: 'bom4g4ip7xn2oq2rhzrxft1xxxt3lfdbauywvvljhumf7yzkiz8i3dpd6lr5uue5mtn55m7fynhci48lkey8ajygjheggns6apk8jsyhi3cwi5vxtpnn6dt3if1wnk30hqav8f34ozu0t1dwxnh31dsuncwxq1s9',
                receiverInterface: 'dgc7xyh2p4cewlss21fb94escnst954a81lswcecbr1ycqiffw9prtf2bpff4tx3ydtdvqs8xenl5u5w9z92ce8mdym36nzzwwcmpzs1zr6pfbduf9qyae7l2o20yshb120d8a64ep10w4qnxh2g86d7xfbsfjed',
                receiverInterfaceNamespace: '4hgfv4lun6w73jqbgoc6b3659qqrab7k8d5h4ph3dgat6nwh7n79pwlk2r7n5gxl2v8weuwnbo42c9b9a8z8r2a5jqio81itnzwovkaqq29rlcagrpbt1qgbq1hksq9k10fdoj9etbyjwp71rouroqwokiaz8vv4',
                retries: 5320378250,
                size: 4868679379,
                timesFailed: 5475706074,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailDirection must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '93r94xtnu4rkvxydau64edrdwts11h1fylfdi',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: '3j49yaw0etfjl4imo3gcg95132laa0ud7xi8bzxhifn6xi4bgx',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: '091u9h8niiy9vi5c4yd3',
                scenario: 'yqk8f6gd39ydn5har4xnhew1znpz4cb3ieemt9ricphtkhvl31snnjsor0vf',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 03:41:09',
                executionMonitoringStartAt: '2020-07-28 10:41:36',
                executionMonitoringEndAt: '2020-07-27 17:34:01',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: '6die485vq9ipkl0gu1qr04kmdu4v53aixzgotrj7k75l2gzhdzp9onn55y2sclk0oy7pt1yw0fzio1rq24rxsb41pknfcsligxxya4qo0paqjprlyyumgenet2ebmosatf8vy3i1smkmq0c8kgbkpmrcbkjny0t4',
                flowComponent: '46uwd7bj63npmcwgkna2kycc6rs80r0wvcup4o5oa847ikktgu1yrsswd52vlkejora4ms598wu0bs0ojdbddz6dgdahuy3sl8l19v261zj9xxe483fw48iukbltvse5fpfkwfkf8bcx7u2984iymtqusblgh1i7',
                flowInterfaceName: 'bme9sr08x31hbrxkfmf6hldzqwnzkioo05t294u9roz2finaojjmpnpceds8o66duev58ngwa3l1x9dvb2w9u103o546aic6mtay6q5vpw7tm4n2ymei4ewmvsk1321hhr32g1g2jplhe5m2auytp8dys9dyoyxo',
                flowInterfaceNamespace: 'g0f8hm9urafrngptqonkzb1symurjrgd482eqy3k4nxmaei7lfelf1wv00gacxic208c0jtmy6su4e8s28jxfvl2irpjof438vxhf0pjzxbm9pc2ymk7pspg7qefpv68s8ejy6iha63si9m2jp9dfp622eos659i',
                status: 'CANCELLED',
                detail: 'Voluptatem corporis cupiditate minima et aperiam voluptas. Modi dolorem iste laudantium quam at. Cum sint inventore itaque perspiciatis illo illum. Maiores ut veritatis sint atque. Atque natus nisi sed. Sed iure qui nobis quod illum.',
                example: 'e2vx0v23idlc5vlqfbwyntqtqk5im9msf11hdytgn7c60fe2xtyvyl1n2g0clbzupczja78pjremaujci392ij7bqot3coooynkdmekreombywu24x2u4xmbjr0984cm79v38wwqyaku1sr79hqtfkfvkoaoc8tx',
                startTimeAt: '2020-07-27 13:47:59',
                direction: 'INBOUND',
                errorCategory: '0v1togrwjkwwabqlu8h36dw5ptw6j333rtrwphxxiig010o71xmm0xvxrsalpxljmbb5ly83du51btc58mufe8thqs4sd1qcm4t3ymjfvq0x4pl2qjuov5ptl3nt088zccdg65fvcv9glz9ds6cppv9ss8384bwq',
                errorCode: 'h9ggyag87gzw0pej1zw0z4tww5m5jcrp5eook3gpfi35yv4q1u',
                errorLabel: 509408,
                node: 1392069868,
                protocol: '829jzhvfb3z891trp0yh',
                qualityOfService: 'fq288ra9vlsl6kr4h6ww',
                receiverParty: 'adl289wxm1b93j3ekjqfir69b408beqccntks6fcmbyo9j73t4fg5tvt5bbdkq2xwkbcrfw1jxzmfuszl45nauijhsmgqdl2p6n76a8s3synoncvqlhrjjubdfijifmilz473m7xlliu4vo8z1p25r8fonplr83l',
                receiverComponent: '05x4kagi3ta5xobkyyz1rhh8kr1tz8nq2p8t1e75swfv1jw6da2h5un8csp18yry83210idt03vj8n1snlwyqkvkjqeg8dwta7e0bv2p8wt7sleagouikyptcod3hutkr7r56z9cyqs76swp7t4scs3i9el1mhlp',
                receiverInterface: 'w9rqwdf8knzc6zxz0emkam4bjtocnp16i6m3p5b0b12eu5q8m99dgz2ik1mnmbyip2e62xgztrtkzif2yq3y0gfrpq6v8krdvksuz1pwnnuc7j43cu83yv7s51kkh2awyftkbgjglg8fwv1qqfo4hy8k338r0u5l',
                receiverInterfaceNamespace: '84alsuej5s17n4721zo0qmt6bwjtf7y1a8qah14j07xo9i9bix2b5zgfo0eiec728xwht6hncpxjhdjwaruh74cr788rbaq003a2s998rgtrr4xqfbjlu0dlw2trigl6sxpgl06ikruopq2u64n965s6v3p24ssp',
                retries: 2320204042,
                size: 1258264717,
                timesFailed: 9214491266,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: 'xt93gogqvtrrh088hoifgp0wa1bw4pw1g8zl0',
                tenantCode: 'tmpoazlxjvx8pucxqm2jnvws9cwvbuz83aaeij5y4k1hb7le8i',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: 'ikyyfbffn2zr1lhk0jcp',
                scenario: 'v5rd2sic51bsit2zot3ffmpjrkw0yic7ah5jk801fh0uppuf7eyapmv2bg6r',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 00:22:05',
                executionMonitoringStartAt: '2020-07-27 14:47:23',
                executionMonitoringEndAt: '2020-07-28 02:21:11',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: 'dyclyqt7ep3edevu1l01dds3us7vxbhtum9c59mx5cr93qj2hkz87ppjt84rnlho6d9gvkjyz2bf89gu0bpd7m0csr7vxst72f9jd2uok6m7lwu8ey7h89i3i7odt9trri8nyjpbeoh06o5our79s02b8c52fiao',
                flowComponent: '9somusj7899eelpp3fq6gff1uvdk997opmbx93z2sa90ob32p8pl23ajfrjqq6waimmmuwgoagml6i29urlsg4ei9vt5a9iyq8rkwrjmi71eq9rvhbh4n89c8ab81xd0py26soakr9kh2yi8qh0aq7h3s7mcqj9s',
                flowInterfaceName: 'i753vc1z6luqk8szadp9xr707kyuszo7rcnm113i9sxrs5rt1j45oaqu9b2o7bn14qhdjjjv04hb920fp1u5y4nxd6xqaetbrlap3k1y93urue67z1s5zvtn5c9q9ezfujz6xgzk0eoep1uc05tv11sruii7weji',
                flowInterfaceNamespace: '3owepm56s7vte28aw1f4ymujbtqk98v9rc7n8b46d1pg4yts8ad6arp9md36cyboeju39ib5en2mrkfpifvasoluhrxszem12r4oas0ayxh9e8yhv4ub4f61thh4gpch4480o3uqpx55dbs0f0j1z5cod4nx8wvo',
                status: 'TO_BE_DELIVERED',
                detail: 'Est ut ex et nostrum vero recusandae omnis magni ex. Quaerat ut qui autem facilis laborum dolores voluptatem et debitis. Qui aliquid fugit culpa nam eos atque ut. Quis eos et quia quis dolorem temporibus. Esse dignissimos commodi dolore ea numquam voluptas et hic velit. Architecto esse sint harum.',
                example: '02za78wb8q4s5llg7zc75567h7cyh23lx0ul54lk0pbhpfsbaex40yjyckf80b942b89azs0qmia3oha0xzid53c2mrrpn4hv6xfki9hepohwitgr41zcfawp3qeav81tyryjxqg24dorpywhtp89q5ikmwnmsrt',
                startTimeAt: '2020-07-27 17:08:02',
                direction: 'OUTBOUND',
                errorCategory: 'htr3wdjqj0d8jwjrdobic87k5h8wg2e8ysjbyfm7849kawkgetrqlt21qm3z5jnblx35zukpveyzjzwevllbfxdryrlmtpv0frcm9k6cyk54d1mc6spdkzjm4fptw1dyetg3z4ixmdaoiflxwoxl6xhsewhgom43',
                errorCode: 'osya0vhnm5k1jyu6iie5o589csknfkjqajdaxfmm7sh2vgkq7m',
                errorLabel: 629963,
                node: 5056532678,
                protocol: 'opx01oqj72gp789nj4sz',
                qualityOfService: '8n9ob42a2m0s1t8f1gtj',
                receiverParty: 'jojucrmmjw9g07dcq6z9mi0ygky4w3wa9i8p28pyb22prgpz60ajhqkyj6q55zg2i3bd9t3ttmpfqojd4re7okejkoxwzgdscp7847zt5bxyi97aopypbdpeaougcu20b8jfjr3rh6ph0l26doz2z5vzriwlcunn',
                receiverComponent: 'krn1nagfk4jt5nrvituh659jenkas1vqodrkdt2s0qar9cs3unpu0nv2pdgumajqb74qfbolp12gas1wm0115orsq0lqaqabyjswet2abo3c8tf5wek4sq4015xn58vxk5xp22f0hlzvv5th0c08pnycy8aq0jwd',
                receiverInterface: 'xew6sc42zn4b1obi3ijndg8w2fp1fsyoxqz3z00bj9mgn4pqtrzm444azjnkwko0amijzkdqkx8nx4u72q7vgwbq0mc13hwdao9nkveslt2px9vkowaot5g8nwjocmjxkezslvbe0mb4p5h9qxtlawgm93y75p2r',
                receiverInterfaceNamespace: 'v1m0k1oo3w7e1p9o6xnj9g50ndut52jy411e0zidlp1t50wuxs7sfvf9n0b5vymyfwf6wbzm9vxt97o95sr7icg0ajn12floleywp6k35ldwmbequ6lghlqaflm5fl57t9tu2j4gk4jdf75tzz9sjuqt9face0iz',
                retries: 7821875858,
                size: 9476273210,
                timesFailed: 1055109950,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: 'ladbl6pfpbgr1hz4dzhc22hd687lko4ghuie7ugq7419aaebun',
                systemId: 'n0dwewducqqmfcla9kjehjqsru0bqxn16rsir',
                systemName: '253p465ls9iqrobumu73',
                scenario: 'aqiyh8arcvxbox5sezoc9sqjn3frxu05ghw0g32yv8pynojkpmabngvbi7f5',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 15:47:03',
                executionMonitoringStartAt: '2020-07-27 15:29:57',
                executionMonitoringEndAt: '2020-07-27 20:34:39',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: '0peuasxnwvqvap20e3o7n79a6oh6myppzn3vwtoyh2ocq2zf0bq598uorm9n70dmn1arbmfynt1japd6dpboi82v51zrymgci901wa4hiyzqngxs4osjyceyg957qsn0rxqomf80was3o891cmg33c5lrodfypyy',
                flowComponent: 'fizoco68n9s1oe23xxbfytcwhhgqlrf2u89hk7m6gii8plo3lmfyq81v4todumt0qd0sramy8uaeee72dho3omtk19u405o1hexl9i6lpeaj5dn9paxk2opvr271dwfslaklverkga3y8qvo9k8spls4uax4jg28',
                flowInterfaceName: 'o9ao2typejoptrjfd8z97ihw735zzdb9mcm46m9n0k7mpay58cx9un1h59g2mdarmh7uqm48epnu9m6zuctwm7tpkeyo8ueikmemkpg5f0zr5c2jcrjl3owo2ca3ieuhf3pwakpm4e18z3tio2ivzz8m1an3p2sp',
                flowInterfaceNamespace: 'la6d7dwbuilvodgkwxd3bmhnizhm0u9mb812lyqialqnt88lm18knmptko4c6plj22xvmx5e6p7vmmexfelt23c5l6qad5qldyrnifhlnso3eqbpb8mrf6qehqf3teadjqynylufbbjw1hcxvt7gdt33m3jgiens',
                status: 'SUCCESS',
                detail: 'Qui ratione id nobis quia nesciunt. Quae maxime molestiae dolores quam aut impedit. Aliquam assumenda quaerat quo quam voluptate adipisci.',
                example: '4cv3qxhzcsq3477ihzinadkn40ve1tmpn0pqdajvh0r4kuvehjnyupgozq7s6t2y3sappraml6humxs990zn556noax88b43ju4lzrkugczvcqlmny3g9iotnaqxgmb54m1v6x286bdmob7mwi6iewm6ailauxsh',
                startTimeAt: '2020-07-28 03:50:08',
                direction: 'INBOUND',
                errorCategory: 'al2zgd8jp68omy75fvf62tlcmdjq64lsr5oa1vchme8aqcjq10bjs1ardkgf7nqlx3a2bd3mwbx7ujupkbciqtcxjz0m6maw24brw50jarbh0yigqt7cdlif48oi59gatyizyufdj6z7vm4reupcljh4st7o3ncd',
                errorCode: 'lltzbtert6ay4etzp7ff3odib7uduqm73df67w9xnw35p8eqjl',
                errorLabel: 892355,
                node: 5813049299,
                protocol: 'cf2k8tzr9obduvb8gqwn',
                qualityOfService: 'ov7yyhhvs0nzxzh32duy',
                receiverParty: 'xfcqauupggiw1y4t7jphmvd6weqi8cafmqe8xh9u3ro54agq1mqtsbfpbx6abldvkv6n8o7wz51i60tkgpnlqhwq8s66dwuh0k3h2zoq1jfi4tetetm0ni46h0p2p9d6bssncaysdxc5elhk33s9jh9bnfcbzarx',
                receiverComponent: 'rvovyltrztc5ndx3ebo40boingam12gkxuc2s0qyqhza8mihp3snletsizflu2rrxn6edr0s5gr2p4ss4ldocrs0zfzl2r38ijzpgyd6kywuhldhuub7p658x5076ypwbedio29wzo6bz3wbrgss35me5i84oc2q',
                receiverInterface: 'i0q2amm3huocl9m66y0exgyqhxzk3axddv1iw9gayajdy4itt11g9syssoe5jxb5blvv1ajsxw6sqgvphadqu1yw1duw307yfzs95encs90y9mrqehhovjoxvvcasv85wxdq9rfndmfpjcsyl1qfzf0jvf3h1u5p',
                receiverInterfaceNamespace: '2dnuuea2zz1nzt5s2o66ihr6u7gt8yyecpx8qfze10dlhluigipgikn71zyxjimb8oekglamdus34bwor8k2sge36frxf9m5be8h1w5ac8ii5ei8it8is6dbxvvdyif7y73m3rlhneeu1irvsnvgp6423esd6li1',
                retries: 1479199590,
                size: 2141291356,
                timesFailed: 9327477668,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: 'wk1v4m3v853xow6xla061in2jfhgjv3c4p0g0inufm5hbefawd',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: '5aqycsryer74r8emrdl4',
                scenario: 'bkoo86hchoeuuzi20fhmszcd4ii4p5uoufjdj0e1syeln5oc7ppzibn89l1s',
                executionId: 'l16rm2wijay5ng8sg5gdbyqyeg7lyzhz82hdk',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 12:13:06',
                executionMonitoringStartAt: '2020-07-28 10:34:55',
                executionMonitoringEndAt: '2020-07-28 08:44:38',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: 'uqfvbxzom7h8alc16r5v3ej11vxx9usb7o3d9lih562oaa1qxfehmx2dodtl2thh97qxh0cz10msm66hb2tge6qr0jkp5xqy24pxfaiwtvjjqs8gks241jda5vbb5przplojn6cit276xcs0tiitajn2ur7v1v08',
                flowComponent: 'pd9miqppxrrz4tlargax5531elr56p9j4sot1bhh31w63p7ecpcmg686kxw4nqc7yh73y7j4ogpk90uojjrsh40k0s5f6nh4325hl3qfxyodcgrb1wcyl1e9x8nzoev8u9elqk4lh1w8vy2fjist0s1acxroool0',
                flowInterfaceName: '6ch86hzd7en25sjfqx1wxoscmc2s6f91ke6esgznzrr2pvd9surzbygyhzzpmnogkkz357m8zdtzv0m6r71n1fuft43bmccv8jxmyontzwzfnsjj7g3qjvl5dd3vokiucb4li148rjat3ds64p3dfa0qo8t23czf',
                flowInterfaceNamespace: 'i47rhks25fxv3414o583gitdftmtme9q1h30ee9p5ial465qzc8rm1knn9y8otwtplunvpgnp7apxnymyld4s37k1oz8nahv2d9919w2245oqg2r8w8iuiqn0lj1vdva8iw0ozyig53m0mfgsfrwfyaqpk1vws0x',
                status: 'SUCCESS',
                detail: 'Officia itaque est dolorem. Qui libero explicabo aut. Quis nihil adipisci nam a qui. Animi beatae laborum id rerum sed dolorum ea.',
                example: 'zn01tzwtgmd8o8f7j4bduoaq2fhxrw3fy6w3xcrthtbvh9gha8l4cxx19617h1yx7av3zvsgl0r21ch6grmm336a5eqhr58xwmd7r7qj6rsk2la6ktyzh3w0ud7kqyy05b8e82lxmbv44swwe2gz92wyq18nrpml',
                startTimeAt: '2020-07-28 06:17:33',
                direction: 'OUTBOUND',
                errorCategory: '9w5ttxxvki6ne9x5684sb00ikflwtvvr4n3cp9yl212ravdnmj71xh6afmzzgnt85pcurxf9vr8s2s42mq5drnint4d2eot1djzplenio6hllnxvhuzc6g4z2cfk585fa8ctghw1tn8vx0hj91c5mrtzvn5anlfo',
                errorCode: 'p75w48a8qqzubs26izy9z3ftynmau2nkxmvtrvh9k7zt06ga88',
                errorLabel: 824535,
                node: 1647351005,
                protocol: '0f6546vb2ggwwf4026ox',
                qualityOfService: '8pd47t9g56f5opbsxfy9',
                receiverParty: 'rdnkr548is3wxi9sbaokwo8nytsp02lmi4gvgaa8u05htq9l4k8eo4iejiya7f5so7p16mfrr54pyab6s0duvvw0arvxry58kiugdnzz8kju6v5s403lz21gfcn7t5udby6bgmh3y7b4xdtizklndts47736x436',
                receiverComponent: 'pt84eskhgkm1wxf69p8ft033u485iso8z0fa0txle4a8f1vovo5sb7xpraa7cu7e1j3bpw5jwia12qm19opdux5pfc5qlt8xfqv9gv6uyz2k24mtdby5n049vs1x21gfstn5v6qtlmmbgnas4gt7t28im5tz6nkw',
                receiverInterface: '4ej49tk8mmte8l1cnr0matwfa4yrs4bfg89ojfyozl0lzc7g31wbirasyr492w2jdzdo8jkaki18xr9fdm7a2z9gty71o9ixsitivxs96jcsfx7vj4z68coyfxsep0qlht5y3gm3lcl2tlrg87u8jcsvg17og0wl',
                receiverInterfaceNamespace: '0zuinf0y0i7d40197jng7jasr6jhf7a82eferypph2zgqtsbfuozkjw2c7rfjc43j9gf5yypniq11il3ktox59dh2xnpsnb2i0twy4ovp7nqfu7t4pzxrsmcgjaiemcsnw1s5u258zs4xf996541lxuoane2r45q',
                retries: 6649983690,
                size: 3153517252,
                timesFailed: 9084517505,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: '8u8mux64bi0ot898pxffcqapm2vvzqssusfp3tlth5h7kja4u8',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: 'emvdydu7gat7l311ssrc',
                scenario: 'nyyrtkk2nv5vm06nk32uvaipnwdpyxh8vxeskcfvh27sbvmbn0plvql5hn76',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 10:48:20',
                executionMonitoringStartAt: '2020-07-27 13:56:30',
                executionMonitoringEndAt: '2020-07-28 09:44:34',
                flowId: '79x3wift1rore47j9cu7zo59kl34qk60ownzb',
                flowParty: 'ayhm6lkwce2wbb5vr91eaao89xq201wb7desylde3ddlafq6vy08sbbp0hc47es3o32ruh4u77p77v85t7o76som0yce9rvcga7xxg0cr69pky6a6k0nf7foli1jom4za5agbdqlqdjw2bllbx21rqjrqezly17a',
                flowComponent: 'fgvonby28j8pkju8e68bvwnln4ozhuzsf1npi5y156i17p13d5femzz3plj1kkbnwzl8zpfpc212sxq4fj5vsrn6th84igtzvmucvi0r0q7dpoo03ejuejgqm2gq5cxjddbaf4yqum3s4d3xlr9bvkj4tc86vih1',
                flowInterfaceName: 'yt5rxnvc75y8gg1z1n3j7fau78rmuaoi6366j22qnknco5hlmoq5v489gtixo2op6bhu1nohjymd2rsgge1o8clupca6t6iufzf8lyplnsycyy5eyxz4kahon4czotspp89rs4ye7a7w81zml4jo3xmy2guraj95',
                flowInterfaceNamespace: 'rakz1yik776xa2nrzqw9q0j794qdmxrprr6pt7xn70p1e8becdppax17oe5wtidqxy4ivtthci4sujrauf92j1zemd0lzrg39smhgbyucsgm6u0037jdkqltk7ixkm3ak0x4o49eiz9nsuloo44793f8v6vwvm65',
                status: 'SUCCESS',
                detail: 'Doloribus eius ratione sunt vero similique odit. Alias in quo quae quos soluta quo. Omnis voluptatibus eaque aut eveniet officia officia voluptas. Quia enim molestias. Sit molestiae repellendus autem.',
                example: 'oek405vpzkahv92hxipaby7239fer1o27estjuu8v01u6tgzta3q5gp6oobe1yz9v91dzrcyvvdz8r521zijprw6v1jstvk4rzady42xggaxcbnv5gluhwpa6l9vomue442cbd2rw80lnoo9wftutlp9wyktetyl',
                startTimeAt: '2020-07-27 17:37:09',
                direction: 'INBOUND',
                errorCategory: 'qlbws28reewiv3hz6ahnwdxcmbrfid6txzvntrx3ludbpqyzatw52v5ww7mj59kk2ozef3jj3gjlaqsjskcv4j8uo35u0o0frgwwlitrf6nvl126yzmq07lqni1igb5ls3hpe5p84m03qxstoh4f774cbaobyb4w',
                errorCode: 'oon40lu0hgyzc30d1t09f5vc5u6ds7c3ktcftkgwmx6vindgc5',
                errorLabel: 333979,
                node: 2958582432,
                protocol: 'vlkuv22yzfl3ab7ajtf1',
                qualityOfService: '96gkkhv1x0t0qwao7xsr',
                receiverParty: 'nor746q5dwdbh1cw61jomqfqdbhamrt0kw1z9oukhobup4xh48twb4v0kqrzxm0kduiz54obc87qm9k53y1j2a96a28ohkxughjch2pp284m2jgle1fumngwggfodeg3ups0hk90gns7q3j3mzleiai4wn078kct',
                receiverComponent: '0rmixwilduxox7hixxqfvzce28yhwmsk0kj6mefggd6qt8s7wjw5kgzuxp80kh6b2o5wq07vn3ya9sb8ioafp2r9zb7xfajn6uk04b7nmmnsxrsurjmqd9upukwj3qqfgigc92ed61zlg2la0q8cro3typa9cvjj',
                receiverInterface: '611xy2m2i2rtiq23kb2yy3jzuskbuquk7yecunce2rur55qom3gzybuskjz7gp7kyah1tsk26gqmpua6oru162ch7vio1pdp4efdbvo44qhcekpof4f88e9pz5cgqjy3sp9i578nviblovoaui7emvdp0l4bx1ub',
                receiverInterfaceNamespace: 't8pgkg1cqsx8m3nelhnowsqku91og8hwpxj45r1taw2ggc9yoivj6czb3x2kh6673wss4yk38tt224gk2tvh3n4k5snundcoik0zkm220ejhnmynfmpw0ncjr9sfmbxlfovbx652s75gp74et9ztvhndliv9jig0',
                retries: 9051154145,
                size: 6448237364,
                timesFailed: 3980667176,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: 'cldale4pi22amb94dglk4qfmoicy1d2rfyc346cbcjvexgfsilm',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: 'fcdpb4f4psin04mq6j9n',
                scenario: 'ufmcf58ubxjwa8t13llh34ol59lfku8l1e3grfyf2a0b0d36slaez6q2mk8u',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 11:13:54',
                executionMonitoringStartAt: '2020-07-27 17:53:43',
                executionMonitoringEndAt: '2020-07-27 17:14:26',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: 'ng92hgz2u96k0sk8ysxh1sn997zgdvforux7dcfygb5tyla3fq26xmveak87xdk1qkbfeoeqtoqu6xnymk9m8le03a4eojsjc6316dt48lqxparzgh31h7mg6e4qw7zyq53l0yekl9vd7r70h56kkk787ckd584p',
                flowComponent: 'vm3bescrj5exlsb0y62njw2fqnv17wxwccq5bcoyf6m61wmnq0n49q5x97sidbe45xr4dsqsr5ry1b4k9bb088fva30bwrlb1whn3md36jewzpm1q81hm2yhj8tn3hem37hwvvmzfokhalr4h4uhr8pngmm61c64',
                flowInterfaceName: 'ju91rhin5zep89vo494wrt2hmjgt9qwigc5akepidnjnt3yzo19yrelcek03r1tjvfu35lou7c8rm8bkhydedc3izm07lijbnprnvstel1snleg5ybpydb2p0raoa5rldnqh8gqpvg1crc1omgjaer31lsci7vvw',
                flowInterfaceNamespace: 'l64424kt8zm6h337wffm5eyomo4nezs8ozigq4jodgp7ycwc3xs4mdlak3x2boq2cmlxjbcko8swqkarp3qpm8uefqwk5rt0xc27f1jybhuouic6orob10vyyhmsy713vtjpn9064yvc05t73gbbsdfuz0n1n71k',
                status: 'ERROR',
                detail: 'Sint libero autem et. Omnis tempore modi sint facere consectetur aut modi modi ut. Molestiae tempora reprehenderit recusandae ratione voluptatem maiores quia. Voluptas dignissimos est accusantium placeat velit. Debitis rem vel temporibus quis quas quod voluptates illum et. Inventore earum culpa qui ut nostrum ipsam itaque dolore odio.',
                example: 'gq5l2n5bc2z8xo52lv5dr9lpvs666luf5pr278bcfq3f0il7rt1l8yolovvz9va1fhbdic3g2664flcyjrlhs804lop071b8zpdhu4ws44i1pk1twa0a0utor22uw4at177pcrequoj1fsadicq3d6abvzakqlea',
                startTimeAt: '2020-07-27 14:09:48',
                direction: 'INBOUND',
                errorCategory: 'rmipm3rk58wfdrouep1fjc9i9nz648rvvmxdd9ijz4sbz82p5tt7iu20z31ykb1tp630g1xh2a9fhkadpfvtfnge30k2n80xhol63iqm17yq6md9l2eha2kehca4f8jh5tze8tf0ab0qsidx6negiqo16t7279ei',
                errorCode: '960xf73o7rxl3s6ujj5hyy7wxvhlehzf6evqtrwx5syaaxb3rw',
                errorLabel: 439216,
                node: 8608391365,
                protocol: 'ot4irrs37tgrdxxv6mnp',
                qualityOfService: 'pkzu2dg7vdnutb0boas0',
                receiverParty: '1j88creeu7vi3k59c084gh7oym9fh6wdt9kwtgp4v0fk87m5272688rl6xowjoqfih4ca8darmupka86tfnes3jgzl7dob62mxpyw6eoerbjnncardeyp0ylcagxwvo0dnyahojbkayrypeufm62kicn49dtrmwp',
                receiverComponent: 'euho8wuietjukm0h25z7jezmqyhr1j9xy08025qeo3l1kgxwpg83a6bl2aesa3d9gujp8imf9crh27rq7xer6jx3h8mpjhp6y6haorbpzn3qw21bdvcpz5gxjm1gezdogc15mpeg8qr6uu0nz124pmrlkyoacw0o',
                receiverInterface: 'ybib17xlvuefhm3bz8za4gzvxn3sc9x323spucwpzpx2noxk2osl4695te2vqnkkzlyiamhvhkpgb7btre9hwlhdqd8q41isbjh72i1b31bkbkqy3f0hnsfhfhw3nysrtx1838riwji8tflded5l49qdpqhe83p4',
                receiverInterfaceNamespace: '72uqcvad74s2mx9dx5cyckalxnks5zf5vwdt5tep7udbvpveywh0oyop8a42k2ivw0y9rsc3h6xrvoob3obqrcou17vzla5xrc1pok11qxzutcpoiieufb6nsoaj3vjkjbwn9gfjfajar62jfmfhdgjlx4rbjo01',
                retries: 7212029374,
                size: 9796484251,
                timesFailed: 5197638055,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: 'ru0q6dcpospwy0u6qpk21j6wm4564nkxlmj4687pbwnvdfae3g',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: 't0jkv0w73ox37lnl5bbp0',
                scenario: '6sthgj0ng4rvhd3qxdod0d37j59nvbrv4zeueq33ynno982njxyescejzqff',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 07:30:02',
                executionMonitoringStartAt: '2020-07-27 23:01:43',
                executionMonitoringEndAt: '2020-07-27 20:09:49',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: '0x57rk2ocmsth9ic9m927ok4s1nh4rha93fzrg3hhq6dq9egv6ejnfvjto3dunanh4vxabk8tonwt6k0gdtzxr3doc2b6z83q9435dnn2kwye08ihumfnmdnelz8tc07g5rb3mwzsybaj00ttdzyde5wymyauwk7',
                flowComponent: '3qxn6usj658bwdug3g7ywaj8nusc3771gnvr6gfxm63u4cznzx0vnk2x1miyvz0b9ntcbxipw1kjxrrfkomdxkftfyv62l85f7upicsusy1i5s3b6a6r59xuqj4ap2slk8tu6trwdwu7k19ghriogvsc73ogkcwf',
                flowInterfaceName: 'rzlvwucid8ndcjif0rfjnbfw5y43xatkdo7aknlgptk3mcva68nj75yo8i4v0u0t0ebv6upxvudpgt2n1dcqq9p042jo3r4wx80s8u4xruiqb4t7ahbnhpra09jf7aqfxcctrn05fnov7xas3y5xkdu4iguao6yy',
                flowInterfaceNamespace: 'w43cng3wlq3w0yhefqroijnc76vyz2e3aqti4nw5xnd0885yd8zgmbe4oulaelaxscy7qx0gvs3t6eevwzuw0pnrbv0isg97hd5z01ifun9bm7xk3ad6sb06anrr2rqavbfnaizi0qhndpv9p44329dnf7jvcw77',
                status: 'WAITING',
                detail: 'Quia dolores sed aut veniam quaerat voluptatem culpa dolor. Sequi dolor quos consequatur quasi. Vel eos dignissimos dolorem autem. Illo ullam officia est eum quam iure aliquid culpa laborum. Possimus est reiciendis aperiam est nihil quo voluptatum quae. Omnis expedita minus dolores occaecati sit sit dolore maiores.',
                example: 'dur5jpapovgb3n4xq317kb0ldmc0hxqx9rui9vwxblibo1y3xgn2vclw8iah74dozp2utvgd48yvub3473yhqfbo64zprtxlr7n9d61eaxxrqjqmj8zgjt6rvl6k1lr2sgnyi0t1786wcuo1wf0k5gcj2xjnotrt',
                startTimeAt: '2020-07-27 14:21:10',
                direction: 'INBOUND',
                errorCategory: '4nmc7259389smv7i22kcc1hywvh1pv4iw8ikpfj8x0z6oxq0zqp8998s1gufvmr54rgigtk797uywi0u0t82c4bjblxlnelt28frtlqvj1lyomisjth2bb8r8vpo6iz1v8j6c4vw4kdzx8a4kp46vlanocduxwe6',
                errorCode: 'rflo2m8tsb26nj5l7dio3uddoegcnmb6p57g7153bz20pe6bq0',
                errorLabel: 866306,
                node: 8581787862,
                protocol: 'oy5gzrkakwcrng8rz3fk',
                qualityOfService: 'ertsfn7omzqnbne32bdn',
                receiverParty: 'pbj7wlf46q58gm9hje7b42oo3wrn7b5k4ltrkar4588zun7w5h4214trry6gxq6j1fwwtrffo6kzjc92pl9upzls0xr6p8kd3isdt9yl20jumk1sdp1soj8txtp2c438n2woip3thzjt1r28bn69m51l9zn3hulg',
                receiverComponent: '7jahrz7kn3nj7048onptzqn5expxytph1nkh91lie9v1j07uwf1onwuy99a7nrmj43qtyh2b80nf2zvx6crt6fq9v7la0k0wft7xpxpgxrbskxyziebrs8f7ucc2r65vbv3nmk8m4pv5cn1h9tug6a5laedusfck',
                receiverInterface: '6hxuvlo0nm7keiu08onjo8qsft39b192ja7zibw7lejdzqpqsrqjlf2kua6cqozbvfa8zxdcxd9g3tfgxygt6j1qlb53dczvikjqt2i6bq37r095pzcw356dhchqptp91xohuia1hzigi4zx2kz2sjx2yc8iclhc',
                receiverInterfaceNamespace: 'km51bm4m4a2fry4xc0sp3h7lam09zxdiunv3f38hpiw3l0j5wqkdujmvd0ovv4fhce54pe0g482i2a5186mnhrjwaa4sbmcabnqigac3qzgosaxc8mzghb6lg10ccq7lcenw8z1ebgxhevyoukhmufgrvym490pr',
                retries: 4356414777,
                size: 1222730161,
                timesFailed: 8966538143,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailScenario is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: 'tjv5a5fztzz99eb74ta7e2ii5d0szf73nlfqj46up21lntzf1u',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: '5jf60e072n5tz8ljr9gi',
                scenario: 'fgzzzj3hs0eauzwlb0kugrgeskatmck5i4o6s4yvfrhy8mjivjqccme2z2mte',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 00:39:09',
                executionMonitoringStartAt: '2020-07-27 20:13:38',
                executionMonitoringEndAt: '2020-07-27 19:06:58',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: 'g7agyd61fy237osfkeri9vk9c8wyicfrugtmenzqi4773c4g5g1ehs30q70bad14fogzazev5pq7u461de472iue373pqcuxb95d9xrg2hnhi0crkd78lws6f8wsb5unsbts2hzn5tglzozczbngku2t7svvvlt7',
                flowComponent: '9k6ahiy5qdjsi7dncgce8zguo0a3hjzwbwh0eozpy1l0w2oziu1q89lmxvc2lladxyuol0r1xuucx5wkk98coatwvyznvprz76gvmoi4lneyawwis6u9tztp4szban11l3eob2kcdyujwbjt8jt0hdaraxmeogpx',
                flowInterfaceName: 'lyidedzdux1dcwda1nyyewzzz1cnnr90a2ag0hepykbs2bcq3i8z2ujo2iw0qs7s0c3k5ipggm4gu2wuibwb0yikvpghw5ay440krs3s313izgy41n3nqh2w6oi9slugdqxa6fqv4qgsa7utubxi0znrzqw1sb08',
                flowInterfaceNamespace: 'bv63jpyuwj6vr8u9rhyi0smkwnsexn0y3tdb2t695sxuqcp49wzjbjgwipqjwxh39dae7asy5gyqtsmuqbmnk74sb9filit1e20ws84hjzvmypiqdcc1r1f1hdl3lxwhsfbvm5fcmlpunvfzfcoqvxvxi6n6nr3a',
                status: 'SUCCESS',
                detail: 'Consequuntur earum rerum ipsam. Ullam ut ullam exercitationem molestiae est neque expedita tempore. Praesentium omnis corrupti quia fugit cumque sint praesentium rerum. Illum quae consectetur dolorem et aspernatur. Qui veritatis facilis sed.',
                example: 'k3s4b74o430dx8j3ajh4d19qa0ef1h7qxx5m8ts3590qzzda9mjnb6cufbx8o1no9qckroh9ry55vhkox5bp14x4xo50rprtkgaikdofddpht71a4jvbogycanc0ar2kmxiuuiy02zrbkdg5t6suzsw5ifxm45hw',
                startTimeAt: '2020-07-27 13:16:59',
                direction: 'OUTBOUND',
                errorCategory: 'x1yvt7fk71c42pwws2z4ds24ybfaffhdygqdd9l7xz3iq14opu28w6fvk5a5lpv2boux0a7z13x41jxgma8vasgrupbssigfa3afnvo92c1volqnc9yvgafxfyyyo2r0ribvdz23ku13odyhk4b3w6zbpke2eecq',
                errorCode: 'g9dtspqagd7z356mvk1ecsc31u6eqhsbgbkfy7rkgzebqz9p4j',
                errorLabel: 909643,
                node: 6250111277,
                protocol: 'mv3uckptgtwnjoquybwd',
                qualityOfService: 'aw7x22lbcjt2fzs0kfck',
                receiverParty: 'qff3ent2653be5bon4fgg0yy4w8i2vw1jgdbso89nnaewjqnz956zitv7wl1nglgcuih8y5ycc10wagvfxld536p7oe8v818ykq93bu33krojbjsitrbks1g23on0ro3oowwwvvnr2tgid0wnp6siup5b91bsgdd',
                receiverComponent: 'qjxkpw392t1o6gj80eocxls8q5yqrhmy8nazpi519tl863samn5vhgfj8lxwfwad8q9q7qhy9ok5zi8zrvdr0gxcei5hlctisbf1380o5jae3qbxsmgalwr0f8isv8knqkv1tie7oyrvpl6swzqhpaa94ungu473',
                receiverInterface: 'falfwe3h9epnrbhggv50t12tdv03vuxa4zif9fx537ut6jgatci9bp825ycrp0y0d8qciboyysur09brw3t0ach5r2yr25s7enjzi38z1ilk90q9imsqfgpqf92raqr2xsovhjumrsg1fhxiucpfdyuwygu1mf3r',
                receiverInterfaceNamespace: 'kpqtdfsaysmounuqh3elu5j1d858scr4nzdwi4m9uqtftsm8ev0zj5jgznf75m55aftjpa584epo45sh6y32c6878rzl3rc1dxrxjne9yhlyrcgiajo5yimfo726rrkuexc1wimacct6nlex43f0a3tj5t6gaewr',
                retries: 5355715431,
                size: 6035817793,
                timesFailed: 1921111273,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailScenario is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: '83z9uxh5keo5as0vpk0ygss3c7hgqqrhdtcil26ewjux2olqck',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: '600yg61geooucql0xinl',
                scenario: '9fjrl5l8h6lqhbn2ptu3o68pher2uxx3orvm7dp70cfqhzob0eznhehn60lc',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 19:09:36',
                executionMonitoringStartAt: '2020-07-27 17:46:17',
                executionMonitoringEndAt: '2020-07-28 10:22:32',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: 'o9u6fb7juolb8c1a2me504pc1psd9w8ij14ki1ux92yelinfk2fs76dkpooycmwi9nwxzm2283b7s2pjiwmozndpehwunvdbrtou6zd4dt4gfr0q7ut7ldjeyc58q0qz4iqdbrlc1jccfvlhdmatjt3mnyyv042ym',
                flowComponent: 'nmdtp0a4pd72a8wycefab48wecnvjqpief0z6vo4qk19dpsw7awhy8knyj9148m8vmzh9ygareuxkxihu0gewx777xirl1ll0da19pqmifq3iwxq49mujk40egmy96l25yjvzpaq6dzkrpjue9mjtr6qeolagnbw',
                flowInterfaceName: 'niap9d7qkx0ankeyaysy4mhp45ojylzhq0rqon5i2a830okajepyy0ghvnqpki4bxaox1a5p9llm939barfsm95phzkknyexcvtdy8ks9mrcpbssvtktnteg8zd35c7yugf3k4rsbvnuj3dr67s16potdkthem2s',
                flowInterfaceNamespace: 'h25tmx3jsrwmdhps2qj7br0ss8b5l6131lo3pq6inoagwj6u7ik2pssociw40wdyhgtwnuj5iwj5453k0o7mvmnu45zzz1j6sfjew11i2slhkoq0sj9tjv5wu9nt7gfgekmf2vpfdadzzmoij43a3427yhr7vd48',
                status: 'TO_BE_DELIVERED',
                detail: 'Dignissimos totam a. Repudiandae voluptatem doloremque. Delectus rerum neque nisi ab. Neque laudantium enim eaque ipsam. Molestiae id nemo in.',
                example: 'hhwdxho6en8cgvzjy544xpo525qbpv9z17rzro9fph33s6yddx9dls01e3v2c6331ytueiefw4hw32h20e303op24gb25omidd7halzgqr447g1yx7sg2br3duepgyxd0y4b2ub732a5xlt27idk4lj4j8nmt48z',
                startTimeAt: '2020-07-28 04:12:43',
                direction: 'OUTBOUND',
                errorCategory: 'z6p1euwr0p6dws69r48cqpv5rgoohldwn5cqwlbukdxix51j6nsb6iq3wd4n65467brw02s6z0ovixk1clam1nq4r2sbkutm9oijmctewn3s4m9ahfphju8kzh1m2samulghgsbls4ankx99fd29oznz5jmkxvir',
                errorCode: 'vmb0h2peaci85z0ccta2tk63fh5r06awopmqr5ap33cwmid02i',
                errorLabel: 882251,
                node: 1474183491,
                protocol: '4jhlu7s19pvv0vf1rgow',
                qualityOfService: 'dneharvr3pr7naphtab2',
                receiverParty: 'ow8e5md077km4z86ot9yxghfyucxhdu4i8j5z5th2f2ybk8lnnht12xv02l36eknq0810pr05zkdjlgl75p7g0ybu6gwckvwstiodujxyfknmvk5zit962ysewpb67zmcxnpamywd579oszgzpc7jfewuvky2rfb',
                receiverComponent: 'hipcbb3mcdv04yyk92j9nf4r6l6b0l5sylswv5okep80w45802mafbmrs4pqtz8if0hsnigy5zdvh590x9dp4h9ywzsfkk4ur70rxld2mt268p6g0h9dq1zt6x3xdwnrpod8ombr1bisyutyjo4qpjr4q626q3f6',
                receiverInterface: 'bib2m503sk4q1h2ffi3jvv2kcfofhlrgc4uh57qpz352zjon5rgkpxzx5qml78vsv4bcpv59u3tp58vp8eftsdtluj2mlxmi3d8n04ewh2jgisqdpyzvxvd36ozqiuo9vqyrxh6tsmn6gtc91hupzb2bcpwk7q7z',
                receiverInterfaceNamespace: 'z77rsrpat7dgi4ksym5ks0si5jty1sypwglrkxw0tibdy23xdbkillxey7shgtxu630sz49jbw2qkzff8dnouaamyklhwbes9qpqfzcxv1t6a3o8wf1jbjs3ozeznl52qwjhxc4qhkuyubiw90s9xeihn8v43vy4',
                retries: 5116955502,
                size: 1253529366,
                timesFailed: 8806959516,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: 'qyebbanm2w6c4e4l68el9vk4t721u6gussdtku285e29i0apie',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: 'pr2mnhd7okebxdyji6um',
                scenario: 'fhcxd4x8twe0q2tlx2ancetqjiod9rozw5dt3cv5l1z3lmphalpsxhujngub',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 21:45:51',
                executionMonitoringStartAt: '2020-07-28 10:55:13',
                executionMonitoringEndAt: '2020-07-27 16:47:04',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: 'sjy7apmvx4o7ml6pyl49adhk7vypk1ey2g8hg16d1do836m1gofbfpac8u9e995kyabavcpi843p2i22yey6e923rwbkjpvmoq5snpq1py84baaicyql5lcr36xwr7z0allh5mf4pd5uir7em5u8h9kp3zbg9fov',
                flowComponent: 'z860c61j45ucm3c5bm27thkk6zb0ilu4ezqex1jrrdgicenfktnhiif5dvvp1v3k98fk2y3z3n58kj46cs4btm80u8veb3j8r79x41x1bclspdk5snx5e3qwb6t2yca0tr5jx6nmbrys78byknydier1klwqt1de4',
                flowInterfaceName: 'wbon4ay3c6a9poe2gvulenchia8j802aqbww597zlhs5pc76xqixd0bkclw9ywc9rnoepug05gg47bwr46js5tzb3kwywnhmdrh98ypm2hlegxam9v2klvgvhjkzwiccgaqrc69npu9ayctmvs2i8jqn7ki8uw49',
                flowInterfaceNamespace: 'aj6vidvdsb33st9klfsmimejnaawuzcl0ow0woa1qdg1c4hoj2v506099382nipb9y44slwg2c13wfhpqd9tf8rcttjrfqk9lxq4run71ouc4pvfa7bqqcnjuk6diz6odqp2mvw3ig1yi77ifgyzegltrdjo4uol',
                status: 'SUCCESS',
                detail: 'Veniam unde non consequuntur et et rerum blanditiis quos quidem. Facere est fugiat alias ut eligendi. Ea quae nemo neque sed doloremque possimus et deleniti cupiditate. Ullam ex molestias ut rerum non. Expedita reiciendis voluptatem ullam.',
                example: 'l2bpdrfwk0if56q8gi3bw3wcypmzb6jjpeujkn04gex5tmkvcgqdiyjlnhzppmjquxj8leyppetpy16nwa98ao5iz5kyh3kautpsjvxlxh5cvyfhszdbbbzzkef9jmee26cjadl02p1wqr2qogppl9wmf46bxrow',
                startTimeAt: '2020-07-28 06:26:15',
                direction: 'OUTBOUND',
                errorCategory: 'm4t2ey84g93grgs8ndcdjjbylxknez7ysz8z16dywjk40zgzxa78ldh4t2gbl5bmnfcjdlmuofqxv2hjmn1bhtlvmuoocgupvpi4rh94fyjez72kzz1trcopdsugq828n4o6yixxzhqu3b4s1vba34a9snp75shf',
                errorCode: '1ogilw8mxgjfu7u6wnd6ceao77gdap7a2udfig8sfkuscvax2v',
                errorLabel: 914621,
                node: 4370036293,
                protocol: '62jnh47a3tgwce1t12a7',
                qualityOfService: 'tof7h7ha8i8dk0qr9won',
                receiverParty: 'np8oqce9zp4dbjaiow5dg5rleja21snamcvebeure9tu8uxnydh1ckw6w39jdajjb6izes5tq2exvgszr7fe92n8eef3c6b788j5jh9bqo7g46nip8m7n8k8eafk4h5q5qprt1y6hw0mkht37telip2iyl24rt4i',
                receiverComponent: 'zqabhpf3f7txce0pbgxmn50asnluxmzebap2blrnst3cjck8ujj3gz4q4u3cc6beedpeeg4f60436wxpzlybligsw01rxvb73qdavikli23md3fl05p3cyomnoxjj4320rqqampno9zkgl54gmwy91qa4wl9d3ng',
                receiverInterface: 'y8pf8gxzfx8psigzukv79dm0qq3kmsness58bu9hdnq8uowgm1acobut6n7ue4xqoz7pshdzirawe0fsfg3x5qi3e11pwn98jw1h4kowpcstpuwx9nt8i273b4v62qjbglb2t7693flvol5lx1m7oc0dwtr987m8',
                receiverInterfaceNamespace: 'src8z7znx8wygn04v1ph5uwnspo6m3zp0mj3rs3fxwxvkasupjzw85ky3gg20dl8yxwayiz7vij3kfgodoafviqhypaovani129a6f8mcv5csugo16563hooo296c3u642ezo33lelyrwtsgb1d48np7zdrhxbo7',
                retries: 4363066214,
                size: 2812335589,
                timesFailed: 7440364563,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: 'g0lzgdq09zau7t1n3fd0iugqx8q91xf6hot3e2vgjd7h2zszf0',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: 'nylyq3mnuk0p0qdp7knw',
                scenario: 'r7fiqw8tkyyj5wtyskpv96kzxnorgcm5giwphwqwcwz22gvcrpbqqfv3vtwi',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 04:59:12',
                executionMonitoringStartAt: '2020-07-27 13:33:11',
                executionMonitoringEndAt: '2020-07-27 14:00:37',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: 'kqeqh48wraq1zyixm8qxjiobtkwfk7hzcit4xgnhkvikmfy2oykcddts5cruo8mb75y96ty86vf2b2h6lvbdqpz6hzgmc1mdxmacex6uu607r57myib7nwvbdyelv062bdf0mbwzztpi3wlfyifoi16jfycv8jei',
                flowComponent: '03wbvjheklhacu5ahekbg7engf10s4kotg5bssp4gg9d2bk8yanywn83b0u06mtnlt9kyp5b7quxzb6b9o8x1ecwsjqdcllrwyu93titnmao3n8lykb3gcreci4kvrw87ub792mzfgjzb88spnkv4u3m41rexs6w',
                flowInterfaceName: '7hp611idh6kqqi6dkuiafto761hxjiqtxg66n3ncbxl549wz6wwrqxwxpuq35dafhoqn3w89aar8gxzhsft07z5tumufzto2dykds51zakq2gq8o6t8bh4f47tg92k6ays1umm0rn7ht79zbfpae1bl791gaq08j2',
                flowInterfaceNamespace: 'invo8vydbsxn8aenazmptmrfbaceh6ul1cp5kyr2zs2gy94licsbl3uyyn6ivy8bsrqhz8dyrc6sogkftn159yrm7w3wzcqq2s8i9kp2naf1lvqio18r1ak05g262ohyawip1rurhdh9jdelm61pflt9mkn4lqnk',
                status: 'HOLDING',
                detail: 'In dolorum possimus iste ducimus a sit adipisci necessitatibus sint. Sunt sapiente est culpa porro incidunt quae aut aliquid. Veniam ea ut ea non. Ut et aut quae iure sint sit aut ut. Dolor blanditiis a voluptatem corporis voluptatem.',
                example: 'z0bmckeazo7vijru4xpdv4v5qdj3nlynvcm94gx1v07hfx5ohl6gisf2741qbguvws084bdij6nxwhtjda82y8hesjqgnoh2h8dwci6lle71wdax2c5yfsrjpaoafld9pnnpru760d7blwbau8ilrnbm3bi0qf7h',
                startTimeAt: '2020-07-28 03:21:41',
                direction: 'INBOUND',
                errorCategory: 'dpispxo2hl3xpjmvvxmltz95ph08ch0bs3yd11abuf4ogtjhdxrxult01qtc3fbfy65jrkwc3lzr3a8ng7ab2gvw94pg8cb1ydbxx4q8qn7eulx8zjhynwb52fwrkvl9zuv4xpzx00hmb11bik3mfjlonfvi5jc3',
                errorCode: 'vaaaivxh5aqui2clavpf6jyl9ae7xjl0axwtvrdvl6on47jtnw',
                errorLabel: 128216,
                node: 2660477423,
                protocol: '3ipz2ue2jbmcz1jxyby0',
                qualityOfService: '9f069ywa8bge8c7t6otx',
                receiverParty: 'x1293z62soolfblqox096uo6x7em0nf8nu8bj2yjuqo3v8arw6c7bnss975ezovl420nq9j65ofg62j0mwd5npr6qdecese3bv9eb8f4yaye9q280jlivyr8t8ty9kw4x34jkqyizrddvhbe6bmnhk7mdhg4hbqy',
                receiverComponent: '4hljww7xs4rvk1szodo31mefgxzdp507bfvilvtaeqoqyzjs6kowlew7jyzd8dl09jublt2o8jlwg22e7sa68x4tub38pl24sqitnb8n2ayftuqib5ozymy75b1au5td1fuvc5lr6fpdzq45q26qr4ttx8s5edyu',
                receiverInterface: 'fx2cpaj1o3ruohcavtlii7waqf3fpve00vqetka04sueftumz0wuzx1cxytbdkncz74np8nhytiq0cxji200ogzf4b8d0ihvs8t64tf8blcx118phjbxcva9at75josxxjv33m70qqriv2u0n5u0x4dsd37qaj8w',
                receiverInterfaceNamespace: '1uqpf1tnv0wsak09x8prmwv8utxm67w81xlmoxkogk7gbdse655jlyty4f43jw9k0n38j5a0nqdnftf7e7wfhx6oyytru2hioeec2b9tq2vwragm55knoxznga0099n5epbnamz6a48s7izb22r749uczznj0u3h',
                retries: 7946250673,
                size: 2307892119,
                timesFailed: 3882754234,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: 'fzjsr6zlt6gytxb2wlju4vlxp3wjg5zbzffcvul9wzuduiu4ds',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: '6f1dkuq3s79woxuvf4gu',
                scenario: '1rg1e78z8r58lg28axbo8hdn8y3khlte5pgumocimzgj92j1ia8wlhl57kob',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 12:45:35',
                executionMonitoringStartAt: '2020-07-27 20:03:47',
                executionMonitoringEndAt: '2020-07-27 17:55:13',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: 'v0f2hdyflxdk0uijsa33otf6me2vu3zsytmoymmqqu6gis6yyuvimju5ucqwl9ky73nmao46lngm2gmrv8vkdz7ygnyk55eu2o41vg7refbg6uvhkro3g6guqg3yb6467jcbuj7ar541p896hkw178q4sa91uioy',
                flowComponent: '9cmukjcmsablahuw99mg7ydoo5qxavlofrwf0rvh5461f2snsl5ekrirmzn9xb0wlushxepgydhmya8vwtnmstyu6t9ljo45xg0zaw2x4m9v9l2tyl9946wns9g8lo18u818bhrbtguqd4xigcg9x0unwhxyl92v',
                flowInterfaceName: 'p4j1185tx8vqzavt3j00xfpmu7rmcenbt5yn192ell14gkyfhhcrihert2f88931xfg11fqdafsgq3tft4t4sxdw8wrsp6apjg2dqyf5uq94eth8dfbbmml3pk1frdnu9rtf7046nieelq2zwcwafzsjhoo6yj58',
                flowInterfaceNamespace: 'a57wm89582z69lvzrx2otu1e6f5pwfgfesebaxtny0rbez4p79g7et85wfgzqqg7izy9jg9lkb378s3ao5tf7bsrbwibl47k9tmni1itl4oe4wz80da3n4vhb666czn507qy8kj35022b3qhb5piaoka5qngs8m1n',
                status: 'TO_BE_DELIVERED',
                detail: 'Est voluptatum labore reiciendis consectetur quibusdam voluptatibus sed dolorem. Nisi deserunt fugiat officiis iusto iusto est inventore saepe. Non quas quas quisquam quos aliquid.',
                example: 'sbfm2yprrs2hsprk0uluygcgcbk3k2jr2ynygz2ocwtka5wn0urj8uglbp1et9ulxz9d7eaa9e1l4aky08jze4un4kzqme3qtt3c79d5sqy42fxfnmhrmqntp8z1v5oypbvmnpav4i6ex0bhupt78iiquim1tjsw',
                startTimeAt: '2020-07-28 04:16:01',
                direction: 'INBOUND',
                errorCategory: 'o363a51depftld1hmt287v19bot3ewxdu9c2ybavc8dlzup6mtnuwq1l11ap1xqeisc7a41alyb5pgtqqkssqgoaryetmrjoznhl0gk3ty5sxiilwzmw1rdv7sadkrv03awvkg008hizoyj8tkzszosol98vyvcu',
                errorCode: '8eb9tdlxox54wtpg6hlu82cq2gdgchwxpms5rvfrvpnez6btet',
                errorLabel: 598484,
                node: 3423840428,
                protocol: 'dnopewkwlzr91h5dhn7x',
                qualityOfService: '7jhj6i8vjyoo05ng1ltz',
                receiverParty: 'zouqqq896q3o7bi4yiypwwbk79gntl4nri15a3z04bu47zwzi2le9lp3g7i9oelnvvpk0nlyh6ioz74r5q9nf00ictqok6bgb7ri0sug3qnc050l32q4n8rf61xip80756fadsw5qou3xezwognjj4tv0wbg7hgk',
                receiverComponent: '54nvi490tvebvaqxkjmnagj58masa7fjb8e4y7dx3ir77mf5ydd7ur6unespvbpuo749tzvsmvj7zlislo4urdl3so77avb6x1n9uoaed4a259ncwfyr3yzetzdpcptqwst1hiwynw5lebggwzla9nxuf09g63yo',
                receiverInterface: 'ba8pr0rqqkypmwymr7sknbrjxngrevnb5pgwtutw7evyqz15vs6hn56rek5xdbsdeahu2ddfgjtuzy4gst8ixgy6hv7qmxpdancnbzy2kgw1cbcxhvc9fcrboev1lg05l1qyxu9nrc1mc7oxtp17q9p737n8xy7a',
                receiverInterfaceNamespace: 'wer42c3ud77ap7mfsrrfgczb8453ute47k653e6gmy0qbkv6l1q4l3y8xx2bhe9yiuu9rskbbaay5cb1c1hl32z8svwae5dm8fkgyv35cykf8t2yxf8zlkh7mcmnkyizkhvnhgepivdk1ksjf7awuggpv99mzha3',
                retries: 4520918260,
                size: 9344654587,
                timesFailed: 1498349637,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExample is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: 'zfb8su4xom9zwc4a3wxux5htykoqhe8mcadibk6dq1a4bkk0bt',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: 'vg6st7s7vg9rb20immch',
                scenario: '5gq8d81nj4yd63m0sppda88oh2lc0g5j6so5zqvlns3i9fhd76hbuof06or3',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 08:32:35',
                executionMonitoringStartAt: '2020-07-28 10:04:20',
                executionMonitoringEndAt: '2020-07-27 17:16:09',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: 'kruskslz6e59kzp8ghusl29ydewwyh6cx7r03obe7hkk9nxsxavx5axnp3g6j2i4nhtqu7i6iti9d4nwqeavqlqvwcu5j2d6z0ozytyvdyth4son01hbgu4aemu77lnx321pznoodaqx2jaoukcvj9std7eso1dk',
                flowComponent: 'tspdh70j17tdoyx187dfpvxkn9xcuj3ytvbjeuzrx1zdgejfkt6usye8bbqniz6nfrp5qkkg5dj8gpbtwys0xw9g0vxsaos86ohxad48qh2rjbyhdl69yj9oe13cf7lx6z90msj4ffps83c826fr3ssnnl9szaj7',
                flowInterfaceName: 'vmpnahpr2gh5aq7ouh7ijby44g6koq1sy8wng0fa7rpn77gsvlkuirmb9oa84bla9mw9d8y3k7nb2smgybfbq63sg019q41wb4x42mxlfb42kh0d4cvgnsaizdkanq71ogywlvw8puww5537ccogd8oqrztlfazd',
                flowInterfaceNamespace: 'ql5zosnbv0l4h658420k1k2nj8hrt5679obiku3ssevcjii4r6aner8w7ds6scc30qrm3zui03i5iome7u7m9bjjq5xrps5bobtgvi33soszg3p8cgkofdmjbltxk53h20tc9p9josja4m64vygmtxo9kia7gtqj',
                status: 'DELIVERING',
                detail: 'Hic qui ut vel aut. Officia voluptatem quam dolore non eum maiores consequuntur. Aliquid omnis quos dolor. Inventore corrupti autem consequatur neque non. Mollitia placeat sit deleniti ut necessitatibus qui voluptatibus eum recusandae.',
                example: 'rc6sfmvxwewk53ts6t6523g9b8j4znrm06v8jqty7c9bl518oa98vkwwwxzj2qanrb7mladbc1mhnaqu655uq5ldh18l6ifhrsbfv4k43wxxyutgspje6zmmbr4oh95ixdz8nbz9ol98p6wj9alijki3stfhk7hmt',
                startTimeAt: '2020-07-28 01:51:15',
                direction: 'OUTBOUND',
                errorCategory: 'etm2b7xrv8dve719p9rx8lx0r4c8x3tlkrtrt16n565h8hiqrh6l6advg8eyyj3b7unf24lf99qf8mq1f89sv7677k5o59arynh1rjtfmbc4kyqc9rd2symgu60vun6o34itoi10o593ybuygv7dc9dmgecntf3f',
                errorCode: 'rzzk5r5yhs1afuzzdc1dlkaxeov6vb0s76kmajuv90lyprish1',
                errorLabel: 861400,
                node: 8985565518,
                protocol: '1dqcrcalveompgjo5vu3',
                qualityOfService: '26zkz033lauw9hobxdnp',
                receiverParty: '6ar22r1usdy1c1bgm4cbymsu8vda8x4nthtnsrz58jv1ayhrbhlyadzup6pm3xztihwn5pw2xl7bj3hmldnl2h03w4lzffeadw3inxts8nr8bly0d5t3nhn9nj6f6y3devuw6uq281emoc1xydznz4gr5v6ro118',
                receiverComponent: 'kqqx59zx7spzvk0vhr9lju758n6kje71n2ekhow63azrbgb69frv0b7vb1bxaphtdagymjincdok0wc7drwsn64j0gh5sqfxy6zckbb9pl2ktd1nh4f466rpwb3ne2irnvyp16a7angheo9m6zpz44keya8m8g4v',
                receiverInterface: 'a3kalzj0ygtybi1z3ujzkqn0hvkiy78vyjm6dgyxeeireu3vrmaefgqkkto998n78d3fk73dv3l04hgaafgledof57fmli6mefjiyqkwlv9t1e9k9v10o5okotg7b6ei0s5v13uwx8htkdlxcqdaw0bkm98h1qb7',
                receiverInterfaceNamespace: 'y3rnfhrahl4rs72iyl5mwy1vmrizlwgh0rn7o0lcc7x7bcnjjyym4n6afve39xj3an13ul9su5grwta1kyuz9acy0985nq9jbgudgst1yvu9hx9zywtprpkz1h8dhd6dwiiyzpzvjijsqrs5d4o99355oxuz37db',
                retries: 9340319102,
                size: 7874594834,
                timesFailed: 4142455126,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExample is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailErrorCategory is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: 'zbjrrg0wk9nm8h6s3jkjfoodwge7p2e6f4adp9izrq6xrh6xq6',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: 'mgfnsbokevu4u9qaon95',
                scenario: 'q8pv8jal6mgjq2x8qw4c02u6s4ruu8la146fl1w11n362zuetkm6m0umm5ea',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 17:15:33',
                executionMonitoringStartAt: '2020-07-28 05:22:18',
                executionMonitoringEndAt: '2020-07-28 06:33:21',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: 'eoy338klnlhi92rpcpwiya4p6rlv9umbg2qbmgp0ln67ph3zdqev6r8tthdgp23fzpbszq5z0y04wrask36ungmyuzjd822cq788su5gchozr3gh2wv8ganekv5x0jdcej4lkfavqw5lq2xfovdho30a9o81vg1d',
                flowComponent: 'm6nqmq82njok1lso5kl8p6kud5i5cxs45k22or7zfs3zzt09fs486gj9m7nrgkyhkjolatzk25nt2djm74cglmi7z1tcxbz3imfln9h35wcjl8fpxfaastfr6uw7vbednj5l3u3jh67re9u4p0fcdkoikcqpcyth',
                flowInterfaceName: 'pont2onf4wamyckv5fn2cdpv2uuvcvxvlng97x77i19qwftgqnog8bngaf40xrkbma6h5ereupkmpv0gk60ii7nnqkg7320oja39olj4rjmf9wuyex2c657zaknigcp2tpjaufgk6j41c56fr4b9sc1vioohkxr5',
                flowInterfaceNamespace: '0wy9qj2kozonof2fsy1lky34badgssjbmr2t0rwv9e6l49lduntswunczvn3g2bjsrjzitdml2291filezhrbx7tqdgj68htzfhfuyx1qhleyaiwer7fsim13madb0z4cgrla2kslxyffi8foovt3hil34bjvds2',
                status: 'WAITING',
                detail: 'Qui enim et et non. Fugit maiores rerum ut atque nihil corrupti. Debitis totam quia sit eius iusto enim reprehenderit atque cumque. Porro voluptatem quidem iure fugiat aspernatur ad inventore quisquam sed. Dolores quo quae laborum adipisci.',
                example: 'vol9njvyfhn1akltgzhulbrla7mt6zbs5hdqbnkurc4obq95sk6asp033l7ex2rrwbqsg5hws2v8t4qsl17a54335zsqul02tidauic5gmag3nkfe3a07y7e8tqu85szh1ig9wlufmepk873x5ou2nsisxewsvmi',
                startTimeAt: '2020-07-27 19:34:34',
                direction: 'OUTBOUND',
                errorCategory: 'd8g2qd2yk4uikdeqfpm0k9vrovftud0d9sd4m0ni89ruwqr4bfzfjr6eqnssqoaxy0f722qvh2qa3at8m7yklwbw75x50lmz1cldmz4mbilbtht0jx8znjzf0zroa9o1311xkznya4ifnv22lc0fpw2skx8m2r6my',
                errorCode: 'geb8cfx6ksdoa4zqvdlipmwm9awsdafb6h2o3byb546za0upfh',
                errorLabel: 124069,
                node: 6486834861,
                protocol: 'kv410fxt6jklhhuacfwt',
                qualityOfService: '1ssggpo24o1d6yvxj0za',
                receiverParty: 'a85lfy21jhsutcpidq5j3zn7gyr2hb1ajiegmoew65irad1v1ql64jl7f711g9129vv9tzavpasvzuqb8m606hxibm6zgjavq25hr3d0e65833e4oisg7tx8tnjay2rb6nnwb3uuzca9f2impc8avvq6mxiqvo3t',
                receiverComponent: 'o4s2jr80wy8r05ggmm8clycyvuh7suzumbbicgfdomhqpytab4e3mymhjhs6fn460cfj864rvgt5yucmz86qcdtycd7ofzm5rf7osvy2ysdosanwxfonv4m4wvwuxagfp8d2njd9asyo8voeoadrg5mgshh5y0lo',
                receiverInterface: 'jzapbeg3ciu30ow2thlz1kza5xlqdqtdfif8fatzfqn8fjlkjfxnloyonw4ok6xdjp04zykoceps1esd8hudqd1snwy8pbwc3y2fd7ja5lw1vqxxoh3141tay97yb4b3w7gnfx4oqx7zwceuxu7vi71zc6lgw9ej',
                receiverInterfaceNamespace: 'ja40jmakt4rxir2r7ryexh5bngg6z2m3knkhg3zyeja7fc4o7vazczsr6ajbqwydc5kk4kh1h7kc33r1rnzp254s162l3hq3nd68bjgvkl7t5l4tle433j1b435rf0zs76fznvemhzha6up8ns0802o02g8gkr0i',
                retries: 6765710020,
                size: 6184584143,
                timesFailed: 4628384330,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorCategory is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailErrorCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: 'fg8b6deitfm5cymty92ghrqxyhp4v2pmasvt2o9l7gohdkhouj',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: 'mcrpeavvhldwktv381rn',
                scenario: 'usoy6xwy1b5bvl66y07qae2h4soo2btmanv7szbnf1t5v4d7v31y05beu751',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 19:14:45',
                executionMonitoringStartAt: '2020-07-27 15:19:23',
                executionMonitoringEndAt: '2020-07-28 04:59:35',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: 'qcdk97go5ohmscxsxgqf6yvi51ya7xdlkrhjr7cvu0q8nzafsqw0b0atyxr52qq9hzsxbxkyy0nc4z4386b5ckj7uml4pue46kjx52vcwf4aklbh40fp1te485uo4d8idk3vxz4zojs9dxz8mqdfnb7knsv5cvjv',
                flowComponent: 'd5brxkwcnd5thnond0pzbntbt2efr0ozn0t9g6sqo1ylx1ize4pxvxxb722022423fyxz4qp2o3raamcgvgtkq1t5ogxkcmm2z0sq6dmvywpst2yc9skwmvpdv5bw0v18zlbilrbsfaet50vt77ivllb1umzzfnq',
                flowInterfaceName: '9fazuackjcsf6wd799m4sb5bedi8u9da9qswjzhi2spzvj8xo2vw2whrk8riapgugsz5d6cldvvldx66uruwdzrpul9abagze355k6wq5obdougr2ba0ho8rjrqvitkhr7pw4m80y45z73egzuf13lbsdgmrd4fl',
                flowInterfaceNamespace: 'vmc0byaup2ry8p10hp1ukallpi4sh9509ahpcpb8p3l19eysnkzlrafpsg5d01tk9egjrus00yvcboh2drc9jusy6nag9n26nlaejaz9v7bvadchibvmvs9y26ipaer4or1u4zfnq3quqc2ic2aj4sauqn7z23xn',
                status: 'HOLDING',
                detail: 'Et labore temporibus debitis omnis nulla. Omnis voluptatem eos aliquid et. Quia id quasi magnam neque libero possimus neque eum mollitia.',
                example: '7kfefuz7lia3agncer9gg866h59f9lsxu9g5xzjkjstw62vymgybtjr2yuez0rlfujbg670iw9kqn8x6lmfixpdii36xa48dseu00pvg1x18zqxfwavb48nz1ocyjyh0b53fedg1vwezb29lve1slivsxvwzsu10',
                startTimeAt: '2020-07-27 18:54:03',
                direction: 'OUTBOUND',
                errorCategory: 'ij41vz9kqpfot5nmpp7han37mz6jevy63cs8j0l29qwyw5e28q5qvquwnx5rdtaalz3wm3o0tjwb1sqp8b4r2xx8exytiq6ety4t1d9hilc8ak5kr26imae3vuhrz2ol176hrgo566yny68yk356jilxb8noo9am',
                errorCode: '6hh4wcmjfkzlapd3a4swn49rnwlxu8rkl90s4kbntj3p99i4tir',
                errorLabel: 166657,
                node: 5903815203,
                protocol: 'ei2t6gew94chk1mel8yz',
                qualityOfService: 'b4ag5du34069w4yx2zpm',
                receiverParty: 'wcojfszq3ri3pgzflsobbil1wommrcnv3jy1gluwuyfvpvpat808bop5shyra6l2iri7g3u65nlw5kjxo1k1s5s8l9i67akhmg8mnov9qjbrbuhmylxp832lb11ak96djoy9lfwrlauzkhz6bcp5axbf0pn1ixfn',
                receiverComponent: 'f982g280fipwgmucfoatx7y6uhcni8jo6v8ucxvzjm55ydnr7m3n7rgiwg2tx39c245n8ps3qgeoz90au26xhqwzujg70p7oqkpzg3k5e312sts1nyv4pz7v8acf3kg8ipfx075f3ijix9v15rv8jt9dr8vdqibu',
                receiverInterface: 'mh8j579rjcoyuv6gmgih7o5gr40ghukh4nvw79wyc2qyhiqpulhg82tnbm18pjiydjfaoq3yx3gng120i48dwg59nmo66ea6z11nkt4qxozmalzzo752mv0xxa2epxusxrm53gq3te0golhk1345oire6178yw9n',
                receiverInterfaceNamespace: 'hvik488rajqb1rcxskvb5fwl85zc3zjclkt6oq4jhcvpv9tm9ai1smb4ejpr83et493ux5qri7fl98gi4pdvuw5iljpstz67w0w411c404xfq1hq08tzo99olje9w4nxrilj8f0j3qx22tfd1kcb6nehij2p8d75',
                retries: 3325064149,
                size: 3848704022,
                timesFailed: 2153692344,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailErrorLabel is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: 'sz8vcfr7wk3u1zii4al46j4jzhx37p7bxo3qqk3sn6ljp40jwy',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: 'rvzx47qiwkrjhnahoy9f',
                scenario: 'mm6g313ivwndl19tj5eoeh0y0bxjjsdfwz9k3a3iqcsv6mj0wv0ee0sly5w5',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 01:39:16',
                executionMonitoringStartAt: '2020-07-27 17:33:32',
                executionMonitoringEndAt: '2020-07-28 08:30:52',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: '2v9fn8n07za8uupprlcj4eoi9yer3cr7zkblj0oioux06fypbhdtzuesqlbryd0pd58kj55hdylwpun6gienihkkjo3ktc3ash4hliop1fuhddy3m3pzcljs1pcxbx50ntk6doq747r5753biwujgvrc0fwa5je3',
                flowComponent: '3673jh8bd781271iaxnw28etzgqz7k9fv8n1clwhhna38styke1d7fw26h1z6c0pwbfbxz1wg7ywdawlyzhhocazspo8gpe4sp0m94j9n9xm0bjohvuu35bf2z9w07l4cpzu3ehagjnx25iaiqa0rn12j7nenlby',
                flowInterfaceName: '996w47b6cai3zzxt1kf8a78wh2mqwpuden6cr8poft3f5mm7ucgh355u5e86dmznkhuw6je0rc557ms8pmrdf9vvnmnxwidajezppty9t2lkegxjqr2f1vjl7rdv50jv8mm69d8bj26kqh5f3meh5456fn900ldt',
                flowInterfaceNamespace: 'bydmrr8rn9nd7o6w05a582y7ahw8fjk52kazplg4g9kpgeehin0wo1daftyjxjzdmehj6omghjts1rhv8xujy7v4yojt9is27f84msxftcjzr89sz767m1ovpiltaofe39k3qdlj2goru6zpxyl8lo2zrynw8yh4',
                status: 'HOLDING',
                detail: 'Soluta iste qui. Illo est optio quas. Maxime sequi laudantium doloribus. Voluptas tenetur qui ea numquam provident.',
                example: 'rciumvfxfhv74xo5t3hxzvlcdhd0i1knv06q4o1ysij4m71365w2y8jii98punqym44xr5stxt8zyqow3dmzlqen0cxkg3un0bjdjma8f940t9nm6csc3olw2wu3tjwg76oet2588t8th1a6lvvxpg92moly74xj',
                startTimeAt: '2020-07-27 11:51:40',
                direction: 'INBOUND',
                errorCategory: 'mchp0qf3ptwjt7ztxwp7j2gh935c3auh9nihi65rjqh8nnungcxo6sulbqiw3471sd88g8iypip2qugjc9ium5ukfju90fa0lvxvaqqdwk6d9s7qc53vwty63w5j2jqv6mc0f4ljvw5osbbx9ve1ilap6ve0lr26',
                errorCode: 'xzuw1188i4y4jim8ddo0uq97p07r3czahmdhp851erz3ok99y1',
                errorLabel: 8601429,
                node: 4700847486,
                protocol: 'qpw0bkxp6jg80q28dx43',
                qualityOfService: 't4z3q6gf3q6k2sw11xg6',
                receiverParty: 'i82deomtly4nvri2rurw4untnko2qj6rb2aov3eqqujs34p8iu6r9zq6odgpuffaza0rjmul1yh1nitocsndnlwqarv2uqzb04j7fc7f2vvihr2s04r570ugauclf32q65t6rrdd59u15w708amixgli8nhlii6w',
                receiverComponent: 'e0amhr5w25hfn6pxh8igv4kpj1q85h9azkgxewlle23quwynv01whwifaifw2f6ygqwwhljraqth7tisqpitvz8uu7xybnhn2c3wh63qe0pabhoqo8pxhuynjxroizxcbgopmj95ykkfomgsozkibu5q2v45tsr6',
                receiverInterface: '28ggs01gxq76n5hndpyiml1n1q6pfjqoxoon1zlua0k0na1emvfdksgm8mjbf2qmbikxhkzkhpru0y9u8o55kdown4trje0a4r5mpmr3dkoapmdpzcaerlujdwasrb6mspnaei5jmr9n9ee2qgcurtkm79twice1',
                receiverInterfaceNamespace: '082kehtr3ekmyxavl3do9ops13qlv5rbcojvxbs2fbwjjdwfswt747bk6sk0rcoyw9psidnpkmzwvzqbk271l9zsg2j1mip40f0b1ghcitpg7dh5vkwrjj5iayn37zmd4cigehzknk6mi9i030ipx8ab1wc7irew',
                retries: 2566392487,
                size: 3315884726,
                timesFailed: 1385089474,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorLabel is too large, has a maximum length of 6');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailNode is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: 'vaull7n0u489ol2b7f9xufm0i37cawoqu6rw751zvem99fb22q',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: '5rm5qic82mlxj4o6rqts',
                scenario: 'iepllv2q419rbhdvn0jj6y641g77phg4oq1ftsec8s53v8uth2us4fp4bsjo',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 10:24:58',
                executionMonitoringStartAt: '2020-07-28 05:51:06',
                executionMonitoringEndAt: '2020-07-27 20:25:13',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: '05vir7qhma8bdyuv0kd88vamjq3fxk66hykjrn7pipsn2a5u1dnlwread2o91593vj1cewkqs8hvjh3j6h6gwi7v7sv7ap2usw7sahrp0pj1c1mlgmfebppj6ujfg3obtshrmlyfv4xqrk3hrlt6lrs26nqk17b0',
                flowComponent: 'v301t0dstnv5s7ycj0nui3bcyrjkl7e2vp6w5bbyqxi3cpgh0lc6tlhvzqoqgcjaf08zxpuysypk67xclz9sjrf5hwrirbymqcfzvtuh3u77mtybfww4x3p1wv15aso43wsql2pea94btm92pc6xff1rq5hz52hm',
                flowInterfaceName: 'gcb95aly77kdv0vr4gc90hmpq30gtj79jpa77rju6klw0bti4ppunuhk27dwy6qcvoxm2x2xbhe71kkfrtakm28trxaowhdjqw8qgz3d4gbldlgwce6hcsj211uvtatngx28v9xfc8vfsyk2fv6vwjd7ypl1uehr',
                flowInterfaceNamespace: 'b0iliykz87cw2qbfpsboskrqawtrpsewrv9kflryexcxmojhnmqix18gm61gzkbxiny4ihdy1fzyo6qrya1ey253xjkidxaxsplljczykdqu35v6ztkgn9ceopefoid3fdbz8qhy8okt7wkk4wu9x7il39qhd201',
                status: 'HOLDING',
                detail: 'Ea voluptate tenetur optio saepe veniam debitis vitae et minus. Nostrum vero consequatur nobis ratione. Error aliquam odio quo suscipit. Asperiores itaque molestiae rerum cumque.',
                example: 'ajep2mvm2xchyorv9cwo7zjuczgwylearqktfj6uju5va3ng3puwd26qe73uhoxtkqaygkadkqwgjql6z049ipi8c0j3httuev8ozi40phxtggsoqdu6ssf7zesg71j8i3n9jnwiff8duhqckdm609zu44wgly29',
                startTimeAt: '2020-07-28 10:15:00',
                direction: 'INBOUND',
                errorCategory: '0n04bdlxw6rv6h4h4oxlcbmlglx7ywrukvq8a6xawf1cgenfneflrlu5bo4y1r7xpucu0auajd5lu5xgj2geqqzwzqn12driye2cm8xk7qu8spnjoqxgj7p99xaw5z0xhazkbvetl0dmynvfnbmn7ovqw988z2j2',
                errorCode: 'wv3gqlxz2gebnx35ietsw3k358v0eh4tl1vff4oqs3r9mu6bt6',
                errorLabel: 286693,
                node: 49454289106,
                protocol: 'nzlrjntradq95w7t4rhy',
                qualityOfService: 'runyregqzcfecnjditgo',
                receiverParty: '3h5ojypqrktbt1ds1ivcm7h68zshskk9ggfqstuvxrriff9pvgojpq3h8hxrye9q4mffzam54m4aydeig8w1s00ig6ln26ygo831d37oavirovpc4p795fk2ltu862jxen0h4esam1rb762cynzu91t6a4ki4gwb',
                receiverComponent: '5xsnylmfkfuckp2bt38an0rz6xt47aon7n7h0mphit0u1bdsxqkilayapmp3wr04m07qbc60vs8iymatmlia8b4txm9njg4vsb9hkmljm5vefnqibvnap2cvfbrcoljib5e2p88v80igc60m1hbgotd204hrg9nm',
                receiverInterface: 'a56avebklpzctj6ugzaqzz0vrnpbi7djbn8pl06tlwbh9ot7gx0bwhk3ng50z29rtpd3cvwntk56h05y2ipp4imuwhpbg15de303bjtw0d1vn8fp4trwm68srxxkia8ofpxejf7iwliagqbllu6da2z1qt5ut584',
                receiverInterfaceNamespace: 'qkojo31w6w3upybj5c2jl6y9iqfrochy4hz8bb4rtvhw3tdeklmda3gj1rgufpbd6912wwzi4thklz8f36omwu97i3jlrsh0xz3d2tu4aqhxqckbxz8gwzdv5383g2bb3z9nvd8f0xi88r20gyzwm2exiu01gb7a',
                retries: 5547200191,
                size: 2763841851,
                timesFailed: 4800034505,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailNode is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailProtocol is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: '7zb5blwa2sv3lhl89uwb81t7k3c4l5dftg1p6v2ewqd827mp1t',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: '2mirioie924zxo482cp6',
                scenario: 'e70hqiys1xw8cxodeqy9qb5xxl8r7bm3x1kyyatxvhm7e6kmqc8kvfsz5t6b',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 07:08:25',
                executionMonitoringStartAt: '2020-07-27 18:35:27',
                executionMonitoringEndAt: '2020-07-27 16:46:32',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: 'co2et9ip0sqqi8yepnjwkfrg88sivdu2axv2c4ctrs9bns6sfmhkvg028cp5z9d6fz4zyoc761ns1kzq1xzs4nryqlu5nvdfaiptcaubiem0jlj354hx155jzcgijlkbn3ur8ddup6x38p57bm5r2iqxsshzes6c',
                flowComponent: '3d49gyxn07ff6rhn8pwm7mhi0aeynki11aqqc6bhf0eiuwpfltz896hglwqx7i3h7p3si77vzjw3kan47koq6v1qdfv81yq5ljna5y0ofgl960ds6ajcvxz22h2699kpdjsryqiinztlpmm2yj8lj00wfe7fhw4c',
                flowInterfaceName: 'phnmnck9hr1zanh852wktrq3jqtqmu9kk8zeyi9rb28m3ru1359yphe0j36bxov2c8o6lc1eqdoeg5jggedtyhukhooivzxhr3dez45q0ogsef28yvwk571fzhg7y7jmh16ivqxijf7y9n0eo0vvn6teu4y9uhwq',
                flowInterfaceNamespace: '73bo1vwnan9l210bt9gj05ewa4ytiqgrlyqurg4fd98qtfosa535qxofy3xvgeym87vtt5g29p8n4l0edmqwoe0oib6dvv936qtps9r0vembybpn8nf8bmg2036ob73c518wm8zk0oqf30pj3uvj8neod3i118gz',
                status: 'HOLDING',
                detail: 'Illum voluptas dolorum. In officia facilis tempora et animi adipisci deleniti reprehenderit. Cumque quia quidem et. Autem recusandae atque. Illum qui nobis et doloribus quia tempore itaque. Assumenda aliquam illo consequatur et ducimus qui deserunt est.',
                example: '04rhzd8ovhw5k33t8you6t7fct06s7aww8xjwhtw8id3qf77744g23xrtom58vsyfp53dujcy7ojf9w6xwku3c9xkwsh4ooqygpv5os11f1jloudzssja2uflofo5ew7fimwzt18erpmu61gsnaels137qgavnsn',
                startTimeAt: '2020-07-28 06:11:20',
                direction: 'INBOUND',
                errorCategory: '0akgwd6ff9klifxkxnld6yfob6tsf0q85pkm9ugak890ir62sucl6m9pvvkxknlp9itwjhpg2hzjrbhmkdndwun46ffmtr7wiiux39fjpygmfcyjlsf91omn12meos7tv6vtns3jh2u9d10x6ipb6wtbfd21lzeh',
                errorCode: '7fx6g37t1eb7u33zqkawyejnd81c2ib8pcljkbt8ipnnslzyzk',
                errorLabel: 252576,
                node: 8943129771,
                protocol: 'gyci6hpolsa5ptbrpokqv',
                qualityOfService: '6jusbg6036vcbbh2syax',
                receiverParty: 'gs7wgi1hxcfp0hsxqy0ebzyse2zpfyl2tos421cv8elcnaozm5ymd8bl4toqtixqymvtxrvqx5frg4mggfzelaysdj692l73mwrjbwgueypwa6vflqqvfjgwige7r5k9mdaimnr23od03ydup7wxw8piei263rou',
                receiverComponent: '7hod7a7e5ayxhra8cw6yzopcnzlxx6wzbo9tuaybx2mmfjt0olszowb7r6z8vpl146geutsmkjy8ua1j07t9ej55bdlhxoe98zco92sv9bvsc3w22afhxjuhjq3qk6h8b43ql48i9lj7r1zv1icbvfz6tur0e0qk',
                receiverInterface: '1h65a9j5gdl3d4lqb9unmg1kw2s31bl01cec8wizojjqybvphhyx5uy2teve7qr6l74utrkxwogcr4o3sah41e05zly5o51czfks1n4edyw29h4qua3cg9ltyk5rhde3acqmbgvwm90z9gzqwu6nyvxcjm6pmbc6',
                receiverInterfaceNamespace: 'exqmf2p8qgu3cxt883rz5x5ezgi8608ssbehwlsoxwsd0kcltazkdibofugs4j3u51w6dms7v4jp3o2picjcjswodeqw55y20ho5jkuj58isr8o2z4nnuww8h0g53jt30466aicykfm7hfpkpfvoit29fomapvnh',
                retries: 2122635186,
                size: 3296994176,
                timesFailed: 3413365950,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailProtocol is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailQualityOfService is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: 'y6q53eutkkta5s19anymi2sgcn9ut8muv3y4fdtul3tfuk0uhf',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: 'fbombaelbj8jx7nv3bbz',
                scenario: 'am5989jie2jesns1enub4dvemymjm0fc03aamqak7w5s45cl6tpk7mupecnt',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 09:46:18',
                executionMonitoringStartAt: '2020-07-28 06:25:55',
                executionMonitoringEndAt: '2020-07-28 04:55:09',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: 'jn4fi8cwl46dunbzvs517yif0plvhe2zjwmeqiwvkdh0x62l76y7ja27lxul5lir6zkodqav116y0se516rn1gbgvb1w6tqi2w1yvwbm47ip9stvgwkxw4wr20ewjufph5uijt9i2zy80faghdboasngnjbmx8w6',
                flowComponent: '8xoj6rd1xdtogtyfpve4cb7my7f1vtn8ehljpejsxvcb7mwj3auvh712ch2cts6n45acgz2k96ngadszhzfym923jogutegj7feyi72sifz4i6avicv42hez65285ufdu96irjioxxskugkjzix8qc7aezrth8gu',
                flowInterfaceName: 'but7efubpcf57ain9vwrety6d2hl5y0b4ssslptxbpeso41gny9nvhps6sv047v86jpdbwqyvgt9vr4c5jtvny90p1af993dzl73hopj33w7x1096olqvcfpt8vspre7tq2rv11qvxm44ei6kpjcm0bh83g4ginx',
                flowInterfaceNamespace: 'cbm2ltyjy2u3vch745nxzt6xwfyi50meu0997wnp9sha6uogex0wvjopie7d8vucre415jop4vmc9r9a0jdqnhf6vv73ptc1cvonl5dl67ic7i7yt12x72a5fvj2i2k5mdy9754dcpc20a09qvtbt04gspikaasb',
                status: 'TO_BE_DELIVERED',
                detail: 'Quo autem voluptatem. Distinctio animi voluptatem nostrum ut totam. Magnam quia voluptate eum deleniti molestiae consequatur. Beatae corrupti omnis. Ipsa dolores aut quisquam. Id id sunt nostrum laboriosam voluptatem qui officia enim vero.',
                example: 'u1g9h9nsx7k6senuob3q9r10yc9wk3vqfplq80jhv0yepn4cr3fvlpuv840jnwp2d7nyiv18kxs4uyea4cwxkpc1p5om0o7bmvlor7cttrm79cznwhla7vs8g6lj50qwo2p2zgmqudcgqc90t15qledil8g6sncz',
                startTimeAt: '2020-07-27 19:10:16',
                direction: 'INBOUND',
                errorCategory: 'xc4sfnq2sregx89vkn4jx0n4rwf50ogb7lbfriv0ut02c186o95bkjwtssynoyzrnd1ux08a9jrtc7ia2o775u1a91kgdfqboyoo8psgbpwl1y4yrarezx4kb62w3rf48kwodhltm6x4h6t9v8akhk2y7n249lwk',
                errorCode: '08mf23zfywqdtkzwg5aclc5rp36w8ayqgdoibx27ige11tw9c2',
                errorLabel: 750279,
                node: 9941246641,
                protocol: 'sgueqff45cyhmv26oen0',
                qualityOfService: 'x04wuljet5d7enxa8c8p1',
                receiverParty: 'm55cihbqe4bborcnki6i2vebhr8gifgyn4mkkc7denj8fm56io3yfe1r589ftoqb2v8e7bph85g0ou4jcjng8uvv15rne3aloityhp9f4zh3rg1c7yvupdp8sx631fsopven8on81ro5nrah2rz75ww732pklvis',
                receiverComponent: 'szy8p3264xozer2vpa75t3uamv67ntl6h5sbeqvnmgyk9vvanty7vxomqezvappuybqd6xx95y7p4sb8ga64pr9p44x1o2j5hsu5a8rl42e7dmwy7rc7vpnbi1rde8lw94gy7hmtt23dyufos66ue89ozbidsb83',
                receiverInterface: '9k526ykoodfdmr40dbsfo7zx91bz1xcwcj19x227b0jainbeycjzoep5c3z1zipnird93chgitri9fxdsko9ckwqxuju3jx5tuj6znj4l76zyj89e9b0c12prmqphp1aw5uwjvtyocizj6yczd94jy6q5onnpk8k',
                receiverInterfaceNamespace: 'afuj3gyvcju8if2hbmuvswyzoy7zu5vkoi87xpxrdv5441s8uo4e6hzlfzinp6n3tc6cj9y6yyagqm4qgrl1rmzs64cbcniv95jcem5rg90k6z6vl95hnhv7zj09lxzuqqvdy4asot6vpewbe8spxm3jr51uu4p6',
                retries: 5218780303,
                size: 8145620788,
                timesFailed: 9151977059,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailQualityOfService is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailReceiverParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: 'atvmt53yq7pkpgth9l7tn3zgfyxw1u3z77y1tcx6h052nx1utk',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: 'hk42nezfonuz8w54cchu',
                scenario: 'v8o1o2sr4ch4u8kaxrowlmfqqltxl0oc00u3mpfrpa1uqh27frh8arihf14q',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 09:12:10',
                executionMonitoringStartAt: '2020-07-27 15:14:30',
                executionMonitoringEndAt: '2020-07-27 13:44:44',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: '4zi6frg4j1pqzy5f1y67isviwqwh3augvkzani94c9uzbm5fmukremztf53dc6p0bgn83zh9aa4c7lmn62p0w90ivhabyfizyiflfgojlx8sfsp8mukaa9brmr9ocxh65faz8h3zc859mv1gmnhcvnaetd7uzci5',
                flowComponent: '899k9mmdrwjtser1nb21h4kccm4rmwj6wnekikqcqnggdicrg0xagm56ashulux8rkurp2k0jz69hztobi83gh0pzphyhoqbaeegyn16gqn3vjt3bl7c4hva1vcatwl89z86b55340cjdksi6y0nmprb7g5xegzj',
                flowInterfaceName: 'lswuuqdmbd474ywnpll2pbyebbgazm0q0cdw4z6d0tu02ckv236httss44pfl7nnb0knqkqq200fhqxhfxifk67kpbobil285puxnvwyhkb9gnfsr0hzwu3rrvhyxtvoov23k8d46c6v7kscfbq7glw4l37z7691',
                flowInterfaceNamespace: 'zuzw5febt7onx5wtk7q1n8gi6s3uhdlaacjqp31f2on4s4ip0u38r0ln8vps6iajhs86s1igeak2qb1x160jq20g236pwlxocwrmoz2hxvuj7ylve3j0sae4jouju1l6sw0flriyrcrzohrlop8gdq0hqlvrusku',
                status: 'CANCELLED',
                detail: 'Repellat beatae facere nihil repellendus quo ut quasi. Aut sunt cumque voluptas pariatur voluptatibus. Officia dolorem soluta labore. Et dicta ratione aliquid a est neque quis. Rem a earum voluptas. Suscipit nisi minus consequatur expedita quasi cumque.',
                example: 'k8kslxqw3dc2ursq5i749gp33v498cxgzzsvmaxfrvxk3phodkp64p2okowgffi8gqhdtn58fhoz0epswt071aaits894eqif12dn3mix5g5ixor359rqagnc8rirw1f8poqb5pq1ek4plkpsri6zk09cg33nmpk',
                startTimeAt: '2020-07-27 11:36:23',
                direction: 'INBOUND',
                errorCategory: 'ut6v44nk830uphl8t35agoep8tuw7kuv19jq2pdpjsz5bst9zo4bww4j791hck4nhni72uv5o77lk091krx7jjnsxpfg107d7krbrv31kb5vw0i1njxw8smtn0xt8dgh5oc5hd5xpfw6zvh12avhh8rtjt3tcq2m',
                errorCode: 'e7x3k5jp4nhmosrndjaen805jdbz5rvb9rktzljqyygpq0bffv',
                errorLabel: 200022,
                node: 2015954721,
                protocol: 'z7azw4sa21oxw0xr906m',
                qualityOfService: 'ijhnthsrvidxx2x9dfim',
                receiverParty: 'r4k906eiq7deuci9l5j37iw5lpg97zbcp5qkzjfwgk2t0sirlsls5x0vuw0yzgyj2qhtmriegggqmo4sp0mwqozz5yausdomv72bcg2i7sc5s5kf3djxa3ib6c156akmvjr256v2jxgmxq78mdhtbmoqe02l9qcns',
                receiverComponent: 'o9ndtikh4kg3trhdpipr885tp7j9ohpma80rpzgktz0zdfwf1thio54gtrsj6ntjiyckto20yv5zs7ygrwkdxj5zason161boh63m7uvm7v5ygzsotuncs3tg2dx8fvuve2qewarqbqg60dqs4kl8nr8urr4df41',
                receiverInterface: 'uiiqsbedzcqzem5jjmc9sx9igd56fszrljss56zbnau6kcbqtf02pfecpl09fhn5wq4cto0umxgdbq4o0erex5fhequafi1hd4hr0ew2fu4lfc7fgduhhh9sfluww9gg9qkqrz3o0xu818kb5qdlw6jvzloghw9p',
                receiverInterfaceNamespace: 'liy56shbasxhvbkdph61tb4fayqw0km3ivybx7cq4y8r2hmmeg97hnlvkb0gl7lifyk734wdaskyry0bcftmk2bwk0wuzoinfl148lcip50t0z6250kolyrl6v35x8a3il5povh1i0mnsekk3bp3xqk20sjun79g',
                retries: 6927345741,
                size: 4322745115,
                timesFailed: 8601420238,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailReceiverComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: 'zwwh72n4n00lh1icy8tslw609a9ld380oxedj86oujj7tfqtvt',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: 'dsd7pqnvui3396h7taf2',
                scenario: 'qszm4fiszrqnql739ghwpa1zdekuvitm18fuaw7x52xh9ctzjri8gxcimpg6',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 12:51:21',
                executionMonitoringStartAt: '2020-07-28 04:06:16',
                executionMonitoringEndAt: '2020-07-28 02:22:27',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: 'hlbdl6hncyclpww2dytw6glagx8kkaq6nr5i2k2apw0vjpzv9yej9gn1cvx03w7vzwaquus705g9c8qtd91m9xrfluh1carut1ykhzcuid7pf877h4kx1ea5k2t3wlm732lt9g53eufm9ok3ks1h115au03dheir',
                flowComponent: '53zprjfkds2nu2dvhfoev3ax1lzyoctop3ykhrdq8ja8k5djjwy6ae2yux5lh7iup60ricua3akpxhzl093g40yxh9a3j97tpsx15qcktxy7yhlgbfm2s4ehf6w1h448i5f3xo5uy93le51apvg4rij1vtx6esbj',
                flowInterfaceName: '1gxd0frlpkamhgq81qoe49nt9l2dgfzjqtqag22gyo65sq7gbni29iv21olzi1n9cqz9a2o5fns7txe1t5ml73o96r8iircrgtys6q8rg55y9syozypf2emi295a6ld7ao3jm2wy7qd27nyndxh43ps21vc31gwv',
                flowInterfaceNamespace: 'uj9rwydym4evkt9xzhu86vhk36ovuxqwzazegcehn06vwhoocv7kluv0qrk1ocyhczlos8yulir4g8pf8dnlg05mlz4tbylw6qoqurat4sz802evtrr47cyvomfp9zua6k6ykhw6joo1hvzhqynfh0mkp8ntol0r',
                status: 'DELIVERING',
                detail: 'Et repellendus non consequatur voluptatem aut corporis et consequatur enim. Voluptates est et. Consectetur pariatur at doloremque nesciunt harum.',
                example: 'q8hzdz3y2ezymcn4ctg2x8twwvbr9mkyskbskjfrbwipmbcz7lsf7rklav9m7f84fkfdn66bnwr5ajl0nx8vme9wkc3tonmo0dhwlbhwkr8a2m2ku193uiumds7ni1i1fwvmnxp6qm9213aifb0p4vg905clazrp',
                startTimeAt: '2020-07-28 01:26:34',
                direction: 'INBOUND',
                errorCategory: 'p565y1wgxh9817qqtx0zlmee0vy9bsog70so8gttgjcgzjmt8dwbpmnje0e1cyxfbgmhdzrmmu42dm7mdjck9fnoer8pj45wn6m3bke14el5r824p8bmree0ljliidrajob9t8kpoe7nc3uxuvtxhfxjr408nyzo',
                errorCode: 'q12y371x1s54t5m5gw9tp18d1vg2nn59effra3bth3t0mh07gl',
                errorLabel: 885885,
                node: 6370507846,
                protocol: '29tvpwg3hyu9dh85nicj',
                qualityOfService: 'nuwbb8ot5fcp9of2qkpf',
                receiverParty: 'mjgtcwh1z93480a7w8bwyqtrdr5sna1wq4rpztfoadso3axqz7g4yhomd91gy4v8q4j7qewixspz1q24fdk0n4iwq88m4fklxnmvtp721sxk9f7i3fsbsvk8mlyiepwjw3i51alxnytyyrb0xqjef0wgraq2oh57',
                receiverComponent: '6l7bu37q2ifrgw8uw3yoppyy4as5kdx6et2ardsuls6q0gfw62hnbbpg76hloeqg7gsh0lts9fec047i6ee9ebx6sz97ben4b8wel3ouxolq9un54ssmp6j7wl3gjmy8abi2mdlaghyqcpxnyp4mliin6k74csaku',
                receiverInterface: '10142kag1lfvdbd6pveyj1eonpzrels13uf925sbgip5oqzja7t4nyiep4pimanmnvrl54za27cushf6poxwkgm1zlc31e6siafgpe9dmakg5k8wun4gq70azsenwozq2q9iog66rqio51wtmj75dlm6041nqcvt',
                receiverInterfaceNamespace: 'srhj52r53nlw70a6vaix6qdxa1jh1wrygjei8dor6qj6byrb6l6o221p6olixw65w41oqw4ekw17wuv9ohk4zxbj3twsuu2zjci9pfzblsdpuqv7ciflt15byvaesob2qkbqlhkpl40iaj3irvvilbvgwfmstsc1',
                retries: 7972693626,
                size: 3082397767,
                timesFailed: 2664585160,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailReceiverInterface is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: '4w6nrzyjp0o3v103cnthf82yg910ur5c0wmno0619t1ofhvy12',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: '5bae968lf6vbu7q6kcm8',
                scenario: 'i9p3hyshamqjvivbxehywu3v3514ermx8cflg7odemx669lj6n7qavtfabal',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 14:37:24',
                executionMonitoringStartAt: '2020-07-27 23:44:46',
                executionMonitoringEndAt: '2020-07-27 16:31:15',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: '39ftcivvlg1651fuhmigojadm9n8j5kxkg16efx2yb8powjr78gd0bbb3g5htffa9c37ed51p2mkiwmtbbted68zhpy06gvd8efkdbm02pq4ezo1wwxa4bpy0za5g6b83uasgx4v7l57b0rsv0t4lloflii7pygm',
                flowComponent: 'yguyz197ssj0x9ze3syelnus5nknpifogwcz29ciesrsior4ndr1zsay91jiftz0rliospxjqj92i2ijohff9r1q4el2ch5qdq7wlgom81u17wb5dv8q09yizf12eero1h3nskkxnvk7fqwv8xedjg3ub0ffhyhp',
                flowInterfaceName: 'mls7y1b5sizp8njclnu498ei8ca2k9lwh57smr804p93jg1sqagmr9538desyynm8p3skfn9tu6yeicnbjzjuixpkvd45hipeinfg9nqifih8zgis0ix4mglhcsw05r1alh6nqdw154p77zlnbxt2rk4ytw7x801',
                flowInterfaceNamespace: 'wtzmlajbkm2tsvno7iiimkgzsj07oy1wwrkgegtf550zy9t6tkn2icitp7ekwm55yrgbytbtqv1315s9mlox1dscxjgvw6hh8rhsayrf0u2ixc8e0atijsnead6ccnxidu75ug60fvzowsn75ftmyyw2tlkjp5o6',
                status: 'DELIVERING',
                detail: 'Quis non aut vel nam. Maiores esse et occaecati. Ea aperiam et impedit placeat iusto quo. Doloribus dolores aut vitae ex in. Itaque ut odio totam quibusdam libero autem mollitia ut dolorem. Minus voluptatum cum cumque velit soluta sit.',
                example: 'qpf0r242vl6e2paycnt60picdhxnp3eh422yidh5a1trtixcz8fjd56n91x5ouxjgnc45zr2opamco5jolg0tfsr9ueiu7yki0dufcg1n8p7hlkydx1jb86vzn6qvf8hs6viy6f3hn000z77bz9uk5q3xjb4wprh',
                startTimeAt: '2020-07-27 22:54:43',
                direction: 'OUTBOUND',
                errorCategory: 'xcmau67mwn0qzkhq3fzqfoxvi9v4i55eh405uc0zhwexb3t01h0gta2p7tw9cojqdj06edesgm2xrrdl762yj2ty0cm9g64dwtzbcil7ubdxmozxutjhdmihw8r96bnmaq8v6rc96zr34qoyox8q99e5uhidxgtb',
                errorCode: 'ul2kwnpolc853ydlr7fqgpnpakmbrdpihm77jp074dzx2lzmxi',
                errorLabel: 336481,
                node: 9937303279,
                protocol: '5jub4r5e2ths1f24y9aq',
                qualityOfService: '3g0r38z1znm7w8e0n89y',
                receiverParty: '7f4g7tgke0bqtqgfovxlcm0eewgf4oastk408e8hfghk5bfi1xgl864czefj0ta0aoja1vwbxkemxurs8kc1cekr9ejd7i9iyrej0hmqv03ebvhlz6e3o4t98yz2d9stt0em9cfmow9q0yu88omsbxxsvt4lg2ys',
                receiverComponent: 't9ej0viv6dsssjnr8l0ocozr1hdvhhpeslknatj6mwj0ro0sc5ghbqi93hvbsbcs0sgvzxxgkj2tvwev7ahxs5eti07yu1cbbhc0vv97jrw59rwssgc8rgszcw1bl5obpk5n6vvbnicxyv72xwy1c76r0jm5ea8l',
                receiverInterface: '2w2ql8qusajcb1h7us4q0214n3qzfd7he7qc1eawpil07qzrgg9ta7nkjo11h6dlav4g323qalqkd11rf62uqxbkim624x6esfoobbl77uoxg2t5qbaw5a8921xdhab815g52hj659ow0t7c9pbhjghxwolo3wdur',
                receiverInterfaceNamespace: 'k2qnleg3zyq2zdu5xpiwc4hvvkrqatk9k8tca48uj0tbhpixbdv3dbplq50dlwccbbjzdv1pb5g2sgnkq0czgs6musy9r4pyc1zjn31nqorx20l1w06i389t1zuucyy34ihrnof3jm1sn4rci2y6pauw4p1u2wb1',
                retries: 5124004487,
                size: 3365602974,
                timesFailed: 1292391084,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverInterface is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailReceiverInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: 'hql9mgll396dl8szy1l3yp3nejlfybqce8jj49vfcywg5m8soe',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: 'rhsmhhg6au3273uyfmhv',
                scenario: 's48wsuue14q0p6agiwg091dyd5hxa0tin8psfz7u12p7dx4jsbidcboipntc',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 23:49:26',
                executionMonitoringStartAt: '2020-07-27 16:16:22',
                executionMonitoringEndAt: '2020-07-28 01:04:57',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: 'u60j4b8y6uknllc9m878kvtr22j99lewft5647w5qwhv753huggwum4iu7d7gpf8ne757c1tcwq82o7obk8g5z2ek6p6shma56esq6cogj9i9fmg60z0gsmwy69fnb1lmug6zobez745ijbimz1cvd9y2ibuuhd1',
                flowComponent: 'lvq30fumc158dz3l397bnjkgq0920okb4dbg5zm1luk1a8486mkwbq0o8xe15jkun82m4n9478rqzfg2x1hf09mca9ci28vdd0ntnezb8di9oo15g73133wwbjrr6ppwmt7g5gjv5fihi3937e5iqp7a7mq1o55j',
                flowInterfaceName: '79eah8nsrc409rxzu3nrg83m2vdc6iucuv6klk589cmwksh7wzqh97pvd5tz13m0emttpc28aaet12dup8ynhxdu09od2fl2uzo4r3sc7gux41x6kk4tbysy81tmfi0ch45h1ny4a99qry8xtc429nzkbqn12tee',
                flowInterfaceNamespace: 'z4pefq4lwwsgny1kkpn6zwaxrkfz22us7ixu4igzg7qztvdywjv53ss5zeocjebf27n0vs2il4mk3unqir854z4zq6bd7otx82j8hxitr8dpjf48w9iapw9a520fjykf8mmou7llircff5y5v72hbv5iczqlrfq3',
                status: 'DELIVERING',
                detail: 'Quia tenetur veritatis eaque aperiam sit enim provident voluptate inventore. Asperiores magnam eos error. Voluptatem non qui eum repudiandae molestiae iusto molestiae dignissimos. Veritatis at ut deleniti ipsam quidem. Dicta voluptas voluptate delectus libero exercitationem eligendi. Suscipit praesentium soluta nesciunt ab ut sed earum distinctio.',
                example: 'ku26obrk67igb5jb4c1ye2syerksu7he6u2n6pj55khr9qtqpjfm98k3nkjuhyya9g7m41shhjnownk73fao6zlwy3a5fki2ukrzf5ibvaax535vuykxlfnzxd6ezqogaprsuhdphv0syo855cevw2y8yl9ugu2g',
                startTimeAt: '2020-07-28 00:51:53',
                direction: 'OUTBOUND',
                errorCategory: 'zh1pyesvae00odv1zlxw7b3jstg27ds8n8ok6veaq7mmlk7qryws5ez9shjq45k5ouk0xflta7srntpcf61ruluroxuk4eya7oe2an5st32mnkjdvgitab1yrz4kk93gw2nu8r8ghw4fo1qvjc6uyblx1djbl8cx',
                errorCode: 'qhj3s7rs0pr3fajzxaackezzak8nt8nor4ujqdeh2hnp7wgib7',
                errorLabel: 407590,
                node: 8577434273,
                protocol: 'yv8jq4y7qnjf85ejqk86',
                qualityOfService: '6oqqrb9h7vi2g1afnk37',
                receiverParty: 'd816qkwrt6au3lzs2tb52ea8iyr3qvbjy4cjfltvdm7ymhm10p669r8964dlc3wjjkyrwg4t1sj2p943p169ynl7oipzxhq322kowyv8kebstieby55ey9sk6p2ivquhd2vlspixe4las6xbsc5xkyx4pxs6pibk',
                receiverComponent: 'ywcy5wevgniwdo6kbsiievenhwz3effs2onen51jkh70s6wuybarx8es92n42jy63nrbd872ybumd0ievhz9tt3ahv7c2jj0l7r90yb3vgova5e62yqgr8y4d9lg9fqicf9hykztoc1tbplf5t02x4hswfs2nkju',
                receiverInterface: 'tacc191sknhyj78z8y2mqjzop9glx5xvjcu9hrld0s721sj3gyi4hfisb9v2r68ok6s2qnq6spnum7qasa1ndbgyirouii7m81idu2wjpg1aqkywp5qfw61hm16vmkmvlxniqlq46y08srua3thvqct20py89gw7',
                receiverInterfaceNamespace: '9ieibue1riuztnftkvk2ffypkvppy4jj74xifk6y5q4jr8g1d8q88hcepen3jfzz6jnghwvf2g9h4gqcvtqn0an8tsckf7feszh165mqwpk1jgxm444199xszn7dzp90dsyueipsu6hqwvaan67fndtzumq2sgu6y',
                retries: 4050470773,
                size: 3113733846,
                timesFailed: 9736175317,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailRetries is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: 'ka1g1u6m8vrjf12s76mzqosmd1f34axtao980oj7aqu6t27yfn',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: '1ui70sln83xl97lzeqhw',
                scenario: '65ri57y4usl9n89mve5w5in689grfe2v2exuil556j9ses353msf45y5jckf',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 07:23:05',
                executionMonitoringStartAt: '2020-07-27 13:24:03',
                executionMonitoringEndAt: '2020-07-27 13:04:10',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: 'o6ifwxpgxv2ag7j8g62ow2n6fagjm9326jto8j2k331nskqc6dboxyr48fcqh9h14xszk0zpwr559axcrdar92z8ir0b0a27zkpi936l1ao83secm2t5tg3ur2umusl7lmg0spu0liu75wz930hlx7dr2h9by9se',
                flowComponent: '4kih7kpvmcxndyrcwqqtszuqmf93k2rjqhni33dhaoynb0vo37acqpn5p4klussomtj6utn7fdn7z2rm47t5z8p4xj2q0lhq26ifn9kvg9kjdlod5qt4qwgcsug9sy2jxcz6nuqn82q9c4mbv2fgqkxfewt3fqc0',
                flowInterfaceName: 'ze1udxihikhcevwm6teztvmpdehihuq2x0cyg9r0iz3m2qcl8kwcs6amio9ny78a39otrlz0by4ba44cou14a0gvrm01le8jrv6gspka99t1q2oc7hj3ye0bxlhphszi2jlcqudrs9m88ooyctik7szmhcis0zhg',
                flowInterfaceNamespace: '573s01fer1lkw7u4y4jkifcp97ijtx2o6qe8fxt32a6nzwoeetdb1nsbsbrji96be28tkdzprv4fo9li6r1kx02ptb8owuhughm6x9dzsnfxjdnroc2srb6ekfcyr1mydxq7fq3x46pnyobjsjlopxr5dcbeub28',
                status: 'CANCELLED',
                detail: 'Reprehenderit est sed cum ut recusandae sunt at ratione. Tempore nihil tenetur totam quisquam ad nihil praesentium enim reiciendis. Alias dolore nostrum commodi illum. Ut neque quidem animi et.',
                example: '6b3f622waxpg2ezigkg0aw5yji29hzohdi7i8cjy2fz8nxyi19lsiwmnyt3ooecl2rh0by8gczvytwyjqyu8i4o12aox7znjmtr3sny4xik05d67vsiyn089k3ikn4mwd7gax0axnqflazky48dl0q7mgegu23nz',
                startTimeAt: '2020-07-28 10:40:20',
                direction: 'INBOUND',
                errorCategory: '82dqgglhc65b0ya9ugjm5s1k1i37vvcec1fgg39jduq9e3waxdbrub7amb2nas5d74iyypjwek2rujy03dl0bsp4qm4qnuirqk1vi095k4rg5lbsl2160w3vyej3vssa5d9e8d2qxmydfov38guhfkynmvngvwby',
                errorCode: 'q3plrlhlpxb4k1whdol2mnyd4dlpymsdw4n9b1541lqe0lrds7',
                errorLabel: 538496,
                node: 2309476630,
                protocol: 'rep6y9o4w0uf5dgpg97r',
                qualityOfService: 'ee4qa9h53l65fi67qxg0',
                receiverParty: 'rk1o80a6anxlnjc5i0qm5w2the6b18jvxngske0lvc1efxhe91eyo229st7thheqrr8zi9amva0owcxfjlxiq793mlez5bsw1netotqdn44mfeeebdx6bkhe78s3uemft986lmk3sbj4bld4w5lq31hc2mpogdgm',
                receiverComponent: 'qnepwqbpgateo5g1yijyyxwtt82odkp3pl3eu5kibi5jkmd5imqab24vyor08mtfz134mqlhk5o14evhmjbyperh9lld8npgi4yrnal50zd2m3uijnxascqudnj991laxg1q4ca5lfe3j59ong0r83wrnk5saomz',
                receiverInterface: 'r5zfzdxzkfln2ske9ynz80dr65berr8bb7tul0nsy3u1453cswvxklq1ir5t6w1cz6oaoxdldh8d905nezlugfxap8kov6wvcqg0hk45ga9th6rybqik0bzgqr3hrcveleblljypmbbgnm2av5rrhm806o07bc6t',
                receiverInterfaceNamespace: 'is93unvbqeqwt5y6mxkguhx2pwef1v57oszsu8smz7lflq6j1ocolbhkgo5qpw6obsd7x70qg9e8yfn1hyqz3crbkfntpbfgh6deu5mrih9ge6ayriluq7mmqg6rlcsvaab6yz2goobdma1ae88oygfrnnrzjuh9',
                retries: 23760638775,
                size: 1723930453,
                timesFailed: 5443955032,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailRetries is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSize is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: '75oxfyro5bncx51x8iw004n1wdefm6mvt6ez5z2f0fj2g0vcp3',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: 'l2tkqn7yyms2hkvvz5ow',
                scenario: '36g3muy23bjm7qmeh3dt93irve2tt4rifbnnyimtg165pbw7o1ojftgr80ba',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 19:46:02',
                executionMonitoringStartAt: '2020-07-28 07:06:32',
                executionMonitoringEndAt: '2020-07-28 01:11:36',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: '0dyfm23zaxiw9i5x4ezbfnm9vmz2dlh0f5aloqcdv84rav50avu6gk5m5cuseywqomewraj6ok8r40cldlwjbdx40yuph9we4pfcw0ou0fsbx8xshj54wqgvm3d9f54vkfwtlc1tn8xd89oab5kyr43f7smybbvx',
                flowComponent: 'dd86jqtyh3ihfzv64d84zndkds0nifu48y1vukcdlpaoxfedvyqk3p1s5xdzqob35rxiakaw3owawtjkji5ul0s636t0s4cgz5fhrd20x5pofk3q9ejqdvapy1cub339riunq3v9mzwf7l4g1l18azs3wcdlfnfx',
                flowInterfaceName: '27us6hmywp09r6paqxazczgn0nx15m1bfyc1ll71pkzxec4l4ub92c603ztoiogykg3hs2q1yti962w2dagd33uca50ckt2sdghhgqsva5yijbfkxzsscs70q4chddvz2td72b1glet1ojfrg8wmnsxv0lj86afk',
                flowInterfaceNamespace: 'ouvmogn5cbncz7l6qomhbrhi2fp4j8r3orsv9f67m4wk7tv37uyr3u8291ngtdab4t2rk5try4q2ikzmpjdd304cx5c3cfeai30tguh3epr3qay4aduh9g486pkjbpu4tstjvp2okmcz117p9kb996a3h5hdj0v2',
                status: 'WAITING',
                detail: 'Distinctio ipsum ipsam iste perspiciatis in distinctio qui iste. Saepe sed harum rem vel nostrum ex id et. Cum quasi doloribus nisi voluptatem excepturi deleniti quis veniam. Sunt perferendis excepturi molestias. Vel magnam odio quibusdam consequatur facere voluptatem in ullam.',
                example: '6nzp74r09h7kxnelqu04s4jnr5p24weqon7zhqyicgqohhnypg8aa8uvcjsfi1b1hks8tsu3s7ugt1viwidye1acbqt1i7kvr1brb1m6z5sam17syk2ua287lgll2rk8znfzjmtig7xyjpaghumbms8ftvsbke8l',
                startTimeAt: '2020-07-28 06:41:37',
                direction: 'INBOUND',
                errorCategory: 'w9w2h55m1z4nndy2nstrmkbby2df675l6jj2jp9sa7tfbdba5a3h4evxav8i18oe593vt2i9o7nom59dqyuw04a7w2y33aevi4vz46osqz9nul0uxa7lcy7ueaerg7msko8axurnnrl6w9cuuzg9ri3ij7nabv51',
                errorCode: 'sybq5gedgziq0evuh4eerhn4voly8ojvl2swfrbvaygiff0eez',
                errorLabel: 666975,
                node: 5508562662,
                protocol: 'af53chcbovhkgvodlpx5',
                qualityOfService: 'jbtlyq8nopn7gmxfk0hg',
                receiverParty: '5fzcqab44izm2n4pskpojpm7x7f0lid6a4f9wovy7399ujcgvurqlh0brcmmkmcft6uk7ouafiu1ws8watpgq7okbih8norzba59y1j5r6cbc46kwthgjblvxk454et7uqyaetxbdpwaqrjcx3dhep15g2riizb6',
                receiverComponent: 'ppfb43amnjqnn1vovdxle2v9l81pyz0p0mg5t35heotxombhrtpudxoe1s3h3hon0g3k4pn8hvqrr4opc6etloqr72glqmtqwtklecl4p5x01tz9qjt40qscnapfr4gnetwghfl45x45124lgh4g7vaihib2oxha',
                receiverInterface: '7k1wh3gn8yc6onkdizuj2qfzpdow3an3ssyet3bj9c1swzkx4bj4h76bzb7odccem6qm1obc9v1og1a2yz3u3s1e5rj6vfsa1yqznrruyuguq0ztb2741j4k3vrx85r6ezud6uwupvq5es28u3j8avwbqbqji5e8',
                receiverInterfaceNamespace: 'gyiiurykm1bbx1khi962ymki8mj12oeo6z9me8alibdsefvu7a4rmnam8fygg6ih4uhcszasmhu2fyw6on4jgrps862j1zpa8jbt59xlw7jltzg5uozqln4h3kxuxj2f2bnwpswenftq9zppvugnhut7yjenrp2a',
                retries: 4480543057,
                size: 78861801810,
                timesFailed: 5015337516,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSize is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTimesFailed is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: 'ajckkx24oy40b6qtu1fepkgywrep6lbw3q4xtn78vka7kerqc2',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: 'h5ykgr6u5sy3hah74z6g',
                scenario: 'q77jl21q6v4pkis6a8zgei9q6u95zg0had24yaz7lxw6vk0rqg9wv0azjzqs',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 17:14:28',
                executionMonitoringStartAt: '2020-07-28 07:00:19',
                executionMonitoringEndAt: '2020-07-27 13:04:02',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: 'f2uoaxf3n5x050d9h5k6gx75pp9tojrvy313yyz81dt3vrqnl8qvqo08kpicocb070o9eutsaxf3fru2tjscp9y9torcslj33lw9ie3paq7drk5x5tgg0ndgfhyiuyujmhlglcq39kabkrt9dvfi2bxfjup3334e',
                flowComponent: '72m00mjb2qq4mb6iukok5wnn8ucpcsi5jy4smxuhuzdl44gf4frr5hlg7vy8q72nanrxjcin875nuq2yfg8o1mmufh8dagxqn2p098k3cjekrqxm4ph4em3ergeo5yw9upi28j2ndxmvu2fx7fukxtbn4swf5ki8',
                flowInterfaceName: 'j8379tvinrtc0t01i1yhj6owzgeazp51waf8wd4cyt3i55h0kcaqh6u2ewzgtkr64ea2msmaz82ttkwqumfvprd2srfv78sxax1wadbhttdtpdw438oies3dkpecwur4lvvkowkux1n1qejmt5svoprio2of18q1',
                flowInterfaceNamespace: '3is48ezma2vtdj55cxphrxhssr0siasl8ti3x8h2z4vfqfypvyomxpkpjfwu74dz83bovpyfjpoi23vrhfi4j3bmyghp0qgi94ioad65wkvkkh1pc6nw1rtl9l3itqwhfk0f4n87whpwqbolaigcb50lonmd9irs',
                status: 'DELIVERING',
                detail: 'Repudiandae dolores sed veritatis iusto adipisci adipisci est laboriosam. Quo omnis nihil minus neque aliquid quis harum tempore. Molestiae quia perspiciatis et nulla. Qui voluptas qui nostrum aut in quaerat iste consectetur. Numquam quis dolore occaecati quia delectus voluptas pariatur ea. Eum asperiores nisi accusamus earum.',
                example: 'yh6pyexp5tvxu22701eda671pecaracbf92qzrij68iou8e7vki86eeswk8331wv1q0wbhx05oypt2vz73ak4xjmln1uh17ovjtq7rh0mdhei97dnzoqfj1crxo4437ng9qlqwiigpzxqs9cao05ujr7iiao5wfm',
                startTimeAt: '2020-07-27 13:16:57',
                direction: 'INBOUND',
                errorCategory: 'euicbch1949dr3e9vilwjgdgw424t8dtgwxdepu4f64amxtcq4ne0j4wdvr1nmncmpy7r2ip1s9v5r1h1xjj9wlto2906alaxvanx1xk4temesbmzbj14dy5nz3rw92oxpqxhv8ewh2zg191hi8mdulh6o8i1wyo',
                errorCode: 'rsli8lu7ji8sdutx59qffrtlcs1r3mievsdn7du3y584qwr01c',
                errorLabel: 784941,
                node: 6377729519,
                protocol: 'mcpj2aenpx4wvsxbgydf',
                qualityOfService: 'hi4vi3pmx3xkb5u5y15d',
                receiverParty: 'is3ejkvi5os1spgxqdu03iy1qlaby8i5gwl74057bkrlnlei4rdgp9wm8eamc0whaxtaiflg3lu9h3x0reswntainnk2rtewa25ql76iy1m7q60uukujht6feenxdabh9aic2qyr7r3maaizlli2mzp89w0mqiae',
                receiverComponent: 'he5qvfrqmqp0xr8jqozwge4ch4ypgfh75e41ad3bk08qlh5ti3novs47p2oqcvwrqc21ljf75i3hgwvjmp5o63dq9z1jvlott9cdlyms16ec4nk9qm7xyhdreuzygo2q834q273blkz0vcy7fj70qjf2yyhb9axq',
                receiverInterface: 'twtnhpoihflw470gu3i85iyrw0uygjju3c96gnwqc5tv9gb931m8iknul16sg2gc715i39qo7br4jcsb145tc7tvbi6m5zgp07k2plwjjak3x9qqn61fsoo8k88mx8v451kxt9cvq5dqoun3l3y3djx6dsohg0jv',
                receiverInterfaceNamespace: 'jhxo0zqhrmfhbtchxekoli0gpvxolshbw29iltn94o95vh1g8cxd1a9qcpqp9e8crtxzty2cwlq47bype28q4ethoy6wuu5mglynho1r8pr0eg1qiuuwhmw4c1ouklafu1wc09e17q08kggtibmzr98guovpw1q8',
                retries: 1292077886,
                size: 7344016706,
                timesFailed: 59537355562,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTimesFailed is too large, has a maximum length of 10');
            });
    });
    

    

    
    
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailNode must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: 'uwwwc90pntoejz2it03uy1ux26lzxd9g42wqlkc0dmax43753y',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: 'q67x4yyzshaaflbfa8k8',
                scenario: 'td4k69ned4593utf8x6vubn5wqmvwxn6q3nw1pbd98is1trusv2dzh6pprve',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 20:36:42',
                executionMonitoringStartAt: '2020-07-27 13:18:56',
                executionMonitoringEndAt: '2020-07-27 19:20:40',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: 'vwrfmqueq6bim0cb5s7qp6nxoskcdcjfgkgqeap9urz7735koxc38orxdvrv0s7jgl7svzebb826qkav6grjyv3bbeqkgn94076avn997jscyfip9jh5cl7usht3l6689a7p0bmyigagihjygxqyrlc88u4twapx',
                flowComponent: 'g9veebqwlx768z6udmu6nor7szs1pyeqy435sa0kkokj7rircm5nzz5hwdbj5aydnc8u98p3g53sae7qyyyv0g7cxk3leji9bsa734fswijtmx303rlpfh3odvrzr0m2z3vyxbqpi24xrcz4jf7nuq5mmnzb3wvn',
                flowInterfaceName: 'o0x0k1grsn4ixza6r0g3yxctlnuih1p92kl1lrh26xy6j9lw3ypbsn7eaf2w4e8gm584yjy3sw3cad14wz2atmtm725bp6ri09azqp4276y4ldp1elge2kmm2rpjsnofer4287lc88rjcuiy46emp0dm7xyruw59',
                flowInterfaceNamespace: '3ck1zug2314yhm78du9cf4x83fmvjriqifascvbt3ym05ap6lpz1khzxwr8r03l154f9o5bibi1ojfzss4dlj7ht7rvw2cgf3nhwqi5sg9fi2tw3azqek89w85lmzkmd129xe8ly5qzrxhvw64j9tha43favm1sa',
                status: 'ERROR',
                detail: 'Vero nobis totam accusantium dolores a autem quia deleniti autem. Architecto voluptates omnis veritatis est quod temporibus in ab. Consequatur commodi ipsam est nulla est. Sit voluptatem ad reprehenderit aut nihil voluptas.',
                example: 'v6t1i0o3fsolv6evpleck7doqfpl8f85iqyg803uosgt2nqw2q33xku8olryr6015c0botfn0qa5ikpnt5ntfuks352so6kzlz3v634h0vkj17ed5lpe985vqpzpy1ldawmg54kza0zto0axd0hdut5gmx7i8pnz',
                startTimeAt: '2020-07-27 16:43:04',
                direction: 'OUTBOUND',
                errorCategory: 'fpyvvb78xsk6n97edftauli4yhv0t5cu1jslopsfnufoipmggvfl4h7tfq3pkvgyr8bs16cmqcu0mjpbabo3yp0jp4e5zr14oabl4cu5s5ywy6w4tax78omao720kisnb0g7hz52bmq7vyneabf9xr8etnmxyjkj',
                errorCode: '4z2jcabmynris6fkhupj3q1g3cktkqjbxlsvslir4ztwh1mpi2',
                errorLabel: 546317,
                node: -9,
                protocol: '62kyzi1auhgw7h0zo184',
                qualityOfService: 'n6qavfp2fzm9uzn3ye1f',
                receiverParty: '0p0vo8chfz2duapidwajji1xxd08l9k31iznc26kbcl7atmtnihwxcnchjtb18aurh8x6ons483c81sditkhf50oevmt52rkxxd8vceb7a73940idc7gynsgaa9qrqfk5sirsiljqgpq5v13g7cdrhabrnuxuneq',
                receiverComponent: '1yd5n63pp4xkoxm2bg77rwdl75oltpceg3ilyvujrk4fjfiy8llawt2byiaswiaoirqgjftz9ujrfq2l16ky171myxy0pi5l9nhs3fe3pddovo5mg13xjm1ulii52couwr2bzrqmjkdh7ryhtoz02aub8d2qxztr',
                receiverInterface: '7g74qce1xv48urlk2jqxhzdapmcagd8tmooapddpn7n5rozf4n3h5yhfoo1xpj034ivtqa9n4gwfroldl9kb0m00mf0m1ob3e2pht6l57anaehquqhwtb54ew0fbv5omscqeda9ewdfuezce8vab62ks2dnhg0ha',
                receiverInterfaceNamespace: 'hu43nkkgiivuxuz69s0f2uxvusvzj6d182n2bl8tj38gkktg292huoiacggz6zcxbq2n2v8dls1ewo31lk2212198suuy4cho4vqioijeyxl6lwnstul7hr11s8gtwq1ommacjnqpa53c3nqe4epqi5njvb7kp0y',
                retries: 3335925968,
                size: 9664359943,
                timesFailed: 2851976814,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailNode must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailRetries must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: '0yxgqac1dnzf1nhfuerd5ftikt3qf0enj20hv7dry2dt4vhany',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: 'tnc6vo7q8b6194s7dvev',
                scenario: '8kemr2prjbx0551nlf9kqb01wn2yve4uuwiuflinkeq4oh6p309wbwd42dm9',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 23:15:25',
                executionMonitoringStartAt: '2020-07-27 12:16:24',
                executionMonitoringEndAt: '2020-07-27 15:13:23',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: 'rxgctkkkscz2xfxrargvtevfgycklk07tyjhjkpo82rocpb4nb3p8bi9qhcf8qojzr4aw7waziwpyx0srrj6l16wbiyvl5vqyvc0cgazgug9re85pa1khiw334u7s1u757sisnjtcaxxn03r7ysa86nk1un0snef',
                flowComponent: 'erxhx8ddgrooe13zpa4lw4mgevikvh9yc5b4nq254rrfgw56nkque86v737qi4rfd26j638h8yw209vlknvcys14k3s3zixwurgp6zreaxlac7k4l65ojtzzp1dft009s3txdv85auwlvomf9xyiphxk9who8uji',
                flowInterfaceName: 'axplva0wo9sppr3ch0yryuyryalexe6qvloclfok2xle7rcp1d02ohzlaj9nwmfcgye0to8a0jxh0wtmtfec75lx3h4m6jonqw8bkn5sxzfscsud91iy5ltmqjtseev3serhhds4dbls3ivinue6o3abuggyo9cd',
                flowInterfaceNamespace: '1y19fi7df882ep6nq9bhb1vfjccq7hqvijy3moijov9mkis8ftf1fhssjg2nityiadms9qpibpscs3tt4qvb01zm1wx9i4hze6x3x64fr2581hpn4hbb76d57h1kwv96xh7vc4h6wiusjbrzaxhcdlvejfzcfj2z',
                status: 'HOLDING',
                detail: 'Neque nihil et eligendi enim iste et non eum. Molestiae voluptatem velit quo repudiandae sunt deleniti sint. At magnam et quia consequatur officiis. Et aspernatur molestiae facilis ea aut. Quibusdam sunt sunt beatae iure.',
                example: 'hotnskd6ie6lexvzj165o2ys6s3hxl3x6i8e1g5hq44qg7bpfa7b7g9wpyxslvmcmn2wx1ym5axpz89mjmwalh8w2f56no96nczeqba6mfzwiw3rm4vnee5d1xvmh8jtw8s91os20df9n53pebo8qr7j37zlhdvs',
                startTimeAt: '2020-07-28 00:05:56',
                direction: 'INBOUND',
                errorCategory: 'nyv4gep1p2b3bzhx6qs14nhed28uwfiws74kphcpahb8ay20jzn6s71rk5im0cdkgfut5yjo98zyb3rhk8ugb2ngnijmzoiyi6sjyvxh7jvi13abm8or80t83dr9ubcwbuffvwgyswxlxkm8e2pkm24wdi5shsku',
                errorCode: 'crjo3yq7j7ghel54varb11e0qm5hu54baffyob099hty8o2ewf',
                errorLabel: 764827,
                node: 1716249516,
                protocol: 'jw95xmd2kkcnvdjgqu6y',
                qualityOfService: '1lg5ra9p3au10o9ywao5',
                receiverParty: '6psqgdvavfji41okcjmgs4cev93v53cusdcx99kk7yc95j3e7je1m3im0kaqwrg48zg1zarmo4c5sof3ew4o79qqwska2tn8gj6kfqc7rug4ovvlhjjg5a788pcqnhjmjsr9b9bx3t6eayhl5xanaru0h89orr90',
                receiverComponent: 'wcly5fsxaziy9duee7ec0xj02dj387cjoq3hpm930uk82n3zlj06yx3am97as2na51opswu451p0hlt12lilijqvciuyc9n4ry955nz41pvsobmi9odec9zup3ucyzg9w5hqb8dtz3butyeb23xf26ko6gfzod65',
                receiverInterface: 'zdasijliwexh803qmr7wi4xs2sduvygqo6agjh1vacqpcenzjjiydhnt9im9zpjnly4twcthtfl3y32gf8fp2uah9d4gbw9m5yje3a6ignvrparg5y4bb4fmvulsqlcp2hllg3hrorobwyb3suxamxmf87n95uof',
                receiverInterfaceNamespace: 's2usig9vqqjw0g04l0y7n37iioj876t4blpj5l6w2bk757ilqcaqeg5nn2yfuhffa0hxjwuhu0oqxeoi6jkr6augkc8xe81juurtcmmv9kzb3f0fwjcpksmwvbctxple5qwiyyavaiim2dfjltceprjvihui0isf',
                retries: -9,
                size: 7557869159,
                timesFailed: 1507920938,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailRetries must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSize must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: 'k3fb90qc12ss74975ezsg0mm2pa1aylx119iy2iw6gmt32aiuo',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: '913zpgbgp5lwiycc9aj7',
                scenario: 'ryw52sds8xjwqd787kloz0ojdcimti1iq96uve6benpaplcafapf33pdokue',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 07:43:54',
                executionMonitoringStartAt: '2020-07-28 10:01:30',
                executionMonitoringEndAt: '2020-07-28 03:38:00',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: '9xxrh53nw7u12iqj7bmccbfn9joj4ilcq72eiz6ky4oeo3b8t4jkm2mr5cq5qj3zi7nubobjhdf9wczica42g4qbfh8lohmu7vcyuk04drx7l6aq06u1ta90frgnk3xg708klo6excz37ilqrs26b4i76sxh2742',
                flowComponent: 'lr2hkjcdx3jpplwjkwrx5h09bt3zvhdv8txy7tjkjugncsoap00n8hhwxober97wsw6te55crla2xk3h89baxh0fv00l3rck07t0zf63kh8c6ioura268g28nsgtnkvo5x21xbnbzyqchys6omad46a9uabbuig6',
                flowInterfaceName: 'hnftm95zrrx4wpu6ve9mesu6joejjvk225zoffpvlt7nbuu9h4noyvomsdaz4nce3fkczgd3pepowhn2op6wnq6dhcwi37xaf2dfsuhnh2vjnvo7hih3wr49k6j2um7f1r6ee52nr7po53yb5ec171rnb7ykqyyh',
                flowInterfaceNamespace: 'pgvpoblckfhyjm6o8dg0y86v4f4sj1q4gvawk0e2bq4xu8p17k4jmlkbktnpf47kqyf966ch0z7lt1iq70nsf9iukjjj491bu68h6y8ueyq4dqwhkyh9mxgxvvujnyhdedh6hu471r9kynlck6r9iuu32ohhpxu7',
                status: 'TO_BE_DELIVERED',
                detail: 'Maxime numquam repudiandae. Nostrum consequatur eum dolores tenetur quidem alias ullam eum voluptas. Provident praesentium et consequatur perferendis dolores sit et dolor.',
                example: 'dejctdkdqds2arssp1ckvl0hiwwl13gk32duuqktv6qoslac3l7eh91uh811wm3irbjhxiobwm9x7knmqnbnibiziufarlk4tamp7iyy20jyuqr6h125vxw6h5neaef0caqj2c2xkn9vp1pmiia5mi9myd2eohnt',
                startTimeAt: '2020-07-27 19:55:51',
                direction: 'INBOUND',
                errorCategory: 'trnccdfb9z9p7ysphv4dd8ylkoxupztfadzgg8l0md9zn2nefmyta38yric2t4iq4zn86zr2pl3uvqnhmgu3j262welcunniszutjpx0al1m9f2mmoaa3cx589k5pnbsf97kiza6qf7cmxaaann00fpzefg2fvc1',
                errorCode: 'cwyi7fo5i58xoqpocg3ycq7330n21h7w7uf3tmx9nixugufzaf',
                errorLabel: 237308,
                node: 1972000586,
                protocol: 'q5mbrqjn49ekxxjlqn7e',
                qualityOfService: 'as7b7961hwrzp9ryyrij',
                receiverParty: 'f0p6p32b666i45rk2d0x5c9a946zohazp62g1l2lz09snj9u3pc2afwjo99jtga8538kpknfitul52vwh8mxgwsngf9b7ibg9fm7bkfttj2ua0ano7n2er7ykfbjrxwp37sdtlhrhvbam19xgplc5fi4m7n728ql',
                receiverComponent: 'g1a62ep4slr4l0mta8duhid94fdfdnsz4khsg3yiwyhl08wa2grbhqv0oo4kkbmclpvagkfztfsugemyyouze8yhx8achzoevpdwhcjg7nf2stt9w3shpk0t339x190jidkus12vjg91w54209w9x1qeq11lx19b',
                receiverInterface: 'ubtbwt96nkxcve3y8rpd3c7hmykmspe40fr95n0yjtqqp17shgq7w6790t8c81yybosot7tmusumt1upwlmupvdp0llmodqkrxi6jbj6zbclojgqnvz38lpp2j7brbziw7vlisyyw2ip5v40a45b42mbui8osmif',
                receiverInterfaceNamespace: 'beggufam9m67m4x1xqev13lwu4gmn5wcv38cpgyh8ayc2hvuh2ocwgg0isfrxmi5z1lmn5crh2z569ec6gag2sc4ofdsodheveyemdmdj5hjtik79wdgum83dtvbbtnd3m08m1kg8rlgo8idrgmfzomp5l01mpke',
                retries: 9481156495,
                size: -9,
                timesFailed: 9689254408,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailSize must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTimesFailed must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: 'wcjx6v5840jlqgopeoye4dyte8wwfcfkdmngv999r12nvj929f',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: 'aehlkkeeziaemll9jm9s',
                scenario: 'd2fu07mr2h9dixmoxt5wexjx0s12rt96yyxgqnoqtw0nsgj0vyivj8x3xpjk',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 03:49:01',
                executionMonitoringStartAt: '2020-07-28 02:18:33',
                executionMonitoringEndAt: '2020-07-27 13:46:43',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: '4695wcy2u97clayeemapsd2s4ghz8lcx0ks5f3kohh0hihuux0k783v11qar29v3m44klbt48gcopmydy50zlfefjbrvl21bsqstj8r0clp8jpzlaotvmu1umrjif3yak1rl747p4hob8btnn8w95cwkvpliek2l',
                flowComponent: 'gpg2mgoshh4yhffs2o6p6c2wdf6tc6wscr2jqslned18n43s8wxlbglyfweu1rmstby72km0no90m0b0lyatnq2agfmlgx3zie1tied6vxmtchtwz3ktm7ttcye797bv69ud3uqh575j69eiilfrvo6b17czis0n',
                flowInterfaceName: 'giybtatq8ydvfsybcik3s7umc81iaez10fvlhoi82yr3ewshhewh2cfg2itxpbxgkqbypj51kh8q22ycwgctpgwp1dnnd8g5rwy2tg4k6rdoo07eh14tc722msfar17eszcy6wyimj07m21nw7us73za2v3uow0u',
                flowInterfaceNamespace: 'x0nfaa9zvti2wvhbx6qec1cz4fyx6zyll7p39l7wnynqaeuvhos215dk75reo9rhcv6oxcikhbz7otbor3weidkok0jak0bnb2ljnmtsdz7sq3niqqr3fqjoqc8bjp90lrtmdyneg5g4h596eqsqrcz7domvx1ro',
                status: 'DELIVERING',
                detail: 'Ipsa enim necessitatibus atque in sed aut. Omnis atque praesentium fugit impedit nulla consequatur quia. Non natus sed velit in harum est autem. Quod error debitis illum quibusdam deserunt ut consequatur. Sed ducimus commodi animi asperiores voluptatem quo.',
                example: 'dgw9fagap35frl62dav8h7g5gyxffvhcpaju1licn1czxj77o1pl9t2808mzpj81bgf4ie1ud4jghogfi76mamqd7cbezu8fd3k0g4ae0ah4o1czgsu9uolfrpi0d3l8r58ferui1fk6bdoecnkh89638l5u824h',
                startTimeAt: '2020-07-28 04:48:56',
                direction: 'INBOUND',
                errorCategory: 's8jlw5yymdhv60djr6rasklnif9hrurow4iszo2pv1ldc69cwcm7zwipzx6rl97lm4h4dtsqjqjp3q7mfcq4b9i8lcgvq2cb0sr91ec78ir5ukceoib1wjpyeczm5g06kcugz4yhcdl8q34hxxzv9x312x3hpwo9',
                errorCode: 'bwdwrdz0tw8lmlpw9kxswbrfq5t4brl6fflfwxmoqi3t304qbo',
                errorLabel: 843058,
                node: 2300932326,
                protocol: '50s4elsc3obny22b3i5g',
                qualityOfService: 's42mqo9gj9w1m05ggz1m',
                receiverParty: 'zn1k6n5f0073bv2ahewy27s9qm65cqvb8a8re6qyotq47yh4mypsoryczjw63as4byfvj3457ne3wis51ozdw3hitiuvvyv8kc8ejkrrq8ofq3vxij3htcnmfrwx6tjxf2fn6lywgaxrdossxrchtv9f7xpfckmu',
                receiverComponent: 'yqtgfnl3ix10r3f49rw9bbn9dv1nfjnaex9t1vzut8u9gaq0nhdnfrext3rwf44ui29zabnoimkatb3ey4r2t5u2dtjv2gibiodh1djbgfotfsqgkrvv86gsba9xtndcdgq9taq76m75dzwm94h4mh22qm26ahxm',
                receiverInterface: 'mhyeymlm7q2ewrfpt4vnbbun6xxqdm1i88tai0ftt2gg2kignshzyuokgpkvt59ph7vmtuyw7brunygezhuihaduqk7cxu3zqrpeeu5i6js0l40zkba5v5co8ux184ck727hmz1kbple6myex0nqdb2orq9oerbd',
                receiverInterfaceNamespace: '01vu7rwp4v1u9psfxt6stge7enihvo8qlho37ibmanf30tzk3729kqmdugi58ux3xv14jyyeumf3uprmhkcz1ieyvs4ex8mctmvxx5x31k2wum4q8dlfgcz6w0p3heiz7428qbl9m1u6i9escilra99kgd43fj6n',
                retries: 6540653561,
                size: 1345272926,
                timesFailed: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailTimesFailed must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: 'm1ypeqf613u984zw4qpciuklmj9oqwsn0foczfoa9nc9w2qaeo',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: 'fbruyzh2esl5y0maexal',
                scenario: 'p6wpfvxzg5wh4lluu5cpcvs4iphpzgjami24hqj0pree3lheiot5x06c2kh2',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-28 03:51:05',
                executionMonitoringStartAt: '2020-07-27 15:46:07',
                executionMonitoringEndAt: '2020-07-27 12:45:57',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: 'cloidl789zb0sjcxolt4lxmp11yl4tcj1a0zasngbatwdjxkyhehvr7c13x37i0slgjju7152nsi6hg0ac17jrk92hkwf56c1s81hb7eg75l2uhe526vpvszt23sd5huqqnfxdx178z0zix0klt0k228y3c1v4u7',
                flowComponent: 'cwdlqzcbqhiph5odctorvfrvx988f9j5ka1q9aotsq6n1unyg4cq1c7ktm32okpta20fos5n24g7stgnpfeylj2fte11e1kfpq879no7qtma0919h3hompv4hpc1x4isbamc6mv3pvzep3ngbc466q8ldk46m0og',
                flowInterfaceName: 's23zqhj9qlkl8emeppsovdk7hi1yax1zwvev0ggn9adrffvnvjts7qf6d4omh7639mtegrut92gnhrup2ney5l5tg3mu5xy2awconrbxf8k70yzg3w5m3ne9txk4swdyfbu3fyoynyj8sucxnup19tf50r7be1v1',
                flowInterfaceNamespace: 't9rklfsydvlof18wjuoknisjtkbi7h49v8ajaf54rfyd9zttnnxmi2pi6yehewmkbhqn5ktuq9lch1my8q14cj0k78kzvtrcsta5wwmxb06g5miaisa5zpx40wlmfx7uh9zm88hoixqsy4doxd17vhn333fr7otf',
                status: 'WAITING',
                detail: 'Voluptates enim non a eius rerum. Necessitatibus sit voluptas temporibus. Qui voluptas distinctio dolores dolores aut sunt. Eveniet sed maiores delectus vero.',
                example: 'zobhxncet89b3e8ztxi0sgb6cvi6p0qd8uamab2o9sjt3i7yc2pnpuxemzqgqaq6i4xeoq143jt893wfykjyj4w9cjj4opikqx3hnuwfdhnhuiap3nm595t6efthofcj6iipn2gys0upic7t34pygr1hctdukzcz',
                startTimeAt: '2020-07-28 10:41:12',
                direction: 'INBOUND',
                errorCategory: 'bx0lv9ysqy6if1jocfuddi7kkbe9rqfcded7mxipe6gff092tzcgtl1kpnonm5o9fb2w16hwypl82tjm7mot7ph2a6cbv1mfr7sspmavw15d9szww5aespbkjlfo23vmgyt5ows4luklexf0wr458ajpj8fckilv',
                errorCode: '9bw5r3en60klnent57py8hf4i2wn573e12p1khffa3p4ubsc6o',
                errorLabel: 819180,
                node: 7644455587,
                protocol: 'jt2duz6v2783jonw3zce',
                qualityOfService: 'rt7yh9ffg8518d5ant5w',
                receiverParty: 'gm3w6j7rqskxkrusd03a6p000ifhy5iarnlb6thz56ze3z4iwldadodvavgyqt8mx7mfsu5pd368pkqsr86vv1d7568a1535sz15vbgqcuxsm48fiusaibjjbz76r4ou8aa0ndawxin5a5orx9xukvithiwwo2s1',
                receiverComponent: '6drt1okt1yndkg6ah3m5cizn9fharr9xmqfqha0ljc1mrcdr800wn8vtnp7vybkmya0r50pc2juwq5d5w95qsnyrffugn87f0j87cznc2e1di314g3wzkw8r30q9x3crn0y3dq8no7lixlgvso97uq39jm7pt41s',
                receiverInterface: '1pdowa0jywgem7uc90wb02s99ai38s42j1xb4onfsyap9oou2omecyxzbeburdytodlu2yoz9724tiyxb166q7l2vkc0gafuty4tqnzz3jbfwphgpcuy0utrdl7bzunte5dvhumzvkpmf2f78wwkhtsfxv4igmez',
                receiverInterfaceNamespace: 'gqc4lyb34cjtwakuayltb1dstsy3djw9n1ot8nhzxtckblksqsw32emg4wbtce8g74fop6kvlllw1xb5lrbj8z370ig6afmpq73d178jj45f4kl6q9hoh5a6ivst45nweso9i4bvkfacs3m8jhuxxsad8cshk5ao',
                retries: 5844152066,
                size: 7592958333,
                timesFailed: 8151364655,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailStatus has to be a enum option of SUCCESS, CANCELLED, DELIVERING, ERROR, HOLDING, TO_BE_DELIVERED, WAITING`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: 'mrd6o4wfoamjru6x06iuiw0hql52asccqdkm4l4eblh68j206f',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: 'njxxmry0g4124ki9zm8q',
                scenario: '9d6ynzm5h92ogyyd38zdy1t57qbn55ekjpmo30773peyqe2xewy25eax6nzj',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 18:15:51',
                executionMonitoringStartAt: '2020-07-27 22:25:13',
                executionMonitoringEndAt: '2020-07-27 18:11:04',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: '9p8kn5l02whwpka96lnoqlftvuxwln1ci8ci6054s74hbdqx3rjs9y0ibxv2ja21d49u74kogxq4hqiclxyi6mlr8b37lwub60m98pe70m3cojm8abw422cm1l4zpbflm3y9thp02j73uijjw904peip7u7xqns6',
                flowComponent: '9i0bfkqx8w4hl3709g25eqpwwc4j4pj681duxy5utq9lsfxkh7klpvv3iu9f7w35gf46ay12gmn5lxocwop2tv8anv61zjcq37srubn3ior2zc15rq70ygi9lkijbxi8xqymf8krvj25irrelfflhfkbnx3sndhb',
                flowInterfaceName: '4vomtl2iyiho2lu9pohtl9chls1sl71ev86sittktr53dd1d3vuzj31nwowdbccvt4amtrifnu824522p5a23ys9s084cennuwmbpw844a8keae09q5pdeaytvlkpm6tl77l5bjl96duosf9lj4skgjq933ljzbc',
                flowInterfaceNamespace: 'f8snkhn7c2nilkalggvyjnhbgux5dk6xsry07oo3inmi6j65h7apcbyp9tbzingj6pmknh7vq4nsu21xqbmq9tn4y9ptanrm7apy52bih13yclgdhju86e4dz0kf39urd3b29wr53lx2f8su76rb213r0yzp6q3n',
                status: 'XXXX',
                detail: 'Veritatis quaerat autem maiores autem non. Eius similique et et delectus hic culpa vel. Velit ut vel. Perferendis illum iste aut voluptates non aliquam harum voluptates.',
                example: '7gj0maonedujf2okmty8ovve9qq9pd8omtte8e3xs26wicyo6o00zgym7bg13clhgyyep4d9yetnck9755hsaxgw799mdg5bf5k1dt2vp91xbetsy6yhkm4qxurqwmxd39c6tqxccllw73qe6zjbwgu7a9fr15qe',
                startTimeAt: '2020-07-27 13:40:31',
                direction: 'INBOUND',
                errorCategory: 'sf2pyh9clr11ozpp2i9dsds4d5u2gkxq7gqstr3ib3a81peh5596gip1f3q7yrv3ckadm6d9s9yo2mloswa0jbc6jvvn0noaa6gsozljtf0p68w0pxvviua4dom2hl5jcu4dlb5juwciuge9kgqqboxc0sk9aupv',
                errorCode: 'loekwiu8nvolxxu8226v9kye82dk1jek8qr576rp1gigzy4x41',
                errorLabel: 512267,
                node: 1401529231,
                protocol: 'z1ie823l6d5hm8rahw4w',
                qualityOfService: 'x3qcl47a06jm63c9239m',
                receiverParty: 'ssi0aa9ciz9dwhzo2e3vr4w0e6tff7xhp4fdtyqxt7fpt41xrcqts6yh0q9x0lvmvlmypktyjrsj9qcuwuybc3fgukklkqa6qjznjjdrtj6pde2842t8puv07jvh30kp63z1in2mv03s5zm72vfcnx3vfbixevg7',
                receiverComponent: 'vd1zolgoyutq51w3k4k1i7ycgt7laompar74gdikwrgkfxmjzg4yr16gdd7gd6hs9iwn2o8l4ai3pu2ufze29naeg0soxp4prgaq3sc4jnxc6tijajjrqt65kblw1bopqn9zvmnx0oyorxm2uc3v4wvgi5tby8kf',
                receiverInterface: '651p2tox4ohap8k5msuppdbrur2cs5o7lcbwq3nimtnhvzleb34sxadxdt2206684k7s66njdls0tkq4uxvx547oip1o0snkw3dh5zrathpq5mhe43zmg6h0zhv8ecfr7qaot8zyhek9ssw9xliws8kil0prp4v6',
                receiverInterfaceNamespace: 'cph0ejh8nisr4qz0u69z3i4a0rg5k27no28ysg0iol0ephozchgthhntmfolpevq739uavfq0759am38v0r3pt1wje6pg3ahicbf3zzjek4bvesmsm9svwtllkgje2dn3x91jlpzohmd7ecgeznxm9tcd3maukfd',
                retries: 1412025348,
                size: 6307907733,
                timesFailed: 4526084513,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus has to be any of this options: SUCCESS, CANCELLED, DELIVERING, ERROR, HOLDING, TO_BE_DELIVERED, WAITING');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailDirection has to be a enum option of INBOUND, OUTBOUND`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: 'cae7hez159s83v69kd0b45dt4gautxv6q4w303z8ptuscea64v',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: 'xdbile62zho52oodlfk4',
                scenario: 'vj8unb4nmw6pgqfl4c7a2c0mhbu5wwg0f6rf6jfokptw02lep73g9m4yfswt',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 22:11:42',
                executionMonitoringStartAt: '2020-07-27 20:05:23',
                executionMonitoringEndAt: '2020-07-28 01:11:08',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: 'p62azdolqlpm33he4ivf7gp21hm4qxgs8cvg5f3tzijb7ytwbvm7tk4xuoihsjycyi5s2fi27895m2rfn4ani9f5ixt0mkpvgk7whd9vhdrsesw3yohxw0m105k09ofd2jnk4c4ehgu2e6cvp5356zwusr5eh503',
                flowComponent: 'fgudr7wtefop22jxir1sc2nwaaprv4qr8ui0a1af7zhk1v3hy7wotvnz0dchpqa5thtkq3s1xhdrgyag2sj1g986l18vymbxx354scmzd6nen56uzio28f5oup3hrywpa4wbharrbawvspfmey984ana3tzx7kd4',
                flowInterfaceName: 'etthemx20g9282ia1tl80266tojzo2ysi8c79s2pqdyjeaa513llc32plc5zne0syp6n35wqq8jdr8ddi2d1tk5hmmm62pizitgt1z39xsiup7rp427i4frrh8yp2vyrgy8pujtz3s8ph8eiu63qs3csn2ep4h61',
                flowInterfaceNamespace: 'g58fnr63qse00jdlo74cz2km5atbkchp2en2u6w2kh3jsxbksrlpsn8mslhmvd521zd69hfk0pfmjayrnlgp9fuol6lwuivmvve7y81kokdulx54x88tarhjmo3h5pnhlquig6h3jwzyb21ktzokvsv2ftibrt0b',
                status: 'HOLDING',
                detail: 'Enim delectus quo minus quaerat aut neque rerum ad quae. Earum enim voluptatem. Ea ipsum et et. Error repellat id provident ut voluptatem consequatur perferendis. Voluptatem laboriosam cupiditate qui officiis inventore debitis quisquam ex. Et voluptas non nihil in illo minima voluptas excepturi.',
                example: 'vng0n2rmxoe23kpjkzretn4epyj4fydtioh2dgn8nub0lb5572n739lwgehie62zm57y11tmfi1eklsga7clbu021f7ck6s972a1w5ngigpnnu6ktuqbltph58zysx3n2344bvlujdc8k4z5po1x4yqxxx4lqu8o',
                startTimeAt: '2020-07-27 12:20:53',
                direction: 'XXXX',
                errorCategory: 'wksjh6smgclyvxqmgzrd0a6cro75bix45ms9huppjojis0yqyqmksoi05lc1tnn8a8dhg1ylslipvlghqn5zqio4to0l3bqsj89nkg413yq8guawjhbs2tp9tjh055e680vzxcbnytt9koigbslo10h8mkjmuiyj',
                errorCode: '7cqhu7qx7h4z7c678ge61bjrv2k49cqwxlbs94fvzsk671tfft',
                errorLabel: 173446,
                node: 9877069958,
                protocol: 'v4lu4nigmztznosdsryw',
                qualityOfService: '98qw1ulnpe6fchg7um9h',
                receiverParty: 'juznryemw8jszx335yny9v15lcssruj93sdkyjqtzyk9w6rs4dxpvpgm5glphf5a66y38mwg8h03ommpbdsr7v9ddzahk55qsmlonc9ohar14wlehz0sik1tn4xg74ob5wr6txk2gyfqzzxtgmrh8g1k20rtujrv',
                receiverComponent: 'ci2zi8h2y2bt1iwwkp8ing6txhyvafpqkmik6bsrjsntshgwejnlhx11wdn7pdqjlvsf0pgw55pbl6toxt60nvh1w5q0ltpjhujapfev8evz1rl2hi9qsoin0njb3v6ofyfi9p0d8z8ys470h3qqw886wed6t5tj',
                receiverInterface: 'vct443t4vkqxbmg5145rlbfmo6rryhlzclo5avk6yvgk503rf9nbu3auc8b8up5fn0uewkymtn3zpwq67t3baubbyuvbtvs8llzh16wrhltmy48v3kgiywjtun8uvaaddl8f0tmojf76zr5cugnrxaqvsi0zw0xk',
                receiverInterfaceNamespace: 'w6qhek999iynmn3iunwf4c1t2wmc9u6jyjqfd57dcxna3ma0b7bfctgxh7izeglhai02r0b5ogcb1jzk9wph2hjvlvho9v026ibcltl5c2ez4jmua95tw5iskcai562yihi5q9q98xh51li8ilmk3fsynwyjkjoe',
                retries: 6391897199,
                size: 2831521019,
                timesFailed: 5516691039,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailDirection has to be any of this options: INBOUND, OUTBOUND');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: 'f4sj4winmm9frvbhl183caobuvynbkczgw0s4i9ef6kz26i84d',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: 'fcs8345xicmqeml97f9v',
                scenario: '99qvpushz0mdb27jm4h9zd7i5vp03v868u79ey7l3irk1tc7scdqrhe7tsqs',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-27 21:14:46',
                executionMonitoringEndAt: '2020-07-27 16:44:01',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: 'bsvs95ni5bk5rwif60xtwfiqyhbmk6yw4m1j7jrh7wv4xj153pvymzdahtncn7fk49yxeeag5nv9fyq5czvvhrqm7c9ajjantydmy9jvrbj4if50s9nft7tsq26s751cmqj97v2yzv7ss2on518djdh9xchw3vdy',
                flowComponent: 'tgka7ahsnulqmatpk8i0rnmjip8wgdcp9vvvtmc8vnuh4gztpr9og34tau1tkyy39h5n41f45zc3k126akwz79ifflj1egmhfd9g6ewqizs9xt8vu37rlzvth1nmr25k04hmk2ai1mhq3bo8gdgrtw3g93wrnwzd',
                flowInterfaceName: 'hbgo14l1y85fjdxdn8wt21slhsv368ix4c68a5h562msjmq4z53ubsxovumbwmiaygznhff211ltfvopav9m0p8h7vu4cy4plss52j0fqajlapl6g158qbm7cdffw1l4dh1ocn5gtui98ddhqqlh440wihy109lf',
                flowInterfaceNamespace: 'e3rjszs45d8w8j01or4nq5b78n5l9dkzqybwkqfg6lutd6gxyr0nw1mmbbe36araam0qrx66pzg3yo54eesq0j8pi92gjkxreqhiym151vbgr7mv4wa1jmfybemelyus3m4s7kos8x1u9myp7f8j2b6y14mx7ypb',
                status: 'ERROR',
                detail: 'Molestias ut in laudantium facere rerum soluta quidem eligendi. Est sapiente ab sunt quia velit explicabo rerum. Voluptas maxime similique molestiae. Harum ut incidunt sit consequatur dolores eum nisi. Tempore sint cum consequatur asperiores totam labore ipsum blanditiis culpa.',
                example: '1wkds2419qng2qy7nzyqggvahvdb8c1fty7n8cazfkq1i4cdilg5g96glsolazjeqln39spna7g6hsz5w375fmw8gzjee67sv1aba9hm2ss8p450ijgwj017jfvrrboknql28yrxvkqizyb89tat4lgn3qphbezc',
                startTimeAt: '2020-07-27 23:48:24',
                direction: 'INBOUND',
                errorCategory: 'bizd2p3rmp4s2zws63m7z7gnqelw5dsbwaus57xx3gigotb5cibcmbyzhy1hococez8ke0wpy788hurb6rp4k1a9q9nfh5rdx0rf7u41du3vam8fa2lhf7628dsl54y593qtw73ap7nxwo8asl73jlveyhchkso4',
                errorCode: 't05yr424mut332ltdn98nw8bmttaa162rjjgxkh4ayzave0xd9',
                errorLabel: 999612,
                node: 5206938226,
                protocol: 'pywh5htkyudxpa2yst9x',
                qualityOfService: 'tijmabo2jj296akn71oe',
                receiverParty: 'wefoenm2fppa6ffn3s1oq2oiivu94n9exjbvw4qk18j3mlxu8dfu6xwycscxu3prtdavnr2rsw6yjzif0voebd36gusg075sbczg2l7tcf4st65l56fj8nepf9da0tekugyq5g1qc6pqocfcvz5s81dnf45kazmz',
                receiverComponent: 'h18tpt48p1uo332t2x8vfrdw7surotkix0fjm0tdqpd3w13uncz5blho9yunw3e0xy4r1wia99ixghoa8yq67y6n63sibesq1p9vt6b1c4jegmhi3qcke9hbjs2616ckwjt6jkosk978yaos2z0lpkxjzg63dql7',
                receiverInterface: 'e2fqz1cxz221ec6let6k3044jqxh4wbq0pyo5xojk56ixzddy7m3izxy2i4j1kd98azeic8kbh9jei5vk899kuf8ivpoe6mkd9a5p3o6hkp6tu0bmnlc4c0rn7n2lhtx48hi4gdnw5xzu045avofjq5rbz3h4ivu',
                receiverInterfaceNamespace: 's4emyw3ekc8g3pw79u9m8vsk8mbg1bngqy2ppe1cdbz55ksd9dea7jt2s29t6wjlf1egmbxp1r2lhp4cuquff9synir3to5yxfezvas7rovr0lesz1spywaby2ji24syi7rm4cz9bqpf2855t9moinvhpyd0fulf',
                retries: 3682269917,
                size: 8365491776,
                timesFailed: 3855304623,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: 'gpxa3jhzj3z60fix34367zenx5tfy4pg78fdknulo1vgpvh70z',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: 'abofykmzzkrgap879bxz',
                scenario: 'nwecfnrj0xyr207fw5mu7pkfjt95l0ahit9fhbnds4ncqkgtazihzvnsiblw',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 05:25:54',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-27 18:08:49',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: 'wo5y751xcsm1bhnon5z5v01viw9wv0fhq0ruc9wl2g0hp6xve3c0bhehact3l7if1injo1esmgrisiguqgk8l0g3y4y62tshsttxpk0njqd911wsulnoemd6vk67oz3cup1j1a9nyog7ez08hk7bv2gnp153x7pz',
                flowComponent: '9oiuqapi050v1r1ad2o79eq8v89csy3lf7kaf9s3s8wqw7gsdqkf5e1x3rp5ijz4aemly2gbpahqlcagd9phjdwgw61830f3mds1gipkmhyigdn9vn7m3wvf6vyyfpxt58w896nfhcuzf50dkckbve5qk9kexiue',
                flowInterfaceName: 'clx7ocy8a62s8e6l7nx065zdyd3dmm0es3kunrzown8zldkwvo6vtufjau0w0zcg33fp3ypdh4gd93uu83s3d0lyhtkmkm8ublguky7apbxmhzc136n4vcdfhfu32ot2ltoqq3ma8ta15jb9ohgli59chrefuk0y',
                flowInterfaceNamespace: '1r5pzhis282u5vzb6zrrc61x7zewg6ljk7uba0kjxk3921vu3zdwk8eaf0a3ixcf22nkgg77hp0jdgsst0n2wf3rdxoa5jbjyb06rq9558m3524ruj4kadqmpromrqayet10zcbewmsv8gtua5aqe6lhuxg6tt86',
                status: 'TO_BE_DELIVERED',
                detail: 'Sapiente alias vel. Voluptatum porro accusamus recusandae. Aut perspiciatis fugit enim. Eum nisi consequatur ut consequatur quam.',
                example: '8dqeamdqs17ov4p2bc7e04k4lnvmac8upbrxmrl5stj12v169p3mdu4qkfwi5fbqhqyxapvbm88os3sex72o9qgtm3h7ql5v0bhtz854b2m4juft4jsb2e9ngwobtui9y00cxmkfg98hhfmzznyaw8xivd0rdk7w',
                startTimeAt: '2020-07-27 12:41:50',
                direction: 'INBOUND',
                errorCategory: 'lvo5c32d1d3gj0r2f21vq0me7mz5p4quykx9m30m6k3nzqnug10z8bd8dqptev9plh6mpws2dkb7p8ryh1s3zqoy2rgzaid1zi4epuip3h3ui6gmz5amqym9fsnu8xmxkv4vafld9qk74yx100vuijb1b6wa3zkz',
                errorCode: 'qrvdte5ackqqfrskbvbaibr90x2j3u6b660g7jqd0grj1ktub5',
                errorLabel: 959501,
                node: 2901903198,
                protocol: 'l6sat0w2qirc2wa9sdnh',
                qualityOfService: 'p0nqc506lawvmtd5m08y',
                receiverParty: 'bkvc0olzen6n2dfaifxwl8fggx4gc353b198mfcewwjxptm9y72zw0bio11h005k8t86nqulrs8hj264u2tjf5qs5r6j8wgo267x0pbx2naxjiaxj41sd525tcqxaa5ywmc3c9h00w5of683hbjrt94edq4pbsyv',
                receiverComponent: '7jzlgsa1asxhgvt0wrm6r91cp8vzb9bkhgauks02mf6wlmnazv9vbi8c9l41wbjag2o0e4j5uozi4ho65x87iphf4ets1dnhepnbexk2ct99hpqef41ogdnpflvr6t78tbz03yk54cquzp8r1h4pbqms0g712rr4',
                receiverInterface: 'niwjrcuu7xzij6l9mr244zicxfb3jext9svrlrwugtd4i5ubn8bhlksd6q7avl8lpz7u9o61vxtvdthyxmco7q2phjystftu09v9eu0hfltr7nauesl06h3g13sudmhjoch3nwthaa1mwshcy3ihfh5m68p1oxyu',
                receiverInterfaceNamespace: '1ywwkzy8dj1vfyv6vvfxb52uobgx6yg2vnobzelkeh0lxyoq0sm7jin7gp2vf4ngnxmryo4h7jp9yi452i4667oo0mo7cujfuqwytv0d4roskbbrzsm7qwzg8njhutnf56fka0rbdlnsjalhommc4nuwgkni8lsh',
                retries: 7585216314,
                size: 5830853717,
                timesFailed: 8141971559,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: 'wk4svo42p60xl0qdvm29vac8fdkpq4ukf1gt5y7ltberzvegxd',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: '0izbfbipefb7a92aclmd',
                scenario: 'iqpsianf7ju7hwxt2lzx4e91sh4un38guloqxgsnq2xiwnkdcmque5bfar7s',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 16:01:07',
                executionMonitoringStartAt: '2020-07-28 05:34:48',
                executionMonitoringEndAt: 'XXXXXXXX',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: 'jdy2hkzhu4ioepgylvl76ihbs0j45ohqyilizsglbsfycw7tzshl316jhoc6mzch23rtvjbol1e16lw9drcq4hictkxcarfsns01xzvr4kxlhxen4s5w16zw1m04w158kw1c8pglofa01xndgwvg93h1ugxgnbn6',
                flowComponent: 'tmtjcautao56zl0c82ezby8zgozqyf4w6k3eycpp9xto786ef40fhxlkorsdvwxgefeqmmzkeanz9d7gdx5gbzhb7qfnh2mhlfikeabl4y3duewxa6b6dprul1sx42tzqpk4l3vxjknmvwiet4iua18po38t9ghb',
                flowInterfaceName: '7363xqpvod05laz5lykv4s8e5ppr1o4pyqexhxfazdkcfv4nz99zjl63vwpmn3a0ftbfw8vosg2rqlzq9s031sot3xvi8ijswtxhcnot1f5t2mqpi92x5y69r2al8jfr1c660nehxrs7ba0qgf0l2yy2hjkp201t',
                flowInterfaceNamespace: 'p0y5v5xliaem125u3jflv54vo9lvnu6pelyd4kjerzmu030pj7dj1uztmbqz0ss2xgixxigq3je1i3cexxr33hpt1jn7k8hmaz114st7i4t7xh0td20y85za28hchr7u99scw36v4trnzqyd8s7cxwh8dje8um0n',
                status: 'TO_BE_DELIVERED',
                detail: 'Ut illo omnis nulla blanditiis ipsa et et. Minima neque doloremque et. Qui in quibusdam aut facilis. Aut dolorem cumque quo consequatur quam expedita officiis quae.',
                example: 'xg82ycws0x3g3kkbkvpca4t76conv5lsuwc0h5ozqbqpq0eaelfuad9vv8gq5qvdnabbfxoe3e1h77l721vs7rjmyr2q7so51rkvezcxpszm86aiqh8gvx8iuulfd0j4eekez967dap97vcqyc96x2oeqsykhn8w',
                startTimeAt: '2020-07-28 10:45:12',
                direction: 'OUTBOUND',
                errorCategory: 'zp0192zxwcw7p7i2frlr071l4fizxpk2c1uj361qppno86006ubhu74e7uyvnvkqmzper859nnys8kyzcgfhofmuhc5ajxg4aaibagntyl6t1qssyh69643m8jazlpalcio54ac4275cbry4eqaw9cg51f9na9xe',
                errorCode: '31fc6ge9u7ghwo0fh76hmjp23roaebasxt1b8ciafdowmgkl4r',
                errorLabel: 534510,
                node: 7729995344,
                protocol: 'juxaq7cw2a5x0u34nvyu',
                qualityOfService: 'vgdljzhv7mrsbbdb1cpe',
                receiverParty: '818mpazke6rlz46dfuhrcpshjd26139axqlfjj4tpdwyxv59dkb65vucnb3c83i78x12bid8ej1e3chlouercmzjocvc3e65qh1ev5mwj8l5lhiqqef70gqyudevnawyrsrxzcn4cqutxeateper4vl1558a2ita',
                receiverComponent: '6ea079mpkbfyvda04gv4urbwktahviqwlr14ig2hsg4anea88vfbrje3nwvbsmsb0r9dezj60uloc3yz1r5rdl6yzbt19fftxrid30izxu672l9u0o4bj9eb0wjxakkt7tkzaezrzoi4fatlyni7rm0qyhz4u1kn',
                receiverInterface: 'iy4ium6gu8lyqk2idbm8clesfkb0pf11gm46t4prw211z2oo61wdenioashq8ynw8cxptch3vg0cq3szl6s1chjo5r0ecij4xlarjqvx5uguit7rwa9xcxf0sa1qrw76oxwbo4tb1hlujbwcj1ufw364nwizb66q',
                receiverInterfaceNamespace: '52v3zf83cvl4jki96lqq74ftay925yfc0jmrkvw7ltx4h9psvlh8mcp10kba0dap3xabuqnlciqik9e64muog8a8qk1v34jit54gngc439dpo2d9sp3wyx137nmmo7vuidnpaxvg5qp04j3tn6tsco1xe9onogdb',
                retries: 2682787807,
                size: 4873796456,
                timesFailed: 9814572165,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailStartTimeAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: '1uvzg5pkh77mvacx3iyufvpspw5irypidz2alvycgrcy779gn3',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: '2u6gy2h0ufjemgkz356v',
                scenario: 'vgvdfp4d1rphw44dakyuby2hdy7folt3aoggixbwocptokgewc5kkjtzu93a',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 06:40:02',
                executionMonitoringStartAt: '2020-07-28 02:16:22',
                executionMonitoringEndAt: '2020-07-28 02:41:03',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: 'gr8ivzo2y3iqbmffx8wkp1xjxs5t84o40xzoqgg4j4elp7q2y5dabq4xirrj84d7lnvfhrsw4zao6t4fjbe2a5ws6aw67or2nmqt3f4kqpz1y37e7ol2pn478qsf8us3wzs6wq0w8674kuh4gj41r2cwt4g7klie',
                flowComponent: '3bjaj1nrvzqfzpv3ra19uyejmngv1jxm7499vgl9vsor8mv97zm6d51wfhnr2gaif4aobndeod47avt5w2x94cfqca12vye9pespyjic1x1e6ivgoxu5gfky0tvk08x00bc3zuwox7otzx0yln5fef4x8sp4vx3p',
                flowInterfaceName: 'xlsemmmaf7e3uhhylh877uwv9t0gh7zqfw2s1xx2ullor3wrnrelh3y5fat98vpldhh1h1hk94qkdeqjl2ptmzyek8wjevegh36qlag05nssygn6izpotw599ngzboaaqi1k0rs6ujcbnlye00zwvmcfwh9ztiio',
                flowInterfaceNamespace: 'j3519lox5ekx3pnptm47a9xkbcukjj28t8jfd0drmoh0cetwgfd9ybyowxvgr04xuj9z44j3oreuj8pn7duizvaah03ht0a46snfa0a7qirhetz72djohluhmnw3reou0veua5a06pau0hka35qqn7tu9zx8gj8c',
                status: 'TO_BE_DELIVERED',
                detail: 'Quisquam sit unde dolores. Maxime et aut est ut. Et sed ad voluptatem est omnis. Voluptatem consequatur officia incidunt sint et est repellendus earum. Vitae tempora consequatur earum enim. Sed et consequuntur.',
                example: '86a6rtk8e4lq2kjbxrwuq7khvui8uxj32js4mp0iprsw1w75ri40bhx9h8zwmxn6o6l0ckeu3qfxhiv06p3yyaqvxf6cg4b12hhquw7ma0z0mu6q45u7l99gubnbfa5pqxj8lln4vam6ix93ugjajmrkfyvfm0qg',
                startTimeAt: 'XXXXXXXX',
                direction: 'INBOUND',
                errorCategory: 'wtbvi5ke5sdpwhb4bfa8anbmguc9nqreh3zi1ll7ozfxbyrrmlo5cdbpghyc0nbol22fjiqv7tbq4daie58hvqqqz2pvlvjuyg6ntg90jp92e66lwtc03ecd83bzpe3y4aurtp7yao61mffpby7t8usnqga9gon4',
                errorCode: 'w0oyw1fiss3da3ssmwtgglqivo53sdiktfpel752dy9xps29tb',
                errorLabel: 461831,
                node: 4578631533,
                protocol: 'irn0gh4rgyup0iv5sjvg',
                qualityOfService: '6326raxxwdv1yedpk9wz',
                receiverParty: 'nxtinfg1plfwmz7fijhtvw2w8vpanh59qbneawzthpl18ku0vvqpo2bwaknzuirmih3uzdpnui5x8y0chcegkqa1yxg8j0u581brisspvl3g5frhmnupo8upfecb9wdg8yawck05zcrj8mh28p00qox20n04hqoj',
                receiverComponent: 'zdtdp4hnjhj7gdhgrjn9yjfllwfl2xi3wm13cw309ws10ee9xzdktjy8uscisu0yd5kw7mwlybylsh55u62nb5jcau3e8li74kgkakd4ykzgmi6lhi9aqv2fbqyjnqayz2fdy0wm6xvxmsloqouyv1aclmar9p1z',
                receiverInterface: 'ujew9brk0iqhqwft0w5xe4oq85fof8wwppty73uxuo04vywysuhu6ozqog8u11b0ei4z766afz1ooaj7bgfibsit77t2mevjwo53gguwg2yg8eir2dl5453rh38u2eg8d5vn4mn8pp2k41fvg6uavp8reav2nb68',
                receiverInterfaceNamespace: 'v9cfijdb73kr51abmnttaps561has9wl1xfrvn5ari82936dj11l6trs02pq3emq5n7k3ruwz3ist8oinzd0di2s6aiq4g6gjaeoe4gm2olkdulti7yulc3ejmafbi48mpstppnw73v3c0c32kj4tah5ttxfj4zf',
                retries: 2234943881,
                size: 6225239085,
                timesFailed: 1049789003,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStartTimeAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: 'c923yrefh7lpnsrxftj6rk961gavr0tr8wanblucg5ymp0mzs5',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: '7k9jpyijtlnqmpijomyx',
                scenario: '3dzhlmmepz46ztymar8baawbt8hffkofhgwtegyh4qai5lz1n79po3zge90q',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 14:58:25',
                executionMonitoringStartAt: '2020-07-27 12:09:55',
                executionMonitoringEndAt: '2020-07-27 14:49:12',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: 'cioaytlrqz3l7q1gyxf07ntdvx9krgupsyplwo5373d6fublliv03i2p7eltckoptpn7rqzbog2z3m6b4jajhkcm4z1vecxkfwprldka042qd5wii6fq90lwmxvnlujjy7kh7k4bdobsjpzknud4wrdndqe4d0tc',
                flowComponent: 'om9xgjxilloxcew9g38obmox4xszvw50nn7oo62wqkrhb2uqx4aokwij9rvjzp1o0ghyay4usmsb0cc87jzpg7i2iw68a95xtfr10n41q2yco6fwy7tbb62flhr332p7w0dphz2bcg4iqloyfx2cgt96femnmog1',
                flowInterfaceName: '1rxwr0fjb5pc5zl3p2g4b27e19og2llxznteor8p8rcxdpjl28szy67w97tc9q4vzke7ba1jpzmz18bvm6zf2as39clf4mew7bawswde6er0fco6j81l2r9vdlb9i5n6v6dxy9ijgue4e8o0toajsbiv7l0od67f',
                flowInterfaceNamespace: 'aqr10rtlb1x9vfx7nbsio9au9clks4pimnpuefan4nuutqtxw7vs0xpi5lfcf7ibm3aotselt90y7fa2v7cdp3mt3may5gt9ska7chyifbquk97re3kimz3lle15k8iedi8d1n1sfpkeo8oq30twda4kbakc43an',
                status: 'DELIVERING',
                detail: 'Vitae ut dolore deleniti excepturi. Aut molestiae et minus ullam. Sunt itaque sunt et consequatur dolor. Reiciendis ut unde fugit mollitia maiores est sequi dolores iure.',
                example: 'yhoh074x66m3m05haa311rzlb70oc6hyr5gkl2tz9lo94qopj4el1dfjzadnj2iacwbm45lida9tm8ruey8t84z8qvwqv3qc0nro10fyf075uor4h5zvxenljhbaicoxx38niekggh561ew0lb5xvrdlaj3qa6er',
                startTimeAt: '2020-07-28 09:45:08',
                direction: 'OUTBOUND',
                errorCategory: 'nllf5u2f5poiyad0argyc8j98wpiavjo4fevgt6ui0rtseq97a06nhmpjku9n1yjoms4wlog7btzwpqfby8tq3ipcktrbnsmi9a6os0jwdbuqrrg2atbg9b3bzmorxbeq5g0rym3j9rp4dks658exiisl6xr9gub',
                errorCode: 'txqhb4x7elv2v67do6ryfh7x5clcjlv04wq38btfpcfpnpip5t',
                errorLabel: 840894,
                node: 6286805100,
                protocol: 'x63sm8wbpa6ugbyizw6u',
                qualityOfService: 'wq0ioge22u54j33nbtdo',
                receiverParty: 'qdib0jv5rflqnm81i4lp2g2r969k7opo2mfx5a2bolxti2u14jkwvtqev0yhvwwus2bn88tbgjfbj51k64gh9gvbeh8lklwzi9n679dk2o7xcssreoqah6pqeeujvn08559dx3qs0h5gricg37utll8h2zcgsrrx',
                receiverComponent: 'vhfa3tgu8u6ngmvvub9fecgofbptdbp9stn2bolby1o7ngsjh6yp2o3r56hzte12e7dx0fuo1yp0ywlmli760dd436k24k57pwbo25k9xfk2x04nqbuayb00c0otwglij7r1c2vg2t2i7ojy1gx1jlkb91xeduax',
                receiverInterface: 'lzlhygfs6hqzgldng62oiqj0ty7sc4pgwqeclf7zsw7zd5bc3d3rt4xaagnnppbswvugksl7heoayy5k3y346tq1y53l6fb19afr5ahh7ujb4nmeciqqri3ux5ds8pji2a3uerdnzwy5hnnwuqbcabf0epmrq8er',
                receiverInterfaceNamespace: '1dox079vx0aummcpcp4pmhhjrd81kmppj73shsmcu19uis0hq5bymenjrs1y74g5ntcxx8k9gno11q5sqncvf514bnlicm0a3fgmktfupox65w3ctw7qaq3pac0zwbjml52qxbmyisjolwu8hf7mb0zkpiygiz1s',
                retries: 9197255267,
                size: 9349685092,
                timesFailed: 5399283560,
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/messages-detail/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/messages-detail/paginate')
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

    test(`/REST:GET bplus-it-sappi/message-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-detail')
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

    test(`/REST:GET bplus-it-sappi/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'f1bab725-d0cc-4461-869b-ca3886b9abf8'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'f1bab725-d0cc-4461-869b-ca3886b9abf8'));
    });

    test(`/REST:GET bplus-it-sappi/message-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-detail/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/message-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-detail/f1bab725-d0cc-4461-869b-ca3886b9abf8')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f1bab725-d0cc-4461-869b-ca3886b9abf8'));
    });

    test(`/REST:GET bplus-it-sappi/messages-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/messages-detail')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/message-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: 'd719e11b-218d-403f-b8f0-d28af423082b',
                tenantId: '3ca57f60-9bdf-47cc-a93a-ba96a2ee2012',
                tenantCode: 'mu9oi8jnk1025j0wwuup9ezgm216eh72775bap0p0ttlk7b2gt',
                systemId: 'f9c1ff82-12b3-4276-87f2-7ccf77028331',
                systemName: 'te202yl871axrifrdq3p',
                scenario: 'mo4qrv7prwrugydwsk1fbil3qvptosu645q21lux55qz6rqmha9amrddou9b',
                executionId: 'c566513f-427e-481c-8283-b64fd76e6258',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 04:30:23',
                executionMonitoringStartAt: '2020-07-27 22:13:30',
                executionMonitoringEndAt: '2020-07-27 12:17:28',
                flowId: 'dca97d9f-856a-450e-bf1c-b4f525a4f606',
                flowParty: '5muzftbzq545yjm85grf6unh5vxhn6ca633b26zvh0b1log6cdgytr1ssj6intkk17ub0j2v2pisflikik0myiw1fz037osdsastzq4hna5f9snqar7kto2zrrdfv1whm45pj60kb5ipr18lb2ksfc7jbb4fw3pm',
                flowComponent: 'o32ml1pvi5j9cgv3h2tbfbqy5glrpuy5d5pt5ddhv21hzrxn87irwetynan3liphtiv60jxgfkggq6zqg6qxfai2tpnrko9sz11kf0e1depnafifxby792712p9jy2d4d7um7j4ozublnao498mnlnkigscopnnk',
                flowInterfaceName: '5nlmzxwoqyowcyxyiq7cf1hivzbonh1084ax6381xjill18iwna2c0s8muvpncsjtmg2ztcmpb1225pauo7skqdrymvgp492lxv7yo70mlxtmwa47hg8f7leyr8pt4ur95304ukktln6cml0lf7v89r4jellnztc',
                flowInterfaceNamespace: 'drxwvpojv92pxqvg4kzxc6uu3y3ux2tchiumd032mpugoci1n77sjpsbqja7lv9u4lr2dz7n1154qdrxtc90djd8t92ax9qr1nnsxij51ndw3939czqk882r0kx54ninhj33ewo70adb4w1hqnejvl4zdt52y5xy',
                status: 'WAITING',
                detail: 'Odit temporibus consequatur ab dignissimos. Sed eius quis quam odio libero voluptatibus dolore. Quaerat non nulla. Autem quas quasi omnis incidunt ab inventore. Consequatur hic dignissimos veniam.',
                example: 'r4nev62iw3jkssucoswwpczdpsjayu7gq8ozojd1pvsem54wnjlkfjba2ytyaetnn97986ii1ucue08usgqfh2grarwow51oeb8n7ap4jqthv7lresya777zalbqj5tx4x29wld1ybm7ffeogslrolkufuaijhy5',
                startTimeAt: '2020-07-28 05:37:07',
                direction: 'INBOUND',
                errorCategory: '48ccx0yvdd5i8hf1zcb3hx452maw25ustcu6azpqx3oeiwted7fo6k0pukdb9nbv3ddekm0f1ywdfluwgozpi8otr6cts3xg8z9irglqhmv9dialuislo1tutx4fg1kwprenh2ifj8osvfh9ssnfehjkhclf87pc',
                errorCode: '4ff9on8sfyus8bhlhjc6m8jabji61a930n503ccr0m1ykfbgik',
                errorLabel: 864513,
                node: 3929479229,
                protocol: 'ydcdiam3a27gkr7c8643',
                qualityOfService: 'q4vx8vl8frksp6t3zysh',
                receiverParty: 'c0w17h4gcbpof1ewjc3hayol81dhlhypxm8qw4bbcpre2dt8kaoy3nqiodaie13fm9w5l613qjx7syoiw1ndaz3berflgl3um7tz6ylaeh9dwlu07u9xbm7a84jidhw8kjh71w6eoieav3707rf4569b9uynhfmp',
                receiverComponent: 'hiiuc5hai7jmjewfjjxe9xj9ayjk9jqv5y90s76e5ujpvno4wlq65reksrxr2goirbukxn5px4mfc4lcyn1m9knmul05hobtnrugk3dgvcygtitovq84doqa4marqtbqxi5g2ellgodi2qfddmj7rw9sh6my6tay',
                receiverInterface: 'yi8p38g8nt72mq5d3649stlv9bv7ot7eghkaac9w3gnaq9kyuvsuffgv5rjpbx9vizpu377c3jp8i7bgnwfpzxhkaetzj25e6fw26lmgz2raohr1k12zcj4rap3skywi49xvh3ngngrsoda19a8ipp6okjk05s39',
                receiverInterfaceNamespace: '6z6wt4vn5cvsujxo09bgm2vpvkdl4rxzh28377a8th5bfi8g11jdg8o7sbpfvdj5do2vm6795rmyj14718zvjj2guj8am5ku5205xmsxng0aay2y5d2ykno6ix12omt56v34p38vu462whze87bzso9toa18gtw0',
                retries: 7065694613,
                size: 8777588752,
                timesFailed: 7430782557,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                tenantCode: 'xxexs3x6ok3j0lcwr9kfxaqsgr8vjul5fmesr4tdvafzg57ihu',
                systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                systemName: 'izldyk11hhdjeq6det0u',
                scenario: 'xmv2jwhcaq1rb40z240yvf9eavbpmj1ecjab4ehdxhe0ggplmty9ol79w6ob',
                executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 13:39:56',
                executionMonitoringStartAt: '2020-07-27 21:00:16',
                executionMonitoringEndAt: '2020-07-28 06:09:33',
                flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                flowParty: 'nn1mmqbo7ax8o3q3r5x6ca18516wky2eshros9ig7on4xmedz89q630sp1kre9kd5wqgqnvnduwu5ffk0qtnk9e8og19ubnp9o3l27ff9xd506c9agyk73pi7h9c7zufq7ltnfdrcg99yl8lqw608d7axeg4b878',
                flowComponent: '1caux98jqz0g208331mhlvha6shrwf8ymhhslpp36b8pnd8fp3yod2wv2x5q26xe6ob5d2urigfs28e0frfg76qswmtk5oxs3m7ansnqxmscbtclnm4hzm5rfk3lyq494xjcr31urf2u3wc7v0lik1pko4bds9io',
                flowInterfaceName: '80lbinmvww6aopjgnf0st0c0i1imd67lcgsginarfyk3cpqgq1vipfaxrd23qsqqp6xp3ga8vk9zkn95myewwgnmg2qhhgv0hxvfvf942j276chmdt85rv83c18f3tu5kzc2umddpf1f86irwwx6w9f0ohpcym46',
                flowInterfaceNamespace: 'et7wt6lzpy6664oj2ugqiqnqjb9ausibcgm3uy8kpyu8b6y20jjz2kx4pttorfh8yhu2gz0ficlzfnf5y83femontcxn789arqzn9r9t3v4rqmfjpemfg4hk9a9dpf0ljuw61ig2w3r05mtn1pwykk4z52quu1ra',
                status: 'SUCCESS',
                detail: 'Consequuntur iste est sed illo voluptas aut vitae. At delectus commodi. Consequatur ea qui eligendi aperiam quam distinctio repudiandae adipisci ad. Harum laboriosam vero et voluptas maxime eligendi autem provident quod.',
                example: 'uy7ccg7av3zxoihnwo5sviov968qihae23ufbcfqeqvw5p9xnf1f58vb11ch440gaaeu1i4aw3itzcu7fiebpu02fhzqch6jkqciisl7oh6iosfi5uanr3tv9vmeihzzemd9pvd5ng7nngjb91h78dwjpjjkl6wa',
                startTimeAt: '2020-07-28 00:51:45',
                direction: 'INBOUND',
                errorCategory: 'rqvjr5pn55gqvn8lmqcsdnv8h5vorhvo662dnyfn9oxsiiep7n5f0x8ffopixm5z6ecdfbxueb7oa47lcpxdx7z60f4j3ojiammopui5g3uh8q3pqkhy67k13ych23cr7ans3hrapb3wp059mi4r4wq5by6gv52y',
                errorCode: 'vohktqjq6kblx42h1lv7ckxt61khn38wy5wsb6q20e66oobxeb',
                errorLabel: 495453,
                node: 8524607554,
                protocol: 'aptqcn9jaox5wyk7uttz',
                qualityOfService: 'ka9kg70efzgaefk5elns',
                receiverParty: 'qmpip1lfipie6vzq22bri9r84bkio8cfutjngyy4mv1ddbckyj4f3e89afv4bex3cb84caq1imy2c8ysxevpcy8ezsep44ujp3e8syg5qgoy20xp1877k6kh5mn2w6gw9isnq194cosb6mx9sk6zxohklfb9jv5o',
                receiverComponent: 'bp8q9j5dyehghi33x3nxpsswfan55240dn4pxt669qn9nk0j6rcxk10jo8kpgxz1uqsadujsry2xi1m0fqnlyyz03dwlwg8s44l65cujg53e208ppqe0gcokjarybzchyuzx0ts7n7hyya2qd6zla5y6xrlok4pn',
                receiverInterface: 'u3khjxgj4kyazol4hu56qlsrqmunzegw3t32n5figljeabvdxxpfqzrnjasw14xeglukjbsq6mcbrggyi8fk7arizpij6wja19261d8detijp0cl99rv7n6jx49aeznhn59utyizsob5oa6p1k1atyst7qjdsvru',
                receiverInterfaceNamespace: 'nubtk30yaqfnadcrbtqjpcf8s7tth4876sqnue41wo8vmte7mfmnp4gvpw38np69tflosoxpm983d332xbts3tpsjqtpnz3oxkd7f3xacqemwqczxdrr1sm5hteryay5l1lmuilvj8oexx1ikop0nw81hvq0cta3',
                retries: 6716529866,
                size: 8049782706,
                timesFailed: 6175190300,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f1bab725-d0cc-4461-869b-ca3886b9abf8'));
    });

    test(`/REST:DELETE bplus-it-sappi/message-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-detail/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/message-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-detail/f1bab725-d0cc-4461-869b-ca3886b9abf8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateMessageDetail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateMessageDetailInput!)
                    {
                        bplusItSappiCreateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
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

    test(`/GraphQL bplusItSappiCreateMessageDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateMessageDetailInput!)
                    {
                        bplusItSappiCreateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '940d391b-b819-4173-89d4-45e50b5139e0',
                        tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                        tenantCode: 'tco89dznxt247swjc4lxr7r2kuzj9ujh3v86jrbsoy7nw0h6pk',
                        systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                        systemName: '51ftum0h54nakqd79r7m',
                        scenario: 'fnpwj0hegm6s0472b1qu43nhfo1i112zg4z1cohq8za3y0q9iwxm9pi2zy04',
                        executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-27 15:35:56',
                        executionMonitoringStartAt: '2020-07-27 20:57:08',
                        executionMonitoringEndAt: '2020-07-27 21:50:26',
                        flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                        flowParty: 'ch8nfzdt1x7m5k4942bn5lthg9anqew19gqxsavhqepe9rv6rs2k9dwzbjguxz40s8ie2out28ghb5g8qcbldn4glr8n8a8cpw38v9af4psmuxzyb6ty2uftjl4j6w87fnrz8d4xqaq3jnockkpzy4ecspc3h01k',
                        flowComponent: '2ien95m5y788xia6brb73dn7ot37ka6jcgqctl0138h4u1bf574ym8iddbbl0ay4gmbij6jqhollgzvbklmap0hovjxs1c80oeyaztpgjlhrchb2fdaxdvyrakpv85w30pl5x649ef9fqudztu481hkdf1spva0v',
                        flowInterfaceName: 'pm4as3mtw3sbwnos43r8pipe6ov87ritym0a3shzlokxonkrdghn7iiux71g4i1shuwzvfr05mjuf7gy2pibn3ymlng6ia7dt8cejzp57odrdjjdegtq1fttlkvjm73cu11f0ud91owz2bnp59l8w66oiu1xmuh9',
                        flowInterfaceNamespace: '6boa8bl9ui46t446twvnudgyhgs6y6hpe5wp1n0uv5nq7np6voiye5tblfllwhvm8pizq0eqt0xn99509ctq81k71p2kchnmxkldrjrftjmm1ziaf6hpgylg9jbv1x451udc8zvl7vu52ubliutxv03jrix9swhd',
                        status: 'WAITING',
                        detail: 'Quam et maxime ut. Nostrum ut et in dignissimos. Aliquid placeat blanditiis temporibus dolores modi ab ad.',
                        example: 'j0j7ru5cq1eggktj41bhk2vg98tjvjtmtkkg3i6kae9xoc5oevubens7hxi5qonx6ddjvyidfednviqd038bypo4ee2z0iz2mzyp1l44i5h1m9lfxv427yhd8qwfwjmgqcn0iq0pjmz8c5gmlru924lcz0yyth0s',
                        startTimeAt: '2020-07-27 15:38:01',
                        direction: 'OUTBOUND',
                        errorCategory: '1dxc0a3b2osg4lc3j3cn8adcbb086od5gtbi30zl4sc50suluhbw62plkhpw04qrbkwqpqd74tdzfbpo2fwxkf35n5tpf4vfw6s9lheuf16mw494jraeadjimajn9um7fjns2ywb2pwtqebzzzldvdn993uczjiu',
                        errorCode: '1tvuljpd5e5mi3ed2p5u7q1fou5zwgjfbmzioh0shj97ld5olx',
                        errorLabel: 743797,
                        node: 9816179095,
                        protocol: 'u9auvutmaiosa60l4rjk',
                        qualityOfService: '8uweke55b24y1wg4yinl',
                        receiverParty: '7xlvrqrxbuin6xj1s2l49fcvoy415ugtxd8os8ddceheajtyr37ixbde13fixwplk97jxp94hvqk1p49tkhoos52rnfhyr2ja85wkoi2mm2lrmpfyz90nwtv4edl37hkzjmvcut1uzwfz7axreyopfaaimwr35jx',
                        receiverComponent: '8i4xwz2oa0hww0r1u3v8s6b7z4gnsqkv8oqjdmtw5vozq6djwu71qkseuj6x8ma7s599cb7jpz0mup2c5by3jz8zuf60k3ixosqdeze4u97jpxmqu13gjg41d5sm5xk7krd350tr4mqctc1pekw18rahoa9e9fzr',
                        receiverInterface: '4zwy5wwgljc6pfdcltys5aemnd3t36vrbna4omwu59cya0wbobsywv08g20nup049h7uerj6tbicqrbs8gjh4fb28jabo3w3zbngouyjzzk3bxnoy27apop7h12hu8gf0hthe0wg9kty7nvxen31zaqnn29s1rkq',
                        receiverInterfaceNamespace: '7o3a1g5of94zzbjmbjabdtu6qfm1y4j0q2pa99tfu9k18ntmvtrd6rk1qw11lay46m1hom3x7x784us36ecrx8bp1ywvnd2c9oswowf0c4akk2q6uckqz76r3x3djzjwlruue97541b7izuexvdlnq3wa4thcw7u',
                        retries: 9279612999,
                        size: 6963456928,
                        timesFailed: 7913003769,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateMessageDetail).toHaveProperty('id', '940d391b-b819-4173-89d4-45e50b5139e0');
            });
    });

    test(`/GraphQL bplusItSappiPaginateMessagesDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateMessagesDetail (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateMessagesDetail.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateMessagesDetail.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateMessagesDetail.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindMessageDetail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindMessageDetail (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
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

    test(`/GraphQL bplusItSappiFindMessageDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindMessageDetail (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
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
                            value   : 'f1bab725-d0cc-4461-869b-ca3886b9abf8'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageDetail.id).toStrictEqual('f1bab725-d0cc-4461-869b-ca3886b9abf8');
            });
    });

    test(`/GraphQL bplusItSappiFindMessageDetailById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindMessageDetailById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
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

    test(`/GraphQL bplusItSappiFindMessageDetailById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindMessageDetailById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageDetailById.id).toStrictEqual('f1bab725-d0cc-4461-869b-ca3886b9abf8');
            });
    });

    test(`/GraphQL bplusItSappiGetMessagesDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetMessagesDetail (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetMessagesDetail.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateMessageDetail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateMessageDetailInput!)
                    {
                        bplusItSappiUpdateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '6df43526-beaf-4070-a36b-5a11f084cecc',
                        tenantId: '9abb2908-f5df-4c4e-8f80-07fe1c2270f3',
                        tenantCode: 'k0z43jbei952kentyau1yyjf5jhg2ahnajrqzw2f209hj2j8pu',
                        systemId: 'fbcefae0-edf1-42b5-afb7-e0b62ee7fe48',
                        systemName: '1pedpkz8orcelhrx3yva',
                        scenario: 'zp1gfripz4027hggoxzvyvqpgl7mh2gk4gr23h7yegoi64wvag8v41wlbe6h',
                        executionId: 'be90ea63-0836-4c2a-b7da-22c1eab2deb7',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-27 14:43:45',
                        executionMonitoringStartAt: '2020-07-27 15:52:00',
                        executionMonitoringEndAt: '2020-07-27 18:04:04',
                        flowId: '6a93311c-ead8-45a2-9375-06b8ffb9a9e0',
                        flowParty: '04tfs6cdnzns0emvgk867gau73x2v0sedfc9182vknz8f0snbzfxdvzfkvu3mqfyxt28tb4bbhf27d2bid7xdvws0tasypvxtnt30rrdz7h8cnv0vrdo6n9jyyeyl3jhu1o96lnhpoxavqynlxeihj4i0c1nmyqc',
                        flowComponent: '6q3m759wyyjbnkeho75bpsq9dwpraoawlu3rnmmup8bi8xtw9ycfx6pj66m8aywpzc9c1kh0f2ui6z3w00yd2zthtxksmkpak1ula61nt856k9y0w886g23jlsy134stjphwxwz8abljrqgv0hbwklz9ipojhq4y',
                        flowInterfaceName: 'e91cqfy2tzvl3zufr5dms7lt3o50ayhs5cdjcar0inoojzgkvfpzdou1nj8yhhppqet4bg9i3c6oyldjrf3ebco4xgkjjfapc3vkeiw8r773eq9ugbkwy2rrrmtjy6y0b4ozyqwyfqukdg1vcnwlz79i74w0fno9',
                        flowInterfaceNamespace: 'gj6uvqi4gz10id8sjwlo2xs38t7mc8pslm3khb1wr9vq1ae0o9xw8v4wjn7rxjwbqgqhay7v511ptv46ctnylf4q4gp93ui8gerby97cliz917272u4nuacwy15051ugyh6tmwoq7iem2fzecbz75i21rfzu2x8u',
                        status: 'TO_BE_DELIVERED',
                        detail: 'Iste eveniet molestiae ea dolores dolore quas est est. Aut adipisci deserunt tenetur ut provident. Non aliquid possimus dicta laudantium. Qui cupiditate harum saepe ducimus consequatur. Repudiandae tempore nobis ea et qui sit quis occaecati.',
                        example: 'se39p13em0wlpvbgciczap9lr5n95vhwyx2vf80scamn3ytfsiq0mbqms1z1u93f0102905t2i1l7plmrpc5p8p3dt9kuc00huzyvz4koyyaj5ebud75yzng4ma2c3ssyga7sn6n5gfat4z4jcs7jk6csnhqng00',
                        startTimeAt: '2020-07-28 01:24:44',
                        direction: 'INBOUND',
                        errorCategory: '03legxgudodlb4bwalxwzbemnoaag84sgelrv97mf8vpwvo8xbnfxgesink7auk8w2s4hv5lhoj845e88t0gsbfkodip07yyoiw5dh864teyekqmwwtd6ap87k9czhyk97028gbp41lh7pwrn7fs4s1777r3ugbc',
                        errorCode: 'ect7fiemmmnzqimshqdjq95g6ww35pzcdi34ha38f4audt5a3q',
                        errorLabel: 281038,
                        node: 6942545583,
                        protocol: 'itsa6wtzzxzer3uak4ol',
                        qualityOfService: 'shci6gi9x8cd89swdg2s',
                        receiverParty: '0emjedparya7uokqbr1ru1wwy1rsg76rqhea5mokn85e0rio2s0qahynmojgbhu3smaaqvpsys2x2g41p1q3hk40faw7jctpqh6dbfd71qrl19v98b9lgbuzgfq22olsz5lrv0osz605yuif2pporqpu5f8qtr6b',
                        receiverComponent: 'oi1clcnadxz1dudki5cyrcvbpmp4ho5olfd0l2togwvxu2tc01spzqkkg72oc3tgpsq2s3nijs1qsk96zjp3bopb95g16zugoepvp3r6x6yv0cy574z66wrp4kwhz9n94iclk6cdvuavzhcib2bvscpnm3ymogjz',
                        receiverInterface: '2gt5ugk05961ibk0f82zu7dhta41d4ama8yaj4f099mzzcrndkl858bniw198vg619yhlllm50lc7qzmumlspu3e5trtmr3lmtvtr6f2b672qbagf1cixyvjog11gdp6s6hiq3g54a6t1ty9lc1vi8r4m6g4xyce',
                        receiverInterfaceNamespace: 'j1hrn3asd289kik6jfftlqd3t6ohuolm2fewkx2zk738x4couskj72tgt53aaluc6xyqn9zcidrzu3ubxutafvx8zlsict5jeaaubtw4p86bwk61s52sm2jawvxblfvyov47mnqh5kx8jktf6zzxrtovr7u69uhv',
                        retries: 4570256233,
                        size: 2461991554,
                        timesFailed: 3096704746,
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

    test(`/GraphQL bplusItSappiUpdateMessageDetail`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateMessageDetailInput!)
                    {
                        bplusItSappiUpdateMessageDetail (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8',
                        tenantId: '679670c0-574b-4c85-978a-7c0014391c3c',
                        tenantCode: 'qi1gswnz0ufsg1k56shxinhnvmos7uhv4dg47lpomxx63f5z04',
                        systemId: 'f16d4666-1cc1-4439-9f7c-5c524bd1c7fe',
                        systemName: '37fa8psmgfao5eqewojz',
                        scenario: 'zrnzdaretov13dl3kntlu77w2dvg4k1hs5xjzyfk2gr3q4lkrron3tjs3t0v',
                        executionId: 'dbd87f91-c738-41bc-a0ae-e6dde6d774cb',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-27 22:01:52',
                        executionMonitoringStartAt: '2020-07-27 22:51:55',
                        executionMonitoringEndAt: '2020-07-27 12:37:55',
                        flowId: 'ee8bea4b-821c-4791-8cc8-c239cc03b91c',
                        flowParty: 'y29xzn57xr108dyudhta046tw3tr2t8ry0gjjty9rrbv3v2pxdvw6pz32u4rt79ktqmdr7cf35vqhl1m2j6b61juilueir7gp8kmlhjgyg850gjp5r7zfrv34rh09ereii4lvat2fa81dghb58dh2bdr72iriso7',
                        flowComponent: '0oby63cui9mh4vrw53oy6cfmfddkcuzio662vjtdpr4l792t7wgt7r15k71m8wm1t53qdkwdjxfucju1i5urtew1mosniuy2vbafkq2jx7oydk479uhdpl3s7b648ij3cjbeladd12t58b7au7i5ro08kln0ltge',
                        flowInterfaceName: 'scpti5qnxabr9jziw6hkv8m1qaqs0lt79mjhcvsnm3x3ttei5emlxs8xztn8zyrhoqg3pxvgyrcrc6f0dhmor9nq2phwlh8b1hp91w9x28d6taao5f78cxtvofqtcjcb9oyz65tjryad01nav8tws4791v6l2szb',
                        flowInterfaceNamespace: 'l5l5gbebjggfh5xsx85x2pvply4kvpcfmqo486qe1fl4txaz68av3tds7lzut080vuzsc0hmxo991sqaiorlfqe9xk8kvg6vbvikaalqha5jsnxb5vs3avr1cv6kc2e4tde2cigutbrgmngwbfiloxt1qujpu1tn',
                        status: 'HOLDING',
                        detail: 'Excepturi ipsum illum excepturi quidem commodi magni. Commodi consectetur dolorem voluptatem. Repudiandae quis dicta consequatur omnis ullam numquam molestiae inventore qui. Facilis esse adipisci similique voluptatem quae dicta. Molestiae necessitatibus at cupiditate. Totam autem pariatur ipsam ipsum consequuntur nam iste.',
                        example: 'qw2sj37gsh9zkjpe785rva448cwpuxhukxw0yiou7x51y19gj5qiid3wiiu21jtwnq3i9j62g0hcqtlzfdrrmj0b2cayj9rt0kvth2opib9fddjjvd3fynwne14lba1uon49idba133kw9vp2fb6lnstus1e8sl8',
                        startTimeAt: '2020-07-27 21:43:42',
                        direction: 'OUTBOUND',
                        errorCategory: 'vds7ww6hc4u902h0obu7f5id5ru828cly4a88goyl41a2bixpzbpzgbe300ud1mvdzd63lujubkwe5ggzbgjac4n89atr4fmvcq2589sh092shawx7cia4updwtfhe6gip3qyr64qt39enqjuu883mbc4sqfythc',
                        errorCode: 'h44xsb85eyca0x4df1p846krhgko9hgadrcm47it71hyjaa4zc',
                        errorLabel: 379772,
                        node: 9422073966,
                        protocol: 'w526yr3fznceu8wg63kz',
                        qualityOfService: 'xx737cl0257e1l2qudqx',
                        receiverParty: 'ayspns2rmqwux18bjairmgd2u9i0k5oh241iurtb9udiaqxvc0hhdcnwipdhipqprm5naeyqe65us7edaefy0bpfh6u1qbzodlyix66lei7j0atmotrwlc5hvjut244r14f9brhygoufzs25c4la2m1gnyq5gwji',
                        receiverComponent: 'slfh3lvr1b4mykjbaswsx3lmouae5oepsi155m2b77gn6oik4y75wwd5iwskud2cf08kofij6wqygpg7sc0k6jo1gqgu6yx5uf01xrd3f0c9md5py9irmckn0tv04e6pda8xrz49a3tlo4eglrkbdi784pbnnur8',
                        receiverInterface: 'lf766vi6ubqdxm3bfkln2qsowgxx1ri10d3lpg6wxp1hjx3r462iohk9hf7y6e7poq4p0ogkd7yuzmfblebjvjzavzeue6f6igprr6wabc686vm806uob0nav6iv0tjkdd4vczknzkdsgznngu1ag8r4axkhecyt',
                        receiverInterfaceNamespace: 'wtj2n4h9k03vnb5d11lvsqka1qiq0ltm5yu5240i7bfvww0l174lzhbnqrol1clxdxrlr9d2uf4juvwytljez9crqi7xj482keiiux7sezqu2eilpq6n0lo7lnvh25tndh03eixobovzubtn0zkltn6l50i7p22g',
                        retries: 9773264664,
                        size: 3445413224,
                        timesFailed: 2545199792,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateMessageDetail.id).toStrictEqual('f1bab725-d0cc-4461-869b-ca3886b9abf8');
            });
    });

    test(`/GraphQL bplusItSappiDeleteMessageDetailById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteMessageDetailById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
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

    test(`/GraphQL bplusItSappiDeleteMessageDetailById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteMessageDetailById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            scenario
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            status
                            detail
                            example
                            startTimeAt
                            direction
                            errorCategory
                            errorCode
                            errorLabel
                            node
                            protocol
                            qualityOfService
                            receiverParty
                            receiverComponent
                            receiverInterface
                            receiverInterfaceNamespace
                            retries
                            size
                            timesFailed
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f1bab725-d0cc-4461-869b-ca3886b9abf8'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteMessageDetailById.id).toStrictEqual('f1bab725-d0cc-4461-869b-ca3886b9abf8');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});