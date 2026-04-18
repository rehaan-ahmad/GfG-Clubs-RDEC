import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM =
  process.env.RESEND_FROM_EMAIL ?? 'RDEC Portal <onboarding@resend.dev>'

export async function sendIDApplicationEmail(
  to: string,
  name: string,
  clubName: string
) {
  return resend.emails.send({
    from: FROM,
    to,
    subject: `New Membership Application - ${clubName}`,
    html: `<p><strong>${name}</strong> has applied to join <strong>${clubName}</strong>. Review in your admin dashboard.</p>`,
  })
}

export async function sendIDApprovedEmail(
  to: string,
  name: string,
  downloadUrl: string
) {
  return resend.emails.send({
    from: FROM,
    to,
    subject: 'Your Student ID is Ready',
    html: `<p>Hi ${name}, your student ID card has been approved. <a href="${downloadUrl}">Download it here</a>.</p>`,
  })
}

export async function sendIDRejectedEmail(
  to: string,
  name: string,
  clubName: string
) {
  return resend.emails.send({
    from: FROM,
    to,
    subject: `Application Update - ${clubName}`,
    html: `<p>Hi ${name}, your application to join ${clubName} was not approved this time. Contact the club President for more information.</p>`,
  })
}
