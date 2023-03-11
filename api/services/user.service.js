const UserRepository = require("../repositories/user.repository");
const { makeError } = require("../error");

class UserService {
  userRepository = new UserRepository();

  signUp = async (id, password, confirm, email, nickname) => {
    const findEmail = await this.userRepository.findUser(email)
    if(findEmail){
        throw new makeError({
            message: "해당 E-mail은 사용할수 없습니다.",
            code: 400,
          });
    }
    if (password !== confirm) {
      throw new makeError({
        message: "비밀번호와 비밀번호 확인이 일치하지 않습니다",
        code: 400,
      });
    }
    await this.userRepository.signUp(id, password, email, nickname)
    return
  };

  login = async (id, password) => {
    const login = await this.userRepository.login(id,password)
    if(!login){
        throw new makeError({messagge : "로그인에 실패하였습니다.", code : 401})
    }
    return login
  }
}

module.exports = UserService;
