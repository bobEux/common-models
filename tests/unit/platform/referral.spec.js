const schemaCreator = require('../../../utilities/schemaCreator');

jest.spyOn(schemaCreator, 'createSchema');
const Referral = require('../../../lib/platform/referral');

describe('Referrals model', () => {
  afterAll(() => {
    schemaCreator.createSchema.mockRestore();
  });

  it('creates a model with specifed properties', () => {
    const referral = new Referral({
      deviceInfo: 'device-info-checksum',
      deviceOs: 'ANDROID',
      firstInstall: true,
      userId: 'user-id',
      ethAddress: 'user-eth-address',
    });

    expect(referral.toJSON()).toEqual({
      id: expect.any(String),
      deviceInfo: 'device-info-checksum',
      deviceOs: 'ANDROID',
      firstInstall: true,
      userId: 'user-id',
      ethAddress: 'user-eth-address',
    });
  });

  it('throws when required properties are missing', () => {
    const referral = new Referral({});

    expect(referral.validateSync).toThrow();

    const { errors } = referral.validateSync();
    expect(errors.deviceInfo.message).toMatch('Path `deviceInfo` is required.');
    expect(errors.deviceOs.message).toMatch('Path `deviceOs` is required.');
    expect(errors.firstInstall.message).toMatch(
      'Path `firstInstall` is required.',
    );
  });
});