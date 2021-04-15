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
                clientId: '6cbfadbb-5550-48dc-b360-362d0a0f4f79',
                accountId: 'ef932a88-a291-415f-b73b-f476c25875de',
                token: 'Quisquam omnis officiis sint. Perferendis eius eius itaque reiciendis eos nam excepturi. Aperiam ut sequi.',
                name: '3bsa6yaiuykpen7zlx9h3t6o25bzvpgu9jepe3qqit6kmb0jl0i8xu0bw1uxbnmwxwf2j5f8ldcetc4ptecxflwi4nb9h0zsn2uortogza3obl6qfuixn85o93fff6qmivvz5wredzr3hxadb5j9xc4x8chexusxe4hgusw5wdcye0iuampuoulk624g4adsgcxxnik7f7yyjp1x3oqabwo5pt07dv2co197ntue9jv7oh3it2p64t5iii7a952',
                isRevoked: false,
                expiresAt: '2021-04-15 23:25:09',
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
                
                clientId: '6cbfadbb-5550-48dc-b360-362d0a0f4f79',
                accountId: 'ef932a88-a291-415f-b73b-f476c25875de',
                token: 'Autem suscipit quo at modi quibusdam alias blanditiis ratione nulla. Et iusto asperiores dolor. Omnis nostrum deserunt dolore ex optio quia eveniet numquam.',
                name: 'gmvhu5nswv7fz5rn3q9t0kff1wwo9vmlf4fh8q5sa1olatetcc12578o7j0nstr6qj3b052je20brvixrt9fireeontb9irjr29nnk7yueezmulward3b2hdoewa4nwut21dko3cscforr15zd4at9dfma12r9vs06knwxrugt16vrfp3hy2tuck2pryz5j13uqmoblk2brp8glj7klfl3f7vaf9qcvexnftvq5zl45jb1a4qgw68pg0ajrb7cb',
                isRevoked: true,
                expiresAt: '2021-04-15 12:26:52',
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
                id: '89c486b9-faae-4857-b0b1-1d807c783250',
                clientId: null,
                accountId: 'ef932a88-a291-415f-b73b-f476c25875de',
                token: 'Amet inventore eum aperiam laborum veritatis neque itaque. Voluptatem ab modi qui officia. Qui sint dignissimos labore.',
                name: 'tfif457nm31ezych0yrs4hi4427l0kf6mst358inff3qkn7whvu750vskeupw1ea1yo9wbn3n8qxsxixpo9u5nz9079kbcm3wcghlcpfar5s84k88bc8kl521jxkp7yuj0ebbigjj10iyrjvnz4hh78w719souk4rvjfz9rjcpymuw0177nprw1i6hc2wpnn40zfjnx3v5tc61ahlbirwgznibbi7oyiomixokyp874q2s726wc1vo35285lbky',
                isRevoked: true,
                expiresAt: '2021-04-16 00:52:37',
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
                id: '89c486b9-faae-4857-b0b1-1d807c783250',
                
                accountId: 'ef932a88-a291-415f-b73b-f476c25875de',
                token: 'Doloremque et praesentium est reiciendis porro. Voluptatibus id consectetur est et fugiat. Nesciunt tempora ut veritatis est.',
                name: 'u4f1qb72vnav01heesty8jj6b69rxq772tjkolmy7eykltskjjw534gfpa9m0lmotbzlgfwirvrq2k5i2a1r84kuywxorl4fm179psito9dlueonupuvmr22yc9cglrizxo8h65wdqyqoczg2kfxevnc36er5ptaw9jhkhrlj280pczorumwd9g1tfevb5pvuc98jbs3m262wt5ckuiif8isflymkp92l9ngaxepdzf8118kgxt2u3jd0ibeq77',
                isRevoked: false,
                expiresAt: '2021-04-15 07:27:50',
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
                id: '89c486b9-faae-4857-b0b1-1d807c783250',
                clientId: '6cbfadbb-5550-48dc-b360-362d0a0f4f79',
                accountId: 'ef932a88-a291-415f-b73b-f476c25875de',
                token: null,
                name: 'gf9trmt7wwu4lh7y7up81oaphdel46dydyj5xuz7ywioabtwhr4j24d6wnsaom14ktkjafl9qlg1x6x18rb4x9p4a4k3465anjpnuwc6ta0vnzo7gg9ylfzzl1jqytupvu0vytrsqbmmhd749w6phza58490ksx9tkf4rq9k1insecnjof9rt9lbttjlhsrc2m5o5wb3u1jl6wjcfevhov61ruissrfwhgsrjpztw67uy8l8h9h9rs7ns9thmny',
                isRevoked: true,
                expiresAt: '2021-04-15 07:46:58',
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
                id: '89c486b9-faae-4857-b0b1-1d807c783250',
                clientId: '6cbfadbb-5550-48dc-b360-362d0a0f4f79',
                accountId: 'ef932a88-a291-415f-b73b-f476c25875de',
                
                name: '9po2ic3zxc57hfk980bimmrokpt0yi9z5azg9q2m2j9uz1m8bbv06s4gss2vgvflvhi5pcob5lfgbcc6a54jfec6nkkwaqd89z6s429zd9y8e11jwzuqyh2okuu71oqh3rb8t15ro52i894xlmz7juoqsfgan92ddal8jqjt320oz0bdjqucbgn257ep0te386as9h3fnrdeazkbgij1rqiktbe38f2oq8z7wuk46jx7r1nilwvorqzwe7e6f1l',
                isRevoked: false,
                expiresAt: '2021-04-15 12:05:04',
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
                id: '89c486b9-faae-4857-b0b1-1d807c783250',
                clientId: '6cbfadbb-5550-48dc-b360-362d0a0f4f79',
                accountId: 'ef932a88-a291-415f-b73b-f476c25875de',
                token: 'Quia adipisci dolor quod quia ut. Corrupti et quo. Rerum velit optio sed sit perferendis.',
                name: '2bpm2vuwjsp8i55ycwtwhwo5weiiqqrkb3r3ykeukrj5jcbr6039llt6ntqsbcur8s0wsfbyzktwwonik79qyx5e6qr48zutqk6yayp5s8umt9tl469p4diplrwglj2gk4vqxs5df1bzvaalj8yi2oac872s446v7q7226nyk975b853da7o9w302ki54kn12lg4j3yueex63gfo49xvqxpvqqbvpqufgv9ldv7gr21hlt8qfyftykmstfudy9v',
                isRevoked: null,
                expiresAt: '2021-04-15 18:25:20',
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
                id: '89c486b9-faae-4857-b0b1-1d807c783250',
                clientId: '6cbfadbb-5550-48dc-b360-362d0a0f4f79',
                accountId: 'ef932a88-a291-415f-b73b-f476c25875de',
                token: 'Eum repellat dolore explicabo rerum cumque. Qui quis non voluptas consectetur et et sapiente voluptates a. Consequuntur ab et voluptatem vel rerum sit aut.',
                name: '7h0ysoh5vtmy6p48nd0gdknvc0d6iudweq757igjkeql2l9y7yecmf31ugxglc47g54wh37za7snq21472j26pdjptcldxtk8s6t45r6p1tq3t43kkmt18how07gclv4zxnwtfnadhdbcw3cvlfsro5tcptkc9xm9f6ckyy7dam6bndyogxl0kgp0bbipx2ly8ueo78kw16tuur2xdctn9m9ho7uuayslvcycjnkrd4aoy3f5sywc8k31j7dbp4',
                
                expiresAt: '2021-04-15 17:14:02',
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
                id: 'cb4ar9r6eozs8utavz2fb40ceiqjrhnsbmq86',
                clientId: '6cbfadbb-5550-48dc-b360-362d0a0f4f79',
                accountId: 'ef932a88-a291-415f-b73b-f476c25875de',
                token: 'Non voluptatibus voluptates qui ab pariatur aut sapiente. Rerum quod nesciunt similique repellendus vitae non sunt nihil. Rerum laudantium architecto itaque sit non cupiditate qui sit dignissimos.',
                name: '4w7nx1vlim46qz23dxz2bcqnh80i6dxi8i9rxm0khnsezwo7jqkplfdg7fk7v3qehe483jij66zz47k02c039udxw3a030ymrt4io6wil95nqqudn00wzzarckagftuz3bhwgjh8to9os5tlrute5cwfoa71jpdaeen560firtt0re49pj8bkkb5rum4yjgtjj2dtfp3dmcs3ebezfxvxopns1oan15orz2en8nynkpoo8srzvw9i67p2vs0azx',
                isRevoked: false,
                expiresAt: '2021-04-15 09:21:50',
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
                id: '89c486b9-faae-4857-b0b1-1d807c783250',
                clientId: '0900msu28b2a4d521mr367c0exx6dbgs1emeh',
                accountId: 'ef932a88-a291-415f-b73b-f476c25875de',
                token: 'Nihil sunt dolores. Odit nobis quae maiores praesentium iure. Earum error veritatis.',
                name: 'hgq0yebrayy8n46tqypvgmfbtbyf750klvjhevhzqnbcydm6vh7xi510m211saa8nedmmbcf4403f4q02b6v6v4hke5f42m62u2wjwxbqckrbxgyqwun4r82fv6xk8alwp39yylii3peqthorj3b6ghcf1xqrlj5itm0peqwscg18sir3q13727iull4h70oun0d1hky75719xru2ld5t2gamlvd771aeflxbxiv7kt04xrhyehtr8hkwgbgv1s',
                isRevoked: true,
                expiresAt: '2021-04-15 02:52:42',
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
                id: '89c486b9-faae-4857-b0b1-1d807c783250',
                clientId: '6cbfadbb-5550-48dc-b360-362d0a0f4f79',
                accountId: '8ocljlhgom9hcu0xs0nr9y9nxtz5joiz7f91t',
                token: 'Veritatis tempora et. Et et laborum aut. Dolor accusantium expedita quo tenetur et. Quia laboriosam sunt qui. Distinctio quia ut corporis omnis totam voluptatem eius. In minus aut nostrum.',
                name: '2hbo37q9z9hv98cfmcwvwkllvpw9u5d7r74vpxjgvbfskk8vtsq3aw7702mkzalu65zm69wnpnhyey7pf7bupo2969i6ysb8g9kj4d6cvdijpotxbb8upksjy8i3ftqaqva0q8g2p9chquj2kasim127kvy0vfkkffox22n7rsc42om1vv4iofz1n7pa4hbvvsxu3h5k16n1yln0saah2c7ymdpjbkbkt6fau356d27mn1x19oz16w94y0vthkp',
                isRevoked: false,
                expiresAt: '2021-04-15 20:21:14',
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
                id: '89c486b9-faae-4857-b0b1-1d807c783250',
                clientId: '6cbfadbb-5550-48dc-b360-362d0a0f4f79',
                accountId: 'ef932a88-a291-415f-b73b-f476c25875de',
                token: 'Dolore in consequatur beatae. Voluptatem ipsa et officia dolor dolorem. Sed rerum enim et sequi sed provident est voluptatum.',
                name: 'rq3fh3tpa5py1ins2inmaxrjz52wjee4n6fz731g4knrn4qbm0alszd6ftn5eqkdrcyebrglrrov21fl9f9le6iznllmuozcl5wue0veeakwq6m7t9cuyopqyhbgkyn8x82sq8jkg20bzrkf5m3mcasexhde1e5zgvnspt9c9etqrah1p9tqr2q06fusdmedxs5cwwcc4om4izhsyzomt4io6iwlg3493rg90qsdnmei5ltg06gus285wbc4o5hb',
                isRevoked: false,
                expiresAt: '2021-04-15 14:44:17',
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
                id: '89c486b9-faae-4857-b0b1-1d807c783250',
                clientId: '6cbfadbb-5550-48dc-b360-362d0a0f4f79',
                accountId: 'ef932a88-a291-415f-b73b-f476c25875de',
                token: 'Impedit harum animi quisquam illum quo aliquam. Dolores id qui natus rem. Quae voluptas facere nesciunt eligendi ea. Non et repudiandae est. Ut explicabo quas veritatis vel. Consectetur qui rerum quam.',
                name: '5juvrj8nsl2jhaf5uuusfbjyh9j8amhtad6txuwam8wdfgqwdbbkqzh7jhpb90vyq59qxqivjbed3i99791tbvohqwzwjm24sqjuim5jgoc5fb9npie2t415vf29wsbdwphaxlf4r426rve4sus5ju8ogb9llqoilqh8hu3mqa9ine9vnqux8su5yxbas5ofywavchd2ddpuz8inps2huae5vvfsclmcnb93a9f7x9r5fm1kvs3jiu740v3umcz',
                isRevoked: 'true',
                expiresAt: '2021-04-15 21:45:09',
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
                id: '89c486b9-faae-4857-b0b1-1d807c783250',
                clientId: '6cbfadbb-5550-48dc-b360-362d0a0f4f79',
                accountId: 'ef932a88-a291-415f-b73b-f476c25875de',
                token: 'Consequatur et laboriosam eaque rerum quo quia dolores deserunt. Quibusdam est consequatur tempore esse voluptatem similique aliquid. Repellat iure quia rem. Delectus quam minus et et. Cumque tempora amet id earum atque beatae hic. Consequuntur blanditiis nostrum inventore cumque iste.',
                name: 'n6lfudsdpv45nt66aojqc0hd216khkw0zz32rvs4jdyy71fgowtim351m2g2ch31jpipeeag4acn19kti6vqon0v7rmd2tp65fn1bo5kynzgeasds8egwhddisdczgost5x5r6yqlae7sh2eiph5iue9rzxzbzc5fe7gl01ab8c7nfqvcgawx3smxc99dnc2y8vv1l80v5zxz7dov8syi9u9dcd0375k69exgqohkq0yjru12uxkdnx0zqgdwl4',
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
                id: '89c486b9-faae-4857-b0b1-1d807c783250',
                clientId: '6cbfadbb-5550-48dc-b360-362d0a0f4f79',
                accountId: 'ef932a88-a291-415f-b73b-f476c25875de',
                token: 'Culpa non tenetur eos. Modi ducimus deserunt quis voluptatem qui temporibus. Rerum rerum hic ab aliquam consequatur. Qui velit doloremque cupiditate quia exercitationem consectetur. Accusamus quidem dolorum iusto ipsum doloremque aut sed.',
                name: 'wdsqn4ceeeepg6xv48u0e4h06i6mld05kv8jld5qm120rc8212c85rgp5hbcqg9i88ufjazazlkycjw14qcce1o4p07emainmij654mvg4iczevgig3lpq90yeisinssun7dgn4vn113061wc8swnzcnjuow2orma9htrrqj3mx7t2z10jnpmg9deaflkcdbqsilknpdq7n92pcnawnv3igrt84268o8e7kqnzb17danhweneapowl57lbuyyf5',
                isRevoked: true,
                expiresAt: '2021-04-15 11:03:12',
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
                        id: 'f825a7cf-3b3a-4d2c-8a05-25410e198a44'
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
                        id: '89c486b9-faae-4857-b0b1-1d807c783250'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '89c486b9-faae-4857-b0b1-1d807c783250'));
    });

    test(`/REST:GET o-auth/access-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/2bd91ab6-5dee-42be-8d37-bffe80d38b53')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/access-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/89c486b9-faae-4857-b0b1-1d807c783250')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '89c486b9-faae-4857-b0b1-1d807c783250'));
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
                
                id: '242d6201-bb8b-4f77-a630-b7d5dfe0650f',
                clientId: '2881fbf2-f9da-4cf8-af0b-ca264794866e',
                accountId: 'd7e9fb51-627c-4c3c-9d2a-459b99b487eb',
                token: 'Voluptatem unde ut quidem ut. Quaerat corporis rem quo rerum quasi. Itaque eaque quibusdam similique qui quia et aliquam nisi voluptas. Nostrum qui veniam velit. Sed non inventore illo adipisci non architecto qui tempora. Dolores sed optio.',
                name: 'qchlp3zlpdawpe157beryx4i6553lvb1s8c1kzi8qbe5280yw8mriynhqbc8ali6nfhmnyc9waxini5kw41wfyzksrwdczp5bvwoqre099kbzrvxsxlcxrugg4slg0n4571cb56i3a83k6svqmzidybojtsk2f5jgmyzomjqw9ido509xf1lt3ah37dypbgg76zdxkisdpmnos5gz7s1lvv5931ycc4h53asq0o9xchoi1kabrf2cnugzxara8r',
                isRevoked: false,
                expiresAt: '2021-04-15 06:40:31',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/access-token`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/access-token')
            .set('Accept', 'application/json')
            .send({
                
                id: '89c486b9-faae-4857-b0b1-1d807c783250',
                clientId: '6cbfadbb-5550-48dc-b360-362d0a0f4f79',
                accountId: 'ef932a88-a291-415f-b73b-f476c25875de',
                token: 'Officia eius unde rerum magnam non ullam facilis. Aliquid aperiam aut ut dolores quae sit dignissimos sint. Harum ipsam ea esse voluptatem. Commodi sit odio animi eos fuga ipsum aut blanditiis. Et labore nulla minima praesentium qui ipsam qui.',
                name: 'izibafil6eytlk4efjt7h3j7yt9n4us12n54513wt0s8xxct6kzyr1nvuadl55nsjugx2gbr56q0y2nme3ekp0ff5li9wcxtdor5b6n8t3blnvjz8cc95v2a9i2sqd64ftunotzi2p5pcy45gyizpgroqjjm4ecuweiuhphnfjhgps4rx3saoqwk0fyzjuarjlps83keo68b1tsrvkryliov7qz6nnk65utkf3e8zq00rh5zzthzwjgw0te0l7m',
                isRevoked: false,
                expiresAt: '2021-04-15 21:42:07',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '89c486b9-faae-4857-b0b1-1d807c783250'));
    });

    test(`/REST:DELETE o-auth/access-token/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/ac3681bb-720c-4214-8258-9bd6a3fe3dc8')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/access-token/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/89c486b9-faae-4857-b0b1-1d807c783250')
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
                        id: '23bd2f39-2eea-4729-95e7-d79b80023755',
                        clientId: '6cbfadbb-5550-48dc-b360-362d0a0f4f79',
                        accountId: 'ef932a88-a291-415f-b73b-f476c25875de',
                        token: 'Et distinctio illo facilis consequatur. Rerum reiciendis explicabo. Voluptatem qui hic aut nihil soluta veniam soluta laudantium. Laboriosam sed quis. Et et non porro autem et iure autem est quia. Voluptates et voluptatem sint ipsa quos corrupti eveniet est.',
                        name: '7d5worslfdsqg1ni9zykcgi7kfb014fok3a8mxfpmdxshwk0naraet3w79bxc7ez68advsp4zia1oxh7ihuvga4nfyv82ak0ab9spyd0na3foml3539f25fupri9j8xzzwf4ebge7cbghsqzx3oxvges9cj3mfprpar9pq7zupzhkzm1bdkedtnh50jufjjbt8umc67j2q860k03188f8uqyt5mt4w66ai86d4lko1phdmf9mg809ipt0cdog04',
                        isRevoked: true,
                        expiresAt: '2021-04-15 11:07:46',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateAccessToken).toHaveProperty('id', '23bd2f39-2eea-4729-95e7-d79b80023755');
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
                            id: 'de705efb-130b-4857-9009-34a8fc599228'
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
                            id: '89c486b9-faae-4857-b0b1-1d807c783250'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessToken.id).toStrictEqual('89c486b9-faae-4857-b0b1-1d807c783250');
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
                    id: '26942a61-2736-47d2-9d14-b84a6a1aee38'
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
                    id: '89c486b9-faae-4857-b0b1-1d807c783250'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessTokenById.id).toStrictEqual('89c486b9-faae-4857-b0b1-1d807c783250');
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
                        
                        id: '8802cfdd-e9d1-45b3-99ad-13b593878826',
                        clientId: 'c2db9d1a-b8fd-4135-af1b-2214c7e16d89',
                        accountId: 'd127e595-bcfe-4a4b-8972-4106c3213e69',
                        token: 'Unde quasi ullam. Reiciendis unde doloribus porro molestiae et. Ullam dicta repellendus ipsa veniam nostrum. Natus id itaque doloribus aut necessitatibus. Rerum sunt nostrum et ea molestiae est eum. Consequatur nihil aut eligendi eos sunt omnis quis itaque.',
                        name: 'xseoiibhccwfn5uua6rkyr8jqk7uzxuc6lj9p1o50k2ejnask3lkdfwpvp33xjjslg0rt4a0kvfq88zpyivzyrahl6ybdvsp23th83mn03djcpj67bbnkzhiudhuw4gqb9f9c06vxhcm9urc7fsaek5xtoyhku8bbsspaszj9lvx4swphlqxrb6c5ck6r9t2rw66y3kor63feah6xzciaue6tx5i09jcxumhkjg03ju5lpc65pfktrn7szcqfmg',
                        isRevoked: true,
                        expiresAt: '2021-04-15 19:00:06',
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
                        
                        id: '89c486b9-faae-4857-b0b1-1d807c783250',
                        clientId: '6cbfadbb-5550-48dc-b360-362d0a0f4f79',
                        accountId: 'ef932a88-a291-415f-b73b-f476c25875de',
                        token: 'Eos rerum veniam non exercitationem animi qui et. Voluptas ut et consequatur est. Quisquam delectus molestiae nesciunt ut minus rerum doloribus beatae.',
                        name: 'l4fllnk00u6cr02qc64r6g0jbji99lw7k1b4mytuzva8vbjih828je56ogicuqgxk9i01zsspw06udoazpqf8z43zc22tpzji7ym62qc3gj0i66rj7kwxgtya78wqwjbbenq6pz5flv2oysrvwrysj4u6x7o5vdmk3dynqk1yu395sedk8vjodflqmg0u16ylesur2hp87da7ifbe0czm4pqj1qemdsnpxnq01trtpr2mto1rzx3y0uh0w32azs',
                        isRevoked: true,
                        expiresAt: '2021-04-15 15:57:50',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateAccessToken.id).toStrictEqual('89c486b9-faae-4857-b0b1-1d807c783250');
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
                    id: '4936d1cd-6533-4229-8bf8-e7bde29318e3'
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
                    id: '89c486b9-faae-4857-b0b1-1d807c783250'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteAccessTokenById.id).toStrictEqual('89c486b9-faae-4857-b0b1-1d807c783250');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});