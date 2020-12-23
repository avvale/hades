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
                name: 'm2eixxeh6ko9yanmc979pyiz0q1ttwjff41sg5ohbqlftg317q299mm7x4jyf5jatwz14e3vg5kh1mq3hmobipcmomdo14q1yu9ngo9jast8so2i85vktc1m53lq9e5x5svq30z47eh9723yqghfzsec5fg4n91pjjblogqxslsykkaeykz9rb0erxfp5xhzzcnjy0vbxvbs8s0nxht6kmdoym2y37kyt8o5miosmik9nklqqfn9v2o4ak2ixrn',
                resourceIds: [],
                width: 918841,
                height: 216465,
                fit: 'HEIGHT',
                sizes: { "foo" : "bar" },
                quality: 324,
                format: 'DATA_URL',
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
                
                name: '5g60t4g3yucx3pyb2lfu1rv3atbqpbl20blmavv33ky3mh3lrxz7yr3fz9k58g6fxvqyrkk48ab40vpu2x3g9gpoogabjeyw3stcikkq08inr5xz6x7b7zjbatitr88mk0i3g7de98oqqzq2o9bg6z2f3qixy5z8216r7gf7ty4vb3n7zohh5dwe46wlcudqvy9ntdxgy1dr266ymo6h33gf1q68ijc7yxu6ne52y5qn7cqxuw4a5wgm1e50buo',
                resourceIds: [],
                width: 531540,
                height: 884863,
                fit: 'WIDTH',
                sizes: { "foo" : "bar" },
                quality: 511,
                format: 'TIF',
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
                id: 'd979eb1a-2cdc-42f4-8f05-5e02a46ccff2',
                name: null,
                resourceIds: [],
                width: 386767,
                height: 868871,
                fit: 'FREE_HEIGHT',
                sizes: { "foo" : "bar" },
                quality: 891,
                format: 'GIF',
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
                id: 'd979eb1a-2cdc-42f4-8f05-5e02a46ccff2',
                
                resourceIds: [],
                width: 594738,
                height: 233317,
                fit: 'WIDTH',
                sizes: { "foo" : "bar" },
                quality: 863,
                format: 'JPG',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyName must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'krmrpl16kklj6bg6fcm2e6vjubloxwarr3ck5',
                name: 'cfocjiesz0egx8nlkwu0s7ockivnz7wv74okngvmea3bb6ud7ba9flst9op6uq0r31l33ndbieq1cwb2himwqpzg0mikz0fg0b14mzfdfi6ksf3cci8dp6od061qr1fvlj0v3xv6lva07i13k83ntspxersrvyrzf75ne99twbpkjv9beqe24thn5warwhx4idophpkqsbk0fha9hbxlelugvpbshmzb38fzyrh5epl3g0cm2rk2qfj2wto9s2a',
                resourceIds: [],
                width: 177466,
                height: 149558,
                fit: 'CROP',
                sizes: { "foo" : "bar" },
                quality: 292,
                format: 'PNG',
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
                id: 'd979eb1a-2cdc-42f4-8f05-5e02a46ccff2',
                name: 'oa6f1j7svxed6noex4z3smgi310qh984bgbwhqcu38ig74uh2wwatdf2ka24zbnf2esw33yvf7w5hlf942h2aoh0n006owczp5vg5ax9tep1gm1kcxk6r4zz3ppltze6wy7q8lmfn673hm2bxo503xuj28l9aofbhqo0xetd06eggxdql4u1hmzl47yejwpjz59b183bufgcop5lzaufpugfqd6q0ggfrhyor2mgo9erseduihygkdecw70iby70',
                resourceIds: [],
                width: 426471,
                height: 530936,
                fit: 'WIDTH',
                sizes: { "foo" : "bar" },
                quality: 820,
                format: 'BMP',
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
                id: 'd979eb1a-2cdc-42f4-8f05-5e02a46ccff2',
                name: 'rebgm7re3sneax1avni4nt6t919f9vshquroj0cat31copw32qwyj2jb6sikbo293601gnjgd7gbqnycf6fjv237cj7yhzan818iqfshm51929c4kj8ru6sabfz36hopu6a70jdi2nv8bgebzuao4zuf6ichpdvwcf5p1fz87qg4mc66w6qmuikg10e6tl7a9jz1wbtr5fvrh2uj3wcinj2kxieh9nnr955j76hgjrowh4v4aa3r5feqgvqgwnm',
                resourceIds: [],
                width: 2777013,
                height: 839230,
                fit: 'WIDTH',
                sizes: { "foo" : "bar" },
                quality: 725,
                format: 'DATA_URL',
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
                id: 'd979eb1a-2cdc-42f4-8f05-5e02a46ccff2',
                name: 'fq3bn56s4z35td0nsd82t1aj0prruihq1d67iqrjy0mpjhpouhfoqry05gbomwxic8kd0ae7mxmj7o4kwetdo3wckzqqco3lgo1lryfh2m0oql2vbbqm4gqswsdqw33dqaeofdacxguix0onavt4tup5rofsuai4n3nl2auf2uyfwrp0bxqknnjzqk02ze7b95cn7ds2g6xbxujxb8m1m3k5dnu3y9kn96fd28zwyctnl705693ht8uqpxjw96g',
                resourceIds: [],
                width: 206694,
                height: 7333531,
                fit: 'FREE_WIDTH',
                sizes: { "foo" : "bar" },
                quality: 129,
                format: 'BMP',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyHeight is too large, has a maximum length of 6');
            });
    });
    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyQuality is too large, has a maximum length of 3`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'd979eb1a-2cdc-42f4-8f05-5e02a46ccff2',
                name: 'nu6wsybdv7tw836l7qn2jv8qz3cygcknlxwli7go7d46kxwjw507ufb1poasofyioi514994nfvt81agjt9ngk18pwhxcqxa3vtfpjkcka9ba2ccrrvluvnvei4l0i7vek39r3aihtjnss6qbahqitlw9f68692wlbjs9ztnh80yy9r0wlwz7kiytqu3tug4hdmvobioey54kgv7g5rc52i75hafjlblubyegapgzr3kxfh662khz09u0otbgmx',
                resourceIds: [],
                width: 482541,
                height: 488759,
                fit: 'FREE_WIDTH',
                sizes: { "foo" : "bar" },
                quality: 6399,
                format: 'PNG',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyQuality is too large, has a maximum length of 3');
            });
    });
    

    

    

    

    

    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyFit has to be a enum option of CROP, WIDTH, HEIGHT, FREE_WIDTH, FREE_HEIGHT`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'd979eb1a-2cdc-42f4-8f05-5e02a46ccff2',
                name: 'ujjrjd3w0tzdm4h5qgr2dayjgbn2as3xfmu180a1oeu2dthp338c11i1x675ahzyqdr5yka4w88n0bm7i80cysnoqjbrbetw0a574q0cpy0ua4sk5xf3m2d566g4n7i342yda00uupjbzjoc3i454fdk0xowrtmqkcnqe4umqtjvz16k3vk6gc3kegkh3d65lghylkcnafma778gm05e1q1fszlfhcwkaz639bya01txgdb34da42z3qk07fhkd',
                resourceIds: [],
                width: 437958,
                height: 931430,
                fit: 'XXXX',
                sizes: { "foo" : "bar" },
                quality: 726,
                format: 'TIF',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyFit has to be any of this options: CROP, WIDTH, HEIGHT, FREE_WIDTH, FREE_HEIGHT');
            });
    });
    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyFormat has to be a enum option of JPG, PNG, GIF, TIF, BMP, DATA_URL`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'd979eb1a-2cdc-42f4-8f05-5e02a46ccff2',
                name: 'b4vmqytjwqsn0od313d4jwg6z93xu4u5rmwyej05l74ml4x6xa53lu3uv7e2gldgboht3ep9kt8kc8srhyyccumpjuujqae3yzmzxtudlp52jjgknim0rq6oyqpvziph0om79d6s01orhubln2r6w06ikec2czok0nf8t9dvzqkkh45gbldobe1atb240r4riq3cr3qqx44uaekbi4xktddql5z2r8wqnbc2njlnjigfv94l2k33lbaf5so8bs1',
                resourceIds: [],
                width: 608254,
                height: 269941,
                fit: 'FREE_WIDTH',
                sizes: { "foo" : "bar" },
                quality: 571,
                format: 'XXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyFormat has to be any of this options: JPG, PNG, GIF, TIF, BMP, DATA_URL');
            });
    });
    

    

    test(`/REST:POST admin/attachment-family`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'd979eb1a-2cdc-42f4-8f05-5e02a46ccff2',
                name: '72g79q3ucujq9c7df4bjchsgypy6lxexwrtv6ylvpdb9zhpavczmuxolanbgpysqabw6s2hdst0o6s8c80nn2ax0crao55xw4h3we6wl4eoa88izaraum6rue88e99eg93m4mlwjaionb15isnof2ul5xiumll8jdkd8mb0ecpxvdqnuwjjh232e43g6gpc03rqbu3p91jcf3hrorvcfos71k26zpjkohobxhf8njyub5yxfp4837zfnevf7n76',
                resourceIds: [],
                width: 678776,
                height: 112414,
                fit: 'FREE_WIDTH',
                sizes: { "foo" : "bar" },
                quality: 623,
                format: 'TIF',
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
                        id: 'd2b27bca-6eeb-49b5-a11f-dec1e2a2f81f'
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
                        id: 'd979eb1a-2cdc-42f4-8f05-5e02a46ccff2'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'd979eb1a-2cdc-42f4-8f05-5e02a46ccff2'));
    });

    test(`/REST:GET admin/attachment-family/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-family/867d8aeb-3f6f-4769-bcd6-3f2a4e692ae6')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/attachment-family/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-family/d979eb1a-2cdc-42f4-8f05-5e02a46ccff2')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd979eb1a-2cdc-42f4-8f05-5e02a46ccff2'));
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
                
                id: 'c638399f-1079-414c-a568-0fd77df5bb48',
                name: 'a1hhxd586nvc9nwbxzduq8pdjiunvuehjf2pc787aicok9etszuqmzalfnefx3w2at4ncbd81mzrqw7nib9onlqgtg71okrwqvtab5kpler6p8q1btojvdsql0f7rh46vkvao9d93kr0zs4k5t9cm4vwblpbbth8td6ne5bq8f42bu4lm3y3pom5muvwc51q6rsbx73tejsoopivw9xzs6sopxnj3hsqwkk3iais28dgrotahum8kcpa0xjfevs',
                resourceIds: [],
                width: 617407,
                height: 367362,
                fit: 'HEIGHT',
                sizes: { "foo" : "bar" },
                quality: 216,
                format: 'DATA_URL',
            })
            .expect(404);
    });

    test(`/REST:PUT admin/attachment-family`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                
                id: 'd979eb1a-2cdc-42f4-8f05-5e02a46ccff2',
                name: 'wjyyol0fmfxdqjschv9y13724vacgtomx20r0qcsttabml71w580p0u37mkeny1lcakonayvm9yphnuzl3m9kqaxxwjajxijjm8kn9ohqvaet7dzedphwgpjq3sonbq5oaetm0bc8z5bu0v4etfug06u1kd2huuuraguvnpvpxqmfxyvrgn3r2kq5essfl08hn762scmrt6lx9yyha02w6leber9ppyeo09ht9cgzpocxbre6bf5vbx1cgz0kzn',
                resourceIds: [],
                width: 201026,
                height: 968861,
                fit: 'CROP',
                sizes: { "foo" : "bar" },
                quality: 503,
                format: 'BMP',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd979eb1a-2cdc-42f4-8f05-5e02a46ccff2'));
    });

    test(`/REST:DELETE admin/attachment-family/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment-family/48364fae-033a-4028-a84c-f9f4ece719f3')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/attachment-family/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment-family/d979eb1a-2cdc-42f4-8f05-5e02a46ccff2')
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
                        id: '31561064-8313-4d86-916f-aa3dcb1518e5',
                        name: 'gegsyuki96q6abo18x7fcp174exsofq3rs736lashfomj6lon4qgfv0v6qoq6qoapieekzyau74darsatr1rlj094pl93rjmnbyw6ubp2eihuyec08gkobwp484k5atpwdiy6rts9clxw5wpzkrpokd3d5qkqc6v4wpoafdxw0f6lxynria6defi7zuzhzamwtfkwusrk8lgm9fqpcpyb710uwanfel3hxai9xysmk0uzk45tj8svfgu7thg5zv',
                        resourceIds: [],
                        width: 387021,
                        height: 737287,
                        fit: 'FREE_WIDTH',
                        sizes: { "foo" : "bar" },
                        quality: 665,
                        format: 'GIF',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAttachmentFamily).toHaveProperty('id', '31561064-8313-4d86-916f-aa3dcb1518e5');
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
                            id: '0fd929ef-ffce-4f2c-ad0d-ff9f244893cb'
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
                            id: 'd979eb1a-2cdc-42f4-8f05-5e02a46ccff2'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentFamily.id).toStrictEqual('d979eb1a-2cdc-42f4-8f05-5e02a46ccff2');
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
                    id: '2e18891c-0c21-4b88-a7fc-5cf10dffe5f7'
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
                    id: 'd979eb1a-2cdc-42f4-8f05-5e02a46ccff2'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentFamilyById.id).toStrictEqual('d979eb1a-2cdc-42f4-8f05-5e02a46ccff2');
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
                        
                        id: 'fc64ac04-4a7f-4a90-a4bb-d22b3a583dd7',
                        name: 'nyo7ufu7r4gpgdn5l0feplakdxgeynkyg3xtuo2fogrbmm6la913jfhremwi9yjak0n7zphazntfhnrghmjwctnz9blkisxtzzoit4vkyka46u6rd6f2c3sa1rpvozz78y6674b3b16a9oaf26hzrqhz7bl9znofuk6szyzaocis008w53h0pd8a6njs9yaa0fp5d0n2t1b5to7x82m2cocikpwnzg1zqkv5osoo9c1hnsi9zrwktxku1eu6khr',
                        resourceIds: [],
                        width: 305442,
                        height: 248868,
                        fit: 'FREE_HEIGHT',
                        sizes: { "foo" : "bar" },
                        quality: 358,
                        format: 'DATA_URL',
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
                        
                        id: 'd979eb1a-2cdc-42f4-8f05-5e02a46ccff2',
                        name: 'ejqjqdvkd11wfy265qiw5pq2phcw0qi4kc4tz42xt7arsfnt4luu7uijizou74dv78kfmx8iq68smovwd048epdl8n6xmp7trxue12zcayiqv74u6hcuz4ia5y6e05zzw1hwtqdxgfqfqlreqnwmmwx72d2psv5va1j8lkrxssu92xtp3sbpcrrstrkd3wbeh8zx3q87gn6wyfqhknda94s3ckoyzt92teez2pqozv787baxole4fe2vyd0gfbz',
                        resourceIds: [],
                        width: 570271,
                        height: 372006,
                        fit: 'FREE_WIDTH',
                        sizes: { "foo" : "bar" },
                        quality: 812,
                        format: 'JPG',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAttachmentFamily.id).toStrictEqual('d979eb1a-2cdc-42f4-8f05-5e02a46ccff2');
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
                    id: 'c00cd975-142b-4f3b-960b-f243156011f2'
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
                    id: 'd979eb1a-2cdc-42f4-8f05-5e02a46ccff2'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAttachmentFamilyById.id).toStrictEqual('d979eb1a-2cdc-42f4-8f05-5e02a46ccff2');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});