import { useState } from "react";

interface TableUIProps {
  searialNo: number;
  percentageFunded: number;
  amountPledge: number;
}

const TableUI = ({
  data,
  isLoading,
}: {
  data: TableUIProps[];
  isLoading: boolean;
}) => {
  const [pageNo, setPageNo] = useState(1);
  const itemsPerPage = 5;

  const startIndex = (pageNo - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const dataToShow = data.slice(startIndex, endIndex);

  const nextPage = () => {
    if (pageNo < Math.ceil(data.length / itemsPerPage)) {
      setPageNo(pageNo + 1);
    }
  };

  const prevPage = () => {
    if (pageNo > 1) {
      setPageNo(pageNo - 1);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="loader">Loading...</div>
      ) : (
        <div>
          <table className="table-ui" cellSpacing={0} border={1}>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Percentage Funded</th>
                <th>Amount Pledged</th>
              </tr>
            </thead>

            <tbody>
              {dataToShow.map((item) => (
                <tr key={item.searialNo}>
                  <td>{item.searialNo}</td>
                  <td>{item.percentageFunded}%</td>
                  <td>${item.amountPledge.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination-controls">
            <button onClick={prevPage} disabled={pageNo === 1}>
              Previous
            </button>
            <span>
              Page {pageNo} of {Math.ceil(data.length / itemsPerPage)}
            </span>
            <button
              onClick={nextPage}
              disabled={pageNo === Math.ceil(data.length / itemsPerPage)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TableUI;
