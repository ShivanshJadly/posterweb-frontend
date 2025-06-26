import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCategoryWisePosterV2 } from "../../../services/operations/posterDetailsAPI";
import Product from "../../Product";
import CategoriesSkeleton from "../../common/skeleton/CategoriesSkeleton";

const CategoryWisePosterPage = () => {
  const { id: categoryId } = useParams();
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryWisePoster = async () => {
      try {
        const response = await getCategoryWisePosterV2(categoryId);
        setCategoryData(response?.posters || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching category data:", err);
        setError("Failed to load category data. Please try again later.");
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchCategoryWisePoster();
    }
  }, [categoryId]);

  if (loading)
    return (
      <div className="flex justify-center items-center mt-20 mb-5">
        <CategoriesSkeleton skeletonCount={6} />
      </div>
    );

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex justify-center min-h-screen items-center px-4 py-10 mt-20 sm:mt-14 lg:mt-10">
      <div className="w-full max-w-screen-xl">
        {categoryData.length > 0 ? (
          <div
            className="
              grid gap-6
              grid-cols-[repeat(auto-fit,minmax(180px,1fr))]
              sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]
              md:grid-cols-[repeat(auto-fit,minmax(240px,1fr))]
              lg:grid-cols-[repeat(auto-fit,minmax(280px,1fr))]
              xl:grid-cols-[repeat(auto-fit,minmax(300px,1fr))]
            "
          >
            {categoryData.map((poster) => (
              <div key={poster._id} className="flex justify-center">
                <Product post={poster} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-lg font-medium text-gray-600">
            No posters found in this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryWisePosterPage;
