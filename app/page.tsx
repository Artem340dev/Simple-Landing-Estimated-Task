import { OrderCreateForm } from "@/components/forms/OrderCreateForm/OrderCreateForm";
import Image from "next/image";

const MainPage = () => {
  return (
    <div className="absolute w-1/4 flex flex-col justify-center items-center w-full h-full">
      <OrderCreateForm />
    </div>
  );
}

export default MainPage;