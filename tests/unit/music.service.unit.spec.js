const MusicService = require("../../api/services/music.service");
//우리는 테스트 코드를 작성하기 위하여 MusicService 클래스가 필요합니다.
//그래야지 MusicService 클래스 안의 객체들을 활용할 수 있습니다.
const { sequelize } = require("../../db/models/index");
//MusicService 안의 코드들을 보면, sequelize-cli 를 통해서 database 의 모델들을 불러오고 있죠?
//테스트 코드 환경에서도 실제 코드가 돌아가는 환경처럼 구현해주어야 합니다.
//따라서 우리는 sequelize orm 을 mocking하고, sequelize 와 연동된 database 를 가짜로 생성해야 합니다.
let mockMusicRepository = {
  findOneByMusicId: jest.fn(),
};
// 뮤직 리포지토리 내의 메서드들을 가짜 JEST 함수 객체로 만들어 버립니다.
let musicService = new MusicService();
musicService.musicRepository = mockMusicRepository;
// musicService의 실제 Repository를 테스트 환경에서 사용하기 위해 mockRepository(가짜 제스트 함수)로 변경합니다.
describe("Layered Architecture Pattern Music Service Unit Test", () => {
  beforeAll(async () => {
    await sequelize.sync();
  });
  //시작되기 전에 이 테스트가 무엇을 의미하는지 describe 를 통해 설명하고,
  //sequelize.sync() 문법을 통해 sequelize 와 연결된 우리의 가짜 db를 생성해줍니다.
  test("Music Service findOneByMusicId Method", async () => {
    musicService.findOneByMusicId = jest.fn(() => {
      return "findOneByMusicIdValue";
    }); //이제 뮤직 서비스 레이어 테스트를 진행합시다. 뮤직 서비스단에 존재하는 findOneByMusicId 메소드를 우리는 이미 가짜 제스트 함수로 변경했습니다.
    // 그리고 jest 가짜(mock)콜백함수의 결과값이 "findOneByMusicIdValue" 일 것이라고 가정합니다.
    const oneMusic = await musicService.findOneByMusicId({ musicId: 1 });
    // musicId가 1인 음악 하나를 뮤직 서비스 단에서 호출하는 가짜 함수입니다. (이미 mockRepo로 method 를 가짜(mock)로 바꿨죠?)
    expect(oneMusic).toEqual("findOneByMusicIdValue");
    // oneMusic 의 결과값이 "findOneByMusicIdValue" 과 일치하는가를 묻고 있습니다.
    expect(musicService.findOneByMusicId).toHaveBeenCalledTimes(1);
    // findOneByMusicId 가 1번 호출되었는가를 묻고 있습니다.
    expect(musicService.findOneByMusicId).toHaveBeenCalledWith({
      musicId: 1,
    });
    // findOneByMusicId 의 인자로 musicId:1 이 입력되었음이 맞는가를 묻고 있습니다.
  });
});
