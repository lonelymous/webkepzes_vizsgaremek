package main

import (
	"log"
	"main/controllers"
	"main/models"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"

	"github.com/lonelymous/goco"
	"github.com/lonelymous/godab"
)

func main() {

	// Create a new server config
	serverConfig := &models.ServerConfig{}
	// Initialize the server config
	err := goco.InitializeConfig(serverConfig, ".\\config.ini")
	if err != nil {
		panic("Error while loading config" + err.Error())
	}

	// Connect to the database
	err = godab.OpenAndCreate(&serverConfig.DatabaseConfig, "../DATABASE.sql")
	if err != nil {
		panic("Error while connecting to the database" + err.Error())
	}

	// Close the database connection when the program exits
	defer godab.CloseConnection()

	// Check if database is exists
	_, err = godab.Exec("USE " + serverConfig.DatabaseConfig.Name)
	if err != nil {
		log.Println("Error while connecting to the database" + err.Error())
	}

	// Create the server
	app := fiber.New()

	// Middleware
	app.Use(logger.New())

	//CORS
	app.Use(cors.New(cors.Config{
		AllowHeaders:     "Origin,Content-Type,Accept,Content-Length,Accept-Language,Accept-Encoding,Connection,Access-Control-Allow-Origin",
		AllowOrigins:     "*",
		AllowCredentials: true,
		AllowMethods:     "GET,POST,PATCH,DELETE,OPTIONS",
	}))

	// create a new group for the api
	api := app.Group("/api")

	// Routes
	api.Get("/products", controllers.Products_Controller)
	api.Post("/products", controllers.Products_Controller)
	api.Get("/products/:productId<int>", controllers.Products_Id_Controller)
	api.Patch("/products/:productId<int>", controllers.Products_Id_Controller)
	api.Delete("/products/:productId<int>", controllers.Products_Id_Controller)

	// Start the server and log if it fails
	log.Fatalln(app.Listen(serverConfig.GetPort()))
}
