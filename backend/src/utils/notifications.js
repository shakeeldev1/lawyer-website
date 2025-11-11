import { sendMail } from "./sendMail.js";

export const sendWhatsAppNotification = async (phoneNumber, message) => {
  console.log(`WhatsApp notification to ${phoneNumber}: ${message}`);
};

export const sendEmailNotification = async (email, subject, message) => {
  try {
    await sendMail(email, subject, message);
  } catch (error) {
    console.error("Email notification failed:", error);
  }
};

export const notifyLawyerAssignment = async (
  lawyer,
  caseNumber,
  clientName
) => {
  const message = `New case assigned: ${caseNumber} for client ${clientName}`;

  await sendEmailNotification(lawyer.email, "New Case Assignment", message);

  if (lawyer.phone) {
    await sendWhatsAppNotification(lawyer.phone, message);
  }
};

export const notifyHearingReminder = async (
  recipients,
  caseNumber,
  hearingDate,
  hearingTime
) => {
  const message = `Hearing Reminder: Case ${caseNumber} scheduled on ${hearingDate} at ${hearingTime}`;

  for (const recipient of recipients) {
    await sendEmailNotification(recipient.email, "Hearing Reminder", message);

    if (recipient.phone) {
      await sendWhatsAppNotification(recipient.phone, message);
    }
  }
};

export const notifyMemorandumApproval = async (secretary, caseNumber) => {
  const message = `Memorandum approved for case ${caseNumber}. Ready for final review.`;

  await sendEmailNotification(secretary.email, "Memorandum Approved", message);
};

export const notifyDirectorSignatureRequired = async (director, caseNumber) => {
  const message = `Your signature is required for case ${caseNumber}`;

  await sendEmailNotification(director.email, "Signature Required", message);

  if (director.phone) {
    await sendWhatsAppNotification(director.phone, message);
  }
};
