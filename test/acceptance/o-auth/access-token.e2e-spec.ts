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
                clientId: 'dae1fe6c-dc97-44b0-9d8e-f32827a4dd62',
                accountId: 'd7d703d7-5d61-44ed-94d0-9a36ca8da6d5',
                token: 'Praesentium nam ducimus eum id enim placeat. Dolore neque sit esse harum aut aspernatur libero harum laborum. Est mollitia cumque aut. Doloremque voluptas ea voluptas incidunt et illum. Cupiditate voluptas perferendis voluptatem quos quia recusandae ex dolorem. Provident numquam voluptates repudiandae deleniti dolor quasi.',
                name: 'xsln4779tsre1t1xybqdjvubzxfzr4w67s7ichmfkrw4ribkyx5wkml1ps4qlvoulvyfbv3gsgohta8ndj6oc6y28f3190rvqr1ozzjqc5qpm78295izvymvu0xc7cn2p5js86sv97m61qp1ywxafknkezc0ky2vuwuacy4ifeqh0b3t0s1cyar62gwsf299911jjc9jrfcqyc0nzonqlejscq8inpz3v6eatfbh0rgs7jhcjd3wsc14in1dqd0',
                isRevoked: false,
                expiresAt: '2021-04-14 03:07:17',
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
                
                clientId: 'dae1fe6c-dc97-44b0-9d8e-f32827a4dd62',
                accountId: 'd7d703d7-5d61-44ed-94d0-9a36ca8da6d5',
                token: 'Libero ut veniam mollitia. Vero nihil ad voluptatibus rerum. Dicta ab odit occaecati repellat iste hic eum est. Porro rerum harum ratione ut. Occaecati minima perspiciatis reiciendis et.',
                name: '46ej6pt65e4usrogm9qnbltif382zgirqswzt706qupw0cehqzusenmkeoonooyz4j18p4jbjtlrh5ggyw21j8sj03vwuina89an495ijnnx7a93xtbxnrw444y8z760kw4qa0l9ppqqfunpb46z2awxuvivbd6rsfqo6qe6lqcj0gq7ofs20kajuhtrxs3ucc735mlr0f9nhjvzq2wl1s88qi9l9u2vtn47nmgnivfer6xm1e8s4owohoaiu8c',
                isRevoked: false,
                expiresAt: '2021-04-14 19:10:41',
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
                id: '6e98ba3a-1dcd-499d-8ffe-6a6b079388d8',
                clientId: null,
                accountId: 'd7d703d7-5d61-44ed-94d0-9a36ca8da6d5',
                token: 'Unde quia dolorem consectetur quam illum facere provident. Voluptate dicta aperiam explicabo in cum vitae aut praesentium doloremque. Quaerat odio aliquid impedit.',
                name: '8nc4p46fma390nx39pwof68y7970w4a5al7cz1vqlkgc5xcn0d84b7ehdzzlt8gxzyfixkr23e35tn8ztm3t6wqh8dqgl0l5vikag3i0f8j9plumgf5u2bvngzf1ue9njdgz5g69in0ntecgp0zvkth07xftqpsa5qud9bckilzjblt4vwsimjorqz77mmiuzb56gaov0hn1itzhgxgsqy7zpomwhf98g3oneglyvmi39xf5rokuwhi7mfzwfnl',
                isRevoked: true,
                expiresAt: '2021-04-14 23:39:27',
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
                id: '6e98ba3a-1dcd-499d-8ffe-6a6b079388d8',
                
                accountId: 'd7d703d7-5d61-44ed-94d0-9a36ca8da6d5',
                token: 'Et omnis eligendi ipsum. Quo est quia et commodi vitae non eveniet. Dolor adipisci explicabo omnis tenetur optio. Tempore nam cupiditate quibusdam commodi quod aut eum commodi eligendi. Architecto et occaecati eaque sed alias. Dolorum ut voluptatum qui nulla suscipit.',
                name: '8696qng4kc7q2flj2a39vhgwrvf1l6qcc80s7r7uetnqvkamblfcv44156n813dj334bvp6an6zhf5h1tz8ghs7cvdg6od7g6pqqelmwfrbyitfaern326nqbn9ygre4esfxiymnbhqd3qgrktq53simo4lb83zv6782d2mgn2ltydlxd0f26iv2eavgcbe0dbc4oclykmo6gxatfyo0vlh5gnjynbtzvnqyjkk7wknl8px4ho6dpa5u9zphws9',
                isRevoked: false,
                expiresAt: '2021-04-14 20:03:03',
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
                id: '6e98ba3a-1dcd-499d-8ffe-6a6b079388d8',
                clientId: 'dae1fe6c-dc97-44b0-9d8e-f32827a4dd62',
                accountId: 'd7d703d7-5d61-44ed-94d0-9a36ca8da6d5',
                token: null,
                name: 'm3b415o58qb2tjvoa6ht8necaye9gjgd7pcw9phc4ryib26gk3c3h1x4ugi6fqcc70c8pzaerg5g6bwvw7nd9wkpm8zgtkoi0avbmron36dalimyvl6isy1xqcj9g1vjdbaq4zbmcgomu4d663aeby849hj1rqsqme1blwukb9ted74oo66f32flpjxts3fa2yrcezvxbl902e008i908udjp0m2yqq4jxcufgm10cyus4uis06ekjwjfex8kpu',
                isRevoked: true,
                expiresAt: '2021-04-14 18:17:48',
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
                id: '6e98ba3a-1dcd-499d-8ffe-6a6b079388d8',
                clientId: 'dae1fe6c-dc97-44b0-9d8e-f32827a4dd62',
                accountId: 'd7d703d7-5d61-44ed-94d0-9a36ca8da6d5',
                
                name: 'hs7anj8s51e31cdghbvmuhkv73yv7rve75kho5w3h10lpgd0m7a1jyrqecwp61kav8ow6b5v5h95bkv7drz2owxi0y23vy7u8bj0icc8a7q07b29cqx2k3wjoxlvy6pmmnjvhku4a32g0n54j4pagz8xie872qwx752euka5b19m1x6jt93ezjde7whznlg9h8a0i6l4j4cwr5aqcnzycf9jn3mojnltug7muoawwfyjjy1vh1rtcx8t1ebzs9s',
                isRevoked: false,
                expiresAt: '2021-04-14 06:39:11',
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
                id: '6e98ba3a-1dcd-499d-8ffe-6a6b079388d8',
                clientId: 'dae1fe6c-dc97-44b0-9d8e-f32827a4dd62',
                accountId: 'd7d703d7-5d61-44ed-94d0-9a36ca8da6d5',
                token: 'Maiores vitae ea ipsam ipsam voluptatum corrupti ea sit. Qui enim ratione molestias corrupti eos nihil vel ut. Eligendi nisi voluptates fugit consequuntur ea animi cupiditate voluptas sapiente. Voluptatem officia id architecto deleniti. Unde debitis officiis assumenda odit itaque repellat. Quis at ut dolores rerum est eius.',
                name: '0smpxuqal1v3pmhb3r17vnfnd5s3wunpo4nth2zcm0eidf0ovudx9y6zwnil52thuae4rldpodwm8x9918ol8zfs6nim3ukgw3h2s4umgjpk4yb0yfioq3y9aoazzypl7ucgfi81wsgimimfnz9xy2x9rvbgyanmz9709b676xr21327u8d8snh7wgqokps82eq9ag5o26yk1e4x5m271oilqtca1mzh6tx9sl5arbc43ofdjxba4549uk9cx81',
                isRevoked: null,
                expiresAt: '2021-04-14 09:08:43',
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
                id: '6e98ba3a-1dcd-499d-8ffe-6a6b079388d8',
                clientId: 'dae1fe6c-dc97-44b0-9d8e-f32827a4dd62',
                accountId: 'd7d703d7-5d61-44ed-94d0-9a36ca8da6d5',
                token: 'Ipsum ipsa officiis magnam. Culpa autem omnis ut architecto consequuntur. Adipisci aperiam dolorum.',
                name: '0rbxck94zxdprhoxb4darikrvxjcwce4x5j0p1pe6hxe2soxztyrgo2k9fghsb1ltrda3l8ckrtd8ak497rba9m4e5aj8lutopntp6lnriugga52zlqqn2k0n65iebkuvxzhnqyj9b4qg739kzr8kf7plb6ydvpxyvt4rvgo2atmx17e0kmvr71hzgm0k00p9in2e3ghk0fnaej1p7aadpm93z22tx7v0wk9ld9rbk2idkcnh6rj652byz0h104',
                
                expiresAt: '2021-04-14 12:59:02',
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
                id: 'pusjyk3vp2ib5t8ojwfkli4w5x8caojk55lk5',
                clientId: 'dae1fe6c-dc97-44b0-9d8e-f32827a4dd62',
                accountId: 'd7d703d7-5d61-44ed-94d0-9a36ca8da6d5',
                token: 'Fuga dolorem atque a iste provident odio. Tempore recusandae eum inventore. Laudantium eaque dolor quam iure rerum voluptatibus sit eveniet tenetur.',
                name: 'sy4z7oyr0l9ydawm6re19dw32ufkij9yvv40vsj6og0c2coe0yji5cwiun19uwaoe9cs49km2d6chaehpaeuk3928mivtsnzusekhf6q0rn286ollc5jajs1uivndxnc6oazwyzk22tv4qf04s1u8h17pcuk3zt5ghsav1d25wb1sklhq6nuf4pb04nhnvepzcgxulopqai3wf5ddb3tza3flxritj901ia3sskktyfhtqrrial10l2xore04zj',
                isRevoked: true,
                expiresAt: '2021-04-14 07:46:53',
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
                id: '6e98ba3a-1dcd-499d-8ffe-6a6b079388d8',
                clientId: '6vjt8z27ulq15074yotd5jf3sz9u2xj8c00mp',
                accountId: 'd7d703d7-5d61-44ed-94d0-9a36ca8da6d5',
                token: 'Iure sunt corrupti dolorem voluptatem et et sed blanditiis. Corporis molestias rerum architecto voluptates iusto et et sed. Eum earum sed impedit temporibus inventore veritatis blanditiis in. Officia dolores aliquid eos ut possimus molestiae error.',
                name: 'xw2rkkgjw4otzpnhv1lc58imt6sc34jrmt4jdxn1ukwdttcxikr5jbcnous2zr3wzivjwg85dmfkrarou9bzo72nlm05njmp981mgqbkq5dl2pfgh4vspi9bxdfem58ru38kjjm2k44w1mopnmjem70glf3cfdfhqm1u2to5tmttqvoqzvlj1wthng159g4jmfjhg1fyjnluf5jncqu1drqam7kjhvky9uskilz89v2o82cnh3ieqh81jyw8zak',
                isRevoked: false,
                expiresAt: '2021-04-14 23:07:01',
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
                id: '6e98ba3a-1dcd-499d-8ffe-6a6b079388d8',
                clientId: 'dae1fe6c-dc97-44b0-9d8e-f32827a4dd62',
                accountId: '84v03l0t7a8qeyp1rww5y3yqktcmsbi42qfnp',
                token: 'Modi nisi dolore necessitatibus molestias quae beatae modi. Quia consequatur occaecati maxime. Aut placeat expedita inventore eaque libero et. Consequatur ut recusandae quis. Et laborum vitae in in occaecati veritatis sunt.',
                name: 'q984twu7x4uhb4wa8614zb6v3rnd8l617prkhzn4hbjn3viy10ieihwgcxhuktl1h8kzj2l3muybcvr6qvfo2wj649egy9gupzywxpnsxo654jbtlmnrulvnex12qgczy8ldbl9a0nno6n2ponqq9tjiywp0vcxqut4wbksd7qisytcjsa1rdm21ta5rs5k1ewnjz13w0ssjq01vwewyhfrwl6a62aj6pcvbc1fm48zj23a3g7j2yz9zzbqrfi2',
                isRevoked: true,
                expiresAt: '2021-04-14 04:00:41',
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
                id: '6e98ba3a-1dcd-499d-8ffe-6a6b079388d8',
                clientId: 'dae1fe6c-dc97-44b0-9d8e-f32827a4dd62',
                accountId: 'd7d703d7-5d61-44ed-94d0-9a36ca8da6d5',
                token: 'Atque totam modi et deserunt possimus. Exercitationem corporis harum facilis enim molestiae. Ut sed autem et illum repellat consectetur. Esse quos voluptate delectus veniam velit iusto nihil. Occaecati error ratione. Odit aut labore ab suscipit nisi est ea.',
                name: 't0blypndctz1huguiq6rhxml4r3nc8lhvx9ec8t9tc7j1mx5dwrxe794vdbfn9j7j464787uyoqlcaos2xkjtauc9tyfn7rg6r5db5atd0jvxzwulk54ze5bthvfio6tz7dohvlwpryzacz77upc727xxuxoje9ar8i2nvhcizo2je8yzxpjwxutfbhr3uv689idkmknaztx3c3c33sheudxtdpskruv2rwnrqo8cxy0cbhjqck2sxqkwznllxkn',
                isRevoked: false,
                expiresAt: '2021-04-14 07:59:00',
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
                id: '6e98ba3a-1dcd-499d-8ffe-6a6b079388d8',
                clientId: 'dae1fe6c-dc97-44b0-9d8e-f32827a4dd62',
                accountId: 'd7d703d7-5d61-44ed-94d0-9a36ca8da6d5',
                token: 'Ipsa cumque et reiciendis. Dolore ea nihil expedita eveniet id a veniam. Autem provident occaecati excepturi et quasi quisquam voluptate ut. Assumenda minus ab pariatur velit iure tempore earum ratione.',
                name: 'm7wvjf7lpw5o0o0nimgimbr9rdv0z2ftowgff8yrqmuzj1u4thowv95nunsotpdyz3ibq8a37jrpekpryjhylygvq2eickgrhejlrel89no48tcvxi4t6a6yq3jpwu138xiyh159hsaewo4zz8kpb5jzktnrkr9en1y68v67wzl8z5h563560ic6q2zp283ewc878e25dp4r9vaoob2bq5k91h61zbcd3w0kikffif174yic17g7yjvyfctsxn2',
                isRevoked: 'true',
                expiresAt: '2021-04-14 18:24:40',
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
                id: '6e98ba3a-1dcd-499d-8ffe-6a6b079388d8',
                clientId: 'dae1fe6c-dc97-44b0-9d8e-f32827a4dd62',
                accountId: 'd7d703d7-5d61-44ed-94d0-9a36ca8da6d5',
                token: 'Qui consequatur amet tenetur. Distinctio sed voluptates aut magnam incidunt. Rerum voluptatum voluptatibus repellendus at porro fuga et dolorem. Qui ullam quia autem aut doloremque aut omnis. Doloremque consequatur quod nihil dicta facere. Dolores eum quis officia omnis et explicabo beatae molestiae quod.',
                name: '9dfkltrbqnzit459w68ozksdrrspu71d5e1m95x2n2m7my4pc2mohxvyktjbcrfnf34nyyxkjotrj8wtt3oo2v54x32rque7465or6yi2lybwmh50ro788v0teag60mi0uqauxnatgrglwi974fv0shug2galnudw5keb36cn5g2ucr6sefhaa7k10oyfzvbc3mg2je9indg5bdvt92ojhzxkmgr1h9x0gssd6j8w6315bqoric94ep2y7poro9',
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
                id: '6e98ba3a-1dcd-499d-8ffe-6a6b079388d8',
                clientId: 'dae1fe6c-dc97-44b0-9d8e-f32827a4dd62',
                accountId: 'd7d703d7-5d61-44ed-94d0-9a36ca8da6d5',
                token: 'Sed eum est quia libero nesciunt impedit similique. Placeat praesentium exercitationem saepe. Labore ipsa dignissimos deserunt odio accusantium facilis excepturi. Deleniti inventore enim ut quaerat.',
                name: '4d06halbf7dmtwz98eyksvfqjqpwsz2s2wtekgm6tourh1qmunr7z1c9jd04dmsuxspmln7wgjh58fhzccc2mw3n26l0ttdg9289hk9x1fn0o6b4uvpe6zf1lcaout9dsuti7ar5bonzps9nxdh4x72whbz2tnxtead8klwmfs9nnc2hs0t94alcxrt4iedbgzoas0phuumh6a8dbzwkmxi7qy62h6snmq6dlq2avx1np4zhr0q3s262gsjfp28',
                isRevoked: false,
                expiresAt: '2021-04-14 01:24:25',
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
                        id: 'a5bffc9a-00e1-4ce0-b39a-9cd61e545d33'
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
                        id: '6e98ba3a-1dcd-499d-8ffe-6a6b079388d8'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '6e98ba3a-1dcd-499d-8ffe-6a6b079388d8'));
    });

    test(`/REST:GET o-auth/access-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/1f8fc13f-a499-4cc5-b631-f0feb1c58a70')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/access-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/6e98ba3a-1dcd-499d-8ffe-6a6b079388d8')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6e98ba3a-1dcd-499d-8ffe-6a6b079388d8'));
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
                
                id: '10636911-9682-4093-ab90-0be5a55fbcc5',
                clientId: '3c2899dc-cafa-469b-af7f-b4975fe68362',
                accountId: '1d835dde-67b5-4de3-a26a-92ba0a5433e7',
                token: 'Rerum est reiciendis non laudantium cumque totam ea aut qui. Nisi aliquid nobis consequatur et aut pariatur labore cumque perferendis. Repudiandae est quod ipsa quasi.',
                name: 'jwf5sswfaeo7m8hchoy2tkk3c5uvph1cwbuxbvqjh25d0k7zmbe1mwzbjfr3cujyai4wmeu5mx5381kwuu3ohbj4cvjv2goklxtujhjui3070dmtcgc63v6qrcdvmq4sheky6ptn8c5s6qkjwgvyx4n2delqd1nclilie2fqkg1mcmfs9fc002cznu1mwpesxeqpxlbp4ucuicjm44lh8776hxhyqb6u3dkkocnftyl544q52ycg8vmtndtrrej',
                isRevoked: true,
                expiresAt: '2021-04-14 08:50:21',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/access-token`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                
                id: '6e98ba3a-1dcd-499d-8ffe-6a6b079388d8',
                clientId: 'dae1fe6c-dc97-44b0-9d8e-f32827a4dd62',
                accountId: 'd7d703d7-5d61-44ed-94d0-9a36ca8da6d5',
                token: 'Ut et autem sapiente nesciunt eos. Explicabo est quo aut velit excepturi. Culpa suscipit voluptas nemo id. Maxime tempora et aut enim eligendi.',
                name: 'muj9072lvi0j4r8awzpo9n7dk2kv8u0lstntejjl04lk92wt6aooi5g86tboty5rbxnhudm1zpflwu7nsw2uydogysfup7byy9eqs2k0aboa3nopkkxs9levj2opghulcknx9xa59qw3u4h3jigv9hwlo8yg2fw9fr01g5dz3scezqvi0o5vniwkx8gkpvv7k45lewjjscv21rtdf1hidcyu5p5raizzrlfxgugi7djep32wyra3ekuoyqge3s3',
                isRevoked: true,
                expiresAt: '2021-04-14 19:11:19',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6e98ba3a-1dcd-499d-8ffe-6a6b079388d8'));
    });

    test(`/REST:DELETE o-auth/access-token/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/87f480f9-1861-4bc2-94d3-6b699f837200')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/access-token/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/6e98ba3a-1dcd-499d-8ffe-6a6b079388d8')
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
                        id: 'befbc100-5d16-4a1f-af09-a1b32c5102f1',
                        clientId: 'dae1fe6c-dc97-44b0-9d8e-f32827a4dd62',
                        accountId: 'd7d703d7-5d61-44ed-94d0-9a36ca8da6d5',
                        token: 'Ex dolores velit magni. Corporis ut illum. Consequatur atque ea quasi et voluptas et magni ut exercitationem. Tempora quasi eos saepe sunt. Rerum eum et porro provident.',
                        name: '3r4xbwhfsvnmfkbswn2nqfpimqu4eu1cgcvqv2i3uyfm2t673bu0c3srs0vw7fe8zu47g510u7np31cq7jdhjokt4kh7a0t7oo62dlztwbxnj79j384gzgiorzy45ry4txc9d8u7vbbrlnlm72hqtohavypelfmc3wev3gxwurvmy2p6mk2pebt4so4gl148tdtcrodj8ngsyalepuvd53hbi61rcxwp2sa8bs713b1biac12svaersm6fmztqh',
                        isRevoked: false,
                        expiresAt: '2021-04-14 11:53:26',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateAccessToken).toHaveProperty('id', 'befbc100-5d16-4a1f-af09-a1b32c5102f1');
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
                            id: '2c2a130c-44fc-4646-a329-9a2e2bd8c5a3'
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
                            id: '6e98ba3a-1dcd-499d-8ffe-6a6b079388d8'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessToken.id).toStrictEqual('6e98ba3a-1dcd-499d-8ffe-6a6b079388d8');
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
                    id: 'b913dd7a-eca5-4dcc-aa65-51c5c697675c'
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
                    id: '6e98ba3a-1dcd-499d-8ffe-6a6b079388d8'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessTokenById.id).toStrictEqual('6e98ba3a-1dcd-499d-8ffe-6a6b079388d8');
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
                        
                        id: '1996837b-8d01-4e13-9329-e6b06a96fc79',
                        clientId: 'bbe9606a-2dd8-44ab-b76c-217d0b78ae2e',
                        accountId: '39d39d3a-55ae-4a0e-b594-a3bd1a70ae9e',
                        token: 'Qui aspernatur amet. Quia rerum amet possimus fugit aliquid et. Eum cumque velit cumque dolorem molestiae accusamus aliquam aliquam.',
                        name: 'ku2uwpg99s2oij9tnca8qciienm9atlireti7nz7q618taerwwa2x2dad9glhm91xy1lh0qq6z06yzk3wibog08fp83mlu6jzvlsb5dckd3myua6v204hnrbzui81jlxdgqlw7la41j2ihk2urfyqz7lp205jhf4u1ono32ecc6x061xbw5nre3roykd84p21ojno7cd6iiki2fspky2c18mdn4pcnjkgjx9vrlxflcgq3vz871m9t5ejovm4og',
                        isRevoked: true,
                        expiresAt: '2021-04-14 21:56:42',
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
                        
                        id: '6e98ba3a-1dcd-499d-8ffe-6a6b079388d8',
                        clientId: 'dae1fe6c-dc97-44b0-9d8e-f32827a4dd62',
                        accountId: 'd7d703d7-5d61-44ed-94d0-9a36ca8da6d5',
                        token: 'Accusamus totam consequuntur. Eius pariatur ex sed laudantium. Maiores nulla molestiae sapiente et. Magni magni et assumenda odit tenetur nobis ipsam consequatur.',
                        name: 'zkwv0ln7catm1cwljlmyl0x7ocpor4xdzukb93nrn70446eg7j3znk2gfc8nbk5faidb28s5fwdlkf28bqxj144yefadqzzrq1wvzy2f01waatnhlrnfvpqhov7og8o4m4004heuc5l8yv9odwh9lcatce34xlltowlbvdxg5re74rq22vfmr4exsttiwf6ug5eexv40883y0ljw3fenw7sq9we306x3neqhh1dx5gey024i7uk3bgpf0i6jgxw',
                        isRevoked: true,
                        expiresAt: '2021-04-14 21:51:36',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateAccessToken.id).toStrictEqual('6e98ba3a-1dcd-499d-8ffe-6a6b079388d8');
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
                    id: '0d161d83-7a8e-4a52-97aa-fad1d520a95e'
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
                    id: '6e98ba3a-1dcd-499d-8ffe-6a6b079388d8'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteAccessTokenById.id).toStrictEqual('6e98ba3a-1dcd-499d-8ffe-6a6b079388d8');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});