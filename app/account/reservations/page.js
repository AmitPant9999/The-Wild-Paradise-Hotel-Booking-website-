import ReservationList from "@/app/_components/ReservationList";
import { auth } from "@/app/_lib/auth";
import { getBookings } from "@/app/_lib/data-service";

export const metadata = {
  title: "Reservations",
};

export default async function Page() {
  const session = await auth();
  const bookings = await getBookings(session.user.guestId);

  return (
    <div className="px-6 sm:px-8 lg:px-16">
      <h2 className="font-semibold text-2xl sm:text-3xl text-accent-400 mb-6 sm:mb-8">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg sm:text-xl">
          You have no reservations yet. Check out our{" "}
          <a className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </a>
        </p>
      ) : (
        <ReservationList bookings={bookings} />
      )}
    </div>
  );
}
