import { auth } from "../_lib/auth";

export const metadata = {
  title: "Guest area",
};

export default async function Page() {
  const session = await auth();

  const firstName = session.user.name.split(" ").at(0);

  return (
    <h2 className="font-semibold text-2xl sm:text-3xl lg:text-4xl text-accent-400 mb-4 sm:mb-6 lg:mb-7">
      Welcome, {firstName}
    </h2>
  );
}
