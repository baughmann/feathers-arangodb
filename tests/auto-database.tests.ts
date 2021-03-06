import { AutoDatabse } from '../src/auto-database';
import { GraphVertexCollection } from "arangojs/lib/cjs/graph";

describe('AutoDatabase Class', () => {
  const db = new AutoDatabse();
  const testDatabase = 'TEST_AUTO_DB';
  const testCollection = 'TEST_AUTO_COL';
  const testGraph = {
    name: 'TEST_AUTO_GRAPH',
    edgeDefinitions: [{
      collection: 'edges',
      from: ['TEST_AUTO_COL'],
      to: ['TEST_AUTO_COL']
    }]
  };
  const testUser = 'root';
  const testPass = 'root';

  beforeAll(async (done) => {
    db.useBasicAuth(testUser, testPass);
    done();
  });

  afterAll(async (done) => {
    const database = new AutoDatabse();
    database.useBasicAuth(testUser, testPass);
    await database.dropDatabase(testDatabase);
    done();
  });


  it('Creates a database when needed', async () => {
    await db.autoUseDatabase(testDatabase);
    const info = await db.get();
    expect(info.name).toEqual(testDatabase);
  });

  it('Uses found database when needed', async () => {
    await db.autoUseDatabase(testDatabase);
    const info = await db.get();
    expect(info.name).toEqual(testDatabase);
  });

  it('Creates a collection when needed', async () => {
    const col = await db.autoCollection(testCollection);
    const info = await col.get();
    expect(info.name).toEqual(testCollection);
  });

  it('Uses found collection when needed', async () => {
    const col = await db.autoCollection(testCollection);
    const info = await col.get();
    expect(info.name).toEqual(testCollection);
  });

  it('Creates a graph when needed', async () => {
    const graph = await db.autoGraph(testGraph);
    const info = await graph.get();
    expect(info.name).toEqual(testGraph.name);
  });

  it('Uses found graph when needed', async () => {
    const graph = await db.autoGraph(testGraph);
    const info = await graph.get();
    expect(info.name).toEqual(testGraph.name);
  });

  it('Uses found graph when needed', async () => {
    const graph = await db.autoGraph(testGraph);
    const col:any = await db.autoCollection('ANOTHER_TEST_COL', graph);
    expect(col.graph.name).toEqual(testGraph.name);
  });

});
