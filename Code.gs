var LOGO_URL = "https://raw.githubusercontent.com/pavincletus3/Tivor/pavin/public/logo.png";

function doPost(e) {
  try {
    // Careers submissions arrive as JSON; contact submissions as form-encoded
    var contentType = (e.postData && e.postData.type) ? e.postData.type : "";
    if (contentType.indexOf("application/json") !== -1) {
      var data = JSON.parse(e.postData.contents);
      if (data.type === "careers") return doPostCareers(data);
    }

    var params = e.parameter;
    var name    = params.name    || "";
    var email   = params.email   || "";
    var subject = params.subject || "Your message to Tivor";
    var message = params.message || "";

    if (!email) return jsonResponse({ success: false, error: "No email provided" });

    sendThankYouEmail(name, email, subject, message);
    sendInternalNotification(name, email, message);
    return jsonResponse({ success: true });
  } catch (err) {
    return jsonResponse({ success: false, error: err.message });
  }
}

function doPostCareers(data) {
  try {
    var name       = data.name      || "";
    var email      = data.email     || "";
    var phone      = data.phone     || "";
    var roleLabel  = data.roleLabel || "";
    var message    = data.message   || "";
    var fileName   = data.fileName  || "resume";
    var fileType   = data.fileType  || "application/octet-stream";
    var fileBase64 = data.fileBase64 || "";

    if (!email || !fileBase64) return jsonResponse({ success: false, error: "Missing required fields" });

    // Attach resume directly to the notification email — no Drive needed
    var bytes = Utilities.base64Decode(fileBase64);
    var blob  = Utilities.newBlob(bytes, fileType, fileName);

    sendCareersNotification(name, email, phone, roleLabel, message, blob, fileName);
    sendCareersConfirmation(name, email, roleLabel);
    return jsonResponse({ success: true });
  } catch (err) {
    return jsonResponse({ success: false, error: err.message });
  }
}

function sendCareersNotification(name, email, phone, roleLabel, message, resumeBlob, fileName) {
  var displayName = name || "Unknown";

  var htmlBody = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/></head>'
    + '<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">'
    + '<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 0;">'
    + '<tr><td align="center">'
    + '<table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">'
    + '<tr><td align="center" style="background:#000;padding:32px 40px;">'
    + '<span style="color:#fff;font-size:24px;font-weight:700;letter-spacing:-0.02em;">Tivor</span>'
    + '</td></tr>'
    + '<tr><td style="padding:40px 48px 32px;">'
    + '<h1 style="font-size:28px;font-weight:600;color:#0a0a0a;margin:0 0 8px;letter-spacing:-0.02em;">New application from ' + displayName + '.</h1>'
    + '<p style="font-size:15px;color:#555;line-height:1.7;margin:0 0 24px;">Someone just applied via the careers page on tivor.us. Resume attached.</p>'
    + '<table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f8f8;border-radius:8px;border-left:3px solid #0a0a0a;margin-bottom:12px;"><tr><td style="padding:16px 20px;">'
    + '<p style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#888;font-weight:600;margin:0 0 4px;">Name</p>'
    + '<p style="font-size:14px;color:#333;margin:0;">' + displayName + '</p>'
    + '</td></tr></table>'
    + '<table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f8f8;border-radius:8px;border-left:3px solid #0a0a0a;margin-bottom:12px;"><tr><td style="padding:16px 20px;">'
    + '<p style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#888;font-weight:600;margin:0 0 4px;">Email</p>'
    + '<p style="font-size:14px;color:#333;margin:0;"><a href="mailto:' + email + '" style="color:#0a0a0a;text-decoration:none;">' + email + '</a></p>'
    + '</td></tr></table>'
    + '<table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f8f8;border-radius:8px;border-left:3px solid #0a0a0a;margin-bottom:12px;"><tr><td style="padding:16px 20px;">'
    + '<p style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#888;font-weight:600;margin:0 0 4px;">Phone</p>'
    + '<p style="font-size:14px;color:#333;margin:0;">' + (phone || "—") + '</p>'
    + '</td></tr></table>'
    + '<table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f8f8;border-radius:8px;border-left:3px solid #0a0a0a;margin-bottom:12px;"><tr><td style="padding:16px 20px;">'
    + '<p style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#888;font-weight:600;margin:0 0 4px;">Role</p>'
    + '<p style="font-size:14px;color:#333;margin:0;">' + roleLabel + '</p>'
    + '</td></tr></table>'
    + (message ? '<table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f8f8;border-radius:8px;border-left:3px solid #0a0a0a;margin-bottom:12px;"><tr><td style="padding:16px 20px;">'
    + '<p style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#888;font-weight:600;margin:0 0 4px;">Message</p>'
    + '<p style="font-size:14px;color:#333;line-height:1.6;margin:0;white-space:pre-wrap;">' + message + '</p>'
    + '</td></tr></table>' : '')
    + '<p style="font-size:14px;color:#888;margin:24px 0 0;">— Tivor Careers Form</p>'
    + '</td></tr>'
    + '<tr><td style="background:#f8f8f8;padding:24px 48px;border-top:1px solid #eee;">'
    + '<p style="font-size:12px;color:#aaa;line-height:1.6;margin:0;"><strong style="color:#888;">Tivor</strong> · Strategic AI Systems, Not Generic Tools</p>'
    + '</td></tr></table>'
    + '</td></tr></table></body></html>';

  GmailApp.sendEmail("info@tivor.us", "New application: " + displayName + " — " + roleLabel, "", {
    htmlBody: htmlBody,
    name: "Tivor Careers",
    replyTo: email,
    attachments: [resumeBlob]
  });
}

