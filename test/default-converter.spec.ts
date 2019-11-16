import {DefaultConverter} from '../src/converter/default.converter';

describe('DefaultConverter', () => {
    let converter: DefaultConverter;

    beforeEach(async () => {
        converter = new DefaultConverter();
    });

    it('should call w/o error', async () => {
        await converter.convert('test');
    });
});