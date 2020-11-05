import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAccessTokenRepository } from '@hades/o-auth/access-token/domain/access-token.repository';
import { MockAccessTokenRepository } from '@hades/o-auth/access-token/infrastructure/mock/mock-access-token.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { OAuthModule } from './../../../src/apps/o-auth/o-auth.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('access-token', () =>
{
    let app: INestApplication;
    let repository: MockAccessTokenRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    OAuthModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IAccessTokenRepository)
            .useClass(MockAccessTokenRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAccessTokenRepository>module.get<IAccessTokenRepository>(IAccessTokenRepository);

        await app.init();
    });

    test(`/REST:POST o-auth/access-token - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: null,
                clientId: '7a2328b1-c5fd-4059-b6fe-f6438fc8e87a',
                accountId: 'beb15acb-e0b6-4cb0-bb59-3cae3016fae7',
                token: 'Aliquam doloremque quod. Illum corporis incidunt blanditiis vel aliquid occaecati. Necessitatibus inventore incidunt. Asperiores id itaque sequi ullam.',
                name: 'o28ogtbuauq3k90eu8cj6p7bl9k4w3hskr5arvl1jzxhhneyd2sr6rcpdx50mjw8nvoum0tdy2mi2vj7izxksomf2g9dbt34mylok0yot1mh5nxxxjhqyxjf4bmbb4f8rgnomb9cfqwlsri52t86inqbjo7qm5iz8yusefqmfhauubrbvi1ozt00ozchzmhxqx1gcofov8manoc94fni8ceq5g11n6xtectch0dj3kgbai54tlgpxodp2717xrs',
                isRevoked: true,
                expiresAt: '2020-11-05 16:23:52',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenId must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                
                clientId: '7a2328b1-c5fd-4059-b6fe-f6438fc8e87a',
                accountId: 'beb15acb-e0b6-4cb0-bb59-3cae3016fae7',
                token: 'Sequi doloremque perferendis ab voluptatem quos nulla ullam et sed. Quia quis ex. Non pariatur quia est occaecati. Vitae non non totam. Officia vero enim sed eum est. A ipsum deserunt corporis perspiciatis at nisi quia harum sunt.',
                name: '1zajsygcxn1a15hrdex58ywp1djg9ccoj2cf6avz3h3edbmkkq5r5n66ui0x76tiwi666rlymxxwa5x2mxdtqqoqiun1xf7m36ar60ylu1546ddji6xwmncrf2co2htydz2no67lgnlqd5asaqnplipf278oy127fpo67jd6jo6sevzfd4janxi1mc9nit6uniwips9x7nnigm8c44fjwmf9t35qoktto65efkwrf27sdwyqestg8vhxwbsz2yg',
                isRevoked: true,
                expiresAt: '2020-11-05 15:23:46',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenClientId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: 'f4e66c04-47f5-4ec0-883a-d7e7bb9a6a31',
                clientId: null,
                accountId: 'beb15acb-e0b6-4cb0-bb59-3cae3016fae7',
                token: 'At voluptas ratione beatae error corrupti id tenetur ut quaerat. Sequi unde accusamus deleniti explicabo ea doloremque. Iure saepe aut.',
                name: 'ei9y3u3nu7k89209yurgtgiji6zoenayu7um5reqmbhc2j1ibjo7mwdzais1khax50emxgssmvxbkv7d6eqiwd0sm3i8ltg1byp0ma22xyvq9vuhpeqck1jvoaez028283ja9km6pulaw0lvhds87blwp8gbmm2hnsbeynzirsgsfamf9jtum6abt5qxj8o5r525ky4gcjr5pgz4owmi4a854ojcf8drkmav6chqlb4ckrcnukotokeh8trejg4',
                isRevoked: true,
                expiresAt: '2020-11-05 02:29:03',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenClientId must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenClientId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: 'f4e66c04-47f5-4ec0-883a-d7e7bb9a6a31',
                
                accountId: 'beb15acb-e0b6-4cb0-bb59-3cae3016fae7',
                token: 'Qui consectetur magni. Quaerat qui sit numquam cumque praesentium aut. Et et veritatis et ut aut ut fugiat. Maxime rem omnis labore odit. Commodi ut nulla nesciunt perferendis consequatur minima dolores doloremque.',
                name: 'eqmp0ocu2f4phm8p5n9ba1ux7exayuqf5y0sf8x4tboxi2sooryc1d0w3u04hs8vqu8qtzukfis70xm2rbqdvavyj0hkmmudkpnxuu3rzymt08wrkg4he0qlwvom0qka7a8nncvaohpv1dl54qjj54ln3otisvp9k1wli3a9n7z7l3tlbswm8yw7duw8ight1p8oqw6c43z2wdjohivc9z6904eoec1tvilsgymbrnksiz8dpsxj02103p70it3',
                isRevoked: false,
                expiresAt: '2020-11-04 18:37:26',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenClientId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenToken property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: 'f4e66c04-47f5-4ec0-883a-d7e7bb9a6a31',
                clientId: '7a2328b1-c5fd-4059-b6fe-f6438fc8e87a',
                accountId: 'beb15acb-e0b6-4cb0-bb59-3cae3016fae7',
                token: null,
                name: '618vjnryp9q15cmmbj7kqwt6i2dkvgg6s9z8isrxaarsxz6yuwxtyeadvqcmlv3anie34go9ex6qnr4ol2y2rmvgywym37jqz66rlq94mkp8me5phpq5qpxwhm6ltnh8ly6riq7j81jb7ru7iz7k8dr4oz5xjf6hsrd7bq7fb1e8affa092gf2b0s7zrr0a1vcbgf3ti5oahpk31g61naosexya9iyy44fm1jrk0dblbk9brfg4oaynsg04s67k',
                isRevoked: false,
                expiresAt: '2020-11-04 22:49:04',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenToken must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenToken property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: 'f4e66c04-47f5-4ec0-883a-d7e7bb9a6a31',
                clientId: '7a2328b1-c5fd-4059-b6fe-f6438fc8e87a',
                accountId: 'beb15acb-e0b6-4cb0-bb59-3cae3016fae7',
                
                name: 'k4yl4d37xgbvm1xg4nnblsw5eo7hvgzqlnxwzdt12fcfwa471j0gasn4ly44hyt2xqw553gi4sriy44j0yyoeygxijsndjbthej8219xvlxi96n4w3yxetr0lnldm1slwvchwvrenwoxpg4pi0jfg67xbn6jtku5ydym4pd62m0xjdqw03m9zkerbmwnwzav9xuvqz7aof6i82g9iuybojfox8n5gxzyirghdwdyh67d8lstqgqit9gjz9y55uy',
                isRevoked: false,
                expiresAt: '2020-11-04 20:00:15',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenToken must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenIsRevoked property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: 'f4e66c04-47f5-4ec0-883a-d7e7bb9a6a31',
                clientId: '7a2328b1-c5fd-4059-b6fe-f6438fc8e87a',
                accountId: 'beb15acb-e0b6-4cb0-bb59-3cae3016fae7',
                token: 'Ut est id sit. Aliquid non eligendi dignissimos occaecati laudantium mollitia. Praesentium autem excepturi nostrum id quia odit quis pariatur aut. Et quam cum facere. Facilis illum minus consequuntur dolorem illo.',
                name: 'ux1dbxz3uolgbyi7czhtv8ga798kd2gd9prj69lphy5norhpep1c87yzf0vwbfrwsd8967ms3lapgidfb24gb27m6aiyxra96lkhro7q1bi1v2fy2z4cbwbif27uw0v8s8qggecxm74voueggaslex5vfi3g8w2dn0n1tl1t9mnppbgc9feix3adod4b0igyfe56dg533dm04jdtpm93sqhku6k51hjfd4tzk2xuzb3cesrq5wv0feimc5zqrpk',
                isRevoked: null,
                expiresAt: '2020-11-05 01:42:51',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenIsRevoked must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenIsRevoked property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: 'f4e66c04-47f5-4ec0-883a-d7e7bb9a6a31',
                clientId: '7a2328b1-c5fd-4059-b6fe-f6438fc8e87a',
                accountId: 'beb15acb-e0b6-4cb0-bb59-3cae3016fae7',
                token: 'In illum consequatur culpa. Quia mollitia voluptas a. Asperiores rerum aut incidunt velit autem consequatur itaque omnis.',
                name: 'zjup76e39yrqc8crkm1udvrq37m6gp3up5pvx606d49nv6qu6868zeb4wvdaq4fhxb3ic9rojnu85rmu90b4ip5zmqpa8kivqep1oudga724ydjldq2801f3tm8tfx8ugbzz0phri1ycvqfu2wkicx5rap9gysegoe7v43eyi9l0chrf8afosx64bpzi1wvtajk63w7xt1c1z5wzg8i19kxm8bkzdihgr0vder7uj4odasbedhpfiv9pk0orld5',
                
                expiresAt: '2020-11-05 06:08:56',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenIsRevoked must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: 't891rc53bcabexyagxiuxn1rs5021puezbctn',
                clientId: '7a2328b1-c5fd-4059-b6fe-f6438fc8e87a',
                accountId: 'beb15acb-e0b6-4cb0-bb59-3cae3016fae7',
                token: 'Labore ut est repellendus repudiandae numquam eius. Ipsam est laborum. Sed et qui explicabo sed eos aut incidunt ut quam. Illum adipisci dolorem eaque minus velit atque aperiam veniam.',
                name: 'ftq8qnloady6vdqmtjpo8le0496dyv2muxqo12fcwb3s7mpfnfehy9pjbkbee4dob28nylav44tjte8eoumajdvzw5mc3zherb16whmmz3dqj4ys2jhwsk7jxk0o9r6rp3pk109itys3vn93vhubffnh4uo1h2d31mqm14gvpownnxridooc7qxkewjevtc76tux7lrib6onufvy4eyqkpmpe7usgowfwfv5q16msrx6tkjpztoiajateurm4j8',
                isRevoked: false,
                expiresAt: '2020-11-04 20:54:57',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenClientId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: 'f4e66c04-47f5-4ec0-883a-d7e7bb9a6a31',
                clientId: 'rzc1g1fdzrngzfa5h0vg2xarvu232nqcwq9bl',
                accountId: 'beb15acb-e0b6-4cb0-bb59-3cae3016fae7',
                token: 'Sint fugit veritatis omnis. Nihil reiciendis molestiae quisquam. Ut tempore qui in est. Ipsa quia adipisci velit in esse. Quia ab consequatur incidunt dolorum. Laborum dolores architecto quo incidunt est.',
                name: 'ecb9cuqzw7l8bot2sbeeyptwql58rcbsdjln7d7jqrsagpz4qas7862fimnuhmagyg5248scgu6irw1fbyem3cqzrpx0m5qrmfs6396a2y8reep5jd8lymt999ci7vuhrx59t34s95qo8ao31zlkuh9pfc8kiv23veb95jxie057yawjty4lxbfovx07cov1tq7unemzmxz9zyc998fmh8ou4doye33dqzai34h3omwxyw6d3ydn8omwcy7gz2x',
                isRevoked: false,
                expiresAt: '2020-11-04 22:46:09',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenClientId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenAccountId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: 'f4e66c04-47f5-4ec0-883a-d7e7bb9a6a31',
                clientId: '7a2328b1-c5fd-4059-b6fe-f6438fc8e87a',
                accountId: 'n6yfawkzkhrlqa9mtlrlym6qpwbddecty2a8t',
                token: 'Repellendus minima dolor est. Fuga quisquam nulla distinctio et modi odio placeat. Voluptatibus ut est explicabo reprehenderit pariatur tempore ut. Non itaque et delectus. Suscipit impedit consectetur enim et et. Et nisi error commodi.',
                name: 'l8w53nlhq9zeb7jtzw0nysh7hel84svcc8tcynfceqlgxqn9fkdytco90mc4wpj2xejbel0zue6vxrk8nx12wfrhxpup8r1ekaucywfhz06lxbhxf204j4vll0ewaqub1njk7vjhnxmtwz2irzw98khffpde2z4aamfz4rdkhrv068qkqv8crt8juhudp41fq4gfpw1of9ok89j1b4z8d07kb2zpb04wztwl43mm6bafo1ev8dvnv7y0n1483wh',
                isRevoked: true,
                expiresAt: '2020-11-05 11:16:11',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenAccountId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: 'f4e66c04-47f5-4ec0-883a-d7e7bb9a6a31',
                clientId: '7a2328b1-c5fd-4059-b6fe-f6438fc8e87a',
                accountId: 'beb15acb-e0b6-4cb0-bb59-3cae3016fae7',
                token: 'Aut voluptatem maxime non possimus maiores. Omnis et ut atque impedit id ut eos fugiat. Et dicta molestiae cumque similique molestias debitis consequatur non.',
                name: 'rr5729ye422fa52hy9z2gvzekgse9d15nd3wqa6q66p4d7doaaal0ei26fg3zove8tw4vmz3c5829etr6uqespb3o7cjen4f5nrwsdlevyq0c8zvftv9f6rn3na6z9rrgyh2sq3rfdphiewq3nbr8qpnwhgh62l3iuytswljn67dd6ho920841pl3yaxz1e5hlc2n2z9xb9em7k0x8hojhylbh6ngutgecukuznxa4nb93m8peusz68gwyggjfmj',
                isRevoked: true,
                expiresAt: '2020-11-05 11:31:25',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenName is too large, has a maximum length of 255');
            });
    });
    

    

    

    

    
    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenIsRevoked has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: 'f4e66c04-47f5-4ec0-883a-d7e7bb9a6a31',
                clientId: '7a2328b1-c5fd-4059-b6fe-f6438fc8e87a',
                accountId: 'beb15acb-e0b6-4cb0-bb59-3cae3016fae7',
                token: 'Consequuntur magni reiciendis laborum natus odio repellat vel et. Occaecati animi alias ad. Deleniti aut pariatur qui velit qui rerum. Quod et rerum.',
                name: '0bdcv9maymjlx1caa6x8k7bu0982wsekog9rgwfc4xeqgwhd79wkapbxm5f3mw3mswc665wex1x2sdae3hif65nj4gad7p45ifx57shqxo6237z42fc8gi3jikjo25g5jrmfn57x2plur3h6ujamf9ov9ay0fco4c146ns96jxdggrqfo8skxk2tr42w9hwnoplnwe5ceeuzpdoeee1go92fpdjcwj2hwf472pzm3yx7oap388ggk92kmmulpki',
                isRevoked: 'true',
                expiresAt: '2020-11-05 00:53:35',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenIsRevoked has to be a boolean value');
            });
    });
    

    

    
    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenExpiresAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: 'f4e66c04-47f5-4ec0-883a-d7e7bb9a6a31',
                clientId: '7a2328b1-c5fd-4059-b6fe-f6438fc8e87a',
                accountId: 'beb15acb-e0b6-4cb0-bb59-3cae3016fae7',
                token: 'Itaque et est quasi eius labore. Aut libero rem est. Ducimus suscipit est omnis dicta dolor consectetur omnis iure.',
                name: 's76wo5muq9k49g0pk1ij61qu4q26beown190zalk3z3v7q6w69jpnjwpycl9ehq7ikyaro5cfj231v9q6exvpz9q5dfm8ztukiuze92vb7wl0s9yhdxnulnh8rjfc467r6cgtyp8pjjdy5k778ysp06n9hj3423auenmhloq3gg3y6f7k92cde5tmh8xukk66m0e4jbxzshv2tfwlx2mtr4qqyrs65smdbi869i1atxxu8qm65z2f5fiids7p2y',
                isRevoked: false,
                expiresAt: 'XXXXXXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenExpiresAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST o-auth/access-token`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                id: 'f4e66c04-47f5-4ec0-883a-d7e7bb9a6a31',
                clientId: '7a2328b1-c5fd-4059-b6fe-f6438fc8e87a',
                accountId: 'beb15acb-e0b6-4cb0-bb59-3cae3016fae7',
                token: 'Sint ad dicta repellat quam voluptas. Aut est temporibus ratione hic ipsum sequi. Exercitationem est sed aut et qui corporis. Dignissimos repellat non voluptas numquam et repudiandae. Aut quasi veniam maiores soluta odio aut. Deserunt autem deleniti vel temporibus quae id modi.',
                name: '7ayptcuhxn4eqy4amsjeadozx02v9jum4ng9scfeccwe0gb08n2gqvgxkwp5x0roh2xixncywg0oip2p95ea16dbktz6i20odvhqhr5nugmkhmcc988loiaa2tjc67akz9mdl3jk9pyt1y3s5zsgnhxee83i2g8iehwvaetybvfcrehf1qq9j4jsoobd4jpyph85u0tuztoaypofmgnhr51gzar6bcsi4i008eewgii7rx8g4f05x69xkblb4mg',
                isRevoked: true,
                expiresAt: '2020-11-04 20:41:37',
            })
            .expect(201);
    });

    test(`/REST:GET o-auth/access-tokens/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-tokens/paginate')
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

    test(`/REST:GET o-auth/access-token - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '0602db56-8eb6-42b3-84a3-f6e8c6cfc019'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET o-auth/access-token`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'f4e66c04-47f5-4ec0-883a-d7e7bb9a6a31'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'f4e66c04-47f5-4ec0-883a-d7e7bb9a6a31'));
    });

    test(`/REST:GET o-auth/access-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/83e409e8-5e00-426c-a244-872873dda88f')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/access-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/f4e66c04-47f5-4ec0-883a-d7e7bb9a6a31')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f4e66c04-47f5-4ec0-883a-d7e7bb9a6a31'));
    });

    test(`/REST:GET o-auth/access-tokens`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-tokens')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT o-auth/access-token - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                
                id: '1ad15ad6-4046-46b7-b451-38977d155054',
                clientId: 'bfde0cc4-81c6-4224-a4ef-b0c7483567a4',
                accountId: '2c9340d5-f0e2-4040-bfe0-b71622298e4e',
                token: 'Iusto doloribus eum provident facilis et aut esse cupiditate odit. Perferendis id quo neque. Est id voluptas sit sit iusto fugit sint.',
                name: 'ancqbanzehnd2d0caq146uiqvm3ph536hzyedwi5be5bxn0283mobe79d72wew5icjhr1a9urql0xtskc54lfn9d1m3ts8m9swicx1in4c4vnq1vfylqww100igxxcz23f6zcyx4p8ak8lg3bbnw2e2wvmv5m5ah9z2xt8iznqt0xjwk0uwx5oqlqg1fov6pr4epgvcttcd8a2ry1guedew9a25ueluqmlxhlx46jzeke1nhjc8ehzepf4r8yvm',
                isRevoked: true,
                expiresAt: '2020-11-04 21:18:03',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/access-token`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                
                id: 'f4e66c04-47f5-4ec0-883a-d7e7bb9a6a31',
                clientId: '7a2328b1-c5fd-4059-b6fe-f6438fc8e87a',
                accountId: 'beb15acb-e0b6-4cb0-bb59-3cae3016fae7',
                token: 'Commodi vel fuga pariatur. Numquam iusto temporibus itaque iure debitis quia excepturi. Ut amet reiciendis dolor et quibusdam enim similique. Occaecati voluptatibus tempora iusto. Molestiae quos et veniam. Voluptatem quo est ut impedit modi.',
                name: '401yjr8731aw3bluzioq0lgu7x1qijuznc5pcxmrnrrtev046807j21wwkhomkd7ipcaved5dr0v1c5qwrk0r1vfu5uyb6swx3hecaq5v3910wkwufw06l9fuzoyu2qv9fmizu03hg67xnqoapk6hvducso1xtttllfvmpryeim4baeyw6d3a7e6fdnj0nkk55t6tfqw6pdlzht3krx850cf5qvbn3e09umypesj6uxgg4f5xtyvw4h7orusfz1',
                isRevoked: false,
                expiresAt: '2020-11-05 12:14:59',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f4e66c04-47f5-4ec0-883a-d7e7bb9a6a31'));
    });

    test(`/REST:DELETE o-auth/access-token/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/68962fb1-e8bf-4022-8d5b-561fd6d8fb3d')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/access-token/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/f4e66c04-47f5-4ec0-883a-d7e7bb9a6a31')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL oAuthCreateAccessToken - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthCreateAccessTokenInput!)
                    {
                        oAuthCreateAccessToken (payload:$payload)
                        {   
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
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

    test(`/GraphQL oAuthCreateAccessToken`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthCreateAccessTokenInput!)
                    {
                        oAuthCreateAccessToken (payload:$payload)
                        {   
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'bf4406c1-43a2-4b90-af72-6287d3763b2b',
                        clientId: '7a2328b1-c5fd-4059-b6fe-f6438fc8e87a',
                        accountId: 'beb15acb-e0b6-4cb0-bb59-3cae3016fae7',
                        token: 'Non aliquid qui quam sint voluptatem. Tempore et unde velit voluptas quo pariatur iusto. Dolores libero corrupti est laboriosam voluptatibus perferendis omnis ipsum at. Voluptatum expedita facere fuga animi ipsam nostrum labore.',
                        name: '9jg3bhazi321m9pk8pzr5c4dv6g0tdsmf2o5jtda0qxpm1yx4ww0vasp0euncqw6vj2ayiuxbudjiqeydt6bmukhtqavzipbg77fpu67scff7bhwjbhrmtjyavdq9kxj4d8q7e8dc1ezg875a2ivki57jeu4hjsm06i9ow326o8u3ba6y7x3ogc5zwokvyukwi9i6zbmv3vx05yobjjatgz38bbok75gf803yxotxaqua6cxxf7zpzij8park5r',
                        isRevoked: false,
                        expiresAt: '2020-11-05 12:32:48',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateAccessToken).toHaveProperty('id', 'bf4406c1-43a2-4b90-af72-6287d3763b2b');
            });
    });

    test(`/GraphQL oAuthPaginateAccessTokens`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        oAuthPaginateAccessTokens (query:$query constraint:$constraint)
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
                expect(res.body.data.oAuthPaginateAccessTokens.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateAccessTokens.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateAccessTokens.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL oAuthFindAccessToken - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindAccessToken (query:$query)
                        {   
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
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
                            id: '85575b8c-c5a8-475a-8f93-dd3db7c8ac67'
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

    test(`/GraphQL oAuthFindAccessToken`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindAccessToken (query:$query)
                        {   
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
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
                            id: 'f4e66c04-47f5-4ec0-883a-d7e7bb9a6a31'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessToken.id).toStrictEqual('f4e66c04-47f5-4ec0-883a-d7e7bb9a6a31');
            });
    });

    test(`/GraphQL oAuthFindAccessTokenById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindAccessTokenById (id:$id)
                        {   
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '91b008d1-a497-4fd0-846f-c071e7f89d37'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthFindAccessTokenById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindAccessTokenById (id:$id)
                        {   
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f4e66c04-47f5-4ec0-883a-d7e7bb9a6a31'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessTokenById.id).toStrictEqual('f4e66c04-47f5-4ec0-883a-d7e7bb9a6a31');
            });
    });

    test(`/GraphQL oAuthGetAccessTokens`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthGetAccessTokens (query:$query)
                        {   
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.oAuthGetAccessTokens.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL oAuthUpdateAccessToken - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthUpdateAccessTokenInput!)
                    {
                        oAuthUpdateAccessToken (payload:$payload)
                        {   
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '9eb52077-e26f-4314-ab58-8c54357b6f23',
                        clientId: 'a3f6b7cb-3119-4d7e-aee6-9a27724c02b2',
                        accountId: 'e07ebb41-2a03-423f-ab9f-8ca8684facf2',
                        token: 'Aperiam rerum veniam placeat non omnis. Sint aliquam nobis omnis enim quia debitis dolores quia quas. Temporibus magnam voluptas fuga.',
                        name: 'zl5iusnv3hvj28xmpdbt4ikrwdwlltgab2xi1kdph2if1vyd16fxk69fvz5jlfhwy9uzenv21vcegd4n563fw3bdxphz1vz9vbqq50zr6ukbg6e4z106keqn4eee8v69k41lhm695i9tatnq0w58omh7zixfrkvuaormarm0avuh58s6ck3phtqle7tlfw8inxnecop7ork1wvrk14n70gr6t1j65bve0ik62n9w87ysdkh5f854ewit0yfbezn',
                        isRevoked: true,
                        expiresAt: '2020-11-05 05:31:27',
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

    test(`/GraphQL oAuthUpdateAccessToken`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthUpdateAccessTokenInput!)
                    {
                        oAuthUpdateAccessToken (payload:$payload)
                        {   
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'f4e66c04-47f5-4ec0-883a-d7e7bb9a6a31',
                        clientId: '7a2328b1-c5fd-4059-b6fe-f6438fc8e87a',
                        accountId: 'beb15acb-e0b6-4cb0-bb59-3cae3016fae7',
                        token: 'Voluptas eum rem voluptates aut adipisci molestias et modi maxime. Officiis ea voluptate nobis. Et numquam ducimus maiores dolorem numquam sequi quos et consequatur. Quia praesentium illo ut laudantium iusto magni.',
                        name: '68p3jduqogbzhjal9o82berayd2umku7oted2ew5keejystdf1mus9i2jhko7om1a7zhuytkmzha2uedpvx4yekll2wn8g8zor5hj3jjyoz78gfxb9cqq0unac063watcxyxzyeipe8bynwpbip6r0bomcm63yxnivym9vrlvn1au31ndogyz1gsnxllflu9u9a1e2lv1iq8r54yo7evi8p4kbclvittusfmriiqubozpc7jpuea3788iw2k3lb',
                        isRevoked: false,
                        expiresAt: '2020-11-05 14:07:25',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateAccessToken.id).toStrictEqual('f4e66c04-47f5-4ec0-883a-d7e7bb9a6a31');
            });
    });

    test(`/GraphQL oAuthDeleteAccessTokenById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteAccessTokenById (id:$id)
                        {   
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5ddef7d1-b3fa-446a-b7ed-281b7aee4296'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthDeleteAccessTokenById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteAccessTokenById (id:$id)
                        {   
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f4e66c04-47f5-4ec0-883a-d7e7bb9a6a31'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteAccessTokenById.id).toStrictEqual('f4e66c04-47f5-4ec0-883a-d7e7bb9a6a31');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});