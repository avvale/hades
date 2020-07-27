import { ApiProperty } from '@nestjs/swagger';

export class UpdateContactDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '6102cd62-f5ae-40db-8796-60d4c2bd4af0'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '470e0e41-4038-4d35-816b-64cbf3e28219'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'ddr668mtulprc9mcp7f1nopv2zf8ifo7cscr824u1ypktpqdga'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'c4c3516a-2055-4add-a17f-6d42aee3abdc'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'nqnubahi08ignywfn6nr'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : '5c47c0d2-da7b-415f-bd21-f18f07b9e3dd'
    })
    roleId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : 'y6lypwvttbuzhybuv18d7vir793ll27ri53zir9bok9no3nggxdb9ythpz9kfbxddlfbbztrt4gt5bc71qf30ywm0rjsmhdwxfzothxobfhvshn9k3r9l0npwr854vs6r2qtfxvw38d0iqkxvfus9xfjpi1sxvep6abvxj9qup0hj7av2sbhwz5qq49mo874mq4kbchfztmh99cjqhjdmlgke96g6yfzhcvy3vkah5bppdildc2ggqugwkj30py'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'f3rzewhivbakb2wc0fn6nwo5t7piqv28zrb0r7560dx1m5f3sedelrfo7wwx9f0okeedhpkoow1ybysqgnwo3llyw22j2hsgs7t2jrj1crkcki9brh2d7trgf1ilmrnd8cqsafzmjzsc1jt13p6k4eq9vrtbqh7vglsdqrlmq59i17l4vq6hw8tuxjyg5ss97nhnxmq4bws5lfdza50p2aphltqdpo4xejq90g6gqh59c2749ku8854d0vre82d'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'ez4ik44c8bck0atlhiz3bucklhmko0b9b4u5pe4f9h7u678zgygkq93lv784ccdp4wurl8fpvtzt0r4y1g5skxgkdggtcl8usc1kk1mja0zlkk71v9pf0n5qj4lld8q1a441cw8qzjjrcqjeth0d028ds7sfzz2dx2cr9jszqvvpwyax1fae20zjzy8vjrrsd3qwcv6upl4jsz321fotuxt1cmc0xsk0epj4s305w0trjj2x9aw13yfcm10b4vs'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'mtbpxfflsk6k036ftg9lhmswg6hz0jqgipvtft0wf2zi3luxvpqrd355vn8zgtfvrw3r3109cqpubnlzn0x5adpcq9vje4g3iq0ou0gfkt4aczzi09jfm8ok'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : '1akec0ed4elttz6e2vcdei0zzavjd606iw14jpg3h3s5djy09xyzd6n69wkc'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : 'm8bl7fvd4u7zfmiibyhfkxs7q7fbdf2hkt9q3mz9alnei99swoqivfk524xfu8wvwq9mb41y7hlfs2k912kp7su6nofq72cvki2xrvz6lasrf1urqodqp6k4arfklb961xtats5aa8ynphafmzeq9pvgwpu2m948b5dwadh1pnkrbnelv18t0ss67x8z39mol0gqjbygx5lgermbmdcc2gcge4tav8cf0yfxy8mjw4t56owgqzef63gf62krrux'
    })
    area: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasConsentEmail [input here api field description]',
        example     : false
    })
    hasConsentEmail: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasConsentMobile [input here api field description]',
        example     : false
    })
    hasConsentMobile: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : false
    })
    isActive: boolean;
    
    
}
