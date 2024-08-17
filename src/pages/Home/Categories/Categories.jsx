import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosSecure.get('/product');

        const categoryMap = new Map();

        response.data.forEach(product => {
          if (!categoryMap.has(product.category)) {
            categoryMap.set(product.category, product);
          }
        });

        // Get the first products of each category
        const uniqueCategories = Array.from(categoryMap.values());

        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [axiosSecure]);

  return (
    <div className="p-10">
      <h2 className="text-2xl mb-4 font-serif font-semibold">
        Popular Categories
      </h2>
      <hr />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {categories.slice(0, 4).map(category => (
          <div
            key={category._id}
            className="shadow-lg p-4 lg:px-6 hover:text-[#fc6221]"
          >
            <div className="flex justify-center items-center h-48 lg:h-60">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-all hover:w-[90%] hover:h-[90%]"
              />
            </div>
            <p className="sm:mt-6 text-center text-lg font-medium">
              {category.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
