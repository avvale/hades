import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IBoundedContextRepository } from '@hades/admin/bounded-context/domain/bounded-context.repository';
import { MockBoundedContextRepository } from '@hades/admin/bounded-context/infrastructure/mock/mock-bounded-context.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('bounded-context', () => 
{
    let app: INestApplication;
    let repository: MockBoundedContextRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    AdminModule,
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
            .overrideProvider(IBoundedContextRepository)
            .useClass(MockBoundedContextRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockBoundedContextRepository>module.get<IBoundedContextRepository>(IBoundedContextRepository);

        await app.init();
    });

    test(`/REST:POST admin/bounded-context - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 'r6qquwcz4fw6f999s2lyta2by13g1axxtm38oe15jhah5o2bvvxxdin5qlca6khgmjatvvdnwob6o4zodcjsdwqdmvjtdl30ynq5l4fvc5efl8k2v4zfq4zhdhplusft19khu2ok681q90i3r2e2c5cm7fxv09wojhxl8kdggme6hywtxoou1882a5r8d1c1syoffklwyx1jrt0o741nuidbjcggbdinodzwik9j7bnxh18x2u0v9jex8vs88un',
                root: 'zur4s1ip515mquqp1evs',
                sort: 467910,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                
                name: 'kl663738hsaqp4ja7f44q57cc1xyubu2mbkuol14fbcvhipsjim34ht8ud7px6309hevd9roo4i9bm3g5ar4m5iqbynbz72fqyaapfknlfqebehlt4q708k1eh2nphh61w6vls4mi0dsxls7bonbj91j1em9ixri6uhlg0daxqryey4yfjefp2z0n226dkci1fnh1t7y2v25hmf9ws0tknqlev5awz4a379ybk59hsa90flw3uk20rvc3ppflnu',
                root: 'vxk8elykoutb6yc93ecx',
                sort: 913872,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '9de10197-9c32-4f68-8ae9-acf02f56ed77',
                name: null,
                root: 'vc07vfu83d64x1i9adil',
                sort: 424109,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextName must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '9de10197-9c32-4f68-8ae9-acf02f56ed77',
                
                root: 'pgupy8i312wcohloxu1g',
                sort: 480823,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextRoot property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '9de10197-9c32-4f68-8ae9-acf02f56ed77',
                name: '30yz9fehsp9nuzskxdqnynfr3p0q10z07iswdl5dn0w6oda34ybebmeveoko2f359pj1z9ovwlon3xob6ir16fu44obwll8p4gwmycucfxk43ci0hyyua8q3h9c98111vlexhn9mdcyrlrfo9z2j0kly2dyz9in7kcanqrwv2vxqepev5n7bm2e65a6mlwmb6ynoh4o6g0rjgrqou0prsat5w78lk6wu3594kjj70e9zvsh9i0qo28vmsclbfwl',
                root: null,
                sort: 941961,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextRoot must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextRoot property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '9de10197-9c32-4f68-8ae9-acf02f56ed77',
                name: '3t9b5fezqvfvenjdihospwvy7ybnxh1xiwbjxpx7z6vrm65pqjeveptdi4ud881omcl2g3iar3yigndv1k6pefra0vtzs0cw8449uds1yo8dd9ulthx20ile4dmch7qpa41ussugvygwbnibzlrpydmcqov27oalkl3502lr06rmgan6lr5rjjen653u8g8e4qxxauarjdppihj5e5j79gzh6f3mi4wqm758tmia8m0h5i0gk1asra5rp7vdkrj',
                
                sort: 599723,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextRoot must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextSort property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '9de10197-9c32-4f68-8ae9-acf02f56ed77',
                name: '862mvrn605w9661utlh7cj5tjedfc65r4j5mnr7hckqjyl4hm9gkqbjse6bqc6hpvxyv1udcndjsv69vgrtiqolc28bpuqba43smtallayhk6yb6oiomb5w0ivruj9zx1l2qpaqfpwd2rn2hf06s9xthg0c180xfoty422ufpw1jyr8i0gm4mlgt3j3ywlnpmoolqy2dtvebrxasxcf2gz36bte00hm4zeew36qxd4nnuoyxhh2h9uoauidaa0c',
                root: 'nltann6tm0j0uyyqlera',
                sort: null,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextSort must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextSort property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '9de10197-9c32-4f68-8ae9-acf02f56ed77',
                name: 'q2uy2pcpivnhhbk7m1vej3jkdr7lb3wi6fytcfq856pqorb2d2erzzowxwzotyyso0qoeeuf0ynkftndik8oxovc7f44j0nf84f2xl651icgmah40iyouow30c3mxirgq6w7zqeyw6ti6aqjbp6zw0ov3wijzjoa2fwd3r8la7avp3earhz9zcse6kgssvtiaeiek32w5l83r20v2crpqhujyc7gh8f2iqlawoia75sl8ewhc73q8h4r0nwjdx3',
                root: 'ihh4m9vmph7h9wvnac92',
                
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextSort must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '9de10197-9c32-4f68-8ae9-acf02f56ed77',
                name: 'fia18ha46d5ll5aa017v4yrjf08d18cv8dm873zvg2bsxc3z6d4n7rm4dinh56dvzrskhc80lhvt3m75lajfbkn9uy00x4b3vq9y97voedf14gkslfpivb2ee2s5qply45614uc637craqzoc9wuo9ws3sc5mlluamrjeoke4ao4imm8id8sc1or7d8bm186um2xuega0rlszwl090s646y8jnwfprp6lh0aa572246e5v9ehw2q3bxvw30hu34',
                root: 'rmbzsnzbiat5dn7chni3',
                sort: 424153,
                isActive: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '9de10197-9c32-4f68-8ae9-acf02f56ed77',
                name: 'wflomaz4yz8abg4xrd4hf90pzv63eqk2bse7wkgnt9kkbuck340eb1le6205b959tmzfubog1tv8j8todj049dlwnsm6aw14gfjftzqetoed214i0frr6xnaf3w8u70zi25c9qe7t94b8oqv8t2eyfs8j438qea0m6wzicswvhy6r79ofx85ufhe17clx2yp2qjkzmwlm46a6xgyl9vun47t3l87d0nlkfle4s1pgr0j0kgbce59y5xdata3map',
                root: 'rlhk4hyw54t9n0sfe7ko',
                sort: 358084,
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextIsActive must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'smh1ufxbm0dx9d65djci29rs3prou1a1px4zk',
                name: 'c61f1puu6yug9jegpodk4jyxousiq5p06jqb0y3l3lhkatmh55kn75ujspxeu937cpdym15v864g4ni6fwxls5nsw6e4hz7aynib45cx30018e75wrau2bixrkzetj0g6uzc3i5ix9m6ko5u31hl7k6kop5gxop1h8vrfuxhe5i12gm0uqc6axadam5lxbd3chu6xmy7z85ph6daqsi0knhpakk5zi91zna23663cpe05xnduifmdczlecefris',
                root: '9adule52zi7xjm2j86r5',
                sort: 863441,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '9de10197-9c32-4f68-8ae9-acf02f56ed77',
                name: '490pu78e0s9i8zc7ky92fl78u6aam876d0ws115ad6dpjuw855my9wc4aapqvpf45f8ebpg5ml386goimlv74wx0ihv5l0t2tvm89rx54bcdw7c2o6tuhywxxqjz0yktf0499uypc10wb7z2aacffwdil3i4m02nv9uh89342zwlr1xob175etvco3dfjo14vbvjnwhr4c0pmxxs5m6v4qci4og94ltslbxna9nkkt3pclrtcnl5vz8n0hn2go4u',
                root: 'utwrksl9t2fto178yz8x',
                sort: 499050,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextRoot is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '9de10197-9c32-4f68-8ae9-acf02f56ed77',
                name: '0kjcd6l6uzk39oti9ztms945rbs0fcrpi99bhq82bopuebnmir50uzhyi8a38ev8zkaaj4q4lu4zie4gbm1p99s7p6r6dsqe8wyl9bjar7sq0zsnyfvrxzwvuz2n3f9tqw3b5bajsl1p5dqlphcceu50vwjc88qskswk1wm4ufvs5gy5u3zn956cij4hr31e1uzey2ae7w2l6tspsjsolie8sd1axs91qovz1c7bfed182g4fm7igrmkfw6ar23',
                root: 'j0qga406aptiuxr8iu2yz',
                sort: 847411,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextRoot is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextSort is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '9de10197-9c32-4f68-8ae9-acf02f56ed77',
                name: 'xy242jqwmgh9g8d4dcgo3fv69j38xx38lqmjdap65pzquw5oj71hzd1y3vrz2n6qc756i59kxxp6zhkwrztg8kvsjgfxuwfxn4jqzaz6aiav68xnpqumnuv3j6ix1j76ycc8h24omg8gdirlc9eosadsvs4h2f5ll6qbuhjmnllhqym0ew7o8owmacc7z2nfmfhxc68dggwuo2prx06yx8jqk0we3kp3yan0za9ax6nq4tqvn6zy2a9xlq9img4',
                root: 'xho0kqku3aomco6bm5te',
                sort: 9910265,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextSort is too large, has a maximum length of 6');
            });
    });
    

    

    
    
    

    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '9de10197-9c32-4f68-8ae9-acf02f56ed77',
                name: 'v1ipl9os4n4z5i67iifs9xdsw7foq655s0rkhdnt3nhrj2vmix5x08bxegymve4axe8b0am9lhabj0mq8migmk0wrr6c5fh53stf2p45twgjcljdbduvyhs75ra2wdet4wyyf3qu04opl98gulx3mp5gt0q6mz1wpvc6cm77ywvll1y5i55oekopxguu7gxxz9ch4trtqx1sr05aj195tkpsy599ltzeckva6hvnsrbuiwi2lx9gdq7hjm3yb6s',
                root: 'cewohqufg3bjm2v9e4cz',
                sort: 969563,
                isActive: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextIsActive has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST admin/bounded-context`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '9de10197-9c32-4f68-8ae9-acf02f56ed77',
                name: '9uitsuo2b3fiupdcaup5zqs22ruvpjv1cjkmiizbvu5dwrf4houi2dinku7ilev0ir0vmxi4cawc7dfhamr3gmonq9czzri3y0fq3c1thcoqmhe5otvid7y4k9rdidrodyun8y9icw46oy4onujpkj0gva3djjhm48xzk26tvdgzfr6kdlrqxdw7o14fksyu7csr9mfhczcy9l6f2g22ee8hvgn17pi0h15cd662h1cbeea2uadjxdma973pm5b',
                root: 'nfkzz1l1owef1xkmkse1',
                sort: 756327,
                isActive: false,
            })
            .expect(201);
    });

    test(`/REST:GET admin/bounded-contexts/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-contexts/paginate')
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

    test(`/REST:GET admin/bounded-context - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-context')
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

    test(`/REST:GET admin/bounded-context`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '9de10197-9c32-4f68-8ae9-acf02f56ed77'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '9de10197-9c32-4f68-8ae9-acf02f56ed77'));
    });

    test(`/REST:GET admin/bounded-context/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-context/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/bounded-context/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-context/9de10197-9c32-4f68-8ae9-acf02f56ed77')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '9de10197-9c32-4f68-8ae9-acf02f56ed77'));
    });

    test(`/REST:GET admin/bounded-contexts`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-contexts')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/bounded-context - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                
                id: '41ef1f94-8763-4920-a384-5304adf5f776',
                name: 'jh6b2xnuhyogd1kjgzbc15mkuqlhw1qpz2fa6go1chwn2sx579z0zf84aciuv2dze98vgrs67vcutr5n3cwhheh5yeckrkxokccr6n6r843368swqo30njpaidydgfto2n928tfmpw8acrr1aae01y0h0v5o2mll8d4ke9gbfyi94wf682ph6e47t8h3twxhsld6olfm1zpq13y5u6ca4fappnt7hc3p34yeabeozk0kod8qg79t0zalc0xvf1o',
                root: '662i5l791vdaov18g7fv',
                sort: 125052,
                isActive: false,
            })
            .expect(404);
    });

    test(`/REST:PUT admin/bounded-context`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                
                id: '9de10197-9c32-4f68-8ae9-acf02f56ed77',
                name: 'z43xs1k0p0z42z9akvc73zdzrr5doizxslgn2t5y0bjc8ajq3xiy4z24hyuun17ajxm0vjekn9ccrhvwqizws0a8fqjdkymgyp6fneeqkpty0vz1pkem7rreqq77ud33q3pgy8ur6jfew3h07l9hrmi3eelqtg66smyphrx4m9jsfcu16xaws3kvq76k7jrokka3lpr0jglgwnj94zveeol1heuumztnaqb2hwcidg9v9sddb27lj3tmgz1h2rx',
                root: 's3575so4kzsz5hn5rlk4',
                sort: 356321,
                isActive: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '9de10197-9c32-4f68-8ae9-acf02f56ed77'));
    });

    test(`/REST:DELETE admin/bounded-context/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/bounded-context/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/bounded-context/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/bounded-context/9de10197-9c32-4f68-8ae9-acf02f56ed77')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL adminCreateBoundedContext - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateBoundedContextInput!)
                    {
                        adminCreateBoundedContext (payload:$payload)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
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

    test(`/GraphQL adminCreateBoundedContext`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateBoundedContextInput!)
                    {
                        adminCreateBoundedContext (payload:$payload)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '77f3a552-6577-4fd3-89df-a5973f647af6',
                        name: 'jnahvk4e9r65o6pv2gc4ogc75x9xqneajopvkiazfkjt4kjywgcqtdejnny5mdxgn66pjeu6fxj4g6lovucutm5p2tkglsigi58akqj3ii5r7yt9q9ky31dx6x9sn2tlv1pem0uuqq36oayh3mbifa4l81bdvmcsh5tfjspe66e3u3an2mb8pwq7cgv7oed8qabs7gzpclgt8lhxa5ecr8sj6peqpv0vlzitg2njqjx7s2gjdzmgzjf1o7tvz9z',
                        root: '74a009yfkw00c6qds4s8',
                        sort: 836386,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateBoundedContext).toHaveProperty('id', '77f3a552-6577-4fd3-89df-a5973f647af6');
            });
    });

    test(`/GraphQL adminPaginateBoundedContexts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        adminPaginateBoundedContexts (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateBoundedContexts.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateBoundedContexts.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateBoundedContexts.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL adminFindBoundedContext - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminFindBoundedContext (query:$query)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
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

    test(`/GraphQL adminFindBoundedContext`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminFindBoundedContext (query:$query)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
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
                            value   : '9de10197-9c32-4f68-8ae9-acf02f56ed77'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindBoundedContext.id).toStrictEqual('9de10197-9c32-4f68-8ae9-acf02f56ed77');
            });
    });

    test(`/GraphQL adminFindBoundedContextById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindBoundedContextById (id:$id)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
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

    test(`/GraphQL adminFindBoundedContextById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindBoundedContextById (id:$id)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '9de10197-9c32-4f68-8ae9-acf02f56ed77'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindBoundedContextById.id).toStrictEqual('9de10197-9c32-4f68-8ae9-acf02f56ed77');
            });
    });

    test(`/GraphQL adminGetBoundedContexts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminGetBoundedContexts (query:$query)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.adminGetBoundedContexts.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateBoundedContext - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateBoundedContextInput!)
                    {
                        adminUpdateBoundedContext (payload:$payload)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '251d06dd-cbb3-4f7c-8ca7-dfda37208669',
                        name: 'yxsyyu81q3hqur1wfzt29s646ogprsg6w9hhwv782f18mduz5h5jidxhsvqswtsrlwj8uorx1y7liyjh36oc6wq4bwknain3gv1wrfalguj26urg563h2u44wu1m7qgzsl8yysyewhju9n71iog5ck4u7y0etd2eo849miyzw0xgug9ir38j07vvtivo4bte5368tkw8q62clhhtp4g8dap00ijsp6jlvwuj7fw0cq5ow858ybucw509jvonu7o',
                        root: 'aae97vbo974z1cg0tmz1',
                        sort: 861827,
                        isActive: true,
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

    test(`/GraphQL adminUpdateBoundedContext`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateBoundedContextInput!)
                    {
                        adminUpdateBoundedContext (payload:$payload)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '9de10197-9c32-4f68-8ae9-acf02f56ed77',
                        name: 'wv0updy4bvu1k84r18c0r3vqluh6163kbfc35isguawwhn8xwej80hm66tylxyixwgc5a0kme5u41agvrr8qnv6nrj7tge8qgp4cwenqeopcvdwfzjat2vm2p7ud1gsf2zi3yckto7dljtxy6e980giekcf340555ef1wpt39v1m5adz9re9yxujyljv127thu8mlay7wisa0l28e47hj4237b60r6tjau0fvcqkx6mex85nje3tr0gt1o9e5dj',
                        root: 'nl65qk1y85wyf058nsi1',
                        sort: 274008,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateBoundedContext.id).toStrictEqual('9de10197-9c32-4f68-8ae9-acf02f56ed77');
            });
    });

    test(`/GraphQL adminDeleteBoundedContextById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteBoundedContextById (id:$id)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
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

    test(`/GraphQL adminDeleteBoundedContextById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteBoundedContextById (id:$id)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '9de10197-9c32-4f68-8ae9-acf02f56ed77'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteBoundedContextById.id).toStrictEqual('9de10197-9c32-4f68-8ae9-acf02f56ed77');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});