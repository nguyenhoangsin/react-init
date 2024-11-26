export const emailRegex = new RegExp(
  `^([a-zA-Z0-9](?!.*[_.-]{2})[a-zA-Z0-9._-]*[a-zA-Z0-9])@` + // Username
    `([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z]{2,}$` // Domain
);

export default { emailRegex };
