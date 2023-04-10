class ScrapRepository {
  constructor(scrapModel) {
    this.scrapModel = scrapModel;
  }
  findScrap = async (userId, musicId) => {
    const findLike = await this.scrapModel.findOne({
      where: { userId, musicId },
    });
    return findLike;
  };
  makeScrap = async (userId, musicId) => {
    await this.scrapModel.create({ userId, musicId });
    return;
  };
  deleteScrap = async (userId, musicId) => {
    await this.scrapModel.destroy({ where: { userId, musicId } });
    return;
  };
}

module.exports = ScrapRepository;
