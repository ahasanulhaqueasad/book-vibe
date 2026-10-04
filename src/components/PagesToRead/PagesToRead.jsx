import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const PagesToRead = () => {
  const allBooks = useLoaderData(); // সব বইয়ের ডেটা loader থেকে নেওয়া
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!allBooks || !Array.isArray(allBooks)) return;

    // লোকাল স্টোরেজ থেকে পড়া বইগুলোর আইডি সংগ্রহ করা
    const storedReadBooks = JSON.parse(localStorage.getItem("read-books")) || [];
    
    // টাইপ মিসম্যাচ এড়াতে উভয় পাশেই নাম্বার নিশ্চিত করা
    const readBooksList = allBooks.filter((book) =>
      storedReadBooks.includes(book.bookId) || storedReadBooks.includes(Number(book.bookId))
    );

    // চার্টের প্রয়োজনীয় ফরম্যাটে ডেটা প্রস্তুত করা
    const formattedData = readBooksList.map((book) => ({
      name: book.bookName,
      totalPages: Number(book.totalPages) || 0,
    }));

    setChartData(formattedData);
  }, [allBooks]);

  // চার্টের বিভিন্ন বারের জন্য আলাদা রঙ
  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6B6B", "#8884D8"];

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-base-200 p-6 rounded-2xl my-10 max-w-6xl mx-auto shadow-sm">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Pages To Read Chart</h2>
      
      {chartData.length === 0 ? (
        <p className="text-gray-500 text-lg">No books added to the read list yet!</p>
      ) : (
        <div className="w-full h-[450px] bg-white p-6 rounded-xl shadow-md">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 60,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                interval={0} 
                angle={-15} 
                textAnchor="end" 
                tick={{ fontSize: 12 }} 
              />
              <YAxis />
              <Bar
                dataKey="totalPages"
                fill="#8884d8"
                label={{ position: "top" }}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default PagesToRead;