function sendCareersConfirmation(name, email, roleLabel) {
  var displayName = name || "there";

  var htmlBody = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/></head>'
    + '<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">'
    + '<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 0;">'
    + '<tr><td align="center">'
    + '<table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">'
    + '<tr><td align="center" style="background:#000;padding:32px 40px;">'
    + '<span style="color:#fff;font-size:24px;font-weight:700;letter-spacing:-0.02em;">Tivor</span>'
    + '</td></tr>'
    + '<tr><td style="padding:40px 48px 32px;">'
    + '<h1 style="font-size:28px;font-weight:600;color:#0a0a0a;margin:0 0 8px;letter-spacing:-0.02em;">Application received, ' + displayName + '.</h1>'
    + '<p style="font-size:15px;color:#555;line-height:1.7;margin:0 0 16px;">Thanks for applying for the <strong>' + roleLabel + '</strong> role at Tivor.</p>'
    + '<p style="font-size:15px;color:#555;line-height:1.7;margin:0 0 32px;">We\'ll review your application and get back to you if there\'s a fit. We appreciate you taking the time.</p>'
    + '<table cellpadding="0" cellspacing="0" style="margin-bottom:32px;"><tr><td style="background:#0a0a0a;border-radius:100px;">'
    + '<a href="https://tivor.us" style="display:inline-block;color:#fff;font-size:14px;font-weight:500;text-decoration:none;padding:12px 28px;">Visit Tivor.us</a>'
    + '</td></tr></table>'
    + '<p style="font-size:14px;color:#888;margin:0;">— The Tivor Team</p>'
    + '</td></tr>'
    + '<tr><td style="background:#f8f8f8;padding:24px 48px;border-top:1px solid #eee;">'
    + '<p style="font-size:12px;color:#aaa;line-height:1.6;margin:0;">'
    + '<strong style="color:#888;">Tivor</strong> · Strategic AI Systems, Not Generic Tools<br/>'
    + '<a href="mailto:info@tivor.us" style="color:#aaa;text-decoration:none;">info@tivor.us</a>'
    + '</p></td></tr>'
    + '</table>'
    + '<p style="font-size:11px;color:#bbb;margin:20px 0 0;text-align:center;">You are receiving this because you applied via tivor.us/careers</p>'
    + '</td></tr></table></body></html>';

  GmailApp.sendEmail(email, "Application received — Tivor", "", {
    htmlBody: htmlBody,
    name: "Tivor",
    replyTo: "info@tivor.us"
  });
}

