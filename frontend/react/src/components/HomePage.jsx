import { createContext, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ProductsContext } from "../App";
import "./ProductItem.css";
import { Product } from "../models/product";

export const RefreshContext = createContext();

let baseURL = "http://localhost:8000/api/products/";

function HomePage() {
  const [products, setProducts] = useContext(ProductsContext);
  // const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState([]);

  useEffect(() => {
    setRefresh(false);
    // get products from api
    try {
    //   console.log("Fetching products");
      fetch(baseURL, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          data.map((value, idx) => {
            data[idx] = new Product(
              value.id,
              value.name,
              value.description,
              value.price,
              value.quantity
            );
          });
          setProducts(data);
        });
    } catch (error) {
      console.log("Error\t", error);
    }
  }, [refresh]);

  return (
    <RefreshContext.Provider value={[refresh, setRefresh]}>
      <div>
        <div id="product-item">
          <p>Name</p>
          <input type="text" name="name-input" id="name-input" required />
          <p>Description</p>
          <input
            type="text"
            name="description-input"
            id="description-input"
            required
          />
          <p>Price</p>
          <input
            type="number"
            name="price-input"
            id="price-input"
            min={1}
            required
          />
          <p>Quantity</p>
          <input
            type="number"
            name="quantity-input"
            id="quantity-input"
            min={1}
            required
          />
          <br />
          <br />
          <button
            id="product-add-button"
            onClick={() => {
              let nameInput = document.querySelector("#name-input");
              let descriptionInput =
                document.querySelector("#description-input");
              let priceInput = document.querySelector("#price-input");
              let quantityInput = document.querySelector("#quantity-input");

              fetch(baseURL, {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: nameInput.value,
                  description: descriptionInput.value,
                  price: Number(priceInput.value),
                  quantity: Number(quantityInput.value),
                }),
              }).then((response) => {
                if (response.status == 200) {
                  // clear inputs
                  nameInput.value = "";
                  descriptionInput.value = "";
                  priceInput.value = "";
                  quantityInput.value = "";

                  // refresh
                  setRefresh(true);
                }
              });
            }}
          >
            Add
          </button>
        </div>

        <div id="product-list">
          {/* {console.log(products)} */}
          {products.map((value, idx) => (
            <ProductItem
              key={idx}
              idx={idx}
              value={value}
              setRefresh={setRefresh}
            />
          ))}
        </div>
      </div>
    </RefreshContext.Provider>
  );
}

function ProductItem(props) {
  const [isModify, setIsModify] = useState(false);

  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  let product = props.value;
  let setRefresh = props.setRefresh;

  useEffect(() => {

  },[isModify]);

  return (
    <div className="product-item">
      {!isModify ? (
        <div>
          <p>Name: {product.name}</p>
          <p>Description: {product.description}</p>
          <p>Price: {product.price}Ft</p>
          <p>Quantity: {product.quantity}db</p>
          <button
            className="product-modify-button product-button"
            onClick={() => {
              setIsModify(true);

              setValue("id", product.id);
              setValue("name", product.name);
              setValue("description", product.description);
              setValue("price", product.price);
              setValue("quantity", product.quantity);
            }}
          >
            Modify
          </button>
          <button
            className="product-delete-button product-button"
            onClick={async () => {
                if (await FÖTCH("DELETE", null, product.id)) {
                    setIsModify(false);
                    setRefresh(true);
                }
            }}
          >
            Delete
          </button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            name="product-modify-name-input"
            id="product-modify-name-input"
            {...register("name", { required: true })}
          />

          <input
            type="text"
            name="product-modify-description-input"
            id="product-modify-description-input"
            {...register("description", { required: true })}
          />

          <input
            type="number"
            name="product-modify-price-input"
            id="product-modify-price-input"
            min={1}
            {...register("price", { required: true })}
          />

          <input
            type="number"
            name="product-modify-quantity-input"
            id="product-modify-quantity-input"
            min={1}
            {...register("quantity", { required: true })}
          />

          <button
            className="product-modify-add-button product-button"
            onClick={async () => {
                let product = getValues();

                product.price = Number(product.price);
                product.quantity = Number(product.quantity);

                if (await FÖTCH("PATCH", product, product.id)) {
                    setIsModify(false);
                    setRefresh(true);
                }
            }}
          >
            Modify
          </button>
        </div>
      )}
    </div>
  );
}

async function FÖTCH(method, body, id) {
  try {
    let response = await fetch(baseURL + id, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    return response.status == 200

  } catch (error) {
    console.log(error);
  }
}

export default HomePage;
