import Knex from 'knex';
import { TransactionOrKnex } from 'objection';
import knexfile from '../../../knexfile';

export class DB {
  /**
   * Always get the same instance
   */
  public static getInstance(): DB {
    if (!DB.instance) {
      DB.instance = new DB();
    }

    return DB.instance;
  }

  private static instance: DB;
  private connection: TransactionOrKnex;

  private constructor() {}

  /**
   * Create database connections
   */
  public async connect(): Promise<void> {
    try {
      await this.createConnection(knexfile);

      // Ensure that connection is never changed
      Object.freeze(this.connection);

      console.log('Connection to databases has been established successfully.');
    } catch (e) {
      console.error('Unable to connect to the databases:', e.message);
    }
  }

  /**
   * Destroy db connection
   */
  public async destroyConnection(): Promise<void> {
    return this.connection.destroy();
  }

  /**
   * Create connection
   *
   * @param knexfile
   */
  public createConnection(knexfile: any): void {
    this.connection = Knex(knexfile[process.env.NODE_ENV]);
  }

  /**
   * Get established connection
   */
  public getConnection(): TransactionOrKnex {
    return this.connection;
  }
}
