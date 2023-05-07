package controllers

import (
	"main/models"

	"github.com/gofiber/fiber/v2"
)

func Products_Id_Controller(ctx *fiber.Ctx) error {
	var err error

	productId, err := ctx.ParamsInt("productId")
	if err != nil {
		return err
	}

	if !Exists_Product(productId) {
		return fiber.NewError(fiber.StatusNotFound, "Product not found")
	}

	switch ctx.Method() {
	case "GET":
		products, err := Get_Products()
		if err != nil {
			return err
		}

		return ctx.JSON(products)
	case "PATCH":
		var product models.ProductEditor

		err = ctx.BodyParser(&product)
		if err != nil {
			return err
		}

		return Update_Product(product)
	case "DELETE":
		return Delete_Product(productId)
	}

	return err
}
