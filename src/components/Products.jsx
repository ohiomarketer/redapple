import React, { useEffect, useState } from "react";
import { db } from "../main";
import { collection, getDocs } from "firebase/firestore";
import { Loader } from "./Loader";
import { useNavigate } from "react-router-dom";

export const Products = () => {
  const [phones, setPhones] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filterClass, setFilterClass] = useState(false);
  const [priceFilter, setPriceFilter] = useState(""); // "" for no filter, "asc" for ascending, "desc" for descending
  const [categoryFilter, setCategoryFilter] = useState(""); // "" for no filter, "used" for used, "new" for new

  const navigate = useNavigate();

  const openFilters = () => setFilterClass(!filterClass);

  const filterByPrice = (order) => {
    setPriceFilter(order);
    openFilters();
  };

  const filterByCategory = (category) => {
    setCategoryFilter(category);
    openFilters();
  };

  const getPhones = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "phones"));
      let data = [];
      querySnapshot.forEach((doc) => {
        data = [...data, { id: doc.id, ...doc.data() }];
      });

      // Aplicar filtros
      if (priceFilter === "asc") {
        data.sort((a, b) => a.price - b.price);
      } else if (priceFilter === "desc") {
        data.sort((a, b) => b.price - a.price);
      }

      if (categoryFilter === "used" || categoryFilter === "new") {
        data = data.filter((phone) => phone.category === categoryFilter);
      }

      setPhones(data);
      setQuantity(data.length);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching phones: ", error);
    }
  };

  useEffect(() => {
    getPhones();
  }, [priceFilter, categoryFilter]); // Agrega los filtros como dependencias

  return (
    <>
      {loading ? (
        ""
      ) : (
        <section className="products__section" id="products">
          <div className="filter__container">
            <div className="filter__options">
              <i className='bx bx-filter' ></i>
              <span onClick={openFilters}>Filtrar y ordenar</span>
            </div>
            {/* hide this and open when clicking "filtrar y ordenar" */}
            <div className={!filterClass ? 'filters' : 'filters active'}>
              <div className="title">
                Filtrar y ordenar
              </div>
              <div className="filter__option">
                <button onClick={() => filterByCategory("used")}> Usados </button>
                <button onClick={() => filterByCategory("new")}> Nuevos </button>
              </div>
              <div className="filter__option">
                <button onClick={() => filterByPrice("asc")}> - Precio </button>
                <button onClick={() => filterByPrice("desc")}> + Precio </button>
              </div>
            </div>

            <span className="products__quantity">{quantity} productos</span> 
          </div>
          <div className="products__container">
            {phones.map((phone) => (
              <div className="product__card"data-aos='fade' key={phone.id} onClick={() => navigate(`/products/${phone.id}`)}>
                <div className="image__container">
                  <img
                    src={phone.thumbnails[0]} // Assuming thumbnails is an array, use [0] for the first image
                    alt={phone.title}
                    className="product__image"
                  />
                </div>
                <div className="info__container">
                  <h3 className="product__title">{phone.title}</h3>
                  <span className="product__price">${phone.price} ARS</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
};
