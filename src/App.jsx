import React, { useEffect, useState } from 'react';
import './App.css';

import useFetchData from './hooks/use-fetch-data.js'

import { API_URLS } from './util/url.js'
import ProductsList from './components/ProductsList/ProductsList';
import FilterForm from './components/FilterForm/FilterForm';

const App = () => {
  const FETCH_URL = `${API_URLS.BASE}${API_URLS.GET_ALL_PRODUCTS}`
  const { data, loading, error } = useFetchData(FETCH_URL);
  const [products, setProducts] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);

  const filterSalableProducts = (productsData = []) => {
    return productsData.filter(product => product.is_salable === 1);
  };

  const getManufacturersList = (productsData = []) => {
    return Array.from(new Set([...productsData.map(product => product.manufacturer)]));
  };

  useEffect(() => {
    const newProducts = filterSalableProducts(data?.products || []);

    const allManufacturers = getManufacturersList(newProducts);
    setManufacturers(allManufacturers);

    setProducts(newProducts);
  }, [data])

  const applyFilters = (availability = "All", selectedManufacturers = ["All"]) => {
    let newProducts = filterSalableProducts(data?.products || []);

    // AVAILABILITY FILTER
    newProducts = newProducts.filter(product => {
      if (availability === "Yes") return product.stock > 0;
      if (availability === "No") return product.stock === 0;
      return true;
    });

    // MANUFACTURERS FILTER
    newProducts = newProducts.filter(product => {
      if (!Array.isArray(selectedManufacturers) || selectedManufacturers?.length === 0 || (selectedManufacturers?.length > 0 && selectedManufacturers[0] === "All")) return true;

      return selectedManufacturers.find(man => man === product.manufacturer) != null;
    });

    setProducts(newProducts);
  };

  return (
    <div className='app'>
      <div className="app__header">
        <h1 className="app__headerTitle">Mateusz Kozak</h1>
        <p className="app__headerContent">
          Junior Developer Recruitment Task
        </p>
      </div>

      {data?.products.length > 0 ?
        <>
          <div className="app__divideLine"></div>

          <FilterForm
            manufacturers={manufacturers}
            applyFilters={applyFilters}
          />
        </>
        : ""
      }

      <div className="app__divideLine"></div>

      <ProductsList
        products={products}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default App;
