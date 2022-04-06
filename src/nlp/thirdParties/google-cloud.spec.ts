import { GoogleCloud } from './google-cloud.service';
import { UtilService } from '../../util/util.service';

describe('GoogleCloud', () => {
  let gogl: GoogleCloud;
  let util: UtilService;
  beforeEach(async () => {
    gogl = new GoogleCloud(util);
  });
  it('should be defined', () => {
    expect(gogl).toBeDefined();
  });
  it('should toStrictEqual', () => {
    const result = gogl.print();

    expect(result).toStrictEqual('asdasd');
  });
});
