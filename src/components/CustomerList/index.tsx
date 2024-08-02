import React, { useEffect, useRef } from "react";
import { Customer } from "../../types/Customer";

interface Props {
  customers: Customer[];
  selectedCustomerId: number | null;
  onSelectCustomer: (id: number) => void;
  loadMoreCustomers: () => void;
}

const CustomerList: React.FC<Props> = ({
  customers,
  selectedCustomerId,
  onSelectCustomer,
  loadMoreCustomers,
}) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMoreCustomers();
      }
    });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [loadMoreCustomers]);

  return (
    <div className="max-h-[90vh] w-[30%] overflow-y-auto">
      {customers.map((customer) => (
        <div
          key={customer.id}
          className={`p-5 cursor-pointer border-b-2 ${
            selectedCustomerId === customer.id ? "bg-slate-200" : ""
          }`}
          onClick={() => onSelectCustomer(customer.id)}
        >
          <h3 className="text-xl mb-3">{customer.name}</h3>
          <p className="text-sm text-slate-800">{customer.title}</p>
        </div>
      ))}
      <div ref={loadMoreRef} className="h-10"></div>
    </div>
  );
};

export default CustomerList;
