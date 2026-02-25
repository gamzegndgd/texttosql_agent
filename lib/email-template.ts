interface WelcomeEmailProps {
  firstName: string
  username: string
  password: string
  appUrl: string
}

export function welcomeEmailHtml({
  firstName,
  username,
  password,
  appUrl,
}: WelcomeEmailProps): string {
  return `
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>QueryMind — Erişim Bilgileriniz</title>
</head>
<body style="margin:0;padding:0;background:#080B0F;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#080B0F;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#0E1318;border:1px solid #1E2A35;border-radius:8px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:#0E1318;padding:32px 40px;border-bottom:1px solid #1E2A35;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#C9A84C;margin-right:10px;"></span>
                    <span style="font-size:20px;font-weight:700;color:#E8EDF2;letter-spacing:-0.5px;">QueryMind</span>
                  </td>
                  <td align="right">
                    <span style="font-size:11px;color:#445566;font-family:monospace;letter-spacing:2px;">ERKEN ERİŞİM</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">
              <p style="margin:0 0 8px;font-size:13px;color:#C9A84C;font-family:monospace;letter-spacing:2px;text-transform:uppercase;">
                Hoş geldiniz
              </p>
              <h1 style="margin:0 0 20px;font-size:28px;color:#E8EDF2;font-weight:700;line-height:1.2;">
                ${firstName}, erişiminiz hazır!
              </h1>
              <p style="margin:0 0 32px;font-size:15px;color:#8A9BB0;line-height:1.7;">
                Erken erişim başvurunuz onaylandı. Aşağıdaki bilgilerle
                QueryMind'a giriş yapabilirsiniz.
              </p>

              <!-- Credentials Box -->
              <table width="100%" cellpadding="0" cellspacing="0"
                style="background:#141B22;border:1px solid #263240;border-radius:6px;margin-bottom:32px;">
                <tr>
                  <td style="padding:24px 28px;">
                    <p style="margin:0 0 4px;font-size:11px;color:#445566;font-family:monospace;letter-spacing:2px;text-transform:uppercase;">
                      Kullanıcı Adı
                    </p>
                    <p style="margin:0 0 20px;font-size:18px;color:#C9A84C;font-family:monospace;font-weight:500;">
                      ${username}
                    </p>
                    <p style="margin:0 0 4px;font-size:11px;color:#445566;font-family:monospace;letter-spacing:2px;text-transform:uppercase;">
                      Şifre
                    </p>
                    <p style="margin:0;font-size:18px;color:#C9A84C;font-family:monospace;font-weight:500;">
                      ${password}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr>
                  <td align="center">
                    <a href="${appUrl}"
                      style="display:inline-block;background:#C9A84C;color:#080B0F;text-decoration:none;
                             font-size:14px;font-weight:700;letter-spacing:1px;text-transform:uppercase;
                             font-family:monospace;padding:14px 40px;border-radius:4px;">
                      QueryMind'a Giriş Yap →
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Security Note -->
              <table width="100%" cellpadding="0" cellspacing="0"
                style="background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.15);
                       border-radius:6px;margin-bottom:8px;">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0;font-size:13px;color:#8A9BB0;line-height:1.6;">
                      🔒 <strong style="color:#C9A84C;">Güvenlik:</strong>
                      İlk girişte şifrenizi değiştirmenizi öneririz.
                      Bu bilgileri kimseyle paylaşmayın.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px;border-top:1px solid #1E2A35;">
              <p style="margin:0;font-size:12px;color:#445566;line-height:1.6;">
                Bu mail QueryMind erken erişim programı kapsamında gönderilmiştir.
                Sorunuz için
                <a href="mailto:destek@querymind.com"
                   style="color:#C9A84C;text-decoration:none;">destek@querymind.com</a>
                adresine yazabilirsiniz.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}
