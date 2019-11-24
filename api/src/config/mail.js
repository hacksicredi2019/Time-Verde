export default {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secute: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  },
  default: {
    from: "Hackaton Porto Alegre <noreply@hackatonportoalegre.com>"
  }
};
