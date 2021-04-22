/**
 * This mock file is different from the table structure, because when creating an access token, specific fields are required.
 * specific fields, in the process of creating the access token you obtain the necessary data to populate the table.
 * the table. For this reason to perform testing we need two different data structures, a list of access tokens, which would be a list of
 * of access tokens, which would be the one already registered in the database and a list of access tokens that would be necessary to generate an access token in the database.
 * to generate an access token in the database.
 */

export const rolesToCreate = [
    {
        id: '99b06044-fff5-4267-9314-4bae9f909010',
        name: 'Administrador',
        isMaster: true
    }
];