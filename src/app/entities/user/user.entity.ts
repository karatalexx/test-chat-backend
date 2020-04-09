import { Model, Pojo, RelationMappings } from 'objection';

export class UserEntity extends Model {
  public id: number;
  public username: string;
  public email: string;
  public password: string;
  public token: string;

  // Table name
  public static tableName = 'users';

  // Hide properties
  public readonly $secureFields: string[] = ['password', 'token'];

  // Omit stuff when creating json response from model
  public $formatJson(json: Pojo): Pojo {
    return Object.keys(super.$formatJson(json))
      .filter(key => !this.$secureFields.includes(key))
      .reduce(
        (acc, curr) => ({
          ...acc,
          [curr]: json[curr]
        }),
        {}
      );
  }

  //  Relations
  public static get relationMappings(): RelationMappings {
    return {};
  }
}
