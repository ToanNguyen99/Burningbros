import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductCard from "../../components/ProductCard";
import SearchDebounce from "../../components/SearchDebounce";
import Spinner from "../../components/Spinner";
import { Product } from "../../models";
import { ListReponse } from "../../models/common";
import { fetchDataFromApi } from "../../utils/api";
import queryString from 'query-string';

import "./style.scss";

const ProductItem = () => {
    const [data, setData] = useState<any>([]);
   
    const [loading, setLoading] = useState(false);
    const [params, setParams] = useState(0);
   
    
    

    
    const fetchApiProducts = () => {
        fetchDataFromApi(`/products/search?q=`).then((res: ListReponse<Product>) => {
            setData(res);
        });
    };

    const fetchNextPageData = () => {
        fetchDataFromApi(`/products?limit=${params}&skip=${params}`).then((res) => {
            if (data?.products) {
                setData({
                    ...data,
                    products: [...data?.products, ...res.products],
                });
            } else {
                setData(res);
            }
            setParams((prev) => prev + 20);
        });
    };

    const handleFilterChange = (newFilters: any) => {
        const newQuery = newFilters.searchTerm.replace(" ","&")
        
     
        
        fetchDataFromApi(`/products/search?q=${newQuery}`).then((res: ListReponse<Product>) => {
            setData(res);
        })
        
        
    }

    useEffect(() => {
        fetchApiProducts();
    }, []);

    return (
        <div className="product-page">
            <div className="search">
                <SearchDebounce onSubmit={handleFilterChange}/>
            </div>
            {loading && <Spinner initial={true} />}
            {!loading && (
                <>
                    {data?.products?.length > 0 ? (
                        <>
                            <div className="pageTitle">
                                {/* {`Search ${data?.total_results > 1 ? "results" : "results"} of '${query}'`} */}
                                Product List
                            </div>
                            <InfiniteScroll
                                className="content"
                                dataLength={data?.products?.length || []}
                                next={fetchNextPageData}
                                hasMore={params <= data?.total}
                                loader={<Spinner />}
                            >
                                {data?.products.map((product: Product, idx: number) => (
                                    <ProductCard key={idx} product={product} fromSearch={true} />
                                ))}
                            </InfiniteScroll>
                        </>
                    ) : (
                        <span className="resultNotFound">Sorry, Results not found~</span>
                    )}
                </>
            )}
        </div>
    );
};

export default ProductItem;
