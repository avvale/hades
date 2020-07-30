// https://sequelize.org/master/class/lib/model.js~Model.html#static-method-bulkCreate
export interface BulkCreateOption 
{
    fields?: string[];
    validate?: boolean;
    hooks?: boolean;
    individualHooks?: boolean;
    ignoreDuplicates?: boolean;
    updateOnDuplicate?: string[];
    benchmark: boolean;
    returning: string[] | boolean;
    searchPath: string;
}

  