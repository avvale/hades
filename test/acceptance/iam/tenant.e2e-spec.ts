import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ITenantRepository } from '@hades/iam/tenant/domain/tenant.repository';
import { MockTenantRepository } from '@hades/iam/tenant/infrastructure/mock/mock-tenant.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { IamModule } from './../../../src/apps/iam/iam.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('tenant', () =>
{
    let app: INestApplication;
    let repository: MockTenantRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    IamModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(ITenantRepository)
            .useClass(MockTenantRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockTenantRepository>module.get<ITenantRepository>(ITenantRepository);

        await app.init();
    });

    test(`/REST:POST iam/tenant - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 'co14rc0ctgslh5c0h1gmfgrwlki9nfb75687zvez9ukt8lni1qyczgvie3byuowr7c62gks6o0mdldukgg218zocwu4kxajgymqvegcigo3f736u882mf4nna45va0y1pwsjcmik9kdgkiao5gn4bi5bh3s10ok09x6xoqfjfrkcxsct4bzydhkcahr7mg4qk1bqc2hlcno26k2xz82a2dmbrnt2ncm5p48c2n3rm3wldtwey71jq8gbmg025ps',
                code: 'kuautbn464x7lbmwlgwhswhvi3yes31kunkqnnft8hm0n0ob9z',
                logo: '5of7bl74qea9z3y01h22yw4u6xnzxauwhlz7fgm8cmymo1htmnf4jgy44q2x844yuay226xqt6ec21zwdr10wxtx0xl6065ahht35gaxzus8rn5j1nv4n6pr2oxac1wym936z1rmjknrodufb5hfozy3vqj8uvq5zemqfthljv4k7syrz8it2naytkrog4uxqnw53uycbw98m570lbzw9amhd42z55njjk570soppg35k9qizryel75qgbp0opd',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                
                name: 'hbtmnhemc6gmpi0ea64bj8lnz8xhmxwrktk0654xf798nfpmh8xejhyd16bdhcsiai7hari25lt11197cndp9cwcsgttg4c8jtii5mvn27h6b1pdy9etxl2q1qlf8r75pk3au8cjpcmpmptq5e2oip2eml1kdkph26owofco3388phkhsrvblaxl5wltkztrwphgifd22slpc0skr6jz95svc7kr0abyikyajdbb02u1f1pwfcxckps28x17mg9',
                code: 'bbhje3zkzrk6w51f85znxdglxg7j1fuu7xd1ursj1tc6pt9ln4',
                logo: 'x9haqpx0fmneehcjw63nhp3em9setpfx45tigxqok3odyf5md8pwhz3nm8qhz89vkk28sdifwerdn2lz5iy651bzx5bll6b4mksv0am54i37d1yow6459gojxq05bjacotojdydzfu5ur4qs455thdj6c0d6ru032cscwtmhug2ujihkh6oyj9qjzeadrkqpsmbtnruj9qbzx9vtwvdxz0obfngfxsb0los8q0jm9klpm3fe9j44h8dxbn8gq5e',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: 'f77b0e30-7de5-487d-a259-43a9e08f46f8',
                name: null,
                code: '56qo8r75fzh6snxirqd6aacojclgp23ku1mousjsazqainam4t',
                logo: 'iqyjcttj0v2q57i5yauffl9ihw16a32yetnofmcixfqr4ii6kb30z4bx5uppo22t01v1hpef6i15lspygsa8nrd7hyxooxtf2deh2ikbq264p39y1owugyiyxm0qluydbglfesm6het5gzryp5z9e3pqqc8vkirf9fapohabnd554n0461xxgcpfuonkcyzgpz1h9461bxo9qdlz30b964mwe1lqmi9wpibxjx3lhbyfq1zezxyagbl1kv0okox',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantName must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: 'f77b0e30-7de5-487d-a259-43a9e08f46f8',
                
                code: '6pk47pcagdm51y04mxqpohwyqvo0jzle56aol3hsmlu785k4m1',
                logo: '81sxek87wnu1gzicu6zmfm7bd51f2sgpwwvgo8j049djwwbnn2pwvi8jpls93iaorgb4yxxa69hiqcqekq2mdppjui5tmojmbqr77u5x9ctrsnp63y7rbc48tn5rcxn9alz1ky3et5pp45k1e226cyhnxzqr4s8g5kb67yf6la9tyszpmy3n2mpge697lpamf4i690o4v0f7n0oolutn1fhjp0ol8j2tvt56s7idk3qw1v1yt9w1a7wu5ge4ji3',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: 'f77b0e30-7de5-487d-a259-43a9e08f46f8',
                name: 'a7qqyyug5sxzdwmn5lrtf7tkav70w5l5hh5v7a97kbw0aa4gu74u0nxc03jcmh3vms0givuoqmhenf6hox3sucjlqd0lqazq02iflrw8ywtgnrgy0j2c5yf675ah6znorilum86r01o8fb4d1efj29me3dncrip0a2g7lkoyyhry8nwpsdffgney6x5lupm5aagcv6u3etncjd2jesx233k0rl2amjf31a37icx4rajzbrlvg94lnlwzvny0ji5',
                code: null,
                logo: '8x743omby4w9frdcgvlqa6zctp27264cca65r7dpok55eog3nbq0d6a2lmrzuqtizhrctbukgxdntjc6bak12yu8b7q6s8kvrgs3fo3x69j8qql50gn22g8m12ahpyc0l3lc3jtd7io6pgnxpo2itmo2tp6ntpiokyyk6ju4fw9e6vt2gdhgw6zr7rdt7wlhmcc5ib4mry1k3z96z6r1hipzuzzfu1s9c1sadwp4jeerzbym4rsi5ix6d8z0eli',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: 'f77b0e30-7de5-487d-a259-43a9e08f46f8',
                name: '0u067izntkfb7j9uctywis2mq8eqtplnfgiz1l79s97h3t1adcetdga5avp79k4guljr03igrdcgnpwx296fb9tnme85663uw946hgw6dizgaeclkbwtsa2ii89rolev99jml1os3ngf68m3u2pksh2rwbs6gf9c53c9plua2k36lpe9hjniwzzezff0gw3pt013pw4o9er50u596ryll2y8l28qzp3dmy77cyec4ca1jjtbqvd56kycxml4b4c',
                
                logo: 'j09p10wh5p205b7kdaxob7usjkdkglzc3it5kbd2y0vzql3nl4jkwrxnuhsqyautpbhn9ev612h1ynlrzevb8ko80smlusbh5jzg5ekccp6wzj8juqaz23bi6rzcvdwf6ja82ghkwze2mez4h838m7os9gfinpt82cyiy4zdgh2ebgmiea7x3w6uxh0c83kyadws1wbhywhjhc0y2zkqtk847bbzsw13j2bkblrig6gngz2t002zddgp4gpl2rw',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: 'f77b0e30-7de5-487d-a259-43a9e08f46f8',
                name: 'h1edze9dfho57usp6gw72fvkcch97mrzg6xwhi8iusoa4mh35xxe6r42z7j2epmryrnvdrt6wyel9l2vbbso85l4065vhyqo6zzil7ovg6shcgvfumcu8nsqdz2i5wq71ahodmh6askr0a0jdz9u2v866rzahqfwykky88wv3ng9dm63c4fo2gwjvtwxnqebpbn442b1djv1w9a9f02hz0l8upfkg5gwf26sh59xj3al9soz9dgc5aco3stfhps',
                code: 'yo6445x317sprryuajqx1hfsglfpg84z5bv7txyp8yro69ngkc',
                logo: 'uoh63vmy5lkykzp1xz95ynjvh1av7b8hfo7nvxp5u7jqwgkcsk6e88ze1pvd31np4ydmbwyuhvy0a7j1z1qje4jouxi458l1kp9jcheorbefeppggmyglo35sqox17mg2281einixd73tt1keov2g70jjh2tv8ebvqpqj9w4825tgqsamlwlrslen3g39ahulml3yjpmzwwl35ux21no0x4i2lvs6umh7e2uk805rqklwyoex6o05zcvk07cpwa',
                isActive: null,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: 'f77b0e30-7de5-487d-a259-43a9e08f46f8',
                name: 'jz1a8njhwkhircjz5iem2nwr7fnarh34immormrjalopln2171br58t1x4riyolqu7amdkiak3o1pdsmylw0mi7xaltsjx8yt8oj9rejzq6lgqc3edg517kc8x6w69a9a30xpem951n95vmae0baiuwyszmqt0hum2t38ke0q0fp1tb0b3ej9ajw8v5c65z36lmrb0bx9g8jgvjevydl96tvt544c56lchcj0wh4ab484crf9f5sl365nacxkoq',
                code: 'ivu7803xbdi1ei6uea114f2eqho6mks0o76iltr20004efggsm',
                logo: '6qyw4vg0bfvx1w7zb2rjozpdcsq5oonc69589pbi0gfl2srzub5cft0c2dvm4wu4g1r6rb3r7s8gt2g5q5v5z16uo7c08mcbweq505kwbcpbm12ssd7dovd286l76vi7ij3j8rzlvwaqv030lnbv1k8dwx3ymxwpjfz0r34m0ze7qvv3az7gcuo0ldtw8vu910niz7nt5jyvg65hn0ijpb21x0bpl1whlxwo79xno8o6d8kpwyadv1p50fngspf',
                
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantIsActive must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: 'k32b1fzbg7xqwvc1bl6comhhz6uc92mfavo2i',
                name: 'uvhs3wgagqsvt7ktcgx71tms5bqdd0ovx41miuv4ejt4iiac003sxe2yxpmlksnhxajgwmqkod7ug2rtoboq0bhi4qwoxkmltd4aed0dy6anxsiqukch6a42vfeqvuq1eufya6lms85tsrz1cz1kagfaw8v3qed44gd2tbb5c49mtg3uqbr1dat0jdmw1zbuirvzuyt0aycqpef33gi5o9kbgs3wl7iy8oabsmjxatz50grd7ahv6i0dbo3y1mu',
                code: 'tcp5sus7f1b9zqlha8qjgn1baelfqjvnw2j5jtz1o4jvrgi8tk',
                logo: 'o1h048a2rtmcmf2k36key7dtqrtohr6qbrnuthkk15nbzw23d65nexvcobijtq0ajg8buunmxvk2b14nw0jjixi5cnd7u3tfphb8zjczdsov4jip3kyzmj617tzjvks3fal0qv3z01a55ka53qkgdzl9dj1dqdl5xq3y64mhl3jvd72at50ke1x3ifs1f22o2yb2s9yxve32hbbgd8geb49lrcb8aqcmrtul46o8owxadp3yak786o1yuvuq254',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: 'f77b0e30-7de5-487d-a259-43a9e08f46f8',
                name: 'iuz8egga9gedkowrm0x9zwzfuf9q8lb9e0rab01f3u0hx5eywrhw6yd9i7l6ngakso04t28emjxwu71icv38ivq9wpnhuwqxp0efxeainqkgu5c0opihnda1lqvq746e9umo4z7ov19ymy9mopkk0sgbz4pmh31e0a1ufn2i4i41o9c1lmo3a4crd4gspqnekqzekdpxyrxqw95fmmaj4inam2wh4jd1pmqstx8aeeqvysm3va49m0nl2vaojjk8',
                code: 'zq790alftefegxy6llzsooa5oxweui69m34ms0pm2h09a2fbs4',
                logo: 'uci1fvciszwa4y6jq5py8vxs58vrgid84gdg55vnpf6j9y0ikkp6bwe9msmpp68ztu34gt1gqmlg7zmy91hoc22x1k9h20fwnpeft6ndb36gk5f1ofk62fbdo7jw78hl9u3yctts2pw6m7ibl0fugj6rcx7hfoyxnmu2xlg8x4m5mb9tai9aw0rj0fhev6mmtzbkxrnk5t8p8evi81jzu3e425udwlt3pbjuk6pkps5xw91vk0ojf1if3m81ppj',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: 'f77b0e30-7de5-487d-a259-43a9e08f46f8',
                name: 'xvjstkm2vxjm9qm630xqurytusg7zsg1gmhg3vuzqhg11dy7427os0rdc6r9rt4e3keyavb6382ouercrz6dlf47y3a8wkmagfeezcbwkuyo0ts0ff2kunhrog8gzmlt1wmhmd30048nwbzabsv0xahhx2ducut2ko01s79edpuhc37hz5nj1f3xg4ve72ztzkrc51uk7czdu11d5i6uec2w4mxpnlkh24d168g68eb53tllkca4sawg6g09ttq',
                code: 'j5ba1zbbint2zaxn869rr66e988qdm3tsxnxwk3joe98pvx3qbt',
                logo: 'u8a96d5c70zb6r0rec8do205gyhtidui4yontp46lfag5isfdlxdrt0xapvadka0fteipfys11fwqwx8xe01y79nfbqbhinnraqfvr1vs3fpljl66roejga86ilffiomdog1v5awg35vjrjd5ve9lpkt5bu2jhq0tnvqgacx5py82v1t15ugj8uh2ys5v1alag1s2c81k493gju8pbg0740qujtaab1pcveyurdk1n8p0t2htcs3lquv8634brf',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantLogo is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: 'f77b0e30-7de5-487d-a259-43a9e08f46f8',
                name: 'z8qr1wqiewsoif7zu4fg194vf7w3c1pkqb88vj02q4yru9ec4b9kngocvm8z5svjrrlvwvk5141e7irnj41dhfptiz7dcib8k122gjrkbnwn08enyf8m79o9ycv0tlpq3a4y0944akuzobszwdktwiwzt7keofz0dx8bbt6y7lajkgw4lzbxm3559o56rzw0oewuow0awahtwe0m8flfe2pc3hqkf82vuzxols0it7rn0geil1vrdoxr4smm9kd',
                code: 'zds0nxx6ujta6fa1fsdtes1tysbf1cpkmwj5ncwws6bgq2zlbe',
                logo: 's0xe6eec9g0cbdldmtdjntwdzwl8oc8sizmqiyepucdi7kuaggo490y304vph9uc4bqq2wfpijri5lg346atw2v0r24y0y22ry5ddp4hl79xpyfz8qoyk7gaiyqcagu6lgx981wi9lq1plvtsrl8ifd1xl2z8wpoqajmvarzxec5m7hh9d7pycinvmzz316yay4s0dxuzi0mp3w3rn5r5nlg5usc6z7xmb0bfhpgnc6vcwr19vegs6e56yv42s6m',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantLogo is too large, has a maximum length of 255');
            });
    });
    

    

    

    

    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: 'f77b0e30-7de5-487d-a259-43a9e08f46f8',
                name: '6kzy2sa2xmlxcyvtaupmo8b3xkpjjqn5ry6s87ymc2sxegsvtoategpr675fkq3b8iz328bhax2soxczyx2lhkxfm5de5lhbsdxow6cydki3a51yz2tkk0kc77hj2dhst1rndz9ko2tbfke2m5q4dn0823qbwq0j1e5g7trqkrz4zxe3xf3yofoayw0ufvrwp9fbmng6pyj3n3shypfj9c266vsfeau9xpd0xlr0yby6ktmbuwx1n4y25trlmel',
                code: 'kjv24yjoohfony9ujapc854tr2w5uat7umnpwf5j0cnlkq9sj1',
                logo: '46dlway346t1nk2n471dgvm07uncny42hfxdjttth8l3rnsara9zez3ro2v41nuoqj9b8mlrdzsvvfek5xwa8htqnvcehst5zavs66fjfg9js4bq7rdxljs0yl4jlyqazyi5llgvjry410266j9muul6q8civraxndisybzeh0vs6dm92fgsztew5svv49v4reih5xnmzap8z1r93hl6g0gqv1bayg9st27wrvrn0cbuac2so1bnp6s9m5yp5vr',
                isActive: 'true',
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantIsActive has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST iam/tenant`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: 'f77b0e30-7de5-487d-a259-43a9e08f46f8',
                name: 'w78b268ml1g9s6xq3odxs5l8iuhn7jgxu2mniskgaha46jg5j82h6ppuc6r8grsy3xiaudf2v0tv3n6v2dhdu8gcmxuh9on054at67cgjh6x6jbhxnzbgn29f6n7cyy92rtx9tspajqlsi30wpcl9wzec46v5nl9v9sjxczhr9sgesjh4nxili84ts67sa6w93i4xdf8t5zh6xlfx27vcy0nxayz1lyyib6kd1iyyzv7c4rejz4gbm8czm8gj67',
                code: 'ml744vhaqak9t0skyk93tec4f3acemfdyshb8e4fjn5gzb72if',
                logo: '2u1jj57y4i2n9vjz9h3q1y8qu6ln12h93oeg161xe8xrv96xsq1o1ukjhqt8b77i6me5l5ssgeq449iltmibbdog98jk9j5u4nxmlqic1age1uo409l45dhb7rpt20qsuec85ya7vri85nb0rtqyxtf1dc784e4y9w0ukpnh16ya5yha4pjqupsqm87c2f20exj1htathu8xneqlwx67jw8evkufr4oy3y6rf4m1re6j0n3n4tcv7oobw405z52',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(201);
    });

    test(`/REST:GET iam/tenants/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/tenants/paginate')
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

    test(`/REST:GET iam/tenant - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '9039c10b-b5d1-4d99-8fd6-19945a74ff85'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET iam/tenant`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'f77b0e30-7de5-487d-a259-43a9e08f46f8'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'f77b0e30-7de5-487d-a259-43a9e08f46f8'));
    });

    test(`/REST:GET iam/tenant/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/tenant/e896bdda-cb38-454b-a22e-43d4aa32f996')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/tenant/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/tenant/f77b0e30-7de5-487d-a259-43a9e08f46f8')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f77b0e30-7de5-487d-a259-43a9e08f46f8'));
    });

    test(`/REST:GET iam/tenants`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/tenants')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT iam/tenant - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                
                id: '5292533e-d1db-4421-8cc8-14ede5355ae0',
                name: 's434uf410ht0ab8ya1urbqf6oscc0213159h8403j9g2d0gp9aahqri7y32q5qco12u43yv0nmolwvsbip4poo4f3le8dr08kxnd1fano18ceel2iva05t2ovtpqmqp8f9mag6l3zp6azdt9dsonajjw6rhy4m80b73nhx1y7myf08zi5i500ys5v6e7b2rfpj3w9srw5ytpzbticlqxke5llbr2thqxvvy9n10346n61s3q41ux11ktae91uce',
                code: '2p6emxr62686ck4zpgxb0z2zgntuvv0q1q45c39wxlhy60wkv1',
                logo: '5s56e0vwx3cggljujd0u311n3imkh4wram5p4djmf0fy3i8d0uc3rfflpx0tbcpb2s3hbqb2rns56dir3ph6p6d9shjrq4k2b77eo9wcgjmzt05u95l9fl1s09j9nr47p9692rya5z2jxikrzg9fr95musa0hr2ojof1ywsfzt8dvowm4lw0eqa03xwwsnf8wnvyer1ckjev37gxb3rc6u49ezazziofovm2boyevhla9kvrtfu7b60r5bgve9p',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(404);
    });

    test(`/REST:PUT iam/tenant`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                
                id: 'f77b0e30-7de5-487d-a259-43a9e08f46f8',
                name: 'on5pzthns8jl43k330j49ws9ynktzsg3iy17celjlwlkfhfdvm14ejxuzkvk0koa5zlzejtercv63zp2se5l93yjm8zi9fjxgfyj1ji3dupdzhf749fh7zgu8bglyu82f9y119wfyt9i62ipxu88vjz63q7o8f2p4dlngohio9vgzzlp3n45a27g4ehcya8n2yars3jj389wmqvn7o7zbx81nbxdg3o5giut2tda353gdlsvnlbl6zw0efofwbh',
                code: 'f5u4lu4nekk3l6z6vz2h5dikbb7iwyqbzudx8vib6srx2up8sa',
                logo: 'bvv6r9sv6htey6wnbid56t01gfzja3q49ftwi7i78wyzsq37s09rdorfe7nwizyh49j97bsl933wpngjdfi75r3yeykxh8z26d576f9uhhg40jw0aq0w6193gm2h5himb0gc5wxelcw4g00e1q1wtk7lsb5dl7fdufrxzi32p7agx8fjkoid27rxskcsi316s2kmjwk6lamy0d34tdmyk69kye5fdfuf5jg9j1oyljyn8y7opas4w3tn8c6qj8p',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f77b0e30-7de5-487d-a259-43a9e08f46f8'));
    });

    test(`/REST:DELETE iam/tenant/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/tenant/b69b46ce-d002-4476-b3b9-9a54fc32a5f9')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/tenant/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/tenant/f77b0e30-7de5-487d-a259-43a9e08f46f8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL iamCreateTenant - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateTenantInput!)
                    {
                        iamCreateTenant (payload:$payload)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
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

    test(`/GraphQL iamCreateTenant`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateTenantInput!)
                    {
                        iamCreateTenant (payload:$payload)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'b64c6abd-fba7-4d72-9520-5448a473f292',
                        name: '941tm1839whqn5x12802ni6fgidk2nir6vif7pvotx847nhndrffwbasql98g73r89q8dcsam035wuuip74nupk0m3gex9qgvrt1v675vcqiw5ervzo6y4bceqvepfsjttq2oi5p7zmi0jibu5mmxh09uvz72160dxseq2fuf7rzycyfdyaai9oyqsuuk260pvva718k2rkavroyaux3op3a22rqnm5p5wyp3788sqs30x13s7p3gi5ao9tj66g',
                        code: 'dc82rvteqx9t3d5l4zvr16gl3xl438vb4v66gbxugg36q6ntfz',
                        logo: 'zqhb3cbiucl94tzfwbz9b4j4v1r69ybjmtii8zlvk6hcdcii25n5ewdpn4t5qi17qylxj7hc2mdtg2fokw2ktllgheb65zs8rf65z2uqpoy2aeudv4yr54i4l5nbaoyfdpqmbgwauqll7nmlazkavn9npsjkykvr1y9tkn0pm9juk06p7rm1ljope4y434slgb01btsiuq41z0n8lq7310q9lgliguqwh1lz3m0qmxihwlm18cz1gznlsk2zvav',
                        isActive: true,
                        data: { "foo" : "bar" },
                        accountIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateTenant).toHaveProperty('id', 'b64c6abd-fba7-4d72-9520-5448a473f292');
            });
    });

    test(`/GraphQL iamPaginateTenants`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        iamPaginateTenants (query:$query constraint:$constraint)
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
                expect(res.body.data.iamPaginateTenants.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateTenants.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateTenants.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL iamFindTenant - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindTenant (query:$query)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
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
                            id: 'eb76732c-fa46-471e-9967-7c00cc7d0531'
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

    test(`/GraphQL iamFindTenant`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindTenant (query:$query)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
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
                            id: 'f77b0e30-7de5-487d-a259-43a9e08f46f8'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindTenant.id).toStrictEqual('f77b0e30-7de5-487d-a259-43a9e08f46f8');
            });
    });

    test(`/GraphQL iamFindTenantById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindTenantById (id:$id)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '74f318aa-b7e3-4cb3-816f-f07cceefd602'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamFindTenantById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindTenantById (id:$id)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f77b0e30-7de5-487d-a259-43a9e08f46f8'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindTenantById.id).toStrictEqual('f77b0e30-7de5-487d-a259-43a9e08f46f8');
            });
    });

    test(`/GraphQL iamGetTenants`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamGetTenants (query:$query)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.iamGetTenants.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL iamUpdateTenant - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateTenantInput!)
                    {
                        iamUpdateTenant (payload:$payload)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'cb13c975-4fec-4c03-83a2-b4b2cd69cedc',
                        name: 'tj8o81vpufjzxdwjjbl7cs88mvvf9pwpfodjzf2ok80tps740owr5egy6q31zr1kmyuakqfs3e46nnesmrkb3ymry63b4mp0mw5hrox96ubeo8z0zrfe2z4aekuwr3n81e7pjukqjjehjb8qa802n5iklorgt1qgc9zbozmmc844idhb5dmouhvlg5jakuvu76a2rzcgxqc37bslfo6359g44wc6ecvjib2lpa15sso8n0rf0iv5ctq7n50w5u3',
                        code: 'szhmnligm40ywtz2zwckwpjafd0lft6m1t09ru8g20cps50hv4',
                        logo: '02782l7x0zrrslfl8kf5div9ya0ruan6sx8ke1gsrb7cxshsc77mi09f9lzpmyfnwnduly7g4in5h44mtg9jydhvh9j9z7c0z593vyswle1t8z942r2luuo0kszlki5d1w1wkfn45w17wke06o3ol3j5qco6tzhemaq12dkjmqtz3xn1plfcraw0tf2j77qx6d9qr5roglhyg6w13ttnrt39rxqgrapd1db04vu6vx2ik8izmklob42itsxq1br',
                        isActive: true,
                        data: { "foo" : "bar" },
                        accountIds: [],
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

    test(`/GraphQL iamUpdateTenant`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateTenantInput!)
                    {
                        iamUpdateTenant (payload:$payload)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'f77b0e30-7de5-487d-a259-43a9e08f46f8',
                        name: 'k4871umko4dboj35byn8uvb38o4v2ef1l8dh77u8eb1q1eh6ku34840cuco7x0hj00jhesnt06ebpgw2fy6szz58o4yage4rxkhqb29yaabyqiwclx0pvpo2qkde9kvhr63gcg6tzu5lf9iqbc9flitfrxqs3oy2qcrohm3mmu7gra8m5f56vypfq40j63l311vqdlbbffer9g3nntvkthihij1tnopgnklj1ou7rim9845f457h0ebikorzyej',
                        code: '42kgkch0pzzyrx1jrjcnfcq61vxu3izi4kgj7rakr2qkrdznuz',
                        logo: 'ps34mcz5xnv97nx7gh8hd4ehj1ld8afpk27tlpjrar8w4kcwgcxowzot1npnyqgwur5n4mdedvko8f010sgz7lscl86y2cavnc0qijbgxw9puc0u1bogxvh4b7qqi7byur4hmddjz1jijnriuwzzlj6fvqtek02b103d8xkbhkt9k67h09klz2py2u02nf6bciztip2g5u4v1ojgpqu7mz26deru389zjxwtg2btsfr7mo6w0021y4ge198sis9',
                        isActive: true,
                        data: { "foo" : "bar" },
                        accountIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateTenant.id).toStrictEqual('f77b0e30-7de5-487d-a259-43a9e08f46f8');
            });
    });

    test(`/GraphQL iamDeleteTenantById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteTenantById (id:$id)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'd1c6274f-5c08-44ee-925d-f338633246ef'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamDeleteTenantById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteTenantById (id:$id)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f77b0e30-7de5-487d-a259-43a9e08f46f8'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteTenantById.id).toStrictEqual('f77b0e30-7de5-487d-a259-43a9e08f46f8');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});