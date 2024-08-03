import React, { useState, useCallback } from "react";
import "./App.css";
import CustomerDetails from "./components/CustomerDetails";
import CustomerList from "./components/CustomerList";
import { Customer } from "./types/Customer";
import ClipLoader from "react-spinners/ClipLoader";

const generateCustomers = (start: number, count: number): Customer[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: start + index + 1,
    name: `Customer ${start + index + 1}`,
    title: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    address: `Address ${start + index + 1}`,
  }));
};

const App: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(
    1
  );
  const [loading, setLoading] = useState<boolean>(true);
  const loadMoreCustomers = useCallback(() => {
    setLoading(true);
    const start = customers.length;
    const newCustomers = generateCustomers(start, 20);
    setCustomers((prevCustomers) => [...prevCustomers, ...newCustomers]);
    setLoading(false);
  }, [customers]);

  const selectedCustomer =
    customers.find((customer) => customer.id === selectedCustomerId) || null;

  return (
    <div>
      <div className="flex flex-row items-center justify-center border-b-2 border-slate-200 h-[10vh]">
        <h1 className="text-2xl">This here is the heading</h1>
      </div>
      <div className="flex flex-row">
        <CustomerList
          customers={customers}
          selectedCustomerId={selectedCustomerId}
          onSelectCustomer={setSelectedCustomerId}
          loadMoreCustomers={loadMoreCustomers}
        />
        <CustomerDetails customer={selectedCustomer} />
      </div>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center gap-5 bg-white">
          <ClipLoader />
          <div className="text-black">Loading...</div>
        </div>
      )}
    </div>
  );
};

export default App;
