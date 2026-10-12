const isValidZoomUrl = (urlString) => {
  if (!urlString || typeof urlString !== 'string') return false;
  try {
    const parsed = new URL(urlString);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return false;
    
    // Check hostname ends with zoom.us or zoomgov.com
    const hostname = parsed.hostname.toLowerCase();
    const isZoomDomain = hostname === 'zoom.us' || hostname.endsWith('.zoom.us') || hostname === 'zoomgov.com' || hostname.endsWith('.zoomgov.com');
    return isZoomDomain;
  } catch (err) {
    return false;
  }
};

module.exports = { isValidZoomUrl };
