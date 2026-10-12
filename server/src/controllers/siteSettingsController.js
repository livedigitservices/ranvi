const SiteSettings = require('../models/SiteSettings');
const { sendSuccess } = require('../utils/responseHelper');

const getSettings = async (req, res, next) => {
  try {
    let settings = await SiteSettings.findOne({ key: 'global_settings' });
    if (!settings) {
      settings = await SiteSettings.create({ key: 'global_settings' });
    }
    return sendSuccess(res, 'Site settings retrieved', settings);
  } catch (error) {
    next(error);
  }
};

const updateSettings = async (req, res, next) => {
  try {
    let settings = await SiteSettings.findOne({ key: 'global_settings' });
    if (!settings) {
      settings = new SiteSettings({ key: 'global_settings' });
    }

    Object.assign(settings, req.body);
    await settings.save();

    return sendSuccess(res, 'Site settings updated successfully', settings);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSettings,
  updateSettings,
};
