const SiteSettings = require('../models/SiteSettings');
const { sendSuccess } = require('../utils/responseHelper');

const getSettings = async (req, res, next) => {
  try {
    let settings = await SiteSettings.findOne({ key: 'global_settings' });
    if (!settings) {
      settings = await SiteSettings.create({ key: 'global_settings' });
    }

    const settingsObj = settings.toObject();
    if (settingsObj.heroBanner) {
      if (!settingsObj.heroBanner.badgeText) {
        settingsObj.heroBanner.badgeText = "India's Premier Coaching for Banking & Government Exams";
      }
      if (!settingsObj.heroBanner.headline) {
        settingsObj.heroBanner.headline = settingsObj.heroBanner.headlinePrefix
          ? `${settingsObj.heroBanner.headlinePrefix} ${settingsObj.heroBanner.headlineHighlight || ''} ${settingsObj.heroBanner.headlineSuffix || ''}`.trim()
          : 'Build Your Banking & Government Career with Us';
      }
      if (!settingsObj.heroBanner.highlightWord) {
        settingsObj.heroBanner.highlightWord = settingsObj.heroBanner.headlineHighlight || 'Banking & Government';
      }
      if (!settingsObj.heroBanner.heroImage) {
        settingsObj.heroBanner.heroImage = settingsObj.heroBanner.heroImageUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=900&auto=format&fit=crop';
      }
    }

    return sendSuccess(res, 'Site settings retrieved', settingsObj);
  } catch (error) {
    next(error);
  }
};

const updateSettings = async (req, res, next) => {
  try {
    const updateData = { ...req.body };
    delete updateData._id;
    delete updateData.__v;

    // Cross-sync heroBanner properties
    if (updateData.heroBanner) {
      if (updateData.heroBanner.heroImage && !updateData.heroBanner.heroImageUrl) {
        updateData.heroBanner.heroImageUrl = updateData.heroBanner.heroImage;
      }
      if (updateData.heroBanner.heroImageUrl && !updateData.heroBanner.heroImage) {
        updateData.heroBanner.heroImage = updateData.heroBanner.heroImageUrl;
      }
      if (updateData.heroBanner.headline && !updateData.heroBanner.headlineHighlight) {
        updateData.heroBanner.headlineHighlight = updateData.heroBanner.highlightWord || '';
      }
    }

    const settings = await SiteSettings.findOneAndUpdate(
      { key: 'global_settings' },
      { $set: updateData },
      { new: true, upsert: true, runValidators: false, setDefaultsOnInsert: true }
    );

    return sendSuccess(res, 'Site settings updated successfully', settings);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSettings,
  updateSettings,
};
