const supertest = require("supertest");
//supertest library 가져오기.
const app = require("../../app");
//app.js module 가져오기.
const { sequelize } = require("../../models");
//sequelize orm 가져오기

beforeAll(async () => {
  await sequelize.sync(); // 테스트 하기 전 Database 초기화
});

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
});
