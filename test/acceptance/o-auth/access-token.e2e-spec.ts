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
                clientId: '5260a4cb-39cd-44a8-a675-971865a85042',
                accountId: '1763e7a7-9c5e-456b-abb2-d21fbc1ce73a',
                token: 'Dolorem quam est illum magni dolorem. Voluptatem sequi qui praesentium sunt fuga quia nisi libero. Nobis hic soluta amet sint ullam sequi voluptas. Quibusdam quos doloremque. Qui sequi voluptatum.',
                name: 'fuvevlgczclhoeegeh2ywaneqkng6clx4bepyc95a8yaepcxul1jm52zwf5zspvwxj3yg4oka8yjn0zbipgqf09vlpz63o3ya0mgv8wzqu7ck6of0n8rvy9vziy0hedh8zfo90yf3wmigmcvg7467ve047d2svwwagmp50eva64vmvw36o512j3orgevfqf3lhw9nxoh1wpal6ou0mnntj5rwol4mr31edxwwu481jqlbk23beqq1bn0qzckr1u',
                isRevoked: true,
                expiresAt: '2021-04-14 18:48:27',
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
                
                clientId: '5260a4cb-39cd-44a8-a675-971865a85042',
                accountId: '1763e7a7-9c5e-456b-abb2-d21fbc1ce73a',
                token: 'Omnis consequatur dolorum debitis minima minus nesciunt corporis. Est fugiat amet. Alias iure sunt voluptatem voluptate quaerat voluptatum ad voluptatum. Quae veritatis ex dolores temporibus et possimus laboriosam rerum. Culpa dolorum nulla dolores nulla quia libero est est.',
                name: 'ggqctk0umey8hwr7u6n9djwz9yex54ne9rew6mj18s5yqt65qguwikudyllyh7ye467ocr7ok737nwfbwbgwzbl4i42sgvcq0cs3pcgzum4nj5ubtj6etqrjriqzkokw4kgqytmcohu50yz9zszvh7w44c88km0wsikamk1aynfttfl9qg84prrfawrb8fev2zs13ed0fzj4uv21kj6poliskmkxk7ppz9sb3ae2uzbo0hwvr1ybagso4dzv61y',
                isRevoked: false,
                expiresAt: '2021-04-14 06:33:19',
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
                id: 'eabc7c89-93d0-4f9d-9ccf-f29a168743db',
                clientId: null,
                accountId: '1763e7a7-9c5e-456b-abb2-d21fbc1ce73a',
                token: 'Consequuntur ex enim ipsam dicta qui non voluptatem. Sint nisi temporibus et nulla. Eos laudantium aliquid nobis et distinctio. Suscipit deleniti odit at itaque in fugiat. Soluta unde earum delectus officiis exercitationem et non omnis cupiditate.',
                name: '188udex130jdez3jx42x7o5vkhte7rw5e8rajtpzlmp2znjx047pkznvuby95tshewml4y2vv1uhabpwosx38jkrc3iuzmm5nnkvef8z2eux8rm8sngsvr3bkf2zw17nvgiqjy8tq63306rcyyym2al7wtqy3xry7dkg3v4hbowqkwucbio83z60idm4nwd6nzjo7stan7vqbr10pqxv8i5gd5d0jculqrp2ou9unyzcvodtqcbp2t4hxv2ybbo',
                isRevoked: false,
                expiresAt: '2021-04-14 02:47:28',
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
                id: 'eabc7c89-93d0-4f9d-9ccf-f29a168743db',
                
                accountId: '1763e7a7-9c5e-456b-abb2-d21fbc1ce73a',
                token: 'Explicabo debitis fugit beatae velit veritatis quos mollitia officiis. Ipsum a blanditiis qui velit sunt sapiente. Assumenda blanditiis voluptatibus veritatis reprehenderit. Ea fugiat et eius officiis cupiditate rerum.',
                name: 'qydue4elglciypcijo4mxr0aoh23xtsht5o22v325o1lczg7wwfgtyjyeaa36xz78tm2dll5cj96kjlfy2hyvuc0o9e8gj6rb8t7pnp0bzu1emyky52bxys0xu0ie016oyk5jgqg26f06yp7lvpxw3ihop08ifc640fgf4359in0rzlfjbxbncxg5sha9dtnyl9qak9wbelngy88kfjshgseeceon0e6oxql2n6skjdzv6mm9djyd0z4gcsblce',
                isRevoked: true,
                expiresAt: '2021-04-14 01:15:44',
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
                id: 'eabc7c89-93d0-4f9d-9ccf-f29a168743db',
                clientId: '5260a4cb-39cd-44a8-a675-971865a85042',
                accountId: '1763e7a7-9c5e-456b-abb2-d21fbc1ce73a',
                token: null,
                name: 'qmkhmjh70ibtgayjsdja8qkawy5ash0ml58gt50s4dxypfw7crqc8kapo6rgkahrhknxawb7me2qut9ku35rwtobme1p8395bmolultxd65g9w238tw799rdri4u2i8qvltodovn5t7lc9adurpj3hmnd4oje4a184dttyzkicqsu146950mnesm823zq59r2gyawoq8hsrkjnz5i2500yd3j5d6vgpkd9gphpf88gs5ugkj9qw174mku34ri5i',
                isRevoked: true,
                expiresAt: '2021-04-14 05:27:20',
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
                id: 'eabc7c89-93d0-4f9d-9ccf-f29a168743db',
                clientId: '5260a4cb-39cd-44a8-a675-971865a85042',
                accountId: '1763e7a7-9c5e-456b-abb2-d21fbc1ce73a',
                
                name: 'q0hhfcqqpnje9vur5161unhx56v5ohrquvx84mfkl7mr9nm6mw3d0ceh1uefxciiobbygdm1i2zb4lowihf9g0w10g3x8rv0v5d2e0p15exrkoj5au6sat4ojvj99pzr8rotndjiikgtmzbc1cixkfhk303886nricz9s74entzpwkw8mzfgdd4d7917iho6t4uzvtf54jzyz2rx1j7c9n1dwnfzqdn7pgriuqnkdqg16sjf70td5fe95gi33ar',
                isRevoked: true,
                expiresAt: '2021-04-14 04:43:01',
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
                id: 'eabc7c89-93d0-4f9d-9ccf-f29a168743db',
                clientId: '5260a4cb-39cd-44a8-a675-971865a85042',
                accountId: '1763e7a7-9c5e-456b-abb2-d21fbc1ce73a',
                token: 'Quae et tempora vitae atque doloremque. Iste odio velit explicabo. Error minima vel non magnam alias magnam. Repudiandae sunt labore quam cupiditate et est sed. Rerum expedita nemo optio sed et qui.',
                name: '9t2ealwu6b5mshdopc34tqo7vzp32kdp17nivoxzbb2pifgv1nwf9wvq5b72qgoxb6b73897zzkxeybyfltdnuuuvn3buyv4gzeh8jhwrw1rs8sznhvr1m3ipao39i1oikz1l0vlvucgmt9p61dmm4reu0jdnj9q3nmo3w24aqfo426vuaskcjpwx0icouvs3a6n81skx4gqfx8fg9igzv2ypd1a2c7lf1wrmmvz4ivu2fdfkqj0c3iovkqhyie',
                isRevoked: null,
                expiresAt: '2021-04-14 04:19:40',
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
                id: 'eabc7c89-93d0-4f9d-9ccf-f29a168743db',
                clientId: '5260a4cb-39cd-44a8-a675-971865a85042',
                accountId: '1763e7a7-9c5e-456b-abb2-d21fbc1ce73a',
                token: 'Nihil optio dolor quos rerum quo in totam provident animi. Rem deleniti commodi adipisci non. Quidem iusto dolore et maxime dignissimos quia similique eos aliquam. Nulla quaerat natus facilis. Ducimus dolor exercitationem autem non quam molestiae ullam. Distinctio quo aut.',
                name: 'g19k3iiws3osogjoani9bs897kw3qm1kf7rmybzot7gshnlsl61n7qklmkx6l1zmtvdu6es6z74ccq8ut355l6vox0iinwxwxpkzs1wozmnmrn1984vldu5tsk2ivcodu1isnow7m1amyzuwy791zo4yal3pcxqo4i5dw25vt5d1qt78pn5ckkn0b4sb2flimjz9wo19c00j23fzrsxxlzru9wxochaihbssxt89n7k6ksnp3y3j1hyxqlvohl4',
                
                expiresAt: '2021-04-14 17:53:51',
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
                id: 'rihwc0oteiytcagvan5q8e6a9mihrqybv15k1',
                clientId: '5260a4cb-39cd-44a8-a675-971865a85042',
                accountId: '1763e7a7-9c5e-456b-abb2-d21fbc1ce73a',
                token: 'Aut rerum aut quo saepe. Modi quos excepturi. Cupiditate earum facilis dolorem. Qui ducimus excepturi illo.',
                name: 'cqn1cofdyuemki9qu8thg0r0gfus67kpwh7b76x8so7ae9ybr1zavy7ywdojkyfc45gyry7ef1gc816bh8c5jq988exc1dj66jqf8x4r3jqykssefxgjswc3moljlmep7dpc2vzlkxsfnj4i6ldu69xtzhooet06lotq6xv3ciky77rig8b8m1k9361sbyfep2yxhs6kv6xe3n2nvscbad4k6n7pyb8h3nhucj8i9cs2o0vmdx09mb1vh5dre5s',
                isRevoked: false,
                expiresAt: '2021-04-14 20:37:48',
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
                id: 'eabc7c89-93d0-4f9d-9ccf-f29a168743db',
                clientId: '6ylep9k953scbxnwf67bqp0lp2kix6l0uetf5',
                accountId: '1763e7a7-9c5e-456b-abb2-d21fbc1ce73a',
                token: 'Quibusdam ipsa consequatur dolores magni ut. Atque alias voluptate quis inventore enim eaque. Est molestias accusantium voluptas quos voluptatem aut quam non.',
                name: 'uttbos1trw7lop6ba5azuo4yp201nteu8tvyo8lomu4oa5fxpy9jfmzh5x2bmwm1jkera78pmv6wnpl9z1m8gks7ml19qysu5kp006r8ejl9o6e18zkw7skytlfgo7v9qdjzopkg5looa27dxs4b16b0idi8mv6xsdvo5u1eyaum8q87wm6k8iy5nannl884nkfsaskcl59v0jeujmscdn1tbunyffreg44gpiw531f55rjys9cjv0yoe6xa3z8',
                isRevoked: false,
                expiresAt: '2021-04-14 05:27:34',
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
                id: 'eabc7c89-93d0-4f9d-9ccf-f29a168743db',
                clientId: '5260a4cb-39cd-44a8-a675-971865a85042',
                accountId: '8s3ri0861lu00slit8am4eiz0bvn0r0mal66c',
                token: 'Consequatur nulla sunt. Voluptatem ab commodi molestiae. Omnis quibusdam aut tenetur sint sit ut. Ut aspernatur quod est unde modi eum.',
                name: 'md4r5ytpgakf49kvn9qqi36npx2u0kofu33ok47e50r02aip78tjjp99dbuw7wpjjq51za2rwddq36n31ajquctyqdrmdcx7pkl4olq4i0nsna51pyts69w5iptje2q3ltpkojbuvmxv7gfkgxmed9ek9l4exh5uf1mnfkdbsaafyl5obmsq0nqmb1osj8r7w1xppzulxve5x67wu0sveau8jbms261zxb9cmd17hma5dpee1mphrnqrxirt2nj',
                isRevoked: true,
                expiresAt: '2021-04-14 10:40:43',
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
                id: 'eabc7c89-93d0-4f9d-9ccf-f29a168743db',
                clientId: '5260a4cb-39cd-44a8-a675-971865a85042',
                accountId: '1763e7a7-9c5e-456b-abb2-d21fbc1ce73a',
                token: 'Sunt deserunt est molestiae. Reiciendis aut aut amet dolorum et. Minima aut harum id. Aut dicta temporibus cumque eligendi. Non animi voluptatem dolore qui tempora blanditiis. Dolore in quia rerum est tempore.',
                name: '9riffe47m9nmf9h761dsfbii19ngyzvly8a4xe6lkxtoncf8robdwoknp8q2ogkuwbhkyrm742u1a78k8rx6ld1uu88srr236ktdn60rx703zz46pnhku0rept2red9cwz2v9gvcgmk0ro6f24iv2feolu8n8s7fqmpbtt32cbgzu6dt06asdgmssonlaj4u9ks8gf40vtm7mzqidal0br9ewarb9zicnlcowcfgodxk86q3olhe1q51yyqof6ea',
                isRevoked: true,
                expiresAt: '2021-04-14 20:49:21',
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
                id: 'eabc7c89-93d0-4f9d-9ccf-f29a168743db',
                clientId: '5260a4cb-39cd-44a8-a675-971865a85042',
                accountId: '1763e7a7-9c5e-456b-abb2-d21fbc1ce73a',
                token: 'Velit quia officiis a illum nobis tenetur. Impedit aut voluptates quis accusantium nisi odit. Sed voluptas provident et dolorum. Consectetur doloremque libero voluptatem facere sunt iure nesciunt. Optio fuga voluptatem. Consequuntur amet occaecati tempore.',
                name: 'wtwp6gi2t3jamafsfaqlogq3b9mnbuw0pul1r6x6i4thmjxjuzg23mb0wbg5qso92p3obb07ne043yvab8axb2a55duyk3t2gxetjuehcewhh4hb83q4aes5v324qlvzt1j899mdqxenyhwxnyt95qdre6ey88imjkpo98kswb87fupg3tswyid6lwnf6ltuc47j7e49im1ndirltm9ishj93ujqvbxy72srvk187ssgotpx2d9n57l31os9n5q',
                isRevoked: 'true',
                expiresAt: '2021-04-14 09:46:53',
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
                id: 'eabc7c89-93d0-4f9d-9ccf-f29a168743db',
                clientId: '5260a4cb-39cd-44a8-a675-971865a85042',
                accountId: '1763e7a7-9c5e-456b-abb2-d21fbc1ce73a',
                token: 'Autem aut debitis dolor vel aperiam et quia animi. Ut quisquam aut commodi et sit dolor aut eum pariatur. Rem dolores debitis iure odio. Modi totam repudiandae aliquid vel modi est.',
                name: 's7w784bnzn3fexz7n6jkya8l6zbemcyrvd16tlja46a2czes31meamtr9o92p13v2sjo46n5zfuhvhwcyfm2pwhsbb2nsf94r9v507csriptlsatgkvrlrooga77lfh1elfpujt98uwur1qif7lrkbyam6fzak973r7p5k8dxyr0t0yi6gb525yvfuqrd7wuqs0pnubzxa6vt91pak7oukxwvtp6obm2zbrdwkesd2ybx6llg9at5dl95ht39ct',
                isRevoked: true,
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
                id: 'eabc7c89-93d0-4f9d-9ccf-f29a168743db',
                clientId: '5260a4cb-39cd-44a8-a675-971865a85042',
                accountId: '1763e7a7-9c5e-456b-abb2-d21fbc1ce73a',
                token: 'Possimus ducimus cumque facilis iusto et. Nostrum asperiores dolores odio voluptatem cupiditate alias aliquid. Maiores id adipisci iure eum velit veniam maiores earum illum.',
                name: 'd5lebdxoa9iq49ilqz54zyc8jx604lsc2v09sa3j1ojjytiizhya0u39k6rw0cocbyivnuuviqkdammxd5oltzx0tujqjm7q5gu7wab6vg81rwitmsmkrcavqr9z923r08ny4d4ipy82ejogt3fshlcq6ehydgb4l4t9j380k2j7mysmielufzdzbn7u3x4dricxs1q5t50skyvnozuneuwkasllru20eis8acx3xqzk2zs4kca45hmq420oc1o',
                isRevoked: false,
                expiresAt: '2021-04-14 18:59:20',
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
                        id: '5a6c9e62-c610-45c5-a306-c30e2e99105d'
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
                        id: 'eabc7c89-93d0-4f9d-9ccf-f29a168743db'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'eabc7c89-93d0-4f9d-9ccf-f29a168743db'));
    });

    test(`/REST:GET o-auth/access-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/4e2f0186-99cd-47cf-b627-49f6fd6416d7')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/access-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/eabc7c89-93d0-4f9d-9ccf-f29a168743db')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'eabc7c89-93d0-4f9d-9ccf-f29a168743db'));
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
                
                id: '0276e490-4eed-485b-9016-99950feb8665',
                clientId: '44c2f0d3-2af6-43c4-b11f-40f2daaf836e',
                accountId: 'f8fee920-9b76-4f76-ac27-2d2386b07461',
                token: 'Asperiores saepe porro voluptatem enim quasi quibusdam recusandae ipsum unde. Blanditiis et perspiciatis perferendis reiciendis molestiae est est. Ea vel sequi blanditiis. Quisquam alias enim maxime atque ut sed in. Voluptatibus quos animi officiis itaque qui.',
                name: '6zc2420nm7v46yj2ve6gdoji4mtrq3sed3vqqn3zcpurpm6lfkusmczhvszs8mkpn9t1sl7vaiypp9bh7a5iuzzjk5gfqwxyekm5jwjh4df6rfpvfghcq6yrqidw4xn1dutxyiy6babs2rqi1uvn993m43op8tzhnhcwatrj1yag19q3nj0rnk3b2yaw7unoax91trgx6fsl9qarnpzn7327t8g5onx6jdjx22qo6m9w930shz3ab5bws4b0nb5',
                isRevoked: true,
                expiresAt: '2021-04-14 15:18:08',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/access-token`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                
                id: 'eabc7c89-93d0-4f9d-9ccf-f29a168743db',
                clientId: '5260a4cb-39cd-44a8-a675-971865a85042',
                accountId: '1763e7a7-9c5e-456b-abb2-d21fbc1ce73a',
                token: 'Atque iste aspernatur ut reiciendis aut velit repellendus repellat. Expedita at est sed. Dolorum ipsum vel provident aut qui tempore dolor laborum est.',
                name: 'kv7tzlajw4l5ly8qany70smj6iibrxxdkwk07768so7lpz6f4hddtexhpbjodl2rd7kh3ydmn4q0gur8wtwzlm98q5aiss7xbhllmjc8slx7v6e266t12j93y7ezp2lwz02tswxcb98fj5ramer4pk58xpwxgtbeml7qg1vr80f5r6h7muhlumanp9aiz3osdvwzqku3sjfc30yge08ljy18i34q7xvud2zi6uhn3xdsznmjeb3px0dgpd7fwus',
                isRevoked: true,
                expiresAt: '2021-04-14 20:54:42',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'eabc7c89-93d0-4f9d-9ccf-f29a168743db'));
    });

    test(`/REST:DELETE o-auth/access-token/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/585e0099-377e-4a3f-b55e-1f994bfb0ba2')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/access-token/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/eabc7c89-93d0-4f9d-9ccf-f29a168743db')
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
                        id: '4def5206-2672-4a33-8724-2d5bbf04e09f',
                        clientId: '5260a4cb-39cd-44a8-a675-971865a85042',
                        accountId: '1763e7a7-9c5e-456b-abb2-d21fbc1ce73a',
                        token: 'Magni rem ipsa voluptatem libero voluptas odio nesciunt. Rem placeat minima quidem qui velit ut. Aperiam itaque quia rerum optio nihil deleniti consequuntur ut. Reprehenderit exercitationem ducimus nihil sapiente maxime consequuntur quia beatae vero.',
                        name: '0555b9xxf4y9g1l9tivg7m508i32k5djqmtp0sqy56m6n61sfvms5mliv4bbsvou2wbazbdonak13kcmrg7c45ea3ewvzt0efek0rajbc9jhh5r6p7old8mod6rlfgz3tw1obbhk372fe4o26jlfobjlv0m0w0r4t5nos5achr3etb826i53ed7e9d7jtyjc7topr9a32l0p6mejaryn9hxf7fje1pheegu55zbda64nyrphswkaigohddolv5a',
                        isRevoked: true,
                        expiresAt: '2021-04-14 21:35:03',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateAccessToken).toHaveProperty('id', '4def5206-2672-4a33-8724-2d5bbf04e09f');
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
                            id: 'e3cd4c04-d680-41d3-8493-a70eb7ab0c6a'
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
                            id: 'eabc7c89-93d0-4f9d-9ccf-f29a168743db'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessToken.id).toStrictEqual('eabc7c89-93d0-4f9d-9ccf-f29a168743db');
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
                    id: '0d383fc4-f99d-48cf-aa35-6115b43b6749'
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
                    id: 'eabc7c89-93d0-4f9d-9ccf-f29a168743db'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessTokenById.id).toStrictEqual('eabc7c89-93d0-4f9d-9ccf-f29a168743db');
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
                        
                        id: '17f8b7be-2c6c-4b00-a4c8-716f3d57fc66',
                        clientId: 'fe1ae4fd-7a52-42be-9c68-79e2536ed93a',
                        accountId: 'c601c31a-2b20-4734-b308-1e3fd46f7286',
                        token: 'Nobis soluta omnis et numquam. Ut aliquam voluptas temporibus excepturi ab aperiam asperiores velit. Qui reprehenderit sequi. Vitae eos mollitia debitis dolore. Delectus doloribus voluptas iste earum explicabo laudantium. Id sint sit veniam.',
                        name: '3pjzbsa82ls929ct9aympkdennds7z1dwzzir70fw3o6p1prse59eg6lr5c28u7o7o506f3hfembxdwmtldetarjs0uubcupcdcpe7gi3twyv6yxnbak81ponz8o5c9jwzc8jq1lz0gd37q9tmdwazlsvnaln5wbnb7s1xqm7ympur71gybk6dvtn5q8rviiu3aklruyj9zabca1kul48gaae3fneq5wqbqdh3ky9hoenqa285mt35kw5ly6l3g',
                        isRevoked: false,
                        expiresAt: '2021-04-14 12:30:51',
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
                        
                        id: 'eabc7c89-93d0-4f9d-9ccf-f29a168743db',
                        clientId: '5260a4cb-39cd-44a8-a675-971865a85042',
                        accountId: '1763e7a7-9c5e-456b-abb2-d21fbc1ce73a',
                        token: 'Rerum qui consectetur. Quam ut voluptatem rerum voluptas minus provident quasi nam. In sunt voluptatum facilis architecto. Et ratione temporibus aut. Quia ut nemo neque necessitatibus voluptatum minima tempore.',
                        name: 'w6twh3dakx86c6zs7pba6m0qypv6mqxjpem7jh5rsdqjha6m8shosuap86q2jaxk4vnuu4uorfmdlbk1jvsocbjir3itxsemevcmgd60yzlwk7t569m5jtx7fzu58ptcm301z06moiy0d0ivenygcnew6wsy0l0zsa9wda35x4p9fm0qkdexzfyikx4zn9fjzsyl42507ll2d0b6g4tcxpm8ry3nsaujupqrx3v08glau0yrnttx2k6yy6xyn9n',
                        isRevoked: false,
                        expiresAt: '2021-04-14 20:13:56',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateAccessToken.id).toStrictEqual('eabc7c89-93d0-4f9d-9ccf-f29a168743db');
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
                    id: '40c8b90d-d03e-497d-b645-4275b4d37bfc'
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
                    id: 'eabc7c89-93d0-4f9d-9ccf-f29a168743db'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteAccessTokenById.id).toStrictEqual('eabc7c89-93d0-4f9d-9ccf-f29a168743db');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});