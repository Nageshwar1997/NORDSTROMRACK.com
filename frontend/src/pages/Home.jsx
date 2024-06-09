import React from "react";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";

const Home = () => {
  return (
    <div className="mx-1 md:mx-3">
      <CategoryList />
      <BannerProduct />
      <HorizontalCardProduct category={"airpods"} heading={"Top Airpods"} />
      <HorizontalCardProduct
        category={"watches"}
        heading={"Trending Watches"}
      />
      <VerticalCardProduct category={"mobiles"} heading={"Top Mobiles"} />
      <VerticalCardProduct category={"mouses"} heading={"Top Mouses"} />
      <VerticalCardProduct
        category={"televisions"}
        heading={"Trending Televisions"}
      />
      <VerticalCardProduct
        category={"cameras"}
        heading={"Popular Cameras & Photography"}
      />
      <VerticalCardProduct
        category={"earphones"}
        heading={"Top Wireless Headphones & Earphones"}
      />
      <VerticalCardProduct
        category={"speakers"}
        heading={"Top Bluetooth Speakers"}
      />
      <VerticalCardProduct
        category={"refrigerators"}
        heading={"Most Popular Refrigerators"}
      />
      <VerticalCardProduct
        category={"trimmers"}
        heading={"Top Selling Trimmers"}
      />
      <VerticalCardProduct
        category={"processors"}
        heading={"Top Selling Processors"}
      />
      <VerticalCardProduct
        category={"printers"}
        heading={"Trending Printers"}
      />
    </div>
  );
};

export default Home;
