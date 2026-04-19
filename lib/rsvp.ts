import type { AttendanceValue } from "@/data/site";

export type RsvpPayload = {
  name: string;
  attendance: AttendanceValue | "";
  message: string;
};

export type RsvpErrors = Partial<Record<keyof RsvpPayload, string>>;

const NAME_MIN = 2;
const NAME_MAX = 120;
const MESSAGE_MAX = 600;

export function validateRsvp(data: RsvpPayload): RsvpErrors {
  const errors: RsvpErrors = {};
  const trimmedName = data.name.trim();
  if (!trimmedName) {
    errors.name = "Please enter your name.";
  } else if (trimmedName.length < NAME_MIN) {
    errors.name = `Name should be at least ${NAME_MIN} characters.`;
  } else if (trimmedName.length > NAME_MAX) {
    errors.name = `Name should be under ${NAME_MAX} characters.`;
  }

  if (!data.attendance) {
    errors.attendance = "Please choose an attendance option.";
  }

  if (data.message.length > MESSAGE_MAX) {
    errors.message = `Message should be under ${MESSAGE_MAX} characters.`;
  }

  return errors;
}

/**
 * Hook this up to your API route or server action later.
 * For now it resolves after a short delay to mimic network latency.
 */
export async function submitRsvpClient(_payload: RsvpPayload): Promise<void> {
  await new Promise((r) => setTimeout(r, 650));
}
