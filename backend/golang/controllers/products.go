package controllers

import (
	"main/models"

	"github.com/lonelymous/godab"
)

func Get_Products() ([]models.Product, error) {

	result, err := godab.Queryx("SELECT * FROM products")
	if err != nil {
		return nil, err
	}

	var products []models.Product
	for result.Next() {
		var product models.Product
		err = result.StructScan(&product)
		if err != nil {
			return nil, err
		}
		products = append(products, product)
	}
	return products, nil
}

func Update_Product(product models.ProductEditor, productId ...int) error {
	var err error

	if len(productId) > 0 {
		_, err = godab.Exec("UPDATE products SET name=?, description=?, price=?, quantity=? WHERE id=?", product.Name, product.Description, product.Price, product.Quantity, productId[0])
	} else {
		_, err = godab.Exec("INSERT INTO products (name, description, price, quantity) VALUES (?,?,?,?)", product.Name, product.Description, product.Price, product.Quantity)
	}

	return err
}

func Exists_Product(productId int) bool {
	var err error

	result, err := godab.Queryx("SELECT * FROM products WHERE id=?", productId)
	if err != nil {
		return false
	}

	return result.Next()
}

func Delete_Product(productId int) error {
	_, err := godab.Exec("DELETE FROM products WHERE id=?", productId)
	return err
}
