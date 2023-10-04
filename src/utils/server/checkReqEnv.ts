export default function checkRequiredEnvironments(envs: string[]) {
  for (const env of envs) {
    if (!process.env[env]) {
      console.error(`Cannot find ${env} in your system environments!`);
      return false;
    }
  }

  return true;
}
