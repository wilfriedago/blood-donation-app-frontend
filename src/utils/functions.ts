// Description: Utility functions

/**
 * Get the color of the progress bar based on the password strength
 * @param strength
 * @returns string
 */
export function getProgressBarColor(strength: number) {
  if (strength > 100) return '#f00';

  if (strength > 80) return '#f80';

  if (strength > 60) return '#ff0';

  if (strength > 40) return '#0f0';

  if (strength > 20) return '#0ff';

  return '#00f';
}

/**
 * Get the strength of the password using regex
 * @param password
 * @returns number
 */
export function getPasswordStrength(password: string) {
  let strength = 0;
  if (password.match(/[a-z]+/)) {
    strength += 1;
  }
  if (password.match(/[A-Z]+/)) {
    strength += 1;
  }
  if (password.match(/[0-9]+/)) {
    strength += 1;
  }
  if (password.match(/[$@#&!]+/)) {
    strength += 1;
  }
  if (password.length > 8) {
    strength += 1;
  }
  return strength * 20;
}
