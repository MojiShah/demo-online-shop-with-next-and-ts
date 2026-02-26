'use client'
import { useRouter } from "next/navigation";
import ReactPaginate from "react-paginate";

const Pagination = ({pageCount}:{pageCount:number}) => {

    const router = useRouter();

    const handlePageClick = (e:{selected:number}) => {
        const page = e.selected + 1;
        router.push(`/store?page=${page}&per_page=6`);
    }

  return (
    <div className="w-1/4 mx-auto my-10">
        <ReactPaginate
        className="flex flex-row gap-6 justify-center cursor-pointer"
        breakLabel="..."
        nextLabel="next >>"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<< previous"
        renderOnZeroPageCount={null}
      />
      
    </div>
  )
}

export default Pagination
