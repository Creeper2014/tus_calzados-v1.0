interface Props {
    totalitems: number;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>
}



export const Pagination = ({ totalitems, page, setPage}: Props) => {

    const handleNextPage = () => {
        setPage(page + 1);
    }

    const handlePrevPage = () => {
        setPage(prevPage => Math.max(prevPage - 1, 1));
    }

    const itemsPerPage = 10;
    const totalPages = totalitems
        ? Math.ceil(totalitems / itemsPerPage)
        : 1;
    const isLastPage = page >= totalPages;

    const staritem = (page - 1) * itemsPerPage + 1;
    const enditem = Math.min(page * itemsPerPage, totalitems)


    return (
        <div className="flex justify-between items-center">
            <p className="text-xs font-medium">
                Mostrando{' '}
                <span className="font-bold">
                    {staritem} - {enditem}
                </span>{' '}
                de <span className="font-bold"> {totalitems}</span> Productos
            </p>

            <div className="flex gap-3">
                <button
                    className="btn-paginated"
                    onClick={handlePrevPage}
                    disabled={page === 1}
                >
                    Anterior
                </button>
                <button
                    className="btn-paginated"
                    onClick={handleNextPage}
                    disabled={isLastPage}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};