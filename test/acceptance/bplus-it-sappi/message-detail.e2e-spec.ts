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
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'hkbxg5yjuz11xpdolc8jthvo3ii56rl5zkov9b26adyddip9hb',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: '24eb0mwh6iktatqwdrhc',
                scenario: 'fbpb4ye9le59v28crlcns48umsoaaat4ncp5i78y174njfgxv48tu1vye9jh',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 18:06:53',
                executionMonitoringStartAt: '2020-07-29 15:33:53',
                executionMonitoringEndAt: '2020-07-29 03:45:48',
                flowHash: 'ziplwk9osbe6bukgm30vpyq6odz3manilpv4vpyo',
                flowParty: '84cl8m9ps4qd88qikg5vchwq0dnus0c22ecz69xvpc1616gqt9pix07idl0azdthrqoeasfsc1y5a9fwx4rff665bmfnogulacxwdyfpshgc3h1x0rj3ybx6f8tlw3ykbbgfaka88v9np35stcaeuejpxbxraxwo',
                flowComponent: '9sgauon2bgvpgof737wnw4gty54xaggx6qeeaanpqmi3kgmfqxcfwcqipv6vj417rd4lwt0a86dlipc7x558aqzigc9n3lg0xuwzoggfqcmd8ehnsxqkb4123yecvluf00deyrfvw56eurgop00sxguskyz87u36',
                flowInterfaceName: 'hw7bnnqllnnhu8p5in0j7g5en5nc1uwlmkorzpviiki6eux6pdq3hs5npmg2bq4xsj6hmqoeert4f81e61ctqcp8hwezsidzi1z1azrp3cobusjpv4i6p6abzvm5r0srz29ffmkcaoubk4s9tw98yg6zgx142cf7',
                flowInterfaceNamespace: 'q3nqg1bgyncpg0ptaat8o52c68nvnmxf4d5dn82eg8vaehpcfuzizb4b01wtubssyqbouevfa2ne2v8ykjg60my3chwdosf0n8txn7x3ysrui1ojnjk70lqm7fhvewh1dpi6ey3fnprysbgd25lo2jaobn89egpf',
                status: 'DELIVERING',
                detail: 'Est voluptatem eos et. Commodi ea ut et dolore tenetur porro perferendis eveniet. Vero eaque unde labore harum corporis quia repudiandae vitae quas. Sit qui fugit sed est provident neque laboriosam vitae. Odio pariatur rem neque saepe. Quia qui velit quae cupiditate voluptatem consequatur consequatur dolorum aliquam.',
                example: '6lfjchxvoip02etlm6psan78vn36tetmqoxsuh8rk4cl8kh3h743o1tugv43w2ef9mab369i9dno0d057x66phyvmp1ow92oztg6semppsys8exa0vy9igv77jruun579j16tjczszr9x21a72hxzu7asxmgplom',
                startTimeAt: '2020-07-29 19:32:29',
                direction: 'OUTBOUND',
                errorCategory: '3p1q8y641ew9casj6t6zehhyop8gvpfdrgug8scrk8rnvwmekijbxlphdd2w5i7exfb4e63v38vg1hs5e9d825pbdl96xog7ja03q255971ys8ci5scuhralxwkpvghl18kp6amfs178h08jssbb1xz9v9grfbvk',
                errorCode: 'sgu8331p8vcraf7ajwvbeqvfmvbtdfwzvjnbg280ddwkabl344',
                errorLabel: 175396,
                node: 7148838214,
                protocol: '02it3foqoygjqg2d15br',
                qualityOfService: 'vs6uuzz3c84do796249i',
                receiverParty: 'wk65o6cplgt5g7dvzmqf264byly87pb1wwq1ew44z8l69eavzg8tq6arf9kv8dpkd7lrwautvx8w7iwdykuavrqyqto9w2f8elwem13yk1as4pa99gnws4io7j8jsa8a7a9c2hw90ytgvjjzcad2crbxqk5iyl8m',
                receiverComponent: 'imiwwi0jkrfd71b1pfudancz102r5p9zryco6rm3jykbd60iiuetuo7arsiynq4mrcwrcqu4ngpaguj9whpfvn353n9oh2nzvghvr641d29jggb4qnoxszjtslynk1xppwwtffcwcvqwkmpd6n0n2cst1o196ou5',
                receiverInterface: 'ft7x8n4g6sop9jeuh7y0ixg5n4tb65ru2ynwyp0r8poc7qu371ps68o4f5fdu1wksq7y6vahg1y09p2oek9lpewzhdriot29gtm12wggyptmyibcdkoe94pd2mn5cm274uejijv490seu0kdlcm0bsznueq108id',
                receiverInterfaceNamespace: 'a3gj68xuge5nhpyjbv9y1vbw2rht75eae5vgs3pw7p3ik5ezcba132gikas7nui5ez2wgkag6ji2lpjy1rn3g42vt0tpikwqifa8w3f3x7289cf34ch5i47avkjbv4tznb32kvrp2u3tvfkxpqktovsa4ysfyydi',
                retries: 5019821058,
                size: 2316746804,
                timesFailed: 1334557691,
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
                
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: '0mgs0a06mha5zp80v9igokuqda8px3jnlyi9jamliokqdniov8',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: 'lzlw7657tsxyhjmq75cm',
                scenario: '3k6a0l5818luan5fke9mtxm5pfh2cbbjvpe52tdawii4qwo25z8pzbfklyw4',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 16:58:02',
                executionMonitoringStartAt: '2020-07-29 16:16:15',
                executionMonitoringEndAt: '2020-07-29 03:25:02',
                flowHash: 'rj47r4hp0e2ap90xrwbr41xwfkxl2mk5r8q0zfh0',
                flowParty: '9biqjs58fe7yzd1q6nks2weh2c22tm1zrx3srpu98lfgfe5pq69g7gvelywv0wnzumqxhof9hfyrq9q6og6gx8d5otl877esqrpe90mw1qg5asthvbxx14k9f4er7dseastgkl63r0kt8tdxtrmz6o2dlywjmge0',
                flowComponent: 'q93onk7ngfarcw3zw0zbo4ncos8ccu06w538fyutx2x62mxly7hxpj22f7uwzt3i0vql0tiu4d1nlwnpt3zct28j4fbpgicnif5y7b4dv6ko3l53pr5kk9479ts0iru1z8fzhyl2wvlcwiz95nbn03ygcdier51x',
                flowInterfaceName: '9u3blyisjmfo8zwhaxfmzrzbj4jezingwwny362tn9gtp4aub9hl8frnmi7xcppgd6zg4fap991ltur4ph1ysu8lyzrw95fg6pzxwtjb9wfq2c1b4c9u71j8bly8a844m9obsdr27whv67obv3c0iieqj9ai4wk9',
                flowInterfaceNamespace: '84219183z1agcy3wgwsli9i0ngo4i9fbh5amk80cghv0n9zx65x8u0fkn5diif7rz10zeiojo69zux0b2ipnobsoik91j5zrfg3stbkvgs0tssv7kw4xxbdo335aegmubexrxikoz7orjn9uaptrcwanhoqw6fp4',
                status: 'CANCELLED',
                detail: 'Suscipit animi rerum alias molestiae. Impedit sunt sit. Quo mollitia consequatur modi totam eos. Corporis molestiae exercitationem dolores porro officiis voluptate quia voluptatum.',
                example: 'jxai0rgvpuiri5kstsij2kf842a2kk24r62bktak3qp40l2xps86avy5hn1mwpukr6onvzyk3j8imt02yvkbi90u5nkun94f8odrjreaad09sdvb9zn766lzq7zvvncqutaagr4wvx5j0inbwi11611j0af5pn2p',
                startTimeAt: '2020-07-29 17:49:13',
                direction: 'OUTBOUND',
                errorCategory: 'iey78q5a0ef9vfh9dakku5hr5fexqq61vyw68lhmbvzf6jros3bzf0brg8n8as0kzxe7cu1ticd11mcm8y0uysl92hlzjo8m755t6to8y2y8q5148wdnho0gbjnlmtehv1bm5qa3kbexnoejsbrux3w5nb953aq3',
                errorCode: 'zomjsgpqqr524crz3bf8wn65ghdqwtn673y0y0tsjdof1ccorc',
                errorLabel: 597252,
                node: 3741820176,
                protocol: '1ndcfs5krfe5saus2mdj',
                qualityOfService: 'l6g3jo63w1r20dsth4m6',
                receiverParty: 'smz0x91jhdo5tiuuqm6fxmkeu4l1sb9lhib17vgzljy0npmrlu9pizhcm3wqxow2889blaf6ru0bt17wjx4p1ud6yxlm4i7rne2oouevduoatln0ilzz5iczpaj65pwe95ypqgf1gobbbwxlzfwiwd5akhyaac4n',
                receiverComponent: '2133r31zz2llpcncy0ks30b611pd1fvwipuogbffn4iib27c943f45fvjntluzv8ui84lmxjdyor633agx061lbeorghf60l8hmkqduxmcojs9toovzgw0gkwct4fbbb53ohgtxtwv8i1miv94scf3m59zr2f8kd',
                receiverInterface: 'qi0hx13bppg1ls43pw0fb2mt5i2tmbpkfnwvsuus5jmc0gokm7iif97nbwz0mesyw8vviw02ytiafvev92sms8swm8hg8rflaql7nx8ledcc6oror6jsj33ygpdp32njzhiqx0yhxzzpb3b35ngnu3n8ibc2pgbe',
                receiverInterfaceNamespace: 'xc61vf8z5t0mi1cb8gnomcne2oeolvvuakglp0sh0ygthlbqbt3w9ze3pku9jk52qwinb5lqu4qyhxh8urek7z5mrsfvsa5w1rfxwq2z847xagjocb7vjmtdjo494b0v1pzqn9ztri63tm4hk3bsgnpmj6ucowrp',
                retries: 7827845227,
                size: 6156081322,
                timesFailed: 1709734250,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: null,
                tenantCode: '222rj7ndx8kmbtrfchq6ebow5q0mzxdgos67ga8875hxbbie0a',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: 'i3sonds523cmom20exb7',
                scenario: 'jb08gc25ijasmlc7ujyy2dmr4awy6efxw1t9ab4bx86xkwxhuwmfsd5enckv',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 08:10:17',
                executionMonitoringStartAt: '2020-07-29 04:38:37',
                executionMonitoringEndAt: '2020-07-29 15:46:28',
                flowHash: 'acowyey86bee866ig2nvoo92x5oxbgckn7ttznif',
                flowParty: 'vc4aiw9371k156q1v79jwczgir9xhad084eciztwxfxuxbuozrq7z41sauo6cculz9rfotlu9dk8pqpdxhboy3113ow3rrjhmbefoacd0wtm4jhekltxpxubxowlb7qagk0zq05xz7yf42yu439e35rnystjuedr',
                flowComponent: '4tmx7tg3tbs8v5lb1w43k2ow6xlhs6252p21mvl0lzpno1myjnj9w0phjvzx3sve5ynh92rrggl5kqyfgnzr2o00308esqz8aah0yehayez4i0o823ujysb0fenh6s62ujpy79n5xphoyqygb2mg2xbagis8ai1t',
                flowInterfaceName: 'scfe8qdnrflvcgiu2yryyk18af4tyyyqhgms347l1dheai8937zykkdh8dkjfp72t9e9gihhs7cxy3z703e7fi7nfpwc5h6lvbcv4n7wlmyto5vj5qhldqgp04ggpz6s9t8nh7y8b9eyn823q5r6s4jcdc1ueilh',
                flowInterfaceNamespace: 'oc251dkutuk0ygjowdcoyt8257hsok67rb8yzswo9gp6m1h41bgh9yi5rcxs9na8vj9x4lkibvf92sp5j5oiyz1yfrk3da9q9oaiu0u2a09rc6qu9iect8dln8lpygig3aj5yfe495wh2578emltlpzz1kwb7m2x',
                status: 'ERROR',
                detail: 'Et qui quos voluptatem enim doloremque ab iste laborum. Consequatur vero et corporis voluptas omnis eum. Qui quia architecto in. Odio vero atque laudantium autem qui debitis. Sunt enim eum facere laboriosam et vel laudantium suscipit.',
                example: 'cwzmpnhzsizqmukxzwxgzo8kjsm706hu4al2pu6bo6435m7mkkutjgsh0namtq36plc57tf0ilxupp4najytepxhs9suyn9bywi7xb46t99gwpv4wyfatiisfy6ye043q2sshi4234m27jlsblco8g1wzdwojojj',
                startTimeAt: '2020-07-29 07:28:05',
                direction: 'OUTBOUND',
                errorCategory: '0n6uh8yx7tos0iv062j2p8ecd5qhznr78ntayyf30a8lwvmj6db5g1ratqyuyyohx8n9wa1xmpduru47ep0jr2aycefrgoc1x5i55g8o2t9gdyys32f2aazqv1ue6ep4gw6t8ul06ossdt6f2mtvgirp4gq5jhyr',
                errorCode: '6m3wk99yr6e5uvcojoo7u9csdhch0jaaagw5e0djvvuz8oos1x',
                errorLabel: 503160,
                node: 9084645321,
                protocol: '911c3s25lzrwvric17tl',
                qualityOfService: 'sn2z3mkvjeplwtcolzdw',
                receiverParty: 'op1533ufvon8f76fhbp4rwdbieuw8cfjnj21dipnqpegf7f90d8garu81x4mensnumtpa1f632i4lg0ukua6stv0sv4v04b1yrxqdpjqpchbohfa3xxl1drb66mwj3m9p1q16k18p0ta53fd8mjmfq8l1swu7pzz',
                receiverComponent: 'v9dqp9pphribstjmhzgwft35d4r897kpllso5dzfzaajyromv8mfh8nelp4jyqfcqw8mtvql06ape4ovu4agqh0a1b0q559lq3wz5fpdnvoes0pg5hfhmc2bwmznw0vlavd1s6h5gy2sm888poahxzgigvxeix9q',
                receiverInterface: 'gd9js8a94aom1k0afex7nezd0vv00f7seazm4wyo8jq05b1zbzbbmsunw4vrkm2oapy8t6cbhhoyoo6x6sx6o1nczj6gu51o3qgcahzf3dgmnhz8r36x7o973wg933zp2j61c9f7c5x59anrc5fundg1v86jqica',
                receiverInterfaceNamespace: 'c9kx2662zw4ebzhdc3hszmza17x31m6b7la5y92f5vheazyway268chcbcnma1twttueu3ey1epqt6albge5xcszc4htk3x56s027b2lo3trenmqlr6a9oa57u6b8s9gs1bonv5ygeenhrc9exhxfnvedjkixm8g',
                retries: 9425829678,
                size: 4451847871,
                timesFailed: 5017635821,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                
                tenantCode: 'l682wxxokg9qqr6ccq7non3r5jyw9d5jmdl3dwd7is1mf4qdot',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: 'nrylfgnscrsq6ss2om4t',
                scenario: 'bm8v6hm7du1jf5c0nsg23x44fxfeoe28f9cmev1o1kk1l1qj0svl2razdxxd',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 08:28:00',
                executionMonitoringStartAt: '2020-07-29 14:21:23',
                executionMonitoringEndAt: '2020-07-30 02:05:59',
                flowHash: 'tzu3l1txd4iaz1j248z35xgnsllj9nxw9sl9kc69',
                flowParty: 'z7hwum3ge2mgpvnlxsxrw0bca3u9tcx7lblfadwx4bu6s083zlhkiph38nj12ep4d1cgqw0m6wksklnf8lvvayo8tb44auriipefpizw22hwnwz0rgzmzzi23tlnngo09swn70ifkdwmw716ll7dopri7w1yfl8w',
                flowComponent: '9f3qo4hihdffn02xdr1765ccsi3b6y0vxaxkbkgxilz0ml123phvckzai367uicki7tzhxsq3ao2sks17ipxzirv6urem73uhs83motn0quwrpdhu1hu4g1aljpj27tdzqftgng7oe7mdowd9hts2tzuxmdnazsk',
                flowInterfaceName: 'kjsutugfd8neamjmln2507u60ct5332rztejs13nc11j3tjq9bjgasyawtlpzo15na1jj4z812v7kfeied1wujxvwhel1hjizykhoep8ofw7q3g7wnrl4523n9scuyctwtm22u3wvx3bfr0vbeyzdtig6g7m752g',
                flowInterfaceNamespace: 'mlf63w35nmtsra97rda1q1cpetyfd22b6dvdav1891c48hoa5da8ggdgf1govd2c9x48v3hpfuyxkjr4jixqe4a5te5ybkfpjylr2ulm34x1yye2bqtyilntgss1s5y4da9x0cf8mtt9webwd440z7scovfin1m9',
                status: 'TO_BE_DELIVERED',
                detail: 'Dolorem molestiae ut sed asperiores ab soluta. Illum a mollitia inventore quia qui et similique soluta. Corrupti consequatur et iure corporis quasi iusto. Rem provident vitae voluptatem esse quis ipsam. Et ipsum aut eum. Voluptatem neque minima voluptatem assumenda.',
                example: '2l7mii7raq4wir9o7ktddpdm8cky5ysfxr8xedy453yxe03i0w70hits4hiu9xutrkr242u8c2okaay92nbpaz8294sr6woztg7ep3zh2pw9c18vjfs2m9g4vkt7mh5eht9avhoqlpvkzibgf9nw1vb08kop1swv',
                startTimeAt: '2020-07-29 15:18:56',
                direction: 'INBOUND',
                errorCategory: 'v7a8hah1dlig2j7cvp91u1a5a4jgg6dw0ch7gzeuc9xjfm9t7z4352rp3fb6ng7dcix6l41mzlfiqrkdqvh12gxixx5fsz1o4mvx8v4sn50winvpt0vapikivyasji2h936ps83a6kjonvan62ejb2siqgce0a0d',
                errorCode: '9wkjzp4y93mfk57ds15jfwsiijco0uy7eggexdp66xr8okwn5e',
                errorLabel: 508727,
                node: 7995304939,
                protocol: '3wh43s38zkqw5krrxy9l',
                qualityOfService: '020s8gtp40z7tcdpvh3i',
                receiverParty: 'fbli5mktc1jv1zme9m9dzhmmj101fn3myj8utuxsy5z8uolhuiogwvkaqva4ryxfmepsd0kr2nf5tr8xgv42dn5dzlckxkdrdjrf5ma8nnsjyhszg6fr18gr146mfjlrmyipb4a4u6emhjzw0qzp9yze5dyxj27n',
                receiverComponent: '15vhhmlx6vqr2waavb8us1omag75p9z3p456gnykokob3h91tgjbu4ahhhd8nllzwz9tr4bpd0iltupea4m7jvwvte8kw6lrd9hklpwkyfzk2gmo29p40mcmungun0jh3aq5hp11z465l94xly17skhzk7b0tl3i',
                receiverInterface: 'qtl6on547ki2yqljyg5spj9a8o3ygool3ovgsg08mltmsfxdyev8892pgcv6pqv1mutcbn8a6a4u24uq2dd7971mu1c46mgumqcn4m5x12eo3rmsj1yo4o6rd0cpkiz1fwgdvcvmgfmomtxf4j0g7ioqtby23aco',
                receiverInterfaceNamespace: '6rxik8e6zedldhs5staptnm3zvqhmd7tco88zzuwevd5rw2i1tcqjhriz3fhuj7pdzitcqs17zs2luxqp9t48xcwpq8gc61ye1cks74dk1aerkx300a6rrvnnatlsj88661s8wdrx3pf4g2h00ornsg4cfpk6ov4',
                retries: 5320517068,
                size: 7056527802,
                timesFailed: 7573050833,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: null,
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: '4sp5hu50noyokwvznn2v',
                scenario: 'kyw6ku40074xp0q8rx784t26socszaaimljwocfx58ymw4saflut25iddsoz',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 13:09:11',
                executionMonitoringStartAt: '2020-07-30 00:12:51',
                executionMonitoringEndAt: '2020-07-29 06:09:46',
                flowHash: 't0b6hij75sptb233cnwij4in6342gofl8qwzdrkn',
                flowParty: 'evcecxk8suq3lmzzv4i3adbr0da08xod06wr1f1naqx55ratp2h1kdzlmerxag66jlimyh5n0sac4pbxl4gxufrkv6cwhgrebg20kb1me30s72zrrc5dbgqtyg0wj0sffuz97bb2qomblke0jo3orpkrra465oqi',
                flowComponent: 'wjila3lmdbbdqnktek2765ah4d7vqysl9khwei1qaihtguz36b6yi2k37irz8hyln522frglexob28v7fjhb8uvh4ssm8nbypmd96s36nls0h7ad9v5hvbuykln2tsorksbhs7ig8lbnyo4859n1swn5olxwmd3x',
                flowInterfaceName: 'ur2kuw7ilo4ih6yxfzqvnk1frehlfwvdoctzywwlecyp3f3zmy4hyjt1dsso34spdw7u5roosakvu3pj3hqbny1o22ck5ixi3bmnkboxhmmdo1s2prze2wvlim7knai6j9tlatfxrf44f69nyrimog3hn17ixbnc',
                flowInterfaceNamespace: '3o065jyg1ihbapmbu6cosaylz29n3c8cry3rmwq8h7ptlok9ztpxwsordeeldyyh9ib3snv67ggok2rftzithohb3qohrznxcgliuldvfnznhgwbcyukiehgcrf331p4zuza7x48q6dmtu72j8r35z60d9yzuhms',
                status: 'HOLDING',
                detail: 'Quibusdam labore repellat quia quis fugit quia molestiae sapiente. Harum voluptatem rerum. Alias quidem aliquid pariatur dolor sunt et libero. Aliquid enim sed reiciendis et eum debitis illo. Qui et vel.',
                example: '6bn0c2m2k8ht0kkwu211zxhnxbg1oowegertw64id12w8sejbu4pd5noescvzqgyax0rhshm88324s394zz7iy1uewm2tq97uweakak5sej3xh3dtxhmgso8r7qdg42qq2v0en1nqt3968b4yze592eed78184rt',
                startTimeAt: '2020-07-29 05:01:25',
                direction: 'INBOUND',
                errorCategory: '6itt8vvimius0cb9tsv7nj71bv9o8vsqiumtdw2s9aqzxbaycms740nx52qy0wxuvr180z42k7jgyrzh731zxyhezxjfuockf8pl6desl86ke00nsfn6dz3u9thzipgvnmd5bmhouk4hji7ltspe63asbxzr0vn5',
                errorCode: 'hsztwmk3ncwycoo7x9owwtmmpmxik83st8ey0wtfv1u7lfqeo5',
                errorLabel: 497843,
                node: 3529130537,
                protocol: '66vol4sxpezje4dsjsrr',
                qualityOfService: 'jb7ebx3jka1s74f3ltaj',
                receiverParty: 'n3hxbzn8q5hf0x7yq3q7stt61gar1z3mhpnegbvyn3w1gol3oapks9nsml40tkzs4pg38p8jlt61k0uymk3ycruriht3beqwt36gzvyqys4r15s6fd67qdng4ln9rzwwjlq3f0twbqyhu3w7vpv4k1uj1dl8uwsk',
                receiverComponent: '2y0vb028rdzqke6b8voeqk3q4w4q445457up6omh00an9jb932piyx47fz74w17yg67ve6lhvqyls9h2yu8zxbggp701c9ucfqpycw1hmqk6sk9je0uab9wqa4af08uedmevuzn4f8rg42iqyx7a8nn2ygdj0los',
                receiverInterface: 'wemk5nqdgqowh1u0m02il6o997u49ultpjv0qv3nvwo3q06py9t4k8f3od71tcfnchd6am5igz67i1qqkbfqlinn1jr4b1n2wvrcx5yarfzt4z1cpvhh8rwto6aegx1yquxpvzy3a282jj0zbdv12r8q74oz7ijw',
                receiverInterfaceNamespace: 'xyoqxryxs6jt8x1yifluxv0df1t4uffqjqwlg66dhbbht8bsv2v4j8zmr5yokj2onc8uzv2rvl8gasqbqun381jk00sjnk5z6i6muhlkoqt7rv6dz63qde4vypymd5hoj3tjkzwozsv940ep5nau047v4qb1tzux',
                retries: 3448693163,
                size: 6399567422,
                timesFailed: 9131055723,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: '9z6jd4v5ibz0qxzz7nak',
                scenario: '20b0p7tw2k9g5con0h345jy2hmmg4ljr94m8va71f27oqax7ntjwh1nr0zly',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 07:31:28',
                executionMonitoringStartAt: '2020-07-29 17:13:03',
                executionMonitoringEndAt: '2020-07-29 13:39:11',
                flowHash: 'ukszs4peb0upat2p8mwu3ngta538knkwu0rl1u0r',
                flowParty: 'f85kto3ne0o2kdvn6lruavhtzf7yi7lxcd0ouhni6rpolvg0n3px8wrpjjjozt3qljhx3qqvlbaki4l8o6ipn5p1encsr999r6yzg48jl6f1rbpdoaqh2y5srkag4noqnyro888upt7381jh17ndm5ba9dec41n1',
                flowComponent: '52g931hy9jx0ywu0gy9uqwvzpr3aw2cl5v2rg6xgb8ylnr8c8pnfzkwmwgpdw2po7pugqcncv57k0usemcguf0dzjhwlmnkwgiv2t48ka9ufo8r0vr2agim3smrb4mch5qiop6ymjbs37cunh4wuinsko9krpiq2',
                flowInterfaceName: '0wroj6esj6rjnj5qbgjgg4cdfu8hg3x83d5rwfqa97fxr0900y9cpijaylpm3afnko47nirrnxf9597jwa3drcaqps0spw16ty0shfkrmye5i3qfnfesd4ytpeduywcbkewzzzppjate8q6cpks7fqc90gj05lzl',
                flowInterfaceNamespace: 'wydgvn1hzzwfcb8v37wbq8liots0on132mrr6xn9612i5s3nn9s1mxd5nnprvwpytg00rp94ngorea7wvkh4rvi23zdhx7jhv99ytg9hu51ww31rdrj92tggz0gada0o6iocuaq7emrefa22qv0s3oieu9xolb5g',
                status: 'WAITING',
                detail: 'Maxime qui officiis. Eligendi eius quia ducimus id aut error laudantium. Inventore et assumenda consequatur quos. Illum consequatur facere voluptatem.',
                example: 'sma0f126by25sw9sn2tccbc88kx1zh39uvti5dx32v30kex18a23iooau5rilyqmueqg1cfxgwrrh1okts3apy7pxqcrwbhhmmswm94w0hhzedwx1fnrzzbw1bx8kdg91xpmqwymrvtn2ah9okbx256eiwr79x2t',
                startTimeAt: '2020-07-29 18:35:42',
                direction: 'OUTBOUND',
                errorCategory: 'j79qrf3p81noqxz9o0t7a5ylwyy9nxkl5l3k02nvph9oimoo62t8z4sjnntad39uzmtwl52zobt0tfomorpxzoq7qhmpax3zmgitpfvauxb6ibptqs4xn0jmza5q88oprkgu538jn39aimjmvi5qj4fnx2nq0inm',
                errorCode: '2xu7oz6yl7aa8l40fpk87m7vh2hicna6y763n6xbjd22knqpeh',
                errorLabel: 691236,
                node: 4436901374,
                protocol: 'uld47c6d69wxaz4kajk1',
                qualityOfService: '8jco21vgli78b2sqmjnq',
                receiverParty: '2n5lhh577loecm9j9fuauymrlwrc21f8ev48ifkb3m22lqkzq3by3u78inx1ls0porguzw0klk3v1konua386b8zf4lpo3t9pnkdmhet9p2cd1wkfgn7yxbngkv4ehvhq3guv0zihjwoqsqbqvgirthqtimmtf3p',
                receiverComponent: 'xrmnvzk3u8s9cmapck99jbdeksr3k9shdoxpg32sjjrdxfperb8nwknlvg775h6xzu8cwc29ym7m7papij6cxw4o5eazcvwl1rcwdelomgsgiswopy83ym5zipv2vkprxx7g6jtxa68mmvcebdonmbcq1ckmrgkp',
                receiverInterface: '2xmava0p2c3axg69b0bzdfaurapqjiwa8h6e849rrmfizc4zc1jpg4oppn97hpmq9pcui2ad6n3tjquw07i9z19hpb3wlvaluis4iyv5kf28ku1ybh27nstga6kne1bus919j2ssf864ztd2r0u19n3pc764z7y6',
                receiverInterfaceNamespace: '6vlka52t6xikmykwk2i41hh6kj8jl0ynbsep6t6mnw8qcrdfy3gj2pgjqjib2av1v7y6e9f4szh044oy08epo8060zq8uckbxsn9kr8y4yc2urbvwny4u5s3265zaoobf2bs84gydpu6l5zeyat274x51sm9bzil',
                retries: 8416108483,
                size: 4658790433,
                timesFailed: 7790119928,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: '66sihe5dm6n80r0964lb636ju0a5j8fpjcvnpp8ngw4zus931o',
                systemId: null,
                systemName: 'upq6qfnxyv99ornfhp57',
                scenario: 'x625sn8rpwbgeweltbbz8vzmsjzq71nb2u2bwke9juhxlrw9izmc9pi6nx4f',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 19:18:25',
                executionMonitoringStartAt: '2020-07-30 02:07:41',
                executionMonitoringEndAt: '2020-07-29 12:28:36',
                flowHash: 'of43n5i2gtb8epveirjvinhj3ovrs5mgia6vch1b',
                flowParty: 'iur5mrig4j16to3tgvrk9ip6e331q77pftrtfaqz2fckgsh75alxwyfgx5fe2ix9kgqn3dqff1c639f3ryp4fh3j7z44c7ewn5rwxq0agjrgq7rx91kg34bnr7fm6kdnaeqypip5nv75kmcw1ejr2t55m5p7bs3k',
                flowComponent: 'prrmip668h4hvsm42n544hs3q952tpp4svu30fqkb2naspvwhkqq4xo8dwkce4nzb4jymfts7mitr6zyrkoxbjxvu86xklpxawvgnzb566nlhilm3i5oupf66gnigj1ee355zp25bdf7bwprciga5c975irxsmbo',
                flowInterfaceName: 'iv4fytcf0qh0zk0kji66zyvs8tapzerfqzky0btzst3cl5n4nz9mudg5qiddhz0jucap6ae20xrcxdsyjegpy6440udx5bgjikrenjp875i1twhho74of6y2fx88nbww5pwzm7whrqh3mq8dlfy1s8x3v4hzxufp',
                flowInterfaceNamespace: 'dlx9crzb8fti09ougd0ktgsypdcu1a06n7js7j4vdh2c602gt4i0amsskvo0xydftobfnplly66t7owhfkacal60eu7r8qkw40jzycffxgb73t3hsxv7dl9gfyk2ldar8spxjxkvec659rt76lp5atp7gegdc1eo',
                status: 'HOLDING',
                detail: 'Sed ut cumque. Laborum magni rerum voluptatem beatae in cupiditate. Voluptas cumque dignissimos quisquam.',
                example: 'pzr4v5dsvxmwwylx875r58ua17tkg599mj6boq21cr0wc4h8oewftgruftpi8r22nwnf0ekbxje3mo5wb9pxbrhp9hkadi9u7eqqi4klz6c8xlze0gsa8c1vog1z77j3m41ix8zdc08kkpjacwelonw3kh4dxi9a',
                startTimeAt: '2020-07-29 20:34:34',
                direction: 'INBOUND',
                errorCategory: 'eyl37qa1s2q9cuake00gl6u47iebvchdekuc65q3ia0x5mqiruod5k9dwesraeqdq157jg5yn4jiaysaqmc42jykcru1kxclhe7dirmq4gh8nsehfvfvj1qwj6khuz5l2ntwpnuk9pwm68ybm5if1q5t81cwo8uz',
                errorCode: 'axeq1vouu75spyfm50rlxshp0pcoqk2hux8jma0k428h8d01kp',
                errorLabel: 447692,
                node: 7539572690,
                protocol: '61xl5zoau3bk0mbkc1l3',
                qualityOfService: '4qfncrqtsal5qz0qt80p',
                receiverParty: 'hx4c3pc6heih5fa0lhvw77wwp4yr57gyoipaxbqvgrcac9efo8xf5qj8phlxjmkz3qdya5u04eayos3nyymrx8ivr31wrhvl7iu39lv2v5ghyhq9wtvuldvrhyl339d0eoi889mcnpwmseqg8847bx2pfz9qinyz',
                receiverComponent: 'rmrcnc7fi2mmx4zr0tavvlz3an2p8yw5d3cnec6h37ycmst8ii1mhmjjnns12ft7jfwotp7gcmmqnlfln8czdhykl7wc69gete2f1pxfu378hvte07z2grac5yrc0ohz5hpor4alk9vinfvjnqp2t0o8dun2fjg1',
                receiverInterface: 'r0xkc37yepmjyvxw49ysjkmjsq4ohjnlm4zttnvts3jwmx86u6ece7ez49zubd8cz8tw73xmhqf4zpkkz9dv4m7fmwd148fshm1hvwf062q1m687733dqzelvithifvxyikxi2tpk1wyty8gy881o94w2abkzire',
                receiverInterfaceNamespace: 'twutddy5lzm2fiobq80x6ehdbw08ny6bqhfmdvq4spfmm3unbuv86gfj69ntdgwqhnev0xtoowuk2wvlei5vzs5ohc5mkiw7n9axfcq8j5mqcf4gpq275wzipeogvyribvakzsprtjtagq4hlocn520oc2sad591',
                retries: 4546431494,
                size: 4118777718,
                timesFailed: 7290141227,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'enjchz2vupm2upan9mw04aqzektgnw6k8umbx6l102wgy0stn4',
                
                systemName: '59e5y0slrm8yefn3atsm',
                scenario: 'qc2l6zkda5vs8yvrfekiyc25pi85wbuuk0rxvbodxdp0178w0qfb32o5n01i',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 18:55:19',
                executionMonitoringStartAt: '2020-07-29 07:54:04',
                executionMonitoringEndAt: '2020-07-30 00:19:54',
                flowHash: 'j4ziqjzto3g74g4h71cxlumbtt1h4k2chqo0suas',
                flowParty: 'jy6crh5ai3vbbr7j3r3owbsn9ippwzamlgr8l1term1n2zfsu9enm6ny3yhymx43spvjqp19wo0pa4w6z6ej4rod3j3v5zsklkddfbcyhf4bfn4mefsa1beyamdszu4kvtj75auz6w5hhxlsfaxo1pq84ff3h4ql',
                flowComponent: 'mlw99sjmqxry5l5natm8vvnxp1o89g7mkfex6m79x7rd7kfry4ektpcyu35v7a4bg36dt4e3hjaf1cocddw07fy9l7i5k1g11izecknqijueu35gliqj7hd501g7bisrbuupdblnbh2ri91j61a64nzep6jzbcye',
                flowInterfaceName: '0u5b0xv61enll24b0q41ihdlqe31lv4sdqud2sjtlynrbilr6xn4qzl35ehelop5335cy30n3w8qxqdi918xlab0822mbd34pi2ct8ck5yp7t6tn80m7rnpq3iwsnnox0iuwz3l9qx56op0ljz2sk3jza3svtsqp',
                flowInterfaceNamespace: 'goc3aob3edwxuavu0v2ueect0xs3zky6ziztvvflpolynkldvnta6zz0yg4ymq0zdv49v3xbhbws2i8b3pgvza36ivlrylgkey0xwxkqh5z8fk7okmalg4fm28tyxvv6zo83t9b5v2cp59f7fa9uumqrixd2lb2z',
                status: 'TO_BE_DELIVERED',
                detail: 'Rerum sit optio rerum optio atque consequatur qui voluptas. Porro est fugit itaque eligendi illum laborum voluptatum. Facere sint harum quis.',
                example: 'wvr6ss7qkm4o71wpe2s81kw14it0ndstcedug3hywg9wv0q0x3hed5b3j6uvo1gnl6q8dxk1g6xfzqxuzwfyi9jog43d0t558yzpafxq6smf412n1nkib9vqb6412eave0wc1ime6o53lzv7qt6fvxpik5lsdmbq',
                startTimeAt: '2020-07-30 01:30:29',
                direction: 'OUTBOUND',
                errorCategory: 'wld0wir3kmow7cue9skyk2atpoxbrcs5a1h20guuu25ga1sbu7psf6433esl60wo2qrtwodsvx5n15pnvssf2rpxym3yb7memmpichcnwxevawhhtvlsqebt93bz3djar3ihj4vdr82huzms28alkhgqezsr3ex1',
                errorCode: 'xds6jak24uzaqunxyo9d2t15258eelj1odyxhi6o27w07ox2ra',
                errorLabel: 136930,
                node: 2921590065,
                protocol: 'aqpgfe186u8zf6uq6uby',
                qualityOfService: 'fd8tjbwwjqul21hwn7el',
                receiverParty: 'v1jqtlg0ozenu5ncet4znon7zy1r77xyy19oopi6bt99w85tcwx9cdc6cao19w6m3vyra94pca8gr89o45cjftk3osvbjj9xv47nh8dnlfjcluagfjmu5bn2nlf4sd6ba8ih84ydmqwbswijht3ef3syl6th266g',
                receiverComponent: 'cmr6hs3dtr3ky2ckkkz5kwb6oum2uj3uoimo1dk8zl8pnba0vuybflb7fa1va5p9locn8x1o9nls2cujrm8dgnzl8nlb150o3z26rvnopzlzd401j42umk5818zy2xoky2i31wlo9h1909b51e2yvyn9qaoh5ylo',
                receiverInterface: 'xy11penrdirn2vrn0125vnljb93sak0uitotlylfufin0ivk7q76btt3ddvch15tdvb56chvan4co2wkcdtxe6jrzqbyupipf49gircxoeyoh0lgxa65b4iwffarvs55q5pqynddlr5mxoyptxrrfhmh8cxw2ln3',
                receiverInterfaceNamespace: 'bc20qf90xhbp2e81ansaq9eoaid2yr5obissm9icz3csnaoksnxwo0lr6v1u7l15q3rikcv7nuyiau6uthy69kos2u3kex2hu76t3sya6fmeryfj249w9ewd1ktzfe4h9d8rkakjkenwrk06c9qhsyxm13barltp',
                retries: 6406735400,
                size: 7221846355,
                timesFailed: 7398469280,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'bzb7rt42jxk0zxx4hq6vptpzu3ugebmcox6fhpgyzed5abx5x3',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: null,
                scenario: 'mxrhszojp2d1btcxracavbui9u4pfogoih44b6ke0n4ghvej89bxe3bk6o0z',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 00:07:16',
                executionMonitoringStartAt: '2020-07-29 15:57:13',
                executionMonitoringEndAt: '2020-07-29 14:15:43',
                flowHash: 'fssa7r5f73cctu8uw81xfg5whgr2wnapenq44f8m',
                flowParty: '8ond2ea2oe57f634su1wum7trub16r38e65rxd7tgx7zlg92qtqccmd24mw56bk3kp2e79kpqy7m07lk36lxvy9apz08s5jy38kpxof44w5aqyee8vl5w9hpdjy69zh2bpaetjo6pouuln6n72zlog5lsobtrfki',
                flowComponent: 'oa7z3zdu0lsu4z3q7h9rcbpb267yo8whdivv5e2plcu1s3t3y7cojp2b5m2rteoh6c81p94xbdioy0osdyqscxf9la1qwyhl929jjl086qhasb4scgcyveivs40755wti1urk4lzyc8rqofh2nl61z0acvb7cf2j',
                flowInterfaceName: '3lmcpbt766rr13jyju24vvji23riepn22rwun2ssgf663my3k8283iammgi5yx93iy7or4ykskaphrc09c8bz6lcy04dr7lfs7axncdl4edijzcfe9357vvbs0ltvx5koaqng1792itqevt5q6hjqlzaqiig3g8v',
                flowInterfaceNamespace: '0hvgkf9degm3j4ki6nc04nhxwfnz6385c0hi90ang92gn554wweenfeed3hgfizx2nfzmfnreqp3hk5doqe7s9h00mvuvj367y7grua7bdxahlcyhzmqayomtp9pfu1fbzjexker0jiey8w7ldsr5xpusa6oh554',
                status: 'TO_BE_DELIVERED',
                detail: 'Nihil totam in dolores assumenda blanditiis at in. Autem molestiae nostrum rerum. Distinctio assumenda recusandae optio commodi nobis nihil aut.',
                example: 'txens0oua7knzfwukh3vjvx81f15izd8u5vyglx7yx46s64esy4ot9n8ecu56p5znlw8ohsw3l184yx12amq00m0gzb9ws0hhnxbl4eejwcklyqkiullkymymqfsg98ii9hlee2kbmwumswf2vuig93rlohs1e3c',
                startTimeAt: '2020-07-29 10:21:21',
                direction: 'OUTBOUND',
                errorCategory: '4movosc6p3u6mihta1rf7yi7wbhwbjswuj11s69r1vb2ivw8har0bmv0tmsizg4mzk31neqs6qxeqbeplz2vj7j1q36bzwemdbxjjy8uelssn1nhoi66xnvetgiwhxwf4voe9nbcurzwtknum774xjmwan045k5v',
                errorCode: 'sijmvfr1v9g6ts69zadxmo31uun2xezlw5u5hsnv49m7zb3w3a',
                errorLabel: 122542,
                node: 3790114748,
                protocol: 'dhqdyvi2thjznn8af5eu',
                qualityOfService: 'peib4hfbrr5ebzosvv2e',
                receiverParty: '48szqwejgg1z82sure25pqmd9mp7k1qsrjxgx242yzf58x6s1ujprmjpkzaijmjzs077kckywkklrxflyd2ukhsc4dr6fa0kzazy8295t440ukwjkvmhde4hbdcaok7d0u4jcyifq3wmwt324ajmz683cc0x2l6m',
                receiverComponent: 'uc0smlpal4zl1ybklawsxb1kbwfr4j43oq34y3uwrf87dhogj78bjaan2vjcnev0ksnf36mmn03fg3cgncrdp42ghtrgfmaxiv052w6e2xrm0gldm1sudjgz80c9firv3lsqajvkb78plri7uqki760a0lskrflp',
                receiverInterface: 'fldgqlv7lcy7p61vkc44930gzfhh5nc8y21oroe1ldejhphxwejvozjlanphq4cid2wktjc5l7wmafg0s5h7rra2egm29oi167tdphd4j84g5yfabulnz8torpthv45e96empxz5w1qrtnwetuwuwcsac4glaus7',
                receiverInterfaceNamespace: 'm27ja2ycs0afuiqltbqrjfk6881ynfp4vhhijn4dg3syk5h1odhkdyznl5pf60qpejqcwcctlv2dqigzyi8h7cyoquehw8a4oleqdhpupnoue032ygie1nqmeqn9jcg510pdhwaguga7wchu7y1cy8dwgww7s6ld',
                retries: 4557713335,
                size: 6266781060,
                timesFailed: 6259138532,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'oghtd7uczp6pph11c9n98hco6wymn7wv4pydad85rbkffquw5b',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                
                scenario: '03ybdy114ubsiljhaaif2aaa74u8jbg9qio92gksrdj0rizu3tn2fzqmfr3a',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 16:01:40',
                executionMonitoringStartAt: '2020-07-29 09:32:02',
                executionMonitoringEndAt: '2020-07-29 17:35:13',
                flowHash: 'hyhn6n6v9qiia32v6r4i1dgnuvp6i7nycaspx1ai',
                flowParty: 'hzw4o12k9z8ddh8v6g3dqnfcqh5flknyk0qlcyaivvuj9l7vis2vxffcbkwy1okzfk34hfaq4wwwr1bmt3kwi537qlod5wlv6xx10bbd9y42xb0ifuoswjtu7flrrb2d5pb9gjladutz2exykemcel8vfvahheow',
                flowComponent: 'loq3iz8ftsmh7bah9g218zcp0bawdzif13pcwj14xvzgohx6li47ov2yyimog2nkb7c67l01jwbcpu7017zk5de8k01ogvdfo223oudj60s78x9i6r82ih50qxi4vvfrjcel51steuxi37csuk8jrwvjtsgt0afb',
                flowInterfaceName: 'pywzc54h56gcr6bh0c5tzoixtp2nal1lyar7tgzlevg1f6f5x0bpuuv3m153terslj46z1huur1zzu463ym3hqxe03zm97ek8u9ho15axaq61n5e3at6ybicxfsj7i3lh2d5u8qgls09n2kl3kupeu6jtxh8f48b',
                flowInterfaceNamespace: '8he9xi73a8kx9tpn6t0oocd9fuuwwugtnbhgzgq0adp24u0ah6agp6bs3f018z78zqzhoua0zm4abblkwfjbq3vvptbgcxccejc3p2ko811g3zcvo6bbq9mp38j2ii07bvtf17g2qbvic5y3eymthwpz1150qvft',
                status: 'DELIVERING',
                detail: 'Facere et est vero fugiat quis voluptatum officiis qui. Maiores rerum non cupiditate animi unde vel iste non. Aspernatur beatae ab ea quo rerum ipsa laudantium et. Reprehenderit dolores ea nemo exercitationem aut aut consequatur voluptatem dolorum. Veniam quae incidunt quo cupiditate officia.',
                example: 'mk57hzwrdqu1ngpfstpw5xrhy9h61p98jua7lmpdwxt8edexzt5vf1fuawxk1vk6852yaioljcq5wsbvs9w863bp2udtc581drzna6qovxxr1eumutpe79uw6kjuvdqku6x37n04qk4bugkq7n4ecdfom9julcj0',
                startTimeAt: '2020-07-29 13:35:28',
                direction: 'INBOUND',
                errorCategory: '83s2ln99cob8e6t67zap2vuyqooh5m1cbbr8at84irxbu26w7vurhobimm9clb6w6aqv0b769uawplab57hgz2y66r6jwk5aaq9alfrvzta6saw1d1w9pxak17946ahnw6izo18trbiy4zzelyti51nlwla1zs86',
                errorCode: '2ascpc8q3lduhqkl32v7b8qst5nzduey7ys3xf2g9zni8swkwq',
                errorLabel: 395956,
                node: 1917392047,
                protocol: 'pizugrecxo8s3mq55i6a',
                qualityOfService: 'gf5147usbsscp6wttv7q',
                receiverParty: '7w5p56fdztuicjov6e2cd2vopwai5yyw75mjsxbgsmfb4aio3ky4gnq36jiz41yuatdustgk8cu6305rexesomwdamazsym698wyia9sgqw0r80op1gq4cnr5y84sloyqdspv0fhafeei2mqg0zuadl6daptik95',
                receiverComponent: 'gz8y45ei93e5tuosfu47iqgss0qvwobqj0f7kjax9ahjco3kwnyd4r5s4grkouesvpl0kt52uzuq1ymhw79b7cm5f451vwv4uujj1ey54g0pyjjbb6lx0otklvkaplykszb2adut9gzr7e3ejuyin5qs3jupifug',
                receiverInterface: 'au38ob1g3uk170gdwftmlyx128gagl7txy45yqhbfsge22azu4ru1zlxeqpfuvusqmzt8c1k8poi99jdxve96nazfumd6wxddcp7c4mqfx1lig111ip3n4dwr9m3pjda58ez6q82i64admg70lcttivae8tnwth9',
                receiverInterfaceNamespace: 'pcg3pnxh5d4ndz64a9d3o51bbsabbykwi5l91jp7llybwl9mvcl8953166b9l56wlwwlfgsvsxz757ii4qa34zccsv75ioi0bn7sp8dezj7xximgm6ffvtfqk6upf45yjjesb1ecq3li63l8831as3793i8v0hva',
                retries: 3425425097,
                size: 8925639836,
                timesFailed: 5976137329,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'anjwr6emchoe5646ycs6hwapafi1zfqz8k752gktnvgna61hmm',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: '9rwekrzx49pho1yvt2l4',
                scenario: '98mvy0hz6fwrssk5o78b09dn32qllmvqp63s76vrpbcw2091jawqtye0jwsv',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 22:01:00',
                executionMonitoringStartAt: '2020-07-29 10:03:16',
                executionMonitoringEndAt: '2020-07-29 17:56:26',
                flowHash: 'n3t80nf6iq4i7x6xney79wjdi89hl1wy4o1efbfa',
                flowParty: '723l1zy4im9tilkmg284y1j8stvkx4jpkny3f1z9pxfjuazb9a2wuh2axzd99n5pk0td1mpq18fsl3oxrbthpexlhagdhz79ue9zn3ae5t6trza0ku95d20d3urdzw3lqwjmxvzdz30vu29p145fppcldyfre7m5',
                flowComponent: '13xhyh9d87459epdaeh10cwx2l83r83bl1un5o9lm3ret5yl39s57iaog47v3hs4bf7w6r719coht6kwgzjrxjrequrq2784eefwwdighs7m7pu9rtsd6vwk5sc8nrl18cxbassmpcjnmi59ipc7uq8ynh8kmtcb',
                flowInterfaceName: 'f3aoquo59tue9yrt37kzln9wpy053ngo1i59rn4jvq7kykz25dgsv3noy9zru2g4adg6nsls1tsnqxyi6e9bggn86r3tg0uvgrfwxdh6aw1ysoxd8rn9wzt2txwukwn6i08b6bphaf6pz2hfcn10k58opvoe33uv',
                flowInterfaceNamespace: '0zb13wgbewbwlwutm0smcqt3h8s6l9aco3oshqrowsvp86se4twqrc0lk6qz5ifbp4cqgqhbx5um6icli6grv5i96ueuyt1mbc3imliqcx9idabnrzii7u5n03f3a20n0c76u4y5ko0y7kvja881jvnbwgnyfy8p',
                status: 'SUCCESS',
                detail: 'Omnis molestiae ullam aut enim. Temporibus molestiae iste. Reiciendis qui amet est animi. Eaque nemo fugit iste sequi laboriosam est ea. Alias nostrum suscipit delectus veritatis fuga aut natus.',
                example: 'nvojwqnb75cl3o2c9crg57hg4s7n9xjak32gs6rsunq0cxhsblpw71gafu9t620md7eansv0okyru6zwhaur3d2sqd1ltpc4c7iox98nhjvdf7siifibp5t04jp1idmyq69k11jwdhe5yk91kradfarjovmsw0xl',
                startTimeAt: '2020-07-29 11:10:05',
                direction: 'INBOUND',
                errorCategory: 'wbw1o6kgzmdsj4svpfwo27minkex23b7kqevnaqi7j3gmvdm9m2zuy86ywyacetkdohck2fv9malf77d8t4pwj1itwv601h54ovmr41qrt55h4dutf4asfp6ce0cyvquzyumkxyjeisxd2qa9xd79c2gbwl1c118',
                errorCode: 'b00o254r8i9les8bdzipfkuwwy1z6vnka9w9gazkxlmx5dfekb',
                errorLabel: 377846,
                node: 5208949984,
                protocol: '4bhykh7tgng2drwnnla2',
                qualityOfService: 'mvyia3nin97yagv2y3pj',
                receiverParty: 'egxx32fa46mrh77g7xwkjoqj3xmicva5fl4mutiif1581o4qd48qp8ec3vp6n0ehup4p3cl727rx7jw1ageqgiokartkco7efhy6kjox9rqvr9bcpeqrlgvuzv2lpz6ozscr0t6ly7jscljjhuvdu604q5opcfvw',
                receiverComponent: 'a1iw3zue4yeutu3gelxlqjr1trvoz1mpwnudufe9u1a0admt6r6d0j0vuo4xh5uawkuc8tqesr72q0lxbrcwp4xqcue7qoac82zj7nni3hfd1nyr97ncynfiebmlqzjl2116c4rcqpbge0odozr66b67p12j1ys3',
                receiverInterface: '5lpsjo2oraquc4wf2ml511e8w5anp6hgafm6j07acqgre4evt52ifu1osnluk6d8r2vkxrcf170ay6z7cntin7l03vn7phclvmzldoroc5j14dqxczitwmw3vfhid48gwihhzs3myy5p4tg1zo0cog7sawkh67vy',
                receiverInterfaceNamespace: 'qxiyh17wmpo15kxv7otcwe6c9e3i9kfg8eyogwd4fnj3g9cqn2euizt93ngak096o838e7gp5mytprqm1hcqbbgdzhjki79ih1pgq7duem208ro1jfuf56qcqkefu2jvnbixh5akumm9n2y423v1iulfb06d8m2v',
                retries: 2968575184,
                size: 2153532671,
                timesFailed: 5536675009,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'knbq2dlfm2iwa4p2zg8dmswp11o6710t3ik907soq0oprdjj6e',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: '0eq40gzvg5s6c941amzd',
                scenario: '14e6402en4nh4aqxafqygm45iz4nfsnkbjoazdgpaocgve2df76phm7fmztf',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 12:56:04',
                executionMonitoringStartAt: '2020-07-29 15:48:10',
                executionMonitoringEndAt: '2020-07-29 20:11:24',
                flowHash: '2cob7in8jpoaffikjlpoypro09dy9mb5zx8oqvpk',
                flowParty: '9limbuz96nl2bgx7ykdfx76n1a2cxuzj6t8gebfysgvyc9a6ovw07vj4552t4v2obiemlxnv716dy3ffxyr33pj33dvpeg3dmz02w6fztl2alfqpsqwuajqraf42t6sihanzj648nq9ohl3084o3w75btog3a4ue',
                flowComponent: '8vu1it0vfsp3bf5itil1ync5nykp17fyorufwza29xdl3dse8276m4xvds5dbfxqxg5zhw9esbifhuolpns32j665d0sxz0sm9j92ivzvaf54xxnae8hlsjvhs7ksxcrm5hj5o7jyrrlhicxpungntomxe7u790j',
                flowInterfaceName: 'j2t8ugtp43vue4iex6bx5yzvm6zamzp1fb957aemd27e6dqnlpfsuuskzt7xo9ncao3080klbke8d4n2dabamx235f6cn988nefhp6clxfyjmaiywsng14le3n2dnoi0yob8c0wv3gwzkag91z271jh6ax7g0piy',
                flowInterfaceNamespace: 'f2ted8y2o8bxuv6kyycpskdvkmbvqzutk844lq2y57is173tlxqgv1beiy4b9dsgz0kin0oy519wmw994zn47cxs73fdh2g48eztirn2vxfyjid4l4ihpse08gxm7yloiez1yi88h7v47frp39p4ggv80asqofgw',
                status: 'CANCELLED',
                detail: 'Quis debitis velit dolores voluptatem exercitationem unde quos. In veniam nihil enim. Nisi non aliquam molestiae corrupti deserunt et reprehenderit. Placeat aut sunt alias minima aut esse. Reprehenderit eveniet repellat id dolorem et dolorem sit.',
                example: 'rhncm6rxx5g5w7shf9q3qh5ey13i1q2xswkb12adp7b4ma95iop7whzzmz6bzr88352iw3zxhjs12nm8sx3pecapcsc8whmd49r3he6rjmak6wlwvsj82tmgiga3b1g15rggqwx5wg9zgi8zie93eplj8ytusueo',
                startTimeAt: '2020-07-29 15:03:33',
                direction: 'INBOUND',
                errorCategory: 'zot7kvjs9z8imtevm6pyrmy7v2pg1zzdqrar5t45q8ih7zf7exw84dai61jafl6lfxxot1idrfitwe2ko6z17q4epyct6skk2jom1a8hzwmdm9ibbkvucrxn71cmnjpni89zeyt1ysfv83snilltnxlkccvmbanh',
                errorCode: 'x130o72b9m2qidtkx95yoryhhb0etufphhizhwz97jlbghmaxo',
                errorLabel: 414443,
                node: 3250497245,
                protocol: 'a6ni90tdnrv47sfzulv3',
                qualityOfService: 'eszn1hvpi0yh30ccns86',
                receiverParty: '5c4nke08hbsetgkodug2oizjhg9iytafxreb86qn723c8dxm0m5d3ln07d7lcemhy7izxswhk3lqsdkdpewq4w4o26uh4cctwti8wtw4g367rbfscajwhjxkxr7x6yt1ydszekx4l37v9mhl65m8bqp2m9vy2wa3',
                receiverComponent: 'auo51mjfwvnul9xlcm3omxqz3jopkqzalw61fwtnxl2u52htm8nij09v5plb00lfurt10siee94kum459o6v30pauoi3cgc91el7trah9mojpndrkb9h8tye2ymzxc61793t0f9xeuyl6rtdb2a1k89g9o41z47x',
                receiverInterface: '90eez9uwxn1m5dmy4u7bp64gtxl87587zohjlz2h1se52u42go1zqxbckqhxdci2kr0a5judfkcd1hkndjblpmo891z2zm3jp0bxk5fkjwyzg2u7772u83av4inj49gyx32230f63dg6d7h7xw90qiuxuf7zzb0j',
                receiverInterfaceNamespace: 'fht1sd3xdpp8bz87vi42wd1ujaygj3jkas6kwn534bdrfxfuglm5c9tt49fpmwyqyhe6yq39u13i4t7hrrxhz7a0m8jprjbq1pbj9ds3x76gm1y72y7slvm17ncmv64ji6phs2nenfvkhh7opdo2kiwsimcpbms3',
                retries: 2581884489,
                size: 8330806329,
                timesFailed: 4581489968,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'fvoi1ga9pc19lpyulwcouv211ya1l4866dgihsbcksash7a2k8',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: 'oxcxqgj2u1eg9pmt3m8s',
                scenario: '3ils8iidb8qp55bg7mex03rgiv2qcjn6t7vifnn351dus08mn0qdotvy41v7',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: null,
                executionExecutedAt: '2020-07-29 06:44:07',
                executionMonitoringStartAt: '2020-07-29 03:34:49',
                executionMonitoringEndAt: '2020-07-29 08:15:34',
                flowHash: 'njesd2t9pv8woy8u8upd8ztrqsx7xgykixfdjki9',
                flowParty: '9f2c3mghiva32p8raqlhalvh668ppxgoasinocra38pik05pcbnalf8a01vihrrowzktfrybnuuayl3vime7hwogitlnwlpp2yjjlvwirvukzt6f7ihparzc1u7n7ek7o4vr29ugo4kpmb9nls0e4wo0ji11yfqt',
                flowComponent: 'j3chpsiuifpohzhvd9v29w9rp96mhqk6268w9uax4d96vj843boan9g0ul6aum70hsfol9quilvxj8g5y26h5uko3okcxkssc00pesqkbnci6oryi7cf20ihcq396xp7ie6ju2uytp09nczvmsdcmtahsoh8khpd',
                flowInterfaceName: 'hw6c7eshl8yse9sfdn0zsouch6mpvphhwdo7xvfvq08y1ikaqdzx1e2cii0fknloadtjdzaugu5dbjx9r661g07e8w0oaetfs1y8bhvl8z7ql3vsp1yaa8xng3xoyyzidnwwc5vaeavwr4dqjffm6v83r17bvb6m',
                flowInterfaceNamespace: 'lf3e3uclxricncm70vpysfszkk6bqhor44dktv0cja0hcz99617t6mvlz6c60zvpb3y2l9ls9ls65t98xfy8t0kgfdazzfqu9hye0lnli0vfh16uc3clvskxgykl2b0vmzrfk1tp979037kjk9fco4ay7hdkobk3',
                status: 'CANCELLED',
                detail: 'Fugiat et magni sed natus eius. Ab deleniti illum mollitia suscipit inventore. Nobis eos molestiae earum. Fuga ea maxime fuga aperiam. Quia quia nemo est.',
                example: 'vve7bbn9fnbmgnx2b3oe2gx3a86b88n98lno8u2hi479dnraivm7v7yycl2jzdm6xd8rjp4w20djae4lqj72zu7ias3flw3jvbohvd75gi33g5q2neg95b1gxhkjseaxnosdga9mpicn7m6ekoba4bq20pry40s7',
                startTimeAt: '2020-07-29 22:00:11',
                direction: 'OUTBOUND',
                errorCategory: 'h1k3ikw7cpu7hlzze3tvpopwg99uneugno0v9unb0zgtuqw4n5ktx490n6eoatb4ej6r0t6v451r56h7wa4dtvapycr130p8k1hsvowcgnokospb7ptgahq5wbke01q9cstkj020va12hkbfreszmntjlw4eym0t',
                errorCode: 'wiu36cfelpztva3n44r2c4q9cd05j3lr2749cbd5cu65j0vu1f',
                errorLabel: 477809,
                node: 7268793690,
                protocol: 'pttlo2rz9tp9h3pouet7',
                qualityOfService: 'tnjc6jc6wc69czzt3vga',
                receiverParty: '2x4cnmuhlyjoe8rwk8tsc33m6idzb04i2xyb1dv2tj4x5bus2aa2v0alfka18om5wy45pzw38z79keuxpwnyapddogupb32q8x483dmgxpfxkbdpdhx114samsjkh69h8fl6dg6d247fti7z377vo218gpqjy135',
                receiverComponent: 'myxln3dntffpqfourpqwt2ve85yacmvdrexegy139taxs6mg9nwpc0bjjdbnnk3epamosxa548lk7u009pktjjz1ih6x1bvpevrofpvrmb10i0u7jwe1d8uj59sggn1w72qslkwifpbest6oborsi2fqss1soe2j',
                receiverInterface: 'lbg7ucqmpp9sg51vp79prmccj7v8sxe8cl6xmdxrhvg8hbso32ehzzwvztjwu0fky4mzl8duvuoyrbwdae1haa7bw3j58cenr3cjqll5dfmvtf26nb41549bfd4b9v58qq16wymwbx93m463dzh0g66ml1n3k4ld',
                receiverInterfaceNamespace: 'r7jgevczrp6f8oi2oucymu6wi4rk9uyi611h6do98nfxk4snnby4jsb7e7wi7h6fm65dblc1ehisro0j8z1glez0mfm53u85wmk6xkjrf0l5geh6ndmzw8h7v5ifzs3a1gyb5qgjkjypoff91n9ye4v67686b01n',
                retries: 1594409058,
                size: 5256846745,
                timesFailed: 1515937284,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'ggyh8n1c3sk200cm7scvxdy8824s5xbnx2bwzk1fc77utyfek2',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: 'a2qxgh5xb3otpglpkbkd',
                scenario: '84a8ubpeb6o1u4mdexq4kok51kkvnn07zkqucbsw64xxcaoxw26pjaekadol',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                
                executionExecutedAt: '2020-07-29 04:33:56',
                executionMonitoringStartAt: '2020-07-29 14:40:36',
                executionMonitoringEndAt: '2020-07-29 15:54:57',
                flowHash: 'zy345vbeuzytt3c482pj1haolrto4l6hm2mpvtpi',
                flowParty: 'mohnztygq0lhlseaeq9rn0rxhnsd1k4m5r3q82uwygvhhnkmz5i4pnenxjbp9u377zsrmuu6hlskgl785j4873fqcq0h9kberennwi29doyn8cgfyx66ku6lbs1zswm67rx6woon0jq43daxg8gctnr34gpegov6',
                flowComponent: 'e43l76yh7vfve53zpqgkvxvw0z3eqflayhj9jlsfhtvxajrurluf0ihkc7bzr2y44zf6m862ftvheku1wcf2mzce69hbczkwj6mq560mw0zudw3ik22g46p51qfjk6vkp3zj4t9mc9vlqfsplxvsv271hmh05kfp',
                flowInterfaceName: 'x9l9yps0d9ba4f7qzv1624lsjbitmaoa0806mz4dg1m7xtjb7u9ts3nkx9knp31pwaqejds08e1ouddt0l6mtodyogckgtcl8de4i1wonlpjf0a7x1ke7ynx82odyy29874kha7jsy5q37vojw182sc9ptyqs3pw',
                flowInterfaceNamespace: '59b39a58k548us6n93u8qg77mmsa1cz69p7yny624d08njwdl2fdwnjf4b5g34o89rpzqcgvvzlhntxpuovxlw9lovpf8nsug8q3ul2le3wvpg9jxnkc6tdbvpiaw3itugun2ll2sdyo0mpcj2dfc42sgpa6cmjq',
                status: 'HOLDING',
                detail: 'Autem quis non facere voluptate amet non possimus. Omnis et est ducimus porro nulla. Accusantium quia nihil eligendi est impedit. Natus aut ratione.',
                example: '401dqaeyomip1f2njw3e4tas5fnpfp7rdj323fo3bd6bnfjtegyucms736v1oo3xjt596fslssp15nnwzyl5k3m7e72qjkdyk4go8cj6wux9if4kgam3zyjudgidgn917csjjmho0d3w35xzlpkm4ktlhckhjryu',
                startTimeAt: '2020-07-29 09:49:03',
                direction: 'INBOUND',
                errorCategory: '83ni8otssq063zznvkbt94zlo76srmci46t56herxtiv363uuni4tgl8886iqxrfh9s8y71kwhsbekqyzdm678k5smkrc40l9wcy05gpuq97nnosxfuvpdpchz9mkcpvy4yxd878mcutm4sb4uwb8h2e1thbdzuk',
                errorCode: 'r0cjqzm246698kylvum2nf4nbuh0w6mhkmmna0ak61j1bfw9sk',
                errorLabel: 573913,
                node: 7844533017,
                protocol: '52u4d1dia4dptf590y6l',
                qualityOfService: 'jxb89l9d85z9aeice0tx',
                receiverParty: 'msotzppj81vp1s90qm8xn53s5sreizyydg7x8xtm2emg3d5m8ed6m0fu72fglde6e2smrqrfb6hqffukmnfmedvitcwsxxdwqglrsu2451qr5magwhxgsmlfs9hykbropw8rp4moi6mxl4yzd9yoqok21yv77c75',
                receiverComponent: 'wkzkuglv854d3dv77pojcqtem3kj8j2ds8lza6o288ublqrapd42e5sfdl5vrdotcgnsjatgxbziqm7i7j90x4nbcxjixkylqar2tz2iajybqd6c9jeuezkz0s046t1bl8khx0uvgvsqoin4t6oy8ugcdkav8kh6',
                receiverInterface: 'w9fs83cq9kxmpl2tnj9nz351ywenbx1r2oj75kqb5gw68c4u6nugpva4s2zkl7iq033eauyi8myxd3z4gnn1sf20fwmyalnttpn7niihs4kfor78t070v05jz50ixx2qnmwnp1bftknlysu9l6eph5mnodbnlscg',
                receiverInterfaceNamespace: 'ue15gvhrtgt5zne1wqim1sz0nldkoxul5ruywm7b5204yrho0gnajr19j7c7ajghjev08ajha4qdsglwtuspu3yhystjom94bvm29bn9ez5mwemly34imlfw2qu5o3yjp38w9sc4e2gh6usdlwoek3oixkejan7o',
                retries: 9147227735,
                size: 8879645339,
                timesFailed: 6393443416,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'ngawujplj26zm9fhvagyygemw15o5f9kyxbkt6d5kzuni9gakq',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: 'd75s60qqir2mq7dp2tyg',
                scenario: 'p6x5x8qhm2j4h4gcub5q4neusfdaxdjaxofjxkqvjoq15fp56ygzyk66z25e',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-29 23:55:23',
                executionMonitoringEndAt: '2020-07-29 04:59:56',
                flowHash: '0t7r7c9cadjqubgrnxxdedqbat9b4fjed9bgalet',
                flowParty: 'xy9n13apzj65lfqc8c7549qs75hfx6p0d9xwz6zqb1xop7ywrwucmhg3l54liac570mzej9aejza94s3yjpoavl5fq9j2jrp4pvmbf3g7cmka2qdvspr6g3eaw77q7mkch6in7sdefiub4jbaunx4hp9jsm5zp8c',
                flowComponent: '9sgnofk7zmxurz7dg0rjvqgpf5a3ozzvfgbraqztkhdz2qtncuo81207mf20jwguzko6c9or11hnlw4gydgkm5va0wk38ran56lmeft6etpwht09gp5r0t0mogd4ihqkyfz30ggtpmz9qgxeyv3lzed0arc7u07g',
                flowInterfaceName: 'diowecoo7o0fyi8ig0s4s4vy95lp7khvr4t2blq5wyspaos8xaw0r0hyf4fsf133y90a6ipc8ye8v8at8449qw4afbqc0wn0zh46wnhsl5awvy217qh1tfszaiovflyl1ikbc16vur6s3gdid7ac1pwuikaj9osv',
                flowInterfaceNamespace: 'czltimlchz7i69rtj2qv67tzgfznk82o2xmn38x27ottgq93x82v2xylesvut3pqap0654xbbbexif0mavfdn53m3v3g1ozo1y71tney9dvuzo5rtg058wsc5xmp7ssr44vj9p2p6qjavdam8fydeghtqzu97hmy',
                status: 'CANCELLED',
                detail: 'Quas sapiente et aperiam. Quia ut unde distinctio quia dignissimos quidem. Architecto et sed molestiae tempore laborum saepe. Deleniti dignissimos incidunt nihil assumenda doloribus et.',
                example: 'jaz0ll4h3jwslrezbkw7z2su5rzbyp6ctqc2cv1qaxhz0aax738fnedwzn0wveta61swnov1zw6wib4bvsrm4roqy55fjahgotolx3pv4accfjupznxugg7u2d4gxoovh045aly69w6gxgg6ux4ipqreuhbmf8j9',
                startTimeAt: '2020-07-29 04:54:16',
                direction: 'OUTBOUND',
                errorCategory: 'ta2xrl0twgtlql75q3drcvepjjcy9uy6s7gtlxclwxytsnrshc11ulwhmu0y6wmkxgiotgtymvehmxbe3z3m4jl0wkay26sxck1y5rkt0h9j51dbdwiwdnzhzqmke46twnqdkn21y26e3c3nyz8i2vnzjdvuknkk',
                errorCode: '856o5f0l35t4kcr09gmdvf38x1qyuqns9sb4j33cahq0vob8qm',
                errorLabel: 304172,
                node: 9532679647,
                protocol: 'h7uo9i0nkebwc94xszze',
                qualityOfService: 'yfy64w6dtwcaes3pw2bv',
                receiverParty: 'k8s849cptgf7btqwjinh22b32vsqw9bfp6l0x23cedcc850856hzzgc5gigku1w586dzdzupjxoheti8cmkd02nvbybfleo7qk9lk30rm8mzwqd60san1nij4mg33na7r6kst2ffmnqgt9vng7bn9bh5o3y7edh9',
                receiverComponent: '97l4iekmcjuh1lig6f2e971st2nragrjo2lnpeiikjp1885ubmogloicwt57ataqyb9hcl868odwsrc7evri3hg85jkbogpta7skgdit5nlo7hv073nm0oapzsfusnqxdesk6vqg1jg32zixpnemrs25q0t2kbyc',
                receiverInterface: 's66ce3pawegbb39f35ff1w8v8vbny0oar1g7lr2zlh04rizjnswypfyjhq5fnrqfks0ys4m1lz452v2lm54ni8xkz6kvdzrqntd26gyd2ayutmgjoyy6xot3tv49b2k8msd8a5nxfi9jsuulh91ye2cuzqmigtw6',
                receiverInterfaceNamespace: '0jcg8grx19ze3gm137y122hcbfzwb7snnwjx86jvdw7zfg510oxy5ktn1wng4njqrmxgbg6th9zj9me3rx8meirx6kat1gn34igmvjhmi0p7t7fxe2nxd3tst4cmq3awj5k27dfnksggzmd5wb8we2jjlvuqr1d4',
                retries: 6949512294,
                size: 6028061327,
                timesFailed: 6153111142,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'j8esurcsqhqt1qoa7ev4tfbly1xv92zthgzmi86krdl5odih6k',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: '8ehwuebu84ldgq7xwv0t',
                scenario: 'gln2ib0sx2bnnw46qhk8aqvnb8qprmlmwyv16dwnwlm4ducpnakmhrhoaz93',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-07-29 06:36:46',
                executionMonitoringEndAt: '2020-07-29 04:10:37',
                flowHash: '75x9qeg6m5rixkrgqwpzxp43y33je6bth0jvnxzv',
                flowParty: 'mrwsi95ndrdr2lslh5iyyepkdatll4v2w2dh9haidel1yw8km2ujrw1otzr6t8g7plk8tf5em1118bmb2ht1hhp9uq5bq8gq87ygjkcf2s85m52w4og0hskjxml6gaynew5iggwu4uj4pry929xsbjjcjoqw9ab4',
                flowComponent: '0y4mzvpq1wjh6zekcdstfg1qkmrfdcty05cntofxn6t9scqyet6z9ae85guyqmpmxk4xqya7kdlhcqwc9oc3kjyccrjc3n636zunhyvum5xrluka420li66jzie5j3q4s9v8v0fzu0mdx7wf0ppp74wp5lytsieo',
                flowInterfaceName: 'ef7x7xqw67pmmjwtb8smy8iiowntr30tpp505len0xx34d2xm1ksv9lfu23hx0w02qci4mrqnvyowtlwy3evp2enqw1ifbpf1426lyk4alfiadw7vswtd89ipjy4xy47cm07x52e5dz2ra3vacuz85iki3fhrx4f',
                flowInterfaceNamespace: 'nxv5n7twyc3orfpz6ugcg2trfjfylecu2spakmid41way43m99xl3mrsm4p1ju9pu7s4askgv7quhazxcpv41z8lpbzvjhtne80k6nbpwq1kz52himi7fbmrpt9pmroqdk6abjmjh1w416z0s0s5lqsyccbe1qwx',
                status: 'HOLDING',
                detail: 'Iusto est numquam similique. A consequatur maxime distinctio. Occaecati est fugiat ex quasi rerum est voluptatem beatae beatae. Itaque dolorum vero optio quo illum. Voluptatem quibusdam eaque inventore adipisci quo magni deserunt sunt. Repellendus quis voluptatibus distinctio natus.',
                example: 'gzo5ii28dvzpm4p0xihzraz0286wibk0ujcvy6ljog8bjj9w7flrethtlb8iitgsofil9t9a7qz4njyb6bts15dgkzzq8tovigwvkn9n32jz271g7t8gv99aes4bgxjpesezkl4ad00vz9sqy0naou23au5uou7f',
                startTimeAt: '2020-07-29 05:45:35',
                direction: 'INBOUND',
                errorCategory: 'lh5edu9skhtcf3h4c4ohki6hpb21yy8b6c7vuvbtfiyxk09p58a8ea7bv0yue8uo93dvrxw0zmi1tvc7p8irbcevuoa90i46087xnmxlm0xjv20sncv4blqrcr0unge8d133nrjrfg2uo0x3g3uxgiqtawswb0qq',
                errorCode: 'nie6xqad364zjnrkq8nnatths9vnzoqy4qy5jj56nf8xl6pxjh',
                errorLabel: 856227,
                node: 2017162846,
                protocol: 'jog5blxvgyh1dlpmuu9w',
                qualityOfService: '8h2irv60fj98javruk1d',
                receiverParty: 'blg7hp3kgj0hb3fwq1d91d9admoflg1o71zxivugarg5mvafls4kz1g9af0ogx2uvfc6aou6f6asmzwsz94hc2otsfh4wt44yyh3uuhiv0w7l5k4hgx1q9qobt9613ziy0h65ykm8d47o48f1fiamtqi64wllmf7',
                receiverComponent: '6ke2kcn96p2omlkgahtv42gge4rkvxnirezipoani3xhvo7taxi9o6d85e2m356i3z3yzagiwfvztn9onmjpzt0m6vd699ecnihe678mxjn8pl9x9xu84fiocgnrc6wv28i9oaknds4cb38ysh6571u0ujp9n5r4',
                receiverInterface: 'rtwnujnutwg6t450e266uukhpv343bzqacmfb0bjjq2pjvr8o5hjj8b5bmskl8ui5b4gxnfkjjmirb7lh9n6qwlyuldg65iuqy4g52o6hfb6i5c8m6ptilyuduxjeazmqxbkklhhrl9y19gy2zjcph4dtnfqsayb',
                receiverInterfaceNamespace: '3un8hv2s7dfxb0670u7crwdod08h88dkf3m6c4mrm5zqx39fgrxqwr98ougxx57irkftyxw7n44b5kl5unhf81osdbh12pv9qy6yv2mvfagn8dx0cd6nwjva5sb4hqrkivcgfwwsjnpup6xt5kmw0cmkm8kms8gv',
                retries: 6200022589,
                size: 7115208176,
                timesFailed: 9545177603,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'cj2rjtdhq2owyzw5twzp5eup8pgzip74yq6l3wq0olez5rn7ta',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: 'yajmmuz290k9exvonjqn',
                scenario: 'mv1cc32t4h1ci1ayotmq6xm7htst228ot7yutlgjgexwtrd9e7k24q2ob1nn',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 08:57:11',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-29 04:05:40',
                flowHash: 'jgducycdgjntyo1rh0wtuel29owx8pstej157ntc',
                flowParty: 'woeacfm9p4yfapwlwkcv3etmgw3c8u93uwlkkpbj1uim06jmeqbfn5ram36ayrt43uicse2x38o8fvcd4grpwh17tp9rrtsbwkha3tuatwcug45apmrr4d3e3l1gb3f6bas4somryla7bmb14gm0blbpzyoho6q1',
                flowComponent: '8hgfnoo0sg6unv6un64ilfjjhydroic0gmc739m6pi55r3hjkw3aw3xg82z4nsj9phrnj8x5monp2iffaf9hsu7hkxd4fb8it47gn47lg2uj8ih43bzv6as5dufeuti24bdlmzeenhq8ns65sbyqcv8c7xu07njw',
                flowInterfaceName: '1k8dho2hnyyjuf93udjmkgyfg2tuurfqkqkrym52fgz69yirnvb7f0gkfezi7x1gtvmdbwx3ebm6a0tonatcl7nw5oq513hpwgm4a6c3nsng7ph4kecxji5jlyv3nwc31pwtvbq33l6ftwvdfddcpu1veuy1xwlv',
                flowInterfaceNamespace: 'g6jvdc506gkf49lubuv6yc9qux4xacq95fyy4q0npxrooqpn0ieu7foqnxqohxhoc16pxywqy36ift1cs215py5slu1cazvjjddy3m0sa57kj9d7copja3ucqu1l6oqz35xbsllnk45hujfiw9m10usnxrwpoxx5',
                status: 'HOLDING',
                detail: 'Exercitationem veniam ut voluptatem. Reiciendis voluptas quia cumque quas voluptas consequatur pariatur qui. Doloribus esse accusantium libero qui ratione consequatur. Necessitatibus culpa qui occaecati et qui consequatur cupiditate et aut. Incidunt sed reprehenderit quia corporis quam officia.',
                example: 'dmgz146rxenny6iifpoxblprcg3ncgrtr4saghr4z11lxdtugzcoa7k66dodcve1fyhf0l9rfgxgi351abkkjm1l6sr1lkoaxifq5vv96t2az2brzccvq76efxw5bualixjfe3myef8x4kqiv6hd61e6oa9zns8c',
                startTimeAt: '2020-07-29 13:33:30',
                direction: 'OUTBOUND',
                errorCategory: '9w5e46zip1hv7kgdiqqdjs17wvn9oetdacqvkulm6wabdvx1xd1kdajylgm4o56idinrmnv79sq5dkqiuhl87kgv6ddatla5yqpp0bj62bgmlkej7vy2yd6rjzlvifofavno1bulvn57pxxk6h5msn2fagh9wl0u',
                errorCode: 'y2fa3vc2gcol6112a82llojovwic7zat9dhjgmdqgf8k49fs38',
                errorLabel: 232815,
                node: 9194448166,
                protocol: 'ukkaa00t4jmlnj4uguyy',
                qualityOfService: 'ucmou0wxpqwuv1c1541f',
                receiverParty: 'zahbb37l5q1an0eim6vk3h248ahh40lviyajazmpgzz6renr2en3kjl5m3h1b7zi5rsolq9dlsey47pbblwdti43cufgnatc5m0rprzy8p5ehnbsw71glduxjsz7jgk7o0kwz6qdgze7hcrnt7co3dgskabiu520',
                receiverComponent: 'mjgvos85jif715ibghhra1gna7ois3z4lria5fcf5ciifi4hfd9q8o7e6sag1zt7tcui8pogbomrol33cus2dc3bc2koisaa65y6c9qns2n7e7ga8u1coocr4y3gjeag725c7untfvd3atyckyovb39uf47s7crs',
                receiverInterface: 'rl3ulrlncyde92472vo62ccrv7r38jiqzrtlu8qvzkcmy4ebemuzwnfms0gfd56agxiczs1crpy6qa5gcc1fp2v04rr9cb8cl07anw1v9wt35mmbc35byvgme9d27ede1frblbi0o9917zmmkme46n6hglljotev',
                receiverInterfaceNamespace: 'c7968a5sx1psffhqyu8q65yuedzs9mu8emd3qpzykzbx8zvzkompgwp45nfe1nh99hnhspzjrp36ppb1l5i5d216deqpjsuu5zmwjyw8lcseszt4zyc6klpfu83rhu2w94abmlarp8nx1wy3je694hadnwmvzpag',
                retries: 5466901221,
                size: 2344725154,
                timesFailed: 4950923935,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'm8j1mg95a14fmhhgnhav0szlqb4i7zx7owmo9lprogc44ln091',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: '615w0dbzvv9p8qturwn8',
                scenario: 'atkbypi4g2ixcttruwgxwgatrlofmy3d98yqe1rfq3izbioqdl6l17bve4gw',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 12:09:57',
                
                executionMonitoringEndAt: '2020-07-29 20:38:11',
                flowHash: 'ew9usbs0qtnp1lqegmb3dq24zao0l1nbl3hexe30',
                flowParty: 'nwoii3iurdjtu2gqp14597ws76ypupcluys6u04rqx6x6kwgcy6rqjdn175znmsb6c2ans3chechgn1rp2gn4nan2pp69cog1d345edpu8n0ajgr7ta8ijx71b2dh32x5br5a7funymn12448hji9x7d7m1nqdj5',
                flowComponent: 'cbdiz3lybz1c4e9yuvhkkmdudaydx4vb00mbi5owspv4xz21xqvyygqqdzq4vl85ipjh0k9ppewgprsefwhcv0kal83otf5jdaorrk8l9merhtvodpkl65p2w98ufaf91xcn2iet5s6egr2w0ieff73xso8zjprm',
                flowInterfaceName: 'l0vomygr2pguamm00uga3sv7tlk9f6nfo6yf0einhyo3buypkhxcm89lldb87iz021cwzfk7gt0zvb777jk5tfdl0av8srusvd7he9b1fkd522n2k7vai0r43cw11atkkh1u2x0fmz3w22sc3n15hpz1ek4mgazv',
                flowInterfaceNamespace: 'wzqsx5xxhwyzwz60lm05q3cww27frkr3vcbfxd4b49uvsl3ng45tkjrgrflw5xcvl5clqmh7ktshjofazfj9veeivr8o33spqqrq64do3ko683eikl47hadfl8pf4sj9pmob5hh0aq4wgxfyk3xksl6ga40w1eiv',
                status: 'WAITING',
                detail: 'Eaque omnis consequuntur itaque explicabo expedita quam aut. Et ratione ducimus qui. Occaecati autem optio quia totam omnis voluptates itaque rerum quas. Perspiciatis enim aut ipsam praesentium. Eos qui et est molestiae. Fugiat qui in ut vero quis.',
                example: 'l5vj4q2er5z6tw869glxh7r1x0j7zc4lj8ealb4yw5fivpcxaj0nif4ebtxr2bivugl0692x3mubyrj58gb0x8hxo244jy3dz3pi8xd3magki013vnhya4z10x6xnr4du8fe8kgy1rhi9j43di1otoymmksva57p',
                startTimeAt: '2020-07-29 06:35:30',
                direction: 'OUTBOUND',
                errorCategory: 'upz7azvk1rliimqjp83f8yu8tn0v809h4ro1fi7ys2katku3r10wvtaxjf7ptbmhzwl7zml1u4so57mesx7nkqbd1w16u530u3bp8wklah6q50z5pw1rap17dxrbd3nh8816d36rm4uiqggka8yxkpcxyp1g52nr',
                errorCode: 'm6h9gb2ufn68dvo4xznagp22v6q38zkykjm1kau7ou1en2tx0w',
                errorLabel: 856183,
                node: 1707547362,
                protocol: 'ez2yiyb4t5v3bvyy2s3l',
                qualityOfService: 'bodvqohbgc020of6izre',
                receiverParty: '96z3h3qypaebmvrk7ur4r6dmu67ef4pkstjbebejvkn6quhzdnb18r5wdc5nl4mp0stz7szrt3ggbsjs86romqqn34i1u74sr01zi91o7ezvomf5t2sspiutlqbawkb1frrq1jpbu3mjnt4hp2bccnrbs4tsdb67',
                receiverComponent: '8gx1p5b1k0qdqd2kvsm20yyc90uinrn48jvomuq3lttr4t9ybq75spo5slwje5c47uuf8m2nr4v7ldq2n5894693ac13ysrt7xyf6nasi6zatzfmvoivs2eoqpqo08a5a5s2igawb32fameptuduizrmf5dp5lec',
                receiverInterface: 'nivactonwnnfg8fl453mfg9u74fyioi0cmcmqrjv3hpmxg6e2cn6q6r4pzmudl0jvlc4x3twq6s11h5jiqu9xzefzhbr8vswxw28tee0fmb3hvnvw8ne8k0hcpi480py0oo6zrls2q4ckidcg47our4sf6phu1ru',
                receiverInterfaceNamespace: 'jd2b5ayro9pkyn4i3doc2a259pqy6vqarz384ngyuj6sxhz5q7sow7k0ur1kon9mq23xhmdfqrd9ja2z6x8z4bg7qr8iaxgf4esof4omu8ab2xtvduxl3n0jfhfiu21dr3rqewhmr1aehn570ee08b168ha01400',
                retries: 8867029669,
                size: 5177320319,
                timesFailed: 1600132163,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'd84qj9i1am1cvipdjnqa34ig3i6acexgbf3713rysnu1efaq03',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: 'uy98ckdz5417m21ocjld',
                scenario: 'f0f0eqvjs8pceuyrxodd1noygsos4c866go3qsqthcch3qrzwy5ptjxxd9c3',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 08:12:46',
                executionMonitoringStartAt: '2020-07-29 16:14:11',
                executionMonitoringEndAt: null,
                flowHash: 'oxes51bl1orzjoyl61xn1py3xg13gzsencmmdqzz',
                flowParty: 'jmo9yrqzwh0fy5btizha9ye25ztcm9epz2m7h22di7wiy0a0uj4n8p3i1ddrobcej0juq0bepbumrej4il1f82xe3dg5fs3nc90i4gbx4yyvvpb67gyzm5hvge0fvtnijr04qephnfwmvt62bx029sh5086etfuc',
                flowComponent: '0k43wrblaxpmry2t7qu3atfc041ex0qhdrjeb1nzxi9oo0bgjpc7e48u4hcqfeslu5az5ybrfe17uxkcsvegbjei5iaqsr37ak8tuep6k5magle74qkctprx10yywkk4tthq7dqpbvyyj64syun2b2wrp4ngcscm',
                flowInterfaceName: 'vwcsbm6312dmfw72v2eaaqgo1avm5h2e7o11umsbl4ds88a48wxg0dr62if4n6m0f0rcvykt6zq8kd2adzr6q1t05ygn82t01ik012j9kkmiw4pmlfnube8bv4l92yr05ztw0cqx5ckszdech4femss4bp6pzmqb',
                flowInterfaceNamespace: 'ts4cjf6b4rhaqjnfq1z6pld9p2jnznr6wuenw6v5lgeu7boi7kzclfmlpj1gs92u4obn9gn6royow4m0fe5aypaw7ieu95rbumyzu7bym0oyoa80ti4b4c4e4bios2hv9d6w7gq9by7dea77jca0cqorryzd5snb',
                status: 'DELIVERING',
                detail: 'Quas optio accusantium est quibusdam deserunt odit. Natus aspernatur ea. Vel et impedit quaerat autem adipisci. Praesentium excepturi fuga ut facilis reprehenderit sed sint. Corporis qui hic repellat sit atque. Qui repudiandae suscipit.',
                example: 'balmuer3hhumba3wfy9vh67z0neuzb1d82qe5rcfp50xrz0pthe9ytkojg7h2oy9io1t2kz8uw3q2eq562ar9z85josswxl075xk1mrt4y32mampf2jj4ssewnl3g9tl2fupr2p7cjlq9xrriu1bvvto3crgw9mh',
                startTimeAt: '2020-07-29 11:19:25',
                direction: 'INBOUND',
                errorCategory: 'juadkwypionfoojf9otkv5oxuhbp30ny8kg8rmnr6j3mk6l6z77teblmeyskhvpx1bmxs26xaox2b4l1q6n9lmukjrrwvfsj59a9d6723scen15g0x0k2ecbmeamtvz8qr6ezoribd2og2zza3qq0r3tc61jwggp',
                errorCode: 'nhso01152trdxs6q3qkdl4rs1ar80q12ualkc93avh34qkspq2',
                errorLabel: 660547,
                node: 6552861915,
                protocol: 'gxeaewaicb27kagdpliv',
                qualityOfService: '6a3kyj37wf0roduxllf0',
                receiverParty: 'vblj7dfm81ghuo2s5avmr9jpu0w6uct2m178g20luk6olhyhlw8icneqrvexx3hs3jtohy764bv5lep1nb0xgalsiq6awv92kqthpky92478fn066i8uae3x3sr9kf9tkvjzatsgmnc8sddflxlpl4n9ljwba3mi',
                receiverComponent: 'ytcy315dfgu6ymrawgodspljlf4i0agntg14yt3g5335ik8172dch2omvi4tbdxl745d0g37s7qmxpb0kszvq41faipvan9ep2436mgkzmn4aatd8kxnaj246vys3bjvs45zj3i9it63wnad4b29j0ghb2e06aie',
                receiverInterface: 'ccel1cv867kspg2ywqjz4qcopc6wjq4o4bem6liij8asyfomemfpgaljre0lfj9i6jrg8jdh5e78j6bgsz8svtsib16u0qaxkd5iqkmm3fvtnaiynyn975dgn783s3nxuv0k0jw5jj75n06drcjanwnxsj5t56n9',
                receiverInterfaceNamespace: 'hik857r064vcc0l903e6y3y1kns3q2o07jaorhx4awlosk0f0bspdj9hgoyos9j8yn83x768rgxkqc96odkjhvlol0xctcuorwazj2w72ssg101jo71ckunu4wh8i5m6nmz28wktiorutmqrk1ilboh7quhg1se5',
                retries: 7701150252,
                size: 9530916854,
                timesFailed: 1661697070,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: '5sxtte9v9dbnp1fusu78qmpco71z99sys5dihicypcxvn36l10',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: 'c5xk5u500rnxqkq7wabw',
                scenario: 'pr0tt0bh8t235bjoyjzxltsfcr8adihjrqr0fxlnootkq9byfpciojul4y06',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 19:12:11',
                executionMonitoringStartAt: '2020-07-29 17:44:46',
                
                flowHash: 'tabn5oc1qta91u0q2p75hv5o7fi2g6q7labxvztw',
                flowParty: 'e750pmd9px2kl03dhpw5bezbnulp6x0fs2jfsinmy6htjh38wde9rz6dkbptfw0weadmx13guj2my9sjthjp6we7wtiyng519l206xrawubjim653g19ilrgpjtzzgvd73if5po7s6do1bnn2rycd6n8bxlnm42b',
                flowComponent: '5c2llgwg5tyajzlgc1az0y3pvjsl7whpwdirst8b2bnixi721lpf1bb4cdqye386x7r0s3gm3uacwdf4nbrvkaqurovcwujv4l3mmn4rtprm148btcxb72rujjf1xhebgbrw7tz55dwsdr61tboz2v50r2zebqhs',
                flowInterfaceName: 'whydabjk1w3ytope02l6jc379oym10kg05cbkb0ae6zyikny348d6e47nra2mheyto4lsak5cvcd5r3gymluaprcp3u8by595420m9rqh6pfyd1kpagyik0odppylrazl8d9gkedcev96ini4mwga7ifi7rkbut7',
                flowInterfaceNamespace: 'p9bgf7494wv478utjy6ycs8a7qndy0mxabvuodyed61m47gumoudysqqnwjvlcl98c5wm0upewfw9edbpp173gcgk07y92qp7uz8lopvrzb3rifrnsddtfs9pcnwqnq8fdloumsev4w3uzy86pejc5fa5gybd5me',
                status: 'WAITING',
                detail: 'Iste pariatur ex et consequatur maiores velit optio soluta. Laborum nulla eius. Et labore distinctio voluptate ipsa quas voluptate voluptas deleniti nihil. Incidunt laudantium debitis ea autem sunt voluptatem velit sint aspernatur. Delectus omnis aut vero.',
                example: 'aibg5vojayhgewya9bof9fia98g9fwjq5kevbpjsn654lsm2tf6wmgozedg7pbxzag3yvez7qn89my6jbn4l6knndwkxjcrorkw16e69hzbcjjr3pu94o464jw9v2wbki09oq6vfdizf66vmx9xuyf5d75klcd8t',
                startTimeAt: '2020-07-29 06:18:00',
                direction: 'INBOUND',
                errorCategory: 'se48ddzfowjb340cyvrns1beabpk8tcwpjk4sis93v5l0f0i9j6gsqouayx7v9s3ope675ggwbvpf2430rqagfom9fl5fctmemy9sxrtw80wsamxhm27hx0ldoscyzb4fl7vzebfimn9c98uq42krk5k21e0f635',
                errorCode: 'soutqe6t2916i08k7i5pxrpmel856aik6vl8yhodwmzd5r7xj1',
                errorLabel: 512078,
                node: 5733215842,
                protocol: 'zak47nahgyzcvep1gw6q',
                qualityOfService: 'h6uvjh3dzndpxuc7yem2',
                receiverParty: '30eectkr4sq9bmoanvuqwu6bc5e015gzhdt8tusq3ndwfnu5o7rv8ps96elplylx1dbbk1cbn6clmt2x8ulm07lmwvvrteesfl1bco5ctai65aufq5z69ca5z3v584xwe67i7ab3e7orqv6ne15iw2um235dvs4n',
                receiverComponent: 'cqa1g936hiewcmvdr9ok4hcgmrruoaym5v5z2mhsrq3k7blq084szudifo0nuxoirheswjs0r99e3mhjs9gcwnc2l143ofkwltrz0vrdgbpfknc9sfmbvgwtxl18q4qeldv7b11qcz4ig3j98wnr6hopgptwh02i',
                receiverInterface: '1eljrnywkl3hifcajwjwy1whv0k2svnfq7a3efwe1o0pyah4l6a624g8swazyec1txo7pxt8wmv70g42w5ckeppjhb2poprwq5q6bdyjruxm7egcd4a3laiy7mcg2o2iob3rfttyv9kzit2x94q1crr9pkncokow',
                receiverInterfaceNamespace: 'naijk44exjw8cvl25x4r1wsnjpguahxonpd76td2r7crswbifqbxythg5iwgkk04o27hytbcf83gigbdybdqtl1xj86ph9rn2k4iaekcm4csjl4ncn7pos8jx5zcscuwx168boqeifk2hfrulfrjbo0mj4ocda23',
                retries: 2168116856,
                size: 3290475501,
                timesFailed: 6898869398,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowHash property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'nv91wsoloijj8qavnyaec7hovy10b46vmepwo8ynm5udb4g9r8',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: 'bhv4r95o1i8mt3wuite5',
                scenario: 'hym5weiunxohwfnaajzps4wgijac2mslbw0v1e8te9gyc1xvv33xtbzhy27b',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 17:15:39',
                executionMonitoringStartAt: '2020-07-29 08:27:24',
                executionMonitoringEndAt: '2020-07-29 11:17:42',
                flowHash: null,
                flowParty: 'h3jeemxstdpve8oxr1xkel6xtg0qsofjyu0oo61jdtx69rjfqo5yrbr83zxmb1p7tbdiymdtqn0fofc50o76syy53lifa9w5s85e1qjit2rvot0yvkqrq905f8xwx4cqr934ut6hoym8gp432uqbaoyddohv45wz',
                flowComponent: '3npyaf25gquof4gjgz72thflaqx79k1wh45v6ljtjouc3yxtg1rawqppwr1jddid579rnohq9nvgmtdaoa6gvqxqb17udrqog8p03dwat7hjmuvh6o3wbzaiqeszzcpck3qyjui29xqy0ocjhhwsplk04e5el92m',
                flowInterfaceName: 'ilzwf6j0yhgzdpguxxpeogfxu8lp2d8h8dd6qhxt3g276c8mtk3kub4kdjxosmx7uo15i1yqjo5aqbwnm51ocox87b2t55ykksztrs9h1lvokl7h8wn0ls49iuf1ene8wop6dgh02vwg33uonyyy9r4l4xdiqlsk',
                flowInterfaceNamespace: 'il22ah3akito0ux72hou3yu12n70bo2xae1ta8g1gtvtp2l4ah3r1crm9bqxng9330jcbggcadaanmhncve8ovcmx2ryewpu128szuaaxzysllviwwc3nivpd7y9anigdhqw9y4jjlfxkx6y2rimrps931wymvbp',
                status: 'CANCELLED',
                detail: 'Numquam eum ea aliquam quis autem aut praesentium. Molestiae velit provident eos voluptas aperiam facilis. Culpa amet ea est repudiandae consequatur accusantium temporibus.',
                example: '8sqxpssc07b4ucw00q3g0fo9gw7w7dgzb4x0ukc3dzvglr84tvaejung06c6ysb8xhmaj8fno0cdvqgqkv7lgafmik5gah73qjr6lerlnavrw0upwjt4s8f6mnsrj9ors4srryvgncmgnbtwvqkr8l8tsbpuxv0z',
                startTimeAt: '2020-07-29 17:17:42',
                direction: 'INBOUND',
                errorCategory: 'fzozk7yfmmipudxyb4k645usr58qlx24uf87j84hiupseekln6ecf3inl4gvn9k370i32msfykk0y81emh3tr3ghgy1ncc1g3b74h9vtpq06hxa20tutceh6qny0oy67oy3vroi7nj496nvxjcrqtyc6cmsdwscw',
                errorCode: 'wymf0ez6jegdr1msgpcgtj73ah56fqtij3oqr0rbdssl6z91er',
                errorLabel: 810277,
                node: 9503815547,
                protocol: '7yjy8ewhamjf5b9zswb8',
                qualityOfService: 'r3wu41l8b95puj3bj5de',
                receiverParty: 'og0tq3qu07pk6a8su2itwfyyqcoum7qt3q1xwvo2hrahus137ug1fhq0z1w2ln6ufuo4k3pd7q76fck5fqyczf0gjqmfe976sarkazfhbzi5miv2jg8we4vkobz1tpqg5u6kmah9l6jj50meluc7euwq05c6x121',
                receiverComponent: 'mgppyyww07ci0kjdhz846oiyhgle9jes08h3dhcffbk7r16vm4rzyhemnqog1puaw560u8mx67cje4q900rcuecrb8gtymhi1ce6bzjmbml8p64war7ugcg939rx24der41l78qr0skij893gqkrubkrd88ztd7y',
                receiverInterface: '22bwfiwljpcao6zozg8jq4i42nqa5wtxmtxsgugwdfbpaco73xftgbh70s7sqkewrudl711014jvn1dla444eljm1nit4jlbeevag8j7a3d7wkuecc59ejits64k55gi6ca1dehwzsa1f0xdb5dzesia6y56hnef',
                receiverInterfaceNamespace: 'gfz3ckrej1tv0bxp4imulqp5wdhnktemznr5c8ops9v5ueua4tvdgv6d3z0bm326ez5zfl2sfv12v37banmzavvdek8meifsm25riuwvohw9i2y0mcorr6dov4bkt2twylepq60lq0cp4zr9sc8pmpoi8bwg8a2v',
                retries: 6678866914,
                size: 8470812043,
                timesFailed: 9094608717,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowHash must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowHash property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'vlo4ml2z0tfg1x6i32bja3ws1th1rwrll21ro30hq19d0ro8x8',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: 't6h3um5jcdfupcc0bdsj',
                scenario: 'i70gaz8yb0szeir3qydabdyl7lvvepsexm818a6x0gcsmhes2lg4f56e1tnn',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 09:57:04',
                executionMonitoringStartAt: '2020-07-29 16:31:05',
                executionMonitoringEndAt: '2020-07-29 06:03:17',
                
                flowParty: 'morjc4pvl7yvs3ria03smoug1lsu637ipsvdzxmsg8zaqd6dg4ee3j7fuo873pem268eke6k07ynh32zahvgk6gknkbziprrljxd72yp0w79jh7lqgsz07tjom8tt4qc8hx40w5rf4s6yvy0w2nkkr0kkaqk8v9z',
                flowComponent: 'bfty0fb3x5errf9i14kao9gu0maq8kuaeykzsildeitejhuifurbi0hi4tpm2ed03u1l62ix7buxnz1sv4fan3kck1dyo5sbumv1zlziaabfjrwsvsx8ugjlboowk1yu4393qgvu7q0ij4tg4vwhe2swpbt8s7vq',
                flowInterfaceName: 'e0rg06f655ceqxgekk6odvu8kt29wz4a8ugfyp7yxjdeswqhrvxsnbhk6apxtnrt91jnu5gn13xizkx2meke6yhon68v14ptuh44u257aw0t6xndnh8w479id6bhxt5csw3pbisp6vtq6yxqymeeuux3cyrkthp7',
                flowInterfaceNamespace: '9n9u6h5ob0imv080gyyf2zyv9pc860axl0ubzssieixvwa4ei14jjd3n2jiew6j59zz0sy5qx16fso451xidg8sy0chqpttwwpo5wlejint5k7upnsh7jphbugcwa1q8412zqrr4zmiqlrsd4ce8tkdj89e49sx0',
                status: 'HOLDING',
                detail: 'Aut ut expedita et nihil in nobis facere provident. Ad qui ipsam qui repellendus aut dolore rerum fugiat. Ullam laudantium aut qui inventore non possimus nam ex optio. Earum dolores nihil est ducimus. Distinctio ipsam consectetur necessitatibus enim nisi. Nobis incidunt nisi eum officiis magni sunt et atque consequatur.',
                example: 'ymg5i2u9aaf8yezrceo3qdpjnfj44pv54ubwm6eq7bw7an6pzkf9t7or9uf2llz52iw2bqcuxrz30l0mal4nfh7owjur6ac6qcw1vellecp46eft7sqxi1c5w6168ytd3x0h0wc2zavz40it7rryj70ieequzhiz',
                startTimeAt: '2020-07-29 05:37:56',
                direction: 'OUTBOUND',
                errorCategory: 'qrdyja9ymsn2hrw3wlwja1paj8n7cp7crg5w72b19u3aq6d9fw9k9exf7pnnlzu01buhmcdvflzhq3xf4kzly5hfkmgt0u9on8s1xxwo3u1w9oarcu0kn6g4m9s5m6lq2an1bgirt2f12vo99qpya1oduc9nn75j',
                errorCode: '83pzdco67rnvlnkbn349rusuizuwtnud0boevp0um9ocft6s0s',
                errorLabel: 700787,
                node: 4917952615,
                protocol: 'asb4dlhmcky8xpv0d2so',
                qualityOfService: 'qa4b2jzhmiomtcgv27sf',
                receiverParty: '1wk6jg73uxbx7wqvoybb6jtuq0inm7gp988qcyg0cndx5tcm3n1z75z8h8fwj2oppy3o2fmbnd9ea4js00iatvacbaf738xyoaa5i197jq7wa16lf00sy5r0pjd3201xco0goz7uy5sw8cw5so2f7vsmwanfp6ci',
                receiverComponent: 'yavg6bv3fsmf69a30ebhrvnh1wn9f6q7ygwru14iyo7laxxewtsm9mdxs2narsqwlt7z7qz0ydrusdke38epzgrl57z3myx2rtpl1xo2d1we1n781j5g7ge6fvea8wupk3bti4r4sgvb4xslzy2k8jvhhi3cb4of',
                receiverInterface: 'bcpmle16v4q51mvol6x0xjhff6tt8p5kp52mqrs1om14b716uu00t7wizyrkqdmkf9temewp3h4n7qzn0px80fcwhhl1v5s7bfoct3575l8hp1lt3agv749t2zw1c62y6ch34jw1cmkkyw9hed1nuql7abcgtv05',
                receiverInterfaceNamespace: 'xl7m7kg03hg629msfessh6f6pahpm2hdtya3zsb4jqnvckltozqu42hgcshfbxl3ol9a0bf32iemzl41m7wxactt6askb4bbe7u01yrkjvxwz105w4adqqjypqi4kl0ib5qa95y9xiwwhvvd27i3kruq01l5a7f2',
                retries: 6561739947,
                size: 5173296782,
                timesFailed: 3003263393,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowHash must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'zks0cxjas28pank0pvbcb750fdhvlzvwcv8x4g1o6onk3g1qm2',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: 'k867gzvzf4dxpwp05gu1',
                scenario: 'kjowi0snhxdtwili4jbpvbp7ynkx8sk98s2chg4yi97v7pchdlvgjlv1th32',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 19:36:41',
                executionMonitoringStartAt: '2020-07-29 02:20:43',
                executionMonitoringEndAt: '2020-07-29 07:01:18',
                flowHash: 'ookbhzvynadirdl3lz5nyqa7irwezcq9tkpnvggh',
                flowParty: 'yyk6qgvnewzphzb0rke6v5ei0sppq6zddllfbo90xm5ocrel4gl8952g48oeq38zoqflqfx85pq7alnlfqz07ds9yvdej8dqxifh8wa56vesowietzo2i89sqjjzcahc9y0ybua4ed4caicf9hygpe4arjias9bc',
                flowComponent: null,
                flowInterfaceName: '4a1h97maee0tszk5601uw39n6kcaim4ga3wezjk3p93svzeg0rv0c1bnrt6lxp7izxdcb6jnj51dqdq8a098l88b525txyknybjx1o5yxmz20c5fom6haq993irh55ayvko1pnc5g41kyupnwjtedx7can7qx5ps',
                flowInterfaceNamespace: '0s7wvvjnqf4br7rgm42j62d0su9p1tfsb4nbwkpv8kaef1tv22h97856ahnigfz1y57bx84ugx4sk6kw4xijogc25ozr9pz7p1h4sfjwadesd4xsqo1tctpxb6kxubvpboozur6fpktabet636kf3faqjb9gwd40',
                status: 'HOLDING',
                detail: 'Dolores qui nulla saepe earum veritatis. Dolorem fugit voluptate. Beatae quibusdam provident et velit sapiente dolor pariatur. Soluta ea omnis eos alias et debitis quia vel. Hic repellat sequi rem quo rerum vitae sit accusamus architecto. Quam distinctio laborum odit sit deleniti similique.',
                example: 'jb388za4fr3drscsf1s34xc6xcp3yporkdx3jf35cg23i5itlddvg4axxqtoeyaqlp2pum92knhwnuwn1wd4quftmcxp2h84uf6q505a1lj517j3ynn53klaaluscdaxixr4z2trst1hwczcvfo8c5t6ytzr234v',
                startTimeAt: '2020-07-29 10:52:29',
                direction: 'INBOUND',
                errorCategory: 'zaddy1tqpcb1la9h1urlucva9kcjjzfdxtoa9ypafuk9pbm5qr5ewrc8rpe7ta04q5fd96qlitpey5l4dw4ad8v801r2i49cexc89cmfxvusxsb616b6sb7v8nkkezuip05lzt16ccuvg55dou8vn29qc3cfm8n8',
                errorCode: 'y83nqlur7rkgz9igxdcqmuykadjubb6n1myt9e41irq8n9zvrp',
                errorLabel: 632139,
                node: 3596956399,
                protocol: 'yt9u6muuz6igt1t9d08i',
                qualityOfService: 'iia4up7wloxpxbiajz4a',
                receiverParty: '0tjw5dtgk0zgxppzpqv05w4s1mghm98frwgu3eilty28wxo42cvm0ip4q8r42rygyr740kze4zv9k7z3c6ru2kx4dhnt00dy522toigjdr298rh6i1oaqjq81u8l6376e59r5hhzgt23ryrojbpavnfy0yswslit',
                receiverComponent: '6f074fu7lfuym9h3vkktt5jaumuqyysrqwjqg8wch9nu462wysjdy4rp0gvh1yr512fznmz5184r98juu6jysk0lrrm0otk74fpif9la46t498moxq98i9b777mnwlik93mkjy85wnmn2cqd22al4awcfa6rue57',
                receiverInterface: 'yzu0qqbqjyo77wajqqq0kji45685jmw3qqs694j84652gdqv1abme762jj3zg93qnjdpv99o0qf4ult8slbevebug0h1sxe9jl774x75vi0mo8r6lcj82ufkcu9chnfsrxbte31e3z8ae1qeyow5o45i3wdfpt7y',
                receiverInterfaceNamespace: 'jnn1hltjkia36ndljr58yp96iqri5yqu2iz5vqo3ptk8v9ekisyfbdb55lu6e5xlnb6w6zho5a9l05mdqjab0dt6pakg2pugm78pbraju5scqr3kpr6t06ffcjrypu0pzursxh1x93xfpnt9ibyq463na1vx6jkp',
                retries: 3955253108,
                size: 8296439813,
                timesFailed: 5039989257,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'mflhr5ktbgbjp9vckeveese987zocrja8yxot9sodlq3a9kcq6',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: 'tu5cezv2awpnp9vux8jh',
                scenario: '9cgwgmgnrsrid3onunru63iwaylctwlh20jd5hin6n22195ca7j025knov17',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 06:55:58',
                executionMonitoringStartAt: '2020-07-29 09:22:18',
                executionMonitoringEndAt: '2020-07-29 06:17:47',
                flowHash: 'vddr26n156ws1jor0i1kvbv3jnlmumqysz0md14c',
                flowParty: 'n6btgq32kunnq208p8uuszbn3fxsktkjy6ym3e3a80tz7j9rqteafq7hz42g2yqm7e6rhkpa6z3rpf5lzk9mp3sbiwb1gjppo093g0xc6b8n0feuwus4s9kajkus8nfowo0m7smie2t79b59ywgzqrvxvch34st9',
                
                flowInterfaceName: '836kt3rd4xscdm6hntsfsie75urulcjm0821h2y7g1k02l1he532azl14a8asiudu2zr01gkge78vfu8eu850plr0ezv3i9vdh6fxpuyy9vb4oe452vcwq3ov0sxt6ulrre05blnge81czgcil1tookzct0otn17',
                flowInterfaceNamespace: 'x9osf89n5badhgyatxglq28zagn5b7kw2zaqck8y85kvtqw40tid0ol4iz47s4rkgijhzubf84ode2pd1ncm5014as3x5ejfxpavds3yb82ltkie1thyzc8xgdkwhkovmm5dcebkzu2i7ch4c35fbg8b314vht1w',
                status: 'WAITING',
                detail: 'Nihil eos pariatur. Beatae autem quo. Velit rerum quis exercitationem aliquam sed voluptas sit vel.',
                example: '7f71tcpkww0ksqzn39yuozn9upc7jo4fu9myy1g7m41ou8yfjmybp4edbrujyfdhjig38rkqbopd7q5lvhpemfohahxc94h4a6p0g4y7mxch3d5y9idobu1md9psgglp2eszf27l5f32xvsnxbnoiktjcblgm71o',
                startTimeAt: '2020-07-29 11:58:28',
                direction: 'INBOUND',
                errorCategory: '14ri61m2wu5nvdbilqvnszsftlrjuswi0qe94gwmrp1q2gv2tdamdbyh2yp7jkat4useyxn7v2l4o5em7zhcmxtdiod8aaj824gq0157fw2g6yxaihrqy6zuw1f6gz7e50k90xji227gyg1qd0hdpxh927offfti',
                errorCode: '543vmmm16rugr4w8a2d76wqf9kotxhrumch0rzk6wi7dcr3x3m',
                errorLabel: 109107,
                node: 2261729715,
                protocol: 'nsqvkgbugc1jwio6eahw',
                qualityOfService: '068vwcln5g425polxstx',
                receiverParty: '2tfrtllzzwhfozgc0tjbbflqsirqk6sumhqcuiuumcnyru5e0wjxd19tkac051ndlq73bli3rse4r4hbwkd70bp2ilf5gvkwrb1xt7nfps8ejvpk68xrjxin8shrhyuh64280hia86hsbk5kgp2wxewr9enb2l66',
                receiverComponent: 't8u28a2lrrtue5n115ht88ppvwj6ozt9rz42q4u19g0cu8r5m380i0xhbpl7hjglq656hpfzaxudh1kfg7kgdvlicougii8eqozi9f3kp3e104v4v3omfy1y734jvmpb1ygmipc90bgv4yriul3qydr29hj2xc52',
                receiverInterface: 'uwvzdhr47pdglnwkewodgf4n0dw2gzxnr62a3wh8xh44u98043tw2zlf5t4jew7wy0uwu677810wcu4tw08o109tahifbtzq64eteyq2u7rg79dtkn4ldcqten1l96130olnyuhsxtd5o09nlompwf92womy77dp',
                receiverInterfaceNamespace: 'gjttpdntuuazan3qq9m0787kdgk40otof5e5rf18upjtp62yyg7vp7ogryc15s8h9ogxx1ul4osflljjdaonbvdvt5lz3jib4z73fcgc6gdh95waf347jhhjklrcer6eiqxwdu8upi30k6kdi1pi7pl4pi9m1nrv',
                retries: 6647755332,
                size: 9056304884,
                timesFailed: 7052983905,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: '7y8763h3nflj1653p08hmramrk3hokphv25qy0p96yt7a1s3gg',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: 'yvd8k71812jej4ikd5cs',
                scenario: 'efknp54cc2vvpmn09evlpjdzpjbn18i2up7zeo6r9flwx92m3nt8zu6du4g8',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 22:39:47',
                executionMonitoringStartAt: '2020-07-29 08:47:21',
                executionMonitoringEndAt: '2020-07-29 16:21:03',
                flowHash: 'xas8kk16vip259ai6ob0ilzz6dw0oenmzg8xbohm',
                flowParty: 'o65nny1eo3hyxxlsefjd2xjvjdpwmw33yf0kw04439b5ytns4fjl27rb0f463m9pg1hb51rqsfjyiuaz08gez17ai7esf75tmpza42bkcfyozr6bk5zhok33no15bd5yy5lu74q9sv0ivguq4h9adqy0n0bkz8x7',
                flowComponent: 'xt6sdp43xcilcrr2fu6j4ok26mu4tr3h2w7b9f2q4x6gz4ydvm9a4oz321kc573xtyd2qpk30wtxfmzu60tfjv7u4uulpbfdq0uw1rilojvvtxjxeyc5mil3qywdo4eyip8x7pn91tbdtisvhuw6ves0axlxisy0',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'of5a5519uroy175n0kfy21hbl85hqd45kogu6gc6claxx28r95l9ayg97d6ontfk73313vwyjw2vup4rc9aq9c3u6brgxc6m2fl3ci5jrdbqyz8digd4k27dtypu62sbt7si8vuzrco8xuw1r27jon57rve2onae',
                status: 'WAITING',
                detail: 'Exercitationem eius dolorum est nulla. Nihil porro vel eligendi. Esse nesciunt tempore dignissimos nisi dolores qui. Et est et. Facilis ducimus maxime velit.',
                example: 'j42tp30w0hnax49leeedeco4fq6kttg16il78bgyhm3cq77m81ou4d50on6zp44l6miwcgsutvb4yhf1ddpodyac5672hyj0pjdfihh0eat4ilxcxisvbqt4tfca2at7jf76dopp1sa565uxliwkwwevbzvmhlr7',
                startTimeAt: '2020-07-29 23:04:28',
                direction: 'INBOUND',
                errorCategory: '51r8t3jf49t8p988ro00o70v2bkvpkd24lxuh083vtirkpsnicgmfxkeoi1g6w8hjkqm9i325dhymn30gleiguro0iuxqyttf566d0pfouprdamq6q11qjqyote2nd0popm4m3x6a0525e0my7mszh7g5mc2umhw',
                errorCode: 'hbet4tf4hiqztgoyj9kd5bulfk6rtcvlvr3vzz12txvg4lp0nc',
                errorLabel: 230641,
                node: 1844922187,
                protocol: 'ys848rw57omfzqp2veru',
                qualityOfService: '3alvukk76yvk3kz8u8bk',
                receiverParty: 'vm0v4dy1g39nuk75cda7r1smq5od3w3ka2uyfuew95q5crce9a4gxlac15c720geipygsglrgk8n7tkkd7lkukkci5b5qtes1a80tmvyy9wsj8lbteeks4qheu3yay4lx8mua0r9j357d5tah5rc0ut5ltz2jytr',
                receiverComponent: '1msf4qfvyyp246yfmnte021g7jlvuh42pluth6fe3k4u0yreeaxad79xurn2oeehd36hgo3b69piivizv82em2thln7we408cb67knh05s2vil0hf0v5ilvnkwx90lru0i80swo07horilv1dfq54hczzq0hxuak',
                receiverInterface: 'p6g1sgxek298sleym4m9jp7i9c508l1snfmb4nmtd3yhx5ekdm20puykpki3qdcf8226bg0d4fhjfz6gy2iue8mgm1ymgb4bbciyuv14ed072n4waapwu5axk4zd2f92dg55j47ebrd1s6g7ufu4zi1c31c20eoi',
                receiverInterfaceNamespace: 'l3m3qva5j6z7w6tou22bfhvntlkdqzmkwqmew0oisbt6qk475lhwquql3tt1qskc5tkjfsrmmkpg63mg3c1wszypyvskfpap9fsjo1z0tryfpjn66fojbybmiu9e6hnh7fsbhtedi87da8826r059v238ld68gnq',
                retries: 1443155854,
                size: 5472513173,
                timesFailed: 8564758141,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'dz3518l7d1p5poqye7t8c6uercgvt1q2p2m5hbbevak07nqr6f',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: '8o83o9ad9hj6ks61q9py',
                scenario: 'sc52cxkkgw9pl4nk4mnxq6eqadhm2tg0g6cb0fs99yerdpp6zcm7qvq3l84i',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 22:38:14',
                executionMonitoringStartAt: '2020-07-29 22:22:53',
                executionMonitoringEndAt: '2020-07-29 19:36:52',
                flowHash: 'eaqyaf9zksf82ld1jiy2p05v06z0nicq1a5smd2q',
                flowParty: 'cb6715rklnjgqrcn5gpzsgvp35rzv8fe5sujjsb8k3c3pvxb7vreswybkpycq6z2ybhgfj3gia5mwfi524ss7v70mc171z8sdnwpd0oleo3vgt9wzyjh4dayy3qdn4srbcg2rjh5ixvvbh2jqchzsj2uirv255s7',
                flowComponent: '1qhlgweky4cav2rod2rmn2n6v1e608mufccq5zdd5e1n3w02o6czqcz9saj5mnr3onfofwt3kvk1b9vvy448y7z50bnhky1mjzrd2yj1p1cwxhm5lf8qlazxmnelwokythnwg7utpzpo6evjsdbesetxpip7ql6b',
                
                flowInterfaceNamespace: 'munueuu9zula3qudwx0tfwoc5zyeo8xj0s0hwk4q6foq2me2uhgz773grx77r392q2ht6k5b5e2e3t600kwh9b7j263yzr4wbxlekfuwg8lhr8xuvhhsqbr67x5kye8j203i90tfnifma7vft9ojnfy92qsmz8e7',
                status: 'HOLDING',
                detail: 'Exercitationem est dignissimos sunt qui necessitatibus et nostrum sed qui. Rerum vitae adipisci eum ut optio atque quas. Dolores dolorem tempora odio ducimus ducimus quo distinctio est.',
                example: 'gekf994yitspqnng6niembwzpb781g3j9tiy94uebw0gqqdyb8u0dm6ayem90x2i284uus25sci10uqhf3zz0qyt7lapzx2udhjhf0prlgm0ivwk97z90tp126h8emjdw7c9pr59vr276l7in4mkdov5cnwsedyl',
                startTimeAt: '2020-07-30 01:48:53',
                direction: 'INBOUND',
                errorCategory: 'q9i38clxij7zz9btkj4ynqxs6te3y72fqj9mf5n8wz8hynnhw6ae5gnw1hgpmwi01upap9c99g7mydlargtcahkcujg831vg3domx7zfag3blot97pq1089grl3zoe5he45b1bubpazrmbm52n7i97opsngk9kb7',
                errorCode: 'w1zfyp08rao4nh68aapvekizrg8df7z8txaww3ytsz4h3wjhkf',
                errorLabel: 126890,
                node: 7843214149,
                protocol: 'om4djsgj7n1ols6vkvhj',
                qualityOfService: '4eac4mg80foc58cx7azm',
                receiverParty: '8nh3eh4qn8f1lowlmilgvp8bkev8lwmimtrwfghrjar3j7eb231ticcfjg31euxtlosks3qxn61mvatpcjh75bd38q7guucgpzz5isqe6vefrdqb7w0x2bm8q61hx3wroa5s1j3c6o5yn7gldrasmne5ao1cvgg4',
                receiverComponent: '6bqznm1h0jo5o5wrngde2sa3s96eqj1yk0u5i0o37v5b53we219xsroc4om3b0mbl4sdpy1o7b31gr4bcltdnrgpwc9vf4ngk5b13jl7i2nvng4nhexwpk0hwyxdsludkz9iw0qac5qddkihjpedg6bbaadjtpmv',
                receiverInterface: 'p25aym4qus1yjtnvmrr4c4nofegfncsmm7jmp91prv1jhorc04evzjqcom7dotu3cx45rbfd5qvs92hbb2wpite5j9epcxqyn32mrzwwteoi7iw325gkm4gnw3sgivbtl8eh0k4d3b25ldqacq90fq3q1sra473b',
                receiverInterfaceNamespace: 'ed9sk19e1zwxkzk35x8k5b6cpri99qj9l05zxewqxh87y6mif04imn0e2ooejaldo45krdelakpfdqzioaj5xwv2yz7a66agt6bw66fir1rdlbp9y5r5omd9tkqzrkzsgwg4qy4f8hrxaw3z44vj8tso6o5bqq0l',
                retries: 7542190488,
                size: 5880321087,
                timesFailed: 7194380943,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'fpdv1aqgmb3wls9pcscge1net9omy42rzik3mrwvrctuy1zmk3',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: 'ypk3vknj58vng0a3xi23',
                scenario: '899rhiw7f129o0f2ymerh48uacwhsz6nllge4j45pe0xdpflab9oeb7e4swc',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 06:56:34',
                executionMonitoringStartAt: '2020-07-29 20:46:05',
                executionMonitoringEndAt: '2020-07-29 15:13:57',
                flowHash: 'pnnrq5q8f71ugkqnzb4lytoatntke2phm8b6tf1p',
                flowParty: 'dafivoqjni2vpx6hgca03hp5zrx4kzuujsat8cfoe3mt9tlkvonsk15kz445gflbfgvv0bv3uy398o5iryzaqix42a25q2i1f22tqgf7370ik6xhjg2blriempx9o0qq0dmnwraebh5y6nh43thsbfh16s0s785x',
                flowComponent: 'pfjzbis8ae34xk517y4djygukg9vq4feg5eyd5f56t1gi5srmh1u91exobnoffgb3l8b1swrcz8t1uyyyzjf6siqoqssqzcjugvlboxutgd9nxr91xch4v1vfd6a75z1ylmiyzx8c9g6w5pf695ywrp2gm1rof68',
                flowInterfaceName: '9qo8o0htf6ofmomaszqkspsffg8hb3sp1jyvjcjx0exjp98hs0e9jvibnnq5953xzv7aclfstccdr1t8pps7xn5apiq57x30c9rliczth2xk7xx84mzq2fglmbj6cgfzgz9zo9ttip5vufh5rxvoexoyb07vt13c',
                flowInterfaceNamespace: null,
                status: 'HOLDING',
                detail: 'Qui iusto repellat illum ab provident debitis. Nobis delectus repellat qui voluptas ipsum mollitia. Aliquid dolores recusandae iusto et facilis aliquid. Quo rerum temporibus ipsam consequuntur hic. Deserunt quaerat et. Ut eaque mollitia animi dicta vero.',
                example: 'brr50tl7h8j8fncis0u6sh2ed648m911yvgc10l2su2dql8crc5ub8dp8txnyoqp85ujt8em0s6rl8im1i8ore8su9ezmhks2j10ewc7o0bzxfjfki4935k6p3nl0vynf2psddoop52t8do19dg2y7py44vmlrxr',
                startTimeAt: '2020-07-29 12:27:48',
                direction: 'OUTBOUND',
                errorCategory: '55ig116v5746mbbsdez5i3c45pxyhtztn9xqgi6rr15a8mft5o0rib8xtrqmly16xeca3cjeknvwlxg1njclxtrn2sdnsm63tz2ijkfodoobh86g3alcf31ujjflozy9l02bg70rtcrq4ri0vf0gwny9upx7b11x',
                errorCode: 'kxrdl6tuekd9t7ibjhr7u9bd8ioy4xvkggp6hkd2lii4lsrsem',
                errorLabel: 673998,
                node: 4207555204,
                protocol: 'tyv0trmb5rru8pwy745p',
                qualityOfService: '83knfwccby2h9zcqh899',
                receiverParty: '08k25mrqjuad9j9gnqabz77lzzrn1nu17sfenx5fraiwlu0lw39mo75regn6nc05dsklvc3vipt249m97m1lv58gk2p0msbpgn0v42kaqn1lfpaeas8bq2blg9h9zqhvkzjmflnvtw835cwe1o8m9xlinchqflmj',
                receiverComponent: 'tqna2nsrlp8gclbo8pks58t2z317adkrt8g5tuqqj8e77v6jk8ml2vh2ybhygref1tqnbibrlx72xlp93od75g8kptozfyimhut4c93yf6taxh6jxmsmugorli1qcx92opxzk4mnnuc3r2za5yx5uddqd5c7yzol',
                receiverInterface: 'w1wjvqek6vw159y0dhk5pa1wp2dkkunfvqt9nl9v4yzl9eiz0r5baoif8j0jrhf3huln3qpcrdpxnq0w4ik8jvwqrcu2fc2dhl6r6qphh439aunymlqt7dig69yke9r7ya4heavr99e0bs2oy4j869fg13h8cmqd',
                receiverInterfaceNamespace: '5hltbm6fggtw3pta0pq3xpwx2gbbznhiqj8zlmactgrl3wtzaa84hu3rst3idai8pa0nam04w1lwox32qn6avy7sunhd3p58otnzk93wx4y6vfwhcgcck2g2cq2ace6u6s37h8u0hoalybkxq2bzesuzy3zz32y0',
                retries: 7228797743,
                size: 7284621014,
                timesFailed: 6671367492,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: '9z9com0dxoif7vco37jts39f0x37mb037zyefmp3v0frrr1obw',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: 'e0fc9uz277k3rlxkntm2',
                scenario: 'y9z9jbe5lp6jatonxvrt35qnrysysshneehxjh7ezzm80g8w0cau21l0l4df',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 09:26:52',
                executionMonitoringStartAt: '2020-07-29 14:29:18',
                executionMonitoringEndAt: '2020-07-29 21:23:21',
                flowHash: 'aouqrv27imqcsgw5m7m5wldr000ajw1txzqg4gmp',
                flowParty: '4ppe5jqxnkshqp183q7upapxh9gelqcdx66y46x9m9c7y4e7t1fdpdguvjz7brw8n1doixpno6t2y4d5pbooqqpsgrawbp934olirxvxoqd3ovou8duoosq2a25ltfc82t0ko3b03bmfaq4dhcdixv0ren1olox0',
                flowComponent: 'i1is3xpy5tw6vfcoqw49cold53jdld4w8uptdhidwlpz2bnueix2hrbwpma7ty0dhynjamwsr9sdhnnssm47urko9hvck6ik60wi13638k6c8psh6bs596e72xwiwilf42pdhrhx07usxjiif0b1cbccm7nk3c20',
                flowInterfaceName: 'hwdtn0zmev43c4uj05jg0xlizqirt14f6f93mlahqghg6b3un4lbntrjpv4205lfgnwmwp2r6gbxt7yentanrbtsivpoobmsnvv1yic70sp8y220s45alfvrwixldlppymnafvk8aec0ibrw1yz93rrxp7ftvub5',
                
                status: 'DELIVERING',
                detail: 'Dolor cum facere corrupti sint assumenda rerum voluptas. Neque quibusdam excepturi quaerat vel id. Ab et perferendis id. Impedit amet quia rerum. Aut quisquam molestiae est ut voluptate porro voluptatem tempora eius.',
                example: 'u2kybdtrcz3secxkxdl0t60dzv3bvi1nopm7ylbd7udotzx797440l8376ndjp86kp24igew745dkwj64puu82awbdot1rc3djq1aitcrisyz7ltf55skihvdzurb4vzkk6ywx86r2hogo3w0khoq38motm520eu',
                startTimeAt: '2020-07-29 07:46:54',
                direction: 'INBOUND',
                errorCategory: '4v32uwt5t2v0w7duv5sxh25zri8hfoc2e2bx34npcx40rmsga1svvw4qqqb3me6febn2jajca41sdwlkithjx2f8ut1pebwsp8mt65dv5mt0x8amn2y1im1er9ezz5ofxtpg2g14cqycbpei2480z9de47eavqh4',
                errorCode: 'zpem55wj4ak4cq6vqzwiflrm3fxufjboehsl78uhikxo104634',
                errorLabel: 768370,
                node: 2776973638,
                protocol: 'v0ic8dvo9necutonls9p',
                qualityOfService: 'w5ywyhsks79q39ahanlk',
                receiverParty: '6bn0gvuq8ks4a9qj0nmkt31f622qlkk38isrxbb5stzizeqpcl99jfci6efszgqdui9ot5wwu4axx1j9j898dlv70hi5z6gajxqazt6986wxnuxhy6in0d7izg6n24ic8kayxl5ngrsojdkiaf13g0h8g5xre877',
                receiverComponent: 'dwznretcwpbhh8kkiwsyo3bpoemvmziqwsuk353qhkzu404l2r1x8az7qfyrb7fjn3zmjhdkpv1unwi54olx67p9dwtl28vkeueya8szj2lgarfif60esx8kb3fhpiba8klxp9khakss091i0m023znxhks62yle',
                receiverInterface: 'rl8pkp57kv0j6oow4s12ld48ru4c70rs2qbo4gh6n01gyfzt5rzkjast88zd43s7492qfiwlcs68o4h45whh3r7wcqyarasi0k368gdt3hwpg80ho31rvbnorpsabnk1jidyarwymfbqgc1tzywbxqi2zb9t6qzw',
                receiverInterfaceNamespace: '2uqdo26ajnco8sac71i0orjrnnsahru4xy5fk6i9zpqlrp8u7aaoetmlve9h4miaplsl1t62vxofsrqe0a1fislr417tf2qeffp6xfcnh7mzsms5sffh68jd2ghul7xriit95jtd6yhcjucsrwo60ss4omk6qoww',
                retries: 5634483878,
                size: 8546485621,
                timesFailed: 9838684096,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'kg3fyq065l62rkn4bko350qq72ihyhnw43au3u1oq0t8tnulpk',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: 'yvmrhe1uip4xvypdr2yk',
                scenario: 't4o7wbtbkwtqdqytvpzvuwzzd2c12w7gff3hexvev2tajw3mxdsmjebgr0sz',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 14:14:28',
                executionMonitoringStartAt: '2020-07-29 03:52:11',
                executionMonitoringEndAt: '2020-07-29 17:46:15',
                flowHash: '0rsegbuvz6fyy7rn7n9qbscx37litqo6vjsgvcvu',
                flowParty: '0ml45xbdtjpm23wfoz6jpm208oq9l0zu8s6x0yf3qxz1os2md9x9uqvy9hzkwunhukov25z47yp6b3d81rlnfrw2vy5rkfvnxtso1bkeivz718tu5p8ucxpxuuaisuh06ig7gu65dqmfs8jekge8fgnx1kh0uu9k',
                flowComponent: '2vrkvecv0n5apccrrfs82bw1b8eevoeynp81i97oq8l9aclwk9gjaso1vgkr4o1sisjsizj2xnwg5gbteqy0lk1kac23pum17k3rr2c57szs7736zhfjz9dq2z6bwk0vizrreph6r3tv8z57hmom978x0uej1f59',
                flowInterfaceName: 'zeyty0obo1rtma8ngnf4aum68y676lm06bm8d3a2b0e34x8rw4b3omxuvd3ikk0lr1clz7oo6rgywghz3ztpge5e7d4oqzamqzyn6zvz21y5vsyl8hssdtpxc3n8thutv5yntd7lqi8muax99ixpc829808965oc',
                flowInterfaceNamespace: '8o6tjnca0afea900guukh8nehb3b0v0xlj1oc1iym5ss7kxanszsp7iz4v8rw04id6v49dnid6r9h3ysr3gvj5wu5ojdr6axu7lza6p8n8vtqprk27wfc6isjef6pal0ib22bx8mpftnbfm2qq5dvp3fzvoni8it',
                status: null,
                detail: 'Eum voluptatem rerum perspiciatis ducimus qui iure impedit delectus. Ad harum at eius rerum autem. Repudiandae recusandae nobis sit perspiciatis reprehenderit tempora nostrum quae impedit. Adipisci omnis sit doloremque sed placeat aliquam. Eaque odit voluptatem inventore optio autem voluptatem aut.',
                example: 'zj83gtmxprked5x9g18vgd9avsj8kuzrcawtxgicsxx9eep14aheyn13aqaj0d8a9lh042v9nuxvyfc86f079fqj5bxb1b6gmz0e1yur7r8si498h03qeult5hf6kvtq6gut6o5erltkhbnpwvvlwqke2w8aoupf',
                startTimeAt: '2020-07-29 11:27:57',
                direction: 'INBOUND',
                errorCategory: '0xtji1zy0w8zgam4j1m9wpt7rr0c6wciqystj0whf00c14kpbhnmmq77l5f72zaoakfb9v1wx4s522j03uewkudra1h9g4o4et518asovqdk4w4imgjqcd1t0cq81n72mw9igzopnmalrcnytygwywr3cehtw28l',
                errorCode: 'vf3ih2q26g5trdxu7w2aii41h4tb39dolio14hp9j6xrw4wn26',
                errorLabel: 268747,
                node: 4234474384,
                protocol: 'oxk4vtv2k3wuvtj7ae83',
                qualityOfService: 'p4wy7zt6yuq3c2idi4zp',
                receiverParty: 'tgwlfewr4qpscgxmsse8ukcvy8kua0j1i5ie0yh6ixecb884rwzu6qce1z0zchu77a85e9h4mh0uscei4nv11hrteisvl6d7v41eq4up4vmfqairxq573x6b0fq7gcth0srx5bn4d5ags65uu41q85lsuy3agypw',
                receiverComponent: 'ncpjhksp8ce02cbw1zzoychoy7j0fv04c400cmebri4qphi45r6htxqf6wdpngmutihhnayhx7zgbeqibt5v2nzws431q93h701xdujdfu5ujknwxrjlayv95fxk8iay5thld3pascazphn970zh3zinlf47r4tb',
                receiverInterface: 'l1snpql0zyxee0rndsv1plvttadnigcc8s9sldew1oe13tcnompg6e79j9sxtq5gfw3lqzgkgfoj1ndu3ma3c0pf08tdsg6sw7y1igmty9uenmkzikr8s66yfh7a7ngcfsujwrtwkm3m3zi4iqsf939qceav8wpq',
                receiverInterfaceNamespace: 'agglnd5jb3bmebv1v50tfur0gp0kqh7q22ooi30dimw8cbtdkd7be6r5lewu2ealmyplaxxesidmth033cx93l7ugpaqmcev5m0du72gju8ez2eqeqxjomwkh26aqodgjp0tvb289wem1kbzwnp052po1p149olh',
                retries: 6584896604,
                size: 7406686319,
                timesFailed: 9444421008,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'cx1d1qeqbxs9pvn8mnob5n99uga23fgea57vtjma6g5xh6wiur',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: '2x87g03li32uw2t5pevr',
                scenario: 'e972tl33z5ci6coikpglmmczv9e55s3fbj08wo1h7aghzd3o643a5vocts9l',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 09:19:09',
                executionMonitoringStartAt: '2020-07-29 04:43:51',
                executionMonitoringEndAt: '2020-07-29 07:45:26',
                flowHash: 'xuse79vk6rfzfe9tau2yczux4qiinsu689sykx7m',
                flowParty: 'pbq2fjmxhztlk605euwytjdwnxw2ufrwhlks5br41b819mmvgoeey0l85doph917m5piydnjf6iv86zz6ihgqr04w7hbxgu5it40v27qw0v86dtflqkcweb70y60qwnmqi38009cuv69hxwcvit7x79zynu7dlq4',
                flowComponent: '63bpnbbol0gl9eww1c6fr6pyp4gd8eclu8sswoyqwqmv64ddy6m8vg4buygh7mxi5lppmorv5mxe6bt2n7bmsnedli6i4l9rnwrfjd3p0xjcqtgwpxksk7qaf4nc11pfzb0iicxvmf9udc7355waujusyc5w6iic',
                flowInterfaceName: '6kwxxpw2l6it80pevjpp0cpt6w0x504slecq7zabxsp8b848wnus8nn3gjdhdvf75zsoi8ckk4zjh27z3j6i8r3wr7sr5bn804m1muwt8v3qa0e86c3ao6rhl7ao9icmz043novlksew8cf7dfcdqkyw2tdab6gu',
                flowInterfaceNamespace: 'jpkk8g2ogtapzvon4k5ck86e7lda5tnzrj7dc196pt3chx57gz65iuuio6eyvayeyp5kys4hmyr8lmwo8a3o91e18ahslo0hkqf9yx97kc9u2tb7to60b8guxds5deipstftltir4r0g6gw6s3fwnvtesaeetbx7',
                
                detail: 'Libero nihil consequatur dolores modi eum sed ut error cupiditate. Hic consequatur adipisci et. Sint sint architecto dolores sunt esse praesentium est enim.',
                example: 'sxwwwwtknidjn4z9otfkjiqexc3ospegj2ewijwqxq0ccob9qmuq6lda8wcc9yuhq6yofp3cg3fbydtm0x8uq2aaq07wdwyqgq2zvh7taigmpmcsi1jwhduzsr61znwlu60338rus2da416cffjqtrvv9dldatmr',
                startTimeAt: '2020-07-29 11:10:05',
                direction: 'INBOUND',
                errorCategory: 'a64nvp1leosqck2zt3zpv4csq1ac8g6kvvi2cakv6txh3o8mz7ekfjtiwtfx1smy3rc4ufbd4htm5hk7hk622u3ezcl68fpfuu6p9l28cn793yr98olhye1gpy99gfsv1legf2ilwnexkc32u9rv9p8lwx47bjka',
                errorCode: 'dd67818iihb80e0i8g7db8gou8p024xmkmrmc0zc05ugtywwbc',
                errorLabel: 267824,
                node: 8898361990,
                protocol: 'bb7jrmhwufxu7o0cpo6o',
                qualityOfService: 'owqyuuavxmye8hc6t5nr',
                receiverParty: '07jgbsvf50rca6jlautlatv3u24rlvywx96uqhs7g0nejqh3ns2oj9g7qvbsonemm3l26817s7raq6231sxy19bs2f145gx8dr8o45k6zjh8cwpvd3c00hyncvryujwzi6jwc8fr772x4qp0e5513jtzbraivb72',
                receiverComponent: 'ivrscqb9ehnan9qsks1ocsdamw8xymo58670ie5qmut8zzz9en2mxm5pax1csgwh0h2jfybftbn6kbf3d2fjh0cu5s9ysy5uvh08nh9327bae0rayo90wk7qgzi6w9xpf8hdjjzacfjzidl9evblr0brru514bvj',
                receiverInterface: 'sizp7gyp5pifrr4ullmjw3f3ezhtsheyumclpq6ba5rqsltedhsep2th2nu81zk5ei2pjd09sk9yx5t6nhhfzzdf1i4h5xwcckrvp5oi27tfqx5barmw5tmixpx0o1ozww7l8oy7dbgfr7k6768ienqwkl7wj8k1',
                receiverInterfaceNamespace: '9vharzq8cjn6uj9uzj4ayi5z0avhnd898swy73k0lbnilvbmiv5eocp2894kf78371nhykn2duwww3f1ohvb9t4nxkcrx1tormxknzlow328frkrg6p1pcgxrdmvyosi0bpyz8yfsry0b88id6ft3fxcmi9e7mu1',
                retries: 4758399444,
                size: 8126187058,
                timesFailed: 8681660451,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'opmdtlqp5jfjyq1k4k8th0r10nd7qxz9k5gztu4i8635eropvg',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: 'zsre7u9g35oo7mo0j1co',
                scenario: 'wvwrwtwq8zfu1hz1sn3coey93qv4m1w0tmrohylkm8ppyc12ur2ego0t37ly',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 06:52:11',
                executionMonitoringStartAt: '2020-07-29 21:34:19',
                executionMonitoringEndAt: '2020-07-29 17:20:40',
                flowHash: '6lm4sa1y4np8t2i25jvrpuu3zw80gl0lyf8kdray',
                flowParty: 'm6ppaf0esumtbh0v9vvr7gr88q6wkg1h0khl9g8pebxj34zncchp9phz53bwnb0ge7mq6r4sjyw3ioc3kmjrv238jpv9jb0ozjco01uzjn2ss7adkgeqxkhxrhqlxd9d84yzlprc73dko12i3latirv4g6o34xyh',
                flowComponent: 'atft7afd0qlp6ap96did6jmcm0hmombt20enppglomhme7naaz3hox3cyn52j47fhdar48bjz543oafvxyl3kpoactt1c6gwps0hey5hafcd7mpiaxkwiusxp497awjhtu42ffd6v8d9jncixv3hw3lxxzh0yztu',
                flowInterfaceName: 'it7coo7605lb0sayljupp4oj6kzxe6mkejelxo2ldvo3mdr0zshpu1s57ycgztc1bqhhcql7h8rsv5hytdk073gov3yosrlsjnm37ano8b2ox7npk64o03b9codob8bfgnhc9bbr76kfiuafcp8af937spjsl9qy',
                flowInterfaceNamespace: 'iwzis5skkbxjfcjp7c36961gj1lwlzvph1jufoheohvvfcyzjb69ndvciwqv6whe20l9hu4ns1rztuzi8y6jjdaux7g4d04celwxymf5n3hxvdznvvmqr46otrxx7f65dpd8ho6y2t0y5p64teqvgwnak6kvqbg2',
                status: 'HOLDING',
                detail: 'Delectus repellat dolorem in. Aut quisquam et qui harum quisquam et. Qui reprehenderit blanditiis consequatur ducimus pariatur qui quidem praesentium. Eos provident magnam debitis natus. Similique id qui in commodi accusamus neque. Debitis ea aut harum quas aut.',
                example: '5fdk8npu9eq00jpmkx49g3lusdhgb8zdi8m8texcdyxhsxevbeueh6a5xt2mkmrieo8zlwlyzt8tf8yjrxwv23oje5hjliyacdp5l6w5y21vojh7kj9h3rzsxk8rksqxz4bot18oabrr3l13m4e2vee4z2oblbvz',
                startTimeAt: '2020-07-29 20:20:52',
                direction: null,
                errorCategory: 'cqesnzf34ye51e9e4iki4wtpipxl7cuv9r9ar47bwbal4gk2qtbod19d40gxwtn20h7hua2qta6bd8tonptz9mhtneyf3s6u6weqinvc9o5u0xbvbq0h0wc05qvc8e77b3dkapld99wzyuwxoug65rx0890w5lhn',
                errorCode: '3jb0ap2b6666bdl5ysv7znz1h9s8f8varjl1hcgp4inxse2i1q',
                errorLabel: 984774,
                node: 7272083721,
                protocol: 'jx0fg726chlqgepgtofb',
                qualityOfService: '4os0izsj3o5o2ijrlqk1',
                receiverParty: 'oa1qxwdyu8n3trtxz67qrqyk9ue7oy1549h6iuub3ce4c3tmws9znuib8weqjnwmxpb99ohsgoargado7fidcs70di1ch2dp40iriwpe5qx43o28rq8xai2loxm7zwqk1hmk0z9uf2ref5dje5sd3elcxmo2dbgr',
                receiverComponent: 'v93854sj1rf9xl21ulnb5gs8hxmb98vw0vmtlr6zsbd99pegczlongrfwkg3zwiwlmjuo9b4vwgt147vtsrna3oueaqk16l8jxxs1gnza565sipfs39tqg4jt4kd2338rsk2a6f8ubja6x7da1pgyiqn3gz5kcrc',
                receiverInterface: 'rfgwnmsp0njo726e51q30x9u5ysbfrdl6mbjtb4wf9plzcyomj8et7d6e8gwflpojzqnaqusht9m6o0xu9pebb050ni9vgzoc5r1vajawwrhffe6ddjqe7eutnie5j9tgkib0zxzcr2oe8jooka57dmm482kelny',
                receiverInterfaceNamespace: 'j6u6bba89qmfbhymf09q8mbajvzd04111ds0zalnyuco4ouxwuilj7vvfm6fcxaukbwtblv9nzqdvqnjlyfgzj0n68p7o5lknsitcz01szo7ny858f8g3x1y5i5seqkx03fw7erk18igs3d33jlz11h9bm5w332q',
                retries: 4335662819,
                size: 4053247279,
                timesFailed: 4210886708,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'jv0vkb9zdnuqubk5qrys995k2f958wkjik7xd4yvk1tkj5b15a',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: '8l6hg3xwnlm4a67p8loe',
                scenario: 'ocn5t4rjpd6hjskn4xl4m0sw7pwhihn88ciyfaas311t4jf52tub4ccl7997',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 10:21:01',
                executionMonitoringStartAt: '2020-07-29 19:17:21',
                executionMonitoringEndAt: '2020-07-29 12:20:23',
                flowHash: 'q2z6i9igiv28xdtxvli7ob2qk89nv1x8wphcpyay',
                flowParty: 'fz3wnlm760pjewwfo2ogxwm4odia0o8ywdd9lrg8p98ofcr7f344qg6iorcvexdwz3255hb6qxllj37zhmn6fogtmq3pubqf825v2ksb6mw7yrc2z40jdy4mkqmsz8q4htupozvdcgg1vo3karruk1tx9zetmigw',
                flowComponent: '11c61hmigii1ycz4qxucdj3iegoq4sy7z1fslbbija2kivf3ob8t6vnscemlwbecrkccrz5ztz7tjlxok7f2kah7tr68bc00wbtdiu4poazqjyew0tagzoiefcuafz0maxbsk7l12mknb68dreu86vvqug95wz1y',
                flowInterfaceName: 'ohc42zots195unm07ffjuh5vn8j13xmfulwxlttjbzwzmhyztj56ipx1dilme340zfwuzeekk2m6a74mn818yytd54vp8iq32ozeu6pvts7v72ai3esqlvud4e4w8dt927ikpy5akbttnhktm2nu8yjfw3xntgdl',
                flowInterfaceNamespace: 'emj2s7z3im3a37g40a5i5gx3luu6khst1fvth9n9cj0xce75g2sn9gw5emqtt2alsi6beayfek92hvraeme9kpe8f2rnwup6tto1hd765took1erswab1lff9yh23yeuaa34iqgnmseb5ec96qc9kncftr8l49xp',
                status: 'SUCCESS',
                detail: 'Saepe perferendis minima magnam aut et et incidunt. Aut exercitationem sit officiis rerum ea deserunt minima. Enim autem delectus voluptatibus aliquam. Sed est earum autem esse deserunt nesciunt quo libero. Assumenda qui dolores rem. Odit dolorem minima nesciunt saepe aut et qui.',
                example: 'np2ui99mv9odvty0uk0kajh29xdrcaaxygbdypizubv6s8pxij7owbikesjnrq7h5y7vuvhjci1a3fvb8xuvbgh0l4pnfqecxdm6m4uu59e89x9mfb8vj0hqwe4a3j84jk7xucj9w7630sdvemzilyyzntwg83mh',
                startTimeAt: '2020-07-29 02:33:59',
                
                errorCategory: '5azgqn3sjr6bm44efm7ryxzeekmi8yiq6cwpla32exrnq4r5byacgdtirp6v4k7kf92qf20fipdlsqy9crsbwvcplxli770veidgbd1p1x8qv9dihfxjnma0tmkjo1kif6fueap2rgenk0dhw7ffp1dfxed9flg9',
                errorCode: 'brzx258e7h2udb2e61tnzpn7218bv5p00i1eue9oxzet3okns4',
                errorLabel: 680957,
                node: 4850715272,
                protocol: '88x8m41k9w9gf43zv7o3',
                qualityOfService: '7qjj91jstu2q4hpvekxb',
                receiverParty: 'u0l0h4i4facoexkxv2zueb4j3gdigv3cigsd4r9hqx57wq438lyt637gkx1kx7eikafs3oty3srqi7nx7bsuvs8sc2f0oq6hdz68bf2h2y4hhtplebcu6rdcx6eebke71keezphl5umxppdp9mpwr3tqdubo7xtf',
                receiverComponent: '2z0qgrnbnyrjphk6txen4cbpfzxvynfncguz4i6mqi9h0c6q0wd3alcbz39548kswbluewfmklh16fc6nw4pocuxjywkqk6bob7g05mm88qjakbi6gsfzw6v0mfjdqb19zikr28qbklthjnf5p2kb78wmoz3d9c3',
                receiverInterface: 'svr4vqiwwdp6e2kadrgfcqvinal3quqgzu7g2o3cmocz32c1v58v827m3ph5p8z2jvjzpyncr1zfbc1w8slkz6ldm4719xeeihp0vq7gw3d35xup9bbvffazu1yawcr7znj7xftedusnerjatdugd3vjnnn0hxds',
                receiverInterfaceNamespace: 'tmo3o1sil0biwec4b14bfxxenpvukvf3aip2jxdqed7zhhnqcf1h0jltwm71wb4u8fxuwo2n4dou8pc7p04y3p1w7assixj8qcka0xaldkjx9na52ldkt2e4gvwjxqr51f9l81xjg8z2tgufaescdf22lbrsb0yb',
                retries: 5167981945,
                size: 1897315870,
                timesFailed: 6861923586,
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
                id: 'b7su0480xoyq12z8jqe8buyzv1ctd1pzsw36d',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: '0ghlyndcqf5ew68ftliqnhudtzpr2omc0grz5x3418d9p14vfs',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: '46okffml8d3i2ds8jw6o',
                scenario: '3ulyplw302kipkn4jjfu81cy02vlh04v8lyrptjmnva1tdtk2gqt7pbyv7qy',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 15:31:09',
                executionMonitoringStartAt: '2020-07-29 19:35:30',
                executionMonitoringEndAt: '2020-07-29 11:13:19',
                flowHash: '0omhipiq8f5bapj9vaikq971ti1hxj6fkexomp0n',
                flowParty: '9jq31wk2qa6otccvr12ex87c6ajn5pbdxx0vgh11npga2nhu69ndhixtuiy1cjdqj3j3ipexn8y8ynmkcoj9ej2c7396j3cerw9fdpna9qs2392i9m2aos9malhewqzflrf1m0hdnch80jlju7k6ccnh2l5l05lb',
                flowComponent: 'fctximvio9b0m7h99u5smd54pyyqavqc9pj55g0k2zk05li6utg56mli3sru2hr7iwehlrj38i8kcgn50nm1yb3ysjnfb39pxbh3nj6nu136u42bbhwow1721ijbwtliwtenalzonouyffu9jghrgbvo0vuao9js',
                flowInterfaceName: 'rjcsxp07it7iemb2jrisv62ky4bz4zbi1tnp47hhv0dh65adcolcuiiv0v7gpry7b81lm7592wr1m908t3wv2a18h7bnwy6gz4sl9sws4tktqtx5h3m8rxoes9pshyc0g8vzyja5gvfgfwm4h9mknd5j8nt6w9wv',
                flowInterfaceNamespace: 'oahbwtshy1bwq0jskmjuqlmqtb1ijbmzsijdc9kk3ers38coxh4d9znkldokwf7l2ejmzlhsoduk05ipft7b1g201dw0xfrf2akl81ui7f18pw9pvk2z8tqctn176t7a2qj0lt3oy3tnvz8yg6koed19yn7sri4m',
                status: 'CANCELLED',
                detail: 'Aut adipisci aliquid sit qui voluptatem. Minima illum dolores quasi. Voluptas id officia quia corporis ad fugit vel dolor.',
                example: '5rliji2iwdx9z6fgtjo3g30uf1v18zs699377yi2v7t5wzbcsml9d90jdi423ngmsy4sgc4e29smeayyghnsjf3pbdhujqq3u0o9e1eqg3l78ygbfsl662x1dnqkjkwxvqxrs7bvw1chpizq4xo7eg0wjb5gdhk8',
                startTimeAt: '2020-07-29 23:15:08',
                direction: 'INBOUND',
                errorCategory: '1uwzf5b29euiqv3rao5yys024li689vtsvrfukh1oimunlxjgdkk0ot26mmokz1n2p0m2j8jnhfnhwh4hkqvk7jnb2jlikapq7hh2gznk2t6enpulzlbtpff6kypbgdekklmxkd52x5tssixblzczvx4vf2fwu61',
                errorCode: 'gye9gz542pjj3dku6l8dlcmgi9t63vc7zfzkuktcyng4o4bs64',
                errorLabel: 151374,
                node: 8566553438,
                protocol: 'napams0bk6omb0a25z2q',
                qualityOfService: 'awflreyepx2vk3r9evsl',
                receiverParty: 'uwbvwmlbyee75kuetlk94gbl05ydua7p82ugua0vjrz4um1qc9dwepcwopoan3n0x55mc727kdd5g5jpu8ww29irwpp6rw57hxno3exox7kwe5prdwlr54otikhntcpkyvjznnkmtxlg5hg8nv7wz2h2icmyim0h',
                receiverComponent: 'oa5thr4tj1sxcagi9w2419e5qbg5qg3tya6xh5zqd5iwfk6xiayecse554yk07871l86kjh3qhou0nqeh7c6twfxq2ttr11u05mggbo0e9ydfuy1ar9lpa8inorrwnpxfy7f3ycfdxvaoq7nl27ytfftxs46jlks',
                receiverInterface: 'y1jg8gbhct52o97ylwi691uaejgownoh7sjm8j64fxck0wn8tqw40lfoig8jyt2i6497m2pfquxhidfjdcufxp6ablrgqzwc6y2wzmhbrelgbnjf29z94fs31q6ynq18qxm1e4h3r2fvhqocbsx90uefyfqmkryz',
                receiverInterfaceNamespace: 'xw217n774pi9623ht2booysc09iwdqy9neq20rmapeiflqy2z3v3e1toucgh0nxr7fuia8ifvdca9vagg72npsiv5ml522brbvor6js2sg62nr887ncugm3bmuh8nrxwsfzkmu0kdt5eiw20wtwhqjzt7iu579do',
                retries: 6155791835,
                size: 2736977590,
                timesFailed: 3177613206,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: '65rqef2og51xneqvya2c98ivdntieywcfyhai',
                tenantCode: 'vfvgax9mnaq21dbkgt291wm6j4dj871vsxyordsp9gj88vmuln',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: '9rq1n27i1v76sd7z0dm0',
                scenario: 'gqjifs2kbtaedf8tb5suohs560wuclki7fhe2e6in74h4k2z4c8mdom8mmon',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 06:40:08',
                executionMonitoringStartAt: '2020-07-29 11:29:58',
                executionMonitoringEndAt: '2020-07-29 20:01:23',
                flowHash: '4dcz8vmdy9ahhgq5585v0vldgzciszbnyyl5bcls',
                flowParty: '7jzwtyjgxaaw7qlsokolpdvc3d8knrefu5nsb3qwb8p2uw8lj8xorh9tiotkjvk0jxuezcahbetqm063i3eg05d3h7jhlmaxh6bvd7dm6mcdcsbrc6ekhlzlkmg1p5ld5q5mdjtrnlagz9j9upqsk2e25z0ndipw',
                flowComponent: 'habofd1ftvm4m08kc4vf2jo9hjec5b2nf9y4uu2w48h72eb6xibulueknhnv4k6b0x0w9725olcj0sd1342mtvu5b9yubht0ac9f21vwn4nzr9rf4xmtwuy4r42bjgz0ggbsvyq7j0ocsseymcfk157p3ajwdng2',
                flowInterfaceName: 'ib970ouxmnfo6co9lgk6c3qb6pd0dbwcrc8nfk7khay360tyaokm0qg1omknmotboeb77cnz496ii8jtm0j1wiw4o4qr69w2zp238sci8pkpqzkdcpixmskgzpk0dr3ud9sd9dufd9xk5kcp2l9ugkf2hitncdy0',
                flowInterfaceNamespace: '2gqzl2j7uo3q4rxzqbqzhroc91ohv828islizko654c9tmbqrwsxcyq6fqairwmq8sm1abvcvnzx0cin4m5093cnkwb0mn63xev6i9di11ppa85v6eyvqdvss9as1699z1lrl9197ohwze4s5p06qdl05dlafqx1',
                status: 'ERROR',
                detail: 'Voluptas repellendus perspiciatis reiciendis et sequi voluptatem. Nostrum qui omnis ipsa totam hic adipisci quos quidem. Ab adipisci debitis aut consectetur porro assumenda sit doloribus. Nihil error aspernatur voluptas repellat vitae ut id placeat aut.',
                example: 'ko216pqw3ktbhpj55wlh7y7oax6wl8y99ndi9oe42tfhfsoh940hkwl5z2mq7doofqxxwkg5hkmok9pm6lylgey99stl94vvlaajscq70e8a0103asoan3h3g851ruyqom6a6a1o7amdavaepym2loy101d0l21h',
                startTimeAt: '2020-07-29 16:46:19',
                direction: 'OUTBOUND',
                errorCategory: 'tp0lm6attwpl0e1xv1d46sx6imcswpo4vg6vo4mr5ve56hkocy6iomclf9zjj7w3ntcnp9pj36mikrxi00d3lfy3uq3uk33wowi3q1xye55e23mrn9wbn16cts0u2d1etn8nhrsvcctvoji2j0iljns6n2x2557f',
                errorCode: 'ku7mx7u22614z8k3k80g60xzspvcje1k3rvvzk0i43uds5d0g4',
                errorLabel: 571955,
                node: 9401683826,
                protocol: 'wkip0s8kjadun39pofym',
                qualityOfService: 'jylcuk9f9aincid72uay',
                receiverParty: 'zj28ym21npffcpiqjxhisk6fted4nwh1akh3pnsau6fhl0khpf9hnkxu3a4wealfm7lpiyjkbopky9e5rspkbfrb91cyguhvrjxrkwh3vgp1i1aepqawvfgy7mpl7lrffipvxfmvzx7mxvj9vbcneq7o0qgzajya',
                receiverComponent: 'uf2h90la76hd82c9pchbt8qb19m9o3bb1tl0be4bc0ljp3rdp8jh6swnw02gqc7580p6cje032n2ob2y6h8w4us3w8iudgvgfam8yk4gpzvuzr1i3isksrbsbh787iq57i0h92bgaxwbpxwazq42ils5g3pq6pb9',
                receiverInterface: 'dr71xbnwxqscgy2o11pxh1ayn06u4a3sb0j4vynrbqs7ekxc2kb081tat2yross72xgj5b34nw19fch1el6kqibt74av97hst1tez1x3uufeu58kdrblg077v4ir7ldln0td4o9up82jcw6qb3n6ztlp9gbwjczt',
                receiverInterfaceNamespace: '8ynz2f59ukwxej6gi52ddqrgd26jaf98rcm8jdrqun77xex7r9v9sm4ee1433ozghsn3y1ubzp9bxfv7wdeedml3n48w86un6wwl8vmry4n9ooiciq1zimn0kkuene6keehqzfvuw6baa4v296ks3vs9qjdv0rsi',
                retries: 1184882980,
                size: 2987514546,
                timesFailed: 8604692228,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'mvn2mopkzlhwfnplzyl80b9ycsqeb15zrbyu6n4nxcky2gisg4',
                systemId: 'dn1b79a6dzq0qetgwdekurzdt95oqzguuraq0',
                systemName: 'w6c5glzpdz85vvr7rkaj',
                scenario: 'xckeacwl2tdzh2j785rq4qbq8xzvewfrpl8mn3uo67zvlu0haoc3jbrekmtp',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 06:24:33',
                executionMonitoringStartAt: '2020-07-29 06:31:11',
                executionMonitoringEndAt: '2020-07-30 00:40:49',
                flowHash: 'q1euf8g7h2hqvxgnpnkunpv0m1vhuhe9m8sexxqr',
                flowParty: 'reagr2r2gumyie52b9z2vz270uiulduunrg0qumaa7bnxo7rzlp2dxca9mp3b8o96630rsug75u6uusdf9wb1497xofgcr4sa184713q0eg69lc1nqhufk31s5bwchh6virk9ivnt6n8yenn23ytn7hnoijxr9om',
                flowComponent: 'vpnk0iqva9qjdilxo0vnixgfden3zzz8a1hojww6oyehaml3y651lerxx8ygrwn8u2f3c86hjpx398ahr5eqjb7obw01hgs6zx0b8uyukhe9fzu3o7gs4edrvt5u2uj20y10tyktiiqcwi1jezuujg74bu83h1jv',
                flowInterfaceName: 'zf14hd0ru1ix3n9ejgoiyrc0xru97agkxvh68k6x3ff1lkknmok2qlg5paiwwi4l09u6vi36favx6y91qhoxi9i6p54q6i1dzs8m54e5sml09qhviovv3z74dl9da8ej5p0o91rbx1wunrd01uquxwlrlsfc4syq',
                flowInterfaceNamespace: 'c0mcra2eno34p0ouidykhnq6nqzgsspfg2izga45mtn4gi0o3qwmqsf0vtpusnce6d7bu7o5lld82gie91mq1hefqgcnieqmvymoenbq8qsoqr5zi3o5f82twk6jsz2hj1g9scm7mz2kzflqyj0b1z704hqsmab0',
                status: 'DELIVERING',
                detail: 'Nihil labore nulla. Sunt labore dolor. Voluptatum veritatis voluptate et officiis at. Vel aspernatur et labore dolore. Ut excepturi temporibus est velit doloremque non consequatur quaerat.',
                example: '11adrorxta1tofbxrhu9gzx98t8bqfoxrek1qd6iwtknch20sf34i1tyyyhqpfncpri60j012gv10k0m3eetf65fbpaji74d1py1c4ju6bhi1ai4w7yorron66n8qd1vz0habgjhb2v49lebh7j82zfuzep1ubhc',
                startTimeAt: '2020-07-29 12:45:39',
                direction: 'INBOUND',
                errorCategory: 'y78ro066xrtbjg7d8zz44qf7so0p87mfgtspx3qor3e2f6gsivcczv764hwwh6re5s1vkghdfen5kdopi3o1p8kq10jtnrjuvw9axxudsaxfo31lyg75tvbe3gn665nfqyc1fbmrez6j21xk35vqg9d8u8xxabfy',
                errorCode: '0evs6umuzpg02qjdpxw5wstrgfynpm9gygrp1963d5m0z3hxyz',
                errorLabel: 550805,
                node: 2817920215,
                protocol: 'vwbokrrea1esdmecy8bw',
                qualityOfService: '3x5g17pqhylmiebv77xp',
                receiverParty: 'h447s9ydiw36w3t6k50zd2kabdc5zo7xmu4g1mm2nqg6lf7a5vjf4l1osr9n4y2c0js5a9i9k8y1zozixzahwlm7953i5egoqvjmm1rv8n2jg0yqj1mb48lzbsce7uth74hoi0d3pa0gemfqajli9uszvyv65qvm',
                receiverComponent: 'de1p0w9idyyeteccjr6s8yqntr3rvv8uti3htco9v42231wv1cu470pddd2hzt20ixcnipiu1q7z22dxq4lgvzr71uksh8vo28cyjxmm947phvuvygilj34q7qg1s8nrvziobbvmxva8c0ahmisey4w8qoppdri6',
                receiverInterface: '46xicx7xq4mzxwknrnk40enakqin1ovil2ucrw00oatxi9sxacbkrwp7qk2tmvtnt3fv51pc0kyprejufztsesikx05ybli1v1wmt1791mz7e2vvg0sp2f3lmoxfsllxfi2h4bajblk1uvm3rdn5azfsg4htu1bi',
                receiverInterfaceNamespace: 'i0u6eddn7jkbo7wviqdjesmt5yxkow8zucv44rh6a8ffn91keddtiy1nuczjxey82n2i109p6or6cyef6jnldhu92kw1b98wz768vxk9dwz8o4gasn8z4p089nuczjsa97ucblehk978exu6lx8fsyg229l0fa1m',
                retries: 9908550950,
                size: 4881896334,
                timesFailed: 9628896427,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'mjy7ooqndzofg7ep9qizt6385udwx9ycfz76xdjq4qm7w0noai',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: 'j7ss90jdz3m9gxag5yts',
                scenario: 'd1qv9fqofj91c4vq1vvn9clkdyul1t77cq66ptahj82pe9wpmylvu4m3kgxm',
                executionId: 'q1n5uogprmgrpg4idkmy9hvmgnbzky1vtbsae',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 03:59:41',
                executionMonitoringStartAt: '2020-07-29 16:16:25',
                executionMonitoringEndAt: '2020-07-29 09:59:18',
                flowHash: '1wmaqpdabrpraspp2afizzfcft96zjexpswi30ww',
                flowParty: 'vtkfw2xabh456nacvgwszdgc0dqitio58xt7pt6kv3xg1ke6wr4e6qv38aqk73smqgrwd6qgg2qvmj2u36je274k2q3dfuht25q1c0dxy1fb6pehlegkcvg1eou1j9x73ww46r0v8m7xw08awbp0aynv0ezyif6a',
                flowComponent: 'cwcyzvz40cm8l9gsxwv3zwsf2e0v9ukrxxyzt9wh87ajds1o79c6xac4ftsyoplsy17rzyt3pakultmgja6uy5244mo6sdvhxk08p2k2q46g2bjmk1pdagt2gfwoc5gbla2bdoefiib7lt9hyaxbibyyqvfilpgc',
                flowInterfaceName: 'y8eto9xg3vq7kinxhgxtbvarpwzs05uojf7wwzukcpxugddw4bc4iin11wke3450t2uvoluxexyc3fcsfmvxnlkkzl3jjru6fgbcbwihwmmivnx0kub6ipnmcp2dbmlsexbkloka2d4kmn1r6ssflsjaahc2hyea',
                flowInterfaceNamespace: 'u74mmsd7fhajc549n8qx6bzogr3au2nqqwasbbuz7oujj0nq32i0bv11pn8b1u3upd47c5ia18ut4mw1p4jzv81zeg7s65x668zggddaozhxeaj9p3xb72b5899wkr27vwiee2b87mapuzyz6v7bzlb0bmtxm33f',
                status: 'CANCELLED',
                detail: 'Quam rerum reiciendis dolorem odit quidem aut aliquid. Ut hic sint rerum. Error unde velit sit maiores repudiandae illo numquam. Dignissimos qui laudantium ut. Exercitationem sed est quod possimus.',
                example: 'hg6wjpb519rf8rgauqo78esgi7yz1rs7g8fna9n96gih8qktw9lr7cgefmz6jxs7p8e8krhx5is2utbk7nlgyeqhvb5wnh2tn1s8buyab2xc903s34n01fuv6b2ks7748odquk7x49dacikp259wx3nx18w70ene',
                startTimeAt: '2020-07-29 12:06:06',
                direction: 'INBOUND',
                errorCategory: 'tufahip220axtbkb6fcgadbtlav7eo1khahreqx8ww4n7sn5n8diqhcso0azlq018g5b47iugzjgu97izfnjnxa6ss0s8k9of8ig3jrj0q15wisgwzx0qlp3ohva7wcutolvv0uuqymr795tcho2nwbcujora8um',
                errorCode: 'lknilcxckp05o61kxrpoi9v4timvikwqmel262xygm8x1dphxq',
                errorLabel: 186040,
                node: 2381748615,
                protocol: 'sg7ey35ichn9r3xl6i7z',
                qualityOfService: 's98c5ejw52itd2wwp8tb',
                receiverParty: '3882o6tmagm84razx121uim6vq13bxyvzy79n51c1nt06x5nwidulrext21wz4hjqb8h3vw9i5pb8hkxkjd58e9hu4ne1pcca8lhq05zk8w42evjbx4l0fb5z6r51m1jygo3610axr4nw3ol6zd2r0di8duxg323',
                receiverComponent: '0q7mezvtrb8q7pjvrwzpduj3shofvpbs55ur7na798gwfeismj3wstcv3xyesqlwovucf291fx3ezatvsbvcldk5y5w6htrq3grpggnhp8s0qah4oxn2p1wvihhadckts007hc93u181c0msqdjdqsbzr0vt7u8t',
                receiverInterface: 'dugrjh10utacnb7d04a1m95qlejjci90pt034i59i4u4d4r46entaq5uj19lrrl8eqxtoozmyhgaz8e8n4g332bfnvi3s7xvhpdi91lmax1vpntmfe9mhpp9mfznm3wqakhzbept6uppnqj25l42yxh5jn1npj38',
                receiverInterfaceNamespace: 'ehxrmscr53xm20p2tc0v71eiuhp9j9p7csabmn5fyqctm46pjc5ge1bkiov2rc8ys2bo8l7nwx4c4ccrc8d5al0n11x8fb22mrjthdmcxf8g8eutxdhw2igs2ngk441o1pnrlqe4go4ty51d2pnfikigfh3dmtmt',
                retries: 4419075527,
                size: 1527742096,
                timesFailed: 3133500208,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailExecutionId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailFlowHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'jul68mn8rygyxzaxl74ka0iunrunuo2a5anxicdx4jxg6lmnhl',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: 'kdsvou70c3o2pcy9h8pm',
                scenario: 'fudjw3ffcrbxeqlbd6l1gg80h2grd7pmgyojmfi17sjca3zob5k8ngbkz710',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 07:31:32',
                executionMonitoringStartAt: '2020-07-29 14:48:56',
                executionMonitoringEndAt: '2020-07-29 11:57:03',
                flowHash: '7lr7k3k5dmjpym23qqfb0wl3ci1z72sg627evaixk',
                flowParty: 'jzt5tsg7ukak7ryqbqtloqgjtgmjyx65jbegkjpe5guwbwl34k9lk2ors66xguzxkmg4c75i9ku246nhnpnwe5a7838b9kcciiwhcm6r68wiwm0xchm75y0jzspa5nfas07ixs2w5i7te5mpf42u77aw4fed4p8y',
                flowComponent: 'bivpiuxrjg68b6oq4lmer1iznyd6mw83c9poy0ofro3awrmxj5t9ls1djcotq7sn2y7huhfeaalc9e96mo4tdx3dsrz1pfaq8eqaspd0upk7gxc7kredauwrpxlq5lui36155r2h6gbt8avw5wqmm1bs6hyd34m4',
                flowInterfaceName: '5txhe2xfziicf9cuu62w7wviudk7qgwzibt5b30ukjy4jheugomj44bl8zj3vubo80neld2ruvl99m9lh2jkwcz7wvse2d9ztmy4h1qt7omv0pfaibt714h32cse28lzg4zn0iugyh6a7mcpn1r7egsg4v09tdqk',
                flowInterfaceNamespace: 'zqhx76w4a1qjewsijh13uhr978fw9imfq28r6bjc7h5rww640fjuryctou3dsvxid6l98zcba4h5n3ec3h6ltl9x2qwet9axlmaq7vazp9bim41c8ppldynch76zmss2qdj8bj5opz0eciyjv3f7rf3axlzpgp2x',
                status: 'WAITING',
                detail: 'Architecto voluptas est sunt quibusdam. Aut beatae qui voluptas dignissimos quo consequuntur provident. Magni reiciendis quia quasi id voluptatem. Voluptas tempora libero beatae vel nostrum. Voluptatem cumque tempora expedita est.',
                example: 'x5wzq0t3f8xbn1rnljrg8o86iyixtrnehwf1b8xjv5zfcti25bavgx66u3085agv5p2wv2c5j3s9hvdq2lk6meztcg69c8vn455udbrfvm73pp5y6t48y9fad0je3uvzy9pwxent7merpz6tj86q6tbzqq9jtcq2',
                startTimeAt: '2020-07-29 05:25:49',
                direction: 'INBOUND',
                errorCategory: 'zzv7adhk7w9f6dteu7hftodm8k3ggsj3edgpryuv67wku1qf77scx49g0hrjktfrau2l2qtvcag0m3m63qxvczyyl6d9xvle4htsyev2sfubnbdj8ht6bi23mcfl9na422s10lfutchgkgj8lnf13yrz35360s91',
                errorCode: '2malm7wrtisycy2vdzm6xi0hdsp37l0uguejpcalg8acs46a02',
                errorLabel: 559763,
                node: 8132445496,
                protocol: '46gseqymn88ys700tfs4',
                qualityOfService: 'czvxk5wyzofmtcvyf8bs',
                receiverParty: 'oaw0d7cnx0lcfwm46ozg07famq8douk1pktkmt243jqs6699irpr5h4th1q382theyil6jn6zfo404rjs4a8dkk7dy5xyygclv7wd47kp14wdo0vd0cxdvg0cizwia7bwfhhlggyid5f72gv346ckcp8h0mzam4i',
                receiverComponent: '3ss9i350mqxy4ftwik9gag2p9zaljksfn2rr63xxtsauo330qaysmnfijbkd3vk9rok1uw82r1fc3r6jqqaefbsz5db6jikw2q6pjxmc57t5stmzfzl2og1v83rv4f8q6eldljnl51rxo1z84m5rwce9nht9632d',
                receiverInterface: 'tq1a04wf7r0w6pu1cop0icfphoifovnz1jme0dj55laubdyg5bkd63owlnbfew67lfa062lkv3j6tl2h6cbyli5nhivp53uwrr5u1r8912k8sdhunqfbpdjrdtmh7u32g8pylmy72728znjbw4l70x79zrwn30pt',
                receiverInterfaceNamespace: '0odxiitz26vkngmevhfnnycsx6qldxyl984kbhdiocwuafad2dvffxip2dlcertco3xii9hxx8oybjv7sni0anvy0qw99edzei5nzwkf4ba1nxv8i68swynimzs5alfbxcg4xhy2zg715tgm2exnypvtqep2uj00',
                retries: 6785120286,
                size: 3962002282,
                timesFailed: 8958292323,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageDetailFlowHash is not allowed, must be a length of 40');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/message-detail - Got 400 Conflict, MessageDetailTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: '6mpobf9on359cgx5sgf9y8agt96sdaajz42l3iz8vcab1ju0v8b',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: 'm8yk7zvxyamzn470af4q',
                scenario: 'kc0h4hokonfu6uehmx06v1ijfzqefmqb4e1d8kmgmgu21y57mmjiewa4l2a1',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 23:32:35',
                executionMonitoringStartAt: '2020-07-29 21:39:05',
                executionMonitoringEndAt: '2020-07-29 11:47:44',
                flowHash: 'mpkzgt4cl4inlrd22oohkqz2308a0ym9z1smtk9o',
                flowParty: 'kc2plllz0qt5othmg5jj9336qmi0agpc1igfqjalftqn33c7vv98161t20j1zry5iiz6stri633b6xv8w3cb47na6akuf509jkunykk6jymkrdsv3rxwwb7rec3bw9hf54gmkldvsysv9smbcva1vjmqd952s5oz',
                flowComponent: 'ay6nn2bjgphkswxdw1i8a6srvq5sxsvs6oykbq23y4f7olop5o0emjs669ro24exfa8em33mxrkbqi9g2aoexltmfbbip5e0wctnvd0ah98gor1nvl0xg4rbcvl7rkak1i0e8grqr13enpowzkvjlhmi6nn0kx5t',
                flowInterfaceName: 'gqflgzvqm0a8ur0i76ddycjxnk5pexiiqi4i3k8t1apw7e5qn0yy3xk51bk3kiri3tq4zghlwljvqijegecphehpeypuawe14ui9fsdidm7uqwcicndup01vffob0i4tefdffy4mudd3f6trlsgnimzgp2vufyds',
                flowInterfaceNamespace: '1uncd6dlbjl4lrc0adfgpi9mp5y4jwhq8rlq40vu3r14ruxvj4q6890gxjb8pj0rv9he7uxpz7zcgi8k4ptvfheuboop8eyv3td50vgaa8w048m7fus2lcdc8ek3o0li2fxow0qt3hcyva95qrpltnwzietaz0v6',
                status: 'TO_BE_DELIVERED',
                detail: 'Eveniet odit facilis nesciunt distinctio officiis autem fugiat omnis. Deleniti sint dolor sit. Soluta quod eum. Sed cum quidem veniam iure nisi. Sit dolorem placeat excepturi.',
                example: 'ewk6fpqyybnbs49vvafzw24ir2jgi0jbpkaw0gcqd79bm0p5ausubv1tfbyln61oaahxdia3kdy0lppdjk3pqga5rs0cky16rximl0y077nlczbgbcm8dy35p24guxipl1ingumj3ysno9dgsoqzj2b6i6ehpmnc',
                startTimeAt: '2020-07-29 14:58:41',
                direction: 'OUTBOUND',
                errorCategory: 'osa0xo5fy17dmcbwccy5ichrdpzs9erulo4pbjq0v5jd18zargmoqp0a737efb3h84rwrh0cn53273v7k1qttsrrp0wy4irnay15bmftc872w50n6swldya3oh0tokzw0hmwnw6kxcgtclslyxqwcbgp1y9s45je',
                errorCode: 'czm6hcvd7wkqv4v9ni1jzf740x4l6z9eprwq0rprc9do0h9z8r',
                errorLabel: 537419,
                node: 4164901079,
                protocol: 'mlabx60t57s8f446vg4e',
                qualityOfService: 'ffltpzejrljtnfxq2g3g',
                receiverParty: '9w7zt18dc165mf2lqrjaux32spnemg4invobq7gk2knt0b1ze10tc04kmkjpe3nbg07m8k67o2qhvopok9knb1mbpfsr2zngj8w86kkmznc7adiz0ygnmkuxubzmvye08qpcl63yjjt5nwfflv14t2r6cz4gwbkf',
                receiverComponent: 'zazh4oy9o9c8pbqrcuhylb9sqjd9qwdheuyq7ruttktavwdqqen7rfw3lzilp2by7hk2mw6ptyhfhrp6sef9tdbvyk2h5rddp9wsynhw2psrbnggnqlk55pgmivbyhrx9ssk01ixpd97zzu9aohoo7jepejr1rv6',
                receiverInterface: 'bsfjlcr78tqkpyb4mlkuewdx96touvv5beghnvnaknym2h0hqcnpklokopwz2cx911btcwd3dhuzf1a3gtfac58tk47w0dynn0ved7fdontqe1lzjsnxp1orvjjvefz05a4ejnfuao1zr99fep07o2k5xij65jna',
                receiverInterfaceNamespace: '7quaptdxshjy9z507as7fdo6tnvzjoln4vdh69boxs0rszmifsd3tj8jndupyt3gzpj4fjk6qlf6ehysidezfnw5ek1oxv5i02n4sliqi68w46y7h7vxu0sezx0yu3eedr5eby9wyie8uf1bgh0l8mvzgu4rs8yp',
                retries: 5259307545,
                size: 9471959763,
                timesFailed: 2293279300,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'ernb4ufffqvjjfu8gf1hppsxehnn1oj98ltqcds2fb0g8ucg02',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: 'xikfcp75owtl5hf1y3dpo',
                scenario: '6e4iv33t7mmvdp9h1sfinjt4jj94j27e5rv4xaqdngo235bmqzw9gwuu95gi',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 13:57:00',
                executionMonitoringStartAt: '2020-07-29 07:23:52',
                executionMonitoringEndAt: '2020-07-30 02:09:58',
                flowHash: '8wvxc7rvxetr5f5na4egty22rhq3oaz4mu00frlx',
                flowParty: 'qd9yjwr9smvetxkugrp1e8trel2xisfpqw0an54669i5wygcmzxg6fnkpaltmk325ww6ifi09kk9reon9p5sy4fbfa2w5t9i3ize1c1ff292f8g4cth668gnfdsao5tekecprkn59xhrxwkbkk64z7fbwgdsq0pi',
                flowComponent: '3xnhs3nxrbjwfckw1i6139zm7bsdumfmaxj2nazmzzsz3hvv3zy1xppkyl0k2ve8p4nlk2ddjn3xpu0qubfwi2kqeicbvwb8v3pl9tekzg1zsjjlbafx0za322wp4pkojfmgiglifn74yrghekit4tu5tv71bo7l',
                flowInterfaceName: 'abzqjk9k4z8zwu5vzq7i1iecr4v6nxexfw84u0bq0xi3cvhfbh4lovwwwwlwsypszastge1qpsug1jtf4a1ng8tq26d7baemexcqpda3fpeejfm1rtruucf80v6itjv34qralpp42rviph57vt4qo92y81rl2d6n',
                flowInterfaceNamespace: 'qglsd8h6st9bhm1sqvsjlu4586w2nbnkf8amdl0j752w18i74ax780lybrf1rgpqbqcru2kau8ly2mwqs0pimvf2i05g7ga52whik885w3ntnrl09ymb5d7l00h3j2qa73ekf0b76neor9bihv36ayuyphpi74d6',
                status: 'ERROR',
                detail: 'Aut aut eum doloribus voluptatum quasi itaque itaque. Eos corrupti quia libero. Occaecati aliquam exercitationem animi. Ullam doloribus est illum autem et. Quisquam omnis alias ut aut consectetur illum corrupti. Est neque dolor voluptas enim eum consectetur temporibus sit distinctio.',
                example: 'sxsv85rul74sd8x80uf7gagjq34cjlftixrag6dgbvrtl22av0x1h5p0d929aprfw1md5iwxm9dhh397je0zarr45go8w23ckkqj4etggr6cvj76q4cbmgviqqqg7ykec5zhd9ncp6gbpu0dyp631corn5a0juda',
                startTimeAt: '2020-07-29 12:26:58',
                direction: 'INBOUND',
                errorCategory: 'p36ndwhppzqhudct76taqop79inrnpgxxx74zhk7p5o61nmawh2af1jn957rn7mv1i2ajjgwwjvyyrfal8qxmi5nl7mhqnmdmuafcr0vx2tb03un0ag0da8u76edq3tf2pwpikcsrpk4rzu6vhv0h95ctjfnh46f',
                errorCode: '16qf6x1v3bm6247cg6g3314fnmjnaskr0pkp7zl8exicwwb00t',
                errorLabel: 290328,
                node: 4216667839,
                protocol: 'ehskgvb7hembxkm2yuj1',
                qualityOfService: 'r5u0tf837xyrf04a4txt',
                receiverParty: 'w1xeriskwwnut62dovjm0rxvhbhh6vuiz8rvipzbgfew6938qkjunkk5i9t5tahyzva238ch5smdi9g9us9lc46n1kde48mw4ugu5654cwjukw2hcsqa8jcvpfl6xxb21fi0pkeyh9ro9uv4hq6vrcodd0hzrapc',
                receiverComponent: 'd0gk0die0lnp7twisly9u7rluvo7fac5v9bgs2qjyaibrjazywj383r3inb9x48nnk31nn8hn0ly1gqw8k9fgbrjolgah62l1kmrimk1cbfmcupiwqt7xvxpnyirfti8insmr76z49jxlglzkoqjt4n69efelryv',
                receiverInterface: 'ew4g71gtl9z5e64eg69158xk199d7fkifs3t8hra1nqhxmt47p9ihc3xm6dwm5ig27p6rb9c2d44s9xvhdjbcldx8p6ejr7t6vv8slgoa6vppn810pb374bn260r4r0unqygl2a8p40axky3x197z3toe6q99na1',
                receiverInterfaceNamespace: 'ikqa28euvwcfi4z80bzmh2tyt11uounygswekvhq4l6epw0iulqc1vd05m2mpl7t1a1a00azsdktdy73slfaeb8t3qfsqimpz6vm7c371wfyed4tc21szt4lx41759sg8qn0kummfj12e4wl1d6v8fsk4jocpbjo',
                retries: 5900332462,
                size: 2549756748,
                timesFailed: 3262841239,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'pknw2v18qx3mnwx2o6qylmad8fh9gi0aswbsvl4nbgsridf79b',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: 'ch8eyuvnj9814sgqphwk',
                scenario: 'dviz2alu7kzr043n5faerkfp8ci9310ky4uguf10ekazb6mp5prcqyf6nj5t5',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 13:06:51',
                executionMonitoringStartAt: '2020-07-29 09:16:20',
                executionMonitoringEndAt: '2020-07-29 16:34:30',
                flowHash: 'fydol71u0vc8ujko9q7ejer2mcg993lxy3em8h5h',
                flowParty: 'hi2sfjqt76z7q5bmfjiup6a2utiu2fsf6koodo44jp5yqdvc427hpbcpi56u48l542gnf44oia6li8v4ds0cblx6b0edqrhqhtez8ggv4gnegl1paebcp48pp3eeepz9f3b9dv4wvma3fp5177rw1sooyv3h7x5b',
                flowComponent: '26jhxgj19u8twv94r4pnuz4oakcxcioe4zd2kx5ell1t5pnh3ivaltygjf69snx4790elo8a7sas4knq5oy3wyyk1zsp1dlniotq8p2fnjgfh0r88vpy3vnb8su8fsapeqkzput28fcx7kaq8tp5gu1u4iewbb5b',
                flowInterfaceName: '94aeq64m5znr4izbe1a0se881khlu26orqc0vbam0lg4z4pcu4v2f3z3halmcakwzjskm4qs44mpofbjujiaucxspkxgyqutw5xh4m2jzqn3thlys6awnkftboafgwb8f1xpn2qckyz14n4nkidr2x3wjo63uxjf',
                flowInterfaceNamespace: 'rtz2hnnddy841oi4ori1q1sr8p25ur994kwblk8nej0pszr20u38gpwi9q6o6pds8a6inz7zf48kktawe5b88qy5gacv4oucxg8c8xr009m1853gqczem2h3w1gybnpqt3z4nev7scf33f2i91160pe83ebikg3t',
                status: 'TO_BE_DELIVERED',
                detail: 'Quia ut eos illum aut quidem. Architecto architecto unde. Quam eveniet temporibus quo iure accusantium. Officia dolores rerum iusto aliquid exercitationem alias.',
                example: 'ru5e7x4iu1ntsqlnoil3ct02yroi15n2uoqj853q9f52vebcsvjsa127rpdkubl6k3de6br4wo4k327e1pyi2lx9nfnu8p1dy1gp21f3q35km3u0icryv9t4i0dro24lpa992lmdo3rfiioeqdflij9gj978phab',
                startTimeAt: '2020-07-29 21:53:46',
                direction: 'INBOUND',
                errorCategory: 'gmx49ctmade6yzezzdoxyreg9hvs6hc3kn66p0sjhu3i93k3om2wtygqsyzvucc4k19dihxlzogysxqy5a3nqnfs90iupva7k3gwy1xolvh4f66aur5ds2n9ohqdr56mjnzln9091h7zur3vmjwp4tquabs2eq6o',
                errorCode: 'tjqjefra159pudttywdqwlkvkxhfi4ftom57twlccgxsqdt5hi',
                errorLabel: 696003,
                node: 6715555458,
                protocol: 'qac8df557vhxu5gr6p1w',
                qualityOfService: 'cffq6xw1i4q5utxt5hjg',
                receiverParty: 'xy1jb5i8oxitu7t59k7kwldawar2mx10i1h0vcxkk938jnkk75ovoikd8ztg3gtqwj1rq5w9hudz99g3fna0lbzdjg0vrx67moplww9mor5g1drvn3zvessk4304nmrxydz2y419fxuaw3fg12gyw1jsb93zlq2q',
                receiverComponent: 'jve6tzogax7e8474xqf3v1o8fgrfdyyd0e2p9vqj0g5wzy7enq8x8cv6px71l89ekxrguihi9ae5x7eqhik0j5386atn2e7ejmfiapj9jsdec1gqftxig6fp14y9o2jsq4x6ue86eausj2w57el1gybuulk35k9r',
                receiverInterface: '3ut64tjguyldjm2ic2dmtwwkc45c5vn47ax6fwd7b7epl946lecqqk1ejuccs3hdrb5eco6y7pnxntqzaf37if7add5n9zvub184k4d6id285ub0rb4zekw3l356kwtegfbggrppveza7l6r1haz2p2hg8azl86i',
                receiverInterfaceNamespace: 'fem50mreq9rbgqaemjv8ng9n9d9jz1wgdvj0j5j99d5h4yfsvhbcona03lc2qz737oxh3rrunleedsg8m8afn4cdph2dt9hadg1kamd1eqrd0ruj7jkpnydz6cm3uty6id2wu73d2b42cdd8kw5xo35y6sfqvgw7',
                retries: 1674790245,
                size: 8439266974,
                timesFailed: 8673361294,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'ot0x3k2cbm1mnlxloep1qvsmaut0bw67fyv71mgrv88ftp8ohf',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: 'eredsjkunvhpho1hdnbz',
                scenario: 'frdrnq63j2dsgxj9d02ohlynhrdi2exz88fcfl0p4b62vgbwkj02f0fjvpnt',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 07:45:29',
                executionMonitoringStartAt: '2020-07-29 07:15:21',
                executionMonitoringEndAt: '2020-07-29 04:26:43',
                flowHash: '6ag8gxgif4bozgyxtj84hvub834bxdn95yzoabxv',
                flowParty: 'o5mynwwrxtqenyfbj730k47cifao5ao910tx260il5bba2frrgxj8qz7p1xe1myqjofiz5en9hh734yzp02l7yt5c8ar44nleje5bt8zfm96ct07h1m01lxtl65enqutscf7hqelmknualtgj6kn7szxqy9njaugr',
                flowComponent: 'ph78t5x6acxqd985u4er25brjr25jkzf70bbzfks9nztm0ttcldcu4rf86mq8k0se290hst8ydqxtfssivy6091frtxazc3k7cze41oy0u7ogwsk3pedqosxfy58cuhuhsvj94jte6tbywszb3gs0ufkyjvmhu9g',
                flowInterfaceName: 'm6h9y80nvsfeo31y9g1evo6o7ca3268za8e3wf9v8truegb9d17bcm2mlmjweys505qk764gy0uiboy0gumqz2wzxe6qjz5p4cgismzinio8a81yr00bbeq774aru6rstg794b7x26zuaue86vfxec0lpmmh6mra',
                flowInterfaceNamespace: 'yjsfs591g9s7gqhw5madpfxv4quoefpuuyum96kvbvtvyz8zmjd78cnfcbs0ttslkhwasa7dijl73ocswgcclw5wi01a2dhz9d0s6usot0dvad56xo2sojbfnjo0mmspghodwha2ru5g1djhkuuwh7rqqfueaxnm',
                status: 'WAITING',
                detail: 'Neque nostrum dignissimos beatae ab laudantium culpa unde facilis quasi. Reprehenderit similique dolor dignissimos et. Dolorem ut nihil tempore quia iure itaque amet. Dignissimos autem non recusandae nostrum numquam deleniti molestiae ducimus. Esse tempora iusto sint unde ut aspernatur culpa veritatis voluptatem.',
                example: 'zzsya7gj6rggubbe74n7av01lf3dfvtk3lv7y3hcajk407bq0o3z04re5r4zm9megf978jmruv281a46t77dclf78rnadgtknlf1nihzqjkaq16380o01qg1zzsyc8tzpmk1mp0w0kzxduj7d1a7vj6lvoax68f6',
                startTimeAt: '2020-07-29 17:02:34',
                direction: 'INBOUND',
                errorCategory: '9cc2n5fof5pwzjxoc6mxdcamcqnit2afaqiecnlgmbxx7orrraus3qg7rschmv7hgwpmfblodhghy29gtqxmafx85e7wt965yjvs0ddyq8hgsrdotigff80xq9ekaycgckvsuarcxt35w9vjo3kd2v3tpfrobkgf',
                errorCode: 'fcj2xkenuvp8xg796tfj887093cmve5ur6j76bp2vrpycu7h8r',
                errorLabel: 214472,
                node: 8827161941,
                protocol: 'j9e365s0nqetdpugx95u',
                qualityOfService: 'bekrttxqnat8qbbyc1gt',
                receiverParty: '6bzwbkwbofl3lbkfk9yuc7qmb7buqx6lztz7m7xezsivhdvkcskliizc6li3d9d25gujztwdkqvrtr20uh9boa7vb2s1ci1n9ax5xugc8xb738bwgt1gwkj5z6cip3wxykof1g8qq0rgbpuaxvdui6esev21xgty',
                receiverComponent: 'sesalrto9q69f5volh2tgtjho3kalgjp6xanzm1cr8e26lkoskqjf5pzxy6vdz6qcvhbgt4k5el6n0czse5xvd50k6xos8hr2mfhpxz6l4aww8i3w1smbmej3vhrib4mtywi9uqhz47323a5b3f2jri9hjfyllp6',
                receiverInterface: '7rjmk9084zr40amp5m2pw2a648svte8yxyirdffjt9enm7u817kggbn81jvwildaskwr0veen2f2c2zhzsm2jpix0bkidis645y73izs63oknug5xd6bglysuknwuy25vzccgohu3sx8ap0sttb67piad2uz730d',
                receiverInterfaceNamespace: 'xdq9rw9cl6ljkcgw5zbnzeqxrhzinq73tktny8jt6mhmpq243wjqgh21z0usudmbw1toy2ldwapjkh9zjmuqxi6bo4g7w218xsgr91oeuixa8aw53zkrwhix47eis3jhevojg95t2u539egiwwp4nkus7p2c7cv4',
                retries: 1958582766,
                size: 2038742137,
                timesFailed: 9553449706,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'fjxrdic1vko3mgxjzp8xviimo3xgx8g8s2rtf9sz0tfnqcd2ar',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: '54ljtvi5g7076j5wbktr',
                scenario: 'd7wd7wdjg7bs3itoakag1w6gd28x8t3f8fyrt1bey5c0gk9l4e4i0cmieocz',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 10:57:39',
                executionMonitoringStartAt: '2020-07-29 13:01:56',
                executionMonitoringEndAt: '2020-07-29 15:48:31',
                flowHash: 't4eunt3zaz1k5wv0v7yzy3tgjs0oafesekg7tm9r',
                flowParty: 'hjai4jerxm4ffjim6ow5npavbtbt0kq6tz1tjr3pq96mw2uasb0qh4sa39taeg80yb721f616abrzxp1oqwl7jxq2wspwhly5ddttvr4kqt125lhjzj09mm5bfoe9cuj5oaxe4dyvirjk4l43vzd5mlm433n51ly',
                flowComponent: '5oirziar8r6qzqu3pfp7gw3hotct79fp84spj2gsfvurtbjp9rej3d9j74rpy4mogyj0nmbr1fmk3amuk45vsoyrsx5gbymeq4gglrw3gmshu292rsu399kfb619jhvvb6a0mswv470rbikkge6hnnyn6snpvaqs9',
                flowInterfaceName: 'f9ze7kyo703vkb40wv7ecv9kka1f8e51qv0v5szucutgazhv5g805zes2mezcycxkzc3gw4png91zr4xhbc19gm9l46tliz0o9uyytri6p9lt518wzndftfqygblswxajeebx5c4k0v9gp3q1o2risl01jlns0ok',
                flowInterfaceNamespace: 'nyxsgyfqfepckmif34zvprg8esdwa93uwewu0o74et6gxdu4gumg7omvqj6nk186lndbrdsewgtjxsnt87cr2st2t5th9d0khxqz32700shz1f82c8wk0erls7umr6siv29s39jjd6trrpe2iqnmsopw3avd8zlz',
                status: 'DELIVERING',
                detail: 'Facilis occaecati sed ut sunt quod sint occaecati. Ex voluptatem maxime exercitationem iure assumenda. Et voluptas aut quia. Ut quia voluptatum modi quia at quae adipisci suscipit. Doloremque magnam autem accusamus quia magni.',
                example: '4t3kqrcji0raxu884tdp9e0cg6v34jc3x06mhcxsovsnqxmd75495z4daaujrcfpcfrm6z1wijjzc2r67cvestrnec9umkaqfssspi8bffkore57hs95058e01ijxzpyp34ht0gl3vhkq038inti9vegs9q11mdy',
                startTimeAt: '2020-07-29 04:35:51',
                direction: 'INBOUND',
                errorCategory: 'egz4sknf6hep9o9vrmar5dvyz4d77fe9uzbnyrmkdbirzn0uiwzyayhzhxfv5zwo30epr2xsv2rh8xbbw2erf74hk0oqatme7rxgiivw027q06j8xcwrsmrjm7lmy7vbm4ya6jjp3eq3a2trxkfjhgggl4t4je87',
                errorCode: 'qjm3kaqja016ufxr458mmp2gmar1gco1momlcgfi8bke7ddv4a',
                errorLabel: 576491,
                node: 4199477903,
                protocol: '126fztteu4ub0h28gmyg',
                qualityOfService: 'caeyen3wy4gd8elkqkpt',
                receiverParty: 'vf4oz19l8rgkari3nzra0r8yvmxznp8m8ukw3rvktty4656jenfu202a5kew659k4f30zuvxyhqxg9lym71iwnf25ggex26zztv9gjmhp3hcf9gqs7qsexq3jumpmvclophdl65hnkhput9pho4eks1fge9mwrjm',
                receiverComponent: 'j8yyld7smth0k36ptdrotcnsktcsrohuqd6b4gjz4gweg5wtl4338empz0slzrcrgn726iw8isnngqht7v9bwyzp672erku1uk6k1gwe9p9ouoqhumo201ocrhv82tjzzuibn7tj8yvvmgt7hw7g7xy0cgwi89za',
                receiverInterface: '9bfp17l1z83d5fhk3s5shmmygb5fofd109rwl21ob5g1b18w4oh6jw9c6ccbqdelz2cekcm92hkx3w29yshcerxzy03ougmgfk3ttnhc0psmrjdo4i8jh3x0i99o1rlk0xb4r38hb3zfl0glklu19tlmz5qogr22',
                receiverInterfaceNamespace: '0x8k2ct17panzqbt6zumhgsv30niqaeoh1edu1s8mx4birfnjfoj1u61cl514yye0nirps1guogk1ln8yxzbxd7rnxgdscpz8a59ebqyvko68tmp3oi8hjuxyapxl66a2ynsjomff7jq95qxuofaib8e4lcxjxtr',
                retries: 1026748984,
                size: 7492652654,
                timesFailed: 2455146205,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: '1nc9xqjkxlklee62qd10hedmlaxfrwa2wg2dbijbzugzx3mt4y',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: '7c6xwci9jxhc4xmhrxln',
                scenario: 'l2gyg3g5moaw3jaqgarsvzh5dnm4rn30v80vlg9p60zlpsndbr2obphoa9oz',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 03:13:46',
                executionMonitoringStartAt: '2020-07-29 19:23:25',
                executionMonitoringEndAt: '2020-07-29 21:24:26',
                flowHash: '3ryosp5asasjvssir3tlad0mlztztqwfdku3fkcz',
                flowParty: 'u4s33exczkblmeb3x2g4egqbr6ygg0zshal861269ynpd17i9ko54qeyqy62bieylasb6merbo1tvm5tjkc1mrbjgvxx39a2yy9jq93jr3fjjy99ekm99bdkt07whegrjabf5ktsr21f1x5heqvhbofrhdy3k2xa',
                flowComponent: 's7qd2kmgjzkhsy0p66vkgvkicny64qo2g6uoh896wt96cl2wr4igy4157hb16946vere4d9z61zxa1zuk6rxf2294da6u6ay7p4t4jorax82lms8y2gb96hq2knkvl45fravr3l3r2u8hg909gkx26yjixknarf0',
                flowInterfaceName: 'pj8xi270tw48oeruzku6364ej3s8l675vxdvuekcthekd942w7y73g6jf8s0lu3e5f837l0t8fz19dberho2qusewkc2uproznb4op5mj52hms9fxjbly7t3omcji68e50i5g9qslychurzk89id9ub2v88zod4kb',
                flowInterfaceNamespace: 'kbkig7j2nltr4avomep970rba3pya4opuuk0tqz0kvsx5gv16d1y3xa3izohnkda0pewiqi2jad7dt6vpiy8036bldk471bqtm3y941oem44690rh0vcr2szhxncdeiblrwkl6q50a8jihpyatwoas0urrg2212o',
                status: 'ERROR',
                detail: 'Sed accusamus at consectetur laudantium id quas in. Sed reprehenderit nisi quis tempora aut sunt. Qui aspernatur architecto dolorem sint aut fugiat quod. Nisi aut repellat omnis iure quaerat sunt et voluptas dolorum. Dolore dicta eius labore. Error eos et iure.',
                example: 'u7099eejl2dko1qzjb019sxr5gbba3uje8qi1rr2q8o6w92y3xxgrvw19zmap2hhgum1lcj801tfasdvllveott8ohq4j00uzhfzoo929n9s2ff1utyorolmwqo7ax21a4bqcjpn5cwrkejr4z9o6ooapn6dw4z9',
                startTimeAt: '2020-07-30 01:51:59',
                direction: 'OUTBOUND',
                errorCategory: '0u4waq9qxm6de84vyxi8n81c8da4spk3v4ohdaolvipzwy5h8bh0pscfv9o8zstctqv2pembijihylmcoeb5nsxpuzu7o8q86vca0b4suov0r7o1t3q6ice0ri78ks0sx330egzgi4nqmx8xih0qosymj8h3h0xq',
                errorCode: '8n3kn9k04s21wolywee1hwnnnbfjwv2lh6pqj7q6pepgio8ylf',
                errorLabel: 831469,
                node: 4659264494,
                protocol: 'yd2v8j3irqofco3oihus',
                qualityOfService: '7j07gdxmz6fidzn0wnuy',
                receiverParty: 'nelep03gqoraagt1sqxc5aqfae8w0s6dql3mz1a7fotl3w8vgyzd5jxl8ljuhh3nmr0mcv4ecslaprk0z1wn73d4dq5omkp37suj2ji0i78lj9sbucyzliqljp2pur2icnrg1iskqk8t9wl4yniswhnfxr6jtav6',
                receiverComponent: 'v0u009q6xm2z8f5fdwpzuldif2ow42f7lhnvrwzfopgvxy3p29q650kpt369a65mxj541xq9lwxzohrykxinl58xkile8d27huoojrjgs493qpuauit3wzyeofmeww9vg9nnyigaauk9cjin3l9s87a2sgiw1mns',
                receiverInterface: 'kkd8edwr2vhbt88ta3rib2zxqxhunk0n01tj57x4abhyozxwz33972s0h5k1h5webs7aefhpc2cus3fkg2nxzvop58f4x874ie0u6gnfq8xvxm00b5govxbmayzhi75e03yvo3kocce2sf7isqs80u6o3den9f9u',
                receiverInterfaceNamespace: 'bywb9ydv01ulzre5qv29jni52ygxi6ww20gc8qajj86lwlrt52msdgq9h30ujgrn4o0uhhsqs0v72x8szraalkzqziafp4015zr0nbl4dwvpkubevi6lod6wmjxqvu1ffsmqgj2rxfzz6p22vp8rpt3p9uh6ydcy',
                retries: 1921894157,
                size: 7192288019,
                timesFailed: 7912334190,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'l15v57ltcx98o3uzlppjekmw110mhn6xuv7u8ik7mwc2i4tc8p',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: 'izuvhab286y7ydhjnrzf',
                scenario: 'z9gt2up2gj500tjoq08izm8mbnh282z8jupxldc37c7jfhdthszr393aekb2',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:40:31',
                executionMonitoringStartAt: '2020-07-29 14:19:06',
                executionMonitoringEndAt: '2020-07-29 22:31:24',
                flowHash: '4sf9m9k84nl17cium1hg50o0f3bypwcl7aytrh0r',
                flowParty: 'sgnuxncj6zp4wb5wesr3huy4o2xmfbwvjg0i87quvzz5uxz7vmjrzkus4dtsk0uvc2ya8kfz7ztgsxl7w7ue1ootbzyhsf7qs7v0uhtwn4zg2vcx3jbnoph016vrcee1hc0t70cjw66rkyxdfdsqz12dd2uzs5ol',
                flowComponent: 'efocgv7vkikcgl17k8ev6ojeaf9u2onisla7jp9et6o60oknp8zn92to7r961r8131vwh7os7ztk0tbrvphuzmiuebssny6hcxveyltm2px1hgkporhmrbg43h4iv9tk5fvqbg21ke9b241uo7o4kvoz4lveura4',
                flowInterfaceName: '9ldrdsaqawbuphqdit3z5tsrgkizwuq3zrrgkknix18ooggjrqo3uy0lfe13s01dshqc3f2hb0ipm4dj0n1y9d0iuws9lrev5xlviardzqeqbqfm6t2b34fvk1k61zsb03anwmhyi4lnro9k6an1uqd5bomuhp8b',
                flowInterfaceNamespace: 'qm0hggaiig4nlyo86lpt0scchm1niyjjmxcwedcm89f6hmi4dy2yynyu6xsb0cfah01q29zepqmn4b17kqndzp11mpa5e6lppgj9mr07qo615h3t69s3r10f2j9t431f3tpgd39yp0ilvsrsa6x03xd763ef7khcz',
                status: 'DELIVERING',
                detail: 'Error placeat debitis neque autem dolorem quo blanditiis consequatur nam. Laudantium fuga sequi quae minima blanditiis laborum. Eum quia veritatis temporibus nihil necessitatibus commodi molestias et. In quasi sed nihil est voluptas praesentium quos quo nobis. Omnis voluptatem ullam et nulla illum et aut rerum. Aut vel reprehenderit porro dicta ut.',
                example: 'xojc0248p6ct1titklywhs1iow9bpqhwevyq7q76jasp9p6eftf9qct87aftgbybtegeens1j1hn7zn5giuriybafnu7eg7cy6vdzrptn02bxvuokphrgxivip7alm6c4khwxn8moop9qwxi2aax1yodna25pwy5',
                startTimeAt: '2020-07-29 03:26:34',
                direction: 'INBOUND',
                errorCategory: 'ht6dtekrhruwl9dbjiptf9z8l3kw85a4m2pnxdtywkil4v60tpnsdzgi212yz1v710fn5z3jpt4rsnfbi3x4akat8tyonw8ank2miij2atdf0ys84exux6fdr8fl4ftx2aur9mx5l7u9c9hauysg3bz6t0tvkr1u',
                errorCode: 'qt0yw1k5d29ti412dpafdm3kzi9m6xf275hm8yua6q7fmse450',
                errorLabel: 645056,
                node: 1311153669,
                protocol: 'vtombtedqt5g3mycyikg',
                qualityOfService: 'yorb7yfr3knsnqef3yod',
                receiverParty: 'knvc5xqjn35vsm04vbhu77l0kwjq0d8l9fynphmzpxyhtvqodz5zykladkj4mv3xkb7z398mz0bpozbp02orc9k0elej1gg2ld9q2pk313omaoiokh689x1tl13hevvm3ol4fpger8tc29bsuth7vx0ig6s85mh0',
                receiverComponent: 'lxl3vmikp4q29tezrmecb39cqgbteg7jzcca7afus99m3j4glgz70nrdeum0x37der400qrpq1k9rxw1wlmnq8liosrtfih41hiwd0pgkceko12zb9iqb1w3lyvxmawokhmg407zjw3y93vwzvtr9tjhkgojfahm',
                receiverInterface: 'm0gcat3zrjno3nluwgp1b4d72ja96dzdgkua7a7aq0i348addh8hr74hemyer616uesegk2ipuwouqplleae8s7jnauf109wu4u7umtfiihba7w6xozg7ghauj9swuez3dqahz3fqhvcj6x5rnp5a1iemqk6u1y0',
                receiverInterfaceNamespace: 'hox5vez1xu4iky0r4c4j3cbm3qkohpd3v48f6zwyq0c0rwpdz66elc6t9cbhizskdg2pc6nyifwymabunw244nr4zm58gvbi4yoi3w9oelzc35rcj5t02a5ksl4gezdeasa0hhryh2zxbhgajngfy31el13lfirt',
                retries: 1589147759,
                size: 3836939520,
                timesFailed: 1884806411,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'vc03ojnl2jbx3f6yub3564y8cs6xq8ekgwap9iphdo92pttp6n',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: 'bcw72eusjmdhvmze4mli',
                scenario: 'vht52v6olfidb5s1nezlfik7tmddm9tly56jez3711wrlbz11t8ydb5v8ikk',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 14:33:52',
                executionMonitoringStartAt: '2020-07-29 05:08:36',
                executionMonitoringEndAt: '2020-07-30 02:14:37',
                flowHash: '9g3b3ebkrbetvcp66i5t9d5aguuyh68goracoj8j',
                flowParty: '9gmcqhw1ae2s705slrkykngbolhhypxmnlxc3uinyqfbk79960x7ms9mvrl0rx4g7a2dqh74otkiwsvc2j0iq5cu4aquijrkal2iertzaiede9k0cd0lk0t56k9m6dqdlcxybz4jwpnirrq3ekj5wn1rjwd65z3v',
                flowComponent: 'w6yhvp5ayp5exclnwsdtxqspsmxghsevd1mmd4am3poibe5e8bwywzwrauhb0vxx774y9itkvn4gexbejlgv7lkee524x2uxuhn0jnbxghoiwyvqzbvx9lriyvnzes1rv25xw8fj2dgsfdzwzl3fx8rh6ct4taw0',
                flowInterfaceName: 'g0ve70wab0ynqyikn6ilchuxrp5z5ltinou2jwqh6y554ludymd00xkxulxo3x83y1yktazjjncjgnfsp83ff5ga6fdtbti88kmy792nfyopwmjyrseriqg6d29oa58j1pos5t6tmq55efgdsunfvkxxs6q0ers9',
                flowInterfaceNamespace: '5n99v6totm0o5o5laen48ywgsldcseg3ridptax97k2zxkmbdf3wcqdcwg70jch4i25eufi4equjrazgczdb49bs6p65n3kvj4s3e2xw0zk1zv77m15sbns7v14f45g68t2pashv61bgy7elvt1hyvywhxbf7tez',
                status: 'ERROR',
                detail: 'Consequatur architecto recusandae. Laudantium quasi voluptas maiores. Voluptas voluptatem porro blanditiis impedit et consequuntur nostrum cupiditate. Atque praesentium officia corporis omnis ab voluptate assumenda esse ex.',
                example: 'hkhasmftshe242yuwb9gpdystgumn75olnrlc3uhth5k37o8bp1ibyezzzxtanesyfyqiggtfwhz2bu10agntsd3zzpyc359fzrmr1o6kz9jz1n2gy4gs50i5chti293h0jmyh1si9pytfddmt26wp14sw5awsq32',
                startTimeAt: '2020-07-29 17:56:05',
                direction: 'OUTBOUND',
                errorCategory: 'q3iemuwtl7e02qwq1dhz3hl2i7fufxj5m2swu1v7oewrhm7fefcl2fe7y2z9lrto7y4gchwpgiavju2xsjp37k2kwabqhpiqq3ez85f6cgmxdtvxkm2kqq9pl8h4a2e267kfa3c8v73h8vrvpfoayxos8kn2ytsc',
                errorCode: 'hv8pn2xo18ngqrrff8xzgpqbivntot07h4obolci3qnuwdbkxi',
                errorLabel: 217282,
                node: 9404808289,
                protocol: 'czy8r1u1onjvw6mnj8pt',
                qualityOfService: 'ncs3tqnr5erh7yu39ded',
                receiverParty: 'c0hsda7jfohwij3liszy4l8ixr4jsb7my308s53zvjds3v4vqi9w41cxxezz3wc8ydm53ev6dfo8j858kh708j8wimszvpdo37sj1xkn5g0naqesdafa8ji6e7lif671i40mjanc9be8220mhkcca18e2479bcpi',
                receiverComponent: 'dqdya1wosfondyyafxqqcr3bimaa99gmxnq2zk09aj2b46r9u3etaw9pkvr6jiejaogtnvc02wdfgm4ccvxk778yj7hxe1lf41t1ugfomglfaa3ufebx4nl4u5i26hgatve8d1oambmlbqag84rj2ugg3t5qsv6k',
                receiverInterface: 'f4mj8bot2uxlkxl88iplsptq0wklvbcdptddiqejdcn3r5rur6q6pqn3iowqmmaajx2fskeo29xyou5bc340w32gpxonrfgnvewlgj6c32bym40eo3b1nwdwf2dgby1yr2rqecnno7lh3l4nbnp1noq5fkrbeb27',
                receiverInterfaceNamespace: '4x4elv08yf0mgy89dp6br0cfst7xuiu191p906g6jb2z40n3u9it7wsnsa02mu518sz5ptyfr9g00a0p7u0o4jy52pinxdzc0xr5zr6ggfwa90h8la1s2o7n05yzkg0fqv0e8fl47caezmuu6znv3bvq73a85hjp',
                retries: 6232259534,
                size: 3952685286,
                timesFailed: 3085699662,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'be9kxpbnixx7gp8g4j6i0d2d4hzn1zzmt58o6cty3cxj1wkpjr',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: 'td6s13st0r5t9i3j8pat',
                scenario: '8ine1kqapmlzwaxb75iasg9g7whnupc8hslb41lghe9rc22ih6p9khasyigz',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 12:07:21',
                executionMonitoringStartAt: '2020-07-30 00:57:14',
                executionMonitoringEndAt: '2020-07-29 08:38:33',
                flowHash: '9unkoqqqtddbblf1wcuxwkxnyy2ps8hpe5ri36jp',
                flowParty: '8z07q6u0z5ifwby5lblb1giolpt9fu9vrgwujvxsp49dcbncgfzik2oex4q9ceagvf43wze1ehrr54vuulfrz3to7us0wymxrb6r7pwc7hwlszc4qxvadw5yfuxdycifak685nmqutxqv1jxb3pdgmyqhsuxuwwa',
                flowComponent: '9sjd44mxjvhonm23d4vzz8wh02jr5gb4lu9drsjftpxzyt10teczma1qw4zuleplglgvlvn5qwlhloc55we8ga5fwo75stq2hk0ahobqj351wrqq8ax9rvwjme21nak7z9hvjh2tmmhx2hwiq82588825sgadn50',
                flowInterfaceName: 'bb9tc3snd95giutqe1w7yrlgz0rebmy33l1fl7rowwvrui6ektmjuexmajy291jpaiqj8m05b9b489osi5h204yuqmj3pqj0u6fy5dx12uo459fkaxk5kpzxp4rzkc800uvdo2mflg32jbanqz0qw2h2iis9ehim',
                flowInterfaceNamespace: '9jyak6ila1e95m981mm4xr5u8j6comve0xmzi3gzs32juxq8agigxziepziiqtkjjrewd5beeaoomch1e138yij9kgut09ywhoyoe8mz3nv2x8k4xz2hm0gw8m8sz7q28ziucgm79r08dboyq00v7nvaf9gdc3qp',
                status: 'CANCELLED',
                detail: 'Aut illum nihil tenetur velit ratione. Sed soluta consequatur consequuntur eligendi dignissimos exercitationem consequatur nihil. Nisi consectetur aut placeat. Ipsa non mollitia ab. Vitae eligendi ratione a autem rerum aspernatur a a sint. Cumque ut iusto et voluptas beatae dolore quis sit quaerat.',
                example: '33zx5zeqh9xse2k5dmszr63k1id9eaobzh9warx1nsvn4tp2ojwnz972jpn7d2qulfbbniwo8p6rwvgryxnrrvij68eoj2tywfov9kyed5sikpdvtb08iwhwz9jwmn53q39qis1iyogxe05g41mgatymv4a9j273',
                startTimeAt: '2020-07-30 00:41:01',
                direction: 'OUTBOUND',
                errorCategory: 'edry9bm4qku2eaxggpw3th2998kls67re0h2ex8y8o9ih07rw6i1bjis4f5hkebcc2zp3oi9tza73y707x7immlx2k699sb3dw9x6nw1j4x0knoq8eb35u2lwz9kkn8k90svohfzjx6xh4gvbxju3wn5urobk8kdf',
                errorCode: 'esrcxfp5fiprmgryzuhltcra973p3gblnb051xqctoulcsrz3t',
                errorLabel: 755632,
                node: 7305252249,
                protocol: 'yezgob2ib66u4g480l7f',
                qualityOfService: 'iv6lrw2calbn5ujd9vn8',
                receiverParty: 'ayt4nkjmmq94v094w99ajsma8v9xbhh7luedry4ks62q1v8ts1wb02a697mg75xgybt9tl0x7rlbn75cf4rpjenvqrt79ddhrvylttb1c6wed3kqwq2v5kuy4fiyw8wmp5d5k3pho5tn5ygivghfh9b32u9nm9g9',
                receiverComponent: 'ylt90wnm95gorjkq7ypfrzmhsnyxwgvkpgchofaguptj03myc87r13ope2u55jxzs28xmxxxuiaj4tyhtu28gsso6mxde5kebjbuilquhe48fjglvdohq5lgydo8xfe3s349h82hhnlcbf37wuwtmun0d20kdjyv',
                receiverInterface: 'uoyk12947ek5oquah1mnmp5cx1h8cbvtf6dv4t2sf3bou8jlhy2eyxspjo9tpam4u2wmz99ks5ud8f7j0coef9fl53sv0ram9oasuh0wq98i73ak3cg359rhlrdt5f91irl1mmjogpvc0wr5r74x5dfowywnm4uj',
                receiverInterfaceNamespace: '6e61vdzhqtm64nz3rqubfu1irtxf61y0qf1jb0dltcd5muercmkukfffjnstn3a0q2w9g5wea6ym42iviijd5h0f4md9jf982spghf14lt7lxrcdwy5ibkh8o6qzb46abyllpitq5fro70xkgfmi405w39bqw0cw',
                retries: 9633654222,
                size: 7383558697,
                timesFailed: 3075606504,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'g5sdhxdxnxe1ua8rbmgy99s0kkj8zftvatiend88xak0ckbpz3',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: 'yugh8kvlefrnd54eb9za',
                scenario: '62zapsexlvgymagih3jqpp04csut8k3g9qo8ru5xsz3nnwbch4tuz7e9nsmp',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 20:10:02',
                executionMonitoringStartAt: '2020-07-29 13:16:01',
                executionMonitoringEndAt: '2020-07-29 19:10:03',
                flowHash: 'wey9nb5iaglvjpvgjv2gnvndyxbhqw1qhxrx2q6g',
                flowParty: 'ufy8drp0sy00wae4yj55mms7tfjjvl0y8sfxt029srgqtz6jn6oio1bhlm1wncnsa248wl5jv5fqdihm6gaifvjconxpqse45lh2av805e1s7aq8n1sh3u9q6a0injfzj9zukkug6hq1jb1cqycif150hqaya9nq',
                flowComponent: '9v9u1wf83ceo5n6mr0b9wmccybucad3m7wpv6s5zs6y9kxyeog5xy7bophsod3cixyt9eckrl071bhcy4hvyg1r9ko6rbd9lut2lepihcsvfkckurvv6nruceg6sf7i5sxbmkctzrmjzvw1h5wac71bhahfp7916',
                flowInterfaceName: 'luksf2shorw41mrmc90xmbnda9jdsps73nmq1564op228cvqoya28y3i0j5w8euup6glskijlvjm059u43si2p26t3xvl5uqmkcnmplif592x8z54rss5ojy2fdss3q26cdamgargfkxxuetx6moi3mtra43p3cw',
                flowInterfaceNamespace: 'gy3eh77odhl21cfvgooer5mv5djhv4uvoq6vs5npyi5gwsz4f0jdv16pddry8j75y3jm5rvt6b03y0wax8abyzgc835vpz8ifq5mz7gh9qbikz3twvle7yhk2ec0efxkn7qbu77aohsu2nffw3kb9z7xl11mdrtx',
                status: 'DELIVERING',
                detail: 'Pariatur soluta error. Facilis at facilis. Laborum ut sint debitis numquam iure ut et. Corrupti a eum. Quis at veniam alias error cum.',
                example: 'tpg35mi3wxjk0bf5gss1v1m6ad93ebe52ji38txtbz843ss13zzqt6tpvsahbwjlyzygmuwylik58k1n6201pdleq0w7xsujncnwnrtt6cjwourp0azpvwtgmnjt5mcyf31r1vkugv6llwkyyeiaiq4uer1lq7kt',
                startTimeAt: '2020-07-29 03:09:12',
                direction: 'OUTBOUND',
                errorCategory: 'gg5b0ud2lqyk6xgyjjq9ukr9kqig63gwyum03mnjfdosb1c79pysz0xiwzxgkkqvvajuaywh009p5d8ok76et5yw1j77dzm3lf63n5dk24j4x554se42jcd6gkc8phiajt45cbxubq6qgm8j6wu3zr6vsde4pgd3',
                errorCode: 'ebaaek8qjjko0jp6ouvharvnrwrk3sny1nad6qn3x913nppbypd',
                errorLabel: 709533,
                node: 6116030756,
                protocol: 'fhcvgumqqthw5mf5kfsg',
                qualityOfService: 'ee9ih48d3kodu89mtrva',
                receiverParty: 'c9rd6n60bewf3g3w304l4v0m1duy4o6ofzic8yzhajrk5rrfhqwtatpaye9weu42xynm51eqxnkgtqmd8adchyuy82cki7ec7oi6q8nf8smfkkv4gh9vfid96vwzgfztdetbarmk1zl4xzkreoakqzoysjzh5a6o',
                receiverComponent: '7jye8z84jcomf3o9g8ttmfi19igbc23dvo4i0g91fpb39dxv338dxezd8233m32onwawywfujavhfkfhz7hkeftfzqa5s6pzaf4ojf2khrt7x0ov8dgiancx6p0fe92du221ln29pad4uumo75pixyxqvewu1dic',
                receiverInterface: 'ez5t6lr8c1jno0l9evv6j6zydc717h8ns2klpoqdjv1pemyy3egygxsh0ybfb3pw21pv14tucetby5qxu9xtq0n80ypdd1n1i3f2jvm9a7pvejd0u15zfqdmd84w4dw8otazm2262fbb3pzgkypyceqp4r8iec2i',
                receiverInterfaceNamespace: 'hgzmh5od0wtx4x3zslp1ufng8ty03el7p5dhaob3oyzzrzxy4x0iqsxevkuqfb4pil5uox3d1fav1t62mk4str8sprq9y70g569fg7nnebcj8oxnt1u24r979vwi6adtayz0dvfy0jwc85rgzrc5bo43ysrpjcab',
                retries: 5831381247,
                size: 8280521463,
                timesFailed: 3067860291,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: '2va3hvobcfxp1v13mp7lfhzs76g47d11vl0y6d9as100hk0jd3',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: 'td2w52dd5we0bv9k755x',
                scenario: 'yo8i1pgv0f5rmvf3cp3vop4w1v1tvbx26p5yksh5aech68mfms10e6m213nm',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 20:49:12',
                executionMonitoringStartAt: '2020-07-29 03:23:52',
                executionMonitoringEndAt: '2020-07-29 04:20:12',
                flowHash: 'avfexrb5t0hbn2s70ysar8l3bf3xi8k1tr1my2i5',
                flowParty: 'wj1x7f9o17ryrtrp6as7h9nz0tcnjt3wnp351gb40wr07b31bp45zxa4ox14zmmw31mhneyv1hhonnhuttr670atayz5an6kzc5ssqxtepbw8wnoj03chvf4p5zg46xrrp036xn8fson4w95g0qsfazb2vxjz13c',
                flowComponent: 'feg7ljppilv6ue0w271oyir0ui3m16r6w77hl4p6gk1i8levifjgpbgtaoqh31grf82cd8ntxuwhhgtx7ix67s3ewo4fi28ot5geqc5gu3bqewejrmeh85917cherrqk26zucvkpewqbeqk7z82aii3yfrnthebn',
                flowInterfaceName: '5zao6w9764ly2ceome6hp6zihieanmg74njytng9sitrlh08946xsv5bzoomjzkftujmx7kzrk04pd0fdf7xr90jadzg9j3tz8i8a90q85n358qy48kew7zq1udxgvanal9gm2p5rgrzpj6kkgo5dxdn0lqhd959',
                flowInterfaceNamespace: 'g3eq0dsl8kg2bfaazzimsgrt7oygvw5qivfj9xag0kmm0dq1kx836ioiidqb4vscokyinjqiswkued600jb8s30kwp9scsehidk7fi8h1qqmoht93vsydnsuw0gszn5lz7pj5eih4p9pjorducqc7mmbln1mwln5',
                status: 'DELIVERING',
                detail: 'Qui necessitatibus temporibus explicabo. Optio sit ipsa optio qui. Voluptate eos voluptatum. Exercitationem ut aut. Sit molestiae ea necessitatibus sunt autem repellendus nihil reprehenderit.',
                example: 'xplx60q4i9q6gl2ux585ozrou79i2gv55psaznuwzmo2f1mn9up0c2c8z881lyyzms98rcg3yvp0uhw674qvyqee0xe2fnimt0937ti4mhig9cu973hs05x6uj3oksdkm89ex3lkehcqjltcd97flt0v118trf1x',
                startTimeAt: '2020-07-29 04:25:37',
                direction: 'INBOUND',
                errorCategory: 'pyrxp2xuodssyr0wv9u6rf84ey20c8dxcpufbrv5oepj69p5obe5ebqagkvx3bjema909phwlqgwwl2akf10q948go98s6dfbbt78vd23h6tpalkbxvdjb0xgrmb8gz7yniridn3dpsrep0lm9woxl23ayi3bd79',
                errorCode: '1vny2l9n7jmyygufzv75o6gtsr749r5fte6vzjhu5w3feh5m21',
                errorLabel: 4531798,
                node: 1346056574,
                protocol: 'p5ekge0k4xwutrdjlxv2',
                qualityOfService: 'fcisz4cf5d5gw53obe14',
                receiverParty: 'ia5xhc5chsg0breooq1sbbcysn92di2omktp8pfk9k3bxet7tqym5rhwvl4jhqlmmlo91g843t7l6k6yq0s92sgqcvcvtq4oruo5etq4qhzw2vg81shlsfqzsz5g4xrukyrlis34nthx7pef627tl6pdv6m62sqt',
                receiverComponent: 'km845xrk4k7sjwszejis514jz6bxe5w72p8mz1ilv0hdt0r9yphu6yr5avbriaoa2zxuylwb8q4uyaqxim2qt9n1qxr17iorcxf8vbp9tkut1c0tegtux9ecct00un0185xjx0iieffx65i2w6451h1gh21suigx',
                receiverInterface: 'xfhidyo4aybdawloib7sw6gcugimtfa1gu86xd6ydnejedf06ljy6npz7787asouz022mw8hbrur4f86pskhh9v98np0bobr3wffxs5lxk6ptn3y5a2nvmp2lvvx4h9skq5qx7zjscyngs9tdx1cd68njykabfmy',
                receiverInterfaceNamespace: 'r9mkzmze4116ttfo2bprfv2xv1bep6x98cqro88h9to1jxvsqk1yv0spn99ngljsbyderzt81hsf970jcyb310ozfrdg0ncc4wl88nwe6vrkvlnp6alyzf5xp5jgxm4pjnuw1fq8asd15d4digzgc4rwlx6yorhq',
                retries: 6960906731,
                size: 5334742510,
                timesFailed: 9345413593,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'bhn60gqauzntij3q5gqivedvgy3y8o9ckbbjy7pcjkxegsvhh8',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: 'qrq2rtbjmi6ebcpfnx4w',
                scenario: '6qb2ripl6gnojcs3w4q9nlqippsietkwiry2h3fzjh2sgxoh3ukiv9yjsh2f',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 21:53:17',
                executionMonitoringStartAt: '2020-07-29 07:55:01',
                executionMonitoringEndAt: '2020-07-29 22:46:11',
                flowHash: 'cqe13rv8uvsjsvnqazbrjxuyjj66d50gvx6j3g05',
                flowParty: 'zdoxrq73brvjbmm6ip4n490outm3c2rcsdhxa0sr4styvz4upwguv5cdvgunk0yce0w3e7dm8plikj0xb1acq8q3q53cgzng4w2crg3tww7zovcvp3uds1404qmwk0qpv1mvsxz31ejaatuxe5mq7yoy4nxf4ffu',
                flowComponent: 'hkmz7ed3tfbovqje6rbl0regt8ure7n0rkeqjocvqe2d8idoqgvlg9yjssn6occgphbnikwh89rhg1odguuyqnm0q4k3b8vmasg57oh761tvr5vxaszx5m9nw3q0jlbsgc7wlv2pyvivj92phzox25f0k2wcamii',
                flowInterfaceName: 'dykaivdskgzuctywu1f97rebx4z80sxcsl03wi4fc0w9qci7ogm7tihz9bnc0nvk5l61fscz5n6glf9l56ch48m25g6cqdvgrrlxj2170dj0pukpmhbcwm7ll5eco30ifxblpy7tpkxr6df6g4fk5cd7yustmhvu',
                flowInterfaceNamespace: 'jbpg9ai8i0lmpvpnrvgzifbztgym6ddmynq4n5xz5vbrlsb51op026jh9zvznfru5akt3uizzh18ayfchtdkt0qfz8envn4vtvxw76p4omaeptzsk8r06acr9a77lxob2pl11xqq63lolkbvg573n7fgve0hv7b4',
                status: 'ERROR',
                detail: 'Eaque beatae aperiam. Aperiam voluptas consequuntur quas soluta quia quidem. Doloremque quisquam mollitia voluptas recusandae neque possimus vel voluptas ut. Natus veritatis voluptatem est minima. Aut deleniti ipsum quasi id eaque sapiente sunt vel numquam. Possimus id voluptatibus illum dolorum nostrum alias qui.',
                example: 'hcfeq0du3f1dbuwzl8klxwp1ywkwggrqiyfuc1bmassat0oam9xofluzz3zk7xi6p61acyfzur48q1oxg96f28zcin8drqzr6g091pdt47a2blzzk1amd2t3zl2tdzm6tiagvmcygtzmnj0ndu7s00fl8eenh6nf',
                startTimeAt: '2020-07-29 15:19:55',
                direction: 'OUTBOUND',
                errorCategory: 'f1p9nho04rz9ukz7cknibyy6tdh3v753sbpsvtqiuu55ppoci7zev939508jhr2r8xxt7yjz0cd5biism7inf21rba4pb22vjujn9d2mwzb6opvxim2g2s60icgzoqtdqswhx1nisnlbu4mceklhz0ew19cocz87',
                errorCode: 'vunfj8485dyg7wi4gepckgh9euv64u7tx07vis8qslqg82vtlt',
                errorLabel: 463263,
                node: 79225627893,
                protocol: 'mafmdalfqj91tusniizm',
                qualityOfService: 'qwoxxv7m7sqxdpqeazj0',
                receiverParty: 'bmuexu9oher55x4ywdb6tkifcxnfsmd1941s76iy1fdxi0t8gry9t1l4o9z8r2zrpkmz92s50y13txhh5bd1itjc05hveaxhemvhbxcrnukbeqn0ozlagun746bbu4pkcs2acpf00e4pdcy8memg31ns7iojelvj',
                receiverComponent: '3v4e5gebzfo2wwymiyboob7eeb0l9yq4zdxu6rydbrlttlof80zirpw4srrxyg02knsnhngzol87mk7e6weyh4jxw11ruev5owrvdsnful2ereivjla9a9qkqojui69zrlmljje0gx17i0z8d125tanp33e62y7z',
                receiverInterface: 'h80djplq29c3nbfbzgradkhab5l1w4tgyxuc09zxo491p8tai15yhoarrleq0w02rxitdwdvt0wfwnc5lvp2pdz6hpj83q99zv6vcpsv49i6tuna48ylkfuvvizuhce1kf9m12cuiyd4gcm414cgxfwux8ab86km',
                receiverInterfaceNamespace: '6dw7h485tkbc2st4u07krct9kywqowo5eoe3xy2ff3aom1pabjnal3ogtr3cah1khf985n9tj3iww0cb9xkh4r2remiett074fxzcaq014lb2bj7xjbw8eek9lntai6fmipf3dztnvy3k90kpjy4suke4q5p8kaj',
                retries: 8465345646,
                size: 2652262471,
                timesFailed: 2069839721,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: '7rc6dbi75k2mcioggkg9pas0sdak6qckr1z3i14vrrtmlncvhj',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: 'kvmr6au9w51nllocgf97',
                scenario: 'fnhz5dm4v26aa9pktjx4hq9s1q533kci67mej7tqov4j0tdsgafp7kelz0ot',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 17:31:31',
                executionMonitoringStartAt: '2020-07-29 02:39:24',
                executionMonitoringEndAt: '2020-07-29 08:26:57',
                flowHash: '0jtipwtqvz3tw4b7f18wvwl98pazusrufpe5g0ux',
                flowParty: '7db1yib5jy4ouob58emdppnodvcouke16nbhyypji0xet27s0fr0z33r51sukgznn2vz6ykm9j8w9k14jzbngcy7vus4ibsyxwnulu4k5n989qtt6croqzna8grw5411v40taazlsv3baa19q1ca0alxkk4z2k8w',
                flowComponent: 'mw4uvq57c84u94mz7vqpl135ojw0836zmu1g7b5nylixg9s0wt38v94duixc6laa225km8xr0bpld7pse8kppca5eb2iryw7k6yfc3ypm5vwu2uz37gbld00w3l6bc560n555hrb32pvz4k5dtehmnsp3nv54r8t',
                flowInterfaceName: '9eeoi3ok7e1f02yug2hvdeyhf43idlwwtyj7m3m7vgr9as0jwnj88jzefa7de5viwkudd0vx8bboy37y1399hskag1lqmqh9c6hzmi6in162pxzxlb4peq2eisaxe6pby5l5jdayaoplu4p1bv3n67k1t6og8nnk',
                flowInterfaceNamespace: 'c3l2tetf85k5g3jn7xnj3tpi49hy2tbm1qozbkcqhi2ftrnoo6e94afyblbf0hcfschmkj4jae1hy2ycgxoe2i9xvgpn1jjqmf44d5b387sdhc5eylciurfgypwrc7fdso4s8tzotwv5ybl9dcp9e4tt6tkywrjh',
                status: 'HOLDING',
                detail: 'Qui eum voluptas. Sint ipsum ullam voluptas eius. Voluptatem est repellat libero eveniet. Rerum dolores ut perferendis temporibus aut. Eveniet deleniti aperiam accusantium. Provident ducimus velit distinctio et accusamus officiis.',
                example: 'mgt8hr415e759cw671zno6b80ogiot8tgkgf3kqwynbu0dkozhgye77zpet7pjmbtwkq9672mlpezpdytvbd6y5psu39z6hvhd0fkwznagfs26vp3x1rjo9n4ug3szo2cwfw4w5ie0cvr70i8b135b8u4tpak9xi',
                startTimeAt: '2020-07-29 11:50:29',
                direction: 'INBOUND',
                errorCategory: '6bvee5rx0e6q6ynu3znlv4vhqq14ycr3zqnkkltnfb0697jbe57qs5eak94rs06ftqfg4hreiuu6lykiwu9fdq70x3wlgqya8vyajlv44b9wiehlnrmf88rto4r46hjtbkqkb01rbd8xotswtah328x0k56lr333',
                errorCode: 'dubl5qiyyh82x34sfri7ma8btbtkmj3w2w763li8boknza6sgi',
                errorLabel: 318928,
                node: 7867991045,
                protocol: '1b6v01re9nj7cj8q9ol1r',
                qualityOfService: '6lfqsp4wcq869y2wxvjy',
                receiverParty: '3x55q9l57b3o44v9qfdlbugu70daopdw7rp10wy4bz9wyvtfsqsa4f3g0bxwk3lwpnq5xzka7dgoo6spywn4zo7xe3su3w93y4zm67t4ov75iik8ck790lk3d0m6b3uj2146pbetwxdtov3x0ut110njjqa5ml00',
                receiverComponent: '39e0t0vxu189umcr2xq97ajk64q6nn3rl0g6zc3ypchult72a66jgd88naogqs8tbrh24eftttoe4hpcx59akdxh1g25kgn07o7x0pg27eb8xjy036e7io2fmh0it2nvcfepbohha5itor8m8grf52nzbn5lxg3i',
                receiverInterface: 'ywkryy730ni27cfoh1l2iyhgtzi9g0y4pi91v15x1gqwp45jier6a8km4qu541p9306g8h6px0d3m0mz9ihclcuxd7numdz2fegtpmjxfqd2luvc3j15py9zji4nff8qibsdhrizknvmnn1lkbpjcnfwj4yz1epb',
                receiverInterfaceNamespace: 'fvjw2nbv9ynv1os79fuwsqjfalcn5apvqnxyl0rq6o5ngefhd0j7mio2s7giubsgtlvaguzsxmjyadx187hwgy4ap0rx2qq9hi1nh5jl081m2kq62jf5zniwtr67f9xs3c2j78c2uwmnlu9rbodsqckcrsgh7i7j',
                retries: 3006976591,
                size: 3306172681,
                timesFailed: 5678694118,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'p6n3i6v0n5mqjlerw85dqzcvfnhkqobvob8sk3g2r8lbbfpsed',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: 'zytcndeyj2mxuwbwqhep',
                scenario: 'si8qnxokmdzr10u8mrm4nvb3ni0ff91coouazdonvpwaw4mv1joe49f9ywf2',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 04:39:53',
                executionMonitoringStartAt: '2020-07-29 14:33:48',
                executionMonitoringEndAt: '2020-07-29 13:53:57',
                flowHash: 'gvv9z5eetykf1e4azk85bkk38r2u000hhz8t6umx',
                flowParty: 'f0e35d9xhe4vcpm9lx19szbgv2e2r5nbttb4sarceok3jcgd9eqg2x08hacrmzf26172gj9jbjafy5d9yz5n8qd9n40x0mzehywz3eknmo6nvwemoir3k20f0poikpdlen5icb7i4uebbbwwnhnk71xyutq8y4uk',
                flowComponent: '3uhguzp741jjbh4nnea1nf51ib0yan21luec6d2clwm7nql5vr572uvfe14refoyoakw4bkvjttpytxu50iue9ei74ukpl0iojbjkwgry61f1xbbyajbccfy4k649mxhdekuf5ltgj9qovkhqignxndmswihwox2',
                flowInterfaceName: 'glpdlerxyukv0rnimbgvcs15p6gty1tyzg4w4gfqe6y6xf3i8zqh1et5j3st1okghu0z57do4hbnm7ldiv4c4p57xi2d4zf1h9fozexol2ffakdy0elivutilkbmuyboxl7m25m6zkqeffealhug54iqvvzee13y',
                flowInterfaceNamespace: '2ckteygdwc4l1211rt6m68kij7x7cavvkmahdatxwv2acugs3y0ipmjx4k0i4cdtha117o1i0z8g34lrz9uvl2d87hsjxjoma0isa85wgjw2kie6dip0dxidsq3wja840f6catm371guxcywkv29hjafqdc700pq',
                status: 'SUCCESS',
                detail: 'Dignissimos itaque iusto facere ex qui dolorum similique ut cupiditate. Animi minima adipisci sequi voluptatibus possimus dolorem molestiae dicta rerum. Et nemo doloremque debitis cupiditate ea. Molestiae explicabo minus. Enim labore id.',
                example: 'nu7ikns5k3leevye5tf15d6uayu1vdnf258qg6yzy8qcoj4cluvm8blv5jwmbzctkxbpr14d74884mpwfqiyleaviyihe3otw9w9gru77mf6921vocujmwe5cf9gbb0mvz2o1aznv9axzx720lud1qv26w1j5pni',
                startTimeAt: '2020-07-29 17:03:47',
                direction: 'OUTBOUND',
                errorCategory: 'v36q4vdwii34sieljcbs11lms9mps2rzn62d9ay8shur51nrmd4g4eb524m1uehsojnf6n8s6y4riptd5hkp3djlv3fmn4jt9m9kv7id03lq8q7e35295bkfik0vxs4en90nsgfc31c4yhpth4vzdycl5ebb1awe',
                errorCode: 'mll9mrv7j8wuga2r6ngvr5litv3dsbus5pnr7dfs0zzccrn36i',
                errorLabel: 683548,
                node: 3001701236,
                protocol: 'jmr31ry5cz1xttmzbmuz',
                qualityOfService: 'tjath0ysbuevrqw3myhcg',
                receiverParty: 'nzir6tykt44q7lqjqswtohll2o5yob7sgjx22ciwel6mxv5h1t8q29nn3jh9ps4clgeycy5vkkl1b745e4kqgcavwp14anhp5sb3078w38egnqe3hhzx71r714666qxzzokn04ss1rpgxr4si7y1srxpvhc7r8kh',
                receiverComponent: 'ln1hzv0v2asi5x2v64wk64zt1xq7f49s0e1k60teuun5o9vb2jvl24aezvf10kmefjyfnu03xvqtwynr8gh32bmyzuu5i20gcd614r0gmmrwcx5e9vheelykg4prah72lygtoszbj4n0x6hk609q908hnuq0rr0q',
                receiverInterface: 'm7ef6chhh4e5gftwr1pzw9wi7zf9frfgajvtl17ohnr0pnmkr21vnqvj013wvqfrl8u3npmmr2guqmet49zp9srphnobm5wm0sdb4vzgou5c9czshhdyoh6qs9usuq69mdvrwybpte7ohlyovdvbws9d5bm7l6vy',
                receiverInterfaceNamespace: 'v95te333asgtp8bhziukg5v1mh026i3v4nvdab9x6o3pdrv1086wykys64xgp7119pbus7pl9uzq5t72ysauguaeaji4nxkj31t3vw3mrolqkmkqpvymawk01m8ie2nf8901r44w7fu6cm7teg4d5v3w5k1aii5l',
                retries: 5389581911,
                size: 3646748130,
                timesFailed: 1912524179,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'wah95ntdgh7a2p61cqa1gf8bd6q9lnlq7qvd99pkhvygqsr0e4',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: '9hma6ppc3dief8ui4f0u',
                scenario: 'mizrgrdsxi75bqsx6ebzxw3p6138ezls8ojgdq98mp1cuhtjj1ami9971x0o',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 22:21:45',
                executionMonitoringStartAt: '2020-07-29 19:56:35',
                executionMonitoringEndAt: '2020-07-29 10:01:01',
                flowHash: '2nsymkc7dpqp0bhmqh588jcndpylul0m5dt5zzcs',
                flowParty: '3z2t12r3ggqjbcchzllzepbl7bmijskbxyb6a560ni3o8kjfdworzxc6i8qw9ajj84y92193ptl364uadd7hluk8fa40fnxvqf94glw67wsy4zqr3zqtm89qjxvsoxdz7m18tisagr9m8c55pnr6fizkyl6mgrx0',
                flowComponent: 'zzifh8opvzyu9w5jzgvqkidcqcg2xanx6paxhw9qtyn5ohm20swgsua9rkj30w2gtd6201h9oadxegf0gxpczg4p5ree6sbvcegl89d51sbu3mf8ystmueq6ye2rkcv86m02t9965c0q995qvv5syxitox4xulb5',
                flowInterfaceName: 'o316qntm1mmb7ngc6ir8b7xhmifzgl6c84ycj94rv0myesuxgud49lvt3wfcryt39urq24ful3jibgribk1kok3y58odhx6mgbe7n0h6pp5pvgwbon6o6cjsfj2flwcj2k2aqnpfbmnpejel0lu4r1hxy4zhdr5v',
                flowInterfaceNamespace: 'f4bv46kdflpkl08nw8t2tmsp3eyom3bt0byzhji3u4bo2wbkjanotpktu4o6nqzagt3ium9m6oeuna68hmwkfwnwmwlli7xl8smwz71cmfkhlxuv4rd0zejbsnr03avpo94fpfzjszy3fojirv6teks2fkb83ay9',
                status: 'DELIVERING',
                detail: 'Facilis voluptatum unde aut. Voluptatibus aut sit consectetur dolor. Vero et laudantium optio sapiente. Porro dolore occaecati sapiente. Et reprehenderit enim culpa excepturi temporibus. Libero velit earum.',
                example: '1m8qybka8tuglvy8zvh3bhz1lhjjjx3mzy39uuhkx051ojdaptr2v59r0pz9ohnuskesskt05wbj6sc4m0z9jiho8awby5ufpta0zeoubmgqn9djdna7v0ro8f5u4rznvetqwyc53wdpi7ida9mc8ykqxxbiqlrs',
                startTimeAt: '2020-07-30 00:56:14',
                direction: 'INBOUND',
                errorCategory: 'rczt26czgq6boxv7z0f7dzyhw938zevepjhcl10iu0hw75g7v68l14ifvcv8lmtl9mud44xq4lhoku7lwyen2mmo2ijmifcvvm1ndi9we5qjym3r3uni2f7k8glp9pkda1rx5ezeqif0mnh2fjdxbvd8fqs8ud8s',
                errorCode: 'x9jah7pjjm6jn5nupifseo0r3okinw1delrlqz5rg7t8v5x3ky',
                errorLabel: 682663,
                node: 6695741621,
                protocol: 'vtvc7ytwn274tdr9ryi6',
                qualityOfService: '9thhrixq0zq3t86iglr7',
                receiverParty: '8pgs1396ewnl71f6skwqlptihmzqg69r2muuatgnd0ar0xjamd3z7nsflkxie4ugyfgz2vdlj6p8virecrj75isbp8smzjgci5y10dk9h490nayqo2htbkx49jpnu4712yh5x23ujk3kuldjac7zmnp36fti651sm',
                receiverComponent: 'cu68kw2d99yi409h8mbnsf5hgpcmkmh73jtnrtnamrozq44p6lkf93p76m3jskgtdefjd55ja14qao76tz2woajf80jf9izxyqi9en6y9nu7scigbgfmc48rpcjom4qnihrrgn9vhpiy9qy4roxmr45dnzmxh462',
                receiverInterface: 'wjtyepa436a1zgacl042689hn6potkzu9ml816g96ear4doo78e7xmchpf3y56vogk2h5j98fuodta0bcismkafp8qh5jshd91q32s9lk36xs98mfsaletuncxv5wob68429y8zjssna4knf2snhdt4f24m1jmo2',
                receiverInterfaceNamespace: '1tbjd96k4ifxrrunqmqk3ip68zzmtfaxz2m1c2pcaosro6xko7uoi19xsyjh669j7w3zfo2ntfo2uhxunvcimu80xk4q2jo3sx4bkzqqhyohuww7myg9mg6vjk542etopl4eud0d1zzrsxy4fccsufpsrg6ae5p5',
                retries: 8432053385,
                size: 7958201330,
                timesFailed: 4279787261,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'hl9dgb1o89uk46alwivu4b9zd4xub9d1jbim22gnqhkc51ek4o',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: '1d4f0mzptkxjjn3hxuif',
                scenario: '0p3jx3j592wb98vfhskx6q67kfwmzzh0db8gg5vga4gajlkvf8ogx6a15x1o',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 06:38:22',
                executionMonitoringStartAt: '2020-07-30 01:36:10',
                executionMonitoringEndAt: '2020-07-29 14:17:51',
                flowHash: '5gpiyixs8zo6rwjil7uo9qer3gvqx6mqbrb61qs8',
                flowParty: 'b6kmtxrpakewiru4t3kigk0mszpsnpqifu0vrh5b0k11yzz3binimuzzqwaysvhvb2xcavrnz4atvcu1m3j2y18y9njlflkx9i4tzco31l3st7gdvyynclnwdebp7fq07vfql7we7ui6p6gi613i3mli5b3jobzb',
                flowComponent: 'bw6nlkxcavr8zu50zkr8jax7gzkfcbncttatfufl2us9efyiq0j63mcqg0hbwv98ftl6hxtc2akejcazbcyqttsptjml9hgxv0bhgdfa77r532jqvcggq4ao9ljxba1peilulzbyvyoj76utwli73e9vlvwbhas1',
                flowInterfaceName: 'f92jzuk2ipm3hgcaj8gjdp5ydadda2wuac85kr7azi77wi6kyvfa5qixnojb1kq7zl7lfzxviwc1803dhpr31c3zxx4mag4u0d2oqa9vvt0rav7i3py6n2fi3z9inrmtzd3axg2fmfxpnj9mf69v91rst2ric8cb',
                flowInterfaceNamespace: 'wgzpbag0oiijgfxb4ia8tqlpetm265vzwtsmz3yp9e3nayo1edu59ggztou9806fydqncfl6gdywued3dw5q3kety47fyl02as30lp182iqlla1o4l9wg30mtjy78vmj9c7kcumfyknwef1zd9twsx08xvx1s29l',
                status: 'WAITING',
                detail: 'Maxime quis aut accusantium modi. Molestiae facere reiciendis corrupti adipisci iste necessitatibus laboriosam inventore. Laudantium praesentium reprehenderit vitae possimus excepturi deleniti rerum esse. Vero aut temporibus tempore rem molestias optio consequatur adipisci. Reprehenderit enim voluptatibus magni neque rem quo. In omnis iusto et odio accusamus assumenda voluptas impedit dolorum.',
                example: 'b0zhcidjdryxmas8b1gx9ior8whrl5e0clm0q1jwl6iyvw647ouxbrrmw894l96rpqvq9pizck1524b5y9mnk780jmfuuocmasbc81omta7shckpey1910z0fnqdscp8864py75rs6robz52fxfxgiwc46hv3alo',
                startTimeAt: '2020-07-29 15:04:04',
                direction: 'OUTBOUND',
                errorCategory: 'd6xpebizbdhdhgiep2bi6xmbb9ok119sn4qrqdl9rpdh8svdggjtnjj7l0zabvvwzqmz82kgvwekxe35sh474uoefmawxsy0t2wnx06tlribw0znq3huwr2nozhzsw714fko5h3qtro1uoziuu52pgxgztqozvgy',
                errorCode: '8u4hl7iilkkt2v4wywhwbzt7npiydmvyzzasofj507kq0je9k4',
                errorLabel: 650055,
                node: 4180834257,
                protocol: 'i8yidyeix0m5yrklpbzl',
                qualityOfService: 'n7kckonjmrsi3ff1hz6v',
                receiverParty: '6l9r1i9xonjxud06xlkocjrshjg7nevez7hvaz1piy3k0z80chj6rdvl3pytezlejssdysyaoa3gh63h6mduxv5ollf305wfmew0zg9iy1dkh9wa588lgps2p7xq8fylpkiyqwa9agdyawqaaaqhrm1eg989tmpm',
                receiverComponent: 'kyi4oit4amm6gpl3t262yue9k56ym0482yx5ktphfp26mxro4aoeyj7utvs370w5jbddnswsqvk65s2rs4ea6obh2hqdld04sdkk1o6wtknjkns9r6z986k36xqltdcp82hskyixqvos4nm74i8tfxpblq63yodog',
                receiverInterface: '6u3rw60mmzamzq4q972u6km8i1f0oc2z0v8pc6ttcby3gvwstfidzb0qnb7vyrcbchlg0dpx7j9nx05unxrihpzc570pb1cji7pe2ofw4lb6g7oryccc2me0400s39pi39tdowhzt6lzestyemn9amn2ft4crgje',
                receiverInterfaceNamespace: 'ho5wvf0jjmxvk5oenhzv6d7bgtt0vgvj3nvdjtyg8ung8koa8vfb4rkuhgc3mxx7k2jazmj5cey00ji9m1jgt4qdfhquxrion1gqc2iv4yh14rn4smkium3zp2htwjwmnl1u34m4qmuta43ea7vmfaid23vh2yrf',
                retries: 1054099919,
                size: 1836774430,
                timesFailed: 7727487319,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'o0n14cqwg648wb8kyghlaulm5ygjmshg4jvzd52yw8phoeq4li',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: '9b84vpip7zf2dfju7rxj',
                scenario: 'i08ucbuxaem5m1jij1fp1l0tm5jeu6zlq51ulawiyxu2mbb6byya8x06jcyn',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 21:16:27',
                executionMonitoringStartAt: '2020-07-29 13:11:50',
                executionMonitoringEndAt: '2020-07-29 20:00:48',
                flowHash: 'tdiyxwebefpodzztyr46k03ir2lrnpmi09a47yin',
                flowParty: 'nz2yq5djmdl79vtfv1zv2dgompzl10797y6iblqzwo4l9r8fblmpsehdmpm0kjx3kee01yhxfo4s5bka1y2jk2kkdmx9ddt5n2w4fi5nz3oceb1j6jrf7oiq4qiq3zqeb4o8dlrt00aivq54546rtzkty3m84dgt',
                flowComponent: 'xcomjemnky2v0pwi1nas9w2dx835vc1sdt5b8vnkgcp0os8jksyqil36lh9h3ku6j8n8oswxz9nvg6ucu98ljk1tztz8lr4uxhyysma2qnm40c5qnby6kzwli3ac598jhx9416vdam0ts6oemk0i0lxmtlm74thl',
                flowInterfaceName: 'yeb9k93o21hqeks9mgk0sfvg646jw4fu6zyxtlh1lanazrmc0i5xld50y9tsmvr1aj73n99ti9qnja6lrp08a6xqd8un57gtrh52v3m9jzawenz4copsmwzechqca1ejrkvdmw2igx2ur23ux1qfy7aajulf8mpa',
                flowInterfaceNamespace: '5pbduyu264plleekfeu0m3nkk53duso5s4xeq696wxbvcgoejur9cgxvn1mxr3kmnv10jdzs2rpj34mmtl4q0u63ww4280vzpn6ukugdz0xgqqx7dkncxsnfp52pp2cwg4slsp8yk8nkv8k8c73egyc005chdubt',
                status: 'WAITING',
                detail: 'Iure quas sunt ut. Adipisci tempore in. Eos pariatur esse. Totam ut est sit at dolor perspiciatis.',
                example: 'ude41hhmc0iydm7j6tkvvyqh8elhfs71ixtba6ny9cbdxynvifoed6f9khxw9xcj33loj6senyhws3nr009ggbjroq3zyv4gwimavaajzyv8vzrjphc67da8dozh8vjc32rs40cqdse6d8vfekhnfvtzsf71pyym',
                startTimeAt: '2020-07-29 12:54:25',
                direction: 'OUTBOUND',
                errorCategory: '4znwn3oh2nh60kaihe531l6ldxuy3hc0skotrapouvop1uq6k8bugq7jmetbih6485k2d13qvgu225919cs70ly9yuihnhvu0jh01gqp9tbtcdzx401seuml4arzr6e57m1n527w2kaq1nfp281vqyftn7k06dfz',
                errorCode: 'sobr6muugil80mfny3itq7q96t6l1qbxuguzdm1qnb16ffb30r',
                errorLabel: 916213,
                node: 7514284214,
                protocol: '8vsszbo3k0158itq8js8',
                qualityOfService: 'avbmlbfaml76c0kk6msu',
                receiverParty: '3oo88qihkgpgta859dzltlmw5d5d81da3n1sqjdewt35d9q8xexq62mkpq8v7q7mdhfvsox8yy3i7k2kdu5squ1cnzcainsy5x4o4c89lqfpxnffvsm2gpch17fjv80bufi16nrdt2zlv8he2r6utz5rz6kqnejt',
                receiverComponent: 'rdufq42ocyk5uqva9h0tfby9xyhhq3nh5bmca7kifoeofiwpcidyccvx9xe3rw6vjdfmfo9noic1i0oetjnmld059yu0vd8cf7gg45mdaomwm6zcoemfpjm6elvag024f5t3ag2rwot1d76ymu7lqff3hvzwacv1',
                receiverInterface: 'h26ty6j76mcgkr49ydexxnpt8xqeqpznc73hqbvig6cyna0sqlreulagxa1331pmqy6j3k6jffr35mpfnxiplq2c3bgnwh2q79ed1cy2s6plu3zrkuu9u0yvhypmx95e9uuydiwdxcacy9vy8e72yyahyzv50s39t',
                receiverInterfaceNamespace: 'tn06b99sj4quvjjjl9ls2qnrxjl32scztx2cfogvi0f2kk145snqw2xyzlg083b60gmlwdmfvzzk9bbuyo3to5dgdesgb9njilcc29xz7x486znmadnurtzfubhfqvbhe1r071o0t9iphq2n5ot3c2azykit552x',
                retries: 5056155704,
                size: 3443726903,
                timesFailed: 4364643896,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'ekdei4oom9xy9zvb6eh7mybqzmrun82o81a4ocrsyhv0o8i801',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: 'q9lojxr0zum8u8tyt8fe',
                scenario: 'mcbf0j3kg78kfcl2tw3qep8b9qygk2hi4sb62papowlcbqorbcty89jizxfr',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 03:13:29',
                executionMonitoringStartAt: '2020-07-29 04:00:35',
                executionMonitoringEndAt: '2020-07-29 13:46:21',
                flowHash: '5fsvwmc59by34s1tp9x3ehoqh3o2yv9dpzpbq9mo',
                flowParty: '1sk3o4d2kqmhx969ic5lt1vartzxqg1xpi3tzw47a165u0zv18ki3bhn5ffwrn5yhvbbm5gxvbhhcv1xcv01yrzaejlazpeqypv0oqmms06gslwq5rjyxj16lqy1z1nc0q5d6rh5vbo79cjni82s4npi0zhkw8s7',
                flowComponent: '1ffoibmycmv27ptpwp5sw63y3jfoykm9k1c0l3gprd81wevx3nn46argn1krwd5zb9rpn9wo4ssnvex2gxnqwypkc1w1m4yiqg6x1t2poc43ktxdjo2za4nth48a6n0ddb1tz60mo4lpmi9e8ygtlex3bczfzlgw',
                flowInterfaceName: 'h7nebbzstyanhsx04pt5kkveb51m8vnerq8vwqpykeb86x9pu3kua0pd62vtl7a8mfxm3ovjqy8qhchqibb4umd6n34iu6j1u1gxrvzrq0ho4chea4u3yrd7b2s6zbwekh0w880bwj5ni72rxowvvqqzimwf2g81',
                flowInterfaceNamespace: 'qalzlzeav580owxaxxk8kuw9o0awoadc4ri3bv2yutqs58b7xzrjp1myk9y2504ipdreji93owf0fbzxsmnotseq1aynfqp71nts9jdu0fdhcnsxun5outhxikhlzx23dpe2hs44oaqjz9h8j63m3nrz8cs86k01',
                status: 'TO_BE_DELIVERED',
                detail: 'Adipisci aut error nesciunt debitis magnam exercitationem ad magni nisi. Dolore ea nulla. Consequatur quia rerum sunt alias saepe.',
                example: 'ynv8ej7ag9za15haq4yfxxz1nqew3zwi3zrddax8qk53p1nxk2dlnre6ijrjaay60846agv4t3g8sbiuu01hyfktnilc82hb47puhuso2tglv1jbu77scu78n6w6u59uvcodmlbgmf9h8d3r1gocgkat9hgygtr8',
                startTimeAt: '2020-07-29 09:30:28',
                direction: 'OUTBOUND',
                errorCategory: '15sl891i8fj6bgjkkteektl9tqkdq8nro7p1opx6g8b3mczzkwnn0ivo0w9wswgcsxzt1zzklk84q5bytupgl7z7yxhna6wjib4nynlk20y8wtokdddiutpyz8o42rf5u8hn6i84qgkuvx9ve10o4iolz204yf4f',
                errorCode: 'hvvs35ftnujkxst2ch1ehppuq5viyx9qezo0psdee7s1idrcv9',
                errorLabel: 265002,
                node: 2126555777,
                protocol: 'yiuxxxq55d0rglnro8dn',
                qualityOfService: 'ivyhdw1ta64eoowx7qf6',
                receiverParty: '88r7r8tvecdgqe6dxjh9qv0xsyi7jwz7le8mblzel21moa04mr81jysjcg2u8e68z9w8donssee4zddfeqpozugsbvolsv2zhhnuzq99m0wj420rcw3gvlvvs58oxh5enah4wtqlvgxhurgegbvb1ch2ne1rgrhy',
                receiverComponent: 'ivlr4xiba6neijpiproiwz5gzm747iiqydxiu4fyyfxvcbwdeq99282t75ypkd2bvqft1h1k33x5qw5fv2e14hyron5k13wkheynxbqprlzpgoxvffgb1ewj6bg4ovjz3qtrs12abea1vdg0lmvfshlshttt6yrb',
                receiverInterface: 'dvzuuo23oo123sibnz47n6ok9ckwlm7rufafxoen7bdma84x76bo1ab8kie4lbtmnhhit9tnrxztifc98601eiqgsxy5fykkoe2e3opdnexvg0mc17xopfpr4b6ebk4tconr88pdrr66zhu99oja1ycn2w59utjw',
                receiverInterfaceNamespace: '5y3g3ropef6gh1zgarjv1iqdmb3tswpe4b8u5g48gomg7ypjctk3y3cue5ejbdag7sv11xhiojsz4uns5wv9b2zm52mh32sgzve2jj8l9kcjyxv4zaw2afyl6bejkabgqvqn9j63h89lidxorkoe5namzdcqegc1w',
                retries: 8850780531,
                size: 6573652200,
                timesFailed: 4877721270,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: '3ncgdhqantfuw6r3meihj2jsi1xfxek58w6g9hvwo0ohdixox3',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: '3qof4z606eo4q1tiyrs3',
                scenario: '8zm1b19p6qayg95yz7os016wtxgt1lse1h6rhu81p1yfxepjnv54grs9kv8a',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 09:18:18',
                executionMonitoringStartAt: '2020-07-29 13:17:49',
                executionMonitoringEndAt: '2020-07-30 02:07:57',
                flowHash: 'adfnpasbxn7nuiz87q9ild4uv9g2ahwc7qjhv657',
                flowParty: 'hu9xvr7bauhbc4p9iauoh2pgvksan7afgh94jdvfhqsam51kzk8wqdh7jvq0dmi8ylx8xkrznfrzyp2kocc6dl0xpwq6vszuahqoxp8ero3pjzqj7teil7r9p64su92x0w8qakqfqfsycw21ear9t0plknfqwuoi',
                flowComponent: 'd8ue0tkwo826zfwf7iy70jm0nfcu0lngpafe1g6czcafjb95jk2zixnevpdhkap3drfplg82thp5p2nnky2f1sud4mpiyq3sx9l4he8p5gd34ulpepz6gb4sp7on0gn8k4trjj1olfifovtke7fop9x0vg02yo8l',
                flowInterfaceName: 'v59teg2pus3pgbsjgd2s4stlc07bne3ao5kjr560s1nexnxn6np0rblw9fm2wgnrs43sfkm9uqglg4txwjuvw38x8kjcre53e93xk992524xboo3d6bseb553zk3wegfvbh5z2viymz5p9v42o5s9q1onqz8t3qo',
                flowInterfaceNamespace: 'ak2bzca6lmbiu6kct6mnpz36y3s0kj0h5j5mkxosb665e9nhw1gf1bbtyxjgz79ojcp8hui5wzspa82uoc31krjt1x7hh6dgsagb8bgmxvp1gxcxmjdy2m9qiow0gbonjba7d28plasyg75c7qlbyfybrf6052j4',
                status: 'DELIVERING',
                detail: 'Consequatur qui deserunt sint quo quam quo officiis. Adipisci eum magnam. Rerum illum a sit molestias ut et. Sit deserunt quasi laudantium nesciunt quam. Deserunt provident et aut vero aut laudantium.',
                example: 'ynjffkyvbxi1yam42i5qe2ybiqwd5ew1v1jnixf2353eklkut51lg5fgf2qpo0zxkk1495qqwsnw9fjpmapq3owk89dm2zzh2dzc05dzcvofwpl9hndhgpf133doce9rw2amjvewu99gb58e4b093i0dgb77up9j',
                startTimeAt: '2020-07-29 15:52:36',
                direction: 'INBOUND',
                errorCategory: 'g40gvt4b6tfnthvz4t92cfwnf2zrhfnhgxjmy1p428o73x8opx5lxp1s1an5xbwz59x3anfpt5kd389m9lm6zirk3aoq98m3jibmss0efmenzpgs5178fpxkver92fvbv2lr71adqe9lpw1dv8cjrsve23pdfcyt',
                errorCode: '17sefy3oiaz56bdgwv2clnjfay83llkktb3w0yfoyjhnfc9xs9',
                errorLabel: 369627,
                node: 8594511755,
                protocol: 'oq2mj30u9vol6w8hfieq',
                qualityOfService: '9lts26n9hwzpy5sz7ji9',
                receiverParty: '0id5nivu5ouifxkwzhv6czqr7s5okm6osre03virm0akn4rtfzyf4h2zd5jl4r41q4fv8hrsepn8t3ghy47lxo3ng1zmciyqdxm1n3j929iru0i1wge8xuscvxr6dt4f2y9cqax3xdvtmlwr4optagupi9bvq1wx',
                receiverComponent: 'a4x0cewnzmncqch5jr8zskvbsna1yw9mui3um3cm6ieiw1ewq0mmskxdri0loxn5jybya2o8qv2xo1jlrl6z6cd7xs69bhv48z9zgveqlpgv2qvodalz4dill4nm90vjvyfrypull8udke6bfea0wu6rwo20kou6',
                receiverInterface: '3ax0qlm4h0hbumows3ajvb9h40hzoox61ohrs207l5ndn6nit8ayeg0tizzphl3tlr3cahsnvztuslpt9azalaq73ozu1qibisxqhwid7ylum7ga7r3q6y2xm25yt4k97kgmzqos99lpbriqtoto3knvku1kgzg3',
                receiverInterfaceNamespace: '99flba3o336fti5puojvsf1wx3o753dobafrzeijl1oxud8qrn8c3lizhcnr2gwsegfm67b6qxy7hgyo9561athym8unc0zeywsof2wejgmoqd6zglhetywddpwct4p3zphhr4r9744n4pobnjtomfqmnmdgpq5e',
                retries: 14467579536,
                size: 7666719996,
                timesFailed: 2890248736,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'wc53p0gr13ojoejhmsf1of3falhmoeztdk74psmc5sd8s4iya3',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: '7w3yxlkokacbjy2tmprz',
                scenario: 'm25c2d6gi9j8u2jxrgwyvlno9fma7i7wfv32ze91rq4xuesguo61mfkooh8i',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 04:04:11',
                executionMonitoringStartAt: '2020-07-29 09:09:31',
                executionMonitoringEndAt: '2020-07-29 21:21:24',
                flowHash: 'uzlpo8khvx9osnfl7w60wpoo2k6yc6o611us2q2s',
                flowParty: 'op4sowfhdb61iq4qv5yxhduj8qi8rdcw8j87l7bx2sxupbvi3vz646k3k9fkshq00ut905hnank6gwltm8qlrqw4kqq5kelzommiove81jatgeori24ltf30dojvya592fzx6s1dal1kc827phxofzm96m10ofej',
                flowComponent: 'ait5suh8twfmu8dy1kd4mwgsgxl1tuyole6l59898tl9zdrw2muo8eywdos7bf9frmdow7cf5yadn66oha5oe5zi8vpp9kdoo0pk3m2q9fs3kb6jf85kpotc1er4j0vnpcl17i0yr6lnz9x1evl8umh7u6al4nzg',
                flowInterfaceName: 'ueu1f6794f3yyc7vqtl7rbm5udk66xhbpxuxki892fi27zi6v5uzj3trvzofkrqev8q154jq4571p7eg9as5pc926us1l1wr429dakahxxkmpfk43akwl61zj22cwqf7us1c5j2n9c8seydzp36pe6ngbotvmb9b',
                flowInterfaceNamespace: '7pyz2sr6vdletq2kf1yeq4bnc1n86tde9zmizv03ljv5paookoxxyufygptblh4z0v2l0zp3ihmyfergvzddfl92uu5h6k1vsmp0ok0a0iudp3sckgyan6tmbi4ubxhxuipta9semav809atf4tjahs5ddsi2rhj',
                status: 'DELIVERING',
                detail: 'Nulla ut qui porro unde tempora omnis est quaerat voluptatem. Corporis autem aspernatur necessitatibus vitae non. Distinctio ut dolorem eligendi provident ut libero tempore qui. Soluta placeat veritatis ipsam alias. Magnam non ab hic impedit placeat eligendi voluptates nisi distinctio.',
                example: '2n5mxbfcj9tk5458oa3a8a5n892265qsdx9imxz7cttjutg8uha80992bei1ie370kq2ewzbsi7ub1g14cp4c6v42xr2tbk4h37bj4givywnaidp3vzin1pbn2qkkpbfhljc32c84v1e1rck5qlex5l638l0vumf',
                startTimeAt: '2020-07-29 07:51:21',
                direction: 'OUTBOUND',
                errorCategory: 'k5odmvns35fonvc0jhls45kao20qgtxykpprpxa8cuzxbft7bppqan78fk1o884bz8581rdmtl238souua31hqc0jl2hqkgzoi2uk5kuq6u9kkpheoev1y80v7qwu0lj5dmhvuw0fnlb9h1imr2s2xo8wgokfuse',
                errorCode: 'imq1b5ii9vzkmqs0dqikkair6ickccw715a0tzcdtqwz2fuhyb',
                errorLabel: 392814,
                node: 1478897100,
                protocol: 'm2r93bw1zqn7hpaje9ad',
                qualityOfService: 'm3epjopk15mpy1njdxld',
                receiverParty: '5i1xxvpie666alokw09tzru066tuf3u7ma8ebqurjsabxccsa3og6jjanlg33w3u73c73uc3bhdq217thif7uwadw8a68bnm1939qaynhtm6myzloi1jbvf6zp18ube1w69wrq4zatdzkomvwgrdt9h38vcafozo',
                receiverComponent: 'a5ub9m34d4s6i5rsyjlxelqilzrc5o6isvrcfd35hb96jc7xb2f8091je4le940c8de1324bgabbd70r0ezuv59yk8g9i2e6036xagisdwklr3s06whg6clrx1pm9aqevwi2h78u9zcurzpj34v6gq14yfhrwui9',
                receiverInterface: 'am3jnxl07xk0me5v4gh1rbw6nb4wxqsdf42r0b59jxs1jimmniurxy0hcvubrai0wfkfxg9czmsvmaoovaxp348zoqu8mtsp2h55ezuaniuknhm7lbg6v3ffht6dvqq5xe9lrt81t46i0lj9tf91toycl92pvfiq',
                receiverInterfaceNamespace: '9rneda4g7sanseevk932sfw5x4yvitiphlg3di9pgdx2vpgovwdg0uumag29i6gvsscem2qzdrcldnzdaww7o9czihqbq5wwb9zlq67lxjlvu94uvzd7hcduoopkrtswyzkwfnmj36g41y3exnh0ldc4o6bgblrt',
                retries: 1638376797,
                size: 76085602970,
                timesFailed: 6060698788,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'vr3wqrrdk4un6fl0emr98zotyc5kcm73rwpca6fcdb3pxq33c9',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: 'va2umgx63er8lgodzd32',
                scenario: 'hb2fydtb38kom1iv3zajfte5itjwabalkcd742f7r01h72iswfgumawvx826',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 00:17:17',
                executionMonitoringStartAt: '2020-07-29 07:39:03',
                executionMonitoringEndAt: '2020-07-29 15:55:01',
                flowHash: 'ws3rprx8mv719tlnlhkk3qi1kcucb72gmerxu9lo',
                flowParty: '84m87ght9mnpgqsvs5iebunbr37q5c3sdu8p2otjox02999ez49w5ve8rlnxuua6rf1526xwmhoqwvufpujk0z4ztm1hb7t38uqwrjs5stkyml9hei74be5rkh2brrwwzkpthah7qv74m2wmrf1slufho4vfnnm6',
                flowComponent: '13xnztlmkhgnhsfka5bjakuhxgiu32t8tzsr3ku0je1ov63scjcj0m2e6l6dfrp2wveb6056p8tv7cpnnn7ps7fab1f6ern0lic5bacqt5chxva5ou65kz5guquhn6yakuvaajs277kkn0u8tknvsalejruwd3nf',
                flowInterfaceName: 'du51pcfzigp3dbzcgkv06zvmjm7bn9e7hv7yq6a0lbdtks4utxtrayh2hzkwp3yr5k19tmx9lggoznsb9xam653cl6ysdxte9rynux9z6m4yu9rb46p4eido512q9zgspxnnlg7vi9oql1ojx8utqx881z4ke2lp',
                flowInterfaceNamespace: 'xwiwa6kia9rx39kewxsl2axzt1qawetk0pzphkup3oa20xiuij4do5ffm47py1nnszbfpx122dfctl81n6jddjuktkgbpdw97j4la52ezqgsg3fwr7fdyxi9nahe6l57cg4oe7yp8tfvpohw1o93j7dsx66y2jn5',
                status: 'SUCCESS',
                detail: 'Accusamus rerum magnam sunt. Facere aut accusantium. Optio atque nihil labore pariatur.',
                example: 'sux1rhkzg3909rotfsjgqmw3r6tiemckj08loc5uklq56t9ehzomuxxwdhbu9t7yqy2d7coo09wdppm49mh7lripgrtrfbb02h1mnxyq8tg5edseh6em4okykil52mns9bixciicuira3l4fgfsehi9sjzf4ekvw',
                startTimeAt: '2020-07-29 03:35:25',
                direction: 'INBOUND',
                errorCategory: 'm4y1ipe4d2rneeeuol86mx45irvr1rp0ao344iwj7garknz4999uhayvnxvnlwwzwfwy5ph7jcje03tjtlaa35boaou8xqpc3x1ukuya40fwy7klxswd3k3dfaxq2ebn1cpnjyn5bdmptuok2otpehth3g8xjlvo',
                errorCode: 'j4ls4q5xrsz30ys7p2f2wqwoz5zokvdimeo1zoer6rqfgc1i87',
                errorLabel: 992330,
                node: 4544983729,
                protocol: '9rfqs1zqjm246xg8jfen',
                qualityOfService: 'igbjmibcjyr2ns7va91i',
                receiverParty: '34ljmb7zh2qdpsvfxctbd074024e88y9ie0sovg1r31d0kxm9b7hrdy8ds88qb0c1dlth1o1hnw5nann0jf9ea49ltg3ph1a3uz58sex04btgtdy3rp3efqh8byjvzkqbnuxy8xc9xnavvao00eawe6ni9uwto6d',
                receiverComponent: 'yfbtv29i18y4g72qrxwbgjs6vhw9d95hjktdv133qmviep3b1mya48uhth9jf159jek7ph4wtpapx3nlyi5nvur5jho7jsgs6zpxpkdus5p99hnarm5zbs9gpkbxvarz1d089d5ogsl4d3w2jpl5opwddf5g5ovx',
                receiverInterface: '23zazlz2cxyby2h3c353ht1sgu5crr8grvwgtzj4plrx0g1casi1as8q1916lcg9tj6jf3z2gy58fso2qvsbd9ej1c5wri5ebr2idq7icaa2f1hmnym9m9y5hnkp89mnr7vv8lazabdk845befpepqhtgsq6z0ed',
                receiverInterfaceNamespace: 'aygi1icu6yzhg4u5me2xh2xiigo8z61qlph02hcevh7ntnffvin470qjsx7qgvitiwrizn5062l5z1tshypis16twz0a4e2yj7bh4unyreoo4gjoby1y7uet6bkaeoy6jbg9i9ru4b0eikbo0xtewa7mol4rc90g',
                retries: 8185363650,
                size: 7660183640,
                timesFailed: 27653487158,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: '5jugacas6ycnx1utin45bx3uc3nox3a7bzay0zuqly2miyczk3',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: 'yzs15noblf2nfr9dv8pd',
                scenario: 'axfqcqu8rr471s2wyv6s3u39a3ouq4sj6a99b73nug7yirszij145t23tvhs',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 20:50:00',
                executionMonitoringStartAt: '2020-07-29 15:13:42',
                executionMonitoringEndAt: '2020-07-29 03:32:33',
                flowHash: 'o38i7ju09lxe0n54dqz7kpq5wrcdlx1alxo6id63',
                flowParty: 'tq7n0ccti1rczkixka6l9oyrqkj749i29hgm666yz5n8byin81heonq2syl1ll4ub0e2y7tn9fa7a1p0clvtyjhrmru9bnf3ru19xxo0kt5vbzbuecj3opifs6s300af5cyrhufrq3f2fq05mikwzmvb8rndco5m',
                flowComponent: 'uv7kk37tw7d3he7d4lhat6xclel785kjzlm157m63ly6rx2jtwu739nj4dp2izbhjy1llf8f4isye9r0rhiyy90rx78iap7t65cbbggajd1tuygkuh7lh9902asnfs8g3vk3eqsb2gy37pap2fn7h9s26rlfxz24',
                flowInterfaceName: '9ajty7qq7im7apazxop2dz3wnio7jfwdvwipwf71f2fk5zhz2lk6nycft6v7lioiwq0dysn8ocld3iq87mmmclo98hqpckgfqz2rhl7d1727mpw237sl7bmv7z6zisehgdlxbp6sppfgsiwlodeur6uc6shi4hwa',
                flowInterfaceNamespace: 'wcvimcvif5e5i39dpyjcts8cpeg7xs95skz6c0ia5lstumppijilostw29j6f8eeq2q7papi1mngn92f1ckhsf5aklwqmln12zvour0ehuh19a2ocv730brc7or0duozhf5hid6dnlk01dwcufj3vd87q81ruqsc',
                status: 'TO_BE_DELIVERED',
                detail: 'Omnis qui aut aliquam id. Debitis inventore possimus minus laudantium voluptatem cum cumque. Recusandae hic porro non molestiae qui et velit minima.',
                example: 'x5dbc2abtnlhq1moyy42gnyues4kl77ac9wujw9g8ytqzvgowvc6u980hy3i3jlflxlk6fisb6ku7k572l38lqjm0x42j590l8jijlzeqpzppvnovltsbevqtvzzmq1x1wrkj0vgmgw97wuq8jsglgcaflua2bja',
                startTimeAt: '2020-07-29 07:02:53',
                direction: 'INBOUND',
                errorCategory: 'una5qq9x7ex33ycdkg77hwyhmywpm794k59r9qrcxobivap2r9efoasxxmdsmr0tkjubwwdpgiway47bezx7kg0j8rf4fw7jhh3idnb0t4fa0j21m2eh63aukenqn3vusil81kkcg7loyo6iive6tvhlcbz1jg7n',
                errorCode: 'rvamdt6fvgzqs5q12y410chradone8n3rj2bhi8dfdje27c923',
                errorLabel: 979516,
                node: -9,
                protocol: 'tk79uj8hdumqjx8owvn4',
                qualityOfService: '6ye112stp7bseu753pxf',
                receiverParty: '8wfb0ynleicpsjtwyvnubi8zet1bpiay662cx795pjn2ih9j4p7mc9uyv5mefiryi2fshrvl8hyj16vb23x1o2pfk0g9omxiih4rwl9ntyxfk9ilt1ti2zcqlf5vnc1sx118p9gq68g5zi0il4jcka3kahg1stlk',
                receiverComponent: 'uhjtu9wl93f93mressjr11jyik1mr8kpnq2pa7dczvyu8m0ugv24asmvosrla3ya9tu096f05a21v47xr3ebpsta6ioqkb16lkr22vc6wfb8rzfrqtdfz3v6yyrzlwnvw1v9gs5ebv7uu71yw6wpcp052k2h6y9t',
                receiverInterface: 'qtrps2a7tonuwgk80sydl3ucguyc6e1kjhhc3oo1v0d1ieuw77032mc5medbyd3bxkazvs7lj8aqxiy2dnkk6xpthu7dxrxjy7jsj1tz121jq4tvahuecad92y3o6d3v24fiesp9br2swngluf5ld8z0ae4d1flo',
                receiverInterfaceNamespace: 'l7ecfkgqr2tz0sraomro9eamxijbgqsr5jo54lg9kakpcyb6ccj2rtz60id4fl8h3iz5tn7v90ajbfh9mp1wzarmqqs86mvu5mkdl1mgjtj4jfa034jxbke68gpiv5wtulq2cz5inut1pyroeroax6xvsjgzu2z2',
                retries: 5535539545,
                size: 4942125247,
                timesFailed: 3827001770,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'h1seo8lq6egh6my2yqtzgx8f7zsykduyu26enn2s01uvdo85rt',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: 'igobs7qk306w0jz3kabh',
                scenario: 'ocayrqtooc4iheaknv6mtjyup67cu7diifialdjzm5fn9lu8pkssryoib3n2',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 04:14:30',
                executionMonitoringStartAt: '2020-07-29 16:14:56',
                executionMonitoringEndAt: '2020-07-30 00:22:58',
                flowHash: 'q8aw33v7tbkyhtku1tvjv3wtqi01mwwmy3ge94y4',
                flowParty: 'w9z9tghimslvaz7ye486eoishovpxb5e06r7jtjca2fs366ms2i8lry0y7uf8tyc5qijwpqfyd5au31c5o5loo6jqn1yu1hzb5w8t30i2x22us5ize9z9bh1nj9qspi7bzntql2gmlypmk6j71psqfy43msz6rnr',
                flowComponent: 'up0pf8swo5oeldpvy8ijo26shcd09wo7h029f3yczf0th7li2au3dxaqyb5s2s8mhc2rcp14l2c73gqpgl7jsc4ni5njv56mxrbb9uq8fe47z5g6c1japgh3dmkwr5ve68n7v6oyvg5bjnaqnwx0ne5eo2yxcbe8',
                flowInterfaceName: 'd846omwd6a9sixopj2bqs0kcx4m3spkg1jhnxkl61k3a0urxcvlb1cuft2cd5mbod21kcyjb06i92c04pocvqgk5h1m3udewz3rzsqyzpe2a0ypelqdx35v2m4b8f5956l7xf7kjx44n8ay2z6g0xu81ln0b8ana',
                flowInterfaceNamespace: 'b3x86bhk6cm8j1e7fku8aihur7eehgki0f1ydyost0ck16lxd49x1j7qwq73jaxk8yxiv2dq1dnx4ygkreo4utm1dkg4kqn5ow0jticcsku1m39zrk2rq9l9m3h61737jori5gijn00mo3woca7dxnpoiog5f0zd',
                status: 'HOLDING',
                detail: 'Iure qui vel velit omnis. Aspernatur ut id aliquam aut voluptas quia est praesentium. Ipsam velit dignissimos iste velit rerum maiores. Ut quo veritatis. Blanditiis blanditiis ratione nesciunt fuga. Natus in ex aut harum voluptas.',
                example: 'vkk4oi2119qbo0yor8wvslfoyfy8jhitjq9tkx1khtoopm15oz48xk340atjjl2a8n9h8bbncg6bt00ljiozxx9udniy4nbmbu8awfxyudaneh5tj4t8k5rg8t211bywrgnb7le7skarveobd13k29sul8yc7sge',
                startTimeAt: '2020-07-30 01:56:50',
                direction: 'INBOUND',
                errorCategory: 'nyok113b2yf9oy9efgxsm3983m9hxiqx0y4kh2eiamuzui0lpkyh2fv5c6hqzzadpqss5wk69lx68wdgvx4bfhv30v3dykzz4prhnluqsf7wb29gnqp1ku129le5behm9iy7t9xit5kotc1dcycvur8ckkhdt6wz',
                errorCode: 'l97zazqumbt4omrikl0dtw56ic0lbkxgq8edscyywv49kivlw1',
                errorLabel: 423300,
                node: 2190942678,
                protocol: 'dx28hsn0pb9xzinjonzm',
                qualityOfService: 'yhq27n1z38wjdazlrq0t',
                receiverParty: 'p2q3eey2u9kmjqdkjrngyr81i2hppuxmoiuube3s5fyec3m1cdxfjpup73qc5lz17ojvltgb8fxzxd0fwt7xp6k0xatowubosxzrxmllewkc0hzy6ycakw6ne3c0kbf9pxkxay80a9yvia4uapnxbku3w0tt2qc9',
                receiverComponent: 'g2tth5c6nijv1as0xo1pnrul820aahuxqvh1ix60kbgt0c2u03rf81lm0qq23qqblvhdm1x2g82wmrv67tk262122730b5crh9zj0ridonulsi1yzfrhs98tex54wny7jnc8hc37yjbeh99bcu7eeqwnkbop7jda',
                receiverInterface: '4mhlii52e4s5vnca6l2ezlvcxm4lqcceuvszm6lt1oggq2kobozyctzfxddgff3pvdc1lnj2axb0u1465wpwj3vwd3ex0af4u3josy13a6y1deqsexqakzz26i2ef8cfqlzu0m1x4n7e8dkt1k789d852ctzr39b',
                receiverInterfaceNamespace: '8reena5wfxtxgp2ti7ceogbchfbh5zr4vw9nyfqur3i4csat88n9bb44q7ovtmi8kypa9irie6liv8n9ny8ojnlkmwoshp7bg26eicbzwz97q7tkwcbcmre4a90s9bvyq35shfoimi31g3updd7tvaqjucpuooiu',
                retries: -9,
                size: 9028822132,
                timesFailed: 8710441241,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: '86ztvevif8zukpho4rwx23390998v5uv591aof5jk6iup98sdd',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: '0cz89zpaaby2hrbvhjcu',
                scenario: 'fzz896scbkoxcg4b9q98yuprmzplf2f7agmmw2ko80rb45oxxsym7lbs2rlq',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 09:24:24',
                executionMonitoringStartAt: '2020-07-30 01:27:40',
                executionMonitoringEndAt: '2020-07-29 23:48:39',
                flowHash: 'amxu45a8z89tv0pog93l5gcj912qdk0s5oww9swu',
                flowParty: 'zbvkhe06z1ulkodo1j5e0z2it4tue3t2kjgfathjnhcabkxoe5sj44xs1ow0mson1j3nqv8m7f05mk4o5ioyj9kcp5hw381hkao476p14rhpq1mnqspk9jsqfkth5qbwg4m1qy6ycd2zr8z9beqoxtxb2ptk3v4d',
                flowComponent: 'eri9di6ndf0ebmclzrqv5wzoqko2018lr7y8x6ghne71tadr4w8xae2b68k6r2nk79amp1k39eh1b80hkl24gmi6ufs0jarpn89s0ri3e1at50z0ftibrr2lhl036isf7qm5hd0x08swv5t3ye89enam0hdqj1kw',
                flowInterfaceName: 'ga50wf16z1fkhm3qlry7v0tvh47mz2izqrgxatmkr1xih3r91aprbgos6gq3p11u3w46zrgkdwotbyp5962cytp0hncpktb6riv76a4owcw9w2mxflvodm21pbi43721rv3woq3iqekynnxpzfuxaubdgw20ej56',
                flowInterfaceNamespace: '5kbx5pvy7dq3wilpl1wsqkrkyjs5lb3qiwmo488pnb9oj8bthga8nzl7nsbkunxxhvptzkigv5vjatr9bhpuiucjnq4nl21g9hfkuvwyv7w3ss5qeghd6ktk48ltixwywpsnsa64pu87i0xbt7jlovm8j2wkgg85',
                status: 'WAITING',
                detail: 'Est aut quaerat. Asperiores consequatur nobis sit. Aliquam qui cupiditate enim.',
                example: 'e09but6ds10k4iq60nzm0f6w0lqhitbqn2trszgbbn4saq0c3f6o5i0it9zkneoeq6ttyyzx6hlb76i8zgyh6x0bho07mz1hf4pr2bnxngeft5vigo2xz9ubpnh7krhaog8a3leonistagpviek3czxv3lpno2vv',
                startTimeAt: '2020-07-29 04:11:33',
                direction: 'OUTBOUND',
                errorCategory: 'oyu43tav7b8ui5o5tvfn9zzrosw569plgt1h7gqitv9g1btymzcla0kytwnezs4nszzdoh04ogp9g1ttu92k2tvb6thwjk5o4r0beu4tqs48yc36nmjl7kie96l7mgfmzn4rd624md5gyz8vjy3k3zy6a02yp282',
                errorCode: '8ow9d384aqbf2odidv35t35pvd0ate0d1y9130mszsdk3apnya',
                errorLabel: 697905,
                node: 1898041396,
                protocol: 'f72euhh3sctqu7jmkv45',
                qualityOfService: 'rzmnrylm8u0j7303ywoz',
                receiverParty: 'dhc4ymexu3huroiruwhhav0pcvmxuc4vclfnrwyxjxk8teyzl3s3katu4vosr6jm2fwj2m9aud2k6lhntnu0mdxxepg7jv6aiy2dx94t2lt8sxbf405r6gf3ih1il3okz0mjqj70f6gqgveukvpt596zyg29gp8d',
                receiverComponent: 'ezh6zywsb1e2h95aml3enut61ienlt6se442mtsxgnlicvc6mr3hroteoe7ei7jr8zcel3ebruhlibuyya698l1m4azh6rv46sw3u6drm7aitkkf2z2wikzli56zjan4ztvflw06znznsuckpzyx1s7zht56bp8m',
                receiverInterface: 'ixocvsl54kklp95zk8r6ejpctd1hwo1fivg988fh1olxcy1kelfcmvabhyhzfte65usqcsfporlf9ma0wkrtefsbknlrghqjxx36x2sy4dre364eqbv1m1yexi0uk7u0t712v6p9wb2g3600b3hedtbcoupt6cmx',
                receiverInterfaceNamespace: '5hm99uem6vi6nphelxv60e9sw5mmfd09ipfgh58iq7xzqwsglojpzdzrb02iyxp96zeyyafe31blwjfulknpwl9451ykgar3sr4rrmwzenqo5j30wq5w8s5yd39s19pcftdgopef3vdk5hhmb3fumzfynt840y7w',
                retries: 3406964983,
                size: -9,
                timesFailed: 9319806484,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'y4zot0nwbbc1pt96jriztronk4ei1rhux32hzjj4oq76kfh172',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: 'azuvxym7mklnffigmstu',
                scenario: '1y1yw7kguq09dosk556km55dl6xo260wa7yb2zuqa31sp843ojogqikcwedx',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 07:55:06',
                executionMonitoringStartAt: '2020-07-29 23:18:13',
                executionMonitoringEndAt: '2020-07-29 13:15:45',
                flowHash: '9ajgff3dvt0jnxfq88hrv6ovgk8xve7sj71qtxsl',
                flowParty: 'g0e0nafdm5yeo44j9ofg7kk0xqkph6po10s1oeczvb5bk862vp5ezxkir1zz3h62jyz04z9f5zwxbw1cirjw8prteyire0xzq6mysslrz6jv7lega3em77ffam9ou5k06ktxlgbn2xwsvc39ob8knk7ns5rceh4f',
                flowComponent: 'n9wwihepx0dbvbwey131q8ggb2l3uc95986sngb0umvsr6o2yo2iuhcb7y0m45t8nz1ajuok6l5eybv1vxf6p4zk9h9wgejsd2ti28azkpfb8eeof60dgt62r8dk86f95r3t3w5ub9bfx7vocvblmsg0fvp70h4p',
                flowInterfaceName: '2k7bzz0b8um4mj5jniax6wv1u61c207rpzi4hpweo8segkfd8gz65xlmtv1krohzkv7idxuuixwgrcoqjzp0wfwq6l29acduw3fdwucg7iu9c7zmlyqku8k39sok707re4co1chcter36mt0onzrugs6dofs9nrh',
                flowInterfaceNamespace: '30j6shaq6ihgw63fu7t67gs14jgrkrkrxrwcn0bmc8bd5mzmxpio65vzcuvewp3zaz8kg5cpcicmsgr6owcgvxbpm30xuxap0w4a0onh19mv2rxodf6vy18cnbshi6k3eagz44pa6ojist4yyjwdhqv54pnwcxhn',
                status: 'HOLDING',
                detail: 'Incidunt suscipit officiis id nihil. Est ipsa magni magnam non non aut corrupti sunt. Quidem aut et autem odit quis quae dolores. Minus fugiat debitis ad molestiae beatae alias molestias vitae. Non amet debitis non sit odit quam iste. Quae tempore ab et accusantium.',
                example: 'c7l9zn93vou1q7l6472w9ulrz3cbi69ni0vtu6pcdnh6fni088f3ijz68v346ar64ycjwho6mk0jpdyh9m0wf4dwgqxbourm68lddkutj5csm5nox9na04xt071s3g0o2x0gur4rf6c2ur57potrc6mvnbus0c83',
                startTimeAt: '2020-07-29 14:59:14',
                direction: 'OUTBOUND',
                errorCategory: 'vszuixlpa00omkydhu6i7ihvp69eb8j5tr4kf4r8abj83cnibqwt7eezz0hles8es9a20w4pwlp9lgnbpq7ogb2vmyaozvavm1itz1gzjhrr5c6ebg1r2s6t03b44i90jjoax9q6rdwdbh8iyzo5x02xdfo1knkq',
                errorCode: 'xo3l7ouawegso93gdqq74rcu09m8rwudrgw87ltj1dlr3cs846',
                errorLabel: 686648,
                node: 7809943290,
                protocol: '45jngbuz5n6i3mtkknln',
                qualityOfService: '3shtskeaxhdmeseub9xg',
                receiverParty: 'mzt7htm865xiprjy6d65w56sc6lq9omtmfzaqtg37mne7yxnamvxicb25xh1a9w6v24yrl9dmsc1m8nq6s4tvncukbdydzdhjbu1myesnlbw8xnsx1rtrn4vzel8m6zz374uujatu2n3fxd6fyfxjjv6xvb6s5ah',
                receiverComponent: 'e01ku7y0hjy8og6ea9k68whxqa80ovc7xvpcia6cngkcfsfjjhuer0drb0opthaxaa7b6t0hx6x3v704vj44ub3xu5qydnwwfqueq0wk043vcndtlwrozticl5wl0twmnqsrsw03wd6b64ne7shj1pxlfk07i3xt',
                receiverInterface: 'ojsvdzwcyorlroxf6g2hardmzwm5ru7o05irg5ncut1arjc54i6a5e1s453jv1eoafsekrydjrnq4k6vl29rizbbqriorptegnoejfryj1edjropow6w5dvn3rjeyemmcnimurfqgbip5vstb6myxco0y6gky9o3',
                receiverInterfaceNamespace: 'dysy40t2klc34c8i3nx94ufawl4oevsxffu0jizuus6mzgklrnrqolxp4b6jnlksaulhy1kl5d16gz86lcd8mh6rcswyzdv4897aug8bheofr18mnlelpdzm3wotjpt4onaxzwqzouq096bv5txvgc0z2wwwl1rp',
                retries: 6643096092,
                size: 2230801621,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'zjzuzt302q010zlnav0c1soooyn100qo0aybyrhjdr5lgaoz86',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: 'sjisof8d9wapfr89z6f3',
                scenario: '30gpi9bujv52kavqwu2u96qte3k283rvzg7vrf399am8m89yt9a28u6ijfb8',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-29 04:17:36',
                executionMonitoringStartAt: '2020-07-29 02:44:18',
                executionMonitoringEndAt: '2020-07-29 09:17:52',
                flowHash: 'okk34juouqzyoopnau8u1b0cn1tn4a0yyclynlz0',
                flowParty: 'm3ib8p75zweiqithy84bqfro7bj9exisp4qfv0z10f5tlikfbk7wo88gscshdu84ssmctn418tpyurqbuq01txn5qgmex72q695rz68gg4h3wh34csikquwmmed9pzgngsvjyypnwcwzhd3f6mnsx6owv8vhydz0',
                flowComponent: 'gxfcq9b9t615fsdiyc7544fd0c3k2zcuwqz1akvrr4we1mljt1zi6z3fft4v2sxulwss3dqohs6ndabwwcjo9svolpp7u419n4xe5q81xcxwkgq3pm3bl1qaikz9nu2uy2of9bzev5mxkdykg9xrz5d4p0hl0xwx',
                flowInterfaceName: 'bww7qtvkadnhmk8251fj6utxr3mb44pai9k95xr70g94ibk3sn73051p7wytbm4jbeews7a2imzz0jc4p627rzqi3t5qt6vpcyo1h590z794tafgg507l5aes122jwo2o98acsmbry1horddto08aiduxm4qkb1a',
                flowInterfaceNamespace: 'm7yxvojysfbzp7vmywmh22jlkkbsxro8fy34yev06e6n3jv41cp8wc4jiwfj41u2sq6zfdkx1sh7rznd6fvyzyqn8wuhi5lx49tzpzys7uz6tzm67l9kl7tprt1pu5mp6utfauw8cjp2hpbazwnmjezkmh9wi07r',
                status: 'HOLDING',
                detail: 'Molestias earum voluptatibus maiores iure expedita libero. Rerum ad esse ea doloribus laboriosam quae architecto ex. In eum atque.',
                example: 'btki53vmwt9fc90t9771fl2r3drqlot1vv0q7vhn548j2vu7qii6zwirfp40yvelltj7qqc51z0u6yit7wkdo29yb22ru2xvfygn0xh9jniissc9hpt4qjhyu8oiqaha46yhl8udnc63lkp4vd9pt41xaenjscj0',
                startTimeAt: '2020-07-29 14:41:04',
                direction: 'INBOUND',
                errorCategory: '62ul5poyvi00xby7xjfbluxwv7dkvjyqcb79i40j06zlmfnp4fspszhafua8on3c9vppb1himmynly8vxyq2niw9gan4lb3ymxgznja85ezso7o35ubbqa1ekhb6o5qil2m0y5wnbgq37c1yh8j51vekigyi2fa0',
                errorCode: '9obvrmocd33tj3hcnqi865c5gx4mv1r263f3dlwj0bomwsdvho',
                errorLabel: 514676,
                node: 1467068270,
                protocol: 'qb5dc0ln6rpa4halc3go',
                qualityOfService: 'ni47k8retgxjpu6tn1b9',
                receiverParty: '11gjl2o210aw1udmv80i5vvzagfvptty8rqb0zzc5h1e1mcr3xn5fc8cofozip5zyjeam6w99zd687wxe6oqbbv5v798v5n0tv1cju82m7s7e0t4j8wblyy7mzl4aaed66250b8y39s0we6s3stpk0u9b6qi3kej',
                receiverComponent: 'm60gkljv964q37h5wvrn9fhyne8gfjaklmypddram19m0qsrv1is1rnihsq9xuhimfu472zd2chuetk7dtr3fn9q0d42jsp4kbo4m09pso2vo8ytjbahesx3xc4qkvrbu4mvvb83qahdtfgqm3gtz2e3d5vkbcmc',
                receiverInterface: 'hqikqe7re56a4rk01ykg8bez8m8v7et08m8ib2ws7bedmw1p9klnv4u2kq2jfax10jsvsemqcwomitkykdjf5gjorhtrb188muna2f590vfag5eyospue101ttelbov0h7okc99ogaj2nf9701ttodh94cb3c246',
                receiverInterfaceNamespace: 'xnxsxuhvg5jqmly51yit4grbwjbwd4v32lgzzmbe16rnzbdha39ejcu9tzdtq479veicnc4wj7nnnguivybfmk1ct0thzyf8b37r17cwsx7f692yq84w86k2oxirmzgplch4szexeoy0sp7u3z6jbh2j94pkcmvl',
                retries: 9930728761,
                size: 8795718389,
                timesFailed: 5760742520,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'h8ot838xmnk77ovs7d6868w5cbhkzyttjmafqeolcxvk8oszvl',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: 's1hn3okofplb4scsh0rh',
                scenario: '6774rvvwe1xyg24dfaskj4vl6v69r4iwv3cu5jxek1sdht6bawmj4zznoijk',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 20:45:42',
                executionMonitoringStartAt: '2020-07-29 04:18:07',
                executionMonitoringEndAt: '2020-07-30 00:20:37',
                flowHash: '4nt3g7z6vxm0fzuolrfic2gka0wl72ugpizm43d7',
                flowParty: 'haiu9l6n3xq5n92uaimfghphdh6ctruu3rl29lm0e7rzmxmm4af3jzkkthcocgww6mq174jhuqhjyy6x2ueyuadad1a4462pc8kdhm43wtnithnubn560gzrcfb4vgtzm5618ei8jberscos8e7nb4b5dkj5oeyy',
                flowComponent: 'kstf75un6zghwwfl8z1oomrgnvwqh1me6goyaeujtkil9arpiltxbtj4edv3uszto7lph4k6a1t59rulb23wli0mex7kjkgezgwyi1dyy0yq949xpfb6ud91k1ax3t4e517q3th0vjx6urs9dxnpo2uvk0sf940x',
                flowInterfaceName: 'm4yu596kxntgcv6qtpy8y4ccqornfu4rtnqg3zg8j7kes12aurt991q62mrme3x9kjibzk9wlzaf7h2vomd7eemqe494eye7bi06izd79iiel2s1oqjy4mq5nepbe52uxttolcc9pnhixlh4giwd0mnebxn3tit5',
                flowInterfaceNamespace: '09ruwqwxq8r4qwrmv7qadqnu3bgt9kazm0fji2fiqocku1eoiiutirw8gnxi1ry84bumj1whratpqobut8m294ib8cmrpo4h20kl8l42og041rhc5p15mktm4upiw3xoritutj2pg5t7brsrd8yns2p87lkrxd7a',
                status: 'XXXX',
                detail: 'In occaecati architecto sit. Quia itaque quaerat esse accusantium aut quia. Consequuntur consequatur eos aut veniam reiciendis.',
                example: 'dwi41ai26rtn9qcz0m951c84x7zadqai95q9fjdnw2e50h9cb80vbfxs713s5ptxxxx93d35qvv1jyyt4m1cwkwpedjmff26jv2oss4ikyfe9dq6zndqd830mwi0kzhv61kl8smve1pg6jylgg2yjcw50l0v58xt',
                startTimeAt: '2020-07-29 12:54:24',
                direction: 'OUTBOUND',
                errorCategory: '0m9160vv4muvmfscn27ws8xmnvro850fko5qhi5j8pi5363whf3tq06dslmebiu9ci4gjo0eyp386mql21brc1v59igkrfgyjq3outr1uis20yoythq6g0bht367192xcnl9rhwxae7qyxm1je845nnv4nnzyst2',
                errorCode: 'adc6tr4egaeeq1tl1bx9ni6r7vkcw5pivaavoinqahmmu1lik8',
                errorLabel: 247197,
                node: 5799025743,
                protocol: 'gqcusrnsxli6zbae0i8f',
                qualityOfService: '4o2cjxpy6rmpr74k18tv',
                receiverParty: 'd74s7cvthcquxv3krpu0lavqe31go6c5wwyg8mivo95cl40438gwl03ntnrqo6hixh8ctu2leyg1f79mzt84gcxu32lub2y3qgp4g9kyyy8ph8a9dd61mdjmbob3fl22kqpl07ogbt3ax6p4wj5m640exe0uptgh',
                receiverComponent: 'd81ndsjus6xuh5orvb6hjvpy2sjun597vlsm7ss2oke5smu470ggej395efj19r3dcuvjbk0fjokchy48pteas1u8tnkbmh6l5lk4fp1t8zehfysp9qh62h9nzphvh6qtqys6hvdppe8pzp4tz9drnzh5clfwj6x',
                receiverInterface: '500zplo72p57m262een260b1p6tde442kxpp27uwq22qjcv0b3q3kf49tuol602urznnt86tti6lbmok325knvdc83j2csaaq1wsps0oxhoghkj9fdrd7i2mdyzztrgsufhjk21mbeqyllpt6cisll1fxdeqnra6',
                receiverInterfaceNamespace: '9v5a675zruqqafyxcstg3vdd7xxzvcngkpgi4chqv0nvalret8shdjcdzg2p20v9npebpexllbeyl212tkjwgc1adp5qh1u8fd1oby5pfzr30p4zz00xxgo2a16qir28cs1zx2qcdmxftcxn7920yp9os3helurp',
                retries: 7690320979,
                size: 4138288011,
                timesFailed: 6464273974,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'afickglqsbcleugh7ke8f18di464abm7pcyvmzmds15n9cyw3e',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: 'wcsvhbwlyiyasrn87a68',
                scenario: '9zijqmi6xzzrerz0yg3amvs69qq5d84zhu0cpt8d7mo45s0i27rkxp0rq9mq',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 06:28:25',
                executionMonitoringStartAt: '2020-07-29 14:35:09',
                executionMonitoringEndAt: '2020-07-29 05:06:03',
                flowHash: '4pgjv8s2v3ehnu63gwc804cjrdjfen1891yy3wcc',
                flowParty: 'v7cjgzx49cbzpsmp4ta3vtvzduyooovkfxw5gqocnwkopyqsbb45vlgd4p26uxr50g9c8gravg9ujgxs14wpfurspiqirzgef4zwf2z7espvhnxgslvkiw5sasbcx1cw01gqxfo4z4pehs7ya9ecujdqs92kvwbf',
                flowComponent: 'r0xl93f718aux91f4aeb9tg9vmbh72ltqyam8hwyj9x5ad9z0p5v73d9231vk8so67rx3nkw3mqbw8g95bz6wzs263vt799dmbs7us3wv003wkvx0v8tjziy3c3ye307rzczfll8358wl8lnhicyfk7gv53tf3lv',
                flowInterfaceName: '6kno6d5kmynp85oe59ibptmy3tlmvapkkfb03593r7oj1qi6cx6g5p2g986joy30tns5drqd15cervymo9dbqnj82f6qyqd9enmz1f9v1529w4cn9dn223158vnv5x5fohuw30w52j9rkbjsmzlpjpxafs1lcf86',
                flowInterfaceNamespace: 'be7bj7jfkberlht6on4xdq92hn5q9e7lgqni2ltpehn20o609pb83td903onst4afkmicqf60ou2hiw26pv9f18irpuc1j8hsvaaef5p3ubcgqhbisvwbwy57hye5u05buefnnccow1y7x9rp3qwlwz033scza8n',
                status: 'WAITING',
                detail: 'Nam voluptatem voluptatem odio qui nihil laboriosam consectetur id. Possimus aut voluptas animi tenetur quam. Est minima qui dolorem et dolores. Non vero porro omnis expedita eos repellat ipsum aut incidunt. Blanditiis nihil reprehenderit itaque qui necessitatibus quis neque. Vero beatae minus maxime nihil harum incidunt.',
                example: 'ak61drtlycyrts7fngkf4pw5vt5qpb56l5methbd9a2dqf0ev3str1h0jnw0ditj952y5qw57eo7bzyx0tksbjjdm9pungd8ov9vyeppdr6io532epiyykd5lttl59ytntvr1kb7f1qy1zw417dy4skl8dvo5b7h',
                startTimeAt: '2020-07-29 10:38:30',
                direction: 'XXXX',
                errorCategory: 'j0w1hswq0whvx0c24bdn4g2l4w81vtotlwzni9xzxlwounfrmsg3vufxp28pviny21hmdvuz0ztotpqh3mlwjr9nt2afnpomjpbcwht7trazkotzt4ls4v39rbduf5qp1edbf8lv12k9e6td5r1n8ae1oipbvuv7',
                errorCode: 'dr9z0glrmvkq0wpbhhz9ju8kyt0vr6gt2rrt3m2odi553ysvie',
                errorLabel: 110321,
                node: 8034259183,
                protocol: 'atwkqima03cde5lx3cpv',
                qualityOfService: '03stmahv2ojb4pcpput2',
                receiverParty: '4cfmndv2al6p97de6h8g1jovyonrb4mpu375q5bezxehoowldrk09uu1x44jhp48pclajf0he79xxzh2rc16ilceconiif2hews82zi68pu49qs35g7ql4lqsrucf28ji48qblkck3x35te0up4wa05mygxzidyl',
                receiverComponent: 'fnfu3kvvs8wo0xk4mzxtzr9jrx3g212jjirvryz1oo4dh3wuf874jjr36lay7lui8ww3e2xvs7xpxmy4k3bzuqowqiaxstasokaa2jl7fdoeez77w0mqg9j9ujlzum1k17myype5e6b61go6e4bo0hu5ppw7podq',
                receiverInterface: 'r39par3vdiha0fjbcsg8gj0a8i0ghf1viy1h5y8jb8u4d21dcgn5bg960id42em6fyzluu31nuqnepuewnbcsjeubmkg1mn1db7rh7jhaauyp8s2qddlwnff03hobkjgwvjo362gibvny7dn3x9kisfy6r2fd34a',
                receiverInterfaceNamespace: '4ayfd9e1a2e5wpd16rosjaody90dk1o57lcywa35dvh9za1jtgelcqx7l567i62vk8gcgtn018j8kni6exr5lanqg8uwhcnzuu52xh429bt98119aqp6stxbqk4xeq7hdcvy2z2rmo8kpvsu8wt6ol7mv9pbmz9a',
                retries: 8162863855,
                size: 7516622850,
                timesFailed: 7461155883,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'rmmko9m1ae3as1q0j4su26w4msrkibcfcvaooig2e7f1gvk1t0',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: '1o2ta6j49xkbcabgxfxi',
                scenario: 'adnpccb2dypxtc4iy2gjg0ca46g9ssiqxm12ym5rihcjcy4i7lvvqutcd73c',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-29 21:13:49',
                executionMonitoringEndAt: '2020-07-29 10:18:56',
                flowHash: '204h2hwhjyead6hblmd56d7gqmas1m2mjtqyb36l',
                flowParty: 't9t7d7x8zfshi7tqjsxztspgr4ckn3att6kmcvau0377ge8dpz0ebdo61njvrdu73awj1mphmhdgkpl1nvwokcb4ihwsa8454bdvv80ddg50i98i0dkx75ry3cfmedj9n9fjmvf7hz2t9wxx3zw3sx0e41mmpywl',
                flowComponent: 'klkwskgk28umqlq2efp1b3ibe6fsmpcxe18xe5tvxp7xdm9d56kmeuinvfnyco7zzu1xiyggvkhaulv7wjucwdysp6g3h4hh0n9vlik9qxzo76nw73j6vuulocxnimo6bqmikytq9yaw4569j3lhp9j3z9209rsv',
                flowInterfaceName: '1hpj35u9utz9ce2bbvpk93e1wecsuhxyq5i6jc9piwg1cns52hodk9f20uj8nsja1ijrf0glrzrtbh4y7pijbiwsozs854z3eahw8qdrk5ex1w253tvkenp136czn20ad2w3fcfapzcswku9cnqqucjqkh8iz0w3',
                flowInterfaceNamespace: 'gmaaihmhipjt3yiglac7artg6qz23m7wit1climrxvkrt3xd052rxwvmhh4bz3uyz3t0wa7nx7rewm2xg1hdllbl1crzo7qt8irzxekq7atoels6s8qhlvbrsmcfo46l592k5ju2j44bmb799q2tp3yx500s4dd0',
                status: 'ERROR',
                detail: 'Et eum et ducimus quam mollitia dolor fugit. Et deleniti dolor aliquam consequuntur quo exercitationem et cumque. Repudiandae asperiores harum. Qui sunt temporibus odit est in animi accusamus reprehenderit. Sed harum ut quia nam. Ut aut eum quis ut esse laudantium non voluptatem velit.',
                example: 'tgudrexnzp4ddc7sdf6090f2bs98z5f4srfuchkwp7ciuerwy9c5uch161w4ikbu6o42uriawstkbseu1khv1v29r20evubqaifyz8zmd1e8jw2lcwpg9hnfh6lmzj4c58d5bg2rena37sn4uuz396jwp1kcqpuv',
                startTimeAt: '2020-07-29 10:04:50',
                direction: 'OUTBOUND',
                errorCategory: 'ihtiofntm1trjl2ik4pizicmen3w7k5gevx16w1ex1ja4sgdq2638mpvch5vun2q7vyyi2er22a8b74ye1eafjn7rujexjofez312ebb4res5eq125fvqh9daa7x2ai3ypsioh488iqwbi05yxi82a0jdcvjaoiq',
                errorCode: 's1a1qpabrvhsle4m0fqq87pc2ia03jkmb38qv6zeqcs2dwoewk',
                errorLabel: 992950,
                node: 3636352295,
                protocol: 'wssc9nipuxejda1blql1',
                qualityOfService: '631rrwbzj6lbwyjumlya',
                receiverParty: 'xkznkbwicc9fdqv7ogfrwggfk7mwlgi94thjqg3kva7219nt9389q7i82e492ys0hzwwmg43k2thzkyeg9rn3vcwrdoir2wuf6htcjwgkczc02ibw4i4ipp8g104lsyg4zo6kawvxlvkusuyorxwuu2atyhwwl0w',
                receiverComponent: 'wq3n1hel1yocu6usyalnpj188og1t4frn3y2gpjisyyauifldo98pzuidm1wwcu6somku3wtdiohh1ze9jc3x1r7cyorhac85r3jsznn8yjymutjmf5xua9lc3xwin03kvtf2jjok5oz6fbjyqbbx682aggx2v58',
                receiverInterface: '05a6lir6nmfk2jzpe39txpiv46vmqogz4rh1mngahny1ipzmasgebysd3olfdv7kymwzaegzua9il1q2alvjvx72580vrfjsgtk8l7he1swam3qci44za3tnaskzjmmgfsiazut95amvhhpg8znuc8hvr3xofhbj',
                receiverInterfaceNamespace: 'nalpxp7ucsnw8753hrsw3nyz5kpvxfcl6eudfvgxtehsycqevt3krfpt8c9d5pjw863qn9k6zz59p77hgmz37gv6yi2u8kd1jjuydhwh2yv2kp6y4f58jyzrjnffdt7oxrcgr0n45xda7ge6d87vae5cwjaxw683',
                retries: 6787324153,
                size: 7214931884,
                timesFailed: 7003834927,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'gkdcdibll852480w5h3m3asofppews05jwhrg7kt3gntpyqxsy',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: '5n2gmzqayvjj6fgwpsnb',
                scenario: 'a0w314ij148k2n2cg5y3686ebgco0qgofl0getb6ez26spa7om1wx2ctkqmt',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 01:10:58',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-30 00:13:04',
                flowHash: 'k0nrv6xe2ru51no37fknhy7bdpmrdqiatg4dgo1i',
                flowParty: '5f3fb3mexxh61qmlfg1i3l9zz0u1l295t1xdk6rifk0e9380o220utkrm2qyno7ua1300tpxjtsyz176d5wp8rvt5nks1s8xspbdica5hfvi3p6f501w0hkk6z6wvi4lkenm50l8rt2bwwnl8401q9nfin6te3j4',
                flowComponent: '85kj34v9154aytchf59l9e4rfeiny43os0oarxmmy1q7eiuloyv02ffbzy42xprtts4n7fqitnfez1uahp1pnydz1vptqk2n532hfz54ve6vh3yh0sl32rox10d9ubd31d9szwkp7obsutqxffumi8ovh9xp8j21',
                flowInterfaceName: 'td2nf6evlga2wa9nj7cjm5l00m6d5wikmqnzw2fksi73ja9ilc9h43n1irbw9du4ufr9rp04eo8ubs0xzwytw0nb3twp9gaqwparonym7us11857kwfyq72epn74p1fypuzn3z8n82pttp3ehvgm79z2bhjkix0m',
                flowInterfaceNamespace: '101x0fz5so7l3pf28jf4c5ozo16r5xateuxw4alznrohbvvw2lygtj9wh3uhv6bn6oew1phi5zucraprszr7hcawqxn8hxkr5catb4jn0j5egbk4p3hjf3yr1vxacmji80q0f57yzurph2o7tvaqss9955wewdf9',
                status: 'HOLDING',
                detail: 'Quas et repellat officia earum voluptates optio dolores impedit. Totam eos nam sapiente voluptatem sit omnis. Iste ipsa quod non tempora excepturi aut. Voluptas rerum fugit officiis iste quos beatae magni. Facere sint assumenda beatae quia aut et. Suscipit accusamus veritatis fugiat.',
                example: 'gkgu9xkht08fd0sqfq9705rnfy8fbqc3518boo6yagq3lmlz4nhes0ltua1cnk1kcxsr88aaho9kjt7z7yzxf2596vcnldu2vkg0qa528gy4jwtvylukqvm8mqk70tktts8vnwje8xacuveoyr4agkllzfre767v',
                startTimeAt: '2020-07-29 12:37:36',
                direction: 'INBOUND',
                errorCategory: 'z5ywr382ho9mvuq3jhj5swywyio8yg6vpr2vkxlygxuhj8lu0hb2vzekp4vg52bj9sb7gqgksflu3ybnleet8rd60gfci0x5qkce9r7g83e8biste1o37yemvq9kjj5ap5gzm06gs8k75sykd7vz2ra2uf2yom4u',
                errorCode: 'v61om4xsa4dw5q4azsnyvmf8tyytupyiyq8h9853dhhzey1jq2',
                errorLabel: 968340,
                node: 4327525165,
                protocol: 'ecavddbl3vgcx9be3xe2',
                qualityOfService: 'btd99m9jsic1d2u9ky96',
                receiverParty: 'ewog4fw6obokchyyxwklgau0pkifmxtdol3bp1cn0e19ar77uujgxh65feshm5fp66oimg2c7n8xyvno9l1576nns1hys44f2584700icarboc9p9wzyachyawugms62vp9xk9f90wlrnocac3gf3fd4qqmtqaa8',
                receiverComponent: '4244z6xwa882kj6ozsa8bg5v59h9gnqbiqvnq57fynq765arwelz9dcemyzn34endl3d6s36lqmchj1jp7zy4f5lsbwszf4m6s7brzzshi3cxznsz3v68idfxaqs5x90u4763awsrup9380hsxavph01kosjzxfw',
                receiverInterface: 'apxakyhmlsruurfi3p326ap7r54u8dpepp5lk23snbm2hra6o5pezor3of68xvykh4bdh5i25q3lvwr9obm29z21rblyhsoypym4thu1ixkdzj41b5qrtz568r7enbzugpipf6f522rle3rao83yf4vffkop3uo6',
                receiverInterfaceNamespace: 'gu50qxik5xz0ghknsn51sx22vyvhy5e3290rt1lbud5rp7x9m5v1fxj5wahp1l4radg64ao3bvu6k8iw8y7r22vi55i7z4m02zn0d7fc459cogkr03ubwwu61hkpltxugpdubwghhlm9du5eutwnix3koy6dbakj',
                retries: 3192892108,
                size: 6335792384,
                timesFailed: 4650959403,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'hyewd85jne05b6pl7uu7m21plqld6upvh3wf09qorvmd13s8vi',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: 't9jpj8t33bow0m7ydqen',
                scenario: '7jlimac07tn9irx3encvmn4wqnrvlkk7cv3a5dcvvmkqtkppdj2ds1kk194q',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 00:06:08',
                executionMonitoringStartAt: '2020-07-29 17:39:28',
                executionMonitoringEndAt: 'XXXXXXXX',
                flowHash: 'isqkm1rcasgptjym3ub4lmcj8vwfxlgyg7hqg0jf',
                flowParty: 'u9289tbqggywoeqgrcujs5p3nbzgk4e34pws5wiuxxji7s12gsv0459z2lpan3f8ohvwfj5w9mqm9z26xi8vdwt47rntqoch14tzo72qwtdo7g8uut4i92wgdd2xduwv5bgyxv7zqvj6n1aned0x1wg51trwtz39',
                flowComponent: 'yo00ft7nqseydicf0ycr0lg5zkgo8o4hhrshrvr7k087logj7xk5k5j2e2vq7vtu4rg4voygyhmjh3boap5l0tuggnpeoa3epusd42pqqpxdxc2seqtknpxzp8ogfeogu4y26zzuhwveomnzqnfdfg33xiek5hx9',
                flowInterfaceName: 'owhxa0jdo60o0lf4i6m9ua13xi4akq6u6mccihykq5mt8rpuoxwd4ksdhgyee17832qncpoon7opxk096uj5rxgro2ac1nnoez38sbh1ud3v09d0cpye9ksc8fcyshvcxcuk06q0coaxcw7gbhdjnxb421pf64gb',
                flowInterfaceNamespace: 'aye51972p4iitstu513m6pxtav9l6lktt4h21xhyjqo9kluan85qv2oqfge2fehck73r3vmm62nwwvobt5yem7tnhkcr7aid09mbr3ic9ipkcyb7zvzbfyzlsaj72118xk4u131j8e0mj41kkuci6kocbw2pks79',
                status: 'HOLDING',
                detail: 'Qui rerum sed accusantium quaerat ut ut consectetur veniam. Eius ut fugiat ducimus itaque architecto. Fuga quasi asperiores aut dignissimos iusto quia incidunt corrupti quia. Quia voluptatum et molestias consectetur quam et. Enim sed et voluptas occaecati temporibus.',
                example: 'skfpei8j0htbvysswh0ypjzvrbklclqb50btzrbi8z6omyttwyu9i0rbrzeoaz4py1lgbereq8nxrmmtj1jl9ffj3wcixjocduzh2kt3scbm4zn0i7fm0ki0e87jhd5prjsnhfbdta3mv649lge8r5ugru8r4aoc',
                startTimeAt: '2020-07-29 18:26:33',
                direction: 'INBOUND',
                errorCategory: 'qnpr9zp3el3piyndgtept7wpvgm52u9esub2yf35b4gmvdkctqv584dt5ryyqkjfxomfgxe3zdx43r0rfgxw07ld83x3k32y2li8wfcw0v0f99lj77slh2rgruajwi9sx9ljwfnzq6fezvtzcmdjerx1vke0gw8z',
                errorCode: 'up72jqkvdzbd4zhdp0d8897svk5bxmm3nv8c5me4rde5wgmmxe',
                errorLabel: 419479,
                node: 5786960014,
                protocol: 'twrlndlfy3cbbo08vqay',
                qualityOfService: 'nwnmevwjlhujoospbrcg',
                receiverParty: '332p9p6his4se5xva23p9z07uiqt54q7sq8o41tjpkd62z3lalwushamuzc9edcc7wgne548rdzkrw9l98ez8svef2yvzeggvp3plsaafypgr440o03we0df2rhnwhrx40dye8zgo6pbl9fiemj1q1jqsx47208f',
                receiverComponent: 'c7kiekyhwy05zfg6q54rf9dlotkfofph9bh0nrxg2b7m02553unu0hk9i9lqx5tne645pdxib0toug4c7d302x8pbzjztvi6vfolvsoaf9xi7xvnlm8eyrpfdsdcuo912m3evhkk8ezy03ceso6nw7eeqqysyp7o',
                receiverInterface: 'kp7fgtmhkjfk86trwtkjx42xxs4hggrzhnuw6x1weozvlwbngrf5v8sgpg12bk049cltmeqtuajz7cvbqzypkifrv5eiorfl7n1psjce9rc04vm84n3gohi5fd0x9pvbot8yn27gfh6y9bvppuk03prziaymjo6y',
                receiverInterfaceNamespace: '0akxbey1noujtivpixqmlc05q9c1gtife4mvlvry11pwfzm4aghahdadhi2yne9w5nznkp9iauk36e64amtm5of6jpxmljp34wr43kcxz1rsdaq7mpcaeq77xmmakz76hgozs6to901oqpzqncggd2whf6h2s7i6',
                retries: 4348869440,
                size: 7503949628,
                timesFailed: 4754989140,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'sqvpgwe9ts3f7v3qchuh48qtpm1myedlgeiy0clhzbnt5t6u75',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: 'ueafrtygm0pucpydetlf',
                scenario: '5pdr5hlktloqk29y9npsbxn72km0c6eb77yblfelvopqrruswd454vmrzdfz',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 12:21:32',
                executionMonitoringStartAt: '2020-07-30 01:57:56',
                executionMonitoringEndAt: '2020-07-29 04:42:15',
                flowHash: 'e750ck46thgbrodfvukigzpftn5zbxpujggmjmkn',
                flowParty: 'nsui2zmmrsulotlnp1wgh01omy823j2npi14jx2mxsvml81p8ctp3enwnrrnw095h8zvdb90cm3o4tu8lou0k8kpwegcc0c4j1giio9eolltxs62duxfuqbnub8fuh348xn4qj6af8gti1wz7cmjfk268cukrxwe',
                flowComponent: 'o9fr6gzsf2hwxemxhdshc4easi2zurnddn8lot6ykm2z83cgl2ugvv1wmjwcfpo5k0wofp0pl6502gl4tmt32pfnp3xle85jvwy4356ag9ycue7jt520nwlyqb28qpmaxspkfvufncmwa5b6lz4so2unvg89s1df',
                flowInterfaceName: 'tuqbph0qnszzi0sj0yuqm873sa1sl8fzego3wejkzf1h2iscy34z9tl8a6543uv9ak9c4h9qofnvrdxzllq6ru7ppldakwinuzbd7n73j84l3jnkys66p5zrsnh7mbnm4fnu8u0s2rakztvbyfiteu78g9adnwwl',
                flowInterfaceNamespace: '77bnz3730bd6ci9c47ycoueemv8bmani4gwziq4b5c7dg9bvwwv6iv2lrtjpw07l5i933scba6c32e75grgv2ygasb2l5f5lkqm1spmb6efw5o4cjasnr6le4c2wf63div2evehkvt6e8xqknd2kumlxbqmu3h4u',
                status: 'SUCCESS',
                detail: 'At fuga consectetur. Quo enim quaerat voluptas et aliquam vero et. Necessitatibus quas asperiores eos totam. Eius distinctio quia consectetur labore et autem modi. Vitae sint repellendus aut minima quidem.',
                example: '7mleza0my12l2gzcx2lk9qe4qk6gmy82mcrr1lrnvn0dpon5fbywmaosqtg9tjpgnc07v0fbr0u8yxwyu9tozye6br8o38n6ytna2hezcl8330rhdwxxz0h3avk42w3qtici2vo2ckwmw2bofcl1kaw9h3r7ltxm',
                startTimeAt: 'XXXXXXXX',
                direction: 'INBOUND',
                errorCategory: 'jtrp061v97ldetwyuejsy4pl9upm41303dku0e2d7s74r7wbbxqhhfkr6mj4879iue629cl1pqa4h5b2nvk7ncz2bg40atcnccftt5zvpyw23m6n9vbloi6d9q91x4czfzuucogp0kq6yzhk1dwbeal38dl9z6fm',
                errorCode: 'ngjci82d38u93zcqp46ygdgm6omsszxfxybzqsmnvuy0gnuzg1',
                errorLabel: 368190,
                node: 1720854845,
                protocol: 'lic5ud8ydklw7oezmhlm',
                qualityOfService: '564puzb4ykpt8da7y2tw',
                receiverParty: 'eosqmeau1627b28d0mr2yan5lqdr6qre97u5jsoidaeb13rfv1o3wijiolyyvos9ln8mhih9rr7045s87plwm43w7t231tn8ccbp9puh2es952wk881hgf0slbjz5wdg0kq77kgzav5ozn2odhp63z3yz6bb8azw',
                receiverComponent: '8jpuz36mdoy579sb8u8o223wmgsdf75x4pvf5c63btkuq6b0fmigude0z52yn3xt60ooi9if8ey432lid23nujx4mzf05szsnlwl2jf7744h95qv5f7dtz9gvtxawf6aj4ptxf0lywb9kg4vva56lzgpxgdatg8d',
                receiverInterface: 'dox4buzce3lobt97ebw15y36o8bl7lbpenixp863mo703yk8o42tyoidsq5p2ikiewt4hfpyitil6qemsdbq9eqqv6kaps4vhao1h7t898aiclvuuqyesjcg8d5d75j7klartmqup07l8xhiea18q8qqzvvsku0v',
                receiverInterfaceNamespace: 'tu8xnqb6sqq7faqnf477cqxqov123ijhvhyfi8y88gb9d2r14006xx1c180fylqf1f65pzfvsgrjkxhpmjc09t680oxca61ytm17d36eyludfcjptf88ikc7iuy1f6c2ckfr9800lygzjm5z8b0os2917a2py2yo',
                retries: 3221764285,
                size: 3441915737,
                timesFailed: 8672994926,
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
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'tjkjqt6sazvp8853hxijwyygs840z82vc6c8gnbwct9f15fcie',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: 'jhowrhw25grftp4u2o3h',
                scenario: 'lw74b0q99hiqx2ob7zv5sg018xhc9w3btmt09ouru4791tjtsc14myv2mms1',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 01:37:13',
                executionMonitoringStartAt: '2020-07-29 23:17:13',
                executionMonitoringEndAt: '2020-07-29 11:49:33',
                flowHash: '75xtjtuacakubab0vkkgjgoxtgsxmlkcsor5yn1f',
                flowParty: 'dtbix2pturlehmkjzwd7jbkwrxy9bawzsadb1dj7m0f140hbjyjq8n1px9krk0ejx1k4gtnizh95ut8txfocexm11q767tuf2ubnsvxtzxqj30h22907sf4ognjynvwzc8udo2qryh10it9jx8tdxgielr8r6pkt',
                flowComponent: 'po6rotdqvpjui8k487kp44p8y1ufn930vzhc5n8evus1ymzqsplpp31elk2l74ohtv7qzz48s6n02qwiz1zsgadti2uj2zixthphsfbzug8rzrw1bozxq7c1v17thvq5x9tchl5v49ak8195ajzkkc53h1oznx3v',
                flowInterfaceName: 'f44oij5kz3seb8mjdrlhv9hnrlt6t3cahp2at9x5raiw1v8g8to48oiog20q42fwg61bv0hokz6mypl2nguvsrfjp31qmbhnbyrxbctlfywq7e466alwtjjd94not2db4zvxsriz42450gqmt497vxo1nycf72eq',
                flowInterfaceNamespace: 'fkjcl6thj01tgil2oilj08cmjor7b35p60joc2mksxaawe9ggxq4uqzjusyvqot0evlbyc2yaardv6ogz6hqszwhzqrd2af6pk50nwqspifhqk5p848e6clqtxz0tq9e6i9tvtq1gvf7dam7ksgu5xqepqo5zylh',
                status: 'DELIVERING',
                detail: 'Velit nulla eos accusantium fugiat autem in. Praesentium deserunt ratione in nam impedit consequatur. Quod eaque dolor iusto autem possimus nam nam quibusdam et.',
                example: 'xe8igb0gcd7ou5bxsd3gwmgydjkhshc5j9865ux7bog8lze1m2xv77c4u0wf0r4qk7ooi99mrqteo9w4fghglcpa0cnnuhchtm0vacn699t3lr32qhswqbwhr0d8is1lrst0skr99ucymugmaord0tfjx0s8j0gb',
                startTimeAt: '2020-07-29 17:24:55',
                direction: 'INBOUND',
                errorCategory: 'mc6evuhyn9zfvuubrxvcnvhnmagxdatdwmug3ykqcvm1akpqnad3nuypne93saekok4xkw2bpfdi25epd9qq9r14m4fuquov6nbc5zg77y0t20npg9ll8itfhfjythxazl6as0mq90j80ji20qy75wbjngvmf2wl',
                errorCode: 'gao862tw42jpefab95inctge2bbeye1kl8ce2ag2zbab3v2gm2',
                errorLabel: 819047,
                node: 3658138466,
                protocol: 'vdaqgdh3wk9wex1m97mp',
                qualityOfService: 'nli64bikmnbn2zxcv88y',
                receiverParty: 'oem6s1cymf2zlgm14d1gffxs67sp1lul4oyofxcolea2u8ewt6bnkyz8suc45pkosi29amr2r3jyjureaszedelxr7jyjy75itqm83mw6zv3816cyp319qxq2qhr81we6vqd73sg7jcth323cz27xo5h4udffzwp',
                receiverComponent: 'kv9s4zqu5ulfzwa4fj9bztrtfniievwxpxrzysfu6jr6yzi91f1cu5jvilqomylaur7z9p3sx1fs9idwbzhc03aoylbwohfpasy6sh3cwmm61ladqql965nfdwiybcfy9tni7s5f9g5cdta58c27obfjizr0ukyh',
                receiverInterface: '13s386wj2wkf44p089459bfmzv9fzyzodz3h6ajbgk259mnjtdg4m1n0u4kaf5f0pegb4fjd8hizgrr07vn9ceuaqq0z2vvytyenwwm953ckoqye6ugnigwv291zkpzytu2v6wcz5v0qwz1z1uuyf65ug4goo1mj',
                receiverInterfaceNamespace: '8ho12hewiiqn07rpsyiiq3iv3oobtnlw78ho13iblnpqfgbz6w3igrghvfve9njmniwaggg6ehz8bhrvbl9c38qkzme0qlp51ccbba4q87xngpnhe0rqoccueuffoodjt9a57uj9l2b7u38mn5ubltnnmhcpxk0x',
                retries: 2902256634,
                size: 7679390045,
                timesFailed: 4880875238,
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
                        value   : '4563e0d9-21db-416a-b6f0-a9f3bf285557'
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
                        value   : '8a09ed00-b5a1-4b6b-bde8-24a33db85b35'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '8a09ed00-b5a1-4b6b-bde8-24a33db85b35'));
    });

    test(`/REST:GET bplus-it-sappi/message-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-detail/72a845b7-c8b6-4179-8eae-5200eedc31e1')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/message-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-detail/8a09ed00-b5a1-4b6b-bde8-24a33db85b35')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '8a09ed00-b5a1-4b6b-bde8-24a33db85b35'));
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
                
                id: 'b49104a4-1dd6-4287-80b0-51ec73ffad5a',
                tenantId: '5ebfda5b-9cd0-4808-aae9-193e5efb0128',
                tenantCode: 'fq80vvryjs6f2h2rqmpsgk20w84hu7kpgu9fw24xtb4t6bjk7h',
                systemId: '1768c9ac-7b43-452f-9c70-293129d862ae',
                systemName: 'rz55nx9lnsbg5o3iebxr',
                scenario: 'zffigij6xlf650yx8gkearzrcca0gfhv2t4xx04szhcykr5ngq7ccyx0rdlh',
                executionId: '3e5a922d-a5ae-4ece-8317-74bb17a58d35',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 15:27:48',
                executionMonitoringStartAt: '2020-07-29 21:19:46',
                executionMonitoringEndAt: '2020-07-29 05:34:56',
                flowHash: 'wff1m3tolm6sqqcmfmj4cgsotxfcqbtzz6d4v9j4',
                flowParty: 'rhsieixa0u3lfealx3mhy93pwdzagaq3cqv54od2ldlkbr9630kd4qppm6riyntt4edtx0o6bwqi4qebtn0wqp6cwqd3bkhqifk55omqjir0by2hlz5tkrtjnz7u25woeri90rx1p4w8q6n2yiske0sayq660qu3',
                flowComponent: 'bwsr36g1u5if1e7zq8nth5ibqtp22r5vbkjod3estu6nmuyz8uletul5d4lbxs1zgpgm6c656jxmzmchlpjez9jd75ude95wybnwga9eq9vrwcu3b29rchp95prxrog37198xmwecufm1mt6w5zeb5d2z3zj8q1e',
                flowInterfaceName: '8f6w0pvb8h12s089bottmdfpfowpwvvdf84mviecgvtp92ge1vcm2cw49tg0gapyjvmx6kamq3i7wna5da5oeq217528ewxpgbtvz3z89hggofzuhvysk9d0uiw9z03iwln0zgigyo5u13y9xkbj7uaxwz2kirl3',
                flowInterfaceNamespace: 'le48bjqjydwdqc18qrlxtfmnnl3nmy9mjn8tqoqjx4t60decqkxou3rujafs1wxty050zedwg31u1p9qwbxlbx37lsvhajft7lj2jl6rn1pvnxhf8bjajr0v8ndsw6gxjdz8636v8pthegpv2d7tl2wnv508feot',
                status: 'WAITING',
                detail: 'Dolorem aliquam possimus corrupti. Omnis et ullam eos tempore omnis maxime. Fuga quo ratione sit ut aut.',
                example: 'n02k8tjztpt420p0pg9vm34cgf9ewlsp5f28j6o0cn6zthjhnij16vm600rtkjuhjfvn4d0lezmx56zcvskmk0jq2l4itlyzeswggmqtz8wxg0afswdq5m2ee0j3mf28b5myj15tuolp0oyrxt2zbhzcnud8ha8a',
                startTimeAt: '2020-07-29 20:29:23',
                direction: 'INBOUND',
                errorCategory: 'bmuu9o8vprohaweuhijsjm3pj8kejhn5bgxgxnsjvd66qe7wpawcndids3z2am3k6f69cugqw93ykjdod5sznyyhw9w510f263nkfmld7gwxr8k11zodjgzcq6uv2oe81mqh1p3ws4ccf2jedrtceylcnc7713xq',
                errorCode: 'wwx2ssfpkrefk4jl704ha9mg1eyxd4fqkl2zivsowe9ey56hh3',
                errorLabel: 219466,
                node: 5334969112,
                protocol: 'tbkt6qjrviughf9f7m3x',
                qualityOfService: 'pe1su1eenmyqipf7490n',
                receiverParty: 'e122zsalu9cakeeqt1mp4gsqiaguxlo2o0iwa9wxb9d1tukm051z7y1apth2plb54ajpl4xxvcpizp77gfbeok4vmzrfe9ib35hd62d9t40jgzpb58948u2i7zwnqex9ad0mbfw8ow50ykefc6mr0lf981ff7265',
                receiverComponent: '1tyjvihjvhwke8kucye68kk2sazx3mmkar42aru8nfm0xuz8bl7f2xs5q3hm85zn5dmg1n7m640yqa1lnu8gul0t4ycowk2p5rzrurfkobvic5gpfmximg37lb0agj5twctfi11juzjmh1i1n52hqpgvdwz41iau',
                receiverInterface: 'h12epala83fnhqnf14cudp5nr1clpccm51r5sdf44mw0aboghxig4ldi9vxfjr28ziqpo58kc64fcrkpbi8arm0c3a5ci5dzgt226iwyybnozbmzp7jtw2z4fal8s5qwtlj06nttax19kesk3p5hb17fjkgtr82p',
                receiverInterfaceNamespace: 'k6thguwtrvg6u7xzkocg0dqt4lmqau9vbdl75gej5q3enuovyecy1kmxnoj2vm5z3gqjah8iw92gm19bg5ivnqnzi8umnhcqaiec3somvp211tsci3klg3a1qfnv8jg0d60rhr16bbo7ny0ztra2beuhjui15jdz',
                retries: 9270178108,
                size: 2383633308,
                timesFailed: 6121241843,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/message-detail`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-detail')
            .set('Accept', 'application/json')
            .send({
                
                id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                tenantCode: 'rb9jz4mr4um73igdz7zdgrfdivhpr0zq1qn89gew2evelosmb1',
                systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                systemName: 'm1hgajor1n8djt18z2p1',
                scenario: 'et5uqzavq8v3bq6ircphqmu9qxfn6csvtjrmj3e9uh2cr74z40q7mgricn81',
                executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 10:09:17',
                executionMonitoringStartAt: '2020-07-29 03:54:15',
                executionMonitoringEndAt: '2020-07-29 14:48:19',
                flowHash: '7ccrqhofjmawu8zpsh6sdm479aul2vkjlsrqpf8e',
                flowParty: '4fo20lk72w6u83y7i1d4ujcsiyjas6pp1uymropwans8ouu23vm082kz2frw6fgz82brhqsj2l1rnnnjc12ro3ktmlkpub4f8z9mbo0pcd8aobhwwsx5kquhk7m0ccj3un74sg1o6scglgnt23r1q2xvoiwvtuxp',
                flowComponent: 'ptlq83wefeq6k7artih2jq0kaqs4pk32g6x88rn97kd9r22pewbwjbdolv0agx2c4z3a7lrihfm2hl0sncjlbz181yx0xlasyg5i866nnhdgco0wwlmsme1ff58rft95pxrz3cs4jul9ad9u66z89nqls4n13vil',
                flowInterfaceName: 'mdg7s6b36fzem1mwu7yj6b84rt74ts42ib35c1n3vxmc7dasahsmwsm7218fv19wl6ndjyt4kc8y0dcay1hrvi42e6y12ossbkfp9zruna1dhpnhujhl2cta9av6653xbbw28yjyc5cvi8k15261h45zkxj0iwrm',
                flowInterfaceNamespace: 'w3a6iucd7jcpx8984qawkboajh15z30g8gqtnbo9e9jsoqgl7hjt0rxbsgsqapxiqlo4gq6w00da2wsnavoevkwrjhs4adms72fhkm28hykvc8hk2j5jrzhvtiv6a18kfzk3duuw9qptzmukdbic1ov337wpgh4a',
                status: 'DELIVERING',
                detail: 'Eos voluptatem possimus dolore dolore in maxime magni soluta. Facilis dolorem error corporis amet debitis nihil. Dicta quia voluptates incidunt. Id magni exercitationem similique. Velit voluptas voluptatum laborum mollitia dignissimos placeat eaque. Unde enim facere ut pariatur numquam.',
                example: 'uze99abrd3rurvc75bp8vzry1ehyttvz61y3nmblms8apc790db3jaelfj3mxccoo4dq68z2thfgc8d3h69pdu3yfsfpdvw47d494o00taqb4pm7y5z03d2peyulvtw18c13ss1e28czw8pg92fv7ktpezym76dl',
                startTimeAt: '2020-07-29 15:58:15',
                direction: 'OUTBOUND',
                errorCategory: 'vlmi5k6sdu88b09rue66j147nyud2c5zk05g34usi17bbs02nka8s7gqnrb8oh04cp3n5ox1b8ihwgzleg4qjfbdhvt8p8fjqu32e5spukgwcy5844bsopiuupk10ot3isvoitlah5qtmt9wqomiw9nfb4vim4qz',
                errorCode: '7e421s1i8medbz8evp9oxq8sgb9xs0ezq5afz6hu8ig01t2p9y',
                errorLabel: 404808,
                node: 4713623974,
                protocol: '1mp2f3j7limym7b30y5y',
                qualityOfService: 'drqrhx8t8vhcducpxu7a',
                receiverParty: '0qpd108wqw13ngi672azmw800pklkmbt41ptvbl5ecp5gw7fv98w540bn9kgqwwy0l565wlmcpnuz88ytdyks5qz81y7ee9w8o04z0hg8fn91x2zz9b6jvj9nfhi41hszhvi6ht5i1d125kbxlphjcwcqj7ysnkw',
                receiverComponent: '4c860egq903ipahcxjlcy1tg22d3gbyxfkgq88x0nq4x3g9ia4yvsl3th9ewqx20mc5vqipdhd9by3upxt73e8mi0pwanq1614403jxsvobvpscvmqd8cxdv0ruf5s228fa7papqgwp00ko21kigwdwpvhifc6or',
                receiverInterface: 'ouzsf9slti6y30edwlwwbnq4ptay9ovkiufclpwsefcyxu9c5t4saux2s8f6cw10jf4ct34shtdrg5ys9rknjbrag1vogspebkrwfxh9dar7mlozywllbyrmix33dmyezab9lcxvg2qru8gqkorjkz1tsfpq1xo0',
                receiverInterfaceNamespace: 'wnjhu849863fbt74ixuxky58m2bh6zt21h6awf3yu4efsbfedxif2t66gkv6w7gf87v1coq4vhd61ptumf2kg5auu2vt8um5rjmt6ig6oxd1apakubjldjer4l3bblgix2rilbhof3a74u1al1kyq6sgn5aoy663',
                retries: 2832730936,
                size: 4899512625,
                timesFailed: 3886245764,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '8a09ed00-b5a1-4b6b-bde8-24a33db85b35'));
    });

    test(`/REST:DELETE bplus-it-sappi/message-detail/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-detail/8fbd0834-8218-499e-9405-727d999248f7')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/message-detail/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-detail/8a09ed00-b5a1-4b6b-bde8-24a33db85b35')
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
                            flowHash
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
                            flowHash
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
                        id: '975d8751-6c06-4499-8db3-eb73810437ca',
                        tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                        tenantCode: 'v3ncrjvrdb64bw7jvc28aeh9upcocbct1yujbq35kfv8iv7wnd',
                        systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                        systemName: 'u856ii80fy51cccdjnu5',
                        scenario: 'sjw91qfln05pyzhvdlyw0c0fmh01rl36ymtzcw15tsmdnsn14h9vdqyz8m84',
                        executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 12:28:46',
                        executionMonitoringStartAt: '2020-07-29 12:30:23',
                        executionMonitoringEndAt: '2020-07-29 19:41:42',
                        flowHash: 'z2t4r4mhdx06yvdu6zfr32elhyiu71kta13qeeeh',
                        flowParty: 'g8gosso2qtiq5qdahrt4j4zgm9d1gk2dj2wacql6wjn3wke4hf4licek6m0n25vk5wa2oe7jx07g8fbrmzumyjqaci19w5hy9hkrfluyhv8wa5u2iwy72h73u51uskss5r64je6x0pfhn2uni2sshskwdqy6v5n3',
                        flowComponent: 'ifvfm9ub9qncektz9f6197otj90khas9nef7s96eq0kqfizm1xtete2bp7lxzwjem9pjxhjkiccdgdz8jasjur66ojj3auwemny9hl8nc9pk6ahdd3049n1o1020chne2kgvj01iii6kxz55ruxalx0oe9d61zoj',
                        flowInterfaceName: '10c66gjl7zsbtxuq537b688ihkr70xp45ogk0437cs8kzfebp90wrodpkadllcexwhc80y9xr2l6vaf3qhuw62urn5yuupoupwdgxxl7t3smvvjyey6j7sr1tkwt52raqaeswkbqfwuz2b0rrkgk7vb9wbebeddw',
                        flowInterfaceNamespace: 'md066zhxfcbjyvx2b47fk66b6m0yrymunjx9ew215o1x5h6uey4ou6kn0gxsw9u57xov2nhf0r32joeq3ca84qsvs52fsjkn9dtzsjsaa9rzb8eex4pqo7jq6lngiy8id69u21l1pk2ar2w3d58vrcuvvj8rm2lk',
                        status: 'CANCELLED',
                        detail: 'Placeat dignissimos eligendi eos qui earum deleniti sunt. Debitis nobis quia voluptatibus iste esse voluptates omnis asperiores pariatur. Autem ut ipsa minima. Tempore expedita rem itaque in voluptates tenetur sit mollitia. Recusandae aspernatur quis eum velit nobis dolore tempora. Maxime harum cupiditate.',
                        example: 'quv7kwc0g18wk9nff9yici5atok33zug4t60zew6l4um8s6g2v7aj5i6b0qfuu741owwh0frictcgr3yh7pb6n8lb3n1z4zmcgp9qbchencilxcc4oxjauqgykgrazy6jhvad846jdrc1po9ffskcw6yx9kwp8si',
                        startTimeAt: '2020-07-29 06:43:41',
                        direction: 'INBOUND',
                        errorCategory: 'i0tvx791qfj0f5fz1nko7v52ora645o1qp11miknt010p76x648q1e36eaw34bvp9hl1ar4dehbkvj23ay0i8sjupanbwtbnpta2kfzimagrq1kh9ai6ssbirwtci95bd98gpss2x3edphj5mwtgzb166qxa9tka',
                        errorCode: 'yh88m4doimzzp4ohg64yube2wzyyxggk8zvy4ijq8lblkabvmw',
                        errorLabel: 159666,
                        node: 2504417285,
                        protocol: 'vt3ztrzh0t79ep9y3h9f',
                        qualityOfService: 'eqdpbzj2ozcn0av5u7jf',
                        receiverParty: 'pn9yw87p8ylgnkrifv61yopq4n57m8idcand4dapuo2impwauev136qngv4tle1107yg34nxhs6y2me9qvj3fk1ky5bw2cqpf0zpzdt8xlmk1ri9cgxzvko1caj0bi3mzilu4fm54ucmps1f1uh5g9thah7y9br0',
                        receiverComponent: 'yseozn2xbmih2lm5t28eu44n33mn9m33s0nbt7wuvjnb16uavl3awnjcj8d13ecqd2twdgzrqxl7mofttfwi08sejv1xoocuwrx075y0zhvk0j0mhnbmhvzlcaay8tr4vtc4alpw9cansginlrrvecwgw21kvem9',
                        receiverInterface: '2zcmo12juhk8ckrazcp07c3alvjlgroqhet0simjle82ogv18ubq9tnewb01ibbqyybnkm203qzgft3mrmyixlh72w704cjbrra7gf5gqliqaolizeheab3fghxme8rttpjzo4c5pxszadhsvhafxcwbpb719vhq',
                        receiverInterfaceNamespace: 'xmnm1gommcis68w8jd2lu715vpev6im9krvs6k9eixaek3dchpw4sw58fbsjmawphpj73stzaanvi0t8zzuck15e674o6v5ivp6fhkl69yjmnovxx9jto4rye4in9q4l9j8r4o4wr16p1t35xa4e6j0c8stxbv45',
                        retries: 8067744082,
                        size: 3454411845,
                        timesFailed: 6707587556,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateMessageDetail).toHaveProperty('id', '975d8751-6c06-4499-8db3-eb73810437ca');
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
                            flowHash
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
                            value   : '1fd72c61-e0f1-4767-9063-e33c231cb0c9'
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
                            flowHash
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
                            value   : '8a09ed00-b5a1-4b6b-bde8-24a33db85b35'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageDetail.id).toStrictEqual('8a09ed00-b5a1-4b6b-bde8-24a33db85b35');
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
                            flowHash
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
                    id: '5991585c-5dc2-4289-b034-3c92f620f158'
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
                            flowHash
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
                    id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageDetailById.id).toStrictEqual('8a09ed00-b5a1-4b6b-bde8-24a33db85b35');
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
                            flowHash
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
                            flowHash
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
                        
                        id: 'ca003d48-c81b-40f7-8d35-5ceaa3bfa674',
                        tenantId: '13121a74-db9f-4a5e-8068-868afb052c23',
                        tenantCode: 'tcf1bl2lz9vqlz0nh4yqp3n96pbmnr5z45h8iruq9klzh28ik4',
                        systemId: '70e28117-b373-4ddf-b789-741100083156',
                        systemName: '3fb6nv4llil0fo69agxb',
                        scenario: 'kcl6rrqvm29gaeo0hzumqem6shq1q3ep57jmtsc1oc68ou0vjzq8852ef9zt',
                        executionId: 'b6d38c6b-c71d-4f97-857a-5cb1f39a84bc',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-29 02:21:29',
                        executionMonitoringStartAt: '2020-07-29 11:31:00',
                        executionMonitoringEndAt: '2020-07-29 23:39:03',
                        flowHash: '3grzy8vld1rjyud3fpdjwrhchlr8pyzmkmk426t6',
                        flowParty: 'gti6k1x8levzaze62rfvzztcj7rq5zrj797us27t8doebzylsv2iliylw1zpaunry1wav1fcpdw0xz1m1bopu6w5j5r4oovvzpvi64qco869sjb5r1ixu62g3cuounizgp8yz4uj64xhhzmo7kbm4ob0eeliayh4',
                        flowComponent: 'onto64hvvotgkyue71g8sn6s4103pw16lfjjqqtqq5shse98hneznktkwxfvt8jj44ye5vavs1rea4u1k4d3h0796gcidxlpqkps0uet59n79wyozuu4bbgtv3ehwjyh9n44jcwfvg4yjka36dc4biiivlh7h25c',
                        flowInterfaceName: 'b6yi82bhbw8tfc1m74lkxj1yys0x1h3be34a1ped7ug76ib9oxerziisf9g1dhz9kgw1o21l0p599cd873o9f2wdv91sinac5lly4cnpzxwl4vb1f21b2i9ssiw89hlvsbg29u93jl8mcdb1u8blreq2dln7dy5l',
                        flowInterfaceNamespace: 'bomt45grwh6yi9fkyy6bt1ihp4ns3phitzh5my844ukbxsn01qdmw35l3msem9phoeunjrcbuxt97wy8b9a7e9z2fxq83d9bu6wqz527c13xqqg930pfjjw28mbrginukyx4204vv67gxh51h6kodt88itqiy7gm',
                        status: 'SUCCESS',
                        detail: 'Reprehenderit eum tempore. Aliquam et totam saepe velit accusamus impedit repellat sed. Possimus aut itaque explicabo cumque eum saepe quidem. Iusto aut qui exercitationem et deleniti rerum fugiat ab sed. Similique ad expedita eos sed ut.',
                        example: 'mrfy6ragr0ixt3r6njp47y3pca6mcnd2v7da9n7ffx5s4cegi4sbdq8v8gl8atl1r78ain1fafrfqh1ut9zji20h9f139dm5hlfdpht8zvr0cque2n1j6mv77i08mj9k4155hemdk7h4xdf1woa1ulwq2mqqcii6',
                        startTimeAt: '2020-07-29 16:43:03',
                        direction: 'INBOUND',
                        errorCategory: 'pgn6xysd13crzihn6piwli9zxn8tkx6v4imdwwp4q677zaidddyrm4qxpou8yqo9v6th9b31osucfq4or32qdcpz04kz6msnvyjv6fpaip0emdfswt8i71twfu69g9vkh0y9rkdi0bkpj1drpytpoegdrpxhhhrd',
                        errorCode: 'bsrf4831q62qb0taocga6jf98p2dyne8x5snqt88zjrjxdr3qv',
                        errorLabel: 352460,
                        node: 3807087589,
                        protocol: 'aqu0uu9ntd3srs677ecu',
                        qualityOfService: '6dboad1c1evr6gnib3nf',
                        receiverParty: '8bio5xq605sn64w5m0d6p8vuoio74krbjau542b243jn6iuxnz4s5310yvrzr7i847g9o97ehciadyctfd54jk1d6o36u374ekuqb9ud8fvspsy9905ecfagu0op5q55jkmpwgizrcker8j5tppin4oeae577t07',
                        receiverComponent: 'tqm3hfzk52he2s0x77xzop02h8z5tsmik81mh78qx5l3ih3sv0mk4ncvjqot1vtt7fmgmohzgco75fafzce32xrfen0xyd1nl2cfw2lfq6jj3brlg5clmokbcor2o6o3kokdnr8fy7hgwwgj111dvxvy3n84oatx',
                        receiverInterface: 'emmog0znfhyyjkajp011dy3b4vvfs5at1trkjnh0vsxpuebfwoeo54npica2gwf8jqw0xp8i55xkxphp50kdics2h0tlaj4bl135hqa9zbwq7of6tswuvgnvndk40zvgf9ren3dirtcampujc13120lm119k1q68',
                        receiverInterfaceNamespace: '8ld2j9tc9posbdhf5trjv69o6nrml20gbjvzczz1wjvn8grvz341i4268omr27swkk5dahapaw792ms3oh3umd7i7gzqsad0paexgpkims88d0uz8gbg4k7auwmctdo6dzc6h3zta2i3elntnulcoeo3ag8cbw8y',
                        retries: 8728927784,
                        size: 6304266822,
                        timesFailed: 2931785387,
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
                            flowHash
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
                        
                        id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35',
                        tenantId: 'b526d247-1650-4b81-b503-12d4fc3b323c',
                        tenantCode: 'vy2zr5y25yy5xnbt6ofyechysvnreuabs5sllb0hcqwyf0vg1a',
                        systemId: '5383beef-9793-4b37-8b36-a0d1e4f1bedb',
                        systemName: 'q67l1g7nd6ck1qpkj0wa',
                        scenario: 'ygg0m3612jdy72e6l1wjnzgitj86bp1mzd6xj2z916de8q7f1fgi8zvb4ubn',
                        executionId: '8b3851f0-069b-490d-abe9-e46bc46c3dc1',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-29 08:27:04',
                        executionMonitoringStartAt: '2020-07-29 21:58:18',
                        executionMonitoringEndAt: '2020-07-30 00:59:11',
                        flowHash: 'whmkcbj45m9ad9j8hyx48lpszpn7eeyw85olgg6e',
                        flowParty: 'roqrdr03cqqov9f4kv4dtzrv2cdanit0tkpp3ti925iao6hu16oefo84wrl5co81xl9l75vkztli4dc3bw9gimumao4vqugkfaf3rr7ouegvv8614zhg31zefbvj0j8pystlrklb59v1jlajk6aiouavg9qbsaji',
                        flowComponent: 'vwegwz7yaucn1886pt2wf7t0mcxzehd07j6k92tg7gcw9y9fz4t3rrx9c69m8wsypz38f0hqax8xuqzsoqjtdd6g67trbwaq2cs8fza6uv6qn0oojdxh0ou3axg0iiv8i7ud2n4a4fp2c25i9sg5xs708kljhf8c',
                        flowInterfaceName: 'v9g8ktpqqz4zr48awoqd7g5qgtlm5gsuwp7w1ez6tugpfhezqxgqhbag76y7x8o8brid78dlmga0afdmnmp04c3k44c88th31co5yh4hhh40ppc815edypj5mr9rnulxicyc567kxmfeqt8rwf6a6h2ip4wg6mth',
                        flowInterfaceNamespace: 'tm4uk8w9y6dd10bojtu6pnfsxqml9xwp7tv1rveefn0st1h884dy0wqrlm83f8dy0up0mkuwkz8ylxl8ljhdlbd5me53lsr7fvx58fq27cdlvy54j07xsld6f88hg5onnw8wug392pp7ysso6parp6ppm3f2eixa',
                        status: 'CANCELLED',
                        detail: 'Omnis possimus aperiam aut et quaerat eius beatae doloribus ex. Amet nostrum dignissimos ut tempore consectetur totam. Quis nam cupiditate molestiae soluta facilis ut dignissimos rem. Quod nihil voluptatum fuga omnis ex. Rerum a et eligendi at sit. Quia et iusto deleniti necessitatibus facilis ut ut nostrum magni.',
                        example: '818feteokzhgw8u73f1scjvs910xvel4p9mx5bz844jd1jcamrnis6g6uq40jgvhuj06dwr40fxx593uzz6v7vjyslicmnpuw5y2v4nz2evel161eke9aghtdzy5si1yvzbyfunxo0qqtfumqhaykalusfrwgh28',
                        startTimeAt: '2020-07-29 06:11:01',
                        direction: 'OUTBOUND',
                        errorCategory: '1eucjj03aq9vb7br53erk7rmwhrmlzx9qm6w1pavnp4b7ujx4no391wu7qqrmujh4n28x87ar8g531z2pqum3jdexcbyoztolzk1vv9l0ym0vqb1o0f7wcqk9z1rpzkcm5f01fosa7kt2567atrh1db97y9djbzn',
                        errorCode: 'o1owfnbtozb9jsv5phb6qwvnpqf0nevybr7q1f0uawwu6hnamx',
                        errorLabel: 660764,
                        node: 6399624990,
                        protocol: '5sw35aivxvq9nyxostic',
                        qualityOfService: 'xuq600ujrp31sb9p9yg3',
                        receiverParty: 'fd5y61zrxqix4hb9oh0pvmuh6kaigwev01prrsuaqwzybwmwfk4visycqd2x6vk8papv8kebv48r1p70nv5yafb6fzuh0zwvaeolpoefrsm25s3sxv8sgs69x29o5srf1rzmwm7lcit6aej7bipv4k06qcqgmhdm',
                        receiverComponent: 'kpzqt1i72vm1lmejaobvl2rulfumepeoaa7jznmczg8xvssz6qx5ew0kctg7rugl39hhvmvh7yvb4q2gv1kxn9ozuok2on79883y23fs892a7e5mqn7qk2gfzy2pz0808bfufxvk0zeqm0vuj5xfy457fmb05wg9',
                        receiverInterface: '7y3v3sj3qqn51ztitawinevzqe3n5gvlapa6jvb0ye4l2j5c921mm6tilq52sn6e2gocl6i51zvh9kd9e7vj5oz6750icir1phgn4jr839lhbyrlrh1xtntmg86y5ai3ujw4l0m3ja85vxa8z51qlcd7rp3n5vuv',
                        receiverInterfaceNamespace: 'wn42kxa5dr5wjbsvnvde3mqwzfurtrog72xl8zz9822hjmpjbcf6rz5sztj1036se2o0gn1olm239phmfm4gzkrhi7b421zof9adyp75vigwthe5xe3bkko1052e46ynty3osbf2pc9co0so79fi36vxouc61b8o',
                        retries: 5583666164,
                        size: 6528585879,
                        timesFailed: 9048074347,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateMessageDetail.id).toStrictEqual('8a09ed00-b5a1-4b6b-bde8-24a33db85b35');
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
                            flowHash
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
                    id: 'ef5ca1e1-c515-4d5f-85bf-99b7d6a1591b'
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
                            flowHash
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
                    id: '8a09ed00-b5a1-4b6b-bde8-24a33db85b35'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteMessageDetailById.id).toStrictEqual('8a09ed00-b5a1-4b6b-bde8-24a33db85b35');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});