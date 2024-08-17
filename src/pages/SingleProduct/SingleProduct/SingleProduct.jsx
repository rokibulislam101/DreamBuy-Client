import { Helmet } from "react-helmet-async"
import Product from "../Product/Product"

const SingleProduct = () => {
  return (
    <div>
      <Helmet>
        <title>Dream Buy | Product</title>
      </Helmet>
      <Product></Product>
    </div>
  );
}

export default SingleProduct
