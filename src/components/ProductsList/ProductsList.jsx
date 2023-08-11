import React from 'react';
import './ProductsList.css';

import ProductItem from '../ProductItem/ProductItem';

import uuid from 'react-uuid';

const ProductsList = ({ products, loading, error }) => {
    return (
        <div className='productsList'>
            {loading
                ?
                <p>Loading products...</p>
                :
                products?.length === 0
                    ?
                    (error?.error
                        ? (<div style={{ textAlign: 'center' }}>
                            Error fetching data
                            <br />
                            <span>{error?.message || ""}</span>
                        </div>)
                        : <p>No products to display</p>)
                    :
                    products.map(product => {
                        return <ProductItem
                            product={product}
                            key={product?.entity_id || uuid()}
                        />
                    })
            }
        </div>
    );
};

export default ProductsList;