function sendThankYouEmail(name, email, subject, message) {
  var logoSrc = "";
  try {
    var response = UrlFetchApp.fetch(LOGO_URL);
    var base64   = Utilities.base64Encode(response.getBlob().getBytes());
    logoSrc      = "data:image/png;base64," + base64;
  } catch (e) {
    logoSrc = "";
  }

  var logoTag = logoSrc
    ? '<img src="' + logoSrc + '" alt="Tivor" width="80" height="80" style="display:block;border-radius:50%;filter:brightness(0) invert(1);"/>'
    : '<span style="color:#fff;font-size:24px;font-weight:700;letter-spacing:-0.02em;">Tivor</span>';

  var displayName = name || "there";

  var htmlBody = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/></head>'
    + '<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">'
    + '<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 0;">'
    + '<tr><td align="center">'
    + '<table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">'
    + '<tr><td align="center" style="background:#000;padding:32px 40px;">'
    + logoTag
    + '</td></tr>'
    + '<tr><td style="padding:40px 48px 32px;">'
    + '<h1 style="font-size:28px;font-weight:600;color:#0a0a0a;margin:0 0 8px;letter-spacing:-0.02em;">Thanks, ' + displayName + '.</h1>'
    + '<p style="font-size:15px;color:#555;line-height:1.7;margin:0 0 24px;">We\'ve received your message and appreciate you reaching out. Our team will get back to you shortly.</p>'
    + '<table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f8f8;border-radius:8px;border-left:3px solid #0a0a0a;margin-bottom:28px;">'
    + '<tr><td style="padding:20px 24px;">'
    + '<p style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#888;font-weight:600;margin:0 0 6px;">Your message</p>'
    + '<p style="font-size:14px;color:#333;line-height:1.6;margin:0;white-space:pre-wrap;">' + message + '</p>'
    + '</td></tr></table>'
    + '<p style="font-size:15px;color:#555;line-height:1.7;margin:0 0 32px;">In the meantime, feel free to explore more about what we do or connect with us on social media.</p>'
    + '<table cellpadding="0" cellspacing="0" style="margin-bottom:32px;">'
    + '<tr><td style="background:#0a0a0a;border-radius:100px;">'
    + '<a href="https://tivor.us" style="display:inline-block;color:#fff;font-size:14px;font-weight:500;text-decoration:none;padding:12px 28px;letter-spacing:0.01em;">Visit Tivor.us arrow</a>'
    + '</td></tr></table>'
    + '<p style="font-size:14px;color:#888;margin:0;">— The Tivor Team</p>'
    + '</td></tr>'
    + '<tr><td style="background:#f8f8f8;padding:24px 48px;border-top:1px solid #eee;">'
    + '<p style="font-size:12px;color:#aaa;line-height:1.6;margin:0;">'
    + '<strong style="color:#888;">Tivor</strong> · Strategic AI Systems, Not Generic Tools<br/>'
    + '<a href="mailto:info@tivor.us" style="color:#aaa;text-decoration:none;">info@tivor.us</a>'
    + ' &nbsp;·&nbsp; <a href="https://www.linkedin.com/company/tivor-info/" style="color:#aaa;text-decoration:none;">LinkedIn</a>'
    + ' &nbsp;·&nbsp; <a href="https://www.instagram.com/tivor.us" style="color:#aaa;text-decoration:none;">Instagram</a>'
    + '</p></td></tr>'
    + '</table>'
    + '<p style="font-size:11px;color:#bbb;margin:20px 0 0;text-align:center;">You are receiving this because you reached out via tivor.us</p>'
    + '</td></tr></table></body></html>';

  GmailApp.sendEmail(email, "We got your message — Tivor", "", {
    htmlBody: htmlBody,
    name: "Tivor",
    replyTo: "info@tivor.us"
  });
}

