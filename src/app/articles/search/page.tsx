interface SearchArticlePageProps{
  searchParams:{searchText :string} ;

}
const SearchPage = ({searchParams}:SearchArticlePageProps) => {

  return (
    <section className="h-96 container m-auto px-5">

    <h1 className="text-2xl font-bold">
      Search Text Is: {searchParams.searchText}
    </h1>

      </section>
  )
}

export default SearchPage