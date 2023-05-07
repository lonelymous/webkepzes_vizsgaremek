package controllers

import (
	"main/models"

	"github.com/gofiber/fiber/v2"
)

func Products_Controller(ctx *fiber.Ctx) error {
	var err error

	switch ctx.Method() {
	case "GET":
		products, err := Get_Products()
		if err != nil {
			return err
		}

		return ctx.JSON(products)
	case "POST":
		var product models.ProductEditor

		err = ctx.BodyParser(&product)
		if err != nil {
			return err
		}

		return Update_Product(product)
	}

	return err
}
