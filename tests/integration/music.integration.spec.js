const supertest = require("supertest");
//supertest library 가져오기.
const app = require("../../app");
//app.js module화 가져오기.

describe("LAP, Music Domain integration test", () => {
  test("music:x:y GET Api Test", async () => {
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
    // const POSTBodyParams = {
    //   musicTitle: "title",
    //   musicContent: "content",
    //   status: "happy",
    //   composer: "mozart",
    //   tag: "happy",
    //   fileName: "fileName",
    // };
    // var __dirname = C:\Users\User\Desktop\realPro\BE-MOOD\tests\integration (현재 절대 경로)
    await supertest(app)
      .post(`/api/music`) //POST Method URL
      .attach("thisIsFile", `${__dirname}/picture.jpg`) //multipart-form-data, "파일 절대 경로"
      .field("musicTitle", "title") //폼 데이터에 들어갈 key - value
      .field("musicContent", "content") //same
      .field("status", "happy") //same
      .field("composer", "mozart") //same
      .field("tag", "happy") //same
      .field("musicUrl", "https://d13uh5mnneeyhq.cloudfront.net/picture.jpg") //same
      .then((res) => {
        // async-await 문법으로 인해 내부 block scope 는 전부 프로미스화 되었습니다.
        // 따라서 then 처리로 response(응답)인자를 만들어 supertest response 를 활용해 테스트할 수 있습니다.
        // console.log(res); // => res 를 확인해보면 supertest(req)에 대한 (res)응답을 확인할 수 있습니다.
        expect(res.status).toEqual(200); //res.status가 200과 같은가?
        expect(res.body).toMatchObject({
          //res.body 의 object 가 인자 내용과 같은가?
          msg: "생성 완료",
          music: {
            musicId: expect.anything(), // pk autoincrement
            musicTitle: "title",
            musicContent: "content",
            status: "happy",
            composer: "mozart",
            musicUrl: "https://d13uh5mnneeyhq.cloudfront.net/picture.jpg",
          },
        });
      });
  });
  test("MUSIC GET API TEST", async () => {
    const musicId = 1;
    const req = supertest(app);
    await req.get(`/api/music/${musicId}`).then((res) => {
      expect(res.status).toEqual(200);
      // console.log(req, res);
      expect(res.body).toMatchObject({
        data: {
          musicTitle: "title",
          musicContent: "content",
          composer: "mozart",
          musicUrl: "https://d13uh5mnneeyhq.cloudfront.net/picture.jpg",
          musicId: 1,
        },
      });
    });
  });
});
