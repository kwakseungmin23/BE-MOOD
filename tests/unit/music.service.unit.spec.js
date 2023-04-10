const MusicService = require("../../api/services/music.service");
const { sequelize } = require("../../db/models/index");

let mockMusicRepository = {
  findOneByMusicId: jest.fn(),
};

let musicService = new MusicService();
// musicService의 Repository를 Mock Repository로 변경합니다.
musicService.musicRepository = mockMusicRepository;

describe("Layered Architecture Pattern Music Service Unit Test", () => {
  beforeAll(async () => {
    await sequelize.sync();
  });
  test("Music Service findOneByMusicId Method", async () => {
    musicService.findOneByMusicId = jest.fn(() => {
      return "findOneByMusicIdValue";
    });
    const oneMusic = await musicService.findOneByMusicId({ musicId: 1 });
    expect(oneMusic).toEqual("findOneByMusicIdValue");
    expect(musicService.findOneByMusicId).toHaveBeenCalledTimes(1);
    expect(musicService.findOneByMusicId).toHaveBeenCalledWith({
      musicId: 1,
    });
  });
});
