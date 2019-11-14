import {RaspividOptionsParser} from '../src/options-parser/raspivid.options-parser';

describe('RaspividOptionsParser', () => {
    it('should construct DefaultConverter by default', () => {
        const parser = new RaspividOptionsParser();

        expect(parser.getCommandLineArgs({
            height: 300,
            width: 100,
            horizontalFlip: true,
            verticalFlip: false
        })).toStrictEqual(['-h', '300', '-w', '100', '-hf']);
    });
});