import { useParams } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import { getCategoryWisePosterV2 } from "../../../services/operations/posterDetailsAPI";
import Product from "../../Product";
import CategoriesSkeleton from "../../common/skeleton/CategoriesSkeleton";
import { VariableSizeGrid as Grid } from "react-window";

const CategoryWisePosterPage = () => {
  const { id: categoryId } = useParams();
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const gridRef = useRef();

  const columnCount = 3;
  const columnWidth = 350;

  const getRowHeight = useCallback(() => 550, []);
  const getColumnWidth = useCallback(() => columnWidth, []);

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

  const rowCount = Math.ceil(categoryData.length / columnCount);
  const gridHeight = Math.min(3, rowCount) * getRowHeight();

  return (
    <div className="flex justify-center items-center mt-16 sm:mt-20 md:mt-28 lg:mt-20 w-full overflow-x-hidden">
      <div className="w-full max-w-[1100px] flex justify-center">
        {categoryData && categoryData.length > 0 ? (
          <div className="overflow-x-auto">
            <Grid
              ref={gridRef}
              columnCount={columnCount}
              rowCount={rowCount}
              columnWidth={getColumnWidth}
              rowHeight={getRowHeight}
              height={gridHeight}
              width={columnWidth * columnCount}
              overscanRowCount={2}
            >
              {({ columnIndex, rowIndex, style }) => {
                const index = rowIndex * columnCount + columnIndex;
                if (index >= categoryData.length) return null;
                const poster = categoryData[index];

                return (
                  <div
                    style={style}
                    className="flex justify-center items-center p-2"
                  >
                    <Product post={poster} />
                  </div>
                );
              }}
            </Grid>
          </div>
        ) : (
          <div>No posters found in this category.</div>
        )}
      </div>
    </div>
  );
};

export default CategoryWisePosterPage;
