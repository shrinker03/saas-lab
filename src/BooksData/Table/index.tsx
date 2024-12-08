import { useEffect, useState } from "react";
import TableUI from "./TableUI";

const URL = `https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json`;

const Table = () => {
  const [booksData, setBooksData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const customizedData = booksData?.map((book) => ({
    searialNo: book["s.no"],
    percentageFunded: book["percentage.funded"],
    amountPledge: book["amt.pledged"],
  }));

  useEffect(() => {
    async function fetchAllBooksData() {
      try {
        setIsLoading(true);
        const res = await fetch(URL);
        const data = await res.json();
        setBooksData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAllBooksData();
  }, []);

  return <TableUI data={customizedData} isLoading={isLoading} />;
};

export default Table;
