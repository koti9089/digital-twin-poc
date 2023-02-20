import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Gremlin from 'gremlin';
const DriverRemoteConnection = Gremlin.driver.DriverRemoteConnection;
// const traversal = Gremlin.process.AnonymousTraversalSource.traversal;

@Injectable()
export class GremlinService {
  private readonly _endpoint: string;
  private readonly _primaryKey: string;
  private readonly _database: string;
  private readonly _collection: string;
  private readonly _client;
  constructor(private configService: ConfigService) {
    this._endpoint = configService.get<string>('COSMOS_GREMLIN_ENDPOINT');
    this._primaryKey = configService.get<string>('COSMOS_GREMLIN_PRIMARY_KEY');
    this._database = configService.get<string>('COSMOS_GREMLIN_DATABASE');
    this._collection = configService.get<string>('COSMOS_GREMLIN_COLLECTION');
    this._client = new Gremlin.driver.Client(this._endpoint, {
      authenticator: new Gremlin.driver.auth.PlainTextSaslAuthenticator(
        `/dbs/${this._database}/colls/${this._collection}`,
        this._primaryKey,
      ),
      traversalsource: 'g',
      rejectUnauthorized: true,
      mimeType: 'application/vnd.gremlin-v2.0+json',
    });
  }

  async execute(query: string, options = {}) {
    const connection = new DriverRemoteConnection(this._endpoint, {
      mimeType: 'application/vnd.gremlin-v2.0+json',
      rejectUnauthorized: true,
      authenticator: new Gremlin.driver.auth.PlainTextSaslAuthenticator(
        `/dbs/${this._database}/colls/${this._collection}`,
        this._primaryKey,
      ),
    });
    // const g = traversal().withRemote(connection);
    const result = await this._client.submit(query, options);
    await connection.close();
    return result;
  }
}
