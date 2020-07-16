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

describe('message-detail', () => 
{
    let app: INestApplication;
    let repository: MockMessageDetailRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
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

    it(`/REST:POST bplus-it-sappi/message-detail - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: '50ez0ashkiqw9gx4fg6v',
                scenario: 'chw46q3wdbt37i55oeq4e4gj8xstnocd73ja3currzal83afvm7cnbeit352',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 18:06:48',
                executionMonitoringStartAt: '2020-07-16 08:46:23',
                executionMonitoringEndAt: '2020-07-16 03:00:11',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: 'zv0k14gnc81md55ow7qyu6bv0mmz6v35qkp2ksfs0tj4vuhu9mk4cdgugz65qv1lqfpj7gsl8kyhg56nerjaul4jg00eybwkqfsi1muzjyx1y3rswwj9lzjsxg72ufl0epbtfd0tliy3md1txdwt82a5la177yl1',
                flowComponent: 'lb0k6pt8e54fgzrrg187fwepsctj58lgig5ka1nm6acm2u022jab06u5oe7hds38shwxto8x35glcorp25xrhur54dk4qc0ruozaxon2yxjnbpxdr75azq7zv6x5ntuejn7ont2m9ylve9e2hjfkavzhnmi0r5po',
                flowInterfaceName: 'qjt061qdrfgaul0yfrnffvzcfvfp5bmis353nf4rqy2qgzpgy52i93bowahp7i1bz0rq3yfwhvtg46gi3vyf41o9geoa1kdhdtg9qijwi69xhj24x1vs31078wcxe7wruixb4drwf05zcym8sfk9n7yb9yucrn02',
                flowInterfaceNamespace: 'jzxvfdrps0pjcb81csw3wzkmdzdtwh3cmmr20xsnj4o0p92szxs8syage12syhy62ed1m0xisvbdz7ds32vuhnthqwg7eyi5kp2trw654zfkfbj3h1yd24ikzo650fviavhhsa978ivb1fi8ld7ssqybefcqq96l',
                status: 'DELIVERING',
                detail: 'Et unde eos rerum rerum. Deserunt et culpa ea voluptate harum illum blanditiis sint. Quidem quam veritatis eveniet nemo sit. Accusantium placeat eos necessitatibus delectus facilis. Sit unde autem omnis adipisci ipsam ad quia qui impedit. Explicabo deleniti est dignissimos nulla itaque dolorem et enim.',
                example: 'kq3r4km32pd3qrb08xlw6yctzsc9hbimmnxfxucpvdzdoqqb2pmsj5x3w3bwpjii3jncs9ola10z04ipc7uf1nsllh34bvv9wbows5vneidw8o5iewyor2ls4cjiauwpr2ddg2zrz09mqz8hc5ci3181skt76lry',
                startTimeAt: '2020-07-16 07:19:41',
                direction: 'k43oalfmsohf2s1ij0l7',
                errorCategory: 'gu5shfdsjj2ccelfx2uk2esv6i7xynj113k4o50rk37n7i0k4n5h7dmbiq2vrpmgyte2u8gd3z7wdi9l3vchsqby6e19k4tucdm8puwift6bljb0rd1xix4o75c2t2rtwoiqksz1qqmkzb91imgjw2f0rn9vqm8c',
                errorCode: 'prpjpxgjwc6mo8qki0lw',
                errorLabel: 'hlkvw92qx1g4u32cukmtkwijy8rhf9gt2x45gctc27ah532144izoel9pcotyh6enq3e07a0v487x0e74l2fcspia4ejv9kh9kly84ymqn76407qq9qsc4gbmngqsnj3jbbzmzmodqqr7we3fjqgd3odozmnr5jk',
                node: 5452677648,
                protocol: 'peyzy70gb64wkzzx58xj',
                qualityOfService: '0iz6xsa43fgkdmb8n5bf',
                receiverParty: '84i01yo9t3nvme6tiocpiz7diyebh6h4qy6jt74of3o6pzj248iyn192a76wzyd5yexedqufgrcrnlxtimwk96i9vdaq0ph520drnddywk1jms1jo2owve32qn09y9qle2cxuenwusllz7i9rpca6fzi0956nx2h',
                receiverComponent: 'bcqciegop34b53ikalvzpm4b0jjzdae8f3kx0n6wc83xvaxz1zko5k02i2b9r0a68ns64es7h47tfe63ofn4zmf0w5ebspqca72bdip7pqe06ci5p8pwbfzoztbfmcnfnw78u7qgngu4skrghtrxyxnbvdu1i1q8',
                receiverInterface: '30pj9kq0fur9bqfkmii79wjb70cm9zr29j9ggyx8a0smnzrh4k5h7bdl3vmgzr74xtjie7v1iltqe72pnnysw2j9m28r4sivvduh22exs4sjybho67dmicna11zs47wccqrxcscoh3ehtw2pfyolexrs2ilbem8z',
                receiverInterfaceNamespace: '6wsaybt6zrtwg9a3j4daj2lpjezk56eu292neu5ltlmuntlh53trh3v8fgqb6votucibwqx0r470n6mabyutnn1e3u51wanp3b5544b8l6knzr8her1crnvj6jrqz5thjp8gqnk3bmue1tmbz84ftztvxnq1zf79',
                retries: 5413663806,
                size: 3366475733,
                timesFailed: 5042425117,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: '4jhypfphrp8qx53c6dgc',
                scenario: 'mzv131pmfonw8kzjrsbpvcdjz13xvz8qvya2cvi8f104danms89ojfgy0eds',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 12:15:29',
                executionMonitoringStartAt: '2020-07-16 13:49:38',
                executionMonitoringEndAt: '2020-07-16 01:05:11',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: '0a09skrsjch8cfhaz63m6hijkqnyhv49uw26wpvkhjuscozbeb6lhdfb24j587e8z767fm65ui1aci2fjvbd3ks8h5gqvju7bue43q5p98y3xxnxz9dxud12ft5m7yurd5u3vx88ryj86fwwe35r8i2ripnlgyg3',
                flowComponent: 'z8m7xzqiyotd4hcyptdb5iccyqkhdkx12qrqvbs2k91ptaq6l5tym121b1ksxlz2160rzuhjnat5kxl4d2ysgfvrrjbo4j9eu4njagop4zw2s30mmu1s67k6fuq9ktanpwdyxave0lgnqs7hz2qwagwvhrhinh48',
                flowInterfaceName: 'x7r07s8t3j05oza3upo9l6w9hwiozs7wbs4huk1ep1gl6qg6zo0mnes3nd2krm24sroz8k08hyv3kb3xp3qfzupu1bvnrzbzdlsi5p1ptgem2poyetsuuewasqqjkxb1y32vrqo07clphbt86l219nw767aicznv',
                flowInterfaceNamespace: 'xt17luvy6m7hz531amg516x2qch0faksz5n8d9m9pv4zxl259w383df4cp7cw1w6d1zyoehn5e8nl0ntwxdrr2g5s6ohbnkqdkurnnk3piv3aisxn8okkejkvld464tftzs54x3efeso0gwhwl4oy0yekm151ulv',
                status: 'SUCCESS',
                detail: 'Quas ut eius architecto ut. Nostrum odio dolore dignissimos sunt est autem ab dolore voluptate. Id cupiditate ipsum temporibus ut. Consectetur repellendus beatae eaque commodi rem laudantium.',
                example: '5905f4i02cnfluplenb0auuuxx0nnz09yvt3bm6idysvjafpht3z31ld7oxaq9v4c6p13egba5who5th9adkfo0i68ipx3n9bvi7qngw5c0d64353nnob3srcvhoj8ab255qsrcgbuvyoeytun5toru6r0yej5sq',
                startTimeAt: '2020-07-16 14:55:10',
                direction: 'vds04yrjhiw51dsb8a92',
                errorCategory: 'cnqkqbqf1epfwp8uqci5zxxsztgwlm6xxep0yt862o9a8e3bkm91bxszsfdgxf9hv35ogjdwjwlmyti42mg0vesbui2wo1nrmh9ug3q81ly2fh636p82df1evf5j1ra1regj71a21du2vxd6gmvxzddq0terlozi',
                errorCode: '98p2zgkqeqmksa7fsuii',
                errorLabel: '79x91996x2qlz4poppvm21jpwyhe9qq7kvkv4725t2fxbqng3tz5rboi02b9riqnhekr2frdhfkkawqcz9jp0jns6w6lx3u0ed2gwarrxxmq3shipc0kho31uhdmz32ffik2k362qjmv6r146tjqtanrrli8tayq',
                node: 8702506523,
                protocol: 'plff6bvn0cp8t0ki7lr9',
                qualityOfService: 'bkxmc1tupcrvwjln2nxl',
                receiverParty: 'bai7gxl4ko96yj20iog1t2xa68lt6ei2rnz45jpu90bn6715vvjs9fur36sdd3tqnuf0fki8p7n4jwg8osz4h9gl646pk1wfezzo8nhlr2qo5ljivaf2ey5x412ayom5p9ncrmaoy1kfp1t5pukme6xibugredyh',
                receiverComponent: 'ch2yxr0vagl4a0ydza9re3uh2vg3y0ojvzyzhell0b3xfdam2h9tpj74zsauido0g91iqt3h7xrmu11ymsu91jug2sejbntzdo4gcqqi9tcpticrp8dgaw4597160hqr4ebij81hcdrudu4ato7iv48mbr2be12e',
                receiverInterface: 'x2yhp3bagsdj0ia077vqp4mzupaj4gjfme5sh3d1d61t9nm52ezpmktkyhx6hefr5h3r8g4nppe0g30h56s39gfm44r2gt6jmaodwsa1iieyg162hql1x74uoh57yeyslutfklqu2xxg51a0ebg63iyxobl8dwoq',
                receiverInterfaceNamespace: '8946paficprrfk783rk8hoajpjebyw1x4ke7shr0sd5eocn9xzq37kj39y8h6zt6k9vcqrqd7p6b4mpu8d4kkhro14rpqyytw4rpeo7pd8p9stb96b2hrasfviwnblbf3eirv1alzp691klamjo1zsyk9r7gyvvm',
                retries: 3573048511,
                size: 4570228303,
                timesFailed: 8811435881,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: null,
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: 'hllaw6hydaumbsqsn3hx',
                scenario: 'yc8rho4fft0y3d97kkubx6ykutco546xgijt28ptyw40iw8yshc12f3tkp4p',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 00:55:59',
                executionMonitoringStartAt: '2020-07-15 22:10:09',
                executionMonitoringEndAt: '2020-07-15 20:45:03',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: 'ei4u87v1nrnr3wnlkujqy6utrf0hhefbzysvksdzimjwdn6is0x2ljm7a9lma2osxhgvpupleq3igk1xg157f10yvrsw4hzm45r2b304ju1iygnr3qis0bg95rm2stq29ji4d2xe0y9crdjn4m4onw1fxp0ij0xt',
                flowComponent: 'x1xsstoxerzb7uag9huhfghjrym8iobreush51xfw85opeauk5vrszovdnlfef2zyy3szoqssz2mh70a6gfkudh48hr3j6gbvka63yhqpwn5x5ogjk4p5ttqx0440g795bffyzq2d8sx1tfozlvwhdg66z6olzkh',
                flowInterfaceName: 'drv48hpe6nozlk2kqrh700myk4qirj7aodlm2f1eqmhgx15o95dmfv535buzf7ot235gdkdayf71jwo7lxn04nx1jdbgud5g6xnrm8birdwxglfs2n7pczrhcz8unmvmqao8rjmmfkjr42abjgw3etpasj1z3nkr',
                flowInterfaceNamespace: 'f9bkfo2e4ekzqpcfagw5z78w3kkffn1ldoc51jogg5fepwktqqt5u9ul1psv2wxoyw32o9fco3thp2mwpk99zmic0pxun1rsiv03mp7vigu1jiiznji81usoic0dcuy9xns7koravzgx4wwkd6q4wepb5xnut27n',
                status: 'DELIVERING',
                detail: 'Voluptatem sit officia ea autem nihil. Fugiat sint accusamus pariatur ut optio quae voluptas necessitatibus. Quia quo adipisci expedita expedita quia fugiat ut enim quidem. Exercitationem ea voluptate voluptatem est expedita inventore et.',
                example: 'qwu30lq3v7gqts6gevwcu53t074dmcfmygwwklupkzkxlpbtktl85icku8l3q1m6p535ykn0pv0tup4v5u8zc001jxkcpuyfypkot5b8efq6frn7fp4v5bryp5mb79h12c9ie1k9lilpiixex8iy8xcal7i36lx2',
                startTimeAt: '2020-07-16 17:32:44',
                direction: 'au7o6vxldpceegsudqbw',
                errorCategory: 'lkinjti22iunoor9c7cvqpoi0k6r0opbvcv7gkkxpjd1hbjlsbn42voo82vdl2ti40iupf3c7wfb5lulxvy6ci76tyi2e9xv57wizxcigmpvsklvlu12m90iuwtt7q1wfdbkhvjztiek9dk0x4105ewz4fa02iwd',
                errorCode: 'pk442oocuy8e8llzoml3',
                errorLabel: 'u180o2rwde4cwhekd97vvxq5dj0y2f0gv5mfybckzj3564g7fk4z2i651bcixeq4lzr506os68fxaktjbtxihban8k5pfov545m210ucrelogthcftnaqbyjvt0yc6c2dqp61y3co1r25lnkfwu2vveyvsfa20p1',
                node: 1791804522,
                protocol: '4b3uyowag9ru9ajrkx68',
                qualityOfService: '3mcenxqiwvdu23ntkb5b',
                receiverParty: 'qvvxfuu28prtspdh7k9l6djfsjdht78mrv8nd20m3rlprnacasur6awe0ktkjg8ck9ltj4x6b5qdq13rih6wxnkmev12ohqcjesj6dl8anhjyoirikcmaljtmqqvkj7j04e4pbece21b5t7nt4yv0t44opasnyj8',
                receiverComponent: 'o48976p4exrzg9f18s8ayj1fh4yf3ah8cdic9dh25jocs3gbacyg17a8iru5rouxrgmtccumt8kgjgvu4jk5jc603qy1pdp6fzbtr77qaghmdpkbyi7etyj7jk500hglv0fwq9j6mrwynt9doyglave39lq1xgkp',
                receiverInterface: 'cj3o9oa1rp2s2aovh2g1xfg9csqxfe4un3iujcv93i4xx4cih8aztlrmieow28mmyss31nd0ri4jx6vsxi4jshk9klqdzl1m9ecaxjot75ir93zds6rpyptid8rf1oou7bbgkq33s8370y1b4327jremsexl9bc4',
                receiverInterfaceNamespace: 'wiiofdjzxt86994y37oo6iph1n4ezy5wfxui7uelgu99s9m24hzw10p5tvsywe8ahvxouro49d3r3dxs4slssh1lprb7807jpl3qdmblgfw6sy8eetmtuf9hr0ao06xdb1bixutom6fbmo2yd8krocaxem7rkzh6',
                retries: 3961092439,
                size: 4337255000,
                timesFailed: 5798433851,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: 'z3lescozw0dndjuhvq9p',
                scenario: '049puyrqypuc63itypjfody6nlyf5uia6mn6h9kenoyu8k0k0vmt0zmas1rq',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 15:18:40',
                executionMonitoringStartAt: '2020-07-16 12:20:10',
                executionMonitoringEndAt: '2020-07-16 11:25:14',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: '0dw4ieurvvtlukzpo28bsn2b27xqporv5hgdsa0o254v5gq6ydh5zayusrm6bxtngriisjxekmivb8xil3bcfto5sbq0dt7bu7wgtkyoyvxqmj3ai0627723qr1jqst0v1jpvpgrmjaw7b72gkg9o07mkak1wlar',
                flowComponent: 'p6gjq5ata1mz5s83ttopqomimiu4imot2ou82x2dvxju2tni97i6zlqtgf8c3ajv9fzqmqd7ccxb5nmxw7009ngh8gggb3olgddc4bf3pyymc9khtkdhjlavm0mtrxgsxaua2xcz99c5anh0843tkcl2ogwomk5o',
                flowInterfaceName: 'hv07iwevu18fsz34ugxqocpyym3wg8ndmm2ezjv6rijgwzhflo90c9wmyg907zart9d82nf77urrryf6kt2kti92t37rdbws624nl6x4ebj83hc3x5zv1auv9qz0uxt791a6g22ncp80npcpl2fxk6khq9g50zi9',
                flowInterfaceNamespace: 'anz05sxz0hba7xby05o50bx89xko8fzlfotcxdl5qf1ojdhzc0899v4xft508826uhtq2wn7jv1c9b95r9c6e90ngpmtdk7nij6djhdewsfmqwdabhevtztngdnzb7iit1726rjp9nyz6qgr1ztz0u3fpc63wk1r',
                status: 'HOLDING',
                detail: 'Asperiores reprehenderit quod accusamus. Aspernatur officiis error aut est cum. Id cupiditate cupiditate qui ut.',
                example: '5twnku2159s6nhosc30o1kwfvdooanw5qa6noi413czzro4zd5a7xsulrplig4ocj8halwmhyzaodziabgd50nqm9r6cr6237lvw4ddunpbo7ee91p69eliinrtc0p0lbb5e6ia5za5snoy31jnfkr87frd8h9z3',
                startTimeAt: '2020-07-16 18:30:20',
                direction: '3zmqbya9zachdeaxyjyj',
                errorCategory: '9arnrjsm0jn4ibheoca6kjiydkj0z59wf0tcvmqulgp8udodm5msbeb9coczeknvnd1nx7k6uq08l7f56n7l0twiz7jscywd2kfyepp2o8l0f2tr993i5w9rv2djk2q79zdfya6lc596anj1saejklz8lwwez9fx',
                errorCode: 'wh58g794dwtl9bgarw7y',
                errorLabel: '2wt2tld8ebx2j78nc3o4d26ek1z484sm8mrvjjvzo99lyml62nnuesahet05arfmh9qh8w4fdtyebp42tybnxiootxb64kliv87pc540hqu9nqkhiaaolid693w9cnsy25fqrtht5612bd86hsr8hj0hpbf570j2',
                node: 9307210980,
                protocol: 'obxdufeehwhc7gpba1kv',
                qualityOfService: 'z0plxabcvg0jhxemc4ro',
                receiverParty: 'tlx0rv4ieh9v3294gf7li2vqp1s9aththk8mk6c2l1hq2wtldenavuta7oku6zrkso6856xhd81zvj8uzdkifamiw91o07086ubqlbncx2ql4ikhjaztkrn1mp6et150cmgvpc71zmzqus62tz97ceq4f8u4bm12',
                receiverComponent: '8h287ng3fnrz2irq48ds8hok23g22tnfu86l48qwdjotf405cdnd2lbvhhldu6u5c9m3r7x7j1wzo7ljlupivm1dhrw3oua2hyrxr4f0r0kqrabrjxspliyeoy6n1uxbq7922ufa7s671p0oskklmwstlqol7hpc',
                receiverInterface: 's6xxz4e20kdsor7qny4djfqxq0u8u9jogd3ob3aj0i2jgnu5qzki3v7bxc0v5bfr52bai60xtx1of87krmka9a5cer087zcn7jx4g7di7dqmktwn0xshktschhxlr0aoehcur3i2jgv0ahesh70h3mtwe0py7qax',
                receiverInterfaceNamespace: '45r25glqypk80dijyf78yquedaux2ve3x9j11714a406p0ry5pr8sgr3h21359ct41ip6v4j0j74c8tsf3dh5va6xnh08p0c4jg3v9fvdfc9yepua43xxlqbsqm7p616l9yzzh1ytlgi9t47ah4fr754ojt8gfyo',
                retries: 9206918123,
                size: 7094022503,
                timesFailed: 3059466058,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: null,
                systemName: 'rppurbcl5orcuxwmipis',
                scenario: '2pgwy61489hfzappabrrpiljaglx5lf92imee2hami8ryxnx13fg7y2qeuj9',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 12:17:19',
                executionMonitoringStartAt: '2020-07-16 04:23:11',
                executionMonitoringEndAt: '2020-07-16 13:13:44',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: 'fdj0dx3jhqwd5iht258rcp3qshptww2xa1uet2kvwlekht7jd0ii9wvloaf9t256oz0h0gvtkv5liu83af5n1kup6s7l28y2a2auj2hwce7b93l148r4xv64z82sa00rdmtzlx67jjudcx9jo2gv1gn4csaz4lh2',
                flowComponent: 'g4vsnla2beujyb6byf4crnav5cxqdn4zlbsw0fbrob8etsyyyy1ru1y7tepji8m1ajkj98fcxyyv79g92l60926ruk518rnlwjngldvxglxe9f8u2qpina3aurvlk5lirpnnjab4rnlgt8otzokovrgngqya8twg',
                flowInterfaceName: 'n9tdqboedohxv6p5yxbzrzba9vyrxedqvia8nzwyye4nwqidtnuepw235mres01hg549ni1cfipjwg4a7ihhl1028kmeeuw2cgwykx77l5i9ichh7mjvjgg9noll2lnwqfsqb71d93669gihzhuw8akln7zix7la',
                flowInterfaceNamespace: '41zeuiumdtvozcebnghaazw4w93vbb307lqo8uub0tqjz8bvwm0ntjmx7tmy56726f2url5tu6cfon99xehgdk73r3yunq68kraaibw4j0hmg59jcr4jt0qgc675r3flmxqxvzf3kewrdy3bcdeutabah4m24hkq',
                status: 'ERROR',
                detail: 'Sapiente est quo ratione. Cupiditate maxime commodi fugit voluptatem iusto quia vel id. Ut consectetur inventore enim tempore. Repellat molestiae commodi et rerum cupiditate pariatur impedit sit deserunt. Veritatis accusantium consequatur et.',
                example: 'fg0whr5eo17wxzxfci0u36h4mpmzpgum0m3b54aw3mqdgdvu8ff36sz09mrn9rmhiolg481ebxskw2romyckwt88tys6o7zga80z1xffp0989tlilwsyeagbk82pvqs49ivsfk4frp7a6cbuirpnimf0baxsp1b5',
                startTimeAt: '2020-07-16 07:04:52',
                direction: 'q7kknve0m3kns1qilvgh',
                errorCategory: 'tfaab6ald4hweptel9c8rthusd4crgal6deese1q0fnuokqpqc868eiuwjcpabpowlikqekztkcmgwyo1pgjd6ql9lnlih4sy1ovhnwnod01gb0tvu5t90ddtx7da43bzw477fymtkoksdz639o9yf707zawqmyu',
                errorCode: 'vd4g7ufem17g50v6cuu6',
                errorLabel: '99qw6di2t2biivsfxvakdgsa91c002nrl67dd22c4untcx8p8i01x8v88uh1vj3h2hieyrn55wkzakclwkdlcmeyh0khv3jjxpbxpzl2gr7eqej7v2y4p7m2ve4nd1u7tpavcvqvkqq11g720ln2kkeip5rq51li',
                node: 3432151308,
                protocol: 'zsel7k33dfn6hoexx7ca',
                qualityOfService: '3iqvsiyy436sxbdvij9t',
                receiverParty: 'god5exw0isvf2zvjiedoia7carkpvi7f42zhtt47tggtdtln6233dxuhm55f2n6s34hq7agx3o03eil1o3sia5u3ididt50su2arasg4yxcel7qwc4es1m53p7wx3et1hryq1hev4j7fu07goznceaziyzbobn3n',
                receiverComponent: 'oty167gfy2g4euvsm6onlf4vtyonscekw4nla5xeclo4gid316exen0wc169kncmn7h0dcoxf6dxg49h52bl342nqk1rm8wwro8uczogiwtk7455dtq0x3ycy507rsdsi2lsnz8623lvb3kn2uvbtzs506bwzw9f',
                receiverInterface: 'kw41h211canedesmxceo3ln94gb6bt96r4dvhkff4fbpm1j9npaw26akvtgsdpij53wzbepdy55w3hijoj1rk964fdx5bjw6q4ik5rocq2y010gxvt2rsm38zrut1qnxpvoufd1p88v9mpzqtcxcucz735d5n957',
                receiverInterfaceNamespace: 'wxgn3cp9yui9kdbphyewtvmb0js2ybj08kyh44sexo6jvlpy985rujb4rsl0772wqjn4a0kby8sift5g0psgpkjfo5wbx8j5y82uxtf00yx50gq50tuq2nwm5u9s2rohusoqzdmiwgvrpypc0d8wrxis57csw6cr',
                retries: 1917904195,
                size: 2230764313,
                timesFailed: 7818641990,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                
                systemName: 'kfz3o3e8cxnsdi0sdqxr',
                scenario: 'dg79fiqp41fzfr90t65yzzkac3vqmbo769ljqm963vpe9q6ifq6rohn9f6ni',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 15:16:35',
                executionMonitoringStartAt: '2020-07-16 10:05:29',
                executionMonitoringEndAt: '2020-07-16 04:59:37',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: 'dtdajq5deideqb3w201exenmmm7o4uvopxij8aa2msi88w8eiq8r11c4qf1r8jtnlhhvyu3hydproiy0cpafxk4mqy0xxf00zhwm0h8dij4n2u8vsjprjq835r1i24cn0izzwc6fw86glnjqznpatlxyt1g8x3no',
                flowComponent: 'p4ruyoty1x4e7irrayotweiwzdadzygxoc4k3fwjvh77fnnvzrafdk91brf3jt802g98j90836rhwe6mgvlfunz16wr61mlg3cespkmppylkf0ojv458n60zbzf862rm5q50etujwcgjdh8ghp1t1ok5r2ooya8p',
                flowInterfaceName: 't39gzfrmu2evnlw7k0qrsev4jxb9lvc4k279sp0wxuims0qz8iid1sc0eqi2f4ppn8t6xaaclq1jh0kluhtrn8p7jim9sourajptmxmappjgzu8bbj6tgufsle34s59e6cz4hcwd3hxeutdm9qh4c67lmzn0rwda',
                flowInterfaceNamespace: 'vq61x8a66gemtl3rqd5okt8zidkibaobnylh323i8xxz8ncfm5fwsjh25bfn14ltdudgj2zc7urd7lf84ceiff21ezbw0xgu28ps371jiq9427fy3xe1fppag7jt8uz1dlngghhdx697e3lg7alsmefvrpn13c6u',
                status: 'CANCELLED',
                detail: 'Totam expedita officiis sit provident quae totam eos eos. Culpa deserunt et vitae ea quae. Quidem soluta optio dolor. Dolorum est quidem blanditiis molestiae voluptatem assumenda qui dolor. Pariatur facilis sed doloribus quo maxime excepturi quae inventore. Voluptas sint numquam rerum.',
                example: 'ku3am8ygezw10wcx7z4yjkpdnqh8c8zgucwfoy31f89mkcieqi6w31ifjiz5ghcyz5iz2m366imr69c2fyrf0zi9d6p0rd2bgm3j9g5s6woj488e5nachwpnhpzq7zjiydbzwjbyhw0qwhccl268u7kl5fil4dh4',
                startTimeAt: '2020-07-16 06:18:04',
                direction: '29w73jj3a4y4qsymus2x',
                errorCategory: 'oygtfq4gyz74yp2stijxu8beyqwrmus991fafyg9n0mmzaffecoufyyr0lv78h6gqityhhzs5hk6ycqxlz162h4u4waf4n3pwuoi14gl8elvd5jdqs54ugkrs7oyvin9j92ex48ygvzzzkvimsiyvsyo0pn38sml',
                errorCode: '9rjbarj4i25w8hzsx9am',
                errorLabel: 'mcypwq0cmqo03jf7df02kk8yfyhcb8f1uuxtdy2j1wls405myytie6fg08j1u48ldqwfya8i68zq3rggjqsd488zligcnkqea4o1vfwxbzojvlqjsvlos9eu87x22tuxqy2w3evier0ofemumhxmn6myrpgqe7sr',
                node: 5890711831,
                protocol: 'tbwka2fbsf5x7obb96dd',
                qualityOfService: 'ub71o5vrb4xdxal79m84',
                receiverParty: 'taqi7o37qr1e9dyazh3mczcazogx3nowl41xzrtdqrtjdy2s03hjbcfq6h9ec969uvspcasdg4zp7r572ufmwpv3vbmzdl8nexr3lkc4f2052r03tpn2foptnb6omlmawxse8q3sc41lsghmgrovpbakqxhmsplp',
                receiverComponent: 'cpz5y6fi6kmcr5eceb3on3ycdgw2s6hkeul3fcaq578hs13jok7nz3g7w2nd0as3sd6p30s9jqpslfnnr2i4s8jwnsf4shcythdgpqd7rtafp966p6ltxmy08szwbtwshondjj0it20zax4xw4es9sz577sjxr5c',
                receiverInterface: 'iskkwz4580ex678njhte5khzt98qit5n7ivbf8q68q79knwn5fn1bcarpyolgtswg8ehkyy36jhgpq0tt82z9vb2z4jvaaaqsfnstt7zdi5tgzpmtsu5pk7yvlovijh6197px9sb99dvxuk6kq33r4stcz3fc8xs',
                receiverInterfaceNamespace: '7maxziirfpym939y3uicx4znnr4dcssj68ifr7v52npmav36ij3s9k6m3gs9xye3u8pbjuds9ms9i1gtnaa722gb5i72pnpqrnqjrpia8senfdko5tc4dgaho24zp9mo9futhbxeujw9y73pa7l536t0a49ygoiu',
                retries: 8503479848,
                size: 2468414450,
                timesFailed: 3845090634,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: null,
                scenario: 't56p1shma1oezbpyuvd441khox7tq7tvlflmzpx95mgxscnstym23y2v5sfp',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 11:37:24',
                executionMonitoringStartAt: '2020-07-16 11:49:03',
                executionMonitoringEndAt: '2020-07-16 04:38:17',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: 'nir617ezwb6d52bntg13dpodu54y41xebhs3n9ywhp3f5qs3zb1bzb4qb1gpp74mciipxhjjzuz8pirhs7e0nokxtrg7nn7o9jd85div9uaxypgey6fn0rilp0rx0mkcqf4uihd2zid3todw9kapccx0y9uq77ld',
                flowComponent: '4h32is4nhzgv6ddm01b86vfkglgz7l3sh0ookq2zoh98ao5q8tjbhkgam3m5d6ku3sbp03805bbrbl6z6iklaksaayrzzz30r2t50seyxq65ov7rosgyi5mb7glzqe3tl3l4tr8mknvvj2dbpnuh3iiqzaqwmzrx',
                flowInterfaceName: 'xq51vj08o97xjjamy00taffrrnfcy3syafvtwqrd5by15mbqqqbyo2famf46ntto8cnswn7k1gndhqxgz29fzqcq5o8uc4o9p9fl9gmok3cuffl6c248oajv5ydql53klm0qdbh14p0o86n2bi63izj18ysgvu6u',
                flowInterfaceNamespace: 'k55r10qy8revjqxk1jhrywv5zeeyhqzygzgfn6p8dauxbkq10gtfscckd3kvvmxq366e2bsw3zs6xowyd4cnqd05oraxg4mz8sxaq5tim9a55p89bz58akvoryew6a8pprb4bm9bgwon0vnerikwp91o05tvnw90',
                status: 'DELIVERING',
                detail: 'Dignissimos qui ducimus quia et et perferendis est natus dicta. Et dolorem qui eveniet velit omnis quasi ut. Sed velit nihil illum non quod voluptatem et sed eaque.',
                example: 'iah4azjmlyg2njy2iujgp1mjgn45dfq30ijrgypgnyz6x1a7zm34g1pydm3vn34oe72v2dpxth00jk5cinm1c0i8qgni6g25txno9niwjxizyblu26bklwebojse16e8co8002dnwluql4axlvu4cp5ch51jfemv',
                startTimeAt: '2020-07-15 23:16:44',
                direction: '7dt3zqb1cjcat05k1mnw',
                errorCategory: 'yedda1y19s94hvfv3my9f22mi0vb4ygxngyqedijvxk611jh0lrldlertdj411qqd7tgph3k9uc1ooye01zvrii0cu2dd3relzvzskiyrdgxkg8f2fbo5y09sbfxbhntd550a445ug4clomblpcji0nqyxyr804g',
                errorCode: 'nzljae2r3w4cyk39uz16',
                errorLabel: 'o9me57hgkyf541nsoxtwp0xfvjuwdzw8f7typavuy4qdw7klzjliu999ka6jcqyopnoirs21ryyetswvnfn1s69ux32x8yx3m5ykcq1ojddhxzrs53mbtru7eixmbn8lfz1ipo1tmk7tvhjgv2wbo7aiyahxvdau',
                node: 3791612822,
                protocol: 'imhzi66rh8aanshm3834',
                qualityOfService: '84ivarsqs2cwupn4wz7l',
                receiverParty: 'xa3c6422eqn7bfi50a7huywm9bh6x7l9935qyfef42f3zbxer65q9tactii9pnffkza323vdavddb2snwk27qrq1rwq4fscbhggdz7myrwx3x5e4191d9cljced3u0dcdjc5bdb5njsnbgzd8d4mkxbiyz6kr6ts',
                receiverComponent: '7hslg2g7nnqgdozqadf363mvyf7qsz7hrl142tjeys51zsyyngv6xanup4p5duel148azsgnsa084ixk2zm658pdkmdyzkxwimecaapmg9cs7on2j00j4merfzaq0noiz0h85skc558awpdd3fn9fvkjjrsk8zle',
                receiverInterface: '45cavi5p80ss5kkpabvepmy2a67fxbyouumh8iluzpi2zwck4heblhe5qdgnjx3p7ze5ryfprlmq2t9eh5wasz7wl6bmb03i37oq4dppdq0z6v5ydpxtqq88nzjcbze92fw7pyx3xcjp8vlomv71y5u7qf6sa2a1',
                receiverInterfaceNamespace: '8u0139byndy52y5f8y1or8f9e6sc25ygrkh8g2in1gppxgd8y4vuym9jjp2y62oqnc91ksp08dh7icetg55wvabrp68xngxfhx4b9ofgga6mfr6517zvzrjs7fp921sun9yfk5y255kiumdj08fgxtw6lrjfv5as',
                retries: 7024659076,
                size: 7561238327,
                timesFailed: 7540849571,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                
                scenario: 'c11rv7m8ensxga43dow2yip33gmtkstn0357995qh60cki56bhaxyryfqn5o',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 08:42:09',
                executionMonitoringStartAt: '2020-07-16 15:17:06',
                executionMonitoringEndAt: '2020-07-16 08:14:35',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: '5tnr2dywrk5pnhbhu4okequqozt56snp9uv1ofb84oa04x5oqogmsddyhudynqvkp6h6sufft0hxeylyanqc7ilp5zrjj8mu2lj2ru6iym2wiziow6bf2au2tbb0kebh4v3y22t2y3583rue62rzdf015fk1o6jl',
                flowComponent: 't4w4g6au35or9tmr8lrph0rdig1ognbudfayg3qaixbdnda82i87w8pe7xvx7h8wiz42seqxzq97q6ph018yin53rgqkd2d6obzin3aasurp0pfj23dkwiryy8t7vzvy776lwt7w8kiokw9ac35w6e5433vjh8ex',
                flowInterfaceName: 'xj2jqsk66sol4drb3f0gc40gavptha3pkf8n5asp7bl4wtkjtncined7cbvlwn0wrnnuj695mdgqe1ogravgtnic00eqiz57i9hwdi26r3vg2s5rh6edkc5si4od4q91yqs76havm4k8ohlmc3en7qma9ata4ea2',
                flowInterfaceNamespace: '4uv0qmw9kt09zfybo3wqcmsftls31igmrfe5lxfqy3fyg2r8k495lcu20oralos4wzbx5v6pa7hsn8rqb92ujekm6htvolbhc27rvagmwh3aa5b976vpdemj3din109292w4m0bsih5pca9jsuvxjwdm5tgsei13',
                status: 'HOLDING',
                detail: 'Laudantium ut officiis nihil. Unde voluptate ratione expedita sint saepe ad. Quis possimus architecto qui aut molestiae ratione enim labore. Pariatur laudantium magnam explicabo vel. Tenetur nostrum omnis eos possimus qui. Modi quae corporis et reprehenderit vitae et natus.',
                example: 'aaoo9fg9hpdluv4h5w6s2icmfensu8sh4jvpv9sv7guiapq3ojwo5fdxxdsardhj6rxs55qv17i0tudk4uugm9kqiafjjzpqewdfdfiwxi2xgae9p4djvlux8vc8hr22do8k0jl28fyo9ymvte3ghn3tyme5lqdf',
                startTimeAt: '2020-07-15 19:41:33',
                direction: 'p4sdr0v0swn104eok06y',
                errorCategory: 'oc89051sy1c3wjjado1uzaw2rlb3xidwh94x7p44ljmxl9t0xolyoo02uujxshov7lr72ioejyu91yxold1piz97x6lo4zie05jcpvhmdl101a6kfutjaz0s8bim6402tc6xs7sdqwkgo00ij6gzooocv27d9iha',
                errorCode: 'dboarl2dpvw1yfhlh5gd',
                errorLabel: 'p5ecttk5jhozmbb1v93pof4ybzaq8oy15c6v8wdmv2qjptprr35k699ldspvg57ofom9fsxf3924aytmkkwxxbtfojgwa86dty50chy6rz9bi08uiiof3qggp7n667nqwabii8dlpzi40w2pf0e1wbceyo455zh3',
                node: 7777399678,
                protocol: 'l3lhzunyfcmsp4broq8t',
                qualityOfService: 'ufid2y060wjdjjan91n6',
                receiverParty: 'hvbvfyaignmwmz46vzi5akzoo8beaf3bnxj8rap601jhkf995trs2gx32x6z1rdde2jvg46hzr3h556rnpohln0wvdlr03ef1r2v59s684rqpm333lt5rjqvm5bg26gaq3n92tlkjag1n02fiwac829yef5f87pb',
                receiverComponent: 'n326n405y0vkl0pf6qppgo360xwy5lo0vv817wijkmsjvdkkrex92cu0lqrv2wnlhxn4xb2pylw6rftwwanizqxkr0f9g5zbksr3n8s89fvyhx7p51znk5sujdxfx9himvens9zxhmi3m92ryegw6kw1zwjhlcju',
                receiverInterface: 'lgn0cjcbe158e9cxaz2e3u1fbm781zp3vbw652jm611df8ed4q59jtpx5yybw68gj1fvxmw819gs2f2tcb4w4cook7irhgpyvlyshtv5d0ddwolyidno87088ehym0zubdm5z7fiy671u8prj7aa3ss6gm00qs6j',
                receiverInterfaceNamespace: 'aj7abkr7tft4adkfxzgoq6vp4rhltwnsx6arl7rfcz73ra2ekywh3gtdk30xubltk75vw68uev3h5omu8mianiqujmxsypb6kilxitoioq48qhykamr4pflwjm26uw1oannjiim4ncnsutddn4zddf4nu3tltmqk',
                retries: 2166669207,
                size: 5499362296,
                timesFailed: 9846521474,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: '526oh7uxh1vj24d5gf8a',
                scenario: 'hybq28yryhn6o3gmrhnpffwgee2djsz78379caaj38d9j6n9ktuqmkjom1lr',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 05:36:45',
                executionMonitoringStartAt: '2020-07-16 01:01:15',
                executionMonitoringEndAt: '2020-07-15 20:48:19',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: 'ixzu3lzgkr2qw1av4ktv8ocof16i20v7h64ms0b03iq7dww9q6l5itrkokn3b1r93ch2470h313f9eiuofgsjneibrx61zr3vtm68rb4w90z0123uuvegjle19k6dfm5qx288nlnpw4z8tpe2tg1r491m4xwug4y',
                flowComponent: 'l4oymhxwuhs468rwgpnmmvrqnvzuuoo1rkwl5g7ntz005m1evafwiwyrlmuso06l6avjnfr98fczwvbc2xdv50d26hm9fcczbx8tmallstk9zb5oznnms3htwxgpt0ct9nga5sti8ozr0ivf7wmennueeec6rkxp',
                flowInterfaceName: '7wsw0u41kbypemxlkldtn9r00obwoyrwp84q97hgem84h2oujwl9rcydab9h8deyd4ipx468yr686uryduiexnpvbu5g02khmii8v80c6ll8g1qo1l69km98981md52a4nur34u9s7pwyl0jqh8xdxatanxz54g2',
                flowInterfaceNamespace: 'lxrxsm2p5oa5xqj0v4wb447ui2p9a9aqq97fbzyolsh2k5erbx2v8g2khy9qurm5iioy2m2r1rkhgp2syvk0jzbsyx9q5070jdwizimqjnc2kcq32muwlrnsknxmensi3us1lsodisait2u0kih1xhi3iactpzq4',
                status: 'HOLDING',
                detail: 'Distinctio odit iste rerum officiis ullam sint optio. Et vero a nam nobis autem aut non rerum necessitatibus. Reiciendis dolores rerum rem pariatur doloremque voluptatem et.',
                example: 'cekbrq9a40zbauobtq3k77bqndq92ts9c5mw2aas38ayhbjlz48nfhvvm604meq5w0a1iahjf6baibvof00pvn79mxyutfxte0g45i2acs9ik9uk2qm1vk5f47ed72y829u2r5ho2j550udvnvlh1dylm22x4njy',
                startTimeAt: '2020-07-16 03:46:49',
                direction: 'y8bj8yld8lmm0cgu55s9',
                errorCategory: 'm67q5ay22arpbx0najv7a1kp03iwbthah0ho77z19z2gs4bmjk8cu5ki18w8wi4sr97yl9wn4mbxp4b2snj4583uezudylp1caxko5o62wp2lcqvr4yw1mgo1b66heskudf9xdy5sctn2nxezwyy2936wy02gfnx',
                errorCode: 'l3npnlb45o1hd6hv41pl',
                errorLabel: '6fltythmgiqp975nysmxl3rl1b3feyl2cee5ie3u04nksyrn804hh3isd5pr12fwmx3c98xga3xw9wmqytb7tszkd7e2sn5pzr7dj0w7bh42v5crgs1nwcbqmjqb9r127uggqb9lh0zh7ahyuiiynic36utnvam1',
                node: 3821191602,
                protocol: '13e5goadxh9g4whzplea',
                qualityOfService: 'slkd7vlxt74naanpnr3j',
                receiverParty: 'jkn0d014helajt2bnggrlddwcbotk47f17gk62c46opk4dsgkc4xzpulbppf5ekfsq44k0yh5uzt3ay5rskk8l7oc9bfgoa1tscj7kr949n5gbrpq835e6clvur02xmu2ktvlq49lykyjc9g7txhchmo6fembwgr',
                receiverComponent: 'k5cqmt8fbs7yedg0fnd6yri77lsv5zqax4f7lo5p4veozrdv50jcvl9tft57xad2hhlzt3hb76dekl2r1uyat1auj3voloo3q8lry39zyv3x2x10hxaral7i205ib5w0gnd2kry9tdmb84ylceuhtganqa4gc8l1',
                receiverInterface: 'lz4p9ipwwy22v9y19xcrc4jeyb4kqm1qscmbq569w580lzzesecfqlpwo29smt82vlfls5omcjwq1a1naa91svzom8b959809yh62wss4tmlxw1m7k9qsmuuniucbhkiahu4utxwnehi4usznx4jqv9jdel9b2he',
                receiverInterfaceNamespace: '0ykqzr699em3sjyub4zuk3qwxbl7xo65g6txff5yt3tg0ii9mr9ap7ef2mppuf5c2ya2ssb234y3pmxe9w0fc6owrb6jguaezx6w2tu9abuzdradt2q75f2u8qaud5kcs4mbtcm39rqsz6a8pxclgip3kwjuy5if',
                retries: 3653283374,
                size: 7855023342,
                timesFailed: 8751479270,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: 'jqdo38ufr3sqyzxabsbq',
                scenario: '7efroip4wuumshp1a8q2241hfz57npp8alsqukbque57p10xqr6rxxa93khe',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 01:18:36',
                executionMonitoringStartAt: '2020-07-16 10:24:49',
                executionMonitoringEndAt: '2020-07-15 21:48:08',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: 'z48jjhronyaullcgzvoil7tcw1tigrew1qxdthxtb3zcyha6wu6nktgjsfg2pwa9nui3khz9mz9j0qa7mtmwls4h09jj6ho9grhasfbih75ihyw376f5l3ig75paxue0mt83vene5266zx3i6dglbk9ztm4zzzcz',
                flowComponent: 'qxixnbuxkkps8m88xj5cw407qmdci9j26uj1l6fl99t0ovv1n7qc5iksw382zfl6944dpoxn1482u2t86pp33zquwg1a3d3imdtk2yty79wlitpeyxuhdf0pysmtqsdvmnkls2yoq5q1wqjw9mxvbsfzawmmgy8w',
                flowInterfaceName: '3ahw8wx7ubo78ewi72yn8qeucrqga9y827rzxquljj0tsa6h8yd7ju70qsphle9dhalvz4ulqr6rr25rao4rem5kytj47cbmi5i29rutg35jop0iggpsqckt813vypd641zluno0z3448b6t1ahpygmnrugvv5r9',
                flowInterfaceNamespace: '30dwen1q6ymm65h996psn2dt7aqraq1w0dqyv8zfzjbttypbj1hpev6hyktsbc2n3rg073zwgau93hzyajs6fuk6rvf936td8om9jecsare8wardvtp6p5ebzpa7mj2ciu1a8ablzlgykqtyej3w7dw3xdcjhvlr',
                status: 'TO_BE_DELIVERED',
                detail: 'Voluptatem sed neque quam. Nihil aspernatur qui. Voluptatem recusandae sit. Modi ut occaecati quos laudantium et magnam. Impedit enim dolorum natus nam rem vero velit. Ab fugit exercitationem exercitationem.',
                example: 'sx8yxct7njvsqjw9e3dj7aljvr6lvg3n0j1y7h5shgtv07mhktd7f2kcqr5mggc0vx81c3jo4gyygin5guawb1kpv7blenj0lp0uuvtffhf8kzwbfjz6l4skqdo2n97k9c7ygqom9ksj2899ua2mhexsq18twk41',
                startTimeAt: '2020-07-15 20:09:03',
                direction: 'vhk697iiy2ko0lrn8ory',
                errorCategory: 'zgk0s0mtf4aor0j6ua4dm7lurzn36dgtgb2imi0qpzw21c9bfe0sn944gzdx5e5y6jwgeovvwfxel42bjgk208j5op1v4n63im32e0k4ojd4ynbs35vkfj4anx4wkz4866j9vq0ue8civep53amqxmhmz4r31kn9',
                errorCode: 'vws15jbzyvbw2796e94h',
                errorLabel: 'p2wae0of6loygige5ct856ah84xo1n8u7beo463nuooai82rnm1m5mqa0cxii1fypd882r4ip0fstilryk5uxaxkbgq6i7odzoe4mhnpa9s7r749t1e2in8gjgt66y5fsth0wuak2da16s4nsifp4j5uhxxu760c',
                node: 3728055805,
                protocol: 'ggl46goi9nhjh7br6rhd',
                qualityOfService: '73tf2qn75x6vmvm31vno',
                receiverParty: '5fleg3s1ie40p9czpvnfz5pw9va2rnlvj5t1skjmum754xdfguiipxg6bblrftq1zixf29gwr4kkmh43mz6m4uerzz5yhtnuzwl27zq47v1n40yducu78yqrn6nve670svydw3847paggfhhbyepq85b06ckmrzs',
                receiverComponent: 'psecvx6w67cme6rb8500yyupmbzklousu0x40wqr1abmucgiswx9hur9z93p4tjazdvui116bflh9x20qdbc7l7dsq83k23ztapvmw6q6l72hj786br6axp5kssxpjm6gje1ag74uoxelb3117za5emq0xwlnlq1',
                receiverInterface: 'gpt2x02vpzcfm1llvqp19sybswpgv3deh0csduh5en2e5p6ydiqnqg4h63d8wm05ejqvvna50xt5vt34xretfqcwxumgtg8edn7f35apegrwkh2jx665tfi3uahzuyerwahgkskcfsr0hglpt657o2f2etek4486',
                receiverInterfaceNamespace: 'q2pqa3f8lqsfmd5q253tpcmzhadsaltrlmkggpp6t3amguoblfasz8qkt6fnar6g1z9y8u15ythmno81unk47ecrxbxy7ice4hnjuhawbh9ytp1g4gwj9fiya94qdv6qh7swb2dhnnf7l0wvuo7pgp6xgjwdbl33',
                retries: 2730939617,
                size: 8463515512,
                timesFailed: 1755859308,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: 'kr19oilzhad6dkk9pvt3',
                scenario: 'jum7qb3b7nkeh6ugoq8nc25q8ze8zol813x67khzksbypwl8h8h6od1ij4sx',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: null,
                executionExecutedAt: '2020-07-16 05:16:21',
                executionMonitoringStartAt: '2020-07-16 11:24:36',
                executionMonitoringEndAt: '2020-07-16 13:57:44',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: 'ujbpy8jfnikysh1xynks2rsj0ni539woxv6rv0betb79bmdaa8mqy2u3myqs58nwl0kue7qcmqbu0q49yqnjusoarh6hmgcl0rm2thwn80hek3j62995h6mhj4vkd8mvlpktsap0dhu8sqols834yk1jrbt23ben',
                flowComponent: '9fpb66t0tlmxo5bz5m26g6zx03f91w5dqaw39b32ypnqdkrxz7o7729gnx412kl9oo8ph6kdsdl4qmowyouyyge0g54nzkui4zou7fk1fdqe5k9oj6irsorj33g9k2qg6o87l6ry56p79et5ampj5cym2bzbl60y',
                flowInterfaceName: 'dug8228vsk62ioy3se0alvx6q09ecco6i0tm7i6xaonqnplelcpuybp06g6pgd0fq7oj9ldkxeilqrivm4ct7816bpgz4v8tv3gtbwu6316v9suhyb4aunlayjxgvh0945diwulmuuyu4mz2ljw46fzhqzogx5gd',
                flowInterfaceNamespace: 'vopf8331ntba299cbru7qg0g0ojk4kyor0a0wh99kt8n1nekwssk6hr94sxh5w4ue2u0junjbdfz03h1xtcamdaunp0x2hob2a0f32l0ejbzvcwtulphj889pciujmp6h5hvfpywalymm0114grn9v4ca4v6k3vn',
                status: 'CANCELLED',
                detail: 'Numquam quo eos beatae dolores quibusdam. Ut ea minus ullam aut. Cum et excepturi velit molestiae.',
                example: 'sm85s5wvf6nwzo3010gqaeht0lcda4kilhfb8h06x83ap0n5kdswnrisjg7vwiyjr42td12llpf03230q7waymxbo0ska7inkprv8jdzee7waoxk6asxg9v8xeou5uiwle32s1mdabf0uws00o5f01yzqz51k24i',
                startTimeAt: '2020-07-16 08:20:35',
                direction: 's2m693hqlob6vvczjwxk',
                errorCategory: 'tnmqi9rg2hztko5g41j04z98szpg5f6s9ikmhhvpoagf49tt6of1a80au7slxyhpp2emy66t7fpair1ym2prt0s16lxdkbvygx34u8r6ptfmcli1w5bv4fx2e4pfzh8pe87djmsxlf4vt6406v9gx917i0dephsl',
                errorCode: 'vwxln5g85vnkxok72bj7',
                errorLabel: '3uqv2ry0ktwexyljenzto3ri0t698esppctjd9d6v1vq50hbbx7f63fy49unsyllf3hek15hpacoja3tvyjk1bohvwm4v65wf5fv4tvyfgyeyxf2oobg2c69k2i0c2od1idc50gq05pxdrg2wfuk3tircc1edi8m',
                node: 1426844607,
                protocol: 'pfsbalc3xnisgm2mmmjm',
                qualityOfService: 'hv3bwpcr8d1kv1pbxb73',
                receiverParty: 'el4ianr3amu63bxgpttxcuwa9lwn9ov8j36oq0bp4bv0c502wstq62yxl3vrd8s3cha32rr7h9f03vznc11rf2aiin35ma300fhj0ya847sqw62a783a8dnlv1dw9dhyklt9ubdgaocq3merr13adqdms77bdxkw',
                receiverComponent: 'wm4y9tflveei0op6dk7iwowymxhu8kz8zouw1tr3q9coarv87w0wxdky8syxf9dqja6xhlvtc9ecgg5xrur79xbknud2kankjvf49h4v7xedycdw6mmc8d4dmbw6q83bb3ve8tdeenpycky2nvrzi94d64b8xeqi',
                receiverInterface: 'v9xntdbm22vys34l65phh7pm2mbgjp2ewmtry9d0fgtku988fjj3aiyeqa9l7jol9ig8ydj60uj7chaq4oiwi7mm2ku5jzpkd7qqt0mz04wtnlu3a0r84tsx3xywkelz0tq97jz4x7xq44g8d9jpev0ihfxd0fzv',
                receiverInterfaceNamespace: 'mhkqpr6v9qdwwv60by1l2h6tuqeypeveu8wtp2d3ngf8hbah4uhbujr5wnurefiscsp88g4utw6pifjybewkbn6x5jbnjlxh70ugb6yvoq7gmwvz9c152km4zld96xl3czy7h3wwccmoheo0tc0mevyjhe5mdof4',
                retries: 2562038126,
                size: 3195396788,
                timesFailed: 2309676759,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionType must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: '1do308n0ytwbioa61eax',
                scenario: '7cu0oz6qpu8fcjz1e9ytaro2logs42qrq44bogpefg9fydhbfkc77wfnntjs',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                
                executionExecutedAt: '2020-07-16 14:44:54',
                executionMonitoringStartAt: '2020-07-16 14:40:24',
                executionMonitoringEndAt: '2020-07-16 12:37:53',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: '71fhsjrwvqo63474kft7cunyuwd7a0apeayuysnxpnkse0vxo0yy86eyagyi5mnqj3qmj99cu7kxnc2jii20ljvl9lvvzx9vlqge0ko8hirekh4djt91g8hxu10st5vhbiat3najdumltylp7338y7s3qgta6hsm',
                flowComponent: 'jhr71yrvcpyjxf0gdd3ye20hmrjnr8g2ugdgi2tkhw8mykmmp54hovs0wlkrtoehfzyo57gvwwq7rlc33uyy48nj8lzrsp9auwyw4b8rkfsjvyjj221vhpif754h0268lj0btnlhxb0dldztnxnyctvqtz8licwx',
                flowInterfaceName: 'i49cggofkvaq0fyqzzbb0todnzdvwzrkkv0kxk1cap2iscip3vb7aqnsmybu2obzuks70ihke3y98pdjcgcp2m6x5cze4bkbgja2l4qkifiak37iwlbls1uerevm28lni5gij2dd73ovaz5qypoyhsqhxrc7fh8f',
                flowInterfaceNamespace: 'ne5pzbuj4oe999w5ucm3pe4xvaag5sopnahrgzdctb6eyst07yilbb4zoh90gh0p2p5b7xsfunz6ak6dlj9lt1oep0e8g3gbxnxvul7ii5v9ogsg43kfufrioyixztyg2rt9s7q4d574vhwnhdu31givwwsp4fh2',
                status: 'DELIVERING',
                detail: 'Aliquid odio ipsa atque. Quas deserunt earum. Dolor corrupti optio. Perspiciatis error nisi ratione mollitia quisquam. Ut modi omnis voluptatem culpa dolor id eos.',
                example: 'ak15ic1dpbv6ctoeu1ge4n3wx5jwic579kdwafc8loobu088h9laenlct2z5evesxnb081los5qod4i3om45qoq4soki5x625rlupwozztn5c3sx1bq0l6zmtyj34cvug8344wbqrihfh0jmcy6jdx1n4prdbau0',
                startTimeAt: '2020-07-15 21:23:19',
                direction: '0f3s1gqa9zftk7gip6vo',
                errorCategory: 'r2yqpcinoof9ii4mnt203y3ntctg26328e04cjyusw6z6lgep4eacvci0ku5srdti091tuxugi6nyt17kgighqpjhvxkhq7oxjlocr4o91datajlmfxpttg4p834tefxaxvbqu3coxmiczi0zd85phccj1kbqcu4',
                errorCode: 'hfdkq58drtu7aziswd91',
                errorLabel: '3851p2bej76py738e6808kkoxxr1adqj4vwqnf0mhpgtaw985e21kqwhwew9ebfychhxf3ris9g92833xutwo6e5g0hkrdbfpfzf2cudjuz9abehuadzin20zn3nfucq7y4w2u97b9pgfefb7taaqb0jmqx3itgw',
                node: 5865506868,
                protocol: 'pkrseichlsdi3dwytvl9',
                qualityOfService: 'hg2ejtdbduyibh0h02j0',
                receiverParty: 'vma1vv0dw0kqx0ndfiejyrvtll0jytl2eo2m77kr31c5tnis04syz6bid79qsw3rjlokhsu7odjhzkab5xod892jqugqwg8ted69lr6juybbq7b7miawhjzkc7az4zxqal32jbflhtgz3jn2o4le0ugwpcv2m8rv',
                receiverComponent: 'lpiwuus23vlrb88ff63p660grqy0ztw1s0zezzfbmdraoxmc6uog55sbo9fvz0kcejnscfji0dfqf5hi3esveg5sunttklqrs5mggvnkygsgk5m4noqmetlbz1ohathbfidhs85s6qau3c2xcno2gsdx4bng74j6',
                receiverInterface: 'z43ktxngw1d520i09h3781kg858lei65il2tgskvbv8q6ikhnzr3q6k0pvfzfykpb491tjy3usp1ugffl4l8pdaeve2au0affoyf6t5hh30wd28qav7418doivl2qbidatarxdno04af0uzq07ryxeuwy9vdckm3',
                receiverInterfaceNamespace: 'pmdfn9y2ypepdymi8vqvxqui3g4ipj145cbejpusoar5px830lpf2gzjmxm0tuxdbhckpygdzv2bdtkaacpggtrt2bwqgvxprk0q0oa9pjl810fykvnx34eadapomfrxtofb7mo8mv3b4yf3cqb73euqco49tl7q',
                retries: 6703936233,
                size: 6369251038,
                timesFailed: 2550502514,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionType must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: 'qy4ibarb2ca6clirq16d',
                scenario: '3v16hjps3lohpbqgbz5uj527f9qvmx6cg3f81nzlxk7iiuprm6hvmg26a52e',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-16 08:48:56',
                executionMonitoringEndAt: '2020-07-16 17:16:26',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: 'd876u6oswj64z17r1y5y4r9a189hfv6zrz4n1ac5nfke4fteg4hqlaq40znhbvnfwm2epns5lylv88cj105kcjqr51e0vnuqtby7vkc6obu41zjy05sn4gkphrizngjrhded7fpcqr9qy91p3puxs7jbu5z4s8rt',
                flowComponent: 'cxrzy2d7nkfdy4aqf3m97to9hvpu4grcpeyfnxso6gr5xfjkobj64fklzrz351gibiu7rg9l2flt0w0iib6ppu0dkksmfzlyd7g3z2e98uzs6kwj64owz76xwvvp79mrgcejc2dctdjm56hcnlj7050kqu619nxl',
                flowInterfaceName: 'btgajd1r6jrdkuprr7xof05khkpev76bufjf2ft7b2pah3349w19nrrecpo1eu4l43hw0c47jyy4aaczr6igkx65n65evu9lbzkji5spll7jqy4dtdpe1cr9cbyw7uyrsztwk798lj3k06sii6yeozvrfdzhgbgg',
                flowInterfaceNamespace: '4u4ck57j6duns6pxb7o17crfpyseo6ix6rlzl17yvpiur4qhi8lgoe97i2su4qmo0lg8i0paylombkh5u41mszexotltlk0zkkzgwsskg69od4kruhqivv642yv5dlsolfngeukb34qdhe34m2tov3ofe4onikzr',
                status: 'CANCELLED',
                detail: 'Hic non molestiae exercitationem velit ut. At quas veniam. Dolorem adipisci nisi sit nesciunt rerum aut quibusdam. Quis dignissimos facere repellat. Ut enim dignissimos aut eaque in magni ipsa. Ut voluptatum autem facilis iusto aut.',
                example: 'oh6nx9khz3yhvjzqj3roq213hskr8f3ivd3wrqh702uvjslf2eomkrlsw5zlxd38divdmp6do1hag6bjwbkamm0c6a4n1g6dq06ipeajastomg29uxtl75lk4xsxcdcjmnxr6bo7nzxqomdebsr6gj1o7oad6e21',
                startTimeAt: '2020-07-16 12:14:50',
                direction: 'sbkxhusqrnirdqc0qsb0',
                errorCategory: 'vkhbrgs4dpswlp3hi02py8vcwc12xgjogqx4cvu44e0bjx6rut1hsn82on51ey56utnm2p793vy6v50t4e48pux8crw50h4gys3jupz0kwoi4ovzvhmy8m6kg0c2o8t8v669y9afm8g3kbsaxeggf5ifgouprusw',
                errorCode: 'catd33dv1ext086gk8fo',
                errorLabel: '0qe31ui9ktzhay40frwb46o8q1x0fyedoik8hqukhjopaabjmhf2pvg17hhx6z23dwbis8nkby9xkmstkqmfkmzya70c8i5m8pq9sw4yy5j44d2zl8acx6aash4evyqu24rf6st2mmgpw6s04q76px2qy5j5bsk0',
                node: 9507417643,
                protocol: 'r6emdk89aqnzosj8f8k8',
                qualityOfService: 'sc22jriu2fxvdx58kuhq',
                receiverParty: 'bu3qrce95ybwht0fbeyzun82m5fc46fzka37668cxi6r1c4wm40eryq2nzpwkiial8rxc8a7xdu9ze1tkpz0vkfkvw63p518ac4hr4xz88ig6a5usil88jeryn5wls1ruq2pndbx4wf3x9z6bq5axlqrvkqh3yzt',
                receiverComponent: 'cg15y4fp25uv6rqcqy7lyu14ao2v66x6twckrjo6rumvilagss03bkq05y27x5t46uuhx7lmc2pncscdxsdzhyt0nj0r2uvnpjzfqr99hvzldyeayqdihmj21bgcltyp0t6vvfi6ailxjacxyr6mlinr3clgv7gi',
                receiverInterface: 'yxkhrx7ym1ie0l76luoxjbg9z61kfwn50fgo81phhtvo3601iq7425b7oztmh0hi7k1j865yuoim4b9t23mkfa0pvmpxi4pyp7e0ao637fqbwt4n0g7mic3446ps02recmdy0qcocbids10ouawnouwtsq0x4lkx',
                receiverInterfaceNamespace: '1yoz1fvjoez3opk1yfk3ga5ui7vn1xvrz7svw8urcrswm6t84iq07i0ykpw72niqvz7owpwtrdjn9yjxe84qpuri46c6sg7ngjty0vrds95ahq1w5z8nm8pvgoeqznft3v2splc7epmlymclfwulm95tw8fqdldy',
                retries: 9599357616,
                size: 3316302348,
                timesFailed: 6899704415,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionExecutedAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: '7jnzsdhk8whkqjdavisf',
                scenario: 'v8tsqdlfr65ljmosoywa37sc73u18dbwoukvfe8si7mkv6wy6dgnmdw2ti3d',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-07-16 15:03:08',
                executionMonitoringEndAt: '2020-07-16 12:25:13',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: 'umg1mrs4o5dph0z6icdyatxdm9sqrcouev5s5ejz0zxvpi3tp7gw88ohy7uz0v4wy0xh1o64l279kbtdd3y0ydkmq7f0anw3szohmm1gjrq9kia2oejlc0a9gcn1rktptpu4k126hdu15y4u5wcrs7iapp4i27i3',
                flowComponent: 'pjyd8ff54gap5t6s52g0tp8i2nzdx1b7l10560296qf49y4ct1sl87uyikd3kkzch18h1pehfafhynbskr5fj92l5ex9py2cu130110kpd96kjcrqpm6qvedjjv7spwen1a1zkmuojh4q35u374go6a2i1zvrwbn',
                flowInterfaceName: '6ig7huyzam6l2yh6f9k1rah7blbs9l3ay9b18t5pxd3rdvcn7s83rbodavtzrd5ve9fo8whux09o1s1cvezplljxwlaowm15tu3kqhv0qhsovwc9vhnrr8k4repp59ajxgx6aiogbw1sykeh97dqyuzolmvo0gxo',
                flowInterfaceNamespace: '3mb9qk6mrdsgiq8hmslq5vgttqkvgkrzfy89j354v1yh6o32ag69sovmq3f0m3gjj2wkgnp1pzalbubcqpkbeswremzafq2e3sp3dtazn9hs8ndocg2sumv2oo8lxzh32erkmqlqmxa7z4aq7bici6nevwi0884f',
                status: 'WAITING',
                detail: 'Tempora unde dolorem necessitatibus sed soluta libero adipisci. Voluptatem facilis amet saepe officia nostrum veniam culpa ex nihil. Ab accusamus aut quae temporibus ipsa sequi. Nobis nulla inventore non itaque nihil reprehenderit.',
                example: '6u3n5w13itey07z8l2tbi6xwja7t9o6x8vs07ug9o0vps3njxsa64rv9ul5svz2l30c33xnrp6uzhl78ykojd6wc9kemmmtd51s4cfk6npdm1dcwc8y4rbt9jww7lr61bx5wv3gy6rw8h486r0z3zbs72kvxt85t',
                startTimeAt: '2020-07-15 22:41:20',
                direction: '1v88egk8b9xwfwkvoepw',
                errorCategory: 'bll6r2ff9ngd7af8bvnolhdmfjyc9xn74irjzl2sqjvk155zz5zcsr2ckbzrlj4anc2u16gvtyysvmbh3jn3yi5n5lhqsgc0rgb90ul7q5b35klojai72j6gtnus5c6qgco0sviivoazsks03tu55jwjaieahby1',
                errorCode: '3ruz0my7b36g5v4zl6cn',
                errorLabel: 'dqve9uu7g2h18bytg6v0ps0on79dfcyiv31jzxx1x0ffhv6wswtwabzgryxak1duntt1jljqnzihrys66tv7nz510cjx1j63qq0rw7cc2irh8jni35iqjwbwx1tnbqxjbunpisw2div8sm5x2p7wqxr8yq8vxtnr',
                node: 6074090532,
                protocol: 'wvz58ggsyllaf214bjz5',
                qualityOfService: 'o4dazo4h716987mk396z',
                receiverParty: '7l32ajdq26l00dz9gwtq392c8osll59m828z9zag1zoc2oqfj4udnomg0tx1bleptdyg9dd51u3r098ub5skowy71m41h18w32qjt3f56y9vmhe81wajgh4uwknobvgg855wzz4incvr6kai9zi62w7v68gxnmel',
                receiverComponent: 'qy6nrk7mdwhb1704lixpogh4659ma05we7aphkws16xtqgisswiefi13ixcga0mxjy3ci9e9o9zg449acten5cbcwuvm6ye4hdiq9q0uwpsza9kyncyq867q54dg61gmfyvrwi9w35r1q7yu3mzjf3jsihq4y2rz',
                receiverInterface: 'rcdfhv0oz2g5rmhxl36m8hldkpcoanephtuuraibe82bs0gqw5n4t1sgkra2vcjub82j7e9ktsrkxfpcrhm79n2zf6ufnpsop6h6exgxc7z4th5ne7lz06wawg5cjuio6zizcrom4yumpnj7fpqvva4233rb9ch8',
                receiverInterfaceNamespace: 'buntoxbha7a4hawxioztlu1obmtgxh2cyba8bakyrbyx9lzml9kknx2prfepyb4zabgn9doho4p3xgaknoidpwifjx52t9tt4m475pmklgbu444rnozkx2zj0cobn5beldrsgilzmu4mzkdclz0w94zktiww6y2k',
                retries: 1327143366,
                size: 2600904029,
                timesFailed: 3800311419,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: 'wu1jfndnmchn6fzltx5g',
                scenario: 'joam4yeo7d71g1dtm45z5dok8tm8k1zg258bdxmyik4az7witnjmmlcwtpup',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 00:21:10',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-16 15:31:10',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: '7h4s4kltlz4k5yfbh6cdzs0mmw8d4co491yw2rf6yyrnw3vlmyv5enjc1imz64zkqm89ugjjjiuw4s6rc794bk3yvd3j9vcelwo5dmhpj8q5hpnszu0o328z0ysp7svvbaibuzm56gntghxmzqml87186zml7upf',
                flowComponent: 'jmz0f0kgw24l8m21msn965ig0uerkehtub9qsp2ktuiuzsof1o7mkq7rixvr42wxudavrqo4132o63mbsbqd4z9vcrzsksyi78ecs3i4bqw0iriy001zz1wrgd5nbozv9ttyazevhkt1pgakt5otpw7q15a2fbeb',
                flowInterfaceName: '3a5ho8y5dko52kd3yrtl17lyh0d7oz3t6l1rj8dl2fbcua3d78o7ihe6sqi5of4cp0e55k3p9tbi3ldue9la5x5k0i3u4ko3njbpguwwsq8cp8ngein2cubt1k0mxa608hyek2fl5ohiln72kulaku1uxycove5p',
                flowInterfaceNamespace: 'usilvous76gjl6ny906jtkta1whl0ser104tx99604fouwlo7y18xwtb9fxeoapbo0lg1c5vrsmhzpntft4yfkfndy5nthwq3c4ed0b2qyx2tgyrw2yh9urkxaqikre55goex94v0k8h4ie1ng4aihxxbsruvmj5',
                status: 'WAITING',
                detail: 'Ad repudiandae sed atque qui magni iusto et. Placeat sunt reiciendis odit vel ratione beatae ipsam quisquam dicta. Est ea qui veritatis neque eos temporibus.',
                example: '4lp67x2ckmgf5o5my40afvarzu2npb1nj5iirwakr3y9yp8o4bvdm268nmi2baixuf1wkm4cbdr78hvr2exhg7wvq49i7rggb9wqmgg0yxso7p4s2lxob6eifdld9ipepekaux5359pbx82pulpse5cz8jao2r3j',
                startTimeAt: '2020-07-16 03:04:16',
                direction: '1gzw2v0nfozco373d0cu',
                errorCategory: 'dq3y8pgkiyaf34of62wj6eg9f2gcah36m8nlhbwpqho1dklrud8hk81tihbnbvqa9ua22zwkzjf738jbll9orpi3ske2m3o07qydq2g9sjq9lto48pfvtu7mv1d2zkgg3kbyqmyjy97g3bz0s83bgx1bpdsulw00',
                errorCode: 'jipo7uwciswbxxy7wb4m',
                errorLabel: '01nax4q5f9mt520os5ek5whbeo9zaar9oom9kuygy0m42ue4dl5ju0chc5509b0lcw860s27t23ph5j06ieatypukvirpmhvthep7e1k5i88hzxddbi2dr4zax8jndfgq367i040yaoztuyvguu6omnequdt1tem',
                node: 7097201427,
                protocol: '0liabrv7v7c4qcqj4yxb',
                qualityOfService: 'i4s9a1a0w2koy2f5tyuz',
                receiverParty: 'mvwjyp0u0f1caoak0izou1tmam5b49n6lzx348vg648rr5yyidk1crh4pwo4a6qm9kjdnk40b78muulxh8gqicv1dxnpchm2cli1vqb9r0loplgi2lyu6adlgh0spqyfdvb30hnch63xy637pwmkf2ykki6d4v3k',
                receiverComponent: '5z43k4du9ymlwi8jrr3kk1457i2nwyqzfbi7wthe7784kv6f765fzkvpjj63wctaqqqawiolp230xqxctivkzl2vbp61b4fh4yobd205u3tai6kvaxt1ewtoneypkg3pr5ti60ezz5i4vcch390gml3hln9hd80h',
                receiverInterface: 'xfjytqg080m3plrb9u5dx3wt81rg03725v9yirir9761owpavhuabdowdfsb60x59s5pdv61ylgp8icj23q1vv48xb3das2egqbksbtb9nvcv5713r4wq6292skoumcqlkp14s3v0qe9k3gbrsa9mwfcdk62vsbj',
                receiverInterfaceNamespace: 'st8xcmpjyc2ilpscw11t2c1yajwnbt91uah61obnh8w5oq2xac9p378l2u0uc7651oi3vu9znw1gx1pe04k7a6q23czujo8ncryj2jcoy9f0tcivsp0v2mzjuhux2sj1qsesuvh2jyvmrq6yukag3pbmzm3ztie4',
                retries: 5383422379,
                size: 9759694628,
                timesFailed: 3258661145,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: 'twcu0u76p5p220xkw576',
                scenario: 'vlf0m8klxltnzgf7orhz6yrq0bdjain1wipogwg0blbmlvzkjgl1gxybanaz',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 14:49:50',
                
                executionMonitoringEndAt: '2020-07-16 18:48:12',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: '8rrx5mw7rw9momv0alqnoipaq5w8jvv9jvmbva189lbxu11jyvkr9d7567f2l4bfyg31ywh9cfrfgkmohvj6p62c7rvq3zhwi4hfskb9shrfzr1t9575irh8hh0rglltzd1ktb11kb48x5eflvsd5e2q5phkei9x',
                flowComponent: 'u87d38zdzn9r6csrjjplb3r5xah8zu5v2dgnqvgzyj2685iyhdut7p7spagf4pi3ypvvrut937twxamdtdnw8uaptq8jsxdr3yy6xr07nj7sjzrvbp2rqhxw0ck07x6ovr36we0qmu9cy1nt2ndq2jswj64m5fih',
                flowInterfaceName: 'tcegwyiz6ujfbs9fja4h4zltu9o9gufxxzwj1lkxm7vd314agd829pdxrsh1y6gkil4nsruertsmur6ae6zcjj4f2bysdzgb6xco87mi3mxnzsp36jtjdls2wj3d1rcgpxjbve9agqgculuni7rz4b0zdu6pj9kw',
                flowInterfaceNamespace: '86x7s48e85c1ljbsp8ehhcbvxbq1vig4k6o2xg3pn3o3c8q9cm5hu9h8uhlyufikk9452cc3h8iql0smu3rcm5dl0g1xzlk296aklcev6upflrxfddtjrloam4grk8yjyp0u8793tnscjs8wssazmprrw9fmhsfd',
                status: 'ERROR',
                detail: 'Debitis qui sint quia quibusdam illum enim quae sapiente quo. Dicta architecto saepe deleniti. Aliquam reiciendis iure eligendi quo.',
                example: 'cw7yn981u0cpvtwbqxiu8thn9mowbdpnsphfw76mr5cmh8qof2bcv1hjn8jxxumfekgzldj14gbgbjxlszl4vy61ye0gzxlu4gtm2a4lviuit9bco65crh6ke8cvdzl35pnkv6zyyz7smgnksl4kbduq34aeqauz',
                startTimeAt: '2020-07-16 03:32:28',
                direction: '1n010rdevv0km522cbec',
                errorCategory: 'yfqd1ggrdue3jqi0eyry1ewyjl3igjc766sn0xcbjpwbkfs3z55frp0vw7ulhnjrlqdeciz4njx5pzi7099flj0rrjwkmsaomwvof8ca0awnzzrqcxz3vz18t6njejwm9qdbwt6vq6isya3k2dwct2vk2tdfcayk',
                errorCode: 'lxtkyc41mpmtxrctj04k',
                errorLabel: 'tdnysy2uopyzwp2dow285yd16kxcjo0qpxlz6eh93hcu3zaovifh5rbjfh1p5bl2ep60q6gfbf79b3815xf6qecxeeeush3y6o4u2nz0qmdpw2zawjzmk0ew86tccebypc4gosazfci3btkbu90filcwlzwy7y7d',
                node: 5533374882,
                protocol: 'gwurgxd3x7rzqlz22jix',
                qualityOfService: 'sll8waud4i3p1qi8e3n4',
                receiverParty: '42oodc91kgp8pqti652m6dhsil7vmv6onp4g1ujed43qlmk39z74ov0t04a90550oz4wlxh8yl6235qfmpc3mhn2n9gzfxkk1uy9aitxwmykcf7jmq578hqifj285a4p9ytaya2nmas4bogaqn2nhivdhl2ojaad',
                receiverComponent: 'ylkoqgvfsk89hzsr081x8lah78pn7g4b9ilgawgqrv3zyo0a9lm3v3mi7940w7ghrwzegf15wko0bqof0c2zs0m471sm8jat52faqbz7g2d9byi32dagksbze7124nb3zc6drt0v92n006tlydcgibo1edu6gadn',
                receiverInterface: '2fhwx1ddwod42rhr3h6bviin1l34pgti6agp4twz6u0yogql7rkyk1ux0er72rf6xuad9i86gtp4p2ccgju5hhboy15olytb6s2hp8atilw3u41t8kbln6zo6aogy5tjvf3k6hxvf3v5o315trl0sb2id7bsnn34',
                receiverInterfaceNamespace: '8ynb23yft7w7xlguu6xukgxofway8chd6uf3wrq0pwkg5so780i13xokfuok2y9n6w8yzu3k0fp6il3r67k5zvge9s19egz162xymquwu5sl3mgvg7ls5o314ncrbssu33c4hvm18riqg574r70xzxigt2sifb5d',
                retries: 4281684801,
                size: 6428876104,
                timesFailed: 9394571956,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: 'zs7h4amemue9qogd2t86',
                scenario: '0ikr4ltxvhm58t8vii2edpou3b1buh0jvxf7w0g2ywxn698dm2wcshk3ge06',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 17:53:18',
                executionMonitoringStartAt: '2020-07-16 14:30:07',
                executionMonitoringEndAt: null,
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: 'wylc9d9qv9xkmqtwhn80q2k20nvfl0bmk8lh97sgeqcsu76i5g0ppp6e4r5okjvxlu5l9ox9yccm5f1t3p4089l5rkte0x8yphp7j9rszjfg62x0gom555k2tja0j7zbt1edfsge4go00hjtyxldvmgepb6r5mtn',
                flowComponent: 'rk3kuyi7y9d19qqilcuzrhdlyy9ovrm5hl0r72n20vjc4r4pyc2xlunwnfm42ym23etxtphbfcvrpnzr1ayx6jhmghhlzw5aak1547tzajc830n9910oprl43cg8181zd13mzti1u19es5pzjxjyhvirhgzecc2x',
                flowInterfaceName: 'n7we2keu79oift16fs8fseymwr9immikk5vwma8cgmrr9ykvduoxx5hruhumgj53cv89gxiq5hlsajt7caxq8lnytfp348ui7p9gfg2ezfzf8hah4r0tcxetalx3mygif83cl2si479pco12m031ex65rqutqowh',
                flowInterfaceNamespace: 'vf2tjutdqwdwruusxlma1b30nnf9lgk55irc4pn7a6ezmg4os746zqk7rff21iqhewdxt2oal4bw8qf1v1kmotak8zqs45wysdnuf40co6y6n137488rs9m20btkxofcsg54x5337y1x165tbhnwjs52mleuj36f',
                status: 'TO_BE_DELIVERED',
                detail: 'Cumque sed non ut est dolorem et aut quam atque. Quam consequatur beatae. Ut nemo necessitatibus nulla. Delectus dolor facere omnis sed eos.',
                example: 'dchs3fmcflaaxnovgbpoertsik4s4dyb8b42jotu0ce9wb3vhum80idnkr8azcp115f0lvc7hk9xptix3ex5y63j73voi0sgfp231e2jh4e1zvivraeqe0wf1q9akko4fylnq5dwzbb4ouuuyrkbpznbhqgetlm1',
                startTimeAt: '2020-07-16 04:22:36',
                direction: 'iwpzo1xe902fbu5oq2d7',
                errorCategory: 'gpditejiyap7qn2j730nd8ew3lxtj0ahxnjh9dav5iqqa615n82j8u7c5ks0qycultg42uw1bh9xua05vd7yp770fyo20ps1ud5uh1ljimeicp7qox3l8899372gbzgenyl2iaa6a6j66erxog13641q89w9gn53',
                errorCode: 'qph79oa64ffw7ecsg3q6',
                errorLabel: 'yj8pjkojedramwbqvd73bk1e7ubus4miqvt6fgukqqwcwhor4qhbwy1w8ec7hvgwp7b61t0hnb4wihmlsn7roa1omxy84u3yuets80ean0vlvca8ffi4w281ihnqt0tynip20pi6s08ki8yxxtpp3scnidy4p2nb',
                node: 3075417752,
                protocol: 'a8begrpdmgqiu1uany7v',
                qualityOfService: 'fbccwpgrquang3hte4o5',
                receiverParty: 'mddbs0kmgumbre5ccdjuf5t6onnbevctjk3rn01kfh94dpeqjg0oi0qfg7udu9v1yaydewhdh41g7xkadoi5jnwhmoh42kjtr6bov1n1wx2a0t2kw3d1g6wi2icvfxjsqwuc31wpfnlnhnl4umr0kj8mqi5fbf91',
                receiverComponent: 'nxr7d3mhehf5d0jsgkt2qng9j8iu2fjvflj3s9n1czrn36sfq0c34y4u2us0c0a8ur4sqb36ks7gzv58gtocgztbf85wcy79gwc2goz4qk4qz923om2bugefsf4yb01vf4j823g79c5z6hu5cayood510fpzzeom',
                receiverInterface: 'c4yo5vd5jc407jp4l1pdl8o70lijhlwxipr6474v2lzx9vzs3c9okbrlriht9i1h6kp97wa5ljj77tw6c2diodzgsxaehakg67lsirrrya624u6cioxf219ygl04wfgon4h5pcv2kexjmsio7dsyqaspad9t9g0s',
                receiverInterfaceNamespace: 'fy0wj2tf6usyc2k5njfvf3xpw1dc2pnxoqv65svctc2yy7gowaluvn7yhfl7dozn9f651ui5xtma5k5q6prda5o3rph5v29vgoxlybtmtjoedesilnengptx7bvdx14bc95gaesxg91qeiwx6r2xhru0sjti9c4q',
                retries: 5822840534,
                size: 4738168789,
                timesFailed: 3687232989,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: 'tvka2qyxxn2ro2qz4lt8',
                scenario: 'wxgrt1nc2jppi052rl2wutfl4zr5l5yxnh6tm6s4s5rzu16lxi0lr98yenyp',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 04:24:47',
                executionMonitoringStartAt: '2020-07-16 16:26:48',
                
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: '8aw2lfnimzcgnnzjisb7j3wzxhq2ov4vis0jsb1sngd6z7pfgg4dqs3d0yoo3eg220347emgt805jc46uv5hp558ud4ani1gjmw240n3qn2la52776re1mqczinf3bw558vhcauzstq0da8nj3mts5ejd14am8my',
                flowComponent: '6mygpdvtjx4qn4vv008slut6pk0itqt7wxsjerlcwe02hwl0qvosjfxlwc9x0mq8f1njnwm4qjsw97gu392bxlyk8olc0fbgdbg15b5c5ubrhw2o2gaba0t0s4u7qii20q10l420o0t5o53xt0nay2czf8i7xmkk',
                flowInterfaceName: '0wb8luugirl7pd92wil1h09rkisiwj5cia7l1k5dtihf28ma0z7pspmuymugywot819t9xyl0358jty5d6hqe99lw0r18zkn2e75ymi0yjcc4hpsoyhca82xj9gcb4ayii5ci1ald95bwumcejclqc7i280nypzj',
                flowInterfaceNamespace: '7r9f8wbpk7syu4idgoj5x1z54a1twfgcc61odqymky5nv0vixwgxmnm0hdahbn5zey8xy5wkpw1amfzaza3g2sichbmue6tis5yursjdwmyshamqndq3p3lkgwarcn3xkcwqs0hg3ik7pbvfzc1sw59mzkb4dliy',
                status: 'WAITING',
                detail: 'Labore sunt velit assumenda dicta quidem perferendis maxime ut minus. Officiis natus nam maiores excepturi corrupti saepe doloremque atque at. Nihil autem quis. Sapiente voluptas odio rerum quaerat. Quasi qui tempore magnam. Maxime et tenetur qui quo aliquam itaque.',
                example: '9dz5y0u1r42igaz09zdhwrmngi6l13nldj1kwsci18s1ce4y4dfng71c6h23c7ba4c7fplmx58ofvyssng0tva5jybcqx4us27u03ccxvuzxvpzod78jtcfbihhtxn8xfb4z17fh66j7i1abhxrtxty77vhknmy3',
                startTimeAt: '2020-07-16 19:10:21',
                direction: 'rxx6pe722b7lb0m8fm25',
                errorCategory: 'lzuoueobe7r5qq0a8uoa6gg8m140wkumht5cl9khe1e20xccmvy7tsb36ou5r9yobp4id4uktz62ncsyvfo3kkyfm1ezjs8vnrm1kt1u08eoky6onj9acmhz38t1u1litmgvl8hrj0fytalbt5x0z24gqoc8dkcp',
                errorCode: 'icidy5qtmbhezaty0d0p',
                errorLabel: '05m9ut1d9wa91de31k61crz764ymujo8wtdr6v9rif7eqx9s2ka5ey855wenyx8i5b5bkcxrw66q047s6jtek3kcyjg2ycbixus5u5ke841spkhlo6lxwyccqg9ecqej34qntewdlivir91cx03hkwsn56zb39ex',
                node: 9012856771,
                protocol: 'z6fcng1vkz4mohbgsiwr',
                qualityOfService: 'ju65m80ypfnj28g57vdr',
                receiverParty: 'pi7fxua1906aoos0lsb64da3jhnson6wxdfo6p6p8bebzaf0oijpfudo2qujbpmh73qvhpkz67n8pwfnmrvlb6nzrk860rxd0ml5agym4nb9ri10oas1fim4fvh8ur4qdsulbtnhfis2wr949zzkqp033znnb7z4',
                receiverComponent: 'hq2k22tv3c1fxer3itrhx176ztpqyy4mqfi5wr4n6h5u4n5y4wysbo33gpvmggdfo7ycuiv4of379lpmbq9wve9offnjtmc67ifdshc7cayi0fxxkdvo3jpgxrp7q1v9jg8ceos3c4dewl12xuyi86i5km83wg7d',
                receiverInterface: '5weuvc3caqu35rcdu89ndk3024ws5hzvai6xidoesl982l6h59xpy5732ph7ss54jhqta8mn9go6psi9nb5i40a8mkj70aips6q99ccyeueeatbgbpviwyoa09u5gj69ua8fxsjv8ld2dms10j6wrp6ypy4janf3',
                receiverInterfaceNamespace: '4bbz5yu7kzn5pyxfqaqxu1as0u3xk9onj9wpbv9moauomugpzud0aoz746uiukcn5bqokl0yku0gxxay4anhcommf37lhx7kwirvorv2r6q1o6t4yxdmw6w3ovzkqfiy5cl318ekdlf6c6pil4a4vagjso34t03h',
                retries: 1168595569,
                size: 9592559656,
                timesFailed: 2353730026,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: '0jhhuo2vknszpm1myqri',
                scenario: 'i82lk50k6xp1rm06ue4ke0cv136qygq6mta8qw3lclk3rd9qmxv2pdt4v051',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 03:45:16',
                executionMonitoringStartAt: '2020-07-16 09:13:15',
                executionMonitoringEndAt: '2020-07-16 02:23:47',
                flowId: null,
                flowParty: 'luu80pduiu2srwyg56lciqos217zz3ca3jcljo0bd9fd6bho0id0hv10ibp78qqsungucdmqcdyyksrg0n8et6dxeeng83koa7ikz3gkwyaaqourp75ztg0k3hrto5hobtxm7mzryphv5je19tsso4zk29irln0w',
                flowComponent: 'eiaxmw9xr2jg6svscvhl2hbt8oejgfhzr6cu3b98w08bymc4o9bxvilsm93qy3lzmlz8dbqdhet8pmkp14ds30japhhdz90hwks780vcwzegr57vy7ht0xec4710yzfteox5g3fvopcue3ybabclxqctqgqnig0w',
                flowInterfaceName: '7cerhlehrhrp60liau5tragtd1qx46g7ystemqx6qnqfcrwefahhbldywt2y9j1uchj42hbmhqg6tejtps4w3adlwpj09thshqh7v3tpcf0brinom2hf79p30hpxnxa7csv7uustrk6itbh0f4331jwnb9oiuh8z',
                flowInterfaceNamespace: 'zyvjweh1bkjtkhh7n2ufeo1okeijkwwed0dgcsies9lhcmma6yzoy7wef1ur32d3tzoglb4qxg0oi7hl8tszqjbbc9iektz2u9rzb6nticcss4y9x9saers11zwkkfeposhg6r0o9a4d6ayir2b71bksb07wlq6d',
                status: 'DELIVERING',
                detail: 'Consectetur consequatur consectetur itaque ut. Possimus quia asperiores et et. Repudiandae numquam eaque laborum voluptas voluptatibus nulla error rerum ipsam. Quas repellendus pariatur. Et delectus repellat et dolores at asperiores.',
                example: 'keeepf8ud9uyhwadyexrb0kjk965qkhtkp6eje99nqjfu8pec2pzkw7fr70pj9j7l3owxuh8mpedh8or30r7ct4z48nvjie23lrfoa0lc5qh3pdiwwmpsa7lz9f7u1058esg6cqa6nt0y4uwy1mtz4s96691m8tw',
                startTimeAt: '2020-07-16 05:04:27',
                direction: '9tm3i8wfmgn1ip8jcy9f',
                errorCategory: 'mii8r7wj9yma9xz7r3mavpgfokoui41kgmjcxent7c0rc4u28qqdk08tj4dmt4idfhr11cf8rcf997oolc5y0hkfwd414qnrvxgy247k9k7qwkllcp8k8rj7883x0wajoodk6l1mng063bi1d8dbjdg6mixtnkkk',
                errorCode: 'ax3g4ei5bomjkw1babzt',
                errorLabel: '8f1w8v985faf5jscaexwziw3c83bjcxuoys5t0g8imqywufki2jmnszd5n13v1mu626xmdz7g8zvgp7plcjlo9nbz2ymz9upto20ow0m0w3auh21i9am6bxcb4hrzkprs5irroort6uu8swaw4eqfbodgnggg1l8',
                node: 9482839283,
                protocol: 'r7pz9cd4xzmk01wbibmj',
                qualityOfService: 'fl16tpgaf0z47qlgfgav',
                receiverParty: 'p7l15tj7byehqca9mu1to1eldpauyedq9ia4uaw5v5etmai95rptectrq7rgukyt20ukc22e7kdnnzf2ei4m8xg0xe6b3drngt201il8ajkl53botu3c4bj02h2h6e2a0sr624qvrs0bz7cqo4biaapqfumbmfus',
                receiverComponent: 'leebpyb55x3ovpbyifm9twixoet01x68szg9rawdngv9tpmh5bdutdqqcffn1hnez51p1qrmw0g923gbgacs122g6p0jkm6ly59oq8dac50mwp15k2ipmwmqgmr9y22vimumylatadgx61ivu3nb75o2x8ynw94n',
                receiverInterface: 'gpza3d2f04fk1h4yso0chdyehuehgae1jlw7u13va5j88edb3dp2knongy0ezilungd3c0m0jldl4owof9n81vt5dat18qchsx379r3158a4sonp338jlmmn5jpw2lj4afj03oqnb7d6ubsxlx9klskhhsc194bo',
                receiverInterfaceNamespace: 'n5srbbybhchnnkp09fg67f2q0hyzpuyr6oap40cq1hdbwmtkrbflaauzduhzxpwrbjax7kovhn42n91q58dy9wi2xd89fvn4ci6jg6opjs80r99nqochzkqsnmzy3twcrmkohu2s4j4nlwniurfjsmnfaji3alm7',
                retries: 3166996433,
                size: 3215484210,
                timesFailed: 4309807688,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: 'x7sr45vmhx7bw3w9k2zo',
                scenario: 'zvsschd7bzrx3g6351h6gln9ed9v0vzgr56sdulobd6bm61algabfittffym',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 01:20:38',
                executionMonitoringStartAt: '2020-07-16 04:12:22',
                executionMonitoringEndAt: '2020-07-15 23:12:44',
                
                flowParty: '4e685l7z13lutobue3te5db2ycgea6mrq139vuknausqggujvow0xuw7q8utrxsaqeeqapmja0vs5apvipapztlirr5rmkuofonajncfwwgdndzfnkwmjcdrmomrmc9nkc7ximon840nbg3jzs10cd1a1127glkn',
                flowComponent: 'q8txhksn3yltz7f2qeq7ulw3ts24bnoy848ai2tblgbij1zt22brl0twg16dvmccqdgtsbf6nubfpl5rlvubao0259a9vf6fzgy3sfgu74rku25n4mh5igiye33n6obd9ck9fzme8wuyvg48avi2flkppuw4yewz',
                flowInterfaceName: '2f4irdp1c5ujlz0um16d6wuvpc1cu3fdeabqg5rfrfu2i7g3fr488uaag1nade4rgriyhmhpotzc0i24iod6gkf5udkgvobv6si25er5tfkghq6rpexd67e1wqnbzrnug705pf6ojiuy51wln9tqt8vn216yp2fr',
                flowInterfaceNamespace: 'loaiop8lpjdoa1rkqodrhrcimxuguflrpj9wtovkzllv7esirla7frdjb5rsa20wt5xlj4dafr5vdi4f4zqhsmy6rznb5g8hqeekxvyhkkwh3xqxptvfssuiquaxlmtb98du24be8vfm0xraa4hwofixb5gy9h5t',
                status: 'ERROR',
                detail: 'Tenetur qui quibusdam aut. Molestias dolor consequatur eum voluptatum. Corrupti qui laboriosam qui iure assumenda hic aut. Voluptatem et occaecati atque alias architecto saepe temporibus.',
                example: 'o7rue07akg7yp245q8ibfwduh3ftir9v2mhhf3w521jsaadqwcv3vsrd2bvqg5l7of9t94oerb6zsscdvtuz66ccbf82hr7vh9ygcch24iztfjy7ul8eh8dnz35h47vh22owgpwgrb373az5zue1eefa1fhaezzz',
                startTimeAt: '2020-07-16 03:48:39',
                direction: 'sihj0gglwvx6j65vd4fq',
                errorCategory: 'l522oegn9icc5wk2nrlu39rc0sgwigitgdd0yj7f0wskmvr0jlekybez7gdt36c1m670euqxq7ckxrtxeytf5pqxdvq535bzus20f16c6ztbnlsz8n7cov4ebk1x17kt69b2sqkw733ssng8twj07um2mjtkja6m',
                errorCode: '1k3kdyepwze0wkkfuc7n',
                errorLabel: 'q1f1055jq3egzjyxqvar55kd6q7zsnxy9tbp0bnktkja923i8o211tfjnwd7utlnsse7iaeoeo1c1yg3jcyh7tpjz0ociuxbwdkx4ugwwlqwdmagylq1u9okxmuoq7yi7qtlerg2fk9nj9j8oa678n7q6vj3usew',
                node: 5836559700,
                protocol: 'bfcdbeap7863qq6mceo8',
                qualityOfService: 'hjvgz7jvkdximofwp9iq',
                receiverParty: '02dyg0uh9c2cbhiidx5zwklldio45gabgn0uhh2bxh5liwdad1hadehmcsa9ntum0gp4aiez2e0toc07jx4fl4cq6a06um5hzu8pjd9phk77xoztwkaa4r25w4b5ba9btl689gy2h2tb8fd8rt05hhwh5qlr66g3',
                receiverComponent: 'tyor1he48fj40cprdnokmddgv6xzasal0cfuursbmn3lmemrc2n0gtw7ulkifp6wml3vqba3b15qdiq5zeijxp5vyik79rf94mxjjaxxx3q6ig2lb9geec0bd9nhuwnne55nazmatfikrgil7byr7z07zt16n4fg',
                receiverInterface: 'cf7y56opk4itwo2f5bga3env4sjnnckd5nzs2wfdpnfo7r1harrwfmwoshkcuea090exor264up4esb29kb1wxmm1ucnqrlvqpn616mc9xrmx0brvs25rk6dap79vfzzj5jv4q986bw0rtd8nl6uknww00qc7gd8',
                receiverInterfaceNamespace: 'rng02uzdew5zvgphqjlgd4xhsrw4zw85bw1w744pndun0p9ph3eak4anx55waejdf54yz89lh0cke0f55fqt1yp2i0adtz4fgr36vxagtyg33hfxr50r7jtuwozk5iu2jsg7bctbnfps7w6au4d07wqbu6dtsez3',
                retries: 4725635127,
                size: 1823365173,
                timesFailed: 9071689182,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: 'amh5nx8ff8kce3i93zpq',
                scenario: 'g32alk3g8lyltu708ia9ok8v2jrl1vfbanfi0b08h8t3rhjgtjhcilli89vn',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 06:08:02',
                executionMonitoringStartAt: '2020-07-16 13:33:40',
                executionMonitoringEndAt: '2020-07-16 12:51:02',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: 'iu7in29r43nggv3iyf0tlobe3e60ldxaogfsbuah6yi3r57dkm3n8lcwnvhw1fasn9i29pca8diinyd95bq45n1fhtkt3cg26qxo65el6em165i9jk3t275swfo97yjwlxx6lia49kbe8w515xko4f2yf54xsd0b',
                flowComponent: null,
                flowInterfaceName: '7nr7hmma74mzys255p4gl97wg7tdgi9ret81fj82ww2eb8dvrgrhagxush7o61hz3m2dkpt0aq03e7rg0vlk95pl525bah6oackqvmwaqjn7t72fmacbiv5rxr5d4flx2xzrwjmv9drlfbzkh7o605bla708uyuz',
                flowInterfaceNamespace: 'r9a3ub8wraiziyxg7t76vwg92msny23s206kofs38h104sicm4jjzi6rrrt6bvv6uch68qil1b0d6moek0lnqtyyx00gmajc6gl7qq3j68al5nxfgcvo0hhoipysw9nt00wtqdjzpetzvsnzurw5ci52tqqanwt5',
                status: 'CANCELLED',
                detail: 'Atque dolorem quis sunt. Distinctio vitae corporis iure explicabo autem quia. Dolorem iure labore aut dolor. Voluptatibus ut at dolorum. Et rerum eos quidem harum quisquam nemo. Et sequi rem dolores repudiandae est sapiente nesciunt.',
                example: 'o41xa2pviggpoyns4xhu5jyg8kagrpr2f6nk8leegc4wrauxkgs4qsxdveu4unavox53vqibzdaf70kbq6llbn67ppstnm2aexg0k5add4wtfee7s3hmvnwr5iqxofuc754qov3ekbhnto0ko8e4dpoeh088ghc6',
                startTimeAt: '2020-07-16 04:49:29',
                direction: '46wt6ovv05bn00uiwtil',
                errorCategory: '03txvxc6d2mwcj15yc2c4yhguaidbg92effjzp4clcd72pzrqfrsstqms3zu4i5bkjljabkze4o9z5jugzmosb7so8jhl89264lxefr1806u9ekak2ekm3lonlr5m2ynlxfin1yd338u6ggolyc4tkm2ssa1834o',
                errorCode: 'ytbojq3ws6oe16p3febi',
                errorLabel: '09ieu4nk38s0qiq03nosofm2buwkwnpdie7mlr2dxn8yt7lf67f6znixmictab0w5lpqu6v9v95z79hk2s786t1wtcrtp0flg2xn1w670xaun8hta53nqbgazcdsjlwmorplxf99a3lah03zt9cgcdvw0znk414w',
                node: 7676094730,
                protocol: '9ymuyjfgfi9oahhzaykk',
                qualityOfService: '6prrnyyckuthgbz1j35n',
                receiverParty: 'xzph21k0ykip105d0lx7c1u2h4io9tlkp5tphscc7p6l4bfx7u8ekb01wbausvbfnfqd8bbwkdcegmxiz2ceu70bsx8hdgnlmp2h3lcs3x15ntzhcbfgltdwsltjoqyt3g00k9zug4m3ox3l07aax6de9ddgbe2t',
                receiverComponent: 'nsmjzptemsq0zbot8a7dq0nqd2z29pdnm79dmachnmsclvewvm74g6wqd6qrihux9su33lp8j0kadrzm7o5cfyws20d3o2xweev203nl34ucq6t2oylpz2i9iwwu14k7ub5beyoph7aiamdindibzoks9ho9rid2',
                receiverInterface: '6g9hlr17zdfohx17ugtu9ytaybxq0jjdnrym23we2ft14oue7spl5780b1qh9iws23jotvbm8tja2candgyb9nhlrmycpahrkdasyp27zs7iudubbycyftsp89xxu1uiu0nfcnhucs9afum92hc63i27zlzzhzaq',
                receiverInterfaceNamespace: 'bsidctrto7bap081fusqjiu6t70z0selyadrlbzxpy9jcxjqo21g7i0wd9cz69gxyncvgihipqakg7vgfsxojl3p19jbrbfxibblguobeev9gtmnalwsdczzlrz9ixhgpbfw7x681j2167sr17pgrs9ppfgeruxk',
                retries: 6142601904,
                size: 2180699884,
                timesFailed: 2547583773,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowComponent must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: 'prmb7tg5rcmx32lzqajv',
                scenario: 'f6e9l73ei69mfozyl0afqm8vrz3v51ilfz225bx9x3599kzy7ns53hbbrvbo',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 11:27:07',
                executionMonitoringStartAt: '2020-07-15 21:05:26',
                executionMonitoringEndAt: '2020-07-16 18:31:54',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: 'n2ywnb0h2e0s4hcvb9u1zt5bv95uiy2htrbl0mfzgqu30hfjirx1ebtskq8lt4yp44baiehh9s0jd9lfdgymsyv6pocb56nkpaq8gh12t2v0t5ijasyqgux0knwid1476395xqrc5196ajq2d18rxzks9fcmvsn6',
                
                flowInterfaceName: 'ocmr5y7k9l8bkhk8x1lfuedxzru3722mmas3ua22asuybus2cls88m3mh64rzw3kf222g85fewkmqzzw8s6qmtmi7v04i8d3qk0fn9j2lhorb71t6fngga46ujzvgjrpudvj86sc9bxltomcmt2ca2qn9msvfn65',
                flowInterfaceNamespace: 'vqke7hxm6xnp3vcvkx8la0y94a8dv74gmflxv5sc085s8tglw4dwwg754qqupkgqhzpqojywiktzb4o4yifjx1ssy7dwvygf65eqzd7zxsqm2ygpv4idu16737w12c39oj1xog9z3ux7qdrs9kafmqymm897rl6w',
                status: 'CANCELLED',
                detail: 'Voluptatibus nam praesentium quod quos ipsam exercitationem harum. Assumenda saepe aut qui perferendis atque id nisi molestiae occaecati. Repellendus dicta optio numquam fugiat ut eum. Ut ut illo omnis magni porro suscipit.',
                example: '6gfa32wnbkotl4qv85wmksucxktxvcixqf328qygsqv8floowhlpwn0nt8uu0whj45vnkr9m165nv88sxwqp84dz7w9mpg2rrkyd0sj9rqf9xey9ebv3v0ct1v0axir5hha3oij7nak7zo83i98jamzzp4udjklb',
                startTimeAt: '2020-07-16 10:48:22',
                direction: '4h8thbwcmsa9o3u8qxsm',
                errorCategory: 'c9ib09cvd46ka83b2o2xe8ot2i4513epdkl8gnnf24wy1c4do5x4o0chyt0wk17jyaxrfez24aql459xka3bouqzs1e57l8g9wiyrd5uurq4q90iycme4hiyv3sfhlegyf1icokacbctb1p963ydgtxek2col7r3',
                errorCode: '4e4a0doenz75e8k1bjss',
                errorLabel: 'otdgqwzae82z98k987sfby5hb99cnx9g7v90phio8oisdck9gklbrclfh3ijx7icgxxm0p1eb7owvryq0lsjxsvjqdbv8nd3y4v8yf4w1m2817ap1ygnpwmuc4vd5z352ljcplgy8idrzwcif39cq5eyeyk0qdm0',
                node: 5593904015,
                protocol: 'smhwjnj4xtk05e6zt9qa',
                qualityOfService: 'sdwox7m1avaixp7ywr9j',
                receiverParty: 'giew0re7l8gi3iqticq6c8m52oqt7wh0z9ha55gxt0d0y5xl62cw5652u4n3z43afx96pe65z9vx55a1d4rkmheex02w2airj0h6p0ckqj67wl8pz1hfxj3wijkrnkwzihn4swj1t1o840n55zqwe2514t01a7ha',
                receiverComponent: 'woj3ranhwmnni8w4zth4mor6idplqt0fl5q83kv6y8z9pezpsns4c41sjihziy9bijfihh7805y3m240b2nrv5ry1qovq141evot44xkgpiv1uertt01mqmgg3hyj4eogji6xmtg9x3tu7dp14lmqvgnabn3wt2u',
                receiverInterface: 'mgek68xlq0ht4cr96yzw5ju29w368b4b01w4d0ra4c2kcvq4u2juzmwmwbl3ghlden319y7oz27qlv2fubaj57cc2dz7c8v8uce6ybbknzlvzhsfw7lmfxzrx0yx3x4qves4g0taxwf9sqv2ct2a3s07bmpemlev',
                receiverInterfaceNamespace: 'si2ghhocx9ybzxnsqwstn8epz69whb1awvzvxqx2oxwl6irpvuo58nn87czsu7so57mwhv5t24oktrdlatc2ex8h6bhdu356u3awfmhnpixk2j0elcrzlv8hnm0rgai8cm07usdi1u8owz8x8dhulpmbtzao6wee',
                retries: 1629940495,
                size: 5653450347,
                timesFailed: 5952875005,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowComponent must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: 'ltiac1475fsw1u6yz9ys',
                scenario: 'dm3twqhzabf7ueodk0j68hkdl5vzuxkb6qhwl015aa55muo67docpzskvo6t',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 20:01:09',
                executionMonitoringStartAt: '2020-07-16 18:27:27',
                executionMonitoringEndAt: '2020-07-16 10:36:40',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: 'm0sysi71uy63y5dhkgigi0wy6bxr4al4q5xfpddoijg1gfythn70ee5beg445zuqovkuq140h0fyguyrthpwhwv20mf0w6muqnjj2pxq1q3yt4igo3m1re35qzpyrfa5je0ge0fs43eqdwcq6upamo40otkv2y54',
                flowComponent: '217b8a5sgsca8q251gt8iypc55qhfqiyvzcwjv9wahc4l2mx342vsmjyoc5qnca59o3b4op8gakq9immw6yjgbzf0zjpi9bm8ejju0z2g3yhmpm9deeie4l2r3vmlr6m4qn9lh2s29rpfa70ahgzxt7inz0dhf6d',
                flowInterfaceName: null,
                flowInterfaceNamespace: '6xbp0z6fg4fthksum64nua5tplw6ueb48zkvw0pmon92d7osan8scq4r9uzvtqddpct2bsr9rlestvibiohqfchoz4vjehgopmx7v8xf226gqkydvpmk27twnasnc1sww8111top4cqpfzduttf5cp9iq6zw1df3',
                status: 'TO_BE_DELIVERED',
                detail: 'Enim necessitatibus quia qui sapiente quas dignissimos est. Corporis iure dolores iure sunt eligendi laudantium velit et labore. Omnis praesentium molestias nostrum dolore illum numquam.',
                example: 'etlwrqwdc6fgs35dk49wbsn1gm2ru0g7pfpiqxsssd0u7agbqzfghudjc1ur301r6bq62p43me6smwzzggiva72q6n7bqa3jzbequypxvydt973mswwuh261cxdndvzj65uw3sc96t06ydu95216q0rnywx4oyc3',
                startTimeAt: '2020-07-16 04:56:01',
                direction: 'w8o9yn0c891kkmqswnin',
                errorCategory: 'fxe6i4ad5mzah46i0upz0g8ze5m9ayy1p1sjkl13jkda30vj9lg7t8lhmffo08yt24bln8yvibsiz8hav2wgn5taooegp6ytgogbbfpsts2ijmvqy1jrpujqf615lnl157brhhq97cnrz9ezjbyl5oq1rz1c598n',
                errorCode: 'nxy74dsuck86y1chcqft',
                errorLabel: 'mj23jmtlrd7pnk95dj6wghviopxabtsy7q8m2tu6r8t2n2wesvdvzu1sa7gx3mlz57p8edme2qhr7ue4xo5hyfvcru4k1wdmrob4vahjt2am5fg0k71dwdo5oi259vu5uaxb137awv7uz0ovo2mluuaj2pr7lmjt',
                node: 5589893003,
                protocol: 'f0s1uu2pvxnws31yiqll',
                qualityOfService: 'ijsxsfyllps3zdogbe2x',
                receiverParty: 'wvxh9dovrfxevwi7oaah28u4q8o1nka83c0fkdv93vw66ibyz7ssp4qfwz8z3jgxhkk5ounaj4guvur7b26530259wmwzu1lwm5eia19e85nsvxvsdi61c59i9m56vji00z6kj88mgs5gnhmsr23fqkrv480hbd8',
                receiverComponent: 'k0ag15bqy3i0i1af6kq0ly2f1sx89t9huezajyme5f5i033yg0i9tvb01k29ke4qrpunq5z7btpxwnzrp9q3g28s3i3wd9e3olaqw9mjb7khi4zrhsd3yc76kpeg9lulc4q6vf8sf00in2f1whcwslnd8upsf7eo',
                receiverInterface: '4y7hkfq99p713bartey4ipstwh3o0yicab7noezggvgpi7axvdiyf2rhm883ygy0b8s91ejtoevh4hck0evumt2ibzsrdwun0l825db818bia052st7o2kid102u0ybd0onkwbdxe28p6jhkqz340q3ihd8l3bzq',
                receiverInterfaceNamespace: 'n7lq3cp7at1j7tqo5f1zpy0xswca60dr1dtiudtao27i3sz9fzw6kpkadzzx2gki7f775bnos9fp6eu643511fd5tirlia515774zn2zfwc569s7d8s8onlwy0gkub8bilyzp0t3y30iilowlzhugrau3ibe76bo',
                retries: 6081031943,
                size: 6320832692,
                timesFailed: 2122822147,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: 'hcufkxyc4g04li143gmr',
                scenario: 'f7tas4uwsi5pvuzep4uk052df2zwv4exznk4ffdu7tyfag7wa20b1mje6uv4',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 18:56:56',
                executionMonitoringStartAt: '2020-07-16 14:22:59',
                executionMonitoringEndAt: '2020-07-16 04:33:49',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: 'tqd6nkqn9ms3btatzx78pr7nlahnishydghthy4ca4909gn13jqxr3bhlcnnfoapfdd0zk8h9ytuqlz9s3vf017vbre20o2dxd7w5jrs92z8wvravy8u92vwwl5joxxrykpprqbltjvc7u1laoio0rml0e5t5xl2',
                flowComponent: 'fxwbi04ie14ksnaqhxjjlpi3cpbsgjocsim7krgz6w5rfwfjduby11fdt43tc3xn17plzkxuu84m54lvo7emgkzlsbyumuaapn6vsxq59dievqaxzhrf6vxzmnagfieb8ff9yzjx2lervtqy1vo3uhufn9umtq9a',
                
                flowInterfaceNamespace: 's2w60udfia4ce80gshnfz69cgsm4w00uuklcgmtc9g93dy479l8zd17obaj63qctr6rk6oxgoee6nuh24ly5xqkw3127qsh3wxyh62lkqxv9gbdr43e54vz68fw2rhcgh2bubpefed5qqg87i0hd9znlg415hchi',
                status: 'CANCELLED',
                detail: 'Occaecati doloremque quam velit laudantium. Et omnis dolor. Illum reiciendis doloremque sed harum ut repellendus. Nihil dolorem ut molestiae qui temporibus veniam perspiciatis rerum. Quod ducimus eveniet. Aut ullam aut aut voluptatem rerum ducimus.',
                example: '81umfvnbxvva40bcnwrp7u26015axvgnqu7b7tbry681kklu3rl3oze3w221i0vzoa5276uc116bwxrvnmmfchx4xujo3pd96qb9szh9kacw7nhhzvp9kkvx4ni8mmmgpycva1tra8c6lujn1x16vuoq0cnxovft',
                startTimeAt: '2020-07-16 07:28:17',
                direction: '3qoo79ucgsayi3t7o1og',
                errorCategory: '3yjfr9vr3rvruqf1ckb7w30hwkkqqh78f0izkxhue10b7779l72mdrk3q3syjyxmxd4l29khdw3ow4czgmgyrb3inxalp47o6dttlm1fcw2uqltgo15cr3h5auffrvucqegtn897tfmrr2new2seanud6fvyt86j',
                errorCode: 'xhyv8s83ot5t33r0eop4',
                errorLabel: '5w22pul8dq0fj2jizlnfclutghma0mpmamta83n9c99ccgoa2a1wz10ew0m48737kd9f6f2laowid7uoi9nstiv4a19fagy6xsdqmbqv2zle5uwr3vcrjg67c6ym2hvjjbgtom7ow7trohfbg8wjs0bo9gb278jo',
                node: 2439292529,
                protocol: '58u4ltsbjso4bjlw4c9i',
                qualityOfService: 'dnbefi5kqncjxvj656ad',
                receiverParty: 'vsf7ohz87n3dr9zvpuyjb35gtee17iyjmkgov2nnc415vwikgfwo8rwm6o513xncz54vyy5ru6mwwm8zhbq4fuiyj8tftj3yee85xg6exdxp9q80hhtqymumshcw4fo7h222404a8hj9f85hqmutasni4yycya5l',
                receiverComponent: '16zm5934di6o1w151e8ocpiaf4uulugw9io1q8uyungu97111xoq0n9e8xpmmuq7oqdz116ufp0ek0x9sngv66gr7m4i59q84v04r2pn1yumomzstrxar8mldzddf0ssskgjjuiw9txzamebv3bgspdqkbvqh0i9',
                receiverInterface: 'ixr5t3pxbblv3qrffscwuheelw83xyj1hqjtzrxs3kwxw70dghfy5mgesj4r64e8rt7vbnlvqfa2sxy669s6valpxwqhm9mlm20ybcis04jkcpnk00rs4x8kfzcx7vmgahpqif1m8qcewq8xfwwqfeh3khutwj38',
                receiverInterfaceNamespace: 'rg3x0jdibmd0e787p63tp7zedoid2lpbg43tc2471xbu3onny3e98ao3n5yl0yojhn9cj29r9l9rqbjjkwr72j5c1ptq94vyy0c3k12t2vchpa5fz32slgv615j9hjt3ksqr5itfpv4v6r6dv0eitmqocs7i0acq',
                retries: 2861635836,
                size: 3069003625,
                timesFailed: 8870007679,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: 'wguxab0f9nrxd4rakhmw',
                scenario: '068xi9zx2oc6qy5ur9lru4k9cfu36fzmazd6ysj4f6oyujlfldb9dszl686g',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 08:04:23',
                executionMonitoringStartAt: '2020-07-16 04:35:41',
                executionMonitoringEndAt: '2020-07-16 00:25:13',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: 'rssm9sr7nezwxr4x9941bd216sif4p90mv4t01gkn4lsr6ynpv7fazdim8eaqfaprd9jb2d7d72g5v52534pbd5wrmyd7l2rif3r3lfld8bv5flym7ehb58n8yyhvwufbfiiz52ca7g61592ts0kqmvar3embk4p',
                flowComponent: 'rba98oha9ajrbv9ypaxbd0aallfnid1ubghui87vmem4glpfi53dupqc149k7lnsx5huz5tdtvjylhm68hal71ggffows8huw0v91g3390ofwb4r3b3kgabidy58xoi5sia2m5rekxpyu71kwn9zopr8snt1bdq0',
                flowInterfaceName: 'u79hfj3401rfv8ev8rrkn6pu8ac5k3qh4pyyc2454p033gkwb9qao82k1ncq2jzhucf4a6i9iiocp12h8z708u18yq8n44c67f15cx37w2o00evtvm5vb5rqe8i2ndj8tpnv8ma535a5c9kygwjywkkzv9ma5onh',
                flowInterfaceNamespace: null,
                status: 'DELIVERING',
                detail: 'Rerum aut omnis numquam vel illum. Ipsa aliquam quaerat sed error sunt similique quas provident. Distinctio incidunt et veritatis aliquam sit aut ut enim nulla. Ducimus dolorum asperiores itaque at magnam temporibus et. Voluptatem earum et dicta nam debitis.',
                example: 'x8m9wiof3d53rnnwayjptszc9y8nq4asp7xqwhz9r9wmls9v65cazs2ecvf4yjkcyearpgr60r6h5mohhjbbxz3qf0xq35zwdi5iuq75hnywtq7cin06b4orpwp7qk0lvhx3m2d6pvdvtkl6grjb9ndy8i0xg8se',
                startTimeAt: '2020-07-15 21:29:25',
                direction: 'hck7xr6u94bp4bh3dci6',
                errorCategory: 'vzjoev66x46awe4ki63t6ch6nckv6xfdrzoc80y0v4sydr72rh222bgmhix6gd9amc2y96ofry2885nysybyak38qmomhshv64n1izdsjclha3n28oqwqrhuf0de0nf2y0g2z273i7bl0f6vvgymn07e891s2g7z',
                errorCode: 'or3c3pes2b5r01esab7a',
                errorLabel: '405hmo2dunlryoareczi5g0umo3fyc44sj5w9p6iki7d5xbua5md2liod368wrkyc8qi78c291bp1pc5oz9pnp4vuzeoxi34pl5jit5qg91nfrdx5jz508kcercpoxvavs4fhzp4xlh1iwmn5mttrgim50ix7skl',
                node: 6842169300,
                protocol: 'aca91kmp951at52i0xo5',
                qualityOfService: 'wnw7qgl2nhrmcrllljfu',
                receiverParty: 'k9zw5ard6x8rxslv31t07xto9xoeqcuhdxclqlgi9c5b9u2n1yiwh7lin4d0p2e0mb7px7ub25n10pnknw8ey108r9gw12fs3s60jcfz1hoc77dwi2yb8ikdd6ci1a8evwkhd4r4rwk4k2v5k5xllvz39wjal4iz',
                receiverComponent: 'jwx4f3o4w0k1clxwfce9mq88oysnav03b7j9fabxk8t10lc966sd9zb63wtgegpuz638b6638pc7n8sm2bs162rjvfv6eo9vj2vn3idroje0qs909w6yvk96eloh2tyd303agohewz11iks4rkteyb8ey6ykhfm9',
                receiverInterface: 'ngti8p8cmjz7rgqr2gkd7l4zglwxkzfvyq5bomsb78s0hghjkt0bjgy8mmgyijkbi9j9hq17t94h2d07tvn1ku656av51c9giwa4bk70iwx2j15e5mlub0w6l1brosvt6y5xyh80a80qn0nu213uq31ruvupg4uh',
                receiverInterfaceNamespace: '5q1kngoukmpq3mijv5273hn8xklzrkysbotepkhz0njh2cadsfut0amw1jj6z41r9yaj5skin14ujr7oghtjrf9u9c0dnvf0n5blj077nnhrz177oy0llg7uspy6eezhrhjpnu3y0waj5jd3uw3w4uw6ydu3uyul',
                retries: 8573795666,
                size: 5417702371,
                timesFailed: 1146669286,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceNamespace must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: 'j970pirfxwojxzo1pksz',
                scenario: 'k9grtndhyvac9oxuwh0ax5ta7u8s9ymgdoqk4nqihdgieb6usjyo2pm7oy8i',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 08:15:34',
                executionMonitoringStartAt: '2020-07-15 21:36:01',
                executionMonitoringEndAt: '2020-07-16 17:57:16',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: '91lbdpc55hqtq8zbs59k2la4y1xk5u4jxw87nhhzhvicxlg7055z7993y3allod50hkgce8o0jinc9jr192vfjbvirqbgcd0wovw737hmfeey4flumk7nvwvruxxkmw9ljj2hem8yhy6pd630ovkzw5lwcrdmigf',
                flowComponent: 'v85v22umphtjsfikwb2nyw3nlf01972ecyylsnlanlvtb2bf5ueh4pvnbe8yorqv5zxs6uddr0o3pf814g3l3zwgec0zvcv7kcmm9bnc84n7im73e6e15zgrk9eon5y96zauccu4p7j4njzyohuexlx9blhopap3',
                flowInterfaceName: 'laku0wzi8e3bz1yt422p85y25cm2f1bk2azyrl4k7fnaj9jsqq8meotqkbpwo6rfxba0kdey9eha2vlawjjuk3r8hkqa3m5i37pwjjq4iqct82fqdr394df50vp3vd7hzvbu3ix80z8cgu7z8unoxf7wzge3y8a3',
                
                status: 'DELIVERING',
                detail: 'Nemo ullam blanditiis sed assumenda magni natus. Labore id commodi unde amet delectus. Odit nihil maxime sed est nam aut quisquam reprehenderit. Necessitatibus corrupti natus est laboriosam. Animi iusto voluptate minus sed ut quia quibusdam doloremque neque. Ea earum eaque quasi minima alias placeat unde voluptas commodi.',
                example: '599r4ubnbcb5244k453rvweme2kpqlrdv5gyfgb91v73li92uu2sd54cbpy0qgyohnagqlkjovdub87y268pg8qsbw5fmots6dt2gul1l9t0e38coqm2nolgsc6udxzm31vl4aj36tqvrjjjt711p9mecickpgj1',
                startTimeAt: '2020-07-16 10:41:31',
                direction: 'r2xp8i04brjrzioh39su',
                errorCategory: 'oqd6gf02743qib1zud05skik1x8dd7nhqnqwyh26v4ovobg8y2wh17nudtbebfj13mqeabt0c4hcqi06uvetpxj4yl56qi6jcdqfzaw1drdsw7ahu9aqbszck0y0jutuflw87rpklybqma40y5153p8f9ccn7iab',
                errorCode: 'r4e8bfjduvvm8ja53rgj',
                errorLabel: 'nhytmzuj6ksillepb775inmbioy0e2fckrcuervcb2n1soha5ruor9wjz46i849qxsggbrbm1aw7w5hgsclejon109djvz9466i1smc7bs829ttiezpplmem54gywrrasnqzbpfebgo7glsm3ghc6iouxxjqhfpg',
                node: 8834441732,
                protocol: '097bbl1a8pl0mnjsgol1',
                qualityOfService: '2pf1wk4f0uolwtrq6n2j',
                receiverParty: 'd86mrrtuij4p6xkmx7l18mbbjiabefdkipxpuqyljpotgak445ustr8aw87e1us87wnf0nnykr9bac73l27cbdws7c695oi0i05h0ycbsxgy8llyp9195nseolrpbzhf00rn5v0xfogx757h2pde4oji0bkx4gw5',
                receiverComponent: 'r8ulyk5qzem1c1oa2a3cj1ha583m0wz57jiqfg0p7h7p9y7wy71b2uukv26qoqhzxrt5yz5o04pgi5lwbblncb2nlxibn3lq0nut73i6ot2iq8ldotya77y92kqv7bgu4uo3p5kwjx1bbrv7baoqvu0cklsywu1d',
                receiverInterface: 'aah4l9orvdu1uygqz2nqmpoha93gaolv40yc6pv8hek781iyfp3whu0sl3n0onmiyt9qkutcr6exifapwowfga6belfb8biba4kri7t4qiub7bq7b55plfz15jbekvic2zxfv84yn87g78ctao1d5oc2wxis3naa',
                receiverInterfaceNamespace: '4wwfot7dmphmja8k1m829fnqgvwpzmneaov5328kj23ezqgr8qqtq5wctqdcvdz3he1703outyckeea22cp3i0a8c9z4hzmvp113toyrk6f1yyphx5a2ixaoy0xsuwxnvl66m6hndx2lim7uqxgc6ma946uh1ce3',
                retries: 7331345192,
                size: 3370787556,
                timesFailed: 7332159324,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailStatus property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: 'nmz99ztzpxv04n0754ch',
                scenario: 'zc1aedd3hnxt1uen7kjpp7zcfkmlkur2bghzwrkziep08v6sbap7dmbvvs1l',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 06:16:07',
                executionMonitoringStartAt: '2020-07-16 17:28:15',
                executionMonitoringEndAt: '2020-07-15 20:37:09',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: 'q7cgucep47p6r8pupd04ri2nsrhslh09gn5imv67etfvjl0yzr5b4499brabth5xfrd9y5je5xzlgfq556799q7fakcuj0mdusxswjpwfyp5akqj16xv6l2p4lpcq5zaenak75r4umkhlxps3bf2vgzwwbb20e4e',
                flowComponent: '4sqnpy8vgpma12oacu3pjhxp1e5fjoaej7jml09qk9u3cu7x2a4g1t8ikrrnk0qhv6h7kxfco3k5qiv5c9lhm4qw1218fkcuwinweyxbehk3vkskhi9v1vubz8onbj49bu558ia8uoqjn3812pbnojilpskcx1hm',
                flowInterfaceName: 'h81fqfjh2jbfguye0ebfa8wrz4eqv6rtnj5t0wsetq7dglk7rsmohdwtaciswip228fp8mafq6wyhgrm36cdubp2moqx5p3t6soqsfjojsqmfxajnpex4q4iynbrylrvgkegn8q950qu0e5zthkay0d5sa42npgf',
                flowInterfaceNamespace: 'h90k8futbkmjcd6dz8mbjeon3rragazlbp8s1uep52dwnkhhojrfs2xyhargdspy1tfb6d6xdocjnc7zrmauy5q59red970qpm5rg6vfvf37ae69rvz95aitjz69j6yy1xjk5f77chbmrn6h2u3j2330dixs0ke5',
                status: null,
                detail: 'Qui soluta alias est quia quod reprehenderit. Vel unde alias dolorem sed. Omnis est id. Asperiores architecto et enim tempore ipsum sint pariatur non magnam. Nam eveniet alias aut est dolorem accusamus. Omnis ut modi et qui in voluptas.',
                example: 'qf22xrbhu508ddps586b07i0pj7fjcta7ksjpyjuihr1gevh3n0szl7zeyiz8rlbr1i1t57qn4oq7z1ghotnzo2vw202fc8gqw5jcyc13ixuwwdt5og4mnzb4fswbtjz2nw4m303r6kdkubkyr09b79gvr6gzvn7',
                startTimeAt: '2020-07-15 19:59:05',
                direction: 'ty9djsdouv2hzp0wryhf',
                errorCategory: '7u22i2gd43c399a5jqpcjfzq9g2m2gex4ete7d6n0r8cbwr949pzui5ng1wwljuqtjepn201u3a9wu9wlozhmnd8sigxqrmu5mk42z4vfc5h1ec9t7qdarhofmg458eq470zwyba09f0ju2ztnat9sk4woiah6f0',
                errorCode: 'c44at3exb4t4gqx3fpi6',
                errorLabel: '32dsrqjcxsy0adamvhlj196lgwho3wars9xlq5k5akmdmhdkczgmoilpgl5p9sru6247mjv1c4zsvouua1jcfabaoau6bg24zy1vq0ng320vamss2yzhtfwx2s2wf31wd0v1evn4kr11p895zd6i4lyo3n9ox9ox',
                node: 7486303860,
                protocol: '5526aadmjwlmtufeb9jb',
                qualityOfService: 'juohfttk87a8g03uh3ce',
                receiverParty: 'hopt7s6yetxeobg4jygwqka4mh2pgkaixsv33qjghefn45tvevywvfbkd05fyyudlrsnbu3imld86e0bonkggmj781cygpg2egtm8av7iz0y1qte6wm3c9gxfpw3swrzhr8qehc1cwkoklr43xvt0wvs9utk04xe',
                receiverComponent: 'jo7sxhybj45ouampyw8rutv9hhkbj5dbwkkjkbhcmy0tg7az5n3hf5p964pmldgskemqhg9trebhsh42zsoaqaig4xyy1uw1s17qxq8ts0lctz9kwfaw0paw7vwxobn9s7kw81oyc0r2x89fb0exd2tcu68fb8zq',
                receiverInterface: '9kxpd2pnteljn4o061nmn18hu2uebwpu4oz0bbmbibxmjz9h52gjphrrss5wn3kzd375xky0gnx9t9hjmtuft4gvyq5lgxxhvnos6veq6mwch40rcm60u3v0vqvv0x3r6c3t5mkf4aa3xsas5d410szgnzse5mx2',
                receiverInterfaceNamespace: 'fx933nrkwj3po7r9b7hwkkhqskhrss93ulreh820dxuppv78yg8omiz5aqad9doiy7eit96pkeprh21393pkw9son9ot579xoicu1t5dfdflmdnv287f8m6kddyqd2rg2tguzb7mx3dovh3svfysbuc8bxdx5z8p',
                retries: 2524058967,
                size: 3089961876,
                timesFailed: 8606142645,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailStatus property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: 'd3bi15c3c8ja9f2t1kob',
                scenario: 'jpagztg2to3e06u2ljm8znc90o7d6owbrex5049ze643845ep74rpniljzcv',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 22:37:25',
                executionMonitoringStartAt: '2020-07-16 11:21:41',
                executionMonitoringEndAt: '2020-07-16 01:31:59',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: 'dx2p4c4lrshvhlckdqoajm85zf45033y6enkfo1zbjc62p0kmszpvnnpvv0po9gs0lzkyay37a1oo0kjt4rqj7dydoaui6pdqkkhbl8c4vtjqfvm155s7868083lqdiw5ljcp34r3nxusiy8zcy1km8pqbewv6or',
                flowComponent: 'm8ofyhesgln3bxt6vf4bagmwhtxf29dhaemvpw7wnc23e7keyuq7clika9kzz2isyxbcp192xifptlsnor6h5316r78fg5l467opcl8v7hkjx0eiuslyx1blexcyxatavf4m5qkue3rjw23ufqyllgh0564vlv3h',
                flowInterfaceName: 'uxjs8lc3dd52ks5488v8jg7lbxnc051radzso05jrxwjce6ok2rvxvoxhxse1eeg7j3l35ezw12hsk1y8t7kocfv0ub6kc283s2x8uzunfc7vfped3j16e096so325s0to09ok63cmitl5374xg7qiyq721cleid',
                flowInterfaceNamespace: '5nqdf7gxoy1zgct9un38fpr9kf5mcw7t7u4hmajl2qjscitxcoo9rfemksph6dzee29swh23xk2ts0sqc56jjxc94264snxw8p3u33mjip4fwbtz0yt80pkhmlslny9dllkbucvpu86v9yf1rd29pv5ykupypnqg',
                
                detail: 'Quia tempore saepe beatae dolores officiis qui ex. Tempora quo et adipisci ut eligendi illo modi. Adipisci porro omnis quis sint repellendus. Veniam cumque iure impedit illum et. Ut amet incidunt sit necessitatibus assumenda vitae veniam quis voluptatum.',
                example: '1d5vyeuh2uv0uywf8pu41f0lbvurvspihydd2fzy1fxbrejk3x6okalawvkssjthm8hxhulu73g2bwwx5id588i9yiqd2dap2wtplwjitqvpknymgf7qvcg03n4x315o4ovjs26k2o9dzh5do9gyooimb3brhb8m',
                startTimeAt: '2020-07-16 14:44:23',
                direction: 'r2u5vdvftnl1393dcwzk',
                errorCategory: 'rwlxnld2szxs3o9vaz1xv8jjytcg81fjji9fh7osqhp66f7w0dkoxx32iff0629c56yn8yt3rrgbt2ew0vwarrh4wcs15fq8sm1zz11u52zlpw0zfta05apdg3wlwb2af6kv95j9ic16xmo04sr7yfqgqr3xfg2o',
                errorCode: 'm9l7ih7v7g0hzklfl5m4',
                errorLabel: 'ah0oufvzkiev8kywb2ns0t2794bzwmdw2x3jrk4eme5iiglql3f3e4et9bic1oeltgl9lahx20ojfl41snc6ndm3elaeqgcllkks7fxu0vi8ppgq89q4u90hw8k4wwqldmu94ev9wvkxecco8uud01qsod8w3oc2',
                node: 6216407367,
                protocol: 'psl3e7yea42gjr41w47t',
                qualityOfService: '6byuoi3haayw5rdrcvx4',
                receiverParty: '9e093htuurh373kecjsjmtwgdg25akjlou0mim3946p6vcswwhsx2y02nqe1ozxnuqpmxqwf8398j6xwmcgffxfsjxlc4boqdln589m584ocpf6997z05bzq3fkf6efbeynaoxnzhnhutzkdbikytere2aa3u5f4',
                receiverComponent: 'z9kwa67opo563cru7plq8btp44t8b70j7wxo7uluo8l9dtr85nqh4p37co482tejrb8bwgekth14ykp4gorrdji1gldmgm1vo1cb5jvz8on0wds7myhzcsvjqmxex6hgsuhzlbv5cw1s7w9of72n1jng5m1frtto',
                receiverInterface: 'djnv304jldnobmgg58tgae8o3u09i46y5hdj58n3ouf2uonc7ufeykdd4bnm3fuz9t4x65mkekz6eodrqfmm0ttej7h42vc7c5fwzjczw2qrq2y5jefdjvakw7ybeuw5sci0lt17fnv9kgkmtri0ruzx0t9p2981',
                receiverInterfaceNamespace: '0lj0mulshtmi5zpvq79eqf0utlfep8dlruin3mlqiolronisjnd34m3nbdg63gewmvv0da5zth6ho2a85te737v9l7fpab5qinqmr5e283enfqqd3g05r9egxl8zyn6f4ipo394ko9zhu6hskndaack2tpbhmvlw',
                retries: 9229948919,
                size: 5297500747,
                timesFailed: 3099026683,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: 'b9srfa8ung83ggigtz9nnu1uhk56qkfj6ne9n',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: 'd8wrui0nv58dr4gjxpw8',
                scenario: 's9oijh07jzwq08ys5tsg6o1ues3evdzvu9o1wsy974gxerrd29rta64l9v5h',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 09:09:15',
                executionMonitoringStartAt: '2020-07-16 03:24:41',
                executionMonitoringEndAt: '2020-07-16 15:16:22',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: 'xc3se66u6u1iokatchwf6frcssx3f5f8ckazdg4w2qzqj6i4cz9qa67ut74dex8wwine59iy2v5kocn5rqcsoggbyps6d9cei8ukdgb1pptwfye591tunq4uk9jituiyv4ixf2eqbsxzj5xty8kuppjzf78poii7',
                flowComponent: 'qxpu08dplf9g77883jjbt6yk19yomd72hqhkeyuhcspz61rz8nz59ezsuvnh7l9t1zz6ylulbyybbw6ssiobs76elc4pks5oyb4ca2m4w9rviu7pjer98n3uzspkudeann43q0c0ajd7pr85d49kkonvxqoter3i',
                flowInterfaceName: 'k5jsjmr3bi1bb4gjx6skm7mzaouc7mquawl5c2n2tr81s4pn57o3tn5cn2qlvs9mmdhqyrxsgeadzbfiwfoy7nqmuizzlhkt0w8iul022sdqbm3te8zb8pd72l5ijd68avp42yrvxwqwsi8nyp73gg1k11e31jn4',
                flowInterfaceNamespace: 'zer44gh0lj5ggv0pv95at5bvr42pjuja984gyoisbgvd66i11d25g1skx80hy3oj5z63ofo2jjo9uv22n7n7y8xxagt00cdewfphmurgbbzfxc86j0dv762pmtkt5qcji2vt7q93n8624b46ugaoqn1z2ylqko6k',
                status: 'WAITING',
                detail: 'Doloribus nobis minima. Harum totam autem aut quo earum quasi non cumque alias. Ut officiis qui est voluptas nihil dolor quo aut quo. Aut voluptas nulla quia. Nostrum minus ea numquam perspiciatis nisi.',
                example: 'lsv6o1rf431hysz7dbmmnhxzh8hlo3p62d825pr17t54j8ncjeubhx32vx9fly81syn38r9kdnynsiml3pivlsxt0pg692qscr5vfpwwahavb3wfb318dzw7c8njaq1st3970c56fiz8puj8kwobknnebbrsm340',
                startTimeAt: '2020-07-16 10:17:02',
                direction: '7wcy4zgmgp4rqv9f7om6',
                errorCategory: 'ai2f1if27iiqhp0k02aj987xaaiqjkhexkpifmwvkgts3yyp06pcdu9m29vxx1qfh6rfmiciinlu42of5sty8h9dtd04ibmjkpnfdlunu2h2ov3k4yfe643xh0hx7xbzy4m1aieie5vwm4lqwavyuy8lf28id90t',
                errorCode: 'cj0m2li20t7meki13wlc',
                errorLabel: 'f5z0ct9u526a3m54nj18of98rjpb28u1oo6uv5xe37iim0j57zdrvx8ec6t8wjbibt2a1ixmhj9en3c9mai419xnjzmjl9oa8zt33jbs35fz794la10w7q5d2hpt7o1shin63d2qyv7x0x1ujnhx1w0a3floncr5',
                node: 6714697428,
                protocol: '2sc6r08jvsvxvzuhzn1r',
                qualityOfService: 'xcpmzotcl871b4zm8nix',
                receiverParty: 'qwikuv3ef9248pev9hs9di45kfbcxqcfl5zxatlcnsru80hfh3ms1mk9xut6ldtubugpn80joxp15zwbqi4smpra8k5idwctompytwywl35upej4n1t820jj8euwim55l6971osheyfo233k4lsnbee12jqrvbix',
                receiverComponent: 'x97ouj0w6oho2p8fnooizg8jsq91pr222aahrpkrwgsa8r41y02anyj7wx1ozy360mpg2j23vktkn9xelkkpkmv48j4b9uxvnmuwed7i491oqa21zidxa5fsxe93yghx0rumb5r8spwz9a4j74dt2u2yr73ibki2',
                receiverInterface: 'lcyryobl5lbhwka60hiycv87e67vklmmpsztaodadmnxvxjqjzg7cxn3vzn9kjg9d2u9f1p5jfzyo19xqtegcm2w4v9scvtd4uix9buxi7drcydse4rgcnpsg0so48mi9jejzpgy2zp4ftx1b3pclq407avn4iew',
                receiverInterfaceNamespace: 'd7jl5dgdvi3aeyaxv3mn0ur53znqarfd20g9jt6ynt9b3xock9rvfdc9plntaaljh5wyrwm4q501mc2xuvb1j6pfgkm3nu51tloghdibb8gjmjlh5yb1jigy6qmd1fjqfuqhdgfh9xg2sxi4oxzrjjqw52c3qqxt',
                retries: 4368253530,
                size: 2088515401,
                timesFailed: 3412492537,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: 'rcppejpucq9o6gbvfrbd1xmf7tyyn2j70tpxz',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: 'xbhey0c1h7t0y4ygk8n5',
                scenario: 'bvtauq59rwkjyjtjxy8rog0b9o2ynmwx4ah5q199j2ce0gowqywk46for0et',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 06:37:10',
                executionMonitoringStartAt: '2020-07-16 14:39:40',
                executionMonitoringEndAt: '2020-07-16 08:53:15',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: 'ofdz25f03s1ux1h2bf2xtpnnu8zf8w3lc23j7hsaf17sxzwmmywto9dlg9ij4tlv70bcqzh6emaf6ev6zobeavej1y07ylr0qjyjnv9wtw6owh0fkp2bbhpj8vee2xkrb1bmq0t8zorrsfjbsne15k2ke4u10syf',
                flowComponent: '4ny4808bvya0umpruor46jpdr2o3a70mue9sq3cn5ti7wfhbq89bmesed8q6yz817wox5ntjh7egueglb5q8kt8sf1zzy4sbsw0k27aoedjosckjff7kdv3h7i95kvgfykkoqq00htrhetichavns2crka4hmed5',
                flowInterfaceName: 'uwmeiamr70jie8qjaybgs7yf2fn3vfr0jrwcq2rlkvlhcsls396zyxyht1782nz724do7lgz1w8wex4gwt6ufeesryy18yr8asbunr03td4kui6zon8bnj7eo61835qrofw6itlx3mtzscyq0wtzf950ad6h8ymk',
                flowInterfaceNamespace: 'eafboc8bxvwy3vzefr5iwk0ks17sgd14vynryll7e2estupzxxowiy7fmjclm3k8fplf25rcdge4dd1kfr6itky8n77ku5yd0vmrl86pvychf7zt2874v503g6ws272vpgykiyiqhlju9loa3zmtthetxolm3rm0',
                status: 'TO_BE_DELIVERED',
                detail: 'Sint consequatur architecto quis est unde perspiciatis architecto distinctio. A sed eos vel nulla et voluptates. Quasi ipsum nisi placeat sint in id similique et odio. Ut ea quae necessitatibus est totam dicta. Eum dolor iure qui facilis est.',
                example: 'jayvhbmnf7e6nsdkywz2csx3oixakk1bftaymba8ygbzkqz8ckkthrdm9cp0gch56lo0dk8dvtj31ubdynl72q5bipla5q9j3ewgakaotawcm37p830e6voe1zm28e8bo0av6numcupfvym13cpbaeit9wq4br2i',
                startTimeAt: '2020-07-15 21:46:52',
                direction: 'jwhg70avl7woverw4tcb',
                errorCategory: '5gkbowdtyn8s1ymjrhjrusktfq8x6cew0xdr5o9wrur1wgdvgbcekllujbry3yzaedsg3m44dwppcn5dotvvu2gcfefx4qodl3fas8tvpy71xhc57s6wbbbai9rey3uo3lh16e4tm7e38vsdfa2jvfzoouy0q062',
                errorCode: '3d2iwefw2icprdrk4y91',
                errorLabel: 'u09embncsy0bi77xoq239lfkpjridyxkxize6l9y0awhntbl1fzexq22mh1b6y1j79fpnpup4o8r3xiw48vnyz681nbqbqwr1t1vt5sj8el34s8163wgy3cwjh6o6psqiejarxf80bw6qcrrydpz6ndbdaok9r2f',
                node: 6051820379,
                protocol: 'p7vz2s15n67umb8moupv',
                qualityOfService: '4w9pkwe0m2fuwkj1xhxg',
                receiverParty: '7v5x7yyxfupzithlyd6cv1xfvaps0uwsoth1xufw0quu7pmlaet44wfzud5ktzidw0khnztdr7bh38rew6pmoq8ut01osxlit592yv6o731v2rbevx56yqpnebpg9068by9ar1vpas1i8ck2zisfr0e9bjl24wr2',
                receiverComponent: 'klvwux4puksgl5bix6e3zdff4ff86l75g50hxjifhbb0zzepg9kkpzbypkzdg23j4uqcybmd4lfjvacgplr4lagcpx9wae9smdycxxp3hjl2ivctycb4eh3f4i289g4may0is69gt225bd4m9s6v07t63awdq5yl',
                receiverInterface: 'mjxed8j8sprgok1912ks82k3t7r8u8kepmh1du3eng99ahq2eiiqzkgwegkogjaewlfl2ueiezcyhexslu4g2j9arktfgcwgvl9tjxyv5wxyka034uwcj2apxlkpcwjzs5pdhika1svrqajpocbhpgu0jtmrr08m',
                receiverInterfaceNamespace: 'rl358e3dof41k7juodz4i66uip13k9k05jmj8w4wu6350sl32m430zf2nxl5juanj676wqbu3fv0ym0bsjhdpnq53zwr4ap9chpruno5jtwiqz62l91bag9k1l5pjk8kexnbnc7t6pp66k1jqx2v279pqtjsnxsa',
                retries: 3904841236,
                size: 2601862365,
                timesFailed: 3890628645,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTenantId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: 'elaaluezq9cmaxc4bpn3q127luadyciv5tez6',
                systemName: '8jhm9sb4ij9f3f5x05ub',
                scenario: 'yoqwlioxdsryqyp03i3d189tuyh17503qcyzskt03264u95l1ppuyzorr680',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 14:56:48',
                executionMonitoringStartAt: '2020-07-15 22:24:00',
                executionMonitoringEndAt: '2020-07-16 11:21:16',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: '3m4fwsvug3yxkhswdk0z4zq7jze7cxwtzleh8q410va41spcrfir4vjlmrl5km9q23kflz5rgq2gr3uugzfx7rvi601d06nuwtbjx7kdrmpb0v0s8mcfcmmmvh6d6oix8xnih5withen7i6hndnn5xpfk1ase8re',
                flowComponent: 'sanx9a9vmlkw3p9c4n2p2s90kxqu82bdb5d4birljrlzktl8ho8jqzjuluyeh38ewvtcd8oq71g931spelgzlwomcuymh2sv2j746tml74792ovch58fgx5xutv7xzmzp8exlbf6n9m04730rh69o25w7r96ax9g',
                flowInterfaceName: '7kzsf96a2k5vps9q9tezuws6jk7r9d3nadrzbqiu5mmym72matouuoa1pi6n18vxwn5h5ar3jg1z880nzwldm3uwkxgqt0k1xwcd76mquej07fl9tlchv5gr0nw01b18jwbhe4xewqt1orfcqtb3eqxpht6aew26',
                flowInterfaceNamespace: 'v76o4p373c4nzi7we5qkqq3wmyo052oe5dbkrczx8i5m3dossz0to4em02ot24bf2zkp6yrr3voqqoa8ts5p05gj0ddblf7xzsyd7q9v1oratewhcwgh8kboil9sz73esjncld8o7bf3jvtd1n5cl2dzw3cs6zif',
                status: 'ERROR',
                detail: 'Sit molestiae esse accusamus minima voluptatem perferendis deserunt. Tenetur tenetur eligendi sed nobis a quo reprehenderit. Dicta eos quia aut in. Dolore ipsum nobis fugiat et aut nulla esse.',
                example: 'jvijh0wrw4ksfki7c2lf3jd24fawh3349amuim793b2ymh254615lfa4xw2aeasgq01707xqb9ai24wmulattt8sek6y9ug6wo3kfnfyvh4w84agec5sfm18k61r9qq88c8ex5sqzdlw9spfunxsmo840utfmxtk',
                startTimeAt: '2020-07-16 03:09:29',
                direction: 'hrwq2jqemx0wl3sd1abp',
                errorCategory: 'sgdmq3rtjitgurrcj3gcb773otadilwxla3bbdeo43jjg8e56wmxfleqhm1gcq3pe0v3p91qhkiy39jirywq9j0ztkfezllim7xsspeu8cos43d1skyk81niq6l0tmb3gyjvtidvuif0zwfv483vg9974qgk5tsc',
                errorCode: 'w1x4a3ajnvw9jya1chce',
                errorLabel: '67ass7w1zaib2kf733jr7hezedasup2d6u9cb0n5ypdb2cu5m4lqa7djsw1glxan1chhf3zbuylpy8s89x4ktg2r66wl6acntwp91mrj1nn1iaf2xcvvwfaze1i6e05a2ksp9iapuhuv30it1mndijmyps268nsq',
                node: 2280602288,
                protocol: 'gmw6ffgvp24qtyakiedk',
                qualityOfService: 'kh2n8oxd78t1o4uabcqq',
                receiverParty: 'uao9b0n0tc71qmcx5p2vq5461ulyhykkhiagef3lklvyly9z467u8m16r6idsh5e3v1epbxetzzonb897escr81qhnrp2cgze6v1dpf9um50i22j31id4p77nyayap0l3tqsiaxsox8fpog9lc23gy2pfqzgqn0b',
                receiverComponent: '7nei7pdjdvalqokg166s23cuw50dgxarj88ecdxz9gpmce20lmqay2to1mqg97x0l4g2ibze897mv3mgl1xiy25j25al4oj5fn7suovdmdlg2y07z4fuby3idlq1qlsv12uwkgiwijy1yebunht543xp0y5x7wjb',
                receiverInterface: 'h1cq12md3zyk7aw26ykmvlcr4zt1acdi6wd63khk0hkd88hy3rtj81gkcngveevi2msa6ztfeyt4n6nu8zalxheuvsoojr24dtyuzhv1jc63rhmqxmsouh1b3g9fdtb791lpniksily4a9vnrnz1qvl5hnmipsdr',
                receiverInterfaceNamespace: 'w186cghsqkij1ktca7c0zfy4m368vmgpfzbuiyb3sjaaa0ceaw6b47yb6u80omjqqf3376bseyltjnh4fi233o9gd5c6ux977dfxjv3i61eu2re82i87ckmbs1ko0bndv9026aya0ebvfqg0m49fcxfhpxnbod0r',
                retries: 4120312304,
                size: 6917831598,
                timesFailed: 3515101723,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: 'saycqw5sgyzex84ajmdl',
                scenario: '8wz87l95f060gx9l0ikevsb2qu2qwt373u3kc8jmhr61lgjn1okw8q8pgkrq',
                executionId: 'ri8ca8mbal3zb4ai83b856ukzy9lrlk378nht',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 17:14:27',
                executionMonitoringStartAt: '2020-07-15 23:02:52',
                executionMonitoringEndAt: '2020-07-16 07:57:59',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: '5ewvnc9ar77i4dz846plsunyq0rncyes29szm7i4b29celxs6knp0vi1d81rdfy2p8n6bumke48e3d7ex3b6yx4qizdxyxm6r2postwonr6lidys47n19rx99ymhbab8v5s951korxuwf31nvzvt4tngsnqfjgnn',
                flowComponent: 'pcr12ud4xjy0skizcdvbbk33jmh4jebe4wtc6oz42mv9cf9umrv7inkvs7rey3xo5bgay58zc7g27a82bi82rj2vv7gf91xq7y408fkxjfxu2ubojm1contimrloeldc037utdxz0s3p75wx8qon0cafidbkrpc4',
                flowInterfaceName: '1r7sbcpuomlayixz4xs5xuxjpp61l01c21j5xe10u4oxwu7kv7mmqc23jboymupd07lzdukaha5egv7fiyrqxnm7z1kiwojvrm9g5mbohwg3pzzima5r5brzxsynszooe26gqajisn3zvlzn1k7cbwkkkxf1rxq7',
                flowInterfaceNamespace: 'bii1k673hizh2hmlcdtangp6bkbkjd6kodn4aeint8v5cgq1b0g53w0xh3w6gjd5b4g5kabs1kajy47jbyn3hly6i7p5r4l5r9mwr4c0orbamw1cprjw1hjjjd7o6bbzzulewbzh8ia6wrgeuv6vq7c25398iv86',
                status: 'CANCELLED',
                detail: 'Veritatis maxime corrupti quia quo ad. Expedita possimus modi aut ab mollitia vitae omnis est. Cumque rerum nemo necessitatibus et inventore incidunt porro ut. Cupiditate doloremque rerum aut in reprehenderit architecto soluta. Sed exercitationem corrupti doloribus.',
                example: '1tk06lgbw814m770yumdsjgm67g7nrmkufqxniyplu6h9hpxenapw17rsudaawimemq2j3qqf6myb7xhncj9nicfrowkcanz3nqn9rtte8uj3ntwc9vcpjzl74sg9x67qxqyi7dsomhrey9dpiekcz12dccejnft',
                startTimeAt: '2020-07-16 19:08:23',
                direction: 'hle81g3yqxyl4fw0elpl',
                errorCategory: 'j0pn2hs2hhn4xp7p8djdzksgyb0o9ne0wwqh8n0y8iq616ed3lywzssqln7x6sz5scykpukvge6lxtpff6svz3ggapth4wyxzw8anp5bqipx33g7ftr031rh1p2dyzxctkm4vciiaimdfr7zuq2muvtptf1bhl46',
                errorCode: 'z7lupmmyts4iaimf7k38',
                errorLabel: 'qabpspl2agmpp50xyqdrayjhf0uu62wyg6nhu2pcl2bzagpo5hf8vgdnsvjfiwa10wosmdhp80ahwyfhmeeiv94txfzrm2td03okcigoscs8ikl3k78o23npnzmpqye9qra5koz8z46a3b3wy1qhtsa9ft2neqs7',
                node: 3938762170,
                protocol: '8odaf72ppyjg32pgp9vm',
                qualityOfService: '9scdqfg8e689h2rdjwu0',
                receiverParty: 'jhgabb8bvtbye5x3wjifcxip9kot4bo1cbif7jx6tqmr46yld65t7rvv4wpba3hznr9yftl8468yk9g4lwfoxl4xxg870fnd154g2h0jw4o9urysxc1miijsw3hofu6mo98tdcdabp3zbuyq43adkmpdtvndqwjm',
                receiverComponent: '6a3zrngqh2y4ts37swzq1mjy0amadr38kao5uuud43mxrdcq95pwlwg5gc664c7mm04g0mz86ty9xskve4rwp9v79zil87ucrjynsksmg0cyzbs12txg7bi6rb7ij5hojfo78suxi9qus2sz3cpzlbpmtpzgqza6',
                receiverInterface: '1tnb9mkbr2ti5h3tfjs9hid1baau6nn71r53w2b95hvu0t03s7bz7nlfnd4g1ndg021fjpat1974ron557orv46ec4evs0enj3eit6bhz12uqsi50sbxjygtp30s0hwa6nkgngg79y15zm2jugc15wfhrgc8keis',
                receiverInterfaceNamespace: '2hp0aort3wf6qiwdmrn9y0h8ebltic6ye9dj0umy893bet1tz8yy1kcnyatfo7b5ppaghqgv6z19k5h79rus74pjkgu3o7ztybd9d00934dj1tgyokwfyq921mukbxp68bqot7f84qcqn0e9884k89icpjoo87gq',
                retries: 6295921373,
                size: 9498475414,
                timesFailed: 5588149079,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: '4i5oglsu9v3dnqipep5z',
                scenario: 'fd93nvigt1ivlwum8hvsomtmdcx67n2zob9c6pccitmcmmiuuo2iup071oz4',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 21:34:56',
                executionMonitoringStartAt: '2020-07-16 13:20:49',
                executionMonitoringEndAt: '2020-07-15 21:44:51',
                flowId: 'divq41d9bqdzf3wmvuae4ul0ji8jjisy8igwh',
                flowParty: 'zrevf1j1jjvxy800ipswjhi2vkh8xa1mpu1ofmvnud3854fdm1b44ouxf1gngha6zsthygpzf8uwy3gubipu8fvveyq8bfgboih3cujxwwol64nixe8a6mndoc22iyj1pbmhwddntpushg3ifmrztdebfv4s8k23',
                flowComponent: 'p13fb92s0wz49ar0qdexo87awwsppz917szxaadqrohmov6icigf0wp7j8d4t898y2y0wqsndxdvscq7ihphhf8b6skgy787jbh5lgmv9hzd5w9y021mg31ore6c2bmhoknwo0pvnc3pr0d0fbmzap9h6tu1vab2',
                flowInterfaceName: '1udx5bp5sx4cszaj8qeexbfktsaehypb4u6vv1iet2v7c41h6lyxj3xo75kwik609mlp6ij8xnly1q0hwtb68mfgfjtlq0jdv1o0zuh93hf8o5sygijozjbsw5im5im5vv9djsh6nhx4wfphnqsxumom1vcxvgsu',
                flowInterfaceNamespace: 'qzoomvv09w2sk3mtxjexzoi6fffozieis7l46batm3vty8tsqrprw3w7tjfpeqdrwj6bpzhxslrzpix13e1e1f7zs7mhhrfib6154f5uwbf64wge625sns8t2l4j5intu567wfwy27gou33jtuv59m35tlmumiom',
                status: 'TO_BE_DELIVERED',
                detail: 'Sunt non quo quis in veniam velit voluptatem porro ea. Rerum exercitationem dolores qui quaerat inventore quo. Explicabo aut repellendus et enim vitae. Inventore blanditiis temporibus in unde ullam.',
                example: '3vx7jpls26r9zlu6d6f6d4k6kofqrgvqtvxwd1smrifdkm6l0ssb4xxa2jr42hjl7wun8esor7rt3rshwoo6f89blrf8dviaxgl7cfr1oqmgqbda9icjntk6455auospv2ywt4h2hmr91su2kruwg0ekgdrufjv3',
                startTimeAt: '2020-07-16 03:57:11',
                direction: '5tsf7oeiih56rckpj8xs',
                errorCategory: 'v8hx74uzylgsiotnw0qns9hpf63rt7nm7uwls75fjx7vpccpsmaunt78k4lxsjlr6umzv5tboofln81p04zvabmiaqlkse6h82o9zthhvm4mre7kbtwrqmbq2adshu06vct92alz39sf6dw6eie37lsdpybugfid',
                errorCode: '0780g3xa1ejv7hszv9wj',
                errorLabel: 'e8j4w97okqzx8jphtasy75hx34epiv3v8erpjj56g0lfu47vdlpro0ao7q84n0gymqoamo00y1uj59zls646g503nt9tths6s0qs6x396xosdlv2mul9m03cp9v7o4jowtyhgnr3648wd1106bl80b10uyyedcmq',
                node: 6059397138,
                protocol: '2cci61vvqx0b9v0kcgtv',
                qualityOfService: '8lypbustheoekhqy2a98',
                receiverParty: 'p6i394qn9h7e3er9xjlgeuhdl4lww9uwvlcep4ejwhhovefkir979smhw9mwms0f1kb8th1bioernafjdk70nredv1kz3gnrnh07ifcj76bnvt4vd24pi9nt9ikmbqriklafmr6tkr1d2eali7tgponnqdapzf92',
                receiverComponent: '3oy9rps896umusgte43oa5m0iz95a0upcjm5km4awqecf0hg0bp35hpp8fb4g7kktmhz2d9y85sbagmrov1ztzfrgecs5mrmo3geg5o3llrrgau11d5h6t29q8sjv1j08b4ocdclitpx2ybyu3dbmhz4agv2zeds',
                receiverInterface: 'uj5nlrbh46nt6lzpp97xujvewnjtkckujm9w8xi6fv83wcst1piec4mmzasvurjrze5jmo41zwn7446ydcqerh2ecfkb7cz9pkg0gsdozx1h0vz944q7z89v434gerjl8qeutilneyauqa19xr6u4v2tpy8p2fhc',
                receiverInterfaceNamespace: 'sb1e92860yqzdn4i4jt3li88uchwa2rqzsko9h3vkxaxjxxw9bxk6frs646s5momez4g3nh8qaep8tutctzdxhi9pyl4edp4yp2fi0mrupar9gpzxjd2344tz19l0tdxxlbt75ou3rk8al55ziccmh147mjcoqow',
                retries: 1101623806,
                size: 2027841337,
                timesFailed: 6331334090,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowId is not allowed, must be a length of 36');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: 's07hpr1aobrtuwjitrzle',
                scenario: 'p0men8efi9pnh4152g8t3cdufelnxneplmcon06uwj8k1jybcbowg4gm34me',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 09:14:28',
                executionMonitoringStartAt: '2020-07-15 20:40:32',
                executionMonitoringEndAt: '2020-07-16 11:34:16',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: 'nd5zgcw98qzhmd12oh9hqler238j5wgf5f1nskzi1758iq1ji4bc97ff9853s3h6bjcqyi50udpp29ker7rz07u11maxfjk7bcqe2edl0cog1kybstkbdodm7jc1eaocyl9587larzz46o8gtphq77mp1hztuopb',
                flowComponent: '8evwhrbirbez8gwed7ewn40i79vrruk1780y7ofm1xr7evy6wuwyu3ddq9o6mcf1qaniv9hzopqfsvkb63qe6bhddqw6bnb9g0iiufzuw7fv8z01oex9vsnletvoelnac1f8tvd9ulzahtry5tg5120bmgyw9unm',
                flowInterfaceName: 'sybwppfal2rwdq5rda5sw0k71ronftwpad59fjpx8tiklxe1b6gbf806ouss2rnyw83s1vt3wms83fxlmxvrzpml8v747rmozjm6fqacotxwrzmz5fd45r51prvtzt7eour8wl0rwd9cv4huy8pkk8s3h8z8ltvo',
                flowInterfaceNamespace: 'wjptiu8wr7kkdw88i0xiocvumo97fndcx8o3f8zcrulva99x9tvdm9gmabbf5rr1r85d3yvdbu85hp2qk5u7xte6owp63n1s57j5kte9j2o9hfiycg3zwyb6sdiv8u7nm6ihwswwi9xy6xvjtlt6x9047znfvjw0',
                status: 'TO_BE_DELIVERED',
                detail: 'Eveniet necessitatibus repudiandae. Perferendis ullam numquam perferendis. Reprehenderit qui in et voluptas eum cum. Doloribus et nihil qui magnam. Consequatur itaque repellat.',
                example: 'yyo2lligbs2kwo5ok2wm0r60kx5i9smajxfzbtvgsczriyurvm1d1ftwrxwubbjv18ui8grsee4baf1fc9qmvnlfhzahb63g3zq2jz83vjr895nppf0mq7c1ll0hpxw6w4ohi8yrf93tpv1e7a8exbew5tvfurcu',
                startTimeAt: '2020-07-16 04:44:44',
                direction: 'bqtcx0d15n7wrx6823oe',
                errorCategory: 'n3264fwc7ro5o6gpr4a3ts7jak40p70dbmi6hhd0jjbsmtyqf9yp3tanswqlc8q1lgkvizbzzbmg5mu0su0bxff88qhp3w0sw5b1pq97kblsd86s671wlzrj7i92pywp3s8qscmwzs44obgpdz4hokhi0jecd8cl',
                errorCode: 'm1p789t2pi9aiaqto3y7',
                errorLabel: 'npvpwg170rf7qre2g5560tq09vyame1e55vu8rnvs37dmmgrqn7w5dyinibx4gm02lp4ey73hvrxq2il0bwya8it314mxxp9i0b6kawtpfa94hv67ta0ian6ju4r2r79psq5utl0d6lills7pq49pp48uhiqs73x',
                node: 7762139336,
                protocol: 'rrcna2xdhgt7t3zj8yx9',
                qualityOfService: 'pdvdy0rm1idoi6zeuav4',
                receiverParty: 'hh0sl3odvcfd2pdb0cs5vyqap7jqcao1uk9whmqx2hyizglfc4x74u1uycdgekcck8f68mm9nsp2t9symap9at280qqmenannq2f24695hsf2oyws0l0hw2ydvdvcvqo3l1m5ye1cgtmp1tld9jr3t01ydvuph1t',
                receiverComponent: 'v997a7vglft9x9onrmzznyvm3e7g4294frx9492jx3rnc54t89sqqo7gxhgto1ynl6c1lzz2fgoey7bvl9kqdypklm2gtpcck9bab3pjp3t9ayncthdc0knej57cblqjl8i8gm8aux8iny86ijf5gvfpk6w6ta6c',
                receiverInterface: 'cc8xj77aatapxfwablf1eqc0lmvesgdwgglzhvwp1wyjpauupeuzlwoaqkq8nlefk2g2ktyycbljd2xyu2ivhsy29n9nzdjaeozbv6fhuye4yms87x7gm69liunf7xwav3ir50ecr4bh3txdtr86v7retn2peulb',
                receiverInterfaceNamespace: 'x5ws9u0bbb1acfasv0ohy0vrqgjh6dqry0n191qd1uf7dn86eioyp8ei8v0dyquczct17faha4mx3qh8f2gkcklwytfk8xelxk3gx8vt0ad3pmw6pxikt1d0ul4d11nha0ulq4re4nr448acmd1ykpfmr29487ba',
                retries: 4530596699,
                size: 9944835922,
                timesFailed: 1918757975,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSystemName is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailScenario is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: 'uqlqqoiq4v35ioi658rm',
                scenario: 'uby13pklrjwwgo6kf54ya4z91f95xp3553swqlvgmu7zphivlek19iv09uk7u',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 00:37:13',
                executionMonitoringStartAt: '2020-07-16 02:18:35',
                executionMonitoringEndAt: '2020-07-16 17:54:35',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: '0b4ll75nloamzu9wquto6l9he67r9h7nqqr19gm24l90cbzrh8jpo6opj8d6aulw5ltghnrn1tiyqcof5xt78s8mb7vmkvpx2l0g0nxh844ng3so6w6e4tf01aue8396k86rujbjotc8hfvj0fi758yo8n30czn7',
                flowComponent: 'evzt1zrglwarhi2ne3bwsi7t3l8p8smhkxzpg756x89jdud4d7dvqjprlr5aa7ni78n0x7x9nr5yxho4aq4d7l7hy5zy06bbgbbkih1z7m8gcf619m90fxub3s6mwfg1zmjzd2ue003rx8uaag3lubznd6wgh3z8',
                flowInterfaceName: 'lo8o0hnnl84e7w87eo7owtu9pzosjopzm0elsxcyhy6fkeev7nmpclkcbcsr70xo2k5ziqiojnkzd3v4rdblv1nvwq9e31p2rg3cy73c9e2m50ieir88jfqhsmd5ijz6p19v4xxxge4pii88fufm81hkwfv4wc85',
                flowInterfaceNamespace: 'f1wnd6f5uugynnky0n4ljggijnvtkp5dnfpao7xfnmuljj0ej20yuwlrcnr656ewhvby3ed2gr2c3qxz8pgg2o28hqyi7n0bjbhr702wysy1s9p9sq7om3j8o7zwmmjjoqzib6m8u81vqfcudb23pkils6h4wkwd',
                status: 'SUCCESS',
                detail: 'Sed velit labore voluptas consequuntur. Nobis perferendis ut rerum sapiente harum. Consequatur culpa dolore molestiae iusto molestiae quae sunt facilis ut. Ut voluptas magni rerum et doloremque atque expedita et omnis.',
                example: 'ten52fsn8prmlehifq84dqgas3k0d9ops3nmp1k5dsc7rs4ccfdv8s73ezzlcg7ofde5sy98jut6nyc6kpr5vp85lnpm5piywfrvbvqovxiv2isx0cc564r9qzix0mguvy6rpmc38flc2ucv28e3d68rn8p6cu4n',
                startTimeAt: '2020-07-16 02:00:46',
                direction: 'jy9dsd0wpc44gpeogeuy',
                errorCategory: '3bwxo2ab3ivohaq0bsjt2y41vuk1pq3iza0yymyob3tv4ej1ypyfpi1fhqxacug6kqaugn4hwfeox7akgvsxe5j6tq8bdmyta5oydlt4rlmud51vml5pgvfuo4pn6c1oai1tvf67429tuonq0gwp1j70sooiiozn',
                errorCode: 'rtv6uxgq4s622vdg9we3',
                errorLabel: '30uq7x6k50khi9nc1d6rya9o64bk6g9dtecka1ifwsxqpi7qs80x4hmrz7kjahw4o5m69yfhb4pqefj64wax9oem43mkonqj523hms2tbxc4pchhh11hwgnktwyg1x9ovtz7xx2kaed4g9q2ep1xwo12tqumm0pp',
                node: 5585900333,
                protocol: 'lgt0khmpttn5oh8ldy4r',
                qualityOfService: 'dx7b8qoqveah09a8cbs8',
                receiverParty: 'bfni8vmrnbrg4mbfd5n50t9jncecy1z8cl3jz5yz36b1tw0x020qg91kkpcrrrxqr4s4fm88wgwuazdjr9cbk982yukvjol1i7sf5f02cu8tg456kht63suwx64hn9nbg88ffqxijvcbcsf8v870wi452pnzzthy',
                receiverComponent: 'wx7t5vz5v69muutn1kcb5ba3ymqhghqq3gmhz31trds3b7r6tpuigpplsndf1b0dreyj6otnq7gzz5h560xnxeqbkgdh0x2s0s19p6djzvv6r2kzart5tqm3jygqeg4uo89nskcmjf2haf0ej1nhjkq1dn8rxk12',
                receiverInterface: 'rovpbpk1034ne1srlqik4t5xuedyznc6d8eptuyunwj7a2no7ycoaalzfk2wj8u70iyd6jx5vchfvwb6wtgdq3yj9mezxsr6l9b415rncn2sryq05l9u7wzduvayrmqt0lov9ndo1qowaeql45i8ffm1g9tc9t2w',
                receiverInterfaceNamespace: 'axekslpo5m8ai0onc7m6gi8ndr5scf47vpxmul63on3rt8vy5p40un4i3x8a6lxwmjvmzed2ack3v1jluljr70w0xhjq0a7tme5144otir4okl4iobqyn9h02e63zi563amlf201ch8m6molv72z11ccuxizyw8r',
                retries: 6140097266,
                size: 3273035150,
                timesFailed: 3893270436,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailScenario is too large, has a maximum length of 60');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: '2iw9x12gevkq8f6gbf5f',
                scenario: '17r56fnycnblxwshezdh50mc2g7ursjudcrm9qo8k8rk0us7l9qy3pohqb40',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 03:42:39',
                executionMonitoringStartAt: '2020-07-15 19:16:59',
                executionMonitoringEndAt: '2020-07-15 23:05:03',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: '89m60fzr6e0c37p13u9xbzm3px0ydcriox73r4q1rdhuecyvhht4xidycoqikxbpg46c97t9v8w05prloj2tx7maeozome40tphy45majful2czrdkamstwiz5jjua0f2ed4k6my1ta3y16c9bz9bae7be6neitkn',
                flowComponent: 'ty0zpeejilthcuftrjrjuav8gm2bdxlpm6of7ikb5uss3cq4wmf70j1i8dkq37lvbw5ikv4ta92wrp816yv9aq10f5njt98f3pt163e5ne5fdu4xv6bvbopr9rxmuqzup1nlnc3hdfaxqc4d3aifvvxddyaeomkd',
                flowInterfaceName: 'jmw979glf3osiwlhoujd206x25pzd0yd3ne3fbsw64l14sa4inpt4s4kuo1ej05asm9ylkacz5ro1ic4n35580yj0i32gjz53rrxvgqnytgp356jkmc5r03vnr3p96bahvpwb3kkoz96mmp648cq4551aeoizzcy',
                flowInterfaceNamespace: 'gtllhh3ouy1duffcfsmdpid8mg3gphdv867pr9ykq9dpgc7p60k0lkhhoc8kgd2dz4789qipz0849rghhg4tzyz9i5bd44ap0hk0b408wvl2ejm16z7gws3duhn7d8rp9hwupw4uajreoxk901r5xvfsev3yveb0',
                status: 'DELIVERING',
                detail: 'Iusto dignissimos rem modi dolorem quis occaecati fuga nemo eveniet. Et qui qui consectetur reprehenderit placeat. Sunt et placeat id et eos.',
                example: 'l3bn5abw2wgclr68vimi9x6peq30vu7mkdtxvbnvma4m9bd9h2h62w5o5gvz9chlc4n9osm33ubifn96l6m4557420nel81pquyucumxvf1yzxaztb5acrqn3ajzq9wl3g95c7sziipc54dw7d1wadc753v1zjz7',
                startTimeAt: '2020-07-16 04:59:45',
                direction: 'znid814czwwwe43slkpk',
                errorCategory: 'kd4m29r3a4n3am8w5qhs4rhnd999t2qetaup9ctmgngkslip6sg5f1br8lho95wcldjiac110lyknan26yy11pj2t4uy3n4ogj0zl6ga6gz6eietd7362rzfygykp8ygs2v7isa75qqcyt4ch40ki50i2pxuhfv7',
                errorCode: '4xd5rxlbv74ywo41ao0h',
                errorLabel: '91wuz7dvxlqlleo96e0bhpef4uo7s1akj4qeqnm5afvph7qqiyiojmtlwyt98kg8k07ti9478w8rnhmrj1ebr3ztzacaf72exw3iqubdynx57oiebwo4ne6t5k37ufu1l4a4vgge3dr6aafes9qnulaf507gp67t',
                node: 6354689558,
                protocol: 'ktrch1wonzkom05ye1k5',
                qualityOfService: 'zff19aoq33jewdsm5dt8',
                receiverParty: 'b3j73zy3drjas1830z7v6nluglsdzd0scejejk76i80lrzgsm8gp3zcmfm3vxdfrsb53qz7frk6t9drq5342wuvttgp1ajvx4zwd1ixkfn6dqtewl3dtbkhi3tfcvegfcsbe7rrdiu0ubi1bcue97xv8c48bwsky',
                receiverComponent: 'fps5ywkmtli4gjge6lo8nr4utp7a5c48qyotf4b1lbo4xc4n17gpfqjmtjg6pv1t0pljyqp3bi9cmwwd8p4hjl26cq7gxe0hjt1b1qfxjtvgasp4hkrg3hnz43im9by439euw7fcbdpuyac2u2894o30wql9538z',
                receiverInterface: 'egf01tlzgect95r2qm6ayb0boe9jk0hco3hply4vn3g5vsqwdtitf085qphxu80cxbnntmkvj4rad5ov9fbqdoyjyapgbf9x95cck2g9lqgb4upktvz9wtxkfc10m5beihcs6hvn9b2ep9ggul3l58mx62ldycap',
                receiverInterfaceNamespace: 'g5o4lroxpqr9hucwehvh7t4u8tvjzb5050hm33qvwxyhes3k4dp6o9jav3rrdydj8e1p25ooe9ddc7r3vr9k26z2tru3kbj057g3oj8dg57bak8ej2du9ebmv8tvri72cfiw2moyyfntl0wd65pyihfl27xlr1zp',
                retries: 6397801644,
                size: 2150838396,
                timesFailed: 5819395505,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowParty is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: '989okhftq1tyy8m4mhsr',
                scenario: 'yq03grjteky27gfp5qgp1eswx5ioox8bgxk802upyrfsxwplx54i5mkn9p3u',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 05:47:22',
                executionMonitoringStartAt: '2020-07-16 17:06:12',
                executionMonitoringEndAt: '2020-07-16 14:05:39',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: 'i0uog3wjgg69cykfctwmhg2tecyr3nft4hpb9i8ddtq6969lrkpsxtohlztqx5s8r4p845ygjju2e4mbb59pggxf4urtd4nt3omdi789c4cah0bqeq2w0zj8oq3cglxxrb875r5szc313j0dnwdjw7go79d5iv5i',
                flowComponent: 'nddtof9avu48fobi0hgreideexqpca9bruqw5yxhr7gzm0nay9vzhanwqb3v3cffceg305x94wbnf8410l9m9e6p3ma6inu0c349wp36ugcbuyuhbd5id0mffmicphjj6k0vx2kuvhc5m4qpxkcftvy435emn9l0l',
                flowInterfaceName: '4u230uje9okjd4j11alss7ibcyov8831zrlxsw5mws32454z82kx3yx1tzl5wnw6ydmrhi1hsatqrtff6d0fquk692rvfnou4vbzry776pp7ifafaulk6uhzp5ptjxg6y0adhmh3gzw8y0rgswgbb8jazeo2ihg2',
                flowInterfaceNamespace: 'uiqs2odwebap7z9tazckj6t1gmkc8ld2faewjnsipovs4zkyprp2dd3tqb156y1e918xpe0qufltmsfbl20m0wjub74yu9l6536ndikq5gqhvtvc08jb3ae9lyfyp9dpnl2fxj7j0axncc5a0mvlt99z2gxh3wpi',
                status: 'SUCCESS',
                detail: 'Officia magnam blanditiis. Excepturi veniam voluptatem et nemo veniam eaque omnis. Delectus itaque sint vitae blanditiis iure possimus perferendis et. Aut itaque eius dolores ea autem.',
                example: 'cgo1mw4lxr3vaeye157n8zatm4u93su829kih36odng4mj7ag8gjlx8l8lgeew68709hylyd91ephwrwhg85scg9zsls2j9nzyo76znh3dtdf88a06aeux2m8pe60krwa9na09jgfquivbmspajvm5u6ecanhi7y',
                startTimeAt: '2020-07-16 00:14:44',
                direction: 'h2ylvgt804oirxnixu8e',
                errorCategory: '2uvc0b7hriszzomcb66263ltfvnn83qxqbupgnfysyy0unty11chu8w4pvny8062jqcqi69r0ppvr7wf9jaw25vlua9jyp8j9bl5oiz84drs767thqa1e65jizrnqys7vmycgci4104p3tczh4dlxjl1lp44mpn7',
                errorCode: '5ua0o91syyditba426s1',
                errorLabel: 'nb6h1z0cgc239z8bgjuf4cnjqn0umuylq36whipuft1s68numssgr91cj4x4nbs1ixvay3il2k9wtqvmg16xc1m2y3078ep9gft0r2v6uxo8g32n6azl3t6mmnhb5x4gb14nm7lf6dlqxgzs3a982fwwlj058a5b',
                node: 4726254590,
                protocol: 'agcyjkrx5yqp22fidqin',
                qualityOfService: '8ci7jv16l5jq99xazh3g',
                receiverParty: 'e3uw2b9lg51fq79yh0gm6x5q7wwrmxqmay890iw0yo1543wt4zsjvabjarmwavogvvgf63j5ifngpxmqnectlbizvf6eb3nqhlxicb0nffm7ycwhfn0pd0a6pj0iw71jto3mnpnur5i7q690enm5vpva57zizrk5',
                receiverComponent: 'ik7idjao5eaqeq0cxffw21oh6ah1ocnzpyzubqpb6nxqwafytaik7f3y906cbq58jn0ppie1pmomei5uwxgl9kl8i01ey0gmeb6h35vzohesm2h5oc70otb22qdya5cqbvtl2ztm991vwdkfgy4e5tli4ie6ob1y',
                receiverInterface: '2oav016dsk5uzb13wy48r3f2j176azgoipbgijzdltvqyfb3yaqp1jwfh6bf1oa3ale4wgodevmmghtwi3d6aoy4qbpysfpxmwvnmz0zjer7xpmeyf8dtfsllve77j7iafgbonxkt61574jjpdcitl5td5k56smg',
                receiverInterfaceNamespace: 'hl6vkxp12iflhdm7obdv2drogrcvmr7plv59at7lfrzs4b71ocdxz3f0s6ibvmbit8dsf8ij5vftkut5bw2jvudd6ix7ytdbeidj8ekqnqr5apsu5l8p83zf5ejie8jeq1q76mnzjcnk2zi7ro4tqdpsmuf4mt3i',
                retries: 5865304975,
                size: 2277177575,
                timesFailed: 2579224062,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowComponent is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: '94kqg6orxie5qglkbrsi',
                scenario: 'sm0t7guu0mwqxhg6mjqgf0ct7guxhjohkas3opjkglx8e2jc1vk3emd02p6a',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 17:43:10',
                executionMonitoringStartAt: '2020-07-16 10:20:25',
                executionMonitoringEndAt: '2020-07-16 05:27:07',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: '88hcu6ch9b8090xyseifugxfjpdknsocc92t83n224mpjr1h5jcrd1udp6ms62ktmknhpqp8plva0lbpub0j8w2rvhzro4rlm216oocbe24l1kxixsymf3knv6y2uhjzm7voonc1np53i1dg3gv2n8hvsd04rmjd',
                flowComponent: '3qpbh3q2hbnn85z0xn8wh5gnmqkw0u7hpfzq0dlm8lx4ylgsa7jztg5wa5fnhbchr652ta8igxzffpnfmndpchw4sza7v0899s920ihxza74t4s9aw9yissab94r0j1jyojmdzz5b3zj4jqecuovzyklj6q74vob',
                flowInterfaceName: '48myhm3xmkp2m0k6yq1m966c5le31ss7iq4y79htvah44691r7a0buapfeealeawhi2hxq35hfr21bl5c2msbxa4b5iblqemsgunchwvwqf77fgz9tuliy785l93k2y9gorbw8b4sa33zrp8glwztcma4opmyx4eo',
                flowInterfaceNamespace: 'czrsizox9efhrjejy8xn1bcrb2jvsrvkg8tzvkl1l85vpp1c160w4ir9mann2nh0j5k113sunyv4s2ol0d9mywfph2qzmwc2juh51dxbr1cnu9u2edum88uljlc9afsqvg778roq6pcos6rzcex0avryc8h74v9v',
                status: 'ERROR',
                detail: 'Modi alias omnis ratione exercitationem autem qui. Modi tenetur possimus ut aliquam ea nihil similique. Dolores fugit ut distinctio voluptatibus labore at. Earum quaerat eum et quidem sint. Quia similique debitis. Voluptatibus ut accusantium non similique amet aut.',
                example: 'sd3i7a49tagkcdm8wqat761xugim9xhsscfs25tf1807so2tnio86csjmvjaz0iw1alljzer916ialm9rsjacs1ao1u47t43uapoyl7625ur73u8syiymw2rmk3gkviw0v877rdv1m9knvf2s6lketacvmtyet11',
                startTimeAt: '2020-07-16 02:02:51',
                direction: 'ab6kkt944td8j58juxpq',
                errorCategory: '8isq9k88oem1a38qblgxvk3obprjyn5d68595whldxk174ct22okg7cplcdq808zf31zhor081j2q7dd5q8j42p3sq7nybfw1vn45vp3hosg8cy8qrrffggau18lx2sw2ppb8h3yjahxnjza9bfbihwzbi9nfz38',
                errorCode: 'b631lffdb6sxtsxw5cti',
                errorLabel: 'wdvvya90hslwyom5yupxlitvmp3ksirq923ybhmnu23sike3z1v1u829g69702pey5804mt74g1ex1kxg3vim94y1stynihy7dnweer5nzqecge4nc4cq2lky4y11mfq0ep0ni4m6fbf51jf40ss8b9txsu3dxfk',
                node: 6569398285,
                protocol: 'ddxav46ujuaf1hjuw53f',
                qualityOfService: 'll8ou6bdwylh4hpgkj03',
                receiverParty: 'jqy7kf3n10kk1is5ryshdnlr8sypcpv4ua0hq7wbxt0y1va2zqxukunom0un8mfgv8tahdfjzzrv44ckpxvxakignm0s4sv0qkef4qdjpjazpck9dh1hcyy0gn8l9zugcukmkqa40gh9j1achnttfm2loirpmb42',
                receiverComponent: 'qm1h0kchu5ddfpmfhtl2z35o8qjnsi50kdd8kp2ly2uy9tk85p7568svqzaalkks1sw87qdop9lgbm5siyf1531ec3onpeoon1yuooxdyf53sbmi0sqf20j0egbs24yz93paoqctwxri5vg4pe6b938klldfhsrp',
                receiverInterface: 'j1mui9j0rgl253s6pwvowr4yeyx6cd6ibtv0xe0jebnpy72cswesg5f2ylkfk6pvbbzuk0bystknjwabwl9k476a4737yc2rrn4cyhgi1tbgp92gwg9epdbs9wizulhws9m3cvkg4466d7kjwrp0xtf1bbnl7e8e',
                receiverInterfaceNamespace: 'c2evugqcbe1t5c6vv9to800x5pj82savzg40uuiwu6ej893k4pu9018setobycuvtvvko0gvqo10jvtur52uwntwdjxhtzwg95u8vjyn4fgg0tk6fz9k5d9kkyafk13otqyjgfkzrz30kagbd5p9iojp2q5p7s9t',
                retries: 7234221192,
                size: 5114616295,
                timesFailed: 4281343267,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: 'eehtpjn8xzs2d45zxd9x',
                scenario: '3fhhovqgruzb82ghvrkwpz90m0eabdjx8bdy5na4e194s00l1r5sutqybozk',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 23:25:16',
                executionMonitoringStartAt: '2020-07-16 17:30:37',
                executionMonitoringEndAt: '2020-07-16 10:56:45',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: 'c889cw58j76j101fzt4m6jf971babw0jsne9p20xfw4bs94xwyhhit1svw4msvr2j628bagbqrtntewv5nvi2yij4b2de7drm6nwl0pks1rqtpubwrvbkuqhkpjnzqnst20sqnnooqoknlzihxsstar4mwzemxi3',
                flowComponent: '99b96j94v3jjmzs0or0s4evxr8xunt9e7172vhhaopl1ktiw0kjpbc46oa5bk5oioh8s95yf2k9r1clpi0pw1g0xc2dfblamkuosey0mcrtfa8d6yldfbcks2mimn184qa4l3wbsb3ah45ziz9hztjpjw6btnzr8',
                flowInterfaceName: 'jbpuy8h7ufkmj05it9db0s5aqn4e3osxx3tphlkz6q2y5l6mh541bekrnxmvwu7mqkucmoy7jnfa9wu0mlwqjfd8rq6i8on82laiwaumj53cfnjgald5plk8dei260qyto1jyh0pop8pd2283eifu8cf61nxulz1',
                flowInterfaceNamespace: 'q0eb4mvm72cfjdsz3sxyqfag5lm9ntsuc0pvwf6opavqc61cl5g7nqdz3han6u3pgy1d2uvhcx53tuksjvcoc2jqj9u67u8706kkp5rmmed25boos13eoqif316tzpmlmiid062glo6hndqqlrm74porceexqnl86',
                status: 'CANCELLED',
                detail: 'Et amet est quae facere autem aperiam eligendi possimus. Tempora omnis nisi esse et sed et veniam inventore ad. Omnis aut sit rerum mollitia et in qui aut. Officia consequuntur est. Recusandae voluptatem laboriosam porro.',
                example: 'z0z7aonaaeopgw6z8jerg4nhjnzr3igppzsr1ewbsjwp4qfqc7akm968xqtynw2emqavjlhu6wofr7jrum7p2cu0izcrxzz007cqtpnk1m22no1tbt0qsmol045iw321cimgl6m8b0ot4qwfw68aexd9fsnjsbxx',
                startTimeAt: '2020-07-16 04:21:41',
                direction: '945qmqp9qbsavkbhbpf5',
                errorCategory: 'k3yccoe0cjqavjs4bqjvzulr9gng9utm228j1eswqbsi99il775x9xwfvuuspizpbyhakdcnxponax9qq8hu2f5f1y9g5677z2y2jwzk4pvynfknai5ux8srvcge2dl584peopzt70y2fpa7dif5d7kjczvft25h',
                errorCode: 'l6vv15ww474vswjf14dh',
                errorLabel: '9jzaw9ooemrmz3ckb0skjjzurgb7rxp5z76nahguj16l6aj6m2kdixmnwcbtyazng30vtuevetjwvlra9gedd9k615t36s6vey79rpwdu8xvso5pisw4as7z87xgetlv6irdykqd9c7fjt5q737uqinpnaogyk8y',
                node: 4505354544,
                protocol: 'kkgzw0nucxvcau0gjr3i',
                qualityOfService: '5c51gj0l336cuyewz0i1',
                receiverParty: 'd519gnjedmqb7quhclts909znjsr9xu6kmc7eb7nda98g5wihx1wavixasy9occ9l8lqvv6ylkalsjmhgircna2xxc0usrs2alygeakmv586yn470a0ez30f6g1vb4yyip254wqdcr33kpm0cxu0bnrxcq76vpr5',
                receiverComponent: 'crnvktwze3nf3l9fxleygymfbod55fn6x51lb2i8jwqovrwch4mhxt2vjdo933td4q26o6ujsydafuymicaoadsg05ysqeqxvimvzg7ectjoqhd3th9v6isdb7uupekufwuenaa1vlsluhk2s0i7w2hknj8w2avp',
                receiverInterface: '7quxtxrl8tteq248ygc4fv52sxzgw8udyrr6875k4s38ump3y63d6e3t4w2flvy15cne0ij9qz8wm8ztv53o8op2z64a6mrr45klno71np2h777823odl72lzpg0dw3b21m4hgdblnpozk0p0yxa1n9bz3xaidpd',
                receiverInterfaceNamespace: 'ae45d0x2bhlcjnyxlpc6a4ghnufq1urgm7rqnlsuhgsr8noejo1mil7dhee91gyz7xhohcwu9oryiak0us0fbsn1le4jngq4eo3stq3hi2uxnwl7hawv3dnlnv8l96ybuk3d0yzuylzz8i9dz2x5oq3cpncqkl17',
                retries: 3853389438,
                size: 4672099017,
                timesFailed: 3802961490,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExample is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: '2dndz5z9izsugfo6duop',
                scenario: 'tqvibzjnl89uqacditg4pxj0hdfs0zyoiwezjvd5v9obtupcc7lqod5ke3yz',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 07:31:37',
                executionMonitoringStartAt: '2020-07-16 07:21:43',
                executionMonitoringEndAt: '2020-07-16 15:50:09',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: 'tc7s2izfsianh23jc2umndkorr030476bitpg2qm38r4u2baimhhuvgbrgqx4jgl3dbz3ir40n63uy8lg26mdwd8vcrkcs447g0w91xusikeggos9rf9budanm706jvbfvjm6t7i85ouwqox6rnhqsbsru05fj6b',
                flowComponent: '7j7d1uficghy1ds8zh933thuodpcp0rh1dgfvwg6ffqzh9uov6dhd86dzpqypf9k66pwzvc0ialqr0lvyp86bvg4iztyom40ifmrd1czqr1wrkq1z5kgafu5a7idtunjt3stv7ixpywwe5vsxklvatz6o8v6lspm',
                flowInterfaceName: '4dh0q16x9n4029mvp5jj0v0cqa3ijy4f2phm5xun742jfrvxk2ksgjmyx3c45q3hriexzwiodark2s5cvat7fegp3haoe0ixlbv5mu4e7cukiz8vlgi9k1kobawjh3oa2k485jjudahunil35nszjezymwff4osa',
                flowInterfaceNamespace: 'zxuuhm4ytn8tpuxiistyr2e2z6bvyycg9vkifhyq1uyi8xatlsfr25joek5yyzst9yv3e38lglzedsilr2n1r2f9kpnh1c83b4dirzmj39hdz00dll2yjx0qc4a0vlj0nn4ooobmpgfis1l9st3n0zi3o5iwpefd',
                status: 'WAITING',
                detail: 'Officiis et iste nihil illum. Perspiciatis aut ullam voluptatum quidem accusamus cum debitis ut. Odio quia voluptas qui rerum.',
                example: 'wak0ky4czkquqvnlf0ooetluu2nud5xjvme7li46yoeoivdgnlg25bbl3hgo38b3698jxgs95l3pb2emhc3yfdjqgwwrqnehiaxzlurt9l09jmu7w7vvxgjtc2cq5yt0qqwkenrnsxose55cuu0z6ml1zwbtj8j5u',
                startTimeAt: '2020-07-15 19:15:17',
                direction: 'ssvut0bam4do7i1kjqmi',
                errorCategory: 'hlj7rhf6i5us9yt2ho7en4plsh91768tvnm5d5duidi5l30h6a2ibuigj9q337amdk5ihrwni3jmbt1y0y5ym1klktj0mf6f40ywpiuq731xw92xbdh1ihyueqw31jqqd5sx46u7fe9ch9tn3e1gqk9s58w7z5vx',
                errorCode: '3sqsknnd3eias849yd7u',
                errorLabel: '6wn0bdlizb09lfs2h6e4dc37tmxa7l5i1iwibmo1216vwa3hzqgi3h0sqiq1qwzpxmqzbxwcngj0txyha9n1y8j5hjktp1cjywc378p3h44eo023fdz97fslxoou7j36n3edl68yo3pgmnk7ks1afo95ws0dvvq1',
                node: 8708677290,
                protocol: 'dfdjfm669t4e13ysfl79',
                qualityOfService: 'l715l4j6sle1lbyzk8c9',
                receiverParty: 'actdf45ol1mor1oe15qztfhu2yjbsb9q2vrai2ueaeqo4k990ccxlp2zlmhqm7s7bphfhqyr2v06ysmrxzk8t41ko3246nan6gs30w5nslszyr0i9b1ylx73ai0zxx16gybv0j5dobtqtctzgjgzowtyea53eboy',
                receiverComponent: 'gnzfzavva4qr8qyq89wl6o2ka708i5kys65f9al7mlh3oafbwaluiv5wkntlipcsjsk7qwqagge6849ycoaxnv189a3o0nnu0azbwa1jg0iwy96pdpjjkfa6eym3nuee2u1j8jnjzkamzuy7ithog4vwdrvgr3xk',
                receiverInterface: '4pk1yfh7iu602b111lz7xl2vf8fi3c14hhjanfe4rz6vwzvbko2f20h73mgxnawjuh2gah89ic278iolrtu6epmg8oalgo98su7uahi8ci6rn69u1rcsdizeka9c5c0qee5kl6q64noluqf9webpregm0xzn7j6f',
                receiverInterfaceNamespace: 'kjq5bc205gsoiy7hdlaa1gev6nrb737cp3tlzke2d8szkpxec5fhlf9aws0emhlc106gxjcp9abn86h00psj2pzk9b1f5ssc957tgi5w3s600b22mmq6zzr7oawfrj9uiqvgqpl3kpxo3c8t4fn5xxtsbb7nltdf',
                retries: 1521360828,
                size: 2322828941,
                timesFailed: 3992471390,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExample is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailDirection is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: 'kw3j9dlcap2gwiwx2dac',
                scenario: '8vl1zxxkh2s4s57loweictdzp98t6likm72vm509j6q9gqwtmi0u0n6z3de3',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 04:27:08',
                executionMonitoringStartAt: '2020-07-16 10:10:29',
                executionMonitoringEndAt: '2020-07-16 13:13:50',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: 'xm0tr39jzo2mkymm3ei4l1062ipyuux1w67nrrrth80in3cl3h5usafm9mtrujw45jhzuemupn0sz6a0s05r7gs47q9vnfuu9ne3h96zk01g3uy4x25u136mghxgyee0hxli66x13rjxddhsbno38l6fpqy0t2mk',
                flowComponent: 'g5x7rxeb32c4hzeh16sa7rh1p48c540l5gl1ska5yuw84c3nlem7qpxqfxxou6a7iwqpkhftn3tbuj0jpeh3hdnvylbh46lh4whmjnt0pkf4frj7fyb1jd8rarxsup5sxeldpfwgqgfqoap6hpz0npa7dfbcgdk1',
                flowInterfaceName: 'kx2j74acazoqe0drqe9md7vvw1ph6n4exag9szycr2px19wvvbnrzrxsbbjn90kw7zw42g6e6pwjgrxma593tk539kl4ke1jt0weph3lwyaj6wbada8qq28gnem544x26vjx6fv1wfcw2ix73146thnf7b74wpet',
                flowInterfaceNamespace: 't5tslc14ghcgl4g5tntsi44f2o03enu54q7iak8j4ys5wj9ry6t3kgsocu5le33e6hriwd1619gbvfi80th73w6441fgf1oqhgfmz807juf18t4r3guvmagesm18z6ehtu9sg950udn1ag0uhdihtdl2icho6j1a',
                status: 'ERROR',
                detail: 'Nihil sed dolores maiores rem incidunt impedit. Itaque temporibus cum fuga dolorem aut voluptatem adipisci. Consequatur repellat facere aperiam voluptatem error iusto laudantium.',
                example: '1j1llpew27q7j3a17dbomsvgxcq5noj4g96apv8xztq34mn8tvblox40bo8rx511s7qpljgzd7y2mosqxda5pj4ldqrfw3vga674lyf78akixtd36577l15b972pur5rzkipqqqlz4zbbqea2g85kfizdqeck6di',
                startTimeAt: '2020-07-16 11:54:06',
                direction: '2685ftu7y1lpnixaaq68v',
                errorCategory: 'zotix3ruxgk3cts8x030ixg7944dzngohpm61ryw9egz9eg3a0emscu5lsgcs37jin6hk51mf7br7q3iippv5s6aux395885vy8yj5vpv9f2s6mmmpx8ubzeiyg8p848skdv06wg5a9voh6r4kb2n2p7wm1j07z8',
                errorCode: '5x6kdo4lyhth83vmy4x2',
                errorLabel: 'jsmum7xmikvhl09tsecebrx249s7ugkzdew0fkb0kqwhgxa16mb5eonptuiqhz2jszdn5q38am62f3y2g9ftw36p6q5oxv830riz1aok5tresrfep4mnfh16h4strgtlqwfv33twvbtwi937hdeo9vrk866bip0c',
                node: 3717682001,
                protocol: '0sz2t5zw2y72a64eh8r2',
                qualityOfService: '70p4innteifqj0xplcl2',
                receiverParty: 'pmmyr1muls5asrbkra1nv921tzb3cd19idd9zc7u0j2icqdobdkqxbu23xhya2vnxfse06l1mg5iq41xeehp3chsuryta29nk2aa4o17z47ndu1heo3b0k7f4j0i89b9mvs5rvva61dpahnaisc227wcb9kv6kmo',
                receiverComponent: 'kmz8pvo4abux1z9wqljoibpx3mcxhmwd0gq4p4m0cnclnth4hzbggv1j188pin2q1epyhyo58zsvxnmqt4jpvegeywp8ri35d1v2zyf4arv6w8nkomc5dlcn4zbs41g4ihehjiw1rhlv21ztoecnhp5pox2r1tuj',
                receiverInterface: 'ajjp36otg84k9ac8slvh3x6mxnl4md2zeq26dox119bjhim4sw5bcuudtqp0w3sn7triiatwy7r4d0c8f2zspb3mee3wf7jr7i91xy9zl7bauf5sz1tfzmjmuro9mk9thbc13izlkbd8z3vy7u4rrmjg02igm5m3',
                receiverInterfaceNamespace: 'ypc97gyrtxlc7ofonie8gflxnpffdb29ihcoqed6e36s0g1vld84b31t5y6hhnb30sh4guqu4i6eiuh9dzztuwxtlzi32d7iz1t46fyf71awyeocj6zzqewcmtz6c0h7es25izdzxjkjiw7tw0ggff5h1e7zmf1p',
                retries: 1034003531,
                size: 3560781143,
                timesFailed: 6534594356,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailDirection is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailErrorCategory is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: 'nhixfrgo35bh0rgbqixc',
                scenario: 'co1diftmhh6gmp7pemy8mz0w6535tsntmysm6cvld3h436xzjp7yvlm7938z',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 22:44:48',
                executionMonitoringStartAt: '2020-07-16 06:01:29',
                executionMonitoringEndAt: '2020-07-15 23:02:45',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: '0bgh3vj3af4am9yplt3odromw9h2x7lhy067lrln30yn1w05r2pq4widxrcv9nb0nj82ihd8bj36i8t0byu6akbp0k5rvhy5pv2q2cs10khs0iifrf561ciisafm174k9atddvy1duzf3mbot9oz4tzlmp7cdk5j',
                flowComponent: 'h6ly3f04zsh6pl1bym1dvkqjbizux5snnye8o6rs0mhybskvk2npjpqvebmeaupwv8cq4l2dq65s3nz0wb5bkh0b51pze165gna6s8tyriug2dcgy1wjgo9ydowz9dycno5dlopory8enycqmbpqji6ku4jv2rk1',
                flowInterfaceName: 'mb0nh1tnxrl66njtoeifvq4xnnmw73nlr0n1he0fzi1up2zuzpmzf07gjo33xb93alte9h689kh1t4qdzvleeu2lo8fob1vo2qwf1avu97xkv9mw3s24dipbq8jv2odvovq0qmn9y1r6588opznq6o1l9d315vz3',
                flowInterfaceNamespace: 't8ga08270821925pdk124l0ozlo6nv9vmmqa9w4ukyyi6aildrax7mbza6ulu23bgs6w2gwb3qr2pijqls6v7mg0h1l2g63aol6tzj5c8y2tjyn5bts8bkimpp3z847xc4ns4zvm9solg0dmufe64aun0ykzkoki',
                status: 'ERROR',
                detail: 'Quidem aperiam aliquam illo sint. Aperiam accusamus est pariatur placeat rerum commodi aperiam ad. Amet cupiditate et est. Quos velit ut fugiat nihil dolorem nemo. Alias reiciendis aspernatur sint.',
                example: 'tqhpvbq9hpw6xdqmoo9bs6rvyvalt8ruuh53oc803n95rpaw6ckelv1j4obe5hw13hwu1lr2tuyulmuagdxyl35tefg4uwebbjcxnhv46ce7x3pczjik0elu9nu6ix4mfqw9x6yvt4q1klpu4m2cd3ermweleym2',
                startTimeAt: '2020-07-16 17:49:54',
                direction: 'tt7vtxihz87afkkwfqc2',
                errorCategory: '9mihl14x52euhm2a7em67c0ymj5nu3u1g3z2k13fjty61502wh7ab7ymtih6cojwey4bicwy2vjnef8nvvzfiyvoqbx25v8gampzosmnoijo107xdm43nku3nerjc6boprbywmcm386lsm707x6tuaazegmvs10u9',
                errorCode: 'ml0aq2rymonoe7dmpcxm',
                errorLabel: 'dz3idn4htbj0sd3bxs3ge89jgm8ufygz2g21xpesm3j9222l8ycy0smp0sgnx212rr3frz02azksillx94kkvvufnk19bhiqjxmfgp1hh5uq2w5j5by03vq2s35m7hp2c05h09sgie0hl48eld078k4haxq4cwfc',
                node: 5604588661,
                protocol: 'ymmdaohmrbnbbzh2xkg1',
                qualityOfService: 'kyqc7el02ixx2f7qx19h',
                receiverParty: '9o84wpddf62lhrauceeu9vjya9ap0kgynv7v846uq6uyujagnsecjcwy7h8718f0e4kde9ouxye4bd0xnytilczhde8b6w2fqs84hremvl6iu6soybaq9mnyp7nbcar8y2qgduhihkp07exuf091swt18ku6rj43',
                receiverComponent: 'bfhzphg044ptryq8hz9gzzjsyztpzwxypal9hlq66mkqabkjyg5wmre6d7ib95huijzl9r1iqnnsjjxtb5pnjtw3jtcmqd05kjksqgyfe4tu3aftcp9ivyq7hp9ktmfh57anrm87523jk6u9taksdbs7rkbvw9d4',
                receiverInterface: 's70jcocn9qb70k4vu3acefns1szpb2gvhetgzpzwsorqvgk07ols1k93iyvsbmp43mokpu4qty53ofca5vso2t1dfwpngiqma4fwnxql0fe54sne8furxhn04lvgxjmks0f0foj7k2j9haqhhlbrtyx962m0smvx',
                receiverInterfaceNamespace: '8ac1ksc9banaqgf2q8026t18chof0s3ztrw3q30wojku7p8cjpi5wv2eftlxqoc9y2zqyfoi3oz4uy59qvxp6c9isp0atah4eh1qyhxb6ac7e6ethljzqugzg7ctlrgrz9ys2rhht6crnwuza0mnlsxvvesusasy',
                retries: 2848972647,
                size: 1170584950,
                timesFailed: 7281237316,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorCategory is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailErrorCode is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: 'rt4mt7s5h8ppp41g59m0',
                scenario: 'wm7yryf0kypp17bpws6qkm31ird1cfvs9blytrxmxwtq1w3796ywrxz8ery1',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 11:45:54',
                executionMonitoringStartAt: '2020-07-16 07:36:34',
                executionMonitoringEndAt: '2020-07-16 12:03:10',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: 'qf966jo1tv6wjd20mlmtud53h0o3xno9g61gkxl9tfvcywv586025p3e0gsbrqmud7u6idk6g8fgz0h3x6wok444sk3c77r8j9q86i65k9g3qc7ainm2hc2e4l8msgaifvdwxwcw3btmeb6ouno331xaz0b8xuk0',
                flowComponent: 'ywz23m8echug76xdmrwj0mcjnu83zgf6v8i2fn4ehot7wbcfo91wggb2ge7vipdpbngcyugqcvnc5c76s3x2l8uzvcp1583k3dti5h88q6jmhlwskg4zrnz1otjkznogc616o4l1m7iwvshvm9evurd1c4jd30u4',
                flowInterfaceName: '4u40s6glpx7u1a5u46yztwhxtu7rx2fha18gdwz3kcecncavsyffj0jo8wuj8jknra3gxz6am4mdgd60zxhsjijacki13ctzphixe11eqh4ihjx1jqj1htyz14ehzbx6zgg4duqgarun09qu4gx8juwzctzdh2yz',
                flowInterfaceNamespace: '7n4as4k8w8rjro9an4hgvl43w30z6dhaehjv3f6qiezjinec2swx01ie6e7o5gkq6suwf0dzxs987563wr46tdevu0d5n5t4j5wraguyrn88qpxiymgyy0210aq84lmgnxmundtifs433naq7glog9hfgejhnd40',
                status: 'ERROR',
                detail: 'Repellat dolore consequuntur accusantium necessitatibus ipsa repellendus rerum occaecati. Sint veritatis rerum est nesciunt exercitationem iste minima blanditiis cumque. Nesciunt corporis explicabo et provident sit ipsa sed tenetur.',
                example: 'i1jxanoqx4gymqr6p13kpo7w7u7vb4dd0xlfvjlwl29fhz7v8mnpn8pvgax1a6xohwreimtnpybgyzp7zig9r8llgxrs2q33zj7wcwpxephqm1r0c0kkfb21pij4397mwxxewzbg6ki2tm7xwiypc1p1gzt3a0dg',
                startTimeAt: '2020-07-15 23:12:40',
                direction: 'pl6x13x1p92mxkh4hstl',
                errorCategory: 'yl7p0crwcxgu9h8zsqxzc97htaamfwslny8pwt3mqi0ua2csguh2xylalnyk7z52884itayp3iv4o29kuv2ccr15epke37h8e708xayzn9807qfcqb0isdk07kkcbktfq11cvft4xau8oa3zxkwylbzzdujpjqlo',
                errorCode: 'nvuqp0907dj0e5mkp6doy',
                errorLabel: 'qswcir4dah8utng5mgv1goqq8v5kajxdzr703bg6tx6rvhszgyv4u9xqfgyvs11s0gsi75st3cd1vbnpau879g6u69tdbaeb5hyksi3iyydc3xw0te9imgwdlmmpdz90w73mxmfrhu44hfx1znumvfsrlevne1bp',
                node: 9192013228,
                protocol: 'zmx3gt4yv3fhqnib1umt',
                qualityOfService: '4c14rrwugth0rudz6n1t',
                receiverParty: 'mskp6ugr87up6twjwn5o9lwd19t2nu4keyt6x2dz60pboin5od2h2dle5fngv30ywnunh903prn2d5zgdpwst6h10nfai2zl545lmd4f7c135ka1cwfniuyce6yb6ltcgxlxiy8bju4ghir7yejiyaqceupbzvr2',
                receiverComponent: '02spgn9318oj6u63nsn11kc8f4qgqsj31k5vc44lu4s56183w53lqfou6efffi6f97plx34ars3h8ssplbzc2uadfktex7v2bvs8jo9wa4gwhw1h3p482m4z3ulad5wflie17q9llguax11lmgsj6ksad9vyslzz',
                receiverInterface: 'va4w36gq2h6llfuu1tjdk1ghocotlgkvcb53895xfrlaf7y1lrkwl9qwah7lv4nwd4812ilhem8mlxjlra0j06g2t8msnfg4nxgwtcvx2wl7pjelt7kdrgg02wf5kbfw5k6v76kvy8auyvcwdk03z0denei0h3eb',
                receiverInterfaceNamespace: 'cshzpme0xfyobtnrcu0wmw050uwmvl8gsn5qky412uygeesroqjcgd6b80rcfbtjqhpx5nk8jusx4dz8u6ynznm6lfgxoqxwt1snsigssvkhgv8d8qcf27g0zdgbvjn18fpai6i29gapike61mm33js5k6142w5e',
                retries: 9076863283,
                size: 1167737877,
                timesFailed: 1278869164,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorCode is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailErrorLabel is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: 'lnkyq6zsmgvv42cosp9e',
                scenario: '7el68q59tow5xq7hsa1wyx0pxkbhtsmnx6v582ro997t9on7ghvk0cszna4s',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 22:26:41',
                executionMonitoringStartAt: '2020-07-16 18:37:27',
                executionMonitoringEndAt: '2020-07-16 09:33:56',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: '84vasw3a0e33wk94aoaw2p6pvcj01q9jea2hrzzhvf7scwwkdg3aeahr16jvgta3j4hgwznompzb6yfzua55cbrbie7b5q87h2jypphizzoxue4dg103hiz2usgmwmbb75g9r3tcopgyh9fob8bsb8yolrzjfkfy',
                flowComponent: '8y5nnd8zsrhtacbb27cbp0k7pqwsmau2akj08ykeegyb39ji3brzen8wvltdd7ybg7g6co9sv7w7cr22uulr3xcmp0byplsq5s5grbf6nbua4xv2yw9yri5mr2imwbqubvx22xhm5k1dbzfgfz453hw0aeprugtx',
                flowInterfaceName: 'uk51jbv2rtycjyqpeh9bf1jicjy4d9i6mx9snqzkpcnaa15rp3p6v1zjttq3gwpjhbdbousrd1taa33yl8wfv2cfxdv3q6zvayh7dmhd4j4123fj3poqngjg75s42d4vl0qlwzkiaypabtwwcuaymmc9p9eozr2u',
                flowInterfaceNamespace: 'zj4z4tsokm8smirqhetqqv8k92979n3f8hfiz4ebkevvijlyenm22e84bjdni4ypuocddcwvwo67f10plmgclv3oonef7n41hyd60zcrjz7tufh6s1wzosm3fx7eoe7dn1sywxd09tpojq9pr2ichnwfbbjuyml5',
                status: 'SUCCESS',
                detail: 'Suscipit est tempore aliquid nihil doloribus dolorum voluptas. Dolor fugit vel. Et rem quia fuga temporibus ab. Labore reprehenderit praesentium culpa. Sapiente adipisci dolore et deserunt fugit omnis nam vel. Eos quia ullam.',
                example: '4c4wker0nic5jquj8e770ynqndjfhotxrv4cqpxflrb2b1hi1beeehoey4fm8oz8qbfcga73pnvyjq82wjs1sryheyk4avx6ffz2gzcwrlc1pcs00h76guxz7gxupocd9wcwjm7dge3mus2a1jfnwp73ljs7yhc6',
                startTimeAt: '2020-07-16 11:49:21',
                direction: 'z923ebw4m86zn52pzvkt',
                errorCategory: 'uvv2892wbhv63wjz3414gczovad0msu29onyvlltwqmd1hi600laj9d76dt1mftoop1o2o3hjg8eib1thfqthi2q98t3mlo046ftv6txcif4nqhlg2ivgaay7qkgern3webv2cs8ith6v0p7rv0yx9ogc869t27f',
                errorCode: '4sq87k162ukhdy5wp65k',
                errorLabel: '91n1gjs9kjp2jazdw1mixbqtynrbsl5u7s4j5rh2vpg8gkqtbwzdrx0t23p78woxbsl460v46diq4h62vlekzlg1y0d10as2i3rkszrl0vwdm21b89m69h331d1pej59w0rvx0hqb44oq0jblcewm1rgpto05stca',
                node: 2322063546,
                protocol: 'emnvkzuhxiykrikinlnw',
                qualityOfService: 'baployohgl8avqwjq7sk',
                receiverParty: '8d2w4ivxg28qux6yuglv62zkhr0tcw2v5qlbtog5sbzb3iiw5465ovtp7tyo7j2los5n0hdu7f4bwjuwepqoc32sl95jtd75a9ix1ikxwk03kh0p7lte2zc779kxpfstutyyizmxcluoozwiw4uoc33q3r7w2unk',
                receiverComponent: 'bdvi8gizk7ry7xhb0ouw7j5rrmq9aejqlds611i0893ddf2zhmb6i5nek3oekkl2tkunux48bm74xdh3gt1ewe1m8xy7llndexj1bp2jsswqjjhug74uigfos6n4v5y5y0os2kq8ilsog3qgu5byr86v4yyxvvwt',
                receiverInterface: 'hlgussmm9172w06lgkq1qkaf0n2gqpuqzg3795knfofnfipwrivwsr509x99au81ni45panilo3kbgpx8ygeyunpe3o8a2dwvcymujt0wbux43qjt7f7mrurz5n016kg4x527z32u06rhzkyrsbw0u48g3f5lx6b',
                receiverInterfaceNamespace: 'zl0scnxlykkjc0cikhkp1kdw8fz23nykp2tybvl0dfb8gsozjax28306ukd99a285fmtqrm4e4snaxqj5n8i08btt53s7vumwji96vi0m3yryu7l4u3aofk3dyrjd4oqlpzl0fqpznag0xu355ibezgvoie43i1g',
                retries: 2899480045,
                size: 2632342240,
                timesFailed: 9319523525,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailErrorLabel is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailNode is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: 'ajgdyglsng33fvh8moue',
                scenario: 'aahfhs6kop2zcuqc6mrm1zit1s3dnz2h07w7np9wjuwy4tmfw5txgyhvj3hr',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 16:39:45',
                executionMonitoringStartAt: '2020-07-16 18:10:26',
                executionMonitoringEndAt: '2020-07-16 05:31:26',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: 'mq6g9j6onppswfzi4w7k8a9ho1zt3cpo8zp8492j5zl22mz5fin023dqrnxxtarmgu9uvoy2cy5zdajso9rwoo37492vr511hofs9enxs3a88nmxqpnflg0t8md883n2edcv22yc1jox5ahaweiss0n4wij0i7s5',
                flowComponent: 'dm4cmd9lmrpgrs3qtz8itjcw4uy7540259l0cy05qiru4jrdr1k1nsj9x0o957nkrqpppfrnf317xssv6zmuqf7ef173ye3cg1xlw71t24pey9bfbvbreibgmfwdtis7xzs51d2lbmisjxu14t55s2o0xv2m9cy9',
                flowInterfaceName: 'e1odbvabjf9gs8q2755hnqc7jhak3l0yyunj9yd21xgc4w91waptnx9df1z7ajw2dajaml5wu9cztgjcnk8hp4x78kofhppe5x5yvkr0nm0zuv4169d79l9uif99yaswu2iwucm9ovgo1l1qrgytakjzjkmqr695',
                flowInterfaceNamespace: '9mjy5f4qhrlt10bo2a4v66g2pi8dz2h7zxlflton1rjscchlw46zm35lnif312gzw8hthk6vkk4vsunbuoklgiyho98vbta7wz7kqdevcp0lth3i1af7eymzp787qiv069a8qvvq8jd2dh5t5uh9e2fvhwto5ky1',
                status: 'ERROR',
                detail: 'Distinctio iure eum doloremque. Voluptas culpa et ut vitae possimus fuga. Reiciendis voluptatibus quis ut velit odio saepe inventore voluptatem repellendus. Voluptate natus quia quae. Cum autem quod.',
                example: 't68xxopwjkiz7b5g2qw1uxogyu3fy676z4iqujmd2f3mltcq5w1er9xgjzxubrfwvd6mavk90ede6xiqlwr7gyvxlhfamkx3iuygyn81psd1xrls57fa8jbjqc8ye1y81sfyt7had6srk6upmiaubi9hhod3d95v',
                startTimeAt: '2020-07-16 16:19:00',
                direction: 'oy38bnpjvtkbmg4985sz',
                errorCategory: '0xvokycdcpzqlxlaphzwi1z5ah0d2q9euc3jz1sg5d1wt0xxx7xsb28wzeqoepj8lopvby2fqr59ql320at5jii1k0fx96i2ou8pyug1bz8v0adbr017cnewmr12j0g2hf8r7uxjyilsetkjk6h7q2knym8bux46',
                errorCode: 'i3qtzk6yg208ngquymgx',
                errorLabel: 'ap6ar6izwta9fjptytrp2ih76llxirdkdxwg82ubf62fni8ropcsuiaaxrdzhdq2vmybg1q7ik38d8a0f24fhy06zj1sqdldvwqf7mwf7aqfs0ngb1uk9t63mpwx0389n60dx94x4a2qwgrhmr8mtzr0lg8rkm2v',
                node: 51789258175,
                protocol: 'v338rhqdvqctf5b316i4',
                qualityOfService: 'trvzhgztyp71zfkw5006',
                receiverParty: 'nxf8b24va88k6rb3wc16qixbi0rjcg38n7vfab23lgtlqjs2msj8114wko5sqe933wtya0hmhmy3seabu0f5cglh5lxh9u8i8ze3pxrd4lwtyuaysru0gaps0uwupkwm4hzykfkgvp03vrcx22mj8s7shciloodu',
                receiverComponent: 'kfay9rvms2tqp850j2mh33sv4d1jyulcq26ghc2343axdop8f7tr47s1jgo0n3bfy2nj5p9co4jldihnhrcv4vbsyo1621j9z9yndrm9snq864jhpofklv4bw1xm4o4jgtpjmkid5hdaqi7buktjlmcfidswqja3',
                receiverInterface: '8561vg9s9da4yqatb7qz9lwkmg3i77ssaprkoacm0r60i5ju1i9bloigj51344i66sldqdxydaezr61zbdbxuulrkjhjf98ejp07es227tnxlf7t8ibil3v4qoh7wjs5rq2zfh2ev0sqijh1s5mtql4qy7tqxig4',
                receiverInterfaceNamespace: 'v7a6qz3b8fwbh3oqw51v4dvu8zhj0jguag8eez7xhnpe5j4epjl40q6g8yf6mpj5jzpgt6p3489lmahhi01r848w0jo4akfi41lhpdds9zk7nby5j0ufpaqibqj7x1ewb2jbg4babgu5vxk6h4yfaqjc7v0me0uz',
                retries: 9831629549,
                size: 6801832847,
                timesFailed: 5067347002,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailNode is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailProtocol is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: 'eisu3jxrviv9cm637k9g',
                scenario: 'h58l316hbq43f8susoimihmi2nlofhrdi0cih5g5p8wayz10b633ulsphwkc',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 07:45:36',
                executionMonitoringStartAt: '2020-07-15 20:08:23',
                executionMonitoringEndAt: '2020-07-16 03:26:49',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: 'a6rfj9byxfbj1wz5ab4hwi3h1sgcqqbfj6gvxs3z1t7p61kwukxjo5k3ud865j8pp5xx1b53udamg3bijmtwahbaoybkcfwjxha7qa3dffol9vqb898dn2fkulzbfu44fc3v7p4zwz8d72shuigg30a1b2wc41ds',
                flowComponent: 'zg8p4osu8ban2xt9mtkg0ll6phlpnc0oz5p3gv1zc3v6vqa4m47sbcs29qhsyqu15ga728w66no4nro3yrj7cal6oqc5t8pe9dbb5yiakiwc91fg3y7f4agm30g35ospjxvnefzje16kbb20awp9dxjo2vcipplj',
                flowInterfaceName: 'bt4nxscr0njvf3b1cytbtq01muo8wyd474eq953y0t0tfl7ouzv2qa2mm0j5ru2ac04wmwh00lv8q6qvlu6ssf9clz5s5vb5put7k7suql62frv86empiuk24tgiu4utx334odmbphkd4w6lggqlsfk902p7xf9k',
                flowInterfaceNamespace: 'gm1catpuhs5upkxu0c3rwhegnzr3j8h6tr57c94epok6qoa19a7ha6bwfqkqe61dcde9w3vznt2vhld29gkkz16onk46u6a26w85f3iq3lgina7f44j25xjs2fy9d0tksegwsdrhq7iwyys0pffxfscpc3kzh89t',
                status: 'HOLDING',
                detail: 'Omnis consequatur nemo officiis quaerat nihil ex in quibusdam. Quaerat omnis pariatur et laborum tempora repellat sed a. Nulla minima et dolorem enim. Quia veritatis qui.',
                example: 'r11hr6lu9zph5pt1qy6o4kvl6k7yjroq9yxyb6nhmbja81e9nhpgbbdpfhf0raahajamdhv4g8h1uuzw9poeumywu73owjs0yqozgevt6cjbv1y8cuklbcaddju0s2tkclm80rkh2ui37pdsxjxqj4u7uno25ua5',
                startTimeAt: '2020-07-16 10:23:36',
                direction: 'k5g9oljo2na2i4vrh9hc',
                errorCategory: 'ogkaf7dd35mijv8k6qs3deo8erdrmjk84d0m9btetb6enzqp1g2jk9nk7wx6avtkn6tomoivm89sw3larhp0dlsax6cmib8mbq6yshy2xeu8p8amewdgdw1wanyu8pqyepopw1hdhi1hd3lcn8l79b1bg7zfakzu',
                errorCode: 'mbfk7xlt2xnq006ybg23',
                errorLabel: '307t19uf7gdj2xklcr7o51csr5ljcdidwkt8ys7t4uwc93zhdlvhl6ibtm2mgkdusoiubf2vls8yek0ulrrpwha2jzni578rpve390zo1qaup293v26qx8r74z6q02add7apog6vv1tdavcajatqhky0i31eqat2',
                node: 5997158890,
                protocol: 'a3oqtt9zy0wnor5rzwkao',
                qualityOfService: 'ob48bo8gu2lkbesymxp7',
                receiverParty: 'tvp0ge53kbflytz4aqees6mh1k5a6866oahegtpd78vro23rim6s7679fiss36rycafl1xux4tjylnmh1vrd5ogoaqhe6ss98c9f08cyrt5kii5c83jn9i8ekyf21qkwbuk5ll52b1efqx59o1ndhy8f6vd3mo1v',
                receiverComponent: '4qca8b22m34t5yxtnuqcjzey8wdl69ei8dvup8vclc1g4y3ucob8f1zbjj17l3a22s0td6x2o2olozz6jflnqy1gc635duxst717ii6r41fwbg5gdk5j9vmkx1ftyo1kx4s47i518sr76db4l4ig0qpnw72zz1vk',
                receiverInterface: '1obdoj7rtloma8icwe3ux32fzn4zq48f5zdv6287wf0sft4s4kjmg410ts0a5ve034mgtskecdm887pcw7nvi2rk18nfz7d0dyobqso6lije20cpqydd8fqjm5fe36932isgbzcuj96y84iej0fci0td4p3wmjbc',
                receiverInterfaceNamespace: 'm5r6pjg2mfn23dp92xe3rvcqf0l99u97ldagszfckvy7xsa7pa2w8ctdv85bu8140vy4nusaalzkg49asvdqeywfwqbbsv75ao4e681rodwldqxn5wugk7wzz0a8wgmbxycgpe3c9vqdq69y3qq636ludw24pmou',
                retries: 7599904146,
                size: 1256423686,
                timesFailed: 5498007399,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailProtocol is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailQualityOfService is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: 'n9fh8vo5sn0hwgfv19kw',
                scenario: 'lhsp90bnmt2yt6xxx47nktavimgzxnpurq4kjgz0rg5vnjb2hl7f86hx1txy',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 08:26:39',
                executionMonitoringStartAt: '2020-07-16 10:54:08',
                executionMonitoringEndAt: '2020-07-16 11:41:49',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: 'kk9o5zon57gnh0x63uv2mo2o0in3ja4lf6wzjqy7qeg45eo5f2pxhv3c7leo9fjvt2n3lwuhxczxve11jro1jnshwbf6i2gmrbe8lvqsb2mrcrk4mehqxfexzx0cgxrhmvjpy8f4yyf6oc6gfh7gc2rkrf1h2psq',
                flowComponent: '3dgnbpvbcd46jqg5zxye13xrzcxiilf25w4znk8pbmvymd1s8hirhkvhzjl2ey13zdu3g0in9k4ld947v0lgc0b9vlf6iz54r0fyq5zkbq9sf3rtvzienwpmlsrktcwamxj2qy0cjjjyjoak5t2n0bgai6rkedki',
                flowInterfaceName: 'xpavaua1xlnhy35bjf0022xwywfdy8u3oum3wme67al3xxp2zsrlv2tabuxlkmkppv56zg578owviw5n3mbekzv4uzsv2krmo3ta5nag1ij9a3kbhypsrv79oia1a3tl47i4twx1k7ffemmfhqxi90lyb1jz3j6n',
                flowInterfaceNamespace: '8kcfr6rocw4g9c4m5vz34ed09hpppzvvhb1f3ar2hahdfmto7gbih6jyn3bhhxc7t8ewi9e3l42sngv1q1yafc1rkb0aqtenbvjmgmtfn3xezte8hhkjln2o1n7npplzu45hwxx9l0udsdggmzv9mdht9fq5590a',
                status: 'CANCELLED',
                detail: 'Eum neque illum iure ea eos veritatis earum. Quibusdam ut voluptatem natus quae fugit quam. Et at qui et sapiente ut qui explicabo. Consectetur quos animi eum similique officia voluptas illum et et.',
                example: 'z50mlvwtf4xhw12q8ffgc37uumcangfjw8wh33wkn0g42hjq8rcn3jvlu0bdsmjhomb9wrifwtjk7pqy7fzvfh7w56jjrvqxergt6rnysovyrbh4k1v3n1dm3iubashgmr0a779jcs0eg1fr8pj93x5twtpy9k2s',
                startTimeAt: '2020-07-15 20:20:13',
                direction: 'eoua51aul77qnc52a2x3',
                errorCategory: 'f5yucbjkvr8pupme9rvevwpozw7nqquuxcxxp68t5vm6metw4zrp024znfvajap44cpfi7vqnqrqzuflgpzhp72ivbre7s99u1boziwzhslrpbsr0cvg0bbhdv0rls4lftxbv2qjumpwy5293a20utr1ayj1bta9',
                errorCode: 'receebgayjmdq9bz7udk',
                errorLabel: '84atfnfyf3p2oc0ywypm29ldwtgt43th0ng095yz2es7mhf0lh87ytc76e4ae7c2e6f46id1bsln43z0i0sautpuu1yi99ia3zpus3653tzr656ij99t6f4jibdjhs4dr7r2ohy421g3lbr10a1uv7fti6bh34uy',
                node: 5365646433,
                protocol: 'e5cbpayn9cjton9030hk',
                qualityOfService: 'wkps6fghwov740u5qwzml',
                receiverParty: 'vhg7byq4xsrpy2q9ax2kjhwnky4lzj1w3wxj3n9qnvpqzircq2h3m346f759wbwfd4qphiro6w0okyq7ot95a33cawkbmnslx0g7tls4l9z6b8vzef1uiywekhdqrfy3vawkvstz9uk0audc43wqjp7jh98ilf7p',
                receiverComponent: 'gd7ng0o6ncpgw68hp4ofj6cmvwu98lj2okld9b4irsrelferxcpfsc9xlh5weusd9fbvs7ux2o5z82y8gb690zrg62fylklc9cye2vwdj8ehleno985ree4jyhfs42b1i82ng7hd9pl87w6xru5ikdra9tuy69pv',
                receiverInterface: 'n95yrkpel9k56t7xl2k81bicldwkpu8q0bmo7luwcig3t7lfae9purg59i2yqszxmrkqu2hulankaw30bm5r16zln7ermdktvorv1js1agxqtpmuvsac9l11893o9hdhny9snvxinwzme4qvyzo49bzykq2t4ovw',
                receiverInterfaceNamespace: 'rngkgvdvctw9zo67da9f3aj7dh8xddspe9efx1duiwmpy7v1a24ss61uquktd8k4udrtsmhkj1xhy7s5pzz7pl8hklxh6eobaa8dj2s7t9c2zvp97f1hok77p1mkkw5qf522rqpv64xjbupqx9l0a97o4ezbt6r1',
                retries: 3851835915,
                size: 7486212879,
                timesFailed: 1174456161,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailQualityOfService is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailReceiverParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: '0il947fohphrlhfna3ig',
                scenario: 'h9ds6budcp1sgt6kqruj3bgbsqt6byg4t9czbed96u6hovuczbqbfb8tuhjj',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 20:52:39',
                executionMonitoringStartAt: '2020-07-16 07:41:50',
                executionMonitoringEndAt: '2020-07-16 01:54:50',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: '6vosysatoxxmbn72mh2003w0bgu993calrygtwk935aod4apgzysqpig014oxi2rayilfidk47nrrvull3rthpmst5k3887lnrt516vxmr0gad7faekqn974u5azw0bwdg1xio1mnp8dpmebpbee7hc2hevppucr',
                flowComponent: 'au1b2emu3g1s6iep0uz4tmmvx6a0sz9ksxdgl3j4jgxmeiowyjalfg6lj1fnad0wcgsf7m7tjcnzfs5ss41h3cq39s8odwi890gehihyqyy2dnv9d6tit12wjjmkidxgfg5kmnayp6aha819tuxnyhk1zdroi3li',
                flowInterfaceName: 'gt0kc0f7emlubf22tbdnpmvwcqjxpdh50rg5hy789c8bujr2d7y63e1yclf03y3m5br4z6ikag0j1szsg2le4rhic6xbtpwvzglnuetnrgi66y0ozyqx9ruj4yae189mzyo2ou4lmvg4ldjada8sn4lefqvv18ln',
                flowInterfaceNamespace: '881x9tl9yg06mnw4tojm7b52ijfibd8v4b5ahm0c7nxlpxwm25v66vrzz5awaphwd91dwo04865kj0m9rdq1csh70je5q7a2x0eu76mn6zalfasxepusn0yt7grzakmg5h2ixi7pbfwj7d44mz6ha06wqdkcs20e',
                status: 'WAITING',
                detail: 'Et non et aspernatur aut nihil animi nemo nihil eum. Omnis incidunt maxime praesentium temporibus. Quibusdam quasi ratione voluptas dolorum temporibus eum. Et veniam eligendi amet id aut laboriosam eius et odio.',
                example: 'iewwwvse2dxcufdl3tzryq1zfg9bu4jk23flg8b4e63mg39jl5p93r0ssugktusrr2qbvwmf1c9jpb8ktttitkszj7j000iz8a57uac0xthltzzzx4t3pxq48kvuf2kz9jxb6ynmi6oykuhlavq69pd0tbm9ecj6',
                startTimeAt: '2020-07-16 07:57:21',
                direction: 'yrvhfe0ljdh4up1dfdk0',
                errorCategory: '3t6mnndv6xmy37ns337bi17q5ycw2bqwj4hrshngl08yo38gbl5uzdajbwn2tzez95tkfa4rfloe8xs8t4rgxqs5lysq55vnk799fktexi98jpyea022ezgy86ae399ga7uyjtw8sc0gfsokaqrw6pfrjpiplo7e',
                errorCode: '6psh39i6huppytcbh5s1',
                errorLabel: 'gbj0pi217wfu0pw5s33pky1bt2c6e4jp01rfalrunyptqdl5p7hscxfbu86tu9ra0emzn02rb4c0zha1mbtzy6qvopvdimy08xgr31d72aguvefx7xif1i531g3phgxj2n69c1utu8chp3xx9ldl21pqchohlwkl',
                node: 3769444314,
                protocol: '3ea04dpy1t8q53ca67jk',
                qualityOfService: '6m5ucg1oyqcu94hr2csh',
                receiverParty: '74wx1wgguxkiomfgo6h8jh19ntf1p9owadpynwn447zgovkiw70ykj0c7omndwl7cin6l06jpsc9uuape2vple7boj2jynrr5197cneh8523pmly2832tgtjz15333w9dzhykbwfz0p9nk2izr3mshp555bs9g1ef',
                receiverComponent: 'yw1o2lkm6zvu652rx287cxlqrj4na0e2hrx5ajeyvii1d4f3hpdflh63so55gq81q2g3hlgytlvrz5wdkhcwtbbfvz7mxajd51fdsom5gy5rgm9leizrzrp9ghar2jth7ar6gkffp4yfc3j703f0my6a9cinaijy',
                receiverInterface: 'tki1ac5cmt80jw2ziciz350agcxpl90aiy2om4g2njl66eyj2cbkgd8773lq0m7imdo6ff8bgkp8b9qg1pvvqgsgwbtv2zhv0f8e8btdo6kzdar5qlkfaca4qq8f0bx4jisj544ludk26phzi5w6z7qbjv98w5wm',
                receiverInterfaceNamespace: 'odzcxkf6xwg0xnven0n4jd0iz7i19v1snek0bicmkpzj8binj8xtf68m2gnzhr3tuw8fswzye4q0cs226odwpforq5rtfdnpxfchirgpr0rfg7hpjv8vuftk3lz0tjtnqqkr6ei2w1ntumf1bsajlejdumwbg6xq',
                retries: 3758395875,
                size: 9046008948,
                timesFailed: 2426548522,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverParty is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailReceiverComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: 'jorpxbqxf27mnxcbjxdn',
                scenario: '6ixhnkss7op2bzglxltsgijfl6row771f419wj3kewr2ttcb0rb4x0c90iec',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 16:21:57',
                executionMonitoringStartAt: '2020-07-16 00:56:58',
                executionMonitoringEndAt: '2020-07-16 07:00:09',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: 'q3sd14ygqm5y9e1kh8vccmk5evw42h52eupsfnul0gwqgviz2ly3un5tzyfy4mwu94yctumyvbmgeziyb47fjyzhqms8k3wj8w9vqq767k6hgylptpso65t023zq774e0raueck9r6p1hmzrnd3k1x8q8jtbl272',
                flowComponent: 'mlzczd4fini5dbrys6ol05fc41pkk8zftce5qy6f0f14jb7bj93nsqcwn86e0o1nai43704p25qkgqivu5hmfpzpsh3ujypcorxahcmpkxbmha6y418pdgii1c3mkmou3c7wpyi55z585acl18f7wzqhlxrgibuq',
                flowInterfaceName: '6bdwhy51898w83c9yh63xb6b4qga081y6x5dtrc2exboih2h7xwv5z7ubpfdv2aeqb19l30h4mgvo3yfng35ctwalpm0enb9h6ld1s1qi0pxroq44iqybtdqiv45cbtntwseyeyarm8lwyfvr6o0pkn8kzwx2xb4',
                flowInterfaceNamespace: 'pyp1wvtmf208acmw3mdww60gx18xuuei28sm4fufbl7dpul154sh2jie6h15nqlyr7xf2nxba671qbic6hbaa8h7ot18qxkf3n2gxi0a3i5ahtl8icfppwyawea8bm13nfv97iesyo8akcnpheggacq8vpj85dvf',
                status: 'TO_BE_DELIVERED',
                detail: 'Numquam quo harum deleniti. Expedita aut ea enim sapiente est id esse. Enim itaque rerum quo porro soluta qui. Eius et nam aut ipsa recusandae accusantium.',
                example: 'wc1yddjty1vikhf1qim408qzqfyiyt3dqshnvk6m8g2hhps51hubugh3nqzktirtbnkwbe3tivo5gd9s3hpjmna094jceh5v19wlady18y1je0b2x78nkqz411emhq8i6gc25lq1amh1hxm28vqoxcdbp1vlqhu3',
                startTimeAt: '2020-07-16 15:49:14',
                direction: 'qi3tqu2srtmiibivicjw',
                errorCategory: 'gk5et64avoxwikb7voxb4zfbhuyz6dlvpmqfyvr9wn45ppfi0pdzuq69h3jyrdvd732o77culec4kno5jbajvki7d9750okgbi2h9f7g6mmo91ljl8vy2gzpr775q9p3uaift8klytaax1bdbka7c5epbyzn8pwm',
                errorCode: 'ek3hrev3k5qqn2v80d3y',
                errorLabel: 'f2ee7ocjsik1p85m8nsbl1c73gcyd9v1x838oj81muv9vam5shfg79l4u4tx59k1d5gq6d0hgotfurgbu5n1o13oq4ngc0qedokgjdmh0ysv95w3lcjggbsmrwhe24wkt77py1h2xw5wt63sk94rkhpsl15o0eef',
                node: 3651114609,
                protocol: 'aq0o5avkqx5vtl13d27t',
                qualityOfService: 'hia5sizmhchx7obfmydx',
                receiverParty: 'itqxvc853mlypprpezy5bfq75kvqzbf9pypybmxupqfk5qk0suxj1kufrs5c66amkd09qiw7n5krlwhygribidbvgyr77l497lcez3jufltc249cxh2ojkmjsygou20w3zghkadbawmgv6deo7r6fzzdsga72i6h',
                receiverComponent: '2hip9w8k6al903kh0d19ltnn8sxa2jgyh1fr78xkn6p2zx51hid47mln1cm4e4xz3delanh3r4ff5gt26zg381idz9j2zhs0xgvzlt95van1ep3r1wq1kfd6tadl770fjfb24qgi9748a3m5329mn5ht74ztsw5cn',
                receiverInterface: 'o873z5k3pw3lgubedprr8g2kiobqsk9w1hmaz6mjbtrmvw9vmg302i49fz789678l6tkxxoib3k8n5qk4gq7a9jwsq02d6f9s06eq5o9nsmkd0iow37cbpr3nkcc9gqgc2eshgp1sbp17xumur96yvfuvonyi0az',
                receiverInterfaceNamespace: 'mxpxpdn1jxowrlzh9zrp0t0cqatoe7ez3sliv0a9si3rrusa9e6vpgkmbljta4me861fizw314xadhrsmuxw4h25eydxcgf6q981n28txh6brxlcvbjeljo22h6n7y4tuyt7dl5ug3f6bw60p9yyape2xojzan6l',
                retries: 4215297747,
                size: 6648999001,
                timesFailed: 6004663483,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverComponent is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailReceiverInterface is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: 'f98gkurjyf75an5z5z30',
                scenario: 'porpwyz1p7c0uc613anq6ywz35haheav0xg8qwqcr3thblpk6viuhswoaysd',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 13:47:25',
                executionMonitoringStartAt: '2020-07-15 22:34:22',
                executionMonitoringEndAt: '2020-07-15 20:23:19',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: 'tfaxg9ous5x6e47em21qvz5gygug9i6w73ssg7e86zmpczosojqhvdl3ch8leyerzlyxjg9y1284yey0btxjo3r2btjbjn5ab60vp1t6p7o5c491x88n2cd8gssj0iaoi7l05scps7qpw7c8l5k04aqbxwkj2ak6',
                flowComponent: '21d0ltsrgb37z7v82584zspksk4wacprtbvpvbjtj8p0bs22or1ruh00iuy3lmzth9ma5mp0ojidqwomz4wz7x08axduybioxqwgdzyzoh71i8gar7np4doewt934w1kw58wvpd7b1qekgjkro7lutvjnzpe9ld4',
                flowInterfaceName: 'f64bda1a1y618d1uzhfxqq9dryu64ho6gtobb1h0w8v7jv5gfcw3dihdh9g21s9n70t2n2ssf7a8dj1ow8iu0yfb1g7e384sjo15lep5fewsz24284s4qvhxy0wqn8ldlmbl5sdxx7a6mj2jqquwwwufgx00wxhl',
                flowInterfaceNamespace: 'f68mz7mgewbjdhkfcktkbbrdt34d6k19vjdigkrlz42i1w2dge167tn8nvrlfgh2ff7ke1ix05zg5cm3vmgttlkwd8ug6j5swsh53n360w9a9xceepvpirhknpzxs4k9wckprbsvhfuosyrh6d1dtjptkvvg926v',
                status: 'WAITING',
                detail: 'Sed eos perferendis. Et maxime ut nulla dolor. Accusamus sequi tenetur. Temporibus odit ex autem accusantium dolor harum pariatur aliquam adipisci. Nostrum fugit repellendus.',
                example: 'uyirf722pu5ief8q7wz94tgfv8sswtnegb2tnr7woypo01zn8r0mnoug7cb80t6k0qc678du8fi41hqt83qktfcjunamx1jyarz6ot5iuapvjfp6pbky9v37025ltxepwb7wzo8bbx1j2zbcycit7xn4pfiq0qo9',
                startTimeAt: '2020-07-16 06:43:26',
                direction: 'jzj364mvc50ip9ox4dfs',
                errorCategory: 'os0zmbwbhf9w59ci9ltnt1asbac77nbatea1zodgctcxzyglgear0bazlopkw9nv6s9eprhvbjzyp374jl4g3l7mdyhnisdgkb9yhyb3cx9vrenxwhsxjnnejin9zakzol1lgjngwsru7kn3cnlhu1plab4tohje',
                errorCode: 'vlgcsjlzu99d11xs8o30',
                errorLabel: '1yanbo3710xz5lanuhn8glduq505zxdfwxlfonslsjkz1ysk75f7ko85e57abk2jmseh7gabxs7p1r95l5z9575k420zikkzirp3rxj7mtqj56pch73zphg2pc3nsk2mjakeg5chyy9rw7qvtfntbxuhf6z4q06b',
                node: 2854122884,
                protocol: 'xkrjwvdzv00abh4lhg3k',
                qualityOfService: '1vayirwtd6um9g9hlpy8',
                receiverParty: '6oyps5dmvjklt777k0mpfabtahiwrn2rklqgagt63v5cgm54s6w8oslsgt7svslrxuxdnccwoaqyrdj1hmwxb8vhvo2kna9vng41132m57u7gyy15geeptc106qr84umdsi8me61qaribx5mpl8b0yeswxpa63n6',
                receiverComponent: 'bvqo1cb4vhfypehtvw0blwo90s7yqiedqq5w8repw5bprbo6cpop7i1cqjab222ronhxh52zdjq7x1oxnfc6wyi2w13to4uwvwj39jj7cyl4xzdgugx65m610ol9vvyr84i09noq2wwe3atj969gpd9zt3yfb7jp',
                receiverInterface: 'fyy5rhetv217pi71cv0czp38is0z1isin3ic9m0kk68m6fhebwh2hwhzjs2q27n8lqrafi4vl2k7208ugo53spv46r6wofk2n9nj5t0xvat4xefl8ybhrqwd9097ej122ljoryeqf4w3smm3yqhr809xk000rrbvv',
                receiverInterfaceNamespace: 'l2bftfn5q1jzjsa4h4q6hy2ex9xgpglpux19849ry33733aa5plljdw9v4lsiuqz14umeb2ohxwqmgrqyhynfjcxllppjbpgagejxp2wcp2riej2uq4yu3ncg1vqd0c8baifw1vpkoar75okc1g90fsrlv10qt0z',
                retries: 2238741645,
                size: 7707542413,
                timesFailed: 9381720193,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverInterface is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailReceiverInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: 'wnntcjwxkrovez4oluyj',
                scenario: 'suwefr9buigr3vwx7766a0588wo1londw0av3z0prlkth6ivxqwlhklwv8a6',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 05:04:04',
                executionMonitoringStartAt: '2020-07-16 07:37:22',
                executionMonitoringEndAt: '2020-07-16 08:20:56',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: 'g4gxirxxqsfeweemo2t8eu2n2uacu8m0wnidu3ufzrrxszq1wo8sqs27meu6oye5cbcu9pp2evtwg0ecllvoi2xl9q2xc2aggvxw7wofsfm82ffz48rl1c0t39xagova8gi5qkcgyo8jmvvm4csmos5va99ifl3l',
                flowComponent: '1ztdyqrfotwz5wd9hczlfxf2zku9owracjbwd3qmxuv241qlen1s6sc18drzi6mrol1b0x2xd35hvdljp6hk5nrw16dwgw5wvcipy2p0g763o52yjanqiu4t52so3t0a3xykpbobgouwucpzu4l0c1b3mdfml830',
                flowInterfaceName: 'yzdnut3zw2yctehfrhhck8e4o7j2y4fd5eovr03mu4n6ug5c1kyh4fzey7wvib248zxt2ajtts68b8trkc8vf2fb0oaqyk2i165e5uchadeqzpqh8ox9zyd0bkoa1vo98pi6qohvig5fxwp2yy2cvzvldjj4m5sp',
                flowInterfaceNamespace: 'cwtlsr6tzev8x5iqgqn3xldf8tprltfkaw1epb34pzpch5sb5grlws7nnz7bfuz3ph0lrfo8e3sbg5r6huzpgw9xdw0axefc0dh1btrwkqijrk8gibw6po8isvgy8rux24dwmguj2hoiiqma8kw6n4cjpg54e2bc',
                status: 'HOLDING',
                detail: 'Animi tempore ut fuga. Quod dolorem placeat deleniti. Ut asperiores rerum.',
                example: 'fbpmd175z6eylbz8worxon4ut71k1f7bi3t74d9flyw3c0y3xsliete65f8dvwkdh7xu7x652jlfhykbgu4nojoiixphcl441kd8avhsq3qrpg0o0r0upfzrci2y296q4lm9t2c1v6snhlo9fn97gh2jupi3ragm',
                startTimeAt: '2020-07-16 12:13:21',
                direction: '1h75qia5bc6kajxrmree',
                errorCategory: 'pinqrw5aieok2c0b8x7apqjejq72gp6evbhe655npbnkez688cd1t0dcwry85hwk3kirjflb4w9q8ft393h2tzb7unsxrlk3e60blsmij9twri8e4x3b2rmk9y6awwwgho12jp36dhezfowuuz9dln97dvv8kboo',
                errorCode: 'rl28sfmzfv8h6dm83769',
                errorLabel: 'jtx6zmku1851t9t0yypvkimw8hdsfovqtna3w1086idwcdkvgz2te9mbwxq8os5pk4jn1r5n6nuba9yocgf2qzkcpz70aps2qg9dksunkxcc4ga7r9em7audnqqdlyxfmnkxv6gnjx61gd3geoxdd539jds0r8hi',
                node: 7835337512,
                protocol: 'et96o15yee8m4e0igfk5',
                qualityOfService: '0rv3kqofkxle96b8swc6',
                receiverParty: 'yk2es338noxnja08o0zgj1t2lpupcjembly846o0cs9jvhtu6ejufex866shc1drloe3f6t3sbmve1r6uz6ld2piglwhbr9b52e3z97dakhohuypnhrt4ewe0w73r1zw9norzmab9dpslrk082mtr6srw09jzhyi',
                receiverComponent: '9s7sswfwarmjpfwjvj9g7c13ssfj1nqng3wgzdj2ep1fneatlnzgc28ga5gvqoogcbpzh6qe45d3l6vxsh8qe9i7fmcl92351mr4yjc4le0b2ftqmz3qxnfrhv1gd3m0vo8j1rksqh0gbq0lhgos2r3ey8nzku7f',
                receiverInterface: 'b308ged7agbkt5xiaiq0gar5bje4hqsahb65tkfo51l84sf789th4ua7yx0j3dj42p17crz4mqwam1w4xfd0657ykgsoa1x5692hrj8gfznliup0vfz9h65os9w4xd649s8v39ehloagicl2k20sm5r0o8fo4kyb',
                receiverInterfaceNamespace: '5jb0ixo7pzp9oiw61nnoo4tujzfgc2a5e95i4d75x0xey0acgchq61ofbv6cuea73bv6am5yhbdlav54gftzkdp8dg7i7pc55w1lhsen04ldi1jum97mhqgmm044y710aludob72rsb5hkm0v10e4vtgewj3wg2rc',
                retries: 1857265958,
                size: 3419875691,
                timesFailed: 1615968550,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailReceiverInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailRetries is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: 'qwe5js8vxsqeilhg6hc4',
                scenario: '60igwy03j3b31vsduahzi7l33qxj2w90pyvlgo20lojdon32ldxx5tt0o951',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 21:26:57',
                executionMonitoringStartAt: '2020-07-15 22:25:33',
                executionMonitoringEndAt: '2020-07-16 07:12:42',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: 'ubyumzf6279b6zvktywmcx9os9lpcepzncpie52y2dalccm9eyp8u43bcevmjlopkc8exoc6m4rbmkvzq0iwg6jv0durhwpzmrl4k5872qxxo4sdarbvvca65vfnsxronyx02fjdowbo4is3dk0hainvomy8yujn',
                flowComponent: 'aw58do28an57if7l807nt111apoyah7tqhu89s6xsw0r43zumgb8w8r54nfdh0xy8nk6aoet2derospyl4cl3jlgmuyeo0hqkrrlutkiz4quahe2g5yj55qamv30bwzwlx35f6pgvgdg8d9pupd3mb9jr801dvm2',
                flowInterfaceName: 'eat6dnt4i3jfqj59ry9wlwmaman2v4qctltdlnpbpxtas4rj1yrfu159vegy9cwjgtjirt9lbm23bd3ctp2eg66oyy8zp249gb45gcoium0w0j0eswmme8plvr7iuxdkzgoe08n9k1to0tte4l5etyeuqgbjj0zb',
                flowInterfaceNamespace: 'qm9ujsxqvhpvjkkjc5wuaaff645jce5eb3wasw67r9lz2v9kbx65alfyymixh4ykrv1noi96u6s5a343f9ulkl9bia1tjirk3p39fsu72j9avx97uw9vwle9iaial53f7zb9l65z3c4u3bz9brc2kviujwpno6rp',
                status: 'HOLDING',
                detail: 'Ut dolorem magnam iure voluptate et neque dolores. Sed consequatur praesentium repudiandae. Molestias non pariatur rerum recusandae quod. Officiis eaque et quia sapiente odio libero. Qui excepturi dolore dolores totam consequatur et aliquam.',
                example: '79fdnwjazghzs9cwdgx10cclyimaxcyme5b378wsptx9lsuy4p2s9n3enlyka45jfj4lhkzy8k3cdkuliz4m3614yieqnmwlfywh0cl6djzc5zxsrzvbfmwla66mg0a1qjfqd42j0qoxfo212j4fxkq3ramd31q1',
                startTimeAt: '2020-07-16 04:39:13',
                direction: 'r1n3jri28g7tju01fevj',
                errorCategory: '3baw7abegg8koipi72n563ryappy1yfupvah48hc7uqlvc7b1a6oww6k3joqb0m0ur07049h05swcj1vf7yduyz9hav5b46bhj0emx40uzsu7rmvhpsea6rloya0dc64fms1xd8rgol5g6e9qi0b64ikhvb7fp9n',
                errorCode: 'jczuhsj6lxpf8i004dat',
                errorLabel: 'hdjpwky4nlk77tmwejkonvwsjf9e2wetk63b5wh7zw3f0nx68ih12ydjslallqjt9q0yjk8rt9wkc05rav4px82lbkk15fv1pvy57dddh3vxvjlmzy4wmox7gz9oyacy4039mfgdnpdkjc890qxqmocvegu7r6ua',
                node: 5503329307,
                protocol: 's4yh8cz76dluseqixryv',
                qualityOfService: '7r2z2g0gbbs5x4yyj4mh',
                receiverParty: '9hmykdtolxs07kbo2xzjl36rzijw8h9qdb81aocqr48vxyq45xpwy36jybsdq3q43tbyf3mvkkzd7lm2n322ldu42196n7okfx2sistem5vdv9v719xpdg8ueh770r852hwvl94zekop9lxi77p2or0ro0cb7y31',
                receiverComponent: '1we86w7wv9hwzeh87m49hhh9ckzalc4kgdyophl5sxetkn7e5r003acea2ie2eczmmu89bzg8logdbmhrbps55wisebxzc33aygkgmhspd93ck6y3o0j228luo7bpypifq6mrcmnjmtq4zpo4oxjzmjdcexmznse',
                receiverInterface: 'hz7d4uo5h5hct5prx42sngxlkeurw8gcfc0rgq64i4bgkf7o6litinxmbe623cuttkq7agbjsf4c57q23opx639hqy16oaktg473tkquuk9j4f7zm9wus4i5noieqkc0xesuskcg51g36cz621a8keonhe3x3rxw',
                receiverInterfaceNamespace: 'z1k3evsophuzdobbxi65qa7nq53z9fnfzilfvp3pr24zadoqvpx3dmcvyk92jby5imamskogkcopbcjm9bsh9wjod6ygg0cy983kqwu6zh5u2mu64l5ga6mzus54476ys4csi3orf3e2405nme2sav475tj7rbsi',
                retries: 55629471022,
                size: 7287587916,
                timesFailed: 3417119289,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailRetries is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSize is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: 'de4la6ew65jums2yz35u',
                scenario: 'pt9kfzhewd37gmxv9kvymkkt10a9nebelcweejb1vzhbij9rxb7q3i5a8l7x',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 11:39:28',
                executionMonitoringStartAt: '2020-07-16 19:10:02',
                executionMonitoringEndAt: '2020-07-15 23:42:53',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: 'zu3tam62iqazil7quqv5mnqqek6exheg1atd27h63gnre1cvwh7e15l4ncqpl47vr1ppxftoefx0b8eji2lw9nfytoo5jvpf0wfb50b558i81fssr0xu4xfllxv03rm0vdedj2gpx9fsdp3ppmfh7kw87lpcyxuo',
                flowComponent: '999jwxxsajds7kakqecn1gbaimep9xj8bd043289s8fn6gab7mrsq58ot6whq6fkhf29tul7k6tt45y8dsdvpgax7tq2j8r4pz5wcxvqikwibefgl4vl8c74cm0bs31fkxmuhlai6tccg1e02cmmtinta25d6ooo',
                flowInterfaceName: 'f1wzrtzblnjuidbl3zkr8wxhmja9zhxsoiuyv1pwhy5x952le5uv9dnxg07l0ijbofsiz6j6ckgiz5tx58aaj8rj34kuxvtugy46vofa4mjz0k8ucne5fbpqoci5runsdi9witfioe4t3cwyyfn2dk040jn705na',
                flowInterfaceNamespace: 'ccdnmk3w39y0fhhd3bzin327ajm75tevpkieob27l4ia9udoqzvnfhifn4bry6c9nuw1kaw4v7j8lyib2z84mjr3wyjbl0jhsc10tiuf96qslq7q9x4bf37nuscmsokdhspyrbkspha0dx3v1i4z8o3ix6xj3w1c',
                status: 'WAITING',
                detail: 'Voluptatum est est vel porro illum repellendus ea labore officia. Quo in nostrum esse. A aut repellendus quis sit tempore nihil veniam et. Unde mollitia dolorum soluta voluptatibus. Vero voluptate adipisci ut excepturi quasi vel est repellat explicabo. Quis debitis quidem rerum aut pariatur.',
                example: '1jgp7s9didlypiuz5leiveb9sd0e4njj5m4fevbx99fs2duffmnkzp0r7t8gqml0laek8t4mbhx7q8yaeexmmxvse3emknk8ia3hjslqxdf2ot06390jspqtlkjao5pf8x7p8bt4d47frkrmb1bxlot28hwq7h56',
                startTimeAt: '2020-07-16 17:56:37',
                direction: 'pc0xy0kk1b8yptyqoj08',
                errorCategory: 'csrerl1b3t0wv1ympmvsattai9myjfr0ydfv4gxxn8aui6yasghzg9huvxiz2kzysa2nwbf97eie94xao3ej93ybeb986e47zwc8jk774cz1x16qg05z5j4wh9nehm2hwgxfhm34av50iwpgoquz28o16jzjwcld',
                errorCode: 'c8p2fm6dwy3pok5jphij',
                errorLabel: '5mnjr0wtayr69hcsgr428ad1ikfcas6c5xgfbidjxy21ub8e15vz2ywkqpj01dohc43qktu6o1awi4w0caopkh58rrutpeauxxwogoqbafd7t9y51rx5dq77qmlb8hm1rjmngvzuk1dkiu936415y9wk2l47etry',
                node: 8430831758,
                protocol: '822egnaedl5unshysrt0',
                qualityOfService: 'ya5fzsxob54du8r4d4xz',
                receiverParty: '2qaxjsw5aweuotkjqhwead1o4zgsg7393e7uun1ue6l19zsmtp04tidu3act3wf9pcazhqu2bhl4rgav3hjkrroz1dky7ajwci2vpsx2buyu1i5nnkos1qydqo29ffpy45cfaiqgf6zf0clymgkq604zh11cc859',
                receiverComponent: 'w8l3xd94dnlb6q8qwb2qb7nc71z833u9q1en3lvg7jj4a3yy7x9dise6v05i8ukavognbeycxoy09al16rfvshteuqy74csqfeobq1ftzid932oovcaeewk0gj8n6ryka0wkcb8xxifau9agvpqaovfku7talnsd',
                receiverInterface: '4xrzv3g10jtiu6z21ky1ew1vpyvx8rqzae5ur9ejohh7oag2wos5zjjd3ezndchlzphhrhrdyqtyogj0m5vqjlbih7p8vhnbdjhqujgf2weyuixyu88s6363wj3wr6h67y1tai74np7umk1w3r72e3lmfn2joilb',
                receiverInterfaceNamespace: 'l8aa6pcjcdsfzqdm80orofujdlvgeo7pt17qdx8v9z99owlltpgj3b4zpph8uvypm6bnqnldggv80480m4xsfyle09pzqsks78i7fmdtwedeoedyhjcnc9i44nhyf7oqyuplazf5ub9a7963bnagktwu9nby15he',
                retries: 5699703868,
                size: 69641509199,
                timesFailed: 3640067085,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailSize is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTimesFailed is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: 'p0vywdpwmb7wsamqpq35',
                scenario: 'ni64mepk9958jo2nghm755vws2xmm6vgm6eo06q51rwdkssqaor6ayrx5cvy',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 02:02:59',
                executionMonitoringStartAt: '2020-07-16 11:09:57',
                executionMonitoringEndAt: '2020-07-16 08:35:44',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: 'u9ha7mut2rcfo01wd2sawx2siny6edjp1626iz3959kszn8lld1te6awejcp8ewp008rmfj19o8ru47ar2hggs8y8rgxuwr6ez01gstyaze8ewe25xypbcfwpp74qpq1mfpkuip49n21zjae4y2dcmzheqrruhj1',
                flowComponent: 'cf6o9seylfuw2stxw6c3cpigdx7vttocokddnbvknd14w8i8m3u6ud3ftl7nq4j5hu6ryvzpuh16ttl1lrgkgev61m6f8al84ehcwq8nprw3rpexkywij4ezp614lfg0r128q7hxp68uigd7caly0q9y4rjzc3u1',
                flowInterfaceName: '5ql7pvn49014vpjhhj53f04ab8zqbo4b5xl6rp9yurm72l0hg5z7z4kji19ho0sr7pw3ikj3m945u1yonpoqbn3sog96pax53ot3ft2oisthyv22pa9yykv9p7bo86o1lh1mekghw92yuuktw7l7vnubslqe8z1f',
                flowInterfaceNamespace: 'bv5sqi4nhvpbm2zuddi6l0l6gzrwtczvpfo8m8ugu42d6iuvedtouwbszhfmp2oj6y58p6y60haqkjdrvlzcldfu62hufnf1a471fufs18u9ie8fc7o6zwittph4a74m8kkac1ptpwzoef1d1luwg68nqic3guxw',
                status: 'HOLDING',
                detail: 'Quo id dolor omnis nobis saepe iure. Ea possimus reiciendis nobis provident minus iste nemo officiis quo. Provident quidem culpa tempora rerum ullam aut quod voluptas quo. Cupiditate aut aut cumque provident nam. Repudiandae optio harum eius illo aut similique aspernatur consequatur. Praesentium at qui tempora velit dolorem consequuntur perferendis consequatur incidunt.',
                example: '42sgezdz00xdb33fkm2hd2ua88j7im0um3nuozaw3x1b3fevdgwykvg4i5nzpgvx2dhl6igbc9kuam3rfnorxivlf41z7a9a02x39tuznn3vg9qm1k5pkb0ct9x8kz5li21k3thpgetecpx89n57x5z2ykh7c9v9',
                startTimeAt: '2020-07-16 15:08:03',
                direction: 'zrw9kz342e7itspngk9g',
                errorCategory: 'k7yp2rlm72d5bhg3oc1ql38d380f2e9ldyey3asz3notttse7ouikdbxavfm2vpjmuvk4wfjmqh8lis9j4anhk5plbniv31qqfvmciwbfi8gio1hs161q4sdnyvftq30nn5sjnszbocm5dsdgxlromgswy7yrfql',
                errorCode: 'uos15oub1itjs7yod6ra',
                errorLabel: '3ely0d8eg232qmprgex6kd38nvbg11otwuyqz630gv4o5df1z4jn75416qqoyf1wnpwp0uzafb8uiu6bkvlndcr31y2cdc44hua88j7dspcuz9jqqlyd4q3buf8jtsjryb0j26l9pk9k74ibew8f2i0gpanwxusq',
                node: 1666960919,
                protocol: '3022hzaz99dkq2xaceix',
                qualityOfService: 'rtlrkmkeq1a14a25x8pq',
                receiverParty: 'l8dsyui0dedl4wvn466ibqxncluf1cbvfa7tovbpd1tnvnetcls02tx39u7sv0tbdylhns6fihmxabpi24rn9vu1096rb54r00ue61wcr4wul22b32890dnhp20snmaqh62brsancefs8v6nzs75unqecije08ue',
                receiverComponent: 'qmmpv7vwrjp3j1cccc9mwbth4ndy8whulm6jitjhhwvtnzm36crgivxqchifpc822h4lyn74wymsi5uz6d1rk36iukxn95ganolsew9ka9aq3yhxhxj09rnpkcqzec37ipqcilo0wtn3kdf1slsdhz9b9bu04z92',
                receiverInterface: 's63kaosztsqdpdstvq0juhbjnurub4k4z2gxxlphkqrqf2xtpkvx500kw5129j4ok3yl8ys4rhjyx25bodflpyybop2y69c40mkxxrxdspkwytszjvwo7x1t2y0p0vhfo0nga8u5b2gwqito40ijso8rkk4gq0h2',
                receiverInterfaceNamespace: 'dhuixjzl515qbaht6po420exr7sfrdeze1fyhueoozrgjoo4dp5u0nk94b8ge5svpvow7b32h7pzia41ejfu9b4b4l2xlmq6kmworvvp1tjqh4xib202nqyzfrztfrv8j7o53bu9nuft4q5pn2ht73060pnsnsh3',
                retries: 6645368034,
                size: 9309551514,
                timesFailed: 94136386813,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailTimesFailed is too large, has a maximum length of 10');
            });
    });
    

    

    

    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailNode must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: 'mipt3o60g2iohnwpscqx',
                scenario: 'ptwpeu25x4wcbu4i4qkiil50izxlbedcu9wos5v8frvpqy0btrvllsb3cvv5',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 13:27:52',
                executionMonitoringStartAt: '2020-07-16 10:12:13',
                executionMonitoringEndAt: '2020-07-16 18:18:12',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: 's4tyw0yjscguxyswwqtt8lv3ujqjqd8ogwh6ja2mk47oy5zvtdh3tj30co2z7amrkzai511jgtmfgsh42pxc5lhk2qqqewrjx39dkphmjpjk1er37it0knry3kywccvr8p1bk4bq0ps81o9wj45y361t9bwjyl5n',
                flowComponent: 'zapibqp036f1mbe5585z8ia3st48cjvqxpxfbf6idyskoo6twjpmssdiqco19fzrijt8tpw9086ohviuth7m26lejw6auvtdv68ij3ru3amidb2pbgjnc41locaseinq2qw6c520c3buwnaxz906wbppb38hrywe',
                flowInterfaceName: '3978j7uf0ul0sw80oestlon0113iae8xxri8sa6xjow4nipfmc3x6un2g51o0opx4njkm8eb6gciic1thl4bn9otctx3qt4nqnm4s5hwrk4jf8cs6jkvy6b9j3z5svo9kml9dx2k10if80pvu0iwmjosc79gj26b',
                flowInterfaceNamespace: 'aukuo6uqzcpb4kjhs3byahep813vg8cfmv7ffxy0cdaq0gjheb6yeg3c1odcu70wcwe8sunedn2x2mm7nv0dsnp3o62nrv4az2mjiqivsm8on6qg8jcl6dvv6bmp6o6rpueea8jpidf0ds1pyb90cngwj4xifykl',
                status: 'TO_BE_DELIVERED',
                detail: 'Pariatur voluptatem dolorum pariatur tempore porro dolores architecto ducimus modi. Dolorum et vitae. Labore dolorem dolor aut ratione exercitationem.',
                example: 'voq84jdtqrnjuvft54hu6ma8pmwm8kj1betabi7lwd9zpwg1k6w26y49lmeopnjjzupx2ct90kyi0pxh7qz0rad8qb2noqeysohg75pxvbve93tytfpoz60qrmvrnkgcxhhrxhi6dxbvqf6hx2ls9vwuu09csq78',
                startTimeAt: '2020-07-16 12:01:30',
                direction: '8nkw1kwt5a8ra55kufsj',
                errorCategory: 'v1o9zzj3mb11vwvcnpc3jqr8hbb02tl2o1kfyfjffc0zasi8do12ckq5h6060rd8sljm2t24lwcs6rrlo320v52n26dig3rv1awlu1kkbqcctg2paz6hk14blbxpz2xqon49efj9qfx7bmmo8adlx57klgg7qxlh',
                errorCode: 'gsk4j57k2hhrny73xtrj',
                errorLabel: '3cqm52qxe1w76q6tmpvrseyn6z9oov11kyldbplocrfjdmqhzbgqp1jbpa3nask3fenuji8spiug9livvhgeydhjxzd7k064em8d6c7j4ih6iaxjek77we8nfhm8u40z00vfv06bprxscg6rls2acydcifjhnhiw',
                node: -9,
                protocol: 'dfc3z4qt5ekyj6fkcuxd',
                qualityOfService: 'ayvzpbtip2cvg1xm2iq3',
                receiverParty: 'usdcbq85v86gb94jcybaek1404uke1kreankxfysndkrd4t4dsbq6uoebfxhlm9xnfftimc2zudcw1fi5740kau5b9066cfra6jy19t2eeaua7596o29tzqer8n4y62hl82eeb0oogg9ry3k8d9f51ar5tykupsr',
                receiverComponent: '6cck5hlb34onm2jy7x3ge3b1psgoikygkf53m3z5z771s5528p1m9rxy4xrfj8gvkkrq6hbmrbvx125z2y7ywx5queirv4jokywuzodn1fxcaqfacgz1krkmnacbncet482da7hz88ez4gwx4z16quuo995z76mv',
                receiverInterface: 'nb9a9fxg8nwkfzkoj9eldrtfsqqtsq804dfepp4xh96tzbzonw3d5npsv74gijzomxn9zmire1s66xa5aarspotk91r03ngjzt8jyostl8ulqy6kd9gr5ja8xm5elrd8mjlo4iqzs2787ij28qdbnyflcvyouk8b',
                receiverInterfaceNamespace: 'jiib0e2z7k642b35766xfuv6dgtjvb59mrhlt7159c8iv97jm6403zlgslxdyix21o2jzsqkpsudkdnw0lj6kanp92h4yqv61w7nh6i7tdgjxumxqdporzp5o4k0e948o62hijakxf3s4y56wrtptd791cdnb49n',
                retries: 4146774060,
                size: 7890250439,
                timesFailed: 3641865177,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailNode must have a positive sign, this field does not accept negative values');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailRetries must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: 'qnp753cft1s9pdiolb7m',
                scenario: '3pvz7wvu6rzlk8mqe60uuc9tiwmwm5hq73qcstyanvfwp127yyn4g3cbbo9d',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 02:30:32',
                executionMonitoringStartAt: '2020-07-16 17:46:28',
                executionMonitoringEndAt: '2020-07-16 15:16:09',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: 'as8ymye6d74c7w818q05nd4pap01rs3brq56thps2naqrw15dz9k42ra45dnuicpd5nfry2n0mzl5fjpwsy1gvwvqzym45w1yp5607jtw2ajty3l39xthchueg8twd34f72wb3o8lniwsetgkicjep7hrqod8xe2',
                flowComponent: 'j6xd2q5j747t7387el8mokzea75dnx0f2enkcz5u1rkcmzswqkqp4ktld753naeimxuvn3izj399dr6wf8n9omswugkaap1vyjfnsenj5mbvup1r12o54yseumq0un833e3fas4fiwcvc3ygpb1eeawfgke5d3yz',
                flowInterfaceName: '47v6kq36uh306xmleoyri6l1ji9ysvj9od9pu48nk9l1rs525p2n46tp104ncrbh98mzn86k7wkx7ob0a3jfr75e50pywud3ee3pd4nc3y9n4za7glkjzksn76wr7nyv17b459r1sy1fu44qwc72u8uv4hua1efn',
                flowInterfaceNamespace: 'hc12w5qjvoklgpgaqfwp4kf2krnqfogm25rsrbqff9obiff4ld68i4rblcbf2bmlu6q8aqzhfx006zim0syt4aec7jy481fh16iv6qznsr5ebhfs5422umb9jn4k5n050r4lo8q8b2cgdv8mol55pm6dt4x51ugu',
                status: 'HOLDING',
                detail: 'Cum est repudiandae sapiente dolore nesciunt a. Et mollitia iusto quae nostrum maxime iusto doloribus nam. Atque consequatur culpa nulla et eaque laboriosam. Exercitationem officiis dolor suscipit magnam ipsum dolores. Porro incidunt est ipsa eveniet.',
                example: 'd7cqs0abxbdek2xtj3vlukmz52vc7kadlthbvdpb9fpmygme9la8bzpzhg520djcwu1l33gtg5oqqc0wzt8kesu74ybzt4ifapyu6tb91js0etugxznecdhxztrd98mb7zl4kztif18d7c8ly98v9yuvjcsb2ar6',
                startTimeAt: '2020-07-16 18:45:11',
                direction: 'ndt04o3r78r1dve17cfd',
                errorCategory: 'uw88rinbt53if8amrl5z8c131w9j64t0wa6u6bmabnfofx67po3qd4z12pe07hs2l1qz5wi4gbl9iy5hixfwb1x06hocg9m15eoo1kdqsba9avu35jfraadlbj4fzyyd03d7aonwrtm78a3yenlyzc5r5n3nc7y1',
                errorCode: 'ywc7km343ppqhs0iqj1s',
                errorLabel: 'qtdssu2dtw1i0ux49opn6sxwend5v7my7yhgc1g8qr6tthaedbwetl9jqiuyl1fnpmalzuyt6waz3j89sjmvbk8y3kal8kb88qkh071mxk5mne4q2amki7hspeiyq9wotb7njplh1et9nimjjkm1vefn70wgu68j',
                node: 8974790194,
                protocol: '2npo7lw8mvptz0d0nd52',
                qualityOfService: '6i8vhj5xqduvy2kfgwcy',
                receiverParty: 'dzj77o33wqqq26h8wzoufii1pa5qfp389ueiea2j6l1a6efc8lwvnrqc7pvuo53chpe8y7b20bjxfi8zn1kddb9vkogt3p9jjssuh9uk6r6v3gzfp7emwwl3y6qj5b5k89h2fiyh83yhqb1auk4x69305r3f97q0',
                receiverComponent: 'xxwnikt411kw6ghbjed6xdvdgf1st5cmgv8jhcno4dy17gaun0i0y9l9a56at9ds6sk085zdikcg59ylcesvvf0xtnxlpa2121gml07eku0z0nxwgzw4arlzxqsiywboavw5rw5ipdq8uypkeh8f2dpp5wix1wy1',
                receiverInterface: '5d9xnf23pzmx0e9uqjljqu3za8ovfjncwdr8k5jt7781gs1o8e6w4c6je44tgsot1rajbou7x0xt3oovk16esrmpte6t9bow2f4trzn49gebvvwbadsrmhycitxfydeeqk1ya98ej7xn9pop0cgo8vuo135fh1ir',
                receiverInterfaceNamespace: 'wi8eutviwdz79c6fi8yhfwry66ax2lp32a48c8abmdy2wvy4z04j1g75hi9i0hkzuslzf2uy80jyqup38cwxrxuhpcfgexc55a9qsiham6k9croy7eut1prvz3sbhed9emsm08nl2jtlnpewxb151yrj3lo00lqb',
                retries: -9,
                size: 5336588662,
                timesFailed: 3991091989,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailRetries must have a positive sign, this field does not accept negative values');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailSize must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: '2hlriud7kfjcdft2087w',
                scenario: 'qajfkejtkmco9cw1nki2zuvut06bsciyn56lqvjxxakqry0fytevphnq4zyl',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 18:11:59',
                executionMonitoringStartAt: '2020-07-16 16:48:54',
                executionMonitoringEndAt: '2020-07-16 16:49:20',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: 'san8ad0sm07s78an23e40ry7tckg07ssaxouxml7sazvn6lkgw9wptvt1dk9dpsh32b6ym1fm2qi45ci7qgdna37cfrw01gt0z3xu3197j0gq3m0nxesv65y7dhwoqix2emisczcefhz6jyjsly4t0ekl8mhasxa',
                flowComponent: 'nw8i93n875v7apkp4xksdbpp7pghg3lbbwmejlur2bj712jrhs3spou0we2l8t2wzhbqj6f013ee36gi0braucwrmdv1yt9glf1ocu1s1yhe8tthpm9xj6bafs5xchn42t1jqn855lhx04b95n1us5dk31ox37rg',
                flowInterfaceName: 'czamd13fzso1rksh0smqad03tw0u5z979x2g67wfbiimveaoog1c1kd10b7wzur9zlt0378ddm4egwytkweok3siwcx2zcye4bou9m3sifwkd9hovgwn7ex8pnbd39t48swaa3255g15cjfhagfarxxdo8x3a4u7',
                flowInterfaceNamespace: 'us6uf4kr4r7bsri9tg2njs9vwzu9yp6hch63p03e1gvflhgwj4etca72a5z1h7kdulk281m1v10pig8dy8t8ou9uk6yg5anzd7f5mt3pvg5wbzct4qqobdg1mj0jv828rj42ro502zo9nxq33qud8uieufs3ci1s',
                status: 'SUCCESS',
                detail: 'Qui nihil iusto. Quos amet maiores reiciendis qui omnis dolorem sint. Incidunt libero officiis qui.',
                example: 'xw7hcbd68cil0cnipbkbnhgbplk6um5anntfvxf887r4zv9ujlvs3qyed5d4mfh79s5cpm721dcrvqtl8gyblvprqnlnxzr8fupja1n5jfz89l9wd1904p87v6jm0w9n5mdtjv5hvpqi4fc3oxzrw5o5tuoequ96',
                startTimeAt: '2020-07-16 00:52:38',
                direction: 'dsdg1e0lvzwifltnvxkh',
                errorCategory: 'om3ocoj06jejz5h7eg484wgkm3j7bvm0jzw2jnbbjvsd1yt57vruno2imqjgou0rpebqgbitsc7rf82jtquzkk2i5bmptfveadnu7d7zes4mf3e6kv4bus1a2mwdfd9wkas1qcdo09xan0sq30mahgqh6ovjtogu',
                errorCode: 'd9jv18zyqtabj8yqzagn',
                errorLabel: 'hup5y9e8vqhy9ylcyy80tgnt2ndef7bqnq3hda70wk3pnp8siewm1j3qnk3rxrtydwy01na7bt9wm5htxb2jmmms78fxtfcu55gm4nr7xffwsdcxavzk5dkgi133vnajmxf6tmxservoh5ti1uh3nfejxftalsed',
                node: 1838258581,
                protocol: 'hkpnqt0ixeahsrz46w6v',
                qualityOfService: '4eym0szcjhj9te9boauk',
                receiverParty: 'tjubluq5od6l4r915xqix4zii5w8xmalbjn65zll4easa5eudihkglp7skj8wrchxzbksjkg65az12jmj5weh3vkgw54iiwm3n0ljx0358fm0kv3hlq4oachjczktt3wdnnnyzuxh3r5fdhrynk3ldku5y3gynsw',
                receiverComponent: 'ilyus7mlhco8640esfle70myj5h7jlrzywpoii174r1brm03rdv6r5l5keifo9m1gygsku4nruntwiu8lnxau96mt4ylveuunsvuhdahzfb866evhz725kdsdiske4vko78o30jmn6u9b2rd6susdkswoebnqumw',
                receiverInterface: 'lse1pnbtjudik3d424rskxz9o8bhh9vmg5rqk6xwwdyzl51d4v2sgibay6iwy7vxjr4b52vg5fibi0pf71l23xma1vof9syrt4iqqgcqt8brxualugr4h61cr5jwhj3gj64m1adoo7swz3hq0un6nhw1y6fid2lo',
                receiverInterfaceNamespace: '169damxgb3dcgzlyxb26uv5nifaoivdcg3icwjn27hxxmphyl9j0dhsomr32pd3kgwhug9zzv31rxjz26pg9enigqsfwr2fplw27d4pn0nmhacproe4bhz5d1uawh9bpn4984zmqmtgw8j6fozahb51z15nbq09w',
                retries: 5150445555,
                size: -9,
                timesFailed: 4006052713,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailSize must have a positive sign, this field does not accept negative values');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTimesFailed must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: 'gdzchjad0rz9klj4yywb',
                scenario: 'by7tvyp1ghcanh3pwm51r5olk3qb61mgi43qvwmf6rx60pre18nkksscxt0x',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 19:27:00',
                executionMonitoringStartAt: '2020-07-16 07:14:46',
                executionMonitoringEndAt: '2020-07-16 16:27:38',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: 'tbfko1lc04ovhddcn42ouluvce683luwm7peek3imtunwkitdg6wgcjsxb1m8xucd1zd3zn9mkbpvdoxvtjc5owhr7lt7aqamg7t4z5up0qpn40it0plt1kzev6vv6jt22r5eolbqbykxen1gwdsvtvqmwgza7xn',
                flowComponent: 'gadyx6a050u9fi5rcdxgd7p91z1gs36j41on99smdastjlwvs0ndds2dt0ylee8eqfkn4255ufhk1tv2vp0xs89gcbpxkhz55w8h9g2395fz042xrinj28j6wne1ggl23g1pxac4n0r2szossudwwp9tlkrosh24',
                flowInterfaceName: '7ulg7nufhz5lrrij5hs3bio2hs5htlkt6eiknuu94betj70gk08r3xpq76nt61jn8kjhp8c53ntogcbqkuprehzdb581yflk4svxi73al66kqka0lhamv3swk67up0bxg3yz6vmxkybrd6t2vsfi0lmpvwa5ygbk',
                flowInterfaceNamespace: '6nwp5pfhkyjl82z542hauc6jvpewwudwv8k75wkdd9qvdbyzbb4116kmer6cjmhn7s4ddm9c622sn7bl2ltm2bcyvxb1sxq01j0y8cydg34n8lao3mdrl7gfnccry2sy7zals8lreidnsqdcim481bfiz1hflsuq',
                status: 'SUCCESS',
                detail: 'Inventore repellendus placeat sunt itaque iste quod. Voluptatibus itaque ut cupiditate nihil voluptatem ratione. Consectetur id dolor soluta minus qui soluta tempora dolor repellendus. Ipsa qui consequuntur alias quos similique natus. Quasi ullam iste velit doloremque.',
                example: '6u0add3jm0uw9ozrc3xevuy7cpj4hwqbgh3cojwua4nbcjhl3xffcblyas1hfihmjhdyu4e00ypyvcyvz4ctabk7gbajfma8e68m3yw7uyrgmvm0b7zy8vca9mzv6xu4k2rchvmk8irefjtjdslwwun0yi9y1mcl',
                startTimeAt: '2020-07-16 16:13:37',
                direction: 'ux6krthhroceg5ba88wc',
                errorCategory: 'jm9s2yoet5wv25pkbjaud0ic7lg0kwcb7m40lgc7cd5lsac6oeyu8itpxrs95d8l44ayq25qdwt11bev2qvx1ez6xprtrk9utm7rirhoch91lc9lnblpg4d879jgneo7rxkuzrdtimr75p07k02molv7nbwg8bv5',
                errorCode: 'a2b4ehym2zt145tq72nr',
                errorLabel: 'rdncwjtn3ukz53dq07oewn23pgjhgkz8tej0eizxz7xdez8uvqa8cdckt5nox7mxgl8z01u3pkh8ct8o92i76nzp1re2sm2loudlp36w9vick2fjslxfnhwxl0b1z665lksz8fre5qpb65klagwbwsz3spitdvfx',
                node: 6668431861,
                protocol: 'ga9jvki21fib1husc1n7',
                qualityOfService: 'owns6i7pxvm5rctiiejf',
                receiverParty: '5ra4rt8pk0exix6430zc9z8es0ecpkkezrieqkqtozo1jyujkq14p9avagwf7fmcjg85bmvl60cs58i989p7zulcq638x3y45m5wvk6rsgdq472728t1l2n6paye2hm0grilmbhqxtj2ow8aaf78pmr6zqlt8scp',
                receiverComponent: 'ifbxmzxvhu9cg94iwh80eb2ah0mdzzsfmoal5ydvj1mbjrb1o62hkdna7qdq1o4oknh0bgmhscsqk6j3axsau7ihic1am2dpynme9u6y8ma3xtgddmcqodn44q62t0l759uhm9pmpxlvxqymeapm3wq8dfbcno2u',
                receiverInterface: 'as2z2oysccl3h8y33rgar7l8dokrg1g34db1503bwalmbgl488cagx5hy6qyoks50m1ravogoipgu3t7nxh8az2kle9spwrych2ferrndb7sdgr6zqu6uevrzsm0jf9m24rybi37q4tskqsgaudwzlftv8ti9mit',
                receiverInterfaceNamespace: 't1vjwhlbio1rjirtxczkw29xchsicc22so8v2e0rgq3h9fceclm6vgv9zcdi5ahnc6572j4ucaa77755bxjorw0a3v3dc8acmqjaspj8ttofplhxz8cn3gq35ybvs63qbxucg1vqprcrvou4oqncd2y7zujos016',
                retries: 6788279912,
                size: 3668780059,
                timesFailed: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageDetailTimesFailed must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: 'oy4ipflnxhcfld0vvjrl',
                scenario: 'dij3pxuyxnn0gtcos8a9usy05gc1uym6mamkpi95g8g7wy4uotubpit5h6h0',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-16 08:37:47',
                executionMonitoringStartAt: '2020-07-16 00:54:21',
                executionMonitoringEndAt: '2020-07-16 18:48:08',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: '5cxwkyxjiw5cz0oy1fxzadc3q4tazrud31ij0u1zw7iw0l970nmqbn7ym0h95ihz5i2dq9yhpve4xxau742hszwq5kf889vxgk1djccs3yaiok8emckxoow95kw9eij7nkftmfvgk4tce388woyqw4t9b6x8fldx',
                flowComponent: 'gxz2k6hgya3wr1yatpt84ngb7vr6q36f3jz410scn2kyogbmbk64k6rf5kwzbnya2ok881eswa31fselk9ofi0y9jjpj4243m6jhcx7g0nzo4prl98cipctbdmcwy4qiyjtcf4k1kbludfveob6o7toijhqrg0kr',
                flowInterfaceName: 'wvwevbr5627hn72uo1jzfwb20twhvvmvyva1k9grlogsc1zpwwxrrltqi5i5qgie0gqewi25vwc1409sa22dipnfo0aqpxuxb1yytknwzqy8rlnzymswr0qzmz5kbwl0nhmfuz7ul0iytysmi7bfam2oovnou5ha',
                flowInterfaceNamespace: 'zc2vepand35bz0z1osz561k7k33f2iq4qep74z37kt7d9z7hqqsssrl7seerfzr1ygck3j1qgcvi913m5v5gs5a4xq8d3b42e803cx9ewnihljvepio6w6xql5ahxk3887dcm2hlhlzscv8bn3ay4nsijqddzkv4',
                status: 'WAITING',
                detail: 'Impedit numquam fuga sint beatae quis assumenda voluptas. Aut et reiciendis aut ut beatae amet qui eligendi totam. Impedit sit debitis labore quasi adipisci. Debitis sapiente officia magnam deleniti corrupti impedit modi. Aut cupiditate nesciunt commodi dolorum sunt ut tempora non. Sit omnis molestiae sit iste quidem officiis nihil.',
                example: 'o6pj5yiy81imr4qfvpiay3dw2ps1msje2z2zvpk31dk98o9z2m0j6q4ma6zgs2jw26e7jdg5xjt92tpgbczxo0jk5r3abzi21wvvzajevpf3xx2clewisy2txd515lvwxj2l4no4ctvpaz992il9hyd6035le0ef',
                startTimeAt: '2020-07-16 08:54:13',
                direction: 'x37zhcxu5gl8q93cxggx',
                errorCategory: 'tcky4gztt4p9kdbh7czhbge7na6nppifr6d61ms5by10fnudsu12bs1hhpovk6t9ibwr0v7usip8sf4qk9vjao74t9bfisaaf2icvrzc7e7c43zav6pfd1tvq2aca6cjhu91r4flno5ay15o9zz3qyy2ngobmvos',
                errorCode: '3z48z9o8s15v60z5fdgs',
                errorLabel: '62fy7jc1v9anuull52uli3mnxjxy5ncah8z3f6xnvagre8pdligvywi9aywpa39l72eng2c7ngx18yzpfljdagza9aggsdrh8kkhnn4e3mfwx6lio15fhba4net0w2u8kjd40fjjkbfj5gu8mptmhqw4hfb6u9fi',
                node: 1896661609,
                protocol: 'tehk7yt30hhjr1a3wv6c',
                qualityOfService: 'eqpcwgqolech7e5qjx6l',
                receiverParty: 'velcsojzpq8b7l1nof2b5gdq8266jeqr4h9m80zoz8yikpjvj85iw4dr1wigl1cnetj7ha0z3ouusgzirmfau86pg54g4wvld69f05ah7nhveyf34i38g7p7sy6ynt6t300vblvir1g46vgwwbvu5hairozt8m15',
                receiverComponent: 'lfpau9825j7pi6dl31ki5cf27aeetzh54oeez88i44llcmqjc470pr1wrg9nfz8etj3q5273mmiay6ep95dca92y6wpzxavl4x6p51wlmx44utc4petzho6p5jriso7xax5iprg1th979iistpgryun4htoh92vm',
                receiverInterface: '0uibg4e8gqa6igaga6elph96rmcg1snfj3t3wn4z38bbzx1xn0odrdbk5nemfvbqjic9aiqu096dm9krs041960fbhcrtxjoethnpznmw2g5bre0k2jp36mnb0g4pthayh5f4m90774on7wfn9lygyqkm38uwmoz',
                receiverInterfaceNamespace: 'glua0wggsws1s4nbf3objdmc5bv823xwxheixxu213kpyrbpz3moecak8469vtzaobcf7swqxwcz7t5ndv0a8976txcrwzx213mm1oltap1r2oxdolxmlnnszjl321t9o0h81nypi9kd62hn6rwlw4263887kmru',
                retries: 8623183873,
                size: 5171927984,
                timesFailed: 6632461965,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailStatus has to be a enum option of SUCCESS, CANCELLED, DELIVERING, ERROR, HOLDING, TO_BE_DELIVERED, WAITING`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: 'a1rf9xxygaf00sja06jz',
                scenario: 'hb7tlmnlg4e7jam4qv9hawshoz58cmm4g0pjkfhccq852zpj6r7fda7jj1rn',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 18:03:49',
                executionMonitoringStartAt: '2020-07-16 01:44:31',
                executionMonitoringEndAt: '2020-07-16 11:31:34',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: 'n17bigppx86r8ubx3bnq2accegglfxibauwxlh84i7lu9ly6e1zg3saw8gt78av8sssafztgngrerzfyo4zuz1g8649yx7kcjqqvzl26hkf1w78u2325n23tv80ios1tjjjj7hztg6m5ouud9omnn5qt61j31eqx',
                flowComponent: 'uoiw7y4c02om3gg3dmps54t59dofd2nsc4bv866da9wkxtkoq8r9b2qtlsoh6x54lwx2o2yqqxzfijbfa3egprhjpa3uwfdn3e1q9vfop1wibq5bc1kqistw0umzu8hhyj6ftrt6lnh93nzm6srwvo0ft4y22u9n',
                flowInterfaceName: 'g91cw9ki3c23rpwbik802vr3e8g4zhgat3solj06qrqehiuynxp8fpxgsx8id160dc16qv0df9mqzqt1pg56q1ivuqbcvyai7kjhp5ll79s8cpeeem9k2gvv1td3jgylc91ruqkf8r6or69ratxicqvq2y0i3lqs',
                flowInterfaceNamespace: '5w7rnxgddqzk5otujcialejzsvybso1bj7tz0s9uusbbrt5kyzyybwlmt6ex40iphpacx9xx9l0pwvixstzdpd3lyl443pnekkk0no23zlidl73symkl1cu5v1mjjy5k753qqdy00ymxxlm91mmc3k3fukr92mfs',
                status: 'XXXX',
                detail: 'Itaque quidem provident ab harum accusantium alias qui consequatur. Consequatur omnis voluptas. Quis et ut odit tempora aut molestiae nisi earum.',
                example: '7m1j7krtxed4aiww33uur4a4sdimzemobjss5b3suuc1ahu7ifclxj0yx84uju4kb74xci9bwrtee5m74v49oulb1pe8hrsimgebrg7emv9m7fs654kdm5be08rx4b1kz9gkgnlmuukse9cwbu4mxujpebz6rj1n',
                startTimeAt: '2020-07-16 12:45:14',
                direction: 'v2vbtgligiuy7r8ntqnt',
                errorCategory: 'brynq1bcgp8theafqdhz8smmndg8peuccmiyjo642ybhgydvbenizvknp0c81lv1h2u10ic1fjijwei11yqrm2oa2wo9roz9f63hgwtq7dnpttlinucipdz0080ufxsod4qo084ry9xzjmnglw5bvtbriq9lfo3w',
                errorCode: 'f4621iq5njc6laum4ssg',
                errorLabel: 'l5i48r5ns3r9nk3g0lls5vjaw1n3r05205rvhue91suc3mc5b71fpr2dxijdmcdo59f8udd3atzztcla8f2o8xc59cv9vay2xttn84ktjl5foro6omekszae4on47zl071fn55n2hwqkdtyvrmi2jbtu1ilxc1f9',
                node: 5683676957,
                protocol: 'd3pib9zuzs6q2orllzak',
                qualityOfService: 'ah8lq291kkg0c06ajy1b',
                receiverParty: '6806riok3h7aril00e4a5qf0wodr55l8xk6topgtex4tozrzrwyhliopuqbkedehev87d2n1crasjynmxg8gr1hm9oowzamy3jz0jevg8kqlbi0jay6ggy5scm10qh6s4wxmk4vqd4l8b2eq9y1g0lrpeo5zeb5w',
                receiverComponent: 'jgzg5q8lk4un6oxeqfyc2p1mnsv047eias55b84oaiazmd7dhm2nfnh2zs1a7ca00dxxbg380y1b6ensgc1k7eadchlafhm87sqkv43fwjtac3j72289fzvi7g2pvu9uwm5oy02jn6gl8pkqbaap1pgqpkcs3hkp',
                receiverInterface: 'sjj5d7pxxxxx8budseh18nxomi9uhibde9m42yyycuhfqlbe5cfvqyuhds56ljbqvuztepud67hjb6c50n2nfwlpd3fiklggyahxwt11isspyvn5xq3ixnlppnpl5y0brqcqsnqpg5xut0izv3dmc6olo972b8mj',
                receiverInterfaceNamespace: '4p3h7lgxr2h2m0b9tum841sgwey93r3le5d13sn0azqaa9lrnfx7sjferwnuyxpi8rdokx15s4ogw23zgfshpwe5nn4rli7skfjmu1xx0x1x48fsfwmw7p6o6wlzi72kqh8p7l4kv2o7z5d23x43in04wnnotrx8',
                retries: 6654250124,
                size: 5350072421,
                timesFailed: 8177468039,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStatus has to be any of this options: SUCCESS, CANCELLED, DELIVERING, ERROR, HOLDING, TO_BE_DELIVERED, WAITING');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: '628kwsuke7ir6y4t6zc1',
                scenario: 'ob1l1op7u3c3kuq1tdi9bwbiwawliglydf7fm3pft62a6uv838dx96cldfah',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-16 16:53:15',
                executionMonitoringEndAt: '2020-07-16 01:58:56',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: '544m0dcd61y1cn5fpzbxoi234yrotdo5na1rixaobzus22ea5tj6di22azkldkbpagq2tgi3pc3r58lxwvp8ot0d851mp24x6jgv3fevnpwffj2tqia6x7p9m2knb2ohqfq7r6wdrlyo0jgkvgpoo26k8qp4dw5x',
                flowComponent: '5nlgtpt3gil27di59zfonwn2zylwz7m05glxzvtv5go4le66o8598pd0gjibta0bu2ikt4wzus3lmkqg1zzp8fvfxm9t2pzmwi4h4s3e2o5jwyaaqatywazkfwxtnydioqx6c9k355f7zssshrd5sluhlocd321t',
                flowInterfaceName: 'yrqqk0r3em2m7hfw0xec00nh93qdlj98xcf3cifw00vq4r9qzjbacvb87gnamstp72rlmd21cososhz5i833l063wgq5s22tk6dprhgqi3zjb66vmhf4jsbl2a4u61jha5yjzv1m4mtudkv2vg2rfv6ympmukqut',
                flowInterfaceNamespace: 'spebgk4qigq4ecntgf9vayypob9w2lzu9vptvqjhx3p1oo7leilklkdd4wrkc4olp5nc42rgwjnp2fnirdccia9r1fgawtcwgbymromgk104vfsbah9kox7ekq7uhytjzfzxzc13gfij644qg38r0j5632tefrsy',
                status: 'DELIVERING',
                detail: 'Molestias enim sit esse velit dolores eum blanditiis. Fugit distinctio et voluptatum corrupti voluptatem illo velit accusantium sit. Et nulla nesciunt enim autem libero alias.',
                example: 'ulssomq0a5s57qjyrjt68f3vscta8naubvl72p7zvb5lx64popp4rkbvowi5xzydra519xiv1twmyvoa82f1yi2kesag4mldltevl9bnfy73jdrautw0uh5nudwlrcxvukqftqm46ee0u04y3sadvi7hk9mqblu1',
                startTimeAt: '2020-07-16 04:54:03',
                direction: '10ap8afh72oe77g0svtr',
                errorCategory: '5by8v2ehq3mh4oio985ywnzy0zbjuigwyp1x5ymk1d9o69l8vovbu38sea5d7spl1gwz0nbjjglc2div2uhlf78gtqmh8jyumfvce4jjpn9jw6z7cdz1kbp59b29x50v7iao4mqsfyic0rbyf6k1ybustcnrhjg3',
                errorCode: 'he33m9mi6nivb6r7k7kl',
                errorLabel: 't41ly6eahoe6jsy0oi3kcgsd9l2x09mqwlagbe4oxv5ppbvrmc7qa6qr0c1dbwnepna389if7mwtp6td7b2x9gtgr5fwm49v695aara8vegnmq0cooz0xasauljbi4eiwg78nvetfkl6fuv5pri76bsmg0rjoybh',
                node: 8638293534,
                protocol: 'lwyrqivvj79opa8gwujs',
                qualityOfService: 'wgv6x5ybn6wl4u2wghdw',
                receiverParty: '45sq699cmw6qj6sq6g1ux6rjqkhcauaocip9uk4bcdhh3ec6mqxyjvylwx77wd47satgv8mlonb8jmqffiiaftoqr6pos2rj6nr7cp1julr2viqadnx6rdwl1f5h1j26bfiz0m1kr68j6sljk7mlq2y6lwvdq8md',
                receiverComponent: '4aqx8umlxcuya0h0exc60mc10gq4n0vmth8guq7z6qiswvk3t84kn12u27tw30ppw8zr63et9s3re3gos40n0obi71pzaw57h4yx7kilo7e9u3d11dvzsu2bzblyb1zie67bvnkqkw3x5m5xgnxkjzm8xysyijjo',
                receiverInterface: 'u3n1mo9ymuwyc18t2lk8txdy2p7gfn28snl5i7nulhm9xbsth2r1qw4odncc1ptallx9rjvopo8q13c3pjj95yvdoufifstuyb59fnq2gt6b8c6mojke0cq6jhkh116404qhs75lnok6ph8s4t09uzgeunjjjpca',
                receiverInterfaceNamespace: '6eq7xa5h7u9z6emorytla19ewwfukmpztufmg72d8y3y0ycujsm75tqo9wapxhwsasew4en16b4vuj4pdc6ft1mytssnt3dqr3bgeotw5e7mlroqvdsu4670t3p1itfwn1dbpscrfnzkpff554fekh980s5grkys',
                retries: 7108555442,
                size: 2876841702,
                timesFailed: 7107366546,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: 'pstmkdp6rru8eis13qra',
                scenario: 'u0denwnblt1xv5fomwl6y9ia2p8tp8hsasi1dhz3u013ixsi9xwpnpi4mnr8',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 18:49:23',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-16 18:27:36',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: 'nln40v5iwxfm3glw2zjhvn45fwehxm9d3z7rbkq6umd5yimi1qtb844sf9nw51jin12j1nxyvi0jjsij90r359rx6534qqaxuwwkeefn546l2w86wel2xem06oojiykp8rp99z3ms1g4a9tjj10l20u89sthcguv',
                flowComponent: 'q3awpzv62h3v4qsdvg6ugq02jehfsby2nekatr2bhxr1m2jutdy7f7520lpz8ej58vvmsi78wibkwest3262yoke1laz3jetu2h81pe3vknyu9gyret80di8au4d4dnxpbrek22akwek34ziyg3zturlz7ditdkd',
                flowInterfaceName: '3sgq85w5kwbibrgf246vv2fc1aaahhbledwq1vstgxj61yqvkjshq7jpdlete3mnpmvqevduz2er1g01605wnlpbunllo9vt0p72576x680dnirdrckxsam4wzyoqfh75qvruytkqhowlj5vejclirv1ovirfun0',
                flowInterfaceNamespace: 'guo4vjjrswleb8svl8f73u50qnm4mvd3a4pawrumuy8365ticgthu9yd4tplcvaiuvd70i6lkdlhqsije25xe0a87cn8rfqvo437dzri0oizmd9x0jbzsq0tpcf9tw0znetmrhjqv4p0q877j0trbjija9rri2ra',
                status: 'HOLDING',
                detail: 'Explicabo nobis nihil modi. Voluptatem enim sit sunt qui ducimus. Non ut rem hic aperiam sapiente. Sapiente repudiandae nobis aliquam assumenda et consequuntur et. Doloremque minus velit recusandae dolore nam. Qui harum aut facilis qui facilis vel hic numquam aut.',
                example: 'w3y0zfq9tgeij8cudla5ucqfz96eo56dt3ho8l76pio4fg1rvd9y9ypubhxzcjqey4xvjm34dd2q9sfyp0tmhrx800cxcx45m0788dup3dttuydmvpkh4ps8tpnq7m9ts9rfxo19s3xu8p5tn81qi8kex52rqcg7',
                startTimeAt: '2020-07-16 13:45:15',
                direction: '02wnx9z1jdp8o4l3d4db',
                errorCategory: '3cf3yj8z50j8ek7nn05d01gsl6dk2lghyfpd71rqqtsni72kcegxl0a8dlzu3e5adfwibk43sq25zfjiwmhknyrwwhpxwuno8lky0j4je04qo5ferobw39dvbrb1wqrsmschhn3z1uv0ffns3fv4vjab0q38t7wy',
                errorCode: 'ila4kjlpihmhjewswejo',
                errorLabel: 'x2f9m2vt3vbbcmwhbms9p1ihfsg3d84gk39nsqvyzttuvz7q5zqi3o1ahz2bbi487s1jloc86qm89g288h48sfwjw49myhqv0upulogqlm6g5br3kf904eflvqjcrfdj3may5hfkjhj44hq8kl52jdor0612ovw3',
                node: 3492565032,
                protocol: '1yrup6y5xwtijso2ct5k',
                qualityOfService: 'x3pfc221zrd73qp0v8ew',
                receiverParty: 'zu0cpdwtpojbiqc1q1ca0eselxsv2tr8xv44zookxlas4n247qwsqxhk5g5isj66bodeq474z23lq5wjhfudseof1loolgmnzm6jn8o1u5oqgnouc6u0038o4413ylojzniw7najjw4bot0my2gbczqo3w92s9k5',
                receiverComponent: 'btd756ng40wbpmc7a3drisrdxrjk466tpa6bq4wujudakyrd0fpzqmygah785vsndjs0yiqc6vwn6j0y5jigiyus3mied3l6xptusrysqpxwz6v3aevjcm0f0xx4spj8ld7r1nl1ywr2e57ujveb3up1k89djfoz',
                receiverInterface: '9zbu3c18zg9i4uz539a92jot00twozhsm8lveaf5qnwp87nksvhp5584wswgh72vdxvdywixn4mq2xbtw8nmzjblpeg0yhhuflr66nuq95io6zuj38j6136zq0hh2axgu0rv1r41tlhu9ymcbv2nlobgo7sckqag',
                receiverInterfaceNamespace: 'ntcl8nfktwn307avdba89ds6cydm3qf7pmqh10au88uqq644a9jyodrmtd6wus717yr0j1lrnpnfujmcosdlxerwrztvow2gwv9sfp8wn6013grprpc346lpowwcet1leqzktwb5gpurynthp7qd6quy7hz8f3q4',
                retries: 3861217414,
                size: 4100397920,
                timesFailed: 1206237249,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: '5azrxny76ba7oaobxftv',
                scenario: 'vvuq9tmp7xh47mk2nhsbzyyrpv6gwitzt5hjaqcl48mlaujlardgjvxotzrc',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 05:38:59',
                executionMonitoringStartAt: '2020-07-16 11:48:40',
                executionMonitoringEndAt: 'XXXXXXXX',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: '28e47v8byjj2gyrrmdtags4bogdmnraae7ifripgmv7cr3rk61rjcqhtm0ndn7zopbtdbf9wcqlvwxlmhii4c8asrtk0cx0il8ooq66irrm679bk8cpu2p0ec0sxwd1kknl2m2wip5zbj66m1x3r3l0ns0nsryoo',
                flowComponent: 'k5l5htbdemlp7dwtmpqblluc3nqgfph3ra60urypoejhxcmipa7dpw2ww3podehiia39tuub7zzm56j7prgle8uidi787a5lm76kiplfcptcvmzlziplhiqcy6gvo3ku4srvl0g377wes8new6sttiwbd4vsrj1p',
                flowInterfaceName: 'svlddxqwuaqx35tpvnfyqufytqu6ji624gy6u5zuwea1b12pot8z971ch24ndgw038kb4ml3wpuo0splgvcf5yf5b7uh0itwxgfagdp9s7vvv501k8zmx36iq6r719jimnbpn5qrp7evshw7rtk3qtljp01zajba',
                flowInterfaceNamespace: '9ukldf7wmwqwb367jfrk8d5rlumq0bw92ps69ocfw6m6nyikdalzcdybff44xpauh53ob4j21762wjzrcpx5aeczcc78g3a2slsw0gtcfeisrevp447icm22x1lus2tvxjsw1fcg0ll5f7404n6gfcc1o7fmzqhg',
                status: 'SUCCESS',
                detail: 'Omnis debitis nisi quia molestiae recusandae explicabo. Aperiam consectetur labore corporis suscipit ut animi et quibusdam. Numquam cumque aut qui.',
                example: 'oy1gha9j5d8kf00sufqa8l3x3egxhic2fcif1ok184rdlorjisrn1i2gclu710kry484jzd84rfyaob34ljr47mtcpguim0xqra64dw6ugu7y32yf2oy9p5vnj9f5gf7lnh01cft8nf5sgostmrozkzl7tgnbyrp',
                startTimeAt: '2020-07-16 04:25:33',
                direction: 'da4sn97dxb8lroom5gd7',
                errorCategory: 'ffog6dzirl54v4atx6ypfr90uav3rcd92rsg6mdh9bw3xkqmauwkzmdpt1o0i8n5kftnomg792ax18ujqte47dbg2dk42v5a23w0iyo4j02bg215dl343hjot32zfwh0s0n2chu0qvitaazj6231yzrjxwcbr1ei',
                errorCode: 'ztx07y6x15z2z8lgxssk',
                errorLabel: 'ijwnvnhzudwdkpqvdkstntz2mz7711l5jah6uroqyvt0zpitv8exn26g1qcmrzju2ff6l7iihxicauulh2w1l52w1p9jgcycipnd3436wzfvbfvqb8j8hf630q6akrpkc3akmcx456bnehl210jal6f5pqa7490r',
                node: 3239474728,
                protocol: 'sivv650kipblesm7ft5z',
                qualityOfService: 'p9mhwgr64ucuzbypwmys',
                receiverParty: 'u5r154oznf1t27srydkgku6tb3vvg297q1baltzrm5x9qj5p8xkrapz3sy7i6kdf1tx9kcx4sanqsk3ntbcrmslugppie3obx0ha4y09faxmuewub4a1e2xuzyi98n99gteudrmgsr3mhmzr3r1wafe4wfindc20',
                receiverComponent: 'yzxk8wx0g85bqnuiib1ychnw5uq5mzn4fad629cp1twt4w4451a2imblpi249xtshuur1to189v7y130cl0lvvc9q2y6tp7witp1hcnag2hzmvkbovg353ulrc2f7ck5oz63i0v9y0u187j4nra6nzen5nzms71v',
                receiverInterface: 'qa2en8gd0h8gocmr491psf5a37v1rqkbnlvu6byw9qgi504sbggf5n08xdt0mrfhty39pw4ry8ddehes5nzjkz7xkobokjn47ro9ryykp4df8puaur2e0cwbke9rzjookut1s5rwghmpobyccnt55fkjhf4nnhf4',
                receiverInterfaceNamespace: '6lv30ubuhb4hh57oivr709fvebt40oca6ro8pdwzjz7ebhmjhpu99yvv6uprx3lun6dsu2opy9kbsz81bv0cok0kxay7q60qflitee09jf3ytv91nombmvrgxxlzkhi6d6uk32sfn4pkffzb6lwc5k1hb2g8h36e',
                retries: 8134407892,
                size: 9037316635,
                timesFailed: 5040755779,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailStartTimeAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: 'ttlu9iyi8y0tzdhy7f71',
                scenario: 'v6zisv2uwj1uz7loyr38lihrppxv55a22ngsverg04v2i4jwqq2nr9gg2av4',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 04:19:20',
                executionMonitoringStartAt: '2020-07-16 05:52:05',
                executionMonitoringEndAt: '2020-07-16 18:20:29',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: '26gqok6woyfmbt7u3dob9uy81v5sjapax7uml7n7gpzw8setd9835izh0hm83c2qw5px8xlsgpqcv78h33mcfnqs73hs0853c0o2hhjah8ddtpcmb8kpcj75zgfm7frhkrf09jhiz2ek9toxejs0px7prbpj37ya',
                flowComponent: '9o5116r0nqvu4ecre7qogbgp6o6k0vxbe00ghbr66cuoj0exfqc7tdgrgdd6k98i3v469gyqmx0y2ipaqgwpcjbfba3lpjc7kijfw1vm4bhg2oxl0xahl0ojv0sjk8efh88ok2zgh91finhbs9hqrt8dfe035urq',
                flowInterfaceName: 'clludimahyw27dvhaht7amft845g6rua9gctph8fwqfmkgwuy050dgpder4n30wxznhp3hzserdr9kvx8qwahr4es3yff90my81fvuie62zdkftey7ku9kl3ktrj5dchpv5xkzp3qrx10wfik0efa43vgv2nxg2t',
                flowInterfaceNamespace: 'b0wno2fo3b2hdrfe58i83b9kenmqvppsh8scuhce4zgekkklthy1iqj2r7x2t89r78kjer9qhdty4ikp739x3blf7jovp90mah1sreufa2zisws6e159hrzwilfgg833udj3etbrnof6509vp5t3bznhjkn0eeqy',
                status: 'HOLDING',
                detail: 'Commodi earum quisquam a optio error. Dicta non autem rerum et. Et facere delectus excepturi id voluptatibus omnis soluta.',
                example: '6zhc4n5mf8v3vk1j15wytyakgw6ofeq5k18d6dhyazxvvw1y32s3yg6xxpbqyooolgtvr6v7oe4emf2f7oah24wxi12v9fom86oa6gqgv8xdsft0e8suoicezmyy5fqx3cef6y99mndlym4urtuwikmd1reqwsxf',
                startTimeAt: 'XXXXXXXX',
                direction: 'urv5e684pj0f3uzipl81',
                errorCategory: '5u0k69vnm3tf20fpjtce4cuy6362evffguzyz43aqkp731b9r0vgp3acvmnznrnnfxnc3hwtiujn65qm8iaxxdr7wcinkigx9ftv60ma1gazg6b004w3b3kqd9v3y8abtf179je6bekpbluat93rpzy2awdr8nj3',
                errorCode: 'u2pmchhl1gdehe3j4932',
                errorLabel: 'kzrz6613dn5lp0mkap9s3tdgdqieqidyrno9oxhw2biyabqq1ci39lhwimj37n2e7ois8cthdjlilhhxjpak8t1t88nw4rrwg2xknyvhr4pd0pqgmeu5p19paf70ap3gv5fxs9nvf26h9mkuilk01maki8hj6pnq',
                node: 5702269915,
                protocol: 'mcc86hclxtj32x5e1xnr',
                qualityOfService: 'x9j21i5z1aw8ksnyie2e',
                receiverParty: 'o3gc4bl3t2irf4mfzul0ir41uj0mn6x4g9c1czzipzrynjgrx2fzji9jsjo41ju09yf5voq57jicitzvqzb2fyl3bcbgo7pysk8j0jmcqzjh27vd58igyickx61tn9lz7ckri1p157va4drxge8ocq414wveo5av',
                receiverComponent: 'inub2zliyb1tjqsmt2yg7c9ihs4gyrvafs9rcyr216kmi5gwgyk4hz776pd9slljbmkq3hejefluaq79uyg82pw6ku6ysvgl1bk9dy8316cfii4t3fm13fmw8i0zmmtk730p8wqlyc2e1tylbot7b7htzqavggnw',
                receiverInterface: 'g5p5s9s30bwcaia41nztgiy9tkmb4ip9gv5023u2swj0a4ysmsxwt3semu47ne9tmxci56x7mgr8dvq20n9tdhit2djm1y2thdwx40ytn48prkh0t92apckl0r6cz1m2yapir82nf6n8y699a4ox2lyx01dfjq19',
                receiverInterfaceNamespace: '45lpl6wfu6cyragwxxypyk6aeurfoyi7kbthfe1p3ixgco14u7csxtwg9gt2qouku3d36ee6nn7zdjdega3t3juzvmbtxyxd42sl9mpjkumw51n37eina3414eda0z5vns4630ahr6nwef07xo5y4870o5ow5xut',
                retries: 4778231546,
                size: 3893247084,
                timesFailed: 3402788807,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailStartTimeAt has to be a timestamp value');
            });
    });
    

    it(`/REST:POST bplus-it-sappi/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: 'cblwgnlzyt3i2j9ymu45',
                scenario: '0pyctw9ztec3w8hndwo83jok8i8us8qh10yz9nyon9dl1t31wxfnwvlan932',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 06:05:16',
                executionMonitoringStartAt: '2020-07-16 12:59:15',
                executionMonitoringEndAt: '2020-07-16 01:42:18',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: 'awny40wtq960jhigwl9vqc82eismsabp1msk6m9w7vm56k4o6foasrb60fh7p5xwko38yj4abw84jm8d56wd7jvbq3axi8ms2zh5henbgbw2xi4s0f60obxuvww89xw10t2xoraokhqi24dgi41631q7kxckz2ek',
                flowComponent: 'zmv7s8ir0aaxjhbzqptf6ggvr1envwfic7holox9bepe8e4lngwy14vdnxllgycr20pbpssrwbu044cnu3rziw6v34alfd09hl65bqkcky5iztlvxmil5w4d9yh48axl7vsacg59rsa4byrb927gf97otuv931lt',
                flowInterfaceName: '9tjautnmyhf9w57v8grkqlr60twvsakxar7b432eozpu5pi82uwytxtv9a31okpt44aemjpac9nnzhrghn8puz9er2auqvln5rmo9cpwa1e8y5rd58vcf0l01nfh7ul0q7mmfz2i7sffltoj5oxfrd0rz1kvj96n',
                flowInterfaceNamespace: 'o9icvd2ntnna9noifdw7ik3e5ljwb492a8xw0wie8xl7pgjlreemztydc5mntghzkv40qlo0agkgx1c77p2vysdy86fy89bnjs0bhe7s7a9el0hgez9qm27g03m9ewriah7mulhe4a5j6ognq4x3w6kvg62liorg',
                status: 'HOLDING',
                detail: 'Consequatur ex dolor qui quibusdam sit consequatur commodi consequatur. Alias ut dignissimos consequuntur officia. Aut ex ipsa asperiores suscipit. Mollitia culpa excepturi qui ad enim distinctio nemo quis. Voluptates deserunt doloremque. Quia ea et et quia qui alias.',
                example: '2flbswkstiis4znj1hn6k04xvqxd5e8curi8jl868ur36gbt9po1ecawqia6hvst19wva7pvl96man32zwwj5hszhqaqdsfi92657fi7sf2soljpwmduumkz8cuxe4blm4eqnjbmhri7flfeos4lvk61jqbuudnu',
                startTimeAt: '2020-07-16 15:15:12',
                direction: 'k7fyye45xc2o5rq3fotj',
                errorCategory: 'qfxnqivd00o0rajoadck12akc2omsmoei8t2ntd4tg07g13lo7pdm2f1ojdfi5kzmm8304kwlxkf08ee21s0sf8ni6vv0f2otyf0wahbuz91vw6fny55vev910kht56vmwgoyq8q9jbx6p0vkifl8gbw84tsl56v',
                errorCode: '94whz22ln08mq2w9y94k',
                errorLabel: 't7c7bhzr4ftdqcsddmc54j1znomo27q89w2cgvxk3ipir0g46ct6p7mw76c5hl3yvfd45jafob3u2ofhzojghphglmk258qh2lnl2ijcq1pxxcq9jqm6tqkdj1dr55vgugsgu4o611p0kqz67dfggg079mvvfr02',
                node: 1257767427,
                protocol: 'kzrdr2qbc60be49xzzry',
                qualityOfService: '88gfrwfmh5f0gefdpnvs',
                receiverParty: '66dikz8c9cxrstvrzy8khxz55c9og73ooeub6p2qpgucppy1br3hwinimbwde5s3pru6q5vmvn2rnl60bj6pooo50h338rux8cjbrdc6ed7c76008810m22b7jhuiafxmuj057audmyav4j7gvven2ohqh1b5w42',
                receiverComponent: '93a79eq2ti3z1ha1i85y6tp0s63h809f4oy5zaacihd16ob6sl5wylj7nc10m7lj8mvj6av8q3fomrngb5dtw5u64ba866k7htemacwdp5ywiebk0ttj8dpiwlqikbuk5se3zfpw5gbz35vqe06rqqldegljc2sh',
                receiverInterface: 'x2ahxf93oaqsmobnpr9hbib6k0hudsqp5af1v5p5ofxm3sw2f8qkfdt300hr4615xoidhbb1mrnmhdwdwqriwm1ff3u6dbja6wjbytryinbol37k4hlqee4gfqr7y1sp0j03y0cmdxpat2g9nqnod9j38hn79l3a',
                receiverInterfaceNamespace: 'v1fl1abo77mikgx37myca5duqi5m4nbmktt61o6ektntx4hwuxwr3xulh5bq62117fxm84kiewfj21qftddjdns2gu7r8qhmgae76acyxvyizas55osjsmmdwca2pqxwh2ilekzarffucf2wuw6nta64qapti9a6',
                retries: 4443240410,
                size: 6018959065,
                timesFailed: 1078767816,
            })
            .expect(201);
    });

    it(`/REST:GET bplus-it-sappi/messages-detail/paginate`, () => 
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

    it(`/REST:GET bplus-it-sappi/message-detail - Got 404 Not Found`, () => 
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

    it(`/REST:GET bplus-it-sappi/message-detail`, () => 
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
                        value   : '958b0f58-f437-4ca5-85e7-fd3b52a3dbad'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '958b0f58-f437-4ca5-85e7-fd3b52a3dbad'));
    });

    it(`/REST:GET bplus-it-sappi/message-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-detail/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET bplus-it-sappi/message-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-detail/958b0f58-f437-4ca5-85e7-fd3b52a3dbad')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '958b0f58-f437-4ca5-85e7-fd3b52a3dbad'));
    });

    it(`/REST:GET bplus-it-sappi/messages-detail`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/messages-detail')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT bplus-it-sappi/message-detail - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '923d5b11-9d94-4409-b582-b5c5985c158b',
                tenantId: 'c06493f4-3d8a-48f0-9629-674acf086d9a',
                systemId: '4da60c3e-2fcc-4c19-b50f-3c64fe3e6491',
                systemName: '15z1nl28gwexbymxksy8',
                scenario: 'n4qnag6clgxs1606gqj0m4g14eowqz7hmkuimzthxw2lsqrkhz6x4yzocfjp',
                executionId: '83e37404-23ba-4a15-b01c-9d312ee43c1e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 19:22:40',
                executionMonitoringStartAt: '2020-07-16 10:50:49',
                executionMonitoringEndAt: '2020-07-16 06:25:34',
                flowId: 'e859625b-b345-494d-893b-74fbe4b7050b',
                flowParty: '54at74p773sw124o18m96p95csbfqax14sa6eopq9ryvbgtbcay5x1mo4ytr94uoqk07f4q99g05bdlrma21oyekr4a05uz625b7w8stw3kbcds9jt1bwn7y12l0810jb8mf4n6xur7v14c4s0tzpfbt4ptjp5e6',
                flowComponent: 'eiif9bj1zmy8dpan9adt2w4j84ho21rsuzc77qae3zrcisxq17g72rzxd4fvjswcq1rk1rmyfmzs1s7948szukgaghrksfi040zlzjs950vlku0xlsvgv0z2uuizki89lzbhsip27o76rq33g0smbi6otihzi7a1',
                flowInterfaceName: 'mv0t3tqqrwdb5q3fp20q9cdp0vbmbacqdh2wb8xzjkngzucheeaewwlmpmaonmc4wy30azxl5be1i6sprhq6176xozb4njjhwbc055rhsa44n5bc9p48ym5lfdrv3u7apmbqnel0sgh4ktrczthypiuy6g7v5wx9',
                flowInterfaceNamespace: '7dbhsjjnq9jr8tgba5efeyxbe715rbnl3znl5w8qcggidap90xwtgoeq3vmkctq0ccot7dvj9kolkzqoszgj0bma8uvmglmt5g6f627d08coy9jouhr8jrcsprpx805zyzrok3gg8ixkprdtdrcb4edz1ztbocdd',
                status: 'HOLDING',
                detail: 'Molestiae assumenda qui delectus quo tempore et iure. Et dolor ad aut id reiciendis. Officiis aut molestiae error eius non amet. Perspiciatis est cupiditate accusantium. Non vel sed eaque ut consequatur nam. Eveniet natus molestias repellat atque ab unde quos.',
                example: 'uk0hnto9nlmab8st7sdd52cezaasc4ka5ol40e1n3ra6hlqvru4xse29s0g1mat5qxhk3cnm71i172hutjvrgtd4lefrm96e7lp7m54r4adyoeup6bxmkamdsrnq34i7zpbzam3e7404hojpy3v2v4bxd4qsjc8z',
                startTimeAt: '2020-07-16 18:07:58',
                direction: 'aps4ihhyw4b8oc2pxhi6',
                errorCategory: '4kye8vwq2y0xn20tfdbbvybcv309zh9u215scszx5lv3t5s1j9g7zfc13p4nb0wzyffmr8vsdrhnju6d0rf76bbcbojlv0rwqe4ua4ipz6j6b6vzsfexiyjos2m957f8g8itlzrk3ag0etjwitbwbr6w4r2uygjv',
                errorCode: 'nubhmvpnmlh1odzzj7ry',
                errorLabel: 'oucwxmbaozdw1xy04htby8n805is5cksa20fh6ri9aeywl156qnjozshq9lxbvf2zbo1djiqg2fqz7a8cblj5vd1zw3uhng3m41pvvk502k4zhyx7fyk1ua0f775v4x4uqvhj9tig99whuozrrtp3b2ecft4lmex',
                node: 2159036119,
                protocol: '3wiif0dlzm9pqlq1238a',
                qualityOfService: '94y6mwczxqiaiat136kq',
                receiverParty: '7136tmdjt7w03ik8buyl5gakw7qvj0nognbfiy4kil7qq1asd9ovjoeepttqtsrmb06d6g2zjhucslepkm7xqh6xfiufb1m9jxb92amcazuzq09sjzpju6zzmkr60yd720jm7k0k1cu668vjuson813xyug2pt91',
                receiverComponent: '3x8fv1yestm725gnseaztx80qhoyzaylr3aag3tvdb591veiwpnyhohehdnsioxjkzgh21w45sgtcj9jegrixg5esdtovfniow72uchrcgrhvswf1nw1xa41o1u3voxl1px6wsgrh63j9vxve8whxfll76hqqvbr',
                receiverInterface: 'gwxlwzufwapwvr0htjo107wld0jvbcbr8irst3net741tx7zc0r9ix4mzh96m60izfj0q706nhsl2oh7p2y56qhfaxlqvhbkln7cqs0lst92te5aayshgkocx1wwo61jclxsbe5i2hcpj6846ingbz6hi7siijkj',
                receiverInterfaceNamespace: 'drlo4xgoxog2v0lsjer9vkjljjfg6nd6a76huc8sbffqx4p3qd0wnn8ajkh1xouds4ylmttpgxcb0f4lbzsafbbe0g2htroypd4e4d24qo7lcwty72insasi63bjxaza60el9keqgobilyo0zs4dyjshiv67y6bd',
                retries: 7205018860,
                size: 4978149287,
                timesFailed: 5817776625,
            })
            .expect(404);
    });

    it(`/REST:PUT bplus-it-sappi/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                systemName: 'gba0t6awtol09flym0y3',
                scenario: 'i0ys5j03j0wpuzb1kqkoo9oji1bobb195pt7edf150r4q7xtw67qo56kuj29',
                executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 18:54:51',
                executionMonitoringStartAt: '2020-07-16 09:51:41',
                executionMonitoringEndAt: '2020-07-16 15:56:55',
                flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                flowParty: '3jb66un1w95j6vx77gpr3olef0ea3cdscakl5qs9zgw5dn65bpavzhgyx0nvl253e3ytfdzb93a4x2gx5b5wgxkliw10af0l3gz9zbtscksk5jdvosldy7r3899z5u8c0rsu78v1k0sy223sud6mp27jz3xdu9cd',
                flowComponent: '1t5yxptaszcfbwbeowzuwvgpw62w3gafopxcr9wkbr98ikyg261i6znk7a7bcee1zxlm1issbq88p4pgwxys4tnhf9bzkwsfvadwnx2kzbxsiwbwxaegd9zvspbenobvtg2l92vtzo0atqa2o6h0f7jhgu18uumo',
                flowInterfaceName: '71hjstgnvkwt1a5qe8dl3jxvwo2zyvlizr5lmppb9r6455kgt67sstm9szjsubuh6gxdtahkfkl3u4surpm84wofa7smfvv197urqjp3gixh4arfizuwn4r5wdiuh6qph36xchgnlqs41cmcqgaf1bwydjuyf301',
                flowInterfaceNamespace: '5vrxn4nj69h5lqexzf0knv0ccmk8mbm8mnrw3combnimq60kyk720bzmfpcctgbmkdqc8tysdtantoutfg9oks9nzgy5675a3wymkqbdf86k5fen1yl86d7e40pyee50fqxzcamqlyu3wrrva7vc7t5esyj18tzd',
                status: 'TO_BE_DELIVERED',
                detail: 'Provident ut molestiae et ea voluptatem. Modi maxime est sint. Animi magni est dolores repudiandae porro consequatur nobis doloremque. Aut cupiditate quasi.',
                example: 'qpp69eqxlqb1bdbb01htgpvq9ghl3z43cekcil6z2xtlultmr5y1m8aqvjtcfdae7sxl0x85k93d4lh0yqje2rjodcrq7azs9p0x45at68aqc5f34iz4hdot6rmvkjujlqgxkzzqm16stt973ml1fk82q3zma6yn',
                startTimeAt: '2020-07-16 16:56:18',
                direction: 'ud7t4fuovhko1qgvnbl6',
                errorCategory: 'ywze0ruapya1n9mswthax6l6tcvk52oy8irw8385cn5sxjxme32h6qn2pzp48vuuaz5mz36hiahzkql1y8jaqx4im2z44o5r46bzuung7xq6sjj8fy4zb9imtfsntl1wryppdhdu26tspknwhy69qmbne2t8dgxc',
                errorCode: 'jrcbo23dlw6534dgi427',
                errorLabel: '41ak7xjtpziweam1o0pr5v3b0jvidcid34ez6udc71xik7kefer9ss7ukq62utsarbz6gd8ot2cco8yrwpdlsnrchba19gpe23i7bvh1ehx78b0rqdp1rpia8h4j55xf0cyhjhsomjgr8ifq8b8ry77th6ooq180',
                node: 4346624406,
                protocol: 'adjm1vorezy6qh1kknca',
                qualityOfService: '1860m1yam2bggfz7eweh',
                receiverParty: 'szib4ah003xjasfwrekkh4dbm77ykwt5kauqh17zmb92rjr27vcv8pdldqin0id1vbxxo8l1vs3sp7r6ymro9ixx86s5uje471evnnyjj9dgs4u36ngv7e9v4ktg9dxlgtek6d89cl65gtyoar90c4ybk7mjxq6x',
                receiverComponent: 'mkh7wm07md5z5qfpq7rkcev16w945flqqri2nv7dkmt8ht11dmvemweiulpr89molsea69zao629wlc2kcj7jxynsphl9p1mwxzenp0jp13ygcojeslem5wi42f7e3dehkwhurpakut2mgm3sl6qzdgxwscp86fi',
                receiverInterface: 'kmz81lfz6bm48iy6ot8jdcw0c1hg3qi5yqrr50lsi70z3rjl1g97suyuipmjayme3isr39nblh7zvv7gku8gs2kd1fgllrvqv3ztzxgda3u0g5q5ergbmw6hyb6rz77xafxnutu22shwa63ti2u7yjhgr5dbthzg',
                receiverInterfaceNamespace: 'lrz9hennjhta736dgm4zhe340xvaxg58ag45ywkw98ojtk8cg24vqzo6fwqylpnt5pzeyajllc5hmn5fypi54q62jwe9spdrjguiejqdaha189zd3i0fn956k7ecz4yo520upnr2ph5nbdheipia3e6yddi7ufds',
                retries: 3237197125,
                size: 1008381771,
                timesFailed: 7394607885,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '958b0f58-f437-4ca5-85e7-fd3b52a3dbad'));
    });

    it(`/REST:DELETE bplus-it-sappi/message-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-detail/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE bplus-it-sappi/message-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-detail/958b0f58-f437-4ca5-85e7-fd3b52a3dbad')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL bplusItSappiCreateMessageDetail - Got 409 Conflict, item already exist in database`, () => 
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

    it(`/GraphQL bplusItSappiCreateMessageDetail`, () => 
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
                        id: '0eb3587d-f1f3-4bf1-9c24-2ac6ed617c16',
                        tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                        systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                        systemName: '5cjpm5rglbg6byslkg63',
                        scenario: 'c26cjf42qatqg2j6h3oriie92wtbjawcr96luhp4b0j7wkv10e4d1ljcx48d',
                        executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-16 09:57:18',
                        executionMonitoringStartAt: '2020-07-16 00:19:09',
                        executionMonitoringEndAt: '2020-07-16 00:33:39',
                        flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                        flowParty: 'qkv3jmord4ytgv7jks4t06ur9uc4sry1flo9fosdoenylusp13pu7suz3095y1wdtjkjohrfpt1c69psvngh1egf11xoz5vdkjd3hkqnyr6okgo2pyyp4y7vhj6rmrpnz4p9zcrb9xk5al89xdwc1fd2w4d6tbjx',
                        flowComponent: 'sr8jbfe2qa34lnan27zexlldmbcdoiwn5o0geikxaec6xgbatr1ltnqtpeu2zkod86z8t5ap15gmgm4ia2n4a11gvb3bzbqsnk0ck1qeopaw6f7id58lezaqcqnas09pjubcpivgabmtn15vbxlql3kitcxg4yyi',
                        flowInterfaceName: '9dlibpd6slxi0nk4g3cz6m2xsth2faduf0ihqcjtadrkgce3oraf1cfvvhfngetro6coubcaqbskyfihbpjc77gorzh4ov44qp34uhmoc6lejaze8wqiobkkh8wrfp0u65lrn7qqv70nxk0fzktyaouyey1kuzzv',
                        flowInterfaceNamespace: '4ov1hwmxf912zfds9zxt1tv3ag6zqhpquxg03v37iksvxomfkf5snf4tldztqdwgx37xsc0b7pt375w7o9thw2sdtjgv9zxb8pgbhiwgf3g271suo6tot2j3pwownskqchyyoj1ui6nfal6aq0surusbg7t5p6yz',
                        status: 'ERROR',
                        detail: 'Odit fuga qui accusantium delectus odit alias officiis alias soluta. Quidem non optio. Modi aut recusandae natus culpa molestias et dolores. Quis esse nihil rem. Assumenda libero ipsam et facere et veniam quae.',
                        example: 'qcw0osctgl5bmjr28ej1cdn1zx4d05yyt7uu1dnz88or8tq2hxwf75heqheygqip05v5iv4nuuhlj8r3mxigya2nli0shqrrtjniy39j36riekeinla0wzs667fhdkqhhiihec2t1gpljfvhqu8rm4lawvtuzyi6',
                        startTimeAt: '2020-07-16 15:29:40',
                        direction: 'x3hrvfr8mm735qeubvwk',
                        errorCategory: '90nnkbp5kp0a0h22n9pe2pqpw9nh205789oiixngprorrcamtlvbe1k4sqd8s8b09cee11gbs681h3l3gf61qqhgtvehhznlji848b93u90rr5shr87aqrsrb16ptce1xhzqnncpjmq42ovz3tjbbpivzb7ixyth',
                        errorCode: '2k619rouv7kqji2k2roi',
                        errorLabel: '0yyksb7j79997a6c9ggfqp0znybaokmqdmsie2p4ebhzbqpik9bywvnik2sdfqlrcvsu6n8o5f39cvl3v5ejeuxqpo3zo2nn62mvymhxqplm4itrggjz3jvx6pp60hearwgm6g4xz38585hoi3q4xr5p35nin0y1',
                        node: 9644656933,
                        protocol: 'cmydp8a2bb6v3y6280zv',
                        qualityOfService: 'xj5nwpmujczukr7xxuap',
                        receiverParty: '1r34t4d8rr2ayf1etpybf92kv5baon7ydnbgtiq2lcxta984yj7ra92gf7jrg2ofb6ipmhaknc2zq1jtdi8jjctlcps5fwn875ddt3ibkasq0fcidpsej51kg7yzft40r9bex8rkfvxbw78v7b16hs8a578ga4u1',
                        receiverComponent: 'aulazi89uo0pdvslqb70yjnuu1rf58yw1buq7dk4v9kvzf4kjasx60igvek03kso4i3sq4tof380vr2dukb5z9bruvt1y7ktvyri9mw8bv1h23y9iyb4gvpq17n9fhftyqs46e2gs53k5ddoh2421o67ao0xdx95',
                        receiverInterface: 'zr1jofap0f747lqkut4nqw0w5uk2l2clm7bm2sls2sv9uiklm34qqot9fvecgnerolmydjed3ge49mtoqye08y43bmbgn9qnmpr7ei2sceo9xktey03hi6fuv7rige91p3fybo00p4adxogds66xby557isves7o',
                        receiverInterfaceNamespace: 'h58rqnqp4xasuxpf3e5lpbtt5iosg69q4edwtawggjt7ayj8e51r9hn797i5o2yym9akpfbo5kuclbu6plpw37jgavu608o0iq2h3jk3qzuyk45rgp5gemz14cg4vvmziylq28yz7su1d7g82w14egutup5ohhaw',
                        retries: 4899158609,
                        size: 2324671948,
                        timesFailed: 8018168920,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateMessageDetail).toHaveProperty('id', '0eb3587d-f1f3-4bf1-9c24-2ac6ed617c16');
            });
    });

    it(`/GraphQL bplusItSappiPaginateMessagesDetail`, () => 
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

    it(`/GraphQL bplusItSappiFindMessageDetail - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiFindMessageDetail`, () => 
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
                            value   : '958b0f58-f437-4ca5-85e7-fd3b52a3dbad'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageDetail.id).toStrictEqual('958b0f58-f437-4ca5-85e7-fd3b52a3dbad');
            });
    });

    it(`/GraphQL bplusItSappiFindMessageDetailById - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiFindMessageDetailById`, () => 
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
                    id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageDetailById.id).toStrictEqual('958b0f58-f437-4ca5-85e7-fd3b52a3dbad');
            });
    });

    it(`/GraphQL bplusItSappiGetMessagesDetail`, () => 
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

    it(`/GraphQL bplusItSappiUpdateMessageDetail - Got 404 Not Found`, () => 
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
                        
                        id: '1cbea104-fd17-41bf-920b-b026ad0a0ad9',
                        tenantId: '4b027815-ea0a-4754-b6ef-1c1d37f69c19',
                        systemId: '95e614cc-0032-4538-9602-a24f5bc92db7',
                        systemName: 'g9mpqduh8zooue9v4x21',
                        scenario: 'dzpyw7wz8ek3s3eb6d4pybmazn8nrwe4vmqsn2hnj0muflb88uz3il0lclip',
                        executionId: '68f3fa44-398c-4a87-80ef-7091beeaeaa7',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-16 02:31:47',
                        executionMonitoringStartAt: '2020-07-16 16:25:24',
                        executionMonitoringEndAt: '2020-07-16 04:00:46',
                        flowId: 'db09b349-ea01-45d8-b82f-32912226a758',
                        flowParty: 'g0zmhbzc8k47xgsre83qhp2mgxg9g2o8upw6zp1gdcjo24ud6b60ah3iagod2rtdlp7akh7r353l9gzkr9hizko6kra8s7rkii9cos29nyf4sbs4lp9brn7ofrboi7yjj2bxucrts4mv41jrezo88h2eavjh2h67',
                        flowComponent: 'h867olphimko5or0h6blkqjd9em2cnfprc5p6azagmgprpevmti9yausdqheddri6oc7hm9q4dyixbubcf0ckyhm35f7z4ooihmkck0e54nh710fepqtioa6rjer8qo01beojthay847ape0io4dp9wbm04joo0u',
                        flowInterfaceName: 'mwvjzebjuah7choy3zhz4bcdzke8jr57jask8ds33mtvwbwxdqtwo9pl19tcgscb42cfsgi5bdmm45s0nwlc5l5i344qqp6b8ell30v5eceufofmgr3odl7m81xn1m200mcemv9gsvhjlb7wqg79xebvcyxo71kk',
                        flowInterfaceNamespace: 'xtt6emcmfcb6c0r4ovb3k0pmockwv5cm6ze9zqn2aisq0lp1cn8s2h0lu5qgr45bdhv3zh7bdpkt708zl3n2iegiz8h6u2zb6gcm2b5n2ocpjyboftwosx2wgsfvkshra96cjiqr460f9m7yr7waprzu2ali3ol5',
                        status: 'TO_BE_DELIVERED',
                        detail: 'Accusantium harum tempora omnis quaerat. Dolorem fugiat qui eveniet magnam suscipit. Qui corporis laboriosam minima maxime a adipisci cupiditate natus.',
                        example: 'yah96o49s3kr89ziz0tbrea6gnzqd8fcj7i9wzuzv50uupwnw82v38go55nz006ybdg7b7oltniphtzzbrtw1qh15bzw2fwwu0cwi6gdcgz79b7zg9sogk5qojho84f5p9h87bml7jzy2r31fm3xgjv87dk8tvlf',
                        startTimeAt: '2020-07-15 20:09:36',
                        direction: 'w6tgj0bfz41wzm4pfeky',
                        errorCategory: 'gg2nmlfak4mctbc6273kzpjtogtke77frenroak9pgafazwkl4576segooi2gmtanbqp4l9x02slguw6yflbk9y5ih5y4qyz1sh7lt3rpojonxgz3lk5usfxinaqmkj3japtg9klqc0qmcpg62pqx7z9ed5qkfgf',
                        errorCode: 'kh97lot52kriyrqbak3u',
                        errorLabel: 'pm9u468j6d93bfr3xhpldjgvlv1eulehlirf05zr23mlvjul811bs5686rsw7xskqae38z32l03d19av9sig76jhz5yk22njslyk4j35ci1syog5xddamau1m4u0hmobsgkhz02wt6mdi40p60h3n49sznziawmj',
                        node: 8178211035,
                        protocol: '5m87awpwniekntbb81nm',
                        qualityOfService: 'g5k0lhbscnmxv97osoow',
                        receiverParty: 'oszzi7mbrv632f2srrf6jpeyeker09xzb2aing2t0rs6nn42k45cqriuv4yez5xwjhmhbj5c9mbtn6rz3azjtmou9758359krghcnidoivayxfqeva7uo8utdcs4jt3yuj8k1y3mnm66kle5pdv30o7g1queqs39',
                        receiverComponent: 'z8tf93cnibtn8kg31qf8wgbvspwyj3rw20iv5na16cb5byzcf8xck2rh9uo6cmwacvvyww19evu3cemqb5li7ftofdnckx6zukmijcnu7d8l9g58ouqe36ap6y19t0iyz3oms1c4peouryttjgezy1le6riu1ij5',
                        receiverInterface: 'tlafmrjgtyu953qpqiujnwtj2wq14bee8egu9ohgancatedjj96h9b5cxgdy3xoblajfs8tgoxkq3qeqdqxwtw42c89olzitacivk15qj0q0o14dtme1m7ecf8x2jpfqb9ew1i2mfb38l25kzdltnk4oxvqa63qo',
                        receiverInterfaceNamespace: '0ykmwsvssh90y06h3upzuzymlnrcg46sirjpkwnehxmc0vscyh807czcnlpi7vexafhjb0bf3yd9i8kvrbux1k2z0q75vprjky0247ke93b57yq8gpimt8l6f59fh1tyw7wkmg7mlhdfoli3xt9d4lq3t9lfgi09',
                        retries: 6796250155,
                        size: 3593635102,
                        timesFailed: 3394470923,
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

    it(`/GraphQL bplusItSappiUpdateMessageDetail`, () => 
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
                        
                        id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
                        tenantId: '91c5b5b2-4760-4fb1-b38d-a11055359f65',
                        systemId: '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
                        systemName: 'ka81lt9wi2hjhwekl8dy',
                        scenario: 'emrz4p0zqt7fd3zutr8rh1jygbv6sduyq1k1hm9h74jdex4x8y1yfabcv4sx',
                        executionId: '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-16 15:19:42',
                        executionMonitoringStartAt: '2020-07-16 14:01:45',
                        executionMonitoringEndAt: '2020-07-16 07:48:52',
                        flowId: '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
                        flowParty: 'zn5h2xxp3yalwb4fikaccc94ofks8xpp3ug3hw4ird2ul26jwuz8pco0ca0uhoyk75r6bqejhlflymznxwqt6v8sivql3hlloyhzmxewma2gy8sq8q138rzi8r4u9w0fvunh6pp9o36su3rmdniy7urpobj3z878',
                        flowComponent: 'cttxmw1idecxftoakxaimkrd6xge61yss0onv212jsklyer4u0dsa8szlqcjqx80us9h82byc9lprymr9cso1n5r55phr21b3mbqt9yyxuhf17avsd31hbqvbze52nqfry96z7fnxa482iytonuzllyw3i70jlj0',
                        flowInterfaceName: 'nt44y0e13peozug3tx25noq6lnd470k4i14rtcm52duy40i5uehh9ymlbfhjw4r1wgrmka5xbtohxhfb07mn5c7morwuku43pujv6poidkx1y1nn9ojp79aabo01lmpq3s5czazhbcq0ynh8ak6kskx7yvhqoq5r',
                        flowInterfaceNamespace: 'huhj5bzpdibulreffkaazby82iudb30yrxoufomyqjjv2rvh9fjt56dmielhvqg81qh539dgrvnho56mg18vxbuqg8f52q2f247m09zb47vpaedzy8souvu17g0gmcseb8icrzoa1fa7u9xwg1z7ohfk2gncrd0h',
                        status: 'TO_BE_DELIVERED',
                        detail: 'Adipisci at ad doloremque porro eius minus commodi dolorem. Dicta nam porro corporis nam labore ab. Velit dolores impedit quis ex unde.',
                        example: '281mja5zmti92btdcolus3nnfdxsq3ph81f774w8ow8129ip73aarfhdpxbged0y8wo5jqsokyi2yn809tsmnx3gwstu5j23zyn7vr9seb1oc75dueotgd6xpjmvegl28kafl8hqex0enc4wtziibkudpqvbef8p',
                        startTimeAt: '2020-07-16 04:35:32',
                        direction: '2l8hpt58p716dnqhauj8',
                        errorCategory: 'as968cln66qcnpz3s6quom826h3l1ogbnighnakf0ie0t2gm0aoitlmg4rj70fi8vlb4w8t3o6h7vus69b8wh66ks2yzdpt3xedlgi940gvolymr7fymq3r7p7mogvnv033tew0doub8nvn8paflrg6i3jvlqljd',
                        errorCode: '4xnjxikwanu8uhxtzr3s',
                        errorLabel: 'comf0g44ziyk71g3z1xxytvw5n625xwi3cyv0r9n3y9bk5h1h4czbe3d7s53b4xdefechkn313oh97b6771760mu8qnj0sgwhit2xb189gzh8v8hims6vk2z0kz3yp2mtawr779fzzwqmqspoznl2ib8peumg1qo',
                        node: 7500863728,
                        protocol: '80ajqbt59gujed328e08',
                        qualityOfService: '9mo444wb75pwg5bqt3ut',
                        receiverParty: 'qwo1i20yb0sn5s2y1mng1gkdd9ng6q3f7i3q3c1k5cwshhbo0tbu2rirb5ym3t15b6d0u1swfpidc6ogslxq877kjquargpawdbetpsu8jmcjgi0xk7cs2hdfvn805reiijy5icvpzcfw5fpzp91ro88qjcx6dq8',
                        receiverComponent: 'n3rbm49btawy6pmpqhwnuvw45aw9kghbiin6w04pktqhpr60dldhdzqvxylxj8m9k1egxo5ekmymixjigesqi7eow9o26ktxxxgke0rvhm3sjbgtwfhzzmmnzvlk15yeapv11dkybfop08refqmtz3pk0b53zphp',
                        receiverInterface: 'bfbepe26evhkvtm5nacibgefmsoe99ef7l9eyyvxkjljrhchoibyn9875cgr9n3ckbyo5ms7hn1ta2o3fztb8fbcyom2nwwiw7gbep7y6xgf75fa2ka7bppjq2ipr8wekwwsftkcsd3lpgtemyme32zu883amyul',
                        receiverInterfaceNamespace: 'dotcbi9gc8a7ljy1as2bvtsa13r2mz3zs3kw5d1q3se0069nyfetn5whfeeorf5qnf9p57ik7aaomb8phnr7a7mov76kuwmn0dl1q7osyj95q84kzurkr1n7kxjg21u9579ez61fbddzmg4ocoktrh2hbhoyeysg',
                        retries: 1468071840,
                        size: 6244390385,
                        timesFailed: 5518105015,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateMessageDetail.id).toStrictEqual('958b0f58-f437-4ca5-85e7-fd3b52a3dbad');
            });
    });

    it(`/GraphQL bplusItSappiDeleteMessageDetailById - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiDeleteMessageDetailById`, () => 
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
                    id: '958b0f58-f437-4ca5-85e7-fd3b52a3dbad'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteMessageDetailById.id).toStrictEqual('958b0f58-f437-4ca5-85e7-fd3b52a3dbad');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});