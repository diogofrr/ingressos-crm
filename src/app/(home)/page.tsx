import AddUserButton from "./components/add-user-btn";
import Header from "./components/header";
import SearchBar from "./components/search-bar";

export default function Home() {
  return (
    <section className="flex flex-col h-dvh bg-slate-50 ">
      <Header />
      <section className="min-h-[800px] mx-4 bg-white shadow-lg rounded-lg">
        <div className="flex items-center justify-between p-4 flex-col sm:flex-row gap-4">
          <AddUserButton />
          <SearchBar />
        </div>
      </section>
    </section>
  )
}
