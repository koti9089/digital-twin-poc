import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Gremlin from 'gremlin';

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

  async dropGraph() {
    console.log('Running Drop');
    return this._client.submit('g.V().drop()', {}).then(function (result) {
      console.log('Result: %s\n', JSON.stringify(result));
    });
  }

  async addVertex1() {
    console.log('Running Add Vertex1');
    return this._client
      .submit(
        "g.addV(label).property('id', id).property('firstName', firstName).property('age', age).property('userid', userid).property('pk', 'pk')",
        {
          label: 'person',
          id: 'thomas',
          firstName: 'Thomas',
          age: 44,
          userid: 1,
        },
      )
      .then(function (result) {
        console.log('Result: %s\n', JSON.stringify(result));
      });
  }
}
