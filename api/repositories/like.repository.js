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
