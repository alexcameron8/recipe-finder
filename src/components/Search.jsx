export function Search(){
    return (
    <div className="flex flex-col items-center justify-center">
        <h2 className="mt-4 font-semibold text-2xl justify-start">Search for Recipes:</h2>
        <form className="flex w-2/3 items-center" >
            <input className="flex-1 my-2 mx-1 rounded-md border-0 shadow-sm p-1 ring-1 ring-inset ring-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600" type="text" id="search-bar" name="search-bar" placeholder="Search recipes.." required />
            <button type="submit" className="w-max p-2.5 ms-2 text-sm font-medium text-white bg-indigo-600 rounded-lg border border-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg className=" h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </button>   
        </form>
    </div>
   
    )
}