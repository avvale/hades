import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAttachmentFamilyRepository } from '@hades/admin/attachment-family/domain/attachment-family.repository';
import { MockAttachmentFamilyRepository } from '@hades/admin/attachment-family/infrastructure/mock/mock-attachment-family.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('attachment-family', () =>
{
    let app: INestApplication;
    let repository: MockAttachmentFamilyRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    AdminModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IAttachmentFamilyRepository)
            .useClass(MockAttachmentFamilyRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAttachmentFamilyRepository>module.get<IAttachmentFamilyRepository>(IAttachmentFamilyRepository);

        await app.init();
    });

    test(`/REST:POST admin/attachment-family - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: '8utatpmbznfl9a7meu87zir0mxv2wm9tfyu1ltow90gfjkn0j3uo016jsgcic5sop0zjm0ng50hvnnzdvypbtk3q3wg556ggfeif5guwq9geftx3asnqc6d4zlcn67aki75v6bib7888u1oksxbr44q5gp0uxpu2w24uhedcl6cyzszrz7zadvmgmwjiabls8q33i3vo7ci67eyoos3ec2shg1wamghlyyy1z1b9hqg0m59ku4yfr18dv0kz5mo',
                resourceIds: [],
                width: 758776,
                height: 560473,
                fit: 'HEIGHT_FREE',
                sizes: { "foo" : "bar" },
                quality: 80,
                format: 'fumb2tre6n',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                
                name: '9lgqxasuqr6mdeui2ganoly66ha778rml5hht4ulh9h5zyjut1z484py1wklgcvn89r4frivz24apuq5rvq9cgzqkjy8kn1plxek55mvxjktc1ll3tuiotgak93cdjzhju1p2hcmadgfhpf8v5xm1o11mfwq3bd58w6tjpclengetxvn5tdpiq7uywsy0yiks6e9yjq9pnvabnnllmgf4xwnfenwha01ykg97hdvjivn6prsdwh56awkbmc2243',
                resourceIds: [],
                width: 415875,
                height: 490102,
                fit: 'HEIGHT',
                sizes: { "foo" : "bar" },
                quality: 90,
                format: '3a75wtevsr',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'c0175a80-f02d-41b6-bed5-921e6cc21d14',
                name: null,
                resourceIds: [],
                width: 560232,
                height: 371023,
                fit: 'HEIGHT',
                sizes: { "foo" : "bar" },
                quality: 56,
                format: 'i3swbxukfp',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyName must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'c0175a80-f02d-41b6-bed5-921e6cc21d14',
                
                resourceIds: [],
                width: 491387,
                height: 207893,
                fit: 'HEIGHT',
                sizes: { "foo" : "bar" },
                quality: 63,
                format: '7wmu0bfx09',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyFit property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'c0175a80-f02d-41b6-bed5-921e6cc21d14',
                name: 'afckeavmr6974hxgfoynh2qeee9bldvynx7xpompzdnpoq5sgbev2dqf7gfro0qm9t5re5iva2oxy7el1b08g4swux5kr33925wqgxz66ayzhjrrjzwf335ubiruapkc5sjh6u94etqrfcu95a09ns8eb0jiz4m04wwnckxbuczdn2b6bre1wj9ade5y8nxw6t2ly09d8f2pf76llof5305bej1n1qeza4ujyecckkni9mg12ebgqd9tnekrz6l',
                resourceIds: [],
                width: 814558,
                height: 231510,
                fit: null,
                sizes: { "foo" : "bar" },
                quality: 14,
                format: '1myu0u1t1m',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyFit must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyFit property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'c0175a80-f02d-41b6-bed5-921e6cc21d14',
                name: 'lgwkozykx35pept7sckjrzwr80xvmnvdfhm45ag9m9znxhl28h0wm4ajjt7g0zg0leuttvow167iclbvj14is9u81w61v8v8l0npkmbqcpf13pcycnotft4ce8othv8d51mewjpupdqodchlwsgcfospiqe4jyssqxes8k1ivs4yw70q0521jgsvti8btqtfvjzrqvt99274s0s22ox7dwq93ls0prcr4njwdurcdviwf9p8hvog9g6dad2lwbg',
                resourceIds: [],
                width: 362073,
                height: 489718,
                
                sizes: { "foo" : "bar" },
                quality: 74,
                format: 'i8oyu6fngx',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyFit must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'hsgn2metui4qcu8rako11r2dgpd9siawi5b6p',
                name: 'o35xfmonjigj54tfvkxkau6bcdkmbj1wwikmdp91p1p3wdkznawbicx61tv7ewbnt6x6vgvzue6c0hvjeoqb1w21bbsnfnzdg6hbsm7zk5pcim60qt23xh1277co3o2kx01jbd507acqgfip8979vg308b9879egv8zhhtm4ld93efpngwgfmu29abrmgnaeql5qkarmgrd2f7y6waz80zvj1yy52oasty0dwqtv8vpbajunlvly49urij19kn8',
                resourceIds: [],
                width: 256356,
                height: 552996,
                fit: 'WIDTH_FREE',
                sizes: { "foo" : "bar" },
                quality: 71,
                format: 'td9nb7pwwb',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'c0175a80-f02d-41b6-bed5-921e6cc21d14',
                name: '8vlc6dnzewm5p3ba6u27mzwbicrvjgc63dlb0t1dlq0id5ph9o0wm25kc4lgoibgz8imqarv641iidt3c5dcgeu9kqh8w9vq2bgxguty9h3e5f3mrmhmd6ep3ujb947m93c7hnmpvjlrzijgmre7k85vcjfc7wwsqot0r5vjvupy95494w9u1ote6nqqmg9yhwb9ot5zgyl3481frt3s6kvpe5va8uk47q52enfed4puewl4zrl6q0kwef4cz6p6',
                resourceIds: [],
                width: 114025,
                height: 950237,
                fit: 'WIDTH',
                sizes: { "foo" : "bar" },
                quality: 42,
                format: '0iofsr4rnu',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyWidth is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'c0175a80-f02d-41b6-bed5-921e6cc21d14',
                name: 'mtsx0u0vid86lz8jot9rajf9bp7336rnf3l3dqonfgm6xvvmw7n7qr2vnwxoo1ptpm1yajpdt9r7g94ciyo8u90075zm3ou3leqvn10m9w4mlueftqnki284l18m3rt5dfjoq3ub0h8p13s54qujxa8r732sbetzkbq3665p8usxwqestrc0d1sti24yju7nfj6qm0orlck8yycx17zk6vlckpntu1psp11ipr9yxf5kr3i0gyfe9uis7c3v4vp',
                resourceIds: [],
                width: 6082449,
                height: 255160,
                fit: 'WIDTH_FREE',
                sizes: { "foo" : "bar" },
                quality: 77,
                format: 'nuecpbqo4b',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyWidth is too large, has a maximum length of 6');
            });
    });
    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyHeight is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'c0175a80-f02d-41b6-bed5-921e6cc21d14',
                name: '4luc8kabm9xvyvbpyqwzzi1thw8h88ty4v7gm0xcdvqjydbvsa3vasjc2v0qmm76aqq79vo53wdx1ryngxnoz90td7vz7g31jrr75yvga2eaa81gx4obd5y9t69barnqhgypixwvremm06l4zxcxu5n7doulahlpojubem0ud0ze3kmcatemtfbvew5bwnr7ofsav9kmokcvqxai2ochgwupqe21v3n7h2u2x4nyyfszab2xbwmhtyq6xhlof6t',
                resourceIds: [],
                width: 861996,
                height: 4472139,
                fit: 'WIDTH_FREE',
                sizes: { "foo" : "bar" },
                quality: 35,
                format: '1hjkden2vv',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyHeight is too large, has a maximum length of 6');
            });
    });
    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyQuality is too large, has a maximum length of 2`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'c0175a80-f02d-41b6-bed5-921e6cc21d14',
                name: 'p4w0rkk3h919mi8m67wvvjhwp0pdbb8gzozqi0ykpzp8c2gdbu56uxkepocfbljpz4yjezlrjgn7pcr48xte1lbpk3gp1s9c5vhm4ntgqw60l85p2c1b8lqzn0uufoist8bncv9e850akj9k75orvdd1b8s9c0jqaltjqm42fzmaetrlsyfb8ci6oueh2g9ao98h35dollth393ya305lv8ucpne8fj9n1cz8oy0w6ltb9wsylr3skjyzxe44h4',
                resourceIds: [],
                width: 264767,
                height: 472581,
                fit: 'HEIGHT_FREE',
                sizes: { "foo" : "bar" },
                quality: 541,
                format: 'vtils624gx',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyQuality is too large, has a maximum length of 2');
            });
    });
    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyFormat is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'c0175a80-f02d-41b6-bed5-921e6cc21d14',
                name: 'u40hgqd7qesqpvx8j9gh136cwg3z5c3bsh4ujfb03lh8k3rt8c31fdu4o8ob3rpbh4224va25s6pc1l9axg1jsrth0w03rl3lurdp0sra56yeydypd6uy7w0a1lk3j9oz62p9ml6fng4mtcw8enesv6nkh0nkjzncyo0wl8uq5th09kvlmdv581ck0nr5o5ia99kykgkm0yovh2s5zrui5c6byabvtedx9dfjvbuayl3kanzjeai8gbncqitbcf',
                resourceIds: [],
                width: 810999,
                height: 368167,
                fit: 'HEIGHT',
                sizes: { "foo" : "bar" },
                quality: 26,
                format: 'qbqshykf2bj',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyFormat is too large, has a maximum length of 10');
            });
    });
    

    

    

    

    

    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyFit has to be a enum option of CROP, WIDTH, HEIGHT, WIDTH_FREE, HEIGHT_FREE`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'c0175a80-f02d-41b6-bed5-921e6cc21d14',
                name: '8g4pu5jdot960rdhukdzy5vlxc19a97n4dgyqh5lpowrn2csdvdrtphdwhjr240kcyteutt7pucu1muszwml1jhfij2b61y48k33yy2rlzrdi95f1fbdz05d5jb9gm4w87eijcxoyqgxapqlpqw45xfh7klu8tkouj5hypcgvtgxqmop7z60510et1qkcw8zm87zb49ruvcpipyrw8wfntztxiumsgc5ooxk6bndzdibhojg35xrqv5ovr8u4j4',
                resourceIds: [],
                width: 694347,
                height: 101293,
                fit: 'XXXX',
                sizes: { "foo" : "bar" },
                quality: 85,
                format: 'ddcb76eum9',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyFit has to be any of this options: CROP, WIDTH, HEIGHT, WIDTH_FREE, HEIGHT_FREE');
            });
    });
    

    

    test(`/REST:POST admin/attachment-family`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'c0175a80-f02d-41b6-bed5-921e6cc21d14',
                name: 'fwxtgstuoai000vv59e4afqsmg4hn7at56s00c5b4naai52yn6ogq2ijh8mz07c07cjd914u27sdyp3i0jjl8mu1k2uworz5nc2fipjvefm9zh9gunhawk7q3fdwj11tp5msxc91y9kdgo48zijaseujrro0swqneg7eryv2tjgmndvt8pnu9jqemw4l2qylj9srejwoq7erq984w18wxz9u0gne3sfgo96z5wxbazwnulmv2pdopfb5uxkg79p',
                resourceIds: [],
                width: 473101,
                height: 444375,
                fit: 'WIDTH',
                sizes: { "foo" : "bar" },
                quality: 94,
                format: 'stumdj2ko5',
            })
            .expect(201);
    });

    test(`/REST:GET admin/attachment-families/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-families/paginate')
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

    test(`/REST:GET admin/attachment-family - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '7268e900-a992-433e-b5ce-9df51fd1b258'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET admin/attachment-family`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'c0175a80-f02d-41b6-bed5-921e6cc21d14'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'c0175a80-f02d-41b6-bed5-921e6cc21d14'));
    });

    test(`/REST:GET admin/attachment-family/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-family/231b3f77-c223-44d4-aa22-273eb34bef6b')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/attachment-family/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-family/c0175a80-f02d-41b6-bed5-921e6cc21d14')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'c0175a80-f02d-41b6-bed5-921e6cc21d14'));
    });

    test(`/REST:GET admin/attachment-families`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-families')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/attachment-family - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                
                id: 'a4e4986f-3e09-49bd-933a-59177d6417f7',
                name: 'kbhmr1hr7by5qx5q8kush5vi6b6cg88035ff1k463zhnm3796hsdtj1rotyj03a2ghdx1pvyuli2feehpi2tqal3xo3do6uxbaxse8ryqlyvsbjamzfiyt5csqufry6oz7hcjxnjtjhixbrcns1jkdt3je6qxmref17dtflv4lgr8na6xdoci7hlr1sw269qq0h13t8vodn81u4j0nlezwkbkrzxzayiyau6qxbmdnldfgjgtfz121dp9b1rs35',
                resourceIds: [],
                width: 800377,
                height: 489615,
                fit: 'HEIGHT_FREE',
                sizes: { "foo" : "bar" },
                quality: 46,
                format: 'nr8s1vafb9',
            })
            .expect(404);
    });

    test(`/REST:PUT admin/attachment-family`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                
                id: 'c0175a80-f02d-41b6-bed5-921e6cc21d14',
                name: 'rc7yhsub0ork8qebdwmroy1xehr4pquctf4440fd98nmrkf3kb1fk4uj73aer8q39b97mghbp3gqm5us6f19t78rqvacmj7oq1k1yx53ou75dkmryf2gy03w8olsz1jssct3pthdolcc0rgug5tmmfx0jt39xwnboxamf8zfokkrkd3rfhvcsxg1vm5eg73mc0j6fvyofup55v5qkcmwvt57skno42ucaau2rsf17mijfzt202lwza603r69gkl',
                resourceIds: [],
                width: 245656,
                height: 852304,
                fit: 'HEIGHT',
                sizes: { "foo" : "bar" },
                quality: 64,
                format: '7l57db065x',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'c0175a80-f02d-41b6-bed5-921e6cc21d14'));
    });

    test(`/REST:DELETE admin/attachment-family/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment-family/0197e60b-c511-4056-a31f-3d03151033e8')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/attachment-family/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment-family/c0175a80-f02d-41b6-bed5-921e6cc21d14')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL adminCreateAttachmentFamily - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateAttachmentFamilyInput!)
                    {
                        adminCreateAttachmentFamily (payload:$payload)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
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

    test(`/GraphQL adminCreateAttachmentFamily`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateAttachmentFamilyInput!)
                    {
                        adminCreateAttachmentFamily (payload:$payload)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '1bcf7e63-a3bb-4ac9-b5a6-2f2417448c96',
                        name: 'im95jl4teae9i0029119wi5lugow7neg9jrqrmqb5t6rmdd8ovih3ke8v9hoewms9etwbfia2vvpy8z5g2woek8l5zqt8jgkm2o2b7rm4bxdmxjyccngq51urbvge7qx2c8aa7lbjiahjhcb2mu4bxbnajtxuxxtqnlhv1k30aanmqgsd5w3gxfg11kjdsv3yrl60voaewrb2y4p5qwzfof28mzs6hrvjw40fuyxrhq1rdly49cwgwdy7e63mn1',
                        resourceIds: [],
                        width: 335912,
                        height: 115858,
                        fit: 'CROP',
                        sizes: { "foo" : "bar" },
                        quality: 61,
                        format: 'vmurazt2wf',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAttachmentFamily).toHaveProperty('id', '1bcf7e63-a3bb-4ac9-b5a6-2f2417448c96');
            });
    });

    test(`/GraphQL adminPaginateAttachmentFamilies`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        adminPaginateAttachmentFamilies (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateAttachmentFamilies.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachmentFamilies.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachmentFamilies.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminFindAttachmentFamily - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAttachmentFamily (query:$query)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
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
                            id: '86ab218c-d317-4258-a501-22be97167b49'
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

    test(`/GraphQL adminFindAttachmentFamily`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAttachmentFamily (query:$query)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
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
                            id: 'c0175a80-f02d-41b6-bed5-921e6cc21d14'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentFamily.id).toStrictEqual('c0175a80-f02d-41b6-bed5-921e6cc21d14');
            });
    });

    test(`/GraphQL adminFindAttachmentFamilyById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindAttachmentFamilyById (id:$id)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '0eed9e5f-4df8-4a81-8d32-2380d0103a54'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindAttachmentFamilyById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindAttachmentFamilyById (id:$id)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'c0175a80-f02d-41b6-bed5-921e6cc21d14'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentFamilyById.id).toStrictEqual('c0175a80-f02d-41b6-bed5-921e6cc21d14');
            });
    });

    test(`/GraphQL adminGetAttachmentFamilies`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetAttachmentFamilies (query:$query)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.adminGetAttachmentFamilies.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateAttachmentFamily - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateAttachmentFamilyInput!)
                    {
                        adminUpdateAttachmentFamily (payload:$payload)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'ba91ea3a-af4c-4b83-93a9-ddd762a67fca',
                        name: 'hgoezc7lb0rdjm90gh3tv2gvtckxi0ahtun16v71fv4qme7mf6defmmen8gsywhm6zp5q2nltn5i27plrabsin23sc745zljd8kz4yddouvhc9iue7wc6bl6mpfquipjbtp1l8b6mcxsgp9r6vl5err1551mjbf661d0b4qq7jzf49ctki3bw8bh964t7unucjhnheer8pi64tp1ws6skjzky5e835v1sawbo58w6urawxgcrs7af0f3b6885wm',
                        resourceIds: [],
                        width: 583244,
                        height: 303583,
                        fit: 'CROP',
                        sizes: { "foo" : "bar" },
                        quality: 85,
                        format: 'd0vwiv720o',
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

    test(`/GraphQL adminUpdateAttachmentFamily`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateAttachmentFamilyInput!)
                    {
                        adminUpdateAttachmentFamily (payload:$payload)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'c0175a80-f02d-41b6-bed5-921e6cc21d14',
                        name: 'xxy34zs0ibzfwixy988an7uc1ht2oteztunj2np71ki8qeg3lpoi3p9ukz4cbqwergjcs38nstkkvo50guenml2sibws7bx9vbtul6iyce0jlxrv9rkfoqhm3mt9wf04kjkc6phqehg7owzknpast4qmcej9m9x8yyws5hxpe016dpjdwhddrsrkw3hu449kfniw26i4klr1uo63ddyb26came0wsq41v9utqfkcg9coqptdbkyypeku3jnfdlv',
                        resourceIds: [],
                        width: 725184,
                        height: 109356,
                        fit: 'HEIGHT',
                        sizes: { "foo" : "bar" },
                        quality: 68,
                        format: '6fp190ptph',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAttachmentFamily.id).toStrictEqual('c0175a80-f02d-41b6-bed5-921e6cc21d14');
            });
    });

    test(`/GraphQL adminDeleteAttachmentFamilyById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAttachmentFamilyById (id:$id)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '6fc0bd25-b7ac-48ef-9f1a-42abf41217a4'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteAttachmentFamilyById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAttachmentFamilyById (id:$id)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'c0175a80-f02d-41b6-bed5-921e6cc21d14'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAttachmentFamilyById.id).toStrictEqual('c0175a80-f02d-41b6-bed5-921e6cc21d14');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});