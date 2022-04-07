import { GoogleNlpService } from './google-nlp.service';
import { UtilService } from '../../util/util.service';

describe('GoogleCloud', () => {
  let gogl: GoogleNlpService;
  let util: UtilService;
  beforeEach(async () => {
    gogl = new GoogleNlpService(util);
  });
  it('should be defined', () => {
    expect(gogl).toBeDefined();
  });
});
