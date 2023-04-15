const supertest = require("supertest");
//supertest library 가져오기.
const app = require("../../app");
//app.js module 가져오기.
const { sequelize } = require("../../models");
//sequelize orm 가져오기
// beforeAll(async () => {
//   await sequelize.sync(); // 테스트 하기 전 Database 초기화
// });
//t
describe("LAP, Music Domain integration test", () => {
  test("GET Api Test", async () => {
    const [x, y] = [1, 1];
    const response = await supertest(app)
      .get(`/api/music/mood/${x}/${y}`) // GET Method URL
      .query({}) // req.query -> POST Method 사용
      .send({}); // req.body -> POST Method 사용
    expect(response.status).toEqual(200);
    //response 의 status 가 200 과 동일한가?
    expect(response.body).toEqual({
      message: "당신은 약간 우울해 보입니다.",
      music: null,
    });
    //response 의 body data 가 ({message:"~",music:null})과 동일한가?
  });
  test("POST Music TEST", async () => {
    const POSTBodyParams = {
      musicTitle: "title",
      musicContent: "content",
      status: "happy",
      composer: "mozart",
      tag: "happy",
      fileName: "fileName",
    };
    await supertest(app)
      .post(`/api/music`)
      .attach("picture.jpg", `${__dirname}/picture.jpg`)
      .field("musicTitle", "title")
      .field("musicContent", "content")
      .field("status", "happy")
      .field("composer", "mozart")
      .field("tag", "happy")
      .field("musicUrl", "https://d13uh5mnneeyhq.cloudfront.net/picture.jpg")
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body).toMatchObject({
          msg: "생성 완료",
          music: {
            musicId: expect.anything(), // pk autoincrement
            musicTitle: POSTBodyParams.musicTitle,
            musicContent: POSTBodyParams.musicContent,
            status: POSTBodyParams.status,
            composer: POSTBodyParams.composer,
            musicUrl: "https://d13uh5mnneeyhq.cloudfront.net/picture.jpg",
          },
        });
      });
  });
});
// afterAll(async () => {
//   await sequelize.sync({ force: true });
// });
