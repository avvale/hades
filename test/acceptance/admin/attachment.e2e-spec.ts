import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAttachmentRepository } from '@hades/admin/attachment/domain/attachment.repository';
import { MockAttachmentRepository } from '@hades/admin/attachment/infrastructure/mock/mock-attachment.repository';
import { AuthorizationGuard } from '../../../src/apps/shared/modules/auth/guards/authorization.guard';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// has OAuth
import { JwtModule } from '@nestjs/jwt';
import { IAccountRepository } from '@hades/iam/account/domain/account.repository';
import { MockAccountRepository } from '@hades/iam/account/infrastructure/mock/mock-account.repository';
import { IamModule } from './../../../src/apps/iam/iam.module';
import { TestingJwtService } from './../../../src/apps/o-auth/credential/services/testing-jwt.service';
import * as fs from 'fs';

const importForeignModules = [
    IamModule
];

describe('attachment', () =>
{
    let app: INestApplication;
    let repository: MockAttachmentRepository;
    let testJwt: string;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    AdminModule,
                    IamModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    }),
                    JwtModule.register({
                        privateKey: fs.readFileSync('src/oauth-private.key', 'utf8'),
                        publicKey: fs.readFileSync('src/oauth-public.key', 'utf8'),
                        signOptions: {
                            algorithm: 'RS256',
                        }
                    }),
                ],
                providers: [
                    TestingJwtService,
                ]
            })
            .overrideProvider(IAttachmentRepository)
            .useClass(MockAttachmentRepository)
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAttachmentRepository>module.get<IAttachmentRepository>(IAttachmentRepository);
        testJwt     =  module.get(TestingJwtService).getJwt();

        await app.init();
    });

    test(`/REST:POST admin/attachment - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                commonId: '5764863f-0cc8-4d61-bd98-eb876dee4b57',
                langId: '34e6678b-cb38-4abd-80de-cbedf09276a9',
                attachableModel: 'z',
                attachableId: '81656baf-dc8f-44e4-8525-6b9a7f16eb92',
                familyId: 'cb7fbf66-a82c-47bc-9f73-38005898506b',
                sort: 4,
                alt: 'f',
                title: 'i',
                description: 'Repellat provident earum et quam soluta laboriosam et odio. Animi non in itaque perspiciatis laborum fuga doloremque aperiam. Possimus aut tempore at quia non vitae quia non. Temporibus laboriosam error quas ex. Natus ipsa ducimus.',
                excerpt: 'Nemo suscipit nam nam soluta voluptatum. Accusantium nulla nihil quis. Vero autem minima consectetur quod vel quasi ut. Amet nam rerum aut. Qui autem ab molestiae quas.',
                name: 'i',
                pathname: '8',
                filename: 'y',
                url: 'o',
                mime: 's',
                extension: '7',
                size: 2,
                width: 6,
                height: 4,
                libraryId: '840b8df3-31d9-43e9-b96e-7ee069b3fc5c',
                libraryFilename: '8',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentCommonId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1256fb5f-c380-430e-9c63-a1818590792b',
                commonId: null,
                langId: '34e6678b-cb38-4abd-80de-cbedf09276a9',
                attachableModel: '3',
                attachableId: '81656baf-dc8f-44e4-8525-6b9a7f16eb92',
                familyId: 'cb7fbf66-a82c-47bc-9f73-38005898506b',
                sort: 2,
                alt: 'g',
                title: 'o',
                description: 'Alias et beatae et neque quibusdam quia sunt. Dolorem qui voluptatem eaque est blanditiis dolorem quos similique qui. Omnis sit qui placeat repellat nihil tempora magnam. Quas molestiae reiciendis quis. Mollitia omnis ut voluptatem voluptas suscipit error quia. Inventore tenetur ut consequuntur.',
                excerpt: 'Inventore molestiae quam ex. Neque voluptas libero debitis. Temporibus id doloremque aut optio. Doloremque dolores quia dolorem nemo deleniti ipsam est.',
                name: 'c',
                pathname: 'u',
                filename: 'z',
                url: '1',
                mime: 'v',
                extension: '1',
                size: 1,
                width: 6,
                height: 5,
                libraryId: '840b8df3-31d9-43e9-b96e-7ee069b3fc5c',
                libraryFilename: '1',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentCommonId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentLangId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1256fb5f-c380-430e-9c63-a1818590792b',
                commonId: '5764863f-0cc8-4d61-bd98-eb876dee4b57',
                langId: null,
                attachableModel: '8',
                attachableId: '81656baf-dc8f-44e4-8525-6b9a7f16eb92',
                familyId: 'cb7fbf66-a82c-47bc-9f73-38005898506b',
                sort: 9,
                alt: '2',
                title: 'k',
                description: 'Sequi amet facere et rerum velit consequatur. Sed voluptatem officiis beatae est nemo tempore consectetur. Mollitia eius omnis omnis tempore omnis alias. Corrupti est amet doloremque eveniet. Cumque et ipsam distinctio doloremque dicta amet maiores.',
                excerpt: 'Expedita atque sint unde. Et omnis molestiae molestiae sed. Delectus doloribus nihil facilis voluptatem qui. Voluptate nisi sed natus ut.',
                name: 'p',
                pathname: 'h',
                filename: 'u',
                url: 'w',
                mime: 'r',
                extension: 'k',
                size: 5,
                width: 3,
                height: 7,
                libraryId: '840b8df3-31d9-43e9-b96e-7ee069b3fc5c',
                libraryFilename: 'l',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLangId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableModel property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1256fb5f-c380-430e-9c63-a1818590792b',
                commonId: '5764863f-0cc8-4d61-bd98-eb876dee4b57',
                langId: '34e6678b-cb38-4abd-80de-cbedf09276a9',
                attachableModel: null,
                attachableId: '81656baf-dc8f-44e4-8525-6b9a7f16eb92',
                familyId: 'cb7fbf66-a82c-47bc-9f73-38005898506b',
                sort: 9,
                alt: 't',
                title: 'r',
                description: 'Aut praesentium quo non optio eius. Totam consequatur sed itaque et illo ab repudiandae doloribus aut. Ipsa cupiditate ut ab corporis occaecati dolore temporibus quidem. Rerum facilis sint asperiores. Nemo excepturi et ut iste ut. Voluptate maxime modi quia unde sed quisquam iusto.',
                excerpt: 'Asperiores quae sunt temporibus. Sunt et velit ducimus laborum similique non et voluptas debitis. Illum et autem quas quia et facilis rerum. Nostrum culpa in aut natus omnis ut.',
                name: 'i',
                pathname: '0',
                filename: 'q',
                url: 'e',
                mime: '3',
                extension: 's',
                size: 7,
                width: 6,
                height: 5,
                libraryId: '840b8df3-31d9-43e9-b96e-7ee069b3fc5c',
                libraryFilename: 'w',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableModel must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1256fb5f-c380-430e-9c63-a1818590792b',
                commonId: '5764863f-0cc8-4d61-bd98-eb876dee4b57',
                langId: '34e6678b-cb38-4abd-80de-cbedf09276a9',
                attachableModel: '0',
                attachableId: null,
                familyId: 'cb7fbf66-a82c-47bc-9f73-38005898506b',
                sort: 9,
                alt: 'a',
                title: 'n',
                description: 'Vero et inventore. Eligendi omnis voluptatem aspernatur deleniti iure necessitatibus nihil alias dolore. Omnis quia provident nihil quia est aliquam. Dolor facilis saepe ipsa corrupti ullam qui pariatur reprehenderit.',
                excerpt: 'Et eveniet occaecati ea nobis quae. Consequatur sequi et ratione inventore aut ut. In quia rerum impedit quos sit vel. Dolores ut nesciunt fuga maiores facere qui. Numquam et atque. Ea adipisci sequi natus vero quaerat dolore.',
                name: '3',
                pathname: 'z',
                filename: 's',
                url: 'h',
                mime: 'n',
                extension: '1',
                size: 1,
                width: 8,
                height: 1,
                libraryId: '840b8df3-31d9-43e9-b96e-7ee069b3fc5c',
                libraryFilename: 'v',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentName property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1256fb5f-c380-430e-9c63-a1818590792b',
                commonId: '5764863f-0cc8-4d61-bd98-eb876dee4b57',
                langId: '34e6678b-cb38-4abd-80de-cbedf09276a9',
                attachableModel: 'c',
                attachableId: '81656baf-dc8f-44e4-8525-6b9a7f16eb92',
                familyId: 'cb7fbf66-a82c-47bc-9f73-38005898506b',
                sort: 1,
                alt: 'n',
                title: 'd',
                description: 'Qui enim illo rerum magnam eos sunt. Iure natus atque adipisci suscipit. Ad provident ea ut nostrum fugit dolores est. Maxime voluptatem in deleniti in adipisci maxime tenetur est tempora. Pariatur neque dicta amet. Corporis assumenda nesciunt adipisci exercitationem autem et quas.',
                excerpt: 'Et est sunt sit soluta ullam quae sed. Magni dicta facere cupiditate et sit omnis quidem rerum ea. Omnis recusandae dolore earum.',
                name: null,
                pathname: 'm',
                filename: '2',
                url: 'h',
                mime: '3',
                extension: '3',
                size: 6,
                width: 4,
                height: 4,
                libraryId: '840b8df3-31d9-43e9-b96e-7ee069b3fc5c',
                libraryFilename: '5',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentName must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentPathname property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1256fb5f-c380-430e-9c63-a1818590792b',
                commonId: '5764863f-0cc8-4d61-bd98-eb876dee4b57',
                langId: '34e6678b-cb38-4abd-80de-cbedf09276a9',
                attachableModel: '6',
                attachableId: '81656baf-dc8f-44e4-8525-6b9a7f16eb92',
                familyId: 'cb7fbf66-a82c-47bc-9f73-38005898506b',
                sort: 2,
                alt: '1',
                title: 'p',
                description: 'Occaecati illo quibusdam ut pariatur rem cumque inventore nihil beatae. Voluptas in quia nemo dolore quia libero. Adipisci id ea non omnis. Sed quae suscipit eligendi sint voluptas ea impedit nostrum.',
                excerpt: 'Dolorem ad velit. Enim aut eius autem. Et quae explicabo tempore. Quia pariatur quis. Eos sunt ad dolorum distinctio rem.',
                name: '6',
                pathname: null,
                filename: 'd',
                url: 'g',
                mime: '5',
                extension: '4',
                size: 4,
                width: 1,
                height: 2,
                libraryId: '840b8df3-31d9-43e9-b96e-7ee069b3fc5c',
                libraryFilename: 'v',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentPathname must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentFilename property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1256fb5f-c380-430e-9c63-a1818590792b',
                commonId: '5764863f-0cc8-4d61-bd98-eb876dee4b57',
                langId: '34e6678b-cb38-4abd-80de-cbedf09276a9',
                attachableModel: '6',
                attachableId: '81656baf-dc8f-44e4-8525-6b9a7f16eb92',
                familyId: 'cb7fbf66-a82c-47bc-9f73-38005898506b',
                sort: 6,
                alt: 'p',
                title: 'd',
                description: 'Voluptas velit labore dolor id est molestiae odit tenetur. Voluptatem facilis consequatur sapiente. Et sit rerum. Sit dolorum ut.',
                excerpt: 'Nisi qui iure minus iste nesciunt saepe tempora. Est veniam aut adipisci. Distinctio iure amet.',
                name: 'w',
                pathname: '3',
                filename: null,
                url: 'z',
                mime: 'u',
                extension: '9',
                size: 3,
                width: 3,
                height: 9,
                libraryId: '840b8df3-31d9-43e9-b96e-7ee069b3fc5c',
                libraryFilename: '1',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFilename must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentUrl property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1256fb5f-c380-430e-9c63-a1818590792b',
                commonId: '5764863f-0cc8-4d61-bd98-eb876dee4b57',
                langId: '34e6678b-cb38-4abd-80de-cbedf09276a9',
                attachableModel: 'b',
                attachableId: '81656baf-dc8f-44e4-8525-6b9a7f16eb92',
                familyId: 'cb7fbf66-a82c-47bc-9f73-38005898506b',
                sort: 1,
                alt: 'y',
                title: '6',
                description: 'At dicta voluptatem sunt dicta necessitatibus ut quis. Voluptates ratione quis architecto id nostrum. Suscipit labore et non reiciendis repudiandae nam animi.',
                excerpt: 'Ut esse quasi quis. Mollitia atque aut placeat nihil in aliquid sint voluptatibus sed. Voluptatem voluptatem omnis illum quo. Magnam itaque occaecati ut et explicabo qui molestiae quia corrupti.',
                name: '5',
                pathname: 'm',
                filename: 'd',
                url: null,
                mime: '2',
                extension: 'k',
                size: 3,
                width: 2,
                height: 1,
                libraryId: '840b8df3-31d9-43e9-b96e-7ee069b3fc5c',
                libraryFilename: 'v',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentUrl must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentMime property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1256fb5f-c380-430e-9c63-a1818590792b',
                commonId: '5764863f-0cc8-4d61-bd98-eb876dee4b57',
                langId: '34e6678b-cb38-4abd-80de-cbedf09276a9',
                attachableModel: 'c',
                attachableId: '81656baf-dc8f-44e4-8525-6b9a7f16eb92',
                familyId: 'cb7fbf66-a82c-47bc-9f73-38005898506b',
                sort: 6,
                alt: '6',
                title: 'v',
                description: 'Velit ut consequatur quis. Et ea quasi pariatur ut corrupti neque illum optio. Iusto culpa id libero est minima natus sed voluptatum error. Voluptas velit tempore magnam consequatur autem doloremque hic earum. Exercitationem libero voluptatem et odio quae incidunt reiciendis.',
                excerpt: 'Dolorum est consequatur vel voluptatem ut voluptas rem nam ipsa. Debitis enim voluptatibus qui. Quo ipsam iusto deserunt. Dolorum ex est et consequuntur aut deleniti quidem deleniti qui. Autem magni occaecati quibusdam sed.',
                name: '8',
                pathname: '4',
                filename: 'u',
                url: 'm',
                mime: null,
                extension: '2',
                size: 7,
                width: 5,
                height: 9,
                libraryId: '840b8df3-31d9-43e9-b96e-7ee069b3fc5c',
                libraryFilename: '8',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentMime must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentSize property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1256fb5f-c380-430e-9c63-a1818590792b',
                commonId: '5764863f-0cc8-4d61-bd98-eb876dee4b57',
                langId: '34e6678b-cb38-4abd-80de-cbedf09276a9',
                attachableModel: '2',
                attachableId: '81656baf-dc8f-44e4-8525-6b9a7f16eb92',
                familyId: 'cb7fbf66-a82c-47bc-9f73-38005898506b',
                sort: 8,
                alt: 'q',
                title: 'v',
                description: 'Magnam veniam nisi repellat aperiam dolorem in fugit asperiores rerum. Harum sint veritatis omnis autem enim. Sunt vitae accusamus ipsum. Veritatis voluptatem et amet quaerat dolorem.',
                excerpt: 'Cumque totam ut non soluta libero quia similique id. Saepe voluptas illum. Iure error nemo. Dolorem ea qui tempora est. Quibusdam sint quae consectetur ea accusantium maxime deleniti dolorum. Corporis beatae quod.',
                name: 'b',
                pathname: 'g',
                filename: '7',
                url: '8',
                mime: 'd',
                extension: 'b',
                size: null,
                width: 6,
                height: 4,
                libraryId: '840b8df3-31d9-43e9-b96e-7ee069b3fc5c',
                libraryFilename: 'u',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentSize must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                commonId: '5764863f-0cc8-4d61-bd98-eb876dee4b57',
                langId: '34e6678b-cb38-4abd-80de-cbedf09276a9',
                attachableModel: 'p',
                attachableId: '81656baf-dc8f-44e4-8525-6b9a7f16eb92',
                familyId: 'cb7fbf66-a82c-47bc-9f73-38005898506b',
                sort: 9,
                alt: '6',
                title: 'r',
                description: 'Mollitia voluptatem nihil. Quis ut neque voluptatem dicta quia unde fugit quis. Quia ipsa voluptas laborum maxime excepturi. Tempora molestias voluptatem velit eveniet est quis.',
                excerpt: 'Eum id suscipit consequatur. Cupiditate omnis sunt ea dicta alias sapiente iusto est. Dolorem velit delectus. Labore enim iste est corporis necessitatibus maiores distinctio minima quo. Omnis quia et.',
                name: 'h',
                pathname: 'f',
                filename: 'b',
                url: '3',
                mime: '6',
                extension: 'p',
                size: 7,
                width: 2,
                height: 3,
                libraryId: '840b8df3-31d9-43e9-b96e-7ee069b3fc5c',
                libraryFilename: 'n',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentCommonId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1256fb5f-c380-430e-9c63-a1818590792b',
                langId: '34e6678b-cb38-4abd-80de-cbedf09276a9',
                attachableModel: 'd',
                attachableId: '81656baf-dc8f-44e4-8525-6b9a7f16eb92',
                familyId: 'cb7fbf66-a82c-47bc-9f73-38005898506b',
                sort: 4,
                alt: 'g',
                title: '5',
                description: 'Et voluptatem sed incidunt vel ipsa. Nam beatae laborum blanditiis molestias et culpa aspernatur temporibus. Vero assumenda impedit rem officia quo commodi praesentium. Laboriosam suscipit culpa earum quia minima. Quod placeat modi recusandae omnis fuga ex nihil.',
                excerpt: 'Consequatur qui non officiis qui illum omnis. Quaerat quos excepturi quia libero ducimus. Deserunt odio mollitia voluptatibus.',
                name: '7',
                pathname: 'x',
                filename: '5',
                url: 'u',
                mime: '5',
                extension: 'i',
                size: 2,
                width: 7,
                height: 4,
                libraryId: '840b8df3-31d9-43e9-b96e-7ee069b3fc5c',
                libraryFilename: '2',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentCommonId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentLangId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1256fb5f-c380-430e-9c63-a1818590792b',
                commonId: '5764863f-0cc8-4d61-bd98-eb876dee4b57',
                attachableModel: 'n',
                attachableId: '81656baf-dc8f-44e4-8525-6b9a7f16eb92',
                familyId: 'cb7fbf66-a82c-47bc-9f73-38005898506b',
                sort: 6,
                alt: 'h',
                title: 't',
                description: 'Aut at vero placeat. Sit eos minima. Aperiam et est nihil exercitationem veniam enim et deserunt. Commodi officia eaque labore nostrum vel. Nostrum velit voluptatem molestiae quia voluptas debitis sequi quidem. Voluptatibus vel minus velit aut vero dolorem sequi repellendus.',
                excerpt: 'Blanditiis nihil ab repellendus nostrum ut. Ipsa facere et quam. Nulla quaerat sunt quibusdam dolor architecto repudiandae autem odit quia. Deserunt ex odit. Et incidunt quo id dolor laudantium consequatur.',
                name: 'w',
                pathname: 'u',
                filename: 'h',
                url: 'c',
                mime: 'b',
                extension: 'm',
                size: 5,
                width: 5,
                height: 3,
                libraryId: '840b8df3-31d9-43e9-b96e-7ee069b3fc5c',
                libraryFilename: 's',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLangId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableModel property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1256fb5f-c380-430e-9c63-a1818590792b',
                commonId: '5764863f-0cc8-4d61-bd98-eb876dee4b57',
                langId: '34e6678b-cb38-4abd-80de-cbedf09276a9',
                attachableId: '81656baf-dc8f-44e4-8525-6b9a7f16eb92',
                familyId: 'cb7fbf66-a82c-47bc-9f73-38005898506b',
                sort: 4,
                alt: 'f',
                title: 'y',
                description: 'Itaque architecto eum aliquid nihil. Reprehenderit eius non maiores ipsa molestias sit nemo. Dicta ut commodi rerum et. Qui architecto sequi ipsam sit ut aspernatur ut.',
                excerpt: 'Provident aut eum quis facere. Magnam totam voluptatem. Et dolorem voluptatem quia voluptatibus commodi iure. Non est non voluptatem. Officiis consectetur voluptate ipsam vitae.',
                name: 'g',
                pathname: 't',
                filename: '0',
                url: 'w',
                mime: 'p',
                extension: 'g',
                size: 7,
                width: 8,
                height: 4,
                libraryId: '840b8df3-31d9-43e9-b96e-7ee069b3fc5c',
                libraryFilename: 's',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableModel must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1256fb5f-c380-430e-9c63-a1818590792b',
                commonId: '5764863f-0cc8-4d61-bd98-eb876dee4b57',
                langId: '34e6678b-cb38-4abd-80de-cbedf09276a9',
                attachableModel: 'v',
                familyId: 'cb7fbf66-a82c-47bc-9f73-38005898506b',
                sort: 1,
                alt: 'd',
                title: 'k',
                description: 'Culpa in ut. Sint quia ullam. Quia et odio deleniti aut quidem possimus consequatur qui. Sint hic ut magni non. Nisi occaecati et accusantium maxime eum. Rem omnis vitae optio eum.',
                excerpt: 'Voluptatem ipsum totam porro doloribus facere eaque. Voluptatibus autem consequatur et repellat sunt iusto esse. Earum et ex non aut et voluptas nihil et quia.',
                name: 'q',
                pathname: 'n',
                filename: '8',
                url: 'u',
                mime: 'b',
                extension: '5',
                size: 3,
                width: 5,
                height: 8,
                libraryId: '840b8df3-31d9-43e9-b96e-7ee069b3fc5c',
                libraryFilename: 'g',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentName property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1256fb5f-c380-430e-9c63-a1818590792b',
                commonId: '5764863f-0cc8-4d61-bd98-eb876dee4b57',
                langId: '34e6678b-cb38-4abd-80de-cbedf09276a9',
                attachableModel: 'x',
                attachableId: '81656baf-dc8f-44e4-8525-6b9a7f16eb92',
                familyId: 'cb7fbf66-a82c-47bc-9f73-38005898506b',
                sort: 1,
                alt: 'd',
                title: '6',
                description: 'Magnam voluptatem et inventore voluptatem non sint commodi delectus. Aspernatur debitis labore eum excepturi. Delectus saepe rem sunt ut. Itaque illo cumque totam incidunt et. Cumque commodi aut magnam corrupti dicta.',
                excerpt: 'Repellendus harum aut aut debitis. Impedit ipsum officiis est est ducimus consequatur asperiores hic ut. Praesentium dolores vero est rerum aut distinctio voluptas neque rerum. Est voluptatum esse omnis dolorem officia.',
                pathname: 'r',
                filename: 'z',
                url: 'q',
                mime: 'b',
                extension: '5',
                size: 1,
                width: 4,
                height: 2,
                libraryId: '840b8df3-31d9-43e9-b96e-7ee069b3fc5c',
                libraryFilename: 'g',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentName must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentPathname property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1256fb5f-c380-430e-9c63-a1818590792b',
                commonId: '5764863f-0cc8-4d61-bd98-eb876dee4b57',
                langId: '34e6678b-cb38-4abd-80de-cbedf09276a9',
                attachableModel: 'v',
                attachableId: '81656baf-dc8f-44e4-8525-6b9a7f16eb92',
                familyId: 'cb7fbf66-a82c-47bc-9f73-38005898506b',
                sort: 1,
                alt: 'x',
                title: 'u',
                description: 'Modi voluptates nisi. Est omnis et quod nulla sed soluta tempora ipsam praesentium. Provident nulla placeat repellendus ab magnam assumenda voluptatem cum.',
                excerpt: 'Natus qui cumque officia officia repellendus. Cumque architecto ab natus molestiae et minima et eligendi. Assumenda corporis omnis ut natus quisquam unde eius vel. Commodi mollitia omnis esse in molestiae repudiandae blanditiis autem quis. Omnis ea omnis dolorem laboriosam aut ut.',
                name: 'b',
                filename: 's',
                url: '7',
                mime: '2',
                extension: 'm',
                size: 4,
                width: 5,
                height: 2,
                libraryId: '840b8df3-31d9-43e9-b96e-7ee069b3fc5c',
                libraryFilename: 'g',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentPathname must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentFilename property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1256fb5f-c380-430e-9c63-a1818590792b',
                commonId: '5764863f-0cc8-4d61-bd98-eb876dee4b57',
                langId: '34e6678b-cb38-4abd-80de-cbedf09276a9',
                attachableModel: 'p',
                attachableId: '81656baf-dc8f-44e4-8525-6b9a7f16eb92',
                familyId: 'cb7fbf66-a82c-47bc-9f73-38005898506b',
                sort: 8,
                alt: 'x',
                title: 'f',
                description: 'Fugit expedita quis sit ea. Impedit cum hic quo. Quasi recusandae at laboriosam tempora esse qui.',
                excerpt: 'Voluptatem voluptatem natus ut. Et est qui est assumenda vitae maxime quo. Et possimus at maiores veniam provident libero voluptate saepe. Libero asperiores numquam rerum excepturi animi aperiam voluptas occaecati.',
                name: 'v',
                pathname: 'l',
                url: 'q',
                mime: 'b',
                extension: 'v',
                size: 1,
                width: 4,
                height: 9,
                libraryId: '840b8df3-31d9-43e9-b96e-7ee069b3fc5c',
                libraryFilename: '2',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFilename must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentUrl property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1256fb5f-c380-430e-9c63-a1818590792b',
                commonId: '5764863f-0cc8-4d61-bd98-eb876dee4b57',
                langId: '34e6678b-cb38-4abd-80de-cbedf09276a9',
                attachableModel: 'r',
                attachableId: '81656baf-dc8f-44e4-8525-6b9a7f16eb92',
                familyId: 'cb7fbf66-a82c-47bc-9f73-38005898506b',
                sort: 5,
                alt: 'q',
                title: 's',
                description: 'Dolor eaque sequi quis aut aliquid delectus optio quod rerum. Repellendus veritatis praesentium eum. Labore quia iste aut natus suscipit qui. Molestiae eius debitis. Sed dignissimos facilis. Itaque enim omnis cupiditate qui quia dolorem repellendus.',
                excerpt: 'Quia illum inventore nisi iusto excepturi eum voluptatem inventore et. Vero dolor consequatur doloremque quae ea et architecto minus laborum. Vel rem ea ea autem. Blanditiis nesciunt delectus sed qui. Ut doloribus possimus nulla sit eum voluptatum.',
                name: 'b',
                pathname: '2',
                filename: 'z',
                mime: 'g',
                extension: 's',
                size: 6,
                width: 1,
                height: 8,
                libraryId: '840b8df3-31d9-43e9-b96e-7ee069b3fc5c',
                libraryFilename: 'n',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentUrl must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentMime property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1256fb5f-c380-430e-9c63-a1818590792b',
                commonId: '5764863f-0cc8-4d61-bd98-eb876dee4b57',
                langId: '34e6678b-cb38-4abd-80de-cbedf09276a9',
                attachableModel: 'o',
                attachableId: '81656baf-dc8f-44e4-8525-6b9a7f16eb92',
                familyId: 'cb7fbf66-a82c-47bc-9f73-38005898506b',
                sort: 1,
                alt: 'g',
                title: 'y',
                description: 'Animi qui perspiciatis provident sint. Cupiditate est beatae in mollitia consequatur voluptates molestiae. Sit libero vero voluptas ut. Amet vel voluptate odit excepturi fugiat voluptates quo voluptatem. Alias eaque harum ab vitae aperiam velit. Repellendus qui qui facilis quas.',
                excerpt: 'Quidem qui nisi voluptatem sit magnam hic voluptatem assumenda. Voluptatem rem sunt veniam modi debitis natus dolore vero. Corporis qui quibusdam quidem adipisci ut culpa et cumque quibusdam.',
                name: 'a',
                pathname: '1',
                filename: 'm',
                url: '7',
                extension: 'l',
                size: 6,
                width: 4,
                height: 5,
                libraryId: '840b8df3-31d9-43e9-b96e-7ee069b3fc5c',
                libraryFilename: '6',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentMime must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentSize property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1256fb5f-c380-430e-9c63-a1818590792b',
                commonId: '5764863f-0cc8-4d61-bd98-eb876dee4b57',
                langId: '34e6678b-cb38-4abd-80de-cbedf09276a9',
                attachableModel: 'b',
                attachableId: '81656baf-dc8f-44e4-8525-6b9a7f16eb92',
                familyId: 'cb7fbf66-a82c-47bc-9f73-38005898506b',
                sort: 8,
                alt: 'l',
                title: 'm',
                description: 'Et mollitia dolores dicta commodi. Culpa consequatur alias unde aliquid nemo vel. Est excepturi cupiditate minima. Iure eum dolore aut pariatur. Quo voluptate error dignissimos et.',
                excerpt: 'Autem commodi consequuntur et error tenetur aut. Quia ea aut. Voluptatem quae quia doloribus architecto ullam eaque.',
                name: '6',
                pathname: 'v',
                filename: 's',
                url: 'j',
                mime: 't',
                extension: 'x',
                width: 3,
                height: 9,
                libraryId: '840b8df3-31d9-43e9-b96e-7ee069b3fc5c',
                libraryFilename: 'c',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentSize must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fjn64s3ttnozyh31a267ul4ybxvcb4stqqcq4',
                commonId: '5764863f-0cc8-4d61-bd98-eb876dee4b57',
                langId: '34e6678b-cb38-4abd-80de-cbedf09276a9',
                attachableModel: 'f',
                attachableId: '81656baf-dc8f-44e4-8525-6b9a7f16eb92',
                familyId: 'cb7fbf66-a82c-47bc-9f73-38005898506b',
                sort: 8,
                alt: 'y',
                title: '4',
                description: 'Rem veniam corporis iusto tenetur at et hic. Facilis dolorem natus alias laborum. Quaerat in voluptatem rem libero tempore rerum. Inventore odio quia qui velit expedita deserunt aspernatur culpa. Labore rem corrupti incidunt repellendus.',
                excerpt: 'Sit sint culpa eaque. Qui sed cumque. Unde quod culpa est eius atque rerum. Et autem illo sint eum qui veritatis blanditiis magnam molestiae.',
                name: 'i',
                pathname: 'j',
                filename: 'h',
                url: '7',
                mime: '4',
                extension: 'z',
                size: 7,
                width: 8,
                height: 6,
                libraryId: '840b8df3-31d9-43e9-b96e-7ee069b3fc5c',
                libraryFilename: 's',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentCommonId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1256fb5f-c380-430e-9c63-a1818590792b',
                commonId: '1pmem293lg3p3jklso3gihwicqpac8y91xp4k',
                langId: '34e6678b-cb38-4abd-80de-cbedf09276a9',
                attachableModel: 's',
                attachableId: '81656baf-dc8f-44e4-8525-6b9a7f16eb92',
                familyId: 'cb7fbf66-a82c-47bc-9f73-38005898506b',
                sort: 6,
                alt: '2',
                title: 't',
                description: 'Nihil odio officia soluta quis omnis porro eaque. Dolores aut nam temporibus. Ullam quia nihil quis debitis eum est sunt recusandae. Qui delectus officia voluptate perspiciatis.',
                excerpt: 'Ad quidem iusto. Fugit aperiam molestias omnis sapiente veniam architecto. Officiis et tempore. Delectus rerum incidunt blanditiis repudiandae id ratione distinctio fugiat. Ullam corrupti veritatis dolorem occaecati accusamus voluptatum et. Quo totam fugit cum ut neque ea porro.',
                name: 'z',
                pathname: 'p',
                filename: 'f',
                url: 'b',
                mime: '1',
                extension: 'u',
                size: 4,
                width: 8,
                height: 8,
                libraryId: '840b8df3-31d9-43e9-b96e-7ee069b3fc5c',
                libraryFilename: 'v',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentCommonId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentLangId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1256fb5f-c380-430e-9c63-a1818590792b',
                commonId: '5764863f-0cc8-4d61-bd98-eb876dee4b57',
                langId: 'tyuk07t4yu01rxb9d46npq4cpnlr6b6h9zo8p',
                attachableModel: 'g',
                attachableId: '81656baf-dc8f-44e4-8525-6b9a7f16eb92',
                familyId: 'cb7fbf66-a82c-47bc-9f73-38005898506b',
                sort: 9,
                alt: '3',
                title: 'e',
                description: 'Sunt incidunt nobis voluptatem qui necessitatibus voluptatem saepe. Repellat earum nam hic quam ducimus. Voluptatem consequatur beatae et nisi aliquid aut. Ut omnis exercitationem ipsum corrupti aut perferendis perspiciatis quaerat et. Temporibus laudantium temporibus non reiciendis sit. Molestiae a officiis sed.',
                excerpt: 'Ea possimus ut quidem corporis hic ipsam consectetur sed magni. Voluptas ut esse amet. Dolorem ut doloremque qui aut animi corrupti. Repellendus reiciendis molestiae non quis voluptatem sunt molestiae eos. Laborum voluptate suscipit consectetur molestias. Eius id doloribus.',
                name: 'r',
                pathname: 'i',
                filename: 'x',
                url: 'n',
                mime: 'y',
                extension: 'o',
                size: 9,
                width: 6,
                height: 3,
                libraryId: '840b8df3-31d9-43e9-b96e-7ee069b3fc5c',
                libraryFilename: '6',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLangId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1256fb5f-c380-430e-9c63-a1818590792b',
                commonId: '5764863f-0cc8-4d61-bd98-eb876dee4b57',
                langId: '34e6678b-cb38-4abd-80de-cbedf09276a9',
                attachableModel: 't',
                attachableId: 'zvw3t0ecu5k3gynw5qmb2uvh0e2t3tdb1pz34',
                familyId: 'cb7fbf66-a82c-47bc-9f73-38005898506b',
                sort: 3,
                alt: 'w',
                title: '2',
                description: 'Vel voluptas vel aut. Harum distinctio corporis rerum assumenda sed saepe adipisci quis. Cupiditate enim in molestiae quisquam natus earum consequatur dolore repudiandae. Veniam qui est. Autem eius molestiae quaerat.',
                excerpt: 'Natus pariatur sunt nam dicta nam debitis beatae odio. Rerum eos labore ullam quia. Officia sed modi autem optio a similique. Voluptas fugiat libero quasi qui occaecati totam sit. Ut minus repellat eos ea exercitationem dicta ut. Reprehenderit quia quae officia eum ratione quo.',
                name: 'w',
                pathname: 'c',
                filename: 'e',
                url: 'b',
                mime: '7',
                extension: 'k',
                size: 2,
                width: 6,
                height: 4,
                libraryId: '840b8df3-31d9-43e9-b96e-7ee069b3fc5c',
                libraryFilename: 'x',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentFamilyId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1256fb5f-c380-430e-9c63-a1818590792b',
                commonId: '5764863f-0cc8-4d61-bd98-eb876dee4b57',
                langId: '34e6678b-cb38-4abd-80de-cbedf09276a9',
                attachableModel: '2',
                attachableId: '81656baf-dc8f-44e4-8525-6b9a7f16eb92',
                familyId: '9s0c5zti0uq48umfendhevwzw4r9ydx8dphf2',
                sort: 3,
                alt: '6',
                title: 'o',
                description: 'Et voluptate in sunt. Perspiciatis neque ipsam aut atque. Delectus ut quo consequatur et qui soluta est maiores. Repellat quis quis et nam totam in.',
                excerpt: 'Maiores ut cum ut nulla eos quae voluptatum et. Necessitatibus ullam et et veniam rerum. Mollitia non explicabo. Molestias quia sequi voluptatem eum. Velit inventore sequi.',
                name: 'k',
                pathname: 'l',
                filename: 's',
                url: '9',
                mime: 'i',
                extension: 'h',
                size: 1,
                width: 3,
                height: 2,
                libraryId: '840b8df3-31d9-43e9-b96e-7ee069b3fc5c',
                libraryFilename: 'i',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentLibraryId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1256fb5f-c380-430e-9c63-a1818590792b',
                commonId: '5764863f-0cc8-4d61-bd98-eb876dee4b57',
                langId: '34e6678b-cb38-4abd-80de-cbedf09276a9',
                attachableModel: 'a',
                attachableId: '81656baf-dc8f-44e4-8525-6b9a7f16eb92',
                familyId: 'cb7fbf66-a82c-47bc-9f73-38005898506b',
                sort: 3,
                alt: '7',
                title: '2',
                description: 'Et molestiae qui voluptas optio iusto praesentium. A a aut dolorem quia. Eius voluptates quis dignissimos.',
                excerpt: 'Autem alias autem tempora aliquam omnis quod eos. Numquam aut libero. Sit nobis consequatur doloremque sed. Nihil maxime exercitationem cumque assumenda assumenda. Repellendus in aliquid iure aut expedita cum dolore.',
                name: 'j',
                pathname: 'y',
                filename: 'i',
                url: 't',
                mime: 'l',
                extension: 's',
                size: 6,
                width: 7,
                height: 1,
                libraryId: 'juf8wkpluen3wijw9ldb9so7cc40odjn6ntiw',
                libraryFilename: '2',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableModel is too large, has a maximum length of 75`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1256fb5f-c380-430e-9c63-a1818590792b',
                commonId: '5764863f-0cc8-4d61-bd98-eb876dee4b57',
                langId: '34e6678b-cb38-4abd-80de-cbedf09276a9',
                attachableModel: '4kcwbqjbs1miszecxktuvx9puej54qavbm539bmefrocop9qz98sni7ntdu2gs44tnfdssyugpk1',
                attachableId: '81656baf-dc8f-44e4-8525-6b9a7f16eb92',
                familyId: 'cb7fbf66-a82c-47bc-9f73-38005898506b',
                sort: 3,
                alt: 'k',
                title: 'c',
                description: 'Aliquid ut quas. Aut nostrum non dolorem veritatis corrupti. Accusantium corrupti quia qui consequatur veniam rerum labore magnam. Odio non quia adipisci non impedit assumenda consequatur eos. Ducimus dolore aut voluptate. Omnis dolorem tempora sed cumque.',
                excerpt: 'Quos ea qui voluptate quo accusamus. Nihil in et delectus libero. Vel rerum nesciunt a dolorum omnis nostrum ad.',
                name: 'u',
                pathname: '0',
                filename: '9',
                url: '4',
                mime: 's',
                extension: 'q',
                size: 3,
                width: 6,
                height: 7,
                libraryId: '840b8df3-31d9-43e9-b96e-7ee069b3fc5c',
                libraryFilename: '0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableModel is too large, has a maximum length of 75');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentSort is too large, has a maximum length of 6`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1256fb5f-c380-430e-9c63-a1818590792b',
                commonId: '5764863f-0cc8-4d61-bd98-eb876dee4b57',
                langId: '34e6678b-cb38-4abd-80de-cbedf09276a9',
                attachableModel: 'm',
                attachableId: '81656baf-dc8f-44e4-8525-6b9a7f16eb92',
                familyId: 'cb7fbf66-a82c-47bc-9f73-38005898506b',
                sort: 6525970,
                alt: 'l',
                title: '8',
                description: 'Modi et et ipsa ex autem et sunt quidem vel. Eligendi commodi voluptas nihil ut ullam. Architecto nemo est maxime velit dicta voluptatem error.',
                excerpt: 'Sunt explicabo dignissimos. Assumenda et eum accusantium nihil et. Quam eligendi cupiditate omnis tempora atque. Voluptates vitae quod.',
                name: 'p',
                pathname: 'z',
                filename: '2',
                url: '5',
                mime: 'p',
                extension: '2',
                size: 1,
                width: 4,
                height: 7,
                libraryId: '840b8df3-31d9-43e9-b96e-7ee069b3fc5c',
                libraryFilename: 'z',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentSort is too large, has a maximum length of 6');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAlt is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1256fb5f-c380-430e-9c63-a1818590792b',
                commonId: '5764863f-0cc8-4d61-bd98-eb876dee4b57',
                langId: '34e6678b-cb38-4abd-80de-cbedf09276a9',
                attachableModel: 'a',
                attachableId: '81656baf-dc8f-44e4-8525-6b9a7f16eb92',
                familyId: 'cb7fbf66-a82c-47bc-9f73-38005898506b',
                sort: 4,
                alt: 'f460czayym90scmku4fuyxti6vah75g8uji1tralx1ry4wii2o0o3v7ltummth13std37odz9vkfzs3gqlsfronckgg4kx5kh2bxxa21rcy0ubtvycwgqbkrxtck2yvxl1h7ts1mise17vuzvwlogkng7oyrrsslb8yqgvi6yudze7c8s1xd3ie8yac34d3ewiaqqdf1paqkb6jpz5ux6ghs8mv9u1nn62lmurahl98bnp9mq6ngrbasqvjefd8w',
                title: 'l',
                description: 'Libero magni ducimus inventore. Natus tempora laborum accusantium expedita veritatis vero. Atque rerum impedit quia dolor sed et tenetur.',
                excerpt: 'Dolore amet non. Velit adipisci qui quia consequatur sit odio natus consequatur. Tempora autem cum tempore unde. Inventore quae id molestiae voluptas error. Eum veniam et ratione. Error est fugiat dolorum consequatur.',
                name: 'l',
                pathname: 'c',
                filename: 'e',
                url: 'e',
                mime: 'j',
                extension: 't',
                size: 9,
                width: 9,
                height: 6,
                libraryId: '840b8df3-31d9-43e9-b96e-7ee069b3fc5c',
                libraryFilename: '8',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAlt is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentTitle is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1256fb5f-c380-430e-9c63-a1818590792b',
                commonId: '5764863f-0cc8-4d61-bd98-eb876dee4b57',
                langId: '34e6678b-cb38-4abd-80de-cbedf09276a9',
                attachableModel: 'l',
                attachableId: '81656baf-dc8f-44e4-8525-6b9a7f16eb92',
                familyId: 'cb7fbf66-a82c-47bc-9f73-38005898506b',
                sort: 5,
                alt: 'y',
                title: 'twzket2v4jid1l53n6b61hrwq8nqz1k9lyresziz1izwwwmcved4zqp8ajbckv8qiezbwbqf9g6kazulhgzxd1pz0p8gommvsaurvjm84pksdxwjbbh86adjgpt0ycans6oh53d9gkpuc7uy7bvb4pdb4j76tpd0ltgviclewcxzvm4tge9iy7okzk8lv28p346m7296czfl5xx4hg3by3xhuged8x3phafcrgyf489zlzrpkjpnj9plajo8l1ke',
                description: 'Quia esse cumque nesciunt vel ex excepturi sint labore. Magni veritatis ut exercitationem. Quas quam assumenda tempora eum. Dolores beatae blanditiis officiis asperiores quaerat voluptatem nemo illo. Commodi qui repellat harum voluptatem quam ut.',
                excerpt: 'Voluptatem reprehenderit et facilis velit earum. Aliquam rerum vel et magnam. Asperiores omnis et repellat. Alias qui culpa est. Quos alias ut veritatis natus qui. Neque voluptas provident.',
                name: 'v',
                pathname: 'w',
                filename: '6',
                url: 'y',
                mime: 'g',
                extension: 'd',
                size: 5,
                width: 1,
                height: 4,
                libraryId: '840b8df3-31d9-43e9-b96e-7ee069b3fc5c',
                libraryFilename: 'i',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentTitle is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentName is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1256fb5f-c380-430e-9c63-a1818590792b',
                commonId: '5764863f-0cc8-4d61-bd98-eb876dee4b57',
                langId: '34e6678b-cb38-4abd-80de-cbedf09276a9',
                attachableModel: '1',
                attachableId: '81656baf-dc8f-44e4-8525-6b9a7f16eb92',
                familyId: 'cb7fbf66-a82c-47bc-9f73-38005898506b',
                sort: 7,
                alt: 'r',
                title: 'y',
                description: 'Qui quo corrupti aliquam ea aut accusantium optio. Dignissimos explicabo et consequuntur aut aspernatur et. Veniam et sit qui.',
                excerpt: 'Odio ratione esse in odio omnis ab voluptas. Nulla est et blanditiis esse cum molestiae tempore quisquam vel. Explicabo explicabo tempora unde exercitationem fugit illum qui sunt unde.',
                name: 'w8jawfn7qp4ikpqqxyq1nqkp9iwpy0pfzrnlsmspahu1ls3s3y59l4zfbmypjybnx0sn72cxfuvvg3bmxdfk853fqyoaqqlros74ygtpi7abdvsz6o9amzw2c6pqhl694g6x4yfhj4qudxkwt3qgwu4ef6ib7s99cbg54ns5tn0ilaaelf1zfj1m7t6uv6bxohloslk54od6qugpan3ta6u210dfjx7e8f4fvstjumshujzqdgicih8y5zqgd0wz',
                pathname: '1',
                filename: 'n',
                url: 'k',
                mime: 'm',
                extension: 'd',
                size: 8,
                width: 1,
                height: 6,
                libraryId: '840b8df3-31d9-43e9-b96e-7ee069b3fc5c',
                libraryFilename: 's',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentName is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentPathname is too large, has a maximum length of 1024`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1256fb5f-c380-430e-9c63-a1818590792b',
                commonId: '5764863f-0cc8-4d61-bd98-eb876dee4b57',
                langId: '34e6678b-cb38-4abd-80de-cbedf09276a9',
                attachableModel: 'k',
                attachableId: '81656baf-dc8f-44e4-8525-6b9a7f16eb92',
                familyId: 'cb7fbf66-a82c-47bc-9f73-38005898506b',
                sort: 4,
                alt: 's',
                title: 'g',
                description: 'Sit eos occaecati. Minus molestias id magnam sit. Repellendus possimus aut esse delectus aut. Dolores modi et quis rem modi voluptas quam. Et optio ratione velit amet beatae hic omnis. Nam sunt vel expedita consequatur aut maiores aliquid.',
                excerpt: 'Cumque occaecati quae veritatis. Magnam soluta laudantium consectetur dolores non. Quibusdam labore laudantium sint molestiae eos tempore quidem maxime sapiente. Voluptate voluptas quod iste rerum et impedit laborum. Numquam quod et assumenda enim eum.',
                name: 'w',
                pathname: '79fmdn1fjds8dqigv22f87insmcgfl97w5i5iws0wc210cyvfyr5m3f1r0aho4cdc30r6kplxanbt2q40ikzzby5efsrheitaj4fcdjmf2378bookefjqt2wmu822p7s93t6np7olhy4bofe2dwlqh08j3rmxts495wlqua36tonv6chiam0v81cw7hlw55o72escpa42thqf9jdqljj0hxlmp7uhd18pmf03m7mu8mtt7dkpkvmyo2bmqbjip4nrx6opwbbxyrfm4bhevgvnzfwm9hnu24ku2zd6m0fk5j27g0btiske6v5mol0gkoou1bg9grsa64p7omfdxl7jo7t1hgvltmza08zj5dc6vyh3uxtp16e7rf95o5r7rtzklfa8rjumlxfg24neze6swx89tgkg8f5x49p84azbficprzq6oxco3wmqycnh9zmmfir71z8pgd8k5utk2zowmbqh786t903q7ocjytrxwvhhijv0i2qeeoftjf6f1t2jalg6ea6p6wcs03nz96yke0h1mq8j34byq7cy0g61eugatkducufqqiqyegka3agayya9ncegmu4wz5y65uviwlgkiueaoc9pni8zy4woslta8593yeq38i6h7iw1n7s0eho8eoax6krgih4cjer76j8bse68oezdub66zxotucr4id28jpneph9yo1d2c3khd3wshx7gh8n35prkkuywaafnhtbkxpr2q72jqxwdajpm87r2lf0bhoo2cz0ak0zbaosv4zox6p829hkfesdjq7q68trboc7t0d8b7bml3yh0rrjjqtormac7yhsjnlc01pu8qg8hot5x87p51q5zep8cot1fjwebevfzpdujakxeybqzr4lg2x7lk3xjxyk272m710wz5flspmcuhnf2thwhp9ot3qhrhg0g1kcmp89i5jxg94frz8dmkz5dpg9gq9n6ner2js1ioudyat7rev4tjh39umogc0x4pfiudw67g455d68humz7qf1eaxin',
                filename: 'e',
                url: 'o',
                mime: 'o',
                extension: 't',
                size: 4,
                width: 9,
                height: 9,
                libraryId: '840b8df3-31d9-43e9-b96e-7ee069b3fc5c',
                libraryFilename: 'w',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentPathname is too large, has a maximum length of 1024');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentFilename is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1256fb5f-c380-430e-9c63-a1818590792b',
                commonId: '5764863f-0cc8-4d61-bd98-eb876dee4b57',
                langId: '34e6678b-cb38-4abd-80de-cbedf09276a9',
                attachableModel: 'l',
                attachableId: '81656baf-dc8f-44e4-8525-6b9a7f16eb92',
                familyId: 'cb7fbf66-a82c-47bc-9f73-38005898506b',
                sort: 4,
                alt: 'q',
                title: 'v',
                description: 'Unde dignissimos eos et nobis nihil quia quis id deleniti. Labore saepe quia et veritatis error quibusdam nihil similique in. Et voluptatem voluptas pariatur qui. Iste nemo quia.',
                excerpt: 'Quos rerum ut in harum. Veritatis consequatur eius culpa error. Sed esse quidem voluptates impedit autem. Sit sed vero eum velit consequatur. Mollitia quia ut voluptatem libero nostrum nihil magnam temporibus totam. Cum nemo et non quidem nisi qui pariatur.',
                name: 'n',
                pathname: 'n',
                filename: '7hgglt950amuel1xgax0cl2yfkcq078a4aobxiz7dxas859hlxk3h2pg3lw2rkn27n7brfa33xjuy2c0zuxmyxdb9ypakusjlkp34h9lcjffpiud3tvrbgs9df1tcsg0y0ethzbaxt2spb9lkwigekgom8ehpkucbz9qmbey11wt6viam4zock3lzp8vnxgnm7batroydj9chcq0ma8gc1ec0kijlkobdqklxbt00nk3kne69x9608da0758zwpm',
                url: '9',
                mime: 't',
                extension: 'o',
                size: 2,
                width: 8,
                height: 2,
                libraryId: '840b8df3-31d9-43e9-b96e-7ee069b3fc5c',
                libraryFilename: '3',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFilename is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentUrl is too large, has a maximum length of 1024`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1256fb5f-c380-430e-9c63-a1818590792b',
                commonId: '5764863f-0cc8-4d61-bd98-eb876dee4b57',
                langId: '34e6678b-cb38-4abd-80de-cbedf09276a9',
                attachableModel: 'a',
                attachableId: '81656baf-dc8f-44e4-8525-6b9a7f16eb92',
                familyId: 'cb7fbf66-a82c-47bc-9f73-38005898506b',
                sort: 4,
                alt: '5',
                title: 'h',
                description: 'Qui recusandae quo et cum consequatur ipsam. Explicabo velit qui asperiores eveniet sint sit et consequuntur. Ratione sit praesentium ratione labore molestias occaecati.',
                excerpt: 'Quas sed sapiente minima et omnis ratione beatae ratione esse. Dolor omnis ea. Incidunt debitis natus aut voluptatem vitae et qui voluptates aut. Numquam magnam accusamus voluptatem molestiae amet earum.',
                name: 'o',
                pathname: 'j',
                filename: 'q',
                url: 'adbrnrlkvxgltuugnszdoe4v4cu7zw1ipa8818vajfq9zoz6f1pil7e4c3rcblezmqoc7giy8aal46w7n5nu677unsbcid1jzw48xw626fh5xaremglb032w955c2c7visfszrrae8sjv0wecyh8d8xkepar7ctpzkzk876fokbzt89o5uo97j0d5x6kgvj7jg2gprulktr2m8tionp2dfuvyhkfw7ae8f8xd5x3ar8x41nt7x5r0ks9a5r1ev89r8wnpcr0se59gbwx6ne318v40gb34s2lbpna9ts4id0cy81v4u6qjinpatusckoochj11o4rz5xw2iag836ty6eq5t5qabmj2y62zusu9x9k9q1b6e47vcsgl0qpgwj2h22l95mjfxjuuo9ihjte6mha2exluq8n76zjxzvge6g0s7d5swz62bhk21hyqs1kilolnyo9r948llrxgeki2ciz9anyrmppk3cqvrnrn8jk0ha0s5i86e8jvqdcn143sw5zoxxpl9adfah64trjk0o7cdwxpwtpbv2dpohgi6xzv3i5axp49cuc1tkkuu5ik5ky7cyxwowy0dllkwwrw43cu088pllsxj86w7d7h7z89gdkt2fn5kqt8surj2vfuok53oubp3r42sr4g0wdc5of50f538evql5bp622ol3b7sovomar175p3gaujp18b0zfp7l5lq8an3dzac2a92yjv432s8irzy8btp4ekem1fusx4u4c3cuev3zecp8nqtj3zuip70z2ht7w0ck4r9wdnn1613qru3ak02bxda1jfpo7o92t9j1hu1iu0gk5yckpkh3x155vf3kisasgjjhynmw43rkr8n3syqd424frwms6giba3yb58qmpzzuxzfe91yahhdh75i4mlir7inr1evk3bz017up8n1km1lvactp51iti7gncjhqifustvlr8cijb34yjdu8tc0gj0hqjfyast44tqm985avkyqr3zeagfv51yzv4j6b800d20',
                mime: 'w',
                extension: '9',
                size: 5,
                width: 3,
                height: 2,
                libraryId: '840b8df3-31d9-43e9-b96e-7ee069b3fc5c',
                libraryFilename: 'm',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentUrl is too large, has a maximum length of 1024');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentMime is too large, has a maximum length of 50`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1256fb5f-c380-430e-9c63-a1818590792b',
                commonId: '5764863f-0cc8-4d61-bd98-eb876dee4b57',
                langId: '34e6678b-cb38-4abd-80de-cbedf09276a9',
                attachableModel: 'h',
                attachableId: '81656baf-dc8f-44e4-8525-6b9a7f16eb92',
                familyId: 'cb7fbf66-a82c-47bc-9f73-38005898506b',
                sort: 9,
                alt: '5',
                title: '9',
                description: 'Similique neque nesciunt quod vitae et culpa dolores corrupti. Aut itaque quos debitis sapiente optio ut qui molestias. Quibusdam et consequatur doloremque ea. Temporibus similique numquam aliquid omnis rerum eveniet. Eum quos non et et sapiente est sunt.',
                excerpt: 'Corrupti qui similique quas. Laborum atque voluptas ipsam illo hic. Rerum nisi sed non nam reiciendis enim officiis iusto. Suscipit facere magni. Aspernatur error minima fugiat voluptas saepe magnam nam quam. Quia delectus enim atque fugiat suscipit voluptates sit voluptatem.',
                name: 'r',
                pathname: '7',
                filename: 'b',
                url: 'f',
                mime: 'kdl5e7h7s7wpa3598conxadph13t97zb2374k9njoouq8e1lco2',
                extension: '8',
                size: 8,
                width: 7,
                height: 6,
                libraryId: '840b8df3-31d9-43e9-b96e-7ee069b3fc5c',
                libraryFilename: '5',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentMime is too large, has a maximum length of 50');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentExtension is too large, has a maximum length of 50`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1256fb5f-c380-430e-9c63-a1818590792b',
                commonId: '5764863f-0cc8-4d61-bd98-eb876dee4b57',
                langId: '34e6678b-cb38-4abd-80de-cbedf09276a9',
                attachableModel: 'v',
                attachableId: '81656baf-dc8f-44e4-8525-6b9a7f16eb92',
                familyId: 'cb7fbf66-a82c-47bc-9f73-38005898506b',
                sort: 9,
                alt: 'i',
                title: '0',
                description: 'Quibusdam aut quis quia aspernatur. Eum veniam fuga rem reiciendis modi quis ratione eius. Veritatis et fuga est. Laboriosam quod autem. Porro inventore rerum. Excepturi quia amet quia est et suscipit quisquam.',
                excerpt: 'Voluptas voluptas laborum illum qui suscipit culpa nihil. Repellat consequatur quidem. Quia iusto sint quia cum nostrum quo sunt sit. Ad sunt esse molestias voluptatem maiores aut.',
                name: '5',
                pathname: '0',
                filename: '6',
                url: '5',
                mime: '7',
                extension: 'rd548t9f76usv6sgt5hqbv07m3scm8gvh07n3mc6jbt5lid1rki',
                size: 7,
                width: 5,
                height: 7,
                libraryId: '840b8df3-31d9-43e9-b96e-7ee069b3fc5c',
                libraryFilename: '3',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentExtension is too large, has a maximum length of 50');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentSize is too large, has a maximum length of 10`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1256fb5f-c380-430e-9c63-a1818590792b',
                commonId: '5764863f-0cc8-4d61-bd98-eb876dee4b57',
                langId: '34e6678b-cb38-4abd-80de-cbedf09276a9',
                attachableModel: 'o',
                attachableId: '81656baf-dc8f-44e4-8525-6b9a7f16eb92',
                familyId: 'cb7fbf66-a82c-47bc-9f73-38005898506b',
                sort: 2,
                alt: 'e',
                title: '6',
                description: 'Repellendus aut possimus. Illum ducimus velit et harum molestiae ullam mollitia quos architecto. Ut occaecati consequatur magni occaecati quasi dicta maiores id omnis. Impedit et delectus ut molestias est explicabo modi voluptas. Et quo unde asperiores molestiae dolores.',
                excerpt: 'Aliquid ipsam suscipit distinctio et sed quas cum. Qui velit beatae fugiat. Quis itaque alias nemo libero ea omnis ad odit. Perferendis debitis et non sapiente id itaque. Sapiente ut numquam. Quod possimus ut culpa.',
                name: 'y',
                pathname: 't',
                filename: 'a',
                url: 't',
                mime: 'j',
                extension: '8',
                size: 60488079478,
                width: 9,
                height: 7,
                libraryId: '840b8df3-31d9-43e9-b96e-7ee069b3fc5c',
                libraryFilename: '9',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentSize is too large, has a maximum length of 10');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentWidth is too large, has a maximum length of 6`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1256fb5f-c380-430e-9c63-a1818590792b',
                commonId: '5764863f-0cc8-4d61-bd98-eb876dee4b57',
                langId: '34e6678b-cb38-4abd-80de-cbedf09276a9',
                attachableModel: 'a',
                attachableId: '81656baf-dc8f-44e4-8525-6b9a7f16eb92',
                familyId: 'cb7fbf66-a82c-47bc-9f73-38005898506b',
                sort: 2,
                alt: '0',
                title: 'i',
                description: 'Provident omnis iste dolores veniam ea et. Maiores cumque dolor possimus voluptas alias animi vel occaecati. Quasi odit eos est et voluptates est. Aut assumenda doloribus distinctio delectus earum ut temporibus porro consequatur.',
                excerpt: 'Et odit vitae fugit enim quaerat. Occaecati voluptas suscipit sunt deserunt culpa laudantium in beatae. In eius voluptatibus omnis.',
                name: 's',
                pathname: 'x',
                filename: 'h',
                url: 'q',
                mime: 'h',
                extension: 'f',
                size: 2,
                width: 3356121,
                height: 1,
                libraryId: '840b8df3-31d9-43e9-b96e-7ee069b3fc5c',
                libraryFilename: 'u',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentWidth is too large, has a maximum length of 6');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentHeight is too large, has a maximum length of 6`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1256fb5f-c380-430e-9c63-a1818590792b',
                commonId: '5764863f-0cc8-4d61-bd98-eb876dee4b57',
                langId: '34e6678b-cb38-4abd-80de-cbedf09276a9',
                attachableModel: '9',
                attachableId: '81656baf-dc8f-44e4-8525-6b9a7f16eb92',
                familyId: 'cb7fbf66-a82c-47bc-9f73-38005898506b',
                sort: 8,
                alt: '5',
                title: '9',
                description: 'Et assumenda et. Sint est cupiditate commodi dolorem pariatur. Rem ducimus quia consequatur asperiores iste doloremque molestias accusamus laudantium. Modi rem odio est. Nesciunt nemo vel at quo ab reprehenderit. Dolores expedita et voluptas.',
                excerpt: 'Architecto ea fuga at eos enim voluptatem saepe omnis. Laboriosam nihil quasi consequatur ipsam voluptate culpa. Ratione provident delectus.',
                name: 'n',
                pathname: 'b',
                filename: 'f',
                url: 'b',
                mime: 'e',
                extension: '1',
                size: 2,
                width: 7,
                height: 5349227,
                libraryId: '840b8df3-31d9-43e9-b96e-7ee069b3fc5c',
                libraryFilename: 'i',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentHeight is too large, has a maximum length of 6');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentLibraryFilename is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1256fb5f-c380-430e-9c63-a1818590792b',
                commonId: '5764863f-0cc8-4d61-bd98-eb876dee4b57',
                langId: '34e6678b-cb38-4abd-80de-cbedf09276a9',
                attachableModel: 'k',
                attachableId: '81656baf-dc8f-44e4-8525-6b9a7f16eb92',
                familyId: 'cb7fbf66-a82c-47bc-9f73-38005898506b',
                sort: 7,
                alt: 'j',
                title: '2',
                description: 'Fugiat velit totam. Dolorum et sit temporibus esse dignissimos rem ut quia enim. Sunt dolorum inventore aut. Voluptates vel et. Enim ullam explicabo asperiores excepturi dicta et impedit quam ut. Doloribus provident nobis.',
                excerpt: 'Laudantium occaecati consectetur minus vel sapiente quia eaque qui. Non voluptatem velit dolores. Aliquid similique qui quia nemo. Quia quia qui.',
                name: 'v',
                pathname: 'd',
                filename: 'v',
                url: 'g',
                mime: 'w',
                extension: '4',
                size: 7,
                width: 8,
                height: 3,
                libraryId: '840b8df3-31d9-43e9-b96e-7ee069b3fc5c',
                libraryFilename: '03c87bipuhwxnijss66n0zsjmv028x9m9ckjrq49lcj4hwm1fol0a6ifn8ru9k205lgfe2spkn90oryabe9l0zfas193xas0e61clq6c0nesw2kvakom0q4zqumgb8uazdbhbvgq0stdyrzobjdlfvslyj1gsl5pazbqibdgz8845s3ab0zc84zcjsnlzo0i0my5tdmmq48pd5id43stt6bgtgv9iyjdi6csq9y88cjth9xtpyl32xtbrjy6i2rc',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryFilename is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentSize must have a positive sign`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1256fb5f-c380-430e-9c63-a1818590792b',
                commonId: '5764863f-0cc8-4d61-bd98-eb876dee4b57',
                langId: '34e6678b-cb38-4abd-80de-cbedf09276a9',
                attachableModel: 'h',
                attachableId: '81656baf-dc8f-44e4-8525-6b9a7f16eb92',
                familyId: 'cb7fbf66-a82c-47bc-9f73-38005898506b',
                sort: 6,
                alt: 'b',
                title: '2',
                description: 'Quidem consectetur error porro quia dolores veritatis tempora accusamus. Minus voluptas occaecati consequuntur dolorum cum. Alias cum delectus quidem exercitationem quia dicta perferendis voluptatibus rerum. Eius debitis at ducimus velit sit expedita. Non provident incidunt ipsum rerum illum quasi. Ipsa odit eos.',
                excerpt: 'Libero cupiditate nulla. Ut aut qui dolor qui et officia voluptatem. Neque corrupti quam quasi magnam aliquam ut autem unde. Ipsam accusantium et porro ipsa qui suscipit autem veniam.',
                name: 'k',
                pathname: 'n',
                filename: '9',
                url: 'n',
                mime: 'h',
                extension: '5',
                size: -9,
                width: 8,
                height: 4,
                libraryId: '840b8df3-31d9-43e9-b96e-7ee069b3fc5c',
                libraryFilename: 'm',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for AttachmentSize must have a positive sign, this field does not accept negative values');
            });
    });

    test(`/REST:POST admin/attachment`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1256fb5f-c380-430e-9c63-a1818590792b',
                commonId: '5764863f-0cc8-4d61-bd98-eb876dee4b57',
                langId: '34e6678b-cb38-4abd-80de-cbedf09276a9',
                attachableModel: 'b',
                attachableId: '81656baf-dc8f-44e4-8525-6b9a7f16eb92',
                familyId: 'cb7fbf66-a82c-47bc-9f73-38005898506b',
                sort: 8,
                alt: '7',
                title: 'y',
                description: 'Est delectus nobis omnis. Inventore cupiditate dolores beatae libero optio. Voluptatum dolorum ullam sit similique quis ut nostrum tempora reiciendis.',
                excerpt: 'Corporis ut animi voluptatibus quo et molestiae alias officia. Fuga ullam aut tempore in omnis doloremque qui. Et sapiente similique minima quas voluptatem dicta.',
                name: 'm',
                pathname: 'j',
                filename: 'i',
                url: '1',
                mime: 'u',
                extension: 'd',
                size: 1,
                width: 5,
                height: 4,
                libraryId: '840b8df3-31d9-43e9-b96e-7ee069b3fc5c',
                libraryFilename: 'a',
                data: { "foo" : "bar" },
            })
            .expect(201);
    });

    test(`/REST:GET admin/attachments/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachments/paginate')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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

    test(`/REST:GET admin/attachment - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '4f6d0280-f657-4f9b-93e9-0b86383c30f8'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET admin/attachment`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '1256fb5f-c380-430e-9c63-a1818590792b'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '1256fb5f-c380-430e-9c63-a1818590792b'));
    });

    test(`/REST:GET admin/attachment/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment/a229c04d-2e8e-4c4c-b48a-3522f8c30594')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET admin/attachment/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment/1256fb5f-c380-430e-9c63-a1818590792b')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '1256fb5f-c380-430e-9c63-a1818590792b'));
    });

    test(`/REST:GET admin/attachments`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachments')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/attachment - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'de7b3872-2c09-4fc9-ba65-44eef267a1a0',
                commonId: '288e46dd-cb1e-4c8b-b96e-1d5ae61ee5a9',
                langId: 'c5432ced-fcac-4d75-9b93-9ec470bf2342',
                attachableModel: 'u',
                attachableId: '7d0047f0-866e-435d-97b4-084704bc271f',
                familyId: 'aebebf17-f5b8-4206-8a34-7d7e29c7564c',
                sort: 3,
                alt: 'e',
                title: 'v',
                description: 'Ipsum corporis eos qui. Sapiente consequatur aperiam id sint. Eum culpa eos soluta praesentium facilis. Similique dignissimos ea beatae beatae et. Consequuntur non voluptas ab officiis qui et qui sed. Sit deserunt ex ipsa necessitatibus.',
                excerpt: 'Expedita voluptatem harum sint cum occaecati velit quos. Voluptatem animi excepturi adipisci nam ab libero quos est nihil. Velit vel molestiae sit. Porro et voluptatibus iste modi fugiat aut corporis. Ut delectus in officia animi rerum alias saepe iure. Et aut aliquam temporibus.',
                name: 'm',
                pathname: 'v',
                filename: '6',
                url: 'o',
                mime: 'q',
                extension: '2',
                size: 4,
                width: 6,
                height: 5,
                libraryId: 'f63bdf33-8d49-4820-b7f5-5edca9ba51aa',
                libraryFilename: '7',
                data: { "foo" : "bar" },
            })
            .expect(404);
    });

    test(`/REST:PUT admin/attachment`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1256fb5f-c380-430e-9c63-a1818590792b',
                commonId: '5764863f-0cc8-4d61-bd98-eb876dee4b57',
                langId: '34e6678b-cb38-4abd-80de-cbedf09276a9',
                attachableModel: 'y',
                attachableId: '81656baf-dc8f-44e4-8525-6b9a7f16eb92',
                familyId: 'cb7fbf66-a82c-47bc-9f73-38005898506b',
                sort: 6,
                alt: 'a',
                title: 'f',
                description: 'Nemo doloremque rerum voluptatem reiciendis unde magni quibusdam. Culpa sapiente quis facilis odio doloremque dignissimos culpa repellat eveniet. Sed asperiores vel eos numquam quia voluptatem labore voluptatem doloribus. Non adipisci earum dolorem velit dicta. Eum aspernatur voluptas et.',
                excerpt: 'Et voluptatem sed est necessitatibus iste quia modi inventore in. Est vel impedit eveniet. Aut ut dolor voluptatem itaque iusto dolores cupiditate earum cupiditate. Assumenda voluptate rerum ut ad eos aspernatur.',
                name: '8',
                pathname: '0',
                filename: 'u',
                url: 'u',
                mime: '2',
                extension: '1',
                size: 4,
                width: 4,
                height: 5,
                libraryId: '840b8df3-31d9-43e9-b96e-7ee069b3fc5c',
                libraryFilename: '9',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '1256fb5f-c380-430e-9c63-a1818590792b'));
    });

    test(`/REST:DELETE admin/attachment/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment/02dceae1-515f-417d-b7ed-4b68317ba3ac')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE admin/attachment/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment/1256fb5f-c380-430e-9c63-a1818590792b')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL adminCreateAttachment - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminCreateAttachmentInput!)
                    {
                        adminCreateAttachment (payload:$payload)
                        {
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
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

    test(`/GraphQL adminCreateAttachment`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminCreateAttachmentInput!)
                    {
                        adminCreateAttachment (payload:$payload)
                        {
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '24563fb0-d881-4006-811b-c48b84fb9c40',
                        commonId: '5764863f-0cc8-4d61-bd98-eb876dee4b57',
                        langId: '34e6678b-cb38-4abd-80de-cbedf09276a9',
                        attachableModel: 'u',
                        attachableId: '81656baf-dc8f-44e4-8525-6b9a7f16eb92',
                        familyId: 'cb7fbf66-a82c-47bc-9f73-38005898506b',
                        sort: 8,
                        alt: 'z',
                        title: 'r',
                        description: 'Ut veritatis labore pariatur. Pariatur consectetur suscipit delectus laborum. Laboriosam doloribus sit et quasi provident officia ut. Eligendi corporis aut. Non nesciunt rerum ducimus sit harum nemo. Omnis praesentium vitae consequuntur qui tempora quia libero et similique.',
                        excerpt: 'Nobis cumque perferendis. Itaque voluptatem nihil. Ullam itaque eligendi ut. Asperiores dolorum error nisi ea ab tenetur cupiditate.',
                        name: 'e',
                        pathname: 'm',
                        filename: 'r',
                        url: '0',
                        mime: 'q',
                        extension: 'm',
                        size: 8,
                        width: 3,
                        height: 9,
                        libraryId: '840b8df3-31d9-43e9-b96e-7ee069b3fc5c',
                        libraryFilename: 'c',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAttachment).toHaveProperty('id', '24563fb0-d881-4006-811b-c48b84fb9c40');
            });
    });

    test(`/GraphQL adminPaginateAttachments`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        adminPaginateAttachments (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateAttachments.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachments.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachments.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminFindAttachment - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAttachment (query:$query)
                        {
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
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
                            id: '5310a73b-344b-46ed-8609-11ad15bc2d7d'
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

    test(`/GraphQL adminFindAttachment`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAttachment (query:$query)
                        {
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
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
                            id: '1256fb5f-c380-430e-9c63-a1818590792b'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachment.id).toStrictEqual('1256fb5f-c380-430e-9c63-a1818590792b');
            });
    });

    test(`/GraphQL adminFindAttachmentById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        adminFindAttachmentById (id:$id)
                        {
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'a322b294-4b34-4be8-a24f-63ccac7e3769'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindAttachmentById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        adminFindAttachmentById (id:$id)
                        {
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '1256fb5f-c380-430e-9c63-a1818590792b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentById.id).toStrictEqual('1256fb5f-c380-430e-9c63-a1818590792b');
            });
    });

    test(`/GraphQL adminGetAttachments`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetAttachments (query:$query)
                        {
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
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
                for (const [index, value] of res.body.data.adminGetAttachments.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateAttachment - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminUpdateAttachmentInput!)
                    {
                        adminUpdateAttachment (payload:$payload)
                        {
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'aff22dc0-1151-4b67-ba8b-51803d5497d4',
                        commonId: 'd75c5b1f-bf54-4085-a742-6c5d34a44ba4',
                        langId: 'ce8e0b2e-7ca1-4bc2-a716-ee8e4cbc35a3',
                        attachableModel: 'q',
                        attachableId: '86245c68-abdf-4216-bea6-cf195f59e4e0',
                        familyId: '51f9d1d5-33b6-40b1-bdf4-a25205240c79',
                        sort: 1,
                        alt: 'a',
                        title: 'f',
                        description: 'Autem libero quasi explicabo reprehenderit facilis quisquam voluptatem consequuntur. Quia ullam dicta in quae sapiente quasi rerum et. Eaque sed repudiandae est error laudantium aliquam voluptatum velit non.',
                        excerpt: 'Porro quod fugit aperiam aut culpa. Qui voluptatibus iste asperiores. Et et ex dolores sit doloremque. Provident ut sit aut doloremque quia animi. Et et et. Aut soluta molestias et repellat similique.',
                        name: 'c',
                        pathname: 'w',
                        filename: '1',
                        url: 'b',
                        mime: '7',
                        extension: 'a',
                        size: 1,
                        width: 4,
                        height: 5,
                        libraryId: 'dd3fafa1-c8b0-4dc6-a129-a8f7bf912689',
                        libraryFilename: 'l',
                        data: { "foo" : "bar" },
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

    test(`/GraphQL adminUpdateAttachment`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminUpdateAttachmentInput!)
                    {
                        adminUpdateAttachment (payload:$payload)
                        {
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '1256fb5f-c380-430e-9c63-a1818590792b',
                        commonId: '5764863f-0cc8-4d61-bd98-eb876dee4b57',
                        langId: '34e6678b-cb38-4abd-80de-cbedf09276a9',
                        attachableModel: '9',
                        attachableId: '81656baf-dc8f-44e4-8525-6b9a7f16eb92',
                        familyId: 'cb7fbf66-a82c-47bc-9f73-38005898506b',
                        sort: 7,
                        alt: 'r',
                        title: '9',
                        description: 'Modi voluptate accusamus et nesciunt et deleniti nihil cum magnam. Sit natus natus rerum est et dolores distinctio. Ducimus debitis nostrum facere incidunt error dolores vel dolores delectus. Enim commodi similique eum eveniet. Sed et et fugiat magnam neque. Sed harum sit enim.',
                        excerpt: 'Qui ut modi porro corporis impedit alias id. Qui porro eos deleniti. Nam non et et odio qui.',
                        name: '8',
                        pathname: '8',
                        filename: 'n',
                        url: 'u',
                        mime: 'p',
                        extension: 'l',
                        size: 8,
                        width: 1,
                        height: 3,
                        libraryId: '840b8df3-31d9-43e9-b96e-7ee069b3fc5c',
                        libraryFilename: 'c',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAttachment.id).toStrictEqual('1256fb5f-c380-430e-9c63-a1818590792b');
            });
    });

    test(`/GraphQL adminDeleteAttachmentById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAttachmentById (id:$id)
                        {
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'ba72cecc-8fa4-455e-aa65-d20436e00b94'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteAttachmentById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAttachmentById (id:$id)
                        {
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '1256fb5f-c380-430e-9c63-a1818590792b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAttachmentById.id).toStrictEqual('1256fb5f-c380-430e-9c63-a1818590792b');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});