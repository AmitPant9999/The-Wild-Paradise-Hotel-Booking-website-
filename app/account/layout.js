import SideNavigation from "@/app/_components/SideNavigation";

export default function Layout({ children }) {
  return (
    <div className="h-full flex flex-col lg:flex-row">
      <div className="lg:w-64 w-full">
        <SideNavigation />
      </div>
      <div className="flex-1 py-4 px-6 sm:px-8 lg:px-16">{children}</div>
    </div>
  );
}
