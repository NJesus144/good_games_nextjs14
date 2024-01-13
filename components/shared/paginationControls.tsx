import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import ButtonUi from "../ui/button-ui";
import React from "react";

interface PaginationProps {
  page: any;
  totalPages: string | number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
}

export function PaginationControls({
  page,
  totalPages,
  setPage,
  loading,
}: PaginationProps) {
  const onLeftClickHandler = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const onRightClickHandler = () => {
    if (page + 1 !== totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className=" ml-0 mt-8 flex items-center justify-center gap-4 md:ml-24 xl:ml-48">
      <ButtonUi
        otherStyle="bg-slate-500 bg-transparente"
        isLoading={loading}
        onClick={onLeftClickHandler}
      >
        {!loading && <ArrowLeftCircle size={30} color="white" />}
      </ButtonUi>

      <div className="text-white">
        {page} / {totalPages}
      </div>

      <ButtonUi
        otherStyle="bg-slate-500 bg-transparente"
        isLoading={loading}
        onClick={onRightClickHandler}
      >
        {!loading && <ArrowRightCircle size={30} color="white" />}
      </ButtonUi>
    </div>
  );
}

export default PaginationControls;
