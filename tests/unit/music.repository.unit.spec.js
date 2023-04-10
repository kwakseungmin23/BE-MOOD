const MusicRepository = require("../../api/repositories/music.repository");

// music.repository 에서는 아래 n개의 Method를 사용합니다.
let mockMusicModel = {
  create: jest.fn(),
  findOne: jest.fn(),
};

let musicRepository = new MusicRepository(mockMusicModel);

describe("Layered Architecture Pattern Music Repository Unit Test", () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  });

  test("Music Repo findOneByMusicId Method", async () => {
    mockMusicModel.findOne = jest.fn(() => {
      return "findOne Result";
    });
    const music = await musicRepository.findOneByMusicId({ musicId: 1 });
    expect(music).toEqual("findOne Result");
    expect(mockMusicModel.findOne).toHaveBeenCalledTimes(1);
  });
  test("Music Repo create Method ", async () => {
    mockMusicModel.create = jest.fn(() => {
      return "created result";
    });
    const createMusic = await musicRepository.create({
      musicTitle: 1,
      musicContent: 1,
      status: 1,
      composer: 1,
      musicUrl: 1,
    });
    expect(createMusic).toEqual("created result");
    expect(mockMusicModel.create).toHaveBeenCalledTimes(1);
    expect(mockMusicModel.create).toHaveBeenCalledWith({
      musicTitle: 1,
      musicContent: 1,
      status: 1,
      composer: 1,
      musicUrl: 1,
    });
  });
});
