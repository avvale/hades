import {EntitySchema} from "typeorm";

export const LangEntity = new EntitySchema({
    name: "admin_lang",
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true
        },
        name: {
            type: String
        },
        image: {
            type: String
        },
        iso6392: {
            type: String
        },
        iso6393: {
            type: String
        },
        ietf: {
            type: String
        },
        sort: {
            type: Number
        },
        isActive: {
            type: Boolean
        },
        createdAt: {
            type: String
        },
        updatedAt: {
            type: String
        },
        deletedAt: {
            type: String
        }
    }
});