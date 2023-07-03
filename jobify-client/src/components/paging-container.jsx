import React, { useContext } from "react";

import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { AllJobsContext } from "../contexts/all-jobs-context";

const PagingContainer = () => {
  const {
    fetchJobs,
    state: { page, numOfPages, filters },
  } = useContext(AllJobsContext);

  const pages = Array.from(
    { length: numOfPages || 1 },
    (_, index) => index + 1
  );

  const onClickNext = () => {
    fetchJobs({ ...filters, page: page < numOfPages ? page + 1 : 1 });
  };

  const onClickPrev = () => {
    fetchJobs({ ...filters, page: page > 1 ? page - 1 : numOfPages });
  };

  const onClickPage = (page) => {
    fetchJobs({ ...filters, page });
  };

  return (
    <Wrapper>
      <button className="prev-btn" onClick={onClickPrev}>
        <HiChevronDoubleLeft />
        Prev
      </button>
      <div className="btn-container">
        {pages.map((pageNumber, index) => (
          <button
            key={index}
            type="button"
            className={pageNumber === page ? "pageBtn active" : "pageBtn"}
            onClick={() => onClickPage(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      <button className="next-btn" onClick={onClickNext}>
        Next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PagingContainer;
