class ComposerRepository {
  constructor(composerModel) {
    this.composerModel = composerModel;
  }
  //작곡가 조회하기
  getComposer = async ({ composer }) => {
    const result = await this.composerModel.findOne({
      where: { composer },
    });
    return result;
  };

  //작곡가 수정하기
  updateTagComposer = async ({ composer, tag }) => {
    await this.composerModel.update({ tag }, { where: { composer } });
    return;
  };
}

module.exports = ComposerRepository;
