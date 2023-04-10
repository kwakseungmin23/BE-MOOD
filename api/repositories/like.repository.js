class LikeRepository {
  constructor(likeModel) {
    this.likeModel = likeModel;
  }
  findLike = async (userId, musicId) => {
    const findLike = await this.likeModel.findOne({
      where: { userId, musicId },
    });
    return findLike;
  };
  countLike = async (musicId) => {
    const likeCount = await this.likeModel.count({ where: { musicId } });
    return likeCount;
  };
  makeLike = async (userId, musicId) => {
    await this.likeModel.create({ userId, musicId });
    return;
  };
  deleteLike = async (userId, musicId) => {
    await this.likeModel.destroy({ where: { userId, musicId } });
    return;
  };
}

module.exports = LikeRepository;