function sendInternalNotification(name, email, message) {
  var logoSrc = "";
  try {
    var response = UrlFetchApp.fetch(LOGO_URL);
    var base64   = Utilities.base64Encode(response.getBlob().getBytes());
    logoSrc      = "data:image/png;base64," + base64;
  } catch (e) {
    logoSrc = "";
  }

  var logoTag = logoSrc
    ? '<img src="' + logoSrc + '" alt="Tivor" width="80" height="80" style="display:block;border-radius:50%;filter:brightness(0) invert(1);"/>'
    : '<span style="color:#fff;font-size:24px;font-weight:700;letter-spacing:-0.02em;">Tivor</span>';

  var displayName = name || "Unknown";

  var htmlBody = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/></head>'
    + '<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">'
    + '<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 0;">'
    + '<tr><td align="center">'
    + '<table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">'
    + '<tr><td align="center" style="background:#000;padding:32px 40px;">'
    + logoTag
    + '</td></tr>'
    + '<tr><td style="padding:40px 48px 32px;">'
    + '<h1 style="font-size:28px;font-weight:600;color:#0a0a0a;margin:0 0 8px;letter-spacing:-0.02em;">New message from ' + displayName + '.</h1>'
    + '<p style="font-size:15px;color:#555;line-height:1.7;margin:0 0 24px;">Someone just filled out the contact form on tivor.us.</p>'
    + '<table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f8f8;border-radius:8px;border-left:3px solid #0a0a0a;margin-bottom:16px;">'
    + '<tr><td style="padding:20px 24px;">'
    + '<p style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#888;font-weight:600;margin:0 0 6px;">Name</p>'
    + '<p style="font-size:14px;color:#333;line-height:1.6;margin:0;">' + displayName + '</p>'
    + '</td></tr></table>'
    + '<table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f8f8;border-radius:8px;border-left:3px solid #0a0a0a;margin-bottom:16px;">'
    + '<tr><td style="padding:20px 24px;">'
    + '<p style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#888;font-weight:600;margin:0 0 6px;">Email</p>'
    + '<p style="font-size:14px;color:#333;line-height:1.6;margin:0;"><a href="mailto:' + email + '" style="color:#0a0a0a;text-decoration:none;">' + email + '</a></p>'
    + '</td></tr></table>'
    + '<table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f8f8;border-radius:8px;border-left:3px solid #0a0a0a;margin-bottom:28px;">'
    + '<tr><td style="padding:20px 24px;">'
    + '<p style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#888;font-weight:600;margin:0 0 6px;">Message</p>'
    + '<p style="font-size:14px;color:#333;line-height:1.6;margin:0;white-space:pre-wrap;">' + message + '</p>'
    + '</td></tr></table>'
    + '<p style="font-size:14px;color:#888;margin:0;">— Tivor Contact Form</p>'
    + '</td></tr>'
    + '<tr><td style="background:#f8f8f8;padding:24px 48px;border-top:1px solid #eee;">'
    + '<p style="font-size:12px;color:#aaa;line-height:1.6;margin:0;">'
    + '<strong style="color:#888;">Tivor</strong> · Strategic AI Systems, Not Generic Tools<br/>'
    + '<a href="mailto:info@tivor.us" style="color:#aaa;text-decoration:none;">info@tivor.us</a>'
    + ' &nbsp;·&nbsp; <a href="https://www.linkedin.com/company/tivor-info/" style="color:#aaa;text-decoration:none;">LinkedIn</a>'
    + ' &nbsp;·&nbsp; <a href="https://www.instagram.com/tivor.us" style="color:#aaa;text-decoration:none;">Instagram</a>'
    + '</p></td></tr>'
    + '</table>'
    + '<p style="font-size:11px;color:#bbb;margin:20px 0 0;text-align:center;">Submitted via tivor.us contact form</p>'
    + '</td></tr></table></body></html>';

  GmailApp.sendEmail("info@tivor.us", "New contact: " + displayName + " — Tivor", "", {
    htmlBody: htmlBody,
    name: "Tivor Contact Form",
    replyTo: email
  });
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

