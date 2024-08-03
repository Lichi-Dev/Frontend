import React, { useEffect, useState } from "react";
import { Customer } from "../../types/Customer";
import { fetchPhotos } from "../../utils/fetchPhoto";

interface Props {
  customer: Customer | null;
}

const CustomerDetails: React.FC<Props> = ({ customer }) => {
  const [photos, setPhotos] = useState<string[]>([]);

  useEffect(() => {
    const fetchAndSetPhotos = async () => {
      const photosData = await fetchPhotos();
      setPhotos(photosData.map((photo: any) => photo.previewURL));
    };

    fetchAndSetPhotos();
    const interval = setInterval(fetchAndSetPhotos, 10000);

    return () => clearInterval(interval);
  }, [customer]);

  if (!customer) {
    return <div>Select a customer to see details</div>;
  }

  return (
    <div className=" w-[70%] flex flex-col items-center p-5 text-center max-h-[90vh] overflow-auto gap-5">
      <h2 className="text-2xl mt-5">{customer.name}</h2>
      <h2 className="text-2xl">{customer.address}</h2>
      <p className="text-md w-[70%]">{customer.title}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {photos.map((photo, index) => (
          <img
            className="w-52 h-52 rounded-xl shadow-[3px_3px_3px_ 3px_rgba(0,0,0,0.3)] "
            key={index}
            src={photo}
            alt="Customer Image"
          />
        ))}
      </div>
    </div>
  );
};

export default CustomerDetails;
